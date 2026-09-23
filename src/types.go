package main

// ── Routing ───────────────────────────────────────────────────

type Route int

const (
	RouteBlog Route = iota
	RoutePost
	RouteProject
	RoutePage
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
	ID       string
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

type CommentsConfig struct {
	BlogEnabled      bool
	ProjectsEnabled  bool
	Repo             string
	RepoId           string
	Category         string
	CategoryId       string
	Mapping          string
	Strict           string
	ReactionsEnabled string
	EmitMetadata     string
	InputPosition    string
	Lang             string
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
