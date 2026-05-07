import { test, expect } from "@playwright/test";

const fillSearch = async (page, value) => {
    const input = page.locator("#search-page-input");
    await input.click();
    await input.fill(value);
    await input.dispatchEvent("input");
};

test.describe("Search", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("#search-toggle")).toBeVisible();
    });

    test("search toggle opens search overlay", async ({ page }) => {
        await page.click("#search-toggle");
        await expect(page.locator("#search-page")).toBeVisible();
    });

    test("search input is focused when overlay opens", async ({ page }) => {
        await page.click("#search-toggle");
        await expect(page.locator("#search-page-input")).toBeFocused({
            timeout: 2000,
        });
    });

    test("typing a query shows matching results", async ({ page }) => {
        await page.click("#search-toggle");
        await fillSearch(page, "Go");
        // Wait for 300ms debounce + render
        await expect(page.locator(".search-result-item").first()).toBeVisible({
            timeout: 2000,
        });
    });

    test("clearing input removes results", async ({ page }) => {
        await page.click("#search-toggle");
        await fillSearch(page, "Go");
        await expect(page.locator(".search-result-item").first()).toBeVisible({
            timeout: 2000,
        });
        await fillSearch(page, "");
        await expect(page.locator(".search-result-item")).toHaveCount(0);
    });

    test("back button closes search overlay", async ({ page }) => {
        await page.click("#search-toggle");
        await expect(page.locator("#search-page")).toBeVisible();
        await page.click("#search-page-back");
        await expect(page.locator("#search-page")).not.toBeVisible({
            timeout: 1000,
        });
    });

    test("clicking a result navigates to the correct page", async ({
        page,
    }) => {
        await page.click("#search-toggle");
        await fillSearch(page, "GoFront");
        await expect(page.locator(".search-result-item").first()).toBeVisible({
            timeout: 2000,
        });
        const firstResultLink = page
            .locator(".search-result-item .blog-post-title a")
            .first();
        const href = await firstResultLink.getAttribute("href");
        await firstResultLink.click();
        await expect(page).toHaveURL(href);
    });
});
