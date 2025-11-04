// Test i18n (internationalization) module
import { describe, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { i18n } from "../app/src/i18n.js";

describe("Internationalization (i18n)", () => {
	beforeEach(() => {
		// Reset i18n state before each test
		i18n.currentLanguage = null;
		i18n.translations = {};
	});

	test("should initialize with default language", () => {
		const config = { defaultLanguage: "en" };
		const translations = {
			en: {
				"general.loading": "Loading...",
				"general.error": "Error",
			},
		};

		i18n.init(config, translations);

		assert.equal(
			i18n.currentLanguage,
			"en",
			"Should set current language to en",
		);
		assert.deepEqual(
			i18n.translations,
			translations,
			"Should store translations",
		);
	});

	test("should default to 'en' when no config provided", () => {
		i18n.init(null, {});

		assert.equal(
			i18n.currentLanguage,
			"en",
			"Should default to en language",
		);
	});

	test("should translate valid keys", () => {
		i18n.init(
			{ defaultLanguage: "en" },
			{
				en: {
					"general.loading": "Loading...",
					"blog.title": "Blog Posts",
				},
			},
		);

		assert.equal(
			i18n.t("general.loading"),
			"Loading...",
			"Should translate loading key",
		);
		assert.equal(
			i18n.t("blog.title"),
			"Blog Posts",
			"Should translate blog title key",
		);
	});

	test("should return key when translation not found", () => {
		i18n.init(
			{ defaultLanguage: "en" },
			{
				en: {
					"general.loading": "Loading...",
				},
			},
		);

		const result = i18n.t("nonexistent.key");
		assert.equal(
			result,
			"nonexistent.key",
			"Should return the key itself when not found",
		);
	});

	test("should return key when language not found", () => {
		i18n.init({ defaultLanguage: "fr" }, {});

		const result = i18n.t("some.key");
		assert.equal(
			result,
			"some.key",
			"Should return the key when language doesn't exist",
		);
	});

	test("should translate using specified language", () => {
		i18n.init(
			{ defaultLanguage: "en" },
			{
				en: {
					"general.hello": "Hello",
				},
				fr: {
					"general.hello": "Bonjour",
				},
				es: {
					"general.hello": "Hola",
				},
			},
		);

		assert.equal(
			i18n.t("general.hello"),
			"Hello",
			"Should use default language (en)",
		);
		assert.equal(
			i18n.t("general.hello", "fr"),
			"Bonjour",
			"Should translate to French",
		);
		assert.equal(
			i18n.t("general.hello", "es"),
			"Hola",
			"Should translate to Spanish",
		);
	});

	test("should handle language switching", () => {
		i18n.init(
			{ defaultLanguage: "en" },
			{
				en: {
					"general.greeting": "Hello",
				},
				de: {
					"general.greeting": "Guten Tag",
				},
			},
		);

		assert.equal(i18n.t("general.greeting"), "Hello", "Should use English");

		i18n.currentLanguage = "de";
		assert.equal(i18n.t("general.greeting"), "Guten Tag", "Should use German");
	});

	test("should handle empty translations", () => {
		i18n.init({ defaultLanguage: "en" }, {});

		const result = i18n.t("any.key");
		assert.equal(
			result,
			"any.key",
			"Should return key when no translations exist",
		);
	});

	test("should handle null/undefined translations", () => {
		i18n.init({ defaultLanguage: "en" }, null);

		const result = i18n.t("any.key");
		assert.equal(
			result,
			"any.key",
			"Should handle null translations gracefully",
		);
	});
});

