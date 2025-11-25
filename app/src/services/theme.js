// ===========================================
// THEME MANAGER COMPONENT
// ===========================================
// Reactive light/dark mode theme switching and color scheme management

import { CONSTANTS } from "../utils/constants.js";
import { Reactive } from "../utils/reactive.js";
import { Context } from "./context.js";

class ThemeManager extends Reactive.Component {
	storageKey = "theme-preference";

	state() {
		return {
			// Core state - will be set during init()
			current: null,

			// Computed derived state
			colors: () => this._getThemeColors(this.current.get()),
			prismTheme: () => {
				const colors = this.colors.get();
				return colors?.code?.theme || "prism-tomorrow";
			},
			giscusTheme: () => {
				const colors = this.colors.get();
				return colors?.comments?.theme || this.current.get();
			},
		};
	}

	template() {
		// Theme controller doesn't render its own UI, it manages global state
		// But we need a template to be a valid component if we were to render it
		return { __safe: true, content: "" };
	}

	init() {
		// Called automatically after initState() processes state()
		// Set initial theme now that Context is loaded
		const initialTheme = this._getInitialTheme();
		this.current.set(initialTheme);

		// Bind global data-theme attribute
		this.bindAttr(document.documentElement, "data-theme", this.current);

		// 2. Handle side effects via reactive effects
		// Skip saving initial theme (only save on changes)
		let isFirst = true;
		this.effect(() => {
			const theme = this.current.get();
			if (isFirst) {
				isFirst = false;
				return;
			}
			if (theme) {
				localStorage.setItem(this.storageKey, theme);
			}
		});

		// Apply color scheme reactively
		this.effect(() => {
			const colors = this.colors.get();
			this._applyColorScheme(colors);
		});

		// Apply prism theme reactively
		this.effect(() => {
			const theme = this.prismTheme.get();
			this._applyPrismTheme(theme);
		});

		// Update giscus theme reactively
		this.effect(() => {
			const theme = this.giscusTheme.get();
			this._updateGiscus(theme);
		});

		this._setupToggleListener();
	}

	toggle() {
		const newTheme = this.current.get() === "dark" ? "light" : "dark";
		this.current.set(newTheme);
	}

	apply(theme) {
		if (this._getThemeColors(theme)) {
			this.current.set(theme);
		}
	}

	cleanup() {
		this._c.cleanup();
		// Reset state so next init() will reinitialize
		this.current = null;
		this.colors = null;
		this.prismTheme = null;
		this.giscusTheme = null;
	}

	// ===========================================
	// PRIVATE HELPERS
	// ===========================================

	_getInitialTheme() {
		const data = Context.get();
		const defaultTheme = data?.site?.theme?.default || "dark";
		const saved = localStorage.getItem(this.storageKey);

		if (saved) return saved;
		if (defaultTheme === "auto") {
			return window.matchMedia("(prefers-color-scheme: dark)").matches
				? "dark"
				: "light";
		}
		return defaultTheme;
	}

	_getThemeColors(theme) {
		const data = Context.get();
		if (theme === "dark") return data?.site?.theme?.dark;
		if (theme === "light") return data?.site?.theme?.light;
		return null;
	}

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
		Object.entries(mappings).forEach(([prop, val]) => {
			if (val) root.style.setProperty(prop, val);
		});
	}

	_applyPrismTheme(theme) {
		const id = "prism-theme";
		let link = document.getElementById(id);
		const href = `${CONSTANTS.PRISM_CDN_BASE}${theme}.min.css`;

		if (link) {
			link.href = href;
		} else {
			link = document.createElement("link");
			link.id = id;
			link.rel = "stylesheet";
			link.href = href;
			document.head.appendChild(link);
		}
	}

	_updateGiscus(theme) {
		const iframe = document.querySelector("iframe.giscus-frame");
		if (iframe) {
			iframe.contentWindow.postMessage(
				{ giscus: { setConfig: { theme } } },
				"https://giscus.app",
			);
		}
	}

	_setupToggleListener() {
		const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");

		const handler = (e) => {
			const data = Context.get();
			if (data?.site?.theme?.default === "auto") {
				this.current.set(e.matches ? "dark" : "light");
			}
		};

		mediaQuery.addEventListener("change", handler);

		// Track for cleanup
		this.track({
			unsubscribe: () => mediaQuery.removeEventListener("change", handler),
		});
	}
}

export const Theme = new ThemeManager();
