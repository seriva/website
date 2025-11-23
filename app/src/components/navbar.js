// ===========================================
// NAVBAR COMPONENT
// ===========================================
// Reactive navigation bar with mobile menu and dropdowns

import { html, Reactive, Signals, trusted } from "../core/reactive.js";
import { Context } from "../services/context.js";
import { i18n } from "../services/i18n.js";
import { Theme } from "../services/theme.js";
import { CONSTANTS } from "../utils/constants.js";
import { Icons } from "../utils/icons.js";
import { navbarStyles } from "./navbar.styles.js";

export class Navbar extends Reactive.Component {
	constructor() {
		super();
		this.appendTo("body");
	}

	mount() {
		// Setup outside click handler for mobile menu
		this._setupOutsideClickHandler();

		// Listen for route changes to update active link styling
		this.on(window, "popstate", this.updateActiveNavLink);
		this.on(window, "route-changed", this.updateActiveNavLink);

		// Listen for close-mobile event from other components
		this.on(window, "navbar:close-mobile", this.closeMobileMenu);
	}

	state() {
		const data = Context.get();
		const currentRoute = Signals.create(window.location.pathname);

		const getIsActive = (href) => {
			const path = currentRoute.get();
			if (!href) return false;

			// Exact match for home/blog root
			if (href === "/blog" && (path === "/" || path === "/blog")) return true;

			// Prefix match for other routes
			return path === href || (href !== "/" && path.startsWith(href));
		};

		const pagesData = data?.pages
			? Object.entries(data.pages).map(([id, page]) => ({ id, ...page }))
			: [];

		let blogPage = null;
		const activeSignals = {};

		if (data?.blog?.showInNav) {
			blogPage = {
				id: "blog",
				title: data.blog.title || "Blog",
				href: "/blog",
			};
			activeSignals.blogActive = this.computed(() => getIsActive("/blog"));
		}

		const navPages = pagesData
			.filter((page) => page.id !== "blog" && page.showInNav)
			.sort((a, b) => (a.order || 0) - (b.order || 0))
			.map((page) => ({ ...page, href: `/page/${page.id}` }));

		navPages.forEach((page, i) => {
			activeSignals[`page_${i}_active`] = this.computed(() =>
				getIsActive(page.href),
			);
		});

		const projects = (data?.projects || []).map((p) => ({
			...p,
			href: `/project/${p.id}`,
		}));

		projects.forEach((p, i) => {
			activeSignals[`project_${i}_active`] = this.computed(() =>
				getIsActive(p.href),
			);
		});

		const isProjectActive = this.computed(() =>
			currentRoute.get().startsWith("/project/"),
		);

		return {
			mobileMenuOpen: false,
			dropdownOpen: false,
			currentRoute,
			siteTitle: data?.site?.title || CONSTANTS.DEFAULT_TITLE,
			searchEnabled: data?.site?.search?.enabled || false,
			emailEnabled: data?.site?.emailjs?.enabled || false,
			searchPlaceholder:
				data?.site?.search?.placeholder || i18n.t("search.placeholder"),
			projects,
			navPages,
			blogPage,
			isProjectActive,
			...activeSignals,
		};
	}

	styles() {
		return navbarStyles;
	}

	template() {
		const blogPage = this.blogPage ? this.blogPage.get() : null;
		const blogLink = blogPage ? this._tplPageLink(blogPage, "blogActive") : "";

		const navPages = this.navPages.get();
		const pageLinks = trusted(
			navPages
				.map((page, i) => this._tplPageLink(page, `page_${i}_active`).content)
				.join(""),
		);

		const socialLinksHtml = trusted(
			(Context.get()?.site?.social || [])
				.map((link) => this._tplSocialLink(link).content)
				.join(""),
		);

		const searchBar = this.searchEnabled.get() ? this._tplSearchBar() : "";
		const emailButton = this.emailEnabled.get() ? this._tplEmailButton() : "";

		return html`
		<nav>
			<div class="navbar-inner">
				<a class="navbar-brand" href="#">${this.siteTitle.get()}</a>
				<button class="navbar-toggle" aria-label="Toggle navigation" data-on-click="toggleMobileMenu" data-attr-aria-expanded="mobileMenuOpen" data-class-active="mobileMenuOpen">
					<span class="navbar-toggle-icon"></span>
				</button>
				<div class="navbar-collapse" data-class-show="mobileMenuOpen">
					<ul class="navbar-nav left">
						${blogLink}
						${this._tplProjectsDropdown()}
						${pageLinks}
					</ul>
					<ul class="navbar-nav right">
						${searchBar}
						${this._tplThemeToggle()}
						${emailButton}
						${socialLinksHtml}
					</ul>
				</div>
			</div>
		</nav>
	`;
	}

	toggleMobileMenu() {
		this.mobileMenuOpen.set(!this.mobileMenuOpen.get());
	}

	toggleTheme() {
		Theme.toggle();
	}

	toggleEmail() {
		this.closeMobileMenu();
		window.dispatchEvent(new CustomEvent("email:show"));
	}

