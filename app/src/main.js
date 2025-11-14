// ===========================================
// MAIN APPLICATION
// ===========================================
// Entry point - orchestrates initialization

import { Context } from "./context.js";
import { Email } from "./email.js";
import { ErrorHandler } from "./error-handler.js";
import { Layout } from "./layout.js";
import { MarkdownLoader } from "./markdown.js";
import { Router } from "./routing.js";
import { Search } from "./search.js";
import { Templates } from "./templates.js";
import { Theme } from "./theme.js";
import { UI } from "./ui.js";

// ===========================================
// APPLICATION INITIALIZATION
// ===========================================

// Initialize error handler first (before anything can fail)
ErrorHandler.init();

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

		// Initialize EmailJS contact form if enabled
		Email.init();

		// Setup global event delegation for dynamic content (email, fullscreen, etc.)
		UI.setupGlobalEventDelegation(); // Inject layout components (navbar, footer, dropdowns)
		await Layout.init();

		// Initialize UI components after DOM elements are ready
		UI.init();

		// Initialize search if enabled
		if (data?.site?.search?.enabled) {
			Search.initUI(data.site.search);
		}

		// Initialize theme system (loads user preference from localStorage)
		Theme.init();

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
