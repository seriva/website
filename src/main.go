package main

import "js:./browser.d.ts"
import "strings"

func render() {
	gom.Mount("#app", AppShell())
}

func toggleProjectsDropdown() {
	projectsDropdownOpen = !projectsDropdownOpen
	dropdown := document.querySelector(".dropdown")
	if dropdown != nil {
		if projectsDropdownOpen {
			dropdown.classList.add("show")
		} else {
			dropdown.classList.remove("show")
		}
	}
}

func closeProjectsDropdown() {
	if !projectsDropdownOpen {
		return
	}
	projectsDropdownOpen = false
	dropdown := document.querySelector(".dropdown")
	if dropdown != nil {
		dropdown.classList.remove("show")
	}
}

func toggleMobileMenu() {
	mobileMenuOpen = !mobileMenuOpen
	btn := document.querySelector(".navbar-toggle")
	collapse := document.querySelector(".navbar-collapse")
	if btn != nil {
		if mobileMenuOpen {
			btn.classList.add("active")
		} else {
			btn.classList.remove("active")
		}
	}
	if collapse != nil {
		if mobileMenuOpen {
			collapse.classList.add("show")
		} else {
			collapse.classList.remove("show")
		}
	}
}

func closeMobileMenu() {
	if !mobileMenuOpen {
		return
	}
	mobileMenuOpen = false
	btn := document.querySelector(".navbar-toggle")
	collapse := document.querySelector(".navbar-collapse")
	if btn != nil {
		btn.classList.remove("active")
	}
	if collapse != nil {
		collapse.classList.remove("show")
	}
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
				searchQuery = ""
				searchResults = []SearchResultItem{}
				clearBtn := document.querySelector("#search-page-clear")
				if clearBtn != nil {
					clearBtn.classList.remove("show")
				}
				renderSearchResults()
				inp := document.querySelector("#search-page-input")
				if inp != nil {
					inp.value = ""
					inp.focus()
				}
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

	// Input on search
	app.addEventListener("input", func(e any) {
		if e.target.matches("#search-page-input") {
			handleSearchInput(string(e.target.value))
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

	initMarkdown()
	err := await initData()
	if err != nil {
		console.error("Init data failed:", err)
	}

	initTheme()
	initSearch()
	initEmailJS()

	setupEvents()
	await handleRoute()

	document.body.classList.add("app-ready")
}
