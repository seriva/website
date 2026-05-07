import { test, expect } from "@playwright/test";

test.describe("Contact Form", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("#email-toggle")).toBeVisible();
    });

    test("email toggle opens contact modal", async ({ page }) => {
        await page.click("#email-toggle");
        await expect(page.locator("#contact-modal")).toBeVisible();
    });

    test("form renders all required fields", async ({ page }) => {
        await page.click("#email-toggle");
        await expect(page.locator("#contact-name")).toBeVisible();
        await expect(page.locator("#contact-email")).toBeVisible();
        await expect(page.locator("#contact-message")).toBeVisible();
        await expect(page.locator("#contact-submit")).toBeVisible();
    });

    test("submitting empty form shows name required error", async ({ page }) => {
        await page.click("#email-toggle");
        await page.click("#contact-submit");
        await expect(page.locator("#contact-status")).toContainText("required");
        await expect(page.locator("#contact-name")).toHaveClass(/error/);
    });

    test("submitting invalid email shows email error", async ({ page }) => {
        await page.click("#email-toggle");
        await page.fill("#contact-name", "Test User");
        await page.fill("#contact-email", "not-an-email");
        await page.click("#contact-submit");
        await expect(page.locator("#contact-status")).toBeVisible();
        await expect(page.locator("#contact-email")).toHaveClass(/error/);
    });

    test("submitting empty message shows message required error", async ({
        page,
    }) => {
        await page.click("#email-toggle");
        await page.fill("#contact-name", "Test User");
        await page.fill("#contact-email", "test@example.com");
        await page.click("#contact-submit");
        await expect(page.locator("#contact-status")).toContainText("required");
        await expect(page.locator("#contact-message")).toHaveClass(/error/);
    });

    test("successful submission shows success status", async ({ page }) => {
        // Patch fetch before page scripts load so emailjs uses the stub
        await page.addInitScript(() => {
            const _fetch = window.fetch;
            window.fetch = (url, ...args) => {
                if (typeof url === "string" && url.includes("emailjs.com")) {
                    return Promise.resolve(
                        new Response(JSON.stringify({ status: 200, text: "OK" }), {
                            status: 200,
                            headers: { "Content-Type": "application/json" },
                        }),
                    );
                }
                return _fetch(url, ...args);
            };
        });

        await page.goto("/");
        await expect(page.locator("#email-toggle")).toBeVisible();
        await page.click("#email-toggle");
        await page.fill("#contact-name", "Test User");
        await page.fill("#contact-email", "test@example.com");
        await page.fill(
            "#contact-message",
            "This is a test message from Playwright.",
        );
        await page.click("#contact-submit");

        await expect(page.locator("#contact-status")).toHaveClass(/success/, {
            timeout: 3000,
        });
    });

    test("close button hides the modal", async ({ page }) => {
        await page.click("#email-toggle");
        await expect(page.locator("#contact-modal")).toBeVisible();
        await page.click("#contact-modal-close");
        await expect(page.locator("#contact-modal")).not.toBeVisible({
            timeout: 1000,
        });
    });
});
