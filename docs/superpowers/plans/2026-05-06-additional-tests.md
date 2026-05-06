# Additional Tests Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add unit tests for `context.js` and five new e2e test specs covering project page, about page, tag-click-to-search, mobile navigation, and error states.

**Architecture:** New unit test file at `tests/unit/context.test.js` using `Context._set()` for test injection (no real `fetch`). Five new Playwright spec files in `tests/e2e/` following existing patterns. No production code changes.

**Tech Stack:** Node.js native test runner (`node --test`), `@playwright/test`, `jsdom` (already in devDependencies for unit tests)

---

### Task 1: Unit tests for `context.js`

**Files:**
- Create: `tests/unit/context.test.js`

Key facts about `context.js`:
- `Context._set(data)` writes directly to the module-level `appContext` variable — use this for test injection, no `fetch` needed
- `Context.get()` returns `appContext`
- `Context.getBlogPosts()` reads `appContext.blog.posts`, maps each to `{ slug, title, date, excerpt, tags, content: null, filename, id }` (slug = filename with `.md` stripped), then sorts descending by date
- Module is a plain ES module at `app/src/services/context.js`; it imports from `../utils/constants.js`, `../utils/yaml-parser.js`, `./i18n.js`, `./markdown.js` — none are called by `get()` or `getBlogPosts()`
- The `tests/unit/setup.js` file exists — check if it needs importing

- [ ] **Step 1: Check setup.js for any required test setup**

Run:
```bash
cat tests/unit/setup.js
```
Note whether setup.js needs to be imported.

- [ ] **Step 2: Write failing tests**

Create `tests/unit/context.test.js`:

```js
import { describe, test, beforeEach } from "node:test";
import assert from "node:assert/strict";
import { Context } from "../../app/src/services/context.js";

describe("Context", () => {
    beforeEach(() => {
        Context._set(null);
    });

    describe("get()", () => {
        test("returns null when context has not been set", () => {
            assert.equal(Context.get(), null);
        });

        test("returns the data passed to _set()", () => {
            const data = { site: { title: "Test" } };
            Context._set(data);
            assert.deepEqual(Context.get(), data);
        });

        test("returns updated value after multiple _set() calls", () => {
            Context._set({ site: { title: "First" } });
            Context._set({ site: { title: "Second" } });
            assert.equal(Context.get().site.title, "Second");
        });
    });

    describe("getBlogPosts()", () => {
        test("returns empty array when context is null", () => {
            assert.deepEqual(Context.getBlogPosts(), []);
        });

        test("returns empty array when blog.posts is empty", () => {
            Context._set({ blog: { posts: [] } });
            assert.deepEqual(Context.getBlogPosts(), []);
        });

        test("maps filename to slug by stripping .md extension", () => {
            Context._set({
                blog: {
                    posts: [
                        { filename: "2026-01-01-hello.md", title: "Hello", date: "2026-01-01", excerpt: "Ex", tags: [] },
                    ],
                },
            });
            const posts = Context.getBlogPosts();
            assert.equal(posts[0].slug, "2026-01-01-hello");
            assert.equal(posts[0].id, "2026-01-01-hello");
        });

        test("sets content to null on every post", () => {
            Context._set({
                blog: {
                    posts: [
                        { filename: "2026-01-01-hello.md", title: "Hello", date: "2026-01-01", excerpt: "", tags: [] },
                    ],
                },
            });
            const posts = Context.getBlogPosts();
            assert.equal(posts[0].content, null);
        });

        test("sorts posts in descending date order", () => {
            Context._set({
                blog: {
                    posts: [
                        { filename: "2026-01-01-a.md", title: "A", date: "2026-01-01", excerpt: "", tags: [] },
                        { filename: "2026-03-01-c.md", title: "C", date: "2026-03-01", excerpt: "", tags: [] },
                        { filename: "2026-02-01-b.md", title: "B", date: "2026-02-01", excerpt: "", tags: [] },
                    ],
                },
            });
            const posts = Context.getBlogPosts();
            assert.equal(posts[0].title, "C");
            assert.equal(posts[1].title, "B");
            assert.equal(posts[2].title, "A");
        });

        test("includes all required fields in each post", () => {
            Context._set({
                blog: {
                    posts: [
                        { filename: "2026-01-01-hello.md", title: "Hello", date: "2026-01-01", excerpt: "An excerpt", tags: ["JS"] },
                    ],
                },
            });
            const post = Context.getBlogPosts()[0];
            assert.equal(post.title, "Hello");
            assert.equal(post.date, "2026-01-01");
            assert.equal(post.excerpt, "An excerpt");
            assert.deepEqual(post.tags, ["JS"]);
            assert.equal(post.filename, "2026-01-01-hello.md");
        });

        test("uses empty string defaults for missing title, date, excerpt", () => {
            Context._set({
                blog: {
                    posts: [
                        { filename: "no-meta.md" },
                    ],
                },
            });
            const post = Context.getBlogPosts()[0];
            assert.equal(post.title, "Untitled");
            assert.equal(post.date, "");
            assert.equal(post.excerpt, "");
            assert.deepEqual(post.tags, []);
        });
    });
});
```

