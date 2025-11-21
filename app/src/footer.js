// ===========================================
// FOOTER COMPONENT
// ===========================================
// Reactive footer with copyright information

import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { css, html, Reactive } from "./reactive.js";

export class Footer extends Reactive.Component {
	constructor() {
		super();
		this.appendTo("body");
	}

	state() {
		const data = Context.get();
		return {
			currentYear: new Date().getFullYear(),
			authorName: data?.site?.author || "Portfolio Owner",
			copyrightText: () =>
				`© ${this.currentYear.get()} ${this.authorName.get()}. ${i18n.t("footer.rights")}.`,
		};
	}

	styles() {
		return css`
			margin-top: auto;
			margin-bottom: 0;
			padding: 1rem 0;
			background-color: transparent;
			flex-shrink: 0;
			max-width: 1000px;
			margin-inline: auto;
			text-align: center;
			color: var(--text-light);
			font-size: 0.9em;
		`;
	}

	template() {
		return html`<footer data-text="copyrightText"></footer>`;
	}
}
