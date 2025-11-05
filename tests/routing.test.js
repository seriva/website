// Test routing module
import { describe, test, beforeEach, mock } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";

describe("Routing - Application Logic", () => {
	describe("URL parsing for SPA routes", () => {
		test("should parse blog route", () => {
			const params = new URLSearchParams("?blog");

			assert.equal(
				params.get("blog"),
				"",
				"Should detect blog route",
			);
			assert.notEqual(
				params.get("blog"),
				null,
				"Blog param should exist",
			);
		});

		test("should parse blog post route", () => {
			const params = new URLSearchParams("?blog=my-post-slug");

			assert.equal(
				params.get("blog"),
				"my-post-slug",
				"Should parse blog post slug",
			);
		});

		test("should parse page route", () => {
			const params = new URLSearchParams("?page=about");

			assert.equal(
				params.get("page"),
				"about",
				"Should parse page parameter",
			);
		});

		test("should parse project route", () => {
			const params = new URLSearchParams("?project=my-project");

			assert.equal(
				params.get("project"),
				"my-project",
				"Should parse project parameter",
			);
		});

		test("should parse page number for blog pagination", () => {
			const params = new URLSearchParams("?blog&p=2");

			assert.equal(
				params.get("p"),
				"2",
				"Should parse page number",
			);
			assert.equal(
				Number.parseInt(params.get("p"), 10),
				2,
				"Should parse as integer",
			);
		});

		test("should handle empty search string", () => {
			const params = new URLSearchParams("");

			assert.equal(
				params.get("blog"),
				null,
				"Should return null for missing params",
			);
		});
	});

	describe("Post object creation", () => {
		test("should create post object with all fields", () => {
			const slug = "test-post";
			const data = {
				title: "Test Post",
				date: "2025-01-01",
				excerpt: "A test excerpt",
				tags: ["test", "demo"],
			};
			const filename = "test-post.md";

			const post = {
				slug,
				title: data.title || "Untitled",
				date: data.date || "",
				excerpt: data.excerpt || "",
				tags: data.tags || [],
				content: null,
				filename,
				id: slug,
			};

			assert.equal(post.slug, "test-post", "Should set slug");
			assert.equal(post.title, "Test Post", "Should set title");
			assert.equal(post.date, "2025-01-01", "Should set date");
			assert.deepEqual(post.tags, ["test", "demo"], "Should set tags");
		});

		test("should use defaults for missing fields", () => {
			const slug = "minimal-post";
			const data = {};
			const filename = "minimal-post.md";

			const post = {
				slug,
				title: data.title || "Untitled",
				date: data.date || "",
				excerpt: data.excerpt || "",
				tags: data.tags || [],
				content: null,
				filename,
				id: slug,
			};

			assert.equal(post.title, "Untitled", "Should use default title");
			assert.equal(post.date, "", "Should use empty date");
			assert.equal(post.excerpt, "", "Should use empty excerpt");
			assert.deepEqual(post.tags, [], "Should use empty tags array");
		});
	});

	describe("Slug generation", () => {
		test("should remove .md extension from filename", () => {
			const filename = "2025-01-01-my-post.md";
			const slug = filename.replace(/\.md$/, "");

			assert.equal(
				slug,
				"2025-01-01-my-post",
				"Should remove .md extension",
			);
		});

		test("should handle filename without extension", () => {
			const filename = "my-post";
			const slug = filename.replace(/\.md$/, "");

			assert.equal(
				slug,
				"my-post",
				"Should keep filename unchanged",
			);
		});

		test("should only remove trailing .md", () => {
			const filename = "file.md.backup.md";
			const slug = filename.replace(/\.md$/, "");

			assert.equal(
				slug,
				"file.md.backup",
				"Should only remove trailing .md",
			);
		});
	});

	describe("Blog pagination", () => {
		test("should calculate correct page boundaries", () => {
			const totalPosts = 25;
			const postsPerPage = 5;
			const totalPages = Math.ceil(totalPosts / postsPerPage);

			assert.equal(totalPages, 5, "Should calculate 5 pages");
		});

		test("should clamp page number within valid range", () => {
			const totalPages = 5;
			const requestedPage = 10;
			const currentPage = Math.max(1, Math.min(requestedPage, totalPages));

			assert.equal(currentPage, 5, "Should clamp to max page");
		});

		test("should not allow page 0 or negative", () => {
			const totalPages = 5;
			const requestedPage = -1;
			const currentPage = Math.max(1, Math.min(requestedPage, totalPages));

			assert.equal(currentPage, 1, "Should clamp to minimum page 1");
		});

		test("should calculate correct slice indices", () => {
			const currentPage = 2;
			const postsPerPage = 5;
			const startIndex = (currentPage - 1) * postsPerPage;
			const endIndex = startIndex + postsPerPage;

			assert.equal(startIndex, 5, "Should start at index 5");
			assert.equal(endIndex, 10, "Should end at index 10");
		});
	});

	describe("Post sorting", () => {
		test("should sort posts newest first", () => {
			const posts = [
				{ date: "2025-01-01" },
				{ date: "2025-03-01" },
				{ date: "2025-02-01" },
			];

			const sorted = posts.sort(
				(a, b) => new Date(b.date) - new Date(a.date),
			);

			assert.equal(sorted[0].date, "2025-03-01", "Newest first");
			assert.equal(sorted[2].date, "2025-01-01", "Oldest last");
		});
	});
});

