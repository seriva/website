// ===========================================
// FOOTER COMPONENT
// ===========================================
// Reactive footer with copyright information

import { Context } from "./context.js";
import { i18n } from "./i18n.js";
import { html, Reactive } from "./reactive.js";

export class Footer extends Reactive.Component {
	constructor() {
		super();
		this.mountTo("footer-container");
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

	template() {
		return html`
		<footer class="footer">
			<div class="footer-container">
				<p class="footer-text" data-text="copyrightText"></p>
			</div>
		</footer>`;
	}
}
