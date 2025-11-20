import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { html, Reactive, Signals, trusted } from "./reactive.js";

export class NavbarController extends Reactive.Component {
	state() {
		const data = Context.get();
		const params = new URLSearchParams(window.location.search);

		const currentRoute = Signals.create({
			blog: params.get("blog"),
			page: params.get("page"),
			project: params.get("project"),
		});

		const getIsActive = (href) => {
			if (!href?.startsWith("?")) return false;
			const route = currentRoute.get();
			const linkParams = new URLSearchParams(href);

			if (route.blog !== null && linkParams.get("blog") !== null) return true;
			if (route.page !== null && linkParams.get("page") === route.page) return true;
			if (route.project !== null && linkParams.get("project") === route.project)
				return true;
			return false;
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
				href: "?blog",
			};
			activeSignals.blogActive = this.computed(() => getIsActive("?blog"));
		}

		const navPages = pagesData
			.filter((page) => page.id !== "blog" && page.showInNav)
			.sort((a, b) => (a.order || 0) - (b.order || 0))
			.map((page) => ({ ...page, href: `?page=${page.id}` }));

		navPages.forEach((page, i) => {
			activeSignals[`page_${i}_active`] = this.computed(() =>
				getIsActive(page.href),
			);
		});

		const projects = (data?.projects || []).map((p) => ({
			...p,
			href: `?project=${p.id}`,
		}));

		projects.forEach((p, i) => {
			activeSignals[`project_${i}_active`] = this.computed(() =>
				getIsActive(p.href),
			);
		});

