// ===========================
// CONSTANTS
// ===========================

const CONSTANTS = {
	HLJS_CDN_BASE: "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/",
	DEFAULT_THEME: "github-dark", // Highlight.js theme
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
	navbar: (
		blogLink,
		projectsDropdown,
		pageLinks,
		socialLinksHtml,
		siteTitle,
	) => `
    <nav class="navbar navbar-expand-md navbar-dark fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand d-md-none" href="#">${siteTitle}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    ${blogLink}
                    ${projectsDropdown}
                    ${pageLinks}
                </ul>
                <ul class="navbar-nav ms-auto">
                    ${socialLinksHtml}
                </ul>
            </div>
        </div>
    </nav>
    `,

	pageLink: (pageId, pageTitle) => {
		const href = pageId === "blog" ? "/?blog" : `/?page=${pageId}`;
		return `<li class="nav-item navbar-menu"><a class="nav-link" href="${href}" data-spa-route="page">${pageTitle}</a></li>`;
	},

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
		`<li><a class="dropdown-item" href="/?project=${projectId}" data-spa-route="project">${projectTitle}</a></li>`,

	projectsDropdown: () => `
		<li class="nav-item navbar-menu dropdown">
			<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				Projects
			</a>
			<ul class="dropdown-menu" id="projects-dropdown">
				<li><a class="dropdown-item" href="#">Loading projects...</a></li>
			</ul>
		</li>
	`,

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

	blogPostCard: (post, index) => `
        <article class="blog-post-card" data-index="${index}">
            <h2 class="blog-post-title">
                <a href="/?blog=${post.slug}" data-spa-route="blog">${post.title}</a>
            </h2>
            <div class="blog-post-meta">
                <span class="blog-post-date"><i class="far fa-calendar"></i> ${post.date}</span>
                ${post.tags?.length ? `<span class="blog-post-tags">${post.tags.map((tag) => `<span class="item-tag">${tag}</span>`).join(" ")}</span>` : ""}
            </div>
            <p class="blog-post-excerpt">${post.excerpt}</p>
            <a href="/?blog=${post.slug}" class="blog-read-more" data-spa-route="blog">Read more →</a>
        </article>`,

	blogPagination: (currentPage, totalPages) => {
		if (totalPages <= 1) return "";

		let html =
			'<nav class="blog-pagination" aria-label="Blog pagination"><ul class="pagination">';

		// Previous button
		html += `<li class="page-item ${currentPage === 1 ? "disabled" : ""}">
            <a class="page-link" href="/?blog&p=${currentPage - 1}" data-spa-route="page" aria-label="Previous">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>`;

		// Page numbers
		for (let i = 1; i <= totalPages; i++) {
			if (
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - 1 && i <= currentPage + 1)
			) {
				html += `<li class="page-item ${i === currentPage ? "active" : ""}">
                    <a class="page-link" href="/?blog&p=${i}" data-spa-route="page">${i}</a>
                </li>`;
			} else if (i === currentPage - 2 || i === currentPage + 2) {
				html +=
					'<li class="page-item disabled"><span class="page-link">...</span></li>';
			}
		}

		// Next button
		html += `<li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
            <a class="page-link" href="/?blog&p=${currentPage + 1}" data-spa-route="page" aria-label="Next">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>`;

		html += "</ul></nav>";
		return html;
	},

	blogPost: (post, content, themeUrl, colors) => `
        <article class="blog-post-full">
            <h1 class="project-title">${post.title}</h1>
            <p class="project-description">${post.date}</p>
            ${post.tags?.length ? `<div class="project-tags">${post.tags.map((tag) => `<span class="item-tag">${tag}</span>`).join(" ")}</div>` : ""}
            <div class="blog-post-content">
                ${Templates.zeroMd(content, themeUrl, colors)}
            </div>
            <footer class="blog-post-footer">
                <a href="/?blog" class="blog-back-link" data-spa-route="page">← Back to Blog</a>
            </footer>
        </article>`,

	loadingSpinner: () => '<div class="loading-spinner">Loading...</div>',

	errorMessage: (title, message) => `
        <div class="error-message">
            <h1>${title}</h1>
            <p>${message}</p>
        </div>`,

	zeroMd: (content, themeUrl, colors) => `
        <zero-md>
            <script type="text/markdown">${content}</script>
            <template data-append>
                <link rel="stylesheet" href="${themeUrl}">
                <style>
                    /* Essential shadow DOM styles - matches main.css .markdown-body */
                    :host {
                        display: block;
                        width: 100%;
                        background-color: transparent;
                    }
                    
                    /* Base markdown-body styling */
                    .markdown-body {
                        font-family: "Raleway", sans-serif;
                        font-size: 1em;
                        line-height: 1.6;
                        color: ${colors.textLight};
                        text-align: left;
                        background-color: transparent;
                    }
                    
                    /* Heading styles - remove default borders and set colors */
                    .markdown-body h1,
                    .markdown-body h2,
                    .markdown-body h3,
                    .markdown-body h4,
                    .markdown-body h5,
                    .markdown-body h6 {
                        color: ${colors.text};
                        margin: 1em 0 0.5em;
                        font-weight: bold;
                        line-height: 1.25;
                        border-bottom: none !important;
                        text-decoration: none;
                        background-color: transparent;
                    }
                    
                    .markdown-body h1 { font-size: 1.8em; margin-top: 0; }
                    .markdown-body h2 { font-size: 1.4em; }
                    .markdown-body h3 { font-size: 1.2em; }
                    .markdown-body h4 { font-size: 1.1em; }
                    
                    /* Paragraph and list text */
                    .markdown-body p,
                    .markdown-body li {
                        margin: 0.5em 0;
                        line-height: 1.6;
                        font-size: 1.1em;
                        color: ${colors.textLight};
                    }
                    
                    .markdown-body ul,
                    .markdown-body ol {
                        margin: 0.5em 0;
                        padding-left: 2em;
                    }
                    
                    .markdown-body li {
                        margin: 0.25em 0;
                    }
                    
                    /* Links */
                    .markdown-body a {
                        color: ${colors.primary};
                        text-decoration: none;
                        display: inline-block;
                        transition: transform 0.2s ease;
                    }
                    
                    .markdown-body a:hover {
                        text-decoration: none;
                        transform: translateY(-2px);
                    }
                </style>
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

	footer: (authorName, currentYear) => `
        <footer class="footer mt-auto py-1" style="background-color: var(--header-color); border-top: var(--border-width) solid var(--accent);">
            <div class="container-fluid" style="max-width: 1000px;">
                <p class="text-center mb-0" style="color: var(--text-light); font-size: 0.9em;">
                    &copy; ${currentYear} ${authorName}. All rights reserved.
                </p>
            </div>
        </footer>`,
};

// ===========================
// APPLICATION CODE
// ===========================

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Get the Highlight.js theme URL for syntax highlighting (zero-md v3)
 * @param {string} themeName - The Highlight.js theme name
 * @returns {string} The complete URL to the theme CSS
 */
const getHljsThemeUrl = (themeName) =>
	`${CONSTANTS.HLJS_CDN_BASE}${themeName}.min.css`; /**
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
 * Apply Highlight.js theme to all zero-md elements (zero-md v3)
 * @param {string} themeName - The theme name to apply
 */
const applyThemeToZeroMd = (
	themeName = projectsData?.site?.colors?.code?.theme ||
		CONSTANTS.DEFAULT_THEME,
) => {
	try {
		if (!themeName) return;
		const themeUrl = getHljsThemeUrl(themeName);

		document.querySelectorAll("zero-md").forEach((el) => {
			// For v3, we need to recreate the element to update the theme
			// Since shadow DOM is sealed, we trigger a re-render
			const template = el.querySelector("template[data-append]");
			if (template) {
				// Update the Highlight.js theme link in the template
				const existingLinks = template.content.querySelectorAll(
					'link[href*="highlight.js"], link[href*="hljs"]',
				);
				existingLinks.forEach((link) => {
					link.href = themeUrl;
				});

				// If no existing link, add one
				if (existingLinks.length === 0) {
					const link = document.createElement("link");
					link.rel = "stylesheet";
					link.href = themeUrl;
					template.content.appendChild(link);
				}

				// Force re-render by temporarily removing and re-adding
				const parent = el.parentNode;
				const nextSibling = el.nextSibling;
				parent.removeChild(el);
				setTimeout(() => {
					parent.insertBefore(el, nextSibling);
				}, 10);
			}
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
				MobileMenu.close();
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
		const colors = projectsData?.site?.colors || {};

		container.innerHTML = content
			? Templates.zeroMd(content, getHljsThemeUrl(themeName), colors)
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
	footer: null,
	dropdownMenu: null,
	navbarLinks: null,

	/**
	 * Initialize DOM cache
	 */
	init() {
		this.navbar = document.getElementById("navbar-container");
		this.main = document.getElementById("main-content");
		this.footer = document.getElementById("footer-container");
	},

	/**
	 * Clear cached navbar-related elements (call after navbar rebuild)
	 */
	clearNavbarCache() {
		this.dropdownMenu = null;
		this.navbarLinks = null;
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
 * @param {Array} pages - Array of page objects (includes blog if configured)
 * @param {Array} socialLinks - Array of social link objects
 * @param {string} siteTitle - Site title
 * @returns {string} Complete navbar HTML
 */
const createNavbar = (
	pages = [],
	socialLinks = [],
	siteTitle = "portfolio.example.com",
) => {
	// Separate blog from other pages
	const blogPage = pages.find((page) => page.id === "blog");
	const otherPages = pages.filter((page) => page.id !== "blog");

	// Create blog link if it exists
	const blogLink = blogPage
		? Templates.pageLink(blogPage.id, blogPage.title)
		: "";

	// Create projects dropdown (always present)
	const projectsDropdown = Templates.projectsDropdown();

	// Create page links (sorted by order)
	const pageLinks = otherPages
		.filter((page) => page.showInNav)
		.sort((a, b) => a.order - b.order)
		.map((page) => Templates.pageLink(page.id, page.title))
		.join("");

	const socialLinksHtml = socialLinks
		.map((link) => Templates.socialLink(link))
		.join("");

	return Templates.navbar(
		blogLink,
		projectsDropdown,
		pageLinks,
		socialLinksHtml,
		siteTitle,
	);
};

/**
 * Get current year from a reliable time server with fallback
 * @returns {Promise<number>} Current year
 */
const getCurrentYear = async () => {
	try {
		// Try to get time from WorldTimeAPI (free and reliable)
		const response = await fetch("https://worldtimeapi.org/api/timezone/UTC", {
			method: "GET",
			cache: "no-cache",
		});

		if (response.ok) {
			const data = await response.json();
			const serverDate = new Date(data.datetime);
			return serverDate.getFullYear();
		}
	} catch (error) {
		console.warn(
			"Failed to fetch server time, using local time as fallback:",
			error,
		);
	}

	// Fallback to local system time
	return new Date().getFullYear();
};

/**
 * Inject footer into the page
 */
const injectFooter = async () => {
	if (!DOMCache.footer) return;

	const data = projectsData || (await loadProjectsData());
	const authorName = data?.site?.author || "Portfolio Owner";
	const currentYear = await getCurrentYear();

	DOMCache.footer.innerHTML = Templates.footer(authorName, currentYear);
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

	// Add blog as a navigation item if configured
	if (data?.blog?.showInNav) {
		pages.push({
			id: "blog",
			title: data.blog.title || "Blog",
			showInNav: true,
		});
	}

	DOMCache.navbar.innerHTML = createNavbar(
		pages,
		data?.site?.social || [],
		data?.site?.title || CONSTANTS.DEFAULT_TITLE,
	);

	// Clear cached navbar elements after rebuild
	DOMCache.clearNavbarCache();

	// Initialize Bootstrap dropdowns
	document.querySelectorAll(".dropdown-toggle").forEach((el) => {
		new bootstrap.Dropdown(el);
	});

	// Add mobile menu click handlers
	for (const link of DOMCache.navbar.querySelectorAll("a")) {
		MobileMenu.addClickHandler(link);
	}

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
	};

	const root = document.documentElement;
	Object.entries(colorMappings).forEach(([property, value]) => {
		if (value) root.style.setProperty(property, value);
	});

	if (colors.code?.theme) applyThemeToZeroMd(colors.code.theme);
};

// ===========================
// BLOG MANAGEMENT FUNCTIONS
// ===========================

/**
 * Parse blog post frontmatter and content
 * @param {string} markdown - Raw markdown with frontmatter
 * @returns {Object} Parsed post object with metadata and content
 */
const parseBlogPost = (markdown) => {
	const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
	const match = markdown.match(frontmatterRegex);

	if (!match) {
		return { metadata: {}, content: markdown };
	}

	const [, frontmatter, content] = match;
	const metadata = {};

	frontmatter.split("\n").forEach((line) => {
		const [key, ...valueParts] = line.split(":");
		if (key && valueParts.length) {
			const value = valueParts.join(":").trim();
			// Handle arrays in frontmatter
			if (value.startsWith("[") && value.endsWith("]")) {
				metadata[key.trim()] = JSON.parse(value.replace(/'/g, '"'));
			} else {
				metadata[key.trim()] = value.replace(/^["']|["']$/g, "");
			}
		}
	});

	return { metadata, content: content.trim() };
};

/**
 * Load all blog posts from the blog directory
 * @returns {Promise<Array>} Array of blog post objects
 */
const loadBlogPosts = async () => {
	try {
		// Get blog post list from content.yaml
		const data = projectsData || (await loadProjectsData());
		const postFiles = data?.blog?.posts || [];

		if (postFiles.length === 0) {
			console.info("No blog posts configured in content.yaml");
			return [];
		}

		// Use Promise.allSettled for better error resilience
		const results = await Promise.allSettled(
			postFiles.map(async (filename) => {
				const response = await fetch(`data/blog/${filename}`);
				if (!response.ok) {
					throw new Error(`Blog post not found: ${filename}`);
				}

				const markdown = await response.text();
				const { metadata, content } = parseBlogPost(markdown);

				const slug = filename.replace(/\.md$/, "");

				return {
					slug,
					title: metadata.title || "Untitled",
					date: metadata.date || "",
					excerpt: metadata.excerpt || "",
					tags: metadata.tags || [],
					content,
					filename,
				};
			}),
		);

		// Extract successful results and log failures
		const posts = results
			.map((result, index) => {
				if (result.status === "fulfilled") {
					return result.value;
				}
				console.warn(
					`Failed to load blog post ${postFiles[index]}:`,
					result.reason,
				);
				return null;
			})
			.filter((post) => post !== null);

		// Sort by date (newest first)
		return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
	} catch (error) {
		console.error("Error loading blog posts:", error);
		return [];
	}
};

/**
 * Load blog listing page with pagination
 * @param {number} page - Page number (1-indexed)
 */
export const loadBlogPage = async (page = 1) => {
	if (!DOMCache.main) return;

	const data = projectsData || (await loadProjectsData());
	setPageTitle(data);

	DOMCache.main.innerHTML = Templates.loadingSpinner();

	const posts = await loadBlogPosts();
	const postsPerPage = data?.blog?.postsPerPage || 5;
	const totalPages = Math.ceil(posts.length / postsPerPage);
	const currentPage = Math.max(1, Math.min(page, totalPages));

	const startIndex = (currentPage - 1) * postsPerPage;
	const endIndex = startIndex + postsPerPage;
	const pagePosts = posts.slice(startIndex, endIndex);

	if (pagePosts.length === 0) {
		DOMCache.main.innerHTML = `
			<div class="blog-container">
				<p class="blog-empty">No blog posts yet. Check back soon!</p>
			</div>`;
		return;
	}

	const postsHtml = pagePosts
		.map((post, index) => Templates.blogPostCard(post, startIndex + index))
		.join("");

	const paginationHtml = Templates.blogPagination(currentPage, totalPages);

	DOMCache.main.innerHTML = `
		<div class="blog-container">
			<div class="blog-posts">
				${postsHtml}
			</div>
			${paginationHtml}
		</div>`;

	// Add SPA routing to blog links
	updateNavbarLinks();
};

/**
 * Load individual blog post
 * @param {string} slug - Blog post slug
 */
export const loadBlogPost = async (slug) => {
	if (!DOMCache.main) return;

	const data = projectsData || (await loadProjectsData());
	setPageTitle(data);

	DOMCache.main.innerHTML = Templates.loadingSpinner();

	const posts = await loadBlogPosts();
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		DOMCache.main.innerHTML = Templates.errorMessage(
			"Blog Post Not Found",
			"The requested blog post could not be found.",
		);
		return;
	}

	const themeName = data?.site?.colors?.code?.theme || CONSTANTS.DEFAULT_THEME;
	const colors = data?.site?.colors || {};

	DOMCache.main.innerHTML = Templates.blogPost(
		post,
		post.content,
		getHljsThemeUrl(themeName),
		colors,
	);

	// Add SPA routing to back link
	updateNavbarLinks();
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
		.sort((a, b) => a.order - b.order)
		.map((p) => Templates.projectDropdownItem(p.id, p.title))
		.join("");

	for (const link of dropdown.querySelectorAll("a")) {
		MobileMenu.addClickHandler(link);
	}
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
	const projectId = params.get("project");
	const pageId = params.get("page");
	const blogParam = params.get("blog");
	const blogPageNum = params.get("p");

	try {
		const data = projectsData || (await loadProjectsData());

		if (blogParam !== null) {
			// blog parameter exists
			if (blogParam === "") {
				// /?blog or /?blog&p=2 - Blog listing
				const page = blogPageNum ? parseInt(blogPageNum, 10) : 1;
				await loadBlogPage(page);
			} else {
				// /?blog=slug - Individual blog post
				await loadBlogPost(blogParam);
			}
		} else if (projectId) {
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

		// Update active nav link after route loads
		updateActiveNavLink();
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
		await injectFooter();
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
 * Update active state in navbar based on current route
 */
const updateActiveNavLink = () => {
	const params = new URLSearchParams(window.location.search);
	const pageId = params.get("page");
	const projectId = params.get("project");
	const blogParam = params.get("blog");

	// Cache navbar links to avoid multiple DOM queries
	if (!DOMCache.navbarLinks) {
		DOMCache.navbarLinks = document.querySelectorAll(".navbar-nav a");
	}

	// Remove all active states
	DOMCache.navbarLinks.forEach((l) => {
		l.classList.remove("active");
	});

	// Build selector based on current route and query once
	let activeSelector = null;
	if (blogParam !== null) {
		activeSelector = 'a[href="/?blog"]';
	} else if (pageId) {
		activeSelector = `a[href="/?page=${pageId}"]`;
	} else if (projectId) {
		activeSelector = `a[href="/?project=${projectId}"]`;
	}

	// Set active state if we have a matching route
	if (activeSelector) {
		const activeLink = document.querySelector(activeSelector);
		if (activeLink) activeLink.classList.add("active");
	}
};

/**
 * Update navbar links to handle SPA routing
 */
const updateNavbarLinks = () => {
	document.querySelectorAll("[data-spa-route]").forEach((link) => {
		link.addEventListener("click", (e) => {
			e.preventDefault();
			MobileMenu.close();
			window.history.pushState({}, "", link.getAttribute("href"));
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
