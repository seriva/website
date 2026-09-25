package main

import "testing"

func TestKebab(t *testing.T) {
	cases := map[string]string{
		"repo":             "repo",
		"repoId":           "repo-id",
		"reactionsEnabled": "reactions-enabled",
		"inputPosition":    "input-position",
	}
	for key, want := range cases {
		if got := kebab(key); got != want {
			t.Errorf("kebab(%q) = %q, want %q", key, got, want)
		}
	}
}

func TestGiscusAttrs(t *testing.T) {
	t.Run("nil config yields only the theme", func(t *testing.T) {
		attrs := giscusAttrs(nil, "dark")
		if len(attrs) != 1 || attrs["data-theme"] != "dark" {
			t.Errorf("unexpected attrs %v", attrs)
		}
	})

	t.Run("maps camelCase keys to data-* and skips the page toggles", func(t *testing.T) {
		raw := map[string]any{
			"blogEnabled":     true,
			"projectsEnabled": false,
			"repo":            "owner/repo",
			"repoId":          "R_1",
			"categoryId":      "DIC_1",
			"strict":          "0",
			"reactionsEnabled": "1",
		}
		attrs := giscusAttrs(raw, "light")
		want := map[string]string{
			"data-theme":             "light",
			"data-repo":              "owner/repo",
			"data-repo-id":           "R_1",
			"data-category-id":       "DIC_1",
			"data-strict":            "0",
			"data-reactions-enabled": "1",
		}
		if len(attrs) != len(want) {
			t.Errorf("expected %d attrs, got %d: %v", len(want), len(attrs), attrs)
		}
		for k, v := range want {
			if attrs[k] != v {
				t.Errorf("%s = %q, want %q", k, attrs[k], v)
			}
		}
		if _, ok := attrs["data-blog-enabled"]; ok {
			t.Errorf("blogEnabled must not be forwarded to giscus")
		}
	})
}
