import { test, expect } from "@playwright/test";

test.describe("Blog", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/blog");
        // Wait for posts to finish loading
        await expect(page.locator(".blog-post-card").first()).toBeVisible();
    });

    test("renders 5 posts on page 1", async ({ page }) => {
        await expect(page.locator(".blog-post-card")).toHaveCount(5);
    });

    test("each post card shows title, date, and excerpt", async ({ page }) => {
        const firstCard = page.locator(".blog-post-card").first();
        await expect(firstCard.locator(".blog-post-title a")).toBeVisible();
        await expect(firstCard.locator(".blog-post-date")).toBeVisible();
        await expect(firstCard.locator(".blog-post-excerpt")).toBeVisible();
    });

    test("pagination renders with page 2 link", async ({ page }) => {
        await expect(page.locator(".blog-pagination")).toBeVisible();
        await expect(
            page.locator('.page-link[href="/blog/page/2"]').first(),
        ).toBeVisible();
    });

    test("pagination contains first, previous, next, and last buttons", async ({ page }) => {
        await expect(page.locator('.blog-pagination [aria-label="First"]')).toBeVisible();
        await expect(page.locator('.blog-pagination [aria-label="Previous"]')).toBeVisible();
        await expect(page.locator('.blog-pagination [aria-label="Next"]')).toBeVisible();
        await expect(page.locator('.blog-pagination [aria-label="Last"]')).toBeVisible();

        // Check SVG icons are rendered inside the buttons
        await expect(page.locator('.blog-pagination [aria-label="First"] svg.icon-angles-left')).toBeVisible();
        await expect(page.locator('.blog-pagination [aria-label="Previous"] svg.icon-chevron-left')).toBeVisible();
        await expect(page.locator('.blog-pagination [aria-label="Next"] svg.icon-chevron-right')).toBeVisible();
        await expect(page.locator('.blog-pagination [aria-label="Last"] svg.icon-angles-right')).toBeVisible();

        // On first page, First and Previous should be disabled
        await expect(page.locator('.blog-pagination .page-item:has([aria-label="First"])')).toHaveClass(/disabled/);
        await expect(page.locator('.blog-pagination .page-item:has([aria-label="Previous"])')).toHaveClass(/disabled/);

        // Click Last button to navigate to the last page
        await page.locator('.blog-pagination [aria-label="Last"]').click();
        await expect(page).toHaveURL("/blog/page/2");
        await expect(page.locator('.blog-pagination .page-item:has([aria-label="Last"])')).toHaveClass(/disabled/);
        await expect(page.locator('.blog-pagination .page-item:has([aria-label="Next"])')).toHaveClass(/disabled/);
        await expect(page.locator('.blog-pagination .page-item:has([aria-label="First"])')).not.toHaveClass(/disabled/);
        await expect(page.locator('.blog-pagination .page-item:has([aria-label="Previous"])')).not.toHaveClass(/disabled/);

        // Click First button to return to page 1
        await page.locator('.blog-pagination [aria-label="First"]').click();
        await expect(page).toHaveURL("/blog/page/1");
        await expect(page.locator('.blog-pagination .page-item:has([aria-label="First"])')).toHaveClass(/disabled/);
    });

    test("clicking page 2 shows different posts", async ({ page }) => {
        const page1Titles = await page
            .locator(".blog-post-title a")
            .allTextContents();
        await page.locator('.page-link[href="/blog/page/2"]').first().click();
        await expect(page).toHaveURL("/blog/page/2");
        // Wait for post titles to change from page 1 titles
        await expect
            .poll(async () => {
                const titles = await page
                    .locator(".blog-post-title a")
                    .allTextContents();
                return titles;
            })
            .not.toEqual(page1Titles);
        await expect(page.locator(".blog-post-card").first()).toBeVisible();
        const page2Titles = await page
            .locator(".blog-post-title a")
            .allTextContents();
        expect(page2Titles).not.toEqual(page1Titles);
    });

    test("clicking a post title navigates to the post", async ({ page }) => {
        const firstLink = page.locator(".blog-post-title a").first();
        const href = await firstLink.getAttribute("href");
        await firstLink.click();
        await expect(page).toHaveURL(href);
        await expect(page.locator("#main-content")).toBeVisible();
    });

    test("blog post page renders markdown heading", async ({ page }) => {
        await page.locator(".blog-post-title a").first().click();
        // Wait for navigation away from the list
        await expect(page.locator(".blog-post-card")).toHaveCount(0);
        // Post markdown starts with an h1 or h2
        await expect(
            page.locator("#main-content h1, #main-content h2").first(),
        ).toBeVisible();
    });

    test("blog post syntax highlights code blocks with Prism tokens", async ({ page }) => {
        await page.goto("/blog/2026-04-15-gofront-go-to-javascript");
        await expect(page.locator("pre code").first()).toBeVisible();
        await expect(page.locator("pre code .token").first()).toBeVisible();
        await expect(page.locator("pre .copy-code-button").first()).toBeVisible();
    });
});
