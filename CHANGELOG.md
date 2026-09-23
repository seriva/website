# Changelog

All notable changes to this project will be documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [2026-09]

### Added

- Added `bootstrap` project entry and blog post.
- Initial release.

### Changed

- State-driven rendering and templ idioms ([plan](docs/plans/archive/state-driven-rendering-and-templ-idioms-plan.md)): the app shell is now mounted once and routes/overlays re-render their own regions (`src/ui.go`: `renderMain`, `renderNavbar`, `renderContactForm`, `syncOverlays`); introduced a `Route` enum with a pure, unit-tested `parseRoute()` and a `RouteView` template replacing duplicated string-prefix matching; contact form values are mirrored into state on `input` and validated by `validateContact()`; replaced 20 per-icon templates with one `Icon(name, size)` component backed by `src/icons.go`; fixed `aria-expanded`/`aria-invalid` to emit `"true"`/`"false"`; the projects dropdown toggle is a real `<button>` (no `javascript:` URL); dropped `fmt.Sprintf` for integer interpolation in templates; removed dead code (`initMarkdown`, unreachable EmailJS error flag).
- Security hygiene: moved the inline theme bootstrap and window shims to `app/boot.js` / `app/prism-init.js` so `'unsafe-inline'` is no longer needed in `script-src`; `scripts/copy-static.js` strips `localhost` dev origins from the CSP when producing `public/index.html`; removed the dead `src/main.js` reference from `404.html`.
- Upgraded GoFront compiler to v1.2.1 and dropped hard-coded version numbers from project metadata.
- Updated documentation and script pipeline: updated `README.md` to reflect GoFront `.templ` component architecture, active test suites, and SPA dev server; removed redundant `build` script and restored `test:unit` and `test:all` in `package.json`.
- Production static asset synchronization: added `scripts/copy-static.js` to `npm run prod` to automatically copy `index.html`, `404.html`, `data/`, `fonts/`, `css/`, and root assets from `app/` to `public/`, ensuring a self-contained output for GitHub Pages deployment.
- Production bundle minification: configured dual-target vendor packaging (`app/vendor.js` and `public/vendor.js`), enabled `--minify` for vendor dependencies and `--minify --mangle` for site bundle, reducing overall JavaScript payload by 97 KB (~33% reduction from 295 KB to 198 KB).
- Improved accessibility and HTML5 semantics: decomposed `ProjectDetail` into sub-components, replaced deprecated `<center>` tag, removed obsolete iframe attributes, added descriptive iframe titles, added WAI-ARIA states (`aria-expanded`, `role="dialog"`, `aria-invalid`, `aria-live`), added accessible blog heading hierarchy, and synchronized OS color-scheme preference detection.
- Refactored frontend to follow GoFront and `.templ` best practices: extracted helper functions into `src/render_helpers.go`, parameterized `.templ` components with explicit props, decomposed blog card and pagination sub-components, and sanitized raw HTML search query highlighting.
- Updated npm dependencies to latest versions (`@biomejs/biome`, `@fontsource/raleway`, `@playwright/test`, `fuse.js`, `jsdom`, `lefthook`, `marked`).

