# Portfolio Website Roadmap

The guiding principle is **content over complexity** — features must serve the portfolio
content, not add framework overhead or maintenance burden.

Design documents for planned features live in `docs/plans/`
(e.g. `docs/plans/<feature>-plan.md`).

---

## Completed

| Feature | Difficulty | Status | Notes |
|---------|------------|--------|-------|
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
