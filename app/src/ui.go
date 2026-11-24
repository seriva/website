package main

import "gofront/dom"
import "js:./browser.d.ts"

var appRefs = map[string]any{}

func refElem(name string) dom.Element {
	if el := appRefs[name]; el != nil {
		return el.(dom.Element)
	}
	return nil
}

// ── Region renders ────────────────────────────────────────────
// The app shell (including navbar, route announcer and modal shells) is mounted
// once in main(); overlay open/close, active nav, contact form and route
// announcements update in place via gom signals, while #content-slot remounts
// only when the active route changes.

func renderMain() {
	gom.Mount("#content-slot", MainContent(), appRefs)
}

func renderRoute() {
	renderMain()
}

// focusLater focuses a ref'd element once its overlay's open transition starts.
func focusLater(refName string) {
	setTimeout(func() {
		if el := refElem(refName); el != nil {
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
