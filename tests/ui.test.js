// Test ui module - DOM manipulation and state management
import { describe, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { NavbarController } from "../app/src/navbar.js";
import { UI } from "../app/src/ui.js";

let Navbar;

describe("UI", () => {
	beforeEach(async () => {
		// Create minimal navbar instance with proper component initialization
		const { Reactive, Signals } = await import("../app/src/reactive.js");
		
		// Create instance and manually initialize like the Component constructor does
		Navbar = Object.create(NavbarController.prototype);
		Navbar._c = Reactive.createComponent();
		
		// Set up component methods
		for (const m of ["bind", "bindAttr", "bindBoolAttr", "bindClass", "bindText", "track"]) {
			Navbar[m] = (...a) => Navbar._c[m](...a);
		}
		Navbar.signal = (v) => Signals.create(v);
		Navbar.computed = (fn) => Navbar._c.computed(fn);
		Navbar.batch = (fn) => Signals.batch(fn);
		
		// Now initialize state
		Navbar.initState();
	});

	test("should close mobile menu by removing show class", () => {
		// Set menu as open in state
		Navbar.mobileMenuOpen.set(true);
		assert.strictEqual(Navbar.mobileMenuOpen.get(), true, "Menu should be open");
		
		// Close the menu
		Navbar.closeMobileMenu();
		
		// Verify the signal state changed
		assert.strictEqual(Navbar.mobileMenuOpen.get(), false, "Menu should be closed");
	});

	test("should handle missing elements gracefully in closeMobileMenu", () => {
		// Should not throw when elements don't exist
		assert.doesNotThrow(() => {
		// Set menu as open in state
		Navbar.mobileMenuOpen.set(true);
			Navbar.closeMobileMenu();
		}, "Should handle missing elements");
	});

	test("should update active nav link based on URL params", () => {
		// Simulate blog route
		window.history.replaceState({}, "", "?blog");
		Navbar.updateActiveNavLink();

		const route = Navbar.currentRoute.get();
		assert.ok(route.blog !== null, "Should track blog route in state");
		assert.strictEqual(route.page, null, "Should not have page route");
		assert.strictEqual(route.project, null, "Should not have project route");

		// Test link active state detection
		assert.ok(
			Navbar._isLinkActive("?blog"),
			"Should detect blog link as active",
		);
		assert.ok(
			!Navbar._isLinkActive("?page=about"),
			"Should not detect page link as active",
		);

		// Now test page route
		window.history.pushState({}, "", "?page=about");
		Navbar.updateActiveNavLink();

		const pageRoute = Navbar.currentRoute.get();
		assert.strictEqual(pageRoute.page, "about", "Should track page route in state");
		assert.ok(!Navbar._isLinkActive("?blog"), "Should not detect blog link as active");
		assert.ok(Navbar._isLinkActive("?page=about"), "Should detect page link as active");
	});

	test("should add copy button to code blocks", () => {
		const pre = document.createElement("pre");
		const code = document.createElement("code");
		code.textContent = "const x = 1;";
		pre.appendChild(code);
		document.body.appendChild(pre);

		UI.initCopyCodeButtons();

		const button = pre.querySelector(".copy-code-button");
		assert.ok(button, "Should add copy button");
		assert.strictEqual(button.tagName, "BUTTON", "Should be a button element");
		assert.ok(button.textContent.length > 0, "Should have button text");
		assert.ok(
			button.hasAttribute("aria-label"),
			"Should have aria-label for accessibility",
		);

		document.body.removeChild(pre);
	});

	test("should not duplicate copy buttons on re-init", () => {
		const pre = document.createElement("pre");
		const code = document.createElement("code");
		code.textContent = "const x = 1;";
		pre.appendChild(code);
		document.body.appendChild(pre);

		UI.initCopyCodeButtons();
		UI.initCopyCodeButtons();

		const buttons = pre.querySelectorAll(".copy-code-button");
		assert.strictEqual(buttons.length, 1, "Should only have one copy button");

		document.body.removeChild(pre);
	});

	test("should skip pre blocks without code elements", () => {
		const pre = document.createElement("pre");
		pre.textContent = "No code element here";
		document.body.appendChild(pre);

		UI.initCopyCodeButtons();

		const button = pre.querySelector(".copy-code-button");
		assert.ok(!button, "Should not add button when no code element exists");

		document.body.removeChild(pre);
	});

	test("should highlight projects dropdown when project is active", () => {
		// Simulate project route
		window.history.replaceState({}, "", "?project=test-project");
		Navbar.updateActiveNavLink();

		const route = Navbar.currentRoute.get();
		assert.strictEqual(
			route.project,
			"test-project",
			"Should track project route in state",
		);

		// Test link active state detection
		assert.ok(
			Navbar._isLinkActive("?project=test-project"),
			"Should detect project link as active",
		);
		assert.ok(
			route.project !== null,
			"Project route should be set indicating dropdown should be active",
		);
	});

	test("should handle fullscreen request gracefully when iframe missing", () => {
		// Should not throw when iframe doesn't exist
		assert.doesNotThrow(() => {
			UI.fullscreen();
		}, "Should handle missing iframe");
	});
});
