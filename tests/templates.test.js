// Test templates module - core functionality and XSS protection
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { Templates } from "../app/src/utils/templates.js";

// Helper to extract content from safe-marked objects
const getContent = (result) => result?.content || result;

describe("Templates", () => {
	test("errorMessage should display errors", () => {
		const result = getContent(Templates.errorMessage("Test Error", "Test Description"));

		assert.ok(result.includes("error-message"), "Should have error class");
		assert.ok(result.includes("Test Error"), "Should include error title");
		assert.ok(result.includes("Test Description"), "Should include description");
	});

	test("errorMessage should display error content", () => {
		const result = getContent(Templates.errorMessage("Test Error", "Test message"));

		assert.ok(result.includes("error-message"), "Should have error class");
		assert.ok(result.includes("Test Error"), "Should include error title");
	});

	test("giscusComments should respect enabled flags", () => {
		const config = { blogEnabled: false, projectsEnabled: false };

		assert.strictEqual(
			getContent(Templates.giscusComments(config, "blog")),
			"",
			"Should return empty when disabled",
		);
	});

	test("giscusComments should generate container when enabled", () => {
		const config = {
			blogEnabled: true,
			repo: "user/repo",
			repoId: "R_test",
			categoryId: "DIC_test",
		};

		const result = getContent(Templates.giscusComments(config, "blog"));
		assert.ok(result.includes("giscus-container"), "Should create container");
		assert.ok(result.includes('id="giscus-blog-'), "Should have unique ID");
	});

	test("giscusComments should handle missing config", () => {
		assert.strictEqual(
			getContent(Templates.giscusComments(null, "blog")),
			"",
			"Should handle null config",
		);
	});

	test("markdown template should handle renderer errors", () => {
		const result = getContent(Templates.markdown("# Test", undefined));

		assert.ok(
			result.includes("Markdown renderer not available"),
			"Should show error message",
		);
	});

	// XSS Protection Tests (Critical)
	test("XSS: should escape malicious content in errorMessage", () => {
		const maliciousTitle = '<img src=x onerror=alert(1)>';
		const result = getContent(Templates.errorMessage(maliciousTitle, "Safe message"));

		assert.ok(!result.includes("<img"), "Should not contain executable tag");
		assert.ok(result.includes("&lt;img"), "Should escape tag");
	});

	test("XSS: should escape multiple injection attempts", () => {
		const xss1 = '<script>alert(1)</script>';
		const xss2 = '<iframe src="evil.com"></iframe>';
		const result = getContent(Templates.errorMessage(xss1, xss2));

		assert.ok(!result.includes("<script>"), "Should not contain raw script");
		assert.ok(!result.includes("<iframe"), "Should not contain raw iframe");
		assert.ok(result.includes("&lt;script&gt;"), "Should escape script");
		assert.ok(result.includes("&lt;iframe"), "Should escape iframe");
	});
});

