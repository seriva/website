package main

import (
	"strings"
	"testing"
)

// ── Class helper ───────────────────────────────────────────────

func TestCls(t *testing.T) {
	cases := []struct {
		base  string
		on    bool
		extra string
		want  string
	}{
		{"nav-link", false, "active", "nav-link"},
		{"nav-link", true, "active", "nav-link active"},
		{"nav-item navbar-menu dropdown", true, "show", "nav-item navbar-menu dropdown show"},
		{"", false, "show", ""},
		{"", true, "error", "error"},
	}
	for _, c := range cases {
		if got := cls(c.base, c.on, c.extra); got != c.want {
			t.Errorf("cls(%q, %v, %q) = %q, want %q", c.base, c.on, c.extra, got, c.want)
		}
	}
}

// ── Pagination helpers ────────────────────────────────────────

func TestPaginatedPosts(t *testing.T) {
	allPosts := []BlogPost{
		{Slug: "a", Title: "Post A", Tags: []string{}},
		{Slug: "b", Title: "Post B", Tags: []string{}},
		{Slug: "c", Title: "Post C", Tags: []string{}},
		{Slug: "d", Title: "Post D", Tags: []string{}},
		{Slug: "e", Title: "Post E", Tags: []string{}},
	}

	t.Run("first page", func(t *testing.T) {
		result := paginatedPosts(allPosts, 1, 2)
		if len(result) != 2 {
			t.Fatalf("expected 2 posts, got %d", len(result))
		}
		if result[0].Slug != "a" || result[1].Slug != "b" {
			t.Errorf("unexpected posts: %v, %v", result[0].Slug, result[1].Slug)
		}
	})

	t.Run("second page", func(t *testing.T) {
		result := paginatedPosts(allPosts, 2, 2)
		if len(result) != 2 {
			t.Fatalf("expected 2 posts, got %d", len(result))
		}
		if result[0].Slug != "c" || result[1].Slug != "d" {
			t.Errorf("unexpected posts: %v, %v", result[0].Slug, result[1].Slug)
		}
	})

	t.Run("last page partial", func(t *testing.T) {
		result := paginatedPosts(allPosts, 3, 2)
		if len(result) != 1 {
			t.Fatalf("expected 1 post, got %d", len(result))
		}
		if result[0].Slug != "e" {
			t.Errorf("expected 'e', got %q", result[0].Slug)
		}
	})

	t.Run("empty posts", func(t *testing.T) {
		result := paginatedPosts([]BlogPost{}, 1, 5)
		if len(result) != 0 {
			t.Errorf("expected 0 posts, got %d", len(result))
		}
	})

	t.Run("out of range page resets to start", func(t *testing.T) {
		result := paginatedPosts(allPosts, 100, 2)
		if len(result) != 2 {
			t.Fatalf("expected 2 posts (reset to page 1), got %d", len(result))
		}
		if result[0].Slug != "a" {
			t.Errorf("expected first post to be 'a', got %q", result[0].Slug)
		}
	})
}

func TestCalcTotalPages(t *testing.T) {
	t.Run("exact fit", func(t *testing.T) {
		if calcTotalPages(10, 5) != 2 {
			t.Errorf("expected 2, got %d", calcTotalPages(10, 5))
		}
	})

	t.Run("remainder", func(t *testing.T) {
		if calcTotalPages(11, 5) != 3 {
			t.Errorf("expected 3, got %d", calcTotalPages(11, 5))
		}
	})

	t.Run("single item", func(t *testing.T) {
		if calcTotalPages(1, 5) != 1 {
			t.Errorf("expected 1, got %d", calcTotalPages(1, 5))
		}
	})

	t.Run("zero items", func(t *testing.T) {
		if calcTotalPages(0, 5) != 0 {
			t.Errorf("expected 0, got %d", calcTotalPages(0, 5))
		}
	})

	t.Run("zero perPage defaults to 5", func(t *testing.T) {
		if calcTotalPages(10, 0) != 2 {
			t.Errorf("expected 2, got %d", calcTotalPages(10, 0))
		}
	})
}

func TestPageHref(t *testing.T) {
	if pageHref(3) != "/blog/page/3" {
		t.Errorf("expected '/blog/page/3', got %q", pageHref(3))
	}
	for _, p := range []int{1, 0, -1} {
		if pageHref(p) != "/blog" {
			t.Errorf("expected '/blog' for page %d, got %q", p, pageHref(p))
		}
	}
}

func TestPageNumbers(t *testing.T) {
	nums := pageNumbers(4)
	if len(nums) != 4 {
		t.Fatalf("expected 4 numbers, got %d", len(nums))
	}
	for i, n := range nums {
		if n != i+1 {
			t.Errorf("expected %d at index %d, got %d", i+1, i, n)
		}
	}
	if len(pageNumbers(0)) != 0 {
		t.Errorf("expected 0 numbers for 0 pages")
	}
}

