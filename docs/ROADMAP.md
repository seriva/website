# Portfolio Website Roadmap

The guiding principle is **content over complexity** — features must serve the portfolio
content, not add framework overhead or maintenance burden.

Each release has a subfolder in `docs/` containing design documents for the planned
features (e.g. `docs/v1.1.0/`).

---

## [Unreleased]

<!-- Add planned version sections here as work begins. -->

---

## [v1.0.0] - YYYY-MM-DD

**Theme: Initial release.** Full portfolio website with reactive components, blog,
search, contact form, and GitHub Pages deployment.

| Feature | Difficulty | Status | Notes |
|---|---|---|---|
| Reactive component system | High | ✓ | Custom signals-based system, no virtual DOM. |
| SPA routing | Medium | ✓ | Path-based routing via Microtastic. |
| Blog with Markdown | Medium | ✓ | YAML metadata + Marked.js rendering with Prism.js syntax highlighting. |
| Fuzzy search | Low | ✓ | Fuse.js over projects and blog posts. |
| Contact form | Low | ✓ | EmailJS integration. |
| i18n | Medium | ✓ | Multi-language support via YAML-driven content. |
| Dark/light theme | Low | ✓ | CSS variables + localStorage persistence. |
| E2E tests | Medium | ✓ | Full Playwright suite across Chromium and Firefox. |
| GitHub Pages deployment | Low | ✓ | CI pipeline with unit + e2e gate before deploy. |

---

## Out of scope

Server-side rendering, databases, user accounts, or any backend beyond static hosting.
The site is intentionally a pure static SPA.
