import { css } from "../core/reactive.js";

export const themeStyles = css`
/* CSS Custom Properties */

:root {
	--accent: #429bee;
	--background-color: #292f33;
	--header-color: #1f2429;
	--hover-color: #2a3a4a;
	--border-color: #3a4a5a;
	--font-color: #ffffff;
	--text-light: #cccccc;
	--error-color: #ff6b6b;
	--border-width: 2px;
	--border-radius: 4px;
	--border-radius-large: 8px;
	--spacing-xs: 4px;
	--spacing-sm: 8px;
	--spacing-md: 15px;
	--spacing-lg: 24px;
	--spacing-xl: 2rem;
	--font-family-primary: Raleway, -apple-system, BlinkMacSystemFont, "Segoe UI",
		Roboto, "Helvetica Neue", Arial, sans-serif;
	--font-family-mono: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
	--font-size-base: 16px;
	--font-size-sm: 0.9em;
	--font-size-lg: 1.1em;

	/* Theme transition */
	--theme-transition-duration: 0.3s;
	--theme-transition-timing: ease-in-out;
	--line-height-base: 1.6;
	--transition-fast: 0.2s ease;
	--transition-normal: 0.3s ease;
	--z-navbar: 1030;
	--z-dropdown: 1000;
}
`;
