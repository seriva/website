// ===========================================
// MAIN CONTENT COMPONENT
// ===========================================
// Main content container for route components

import { html, Reactive } from "../utils/reactive.js";

export class MainContent extends Reactive.Component {
	constructor() {
		super();
		this.appendTo("body");
	}

	template() {
		return html`<main id="main-content"></main>`;
	}
}
