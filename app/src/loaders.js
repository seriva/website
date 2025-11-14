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
import { Templates } from "./templates.js";
import { UI } from "./ui.js";

// ===========================================
// LOADERS NAMESPACE
// ===========================================

export const Loaders = {
	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Load and display blog page with pagination
	async loadBlogPage(page = 1) {
		const mainContent = document.getElementById("main-content");
		const data = Context.get();
		document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

		mainContent.innerHTML = Templates.loadingSpinner();

		const posts = await Loaders._loadBlogPosts(data);
		const postsPerPage = data?.blog?.postsPerPage || 5;
		const totalPages = Math.ceil(posts.length / postsPerPage);
		const currentPage = Math.max(1, Math.min(page, totalPages));
		const startIndex = (currentPage - 1) * postsPerPage;
		const endIndex = startIndex + postsPerPage;
		const paginatedPosts = posts.slice(startIndex, endIndex);

		if (paginatedPosts.length === 0) {
			mainContent.innerHTML = Templates.blogEmpty();
			return;
		}

		const postsHtml = paginatedPosts
			.map((post, index) => Templates.blogPostCard(post, startIndex + index))
			.join("");

		mainContent.innerHTML = Templates.blogContainer(
			postsHtml,
			Templates.blogPagination(currentPage, totalPages),
		);

		Loaders._setupBlogCardClicks();
		document.title = `${data.blog.title || "Blog"} - ${data.site?.title || CONSTANTS.DEFAULT_TITLE}`;
	},

	// Load and display a single blog post
	async loadBlogPost(slug) {
		const mainContent = document.getElementById("main-content");
		mainContent.innerHTML = Templates.loadingSpinner();
		const data = Context.get();
		const posts = await Loaders._loadBlogPosts(data);
		const post = posts.find((p) => p.slug === slug || p.id === slug);

		if (!post) {
			mainContent.innerHTML = Templates.errorMessage(
				i18n.t("general.blogNotFound"),
				i18n.t("general.blogNotFoundMessage"),
			);
			return;
		}

		const content = await Loaders._loadBlogPostContent(post);

		const commentsHtml = Templates.giscusComments(data?.site?.comments, "blog");
		mainContent.innerHTML = Templates.blogPost(post, content) + commentsHtml;

		document.title = `${post.title} - ${data.site?.title || CONSTANTS.DEFAULT_TITLE}`;
	},

	// Load and display a project page
	async loadProjectPage(projectId, _data) {
		const mainContent = document.getElementById("main-content");
		try {
			const data = Context.get();
			const project = data?.projects?.find((p) => p.id === projectId);

			if (!project) {
				mainContent.innerHTML = Templates.errorMessage(
					i18n.t("general.projectNotFound"),
					i18n.t("general.projectNotFoundMessage"),
				);
				return;
			}

			document.title = `${project.title} - ${data.site?.title || CONSTANTS.DEFAULT_TITLE}`;

			// Build project content sections
			const sections = [
				Templates.projectHeader(
					project.title,
					project.description,
					project.tags,
				),
				project.github_repo &&
					Templates.dynamicContainer(
						"github-readme",
						"repo",
						project.github_repo,
						i18n.t("project.loadingReadme"),
					),
				project.youtube_videos?.length &&
					Templates.mediaSection(
						project.youtube_videos.map(Templates.youtubeVideo).join(""),
					),
				project.demo_url && Templates.demoIframe(project.demo_url),
				Templates.dynamicContainer("project-links", "project", project.id, ""),
				Templates.giscusComments(data?.site?.comments, "projects"),
			];

			mainContent.innerHTML = sections.filter(Boolean).join("");
		} catch (error) {
			console.error(`Error loading project page ${projectId}:`, error);
			mainContent.innerHTML = Templates.errorMessage(
				i18n.t("general.error"),
				i18n.t("general.errorMessage"),
			);
		}
	},

	// Load and display a generic content page
	async loadPage(pageId, _data) {
		const mainContent = document.getElementById("main-content");
		try {
			const data = Context.get();
			document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

			// Load markdown content
			const content = await MarkdownLoader.loadAsHtml(
				`data/pages/${pageId}.md`,
			);

			mainContent.innerHTML =
				content ||
				Templates.errorMessage(
					i18n.t("general.notFound"),
					i18n.t("general.notFoundMessage"),
				);
		} catch (error) {
			console.error(`Error loading page ${pageId}:`, error);
			mainContent.innerHTML = Templates.errorMessage(
				i18n.t("general.error"),
				i18n.t("general.errorMessage"),
			);
		}
	},

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

			const results = await Promise.allSettled(
				postFiles.map(async (post) => {
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
				}),
			);
			const posts = results
				.filter((result) => result.status === "fulfilled")
				.map((result) => result.value);

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

	// Setup click handlers for blog post cards
	_setupBlogCardClicks() {
		for (const card of document.querySelectorAll(".blog-post-card")) {
			card.addEventListener("click", (e) => {
				if (e.target.closest("a") || e.target.closest(".clickable-tag")) return;

				const link = card.querySelector(".blog-post-title a");
				if (link) {
					e.preventDefault();
					const href = link.getAttribute("href");
					window.history.pushState({}, "", href);
					// Dynamic import to avoid circular dependency
					import("./routing.js").then(({ Router }) => Router.handleRoute());
				}
			});
		}
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

			container.innerHTML = Templates.projectLinksSection(
				project.links.map(Templates.projectLink).join(""),
			);
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
				element.innerHTML = Templates.githubReadmeError();
			}
		} catch (error) {
			console.warn(`Failed to load README for ${repo}:`, error);
			element.innerHTML = Templates.githubReadmeError();
		}
	},
};
