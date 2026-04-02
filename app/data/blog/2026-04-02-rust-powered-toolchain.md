---
title: "Going Full Rust: Microtastic Upgrades to Rolldown"
date: "2026-04-02"
excerpt: "A small dependency bump that quietly made the entire toolchain Rust-powered — from bundling with Rolldown to linting with Biome."
tags: ["Web Development", "JavaScript", "Microtastic", "Performance"]
---

A routine dependency update this week turned into a nice milestone: the entire toolchain for this portfolio is now Rust-powered.

## The Change

Microtastic [0.0.71](https://github.com/seriva/microtastic) swapped out its bundler from [Rollup](https://rollupjs.org/) to [Rolldown](https://rolldown.rs/). Rolldown is a Rust-native bundler built to be API-compatible with Rollup, developed by the Vite team as the future foundation for Vite itself.

For Microtastic, and by extension this site, that means faster dependency bundling and production builds — without changing a single line of application code or configuration.

## The Full Picture

With that swap, the toolchain is now fully Rust-based:

| Tool | Role | Language |
|------|------|----------|
| [Rolldown](https://rolldown.rs/) | Dependency bundling & production builds | Rust |
| [Biome](https://biomejs.dev/) | Linting & formatting | Rust |

No Node.js-based build tooling remains in the critical path. Both tools are fast, opinionated, and require minimal configuration — which aligns perfectly with what Microtastic is about.

## Why It Matters

Rollup is great but it's JavaScript. Rolldown doing the same job in Rust is noticeably faster at scale, and as Rolldown matures it will gain even more Rollup compatibility and optimizations. Getting on this train early through Microtastic means future speed improvements come for free.

Biome was [already part of the setup](/?blog=2025-11-01-migrating-to-microtastic) — a single Rust binary replacing ESLint and Prettier with near-instant feedback.

Together they make `npm run prod` feel snappy in a way that a webpack- or Rollup-based setup rarely does. Both this site and SimpleFPS went from 2–4 second builds down to around 100ms. Admittedly, shaving a few seconds off a tiny project is the world's least necessary optimization — but at enterprise scale, that same ratio goes from minutes to seconds, which actually matters.

## The Takeaway

Sometimes the best improvements are invisible. No new features, no refactored components — just a faster, leaner toolchain underneath. That's the kind of upgrade I like.