- [ ] **Step 3: Run tests to verify they fail**

Run:
```bash
node --test tests/unit/context.test.js
```
Expected: test file runs, but if context.js has import issues in Node.js (e.g. browser-only deps), you'll see import errors. If all pass already, that's fine — verify the logic is actually being exercised.

- [ ] **Step 4: Fix any import issues**

`context.js` imports `i18n.js`, `markdown.js`, `yaml-parser.js`, and `constants.js`. These are all ES modules with no browser-only globals. If Node throws on any import, check whether `jsdom` global setup (from `tests/unit/setup.js`) is needed. If setup.js provides `document` / `window`, import it at the top:

```js
import "../../tests/unit/setup.js";
```

Add this import only if tests fail due to missing `document`.

- [ ] **Step 5: Run tests to verify they pass**

Run:
```bash
node --test tests/unit/context.test.js
```
Expected: all 9 tests pass.

- [ ] **Step 6: Run full unit suite to verify no regressions**

Run:
```bash
npm run test:unit
```
Expected: all tests pass.

- [ ] **Step 7: Format and lint**

Run:
```bash
npm run format && npm run check
```
Expected: no errors.

- [ ] **Step 8: Commit**

```bash
git add tests/unit/context.test.js
git commit -m "test: add unit tests for Context.get() and getBlogPosts()"
```

---

### Task 2: E2e — project page content renders

**Files:**
- Create: `tests/e2e/projects.spec.js`

Key facts:
- Project route: `/project/gofront` (first project in content.yaml, id = "gofront")
- Title rendered in `.project-title`, description in `.project-description`, tags in `.project-tags .item-tag`
- Tags from content.yaml for gofront: `["Node.js", "Javascript", "Go"]`
- README is fetched from GitHub (raw.githubusercontent.com) — intercept to avoid network dependency and speed up tests
- Navigation to project via dropdown: click `.dropdown-toggle` then `.dropdown-item[href="/project/gofront"]`

- [ ] **Step 1: Write the spec**

Create `tests/e2e/projects.spec.js`:

```js
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
```

- [ ] **Step 2: Run the spec**

Run:
```bash
npx playwright test tests/e2e/projects.spec.js --project=chromium
```
Expected: all 5 tests pass. If any fail due to timing, increase timeout on the relevant `expect()`.

- [ ] **Step 3: Run in Firefox too**

