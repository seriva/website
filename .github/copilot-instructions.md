# Portfolio Website - AI Coding Agent Guide

## Architecture Overview

This is a **vanilla JavaScript SPA (Single-Page Application)** with zero build tools. Content is driven by `www/data/content.yaml` and markdown files. The entire app lives in one monolithic `www/js/main.js` (~1500 lines) that handles routing, templating, search, and rendering.

**Key architectural decisions:**
- **No framework/build step**: Direct HTML/CSS/JS served via static HTTP server (darkhttpd in dev)
- **CDN dependencies**: marked.js, Prism.js (with autoloader), yamljs, MiniSearch loaded via jsDelivr
- **Security-first templating**: Tagged template literals (`html\`...\``) with automatic HTML escaping via `escapeHtml()`. Use `safe()` wrapper for trusted HTML.
- **Client-side routing**: Hash-free URLs with `?blog`, `?project=id`, `?page=id` patterns using `URLSearchParams` + `handleRoute()`
- **Dynamic theming**: CSS custom properties set from YAML config at runtime via `applyColorScheme()`
- **Syntax highlighting**: Prism.js (~2KB core) auto-highlights code blocks after page transitions, themes loaded dynamically

## Critical Data Flow

1. **App init** (`DOMContentLoaded`): `getData()` → parses `data/content.yaml` → applies theme → injects navbar/footer → `handleRoute()`
2. **Routing** (`handleRoute()`): Parse URL params → `loadBlogPage()` / `loadProjectPage()` / `loadPage()` → render to `#main-content`
3. **Search**: `Search.init()` indexes projects + blog posts with MiniSearch → fuzzy search via `#search-page` overlay
4. **Project content**: READMEs lazy-loaded from GitHub (`fetchGitHubReadme()`) using raw.githubusercontent.com URLs

## Content Management

### Adding Content

**Blog posts**: Create `www/data/blog/YYYY-MM-DD-slug.md` with frontmatter:
```markdown
---
title: "Post Title"
date: "2025-10-21"
excerpt: "Brief summary"
tags: ["tag1", "tag2"]
---
Content here...
```
Then add metadata to `www/data/content.yaml` under `blog.posts[]`.

**Pages**: Create `www/data/pages/{pageid}.md` (markdown only, no frontmatter needed). Reference in YAML `pages[]` config.

**Projects**: Add to `projects[]` in YAML. Set `github_repo: "username/repo"` to auto-fetch README. Use `youtube_videos[]` for embeds, `demo_url` for iframe demos.

### YAML Structure

- `site.colors`: Runtime theming (primary, background, text, code.theme for Prism.js)
  - Available Prism themes: `prism`, `prism-dark`, `prism-tomorrow`, `prism-okaidia`, `prism-twilight`, `prism-coy`, `prism-funky`, `prism-solarizedlight`
- `site.i18n`: Translation keys (currently en-only, system is i18n-ready)
- `site.defaultRoute`: Where to redirect when landing on `/` (e.g., `"?blog"`)
- `blog.postsPerPage`: Pagination config

## Development Workflow

**Start dev server**: Use VS Code task "Dev Server" or `cd www && darkhttpd . --port 8081`  
**Format code**: Task "Format Code" or `biome format --write .`  
**Check code quality**: Task "Check Code Quality" or `biome check .`  
**Run tests**: Open `http://localhost:8081/tests.html` in browser (QUnit suite)

Biome handles both formatting and linting. VS Code is configured to auto-format on save.

**Before committing changes:**
1. Run `biome check .` to verify code quality
2. Open `http://localhost:8081/tests.html` to ensure all tests pass
3. Verify the dev server shows no console errors

**Testing philosophy**: Unit tests for utilities (`test-utils.js`), templates (`test-templates.js`), routing logic (`test-routing.js`), DOM behaviors (`test-dom.js`). Search tested via `test-search.js`. No E2E/integration tests.

## Code Conventions

### Templates
- All templates in `Templates` object use `html\`...\`` tagged template literals
- **Never** concatenate user input directly: `html\`<div>${userInput}</div>\`` auto-escapes
- Trusted HTML: `${safe(htmlString)}` to bypass escaping (use sparingly)
- Template structure: `Templates.componentName = (args) => html\`...\``

### Routing Patterns
- SPA links: `<a href="?blog" data-spa-route="page">` → handled by `setupSpaRouting()`
- Route handlers: `loadBlogPage()`, `loadBlogPost(slug)`, `loadProjectPage(id)`, `loadPage(pageId)`
- Always call `closeMobileMenu()` in route handlers
- Update `<title>` from `data.site.title` in each route handler

### Search Implementation
- Indexed fields: `title`, `description`, `tags`, `content` (blog/projects)
- Boost order: `title: 2, description: 1.5, tags: 1.2, content: 0.5`
- Clickable tags: `searchByTag(tag)` → opens search page with pre-filled query
- Debounced input: 300ms (`CONSTANTS.SEARCH_DEBOUNCE_MS`)

### Markdown Handling
- Use `MarkdownLoader.loadFile(path)` for raw content
- `MarkdownLoader.parseFrontmatter(markdown)` → `{metadata, content}`
- `MarkdownLoader.loadAsHtml(path)` → rendered HTML string
- GitHub READMEs: `fetchGitHubReadme(repo)` → `https://raw.githubusercontent.com/{username}/{repo}/master/README.md`

## Mobile Responsiveness

- Breakpoint: `CONSTANTS.MOBILE_BREAKPOINT = 767`
- Unified search: `#search-page` overlay for both mobile/desktop (replaces separate navbar search)
- Mobile menu: `#navbar-toggle` → `.navbar-collapse.show` → `closeMobileMenu()` on route change or outside click

## Common Gotchas

1. **Async initialization race**: `getData()` is cached in `projectsData` global. Always `await getData()` before accessing config.
2. **Theme timing**: `applyPrismTheme()` must run before rendering code blocks. Called automatically by `getData()`.
3. **Syntax highlighting**: Prism.js highlights code automatically after page transitions via `Prism.highlightAllUnder()` in `endTransition()`.
4. **Dropdown state**: Custom dropdown logic in `initCustomDropdowns()` (not Bootstrap). Close all dropdowns before opening new one.
5. **Lazy content loading**: Project READMEs load after initial render via `loadAdditionalContent()`. Use `data-repo` attributes on placeholder divs.
6. **i18n keys**: `i18n.t(key)` fallback returns key itself if translation missing. All current content is English-only but structure supports multilingual.

## Key Files Reference

- `www/js/main.js`: Entire application logic (utilities, templates, routing, search, loaders)
- `www/data/content.yaml`: All site content, config, project metadata, blog post indexes
- `www/css/main.css`: All styles, CSS custom properties for theming
- `www/tests/`: QUnit test suite (7 test files + test runner)
- `.devcontainer/`: Alpine Linux + darkhttpd + Biome setup

## When Modifying

- **Adding features**: Keep functions in `main.js` grouped by comment sections (CONSTANTS, UTILITY FUNCTIONS, TEMPLATES, etc.)
- **New templates**: Add to `Templates` object, use `html\`...\`` pattern, always escape user input
- **Config changes**: Update `content.yaml` structure, then update TypeScript-style JSDoc comments if adding new fields
- **Styling**: Use existing CSS custom properties (`--accent`, `--background-color`, etc.) for consistency with theme system
- **Tests**: Add corresponding test to appropriate `test-*.js` file when adding utilities/templates/routing logic
