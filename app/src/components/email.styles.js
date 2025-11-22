import { css } from "../core/reactive.js";

const modalStyles = /* css */ `
	display: none;
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	background-color: rgba(0, 0, 0, 0.8);
	z-index: 10000;
	overflow-y: auto;
	padding: 2rem 1rem;

	&.show {
		display: flex;
		align-items: center;
		justify-content: center;
	}

	&.closing {
		animation: fadeOut 0.2s ease-in-out forwards;
	}

	.contact-modal-content {
		background-color: var(--background-color);
		border: 2px solid var(--border-color);
		border-radius: 8px;
		padding: 1.5rem;
		max-width: 450px;
		width: 100%;
		position: relative;
		box-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);
		opacity: 0;
		transform: scale(0.95);
		animation: scaleFadeIn 0.25s ease-out forwards;
	}

	.contact-modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: 1rem;
	}

	.contact-modal-header h2 {
		margin: 0;
		color: var(--accent);
		font-size: 1.25rem;
	}

	.contact-modal-close {
		background: none;
		border: none;
		color: var(--text-light);
		font-size: 1.5rem;
		cursor: pointer;
		padding: 0;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
		border-radius: 4px;
		transition: all 0.2s ease;
	}

	.contact-modal-close:hover {
		background-color: var(--hover-color);
		color: var(--font-color);
	}
`;

const formStyles = /* css */ `
	.contact-form .form-group {
		margin-bottom: 0.75rem;
	}

	.contact-form .form-group:last-of-type {
		margin-bottom: 0.05rem;
	}

	.contact-form label {
		display: block;
		margin-bottom: 0.25rem;
		color: var(--font-color);
		font-weight: 600;
		font-size: 0.9rem;
		text-align: left;
	}

	.contact-form input,
	.contact-form textarea {
		width: 100%;
		padding: 0.6rem;
		background-color: var(--hover-color);
		border: 1px solid var(--border-color);
		border-radius: 4px;
		color: var(--font-color);
		font-family: inherit;
		font-size: 0.95rem;
		transition: border-color 0.2s ease;
	}

	.contact-form input:focus,
	.contact-form textarea:focus {
		outline: none;
		border-color: var(--accent);
	}

	.contact-form input.error,
	.contact-form textarea.error {
		border-color: #ef4444;
	}

	.contact-form textarea {
		resize: vertical;
		min-height: 100px;
	}

	.form-status {
		padding: 0.6rem;
		border-radius: 4px;
		margin-bottom: 0.25rem;
		text-align: center;
		font-size: 0.9rem;
		display: none;
	}

	.form-status.success,
	.form-status.error {
		display: block;
	}

	.form-status.success {
		background-color: rgba(16, 185, 129, 0.1);
		border: 1px solid var(--accent);
		color: var(--accent);
	}

	.form-status.error {
		background-color: rgba(239, 68, 68, 0.1);
		border: 1px solid #ef4444;
		color: #ef4444;
	}
`;

const buttonStyles = /* css */ `
	.contact-form .btn {
		width: 100%;
		padding: 12px 24px;
		margin-top: 0.75rem;
		background-color: var(--hover-color);
		border: 2px solid var(--accent);
		border-radius: 8px;
		color: var(--font-color);
		font-weight: 600;
		font-size: 1em;
		cursor: pointer;
		transition: all var(--transition-normal);
	}

	.contact-form .btn:hover:not(:disabled) {
		background-color: var(--hover-color);
		border-color: var(--accent);
		color: var(--accent);
		transform: translateY(-2px);
		box-shadow: 0 4px 12px rgba(66, 155, 238, 0.3);
	}

	.contact-form .btn:active:not(:disabled) {
		transform: translateY(0) scale(0.95);
	}

	.contact-form .btn:focus {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.contact-form .btn:disabled {
		opacity: 0.5;
		cursor: not-allowed;
		transform: none;
	}
`;

const mobileStyles = /* css */ `
	@media (max-width: 767px) {
		padding: 1rem 0.5rem;

		.contact-modal-content {
			padding: 1.25rem;
		}

		.contact-modal-header {
			margin-bottom: 0.75rem;
		}

		.contact-modal-header h2 {
			font-size: 1.1rem;
		}

		.contact-form .form-group {
			margin-bottom: 0.85rem;
		}
	}
`;

const animationStyles = /* css */ `
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

	@keyframes fadeOut {
		from {
			opacity: 1;
		}

		to {
			opacity: 0;
		}
	}
`;

export const contactFormStyles = css`
	${modalStyles}
	${formStyles}
	${buttonStyles}
	${mobileStyles}
	${animationStyles}
`;
