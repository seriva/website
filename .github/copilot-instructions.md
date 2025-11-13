# GitHub Copilot Instructions

## Project: Portfolio Website (ES6 Modules SPA)

This is a modern portfolio website built with vanilla JavaScript (ES6 modules), Microtastic build tooling, and minimal dependencies.

### Key Architecture Principles

1. **ES6 Modules**: All code organized in modular files under `app/src/`
2. **Namespace Pattern**: Use object exports for grouping related functions
   - Export single object per module: `export const ModuleName = { method1() {}, method2() {} }`
   - Example: `UI.closeMobileMenu()`, `Context.get()`, `Loaders.loadBlogPage()`
   - All modules follow this pattern consistently
3. **Template Literals**: Use `html\`...\`` tagged templates for secure HTML generation (auto-escaping)
4. **Security**: Only use `${safe(trustedHtml)}` for trusted, internal HTML strings
5. **Routing**: SPA routing with URLSearchParams (`?blog`, `?project=id`, `?page=id`)
6. **Constants**: All magic numbers go in `CONSTANTS` object in `constants.js`
7. **i18n**: Use `i18n.t('key')` for all user-facing strings

### Quality Requirements

Before any build or deployment, ALL of the following must pass:

1. **Code Formatting**: `npm run format`
   - Uses Biome for consistent code style
   
2. **Linting**: `npm run check`
   - Uses Biome to catch errors and enforce code quality
   
3. **Tests**: `npm test`
   - 65 unit tests covering:
     - HTML escaping and template utilities (`tests/template-utils.test.js`)
     - All template generation (`tests/templates.test.js`)
     - Search functionality (`tests/search.test.js`)
     - YAML parser (`tests/yaml-parser.test.js`)
     - Routing logic (`tests/routing.test.js`)
     - Markdown parsing (`tests/markdown.test.js`)
     - Marked.js configuration (`tests/marked.test.js`)
     - Internationalization (`tests/i18n.test.js`)
   - Uses Node.js built-in test runner (zero test framework dependencies)
   - All tests MUST pass before merging or deploying

4. **Production Build**: `npm run prod`
   - Automatically runs linting → tests → build
   - Will fail if any step fails

### Testing Guidelines

- **When to write tests**: Add tests when creating new utility functions, templates, or core logic
- **Test location**: Place in `tests/` directory with `.test.js` extension
- **Test framework**: Use Node.js built-in `node:test` module
- **DOM testing**: jsdom is available via `tests/setup.js`
- **Run tests**: `npm test`

**Example test structure:**
```javascript
import { describe, test } from "node:test";
import assert from "node:assert/strict";

describe("My Module", () => {
  test("should do something", () => {
    assert.equal(1 + 1, 2);
  });
});
```

### Module Organization

**Namespace Pattern Modules** (export single object):
- `app/src/ui.js` - `UI` namespace for UI interactions, mobile menu, dropdowns
- `app/src/loaders.js` - `Loaders` namespace for content loaders (blog, projects, pages)
- `app/src/context.js` - `Context` namespace for app state, data loading, theming
- `app/src/routing.js` - `Router` namespace for SPA routing, page navigation
- `app/src/layout.js` - `Layout` namespace for navbar and footer rendering
- `app/src/router-events.js` - `RouterEvents` namespace for routing event system
- `app/src/templates.js` - `Templates` namespace for HTML utilities and template functions
- `app/src/search.js` - `Search` namespace for Fuse.js search implementation
- `app/src/email.js` - `Email` namespace for EmailJS contact form integration
- `app/src/yaml-parser.js` - `YAMLParser` namespace for minimal YAML parser
- `app/src/markdown.js` - `MarkdownLoader` namespace for markdown loading
- `app/src/prism-loader.js` - `PrismLoader` namespace for syntax highlighting
- `app/src/i18n.js` - `i18n` namespace for internationalization
- `app/src/constants.js` - `CONSTANTS` object for configuration

**Other Modules**:
- `app/src/main.js` - Entry point, initialization
- `app/src/dependencies/` - Bundled npm packages (Fuse.js, Marked, Prism)

### Don't

- ❌ Don't introduce heavy frameworks or build tools
- ❌ Don't concatenate raw HTML strings (use `html\`\`` templates)
- ❌ Don't bypass escaping without `safe()`
- ❌ Don't use hash routing (use URLSearchParams)
- ❌ Don't skip tests or linting before committing
- ❌ Don't export individual functions from modules (use namespace pattern instead)
- ❌ Don't create new modules without following the namespace pattern
- ❌ Don't modify Microtastic config without good reason

### Development Workflow

1. Make changes to code
2. Run `npm run format` to format code
3. Run `npm run check` to lint
4. Run `npm test` to verify tests pass
5. Run `npm run dev` to test locally
6. Run `npm run prod` before committing (runs all quality checks)

### Build Output

- Development: `npm run dev` (dev server on port 8081)
- Production: `npm run prod` (outputs to `public/` directory)

See `.cursorrules` and `README.md` for complete documentation.
