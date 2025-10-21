// ===========================
// CONSTANTS
// ===========================

const CONSTANTS = {
	PRISM_CDN_BASE: "https://cdn.jsdelivr.net/npm/prismjs@1.29.0/themes/prism-",
	DEFAULT_THEME: "tomorrow",
	DEFAULT_TITLE: "portfolio.example.com",
	DEFAULT_EMAIL: "contact@example.com",
	GITHUB_RAW_BASE: "https://raw.githubusercontent.com",
	MOBILE_BREAKPOINT: 767,
	PRELOAD_DELAY: 100,
	BLUR_DELAY: 100,
	THEME_APPLY_DELAY: 200,
};

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

	socialLink: ({
		href = "#",
		onclick = "",
		target = "",
		rel = "",
		"aria-label": ariaLabel = "",
		icon,
	}) =>
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

	loadingSpinner: () => '<div class="loading-spinner">Loading...</div>',

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

	githubReadmeError: () => "<p>Error loading README from GitHub.</p>",

	projectLinksSection: (linksHtml) => `
        <div class="markdown-body">
            <h2>Links</h2>
            <div class="download-buttons">${linksHtml}</div>
        </div>`,

	projectHeader: (title, description, tags) => `
        <h1 class="project-title">${title}</h1>
        <p class="project-description">${description}</p>
        <div class="project-tags">${tags.map((tag) => `<span class="item-tag">${tag}</span>`).join(" ")}</div>`,

	mediaSection: (videosHtml) => `
        <div class="markdown-body">
            <h2>Media</h2>
            ${videosHtml}
        </div>`,
};

// ===========================
// APPLICATION CODE
// ===========================

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Get the Prism theme URL for syntax highlighting
 * @param {string} themeName - The theme name
 * @returns {string} The complete URL to the theme CSS
 */
const getPrismThemeUrl = (themeName) =>
	`${CONSTANTS.PRISM_CDN_BASE}${themeName}.min.css`;

/**
 * Handle email click events with fallback
 * @param {Event} event - The click event
 * @returns {Promise<boolean>} Always returns false to prevent default behavior
 */
const Email = async (event) => {
	try {
		event?.preventDefault?.();
		event?.stopPropagation?.();

		const data = projectsData || (await loadProjectsData().catch(() => null));
		const email = data?.site?.email;
		window.location.href = email
			? `mailto:${email.name}@${email.domain}`
			: `mailto:${CONSTANTS.DEFAULT_EMAIL}`;
	} catch (error) {
		console.error("Error handling email click:", error);
		window.location.href = `mailto:${CONSTANTS.DEFAULT_EMAIL}`;
	}
	return false;
};

// Make globally available for onclick handlers
window.Email = Email;

/**
 * Apply Prism theme to all zero-md elements
 * @param {string} themeName - The theme name to apply
 */
const applyThemeToZeroMd = (
	themeName = projectsData?.site?.colors?.code?.theme ||
		CONSTANTS.DEFAULT_THEME,
) => {
	try {
		if (!themeName) return;
		const themeUrl = getPrismThemeUrl(themeName);
		document.querySelectorAll("zero-md").forEach((el) => {
			el.setAttribute("css-urls", JSON.stringify([themeUrl]));
		});
	} catch (error) {
		console.error("Error applying theme to zero-md elements:", error);
	}
};

/**
 * Update page meta tags from site data
 * @param {Object} siteData - Site configuration data
 */
const updateMetaTags = (siteData) => {
	if (!siteData) return;

	if (siteData.title) document.title = siteData.title;

	const metaUpdates = [
		{ selector: 'meta[name="description"]', value: siteData.description },
		{ selector: 'meta[name="author"]', value: siteData.author },
		{ selector: 'meta[name="theme-color"]', value: siteData.colors?.primary },
		{
			selector: 'meta[name="msapplication-TileColor"]',
			value: siteData.colors?.primary,
		},
	];

	metaUpdates.forEach(({ selector, value }) => {
		if (value) document.querySelector(selector)?.setAttribute("content", value);
	});
};

/**
 * Request fullscreen for demo iframe
 */
const fullscreen = () => {
	try {
		const iframe = document.getElementById("demo");
		if (!iframe) {
			console.warn("Demo iframe not found for fullscreen request");
			return;
		}

		const request =
			iframe.requestFullscreen ||
			iframe.webkitRequestFullscreen ||
			iframe.mozRequestFullScreen ||
			iframe.msRequestFullscreen;

		if (request) {
			request.call(iframe);
		} else {
			console.warn("Fullscreen API not supported by this browser");
		}
	} catch (error) {
		console.error("Error requesting fullscreen:", error);
	}
};

window.fullscreen = fullscreen;

/**
 * Mobile menu management with Bootstrap integration
 */
