// ===========================================
// BLOG POST COMPONENT
// ===========================================
// Reactive single blog post view

import { marked } from "../dependencies/marked.js";
import { Context } from "../services/context.js";
import { i18n } from "../services/i18n.js";
import { MarkdownLoader } from "../services/markdown.js";
import { PrismLoader } from "../services/prism-loader.js";
import { CONSTANTS } from "../utils/constants.js";
import { html, join, Reactive, trusted } from "../utils/reactive.js";
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

	state() {
		const data = Context.get();
		const posts = Context.getBlogPosts();
		const post = posts.find((p) => p.slug === this.slug || p.id === this.slug);

		return {
			post,
			commentsConfig: data?.site?.comments,

			// Async computed for blog post content with cancellation
			postData: this.computedAsync(async (cancelToken) => {
				if (!post) {
					throw new Error("Post not found");
				}

				const content = await this._loadBlogPostContent(post, cancelToken);
				if (cancelToken?.cancelled) return null;

				return { post, content };
			}, "postData"),

			// Computed display content
			displayContent: () => {
				const state = this.postData.get();
				const currentPost = this.post.get();

				if (!currentPost) {
					return Templates.errorMessage(
						i18n.t("general.blogNotFound"),
						i18n.t("general.blogNotFoundMessage"),
					);
				}

				if (state.loading) {
					return Templates.loadingSpinner();
				}

				if (state.error) {
					return Templates.errorMessage(
						i18n.t("general.blogNotFound"),
						i18n.t("general.blogNotFoundMessage"),
					);
				}

				return trusted(this._renderSections(state));
			},
		};
	}

	mount() {
		const data = Context.get();
		const post = this.post.get();

		if (post) {
			// Set page title
			document.title = `${post.title} - ${data.site?.title || CONSTANTS.DEFAULT_TITLE}`;
		}

		// Reactive effect: Apply syntax highlighting when content loads
		this.effect(() => {
			const state = this.postData.get();
			if (!state.data?.content) return;

			// Find container element directly from DOM
			const mainContent = document.getElementById("main-content");
			const container = mainContent?.querySelector('[data-ref="container"]');
			if (!container) return;

			// Use RAF to ensure browser has processed the HTML
			//requestAnimationFrame(() => {
				PrismLoader.highlight(container);
			//});
		});
	}

	template() {
		return html`<div data-html="displayContent" data-ref="container"></div>`;
	}

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	async _loadBlogPostContent(post, cancelToken = null) {
		try {
			// Load markdown content and parse frontmatter
			const markdownPath = `/data/blog/${post.filename}`;
			const result = await MarkdownLoader.loadWithFrontmatter(
				markdownPath,
				cancelToken,
			);
			if (cancelToken?.cancelled) return "";
			return result?.content || "";
		} catch (error) {
			if (cancelToken?.cancelled) return "";
			console.error("Error loading blog post content:", error);
			return "";
		}
	}

	_renderSections(state) {
		const post = this.post.get();
		if (!post) return "";

		const { content } = state.data;
		const sections = [
			this._tplBlogPostHeader(post.title, post.date, post.tags),
			this._tplMarkdown(content),
			Templates.giscusComments(this.commentsConfig.get(), "blog"),
		];

		return sections
			.filter(Boolean)
			.map((section) => section.content)
			.join("");
	}

	// ===========================================
	// TEMPLATE METHODS
	// ===========================================

	_tplBlogPostHeader(title, date, tags) {
		const tagsHtml = tags?.length
			? html`<div class="project-tags">${this._tplTagList(tags)}</div>`
			: "";
		return html`
            <h1 class="project-title">${title}</h1>
            <p class="project-description">${date}</p>
            ${tagsHtml}
            <div class="blog-post-content">`;
	}

	_tplMarkdown(content) {
		try {
			const htmlContent = marked.parse(content);
			return trusted(`<div class="markdown-body">${htmlContent}</div></div>`);
		} catch (error) {
			console.error("Error rendering markdown:", error);
			return trusted(
				'<div class="markdown-body"><p>Error rendering markdown</p></div></div>',
			);
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
