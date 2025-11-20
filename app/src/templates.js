// ===========================================
// TEMPLATES
// ===========================================
// HTML template generation using tagged template literals

import { CONSTANTS } from "./constants.js";
import { marked } from "./dependencies/marked.js";
import { i18n } from "./i18n.js";
import { html, join, trusted } from "./reactive.js";
import { Theme } from "./theme.js";

// ===========================================
// TEMPLATES NAMESPACE
// ===========================================

export const Templates = {
	// ===========================================
	// PUBLIC METHODS - Template Functions
	// ===========================================

	projectLink: (link) => html`
        <a href="${link.href}" target="_blank" rel="noopener noreferrer" class="download-btn">
            <i class="${link.icon}"></i>
            <span>${link.title}</span>
        </a>`,

	blogPostCard: (post, index) => html`
        <article class="blog-post-card" data-index="${index}">
            <h2 class="blog-post-title">
                <a href="?blog=${post.slug}" data-spa-route="blog">${post.title}</a>
            </h2>
            <div class="blog-post-meta">
				<span class="blog-post-date"><i class="fas fa-calendar"></i> ${post.date}</span>
				${post.tags?.length ? html`<span class="blog-post-tags">${Templates._tagList(post.tags)}</span>` : ""}
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
					html`<li class="page-item${activeClass}"><a class="page-link" href="?blog&p=${i}" data-spa-route="page">${i}</a></li>`
						.content,
				);
				lastAdded = i;
			}
		}

		const prevDisabled = currentPage === 1 ? " disabled" : "";
		const nextDisabled = currentPage === totalPages ? " disabled" : "";

		return html`<nav class="blog-pagination" aria-label="Blog pagination"><ul class="pagination">
            <li class="page-item${prevDisabled}">
                <a class="page-link" href="?blog&p=${currentPage - 1}" data-spa-route="page" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </a>
			</li>
			${trusted(pageNumbers.join(""))}
			<li class="page-item${nextDisabled}">
                <a class="page-link" href="?blog&p=${currentPage + 1}" data-spa-route="page" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul></nav>`;
	},

	blogPost: (post, content) => html`
        			<h1 class="project-title">${post.title}</h1>
			<p class="project-description">${post.date}</p>
			${post.tags?.length ? html`<div class="project-tags">${Templates._tagList(post.tags)}</div>` : ""}
			<div class="blog-post-content">
				${Templates.markdown(content, marked)}
			</div>`,

	loadingSpinner: () =>
		html`<div class="loading-spinner">${i18n.t("general.loading")}</div>`,

	errorMessage: (title, message) => html`
        <div class="error-message">
            <h1>${title}</h1>
            <p>${message}</p>
        </div>`,

	markdown: (content, marked) => {
		if (typeof marked === "undefined") {
			return html`<div class="markdown-body"><p>Markdown renderer not available</p></div>`;
		}
		try {
			const htmlContent = marked.parse(content);
			return trusted(`<div class="markdown-body">${htmlContent}</div>`);
		} catch (error) {
			console.error("Error rendering markdown:", error);
			return html`<div class="markdown-body"><p>Error rendering markdown</p></div>`;
		}
	},

	githubReadmeError: () => html`<p>${i18n.t("project.readmeError")}</p>`,

	projectLinksSection: (linksHtml) => html`
			<div class="markdown-body">
				<h2>${i18n.t("project.links")}</h2>
				<div class="download-buttons">${linksHtml}</div>
			</div>`,
	projectHeader: (title, description, tags) => html`
			<h1 class="project-title">${title}</h1>
			<p class="project-description">${description}</p>
			<div class="project-tags">${Templates._tagList(tags)}</div>`,
	mediaSection: (videosHtml) => html`
			<div class="markdown-body">
				<h2>${i18n.t("project.media")}</h2>
				${videosHtml}
			</div>`,

	searchResult: (item, query, Search) => {
		const isProject = item.type === "project";
		const typeTag = isProject
			? i18n.t("badges.project")
			: i18n.t("badges.blog");
		const allTags = [typeTag, ...item.tags];

		return html`
            <article class="search-result-item blog-post-card">
                <h2 class="blog-post-title">
                    <a href="${item.url}" data-spa-route="${item.type}">${trusted(Search.highlight(item.title, query))}</a>
                </h2>
                <div class="blog-post-meta">
                    				<div class="blog-post-meta">
					${allTags.length ? html`<span class="blog-post-tags">${trusted(allTags.map((tag) => html`<span class="item-tag">${tag}</span>`.content).join(" "))}</span>` : ""}
                </div>
                <p class="blog-post-excerpt">${trusted(Search.highlight(item.description, query))}</p>
            </article>`;
	},

	searchNoResults: () => html`
        <div class="search-no-results">
            <i class="fas fa-search"></i>
            <p>${i18n.t("search.noResults")}</p>
        </div>`,

	blogEmpty: () => html`
        <div class="blog-container">
            <p class="blog-empty">${i18n.t("blog.noPosts")}</p>
        </div>`,

	blogContainer: (postsHtml, paginationHtml) => html`
			<div class="blog-container">
				<div class="blog-posts">
					${postsHtml}
				</div>
				${paginationHtml}
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
			const giscusTheme = Theme.giscusTheme.get();

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

		return html`<div class="giscus-container" id="${containerId}"></div>`;
	},

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	_tagList: (tags, projectsData) => {
		if (!tags?.length) return html``;
		const searchEnabled = projectsData?.site?.search?.enabled !== false;
		const clickableClass = searchEnabled ? " clickable-tag" : "";

		const tagElements = tags.map((tag) => {
			if (searchEnabled) {
				return html`<span class="item-tag${clickableClass}" data-search-tag="${tag}">${tag}</span>`;
			}
			return html`<span class="item-tag">${tag}</span>`;
		});

		return join(tagElements, " ");
	},

	_youtubeVideo: (videoId) => html`
        <div class="youtube-video"><div class="iframeWrapper">
            <iframe width="560" height="349" src="//www.youtube.com/embed/${videoId}?rel=0&amp;hd=1" frameborder="0" allowfullscreen></iframe>
        </div></div>`,

	_demoIframe: (demoUrl) => html`
        <div class="markdown-body"><h2>${i18n.t("project.demo")}</h2>
            <p>${i18n.t("project.demoInstructions")}</p>
            <div class="iframeWrapper">
                <iframe id="demo" width="900" height="700" src="${demoUrl}" frameborder="0" allowfullscreen></iframe>
            </div><br><center><button id="fullscreen" class="download-btn" data-action="fullscreen"><i class="fas fa-expand"></i><span>${i18n.t("project.fullscreen")}</span></button></center>
        </div>`,

	_dynamicContainer: (id, dataAttr, dataValue, loadingText = null) =>
		html`<div id="${id}" data-${dataAttr}="${dataValue}"><p>${loadingText || i18n.t("general.loading")}</p></div>`,
};
