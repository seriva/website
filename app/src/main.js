// ===========================================
// MAIN APPLICATION
// ===========================================
// Entry point - orchestrates initialization

import { Context } from "./context.js";
import { EmailController } from "./email.js";
import { ErrorHandler } from "./error-handler.js";
import { FooterController } from "./footer.js";
import { MarkdownLoader } from "./markdown.js";
import { NavbarController } from "./navbar.js";
import { Router } from "./routing.js";
import { SearchController } from "./search.js";
import { Templates } from "./templates.js";
import { Theme } from "./theme.js";

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

		// Initialize navbar, footer, and email contact form
		new NavbarController();
		new FooterController();
		new EmailController();

		// Initialize search if enabled
		const searchConfig = data?.site?.search;
		if (searchConfig?.enabled) {
			new SearchController();
		}

		// Initialize theme system (loads user preference from localStorage)
		Theme.init();

		// Handle initial route
		await Router.handleRoute();

		// Set up routing
		window.addEventListener("popstate", Router.handleRoute);
		Router.setupSpaRouting();
	} catch (error) {
		console.error("Failed to initialize application:", error);
		// Show error in main content
		const mainContent = document.getElementById("main-content");
		if (mainContent) {
			mainContent.innerHTML = Templates.errorMessage(
				"Something went wrong",
				"Please refresh the page to try again.",
			).content;
		}
	}
});
