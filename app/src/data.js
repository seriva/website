// ===========================================
// DATA MANAGEMENT
// ===========================================
// Centralized data loading and caching system

import { CONSTANTS } from "./constants.js";
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

	// Apply Prism theme from config
	if (colors.code?.theme) {
		applyPrismTheme(colors.code.theme);
	}
};

// Apply Prism.js syntax highlighting theme
export const applyPrismTheme = (themeName) => {
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
