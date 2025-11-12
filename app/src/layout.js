// ===========================================
// LAYOUT MANAGEMENT
// ===========================================
// Navbar, footer, and dropdown injection

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { Templates } from "./templates.js";
import { UI } from "./ui.js";

// ===========================================
// LAYOUT NAMESPACE
// ===========================================

export const Layout = {
	// Inject navbar into DOM
	async injectNavbar() {
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
			});
		}

		// Build navbar inline
		const blogPage = pages.find((page) => page.id === "blog");
		const blogLink = blogPage
			? Templates.pageLink(blogPage.id, blogPage.title)
			: "";
		const pageLinks = pages
			.filter((page) => page.id !== "blog" && page.showInNav)
			.sort((a, b) => a.order - b.order)
			.map((page) => Templates.pageLink(page.id, page.title))
			.join("");
		const socialLinksHtml = (data?.site?.social || [])
			.map((link) => Templates.socialLink(link))
			.join("");
		const searchBar = data?.site?.search?.enabled ? Templates.searchBar() : "";
		const projectsDropdown = Templates.projectsDropdown();

		navbarContainer.innerHTML = Templates.navbar(
			blogLink,
			projectsDropdown,
			pageLinks,
			socialLinksHtml,
			searchBar,
			data?.site?.title || CONSTANTS.DEFAULT_TITLE,
		);

		// Reset cached DOM queries after navbar re-render
		UI.resetNavCache();

		// Inject search page into body if search is enabled
		if (data?.site?.search?.enabled) {
			const existingSearchPage = document.getElementById("search-page");
			if (!existingSearchPage) {
				document.body.insertAdjacentHTML(
					"beforeend",
					Templates.searchPage(
						data.site.search.placeholder || i18n.t("search.placeholder"),
					),
				);
			}
		}
	},

	// Inject footer into DOM
	async injectFooter() {
		const footerContainer = document.getElementById("footer-container");
		if (!footerContainer) return;

		try {
			const data = Context.get();
			const authorName = data?.site?.author || "Portfolio Owner";
			const currentYear = new Date().getFullYear();

			footerContainer.innerHTML = Templates.footer(authorName, currentYear);
		} catch (error) {
			console.error("Error injecting footer:", error);
		}
	},

	// Load projects into dropdown menu
	async loadProjectsDropdown() {
		const data = Context.get();
		const projectsDropdown = document.getElementById("projects-dropdown");
		if (!projectsDropdown || !data?.projects) return;

		const projectsHtml = data.projects
			.map((project) =>
				Templates.projectDropdownItem(project.id, project.title),
			)
			.join("");

		projectsDropdown.innerHTML = projectsHtml;
	},
};
