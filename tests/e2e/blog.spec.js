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
        await expect(page).toHaveURL("/blog");
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

    test("previous and next post navigation cards navigate between adjacent posts", async ({ page }) => {
        // Go to newest post
        await page.goto("/blog/2026-09-24-migrating-from-microtastic-to-gofront");
        await expect(page.locator(".blog-nav-prev")).toBeVisible();
        // Newest post has no next post
        await expect(page.locator(".blog-nav-next")).toHaveCount(0);

        // Click older post link
        await page.locator(".blog-nav-prev").scrollIntoViewIfNeeded();
        await page.locator(".blog-nav-prev").click();
        await expect(page).toHaveURL("/blog/2026-09-21-bootstrapping-agentic-development");
        await expect(page.locator(".blog-post-view")).toBeVisible();

        // On middle post, both prev and next are visible
        await expect(page.locator(".blog-nav-next")).toBeVisible();
        await expect(page.locator(".blog-nav-prev")).toBeVisible();

        // Click newer post to return
        await page.locator(".blog-nav-next").scrollIntoViewIfNeeded();
        await page.locator(".blog-nav-next").click();
        await expect(page).toHaveURL("/blog/2026-09-24-migrating-from-microtastic-to-gofront");
    });

    test("renders compact older and newer post navigation buttons", async ({ page }) => {
        // Desktop check on middle post with both buttons
        await page.goto("/blog/2026-09-21-bootstrapping-agentic-development");
        const nav = page.locator(".blog-post-nav");
        await expect(nav).toBeVisible();
        await nav.scrollIntoViewIfNeeded();

        const prevBtn = nav.locator(".blog-nav-prev");
        const nextBtn = nav.locator(".blog-nav-next");

        await expect(prevBtn).toBeVisible();
        await expect(nextBtn).toBeVisible();
        await expect(prevBtn).toContainText("Older post");
        await expect(nextBtn).toContainText("Newer post");

        // Mobile viewport check
        await page.setViewportSize({ width: 375, height: 667 });
        await nav.scrollIntoViewIfNeeded();
        await expect(prevBtn).toBeVisible();
        await expect(nextBtn).toBeVisible();

        // Check buttons are side-by-side (same top offset roughly)
        const prevBox = await prevBtn.boundingBox();
        const nextBox = await nextBtn.boundingBox();
        expect(prevBox).not.toBeNull();
        expect(nextBox).not.toBeNull();
        expect(Math.abs(prevBox.y - nextBox.y)).toBeLessThan(5);

        // Single post button on newest post
        await page.goto("/blog/2026-09-24-migrating-from-microtastic-to-gofront");
        const navSingle = page.locator(".blog-post-nav");
        await expect(navSingle).toBeVisible();
        await navSingle.scrollIntoViewIfNeeded();
        await expect(navSingle.locator(".blog-nav-prev")).toBeVisible();
        await expect(navSingle.locator(".blog-nav-next")).toHaveCount(0);
    });

    test("table of contents renders and links to heading sections", async ({ page }) => {
        await page.goto("/blog/2026-09-24-migrating-from-microtastic-to-gofront");
        const toc = page.locator(".blog-toc");
        await expect(toc).toBeVisible();
        const tocLinks = toc.locator(".blog-toc-item a");
        await expect(tocLinks).toHaveCount(5);

        const firstHref = await tocLinks.first().getAttribute("href");
        expect(firstHref).toBe("#the-architecture");
        const targetHeading = page.locator(firstHref);
        await expect(targetHeading).toBeVisible();

        // If TOC is collapsed, open it first
        if (!(await toc.evaluate(el => el.open))) {
            await toc.locator("summary").click();
        }

        // Click TOC link and verify in-page scroll navigation without full route reload
        await tocLinks.first().click();
        await expect(page).toHaveURL("/blog/2026-09-24-migrating-from-microtastic-to-gofront#the-architecture");

        // Verify page scrolled down towards the heading
        await expect.poll(async () => {
            return await page.evaluate(() => window.scrollY);
        }).toBeGreaterThan(100);

        // Verify content remained intact and was not unmounted/reset
        await expect(page.locator(".blog-post-view")).toBeVisible();

        // Click browser back and verify URL returns to /blog/2026-09-24-migrating-from-microtastic-to-gofront without breaking view
        await page.goBack();
        await expect(page).toHaveURL("/blog/2026-09-24-migrating-from-microtastic-to-gofront");
        await expect(page.locator(".blog-post-view")).toBeVisible();
    });

    test("templ code snippets receive Prism syntax highlighting tokens", async ({ page }) => {
        await page.goto("/blog/2026-09-24-migrating-from-microtastic-to-gofront");
        const templCode = page.locator("pre code.language-templ");
        await expect(templCode).toBeVisible();
        await expect(templCode.locator(".token").first()).toBeVisible();
    });
});
