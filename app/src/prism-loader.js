// ===========================================
// PRISM LANGUAGE LOADER
// ===========================================
// Dynamic loader for Prism syntax highlighting language grammars

import Prism from "./dependencies/prismjs.js";

const PRISM_CDN = "https://cdn.jsdelivr.net/npm/prismjs@1.30.0";

// Languages included in core Prism bundle
const loadedLanguages = new Set(["markup", "css", "clike", "javascript"]);

// Track in-flight language loads to prevent duplicate requests
const loadingLanguages = new Map();

// ===========================================
// PRISM LOADER NAMESPACE
// ===========================================

export const PrismLoader = {
	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Load languages and apply syntax highlighting to container
	async highlight(container) {
		await PrismLoader._loadLanguagesForElement(container);

		if (Prism?.highlightAllUnder) {
			Prism.highlightAllUnder(container);
		}
	},

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	// Temporarily expose Prism globally for CDN script loading
	// NECESSARY: Prism CDN scripts are NOT ES modules and expect window.Prism to exist.
	// They use the pattern: (function(_self){"use strict"; var Prism = _self.Prism; ...})(self);
	// We expose our module-based Prism, let the CDN extend it, then clean up.
	_withGlobalPrism(callback) {
		const hadPrism = "Prism" in window;
		const oldPrism = window.Prism;

		// Expose our Prism instance globally so CDN scripts can extend it
		window.Prism = Prism;

		// Ensure cleanup happens even if callback throws
		try {
			return callback();
		} finally {
			// Restore previous state after a tick (CDN script needs time to execute)
			queueMicrotask(() => {
				if (!hadPrism) {
					delete window.Prism;
				} else if (oldPrism !== Prism) {
					window.Prism = oldPrism;
				}
			});
		}
	},

	// Load a specific language grammar from CDN
	async _loadLanguage(language) {
		// Normalize language name
		const lang = language.toLowerCase();

		// Already loaded
		if (loadedLanguages.has(lang)) {
			return Promise.resolve();
		}

		// Already loading
		if (loadingLanguages.has(lang)) {
			return loadingLanguages.get(lang);
		}

		// Create promise for loading language
		const loadPromise = PrismLoader._withGlobalPrism(() => {
			return new Promise((resolve, reject) => {
				const script = document.createElement("script");
				script.src = `${PRISM_CDN}/components/prism-${lang}.min.js`;
				script.async = true;

				script.onload = () => {
					loadedLanguages.add(lang);
					loadingLanguages.delete(lang);
					resolve();
				};

				script.onerror = () => {
					loadingLanguages.delete(lang);
					const error = new Error(`Failed to load Prism language: ${lang}`);
					console.warn(error.message);
					reject(error);
				};

				document.head.appendChild(script);
			});
		});

		loadingLanguages.set(lang, loadPromise);
		return loadPromise;
	},

	// Detect and load all languages found in code blocks
	async _loadLanguagesForElement(container) {
		const codeBlocks = container.querySelectorAll('code[class*="language-"]');
		const languagesToLoad = new Set();

		for (const block of codeBlocks) {
			const match = block.className.match(/language-(\w+)/);
			if (match) {
				const lang = match[1];
				if (!loadedLanguages.has(lang) && lang !== "text" && lang !== "none") {
					languagesToLoad.add(lang);
				}
			}
		}

		// Load all languages in parallel
		const promises = Array.from(languagesToLoad).map((lang) =>
			PrismLoader._loadLanguage(lang).catch((error) => console.warn(error)),
		);

		return Promise.all(promises);
	},
};
