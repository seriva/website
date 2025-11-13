// ===========================================
// EMAIL / CONTACT FORM
// ===========================================
// EmailJS integration for contact form

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import emailjs from "./dependencies/@emailjs/browser.js";
import { i18n } from "./i18n.js";
import { Templates } from "./templates.js";

// ===========================================
// EMAIL NAMESPACE
// ===========================================

export const Email = {
	initialized: false,

	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Initialize EmailJS and inject contact form modal
	init() {
		const data = Context.get();
		const config = data?.site?.emailjs;

		// Only initialize if enabled
		if (!config?.enabled) {
			return;
		}

		// Inject the contact form modal
		const existingModal = document.getElementById("contact-modal");
		if (!existingModal) {
			document.body.insertAdjacentHTML("beforeend", Templates.contactForm());
			// Setup event listeners only once after injection
			this._setupEventListeners();
		}

		// Initialize EmailJS only if public key is configured
		if (config.publicKey) {
			emailjs.init(config.publicKey);
			this.initialized = true;
		}
	},

	// Show contact form modal
	show() {
		const modal = document.getElementById("contact-modal");
		if (!modal) return;

		modal.classList.add("show");

		// Focus first input
		const nameInput = document.getElementById("contact-name");
		if (nameInput) {
			requestAnimationFrame(() => nameInput.focus());
		}
	},

	// Hide contact form modal
	hide() {
		const modal = document.getElementById("contact-modal");
		if (modal) {
			modal.classList.remove("show");
			this._resetForm();
		}
	},

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	_setupEventListeners() {
		const modal = document.getElementById("contact-modal");
		const closeBtn = document.getElementById("contact-modal-close");
		const form = document.getElementById("contact-form");

		// Close button
		if (closeBtn) {
			closeBtn.addEventListener("click", () => this.hide());
		}

		// Click outside to close
		if (modal) {
			modal.addEventListener("click", (e) => {
				if (e.target === modal) {
					this.hide();
				}
			});
		}

		// Form submission
		if (form) {
			form.addEventListener("submit", (e) => this._handleSubmit(e));
		}

		// ESC key to close
		document.addEventListener("keydown", (e) => {
			if (e.key === "Escape" && modal?.classList.contains("show")) {
				this.hide();
			}
		});
	},

	async _handleSubmit(e) {
		e.preventDefault();

		const data = Context.get();
		const config = data?.site?.emailjs;

		if (!this.initialized) {
			this._showError(
				"EmailJS not configured. Please add your EmailJS credentials to content.yaml to enable contact form.",
			);
			return;
		}

		// Get form data
		const form = e.target;
		const submitBtn = document.getElementById("contact-submit");
		const statusDiv = document.getElementById("contact-status");

		// Validate
		if (!this._validateForm(form)) {
			return;
		}

		// Disable submit button
		if (submitBtn) {
			submitBtn.disabled = true;
			submitBtn.textContent = i18n.t("contact.sending");
		}

		// Clear previous status
		if (statusDiv) {
			statusDiv.textContent = "";
			statusDiv.className = "form-status";
		}

		try {
			// Get form values
			const formData = new FormData(form);
			const templateParams = {
				title: data?.site?.title || CONSTANTS.DEFAULT_TITLE,
				name: formData.get("name"),
				email: formData.get("email"),
				time: new Date().toISOString(),
				message: formData.get("message"),
			};

			// Send email via EmailJS
			await emailjs.send(config.serviceId, config.templateId, templateParams);

			// Show success message
			this._showStatus(i18n.t("contact.success"), "success");

			// Reset form after delay
			setTimeout(() => this.hide(), 2000);
		} catch (error) {
			console.error("Failed to send email:", error);
			this._showStatus(i18n.t("contact.error"), "error");

			// Re-enable submit button only on error
			if (submitBtn) {
				submitBtn.disabled = false;
				submitBtn.textContent = i18n.t("contact.send");
			}
		}
	},

	_validateForm(form) {
		const nameInput = form.querySelector("#contact-name");
		const emailInput = form.querySelector("#contact-email");
		const messageInput = form.querySelector("#contact-message");

		// Clear previous errors
		this._clearFieldErrors();

		// Validate name
		if (!nameInput?.value.trim()) {
			this._showStatus(
				`${i18n.t("contact.name")}: ${i18n.t("contact.required")}`,
				"error",
			);
			nameInput?.classList.add("error");
			return false;
		}

		// Validate email
		if (!emailInput?.value.trim()) {
			this._showStatus(
				`${i18n.t("contact.email")}: ${i18n.t("contact.required")}`,
				"error",
			);
			emailInput?.classList.add("error");
			return false;
		}

		if (!this._isValidEmail(emailInput.value)) {
			this._showStatus(i18n.t("contact.invalidEmail"), "error");
			emailInput?.classList.add("error");
			return false;
		}

		// Validate message
		if (!messageInput?.value.trim()) {
			this._showStatus(
				`${i18n.t("contact.message")}: ${i18n.t("contact.required")}`,
				"error",
			);
			messageInput?.classList.add("error");
			return false;
		}

		return true;
	},

	_isValidEmail(email) {
		return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
	},

	_clearFieldErrors() {
		const inputs = ["contact-name", "contact-email", "contact-message"].map(
			(id) => document.getElementById(id),
		);

		for (const input of inputs) {
			if (input) input.classList.remove("error");
		}
	},

	_showStatus(message, type) {
		const statusDiv = document.getElementById("contact-status");
		if (statusDiv) {
			statusDiv.textContent = message;
			statusDiv.className = `form-status ${type}`;
		}
	},

	_resetForm() {
		const form = document.getElementById("contact-form");
		if (form) {
			form.reset();
			this._clearFieldErrors();

			const statusDiv = document.getElementById("contact-status");
			if (statusDiv) {
				statusDiv.textContent = "";
				statusDiv.className = "form-status";
			}

			// Reset submit button
			const submitBtn = document.getElementById("contact-submit");
			if (submitBtn) {
				submitBtn.disabled = false;
				submitBtn.textContent = i18n.t("contact.send");
			}
		}
	},
};
