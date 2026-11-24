package main

import "gofront/dom"
import "js:./browser.d.ts"

var appRefs = map[string]any{}

// ── Region renders ────────────────────────────────────────────
// The app shell (including navbar and modal shells) is mounted once in main();
// overlay open/close and active nav state update in place via gom signals,
// while content regions remount only when their content changes.

func renderMain() {
	gom.Mount("#content-slot", MainContent())
}

func renderContactForm() {
	gom.Mount("#contact-form", ContactFormFields(contactForm))
}

func renderRoute() {
	renderMain()
}

// focusLater focuses the element once the overlay's open transition has started.
func focusLater(selector string) {
	setTimeout(func() {
		el := document.querySelector(selector)
		if el != nil {
			el.(dom.HTMLElement).focus()
		}
	}, 50)
}

// resetOverlays closes every overlay (used on route change).
func resetOverlays() {
	mobileMenuOpen.Set(false)
	projectsDropdownOpen.Set(false)
	contactOpen.Set(false)
	if searchOpen.Get() || searchQuery.Get() != "" {
		searchOpen.Set(false)
		setSearchQuery("")
	}
}
