# Portfolio Website Agent Guide

# Part 1: Agent Workflow
> [!IMPORTANT]
> **IMMUTABLE SECTION:** Do not modify Part 1 unless explicitly instructed. This is a universal standard. Only adjust Part 2 (Project Context) for project-specific needs.

## 1. Context & Rules
- **Caveman Speak:** Progress updates and tool-call narration use "caveman" style (extreme density, zero fluff, drop grammar, `->` for correlations). Explanations and answers to the user use normal readable prose.
- **Audiences:** Every file has one reader. *People* read `README.md`, `docs/`, `CHANGELOG.md`, PR descriptions, and commit bodies: plain prose, no task/phase/follow-up IDs, no references to plans. *Agents* read `plans/` (plans, `roadmap.md`, `follow-ups.md`): dense, symbol-heavy, ID-heavy text is fine there.
- **Skills Override:** While running a skill (`/design-plan`, `/execute-plan`, `/dev-loop`), its rules override **Blockers**, **Quality**, and **Branches** here.
- **Plan-first:** Non-trivial features (multi-component, arch-altering, risky) require a design plan created with `/design-plan` and tracked in `plans/roadmap.md`. Active plans live under `plans/` (or milestone subfolders like `plans/vX.Y.Z/`); on completion `/execute-plan` moves continuous plans to `plans/archive/`, while versioned plans stay in their milestone folder. Track execution by checking off tasks (`- [x]`) as they land.
- **TDD:** Write failing tests first for non-trivial logic (if applicable).
- **Quality:** Run format/lint before every commit. Before opening a PR, update `CHANGELOG.md` & `README.md` when user-facing behavior changed.
- **Changelog:** Write for someone upgrading, not for the reviewer: at most two plain sentences per entry saying what is different for them and why it matters. Name only the APIs or flags the reader needs to act on and link to docs for full lists. Never include task, phase, or follow-up IDs, file paths, test fixture names, or internal identifiers, and never paste the commit body. One entry per feature or plan: rewrite it as later work lands instead of appending. Breaking changes go under `### Changed`, start with **Breaking:**, and say what to do. Good: "Collision checks are about twice as fast on large maps." Bad: "Add 4-wide SIMD triangle-packet kernel in `collision/packet.go` behind `useSIMD` (Task 2.3)."
- **Docs:** `README.md` and `docs/` describe how to use the project as it is now: start from what the reader wants to do, show a short example, then the details. No change history (that is the changelog), no plan or task references, and no implementation notes outside docs that are explicitly about internals. Generated tables are fine.
- **Verify:** Run tests/compiler or ask user to visually verify before concluding/commit/PR. Never assume.
- **Blockers:** Stop and ask user on ambiguity; do not guess.
- **Scope:** Stick strictly to requested task/plan. No unrequested features/refactoring. A real bug noticed outside the task goes in `plans/follow-ups.md` with a one-line repro, not into the diff.
- **Dependencies:** Use existing packages/standard lib. Ask before adding new dependencies.
- **Stuck:** If same approach fails twice, stop and ask user. Do not retry blindly.
- **Code Preservation:** Do not delete existing comments, docstrings, or unrelated code unless explicitly instructed.

## 2. Git Standards
- **No Auto-Commit:** Never run `git commit`, `git push`, or history-rewriting commands unless the user explicitly asks in the current turn. Make changes, run quality gates, report, then wait for the user to commit or instruct. Exception: invoking `/dev-loop` or `/execute-plan` is explicit permission to branch, commit, push, and open/merge PRs exactly as that workflow defines, including for the subagents it spawns.
- **Branches:** Default branch is releasable; the pre-commit hook is the gate. Commit directly to it. Use a `<type>/<task-slug>` (`feat/` or `fix/`) branch + PR only when the user asks, via `/dev-loop`, or when the change is risky enough to want CI green before merge. Multi-phase plans use epic branch `feat/<plan-slug>` and phase branches `feat/<plan-slug>-phase-<N>`.
- **Commits & PR Titles:** Conventional Commits (`<type>(<scope>): <summary>`). Subject ≤72 chars, imperative mood. Body explains *why*. One logical change per commit.
- **Artifacts:** Never commit temporary agent session files (e.g., scratchpads, tool-specific session state). Official feature plans (including task checklists) should be committed.
- **Security:** Never commit secrets/API keys. Ensure `.env` is gitignored.
- **Self-Review:** Review `git diff` before commit. Strip debug logs/stray changes.

---

# Part 2: Project Context

## Project Identity

- **Release Model**: Continuous (`plans/`)

