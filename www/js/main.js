// Email function - now uses data from JSON
export const Email = async (event) => {
    // Prevent default behavior to avoid page refresh
    if (event) {
        event.preventDefault();
        event.stopPropagation();
    }
    
    try {
        const data = projectsData || await loadProjectsData();
        const emailData = data?.site?.email;
        if (emailData) {
            window.location.href = `mailto:${emailData.name}@${emailData.domain}`;
            console.log(`mailto:${emailData.name}@${emailData.domain}`);
        } else {
            window.location.href = 'mailto:contact@example.com';
        }
    } catch (error) {
        console.error('Error loading email data:', error);
        window.location.href = 'mailto:contact@example.com';
    }
    
    return false;
};


// Make Email function globally available for onclick handlers
window.Email = Email;

// Function to update meta tags from JSON data
const updateMetaTags = (siteData) => {
    if (siteData) {
        // Update title
        if (siteData.title) {
            document.title = siteData.title;
        }
        
        // Update meta description
        const descriptionMeta = document.querySelector('meta[name="description"]');
        if (descriptionMeta && siteData.description) {
            descriptionMeta.setAttribute('content', siteData.description);
        }
        
        // Update meta author
        const authorMeta = document.querySelector('meta[name="author"]');
        if (authorMeta && siteData.author) {
            authorMeta.setAttribute('content', siteData.author);
        }
        
        // Update preload image
        const preloadImage = document.getElementById('preload-image');
        if (preloadImage && siteData.image) {
            preloadImage.setAttribute('href', siteData.image);
        }
    }
};


// Fullscreen function for demo iframes
export const fullscreen = () => {
    const iframe = document.getElementById('demo');
    if (!iframe) return;
    
    const requestFullscreen = iframe.requestFullscreen || 
                            iframe.webkitRequestFullscreen || 
                            iframe.mozRequestFullScreen || 
                            iframe.msRequestFullscreen;
    
    if (requestFullscreen) {
        requestFullscreen.call(iframe);
    }
};


// Make fullscreen function globally available for onclick handlers
window.fullscreen = fullscreen;

