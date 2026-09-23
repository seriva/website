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
		"minMatchCharLength": 2,
	}

	fuseInstance = createFuse(searchItems, options)
}

func performSearch(q string) []SearchResultItem {
	trimmed := strings.TrimSpace(q)
	if len(trimmed) < 2 || fuseInstance == nil {
		return []SearchResultItem{}
	}

	results := fuseInstance.search(trimmed)
	var out []SearchResultItem
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
	el := document.querySelector("#search-page-results")
	if el != nil {
		gom.Mount("#search-page-results", SearchResultsList())
	}
}

func openSearch() {
	searchOpen = true
	searchClosing = false
	searchEl := document.querySelector("#search-page")
	if searchEl != nil {
		searchEl.classList.remove("closing")
		searchEl.classList.add("show")
	}
	setTimeout(func() {
		inp := document.querySelector("#search-page-input")
		if inp != nil {
			inp.focus()
		}
	}, 50)
}

func openSearchWithTag(tag string) {
	searchOpen = true
	searchClosing = false
	searchQuery = tag
	searchResults = performSearch(tag)
	searchEl := document.querySelector("#search-page")
	if searchEl != nil {
		searchEl.classList.remove("closing")
		searchEl.classList.add("show")
	}
	clearBtn := document.querySelector("#search-page-clear")
	if clearBtn != nil {
		clearBtn.classList.add("show")
	}
	renderSearchResults()
	setTimeout(func() {
		inp := document.querySelector("#search-page-input")
		if inp != nil {
			inp.value = tag
			inp.focus()
		}
	}, 50)
}

func closeSearch() {
	if !searchOpen {
		return
	}
	searchClosing = true
	searchEl := document.querySelector("#search-page")
	if searchEl != nil {
		searchEl.classList.add("closing")
	}
	setTimeout(func() {
		searchOpen = false
		searchClosing = false
		searchQuery = ""
		searchResults = []SearchResultItem{}
		if searchEl != nil {
			searchEl.classList.remove("show")
			searchEl.classList.remove("closing")
		}
		inp := document.querySelector("#search-page-input")
		if inp != nil {
			inp.value = ""
		}
		clearBtn := document.querySelector("#search-page-clear")
		if clearBtn != nil {
			clearBtn.classList.remove("show")
		}
		renderSearchResults()
	}, 200)
}

func handleSearchInput(value string) {
	searchQuery = value
	clearBtn := document.querySelector("#search-page-clear")
	if clearBtn != nil {
		if value != "" {
			clearBtn.classList.add("show")
		} else {
			clearBtn.classList.remove("show")
		}
	}
	if searchDebounceTimer != nil {
		clearTimeout(searchDebounceTimer)
	}
	searchDebounceTimer = setTimeout(func() {
		searchResults = performSearch(searchQuery)
		renderSearchResults()
	}, 150)
}
