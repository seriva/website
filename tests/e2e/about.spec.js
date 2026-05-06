import { test, expect } from "@playwright/test";

test.describe("About page", () => {
    test("navigates to about page via nav link", async ({ page }) => {
        await page.goto("/");
        await page.click('a[href="/page/about"]');
        await expect(page).toHaveURL("/page/about");
    });

    test("renders about page content", async ({ page }) => {
        await page.goto("/page/about");
        // Page component renders markdown — wait for image in about.md to appear
        await expect(page.locator(".about-pic")).toBeVisible({ timeout: 5000 });
    });

    test("direct URL /page/about renders without error", async ({ page }) => {
        await page.goto("/page/about");
        // No error state visible
        await expect(page.locator(".error-container")).not.toBeVisible({
            timeout: 5000,
        });
        // Content is present
        await expect(page.locator("#main-content")).not.toBeEmpty();
    });
});
