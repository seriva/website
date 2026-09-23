# Bundle Minification Plan

**Status:** Completed  
**Date:** 2026-09-23  

## Objective
Minify both the vendor bundle (`vendor.js`) and the site bundle (`app.js`) in production builds to reduce initial load time, optimize asset delivery, and ensure `public/vendor.js` is automatically emitted for production deployment.

## Architecture & Design
1. **GoFront Vendor Bundler Extension:**
   - Support `minify: boolean` in `loadVendorConfig()` and `bundleVendor()` options.
   - Support `dest: string | string[]` to emit vendor bundles to multiple locations (e.g. `app/vendor.js` for development and `public/vendor.js` for production).
   - Pass `minify` option to underlying bundler (`rolldown` / `esbuild`).
   - CLI flag `gofront prep --minify` for command-line control.
2. **Website Integration:**
   - Configure `package.json` with `"vendor": { "dest": ["app/vendor.js", "public/vendor.js"] }`.
   - Update `prod` script to:
     `npm run check && gofront prep --minify && gofront src -o public/app.js --minify --mangle && npm run seo`
   - Keep `prep` / `dev` unminified for developer ergonomics and fast sourcemap debugging.

## Verification
- Verified `npm run test:unit` (all 1,187 tests) and `npm run check` passing in `gofront`.
- Verified bundle reductions in `website`:
  - `vendor.js`: 165 KB → 93 KB (43.6% reduction).
  - `app.js`: 130 KB → 105 KB (19.2% reduction).
  - Total: 295 KB → 198 KB (97 KB saved, 32.9% reduction).
- Verified `npm run check` and `npm run test:e2e` (all 114 tests) 100% passing in `website`.
