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

// Rendered-HTML caches keyed by post filename, project github repo and page id.
var readmeCache map[string]string = map[string]string{}
var postHtmlCache map[string]string = map[string]string{}
var pageHtmlCache map[string]string = map[string]string{}

// ── Translation Helper ────────────────────────────────────────

func t(key string) string {
	if val, ok := translations[key]; ok && val != "" {
		return val
	}
	return key
}

// ── Meta Tags Updater ─────────────────────────────────────────

func updateMeta(selector string, value string) {
	if value == "" {
		return
	}
	el := document.querySelector(selector)
	if el != nil {
		el.setAttribute("content", value)
	}
}

func updateMetaTags() {
	if site.Title != "" {
		document.title = site.Title
	}
	updateMeta("meta[name=\"description\"]", site.Description)
	updateMeta("meta[name=\"author\"]", site.Author)
	updateMeta("meta[name=\"theme-color\"]", site.DarkTheme.Primary)
	updateMeta("meta[name=\"msapplication-TileColor\"]", site.DarkTheme.Primary)
	updateMeta("meta[property=\"og:title\"]", site.Title)
	updateMeta("meta[property=\"twitter:title\"]", site.Title)
	updateMeta("meta[property=\"og:description\"]", site.Description)
	updateMeta("meta[property=\"twitter:description\"]", site.Description)
}

// ── Data Initialization ───────────────────────────────────────

func strVal(v any) string {
	if v == nil || string(v) == "undefined" {
		return ""
	}
	return string(v)
}

func boolVal(v any) bool {
	if v == nil || string(v) == "undefined" || string(v) == "false" {
		return false
	}
	return bool(v)
}

func intVal(v any) int {
	if v == nil || string(v) == "undefined" {
		return 0
	}
	return int(v)
}

// postFromYAML maps one raw `blog.posts[]` entry to a BlogPost.
func postFromYAML(p any) BlogPost {
	fn := strVal(p.filename)
	slug := strings.TrimSuffix(fn, ".md")
	tags := []string{}
	if p.tags != nil {
		for _, tg := range p.tags {
			tags = append(tags, strVal(tg))
		}
	}
	return BlogPost{
		ID:       slug,
		Slug:     slug,
		Title:    strVal(p.title),
		Date:     strVal(p.date),
		Excerpt:  strVal(p.excerpt),
		Tags:     tags,
		Filename: fn,
		Href:     "/blog/" + slug,
	}
}

// sortPostsByDate orders newest first; dates are ISO strings so lexical order works.
func sortPostsByDate(list []BlogPost) {
	slices.SortFunc(list, func(a BlogPost, b BlogPost) int {
		if a.Date < b.Date {
			return 1
		}
		if a.Date > b.Date {
			return -1
		}
		return 0
	})
}

// projectFromYAML maps one raw `projects[]` entry to a Project.
func projectFromYAML(p any) Project {
	tags := []string{}
	if p.tags != nil {
		for _, tg := range p.tags {
			tags = append(tags, strVal(tg))
		}
	}
	videos := []string{}
	if p.youtube_videos != nil {
		for _, v := range p.youtube_videos {
			videos = append(videos, strVal(v))
		}
	}
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
		Tags:             tags,
		Order:            intVal(p.order),
		GithubRepo:       strVal(p.github_repo),
		GithubBranch:     strVal(p.github_branch),
		DemoUrl:          strVal(p.demo_url),
		DemoLabel:        strVal(p.demo_label),
		DemoInstructions: strVal(p.demo_instructions),
		DemoHeight:       strVal(p.demo_height),
		DemoFullscreen:   boolVal(p.demo_fullscreen),
		YoutubeVideos:    videos,
		Links:            links,
		Href:             "/project/" + id,
	}
}

func sortProjectsByOrder(list []Project) {
	slices.SortFunc(list, func(a Project, b Project) int {
		return a.Order - b.Order
	})
}

// pageFromYAML maps one `pages.<id>` entry to a NavPage.
func pageFromYAML(id string, p any) NavPage {
	return NavPage{
		ID:        id,
		Title:     strVal(p.title),
		Order:     intVal(p.order),
		ShowInNav: boolVal(p.showInNav),
		Href:      "/page/" + id,
	}
}

func sortPagesByOrder(list []NavPage) {
	slices.SortFunc(list, func(a NavPage, b NavPage) int {
		return a.Order - b.Order
	})
}

async func initData() error {
	res := await fetch("/data/content.json")
	if res == nil || !res.ok {
		return errors.New("failed to fetch /data/content.json")
	}

	data := await res.json()
	if data == nil {
		return errors.New("failed to parse /data/content.json")
	}

	siteData := data.site
	if siteData != nil {
		site.Title = strVal(siteData.title)
		site.Description = strVal(siteData.description)
		site.Author = strVal(siteData.author)
		site.GithubUsername = strVal(siteData.github_username)

		if siteData.theme != nil {
			if siteData.theme.dark != nil {
				d := siteData.theme.dark
				site.DarkTheme = ThemeColors{
					Primary:    strVal(d.primary),
					Secondary:  strVal(d.secondary),
					Background: strVal(d.background),
					Text:       strVal(d.text),
					TextLight:  strVal(d.textLight),
					Border:     strVal(d.border),
					Hover:      strVal(d.hover),
					CodeTheme:  "prism-tomorrow",
				}
				if d.code != nil {
					site.DarkTheme.CodeTheme = strVal(d.code.theme)
				}
				if d.comments != nil {
					site.DarkTheme.CommentsTheme = strVal(d.comments.theme)
				}
			}
			if siteData.theme.light != nil {
				l := siteData.theme.light
				site.LightTheme = ThemeColors{
					Primary:    strVal(l.primary),
					Secondary:  strVal(l.secondary),
					Background: strVal(l.background),
					Text:       strVal(l.text),
					TextLight:  strVal(l.textLight),
					Border:     strVal(l.border),
					Hover:      strVal(l.hover),
					CodeTheme:  "prism-coy",
				}
				if l.code != nil {
					site.LightTheme.CodeTheme = strVal(l.code.theme)
				}
				if l.comments != nil {
					site.LightTheme.CommentsTheme = strVal(l.comments.theme)
				}
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
			c := siteData.comments
			site.Comments = CommentsConfig{
				BlogEnabled:      boolVal(c.blogEnabled),
				ProjectsEnabled:  boolVal(c.projectsEnabled),
				Repo:             strVal(c.repo),
				RepoId:           strVal(c.repoId),
				Category:         strVal(c.category),
				CategoryId:       strVal(c.categoryId),
				Mapping:          strVal(c.mapping),
				Strict:           strVal(c.strict),
				ReactionsEnabled: strVal(c.reactionsEnabled),
				EmitMetadata:     strVal(c.emitMetadata),
				InputPosition:    strVal(c.inputPosition),
				Lang:             strVal(c.lang),
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
				posts = append(posts, postFromYAML(p))
			}
			sortPostsByDate(posts)
		}
	}

	// Projects
	if data.projects != nil {
		for _, p := range data.projects {
			projects = append(projects, projectFromYAML(p))
		}
		sortProjectsByOrder(projects)
	}

	// Pages
	if data.pages != nil {
		for id, p := range data.pages.(map[string]any) {
			navPages = append(navPages, pageFromYAML(id, p))
		}
		sortPagesByOrder(navPages)
	}

	updateMetaTags()
	return nil
}
