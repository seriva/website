// Dynamic Prism language loader
// Loads language grammars from CDN on-demand

import Prism from "./dependencies/prismjs.js";

const PRISM_CDN = "https://cdn.jsdelivr.net/npm/prismjs@1.30.0";
const loadedLanguages = new Set(["markup", "css", "clike", "javascript"]); // Core languages
const loadingLanguages = new Map(); // Track in-progress loads

/**
 * Load a Prism language component dynamically
 * @param {string} language - Language identifier (e.g., 'bash', 'python')
 * @returns {Promise<void>}
 */
export async function loadLanguage(language) {
	// Temporarily expose Prism globally for CDN scripts to register
	const hadPrism = "Prism" in window;
	const oldPrism = window.Prism;
	window.Prism = Prism;
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

	// Create a promise for this load
	const loadPromise = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = `${PRISM_CDN}/components/prism-${lang}.min.js`;
		script.async = true;

		script.onload = () => {
			loadedLanguages.add(lang);
			loadingLanguages.delete(lang);
			console.log(`Loaded Prism language: ${lang}`);

			// Clean up global Prism if we added it
			if (!hadPrism) {
				window.Prism = undefined;
			} else if (oldPrism !== Prism) {
				window.Prism = oldPrism;
			}

			resolve();
		};

		script.onerror = () => {
			loadingLanguages.delete(lang);
			console.warn(`Failed to load Prism language: ${lang}`);

			// Clean up global Prism if we added it
			if (!hadPrism) {
				window.Prism = undefined;
			} else if (oldPrism !== Prism) {
				window.Prism = oldPrism;
			}

			reject(new Error(`Failed to load language: ${lang}`));
		};

		document.head.appendChild(script);
	});

	loadingLanguages.set(lang, loadPromise);
	return loadPromise;
}

/**
 * Load all languages found in code blocks on the page
 * @param {Element} container - Container element to search within
 * @returns {Promise<void[]>}
 */
export async function loadLanguagesForElement(container) {
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
		loadLanguage(lang).catch((err) => console.warn(err)),
	);

	return Promise.all(promises);
}

/**
 * Highlight code in container after loading necessary languages
 * @param {Element} container - Container element to highlight
 * @returns {Promise<void>}
 */
export async function highlightElement(container) {
	// First, load any missing languages
	await loadLanguagesForElement(container);

	// Then highlight using our imported Prism
	if (Prism?.highlightAllUnder) {
		Prism.highlightAllUnder(container);
	}
}
