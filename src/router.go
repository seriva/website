package main

import "js:./browser.d.ts"
import "strconv"
import "strings"
import "time"

var currentPath string

func scrollToHash(hash string, smooth bool) {
	if hash == "" {
		return
	}
	id := strings.TrimPrefix(hash, "#")
	if id == "" {
		return
	}
	scroll := func() {
		targetEl := document.getElementById(id)
		if targetEl != nil {
			behavior := "instant"
			if smooth {
				behavior = "smooth"
			}
			targetEl.scrollIntoView(map[string]any{"behavior": behavior})
		}
	}
	scroll()
	if !smooth {
		setTimeout(scroll, 50)
	}
}

func navigate(url string) {
	curr := string(window.location.pathname)
	if window.location.hash != nil && window.location.hash != "" {
		curr += string(window.location.hash)
	}
	if url != curr {
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

async func handleRoute() {
	resetOverlays()

	// GitHub Pages serves 404.html (a copy of the app shell) at the original URL,
	// so unknown deep links arrive here with their real pathname intact.
	path := window.location.pathname

	if !isInitialRoute {
		mainEl := document.querySelector("#main-content")
		if mainEl != nil {
			mainEl.classList.add("page-transition-out")
			time.Sleep(200 * time.Millisecond)
		}
	}
	isInitialRoute = false

	routeSeq++
	currentPath = path
	route = parseRoute(path)
	view = newViewState()

	// Reset scroll while the old content is faded out, so the new route paints at the top.
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

	hash := string(window.location.hash)
	if hash != "" {
		scrollToHash(hash, false)
	}
}

func showBlog(page int) {
	title := site.Title
	canonical := "/blog"
	if page > 1 {
		title = t("nav.blog") + " - " + site.Title
		canonical = "/blog/page/" + strconv.Itoa(page)
	}
	updateRouteMeta(title, site.Description, canonical)
	renderRoute()
}

async func showPost(slug string) {
	v, needsFetch := resolvePost(slug, posts, postHtmlCache)
	view = v
	if view.Status == LoadNotFound {
		updateRouteMeta(t("general.blogNotFound")+" - "+site.Title, t("general.blogNotFoundMessage"), "/blog/"+slug)
		renderRoute()
		return
	}

	updateRouteMeta(view.Post.Title+" - "+site.Title, view.Post.Excerpt, "/blog/"+view.Post.Slug)

	if needsFetch {
		seq := routeSeq
		mdText, err := await loadMarkdownFile("/data/blog/" + v.Post.Filename)
		if err != nil {
			if seq != routeSeq {
				return
			}
			view.Status = LoadFailed
			renderRoute()
			return
		}
		content := stripFrontmatter(mdText)
		toc := extractTOC(content)
		html := parseMarkdown(content)
		html = injectHeadingIDs(html, toc)
		postHtmlCache[v.Post.Filename] = html
		postTOCCache[v.Post.Filename] = toc
		if seq != routeSeq {
			return
		}
		view.HTML = html
		view.TOC = toc
		view.Status = LoadReady
	} else {
		if cachedTOC, ok := postTOCCache[v.Post.Filename]; ok {
			view.TOC = cachedTOC
		}
	}
	renderRoute()
	highlightCode()
	loadGiscus()
}

async func showProject(id string) {
	v, needsFetch := resolveProject(id, projects, readmeCache)
	view = v
	if view.Status == LoadNotFound {
		updateRouteMeta(t("general.projectNotFound")+" - "+site.Title, t("general.projectNotFoundMessage"), "/project/"+id)
		renderRoute()
		return
	}

	updateRouteMeta(view.Proj.Title+" - "+site.Title, view.Proj.Description, "/project/"+view.Proj.ID)

	if needsFetch {
		seq := routeSeq
		mdText, err := await loadMarkdownFile(readmeURL(v.Proj, site.GithubUsername))
		html := ""
		toc := []TOCItem{}
		if err == nil {
			readmeTOC := extractTOC(mdText)
			html = parseMarkdown(mdText)
			html = injectHeadingIDs(html, readmeTOC)
			toc = extractProjectTOC(mdText, v.Proj)
			readmeCache[v.Proj.GithubRepo] = html
			readmeTOCCache[v.Proj.GithubRepo] = toc
		}
		if seq != routeSeq {
			return
		}
		if err != nil {
			view.Status = LoadFailed
		} else {
			view.HTML = html
			view.TOC = toc
			view.Status = LoadReady
		}
	} else {
		if cachedTOC, ok := readmeTOCCache[v.Proj.GithubRepo]; ok {
			view.TOC = cachedTOC
		} else {
			view.TOC = extractProjectTOC("", v.Proj)
		}
	}
	renderRoute()
	highlightCode()
	loadGiscus()
}

async func showPage(id string) {
	v, needsFetch := resolvePage(id, navPages, pageHtmlCache)
	view = v
	title := view.Page.Title + " - " + site.Title
	if view.Page.Title == "" {
		title = id + " - " + site.Title
	}
	updateRouteMeta(title, site.Description, "/page/"+id)

	if needsFetch {
		seq := routeSeq
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
