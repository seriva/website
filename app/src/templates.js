// ===========================================
// TEMPLATES
// ===========================================
// HTML template generation using tagged template literals

import { CONSTANTS } from "./constants.js";
import { marked } from "./dependencies/marked.js";
import { i18n } from "./i18n.js";
import { Theme } from "./theme.js";

// ===========================================
// TEMPLATES NAMESPACE
// ===========================================

export const Templates = {
	// ===========================================
	// PUBLIC METHODS - HTML Utilities
	// ===========================================

	// Escape HTML special characters to prevent XSS
	escape: (str) => {
		const div = document.createElement("div");
		div.textContent = str;
		return div.innerHTML;
	},

	// Tagged template literal for auto-escaping HTML
	html: (strings, ...values) => {
		return strings.reduce((result, str, i) => {
			const value = values[i];
			if (value === undefined || value === null) return result + str;
			if (value?.__safe) return result + str + value.content;
			return result + str + Templates.escape(String(value));
		}, "");
	},

	// Mark content as safe (already escaped/trusted HTML)
	safe: (content) => ({ __safe: true, content }),

	// ===========================================
	// PUBLIC METHODS - Template Functions
	// ===========================================

	navbar: (
		blogLink,
		projectsDropdown,
		pageLinks,
		socialLinksHtml,
		searchBar,
		emailButton,
		themeToggle,
		siteTitle,
	) => Templates.html`
    <nav class="navbar">
        <div class="navbar-container">
            <a class="navbar-brand" href="#">${siteTitle}</a>
            <button class="navbar-toggle" id="navbar-toggle" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggle-icon"></span>
            </button>
            <div class="navbar-collapse" id="navbarNav">
                <ul class="navbar-nav left">
                    ${Templates.safe(blogLink)}
                    ${Templates.safe(projectsDropdown)}
                    ${Templates.safe(pageLinks)}
                </ul>
                <ul class="navbar-nav right">
                    ${Templates.safe(searchBar)}
                    ${Templates.safe(themeToggle)}
                    ${Templates.safe(emailButton)}
                    ${Templates.safe(socialLinksHtml)}
                </ul>
            </div>
        </div>
    </nav>
    `,

	pageLink: (pageId, pageTitle) => {
		const href = pageId === "blog" ? "?blog" : `?page=${pageId}`;
		return Templates.html`<li class="nav-item navbar-menu"><a class="nav-link" href="${href}" data-spa-route="page">${pageTitle}</a></li>`;
	},

	socialLink: ({
		href = "#",
		"data-action": dataAction = "",
		target = "",
		rel = "",
		"aria-label": ariaLabel = "",
		icon,
	}) => {
		const attrs = [
			dataAction && `data-action="${dataAction}"`,
			target && `target="${target}"`,
			rel && `rel="${rel}"`,
			ariaLabel && `aria-label="${ariaLabel}"`,
		]
			.filter(Boolean)
			.join(" ");
		return Templates.html`<li class="nav-item navbar-icon"><a class="nav-link" href="${href}" ${Templates.safe(attrs)}><i class="${icon}"></i></a></li>`;
	},

	themeToggle: () => Templates.html`
		<li class="nav-item navbar-icon">
			<button id="theme-toggle" class="theme-toggle nav-link" aria-label="${i18n.t("aria.toggleTheme")}" title="${i18n.t("theme.toggleTitle")}">
				<i class="fas fa-sun"></i>
				<i class="fas fa-moon"></i>
			</button>
		</li>
	`,

	projectDropdownItem: (projectId, projectTitle) =>
		Templates.html`<li><a class="dropdown-item" href="?project=${projectId}" data-spa-route="project">${projectTitle}</a></li>`,

	projectsDropdown: () => Templates.html`
		<li class="nav-item dropdown">
			<a class="nav-link dropdown-toggle" href="#" role="button" aria-expanded="false">
				${i18n.t("nav.projects")}
			</a>
			<ul class="dropdown-menu" id="projects-dropdown">
				<li><a class="dropdown-item" href="#">${i18n.t("dropdown.loadingProjects")}</a></li>
			</ul>
		</li>
	`,

	projectLink: (link) => Templates.html`
        <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="download-btn">
            <i class="${link.icon}"></i>
            <span>${link.title}</span>
        </a>`,

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	_tagList: (tags, projectsData) => {
		if (!tags?.length) return Templates.safe("");
		const searchEnabled = projectsData?.site?.search?.enabled !== false;
		const clickableClass = searchEnabled ? " clickable-tag" : "";
		return Templates.safe(
			tags
				.map((tag) => {
					const dataAttr = searchEnabled
						? ` data-search-tag="${Templates.escape(tag)}"`
						: "";
					return Templates.html`<span class="item-tag${clickableClass}"${Templates.safe(dataAttr)}>${tag}</span>`;
				})
				.join(" "),
		);
	},

	_searchInput: (id, cssClass, placeholder) => Templates.html`
        <input type="search" id="${id}" class="${cssClass}" placeholder="${placeholder}" autocomplete="off" aria-label="${i18n.t("aria.search")}"/>
        <button class="${cssClass.replace("input", "clear")}" id="${id.replace("input", "clear")}" aria-label="${i18n.t("aria.clearSearch")}">
            <i class="fas fa-times"></i>
        </button>`,

	youtubeVideo: (videoId) => Templates.html`
        <div class="youtube-video"><div class="iframeWrapper">
            <iframe width="560" height="349" src="//www.youtube.com/embed/${videoId}?rel=0&amp;hd=1" frameborder="0" allowfullscreen></iframe>
        </div></div>`,

	demoIframe: (demoUrl) => Templates.html`
        <div class="markdown-body"><h2>${i18n.t("project.demo")}</h2>
            <p>${i18n.t("project.demoInstructions")}</p>
            <div class="iframeWrapper">
                <iframe id="demo" width="900" height="700" src="${demoUrl}" frameborder="0" allowfullscreen></iframe>
            </div><br><center><button id="fullscreen" class="download-btn" data-action="fullscreen"><i class="fas fa-expand"></i><span>${i18n.t("project.fullscreen")}</span></button></center>
        </div>`,

	dynamicContainer: (id, dataAttr, dataValue, loadingText = null) =>
		Templates.html`<div id="${id}" data-${dataAttr}="${dataValue}"><p>${loadingText || i18n.t("general.loading")}</p></div>`,

	blogPostCard: (post, index) => Templates.html`
        <article class="blog-post-card" data-index="${index}">
            <h2 class="blog-post-title">
                <a href="?blog=${post.slug}" data-spa-route="blog">${post.title}</a>
            </h2>
            <div class="blog-post-meta">
                <span class="blog-post-date"><i class="fas fa-calendar"></i> ${post.date}</span>
                ${post.tags?.length ? Templates.safe(`<span class="blog-post-tags">${Templates._tagList(post.tags).content}</span>`) : ""}
            </div>
            <p class="blog-post-excerpt">${post.excerpt}</p>
        </article>`,

	blogPagination: (currentPage, totalPages) => {
		if (totalPages <= 1) return "";

		const pageNumbers = [];
		let lastAdded = 0;

		for (let i = 1; i <= totalPages; i++) {
			const shouldShow =
				i === 1 ||
				i === totalPages ||
				(i >= currentPage - 1 && i <= currentPage + 1);

			if (shouldShow) {
				if (lastAdded > 0 && i - lastAdded > 1) {
					pageNumbers.push(
						'<li class="page-item disabled"><span class="page-link">...</span></li>',
					);
				}

				const activeClass = i === currentPage ? " active" : "";
				pageNumbers.push(
					Templates.html`<li class="page-item${activeClass}"><a class="page-link" href="?blog&p=${i}" data-spa-route="page">${i}</a></li>`,
				);
				lastAdded = i;
			}
		}

		const prevDisabled = currentPage === 1 ? " disabled" : "";
		const nextDisabled = currentPage === totalPages ? " disabled" : "";

		return Templates.html`<nav class="blog-pagination" aria-label="Blog pagination"><ul class="pagination">
            <li class="page-item${prevDisabled}">
                <a class="page-link" href="?blog&p=${currentPage - 1}" data-spa-route="page" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            ${Templates.safe(pageNumbers.join(""))}
            <li class="page-item${nextDisabled}">
                <a class="page-link" href="?blog&p=${currentPage + 1}" data-spa-route="page" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul></nav>`;
	},

	blogPost: (post, content) => Templates.html`
        <article class="blog-post-full">
            <h1 class="project-title">${post.title}</h1>
            <p class="project-description">${post.date}</p>
            ${post.tags?.length ? Templates.safe(`<div class="project-tags">${Templates._tagList(post.tags).content}</div>`) : ""}
            <div class="blog-post-content">
                ${Templates.safe(Templates.markdown(content, marked).content)}
            </div>
            <footer class="blog-post-footer">
                <a href="?blog" class="blog-back-link" data-spa-route="page">${i18n.t("blog.backToBlog")}</a>
            </footer>
        </article>`,

	loadingSpinner: () =>
		Templates.html`<div class="loading-spinner">${i18n.t("general.loading")}</div>`,

	errorMessage: (title, message) => Templates.html`
        <div class="error-message">
            <h1>${title}</h1>
            <p>${message}</p>
        </div>`,

	markdown: (content, marked) => {
		if (typeof marked === "undefined") {
			return Templates.html`<div class="markdown-body"><p>Markdown renderer not available</p></div>`;
		}
		try {
			const htmlContent = marked.parse(content);
			return Templates.safe(`<div class="markdown-body">${htmlContent}</div>`);
		} catch (error) {
			console.error("Error rendering markdown:", error);
			return Templates.html`<div class="markdown-body"><p>Error rendering markdown</p></div>`;
		}
	},

	githubReadmeError: () =>
		Templates.html`<p>${i18n.t("project.readmeError")}</p>`,

	projectLinksSection: (linksHtml) => Templates.html`
        <div class="markdown-body">
            <h2>${i18n.t("project.links")}</h2>
            <div class="download-buttons">${Templates.safe(linksHtml)}</div>
        </div>`,

	projectHeader: (title, description, tags) => Templates.html`
        <h1 class="project-title">${title}</h1>
        <p class="project-description">${description}</p>
        <div class="project-tags">${Templates.safe(Templates._tagList(tags).content)}</div>`,

	mediaSection: (videosHtml) => Templates.html`
        <div class="markdown-body">
            <h2>${i18n.t("project.media")}</h2>
            ${Templates.safe(videosHtml)}
        </div>`,

	footer: (authorName, currentYear) => Templates.html`
        <footer class="footer">
            <div class="footer-container">
                <p class="footer-text">
                    &copy; ${currentYear} ${authorName}. ${i18n.t("footer.rights")}.
                </p>
            </div>
        </footer>`,

	searchBar: () => Templates.html`
        <li class="nav-item navbar-icon">
            <button class="nav-link search-toggle" id="search-toggle" aria-label="${i18n.t("aria.search")}" title="${i18n.t("search.buttonTitle")}">
                <i class="fas fa-search"></i>
            </button>
        </li>`,

	emailButton: () => Templates.html`
        <li class="nav-item navbar-icon">
            <button class="nav-link email-toggle" id="email-toggle" aria-label="${i18n.t("contact.title")}" title="${i18n.t("contact.buttonTitle")}">
                <i class="fas fa-envelope"></i>
            </button>
        </li>`,

	searchPage: (placeholder) => Templates.html`
        <div class="search-page" id="search-page">
            <div class="search-page-header">
                <div class="search-page-header-content">
                    <button class="search-page-back" id="search-page-back" aria-label="${i18n.t("aria.goBack")}">
                        <i class="fas fa-arrow-left"></i>
                    </button>
                    <div class="search-page-input-wrapper">
                        ${Templates.safe(Templates._searchInput("search-page-input", "search-page-input", placeholder))}
                    </div>
                </div>
            </div>
            <div class="search-page-content">
                <div class="search-page-results" id="search-page-results"></div>
            </div>
        </div>`,

	searchResult: (item, query, Search) => {
		const isProject = item.type === "project";
		const typeTag = isProject
			? i18n.t("badges.project")
			: i18n.t("badges.blog");
		const allTags = [typeTag, ...item.tags];

		return Templates.html`
            <article class="search-result-item blog-post-card">
                <h2 class="blog-post-title">
                    <a href="${item.url}" data-spa-route="${item.type}">${Templates.safe(Search.highlight(item.title, query))}</a>
                </h2>
                <div class="blog-post-meta">
                    ${allTags.length ? Templates.safe(Templates.html`<span class="blog-post-tags">${Templates.safe(allTags.map((tag) => Templates.html`<span class="item-tag">${tag}</span>`).join(" "))}</span>`) : ""}
                </div>
                <p class="blog-post-excerpt">${Templates.safe(Search.highlight(item.description, query))}</p>
            </article>`;
	},

	searchNoResults: () => Templates.html`
        <div class="search-no-results">
            <i class="fas fa-search"></i>
            <p>${i18n.t("search.noResults")}</p>
        </div>`,

	blogEmpty: () => Templates.html`
        <div class="blog-container">
            <p class="blog-empty">${i18n.t("blog.noPosts")}</p>
        </div>`,

	blogContainer: (postsHtml, paginationHtml) => Templates.html`
        <div class="blog-container">
            <div class="blog-posts">
                ${Templates.safe(postsHtml)}
            </div>
            ${Templates.safe(paginationHtml)}
        </div>`,

	giscusComments: (config, pageType = "blog") => {
		// Check if comments are enabled for this page type
		const isEnabled =
			pageType === "blog" ? config?.blogEnabled : config?.projectsEnabled;
		if (!isEnabled) return "";

		// Create a unique container ID (generate once!)
		const containerId = `giscus-${pageType}-${Date.now()}`;

		// Schedule script injection for after DOM update
		setTimeout(() => {
			const container = document.getElementById(containerId);
			if (!container) return;

			// Get giscus theme from Theme module
			const currentTheme =
				document.documentElement.getAttribute("data-theme") || "dark";
			const giscusTheme = Theme.getGiscusTheme(currentTheme);

			const script = document.createElement("script");
			script.src = "https://giscus.app/client.js";
			script.setAttribute("data-repo", config.repo);
			script.setAttribute("data-repo-id", config.repoId);
			script.setAttribute("data-category", config.category);
			script.setAttribute("data-category-id", config.categoryId);
			script.setAttribute("data-mapping", config.mapping);
			script.setAttribute("data-strict", config.strict);
			script.setAttribute("data-reactions-enabled", config.reactionsEnabled);
			script.setAttribute("data-emit-metadata", config.emitMetadata);
			script.setAttribute("data-input-position", config.inputPosition);
			script.setAttribute("data-theme", giscusTheme);
			script.setAttribute("data-lang", config.lang);
			script.setAttribute("crossorigin", "anonymous");
			script.async = true;

			container.appendChild(script);
		}, CONSTANTS.GISCUS_INJECTION_DELAY);

		return Templates.html`<div class="giscus-container" id="${containerId}"></div>`;
	},

	// Contact form modal
	contactForm: () => Templates.html`
		<div class="contact-modal" id="contact-modal">
			<div class="contact-modal-content">
				<div class="contact-modal-header">
					<h2>${i18n.t("contact.title")}</h2>
					<button class="contact-modal-close" id="contact-modal-close" aria-label="${i18n.t("contact.close")}">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<form class="contact-form" id="contact-form">
					<div class="form-group">
						<label for="contact-name">${i18n.t("contact.name")}*</label>
						<input 
							type="text" 
							id="contact-name" 
							name="name" 
							required 
							aria-required="true"
						/>
					</div>
					<div class="form-group">
						<label for="contact-email">${i18n.t("contact.email")}*</label>
						<input 
							type="email" 
							id="contact-email" 
							name="email" 
							required 
							aria-required="true"
						/>
					</div>
					<div class="form-group">
						<label for="contact-message">${i18n.t("contact.message")}*</label>
						<textarea 
							id="contact-message" 
							name="message" 
							rows="6" 
							required 
							aria-required="true"
						></textarea>
					</div>
					<div class="form-status" id="contact-status"></div>
					<button type="submit" class="btn btn-primary" id="contact-submit">
						${i18n.t("contact.send")}
					</button>
				</form>
			</div>
		</div>
	`,
};
