import { css } from "./reactive.js";

const baseStyles = `
	background-color: var(--header-color);
	border-bottom: var(--border-width) solid var(--accent);
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	z-index: var(--z-navbar);
	font-family: var(--font-family-primary);

	.navbar-inner {
		max-width: 1000px;
		margin-inline: auto;
		padding: 0 15px;
		display: flex;
		align-items: center;
		justify-content: space-between;
	}

	.navbar-brand {
		color: var(--font-color);
		font-weight: bold;
		text-decoration: none;
		font-size: 1.25em;
		display: none;
		padding: 11px 0;
	}

	.navbar-collapse {
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}

	.navbar-nav {
		display: flex;
		list-style: none;
		margin: 0;
		padding: 0;
		align-items: stretch;
	}

	.navbar-nav.left {
		margin-right: auto;
	}

	.navbar-nav.right {
		margin-left: auto;
	}

	.nav-item {
		position: relative;
		display: flex;
		align-items: stretch;
	}

	button.nav-link {
		background: none;
		border: none;
		cursor: pointer;
		font-family: inherit;
		font-size: inherit;
		width: auto;
		transition: transform 0.1s ease, background-color var(--transition-fast), color var(--transition-fast);
	}

	button.nav-link:active {
		transform: scale(0.95);
	}

	.nav-link {
		display: flex;
		align-items: center;
		padding: 11px 20px;
		color: var(--font-color);
		text-decoration: none;
		line-height: 1.2;
		font-size: 1.25em;
		font-weight: 700;
		transition: background-color var(--transition-fast),
					color var(--transition-fast),
					border-color var(--transition-fast),
					opacity var(--transition-fast),
					transform var(--transition-fast);
	}

	.navbar-menu .nav-link,
	.navbar-icon .nav-link {
		font-size: 1.35rem;
	}

	.navbar-menu .nav-link {
		font-weight: 700;
	}

	.nav-link:hover,
	.nav-link:focus,
	.nav-link:active {
		color: var(--accent);
		background-color: var(--hover-color);
	}

	.nav-link.active {
		color: var(--accent);
		background-color: var(--hover-color);
	}

	.nav-link:focus:not(.active) {
		outline: 2px solid var(--accent);
		outline-offset: -2px;
	}

	.nav-link:focus:not(:focus-visible):not(.active) {
		background-color: transparent;
		color: var(--font-color);
		outline: none;
	}

	.nav-link.active:focus {
		outline: none;
	}

	/* Search */
	.search-nav-item {
		position: relative;
		display: flex;
		align-items: center;
	}

	@media (min-width: 768px) {
		.navbar-inner {
			padding-left: 20px;
			padding-right: 20px;
		}
	}
`;

const mobileToggleStyles = `
	.navbar-toggle {
		display: none;
		background: transparent;
		border: none;
		color: var(--font-color);
		font-size: 1.5em;
		cursor: pointer;
		padding: 11px 0.5rem;
		transition: transform var(--transition-fast);
	}

	.navbar-toggle:focus {
		outline: 2px solid var(--accent);
		outline-offset: 2px;
	}

	.navbar-toggle:focus:not(:focus-visible) {
		outline: none;
	}

	.navbar-toggle:active {
		transform: scale(0.9);
	}

	.navbar-toggle-icon {
		display: block;
		width: 24px;
		height: 2px;
		background-color: currentColor;
		position: relative;
		transition: background-color var(--transition-normal);
	}

	.navbar-toggle-icon::before,
	.navbar-toggle-icon::after {
		content: "";
		display: block;
		width: 24px;
		height: 2px;
		background-color: currentColor;
		position: absolute;
		left: 0;
		transition: all var(--transition-normal);
	}

	.navbar-toggle-icon::before {
		top: -8px;
	}

	.navbar-toggle-icon::after {
		bottom: -8px;
	}

	.navbar-toggle.active .navbar-toggle-icon {
		background-color: transparent;
	}

	.navbar-toggle.active .navbar-toggle-icon::before {
		transform: rotate(45deg);
		top: 0;
	}

	.navbar-toggle.active .navbar-toggle-icon::after {
		transform: rotate(-45deg);
		bottom: 0;
	}
`;