Run:
```bash
npx playwright test tests/e2e/projects.spec.js
```
Expected: all 10 tests pass (5 per browser).

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/projects.spec.js
git commit -m "test(e2e): add project page content render tests"
```

---

### Task 3: E2e — about page renders

**Files:**
- Create: `tests/e2e/about.spec.js`

Key facts:
- About page route: `/page/about`
- Content is rendered from `/data/pages/about.md` via the `Page` component
- `Page` uses `computedAsync` and renders into `data-html="displayContent"` → a `<div>` inside `main-content`
- The markdown renders as HTML; the page should contain at least an `<h1>` or `<h2>` heading
- Navigation: "About" link in navbar with `href="/page/about"`

- [ ] **Step 1: Check about.md exists and its content**

Run:
```bash
head -5 app/data/pages/about.md
```
Note the first heading so you can assert on it.

- [ ] **Step 2: Write the spec using the actual heading**

If the first heading is e.g. `# About Me`, write:

Create `tests/e2e/about.spec.js`:

```js
import { test, expect } from "@playwright/test";

test.describe("About page", () => {
    test("navigates to about page via nav link", async ({ page }) => {
        await page.goto("/");
        await page.click('a[href="/page/about"]');
        await expect(page).toHaveURL("/page/about");
    });

    test("renders about page content", async ({ page }) => {
        await page.goto("/page/about");
        // Page component renders markdown — wait for any heading to appear
        await expect(page.locator("main-content h1, main-content h2").first()).toBeVisible({
            timeout: 5000,
        });
    });

    test("direct URL /page/about renders content", async ({ page }) => {
        await page.goto("/page/about");
        await expect(page.locator("main-content")).not.toBeEmpty();
        // No error state visible
        await expect(page.locator(".error-container")).not.toBeVisible();
    });
});
```

- [ ] **Step 3: Run the spec**

Run:
```bash
npx playwright test tests/e2e/about.spec.js --project=chromium
```
Expected: all 3 tests pass.

- [ ] **Step 4: Run in Firefox**

Run:
```bash
npx playwright test tests/e2e/about.spec.js
```
Expected: all 6 tests pass.

- [ ] **Step 5: Commit**

```bash
git add tests/e2e/about.spec.js
git commit -m "test(e2e): add about page render tests"
```

---

### Task 4: E2e — tag click opens search with tag pre-filled

**Files:**
- Create: `tests/e2e/tags.spec.js`

Key facts:
- Tags are rendered as `<span class="item-tag clickable-tag" data-search-tag="<tag>">` in blog list, blog post, and project pages
- Clicking a tag triggers `Search._setupTagSearch()` which calls `this.showWithTag(tag)`
- This opens the search overlay (`#search-page`) and fills `#search-page-input` with the tag value
- Best place to test: blog list at `/blog` has posts with tags visible without extra navigation
- Tag "Go" appears on the "Writing Go for the Frontend" post

- [ ] **Step 1: Write the spec**

Create `tests/e2e/tags.spec.js`:

```js
import { test, expect } from "@playwright/test";

test.describe("Tag click to search", () => {
    test("clicking a tag on blog list opens search with tag pre-filled", async ({
        page,
    }) => {
        await page.goto("/blog");
        // Wait for blog posts to render
        await expect(page.locator(".blog-post-card").first()).toBeVisible({
            timeout: 5000,
        });
        // Click the first visible tag
        const firstTag = page.locator(".clickable-tag").first();
        const tagText = await firstTag.innerText();
        await firstTag.click();

        // Search overlay should open
        await expect(page.locator("#search-page")).toBeVisible();

        // Input should contain the tag text
        await expect(page.locator("#search-page-input")).toHaveValue(tagText, {
            timeout: 2000,
        });
    });

    test("clicking a tag shows search results filtered by that tag", async ({
        page,
    }) => {
        await page.goto("/blog");
        await expect(page.locator(".blog-post-card").first()).toBeVisible({
            timeout: 5000,
        });
        const firstTag = page.locator(".clickable-tag").first();
        await firstTag.click();

        // Results should appear (tag is a real content tag, so results exist)
        await expect(page.locator(".search-result-item").first()).toBeVisible({
            timeout: 2000,
        });
    });

    test("clicking a tag on a project page opens search with tag pre-filled", async ({
        page,
    }) => {
        // Intercept README to avoid network
        await page.route("**/raw.githubusercontent.com/**", (route) =>
            route.fulfill({ status: 200, contentType: "text/plain", body: "# Test" }),
        );
        await page.goto("/project/gofront");
        await expect(page.locator(".project-tags .clickable-tag").first()).toBeVisible();

        const firstTag = page.locator(".project-tags .clickable-tag").first();
        const tagText = await firstTag.innerText();
        await firstTag.click();

        await expect(page.locator("#search-page")).toBeVisible();
        await expect(page.locator("#search-page-input")).toHaveValue(tagText, {
            timeout: 2000,
        });
    });
});
```

