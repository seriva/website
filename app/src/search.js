// ===========================================
// SEARCH FUNCTIONALITY
// ===========================================
// Fuse.js powered search for projects and blog posts with reactive UI

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import Fuse from "./dependencies/fuse.js.js";
import { i18n } from "./i18n.js";
import { html, Reactive, trusted } from "./reactive.js";

export class SearchController extends Reactive.Component {
	searchData = [];
	fuse = null;
	searchTimeout = null;

	constructor() {
		super();
		this.initState();

		// Initialize search index
		this._initSearchIndex();

		// Render and append search page to body
		const searchPage = this.render();
		document.body.appendChild(searchPage);

		// Setup search toggle button
		const searchToggle = document.getElementById("search-toggle");
		if (searchToggle) {
			searchToggle.addEventListener("click", (e) => {
				e.preventDefault();
				window.dispatchEvent(new CustomEvent("navbar:close-mobile"));
				this.show();
			});
		}

		// Listen for search events
		window.addEventListener("search:show", () => this.show());
		window.addEventListener("search:show-tag", (e) =>
			this.showWithTag(e.detail.tag),
		);

		// Setup tag search delegation
		this._setupTagSearch();

		// Setup event handlers after DOM is mounted
		this._setupEventHandlers();
	}

	state() {
		const searchConfig = Context.get()?.site?.search || {};

		return {
			// UI state
			pageVisible: false,
			pageClosing: false,
			query: "",

			// Configuration
			minChars: searchConfig.minChars || CONSTANTS.SEARCH_MIN_CHARS,
			searchPlaceholder:
				searchConfig.placeholder || i18n.t("search.placeholder"),

			// Computed values
			results: () => this._performSearch(this.query.get()),
			resultsHtml: () => this._renderResults(),
			pageClass: () => {
				const visible = this.pageVisible.get();
				const closing = this.pageClosing.get();
				if (closing) return "search-page show closing";
				if (visible) return "search-page show";
				return "search-page";
			},
		};
	}

	template() {
		return html`
        <div class="search-page" id="search-page" data-class-show="pageVisible" data-class-closing="pageClosing" data-on-click="_handlePageClick">
            <div class="search-page-header">
                <div class="search-page-header-content">
                    <button class="search-page-back" id="search-page-back" aria-label="${i18n.t("aria.goBack")}" data-on-click="close">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <div class="search-page-input-wrapper">
                        ${this._tplSearchInput()}
                    </div>
                </div>
            </div>
            <div class="search-page-content">
                <div class="search-page-results" id="search-page-results" data-html="resultsHtml"></div>
            </div>
        </div>`;
	}

	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	show() {
		this.batch(() => {
			this.pageClosing.set(false);
			this.pageVisible.set(true);
		});

		const searchInput = document.getElementById("search-page-input");
		if (searchInput) {
			requestAnimationFrame(() => searchInput.focus());
		}
	}

	close() {
		if (!this.pageVisible.get()) return;

		if (this.searchTimeout) {
			clearTimeout(this.searchTimeout);
			this.searchTimeout = null;
		}

		this.pageClosing.set(true);

		setTimeout(() => {
			this.batch(() => {
				this.pageVisible.set(false);
				this.pageClosing.set(false);
				this.query.set("");
			});
		}, CONSTANTS.SEARCH_PAGE_CLOSE_DELAY);
	}

	clearSearch() {
		this.query.set("");
		const searchInput = document.getElementById("search-page-input");
		if (searchInput) {
			searchInput.focus();
		}
	}

	showWithTag(tag) {
		if (!tag) return;

		this.query.set(tag);
		this.show();

		const searchInput = document.getElementById("search-page-input");
		if (searchInput) {
			requestAnimationFrame(() => {
				searchInput.focus();
				searchInput.dispatchEvent(new Event("input", { bubbles: true }));
			});
		}
	}

