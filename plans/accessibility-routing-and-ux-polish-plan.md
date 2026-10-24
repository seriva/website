# Accessibility, Routing and UX Polish — Design Plan

**Version:** continuous
**Status:** Completed (2026-09-25)

---

## Goal

Enhance accessibility, error routing, search experience, and mobile chrome integration across the site:
1. Provide a WCAG-compliant "Skip to content" link and an `aria-live` route announcer for screen readers.
2. Replace silent blog fallbacks on unrecognized URLs with an explicit 404 Route View ("Page Not Found").
3. Add command-palette style keyboard navigation (`ArrowDown`, `ArrowUp`, `Enter`) with active highlighting to the search overlay.
4. Dynamically sync the `<meta name="theme-color">` header with the active theme background on load and toggle.

---

## Out of Scope

- Redesigning the search modal or building complex command palette features (command actions, fuzzy algorithms).
- Server-side redirects or complex routing libraries; staying within GoFront pure functions and router architecture.
- Adding third-party accessibility or theme libraries.
- Changing existing route URLs or Markdown content schemas.

---

## Approach

### 1. Accessibility: Skip Link & Live Route Announcer
- **Skip Link:** Add `<a href="#main-content" class="skip-link">{ t("nav.skipToContent") }</a>` at the top of `AppShell` in `src/app.templ`. Style `.skip-link` in `app/css/app.css` to be visually hidden off-screen until focused, whereupon it drops down at the top of the viewport.
- **Route Announcer:** Add an offscreen `#route-announcer` (`aria-live="polite"`, `aria-atomic="true"`, `.sr-only`) to `AppShell`. When `handleRoute()` finishes loading and setting document title/meta, call `announceRoute(title)` to announce `"Navigated to " + title`.
- **Translations:** Add `nav.skipToContent`, `general.pageNotFound`, `general.pageNotFoundMessage`, and `general.backToHome` to `app/data/content.yaml` and recompile to `content.json`.

### 2. Explicit 404 Route View for Unknown Paths
- Add `RouteNotFound` enum value to `Route` in `src/types.go`.
- In `src/router.go`, update `parseRoute(path)` so unrecognized paths (anything other than root, blog, blog pagination, valid post, project, or page) resolve to `RouteMatch{Kind: RouteNotFound}` instead of defaulting to `RouteBlog`.
- Add `showNotFound()` in `src/router.go` to set `<title>Page Not Found - ...</title>` and render the route.
- Add `NotFoundView()` in `src/app.templ` rendering `.error-message` with `general.pageNotFound` heading, explanatory text, and a "Back to Home" button.

### 3. Command Palette Keyboard Navigation for Search
- In `src/search.go`, maintain `searchSelectedIndex int` initialized to `-1` on query input/change.
- Implement `searchSelectNext()`, `searchSelectPrev()`, and `searchOpenSelected()`.
- Add keyboard event handling for `ArrowDown`, `ArrowUp`, and `Enter` (when search is open) to cycle through results and navigate on `Enter`.
- Update `SearchResultsList` in `src/search.templ` and `.search-result-item.selected` in `app/css/app.css` to visually highlight the selected result and scroll it into view if needed.

### 4. Dynamic `<meta name="theme-color">` Syncing
- In `app/boot.js`, update `<meta name="theme-color">` during the inline synchronous theme detection to `#0D1117` (dark) or `#FFFFFF` (light).
- In `src/theme.go`, add `updateThemeColorMeta(theme string)` called from `applyTheme()` so toggling light/dark instantly synchronizes the `<meta name="theme-color">` tag with `colors.Background`.

---

## Edge Cases

- **Skip link with smooth scroll / hash navigation:** The skip link targets `#main-content`. Must ensure clicking/activating it shifts keyboard focus to `#main-content` without getting trapped in navbar listeners.
- **Search keyboard cycling:** Pressing `ArrowDown` at the end of the list wraps to the top (or first result); pressing `ArrowUp` at index 0 wraps to the bottom. Modifying input text resets `searchSelectedIndex` to `-1`.
- **404 page title & history:** Navigating to an unknown route must keep the URL in the address bar (no pushState rewrite to `/404`), show the 404 view, set `document.title`, and announce the 404 state to screen readers.
- **Missing theme-color meta:** In tests or environments without the meta tag in DOM, `updateThemeColorMeta` must safely no-op without panicking.

---

## Test Plan

- **GoFront Unit / DOM Tests (`gofront test src --dom`):**
  - Update `TestParseRoute` in `src/router_test.go` to assert unknown paths return `RouteNotFound`.
  - Add tests for `searchSelectNext`, `searchSelectPrev`, and keyboard selection in `src/search_test.go`.
  - Add tests for `updateThemeColorMeta` in `src/theme_test.go`.
- **E2E Tests (`playwright test`):**
  - Add test in `tests/e2e/navigation.spec.js` asserting the skip link exists, is hidden off-screen until focused, and focuses `#main-content` on Tab+Enter.
  - Add tests in `tests/e2e/error-states.spec.js` asserting an arbitrary path like `/non-existent-page` renders the 404 view with "Page Not Found", correct `<title>`, and working back-to-home button.
  - Add tests in `tests/e2e/search.spec.js` asserting `ArrowDown`/`ArrowUp` toggles `.selected` class on results and `Enter` navigates to the selected item.
  - Add assertion in `tests/e2e/theme.spec.js` verifying `meta[name="theme-color"]` matches the theme background on toggle.
- **Verification Gates:**
  - `npm run check` (Biome + GoFront typecheck)
  - `npm run test:gofront`
  - `npm run test:build`
  - `npm run prod`
