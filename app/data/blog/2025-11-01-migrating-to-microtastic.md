---
title: "Adding Minimal Build Tooling with Microtastic"
date: "2025-11-01"
excerpt: "Moving from CDN dependencies to self-hosted bundles using a minimal build tool I originally created for another project."
tags: ["Web Development", "JavaScript", "Performance", "Microtastic"]
---

Remember when I [vibe-coded my portfolio](/?blog=2025-10-21-vibing-portfolio-website) in a few hours? I went from Hugo to a vanilla JavaScript SPA with zero build process. No webpack, no Babel, just ES6 modules loading dependencies from CDNs.

It worked great! But I started thinking: what if I wanted to self-host these dependencies?

## The Trade-off

My zero-build setup was simple:

```html
<script defer src="https://cdn.jsdelivr.net/npm/marked@11.1.1/marked.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/fuse.js@7.0.0/dist/fuse.min.js"></script>
<!-- 4 more CDN scripts... -->
```

CDNs work fine, but I wanted:
- Self-hosted dependencies (no external requests)
- Version control over my dependencies
- Offline capability
- One bundled file instead of multiple requests

But I *didn't* want webpack configuration hell.

The dilemma: how to bundle dependencies without drowning in tooling complexity?

## Enter Microtastic

I wanted dependency bundling, not a full build system. Turns out, I'd already built the perfect tool for this.

I originally created [Microtastic](https://github.com/scriptex/microtastic) for [simplefps](/?project=simplefps), another project of mine. It does exactly *one thing*: bundles your npm dependencies and gets out of the way.

```bash
microtastic prep  # Bundle dependencies
microtastic dev   # Dev server
microtastic prod  # Production build
```

That's it. Three commands, one tiny config file.

**What it does:**
- Bundles npm packages to `app/src/dependencies/`
- Minifies for production
- Runs a dev server with hot reload

**What it doesn't do:**
- Touch your application code
- Transpile anything
- Force any framework
- Generate config hell

Perfect middle ground between "no build" and "enterprise pipeline."

## The Migration (30 Minutes)

```bash
# 1. Install dependencies
npm install marked prismjs fuse.js yamljs --save
npm install microtastic --save-dev

# 2. Create .microtastic config (5 lines)
echo '{"minifyBuild": true, "serverPort": 8081}' > .microtastic

# 3. Update imports
# Before: <script src="cdn.jsdelivr.net/..."></script>
# After:  import { marked } from "./dependencies/marked.js";

# 4. Done
npm run prepare && npm run dev
```

That's it. No webpack config, no Babel, no complexity.

## The Results

**Before (CDN):**
- 6 HTTP requests to jsdelivr
- ~140KB total dependencies
- Works great, but external dependency
- Offline: ❌

**After (Microtastic):**
- 1 HTTP request (self-hosted)
- 96KB bundle (-34%)
- Fully self-contained
- Offline: ✅
- Build time: 2.5 seconds

## The Workflow

```bash
npm run dev   # Dev server in 1 second, auto-refresh
npm run prod  # Lint + bundle + minify in 2.5 seconds
git push      # Deploy via GitHub Actions
```

Clean, fast, simple.

## Bonus: Adding Comments

With the modular architecture, adding features is straightforward. I integrated [giscus](https://giscus.app/) for comments - it uses GitHub Discussions as a backend, so no database needed.

Added to `content.yaml`:
```yaml
comments:
  enabled: true
  repo: "seriva/website"
```

One template function later, blog posts have comments. No backend, no database, just GitHub.

## The Journey

**Hugo** → Limited interactivity, Go templates  
**Vanilla SPA** → Total control with CDN dependencies  
**Microtastic** → Same control, self-hosted dependencies

Each step made sense. Hugo got me started. Vanilla gave me control. Microtastic let me keep that control while bundling dependencies.

## Key Learnings

1. **Minimal tooling is optimal** - Not zero, not enterprise. Just enough.
2. **Build times matter** - 2.5 seconds beats 30-second webpack rebuilds
3. **Dependencies are liabilities** - Keep your bundle lean
4. **Modern browsers are powerful** - ES6 modules, fetch, CSS Grid - use the platform
5. **Less magic = easier debugging** - Know exactly where to look

## Would I Recommend It?

**Yes** for portfolios, blogs, small SPAs where you want control without complexity.

**No** if you need TypeScript, JSX, SSR, or a large team with React/Vue workflows.

## The Takeaway

Sometimes the right tool isn't about features—it's about getting out of your way.

Hugo → Vanilla SPA → Microtastic. Each step taught me something. Building Microtastic for simplefps and then reusing it here? That's the kind of tool reusability that makes side projects fun.

The current setup is fast, maintainable, and actually fun to work on.

Check out the code on [GitHub](https://github.com/seriva/website). The entire build setup is 19 lines in `package.json`. Microtastic itself is also [open source](https://github.com/scriptex/microtastic).

---

*P.S. - Yes, Vite and esbuild are great. But sometimes building your own minimal tool teaches you more than using someone else's powerful one.*

