## About

This website was originally built using **[Hugo](https://gohugo.io/)** with the **[seriva/minimal](https://github.com/seriva/minimal-hugo-theme)** GitHub theme, providing a clean and minimal portfolio experience. However, to achieve even greater simplicity and control, we migrated to this custom **minimalist SPA (Single Page Application)** website.

The current implementation offers:
- **Simplified Architecture**: Pure HTML, CSS, and JavaScript - no build process required
- **YAML Configuration**: Human-friendly content management with native multiline support
- **Dynamic Theming**: Real-time color scheme changes without page reloads
- **Modern Icons**: Font Awesome 6.6.0 with 2,000+ free icons
- **Performance Optimized**: Consolidated CDN dependencies and efficient caching
- **GitHub API Optimization**: Rate-limit-free README loading via raw URLs
- **Full Control**: Complete customization of every aspect of the design and functionality

This migration represents a shift from static site generation to a highly optimized, dynamic, and maintainable solution that better serves modern portfolio needs.

## Features

- **YAML Configuration**: Human-readable content files with multiline HTML support
- **Dynamic Theming**: Change color schemes via YAML/JSON configuration
- **Modern Icons**: Font Awesome 6.6.0 with extensive icon library
- **Optimized Performance**: Consolidated CDN dependencies and efficient caching
- **GitHub Integration**: Rate-limit-free README loading from repositories
- **Syntax Highlighting**: Zero-md with Prism.js code blocks and multiple themes
- **Responsive Design**: Mobile-friendly navigation and layout
- **SPA Routing**: Single-page application with smooth navigation
- **Project Showcase**: YouTube videos, live demos, and download links
- **Accessibility**: Enhanced keyboard navigation and screen reader support

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

### Architecture
- **Bootstrap 5**: Modern responsive framework with improved accessibility
- **Dynamic CSS**: Color schemes applied via CSS custom properties
- **Client-side Routing**: URL-based navigation without page reloads
- **Shadow DOM**: Zero-md component isolation
- **DOM Caching**: Optimized element queries for better performance
- **Resource Hints**: DNS prefetch and preconnect for faster CDN loading

### Performance Optimizations
- **CDN Consolidation**: All dependencies served from jsDelivr for faster loading
- **GitHub API Optimization**: Uses raw GitHub URLs to bypass API rate limits (60/hour → unlimited)
- **DNS Prefetching**: Pre-resolves external CDN domains
- **Deferred Scripts**: Non-critical scripts load after main content  
- **DOM Caching**: Reduces repeated element queries by ~70%
- **Consolidated CSS**: ~30% smaller stylesheet with merged selectors and CSS variables
- **JavaScript Minification**: ~50 lines of redundant code removed, optimized functions
- **README Caching**: GitHub READMEs preloaded and cached for instant navigation
- **Template Consolidation**: All HTML templates centralized for maintainability
- **Rate-limited Preloading**: Respectful GitHub README preloading with 100ms delays

### Code Organization
- **Templates Object**: All HTML templates consolidated in one location
- **Helper Functions**: Reusable utilities (e.g., `getPrismThemeUrl()`)
- **Caching System**: Map-based cache for GitHub README content
- **Background Preloading**: READMEs fetched asynchronously without blocking UI

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
