import { defineConfig } from "@playwright/test";

export default defineConfig({
    testDir: "tests/e2e",
    fullyParallel: true,
    reporter: "html",
    use: {
        baseURL: "http://localhost:8181",
        trace: "on-first-retry",
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
