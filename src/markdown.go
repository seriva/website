package main

import "errors"
import "js:./browser.d.ts"
import "strconv"
import "strings"

// slugify converts a heading title into a URL-friendly anchor slug.
func slugify(text string) string {
	text = strings.ToLower(strings.TrimSpace(text))
	var b strings.Builder
	for i := 0; i < len(text); i++ {
		c := text[i]
		if (c >= 'a' && c <= 'z') || (c >= '0' && c <= '9') {
			b.WriteByte(c)
		} else if c == ' ' || c == '-' || c == '_' {
			if b.Len() > 0 && b.String()[b.Len()-1] != '-' {
				b.WriteByte('-')
			}
		}
	}
	res := strings.Trim(b.String(), "-")
	if res == "" {
		res = "section"
	}
	return res
}

// cleanHeadingText strips inline markdown (code spans, emphasis, link syntax,
// closing ATX hashes) so the TOC label matches the rendered heading text.
func cleanHeadingText(text string) string {
	text = strings.TrimSpace(text)
	text = strings.TrimRight(text, "#")
	text = strings.TrimSpace(text)
	var b strings.Builder
	i := 0
	for i < len(text) {
		c := text[i]
		switch {
		case c == '`' || c == '*' || c == '[':
			i++
		case c == ']':
			// Drop the "](url)" tail of a link, keep the label already written.
			i++
			if i < len(text) && text[i] == '(' {
				if end := strings.IndexByte(text[i:], ')'); end != -1 {
					i += end + 1
				}
			}
		default:
			b.WriteByte(c)
			i++
		}
	}
	return strings.TrimSpace(b.String())
}

// extractTOC extracts h2 and h3 headings outside code blocks and deduplicates slugs.
func extractTOC(markdown string) []TOCItem {
	items := []TOCItem{}
	if markdown == "" {
		return items
	}

	lines := strings.Split(markdown, "\n")
	inCode := false
	slugCounts := map[string]int{}

	for _, line := range lines {
		trimmed := strings.TrimSpace(line)
		if strings.HasPrefix(trimmed, "```") || strings.HasPrefix(trimmed, "~~~") {
			inCode = !inCode
			continue
		}
		if inCode {
			continue
		}

		level := 0
		headingText := ""
		if strings.HasPrefix(trimmed, "## ") {
			level = 2
			headingText = cleanHeadingText(trimmed[3:])
		} else if strings.HasPrefix(trimmed, "### ") {
			level = 3
			headingText = cleanHeadingText(trimmed[4:])
		}

		if level > 0 && headingText != "" {
			slug := slugify(headingText)
			id := slug
			if count, ok := slugCounts[slug]; ok {
				id = slug + "-" + strconv.Itoa(count)
				slugCounts[slug] = count + 1
			} else {
				slugCounts[slug] = 1
			}
			items = append(items, TOCItem{
				ID:    id,
				Text:  headingText,
				Level: level,
			})
		}
	}

	return items
}

// extractProjectTOC extracts headings from the project README and appends sections
// for Media, Demo, and Links if present.
func extractProjectTOC(markdown string, p Project) []TOCItem {
	items := extractTOC(markdown)
	if len(p.YoutubeVideos) > 0 {
		items = append(items, TOCItem{
			ID:    "project-media",
			Text:  t("project.media"),
			Level: 2,
		})
	}
	if p.DemoUrl != "" {
		items = append(items, TOCItem{
			ID:    "project-demo",
			Text:  demoLabel(p),
			Level: 2,
		})
	}
	if len(p.Links) > 0 {
		items = append(items, TOCItem{
			ID:    "project-links",
			Text:  t("project.links"),
			Level: 2,
		})
	}
	return items
}

