package main

import "js:./browser.d.ts"

const themeStorageKey = "theme-preference"

func getInitialTheme() string {
	saved := localStorage.getItem(themeStorageKey)
	if saved != nil && saved != "" {
		return string(saved)
	}
	current := document.documentElement.getAttribute("data-theme")
	if current != nil && current != "" {
		return string(current)
	}
	return "dark"
}

func getThemeColors(name string) ThemeColors {
	if name == "light" {
		return site.LightTheme
	}
	return site.DarkTheme
}

func applyColorScheme(colors ThemeColors) {
	root := document.documentElement
	root.style.setProperty("--accent", colors.Primary)
	root.style.setProperty("--font-color", colors.Text)
	root.style.setProperty("--background-color", colors.Background)
	root.style.setProperty("--header-color", colors.Secondary)
	root.style.setProperty("--text-light", colors.TextLight)
	root.style.setProperty("--border-color", colors.Border)
	root.style.setProperty("--hover-color", colors.Hover)
}

func applyPrismTheme(themeName string) {
	id := "prism-theme"
	link := document.getElementById(id)
	href := "/css/prism-themes/" + themeName + ".min.css"

	if link != nil {
		link.href = href
	} else {
		newLink := document.createElement("link")
		newLink.id = id
		newLink.rel = "stylesheet"
		newLink.href = href
		document.head.appendChild(newLink)
	}
}

func applyTheme(theme string) {
	currentTheme = theme
	document.documentElement.setAttribute("data-theme", theme)
	colors := getThemeColors(theme)
	applyColorScheme(colors)
	if colors.CodeTheme != "" {
		applyPrismTheme(colors.CodeTheme)
	}
	updateGiscusTheme()
}

func nextTheme(current string) string {
	if current == "dark" {
		return "light"
	}
	return "dark"
}

func toggleTheme() {
	next := nextTheme(currentTheme)
	localStorage.setItem(themeStorageKey, next)
	applyTheme(next)
}

func initTheme() {
	initial := getInitialTheme()
	applyTheme(initial)
}
