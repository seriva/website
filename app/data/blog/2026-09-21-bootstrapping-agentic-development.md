---
title: "Bootstrapping Agentic Development"
date: "2026-09-21"
excerpt: "AI coding assistants are great until every repo ends up with conflicting instructions, messy session artifacts, and broken quality gates. Here is how I standardized my workflow with Bootstrap."
tags: ["AI", "DevOps", "Workflow"]
---

Working with AI coding assistants across multiple projects is fantastic, but it quickly introduces a new kind of friction.

Every tool expects its own prompt file—`CLAUDE.md`, `.cursorrules`, `.github/copilot-instructions.md`—and without discipline, instructions drift apart. Worse, agents love generating transient session artifacts like ephemeral checklists, scratchpads, and worktrees that clutter up git history.

To solve this across all my repositories, I built [Bootstrap](/?project=bootstrap): a generic project scaffold and workflow standard for agentic development.

## The Core Philosophy

The scaffold revolves around four simple principles:

1. **`AGENTS.md` is the single source of truth**  
   Instead of maintaining separate instructions for every tool, all workflow rules and project context live in `AGENTS.md`. Tool-specific files (`CLAUDE.md`, `.cursorrules`, etc.) are one-line shims that simply point back to it.

2. **No session artifacts in the repo**  
   Transient agent state—scratchpads, temporary checklists, and tool-specific session directories—does not belong in git. The scaffold comes with a preconfigured `.gitignore` to keep repositories clean.

3. **Explicit quality gates**  
   Agents can hallucinate or take shortcuts, so quality enforcement cannot rely on prompt polite requests. Pre-commit hooks via [Lefthook](https://github.com/evilmartians/lefthook) and CI pipelines enforce formatting, linting, and tests automatically before any code is committed or merged.

4. **Docs-first planning**  
   For non-trivial features, agents must write narrative design plans (`docs/plans/<feature>-plan.md` or `docs/vX.Y.Z/<feature>-plan.md`) covering the goal, scope, approach, edge cases, and test plan before touching code.

## Two-Part Structure & Cross-Repo Sync

To make this reusable across totally different codebases—from Go compilers to WebGL games to vanilla JS websites—`AGENTS.md` is split into two distinct parts:

- **Part 1 (Agent Workflow):** Universal rules for communication, planning, TDD, quality gates, and git standards.
- **Part 2 (Project Context):** Project identity, tech stack, architecture boundaries, and directory layout.

Whenever I refine the universal rules in Part 1, a small shell script (`sync.sh`) propagates the updates and bridge files across all sibling repositories in my development directory.

## What It Feels Like

The difference is night and day. Switching between projects means any agent immediately picks up the exact same operating standards, knows the architecture boundaries without guessing, respects existing quality gates, and leaves the repository clean.
