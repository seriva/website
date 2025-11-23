# GitHub Copilot Instructions

## Project: Portfolio Website (ES6 Modules SPA)

This is a modern portfolio website built with vanilla JavaScript (ES6 modules), Microtastic build tooling, and minimal dependencies.

### Key Architecture Principles

1. **ES6 Modules**: All code organized in modular files under `app/src/`
2. **Component Naming**: Components extending `Reactive.Component` use simple names (e.g., `Navbar`, `Search`, `ContactForm`), not `*Controller` suffix
3. **Reactive System**: Use `reactive.js` for all interactive components and state management
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
4. **Namespace Pattern**: Use object exports for grouping related functions
   - Export single object per module: `export const ModuleName = { method1() {}, method2() {} }`
   - Example: `Context.get()`, `Context.getBlogPosts()`, `Templates.errorMessage()`
   - All non-component modules follow this pattern consistently
   - **Method Organization**: Within namespace objects and components, organize methods in this order:
     1. **Public methods first** (called from other modules or templates)
     2. **Private methods last** (internal use only) at the bottom with `_` prefix
   - Private method naming: Always prefix with underscore `_privateMethod()`
   - **Component Structure**: For `Reactive.Component` classes:
     1. Constructor first
     2. `mount()` lifecycle hook for post-render initialization (data loading, event listeners)
     3. `state()` method defining reactive state (signals, computed values)
     4. `template()` method returning HTML
     5. Public methods next (called from templates or other components)
     6. Private methods last with `_` prefix (internal logic)
5. **Template Literals**: Use `html\`...\`` tagged templates for secure HTML generation (auto-escaping)
6. **Security**: Only use `${safe(trustedHtml)}` for trusted, internal HTML strings
7. **Routing**: SPA routing with URLSearchParams (`?blog`, `?project=id`, `?page=id`)
8. **Constants**: All magic numbers go in `CONSTANTS` object in `constants.js`
9. **i18n (Internationalization)**: 
   - **ALWAYS** use `i18n.t('key')` for ALL user-facing text (labels, titles, messages, placeholders, aria-labels, tooltips)
   - **NEVER** hardcode user-facing strings in templates or code
   - Add new translation keys to `app/data/content.yaml` under `translations.en`
   - Examples: `i18n.t('aria.toggleTheme')`, `i18n.t('contact.title')`, `i18n.t('search.placeholder')`
10. **CSS Architecture**:
    - **CSS-in-JS**: Use `css` tagged template literals from `utils/reactive.js`
    - **Component Styles**: Defined in `[component].styles.js` files (e.g., `navbar.styles.js`)
    - **Global Styles**: Defined in `app/src/styles/` directory:
      - `reset.styles.js` - global CSS reset
      - `shared.styles.js` - shared utility styles
      - `theme.styles.js` - CSS variable definitions
      - `fonts.styles.js` - font loading
      - `main.styles.js` - main application styles
    - **Service Styles**: `app/src/services/markdown.styles.js` for markdown content styles
    - **No CSS Files**: Avoid creating `.css` files (except for `prism-themes/` which are auto-generated)

### Quality Requirements

Before any build or deployment, ALL of the following must pass:

1. **Code Formatting**: `npm run format`
   - Uses Biome for consistent code style
   
2. **Linting**: `npm run check`
   - Uses Biome to catch errors and enforce code quality
   
3. **Tests**: `npm test`
   - 81 unit tests covering:
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
- `app/src/utils/reactive.js` - `Reactive` namespace + `Signals` for reactive state management, components, and declarative binding

**Namespace Pattern Modules** (export single object):
- `app/src/services/context.js` - `Context` namespace for app state, data loading, blog post utilities
- `app/src/services/routing.js` - `Router` namespace for SPA routing, page navigation
- `app/src/utils/templates.js` - `Templates` namespace for HTML utilities and template functions
- `app/src/utils/yaml-parser.js` - `YAMLParser` namespace for minimal YAML parser
- `app/src/services/markdown.js` - `MarkdownLoader` namespace for markdown loading
- `app/src/services/prism-loader.js` - `PrismLoader` namespace for syntax highlighting
- `app/src/services/i18n.js` - `i18n` namespace for internationalization
- `app/src/utils/constants.js` - `CONSTANTS` object for configuration

**Reactive Components** (extend `Reactive.Component`):
- `app/src/components/main-content.js` - `MainContent` component for main content container
- `app/src/components/navbar.js` - `Navbar` component for navbar rendering
- `app/src/components/footer.js` - `Footer` component for footer rendering
- `app/src/components/search.js` - `Search` component for Fuse.js search (conditionally initialized)
- `app/src/components/email.js` - `ContactForm` component for EmailJS contact form (conditionally initialized)
- `app/src/services/theme.js` - `ThemeManager` component (exported as `Theme`) for theme management
- `app/src/components/blog-list.js` - `BlogList` for blog listing pages
- `app/src/components/blog-post.js` - `BlogPost` for blog post detail pages
- `app/src/components/project.js` - `Project` for project detail pages
- `app/src/components/page.js` - `Page` for custom markdown pages

**Other Modules**:
- `app/src/main.js` - Entry point, initialization
- `app/src/services/error-handler.js` - `ErrorHandler` for global error handling
- `app/src/dependencies/` - Bundled npm packages (Fuse.js, Marked, Prism, EmailJS)

### Component Initialization

- Components are initialized in `main.js` after Context.init() loads data
- Conditional initialization:
  - `Search`: only if `data?.site?.search?.enabled`
  - `ContactForm`: only if `data?.site?.emailjs?.enabled`
- Core components (`MainContent`, `Navbar`, `Footer`, `Theme`) always initialize
- Components are self-contained:
  - Each component loads its own data in `mount()` lifecycle hook
  - `mount()` runs after component is rendered to DOM
  - Use `this.on(target, event, handler)` for auto-tracked event listeners
  - Data loading moved from central Loaders module into individual components
- Interactive components use reactive.js features:
  - Declarative event binding with `data-on-click`
  - Two-way binding with `data-model`
  - Reactive state with signals and computed values
  - Automatic batching for event handlers

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
