// ===========================================
// MARKDOWN LOADER
// ===========================================
// Utilities for loading and parsing markdown files

import { marked } from "./dependencies/marked.js";
import { Templates } from "./templates.js";
import { YAMLParser } from "./yaml-parser.js";

export const MarkdownLoader = {
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

	// Parse YAML frontmatter from markdown content
	parseFrontmatter(markdown) {
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

	// Load markdown file with frontmatter
	async loadWithFrontmatter(path) {
		const markdown = await this.loadFile(path);
		if (!markdown) return null;
		return this.parseFrontmatter(markdown);
	},

	// Load markdown file and render to HTML
	async loadAsHtml(path) {
		const markdown = await this.loadFile(path);
		if (!markdown) return null;
		const result = Templates.markdown(markdown, marked);
		return result.content || result;
	},

	// Load markdown with frontmatter and render content to HTML
	async loadWithFrontmatterAsHtml(path) {
		const result = await this.loadWithFrontmatter(path);
		if (!result) return null;
		const htmlResult = Templates.markdown(result.content, marked);
		return {
			metadata: result.metadata,
			html: htmlResult.content || htmlResult,
		};
	},
};
