// ===========================================
// THEME MANAGER
// ===========================================
// Light/dark mode theme switching and visual theme application

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";

// ===========================================
// THEME NAMESPACE
// ===========================================

export const Theme = {
	current: null,
	storageKey: "theme-preference",

	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Initialize theme system
	init() {
		const data = Context.get();
		const defaultTheme = data?.site?.theme?.default || "dark";

		// Load saved preference or use default
		const savedTheme = localStorage.getItem(this.storageKey);
		const theme = savedTheme || this._getAutoTheme(defaultTheme);

		this.apply(theme);
		this._setupToggleListener();
	},

	// Toggle between light and dark theme
	toggle() {
		const newTheme = this.current === "dark" ? "light" : "dark";
		this.apply(newTheme);
	},

	// Get giscus theme for current or specified theme
	getGiscusTheme(theme = null) {
		const colors = this._getThemeColors(theme);
		return colors?.comments?.theme || theme || this.current || "dark";
	},

	// Get Prism theme for current or specified theme
	getPrismTheme(theme = null) {
		const colors = this._getThemeColors(theme);
		return colors?.code?.theme || "prism-tomorrow";
	},

	// Apply a specific theme
	apply(theme) {
		const colors = this._getThemeColors(theme);
		if (!colors) {
			console.error(`Theme colors not found for: ${theme}`);
			return;
		}

		// Apply all theme changes
		this._applyColorScheme(colors);
		this._applyPrismTheme(theme);
		this._updateGiscus(theme);

		// Save current theme state
		this.current = theme;
		localStorage.setItem(this.storageKey, theme);
		document.documentElement.setAttribute("data-theme", theme);
	},

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	// Get theme colors for specified theme (or current theme)
	_getThemeColors(theme = null) {
		const targetTheme = theme || this.current || "dark";
		const data = Context.get();
		return targetTheme === "dark"
			? data?.site?.theme?.dark
			: data?.site?.theme?.light;
	},

	// Get theme based on system preference (if default is "auto")
	_getAutoTheme(defaultTheme) {
		if (defaultTheme === "auto") {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		return defaultTheme;
	},

	// Setup click listener for toggle button
	_setupToggleListener() {
		document.addEventListener("click", (e) => {
			const toggleBtn = e.target.closest("#theme-toggle");
			if (toggleBtn) {
				this.toggle();
			}
		});

		// Listen for system theme changes if preference is "auto"
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
		mediaQuery.addEventListener("change", (e) => {
			const data = Context.get();
			if (data?.site?.theme?.default === "auto") {
				const theme = e.matches ? "dark" : "light";
				this.apply(theme);
			}
		});
	},

	// Apply color scheme to CSS variables
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
	},

	// Apply Prism.js syntax highlighting theme
	_applyPrismTheme(theme) {
		const prismTheme = this.getPrismTheme(theme);
		const themeId = "prism-theme";

		// Check if theme link already exists
		let themeLink = document.getElementById(themeId);

		if (themeLink) {
			// Update existing link
			themeLink.href = `${CONSTANTS.PRISM_CDN_BASE}${prismTheme}.min.css`;
		} else {
			// Create new link element
			themeLink = document.createElement("link");
			themeLink.id = themeId;
			themeLink.rel = "stylesheet";
			themeLink.href = `${CONSTANTS.PRISM_CDN_BASE}${prismTheme}.min.css`;
			document.head.appendChild(themeLink);
		}
	},

	// Update giscus comments theme
	_updateGiscus(theme) {
		const iframe = document.querySelector("iframe.giscus-frame");
		if (iframe) {
			const giscusTheme = this.getGiscusTheme(theme);
			iframe.contentWindow.postMessage(
				{ giscus: { setConfig: { theme: giscusTheme } } },
				"https://giscus.app",
			);
		}
	},
};
