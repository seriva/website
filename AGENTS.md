# Portfolio Website

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
- **Quality**: Biome (`npm run format`, `npm run check`), Node.js test runner (`npm test`)

## Core Standards
1. **Always use TDD** — core logic must have tests in `/tests/` using the native Node.js test runner. `npm test` must pass before pushing.
2. **Lint & format every change** — run `npm run format` then `npm run check` (Biome) before committing. Use the `/verify` workflow.
3. **Root-relative paths only** — always use root-relative paths for modules (e.g., `/src/main.js`) so SPA routing works at any depth.
4. **Reactive component pattern** — extend `Reactive.Component`; use `this.signal()` / `this.computed()` in `state()`; declare bindings in `template()` via `data-text`, `data-class-*`, `data-on-click`, etc.
5. **Content lives in data** — all site content (projects, blog metadata, theme settings, i18n) belongs in `app/data/content.yaml` and `app/data/blog/` / `app/data/pages/` Markdown files, never hard-coded in components.

## Architecture
The entry point is `app/src/main.js`, which bootstraps the app and centralises global event delegation via `data-action` attributes. UI components live in `app/src/components/`, each pairing a class extending `Reactive.Component` with a co-located `*.styles.js` file for CSS-in-JS definitions. Shared utilities — the reactive system, the router, and `MarkdownLoader` — live in `app/src/utils/`. Static assets (fonts, Prism themes) are under `app/fonts/` and `app/css/`. The `scripts/` directory holds build-time helpers like `generate-seo.js`, and all tests reside in `tests/`.

## Anti-Patterns
- **No TypeScript or virtual DOM** — this project uses pure ES6 modules with direct DOM manipulation; do not introduce frameworks or transpilers.
- **No scattered event listeners** — use `data-action` delegation in `main.js` instead of attaching `addEventListener` calls throughout components.
- **No hard-coded content in components** — all copy, metadata, and configuration goes through `content.yaml` or Markdown files.
- **No ad-hoc naming** — classes/components are PascalCase, functions/variables are camelCase, private fields use `#` prefix, style files follow `[name].styles.js`.
- **No skipping quality gates** — never push without running `npm run format`, `npm run check`, `npm test`, `npm run test:e2e`, and `npm run prod`.
