# Portfolio Website Agent Guide

# Part 1: Agent Workflow
> [!IMPORTANT]
> **IMMUTABLE SECTION:** Do not modify Part 1 unless explicitly instructed. This is a universal standard. Only adjust Part 2 (Project Context) for project-specific needs.

## 1. Context & Rules
- **Caveman Speak:** Communicate in "caveman" style (extreme density, zero fluff, drop grammar, `->` for correlations). Exception: human-facing docs (`README`, `CHANGELOG`, plans) must remain readable.
- **Plan-first:** Create `docs/vX.Y.Z/<feature>-plan.md` & update roadmap for non-trivial (multi-component, arch-altering, risky) features.
- **TDD:** Write failing tests first for non-trivial logic (if applicable).
- **Quality:** Run format/lint before every commit. Update `CHANGELOG.md` & `README.md` before PR.
- **Verify:** Run tests/compiler or ask user to visually verify before concluding/PR. Never assume.
- **Blockers:** Stop and ask user on ambiguity; do not guess.
- **Scope:** Stick strictly to requested task/plan. No unrequested features/refactoring.
- **Dependencies:** Use existing packages/standard lib. Ask before adding new dependencies.
- **Stuck:** If same approach fails twice, stop and ask user. Do not retry blindly.
- **Code Preservation:** Do not delete existing comments, docstrings, or unrelated code unless explicitly instructed.

## 2. Git Standards
- **No Auto-Commit:** Never run `git commit`, `git push`, or history-rewriting commands unless the user explicitly asks in the current turn. Make changes, run quality gates, report, then wait for the user to commit or instruct.
- **Branches:** Default branch is releasable; the pre-commit hook is the gate. Commit directly to it. Use a `feat/` or `fix/` branch + PR only when the user asks or the change is risky enough to want CI green before merge.
- **Commits:** Conventional Commits (`type(scope): subject`). Subject ≤72 chars, imperative mood. Body explains *why*. One logical change per commit.
- **Artifacts:** Never commit temporary agent session files (e.g., scratchpads, task checklists). Official feature plans should be committed.
- **Security:** Never commit secrets/API keys. Ensure `.env` is gitignored.
- **Self-Review:** Review `git diff` before commit. Strip debug logs/stray changes.

---

# Part 2: Project Context

## Project Identity
A modern personal portfolio website built with GoFront using `.templ` component architecture, compiled to native JavaScript ES modules, with YAML/Markdown-driven content.

## Tech Stack
- **Framework**: GoFront (`.templ` components, Go-inspired frontend architecture)
- **Reactivity & DOM**: Native GoFront `.templ` and `gom` DOM rendering
- **Routing**: Path-based SPA routing via `src/router.go`
- **Content**: YAML + Marked.js + Prism.js for Markdown rendering
- **Search**: Fuse.js (fuzzy search)
- **Integrations**: EmailJS (contact form), giscus (GitHub Discussions comments)
- **Build / Dev**: `npm run dev` (port 8181), `npm run prod` (production bundle in `public/`)
- **E2E Tests**: Playwright (`npm run test:e2e`) — tests/e2e/, requires dev server on port 8181
- **Quality**: Biome (`npm run format`, `npm run check`), GoFront type checker (`gofront src --check`)

## Architecture
The application is written in GoFront in `src/`. The entry point is `src/main.go`, which bootstraps the app and centralises global event delegation via `data-action` attributes. UI components live in `src/*.templ`. State and store logic reside in `src/store.go`, route content state (`ViewState`) and its pure resolvers in `src/view.go`, routing in `src/router.go`, markdown handling in `src/markdown.go`, theme management in `src/theme.go`, search in `src/search.go`, email handling in `src/email.go`. Global CSS is a plain stylesheet at `app/css/app.css` (linked from `index.html`, formatted and linted by Biome). Build output is generated to `app/app.js` (dev) and `public/app.js` (prod).

## Core Rules & Anti-Patterns
- **GoFront Architecture:** All UI components are written in `.templ` files in `src/`. Go source code lives in `src/` under `package main`.
- **Root-relative paths only:** always use root-relative paths for routes (e.g., `/blog`, `/project/:id`, `/page/:id`).
- **Content lives in data:** all site content belongs in `app/data/content.yaml` and `app/data/blog/` / `app/data/pages/` Markdown files, never hard-coded in components.
- **No scattered event listeners:** use `data-action` delegation in `main.go` instead of attaching `addEventListener` calls throughout components.
- **State drives the DOM:** mutate the Go state, then call the matching region render (`renderMain`, `renderNavbar`, `renderContactForm`, `renderSearchResults`) or `syncOverlays()` in `src/ui.go`. Overlays are plain booleans (`searchOpen`, `contactOpen`); their exit animation is CSS-only (`visibility`/`opacity` transitions on `.show`), so there is no `closing` state or timer. Conditional classes in templates go through `cls(base, on, extra)`. Do not toggle classes or read form values ad hoc with `querySelector`.
- **Route content lives in `view ViewState`:** one struct with a `LoadStatus` enum (`LoadReady`/`LoadPending`/`LoadFailed`/`LoadNotFound`), reset by `handleRoute` on every navigation. Rendered markdown is memoised in a single `contentCache map[string]cachedContent` keyed by route path (`/blog/<slug>`, `/project/<id>`, `/page/<id>`). Keep resolvers (`resolvePost`/`resolveProject`/`resolvePage`) pure — no DOM, no `fetch` — so they stay unit-testable; `loadRoute(key, url, transform)` in `src/router.go` is the one place that fetches, caches and guards against superseded navigations (`routeSeq`).
- **Testable seams:** logic that touches `fetch`, `Fuse`, or the URL goes behind a small pure function (`parseRoute`, `postFromYAML`, `performSearch` over an injectable `fuseInstance`). DOM-dependent tests run under `gofront test src --dom` (jsdom); use `window.localStorage`, never bare `localStorage`, so code runs in both.
- **No skipping quality gates:** never push without running `npm run check`, `gofront src --check`, `npm run test:e2e`, and `npm run prod`.
- **Unversioned project:** this project does not use version numbers or semver releases. Feature plans belong in `docs/plans/<feature>-plan.md` (never `docs/vX.Y.Z/`). Completed plans are moved to `docs/plans/archive/` (marked Completed with date, roadmap link updated). Roadmap, documentation, changelog, and package metadata do not maintain version numbers.

