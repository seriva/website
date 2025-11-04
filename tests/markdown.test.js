// Test markdown loader module
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { MarkdownLoader } from "../app/src/markdown.js";

describe("MarkdownLoader", () => {
	describe("parseFrontmatter", () => {
		test("should parse valid frontmatter", () => {
			const markdown = `---
title: Test Post
date: 2025-01-01
author: John Doe
---

# Content

This is the content.`;

			const result = MarkdownLoader.parseFrontmatter(markdown);

			assert.equal(result.metadata.title, "Test Post", "Should parse title");
			assert.equal(result.metadata.date, "2025-01-01", "Should parse date");
			assert.equal(result.metadata.author, "John Doe", "Should parse author");
			assert.ok(
				result.content.includes("# Content"),
				"Should extract content",
			);
		});

		test("should handle markdown without frontmatter", () => {
			const markdown = `# Just Content

No frontmatter here.`;

			const result = MarkdownLoader.parseFrontmatter(markdown);

			assert.deepEqual(
				result.metadata,
				{},
				"Should have empty metadata object",
			);
			assert.equal(result.content, markdown, "Should return original content");
		});

		test("should parse arrays in frontmatter", () => {
			const markdown = `---
title: Test Post
tags: ['javascript', 'testing', 'markdown']
categories: ["web", "development"]
---

Content here.`;

			const result = MarkdownLoader.parseFrontmatter(markdown);

			assert.deepEqual(
				result.metadata.tags,
				["javascript", "testing", "markdown"],
				"Should parse array with single quotes",
			);
			assert.deepEqual(
				result.metadata.categories,
				["web", "development"],
				"Should parse array with double quotes",
			);
		});

		test("should remove surrounding quotes from values", () => {
			const markdown = `---
title: "Quoted Title"
subtitle: 'Single Quoted'
description: No quotes
---

Content`;

			const result = MarkdownLoader.parseFrontmatter(markdown);

			assert.equal(
				result.metadata.title,
				"Quoted Title",
				"Should remove double quotes",
			);
			assert.equal(
				result.metadata.subtitle,
				"Single Quoted",
				"Should remove single quotes",
			);
			assert.equal(
				result.metadata.description,
				"No quotes",
				"Should handle unquoted values",
			);
		});

		test("should skip invalid frontmatter lines", () => {
			const markdown = `---
title: Valid Title
invalid line without colon
: value without key
key:
: 
another: Valid Value
---

Content`;

			const result = MarkdownLoader.parseFrontmatter(markdown);

			assert.equal(
				result.metadata.title,
				"Valid Title",
				"Should parse valid lines",
			);
			assert.equal(
				result.metadata.another,
				"Valid Value",
				"Should parse other valid lines",
			);
			assert.equal(
				result.metadata["invalid line without colon"],
				undefined,
				"Should skip invalid lines",
			);
		});

		test("should handle colons in values", () => {
			const markdown = `---
title: Test: A Complex Title
url: https://example.com/path
---

Content`;

			const result = MarkdownLoader.parseFrontmatter(markdown);

			assert.equal(
				result.metadata.title,
				"Test: A Complex Title",
				"Should preserve colons in values",
			);
			assert.equal(
				result.metadata.url,
				"https://example.com/path",
				"Should handle URLs correctly",
			);
		});

		test("should trim content whitespace", () => {
			const markdown = `---
title: Test
---


Content with leading whitespace`;

			const result = MarkdownLoader.parseFrontmatter(markdown);

			assert.equal(
				result.content,
				"Content with leading whitespace",
				"Should trim leading/trailing whitespace from content",
			);
		});

	test("should handle empty frontmatter", () => {
		const markdown = `---
---

Content only`;

		const result = MarkdownLoader.parseFrontmatter(markdown);

		// Empty frontmatter with just --- --- doesn't match the regex,
		// so it returns the whole content as-is
		assert.deepEqual(
			result.metadata,
			{},
			"Should have empty metadata for empty frontmatter",
		);
		assert.ok(
			result.content.includes("Content only"),
			"Should include content",
		);
	});

	test("should handle invalid array format gracefully", () => {
		const markdown = `---
title: Test
tags: [invalid, array, 'format]
---

Content`;

		// Suppress expected console.warn for invalid JSON
		const originalWarn = console.warn;
		console.warn = () => {};

		const result = MarkdownLoader.parseFrontmatter(markdown);

		// Restore console.warn
		console.warn = originalWarn;

		// Should fallback to string value when JSON parsing fails
		assert.ok(
			typeof result.metadata.tags === "string",
			"Should store invalid array as string",
		);
	});

		test("should handle multiline content", () => {
			const markdown = `---
title: Test Post
---

# Heading 1

Paragraph 1

## Heading 2

Paragraph 2

\`\`\`javascript
console.log('code');
\`\`\`

More content.`;

			const result = MarkdownLoader.parseFrontmatter(markdown);

			assert.ok(
				result.content.includes("# Heading 1"),
				"Should preserve headings",
			);
			assert.ok(
				result.content.includes("```javascript"),
				"Should preserve code blocks",
			);
			assert.ok(
				result.content.includes("More content."),
				"Should preserve all content",
			);
		});

		test("should handle frontmatter with special characters", () => {
			const markdown = `---
title: Test & Special <Characters>
description: "Quotes and 'mixed' types"
emoji: 🎉
---

Content`;

			const result = MarkdownLoader.parseFrontmatter(markdown);

			assert.ok(
				result.metadata.title.includes("&"),
				"Should preserve ampersand",
			);
			assert.ok(
				result.metadata.title.includes("<"),
				"Should preserve angle brackets",
			);
			assert.equal(result.metadata.emoji, "🎉", "Should handle emoji");
		});
	});

	describe("MarkdownLoader object", () => {
		test("should have required methods", () => {
			assert.ok(
				typeof MarkdownLoader.loadFile === "function",
				"Should have loadFile method",
			);
			assert.ok(
				typeof MarkdownLoader.parseFrontmatter === "function",
				"Should have parseFrontmatter method",
			);
			assert.ok(
				typeof MarkdownLoader.loadWithFrontmatter === "function",
				"Should have loadWithFrontmatter method",
			);
			assert.ok(
				typeof MarkdownLoader.loadAsHtml === "function",
				"Should have loadAsHtml method",
			);
			assert.ok(
				typeof MarkdownLoader.loadWithFrontmatterAsHtml === "function",
				"Should have loadWithFrontmatterAsHtml method",
			);
		});
	});
});

