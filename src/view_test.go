package main

import "testing"

var testPosts = []BlogPost{
	{ID: "hello", Slug: "hello", Title: "Hello", Filename: "hello.md", Tags: []string{}},
	{ID: "second", Slug: "second", Title: "Second", Filename: "second.md", Tags: []string{}},
}

var testProjects = []Project{
	{ID: "gofront", Title: "GoFront", GithubRepo: "gofront", Tags: []string{}, YoutubeVideos: []string{}, Links: []ProjectLink{}},
	{ID: "norepo", Title: "No Repo", Tags: []string{}, YoutubeVideos: []string{}, Links: []ProjectLink{}},
}

var testPages = []NavPage{
	{ID: "about", Title: "About"},
}

func TestNewViewState(t *testing.T) {
	v := newViewState()
	if v.Status != LoadReady {
		t.Errorf("expected zero status LoadReady, got %d", v.Status)
	}
	if len(v.Post.Tags) != 0 || len(v.Proj.Tags) != 0 || len(v.Proj.YoutubeVideos) != 0 || len(v.Proj.Links) != 0 {
		t.Errorf("expected initialised empty slices")
	}
}

func TestResolvePost(t *testing.T) {
	t.Run("unknown slug is not found and needs no fetch", func(t *testing.T) {
		v, fetch := resolvePost("missing", testPosts, map[string]string{})
		if v.Status != LoadNotFound {
			t.Errorf("expected LoadNotFound, got %d", v.Status)
		}
		if fetch {
			t.Errorf("expected no fetch for unknown slug")
		}
	})

	t.Run("cache hit is ready without fetch", func(t *testing.T) {
		cache := map[string]string{"hello.md": "<p>hi</p>"}
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
		if v.Post.Title != "Hello" {
			t.Errorf("expected post to be set, got %q", v.Post.Title)
		}
	})

	t.Run("cache miss is pending and needs fetch", func(t *testing.T) {
		v, fetch := resolvePost("second", testPosts, map[string]string{})
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
		cache := map[string]string{"hello.md": ""}
		v, fetch := resolvePost("hello", testPosts, cache)
		if v.Status != LoadPending || !fetch {
			t.Errorf("expected pending fetch for empty cache entry")
		}
	})
}

func TestResolveProject(t *testing.T) {
	t.Run("unknown id is not found", func(t *testing.T) {
		v, fetch := resolveProject("missing", testProjects, map[string]string{})
		if v.Status != LoadNotFound || fetch {
			t.Errorf("expected LoadNotFound without fetch, got %d / %v", v.Status, fetch)
		}
		if v.Proj.ID != "" {
			t.Errorf("expected empty project, got %q", v.Proj.ID)
		}
	})

	t.Run("project without repo is ready without fetch", func(t *testing.T) {
		v, fetch := resolveProject("norepo", testProjects, map[string]string{})
		if v.Status != LoadReady || fetch {
			t.Errorf("expected LoadReady without fetch, got %d / %v", v.Status, fetch)
		}
		if v.HTML != "" {
			t.Errorf("expected empty html, got %q", v.HTML)
		}
	})

	t.Run("cache hit is ready without fetch", func(t *testing.T) {
		cache := map[string]string{"gofront": "<h1>README</h1>"}
		v, fetch := resolveProject("gofront", testProjects, cache)
		if v.Status != LoadReady || fetch {
			t.Errorf("expected LoadReady without fetch, got %d / %v", v.Status, fetch)
		}
		if v.HTML != "<h1>README</h1>" {
			t.Errorf("expected cached html, got %q", v.HTML)
		}
	})

	t.Run("cache miss is pending and needs fetch", func(t *testing.T) {
		v, fetch := resolveProject("gofront", testProjects, map[string]string{})
		if v.Status != LoadPending || !fetch {
			t.Errorf("expected LoadPending with fetch, got %d / %v", v.Status, fetch)
		}
		if v.Proj.Title != "GoFront" {
			t.Errorf("expected project to be set")
		}
	})

	t.Run("empty cached html counts as a miss", func(t *testing.T) {
		cache := map[string]string{"gofront": ""}
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
		cache := map[string]string{"about": "<p>about</p>"}
		v, fetch := resolvePage("about", testPages, cache)
		if v.Status != LoadReady || fetch {
			t.Errorf("expected LoadReady without fetch, got %d / %v", v.Status, fetch)
		}
		if v.Page.Title != "About" {
			t.Errorf("expected nav page title, got %q", v.Page.Title)
		}
	})

	t.Run("known page with cache miss is pending", func(t *testing.T) {
		v, fetch := resolvePage("about", testPages, map[string]string{})
		if v.Status != LoadPending || !fetch {
			t.Errorf("expected LoadPending with fetch, got %d / %v", v.Status, fetch)
		}
	})

	t.Run("unknown page falls back to id as title and still fetches", func(t *testing.T) {
		v, fetch := resolvePage("secret", testPages, map[string]string{})
		if v.Status != LoadPending || !fetch {
			t.Errorf("expected LoadPending with fetch, got %d / %v", v.Status, fetch)
		}
		if v.Page.ID != "secret" || v.Page.Title != "secret" {
			t.Errorf("expected fallback page, got %+v", v.Page)
		}
	})
}
