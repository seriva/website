# GoFront Rewrite — Design Plan

**Version:** continuous  
**Status:** Completed (2026-09-22)  

---

## Goal

Rewrite the portfolio website ([luukvanvenrooij.nl](file:///home/luuk/dev/website)) from vanilla JavaScript + Microtastic (`reactive.js`) to **GoFront** using the `.templ` component architecture (`example/templ`).

This modernizes the site's codebase by dogfooding the GoFront compiler, `.templ` component system, and **new native frontend tooling (v1.1.0 assetCopy & vendor bundling)** in a real production application. It achieves **complete removal of Microtastic** and eliminates bespoke build scripts: the website repository becomes a pristine, declarative demonstration of GoFront with zero runtime framework overhead, while preserving 100% of existing content, styling, assets, and E2E test coverage.

---

## Out of Scope

- **Content & Data Schema Changes:** No modifications to `app/data/content.yaml`, `app/data/blog/*.md`, or `app/data/pages/*.md`.
- **Visual Design & CSS Changes:** No redesign. All existing CSS rules, CSS custom properties (colors, transitions), and typography remain identical.
- **Rewriting Complex JS Dependencies in Go:** `marked` (Markdown parser), `prismjs` (syntax highlighter), `fuse.js` (fuzzy search), and `@emailjs/browser` will remain external JavaScript modules bundled via GoFront's native `gofront prep` command and bridged via `src/browser.d.ts`.
- **Custom Build/Asset Scripts in Website:** No one-off Node scripts for asset copying or bundling. All tooling is handled natively by `gofront`.
- **Server-side Rendering / Backend:** The site remains a 100% client-side SPA hosted on static hosting (GitHub Pages).

---

## Approach

Follow the pattern established in [`gofront/example/templ`](file:///home/luuk/dev/gofront/example/templ) powered by **GoFront v1.1.0 native asset & vendor tooling**:

1. **Native Tooling & Zero Custom Scripts:**
   - Uninstall `microtastic`, install `gofront@^1.1.0` in `devDependencies`, and delete `.microtastic`.
   - Use GoFront v1.1.0 native commands:
     - `gofront prep`: automatically copies assets defined in `"assetCopy"` and bundles external dependencies into `app/vendor.js`.
     - `gofront src -o app/app.js --serve --port 8181`: runs development server with built-in SPA route fallback (serving `index.html` on clean paths like `/blog`).
     - `gofront src -o public/app.js --minify`: compiles and minifies production bundle.
2. **Component Architecture (`.templ`):**
   - UI views are defined as `.templ` components (`Navbar`, `BlogList`, `BlogPostView`, `ProjectGrid`, `Footer`).
   - Components compile directly to DOM creation calls compatible with `gom.Node`.
   - Markdown output from `marked` is injected into the DOM tree using native `@templ.Raw(doc.HTML)`.
3. **State Management & Routing:**
   - Central state store (`store.go`) holding `currentRoute`, `currentTheme`, `siteData`, `posts`, and `activeTag`.
   - Router (`router.go`) listening to `popstate` and handling `history.pushState`.
   - State updates trigger `gom.Mount("#app", AppShell(...))`.
4. **Event Handling via `data-action` Delegation:**
   - Centralized click delegation on `#app` in `main.go` matching the current website pattern.
   - Code copy buttons handled via a single delegated `copy-code` action, removing ~70 lines of signal lifecycle tracking.
5. **Native YAML Parser in GoFront:**
   - Port the existing 170-line [`yaml-parser.js`](file:///home/luuk/dev/website/app/src/utils/yaml-parser.js) directly to `src/utils/yaml.go` for zero-dependency client-side YAML parsing.
6. **Zero-Regression E2E Verification:**
   - Reuse the existing 10 Playwright test suites in `tests/e2e/` without changing test selectors or assertions.

---

## Tasks

### Task 1: Build Pipeline & GoFront v1.1.0 Native Tooling

#### What & Why
Configure the website repository to use GoFront's native `prep`, `serve` (with SPA fallback), and compile commands. Completely uninstall Microtastic with zero custom build scripts.

#### Files
- Create: `src/browser.d.ts` — type signatures for DOM, marked, Prism, Fuse, EmailJS
- Modify: `package.json` — remove `microtastic`, install `gofront@^1.1.0` in `devDependencies`, configure native `gofront` scripts, keep `"assetCopy"` config
- Modify: `app/index.html` — load `vendor.js` and compiled `app.js`
- Delete: `.microtastic` — remove legacy Microtastic configuration

#### Steps
- [x] **Step 1: Create `src/browser.d.ts`**
  Declare type signatures for `marked(md: string): string`, `Prism.highlightAll()`, `Fuse`, `emailjs`, `localStorage`, and DOM helpers.
- [x] **Step 2: Update `package.json` with GoFront v1.1.0 and native commands**
  Uninstall `microtastic` and install `gofront@^1.1.0` in `devDependencies` (`npm uninstall microtastic && npm install -D gofront@^1.1.0`). Retain `"assetCopy"` block. Update scripts:
  - `"prepare": "lefthook install && npm run prep"`
  - `"prep": "gofront prep"`
  - `"dev": "gofront src -o app/app.js --serve --port 8181"`
  - `"build": "gofront src -o app/app.js"`
  - `"prod": "npm run check && gofront prep && gofront src -o public/app.js --minify && npm run seo"`
- [x] **Step 3: Run `npm run prep`**
  Verify GoFront's native asset manager copies Raleway fonts and Prism themes, and generates `app/vendor.js`.
- [x] **Step 4: Update `app/index.html`**
  Add `<script type="module" src="/vendor.js"></script>` before `<script type="module" src="/app.js"></script>`.
- [x] **Step 5: Delete `.microtastic`**

---

### Task 2: Core Data Types, Store & YAML Parser

#### What & Why
Build the data layer in GoFront. Port the lightweight YAML parser to pure GoFront so `content.yaml` can be fetched and parsed client-side without any third-party parser library.

#### Files
- Create: `src/types.go` — struct definitions for `SiteConfig`, `BlogPost`, `Project`, `Page`, `Theme`
- Create: `src/utils/yaml.go` — pure GoFront port of `yaml-parser.js`
- Create: `src/store.go` — app state store, `/data/content.yaml` loader, post indexing

#### Steps
- [x] **Step 1: Implement `src/types.go`**
  Define structs for site data, navigation, blog posts, projects, social links, and theme colors.
- [x] **Step 2: Port YAML parser to `src/utils/yaml.go`**
  Translate the indentation-stack parser from `yaml-parser.js` into idiomatic GoFront.
- [x] **Step 3: Implement `src/store.go`**
  Implement `initData()` to fetch and parse `/data/content.yaml`, sort posts by date, and manage global state.

---

### Task 3: SPA Router & Markdown Service

#### What & Why
Implement client-side SPA routing and Markdown loading with frontmatter separation and code block highlighting.

#### Files
- Create: `src/router.go` — path matching, history management, hash-redirect restoration
- Create: `src/services/markdown.go` — frontmatter splitter, `marked` invocation, Prism trigger
- Create: `src/services/theme.go` — light/dark theme toggle, localStorage persistence, CSS variable updates

#### Steps
- [x] **Step 1: Implement `src/router.go`**
  Handle `/`, `/blog`, `/blog/:slug`, `/blog/page/:num`, `/project/:id`, and `/page/:id`. Parse hash redirects from `404.html`.
- [x] **Step 2: Implement `src/services/markdown.go`**
  Split Markdown frontmatter (`---`), parse metadata via `utils.ParseYAML`, render body with `marked()`, and export `MarkdownDoc`.
- [x] **Step 3: Implement `src/services/theme.go`**
  Handle theme initialization from `localStorage` or `prefers-color-scheme`, and toggle between dark and light modes.

---

### Task 4: UI Components in `.templ`

#### What & Why
Rebuild the entire component layer using GoFront's declarative `.templ` syntax, matching existing HTML structure and CSS classes.

#### Files
- Create: `src/views/icons.templ` — SVG icon components ported from `icons.js`
- Create: `src/views/navbar.templ` — header navigation, projects dropdown, theme button, mobile menu
- Create: `src/views/blog.templ` — `BlogList` (cards, tag filters, pagination) and `BlogPostView` (`@templ.Raw`)
- Create: `src/views/projects.templ` — `ProjectGrid`, project cards, tags, YouTube embeds, links
- Create: `src/views/page.templ` — static page viewer for `about.md`
- Create: `src/views/footer.templ` — footer layout, copyright, author info
- Create: `src/views/app.templ` — root `AppShell` composing all views

#### Steps
- [x] **Step 1: Implement `icons.templ`**
  Define inline SVG helpers: `IconSun`, `IconMoon`, `IconSearch`, `IconGithub`, `IconMenu`, etc.
- [x] **Step 2: Implement `navbar.templ`**
  Build the `<nav class="navbar">` component with `.navbar-brand`, dropdown menu, and mobile hamburger drawer.
- [x] **Step 3: Implement `blog.templ`**
  Build `.blog-post-card` listing with tag pills and pagination; build `BlogPostView` with `@templ.Raw(doc.HTML)`.
- [x] **Step 4: Implement `projects.templ`**
  Build `.project-card` grid with tag badges, demo links, and GitHub README previews.
- [x] **Step 5: Implement `page.templ` and `footer.templ`**
  Render static pages and footer.
- [x] **Step 6: Implement `app.templ`**
  Assemble the full page inside `templ AppShell(...)`.

---

### Task 5: Main Entry & Global Event Delegation

#### What & Why
Wire up startup and replace scattered event listeners and per-button reactive instances with global event delegation.

#### Files
- Create: `src/main.go` — application boot, event listeners, render entry point
- Create: `src/styles.go` — global style injection or static stylesheet references

#### Steps
- [x] **Step 1: Implement `setupEvents()` in `src/main.go`**
  Attach click delegation to `#app` for `data-action`:
  - `nav`: intercept internal links and call `router.Navigate(url)`.
  - `toggle-theme`: call `theme.Toggle()`.
  - `filter-tag`: filter posts or projects by tag.
  - `toggle-mobile-nav`: toggle mobile menu open state.
  - `copy-code`: copy code from closest `<pre><code>` to clipboard.
- [x] **Step 2: Implement `render()` and bootstrap flow**
  Boot data on `DOMContentLoaded`, mount `AppShell` into `#app`, and trigger `Prism.highlightAll()`.

---

### Task 6: Search & Contact Form Modals

#### What & Why
Port search and contact form functionality using `fuse.js` and `@emailjs/browser`.

#### Files
- Create: `src/views/search.templ` — search modal dialog, search input, results list
- Create: `src/views/contact.templ` — email contact modal form
- Create: `src/services/search.go` — Fuse.js search indexer and query runner
- Create: `src/services/email.go` — EmailJS send wrapper

#### Steps
- [x] **Step 1: Implement Search modal and Fuse.js integration**
  Build search index over projects and posts; render real-time results on input.
- [x] **Step 2: Implement Contact Form modal and EmailJS send**
  Handle form submit, validation, send via `emailjs.send`, and feedback states.

---

### Task 7: Cleanup & Quality Gates

#### What & Why
Remove all obsolete vanilla JS framework code, purge remaining Microtastic files and directories, and run all linting, type-checking, and E2E verification suites.

#### Files
- Delete: `app/src/utils/reactive.js`
- Delete: `app/src/components/*.js`
- Delete: `app/src/services/*.js`
- Delete: `app/src/dependencies/`
- Delete: `.microtastic` (if not removed in Task 1)
- Modify: `docs/roadmap.md` — mark rewrite status

#### Steps
- [x] **Step 1: Remove deprecated files in `app/src/` and `app/src/dependencies/`**
- [x] **Step 2: Verify zero references to `microtastic` remain in code or configs**
- [x] **Step 3: Run GoFront type-check (`gofront src --check`)**
- [x] **Step 4: Run Biome lint & format (`npm run check`)**
- [x] **Step 5: Run full Playwright test suite (`npm run test:e2e`)**

---

## Edge Cases

- **GitHub Pages SPA Redirect:** `404.html` redirects deep links to `/?#!redirect=/path`. `router.go` must detect and restore the clean path using `history.replaceState`.
- **GoFront Dev Server SPA Fallback:** In local development, direct navigation to `/blog` or `/projects` must serve `index.html` via GoFront's built-in SPA fallback.
- **Timing of Syntax Highlighting:** `Prism.highlightAll()` must run immediately after DOM updates so newly mounted `<pre><code>` elements get formatted.
- **Copy Button on Dynamic Code Blocks:** Handled via delegated click on `#app` searching for closest `pre > code`, avoiding lifecycle management bugs when switching routes.
- **HTML Escaping in Markdown:** Trusted markdown body must use `@templ.Raw()`, while dynamic user inputs (like search query) must use standard escaped string interpolation `{ q }`.
- **Active Filter State Across Navigation:** Switching from Blog to Projects and back should preserve or cleanly reset tag filters without stale UI artifacts.

---

## Test Plan

### Automated Tests
- **GoFront Type Checker:**
  ```bash
  gofront src --check
  ```
  Must report 0 errors across all `.go` and `.templ` files.
- **Playwright E2E Suite:**
  ```bash
  npx playwright test
  ```
  All 10 existing test specs must pass on port 8181:
  1. `navigation.spec.js` (Navbar brand, links, dropdown, history back/forward)
  2. `blog.spec.js` (Blog post cards, pagination, single post reading)
  3. `projects.spec.js` (Project cards, links, tags)
  4. `theme.spec.js` (Theme toggle, localStorage persistence)
  5. `about.spec.js` (Static markdown page rendering)
  6. `tags.spec.js` (Filter posts and projects by tag)
  7. `mobile-nav.spec.js` (Hamburger menu open/close)
  8. `search.spec.js` (Modal open, query execution, result navigation)
  9. `contact.spec.js` (Contact modal open, validation, submit)
  10. `error-states.spec.js` (404 fallback handling)

### Negative & Error Cases
- **Missing or Corrupt Markdown File:** Load non-existent post; verify fallback message rendered without crashing.
- **Network Failure on GitHub README:** If GitHub raw README fetch fails, display graceful fallback link to repository.
- **Empty Search Results:** Search with nonsense string; verify empty-state message appears cleanly.