const dropdownStyles = `
	.dropdown {
		position: relative;
	}

	.dropdown-toggle {
		display: flex;
		align-items: center;
		gap: 0.3rem;
	}

	.dropdown-toggle::after {
		content: "\\f107";
		font-family: "Font Awesome 6 Free", sans-serif;
		font-weight: 900;
		font-size: 0.8em;
		transition: transform var(--transition-fast);
		transform-origin: center;
	}

	.dropdown.show .dropdown-toggle::after {
		transform: rotate(180deg);
	}

	.dropdown-menu {
		position: absolute;
		top: 100%;
		left: 0;
		min-width: 200px;
		background-color: var(--header-color);
		border: var(--border-width) solid var(--accent);
		padding: 0;
		margin: 0;
		list-style: none;
		z-index: var(--z-dropdown);
		box-shadow: 0 6px 12px rgba(66, 155, 238, 0.2);
		opacity: 0;
		visibility: hidden;
		transform: translateY(-5px);
		transition: all 0.2s ease;
	}

	.dropdown.show .dropdown-menu {
		opacity: 1;
		visibility: visible;
		transform: translateY(0);
	}

	.dropdown-item {
		display: block;
		padding: 10px 20px;
		color: var(--font-color);
		text-decoration: none;
		font-size: 16px;
		font-weight: bold;
		background-color: var(--header-color);
		transition: all var(--transition-fast);
		border: none;
		width: 100%;
		text-align: left;
		white-space: nowrap;
	}

	.dropdown-item:hover,
	.dropdown-item:focus,
	.dropdown-item:active,
	.dropdown-item.active {
		background-color: var(--hover-color);
		color: var(--accent);
	}

	.dropdown-item.active:focus {
		outline: none;
	}
`;

const themeToggleStyles = `
	/* Theme Toggle Button */
	.theme-toggle {
		background: none;
		border: none;
		color: var(--font-color);
		cursor: pointer;
		padding: 11px 20px;
		display: flex;
		align-items: center;
		font-size: 1.35rem;
		transition: color var(--transition-fast), transform var(--transition-fast);
	}

	.theme-toggle:hover {
		color: var(--accent);
		transform: scale(1.1);
	}

	.theme-toggle:active {
		transform: scale(0.95);
	}

	.theme-toggle i {
		transition: opacity var(--theme-transition-duration) var(--theme-transition-timing),
					transform var(--theme-transition-duration) var(--theme-transition-timing);
	}

	/* Show/hide icons based on theme with fade */
	:root[data-theme="dark"] & .theme-toggle .fa-sun {
		display: inline;
		opacity: 1;
	}

	:root[data-theme="dark"] & .theme-toggle .fa-moon {
		display: none;
		opacity: 0;
	}

	:root[data-theme="light"] & .theme-toggle .fa-sun {
		display: none;
		opacity: 0;
	}

	:root[data-theme="light"] & .theme-toggle .fa-moon {
		display: inline;
		opacity: 1;
	}
`;

const mobileLayoutStyles = `
	/* Mobile */
	@media (max-width: 767px) {
		.search-nav-item {
			display: flex;
		}

		.navbar-brand {
			display: block;
		}

		.navbar-toggle {
			display: block;
		}

		.navbar-collapse {
			position: absolute;
			top: 100%;
			left: 0;
			right: 0;
			background-color: var(--header-color);
			border-bottom: var(--border-width) solid var(--accent);
			flex-direction: column;
			align-items: stretch;
			max-height: 0;
			overflow: hidden;
			transition: max-height 0.25s ease-in;
		}

		.navbar-collapse.show {
			max-height: 800px;
			overflow-y: auto;
			overflow-x: hidden;
			transition: max-height 0.8s ease-out;
		}

		.navbar-nav {
			flex-direction: column;
			width: 100%;
			max-width: 100%;
			overflow-x: hidden;
		}

		.navbar-nav.left,
		.navbar-nav.right {
			margin: 0;
		}

		.navbar-nav.right {
			flex-direction: row;
			justify-content: center;
			padding: 10px 0;
			margin-top: 10px;
		}

		.navbar-nav.right .nav-item {
			display: inline-flex;
		}

		.navbar-nav.right .nav-link {
			padding: 10px 15px;
			height: auto;
		}

		.navbar-nav.left .nav-item {
			width: 100%;
			height: auto;
			overflow: hidden;
		}

		.navbar-nav.left .nav-link {
			height: auto;
			padding: 12px 20px;
			width: 100%;
			justify-content: flex-start;
		}

		.dropdown {
			display: flex;
			flex-direction: column;
			width: 100%;
		}

		.dropdown-menu {
			position: static;
			border: none;
			box-shadow: none;
			width: 100%;
			display: flex;
			flex-direction: column;
			max-height: 0;
			overflow: hidden;
			transition: max-height 0.4s ease-out;
			order: 2;
		}

		.dropdown-toggle {
			order: 1;
			width: 100%;
		}

		.dropdown.show .dropdown-menu {
			max-height: 500px;
			transition: max-height 0.5s ease-out;
		}

		.dropdown-item {
			padding-left: 40px;
			width: 100%;
			text-align: left;
			white-space: normal;
			word-wrap: break-word;
		}
	}
`;

export const navbarStyles = css`
	${baseStyles}
	${mobileToggleStyles}
	${dropdownStyles}
	${themeToggleStyles}
	${mobileLayoutStyles}
`;
