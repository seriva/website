import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { html, Reactive, trusted } from "./reactive.js";

export class NavbarController extends Reactive.Component {
	state() {
		const data = Context.get();

		return {
			mobileMenuOpen: false,
			dropdownOpen: false,
			activeRoute: { type: null, id: null },
			siteTitle: data?.site?.title || CONSTANTS.DEFAULT_TITLE,
			searchEnabled: data?.site?.search?.enabled || false,
			emailEnabled: data?.site?.emailjs?.enabled || false,
			searchPlaceholder:
				data?.site?.search?.placeholder || i18n.t("search.placeholder"),
		};
	}

	template() {
		const data = Context.get();
		const pages = data?.pages
			? Object.entries(data.pages).map(([id, page]) => ({ id, ...page }))
			: [];

		if (data?.blog?.showInNav) {
			pages.push({
				id: "blog",
				title: data.blog.title || "Blog",
				showInNav: true,
				order: 999,
			});
		}

		const blogPage = pages.find((page) => page.id === "blog");
		const blogLink = blogPage
			? this._tplPageLink(blogPage.id, blogPage.title)
			: "";

		const pageLinks = trusted(
			pages
				.filter((page) => page.id !== "blog" && page.showInNav)
				.sort((a, b) => (a.order || 0) - (b.order || 0))
				.map((page) => this._tplPageLink(page.id, page.title).content)
				.join(""),
		);

		const socialLinksHtml = trusted(
			(data?.site?.social || [])
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

			// Inject projects into dropdown
			this._injectProjectsDropdown();

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
		const params = new URLSearchParams(window.location.search);
		const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
		const dropdownItems = document.querySelectorAll(".dropdown-item");

		// Update navbar links
		for (const link of navLinks) {
			link.classList.remove("active");

			const href = link.getAttribute("href");
			if (href?.startsWith("?")) {
				const linkParams = new URLSearchParams(href);

				if (params.get("blog") !== null && linkParams.get("blog") !== null) {
					link.classList.add("active");
				} else if (
					params.get("page") === linkParams.get("page") &&
					params.get("page") !== null
				) {
					link.classList.add("active");
				}
			}
		}

		// Update dropdown items and highlight dropdown toggle if project is active
		let isProjectActive = false;
		for (const item of dropdownItems) {
			item.classList.remove("active");

			const href = item.getAttribute("href");
			if (href?.startsWith("?project=")) {
				const linkParams = new URLSearchParams(href);
				const linkProject = linkParams.get("project");
				const currentProject = params.get("project");

				if (linkProject && linkProject === currentProject) {
					item.classList.add("active");
					isProjectActive = true;
				}
			}
		}

		// Highlight the projects dropdown toggle if any project is active
		if (isProjectActive) {
			const projectsToggle = document.querySelector(".dropdown-toggle");
			if (projectsToggle) {
				projectsToggle.classList.add("active");
			}
		}
	}

	async _injectProjectsDropdown() {
		const data = Context.get();
		const projectsDropdown = document.getElementById("projects-dropdown");
		if (!projectsDropdown || !data?.projects) return;

		const projectsHtml = trusted(
			data.projects
				.map(
					(project) =>
						this._tplProjectDropdownItem(project.id, project.title).content,
				)
				.join(""),
		);

		projectsDropdown.innerHTML = projectsHtml.content;
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

	_tplPageLink(pageId, pageTitle) {
		const href = pageId === "blog" ? "?blog" : `?page=${pageId}`;
		return html`<li class="nav-item navbar-menu"><a class="nav-link" href="${href}" data-spa-route="page">${pageTitle}</a></li>`;
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
			<a class="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
				${i18n.t("nav.projects")}
			</a>
			<ul class="dropdown-menu" id="projects-dropdown">
				<li><a class="dropdown-item" href="#">${i18n.t("dropdown.loadingProjects")}</a></li>
			</ul>
		</li>
	`;
	}

	_tplProjectDropdownItem(projectId, projectTitle) {
		return html`<li><a class="dropdown-item" href="?project=${projectId}" data-spa-route="project">${projectTitle}</a></li>`;
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
