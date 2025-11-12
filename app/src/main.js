// ===========================================
// MAIN APPLICATION
// ===========================================
// Entry point - orchestrates initialization

import { initContext, updateMetaTags } from "./context.js";
import { marked } from "./dependencies/marked.js";
import { injectFooter, injectNavbar, loadProjectsDropdown } from "./layout.js";
import { registerRouteHandler } from "./router-events.js";
import { handleRoute, setupSpaRouting } from "./routing.js";
import {
	initializeSearch,
	initializeSearchPage,
	initializeTagSearch,
} from "./search.js";
import { Templates } from "./templates.js";
import {
	addMobileMenuOutsideClickHandler,
	initCustomDropdowns,
	initNavbarToggle,
	setupGlobalEventDelegation,
} from "./ui.js";
import { escapeHtml, getMainContent } from "./utils.js";

// ===========================================
// MARKDOWN CONFIGURATION
// ===========================================

const initializeMarked = () => {
	if (!marked) {
		console.error("Marked not loaded");
		return;
	}

	marked.use({
		breaks: true,
		gfm: true,
		renderer: {
			code(token) {
				// In marked v12+, renderers receive token objects
				const code = token.text || "";
				const language = token.lang || "";
				// If language is specified, add Prism-compatible class
				const lang = language || "text";
				const validLang = lang.match(/^[a-zA-Z0-9-]+$/) ? lang : "text";
				return `<pre><code class="language-${validLang}">${escapeHtml(code)}</code></pre>`;
			},
		},
	});
};

// ===========================================
// APPLICATION INITIALIZATION
// ===========================================

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
	try {
		// Initialize markdown parser
		initializeMarked();

		// Load and cache site data (single call!)
		const data = await initContext();

		if (data?.site) {
			updateMetaTags(data.site);
		}

		// Register route handler for navigation (no global coupling!)
		registerRouteHandler(handleRoute);

		// Setup global event delegation for dynamic content (email, fullscreen, etc.)
		setupGlobalEventDelegation(data?.site?.email);

		// Inject navbar and footer first
		await injectNavbar();
		await injectFooter();
		await loadProjectsDropdown();

		// Initialize UI components after DOM elements are ready
		initCustomDropdowns();
		initNavbarToggle();

		// Initialize search if enabled
		if (data?.site?.search?.enabled) {
			initializeSearch();
			initializeSearchPage(data.site.search);
			initializeTagSearch();
		}

		// Handle initial route
		await handleRoute();

		// Set up routing
		window.addEventListener("popstate", handleRoute);
		setupSpaRouting();
		addMobileMenuOutsideClickHandler();
	} catch (error) {
		console.error("Failed to initialize application:", error);
		// Show error in main content
		const mainContent = getMainContent();
		if (mainContent) {
			mainContent.innerHTML = Templates.errorMessage(
				"Something went wrong",
				"Please refresh the page to try again.",
			);
		}
	}
});
