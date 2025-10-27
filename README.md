## About

This is my personal portfolio website. I originally built it with [Hugo](https://gohugo.io/) and the [seriva/minimal](https://github.com/seriva/minimal-hugo-theme) theme, but wanted more control over the design and functionality, so I rewrote it as a simple single-page application.

It's built with vanilla HTML, CSS, and JavaScript - no build tools or complicated setup needed. Content is managed through YAML configuration and markdown files. This new setup was mostly vibe-coded together:)

Key features:
- **Markdown page system** - Create pages as markdown files in `/data/pages/`
- **Markdown blog system** - Blog posts with pagination and metadata
- **YAML configuration** - Easy content management and site settings
- **Fuzzy search** - MiniSearch across projects and blog posts
- **Dynamic color themes** - Customizable color schemes
- **GitHub integration** - Loads project READMEs directly from GitHub
- **Mobile-friendly** - Responsive design with unified search
- **Unit testing** - QUnit test suite for code quality
- **No build tools** - Pure vanilla HTML, CSS, and JavaScript

## Tech Stack

- **Frontend**: HTML, CSS, JavaScript (no build process)
- **Styling**: Custom CSS with CSS custom properties
- **Icons**: Font Awesome subset (only used icons)
- **Search**: MiniSearch 7.1.0 for fuzzy search
- **Content**: YAML configuration + Markdown files
- **Parsing**: yamljs parser, Marked.js v11.1.1, Highlight.js v11.9.0
- **Fonts**: Raleway (weights 400, 600, 700, 900)
- **CDN**: jsDelivr for external dependencies
- **Templating**: Tagged template literals for secure HTML
- **Testing**: QUnit for unit tests

## Development Environment

This project includes a VS Code devcontainer for a consistent development environment:

- **Container**: Alpine Linux 3.19
- **Dev Server**: darkhttpd (lightweight HTTP server)
- **Code Quality**: Biome for linting and formatting
- **Extensions**: lit-html for syntax highlighting in template literals
- **Port**: 8081 (auto-forwarded)

### Prerequisites
- VS Code with Dev Containers extension
- Docker

## Getting Started

### Using Dev Container (Recommended)
1. Open project in VS Code
2. When prompted, click "Reopen in Container" or use `Ctrl+Shift+P` → "Dev Containers: Reopen in Container"
3. VS Code will build the container and install dependencies (darkhttpd + Biome)
4. Run the dev server: `Ctrl+Shift+P` → "Tasks: Run Task" → "Dev Server"
5. Open `http://localhost:8081`

### Manual Setup
**Using VS Code:**
1. Open project in VS Code
2. `Ctrl+Shift+P` → "Tasks: Run Task" → "Dev Server"

**Or from terminal:**
```bash
cd www && python3 -m http.server 8081
```

Then open `http://localhost:8081`

### Code Quality Tools

The devcontainer includes Biome for code formatting and linting:

- **Format code**: `Ctrl+Shift+P` → "Tasks: Run Task" → "Format Code"
- **Check code quality**: `Ctrl+Shift+P` → "Tasks: Run Task" → "Check Code Quality"
- **Auto-format**: Enabled on save in VS Code

### Testing

The project includes essential unit tests using QUnit:

- **Run tests**: Open `tests.html` in your browser
- **Test coverage**: Core utilities, templates, search, routing, and DOM functionality
- **Mobile testing**: Responsive design validation

**Test files:**
- `tests.html` - Main test page with QUnit interface
- `tests/test-utils.js` - Utility function tests (HTML escaping, title setting)
- `tests/test-templates.js` - Template generation tests (navbar, pageLink, socialLink)
- `tests/test-search.js` - Search functionality tests
- `tests/test-routing.js` - SPA routing and URL parsing tests
- `tests/test-dom.js` - DOM elements and responsive design tests

## Features & Configuration

All content is managed through `data/content.yaml`. The configuration file supports:

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

Create markdown blog posts in `data/blog/` with automatic pagination:

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

**2. Configure blog settings** in `data/content.yaml`:

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

Powered by [MiniSearch](https://lucaong.github.io/minisearch/) for fast, fuzzy search across all projects and blog posts:

```yaml
site:
  search:
    enabled: true
    minChars: 2
```

**Features:**
- **Fuzzy matching**: Finds results even with typos (e.g., "reactt" → "react")
- **Weighted results**: Title matches prioritized over content matches
- **Searches**: titles, descriptions, tags, and full content
- **Indexes**: markdown posts and GitHub READMEs
- **Clickable tags**: Click any tag on projects or blog posts to instantly filter by that tag
- **Unified experience**: Search icon in navbar opens full-page search overlay on both desktop and mobile
- **Smooth animations**: Elegant slide-down and fade-in effects when opening search
- **Centered layout**: Search results constrained to 750px max-width, matching blog content
- **Real-time**: Results with 300ms debounce
- **Performance**: Scales to hundreds of posts efficiently
- Up to 8 results with match highlighting
- Works offline after initial load

### Pages & Styling

**Markdown Pages:**
Create markdown files in `/data/pages/` for clean, maintainable content:

**1. Create a markdown file** (e.g., `data/pages/about.md`):
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


**2. Configure page metadata** in `data/content.yaml`:
```yaml
pages:
  about:
    title: "About"
    showInNav: true
    order: 1
    # Content is loaded from /data/pages/about.md
```

**3. Configure site settings** in `data/content.yaml`:
```yaml
site:
  title: "Your Portfolio"
  description: "Your description"
  defaultRoute: "/?blog"  # Options: "/?blog", "/?page=about", "project=projectId"

social:
  - icon: "fas fa-envelope"
    onclick: "javascript:Email(event);"
  - icon: "fab fa-github" 
    href: "https://github.com/username"

colors:
  primary: "#F59E0B"
  background: "#0C0A09" 
  text: "#FAFAF9"
  # ... etc
  code:
    theme: "monokai"  # Highlight.js theme for syntax highlighting
```

**Available Highlight.js themes:** `monokai`, `github-dark`, `atom-one-dark`, `vs2015`, `dracula`, `nord`, and [many more](https://highlightjs.org/demo)

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
