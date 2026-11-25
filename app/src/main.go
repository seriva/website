package main

import "gofront/dom"
import "js:./browser.d.ts"
import "strings"

func toggleProjectsDropdown() {
	projectsDropdownOpen.Set(!projectsDropdownOpen.Get())
}

func closeProjectsDropdown() {
	projectsDropdownOpen.Set(false)
}

func toggleMobileMenu() {
	mobileMenuOpen.Set(!mobileMenuOpen.Get())
}

func closeMobileMenu() {
	mobileMenuOpen.Set(false)
}

// closeMenus collapses the nav menus before another overlay takes focus.
func closeMenus() {
	closeMobileMenu()
	closeProjectsDropdown()
}

// navigateHash scrolls to an in-page anchor ("#id" or "" for top) and
// records it in history without triggering a route change.
func navigateHash(hash string) {
	if strings.TrimPrefix(hash, "#") != "" {
		scrollToHash(hash, true)
		window.history.pushState(map[string]any{}, "", hash)
		return
	}
	window.scrollTo(map[string]any{"top": 0, "left": 0, "behavior": "smooth"})
	window.history.pushState(map[string]any{}, "", window.location.pathname)
}

func setupEvents() {
	app := refElem("appRoot")
	if app == nil && document != nil {
		app = document.querySelector("#app")
	}
	if app == nil {
		return
	}

	// Click delegation on #app
	app.addEventListener("click", func(e dom.Event) {
		if e.target == nil {
			return
		}
		target := e.target.(dom.Element)

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
					hrefStr := string(href)
					if strings.HasPrefix(hrefStr, "#") {
						navigateHash(hrefStr)
						return
					}
					navigate(hrefStr)
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
				openSearch()
			case "close-search":
				e.preventDefault()
				closeSearch()
			case "clear-search":
				e.preventDefault()
				clearSearch()
			case "open-contact":
				e.preventDefault()
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

		// Fallback SPA link interceptor: standard <a href="...">
		link := target.closest("a")
		if link != nil {
			href := string(link.getAttribute("href"))
			targetAttr := link.getAttribute("target")
			if targetAttr != nil && targetAttr != "" && targetAttr != "_self" {
				return
			}

			// In-page anchor hash link (#the-architecture)
			if strings.HasPrefix(href, "#") {
				e.preventDefault()
				navigateHash(href)
				return
			}

			if strings.HasPrefix(href, "/") {
				// Same-page anchor with full path: /blog/slug#the-architecture
				if currentPath != "" && strings.HasPrefix(href, currentPath+"#") {
					e.preventDefault()
					hash := strings.TrimPrefix(href, currentPath)
					scrollToHash(hash, true)
					window.history.pushState(map[string]any{}, "", href)
					return
				}

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
	app.addEventListener("input", func(e dom.Event) {
		if e.target == nil {
			return
		}
		target := e.target.(dom.Element)
		if target.matches("#search-page-input") {
			handleSearchInput(target.(dom.HTMLInputElement).value)
			return
		}
		if target.closest("#contact-form") != nil {
			field := any(target).(FormField)
			updateContactField(field.name, field.value)
		}
	})

	// Submit on contact form
	app.addEventListener("submit", func(e dom.Event) {
		if e.target != nil && e.target.(dom.Element).matches("#contact-form") {
			e.preventDefault()
			submitContact()
		}
	})

	// Keydown for Escape and search shortcut (Cmd+K / Ctrl+K and /)
	window.addEventListener("keydown", func(e dom.KeyboardEvent) {
		key := e.key
		if key == "Escape" {
			if searchOpen.Get() {
				closeSearch()
			}
			if contactOpen.Get() {
				closeContact()
			}
			return
		}

		if searchOpen.Get() {
			if key == "ArrowDown" {
				e.preventDefault()
				searchSelectNext()
				return
			}
			if key == "ArrowUp" {
				e.preventDefault()
				searchSelectPrev()
				return
			}
			if key == "Enter" && searchHasSelection() {
				e.preventDefault()
				searchOpenSelected()
				return
			}
		}

		if site.Search.Enabled && !contactOpen.Get() {
			isCmdK := (e.metaKey || e.ctrlKey) && (key == "k" || key == "K")
			isSlash := key == "/"

			if isCmdK || isSlash {
				tagName := ""
				isEditable := false
				if e.target != nil {
					target := e.target.(dom.HTMLElement)
					tagName = strings.ToUpper(target.tagName)
					isEditable = target.isContentEditable
				}

				inInput := tagName == "INPUT" || tagName == "TEXTAREA" || tagName == "SELECT" || isEditable

				if isCmdK {
					e.preventDefault()
					if searchOpen.Get() {
						closeSearch()
					} else {
						openSearch()
					}
				} else if isSlash && !inInput {
					e.preventDefault()
					if !searchOpen.Get() {
						openSearch()
					}
				}
			}
		}
	})

	// Global click outside handlers
	document.addEventListener("click", func(e dom.Event) {
		if e.target == nil {
			return
		}
		target := e.target.(dom.Node)
		navbar := refElem("navbar")
		if navbar != nil && mobileMenuOpen.Get() {
			isMobile := window.innerWidth <= 767
			if isMobile && !navbar.contains(target) {
				closeMobileMenu()
			}
		}

		if projectsDropdownOpen.Get() {
			dropdown := refElem("projectsDropdown")
			if dropdown == nil || !dropdown.contains(target) {
				closeProjectsDropdown()
			}
		}
	})

	// Popstate handler
	window.addEventListener("popstate", func(_ dom.Event) {
		newPath := window.location.pathname
		if newPath == currentPath {
			hash := window.location.hash
			if hash != "" {
				scrollToHash(hash, true)
			} else {
				window.scrollTo(map[string]any{"top": 0, "left": 0, "behavior": "smooth"})
			}
			return
		}
		handleRoute()
	})
}

async func main() {
	view = newViewState()
	err := await initData()
	if err != nil {
		console.error("Init data failed:", err)
	}

	initTheme()
	initSearch()
	initInitialRoute()

	// Shell is mounted once; routes and overlays re-render their own regions.
	gom.Mount("#app", AppShell(), appRefs)
	setupEvents()
	await handleRoute()

	document.body.classList.add("app-ready")
}
