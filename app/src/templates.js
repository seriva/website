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
	// SHARED UTILITY TEMPLATES
	// ===========================================

	// Giscus comments integration (shared by BlogPost and Project)
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

	// Loading spinner (shared by all content components)
	loadingSpinner: () => html`<div class="loading-spinner">${i18n.t("general.loading")}</div>`,

	// Error message (shared by all content components)
	errorMessage: (title, message) => html`
		<div class="error-message">
			<h1>${title}</h1>
			<p>${message}</p>
		</div>`,

	// Markdown renderer (used by markdown.js loader)
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

	// GitHub README error message
	githubReadmeError: () => html`<p>${i18n.t("project.readmeError")}</p>`,
};


