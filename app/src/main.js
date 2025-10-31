import Fuse from "./dependencies/fuse.js.js";
// Main application entry point - ES6 modules version
import { marked } from "./dependencies/marked.js";
import Prism from "./dependencies/prismjs.js";
import YAML from "./dependencies/yamljs.js";

import { CONSTANTS } from "./constants.js";
import { getData, updateMetaTags } from "./data.js";
import { i18n } from "./i18n.js";
import {
	handleRoute,
	injectFooter,
	injectNavbar,
	loadProjectsDropdown,
	setupSpaRouting,
} from "./routing.js";
import { Templates } from "./templates.js";
import {
	Email,
	addMobileMenuOutsideClickHandler,
	closeMobileMenu,
	fullscreen,
	initCustomDropdowns,
	initNavbarToggle,
} from "./ui.js";
import { escapeHtml, getMainContent, getNavbar, html, safe } from "./utils.js";

// ===========================================
// EXPOSE GLOBALS (needed for dynamic language loading)
// ===========================================
window.marked = marked;
window.Prism = Prism;
window.Fuse = Fuse;
window.YAML = YAML;
window.CONSTANTS = CONSTANTS;
window.Templates = Templates;
window.i18n = i18n;
window.html = html;
window.safe = safe;
window.fullscreen = fullscreen;
window.Email = Email;

// ===========================================
// APPLICATION INITIALIZATION
// ===========================================

// ===========================================
// MARKDOWN & SYNTAX HIGHLIGHTING
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
			code(code, language) {
				// If language is specified, add Prism-compatible class
				const lang = language || 'text';
				const validLang = lang.match(/^[a-zA-Z0-9-]+$/) ? lang : 'text';
				return `<pre><code class="language-${validLang}">${escapeHtml(code)}</code></pre>`;
			}
		}
	});
};

// ===========================================
// PRISM THEME MANAGEMENT
// ===========================================

const applyPrismTheme = (themeName) => {
	const themeLink = document.getElementById("prism-theme");
	if (themeLink) {
		const newHref = `${CONSTANTS.PRISM_CDN_BASE}${themeName}.min.css`;
		themeLink.href = newHref;
	}
};

// ===========================================
// PLACEHOLDER - Will add more modules here
// ===========================================

// Initialize everything when DOM is ready
document.addEventListener("DOMContentLoaded", async () => {
	try {
		// Initialize markdown parser
		initializeMarked();

		// Load and apply site data
		const data = await getData();
		if (data?.site) {
			updateMetaTags(data.site);
		}

		// Inject navbar and footer first
		await injectNavbar();
		await injectFooter();
		await loadProjectsDropdown();

		// Initialize UI components after DOM elements are ready
		initCustomDropdowns();
		initNavbarToggle();

		// Handle initial route
		await handleRoute();

		// Set up routing
		window.addEventListener("popstate", handleRoute);
		setupSpaRouting();
		addMobileMenuOutsideClickHandler();

		console.log("Portfolio website initialized with ES6 modules!");
		console.log("Dependencies loaded:", { marked, Prism, Fuse, YAML });
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
