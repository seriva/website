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

var isInitialRoute = true

async func handleRoute() {
	closeMobileMenu()
	closeProjectsDropdown()
	searchOpen = false
	searchClosing = false
	contactOpen = false
	searchEl := document.querySelector("#search-page")
	if searchEl != nil {
		searchEl.classList.remove("show")
		searchEl.classList.remove("closing")
	}
	clearBtn := document.querySelector("#search-page-clear")
	if clearBtn != nil {
		clearBtn.classList.remove("show")
	}
	inp := document.querySelector("#search-page-input")
	if inp != nil {
		inp.value = ""
	}
	document.documentElement.classList.remove("modal-open")
	document.body.classList.remove("modal-open")

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

	window.scrollTo(map[string]any{"top": 0, "left": 0, "behavior": "instant"})
	document.documentElement.scrollTop = 0
	document.body.scrollTop = 0

	if path == "/" || path == "/blog" {
		currentRoute = "/blog"
		blogCurrentPage = 1
		document.title = site.Title
		render()
	} else if strings.HasPrefix(path, "/blog/page/") {
		currentRoute = "/blog"
		numStr := path[11:]
		n, err := strconv.Atoi(numStr)
		if err != nil || n < 1 {
			n = 1
		}
		blogCurrentPage = n
		document.title = t("nav.blog") + " - " + site.Title
		render()
	} else if strings.HasPrefix(path, "/blog/") {
		slug := path[6:]
		if strings.HasPrefix(slug, "post/") {
			slug = slug[5:]
		}
		currentRoute = "/blog/" + slug

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
			render()
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
				render()
				return
			}

			_, content := parseFrontmatter(mdText)
			html := parseMarkdown(content)
			postHtmlCache[currentPost.Filename] = html
			currentPostHtml = html
			currentPostLoading = false
			currentPostError = false
		}
		render()
		highlightCode()
		loadGiscus()
	} else if strings.HasPrefix(path, "/project/") {
		id := path[9:]
		currentRoute = "/project/" + id

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
			projectReadmeError = true
			projectReadmeLoading = false
			render()
			return
		}

		currentProject = found
		document.title = currentProject.Title + " - " + site.Title

		if currentProject.GithubRepo != "" {
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
			render()
			highlightCode()
		} else {
			projectReadmeLoading = false
			projectReadmeError = false
			render()
		}
		loadGiscus()
	} else if strings.HasPrefix(path, "/page/") {
		id := path[6:]
		currentRoute = "/page/" + id

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

		currentPage = found
		document.title = currentPage.Title + " - " + site.Title

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
		render()
		highlightCode()
	} else {
		// Unknown route -> graceful fallback to blog list
		currentRoute = "/blog"
		blogCurrentPage = 1
		document.title = site.Title
		render()
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
