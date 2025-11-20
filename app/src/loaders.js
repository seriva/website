// ===========================================
// CONTENT LOADERS
// ===========================================
// Load and render blog posts, projects, pages, and external content

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { marked } from "./dependencies/marked.js";
import { i18n } from "./i18n.js";
import { MarkdownLoader } from "./markdown.js";
import { PrismLoader } from "./prism-loader.js";
import { html, join, trusted } from "./reactive.js";
import { Templates } from "./templates.js";

// ===========================================
// LOADERS NAMESPACE
// ===========================================

export const Loaders = {
	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Fetch GitHub README content
	async fetchGitHubReadme(repo) {
		try {
			const data = Context.get();
			const githubUsername = data?.site?.github_username || "seriva";

			// Add username prefix if not already present
			const fullRepo = repo.includes("/") ? repo : `${githubUsername}/${repo}`;

			// Use raw.githubusercontent.com to avoid API rate limits
			// Try 'main' branch first, fallback to 'master' if needed
			const rawUrl = `${CONSTANTS.GITHUB_RAW_BASE}/${fullRepo}/main/README.md`;

			// Load README using MarkdownLoader
			let readmeContent = await MarkdownLoader.loadFile(rawUrl);

			// Fallback to master branch if main doesn't exist
			if (!readmeContent) {
				const masterUrl = `${CONSTANTS.GITHUB_RAW_BASE}/${fullRepo}/master/README.md`;
				readmeContent = await MarkdownLoader.loadFile(masterUrl);
			}

			return readmeContent;
		} catch (error) {
			console.warn(`Failed to load README for ${repo}:`, error);
			return null;
		}
	},

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	// Load all blog posts from data
	async _loadBlogPosts(data) {
		try {
			const postFiles = data?.blog?.posts || [];
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
		} catch (error) {
			console.error("Error loading blog posts:", error);
			return [];
		}
	},

	// Load blog post content from markdown file
	async _loadBlogPostContent(post) {
		if (post.content) return post.content;
		if (!post.filename) return null;

		const result = await MarkdownLoader.loadWithFrontmatter(
			`data/blog/${post.filename}`,
		);
		return result?.content || null;
	},


};

// ===========================================
// PRIVATE TEMPLATE HELPERS
// ===========================================



