# Changelog

All notable changes to this project will be documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [2026-09]

### Added

- Added `bootstrap` project entry and blog post.
- Initial release.

### Changed

- Renamed `staticAssets` to `publicAssets` in `package.json` and `scripts/build.js` to clearly distinguish production distribution sync (`app/` → `public/`) from vendor dependency asset extraction (`assetCopy`).
- Fixed scrollbar disappearance and layout shift when opening the contact/email overlay by preserving viewport scrollbar and adding `overscroll-behavior: contain` to modal container.
- Setup and asset pipeline simplification ([plan](docs/plans/archive/website-simplification-plan.md)): eliminated dual hand-rolled YAML parsers (`src/utils/yaml.go` and `scripts/yaml-parser.js`) in favor of a build-time content compilation step emitting `content.json`, allowing the browser runtime to hydrate instantly via native `res.json()`; pruned Prism autoloader and 597 copied component files by directly bundling the 5 markdown languages (`go`, `bash`, `yaml`, `javascript`, `markup`) into `vendor.js`; inlined theme detection and `createFuse` shim into `index.html` to eliminate render-blocking `boot.js` and `prism-init.js` network requests; pruned 6 unused Prism CSS themes and duplicate asset copy configurations; removed `tests/unit/` and the `node:test` runner, streamlining the test suite to `gofront test src --dom` and Playwright E2E.
- Post-rewrite hardening ([plan](docs/plans/archive/post-rewrite-hardening-plan.md)): replaced eleven loose route globals (`currentPost*`, `projectReadme*`, `currentPage*`) with a single `view ViewState` and a `LoadStatus` enum (`LoadReady`/`LoadPending`/`LoadFailed`/`LoadNotFound`) in `src/view.go`, reset on every navigation; split `showPost`/`showProject`/`showPage` into pure, unit-tested resolvers plus async loaders; extracted `resolveRedirect`, `postFromYAML`, and `sortPostsByDate` as pure functions. Routes still paint once, after the markdown is fetched (no intermediate loading repaint); stale fetches are dropped when another navigation has started (`routeSeq`), and the 404 redirect hash only accepts same-origin paths.
- Moved the global stylesheet out of the Go bundle: `src/styles.go` is gone and the CSS now lives in `app/css/app.css`, linked from `index.html` so it downloads in parallel with the JS bundles instead of being injected after `app.js` executes. Biome now formats and lints the stylesheet. `public/app.js` shrank from 104 KB to 73 KB.
- Restored unit-test breadth: `npm run test:gofront` runs `src/` under jsdom (`gofront test src --dom`); added tests for theme precedence/persistence and CSS variable application, YAML→`BlogPost` mapping, redirect decoding, `ViewState` resolvers, search guards/result mapping against a fake Fuse index, and frontmatter edge cases (116 Go tests total). Theme code uses `window.localStorage` so it runs in both browser and jsdom.
- State-driven rendering and templ idioms ([plan](docs/plans/archive/state-driven-rendering-and-templ-idioms-plan.md)): the app shell is now mounted once and routes/overlays re-render their own regions (`src/ui.go`: `renderMain`, `renderNavbar`, `renderContactForm`, `syncOverlays`); introduced a `Route` enum with a pure, unit-tested `parseRoute()` and a `RouteView` template replacing duplicated string-prefix matching; contact form values are mirrored into state on `input` and validated by `validateContact()`; replaced 20 per-icon templates with one `Icon(name, size)` component backed by `src/icons.go`; fixed `aria-expanded`/`aria-invalid` to emit `"true"`/`"false"`; the projects dropdown toggle is a real `<button>` (no `javascript:` URL); dropped `fmt.Sprintf` for integer interpolation in templates; removed dead code (`initMarkdown`, unreachable EmailJS error flag).
- Security hygiene: moved the inline theme bootstrap and window shims to `app/boot.js` / `app/prism-init.js` so `'unsafe-inline'` is no longer needed in `script-src`; `scripts/copy-static.js` strips `localhost` dev origins from the CSP when producing `public/index.html`; removed the dead `src/main.js` reference from `404.html`.
- Upgraded GoFront compiler to v1.2.1 and dropped hard-coded version numbers from project metadata.
- Updated documentation and script pipeline: updated `README.md` to reflect GoFront `.templ` component architecture, active test suites, and SPA dev server; removed redundant `build` script and restored `test:unit` and `test:all` in `package.json`.
- Production static asset synchronization: added `scripts/copy-static.js` to `npm run prod` to automatically copy `index.html`, `404.html`, `data/`, `fonts/`, `css/`, and root assets from `app/` to `public/`, ensuring a self-contained output for GitHub Pages deployment.
- Production bundle minification: configured dual-target vendor packaging (`app/vendor.js` and `public/vendor.js`), enabled `--minify` for vendor dependencies and `--minify --mangle` for site bundle, reducing overall JavaScript payload by 97 KB (~33% reduction from 295 KB to 198 KB).
- Improved accessibility and HTML5 semantics: decomposed `ProjectDetail` into sub-components, replaced deprecated `<center>` tag, removed obsolete iframe attributes, added descriptive iframe titles, added WAI-ARIA states (`aria-expanded`, `role="dialog"`, `aria-invalid`, `aria-live`), added accessible blog heading hierarchy, and synchronized OS color-scheme preference detection.
- Refactored frontend to follow GoFront and `.templ` best practices: extracted helper functions into `src/render_helpers.go`, parameterized `.templ` components with explicit props, decomposed blog card and pagination sub-components, and sanitized raw HTML search query highlighting.
- Updated npm dependencies to latest versions (`@biomejs/biome`, `@fontsource/raleway`, `@playwright/test`, `fuse.js`, `jsdom`, `lefthook`, `marked`).