const MobileMenu = {
	close() {
		const collapseElement = document.querySelector(".navbar-collapse");
		const navbarToggle = document.querySelector(".navbar-toggler");

		if (collapseElement) {
			const bsCollapse = bootstrap.Collapse.getInstance(collapseElement);
			bsCollapse ? bsCollapse.hide() : collapseElement.classList.remove("show");
		}

		if (navbarToggle) {
			navbarToggle.classList.add("collapsed");
			navbarToggle.setAttribute("aria-expanded", "false");
		}
	},

	/**
	 * Add click handler to element for mobile menu management
	 * @param {HTMLElement} element - Element to add handler to
	 */
	addClickHandler(element) {
		element.addEventListener("click", () => {
			if (
				!element.classList.contains("dropdown-toggle") &&
				!element.hasAttribute("data-keep-menu")
			) {
				this.close();
			}
			setTimeout(() => element.blur(), CONSTANTS.BLUR_DELAY);
		});
	},
};

window.closeMobileMenu = () => MobileMenu.close();

// ===========================
// GITHUB API INTEGRATION
// ===========================

/**
 * Fetch GitHub README with caching and fallback branches
 * @param {string} repoName - Repository name
 * @returns {Promise<string|null>} README content or null if not found
 */
const fetchGitHubReadme = async (repoName) => {
	if (readmeCache.has(repoName)) return readmeCache.get(repoName);

	const data = projectsData || (await loadProjectsData());
	const username = data?.site?.github_username || "seriva";
	const branches = ["master", "main"];

	for (const branch of branches) {
		try {
			const url = `${CONSTANTS.GITHUB_RAW_BASE}/${username}/${repoName}/${branch}/README.md`;
			const response = await fetch(url);
			if (response.ok) {
				const content = await response.text();
				readmeCache.set(repoName, content);
				return content;
			}
		} catch (error) {
			console.error(
				`Error fetching README for ${repoName} from ${branch}:`,
				error,
			);
		}
	}

	return null;
};

/**
 * Preload GitHub READMEs with rate limiting to improve performance
 */
const preloadGitHubReadmes = async () => {
	const data = projectsData || (await loadProjectsData());
	const repos =
		data?.projects?.filter((p) => p.github_repo).map((p) => p.github_repo) ||
		[];

	for (const repo of repos) {
		await new Promise((resolve) =>
			setTimeout(resolve, CONSTANTS.PRELOAD_DELAY),
		);
		fetchGitHubReadme(repo).catch(() => {});
	}
};

/**
 * Load GitHub README content into specified container
 * @param {string} repoName - Repository name
 * @param {string} containerId - Container element ID
 */
export const loadGitHubReadme = async (repoName, containerId) => {
	try {
		const container = document.getElementById(containerId);
		if (!container) {
			console.warn(`Container with ID '${containerId}' not found`);
			return;
		}

		const content = await fetchGitHubReadme(repoName);
		const themeName =
			projectsData?.site?.colors?.code?.theme || CONSTANTS.DEFAULT_THEME;

		container.innerHTML = content
			? Templates.zeroMd(content, getPrismThemeUrl(themeName))
			: Templates.githubReadmeError();
	} catch (error) {
		console.error(`Error loading GitHub README for ${repoName}:`, error);
		const container = document.getElementById(containerId);
		if (container) {
			container.innerHTML = Templates.githubReadmeError();
		}
	}
};

// ===========================
// STATE MANAGEMENT
// ===========================

// Global state variables for application data
let projectsData = null;
let dataLoadPromise = null;
const readmeCache = new Map();

// ===========================
// DOM MANAGEMENT
// ===========================

/**
 * Enhanced DOM element caching for performance
 */
const DOMCache = {
	navbar: null,
	main: null,
	dropdownMenu: null,

	/**
	 * Initialize DOM cache
	 */
	init() {
		this.navbar = document.getElementById("navbar-container");
		this.main = document.getElementById("main-content");
	},

	/**
	 * Get projects dropdown menu element with lazy loading
	 * @returns {HTMLElement|null}
	 */
	getDropdown() {
		if (!this.dropdownMenu) {
			this.dropdownMenu = document.getElementById("projects-dropdown");
		}
		return this.dropdownMenu;
	},
};

// ===========================
// NAVIGATION & UI FUNCTIONS
// ===========================

/**
 * Create navbar HTML structure
 * @param {Array} pages - Array of page objects
 * @param {Array} socialLinks - Array of social link objects
 * @param {string} siteTitle - Site title
 * @returns {string} Complete navbar HTML
 */
const createNavbar = (
	pages = [],
	socialLinks = [],
	siteTitle = "portfolio.example.com",
) => {
	const pageLinks = pages
		.filter((page) => page.showInNav)
		.sort((a, b) => a.order - b.order)
		.map((page) => Templates.pageLink(page.id, page.title))
		.join("");

	const socialLinksHtml = socialLinks
		.map((link) => Templates.socialLink(link))
		.join("");

	return Templates.navbar(pageLinks, socialLinksHtml, siteTitle);
};

