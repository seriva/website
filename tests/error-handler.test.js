import { describe, test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import { JSDOM } from "jsdom";

describe("ErrorHandler", () => {
	let window;
	let document;
	let ErrorHandler;
	let originalConsoleError;
	let consoleErrors;

	beforeEach(async () => {
		// Setup JSDOM
		const dom = new JSDOM("<!DOCTYPE html><html><body></body></html>", {
			url: "http://localhost",
		});
		window = dom.window;
		document = window.document;

		// Make window/document global for the module
		global.window = window;
		global.document = document;

		// Capture console.error calls
		consoleErrors = [];
		originalConsoleError = console.error;
		console.error = (...args) => {
			consoleErrors.push(args);
		};

		// Import module after globals are set
		const module = await import("../app/src/error-handler.js");
		ErrorHandler = module.ErrorHandler;

		// Reset state
		ErrorHandler.initialized = false;
		ErrorHandler.errorCount = 0;
	});

	afterEach(() => {
		// Restore console.error
		console.error = originalConsoleError;

		// Cleanup globals
		delete global.window;
		delete global.document;
	});

	test("should initialize and handle errors", () => {
		ErrorHandler.init();
		assert.equal(ErrorHandler.initialized, true);

		// Should handle manual error logging
		const error = new Error("Test error");
		ErrorHandler.logError(error, { context: "test" });

		assert.equal(ErrorHandler.errorCount, 1);
		assert.equal(consoleErrors.length, 1);
		assert.equal(consoleErrors[0][0], "[MANUAL]");
	});

	test("should prevent infinite error loops", () => {
		ErrorHandler.init();
		ErrorHandler.maxErrors = 3;

		// Trigger 5 errors
		for (let i = 0; i < 5; i++) {
			ErrorHandler.logError(new Error(`Error ${i}`));
		}

		// Should stop after maxErrors and log "too many errors" message
		assert.equal(ErrorHandler.errorCount, 5);
		assert.ok(consoleErrors.length >= 3);
		assert.ok(
			consoleErrors.some((err) =>
				err.join(" ").includes("Too many errors"),
			),
		);
	});

	test("should catch uncaught errors and promise rejections", () => {
		ErrorHandler.init();

		// Simulate window error event
		const errorEvent = new window.ErrorEvent("error", {
			message: "Script error",
			filename: "test.js",
			lineno: 42,
			colno: 10,
			error: new Error("Script error"),
		});
		window.dispatchEvent(errorEvent);

		// Simulate unhandled rejection
		const rejectionEvent = new window.Event("unhandledrejection");
		rejectionEvent.reason = new Error("Promise rejected");
		window.dispatchEvent(rejectionEvent);

		assert.equal(ErrorHandler.errorCount, 2);
		assert.equal(consoleErrors[0][0], "[ERROR]");
		assert.equal(consoleErrors[1][0], "[PROMISE]");
	});
});
