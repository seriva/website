# Portfolio Website Agent Guide

# Part 1: Agent Workflow
> [!IMPORTANT]
> **IMMUTABLE SECTION:** Do not modify Part 1 unless explicitly instructed. This is a universal standard. Only adjust Part 2 (Project Context) for project-specific needs.

## 1. Context & Rules
- **Caveman Speak & Map:** Communicate and maintain `## Project Map` natively using "caveman" style (extreme density, zero fluff, drop grammar, `->` for correlations). Update Map on changes. Exception: human-facing docs (`README`, `CHANGELOG`, plans) must remain readable.
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
- **Branches:** `main` is releasable. Use `feat/` or `fix/` -> PR. Trivial fixes (typos, comments) may commit directly to `main`.
- **Commits:** Conventional Commits (`type(scope): subject`). Subject ≤72 chars, imperative mood. Body explains *why*. One logical change per commit.
- **Artifacts:** Never commit temporary agent session files (e.g., scratchpads, task checklists). Official feature plans should be committed.
- **Security:** Never commit secrets/API keys. Ensure `.env` is gitignored.
- **Self-Review:** Review `git diff` before commit. Strip debug logs/stray changes.

---

# Part 2: Project Context

## Project Identity
A modern, modular personal portfolio website built with vanilla JavaScript (ES6 modules), a custom signals-based reactive system, and YAML/Markdown-driven content. Microtastic handles build tooling and dev serving.

## Tech Stack
- **Runtime**: ES6 Modules (Vanilla JS) — no TypeScript, no virtual DOM
- **Reactivity**: Custom signals system (`utils/reactive.js`) with declarative DOM binding
- **Routing**: Path-based SPA routing (Microtastic)
- **Content**: YAML + Marked.js + Prism.js for Markdown rendering
- **Search**: Fuse.js (fuzzy search)
- **Integrations**: EmailJS (contact form), giscus (GitHub Discussions comments)
- **Build / Dev**: Microtastic (`npm run dev` on port 8181, `npm run prod`)
- **E2E Tests**: Playwright (`npm run test:e2e`) — tests/e2e/, requires dev server on port 8181
- **Quality**: Biome (`npm run format`, `npm run check`), Node.js test runner (`npm run test:unit`)

## Architecture
The entry point is `app/src/main.js`, which bootstraps the app and centralises global event delegation via `data-action` attributes. UI components live in `app/src/components/`, each pairing a class extending `Reactive.Component` with a co-located `*.styles.js` file for CSS-in-JS definitions. Shared utilities — the reactive system, the router, and `MarkdownLoader` — live in `app/src/utils/`. Static assets (fonts, Prism themes) are under `app/fonts/` and `app/css/`. The `scripts/` directory holds build-time helpers like `generate-seo.js`, and all tests reside in `tests/`.

## Core Rules & Anti-Patterns
- **Always use TDD:** core logic must have tests in `/tests/unit/` using the native Node.js test runner. `npm run test:unit` must pass before pushing. New user-facing features (routes, components, flows) must also have corresponding e2e tests in `/tests/e2e/`.
- **Root-relative paths only:** always use root-relative paths for modules (e.g., `/src/main.js`) so SPA routing works at any depth.
- **Reactive component pattern:** extend `Reactive.Component`; use `this.signal()` / `this.computed()` in `state()`; declare bindings in `template()` via `data-text`, `data-class-*`, `data-on-click`, etc.
- **Content lives in data:** all site content (projects, blog metadata, theme settings, i18n) belongs in `app/data/content.yaml` and `app/data/blog/` / `app/data/pages/` Markdown files, never hard-coded in components.
- **No TypeScript or virtual DOM:** this project uses pure ES6 modules with direct DOM manipulation; do not introduce frameworks or transpilers.
- **No scattered event listeners:** use `data-action` delegation in `main.js` instead of attaching `addEventListener` calls throughout components.
- **No ad-hoc naming:** classes/components are PascalCase, functions/variables are camelCase, private fields use `#` prefix, style files follow `[name].styles.js`.
- **No skipping quality gates:** never push without running `npm run format`, `npm run check`, `npm run test:unit`, `npm run test:e2e`, and `npm run prod`.


## Project Map
[Map generated natively by agent]
