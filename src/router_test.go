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
		{"/project/", RouteMatch{Kind: RouteBlog, Page: 1}},
		{"/page/about", RouteMatch{Kind: RoutePage, Param: "about"}},
		{"/page/", RouteMatch{Kind: RouteBlog, Page: 1}},
		{"/does/not/exist", RouteMatch{Kind: RouteBlog, Page: 1}},
		{"/projects", RouteMatch{Kind: RouteBlog, Page: 1}},
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

func TestResolveRedirect(t *testing.T) {
	cases := []struct {
		hash   string
		want   string
		wantOk bool
	}{
		{"#!redirect=%2Fblog%2Fhello", "/blog/hello", true},
		{"#!redirect=/project/gofront", "/project/gofront", true},
		{"#!redirect=", "", false},
		{"#section-anchor", "", false},
		{"", "", false},
		{"#!redirect=%E0%A4%A", "", false}, // malformed percent-encoding must not throw
		{"#!redirect=https%3A%2F%2Fevil.example", "", false}, // absolute URL is not a local path
		{"#!redirect=%2F%2Fevil.example%2Fx", "", false},     // protocol-relative URL
		{"#!redirect=blog%2Fhello", "", false},               // relative path
	}

	for _, c := range cases {
		got, ok := resolveRedirect(c.hash)
		if ok != c.wantOk || got != c.want {
			t.Errorf("resolveRedirect(%q) = (%q, %v), want (%q, %v)", c.hash, got, ok, c.want, c.wantOk)
		}
	}
}
