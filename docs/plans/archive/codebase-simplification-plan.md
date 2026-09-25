# Codebase Simplification — Design Plan

**Version:** continuous
**Status:** Completed (2026-09-25)

Outcome: all gates green (`test:gofront`, 132 e2e on chromium + firefox, `prod`, `check`); `public/app.js` 79.0 KB → 76.6 KB;
generated stubs/sitemap/RSS identical to baseline apart from the removed `<head>` hints. Deviations from the
draft: `blog/page/1` stub kept as an alias; `Href` fields kept (B4) instead of methods; `pageNumbers` kept because
templ `for` only supports range loops; TOC item class built inline with `strconv.Itoa(level)`; e2e locators for the
navbar `/blog` link scoped to `.nav-link` since pagination now also links to `/blog`.

---

## Goal

Remove duplication and structural weight from the website without changing any user-visible
behaviour. Every route, overlay, animation, keyboard shortcut, meta tag and generated artifact
(`sitemap.xml`, `rss.xml`, route stubs) must work exactly as today; the full Playwright suite is
the acceptance gate. Done looks like: fewer globals, one content cache, one route-loading path,
no `closing` state machine, ~10 fewer helper functions, and a `build.js` that only contains code
`package.json` actually invokes.

Baseline: `npm run test:gofront` green, `npm run test:e2e` green (chromium + firefox),
`npm run prod` succeeds. Record the numbers before starting.

---

## Out of Scope

- Switching `content.yaml` to JSON (considered separately; changes the authoring format).
- Deleting `docs/plans/archive/` or trimming `README.md` (docs, not code).
- Any new feature, visual change, or dependency. `rolldown` stays — `gofront prep` loads it
  from our devDependencies for vendor bundling.
- Touching the in-progress `src/loader.go` / `boot.js` change beyond rebasing on it once committed.
- Rewriting `scripts/build.js` structure (only unreachable code is removed).

---

## Approach

Work in three phases, each independently committable and each ending with all gates green.
Phase A is delete-only; B and C are refactors and depend on A only for a clean diff.

### Phase A — Delete unreachable and redundant code

| # | Item | Where | Change |
|---|------|-------|--------|
| A1 | Dead translation keys | `app/data/content.yaml` `translations.en` | Remove `search.loading`, `blog.backToBlog`, `blog.previous`, `blog.next`, `project.demoInstructions`, `general.error`, `general.errorMessage`, `dropdown.loadingProjects`, `code.copyFailed`. **Keep** `contact.send` / `contact.sending`: used dynamically via `t("contact." + form.ButtonState)` in `contact.templ`. |
| A2 | Unused icons | `src/icons.go` | Remove `angle-double-left`, `angle-double-right` (templates use `angles-left` / `angles-right`). |
| A3 | Unreachable `build.js` CLI surface | `scripts/build.js` | `package.json` only calls `content`, `dev`, `post`. Remove `watch`, `sync|static|public`, `seo`, `routes`, `all` cases; the `DEFAULT_PUBLIC_ASSETS` constant (duplicates `pkg.publicAssets`) and the `pkg.staticAssets` fallback; the YAML fallback in `loadContentData()` (`content.json` always exists after the `content` step); the header comment listing removed commands. Keep `watchContent()` as a plain function called by `runDev()`. |
| A4 | `getBaseUrl()` heuristics | `scripts/build.js` | `site.url` is always set in `content.yaml`. Reduce to `contentData.site.url.replace(/\/$/, "")` and fail loudly if missing. |
| A5 | Legacy / duplicated meta | `src/store.go` `updateMetaTags()` | Drop `msapplication-TileColor`. Keep the rest — `theme-color` and `author` are not in the prerendered stubs. |
| A6 | Redundant resource hints | `app/index.html` | Remove `<link rel="dns-prefetch" …githubusercontent>` (implied by the `preconnect` below it) and both `<link rel="modulepreload">` tags (`vendor.js` / `app.js` are `<script type="module">` in the same document; the preload scanner already sees them). |
| A7 | Duplicate page-1 URL | `src/render_helpers.go` `pageHref()` | Return `/blog` for page 1 so "First" and "Previous"→1 point at the canonical URL (`parseRoute` already treats `/blog` as page 1). Update `TestPageHref`. Mirror in `build.js` route generation: emit `blog/page/1` stub no longer (or keep as alias — decide; keeping is harmless, sitemap should list only `/blog`). |

### Phase B — Collapse state and caches

