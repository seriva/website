package main

import "gofront/dom"
import "js:./browser.d.ts"

var appRefs = map[string]any{}

// ── Region renders ────────────────────────────────────────────
// The app shell (including navbar, route announcer and modal shells) is mounted
// once in main(); overlay open/close, active nav, contact form and route
// announcements update in place via gom signals, while #content-slot remounts
// only when the active route changes.

func renderMain() {
	gom.Mount("#content-slot", MainContent())
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
