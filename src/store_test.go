package main

import "testing"

func testTranslate(key string) string {
	return t(key)
}

func TestTranslation(tt *testing.T) {
	tt.Run("returns value when key exists", func(tt *testing.T) {
		translations["nav.blog"] = "Blog"
		result := testTranslate("nav.blog")
		if result != "Blog" {
			tt.Errorf("expected 'Blog', got %q", result)
		}
		delete(translations, "nav.blog")
	})

	tt.Run("returns key when not found", func(tt *testing.T) {
		delete(translations, "missing.key")
		result := testTranslate("missing.key")
		if result != "missing.key" {
			tt.Errorf("expected 'missing.key', got %q", result)
		}
	})

	tt.Run("returns key when value is empty", func(tt *testing.T) {
		translations["empty"] = ""
		result := testTranslate("empty")
		if result != "empty" {
			tt.Errorf("expected 'empty', got %q", result)
		}
		delete(translations, "empty")
	})
}
