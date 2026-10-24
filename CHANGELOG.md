# Changelog

All notable changes to this project will be documented here.

Format: [Keep a Changelog](https://keepachangelog.com/en/1.0.0/)
Versioning: [Semantic Versioning](https://semver.org/spec/v2.0.0.html)

## [Unreleased]

### Changed

- Migrated component styles from global stylesheets to scoped template styles.
- Streamlined project layout and build pipeline to follow standard GoFront conventions.
- Updated project dependencies and upgraded GoFront to `^1.6.0`.

## [2026-09]

### Added

- Accessibility features including a skip-to-content link, screen-reader route announcements, and keyboard navigation in search.
- Dedicated 404 page for missing or invalid URLs.
- Mermaid diagram rendering in blog posts and documentation, styled to match the active theme.
- Collapsible table of contents and previous/next navigation links for blog posts and project pages.
- Global keyboard shortcuts (`Ctrl+K`, `Cmd+K`, and `/`) to quickly open site search.
- Syntax highlighting for `.templ` code blocks.
- Showcase entry and blog post for the Bootstrap project.
- Initial release.

### Changed

- Accelerated initial page load and eliminated route-change flickering on direct deep links.
- Reduced JavaScript bundle size by over 30% through code minification and on-demand script loading.
- Modernized styling with glassmorphic accents, stable scrollbar gutters, and reduced-motion support.
- Streamlined static production builds into a clean single-entry SPA.

### Fixed

- Fixed stale content and view flickers caused by race conditions during rapid page transitions.
- Fixed layout shifts and scrollbar disappearance when opening the contact modal.
- Fixed keyboard tab navigation order on blog post cards.