A modern personal portfolio website built with GoFront using `.templ` component architecture, compiled to native JavaScript ES modules, with YAML/Markdown-driven content.

## Tech Stack
- **Framework**: GoFront (`.templ` components, Go-inspired frontend architecture)
- **Reactivity & DOM**: Native GoFront `.templ` and `gom` DOM rendering
- **Routing**: Path-based SPA routing via `app/src/router.go`
- **Content**: YAML + Marked.js + Prism.js for Markdown rendering
- **Search**: Fuse.js (fuzzy search)
- **Integrations**: EmailJS (contact form), giscus (GitHub Discussions comments)
- **Build / Dev**: `npm run dev` (port 8181), `npm run prod` (production bundle in `public/`)
- **E2E Tests**: Playwright (`npm run test:e2e`) — tests/e2e/, requires dev server on port 8181
- **Quality**: Biome (`npm run format`, `npm run check`), GoFront type checker (`gofront check`)

## Commands

- **Test**: `npm run test:gofront`, `npm run test:build`, `npm run test:e2e` (needs dev server on port 8181); everything: `npm run test:all`
- **Lint**: `npm run check` (Biome + `gofront check`)
- **Format**: `npm run format`
- **Build**: `npm run prod`
- **Pre-commit gate**: `lefthook run pre-commit` (format → lint → `test:gofront`)

## Architecture
The application is written in GoFront in `app/src/`. The entry point is `app/src/main.go`, which bootstraps the app and centralises global event delegation via `data-action` attributes. UI components live in `app/src/*.templ`. State and store logic reside in `app/src/store.go`, route content state (`ViewState`) and its pure resolvers in `app/src/view.go`, routing in `app/src/router.go`, markdown handling in `app/src/markdown.go`, theme management in `app/src/theme.go`, search in `app/src/search.go`, email handling in `app/src/email.go`. Global CSS is a plain stylesheet at `app/css/app.css` (linked from `index.html`, formatted and linted by Biome). Build output is generated to `app/app.js` (dev) and `public/app.js` (prod).

## Core Rules & Anti-Patterns
- **GoFront Architecture:** All UI components are written in `.templ` files in `app/src/`. Go source code lives in `app/src/` under `package main`.
- **Root-relative paths only:** always use root-relative paths for routes (e.g., `/blog`, `/project/:id`, `/page/:id`).
- **Content lives in data:** all site content belongs in `app/data/content.yaml` and `app/data/blog/` / `app/data/pages/` Markdown files, never hard-coded in components.
- **No scattered event listeners:** use `data-action` delegation in `main.go` instead of attaching `addEventListener` calls throughout components.
- **State drives the DOM:** mutate the Go state, then call the matching region render (`renderMain`, `renderNavbar`, `renderContactForm`, `renderSearchResults`) or `syncOverlays()` in `app/src/ui.go`. Overlays are plain booleans (`searchOpen`, `contactOpen`); their exit animation is CSS-only (`visibility`/`opacity` transitions on `.show`), so there is no `closing` state or timer. Conditional classes in templates go through `cls(base, on, extra)`. Do not toggle classes or read form values ad hoc with `querySelector`.
- **Route content lives in `view ViewState`:** one struct with a `LoadStatus` enum (`LoadReady`/`LoadPending`/`LoadFailed`/`LoadNotFound`), reset by `handleRoute` on every navigation. Rendered markdown is memoised in a single `contentCache map[string]cachedContent` keyed by route path (`/blog/<slug>`, `/project/<id>`, `/page/<id>`). Keep resolvers (`resolvePost`/`resolveProject`/`resolvePage`) pure — no DOM, no `fetch` — so they stay unit-testable; `loadRoute(key, url, transform)` in `app/src/router.go` is the one place that fetches, caches and guards against superseded navigations (`routeSeq`).
- **Testable seams:** logic that touches `fetch`, `Fuse`, or the URL goes behind a small pure function (`parseRoute`, `postFromYAML`, `performSearch` over an injectable `fuseInstance`). DOM-dependent tests run under `gofront test --dom` (jsdom); use `window.localStorage`, never bare `localStorage`, so code runs in both.
- **No skipping quality gates:** never push without running `npm run check`, `gofront check`, `npm run test:e2e`, and `npm run prod`.
- **Unversioned project:** this project does not use version numbers or semver releases. Feature plans belong in `plans/<feature>-plan.md` (never `plans/vX.Y.Z/`). Completed plans stay in place, marked Completed with date, and their roadmap row moves to `## Completed`. Roadmap, documentation, changelog, and package metadata do not maintain version numbers.

