# GitHub Copilot Instructions

## Project: Portfolio Website (ES6 Modules SPA)

This is a modern portfolio website built with vanilla JavaScript (ES6 modules), Microtastic build tooling, and minimal dependencies.

### Key Architecture Principles

1. **ES6 Modules**: All code organized in modular files under `app/src/`
2. **Template Literals**: Use `html\`...\`` tagged templates for secure HTML generation (auto-escaping)
3. **Security**: Only use `${safe(trustedHtml)}` for trusted, internal HTML strings
4. **Routing**: SPA routing with URLSearchParams (`?blog`, `?project=id`, `?page=id`)
5. **Constants**: All magic numbers go in `CONSTANTS` object in `constants.js`
6. **i18n**: Use `i18n.t('key')` for all user-facing strings

### Quality Requirements

Before any build or deployment, ALL of the following must pass:

1. **Code Formatting**: `npm run format`
   - Uses Biome for consistent code style
   
2. **Linting**: `npm run check`
   - Uses Biome to catch errors and enforce code quality
   
3. **Tests**: `npm test`
   - 34 unit tests covering:
     - HTML escaping and template functions (`tests/utils.test.js`)
     - All template generation (`tests/templates.test.js`)
     - Search functionality (`tests/search.test.js`)
     - Constants validation (`tests/constants.test.js`)
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

- `app/src/main.js` - Entry point, initialization, exports globals
- `app/src/constants.js` - Configuration constants
- `app/src/utils.js` - HTML escaping, safe(), html\`\`, DOM helpers
- `app/src/templates.js` - All template functions
- `app/src/routing.js` - SPA routing, page navigation orchestration
- `app/src/router-events.js` - Routing event system for decoupled navigation
- `app/src/loaders.js` - Content loaders (blog, projects, pages)
- `app/src/layout.js` - Navbar and footer rendering
- `app/src/search.js` - Fuse.js search implementation with UI
- `app/src/ui.js` - UI interactions, mobile menu, dropdowns
- `app/src/context.js` - Application context, data loading, theming
- `app/src/markdown.js` - Markdown loading and rendering
- `app/src/prism-loader.js` - Syntax highlighting, dynamic language loading from CDN
- `app/src/i18n.js` - Internationalization framework

### Don't

- ❌ Don't introduce heavy frameworks or build tools
- ❌ Don't concatenate raw HTML strings (use `html\`\`` templates)
- ❌ Don't bypass escaping without `safe()`
- ❌ Don't use hash routing (use URLSearchParams)
- ❌ Don't skip tests or linting before committing
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
