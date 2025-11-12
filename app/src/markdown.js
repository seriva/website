// ===========================================
// MARKDOWN LOADER
// ===========================================
// Utilities for loading and parsing markdown files

import { marked } from "./dependencies/marked.js";
import { Templates } from "./templates.js";
import { YAMLParser } from "./yaml-parser.js";

export const MarkdownLoader = {
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
					return `<pre><code class="language-${validLang}">${Templates.escape(code)}</code></pre>`;
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
};
