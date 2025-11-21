// ===========================================
// MAIN
// ===========================================
// Application entry point and initialization

import { Context } from "./context.js";
import { ContactForm } from "./email.js";
import { ErrorHandler } from "./error-handler.js";
import { Footer } from "./footer.js";
import { MainContent } from "./main-content.js";
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

		// Initialize layout components
		new Navbar();
		new MainContent();
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

		// Set up global event delegation for data-action attributes
		document.addEventListener("click", (e) => {
			const target = e.target.closest("[data-action]");
			if (!target) return;

			const action = target.getAttribute("data-action");
			if (action === "email") {
				e.preventDefault();
				window.dispatchEvent(new CustomEvent("email:show"));
			}
		});

		// Handle initial route
		await Router.handleRoute(); // Set up routing
		window.addEventListener("popstate", Router.handleRoute);
		Router.setupSpaRouting();

		// Show the app now that everything is loaded
		document.body.classList.add("app-ready");
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
		// Show the body even on error
		document.body.classList.add("app-ready");
	}
});
