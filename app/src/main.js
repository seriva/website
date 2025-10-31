import Fuse from "./dependencies/fuse.js.js";
// Main application entry point - ES6 modules version
import { marked } from "./dependencies/marked.js";
import Prism from "./dependencies/prismjs.js";
import YAML from "./dependencies/yamljs.js";

import { CONSTANTS } from "./constants.js";
import { getData, updateMetaTags } from "./data.js";
import { i18n } from "./i18n.js";
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
	closeMobileMenu,
	fullscreen,
	initCustomDropdowns,
	initNavbarToggle,
} from "./ui.js";
import { escapeHtml, getMainContent, getNavbar, html, safe } from "./utils.js";

// ===========================================
// EXPOSE GLOBALS (only what's needed)
// ===========================================
// HTML onclick handlers (used in templates)
window.fullscreen = fullscreen;
window.Email = Email;

// ===========================================
// APPLICATION INITIALIZATION
// ===========================================

// ===========================================
// MARKDOWN & SYNTAX HIGHLIGHTING
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
				const lang = language || 'text';
				const validLang = lang.match(/^[a-zA-Z0-9-]+$/) ? lang : 'text';
				return `<pre><code class="language-${validLang}">${escapeHtml(code)}</code></pre>`;
			}
		}
	});
};

// ===========================================
// PRISM THEME MANAGEMENT
// ===========================================

const applyPrismTheme = (themeName) => {
	const themeLink = document.getElementById("prism-theme");
	if (themeLink) {
		const newHref = `${CONSTANTS.PRISM_CDN_BASE}${themeName}.min.css`;
		themeLink.href = newHref;
	}
};

// ===========================================
// SEARCH INITIALIZATION
// ===========================================

const handleSearchQuery = (query, resultsContainer, onResultClick) => {
	const results = Search.search(query);

	if (results.length > 0) {
		resultsContainer.innerHTML = results
			.map((item) => Templates.searchResult(item, query, Search))
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

		console.log("Portfolio website initialized with ES6 modules!");
		console.log("Dependencies loaded:", { marked, Prism, Fuse, YAML });
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
