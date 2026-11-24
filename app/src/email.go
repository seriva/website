package main

import "gofront/dom"
import "js:./browser.d.ts"
import "strings"

// Pinned + SRI: keep version and hash in sync with @emailjs/browser in package.json
const emailJSSrc = "https://cdn.jsdelivr.net/npm/@emailjs/browser@5.0.2/dist/email.min.js"
const emailJSIntegrity = "sha384-V6KRexbfAf9Omg2u7kh3sclVxYiK5mAuz/6E4WmpSQ3KO+ZjgX7SCoqhMOrLKfeG"

func loadEmailJS() any {
	return loadScript(emailJSSrc, emailJSIntegrity)
}

func initEmailJS() {
	if site.EmailJS.Enabled && site.EmailJS.PublicKey != "" && any(window).(WindowGlobals).emailjs != nil {
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

// resetContactForm clears the form inputs and resets state back to initial defaults.
func resetContactForm() {
	if formEl := document.querySelector("#contact-form"); formEl != nil {
		formEl.(dom.HTMLFormElement).reset()
	}
	contactForm.Set(ContactState{ButtonState: "send"})
}

func openContact() {
	if site.EmailJS.Enabled {
		preloadEmailJS()
	}
	closeMenus()
	contactOpen.Set(true)
	resetContactForm()
	focusLater("#contact-name")
}

// closeContact hides the modal; the exit fade is CSS-only (#contact-modal transition).
// The form is reset by openContact so its contents survive the fade.
func closeContact() {
	contactOpen.Set(false)
}

// updateContactField mirrors a form field into state on every input event.
func updateContactField(field string, value string) {
	form := contactForm.Get()
	switch field {
	case "name":
		form.Name = value
	case "email":
		form.Email = value
	case "message":
		form.Message = value
	default:
		return
	}
	contactForm.Set(form)
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
	form, ok := validateContact(contactForm.Get())
	if !ok {
		contactForm.Set(form)
		return
	}

	form.ButtonState = "sending"
	form.ButtonDisabled = true
	contactForm.Set(form)

	params := map[string]any{
		"title":   site.Title,
		"name":    form.Name,
		"email":   form.Email,
		"message": form.Message,
	}

	defer func() {
		if r := recover(); r != nil {
			f := contactForm.Get()
			f.ButtonDisabled = false
			f.ButtonState = "send"
			f.StatusText = t("contact.error")
			f.StatusType = "error"
			contactForm.Set(f)
		}
	}()

	await loadEmailJS()
	initEmailJS()

	await emailjs.send(site.EmailJS.ServiceId, site.EmailJS.TemplateId, params, site.EmailJS.PublicKey)

	f := contactForm.Get()
	f.StatusText = t("contact.success")
	f.StatusType = "success"
	f.ButtonState = "send"
	contactForm.Set(f)

	setTimeout(func() {
		closeContact()
	}, 2000)
}
