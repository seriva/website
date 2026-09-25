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

// beginNavigation claims the next routeSeq and returns a check that reports
// whether that navigation is still the latest one.
func beginNavigation() func() bool {
	routeSeq++
	seq := routeSeq
	return func() bool { return seq == routeSeq }
}

async func handleRoute() {
	isCurrent := beginNavigation()
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

	// A navigation that started during the fade owns the view from here on.
	if !isCurrent() {
		return
	}

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

	// The loader may have awaited a fetch while a newer navigation took over.
	if !isCurrent() {
		return
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

// loadRoute fetches url, renders it with transform and caches the result under
// key. It reports whether the route is still current; when superseded by a
// newer navigation the cache is filled but view is left untouched.
async func loadRoute(key string, url string, transform func(string) cachedContent) bool {
	seq := routeSeq
	mdText, err := await loadMarkdownFile(url)
	if err == nil {
		contentCache[key] = transform(mdText)
	}
	if seq != routeSeq {
		return false
	}
	if err != nil {
		view.Status = LoadFailed
		return true
	}
	c := contentCache[key]
	view.HTML = c.HTML
	view.TOC = c.TOC
	view.Status = LoadReady
	return true
}

// renderPost turns a blog markdown file into cached content.
func renderPost(mdText string) cachedContent {
	content := stripFrontmatter(mdText)
	toc := extractTOC(content)
	return cachedContent{HTML: injectHeadingIDs(parseMarkdown(content), toc), TOC: toc}
}

// renderReadme turns a project README into cached content whose TOC also
// covers the Media/Demo/Links sections.
func renderReadme(p Project) func(string) cachedContent {
	return func(mdText string) cachedContent {
		return cachedContent{
			HTML: injectHeadingIDs(parseMarkdown(mdText), extractTOC(mdText)),
			TOC:  extractProjectTOC(mdText, p),
		}
	}
}

func renderPage(mdText string) cachedContent {
	return cachedContent{HTML: parseMarkdown(mdText), TOC: []TOCItem{}}
}

async func showPost(slug string) {
	v, needsFetch := resolvePost(slug, posts, contentCache)
	view = v
	if view.Status == LoadNotFound {
		updateRouteMeta(t("general.blogNotFound")+" - "+site.Title, t("general.blogNotFoundMessage"), "/blog/"+slug)
		renderRoute()
		return
	}

	updateRouteMeta(view.Post.Title+" - "+site.Title, view.Post.Excerpt, view.Post.Href)
	if needsFetch {
		if !await loadRoute(view.Post.Href, "/data/blog/"+view.Post.Filename, renderPost) {
			return
		}
	}
	renderRoute()
	if view.Status != LoadReady {
		return
	}
	highlightCode()
	loadGiscus()
}

async func showProject(id string) {
	v, needsFetch := resolveProject(id, projects, contentCache)
	view = v
	if view.Status == LoadNotFound {
		updateRouteMeta(t("general.projectNotFound")+" - "+site.Title, t("general.projectNotFoundMessage"), "/project/"+id)
		renderRoute()
		return
	}

	updateRouteMeta(view.Proj.Title+" - "+site.Title, view.Proj.Description, view.Proj.Href)
	if needsFetch {
		if !await loadRoute(view.Proj.Href, readmeURL(view.Proj, site.GithubUsername), renderReadme(view.Proj)) {
			return
		}
	}
	renderRoute()
	highlightCode()
	loadGiscus()
}

async func showPage(id string) {
	v, needsFetch := resolvePage(id, navPages, contentCache)
	view = v
	updateRouteMeta(view.Page.Title+" - "+site.Title, site.Description, view.Page.Href)
	if needsFetch {
		if !await loadRoute(view.Page.Href, "/data/pages/"+id+".md", renderPage) {
			return
		}
	}
	renderRoute()
	highlightCode()
}