/**
 * Inject navbar into the page with event handlers
 */
const injectNavbar = async () => {
	if (!DOMCache.navbar) return;

	const data = projectsData || (await loadProjectsData());
	const pages = data?.pages
		? Object.entries(data.pages).map(([id, page]) => ({ id, ...page }))
		: [];

	DOMCache.navbar.innerHTML = createNavbar(
		pages,
		data?.site?.social || [],
		data?.site?.title || CONSTANTS.DEFAULT_TITLE,
	);

	// Initialize Bootstrap dropdowns
	document.querySelectorAll(".dropdown-toggle").forEach((el) => {
		new bootstrap.Dropdown(el);
	});

	// Add mobile menu click handlers
	DOMCache.navbar.querySelectorAll("a").forEach((link) => {
		MobileMenu.addClickHandler(link);
	});

	// Handle mobile menu button blur
	const toggleBtn = DOMCache.navbar.querySelector(".navbar-toggler");
	if (toggleBtn) {
		toggleBtn.addEventListener("click", () =>
			setTimeout(() => toggleBtn.blur(), CONSTANTS.BLUR_DELAY),
		);
	}
};

// ===========================
// DATA LOADING & MANAGEMENT
// ===========================

/**
 * Load content data from YAML with caching and error handling
 * @returns {Promise<Object|null>} Projects data or null on error
 */
export const loadProjectsData = async () => {
	if (projectsData) return projectsData;
	if (dataLoadPromise) return dataLoadPromise;

	const yamlPath = window.location.pathname.includes("/project/")
		? "../data/content.yaml"
		: "data/content.yaml";

	dataLoadPromise = fetch(yamlPath)
		.then((response) => {
			if (!response.ok)
				throw new Error(`HTTP error! status: ${response.status}`);
			return response.text();
		})
		.then((yamlText) => {
			projectsData = jsyaml.load(yamlText);
			if (projectsData?.site?.colors) {
				applyColorScheme(projectsData.site.colors);
				setTimeout(() => applyThemeToZeroMd(), CONSTANTS.THEME_APPLY_DELAY);
			}
			return projectsData;
		})
		.catch((error) => {
			console.error("Failed to load YAML content data:", error);
			return null;
		});

	return dataLoadPromise;
};

/**
 * Apply color scheme from configuration to CSS custom properties
 * @param {Object} colors - Color configuration object
 */
const applyColorScheme = (colors) => {
	if (!colors) return;

	const colorMappings = {
		"--accent": colors.primary,
		"--font-color": colors.text,
		"--background-color": colors.background,
		"--header-color": colors.secondary,
		"--header-font-color": colors.text,
		"--text-color": colors.text,
		"--text-light": colors.textLight,
		"--border-color": colors.border,
		"--hover-color": colors.hover,
		"--accent-color": colors.accent,
	};

	const root = document.documentElement;
	Object.entries(colorMappings).forEach(([property, value]) => {
		if (value) root.style.setProperty(property, value);
	});

	if (colors.code?.theme) applyThemeToZeroMd(colors.code.theme);
};

// ===========================
// PROJECT MANAGEMENT FUNCTIONS
// ===========================

/**
 * Get a specific project by ID
 * @param {string} projectId - Project identifier
 * @returns {Promise<Object|null>} Project object or null if not found
 */
export const getProject = async (projectId) => {
	const data = await loadProjectsData();
	return data?.projects?.find((project) => project.id === projectId) || null;
};

/**
 * Load project links dynamically into specified container
 * @param {string} projectId - Project identifier
 * @param {string} containerId - Container element ID
 */
export const loadProjectLinks = async (projectId, containerId) => {
	try {
		const container = document.getElementById(containerId);
		if (!container) {
			console.warn(`Container with ID '${containerId}' not found`);
			return;
		}

		const project = await getProject(projectId);
		if (!project?.links) {
			container.style.display = "none";
			return;
		}

		const linksHtml = project.links
			.map((link) => Templates.projectLink(link))
			.join("");
		container.innerHTML = Templates.projectLinksSection(linksHtml);
	} catch (error) {
		console.error(`Error loading project links for ${projectId}:`, error);
		const container = document.getElementById(containerId);
		if (container) {
			container.style.display = "none";
		}
	}
};

/**
 * Set page title from data or use default
 * @param {Object} data - Site data
 */
const setPageTitle = (data) => {
	document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;
};

/**
 * Load a generic page by ID
 * @param {string} pageId - Page identifier
 */
