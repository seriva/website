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
};
