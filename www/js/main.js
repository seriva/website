// ===========================================
// CONSTANTS & CONFIGURATION
// ===========================================

const CONSTANTS = {
	PRISM_CDN_BASE: "https://cdn.jsdelivr.net/npm/prismjs@1.30.0/themes/",
	DEFAULT_THEME: "prism-tomorrow",
	DEFAULT_TITLE: "portfolio.example.com",
	DEFAULT_EMAIL: "contact@example.com",
	GITHUB_RAW_BASE: "https://raw.githubusercontent.com",
	MOBILE_BREAKPOINT: 767,
	SEARCH_DEBOUNCE_MS: 300,
	PAGE_TRANSITION_DELAY: 200,
	SEARCH_PAGE_CLOSE_DELAY: 200,
	SEARCH_MIN_CHARS: 2,
	SEARCH_MAX_RESULTS: 8,
};

// ===========================================
// UTILITY FUNCTIONS
// ===========================================

const escapeHtml = (str) => {
	const div = document.createElement("div");
	div.textContent = str;
	return div.innerHTML;
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

// ===========================================
// INTERNATIONALIZATION (i18n)
// ===========================================

const i18n = {
	currentLanguage: null,
	translations: {},

	init(config, translations) {
		this.currentLanguage = config?.defaultLanguage || "en";
		this.translations = translations || {};
	},

	t(key, lang = null) {
		const language = lang || this.currentLanguage;
		const languageTranslations = this.translations[language];

		if (!languageTranslations) {
			return key;
		}

		// Direct lookup for flat translation keys
		return languageTranslations[key] || key;
	},
};

// ===========================================
// HTML TEMPLATES
// ===========================================

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
		html`<li><a class="dropdown-item" href="?project=${projectId}" data-spa-route="project">${projectTitle}</a></li>`,

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

	tagList: (tags) => {
		if (!tags?.length) return safe("");
		const searchEnabled = projectsData?.site?.search?.enabled !== false;
		const clickableClass = searchEnabled ? " clickable-tag" : "";
		return safe(
			tags
				.map((tag) => {
					const onclickAttr = searchEnabled
						? ` onclick="event.stopPropagation(); searchByTag('${escapeHtml(tag)}')"`
						: "";
					return html`<span class="item-tag${clickableClass}"${safe(onclickAttr)}>${tag}</span>`;
				})
				.join(" "),
		);
	},

	blogPostCard: (post, index) => html`
        <article class="blog-post-card" data-index="${index}">
            <h2 class="blog-post-title">
                <a href="?blog=${post.slug}" data-spa-route="blog">${post.title}</a>
            </h2>
            <div class="blog-post-meta">
                <span class="blog-post-date"><i class="fas fa-calendar"></i> ${post.date}</span>
                ${post.tags?.length ? safe(`<span class="blog-post-tags">${Templates.tagList(post.tags).content}</span>`) : ""}
            </div>
            <p class="blog-post-excerpt">${post.excerpt}</p>
        </article>`,

	blogPagination: (currentPage, totalPages) => {
		if (totalPages <= 1) return "";

		const pageNumbers = [];
		let lastAdded = 0;

		for (let i = 1; i <= totalPages; i++) {
			const shouldShow =
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - 1 && i <= currentPage + 1);

			if (shouldShow) {
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
			const wrapper = document.createElement("div");
			wrapper.className = "markdown-body";
			wrapper.innerHTML = htmlContent;

			// Apply Prism syntax highlighting after rendering
			if (typeof Prism !== "undefined") {
				requestAnimationFrame(() => {
					wrapper.querySelectorAll("pre code").forEach((block) => {
						Prism.highlightElement(block);
					});
				});
			}

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

	blogEmpty: () => html`
        <div class="blog-container">
            <p class="blog-empty">${i18n.t("blog.noPosts")}</p>
        </div>`,

	blogContainer: (postsHtml, paginationHtml) => html`
        <div class="blog-container">
            <div class="blog-posts">
                ${safe(postsHtml)}
            </div>
            ${safe(paginationHtml)}
        </div>`,
};

// ===========================================
// MARKDOWN & SYNTAX HIGHLIGHTING
// ===========================================

const initializeMarked = () => {
	if (typeof marked === "undefined") {
		console.error("Marked not loaded");
		return;
	}

	marked.use({
		breaks: true,
		gfm: true,
	});
};

const Email = async (event) => {
	event?.preventDefault?.();
	event?.stopPropagation?.();
	try {
		const data = projectsData || (await getData());
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

const applyPrismTheme = (
	themeName = projectsData?.site?.colors?.code?.theme ||
		CONSTANTS.DEFAULT_THEME,
) => {
	try {
		if (!themeName) return;
		const themeLink = document.getElementById("prism-theme");
		if (themeLink) {
			themeLink.href = `${CONSTANTS.PRISM_CDN_BASE}${themeName}.min.css`;
		}
	} catch (error) {
		console.error("Error applying Prism theme:", error);
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
	const collapseElement = document.getElementById("navbarNav");
	const navbarToggle = document.getElementById("navbar-toggle");

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

			// Close all other dropdowns
			document.querySelectorAll(".dropdown.show").forEach((d) => {
				if (d !== dropdown) {
					d.classList.remove("show");
					const t = d.querySelector(".dropdown-toggle");
					if (t) t.setAttribute("aria-expanded", "false");
				}
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

// ===========================================
// SEARCH FUNCTIONALITY
// ===========================================

const Search = {
	data: [],
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
					url: `?project=${p.id}`,
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

				// Index blog posts using metadata from YAML
				const blogPostsIndexed = blogPosts.map((p) => {
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

		return this.miniSearch
			.search(query, {
				boost: { title: 2, description: 1.5, tags: 1.2, content: 0.5 },
				fuzzy: 0.2,
				prefix: true,
			})
			.slice(0, CONSTANTS.SEARCH_MAX_RESULTS);
	},

	highlight(text, query) {
		if (!query) return text;
		const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(`(${escapedQuery})`, "gi");
		return text.replace(regex, "<mark>$1</mark>");
	},
};

const searchByTag = (tag) => {
	const searchPage = document.getElementById("search-page");
	const searchInput = document.getElementById("search-page-input");

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

// ===========================================
// GITHUB API INTEGRATION
// ===========================================

const fetchGitHubReadme = async (repoName) => {
	if (!repoName) return null;

	const data = await getData();
	const username = data?.site?.github_username;
	if (!username) {
		console.warn("No GitHub username configured in content.yaml");
		return null;
	}

	const branches = ["master", "main"];

	for (const branch of branches) {
		try {
			const url = `${CONSTANTS.GITHUB_RAW_BASE}/${username}/${repoName}/${branch}/README.md`;
			const response = await fetch(url);
			if (response.ok) {
				return response.text();
			}
		} catch (error) {
			console.warn(`Failed to fetch README from ${repoName}/${branch}:`, error);
		}
	}

	return null;
};

const loadGitHubReadme = async (repoName, containerId) => {
	if (!repoName || !containerId) return;

	const container = document.getElementById(containerId);
	if (!container) return;

	container.innerHTML = `<p>${i18n.t("project.loadingReadme")}</p>`;

	try {
		const content = await fetchGitHubReadme(repoName);
		container.innerHTML = content
			? Templates.markdown(content).content
			: Templates.githubReadmeError();
	} catch (error) {
		console.error(`Error loading GitHub README for ${repoName}`, error);
		container.innerHTML = Templates.githubReadmeError();
	}
};

// ===========================================
// STATE MANAGEMENT
// ===========================================

let projectsData = null;

// ===========================================
// NAVIGATION & UI FUNCTIONS
// ===========================================

const injectFooter = async () => {
	const footerContainer = document.getElementById("footer-container");
	if (!footerContainer) return;

	try {
		const data = await getData();
		const authorName = data?.site?.author || "Portfolio Owner";
		const currentYear = new Date().getFullYear();

		footerContainer.innerHTML = Templates.footer(authorName, currentYear);
	} catch (error) {
		console.error("Error injecting footer:", error);
	}
};

const injectNavbar = async () => {
	const navbarContainer = document.getElementById("navbar-container");
	if (!navbarContainer) return;

	const data = await getData();
	const pages = data?.pages
		? Object.entries(data.pages).map(([id, page]) => ({ id, ...page }))
		: [];

	if (data?.blog?.showInNav) {
		pages.push({
			id: "blog",
			title: data.blog.title || "Blog",
			showInNav: true,
		});
	}

	// Build navbar inline
	const blogPage = pages.find((page) => page.id === "blog");
	const blogLink = blogPage
		? Templates.pageLink(blogPage.id, blogPage.title)
		: "";
	const pageLinks = pages
		.filter((page) => page.id !== "blog" && page.showInNav)
		.sort((a, b) => a.order - b.order)
		.map((page) => Templates.pageLink(page.id, page.title))
		.join("");
	const socialLinksHtml = (data?.site?.social || [])
		.map((link) => Templates.socialLink(link))
		.join("");
	const searchBar = data?.site?.search?.enabled ? Templates.searchBar() : "";

	navbarContainer.innerHTML = Templates.navbar(
		blogLink,
		Templates.projectsDropdown(),
		pageLinks,
		socialLinksHtml,
		searchBar,
		data?.site?.title || CONSTANTS.DEFAULT_TITLE,
	);

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
	const searchToggle = document.getElementById("search-toggle");
	Search.init(false);

	const openSearchPage = () => {
		const searchPage = document.getElementById("search-page");
		const searchInput = document.getElementById("search-page-input");

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
	const searchPage = document.getElementById("search-page");
	const searchPageInput = document.getElementById("search-page-input");
	const searchPageResults = document.getElementById("search-page-results");

	if (!searchPage || !searchPageInput || !searchPageResults) return;

	const searchPageBack = document.getElementById("search-page-back");
	const searchPageClear = document.getElementById("search-page-clear");

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

// ===========================================
// DATA LOADING & MANAGEMENT
// ===========================================

// Simplified content loading
const getData = async () => {
	if (projectsData) return projectsData;

	const yamlPath = "data/content.yaml";

	try {
		const response = await fetch(yamlPath);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);

		const yamlText = await response.text();
		projectsData = YAML.parse(yamlText);

		// Apply theming and i18n
		if (projectsData?.site?.colors) applyColorScheme(projectsData.site.colors);
		if (projectsData?.site?.i18n && projectsData?.translations) {
			i18n.init(projectsData.site.i18n, projectsData.translations);
		}

		return projectsData;
	} catch (error) {
		console.error("Failed to load content:", error);
		projectsData = null;
		return null;
	}
};

const applyColorScheme = (colors) => {
	if (!colors) return;

	const root = document.documentElement;

	// Direct mapping - cleaner and more maintainable
	const mappings = {
		"--accent": colors.primary,
		"--font-color": colors.text,
		"--background-color": colors.background,
		"--header-color": colors.secondary,
		"--text-light": colors.textLight,
		"--border-color": colors.border,
		"--hover-color": colors.hover,
	};

	for (const [prop, value] of Object.entries(mappings)) {
		if (value) root.style.setProperty(prop, value);
	}

	// Apply syntax highlighting theme
	if (colors.code?.theme) {
		applyPrismTheme(colors.code.theme);
	}
};

// ===========================================
// UNIFIED MARKDOWN SYSTEM
// ===========================================

const MarkdownLoader = {
	// Load markdown file from any path
	async loadFile(path) {
		try {
			const response = await fetch(path);
			if (!response.ok) return null;
			return response.text();
		} catch (error) {
			console.error(`Error loading markdown file: ${path}`, error);
			return null;
		}
	},

	// Parse frontmatter from markdown content
	parseFrontmatter(markdown) {
		const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
		const match = markdown.match(frontmatterRegex);

		if (!match) {
			return { metadata: {}, content: markdown };
		}

		const [, frontmatter, content] = match;
		const metadata = {};

		for (const line of frontmatter.split("\n")) {
			const colonIndex = line.indexOf(":");
			if (colonIndex === -1) continue;

			const key = line.slice(0, colonIndex).trim();
			const value = line.slice(colonIndex + 1).trim();

			if (!key || !value) continue;

			// Handle arrays in frontmatter
			if (value.startsWith("[") && value.endsWith("]")) {
				try {
					metadata[key] = JSON.parse(value.replace(/'/g, '"'));
				} catch (e) {
					console.warn(
						`Failed to parse array in frontmatter for key: ${key}`,
						e,
					);
					metadata[key] = value;
				}
			} else {
				metadata[key] = value.replace(/^["']|["']$/g, "");
			}
		}

		return { metadata, content: content.trim() };
	},

	// Load and parse markdown with frontmatter
	async loadWithFrontmatter(path) {
		const markdown = await this.loadFile(path);
		if (!markdown) return null;
		return this.parseFrontmatter(markdown);
	},

	// Load markdown and render to HTML
	async loadAsHtml(path) {
		const markdown = await this.loadFile(path);
		if (!markdown) return null;
		return Templates.markdown(markdown).content || Templates.markdown(markdown);
	},

	// Load markdown with frontmatter and render content to HTML
	async loadWithFrontmatterAsHtml(path) {
		const result = await this.loadWithFrontmatter(path);
		if (!result) return null;
		return {
			metadata: result.metadata,
			html:
				Templates.markdown(result.content).content ||
				Templates.markdown(result.content),
			content: result.content,
		};
	},
};

// ===========================================
// BLOG MANAGEMENT
// ===========================================

const loadBlogPosts = async () => {
	try {
		const data = await getData();
		const postFiles = data?.blog?.posts || [];
		if (postFiles.length === 0) return [];

		const results = await Promise.allSettled(postFiles.map(processBlogPost));
		const posts = results
			.filter((result) => result.status === "fulfilled")
			.map((result) => result.value);

		return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
	} catch (error) {
		console.error("Error loading blog posts:", error);
		return [];
	}
};

const processBlogPost = async (post) => {
	const slug = post.filename.replace(/\.md$/, "");
	// Use YAML metadata
	return createPostObject(slug, post, post.filename);
};

const createPostObject = (slug, data, filename, content = null) => ({
	slug,
	title: data.title || "Untitled",
	date: data.date || "",
	excerpt: data.excerpt || "",
	tags: data.tags || [],
	content,
	filename,
});

const loadBlogPage = async (page = 1) => {
	const mainContent = document.getElementById("main-content");
	if (!mainContent) return;

	const data = await getData();
	document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

	mainContent.innerHTML = Templates.loadingSpinner();

	const posts = await loadBlogPosts();
	const pagination = calculatePagination(
		posts,
		page,
		data?.blog?.postsPerPage || 5,
	);

	if (pagination.pagePosts.length === 0) {
		mainContent.innerHTML = Templates.blogEmpty();
		return;
	}

	const postsHtml = pagination.pagePosts
		.map((post, index) =>
			Templates.blogPostCard(post, pagination.startIndex + index),
		)
		.join("");

	mainContent.innerHTML = Templates.blogContainer(
		postsHtml,
		Templates.blogPagination(pagination.currentPage, pagination.totalPages),
	);

	setupBlogCardClicks();
};

const calculatePagination = (posts, page, postsPerPage) => {
	const totalPages = Math.ceil(posts.length / postsPerPage);
	const currentPage = Math.max(1, Math.min(page, totalPages));
	const startIndex = (currentPage - 1) * postsPerPage;
	const endIndex = startIndex + postsPerPage;

	return {
		totalPages,
		currentPage,
		startIndex,
		pagePosts: posts.slice(startIndex, endIndex),
	};
};

const setupBlogCardClicks = () => {
	document.querySelectorAll(".blog-post-card").forEach((card) => {
		card.addEventListener("click", (e) => {
			if (e.target.closest("a") || e.target.closest(".clickable-tag")) return;

			const link = card.querySelector(".blog-post-title a");
			if (link) {
				e.preventDefault();
				window.history.pushState({}, "", link.getAttribute("href"));
				handleRoute();
			}
		});
	});
};

const loadBlogPost = async (slug) => {
	const mainContent = document.getElementById("main-content");
	if (!mainContent) return;

	const data = await getData();
	document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

	mainContent.innerHTML = Templates.loadingSpinner();

	const posts = await loadBlogPosts();
	const post = posts.find((p) => p.slug === slug);

	if (!post) {
		mainContent.innerHTML = Templates.errorMessage(
			i18n.t("general.blogNotFound"),
			i18n.t("general.blogNotFoundMessage"),
		);
		return;
	}

	const content = await loadBlogPostContent(post);
	mainContent.innerHTML = Templates.blogPost(post, content);
};

const loadBlogPostContent = async (post) => {
	if (post.content) return post.content;
	if (!post.filename) return null;

	const result = await MarkdownLoader.loadWithFrontmatter(
		`data/blog/${post.filename}`,
	);
	return result?.content || null;
};

// ===========================================
// PROJECT MANAGEMENT
// ===========================================

const loadProjectLinks = async (projectId, containerId) => {
	if (!projectId || !containerId) return;

	const container = document.getElementById(containerId);
	if (!container) return;

	try {
		const data = await getData();
		const project = data?.projects?.find((p) => p.id === projectId);
		if (!data || !project?.links) {
			container.style.display = "none";
			return;
		}

		container.innerHTML = Templates.projectLinksSection(
			project.links.map(Templates.projectLink).join(""),
		);
	} catch (error) {
		console.error(`Error loading content for project ${projectId}`, error);
	}
};

const loadPage = async (pageId) => {
	const mainContent = document.getElementById("main-content");
	if (!mainContent) return;

	try {
		const data = await getData();
		document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

		// Load markdown content
		const content = await MarkdownLoader.loadAsHtml(`data/pages/${pageId}.md`);

		mainContent.innerHTML =
			content ||
			Templates.errorMessage(
				i18n.t("general.notFound"),
				i18n.t("general.notFoundMessage"),
			);
	} catch (error) {
		console.error(`Error loading page ${pageId}:`, error);
		mainContent.innerHTML = Templates.errorMessage(
			i18n.t("general.error"),
			i18n.t("general.errorMessage"),
		);
	}
};

const loadProjectPage = async (projectId) => {
	const mainContent = document.getElementById("main-content");
	if (!mainContent) return;

	try {
		const data = await getData();
		const project = data?.projects?.find((p) => p.id === projectId);

		if (!project) {
			mainContent.innerHTML = Templates.errorMessage(
				i18n.t("general.projectNotFound"),
				i18n.t("general.projectNotFoundMessage"),
			);
			return;
		}

		document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

		// Build project content sections
		const sections = [
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
					project.youtube_videos.map(Templates.youtubeVideo).join(""),
				),
			project.demo_url && Templates.demoIframe(project.demo_url),
			Templates.dynamicContainer("project-links", "project", project.id, ""),
		];

		mainContent.innerHTML = sections.filter(Boolean).join("");
	} catch (error) {
		console.error(`Error loading project page ${projectId}:`, error);
		mainContent.innerHTML = Templates.errorMessage(
			i18n.t("general.error"),
			i18n.t("general.errorMessage"),
		);
	}
};

const loadProjectsDropdown = async () => {
	const dropdown = document.getElementById("projects-dropdown");
	if (!dropdown) return;

	try {
		const data = await getData();
		if (!data?.projects) return;

		dropdown.innerHTML = data.projects
			.sort((a, b) => a.order - b.order)
			.map((p) => Templates.projectDropdownItem(p.id, p.title))
			.join("");
	} catch (error) {
		console.error("Error loading projects dropdown:", error);
	}
};

const loadAdditionalContent = async () => {
	const promises = [];

	for (const id of ["github-readme", "project-links"]) {
		const el = document.getElementById(id);
		if (!el) continue;

		if (el.dataset.repo && el.parentElement) {
			promises.push(loadGitHubReadme(el.dataset.repo, el.id));
		}
		if (el.dataset.project) {
			promises.push(loadProjectLinks(el.dataset.project, el.id));
		}
	}

	try {
		await Promise.all(promises);
	} catch (error) {
		console.error("Error loading additional content", error);
	}
};

// ===========================================
// ROUTING & PAGE MANAGEMENT
// ===========================================

const handleRoute = async () => {
	closeMobileMenu();

	// Helper function for page transitions
	const startTransition = async () => {
		const mainContent = document.getElementById("main-content");
		if (!mainContent) return;
		mainContent.classList.add("page-transition-out");
		await new Promise((resolve) =>
			setTimeout(resolve, CONSTANTS.PAGE_TRANSITION_DELAY),
		);
		mainContent.innerHTML = Templates.loadingSpinner();
	};

	const endTransition = () => {
		const mainContent = document.getElementById("main-content");
		if (mainContent) {
			mainContent.classList.remove("page-transition-out");

			// Apply Prism syntax highlighting to all code blocks
			if (typeof Prism !== "undefined") {
				requestAnimationFrame(() => {
					Prism.highlightAllUnder(mainContent);
				});
			}
		}
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
		requestAnimationFrame(updateActiveNavLink);
	};

	const params = new URLSearchParams(window.location.search);
	const route = {
		project: params.get("project"),
		page: params.get("page"),
		blog: params.get("blog"),
		blogPage: params.get("p") ? parseInt(params.get("p"), 10) : 1,
	};

	await startTransition();

	try {
		const data = await getData();

		if (route.blog !== null) {
			await (route.blog === ""
				? loadBlogPage(route.blogPage)
				: loadBlogPost(route.blog));
		} else if (route.project) {
			await loadProjectPage(route.project);
			await new Promise((resolve) => requestAnimationFrame(resolve));
			await loadAdditionalContent();
		} else if (route.page) {
			await loadPage(route.page);
		} else {
			const defaultRoute = data.site?.defaultRoute || "?blog";
			window.history.replaceState({}, "", defaultRoute);
			await handleRoute();
			return;
		}

		endTransition();
	} catch (error) {
		console.error("Error loading page:", error);
		endTransition();
		const mainContent = document.getElementById("main-content");
		if (mainContent) {
			mainContent.innerHTML = Templates.errorMessage(
				i18n.t("general.error"),
				i18n.t("general.errorMessage"),
			);
		}
		document.title = projectsData?.site?.title || CONSTANTS.DEFAULT_TITLE;
	}
};

// ===========================================
// APPLICATION INITIALIZATION
// ===========================================

document.addEventListener("DOMContentLoaded", async () => {
	try {
		initializeMarked();

		const data = await getData();
		if (data?.site) updateMetaTags(data.site);

		await injectNavbar();
		await injectFooter();
		await loadProjectsDropdown();
		await handleRoute();

		window.addEventListener("popstate", handleRoute);
		setupSpaRouting();
		addMobileMenuOutsideClickHandler();
	} catch (error) {
		console.error("Error initializing page:", error);
		const mainContent = document.getElementById("main-content");
		if (mainContent) {
			mainContent.innerHTML = Templates.errorMessage(
				"Something went wrong",
				"Please refresh the page to try again.",
			);
		}
	}
});

const updateActiveNavLink = () => {
	const navbar = document.getElementById("navbar-container");
	if (!navbar) return;

	const navbarLinks = navbar.querySelectorAll(".navbar-nav .nav-link");
	const dropdownItems = navbar.querySelectorAll(".dropdown-item");
	const projectDropdown = navbar.querySelector(".dropdown");

	const params = new URLSearchParams(window.location.search);
	const pageId = params.get("page");
	const projectId = params.get("project");
	const blogParam = params.get("blog");

	const targets = {};
	if (blogParam !== null) {
		targets.link = navbar.querySelector('.nav-link[href="?blog"]');
	} else if (projectId) {
		targets.dropdownToggle = projectDropdown?.querySelector(".dropdown-toggle");
		targets.dropdownItem = navbar.querySelector(
			`.dropdown-item[href="?project=${projectId}"]`,
		);
	} else if (pageId) {
		targets.link = navbar.querySelector(`.nav-link[href="?page=${pageId}"]`);
	}

	navbarLinks.forEach((link) => {
		link?.classList.toggle(
			"active",
			link === targets.link || link === targets.dropdownToggle,
		);
	});
	dropdownItems.forEach((item) => {
		item?.classList.toggle("active", item === targets.dropdownItem);
	});
};

const handleSpaLinkClick = (e) => {
	const link = e.target.closest("[data-spa-route]");
	if (!link) return;

	e.preventDefault();

	const navbar = document.getElementById("navbar-container");
	if (!navbar) return;

	const navbarLinks = navbar.querySelectorAll(".navbar-nav .nav-link");
	const dropdownItems = navbar.querySelectorAll(".dropdown-item");

	const isDropdownItem = link.classList.contains("dropdown-item");
	const dropdownToggle = isDropdownItem
		? link.closest(".dropdown")?.querySelector(".dropdown-toggle")
		: null;

	navbarLinks.forEach((navLink) => {
		navLink?.classList.toggle(
			"active",
			navLink === link || navLink === dropdownToggle,
		);
	});
	dropdownItems.forEach((item) => {
		item?.classList.toggle("active", item === link);
	});

	closeMobileMenu();
	window.history.pushState({}, "", link.getAttribute("href"));
	handleRoute();
};

const setupSpaRouting = () => {
	document.addEventListener("click", handleSpaLinkClick);
};

const addMobileMenuOutsideClickHandler = () => {
	document.addEventListener("click", (event) => {
		const navbar = document.getElementById("navbar-container");
		if (!navbar) return;

		if (
			window.innerWidth <= CONSTANTS.MOBILE_BREAKPOINT &&
			!navbar.contains(event.target)
		) {
			closeMobileMenu();
		}
	});
};
