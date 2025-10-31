# Portfolio Website - AI Coding Agent Guide

## What This Is
Modular ES6 SPA with Microtastic build system. Content in YAML + markdown. Modules in `app/src/`.

## Architecture
- **Templating**: Tagged literals (`html\`...\``) with auto-escaping. Use `safe()` for trusted HTML only.
- **Routing**: `?blog`, `?project=id`, `?page=id` via `URLSearchParams` + `handleRoute()`
- **Data**: `getData()` → cached `projectsData` → apply theme → render
- **Search**: Fuse.js fuzzy search (title: 40%, description: 30%, tags: 20%, content: 10% - configurable in `constants.js`)
- **Styling**: CSS custom properties from YAML, Prism.js themes loaded via local CSS (no CDN)
- **Assets**: Fonts and Prism themes auto-generated from npm packages (gitignored)

## Dependencies (ES6 Modules via Microtastic)
- **marked.js v11.1.1** - Markdown (ESM import, call `initializeMarked()` first)
- **Prism.js v1.30.0** - Syntax highlighting (ESM import + local themes in `app/css/prism-themes/`)
- **yamljs v0.3.0** - YAML parsing (ESM import)
- **Fuse.js v7.0.0** - Fuzzy search (ESM import)
- **Font Awesome** - Icons (solid + brands, bundled locally from npm to `app/fonts/`)
- **Raleway** - Typography (400, 600, 700, bundled locally via @fontsource to `app/fonts/`)

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
- Blog: `app/data/blog/YYYY-MM-DD-slug.md` + frontmatter
- Pages: `app/data/pages/{id}.md` (no frontmatter)
- Projects: YAML with `github_repo: "user/repo"` to auto-fetch README

### Comments (giscus)
```javascript
Templates.giscusComments(data?.site?.comments, "blog"|"projects")
// Returns empty if disabled; setTimeout injects script after DOM update
```

## Common Gotchas
1. `getData()` cached - always await before use
2. Prism themes loaded via `<link>` in index.html, languages loaded dynamically from CDN
3. Dropdowns use custom logic, not Bootstrap
4. READMEs lazy-load via `data-repo` attributes
5. `i18n.t(key)` falls back to key if missing
6. Email obfuscation via `window.Email` onclick handler
7. All magic numbers go in `CONSTANTS` (timeouts, search weights, breakpoints, etc.)
8. `app/fonts/` and `app/css/prism-themes/` are gitignored - run `npm run copy-assets` to regenerate

## Development
```bash
npm install          # Install dependencies
npm run prepare      # Copy assets (fonts, Prism themes) + bundle dependencies
npm run copy-assets  # Manually copy fonts and Prism themes from node_modules
npm run dev          # Microtastic dev server (http://localhost:8081)
npm run prod         # Production build → public/ (runs linting first)
npm run format       # Format code with Biome
npm run check        # Lint with Biome
```

**Quality gate**: Changes must pass `biome check`. Always run `npm run prepare` after fresh install.

## File Structure
- `app/src/main.js` - entry point with ES6 imports
- `app/src/constants.js` - configuration constants (timeouts, search weights, breakpoints)
- `app/src/utils.js` - DOM utilities and HTML templating
- `app/src/i18n.js` - internationalization
- `app/src/templates.js` - HTML template functions
- `app/src/data.js` - data loading and color theming
- `app/src/ui.js` - UI interactions and dropdowns
- `app/src/routing.js` - SPA routing system
- `app/src/search.js` - Fuse.js search implementation
- `app/src/markdown.js` - markdown loading and parsing
- `app/src/prism-loader.js` - dynamic Prism language loading
- `app/src/dependencies/` - bundled npm packages (auto-generated)
- `app/data/content.yaml` - content + config
- `app/data/pages/` - markdown page files
- `app/data/blog/` - markdown blog posts
- `app/css/main.css` - styles (CSS custom properties for theming)
- `app/css/prism-themes/` - syntax highlighting themes (auto-generated, gitignored)
- `app/fonts/` - web fonts (auto-generated, gitignored)
- `public/` - production build output (gitignored)

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
