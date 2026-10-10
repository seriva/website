package main

import "html"
import "strconv"
import "strings"
import "time"

// ── Navbar helpers ────────────────────────────────────────────

func isActiveRoute(r RouteMatch, kind Route, param string) bool {
	return r.Kind == kind && r.Param == param
}

// cls appends extra to base when on is true.
func cls(base string, on bool, extra string) string {
	if !on {
		return base
	}
	if base == "" {
		return extra
	}
	return base + " " + extra
}

// ── Blog & pagination helpers ─────────────────────────────────

func paginatedPosts(allPosts []BlogPost, page int, perPage int) []BlogPost {
	if len(allPosts) == 0 {
		return []BlogPost{}
	}
	offset := page - 1
	start := offset * perPage
	if start < 0 || start >= len(allPosts) {
		start = 0
	}
	end := start + perPage
	if end > len(allPosts) {
		end = len(allPosts)
	}
	return allPosts[start:end]
}

func calcTotalPages(totalCount int, perPage int) int {
	if perPage <= 0 {
		perPage = 5
	}
	num := totalCount + perPage - 1
	return num / perPage
}

// pageHref returns the canonical URL for a blog page; page 1 is /blog.
func pageHref(page int) string {
	if page <= 1 {
		return "/blog"
	}
	return "/blog/page/" + strconv.Itoa(page)
}

// pageNumbers returns 1..n for templ range loops (templ `for` only supports range).
func pageNumbers(n int) []int {
	nums := make([]int, 0, n)
	for i := 1; i <= n; i++ {
		nums = append(nums, i)
	}
	return nums
}

// ── Project helpers ───────────────────────────────────────────

func demoLabel(p Project) string {
	if p.DemoLabel != "" {
		return p.DemoLabel
	}
	return t("project.demo")
}

func demoWrapperClass(height string) string {
	if height != "" {
		return "demo-iframe-wrapper"
	}
	return "iframeWrapper"
}

// ── Search helpers ───────────────────────────────────────────

func searchPlaceholderText() string {
	if site.Search.Placeholder != "" {
		return site.Search.Placeholder
	}
	if res := t("search.placeholder"); res != "search.placeholder" {
		return res
	}
	return "Search..."
}

// highlightMatch wraps the first case-insensitive occurrence of query in <mark>; all text is escaped.
func highlightMatch(text string, query string) string {
	if query != "" {
		if idx := strings.Index(strings.ToLower(text), strings.ToLower(query)); idx != -1 {
			end := idx + len(query)
			return html.EscapeString(text[:idx]) + "<mark>" + html.EscapeString(text[idx:end]) + "</mark>" + html.EscapeString(text[end:])
		}
	}
	return html.EscapeString(text)
}

// ── Contact helpers ───────────────────────────────────────────

func formStatusClass(statusType string) string {
	if statusType != "" {
		return "form-status " + statusType
	}
	return "form-status"
}

// ── Footer helpers ────────────────────────────────────────────

func currentYear() int {
	return time.Now().Year()
}

