package main

import "js:./browser.d.ts"
import "strings"

var fuseInstance any
var searchDebounceTimer any
var searchClosing bool

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
			"url":         "/project/" + p.ID,
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
			"url":         "/blog/" + p.Slug,
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

	fuseInstance = createFuse(searchItems, options)
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

func renderSearchResults() {
	gom.Mount("#search-page-results", SearchResultsList(searchResults, searchQuery))
}

// setSearchInput writes the input's value; it is user-owned DOM state, not derived.
func setSearchInput(v string) {
	inp := document.querySelector("#search-page-input")
	if inp != nil {
		inp.value = v
	}
}

func openSearch() {
	searchOpen = true
	searchClosing = false
	syncOverlays()
	focusLater("#search-page-input")
}

func openSearchWithTag(tag string) {
	searchOpen = true
	searchClosing = false
	searchQuery = tag
	searchResults = performSearch(tag)
	setSearchInput(tag)
	renderSearchResults()
	syncOverlays()
	focusLater("#search-page-input")
}

func clearSearch() {
	searchQuery = ""
	searchResults = []SearchResultItem{}
	setSearchInput("")
	renderSearchResults()
	syncOverlays()
	focusLater("#search-page-input")
}

func closeSearch() {
	if !searchOpen {
		return
	}
	searchClosing = true
	syncOverlays()
	setTimeout(func() {
		searchOpen = false
		searchClosing = false
		searchQuery = ""
		searchResults = []SearchResultItem{}
		setSearchInput("")
		renderSearchResults()
		syncOverlays()
	}, 200)
}

func handleSearchInput(value string) {
	searchQuery = value
	syncOverlays()
	if searchDebounceTimer != nil {
		clearTimeout(searchDebounceTimer)
	}
	searchDebounceTimer = setTimeout(func() {
		searchResults = performSearch(searchQuery)
		renderSearchResults()
	}, 150)
}
