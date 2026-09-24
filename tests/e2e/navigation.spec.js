import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
    test("navbar renders with brand and nav links", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("nav:has(.navbar-brand)")).toBeVisible();
        await expect(page.locator(".navbar-brand")).toBeAttached();
        await expect(page.locator('a[href="/blog"]')).toBeVisible();
    });

    test("blog nav link navigates to /blog", async ({ page }) => {
        await page.goto("/");
        await page.click('a[href="/blog"]');
        await expect(page).toHaveURL("/blog");
        await expect(page.locator(".blog-post-card").first()).toBeVisible();
    });

    test("projects dropdown opens on click without redrawing main content", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("#main-content")).toBeVisible();
        await page.evaluate(() => {
            window.__mainEl = document.getElementById("main-content");
            window.__mainEl.setAttribute("data-test-marker", "original");
        });

        await page.click(".dropdown-toggle");
        await expect(page.locator("#projects-dropdown")).toBeVisible();
        await expect(page.locator(".dropdown-item").first()).toBeVisible();

        const isSameMain = await page.evaluate(() => {
            const currentMain = document.getElementById("main-content");
            return currentMain === window.__mainEl &&
                currentMain?.getAttribute("data-test-marker") === "original";
        });
        expect(isSameMain).toBe(true);
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

    test("pagination navigation resets scroll position to top", async ({
        page,
    }) => {
        await page.goto("/blog");
        await expect(page.locator(".blog-post-card").first()).toBeVisible();
        await page.evaluate(() => window.scrollTo({ top: 1000, behavior: "instant" }));
        await page.waitForTimeout(100);
        const scrollBefore = await page.evaluate(() => window.scrollY);
        expect(scrollBefore).toBeGreaterThan(0);

        const page2Btn = page.locator('.pagination button[data-page="2"]');
        if (await page2Btn.isVisible()) {
            await page2Btn.click();
            await expect(page).toHaveURL("/blog/page/2");
            await page.waitForTimeout(200);
            const scrollAfter = await page.evaluate(() => window.scrollY);
            expect(scrollAfter).toBe(0);
        }
    });

    test("clicking blog post card resets scroll position to top", async ({
        page,
    }) => {
        await page.goto("/blog");
        await expect(page.locator(".blog-post-card").first()).toBeVisible();
        await page.evaluate(() => window.scrollTo(0, 500));
        await page.waitForTimeout(100);

        const firstPost = page.locator(".blog-post-card .blog-post-title a").first();
        await firstPost.click();
        await expect(page.locator("#main-content")).toBeVisible();
        await page.waitForTimeout(200);
        const scrollAfter = await page.evaluate(() => window.scrollY);
        expect(scrollAfter).toBe(0);
    });
});

