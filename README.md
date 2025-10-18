# Portfolio Website

Simple SPA portfolio with dynamic content from JSON.

## Quick Start

### Development

**Option 1: VS Code Task (Recommended)**
1. Open the project in VS Code
2. Press `Ctrl+Shift+P` (or `Cmd+Shift+P` on Mac)
3. Type "Tasks: Run Task" and select it
4. Choose "Dev Server" from the list

**Option 2: Manual Command**
```bash
cd www && python3 -m http.server 8081
```

Access at `http://localhost:8081`

## Content Management

Edit `data/content.json` to update:
- Site info (title, description, email, social links)
- Projects (title, description, tags, GitHub repo, demo URL, videos, download links)
- Pages (about, contact, etc.)

## URLs

- `/` - About page
- `/?id=project-id` - Project pages
- `/?page=page-id` - Static pages
