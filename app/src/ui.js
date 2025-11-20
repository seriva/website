// ===========================================
// UI INTERACTIONS
// ===========================================
// User interface utilities and event handlers

import { CONSTANTS } from "./constants.js";
import { i18n } from "./i18n.js";
import { Reactive, Signals } from "./reactive.js";

// ===========================================
// UI NAMESPACE
// ===========================================

export const UI = {
	_copyButtonComponents: new Map(),

	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Initialize all UI components
	init() {
		this.initCopyCodeButtons();
	},

	// Cleanup copy button components
	cleanupCopyButtons() {
		for (const component of this._copyButtonComponents.values()) {
			component.cleanup();
		}
		this._copyButtonComponents.clear();
	},

	// Add copy buttons to all code blocks
	initCopyCodeButtons() {
		const preBlocks = document.querySelectorAll("pre");

		for (const pre of preBlocks) {
			if (pre.querySelector(".copy-code-button")) continue;

			const codeElement = pre.querySelector("code");
			if (!codeElement) continue;

			const button = document.createElement("button");
			button.className = "copy-code-button";
			button.setAttribute("aria-label", i18n.t("aria.copyCode"));

			// Create component context for this copy button
			const component = Reactive.createComponent();

			// Create reactive button state
			const buttonState = Signals.create("copy");
			const buttonText = component.computed(
				() => i18n.t(`code.${buttonState.get()}`),
				[buttonState],
			);

			// Bind button text to signal
			component.bindText(button, buttonText);

			// Subscribe to state changes for CSS class updates
			component.track(
				buttonState.subscribe((state) => {
					button.classList.toggle("copied", state === "copied");
				}),
			);

			button.addEventListener("click", async () => {
				try {
					const code = codeElement.textContent || "";
					await navigator.clipboard.writeText(code);

					buttonState.set("copied");

					setTimeout(() => {
						buttonState.set("copy");
					}, CONSTANTS.COPY_BUTTON_RESET_MS);
				} catch (error) {
					console.error("Failed to copy code:", error);
					buttonState.set("copyFailed");
					setTimeout(() => {
						buttonState.set("copy");
					}, CONSTANTS.COPY_BUTTON_RESET_MS);
				}
			});

			pre.style.position = "relative";
			pre.appendChild(button);

			// Store component for cleanup
			this._copyButtonComponents.set(button, component);
		}
	},

	// Request fullscreen for demo iframe
	fullscreen() {
		try {
			const iframe = document.getElementById("demo");
			if (!iframe) return;

			const request =
				iframe.requestFullscreen ||
				iframe.webkitRequestFullscreen ||
				iframe.mozRequestFullScreen ||
				iframe.msRequestFullscreen;

			if (request) request.call(iframe);
		} catch (error) {
			console.error("Error requesting fullscreen:", error);
		}
	},

	// ===========================================
	// PRIVATE METHODS
	// ===========================================
	// (No private methods currently)
};