export const loadPage = async (pageId) => {
	const data = projectsData || (await loadProjectsData());
	if (!DOMCache.main) return;

	setPageTitle(data);
	DOMCache.main.innerHTML =
		data?.pages?.[pageId]?.content ||
		Templates.errorMessage(
			"Page Not Found",
			"The requested page could not be found.",
		);
};

/**
 * Load individual project page with all sections
 * @param {string} projectId - Project identifier
 */
export const loadProjectPage = async (projectId) => {
	if (!DOMCache.main) return;

	const project = await getProject(projectId);
	if (!project) {
		DOMCache.main.innerHTML = Templates.errorMessage(
			"Project not found",
			"The requested project could not be found.",
		);
		return;
	}

	setPageTitle(projectsData);

	const parts = [
		Templates.projectHeader(project.title, project.description, project.tags),
	];

	if (project.github_repo)
		parts.push(Templates.githubReadme(project.github_repo));
	if (project.youtube_videos?.length) {
		const videos = project.youtube_videos
			.map((id) => Templates.youtubeVideo(id))
			.join("");
		parts.push(Templates.mediaSection(videos));
	}
	if (project.demo_url) parts.push(Templates.demoIframe(project.demo_url));

	parts.push(Templates.projectLinks(project.id));
	DOMCache.main.innerHTML = parts.join("");
};

/**
 * Populate projects dropdown menu with all projects
 */
export const loadProjectsDropdown = async () => {
	const dropdown = DOMCache.getDropdown();
	const data = projectsData || (await loadProjectsData());
	if (!data?.projects || !dropdown) return;

	dropdown.innerHTML = data.projects
		.sort((a, b) => a.weight - b.weight)
		.map((p) => Templates.projectDropdownItem(p.id, p.title))
		.join("");

	dropdown.querySelectorAll("a").forEach(MobileMenu.addClickHandler);
};

/**
 * Load additional content like GitHub READMEs and project links
 */
export const loadAdditionalContent = () => {
	const readme = document.getElementById("github-readme");
	const links = document.getElementById("project-links");

	if (readme?.dataset.repo)
		loadGitHubReadme(readme.dataset.repo, "github-readme");
	if (links?.dataset.project)
		loadProjectLinks(links.dataset.project, "project-links");
};

// ===========================
// ROUTING & PAGE MANAGEMENT
// ===========================

/**
 * Handle SPA routing based on URL parameters
 */
const handleRoute = async () => {
	MobileMenu.close();

	if (DOMCache.main) DOMCache.main.innerHTML = Templates.loadingSpinner();

	const params = new URLSearchParams(window.location.search);
	const projectId = params.get("id");
	const pageId = params.get("page");

	try {
		const data = projectsData || (await loadProjectsData());

		if (projectId) {
			await loadProjectPage(projectId);
			loadAdditionalContent();
		} else if (pageId) {
			await loadPage(pageId);
		} else {
			const defaultPage =
				Object.keys(data.pages).find((id) => data.pages[id].default) ||
				Object.keys(data.pages)[0];
			await loadPage(defaultPage);
		}
	} catch (error) {
		console.error("Error loading page:", error);
		if (DOMCache.main) {
			DOMCache.main.innerHTML = Templates.errorMessage(
				"Error loading page",
				"Please try refreshing the page.",
			);
		}
		setPageTitle(projectsData);
	}
};

// ===========================
// APPLICATION INITIALIZATION
// ===========================

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", async () => {
	try {
		DOMCache.init();

		const data = await loadProjectsData();
		if (data?.site) updateMetaTags(data.site);

		await injectNavbar();
		await loadProjectsDropdown();
		await handleRoute();

		window.addEventListener("popstate", handleRoute);
		updateNavbarLinks();
		addMobileMenuOutsideClickHandler();

		// Preload GitHub READMEs in the background
		preloadGitHubReadmes();
	} catch (error) {
		console.error("Error initializing page:", error);
		if (DOMCache.main) {
			DOMCache.main.innerHTML = Templates.errorMessage(
				"Something went wrong",
				"Please refresh the page to try again.",
			);
		}
	}
});

/**
 * Update navbar links to handle SPA routing
 */
const updateNavbarLinks = () => {
	document.querySelectorAll("[data-spa-route]").forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			MobileMenu.close();
			window.history.pushState({}, "", link.getAttribute("href"));
			document.querySelectorAll(".navbar-nav a").forEach((l) => {
				l.classList.remove("active");
			});
			link.classList.add("active");
			handleRoute();
		});
	});
};

/**
 * Add click handler to close mobile menu when clicking outside
 */
const addMobileMenuOutsideClickHandler = () => {
	document.addEventListener("click", (event) => {
		if (
			window.innerWidth <= CONSTANTS.MOBILE_BREAKPOINT &&
			DOMCache.navbar &&
			!DOMCache.navbar.contains(event.target)
		) {
			MobileMenu.close();
		}
	});
};
