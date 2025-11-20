// ===========================================
// MARKDOWN LOADER
// ===========================================
// Utilities for loading and parsing markdown files

import { CONSTANTS } from "./constants.js";
import { marked } from "./dependencies/marked.js";
import { i18n } from "./i18n.js";
import { html, Reactive, Signals } from "./reactive.js";
import { Templates } from "./templates.js";
import { YAMLParser } from "./yaml-parser.js";

export const MarkdownLoader = {
	_copyButtonComponents: new Map(),

	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Initialize marked with custom configuration
	init() {
		if (!marked) {
			console.error("Marked not loaded");
			return;
		}

		marked.use({
			breaks: true,
			gfm: true,
			renderer: {
				code(token) {
					// In marked v12+, renderers receive token objects
					const code = token.text || "";
					const language = token.lang || "";
					// If language is specified, add Prism-compatible class
					const lang = language || "text";
					const validLang = lang.match(/^[a-zA-Z0-9-]+$/) ? lang : "text";

					// Use html tagged template for automatic escaping
					return html`<pre><code class="language-${validLang}">${code}</code></pre>`
						.content;
				},
			},
		});
	},

	// Load markdown file from path
	// Supports optional fetch options (e.g., headers for GitHub API)
	async loadFile(path, fetchOptions = {}) {
		try {
			const response = await fetch(path, fetchOptions);
			if (!response.ok) return null;
			return response.text();
		} catch (error) {
			console.error(`Error loading markdown file: ${path}`, error);
			return null;
		}
	},

	// Load markdown file with frontmatter
	async loadWithFrontmatter(path) {
		const markdown = await this.loadFile(path);
		if (!markdown) return null;
		return this._parseFrontmatter(markdown);
	},

	// Load markdown file and render to HTML
	async loadAsHtml(path) {
		const markdown = await this.loadFile(path);
		if (!markdown) return null;
		const result = Templates.markdown(markdown, marked);
		return result.content || result;
	},

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	// Parse YAML frontmatter from markdown content
	_parseFrontmatter(markdown) {
		const frontmatterRegex = /^---\n([\s\S]*?)---\n([\s\S]*)$/;
		const match = markdown.match(frontmatterRegex);

		if (!match) {
			return { metadata: {}, content: markdown };
		}

		const [, frontmatter, content] = match;

		// If frontmatter is empty (just whitespace), return the content as-is
		if (!frontmatter.trim()) {
			return { metadata: {}, content: content.trim() };
		}

		const metadata = YAMLParser.parse(frontmatter);

		return { metadata, content: content.trim() };
	},

	// Load markdown with frontmatter and render content to HTML
	async _loadWithFrontmatterAsHtml(path) {
		const result = await this.loadWithFrontmatter(path);
		if (!result) return null;
		const htmlResult = Templates.markdown(result.content, marked);
		return {
			metadata: result.metadata,
			html: htmlResult.content || htmlResult,
		};
	},

	// Add copy buttons to all code blocks in the current document
	initCopyCodeButtons() {
		const preBlocks = document.querySelectorAll("pre");

		for (const pre of preBlocks) {
			if (pre.querySelector(".copy-code-button")) continue;

			const codeElement = pre.querySelector("code");
			if (!codeElement) continue;

			const button = document.createElement("button");
			button.className = "copy-code-button";
			button.setAttribute("aria-label", i18n.t("aria.copyCode"));

			// Create component context for this copy button
			const component = Reactive.createComponent();

			// Create reactive button state
			const buttonState = Signals.create("copy");
			const buttonText = component.computed(
				() => i18n.t(`code.${buttonState.get()}`),
				[buttonState],
			);

			// Bind button text to signal
			component.bindText(button, buttonText);

			// Subscribe to state changes for CSS class updates
			component.track(
				buttonState.subscribe((state) => {
					button.classList.toggle("copied", state === "copied");
				}),
			);

			button.addEventListener("click", async () => {
				try {
					const code = codeElement.textContent || "";
					await navigator.clipboard.writeText(code);

					buttonState.set("copied");

					setTimeout(() => {
						buttonState.set("copy");
					}, CONSTANTS.COPY_BUTTON_RESET_MS);
				} catch (error) {
					console.error("Failed to copy code:", error);
					buttonState.set("copyFailed");
					setTimeout(() => {
						buttonState.set("copy");
					}, CONSTANTS.COPY_BUTTON_RESET_MS);
				}
			});

			pre.style.position = "relative";
			pre.appendChild(button);

			// Store component for cleanup
			this._copyButtonComponents.set(button, component);
		}
	},

	// Cleanup copy button components
	cleanupCopyButtons() {
		for (const component of this._copyButtonComponents.values()) {
			component.cleanup();
		}
		this._copyButtonComponents.clear();
	},
};
