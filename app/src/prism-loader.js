// ===========================================
// PRISM LANGUAGE LOADER
// ===========================================
// Dynamic loader for Prism syntax highlighting language grammars

import Prism from "./dependencies/prismjs.js";

const PRISM_CDN = "https://cdn.jsdelivr.net/npm/prismjs@1.30.0";
const loadedLanguages = new Set(["markup", "css", "clike", "javascript"]);
const loadingLanguages = new Map();

// Load a specific language grammar from CDN
export async function loadLanguage(language) {
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

	// Temporarily expose Prism globally for CDN scripts
	const hadPrism = "Prism" in window;
	const oldPrism = window.Prism;
	window.Prism = Prism;

	// Create promise for loading language
	const loadPromise = new Promise((resolve, reject) => {
		const script = document.createElement("script");
		script.src = `${PRISM_CDN}/components/prism-${lang}.min.js`;
		script.async = true;

		script.onload = () => {
			loadedLanguages.add(lang);
			loadingLanguages.delete(lang);

			// Restore original Prism state
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

			// Restore original Prism state
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

// Detect and load all languages found in code blocks
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
		loadLanguage(lang).catch((error) => console.warn(error)),
	);

	return Promise.all(promises);
}

// Load languages and apply syntax highlighting to container
export async function highlightElement(container) {
	await loadLanguagesForElement(container);

	if (Prism?.highlightAllUnder) {
		Prism.highlightAllUnder(container);
	}
}
