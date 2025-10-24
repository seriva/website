// Constants
const CONSTANTS = {
	HLJS_CDN_BASE: "https://cdn.jsdelivr.net/npm/highlight.js@11.9.0/styles/",
	DEFAULT_THEME: "github-dark", // Highlight.js theme
	DEFAULT_TITLE: "portfolio.example.com",
	DEFAULT_EMAIL: "contact@example.com",
	GITHUB_RAW_BASE: "https://raw.githubusercontent.com",
	MOBILE_BREAKPOINT: 767,
	SEARCH_DEBOUNCE_MS: 300,
	PAGE_TRANSITION_DELAY: 200, // Reduced from 300ms for snappier transitions
	SEARCH_PAGE_CLOSE_DELAY: 200,
	SEARCH_MIN_CHARS: 2,
	SEARCH_MAX_RESULTS: 8,
};

// Utility Functions
const escapeHtml = (str) => {
	const div = document.createElement("div");
	div.textContent = str;
	return div.innerHTML;
};

const setDocumentTitle = (data) => {
	document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;
};

const html = (strings, ...values) => {
	return strings.reduce((result, str, i) => {
		const value = values[i];
		if (value === undefined || value === null) return result + str;
		if (value?.__safe) return result + str + value.content;
		return result + str + escapeHtml(String(value));
	}, "");
};

const safe = (content) => ({ __safe: true, content });

// Internationalization (i18n)
const i18n = {
	currentLanguage: null,
	translations: {},

	init(config, translations) {
		this.currentLanguage = config?.defaultLanguage || "en";
		this.translations = translations || {};
	},

	t(key, lang = null) {
		const language = lang || this.currentLanguage;
		const keys = key.split(".");
		let value = this.translations[language];

		for (const k of keys) {
			if (value && typeof value === "object") {
				value = value[k];
			} else {
				return key;
			}
		}

		return typeof value === "string" ? value : key;
	},
};

