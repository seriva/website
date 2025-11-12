// ===========================================
// ROUTING
// ===========================================
// SPA routing system - orchestrates page navigation

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { Loaders } from "./loaders.js";
import { PrismLoader } from "./prism-loader.js";
import { Templates } from "./templates.js";
import { UI } from "./ui.js";

// ===========================================
// ROUTER NAMESPACE
// ===========================================

export const Router = {
	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Main routing handler - orchestrates page navigation
	async handleRoute() {
		UI.closeMobileMenu();

		// Parse URL parameters into route object
		const params = new URLSearchParams(window.location.search);
		const route = {
			project: params.get("project"),
			page: params.get("page"),
			blog: params.get("blog"),
			blogPage: params.get("p") ? Number.parseInt(params.get("p"), 10) : 1,
		};

		// Cache main content element to avoid repeated DOM queries
		const mainContent = document.getElementById("main-content");

		// Start page transition
		await Router._startTransition(mainContent);

		try {
			// Route to appropriate content loader
			if (route.blog !== null) {
				// Blog: either blog listing (empty string) or specific post (slug)
				await (route.blog === ""
					? Loaders.loadBlogPage(route.blogPage)
					: Loaders.loadBlogPost(route.blog));
			} else if (route.project) {
				// Project: load project page then additional content (README, links)
				await Loaders.loadProjectPage(route.project);
				// Wait for next frame to ensure DOM updates before loading additional content
				await new Promise((resolve) => requestAnimationFrame(resolve));
				await Loaders.loadAdditionalContent();
			} else if (route.page) {
				// Custom page: load markdown page
				await Loaders.loadPage(route.page);
			} else {
				// No route specified: redirect to default route and load blog
				const data = Context.get();
				const defaultRoute = data?.site?.defaultRoute || "?blog";
				window.history.replaceState({}, "", defaultRoute);
				await Loaders.loadBlogPage(1);
			}

			// End transition and apply post-render tasks
			Router._endTransition(mainContent);
		} catch (error) {
			// Handle routing/loading errors gracefully
			console.error("Error loading page:", error);
			Router._endTransition(mainContent);
			mainContent.innerHTML = Templates.errorMessage(
				i18n.t("general.error"),
				i18n.t("general.errorMessage"),
			);

			// Set fallback title
			const data = Context.get();
			document.title = data?.site?.title || CONSTANTS.DEFAULT_TITLE;
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

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	// Start page transition animation
	async _startTransition(mainContent) {
		mainContent.classList.add("page-transition-out");
		await new Promise((resolve) =>
			setTimeout(resolve, CONSTANTS.PAGE_TRANSITION_DELAY),
		);
		mainContent.innerHTML = Templates.loadingSpinner();
	},

	// End page transition and finalize page load
	_endTransition(mainContent) {
		mainContent.classList.remove("page-transition-out");

		// Schedule post-render tasks
		requestAnimationFrame(async () => {
			await PrismLoader.highlight(mainContent);
			UI.initCopyCodeButtons();
			UI.updateActiveNavLink();
		});

		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	},
};
