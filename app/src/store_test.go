package main

import "js:./browser.d.ts"
import "strings"
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

func TestPostFromJSON(t *testing.T) {
	t.Run("maps all fields and strips .md", func(t *testing.T) {
		p := postFromJSON(map[string]any{
			"filename": "2026-01-01-hello.md",
			"title":    "Hello",
			"date":     "2026-01-01",
			"excerpt":  "Hi there",
			"tags":     []any{"go", "web"},
		})
		if p.Slug != "2026-01-01-hello" {
			t.Errorf("slug = %q", p.Slug)
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
		p := postFromJSON(map[string]any{"filename": "plain"})
		if p.Slug != "plain" || p.Filename != "plain" {
			t.Errorf("slug/filename = %q/%q", p.Slug, p.Filename)
		}
	})

	t.Run("only trailing .md is removed", func(t *testing.T) {
		p := postFromJSON(map[string]any{"filename": "about.md.md"})
		if p.Slug != "about.md" {
			t.Errorf("slug = %q", p.Slug)
		}
	})

	t.Run("missing fields default to empty", func(t *testing.T) {
		p := postFromJSON(map[string]any{"filename": "x.md"})
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

func TestProjectFromJSON(t *testing.T) {
	t.Run("maps all fields", func(t *testing.T) {
		p := projectFromJSON(map[string]any{
			"id":                "gofront",
			"title":             "GoFront",
			"description":       "Go to JS",
			"tags":              []any{"go", "compiler"},
			"order":             2,
			"github_repo":       "seriva/gofront",
			"github_branch":     "dev",
			"demo_url":          "https://example.com",
			"demo_label":        "Try it",
			"demo_instructions": "Click",
			"demo_height":       "600px",
			"demo_fullscreen":   true,
			"youtube_videos":    []any{"abc", "def"},
			"links": []any{
				map[string]any{"title": "Docs", "icon": "book", "href": "/docs"},
			},
		})
		if p.ID != "gofront" || p.Href != "/project/gofront" {
			t.Errorf("id/href = %q/%q", p.ID, p.Href)
		}
		if p.Title != "GoFront" || p.Description != "Go to JS" || p.Order != 2 {
			t.Errorf("fields = %+v", p)
		}
		if p.GithubRepo != "seriva/gofront" || p.GithubBranch != "dev" {
			t.Errorf("repo = %q/%q", p.GithubRepo, p.GithubBranch)
		}
		if p.DemoUrl != "https://example.com" || p.DemoLabel != "Try it" || p.DemoInstructions != "Click" || p.DemoHeight != "600px" || !p.DemoFullscreen {
			t.Errorf("demo = %+v", p)
		}
		if len(p.Tags) != 2 || p.Tags[1] != "compiler" {
			t.Errorf("tags = %v", p.Tags)
		}
		if len(p.YoutubeVideos) != 2 || p.YoutubeVideos[0] != "abc" {
			t.Errorf("videos = %v", p.YoutubeVideos)
		}
		if len(p.Links) != 1 || p.Links[0].Title != "Docs" || p.Links[0].Icon != "book" || p.Links[0].Href != "/docs" {
			t.Errorf("links = %+v", p.Links)
		}
	})

	t.Run("missing collections are empty, not nil", func(t *testing.T) {
		p := projectFromJSON(map[string]any{"id": "bare"})
		if p.Tags == nil || len(p.Tags) != 0 {
			t.Errorf("tags = %v", p.Tags)
		}
		if p.YoutubeVideos == nil || len(p.YoutubeVideos) != 0 {
			t.Errorf("videos = %v", p.YoutubeVideos)
		}
		if p.Links == nil || len(p.Links) != 0 {
			t.Errorf("links = %v", p.Links)
		}
		if p.DemoFullscreen || p.Order != 0 || p.GithubRepo != "" {
			t.Errorf("defaults = %+v", p)
		}
	})
}

func TestSortProjectsByOrder(t *testing.T) {
	list := []Project{{ID: "c", Order: 3}, {ID: "a", Order: 1}, {ID: "b", Order: 2}}
	sortProjectsByOrder(list)
	if list[0].ID != "a" || list[1].ID != "b" || list[2].ID != "c" {
		t.Errorf("order = %s %s %s", list[0].ID, list[1].ID, list[2].ID)
	}
}

func TestPageFromJSON(t *testing.T) {
	t.Run("maps fields and builds href from id", func(t *testing.T) {
		p := pageFromJSON("about", map[string]any{"title": "About", "order": 5, "showInNav": true})
		if p.ID != "about" || p.Href != "/page/about" {
			t.Errorf("id/href = %q/%q", p.ID, p.Href)
		}
		if p.Title != "About" || p.Order != 5 || !p.ShowInNav {
			t.Errorf("fields = %+v", p)
		}
	})

	t.Run("missing fields default", func(t *testing.T) {
		p := pageFromJSON("x", map[string]any{})
		if p.Title != "" || p.Order != 0 || p.ShowInNav {
			t.Errorf("defaults = %+v", p)
		}
	})
}

func TestSortPagesByOrder(t *testing.T) {
	list := []NavPage{{ID: "z", Order: 9}, {ID: "m", Order: 4}}
	sortPagesByOrder(list)
	if list[0].ID != "m" || list[1].ID != "z" {
		t.Errorf("order = %s %s", list[0].ID, list[1].ID)
	}
}

func TestUpdateRouteMeta(t *testing.T) {
	site.Title = "luukvanvenrooij.nl"
	updateRouteMeta("My Test Post - luukvanvenrooij.nl", "A detailed test excerpt", "/blog/test-post")

	if document.title != "My Test Post - luukvanvenrooij.nl" {
		t.Errorf("expected document.title 'My Test Post - luukvanvenrooij.nl', got %q", document.title)
	}

	metaDesc := document.querySelector("meta[name=\"description\"]")
	if metaDesc == nil || string(metaDesc.getAttribute("content")) != "A detailed test excerpt" {
		t.Errorf("expected meta description 'A detailed test excerpt'")
	}

	ogTitle := document.querySelector("meta[property=\"og:title\"]")
	if ogTitle == nil || string(ogTitle.getAttribute("content")) != "My Test Post - luukvanvenrooij.nl" {
		t.Errorf("expected og:title 'My Test Post - luukvanvenrooij.nl'")
	}

	canonical := document.querySelector("link[rel=\"canonical\"]")
	if canonical == nil || !strings.Contains(string(canonical.getAttribute("href")), "/blog/test-post") {
		t.Errorf("expected canonical link containing '/blog/test-post'")
	}
}

func TestAnnounceRoute(t *testing.T) {
	announcer := document.createElement("div")
	announcer.id = "route-announcer"
	document.body.appendChild(announcer)
	defer announcer.remove()

	announceRoute("Test Page")
	expected := "Navigated to Test Page"
	if string(announcer.textContent) != expected {
		t.Errorf("expected announcer %q, got %q", expected, string(announcer.textContent))
	}
}
