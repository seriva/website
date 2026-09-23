package main

import (
	"strings"
	"testing"
)

// ── Navbar class helpers ──────────────────────────────────────

func TestToggleBtnClass(t *testing.T) {
	if toggleBtnClass(true) != "navbar-toggle active" {
		t.Errorf("expected 'navbar-toggle active', got %q", toggleBtnClass(true))
	}
	if toggleBtnClass(false) != "navbar-toggle" {
		t.Errorf("expected 'navbar-toggle', got %q", toggleBtnClass(false))
	}
}

func TestNavbarCollapseClass(t *testing.T) {
	if navbarCollapseClass(true) != "navbar-collapse show" {
		t.Errorf("expected 'navbar-collapse show', got %q", navbarCollapseClass(true))
	}
	if navbarCollapseClass(false) != "navbar-collapse" {
		t.Errorf("expected 'navbar-collapse', got %q", navbarCollapseClass(false))
	}
}

func TestDropdownClass(t *testing.T) {
	if dropdownClass(true) != "nav-item dropdown show" {
		t.Errorf("expected 'nav-item dropdown show', got %q", dropdownClass(true))
	}
	if dropdownClass(false) != "nav-item dropdown" {
		t.Errorf("expected 'nav-item dropdown', got %q", dropdownClass(false))
	}
}

func TestNavLinkClass(t *testing.T) {
	if navLinkClass(true) != "nav-link active" {
		t.Errorf("expected 'nav-link active', got %q", navLinkClass(true))
	}
	if navLinkClass(false) != "nav-link" {
		t.Errorf("expected 'nav-link', got %q", navLinkClass(false))
	}
}

func TestDropdownToggleClass(t *testing.T) {
	if dropdownToggleClass(true) != "nav-link dropdown-toggle active" {
		t.Errorf("got %q", dropdownToggleClass(true))
	}
	if dropdownToggleClass(false) != "nav-link dropdown-toggle" {
		t.Errorf("got %q", dropdownToggleClass(false))
	}
}

func TestDropdownItemClass(t *testing.T) {
	if dropdownItemClass(true) != "dropdown-item active" {
		t.Errorf("got %q", dropdownItemClass(true))
	}
	if dropdownItemClass(false) != "dropdown-item" {
		t.Errorf("got %q", dropdownItemClass(false))
	}
}

// ── Pagination helpers ────────────────────────────────────────

func TestPaginatedPosts(t *testing.T) {
	allPosts := []BlogPost{
		{ID: "a", Slug: "a", Title: "Post A", Tags: []string{}},
		{ID: "b", Slug: "b", Title: "Post B", Tags: []string{}},
		{ID: "c", Slug: "c", Title: "Post C", Tags: []string{}},
		{ID: "d", Slug: "d", Title: "Post D", Tags: []string{}},
		{ID: "e", Slug: "e", Title: "Post E", Tags: []string{}},
	}

	t.Run("first page", func(t *testing.T) {
		result := paginatedPosts(allPosts, 1, 2)
		if len(result) != 2 {
			t.Fatalf("expected 2 posts, got %d", len(result))
		}
		if result[0].ID != "a" || result[1].ID != "b" {
			t.Errorf("unexpected posts: %v, %v", result[0].ID, result[1].ID)
		}
	})

	t.Run("second page", func(t *testing.T) {
		result := paginatedPosts(allPosts, 2, 2)
		if len(result) != 2 {
			t.Fatalf("expected 2 posts, got %d", len(result))
		}
		if result[0].ID != "c" || result[1].ID != "d" {
			t.Errorf("unexpected posts: %v, %v", result[0].ID, result[1].ID)
		}
	})

	t.Run("last page partial", func(t *testing.T) {
		result := paginatedPosts(allPosts, 3, 2)
		if len(result) != 1 {
			t.Fatalf("expected 1 post, got %d", len(result))
		}
		if result[0].ID != "e" {
			t.Errorf("expected 'e', got %q", result[0].ID)
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
		if result[0].ID != "a" {
			t.Errorf("expected first post to be 'a', got %q", result[0].ID)
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

func TestPageItemPrevClass(t *testing.T) {
	if pageItemPrevClass(1) != "page-item disabled" {
		t.Errorf("page 1 should be disabled")
	}
	if pageItemPrevClass(0) != "page-item disabled" {
		t.Errorf("page 0 should be disabled")
	}
	if pageItemPrevClass(2) != "page-item" {
		t.Errorf("page 2 should not be disabled")
	}
}

func TestPageItemNextClass(t *testing.T) {
	if pageItemNextClass(3, 3) != "page-item disabled" {
		t.Errorf("last page should be disabled")
	}
	if pageItemNextClass(2, 3) != "page-item" {
		t.Errorf("non-last page should not be disabled")
	}
}

func TestPageItemClass(t *testing.T) {
	if pageItemClass(2, 2) != "page-item active" {
		t.Errorf("current page should be active")
	}
	if pageItemClass(1, 2) != "page-item" {
		t.Errorf("non-current page should not be active")
	}
}

func TestPageHref(t *testing.T) {
	if pageHref(3) != "/blog/page/3" {
		t.Errorf("expected '/blog/page/3', got %q", pageHref(3))
	}
	if pageHref(0) != "/blog/page/1" {
		t.Errorf("expected '/blog/page/1' for page 0, got %q", pageHref(0))
	}
	if pageHref(-1) != "/blog/page/1" {
		t.Errorf("expected '/blog/page/1' for page -1, got %q", pageHref(-1))
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

	empty := pageNumbers(0)
	if len(empty) != 0 {
		t.Errorf("expected 0 numbers for 0 pages, got %d", len(empty))
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

func TestOverlayClass(t *testing.T) {
	if overlayClass(false, false) != "" {
		t.Errorf("expected empty, got %q", overlayClass(false, false))
	}
	if overlayClass(true, false) != "show" {
		t.Errorf("expected 'show', got %q", overlayClass(true, false))
	}
	if overlayClass(true, true) != "show closing" {
		t.Errorf("expected 'show closing', got %q", overlayClass(true, true))
	}
}

func TestSearchClearClass(t *testing.T) {
	if searchClearClass("query") != "search-page-clear show" {
		t.Errorf("expected show class with query")
	}
	if searchClearClass("") != "search-page-clear" {
		t.Errorf("expected no show class without query")
	}
}

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

func TestInputErrorClass(t *testing.T) {
	if inputErrorClass(true) != "error" {
		t.Errorf("expected 'error'")
	}
	if inputErrorClass(false) != "" {
		t.Errorf("expected empty")
	}
}

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
