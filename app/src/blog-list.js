// ===========================================
// BLOG LIST CONTROLLER
// ===========================================
// Reactive component for blog overview with pagination

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { Loaders } from "./loaders.js";
import { html, join, Reactive, trusted } from "./reactive.js";
import { Templates } from "./templates.js";

export class BlogList extends Reactive.Component {
	currentPageNumber = 1;

	constructor(page = 1) {
		super();
		this.currentPageNumber = page;
		this.initState();
		this.mountTo("main-content");

		// Load blog posts
		this._loadPosts();
	}

	state() {
		const data = Context.get();

		return {
			loading: true,
			posts: [],
			postsPerPage: data?.blog?.postsPerPage || 5,
			currentPage: this.currentPageNumber,

			// Computed values
			totalPages: () =>
				Math.ceil(this.posts.get().length / this.postsPerPage.get()),
			paginatedPosts: () => {
				const posts = this.posts.get();
				const perPage = this.postsPerPage.get();
				const page = this.currentPage.get();
				const start = (page - 1) * perPage;
				return posts.slice(start, start + perPage);
			},

			// Computed display content
			displayContent: () => {
				if (this.loading.get()) {
					return Templates.loadingSpinner();
				}

				const posts = this.paginatedPosts.get();
				if (posts.length === 0) {
					return html`
                        <div class="blog-container">
                            <p class="blog-empty">${i18n.t("blog.noPosts")}</p>
                        </div>`;
				}

				return html`
                    <div class="blog-container">
                        <div class="blog-posts">
                            ${this._renderPosts()}
                        </div>
                        ${this._renderPagination()}
                    </div>`;
			},
		};
	}

	template() {
		return html`<div data-html="displayContent"></div>`;
	}

	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	navigateToPost(e) {
		// Ignore clicks on links and tags
		if (e.target.closest("a") || e.target.closest(".clickable-tag")) return;

		// Find the blog post link in the clicked card
		const card = e.target.closest(".blog-post-card");
		if (!card) return;

		const link = card.querySelector(".blog-post-title a");
		if (link) {
			e.preventDefault();
			const href = link.getAttribute("href");
			window.history.pushState({}, "", href);
			import("./routing.js").then(({ Router }) => Router.handleRoute());
		}
	}

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	async _loadPosts() {
		try {
			const data = Context.get();
			const posts = await Loaders._loadBlogPosts(data);

			this.batch(() => {
				this.posts.set(posts);
				this.loading.set(false);
			});

			// Set page title
			document.title = `${data.blog?.title || "Blog"} - ${data.site?.title || CONSTANTS.DEFAULT_TITLE}`;
		} catch (error) {
			console.error("Error loading blog posts:", error);
			this.batch(() => {
				this.posts.set([]);
				this.loading.set(false);
			});
		}
	}

	_renderPosts() {
		const posts = this.paginatedPosts.get();
		const currentPage = this.currentPage.get();
		const postsPerPage = this.postsPerPage.get();
		const startIndex = (currentPage - 1) * postsPerPage;

		return trusted(
			posts
				.map(
					(post, index) =>
						this._tplBlogPostCard(post, startIndex + index).content,
				)
				.join(""),
		);
	}

	_renderPagination() {
		const currentPage = this.currentPage.get();
		const totalPages = this.totalPages.get();

		return this._tplBlogPagination(currentPage, totalPages);
	}

	// ===========================================
	// TEMPLATE METHODS
	// ===========================================

	_tplBlogPostCard(post, index) {
		return html`
        <article class="blog-post-card" data-index="${index}" data-on-click="navigateToPost">
            <h2 class="blog-post-title">
                <a href="/blog/${post.slug}" data-spa-route="blog">${post.title}</a>
            </h2>
            <div class="blog-post-meta">
                <span class="blog-post-date"><i class="fas fa-calendar"></i> ${post.date}</span>
                ${post.tags?.length ? html`<span class="blog-post-tags">${this._tplTagList(post.tags)}</span>` : ""}
            </div>
            <p class="blog-post-excerpt">${post.excerpt}</p>
        </article>`;
	}

	_tplBlogPagination(currentPage, totalPages) {
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
					html`<li class="page-item${activeClass}"><a class="page-link" href="/blog/page/${i}" data-spa-route="page">${i}</a></li>`
						.content,
				);
				lastAdded = i;
			}
		}

		const prevDisabled = currentPage === 1 ? " disabled" : "";
		const nextDisabled = currentPage === totalPages ? " disabled" : "";

		return html`<nav class="blog-pagination" aria-label="Blog pagination"><ul class="pagination">
            <li class="page-item${prevDisabled}">
                <a class="page-link" href="/blog/page/${currentPage - 1}" data-spa-route="page" aria-label="Previous">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            ${trusted(pageNumbers.join(""))}
            <li class="page-item${nextDisabled}">
                <a class="page-link" href="/blog/page/${currentPage + 1}" data-spa-route="page" aria-label="Next">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul></nav>`;
	}

	_tplTagList(tags) {
		if (!tags?.length) return html``;

		const tagElements = tags.map(
			(tag) =>
				html`<span class="item-tag clickable-tag" data-search-tag="${tag}">${tag}</span>`,
		);
		return join(tagElements, " ");
	}
}
