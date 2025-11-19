// ===========================================
// EMAIL / CONTACT FORM
// ===========================================
// EmailJS integration for contact form

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import emailjs from "./dependencies/@emailjs/browser.js";
import { i18n } from "./i18n.js";
import { html, Reactive } from "./reactive.js";

class EmailController extends Reactive.Component {
	initialized = false;
	_MODAL_ID = "contact-modal";
	_NAME_ID = "contact-name";

	// Define component state
	state() {
		return {
			// Form state
			buttonState: "send",
			buttonDisabled: false,
			statusMessage: { text: "", type: "" },

			// Form data (two-way bound)
			name: "",
			email: "",
			message: "",

			// Validation errors (explicit nested signals)
			errors: {
				name: this.signal(false),
				email: this.signal(false),
				message: this.signal(false),
			},

			// Computed values
			statusText: () => html`<span>${this.statusMessage.get().text}</span>`,
			statusClass: () => {
				const status = this.statusMessage.get();
				return status.type ? `form-status ${status.type}` : "form-status";
			},
			buttonText: () => i18n.t(`contact.${this.buttonState.get()}`),
		};
	}

	// Template for the contact form
	template() {
		return html`
		<div class="contact-modal" id="contact-modal" data-on-click="_handleModalClick">
			<div class="contact-modal-content">
				<div class="contact-modal-header">
					<h2>${i18n.t("contact.title")}</h2>
					<button class="contact-modal-close" id="contact-modal-close" aria-label="${i18n.t("contact.close")}" data-on-click="hide">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<form class="contact-form" id="contact-form" data-on-submit="_handleSubmit">
					<div class="form-group">
						<label for="contact-name">${i18n.t("contact.name")}*</label>
						<input 
							type="text" 
							id="contact-name" 
							name="name" 
							required 
							aria-required="true"
							data-class-error="errors.name"
							data-model="name"
						/>
					</div>
					<div class="form-group">
						<label for="contact-email">${i18n.t("contact.email")}*</label>
						<input 
							type="email" 
							id="contact-email" 
							name="email" 
							required 
							aria-required="true"
							data-class-error="errors.email"
							data-model="email"
						/>
					</div>
					<div class="form-group">
						<label for="contact-message">${i18n.t("contact.message")}*</label>
						<textarea 
							id="contact-message" 
							name="message" 
							rows="6" 
							required 
							aria-required="true"
							data-class-error="errors.message"
							data-model="message"
						></textarea>
					</div>
					<div class="form-status" id="contact-status" data-html="statusText" data-attr-class="statusClass"></div>
					<button type="submit" class="btn btn-primary" id="contact-submit" data-text="buttonText" data-bool-disabled="buttonDisabled">
						${i18n.t("contact.send")}
					</button>
				</form>
			</div>
		</div>
		`;
	}

	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Initialize EmailJS and inject contact form modal
	init() {
		const data = Context.get();
		const config = data?.site?.emailjs;

		// Only initialize if enabled
		if (!config?.enabled) return;

		// Initialize reactive state (now that i18n is ready)
		this.initState();

		// Inject the contact form modal if not already present
		if (!document.getElementById(this._MODAL_ID)) {
			const modal = this.render();
			document.body.appendChild(modal);

			// ESC key to close (must be global)
			document.addEventListener("keydown", (e) => {
				if (e.key === "Escape" && modal.classList.contains("show")) {
					this.hide();
				}
			});
		}

		// Initialize EmailJS only if public key is configured
		if (config.publicKey) {
			emailjs.init(config.publicKey);
			this.initialized = true;
		}
	}

	// Show contact form modal
	show() {
		const modal = document.getElementById(this._MODAL_ID);
		if (!modal) return;

		modal.classList.remove("closing");
		modal.classList.add("show");

		// Focus first input after animation starts
		const nameInput = document.getElementById(this._NAME_ID);
		if (nameInput) {
			requestAnimationFrame(() => nameInput.focus());
		}
	}

