package main

import "html"
import "strconv"
import "strings"
import "time"

// ── Navbar helpers ────────────────────────────────────────────

func isActiveRoute(r RouteMatch, kind Route, param string) bool {
	return r.Kind == kind && r.Param == param
}

func toggleBtnClass(open bool) string {
	if open {
		return "navbar-toggle active"
	}
	return "navbar-toggle"
}

func navbarCollapseClass(open bool) string {
	if open {
		return "navbar-collapse show"
	}
	return "navbar-collapse"
}

func dropdownClass(open bool) string {
	if open {
		return "nav-item navbar-menu dropdown show"
	}
	return "nav-item navbar-menu dropdown"
}

func navLinkClass(active bool) string {
	if active {
		return "nav-link active"
	}
	return "nav-link"
}

func dropdownToggleClass(active bool) string {
	if active {
		return "nav-link dropdown-toggle active"
	}
	return "nav-link dropdown-toggle"
}

func dropdownItemClass(active bool) string {
	if active {
		return "dropdown-item active"
	}
	return "dropdown-item"
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

func pageItemPrevClass(page int) string {
	if page <= 1 {
		return "page-item disabled"
	}
	return "page-item"
}

func pageItemNextClass(page int, totalPages int) string {
	if page >= totalPages {
		return "page-item disabled"
	}
	return "page-item"
}

func pageItemClass(page int, currentPage int) string {
	if page == currentPage {
		return "page-item active"
	}
	return "page-item"
}

func pageHref(page int) string {
	if page < 1 {
		page = 1
	}
	return "/blog/page/" + strconv.Itoa(page)
}

func pageNumbers(totalPages int) []int {
	nums := []int{}
	for i := 1; i <= totalPages; i++ {
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

// ── Overlay helpers ───────────────────────────────────────────

// overlayClass is shared by the search page and contact modal.
func overlayClass(open bool, closing bool) string {
	if closing {
		return "show closing"
	}
	if open {
		return "show"
	}
	return ""
}

// ── Search helpers ────────────────────────────────────────────

func searchClearClass(q string) string {
	if q != "" {
		return "search-page-clear show"
	}
	return "search-page-clear"
}

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

func inputErrorClass(hasErr bool) string {
	if hasErr {
		return "error"
	}
	return ""
}

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

// ── TOC helpers ───────────────────────────────────────────────

func tocItemClass(level int) string {
	if level == 3 {
		return "blog-toc-item blog-toc-level-3"
	}
	return "blog-toc-item blog-toc-level-2"
}
