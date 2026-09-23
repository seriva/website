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

func TestPostFromYAML(t *testing.T) {
	t.Run("maps all fields and strips .md", func(t *testing.T) {
		p := postFromYAML(map[string]any{
			"filename": "2026-01-01-hello.md",
			"title":    "Hello",
			"date":     "2026-01-01",
			"excerpt":  "Hi there",
			"tags":     []any{"go", "web"},
		})
		if p.Slug != "2026-01-01-hello" || p.ID != p.Slug {
			t.Errorf("slug/id = %q/%q", p.Slug, p.ID)
		}
		if p.Filename != "2026-01-01-hello.md" {
			t.Errorf("filename = %q", p.Filename)
		}
		if p.Href != "/blog/2026-01-01-hello" {
			t.Errorf("href = %q", p.Href)
		}
		if p.Title != "Hello" || p.Date != "2026-01-01" || p.Excerpt != "Hi there" {
			t.Errorf("fields = %+v", p)
		}
		if len(p.Tags) != 2 || p.Tags[0] != "go" || p.Tags[1] != "web" {
			t.Errorf("tags = %v", p.Tags)
		}
	})

	t.Run("filename without extension is kept as slug", func(t *testing.T) {
		p := postFromYAML(map[string]any{"filename": "plain"})
		if p.Slug != "plain" || p.Filename != "plain" {
			t.Errorf("slug/filename = %q/%q", p.Slug, p.Filename)
		}
	})

	t.Run("only trailing .md is removed", func(t *testing.T) {
		p := postFromYAML(map[string]any{"filename": "about.md.md"})
		if p.Slug != "about.md" {
			t.Errorf("slug = %q", p.Slug)
		}
	})

	t.Run("missing fields default to empty", func(t *testing.T) {
		p := postFromYAML(map[string]any{"filename": "x.md"})
		if p.Title != "" || p.Date != "" || p.Excerpt != "" {
			t.Errorf("expected empty defaults, got %+v", p)
		}
		if p.Tags == nil || len(p.Tags) != 0 {
			t.Errorf("expected empty non-nil tags, got %v", p.Tags)
		}
	})
}

func TestSortPostsByDate(t *testing.T) {
	posts := []BlogPost{
		{Slug: "b", Date: "2025-06-01"},
		{Slug: "c", Date: "2026-01-15"},
		{Slug: "a", Date: "2024-12-31"},
		{Slug: "d", Date: ""},
	}
	sortPostsByDate(posts)
	want := []string{"c", "b", "a", "d"}
	for i, w := range want {
		if posts[i].Slug != w {
			t.Errorf("position %d = %q, want %q", i, posts[i].Slug, w)
		}
	}
}
