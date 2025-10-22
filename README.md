## About

This is my personal portfolio website. I originally built it with [Hugo](https://gohugo.io/) and the [seriva/minimal](https://github.com/seriva/minimal-hugo-theme) theme, but wanted more control over the design and functionality, so I rewrote it as a simple single-page application.

It's built with vanilla HTML, CSS, and JavaScript - no build tools or complicated setup needed. The content is managed through a YAML file. This new setup was mostly vibe-coded together:)

Key features:
- YAML configuration for easy content management
- Built-in blog with markdown posts and pagination
- Fuzzy search with Fuse.js across projects and blog posts
- Dynamic color themes you can change in the config
- Font Awesome icons and Bootstrap for styling
- Loads project READMEs directly from GitHub
- Mobile-friendly responsive design with dedicated mobile search page
- Fast loading with optimized assets

## Tech Stack

- HTML, CSS, JavaScript (no build process)
- Bootstrap 5.3.2 for styling
- Font Awesome 6.6.0 for icons
- Fuse.js 7.0.0 for fuzzy search
- YAML configuration with js-yaml parser
- Zero-md v3 for markdown rendering with Highlight.js syntax highlighting
- jsDelivr CDN for external dependencies

## Development Environment

This project includes a VS Code devcontainer for a consistent development environment:

- **Container**: Alpine Linux 3.19
- **Dev Server**: darkhttpd (lightweight HTTP server)
- **Code Quality**: Biome for linting and formatting
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
- Markdown with syntax highlighting (Highlight.js)
- Automatic date sorting (newest first)
- Pagination support
- Tags and excerpts
- No separate manifest needed

### Search

Powered by [Fuse.js](https://www.fusejs.io/) for fast, fuzzy search across all projects and blog posts:

```yaml
site:
  search:
    enabled: true
    placeholder: "Search projects and blog posts..."
    minChars: 2
```

**Features:**
- **Fuzzy matching**: Finds results even with typos (e.g., "reactt" → "react")
- **Weighted results**: Title matches prioritized over content matches
- **Searches**: titles, descriptions, tags, and full content
- **Indexes**: markdown posts and GitHub READMEs
- **Desktop**: Unfold search bar in navbar
- **Mobile**: Full-page search overlay with larger text
- **Real-time**: Results with 300ms debounce
- **Performance**: Scales to hundreds of posts efficiently
- Up to 8 results with match highlighting
- Works offline after initial load

### Pages & Styling

```yaml
site:
  title: "Your Portfolio"
  description: "Your description"
  
pages:
  about:
    content: |
      <div class="about-content">
        <h1>Welcome!</h1>
        <p>Your content here - no escaping needed!</p>
      </div>

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
```

**Available code themes:** `okaidia`, `tomorrow`, `vs-dark`, `dark`

### Internationalization (i18n)

The site includes a built-in i18n framework for multi-language support. Currently configured for English only, but designed for easy expansion:

```yaml
site:
  i18n:
    defaultLanguage: "en"
    availableLanguages: ["en"]

translations:
  en:
    nav:
      projects: "Projects"
      blog: "Blog"
    search:
      placeholder: "Search projects and blog posts..."
      noResults: "No results found"
    blog:
      readMore: "Read more →"
      backToBlog: "← Back to Blog"
    # ... more translations
```

**To add a new language:**

1. Add language code to `availableLanguages`:
   ```yaml
   availableLanguages: ["en", "nl", "es"]
   ```

2. Copy the `en` translations section and translate:
   ```yaml
   translations:
     en:
       nav:
         projects: "Projects"
     nl:
       nav:
         projects: "Projecten"
     es:
       nav:
         projects: "Proyectos"
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

All UI strings are automatically translated using the `i18n.t()` function, making it easy to maintain consistency across languages.

## How it works

- `/` shows the default page (configured with `default: true` in pages)
- `/?page=<page-id>` shows any page (e.g., `/?page=about`)
- `/?blog` shows the blog listing (if blog is enabled)
- `/?blog&p=2` shows blog listing with pagination (page 2)
- `/?blog=<slug>` shows individual blog posts (e.g., `/?blog=getting-started`)
- `/?project=<project-id>` shows individual projects
- Project READMEs are loaded from GitHub automatically
- Search functionality works on both desktop (unfold navbar) and mobile (full-page overlay)
- Everything is client-side routed (no page reloads)
- Translations loaded from YAML and applied automatically
