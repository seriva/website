# Website Setup Simplification Plan

**Status:** Completed  
**Date:** 2026-09-24  
**Baseline Verification:** All 114 Playwright E2E tests passing (Chromium & Firefox)

---

## 1. Objective

Simplify the portfolio website's architecture, asset pipeline, runtime dependencies, and testing suite:
1. **Eliminate Hand-Rolled Parsers**: Replace dual YAML parsers (`src/utils/yaml.go` and `scripts/yaml-parser.js`) with a build-time pre-compilation step emitting `content.json`.
2. **Eliminate Prism.js Asset Bloat**: Replace the autoloader plugin and 597 copied component files with direct bundling of the 5 needed languages in `vendor.js`.
3. **Consolidate Boot Scripts**: Inline the 12-line theme and `createFuse` bootstrap into `app/index.html` to eliminate render-blocking script requests.
4. **Prune Unused Themes & Assets**: Eliminate 6 unused Prism CSS themes and deduplicate `package.json` asset copying.
5. **Unified Testing Suite**: Retain fast GoFront DOM tests and Playwright E2E tests while eliminating the redundant `node:test` runner.

---

## 2. Before vs. After Metric Projections

| Area | Current State | After Simplification | Impact |
| :--- | :--- | :--- | :--- |
| **Bespoke Parsers** | 2 parsers (Go + JS, ~340 LOC) | 0 (Native browser `JSON.parse`) | -340 LOC code |
| **Parser Tests** | 2 suites (~290 LOC) | 0 | -290 LOC tests |
| **Copied Component Files** | 597 files in `app/` + 597 in `public/` (2.9 MB) | 0 files | -1,194 files on disk / gitignore |
| **Prism CSS Themes** | 8 theme stylesheets copied | 2 theme stylesheets (Dark & Light) | 75% fewer theme assets |
| **HTML Script Tags** | 5 files (`boot`, `vendor`, `autoloader`, `prism-init`, `app`) | 2 files (`vendor.js`, `app.js`) | Faster paint, 3 fewer HTTP requests |
| **Test Runners** | 3 (`node:test`, `gofront test`, `playwright`) | 2 (`gofront test`, `playwright`) | Unified CI pipeline |

---

## 3. Architecture Transition

```mermaid
graph TD
    subgraph "Before Simplification"
        Y1["content.yaml"] -->|HTTP Fetch at runtime| BROWSER1["Browser Runtime"]
        BROWSER1 -->|Parse with Go YAML parser| PARSER_GO["src/utils/yaml.go (170 LOC)"]
        Y1 -->|File read in build| SCRIPT_SEO["generate-seo.js"]
        SCRIPT_SEO -->|Parse with JS YAML parser| PARSER_JS["scripts/yaml-parser.js (170 LOC)"]
        PRISM_AL["prism-autoloader.js + prism-init.js"] -->|Fetches on-demand| COMP_DIR["597 prism-components/*.js"]
    end

    subgraph "After Simplification"
        Y2["content.yaml"] -->|Build Step: compile-content.js| J2["content.json"]
        J2 -->|Native fetch().json()| BROWSER2["Browser Runtime (Native C++)"]
        J2 -->|Native JSON.parse()| SCRIPT_SEO2["generate-seo.js"]
        VENDOR["vendor.js (Prism + 5 languages)"] -->|Synchronous Highlight| BROWSER2
    end
```

---

## 4. Phased Implementation Steps

### Phase 1: Build-Time JSON Compilation & Store Simplification
*Goal: Remove client-side YAML parsing and redundant JS parser.*

- [x] **Step 1.1: Create build-time content compiler script**
  - Add `scripts/compile-content.js` to convert `app/data/content.yaml` into formatted `app/data/content.json` and `public/data/content.json`.
  - Wire into `npm run prep` and `npm run prod` before GoFront runs.
- [x] **Step 1.2: Update SEO generator**
  - Update `scripts/generate-seo.js` to read `content.json` with native `JSON.parse` instead of `scripts/yaml-parser.js`.
- [x] **Step 1.3: Update GoFront store runtime**
  - Update `initData()` in `src/store.go` to fetch `/data/content.json` and call `await res.json()`.
  - Directly populate `site`, `pages`, `posts`, `projects`, and `i18n` structures.
- [x] **Step 1.4: Simplify Markdown frontmatter stripper**
  - In `src/markdown.go`, simplify `parseFrontmatter()` to locate delimiters and return the markdown body directly, removing `utils.ParseYAML()`.
  - Update `src/markdown_test.go` to test body extraction.
