// ===========================================
// CONTACT FORM COMPONENT
// ===========================================
// Reactive contact form modal with EmailJS integration

import { CONSTANTS } from "./constants.js";
import { Context } from "./context.js";
import emailjs from "./dependencies/@emailjs/browser.js";
import { i18n } from "./i18n.js";
import { html, Reactive } from "./reactive.js";

export class ContactForm extends Reactive.Component {
	initialized = false;
	_MODAL_ID = "contact-modal";

	// Constants expected by tests
	_FIELD_IDS = {
		NAME: "contact-name",
		EMAIL: "contact-email",
		MESSAGE: "contact-message",
		FORM: "contact-form",
	};

	constructor() {
		super();
		const data = Context.get();
		const config = data?.site?.emailjs;

		if (!config?.enabled) return;

		// Append email modal to body (doesn't clear like mountTo)
		if (!document.getElementById(this._MODAL_ID)) {
			this.appendTo("body");
		}

		// Initialize EmailJS if publicKey is available
		if (config.publicKey) {
			emailjs.init(config.publicKey);
			this.initialized = true;
		}
	}

	mount() {
		// Handle escape key to close modal
		this.on(document, "keydown", (e) => {
			if (e.key === "Escape" && this.modalVisible.get()) {
				this.hide();
			}
		});

		// Listen for show event from other components
		this.on(window, "email:show", () => this.show());
	}

	// Define component state
	state() {
		return {
			// Form state
			buttonState: "send",
			buttonDisabled: false,
			statusMessage: { text: "", type: "" },
			modalVisible: false,
			modalClosing: false,

			// Form data (two-way bound)
			name: "",
			email: "",
			message: "",

			// Validation errors
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
			modalClass: () => {
				const visible = this.modalVisible.get();
				const closing = this.modalClosing.get();
				if (closing) return "contact-modal show closing";
				if (visible) return "contact-modal show";
				return "contact-modal";
			},
		};
	}

	// Template for the contact form
	template() {
		return html`
		<div class="contact-modal" id="${this._MODAL_ID}" data-class-show="modalVisible" data-class-closing="modalClosing" data-on-click="_handleModalClick">
			<div class="contact-modal-content">
				<div class="contact-modal-header">
					<h2>${i18n.t("contact.title")}</h2>
					<button class="contact-modal-close" id="contact-modal-close" aria-label="${i18n.t("contact.close")}" data-on-click="hide">
						<i class="fas fa-times"></i>
					</button>
				</div>
				<form class="contact-form" id="${this._FIELD_IDS.FORM}" data-on-submit="_handleSubmit">
					<div class="form-group">
						<label for="${this._FIELD_IDS.NAME}">${i18n.t("contact.name")}*</label>
						<input 
							type="text" 
							id="${this._FIELD_IDS.NAME}" 
							name="name" 
							required 
							aria-required="true"
							data-class-error="errors.name"
							data-model="name"
						/>
					</div>
					<div class="form-group">
						<label for="${this._FIELD_IDS.EMAIL}">${i18n.t("contact.email")}*</label>
						<input 
							type="email" 
							id="${this._FIELD_IDS.EMAIL}" 
							name="email" 
							required 
							aria-required="true"
							data-class-error="errors.email"
							data-model="email"
						/>
					</div>
					<div class="form-group">
						<label for="${this._FIELD_IDS.MESSAGE}">${i18n.t("contact.message")}*</label>
						<textarea 
							id="${this._FIELD_IDS.MESSAGE}" 
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

	show() {
		this.batch(() => {
			this.modalClosing.set(false);
			this.modalVisible.set(true);
		});

		const nameInput = document.getElementById(this._FIELD_IDS.NAME);
		if (nameInput) {
			requestAnimationFrame(() => nameInput.focus());
		}
	}

	hide() {
		if (!this.modalVisible.get()) return;

		this.modalClosing.set(true);

		setTimeout(() => {
			this.batch(() => {
				this.modalVisible.set(false);
				this.modalClosing.set(false);
				this._resetForm();
			});
		}, 200);
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

		if (!this._validateForm()) {
			return;
		}

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

			await emailjs.send(config.serviceId, config.templateId, templateParams);

			this.batch(() => {
				this.statusMessage.set({
					text: i18n.t("contact.success"),
					type: "success",
				});
				this.buttonState.set("send");
			});

			setTimeout(() => this.hide(), 2000);
		} catch (error) {
			console.error("Failed to send email:", error);
			this.batch(() => {
				this.statusMessage.set({
					text: i18n.t("contact.error"),
					type: "error",
				});
				this.buttonState.set("send");
				this.buttonDisabled.set(false);
			});
		}
	}

	_validateForm() {
		let isValid = true;
		const name = this.name.get().trim();
		const email = this.email.get().trim();
		const message = this.message.get().trim();

		this._clearFieldErrors();

		if (!name) {
			this.statusMessage.set({
				text: `${i18n.t("contact.name")}: ${i18n.t("contact.required")}`,
				type: "error",
			});
			this.errors.name.set(true);
			isValid = false;
			return isValid;
		}

		if (!email) {
			this.statusMessage.set({
				text: `${i18n.t("contact.email")}: ${i18n.t("contact.required")}`,
				type: "error",
			});
			this.errors.email.set(true);
			isValid = false;
			return isValid;
		}

		if (!this._isValidEmail(email)) {
			this.statusMessage.set({
				text: i18n.t("contact.invalidEmail"),
				type: "error",
			});
			this.errors.email.set(true);
			isValid = false;
			return isValid;
		}

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

	_isValidEmail(email) {
		const emailRegex =
			/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;
		return (
			email &&
			email.length <= 254 &&
			emailRegex.test(email) &&
			!email.includes(" ")
		);
	}

	_clearFieldErrors() {
		this.batch(() => {
			this.errors.name.set(false);
			this.errors.email.set(false);
			this.errors.message.set(false);
		});
	}

	_resetForm() {
		this.batch(() => {
			this.name.set("");
			this.email.set("");
			this.message.set("");
			this._clearFieldErrors();
			this.statusMessage.set({ text: "", type: "" });
			this.buttonState.set("send");
			this.buttonDisabled.set(false);
		});
	}
}
