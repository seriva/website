// ===========================================
// ROUTING
// ===========================================
// SPA routing system - orchestrates page navigation

import { BlogList } from "./blog-list.js";
import { BlogPost } from "./blog-post.js";
import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { MarkdownLoader } from "./markdown.js";
import { Page } from "./page.js";
import { PrismLoader } from "./prism-loader.js";
import { Project } from "./project.js";
import { Templates } from "./templates.js";

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

		// Parse URL path
		const path = window.location.pathname;

		// Cache main content element to avoid repeated DOM queries
		const mainContent = document.getElementById("main-content");

		// Start page transition
		await Router._startTransition(mainContent);

		try {
			// Route to appropriate component
			if (path === "/" || path === "/blog") {
				// Blog listing (default)
				new BlogList(1);
			} else if (path.startsWith("/blog/page/")) {
				// Blog pagination
				const page = parseInt(path.split("/").pop(), 10) || 1;
				new BlogList(page);
			} else if (path.startsWith("/blog/")) {
				// Blog post
				const slug = path.split("/").pop();
				new BlogPost(slug);
			} else if (path.startsWith("/project/")) {
				// Project detail
				const id = path.split("/").pop();
				new Project(id);
			} else if (path.startsWith("/page/")) {
				// Custom page
				const id = path.split("/").pop();
				new Page(id);
			} else {
				// 404 or default fallback
				// For now, redirect to home if unknown, or show error
				// But since we might be on a static host with 404s, let's try to handle it gracefully
				// If it's a hard 404 from server, we might not even get here unless we have a catch-all.
				// Assuming SPA setup:
				new BlogList(1);
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
			// Find closest anchor tag
			const link = event.target.closest("a");

			// Check if it's a local link and not external
			if (
				link?.href.startsWith(window.location.origin) &&
				!link.hasAttribute("download") &&
				!link.getAttribute("target") &&
				!event.ctrlKey &&
				!event.metaKey
			) {
				event.preventDefault();
				const href = link.getAttribute("href");

				// Only navigate if it's a different path
				if (href !== window.location.pathname) {
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
			MarkdownLoader.initCopyCodeButtons();
		});

		window.scrollTo({ top: 0, left: 0, behavior: "instant" });
	},
};
