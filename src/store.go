package main

import "errors"
import "js:./browser.d.ts"
import "slices"
import "strings"

// ── Global Application State ──────────────────────────────────

var site = SiteConfig{
	Social: []SocialLink{},
}
var posts = []BlogPost{}
var projects = []Project{}
var navPages = []NavPage{}
var translations = map[string]string{}
var route = RouteMatch{Page: 1} // zero Kind == RouteBlog
var currentTheme = "dark"
var mobileMenuOpen bool
var projectsDropdownOpen bool
var searchOpen bool
var searchQuery string
var searchResults = []SearchResultItem{}
var contactOpen bool
var contactForm ContactState

// Route view state; main() and handleRoute assign newViewState(). Not initialised
// here: globals are emitted in file order, so LoadReady (types.go) would be in TDZ.
var view ViewState

// Rendered route content keyed by route path (/blog/<slug>, /project/<id>, /page/<id>).
var contentCache = map[string]cachedContent{}

// ── Translation Helper ────────────────────────────────────────

func t(key string) string {
	if val, ok := translations[key]; ok && val != "" {
		return val
	}
	return key
}

// ── Meta Tags Updater ─────────────────────────────────────────

// headEl returns the <head> element matching tag[attr="name"], creating it if missing.
func headEl(tag string, attr string, name string) any {
	el := document.querySelector(tag + "[" + attr + "=\"" + name + "\"]")
	if el == nil {
		el = document.createElement(tag)
		el.setAttribute(attr, name)
		document.head.appendChild(el)
	}
	return el
}

// updateMeta sets <meta attr="name" content=value>; attr is "name" or "property".
func updateMeta(attr string, name string, value string) {
	if value == "" {
		return
	}
	headEl("meta", attr, name).setAttribute("content", value)
}

func updateTitleMeta(title string) {
	if title == "" {
		return
	}
	document.title = title
	updateMeta("property", "og:title", title)
	updateMeta("property", "twitter:title", title)
}

func updateDescriptionMeta(description string) {
	updateMeta("name", "description", description)
	updateMeta("property", "og:description", description)
	updateMeta("property", "twitter:description", description)
}

func updateMetaTags() {
	updateTitleMeta(site.Title)
	updateDescriptionMeta(site.Description)
	updateMeta("name", "author", site.Author)
	themeBg := site.DarkTheme.Background
	if currentTheme == "light" && site.LightTheme.Background != "" {
		themeBg = site.LightTheme.Background
	}
	updateMeta("name", "theme-color", themeBg)
}

func announceRoute(title string) {
	announcer := document.getElementById("route-announcer")
	if announcer != nil {
		prefix := t("general.routeAnnounce")
		if prefix == "general.routeAnnounce" {
			prefix = "Navigated to "
		}
		announcer.textContent = prefix + title
	}
}

func updateRouteMeta(title string, description string, canonicalPath string) {
	updateTitleMeta(title)
	updateDescriptionMeta(description)
	announceRoute(title)
	if canonicalPath == "" {
		return
	}
	fullURL := canonicalPath
	if strings.HasPrefix(canonicalPath, "/") {
		origin := strVal(window.location.origin)
		if origin == "" || origin == "null" {
			origin = site.Url
		}
		fullURL = origin + canonicalPath
	}
	updateMeta("property", "og:url", fullURL)
	headEl("link", "rel", "canonical").setAttribute("href", fullURL)
}

// ── Data Initialization ───────────────────────────────────────
// `== nil` compiles to loose `== null`, so these also catch JS undefined.

func strVal(v any) string {
	if v == nil {
		return ""
	}
	return string(v)
}

func boolVal(v any) bool {
	if v == nil || string(v) == "false" {
		return false
	}
	return bool(v)
}

func intVal(v any) int {
	if v == nil {
		return 0
	}
	return int(v)
}

// strSlice maps a raw JSON array (or nil) to a non-nil []string.
func strSlice(raw any) []string {
	out := []string{}
	if raw != nil {
		for _, v := range raw {
			out = append(out, strVal(v))
		}
	}
	return out
}

// postFromJSON maps one raw `blog.posts[]` entry to a BlogPost.
func postFromJSON(p any) BlogPost {
	fn := strVal(p.filename)
	slug := strings.TrimSuffix(fn, ".md")
	return BlogPost{
		Slug:     slug,
		Title:    strVal(p.title),
		Date:     strVal(p.date),
		Excerpt:  strVal(p.excerpt),
		Tags:     strSlice(p.tags),
		Filename: fn,
		Href:     "/blog/" + slug,
	}
}

// sortPostsByDate orders newest first; dates are ISO strings so lexical order works.
func sortPostsByDate(list []BlogPost) {
	slices.SortFunc(list, func(a BlogPost, b BlogPost) int {
		if a.Date == b.Date {
			return 0
		}
		if a.Date < b.Date {
			return 1
		}
		return -1
	})
}