// headingTextKey reduces rendered heading HTML to the same slug form as the
// markdown source so the two can be matched.
func headingTextKey(inner string) string {
	var b strings.Builder
	inTag := false
	for i := 0; i < len(inner); i++ {
		c := inner[i]
		if c == '<' {
			inTag = true
			continue
		}
		if c == '>' {
			inTag = false
			continue
		}
		if !inTag {
			b.WriteByte(c)
		}
	}
	text := b.String()
	text = strings.ReplaceAll(text, "&amp;", "&")
	text = strings.ReplaceAll(text, "&lt;", "<")
	text = strings.ReplaceAll(text, "&gt;", ">")
	text = strings.ReplaceAll(text, "&quot;", "\"")
	text = strings.ReplaceAll(text, "&#39;", "'")
	return slugify(text)
}

// injectHeadingIDs gives h2/h3 elements the id of the TOC item with matching
// text. Headings are matched by text rather than position, so a heading the
// markdown scan missed (setext, blockquote, indented code) only loses its own
// anchor instead of shifting every id after it.
func injectHeadingIDs(html string, toc []TOCItem) string {
	if len(toc) == 0 || html == "" {
		return html
	}

	// Ids queued per text key, consumed in document order so duplicates align.
	pending := map[string][]string{}
	for _, item := range toc {
		key := slugify(item.Text)
		pending[key] = append(pending[key], item.ID)
	}

	var b strings.Builder
	idx := 0

	for idx < len(html) {
		rest := html[idx:]
		if strings.HasPrefix(rest, "<h2") || strings.HasPrefix(rest, "<h3") {
			closeBracket := strings.Index(rest, ">")
			closeTag := strings.Index(rest, "</h")
			if closeBracket != -1 && closeTag != -1 && closeBracket < closeTag {
				openTag := rest[:closeBracket+1]
				key := headingTextKey(rest[closeBracket+1 : closeTag])
				ids := pending[key]
				if len(ids) > 0 && !strings.Contains(openTag, "id=") {
					pending[key] = ids[1:]
					b.WriteString(openTag[:3] + " id=\"" + ids[0] + "\"" + openTag[3:])
				} else {
					b.WriteString(openTag)
				}
				idx += closeBracket + 1
				continue
			}
		}

		b.WriteByte(html[idx])
		idx++
	}

	return b.String()
}

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
	convertMermaidBlocks()
	if Prism.languages.templ == nil && Prism.languages.go != nil {
		Prism.languages.templ = Prism.languages.go
	}
	Prism.highlightAll()
	attachCopyButtons()
	renderMermaid()
}

// convertMermaidBlocks swaps marked's ```mermaid fences for divs mermaid can
// render, keeping the source in data-mermaid-src so diagrams can be re-drawn.
func convertMermaidBlocks() int {
	codes := document.querySelectorAll("pre > code.language-mermaid")
	for i := 0; i < len(codes); i++ {
		code := codes[i]
		src := string(code.textContent)
		div := document.createElement("div")
		div.className = "mermaid"
		div.setAttribute("data-mermaid-src", src)
		div.textContent = src
		code.parentElement.replaceWith(div)
	}
	return len(codes)
}

func mermaidTheme(theme string) string {
	if theme == "light" {
		return "default"
	}
	return "dark"
}

// renderMermaid lazy-loads mermaid on first use and (re)draws every diagram
// on the page with the current theme.
async func renderMermaid() {
	defer func() {
		if r := recover(); r != nil {
			console.warn("Mermaid render error:", r)
		}
	}()
	nodes := document.querySelectorAll(".mermaid[data-mermaid-src]")
	if len(nodes) == 0 {
		return
	}
	await loadMermaid()
	for i := 0; i < len(nodes); i++ {
		n := nodes[i]
		n.removeAttribute("data-processed")
		n.textContent = n.getAttribute("data-mermaid-src")
	}
	mermaid.initialize(map[string]any{
		"startOnLoad":   false,
		"theme":         mermaidTheme(currentTheme),
		"securityLevel": "strict",
	})
	await mermaid.run(map[string]any{"nodes": nodes})
}
