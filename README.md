## About

This website was originally built using **Hugo** with the **seriva/minimal** GitHub theme, providing a clean and minimal portfolio experience. However, to achieve even greater simplicity and control, we migrated to this custom **minimalist SPA (Single Page Application)** website.

The new implementation offers:
- **Simplified Architecture**: Pure HTML, CSS, and JavaScript - no build process required
- **Dynamic Theming**: Real-time color scheme changes without page reloads
- **Enhanced Performance**: Faster loading with optimized asset delivery
- **Full Control**: Complete customization of every aspect of the design and functionality
- **Modern Features**: Syntax highlighting, responsive design, and smooth navigation

This migration represents a shift from static site generation to a more dynamic, maintainable solution that better serves the portfolio's needs.

## Features

- **Dynamic Theming**: Change color schemes via `content.json`
- **Syntax Highlighting**: Zero-md with Prism.js code blocks
- **Responsive Design**: Mobile-friendly navigation and layout
- **SPA Routing**: Single-page application with smooth navigation
- **GitHub Integration**: Automatic README loading from GitHub repos
- **Project Showcase**: Videos, demos, and download links

## Tech Stack

- **Frontend**: Pure HTML, CSS, JavaScript
- **Framework**: Bootstrap 3
- **Markdown**: Zero-md with Prism.js
- **Routing**: Client-side SPA routing
- **Theming**: Dynamic CSS custom properties
- **Development**: Python HTTP server

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

## Configuration

### Content Management

Edit `data/content.json` to update:

#### Site Configuration
- **Basic Info**: title, description, author, image
- **Email**: Contact email configuration
- **Social Links**: GitHub, YouTube, LinkedIn, etc.

#### Projects
- **Basic Info**: title, description, tags, weight
- **GitHub Integration**: Automatic README loading
- **Media**: YouTube videos, demo URLs
- **Downloads**: Custom download links with icons

#### Pages
- **Static Content**: About, contact, custom pages
- **Navigation**: Show/hide in navbar, ordering

#### Color Schemes & Theming

The website supports dynamic color schemes and theming. Change the `colors` section in `content.json` to create your own theme:

```json
"colors": {
  "primary": "#F59E0B",
  "secondary": "#1C1917", 
  "accent": "#F59E0B",
  "background": "#0C0A09",
  "text": "#FAFAF9",
  "textLight": "#D6D3D1",
  "border": "#44403C",
  "hover": "#451A03",
  "code": {
    "theme": "okaidia"
  }
}
```

#### Color Configuration
Each color variable controls different parts of the website:

- **primary/accent**: Main accent color (links, highlights, borders)
- **secondary**: Secondary background color (dropdowns, buttons)
- **background**: Main page background
- **text**: Primary text color
- **textLight**: Secondary text color
- **border**: Border and separator colors
- **hover**: Hover state colors
- **code.theme**: Prism.js syntax highlighting theme

#### Code Block Themes
Supported Prism.js themes:
- `okaidia` (default) - Dark theme with colorful syntax
- `tomorrow` - Clean dark theme
- `vs-dark` - Visual Studio dark theme
- `dark` - Simple dark theme

#### URLs

- `/` - About page
- `/?id=project-id` - Project pages  
- `/?page=page-id` - Static pages

## Technical Details

### Architecture
- **Bootstrap 3**: Responsive framework
- **Dynamic CSS**: Color schemes applied via CSS custom properties
- **Client-side Routing**: URL-based navigation without page reloads
- **Shadow DOM**: Zero-md component isolation

### File Structure
```
www/
├── data/content.json    # Site configuration and content
├── css/main.css        # Styles with dynamic theming
├── js/main.js          # SPA logic and theming
├── index.html          # Main HTML file
└── demo/               # Project demos
```
