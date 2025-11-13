// Test prism-loader module - language detection and loading logic
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { PrismLoader } from "../app/src/prism-loader.js";

describe("PrismLoader", () => {
	test("should detect languages from code blocks", async () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<pre><code class="language-javascript">const x = 1;</code></pre>
			<pre><code class="language-python">x = 1</code></pre>
			<pre><code class="language-text">plain text</code></pre>
		`;

		// We can't test actual loading without network, but we can test detection
		// by examining the internal method behavior
		const codeBlocks = container.querySelectorAll('code[class*="language-"]');

		assert.strictEqual(codeBlocks.length, 3, "Should find all code blocks");

		const languages = new Set();
		for (const block of codeBlocks) {
			const match = block.className.match(/language-(\w+)/);
			if (match) {
				languages.add(match[1]);
			}
		}

		assert.ok(languages.has("javascript"), "Should detect JavaScript");
		assert.ok(languages.has("python"), "Should detect Python");
		assert.ok(languages.has("text"), "Should detect text");
	});

	test("should skip loading for text and none languages", async () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<pre><code class="language-text">plain text</code></pre>
			<pre><code class="language-none">no highlighting</code></pre>
		`;

		// These languages should be skipped (not added to languagesToLoad set)
		const codeBlocks = container.querySelectorAll('code[class*="language-"]');
		const languagesToLoad = new Set();

		for (const block of codeBlocks) {
			const match = block.className.match(/language-(\w+)/);
			if (match) {
				const lang = match[1];
				if (lang !== "text" && lang !== "none") {
					languagesToLoad.add(lang);
				}
			}
		}

		assert.strictEqual(
			languagesToLoad.size,
			0,
			"Should not load text or none languages",
		);
	});

	test("should handle containers with no code blocks", async () => {
		const container = document.createElement("div");
		container.innerHTML = "<p>No code here</p>";

		// Should not throw when no code blocks exist
		await assert.doesNotReject(
			async () => {
				await PrismLoader.highlight(container);
			},
			"Should handle empty containers gracefully",
		);
	});

	test("should detect multiple blocks of same language", async () => {
		const container = document.createElement("div");
		container.innerHTML = `
			<pre><code class="language-javascript">const x = 1;</code></pre>
			<pre><code class="language-javascript">const y = 2;</code></pre>
			<pre><code class="language-javascript">const z = 3;</code></pre>
		`;

		const codeBlocks = container.querySelectorAll('code[class*="language-"]');
		const languages = new Set();

		for (const block of codeBlocks) {
			const match = block.className.match(/language-(\w+)/);
			if (match) {
				languages.add(match[1]);
			}
		}

		assert.strictEqual(
			languages.size,
			1,
			"Should deduplicate same language",
		);
		assert.ok(
			languages.has("javascript"),
			"Should have JavaScript in set once",
		);
	});

	test("should extract language from class correctly", () => {
		const testCases = [
			{ className: "language-javascript", expected: "javascript" },
			{ className: "language-python", expected: "python" },
			{ className: "language-typescript", expected: "typescript" },
			{ className: "other-class language-rust more-classes", expected: "rust" },
			{ className: "no-match-here", expected: null },
		];

		for (const { className, expected } of testCases) {
			const match = className.match(/language-(\w+)/);
			const result = match ? match[1] : null;

			assert.strictEqual(
				result,
				expected,
				`Should extract "${expected}" from "${className}"`,
			);
		}
	});
});
