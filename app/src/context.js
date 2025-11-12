// ===========================================
// APPLICATION CONTEXT & DATA MANAGEMENT
// ===========================================
// Centralized state management and theme/meta application

import { CONSTANTS } from "./constants.js";
import { i18n } from "./i18n.js";
import { YAMLParser } from "./yaml-parser.js";

let appContext = null;

// ===========================================
// CONTEXT NAMESPACE
// ===========================================

export const Context = {
	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Initialize application context from YAML
	async init() {
		if (appContext) return appContext;

		const yamlPath = "data/content.yaml";

		try {
			const response = await fetch(yamlPath);
			if (!response.ok) throw new Error(`HTTP ${response.status}`);

			const yamlText = await response.text();
			appContext = YAMLParser.parse(yamlText);

			// Apply theming and i18n after loading
			if (appContext?.site?.colors) {
				Context._applyColorScheme(appContext.site.colors);
			}
			if (appContext?.site?.i18n && appContext?.translations) {
				i18n.init(appContext.site.i18n, appContext.translations);
			}

			return appContext;
		} catch (error) {
			console.error("Failed to load content:", error);
			appContext = null;
			return null;
		}
	},

	// Get cached application context (must call init first)
	get() {
		return appContext;
	},

	// Clear context cache (useful for testing)
	clear() {
		appContext = null;
	},

	// Update HTML meta tags with site data
	updateMetaTags(siteData) {
		if (!siteData) return;

		if (siteData.title) {
			document.title = siteData.title;
		}

		const updateMeta = (selector, value) => {
			if (value) {
				document.querySelector(selector)?.setAttribute("content", value);
			}
		};

		updateMeta('meta[name="description"]', siteData.description);
		updateMeta('meta[name="author"]', siteData.author);
		updateMeta('meta[name="theme-color"]', siteData.colors?.primary);
		updateMeta(
			'meta[name="msapplication-TileColor"]',
			siteData.colors?.primary,
		);
		updateMeta('meta[property="og:title"]', siteData.title);
		updateMeta('meta[property="twitter:title"]', siteData.title);
		updateMeta('meta[property="og:description"]', siteData.description);
		updateMeta('meta[property="twitter:description"]', siteData.description);
	},

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	// Apply color scheme from config to CSS variables
	_applyColorScheme(colors) {
		if (!colors) return;

		const root = document.documentElement;

		const mappings = {
			"--accent": colors.primary,
			"--font-color": colors.text,
			"--background-color": colors.background,
			"--header-color": colors.secondary,
			"--text-light": colors.textLight,
			"--border-color": colors.border,
			"--hover-color": colors.hover,
		};

		for (const [property, value] of Object.entries(mappings)) {
			if (value) root.style.setProperty(property, value);
		}

		// Apply Prism theme from config
		if (colors.code?.theme) {
			Context._applyPrismTheme(colors.code.theme);
		}
	},

	// Apply Prism.js syntax highlighting theme
	_applyPrismTheme(themeName) {
		const theme = themeName || CONSTANTS.DEFAULT_THEME;
		const themeId = "prism-theme";

		// Check if theme link already exists
		let themeLink = document.getElementById(themeId);

		if (themeLink) {
			// Update existing link
			themeLink.href = `${CONSTANTS.PRISM_CDN_BASE}${theme}.min.css`;
		} else {
			// Create new link element
			themeLink = document.createElement("link");
			themeLink.id = themeId;
			themeLink.rel = "stylesheet";
			themeLink.href = `${CONSTANTS.PRISM_CDN_BASE}${theme}.min.css`;
			document.head.appendChild(themeLink);
		}
	},
};
