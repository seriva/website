import { test, expect } from "@playwright/test";

test.describe("Tag click to search", () => {
    test("clicking a tag on blog list opens search with tag pre-filled", async ({
        page,
    }) => {
        await page.goto("/blog");
        // Wait for blog posts to render
        await expect(page.locator(".blog-post-card").first()).toBeVisible({
            timeout: 5000,
        });
        // Click the first visible tag
        const firstTag = page.locator(".clickable-tag").first();
        const tagText = await firstTag.innerText();
        await firstTag.click();

        // Search overlay should open
        await expect(page.locator("#search-page")).toBeVisible();

        // Input should contain the tag text
        await expect(page.locator("#search-page-input")).toHaveValue(tagText, {
            timeout: 2000,
        });
    });

    test("clicking a tag shows search results filtered by that tag", async ({
        page,
    }) => {
        await page.goto("/blog");
        await expect(page.locator(".blog-post-card").first()).toBeVisible({
            timeout: 5000,
        });
        const firstTag = page.locator(".clickable-tag").first();
        await firstTag.click();

        // Results should appear (tag is a real content tag, so results exist)
        await expect(page.locator(".search-result-item").first()).toBeVisible({
            timeout: 2000,
        });
    });

    test("clicking a tag on a project page opens search with tag pre-filled", async ({
        page,
    }) => {
        // Intercept README to avoid network
        await page.route("**/raw.githubusercontent.com/**", (route) =>
            route.fulfill({
                status: 200,
                contentType: "text/plain",
                body: "# Test",
            }),
        );
        await page.goto("/project/gofront");
        await expect(
            page.locator(".project-tags .clickable-tag").first(),
        ).toBeVisible();

        const firstTag = page.locator(".project-tags .clickable-tag").first();
        const tagText = await firstTag.innerText();
        await firstTag.click();

        await expect(page.locator("#search-page")).toBeVisible();
        await expect(page.locator("#search-page-input")).toHaveValue(tagText, {
            timeout: 2000,
        });
    });
});
