import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
    test("navbar renders with brand and nav links", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("nav")).toBeVisible();
        await expect(page.locator(".navbar-brand")).toBeAttached();
        await expect(page.locator('a[href="/blog"]')).toBeVisible();
    });

    test("blog nav link navigates to /blog", async ({ page }) => {
        await page.goto("/");
        await page.click('a[href="/blog"]');
        await expect(page).toHaveURL("/blog");
        await expect(page.locator(".blog-post-card").first()).toBeVisible();
    });

    test("projects dropdown opens on click", async ({ page }) => {
        await page.goto("/");
        await page.click(".dropdown-toggle");
        await expect(page.locator("#projects-dropdown")).toBeVisible();
        await expect(page.locator(".dropdown-item").first()).toBeVisible();
    });

    test("clicking a project link navigates to its page", async ({ page }) => {
        await page.goto("/");
        await page.click(".dropdown-toggle");
        const firstItem = page.locator(".dropdown-item").first();
        const href = await firstItem.getAttribute("href");
        await firstItem.click();
        await expect(page).toHaveURL(href);
        await expect(page.locator("#main-content")).toBeVisible();
    });

    test("browser back returns to previous route", async ({ page }) => {
        await page.goto("/");
        await page.click('a[href="/blog"]');
        await expect(page).toHaveURL("/blog");
        await page.goBack();
        await expect(page).toHaveURL("/");
    });

    test("direct navigation to unknown route falls back gracefully", async ({
        page,
    }) => {
        await page.goto("/this-does-not-exist");
        await expect(page.locator("#main-content")).toBeVisible();
        // Router falls back to BlogList for unknown paths
        await expect(page.locator(".blog-post-card").first()).toBeVisible();
    });
});
