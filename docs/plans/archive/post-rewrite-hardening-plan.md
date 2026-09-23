# Post-Rewrite Hardening — Design Plan

**Version:** continuous
**Status:** Completed (2026-09-23)

---

## As built — deviations from the plan below

- `LoadStatus` gained a fourth value, `LoadNotFound`, so "unknown slug/id" (render the not-found copy immediately, no fetch) is distinguishable from `LoadFailed` (fetch attempted and failed). The E2E error-state suite exercises both.
- The project field on `ViewState` is named `Proj`, not `Project`: GoFront's emitted struct constructor breaks when a field shares its name with its own type.
- `newViewState()` (in `src/view.go`) initialises nested slices so templ `len`/`range` never see `nil`; `handleRoute` resets with it rather than `ViewState{}`.
- `theme.go` switched from bare `localStorage` to `window.localStorage` — identical in browsers, required for `gofront test --dom` because Node's `localStorage` global throws without `--localstorage-file`.
- Biome CSS lint: `complexity/noImportantStyles` and `style/noDescendingSpecificity` are disabled for `app/css/app.css` via an override (two intentional `!important` rules for the modal-open scroll lock; specificity ordering is inherited and untouched by design).
- Results: `public/app.js` 104 KB → 73 KB; `public/css/app.css` 28.8 KB; 116 Go tests (`--dom`) + 11 JS unit tests; 114 E2E checks unchanged and green.

---

## Goal

Close the four weaknesses left over from the GoFront rewrite, measured against the retired `master` (vanilla JS) branch:

1. **Route view state is ~15 loose package-level globals** (`currentPostHtml`, `currentPostLoading`, `currentPostError`, `projectReadme*`, `currentPage*`, …) that allow impossible states (`loading && error`) and must be reset by hand.
2. **1,389 lines of CSS live inside a Go string** in `src/styles.go` — no syntax highlighting, no formatting, no linting, and the CSS is only injected after `app.js` has downloaded and executed.
3. **Unit-test breadth regressed** — `master` had 91 JS unit tests covering routing edge cases, data mapping, theme persistence, i18n fallback and search limits; the rewrite kept 45 Go tests focused on class-name helpers and YAML. Theme, store mapping, search, and redirect handling have no unit coverage.
4. **Coarse re-render granularity** (`gom.Mount` replaces a whole slot) — evaluated below and explicitly *accepted*, not fixed.

Done looks like: one `ViewState` struct drives `RouteView`; CSS is a plain `app/css/app.css` file linked from `index.html` and checked by Biome; `gofront test src --dom` covers theme, store mapping, search and redirect logic; all 114 E2E checks still pass; `app.js` shrinks by roughly the size of the extracted CSS.

---

## Out of Scope

- **Fine-grained reactivity / signals.** Weakness 4 is a deliberate trade-off of the "no runtime framework" architecture. The site renders a blog list, a markdown page, or a project page — each route change replaces `#content-slot` once. There is no per-keystroke or per-tick DOM churn outside the search results list, which already has its own region render (`renderSearchResults`). Reintroducing a diffing layer would recreate the `reactive.js` maintenance burden the rewrite removed. **Decision: accept; do not build.**
- No visual/CSS rule changes. The CSS file content must be byte-for-byte the current literal (after Biome formatting).
- No content, data schema, or routing behaviour changes.
- No new npm dependencies (`jsdom` is already present for `--dom` tests).
- No changes to `gofront` itself; if a compiler limitation blocks a task, stop and ask.
- Not porting `master` tests that tested `master`-only machinery (`Context._set`, `Reactive` signals, `error-handler` global hooks).

---

## Approach

### 1. `ViewState` struct replaces route globals

Introduce in `src/types.go`:

```go
type LoadStatus int

const (
	LoadReady   LoadStatus = iota // zero value: content available (or nothing to load)
	LoadPending
	LoadFailed
)

type ViewState struct {
	Post    BlogPost
	Project Project
	Page    NavPage
	HTML    string     // rendered markdown for post / readme / page
	Status  LoadStatus
}
```

