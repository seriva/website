package main

import "js:./browser.d.ts"
import "testing"

// resetThemeDOM clears every side effect the theme code writes; jsdom state
// persists across tests within one run.
func resetThemeDOM() {
	window.localStorage.clear()
	document.documentElement.removeAttribute("data-theme")
	link := document.getElementById("prism-theme")
	if link != nil {
		link.remove()
	}
	currentTheme = "dark"
}

// withThemes swaps site.DarkTheme/LightTheme and returns a restore func.
// Call it, then defer the result: gofront defers the whole expression, so
// `defer withThemes(...)()` would not apply the themes until test exit.
func withThemes(dark ThemeColors, light ThemeColors) func() {
	prevDark, prevLight := site.DarkTheme, site.LightTheme
	site.DarkTheme = dark
	site.LightTheme = light
	return func() {
		site.DarkTheme = prevDark
		site.LightTheme = prevLight
	}
}

func TestGetThemeColors(t *testing.T) {
	restore := withThemes(
		ThemeColors{Primary: "#10B981", Background: "#0D1117"},
		ThemeColors{Primary: "#047857", Background: "#FFFFFF"},
	)
	defer restore()

	t.Run("dark theme", func(t *testing.T) {
		colors := getThemeColors("dark")
		if colors.Primary != "#10B981" {
			t.Errorf("expected dark primary '#10B981', got %q", colors.Primary)
		}
		if colors.Background != "#0D1117" {
			t.Errorf("expected dark background '#0D1117', got %q", colors.Background)
		}
	})

	t.Run("light theme", func(t *testing.T) {
		colors := getThemeColors("light")
		if colors.Primary != "#047857" {
			t.Errorf("expected light primary '#047857', got %q", colors.Primary)
		}
		if colors.Background != "#FFFFFF" {
			t.Errorf("expected light background '#FFFFFF', got %q", colors.Background)
		}
	})

	t.Run("unknown defaults to dark", func(t *testing.T) {
		colors := getThemeColors("auto")
		if colors.Primary != "#10B981" {
			t.Errorf("expected unknown theme to fall back to dark, got %q", colors.Primary)
		}
	})
}

func TestNextTheme(t *testing.T) {
	if nextTheme("dark") != "light" {
		t.Errorf("expected 'light', got %q", nextTheme("dark"))
	}
	if nextTheme("light") != "dark" {
		t.Errorf("expected 'dark', got %q", nextTheme("light"))
	}
	if nextTheme("") != "dark" {
		t.Errorf("expected unknown theme to toggle to 'dark', got %q", nextTheme(""))
	}
}

func TestGetInitialTheme(t *testing.T) {
	t.Run("defaults to dark", func(t *testing.T) {
		resetThemeDOM()
		if got := getInitialTheme(); got != "dark" {
			t.Errorf("got %q", got)
		}
	})

	t.Run("data-theme beats default", func(t *testing.T) {
		resetThemeDOM()
		document.documentElement.setAttribute("data-theme", "light")
		if got := getInitialTheme(); got != "light" {
			t.Errorf("got %q", got)
		}
	})

	t.Run("localStorage beats data-theme", func(t *testing.T) {
		resetThemeDOM()
		document.documentElement.setAttribute("data-theme", "light")
		window.localStorage.setItem(themeStorageKey, "dark")
		if got := getInitialTheme(); got != "dark" {
			t.Errorf("got %q", got)
		}
	})
}

func TestApplyTheme(t *testing.T) {
	resetThemeDOM()
	defer resetThemeDOM()
	restore := withThemes(
		ThemeColors{Primary: "#111", Text: "#eee", Background: "#000", Secondary: "#222", TextLight: "#aaa", Border: "#333", Hover: "#444", CodeTheme: "prism-tomorrow"},
		ThemeColors{Primary: "#fff", Text: "#000", Background: "#fafafa", Secondary: "#ddd", TextLight: "#555", Border: "#ccc", Hover: "#bbb", CodeTheme: "prism-coy"},
	)
	defer restore()

	applyTheme("light")

	if currentTheme != "light" {
		t.Errorf("currentTheme = %q", currentTheme)
	}
	if got := string(document.documentElement.getAttribute("data-theme")); got != "light" {
		t.Errorf("data-theme = %q", got)
	}
	style := document.documentElement.style
	vars := map[string]string{
		"--accent":           "#fff",
		"--font-color":       "#000",
		"--background-color": "#fafafa",
		"--header-color":     "#ddd",
		"--text-light":       "#555",
		"--border-color":     "#ccc",
		"--hover-color":      "#bbb",
	}
	for name, want := range vars {
		if got := string(style.getPropertyValue(name)); got != want {
			t.Errorf("%s = %q, want %q", name, got, want)
		}
	}

	link := document.getElementById("prism-theme")
	if link == nil {
		t.Fatal("expected prism theme link to be created")
	}
	if got := string(link.getAttribute("href")); got != "/css/prism-themes/prism-coy.min.css" {
		t.Errorf("prism href = %q", got)
	}

	// Second apply must update the existing link, not add another.
	applyTheme("dark")
	links := document.querySelectorAll("link#prism-theme")
	if int(links.length) != 1 {
		t.Errorf("expected 1 prism link, got %d", int(links.length))
	}
	if got := string(document.getElementById("prism-theme").getAttribute("href")); got != "/css/prism-themes/prism-tomorrow.min.css" {
		t.Errorf("prism href after toggle = %q", got)
	}
}

func TestToggleThemePersists(t *testing.T) {
	resetThemeDOM()
	defer resetThemeDOM()
	restore := withThemes(ThemeColors{Primary: "#111"}, ThemeColors{Primary: "#fff"})
	defer restore()
	applyTheme("dark")

	toggleTheme()

	if currentTheme != "light" {
		t.Errorf("currentTheme = %q", currentTheme)
	}
	if got := string(window.localStorage.getItem(themeStorageKey)); got != "light" {
		t.Errorf("stored = %q", got)
	}
	if got := getInitialTheme(); got != "light" {
		t.Errorf("getInitialTheme after toggle = %q", got)
	}
}
