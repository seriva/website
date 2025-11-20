// Test theme module
import { describe, test, beforeEach, afterEach } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { Theme } from "../app/src/theme.js";
import { Context } from "../app/src/context.js";

describe("Theme", () => {
    // Mock Context
    const mockContext = {
        site: {
            theme: {
                default: "dark",
                dark: {
                    primary: "#000",
                    text: "#fff",
                    code: { theme: "prism-dark" },
                    comments: { theme: "dark_dimmed" }
                },
                light: {
                    primary: "#fff",
                    text: "#000",
                    code: { theme: "prism-light" },
                    comments: { theme: "light" }
                }
            }
        }
    };

    // Mock localStorage
    const localStorageMock = (() => {
        let store = {};
        return {
            getItem: (key) => store[key] || null,
            setItem: (key, value) => { store[key] = value.toString(); },
            clear: () => { store = {}; },
            removeItem: (key) => { delete store[key]; }
        };
    })();

    Object.defineProperty(global, 'localStorage', { value: localStorageMock });

    // Mock matchMedia
    Object.defineProperty(global, 'window', {
        value: {
            matchMedia: () => ({
                matches: false,
                addEventListener: () => { },
                removeEventListener: () => { }
            })
        },
        writable: true
    });

    beforeEach(() => {
        Context._set(mockContext);
        localStorage.clear();
        document.documentElement.removeAttribute("data-theme");
        document.documentElement.style.cssText = "";
    });

    afterEach(() => {
        Theme.cleanup();
    });

    test("should initialize with default theme", () => {
        Theme.init();
        assert.equal(Theme.current.get(), "dark");
        assert.equal(document.documentElement.getAttribute("data-theme"), "dark");
    });

    test("should load theme from local storage", () => {
        localStorage.setItem("theme-preference", "light");
        Theme.init();
        assert.equal(Theme.current.get(), "light");
        assert.equal(document.documentElement.getAttribute("data-theme"), "light");
    });

    test("should toggle theme", () => {
        Theme.init();
        assert.equal(Theme.current.get(), "dark");

        Theme.toggle();
        assert.equal(Theme.current.get(), "light");
        assert.equal(document.documentElement.getAttribute("data-theme"), "light");
        assert.equal(localStorage.getItem("theme-preference"), "light");

        Theme.toggle();
        assert.equal(Theme.current.get(), "dark");
        assert.equal(document.documentElement.getAttribute("data-theme"), "dark");
    });

    test("should apply CSS variables", () => {
        Theme.init();

        // Check initial dark mode vars
        assert.equal(document.documentElement.style.getPropertyValue("--accent"), "#000");
        assert.equal(document.documentElement.style.getPropertyValue("--font-color"), "#fff");

        Theme.toggle(); // Switch to light

        assert.equal(document.documentElement.style.getPropertyValue("--accent"), "#fff");
        assert.equal(document.documentElement.style.getPropertyValue("--font-color"), "#000");
    });

    test("should update prism theme", () => {
        Theme.init();

        let link = document.getElementById("prism-theme");
        assert.ok(link);
        assert.ok(link.href.includes("prism-dark"));

        Theme.toggle();

        link = document.getElementById("prism-theme");
        assert.ok(link.href.includes("prism-light"));
    });

    test("should apply specific theme", () => {
        Theme.init();
        Theme.apply("light");
        assert.equal(Theme.current.get(), "light");

        Theme.apply("dark");
        assert.equal(Theme.current.get(), "dark");
    });

    test("should ignore invalid theme application", () => {
        Theme.init();
        Theme.apply("invalid-theme");
        assert.equal(Theme.current.get(), "dark"); // Should remain unchanged
    });
});
