// ===========================================
// SEARCH FUNCTIONALITY
// ===========================================
// Fuse.js powered search for projects and blog posts

import { CONSTANTS } from "./constants.js";
import { getData } from "./data.js";
import Fuse from "./dependencies/fuse.js.js";

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
				const data = await getData();
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

	// Highlight search query in text
	highlight(text, query) {
		if (!query) return text;
		const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(`(${escapedQuery})`, "gi");
		return text.replace(regex, "<mark>$1</mark>");
	},
};

// Open search page with tag pre-filled
export const searchByTag = (tag) => {
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

// Expose globally for HTML onclick handlers
window.searchByTag = searchByTag;
