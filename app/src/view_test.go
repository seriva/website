package main

import "testing"

var testPosts = []BlogPost{
	{Slug: "hello", Title: "Hello", Filename: "hello.md", Href: "/blog/hello", Tags: []string{}},
	{Slug: "second", Title: "Second", Filename: "second.md", Href: "/blog/second", Tags: []string{}},
	{Slug: "third", Title: "Third", Filename: "third.md", Href: "/blog/third", Tags: []string{}},
}

var testProjects = []Project{
	{ID: "gofront", Title: "GoFront", GithubRepo: "gofront", Href: "/project/gofront", Tags: []string{}, YoutubeVideos: []string{}, Links: []ProjectLink{}},
	{ID: "norepo", Title: "No Repo", DemoUrl: "https://demo", Href: "/project/norepo", Tags: []string{}, YoutubeVideos: []string{}, Links: []ProjectLink{}},
}

var testPages = []NavPage{
	{ID: "about", Title: "About", Href: "/page/about"},
}

var emptyCache = map[string]cachedContent{}

var testTOC = []TOCItem{{ID: "a", Text: "A", Level: 2}}

func TestNewViewState(t *testing.T) {
	v := newViewState()
	if v.Status != LoadReady {
		t.Errorf("expected zero status LoadReady, got %d", v.Status)
	}
	if len(v.Post.Tags) != 0 || len(v.Proj.Tags) != 0 || len(v.Proj.YoutubeVideos) != 0 || len(v.Proj.Links) != 0 || len(v.TOC) != 0 {
		t.Errorf("expected initialised empty slices")
	}
}

func TestResolvePost(t *testing.T) {
	t.Run("unknown slug is not found and needs no fetch", func(t *testing.T) {
		cache := map[string]cachedContent{"/blog/missing": {HTML: "<p>stale</p>", TOC: testTOC}}
		v, fetch := resolvePost("missing", testPosts, cache)
		if v.Status != LoadNotFound {
			t.Errorf("expected LoadNotFound, got %d", v.Status)
		}
		if fetch {
			t.Errorf("expected no fetch for unknown slug")
		}
		if v.HTML != "" {
			t.Errorf("unknown slug must not consult the cache, got %q", v.HTML)
		}
	})

	t.Run("cache hit is ready without fetch and restores TOC", func(t *testing.T) {
		cache := map[string]cachedContent{"/blog/hello": {HTML: "<p>hi</p>", TOC: testTOC}}
		v, fetch := resolvePost("hello", testPosts, cache)
		if v.Status != LoadReady {
			t.Errorf("expected LoadReady, got %d", v.Status)
		}
		if fetch {
			t.Errorf("expected no fetch on cache hit")
		}
		if v.HTML != "<p>hi</p>" {
			t.Errorf("expected cached html, got %q", v.HTML)
		}
		if len(v.TOC) != 1 || v.TOC[0].ID != "a" {
			t.Errorf("expected cached TOC, got %v", v.TOC)
		}
		if v.Post.Title != "Hello" {
			t.Errorf("expected post to be set, got %q", v.Post.Title)
		}
	})

	t.Run("cache miss is pending and needs fetch", func(t *testing.T) {
		v, fetch := resolvePost("second", testPosts, emptyCache)
		if v.Status != LoadPending {
			t.Errorf("expected LoadPending, got %d", v.Status)
		}
		if !fetch {
			t.Errorf("expected fetch on cache miss")
		}
		if v.Post.Filename != "second.md" {
			t.Errorf("expected post to be set, got %q", v.Post.Filename)
		}
	})

	t.Run("empty cached html counts as a miss", func(t *testing.T) {
		cache := map[string]cachedContent{"/blog/hello": {HTML: "", TOC: testTOC}}
		v, fetch := resolvePost("hello", testPosts, cache)
		if v.Status != LoadPending || !fetch {
			t.Errorf("expected pending fetch for empty cache entry")
		}
		if len(v.TOC) != 0 {
			t.Errorf("a miss must not copy the stale TOC")
		}
	})

	t.Run("resolves adjacent posts for first, middle, and last", func(t *testing.T) {
		resolve := func(slug string) ViewState {
			v, _ := resolvePost(slug, testPosts, emptyCache)
			return v
		}

		// First post (newest): NextPost is empty / HasNext is false, PrevPost is "second" / HasPrev is true
		v1 := resolve("hello")
		if v1.HasNext {
			t.Errorf("expected first post HasNext false, got %v", v1.HasNext)
		}
		if !v1.HasPrev || v1.PrevPost.Slug != "second" {
			t.Errorf("expected first post PrevPost 'second', got %v", v1.PrevPost)
		}

		// Middle post: NextPost is "hello", PrevPost is "third"
		v2 := resolve("second")
		if !v2.HasNext || v2.NextPost.Slug != "hello" {
			t.Errorf("expected middle post NextPost 'hello', got %v", v2.NextPost)
		}
		if !v2.HasPrev || v2.PrevPost.Slug != "third" {
			t.Errorf("expected middle post PrevPost 'third', got %v", v2.PrevPost)
		}

		// Last post (oldest): NextPost is "second", PrevPost is nil
		v3 := resolve("third")
		if !v3.HasNext || v3.NextPost.Slug != "second" {
			t.Errorf("expected last post NextPost 'second', got %v", v3.NextPost)
		}
		if v3.HasPrev {
			t.Errorf("expected last post HasPrev false, got %v", v3.HasPrev)
		}
	})
}

