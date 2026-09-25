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

    test("search input is focused when overlay opens with valid placeholder", async ({ page }) => {
        await page.click("#search-toggle");
        const input = page.locator("#search-page-input");
        await expect(input).toBeFocused({
            timeout: 2000,
        });
        await expect(input).toHaveValue("");
        const placeholder = await input.getAttribute("placeholder");
        expect(placeholder).not.toBe("undefined");
        expect(placeholder).toBe("Search...");
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

    test("search overlay keeps double scrollbar by preserving outer html scroll", async ({
        page,
    }) => {
        await page.click("#search-toggle");
        await expect(page.locator("#search-page")).toBeVisible();

        const htmlOverflow = await page.evaluate(
            () => window.getComputedStyle(document.documentElement).overflowY
        );
        expect(htmlOverflow).not.toBe("hidden");

        await page.click("#search-page-back");
        await expect(page.locator("#search-page")).not.toBeVisible({
            timeout: 1000,
        });

        const restoredOverflow = await page.evaluate(
            () => window.getComputedStyle(document.documentElement).overflowY
        );
        expect(restoredOverflow).not.toBe("hidden");
    });

    test("clicking a result navigates to the correct page and resets scroll to top", async ({
        page,
    }) => {
        await page.evaluate(() => window.scrollTo(0, 300));
        await page.waitForTimeout(100);

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
        await expect(page.locator("#search-page")).not.toBeVisible();
        await expect(page.locator("#main-content")).not.toHaveClass(
            /page-transition-out/,
            { timeout: 2000 }
        );

        const scrollY = await page.evaluate(() => window.scrollY);
        expect(scrollY).toBe(0);
    });

    test("typing in search preserves cursor position and does not redraw main page", async ({
        page,
    }) => {
        await page.click("#search-toggle");
        await expect(page.locator("#search-page")).toBeVisible();

        // Mark current main element in window to verify it is NOT replaced/redrawn
        await page.evaluate(() => {
            window.__mainEl = document.getElementById("main-content");
            window.__mainEl.setAttribute("data-test-marker", "original");
        });

        const input = page.locator("#search-page-input");
        await input.focus();

        // Type first word
        await page.keyboard.type("Go");
        // Wait for debounce and search results mount
        await expect(page.locator(".search-result-item").first()).toBeVisible({
            timeout: 2000,
        });

        // Verify cursor is at position 2, not reset to 0
        let cursor = await page.evaluate(() => {
            const inp = document.getElementById("search-page-input");
            return inp.selectionStart;
        });
        expect(cursor).toBe(2);

        // Continue typing second word without cursor jumping to beginning
        await page.keyboard.type("Front");
        await page.waitForTimeout(200);

        cursor = await page.evaluate(() => {
            const inp = document.getElementById("search-page-input");
            return inp.selectionStart;
        });
        expect(cursor).toBe(7); // "GoFront".length

        // Verify input value is "GoFront" (not "FrontGo" or scrambled from cursor reset)
        const value = await input.inputValue();
        expect(value).toBe("GoFront");

        // Verify main was NOT remounted/redrawn
        const isSameMain = await page.evaluate(() => {
            const currentMain = document.getElementById("main-content");
            return currentMain === window.__mainEl &&
                currentMain?.getAttribute("data-test-marker") === "original";
        });
        expect(isSameMain).toBe(true);

        // Clear search using clear button and verify main is still not redrawn
        await page.click("#search-page-clear");
        await expect(input).toHaveValue("");
        await expect(page.locator(".search-result-item")).toHaveCount(0);

        const stillSameMain = await page.evaluate(() => {
            return document.getElementById("main-content") === window.__mainEl;
        });
        expect(stillSameMain).toBe(true);
    });

    test("Control+k and / shortcuts trigger search overlay", async ({ page }) => {
        // Press Control+k to open search
        await page.keyboard.press("Control+k");
        await expect(page.locator("#search-page")).toBeVisible();

        // Escape to close
        await page.keyboard.press("Escape");
        await expect(page.locator("#search-page")).not.toBeVisible();

        // Press / to open search
        await page.keyboard.press("/");
        await expect(page.locator("#search-page")).toBeVisible();
    });

    test("typing / inside text inputs does not trigger search shortcut", async ({ page }) => {
        // Open contact modal to focus an input
        await page.click("#email-toggle");
        await expect(page.locator("#contact-modal")).toBeVisible();
        const input = page.locator("#contact-name");
        await input.click();
        await input.fill("test");
        await page.keyboard.type("/");

        // Search overlay should NOT open
        await expect(page.locator("#search-page")).not.toBeVisible();
        // The slash character should be in the input
        await expect(input).toHaveValue("test/");
    });

    test("ArrowDown and ArrowUp navigate search results and Enter opens selected", async ({ page }) => {
        await page.click("#search-toggle");
        await fillSearch(page, "Go");
        const results = page.locator(".search-result-item");
        await expect(results.first()).toBeVisible({ timeout: 2000 });

        // Initial state: no selected class
        await expect(page.locator(".search-result-item.selected")).toHaveCount(0);

        // ArrowDown selects the first result
        await page.keyboard.press("ArrowDown");
        await expect(results.nth(0)).toHaveClass(/selected/);

        // ArrowDown moves to the second result
        await page.keyboard.press("ArrowDown");
        await expect(results.nth(1)).toHaveClass(/selected/);
        await expect(results.nth(0)).not.toHaveClass(/selected/);

        // ArrowUp moves back to the first result
        await page.keyboard.press("ArrowUp");
        await expect(results.nth(0)).toHaveClass(/selected/);

        // Get href of the selected result
        const targetHref = await results.nth(0).locator("h2 a").getAttribute("href");

        // Enter opens the selected result
        await page.keyboard.press("Enter");
        await expect(page.locator("#search-page")).not.toBeVisible();
        await expect(page).toHaveURL(targetHref);
    });
});
