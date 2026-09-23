package main

import "js:./browser.d.ts"
import "strconv"
import "strings"

func navigate(url string) {
	if url != window.location.pathname {
		window.history.pushState(map[string]any{}, "", url)
	}
	handleRoute()
}

// parseRoute maps a URL path to a RouteMatch. Unknown paths fall back to the blog list.
func parseRoute(path string) RouteMatch {
	if len(path) > 1 {
		path = strings.TrimSuffix(path, "/")
	}
	if path == "" || path == "/" || path == "/blog" {
		return RouteMatch{Kind: RouteBlog, Page: 1}
	}
	if rest, ok := strings.CutPrefix(path, "/blog/page/"); ok {
		n, err := strconv.Atoi(rest)
		if err != nil || n < 1 {
			n = 1
		}
		return RouteMatch{Kind: RouteBlog, Page: n}
	}
	if slug, ok := strings.CutPrefix(path, "/blog/"); ok {
		slug = strings.TrimPrefix(slug, "post/")
		if slug == "" {
			return RouteMatch{Kind: RouteBlog, Page: 1}
		}
		return RouteMatch{Kind: RoutePost, Param: slug}
	}
	if id, ok := strings.CutPrefix(path, "/project/"); ok {
		return RouteMatch{Kind: RouteProject, Param: id}
	}
	if id, ok := strings.CutPrefix(path, "/page/"); ok {
		return RouteMatch{Kind: RoutePage, Param: id}
	}
	return RouteMatch{Kind: RouteBlog, Page: 1}
}

var isInitialRoute = true

async func handleRoute() {
	resetOverlays()

	path := window.location.pathname
	hash := window.location.hash

	// 404 redirect handler (GitHub Pages SPA fallback)
	if strings.HasPrefix(hash, "#!redirect=") {
		redirect := decodeURIComponent(hash[11:])
		window.history.replaceState(map[string]any{}, "", redirect)
		path = redirect
	}

	if !isInitialRoute {
		mainEl := document.querySelector("#main-content")
		if mainEl != nil {
			mainEl.classList.add("page-transition-out")
			await sleep(200)
		}
	}
	isInitialRoute = false

	route = parseRoute(path)

	switch route.Kind {
	case RoutePost:
		await showPost(route.Param)
	case RouteProject:
		await showProject(route.Param)
	case RoutePage:
		await showPage(route.Param)
	default:
		showBlog(route.Page)
	}

	mainEl := document.querySelector("#main-content")
	if mainEl != nil {
		mainEl.setAttribute("tabindex", "-1")
		mainEl.focus(map[string]any{"preventScroll": true})
		setTimeout(func() {
			mainEl.removeAttribute("tabindex")
		}, 100)
	}

	window.scrollTo(map[string]any{"top": 0, "left": 0, "behavior": "instant"})
	document.documentElement.scrollTop = 0
	document.body.scrollTop = 0
}

func showBlog(page int) {
	if page > 1 {
		document.title = t("nav.blog") + " - " + site.Title
	} else {
		document.title = site.Title
	}
	renderRoute()
}

async func showPost(slug string) {
	var found BlogPost
	isFound := false
	for _, p := range posts {
		if p.Slug == slug || p.ID == slug {
			found = p
			isFound = true
			break
		}
	}

	if !isFound {
		currentPostError = true
		currentPostLoading = false
		renderRoute()
		return
	}

	currentPost = found
	document.title = currentPost.Title + " - " + site.Title

	if cached, ok := postHtmlCache[currentPost.Filename]; ok && cached != "" {
		currentPostHtml = cached
		currentPostLoading = false
		currentPostError = false
	} else {
		currentPostLoading = true
		currentPostError = false

		mdText, err := await loadMarkdownFile("/data/blog/" + currentPost.Filename)
		if err != nil {
			currentPostError = true
			currentPostLoading = false
			renderRoute()
			return
		}

		_, content := parseFrontmatter(mdText)
		html := parseMarkdown(content)
		postHtmlCache[currentPost.Filename] = html
		currentPostHtml = html
		currentPostLoading = false
		currentPostError = false
	}
	renderRoute()
	highlightCode()
	loadGiscus()
}

async func showProject(id string) {
	var found Project
	isFound := false
	for _, p := range projects {
		if p.ID == id {
			found = p
			isFound = true
			break
		}
	}

	if !isFound {
		currentProject = Project{
			Tags:          []string{},
			YoutubeVideos: []string{},
			Links:         []ProjectLink{},
		}
		projectReadmeError = true
		projectReadmeLoading = false
		renderRoute()
		return
	}

	currentProject = found
	document.title = currentProject.Title + " - " + site.Title

	if currentProject.GithubRepo == "" {
		projectReadmeLoading = false
		projectReadmeError = false
		renderRoute()
		loadGiscus()
		return
	}

	if cached, ok := readmeCache[currentProject.GithubRepo]; ok && cached != "" {
		projectReadmeHtml = parseMarkdown(cached)
		projectReadmeLoading = false
		projectReadmeError = false
	} else {
		projectReadmeLoading = true
		projectReadmeError = false

		repo := currentProject.GithubRepo
		if !strings.Contains(repo, "/") {
			repo = site.GithubUsername + "/" + repo
		}
		branch := currentProject.GithubBranch
		if branch == "" {
			branch = "main"
		}
		url := "https://raw.githubusercontent.com/" + repo + "/" + branch + "/README.md"
		mdText, err := await loadMarkdownFile(url)
		if err != nil {
			projectReadmeError = true
		} else {
			readmeCache[currentProject.GithubRepo] = mdText
			projectReadmeHtml = parseMarkdown(mdText)
		}
		projectReadmeLoading = false
	}
	renderRoute()
	highlightCode()
	loadGiscus()
}

async func showPage(id string) {
	var found NavPage
	isFound := false
	for _, p := range navPages {
		if p.ID == id {
			found = p
			isFound = true
			break
		}
	}

	if !isFound {
		found = NavPage{ID: id, Title: id}
	}

	document.title = found.Title + " - " + site.Title

	if cached, ok := pageHtmlCache[id]; ok && cached != "" {
		currentPageHtml = cached
		currentPageLoading = false
		currentPageError = false
	} else {
		currentPageLoading = true
		currentPageError = false

		mdText, err := await loadMarkdownFile("/data/pages/" + id + ".md")
		if err != nil {
			currentPageError = true
		} else {
			html := parseMarkdown(mdText)
			pageHtmlCache[id] = html
			currentPageHtml = html
		}
		currentPageLoading = false
	}
	renderRoute()
	highlightCode()
}
