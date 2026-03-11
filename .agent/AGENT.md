# Portfolio Website — Antigravity Agent File

## Project Overview
This is a modern, modular personal portfolio website built with vanilla JavaScript (ES6 modules) and a custom reactive system. It uses Microtastic for minimal build tooling and a dev server, and relies on YAML and Markdown for content management.

## Tech Stack
- **Language**: ES6 Modules (Vanilla JS)
- **UI / Reactivity**: Custom signals-based reactive system (`utils/reactive.js`), declarative DOM binding
- **Routing**: Path-based SPA routing with Microtastic support
- **Content**: YAML parsing + Marked.js + Prism.js (Markdown)
- **Search**: Fuse.js (Fuzzy search)
- **Features**: EmailJS (Contact form), giscus (GitHub Discussions comments)
- **Build / Dev**: Microtastic (`npm run dev`, `npm run prod`)
- **Linting / Formatting**: Biome (`npm run format`, `npm run check`)
- **Testing**: Node.js built-in test runner (`npm test`)

## Project Structure
```text
app/
├── data/
│   ├── blog/          # Markdown blog posts
│   ├── pages/         # Markdown pages
│   └── content.yaml   # Core site configuration, projects, i18n
├── fonts/             # Hosted locally (auto-copied via prepare)
├── css/
│   └── prism-themes/  # Bundled Prism themes
└── src/
    ├── main.js        # Entry point and global event delegation
    ├── components/    # Reactive UI components (Navbar, BlogList, Project, etc)
    ├── styles/        # CSS-in-JS style definitions
    └── utils/         # Core utilities (reactive.js, Router, MarkdownLoader)
scripts/
└── generate-seo.js    # SEO generator script
tests/                 # Node.js tests for all modules
```

## Key Conventions & Patterns
- **No TypeScript or Virtual DOM**: Pure ES6 modules with direct DOM manipulation via the custom reactive signal system.
- **Reactivity**: Extend `Reactive.Component`. Use `this.signal()` and `this.computed()` in `state()`. Declare bindings in `template()` using `data-text`, `data-class-*`, `data-on-click`, etc.
- **Data Configuration**: All site content (projects, blog metadata, theme settings) lives in `app/data/content.yaml`.
- **Absolute / Root-Relative Paths**: Always use root-relative paths for modules (`/src/main.js`) so the SPA routing handles them correctly on any depth.
- **Event Delegation**: Centralize global interactions in `main.js` using `data-action` attributes instead of attaching standard event listeners everywhere.
- **Lint & Format**: Always run `npm run format` and `npm run check` using Biome.
- **Tests**: Core logic must have tests inside `/tests/`. Tests use the native Node.js test runner. Ensure `npm test` passes before pushing.

## Naming Conventions
- **Classes / Components**: PascalCase (e.g., `MarkdownLoader`, `ContactForm`)
- **Functions / variables**: camelCase
- **Private class fields**: Prefix with `#` (e.g., `#config`, `#compiler`)
- **Style Files**: `[component/module].styles.js`

## Commands
```bash
npm run dev        # Run Microtastic dev server on port 8081
npm run prod       # Run checks, tests, and build for production
npm test           # Run unit tests
npm run check      # Lint with Biome
npm run format     # Format with Biome
npm run prepare    # Install Husky hooks and run microtastic prep
```

## Workflows
The `.agent/workflows/` directory contains standard operating procedures.
- **/verify**: Run `npm run format`, `npm run check`, `npm test` and `npm run prod` to ensure codebase health before finishing a task.