and in `src/store.go` a single `var view ViewState` replacing `currentPost`, `currentPostHtml`, `currentPostLoading`, `currentPostError`, `currentProject`, `projectReadmeHtml`, `projectReadmeLoading`, `projectReadmeError`, `currentPageHtml`, `currentPageLoading`, `currentPageError`.

- `handleRoute()` sets `view = ViewState{}` before dispatching, so no route can leak stale state into the next (today `currentPostError` is never cleared when navigating post → project → post).
- `showPost` / `showProject` / `showPage` are split into a **pure resolver** and an **async loader**:
  - `resolvePost(slug string, posts []BlogPost, cache map[string]string) (ViewState, bool)` — returns the view state and whether a fetch is needed. Same for `resolveProject` and `resolvePage`. These are unit-testable without DOM or `fetch`.
  - The async wrapper does `view, needsFetch := resolveX(...)`; if `needsFetch`, sets `Status = LoadPending`, renders, awaits `loadMarkdownFile`, fills cache/HTML or sets `LoadFailed`, renders again.
- `RouteView` in `src/app.templ` passes `view` to `BlogPostView(v ViewState, commentsEnabled bool)`, `ProjectDetail(v ViewState, commentsEnabled bool)`, `PageView(v ViewState)`. Templates switch on `v.Status` instead of two booleans.
- The three markdown caches (`readmeCache`, `postHtmlCache`, `pageHtmlCache`) stay as they are — they are caches, not view state.

*Rejected:* one struct per route (`PostView`, `ProjectView`, `PageView`). Three structs plus three globals is barely better than today; a single `view` that is reset on every route is the property we actually want. *Rejected:* keeping the booleans and only grouping them — the enum is what removes the impossible `loading && error` state.

### 2. Extract CSS to `app/css/app.css`

- Move the literal from `appCSS()` verbatim into `app/css/app.css`. Delete `src/styles.go`, the `AppStyles` templ, and `gom.MountTo("head", AppStyles())` in `main()`.
- Add `<link rel="stylesheet" href="/css/app.css">` to `app/index.html` after the inline critical-style block. The critical block and `boot.js` stay — they prevent the theme flash before the sheet arrives.
- `scripts/copy-static.js` already copies `app/css/` to `public/`; `.gitignore` only ignores `app/css/prism-themes/`, so `app/css/app.css` is tracked with no config change.
- Enable Biome for CSS: add `app/css/app.css` to `files.includes`, `formatter.includes`, and `linter.includes` in `biome.json` (Biome 2.x formats and lints CSS natively). Run `npm run format` once and commit the result as a separate formatting-only commit so the extraction diff stays reviewable.
- Effect: ~29 KB leaves `app.js`; the browser fetches CSS in parallel with `vendor.js`/`app.js` instead of waiting for `app.js` to execute and inject a `<style>`; the stylesheet gets its own long-lived cache entry.

*Rejected:* multiple CSS files per component. One file matches the single-string status quo, keeps the diff mechanical, and avoids ordering questions. *Rejected:* having the Go build embed the file — GoFront has no `embed` equivalent and it would keep the CSS on the JS critical path.

### 3. Restore unit-test breadth with `gofront test --dom`

Change `test:gofront` to `gofront test src --dom && gofront test src/utils` so tests can touch `document` and `localStorage` via jsdom. Add tests in the following files (all `*_test.go`, excluded from prod builds):

