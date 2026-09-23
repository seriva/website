package main

import "testing"

// fakeFuse returns an object with the only Fuse method performSearch uses.
func fakeFuse(items []any) any {
	return map[string]any{
		"search": func(q string) []any {
			out := []any{}
			for _, it := range items {
				out = append(out, map[string]any{"item": it})
			}
			return out
		},
	}
}

func searchItem(id string, tags []any) any {
	return map[string]any{
		"id":          id,
		"title":       "Title " + id,
		"description": "Desc " + id,
		"tags":        tags,
		"type":        "blog",
		"url":         "/blog/" + id,
	}
}

func TestPerformSearch(t *testing.T) {
	prevMin, prevFuse := site.Search.MinChars, fuseInstance
	defer func() {
		site.Search.MinChars = prevMin
		fuseInstance = prevFuse
	}()
	site.Search.MinChars = 0

	t.Run("nil index returns empty", func(t *testing.T) {
		fuseInstance = nil
		if got := performSearch("anything"); len(got) != 0 {
			t.Errorf("expected no results, got %d", len(got))
		}
	})

	t.Run("empty and whitespace queries return empty", func(t *testing.T) {
		fuseInstance = fakeFuse([]any{searchItem("a", []any{})})
		if got := performSearch(""); len(got) != 0 {
			t.Errorf("empty query returned %d", len(got))
		}
		if got := performSearch("   "); len(got) != 0 {
			t.Errorf("whitespace query returned %d", len(got))
		}
	})

	t.Run("below configured min chars returns empty", func(t *testing.T) {
		fuseInstance = fakeFuse([]any{searchItem("a", []any{})})
		site.Search.MinChars = 3
		if got := performSearch("go"); len(got) != 0 {
			t.Errorf("short query returned %d", len(got))
		}
		if got := performSearch("gof"); len(got) != 1 {
			t.Errorf("min-length query returned %d", len(got))
		}
		site.Search.MinChars = 0
	})

	t.Run("maps item fields and tags", func(t *testing.T) {
		fuseInstance = fakeFuse([]any{searchItem("gofront", []any{"go", "js"})})
		got := performSearch("gofront")
		if len(got) != 1 {
			t.Fatalf("expected 1 result, got %d", len(got))
		}
		r := got[0]
		if r.ID != "gofront" || r.Title != "Title gofront" || r.Description != "Desc gofront" || r.ItemType != "blog" || r.Url != "/blog/gofront" {
			t.Errorf("unexpected mapping: %+v", r)
		}
		if len(r.Tags) != 2 || r.Tags[0] != "go" || r.Tags[1] != "js" {
			t.Errorf("tags = %v", r.Tags)
		}
	})

	t.Run("caps results at eight", func(t *testing.T) {
		items := []any{}
		for i := 0; i < 12; i++ {
			items = append(items, searchItem("item-"+string(rune('a'+i)), []any{}))
		}
		fuseInstance = fakeFuse(items)
		if got := performSearch("item"); len(got) != 8 {
			t.Errorf("expected 8 results, got %d", len(got))
		}
	})
}
