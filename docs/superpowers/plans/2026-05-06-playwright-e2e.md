# Playwright E2E Testing Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add Playwright e2e tests covering all major user flows, move unit tests to `tests/unit/`, and gate deployment on e2e pass.

**Architecture:** Playwright `webServer` auto-starts `npm run dev` on port 8181 before running tests. Five spec files each own a user flow. The existing `deploy.yml` gains an `e2e` job; the `deploy` job gains `needs: [e2e]`.

**Tech Stack:** `@playwright/test`, Chromium + Firefox, Node.js native test runner (unit), GitHub Actions.

---

## File Map

| Action | Path | Purpose |
|--------|------|---------|
| Create dir | `tests/unit/` | Home for all existing unit tests |
| Move | `tests/*.test.js` → `tests/unit/` | 11 test files |
| Move | `tests/setup.js` → `tests/unit/setup.js` | Test environment setup |
| Create | `playwright.config.js` | Playwright configuration |
| Modify | `package.json` | Update scripts, add devDependency |
| Modify | `AGENTS.md` | Update test commands |
| Modify | `.github/workflows/deploy.yml` | Add e2e job, gate deploy |
| Create | `tests/e2e/navigation.spec.js` | Nav + routing e2e tests |
| Create | `tests/e2e/blog.spec.js` | Blog list + post e2e tests |
| Create | `tests/e2e/search.spec.js` | Search e2e tests |
| Create | `tests/e2e/contact.spec.js` | Contact form e2e tests |
| Create | `tests/e2e/theme.spec.js` | Theme switching e2e tests |

---

## Task 1: Move Unit Tests to tests/unit/

**Files:**
- Move: `tests/*.test.js` → `tests/unit/`
- Move: `tests/setup.js` → `tests/unit/setup.js`

- [ ] **Step 1: Create the unit subdirectory and move all files**

```bash
mkdir tests/unit
mv tests/setup.js tests/unit/setup.js
mv tests/routing.test.js tests/unit/routing.test.js
mv tests/email.test.js tests/unit/email.test.js
mv tests/search.test.js tests/unit/search.test.js
mv tests/prism-loader.test.js tests/unit/prism-loader.test.js
mv tests/i18n.test.js tests/unit/i18n.test.js
mv tests/templates.test.js tests/unit/templates.test.js
mv tests/template-utils.test.js tests/unit/template-utils.test.js
mv tests/markdown.test.js tests/unit/markdown.test.js
mv tests/theme.test.js tests/unit/theme.test.js
mv tests/error-handler.test.js tests/unit/error-handler.test.js
mv tests/yaml-parser.test.js tests/unit/yaml-parser.test.js
```

- [ ] **Step 2: Update the import path for setup.js in every test file**

Each `*.test.js` file imports `"./setup.js"`. After moving to `tests/unit/`, relative path is still `"./setup.js"` — no change needed. Verify with:

```bash
grep -r "setup.js" tests/unit/
```

Expected: every test file still imports `"./setup.js"` (relative path unchanged since both setup and tests are now in the same `tests/unit/` directory).

- [ ] **Step 3: Update the test script in package.json**

In `package.json`, change:
```json
"test": "node --test tests/*.test.js",
```
to:
```json
"test": "node --test tests/unit/*.test.js",
```

- [ ] **Step 4: Run unit tests to confirm nothing broke**

```bash
npm test
```

Expected: `pass 81`, `fail 0` — identical output to before the move.

- [ ] **Step 5: Commit**

```bash
git add tests/unit/ package.json
git commit -m "refactor: move unit tests to tests/unit/"
```

---

## Task 2: Install Playwright and Create playwright.config.js

**Files:**
- Modify: `package.json` (devDependencies)
- Create: `playwright.config.js`

- [ ] **Step 1: Install @playwright/test**

```bash
npm install --save-dev @playwright/test
```

Expected: `package.json` devDependencies gains `"@playwright/test": "^..."`.

- [ ] **Step 2: Install browser binaries (local only — CI installs via workflow)**

```bash
npx playwright install chromium firefox
```

Expected: Playwright downloads Chromium and Firefox binaries. Takes ~1 minute.

- [ ] **Step 3: Create playwright.config.js at the project root**

```js
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
```

- [ ] **Step 4: Create the e2e directory**

```bash
mkdir tests/e2e
```

- [ ] **Step 5: Smoke-test the Playwright setup with a trivial spec**

Create `tests/e2e/smoke.spec.js`:

```js
import { test, expect } from "@playwright/test";

test("site loads", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("nav")).toBeVisible();
});
```

Run:

```bash
npx playwright test tests/e2e/smoke.spec.js
```

