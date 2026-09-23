# Changelog

All notable changes to this project will be documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)

## [2026-09]

### Added

- Added `bootstrap` project entry and blog post.
- Initial release.

### Changed

- Improved accessibility and HTML5 semantics: decomposed `ProjectDetail` into sub-components, replaced deprecated `<center>` tag, removed obsolete iframe attributes, added descriptive iframe titles, added WAI-ARIA states (`aria-expanded`, `role="dialog"`, `aria-invalid`, `aria-live`), added accessible blog heading hierarchy, and synchronized OS color-scheme preference detection.
- Refactored frontend to follow GoFront and `.templ` best practices: extracted helper functions into `src/render_helpers.go`, parameterized `.templ` components with explicit props, decomposed blog card and pagination sub-components, and sanitized raw HTML search query highlighting.
- Updated npm dependencies to latest versions (`@biomejs/biome`, `@fontsource/raleway`, `@playwright/test`, `fuse.js`, `jsdom`, `lefthook`, `marked`).

