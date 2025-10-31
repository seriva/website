// Markdown loading utilities
import { Templates } from './templates.js';

export const MarkdownLoader = {
    // Load markdown file from any path
    async loadFile(path) {
        try {
            const response = await fetch(path);
            if (!response.ok) return null;
            return response.text();
        } catch (error) {
            console.error(`Error loading markdown file: ${path}`, error);
            return null;
        }
    },

    // Parse frontmatter from markdown content
    parseFrontmatter(markdown) {
        const frontmatterRegex = /^---\n([\s\S]*?)\n---\n([\s\S]*)$/;
        const match = markdown.match(frontmatterRegex);

        if (!match) {
            return { metadata: {}, content: markdown };
        }

        const [, frontmatter, content] = match;
        const metadata = {};

        for (const line of frontmatter.split('\n')) {
            const colonIndex = line.indexOf(':');
            if (colonIndex === -1) continue;

            const key = line.slice(0, colonIndex).trim();
            const value = line.slice(colonIndex + 1).trim();

            if (!key || !value) continue;

            // Handle arrays in frontmatter
            if (value.startsWith('[') && value.endsWith(']')) {
                try {
                    metadata[key] = JSON.parse(value.replace(/'/g, '"'));
                } catch (e) {
                    console.warn(`Failed to parse array in frontmatter for key: ${key}`, e);
                    metadata[key] = value;
                }
            } else {
                metadata[key] = value.replace(/^["']|["']$/g, '');
            }
        }

        return { metadata, content: content.trim() };
    },

    // Load and parse markdown with frontmatter
    async loadWithFrontmatter(path) {
        const markdown = await this.loadFile(path);
        if (!markdown) return null;
        return this.parseFrontmatter(markdown);
    },

    // Load markdown and render to HTML
    async loadAsHtml(path) {
        const markdown = await this.loadFile(path);
        if (!markdown) return null;
        const result = Templates.markdown(markdown, window.marked);
        return result.content || result;
    },

    // Load markdown with frontmatter and render content to HTML
    async loadWithFrontmatterAsHtml(path) {
        const result = await this.loadWithFrontmatter(path);
        if (!result) return null;
        const htmlResult = Templates.markdown(result.content, window.marked);
        return {
            metadata: result.metadata,
            html: htmlResult.content || htmlResult,
        };
    }
};