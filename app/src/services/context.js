// ===========================================
// CONTEXT
// ===========================================
// Global state management and data loading

import { CONSTANTS } from "../utils/constants.js";
import { YAMLParser } from "../utils/yaml-parser.js";
import { i18n } from "./i18n.js";
import { MarkdownLoader } from "./markdown.js";

let appContext = null;
const readmeCache = new Map();

// ===========================================
// CONTEXT NAMESPACE
// ===========================================

export const Context = {
	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Initialize application context from YAML
	async init() {
		if (appContext) return appContext;

		const yamlPath = "/data/content.yaml";

		try {
			const response = await fetch(yamlPath);
			if (!response.ok) throw new Error(`HTTP ${response.status}`);

			const yamlText = await response.text();
			appContext = YAMLParser.parse(yamlText);

			// Initialize i18n
			if (appContext?.site?.i18n && appContext?.translations) {
				i18n.init(appContext.site.i18n, appContext.translations);
			}

			this._updateMetaTags();

			// Preload project READMEs in the background (non-blocking)
			if (appContext?.projects?.length) {
				this.preloadReadmes().catch((err) =>
					console.warn("Failed to preload READMEs:", err),
				);
			}

			return appContext;
		} catch (error) {
			console.error("Failed to load content:", error);
			appContext = null;
			return null;
		}
	},

	// Get cached application context (must call init first)
	get() {
		return appContext;
	},

	// Get cached README for a project repo
	getReadme(repo) {
		return readmeCache.get(repo) || null;
	},

	// Get blog posts transformed into proper structure
	getBlogPosts() {
		const postFiles = appContext?.blog?.posts || [];
		if (postFiles.length === 0) return [];

		const posts = postFiles.map((post) => {
			const slug = post.filename.replace(/\.md$/, "");
			return {
				slug,
				title: post.title || "Untitled",
				date: post.date || "",
				excerpt: post.excerpt || "",
				tags: post.tags || [],
				content: null,
				filename: post.filename,
				id: slug,
			};
		});

		return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
	},

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	// Set context manually (for testing)
	_set(data) {
		appContext = data;
	},

	// Update HTML meta tags with site data
	_updateMetaTags() {
		if (!appContext?.site) return;

		if (appContext.site.title) {
			document.title = appContext.site.title;
		}

		const updateMeta = (selector, value) => {
			if (value) {
				document.querySelector(selector)?.setAttribute("content", value);
			}
		};

		updateMeta('meta[name="description"]', appContext.site.description);
		updateMeta('meta[name="author"]', appContext.site.author);
		updateMeta('meta[name="theme-color"]', appContext.site.colors?.primary);
		updateMeta(
			'meta[name="msapplication-TileColor"]',
			appContext.site.colors?.primary,
		);
		updateMeta('meta[property="og:title"]', appContext.site.title);
		updateMeta('meta[property="twitter:title"]', appContext.site.title);
		updateMeta('meta[property="og:description"]', appContext.site.description);
		updateMeta(
			'meta[property="twitter:description"]',
			appContext.site.description,
		);
	},

	// Cache a README for a project repo
	cacheReadme(repo, content) {
		if (content) {
			readmeCache.set(repo, content);
		}
	},

	// Preload all project READMEs in parallel
	async preloadReadmes() {
		if (!appContext?.projects?.length) return;

		const githubUsername = appContext.site?.github_username || "seriva";

		const promises = appContext.projects
			.filter((project) => project.github_repo)
			.map(async (project) => {
				const repo = project.github_repo;
				const branch = project.github_branch || "main";
				const fullRepo = repo.includes("/")
					? repo
					: `${githubUsername}/${repo}`;

				try {
					const url = `${CONSTANTS.GITHUB_RAW_BASE}/${fullRepo}/${branch}/README.md`;
					const content = await MarkdownLoader.loadFile(url);

					if (content) {
						readmeCache.set(repo, content);
					}
				} catch (error) {
					console.warn(`Failed to preload README for ${repo}:`, error);
				}
			});

		await Promise.all(promises);
	},
};
