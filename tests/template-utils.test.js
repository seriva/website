// Test template utility functions (escape, html, safe)
import { describe, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { Templates } from "../app/src/templates.js";

describe("Template Utility Functions", () => {
	test("escapeHtml should escape HTML characters", () => {
		const input = '<script>alert("xss")</script>';
		const expected = "&lt;script&gt;alert(\"xss\")&lt;/script&gt;";
		const result = Templates.escape(input);

		assert.equal(result, expected, "HTML characters should be properly escaped");
	});

	test("escapeHtml should handle empty string", () => {
		const result = Templates.escape("");
		assert.equal(result, "", "Empty string should return empty string");
	});

	test("escapeHtml should handle null and undefined", () => {
		assert.equal(Templates.escape(null), "", "null should return empty string");
		assert.equal(
			Templates.escape(undefined),
			"",
			"undefined should return empty string",
		);
	});

	test("html template function should work with strings", () => {
		const result = Templates.html`Hello ${"World"}`;
		assert.equal(result, "Hello World", "Should interpolate strings correctly");
	});

	test("html template function should escape HTML", () => {
		const result = Templates.html`<div>${'<script>alert("xss")</script>'}</div>`;
		const expected = "<div>&lt;script&gt;alert(\"xss\")&lt;/script&gt;</div>";
		assert.equal(result, expected, "Should escape HTML in interpolated values");
	});

	test("html template function should handle safe content", () => {
		const safeContent = Templates.safe("<div>Safe HTML</div>");
		const result = Templates.html`${safeContent}`;
		assert.equal(result, "<div>Safe HTML</div>", "Should not escape safe content");
	});

	test("html template function should handle null and undefined", () => {
		const result1 = Templates.html`Value: ${null}`;
		const result2 = Templates.html`Value: ${undefined}`;
		assert.equal(result1, "Value: ", "null should be skipped");
		assert.equal(result2, "Value: ", "undefined should be skipped");
	});

	test("safe should mark content as safe", () => {
		const safeContent = Templates.safe("<div>HTML</div>");
		assert.equal(safeContent.__safe, true, "Should have __safe flag");
		assert.equal(safeContent.content, "<div>HTML</div>", "Should preserve content");
	});
});