	// Utility method for highlighting (used by Templates)
	highlight(text, query) {
		if (!query) return text;

		const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(`(${escapedQuery})`, "gi");
		return text.replace(regex, "<mark>$1</mark>");
	}

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	async _initSearchIndex() {
		try {
			const data = Context.get();
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

			this.searchData = [...projectsIndexed, ...blogPostsIndexed];

			// Initialize Fuse.js with weighted search keys
			this.fuse = new Fuse(this.searchData, {
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
		} catch (error) {
			console.error("Error initializing search:", error);
		}
	}

	_performSearch(query) {
		const trimmed = query.trim();
		if (!trimmed || trimmed.length < this.minChars.get() || !this.fuse) {
			return [];
		}

		const results = this.fuse.search(trimmed);
		return results
			.slice(0, CONSTANTS.SEARCH_MAX_RESULTS)
			.map((result) => result.item);
	}

	_renderResults() {
		const results = this.results.get();
		const query = this.query.get();

		if (!query.trim() || query.trim().length < this.minChars.get()) {
			return html``;
		}

		if (results.length > 0) {
			return trusted(
				results
					.map((item) => this._tplSearchResult(item, query).content)
					.join(""),
			);
		}

		return this._tplSearchNoResults();
	}

	_handlePageClick(e) {
		if (e.target.id === "search-page") {
			this.close();
		}
	}

	_setupEventHandlers() {
		// Handle input changes with debouncing
		const searchInput = document.getElementById("search-page-input");
		if (searchInput) {
			searchInput.addEventListener("input", (e) => {
				const value = e.target.value;

				if (this.searchTimeout) clearTimeout(this.searchTimeout);

				this.searchTimeout = setTimeout(() => {
					this.query.set(value);
				}, CONSTANTS.SEARCH_DEBOUNCE_MS);
			});

			// Handle escape key
			searchInput.addEventListener("keydown", (e) => {
				if (e.key === "Escape") this.close();
			});
		}

		const clearButton = document.getElementById("search-page-clear");
		if (clearButton) {
			clearButton.addEventListener("click", () => this.clearSearch());
		}

		// Handle result clicks
		const resultsContainer = document.getElementById("search-page-results");
		if (resultsContainer) {
			this._setupResultClickHandlers(resultsContainer);
		}
	}

	_setupResultClickHandlers(resultsContainer) {
		resultsContainer.addEventListener("click", (e) => {
			// Handle SPA links
			const link = e.target.closest("[data-spa-route]");
			if (link) {
				e.preventDefault();
				// Start page transition immediately to prevent flicker
				const mainContent = document.getElementById("main-content");
				mainContent.classList.add("page-transition-out");

				// Small delay before closing search page
				setTimeout(() => {
					this.close();
				}, 50);

				const href = link.getAttribute("href");
				window.history.pushState({}, "", href);
				// Dynamic import to avoid circular dependency
				import("./routing.js").then(({ Router }) => Router.handleRoute());
				return;
			}

			// Handle card clicks
			const card = e.target.closest(".search-result-item");
			if (card && !e.target.closest("a, .clickable-tag")) {
				const cardLink = card.querySelector(".blog-post-title a");
				if (cardLink) {
					e.preventDefault();
					const mainContent = document.getElementById("main-content");
					mainContent.classList.add("page-transition-out");

					setTimeout(() => {
						this.close();
					}, 50);

					const href = cardLink.getAttribute("href");
					window.history.pushState({}, "", href);
					import("./routing.js").then(({ Router }) => Router.handleRoute());
				}
			}
		});
	}

	_setupTagSearch() {
		document.addEventListener("click", (event) => {
			const tagElement = event.target.closest("[data-search-tag]");
			if (!tagElement) return;

			event.preventDefault();
			event.stopPropagation();

			const tag = tagElement.getAttribute("data-search-tag");
			if (tag) {
				this.showWithTag(tag);
			}
		});
	}

	// ===========================================
	// TEMPLATE METHODS
	// ===========================================

	_tplSearchResult(item, query) {
		const isProject = item.type === "project";
		const typeTag = isProject
			? i18n.t("badges.project")
			: i18n.t("badges.blog");
		const allTags = [typeTag, ...item.tags];

		return html`
            <article class="search-result-item blog-post-card">
                <h2 class="blog-post-title">
                    <a href="${item.url}" data-spa-route="${item.type}">${trusted(this.highlight(item.title, query))}</a>
                </h2>
                <div class="blog-post-meta">
                				<div class="blog-post-meta">
					${allTags.length ? html`<span class="blog-post-tags">${trusted(allTags.map((tag) => html`<span class="item-tag">${tag}</span>`.content).join(" "))}</span>` : ""}
                </div>
                <p class="blog-post-excerpt">${trusted(this.highlight(item.description, query))}</p>
            </article>`;
	}

	_tplSearchNoResults() {
		return html`
        <div class="search-no-results">
            <i class="fas fa-search"></i>
            <p>${i18n.t("search.noResults")}</p>
        </div>`;
	}

	_tplSearchInput() {
		const placeholder = this.searchPlaceholder || i18n.t("search.placeholder");
		return html`
        <input type="search" id="search-page-input" class="search-page-input" placeholder="${placeholder}" autocomplete="off" aria-label="${i18n.t("aria.search")}"/>
        <button class="search-page-clear" id="search-page-clear" aria-label="${i18n.t("aria.clearSearch")}" data-on-click="clearSearch">
            <i class="fas fa-times"></i>
        </button>`;
	}
}

// Export legacy namespace for tests
export const Search = {
	data: [],
	fuse: null,

	_search(query) {
		if (
			!query ||
			query.trim().length < CONSTANTS.SEARCH_MIN_CHARS ||
			!this.fuse
		) {
			return [];
		}

		const results = this.fuse.search(query.trim());
		return results
			.slice(0, CONSTANTS.SEARCH_MAX_RESULTS)
			.map((result) => result.item);
	},
};
