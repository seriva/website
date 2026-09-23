// Runs synchronously in <head> before first paint: sets the theme attribute
// (no FOUC) and exposes the small window helpers that app.js expects.
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

	window.sleep = (ms) => new Promise((r) => setTimeout(r, ms));
	window.createFuse = (list, opts) =>
		new (window.Fuse || window["fuse.js"])(list, opts);
	window.objectEntries = (obj) =>
		obj ? Object.entries(obj).map(([key, value]) => ({ key, value })) : [];
})();
