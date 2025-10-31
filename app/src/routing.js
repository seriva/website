// ===========================================
// ROUTING MODULE
// ===========================================

import { CONSTANTS } from "./constants.js";
import { getData } from "./data.js";
import { marked } from "./dependencies/marked.js";
import { i18n } from "./i18n.js";
import { MarkdownLoader } from "./markdown.js";
import { highlightElement } from "./prism-loader.js";
import { Templates } from "./templates.js";
import {
	closeMobileMenu,
	initCopyCodeButtons,
	updateActiveNavLink,
} from "./ui.js";
import { getMainContent } from "./utils.js";

// Removed unused variable

// Blog post loading functions
const loadBlogPosts = async () => {
	try {
		const data = await getData();
		const postFiles = data?.blog?.posts || [];
		if (postFiles.length === 0) return [];

		const results = await Promise.allSettled(postFiles.map(processBlogPost));
		const posts = results
			.filter((result) => result.status === "fulfilled")
			.map((result) => result.value);

		return posts.sort((a, b) => new Date(b.date) - new Date(a.date));
	} catch (error) {
		console.error("Error loading blog posts:", error);
		return [];
	}
};

const processBlogPost = async (post) => {
	const slug = post.filename.replace(/\.md$/, "");
	// Use YAML metadata
	return createPostObject(slug, post, post.filename);
};

const createPostObject = (slug, data, filename, content = null) => ({
	slug,
	title: data.title || "Untitled",
	date: data.date || "",
	excerpt: data.excerpt || "",
	tags: data.tags || [],
	content,
	filename,
	id: slug,
});

// Page loading functions
const loadBlogPage = async (page = 1) => {
	const mainContent = getMainContent();
	const data = await getData();
	document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

	mainContent.innerHTML = Templates.loadingSpinner();

	const posts = await loadBlogPosts();
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

	setupBlogCardClicks();
	document.title = `${data.blog.title || "Blog"} - ${data.site?.title || CONSTANTS.DEFAULT_TITLE}`;
};

const setupBlogCardClicks = () => {
	for (const card of document.querySelectorAll(".blog-post-card")) {
		card.addEventListener("click", (e) => {
			if (e.target.closest("a") || e.target.closest(".clickable-tag")) return;

			const link = card.querySelector(".blog-post-title a");
			if (link) {
				e.preventDefault();
				window.history.pushState({}, "", link.getAttribute("href"));
				handleRoute();
			}
		});
	}
};

const loadBlogPost = async (slug) => {
	const mainContent = getMainContent();
	const data = await getData();
	document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

	mainContent.innerHTML = Templates.loadingSpinner();

	const posts = await loadBlogPosts();
	const post = posts.find((p) => p.slug === slug || p.id === slug);

	if (!post) {
		mainContent.innerHTML = Templates.errorMessage(
			i18n.t("general.blogNotFound"),
			i18n.t("general.blogNotFoundMessage"),
		);
		return;
	}

	const content = await loadBlogPostContent(post);
	const commentsHtml = Templates.giscusComments(data?.site?.comments, "blog");
	mainContent.innerHTML = Templates.blogPost(post, content) + commentsHtml;
	
	document.title = `${post.title} - ${data.site?.title || CONSTANTS.DEFAULT_TITLE}`;
};

const loadBlogPostContent = async (post) => {
	if (post.content) return post.content;
	if (!post.filename) return null;

	const result = await MarkdownLoader.loadWithFrontmatter(`data/blog/${post.filename}`);
	return result?.content || null;
};

