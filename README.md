## About

This is my personal portfolio website. I originally built it with [Hugo](https://gohugo.io/) and the [seriva/minimal](https://github.com/seriva/minimal-hugo-theme) theme, but wanted more control over the design and functionality, so I rewrote it as a simple single-page application.

It's built with vanilla HTML, CSS, and JavaScript - no build tools or complicated setup needed. The content is managed through a YAML file. This new setup was mostly vibe-coded together:)

Key features:
- YAML configuration for easy content management
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
- Zero-md for markdown rendering with Prism.js syntax highlighting
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

## How it works

- `/` shows the about page
- `/?id=project-id` shows individual projects
- Project READMEs are loaded from GitHub automatically 
- Everything is client-side routed (no page reloads)
