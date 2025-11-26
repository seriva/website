import { css } from "../utils/reactive.js";

export const blogPostStyles = css`
/* Giscus Comments */
.giscus-container {
	max-width: 900px;
	margin: 3rem auto;
	padding: 2rem 1rem;
	border-top: 2px solid var(--border-color);
}

/* Giscus widget styling overrides */
.giscus-container iframe {
	color-scheme: dark;
}

@media (max-width: 767px) {
	.giscus-container {
		margin: 2rem auto;
		padding: 1.5rem 0.5rem;
	}
}
`;
