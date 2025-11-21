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

/* Icons - Font Awesome Subset */
/* Only includes the icons used in this project */

@font-face {
	font-family: "Font Awesome 6 Free";
	font-style: normal;
	font-weight: 900;
	font-display: block;
	src: url("/fonts/fa-solid-900.woff2") format("woff2");
}

@font-face {
	font-family: "Font Awesome 6 Brands";
	font-style: normal;
	font-weight: 400;
	font-display: block;
	src: url("/fonts/fa-brands-400.woff2") format("woff2");
}

.fas,
.fab {
	display: inline-block;
	font-style: normal;
	font-variant: normal;
	line-height: 1;
	transition: transform var(--transition-fast);
}

.fas:hover,
.fab:hover {
	transform: rotate(5deg) scale(1.1);
}

.fas {
	font-family: "Font Awesome 6 Free", sans-serif;
	font-weight: 900;
}

.fab {
	font-family: "Font Awesome 6 Brands", sans-serif;
	font-weight: 400;
}

.fab {
	font-family: "Font Awesome 6 Brands", sans-serif;
	font-weight: 400;
}

/* Solid Icons (fas) */
.fa-expand::before {
	content: "\\f065";
}

.fa-times::before {
	content: "\\f00d";
}

.fa-search::before {
	content: "\\f002";
}

.fa-arrow-left::before {
	content: "\\f060";
}

.fa-envelope::before {
	content: "\\f0e0";
}

.fa-download::before {
	content: "\\f019";
}

.fa-cube::before {
	content: "\\f1b2";
}

.fa-external-link-alt::before {
	content: "\\f35d";
}

.fa-calendar::before {
	content: "\\f133";
}

.fa-sun::before {
	content: "\\f185";
}

.fa-moon::before {
	content: "\\f186";
}

/* Brand Icons (fab) */
.fa-github::before {
	content: "\\f09b";
}

.fa-youtube::before {
	content: "\\f167";
}

.fa-linkedin::before {
	content: "\\f08c";
}
`;
