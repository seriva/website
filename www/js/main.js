// ===========================
// HTML TEMPLATES
// ===========================

const Templates = {
    navbar: (pageLinks, socialLinksHtml, siteTitle) => `
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
    `,

    pageLink: (pageId, pageTitle) => 
        `<li class="nav-item navbar-menu"><a class="nav-link" href="/?page=${pageId}" data-spa-route="page">${pageTitle}</a></li>`,

    socialLink: ({ href = '#', onclick = '', target = '', rel = '', 'aria-label': ariaLabel = '', icon }) => 
        `<li class="nav-item navbar-icon"><a class="nav-link" href="${href}" ${onclick && `onclick="${onclick}"`} ${target && `target="${target}"`} ${rel && `rel="${rel}"`} ${ariaLabel && `aria-label="${ariaLabel}"`}><i class="${icon}"></i></a></li>`,

    projectDropdownItem: (projectId, projectTitle) =>
        `<li><a class="dropdown-item" href="/?id=${projectId}" data-spa-route="project">${projectTitle}</a></li>`,

    projectLink: (link) => `
        <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="download-btn" onclick="closeMobileMenu()">
            <i class="${link.icon}"></i>
            <span>${link.title}</span>
        </a>
    `,

    youtubeVideo: (videoId) => `
        <div class="youtube-video"><div class="iframeWrapper">
            <iframe width="560" height="349" src="//www.youtube.com/embed/${videoId}?rel=0&amp;hd=1" frameborder="0" allowfullscreen></iframe>
        </div></div>`,

    demoIframe: (demoUrl) => `
        <div class="markdown-body"><h2>Play!</h2>
            <p>On desktop use the arrow keys to control the ship and space to shoot. On mobile it should present onscreen controls.</p>
            <div class="iframeWrapper">
                <iframe id="demo" width="900" height="700" src="${demoUrl}" frameborder="0" allowfullscreen></iframe>
            </div><br><center><button id="fullscreen" onclick="fullscreen()"><i class="fas fa-expand"></i><span>Go Fullscreen</span></button></center>
        </div>`,

    githubReadme: (repoName) => 
        `<div id="github-readme" data-repo="${repoName}"><p>Loading README from GitHub...</p></div>`,

    projectLinks: (projectId) => 
        `<div id="project-links" data-project="${projectId}"></div>`,

    loadingSpinner: () => 
        '<div class="loading-spinner">Loading...</div>',

    errorMessage: (title, message) => `
        <div class="error-message">
            <h1>${title}</h1>
            <p>${message}</p>
        </div>`,

    zeroMd: (content, themeUrl) => `
        <zero-md css-urls='["${themeUrl}"]'>
            <script type="text/markdown">${content}</script>
            <template>
                <link rel="stylesheet" href="css/main.css">
                <link rel="stylesheet" href="${themeUrl}">
            </template>
        </zero-md>`,

    githubReadmeError: () => 
        '<p>Error loading README from GitHub.</p>',

    projectLinksSection: (linksHtml) => `
        <div class="markdown-body">
            <h2>Links</h2>
            <div class="download-buttons">${linksHtml}</div>
        </div>`,

    projectHeader: (title, description, tags) => `
        <h1 class="project-title">${title}</h1>
        <p class="project-description">${description}</p>
        <div class="project-tags">${tags.map(tag => `<span class="item-tag">${tag}</span>`).join(' ')}</div>`,

    mediaSection: (videosHtml) => `
        <div class="markdown-body">
            <h2>Media</h2>
            ${videosHtml}
        </div>`
};

// ===========================
// APPLICATION CODE
// ===========================

// Helper function to get Prism theme URL
const getPrismThemeUrl = (themeName) => 
    `https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-${themeName}.min.css`;

// Combined email function with error fallback
const Email = async (event) => {
    event?.preventDefault?.();
    event?.stopPropagation?.();
    
    const data = projectsData || await loadProjectsData().catch(() => null);
    const email = data?.site?.email;
    window.location.href = email ? `mailto:${email.name}@${email.domain}` : 'mailto:contact@example.com';
    return false;
};

// Make globally available for onclick handlers
window.Email = Email;