		const isProjectActive = this.computed(
			() => currentRoute.get().project !== null,
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

	template() {
		const blogPage = this.blogPage ? this.blogPage.get() : null;
		const blogLink = blogPage
			? this._tplPageLink(blogPage, "blogActive")
			: "";

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
		<nav class="navbar">
			<div class="navbar-container">
				<a class="navbar-brand" href="#">${this.siteTitle.get()}</a>
				<button class="navbar-toggle" id="navbar-toggle" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" data-on-click="toggleMobileMenu">
					<span class="navbar-toggle-icon"></span>
				</button>
				<div class="navbar-collapse" id="navbarNav">
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

	constructor() {
		super();
		this.initState();

		const navbarContainer = document.getElementById("navbar-container");
		if (navbarContainer) {
			const navbarElement = this.render();
			navbarContainer.innerHTML = "";
			navbarContainer.appendChild(navbarElement);

			// Inject search page into body if search is enabled
			if (this.searchEnabled.get()) {
				const existingSearchPage = document.getElementById("search-page");
				if (!existingSearchPage) {
					document.body.insertAdjacentHTML(
						"beforeend",
						this._tplSearchPage(this.searchPlaceholder.get()).content,
					);
				}
			}

			// Initialize dropdown behavior
			this._initCustomDropdowns();

			// Setup outside click handler for mobile menu
			this._setupOutsideClickHandler();

			// Listen for route changes to update active link styling
			const updateHandler = () => this.updateActiveNavLink();
			window.addEventListener("popstate", updateHandler);
			window.addEventListener("route-changed", updateHandler);
		}
	}

	toggleMobileMenu() {
		const isOpen = !this.mobileMenuOpen.get();
		this.mobileMenuOpen.set(isOpen);

		const collapse = document.getElementById("navbarNav");
		const toggle = document.getElementById("navbar-toggle");

		if (collapse && toggle) {
			collapse.classList.toggle("show", isOpen);
			toggle.setAttribute("aria-expanded", isOpen);
		}
	}

	closeMobileMenu() {
		if (!this.mobileMenuOpen.get()) return;

		this.mobileMenuOpen.set(false);

		const collapse = document.getElementById("navbarNav");
		const toggle = document.getElementById("navbar-toggle");

		if (collapse) {
			collapse.classList.remove("show");
		}

		if (toggle) {
			toggle.classList.remove("active");
			toggle.setAttribute("aria-expanded", "false");
		}
	}

	updateActiveNavLink() {
		// Update the route signal which will trigger reactive updates
		const params = new URLSearchParams(window.location.search);
		this.currentRoute.set({
			blog: params.get("blog"),
			page: params.get("page"),
			project: params.get("project"),
		});
	}

	_initCustomDropdowns() {
		for (const toggle of document.querySelectorAll(".dropdown-toggle")) {
			toggle.addEventListener("click", (e) => {
				e.preventDefault();
				const dropdown = toggle.closest(".dropdown");
				const isOpen = dropdown.classList.contains("show");

				// Close all other dropdowns
				for (const d of document.querySelectorAll(".dropdown.show")) {
					if (d !== dropdown) {
						d.classList.remove("show");
						const t = d.querySelector(".dropdown-toggle");
						if (t) t.setAttribute("aria-expanded", "false");
					}
				}

				dropdown.classList.toggle("show", !isOpen);
				toggle.setAttribute("aria-expanded", !isOpen);
			});
		}

		document.addEventListener("click", (e) => {
			if (
				e.target.closest(".dropdown-item") ||
				!e.target.closest(".dropdown")
			) {
				for (const d of document.querySelectorAll(".dropdown.show")) {
					d.classList.remove("show");
					const toggle = d.querySelector(".dropdown-toggle");
					if (toggle) toggle.setAttribute("aria-expanded", "false");
				}
			}
		});
	}

	_setupOutsideClickHandler() {
		document.addEventListener("click", (event) => {
			const navbar = document.getElementById("navbar-container");
			if (!navbar) return;

			const isMobile = window.innerWidth <= CONSTANTS.MOBILE_BREAKPOINT;
			if (isMobile && !navbar.contains(event.target)) {
				this.closeMobileMenu();
			}
		});
	}

	// TEMPLATES

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
		return html`<li class="nav-item navbar-icon"><a class="nav-link" href="${href}" ${trusted(attrs)}><i class="${icon}"></i></a></li>`;
	}

	_tplThemeToggle() {
		return html`
		<li class="nav-item navbar-icon">
			<button id="theme-toggle" class="theme-toggle nav-link" aria-label="${i18n.t("aria.toggleTheme")}" title="${i18n.t("theme.toggleTitle")}">
				<i class="fas fa-sun"></i>
				<i class="fas fa-moon"></i>
			</button>
		</li>
	`;
	}

	_tplProjectsDropdown() {
		return html`
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false" data-route-type="project" data-class-active="isProjectActive">
				${i18n.t("nav.projects")}
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
						this._tplProjectDropdownItem(project, `project_${i}_active`).content,
				)
				.join(""),
		);
	}

	_tplProjectDropdownItem(project, activeSignalName) {
		return html`<li><a class="dropdown-item" href="${project.href}" data-spa-route="project" data-class-active="${activeSignalName}">${project.title}</a></li>`;
	}

	_tplSearchBar() {
		return html`
        <li class="nav-item navbar-icon">
            <button class="nav-link search-toggle" id="search-toggle" aria-label="${i18n.t("aria.search")}" title="${i18n.t("search.buttonTitle")}">
                <i class="fas fa-search"></i>
            </button>
        </li>`;
	}

	_tplEmailButton() {
		return html`
        <li class="nav-item navbar-icon">
            <button class="nav-link email-toggle" id="email-toggle" aria-label="${i18n.t("contact.title")}" title="${i18n.t("contact.buttonTitle")}">
                <i class="fas fa-envelope"></i>
            </button>
        </li>`;
	}

	_tplSearchPage(placeholder) {
		return html`
        <div class="search-page" id="search-page">
            <div class="search-page-header">
                <div class="search-page-header-content">
                    <button class="search-page-back" id="search-page-back" aria-label="${i18n.t("aria.goBack")}">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <div class="search-page-input-wrapper">
                        ${this._tplSearchInput("search-page-input", "search-page-input", placeholder)}
                    </div>
                </div>
            </div>
            <div class="search-page-content">
                <div class="search-page-results" id="search-page-results"></div>
            </div>
        </div>`;
	}

	_tplSearchInput(id, cssClass, placeholder) {
		return html`
        <input type="search" id="${id}" class="${cssClass}" placeholder="${placeholder}" autocomplete="off" aria-label="${i18n.t("aria.search")}"/>
        <button class="${cssClass.replace("input", "clear")}" id="${id.replace("input", "clear")}" aria-label="${i18n.t("aria.clearSearch")}">
            <i class="fas fa-times"></i>
        </button>`;
	}
}
