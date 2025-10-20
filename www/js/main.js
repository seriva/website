// Email function - uses data from JSON
const Email = async (event) => {
    event?.preventDefault();
    event?.stopPropagation();
    
    try {
        const data = projectsData || await loadProjectsData();
        const email = data?.site?.email;
        window.location.href = email ? `mailto:${email.name}@${email.domain}` : 'mailto:contact@example.com';
    } catch (error) {
        console.error('Error loading email data:', error);
        window.location.href = 'mailto:contact@example.com';
    }
    return false;
};

// Make globally available for onclick handlers
window.Email = Email;

// Function to apply Prism theme to zero-md elements
const applyThemeToZeroMd = (themeName) => {
    document.querySelectorAll('zero-md').forEach((element) => {
        const themeUrl = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-${themeName}.min.css`;
        element.setAttribute('css-urls', JSON.stringify([themeUrl]));
    });
};

// Initialize zero-md elements with theme from data
const initializeZeroMd = () => {
    const theme = projectsData?.site?.colors?.code?.theme;
    if (theme) applyThemeToZeroMd(theme);
};

// Function to update meta tags from JSON data
const updateMetaTags = (siteData) => {
    if (!siteData) return;
    
    if (siteData.title) document.title = siteData.title;
    
    const metaUpdates = [
        { selector: 'meta[name="description"]', value: siteData.description },
        { selector: 'meta[name="author"]', value: siteData.author },
        { selector: 'meta[name="theme-color"]', value: siteData.colors?.primary },
        { selector: 'meta[name="msapplication-TileColor"]', value: siteData.colors?.primary }
    ];
    
    metaUpdates.forEach(({ selector, value }) => {
        if (value) document.querySelector(selector)?.setAttribute('content', value);
    });
    
    if (siteData.image && DOMCache.imagePreload) {
        DOMCache.imagePreload.setAttribute('href', siteData.image);
    }
};


// Fullscreen function for demo iframes
const fullscreen = () => {
    const iframe = document.getElementById('demo');
    if (!iframe) return;
    
    const request = iframe.requestFullscreen || iframe.webkitRequestFullscreen || 
                    iframe.mozRequestFullScreen || iframe.msRequestFullscreen;
    request?.call(iframe);
};

window.fullscreen = fullscreen;

// Mobile menu management
const MobileMenu = {
    close() {
        const collapseElement = document.querySelector('.navbar-collapse');
        const navbarToggle = document.querySelector('.navbar-toggler');
        
        if (collapseElement) {
            // Use Bootstrap 5 Collapse API
            const bsCollapse = bootstrap.Collapse.getInstance(collapseElement);
            if (bsCollapse) {
                bsCollapse.hide();
            } else {
                collapseElement.classList.remove('show');
            }
        }
        
        if (navbarToggle) {
            navbarToggle.classList.add('collapsed');
            navbarToggle.setAttribute('aria-expanded', 'false');
        }
    },
    
    shouldCloseOnClick(element) {
        // Don't close for dropdown toggles or if element has data-keep-menu attribute
        return !element.classList.contains('dropdown-toggle') && 
               !element.hasAttribute('data-keep-menu');
    },
    
    addClickHandler(element) {
        element.addEventListener('click', (e) => {
            if (this.shouldCloseOnClick(element)) {
                this.close();
            }
            
            // Remove focus after click
            setTimeout(() => element.blur(), 100);
        });
    }
};

window.closeMobileMenu = () => MobileMenu.close();

// Load GitHub README content
export const loadGitHubReadme = async (repoName, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    try {
        const response = await fetch(`https://api.github.com/repos/seriva/${repoName}/contents/README.md`);
        const data = await response.json();
        
        if (data.content) {
            const binaryString = atob(data.content);
            const bytes = Uint8Array.from(binaryString, c => c.charCodeAt(0));
            const content = new TextDecoder('utf-8').decode(bytes);
            const theme = projectsData?.site?.colors?.code?.theme || 'tomorrow';
            const themeUrl = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-${theme}.min.css`;
            
            container.innerHTML = `
                <zero-md css-urls='["${themeUrl}"]'>
                    <script type="text/markdown">${content}</script>
                    <template>
                        <link rel="stylesheet" href="css/main.css">
                        <link rel="stylesheet" href="${themeUrl}">
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"></script>
                        <script src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"></script>
                    </template>
                </zero-md>
            `;
        }
    } catch (error) {
        container.innerHTML = '<p>Error loading README from GitHub.</p>';
    }
};

// Global variable to store projects data
let projectsData = null;
let dataLoadPromise = null;

// Cache frequently accessed DOM elements
const DOMCache = {
    navbar: null,
    main: null,
    imagePreload: null,
    
    init() {
        this.navbar = document.getElementById('navbar-container');
        this.main = document.getElementById('main-content');
        this.imagePreload = document.getElementById('preload-image');
    }
};


// Create navbar HTML
const createNavbar = (pages = [], socialLinks = [], siteTitle = 'portfolio.example.com') => {
    const pageLinks = pages
        .filter(page => page.showInNav)
        .sort((a, b) => a.order - b.order)
        .map(page => `<li class="nav-item navbar-menu"><a class="nav-link" href="/?page=${page.id}" data-spa-route="page">${page.title}</a></li>`)
        .join('');
    
    const socialLinksHtml = socialLinks.map(link => {
        const attrs = ['class="nav-link"'];
        if (link.href) attrs.push(`href="${link.href}"`);
        if (link.onclick) attrs.push(`onclick="${link.onclick}"`);
        if (link.target) attrs.push(`target="${link.target}"`);
        if (link.rel) attrs.push(`rel="${link.rel}"`);
        if (link['aria-label']) attrs.push(`aria-label="${link['aria-label']}"`);
        return `<li class="nav-item navbar-icon"><a ${attrs.join(' ')}><i class="bi ${link.icon}"></i></a></li>`;
    }).join('');
    
    return `
    <nav class="navbar navbar-expand-md navbar-dark fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand d-md-none" href="#">${siteTitle}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    ${pageLinks}
                    <li class="nav-item navbar-menu dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                            Projects
                        </a>
                        <ul class="dropdown-menu" id="projects-dropdown">
                            <li><a class="dropdown-item" href="#">Loading projects...</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    ${socialLinksHtml}
                </ul>
            </div>
        </div>
    </nav>
    `;
};

// Inject navbar into the page
const injectNavbar = async () => {
    if (!DOMCache.navbar) return;
    
    const data = projectsData || await loadProjectsData();
    const pages = data?.pages 
        ? Object.entries(data.pages).map(([id, page]) => ({ id, ...page })) 
        : [];
    
    DOMCache.navbar.innerHTML = createNavbar(
        pages, 
        data?.site?.social || [], 
        data?.site?.title || 'portfolio.example.com'
    );
    
    // Initialize Bootstrap dropdowns
    document.querySelectorAll('.dropdown-toggle').forEach(el => new bootstrap.Dropdown(el));
    
    // Add mobile menu click handlers
    DOMCache.navbar.querySelectorAll('a').forEach(link => MobileMenu.addClickHandler(link));
    
    // Handle mobile menu button blur
    const toggleBtn = DOMCache.navbar.querySelector('.navbar-toggler');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => setTimeout(() => toggleBtn.blur(), 100));
    }
};



// Function to load content data from JSON (with caching)
export const loadProjectsData = async () => {
    if (projectsData) return projectsData;
    if (dataLoadPromise) return dataLoadPromise;
    
    dataLoadPromise = (async () => {
        try {
            const jsonPath = window.location.pathname.includes('/project/') 
                ? '../data/content.json' 
                : 'data/content.json';
            
            const response = await fetch(jsonPath);
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            
            projectsData = await response.json();
            
            if (projectsData?.site?.colors) {
                applyColorScheme(projectsData.site.colors);
                setTimeout(initializeZeroMd, 200);
            }
            
            return projectsData;
        } catch (error) {
            console.error('Failed to load content data:', error);
            return null;
        }
    })();
    
    return dataLoadPromise;
};

// Function to apply color scheme from content.json
const applyColorScheme = (colors) => {
    if (!colors) return;
    
    const colorMappings = {
        '--accent': colors.primary,
        '--font-color': colors.text,
        '--background-color': colors.background,
        '--header-color': colors.secondary,
        '--header-font-color': colors.text,
        '--text-color': colors.text,
        '--text-light': colors.textLight,
        '--border-color': colors.border,
        '--hover-color': colors.hover,
        '--accent-color': colors.accent
    };
    
    const root = document.documentElement;
    Object.entries(colorMappings).forEach(([property, value]) => {
        if (value) root.style.setProperty(property, value);
    });
    
    if (colors.code?.theme) applyThemeToZeroMd(colors.code.theme);
};

// Get a specific project by ID
export const getProject = async (projectId) => {
    const data = await loadProjectsData();
    return data?.projects?.find(project => project.id === projectId) || null;
};

// Load project links dynamically
export const loadProjectLinks = async (projectId, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const project = await getProject(projectId);
    if (!project?.links) {
        container.style.display = 'none';
        return;
    }
    
    const linksHtml = project.links.map(link => `
        <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="download-btn" onclick="closeMobileMenu()">
            <img src="${link.image}" alt="${link.title}">
            <span>${link.title}</span>
        </a>
    `).join('');
    
    container.innerHTML = `<div class="markdown-body"><h2>Links</h2><div class="download-buttons">${linksHtml}</div></div>`;
};





// Function to load a generic page
export const loadPage = async (pageId) => {
    const data = projectsData || await loadProjectsData();
    
    if (!DOMCache.main) return;
    
    let html = '';
    
    if (data?.pages?.[pageId]) {
        const page = data.pages[pageId];
        document.title = data?.site?.title || 'portfolio.example.com';
        html = page.content;
    } else {
        // Page not found
        document.title = data?.site?.title || 'portfolio.example.com';
        html = `
            <div class="error-message">
                <h1>Page Not Found</h1>
                <p>The requested page could not be found.</p>
            </div>
        `;
    }
    
    DOMCache.main.innerHTML = html;
}


// Load individual project page
export const loadProjectPage = async (projectId) => {
    if (!DOMCache.main) return;
    
    const project = await getProject(projectId);
    if (!project) {
        DOMCache.main.innerHTML = '<h1>Project not found</h1>';
        return;
    }
    
    document.title = (projectsData || await loadProjectsData())?.site?.title || 'luukvanvenrooij.nl';
    
    const parts = [
        `<h1 class="project-title">${project.title}</h1>`,
        `<p class="project-description">${project.description}</p>`,
        `<div class="project-tags">${project.tags.map(tag => `<span class="item-tag">${tag}</span>`).join(' ')}</div>`
    ];
    
    if (project.github_repo) {
        parts.push(`<div id="github-readme" data-repo="${project.github_repo}"><p>Loading README from GitHub...</p></div>`);
    }
    
    if (project.youtube_videos?.length) {
        parts.push(`<div class="markdown-body"><h2>Media</h2>${project.youtube_videos.map(id => 
            `<div class="youtube-video"><div class="iframeWrapper">
                <iframe width="560" height="349" src="//www.youtube.com/embed/${id}?rel=0&amp;hd=1" frameborder="0" allowfullscreen></iframe>
            </div></div>`
        ).join('')}</div>`);
    }
    
    if (project.demo_url) {
        parts.push(`<div class="markdown-body"><h2>Play!</h2>
            <p>On desktop use the arrow keys to control the ship and space to shoot. On mobile it should present onscreen controls.</p>
            <div class="iframeWrapper">
                <iframe id="demo" width="900" height="700" src="${project.demo_url}" frameborder="0" allowfullscreen></iframe>
            </div><br><center><button id="fullscreen" onclick="fullscreen()">Go Fullscreen</button></center>
        </div>`);
    }
    
    parts.push(`<div id="project-links" data-project="${project.id}"></div>`);
    DOMCache.main.innerHTML = parts.join('');
}

// Populate projects dropdown menu
export const loadProjectsDropdown = async () => {
    const dropdown = document.getElementById('projects-dropdown');
    const data = projectsData || await loadProjectsData();
    if (!data || !dropdown) return;
    
    dropdown.innerHTML = data.projects
        .sort((a, b) => a.weight - b.weight)
        .map(p => `<li><a class="dropdown-item" href="/?id=${p.id}" data-spa-route="project">${p.title}</a></li>`)
        .join('');
    
    dropdown.querySelectorAll('a').forEach(item => MobileMenu.addClickHandler(item));
};

// Load additional content (GitHub README, project links)
export const loadAdditionalContent = () => {
    const readme = document.getElementById('github-readme');
    const links = document.getElementById('project-links');
    
    if (readme?.dataset.repo) loadGitHubReadme(readme.dataset.repo, 'github-readme');
    if (links?.dataset.project) loadProjectLinks(links.dataset.project, 'project-links');
};


// SPA routing function
const handleRoute = async () => {
    MobileMenu.close();
    
    if (DOMCache.main) DOMCache.main.innerHTML = '<div class="loading-spinner">Loading...</div>';
    
    const params = new URLSearchParams(window.location.search);
    const projectId = params.get('id');
    const pageId = params.get('page');
    
    try {
        const data = projectsData || await loadProjectsData();
        
        if (projectId) {
            await loadProjectPage(projectId);
            loadAdditionalContent();
        } else if (pageId) {
            await loadPage(pageId);
        } else {
            const defaultPage = Object.keys(data.pages).find(id => data.pages[id].default) 
                || Object.keys(data.pages)[0];
            await loadPage(defaultPage);
        }
    } catch (error) {
        console.error('Error loading page:', error);
        if (DOMCache.main) {
            DOMCache.main.innerHTML = '<div class="error-message"><h1>Error loading page</h1><p>Please try refreshing the page.</p></div>';
        }
        document.title = projectsData?.site?.title || 'portfolio.example.com';
    }
};





// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        DOMCache.init();
        
        const data = await loadProjectsData();
        if (data?.site) updateMetaTags(data.site);
        
        await injectNavbar();
        await loadProjectsDropdown();
        await handleRoute();
        
        window.addEventListener('popstate', handleRoute);
        updateNavbarLinks();
        addMobileMenuOutsideClickHandler();
    } catch (error) {
        console.error('Error initializing page:', error);
        if (DOMCache.main) {
            DOMCache.main.innerHTML = '<div class="error-message"><h1>Something went wrong</h1><p>Please refresh the page to try again.</p></div>';
        }
    }
});

// Update navbar links for SPA routing
const updateNavbarLinks = () => {
    document.querySelectorAll('[data-spa-route]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            MobileMenu.close();
            window.history.pushState({}, '', link.getAttribute('href'));
            document.querySelectorAll('.navbar-nav a').forEach(l => l.classList.remove('active'));
            link.classList.add('active');
            handleRoute();
        });
    });
};


// Add mobile menu outside click handler
const addMobileMenuOutsideClickHandler = () => {
    document.addEventListener('click', (event) => {
        if (window.innerWidth <= 767 && DOMCache.navbar && !DOMCache.navbar.contains(event.target)) {
            MobileMenu.close();
        }
    });
};

