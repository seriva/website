// ===========================================
// BLOG POST COMPONENT
// ===========================================
// Reactive single blog post view

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import { marked } from "./dependencies/marked.js";
import { i18n } from "./i18n.js";
import { Loaders } from "./loaders.js";
import { MarkdownLoader } from "./markdown.js";
import { html, join, Reactive, trusted } from "./reactive.js";
import { Templates } from "./templates.js";

export class BlogPost extends Reactive.Component {
	slug = null;

	constructor(slug) {
		super();
		this.slug = slug;
		this.initState();
		this.mountTo("main-content");

		// Load post content
		this._loadPost();
	}

	state() {
		const data = Context.get();

		return {
			loading: true,
			post: null,
			content: "",
			error: null,
			commentsConfig: data?.site?.comments,

			// Computed display content
			displayContent: () => {
				if (this.loading.get()) {
					return Templates.loadingSpinner();
				}

				if (this.error.get()) {
					return Templates.errorMessage(
						i18n.t("general.blogNotFound"),
						i18n.t("general.blogNotFoundMessage"),
					);
				}

				const post = this.post.get();
				const content = this.content.get();
				const commentsHtml = Templates.giscusComments(
					this.commentsConfig.get(),
					"blog",
				);

				return html`
                    ${this._tplBlogPost(post, content)}
                    ${commentsHtml}
                `;
			},
		};
	}

	template() {
		return html`<div data-html="displayContent"></div>`;
	}

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	async _loadPost() {
		try {
			const data = Context.get();
			const posts = await Loaders._loadBlogPosts(data);
			const post = posts.find(
				(p) => p.slug === this.slug || p.id === this.slug,
			);

			if (!post) {
				this.batch(() => {
					this.error.set(true);
					this.loading.set(false);
				});
				return;
			}

			const content = await Loaders._loadBlogPostContent(post);

			this.batch(() => {
				this.post.set(post);
				this.content.set(content);
				this.loading.set(false);
			});

			// Add copy buttons after content is rendered
			requestAnimationFrame(() => {
				MarkdownLoader.initCopyCodeButtons();
			});

			// Set page title
			document.title = `${post.title} - ${data.site?.title || CONSTANTS.DEFAULT_TITLE}`;
		} catch (error) {
			console.error("Error loading blog post:", error);
			this.batch(() => {
				this.error.set(true);
				this.loading.set(false);
			});
		}
	}

	// ===========================================
	// TEMPLATE METHODS
	// ===========================================

	_tplBlogPost(post, content) {
		return html`
            <h1 class="project-title">${post.title}</h1>
            <p class="project-description">${post.date}</p>
            ${post.tags?.length ? html`<div class="project-tags">${this._tplTagList(post.tags)}</div>` : ""}
            <div class="blog-post-content">
                ${this._tplMarkdown(content)}
            </div>`;
	}

	_tplMarkdown(content) {
		try {
			const htmlContent = marked.parse(content);
			return trusted(`<div class="markdown-body">${htmlContent}</div>`);
		} catch (error) {
			console.error("Error rendering markdown:", error);
			return html`<div class="markdown-body"><p>Error rendering markdown</p></div>`;
		}
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
