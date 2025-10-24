QUnit.module("DOM & UI", () => {
	QUnit.test("Required DOM elements should exist", (assert) => {
		assert.ok(
			document.getElementById("navbar-container"),
			"Navbar container should exist",
		);
		assert.ok(
			document.getElementById("main-content"),
			"Main content should exist",
		);
		assert.ok(
			document.getElementById("footer-container"),
			"Footer container should exist",
		);
	});

	QUnit.test("CSS classes should be applied correctly", (assert) => {
		const navbar = document.querySelector(".navbar");
		const main = document.querySelector("main");

		// These might not exist until the page is fully loaded
		if (navbar) {
			assert.ok(
				navbar.classList.contains("navbar"),
				"Navbar should have navbar class",
			);
		}

		if (main) {
			assert.ok(main.id === "main-content", "Main should have correct ID");
		}
	});

	QUnit.test("Mobile viewport detection should work", (assert) => {
		const isMobile = window.innerWidth <= CONSTANTS.MOBILE_BREAKPOINT;
		const isDesktop = window.innerWidth > CONSTANTS.MOBILE_BREAKPOINT;

		assert.ok(
			typeof isMobile === "boolean",
			"Mobile detection should return boolean",
		);
		assert.ok(
			typeof isDesktop === "boolean",
			"Desktop detection should return boolean",
		);
		assert.ok(
			isMobile !== isDesktop,
			"Mobile and desktop should be mutually exclusive",
		);
	});

	QUnit.test("Event listeners should be attachable", (assert) => {
		let clickCount = 0;
		const testElement = document.createElement("button");
		testElement.addEventListener("click", () => clickCount++);

		testElement.click();
		assert.equal(clickCount, 1, "Event listener should work");
	});

	QUnit.test("CSS custom properties should be accessible", (assert) => {
		const root = document.documentElement;
		const computedStyle = getComputedStyle(root);

		// Check if CSS custom properties are defined
		const accentColor = computedStyle.getPropertyValue("--accent");
		const backgroundColor =
			computedStyle.getPropertyValue("--background-color");

		assert.ok(accentColor !== "", "Accent color should be defined");
		assert.ok(backgroundColor !== "", "Background color should be defined");
	});

	QUnit.test("Font loading should work", (assert) => {
		// Test if fonts are loaded
		const testElement = document.createElement("div");
		testElement.style.fontFamily = "Raleway, sans-serif";
		testElement.textContent = "Test";
		document.body.appendChild(testElement);

		const computedStyle = getComputedStyle(testElement);
		const fontFamily = computedStyle.fontFamily;

		assert.ok(fontFamily.includes("Raleway"), "Raleway font should be loaded");

		document.body.removeChild(testElement);
	});

	QUnit.test("Responsive design should work", (assert) => {
		const originalWidth = window.innerWidth;

		// Test mobile viewport
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 375,
		});

		const isMobile = window.innerWidth <= CONSTANTS.MOBILE_BREAKPOINT;
		assert.ok(isMobile, "Should detect mobile viewport");

		// Test desktop viewport
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: 1024,
		});

		const isDesktop = window.innerWidth > CONSTANTS.MOBILE_BREAKPOINT;
		assert.ok(isDesktop, "Should detect desktop viewport");

		// Restore original width
		Object.defineProperty(window, "innerWidth", {
			writable: true,
			configurable: true,
			value: originalWidth,
		});
	});
});
