package main

import "js:./browser.d.ts"
import "strings"

// Pinned + SRI: keep version and hash in sync with @emailjs/browser in package.json
const emailJSSrc = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js"
const emailJSIntegrity = "sha384-SALc35EccAf6RzGw4iNsyj7kTPr33K7RoGzYu+7heZhT8s0GZouafRiCg1qy44AS"

func loadEmailJS() any {
	return loadScript(emailJSSrc, emailJSIntegrity)
}

func initEmailJS() {
	if site.EmailJS.Enabled && site.EmailJS.PublicKey != "" && window.emailjs != nil {
		emailjs.init(site.EmailJS.PublicKey)
	}
}

// preloadEmailJS warms the CDN script while the user types; failures are
// swallowed here and surfaced by submitContact instead.
async func preloadEmailJS() {
	defer func() {
		if r := recover(); r != nil {
			console.warn("EmailJS preload failed:", r)
		}
	}()
	await loadEmailJS()
}

// resetContactForm clears the form back to its initial state and re-renders it.
func resetContactForm() {
	contactForm = ContactState{ButtonState: "send"}
	renderContactForm()
}

func openContact() {
	if site.EmailJS.Enabled {
		preloadEmailJS()
	}
	closeMenus()
	contactOpen = true
	resetContactForm()
	syncOverlays()
	focusLater("#contact-name")
}

// closeContact hides the modal; the exit fade is CSS-only (#contact-modal transition).
// The form is reset by openContact so its contents survive the fade.
func closeContact() {
	if !contactOpen {
		return
	}
	contactOpen = false
	syncOverlays()
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
	return len(email) >= 5 && strings.Contains(email, "@") && strings.Contains(email, ".") && !strings.Contains(email, " ")
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

	await loadEmailJS()
	initEmailJS()

	await emailjs.send(site.EmailJS.ServiceId, site.EmailJS.TemplateId, params, site.EmailJS.PublicKey)

	contactForm.StatusText = t("contact.success")
	contactForm.StatusType = "success"
	contactForm.ButtonState = "send"
	renderContactForm()

	setTimeout(func() {
		closeContact()
	}, 2000)
}
