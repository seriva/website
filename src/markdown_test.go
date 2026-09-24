package main

import (
	"strings"
	"testing"
)

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

func TestParseFrontmatterCompatibility(t *testing.T) {
	content := "---\ntitle: Compatibility\n---\n\nBody text"
	_, body := parseFrontmatter(content)

	if body != "Body text" {
		t.Errorf("expected 'Body text', got %q", body)
	}
}
