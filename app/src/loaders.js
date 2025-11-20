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
import { UI } from "./ui.js";

// ===========================================
// LOADERS NAMESPACE
// ===========================================

export const Loaders = {
	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Load additional dynamic content (READMEs, project links)
	async loadAdditionalContent() {
		const promises = [];

		// Check for elements that need dynamic content
		for (const id of ["github-readme", "project-links"]) {
			const el = document.getElementById(id);
			if (!el) continue;

			// Load GitHub README if element has data-repo attribute
			if (el.dataset.repo && el.parentElement) {
				promises.push(Loaders._loadGitHubReadme(el.dataset.repo, el.id));
			}

			// Load project links if element has data-project attribute
			if (el.dataset.project) {
				promises.push(Loaders._loadProjectLinks(el.dataset.project, el.id));
			}
		}

		try {
			await Promise.all(promises);
		} catch (error) {
			console.error("Error loading additional content", error);
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

	// Load project links section
	async _loadProjectLinks(projectId, containerId) {
		if (!projectId || !containerId) return;

		const container = document.getElementById(containerId);
		if (!container) return;

		try {
			const data = Context.get();
			const project = data?.projects?.find((p) => p.id === projectId);
			if (!data || !project?.links) {
				container.style.display = "none";
				return;
			}

			const links = project.links;
			const linksHtml = trusted(
				links
					.map((link) => _tplProjectLink(link).content)
					.join(""),
			);

			container.innerHTML = _tplProjectLinksSection(linksHtml).content;
		} catch (error) {
			console.error(`Error loading content for project ${projectId}`, error);
		}
	},

	// Load and render GitHub README
	async _loadGitHubReadme(repo, containerId) {
		const element = document.getElementById(containerId);
		if (!element) return;

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

			if (readmeContent) {
				const htmlContent = marked.parse(readmeContent);
				element.innerHTML = `<div class="markdown-body">${htmlContent}</div>`;

				// Apply Prism syntax highlighting to code blocks in the README
				requestAnimationFrame(async () => {
					await PrismLoader.highlight(element);
					// Add copy buttons after syntax highlighting
					UI.initCopyCodeButtons();
				});
			} else {
				console.warn(`Failed to load README for ${fullRepo}`);
				element.innerHTML = Templates.githubReadmeError().content;
			}
		} catch (error) {
			console.warn(`Failed to load README for ${repo}:`, error);
			element.innerHTML = Templates.githubReadmeError().content;
		}
	},
};

// ===========================================
// PRIVATE TEMPLATE HELPERS
// ===========================================

const _tplProjectLink = (link) => html`
    <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="download-btn">
        <i class="${link.icon}"></i>
        <span>${link.title}</span>
    </a>`;

const _tplProjectLinksSection = (linksHtml) => html`
    <div class="markdown-body">
        <h2>${i18n.t("project.links")}</h2>
        <div class="download-buttons">${linksHtml}</div>
    </div>`;

