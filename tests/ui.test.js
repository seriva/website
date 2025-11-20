// Test ui module - DOM manipulation and state management
import { describe, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { NavbarController } from "../app/src/navbar.js";
import { UI } from "../app/src/ui.js";

let Navbar;

describe("UI", () => {
	beforeEach(() => {
		// Create minimal navbar instance without full constructor
		Navbar = Object.create(NavbarController.prototype);
		Navbar.initState();
	});

	test("should close mobile menu by removing show class", () => {
		// Setup DOM elements
		const collapseElement = document.createElement("div");
		collapseElement.id = "navbarNav";
		collapseElement.classList.add("show");

		const navbarToggle = document.createElement("button");
		navbarToggle.id = "navbar-toggle";
		navbarToggle.classList.add("active");
		navbarToggle.setAttribute("aria-expanded", "true");

		document.body.appendChild(collapseElement);
		document.body.appendChild(navbarToggle);

		// Set menu as open in state
		Navbar.mobileMenuOpen.set(true);
		Navbar.closeMobileMenu();

		assert.ok(
			!collapseElement.classList.contains("show"),
			"Should remove show class",
		);
		assert.ok(
			!navbarToggle.classList.contains("active"),
			"Should remove active class",
		);
		assert.strictEqual(
			navbarToggle.getAttribute("aria-expanded"),
			"false",
			"Should set aria-expanded to false",
		);

		document.body.removeChild(collapseElement);
		document.body.removeChild(navbarToggle);
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