// Mobile menu management
const MobileMenu = {
    close() {
        const collapseElement = document.querySelector('.navbar-collapse');
        const navbarToggle = document.querySelector('.navbar-toggle');
        
        if (collapseElement) {
            if (typeof $ !== 'undefined' && $.fn.collapse) {
                $(collapseElement).collapse('hide');
            } else {
                collapseElement.classList.remove('show');
                collapseElement.classList.add('collapse');
            }
        }
        
        if (navbarToggle) {
            navbarToggle.classList.remove('collapsed');
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

// Make closeMobileMenu function globally available for backward compatibility
window.closeMobileMenu = () => MobileMenu.close();

// Function to load GitHub README content
export const loadGitHubReadme = async (repoName, containerId) => {
    try {
        const response = await fetch(`https://api.github.com/repos/seriva/${repoName}/contents/README.md`);
        const data = await response.json();
        
        if (data.content) {
            const binaryString = atob(data.content);
            const bytes = new Uint8Array(binaryString.length);
            for (let i = 0; i < binaryString.length; i++) {
                bytes[i] = binaryString.charCodeAt(i);
            }
            const content = new TextDecoder('utf-8').decode(bytes);
            
            const container = document.getElementById(containerId);
            if (container) {
                container.innerHTML = `
                    <zero-md no-shadow>
                        <script type="text/markdown">${content}</script>
                        <template>
                            <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/prism-themes@1.9.0/themes/prism-vsc-dark-plus.min.css">
                            <link rel="stylesheet" href="css/main.css">
                        </template>
                    </zero-md>
                `;
            }
        }
    } catch (error) {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = '<p>Error loading README from GitHub.</p>';
        }
    }
};

// Global variable to store projects data
let projectsData = null;
let dataLoadPromise = null;


// Navbar component - now dynamic
const createNavbar = (pages = [], socialLinks = [], siteTitle = 'portfolio.example.com') => {
    const pageLinks = pages
        .filter(page => page.showInNav)
        .sort((a, b) => a.order - b.order)
        .map(page => `<li class="navbar-menu"><a href="/?page=${page.id}" data-spa-route="page">${page.title}</a></li>`)
        .join('');
    
    const socialLinksHtml = socialLinks
        .map(link => {
            const attributes = [];
            if (link.href) attributes.push(`href="${link.href}"`);
            if (link.onclick) attributes.push(`onclick="${link.onclick}"`);
            if (link.target) attributes.push(`target="${link.target}"`);
            if (link.rel) attributes.push(`rel="${link.rel}"`);
            if (link['aria-label']) attributes.push(`aria-label="${link['aria-label']}"`);
            
            return `<li class="navbar-icon"><a ${attributes.join(' ')}><i class="fa ${link.icon}"></i></a></li>`;
        })
        .join('');
    
    return `
    <nav class="navbar navbar-default navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand visible-xs" href="#">${siteTitle}</a>
                <button class="navbar-toggle" data-target=".navbar-collapse" data-toggle="collapse">
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
            </div>
            <div class="collapse navbar-collapse">
                <ul class="nav navbar-nav">
                    ${pageLinks}
                    <li class="navbar-menu dropdown">
                        <a href="#" class="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
                            Projects <span class="caret"></span>
                        </a>
                        <ul class="dropdown-menu" id="projects-dropdown">
                            <li><a href="#">Loading projects...</a></li>
                        </ul>
                    </li>
                </ul>
                <ul class="nav navbar-nav navbar-right">
                    ${socialLinksHtml}
                </ul>
            </div>
        </div>
    </nav>
    `;
};

// Function to inject navbar into pages
const injectNavbar = async () => {
    const navbarContainer = document.getElementById('navbar-container');
    if (navbarContainer) {
        // Use cached data (should be available after preload)
        const data = projectsData || await loadProjectsData();
        const pages = data?.pages ? Object.values(data.pages).map((page, index) => ({
            id: Object.keys(data.pages)[index],
            ...page
        })) : [];
        
        const socialLinks = data?.site?.social || [];
        const siteTitle = data?.site?.title || 'portfolio.example.com';
        
        navbarContainer.innerHTML = createNavbar(pages, socialLinks, siteTitle);
        
        // Initialize Bootstrap dropdown functionality
        if (typeof $ !== 'undefined' && $.fn.dropdown) {
            $('.dropdown-toggle').dropdown();
            
            // Add click handler for projects dropdown on mobile
            $('.dropdown-toggle').on('click', function(e) {
                if (window.innerWidth <= 767) {
                    e.stopPropagation();
                }
            });
        }
        
        // Add mobile menu click handlers to all navbar links
        const navbarLinks = navbarContainer.querySelectorAll('a');
        navbarLinks.forEach(link => MobileMenu.addClickHandler(link));
        
        // Handle mobile menu button and Bootstrap events
        const mobileMenuButton = navbarContainer.querySelector('.navbar-toggle');
        const collapseElement = document.querySelector('.navbar-collapse');
        
        if (mobileMenuButton) {
            mobileMenuButton.addEventListener('click', () => {
                setTimeout(() => mobileMenuButton.blur(), 100);
            });
        }
        
        if (collapseElement) {
            collapseElement.addEventListener('hidden.bs.collapse', () => {
                if (mobileMenuButton) {
                    mobileMenuButton.blur();
                    mobileMenuButton.classList.remove('collapsed');
                }
            });

            collapseElement.addEventListener('shown.bs.collapse', () => {
                if (mobileMenuButton) {
                    mobileMenuButton.classList.add('collapsed');
                }
            });
        }
    }
};



// Function to load content data from JSON (with caching)
export const loadProjectsData = async () => {
    // Return cached data if available
    if (projectsData) return projectsData;
    
    // Return existing promise if already loading
    if (dataLoadPromise) return dataLoadPromise;
    
    // Create new load promise
    dataLoadPromise = (async () => {
    try {
        const currentPath = window.location.pathname;
            const jsonPath = currentPath.includes('/project/') ? '../data/content.json' : 'data/content.json';
        
        const response = await fetch(jsonPath);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        projectsData = data;
        
        // Apply color scheme if available
        if (data?.site?.colors) {
            applyColorScheme(data.site.colors);
        }
        
        return data;
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
    
    const root = document.documentElement;
    
    // Map content.json colors to CSS custom properties
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
    
    // Apply Prism.js theme if available
    if (colors.code && colors.code.theme) {
        applyPrismTheme(colors.code.theme);
    }
    
    // Apply colors to CSS custom properties
    Object.entries(colorMappings).forEach(([property, value]) => {
        if (value) {
            root.style.setProperty(property, value);
        }
    });
    
    // Update meta theme-color
    if (colors.primary) {
        const themeColorMeta = document.querySelector('meta[name="theme-color"]');
        const msTileColorMeta = document.querySelector('meta[name="msapplication-TileColor"]');
        
        if (themeColorMeta) themeColorMeta.setAttribute('content', colors.primary);
        if (msTileColorMeta) msTileColorMeta.setAttribute('content', colors.primary);
    }
};

// Function to apply Prism.js theme
const applyPrismTheme = (themeName) => {
    // Remove existing Prism theme if any
    const existingTheme = document.querySelector('link[href*="prism"]');
    if (existingTheme) {
        existingTheme.remove();
    }
    
    // Load the new Prism theme
    const themeLink = document.createElement('link');
    themeLink.rel = 'stylesheet';
    themeLink.href = `https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/themes/prism-${themeName}.min.css`;
    themeLink.onload = () => {
        // Re-highlight all code blocks after theme loads
        if (window.Prism) {
            window.Prism.highlightAll();
        }
    };
    
    document.head.appendChild(themeLink);
};

// Function to get a specific project by ID
export const getProject = async (projectId) => {
    const data = await loadProjectsData();
    if (!data) return null;
    
    return data.projects.find(project => project.id === projectId);
};

// Function to load project links dynamically
export const loadProjectLinks = async (projectId, containerId) => {
    const project = await getProject(projectId);
    if (!project?.links) {
        // If no links, hide the container
        const container = document.getElementById(containerId);
        if (container) {
            container.style.display = 'none';
        }
        return;
    }
    
    const container = document.getElementById(containerId);
    if (container) {
        let html = '<div class="markdown-body"><h2>Links</h2><div class="download-buttons">';
        project.links.forEach(link => {
            html += `
                <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="download-btn" onclick="closeMobileMenu()">
                    <img src="${link.image}" alt="${link.title}">
                    <span>${link.title}</span>
                </a>
            `;
        });
        html += '</div></div>';
        container.innerHTML = html;
    }
};



// Template functions for project HTML generation
const createProjectHeader = (project) => `
    <h1 class="project-title">${project.title}</h1>
    <p class="project-description">${project.description}</p>
    <div class="project-tags">
        ${project.tags.map(tag => `<span class="item-tag">${tag}</span>`).join(' ')}
    </div>
`;

const createGitHubSection = (repo) => `
    <div id="github-readme" data-repo="${repo}" class="github-readme">
        <p>Loading README from GitHub...</p>
    </div>
`;

const createYouTubeVideo = (videoId) => `
    <div class="youtube-video">
        <div class="iframeWrapper">
            <iframe width="560" height="349" 
                    src="//www.youtube.com/embed/${videoId}?rel=0&amp;hd=1" 
                    frameborder="0" 
                    allowfullscreen></iframe>
        </div>
    </div>
`;

const createYouTubeSection = (videos) => `
    <div class="markdown-body">
        <h2>Media</h2>
        ${videos.map(videoId => createYouTubeVideo(videoId)).join('')}
    </div>
`;

const createDemoSection = (demoUrl) => `
    <div class="markdown-body">
        <h2>Play!</h2>
        <p>On desktop use the arrow keys to control the ship and space to shoot. On mobile it should present onscreen controls.</p>
        <div class="iframeWrapper">
            <iframe id="demo" 
                    width="900" 
                    height="700" 
                    src="${demoUrl}" 
                    frameborder="0" 
                    allowfullscreen></iframe>
        </div>
        <br>
        <center>
            <button id="fullscreen" onclick="javascript:fullscreen()">Go Fullscreen</button>
        </center>
    </div>
`;

const createProjectLinksSection = (projectId) => `
    <div id="project-links" data-project="${projectId}" class="project-links"></div>
`;

// Function to load a generic page
export const loadPage = async (pageId) => {
    const data = projectsData || await loadProjectsData();
    
    // Update main content
    const main = document.getElementById('main-content');
    if (main) {
        let html = '';
        
        if (data && data.pages && data.pages[pageId]) {
            const page = data.pages[pageId];
            
            // Update page title
            const siteTitle = data?.site?.title || 'portfolio.example.com';
            document.title = siteTitle;
            
            // Use content directly from JSON (already includes layout)
            html = page.content;
            
            // Update about image if this is the about page
            if (pageId === 'about' && data?.site?.image) {
                setTimeout(() => {
                    const aboutImage = document.getElementById('about-image');
                    if (aboutImage) {
                        aboutImage.src = data.site.image;
                    }
                }, 0);
            }
        } else {
            // Page not found
            const siteTitle = data?.site?.title || 'portfolio.example.com';
            document.title = siteTitle;
            html = `
                <div class="error-message">
                    <h1>Page Not Found</h1>
                    <p>The requested page could not be found.</p>
                </div>
            `;
        }
        
        main.innerHTML = html;
    }
}


// Function to load individual project page
export const loadProjectPage = async (projectId) => {
    const project = await getProject(projectId);
    if (!project) {
        document.getElementById('main-content').innerHTML = '<h1>Project not found</h1>';
        return;
    }
    
    // Update page title
    const data = projectsData || await loadProjectsData();
    const siteTitle = data?.site?.title || 'luukvanvenrooij.nl';
    document.title = siteTitle;
    
    // Update main content
    const main = document.getElementById('main-content');
    if (main) {
        let html = createProjectHeader(project);
        
        // Add GitHub README section
        if (project.github_repo) {
            html += createGitHubSection(project.github_repo);
        }
        
        // Add YouTube videos
        if (project.youtube_videos?.length > 0) {
            html += createYouTubeSection(project.youtube_videos);
        }
        
        // Add demo section
        if (project.demo_url) {
            html += createDemoSection(project.demo_url);
        }
        
        // Add project links
        html += createProjectLinksSection(project.id);
        
        main.innerHTML = html;
    }
}

// Function to populate the projects dropdown menu
export const loadProjectsDropdown = async () => {
    const data = projectsData || await loadProjectsData();
    if (!data) return;
    
    const dropdown = document.getElementById('projects-dropdown');
    if (!dropdown) return;
    
    // Determine the correct path prefix based on current location
    const currentPath = window.location.pathname;
    const pathPrefix = currentPath.includes('/project/') ? '../' : '';
    
    // Sort projects by weight
    const sortedProjects = data.projects.sort((a, b) => a.weight - b.weight);
    
    // Build the dropdown HTML (no "All Projects" link, just individual projects)
    const html = sortedProjects.map(project => 
        `<li><a href="/?id=${project.id}" data-spa-route="project">${project.title}</a></li>`
    ).join('');
    
    dropdown.innerHTML = html;
    
    // Add click handlers to dropdown items
    const dropdownItems = dropdown.querySelectorAll('a');
    dropdownItems.forEach(item => MobileMenu.addClickHandler(item));
};

// Function to load additional content (GitHub README, project links, etc.)
export const loadAdditionalContent = () => {
    // Load GitHub README if container exists
    const readmeContainer = document.getElementById('github-readme');
    if (readmeContainer) {
        const repoName = readmeContainer.getAttribute('data-repo');
        if (repoName) {
            loadGitHubReadme(repoName, 'github-readme');
        }
    }
    
    // Load project links if container exists
    const linksContainer = document.getElementById('project-links');
    if (linksContainer) {
        const projectId = linksContainer.getAttribute('data-project');
        if (projectId) {
            loadProjectLinks(projectId, 'project-links');
        }
    }
};


// SPA routing function
const handleRoute = async () => {
    // Close mobile menu when route changes
    MobileMenu.close();
    
    const path = window.location.pathname;
    const urlParams = new URLSearchParams(window.location.search);
    const projectId = urlParams.get('id');
    const pageId = urlParams.get('page');
    
    // Show loading state
    const main = document.getElementById('main-content');
    if (main) {
        main.innerHTML = '<div class="loading-spinner">Loading...</div>';
    }
    
    try {
    if (projectId) {
            // Load project page
        await loadProjectPage(projectId);
        loadAdditionalContent();
        } else if (pageId) {
            // Load specific page
            await loadPage(pageId);
    } else {
            // Default to about page for all other routes
            await loadPage('about');
        }
    } catch (error) {
        console.error('Error loading page:', error);
        if (main) {
            main.innerHTML = '<div class="error-message"><h1>Error loading page</h1><p>Please try refreshing the page.</p></div>';
        }
        const siteTitle = data?.site?.title || 'portfolio.example.com';
        document.title = siteTitle;
    }
};


// Preload data function
const preloadData = async () => {
    try {
        // Load data once at startup
        const data = await loadProjectsData();
        return data;
    } catch (error) {
        console.error('Error preloading data:', error);
        return null;
    }
};


// Initialize page when DOM is loaded
document.addEventListener('DOMContentLoaded', async () => {
    try {
        // Preload all data first
        const data = await preloadData();
        
        // Update meta tags
        if (data?.site) {
            updateMetaTags(data.site);
        }
        
        // Initialize navbar
        await injectNavbar();
        
        // Load projects dropdown menu
        await loadProjectsDropdown();
        
        // Handle initial route
        await handleRoute();
        
        // Listen for browser back/forward navigation
        window.addEventListener('popstate', handleRoute);
        
        // Update navbar links to use SPA routing
        updateNavbarLinks();
        
        // Add mobile menu outside click handler
        addMobileMenuOutsideClickHandler();
        
        // Add global error handler for production
        window.addEventListener('error', (event) => {
            console.error('Global error:', event.error);
            // In production, you might want to send this to an analytics service
        });
        
        window.addEventListener('unhandledrejection', (event) => {
            console.error('Unhandled promise rejection:', event.reason);
            // In production, you might want to send this to an analytics service
        });
        
        
    } catch (error) {
        console.error('Error initializing page:', error);
        // Show user-friendly error message
        const main = document.getElementById('main-content');
        if (main) {
            main.innerHTML = '<div class="error-message"><h1>Something went wrong</h1><p>Please refresh the page to try again.</p></div>';
        }
    }
});

// Update navbar links for SPA routing
const updateNavbarLinks = () => {
    // Update all SPA links
    const spaLinks = document.querySelectorAll('[data-spa-route]');
    spaLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const href = link.getAttribute('href');
            
            // Close mobile menu when navigating
            MobileMenu.close();
            
            // Update URL without page reload
            window.history.pushState({}, '', href);
            
            // Update active nav state
            updateActiveNavState(link);
            
            // Handle route
            handleRoute();
        });
    });
};

// Update active navigation state
const updateActiveNavState = (activeLink) => {
    // Remove active class from all nav links
    document.querySelectorAll('.navbar-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    // Add active class to current link
    if (activeLink) {
        activeLink.classList.add('active');
    }
};


// Add mobile menu outside click handler
const addMobileMenuOutsideClickHandler = () => {
    // Remove any existing listeners to prevent duplicates
    document.removeEventListener('click', handleMobileOutsideClick);
    document.addEventListener('click', handleMobileOutsideClick);
};

// Handle mobile outside click
const handleMobileOutsideClick = (event) => {
    // Only on mobile screens
    if (window.innerWidth <= 767) {
        const navbarContainer = document.getElementById('navbar-container');
        
        if (navbarContainer) {
            const isClickInsideNav = navbarContainer.contains(event.target);
            
            if (!isClickInsideNav) {
                MobileMenu.close();
            }
        }
    }
};

