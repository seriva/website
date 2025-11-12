// ===========================================
// ROUTING
// ===========================================
// SPA routing system - orchestrates page navigation

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { Loaders } from "./loaders.js";
import { highlightElement } from "./prism-loader.js";
import { Templates } from "./templates.js";
import { UI } from "./ui.js";
import { getMainContent } from "./utils.js";

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
			UI.initCopyCodeButtons();
		});
	}
	window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	requestAnimationFrame(UI.updateActiveNavLink);
};

// ===========================================
// ROUTER NAMESPACE
// ===========================================

export const Router = {
	// Main routing handler - orchestrates page navigation
	async handleRoute() {
		UI.closeMobileMenu();

		const params = new URLSearchParams(window.location.search);
		const route = {
			project: params.get("project"),
			page: params.get("page"),
			blog: params.get("blog"),
			blogPage: params.get("p") ? Number.parseInt(params.get("p"), 10) : 1,
		};

		await startTransition();

		try {
			const data = Context.get();

			if (route.blog !== null) {
				await (route.blog === ""
					? Loaders.loadBlogPage(route.blogPage)
					: Loaders.loadBlogPost(route.blog));
			} else if (route.project) {
				await Loaders.loadProjectPage(route.project);
				await new Promise((resolve) => requestAnimationFrame(resolve));
				await Loaders.loadAdditionalContent();
			} else if (route.page) {
				await Loaders.loadPage(route.page);
			} else {
				// No route specified - redirect to default and load blog
				const defaultRoute = data.site?.defaultRoute || "?blog";
				window.history.replaceState({}, "", defaultRoute);
				await Loaders.loadBlogPage(1);
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
				const data = Context.get();
				document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;
			} catch {
				document.title = CONSTANTS.DEFAULT_TITLE;
			}
		}
	},

	// Setup SPA routing event listeners
	setupSpaRouting() {
		document.addEventListener("click", (event) => {
			const link = event.target.closest('a[href^="?"]');
			if (link && !event.ctrlKey && !event.metaKey) {
				event.preventDefault();
				const href = link.getAttribute("href");
				if (href !== window.location.search) {
					window.history.pushState({}, "", href);
					// Update active link immediately for instant visual feedback
					UI.updateActiveNavLink();
					Router.handleRoute();
				}
			}
		});
	},
};
