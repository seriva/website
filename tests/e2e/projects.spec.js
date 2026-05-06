import { test, expect } from "@playwright/test";

test.describe("Project page", () => {
    test.beforeEach(async ({ page }) => {
        // Intercept GitHub README fetch to avoid network dependency
        await page.route("**/raw.githubusercontent.com/**", (route) =>
            route.fulfill({
                status: 200,
                contentType: "text/plain",
                body: "# Test README\n\nThis is a test readme.",
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
});
