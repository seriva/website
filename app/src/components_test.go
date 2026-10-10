package main

import "js:./browser.d.ts"
import "strings"
import "testing"

// mountTempl renders a templ component into a detached container (jsdom).
func mountTempl(node any) any {
	container := document.createElement("div")
	node.Mount(container)
	return container
}

func TestBlogPostCardMount(t *testing.T) {
	post := BlogPost{Title: "Hello", Date: "2026-01-02", Excerpt: "Intro", Href: "/blog/hello", Tags: []string{"go", "web"}}
	c := mountTempl(BlogPostCard(post))

	card := c.querySelector("article.blog-post-card")
	if card == nil {
		t.Fatal("expected article.blog-post-card")
	}
	if string(card.getAttribute("data-href")) != "/blog/hello" || string(card.getAttribute("data-action")) != "open-post" {
		t.Errorf("unexpected card attributes")
	}
	if card.hasAttribute("tabindex") {
		t.Errorf("card must not be a tab stop; its title link already is")
	}
	link := card.querySelector("h2 a")
	if link == nil || string(link.getAttribute("href")) != "/blog/hello" || string(link.textContent) != "Hello" {
		t.Errorf("expected title link to /blog/hello")
	}
	if int(card.querySelectorAll("[data-search-tag]").length) != 2 {
		t.Errorf("expected 2 tag spans")
	}
	if card.querySelector("svg.icon-calendar") == nil {
		t.Errorf("expected inline calendar icon")
	}
}

func TestPaginationMount(t *testing.T) {
	c := mountTempl(Pagination(1, 3))
	items := c.querySelectorAll("li.page-item")
	if int(items.length) != 7 {
		t.Fatalf("expected 7 page items, got %d", int(items.length))
	}
	if !strings.Contains(string(items[0].className), "disabled") || !strings.Contains(string(items[1].className), "disabled") {
		t.Errorf("first/prev should be disabled on page 1")
	}
	if !strings.Contains(string(items[2].className), "active") {
		t.Errorf("page 1 should be active")
	}
	if strings.Contains(string(items[6].className), "disabled") {
		t.Errorf("last should be enabled on page 1 of 3")
	}
	if string(items[4].querySelector("a").getAttribute("href")) != "/blog/page/3" {
		t.Errorf("expected page 3 href")
	}
}

func TestContactFormFieldsMount(t *testing.T) {
	form := ContactState{Name: "Ann", ErrEmail: true, StatusText: "Bad email", StatusType: "error", ButtonState: "sending", ButtonDisabled: true}
	c := mountTempl(ContactFormFields(form))

	if string(c.querySelector("#contact-name").value) != "Ann" {
		t.Errorf("expected name value mirrored into input")
	}
	email := c.querySelector("#contact-email")
	if string(email.className) != "error" || string(email.getAttribute("aria-invalid")) != "true" {
		t.Errorf("expected email marked invalid")
	}
	if string(c.querySelector("#contact-name").getAttribute("aria-invalid")) != "false" {
		t.Errorf("expected name aria-invalid=false")
	}
	if !strings.Contains(string(c.querySelector("#contact-status").className), "error") {
		t.Errorf("expected error status class")
	}
	btn := c.querySelector("#contact-submit")
	if !bool(btn.hasAttribute("disabled")) {
		t.Errorf("expected disabled?= to set the disabled attribute")
	}

	c2 := mountTempl(ContactFormFields(ContactState{ButtonState: "send"}))
	if bool(c2.querySelector("#contact-submit").hasAttribute("disabled")) {
		t.Errorf("expected enabled submit button")
	}
}

