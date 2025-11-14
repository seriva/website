import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import { YAMLParser } from "../app/src/yaml-parser.js";

describe("YAML Parser", () => {
	test("should return an empty object if input is null or empty", () => {
		assert.deepEqual(YAMLParser.parse(null), {});
		assert.deepEqual(YAMLParser.parse(""), {});
		assert.deepEqual(YAMLParser.parse("  "), {});
	});
	test("should parse basic key-value pairs", () => {
		const yaml = "name: John\nage: 30";
		const result = YAMLParser.parse(yaml);
		assert.equal(result.name, "John");
		assert.equal(result.age, 30);
	});

	test("should parse nested objects", () => {
		const yaml = "user:\n  name: John\n  age: 30";
		const result = YAMLParser.parse(yaml);
		assert.equal(result.user.name, "John");
		assert.equal(result.user.age, 30);
	});

	test("should parse inline arrays", () => {
		const yaml = 'tags: ["JavaScript", "Python"]';
		const result = YAMLParser.parse(yaml);
		assert.deepEqual(result.tags, ["JavaScript", "Python"]);
	});

	test("should parse multi-line arrays", () => {
		const yaml = "items:\n  - one\n  - two\n  - three";
		const result = YAMLParser.parse(yaml);
		assert.deepEqual(result.items, ["one", "two", "three"]);
	});

	test("should parse arrays of objects", () => {
		const yaml = "users:\n  - name: John\n    age: 30\n  - name: Jane\n    age: 25";
		const result = YAMLParser.parse(yaml);
		assert.equal(result.users.length, 2);
		assert.equal(result.users[0].name, "John");
		assert.equal(result.users[1].name, "Jane");
	});

	test("should ignore comments", () => {
		const yaml = "# This is a comment\nname: John\n# Another comment";
		const result = YAMLParser.parse(yaml);
		assert.equal(result.name, "John");
	});

	test("should handle inline comments", () => {
		const yaml = 'name: "John"  # This is John';
		const result = YAMLParser.parse(yaml);
		assert.equal(result.name, "John");
	});

	test("should parse booleans", () => {
		const yaml = "enabled: true\ndisabled: false";
		const result = YAMLParser.parse(yaml);
		assert.equal(result.enabled, true);
		assert.equal(result.disabled, false);
	});

	test("should handle quoted strings", () => {
		const yaml = 'text: "Hello World"\nurl: "https://example.com"';
		const result = YAMLParser.parse(yaml);
		assert.equal(result.text, "Hello World");
		assert.equal(result.url, "https://example.com");
	});

	test("should parse actual content.yaml file", () => {
		const yaml = readFileSync("app/data/content.yaml", "utf8");
		const result = YAMLParser.parse(yaml);

	// Test site config
	assert.equal(result.site.title, "luukvanvenrooij.nl");
	assert.equal(result.site.author, "Luuk van Venrooij");
	assert.equal(result.site.github_username, "seriva");

	// Test theme config structure
	assert.equal(result.site.theme.default, "dark");
	assert.equal(result.site.theme.dark.primary, "#10B981");
	assert.equal(result.site.theme.dark.background, "#0D1117");

	// Test light theme exists
	assert.ok(result.site.theme.light);
	assert.equal(result.site.theme.light.primary, "#059669");

	// Test comments theme config (nested under each theme)
	assert.equal(result.site.theme.dark.comments.theme, "dark");
	assert.equal(result.site.theme.light.comments.theme, "light");

	// Test nested config
	assert.equal(result.site.i18n.defaultLanguage, "en");
		assert.deepEqual(result.site.i18n.availableLanguages, ["en"]);

		// Test social array
		assert.ok(Array.isArray(result.site.social));
		assert.ok(result.site.social.length > 0);
		assert.ok(result.site.social[0].icon);

		// Test blog
		assert.equal(result.blog.title, "Blog");
		assert.equal(result.blog.showInNav, true);
		assert.equal(result.blog.postsPerPage, 5);

		// Test blog posts array
		assert.ok(Array.isArray(result.blog.posts));
		assert.ok(result.blog.posts.length > 0);
		assert.ok(result.blog.posts[0].title);
		assert.ok(result.blog.posts[0].tags);

		// Test projects
		assert.ok(Array.isArray(result.projects));
		assert.ok(result.projects.length > 0);
		assert.equal(result.projects[0].id, "snakeai");
		assert.ok(Array.isArray(result.projects[0].tags));

		// Test translations
		assert.ok(result.translations.en);
		assert.equal(result.translations.en["nav.projects"], "Projects");
	});
});

