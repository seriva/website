package main

import "gofront/dom"
import "js:./browser.d.ts"
import "strings"

var fuseInstance FuseInstance
var searchDebounceTimer int

func initSearch() {
	var searchItems []FuseItem

	// Index projects
	for _, p := range projects {
		searchItems = append(searchItems, map[string]any{
			"id":          p.ID,
			"title":       p.Title,
			"description": p.Description,
			"tags":        p.Tags,
			"kind":        "project",
			"url":         p.Href,
		})
	}

	// Index blog posts
	for _, p := range posts {
		searchItems = append(searchItems, map[string]any{
			"id":          p.Slug,
			"title":       p.Title,
			"description": p.Excerpt,
			"tags":        p.Tags,
			"kind":        "blog",
			"url":         p.Href,
		})
	}

	options := map[string]any{
		"keys": []any{
			map[string]any{"name": "title", "weight": 0.4},
			map[string]any{"name": "description", "weight": 0.3},
			map[string]any{"name": "tags", "weight": 0.2},
		},
		"threshold":          0.4,
		"minMatchCharLength": searchMinChars(),
	}

	// Go has no `new`; Fuse is a class exposed on window by vendor.js
	fuseInstance = Reflect.construct(any(window).(WindowGlobals).Fuse, []any{searchItems, options}).(FuseInstance)
}

func searchMinChars() int {
	if site.Search.MinChars > 0 {
		return site.Search.MinChars
	}
	return 2
}

func performSearch(q string) []SearchResultItem {
	trimmed := strings.TrimSpace(q)
	if len(trimmed) < searchMinChars() || fuseInstance == nil {
		return []SearchResultItem{}
	}

	results := fuseInstance.search(trimmed)
	out := []SearchResultItem{}
	maxResults := 8
	if len(results) < maxResults {
		maxResults = len(results)
	}

	for i := 0; i < maxResults; i++ {
		rawItem := results[i].item
		tags := []string{}
		if rawItem.tags != nil {
			tags = append(tags, rawItem.tags...)
		}

		out = append(out, SearchResultItem{
			ID:          rawItem.id,
			Title:       rawItem.title,
			Description: rawItem.description,
			Tags:        tags,
			ItemType:    rawItem.kind,
			Url:         rawItem.url,
		})
	}

	return out
}

var searchSelectedIndex = -1

func scrollSelectedSearchResultIntoView() {
	el := document.querySelector(".search-result-item.selected")
	if el != nil {
		el.scrollIntoView(map[string]any{"block": "nearest", "behavior": "smooth"})
	}
}

func searchSelectNext() {
	if len(searchResults) == 0 {
		return
	}
	searchSelectedIndex++
	if searchSelectedIndex >= len(searchResults) {
		searchSelectedIndex = 0
	}
	renderSearchResults()
	scrollSelectedSearchResultIntoView()
}

func searchSelectPrev() {
	if len(searchResults) == 0 {
		return
	}
	searchSelectedIndex--
	if searchSelectedIndex < 0 {
		searchSelectedIndex = len(searchResults) - 1
	}
	renderSearchResults()
	scrollSelectedSearchResultIntoView()
}

func searchHasSelection() bool {
	return searchSelectedIndex >= 0 && searchSelectedIndex < len(searchResults)
}

func searchOpenSelected() {
	if searchHasSelection() {
		url := searchResults[searchSelectedIndex].Url
		closeSearch()
		navigate(url)
	}
}

func renderSearchResults() {
	if refElem("searchResults") != nil {
		gom.Mount("#search-page-results", SearchResultsList(searchResults, searchQuery.Get(), searchSelectedIndex))
	}
}

// setSearchInput writes the input's value; it is user-owned DOM state, not derived.
func setSearchInput(v string) {
	if inp := refElem("searchInput"); inp != nil {
		inp.(dom.HTMLInputElement).value = v
	}
}

// setSearchQuery updates query + results together and re-renders the list.
func setSearchQuery(q string) {
	searchQuery.Set(q)
	searchSelectedIndex = -1
	searchResults = performSearch(q)
	setSearchInput(q)
	renderSearchResults()
}

func openSearch() {
	openSearchWithTag("")
}

// openSearchWithTag resets the query on open (not on close) so the results
// don't vanish while the overlay is still fading out.
func openSearchWithTag(tag string) {
	closeMenus()
	searchOpen.Set(true)
	setSearchQuery(tag)
	focusLater("searchInput")
}

func clearSearch() {
	setSearchQuery("")
	focusLater("searchInput")
}

// closeSearch hides the overlay; the exit fade is CSS-only (#search-page transition).
func closeSearch() {
	searchOpen.Set(false)
}

func handleSearchInput(value string) {
	searchQuery.Set(value)
	searchSelectedIndex = -1
	if searchDebounceTimer != 0 {
		clearTimeout(searchDebounceTimer)
	}
	searchDebounceTimer = setTimeout(func() {
		searchResults = performSearch(searchQuery.Get())
		renderSearchResults()
	}, 150)
}
