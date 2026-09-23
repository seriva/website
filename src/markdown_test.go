package main

import (
	"strings"
	"testing"
)

func TestParseFrontmatterNoFrontmatter(t *testing.T) {
	content := "# Hello World\n\nThis is content."
	meta, body := parseFrontmatter(content)

	if len(meta) != 0 {
		t.Errorf("expected empty metadata, got %v", meta)
	}
	if !strings.Contains(body, "Hello World") {
		t.Errorf("expected body to contain original content, got %q", body)
	}
}

func TestParseFrontmatterValid(t *testing.T) {
	content := "---\ntitle: Hello\ndate: 2024-01-01\n---\n\n# Content here"
	meta, body := parseFrontmatter(content)

	if meta["title"] != "Hello" {
		t.Errorf("expected title='Hello', got %v", meta["title"])
	}
	if meta["date"] != "2024-01-01" {
		t.Errorf("expected date='2024-01-01', got %v", meta["date"])
	}
	if !strings.Contains(body, "Content here") {
		t.Errorf("expected body to contain 'Content here', got %q", body)
	}
	if strings.Contains(body, "---") {
		t.Errorf("expected body to not contain frontmatter delimiters, got %q", body)
	}
}

func TestParseFrontmatterMalformed(t *testing.T) {
	// Only opening delimiter, no closing
	content := "---\ntitle: Hello\nThis is just content"
	meta, body := parseFrontmatter(content)

	// Should return empty metadata and original content when malformed
	if len(meta) != 0 {
		t.Errorf("expected empty metadata for malformed frontmatter, got %v", meta)
	}
	if body == "" {
		t.Error("expected non-empty body for malformed frontmatter")
	}
}
