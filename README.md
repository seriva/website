## About

This is my personal portfolio website. I originally built it with [Hugo](https://gohugo.io/) and the [seriva/minimal](https://github.com/seriva/minimal-hugo-theme) theme, but wanted more control over the design and functionality, so I rewrote it as a modern single-page application.

It's built with vanilla HTML, CSS, and ES6 modules using [Microtastic](https://github.com/scriptex/microtastic) for minimal build tooling. Content is managed through YAML configuration and markdown files. This new setup was mostly vibe-coded together:)

Key features:
- **Markdown page system** - Create pages as markdown files in `/data/pages/`
- **Markdown blog system** - Blog posts with pagination and metadata
- **YAML configuration** - Easy content management and site settings
- **Fuzzy search** - Fuse.js across projects and blog posts
- **Dynamic color themes** - Customizable color schemes
- **GitHub integration** - Loads project READMEs directly from GitHub
- **Comments system** - GitHub Discussions integration via giscus (optional)
- **Contact form** - EmailJS integration with spam protection (optional)
- **Mobile-friendly** - Responsive design with unified search
- **ES6 modules** - Clean, modular code organization
- **Microtastic build** - Minimal build tooling for dependency bundling

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (ES6 modules)
- **Build Tool**: Microtastic for dependency bundling
- **Styling**: Custom CSS with CSS custom properties
- **Icons**: Font Awesome subset (solid + brands only) - bundled locally
- **Search**: Fuse.js 7.0.0 for fuzzy search
- **Content**: YAML configuration + Markdown files
- **Parsing**: Custom minimal YAML parser (~4KB), Marked.js v11.1.1, Prism.js v1.30.0
- **Fonts**: Raleway (weights 400, 600, 700) - bundled locally via @fontsource
- **Templating**: Tagged template literals for secure HTML
- **Code Quality**: Biome for linting and formatting
- **Assets**: All fonts and syntax themes bundled from npm (no external CDNs)

## Architecture

The application follows a modular namespace pattern with clear separation of concerns:

```text
            ┌─────────────────────┐
            │      main.js        │
            │   (Entry Point)     │
            └──────────┬──────────┘
                       │
                       │
                       ▼
┌──────────┐     ┌──────────┐         ┌─────────────┐
│CONSTANTS │     │ Context  │◄────────│ YAMLParser  │────────┐
│  (Cfg)   │     │ (State)  │         │ (Parse YAML)│        │
└────┬─────┘     └────┬─────┘         └─────────────┘        │
     │                │                                      │
     │                │ provides data                        │
     │                │                                      │
     └──┬─────────────┼──────────┬──────────┬──────────┐     │
        ▼             ▼          ▼          ▼          ▼     │
   ┌─────────┐  ┌────────┐ ┌────────┐ ┌────────┐ ┌─────────┐ │
   │ Router  │  │ Layout │ │ Search │ │Loaders │ │  i18n   │ │
   │ (Route) │  │(Nav/UI)│ │ (Fuse) │ │(Fetch) │ │ (Trans) │ │
   └────┬────┘  └───┬────┘ └───┬────┘ └───┬────┘ └────┬────┘ │
        │           │          │          │           │      │
        │           └──────────┴─────┬────┴───────────┘      │
        │                            │                       │
        │              ┌─────────────┼──────────────┐        │
        ▼              ▼             ▼              ▼        │
┌──────────────┐  ┌───────────┐  ┌─────────┐  ┌──────────┐   │
│ RouterEvents │  │ Templates │  │   UI    │  │ Markdown │◄──┘
│   (PubSub)   │  │   (HTML)  │  │(Actions)│  │  Loader  │
└──────────────┘  └───────────┘  └─────────┘  └──────────┘
```

**Module Responsibilities:**

- **`main.js`** - Application initialization and setup
- **`Context`** - Global state management, theme application, data caching
- **`Router`** - SPA routing, URL handling, page transitions
- **`Layout`** - Navbar and footer rendering
- **`Loaders`** - Content fetching (blog posts, projects, pages, GitHub READMEs)
- **`Templates`** - HTML generation with auto-escaping security
- **`Search`** - Fuse.js search with UI, tag filtering, result highlighting
- **`UI`** - Interactive elements (mobile menu, copy buttons, dropdowns)
- **`MarkdownLoader`** - Markdown parsing with frontmatter support
- **`PrismLoader`** - Syntax highlighting with dynamic language loading
- **`YAMLParser`** - Minimal YAML parser for content.yaml
- **`RouterEvents`** - Event system for decoupled navigation
- **`i18n`** - Translation system for multi-language support
- **`CONSTANTS`** - Application-wide configuration

**Data Flow:**
1. `main.js` initializes `Context` which loads and parses `content.yaml`
2. `Router` handles URL changes and coordinates with `Loaders`
3. `Loaders` fetch content and use `Templates` to render HTML
4. `Search` indexes content from `Context` and provides fuzzy search
5. `UI` handles user interactions and updates the DOM
6. All modules consume data from `Context.get()` (cached)

## Development Environment

This project includes a VS Code devcontainer for a consistent development environment:

- **Container**: Alpine Linux (latest)
- **Dev Server**: Microtastic development server
- **Code Quality**: Biome for linting and formatting
- **Extensions**: lit-html for syntax highlighting in template literals
- **Port**: 8081 (auto-forwarded)

### Prerequisites
- VS Code with Dev Containers extension
- Docker
- Node.js >= 20.0.0
- npm >= 9.0.0

## Getting Started

### Using Dev Container (Recommended)
1. Open project in VS Code
2. When prompted, click "Reopen in Container" or use `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"
3. VS Code will build the container and install dependencies
4. Install npm packages: `npm install`
5. Prepare dependencies: `npm run prepare` (bundles dependencies to `app/src/dependencies/`)
6. Run the dev server: `npm run dev`
7. Open `http://localhost:8081`

### Manual Setup
**Prerequisites:** Node.js and npm installed

1. Install dependencies:
```bash
npm install
```

2. Prepare dependencies and assets:
```bash
npm run prepare
```
This will:
- Copy fonts (Raleway, Font Awesome) from node_modules to `app/fonts/`
- Copy Prism.js syntax highlighting themes to `app/css/prism-themes/`
- Transpile JavaScript dependencies to `app/src/dependencies/`

3. Start development server:
```bash
npm run dev
```

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

Uses Node.js built-in test runner (65 tests):

```bash
npm test    # Run all tests
```

Tests cover template utilities, templates, search, YAML parser, routing, markdown, marked configuration, and i18n. All tests must pass before production builds.

## Features & Configuration

All content is managed through `app/data/content.yaml`. The configuration file supports:

### Projects

Add projects with detailed information including GitHub repos, demos, and custom links:

```yaml
projects:
  - id: "my-project"
    title: "Cool Project"
    description: "A brief description of what this project does"
    tags: ["JavaScript", "HTML", "CSS"]
    weight: 1                    # Display order
    github_repo: "my-project"    # Auto-loads README from GitHub
    demo_url: "https://example.com/demo"
    youtube_videos: ["dQw4w9WgXcQ"]
    links:
      - title: "GitHub"
        icon: "fab fa-github"
        href: "https://github.com/username/my-project"
      - title: "Live Demo"
        icon: "fas fa-external-link-alt"
        href: "https://example.com"
```

**Features:**
- READMEs automatically loaded from GitHub
- YouTube video embeds
- Custom links with Font Awesome icons
- Tag-based organization

### Blog

Create markdown blog posts in `app/data/blog/` with automatic pagination:

**1. Create a markdown file** (format: `YYYY-MM-DD-title.md`):

```markdown
---
title: "Your Post Title"
date: "2025-10-21"
excerpt: "A brief summary of your post"
tags: ["tag1", "tag2"]
---

# Your Post Content

Write your content here in markdown...
```

**2. Configure blog settings** in `app/data/content.yaml`:

```yaml
blog:
  title: "Blog"
  showInNav: true
  order: 1
  postsPerPage: 5
  dateFormat: "MMMM D, YYYY"
  posts:
    - filename: "2025-10-21-your-post-title.md"
      title: "Your Post Title"
      date: "2025-10-21"
      excerpt: "A brief summary of your post"
      tags: ["tag1", "tag2"]
    - filename: "2025-10-20-another-post.md"
      title: "Another Post"
      date: "2025-10-20"
      excerpt: "Summary of another post"
      tags: ["tag3"]
```

**Features:**
- Markdown parsing with Marked.js (supports GFM - GitHub Flavored Markdown)
- Syntax highlighting via Highlight.js with theme support
- Automatic date sorting (newest first)
- Pagination support
- Tags and excerpts
- No separate manifest needed

### Search

Powered by [Fuse.js](https://www.fusejs.io/) for lightweight, fuzzy search across all projects and blog posts:

```yaml
site:
  search:
    enabled: true
    minChars: 2
```

**Features:**
- **Fuzzy matching**: Finds results even with typos (e.g., "reactt" → "react")
- **Weighted results**: Title matches (40%) prioritized over descriptions (30%), tags (20%), and content (10%)
- **Searches**: titles, descriptions, tags, and full content
- **Indexes**: markdown posts and GitHub READMEs
- **Clickable tags**: Click any tag on projects or blog posts to instantly filter by that tag
- **Unified experience**: Search icon in navbar opens full-page search overlay on both desktop and mobile
- **Smooth animations**: Elegant slide-down and fade-in effects when opening search
- **Centered layout**: Search results constrained to 750px max-width, matching blog content
- **Real-time**: Results with 300ms debounce
- **Performance**: Scales to hundreds of posts efficiently
- **Configurable**: Search weights, thresholds, and limits defined in `constants.js`
- Up to 8 results with match highlighting
- Works offline after initial load

### Pages & Styling

**Markdown Pages:**
Create markdown files in `app/data/pages/` for clean, maintainable content:

**1. Create a markdown file** (e.g., `app/data/pages/about.md`):
```markdown
# About

<div style="text-align: center; margin-bottom: 20px;">
  <img class="about-pic" 
       src="https://example.com/your-photo.jpg" 
       alt="Your name" 
       loading="eager">
</div>

Your content here in markdown...

## Skills
- JavaScript
- Python
- React
```


**2. Configure page metadata** in `app/data/content.yaml`:
```yaml
pages:
  about:
    title: "About"
    showInNav: true
    order: 1
    # Content is loaded from app/data/pages/about.md
```

**3. Configure site settings** in `app/data/content.yaml`:
```yaml
site:
  title: "Your Portfolio"
  description: "Your description"
  defaultRoute: "/?blog"  # Options: "/?blog", "/?page=about", "project=projectId"

social:
  - icon: "fas fa-envelope"
    href: "#"
    data-action: "email"
  - icon: "fab fa-github" 
    href: "https://github.com/username"

colors:
  primary: "#F59E0B"
  background: "#0C0A09" 
  text: "#FAFAF9"
  # ... etc
  code:
    theme: "prism-tomorrow"  # Prism.js theme for syntax highlighting
```

**Available Prism.js themes:** `prism`, `prism-dark`, `prism-tomorrow`, `prism-okaidia`, `prism-twilight`, `prism-coy`, `prism-funky`, `prism-solarizedlight`, and [many more](https://prismjs.com/)

All Prism themes are bundled locally from the `prismjs` npm package - no external CDN requests.

### Comments System (giscus)

Integrated GitHub Discussions-powered comments via [giscus](https://giscus.app) with separate controls for blog posts and project pages:

```yaml
site:
  comments:
    blogEnabled: true      # Enable comments on blog posts
    projectsEnabled: true  # Enable comments on project pages
    repo: "username/repo"
    repoId: "R_YOUR_REPO_ID"
    category: "General"
    categoryId: "DIC_YOUR_CATEGORY_ID" 
    mapping: "pathname"
    theme: "dark"
```

**Setup steps:**
1. Enable Discussions on your GitHub repo (`Settings` → `Features` → `Discussions`)
2. Install the [giscus app](https://github.com/apps/giscus) on your repository
3. Visit [giscus.app](https://giscus.app), enter your repo name to get configuration IDs
4. Update `repoId` and `categoryId` in your YAML with the generated values

**Features:**
- **Serverless** - No backend required, uses GitHub's infrastructure
- **Spam protection** - GitHub authentication required, built-in moderation tools
- **Separate control** - Enable/disable comments independently for blog vs projects
- **Auto-mapping** - Each URL gets its own discussion thread automatically
- **Responsive** - Works on mobile and desktop
- **Theme integration** - Matches your site's dark/light theme

### Contact Form (EmailJS)

The site includes a contact form modal with email delivery via [EmailJS](https://www.emailjs.com/). When enabled, an envelope icon button appears in the navbar (before social media links).

**Setup:**
1. Sign up at emailjs.com (free tier: 200 emails/month)
2. Create an email service and template
3. Configure template variables: `{{title}}`, `{{name}}`, `{{email}}`, `{{time}}`, `{{message}}`
4. Add credentials to `content.yaml`:

```yaml
site:
  emailjs:
    enabled: true
    serviceId: "service_xxx"      # From EmailJS dashboard
    templateId: "template_xxx"    # From EmailJS dashboard
    publicKey: "your_public_key"  # From EmailJS dashboard
```

**Features:**
- Modal form with name, email, and message fields
- Client-side validation (required fields, email format)
- Success/error feedback messages
- Mobile-friendly with automatic menu closing
- Form automatically closes 2 seconds after successful send

### Internationalization (i18n)

The site includes a built-in i18n framework for multi-language support. Currently configured for English only, but designed for easy expansion:

```yaml
site:
  i18n:
    defaultLanguage: "en"
    availableLanguages: ["en"]

translations:
  en:
    "nav.projects": "Projects"
    "nav.blog": "Blog"
    "search.placeholder": "Search..."
    "search.noResults": "No results found"
    "blog.backToBlog": "← Back to Blog"
    "blog.noPosts": "No blog posts yet. Check back soon!"
    "project.links": "Links"
    "project.media": "Media"
    "general.loading": "Loading..."
    "general.error": "Error loading page"
    "footer.rights": "All rights reserved"
    # ... more translations
```

**To add a new language:**

1. Add language code to `availableLanguages`:
   ```yaml
   availableLanguages: ["en", "nl", "es"]
   ```

2. Copy the `en` translations and translate the values:
   ```yaml
   translations:
     en:
       "nav.projects": "Projects"
       "nav.blog": "Blog"
     nl:
       "nav.projects": "Projecten"
       "nav.blog": "Blog"
     es:
       "nav.projects": "Proyectos"
       "nav.blog": "Blog"
   ```

3. Implement language switcher in UI (optional - framework supports it via `i18n.setLanguage('nl')`)

**Translation keys used:**
- `nav.*` - Navigation items
- `search.*` - Search UI strings
- `blog.*` - Blog page text
- `project.*` - Project page labels
- `general.*` - Error messages and common text
- `footer.*` - Footer text
- `badges.*` - Result type badges
