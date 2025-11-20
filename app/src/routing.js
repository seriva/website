// ===========================================
// ROUTING
// ===========================================
// SPA routing system - orchestrates page navigation

import { CONSTANTS } from "./constants.js";
import { BlogListController } from "./blog-list.js";
import { BlogPostController } from "./blog-post.js";
import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { PageController } from "./page.js";
import { PrismLoader } from "./prism-loader.js";
import { ProjectController } from "./project.js";
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
		// Close mobile menu on navigation
		window.dispatchEvent(new CustomEvent("navbar:close-mobile"));

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
			// Route to appropriate component
			if (route.blog !== null) {
				// Blog: either blog listing (empty string) or specific post (slug)
				if (route.blog === "") {
					new BlogListController(route.blogPage);
				} else {
					new BlogPostController(route.blog);
				}
			} else if (route.project) {
				// Project: render project detail page
				new ProjectController(route.project);
			} else if (route.page) {
				// Custom page: render markdown page
				new PageController(route.page);
			} else {
				// No route specified: redirect to default route
				const data = Context.get();
				const defaultRoute = data?.site?.defaultRoute || "?blog";
				window.history.replaceState({}, "", defaultRoute);
				new BlogListController(1);
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
			).content;

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
					window.dispatchEvent(new CustomEvent("route-changed"));
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
		mainContent.innerHTML = Templates.loadingSpinner().content;
	},

	// End page transition and finalize page load
	_endTransition(mainContent) {
		mainContent.classList.remove("page-transition-out");

		// Schedule post-render tasks
		requestAnimationFrame(async () => {
			await PrismLoader.highlight(mainContent);
			UI.initCopyCodeButtons();
		});

		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	},
};
