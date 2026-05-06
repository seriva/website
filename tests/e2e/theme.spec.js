import { test, expect } from "@playwright/test";

test.describe("Theme", () => {
    test("theme toggle button is visible", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("#theme-toggle")).toBeVisible();
    });

    test("clicking toggle switches data-theme attribute", async ({ page }) => {
        await page.goto("/");
        const initialTheme = await page
            .locator("html")
            .getAttribute("data-theme");
        await page.click("#theme-toggle");
        const newTheme = await page.locator("html").getAttribute("data-theme");
        expect(newTheme).not.toBe(initialTheme);
    });

    test("clicking toggle changes --background-color CSS variable", async ({
        page,
    }) => {
        await page.goto("/");
        const initialBg = await page.evaluate(() =>
            getComputedStyle(document.documentElement)
                .getPropertyValue("--background-color")
                .trim(),
        );
        await page.click("#theme-toggle");
        const newBg = await page.evaluate(() =>
            getComputedStyle(document.documentElement)
                .getPropertyValue("--background-color")
                .trim(),
        );
        expect(newBg).not.toBe(initialBg);
        expect(newBg).not.toBe("");
    });

    test("theme preference persists after page reload", async ({ page }) => {
        await page.goto("/");
        // Toggle away from the default
        await page.click("#theme-toggle");
        const themeAfterToggle = await page
            .locator("html")
            .getAttribute("data-theme");
        // Reload
        await page.reload();
        const themeAfterReload = await page
            .locator("html")
            .getAttribute("data-theme");
        expect(themeAfterReload).toBe(themeAfterToggle);
    });

    test("toggling twice returns to original theme", async ({ page }) => {
        await page.goto("/");
        const original = await page.locator("html").getAttribute("data-theme");
        await page.click("#theme-toggle");
        await page.click("#theme-toggle");
        const restored = await page.locator("html").getAttribute("data-theme");
        expect(restored).toBe(original);
    });
});
