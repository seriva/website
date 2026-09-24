---
title: "Dogfooding GoFront: A Real-World Test Bed for My Compiler"
date: "2026-09-24"
excerpt: "Microtastic is still doing great work in SimpleFPS, but GoFront needed a serious production test bed. Here is how dogfooding the compiler exposed real bugs and hardened the toolchain."
tags: ["Go", "GoFront", "Web Development", "Microtastic"]
---

When I released [GoFront](/blog/2026-04-15-gofront-go-to-javascript), it had a couple of sample apps: a todo list in vanilla DOM and another using signals. They proved the compiler worked, but toy examples only take you so far. If you want to know whether a compiler and its component system truly hold up, you have to use it for real.

Meanwhile, this website was running on vanilla JavaScript, a custom 1,100-line signals library ([`reactive.js`](/blog/2025-11-26-building-reactive-js)), and [Microtastic](/blog/2025-11-01-migrating-to-microtastic).

Microtastic is still great—it [upgraded to Rolldown](/blog/2026-04-02-rust-powered-toolchain) recently, does its job with zero fuss, and continues to power [SimpleFPS](/project/simplefps). But my portfolio was the perfect non-trivial candidate to test GoFront in anger: client-side SPA routing, Markdown rendering, code highlighting, fuzzy search, comments, and 10 existing Playwright E2E test suites.

## The Architecture

The rewrite moved all frontend code into Go and `.templ` components under `src/`:

```templ
package main

templ BlogPostCard(post BlogPost) {
    <article class="blog-post-card">
        <h2 class="post-title">
            <a href={ "/blog/" + post.Slug } data-action="nav">{ post.Title }</a>
        </h2>
        <div class="post-meta"><time>{ post.Date }</time></div>
        <p class="post-excerpt">{ post.Excerpt }</p>
    </article>
}
```

The key pieces:
- **Declarative `.templ` components**: Compile directly to native DOM calls with zero virtual DOM overhead.
- **Typed Go models**: `BlogPost`, `Project`, and a unified `ViewState` struct with pure, testable route resolvers.
- **Global event delegation**: All user actions (`nav`, `toggle-theme`, `filter-tag`) routed through a single `data-action` handler on `#app` in `main.go`.
- **Clean JS bridging**: External libraries (`marked`, `prismjs`, `fuse.js`, `@emailjs/browser`) bundled into `vendor.js` via `gofront prep` and typed in `browser.d.ts`.

## Shortcomings and Bugs Exposed

Building a real app pushed GoFront far harder than isolated test cases, exposing genuine compiler bugs and architectural friction:

- **Constructor parameter shadowing**: When a struct field shared the exact name of its type (`Project Project`), GoFront's emitted JavaScript constructor shadowed the class identifier. (Now fixed in the compiler; temporarily worked around as `Proj Project`).
- **Map iteration quirks**: Single-variable map ranges (`for k := range m`) didn't emit `Object.keys()` properly, which immediately broke during tag filtering.
- **Coarse mounting vs. input focus**: Without a virtual DOM, coarse re-renders (`gom.Mount`) replace an entire slot. In search, that meant typing a single letter destroyed input focus and cursor position. The solution was adopting targeted sub-mounts (`#search-page-results`) so keystrokes update the results list without touching the input element.
- **Node vs. Browser DOM globals**: Testing Go frontend code locally required jsdom, which threw errors on bare `localStorage`. That pushed me to build `gofront test --dom` so Go frontend tests run in Node just like native `go test`.
- **SPA route fallback in dev**: Real navigation needs clean deep links (`/blog`, `/project/:id`). That led directly to adding native SPA route fallback to `gofront --serve`.

## The Results

- **~7,800 lines of custom JS deleted** (including all of `reactive.js`).
- **All 10 Playwright E2E test suites passed** with zero changes to test assertions.
- **Fast Go unit tests added** via `gofront test src --dom`.
- **0 runtime type errors**: everything verified at compile time.

## The Takeaway

Microtastic is still the right tool for SimpleFPS, but dogfooding GoFront on my own site was the best move for the compiler. Finding real bugs, fixing awkward runtime interactions, and adding practical tooling turned an interesting side project into a battle-tested toolchain running in production.

Code is on [GitHub](https://github.com/seriva/website).
