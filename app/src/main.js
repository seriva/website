// ===========================================
// MAIN APPLICATION
// ===========================================
// Entry point - orchestrates initialization

import { Context } from "./context.js";
import { Layout } from "./layout.js";
import { MarkdownLoader } from "./markdown.js";
import { RouterEvents } from "./router-events.js";
import { Router } from "./routing.js";
import { Search } from "./search.js";
import { Templates } from "./templates.js";
import { UI } from "./ui.js";

// ===========================================
// APPLICATION INITIALIZATION
// ===========================================

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
	try {
		// Initialize markdown parser
		MarkdownLoader.init();

		// Load and cache site data (single call!)
		const data = await Context.init();

		if (data?.site) {
			Context.updateMetaTags(data.site);
		}

		// Register route handler for navigation (no global coupling!)
		RouterEvents.registerRouteHandler(Router.handleRoute);

		// Setup global event delegation for dynamic content (email, fullscreen, etc.)
		UI.setupGlobalEventDelegation(data?.site?.email);

		// Inject layout components (navbar, footer, dropdowns)
		await Layout.init();

		// Initialize UI components after DOM elements are ready
		UI.init();

		// Initialize search if enabled
		if (data?.site?.search?.enabled) {
			Search.initUI(data.site.search);
		}

		// Handle initial route
		await Router.handleRoute();

		// Set up routing
		window.addEventListener("popstate", Router.handleRoute);
		Router.setupSpaRouting();
		UI.addMobileMenuOutsideClickHandler();
	} catch (error) {
		console.error("Failed to initialize application:", error);
		// Show error in main content
		const mainContent = document.getElementById("main-content");
		if (mainContent) {
			mainContent.innerHTML = Templates.errorMessage(
				"Something went wrong",
				"Please refresh the page to try again.",
			);
		}
	}
});
