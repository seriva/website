// Test layout module
import { describe, test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { Layout } from "../app/src/layout.js";
import { Context } from "../app/src/context.js";

describe("Layout", () => {
    const mockContext = {
        site: {
            title: "Test Site",
            author: "Test Author",
            social: [{ icon: "fab fa-github", href: "https://github.com" }],
            search: { enabled: true, placeholder: "Search..." },
            emailjs: { enabled: true }
        },
        pages: {
            home: { title: "Home", showInNav: true, order: 1 },
            about: { title: "About", showInNav: true, order: 2 }
        },
        blog: { showInNav: true, title: "Blog" },
        projects: [
            { id: "p1", title: "Project 1" },
            { id: "p2", title: "Project 2" }
        ]
    };

    let navbarContainer, footerContainer;

    beforeEach(() => {
        document.body.innerHTML = "";
        Context._set(mockContext);

        navbarContainer = document.createElement("div");
        navbarContainer.id = "navbar-container";
        document.body.appendChild(navbarContainer);

        footerContainer = document.createElement("div");
        footerContainer.id = "footer-container";
        document.body.appendChild(footerContainer);
    });

    afterEach(() => {
        document.body.innerHTML = "";
        Layout.cleanup();
    });

    test("should inject navbar with correct links", async () => {
        await Layout.init();

        const brand = navbarContainer.querySelector(".navbar-brand");
        assert.equal(brand.textContent, "Test Site");

        const links = navbarContainer.querySelectorAll(".nav-link");
        const linkTexts = Array.from(links).map(l => l.textContent.trim());

        assert.ok(linkTexts.includes("Home"));
        assert.ok(linkTexts.includes("About"));
        assert.ok(linkTexts.includes("Blog"));
    });

    test("should inject footer with author and year", async () => {
        await Layout.init();

        const footerText = footerContainer.querySelector(".footer-text").textContent;
        assert.ok(footerText.includes("Test Author"));
        assert.ok(footerText.includes(new Date().getFullYear().toString()));
    });

    test("should toggle mobile menu", async () => {
        await Layout.init();

        const toggleBtn = navbarContainer.querySelector("#navbar-toggle");
        const collapse = navbarContainer.querySelector("#navbarNav");

        assert.ok(toggleBtn, "Toggle button should exist");
        assert.ok(collapse, "Collapse menu should exist");
        assert.ok(!collapse.classList.contains("show"), "Menu should be closed initially");

        // Simulate click
        toggleBtn.click();

        // Since we use reactive binding, we need to wait for update or check state
        // But click handler is synchronous in our mock environment usually, 
        // however Signals.batch might defer.
        // Let's check if the state updated
        assert.equal(Layout.mobileMenuOpen.get(), true, "State should be true");
        assert.ok(collapse.classList.contains("show"), "Menu should have show class");
        assert.equal(toggleBtn.getAttribute("aria-expanded"), "true");

        toggleBtn.click();
        assert.equal(Layout.mobileMenuOpen.get(), false, "State should be false");
        assert.ok(!collapse.classList.contains("show"), "Menu should be closed");
    });

    test("should inject projects dropdown", async () => {
        // Projects dropdown is inside navbar, so we need to init first
        await Layout.init();

        const dropdown = navbarContainer.querySelector("#projects-dropdown");
        assert.ok(dropdown, "Dropdown should exist");

        const items = dropdown.querySelectorAll(".dropdown-item");
        const itemTexts = Array.from(items).map(i => i.textContent);

        assert.ok(itemTexts.includes("Project 1"));
        assert.ok(itemTexts.includes("Project 2"));
    });
});
