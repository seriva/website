# GitHub Copilot Instructions

## Project: Portfolio Website (ES6 Modules SPA)

This is a modern portfolio website built with vanilla JavaScript (ES6 modules), Microtastic build tooling, and minimal dependencies.

### Key Architecture Principles

1. **ES6 Modules**: All code organized in modular files under `app/src/`
2. **Reactive System**: Use `reactive.js` for all interactive components and state management
   - Create components with `Reactive.Component` base class for full-featured components
   - Use `Reactive.createComponent()` for lightweight component contexts
   - Signals for reactive state: `this.signal(value)` or `Signals.create(value)`
   - Computed values: `this.computed(() => ...)` or `Signals.computed(() => ...)`
   - Batch updates for multiple changes: `this.batch(() => ...)` or `Signals.batch(() => ...)`
   - Declarative binding in templates:
     - `data-text` - bind text content
     - `data-html` - bind HTML content (auto-escapes unless using `safe()`)
     - `data-attr-*` - bind attributes
     - `data-class-*` - toggle classes
     - `data-bool-*` - toggle boolean attributes (checked, disabled, etc.)
     - `data-model` - two-way binding for inputs
     - `data-on-click`, `data-on-submit` - event handlers (auto-batched)
   - Prefer reactive.js for all interactive features - it provides consistency and maintainability
3. **Namespace Pattern**: Use object exports for grouping related functions
   - Export single object per module: `export const ModuleName = { method1() {}, method2() {} }`
   - Example: `Context.get()`, `Loaders.loadBlogPage()`, `Templates.errorMessage()`
   - All non-component modules follow this pattern consistently
   - **Method Organization**: Within namespace objects and components, organize methods in this order:
     1. **Public methods first** (called from other modules or templates)
     2. **Private methods last** (internal use only) at the bottom with `_` prefix
   - Private method naming: Always prefix with underscore `_privateMethod()`
   - **Component Structure**: For `Reactive.Component` classes:
     1. Constructor and lifecycle methods first
     2. `state()` method defining reactive state (signals, computed values)
     3. `template()` method returning HTML
     4. Public methods next (called from templates or other components)
     5. Private methods last with `_` prefix (internal logic)
4. **Template Literals**: Use `html\`...\`` tagged templates for secure HTML generation (auto-escaping)
4. **Security**: Only use `${safe(trustedHtml)}` for trusted, internal HTML strings
5. **Routing**: SPA routing with URLSearchParams (`?blog`, `?project=id`, `?page=id`)
6. **Constants**: All magic numbers go in `CONSTANTS` object in `constants.js`
7. **i18n (Internationalization)**: 
   - **ALWAYS** use `i18n.t('key')` for ALL user-facing text (labels, titles, messages, placeholders, aria-labels, tooltips)
   - **NEVER** hardcode user-facing strings in templates or code
   - Add new translation keys to `app/data/content.yaml` under `translations.en`
   - Examples: `i18n.t('aria.toggleTheme')`, `i18n.t('contact.title')`, `i18n.t('search.placeholder')`

### Quality Requirements

Before any build or deployment, ALL of the following must pass:

1. **Code Formatting**: `npm run format`
   - Uses Biome for consistent code style
   
2. **Linting**: `npm run check`
   - Uses Biome to catch errors and enforce code quality
   
3. **Tests**: `npm test`
   - 122 unit tests covering:
     - Reactive system (signals, computed, batching, components) (`tests/reactive.test.js`)
     - HTML escaping and template utilities (`tests/template-utils.test.js`)
     - Template generation (`tests/templates.test.js`)
     - Search functionality (`tests/search.test.js`)
     - YAML parser (`tests/yaml-parser.test.js`)
     - Routing logic (`tests/routing.test.js`)
     - Markdown parsing (`tests/markdown.test.js`)
     - Internationalization (`tests/i18n.test.js`)
     - Theme management (`tests/theme.test.js`)
     - Email controller (`tests/email.test.js`)
     - Error handler (`tests/error-handler.test.js`)
     - UI utilities (`tests/ui.test.js`)
     - Prism loader (`tests/prism-loader.test.js`)
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

**Core Module**:
- `app/src/reactive.js` - `Reactive` namespace + `Signals` for reactive state management, components, and declarative binding

**Namespace Pattern Modules** (export single object):
- `app/src/context.js` - `Context` namespace for app state, data loading, theming
- `app/src/routing.js` - `Router` namespace for SPA routing, page navigation
- `app/src/loaders.js` - `Loaders` namespace for content loaders (blog, projects, pages)
- `app/src/templates.js` - `Templates` namespace for HTML utilities and template functions
- `app/src/yaml-parser.js` - `YAMLParser` namespace for minimal YAML parser
- `app/src/markdown.js` - `MarkdownLoader` namespace for markdown loading
- `app/src/prism-loader.js` - `PrismLoader` namespace for syntax highlighting
- `app/src/i18n.js` - `i18n` namespace for internationalization
- `app/src/constants.js` - `CONSTANTS` object for configuration

**Reactive Components** (extend `Reactive.Component`):
- `app/src/navbar.js` - `NavbarController` component for navbar rendering
- `app/src/footer.js` - `FooterController` component for footer rendering
- `app/src/search.js` - `SearchController` component for Fuse.js search implementation
- `app/src/email.js` - `EmailController` component for EmailJS contact form integration
- `app/src/theme.js` - `ThemeController` component for theme management
- `app/src/blog.js` - `BlogListController`, `BlogPostController` for blog pages
- `app/src/project.js` - `ProjectController` for project detail pages
- `app/src/page.js` - `PageController` for custom markdown pages

**Other Modules**:
- `app/src/main.js` - Entry point, initialization
- `app/src/error-handler.js` - `ErrorHandler` for global error handling
- `app/src/dependencies/` - Bundled npm packages (Fuse.js, Marked, Prism, EmailJS)

### Don't

- ❌ Don't introduce heavy frameworks or build tools
- ❌ Don't concatenate raw HTML strings (use `html\`\`` templates)
- ❌ Don't bypass escaping without `safe()`
- ❌ Don't use hash routing (use URLSearchParams)
- ❌ Don't skip tests or linting before committing
- ❌ Don't export individual functions from modules (use namespace pattern instead)
- ❌ Don't create new modules without following the namespace pattern
- ❌ Don't modify Microtastic config without good reason
- ❌ Don't create interactive components without using reactive.js
- ❌ Don't put private methods before public methods (always: public first, private last with `_` prefix)

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
