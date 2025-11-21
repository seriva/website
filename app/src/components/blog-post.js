// ===========================================
// BLOG POST COMPONENT
// ===========================================
// Reactive single blog post view

import { html, join, Reactive, trusted } from "../core/reactive.js";
import { marked } from "../dependencies/marked.js";
import { Context } from "../services/context.js";
import { i18n } from "../services/i18n.js";
import { MarkdownLoader } from "../services/markdown.js";
import { PrismLoader } from "../services/prism-loader.js";
import { CONSTANTS } from "../utils/constants.js";
import { Templates } from "../utils/templates.js";
import { blogPostStyles } from "./blog-post.styles.js";

// Prevent tree-shaking
if (blogPostStyles) {
	/* no-op */
}

export class BlogPost extends Reactive.Component {
	slug = null;

	constructor(slug) {
		super();
		this.slug = slug;
		this.mountTo("main-content");
	}

	mount() {
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
			const posts = Context.getBlogPosts();
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

			const content = await this._loadBlogPostContent(post);

			this.batch(() => {
				this.post.set(post);
				this.content.set(content);
				this.loading.set(false);
			});

			// Apply syntax highlighting and add copy buttons after content is rendered
			requestAnimationFrame(async () => {
				const container = document.querySelector(".blog-post-content");
				if (container) {
					await PrismLoader.highlight(container);
				}
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
	// PRIVATE METHODS
	// ===========================================

	async _loadBlogPostContent(post) {
		try {
			// Load markdown content and parse frontmatter
			const markdownPath = `/data/blog/${post.filename}`;
			const result = await MarkdownLoader.loadWithFrontmatter(markdownPath);
			return result?.content || "";
		} catch (error) {
			console.error("Error loading blog post content:", error);
			return "";
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
