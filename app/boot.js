// Runs synchronously in <head> before first paint: sets the theme attribute
// (no FOUC) and exposes the Fuse factory app.js needs (Go has no `new`).
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

	window.createFuse = (list, opts) => new window.Fuse(list, opts);

	let emailjsPromise = null;
	window.loadEmailJS = () => {
		if (window.emailjs) return Promise.resolve(window.emailjs);
		if (emailjsPromise) return emailjsPromise;
		emailjsPromise = new Promise((resolve, reject) => {
			const s = document.createElement("script");
			// Pinned + SRI: keep version and hash in sync with @emailjs/browser in package.json
			s.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js";
			s.integrity = "sha384-SALc35EccAf6RzGw4iNsyj7kTPr33K7RoGzYu+7heZhT8s0GZouafRiCg1qy44AS";
			s.crossOrigin = "anonymous";
			s.async = true;
			s.onload = () => resolve(window.emailjs);
			s.onerror = (e) => {
				emailjsPromise = null;
				reject(e);
			};
			document.head.appendChild(s);
		});
		return emailjsPromise;
	};

	let mermaidPromise = null;
	window.loadMermaid = () => {
		if (window.mermaid) return Promise.resolve(window.mermaid);
		if (mermaidPromise) return mermaidPromise;
		mermaidPromise = new Promise((resolve, reject) => {
			const s = document.createElement("script");
			s.src = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";
			s.async = true;
			s.onload = () => resolve(window.mermaid);
			s.onerror = (e) => {
				mermaidPromise = null;
				reject(e);
			};
			document.head.appendChild(s);
		});
		return mermaidPromise;
	};
})();