	closeMobileMenu() {
		this.mobileMenuOpen.set(false);
	}

	updateActiveNavLink() {
		// Update the route signal which will trigger reactive updates
		this.currentRoute.set(window.location.pathname);
	}

	toggleDropdown(e) {
		e.preventDefault();
		this.dropdownOpen.set(!this.dropdownOpen.get());
	}

	_setupOutsideClickHandler() {
		this.on(document, "click", (event) => {
			const navbar = document.querySelector("nav"); // Changed from .navbar to nav since class is removed
			if (!navbar) return;

			const isMobile = window.innerWidth <= CONSTANTS.MOBILE_BREAKPOINT;
			if (isMobile && !navbar.contains(event.target)) {
				this.closeMobileMenu();
			}

			// Close dropdown when clicking outside
			if (
				!event.target.closest(".dropdown") ||
				event.target.closest(".dropdown-item")
			) {
				this.dropdownOpen.set(false);
			}
		});
	}

	// ===========================================
	// PRIVATE TEMPLATES
	// ===========================================

	_tplPageLink(page, activeSignalName) {
		return html`<li class="nav-item navbar-menu"><a class="nav-link" href="${page.href}" data-spa-route="page" data-class-active="${activeSignalName}">${page.title}</a></li>`;
	}

	_tplSocialLink({
		href = "#",
		"data-action": dataAction = "",
		target = "",
		rel = "",
		"aria-label": ariaLabel = "",
		icon,
	}) {
		const attrs = [
			dataAction && `data-action="${dataAction}"`,
			target && `target="${target}"`,
			rel && `rel="${rel}"`,
			ariaLabel && `aria-label="${ariaLabel}"`,
		]
			.filter(Boolean)
			.join(" ");
		const iconSvg = Icons.get(icon, { size: "1.35rem" });
		return html`<li class="nav-item navbar-icon"><a class="nav-link" href="${href}" ${trusted(attrs)}>${trusted(iconSvg)}</a></li>`;
	}

	_tplThemeToggle() {
		const moonIcon = Icons.get("moon", { size: "1.35rem" });
		const sunIcon = Icons.get("sun", { size: "1.35rem" });
		return html`
		<li class="nav-item navbar-icon">
			<button id="theme-toggle" class="theme-toggle nav-link" aria-label="${i18n.t("aria.toggleTheme")}" title="${i18n.t("theme.toggleTitle")}" data-on-click="toggleTheme">
				${trusted(moonIcon)}
				${trusted(sunIcon)}
			</button>
		</li>`;
	}

	_tplEmailButton() {
		const envelopeIcon = Icons.get("envelope", { size: "1.35rem" });
		return html`
		<li class="nav-item navbar-icon">
			<button class="nav-link email-toggle" id="email-toggle" aria-label="${i18n.t("contact.title")}" title="${i18n.t("contact.buttonTitle")}" data-on-click="toggleEmail">
				${trusted(envelopeIcon)}
			</button>
		</li>`;
	}

	_tplProjectsDropdown() {
		const chevronDown = Icons.get("chevron-down", { size: "0.8em" });
		const chevronUp = Icons.get("chevron-up", { size: "0.8em" });
		return html`
		<li class="nav-item dropdown" data-class-show="dropdownOpen">
			<a class="nav-link dropdown-toggle" href="javascript:void(0)" role="button" data-route-type="project" data-class-active="isProjectActive" data-attr-aria-expanded="dropdownOpen" data-on-click="toggleDropdown">
				${i18n.t("nav.projects")}
				<span class="dropdown-chevron dropdown-chevron-down">${trusted(chevronDown)}</span>
				<span class="dropdown-chevron dropdown-chevron-up">${trusted(chevronUp)}</span>
			</a>
			<ul class="dropdown-menu" id="projects-dropdown">
				${this._getProjectsHtml()}
			</ul>
		</li>
	`;
	}

	_getProjectsHtml() {
		const projects = this.projects.get();
		if (!projects.length) {
			return html`<li><a class="dropdown-item" href="#">${i18n.t("dropdown.loadingProjects")}</a></li>`;
		}
		return trusted(
			projects
				.map(
					(project, i) =>
						this._tplProjectDropdownItem(project, `project_${i}_active`)
							.content,
				)
				.join(""),
		);
	}

	_tplProjectDropdownItem(project, activeSignalName) {
		return html`<li><a class="dropdown-item" href="${project.href}" data-spa-route="project" data-class-active="${activeSignalName}" data-on-click="closeMobileMenu">${project.title}</a></li>`;
	}

	_tplSearchBar() {
		const searchIcon = Icons.get("search", { size: "1.35rem" });
		return html`
		<li class="nav-item navbar-icon">
			<button class="nav-link search-toggle" id="search-toggle" aria-label="${i18n.t("aria.search")}" title="${i18n.t("search.buttonTitle")}">
				${trusted(searchIcon)}
			</button>
		</li>`;
	}
}
