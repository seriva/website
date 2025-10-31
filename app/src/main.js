// ===========================================
// MAIN APPLICATION
// ===========================================
// Entry point - ES6 modules version

import { CONSTANTS } from "./constants.js";
import { getData, updateMetaTags } from "./data.js";
import { marked } from "./dependencies/marked.js";
import {
	handleRoute,
	injectFooter,
	injectNavbar,
	loadProjectsDropdown,
	setupSpaRouting,
} from "./routing.js";
import { Search } from "./search.js";
import { Templates } from "./templates.js";
import {
	Email,
	addMobileMenuOutsideClickHandler,
	fullscreen,
	initCustomDropdowns,
	initNavbarToggle,
} from "./ui.js";
import { escapeHtml, getMainContent } from "./utils.js";

// ===========================================
// GLOBAL EXPORTS
// ===========================================

// Expose functions for HTML onclick handlers
window.fullscreen = fullscreen;
window.Email = Email;

// ===========================================
// MARKDOWN CONFIGURATION
// ===========================================

const initializeMarked = () => {
	if (!marked) {
		console.error("Marked not loaded");
		return;
	}

	marked.use({
		breaks: true,
		gfm: true,
		renderer: {
			code(code, language) {
				// If language is specified, add Prism-compatible class
				const lang = language || "text";
				const validLang = lang.match(/^[a-zA-Z0-9-]+$/) ? lang : "text";
				return `<pre><code class="language-${validLang}">${escapeHtml(code)}</code></pre>`;
			},
		},
	});
};

// ===========================================
// SEARCH FUNCTIONALITY
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
				onResultClick();
				window.history.pushState({}, "", link.getAttribute("href"));
				handleRoute();
				return;
			}

			// Handle card clicks
			const card = e.target.closest(".search-result-item");
			if (card && !e.target.closest("a, .clickable-tag")) {
				const cardLink = card.querySelector(".blog-post-title a");
				if (cardLink) {
					e.preventDefault();
					onResultClick();
					window.history.pushState({}, "", cardLink.getAttribute("href"));
					handleRoute();
				}
			}
		};
	} else {
		resultsContainer.innerHTML = Templates.searchNoResults();
		resultsContainer.classList.add("show");
	}
};

const initializeSearch = () => {
	const searchToggle = document.getElementById("search-toggle");
	if (!searchToggle) return;

	Search.init(false);

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

const initializeSearchPage = (searchConfig) => {
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
// PLACEHOLDER - Will add more modules here
// ===========================================

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
	try {
		// Initialize markdown parser
		initializeMarked();

		// Load and apply site data
		const data = await getData();
		if (data?.site) {
			updateMetaTags(data.site);
		}

		// Inject navbar and footer first
		await injectNavbar();
		await injectFooter();
		await loadProjectsDropdown();

		// Initialize UI components after DOM elements are ready
		initCustomDropdowns();
		initNavbarToggle();

		// Initialize search if enabled
		if (data?.site?.search?.enabled) {
			initializeSearch();
			initializeSearchPage(data.site.search);
		}

		// Handle initial route
		await handleRoute();

		// Set up routing
		window.addEventListener("popstate", handleRoute);
		setupSpaRouting();
		addMobileMenuOutsideClickHandler();
	} catch (error) {
		console.error("Failed to initialize application:", error);
		// Show error in main content
		const mainContent = getMainContent();
		if (mainContent) {
			mainContent.innerHTML = Templates.errorMessage(
				"Something went wrong",
				"Please refresh the page to try again.",
			);
		}
	}
});