**B1. One content cache.** Replace the five maps in `store.go`
(`readmeCache`, `readmeTOCCache`, `postHtmlCache`, `postTOCCache`, `pageHtmlCache`) with

```go
type cachedContent struct {
	HTML string
	TOC  []TOCItem
}
var contentCache = map[string]cachedContent{}
```

keyed by **route path** (`/blog/<slug>`, `/project/<id>`, `/page/<id>`). Resolvers in `view.go`
change signature to `resolveX(param, all, cache map[string]cachedContent)` and populate both
`v.HTML` and `v.TOC` on a hit, which deletes the three `if cachedTOC, ok := …` branches in
`router.go`. Trade-off accepted: two projects pointing at the same GitHub repo no longer share a
README cache entry (one extra fetch, no behaviour change).

**B2. One route loader.** With B1, `showPost` / `showProject` / `showPage` differ only in
(a) the URL to fetch, (b) how markdown is turned into `{HTML, TOC}`, (c) post-render hooks.
Introduce in `router.go`:

```go
// loadRoute fetches url, transforms it, caches under key and renders — unless the
// route was superseded (routeSeq changed) while the fetch was in flight.
async func loadRoute(key string, url string, transform func(string) cachedContent) bool
```

returning `false` when superseded so the caller returns early. Each `showX` becomes:
meta update → `if needsFetch { if !await loadRoute(...) { return } }` → `renderRoute()` →
hooks. `stripFrontmatter` / `extractTOC` / `extractProjectTOC` / `injectHeadingIDs` move into the
per-route `transform` closures. The `LoadPending` status stays; nothing else in `ViewState` changes.

**B3. Drop the `closing` state machine.** `searchClosing`, `contactClosing`, the two `setTimeout(200)`
in `closeSearch` / `closeContact`, `overlayClass`'s third state, and the `closing` parameter on
`SearchModal` / `ContactModal` are removed. CSS takes over the exit animation:

```css
#search-page, #contact-modal {
	visibility: hidden;
	opacity: 0;
	transition: opacity 0.2s ease-in, visibility 0s linear 0.2s;
}
#search-page.show, #contact-modal.show {
	visibility: visible;
	opacity: 1;
	transition: opacity 0.25s ease-out, visibility 0s;
}
#search-page.show .search-page-content,
#contact-modal.show .contact-modal-content { animation: scaleFadeIn 0.25s ease-out forwards; }
```

`display: none` → `display: flex` becomes a static `display: flex` on the base rule; the
`scaleFadeOut` / `fadeOut` keyframes and the `.closing` rules are deleted. `syncOverlays()` loses
its `|| xClosing` terms. `closeContact` still calls `resetContactForm()` — do it synchronously;
the form is invisible by the time it re-renders.

**B4. Redundant struct fields.** `BlogPost.ID` always equals `BlogPost.Slug`; remove `ID`
(`resolvePost` matches on `Slug` only). Remove `Href` from `BlogPost`, `Project`, `NavPage`
and add three one-line methods (`func (p BlogPost) Href() string { return "/blog/" + p.Slug }`
etc.) — or keep the field and delete the duplicated string concatenation in `search.go`. Pick
whichever GoFront compiles more cleanly; the goal is a single place that knows the URL shape.

**B5. `CommentsConfig` → raw object.** Giscus takes its config as `data-*` attributes 1:1.
Store `site.Comments` as `any` (the raw JSON object) plus two typed bools (`BlogEnabled`,
`ProjectsEnabled`), and in `loadGiscus()` iterate the object's keys, converting camelCase to
kebab-case for the attribute name. Deletes the 12-field struct, the mapping block in `initData`,
and 10 `setAttribute` lines. `giscusTheme()` is unchanged.

### Phase C — Helper consolidation

**C1. Class builders.** `toggleBtnClass`, `navbarCollapseClass`, `dropdownClass`, `navLinkClass`,
`dropdownToggleClass`, `dropdownItemClass`, `pageItemPrevClass`, `pageItemNextClass`,
`pageItemClass`, `searchClearClass`, `inputErrorClass`, `tocItemClass` are all
`base + (cond ? " extra" : "")`. Replace with one helper:

```go
// cls appends extra to base when on is true.
func cls(base string, on bool, extra string) string
```

