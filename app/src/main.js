// ===========================================
// MAIN APPLICATION
// ===========================================
// Entry point - orchestrates initialization

import { Context } from "./context.js";
import { ContactForm } from "./email.js";
import { ErrorHandler } from "./error-handler.js";
import { Footer } from "./footer.js";
import { MarkdownLoader } from "./markdown.js";
import { Navbar } from "./navbar.js";
import { Router } from "./routing.js";
import { Search } from "./search.js";
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

		// Initialize navbar and footer
		new Navbar();
		new Footer();

		// Initialize contact form if enabled
		if (data?.site?.emailjs?.enabled) {
			new ContactForm();
		}

		// Initialize search if enabled
		if (data?.site?.search?.enabled) {
			new Search();
		}

		// Initialize theme system (loads user preference from localStorage)
		Theme.init();

		// Handle 404.html redirect (for dev server and GitHub Pages)
		const hash = window.location.hash;
		if (hash.startsWith("#!redirect=")) {
			const redirect = decodeURIComponent(hash.substring(11));
			// Replace the URL with the original path
			window.history.replaceState({}, "", redirect);
		}

		// Handle initial route
		await Router.handleRoute(); // Set up routing
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