| File | Covers (ported from `master` test names) | Needs `--dom` |
|---|---|---|
| `src/router_test.go` (extend) | `parseRoute`: trailing slash, `/blog/post/<slug>`, `/blog/page/0`, `/blog/page/abc`, `/blog/` → list. New `resolveRedirect(hash string) (string, bool)` extracted from `handleRoute` for the `#!redirect=` GitHub Pages path: encoded path, missing prefix, empty payload. | no |
| `src/view_test.go` (new) | `resolvePost` / `resolveProject` / `resolvePage`: unknown slug → `LoadFailed`, cache hit → `LoadReady` + no fetch, cache miss → `LoadPending` + fetch, project without `GithubRepo` → `LoadReady` + no fetch, repo without `/` gets `site.GithubUsername` prefix, empty branch defaults to `main`. | no |
| `src/store_test.go` (extend) | Extract `postFromYAML(raw any) BlogPost` and `sortPostsByDate([]BlogPost)` from `initData`; test `.md` stripping (only trailing), filename without extension, defaults for missing title/date/excerpt/tags, newest-first ordering, `Href` = `/blog/<slug>`. `t()`: empty-string value falls back to key. | no |
| `src/theme_test.go` (extend) | `getInitialTheme`: localStorage wins over `data-theme` wins over `"dark"`; `applyTheme` sets `data-theme` and the seven CSS custom properties; `applyPrismTheme` creates the `<link>` once and updates `href` on the second call; `toggleTheme` persists to localStorage; `nextTheme` on an unknown value returns `"dark"`. | yes |
| `src/search_test.go` (new) | `performSearch`: empty query → empty slice, below `searchMinChars()` → empty slice, result cap honoured, tag-only match. Requires a small seam so `Fuse` can be replaced by a fake; if `performSearch` cannot be isolated from the vendor global without a refactor, stop and ask. | maybe |
| `src/markdown_test.go` (extend) | `parseFrontmatter` with array values and with `---` on the last line without trailing newline. | no |

Each test must be written **before** the corresponding refactor lands (TDD) — for Task 1 the `resolveX` tests define the API.

---

## Tasks

### Task 1: `ViewState` and pure route resolvers

**What & Why:** Collapse the 11 route globals into `view ViewState` with a `LoadStatus` enum; split `showX` into `resolveX` (pure) + async loader. Removes impossible states and stale-state leaks, makes route loading unit-testable.

**Changes:** `src/types.go` (add types), `src/store.go` (replace globals), `src/router.go` (reset `view`, use resolvers), `src/app.templ` / `src/blog.templ` / `src/projects.templ` / `src/page.templ` (new signatures, switch on `Status`), `src/view_test.go` (new).

**Verify:** `gofront src --check`, `npm run test:gofront`, `npx playwright test --reporter=line` — `blog.spec.js`, `projects.spec.js`, `about.spec.js`, `error-states.spec.js` exercise every status branch.

### Task 2: CSS extraction

**What & Why:** Move the static CSS literal to `app/css/app.css`, link it from `index.html`, delete `styles.go`/`AppStyles`, enable Biome CSS checks. Gives tooling support, removes ~29 KB from `app.js`, gets CSS off the JS critical path.

**Changes:** `app/css/app.css` (new), `app/index.html`, `src/main.go`, `src/app.templ`, delete `src/styles.go`, `biome.json`. Two commits: extraction (verbatim), then `npm run format` result.

**Verify:** `npm run check` passes with CSS included; `npm run prod` → `public/css/app.css` exists and `public/app.js` is smaller than 104 KB by roughly the CSS size; full E2E green (`theme.spec.js` asserts CSS custom properties; `mobile-nav.spec.js` and `search.spec.js` depend on the `.show`/`.closing` transitions still being styled). Manual: load `/` in dev with cache disabled and confirm no unstyled flash beyond the existing pre-paint theme block.

### Task 3: Unit-test breadth

**What & Why:** Port the meaningful `master` unit coverage to Go per the table in Approach §3; add `--dom` to the test script. Restores the safety net for theme persistence, data mapping, search limits and redirect handling.

**Changes:** `package.json` (`test:gofront`), `src/router.go` (extract `resolveRedirect`), `src/store.go` (extract `postFromYAML`, `sortPostsByDate`), possibly `src/search.go` (test seam), new/extended `*_test.go` files listed above.

