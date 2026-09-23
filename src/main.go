package main

import "js:./browser.d.ts"
import "strings"

func toggleProjectsDropdown() {
	projectsDropdownOpen = !projectsDropdownOpen
	syncOverlays()
}

func closeProjectsDropdown() {
	if !projectsDropdownOpen {
		return
	}
	projectsDropdownOpen = false
	syncOverlays()
}

func toggleMobileMenu() {
	mobileMenuOpen = !mobileMenuOpen
	syncOverlays()
}

func closeMobileMenu() {
	if !mobileMenuOpen {
		return
	}
	mobileMenuOpen = false
	syncOverlays()
}

func setupEvents() {
	app := document.querySelector("#app")
	if app == nil {
		return
	}

	// Click delegation on #app
	app.addEventListener("click", func(e any) {
		target := e.target

		// Tag click
		tagEl := target.closest("[data-search-tag]")
		if tagEl != nil {
			e.preventDefault()
			e.stopPropagation()
			tag := tagEl.getAttribute("data-search-tag")
			if tag != nil && tag != "" {
				openSearchWithTag(string(tag))
			}
			return
		}

		// Action delegation
		btn := target.closest("[data-action]")
		if btn != nil {
			action := string(btn.getAttribute("data-action"))
			switch action {
			case "nav":
				e.preventDefault()
				if btn.closest(".disabled") != nil {
					return
				}
				href := btn.getAttribute("href")
				if href != nil && href != "" {
					navigate(string(href))
				}
			case "toggle-mobile-nav":
				e.preventDefault()
				e.stopPropagation()
				toggleMobileMenu()
			case "toggle-projects-dropdown":
				e.preventDefault()
				e.stopPropagation()
				toggleProjectsDropdown()
			case "toggle-theme":
				e.preventDefault()
				toggleTheme()
			case "open-search":
				e.preventDefault()
				closeMobileMenu()
				closeProjectsDropdown()
				openSearch()
			case "close-search":
				e.preventDefault()
				closeSearch()
			case "clear-search":
				e.preventDefault()
				clearSearch()
			case "open-contact":
				e.preventDefault()
				closeMobileMenu()
				closeProjectsDropdown()
				openContact()
			case "close-contact":
				e.preventDefault()
				closeContact()
			case "toggle-fullscreen":
				e.preventDefault()
				iframe := document.querySelector("#demo")
				if iframe != nil {
					if document.fullscreenElement == nil {
						iframe.requestFullscreen()
					} else {
						document.exitFullscreen()
					}
				}
			case "copy-code":
				e.preventDefault()
				copyBtn := target.closest(".copy-code-button")
				if copyBtn != nil {
					pre := copyBtn.closest("pre")
					if pre != nil {
						codeEl := pre.querySelector("code")
						if codeEl != nil {
							text := codeEl.textContent
							navigator.clipboard.writeText(text)
							copyBtn.textContent = t("code.copied")
							copyBtn.classList.add("copied")
							setTimeout(func() {
								copyBtn.textContent = t("code.copy")
								copyBtn.classList.remove("copied")
							}, 2000)
						}
					}
				}
			case "open-post":
				if target.closest("a") == nil && target.closest(".clickable-tag") == nil {
					href := btn.getAttribute("data-href")
					if href != nil && href != "" {
						navigate(string(href))
					}
				}
			}
			return
		}

		// Fallback SPA link interceptor: standard <a href="/...">
		link := target.closest("a")
		if link != nil {
			href := string(link.getAttribute("href"))
			targetAttr := link.getAttribute("target")
			if strings.HasPrefix(href, "/") && (targetAttr == nil || targetAttr == "") {
				e.preventDefault()
				navigate(href)
				return
			}
		}

		// Click on search overlay backdrop
		if target.id == "search-page" {
			closeSearch()
			return
		}

		// Click on contact modal backdrop
		if target.id == "contact-modal" {
			closeContact()
			return
		}
	})

	// Input on search and contact form fields
	app.addEventListener("input", func(e any) {
		if e.target.matches("#search-page-input") {
			handleSearchInput(string(e.target.value))
			return
		}
		if e.target.closest("#contact-form") != nil {
			updateContactField(string(e.target.name), string(e.target.value))
		}
	})

	// Submit on contact form
	app.addEventListener("submit", func(e any) {
		if e.target.matches("#contact-form") {
			e.preventDefault()
			submitContact()
		}
	})

	// Keydown for Escape
	window.addEventListener("keydown", func(e any) {
		if e.key == "Escape" {
			if searchOpen {
				closeSearch()
			}
			if contactOpen {
				closeContact()
			}
		}
	})

	// Global click outside handlers
	document.addEventListener("click", func(e any) {
		navbar := document.querySelector("nav")
		if navbar != nil && mobileMenuOpen {
			isMobile := window.innerWidth <= 767
			if isMobile && !navbar.contains(e.target) {
				closeMobileMenu()
			}
		}

		if projectsDropdownOpen {
			dropdown := document.querySelector(".dropdown")
			if dropdown == nil || !dropdown.contains(e.target) {
				closeProjectsDropdown()
			}
		}
	})

	// Popstate handler
	window.addEventListener("popstate", func(e any) {
		handleRoute()
	})
}

async func main() {
	gom.MountTo("head", AppStyles())

	err := await initData()
	if err != nil {
		console.error("Init data failed:", err)
	}

	initTheme()
	initSearch()
	initEmailJS()

	// Shell is mounted once; routes and overlays re-render their own regions.
	gom.Mount("#app", AppShell())
	setupEvents()
	await handleRoute()

	document.body.classList.add("app-ready")
}
