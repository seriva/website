import { css } from "../utils/reactive.js";

export const markdownStyles = css`
/* Markdown body overrides for download buttons */
.markdown-body .download-btn,
.markdown-body .download-btn:link,
.markdown-body .download-btn:visited {
	display: inline-flex;
	align-items: center;
	justify-content: center;
	text-decoration: none;
	color: var(--font-color);
}

.markdown-body .download-btn:hover,
.markdown-body .download-btn:focus {
	color: var(--accent);
}

/* Code */
code {
	padding: 2px 6px;
	font-size: 0.9em;
	border-radius: 6px;
	font-family: var(--font-family-mono);
}

pre {
	padding: 12px;
	margin: 16px 0;
	border-radius: 6px;
	font-family: var(--font-family-mono);
	font-size: 14px;
	line-height: 1.4;
	overflow-x: auto;
	white-space: pre-wrap;
}

pre code {
	background: transparent;
	padding: 0;
}

zero-md {
	display: block;
	text-align: left;
	width: 100%;
	background-color: var(--background-color);
}

zero-md pre code:not([class*="language-"]) {
	background-color: transparent;
	padding: 0;
	font-size: 0.85em;
	display: block;
	color: var(--text-light);
}

/* Markdown */

.markdown-body {
	font-family: var(--font-family-primary);
	font-size: 1em;
	line-height: 1.6;
	color: var(--text-light);
	text-align: left;
}

.markdown-body h1,
.markdown-body h2,
.markdown-body h3,
.markdown-body h4,
.markdown-body h5,
.markdown-body h6 {
	color: var(--font-color);
	margin: 1em 0 0.5em;
	font-weight: bold;
	line-height: 1.25;
}

.markdown-body h1 {
	font-size: 1.8em;
	margin-top: 0;
}

.markdown-body h2 {
	font-size: 1.4em;
}

.markdown-body h3 {
	font-size: 1.2em;
}

.markdown-body h4 {
	font-size: 1.1em;
}

.markdown-body p,
.markdown-body li {
	margin: 0.5em 0;
	line-height: 1.6;
	font-size: 1.1em;
	color: var(--text-light);
}

.markdown-body ul,
.markdown-body ol {
	margin: 0.5em 0;
	padding-left: 2em;
}

.markdown-body li {
	margin: 0.25em 0;
}

.markdown-body code:not([class*="language-"]) {
	background-color: var(--hover-color);
	color: var(--font-color);
	padding: 2px 6px;
	border-radius: 3px;
	font-family: var(--font-family-mono);
	font-size: 0.9em;
}

.markdown-body pre:not([class*="language-"]) {
	background-color: var(--hover-color);
	padding: 0.5em;
	border-radius: 3px;
	overflow-x: auto;
	margin: 0.5em 0;
	border: 1px solid var(--border-color);
	font-family: var(--font-family-mono);
	line-height: 1.4;
}

.markdown-body pre code:not([class*="language-"]) {
	background-color: transparent;
	padding: 0;
	font-size: 0.85em;
	display: block;
	color: var(--text-light);
}

.markdown-body pre[class*="language-"] {
	margin: 0.5em 0;
	overflow-x: auto;
	font-family: var(--font-family-mono);
	line-height: 1.4;
	position: relative;
}

/* Copy Code Button */
.code-block-wrapper {
	position: relative;
	margin: 0.5em 0;
}

.copy-code-button {
	position: absolute;
	top: 0.5em;
	right: 0.5em;
	padding: 0.4em 0.8em;
	font-size: 0.85em;
	font-family: var(--font-family-primary);
	font-weight: 700;
	background-color: var(--hover-color);
	color: var(--font-color);
	border: 1px solid var(--border-color);
	border-radius: var(--border-radius);
	cursor: pointer;
	opacity: 0;
	transition: opacity var(--transition-fast), background-color var(--transition-fast);
	z-index: 10;
}

.code-block-wrapper:hover .copy-code-button,
.markdown-body pre[class*="language-"]:hover .copy-code-button {
	opacity: 1;
}

.copy-code-button:hover {
	background-color: var(--accent);
	color: var(--background-color);
}

.copy-code-button:active {
	transform: scale(0.95);
}

.copy-code-button.copied {
	background-color: #10b981;
	color: white;
	opacity: 1;
}

.markdown-body pre code.hljs {
	font-family: inherit;
	padding: 1em;
	display: block;
	border-radius: 3px;
}

.markdown-body pre:has(> code.hljs) {
	padding: 0;
	background-color: transparent;
	border: none;
	overflow: hidden;
}

.markdown-body a {
	color: var(--accent);
	text-decoration: none;
	display: inline-block;
	transition: transform var(--transition-fast);
}

.markdown-body a:hover {
	text-decoration: none;
	transform: translateY(-2px);
}

.markdown-body blockquote {
	border-left: 4px solid var(--accent);
	padding-left: 1em;
	margin: 0.5em 0;
	font-style: italic;
}

.markdown-body table {
	width: 100%;
	border-collapse: collapse;
	margin: 0.5em 0;
}

.markdown-body th,
.markdown-body td {
	border: 1px solid var(--border-color);
	padding: 0.5em 1em;
	text-align: left;
}

.markdown-body th {
	background-color: var(--hover-color);
	color: var(--accent);
	font-weight: bold;
}

.markdown-body hr {
	border: none;
	border-top: 1px solid var(--border-color);
	margin: 0.5em 0;
}
`;
