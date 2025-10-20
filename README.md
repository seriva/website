## About

This website was originally built using **[Hugo](https://gohugo.io/)** with the **[seriva/minimal](https://github.com/seriva/minimal-hugo-theme)** GitHub theme, providing a clean and minimal portfolio experience. However, to achieve even greater simplicity and control, we migrated to this custom **minimalist SPA (Single Page Application)** website.

This is a modern **minimalist SPA portfolio website** with:

- **YAML Configuration**: Human-readable content files with multiline HTML support  
- **Dynamic Theming**: Real-time color scheme changes via CSS variables
- **Modern Stack**: Font Awesome 6.6.0, Bootstrap 5, consolidated jsDelivr CDN
- **GitHub Integration**: Rate-limit-free README loading with caching
- **Performance Focus**: Optimized CSS/JS, DOM caching, background preloading
- **Responsive Design**: Mobile-first with accessibility enhancements
- **Zero Build Process**: Pure HTML, CSS, and JavaScript

A shift from static site generation to a dynamic, maintainable solution perfect for showcasing projects and technical skills.

## Tech Stack

- **Frontend**: Pure HTML, CSS, JavaScript (ES6+ modules)
- **Framework**: Bootstrap 5.3.2
- **Icons**: Font Awesome 6.6.0 (Free)
- **Configuration**: YAML with js-yaml parser
- **Markdown**: Zero-md with Prism.js syntax highlighting
- **CDN**: Consolidated jsDelivr dependencies with integrity checks
- **Routing**: Client-side SPA routing with URL state management
- **Theming**: Dynamic CSS custom properties
- **Development**: Python HTTP server / VS Code tasks

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

Edit `data/content.yaml` to update:

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

#### YAML Configuration

**Clean, Human-Readable Format**:
```yaml
# Clean, human-readable configuration
site:
  title: "Your Portfolio"
  description: "Your professional description"
  
  # Multiline HTML content - no escaping needed!
  pages:
    about:
      content: |
        <div class="about-content">
          <h1>Welcome!</h1>
          <p>
            Your content here with proper formatting,
            line breaks, and no escaped quotes.
          </p>
        </div>

  # Icon configuration with Font Awesome 6.6.0
  social:
    - icon: "fas fa-envelope"
      onclick: "javascript:Email(event);"
    - icon: "fab fa-github"
      href: "https://github.com/username"
```

#### Color Schemes & Theming

The website supports dynamic color schemes and theming. Change the `colors` section in `content.yaml` to create your own theme:

```yaml
colors:
  primary: "#F59E0B"
  secondary: "#1C1917" 
  accent: "#F59E0B"
  background: "#0C0A09"
  text: "#FAFAF9"
  textLight: "#D6D3D1"
  border: "#44403C"
  hover: "#451A03"
  code:
    theme: "okaidia"
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

### Architecture & Performance

**Modern Foundation**:
- Bootstrap 5 responsive framework with accessibility improvements
- Font Awesome 6.6.0 icon system (2,000+ free icons)
- jsDelivr CDN consolidation with integrity checks
- Client-side SPA routing with URL state management

**Optimizations**:
- GitHub rate-limit bypass (60/hour → unlimited via raw URLs)
- DOM caching reduces queries by ~70%
- CSS consolidation (~30% size reduction)
- JavaScript optimization (~50 lines removed)
- Background README preloading with respectful rate limiting
- DNS prefetching and deferred script loading

### File Structure
```
www/
├── data/content.yaml    # YAML configuration and content
├── css/main.css         # Optimized CSS with variables and consolidated rules
├── js/main.js           # Optimized SPA logic with YAML support
├── index.html           # HTML with CDN consolidation and integrity checks
└── demo/                # Project demo directories
```

## Recent Updates

### v2.1.0 - YAML Configuration & Optimizations
- ✅ **YAML Support**: Human-readable configuration with multiline HTML support
- ✅ **Font Awesome 6.6.0**: Upgraded from Bootstrap Icons with 2,000+ free icons  
- ✅ **CDN Consolidation**: All dependencies now served from jsDelivr
- ✅ **GitHub Optimization**: Bypassed API rate limits using raw GitHub URLs
- ✅ **Performance**: 30% smaller CSS, 50+ lines of JS optimization
- ✅ **Developer Experience**: Much easier content editing with YAML format

### Migration Notes

**Content Format**: The site now uses YAML configuration exclusively for better maintainability and readability. Multiline HTML content is much easier to manage without escaped quotes.

**Icons**: All icons have been updated from Bootstrap Icons (`bi-*`) to Font Awesome (`fas fa-*`, `fab fa-*`) providing access to 2,000+ free icons with better consistency.
