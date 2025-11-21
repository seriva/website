import { css } from "../core/reactive.js";

export const resetStyles = css`
/* Reset & Base Styles */

html {
	height: 100%;
	overflow-x: hidden;
	overflow-y: scroll;
	scroll-behavior: smooth;
}

/* Ensure scrollbar space is always reserved */
html::after {
	content: "";
	display: block;
	height: 101vh;
	width: 1px;
	position: absolute;
	top: 0;
	left: -1px;
	pointer-events: none;
	visibility: hidden;
}

*,
*::before,
*::after {
	box-sizing: border-box;
}

/* Smooth theme transitions - optimized to target elements that actually change */
html,
body,
main,
header,
footer,
nav,
section,
article,
div,
span,
p,
h1,
h2,
h3,
h4,
h5,
h6,
a,
button,
input,
textarea,
select,
label,
svg,
path,
code,
pre,
blockquote,
table,
th,
td,
img,
mark,
.navbar,
.nav-link,
.dropdown,
.dropdown-item,
.blog-post-card,
.search-result-item,
.copy-code-button,
.theme-toggle,
.clickable-tag {
	transition: background-color var(--theme-transition-duration) var(--theme-transition-timing),
		color var(--theme-transition-duration) var(--theme-transition-timing),
		border-color var(--theme-transition-duration) var(--theme-transition-timing),
		fill var(--theme-transition-duration) var(--theme-transition-timing),
		stroke var(--theme-transition-duration) var(--theme-transition-timing);
}

/* Preserve existing transitions for interactive elements */
a,
button,
input,
textarea,
select,
.nav-link,
.dropdown-item {
	transition: background-color var(--transition-fast),
		color var(--transition-fast),
		border-color var(--transition-fast),
		opacity var(--transition-fast),
		transform var(--transition-fast);
}

body {
	min-height: 100vh;
	margin: 0;
	padding-top: 56px;
	display: flex;
	text-align: center;
	flex-direction: column;
	font-family: var(--font-family-primary);
	font-size: var(--font-size-base);
	background-color: var(--background-color);
	color: var(--font-color);
	line-height: var(--line-height-base);
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-rendering: optimizeLegibility;
	overflow-x: hidden;
	width: 100%;
	/* Prevent FOUC - hide body until app is ready */
	opacity: 0;
	transition: opacity 0.2s ease-in-out;
}

body.app-ready {
	opacity: 1;
}

main {
	margin: auto;
	padding: var(--spacing-lg);
	flex: 1 0 auto;
	max-width: 750px;
	width: 100%;
	animation: fadeIn 0.2s ease-in-out;
}

main:focus {
	outline: none;
}

/* Page transition animations */
@keyframes fadeIn {
	from {
		opacity: 0;
		transform: translateY(10px);
	}

	to {
		opacity: 1;
		transform: translateY(0);
	}
}

main.page-transition-out {
	animation: fadeOut 0.2s ease-in-out forwards;
}

@keyframes fadeOut {
	from {
		opacity: 1;
		transform: translateY(0);
	}

	to {
		opacity: 0;
		transform: translateY(-10px);
	}
}

img {
	max-width: 100%;
	opacity: 0;
	animation: imageLoad 0.3s ease-in-out forwards;
}

/* Typography & Links */

a {
	color: var(--accent);
	transition: color var(--transition-fast);
}

a.icon:hover {
	text-decoration: none;
}
`;
