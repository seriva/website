// Test marked.js code renderer configuration - essentials only
import { describe, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { marked } from "../app/src/dependencies/marked.js";
import { Templates } from "../app/src/templates.js";

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
					return `<pre><code class="language-${validLang}">${Templates.escape(code)}</code></pre>`;
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
		assert.ok(result.includes("console.log"), "Should include code content");
	});

	test("should default to 'text' when no language specified", () => {
		const markdown = "```\nsome code\n```";
		const result = marked.parse(markdown);

		assert.ok(
			result.includes('class="language-text"'),
			"Should default to language-text",
		);
	});

	test("should escape HTML/XSS in code blocks", () => {
		const markdown = "```javascript\n<script>alert('xss')</script>\nconst a = 1 & 2 < 3;\n```";
		const result = marked.parse(markdown);

		assert.ok(result.includes("&lt;script&gt;"), "Should escape tags");
		assert.ok(result.includes("&amp;"), "Should escape ampersand");
		assert.ok(result.includes("&lt;"), "Should escape less than");
		assert.ok(!result.includes("<script>"), "Should not contain raw script");
	});

	test("should sanitize invalid language names", () => {
		const markdown = "```invalid<script>\ncode\n```";
		const result = marked.parse(markdown);

		assert.ok(
			result.includes('class="language-text"'),
			"Should default to text for invalid language",
		);
		assert.ok(!result.includes("<script>"), "Should not allow XSS in class");
	});

	test("should preserve whitespace and indentation", () => {
		const markdown = "```python\ndef hello():\n    print('hello')\n```";
		const result = marked.parse(markdown);

		assert.ok(result.includes("    "), "Should preserve indentation");
	});
});

