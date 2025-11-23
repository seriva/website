import { css } from "../core/reactive.js";

export const fontStyles = css`
/* Fonts - Optimized with system font fallbacks */
@font-face {
	font-family: Raleway;
	font-style: normal;
	font-weight: 400;
	font-display: swap;
	src: url("/fonts/raleway-latin-400-normal.woff2") format("woff2");
}

@font-face {
	font-family: Raleway;
	font-style: normal;
	font-weight: 600;
	font-display: swap;
	src: url("/fonts/raleway-latin-600-normal.woff2") format("woff2");
}

@font-face {
	font-family: Raleway;
	font-style: normal;
	font-weight: 700;
	font-display: swap;
	src: url("/fonts/raleway-latin-700-normal.woff2") format("woff2");
}

/* Icon styles for inline SVG */
.icon {
	display: inline-block;
	vertical-align: middle;
	transition: transform var(--transition-fast);
}

/* Default icon hover (for non-navbar icons) */
.icon:hover {
	transform: rotate(5deg) scale(1.1);
}
`;