and call it inline from the templates, e.g. `class={ cls("nav-link", r.Kind == RouteBlog, "active") }`.
`overlayClass` becomes `cls("", open, "show")` (after B3). `formStatusClass` stays (it appends a
variable). `pageNumbers(n)` (returns `1..n`) is replaced by a `for i := 1; i <= totalPages; i++`
loop in `Pagination` if GoFront templ supports it; otherwise it stays.

**C2. Tests.** Delete the twelve per-helper tests in `render_helpers_test.go` and add one
table-driven `TestCls`. Update `view_test.go` for the `cachedContent` cache type. Remove
`TestOverlayClass`'s closing case. `components_test.go` mounts must still pass unchanged — they
are the guard that the class strings did not drift.

**C3. AGENTS.md / README.md** — update the "State drives the DOM" and "Route content" rules to
mention `contentCache` / `loadRoute` and drop references to `xClosing`. Add a CHANGELOG entry.

---

## Edge Cases

- **Dynamic translation keys** — `t("contact." + form.ButtonState)`: grep-based dead-key
  detection misses these. Before deleting a key, also grep for the prefix (`"contact."`).
- **Stale fetch guard** (B2) — `routeSeq` must be captured *before* `await` and compared
  *after*; `loadRoute` must still write to the cache even when superseded (the content is valid
  for its key), but must not touch `view` or render.
- **Cache key vs. not-found** (B1) — `resolvePost` for an unknown slug must return
  `LoadNotFound` without consulting the cache; `resolvePage` still fetches unknown ids so the
  markdown 404 is the source of truth.
- **Exit animation with `visibility`** (B3) — the overlay must be non-interactive while hidden
  (`visibility: hidden` does this; `opacity: 0` alone does not). Playwright `toBeHidden()` treats
  `visibility: hidden` as hidden, so existing e2e assertions hold. Verify Escape during the 200 ms
  fade does nothing harmful (previously guarded by `if !contactOpen`).
- **Backdrop click** in `main.go` checks `target.id == "search-page"` / `"contact-modal"`; with
  `display: flex` always on, an invisible overlay must not intercept clicks — covered by
  `visibility: hidden`.
- **`pageHref(1)` → `/blog`** (A7) — `navigate()` compares against `location.pathname`; going
  from `/blog/page/2` to `/blog` must still trigger `handleRoute`. Sitemap must not list both
  `/blog` and `/blog/page/1`.
- **Giscus attribute casing** (B5) — YAML keys are camelCase (`repoId`, `reactionsEnabled`);
  giscus expects `data-repo-id`, `data-reactions-enabled`. Convert with a small `kebab()`.
  Booleans in YAML (`strict: "0"`) are already strings; keep them as-is.
- **Prerendered stubs** — `build.js` route generation must produce byte-identical output for
  all routes except any intentional `blog/page/1` change (diff `public/` before/after).

---

## Test Plan

- **Baseline capture:** run `npm run test:gofront` and `npm run test:e2e`; note counts. Run
  `npm run prod` and snapshot `public/sitemap.xml`, `public/rss.xml`, and the list of generated
  `index.html` stubs for a before/after diff.
- **Unit (`gofront test src --dom`):**
  - `TestCls` table: empty base, `on=false`, `on=true`, base with existing spaces.
  - `view_test.go`: cache hit returns `HTML` **and** `TOC` from `cachedContent`; empty `HTML`
    counts as a miss; unknown slug → `LoadNotFound` regardless of cache.
  - `router_test.go`: unchanged (`parseRoute` untouched) — plus a `loadRoute` test with a stubbed
    fetch that bumps `routeSeq` mid-flight and asserts `view` is not mutated but the cache is.
  - `components_test.go`: all existing mounts pass; `SearchModal` / `ContactModal` signatures
    updated (no `closing`).
  - `icons_test.go`: registry lookup still passes for every icon referenced in templates.
- **E2E (`npm run test:e2e`, chromium + firefox):** entire suite must pass with no spec changes
  except where a spec asserted on the removed `closing` class (none found — verify with grep).
  Pay attention to `search.spec.js` (open/close/Escape/backdrop), `contact.spec.js`
  (close after success), `blog.spec.js` (First/Previous links), `projects.spec.js` (TOC after
  cached revisit), `theme.spec.js` (giscus theme message still posted).
- **Negative cases:** navigate away during a slow README fetch (throttle in DevTools) — old
  content must not paint over the new route; open contact, press Escape immediately, reopen —
  form is reset and focused; project without `github_repo` renders Media/Demo/Links TOC.
- **Build:** `npm run check`, `npm run prod`; diff `public/` against the baseline snapshot.