- [x] **Step 1.5: Delete obsolete parsers and unit tests**
  - Delete `src/utils/yaml.go` and `src/utils/yaml_test.go`.
  - Delete `scripts/yaml-parser.js` and `tests/unit/yaml-parser.test.js`.
  - Remove `tests/unit/` directory.

---

### Phase 2: Prism.js Language Bundling & Asset Pruning
*Goal: Eliminate 597 component files, autoloader, and 6 unused themes.*

- [x] **Step 2.1: Bundle required Prism languages in `vendor.js`**
  - Update `vendor` configuration in `package.json`:
    ```json
    "vendor": {
      "dest": ["app/vendor.js", "public/vendor.js"],
      "minify": true,
      "packages": [
        "@emailjs/browser",
        "fuse.js",
        "marked",
        "prismjs",
        "prismjs/components/prism-go.js",
        "prismjs/components/prism-bash.js",
        "prismjs/components/prism-yaml.js"
      ],
      "globals": {
        "@emailjs/browser": ["emailjs"],
        "fuse.js": ["Fuse"],
        "prismjs": ["Prism"]
      }
    }
    ```
    *(Note: Markup/HTML, JavaScript, CSS, and C-like syntax are already built into core `prismjs`)*.
- [x] **Step 2.2: Prune `package.json` asset copy targets**
  - Remove all `prism-components` and `prism-autoloader.min.js` targets.
  - Prune `prism-themes` to only keep `prism-tomorrow.min.css` (dark) and `prism-coy.min.css` (light).
- [x] **Step 2.3: Remove obsolete autoloader files**
  - Delete `app/prism-init.js`.
  - Delete `app/js/prism-autoloader.min.js` and `app/js/prism-components/`.
  - Delete unused theme files in `app/css/prism-themes/`.

---

### Phase 3: Bootstrap Inlining & Script Consolidation
*Goal: Reduce HTML script tags from 5 to 2 and eliminate FOUC script network latency.*

- [x] **Step 3.1: Inline theme initialization in `index.html` and `404.html`**
  - Replace `<script src="/boot.js"></script>` in `<head>` of `app/index.html` and `app/404.html` with:
    ```html
    <script>
      try {
        const saved = localStorage.getItem("theme-preference");
        if (saved) {
          document.documentElement.setAttribute("data-theme", saved);
        } else if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
          document.documentElement.setAttribute("data-theme", "light");
        } else {
          document.documentElement.setAttribute("data-theme", "dark");
        }
      } catch (_e) {}
      window.createFuse = (list, opts) => new window.Fuse(list, opts);
    </script>
    ```
- [x] **Step 3.2: Consolidate body script tags**
  - Clean `<body>` script tags down to just:
    ```html
    <script type="module" src="/vendor.js"></script>
    <script type="module" src="/app.js"></script>
    ```
- [x] **Step 3.3: Delete `boot.js`**
  - Remove `app/boot.js`.

---

### Phase 4: Build Script & Asset Synchronization Cleanup
*Goal: Deduplicate asset copying and streamline npm scripts.*

- [x] **Step 4.1: Update `scripts/copy-static.js`**
  - Update `ASSETS_TO_COPY` list to remove deleted files (`boot.js`, `prism-init.js`).
  - Ensure `data/content.json` is included in synchronization.
- [x] **Step 4.2: Update `package.json` scripts & `lefthook.yml`**
  - Remove `test:unit` script.
  - Update `test:gofront` to `gofront test src --dom` (no longer needing `src/utils`).
  - Update `test:all` to `npm run test:gofront && npm run test:e2e`.
  - Update `lefthook.yml` test step to run `npm run test:gofront`.

---

## 5. Verification & Safety Matrix

| Test Level | Command | What It Verifies |
| :--- | :--- | :--- |
| **Go Component & Store Unit Tests** | `npm run test:gofront` | Verifies data store hydration, Markdown parsing, routing, theme switching, UI helpers. |
| **Linter & Formatter** | `npm run check` | Biome code style and syntax across JS/JSON files. |
| **Production Build** | `npm run prod` | Full build pipeline: content compilation, minified vendor bundle, minified app bundle, static asset sync, SEO & RSS generation. |
| **Browser E2E Suite** | `npm run test:e2e` | Playwright tests across Chromium & Firefox: theme switching, syntax highlighting on code blocks, search tag filtering, contact modal, responsive navigation. |
