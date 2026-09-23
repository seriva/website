package main

import "js:./browser.d.ts"
import "strconv"
import "strings"
import "time"

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

// routeSeq is bumped on every navigation so an in-flight loader can tell it
// has been superseded and must not touch `view`.
var routeSeq int

// resolveRedirect decodes the GitHub Pages 404 fallback hash (`#!redirect=<path>`).
// Malformed encodings and non-local targets are treated as no redirect rather than throwing.
func resolveRedirect(hash string) (target string, ok bool) {
	defer func() {
		if r := recover(); r != nil {
			target = ""
			ok = false
		}
	}()
	encoded, found := strings.CutPrefix(hash, "#!redirect=")
	if !found || encoded == "" {
		return "", false
	}
	decoded := string(decodeURIComponent(encoded))
	// Only same-origin paths: "//host" and "scheme:" would make replaceState throw.
	if !strings.HasPrefix(decoded, "/") || strings.HasPrefix(decoded, "//") {
		return "", false
	}
	return decoded, true
}

async func handleRoute() {
	resetOverlays()

	path := window.location.pathname

	if redirect, ok := resolveRedirect(window.location.hash); ok {
		window.history.replaceState(map[string]any{}, "", redirect)
		path = redirect
	}

	if !isInitialRoute {
		mainEl := document.querySelector("#main-content")
		if mainEl != nil {
			mainEl.classList.add("page-transition-out")
			time.Sleep(200 * time.Millisecond)
		}
	}
	isInitialRoute = false

	routeSeq++
	route = parseRoute(path)
	view = newViewState()

	// Reset scroll before dispatch so the pending render already starts at the top.
	window.scrollTo(map[string]any{"top": 0, "left": 0, "behavior": "instant"})
	document.documentElement.scrollTop = 0
	document.body.scrollTop = 0

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
	v, needsFetch := resolvePost(slug, posts, postHtmlCache)
	view = v
	if view.Status == LoadNotFound {
		renderRoute()
		return
	}

	document.title = view.Post.Title + " - " + site.Title

	if needsFetch {
		seq := routeSeq
		renderRoute()
		mdText, err := await loadMarkdownFile("/data/blog/" + v.Post.Filename)
		if err != nil {
			if seq != routeSeq {
				return
			}
			view.Status = LoadFailed
			renderRoute()
			return
		}
		_, content := parseFrontmatter(mdText)
		html := parseMarkdown(content)
		postHtmlCache[v.Post.Filename] = html
		if seq != routeSeq {
			return
		}
		view.HTML = html
		view.Status = LoadReady
	}
	renderRoute()
	highlightCode()
	loadGiscus()
}

async func showProject(id string) {
	v, needsFetch := resolveProject(id, projects, readmeCache)
	view = v
	if view.Status == LoadNotFound {
		renderRoute()
		return
	}

	document.title = view.Proj.Title + " - " + site.Title

	if needsFetch {
		seq := routeSeq
		renderRoute()
		mdText, err := await loadMarkdownFile(readmeURL(v.Proj, site.GithubUsername))
		html := ""
		if err == nil {
			html = parseMarkdown(mdText)
			readmeCache[v.Proj.GithubRepo] = html
		}
		if seq != routeSeq {
			return
		}
		if err != nil {
			view.Status = LoadFailed
		} else {
			view.HTML = html
			view.Status = LoadReady
		}
	}
	renderRoute()
	highlightCode()
	loadGiscus()
}

async func showPage(id string) {
	v, needsFetch := resolvePage(id, navPages, pageHtmlCache)
	view = v
	document.title = view.Page.Title + " - " + site.Title

	if needsFetch {
		seq := routeSeq
		renderRoute()
		mdText, err := await loadMarkdownFile("/data/pages/" + id + ".md")
		html := ""
		if err == nil {
			html = parseMarkdown(mdText)
			pageHtmlCache[id] = html
		}
		if seq != routeSeq {
			return
		}
		if err != nil {
			view.Status = LoadFailed
		} else {
			view.HTML = html
			view.Status = LoadReady
		}
	}
	renderRoute()
	highlightCode()
}
