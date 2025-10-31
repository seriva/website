// ===========================================
// DATA MANAGEMENT
// ===========================================
// Centralized data loading and caching system

import YAML from "./dependencies/yamljs.js";
import { i18n } from "./i18n.js";

let projectsData = null;

// Load and cache data from content.yaml
export const getData = async () => {
	if (projectsData) return projectsData;

	const yamlPath = "data/content.yaml";

	try {
		const response = await fetch(yamlPath);
		if (!response.ok) throw new Error(`HTTP ${response.status}`);

		const yamlText = await response.text();
		projectsData = YAML.parse(yamlText);

		// Apply theming and i18n after loading
		if (projectsData?.site?.colors) {
			applyColorScheme(projectsData.site.colors);
		}
		if (projectsData?.site?.i18n && projectsData?.translations) {
			i18n.init(projectsData.site.i18n, projectsData.translations);
		}

		return projectsData;
	} catch (error) {
		console.error("Failed to load content:", error);
		projectsData = null;
		return null;
	}
};

// Apply color scheme from config to CSS variables
export const applyColorScheme = (colors) => {
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
};

// Update HTML meta tags with site data
export const updateMetaTags = (siteData) => {
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
	updateMeta('meta[name="msapplication-TileColor"]', siteData.colors?.primary);
	updateMeta('meta[property="og:title"]', siteData.title);
	updateMeta('meta[property="twitter:title"]', siteData.title);
	updateMeta('meta[property="og:description"]', siteData.description);
	updateMeta('meta[property="twitter:description"]', siteData.description);
};
