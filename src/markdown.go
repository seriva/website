package main

import "errors"
import "js:./browser.d.ts"
import "strings"

func parseMarkdown(content string) string {
	if content == "" {
		return ""
	}
	defer func() {
		if r := recover(); r != nil {
			console.error("Error rendering markdown:", r)
		}
	}()
	return marked.parse(content)
}

func stripFrontmatter(markdown string) string {
	trimmed := strings.TrimSpace(markdown)
	if !strings.HasPrefix(trimmed, "---") {
		return trimmed
	}

	rest := trimmed[3:]
	newlineIdx := strings.Index(rest, "\n")
	if newlineIdx == -1 {
		return trimmed
	}
	afterFirstLine := rest[newlineIdx+1:]
	closingIdx := strings.Index(afterFirstLine, "\n---")
	if closingIdx == -1 {
		closingIdx = strings.Index(afterFirstLine, "---")
		if closingIdx == -1 {
			return trimmed
		}
		afterClosing := afterFirstLine[closingIdx+3:]
		return strings.TrimSpace(afterClosing)
	}

	afterClosing := afterFirstLine[closingIdx+4:]
	return strings.TrimSpace(afterClosing)
}

func parseFrontmatter(markdown string) (map[string]any, string) {
	return map[string]any{}, stripFrontmatter(markdown)
}

async func loadMarkdownFile(url string) (string, error) {
	defer func() {
		if r := recover(); r != nil {
			console.error("fetch failed:", r)
		}
	}()

	res := await fetch(url)
	if res == nil || !res.ok {
		return "", errors.New("HTTP error")
	}

	text := await res.text()
	return string(text), nil
}

func attachCopyButtons() {
	pres := document.querySelectorAll("pre")
	for i := 0; i < len(pres); i++ {
		pre := pres[i]
		if pre.querySelector(".copy-code-button") != nil {
			continue
		}
		btn := document.createElement("button")
		btn.className = "copy-code-button"
		btn.setAttribute("data-action", "copy-code")
		btn.setAttribute("aria-label", t("aria.copyCode"))
		btn.textContent = t("code.copy")
		pre.style.position = "relative"
		pre.appendChild(btn)
	}
}

func highlightCode() {
	defer func() {
		if r := recover(); r != nil {
			console.warn("Prism highlight error:", r)
		}
	}()
	Prism.highlightAll()
	attachCopyButtons()
}