Expected: `2 passed` (1 per browser). If the dev server doesn't auto-start, check that `npm run dev` works and starts on port 8181.

- [ ] **Step 6: Delete the smoke spec**

```bash
rm tests/e2e/smoke.spec.js
```

- [ ] **Step 7: Commit**

```bash
git add playwright.config.js package.json package-lock.json tests/e2e/
git commit -m "chore: install Playwright and add playwright.config.js"
```

---

## Task 3: Update package.json Scripts and AGENTS.md

**Files:**
- Modify: `package.json`
- Modify: `AGENTS.md`

- [ ] **Step 1: Add test:e2e and test:all scripts to package.json**

In the `"scripts"` section, add after `"test"`:

```json
"test:e2e": "playwright test",
"test:all": "npm test && npm run test:e2e",
```

Final scripts block:

```json
"scripts": {
    "prepare": "husky && microtastic prep",
    "dependencies": "microtastic prep",
    "dev": "microtastic dev",
    "prod": "npm run check && npm test && microtastic prod && npm run seo",
    "test": "node --test tests/unit/*.test.js",
    "test:e2e": "playwright test",
    "test:all": "npm test && npm run test:e2e",
    "format": "biome format --write .",
    "check": "biome check .",
    "seo": "node scripts/generate-seo.js"
},
```

- [ ] **Step 2: Update AGENTS.md to document the new test commands**

In `AGENTS.md`, find the quality gates line:

```
- **No skipping quality gates** — never push without running `npm run format`, `npm run check`, `npm test`, and `npm run prod`.
```

Update to:

```
- **No skipping quality gates** — never push without running `npm run format`, `npm run check`, `npm test`, `npm run test:e2e`, and `npm run prod`.
```

Also update the build/dev line in the Tech Stack section from:

```
- **Build / Dev**: Microtastic (`npm run dev` on port 8181, `npm run prod`)
```

to:

```
- **Build / Dev**: Microtastic (`npm run dev` on port 8181, `npm run prod`)
- **E2E Tests**: Playwright (`npm run test:e2e`) — tests/e2e/, requires dev server on port 8181
```

- [ ] **Step 3: Run format + check to keep Biome happy**

```bash
npm run format && npm run check
```

Expected: `No fixes applied` or auto-fixes with no errors.

- [ ] **Step 4: Commit**

```bash
git add package.json AGENTS.md
git commit -m "chore: add test:e2e and test:all npm scripts"
```

---

## Task 4: Update deploy.yml to Gate Deployment on E2E

**Files:**
- Modify: `.github/workflows/deploy.yml`

- [ ] **Step 1: Replace deploy.yml with the gated version**

```yaml
name: Deploy to GitHub Pages

permissions:
    id-token: write
    contents: read
    pages: write

on:
    push:
        branches: [master]

jobs:
    e2e:
        runs-on: ubuntu-latest

        steps:
            - name: Checkout
              uses: actions/checkout@v5

            - name: Setup Node.js
              uses: actions/setup-node@v5
              with:
                  node-version: "24.x"
                  cache: "npm"

            - name: Install dependencies
              run: npm install

            - name: Install Playwright browsers
              run: npx playwright install --with-deps chromium firefox

            - name: Run e2e tests
              run: npm run test:e2e

            - name: Upload Playwright report on failure
              uses: actions/upload-artifact@v4
              if: failure()
              with:
                  name: playwright-report
                  path: playwright-report/
                  retention-days: 7

    deploy:
        needs: [e2e]
        runs-on: ubuntu-latest

        steps:
            - name: Checkout
              uses: actions/checkout@v5

            - name: Setup Node.js
              uses: actions/setup-node@v5
              with:
                  node-version: "24.x"
                  cache: "npm"

            - name: Install dependencies
              run: npm install

            - name: Build
              run: npm run prod

            - name: Setup Pages
              uses: actions/configure-pages@v4

            - name: Upload artifact
              uses: actions/upload-pages-artifact@v4
              with:
                  path: "./public"

            - name: Deploy to GitHub Pages
              uses: actions/deploy-pages@v4
```

- [ ] **Step 2: Commit**

```bash
git add .github/workflows/deploy.yml
git commit -m "ci: gate deploy on Playwright e2e tests passing"
```

---

## Task 5: Write tests/e2e/navigation.spec.js

**Files:**
- Create: `tests/e2e/navigation.spec.js`

The SPA uses path-based routing. Nav links: `a[href="/blog"]` (blog), `.dropdown-toggle` (projects), `.dropdown-item` (individual project links). Brand is `href="#"` — not a route link. Back/forward uses `pushState`.

- [ ] **Step 1: Write the spec**

