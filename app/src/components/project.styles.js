import { css } from "../utils/reactive.js";

const headerStyles = /* css */ `
	.project-title {
		color: var(--accent);
		font-size: 1.5em;
		margin: 0 0 0.02em 0;
		font-weight: bold;
	}

	.project-description {
		margin: 0 0 0.5em 0;
		color: var(--text-light);
		font-size: 1.2em;
		line-height: 1.6;
	}

	.project-tags {
		margin: 0.8em 0;
		font-size: 1.1em;
	}
`;

const mediaStyles = /* css */ `
	.youtube-video {
		margin: 20px 0;
	}

	.iframeWrapper {
		position: relative;
		padding-bottom: 56.25%;
		padding-top: 25px;
		height: 0;
	}

	.iframeWrapper iframe {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		max-width: 100%;
	}
`;

const downloadButtonStyles = /* css */ `
	.download-buttons {
		display: flex;
		flex-wrap: wrap;
		gap: 15px;
		margin: 1.5em 0;
		justify-content: flex-start;
	}

	.download-btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 8px;
		padding: 12px 24px;
		background-color: var(--hover-color);
		border: 2px solid var(--accent);
		border-radius: 8px;
		color: var(--font-color);
		text-decoration: none;
		font: 600 1em var(--font-family-primary);
		transition: all var(--transition-normal);
		cursor: pointer;
		appearance: none;
	}

	.download-btn i {
		font-size: 1.5em;
		transition: transform var(--transition-normal), color var(--transition-normal);
	}

	.download-btn span {
		transition: color var(--transition-normal);
	}

	.download-btn:link,
	.download-btn:visited {
		text-decoration: none;
	}

	.download-btn:hover,
	.download-btn:focus {
		background-color: var(--hover-color);
		border-color: var(--accent);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(66, 155, 238, 0.3);
		color: var(--accent);
		text-decoration: none;
	}

	.download-btn:active {
		transform: translateY(0) scale(0.95);
		text-decoration: none;
	}

	.download-btn:focus {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.download-btn:hover i {
		transform: scale(1.1);
		color: var(--accent);
	}

	.download-btn:hover span,
	.download-btn:focus span {
		color: var(--accent);
	}

	.download-btn:focus:not(:focus-visible) {
		background-color: var(--hover-color);
		border-color: var(--border-color);
		transform: none;
		box-shadow: none;
	}
`;

export const projectStyles = css`
	${headerStyles}
	${mediaStyles}
	${downloadButtonStyles}
`;
