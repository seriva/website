# Portfolio Website Roadmap

The guiding principle is **content over complexity** — features must serve the portfolio
content, not add framework overhead or maintenance burden.

Design documents for planned features live in `docs/plans/`
(e.g. `docs/plans/<feature>-plan.md`).

---

## Completed

| Feature | Difficulty | Status | Notes |
|---------|------------|--------|-------|
| [Website Hardening and Output Hygiene](plans/archive/website-hardening-and-output-hygiene-plan.md) | Medium | Completed (2026-09-25) | `npm run prod` cleans `public/` first and publishes only runtime data (`content.json` + blog/page Markdown); `beginNavigation()` claims `routeSeq` before the fade so rapid navigations can't repaint or steal focus; blog card tab stop removed; `npm run test:build` + rapid-navigation/keyboard E2E. Markdown sanitization phase dropped (author-controlled content) |
| [Codebase Simplification](plans/archive/codebase-simplification-plan.md) | Medium | Completed (2026-09-25) | Behaviour-preserving cleanup: dead i18n keys/icons, unreachable `build.js` commands, five caches → one `contentCache`, shared `loadRoute`, drop `closing` overlay state (CSS-driven exit), `CommentsConfig` → raw giscus attrs, class-builder helpers → one `cls()` |
| [Website Enhancements](plans/archive/website-enhancements-plan.md) | Medium | Completed (2026-09-24) | Static route stubs with OG/Twitter/canonical meta for crawlers, SPA head-meta sync, blog TOC + prev/next + back link, `Ctrl+K` / `/` search shortcut, lazy EmailJS (pinned + SRI), CSS minify + content-hash cache busting, `content.yaml` dev watcher, `gofront --check` in `npm run check` |
| [Post-Rewrite Hardening](plans/archive/post-rewrite-hardening-plan.md) | Medium | Completed (2026-09-23) | `ViewState` + `LoadStatus` replaces route globals with pure resolvers, CSS extracted to `app/css/app.css` with Biome checks (app.js 104→73 KB), unit-test breadth restored via `gofront test --dom` (116 Go tests); coarse re-render explicitly accepted |
| [State-Driven Rendering & templ Idioms](plans/archive/state-driven-rendering-and-templ-idioms-plan.md) | Medium | Completed (2026-09-23) | Route enum + `parseRoute`, region renders, `syncOverlays()` reconciler, ARIA/button fixes, single `Icon()` component, CSP hygiene, GoFront 1.2.1 |
| [Accessibility, Semantics & Component Decomposition](plans/archive/accessibility-and-semantics-plan.md) | Low | Completed (2026-09-23) | Decomposed ProjectDetail, replaced obsolete tags/attrs, added WAI-ARIA states, and synced OS theme |
| [GoFront & templ Best Practices](plans/archive/gofront-templ-best-practices-plan.md) | Medium | Completed (2026-09-23) | Refactored helpers into Go files, parameterized components, decomposed templates, and secured raw HTML |
| [GoFront Rewrite](plans/archive/gofront-rewrite-plan.md) | High | Completed (2026-09-22) | Rewrote frontend from vanilla JS / Microtastic to GoFront (.templ) architecture |

---

## Upcoming

| Feature | Difficulty | Status | Notes |
|---------|------------|--------|-------|


---

## Out of scope

Server-side rendering, databases, user accounts, or any backend beyond static hosting.
The site is intentionally a pure static SPA.
