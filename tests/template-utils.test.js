// Test template utility functions (html, trusted, join)
import { describe, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { html, trusted, join } from "../app/src/core/reactive.js";

describe("Template Utility Functions", () => {
	test("html should escape HTML characters in interpolated values", () => {
		const input = '<script>alert("xss")</script>';
		const result = html`<div>${input}</div>`;
		const expected = "&lt;script&gt;alert(\"xss\")&lt;/script&gt;";

		assert.ok(result.content.includes(expected), "HTML characters should be properly escaped");
		assert.ok(!result.content.includes("<script>"), "Should not contain unescaped script tag");
	});

	test("html should handle empty string interpolation", () => {
		const result = html`Value: ${""}`;
		assert.equal(result.content, "Value: ", "Empty string should interpolate as empty");
	});

	test("html should handle null and undefined in interpolation", () => {
		const result1 = html`Value: ${null}`;
		const result2 = html`Value: ${undefined}`;
		assert.equal(result1.content, "Value: ", "null should be skipped");
		assert.equal(result2.content, "Value: ", "undefined should be skipped");
	});

	test("html template function should work with strings", () => {
		const result = html`Hello ${"World"}`;
		assert.equal(result.content, "Hello World", "Should interpolate strings correctly");
		assert.equal(result.__safe, true, "Should return safe-marked object");
	});

	test("html template function should escape HTML", () => {
		const result = html`<div>${'<script>alert("xss")</script>'}</div>`;
		const expected = "<div>&lt;script&gt;alert(\"xss\")&lt;/script&gt;</div>";
		assert.equal(result.content, expected, "Should escape HTML in interpolated values");
		assert.equal(result.__safe, true, "Should return safe-marked object");
	});	test("html template function should handle trusted content", () => {
		const trustedContent = trusted("<div>Raw HTML</div>");
		const result = html`${trustedContent}`;
		assert.equal(result.content, "<div>Raw HTML</div>", "Should not escape trusted content");
		assert.equal(result.__safe, true, "Should return safe-marked object");
	});

	test("html template function should handle null and undefined", () => {
		const result1 = html`Value: ${null}`;
		const result2 = html`Value: ${undefined}`;
		assert.equal(result1.content, "Value: ", "null should be skipped");
		assert.equal(result2.content, "Value: ", "undefined should be skipped");
		assert.equal(result1.__safe, true, "Should return safe-marked object");
		assert.equal(result2.__safe, true, "Should return safe-marked object");
	});

	test("trusted should mark content as safe", () => {
		const trustedContent = trusted("<div>HTML</div>");
		assert.equal(trustedContent.__safe, true, "Should have __safe flag");
		assert.equal(trustedContent.content, "<div>HTML</div>", "Should preserve content");
	});

	test("join should join html template results", () => {
		const items = [html`<li>One</li>`, html`<li>Two</li>`, html`<li>Three</li>`];
		const result = join(items);
		assert.equal(result.content, "<li>One</li><li>Two</li><li>Three</li>");
		assert.equal(result.__safe, true, "Should return safe-marked object");
	});

	test("join should handle separator", () => {
		const items = [html`<span>A</span>`, html`<span>B</span>`];
		const result = join(items, ", ");
		assert.equal(result.content, "<span>A</span>, <span>B</span>");
	});

	test("join should handle empty arrays", () => {
		const result = join([]);
		assert.equal(result.content, "");
		assert.equal(result.__safe, true);
	});

	test("join should handle mixed safe and unsafe items", () => {
		const items = [html`<div>Safe</div>`, "unsafe"];
		const result = join(items, " ");
		assert.equal(result.content, "<div>Safe</div> unsafe");
	});
});

