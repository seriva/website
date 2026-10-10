package main

import "testing"

func TestParseRoute(t *testing.T) {
	cases := []struct {
		path string
		want RouteMatch
	}{
		{"/", RouteMatch{Kind: RouteBlog, Page: 1}},
		{"", RouteMatch{Kind: RouteBlog, Page: 1}},
		{"/blog", RouteMatch{Kind: RouteBlog, Page: 1}},
		{"/blog/", RouteMatch{Kind: RouteBlog, Page: 1}},
		{"/blog/page/3", RouteMatch{Kind: RouteBlog, Page: 3}},
		{"/blog/page/0", RouteMatch{Kind: RouteBlog, Page: 1}},
		{"/blog/page/-2", RouteMatch{Kind: RouteBlog, Page: 1}},
		{"/blog/page/abc", RouteMatch{Kind: RouteBlog, Page: 1}},
		{"/blog/hello-world", RouteMatch{Kind: RoutePost, Param: "hello-world"}},
		{"/blog/hello-world/", RouteMatch{Kind: RoutePost, Param: "hello-world"}},
		{"/blog/post/legacy-slug", RouteMatch{Kind: RoutePost, Param: "legacy-slug"}},
		{"/project/gofront", RouteMatch{Kind: RouteProject, Param: "gofront"}},
		{"/project/", RouteMatch{Kind: RouteNotFound}},
		{"/page/about", RouteMatch{Kind: RoutePage, Param: "about"}},
		{"/page/", RouteMatch{Kind: RouteNotFound}},
		{"/does/not/exist", RouteMatch{Kind: RouteNotFound}},
		{"/projects", RouteMatch{Kind: RouteNotFound}},
	}

	for _, c := range cases {
		got := parseRoute(c.path)
		if got != c.want {
			t.Errorf("parseRoute(%q) = %+v, want %+v", c.path, got, c.want)
		}
	}
}

func TestIsActiveRoute(t *testing.T) {
	r := RouteMatch{Kind: RouteProject, Param: "gofront"}
	if !isActiveRoute(r, RouteProject, "gofront") {
		t.Errorf("expected active for matching kind and param")
	}
	if isActiveRoute(r, RouteProject, "other") {
		t.Errorf("expected inactive for different param")
	}
	if isActiveRoute(r, RoutePage, "gofront") {
		t.Errorf("expected inactive for different kind")
	}
}

// fakeFetchResponse mimics the subset of the Fetch Response API loadMarkdownFile uses.
type fakeFetchResponse struct {
	ok   bool
	body string
}

func (r fakeFetchResponse) text() string {
	return r.body
}

// fakeFetchSuperseding resolves with body but bumps routeSeq mid-flight, as if
// the user navigated away while the request was pending.
async func fakeFetchSuperseding(url string) fakeFetchResponse {
	routeSeq++
	return fakeFetchResponse{ok: true, body: "# Hello\n\nWorld"}
}

async func fakeFetchOK(url string) fakeFetchResponse {
	return fakeFetchResponse{ok: true, body: "# Hello\n\nWorld"}
}

async func fakeFetchFail(url string) fakeFetchResponse {
	return fakeFetchResponse{ok: false}
}

func upperContent(md string) cachedContent {
	return cachedContent{HTML: "<p>" + md + "</p>", TOC: []TOCItem{{ID: "hello", Text: "Hello", Level: 2}}}
}

func TestBeginNavigation(t *testing.T) {
	first := beginNavigation()
	if !first() {
		t.Fatalf("expected a fresh navigation to be current")
	}
	second := beginNavigation()
	if first() {
		t.Errorf("expected the older navigation to be superseded")
	}
	if !second() {
		t.Errorf("expected the latest navigation to stay current")
	}
}

async func TestLoadRoute(t *testing.T) {
	origFetch := fetch
	defer func() {
		fetch = origFetch
		contentCache = map[string]cachedContent{}
		view = ViewState{}
	}()

	await t.Run("superseded fetch fills the cache but leaves view untouched", async func(t *testing.T) {
		contentCache = map[string]cachedContent{}
		view = ViewState{Status: LoadPending, HTML: "old"}
		fetch = fakeFetchSuperseding

		current := await loadRoute("/blog/x", "/x.md", upperContent)
		if current {
			t.Errorf("expected loadRoute to report the route as superseded")
		}
		if c, ok := contentCache["/blog/x"]; !ok || c.HTML == "" {
			t.Errorf("expected cache to be filled for superseded fetch, got %+v", c)
		}
		if view.HTML != "old" || view.Status != LoadPending {
			t.Errorf("expected view untouched, got %+v", view)
		}
	})

	await t.Run("current fetch renders into view and cache", async func(t *testing.T) {
		contentCache = map[string]cachedContent{}
		view = ViewState{Status: LoadPending}
		fetch = fakeFetchOK

		if !await loadRoute("/blog/x", "/x.md", upperContent) {
			t.Fatalf("expected loadRoute to report the route as current")
		}
		if view.Status != LoadReady || view.HTML != "<p># Hello\n\nWorld</p>" {
			t.Errorf("unexpected view %+v", view)
		}
		if len(view.TOC) != 1 || view.TOC[0].ID != "hello" {
			t.Errorf("expected TOC copied into view, got %+v", view.TOC)
		}
		if contentCache["/blog/x"].HTML != view.HTML {
			t.Errorf("expected cache and view to agree")
		}
	})

	await t.Run("failed fetch marks view as failed without caching", async func(t *testing.T) {
		contentCache = map[string]cachedContent{}
		view = ViewState{Status: LoadPending}
		fetch = fakeFetchFail

		if !await loadRoute("/blog/x", "/x.md", upperContent) {
			t.Fatalf("expected loadRoute to report the route as current")
		}
		if view.Status != LoadFailed {
			t.Errorf("expected LoadFailed, got %d", view.Status)
		}
		if _, ok := contentCache["/blog/x"]; ok {
			t.Errorf("expected no cache entry after failed fetch")
		}
	})
}
