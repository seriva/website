package main

import (
	"js:./browser.d.ts"
	"strings"
	"testing"
)

func TestMermaidTheme(t *testing.T) {
	if got := mermaidTheme("light"); got != "default" {
		t.Errorf("light -> %q, want default", got)
	}
	if got := mermaidTheme("dark"); got != "dark" {
		t.Errorf("dark -> %q, want dark", got)
	}
}

func TestConvertMermaidBlocks(t *testing.T) {
	root := document.createElement("div")
	root.innerHTML = "<pre><code class=\"language-mermaid\">graph TD\n  A--&gt;B</code></pre>" +
		"<pre><code class=\"language-go\">fmt.Println()</code></pre>"
	document.body.appendChild(root)
	defer root.remove()

	if n := convertMermaidBlocks(); n != 1 {
		t.Fatalf("converted %d blocks, want 1", n)
	}
	if root.querySelector("code.language-mermaid") != nil {
		t.Error("mermaid <pre> should be replaced")
	}
	if root.querySelector("code.language-go") == nil {
		t.Error("non-mermaid <pre> must be untouched")
	}
	div := root.querySelector(".mermaid")
	if div == nil {
		t.Fatal("expected .mermaid div")
	}
	if got := string(div.getAttribute("data-mermaid-src")); got != "graph TD\n  A-->B" {
		t.Errorf("data-mermaid-src = %q", got)
	}
	if got := string(div.textContent); got != "graph TD\n  A-->B" {
		t.Errorf("textContent = %q", got)
	}
	if n := convertMermaidBlocks(); n != 0 {
		t.Errorf("second pass converted %d blocks, want 0", n)
	}
}

func TestStripFrontmatterNoFrontmatter(t *testing.T) {
	content := "# Hello World\n\nThis is content."
	body := stripFrontmatter(content)

	if !strings.Contains(body, "Hello World") {
		t.Errorf("expected body to contain original content, got %q", body)
	}
}

func TestStripFrontmatterValid(t *testing.T) {
	content := "---\ntitle: Hello\ndate: 2024-01-01\n---\n\n# Content here"
	body := stripFrontmatter(content)

	if !strings.Contains(body, "Content here") {
		t.Errorf("expected body to contain 'Content here', got %q", body)
	}
	if strings.Contains(body, "title: Hello") || strings.Contains(body, "---") {
		t.Errorf("expected body to not contain frontmatter, got %q", body)
	}
}

func TestStripFrontmatterMalformed(t *testing.T) {
	// Only opening delimiter, no closing
	content := "---\ntitle: Hello\nThis is just content"
	body := stripFrontmatter(content)

	if body == "" {
		t.Error("expected non-empty body for malformed frontmatter")
	}
}

func TestStripFrontmatterClosingAtEOF(t *testing.T) {
	content := "---\ntitle: Only Meta\n---"
	body := stripFrontmatter(content)

	if body != "" {
		t.Errorf("expected empty body, got %q", body)
	}
}

func TestSlugify(t *testing.T) {
	cases := []struct {
		in   string
		want string
	}{
		{"Hello World", "hello-world"},
		{"What is GoFront (2.0)?", "what-is-gofront-20"},
		{"---Trim Me---", "trim-me"},
		{"Multiple   Spaces & Special! Characters", "multiple-spaces-special-characters"},
		{"", "section"},
	}

	for _, c := range cases {
		got := slugify(c.in)
		if got != c.want {
			t.Errorf("slugify(%q) = %q, want %q", c.in, got, c.want)
		}
	}
}

func TestExtractTOC(t *testing.T) {
	md := "# Main Title (ignored)\n" +
		"Introduction text\n\n" +
		"## First Heading\n" +
		"Some content\n\n" +
		"### Sub Heading\n" +
		"More details\n\n" +
		"```go\n" +
		"// Inside code fence:\n" +
		"## Fake Heading\n" +
		"### Fake Sub Heading\n" +
		"```\n\n" +
		"## First Heading\n" +
		"Duplicate heading text\n\n" +
		"### Another Sub\n" +
		"Final text"

	items := extractTOC(md)
	if len(items) != 4 {
		t.Fatalf("expected 4 TOC items, got %d", len(items))
	}

	if items[0].ID != "first-heading" || items[0].Level != 2 || items[0].Text != "First Heading" {
		t.Errorf("item 0 mismatch: %+v", items[0])
	}
	if items[1].ID != "sub-heading" || items[1].Level != 3 || items[1].Text != "Sub Heading" {
		t.Errorf("item 1 mismatch: %+v", items[1])
	}
	if items[2].ID != "first-heading-1" || items[2].Level != 2 || items[2].Text != "First Heading" {
		t.Errorf("item 2 duplicate mismatch: %+v", items[2])
	}
	if items[3].ID != "another-sub" || items[3].Level != 3 || items[3].Text != "Another Sub" {
		t.Errorf("item 3 mismatch: %+v", items[3])
	}
}

func TestCleanHeadingText(t *testing.T) {
	cases := []struct {
		in   string
		want string
	}{
		{"Plain", "Plain"},
		{"Using `code` here", "Using code here"},
		{"**Bold** and *em*", "Bold and em"},
		{"See [the docs](https://example.com) now", "See the docs now"},
		{"Closing hashes ##", "Closing hashes"},
	}
	for _, c := range cases {
		if got := cleanHeadingText(c.in); got != c.want {
			t.Errorf("cleanHeadingText(%q) = %q, want %q", c.in, got, c.want)
		}
	}
}

func TestInjectHeadingIDs(t *testing.T) {
	t.Run("assigns ids in order", func(t *testing.T) {
		toc := []TOCItem{
			{ID: "first", Text: "First", Level: 2},
			{ID: "sub", Text: "Sub", Level: 3},
		}
		html := `<h2>First</h2><p>text</p><h3>Sub</h3>`
		got := injectHeadingIDs(html, toc)
		want := `<h2 id="first">First</h2><p>text</p><h3 id="sub">Sub</h3>`
		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})

	t.Run("matches by text so unlisted headings do not shift ids", func(t *testing.T) {
		toc := []TOCItem{
			{ID: "alpha", Text: "Alpha", Level: 2},
			{ID: "beta", Text: "Beta", Level: 2},
		}
		// The blockquoted heading is emitted by marked but never scanned by extractTOC.
		html := `<h2>Alpha</h2><blockquote><h2>Quoted</h2></blockquote><h2>Beta</h2>`
		got := injectHeadingIDs(html, toc)
		want := `<h2 id="alpha">Alpha</h2><blockquote><h2>Quoted</h2></blockquote><h2 id="beta">Beta</h2>`
		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})

	t.Run("matches through inline markup, entities and duplicates", func(t *testing.T) {
		toc := extractTOC("## Tips & Tricks\n\n## Using `code`\n\n## Tips & Tricks\n")
		html := `<h2>Tips &amp; Tricks</h2><h2>Using <code>code</code></h2><h2>Tips &amp; Tricks</h2>`
		got := injectHeadingIDs(html, toc)
		want := `<h2 id="tips-tricks">Tips &amp; Tricks</h2><h2 id="using-code">Using <code>code</code></h2><h2 id="tips-tricks-1">Tips &amp; Tricks</h2>`
		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})
}
