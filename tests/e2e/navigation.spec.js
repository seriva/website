import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
    test("navbar renders with brand and nav links", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("nav:has(.navbar-brand)")).toBeVisible();
        await expect(page.locator(".navbar-brand")).toBeAttached();
        await expect(page.locator('.nav-link[href="/blog"]')).toBeVisible();
    });

    test("blog nav link navigates to /blog", async ({ page }) => {
        await page.goto("/");
        await page.click('.nav-link[href="/blog"]');
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
        await page.click('.nav-link[href="/blog"]');
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

    test("dynamic meta tags update on route navigation", async ({ page }) => {
        await page.goto("/blog");
        await expect(page.locator(".blog-post-card").first()).toBeVisible();

        const defaultDesc = await page
            .locator('meta[name="description"]')
            .getAttribute("content");
        expect(defaultDesc).toBeTruthy();

        const firstTitle = (
            await page
                .locator(".blog-post-card .blog-post-title a")
                .first()
                .textContent()
        )?.trim();

        await page.locator(".blog-post-card .blog-post-title a").first().click();
        await expect(page.locator(".blog-post-view")).toBeVisible();

        await expect(page).toHaveTitle(new RegExp(firstTitle || ""));
        const ogTitle = await page
            .locator('meta[property="og:title"]')
            .getAttribute("content");
        expect(ogTitle).toContain(firstTitle || "");

        const postDesc = await page
            .locator('meta[name="description"]')
            .getAttribute("content");
        expect(postDesc).toBeTruthy();
        expect(postDesc).not.toBe(defaultDesc);
    });
});

test.describe("Rapid navigation", () => {
    async function firstTwoPosts(page) {
        await page.goto("/blog");
        const links = page.locator(".blog-post-title a");
        await expect(links.nth(1)).toBeVisible();
        return {
            hrefA: await links.nth(0).getAttribute("href"),
            hrefB: await links.nth(1).getAttribute("href"),
            titleB: (await links.nth(1).textContent()).trim(),
        };
    }

    async function expectPostB(page, hrefB, titleB) {
        await expect(page).toHaveURL(hrefB);
        await expect(page.locator("#main-content h1.project-title")).toHaveText(titleB);
        expect(await page.title()).toContain(titleB);
        const canonical = await page.locator('link[rel="canonical"]').getAttribute("href");
        expect(canonical.endsWith(hrefB)).toBe(true);
    }

    test("two clicks inside the fade paint only the latest post and fetch once", async ({ page }) => {
        const fetched = [];
        await page.route("**/data/blog/*.md", async (route) => {
            fetched.push(new URL(route.request().url()).pathname);
            await route.continue();
        });
        const { hrefA, hrefB, titleB } = await firstTwoPosts(page);

        // Same tick: the second navigation starts during the first one's 200 ms fade.
        await page.evaluate(([a, b]) => {
            document.querySelector(`.blog-post-title a[href="${a}"]`).click();
            document.querySelector(`.blog-post-title a[href="${b}"]`).click();
        }, [hrefA, hrefB]);

        await expectPostB(page, hrefB, titleB);
        await page.waitForTimeout(400);
        expect(fetched).toHaveLength(1);
        await expectPostB(page, hrefB, titleB);
    });

    test("a slow fetch from a superseded route never overwrites the newer one", async ({ page }) => {
        let delayed = false;
        await page.route("**/data/blog/*.md", async (route) => {
            if (!delayed) {
                delayed = true;
                await new Promise((resolve) => setTimeout(resolve, 1500));
            }
            await route.continue();
        });
        const { hrefA, hrefB, titleB } = await firstTwoPosts(page);

        await page.locator(`.blog-post-title a[href="${hrefA}"]`).click();
        await expect(page).toHaveURL(hrefA);
        await page.waitForTimeout(300); // post A is now waiting on its slow fetch
        await page.evaluate((b) => {
            history.pushState({}, "", b);
            dispatchEvent(new PopStateEvent("popstate"));
        }, hrefB);

        await expectPostB(page, hrefB, titleB);
        // The stale navigation must not move focus once its fetch finally lands.
        await page.locator('.nav-link[href="/blog"]').focus();
        await page.waitForTimeout(1700); // let post A's fetch resolve
        await expectPostB(page, hrefB, titleB);
        expect(delayed).toBe(true);
        expect(await page.evaluate(() => document.activeElement?.getAttribute("href"))).toBe("/blog");
    });
});

