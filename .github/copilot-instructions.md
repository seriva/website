# Portfolio Website - AI Coding Agent Guide

## What This Is
Vanilla JS SPA (~1600 LOC). No build tools. Content in YAML + markdown. Everything in `www/js/main.js`.

## Architecture
- **Templating**: Tagged literals (`html\`...\``) with auto-escaping. Use `safe()` for trusted HTML only.
- **Routing**: `?blog`, `?project=id`, `?page=id` via `URLSearchParams` + `handleRoute()`
- **Data**: `getData()` → cached `projectsData` → apply theme → render
- **Search**: Fuse.js fuzzy search (title: 2.0, description: 1.5, tags: 1.2, content: 0.5)
- **Styling**: CSS custom properties from YAML, Prism.js for syntax highlighting

## Dependencies (CDN via jsDelivr)
- **marked.js v11.1.1** - Markdown (call `initializeMarked()` first)
- **Prism.js v1.30.0** - Syntax highlighting (autoloader + dynamic themes)
- **yamljs v0.3.0** - YAML parsing
- **Fuse.js v7.0.0** - Fuzzy search
- **Font Awesome** - Icons (solid + brands)
- **Raleway** - Typography (400, 600, 700)

## Key Patterns

### Templates
```javascript
Templates.myTemplate = (args) => html`<div>${userInput}</div>` // auto-escapes
${safe(trustedHtml)} // only for internal HTML
```

### Routing
```javascript
// Always in route handlers:
closeMobileMenu();
setDocumentTitle(data);
```

### Content
- Blog: `www/data/blog/YYYY-MM-DD-slug.md` + frontmatter
- Pages: `www/data/pages/{id}.md` (no frontmatter)
- Projects: YAML with `github_repo: "user/repo"` to auto-fetch README

### Comments (giscus)
```javascript
Templates.giscusComments(data?.site?.comments, "blog"|"projects")
// Returns empty if disabled; setTimeout injects script after DOM update
```

## Common Gotchas
1. `getData()` cached - always await before use
2. `applyPrismTheme()` must run before code blocks render
3. Dropdowns use custom logic, not Bootstrap
4. READMEs lazy-load via `data-repo` attributes
5. `i18n.t(key)` falls back to key if missing
6. Email obfuscation via `window.Email` onclick handler
7. All magic numbers go in `CONSTANTS`

## Development
```bash
cd www && darkhttpd . --port 8081  # dev server
biome format --write .              # format
biome check .                       # lint
open tests.html                     # tests
```

**Quality gate**: Changes must pass `biome check` + all QUnit tests.

## File Structure
- `www/js/main.js` - entire app (CONSTANTS → UTILITY → TEMPLATES → ROUTING → SEARCH)
- `www/data/content.yaml` - content + config
- `www/css/main.css` - styles (CSS custom properties for theming)
- `www/tests/` - QUnit unit tests

## Security
- XSS: Always use `html\`...\`` for user/external content
- Never concatenate HTML outside tagged templates
- Optional chaining for missing data: `data?.site?.title ?? "default"`
- Try/catch all fetch operations

## When Modifying
- Keep functions in appropriate sections in `main.js`
- Add tests to `www/tests/test-*.js` files
- Use existing CSS custom properties for consistency
- Update `CONSTANTS` for any magic numbers
- Update `README.md` if adding features or changing configuration/setup