	// Hide contact form modal with animation
	hide() {
		const modal = document.getElementById(this._MODAL_ID);
		if (!modal) return;

		modal.classList.add("closing");

		// Wait for animation to complete before hiding
		setTimeout(() => {
			modal.classList.remove("show", "closing");
			this._resetForm();
		}, 200); // Match animation duration
	}

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	_handleModalClick(e) {
		if (e.target.id === this._MODAL_ID) {
			this.hide();
		}
	}

	async _handleSubmit(e) {
		e.preventDefault();

		const data = Context.get();
		const config = data?.site?.emailjs;

		if (!this.initialized) {
			this.statusMessage.set({
				text: "EmailJS not configured. Please add your EmailJS credentials to content.yaml to enable contact form.",
				type: "error",
			});
			return;
		}

		// Validate
		if (!this._validateForm()) {
			return;
		}

		// Disable submit button and clear status reactively
		this.buttonDisabled.set(true);
		this.buttonState.set("sending");
		this.statusMessage.set({ text: "", type: "" });

		try {
			const templateParams = {
				title: data?.site?.title || CONSTANTS.DEFAULT_TITLE,
				name: this.name.get(),
				email: this.email.get(),
				time: new Date().toISOString(),
				message: this.message.get(),
			};

			// Send email via EmailJS
			await emailjs.send(config.serviceId, config.templateId, templateParams);

			// Show success message
			this.batch(() => {
				this.statusMessage.set({
					text: i18n.t("contact.success"),
					type: "success",
				});
				this.buttonState.set("send");
			});

			// Reset form after delay
			setTimeout(() => this.hide(), 2000);
		} catch (error) {
			console.error("Failed to send email:", error);
			this.batch(() => {
				this.statusMessage.set({
					text: i18n.t("contact.error"),
					type: "error",
				});
				this.buttonState.set("send");

				// Re-enable submit button only on error
				this.buttonDisabled.set(false);
			});
		}
	}

	_validateForm() {
		let isValid = true;
		const name = this.name.get().trim();
		const email = this.email.get().trim();
		const message = this.message.get().trim();

		// Reset all errors first
		this.errors.name.set(false);
		this.errors.email.set(false);
		this.errors.message.set(false);

		// Validate name
		if (!name) {
			this.statusMessage.set({
				text: `${i18n.t("contact.name")}: ${i18n.t("contact.required")}`,
				type: "error",
			});
			this.errors.name.set(true);
			isValid = false;
			return isValid; // Stop at first error for status message clarity
		}

		// Validate email
		if (!email) {
			this.statusMessage.set({
				text: `${i18n.t("contact.email")}: ${i18n.t("contact.required")}`,
				type: "error",
			});
			this.errors.email.set(true);
			isValid = false;
			return isValid;
		}

		// RFC 5322 compliant email validation with max length check
		const emailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
		if (!email || email.length > 254 || !emailRegex.test(email) || email.includes(" ")) {
			this.statusMessage.set({
				text: i18n.t("contact.invalidEmail"),
				type: "error",
			});
			this.errors.email.set(true);
			isValid = false;
			return isValid;
		}

		// Validate message
		if (!message) {
			this.statusMessage.set({
				text: `${i18n.t("contact.message")}: ${i18n.t("contact.required")}`,
				type: "error",
			});
			this.errors.message.set(true);
			isValid = false;
			return isValid;
		}

		return isValid;
	}

	_resetForm() {
		this.batch(() => {
			this.name.set("");
			this.email.set("");
			this.message.set("");
			this.errors.name.set(false);
			this.errors.email.set(false);
			this.errors.message.set(false);
			this.statusMessage.set({ text: "", type: "" });
			this.buttonState.set("send");
			this.buttonDisabled.set(false);
		});
	}
}

export const Email = new EmailController();
