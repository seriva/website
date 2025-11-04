// Test marked.js code renderer configuration
import { describe, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { marked } from "../app/src/dependencies/marked.js";
import { escapeHtml } from "../app/src/utils.js";

describe("Marked Code Renderer", () => {
	beforeEach(() => {
		// Configure marked with our custom renderer (same as main.js)
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
					return `<pre><code class="language-${validLang}">${escapeHtml(code)}</code></pre>`;
				},
			},
		});
	});

	test("should render code block with language", () => {
		const markdown = "```javascript\nconsole.log('hello');\n```";
		const result = marked.parse(markdown);

		assert.ok(
			result.includes('class="language-javascript"'),
			"Should include language class",
		);
		assert.ok(result.includes("<pre>"), "Should include pre tag");
		assert.ok(result.includes("<code"), "Should include code tag");
		assert.ok(
			result.includes("console.log"),
			"Should include code content",
		);
	});

	test("should render code block without language (default to text)", () => {
		const markdown = "```\nsome code\n```";
		const result = marked.parse(markdown);

		assert.ok(
			result.includes('class="language-text"'),
			"Should default to language-text",
		);
		assert.ok(result.includes("some code"), "Should include code content");
	});

	test("should escape HTML in code blocks", () => {
		const markdown = "```javascript\nconst html = '<script>alert(\"xss\")</script>';\n```";
		const result = marked.parse(markdown);

		assert.ok(result.includes("&lt;script&gt;"), "Should escape opening tag");
		assert.ok(result.includes("&lt;/script&gt;"), "Should escape closing tag");
		assert.ok(
			!result.includes('<script>alert("xss")</script>'),
			"Should not contain raw script tags",
		);
		// Quotes inside code don't need escaping since they're in text content
		assert.ok(result.includes("alert"), "Should include code content");
	});

	test("should handle various language identifiers", () => {
		const languages = [
			"python",
			"typescript",
			"bash",
			"css",
			"html",
			"json",
			"go",
			"rust",
		];

		for (const lang of languages) {
			const markdown = `\`\`\`${lang}\ncode\n\`\`\``;
			const result = marked.parse(markdown);

			assert.ok(
				result.includes(`class="language-${lang}"`),
				`Should handle ${lang} language`,
			);
		}
	});

	test("should sanitize invalid language names", () => {
		const markdown = "```invalid<script>alert(1)</script>\ncode\n```";
		const result = marked.parse(markdown);

		assert.ok(
			result.includes('class="language-text"'),
			"Should default to text for invalid language",
		);
		assert.ok(
			!result.includes("<script>"),
			"Should not include script in class name",
		);
	});

	test("should handle hyphenated languages", () => {
		const markdown = "```objective-c\ncode\n```";
		const result = marked.parse(markdown);

		assert.ok(
			result.includes('class="language-objective-c"'),
			"Should handle hyphenated language names",
		);
	});

	test("should handle numbers in language names", () => {
		const markdown = "```c99\ncode\n```";
		const result = marked.parse(markdown);

		assert.ok(
			result.includes('class="language-c99"'),
			"Should handle numbers in language names",
		);
	});

	test("should escape special characters in code", () => {
		const markdown = "```javascript\nconst a = 1 & 2 < 3 > 0;\n```";
		const result = marked.parse(markdown);

		assert.ok(result.includes("&amp;"), "Should escape ampersand");
		assert.ok(result.includes("&lt;"), "Should escape less than");
		assert.ok(result.includes("&gt;"), "Should escape greater than");
	});

	test("should preserve whitespace in code blocks", () => {
		const markdown = "```python\ndef hello():\n    print('hello')\n    return True\n```";
		const result = marked.parse(markdown);

		assert.ok(
			result.includes("    "),
			"Should preserve indentation spaces",
		);
	});

	test("should handle empty code blocks", () => {
		const markdown = "```javascript\n```";
		const result = marked.parse(markdown);

		assert.ok(result.includes("<pre>"), "Should include pre tag");
		assert.ok(result.includes("<code"), "Should include code tag");
		assert.ok(
			result.includes('class="language-javascript"'),
			"Should include language class",
		);
	});

	test("should handle inline code differently than blocks", () => {
		const markdown = "This is `inline code` not a block.";
		const result = marked.parse(markdown);

		// Inline code should not trigger our custom code block renderer
		assert.ok(result.includes("inline code"), "Should include inline code");
		assert.ok(!result.includes("<pre>"), "Should not include pre tag for inline");
	});
});

