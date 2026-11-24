package main

import "js:./browser.d.ts"
import "strings"
import "testing"

func testTranslate(key string) string {
	return t(key)
}

func TestTranslation(tt *testing.T) {
	tt.Run("returns value when key exists", func(tt *testing.T) {
		translations["nav.blog"] = "Blog"
		result := testTranslate("nav.blog")
		if result != "Blog" {
			tt.Errorf("expected 'Blog', got %q", result)
		}
		delete(translations, "nav.blog")
	})

	tt.Run("returns key when not found", func(tt *testing.T) {
		delete(translations, "missing.key")
		result := testTranslate("missing.key")
		if result != "missing.key" {
			tt.Errorf("expected 'missing.key', got %q", result)
		}
	})

	tt.Run("returns key when value is empty", func(tt *testing.T) {
		translations["empty"] = ""
		result := testTranslate("empty")
		if result != "empty" {
			tt.Errorf("expected 'empty', got %q", result)
		}
		delete(translations, "empty")
	})
}

func TestSortPostsByDate(t *testing.T) {
	posts := []BlogPost{
		{Slug: "b", Date: "2025-06-01"},
		{Slug: "c", Date: "2026-01-15"},
		{Slug: "a", Date: "2024-12-31"},
		{Slug: "d", Date: ""},
	}
	sortPostsByDate(posts)
	want := []string{"c", "b", "a", "d"}
	for i, w := range want {
		if posts[i].Slug != w {
			t.Errorf("position %d = %q, want %q", i, posts[i].Slug, w)
		}
	}
}

func TestSortProjectsByOrder(t *testing.T) {
	list := []Project{{ID: "c", Order: 3}, {ID: "a", Order: 1}, {ID: "b", Order: 2}}
	sortProjectsByOrder(list)
	if list[0].ID != "a" || list[1].ID != "b" || list[2].ID != "c" {
		t.Errorf("order = %s %s %s", list[0].ID, list[1].ID, list[2].ID)
	}
}

func TestSortPagesByOrder(t *testing.T) {
	list := []NavPage{{ID: "z", Order: 9}, {ID: "m", Order: 4}}
	sortPagesByOrder(list)
	if list[0].ID != "m" || list[1].ID != "z" {
		t.Errorf("order = %s %s", list[0].ID, list[1].ID)
	}
}

func TestUpdateRouteMeta(t *testing.T) {
	site.Title = "luukvanvenrooij.nl"
	updateRouteMeta("My Test Post - luukvanvenrooij.nl", "A detailed test excerpt", "/blog/test-post")

	if document.title != "My Test Post - luukvanvenrooij.nl" {
		t.Errorf("expected document.title 'My Test Post - luukvanvenrooij.nl', got %q", document.title)
	}

	metaDesc := document.querySelector("meta[name=\"description\"]")
	if metaDesc == nil || string(metaDesc.getAttribute("content")) != "A detailed test excerpt" {
		t.Errorf("expected meta description 'A detailed test excerpt'")
	}

	ogTitle := document.querySelector("meta[property=\"og:title\"]")
	if ogTitle == nil || string(ogTitle.getAttribute("content")) != "My Test Post - luukvanvenrooij.nl" {
		t.Errorf("expected og:title 'My Test Post - luukvanvenrooij.nl'")
	}

	canonical := document.querySelector("link[rel=\"canonical\"]")
	if canonical == nil || !strings.Contains(string(canonical.getAttribute("href")), "/blog/test-post") {
		t.Errorf("expected canonical link containing '/blog/test-post'")
	}
}

func TestAnnounceRoute(t *testing.T) {
	prev := routeAnnouncement.Get()
	defer routeAnnouncement.Set(prev)

	c := mountTempl(AppShell())
	announceRoute("Test Page")
	expected := "Navigated to Test Page"
	if routeAnnouncement.Get() != expected {
		t.Errorf("expected signal %q, got %q", expected, routeAnnouncement.Get())
	}
	announcer := c.querySelector("#route-announcer")
	if announcer == nil || string(announcer.textContent) != expected {
		t.Errorf("expected announcer DOM %q, got %q", expected, string(announcer.textContent))
	}

	// Repeating the same title must still emit a change for screen readers.
	seen := []string{}
	unsub := routeAnnouncement.Subscribe(func(v string) {
		seen = append(seen, v)
	})
	defer unsub()

	announceRoute("Test Page")
	if len(seen) != 2 || seen[0] != "" || seen[1] != expected {
		t.Errorf("expected repeated title to clear then re-set signal, got %v", seen)
	}
	if string(announcer.textContent) != expected {
		t.Errorf("expected announcer DOM %q after repeat, got %q", expected, string(announcer.textContent))
	}
}

async func TestInitDataFromScript(t *testing.T) {
	script := document.createElement("script")
	script.id = "site-data"
	script.setAttribute("type", "application/json")
	script.textContent = `{"site":{"title":"Test Site","url":"https://example.com/","description":"Test desc","author":"Tester","github_username":"testuser","theme":{"dark":{"primary":"#111"}},"search":{"enabled":true,"minChars":3}},"blog":{"postsPerPage":10,"posts":[{"filename":"2026-10-20-test.md","title":"Test Blog","date":"2026-10-20","excerpt":"Short excerpt","tags":["go","front"]}]},"projects":[{"id":"myproj","title":"My Project","description":"Proj desc","order":1}],"pages":{"help":{"title":"Help Page","order":2,"showInNav":true}},"translations":{"en":{"nav.test":"Test Label"}}}`
	document.head.appendChild(script)
	defer script.remove()

	err := await initData()
	if err != nil {
		t.Fatalf("initData failed: %v", err)
	}

	if site.Title != "Test Site" {
		t.Errorf("expected site.Title 'Test Site', got %q", site.Title)
	}
	if site.Url != "https://example.com" {
		t.Errorf("expected site.Url 'https://example.com', got %q", site.Url)
	}
	if site.PostsPerPage != 10 {
		t.Errorf("expected site.PostsPerPage 10, got %d", site.PostsPerPage)
	}
	if len(posts) == 0 || posts[0].Slug != "2026-10-20-test" || posts[0].Href != "/blog/2026-10-20-test" {
		t.Errorf("expected post slug and href to be computed, got %+v", posts)
	}
	if len(projects) == 0 || projects[0].ID != "myproj" || projects[0].Href != "/project/myproj" {
		t.Errorf("expected project href to be computed, got %+v", projects)
	}
	if translations["nav.test"] != "Test Label" {
		t.Errorf("expected translation 'Test Label', got %q", translations["nav.test"])
	}
}
