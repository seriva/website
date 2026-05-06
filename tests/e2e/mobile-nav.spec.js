import { test, expect } from "@playwright/test";

const MOBILE_VIEWPORT = { width: 375, height: 667 };

test.describe("Mobile navigation", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(MOBILE_VIEWPORT);
        await page.goto("/");
    });

    test("hamburger button is visible on mobile", async ({ page }) => {
        await expect(page.locator(".navbar-toggle")).toBeVisible();
    });

    test("nav menu is hidden before hamburger click", async ({ page }) => {
        await expect(page.locator(".navbar-collapse")).not.toHaveClass(/show/);
    });

    test("clicking hamburger opens the nav menu", async ({ page }) => {
        await page.click(".navbar-toggle");
        await expect(page.locator(".navbar-collapse")).toHaveClass(/show/);
    });

    test("clicking hamburger again closes the nav menu", async ({ page }) => {
        await page.click(".navbar-toggle");
        await expect(page.locator(".navbar-collapse")).toHaveClass(/show/);
        await page.click(".navbar-toggle");
        await expect(page.locator(".navbar-collapse")).not.toHaveClass(/show/);
    });

    test("clicking a nav link closes the mobile menu", async ({ page }) => {
        await page.click(".navbar-toggle");
        await expect(page.locator(".navbar-collapse")).toHaveClass(/show/);
        // Click a nav link (blog)
        await page.click('a[href="/blog"]');
        await expect(page.locator(".navbar-collapse")).not.toHaveClass(/show/, {
            timeout: 2000,
        });
    });

    test("clicking outside the navbar closes the mobile menu", async ({
        page,
    }) => {
        await page.click(".navbar-toggle");
        await expect(page.locator(".navbar-collapse")).toHaveClass(/show/);
        // Click outside navbar (main content area)
        await page.mouse.click(10, 400);
        await expect(page.locator(".navbar-collapse")).not.toHaveClass(/show/, {
            timeout: 2000,
        });
    });
});
