package main

import "js:./browser.d.ts"

func loadGiscus() {
	container := document.querySelector(".giscus-container")
	if container == nil {
		return
	}

	// Clear any existing giscus content
	container.innerHTML = ""

	colors := getThemeColors(currentTheme)
	giscusTheme := colors.CommentsTheme
	if giscusTheme == "" {
		giscusTheme = currentTheme
	}

	script := document.createElement("script")
	script.src = "https://giscus.app/client.js"
	script.setAttribute("data-repo", site.Comments.Repo)
	script.setAttribute("data-repo-id", site.Comments.RepoId)
	script.setAttribute("data-category", site.Comments.Category)
	script.setAttribute("data-category-id", site.Comments.CategoryId)
	script.setAttribute("data-mapping", site.Comments.Mapping)
	script.setAttribute("data-strict", site.Comments.Strict)
	script.setAttribute("data-reactions-enabled", site.Comments.ReactionsEnabled)
	script.setAttribute("data-emit-metadata", site.Comments.EmitMetadata)
	script.setAttribute("data-input-position", site.Comments.InputPosition)
	script.setAttribute("data-theme", giscusTheme)
	script.setAttribute("data-lang", site.Comments.Lang)
	script.setAttribute("crossorigin", "anonymous")
	script.async = true
	container.appendChild(script)
}

func updateGiscusTheme() {
	iframe := document.querySelector("iframe.giscus-frame")
	if iframe == nil {
		return
	}

	colors := getThemeColors(currentTheme)
	giscusTheme := colors.CommentsTheme
	if giscusTheme == "" {
		giscusTheme = currentTheme
	}

	iframe.contentWindow.postMessage(map[string]any{
		"giscus": map[string]any{
			"setConfig": map[string]any{
				"theme": giscusTheme,
			},
		},
	}, "https://giscus.app")
}
