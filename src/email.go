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
	contactForm = ContactState{ButtonState: "send"}
	renderContactForm()
	syncOverlays()
	focusLater("#contact-name")
}

func closeContact() {
	if !contactOpen {
		return
	}
	contactClosing = true
	syncOverlays()
	setTimeout(func() {
		contactOpen = false
		contactClosing = false
		contactForm = ContactState{ButtonState: "send"}
		renderContactForm()
		syncOverlays()
	}, 200)
}

// updateContactField mirrors a form field into state on every input event.
func updateContactField(field string, value string) {
	switch field {
	case "name":
		contactForm.Name = value
	case "email":
		contactForm.Email = value
	case "message":
		contactForm.Message = value
	}
}

func isValidEmail(email string) bool {
	if len(email) < 5 || !strings.Contains(email, "@") || !strings.Contains(email, ".") || strings.Contains(email, " ") {
		return false
	}
	return true
}

// validateContact trims the fields and sets error flags/status text.
// It returns the updated state and whether the form can be submitted.
func validateContact(form ContactState) (ContactState, bool) {
	form.Name = strings.TrimSpace(form.Name)
	form.Email = strings.TrimSpace(form.Email)
	form.Message = strings.TrimSpace(form.Message)
	form.ErrName = false
	form.ErrEmail = false
	form.ErrMessage = false
	form.StatusText = ""
	form.StatusType = ""

	switch {
	case form.Name == "":
		form.ErrName = true
		form.StatusText = t("contact.name") + ": " + t("contact.required")
	case form.Email == "":
		form.ErrEmail = true
		form.StatusText = t("contact.email") + ": " + t("contact.required")
	case !isValidEmail(form.Email):
		form.ErrEmail = true
		form.StatusText = t("contact.invalidEmail")
	case form.Message == "":
		form.ErrMessage = true
		form.StatusText = t("contact.message") + ": " + t("contact.required")
	default:
		return form, true
	}
	form.StatusType = "error"
	return form, false
}

async func submitContact() {
	form, ok := validateContact(contactForm)
	contactForm = form
	if !ok {
		renderContactForm()
		return
	}

	contactForm.ButtonState = "sending"
	contactForm.ButtonDisabled = true
	renderContactForm()

	params := map[string]any{
		"title":   site.Title,
		"name":    contactForm.Name,
		"email":   contactForm.Email,
		"message": contactForm.Message,
	}

	defer func() {
		if r := recover(); r != nil {
			contactForm.ButtonDisabled = false
			contactForm.ButtonState = "send"
			contactForm.StatusText = t("contact.error")
			contactForm.StatusType = "error"
			renderContactForm()
		}
	}()

	await emailjs.send(site.EmailJS.ServiceId, site.EmailJS.TemplateId, params, site.EmailJS.PublicKey)

	contactForm.StatusText = t("contact.success")
	contactForm.StatusType = "success"
	contactForm.ButtonState = "send"
	renderContactForm()

	setTimeout(func() {
		closeContact()
	}, 2000)
}
