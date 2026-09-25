// Runs synchronously in <head> before first paint: sets the theme attribute
// so there is no FOUC before app.js takes over.
(() => {
	try {
		const saved = localStorage.getItem("theme-preference");
		if (saved) {
			document.documentElement.setAttribute("data-theme", saved);
		} else if (window.matchMedia?.("(prefers-color-scheme: light)").matches) {
			document.documentElement.setAttribute("data-theme", "light");
		} else {
			document.documentElement.setAttribute("data-theme", "dark");
		}
	} catch (_e) {
		// localStorage unavailable (privacy mode); fall back to CSS default
	}
})();
