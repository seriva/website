// ===========================================
// LAYOUT MANAGEMENT
// ===========================================
// Navbar, footer, and dropdown injection

import { Reactive } from "./reactive.js";
import { NavbarController } from "./navbar.js";
import { FooterController } from "./footer.js";

class LayoutController extends Reactive.Component {
	constructor() {
		super();
		this.navbar = new NavbarController();
		this.footer = new FooterController();
	}

	state() {
		return {};
	}

	template() {
		return { __safe: true, content: "" };
	}

	async init() {
		await this.navbar.init();
		await this.footer.init();
	}

	// Delegate mobile menu toggle to navbar for backward compatibility if needed,
	// or just expose navbar
	get mobileMenuOpen() {
		return this.navbar.mobileMenuOpen;
	}

	toggleMobileMenu() {
		this.navbar.toggleMobileMenu();
	}

	cleanup() {
		this.navbar.cleanup();
		this.footer.cleanup();
		super.cleanup();
	}
}

export const Layout = new LayoutController();
