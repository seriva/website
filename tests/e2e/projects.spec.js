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
});
