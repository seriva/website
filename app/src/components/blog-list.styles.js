import { css } from "../utils/reactive.js";

const layoutStyles = /* css */ `
	.blog-container {
		max-width: 900px;
		margin: 0 auto;
		text-align: left;
	}

	.blog-page-title {
		color: var(--accent);
		font-size: 2em;
		margin-bottom: 1.5rem;
		text-align: center;
	}

	.blog-empty {
		text-align: center;
		color: var(--text-light);
		font-size: 1.1em;
		padding: 2rem 0;
	}

	.blog-posts {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		margin-bottom: 2rem;
	}
`;

const cardStyles = /* css */ `
	.blog-post-card {
		padding: 1.5rem;
		background-color: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius-large);
		transition: all var(--transition-normal);
		cursor: pointer;
	}

	.blog-post-card:hover {
		background-color: rgba(255, 255, 255, 0.05);
		border-color: var(--accent);
		transform: translateY(-4px) scale(1.01);
		box-shadow: 0 8px 25px rgba(66, 155, 238, 0.15);
	}

	.blog-post-title {
		margin: 0 0 0.35rem 0;
		font-size: 1.35em;
		font-weight: bold;
		line-height: 1.3;
	}

	.blog-post-title a {
		color: var(--accent);
		text-decoration: none;
		transition: color var(--transition-fast);
	}

	.blog-post-title a:hover {
		color: var(--text);
	}

	.blog-post-meta {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 0.75rem;
		margin-bottom: 0.75rem;
		font-size: 1em;
		color: var(--text-light);
	}

	.blog-post-date {
		display: flex;
		align-items: center;
		gap: 0.4rem;
	}

	.blog-post-tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
	}

	.blog-post-excerpt {
		color: var(--text-light);
		line-height: 1.5;
		margin-bottom: 0;
		font-size: 1.05em;
	}

	.blog-post-card mark {
		background-color: var(--accent);
		color: var(--background-color);
		padding: 1px 3px;
		border-radius: 2px;
		font-weight: bold;
	}
`;

const paginationStyles = /* css */ `
	.blog-pagination {
		margin: 2rem 0;
		display: flex;
		justify-content: center;
	}

	.blog-pagination .pagination {
		display: flex;
		gap: 0.5rem;
		list-style: none;
		padding: 0;
		margin: 0;
	}

	.blog-pagination .page-item {
		display: flex;
	}

	.blog-pagination .page-link {
		padding: 0.5rem 0.75rem;
		background-color: rgba(255, 255, 255, 0.02);
		border: 1px solid var(--border-color);
		border-radius: var(--border-radius);
		color: var(--font-color);
		text-decoration: none;
		transition: all var(--transition-fast);
		cursor: pointer;
		min-width: 40px;
		text-align: center;
	}

	.blog-pagination .page-link:hover {
		background-color: var(--hover-color);
		border-color: var(--accent);
		color: var(--accent);
	}

	.blog-pagination .page-item.active .page-link {
		background-color: var(--accent);
		border-color: var(--accent);
		color: var(--background-color);
		font-weight: bold;
	}

	.blog-pagination .page-item.disabled .page-link {
		opacity: 0.5;
		cursor: not-allowed;
		pointer-events: none;
	}
`;

const mobileStyles = /* css */ `
	/* Mobile */
	@media (max-width: 767px) {
		.blog-post-card {
			padding: 1rem;
			margin: 0.25rem;
			text-align: center;
		}

		.blog-posts {
			gap: 0.5rem;
		}

		.blog-post-title {
			font-size: 1.25em;
		}

		.blog-post-meta {
			flex-direction: column;
			align-items: center;
			gap: 0.5rem;
			font-size: 0.95em;
			justify-content: center;
		}

		.blog-post-excerpt {
			font-size: 1em;
		}

		.blog-pagination .page-link {
			padding: 0.4rem 0.6rem;
			font-size: 0.9em;
			min-width: 35px;
		}
	}
`;

export const blogListStyles = css`
	${layoutStyles}
	${cardStyles}
	${paginationStyles}
	${mobileStyles}
`;
