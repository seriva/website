// ===========================================
// MAIN APPLICATION
// ===========================================
// Entry point - orchestrates initialization

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { EmailController } from "./email.js";
import { ErrorHandler } from "./error-handler.js";
import { FooterController } from "./footer.js";
import { MarkdownLoader } from "./markdown.js";
import { NavbarController } from "./navbar.js";
import { Router } from "./routing.js";
import { Search } from "./search.js";
import { Templates } from "./templates.js";
import { Theme } from "./theme.js";
import { UI } from "./ui.js";

// Global reference for Email (needed by UI event handlers)
export let Email = null;

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

		// Setup global event delegation for dynamic content (email, fullscreen, etc.)
		document.addEventListener("click", (event) => {
			// Handle email button
			const emailToggle = event.target.closest("#email-toggle");
			if (emailToggle) {
				event.preventDefault();
				UI.closeMobileMenu();
				if (Email?.show) {
					Email.show();
				}
				return;
			}

			// Handle data-action elements (e.g., fullscreen, etc.)
			const actionElement = event.target.closest("[data-action]");
			if (actionElement) {
				const action = actionElement.dataset.action;
				if (action === "fullscreen") {
					const pre = actionElement.closest("pre");
					if (pre) {
						if (!document.fullscreenElement) {
							pre.requestFullscreen().catch((err) => {
								console.error(
									`Error attempting to enable fullscreen: ${err.message}`,
								);
							});
						} else {
							document.exitFullscreen();
						}
					}
				}
				return;
			}

			// Handle social links from dynamically loaded content
			const socialLink = event.target.closest(".social-icon, .social-icons a");
			if (socialLink) {
				return;
			}

			// Close mobile menu when clicking navigation links (not dropdowns)
			const navLink = event.target.closest(".navbar-nav a, .navbar-nav button");
			if (navLink && window.innerWidth <= CONSTANTS.MOBILE_BREAKPOINT) {
				// Don't close menu if clicking dropdown toggle
				if (!navLink.classList.contains("dropdown-toggle")) {
					UI.closeMobileMenu();
				}
			}
		}); // Initialize navbar, footer, and email contact form
		new NavbarController();
		new FooterController();
		Email = new EmailController();

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
			).content;
		}
	}
});
