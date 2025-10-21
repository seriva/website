## About

This is my personal portfolio website. I originally built it with [Hugo](https://gohugo.io/) and the [seriva/minimal](https://github.com/seriva/minimal-hugo-theme) theme, but wanted more control over the design and functionality, so I rewrote it as a simple single-page application.

It's built with vanilla HTML, CSS, and JavaScript - no build tools or complicated setup needed. The content is managed through a YAML file. This new setup was mostly vibe-coded together:)

Key features:
- YAML configuration for easy content management
- Built-in blog with markdown posts and pagination
- Dynamic color themes you can change in the config
- Font Awesome icons and Bootstrap for styling
- Loads project READMEs directly from GitHub
- Mobile-friendly responsive design
- Fast loading with optimized assets

## Tech Stack

- HTML, CSS, JavaScript (no build process)
- Bootstrap 5.3.2 for styling
- Font Awesome 6.6.0 for icons
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

## Configuration

All content is managed through `data/content.yaml`. This includes:

- Site info (title, description, social links)
- Project details (descriptions, GitHub repos, demo links) 
- Page content (like the about page)
- Color themes

### Example YAML structure:

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

projects:
  - id: "my-project"
    title: "Cool Project"
    description: "A brief description of what this project does"
    tags: ["JavaScript", "HTML", "CSS"]
    weight: 1
    github_repo: "my-project"
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

### Color themes

Change colors by editing the `colors` section:

```yaml
colors:
  primary: "#F59E0B"
  background: "#0C0A09" 
  text: "#FAFAF9"
  # ... etc
```

Available code themes: `okaidia`, `tomorrow`, `vs-dark`, `dark`

## Blog Feature

The blog system uses markdown files stored in `data/blog/`:

### Adding a New Blog Post

1. Create a new markdown file in `data/blog/` with the format `YYYY-MM-DD-title.md`
2. Add frontmatter at the top:

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

3. Add the filename to the `posts` array in `data/content.yaml`:

```yaml
blog:
  title: "Blog"
  showInNav: true
  order: 1
  postsPerPage: 5
  dateFormat: "MMMM D, YYYY"
  posts:
    - "2025-10-21-your-post-title.md"
    - "2025-10-20-another-post.md"
```

That's it! No need to maintain a separate manifest.json file. The blog posts are automatically sorted by date (newest first) and displayed with pagination.

## How it works

- `/` shows the default page (configured with `default: true` in pages)
- `/?page=<page-id>` shows any page (e.g., `/?page=about`)
- `/?blog` shows the blog listing (if blog is enabled)
- `/?blog&p=2` shows blog listing with pagination (page 2)
- `/?blog=<slug>` shows individual blog posts (e.g., `/?blog=getting-started`)
- `/?project=<project-id>` shows individual projects
- Project READMEs are loaded from GitHub automatically 
- Everything is client-side routed (no page reloads)
