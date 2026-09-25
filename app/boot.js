// Runs synchronously in <head> before first paint: sets the theme attribute
// so there is no FOUC before app.js takes over.
(() => {
	try {
		const saved = localStorage.getItem("theme-preference");
		const theme =
			saved ||
			(window.matchMedia?.("(prefers-color-scheme: light)").matches
				? "light"
				: "dark");
		document.documentElement.setAttribute("data-theme", theme);
		const meta = document.querySelector('meta[name="theme-color"]');
		if (meta) {
			meta.setAttribute("content", theme === "light" ? "#FFFFFF" : "#0D1117");
		}
	} catch (_e) {
		// localStorage unavailable (privacy mode); fall back to CSS default
	}
})();