```js
import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
    test("navbar renders with brand and nav links", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("nav")).toBeVisible();
        await expect(page.locator(".navbar-brand")).toBeVisible();
        await expect(page.locator('a[href="/blog"]')).toBeVisible();
    });

    test("blog nav link navigates to /blog", async ({ page }) => {
        await page.goto("/");
        await page.click('a[href="/blog"]');
        await expect(page).toHaveURL("/blog");
        await expect(page.locator(".blog-post-card").first()).toBeVisible();
    });

    test("projects dropdown opens on click", async ({ page }) => {
        await page.goto("/");
        await page.click(".dropdown-toggle");
        await expect(page.locator("#projects-dropdown")).toBeVisible();
        await expect(page.locator(".dropdown-item").first()).toBeVisible();
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
});
```

- [ ] **Step 2: Run the spec to verify it passes**

```bash
npx playwright test tests/e2e/navigation.spec.js --project=chromium
```

Expected: `6 passed`. If any fail, check that `npm run dev` is running and that selectors match the rendered HTML using `npx playwright show-trace` or adding `await page.pause()` to debug.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/navigation.spec.js
git commit -m "test(e2e): add navigation spec"
```

---

## Task 6: Write tests/e2e/blog.spec.js

**Files:**
- Create: `tests/e2e/blog.spec.js`

8 posts exist in content.yaml, 5 per page → 2 pages. Page 1 URL is `/blog`, page 2 is `/blog/page/2`. Post URLs are `/blog/<slug>` (filename minus `.md`). Pagination renders `.blog-pagination` with `.page-link` anchors.

- [ ] **Step 1: Write the spec**

```js
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
            page.locator('.page-link[href="/blog/page/2"]'),
        ).toBeVisible();
    });

    test("clicking page 2 shows different posts", async ({ page }) => {
        const page1Titles = await page
            .locator(".blog-post-title a")
            .allTextContents();
        await page.click('.page-link[href="/blog/page/2"]');
        await expect(page).toHaveURL("/blog/page/2");
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
        await page.click(".blog-post-title a");
        // Post markdown starts with an h1 or h2
        await expect(
            page.locator("#main-content h1, #main-content h2"),
        ).toBeVisible();
    });
});
```

- [ ] **Step 2: Run the spec**

```bash
npx playwright test tests/e2e/blog.spec.js --project=chromium
```

Expected: `7 passed`.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/blog.spec.js
git commit -m "test(e2e): add blog spec"
```

---

## Task 7: Write tests/e2e/search.spec.js

**Files:**
- Create: `tests/e2e/search.spec.js`

Search toggle: `#search-toggle`. Overlay: `#search-page` (class `show` when visible). Input: `#search-page-input`. Results: `.search-result-item`. Back button: `#search-page-back`. Debounce is 300ms — wait up to 2000ms for results.

- [ ] **Step 1: Write the spec**

```js
import { test, expect } from "@playwright/test";

test.describe("Search", () => {
    test.beforeEach(async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("nav")).toBeVisible();
    });

    test("search toggle opens search overlay", async ({ page }) => {
        await page.click("#search-toggle");
        await expect(page.locator("#search-page")).toBeVisible();
    });

    test("search input is focused when overlay opens", async ({ page }) => {
        await page.click("#search-toggle");
        await expect(page.locator("#search-page-input")).toBeFocused();
    });

    test("typing a query shows matching results", async ({ page }) => {
        await page.click("#search-toggle");
        await page.fill("#search-page-input", "Go");
        // Wait for 300ms debounce + render
        await expect(page.locator(".search-result-item").first()).toBeVisible({
            timeout: 2000,
        });
    });

    test("clearing input removes results", async ({ page }) => {
        await page.click("#search-toggle");
        await page.fill("#search-page-input", "Go");
        await expect(page.locator(".search-result-item").first()).toBeVisible({
            timeout: 2000,
        });
        await page.fill("#search-page-input", "");
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

    test("clicking a result navigates to the correct page", async ({
        page,
    }) => {
        await page.click("#search-toggle");
        await page.fill("#search-page-input", "GoFront");
        await expect(page.locator(".search-result-item").first()).toBeVisible({
            timeout: 2000,
        });
        const firstResultLink = page
            .locator(".search-result-item .blog-post-title a")
            .first();
        const href = await firstResultLink.getAttribute("href");
        await firstResultLink.click();
        await expect(page).toHaveURL(href);
    });
});
```

- [ ] **Step 2: Run the spec**

```bash
npx playwright test tests/e2e/search.spec.js --project=chromium
```