**Verify:** `npm run test:gofront` runs both directories with jsdom and reports every new test; `npm run prod` confirms `*_test.go` files are not in the bundle (grep `public/app.js` for `Test`).

### Task 4: Documentation

**What & Why:** Keep `AGENTS.md`, `README.md`, `CHANGELOG.md` and `docs/roadmap.md` truthful.

**Changes:** `AGENTS.md` Part 2 — "styles in `src/styles.go`" → "styles in `app/css/app.css`"; state rule mentions `view ViewState`. `README.md` — project structure and test command. `CHANGELOG.md` — one entry per task. `docs/roadmap.md` — move this plan to Completed on merge.

---

## Edge Cases

- **Stale state across routes:** navigating from a failed post (`LoadFailed`) to a project must not show the error branch — `handleRoute` resets `view` before dispatch. Covered by `error-states.spec.js` plus a `resolveX` test asserting a fresh struct.
- **Cache hit must not flash the spinner:** `resolvePost` on a cached slug returns `LoadReady` and `needsFetch == false`; the async wrapper must render exactly once in that path.
- **Project without repo:** `GithubRepo == ""` is `LoadReady` with empty `HTML`, and `loadGiscus()` must still run (current behaviour).
- **CSS ordering:** `app.css` must be linked *after* the inline critical block so its `body { padding-top }` and font rules win; and *before* the Prism theme `<link>` that `applyPrismTheme` appends to `<head>` (appending keeps it last, so this holds automatically).
- **Biome CSS formatter and the `@font-face` / vendor-prefixed rules:** the first `npm run format` may reflow long selectors; the extraction commit must be verbatim so any behavioural diff is attributable to formatting only. If Biome flags a rule as an error (e.g. duplicate property intentionally used as a fallback), disable that specific rule for `app/css/app.css` rather than "fixing" the CSS.
- **`--dom` and `localStorage`:** jsdom's `localStorage` persists across tests in one run; theme tests must `localStorage.clear()` and reset `data-theme` in setup.
- **`--dom` on `src/utils`:** the YAML package has no DOM needs; keep it on the plain runner so a jsdom hiccup cannot mask a parser failure.
- **`performSearch` and the `Fuse` global:** if `--dom` does not provide `window.Fuse`, `initSearch()` will not have run; the test must inject a fake or the seam must default to an empty index without panicking.

---

## Test Plan

- **Unit (Go, `gofront test src --dom` / `gofront test src/utils`):** everything in the Approach §3 table. Target: every `resolveX` branch, every `parseRoute` prefix, every `getInitialTheme` precedence level, `.md` stripping edge cases, `performSearch` guards.
- **Type check:** `gofront src --check` after each task — the `ViewState` signature change must produce compile errors at every stale call site rather than runtime `undefined`.
- **E2E (Playwright, all 10 suites, both browsers):** must stay at 114 passed with **no test edits** — the refactors are internal.
- **Build:** `npm run prod` after Task 2; record `public/app.js` and `public/css/app.css` sizes in the CHANGELOG entry. Confirm `public/app.js` contains no `Test` function names after Task 3.
- **Negative cases:**
  - Unknown post slug, unknown project id, unknown page id → `LoadFailed` view, error copy rendered, no uncaught promise (check console in `error-states.spec.js`).
  - README fetch failure (offline / 404) → `LoadFailed` for project, page title still set.
  - `#!redirect=` with a malformed percent-encoding → falls back to current path, does not throw.
  - Theme value in localStorage that is neither `dark` nor `light` → treated as `dark`, no CSS variables left unset.
- **Manual:** dev server with network throttled to "Slow 3G": page paints with correct theme colours before `app.css` arrives (critical block), then full styling applies without layout shift in the navbar height (`padding-top: 56px` in critical block must match `app.css`).
