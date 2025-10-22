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
	THEME_APPLY_DELAY: 200,
	SEARCH_DEBOUNCE_MS: 300,
};

// ===========================
// UTILITY FUNCTIONS
// ===========================

/**
 * Debounce utility function
 * @param {Function} func - Function to debounce
 * @param {number} wait - Wait time in milliseconds
 * @returns {Function} Debounced function
 */
const debounce = (func, wait) => {
	let timeout;
	return (...args) => {
		clearTimeout(timeout);
		timeout = setTimeout(() => func(...args), wait);
	};
};

/**
 * Tagged template literal for safer HTML templating
 * @param {Array<string>} strings - Template string parts
 * @param {...any} values - Interpolated values
 * @returns {string} Processed HTML string
 */
const html = (strings, ...values) => {
	return strings.reduce((result, str, i) => {
		const value = values[i];
		if (value === undefined || value === null) return result + str;
		if (value?.__safe) return result + str + value.content;
		return result + str + String(value);
	}, "");
};

/**
 * Mark content as safe HTML (bypasses escaping)
 * @param {string} content - HTML content to mark as safe
 * @returns {Object} Safe content wrapper
 */
const safe = (content) => ({ __safe: true, content });

// ===========================
// INTERNATIONALIZATION (i18n)
// ===========================

