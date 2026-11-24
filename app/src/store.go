package main

import "encoding/json"
import "errors"
import "gofront/dom"
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
var route = gom.NewSignal(RouteMatch{Page: 1}) // zero Kind == RouteBlog
var routeAnnouncement = gom.NewSignal("")
var pageTransitionOut = gom.NewSignal(false)
var currentTheme = "dark"
var mobileMenuOpen = gom.NewSignal(false)
var projectsDropdownOpen = gom.NewSignal(false)
var searchOpen = gom.NewSignal(false)
var searchQuery = gom.NewSignal("")
var searchResults = []SearchResultItem{}
var contactOpen = gom.NewSignal(false)
var contactForm = gom.NewSignal(ContactState{ButtonState: "send"})
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
func headEl(tag string, attr string, name string) dom.Element {
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
	prefix := t("general.routeAnnounce")
	if prefix == "general.routeAnnounce" {
		prefix = "Navigated to "
	}
	routeAnnouncement.Set(prefix + title)
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
		origin := window.location.origin
		if origin == "" || origin == "null" {
			origin = site.Url
		}
		fullURL = origin + canonicalPath
	}
	updateMeta("property", "og:url", fullURL)
	headEl("link", "rel", "canonical").setAttribute("href", fullURL)
}

// ── Data Initialization ───────────────────────────────────────

func strVal(v any) string {
	if s, ok := v.(string); ok {
		return s
	}
	return ""
}

func boolVal(v any) bool {
	if b, ok := v.(bool); ok {
		return b
	}
	if s, ok := v.(string); ok {
		return s != "" && s != "false"
	}
	return false
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

// themeFromRaw maps RawThemeColors to ThemeColors with default code theme fallback.
func themeFromRaw(d RawThemeColors, defaultCodeTheme string) ThemeColors {
	codeTheme := defaultCodeTheme
	if d.Code.Theme != "" {
		codeTheme = d.Code.Theme
	}
	return ThemeColors{
		Primary:       d.Primary,
		Secondary:     d.Secondary,
		Background:    d.Background,
		Text:          d.Text,
		TextLight:     d.TextLight,
		Border:        d.Border,
		Hover:         d.Hover,
		CodeTheme:     codeTheme,
		CommentsTheme: d.Comments.Theme,
	}
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

func sortPagesByOrder(list []NavPage) {
	slices.SortFunc(list, func(a NavPage, b NavPage) int {
		return a.Order - b.Order
	})
}

async func initData() error {
	var rawBytes []byte
	el := document.getElementById("site-data")
	if el != nil && el.textContent != nil && el.textContent != "" {
		rawBytes = []byte(string(el.textContent))
	} else {
		res := await fetch("/data/content.json")
		if res == nil || !res.ok {
			return errors.New("failed to fetch /data/content.json")
		}
		text := await res.text()
		rawBytes = []byte(text)
	}

	if len(rawBytes) == 0 {
		return errors.New("failed to parse /data/content.json")
	}

	var payload ContentPayload
	if err := json.Unmarshal(rawBytes, &payload); err != nil {
		return errors.New("failed to parse /data/content.json: " + err.Error())
	}

	site.Title = payload.Site.Title
	site.Url = strings.TrimSuffix(payload.Site.Url, "/")
	site.Description = payload.Site.Description
	site.Author = payload.Site.Author
	site.GithubUsername = payload.Site.GithubUsername

	site.DarkTheme = themeFromRaw(payload.Site.Theme.Dark, "prism-tomorrow")
	site.LightTheme = themeFromRaw(payload.Site.Theme.Light, "prism-coy")

	site.Search = payload.Site.Search
	site.EmailJS = payload.Site.EmailJS
	site.Comments = CommentsConfig{
		BlogEnabled:     boolVal(payload.Site.Comments["blogEnabled"]),
		ProjectsEnabled: boolVal(payload.Site.Comments["projectsEnabled"]),
		Attrs:           payload.Site.Comments,
	}
	site.Social = payload.Site.Social

	// Translations
	if enTrans, ok := payload.Translations["en"]; ok {
		for k, v := range enTrans {
			translations[k] = v
		}
	}

	// Blog
	site.PostsPerPage = 5
	if payload.Blog.PostsPerPage > 0 {
		site.PostsPerPage = payload.Blog.PostsPerPage
	}
	for _, p := range payload.Blog.Posts {
		slug := strings.TrimSuffix(p.Filename, ".md")
		p.Slug = slug
		p.Href = "/blog/" + slug
		if p.Tags == nil {
			p.Tags = []string{}
		}
		posts = append(posts, p)
	}
	sortPostsByDate(posts)

	// Projects
	for _, p := range payload.Projects {
		p.Href = "/project/" + p.ID
		if p.Tags == nil {
			p.Tags = []string{}
		}
		if p.YoutubeVideos == nil {
			p.YoutubeVideos = []string{}
		}
		if p.Links == nil {
			p.Links = []ProjectLink{}
		}
		projects = append(projects, p)
	}
	sortProjectsByOrder(projects)

	// Pages
	for id, p := range payload.Pages {
		p.ID = id
		p.Href = navPageHref(id)
		navPages = append(navPages, p)
	}
	sortPagesByOrder(navPages)

	updateMetaTags()
	return nil
}
