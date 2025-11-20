// ===========================================
// APPLICATION CONTEXT & DATA MANAGEMENT
// ===========================================
// Centralized state management and data loading

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

			// Initialize i18n
			if (appContext?.site?.i18n && appContext?.translations) {
				i18n.init(appContext.site.i18n, appContext.translations);
			}

			this._updateMetaTags();

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

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	// Set context manually (for testing)
	_set(data) {
		appContext = data;
	},

	// Update HTML meta tags with site data
	_updateMetaTags() {
		if (!appContext?.site) return;

		if (appContext.site.title) {
			document.title = appContext.site.title;
		}

		const updateMeta = (selector, value) => {
			if (value) {
				document.querySelector(selector)?.setAttribute("content", value);
			}
		};

		updateMeta('meta[name="description"]', appContext.site.description);
		updateMeta('meta[name="author"]', appContext.site.author);
		updateMeta('meta[name="theme-color"]', appContext.site.colors?.primary);
		updateMeta(
			'meta[name="msapplication-TileColor"]',
			appContext.site.colors?.primary,
		);
		updateMeta('meta[property="og:title"]', appContext.site.title);
		updateMeta('meta[property="twitter:title"]', appContext.site.title);
		updateMeta('meta[property="og:description"]', appContext.site.description);
		updateMeta(
			'meta[property="twitter:description"]',
			appContext.site.description,
		);
	},
};