const loadProjectPage = async (projectId) => {
	const mainContent = getMainContent();

	try {
		const data = await getData();
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
			Templates.projectHeader(project.title, project.description, project.tags),
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
};

const loadPage = async (pageId) => {
	const mainContent = getMainContent();

	try {
		const data = await getData();
		document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;

		// Load markdown content
		const content = await MarkdownLoader.loadAsHtml(`data/pages/${pageId}.md`);

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
};

const loadProjectLinks = async (projectId, containerId) => {
	if (!projectId || !containerId) return;

	const container = document.getElementById(containerId);
	if (!container) return;

	try {
		const data = await getData();
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
};

const loadAdditionalContent = async () => {
	const promises = [];

	// Check for elements that need dynamic content
	for (const id of ["github-readme", "project-links"]) {
		const el = document.getElementById(id);
		if (!el) continue;

		// Load GitHub README if element has data-repo attribute
		if (el.dataset.repo && el.parentElement) {
			promises.push(loadGitHubReadme(el.dataset.repo, el.id));
		}
		
		// Load project links if element has data-project attribute
		if (el.dataset.project) {
			promises.push(loadProjectLinks(el.dataset.project, el.id));
		}
	}

	try {
		await Promise.all(promises);
	} catch (error) {
		console.error("Error loading additional content", error);
	}
};

const loadGitHubReadme = async (repo, containerId) => {
	const element = document.getElementById(containerId);
	if (!element) return;

	try {
		// Add seriva/ prefix if not already present
		const fullRepo = repo.includes("/") ? repo : `seriva/${repo}`;

		const response = await fetch(
			`https://api.github.com/repos/${fullRepo}/readme`,
			{
				headers: { Accept: "application/vnd.github.v3.raw" },
			},
		);

		if (response.ok) {
			const readmeContent = await response.text();
			const htmlContent = marked.parse(readmeContent);
			element.innerHTML = `<div class="markdown-body">${htmlContent}</div>`;
			
			// Apply Prism syntax highlighting to code blocks in the README
			// This will dynamically load any needed language grammars from CDN
			requestAnimationFrame(async () => {
				await highlightElement(element);
				// Add copy buttons after syntax highlighting
				initCopyCodeButtons();
			});
		} else {
			console.warn(`GitHub API returned ${response.status} for ${fullRepo}`);
			element.innerHTML = Templates.githubReadmeError();
		}
	} catch (error) {
		console.warn(`Failed to load README for ${repo}:`, error);
		element.innerHTML = Templates.githubReadmeError();
	}
};

// Main routing handler
const handleRoute = async () => {
	closeMobileMenu();

	// Helper function for page transitions
	const startTransition = async () => {
		const mainContent = getMainContent();
		mainContent.classList.add("page-transition-out");
		await new Promise((resolve) =>
			setTimeout(resolve, CONSTANTS.PAGE_TRANSITION_DELAY),
		);
		mainContent.innerHTML = Templates.loadingSpinner();
	};

	const endTransition = () => {
		const mainContent = getMainContent();
		if (mainContent) {
			mainContent.classList.remove("page-transition-out");

			// Apply Prism syntax highlighting to all code blocks
			// This will dynamically load any needed language grammars from CDN
			requestAnimationFrame(async () => {
				await highlightElement(mainContent);
				// Add copy buttons after syntax highlighting
				initCopyCodeButtons();
			});
		}
		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
		requestAnimationFrame(updateActiveNavLink);
	};

	const params = new URLSearchParams(window.location.search);
	const route = {
		project: params.get("project"),
		page: params.get("page"),
		blog: params.get("blog"),
		blogPage: params.get("p") ? Number.parseInt(params.get("p"), 10) : 1,
	};

	await startTransition();

	try {
		const data = await getData();

		if (route.blog !== null) {
			await (route.blog === ""
				? loadBlogPage(route.blogPage)
				: loadBlogPost(route.blog));
		} else if (route.project) {
			await loadProjectPage(route.project);
			await new Promise((resolve) => requestAnimationFrame(resolve));
			await loadAdditionalContent();
		} else if (route.page) {
			await loadPage(route.page);
		} else {
			const defaultRoute = data.site?.defaultRoute || "?blog";
			window.history.replaceState({}, "", defaultRoute);
			await handleRoute();
			return;
		}

		endTransition();
	} catch (error) {
		console.error("Error loading page:", error);
		endTransition();
		const mainContent = getMainContent();
		mainContent.innerHTML = Templates.errorMessage(
			i18n.t("general.error"),
			i18n.t("general.errorMessage"),
		);
		// Get data for title, but don't fail if it's not available
		try {
			const data = await getData();
			document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;
		} catch {
			document.title = CONSTANTS.DEFAULT_TITLE;
		}
	}
};

// Navbar and footer injection
const injectNavbar = async () => {
	const navbarContainer = document.getElementById("navbar-container");
	if (!navbarContainer) return;

	const data = await getData();
	const pages = data?.pages
		? Object.entries(data.pages).map(([id, page]) => ({ id, ...page }))
		: [];

	if (data?.blog?.showInNav) {
		pages.push({
			id: "blog",
			title: data.blog.title || "Blog",
			showInNav: true,
		});
	}

	// Build navbar inline
	const blogPage = pages.find((page) => page.id === "blog");
	const blogLink = blogPage
		? Templates.pageLink(blogPage.id, blogPage.title)
		: "";
	const pageLinks = pages
		.filter((page) => page.id !== "blog" && page.showInNav)
		.sort((a, b) => a.order - b.order)
		.map((page) => Templates.pageLink(page.id, page.title))
		.join("");
	const socialLinksHtml = (data?.site?.social || [])
		.map((link) => Templates.socialLink(link))
		.join("");
	const searchBar = data?.site?.search?.enabled ? Templates.searchBar() : "";
	const projectsDropdown = Templates.projectsDropdown();

	navbarContainer.innerHTML = Templates.navbar(
		blogLink,
		projectsDropdown,
		pageLinks,
		socialLinksHtml,
		searchBar,
		data?.site?.title || CONSTANTS.DEFAULT_TITLE,
	);

	// Inject search page into body if search is enabled
	if (data?.site?.search?.enabled) {
		const existingSearchPage = document.getElementById("search-page");
		if (!existingSearchPage) {
			document.body.insertAdjacentHTML(
				"beforeend",
				Templates.searchPage(
					data.site.search.placeholder || i18n.t("search.placeholder"),
				),
			);
		}
	}
};

const injectFooter = async () => {
	const footerContainer = document.getElementById("footer-container");
	if (!footerContainer) return;

	try {
		const data = await getData();
		const authorName = data?.site?.author || "Portfolio Owner";
		const currentYear = new Date().getFullYear();

		footerContainer.innerHTML = Templates.footer(authorName, currentYear);
	} catch (error) {
		console.error("Error injecting footer:", error);
	}
};

const loadProjectsDropdown = async () => {
	const data = await getData();
	const projectsDropdown = document.getElementById("projects-dropdown");
	if (!projectsDropdown || !data?.projects) return;

	const projectsHtml = data.projects
		.map((project) => Templates.projectDropdownItem(project.id, project.title))
		.join("");

	projectsDropdown.innerHTML = projectsHtml;
};

// SPA routing setup
const setupSpaRouting = () => {
	document.addEventListener("click", (event) => {
		const link = event.target.closest('a[href^="?"]');
		if (link && !event.ctrlKey && !event.metaKey) {
			event.preventDefault();
			const href = link.getAttribute("href");
			if (href !== window.location.search) {
				window.history.pushState({}, "", href);
				handleRoute();
			}
		}
	});
};

export {
	handleRoute,
	injectNavbar,
	injectFooter,
	loadProjectsDropdown,
	setupSpaRouting,
	loadBlogPage,
	loadBlogPost,
	loadProjectPage,
	loadPage,
	loadAdditionalContent,
	loadBlogPostContent,
};
