// Test templates module - core functionality and XSS protection
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { Templates } from "../app/src/templates.js";

describe("Templates", () => {
	test("navbar should generate valid structure", () => {
		const result = Templates.navbar(
			"<li>Blog</li>",
			"<li>Projects</li>",
			"<li>About</li>",
			"<li>Social</li>",
			"<li>Search</li>",
			"Test Site",
		);

		assert.ok(result.includes("Test Site"), "Should include site title");
		assert.ok(result.includes("navbar-toggle"), "Should include mobile toggle");
	});

	test("pageLink should generate correct SPA routes", () => {
		const result = Templates.pageLink("about", "About");

		assert.ok(result.includes('href="?page=about"'), "Should create page route");
		assert.ok(result.includes('data-spa-route="page"'), "Should add SPA attribute");
	});

	test("socialLink should generate external links", () => {
		const socialData = {
			href: "https://github.com/test",
			icon: "fab fa-github",
			target: "_blank",
		};

		const result = Templates.socialLink(socialData);

		assert.ok(result.includes("https://github.com/test"), "Should include href");
		assert.ok(result.includes("fab fa-github"), "Should include icon");
	});

	test("errorMessage should display error content", () => {
		const result = Templates.errorMessage("Test Error", "Test message");

		assert.ok(result.includes("error-message"), "Should have error class");
		assert.ok(result.includes("Test Error"), "Should include error title");
	});

	test("giscusComments should respect enabled flags", () => {
		const config = { blogEnabled: false, projectsEnabled: false };

		assert.strictEqual(
			Templates.giscusComments(config, "blog"),
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

		const result = Templates.giscusComments(config, "blog");
		assert.ok(result.includes("giscus-container"), "Should create container");
		assert.ok(result.includes('id="giscus-blog-'), "Should have unique ID");
	});

	test("giscusComments should handle missing config", () => {
		assert.strictEqual(
			Templates.giscusComments(null, "blog"),
			"",
			"Should handle null config",
		);
	});

	test("markdown template should handle renderer errors", () => {
		const result = Templates.markdown("# Test", undefined);

		assert.ok(
			result.includes("Markdown renderer not available"),
			"Should show error message",
		);
	});

	// XSS Protection Tests (Critical)
	test("XSS: should escape malicious content in errorMessage", () => {
		const maliciousTitle = '<img src=x onerror=alert(1)>';
		const result = Templates.errorMessage(maliciousTitle, "Safe message");

		assert.ok(!result.includes("<img"), "Should not contain executable tag");
		assert.ok(result.includes("&lt;img"), "Should escape tag");
	});

	test("XSS: should escape multiple injection attempts", () => {
		const xss1 = '<script>alert(1)</script>';
		const xss2 = '<iframe src="evil.com"></iframe>';
		const result = Templates.errorMessage(xss1, xss2);

		assert.ok(!result.includes("<script>"), "Should not contain raw script");
		assert.ok(!result.includes("<iframe"), "Should not contain raw iframe");
		assert.ok(result.includes("&lt;script&gt;"), "Should escape script");
		assert.ok(result.includes("&lt;iframe"), "Should escape iframe");
	});

	test("XSS: pageLink should escape malicious page IDs", () => {
		const maliciousId = '"><script>alert(1)</script>';
		const result = Templates.pageLink(maliciousId, "Link Text");

		assert.ok(result.includes("&lt;script&gt;"), "Should escape injection");
		assert.ok(!result.includes('"><script>'), "Should not allow breakout");
	});

	test("XSS: tagList should escape malicious tags", () => {
		const maliciousTags = ['<script>alert(1)</script>', 'normal-tag'];
		const result = Templates._tagList(maliciousTags);

		assert.ok(!result.content.includes("<script>"), "Should not contain raw script");
		assert.ok(result.content.includes("&lt;script&gt;"), "Should escape tag");
		assert.ok(result.content.includes("normal-tag"), "Should include safe tags");
	});
});

