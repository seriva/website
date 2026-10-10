package main

import "js:./browser.d.ts"
import "strings"

// giscusTheme is the configured comments theme for the active site theme,
// falling back to the theme name itself ("dark"/"light").
func giscusTheme() string {
	if ct := getThemeColors(currentTheme).CommentsTheme; ct != "" {
		return ct
	}
	return currentTheme
}

// kebab converts a camelCase key to kebab-case (repoId -> repo-id).
func kebab(s string) string {
	var b strings.Builder
	for i := 0; i < len(s); i++ {
		c := s[i]
		if c >= 'A' && c <= 'Z' {
			b.WriteByte('-')
			b.WriteByte(c + ('a' - 'A'))
		} else {
			b.WriteByte(c)
		}
	}
	return b.String()
}

// giscusAttrs maps the raw comments config to data-* attributes; the two page
// toggles are ours, everything else is passed through to giscus.
func giscusAttrs(raw any, theme string) map[string]string {
	attrs := map[string]string{"data-theme": theme}
	if raw != nil {
		for k, v := range raw.(map[string]any) {
			if k == "blogEnabled" || k == "projectsEnabled" {
				continue
			}
			attrs["data-"+kebab(k)] = strVal(v)
		}
	}
	return attrs
}

func loadGiscus() {
	container := document.querySelector(".giscus-container")
	if container == nil {
		return
	}

	// Clear any existing giscus content
	container.innerHTML = ""

	script := document.createElement("script")
	script.src = "https://giscus.app/client.js"
	for name, value := range giscusAttrs(site.Comments.Attrs, giscusTheme()) {
		script.setAttribute(name, value)
	}
	script.setAttribute("crossorigin", "anonymous")
	script.async = true
	container.appendChild(script)
}

func updateGiscusTheme() {
	iframe := document.querySelector("iframe.giscus-frame")
	if iframe == nil {
		return
	}

	iframe.contentWindow.postMessage(map[string]any{
		"giscus": map[string]any{
			"setConfig": map[string]any{
				"theme": giscusTheme(),
			},
		},
	}, "https://giscus.app")
}
