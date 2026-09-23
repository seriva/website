package main

import "testing"

func TestGetThemeColors(t *testing.T) {
	site.DarkTheme = ThemeColors{
		Primary:    "#10B981",
		Background: "#0D1117",
	}
	site.LightTheme = ThemeColors{
		Primary:    "#047857",
		Background: "#FFFFFF",
	}

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
