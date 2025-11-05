// ===========================================
// ROUTING
// ===========================================
// SPA routing system - orchestrates page navigation

import { CONSTANTS } from "./constants.js";
import { getContext } from "./context.js";
import { i18n } from "./i18n.js";
import {
	loadAdditionalContent,
	loadBlogPage,
	loadBlogPost,
	loadPage,
	loadProjectPage,
} from "./loaders.js";
import { highlightElement } from "./prism-loader.js";
import { Templates } from "./templates.js";
import {
	closeMobileMenu,
	initCopyCodeButtons,
	updateActiveNavLink,
} from "./ui.js";
import { getMainContent } from "./utils.js";

// ===========================================
// MAIN ROUTING HANDLER
// ===========================================

export const handleRoute = async () => {
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
		const data = getContext();

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
			// No route specified - redirect to default and load blog
			const defaultRoute = data.site?.defaultRoute || "?blog";
			window.history.replaceState({}, "", defaultRoute);
			await loadBlogPage(1);
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
			const data = getContext();
			document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;
		} catch {
			document.title = CONSTANTS.DEFAULT_TITLE;
		}
	}
};

// ===========================================
// SPA ROUTING SETUP
// ===========================================

export const setupSpaRouting = () => {
	document.addEventListener("click", (event) => {
		const link = event.target.closest('a[href^="?"]');
		if (link && !event.ctrlKey && !event.metaKey) {
			event.preventDefault();
			const href = link.getAttribute("href");
			if (href !== window.location.search) {
				window.history.pushState({}, "", href);
				// Update active link immediately for instant visual feedback
				updateActiveNavLink();
				handleRoute();
			}
		}
	});
};
