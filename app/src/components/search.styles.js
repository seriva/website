import { css } from "../utils/reactive.js";

const pageStyles = /* css */ `
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background-color: var(--background-color);
	z-index: 2000;
	flex-direction: column;
	overflow: hidden;
	opacity: 0;
	transform: scale(0.95);
	animation: scaleFadeIn 0.25s ease-out forwards;

	&.show {
		display: flex;
	}

	&.closing {
		animation: scaleFadeOut 0.2s ease-in forwards;
	}
`;

const headerStyles = /* css */ `
	.search-page-header {
		display: flex;
		align-items: center;
		justify-content: center;
		height: 56px;
		padding: 0 1rem;
		background-color: var(--header-color);
		border-bottom: var(--border-width) solid var(--accent);
		animation: slideDown var(--transition-normal) ease-out;
	}

	.search-page-header-content {
		display: flex;
		align-items: center;
		gap: 0.75rem;
		width: 100%;
		max-width: 750px;
	}

	.search-page-back {
		background: none;
		border: none;
		color: var(--font-color);
		cursor: pointer;
		padding: 0.5rem;
		display: flex;
		align-items: center;
		justify-content: center;
		font-size: 1.2em;
		transition: color var(--transition-fast);
	}

	.search-page-back:hover {
		color: var(--accent);
	}
`;

const inputStyles = /* css */ `
	.search-page-input-wrapper {
		flex: 1;
		position: relative;
		display: flex;
		align-items: center;
	}

	.search-page-input {
		width: 100%;
		padding: 0.5rem 2.5rem 0.5rem 1rem;
		background-color: var(--hover-color);
		border: 1px solid var(--border-color);
		border-radius: 20px;
		color: var(--font-color);
		font-size: 1em;
	}

	/* Hide native browser clear button (X) for search inputs */
	.search-page-input::-webkit-search-cancel-button {
		-webkit-appearance: none;
		appearance: none;
	}

	.search-page-input:focus {
		outline: none;
		border-color: var(--accent);
		background-color: var(--background-color);
		transform: scale(1.02);
		box-shadow: 0 0 0 3px rgba(66, 155, 238, 0.1);
		transition: all var(--transition-fast);
	}

	.search-page-clear {
		position: absolute;
		right: 0.5rem;
		background: none;
		border: none;
		color: var(--text-light);
		cursor: pointer;
		padding: 0.25rem 0.5rem;
		display: none;
		transition: color var(--transition-fast);
	}

	.search-page-clear:hover {
		color: var(--accent);
	}

	.search-page-input:not(:placeholder-shown) ~ .search-page-clear {
		display: block;
	}
`;

const resultsStyles = /* css */ `
	.search-page-content {
		flex: 1;
		overflow-y: auto;
		padding: 1rem;
		display: flex;
		justify-content: center;
		animation: fadeIn 0.4s ease-out 0.1s both;
	}

	.search-page-results {
		display: flex;
		flex-direction: column;
		gap: 1.5rem;
		width: 100%;
		max-width: 750px;
		text-align: left;
	}

	.search-no-results {
		padding: var(--spacing-xl);
		text-align: center;
		color: var(--text-light);
	}

	.search-no-results i {
		font-size: 2em;
		margin-bottom: var(--spacing-md);
		opacity: 0.5;
		display: block;
	}

	.search-no-results p {
		margin: 0;
		font-size: 0.9em;
	}

	.search-result-item mark {
		background-color: var(--accent);
		color: var(--background-color);
		padding: 1px 3px;
		border-radius: 2px;
		font-weight: bold;
	}
`;

const animationStyles = /* css */ `
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

	@keyframes scaleFadeIn {
		from {
			opacity: 0;
			transform: scale(0.95);
		}

		to {
			opacity: 1;
			transform: scale(1);
		}
	}

	@keyframes scaleFadeOut {
		from {
			opacity: 1;
			transform: scale(1);
		}

		to {
			opacity: 0;
			transform: scale(0.95);
		}
	}

	@keyframes slideDown {
		from {
			transform: translateY(-100%);
			opacity: 0;
		}

		to {
			transform: translateY(0);
			opacity: 1;
		}
	}
`;

export const searchStyles = css`
	${pageStyles}
	${headerStyles}
	${inputStyles}
	${resultsStyles}
	${animationStyles}
`;
