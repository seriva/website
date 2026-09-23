package main

import "js:./browser.d.ts"
import "strings"

var contactClosing bool

func initEmailJS() {
	if site.EmailJS.Enabled && site.EmailJS.PublicKey != "" {
		emailjs.init(site.EmailJS.PublicKey)
	}
}

func openContact() {
	contactOpen = true
	contactClosing = false
	contactForm = ContactState{
		ButtonState:    "send",
		ButtonDisabled: false,
	}
	document.documentElement.classList.add("modal-open")
	document.body.classList.add("modal-open")
	modalEl := document.querySelector("#contact-modal")
	if modalEl != nil {
		modalEl.classList.remove("closing")
		modalEl.classList.add("show")
	}
	setTimeout(func() {
		inp := document.querySelector("#contact-name")
		if inp != nil {
			inp.focus()
		}
	}, 50)
}

func closeContact() {
	if !contactOpen {
		return
	}
	contactClosing = true
	modalEl := document.querySelector("#contact-modal")
	if modalEl != nil {
		modalEl.classList.add("closing")
	}
	setTimeout(func() {
		contactOpen = false
		contactClosing = false
		contactForm = ContactState{
			ButtonState:    "send",
			ButtonDisabled: false,
		}
		if modalEl != nil {
			modalEl.classList.remove("show")
			modalEl.classList.remove("closing")
		}
		document.documentElement.classList.remove("modal-open")
		document.body.classList.remove("modal-open")
	}, 200)
}

func isValidEmail(email string) bool {
	if len(email) < 5 || !strings.Contains(email, "@") || !strings.Contains(email, ".") || strings.Contains(email, " ") {
		return false
	}
	return true
}

async func submitContact() {
	nameInput := document.querySelector("#contact-name")
	emailInput := document.querySelector("#contact-email")
	messageInput := document.querySelector("#contact-message")

	name := ""
	email := ""
	message := ""

	if nameInput != nil {
		name = strings.TrimSpace(nameInput.value)
	}
	if emailInput != nil {
		email = strings.TrimSpace(emailInput.value)
	}
	if messageInput != nil {
		message = strings.TrimSpace(messageInput.value)
	}

	contactForm.Name = name
	contactForm.Email = email
	contactForm.Message = message
	contactForm.ErrName = false
	contactForm.ErrEmail = false
	contactForm.ErrMessage = false
	contactForm.StatusText = ""
	contactForm.StatusType = ""

	if name == "" {
		contactForm.ErrName = true
		contactForm.StatusText = t("contact.name") + ": " + t("contact.required")
		contactForm.StatusType = "error"
		render()
		return
	}

	if email == "" {
		contactForm.ErrEmail = true
		contactForm.StatusText = t("contact.email") + ": " + t("contact.required")
		contactForm.StatusType = "error"
		render()
		return
	}

	if !isValidEmail(email) {
		contactForm.ErrEmail = true
		contactForm.StatusText = t("contact.invalidEmail")
		contactForm.StatusType = "error"
		render()
		return
	}

	if message == "" {
		contactForm.ErrMessage = true
		contactForm.StatusText = t("contact.message") + ": " + t("contact.required")
		contactForm.StatusType = "error"
		render()
		return
	}

	contactForm.ButtonState = "sending"
	contactForm.ButtonDisabled = true
	render()

	params := map[string]any{
		"title":   site.Title,
		"name":    name,
		"email":   email,
		"message": message,
	}

	errHappened := false
	defer func() {
		if r := recover(); r != nil {
			errHappened = true
			contactForm.ButtonDisabled = false
			contactForm.ButtonState = "send"
			contactForm.StatusText = t("contact.error")
			contactForm.StatusType = "error"
			render()
		}
	}()

	sendRes := await emailjs.send(site.EmailJS.ServiceId, site.EmailJS.TemplateId, params, site.EmailJS.PublicKey)
	if sendRes == nil && errHappened {
		return
	}

	contactForm.StatusText = t("contact.success")
	contactForm.StatusType = "success"
	contactForm.ButtonState = "send"
	render()

	setTimeout(func() {
		closeContact()
	}, 2000)
}
