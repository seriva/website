# Playwright E2E Testing Design

**Date:** 2026-05-06
**Status:** Approved

## Overview

Add Playwright end-to-end tests covering all major user flows. Migrate existing unit tests to `tests/unit/`. E2e tests live in `tests/e2e/`. E2e failures block deployment to GitHub Pages.

## Directory Structure

```
tests/
  unit/                    ← all 11 existing *.test.js files + setup.js (moved)
  e2e/
    navigation.spec.js
    blog.spec.js
    search.spec.js
    contact.spec.js
    theme.spec.js
playwright.config.js       ← root level
```

## Playwright Config

```js
export default {
  testDir: 'tests/e2e',
  webServer: {
    command: 'npm run dev',
    port: 8081,
    reuseExistingServer: !process.env.CI,
  },
  use: {
    baseURL: 'http://localhost:8081',
  },
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
  ],
};
```

- `reuseExistingServer: !process.env.CI` — reuse local dev server for fast iteration; CI always starts fresh
- Chromium + Firefox only — covers 95%+ of users, reduces CI time vs adding webkit

## npm Scripts

```json
"test": "node --test tests/unit/*.test.js",
"test:e2e": "playwright test",
"test:all": "npm test && npm run test:e2e"
```

- `prod` script unchanged — still runs `npm test` (unit only) internally
- `test:e2e` runs Playwright separately

## CI Integration

E2e added as a job inside the existing `.github/workflows/deploy.yml`. The `deploy` job gains `needs: [e2e]`, blocking deployment on e2e failure.

```yaml
jobs:
  e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v5
      - uses: actions/setup-node@v5
        with:
          node-version: "24.x"
          cache: "npm"
      - run: npm install
      - run: npx playwright install --with-deps chromium firefox
      - run: npm run test:e2e
      - uses: actions/upload-artifact@v4
        if: failure()
        with:
          name: playwright-report
          path: playwright-report/

  deploy:
    needs: [e2e]
    # ... existing deploy steps unchanged
```

Unit tests still run inside the `deploy` job via `npm run prod`.

## E2e Test Coverage

### `navigation.spec.js`
- Nav links render on page load
- Clicking each nav item routes to the correct view (blog, projects, about, home)
- Browser back/forward navigate correctly
- Unknown route shows error/fallback state

### `blog.spec.js`
- Blog list renders posts with title, date, excerpt
- Pagination controls appear when posts exceed page size
- Clicking next/prev page loads correct posts
- Clicking a post navigates to its full content
- Markdown renders (headings, code blocks, paragraphs visible)

### `search.spec.js`
- Search input is present and focusable
- Typing a query filters and displays matching results
- Clearing input resets results
- Clicking a result navigates to the correct page/post

### `contact.spec.js`
- Contact form renders all fields (name, email, message)
- Submitting empty form shows validation errors
- EmailJS API call intercepted via `page.route()` — returns fake success, no real emails sent
- Success state shown after mocked successful submission

### `theme.spec.js`
- Theme toggle button present
- Clicking toggle switches CSS variables (e.g. `--background-color` changes)
- Theme selection persists after page reload (localStorage)

## EmailJS Mocking Strategy

Use Playwright's `page.route()` to intercept requests to the EmailJS API endpoint and return a 200 response. This prevents real emails being sent during CI and keeps tests deterministic.

```js
await page.route('**/api.emailjs.com/**', route =>
  route.fulfill({ status: 200, body: JSON.stringify({ status: 200, text: 'OK' }) })
);
```

## Dependencies

- `@playwright/test` — added as devDependency
- Playwright browsers installed via `npx playwright install --with-deps chromium firefox` in CI
- Locally: developers run `npx playwright install chromium firefox` once after `npm install`
