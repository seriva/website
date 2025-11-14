// Test ui module - DOM manipulation and state management
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { UI } from "../app/src/ui.js";

describe("UI", () => {
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

		UI.closeMobileMenu();

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
			UI.closeMobileMenu();
		}, "Should handle missing elements");
	});

	test("should update active nav link based on URL params", () => {
		// Create nav links
		const blogLink = document.createElement("a");
		blogLink.className = "nav-link";
		blogLink.href = "?blog";

		const pageLink = document.createElement("a");
		pageLink.className = "nav-link";
		pageLink.href = "?page=about";

		const navbar = document.createElement("div");
		navbar.className = "navbar-nav";
		navbar.appendChild(blogLink);
		navbar.appendChild(pageLink);
		document.body.appendChild(navbar);

		// Simulate blog route
		window.history.replaceState({}, "", "?blog");
		UI.updateActiveNavLink();

		assert.ok(
			blogLink.classList.contains("active"),
			"Should mark blog link as active",
		);
		assert.ok(
			!pageLink.classList.contains("active"),
			"Should not mark page link as active",
		);

		// Simulate page route
		window.history.replaceState({}, "", "?page=about");
		UI.updateActiveNavLink();

		assert.ok(
			!blogLink.classList.contains("active"),
			"Should remove active from blog link",
		);
		assert.ok(
			pageLink.classList.contains("active"),
			"Should mark page link as active",
		);

		document.body.removeChild(navbar);
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
		// Create dropdown structure
		const dropdownToggle = document.createElement("a");
		dropdownToggle.className = "dropdown-toggle";
		dropdownToggle.href = "#";

		const dropdownItem = document.createElement("a");
		dropdownItem.className = "dropdown-item";
		dropdownItem.href = "?project=test-project";

		const dropdown = document.createElement("div");
		dropdown.className = "dropdown";
		dropdown.appendChild(dropdownToggle);
		dropdown.appendChild(dropdownItem);

		const navbar = document.createElement("div");
		navbar.className = "navbar-nav";
		navbar.appendChild(dropdown);
		document.body.appendChild(navbar);

		// Simulate project route
		window.history.replaceState({}, "", "?project=test-project");
		UI.updateActiveNavLink();

		assert.ok(
			dropdownItem.classList.contains("active"),
			"Should mark dropdown item as active",
		);
		assert.ok(
			dropdownToggle.classList.contains("active"),
			"Should mark dropdown toggle as active",
		);

		document.body.removeChild(navbar);
	});

	test("should handle fullscreen request gracefully when iframe missing", () => {
		// Should not throw when iframe doesn't exist
		assert.doesNotThrow(() => {
			UI.fullscreen();
		}, "Should handle missing iframe");
	});
});
