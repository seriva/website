// ===========================================
// PAGE COMPONENT
// ===========================================
// Reactive custom markdown page renderer

import { Context } from "../services/context.js";
import { i18n } from "../services/i18n.js";
import { MarkdownLoader } from "../services/markdown.js";
import { PrismLoader } from "../services/prism-loader.js";
import { html, Reactive, trusted } from "../utils/reactive.js";
import { Templates } from "../utils/templates.js";

export class Page extends Reactive.Component {
	pageId = null;

	constructor(pageId) {
		super();
		this.pageId = pageId;
		this.mountTo("main-content");
	}

	state() {
		return {
			// Async computed for page content with cancellation
			pageData: this.computedAsync(async (cancelToken) => {
				const content = await MarkdownLoader.loadAsHtml(
					`/data/pages/${this.pageId}.md`,
					cancelToken,
				);

				if (cancelToken?.cancelled) return null;

				if (content === null || content === undefined) {
					throw new Error(`Content not found for page: ${this.pageId}`);
				}

				return content;
			}, "pageData"),

			// Computed HTML based on loading/error state
			displayContent: () => {
				const state = this.pageData.get();

				if (state.loading) {
					return Templates.loadingSpinner();
				}

				if (state.error) {
					return Templates.errorMessage(
						i18n.t("general.notFound"),
						i18n.t("general.notFoundMessage"),
					);
				}

				return trusted(state.data);
			},
		};
	}

	mount() {
		const data = Context.get();
		document.title = data?.site?.title || "Portfolio";

		// Reactive effect: Apply syntax highlighting when content loads
		this.effect(() => {
			const state = this.pageData.get();
			if (state.data) {
				const container = this.refs.content;
				if (container) {
					PrismLoader.highlight(container);
				}
			}
		});
	}

	template() {
		return html`<div data-html="displayContent" data-ref="content"></div>`;
	}
}
