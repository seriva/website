import { css } from "../core/reactive.js";

export const sharedStyles = css`
/* Components */

/* Tags */
.item-tag {
	background-color: var(--hover-color);
	color: var(--accent);
	padding: var(--spacing-xs) var(--spacing-sm);
	border-radius: var(--border-radius);
	font-size: var(--font-size-sm);
	display: inline-block;
	margin: 2px;
}

.clickable-tag {
	cursor: pointer;
	transition: transform var(--transition-fast), box-shadow var(--transition-fast);
}

.clickable-tag:hover {
	background-color: var(--accent);
	color: var(--background-color);
	transform: translateY(-1px);
	box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
}

/* About Page */
.about-pic {
	width: 15vh;
	height: 15vh;
	border-radius: 50%;
	margin-bottom: 20px;
	object-fit: cover;
	transition: transform var(--transition-normal);
}

.about-pic:hover {
	transform: scale(1.05);
}

@keyframes imageLoad {
	from {
		opacity: 0;
		transform: scale(0.95);
	}

	to {
		opacity: 1;
		transform: scale(1);
	}
}

/* Shared Loading & Error styles (used by Templates) */
.loading-spinner {
	text-align: center;
	padding: 2rem;
	color: var(--accent);
	font-size: 1.2em;
	animation: pulse 1.5s ease-in-out infinite;
}

@keyframes pulse {

	0%,
	100% {
		opacity: 1;
	}

	50% {
		opacity: 0.5;
	}
}

.error-message {
	text-align: center;
	padding: 2rem;
	max-width: 600px;
	margin: 0 auto;
}

.error-message h1 {
	color: #ff6b6b;
	margin-bottom: 1rem;
	font-size: 2em;
}

.error-message p {
	color: var(--text-light);
	font-size: 1.1em;
}

/* Accessibility */
button:focus,
a:focus,
input:focus,
select:focus,
textarea:focus {
	outline: 2px solid var(--accent);
	outline-offset: 2px;
}

*:focus:not(:focus-visible) {
	outline: none;
}

@media (prefers-reduced-motion: reduce) {

	*,
	*::before,
	*::after {
		animation-duration: 0.01ms;
		animation-iteration-count: 1;
		transition-duration: 0.01ms;
		scroll-behavior: auto;
	}
}

@media (prefers-contrast: high) {
	:root {
		--border-width: 3px;
		--accent: #66d9ff;
	}
}
`;
