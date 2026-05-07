// ===========================================
// SEARCH COMPONENT
// ===========================================
// Reactive fuzzy search with Fuse.js for projects and blog posts

import Fuse from "../dependencies/fuse.js.js";
import { Context } from "../services/context.js";
import { i18n } from "../services/i18n.js";
import { Router } from "../services/routing.js";
import { CONSTANTS } from "../utils/constants.js";
import { Icons } from "../utils/icons.js";
import { html, Reactive, trusted } from "../utils/reactive.js";
import { searchStyles } from "./search.styles.js";

export class Search extends Reactive.Component {
	searchData = [];
	fuse = null;
	searchTimeout = null;

	constructor() {
		super();
		// Append search overlay to body (doesn't clear like mountTo)
		this.appendTo("body");
	}

	mount() {
		// Initialize search index after component is mounted
		this._initSearchIndex();
		// Setup search toggle button
		const searchToggle = document.getElementById("search-toggle");
		if (searchToggle) {
			this.on(searchToggle, "click", (e) => {
				e.preventDefault();
				window.dispatchEvent(new CustomEvent("navbar:close-mobile"));
				this.show();
			});
		}

		// Listen for search events
		this.on(window, "search:show", () => this.show());
		this.on(window, "search:show-tag", (e) => this.showWithTag(e.detail.tag));

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
			hasClearButton: () => this.query.get().length > 0,
		};
	}

	styles() {
		return searchStyles;
	}

	template() {
		return html`
        <div id="search-page" data-class-show="pageVisible" data-class-closing="pageClosing" data-on-click="_handlePageClick">
            <div class="search-page-header">
                <div class="search-page-header-content">
                    <button class="search-page-back" id="search-page-back" aria-label="${i18n.t("aria.goBack")}" data-on-click="close">
                        ${trusted(Icons.get("arrow-left", { size: "1.2rem" }))}
                    </button>
                    <div class="search-page-input-wrapper">
                        ${this._tplSearchInput()}
                    </div>
                </div>
            </div>
            <div class="search-page-content">
                <div class="search-page-results" id="search-page-results" data-ref="resultsContainer" data-html="resultsHtml"></div>
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

		if (this.refs.searchInput) {
			setTimeout(() => this.refs.searchInput.focus(), 300);
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
		if (this.refs.searchInput) {
			this.refs.searchInput.focus();
		}
	}

	showWithTag(tag) {
		if (!tag) return;

		this.query.set(tag);
		this.show();

		if (this.refs.searchInput) {
			requestAnimationFrame(() => {
				this.refs.searchInput.focus();
				this.refs.searchInput.dispatchEvent(
					new Event("input", { bubbles: true }),
				);
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
				url: `/project/${p.id}`,
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
					url: `/blog/${slug}`,
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
		const searchInput = this.refs.searchInput;
		if (searchInput) {
			this.on(searchInput, "input", (e) => {
				const value = e.target.value;

				if (this.searchTimeout) clearTimeout(this.searchTimeout);

				this.searchTimeout = setTimeout(() => {
					this.query.set(value);
				}, CONSTANTS.SEARCH_DEBOUNCE_MS);
			});

			// Handle escape key
			this.on(searchInput, "keydown", (e) => {
				if (e.key === "Escape") this.close();
			});
		}

		const clearButton = this.refs.clearButton;
		if (clearButton) {
			this.on(clearButton, "click", () => this.clearSearch());
		}

		// Handle result clicks
		const resultsContainer = this.refs.resultsContainer;
		if (resultsContainer) {
			this._setupResultClickHandlers(resultsContainer);
		}
	}

	_setupResultClickHandlers(resultsContainer) {
		const clickHandler = (e) => {
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
				Router.handleRoute();
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
					Router.handleRoute();
				}
			}
		};
		this.on(resultsContainer, "click", clickHandler);
	}

	_setupTagSearch() {
		this.on(document, "click", (e) => {
			const tagElement = e.target.closest("[data-search-tag]");
			if (!tagElement) return;

			e.preventDefault();
			e.stopPropagation();

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
					${allTags.length ? html`<span class="blog-post-tags">${trusted(allTags.map((tag) => html`<span class="item-tag">${tag}</span>`.content).join(" "))}</span>` : ""}
                </div>
                <p class="blog-post-excerpt">${trusted(this.highlight(item.description, query))}</p>
            </article>`;
	}

	_tplSearchNoResults() {
		return html`
        <div class="search-no-results">
            ${trusted(Icons.get("search", { size: "3rem" }))}
            <p>${i18n.t("search.noResults")}</p>
        </div>`;
	}

	_tplSearchInput() {
		return html`
        <input type="search" id="search-page-input" class="search-page-input" data-ref="searchInput" data-attr-placeholder="searchPlaceholder" autocomplete="off" aria-label="${i18n.t("aria.search")}" data-model="query"/>
        <button class="search-page-clear" id="search-page-clear" data-ref="clearButton" data-visible="hasClearButton" aria-label="${i18n.t("aria.clearSearch")}" data-on-click="clearSearch">
            ${trusted(Icons.get("times", { size: "1.2rem" }))}
        </button>`;
	}
}
