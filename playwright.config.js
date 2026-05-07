import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "tests/e2e",
    fullyParallel: true,
    retries: process.env.CI ? 2 : 0,
    timeout: 30000,
    reporter: process.env.CI ? "list" : "html",
    use: {
        baseURL: "http://localhost:8181",
        trace: "on-first-retry",
        actionTimeout: 10000,
    },
    webServer: {
        command: "npm run dev",
        port: 8181,
        reuseExistingServer: !process.env.CI,
    },
    projects: [
        {
            name: "chromium",
            use: { browserName: "chromium" },
        },
        {
            name: "firefox",
            use: { browserName: "firefox" },
        },
    ],
});
