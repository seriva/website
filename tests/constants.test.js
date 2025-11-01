// Test constants module
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import { CONSTANTS } from "../app/src/constants.js";

describe("Constants", () => {
	test("should have mobile breakpoint defined", () => {
		assert.equal(
			CONSTANTS.MOBILE_BREAKPOINT,
			767,
			"Mobile breakpoint should be 767px",
		);
	});

	test("should have transition delays defined", () => {
		assert.equal(
			CONSTANTS.PAGE_TRANSITION_DELAY,
			200,
			"Page transition delay should be 200ms",
		);
		assert.equal(
			CONSTANTS.SEARCH_PAGE_CLOSE_DELAY,
			200,
			"Search page close delay should be 200ms",
		);
	});

	test("should have search configuration", () => {
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

	test("should have default values", () => {
		assert.ok(CONSTANTS.DEFAULT_TITLE, "Should have default title");
		assert.ok(CONSTANTS.DEFAULT_EMAIL, "Should have default email");
	});

	test("should have Prism CDN base path", () => {
		assert.ok(CONSTANTS.PRISM_CDN_BASE, "Should have Prism CDN base");
		assert.ok(
			CONSTANTS.PRISM_CDN_BASE.includes("prism-themes"),
			"Should reference prism-themes directory",
		);
	});
});

