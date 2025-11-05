// ===========================================
// SEARCH UI
// ===========================================
// Search page and search bar functionality

import { CONSTANTS } from "./constants.js";
import { navigateToRoute } from "./router-events.js";
import { Search } from "./search.js";
import { Templates } from "./templates.js";

// ===========================================
// SEARCH QUERY HANDLER
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
				navigateToRoute(link.getAttribute("href"));
				return;
			}

			// Handle card clicks
			const card = e.target.closest(".search-result-item");
			if (card && !e.target.closest("a, .clickable-tag")) {
				const cardLink = card.querySelector(".blog-post-title a");
				if (cardLink) {
					e.preventDefault();
					onResultClick();
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
// SEARCH TOGGLE
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
// SEARCH PAGE
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
