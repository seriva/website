// Test search functionality
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

	test("Search object should exist and have required methods", () => {
		assert.ok(typeof Search === "object", "Search object should exist");
		assert.ok(
			typeof Search.init === "function",
			"Search.init should be a function",
		);
		assert.ok(
			typeof Search.search === "function",
			"Search.search should be a function",
		);
		assert.ok(Array.isArray(Search.data), "Search.data should be an array");
	});

	test("Search should initialize with empty data", () => {
		assert.equal(Search.data.length, 0, "Search data should start empty");
	});

	test("Search constants should be defined", () => {
		assert.equal(
			CONSTANTS.SEARCH_DEBOUNCE_MS,
			300,
			"Search debounce should be 300ms",
		);
		assert.equal(CONSTANTS.SEARCH_MIN_CHARS, 2, "Search min chars should be 2");
		assert.equal(
			CONSTANTS.SEARCH_MAX_RESULTS,
			8,
			"Search max results should be 8",
		);
	});

	test("Search should handle empty query", () => {
		const results = Search.search("");
		assert.equal(results.length, 0, "Empty query should return no results");
	});

	test("Search should handle null/undefined query", () => {
		const results1 = Search.search(null);
		const results2 = Search.search(undefined);

		assert.equal(results1.length, 0, "Null query should return no results");
		assert.equal(
			results2.length,
			0,
			"Undefined query should return no results",
		);
	});

	test("Search should respect min characters", async () => {
		// Import Fuse dynamically for testing
		const { default: Fuse } = await import("../app/src/dependencies/fuse.js.js");
		
		// Mock some data
		Search.data = [
			{
				title: "Test Project",
				description: "A test project",
				type: "project",
			},
		];
		
		// Initialize Fuse directly without calling getData
		Search.fuse = new Fuse(Search.data, {
			keys: ["title", "description", "tags"],
			includeScore: true,
			threshold: CONSTANTS.SEARCH_THRESHOLD,
		});

		const results = Search.search("a"); // 1 character, below min
		assert.equal(
			results.length,
			0,
			"Query below min chars should return no results",
		);
	});

	test("Search should find results when initialized", async () => {
		// Import Fuse dynamically for testing
		const { default: Fuse } = await import("../app/src/dependencies/fuse.js.js");
		
		// Mock data
		Search.data = [
			{
				title: "Test Project",
				description: "A test project about testing",
				type: "project",
			},
			{
				title: "Another Project",
				description: "Something completely different",
				type: "project",
			},
		];
		
		// Initialize Fuse directly without calling getData
		Search.fuse = new Fuse(Search.data, {
			keys: ["title", "description", "tags"],
			includeScore: true,
			threshold: CONSTANTS.SEARCH_THRESHOLD,
		});

		const results = Search.search("test");
		assert.ok(results.length > 0, "Should find matching results");
	});

	test("Search should limit results to max", async () => {
		// Import Fuse dynamically for testing
		const { default: Fuse } = await import("../app/src/dependencies/fuse.js.js");
		
		// Mock data with more than max results
		Search.data = Array.from({ length: 20 }, (_, i) => ({
			title: `Project ${i}`,
			description: "A project description",
			type: "project",
		}));
		
		// Initialize Fuse directly without calling getData
		Search.fuse = new Fuse(Search.data, {
			keys: ["title", "description", "tags"],
			includeScore: true,
			threshold: CONSTANTS.SEARCH_THRESHOLD,
		});

		const results = Search.search("Project");
		assert.ok(
			results.length <= CONSTANTS.SEARCH_MAX_RESULTS,
			"Results should not exceed max",
		);
	});
});

