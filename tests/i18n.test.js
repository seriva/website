// Test i18n (internationalization) module - essentials only
import { describe, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { i18n } from "../app/src/i18n.js";

describe("Internationalization (i18n)", () => {
	beforeEach(() => {
		// Reset i18n state before each test
		i18n.currentLanguage = null;
		i18n.translations = {};
	});

	test("should initialize and translate keys", () => {
		i18n.init(
			{ defaultLanguage: "en" },
			{
				en: {
					"general.loading": "Loading...",
					"blog.title": "Blog Posts",
				},
			},
		);

		assert.equal(i18n.currentLanguage, "en", "Should set language");
		assert.equal(i18n.t("general.loading"), "Loading...", "Should translate");
		assert.equal(i18n.t("blog.title"), "Blog Posts", "Should translate");
	});

	test("should return key as fallback when translation missing", () => {
		i18n.init(
			{ defaultLanguage: "en" },
			{
				en: {
					"general.loading": "Loading...",
				},
			},
		);

		assert.equal(
			i18n.t("nonexistent.key"),
			"nonexistent.key",
			"Should fallback to key",
		);
	});

	test("should handle missing config gracefully", () => {
		i18n.init(null, {});

		assert.equal(i18n.currentLanguage, "en", "Should default to en");
		assert.equal(i18n.t("any.key"), "any.key", "Should return key");
	});
});