- [ ] **Step 2: Run the spec**

Run:
```bash
npx playwright test tests/e2e/tags.spec.js --project=chromium
```
Expected: all 3 tests pass.

- [ ] **Step 3: Run in Firefox**

Run:
```bash
npx playwright test tests/e2e/tags.spec.js
```
Expected: all 6 tests pass.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/tags.spec.js
git commit -m "test(e2e): add tag-click-to-search tests"
```

---

### Task 5: E2e — mobile navigation

**Files:**
- Create: `tests/e2e/mobile-nav.spec.js`

Key facts:
- Mobile breakpoint: `CONSTANTS.MOBILE_BREAKPOINT = 767` (from `app/src/utils/constants.js`)
- At ≤767px, `navbar-toggle` (hamburger) button becomes visible
- Clicking it toggles `mobileMenuOpen` signal → adds `show` class to `.navbar-collapse`
- Clicking a nav link inside the mobile menu calls `closeMobileMenu()` → removes `show` class
- Outside click on document also calls `closeMobileMenu()` (only when `window.innerWidth <= 767`)
- `navbar-brand` IS visible at mobile breakpoint (it's hidden at desktop)
- Use `page.setViewportSize({ width: 375, height: 667 })` for mobile viewport

- [ ] **Step 1: Write the spec**

Create `tests/e2e/mobile-nav.spec.js`:

```js
import { test, expect } from "@playwright/test";

const MOBILE_VIEWPORT = { width: 375, height: 667 };