// Combined function to apply Prism theme to zero-md elements
const applyThemeToZeroMd = (themeName = projectsData?.site?.colors?.code?.theme || 'tomorrow') => {
    if (!themeName) return;
    const themeUrl = getPrismThemeUrl(themeName);
    document.querySelectorAll('zero-md').forEach(el => 
        el.setAttribute('css-urls', JSON.stringify([themeUrl]))
    );
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

// Optimized mobile menu management
const MobileMenu = {
    close() {
        const collapseElement = document.querySelector('.navbar-collapse');
        const navbarToggle = document.querySelector('.navbar-toggler');
        
        if (collapseElement) {
            const bsCollapse = bootstrap.Collapse.getInstance(collapseElement);
            bsCollapse ? bsCollapse.hide() : collapseElement.classList.remove('show');
        }
        
        if (navbarToggle) {
            navbarToggle.classList.add('collapsed');
            navbarToggle.setAttribute('aria-expanded', 'false');
        }
    },
    
    addClickHandler(element) {
        element.addEventListener('click', () => {
            if (!element.classList.contains('dropdown-toggle') && !element.hasAttribute('data-keep-menu')) {
                this.close();
            }
            setTimeout(() => element.blur(), 100);
        });
    }
};

window.closeMobileMenu = () => MobileMenu.close();

// Optimized GitHub README fetching with caching
const fetchGitHubReadme = async (repoName) => {
    if (readmeCache.has(repoName)) return readmeCache.get(repoName);
    
    const data = projectsData || await loadProjectsData();
    const username = data?.site?.github_username || 'seriva';
    
    for (const branch of ['master', 'main']) {
        try {
            const response = await fetch(`https://raw.githubusercontent.com/${username}/${repoName}/${branch}/README.md`);
            if (response.ok) {
                const content = await response.text();
                readmeCache.set(repoName, content);
                return content;
            }
        } catch (error) {
            console.error(`Error fetching README for ${repoName} from ${branch}:`, error);
        }
    }
    
    return null;
};

// Preload GitHub READMEs with rate limiting
const preloadGitHubReadmes = async () => {
    const data = projectsData || await loadProjectsData();
    const repos = data?.projects?.filter(p => p.github_repo).map(p => p.github_repo) || [];
    
    for (const repo of repos) {
        await new Promise(resolve => setTimeout(resolve, 100));
        fetchGitHubReadme(repo).catch(() => {});
    }
};

// Load GitHub README content - optimized
export const loadGitHubReadme = async (repoName, containerId) => {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const content = await fetchGitHubReadme(repoName);
    container.innerHTML = content 
        ? Templates.zeroMd(content, getPrismThemeUrl(projectsData?.site?.colors?.code?.theme || 'tomorrow'))
        : Templates.githubReadmeError();
};

// Global variable to store projects data
let projectsData = null;
let dataLoadPromise = null;

// Cache for GitHub READMEs
const readmeCache = new Map();

// Enhanced DOM element caching
const DOMCache = {
    navbar: null,
    main: null,
    dropdownMenu: null,
    
    init() {
        this.navbar = document.getElementById('navbar-container');
        this.main = document.getElementById('main-content');
    },
    
    getDropdown() {
        return this.dropdownMenu || (this.dropdownMenu = document.getElementById('projects-dropdown'));
    }
};

// Create navbar HTML
const createNavbar = (pages = [], socialLinks = [], siteTitle = 'portfolio.example.com') => {
    const pageLinks = pages
        .filter(page => page.showInNav)
        .sort((a, b) => a.order - b.order)
        .map(page => Templates.pageLink(page.id, page.title))
        .join('');
    
    const socialLinksHtml = socialLinks
        .map(link => Templates.socialLink(link))
        .join('');
    
    return Templates.navbar(pageLinks, socialLinksHtml, siteTitle);
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

// Optimized function to load content data from YAML (with caching)
export const loadProjectsData = async () => {
    if (projectsData) return projectsData;
    if (dataLoadPromise) return dataLoadPromise;
    
    const yamlPath = window.location.pathname.includes('/project/') ? '../data/content.yaml' : 'data/content.yaml';
    
    dataLoadPromise = fetch(yamlPath)
        .then(response => {
            if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
            return response.text();
        })
        .then(yamlText => {
            projectsData = jsyaml.load(yamlText);
            if (projectsData?.site?.colors) {
                applyColorScheme(projectsData.site.colors);
                setTimeout(() => applyThemeToZeroMd(), 200);
            }
            return projectsData;
        })
        .catch(error => {
            console.error('Failed to load YAML content data:', error);
            return null;
        });
    
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
    
    const linksHtml = project.links.map(link => Templates.projectLink(link)).join('');
    container.innerHTML = Templates.projectLinksSection(linksHtml);
};

// Utility to set page title
const setPageTitle = (data) => {
    document.title = data?.site?.title || 'portfolio.example.com';
};

// Function to load a generic page - optimized
export const loadPage = async (pageId) => {
    const data = projectsData || await loadProjectsData();
    if (!DOMCache.main) return;
    
    setPageTitle(data);
    DOMCache.main.innerHTML = data?.pages?.[pageId]?.content || 
        Templates.errorMessage('Page Not Found', 'The requested page could not be found.');
}

// Load individual project page - optimized
export const loadProjectPage = async (projectId) => {
    if (!DOMCache.main) return;
    
    const project = await getProject(projectId);
    if (!project) {
        DOMCache.main.innerHTML = Templates.errorMessage('Project not found', 'The requested project could not be found.');
        return;
    }
    
    setPageTitle(projectsData);
    
    const parts = [Templates.projectHeader(project.title, project.description, project.tags)];
    
    if (project.github_repo) parts.push(Templates.githubReadme(project.github_repo));
    if (project.youtube_videos?.length) {
        const videos = project.youtube_videos.map(id => Templates.youtubeVideo(id)).join('');
        parts.push(Templates.mediaSection(videos));
    }
    if (project.demo_url) parts.push(Templates.demoIframe(project.demo_url));
    
    parts.push(Templates.projectLinks(project.id));
    DOMCache.main.innerHTML = parts.join('');
}

// Populate projects dropdown menu - optimized
export const loadProjectsDropdown = async () => {
    const dropdown = DOMCache.getDropdown();
    const data = projectsData || await loadProjectsData();
    if (!data?.projects || !dropdown) return;
    
    dropdown.innerHTML = data.projects
        .sort((a, b) => a.weight - b.weight)
        .map(p => Templates.projectDropdownItem(p.id, p.title))
        .join('');
    
    dropdown.querySelectorAll('a').forEach(MobileMenu.addClickHandler);
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
    
    if (DOMCache.main) DOMCache.main.innerHTML = Templates.loadingSpinner();
    
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
            DOMCache.main.innerHTML = Templates.errorMessage('Error loading page', 'Please try refreshing the page.');
        }
        setPageTitle(projectsData);
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
        
        // Preload GitHub READMEs in the background
        preloadGitHubReadmes();
    } catch (error) {
        console.error('Error initializing page:', error);
        if (DOMCache.main) {
            DOMCache.main.innerHTML = Templates.errorMessage('Something went wrong', 'Please refresh the page to try again.');
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

