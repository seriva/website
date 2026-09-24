package main

import "strings"

// newViewState returns a ViewState with every nested slice initialised so
// templ `len`/`range` never see a nil slice. Status is set explicitly because
// named-int fields compile to null, not 0.
func newViewState() ViewState {
	return ViewState{
		Post:     BlogPost{Tags: []string{}},
		Proj:     Project{Tags: []string{}, YoutubeVideos: []string{}, Links: []ProjectLink{}},
		Status:   LoadReady,
		PrevPost: BlogPost{Tags: []string{}},
		NextPost: BlogPost{Tags: []string{}},
		TOC:      []TOCItem{},
	}
}

// resolvePost builds the view for a blog post slug. The bool reports whether
// the markdown still has to be fetched.
func resolvePost(slug string, all []BlogPost, cache map[string]string) (ViewState, bool) {
	v := newViewState()
	for i, p := range all {
		if p.Slug == slug || p.ID == slug {
			v.Post = p
			if i+1 < len(all) {
				v.HasPrev = true
				v.PrevPost = all[i+1]
			}
			if i > 0 {
				v.HasNext = true
				v.NextPost = all[i-1]
			}
			if html, ok := cache[p.Filename]; ok && html != "" {
				v.HTML = html
				return v, false
			}
			v.Status = LoadPending
			return v, true
		}
	}
	v.Status = LoadNotFound
	return v, false
}

// resolveProject builds the view for a project id. Projects without a GitHub
// repo are ready immediately; otherwise the README cache decides.
func resolveProject(id string, all []Project, cache map[string]string) (ViewState, bool) {
	v := newViewState()
	for _, p := range all {
		if p.ID == id {
			v.Proj = p
			if p.GithubRepo == "" {
				return v, false
			}
			if html, ok := cache[p.GithubRepo]; ok && html != "" {
				v.HTML = html
				return v, false
			}
			v.Status = LoadPending
			return v, true
		}
	}
	v.Status = LoadNotFound
	return v, false
}

// resolvePage builds the view for a custom page id. Unknown ids still fetch,
// so the markdown file (or its 404) is the source of truth.
func resolvePage(id string, all []NavPage, cache map[string]string) (ViewState, bool) {
	v := newViewState()
	v.Page = NavPage{ID: id, Title: id}
	for _, p := range all {
		if p.ID == id {
			v.Page = p
			break
		}
	}
	if html, ok := cache[id]; ok && html != "" {
		v.HTML = html
		return v, false
	}
	v.Status = LoadPending
	return v, true
}

func readmeURL(p Project, githubUsername string) string {
	repo := p.GithubRepo
	if !strings.Contains(repo, "/") {
		repo = githubUsername + "/" + repo
	}
	branch := p.GithubBranch
	if branch == "" {
		branch = "main"
	}
	return "https://raw.githubusercontent.com/" + repo + "/" + branch + "/README.md"
}
