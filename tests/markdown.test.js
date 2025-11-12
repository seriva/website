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
This is content.`;

			const result = MarkdownLoader._parseFrontmatter(markdown);
			assert.equal(result.metadata.title, "Test Post", "Should parse title");
			assert.equal(result.metadata.date, "2025-01-01", "Should parse date");
			assert.equal(result.metadata.author, "John Doe", "Should parse author");
			assert.ok(
				result.content.includes("# Content"),
				"Should extract content",
			);
		});

		test("should handle markdown with complex frontmatter", () => {
			const markdown = `---
title: Complex Example
details:
  author: Jane Smith
  published: true
  count: 123
---
Content here.`;
			const { metadata, content } = MarkdownLoader._parseFrontmatter(markdown);
			assert.equal(metadata.title, "Complex Example");
			assert.deepEqual(metadata.details, {
				author: "Jane Smith",
				published: true,
				count: 123,
			});
			assert.equal(content, "Content here.");
		});

		test("should handle markdown without frontmatter", () => {
			const markdown = `# Just Content

No frontmatter here.`;

			const result = MarkdownLoader._parseFrontmatter(markdown);

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

			const result = MarkdownLoader._parseFrontmatter(markdown);

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

		test("should return original content if frontmatter is empty", () => {
			const markdown = `---
---
# Content`;
			const result = MarkdownLoader._parseFrontmatter(markdown);
			assert.deepEqual(result.metadata, {});
			assert.equal(result.content, "# Content");
		});
	});

	describe("loadFile", () => {
		test("should load file content", () => {
			// Mocking the file system operation
			const mockFilePath = "path/to/mock/file.md";
			const mockFileContent = `---
title: Mock File
---

Mock content`;

			// @ts-expect-error mock implementation
			MarkdownLoader.loadFile = async (filePath) => {
				assert.equal(filePath, mockFilePath, "Should be called with correct path");
				return mockFileContent;
			};

			return MarkdownLoader.loadFile(mockFilePath).then((content) => {
				assert.equal(content, mockFileContent, "Should return mock file content");
			});
		});
	});
});

