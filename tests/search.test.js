// Test search functionality - essentials only
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { CONSTANTS } from "../app/src/utils/constants.js";

// Helper function to test search logic
function performSearch(fuse, query, minChars = CONSTANTS.SEARCH_MIN_CHARS) {
	const trimmed = query?.trim() || "";
	if (!trimmed || trimmed.length < minChars || !fuse) {
		return [];
	}

	const results = fuse.search(trimmed);
	return results
		.slice(0, CONSTANTS.SEARCH_MAX_RESULTS)
		.map((result) => result.item);
}

describe("Search Functionality", () => {
	test("should handle empty/null queries", () => {
		assert.equal(performSearch(null, "").length, 0, "Empty query returns no results");
		assert.equal(performSearch(null, null).length, 0, "Null query returns no results");
		assert.equal(performSearch(null, undefined).length, 0, "Undefined query returns no results");
	});

	test("should respect min character requirement", async () => {
		const { default: Fuse } = await import("../app/src/dependencies/fuse.js.js");
		
		const data = [{ title: "Test Project", description: "A test project", type: "project", url: "?project=test", tags: [] }];
		const fuse = new Fuse(data, {
			keys: ["title", "description", "tags"],
			includeScore: true,
			threshold: CONSTANTS.SEARCH_THRESHOLD,
		});

		const results = performSearch(fuse, "a"); // 1 character, below min
		assert.equal(results.length, 0, "Should not search below min chars");
	});

	test("should find matching results", async () => {
		const { default: Fuse } = await import("../app/src/dependencies/fuse.js.js");
		
		const data = [
			{ title: "Test Project", description: "A test project about testing", type: "project", url: "?project=test", tags: [] },
			{ title: "Another Project", description: "Something different", type: "project", url: "?project=another", tags: [] },
		];
		const fuse = new Fuse(data, {
			keys: ["title", "description", "tags"],
			includeScore: true,
			threshold: CONSTANTS.SEARCH_THRESHOLD,
		});

		const results = performSearch(fuse, "test");
		assert.ok(results.length > 0, "Should find matching results");
	});

	test("should limit results to configured max", async () => {
		const { default: Fuse } = await import("../app/src/dependencies/fuse.js.js");
		
		const data = Array.from({ length: 20 }, (_, i) => ({
			title: `Project ${i}`,
			description: "A project description",
			type: "project",
			url: `?project=${i}`,
			tags: [],
		}));
		const fuse = new Fuse(data, {
			keys: ["title", "description", "tags"],
			includeScore: true,
			threshold: CONSTANTS.SEARCH_THRESHOLD,
		});

		const results = performSearch(fuse, "Project");
		assert.ok(results.length <= CONSTANTS.SEARCH_MAX_RESULTS, "Should limit results");
	});
});