// HTML Templates
const Templates = {
	navbar: (
		blogLink,
		projectsDropdown,
		pageLinks,
		socialLinksHtml,
		searchBar,
		siteTitle,
	) => html`
    <nav class="navbar">
        <div class="navbar-container">
            <a class="navbar-brand" href="#">${siteTitle}</a>
            <button class="navbar-toggle" id="navbar-toggle" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggle-icon"></span>
            </button>
            <div class="navbar-collapse" id="navbarNav">
                <ul class="navbar-nav left">
                    ${safe(blogLink)}
                    ${safe(projectsDropdown)}
                    ${safe(pageLinks)}
                </ul>
                <ul class="navbar-nav right">
                    ${safe(searchBar)}
                    ${safe(socialLinksHtml)}
                </ul>
            </div>
        </div>
    </nav>
    `,

	pageLink: (pageId, pageTitle) => {
		const href = pageId === "blog" ? "?blog" : `?page=${pageId}`;
		return html`<li class="nav-item navbar-menu"><a class="nav-link" href="${href}" data-spa-route="page">${pageTitle}</a></li>`;
	},

	socialLink: ({
		href = "#",
		onclick = "",
		target = "",
		rel = "",
		"aria-label": ariaLabel = "",
		icon,
	}) => {
		const attrs = [
			onclick && `onclick="${onclick}"`,
			target && `target="${target}"`,
			rel && `rel="${rel}"`,
			ariaLabel && `aria-label="${ariaLabel}"`,
		]
			.filter(Boolean)
			.join(" ");
		return html`<li class="nav-item navbar-icon"><a class="nav-link" href="${href}" ${safe(attrs)}><i class="${icon}"></i></a></li>`;
	},

	projectDropdownItem: (projectId, projectTitle) =>
		html`<li><a class="dropdown-item" href="/?project=${projectId}" data-spa-route="project">${projectTitle}</a></li>`,

	projectsDropdown: () => html`
		<li class="nav-item navbar-menu dropdown">
			<a class="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
				Projects
			</a>
			<ul class="dropdown-menu" id="projects-dropdown">
				<li><a class="dropdown-item" href="#">Loading projects...</a></li>
			</ul>
		</li>
	`,

	projectLink: (link) => html`
        <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="download-btn">
            <i class="${link.icon}"></i>
            <span>${link.title}</span>
        </a>`,

	youtubeVideo: (videoId) => html`
        <div class="youtube-video"><div class="iframeWrapper">
            <iframe width="560" height="349" src="//www.youtube.com/embed/${videoId}?rel=0&amp;hd=1" frameborder="0" allowfullscreen></iframe>
        </div></div>`,

	demoIframe: (demoUrl) => html`
        <div class="markdown-body"><h2>Play!</h2>
            <p>On desktop use the arrow keys to control the ship and space to shoot. On mobile it should present onscreen controls.</p>
            <div class="iframeWrapper">
                <iframe id="demo" width="900" height="700" src="${demoUrl}" frameborder="0" allowfullscreen></iframe>
            </div><br><center><button id="fullscreen" class="download-btn" onclick="fullscreen()"><i class="fas fa-expand"></i><span>Go Fullscreen</span></button></center>
        </div>`,

	dynamicContainer: (id, dataAttr, dataValue, loadingText = "Loading...") =>
		html`<div id="${id}" data-${dataAttr}="${dataValue}"><p>${loadingText}</p></div>`,

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
								? ` onclick="event.stopPropagation(); searchByTag('${escapeHtml(tag)}')"`
								: "";
							return html`<span class="item-tag${clickableClass}"${safe(onclickAttr)}>${tag}</span>`;
						})
						.join(" ")
				: "",
		),

	blogPostCard: (post, index) => html`
        <article class="blog-post-card" data-index="${index}">
            <h2 class="blog-post-title">
                <a href="?blog=${post.slug}" data-spa-route="blog">${post.title}</a>
            </h2>
            <div class="blog-post-meta">
                <span class="blog-post-date"><i class="far fa-calendar"></i> ${post.date}</span>
                ${post.tags?.length ? safe(`<span class="blog-post-tags">${Templates.tagList(post.tags).content}</span>`) : ""}
            </div>
            <p class="blog-post-excerpt">${post.excerpt}</p>
        </article>`,

	blogPagination: (currentPage, totalPages) => {
		if (totalPages <= 1) return "";

		const pageNumbers = [];
		let lastAdded = 0;

		// Build page numbers array more efficiently
		for (let i = 1; i <= totalPages; i++) {
			// Always show: first, last, current, and adjacent pages
			const shouldShow =
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - 1 && i <= currentPage + 1);

			if (shouldShow) {
				// Add ellipsis if there's a gap
				if (lastAdded > 0 && i - lastAdded > 1) {
					pageNumbers.push(
						'<li class="page-item disabled"><span class="page-link">...</span></li>',
					);
				}

				const activeClass = i === currentPage ? " active" : "";
				pageNumbers.push(
					html`<li class="page-item${activeClass}"><a class="page-link" href="?blog&p=${i}" data-spa-route="page">${i}</a></li>`,
				);
				lastAdded = i;
			}
		}

		const prevDisabled = currentPage === 1 ? " disabled" : "";
		const nextDisabled = currentPage === totalPages ? " disabled" : "";

		return html`<nav class="blog-pagination" aria-label="Blog pagination"><ul class="pagination">
            <li class="page-item${prevDisabled}">
                <a class="page-link" href="?blog&p=${currentPage - 1}" data-spa-route="page" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            ${safe(pageNumbers.join(""))}
            <li class="page-item${nextDisabled}">
                <a class="page-link" href="?blog&p=${currentPage + 1}" data-spa-route="page" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul></nav>`;
	},

	blogPost: (post, content) => html`
        <article class="blog-post-full">
            <h1 class="project-title">${post.title}</h1>
            <p class="project-description">${post.date}</p>
            ${post.tags?.length ? safe(`<div class="project-tags">${Templates.tagList(post.tags).content}</div>`) : ""}
            <div class="blog-post-content">
                ${safe(Templates.markdown(content).content)}
            </div>
            <footer class="blog-post-footer">
                <a href="?blog" class="blog-back-link" data-spa-route="page">${i18n.t("blog.backToBlog")}</a>
            </footer>
        </article>`,

	loadingSpinner: () =>
		html`<div class="loading-spinner">${i18n.t("general.loading")}</div>`,

	errorMessage: (title, message) => html`
        <div class="error-message">
            <h1>${title}</h1>
            <p>${message}</p>
        </div>`,

	markdown: (content) => {
		if (typeof marked === "undefined") {
			return html`<div class="markdown-body"><p>Markdown renderer not available</p></div>`;
		}
		try {
			const htmlContent = marked.parse(content);
			return safe(`<div class="markdown-body">${htmlContent}</div>`);
		} catch (error) {
			console.error("Error rendering markdown:", error);
			return html`<div class="markdown-body"><p>Error rendering markdown</p></div>`;
		}
	},

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
        <footer class="footer">
            <div class="footer-container">
                <p class="footer-text">
                    &copy; ${currentYear} ${authorName}. ${i18n.t("footer.rights")}.
                </p>
            </div>
        </footer>`,

	searchInput: (id, cssClass, placeholder) => html`
        <input type="search" id="${id}" class="${cssClass}" placeholder="${placeholder}" autocomplete="off" aria-label="Search"/>
        <button class="${cssClass.replace("input", "clear")}" id="${id.replace("input", "clear")}" aria-label="Clear search">
            <i class="fas fa-times"></i>
        </button>`,

	searchBar: () => html`
        <li class="nav-item navbar-icon">
            <button class="nav-link search-toggle" id="search-toggle" aria-label="Search">
                <i class="fas fa-search"></i>
            </button>
        </li>`,

	searchPage: (placeholder) => html`
        <div class="search-page" id="search-page">
            <div class="search-page-header">
                <div class="search-page-header-content">
                    <button class="search-page-back" id="search-page-back" aria-label="Go back">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <div class="search-page-input-wrapper">
                        ${safe(Templates.searchInput("search-page-input", "search-page-input", placeholder))}
                    </div>
                </div>
            </div>
            <div class="search-page-content">
                <div class="search-page-results" id="search-page-results"></div>
            </div>
        </div>`,

	searchResult: (item, query) => {
		const isProject = item.type === "project";
		const typeTag = isProject
			? i18n.t("badges.project")
			: i18n.t("badges.blog");
		const allTags = [typeTag, ...item.tags];

		return html`
            <article class="search-result-item blog-post-card">
                <h2 class="blog-post-title">
                    <a href="${item.url}" data-spa-route="${item.type}">${safe(Search.highlight(item.title, query))}</a>
                </h2>
                <div class="blog-post-meta">
                    ${allTags.length ? safe(html`<span class="blog-post-tags">${safe(allTags.map((tag) => html`<span class="item-tag">${tag}</span>`).join(" "))}</span>`) : ""}
                </div>
                <p class="blog-post-excerpt">${safe(Search.highlight(item.description, query))}</p>
            </article>`;
	},

	searchNoResults: () => html`
        <div class="search-no-results">
            <i class="fas fa-search"></i>
            <p>${i18n.t("search.noResults")}</p>
        </div>`,
};

// Application Code
const getHljsThemeUrl = (themeName) =>
	`${CONSTANTS.HLJS_CDN_BASE}${themeName}.min.css`;

// Initialize marked with highlight.js (will be called after scripts load)
const initializeMarked = () => {
	if (typeof marked === "undefined" || typeof hljs === "undefined") {
		console.error("Marked or highlight.js not loaded");
		return;
	}

	marked.use({
		breaks: true,
		gfm: true,
		renderer: {
			code(code, language) {
				const validLanguage = language && hljs.getLanguage(language);
				const highlighted = validLanguage
					? hljs.highlight(code, { language })
					: hljs.highlightAuto(code);

				const langClass = validLanguage ? ` language-${language}` : "";
				return `<pre><code class="hljs${langClass}">${highlighted.value}</code></pre>`;
			},
		},
	});
};

const Email = async (event) => {
	event?.preventDefault?.();
	event?.stopPropagation?.();
	try {
		const data = projectsData || (await loadProjectsData());
		const email = data?.site?.email;
		window.location.href = email
			? `mailto:${email.name}@${email.domain}`
			: `mailto:${CONSTANTS.DEFAULT_EMAIL}`;
	} catch (error) {
		console.error("Error handling email click:", error);
		window.location.href = `mailto:${CONSTANTS.DEFAULT_EMAIL}`;
	}
};

window.Email = Email;

const applyHljsTheme = (
	themeName = projectsData?.site?.colors?.code?.theme ||
		CONSTANTS.DEFAULT_THEME,
) => {
	try {
		if (!themeName) return;
		const themeUrl = getHljsThemeUrl(themeName);
		const themeLink = document.getElementById("hljs-theme");
		if (themeLink) {
			themeLink.href = themeUrl;
		}
	} catch (error) {
		console.error("Error applying highlight.js theme:", error);
	}
};

const updateMetaTags = (siteData) => {
	if (!siteData) return;
	if (siteData.title) document.title = siteData.title;

	const updateMeta = (selector, value) => {
		if (value) document.querySelector(selector)?.setAttribute("content", value);
	};

	updateMeta('meta[name="description"]', siteData.description);
	updateMeta('meta[name="author"]', siteData.author);
	updateMeta('meta[name="theme-color"]', siteData.colors?.primary);
	updateMeta('meta[name="msapplication-TileColor"]', siteData.colors?.primary);
	updateMeta('meta[property="og:title"]', siteData.title);
	updateMeta('meta[property="og:description"]', siteData.description);
	updateMeta('meta[property="twitter:title"]', siteData.title);
	updateMeta('meta[property="twitter:description"]', siteData.description);
};

const fullscreen = () => {
	try {
		const iframe = document.getElementById("demo");
		if (!iframe) return;

		const request =
			iframe.requestFullscreen ||
			iframe.webkitRequestFullscreen ||
			iframe.mozRequestFullScreen ||
			iframe.msRequestFullscreen;

		if (request) request.call(iframe);
	} catch (error) {
		console.error("Error requesting fullscreen:", error);
	}
};

window.fullscreen = fullscreen;

const closeMobileMenu = () => {
	const collapseElement = document.querySelector(".navbar-collapse");
	const navbarToggle = document.querySelector(".navbar-toggle");

	if (collapseElement) {
		collapseElement.classList.remove("show");
	}

	if (navbarToggle) {
		navbarToggle.classList.remove("active");
		navbarToggle.setAttribute("aria-expanded", "false");
	}
};

const initCustomDropdowns = () => {
	document.querySelectorAll(".dropdown-toggle").forEach((toggle) => {
		toggle.addEventListener("click", (e) => {
			e.preventDefault();
			const dropdown = toggle.closest(".dropdown");
			const isOpen = dropdown.classList.contains("show");

			document.querySelectorAll(".dropdown.show").forEach((d) => {
				if (d !== dropdown) d.classList.remove("show");
			});

			dropdown.classList.toggle("show", !isOpen);
			toggle.setAttribute("aria-expanded", !isOpen);
		});
	});

	document.addEventListener("click", (e) => {
		if (e.target.closest(".dropdown-item") || !e.target.closest(".dropdown")) {
			document.querySelectorAll(".dropdown.show").forEach((d) => {
				d.classList.remove("show");
				const toggle = d.querySelector(".dropdown-toggle");
				if (toggle) toggle.setAttribute("aria-expanded", "false");
			});
		}
	});
};
const initMobileMenuToggle = () => {
	const navbarToggle = document.getElementById("navbar-toggle");
	const navbarCollapse = document.getElementById("navbarNav");

	if (navbarToggle && navbarCollapse) {
		navbarToggle.addEventListener("click", () => {
			const isExpanded = navbarToggle.getAttribute("aria-expanded") === "true";
			navbarToggle.classList.toggle("active", !isExpanded);
			navbarToggle.setAttribute("aria-expanded", !isExpanded);
			navbarCollapse.classList.toggle("show", !isExpanded);
		});
	}
};

// Search Functionality
const Search = {
	data: [],
	fuse: null,
	isInitialized: false,
	initPromise: null,

	async init(includeReadmes = false) {
		if (this.initPromise) return this.initPromise;
		if (this.isInitialized) return;

		this.initPromise = (async () => {
			try {
				const data = await getData();
				const projects = data?.projects || [];
				const blogPosts = data?.blog?.posts || [];

				// Index projects without fetching READMEs initially (lazy loading)
				const projectsIndexed = projects.map((p) => ({
					id: p.id,
					title: p.title,
					description: p.description,
					tags: p.tags || [],
					content: "", // Will be lazy loaded if needed
					type: "project",
					url: `/?project=${p.id}`,
					github_repo: p.github_repo, // Store for lazy loading
				}));

				// If explicitly requested, fetch READMEs for better search results
				let projectsWithContent = projectsIndexed;
				if (includeReadmes) {
					projectsWithContent = await Promise.all(
						projectsIndexed.map(async (p) => {
							if (p.github_repo) {
								const readme = await fetchGitHubReadme(p.github_repo);
								return { ...p, content: readme || "" };
							}
							return p;
						}),
					);
				}

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

				// Initialize MiniSearch
				this.miniSearch = new MiniSearch({
					fields: ["title", "description", "tags", "content"],
					storeFields: ["id", "title", "description", "tags", "type", "url"],
					searchOptions: {
						boost: { title: 2, description: 1.5, tags: 1.2, content: 0.5 },
						fuzzy: 0.2,
						prefix: true,
					},
				});

				// Add all documents to the index
				this.miniSearch.addAll(this.data);
				this.isInitialized = true;
			} catch (error) {
				console.error("Error initializing search:", error);
				this.initPromise = null;
			}
		})();

		return this.initPromise;
	},

	search(query) {
		if (!query || query.length < CONSTANTS.SEARCH_MIN_CHARS || !this.miniSearch)
			return [];

		const results = this.miniSearch.search(query, {
			boost: { title: 2, description: 1.5, tags: 1.2, content: 0.5 },
			fuzzy: 0.2,
			prefix: true,
		});

		// Return top results, MiniSearch returns documents directly
		return results.slice(0, CONSTANTS.SEARCH_MAX_RESULTS);
	},

	highlight(text, query) {
		if (!query) return text;
		// Escape special regex characters to prevent injection
		const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(`(${escapedQuery})`, "gi");
		return text.replace(regex, "<mark>$1</mark>");
	},
};

const searchByTag = (tag) => {
	const searchPage = DOMCache.getSearchPage();
	const searchInput = DOMCache.getSearchInput();

	if (searchPage && searchInput) {
		searchPage.classList.add("show");
		searchInput.value = tag;
		requestAnimationFrame(() => {
			searchInput.focus();
			searchInput.dispatchEvent(new Event("input", { bubbles: true }));
		});
	}
};

window.searchByTag = searchByTag;

// GitHub API Integration
const fetchGitHubReadme = async (repoName) => {
	if (!repoName) return null;
	if (readmeCache.has(repoName)) return readmeCache.get(repoName);

	try {
		const data = await getData();
		const username = data?.site?.github_username;
		if (!username) {
			console.warn("No GitHub username configured in content.yaml");
			readmeCache.set(repoName, null);
			return null;
		}

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
			} catch {
				// Try next branch
			}
		}

		readmeCache.set(repoName, null);
		return null;
	} catch (error) {
		console.error(`Error fetching README for ${repoName}:`, error);
		readmeCache.set(repoName, null);
		return null;
	}
};

const loadGitHubReadme = async (repoName, containerId) => {
	if (!repoName || !containerId) return;

	const container = document.getElementById(containerId);
	if (!container) return;

	try {
		const content = await fetchGitHubReadme(repoName);

		container.innerHTML = content
			? Templates.markdown(content).content
			: Templates.githubReadmeError();
	} catch (error) {
		console.error(`Error loading GitHub README for ${repoName}:`, error);
		container.innerHTML = Templates.githubReadmeError();
	}
};

// State Management
let projectsData = null;
let dataLoadPromise = null;
const readmeCache = new Map();

// DOM Management
const DOMCache = {
	navbar: null,
	main: null,
	footer: null,
	dropdownMenu: null,
	navbarLinks: null,
	searchPage: null,
	searchPageInput: null,
	searchPageResults: null,
	searchToggle: null,

	init() {
		this.navbar = document.getElementById("navbar-container");
		this.main = document.getElementById("main-content");
		this.footer = document.getElementById("footer-container");
	},

	clearNavbarCache() {
		this.dropdownMenu = null;
		this.navbarLinks = null;
		this.searchToggle = null;
	},

	clearSearchCache() {
		this.searchPage = null;
		this.searchPageInput = null;
		this.searchPageResults = null;
		this.searchToggle = null;
	},

	getDropdown() {
		if (!this.dropdownMenu) {
			this.dropdownMenu = document.getElementById("projects-dropdown");
		}
		return this.dropdownMenu;
	},

	getSearchPage() {
		if (!this.searchPage) {
			this.searchPage = document.getElementById("search-page");
		}
		return this.searchPage;
	},

	getSearchInput() {
		if (!this.searchPageInput) {
			this.searchPageInput = document.getElementById("search-page-input");
		}
		return this.searchPageInput;
	},

	getSearchResults() {
		if (!this.searchPageResults) {
			this.searchPageResults = document.getElementById("search-page-results");
		}
		return this.searchPageResults;
	},

	getSearchToggle() {
		if (!this.searchToggle) {
			this.searchToggle = document.getElementById("search-toggle");
		}
		return this.searchToggle;
	},
};

// Navigation & UI Functions
const createNavbar = (
	pages = [],
	socialLinks = [],
	searchConfig = {},
	siteTitle = "portfolio.example.com",
) => {
	const blogPage = pages.find((page) => page.id === "blog");
	const otherPages = pages.filter((page) => page.id !== "blog");
	const blogLink = blogPage
		? Templates.pageLink(blogPage.id, blogPage.title)
		: "";
	const projectsDropdown = Templates.projectsDropdown();
	const pageLinks = otherPages
		.filter((page) => page.showInNav)
		.sort((a, b) => a.order - b.order)
		.map((page) => Templates.pageLink(page.id, page.title))
		.join("");
	const socialLinksHtml = socialLinks
		.map((link) => Templates.socialLink(link))
		.join("");
	const searchBar = searchConfig?.enabled ? Templates.searchBar() : "";
	return Templates.navbar(
		blogLink,
		projectsDropdown,
		pageLinks,
		socialLinksHtml,
		searchBar,
		siteTitle,
	);
};

const injectFooter = async () => {
	if (!DOMCache.footer) return;

	try {
		const data = await getData();
		const authorName = data?.site?.author || "Portfolio Owner";
		const currentYear = new Date().getFullYear();

		DOMCache.footer.innerHTML = Templates.footer(authorName, currentYear);
	} catch (error) {
		console.error("Error injecting footer:", error);
	}
};

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

	// Inject search page if enabled
	if (data?.site?.search?.enabled) {
		const existingSearchPage = document.getElementById("search-page");
		if (!existingSearchPage) {
			document.body.insertAdjacentHTML(
				"beforeend",
				Templates.searchPage(
					data.site.search.placeholder || i18n.t("search.placeholder"),
				),
			);
		}
	}

	// Clear cached navbar elements after rebuild
	DOMCache.clearNavbarCache();

	// Initialize custom dropdowns and mobile menu
	initCustomDropdowns();
	initMobileMenuToggle();

	if (data?.site?.search?.enabled) {
		initializeSearch(data.site.search);
		initializeSearchPage(data.site.search);
	}
};

const handleSearchQuery = (query, resultsContainer, onResultClick) => {
	const results = Search.search(query);

	if (results.length > 0) {
		resultsContainer.innerHTML = results
			.map((item) => Templates.searchResult(item, query))
			.join("");
		resultsContainer.classList.add("show");

		resultsContainer.querySelectorAll(".search-result-item").forEach((card) => {
			card.addEventListener("click", (e) => {
				if (e.target.closest("a") || e.target.closest(".clickable-tag")) return;
				const link = card.querySelector(".blog-post-title a");
				if (link) {
					e.preventDefault();
					onResultClick();
					window.history.pushState({}, "", link.getAttribute("href"));
					handleRoute();
				}
			});
		});

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

const initializeSearch = () => {
	const searchToggle = DOMCache.getSearchToggle();
	Search.init(false);

	const openSearchPage = () => {
		const searchPage = DOMCache.getSearchPage();
		const searchInput = DOMCache.getSearchInput();

		if (searchPage) {
			searchPage.classList.add("show");
			if (searchInput) {
				requestAnimationFrame(() => searchInput.focus());
			}
		}
	};

	// Search toggle button - opens search page (both mobile and desktop)
	if (searchToggle) {
		searchToggle.addEventListener("click", (e) => {
			e.preventDefault();
			openSearchPage();
		});
	}
};

const initializeSearchPage = (searchConfig) => {
	const searchPage = DOMCache.getSearchPage();
	const searchPageBack = document.getElementById("search-page-back");
	const searchPageInput = DOMCache.getSearchInput();
	const searchPageResults = DOMCache.getSearchResults();
	const searchPageClear = document.getElementById("search-page-clear");

	if (!searchPage || !searchPageBack || !searchPageInput || !searchPageResults)
		return;

	const minChars = searchConfig.minChars || CONSTANTS.SEARCH_MIN_CHARS;
	let searchTimeout = null;

	const closeSearchPage = () => {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
			searchTimeout = null;
		}
		searchPage.classList.add("closing");
		setTimeout(() => {
			searchPage.classList.remove("show", "closing");
			searchPageInput.value = "";
			searchPageResults.innerHTML = "";
		}, CONSTANTS.SEARCH_PAGE_CLOSE_DELAY);
	};

	searchPageBack.addEventListener("click", closeSearchPage);

	const handleSearchInput = (e) => {
		const query = e.target.value.trim();

		if (query.length < minChars) {
			searchPageResults.innerHTML = "";
			return;
		}

		if (searchTimeout) clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			handleSearchQuery(query, searchPageResults, closeSearchPage);
		}, CONSTANTS.SEARCH_DEBOUNCE_MS);
	};

	searchPageInput.addEventListener("input", handleSearchInput);

	// Handle clear button
	if (searchPageClear) {
		searchPageClear.addEventListener("click", () => {
			searchPageInput.value = "";
			searchPageResults.innerHTML = "";
			searchPageInput.focus();
		});
	}

	// Handle ESC key to close search
	searchPageInput.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			closeSearchPage();
		}
	});

	// Close search page when clicking outside (for desktop)
	searchPage.addEventListener("click", (e) => {
		if (e.target === searchPage) {
			closeSearchPage();
		}
	});
};

// Data Loading & Management
const getBasePath = () => {
	// Detect if we're in a subdirectory (not at root)
	const pathname = window.location.pathname;
	const isSubdirectory = pathname.split('/').length > 2; // More than just "/" and the subdirectory
	
	if (window.location.pathname.includes("/project/")) {
		return "../";
	} else if (isSubdirectory) {
		return "./";
	}
	return "";
};

const getData = async () => projectsData || (await loadProjectsData());

const loadProjectsData = async () => {
	if (projectsData) return projectsData;
	if (dataLoadPromise) return dataLoadPromise;

	const yamlPath = `${getBasePath()}data/content.yaml`;

	dataLoadPromise = (async () => {
		try {
			const response = await fetch(yamlPath);
			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const yamlText = await response.text();
			projectsData = YAML.parse(yamlText);

			if (projectsData?.site?.colors) {
				applyColorScheme(projectsData.site.colors);
			}

			// Initialize i18n
			if (projectsData?.site?.i18n && projectsData?.translations) {
				i18n.init(projectsData.site.i18n, projectsData.translations);
			}

			return projectsData;
		} catch (error) {
			console.error("Failed to load YAML content data:", error);
			projectsData = null;
			dataLoadPromise = null;
			return null;
		}
	})();

	return dataLoadPromise;
};

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

	if (colors.code?.theme) applyHljsTheme(colors.code.theme);
};

// Blog Management
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
				try {
					metadata[key.trim()] = JSON.parse(value.replace(/'/g, '"'));
				} catch (e) {
					console.warn(
						`Failed to parse array in frontmatter for key: ${key}`,
						e,
					);
					metadata[key.trim()] = value;
				}
			} else {
				metadata[key.trim()] = value.replace(/^["']|["']$/g, "");
			}
		}
	});

	return { metadata, content: content.trim() };
};

const loadBlogPosts = async () => {
	try {
		const data = await getData();
		const postFiles = data?.blog?.posts || [];

		if (postFiles.length === 0) return [];

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

				// Old format: fetch and parse markdown file for metadata
				const response = await fetch(`${getBasePath()}data/blog/${filename}`);
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

		// Extract successful results
		const posts = results
			.filter((result) => result.status === "fulfilled")
			.map((result) => result.value);

		// Sort by date (newest first)
		return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
	} catch (error) {
		console.error("Error loading blog posts:", error);
		return [];
	}
};

const loadBlogPage = async (page = 1) => {
	if (!DOMCache.main) return;

	const data = await getData();
	document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

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

	// Make entire blog cards clickable
	document.querySelectorAll(".blog-post-card").forEach((card) => {
		card.addEventListener("click", (e) => {
			// Don't trigger if clicking on a link or tag
			if (e.target.closest("a") || e.target.closest(".clickable-tag")) return;

			const link = card.querySelector(".blog-post-title a");
			if (link) {
				e.preventDefault();
				window.history.pushState({}, "", link.getAttribute("href"));
				handleRoute();
			}
		});
	});
	// SPA routing handled via event delegation
};

const loadBlogPost = async (slug) => {
	if (!DOMCache.main) return;

	const data = await getData();
	document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

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
			const response = await fetch(`${getBasePath()}data/blog/${post.filename}`);
			if (response.ok) {
				const markdown = await response.text();
				const parsed = parseBlogPost(markdown);
				content = parsed.content;
			}
		} catch (error) {
			console.error(`Error loading blog post content: ${post.filename}`, error);
		}
	}

	DOMCache.main.innerHTML = Templates.blogPost(post, content);
	// SPA routing handled via event delegation
};

// Project Management
const loadProjectLinks = async (projectId, containerId) => {
	if (!projectId || !containerId) return;

	const container = document.getElementById(containerId);
	if (!container) return;

	try {
		const data = await loadProjectsData();
		const project = data?.projects?.find((p) => p.id === projectId);
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

const loadPage = async (pageId) => {
	if (!DOMCache.main) return;

	try {
		const data = await getData();
		setDocumentTitle(data);
		
		// Load content from markdown file
		let content = null;
		try {
			const response = await fetch(`${getBasePath()}data/pages/${pageId}.md`);
			if (response.ok) {
				const markdown = await response.text();
				const markdownResult = Templates.markdown(markdown);
				content = markdownResult.content || markdownResult;
			}
		} catch (error) {
			console.error(`Error loading markdown page ${pageId}:`, error);
		}
		
		DOMCache.main.innerHTML = content || Templates.errorMessage(
			i18n.t("general.notFound"),
			i18n.t("general.notFoundMessage"),
		);
	} catch (error) {
		console.error(`Error loading page ${pageId}:`, error);
		DOMCache.main.innerHTML = Templates.errorMessage(
			i18n.t("general.error"),
			i18n.t("general.errorMessage"),
		);
	}
};

const loadProjectPage = async (projectId) => {
	if (!DOMCache.main) return;

	try {
		const data = await loadProjectsData();
		const project = data?.projects?.find((p) => p.id === projectId);

		if (!project) {
			DOMCache.main.innerHTML = Templates.errorMessage(
				i18n.t("general.projectNotFound"),
				i18n.t("general.projectNotFoundMessage"),
			);
			return;
		}

		document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

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
					project.youtube_videos
						.map((id) => Templates.youtubeVideo(id))
						.join(""),
				),
			project.demo_url && Templates.demoIframe(project.demo_url),
			Templates.dynamicContainer("project-links", "project", project.id, ""),
		]
			.filter(Boolean)
			.join("");
	} catch (error) {
		console.error(`Error loading project page ${projectId}:`, error);
		DOMCache.main.innerHTML = Templates.errorMessage(
			i18n.t("general.error"),
			i18n.t("general.errorMessage"),
		);
	}
};

const loadProjectsDropdown = async () => {
	const dropdown = DOMCache.getDropdown();
	if (!dropdown) return;

	try {
		const data = await getData();
		if (!data?.projects) return;

		dropdown.innerHTML = data.projects
			.sort((a, b) => a.order - b.order)
			.map((p) => Templates.projectDropdownItem(p.id, p.title))
			.join("");

		// Mobile menu closing is now handled via global event delegation
	} catch (error) {
		console.error("Error loading projects dropdown:", error);
	}
};

const loadAdditionalContent = async () => {
	try {
		const promises = [];
		["github-readme", "project-links"].forEach((id) => {
			const el = document.getElementById(id);
			if (!el) return;
			const repo = el.dataset.repo;
			const project = el.dataset.project;
			if (repo) promises.push(loadGitHubReadme(repo, id));
			if (project) promises.push(loadProjectLinks(project, id));
		});
		await Promise.all(promises);
	} catch (error) {
		console.error("Error loading additional content:", error);
	}
};

// Routing & Page Management
const handleRoute = async () => {
	closeMobileMenu();

	// Add fade out animation
	if (DOMCache.main) {
		DOMCache.main.classList.add("page-transition-out");
		// Wait for fade out animation
		await new Promise((resolve) =>
			setTimeout(resolve, CONSTANTS.PAGE_TRANSITION_DELAY),
		);
	}

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
			await loadAdditionalContent();
		} else if (pageId) {
			await loadPage(pageId);
		} else {
			// Redirect to configured default route for proper nav highlighting
			const defaultRoute = data.site?.defaultRoute || "?blog";
			// For subdirectory hosting, keep relative paths as-is
			const route = defaultRoute.startsWith("/") ? defaultRoute : defaultRoute;
			window.history.replaceState({}, "", route);
			// Recursively handle the new route
			await handleRoute();
			return; // Exit early since handleRoute will call updateActiveNavLink
		}

		if (DOMCache.main) {
			DOMCache.main.classList.remove("page-transition-out");
		}

		// Scroll to top of page instantly (no animation)
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });

		// Use requestAnimationFrame to ensure DOM is fully updated before highlighting
		requestAnimationFrame(() => {
			updateActiveNavLink();
		});
	} catch (error) {
		console.error("Error loading page:", error);
		if (DOMCache.main) {
			DOMCache.main.classList.remove("page-transition-out");
			DOMCache.main.innerHTML = Templates.errorMessage(
				i18n.t("general.error"),
				i18n.t("general.errorMessage"),
			);
		}
		document.title = projectsData?.site?.title || CONSTANTS.DEFAULT_TITLE;
	}
};

// Application Initialization
document.addEventListener("DOMContentLoaded", async () => {
	try {
		DOMCache.init();

		// Initialize marked.js with highlight.js
		initializeMarked();

		const data = await loadProjectsData();
		if (data?.site) updateMetaTags(data.site);

		await injectNavbar();
		await injectFooter();
		await loadProjectsDropdown();
		await handleRoute();

		window.addEventListener("popstate", handleRoute);
		setupSpaRouting(); // Set up event delegation for SPA links (once)
		addMobileMenuOutsideClickHandler();

		// Note: GitHub READMEs are preloaded during Search.init() if search is enabled
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

const updateActiveNavLink = () => {
	const params = new URLSearchParams(window.location.search);
	const pageId = params.get("page");
	const projectId = params.get("project");
	const blogParam = params.get("blog");

	// Cache navbar element if not already cached
	if (!DOMCache.navbar) {
		DOMCache.navbar = document.getElementById("navbar-container");
	}

	if (!DOMCache.navbar) return;

	// Get all navbar links and dropdown items (scoped to navbar for performance)
	const navbarLinks = DOMCache.navbar.querySelectorAll(".navbar-nav .nav-link");
	const dropdownItems = DOMCache.navbar.querySelectorAll(".dropdown-item");

	// Find which link should be active first
	let targetLink = null;
	let targetDropdownItem = null;
	let targetDropdownToggle = null;

	if (blogParam !== null) {
		// Blog page or specific blog post
		targetLink = DOMCache.navbar.querySelector('.nav-link[href="?blog"]');
	} else if (projectId) {
		// Project page - highlight both the Projects dropdown toggle AND the specific project item
		const projectDropdown = DOMCache.navbar.querySelector(".dropdown");
		if (projectDropdown) {
			targetDropdownToggle = projectDropdown.querySelector(".dropdown-toggle");
		}
		targetDropdownItem = DOMCache.navbar.querySelector(
			`.dropdown-item[href="/?project=${projectId}"]`,
		);
	} else if (pageId) {
		// Regular page
		targetLink = DOMCache.navbar.querySelector(
			`.nav-link[href="/?page=${pageId}"]`,
		);
	}

	// Add active class to target(s) first to maintain visual continuity
	if (targetLink) targetLink.classList.add("active");
	if (targetDropdownToggle) targetDropdownToggle.classList.add("active");
	if (targetDropdownItem) targetDropdownItem.classList.add("active");

	// Then remove active from all others
	navbarLinks.forEach((l) => {
		if (l !== targetLink && l !== targetDropdownToggle) {
			l.classList.remove("active");
		}
	});
	dropdownItems.forEach((item) => {
		if (item !== targetDropdownItem) {
			item.classList.remove("active");
		}
	});
};

const handleSpaLinkClick = (e) => {
	const link = e.target.closest("[data-spa-route]");
	if (!link) return;

	e.preventDefault();

	// Cache navbar if not already cached
	if (!DOMCache.navbar) {
		DOMCache.navbar = document.getElementById("navbar-container");
	}

	// Immediately apply active class to clicked link for visual continuity
	const allNavLinks =
		DOMCache.navbar?.querySelectorAll(".navbar-nav .nav-link") || [];
	const allDropdownItems =
		DOMCache.navbar?.querySelectorAll(".dropdown-item") || [];

	// Remove active from all first
	allNavLinks.forEach((l) => {
		l.classList.remove("active");
	});
	allDropdownItems.forEach((item) => {
		item.classList.remove("active");
	});

	// Add active to clicked link
	if (link.classList.contains("nav-link")) {
		link.classList.add("active");
	} else if (link.classList.contains("dropdown-item")) {
		link.classList.add("active");
		// Also activate the dropdown toggle if clicking a dropdown item
		const dropdown = link.closest(".dropdown");
		if (dropdown) {
			const toggle = dropdown.querySelector(".dropdown-toggle");
			if (toggle) toggle.classList.add("active");
		}
	}

	closeMobileMenu();
	window.history.pushState({}, "", link.getAttribute("href"));
	handleRoute();
};

const setupSpaRouting = () => {
	document.addEventListener("click", handleSpaLinkClick);
};

const addMobileMenuOutsideClickHandler = () => {
	document.addEventListener("click", (event) => {
		// Handle mobile menu outside clicks
		if (
			window.innerWidth <= CONSTANTS.MOBILE_BREAKPOINT &&
			DOMCache.navbar &&
			!DOMCache.navbar.contains(event.target)
		) {
			closeMobileMenu();
		}

		// Handle navbar link clicks and blur (event delegation)
		const link = event.target.closest(".navbar a:not([data-spa-route])");
		if (link) {
			if (
				!link.classList.contains("dropdown-toggle") &&
				!link.hasAttribute("data-keep-menu")
			) {
				closeMobileMenu();
			}
			requestAnimationFrame(() => link.blur());
		}

		// Handle navbar toggle button blur
		const toggleBtn = event.target.closest(".navbar-toggle");
		if (toggleBtn) {
			requestAnimationFrame(() => toggleBtn.blur());
		}
	});
};
