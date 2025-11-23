// ===========================================
// PAGE COMPONENT
// ===========================================
// Reactive custom markdown page renderer

import { Context } from "../services/context.js";
import { i18n } from "../services/i18n.js";
import { MarkdownLoader } from "../services/markdown.js";
import { html, Reactive, trusted } from "../utils/reactive.js";
import { Templates } from "../utils/templates.js";

export class Page extends Reactive.Component {
	pageId = null;

	constructor(pageId) {
		super();
		this.pageId = pageId;
		this.mountTo("main-content");
	}

	mount() {
		this._loadContent();
	}

	state() {
		return {
			loading: true,
			content: "",
			error: null,

			// Computed HTML based on loading/error state
			displayContent: () => {
				if (this.loading.get()) {
					return Templates.loadingSpinner();
				}

				if (this.error.get()) {
					return Templates.errorMessage(
						i18n.t("general.notFound"),
						i18n.t("general.notFoundMessage"),
					);
				}

				return trusted(this.content.get());
			},
		};
	}

	template() {
		return html`<div data-html="displayContent"></div>`;
	}

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	async _loadContent() {
		try {
			const data = Context.get();
			document.title = data?.site?.title || "Portfolio";

			const content = await MarkdownLoader.loadAsHtml(
				`/data/pages/${this.pageId}.md`,
			);
			if (content !== null && content !== undefined) {
				this.batch(() => {
					this.content.set(content);
					this.loading.set(false);
				});

				// Add copy buttons after content is rendered
				requestAnimationFrame(() => {
					MarkdownLoader.initCopyCodeButtons();
				});
			} else {
				console.warn("Content is null or undefined for page:", this.pageId);
				this.batch(() => {
					this.error.set(true);
					this.loading.set(false);
				});
			}
		} catch (error) {
			console.error(`Error loading page ${this.pageId}:`, error);
			this.batch(() => {
				this.error.set(true);
				this.loading.set(false);
			});
		}
	}
}
