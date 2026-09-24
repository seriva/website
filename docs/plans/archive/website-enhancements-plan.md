# Website Enhancements Design Plan

**Status:** Completed (2026-09-24)  
**Date:** 2026-09-24  
**Scope:** SEO & Social Sharing, Reader UX, Accessibility, Technical Architecture & Build Tooling

---

## 1. Goal

Upgrade the portfolio website with high-impact SEO, social preview generation, reader navigation, and modern technical architecture:
1. **True Social Sharing & Instant Deep-Link Responses**: Pre-generate static HTML route stubs for all blog posts, projects, and static pages with accurate OpenGraph, Twitter Cards, and canonical tags, eliminating the 404 redirect for web crawlers.
2. **Synchronized Head Metadata**: Ensure client-side SPA route transitions dynamically update document `<title>`, `<meta name="description">`, and OpenGraph tags.
3. **Engaging Post Navigation**: Add a "← Back to all posts" return link and chronological Previous / Next article cards at the bottom of each blog post.
4. **Table of Contents (TOC)**: Automatically extract headings (`<h2>`, `<h3>`) from blog posts and render a clean, jump-linked Table of Contents for long-form technical articles.
5. **Power-User Search Shortcut**: Support `Cmd+K` / `Ctrl+K` and `/` globally to instantly activate the search overlay.
6. **Robust Technical Toolchain**:
   - Enforce GoFront type-checking (`gofront src --check`) in the CI and pre-commit check gate.
   - Eliminate cold-start network waterfalls with asset preloading (`content.json` and Latin font).
   - Lazy-load EmailJS on demand to shrink `vendor.js` by ~30%.
   - Add production CSS minification and atomic cache-busting version query hashes.
   - Map Prism syntax highlighting for `.templ` code snippets.
   - Add hot `content.yaml` file watching to development server scripts.
   - Rename legacy `*FromYAML` store mapping helpers to `*FromJSON`.

---

## 2. Comprehensive Features Breakdown

| ID | Feature | Category | Target Files | Key Impact |
| :--- | :--- | :--- | :--- | :--- |
| **1.1** | Static Route Pre-generation | SEO & Sharing | `scripts/build.js` | Rich link previews on Twitter/X, Discord, Slack, LinkedIn; direct HTTP 200 on deep links |
| **1.2** | Fix Fallback Meta Defaults | SEO & Sharing | `app/index.html` | Real site title, description, author, and emerald theme-color `#10B981` before JS boots |
| **1.3** | Dynamic Meta Updating in SPA | SEO & Sharing | `src/store.go`, `src/router.go` | Keeps `<head>` meta tags accurate during client-side navigation |
| **2.2** | "Back to all posts" Link | UX & Navigation | `src/blog.templ`, `app/css/app.css` | Easy one-click return to blog list without needing the top navbar |
| **2.3** | Previous / Next Post Cards | UX & Navigation | `src/view.go`, `src/blog.templ` | Keeps readers engaged by discovering adjacent articles chronologically |
| **2.4** | Table of Contents (TOC) | UX & Navigation | `src/markdown.go`, `src/blog.templ` | Allows quick skimming and anchor-jumping in long technical posts |
| **3.1** | Search Keyboard Shortcut (`⌘K` / `/`) | Accessibility | `src/main.go`, `src/navbar.templ` | Fast, effortless search access for developers |
| **T.1** | Enforce GoFront Type-Checking | Quality & Types | `package.json`, `lefthook.yml` | Guarantees type validation on git commit and CI checks |
| **T.2** | Preload Critical Assets | Performance | `app/index.html` | Eliminates font layout shift (FOIT) and parallelizes `content.json` fetch |
| **T.3** | Lazy-Load EmailJS | Performance | `package.json`, `src/email.go` | Trims ~30 KB from `vendor.js` (~30% bundle reduction) |
| **T.4** | CSS Minification & Cache Busting | Build & Caching | `scripts/build.js` | Strips ~40% CSS bytes and invalidates stale caches on new deployments |
| **T.5** | Prism `.templ` Highlighting | Aesthetics | `src/markdown.go` | Automatically highlights `.templ` code snippets in blog posts |
| **T.6** | Dev Watcher for `content.yaml` | Developer Experience | `scripts/build.js`, `package.json` | Instant content updates without restarting `npm run dev` |
| **T.7** | Clean up Legacy `*FromYAML` | Code Hygiene | `src/store.go`, `src/store_test.go` | Reflects actual JSON data pipeline accurately |

---

## 3. Out of Scope

- Modifying the underlying GoFront compiler or Templ syntax.
- Full Server-Side Rendering (the site remains a lightweight static GitHub Pages deployment).
- Dynamic server backend (remains 100% static/client-side).

