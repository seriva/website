# Accessibility, Semantic HTML & Component Decomposition — Design Plan

**Version:** continuous  
**Status:** Completed (2026-09-23)  

---

## Goal

Bring the website into full alignment with modern frontend standards, WAI-ARIA accessibility specifications, and `templ` component decomposition. This decomposes `ProjectDetail` into modular sub-components, eliminates obsolete HTML elements (`<center>`, `frameborder`, `scrolling`), adds missing ARIA disclosure and dialog states (`aria-expanded`, `role="dialog"`, `aria-modal`), provides an accessible heading hierarchy, and synchronizes OS theme detection. Done looks like a fully accessible, semantic, and modular frontend with 100% green tests.

---

## Out of Scope

- **Visual Design & Layout Redesign:** No visible layout or aesthetic changes. All selectors and styles remain identical.
- **Rewriting JS Dependencies:** External libraries (`marked`, `prismjs`, `fuse.js`, `emailjs`) remain unchanged.
- **Modifying Test Assertions:** Existing Playwright test assertions remain untouched.

---

## Approach

### 1. Component Decomposition in `src/projects.templ`
Decompose `ProjectDetail` into focused, reusable sub-components:
- `@ProjectReadme(repo string, html string, loading bool, isError bool)`
- `@ProjectMedia(videos []string)`
- `@ProjectDemo(p Project)`
- `@ProjectLinks(links []ProjectLink)`

### 2. Semantic HTML Modernization
- Replace deprecated `<center>` tag around the fullscreen button with a `<div class="text-center">` wrapper and corresponding CSS rule in `styles.go`.
- Remove obsolete `frameborder="0"` and `scrolling="no"` attributes on `<iframe>` tags.
- Add descriptive `title` attributes on all `<iframe>` elements (`title="YouTube video player"`, `title={ p.Title + " live demo" }`).

### 3. WAI-ARIA Accessibility
- **Navbar toggles:** Add `aria-expanded?={ mobileOpen }` on `.navbar-toggle`, and `aria-expanded?={ dropdownOpen }` + `aria-haspopup="true"` on `.dropdown-toggle`.
- **Modals:** Add `role="dialog"` and `aria-modal="true"` to `#contact-modal` and `#search-page`.
- **Contact form:** Add `aria-invalid?={ ... }` on form inputs and `aria-live="polite"` on `#contact-status`.
- **Blog heading hierarchy:** Add `<h1 class="sr-only">{ t("nav.blog") }</h1>` in `BlogList` with `.sr-only` CSS utility.

### 4. OS Theme Synchronization
- Update `getInitialTheme()` in `src/theme.go` to inspect `document.documentElement.getAttribute("data-theme")` before falling back to `"dark"`.

---

## Edge Cases

- **Iframe Fullscreen API:** The `#fullscreen` button selector and click handler must continue targeting the `#demo` iframe element unchanged.
- **Screen Reader Announcements:** `aria-live="polite"` must only announce when `#contact-status` text changes without interrupting normal keyboard navigation.
- **Theme Pre-paint Script:** Checking `data-theme` on the root element must not interfere with saved `localStorage` overrides.

---

## Test Plan

- **Compiler & Type Check:** `npx gofront src --check`
- **Linter & Code Style:** `npm run check` (Biome)
- **E2E Integration Tests:** `npm run test:e2e` (all 114 Playwright tests passing across Chromium and Firefox)
- **Production Build:** `npm run prod`