Expected: `6 passed`.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/search.spec.js
git commit -m "test(e2e): add search spec"
```

---

## Task 8: Write tests/e2e/contact.spec.js

**Files:**
- Create: `tests/e2e/contact.spec.js`

Email toggle: `#email-toggle`. Modal: `#contact-modal` (class `show` when visible). Fields: `#contact-name`, `#contact-email`, `#contact-message`. Submit: `#contact-submit`. Status: `#contact-status`. EmailJS sends to `https://api.emailjs.com/api/v1.0/email/send`. Intercept with `page.route()` to avoid real network calls. Validation runs field-by-field: empty name → error on name first.

- [ ] **Step 1: Write the spec**

```js
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
        // Intercept the EmailJS API call and return a fake success response
        await page.route("**/api.emailjs.com/**", (route) =>
            route.fulfill({
                status: 200,
                contentType: "application/json",
                body: JSON.stringify({ status: 200, text: "OK" }),
            }),
        );

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
```

- [ ] **Step 2: Run the spec**

```bash
npx playwright test tests/e2e/contact.spec.js --project=chromium
```

Expected: `6 passed`.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/contact.spec.js
git commit -m "test(e2e): add contact form spec"
```

---

## Task 9: Write tests/e2e/theme.spec.js

**Files:**
- Create: `tests/e2e/theme.spec.js`

Theme toggle: `#theme-toggle`. Theme stored in localStorage under key `theme-preference`. Active theme set as `data-theme` attribute on `<html>`. Default is `dark` (from content.yaml). `--background-color` is `#0D1117` (dark) or `#FFFFFF` (light), applied via `document.documentElement.style.setProperty`.

- [ ] **Step 1: Write the spec**

```js
import { test, expect } from "@playwright/test";

test.describe("Theme", () => {
    test("theme toggle button is visible", async ({ page }) => {
        await page.goto("/");
        await expect(page.locator("#theme-toggle")).toBeVisible();
    });

    test("clicking toggle switches data-theme attribute", async ({ page }) => {
        await page.goto("/");
        const initialTheme = await page
            .locator("html")
            .getAttribute("data-theme");
        await page.click("#theme-toggle");
        const newTheme = await page.locator("html").getAttribute("data-theme");
        expect(newTheme).not.toBe(initialTheme);
    });

    test("clicking toggle changes --background-color CSS variable", async ({
        page,
    }) => {
        await page.goto("/");
        const initialBg = await page.evaluate(() =>
            getComputedStyle(document.documentElement)
                .getPropertyValue("--background-color")
                .trim(),
        );
        await page.click("#theme-toggle");
        const newBg = await page.evaluate(() =>
            getComputedStyle(document.documentElement)
                .getPropertyValue("--background-color")
                .trim(),
        );
        expect(newBg).not.toBe(initialBg);
        expect(newBg).not.toBe("");
    });

    test("theme preference persists after page reload", async ({ page }) => {
        await page.goto("/");
        // Toggle away from the default
        await page.click("#theme-toggle");
        const themeAfterToggle = await page
            .locator("html")
            .getAttribute("data-theme");
        // Reload
        await page.reload();
        const themeAfterReload = await page
            .locator("html")
            .getAttribute("data-theme");
        expect(themeAfterReload).toBe(themeAfterToggle);
    });

    test("toggling twice returns to original theme", async ({ page }) => {
        await page.goto("/");
        const original = await page.locator("html").getAttribute("data-theme");
        await page.click("#theme-toggle");
        await page.click("#theme-toggle");
        const restored = await page.locator("html").getAttribute("data-theme");
        expect(restored).toBe(original);
    });
});
```

- [ ] **Step 2: Run the spec**

```bash
npx playwright test tests/e2e/theme.spec.js --project=chromium
```

Expected: `5 passed`.

- [ ] **Step 3: Commit**

```bash
git add tests/e2e/theme.spec.js
git commit -m "test(e2e): add theme spec"
```

---

## Task 10: Full Suite Run and Final Verification

- [ ] **Step 1: Run the complete e2e suite across both browsers**

```bash
npm run test:e2e
```

Expected output summary: all specs pass across chromium and firefox. Total: ~24 tests × 2 browsers = ~48 passed.

If any tests fail on Firefox but not Chromium, check for Firefox-specific timing issues — increase the `timeout` on the relevant `expect()` call.

- [ ] **Step 2: Run unit tests to confirm nothing regressed**

```bash
npm test
```

Expected: `pass 81`, `fail 0`.

- [ ] **Step 3: Run the full quality gate**

```bash
npm run format && npm run check
```

Expected: no errors.

- [ ] **Step 4: Final commit**

```bash
git add .
git commit -m "test(e2e): complete Playwright suite — navigation, blog, search, contact, theme"
```
