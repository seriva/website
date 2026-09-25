# Website Hardening and Output Hygiene - Design Plan

**Version:** continuous
**Status:** Completed (2026-09-25) — phases 1 and 2 shipped; the Markdown trust-policy phase was
dropped (see Out of Scope).

---

## Goal

Make production output reproducible, prevent outdated navigation from painting the wrong
route, and remove a dead keyboard stop without changing the portfolio's features or visual
design. Keep the site static and retain route-specific metadata, search, syntax highlighting,
Mermaid diagrams, comments, and the current authoring format.

## Out of Scope

- Rewriting GoFront routing, replacing Marked/Prism/Fuse, or changing the YAML authoring format.
- Removing static route stubs, the `404.html` fallback, or Markdown features to reduce bytes.
- Adding dependencies without approval.
- Removing local source files from `app/data/`; only control what goes into `public/`.
- A Markdown sanitization policy (originally phase 3). All rendered Markdown is either
  author-controlled (`app/data/`) or the author's own GitHub READMEs, and the CSP already
  blocks inline script; a sanitizer dependency was judged not worth it for this content model.

## Approach

Implement and verify each phase independently. Record a baseline of generated route stubs,
sitemap/RSS, and app/vendor/CSS sizes before changing the build.

### 1. Deterministic production output (completed 2026-09-25)

- `npm run prod` runs `node scripts/build.js clean` (removes only `public/`) before
  `gofront prep`/compile. `syncRuntimeData` in `scripts/build.js` copies `content.json`,
  all `blog/*.md` and `pages/*.md`, and any file referenced by `content.json`;
  `"data"` was removed from `publicAssets`. `npm run test:build` covers the regression.
- Baseline/after: 24 route stubs (identical list), `app.js` 76,676 B, `vendor.js`
  100,667 B, `app.css` 26,525 B (unchanged). `public/data/` dropped `content.yaml`,
  `.keep` and 11 stale `.html` files. Two consecutive builds differ only in `rss.xml`
  (`lastBuildDate`).
- Invariants kept: cleaning never touches `app/` and never runs in `post` (bundles are
  already there); a post that references a non-Markdown file keeps that file rather than
  silently dropping a live route; `content.yaml` and unreferenced `.html` are never published.

### 2. Navigation and keyboard correctness (completed 2026-09-25)

- `handleRoute` now calls `beginNavigation()` first, which bumps `routeSeq` before the 200 ms
  fade and returns an `isCurrent()` check. It is consulted after the fade (a superseded
  navigation returns without resetting `view` or fetching) and again after the loader (no
  focus move or hash scroll for a stale route). `loadRoute` keeps its cache-fill-but-don't-
  render behaviour for completed but superseded fetches.
- `BlogPostCard` lost `tabindex="0"`; the nested title link is the only tab stop and pointer
  clicks on the card body still open the post via `data-action="open-post"`.
- Verified: `TestBeginNavigation` and an updated `TestBlogPostCardMount` in `gofront test`;
  three new Playwright tests (two same-tick clicks paint only the latest post and fetch once;
  a 1.5 s stale fetch neither repaints nor steals focus; Tab visits every title link and never
  a card). All three fail against the previous router/template and pass after.

## Edge Cases

- `public/` is ignored generated output; cleanup must be restricted to that path and must
  never delete author content or a concurrently running dev server's `app/` output.
- Deep links, pagination aliases, `404.html`, route-specific social metadata, sitemap, and RSS
  must survive a clean build. Build version hashes must still match the files deployed.
- Direct page Markdown loads use `/data/pages/<id>.md`; post filenames come from content
  data. Keep any non-`.md` file if it is actually referenced by a live route.
- A slow fetch can resolve while a newer route is fading out; two quick navigations may
  overlap in the transition delay. Neither may overwrite the latest route or steal focus.

## Test Plan

- **Build regression:** add a focused build test (using Node's built-in test runner or an
  existing test helper) that places a sentinel under `public/`, runs the production sequence,
  and asserts it is gone while `app.js`, `vendor.js`, `404.html`, known route stubs, sitemap,
  RSS, `content.json`, referenced blog/page Markdown, and their metadata remain. Assert
  `content.yaml` and unreferenced `.html` are absent; never put test sentinels in `app/`.
- **Route unit/E2E:** extend `src/router_test.go`'s superseded-fetch coverage and add an E2E
  test with delayed Markdown responses and two rapid navigations during the fade. Final
  content, metadata, focus, and URL must agree; normal navigation and back/forward still work.
- **Keyboard E2E:** Tab through the blog list and assert each card contributes its title link
  but no extra article stop; click the card body to confirm pointer behavior remains.
- **Gates:** `npm run check`, `npm run test:gofront`, `npm run test:e2e`, `npm run prod`.
  Compare the baseline route list and generated metadata, then record before/after shipped
  sizes. Do not remove a runtime dependency just to hit a size target: current app JS,
  vendor JS, and CSS total about 59 KB gzipped, and unused published data costs deploy
  space rather than page-load bandwidth.