func TestResolveProject(t *testing.T) {
	t.Run("unknown id is not found", func(t *testing.T) {
		v, fetch := resolveProject("missing", testProjects, emptyCache)
		if v.Status != LoadNotFound || fetch {
			t.Errorf("expected LoadNotFound without fetch, got %d / %v", v.Status, fetch)
		}
		if v.Proj.ID != "" {
			t.Errorf("expected empty project, got %q", v.Proj.ID)
		}
	})

	t.Run("project without repo is ready without fetch and gets a section TOC", func(t *testing.T) {
		v, fetch := resolveProject("norepo", testProjects, emptyCache)
		if v.Status != LoadReady || fetch {
			t.Errorf("expected LoadReady without fetch, got %d / %v", v.Status, fetch)
		}
		if v.HTML != "" {
			t.Errorf("expected empty html, got %q", v.HTML)
		}
		if len(v.TOC) != 1 || v.TOC[0].ID != "project-demo" {
			t.Errorf("expected demo section in TOC, got %v", v.TOC)
		}
	})

	t.Run("cache hit is ready without fetch and restores TOC", func(t *testing.T) {
		cache := map[string]cachedContent{"/project/gofront": {HTML: "<h1>README</h1>", TOC: testTOC}}
		v, fetch := resolveProject("gofront", testProjects, cache)
		if v.Status != LoadReady || fetch {
			t.Errorf("expected LoadReady without fetch, got %d / %v", v.Status, fetch)
		}
		if v.HTML != "<h1>README</h1>" {
			t.Errorf("expected cached html, got %q", v.HTML)
		}
		if len(v.TOC) != 1 || v.TOC[0].ID != "a" {
			t.Errorf("expected cached TOC, got %v", v.TOC)
		}
	})

	t.Run("cache miss is pending and needs fetch", func(t *testing.T) {
		v, fetch := resolveProject("gofront", testProjects, emptyCache)
		if v.Status != LoadPending || !fetch {
			t.Errorf("expected LoadPending with fetch, got %d / %v", v.Status, fetch)
		}
		if v.Proj.Title != "GoFront" {
			t.Errorf("expected project to be set")
		}
	})

	t.Run("empty cached html counts as a miss", func(t *testing.T) {
		cache := map[string]cachedContent{"/project/gofront": {HTML: ""}}
		v, fetch := resolveProject("gofront", testProjects, cache)
		if v.Status != LoadPending || !fetch {
			t.Errorf("expected pending fetch for empty cache entry")
		}
	})
}

func TestReadmeURL(t *testing.T) {
	t.Run("bare repo gets username prefix and main branch", func(t *testing.T) {
		got := readmeURL(Project{GithubRepo: "gofront"}, "seriva")
		want := "https://raw.githubusercontent.com/seriva/gofront/main/README.md"
		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})

	t.Run("owner/repo is used as-is", func(t *testing.T) {
		got := readmeURL(Project{GithubRepo: "other/repo"}, "seriva")
		want := "https://raw.githubusercontent.com/other/repo/main/README.md"
		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})

	t.Run("explicit branch is honoured", func(t *testing.T) {
		got := readmeURL(Project{GithubRepo: "gofront", GithubBranch: "develop"}, "seriva")
		want := "https://raw.githubusercontent.com/seriva/gofront/develop/README.md"
		if got != want {
			t.Errorf("got %q, want %q", got, want)
		}
	})
}

func TestResolvePage(t *testing.T) {
	t.Run("known page with cache hit is ready", func(t *testing.T) {
		cache := map[string]cachedContent{"/page/about": {HTML: "<p>about</p>"}}
		v, fetch := resolvePage("about", testPages, cache)
		if v.Status != LoadReady || fetch {
			t.Errorf("expected LoadReady without fetch, got %d / %v", v.Status, fetch)
		}
		if v.Page.Title != "About" {
			t.Errorf("expected nav page title, got %q", v.Page.Title)
		}
	})

	t.Run("known page with cache miss is pending", func(t *testing.T) {
		v, fetch := resolvePage("about", testPages, emptyCache)
		if v.Status != LoadPending || !fetch {
			t.Errorf("expected LoadPending with fetch, got %d / %v", v.Status, fetch)
		}
	})

	t.Run("unknown page falls back to id as title and still fetches", func(t *testing.T) {
		v, fetch := resolvePage("secret", testPages, emptyCache)
		if v.Status != LoadPending || !fetch {
			t.Errorf("expected LoadPending with fetch, got %d / %v", v.Status, fetch)
		}
		if v.Page.ID != "secret" || v.Page.Title != "secret" || v.Page.Href != "/page/secret" {
			t.Errorf("expected fallback page, got %+v", v.Page)
		}
	})
}