---

## 4. Technical Architecture & Phased Implementation

### Phase 1: Quality Gate & Code Hygiene (T.1, T.7)

#### Step 1.1: Enforce `gofront src --check` in `package.json` and `lefthook.yml`
- Update `package.json`:
  ```json
  "check": "biome check . && gofront src --check"
  ```
- Ensures all Go syntax, type signatures, and `.templ` components are verified before git commit.

#### Step 1.2: Rename Legacy `*FromYAML` Functions in `src/store.go`
- In `src/store.go`, rename:
  - `postFromYAML` $\rightarrow$ `postFromJSON`
  - `projectFromYAML` $\rightarrow$ `projectFromJSON`
  - `pageFromYAML` $\rightarrow$ `pageFromJSON`
- Update callers in `initData()` and test cases in `src/store_test.go`.

---

### Phase 2: SEO, Social Cards & Head Metadata (1.1, 1.2, 1.3)

#### Step 2.1: Update Default Fallback Meta Tags in `app/index.html`
- Replace generic placeholder defaults in `app/index.html` lines 6–25:
  - Description: sync with `content.yaml` (`site.description`).
  - Author: `"Luuk van Venrooij"`.
  - Title: `"luukvanvenrooij.nl"`.
  - Theme-color: `#10B981` (matching Emerald theme).

#### Step 2.2: Build-Time Route Generation in `scripts/build.js`
- In `scripts/build.js`, add `generateStaticRoutes(contentData, baseUrl)` called during `node scripts/build.js post` (or `all` / `seo`):
  - Read `app/index.html` as the base template.
  - For each post (`contentData.blog.posts`):
    - Path: `public/blog/<slug>/index.html`
    - Injected tags:
      - `<title>{post.title} - {site.title}</title>`
      - `<meta name="description" content="{post.excerpt}">`
      - `<meta property="og:title" content="{post.title} - {site.title}">`
      - `<meta property="og:description" content="{post.excerpt}">`
      - `<meta property="og:url" content="{baseUrl}/blog/{slug}">`
      - `<meta property="og:type" content="article">`
      - `<meta property="twitter:title" content="{post.title} - {site.title}">`
      - `<meta property="twitter:description" content="{post.excerpt}">`
      - `<link rel="canonical" href="{baseUrl}/blog/{slug}">`
  - For each project (`contentData.projects`):
    - Path: `public/project/<id>/index.html`
    - Injected tags with project title and description.
  - For each page (`contentData.pages`):
    - Path: `public/page/<id>/index.html`
  - For blog pagination (`/blog/page/<n>/index.html`):
    - Pre-generate pages for pages 1..N.

#### Step 2.3: Dynamic `<meta>` Updater in Client SPA
- In `src/store.go`, create `updateRouteMeta(title string, description string, canonicalPath string)`:
  - Updates `document.title`
  - Updates `meta[name="description"]`
  - Updates `meta[property="og:title"]` and `meta[property="og:description"]`
  - Updates `meta[property="og:url"]`
  - Updates or creates `<link rel="canonical">`
- In `src/router.go`, call `updateRouteMeta()` in `showBlog()`, `showPost()`, `showProject()`, and `showPage()`.

---

### Phase 3: Performance, Bundling & Caching (T.2, T.3, T.4, T.5)

#### Step 3.1: Preload Critical Assets in `app/index.html`
- Add to `<head>`:
  ```html
  <link rel="preload" href="/fonts/raleway-latin-400-normal.woff2" as="font" type="font/woff2" crossorigin>
  <link rel="preload" href="/data/content.json" as="fetch" crossorigin>
  ```

#### Step 3.2: Lazy-Load EmailJS
- Remove `@emailjs/browser` from `vendor.packages` in `package.json`.
- In `src/email.go`:
  - When `openContact()` is called, load the EmailJS browser script dynamically if `window.emailjs == nil`.
  - Cache loaded promise so repeated modal toggles execute immediately.
- Re-run `gofront prep --minify` to shrink `vendor.js` from 102 KB down to ~72 KB.

#### Step 3.3: Production CSS Minification & Cache Busting
- In `scripts/build.js`:
  - Minify `app/css/app.css` when writing to `public/css/app.css` (strip comments, whitespace).
  - Compute a content or git revision hash (e.g. `const v = pkg.version || Date.now().toString(36)`).
  - In `public/index.html`, rewrite asset links: `/app.js?v={v}`, `/vendor.js?v={v}`, `/css/app.css?v={v}`.

#### Step 3.4: Prism Syntax Highlighting for `.templ`
- In `src/markdown.go` inside `highlightCode()`:
  ```go
  if Prism.languages.templ == nil && Prism.languages.go != nil {
      Prism.languages.templ = Prism.languages.go
  }
  ```
