## About

Personal portfolio website built with [GoFront](https://github.com/seriva/gofront) v1.1.0 using `.templ` component architecture. Content managed through YAML configuration and markdown files.

**Key Features:** GoFront templ components • Path-based SPA routing • Markdown blog & pages • Fuzzy search (Fuse.js) • Light/Dark themes • GitHub integration • Optional comments (giscus) & contact form (EmailJS)

## Tech Stack

- **Core**: GoFront v1.1.0 (`.templ` components, Go-inspired frontend architecture)
- **Build**: `gofront prep` & `gofront src -o ...` • Biome (lint/format) • Playwright (10 E2E suites)
- **Content**: YAML config + Markdown • Pure GoFront YAML parser • Marked.js • Prism.js v1.30
- **Features**: Fuse.js (search) • EmailJS (contact form) • giscus (comments)
- **Assets**: Raleway fonts • Inline SVG icons (local, no CDNs)

## Architecture

The application is written in GoFront under `src/` and compiles to native JavaScript ES modules:

**Key Modules:**
- **Source (`src/`)**: `main.go` (init, global event delegation) • `store.go` (state, data, YAML parsing) • `router.go` (SPA routing) • `theme.go` (theme persistence & CSS variables) • `markdown.go` (markdown & code highlighting) • `search.go` (Fuse.js search) • `email.go` (EmailJS integration) • `styles.go` (global CSS)
- **Components (`src/*.templ`)**: `app.templ` • `navbar.templ` • `blog.templ` • `projects.templ` • `page.templ` • `footer.templ` • `search.templ` • `contact.templ` • `icons.templ`

## Development

**Prerequisites:** Node.js >= 24.0.0, npm >= 11.0.0

## Getting Started

```bash
npm install        # Install dependencies
npm run prepare    # Bundle fonts, themes, dependencies
npm run dev        # Start dev server (http://localhost:8181)
```

Open `http://localhost:8181` in your browser.

### Build for Production

To create an optimized production build:

```bash
npm run prod
```

This will:
- Run code quality checks (`biome check`)
- Run all tests (91 unit tests)
- Copy assets (fonts, Prism themes) from node_modules
- Bundle and minify dependencies
- Output to `public/` directory

### Asset Copying

Fonts and Prism themes are automatically copied from npm packages when you run `npm run prepare`. The `assetCopy` configuration in `package.json` defines which assets to copy.

Note: `app/fonts/` and `app/css/prism-themes/` are gitignored as they're auto-generated from npm packages.

### Code Quality Tools

The project uses Biome for code formatting and linting:

- **Format code**: `npm run format`
- **Check code quality**: `npm run check`
- **Auto-format**: Enabled on save in VS Code

All code changes must pass linting before deployment.

### Testing

Uses Node.js built-in test runner (91 tests):

```bash
npm run test:unit    # Run unit tests
npm run test:e2e     # Run E2E tests (requires dev server)
npm run test:all     # Run all tests
```

Tests cover:
- Reactive system (signals, computed, batching, components)
- HTML escaping and template utilities
- Template generation
- Search functionality
- YAML parser
- Routing logic
- Markdown parsing
- Internationalization
- Theme management
- Email controller
- Error handler
- UI utilities
- Prism loader

All tests must pass before production builds.

## Reactive System

Custom signals-based reactive system (~5KB) with declarative binding:

```javascript
export class Counter extends Reactive.Component {
  state() {
    return {
      count: this.signal(0),
      doubled: this.computed(() => this.count() * 2),
    };
  }
  template() {
    return html`<button data-on-click="increment" data-text="count"></button>`;
  }
  increment() { this.count(this.count() + 1); }
}
```

**Declarative Bindings:** `data-text`, `data-html`, `data-attr-*`, `data-class-*`, `data-bool-*`, `data-visible`, `data-model`, `data-on-click/submit`

**Benefits:** Direct DOM updates • Auto-batching • Computed values • No virtual DOM • No build step required

## Routing & SPA Support

**Path-based URLs:** `/`, `/blog/`, `/blog/post-slug`, `/project/id`, `/page/id`

**Dev Server:** Microtastic modified (`node_modules/microtastic/index.js`) to serve `index.html` for routes without extensions, maintains hot reload

**GitHub Pages:** Custom `404.html` redirects via hash (`#!redirect=<path>`), `main.js` restores clean URL with `history.replaceState()`

**Absolute Paths:** All resources use root-relative paths (`/src/main.js`, `/data/content.yaml`) to work from any route depth

**Event Delegation:** Dynamic content uses `data-action` attributes (e.g., `<a data-action="email">`) handled globally in `main.js`

## Features & Configuration

All content is managed through `app/data/content.yaml`. The configuration file supports:

### Projects

```yaml
projects:
  - id: "my-project"
    title: "Cool Project"
    tags: ["JavaScript"]
    order: 1
    github_repo: "my-project"  # Auto-loads README
    demo_url: "https://example.com"
    youtube_videos: ["videoId"]
    links:
      - title: "GitHub"
        icon: "github"
        href: "https://github.com/user/repo"
```

**Features:** Auto-load GitHub READMEs • YouTube embeds • SVG icons • Tag organization

### Blog

Create posts in `app/data/blog/` with frontmatter (title, date, excerpt, tags), register in `content.yaml`:

```yaml
blog:
  postsPerPage: 5
  posts:
    - filename: "2025-10-21-post-title.md"
      title: "Post Title"
      date: "2025-10-21"
      excerpt: "Summary"
      tags: ["tag1"]
```

**Features:** GFM markdown • Syntax highlighting • Pagination • Auto-sorting • Tags

### Search

Fuse.js fuzzy search across projects and blog posts (conditionally loaded):

```yaml
site:
  search:
    enabled: true
    minChars: 2
```

**Features:** Fuzzy matching • Weighted results (title 40%, desc 30%, tags 20%, content 10%) • Clickable tag filters • Real-time with debounce • Up to 8 results • Offline support

### Pages

Create markdown files in `app/data/pages/`, configure in `content.yaml`:

```yaml
pages:
  about:
    title: "About"
    showInNav: true
    order: 1
```

### Theme (Light/Dark Mode)

Toggle button with localStorage persistence, system preference support:

```yaml
site:
  theme:
    default: "dark"  # "dark", "light", "auto"
    dark:
      primary: "#10B981"
      code:
        theme: "prism-tomorrow"
    light:
      primary: "#047857"
      code:
        theme: "prism-coy"
```

Prism themes: `prism-tomorrow`, `prism-okaidia`, `prism-dark`, `prism-coy`, `prism-solarizedlight` (bundled locally)

### Comments (giscus)

GitHub Discussions-powered comments via [giscus](https://giscus.app):

```yaml
site:
  comments:
    blogEnabled: true
    projectsEnabled: true
    repo: "username/repo"
    repoId: "R_YOUR_REPO_ID"
    categoryId: "DIC_YOUR_CATEGORY_ID"
```

**Setup:** Enable Discussions on repo → Install giscus app → Get IDs from giscus.app

### Contact Form (EmailJS)

Modal form with email delivery (conditionally loaded):

```yaml
site:
  emailjs:
    enabled: true
    serviceId: "service_xxx"
    templateId: "template_xxx"
    publicKey: "your_public_key"
```

**Setup:** Sign up at emailjs.com → Create service/template with variables `{{title}}`, `{{name}}`, `{{email}}`, `{{time}}`, `{{message}}`

### Internationalization (i18n)

Built-in i18n framework (currently English only):

```yaml
site:
  i18n:
    defaultLanguage: "en"
    availableLanguages: ["en"]

translations:
  en:
    "nav.projects": "Projects"
    "search.placeholder": "Search..."
    # ... more translations
```

**To add a language:** Add to `availableLanguages` (`["en", "nl"]`), copy `en` translations and translate values, use `i18n.setLanguage('nl')` to switch
