import { test, expect } from "@playwright/test";

test.describe("Project page", () => {
    test.beforeEach(async ({ page }) => {
        // Intercept GitHub README fetch to avoid network dependency
        await page.route("**/raw.githubusercontent.com/**", (route) =>
            route.fulfill({
                status: 200,
                contentType: "text/plain",
                body: "# Test README\n\nThis is a test readme.\n\n## Overview\n\nOverview content.\n\n```mermaid\ngraph TD\n  A[Start] --> B[End]\n```\n\n## Features\n\nFeatures content.",
            }),
        );
        await page.goto("/project/gofront");
    });

    test("renders project title", async ({ page }) => {
        await expect(page.locator(".project-title")).toBeVisible();
        await expect(page.locator(".project-title")).toContainText("GoFront");
    });

    test("renders project description", async ({ page }) => {
        await expect(page.locator(".project-description")).toBeVisible();
        await expect(page.locator(".project-description")).not.toBeEmpty();
    });

    test("renders project tags", async ({ page }) => {
        const tags = page.locator(".project-tags .item-tag");
        await expect(tags.first()).toBeVisible();
        await expect(tags).toHaveCount(3);
    });

    test("navigates to project via dropdown", async ({ page }) => {
        await page.goto("/");
        await page.click(".dropdown-toggle");
        await expect(page.locator("#projects-dropdown")).toBeVisible();
        await page.click('.dropdown-item[href="/project/gofront"]');
        await expect(page).toHaveURL("/project/gofront");
        await expect(page.locator(".project-title")).toBeVisible();
    });

    test("renders readme content", async ({ page }) => {
        await expect(page.locator("#project-readme")).toBeVisible({
            timeout: 5000,
        });
    });

    test("renders mermaid diagrams and re-themes on toggle", async ({ page }) => {
        const diagram = page.locator("#project-readme .mermaid");
        await expect(diagram).toHaveCount(1);
        await expect(page.locator("#project-readme code.language-mermaid")).toHaveCount(0);
        await expect(diagram.locator("svg")).toBeVisible({ timeout: 15000 });
        await expect(diagram).toContainText("Start");
        // Diagrams are not code blocks: no copy button
        await expect(diagram.locator(".copy-code-button")).toHaveCount(0);

        const before = await diagram.locator("svg").getAttribute("id");
        await page.locator(".theme-toggle").click();
        await expect
            .poll(async () => diagram.locator("svg").getAttribute("id"))
            .not.toBe(before);
        await expect(diagram.locator("svg")).toBeVisible();
    });

    test("highlights active project in dropdown menu", async ({ page }) => {
        await page.goto("/project/gofront");
        await expect(page.locator(".project-title")).toBeVisible();

        // Check dropdown toggle is active
        await expect(page.locator(".dropdown-toggle")).toHaveClass(/active/);

        // Open dropdown
        await page.click(".dropdown-toggle");
        await expect(page.locator("#projects-dropdown")).toBeVisible();

        // Check selected project item has active class
        const activeItem = page.locator('.dropdown-item[href="/project/gofront"]');
        await expect(activeItem).toHaveClass(/active/);

        // Check other project items do not have active class
        const inactiveItem = page.locator('.dropdown-item:not([href="/project/gofront"])').first();
        if (await inactiveItem.count() > 0) {
            await expect(inactiveItem).not.toHaveClass(/active/);
        }
    });

    test("renders table of contents for project and navigates to sections", async ({ page }) => {
        const toc = page.locator(".blog-toc");
        await expect(toc).toBeVisible();
        if (!(await toc.evaluate(el => el.open))) {
            await toc.locator("summary").click();
        }
        const tocLinks = toc.locator(".blog-toc-item a");
        expect(await tocLinks.count()).toBeGreaterThanOrEqual(2);
        const firstLink = tocLinks.first();
        const href = await firstLink.getAttribute("href");
        expect(href).toMatch(/^#/);
        await firstLink.click();
        await expect(page).toHaveURL(new RegExp(href + "$"));
    });
});