func TestNavbarMount(t *testing.T) {
	cfg := SiteConfig{Title: "Site", Social: []SocialLink{{Icon: "github", Href: "https://github.com/x", Target: "_blank", Rel: "noopener"}}}
	cfg.Search.Enabled = true
	pages := []NavPage{{ID: "about", Title: "About", ShowInNav: true, Href: "/page/about"}, {ID: "hidden", Title: "Hidden", Href: "/page/hidden"}}
	projs := []Project{{ID: "p1", Title: "P1", Href: "/project/p1"}}
	r := RouteMatch{Kind: RoutePage, Param: "about"}

	c := mountTempl(Navbar(r, pages, projs, false, true, cfg))

	if string(c.querySelector(".navbar-brand").textContent) != "Site" {
		t.Errorf("expected brand title")
	}
	if !strings.Contains(string(c.querySelector(".navbar-collapse").className), "show") {
		t.Errorf("expected collapse open")
	}
	if string(c.querySelector(".navbar-toggle").getAttribute("aria-expanded")) != "true" {
		t.Errorf("expected aria-expanded=true")
	}
	about := c.querySelector("a[href=\"/page/about\"]")
	if about == nil || !strings.Contains(string(about.className), "active") {
		t.Errorf("expected active about link")
	}
	if c.querySelector("a[href=\"/page/hidden\"]") != nil {
		t.Errorf("pages with ShowInNav=false must not render")
	}
	if c.querySelector("#projects-dropdown a[href=\"/project/p1\"]") == nil {
		t.Errorf("expected project dropdown item")
	}
	if c.querySelector("#search-toggle") == nil || c.querySelector("#email-toggle") != nil {
		t.Errorf("expected search button only (EmailJS disabled)")
	}
	if c.querySelector("a[href=\"https://github.com/x\"] svg.icon-github") == nil {
		t.Errorf("expected social github icon")
	}
}

func TestSearchResultsListMount(t *testing.T) {
	empty := mountTempl(SearchResultsList([]SearchResultItem{}, "zzz", -1))
	if empty.querySelector(".search-no-results") == nil {
		t.Errorf("expected no-results block for a non-empty query")
	}

	idle := mountTempl(SearchResultsList([]SearchResultItem{}, "", -1))
	if idle.children.length != 0 {
		t.Errorf("expected nothing rendered for empty query")
	}

	results := []SearchResultItem{
		{ID: "a", Title: "Go & Web", Description: "desc", Tags: []string{"go"}, ItemType: "project", Url: "/project/a"},
		{ID: "b", Title: "Second Item", Description: "desc2", Tags: []string{"go"}, ItemType: "blog", Url: "/blog/b"},
	}
	c := mountTempl(SearchResultsList(results, "go", 0))
	firstItem := c.querySelector(".search-result-item")
	if firstItem == nil || !strings.Contains(string(firstItem.className), "selected") {
		t.Errorf("expected first result to have selected class")
	}
	title := c.querySelector(".blog-post-title a")
	if title == nil || string(title.getAttribute("href")) != "/project/a" {
		t.Fatalf("expected result link")
	}
	if title.querySelector("mark") == nil || !strings.Contains(string(title.innerHTML), "&amp;") {
		t.Errorf("expected highlighted, escaped title; got %q", string(title.innerHTML))
	}
}

func TestBlogPostViewMount(t *testing.T) {
	v := newViewState()
	v.Post = BlogPost{Title: "T", Date: "2026-01-01", Tags: []string{}}
	v.HTML = "<h2 id=\"a\">A</h2><p>body</p>"
	v.TOC = []TOCItem{{ID: "a", Text: "A", Level: 2}, {ID: "b", Text: "B", Level: 3}}
	v.HasNext = true
	v.NextPost = BlogPost{Title: "N", Href: "/blog/n", Tags: []string{}}

	c := mountTempl(BlogPostView(v, true))
	if c.querySelector(".markdown-body h2#a") == nil {
		t.Errorf("expected raw HTML injected")
	}
	if int(c.querySelectorAll(".blog-toc-item").length) != 2 {
		t.Errorf("expected 2 TOC items")
	}
	if c.querySelector(".blog-nav-prev") != nil || c.querySelector(".blog-nav-next[href=\"/blog/n\"]") == nil {
		t.Errorf("expected only a next link")
	}
	if c.querySelector(".giscus-container") == nil {
		t.Errorf("expected comments container")
	}

	nf := newViewState()
	nf.Status = LoadNotFound
	if mountTempl(BlogPostView(nf, false)).querySelector(".error-message") == nil {
		t.Errorf("expected not-found message")
	}
}
