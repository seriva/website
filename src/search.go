package main

import "js:./browser.d.ts"
import "strings"

var fuseInstance any
var searchDebounceTimer any

func initSearch() {
	var searchItems []any

	// Index projects
	for _, p := range projects {
		item := map[string]any{
			"id":          p.ID,
			"title":       p.Title,
			"description": p.Description,
			"tags":        p.Tags,
			"type":        "project",
			"url":         p.Href,
		}
		searchItems = append(searchItems, item)
	}

	// Index blog posts
	for _, p := range posts {
		item := map[string]any{
			"id":          p.Slug,
			"title":       p.Title,
			"description": p.Excerpt,
			"tags":        p.Tags,
			"type":        "blog",
			"url":         p.Href,
		}
		searchItems = append(searchItems, item)
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
	fuseInstance = Reflect.construct(window.Fuse, []any{searchItems, options})
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
			for _, t := range rawItem.tags {
				tags = append(tags, string(t))
			}
		}

		out = append(out, SearchResultItem{
			ID:          string(rawItem.id),
			Title:       string(rawItem.title),
			Description: string(rawItem.description),
			Tags:        tags,
			ItemType:    string(rawItem.type),
			Url:         string(rawItem.url),
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
	el := document.querySelector("#search-page-results")
	if el != nil {
		gom.Mount("#search-page-results", SearchResultsList(searchResults, searchQuery, searchSelectedIndex))
	}
}

// setSearchInput writes the input's value; it is user-owned DOM state, not derived.
func setSearchInput(v string) {
	inp := document.querySelector("#search-page-input")
	if inp != nil {
		inp.value = v
	}
}

// setSearchQuery updates query + results together and re-renders the list.
func setSearchQuery(q string) {
	searchQuery = q
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
	searchOpen = true
	setSearchQuery(tag)
	syncOverlays()
	focusLater("#search-page-input")
}

func clearSearch() {
	setSearchQuery("")
	syncOverlays()
	focusLater("#search-page-input")
}

// closeSearch hides the overlay; the exit fade is CSS-only (#search-page transition).
func closeSearch() {
	if !searchOpen {
		return
	}
	searchOpen = false
	syncOverlays()
}

func handleSearchInput(value string) {
	searchQuery = value
	searchSelectedIndex = -1
	syncOverlays()
	if searchDebounceTimer != nil {
		clearTimeout(searchDebounceTimer)
	}
	searchDebounceTimer = setTimeout(func() {
		searchResults = performSearch(searchQuery)
		renderSearchResults()
	}, 150)
}