// ── Project helpers ───────────────────────────────────────────

func TestDemoLabel(t *testing.T) {
	t.Run("custom label", func(t *testing.T) {
		p := Project{DemoLabel: "Try it", Tags: []string{}, YoutubeVideos: []string{}, Links: []ProjectLink{}}
		if demoLabel(p) != "Try it" {
			t.Errorf("expected 'Try it', got %q", demoLabel(p))
		}
	})

	t.Run("fallback to translation", func(t *testing.T) {
		translations["project.demo"] = "Live Demo"
		p := Project{Tags: []string{}, YoutubeVideos: []string{}, Links: []ProjectLink{}}
		if demoLabel(p) != "Live Demo" {
			t.Errorf("expected 'Live Demo', got %q", demoLabel(p))
		}
		delete(translations, "project.demo")
	})
}

func TestDemoWrapperClass(t *testing.T) {
	if demoWrapperClass("500px") != "demo-iframe-wrapper" {
		t.Errorf("with height should return 'demo-iframe-wrapper'")
	}
	if demoWrapperClass("") != "iframeWrapper" {
		t.Errorf("without height should return 'iframeWrapper'")
	}
}

// ── Search helpers ────────────────────────────────────────────

func TestHighlightMatch(t *testing.T) {
	t.Run("empty query returns escaped text", func(t *testing.T) {
		result := highlightMatch("<b>Hello</b>", "")
		if strings.Contains(result, "<b>") {
			t.Errorf("expected HTML to be escaped, got %q", result)
		}
		if !strings.Contains(result, "&lt;b&gt;") {
			t.Errorf("expected escaped tags, got %q", result)
		}
	})

	t.Run("match wraps in mark tag", func(t *testing.T) {
		result := highlightMatch("Hello World", "World")
		if !strings.Contains(result, "<mark>World</mark>") {
			t.Errorf("expected <mark>World</mark>, got %q", result)
		}
	})

	t.Run("case insensitive match", func(t *testing.T) {
		result := highlightMatch("Hello World", "hello")
		if !strings.Contains(result, "<mark>Hello</mark>") {
			t.Errorf("expected case-insensitive match, got %q", result)
		}
	})

	t.Run("no match returns escaped text", func(t *testing.T) {
		result := highlightMatch("Hello", "xyz")
		if strings.Contains(result, "<mark>") {
			t.Errorf("expected no mark tag for non-match, got %q", result)
		}
		if result != "Hello" {
			t.Errorf("expected 'Hello', got %q", result)
		}
	})

	t.Run("match with special chars", func(t *testing.T) {
		result := highlightMatch("A & B", "A")
		if !strings.Contains(result, "<mark>A</mark>") {
			t.Errorf("expected mark around A, got %q", result)
		}
		if !strings.Contains(result, "&amp;") {
			t.Errorf("expected escaped ampersand, got %q", result)
		}
	})
}

func TestSearchPlaceholderText(t *testing.T) {
	t.Run("custom placeholder", func(t *testing.T) {
		site.Search.Placeholder = "Find something..."
		result := searchPlaceholderText()
		if result != "Find something..." {
			t.Errorf("expected custom placeholder, got %q", result)
		}
	})

	t.Run("translation fallback", func(t *testing.T) {
		site.Search.Placeholder = ""
		translations["search.placeholder"] = "Zoeken..."
		result := searchPlaceholderText()
		if result != "Zoeken..." {
			t.Errorf("expected translation, got %q", result)
		}
		delete(translations, "search.placeholder")
	})

	t.Run("default fallback", func(t *testing.T) {
		site.Search.Placeholder = ""
		delete(translations, "search.placeholder")
		result := searchPlaceholderText()
		if result != "Search..." {
			t.Errorf("expected 'Search...', got %q", result)
		}
	})
}

// ── Contact helpers ───────────────────────────────────────────


func TestFormStatusClass(t *testing.T) {
	if formStatusClass("error") != "form-status error" {
		t.Errorf("expected 'form-status error', got %q", formStatusClass("error"))
	}
	if formStatusClass("success") != "form-status success" {
		t.Errorf("expected 'form-status success', got %q", formStatusClass("success"))
	}
	if formStatusClass("") != "form-status" {
		t.Errorf("expected 'form-status', got %q", formStatusClass(""))
	}
}

// ── Footer helpers ────────────────────────────────────────────

func TestCurrentYear(t *testing.T) {
	year := currentYear()
	if year < 2024 || year > 2100 {
		t.Errorf("currentYear() returned unreasonable value: %d", year)
	}
}
