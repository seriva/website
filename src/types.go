package main

// ── Routing ───────────────────────────────────────────────────

type Route int

const (
	RouteBlog Route = iota
	RoutePost
	RouteProject
	RoutePage
	RouteNotFound
)

type RouteMatch struct {
	Kind  Route
	Param string // post slug, project id or page id
	Page  int    // blog page number (RouteBlog only, >= 1)
}

// ── Data structs ──────────────────────────────────────────────

type ProjectLink struct {
	Title string
	Icon  string
	Href  string
}

type Project struct {
	ID               string
	Title            string
	Description      string
	Tags             []string
	Order            int
	GithubRepo       string
	GithubBranch     string
	DemoUrl          string
	DemoLabel        string
	DemoInstructions string
	DemoHeight       string
	DemoFullscreen   bool
	YoutubeVideos    []string
	Links            []ProjectLink
	Href             string
}

type BlogPost struct {
	Slug     string
	Title    string
	Date     string
	Excerpt  string
	Tags     []string
	Filename string
	Href     string
}

type NavPage struct {
	ID        string
	Title     string
	Order     int
	ShowInNav bool
	Href      string
}

// ── Route view state ──────────────────────────────────────────

type LoadStatus int

const (
	LoadReady   LoadStatus = iota // content available or nothing to load
	LoadPending                   // resolver wants a fetch; never rendered (routes paint once, after the fetch)
	LoadFailed
	LoadNotFound
)

type TOCItem struct {
	ID    string
	Text  string
	Level int
}

// cachedContent is a rendered route body; an empty HTML counts as a cache miss.
type cachedContent struct {
	HTML string
	TOC  []TOCItem
}

// ViewState is the state of the current route's content region.
// Only the field matching route.Kind is populated. Always build it with
// newViewState(): a bare struct literal leaves Status as null, not LoadReady.
type ViewState struct {
	Post     BlogPost
	Proj     Project // not `Project`: a field named after its type breaks the emitted constructor
	Page     NavPage
	HTML     string // rendered markdown for post, readme or page
	Status   LoadStatus
	HasPrev  bool
	PrevPost BlogPost
	HasNext  bool
	NextPost BlogPost
	TOC      []TOCItem
}

type SocialLink struct {
	Icon   string
	Href   string
	Target string
	Rel    string
}

type ThemeColors struct {
	Primary       string
	Secondary     string
	Background    string
	Text          string
	TextLight     string
	Border        string
	Hover         string
	CodeTheme     string
	CommentsTheme string
}

// CommentsConfig holds the two page toggles; Attrs is the raw giscus config
// object whose camelCase keys map 1:1 to data-* attributes on the client script.
type CommentsConfig struct {
	BlogEnabled     bool
	ProjectsEnabled bool
	Attrs           any
}

type EmailJSConfig struct {
	Enabled   bool
	ServiceId string
	TemplateId string
	PublicKey string
}

type SearchConfig struct {
	Enabled     bool
	MinChars    int
	Placeholder string
}

type SiteConfig struct {
	Title          string
	Url            string
	Description    string
	Author         string
	GithubUsername string
	DarkTheme      ThemeColors
	LightTheme     ThemeColors
	Comments       CommentsConfig
	EmailJS        EmailJSConfig
	Search         SearchConfig
	Social         []SocialLink
	PostsPerPage   int
}

type SearchResultItem struct {
	ID          string
	Title       string
	Description string
	Tags        []string
	ItemType    string
	Url         string
}

type ContactState struct {
	Name           string
	Email          string
	Message        string
	StatusText     string
	StatusType     string
	ButtonState    string
	ButtonDisabled bool
	ErrName        bool
	ErrEmail       bool
	ErrMessage     bool
}
