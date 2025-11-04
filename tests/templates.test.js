// Test templates module
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { Templates } from "../app/src/templates.js";

describe("Templates", () => {
	test("navbar template should generate valid HTML", () => {
		const result = Templates.navbar(
			"<li>Blog</li>",
			"<li>Projects</li>",
			"<li>About</li>",
			"<li>Social</li>",
			"<li>Search</li>",
			"Test Site",
		);

		assert.ok(result.includes("Test Site"), "Should include site title");
		assert.ok(result.includes("navbar"), "Should include navbar class");
		assert.ok(
			result.includes("navbar-container"),
			"Should include navbar container",
		);
		assert.ok(
			result.includes("navbar-collapse"),
			"Should include navbar collapse",
		);
		assert.ok(
			result.includes("navbar-toggle"),
			"Should include mobile toggle button",
		);
	});

	test("pageLink template should generate valid link", () => {
		const result = Templates.pageLink("about", "About");

		assert.ok(
			result.includes('href="?page=about"'),
			"Should include correct href",
		);
		assert.ok(result.includes("About"), "Should include page title");
		assert.ok(
			result.includes('data-spa-route="page"'),
			"Should include SPA route attribute",
		);
		assert.ok(result.includes("nav-item"), "Should include nav-item class");
	});

	test("pageLink template should handle blog pages", () => {
		const result = Templates.pageLink("blog", "Blog");

		assert.ok(result.includes('href="?blog"'), "Should include blog href");
		assert.ok(result.includes("Blog"), "Should include page title");
		assert.ok(
			result.includes('data-spa-route="page"'),
			"Should include page route attribute",
		);
	});

	test("socialLink template should generate social link", () => {
		const socialData = {
			href: "https://github.com/test",
			icon: "fab fa-github",
			target: "_blank",
		};

		const result = Templates.socialLink(socialData);

		assert.ok(
			result.includes('href="https://github.com/test"'),
			"Should include href",
		);
		assert.ok(result.includes("fab fa-github"), "Should include icon class");
		assert.ok(
			result.includes('target="_blank"'),
			"Should include target attribute",
		);
	});

	test("socialLink template should handle onclick", () => {
		const socialData = {
			href: "#",
			icon: "fas fa-adjust",
			onclick: "toggleTheme()",
			"aria-label": "Toggle theme",
		};

		const result = Templates.socialLink(socialData);

		assert.ok(result.includes('onclick="toggleTheme()"'), "Should include onclick");
		assert.ok(
			result.includes('aria-label="Toggle theme"'),
			"Should include aria-label",
		);
	});

	test("loadingSpinner template should generate spinner", () => {
		const result = Templates.loadingSpinner();

		assert.ok(
			result.includes("loading-spinner"),
			"Should include loading-spinner class",
		);
		assert.ok(result.includes("div"), "Should be a div element");
	});

	test("errorMessage template should generate error message", () => {
		const result = Templates.errorMessage("Test Error", "Test message");

		assert.ok(
			result.includes("error-message"),
			"Should include error-message class",
		);
		assert.ok(result.includes("Test Error"), "Should include error title");
		assert.ok(result.includes("Test message"), "Should include error message");
	});

	test("projectDropdownItem template should generate dropdown item", () => {
		const result = Templates.projectDropdownItem("my-project", "My Project");

		assert.ok(
			result.includes('href="?project=my-project"'),
			"Should include project href",
		);
		assert.ok(result.includes("My Project"), "Should include project title");
		assert.ok(
			result.includes("dropdown-item"),
			"Should include dropdown-item class",
		);
	});

	test("giscusComments template should return empty string when disabled", () => {
		const config = {
			blogEnabled: false,
			projectsEnabled: false,
			repo: "user/repo",
			repoId: "R_test",
			category: "General",
			categoryId: "DIC_test",
		};

		const result = Templates.giscusComments(config, "blog");
		assert.strictEqual(
			result,
			"",
			"Should return empty string when blog comments disabled",
		);

		const result2 = Templates.giscusComments(config, "projects");
		assert.strictEqual(
			result2,
			"",
			"Should return empty string when projects comments disabled",
		);
	});

	test("giscusComments template should generate container when enabled", () => {
		const config = {
			blogEnabled: true,
			projectsEnabled: true,
			repo: "user/repo",
			repoId: "R_test",
			category: "General",
			categoryId: "DIC_test",
			mapping: "pathname",
			strict: "0",
			reactionsEnabled: "1",
			emitMetadata: "0",
			inputPosition: "top",
			theme: "light",
			lang: "en",
		};

		const result = Templates.giscusComments(config, "blog");
		assert.ok(
			result.includes("giscus-container"),
			"Should include giscus-container class",
		);
		assert.ok(
			result.includes('id="giscus-blog-'),
			"Should include unique ID with page type",
		);

		const result2 = Templates.giscusComments(config, "projects");
		assert.ok(
			result2.includes("giscus-container"),
			"Should include giscus-container class for projects",
		);
		assert.ok(
			result2.includes('id="giscus-projects-'),
			"Should include unique ID with projects page type",
		);
	});

	test("giscusComments template should handle missing config", () => {
		const result = Templates.giscusComments(null, "blog");
		assert.strictEqual(
			result,
			"",
			"Should return empty string when config is null",
		);

		const result2 = Templates.giscusComments(undefined, "projects");
		assert.strictEqual(
			result2,
			"",
			"Should return empty string when config is undefined",
		);
	});

	test("youtubeVideo template should generate embed", () => {
		const result = Templates.youtubeVideo("dQw4w9WgXcQ");

		assert.ok(result.includes("youtube-video"), "Should include youtube-video class");
		assert.ok(result.includes("iframeWrapper"), "Should include iframe wrapper");
		assert.ok(
			result.includes("youtube.com/embed/dQw4w9WgXcQ"),
			"Should include video ID in embed URL",
		);
	});

	test("projectLink template should generate external link", () => {
		const link = {
			href: "https://github.com/test/repo",
			icon: "fab fa-github",
			title: "View on GitHub",
		};

		const result = Templates.projectLink(link);

		assert.ok(result.includes('target="_blank"'), "Should open in new tab");
		assert.ok(result.includes('rel="noopener noreferrer"'), "Should have security attributes");
		assert.ok(result.includes("fab fa-github"), "Should include icon");
		assert.ok(result.includes("View on GitHub"), "Should include title");
	});

	test("templates should escape XSS in nested content", () => {
		const maliciousTitle = '<img src=x onerror=alert(1)>';
		const result = Templates.errorMessage(maliciousTitle, "Safe message");

		assert.ok(
			result.includes("&lt;img"),
			"Should escape opening angle bracket",
		);
		assert.ok(
			result.includes("&gt;"),
			"Should escape closing angle bracket",
		);
		assert.ok(
			!result.includes("<img"),
			"Should not contain executable img tag",
		);
	});

	test("templates should handle multiple interpolations", () => {
		const xss1 = '<script>alert(1)</script>';
		const xss2 = '<iframe src="evil.com"></iframe>';
		const result = Templates.errorMessage(xss1, xss2);

		assert.ok(
			result.includes("&lt;script&gt;"),
			"Should escape first XSS attempt",
		);
		assert.ok(
			result.includes("&lt;iframe"),
			"Should escape second XSS attempt",
		);
		assert.ok(
			!result.includes("<script>"),
			"Should not contain raw script",
		);
		assert.ok(
			!result.includes("<iframe"),
			"Should not contain raw iframe",
		);
	});

	test("pageLink should escape malicious page IDs", () => {
		const maliciousId = '"><script>alert(1)</script>';
		const result = Templates.pageLink(maliciousId, "Link Text");

		// The pageId goes into href attribute, which is still escaped
		assert.ok(
			result.includes("&lt;script&gt;"),
			"Should escape script tags in page ID",
		);
		assert.ok(
			!result.includes('"><script>'),
			"Should not contain raw injection attempt",
		);
	});

	test("markdown template should handle renderer errors gracefully", () => {
		// Pass undefined marked to test error handling
		const result = Templates.markdown("# Test", undefined);

		assert.ok(
			result.includes("Markdown renderer not available"),
			"Should show error message when marked is undefined",
		);
	});

	test("tagList should escape malicious tags", () => {
		const maliciousTags = ['<script>alert(1)</script>', 'normal-tag', '<img src=x>'];
		const result = Templates.tagList(maliciousTags);

		assert.ok(
			!result.content.includes("<script>"),
			"Should not contain raw script",
		);
		assert.ok(
			result.content.includes("&lt;script&gt;"),
			"Should escape script tag",
		);
		assert.ok(
			result.content.includes("normal-tag"),
			"Should include normal tags",
		);
	});
});