- Ensures all `.templ` code snippets highlight keywords, types, and strings accurately.

---

### Phase 4: Reader Navigation & Discovery (2.2, 2.3, 2.4)

#### Step 4.1: Add "Back to all posts" Link
- In `app/data/content.yaml`, add translation keys:
  - `blog.backToAll: "← Back to all posts"`
  - `blog.previousPost: "Older post"`
  - `blog.nextPost: "Newer post"`
  - `blog.tableOfContents: "Table of Contents"`
- In `src/blog.templ`, render return link at top of `BlogPostView`:
  ```html
  <a href="/blog" class="blog-back-link" data-action="nav">
      @Icon("arrow-left", "0.9em")
      <span>{ t("blog.backToAll") }</span>
  </a>
  ```

#### Step 4.2: Chronological Adjacent Post Resolution in `src/view.go`
- Add `PrevPost *BlogPost` and `NextPost *BlogPost` fields to `ViewState`.
- In `resolvePost()`, locate index `i` in sorted `posts`:
  - If `i + 1 < len(posts)`, `v.PrevPost = &posts[i+1]` (older).
  - If `i > 0`, `v.NextPost = &posts[i-1]` (newer).

#### Step 4.3: Render Previous / Next Post Cards in `src/blog.templ`
- Add SVG icon `"arrow-right"` to `icons` in `src/icons.go`.
- In `src/blog.templ`, render `<nav class="blog-post-nav" aria-label="Post navigation">` before comments.
- Style with responsive flex layout in `app/css/app.css`.

#### Step 4.4: Table of Contents Extraction & Rendering
- Define `TOCItem{ID string, Text string, Level int}`.
- In `src/markdown.go`:
  - Add slugify helper: lowercase, strip punctuation, replace whitespace with hyphens.
  - Extract headings `## ` and `### ` from markdown, deduplicating duplicate slug names.
  - Ensure parsed HTML headings contain matching `id` attributes.
- In `src/blog.templ`:
  - Render an expandable `<details class="blog-toc" open>` block if `len(v.TOC) >= 2`.
- In `app/css/app.css`:
  - Add `scroll-margin-top: 75px` to `.markdown-body h2, .markdown-body h3` to prevent fixed navbar clipping.

---

### Phase 5: Search Shortcuts & Dev Server DX (3.1, T.6)

#### Step 5.1: Global Keyboard Listeners in `src/main.go`
- In `src/main.go`'s `keydown` listener:
  - Support `Cmd+K` / `Ctrl+K` and `/` (ignoring if focused on `input`, `textarea`, or `contentEditable`).
- In `src/navbar.templ`, add `aria-keyshortcuts="Control+K Meta+K /"` and update button title.

#### Step 5.2: Dev Server Content Watcher in `scripts/build.js`
- Add `watch` command to `scripts/build.js`:
  - Watches `app/data/content.yaml` and calls `compileContent()` on change.
- In `package.json`, update `"dev"` to watch content or run watcher concurrently.

---

## 5. Verification & Testing Plan

### GoFront DOM Unit Tests (`npm run test:gofront`)
- `src/view_test.go`:
  - Test adjacent post resolution (`PrevPost`, `NextPost`) for first, middle, and last posts.
- `src/store_test.go`:
  - Test `updateRouteMeta` head DOM mutations in JSDOM.
  - Verify renamed `postFromJSON`, `projectFromJSON`, `pageFromJSON`.
- `src/markdown_test.go`:
  - Test TOC extraction and slug deduplication.

### Playwright E2E Tests (`npm run test:e2e`)
- `tests/e2e/blog.spec.js`:
  - Test "Back to all posts" navigation.
  - Test Previous/Next post links navigate to the correct post URLs.
  - Test Table of Contents renders on posts with headings and anchor links jump to sections.
  - Test `.templ` code snippets receive Prism syntax highlighting tokens.
- `tests/e2e/search.spec.js`:
  - Test `Control+k` / `Meta+k` and `/` trigger the search overlay.
  - Test typing `/` inside text inputs does not re-open search.
- `tests/e2e/navigation.spec.js`:
  - Test dynamic `<meta name="description">` and `og:title` updates.

### Build & Release Verification
- Run `npm run check` (Biome + `gofront src --check`).
- Run `npm run prod` and verify:
  - Static HTML stubs are generated in `public/blog/*/index.html`.
  - `public/css/app.css` is minified.
  - Cache-busting queries are present in `public/index.html`.
  - `public/vendor.js` size drops from 102 KB to ~72 KB.
- Run `npm run test:all`.
