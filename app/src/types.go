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
	Title string `json:"title"`
	Icon  string `json:"icon"`
	Href  string `json:"href"`
}

type Project struct {
	ID               string        `json:"id"`
	Title            string        `json:"title"`
	Description      string        `json:"description"`
	Tags             []string      `json:"tags"`
	Order            int           `json:"order"`
	GithubRepo       string        `json:"github_repo"`
	GithubBranch     string        `json:"github_branch"`
	DemoUrl          string        `json:"demo_url"`
	DemoLabel        string        `json:"demo_label"`
	DemoInstructions string        `json:"demo_instructions"`
	DemoHeight       string        `json:"demo_height"`
	DemoFullscreen   bool          `json:"demo_fullscreen"`
	YoutubeVideos    []string      `json:"youtube_videos"`
	Links            []ProjectLink `json:"links"`
	Href             string        `json:"-"`
}

type BlogPost struct {
	Slug     string   `json:"-"`
	Title    string   `json:"title"`
	Date     string   `json:"date"`
	Excerpt  string   `json:"excerpt"`
	Tags     []string `json:"tags"`
	Filename string   `json:"filename"`
	Href     string   `json:"-"`
}

type NavPage struct {
	ID        string `json:"id"`
	Title     string `json:"title"`
	Order     int    `json:"order"`
	ShowInNav bool   `json:"showInNav"`
	Href      string `json:"-"`
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
	Icon   string `json:"icon"`
	Href   string `json:"href"`
	Target string `json:"target"`
	Rel    string `json:"rel"`
}

type ThemeNestedTheme struct {
	Theme string `json:"theme"`
}

type RawThemeColors struct {
	Primary    string           `json:"primary"`
	Secondary  string           `json:"secondary"`
	Background string           `json:"background"`
	Text       string           `json:"text"`
	TextLight  string           `json:"textLight"`
	Border     string           `json:"border"`
	Hover      string           `json:"hover"`
	Code       ThemeNestedTheme `json:"code"`
	Comments   ThemeNestedTheme `json:"comments"`
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
	Enabled    bool   `json:"enabled"`
	ServiceId  string `json:"serviceId"`
	TemplateId string `json:"templateId"`
	PublicKey  string `json:"publicKey"`
}

type SearchConfig struct {
	Enabled     bool   `json:"enabled"`
	MinChars    int    `json:"minChars"`
	Placeholder string `json:"placeholder"`
}

type ContentSiteTheme struct {
	Default string         `json:"default"`
	Dark    RawThemeColors `json:"dark"`
	Light   RawThemeColors `json:"light"`
}

type ContentSite struct {
	Title          string           `json:"title"`
	Url            string           `json:"url"`
	Description    string           `json:"description"`
	Author         string           `json:"author"`
	GithubUsername string           `json:"github_username"`
	Theme          ContentSiteTheme `json:"theme"`
	Search         SearchConfig     `json:"search"`
	EmailJS        EmailJSConfig    `json:"emailjs"`
	Comments       map[string]any   `json:"comments"`
	Social         []SocialLink     `json:"social"`
}

type ContentBlog struct {
	Title        string     `json:"title"`
	ShowInNav    bool       `json:"showInNav"`
	PostsPerPage int        `json:"postsPerPage"`
	DateFormat   string     `json:"dateFormat"`
	Posts        []BlogPost `json:"posts"`
}

type ContentPayload struct {
	Site         ContentSite                  `json:"site"`
	Blog         ContentBlog                  `json:"blog"`
	Projects     []Project                    `json:"projects"`
	Pages        map[string]NavPage           `json:"pages"`
	Translations map[string]map[string]string `json:"translations"`
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
