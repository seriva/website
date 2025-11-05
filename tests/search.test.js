// Test search functionality - essentials only
import { describe, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { Search } from "../app/src/search.js";
import { CONSTANTS } from "../app/src/constants.js";

describe("Search Functionality", () => {
	beforeEach(() => {
		// Reset search state before each test
		Search.data = [];
		Search.fuse = null;
	});

	test("should handle empty/null queries", () => {
		assert.equal(Search.search("").length, 0, "Empty query returns no results");
		assert.equal(Search.search(null).length, 0, "Null query returns no results");
		assert.equal(Search.search(undefined).length, 0, "Undefined query returns no results");
	});

	test("should respect min character requirement", async () => {
		const { default: Fuse } = await import("../app/src/dependencies/fuse.js.js");
		
		Search.data = [{ title: "Test Project", description: "A test project", type: "project" }];
		Search.fuse = new Fuse(Search.data, {
			keys: ["title", "description", "tags"],
			includeScore: true,
			threshold: CONSTANTS.SEARCH_THRESHOLD,
		});

		const results = Search.search("a"); // 1 character, below min
		assert.equal(results.length, 0, "Should not search below min chars");
	});

	test("should find matching results", async () => {
		const { default: Fuse } = await import("../app/src/dependencies/fuse.js.js");
		
		Search.data = [
			{ title: "Test Project", description: "A test project about testing", type: "project" },
			{ title: "Another Project", description: "Something different", type: "project" },
		];
		Search.fuse = new Fuse(Search.data, {
			keys: ["title", "description", "tags"],
			includeScore: true,
			threshold: CONSTANTS.SEARCH_THRESHOLD,
		});

		const results = Search.search("test");
		assert.ok(results.length > 0, "Should find matching results");
	});

	test("should limit results to configured max", async () => {
		const { default: Fuse } = await import("../app/src/dependencies/fuse.js.js");
		
		Search.data = Array.from({ length: 20 }, (_, i) => ({
			title: `Project ${i}`,
			description: "A project description",
			type: "project",
		}));
		Search.fuse = new Fuse(Search.data, {
			keys: ["title", "description", "tags"],
			includeScore: true,
			threshold: CONSTANTS.SEARCH_THRESHOLD,
		});

		const results = Search.search("Project");
		assert.ok(results.length <= CONSTANTS.SEARCH_MAX_RESULTS, "Should limit results");
	});
});

