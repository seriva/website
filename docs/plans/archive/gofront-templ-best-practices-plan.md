# GoFront & templ Best Practices Refactoring — Design Plan

**Version:** continuous  
**Status:** Completed (2026-09-23)  

---

## Goal

Refactor the portfolio website codebase to strictly adhere to GoFront and `templ` best practices. This eliminates architectural anti-patterns including mixed declarative/imperative DOM manipulation, moves non-markup Go helper functions out of `.templ` files into a dedicated Go helper file, parameterizes components with explicit props instead of coupling to global state, decomposes monolithic templates into reusable components, and secures raw HTML interpolation in search results. Done looks like a clean, idiomatic GoFront + `templ` codebase with zero visual or behavioral regressions and 100% passing E2E tests.

---

## Out of Scope

- **Visual Design & CSS Changes:** No styling or layout redesigns. All UI classes, CSS animations, and visual appearance remain unchanged.
- **Content & Data Schema Changes:** No changes to `app/data/content.yaml` or any Markdown documents.
- **Rewriting JS Dependencies:** `marked`, `prismjs`, `fuse.js`, and `emailjs` remain external libraries bundled via `gofront prep` and typed via `src/browser.d.ts`.
- **E2E Test Assertion Changes:** No weakening or altering of existing Playwright assertions in `tests/e2e/`.

---

## Approach

### 1. Separate Go Helpers from `.templ` Markup
In GoFront and canonical `templ`, `.templ` files should contain only `templ ComponentName(...) { ... }` declarations. All regular Go logic, calculations, and class-formatting helpers belong in `.go` files:
- Create `src/render_helpers.go` containing:
  - **Navbar helpers:** `toggleBtnClass`, `navbarCollapseClass`, `dropdownClass`, `navLinkClass`, `dropdownToggleClass`, `dropdownItemClass`
  - **Blog & pagination helpers:** `paginatedPosts`, `calcTotalPages`, `pageItemPrevClass`, `pageItemNextClass`, `pageItemClass`, `pageHref`, `pageNumbers`
  - **Project helpers:** `demoLabel`, `demoWrapperClass`
  - **Search helpers:** `searchPageClass`, `searchClearClass`, `searchPlaceholderText`, and HTML-safe `highlightMatchSafe`
  - **Contact helpers:** `contactModalClass`, `inputErrorClass`, `formStatusClass`
  - **Footer helpers:** `currentYear`
- Clean all `.templ` files (`blog.templ`, `navbar.templ`, `projects.templ`, `search.templ`, `contact.templ`, `footer.templ`) so they contain only pure template declarations.

### 2. Component Props & Parameterization
Replace zero-argument components that close over package-level mutable globals with parameterized pure components:
- `AppShell()` acts as the composition root, reading state and passing down typed props.
- `Navbar(currentRoute string, pages []NavPage, projects []Project, dropdownOpen bool, mobileOpen bool, siteConfig SiteConfig)`
- `BlogList(allPosts []BlogPost, currentPage int, perPage int)`
- `BlogPostView(post BlogPost, html string, loading bool, isError bool, commentsEnabled bool)`
- `ProjectDetail(p Project, readmeHtml string, loading bool, isError bool, commentsEnabled bool)`
- `PageView(p NavPage, html string, loading bool, isError bool)`
- `Footer(year int, author string)`
- `SearchModal(open bool, closing bool, query string, results []SearchResultItem, placeholder string)`
- `SearchResultsList(results []SearchResultItem, query string)`
- `ContactModal(open bool, closing bool, state ContactState)`

### 3. Component Granularity & Decomposition
- Extract `@BlogPostCard(post BlogPost, index int)` from `BlogList`.
- Extract `@Pagination(currentPage int, totalPages int)` from `BlogList`.

### 4. Harmonize Declarative State with Zero-Redraw Requirements
- Maintain targeted updates (`gom.Mount("#search-page-results", SearchResultsList(...))`) so typing in search does not remount `#main-content` or drop input cursor position.
- Unify open/close states between Go state variables and DOM representations to eliminate ghost/dead code in class helpers.

### 5. Secure HTML Highlighting in Search
- Sanitize HTML special characters (`<`, `>`, `&`, `"`) in `highlightMatchSafe` before wrapping matched query substrings in `<mark>...</mark>`, ensuring `@templ.Raw` injection is completely XSS-safe.

---

## Edge Cases

- **Search Input Cursor Preservation:** Re-rendering search results must strictly use targeted mounting (`#search-page-results`) so `#search-page-input` maintains active focus and typing caret position.
- **Zero `#main-content` Redraw on UI Overlay Toggles:** Opening/closing projects dropdown, mobile menu, search modal, and contact modal must not replace the `#main-content` DOM node (enforced by `navigation.spec.js` and `search.spec.js`).
- **Markdown & Code Block Highlighting:** Code blocks in blog posts, project readmes, and custom pages must continue to properly trigger `Prism.highlightAll()` and copy-code button attachment after route changes.
- **Pagination Boundary Values:** Page numbers < 1 or > totalPages must clamp gracefully as enforced by pagination helpers.

---

## Test Plan

- **Compiler & Type Checker:** `npx gofront src --check`
- **Linter & Code Style:** `npm run check` (Biome)
- **E2E Integration Tests:** `npm run test:e2e` (all 114 Playwright tests passing across Chromium and Firefox)
  - `navigation.spec.js` (including dropdown click without redrawing `#main-content`)
  - `search.spec.js` (including search typing and clear button without redrawing `#main-content`)
  - `mobile-nav.spec.js`
  - `blog.spec.js`
  - `projects.spec.js`
  - `contact.spec.js`
  - `about.spec.js`
  - `tags.spec.js`
  - `theme.spec.js`
  - `error-states.spec.js`
- **Production Build:** `npm run prod`