const i18n = {
	currentLanguage: null,
	translations: {},

	/**
	 * Initialize i18n with configuration from YAML
	 * @param {Object} config - i18n configuration from content.yaml
	 * @param {Object} translations - Translations object from content.yaml
	 */
	init(config, translations) {
		this.currentLanguage = config?.defaultLanguage || "en";
		this.translations = translations || {};
	},

	/**
	 * Get translation for a key
	 * @param {string} key - Translation key in dot notation (e.g., 'nav.projects')
	 * @param {string} lang - Optional language code (defaults to current language)
	 * @returns {string} Translated string or key if not found
	 */
	t(key, lang = null) {
		const language = lang || this.currentLanguage;
		const keys = key.split(".");
		let value = this.translations[language];

		for (const k of keys) {
			if (value && typeof value === "object") {
				value = value[k];
			} else {
				return key; // Return key if translation not found
			}
		}

		return typeof value === "string" ? value : key;
	},

	/**
	 * Get current language
	 * @returns {string} Current language code
	 */
	getCurrentLanguage() {
		return this.currentLanguage;
	},

	/**
	 * Set current language
	 * @param {string} lang - Language code to set
	 */
	setLanguage(lang) {
		if (this.translations[lang]) {
			this.currentLanguage = lang;
			return true;
		}
		return false;
	},
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
		searchBar,
		siteTitle,
	) => html`
    <nav class="navbar navbar-expand-md navbar-dark fixed-top">
        <div class="container-fluid">
            <a class="navbar-brand d-md-none" href="#">${siteTitle}</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
                <ul class="navbar-nav me-auto">
                    ${safe(blogLink)}
                    ${safe(projectsDropdown)}
                    ${safe(pageLinks)}
                </ul>
                <ul class="navbar-nav ms-auto">
                    ${safe(searchBar)}
                    ${safe(socialLinksHtml)}
                </ul>
            </div>
        </div>
    </nav>
    `,

	pageLink: (pageId, pageTitle) => {
		const href = pageId === "blog" ? "/?blog" : `/?page=${pageId}`;
		return html`<li class="nav-item navbar-menu"><a class="nav-link" href="${href}" data-spa-route="page">${pageTitle}</a></li>`;
	},

	socialLink: ({
		href = "#",
		onclick = "",
		target = "",
		rel = "",
		"aria-label": ariaLabel = "",
		icon,
	}) =>
		html`<li class="nav-item navbar-icon"><a class="nav-link" href="${href}" ${onclick && `onclick="${onclick}"`} ${target && `target="${target}"`} ${rel && `rel="${rel}"`} ${ariaLabel && `aria-label="${ariaLabel}"`}><i class="${icon}"></i></a></li>`,

	projectDropdownItem: (projectId, projectTitle) =>
		html`<li><a class="dropdown-item" href="/?project=${projectId}" data-spa-route="project">${projectTitle}</a></li>`,

	projectsDropdown: () => html`
		<li class="nav-item navbar-menu dropdown">
			<a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
				Projects
			</a>
			<ul class="dropdown-menu" id="projects-dropdown">
				<li><a class="dropdown-item" href="#">Loading projects...</a></li>
			</ul>
		</li>
	`,

	projectLink: (link) => html`
        <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="download-btn" onclick="closeMobileMenu()">
            <i class="${link.icon}"></i>
            <span>${link.title}</span>
        </a>`,

	youtubeVideo: (videoId) => html`
        <div class="youtube-video"><div class="iframeWrapper">
            <iframe width="560" height="349" src="//www.youtube.com/embed/${videoId}?rel=0&amp;hd=1" frameborder="0" allowfullscreen></iframe>
        </div></div>`,

	demoIframe: (demoUrl) => html`
        <div class="markdown-body"><h2>${i18n.t("project.demo")}</h2>
            <p>${i18n.t("project.demoInstructions")}</p>
            <div class="iframeWrapper">
                <iframe id="demo" width="900" height="700" src="${demoUrl}" frameborder="0" allowfullscreen></iframe>
            </div><br><center><button id="fullscreen" onclick="fullscreen()"><i class="fas fa-expand"></i><span>${i18n.t("project.fullscreen")}</span></button></center>
        </div>`,

	// Simple data-attribute containers for dynamic loading
	dynamicContainer: (id, dataAttr, dataValue, loadingText = "Loading...") =>
		html`<div id="${id}" data-${dataAttr}="${dataValue}"><p>${loadingText}</p></div>`,

	// Helper for rendering tags (clickable to search by tag if search is enabled)
	tagList: (tags) =>
		safe(
			tags?.length
				? tags
						.map((tag) => {
							// Check if search is enabled in the loaded data
							const searchEnabled =
								projectsData?.site?.search?.enabled !== false;
							const clickableClass = searchEnabled ? " clickable-tag" : "";
							const onclickAttr = searchEnabled
								? ` onclick="event.stopPropagation(); searchByTag('${tag}')"`
								: "";
							return html`<span class="item-tag${clickableClass}"${onclickAttr}>${tag}</span>`;
						})
						.join(" ")
				: "",
		),

	blogPostCard: (post, index) => html`
        <article class="blog-post-card" data-index="${index}">
            <h2 class="blog-post-title">
                <a href="/?blog=${post.slug}" data-spa-route="blog">${post.title}</a>
            </h2>
            <div class="blog-post-meta">
                <span class="blog-post-date"><i class="far fa-calendar"></i> ${post.date}</span>
                ${post.tags?.length ? safe(`<span class="blog-post-tags">${Templates.tagList(post.tags).content}</span>`) : ""}
            </div>
            <p class="blog-post-excerpt">${post.excerpt}</p>
            <a href="/?blog=${post.slug}" class="blog-read-more" data-spa-route="blog">${i18n.t("blog.readMore")}</a>
        </article>`,

	blogPagination: (currentPage, totalPages) => {
		if (totalPages <= 1) return "";

		const pageNumbers = [];

		// Build page numbers array
		for (let i = 1; i <= totalPages; i++) {
			if (
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - 1 && i <= currentPage + 1)
			) {
				pageNumbers.push(html`<li class="page-item ${i === currentPage ? "active" : ""}">
                    <a class="page-link" href="/?blog&p=${i}" data-spa-route="page">${i}</a>
                </li>`);
			} else if (i === currentPage - 2 || i === currentPage + 2) {
				pageNumbers.push(
					html`<li class="page-item disabled"><span class="page-link">...</span></li>`,
				);
			}
		}

		return html`<nav class="blog-pagination" aria-label="Blog pagination"><ul class="pagination">
            <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
                <a class="page-link" href="/?blog&p=${currentPage - 1}" data-spa-route="page" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            ${safe(pageNumbers.join(""))}
            <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
                <a class="page-link" href="/?blog&p=${currentPage + 1}" data-spa-route="page" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul></nav>`;
	},

	blogPost: (post, content, themeUrl, colors) => html`
        <article class="blog-post-full">
            <h1 class="project-title">${post.title}</h1>
            <p class="project-description">${post.date}</p>
            ${post.tags?.length ? safe(`<div class="project-tags">${Templates.tagList(post.tags).content}</div>`) : ""}
            <div class="blog-post-content">
                ${safe(Templates.zeroMd(content, themeUrl, colors))}
            </div>
            <footer class="blog-post-footer">
                <a href="/?blog" class="blog-back-link" data-spa-route="page">${i18n.t("blog.backToBlog")}</a>
            </footer>
        </article>`,

	loadingSpinner: () =>
		html`<div class="loading-spinner">${i18n.t("general.loading")}</div>`,

	errorMessage: (title, message) => html`
        <div class="error-message">
            <h1>${title}</h1>
            <p>${message}</p>
        </div>`,

	zeroMd: (content, themeUrl, colors) => html`
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

	githubReadmeError: () => html`<p>${i18n.t("project.readmeError")}</p>`,

	projectLinksSection: (linksHtml) => html`
        <div class="markdown-body">
            <h2>${i18n.t("project.links")}</h2>
            <div class="download-buttons">${safe(linksHtml)}</div>
        </div>`,

	projectHeader: (title, description, tags) => html`
        <h1 class="project-title">${title}</h1>
        <p class="project-description">${description}</p>
        <div class="project-tags">${safe(Templates.tagList(tags).content)}</div>`,

	mediaSection: (videosHtml) => html`
        <div class="markdown-body">
            <h2>${i18n.t("project.media")}</h2>
            ${safe(videosHtml)}
        </div>`,

	footer: (authorName, currentYear) => html`
        <footer class="footer mt-auto py-3">
            <div class="container-fluid" style="max-width: 1000px;">
                <p class="text-center mb-0" style="color: var(--text-light); font-size: 0.9em;">
                    &copy; ${currentYear} ${authorName}. ${i18n.t("footer.rights")}.
                </p>
            </div>
        </footer>`,

	// Helper for creating search input components
	searchInput: (id, cssClass, placeholder) => html`
        <input type="search" id="${id}" class="${cssClass}" placeholder="${placeholder}" autocomplete="off" aria-label="Search"/>
        <button class="${cssClass.replace("input", "clear")}" id="${id.replace("input", "clear")}" aria-label="Clear search">
            <i class="fas fa-times"></i>
        </button>`,

	searchBar: (placeholder) => html`
        <li class="nav-item navbar-icon search-nav-item">
            <button class="nav-link search-toggle" id="search-toggle" aria-label="Search">
                <i class="fas fa-search"></i>
            </button>
            <div class="search-bar-container" id="search-bar-container">
                <div class="search-input-wrapper">
                    ${safe(Templates.searchInput("search-input", "search-input", placeholder))}
                </div>
            </div>
            <div class="search-results-dropdown" id="search-results"></div>
        </li>`,

	mobileSearchPage: (placeholder) => html`
        <div class="mobile-search-page" id="mobile-search-page">
            <div class="mobile-search-header">
                <button class="mobile-search-back" id="mobile-search-back" aria-label="Go back">
                    <i class="fas fa-arrow-left"></i>
                </button>
                <div class="mobile-search-input-wrapper">
                    ${safe(Templates.searchInput("mobile-search-input", "mobile-search-input", placeholder))}
                </div>
            </div>
            <div class="mobile-search-content">
                <div class="mobile-search-results" id="mobile-search-results"></div>
            </div>
        </div>`,

	searchResult: (item, query) => {
		const isProject = item.type === "project";
		return html`
            <a href="${item.url}" class="search-result-item" data-spa-route="${item.type}">
                <div class="result-icon"><i class="${isProject ? "fas fa-folder" : "far fa-file-alt"}"></i></div>
                <div class="result-content">
                    <div class="result-title">${safe(Search.highlight(item.title, query))}</div>
                    <div class="result-description">${safe(Search.highlight(item.description, query))}</div>
                    ${item.tags.length ? safe(`<div class="result-tags">${item.tags.map((tag) => `<span class="result-tag">${tag}</span>`).join("")}</div>`) : ""}
                </div>
                <span class="result-type${isProject ? "" : " result-type-blog"}">${isProject ? i18n.t("badges.project") : i18n.t("badges.blog")}</span>
            </a>`;
	},

	searchNoResults: () => html`
        <div class="search-no-results">
            <i class="fas fa-search"></i>
            <p>${i18n.t("search.noResults")}</p>
        </div>`,
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
		const zeroMdElements = document.querySelectorAll("zero-md");

		zeroMdElements.forEach((el) => {
			// For v3, we need to recreate the element to update the theme
			// Since shadow DOM is sealed, we trigger a re-render
			const template = el.querySelector("template[data-append]");
			if (!template) return;

			// Update the Highlight.js theme link in the template
			const existingLinks = template.content.querySelectorAll(
				'link[href*="highlight.js"], link[href*="hljs"]',
			);

			if (existingLinks.length > 0) {
				existingLinks.forEach((link) => {
					link.href = themeUrl;
				});
			} else {
				// If no existing link, add one
				const link = document.createElement("link");
				link.rel = "stylesheet";
				link.href = themeUrl;
				template.content.appendChild(link);
			}

			// Force re-render by temporarily removing and re-adding
			// Use requestAnimationFrame for smoother rendering
			const parent = el.parentNode;
			const nextSibling = el.nextSibling;
			parent.removeChild(el);
			requestAnimationFrame(() => {
				parent.insertBefore(el, nextSibling);
			});
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
			requestAnimationFrame(() => element.blur());
		});
	},
};

window.closeMobileMenu = () => MobileMenu.close();

// ===========================
// SEARCH FUNCTIONALITY
// ===========================

/**
 * Search functionality for projects and blog posts using Fuse.js
 */
const Search = {
	data: [],
	fuse: null,
	isInitialized: false,

	/**
	 * Initialize search index with projects and blog posts
	 * Uses metadata from YAML for fast indexing without loading full blog posts
	 */
	async init() {
		if (this.isInitialized) return;

		const data = await getData();
		const projects = data?.projects || [];
		const blogPosts = data?.blog?.posts || [];

		// Fetch README content for projects
		const projectsWithContent = await Promise.all(
			projects.map(async (p) => {
				let readmeContent = "";
				if (p.github_repo) {
					const readme = await fetchGitHubReadme(p.github_repo);
					readmeContent = readme || "";
				}
				return {
					id: p.id,
					title: p.title,
					description: p.description,
					tags: p.tags || [],
					content: readmeContent,
					type: "project",
					url: `/?project=${p.id}`,
				};
			}),
		);

		// Index blog posts using metadata from YAML (no need to load markdown files)
		const blogPostsIndexed = blogPosts.map((p) => {
			// Support both old format (string) and new format (object with metadata)
			if (typeof p === "string") {
				// Old format: just filename, derive slug
				const slug = p.replace(/\.md$/, "");
				return {
					id: slug,
					title: slug,
					description: "",
					tags: [],
					type: "blog",
					url: `/?blog=${slug}`,
				};
			}
			// New format: object with metadata
			const slug = p.filename.replace(/\.md$/, "");
			return {
				id: slug,
				title: p.title || slug,
				description: p.excerpt || "",
				tags: p.tags || [],
				type: "blog",
				url: `/?blog=${slug}`,
			};
		});

		// Index all searchable content
		this.data = [...projectsWithContent, ...blogPostsIndexed];

		const fuseOptions = {
			keys: [
				{ name: "title", weight: 2 },
				{ name: "description", weight: 1.5 },
				{ name: "tags", weight: 1.2 },
				{ name: "content", weight: 0.5 },
			],
			threshold: 0.4,
			distance: 100,
			minMatchCharLength: 2,
			includeScore: true,
			includeMatches: true,
		};

		this.fuse = new Fuse(this.data, fuseOptions);
		this.isInitialized = true;
	},

	/**
	 * Search through indexed data using Fuse.js
	 * @param {string} query - Search query
	 * @returns {Array} Filtered results
	 */
	search(query) {
		if (!query || query.length < 2 || !this.fuse) return [];

		const results = this.fuse.search(query, { limit: 8 });
		return results.map((result) => result.item);
	},

	/**
	 * Highlight matching text in search results
	 * @param {string} text - Text to highlight
	 * @param {string} query - Search query
	 * @returns {string} HTML with highlighted text
	 */
	highlight(text, query) {
		if (!query) return text;

		const regex = new RegExp(`(${query})`, "gi");
		return text.replace(regex, "<mark>$1</mark>");
	},
};

/**
 * Search by tag - triggers search with the tag as query
 * @param {string} tag - Tag to search for
 */
const searchByTag = (tag) => {
	const isMobile = window.innerWidth <= CONSTANTS.MOBILE_BREAKPOINT;

	if (isMobile) {
		// Mobile: open search page and populate input
		const mobileSearchPage = document.getElementById("mobile-search-page");
		const mobileSearchInput = document.getElementById("mobile-search-input");

		if (mobileSearchPage && mobileSearchInput) {
			mobileSearchPage.classList.add("show");
			mobileSearchInput.value = tag;
			requestAnimationFrame(() => {
				mobileSearchInput.focus();
				// Trigger search
				mobileSearchInput.dispatchEvent(new Event("input", { bubbles: true }));
			});
		}
	} else {
		// Desktop: open search bar and populate input
		const searchBarContainer = document.getElementById("search-bar-container");
		const searchInput = document.getElementById("search-input");

		if (searchBarContainer && searchInput) {
			// Scroll to top to ensure navbar is visible
			window.scrollTo({ top: 0, behavior: "smooth" });

			// First ensure search bar is visible (unfold animation)
			searchBarContainer.classList.add("show");

			// Set the tag value
			searchInput.value = tag;

			// Use setTimeout to ensure DOM has updated, animation started, and search is initialized
			setTimeout(() => {
				searchInput.focus();
				// Trigger search by simulating user input
				searchInput.dispatchEvent(new Event("input", { bubbles: true }));
			}, 150);
		}
	}
};

// Make searchByTag available globally for onclick handlers
window.searchByTag = searchByTag;

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

	const data = await getData();
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
	const data = await getData();
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
	const container = document.getElementById(containerId);
	if (!container) return;

	try {
		const content = await fetchGitHubReadme(repoName);
		const data = await getData();
		const themeName = getTheme(data);
		const colors = data?.site?.colors || {};

		container.innerHTML = content
			? Templates.zeroMd(content, getHljsThemeUrl(themeName), colors)
			: Templates.githubReadmeError();
	} catch (error) {
		console.error(`Error loading GitHub README for ${repoName}:`, error);
		container.innerHTML = Templates.githubReadmeError();
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
 * @param {Object} searchConfig - Search configuration
 * @param {string} siteTitle - Site title
 * @returns {string} Complete navbar HTML
 */
const createNavbar = (
	pages = [],
	socialLinks = [],
	searchConfig = {},
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

	// Create search bar if enabled
	const searchBar = searchConfig?.enabled
		? Templates.searchBar(
				searchConfig.placeholder || i18n.t("search.placeholder"),
			)
		: "";

	return Templates.navbar(
		blogLink,
		projectsDropdown,
		pageLinks,
		socialLinksHtml,
		searchBar,
		siteTitle,
	);
};

/**
 * Inject footer into the page
 */
const injectFooter = async () => {
	if (!DOMCache.footer) return;

	const data = await getData();
	const authorName = data?.site?.author || "Portfolio Owner";
	const currentYear = new Date().getFullYear();

	DOMCache.footer.innerHTML = Templates.footer(authorName, currentYear);
};

/**
 * Inject navbar into the page with event handlers
 */
const injectNavbar = async () => {
	if (!DOMCache.navbar) return;

	const data = await getData();
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
		data?.site?.search || {},
		data?.site?.title || CONSTANTS.DEFAULT_TITLE,
	);

	// Inject mobile search page if enabled
	if (data?.site?.search?.enabled) {
		const existingMobileSearch = document.getElementById("mobile-search-page");
		if (!existingMobileSearch) {
			document.body.insertAdjacentHTML(
				"beforeend",
				Templates.mobileSearchPage(
					data.site.search.placeholder || i18n.t("search.placeholder"),
				),
			);
		}
	}

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
			requestAnimationFrame(() => toggleBtn.blur()),
		);
	}

	// Initialize search if enabled
	if (data?.site?.search?.enabled) {
		initializeSearch(data.site.search);
		initializeMobileSearch(data.site.search);
	}
};

/**
 * Shared search handler function
 * @param {string} query - Search query
 * @param {HTMLElement} resultsContainer - Results container element
 * @param {Function} onResultClick - Callback for result clicks
 */
const handleSearchQuery = (query, resultsContainer, onResultClick) => {
	const results = Search.search(query);

	if (results.length > 0) {
		resultsContainer.innerHTML = results
			.map((item) => Templates.searchResult(item, query))
			.join("");
		resultsContainer.classList.add("show");

		// Add SPA routing to result links
		resultsContainer.querySelectorAll("[data-spa-route]").forEach((link) => {
			link.addEventListener("click", (e) => {
				e.preventDefault();
				onResultClick();
				window.history.pushState({}, "", link.getAttribute("href"));
				handleRoute();
			});
		});
	} else {
		resultsContainer.innerHTML = Templates.searchNoResults();
		resultsContainer.classList.add("show");
	}
};

/**
 * Initialize search functionality
 * @param {Object} searchConfig - Search configuration
 */
const initializeSearch = (searchConfig) => {
	const searchInput = document.getElementById("search-input");
	const searchResults = document.getElementById("search-results");
	const searchClear = document.getElementById("search-clear");
	const searchToggle = document.getElementById("search-toggle");
	const searchBarContainer = document.getElementById("search-bar-container");

	if (!searchInput || !searchResults || !searchToggle || !searchBarContainer)
		return;

	const minChars = searchConfig.minChars || 2;

	// Initialize search data once
	Search.init();

	// Handle search toggle button (desktop only)
	searchToggle.addEventListener("click", (e) => {
		// Only handle desktop search unfold if we're on desktop
		if (window.innerWidth >= 768) {
			e.stopPropagation();
			searchBarContainer.classList.toggle("show");
			if (searchBarContainer.classList.contains("show")) {
				requestAnimationFrame(() => searchInput.focus());
			}
		}
		// On mobile, this is handled by initializeMobileSearch
	});

	// Create debounced search handler
	const performSearch = debounce((query) => {
		handleSearchQuery(query, searchResults, () => {
			searchInput.value = "";
			searchResults.classList.remove("show");
			searchBarContainer.classList.remove("show");
		});
	}, CONSTANTS.SEARCH_DEBOUNCE_MS);

	// Handle search input
	searchInput.addEventListener("input", (e) => {
		const query = e.target.value.trim();

		if (query.length < minChars) {
			searchResults.classList.remove("show");
			return;
		}

		performSearch(query);
	});

	// Handle clear button
	if (searchClear) {
		searchClear.addEventListener("click", () => {
			searchInput.value = "";
			searchResults.classList.remove("show");
			searchInput.focus();
		});
	}

	// Close search dropdown when clicking outside
	document.addEventListener("click", (e) => {
		if (
			!searchBarContainer?.contains(e.target) &&
			!searchToggle.contains(e.target)
		) {
			searchBarContainer.classList.remove("show");
			searchResults.classList.remove("show");
		}
	});

	// Handle ESC key to close search
	searchInput.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			searchInput.value = "";
			searchResults.classList.remove("show");
			searchBarContainer.classList.remove("show");
			searchInput.blur();
		}
	});
};

/**
 * Initialize mobile search page functionality
 * @param {Object} searchConfig - Search configuration
 */
const initializeMobileSearch = (searchConfig) => {
	const mobileSearchPage = document.getElementById("mobile-search-page");
	const searchToggle = document.getElementById("search-toggle");
	const mobileSearchBack = document.getElementById("mobile-search-back");
	const mobileSearchInput = document.getElementById("mobile-search-input");
	const mobileSearchResults = document.getElementById("mobile-search-results");
	const mobileSearchClear = document.getElementById("mobile-search-clear");

	if (
		!mobileSearchPage ||
		!searchToggle ||
		!mobileSearchBack ||
		!mobileSearchInput ||
		!mobileSearchResults
	)
		return;

	const minChars = searchConfig.minChars || 2;

	const handleSearchToggleClick = (e) => {
		// Check if we're on mobile (window width < 768px)
		if (window.innerWidth < 768) {
			e.stopPropagation();
			mobileSearchPage.classList.add("show");
			requestAnimationFrame(() => mobileSearchInput.focus());
		}
		// On desktop, the desktop search handler takes care of it
	};

	searchToggle.addEventListener("click", handleSearchToggleClick);

	// Close mobile search page
	const closeMobileSearch = () => {
		mobileSearchPage.classList.remove("show");
		mobileSearchInput.value = "";
		mobileSearchResults.innerHTML = "";
	};

	mobileSearchBack.addEventListener("click", closeMobileSearch);

	// Create debounced search handler
	const performSearch = debounce((query) => {
		handleSearchQuery(query, mobileSearchResults, closeMobileSearch);
	}, CONSTANTS.SEARCH_DEBOUNCE_MS);

	// Handle search input
	mobileSearchInput.addEventListener("input", (e) => {
		const query = e.target.value.trim();

		if (query.length < minChars) {
			mobileSearchResults.innerHTML = "";
			return;
		}

		performSearch(query);
	});

	// Handle clear button
	if (mobileSearchClear) {
		mobileSearchClear.addEventListener("click", () => {
			mobileSearchInput.value = "";
			mobileSearchResults.innerHTML = "";
			mobileSearchInput.focus();
		});
	}

	// Handle ESC key to close search
	mobileSearchInput.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeMobileSearch();
		}
	});
};

// ===========================
// DATA LOADING & MANAGEMENT
// ===========================

/**
 * Load content data from YAML with caching and error handling
 * @returns {Promise<Object|null>} Projects data or null on error
 */
/**
 * Get cached projects data or load if not available
 * @returns {Promise<Object>} Projects data
 */
const getData = async () => projectsData || (await loadProjectsData());

/**
 * Get theme name from data or use default
 * @param {Object} data - Projects data
 * @returns {string} Theme name
 */
const getTheme = (data) =>
	data?.site?.colors?.code?.theme || CONSTANTS.DEFAULT_THEME;

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
			// Initialize i18n
			if (projectsData?.site?.i18n && projectsData?.translations) {
				i18n.init(projectsData.site.i18n, projectsData.translations);
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
 * Uses metadata from YAML when available for better performance
 * @returns {Promise<Array>} Array of blog post objects
 */
const loadBlogPosts = async () => {
	try {
		const data = await getData();
		const postFiles = data?.blog?.posts || [];

		if (postFiles.length === 0) {
			console.info("No blog posts configured in content.yaml");
			return [];
		}

		// Use Promise.allSettled for better error resilience
		const results = await Promise.allSettled(
			postFiles.map(async (post) => {
				// Support both old format (string) and new format (object with metadata)
				const filename = typeof post === "string" ? post : post.filename;
				const slug = filename.replace(/\.md$/, "");

				// If we have metadata in YAML, use it to avoid parsing markdown
				if (typeof post === "object" && post.title) {
					return {
						slug,
						title: post.title,
						date: post.date || "",
						excerpt: post.excerpt || "",
						tags: post.tags || [],
						content: null, // Don't load content for listing page
						filename,
					};
				}

				// Old format: fetch and parse markdown file
				const response = await fetch(`data/blog/${filename}`);
				if (!response.ok) {
					throw new Error(`Blog post not found: ${filename}`);
				}

				const markdown = await response.text();
				const { metadata, content } = parseBlogPost(markdown);

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

	const data = await getData();
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

	const data = await getData();
	setPageTitle(data);

	DOMCache.main.innerHTML = Templates.loadingSpinner();

	const posts = await loadBlogPosts();
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		DOMCache.main.innerHTML = Templates.errorMessage(
			i18n.t("general.blogNotFound"),
			i18n.t("general.blogNotFoundMessage"),
		);
		return;
	}

	// Load content if not already loaded (for YAML metadata posts)
	let content = post.content;
	if (!content && post.filename) {
		try {
			const response = await fetch(`data/blog/${post.filename}`);
			if (response.ok) {
				const markdown = await response.text();
				const parsed = parseBlogPost(markdown);
				content = parsed.content;
			}
		} catch (error) {
			console.error(`Error loading blog post content: ${post.filename}`, error);
		}
	}

	const themeName = getTheme(data);
	const colors = data?.site?.colors || {};

	DOMCache.main.innerHTML = Templates.blogPost(
		post,
		content,
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
	const container = document.getElementById(containerId);
	if (!container) return;

	try {
		const project = await getProject(projectId);
		if (!project?.links) {
			container.style.display = "none";
			return;
		}

		container.innerHTML = Templates.projectLinksSection(
			project.links.map((link) => Templates.projectLink(link)).join(""),
		);
	} catch (error) {
		console.error(`Error loading project links for ${projectId}:`, error);
		container.style.display = "none";
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
	const data = await getData();
	if (!DOMCache.main) return;

	setPageTitle(data);
	DOMCache.main.innerHTML =
		data?.pages?.[pageId]?.content ||
		Templates.errorMessage(
			i18n.t("general.notFound"),
			i18n.t("general.notFoundMessage"),
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
			i18n.t("general.projectNotFound"),
			i18n.t("general.projectNotFoundMessage"),
		);
		return;
	}

	setPageTitle(projectsData);

	DOMCache.main.innerHTML = [
		Templates.projectHeader(project.title, project.description, project.tags),
		project.github_repo &&
			Templates.dynamicContainer(
				"github-readme",
				"repo",
				project.github_repo,
				i18n.t("project.loadingReadme"),
			),
		project.youtube_videos?.length &&
			Templates.mediaSection(
				project.youtube_videos.map((id) => Templates.youtubeVideo(id)).join(""),
			),
		project.demo_url && Templates.demoIframe(project.demo_url),
		Templates.dynamicContainer("project-links", "project", project.id, ""),
	]
		.filter(Boolean)
		.join("");
};

/**
 * Populate projects dropdown menu with all projects
 */
export const loadProjectsDropdown = async () => {
	const dropdown = DOMCache.getDropdown();
	const data = await getData();
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
	["github-readme", "project-links"].forEach((id) => {
		const el = document.getElementById(id);
		if (!el) return;
		const repo = el.dataset.repo;
		const project = el.dataset.project;
		if (repo) loadGitHubReadme(repo, id);
		if (project) loadProjectLinks(project, id);
	});
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
		const data = await getData();

		if (blogParam !== null) {
			blogParam === ""
				? await loadBlogPage(blogPageNum ? parseInt(blogPageNum, 10) : 1)
				: await loadBlogPost(blogParam);
		} else if (projectId) {
			await loadProjectPage(projectId);
			loadAdditionalContent();
		} else {
			const targetPage =
				pageId ||
				Object.keys(data.pages).find((id) => data.pages[id].default) ||
				Object.keys(data.pages)[0];
			await loadPage(targetPage);
		}

		updateActiveNavLink();
	} catch (error) {
		console.error("Error loading page:", error);
		if (DOMCache.main) {
			DOMCache.main.innerHTML = Templates.errorMessage(
				i18n.t("general.error"),
				i18n.t("general.errorMessage"),
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
