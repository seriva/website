import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { Reactive, trusted, html } from "./reactive.js";
import { Templates } from "./templates.js";

export class NavbarController extends Reactive.Component {
    state() {
        return {
            mobileMenuOpen: false,
        };
    }

    template() {
        return { __safe: true, content: "" };
    }

    async init() {
        this.initState();
        await this._render();
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

    async _render() {
        const navbarContainer = document.getElementById("navbar-container");
        if (!navbarContainer) return;

        const data = Context.get();
        const pages = data?.pages
            ? Object.entries(data.pages).map(([id, page]) => ({ id, ...page }))
            : [];

        if (data?.blog?.showInNav) {
            pages.push({
                id: "blog",
                title: data.blog.title || "Blog",
                showInNav: true,
                order: 999
            });
        }

        // Build navbar inline
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

        const searchBar = data?.site?.search?.enabled ? this._tplSearchBar() : "";
        const emailButton = data?.site?.emailjs?.enabled
            ? this._tplEmailButton()
            : "";
        const themeToggle = this._tplThemeToggle();
        const projectsDropdown = this._tplProjectsDropdown();

        // Render and inject
        const navbarContent = this._tplNavbar(
            blogLink,
            projectsDropdown,
            pageLinks,
            socialLinksHtml,
            searchBar,
            emailButton,
            themeToggle,
            data?.site?.title || CONSTANTS.DEFAULT_TITLE,
        );

        navbarContainer.innerHTML = navbarContent.content;

        // Bind interactions
        this.scan(navbarContainer);

        // Inject projects into dropdown
        await this._injectProjectsDropdown();

        // Inject search page into body if search is enabled
        if (data?.site?.search?.enabled) {
            const existingSearchPage = document.getElementById("search-page");
            if (!existingSearchPage) {
                document.body.insertAdjacentHTML(
                    "beforeend",
                    this._tplSearchPage(
                        data.site.search.placeholder || i18n.t("search.placeholder"),
                    ).content,
                );
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

    // TEMPLATES

    _tplNavbar(blogLink, projectsDropdown, pageLinks, socialLinksHtml, searchBar, emailButton, themeToggle, siteTitle) {
        return html`
    <nav class="navbar">
        <div class="navbar-container">
            <a class="navbar-brand" href="#">${siteTitle}</a>
            <button class="navbar-toggle" id="navbar-toggle" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation" data-on-click="toggleMobileMenu">
                <span class="navbar-toggle-icon"></span>
            </button>
            <div class="navbar-collapse" id="navbarNav">
                <ul class="navbar-nav left">
                    ${blogLink}
                    ${projectsDropdown}
                    ${pageLinks}
                </ul>
                <ul class="navbar-nav right">
                    ${searchBar}
                    ${themeToggle}
                    ${emailButton}
                    ${socialLinksHtml}
                </ul>
            </div>
        </div>
    </nav>
    `;
    }

    _tplPageLink(pageId, pageTitle) {
        const href = pageId === "blog" ? "?blog" : `?page=${pageId}`;
        return html`<li class="nav-item navbar-menu"><a class="nav-link" href="${href}" data-spa-route="page">${pageTitle}</a></li>`;
    }

    _tplSocialLink({ href = "#", "data-action": dataAction = "", target = "", rel = "", "aria-label": ariaLabel = "", icon }) {
        const attrs = [
            dataAction && `data-action="${dataAction}"`,
            target && `target="${target}"`,
            rel && `rel="${rel}"`,
            ariaLabel && `aria-label="${ariaLabel}"`,
        ].filter(Boolean).join(" ");
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