test.describe("Mobile navigation", () => {
    test.beforeEach(async ({ page }) => {
        await page.setViewportSize(MOBILE_VIEWPORT);
        await page.goto("/");
    });

    test("hamburger button is visible on mobile", async ({ page }) => {
        await expect(page.locator(".navbar-toggle")).toBeVisible();
    });

    test("nav menu is hidden before hamburger click", async ({ page }) => {
        await expect(page.locator(".navbar-collapse")).not.toHaveClass(/show/);
    });

    test("clicking hamburger opens the nav menu", async ({ page }) => {
        await page.click(".navbar-toggle");
        await expect(page.locator(".navbar-collapse")).toHaveClass(/show/);
    });

    test("clicking hamburger again closes the nav menu", async ({ page }) => {
        await page.click(".navbar-toggle");
        await expect(page.locator(".navbar-collapse")).toHaveClass(/show/);
        await page.click(".navbar-toggle");
        await expect(page.locator(".navbar-collapse")).not.toHaveClass(/show/);
    });

    test("clicking a nav link closes the mobile menu", async ({ page }) => {
        await page.click(".navbar-toggle");
        await expect(page.locator(".navbar-collapse")).toHaveClass(/show/);
        // Click a nav link (blog)
        await page.click('a[href="/blog"]');
        await expect(page.locator(".navbar-collapse")).not.toHaveClass(/show/, {
            timeout: 2000,
        });
    });

    test("clicking outside the navbar closes the mobile menu", async ({
        page,
    }) => {
        await page.click(".navbar-toggle");
        await expect(page.locator(".navbar-collapse")).toHaveClass(/show/);
        // Click outside navbar (main content area)
        await page.mouse.click(10, 400);
        await expect(page.locator(".navbar-collapse")).not.toHaveClass(/show/, {
            timeout: 2000,
        });
    });
});
```

- [ ] **Step 2: Run the spec**

Run:
```bash
npx playwright test tests/e2e/mobile-nav.spec.js --project=chromium
```
Expected: all 6 tests pass.

- [ ] **Step 3: Run in Firefox**

Run:
```bash
npx playwright test tests/e2e/mobile-nav.spec.js
```
Expected: all 12 tests pass.

- [ ] **Step 4: Commit**

```bash
git add tests/e2e/mobile-nav.spec.js
git commit -m "test(e2e): add mobile navigation tests"
```

---

### Task 6: E2e — error states

**Files:**
- Create: `tests/e2e/error-states.spec.js`

Key facts:
- Non-existent blog post route: `/blog/post/this-post-does-not-exist-xyz` — `BlogPost` component calls `MarkdownLoader.loadAsHtml`, fails → calls `Templates.errorMessage()`
- Non-existent project route: `/project/this-project-does-not-exist-xyz` — `Project` component's `displayContent` computed returns `Templates.errorMessage()` when `project` is falsy (not found in data)
- `Templates.errorMessage()` renders with class `.error-container` (check `templates.js` to confirm selector)
- Unknown SPA route (e.g. `/unknown-route-xyz`): check how the router handles unknown routes — renders an error or 404 component

- [ ] **Step 1: Check the error template selector**

Run:
```bash
grep -n "error-container\|errorMessage\|error-message" app/src/utils/templates.js | head -20
```
Note the exact CSS class used by `Templates.errorMessage()`.

- [ ] **Step 2: Check how unknown routes are handled**

Run:
```bash
grep -n "notFound\|404\|unknown\|fallback" app/src/main.js | head -10
```
This tells you what renders for unknown routes.

- [ ] **Step 3: Write the spec using confirmed selectors**

Replace `.error-container` below with the actual class from Step 1.

Create `tests/e2e/error-states.spec.js`:

```js
import { test, expect } from "@playwright/test";

test.describe("Error states", () => {
    test("non-existent blog post shows error message", async ({ page }) => {
        await page.goto("/blog/post/this-post-does-not-exist-xyz");
        await expect(
            page.locator(".error-container"),
        ).toBeVisible({ timeout: 5000 });
    });

    test("non-existent project shows error message", async ({ page }) => {
        await page.goto("/project/this-project-does-not-exist-xyz");
        await expect(
            page.locator(".error-container"),
        ).toBeVisible({ timeout: 3000 });
    });

    test("error message contains explanatory text", async ({ page }) => {
        await page.goto("/project/this-project-does-not-exist-xyz");
        const error = page.locator(".error-container");
        await expect(error).toBeVisible({ timeout: 3000 });
        await expect(error).not.toBeEmpty();
    });
});
```

- [ ] **Step 4: Run the spec**

Run:
```bash
npx playwright test tests/e2e/error-states.spec.js --project=chromium
```
Expected: all 3 tests pass. If `.error-container` is wrong, fix the selector based on Step 1 output.

- [ ] **Step 5: Run in Firefox**

Run:
```bash
npx playwright test tests/e2e/error-states.spec.js
```
Expected: all 6 tests pass.

- [ ] **Step 6: Commit**

```bash
git add tests/e2e/error-states.spec.js
git commit -m "test(e2e): add error state tests for bad blog and project routes"
```

---

### Task 7: Final verification

**Files:** none

- [ ] **Step 1: Run full unit test suite**

Run:
```bash
npm run test:unit
```
Expected: all tests pass (includes new context.test.js).

- [ ] **Step 2: Run all e2e tests**

Run:
```bash
npm run test:e2e
```
Expected: all tests pass across chromium and firefox.

- [ ] **Step 3: Run prod build**

Run:
```bash
npm run prod
```
Expected: build succeeds with no errors.

- [ ] **Step 4: Final commit if any formatting changes remain**

```bash
npm run format && npm run check
git add -u
git diff --staged --quiet || git commit -m "chore: format after additional tests"
```
