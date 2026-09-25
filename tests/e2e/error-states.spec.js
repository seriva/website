import { test, expect } from "@playwright/test";

test.describe("Error states", () => {
    test("non-existent blog post shows error message", async ({ page }) => {
        await page.goto("/blog/post/this-post-does-not-exist-xyz");
        await expect(page.locator(".error-message")).toBeVisible({
            timeout: 5000,
        });
    });

    test("non-existent project shows error message", async ({ page }) => {
        await page.goto("/project/this-project-does-not-exist-xyz");
        await expect(page.locator(".error-message")).toBeVisible({
            timeout: 3000,
        });
    });

    test("error message contains explanatory text", async ({ page }) => {
        await page.goto("/project/this-project-does-not-exist-xyz");
        const error = page.locator(".error-message");
        await expect(error).toBeVisible({ timeout: 3000 });
        await expect(error).not.toBeEmpty();
    });

    test("arbitrary non-existent URL shows 404 error page and back to home link", async ({ page }) => {
        await page.goto("/arbitrary-unknown-path-12345");
        const error = page.locator(".error-message");
        await expect(error).toBeVisible({ timeout: 5000 });
        await expect(error.locator("h1")).toContainText("Page Not Found");
        const backBtn = error.locator("a[data-action='nav']");
        await expect(backBtn).toBeVisible();
        await backBtn.click();
        await expect(page).toHaveURL("/");
    });
});
