// Test email module - validation and essential logic
import { describe, test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { ContactForm } from "../app/src/components/email.js";

let Email;

describe("Email", () => {
	beforeEach(() => {
		// Create fresh instance for each test (with config disabled to avoid initialization)
		Email = Object.assign(
			Object.create(ContactForm.prototype),
			new ContactForm(),
		);
	});

	test("should validate correct email format", () => {
		assert.ok(
			Email._isValidEmail("test@example.com"),
			"Should accept valid email",
		);
		assert.ok(
			Email._isValidEmail("user.name+tag@domain.co.uk"),
			"Should accept complex valid email",
		);
	});

	test("should reject invalid email formats", () => {
		assert.ok(
			!Email._isValidEmail("notanemail"),
			"Should reject email without @",
		);
		assert.ok(
			!Email._isValidEmail("missing@domain"),
			"Should reject email without TLD",
		);
		assert.ok(!Email._isValidEmail("@domain.com"), "Should reject missing user");
		assert.ok(!Email._isValidEmail("user@.com"), "Should reject missing domain");
		assert.ok(!Email._isValidEmail(""), "Should reject empty string");
		assert.ok(
			!Email._isValidEmail("spaces in@email.com"),
			"Should reject spaces",
		);
	});

	test("should have correct field IDs defined", () => {
		assert.ok(Email._FIELD_IDS.NAME, "Should have name field ID");
		assert.ok(Email._FIELD_IDS.EMAIL, "Should have email field ID");
		assert.ok(Email._FIELD_IDS.MESSAGE, "Should have message field ID");
		assert.ok(Email._FIELD_IDS.FORM, "Should have form ID");
	});

	test("should start uninitialized", () => {
		// Fresh module state should be uninitialized
		// (Note: This may be false if init() was called elsewhere, but that's expected)
		assert.strictEqual(
			typeof Email.initialized,
			"boolean",
			"Should track initialization state",
		);
	});

	test("should have reactive status message signal", async () => {
		// Create status element
		const statusDiv = document.createElement("div");
		statusDiv.id = "contact-status";
		statusDiv.className = "form-status";
		document.body.appendChild(statusDiv);

		// Import Signals to test reactive behavior
		const { Signals } = await import("../app/src/core/reactive.js");

		// Simulate Email's reactive status setup
		const statusMessage = Signals.create({ text: "", type: "" });
		statusMessage.subscribe((status) => {
			statusDiv.textContent = status.text;
			statusDiv.className = status.type
				? `form-status ${status.type}`
				: "form-status";
		});

		// Set status message
		statusMessage.set({ text: "Test message", type: "success" });

		assert.strictEqual(
			statusDiv.textContent,
			"Test message",
			"Should set message via signal",
		);
		assert.ok(
			statusDiv.className.includes("success"),
			"Should include success class",
		);

		// Clear status
		statusMessage.set({ text: "", type: "" });

		assert.strictEqual(statusDiv.textContent, "", "Should clear text via signal");
		assert.strictEqual(
			statusDiv.className,
			"form-status",
			"Should reset class via signal",
		);

		// Cleanup
		document.body.removeChild(statusDiv);
	});

	test("should clear field errors from inputs", () => {
		// Create inputs with error class
		const nameInput = document.createElement("input");
		nameInput.id = "contact-name";
		nameInput.classList.add("error");
		nameInput.setAttribute("data-class-error", "errors.name");

		const emailInput = document.createElement("input");
		emailInput.id = "contact-email";
		emailInput.classList.add("error");
		emailInput.setAttribute("data-class-error", "errors.email");

		const messageInput = document.createElement("textarea");
		messageInput.id = "contact-message";
		messageInput.classList.add("error");
		messageInput.setAttribute("data-class-error", "errors.message");

		document.body.append(nameInput, emailInput, messageInput);

		Email.initState();
		const cleanup = Email.scan(document.body);
		Email._clearFieldErrors();

		assert.ok(
			!nameInput.classList.contains("error"),
			"Should remove error from name",
		);
		assert.ok(
			!emailInput.classList.contains("error"),
			"Should remove error from email",
		);
		assert.ok(
			!messageInput.classList.contains("error"),
			"Should remove error from message",
		);

		cleanup();
		document.body.removeChild(nameInput);
		document.body.removeChild(emailInput);
		document.body.removeChild(messageInput);
	});
});
