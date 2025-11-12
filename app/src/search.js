// ===========================================
// SEARCH FUNCTIONALITY
// ===========================================
// Fuse.js powered search for projects and blog posts with UI

import { CONSTANTS } from "./constants.js";
import { getContext } from "./context.js";
import Fuse from "./dependencies/fuse.js.js";
import { navigateToRoute } from "./router-events.js";
import { Templates } from "./templates.js";
import { getMainContent } from "./utils.js";

// ===========================================
// SEARCH CORE
// ===========================================

// Cache for compiled regexes (improves repeated search highlighting)
const regexCache = new Map();

export const Search = {
	data: [],
	isInitialized: false,
	initPromise: null,
	fuse: null,

	// Initialize search index with content
	async init() {
		if (this.initPromise) return this.initPromise;
		if (this.isInitialized) return;

		this.initPromise = (async () => {
			try {
				const data = getContext();
				const projects = data?.projects || [];
				const blogPosts = data?.blog?.posts || [];

				// Index projects (without READMEs for performance)
				const projectsIndexed = projects.map((p) => ({
					id: p.id,
					title: p.title,
					description: p.description,
					tags: p.tags || [],
					content: "",
					type: "project",
					url: `?project=${p.id}`,
					github_repo: p.github_repo,
				}));

				// Index blog posts from YAML metadata
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

				this.data = [...projectsIndexed, ...blogPostsIndexed];

				// Initialize Fuse.js with weighted search keys
				this.fuse = new Fuse(this.data, {
					keys: [
						{ name: "title", weight: CONSTANTS.SEARCH_WEIGHT_TITLE },
						{
							name: "description",
							weight: CONSTANTS.SEARCH_WEIGHT_DESCRIPTION,
						},
						{ name: "tags", weight: CONSTANTS.SEARCH_WEIGHT_TAGS },
						{ name: "content", weight: CONSTANTS.SEARCH_WEIGHT_CONTENT },
					],
					includeScore: true,
					threshold: CONSTANTS.SEARCH_THRESHOLD,
					ignoreLocation: true,
					minMatchCharLength: CONSTANTS.SEARCH_MIN_MATCH_LENGTH,
				});

				this.isInitialized = true;
			} catch (error) {
				console.error("Error initializing search:", error);
				this.initPromise = null;
			}
		})();

		return this.initPromise;
	},

	// Perform search query
	search(query) {
		if (!query || query.length < CONSTANTS.SEARCH_MIN_CHARS || !this.fuse) {
			return [];
		}

		const results = this.fuse.search(query);
		return results
			.slice(0, CONSTANTS.SEARCH_MAX_RESULTS)
			.map((result) => result.item);
	},

	// Highlight search query in text (with memoized regex)
	highlight(text, query) {
		if (!query) return text;

		// Check cache first for better performance
		let regex = regexCache.get(query);
		if (!regex) {
			const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			regex = new RegExp(`(${escapedQuery})`, "gi");
			regexCache.set(query, regex);

			// Limit cache size to prevent memory leaks
			if (regexCache.size > 100) {
				const firstKey = regexCache.keys().next().value;
				regexCache.delete(firstKey);
			}
		}

		return text.replace(regex, "<mark>$1</mark>");
	},
};

// ===========================================
// SEARCH UI - QUERY HANDLER
// ===========================================

