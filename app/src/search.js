import { CONSTANTS } from "./constants.js";
import { getData } from "./data.js";
// Search functionality module
import Fuse from "./dependencies/fuse.js.js";

export const Search = {
	data: [],
	isInitialized: false,
	initPromise: null,
	fuse: null,

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
				this.data = [...projectsIndexed, ...blogPostsIndexed];

				// Initialize Fuse.js
				this.fuse = new Fuse(this.data, {
					keys: [
						{ name: "title", weight: 0.4 },
						{ name: "description", weight: 0.3 },
						{ name: "tags", weight: 0.2 },
						{ name: "content", weight: 0.1 },
					],
					includeScore: true,
					threshold: 0.4,
					ignoreLocation: true,
					minMatchCharLength: 2,
				});

				this.isInitialized = true;
			} catch (error) {
				console.error("Error initializing search:", error);
				this.initPromise = null;
			}
		})();

		return this.initPromise;
	},

	search(query) {
		if (!query || query.length < CONSTANTS.SEARCH_MIN_CHARS || !this.fuse)
			return [];

		const results = this.fuse.search(query);
		return results
			.slice(0, CONSTANTS.SEARCH_MAX_RESULTS)
			.map((result) => result.item);
	},

	highlight(text, query) {
		if (!query) return text;
		const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
		const regex = new RegExp(`(${escapedQuery})`, "gi");
		return text.replace(regex, "<mark>$1</mark>");
	},
};

// Search by tag function (exposed globally for onclick handlers)
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

// Expose searchByTag globally for HTML onclick handlers
window.searchByTag = searchByTag;
