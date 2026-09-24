# State-Driven Rendering & templ Idioms — Design Plan

**Version:** continuous
**Status:** Completed (2026-09-23)

---

## Goal

Bring the codebase in line with the GoFront `example/templ` idiom: **application state is the
single source of truth and the DOM is derived from it**. Today the templates already derive
classes from state (`navbarCollapseClass(mobileMenuOpen)`, `searchPageClass(open, closing)`, …)
but the same classes are also toggled imperatively via ~36 `document.querySelector` +
`classList.add/remove` calls spread across `main.go`, `search.go`, `email.go` and `router.go`.
Route matching is likewise done twice (once in `router.go`, once with `strings.HasPrefix` in
`app.templ`). Alongside that, a handful of small templ/HTML misuses exist (`?=` on ARIA
attributes, `href="javascript:void(0)"`, `fmt.Sprintf` for ints in templates, dead code).

Done looks like: one `parseRoute()` used by both router and view, one `syncOverlays()` that
reconciles overlay classes from state, region-scoped renders instead of whole-app remounts,
correct ARIA values, a single `Icon()` component, and no behavioural or visual regression
(all Playwright specs green, including the "no `#main-content` redraw" and "search caret
preserved" assertions).

---

## Out of Scope

- **Visual/CSS changes.** Class names, animations and layout stay identical. `styles.go` is
  only touched if a selector must follow a tag change (`a.dropdown-toggle` → `button`).
- **Content / data schema.** No changes to `app/data/**`.
- **Replacing external libraries** (`marked`, `prismjs`, `fuse.js`, `emailjs`) or changing how
  they are vendored/exposed on `window`.
- **Weakening E2E assertions.** Selectors used by tests (`.dropdown-toggle`, `.navbar-toggle`,
  `#search-page-clear`, `#contact-submit`, `svg.icon-*`) must keep working unchanged.
- **Reactive signals.** The site stays on the plain `render()` model; no `reactive.js`.

---

## Approach

Work is split into five phases. Phases A, D and E are independent; B must land before C.

### Phase A — Small templ/HTML fixes (safe, no architectural change)

1. **ARIA values.** `aria-expanded?={ x }` and `aria-invalid?={ x }` emit `aria-expanded=""`
   (an invalid token). Replace with `aria-expanded={ strconv.FormatBool(x) }` in
   `navbar.templ` (toggle button + projects dropdown) and `aria-invalid={ strconv.FormatBool(x) }`
   in `contact.templ` (3 inputs). Keep `?=` for genuine boolean attributes (`disabled`,
   `allowfullscreen`).
2. **Dropdown toggle is a `<button>`.** Replace
   `<a href="javascript:void(0)" role="button" …>` with
   `<button type="button" class="nav-link dropdown-toggle …" aria-haspopup="true" …>`.
   `javascript:` URLs are blocked by the CSP and are an a11y anti-pattern. Add `type="button"`
   to every non-submit `<button>` in the templates (`.navbar-toggle`, `#search-toggle`,
   `#theme-toggle`, `#email-toggle`, `#fullscreen`, `.search-page-back`, `#search-page-clear`,
   `.contact-modal-close`). Verify `.dropdown-toggle` rules in `styles.go` (lines ~472, ~668)
   still apply to a button (reset `background/border/font` if needed).
3. **Drop `fmt` from templates.** templ auto-`String()`s non-string expressions, so
   `data-index={ fmt.Sprintf("%d", index) }` → `data-index={ index }` and
   `{ fmt.Sprintf("%d", pageNum) }` → `{ pageNum }` in `blog.templ`. `footer.templ` keeps
   `fmt.Sprintf` (formatting a sentence is legitimate).
4. **Dead code.** Remove empty `initMarkdown()` (+ call in `main()`), the unreachable
   `errHappened` flag and `if sendRes == nil && errHappened` check in `submitContact`, and the
   redundant `el != nil` guard in `renderSearchResults`.

### Phase B — Single route model

1. Add to `types.go`:
   ```go
   type Route int
   const (
       RouteBlog Route = iota
       RoutePost
       RouteProject
       RoutePage
   )
   type RouteMatch struct {
       Kind Route
       Param string // slug / project id / page id
       Page  int    // blog page number (RouteBlog only, ≥1)
   }
   ```
2. Add pure `parseRoute(path string) RouteMatch` in `router.go` covering: `/`, `/blog`,
   `/blog/page/N` (invalid/negative → 1), `/blog/<slug>`, legacy `/blog/post/<slug>`,
   `/project/<id>`, `/page/<id>`, unknown → `RouteBlog` page 1. The `#!redirect=` hash
   unwrapping stays in `handleRoute` (it touches `window.history`) but feeds `parseRoute`.
3. Replace the `currentRoute string` global with `var route RouteMatch`. `handleRoute`
   becomes: unwrap redirect → `route = parseRoute(path)` → `switch route.Kind` → load data →
   render. Navbar active-state helpers take `route` (`navLinkClass(route.Kind == RouteBlog)`,
   `dropdownToggleClass(route.Kind == RouteProject)`, `dropdownItemClass(route.Kind == RouteProject && route.Param == p.ID)`).
4. Add `templ RouteView(r RouteMatch)` in `app.templ` with a `switch r.Kind { … }` replacing
   the `strings.HasPrefix` chain; `AppShell` calls `@RouteView(route)`. Drop the `strings`
   import from `app.templ`.
5. `router_test.go` with table-driven tests for `parseRoute` (run via `gofront test src`).

### Phase C — State-driven rendering

1. **Static shell, region renders.** `AppShell()` is mounted **once** in `main()` and gains
   stable slot elements. `render()` is replaced by:
   ```go
   func renderMain()      { gom.Mount("#main-content", RouteView(route)) }
   func renderNavbar()    { gom.Mount("#navbar-slot", Navbar(...)) }
   func renderSearchResults() { gom.Mount("#search-page-results", SearchResultsList(...)) } // exists
   func renderContactForm()   { gom.Mount("#contact-form-slot", ContactFormBody(contactForm)) }
   ```
   `handleRoute` calls `renderNavbar()` + `renderMain()`; contact validation calls only
   `renderContactForm()` (the modal chrome is never remounted, so focus handling is simpler).
   Extract `ContactFormBody(form ContactState)` (the `<form>` contents) from `ContactModal`.
2. **One reconciler for overlay classes.** The navbar collapse and dropdown animate with CSS
   `transition: max-height`, which requires toggling a class on an *existing* element — a
   remount would skip the animation. So overlays are not remounted; instead a single
   ```go
   func syncOverlays() {
       toggleClass(".navbar-toggle",   "active",  mobileMenuOpen)
       toggleClass(".navbar-collapse", "show",    mobileMenuOpen)
       toggleClass(".dropdown",        "show",    projectsDropdownOpen)
       toggleClass("#search-page",     "show",    searchOpen || searchClosing)
       toggleClass("#search-page",     "closing", searchClosing)
       toggleClass("#search-page-clear","show",   searchQuery != "")
       toggleClass("#contact-modal",   "show",    contactOpen || contactClosing)
       toggleClass("#contact-modal",   "closing", contactClosing)
       toggleClass("html", "modal-open", contactOpen); toggleClass("body", "modal-open", contactOpen)
   }
   ```
   (`toggleClass(sel, cls string, on bool)` → `el.classList.toggle(cls, on)`.) Every handler
   becomes *mutate state → `syncOverlays()`*: `toggleMobileMenu`, `closeMobileMenu`,
   `toggleProjectsDropdown`, `closeProjectsDropdown`, `openSearch`, `openSearchWithTag`,
   `closeSearch`, `handleSearchInput`, `openContact`, `closeContact`, the `clear-search`
   action and the reset block at the top of `handleRoute`. The templ class helpers
   (`toggleBtnClass`, `searchPageClass`, `searchClearClass`, `contactModalClass`, …) stay so
   a fresh mount is also correct. Since the shell is mounted once, also set `aria-expanded`
   in `syncOverlays()` for the two toggles.
3. **Search input value.** `openSearchWithTag` and `clearSearch` still need to set
   `#search-page-input.value` (it is user-owned DOM state, not derived). Keep exactly one
   helper `setSearchInput(v string)` for that; remove all other direct reads/writes.
4. **Contact form values from events.** Extend the existing `input` delegation on `#app`:
   when `e.target.closest("#contact-form")` matches, write `e.target.value` into
   `contactForm.Name/Email/Message` by `e.target.name`. `submitContact` then validates state
   only and stops reading `#contact-name` etc. Focus-on-open (`#contact-name`,
   `#search-page-input`) stays as the only remaining `querySelector` uses in those files.
5. **`store.go` / `comments.go`** keep their `querySelector` calls (`updateMeta`, giscus
   container/iframe) — those are integrations with third-party DOM, not UI state.

Expected outcome: `main.go`/`search.go`/`email.go`/`router.go` go from ~30 `querySelector`
calls to ≈6 (`#app`, focus targets, `setSearchInput`, `#demo` fullscreen, `.giscus-*`).

### Phase D — Icons

Replace the 20 `templ IconX(size)` components + `DynamicIcon` switch with:
```go
// icons.go
type iconDef struct{ ViewBox, Path string }
var icons = map[string]iconDef{ "sun": {...}, "moon": {...}, ... }
func iconSvg(name, size string) string  // returns "" for unknown name; class="icon icon-<name>"
```
```templ
templ Icon(name string, size string) {
    @templ.Raw(iconSvg(name, size))
}
```
Call sites become `@Icon("search", "1.35rem")`. Keep aliases `angle-double-left/right` by
mapping them in `icons`. `svg.icon-<name>` classes are preserved (asserted by `blog.spec.js`).
`@templ.Raw` stays necessary because templ emits `document.createElement`, which cannot create
SVG-namespace elements. `iconSvg` must escape `size` with `html.EscapeString` since it is
interpolated into raw markup.

### Phase E — Hygiene

1. Move the inline theme-bootstrap script and the `window.sleep/createFuse/objectEntries`
   shims from `index.html` into `app/js/boot.js` (classic script, loaded first) so
   `'unsafe-inline'` can be dropped from `script-src`. Keep `style-src 'unsafe-inline'`
   (needed for `style.setProperty` / injected `<style>`).
2. In `scripts/copy-static.js`, rewrite the CSP meta while copying `index.html` to `public/`
   to strip `http://localhost:*`, `ws://localhost:*`, `wss://localhost:*` origins.
3. Replace hard-coded "GoFront v1.2.0" in `package.json` `description`, `AGENTS.md` and
   `README.md` with the version-free "GoFront" (the project is unversioned; the dependency
   range `^1.2.0` already covers 1.2.1).

### Alternatives considered

- **Remount overlays on every state change** (pure templ idiom, zero `classList` code):
  rejected — breaks `max-height` transitions on navbar/dropdown and would drop the search
  caret unless the input is split into its own never-remounted slot. `syncOverlays()` gets
  the single-source-of-truth benefit with far less risk.
- **Keep whole-app `render()`**: rejected — every contact-form validation error and every
  route change rebuilds navbar, footer and both modals; region renders are simpler to reason
  about and cheaper.
- **`children...` composition for modals**: not needed; explicit props are already in place.

---

## Edge Cases

- `#main-content` identity must survive dropdown/mobile toggles and search typing
  (`navigation.spec.js`, `search.spec.js`). Region renders never touch `#main-content` for
  those actions.
- Search caret position while typing: only `#search-page-results` and classes change; the
  `<input>` element is never remounted (`search.spec.js`).
- `closeSearch`/`closeContact` two-step animation (`show closing` → removed after 200 ms):
  the `setTimeout` still flips `searchClosing/contactClosing = false` then `syncOverlays()`.
  Navigating mid-animation: `handleRoute` sets all overlay state false and calls
  `syncOverlays()` — no dangling `closing` class.
- Route change while mobile menu open (link inside collapse): `closeMobileMenu()` runs before
  `renderNavbar()`; remounting a closed navbar has no transition to lose.
- `renderNavbar()` on every route (needed for active link): the dropdown is closed by then, so
  no open-dropdown remount.
- `parseRoute`: trailing slashes, `/blog/page/abc`, `/blog/page/0`, `/blog/post/<slug>`
  legacy, `/project/` (empty id → blog fallback), `#!redirect=` with encoded path, unknown paths.
- Contact form: browser autofill fires `input` events → state stays in sync; if it doesn't,
  submit falls back to reading current `contactForm` (empty) → validation error, same as
  today's empty-field behaviour. Pressing Enter in a field submits via the `submit` delegate.
- `aria-expanded` after Phase C is set by both the templ (initial mount) and `syncOverlays()`
  (subsequent toggles) — both must produce `"true"`/`"false"`.
- Icons: unknown `link.Icon` from YAML → `iconSvg` returns `""` → nothing rendered (same as
  today's `DynamicIcon` default case).
- CSP: after moving scripts out, verify no console CSP violations on load, theme toggle,
  search, contact submit, giscus load, YouTube embed.

---

## Test Plan

- **Unit (`gofront test src`):**
  - `router_test.go` — table test for `parseRoute` (all cases above).
  - `render_helpers_test.go` — extend for `dropdownItemClass`/`navLinkClass` with `RouteMatch`.
  - `icons_test.go` — `iconSvg` returns expected `class="icon icon-<name>"`, viewBox, `""` for
    unknown, escapes `size`.
  - `email_test.go` — `isValidEmail` unchanged; add a validation-only test for
    `validateContact(form) (ContactState, bool)` if the validation is extracted from
    `submitContact` (recommended so it is testable without DOM).
- **Compiler / lint:** `npx gofront src --check`, `npm run check`.
- **E2E (`npm run test:e2e`, Chromium + Firefox):** full suite must stay green, with special
  attention to `navigation.spec.js` (dropdown w/o redraw), `search.spec.js` (caret + clear),
  `mobile-nav.spec.js`, `contact.spec.js` (validation errors, success path), `blog.spec.js`
  (pagination `svg.icon-*`), `projects.spec.js` (`.dropdown-toggle` active class).
- **Negative:** unknown route renders blog; `/project/does-not-exist` shows not-found;
  contact submit with EmailJS rejection shows error state (mock via `page.route` if not
  already covered).
- **Manual verification (log in CHANGELOG entry):**
  1. Mobile menu and projects dropdown still animate open/close.
  2. Search and contact modals animate in/out; Escape closes both.
  3. Devtools console shows no CSP violations across a full click-through.
  4. Lighthouse a11y: `aria-expanded` reports `true/false`; dropdown toggle is a button.
- **Build:** `npm run prod` succeeds; `public/index.html` CSP contains no `localhost`.

---

## Rollout order & commits

1. `refactor(templ): fix ARIA values, button semantics, drop fmt in templates, remove dead code` (Phase A)
2. `refactor(router): introduce Route enum and parseRoute with tests` (Phase B)
3. `refactor(render): region renders and syncOverlays reconciler` (Phase C)
4. `refactor(icons): single Icon component backed by icon map` (Phase D)
5. `chore(security): externalise inline scripts, strip dev origins from prod CSP` (Phase E)

Each commit passes `npm run check`, `gofront src --check`, `gofront test src`, and the E2E
suite before the next phase starts.

---

## Completion notes (2026-09-23)

- All five phases implemented; `gofront test src` (incl. new `router_test.go`, `icons_test.go`,
  `validateContact` tests), `npm run check`, `npm run test:unit`, 114/114 Playwright tests and
  `npm run prod` pass. Headless click-through (dropdown, theme, search, contact validation,
  project navigation) produced no console or CSP errors; `aria-expanded`/`aria-invalid` report
  `"true"`/`"false"`; `public/index.html` CSP contains no `localhost` origins.
- Deviations from the plan:
  - `MainContent()` (wrapping `<main>`) is mounted into `#content-slot` instead of mounting into
    a static `<main>`, so the existing `main { animation: fadeIn }` route transition still
    replays. Slots use `display: contents` (one CSS rule added).
  - `/project/` and `/page/` with an empty id fall back to the blog list (trailing slash is
    trimmed before matching).
  - Boot scripts live at `app/boot.js` / `app/prism-init.js` (not `app/js/`, which is gitignored
    for generated assets).
  - GoFront was bumped to `^1.2.1`. A GoFront codegen bug surfaced (`for k := range m` yielded
    `[key, value]` pairs); fixed upstream in the gofront repo (unreleased) and worked around in
    `icons_test.go` with `for name, _ := range icons` until the next gofront release.