const handleSearchQuery = (query, resultsContainer, onResultClick) => {
	const results = Search.search(query);

	if (results.length > 0) {
		resultsContainer.innerHTML = results
			.map((item) => Templates.searchResult(item, query, Search))
			.join("");
		resultsContainer.classList.add("show");

		// Use event delegation for better performance
		resultsContainer.onclick = (e) => {
			// Handle SPA links
			const link = e.target.closest("[data-spa-route]");
			if (link) {
				e.preventDefault();
				// Start page transition immediately to prevent flicker
				const mainContent = getMainContent();
				mainContent.classList.add("page-transition-out");
				// Small delay before closing search page ensures main content transition has started
				setTimeout(() => {
					onResultClick();
				}, 50);
				navigateToRoute(link.getAttribute("href"));
				return;
			}

			// Handle card clicks
			const card = e.target.closest(".search-result-item");
			if (card && !e.target.closest("a, .clickable-tag")) {
				const cardLink = card.querySelector(".blog-post-title a");
				if (cardLink) {
					e.preventDefault();
					// Start page transition immediately to prevent flicker
					const mainContent = getMainContent();
					mainContent.classList.add("page-transition-out");
					// Small delay before closing search page ensures main content transition has started
					setTimeout(() => {
						onResultClick();
					}, 50);
					navigateToRoute(cardLink.getAttribute("href"));
				}
			}
		};
	} else {
		resultsContainer.innerHTML = Templates.searchNoResults();
		resultsContainer.classList.add("show");
	}
};

// ===========================================
// SEARCH UI - TOGGLE
// ===========================================

export const initializeSearch = () => {
	const searchToggle = document.getElementById("search-toggle");
	if (!searchToggle) return;

	Search.init();

	// Cache search page elements
	const searchPage = document.getElementById("search-page");
	const searchInput = document.getElementById("search-page-input");

	const openSearchPage = () => {
		if (searchPage) {
			searchPage.classList.add("show");
			if (searchInput) {
				requestAnimationFrame(() => searchInput.focus());
			}
		}
	};

	searchToggle.addEventListener("click", (e) => {
		e.preventDefault();
		openSearchPage();
	});
};

// ===========================================
// SEARCH UI - SEARCH PAGE
// ===========================================

export const initializeSearchPage = (searchConfig) => {
	// Cache all search page elements once
	const elements = {
		page: document.getElementById("search-page"),
		input: document.getElementById("search-page-input"),
		results: document.getElementById("search-page-results"),
		back: document.getElementById("search-page-back"),
		clear: document.getElementById("search-page-clear"),
	};

	if (!elements.page || !elements.input || !elements.results) return;

	const minChars = searchConfig.minChars || CONSTANTS.SEARCH_MIN_CHARS;
	let searchTimeout = null;

	const closeSearchPage = () => {
		if (searchTimeout) {
			clearTimeout(searchTimeout);
			searchTimeout = null;
		}
		elements.page.classList.add("closing");
		setTimeout(() => {
			elements.page.classList.remove("show", "closing");
			elements.input.value = "";
			elements.results.innerHTML = "";
		}, CONSTANTS.SEARCH_PAGE_CLOSE_DELAY);
	};

	const handleSearchInput = (e) => {
		const query = e.target.value.trim();

		if (query.length < minChars) {
			elements.results.innerHTML = "";
			return;
		}

		if (searchTimeout) clearTimeout(searchTimeout);
		searchTimeout = setTimeout(() => {
			handleSearchQuery(query, elements.results, closeSearchPage);
		}, CONSTANTS.SEARCH_DEBOUNCE_MS);
	};

	// Attach event listeners
	elements.back.addEventListener("click", closeSearchPage);
	elements.input.addEventListener("input", handleSearchInput);
	elements.input.addEventListener("keydown", (e) => {
		if (e.key === "Escape") closeSearchPage();
	});

	if (elements.clear) {
		elements.clear.addEventListener("click", () => {
			elements.input.value = "";
			elements.results.innerHTML = "";
			elements.input.focus();
		});
	}

	elements.page.addEventListener("click", (e) => {
		if (e.target === elements.page) closeSearchPage();
	});
};

// ===========================================
// SEARCH UI - TAG SEARCH
// ===========================================

// Open search page with tag pre-filled
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

// Initialize tag search event delegation
export const initializeTagSearch = () => {
	document.addEventListener("click", (event) => {
		const tagElement = event.target.closest("[data-search-tag]");
		if (!tagElement) return;

		event.preventDefault();
		event.stopPropagation();

		const tag = tagElement.getAttribute("data-search-tag");
		if (tag) {
			searchByTag(tag);
		}
	});
};