// projectFromJSON maps one raw `projects[]` entry to a Project.
func projectFromJSON(p any) Project {
	links := []ProjectLink{}
	if p.links != nil {
		for _, l := range p.links {
			links = append(links, ProjectLink{
				Title: strVal(l.title),
				Icon:  strVal(l.icon),
				Href:  strVal(l.href),
			})
		}
	}

	id := strVal(p.id)
	return Project{
		ID:               id,
		Title:            strVal(p.title),
		Description:      strVal(p.description),
		Tags:             strSlice(p.tags),
		Order:            intVal(p.order),
		GithubRepo:       strVal(p.github_repo),
		GithubBranch:     strVal(p.github_branch),
		DemoUrl:          strVal(p.demo_url),
		DemoLabel:        strVal(p.demo_label),
		DemoInstructions: strVal(p.demo_instructions),
		DemoHeight:       strVal(p.demo_height),
		DemoFullscreen:   boolVal(p.demo_fullscreen),
		YoutubeVideos:    strSlice(p.youtube_videos),
		Links:            links,
		Href:             "/project/" + id,
	}
}

// themeFromJSON maps one `site.theme.<name>` entry to ThemeColors.
func themeFromJSON(d any, defaultCodeTheme string) ThemeColors {
	tc := ThemeColors{
		Primary:    strVal(d.primary),
		Secondary:  strVal(d.secondary),
		Background: strVal(d.background),
		Text:       strVal(d.text),
		TextLight:  strVal(d.textLight),
		Border:     strVal(d.border),
		Hover:      strVal(d.hover),
		CodeTheme:  defaultCodeTheme,
	}
	if d.code != nil {
		tc.CodeTheme = strVal(d.code.theme)
	}
	if d.comments != nil {
		tc.CommentsTheme = strVal(d.comments.theme)
	}
	return tc
}

func sortProjectsByOrder(list []Project) {
	slices.SortFunc(list, func(a Project, b Project) int {
		return a.Order - b.Order
	})
}

// navPageHref is the route for a custom page id.
func navPageHref(id string) string {
	return "/page/" + id
}

// pageFromJSON maps one `pages.<id>` entry to a NavPage.
func pageFromJSON(id string, p any) NavPage {
	return NavPage{
		ID:        id,
		Title:     strVal(p.title),
		Order:     intVal(p.order),
		ShowInNav: boolVal(p.showInNav),
		Href:      navPageHref(id),
	}
}

func sortPagesByOrder(list []NavPage) {
	slices.SortFunc(list, func(a NavPage, b NavPage) int {
		return a.Order - b.Order
	})
}

async func initData() error {
	var data any
	el := document.getElementById("site-data")
	if el != nil && el.textContent != nil && el.textContent != "" {
		data = JSON.parse(strVal(el.textContent))
	} else {
		res := await fetch("/data/content.json")
		if res == nil || !res.ok {
			return errors.New("failed to fetch /data/content.json")
		}
		data = await res.json()
	}

	if data == nil {
		return errors.New("failed to parse /data/content.json")
	}

	siteData := data.site
	if siteData != nil {
		site.Title = strVal(siteData.title)
		site.Url = strings.TrimSuffix(strVal(siteData.url), "/")
		site.Description = strVal(siteData.description)
		site.Author = strVal(siteData.author)
		site.GithubUsername = strVal(siteData.github_username)

		if siteData.theme != nil {
			if siteData.theme.dark != nil {
				site.DarkTheme = themeFromJSON(siteData.theme.dark, "prism-tomorrow")
			}
			if siteData.theme.light != nil {
				site.LightTheme = themeFromJSON(siteData.theme.light, "prism-coy")
			}
		}

		if siteData.search != nil {
			site.Search = SearchConfig{
				Enabled:     boolVal(siteData.search.enabled),
				MinChars:    intVal(siteData.search.minChars),
				Placeholder: strVal(siteData.search.placeholder),
			}
		}

		if siteData.emailjs != nil {
			site.EmailJS = EmailJSConfig{
				Enabled:    boolVal(siteData.emailjs.enabled),
				ServiceId:  strVal(siteData.emailjs.serviceId),
				TemplateId: strVal(siteData.emailjs.templateId),
				PublicKey:  strVal(siteData.emailjs.publicKey),
			}
		}

		if siteData.comments != nil {
			site.Comments = CommentsConfig{
				BlogEnabled:     boolVal(siteData.comments.blogEnabled),
				ProjectsEnabled: boolVal(siteData.comments.projectsEnabled),
				Attrs:           siteData.comments,
			}
		}

		if siteData.social != nil {
			for _, item := range siteData.social {
				site.Social = append(site.Social, SocialLink{
					Icon:   strVal(item.icon),
					Href:   strVal(item.href),
					Target: strVal(item.target),
					Rel:    strVal(item.rel),
				})
			}
		}
	}

	// Translations
	if data.translations != nil && data.translations.en != nil {
		for k, v := range data.translations.en.(map[string]any) {
			translations[k] = strVal(v)
		}
	}

	// Blog
	site.PostsPerPage = 5
	if data.blog != nil {
		if data.blog.postsPerPage != nil {
			site.PostsPerPage = intVal(data.blog.postsPerPage)
		}
		if data.blog.posts != nil {
			for _, p := range data.blog.posts {
				posts = append(posts, postFromJSON(p))
			}
			sortPostsByDate(posts)
		}
	}

	// Projects
	if data.projects != nil {
		for _, p := range data.projects {
			projects = append(projects, projectFromJSON(p))
		}
		sortProjectsByOrder(projects)
	}

	// Pages
	if data.pages != nil {
		for id, p := range data.pages.(map[string]any) {
			navPages = append(navPages, pageFromJSON(id, p))
		}
		sortPagesByOrder(navPages)
	}

	updateMetaTags()
	return nil
}
