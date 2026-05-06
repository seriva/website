import { describe, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Context } from "../../app/src/services/context.js";

describe("Context", () => {
	beforeEach(() => {
		Context._set(null);
	});

	describe("get()", () => {
		test("returns null when context has not been set", () => {
			assert.equal(Context.get(), null);
		});

		test("returns the data passed to _set()", () => {
			const data = { site: { title: "Test" } };
			Context._set(data);
			assert.deepEqual(Context.get(), data);
		});

		test("returns updated value after multiple _set() calls", () => {
			Context._set({ site: { title: "First" } });
			Context._set({ site: { title: "Second" } });
			assert.equal(Context.get().site.title, "Second");
		});
	});

	describe("getBlogPosts()", () => {
		test("returns empty array when context is null", () => {
			assert.deepEqual(Context.getBlogPosts(), []);
		});

		test("returns empty array when blog.posts is empty", () => {
			Context._set({ blog: { posts: [] } });
			assert.deepEqual(Context.getBlogPosts(), []);
		});

		test("maps filename to slug by stripping .md extension", () => {
			Context._set({
				blog: {
					posts: [
						{
							filename: "2026-01-01-hello.md",
							title: "Hello",
							date: "2026-01-01",
							excerpt: "Ex",
							tags: [],
						},
					],
				},
			});
			const posts = Context.getBlogPosts();
			assert.equal(posts[0].slug, "2026-01-01-hello");
			assert.equal(posts[0].id, "2026-01-01-hello");
		});

		test("sets content to null on every post", () => {
			Context._set({
				blog: {
					posts: [
						{
							filename: "2026-01-01-hello.md",
							title: "Hello",
							date: "2026-01-01",
							excerpt: "",
							tags: [],
						},
					],
				},
			});
			const posts = Context.getBlogPosts();
			assert.equal(posts[0].content, null);
		});

		test("sorts posts in descending date order", () => {
			Context._set({
				blog: {
					posts: [
						{
							filename: "2026-01-01-a.md",
							title: "A",
							date: "2026-01-01",
							excerpt: "",
							tags: [],
						},
						{
							filename: "2026-03-01-c.md",
							title: "C",
							date: "2026-03-01",
							excerpt: "",
							tags: [],
						},
						{
							filename: "2026-02-01-b.md",
							title: "B",
							date: "2026-02-01",
							excerpt: "",
							tags: [],
						},
					],
				},
			});
			const posts = Context.getBlogPosts();
			assert.equal(posts[0].title, "C");
			assert.equal(posts[1].title, "B");
			assert.equal(posts[2].title, "A");
		});

		test("includes all required fields in each post", () => {
			Context._set({
				blog: {
					posts: [
						{
							filename: "2026-01-01-hello.md",
							title: "Hello",
							date: "2026-01-01",
							excerpt: "An excerpt",
							tags: ["JS"],
						},
					],
				},
			});
			const post = Context.getBlogPosts()[0];
			assert.equal(post.title, "Hello");
			assert.equal(post.date, "2026-01-01");
			assert.equal(post.excerpt, "An excerpt");
			assert.deepEqual(post.tags, ["JS"]);
			assert.equal(post.filename, "2026-01-01-hello.md");
		});

		test("uses defaults for missing title, date, excerpt", () => {
			Context._set({
				blog: {
					posts: [{ filename: "no-meta.md" }],
				},
			});
			const post = Context.getBlogPosts()[0];
			assert.equal(post.title, "Untitled");
			assert.equal(post.date, "");
			assert.equal(post.excerpt, "");
			assert.deepEqual(post.tags, []);
		});
	});
});
