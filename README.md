## About

Personal portfolio website built with vanilla JavaScript (ES6 modules), custom reactive system, and [Microtastic](https://github.com/scriptex/microtastic) for minimal build tooling. Content managed through YAML configuration and markdown files.

**Key Features:** Reactive UI with signals • Path-based SPA routing • Markdown blog & pages • Fuzzy search (Fuse.js) • Light/Dark themes • GitHub integration • Optional comments (giscus) & contact form (EmailJS)

## Tech Stack

- **Core**: Vanilla HTML/CSS/JS (ES6 modules) • Custom reactive system (signals, computed, declarative binding)
- **Build**: Microtastic (SPA dev server) • Biome 2.3.6 (lint/format) • Node.js test runner (122 tests)
- **Content**: YAML config + Markdown • Custom YAML parser (~4KB) • Marked.js v17 • Prism.js v1.30
- **Features**: Fuse.js 7.1 (search) • EmailJS (contact form) • giscus (comments)
- **Assets**: Raleway fonts • Font Awesome subset (local, no CDNs)

## Architecture

The application follows a modular namespace pattern with reactive components:

```text
                 ┌────────────────────┐
                 │      main.js       │
                 │   (Init + Events)  │
                 └──────────┬─────────┘
                            │
              ┌─────────────┼─────────────┐
              ▼             ▼             ▼
         ┌──────────┐  ┌──────────┐  ┌──────────┐
         │ Context  │◄─│YAMLParser│  │ Reactive │
         │ (State)  │  │  (Parse) │  │ (System) │
         └─────┬────┘  └──────────┘  └─────┬────┘
               │                           │
               │ provides data             │ powers
               │                           │
    ┌──────────┼──────────┬────────────────┼──────────┐
    ▼          ▼          ▼                ▼          ▼
┌────────┐ ┌─────────┐              ┌─────────┐ ┌────────┐
│ Router │ │  i18n   │              │ Navbar  │ │ Footer │
│(Routes)│ │ (Trans) │              │  (Nav)  │ │        │
└────┬───┘ └─────────┘              └─────────┘ └────────┘
     │                                       
     │    ┌─────────────┬─────────────┬─────────────┐
     │    ▼             ▼             ▼             ▼
     │ ┌──────────┐ ┌──────────┐ ┌─────────┐ ┌──────────┐
     └─│ BlogList │ │ BlogPost │ │ Project │ │   Page   │
       │  (List)  │ │  (Post)  │ │ (Repo)  │ │ (Custom) │
       └──────────┘ └──────────┘ └─────────┘ └──────────┘
            │             │            │           │
            └─────────────┴────────────┴───────────┘
                          │
         ┌────────────────┼────────────────┐
         ▼                ▼                ▼
    ┌──────────┐    ┌──────────┐    ┌──────────┐
    │Templates │    │ Markdown │    │  Prism   │
    │  (HTML)  │    │  Loader  │    │  Loader  │
    └──────────┘    └──────────┘    └──────────┘
         
    Conditional Components:
    ┌─────────┐  ┌─────────────┐  ┌──────────────┐
    │ Search  │  │ ContactForm │  │ThemeManager  │
    │ (Fuse)  │  │  (EmailJS)  │  │   (L/D)      │
    └─────────┘  └─────────────┘  └──────────────┘
```

**Key Modules:**

- **Core**: `main.js` (init, event delegation) • `reactive.js` (signals, components) • `Context` (state, data, blog utilities) • `Router` (SPA routing)
- **Components**: `Navbar`, `Footer`, `BlogList`, `BlogPost`, `Project`, `Page` (self-contained reactive UI - each loads its own data)
- **Features**: `Search` (Fuse.js, conditional) • `ContactForm` (EmailJS, conditional) • `Theme` (light/dark)
- **Utilities**: `Templates` (HTML generation) • `MarkdownLoader` • `PrismLoader` • `YAMLParser` • `i18n`

## Development

**Prerequisites:** Node.js >= 20.0.0, npm >= 9.0.0

**Optional:** VS Code devcontainer (Alpine Linux, port 8081 auto-forwarded)

## Getting Started

```bash
npm install        # Install dependencies
npm run prepare    # Bundle fonts, themes, dependencies
npm run dev        # Start dev server (http://localhost:8081)
```

**Dev Container:** Open in VS Code → "Reopen in Container" → `npm install` → `npm run prepare` → `npm run dev`

4. Open `http://localhost:8081`

### Build for Production

To create an optimized production build:

```bash
npm run prod
```

This will:
- Run code quality checks (`biome check`)
- Run all tests (65 unit tests)
- Copy assets (fonts, Prism themes) from node_modules
- Bundle and minify dependencies
- Output to `public/` directory

### Manual Asset Copying

If you need to manually copy fonts and Prism themes:

```bash
npm run copy-assets
```

Note: `app/fonts/` and `app/css/prism-themes/` are gitignored as they're auto-generated from npm packages.

### Code Quality Tools

The project uses Biome for code formatting and linting:

- **Format code**: `npm run format`
- **Check code quality**: `npm run check`
- **Auto-format**: Enabled on save in VS Code

All code changes must pass linting before deployment.

### Testing

Uses Node.js built-in test runner (122 tests):

```bash
npm test    # Run all tests
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

**Declarative Bindings:** `data-text`, `data-html`, `data-attr-*`, `data-class-*`, `data-bool-*`, `data-model`, `data-on-click/submit`

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
    weight: 1
    github_repo: "my-project"  # Auto-loads README
    demo_url: "https://example.com"
    youtube_videos: ["videoId"]
    links:
      - title: "GitHub"
        icon: "fab fa-github"
        href: "https://github.com/user/repo"
```

**Features:** Auto-load GitHub READMEs • YouTube embeds • Font Awesome icons • Tag organization

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
