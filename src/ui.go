package main

import "js:./browser.d.ts"
import "strconv"

// ── Region renders ────────────────────────────────────────────
// The app shell is mounted once in main(); these re-render only the
// region that depends on the state that changed.

func renderMain() {
	gom.Mount("#content-slot", MainContent())
}

func renderNavbar() {
	gom.Mount("#navbar-slot", Navbar(route, navPages, projects, projectsDropdownOpen, mobileMenuOpen, site))
}

func renderContactForm() {
	gom.Mount("#contact-form", ContactFormFields(contactForm))
}

func renderRoute() {
	renderNavbar()
	renderMain()
}

// ── Overlay reconciliation ────────────────────────────────────

func setClass(selector string, cls string, on bool) {
	el := document.querySelector(selector)
	if el != nil {
		el.classList.toggle(cls, on)
	}
}

func setAttr(selector string, name string, value string) {
	el := document.querySelector(selector)
	if el != nil {
		el.setAttribute(name, value)
	}
}

// focusLater focuses the element once the overlay's open transition has started.
func focusLater(selector string) {
	setTimeout(func() {
		el := document.querySelector(selector)
		if el != nil {
			el.focus()
		}
	}, 50)
}

// syncOverlays applies overlay state to the existing elements instead of
// remounting them, so the CSS max-height/keyframe transitions still play.
func syncOverlays() {
	setClass(".navbar-toggle", "active", mobileMenuOpen)
	setAttr(".navbar-toggle", "aria-expanded", strconv.FormatBool(mobileMenuOpen))
	setClass(".navbar-collapse", "show", mobileMenuOpen)

	setClass(".dropdown", "show", projectsDropdownOpen)
	setAttr(".dropdown-toggle", "aria-expanded", strconv.FormatBool(projectsDropdownOpen))

	setClass("#search-page", "show", searchOpen)
	setClass("#search-page-clear", "show", searchQuery != "")
	setClass("#contact-modal", "show", contactOpen)
}

// resetOverlays closes every overlay without animation (used on route change).
func resetOverlays() {
	mobileMenuOpen = false
	projectsDropdownOpen = false
	contactOpen = false
	if searchOpen || searchQuery != "" {
		searchOpen = false
		setSearchQuery("")
	}
	syncOverlays()
}
