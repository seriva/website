var __len = __len || function(a) {
  if (a && typeof a === 'object' && !Array.isArray(a) && !ArrayBuffer.isView(a)) return Object.keys(a).length;
  return a?.length ?? 0;
};
var __append = __append || function(a, ...b) {
  if (a && ArrayBuffer.isView(a)) {
    const res = new a.constructor(a.length + b.length);
    res.set(a);
    res.set(b, a.length);
    return res;
  }
  return a ? [...a, ...b] : b;
};
var __s = __s || function(a) { return a || []; };
var __error = __error || function(msg, cause) {
  return { Error() { return msg; }, toString() { return msg; }, _msg: msg, _cause: cause ?? null };
};

class iconDef {
  constructor(ViewBox$ = "", Path$ = "") {
    if (typeof ViewBox$ === "object" && ViewBox$ !== null && ViewBox$.constructor === Object) ({ ViewBox: ViewBox$ = "", Path: Path$ = "" } = ViewBox$);
    this.ViewBox = ViewBox$;
    this.Path = Path$;
  }

  __clone() { return new iconDef(this.ViewBox, this.Path); }
}
Object.defineProperty(iconDef.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

// type Route = int

class RouteMatch {
  constructor(Kind$ = null, Param$ = "", Page$ = 0) {
    this.Kind = Kind$;
    this.Param = Param$;
    this.Page = Page$;
  }

  __clone() { return new RouteMatch(this.Kind, this.Param, this.Page); }
}
Object.defineProperty(RouteMatch.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ProjectLink {
  constructor(Title$ = "", Icon$ = "", Href$ = "") {
    if (typeof Title$ === "object" && Title$ !== null && Title$.constructor === Object) ({ Title: Title$ = "", Icon: Icon$ = "", Href: Href$ = "" } = Title$);
    this.Title = Title$;
    this.Icon = Icon$;
    this.Href = Href$;
  }

  __clone() { return new ProjectLink(this.Title, this.Icon, this.Href); }
}
Object.defineProperty(ProjectLink.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class Project {
  constructor(ID$ = "", Title$ = "", Description$ = "", Tags$ = null, Order$ = 0, GithubRepo$ = "", GithubBranch$ = "", DemoUrl$ = "", DemoLabel$ = "", DemoInstructions$ = "", DemoHeight$ = "", DemoFullscreen$ = false, YoutubeVideos$ = null, Links$ = null, Href$ = "") {
    if (typeof ID$ === "object" && ID$ !== null && ID$.constructor === Object) ({ ID: ID$ = "", Title: Title$ = "", Description: Description$ = "", Tags: Tags$ = null, Order: Order$ = 0, GithubRepo: GithubRepo$ = "", GithubBranch: GithubBranch$ = "", DemoUrl: DemoUrl$ = "", DemoLabel: DemoLabel$ = "", DemoInstructions: DemoInstructions$ = "", DemoHeight: DemoHeight$ = "", DemoFullscreen: DemoFullscreen$ = false, YoutubeVideos: YoutubeVideos$ = null, Links: Links$ = null, Href: Href$ = "" } = ID$);
    this.ID = ID$;
    this.Title = Title$;
    this.Description = Description$;
    this.Tags = Tags$;
    this.Order = Order$;
    this.GithubRepo = GithubRepo$;
    this.GithubBranch = GithubBranch$;
    this.DemoUrl = DemoUrl$;
    this.DemoLabel = DemoLabel$;
    this.DemoInstructions = DemoInstructions$;
    this.DemoHeight = DemoHeight$;
    this.DemoFullscreen = DemoFullscreen$;
    this.YoutubeVideos = YoutubeVideos$;
    this.Links = Links$;
    this.Href = Href$;
  }

  __clone() { return new Project(this.ID, this.Title, this.Description, this.Tags, this.Order, this.GithubRepo, this.GithubBranch, this.DemoUrl, this.DemoLabel, this.DemoInstructions, this.DemoHeight, this.DemoFullscreen, this.YoutubeVideos, this.Links, this.Href); }
}
Object.defineProperty(Project.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class BlogPost {
  constructor(Slug$ = "", Title$ = "", Date$ = "", Excerpt$ = "", Tags$ = null, Filename$ = "", Href$ = "") {
    if (typeof Slug$ === "object" && Slug$ !== null && Slug$.constructor === Object) ({ Slug: Slug$ = "", Title: Title$ = "", Date: Date$ = "", Excerpt: Excerpt$ = "", Tags: Tags$ = null, Filename: Filename$ = "", Href: Href$ = "" } = Slug$);
    this.Slug = Slug$;
    this.Title = Title$;
    this.Date = Date$;
    this.Excerpt = Excerpt$;
    this.Tags = Tags$;
    this.Filename = Filename$;
    this.Href = Href$;
  }

  __clone() { return new BlogPost(this.Slug, this.Title, this.Date, this.Excerpt, this.Tags, this.Filename, this.Href); }
}
Object.defineProperty(BlogPost.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class NavPage {
  constructor(ID$ = "", Title$ = "", Order$ = 0, ShowInNav$ = false, Href$ = "") {
    if (typeof ID$ === "object" && ID$ !== null && ID$.constructor === Object) ({ ID: ID$ = "", Title: Title$ = "", Order: Order$ = 0, ShowInNav: ShowInNav$ = false, Href: Href$ = "" } = ID$);
    this.ID = ID$;
    this.Title = Title$;
    this.Order = Order$;
    this.ShowInNav = ShowInNav$;
    this.Href = Href$;
  }

  __clone() { return new NavPage(this.ID, this.Title, this.Order, this.ShowInNav, this.Href); }
}
Object.defineProperty(NavPage.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

// type LoadStatus = int

class TOCItem {
  constructor(ID$ = "", Text$ = "", Level$ = 0) {
    if (typeof ID$ === "object" && ID$ !== null && ID$.constructor === Object) ({ ID: ID$ = "", Text: Text$ = "", Level: Level$ = 0 } = ID$);
    this.ID = ID$;
    this.Text = Text$;
    this.Level = Level$;
  }

  __clone() { return new TOCItem(this.ID, this.Text, this.Level); }
}
Object.defineProperty(TOCItem.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class cachedContent {
  constructor(HTML$ = "", TOC$ = null) {
    if (typeof HTML$ === "object" && HTML$ !== null && HTML$.constructor === Object) ({ HTML: HTML$ = "", TOC: TOC$ = null } = HTML$);
    this.HTML = HTML$;
    this.TOC = TOC$;
  }

  __clone() { return new cachedContent(this.HTML, this.TOC); }
}
Object.defineProperty(cachedContent.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ViewState {
  constructor(Post$ = new BlogPost(), Proj$ = new Project(), Page$ = new NavPage(), HTML$ = "", Status$ = null, HasPrev$ = false, PrevPost$ = new BlogPost(), HasNext$ = false, NextPost$ = new BlogPost(), TOC$ = null) {
    this.Post = Post$;
    this.Proj = Proj$;
    this.Page = Page$;
    this.HTML = HTML$;
    this.Status = Status$;
    this.HasPrev = HasPrev$;
    this.PrevPost = PrevPost$;
    this.HasNext = HasNext$;
    this.NextPost = NextPost$;
    this.TOC = TOC$;
  }

  __clone() { return new ViewState(this.Post.__clone(), this.Proj.__clone(), this.Page.__clone(), this.HTML, this.Status, this.HasPrev, this.PrevPost.__clone(), this.HasNext, this.NextPost.__clone(), this.TOC); }
}
Object.defineProperty(ViewState.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class SocialLink {
  constructor(Icon$ = "", Href$ = "", Target$ = "", Rel$ = "") {
    if (typeof Icon$ === "object" && Icon$ !== null && Icon$.constructor === Object) ({ Icon: Icon$ = "", Href: Href$ = "", Target: Target$ = "", Rel: Rel$ = "" } = Icon$);
    this.Icon = Icon$;
    this.Href = Href$;
    this.Target = Target$;
    this.Rel = Rel$;
  }

  __clone() { return new SocialLink(this.Icon, this.Href, this.Target, this.Rel); }
}
Object.defineProperty(SocialLink.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ThemeColors {
  constructor(Primary$ = "", Secondary$ = "", Background$ = "", Text$ = "", TextLight$ = "", Border$ = "", Hover$ = "", CodeTheme$ = "", CommentsTheme$ = "") {
    if (typeof Primary$ === "object" && Primary$ !== null && Primary$.constructor === Object) ({ Primary: Primary$ = "", Secondary: Secondary$ = "", Background: Background$ = "", Text: Text$ = "", TextLight: TextLight$ = "", Border: Border$ = "", Hover: Hover$ = "", CodeTheme: CodeTheme$ = "", CommentsTheme: CommentsTheme$ = "" } = Primary$);
    this.Primary = Primary$;
    this.Secondary = Secondary$;
    this.Background = Background$;
    this.Text = Text$;
    this.TextLight = TextLight$;
    this.Border = Border$;
    this.Hover = Hover$;
    this.CodeTheme = CodeTheme$;
    this.CommentsTheme = CommentsTheme$;
  }

  __clone() { return new ThemeColors(this.Primary, this.Secondary, this.Background, this.Text, this.TextLight, this.Border, this.Hover, this.CodeTheme, this.CommentsTheme); }
}
Object.defineProperty(ThemeColors.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class CommentsConfig {
  constructor(BlogEnabled$ = false, ProjectsEnabled$ = false, Attrs$ = null) {
    if (typeof BlogEnabled$ === "object" && BlogEnabled$ !== null && BlogEnabled$.constructor === Object) ({ BlogEnabled: BlogEnabled$ = false, ProjectsEnabled: ProjectsEnabled$ = false, Attrs: Attrs$ = null } = BlogEnabled$);
    this.BlogEnabled = BlogEnabled$;
    this.ProjectsEnabled = ProjectsEnabled$;
    this.Attrs = Attrs$;
  }

  __clone() { return new CommentsConfig(this.BlogEnabled, this.ProjectsEnabled, this.Attrs); }
}
Object.defineProperty(CommentsConfig.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class EmailJSConfig {
  constructor(Enabled$ = false, ServiceId$ = "", TemplateId$ = "", PublicKey$ = "") {
    if (typeof Enabled$ === "object" && Enabled$ !== null && Enabled$.constructor === Object) ({ Enabled: Enabled$ = false, ServiceId: ServiceId$ = "", TemplateId: TemplateId$ = "", PublicKey: PublicKey$ = "" } = Enabled$);
    this.Enabled = Enabled$;
    this.ServiceId = ServiceId$;
    this.TemplateId = TemplateId$;
    this.PublicKey = PublicKey$;
  }

  __clone() { return new EmailJSConfig(this.Enabled, this.ServiceId, this.TemplateId, this.PublicKey); }
}
Object.defineProperty(EmailJSConfig.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class SearchConfig {
  constructor(Enabled$ = false, MinChars$ = 0, Placeholder$ = "") {
    if (typeof Enabled$ === "object" && Enabled$ !== null && Enabled$.constructor === Object) ({ Enabled: Enabled$ = false, MinChars: MinChars$ = 0, Placeholder: Placeholder$ = "" } = Enabled$);
    this.Enabled = Enabled$;
    this.MinChars = MinChars$;
    this.Placeholder = Placeholder$;
  }

  __clone() { return new SearchConfig(this.Enabled, this.MinChars, this.Placeholder); }
}
Object.defineProperty(SearchConfig.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class SiteConfig {
  constructor(Title$ = "", Url$ = "", Description$ = "", Author$ = "", GithubUsername$ = "", DarkTheme$ = new ThemeColors(), LightTheme$ = new ThemeColors(), Comments$ = new CommentsConfig(), EmailJS$ = new EmailJSConfig(), Search$ = new SearchConfig(), Social$ = null, PostsPerPage$ = 0) {
    if (typeof Title$ === "object" && Title$ !== null && Title$.constructor === Object) ({ Title: Title$ = "", Url: Url$ = "", Description: Description$ = "", Author: Author$ = "", GithubUsername: GithubUsername$ = "", DarkTheme: DarkTheme$ = new ThemeColors(), LightTheme: LightTheme$ = new ThemeColors(), Comments: Comments$ = new CommentsConfig(), EmailJS: EmailJS$ = new EmailJSConfig(), Search: Search$ = new SearchConfig(), Social: Social$ = null, PostsPerPage: PostsPerPage$ = 0 } = Title$);
    this.Title = Title$;
    this.Url = Url$;
    this.Description = Description$;
    this.Author = Author$;
    this.GithubUsername = GithubUsername$;
    this.DarkTheme = DarkTheme$;
    this.LightTheme = LightTheme$;
    this.Comments = Comments$;
    this.EmailJS = EmailJS$;
    this.Search = Search$;
    this.Social = Social$;
    this.PostsPerPage = PostsPerPage$;
  }

  __clone() { return new SiteConfig(this.Title, this.Url, this.Description, this.Author, this.GithubUsername, this.DarkTheme.__clone(), this.LightTheme.__clone(), this.Comments.__clone(), this.EmailJS.__clone(), this.Search.__clone(), this.Social, this.PostsPerPage); }
}
Object.defineProperty(SiteConfig.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class SearchResultItem {
  constructor(ID$ = "", Title$ = "", Description$ = "", Tags$ = null, ItemType$ = "", Url$ = "") {
    if (typeof ID$ === "object" && ID$ !== null && ID$.constructor === Object) ({ ID: ID$ = "", Title: Title$ = "", Description: Description$ = "", Tags: Tags$ = null, ItemType: ItemType$ = "", Url: Url$ = "" } = ID$);
    this.ID = ID$;
    this.Title = Title$;
    this.Description = Description$;
    this.Tags = Tags$;
    this.ItemType = ItemType$;
    this.Url = Url$;
  }

  __clone() { return new SearchResultItem(this.ID, this.Title, this.Description, this.Tags, this.ItemType, this.Url); }
}
Object.defineProperty(SearchResultItem.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ContactState {
  constructor(Name$ = "", Email$ = "", Message$ = "", StatusText$ = "", StatusType$ = "", ButtonState$ = "", ButtonDisabled$ = false, ErrName$ = false, ErrEmail$ = false, ErrMessage$ = false) {
    if (typeof Name$ === "object" && Name$ !== null && Name$.constructor === Object) ({ Name: Name$ = "", Email: Email$ = "", Message: Message$ = "", StatusText: StatusText$ = "", StatusType: StatusType$ = "", ButtonState: ButtonState$ = "", ButtonDisabled: ButtonDisabled$ = false, ErrName: ErrName$ = false, ErrEmail: ErrEmail$ = false, ErrMessage: ErrMessage$ = false } = Name$);
    this.Name = Name$;
    this.Email = Email$;
    this.Message = Message$;
    this.StatusText = StatusText$;
    this.StatusType = StatusType$;
    this.ButtonState = ButtonState$;
    this.ButtonDisabled = ButtonDisabled$;
    this.ErrName = ErrName$;
    this.ErrEmail = ErrEmail$;
    this.ErrMessage = ErrMessage$;
  }

  __clone() { return new ContactState(this.Name, this.Email, this.Message, this.StatusText, this.StatusType, this.ButtonState, this.ButtonDisabled, this.ErrName, this.ErrEmail, this.ErrMessage); }
}
Object.defineProperty(ContactState.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

const emailJSSrc = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4.4.1/dist/email.min.js";

const emailJSIntegrity = "sha384-SALc35EccAf6RzGw4iNsyj7kTPr33K7RoGzYu+7heZhT8s0GZouafRiCg1qy44AS";

const mermaidSrc = "https://cdn.jsdelivr.net/npm/mermaid@11/dist/mermaid.min.js";

const themeStorageKey = "theme-preference";

const RouteBlog = 0;
const RoutePost = 1;
const RouteProject = 2;
const RoutePage = 3;
const RouteNotFound = 4;

const LoadReady = 0;
const LoadPending = 1;
const LoadFailed = 2;
const LoadNotFound = 3;

let icons = { "sun": new iconDef("0 0 512 512", "M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121l19.8-107.9c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z"), "moon": new iconDef("0 0 384 512", "M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z"), "search": new iconDef("0 0 512 512", "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z"), "envelope": new iconDef("0 0 512 512", "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z"), "download": new iconDef("0 0 512 512", "M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H64zm280 60a24 24 0 1 1 0 48 24 24 0 1 1 0-48z"), "cube": new iconDef("0 0 512 512", "M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l192-68.6V135.4L288 204v230.6z"), "calendar": new iconDef("0 0 448 512", "M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z"), "github": new iconDef("0 0 496 512", "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 21 2.3-16.8 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z"), "youtube": new iconDef("0 0 576 512", "M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z"), "linkedin": new iconDef("0 0 448 512", "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z"), "chevron-down": new iconDef("0 0 512 512", "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"), "chevron-up": new iconDef("0 0 512 512", "M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8-12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z"), "chevron-left": new iconDef("0 0 320 512", "M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z"), "chevron-right": new iconDef("0 0 320 512", "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z"), "angles-left": new iconDef("0 0 512 512", "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z"), "angles-right": new iconDef("0 0 512 512", "M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z"), "times": new iconDef("0 0 384 512", "M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z"), "arrow-left": new iconDef("0 0 448 512", "M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"), "arrow-right": new iconDef("0 0 448 512", "M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"), "expand": new iconDef("0 0 448 512", "M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32S0 334.3 0 352v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM352 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H352zM320 352c0-17.7 14.3-32 32-32s32 14.3 32 32v64h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32-14.3-32-32V352z") };

let scriptPromises = {  };

let currentPath = "";

let isInitialRoute = true;

let routeSeq = 0;

let fuseInstance = null;

let searchDebounceTimer = null;

let searchSelectedIndex = -1;

let site = new SiteConfig("", "", "", "", "", new ThemeColors(), new ThemeColors(), new CommentsConfig(), new EmailJSConfig(), new SearchConfig(), []);

let posts = [];

let projects = [];

let navPages = [];

let translations = {  };

let route = new RouteMatch(null, "", 1);

let currentTheme = "dark";

let mobileMenuOpen = false;

let projectsDropdownOpen = false;

let searchOpen = false;

let searchQuery = "";

let searchResults = [];

let contactOpen = false;

let contactForm = new ContactState();

let view = new ViewState();

let contentCache = {  };

let appRefs = {  };

function NotFoundView() {
  return {Mount(___p, ___refs) {
    const ___e1 = document.createElement("div");
    ___e1.className = "error-message";
    const ___e2 = document.createElement("h1");
    ___e2.appendChild(document.createTextNode(String(t("general.notFound"))));
    ___e1.appendChild(___e2);
    const ___e3 = document.createElement("p");
    ___e3.appendChild(document.createTextNode(String(t("general.notFoundMessage"))));
    ___e1.appendChild(___e3);
    const ___e4 = document.createElement("div");
    ___e4.className = "download-buttons";
    ___e4.setAttribute("style", "margin-top: 1.5rem;");
    const ___e5 = document.createElement("a");
    ___e5.setAttribute("href", "/");
    ___e5.className = "btn btn-primary";
    ___e5.setAttribute("data-action", "nav");
    ___e5.appendChild(document.createTextNode(String(t("general.backToHome"))));
    ___e4.appendChild(___e5);
    ___e1.appendChild(___e4);
    ___p.appendChild(___e1);
  }};
}

function RouteView(r) {
  return {Mount(___p, ___refs) {
    switch (r.Kind) {
      case RoutePost: {
        (BlogPostView(view, site.Comments.BlogEnabled)).Mount(___p, ___refs);
      break; }
      case RouteProject: {
        (ProjectDetail(view, site.Comments.ProjectsEnabled)).Mount(___p, ___refs);
      break; }
      case RoutePage: {
        (PageView(view)).Mount(___p, ___refs);
      break; }
      case RouteNotFound: {
        (NotFoundView()).Mount(___p, ___refs);
      break; }
      default: {
        (BlogList(posts, r.Page, site.PostsPerPage)).Mount(___p, ___refs);
      break; }
    }
  }};
}

function MainContent() {
  return {Mount(___p, ___refs) {
    const ___e6 = document.createElement("main");
    ___e6.setAttribute("id", "main-content");
    ___e6.setAttribute("tabindex", "-1");
    (RouteView(route)).Mount(___e6, ___refs);
    ___p.appendChild(___e6);
  }};
}

function AppShell() {
  return {Mount(___p, ___refs) {
    const ___e7 = document.createElement("div");
    if(___refs)___refs["appRoot"]=___e7;
    ___e7.className = "app-root";
    const ___e8 = document.createElement("a");
    ___e8.setAttribute("href", "#main-content");
    ___e8.className = "skip-link";
    ___e8.appendChild(document.createTextNode(String(t("nav.skipToContent"))));
    ___e7.appendChild(___e8);
    const ___e9 = document.createElement("div");
    if(___refs)___refs["routeAnnouncer"]=___e9;
    ___e9.setAttribute("id", "route-announcer");
    ___e9.className = "sr-only";
    ___e9.setAttribute("aria-live", "polite");
    ___e9.setAttribute("aria-atomic", "true");
    ___e7.appendChild(___e9);
    const ___e10 = document.createElement("div");
    ___e10.setAttribute("id", "navbar-slot");
    (Navbar(route, navPages, projects, projectsDropdownOpen, mobileMenuOpen, site)).Mount(___e10, ___refs);
    ___e7.appendChild(___e10);
    const ___e11 = document.createElement("div");
    ___e11.setAttribute("id", "content-slot");
    (MainContent()).Mount(___e11, ___refs);
    ___e7.appendChild(___e11);
    (Footer(currentYear(), site.Author)).Mount(___e7, ___refs);
    (SearchModal(searchOpen, searchQuery, searchResults, searchSelectedIndex, searchPlaceholderText())).Mount(___e7, ___refs);
    (ContactModal(contactOpen, contactForm)).Mount(___e7, ___refs);
    ___p.appendChild(___e7);
  }};
}

function BlogPostCard(post) {
  return {Mount(___p, ___refs) {
    const ___e12 = document.createElement("article");
    ___e12.className = "blog-post-card";
    ___e12.setAttribute("data-action", "open-post");
    ___e12.setAttribute("data-href", String(post.Href));
    ___e12.setAttribute("role", "article");
    ___e12.setAttribute("aria-label", String(post.Title));
    const ___e13 = document.createElement("h2");
    ___e13.className = "blog-post-title";
    const ___e14 = document.createElement("a");
    ___e14.setAttribute("href", String(post.Href));
    ___e14.setAttribute("data-action", "nav");
    ___e14.appendChild(document.createTextNode(String(post.Title)));
    ___e13.appendChild(___e14);
    ___e12.appendChild(___e13);
    const ___e15 = document.createElement("div");
    ___e15.className = "blog-post-meta";
    const ___e16 = document.createElement("span");
    ___e16.className = "blog-post-date";
    (Icon("calendar", "1rem")).Mount(___e16, ___refs);
    ___e16.appendChild(document.createTextNode(String(" " + post.Date)));
    ___e15.appendChild(___e16);
    if (__len(post.Tags) > 0) {
      const ___e17 = document.createElement("span");
      ___e17.className = "blog-post-tags";
      for (const tag of post.Tags) {
        const ___e18 = document.createElement("span");
        ___e18.className = "item-tag clickable-tag";
        ___e18.setAttribute("data-search-tag", String(tag));
        ___e18.appendChild(document.createTextNode(String(tag)));
        ___e17.appendChild(___e18);
      }
      ___e15.appendChild(___e17);
    }
    ___e12.appendChild(___e15);
    const ___e19 = document.createElement("p");
    ___e19.className = "blog-post-excerpt";
    ___e19.appendChild(document.createTextNode(String(post.Excerpt)));
    ___e12.appendChild(___e19);
    ___p.appendChild(___e12);
  }};
}

function Pagination(currentPage, totalPages) {
  return {Mount(___p, ___refs) {
    const ___e20 = document.createElement("nav");
    ___e20.className = "blog-pagination";
    ___e20.setAttribute("aria-label", "Blog pagination");
    const ___e21 = document.createElement("ul");
    ___e21.className = "pagination";
    const ___e22 = document.createElement("li");
    ___e22.className = cls("page-item", currentPage <= 1, "disabled");
    const ___e23 = document.createElement("a");
    ___e23.className = "page-link";
    ___e23.setAttribute("href", String(pageHref(1)));
    ___e23.setAttribute("data-action", "nav");
    ___e23.setAttribute("aria-label", "First");
    ___e23.setAttribute("title", "First Page");
    (Icon("angles-left", "0.85em")).Mount(___e23, ___refs);
    ___e22.appendChild(___e23);
    ___e21.appendChild(___e22);
    const ___e24 = document.createElement("li");
    ___e24.className = cls("page-item", currentPage <= 1, "disabled");
    const ___e25 = document.createElement("a");
    ___e25.className = "page-link";
    ___e25.setAttribute("href", String(pageHref(currentPage - 1)));
    ___e25.setAttribute("data-action", "nav");
    ___e25.setAttribute("aria-label", "Previous");
    ___e25.setAttribute("title", "Previous Page");
    (Icon("chevron-left", "0.85em")).Mount(___e25, ___refs);
    ___e24.appendChild(___e25);
    ___e21.appendChild(___e24);
    for (const pageNum of pageNumbers(totalPages)) {
      const ___e26 = document.createElement("li");
      ___e26.className = cls("page-item", pageNum === currentPage, "active");
      const ___e27 = document.createElement("a");
      ___e27.className = "page-link";
      ___e27.setAttribute("href", String(pageHref(pageNum)));
      ___e27.setAttribute("data-action", "nav");
      ___e27.appendChild(document.createTextNode(String(pageNum)));
      ___e26.appendChild(___e27);
      ___e21.appendChild(___e26);
    }
    const ___e28 = document.createElement("li");
    ___e28.className = cls("page-item", currentPage >= totalPages, "disabled");
    const ___e29 = document.createElement("a");
    ___e29.className = "page-link";
    ___e29.setAttribute("href", String(pageHref(currentPage + 1)));
    ___e29.setAttribute("data-action", "nav");
    ___e29.setAttribute("aria-label", "Next");
    ___e29.setAttribute("title", "Next Page");
    (Icon("chevron-right", "0.85em")).Mount(___e29, ___refs);
    ___e28.appendChild(___e29);
    ___e21.appendChild(___e28);
    const ___e30 = document.createElement("li");
    ___e30.className = cls("page-item", currentPage >= totalPages, "disabled");
    const ___e31 = document.createElement("a");
    ___e31.className = "page-link";
    ___e31.setAttribute("href", String(pageHref(totalPages)));
    ___e31.setAttribute("data-action", "nav");
    ___e31.setAttribute("aria-label", "Last");
    ___e31.setAttribute("title", "Last Page");
    (Icon("angles-right", "0.85em")).Mount(___e31, ___refs);
    ___e30.appendChild(___e31);
    ___e21.appendChild(___e30);
    ___e20.appendChild(___e21);
    ___p.appendChild(___e20);
  }};
}

function BlogList(allPosts, currentPage, perPage) {
  return {Mount(___p, ___refs) {
    const ___e32 = document.createElement("div");
    ___e32.className = "blog-container";
    const ___e33 = document.createElement("h1");
    ___e33.className = "sr-only";
    ___e33.appendChild(document.createTextNode(String(t("nav.blog"))));
    ___e32.appendChild(___e33);
    if (__len(allPosts) === 0) {
      const ___e34 = document.createElement("p");
      ___e34.className = "blog-empty";
      ___e34.appendChild(document.createTextNode(String(t("blog.noPosts"))));
      ___e32.appendChild(___e34);
    } else {
      const ___e35 = document.createElement("div");
      ___e35.className = "blog-posts";
      for (const post of paginatedPosts(allPosts, currentPage, perPage)) {
        (BlogPostCard(post)).Mount(___e35, ___refs);
      }
      ___e32.appendChild(___e35);
      if (calcTotalPages(__len(allPosts), perPage) > 1) {
        (Pagination(currentPage, calcTotalPages(__len(allPosts), perPage))).Mount(___e32, ___refs);
      }
    }
    ___p.appendChild(___e32);
  }};
}

function TableOfContents(items) {
  return {Mount(___p, ___refs) {
    if (__len(items) >= 2) {
      const ___e36 = document.createElement("details");
      ___e36.className = "blog-toc";
      const ___e37 = document.createElement("summary");
      ___e37.className = "blog-toc-title";
      ___e37.appendChild(document.createTextNode(String(t("blog.tableOfContents"))));
      ___e36.appendChild(___e37);
      const ___e38 = document.createElement("nav");
      ___e38.className = "blog-toc-nav";
      ___e38.setAttribute("aria-label", String(t("blog.tableOfContents")));
      const ___e39 = document.createElement("ul");
      ___e39.className = "blog-toc-list";
      for (const item of items) {
        const ___e40 = document.createElement("li");
        ___e40.className = "blog-toc-item blog-toc-level-" + String(item.Level);
        const ___e41 = document.createElement("a");
        ___e41.setAttribute("href", String("#" + item.ID));
        ___e41.appendChild(document.createTextNode(String(item.Text)));
        ___e40.appendChild(___e41);
        ___e39.appendChild(___e40);
      }
      ___e38.appendChild(___e39);
      ___e36.appendChild(___e38);
      ___p.appendChild(___e36);
    }
  }};
}

function BlogPostView(v, commentsEnabled) {
  return {Mount(___p, ___refs) {
    if (v.Status === LoadNotFound || v.Status === LoadFailed) {
      const ___e42 = document.createElement("div");
      ___e42.className = "error-message";
      const ___e43 = document.createElement("h1");
      ___e43.appendChild(document.createTextNode(String(t("general.blogNotFound"))));
      ___e42.appendChild(___e43);
      const ___e44 = document.createElement("p");
      ___e44.appendChild(document.createTextNode(String(t("general.blogNotFoundMessage"))));
      ___e42.appendChild(___e44);
      ___p.appendChild(___e42);
    } else {
      const ___e45 = document.createElement("div");
      ___e45.className = "blog-post-view";
      const ___e46 = document.createElement("h1");
      ___e46.className = "project-title";
      ___e46.appendChild(document.createTextNode(String(v.Post.Title)));
      ___e45.appendChild(___e46);
      const ___e47 = document.createElement("p");
      ___e47.className = "project-description";
      ___e47.appendChild(document.createTextNode(String(v.Post.Date)));
      ___e45.appendChild(___e47);
      if (__len(v.Post.Tags) > 0) {
        const ___e48 = document.createElement("div");
        ___e48.className = "project-tags";
        for (const tag of v.Post.Tags) {
          const ___e49 = document.createElement("span");
          ___e49.className = "item-tag clickable-tag";
          ___e49.setAttribute("data-search-tag", String(tag));
          ___e49.appendChild(document.createTextNode(String(tag)));
          ___e48.appendChild(___e49);
        }
        ___e45.appendChild(___e48);
      }
      (TableOfContents(v.TOC)).Mount(___e45, ___refs);
      const ___e50 = document.createElement("div");
      ___e50.className = "blog-post-content";
      const ___e51 = document.createElement("div");
      ___e51.className = "markdown-body";
      ___e51.insertAdjacentHTML("beforeend", v.HTML);
      ___e50.appendChild(___e51);
      ___e45.appendChild(___e50);
      if (v.HasPrev || v.HasNext) {
        const ___e52 = document.createElement("nav");
        ___e52.className = "download-buttons blog-post-nav";
        ___e52.setAttribute("aria-label", "Post navigation");
        if (v.HasPrev) {
          const ___e53 = document.createElement("a");
          ___e53.setAttribute("href", String(v.PrevPost.Href));
          ___e53.className = "download-btn blog-nav-prev";
          ___e53.setAttribute("data-action", "nav");
          ___e53.setAttribute("title", String(v.PrevPost.Title));
          (Icon("arrow-left", "1rem")).Mount(___e53, ___refs);
          const ___e54 = document.createElement("span");
          ___e54.appendChild(document.createTextNode(String(t("blog.previousPost"))));
          ___e53.appendChild(___e54);
          ___e52.appendChild(___e53);
        }
        if (v.HasNext) {
          const ___e55 = document.createElement("a");
          ___e55.setAttribute("href", String(v.NextPost.Href));
          ___e55.className = "download-btn blog-nav-next";
          ___e55.setAttribute("data-action", "nav");
          ___e55.setAttribute("title", String(v.NextPost.Title));
          const ___e56 = document.createElement("span");
          ___e56.appendChild(document.createTextNode(String(t("blog.nextPost"))));
          ___e55.appendChild(___e56);
          (Icon("arrow-right", "1rem")).Mount(___e55, ___refs);
          ___e52.appendChild(___e55);
        }
        ___e45.appendChild(___e52);
      }
      if (commentsEnabled) {
        const ___e57 = document.createElement("div");
        ___e57.className = "giscus-container";
        ___e45.appendChild(___e57);
      }
      ___p.appendChild(___e45);
    }
  }};
}

function giscusTheme() {
  {
    let ct = getThemeColors(currentTheme).CommentsTheme;
    if (ct !== "") {
      return ct;
    }
  }
  return currentTheme;
}

function kebab(s) {
  let b = { _buf: "" };
  for (let i = 0; i < __len(s); i++) {
    let c = s.charCodeAt(i);
    if (c >= 65 && c <= 90) {
      ((b?.value ?? b)._buf += String.fromCodePoint(45));
      ((b?.value ?? b)._buf += String.fromCodePoint(c + (97 - 65)));
    } else {
      ((b?.value ?? b)._buf += String.fromCodePoint(c));
    }
  }
  return (b?.value ?? b)._buf;
}

function giscusAttrs(raw, theme) {
  let attrs = { "data-theme": theme };
  if (raw != null) {
    for (let [k, v] of Object.entries(raw)) {
      if (k === "blogEnabled" || k === "projectsEnabled") {
        continue;
      }
      attrs["data-" + kebab(k)] = strVal(v);
    }
  }
  return attrs;
}

function loadGiscus() {
  let container = document.querySelector(".giscus-container");
  if (container == null) {
    return;
  }
  container.innerHTML = "";
  let script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  for (let [name, value] of Object.entries(giscusAttrs(site.Comments.Attrs, giscusTheme()))) {
    script.setAttribute(name, value);
  }
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;
  container.appendChild(script);
}

function updateGiscusTheme() {
  let iframe = document.querySelector("iframe.giscus-frame");
  if (iframe == null) {
    return;
  }
  iframe.contentWindow.postMessage({ "giscus": { "setConfig": { "theme": giscusTheme() } } }, "https://giscus.app");
}

function ContactFormFields(form) {
  return {Mount(___p, ___refs) {
    const ___e58 = document.createElement("div");
    ___e58.className = "form-group";
    const ___e59 = document.createElement("label");
    ___e59.setAttribute("for", "contact-name");
    ___e59.appendChild(document.createTextNode(String(t("contact.name"))));
    ___e59.appendChild(document.createTextNode("*"));
    ___e58.appendChild(___e59);
    const ___e60 = document.createElement("input");
    ___e60.setAttribute("type", "text");
    ___e60.setAttribute("id", "contact-name");
    ___e60.setAttribute("name", "name");
    ___e60.setAttribute("required", "");
    ___e60.className = cls("", form.ErrName, "error");
    ___e60.setAttribute("aria-invalid", String(String(form.ErrName)));
    ___e60.setAttribute("value", String(form.Name));
    ___e58.appendChild(___e60);
    ___p.appendChild(___e58);
    const ___e61 = document.createElement("div");
    ___e61.className = "form-group";
    const ___e62 = document.createElement("label");
    ___e62.setAttribute("for", "contact-email");
    ___e62.appendChild(document.createTextNode(String(t("contact.email"))));
    ___e62.appendChild(document.createTextNode("*"));
    ___e61.appendChild(___e62);
    const ___e63 = document.createElement("input");
    ___e63.setAttribute("type", "email");
    ___e63.setAttribute("id", "contact-email");
    ___e63.setAttribute("name", "email");
    ___e63.setAttribute("required", "");
    ___e63.className = cls("", form.ErrEmail, "error");
    ___e63.setAttribute("aria-invalid", String(String(form.ErrEmail)));
    ___e63.setAttribute("value", String(form.Email));
    ___e61.appendChild(___e63);
    ___p.appendChild(___e61);
    const ___e64 = document.createElement("div");
    ___e64.className = "form-group";
    const ___e65 = document.createElement("label");
    ___e65.setAttribute("for", "contact-message");
    ___e65.appendChild(document.createTextNode(String(t("contact.message"))));
    ___e65.appendChild(document.createTextNode("*"));
    ___e64.appendChild(___e65);
    const ___e66 = document.createElement("textarea");
    ___e66.setAttribute("id", "contact-message");
    ___e66.setAttribute("name", "message");
    ___e66.setAttribute("rows", "6");
    ___e66.setAttribute("required", "");
    ___e66.className = cls("", form.ErrMessage, "error");
    ___e66.setAttribute("aria-invalid", String(String(form.ErrMessage)));
    ___e66.appendChild(document.createTextNode(String(form.Message)));
    ___e64.appendChild(___e66);
    ___p.appendChild(___e64);
    const ___e67 = document.createElement("div");
    ___e67.className = formStatusClass(form.StatusType);
    ___e67.setAttribute("id", "contact-status");
    ___e67.setAttribute("aria-live", "polite");
    const ___e68 = document.createElement("span");
    ___e68.appendChild(document.createTextNode(String(form.StatusText)));
    ___e67.appendChild(___e68);
    ___p.appendChild(___e67);
    const ___e69 = document.createElement("button");
    ___e69.setAttribute("type", "submit");
    ___e69.className = "btn btn-primary";
    ___e69.setAttribute("id", "contact-submit");
    if(form.ButtonDisabled)___e69.setAttribute("disabled", "");
    ___e69.appendChild(document.createTextNode(String(t("contact." + form.ButtonState))));
    ___p.appendChild(___e69);
  }};
}

function ContactModal(open, form) {
  return {Mount(___p, ___refs) {
    const ___e70 = document.createElement("div");
    ___e70.setAttribute("id", "contact-modal");
    ___e70.className = cls("", open, "show");
    ___e70.setAttribute("role", "dialog");
    ___e70.setAttribute("aria-modal", "true");
    ___e70.setAttribute("aria-labelledby", "contact-modal-title");
    const ___e71 = document.createElement("div");
    ___e71.className = "contact-modal-content";
    const ___e72 = document.createElement("div");
    ___e72.className = "contact-modal-header";
    const ___e73 = document.createElement("h2");
    ___e73.setAttribute("id", "contact-modal-title");
    ___e73.appendChild(document.createTextNode(String(t("contact.title"))));
    ___e72.appendChild(___e73);
    const ___e74 = document.createElement("button");
    ___e74.setAttribute("type", "button");
    ___e74.className = "contact-modal-close";
    ___e74.setAttribute("id", "contact-modal-close");
    ___e74.setAttribute("aria-label", String(t("contact.close")));
    ___e74.setAttribute("data-action", "close-contact");
    (Icon("times", "1.2rem")).Mount(___e74, ___refs);
    ___e72.appendChild(___e74);
    ___e71.appendChild(___e72);
    const ___e75 = document.createElement("form");
    ___e75.className = "contact-form";
    ___e75.setAttribute("id", "contact-form");
    ___e75.setAttribute("novalidate", "");
    (ContactFormFields(form)).Mount(___e75, ___refs);
    ___e71.appendChild(___e75);
    ___e70.appendChild(___e71);
    ___p.appendChild(___e70);
  }};
}

function loadEmailJS() {
  return loadScript(emailJSSrc, emailJSIntegrity);
}

function initEmailJS() {
  if (site.EmailJS.Enabled && site.EmailJS.PublicKey !== "" && window.emailjs != null) {
    emailjs.init(site.EmailJS.PublicKey);
  }
}

async function preloadEmailJS() {
  const __defers = [];
  let __panic = null;
  try {
    __defers.push(() => { (function() {
      {
        let r = (typeof __panic !== "undefined" && __panic !== null ? (() => { const __r = __panic.message ?? String(__panic); __panic = null; return __r; })() : null);
        if (r != null) {
          console.warn("EmailJS preload failed:", r);
        }
      }
    })(); });
    await loadEmailJS();
  } catch (__err) {
    __panic = __err;
  } finally {
    for (let __i = __defers.length - 1; __i >= 0; __i--) __defers[__i]();
    if (__panic !== null) throw __panic;
  }
}

function resetContactForm() {
  contactForm = new ContactState("", "", "", "", "", "send");
  renderContactForm();
}

function openContact() {
  if (site.EmailJS.Enabled) {
    preloadEmailJS();
  }
  closeMenus();
  contactOpen = true;
  resetContactForm();
  syncOverlays();
  focusLater("#contact-name");
}

function closeContact() {
  if (!contactOpen) {
    return;
  }
  contactOpen = false;
  syncOverlays();
}

function updateContactField(field, value) {
  switch (field) {
    case "name":
    {
      contactForm.Name = value;
      break;
    }
    case "email":
    {
      contactForm.Email = value;
      break;
    }
    case "message":
    {
      contactForm.Message = value;
      break;
    }
  }
}

function isValidEmail(email) {
  return __len(email) >= 5 && email.includes("@") && email.includes(".") && !email.includes(" ");
}

function validateContact(form) {
  form = form.__clone();
  form.Name = form.Name.trim();
  form.Email = form.Email.trim();
  form.Message = form.Message.trim();
  form.ErrName = false;
  form.ErrEmail = false;
  form.ErrMessage = false;
  form.StatusText = "";
  form.StatusType = "";
  switch (true) {
    case form.Name === "":
    {
      form.ErrName = true;
      form.StatusText = t("contact.name") + ": " + t("contact.required");
      break;
    }
    case form.Email === "":
    {
      form.ErrEmail = true;
      form.StatusText = t("contact.email") + ": " + t("contact.required");
      break;
    }
    case !isValidEmail(form.Email):
    {
      form.ErrEmail = true;
      form.StatusText = t("contact.invalidEmail");
      break;
    }
    case form.Message === "":
    {
      form.ErrMessage = true;
      form.StatusText = t("contact.message") + ": " + t("contact.required");
      break;
    }
    default:
    {
      return [form, true];
    }
  }
  form.StatusType = "error";
  return [form, false];
}

async function submitContact() {
  const __defers = [];
  let __panic = null;
  try {
    let [form, ok] = validateContact(contactForm);
    contactForm = form.__clone();
    if (!ok) {
      renderContactForm();
      return;
    }
    contactForm.ButtonState = "sending";
    contactForm.ButtonDisabled = true;
    renderContactForm();
    let params = { "title": site.Title, "name": contactForm.Name, "email": contactForm.Email, "message": contactForm.Message };
    __defers.push(() => { (function() {
      {
        let r = (typeof __panic !== "undefined" && __panic !== null ? (() => { const __r = __panic.message ?? String(__panic); __panic = null; return __r; })() : null);
        if (r != null) {
          contactForm.ButtonDisabled = false;
          contactForm.ButtonState = "send";
          contactForm.StatusText = t("contact.error");
          contactForm.StatusType = "error";
          renderContactForm();
        }
      }
    })(); });
    await loadEmailJS();
    initEmailJS();
    await emailjs.send(site.EmailJS.ServiceId, site.EmailJS.TemplateId, params, site.EmailJS.PublicKey);
    contactForm.StatusText = t("contact.success");
    contactForm.StatusType = "success";
    contactForm.ButtonState = "send";
    renderContactForm();
    setTimeout(function() {
      closeContact();
    }, 2000);
  } catch (__err) {
    __panic = __err;
  } finally {
    for (let __i = __defers.length - 1; __i >= 0; __i--) __defers[__i]();
    if (__panic !== null) throw __panic;
  }
}

function Footer(year, author) {
  return {Mount(___p, ___refs) {
    const ___e76 = document.createElement("footer");
    ___e76.appendChild(document.createTextNode(String("© " + String(year) + " " + author + ". " + t("footer.rights") + ".")));
    ___p.appendChild(___e76);
  }};
}

function iconSvg(name, size) {
  let def = icons[name];
  let ok = (name) in icons;
  if (!ok) {
    return "";
  }
  let s = size.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
  return "<svg class=\"icon icon-" + name + "\" width=\"" + s + "\" height=\"" + s + "\" viewBox=\"" + def.ViewBox + "\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"" + def.Path + "\"/></svg>";
}

function Icon(name, size) {
  return {Mount(___p, ___refs) {
    ___p.insertAdjacentHTML("beforeend", iconSvg(name, size));
  }};
}

function loadScript(src, integrity) {
  {
    let p = scriptPromises[src];
    let ok = (src) in scriptPromises;
    if (ok) {
      return p;
    }
  }
  let d = Promise.withResolvers();
  let s = document.createElement("script");
  s.src = src;
  if (integrity !== "") {
    s.integrity = integrity;
    s.crossOrigin = "anonymous";
  }
  s.async = true;
  s.onload = function(_) {
    d.resolve(null);
  };
  s.onerror = function(e) {
    (delete scriptPromises[src]);
    d.reject(e);
  };
  document.head.appendChild(s);
  scriptPromises[src] = d.promise;
  return d.promise;
}

function toggleProjectsDropdown() {
  projectsDropdownOpen = !projectsDropdownOpen;
  syncOverlays();
}

function closeProjectsDropdown() {
  if (!projectsDropdownOpen) {
    return;
  }
  projectsDropdownOpen = false;
  syncOverlays();
}

function toggleMobileMenu() {
  mobileMenuOpen = !mobileMenuOpen;
  syncOverlays();
}

function closeMobileMenu() {
  if (!mobileMenuOpen) {
    return;
  }
  mobileMenuOpen = false;
  syncOverlays();
}

function closeMenus() {
  closeMobileMenu();
  closeProjectsDropdown();
}

function navigateHash(hash) {
  if (((s, pre) => s.startsWith(pre) ? s.slice(pre.length) : s)(hash, "#") !== "") {
    scrollToHash(hash, true);
    window.history.pushState({  }, "", hash);
    return;
  }
  window.scrollTo({ "top": 0, "left": 0, "behavior": "smooth" });
  window.history.pushState({  }, "", window.location.pathname);
}

function setupEvents() {
  let app = (appRefs["appRoot"] ?? null);
  if (app == null && document != null) {
    app = document.querySelector("#app");
  }
  if (app == null) {
    return;
  }
  app.addEventListener("click", function(e) {
    let target = e.target;
    let tagEl = target.closest("[data-search-tag]");
    if (tagEl != null) {
      e.preventDefault();
      e.stopPropagation();
      let tag = tagEl.getAttribute("data-search-tag");
      if (tag != null && tag !== "") {
        openSearchWithTag(String(tag));
      }
      return;
    }
    let btn = target.closest("[data-action]");
    if (btn != null) {
      let action = String(btn.getAttribute("data-action"));
      switch (action) {
        case "nav":
        {
          e.preventDefault();
          if (btn.closest(".disabled") != null) {
            return;
          }
          let href = btn.getAttribute("href");
          if (href != null && href !== "") {
            let hrefStr = String(href);
            if (hrefStr.startsWith("#")) {
              navigateHash(hrefStr);
              return;
            }
            navigate(hrefStr);
          }
          break;
        }
        case "toggle-mobile-nav":
        {
          e.preventDefault();
          e.stopPropagation();
          toggleMobileMenu();
          break;
        }
        case "toggle-projects-dropdown":
        {
          e.preventDefault();
          e.stopPropagation();
          toggleProjectsDropdown();
          break;
        }
        case "toggle-theme":
        {
          e.preventDefault();
          toggleTheme();
          break;
        }
        case "open-search":
        {
          e.preventDefault();
          openSearch();
          break;
        }
        case "close-search":
        {
          e.preventDefault();
          closeSearch();
          break;
        }
        case "clear-search":
        {
          e.preventDefault();
          clearSearch();
          break;
        }
        case "open-contact":
        {
          e.preventDefault();
          openContact();
          break;
        }
        case "close-contact":
        {
          e.preventDefault();
          closeContact();
          break;
        }
        case "toggle-fullscreen":
        {
          e.preventDefault();
          let iframe = document.querySelector("#demo");
          if (iframe != null) {
            if (document.fullscreenElement == null) {
              iframe.requestFullscreen();
            } else {
              document.exitFullscreen();
            }
          }
          break;
        }
        case "copy-code":
        {
          e.preventDefault();
          let copyBtn = target.closest(".copy-code-button");
          if (copyBtn != null) {
            let pre = copyBtn.closest("pre");
            if (pre != null) {
              let codeEl = pre.querySelector("code");
              if (codeEl != null) {
                let text = codeEl.textContent;
                navigator.clipboard.writeText(text);
                copyBtn.textContent = t("code.copied");
                copyBtn.classList.add("copied");
                setTimeout(function() {
                  copyBtn.textContent = t("code.copy");
                  copyBtn.classList.remove("copied");
                }, 2000);
              }
            }
          }
          break;
        }
        case "open-post":
        {
          if (target.closest("a") == null && target.closest(".clickable-tag") == null) {
            let href = btn.getAttribute("data-href");
            if (href != null && href !== "") {
              navigate(String(href));
            }
          }
          break;
        }
      }
      return;
    }
    let link = target.closest("a");
    if (link != null) {
      let href = String(link.getAttribute("href"));
      let targetAttr = link.getAttribute("target");
      if (targetAttr != null && targetAttr !== "" && targetAttr !== "_self") {
        return;
      }
      if (href.startsWith("#")) {
        e.preventDefault();
        navigateHash(href);
        return;
      }
      if (href.startsWith("/")) {
        if (currentPath !== "" && href.startsWith(currentPath + "#")) {
          e.preventDefault();
          let hash = ((s, pre) => s.startsWith(pre) ? s.slice(pre.length) : s)(href, currentPath);
          scrollToHash(hash, true);
          window.history.pushState({  }, "", href);
          return;
        }
        e.preventDefault();
        navigate(href);
        return;
      }
    }
    if (target.id === "search-page") {
      closeSearch();
      return;
    }
    if (target.id === "contact-modal") {
      closeContact();
      return;
    }
  });
  app.addEventListener("input", function(e) {
    if (e.target.matches("#search-page-input")) {
      handleSearchInput(String(e.target.value));
      return;
    }
    if (e.target.closest("#contact-form") != null) {
      updateContactField(String(e.target.name), String(e.target.value));
    }
  });
  app.addEventListener("submit", function(e) {
    if (e.target.matches("#contact-form")) {
      e.preventDefault();
      submitContact();
    }
  });
  window.addEventListener("keydown", function(e) {
    let key = strVal(e.key);
    if (key === "Escape") {
      if (searchOpen) {
        closeSearch();
      }
      if (contactOpen) {
        closeContact();
      }
      return;
    }
    if (searchOpen) {
      if (key === "ArrowDown") {
        e.preventDefault();
        searchSelectNext();
        return;
      }
      if (key === "ArrowUp") {
        e.preventDefault();
        searchSelectPrev();
        return;
      }
      if (key === "Enter" && searchHasSelection()) {
        e.preventDefault();
        searchOpenSelected();
        return;
      }
    }
    if (site.Search.Enabled && !contactOpen) {
      let isCmdK = (boolVal(e.metaKey) || boolVal(e.ctrlKey)) && (key === "k" || key === "K");
      let isSlash = key === "/";
      if (isCmdK || isSlash) {
        let target = e.target;
        let tagName = "";
        let isEditable = false;
        if (target != null) {
          tagName = strVal(target.tagName).toUpperCase();
          isEditable = boolVal(target.isContentEditable);
        }
        let inInput = tagName === "INPUT" || tagName === "TEXTAREA" || tagName === "SELECT" || isEditable;
        if (isCmdK) {
          e.preventDefault();
          if (searchOpen) {
            closeSearch();
          } else {
            openSearch();
          }
        } else if (isSlash && !inInput) {
          e.preventDefault();
          if (!searchOpen) {
            openSearch();
          }
        }
      }
    }
  });
  document.addEventListener("click", function(e) {
    let navbar = document.querySelector("nav");
    if (navbar != null && mobileMenuOpen) {
      let isMobile = window.innerWidth <= 767;
      if (isMobile && !navbar.contains(e.target)) {
        closeMobileMenu();
      }
    }
    if (projectsDropdownOpen) {
      let dropdown = document.querySelector(".dropdown");
      if (dropdown == null || !dropdown.contains(e.target)) {
        closeProjectsDropdown();
      }
    }
  });
  window.addEventListener("popstate", function(e) {
    let newPath = String(window.location.pathname);
    if (newPath === currentPath) {
      let hash = String(window.location.hash);
      if (hash !== "") {
        scrollToHash(hash, true);
      } else {
        window.scrollTo({ "top": 0, "left": 0, "behavior": "smooth" });
      }
      return;
    }
    handleRoute();
  });
}

async function main() {
  view = newViewState();
  let err = await initData();
  if (err != null) {
    console.error("Init data failed:", err);
  }
  initTheme();
  initSearch();
  initInitialRoute();
  ((sel,n,r)=>{const e=document.querySelector(sel);e.innerHTML="";n.Mount(e,r)})("#app",AppShell(),appRefs);
  setupEvents();
  await handleRoute();
  document.body.classList.add("app-ready");
}

function slugify(text) {
  text = text.trim().toLowerCase();
  let b = { _buf: "" };
  for (let i = 0; i < __len(text); i++) {
    let c = text.charCodeAt(i);
    if (c >= 97 && c <= 122 || c >= 48 && c <= 57) {
      ((b?.value ?? b)._buf += String.fromCodePoint(c));
    } else if (c === 32 || c === 45 || c === 95) {
      if ((b?.value ?? b)._buf.length > 0 && (b?.value ?? b)._buf.charCodeAt((b?.value ?? b)._buf.length - 1) !== 45) {
        ((b?.value ?? b)._buf += String.fromCodePoint(45));
      }
    }
  }
  let res = (b?.value ?? b)._buf.replace(new RegExp(`^[${"-"}]+|[${"-"}]+$`, "g"), "");
  if (res === "") {
    res = "section";
  }
  return res;
}

function cleanHeadingText(text) {
  text = text.trim();
  text = text.replace(new RegExp(`[${"#"}]+$`), "");
  text = text.trim();
  let b = { _buf: "" };
  let i = 0;
  while (i < __len(text)) {
    let c = text.charCodeAt(i);
    switch (true) {
      case c === 96 || c === 42 || c === 91:
      {
        i++;
        break;
      }
      case c === 93:
      {
        i++;
        if (i < __len(text) && text.charCodeAt(i) === 40) {
          {
            let end = (text.slice(i)).indexOf(String.fromCharCode(41));
            if (end !== -1) {
              i += end + 1;
            }
          }
        }
        break;
      }
      default:
      {
        ((b?.value ?? b)._buf += String.fromCodePoint(c));
        i++;
        break;
      }
    }
  }
  return (b?.value ?? b)._buf.trim();
}

function extractTOC(markdown) {
  let items = [];
  if (markdown === "") {
    return items;
  }
  let lines = markdown.split("\n");
  let inCode = false;
  let slugCounts = {  };
  for (let __i0 = 0, __arr0 = lines, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let line = __arr0[__i0];
    let trimmed = line.trim();
    if (trimmed.startsWith("```") || trimmed.startsWith("~~~")) {
      inCode = !inCode;
      continue;
    }
    if (inCode) {
      continue;
    }
    let level = 0;
    let headingText = "";
    if (trimmed.startsWith("## ")) {
      level = 2;
      headingText = cleanHeadingText(trimmed.slice(3));
    } else if (trimmed.startsWith("### ")) {
      level = 3;
      headingText = cleanHeadingText(trimmed.slice(4));
    }
    if (level > 0 && headingText !== "") {
      let slug = slugify(headingText);
      let id = slug;
      {
        let count = slugCounts[slug];
        let ok = (slug) in slugCounts;
        if (ok) {
          id = slug + "-" + String(count);
          slugCounts[slug] = count + 1;
        } else {
          slugCounts[slug] = 1;
        }
      }
      items = __append(items, new TOCItem(id, headingText, level));
    }
  }
  return items;
}

function extractProjectTOC(markdown, p) {
  let items = extractTOC(markdown);
  if (__len(p.YoutubeVideos) > 0) {
    items = __append(items, new TOCItem("project-media", t("project.media"), 2));
  }
  if (p.DemoUrl !== "") {
    items = __append(items, new TOCItem("project-demo", demoLabel(p), 2));
  }
  if (__len(p.Links) > 0) {
    items = __append(items, new TOCItem("project-links", t("project.links"), 2));
  }
  return items;
}

function headingTextKey(inner) {
  let b = { _buf: "" };
  let inTag = false;
  for (let i = 0; i < __len(inner); i++) {
    let c = inner.charCodeAt(i);
    if (c === 60) {
      inTag = true;
      continue;
    }
    if (c === 62) {
      inTag = false;
      continue;
    }
    if (!inTag) {
      ((b?.value ?? b)._buf += String.fromCodePoint(c));
    }
  }
  let text = (b?.value ?? b)._buf;
  text = text.replaceAll("&amp;", "&");
  text = text.replaceAll("&lt;", "<");
  text = text.replaceAll("&gt;", ">");
  text = text.replaceAll("&quot;", "\"");
  text = text.replaceAll("&#39;", "'");
  return slugify(text);
}

function injectHeadingIDs(html, toc) {
  if (__len(toc) === 0 || html === "") {
    return html;
  }
  let pending = {  };
  for (let __i0 = 0, __arr0 = toc, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let item = __arr0[__i0];
    let key = slugify(item.Text);
    pending[key] = __append((pending[key] ?? null), item.ID);
  }
  let b = { _buf: "" };
  let idx = 0;
  while (idx < __len(html)) {
    let rest = html.slice(idx);
    if (rest.startsWith("<h2") || rest.startsWith("<h3")) {
      let closeBracket = rest.indexOf(">");
      let closeTag = rest.indexOf("</h");
      if (closeBracket !== -1 && closeTag !== -1 && closeBracket < closeTag) {
        let openTag = rest.slice(0, closeBracket + 1);
        let key = headingTextKey(rest.slice(closeBracket + 1, closeTag));
        let ids = (pending[key] ?? null);
        if (__len(ids) > 0 && !openTag.includes("id=")) {
          pending[key] = ids.slice(1);
          ((b?.value ?? b)._buf += openTag.slice(0, 3) + " id=\"" + ids[0] + "\"" + openTag.slice(3), [openTag.slice(0, 3) + " id=\"" + ids[0] + "\"" + openTag.slice(3).length, null]);
        } else {
          ((b?.value ?? b)._buf += openTag, [openTag.length, null]);
        }
        idx += closeBracket + 1;
        continue;
      }
    }
    ((b?.value ?? b)._buf += String.fromCodePoint(html.charCodeAt(idx)));
    idx++;
  }
  return (b?.value ?? b)._buf;
}

function parseMarkdown(content) {
  const __defers = [];
  let __panic = null;
  try {
    if (content === "") {
      return "";
    }
    __defers.push(() => { (function() {
      {
        let r = (typeof __panic !== "undefined" && __panic !== null ? (() => { const __r = __panic.message ?? String(__panic); __panic = null; return __r; })() : null);
        if (r != null) {
          console.error("Error rendering markdown:", r);
        }
      }
    })(); });
    return marked.parse(content);
  } catch (__err) {
    __panic = __err;
  } finally {
    for (let __i = __defers.length - 1; __i >= 0; __i--) __defers[__i]();
    if (__panic !== null) throw __panic;
  }
}

function stripFrontmatter(markdown) {
  let trimmed = markdown.trim();
  if (!trimmed.startsWith("---")) {
    return trimmed;
  }
  let rest = trimmed.slice(3);
  let newlineIdx = rest.indexOf("\n");
  if (newlineIdx === -1) {
    return trimmed;
  }
  let afterFirstLine = rest.slice(newlineIdx + 1);
  let closingIdx = afterFirstLine.indexOf("\n---");
  if (closingIdx === -1) {
    closingIdx = afterFirstLine.indexOf("---");
    if (closingIdx === -1) {
      return trimmed;
    }
    let afterClosing = afterFirstLine.slice(closingIdx + 3);
    return afterClosing.trim();
  }
  let afterClosing = afterFirstLine.slice(closingIdx + 4);
  return afterClosing.trim();
}

async function loadMarkdownFile(url) {
  const __defers = [];
  let __panic = null;
  try {
    __defers.push(() => { (function() {
      {
        let r = (typeof __panic !== "undefined" && __panic !== null ? (() => { const __r = __panic.message ?? String(__panic); __panic = null; return __r; })() : null);
        if (r != null) {
          console.error("fetch failed:", r);
        }
      }
    })(); });
    let res = await fetch(url);
    if (res == null || !res.ok) {
      return ["", __error("HTTP error")];
    }
    let text = await res.text();
    return [String(text), null];
  } catch (__err) {
    __panic = __err;
  } finally {
    for (let __i = __defers.length - 1; __i >= 0; __i--) __defers[__i]();
    if (__panic !== null) throw __panic;
  }
}

function attachCopyButtons() {
  let pres = document.querySelectorAll("pre");
  for (let i = 0; i < __len(pres); i++) {
    let pre = pres[i];
    if (pre.querySelector(".copy-code-button") != null) {
      continue;
    }
    let btn = document.createElement("button");
    btn.className = "copy-code-button";
    btn.setAttribute("data-action", "copy-code");
    btn.setAttribute("aria-label", t("aria.copyCode"));
    btn.textContent = t("code.copy");
    pre.style.position = "relative";
    pre.appendChild(btn);
  }
}

function highlightCode() {
  const __defers = [];
  let __panic = null;
  try {
    __defers.push(() => { (function() {
      {
        let r = (typeof __panic !== "undefined" && __panic !== null ? (() => { const __r = __panic.message ?? String(__panic); __panic = null; return __r; })() : null);
        if (r != null) {
          console.warn("Prism highlight error:", r);
        }
      }
    })(); });
    convertMermaidBlocks();
    if (Prism.languages.templ == null && Prism.languages.go != null) {
      Prism.languages.templ = Prism.languages.go;
    }
    Prism.highlightAll();
    attachCopyButtons();
    renderMermaid();
  } catch (__err) {
    __panic = __err;
  } finally {
    for (let __i = __defers.length - 1; __i >= 0; __i--) __defers[__i]();
    if (__panic !== null) throw __panic;
  }
}

function convertMermaidBlocks() {
  let codes = document.querySelectorAll("pre > code.language-mermaid");
  for (let i = 0; i < __len(codes); i++) {
    let code = codes[i];
    let src = String(code.textContent);
    let div = document.createElement("div");
    div.className = "mermaid";
    div.setAttribute("data-mermaid-src", src);
    div.textContent = src;
    code.parentElement.replaceWith(div);
  }
  return __len(codes);
}

function mermaidTheme(theme) {
  if (theme === "light") {
    return "default";
  }
  return "dark";
}

function loadMermaid() {
  return loadScript(mermaidSrc, "");
}

async function renderMermaid() {
  const __defers = [];
  let __panic = null;
  try {
    __defers.push(() => { (function() {
      {
        let r = (typeof __panic !== "undefined" && __panic !== null ? (() => { const __r = __panic.message ?? String(__panic); __panic = null; return __r; })() : null);
        if (r != null) {
          console.warn("Mermaid render error:", r);
        }
      }
    })(); });
    let nodes = document.querySelectorAll(".mermaid[data-mermaid-src]");
    if (__len(nodes) === 0) {
      return;
    }
    await loadMermaid();
    for (let i = 0; i < __len(nodes); i++) {
      let n = nodes[i];
      n.removeAttribute("data-processed");
      n.textContent = n.getAttribute("data-mermaid-src");
    }
    mermaid.initialize({ "startOnLoad": false, "theme": mermaidTheme(currentTheme), "securityLevel": "strict" });
    await mermaid.run({ "nodes": nodes });
  } catch (__err) {
    __panic = __err;
  } finally {
    for (let __i = __defers.length - 1; __i >= 0; __i--) __defers[__i]();
    if (__panic !== null) throw __panic;
  }
}

function Navbar(r, pages, projects, dropdownOpen, mobileOpen, siteConfig) {
  return {Mount(___p, ___refs) {
    const ___e77 = document.createElement("nav");
    ___e77.className = "navbar";
    const ___e78 = document.createElement("div");
    ___e78.className = "navbar-inner";
    const ___e79 = document.createElement("a");
    ___e79.className = "navbar-brand";
    ___e79.setAttribute("href", "/");
    ___e79.setAttribute("data-action", "nav");
    ___e79.appendChild(document.createTextNode(String(siteConfig.Title)));
    ___e78.appendChild(___e79);
    const ___e80 = document.createElement("button");
    ___e80.setAttribute("type", "button");
    ___e80.className = cls("navbar-toggle", mobileOpen, "active");
    ___e80.setAttribute("aria-label", "Toggle navigation");
    ___e80.setAttribute("aria-expanded", String(String(mobileOpen)));
    ___e80.setAttribute("data-action", "toggle-mobile-nav");
    const ___e81 = document.createElement("span");
    ___e81.className = "navbar-toggle-icon";
    ___e80.appendChild(___e81);
    ___e78.appendChild(___e80);
    const ___e82 = document.createElement("div");
    ___e82.className = cls("navbar-collapse", mobileOpen, "show");
    const ___e83 = document.createElement("ul");
    ___e83.className = "navbar-nav left";
    const ___e84 = document.createElement("li");
    ___e84.className = "nav-item navbar-menu";
    const ___e85 = document.createElement("a");
    ___e85.className = cls("nav-link", r.Kind === RouteBlog, "active");
    ___e85.setAttribute("href", "/blog");
    ___e85.setAttribute("data-action", "nav");
    ___e85.appendChild(document.createTextNode(String(t("nav.blog"))));
    ___e84.appendChild(___e85);
    ___e83.appendChild(___e84);
    const ___e86 = document.createElement("li");
    ___e86.className = cls("nav-item navbar-menu dropdown", dropdownOpen, "show");
    const ___e87 = document.createElement("button");
    ___e87.setAttribute("type", "button");
    ___e87.className = cls("nav-link dropdown-toggle", r.Kind === RouteProject, "active");
    ___e87.setAttribute("aria-haspopup", "true");
    ___e87.setAttribute("aria-controls", "projects-dropdown");
    ___e87.setAttribute("aria-expanded", String(String(dropdownOpen)));
    ___e87.setAttribute("data-action", "toggle-projects-dropdown");
    ___e87.appendChild(document.createTextNode(String(t("nav.projects"))));
    const ___e88 = document.createElement("span");
    ___e88.className = "dropdown-chevron dropdown-chevron-down";
    (Icon("chevron-down", "0.8em")).Mount(___e88, ___refs);
    ___e87.appendChild(___e88);
    const ___e89 = document.createElement("span");
    ___e89.className = "dropdown-chevron dropdown-chevron-up";
    (Icon("chevron-up", "0.8em")).Mount(___e89, ___refs);
    ___e87.appendChild(___e89);
    ___e86.appendChild(___e87);
    const ___e90 = document.createElement("ul");
    ___e90.className = "dropdown-menu";
    ___e90.setAttribute("id", "projects-dropdown");
    for (const p of projects) {
      const ___e91 = document.createElement("li");
      const ___e92 = document.createElement("a");
      ___e92.className = cls("dropdown-item", isActiveRoute(r, RouteProject, p.ID), "active");
      ___e92.setAttribute("href", String(p.Href));
      ___e92.setAttribute("data-action", "nav");
      ___e92.appendChild(document.createTextNode(String(p.Title)));
      ___e91.appendChild(___e92);
      ___e90.appendChild(___e91);
    }
    ___e86.appendChild(___e90);
    ___e83.appendChild(___e86);
    for (const page of pages) {
      if (page.ShowInNav) {
        const ___e93 = document.createElement("li");
        ___e93.className = "nav-item navbar-menu";
        const ___e94 = document.createElement("a");
        ___e94.className = cls("nav-link", isActiveRoute(r, RoutePage, page.ID), "active");
        ___e94.setAttribute("href", String(page.Href));
        ___e94.setAttribute("data-action", "nav");
        ___e94.appendChild(document.createTextNode(String(page.Title)));
        ___e93.appendChild(___e94);
        ___e83.appendChild(___e93);
      }
    }
    ___e82.appendChild(___e83);
    const ___e95 = document.createElement("ul");
    ___e95.className = "navbar-nav right";
    if (siteConfig.Search.Enabled) {
      const ___e96 = document.createElement("li");
      ___e96.className = "nav-item navbar-icon";
      const ___e97 = document.createElement("button");
      ___e97.setAttribute("type", "button");
      ___e97.className = "nav-link search-toggle";
      ___e97.setAttribute("id", "search-toggle");
      ___e97.setAttribute("aria-label", String(t("aria.search")));
      ___e97.setAttribute("title", String(t("search.buttonTitle") + " (" + t("search.shortcutHint") + ")"));
      ___e97.setAttribute("aria-keyshortcuts", "Control+K Meta+K /");
      ___e97.setAttribute("data-action", "open-search");
      (Icon("search", "1.35rem")).Mount(___e97, ___refs);
      ___e96.appendChild(___e97);
      ___e95.appendChild(___e96);
    }
    const ___e98 = document.createElement("li");
    ___e98.className = "nav-item navbar-icon";
    const ___e99 = document.createElement("button");
    ___e99.setAttribute("type", "button");
    ___e99.setAttribute("id", "theme-toggle");
    ___e99.className = "theme-toggle nav-link";
    ___e99.setAttribute("aria-label", String(t("aria.toggleTheme")));
    ___e99.setAttribute("title", String(t("theme.toggleTitle")));
    ___e99.setAttribute("data-action", "toggle-theme");
    (Icon("sun", "1.35rem")).Mount(___e99, ___refs);
    (Icon("moon", "1.35rem")).Mount(___e99, ___refs);
    ___e98.appendChild(___e99);
    ___e95.appendChild(___e98);
    if (siteConfig.EmailJS.Enabled) {
      const ___e100 = document.createElement("li");
      ___e100.className = "nav-item navbar-icon";
      const ___e101 = document.createElement("button");
      ___e101.setAttribute("type", "button");
      ___e101.className = "nav-link email-toggle";
      ___e101.setAttribute("id", "email-toggle");
      ___e101.setAttribute("aria-label", String(t("contact.title")));
      ___e101.setAttribute("title", String(t("contact.buttonTitle")));
      ___e101.setAttribute("data-action", "open-contact");
      (Icon("envelope", "1.35rem")).Mount(___e101, ___refs);
      ___e100.appendChild(___e101);
      ___e95.appendChild(___e100);
    }
    for (const s of siteConfig.Social) {
      const ___e102 = document.createElement("li");
      ___e102.className = "nav-item navbar-icon";
      const ___e103 = document.createElement("a");
      ___e103.className = "nav-link";
      ___e103.setAttribute("href", String(s.Href));
      ___e103.setAttribute("target", String(s.Target));
      ___e103.setAttribute("rel", String(s.Rel));
      (Icon(s.Icon, "1.35rem")).Mount(___e103, ___refs);
      ___e102.appendChild(___e103);
      ___e95.appendChild(___e102);
    }
    ___e82.appendChild(___e95);
    ___e78.appendChild(___e82);
    ___e77.appendChild(___e78);
    ___p.appendChild(___e77);
  }};
}

function PageView(v) {
  return {Mount(___p, ___refs) {
    if (v.Status === LoadFailed) {
      const ___e104 = document.createElement("div");
      ___e104.className = "error-message";
      const ___e105 = document.createElement("h1");
      ___e105.appendChild(document.createTextNode(String(t("general.notFound"))));
      ___e104.appendChild(___e105);
      const ___e106 = document.createElement("p");
      ___e106.appendChild(document.createTextNode(String(t("general.notFoundMessage"))));
      ___e104.appendChild(___e106);
      ___p.appendChild(___e104);
    } else {
      const ___e107 = document.createElement("div");
      ___e107.className = "page-view";
      const ___e108 = document.createElement("div");
      ___e108.className = "markdown-body";
      ___e108.insertAdjacentHTML("beforeend", v.HTML);
      ___e107.appendChild(___e108);
      ___p.appendChild(___e107);
    }
  }};
}

function ProjectReadme(v) {
  return {Mount(___p, ___refs) {
    if (v.Proj.GithubRepo !== "") {
      if (v.Status === LoadFailed) {
        const ___e109 = document.createElement("div");
        ___e109.setAttribute("id", "project-readme");
        const ___e110 = document.createElement("p");
        ___e110.appendChild(document.createTextNode(String(t("project.readmeError"))));
        ___e109.appendChild(___e110);
        ___p.appendChild(___e109);
      } else if (v.HTML !== "") {
        const ___e111 = document.createElement("div");
        ___e111.setAttribute("id", "project-readme");
        ___e111.className = "markdown-body";
        ___e111.insertAdjacentHTML("beforeend", v.HTML);
        ___p.appendChild(___e111);
      }
    }
  }};
}

function ProjectMedia(videos) {
  return {Mount(___p, ___refs) {
    if (__len(videos) > 0) {
      const ___e112 = document.createElement("div");
      ___e112.className = "markdown-body";
      const ___e113 = document.createElement("h2");
      ___e113.setAttribute("id", "project-media");
      ___e113.appendChild(document.createTextNode(String(t("project.media"))));
      ___e112.appendChild(___e113);
      for (const v of videos) {
        const ___e114 = document.createElement("div");
        ___e114.className = "youtube-video";
        const ___e115 = document.createElement("div");
        ___e115.className = "iframeWrapper";
        const ___e116 = document.createElement("iframe");
        ___e116.setAttribute("width", "560");
        ___e116.setAttribute("height", "349");
        ___e116.setAttribute("src", String("https://www.youtube.com/embed/" + v + "?rel=0&hd=1"));
        ___e116.setAttribute("title", "YouTube video player");
        ___e116.setAttribute("allowfullscreen", "");
        ___e115.appendChild(___e116);
        ___e114.appendChild(___e115);
        ___e112.appendChild(___e114);
      }
      ___p.appendChild(___e112);
    }
  }};
}

function ProjectDemo(p) {
  return {Mount(___p, ___refs) {
    if (p.DemoUrl !== "") {
      const ___e117 = document.createElement("div");
      ___e117.className = "markdown-body";
      const ___e118 = document.createElement("h2");
      ___e118.setAttribute("id", "project-demo");
      ___e118.appendChild(document.createTextNode(String(demoLabel(p))));
      ___e117.appendChild(___e118);
      if (p.DemoInstructions !== "") {
        const ___e119 = document.createElement("p");
        ___e119.appendChild(document.createTextNode(String(p.DemoInstructions)));
        ___e117.appendChild(___e119);
      }
      const ___e120 = document.createElement("div");
      ___e120.className = demoWrapperClass(p.DemoHeight);
      const ___e121 = document.createElement("iframe");
      ___e121.setAttribute("id", "demo");
      ___e121.setAttribute("src", String(p.DemoUrl));
      ___e121.setAttribute("title", String(p.Title + " demo"));
      ___e121.setAttribute("allowfullscreen", "");
      ___e120.appendChild(___e121);
      ___e117.appendChild(___e120);
      if (p.DemoFullscreen) {
        const ___e122 = document.createElement("br");
        ___e117.appendChild(___e122);
        const ___e123 = document.createElement("div");
        ___e123.className = "text-center";
        const ___e124 = document.createElement("button");
        ___e124.setAttribute("type", "button");
        ___e124.setAttribute("id", "fullscreen");
        ___e124.className = "download-btn";
        ___e124.setAttribute("data-action", "toggle-fullscreen");
        (Icon("expand", "1rem")).Mount(___e124, ___refs);
        const ___e125 = document.createElement("span");
        ___e125.appendChild(document.createTextNode(String(t("project.fullscreen"))));
        ___e124.appendChild(___e125);
        ___e123.appendChild(___e124);
        ___e117.appendChild(___e123);
      }
      ___p.appendChild(___e117);
    }
  }};
}

function ProjectLinks(links) {
  return {Mount(___p, ___refs) {
    if (__len(links) > 0) {
      const ___e126 = document.createElement("div");
      ___e126.className = "markdown-body";
      const ___e127 = document.createElement("h2");
      ___e127.setAttribute("id", "project-links");
      ___e127.appendChild(document.createTextNode(String(t("project.links"))));
      ___e126.appendChild(___e127);
      const ___e128 = document.createElement("div");
      ___e128.className = "download-buttons";
      for (const link of links) {
        const ___e129 = document.createElement("a");
        ___e129.setAttribute("href", String(link.Href));
        ___e129.setAttribute("target", "_blank");
        ___e129.setAttribute("rel", "noopener noreferrer");
        ___e129.className = "download-btn";
        (Icon(link.Icon, "1rem")).Mount(___e129, ___refs);
        const ___e130 = document.createElement("span");
        ___e130.appendChild(document.createTextNode(String(link.Title)));
        ___e129.appendChild(___e130);
        ___e128.appendChild(___e129);
      }
      ___e126.appendChild(___e128);
      ___p.appendChild(___e126);
    }
  }};
}

function ProjectDetail(v, commentsEnabled) {
  return {Mount(___p, ___refs) {
    if (v.Status === LoadNotFound) {
      const ___e131 = document.createElement("div");
      ___e131.className = "error-message";
      const ___e132 = document.createElement("h1");
      ___e132.appendChild(document.createTextNode(String(t("general.projectNotFound"))));
      ___e131.appendChild(___e132);
      const ___e133 = document.createElement("p");
      ___e133.appendChild(document.createTextNode(String(t("general.projectNotFoundMessage"))));
      ___e131.appendChild(___e133);
      ___p.appendChild(___e131);
    } else {
      const ___e134 = document.createElement("div");
      ___e134.className = "project-detail";
      const ___e135 = document.createElement("h1");
      ___e135.className = "project-title";
      ___e135.appendChild(document.createTextNode(String(v.Proj.Title)));
      ___e134.appendChild(___e135);
      const ___e136 = document.createElement("p");
      ___e136.className = "project-description";
      ___e136.appendChild(document.createTextNode(String(v.Proj.Description)));
      ___e134.appendChild(___e136);
      if (__len(v.Proj.Tags) > 0) {
        const ___e137 = document.createElement("div");
        ___e137.className = "project-tags";
        for (const tag of v.Proj.Tags) {
          const ___e138 = document.createElement("span");
          ___e138.className = "item-tag clickable-tag";
          ___e138.setAttribute("data-search-tag", String(tag));
          ___e138.appendChild(document.createTextNode(String(tag)));
          ___e137.appendChild(___e138);
        }
        ___e134.appendChild(___e137);
      }
      (TableOfContents(v.TOC)).Mount(___e134, ___refs);
      (ProjectReadme(v)).Mount(___e134, ___refs);
      (ProjectMedia(v.Proj.YoutubeVideos)).Mount(___e134, ___refs);
      (ProjectDemo(v.Proj)).Mount(___e134, ___refs);
      (ProjectLinks(v.Proj.Links)).Mount(___e134, ___refs);
      if (commentsEnabled) {
        const ___e139 = document.createElement("div");
        ___e139.className = "giscus-container";
        ___e134.appendChild(___e139);
      }
      ___p.appendChild(___e134);
    }
  }};
}

function isActiveRoute(r, kind, param) {
  return r.Kind === kind && r.Param === param;
}

function cls(base, on, extra) {
  if (!on) {
    return base;
  }
  if (base === "") {
    return extra;
  }
  return base + " " + extra;
}

function paginatedPosts(allPosts, page, perPage) {
  if (__len(allPosts) === 0) {
    return [];
  }
  let offset = page - 1;
  let start = offset * perPage;
  if (start < 0 || start >= __len(allPosts)) {
    start = 0;
  }
  let end = start + perPage;
  if (end > __len(allPosts)) {
    end = __len(allPosts);
  }
  return allPosts.slice(start, end);
}

function calcTotalPages(totalCount, perPage) {
  if (perPage <= 0) {
    perPage = 5;
  }
  let num = totalCount + perPage - 1;
  return Math.trunc(num / perPage);
}

function pageHref(page) {
  if (page <= 1) {
    return "/blog";
  }
  return "/blog/page/" + String(page);
}

function pageNumbers(n) {
  let nums = new Array(0).fill(0);
  for (let i = 1; i <= n; i++) {
    nums = __append(nums, i);
  }
  return nums;
}

function demoLabel(p) {
  if (p.DemoLabel !== "") {
    return p.DemoLabel;
  }
  return t("project.demo");
}

function demoWrapperClass(height) {
  if (height !== "") {
    return "demo-iframe-wrapper";
  }
  return "iframeWrapper";
}

function searchPlaceholderText() {
  if (site.Search.Placeholder !== "") {
    return site.Search.Placeholder;
  }
  {
    let res = t("search.placeholder");
    if (res !== "search.placeholder") {
      return res;
    }
  }
  return "Search...";
}

function highlightMatch(text, query) {
  if (query !== "") {
    {
      let idx = text.toLowerCase().indexOf(query.toLowerCase());
      if (idx !== -1) {
        let end = idx + __len(query);
        return text.slice(0, idx).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;") + "<mark>" + text.slice(idx, end).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;") + "</mark>" + text.slice(end).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
      }
    }
  }
  return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
}

function formStatusClass(statusType) {
  if (statusType !== "") {
    return "form-status " + statusType;
  }
  return "form-status";
}

function currentYear() {
  return {_d: new Date()}._d.getFullYear();
}

function scrollToHash(hash, smooth) {
  if (hash === "") {
    return;
  }
  let id = ((s, pre) => s.startsWith(pre) ? s.slice(pre.length) : s)(hash, "#");
  if (id === "") {
    return;
  }
  let scroll = function() {
    let targetEl = document.getElementById(id);
    if (targetEl != null) {
      let behavior = "instant";
      if (smooth) {
        behavior = "smooth";
      }
      targetEl.scrollIntoView({ "behavior": behavior });
      if (id === "main-content") {
        targetEl.setAttribute("tabindex", "-1");
        targetEl.focus({ "preventScroll": true });
      }
    }
  };
  scroll();
  if (!smooth) {
    setTimeout(scroll, 50);
  }
}

function navigate(url) {
  let curr = String(window.location.pathname);
  if (window.location.hash != null && window.location.hash !== "") {
    curr += String(window.location.hash);
  }
  if (url !== curr) {
    window.history.pushState({  }, "", url);
  }
  handleRoute();
}

function parseRoute(path) {
  if (__len(path) > 1) {
    path = ((s, suf) => !suf.length || !s.endsWith(suf) ? s : s.slice(0, -suf.length))(path, "/");
  }
  if (path === "" || path === "/" || path === "/blog") {
    return new RouteMatch(RouteBlog, "", 1);
  }
  {
    let [rest, ok] = (path).startsWith("/blog/page/") ? [(path).slice(("/blog/page/").length), true] : [path, false];
    if (ok) {
      let [n, err] = (Number.isNaN(Number(rest)) ? [0, "invalid syntax"] : [Number(rest) | 0, null]);
      if (err != null || n < 1) {
        n = 1;
      }
      return new RouteMatch(RouteBlog, "", n);
    }
  }
  {
    let [slug, ok] = (path).startsWith("/blog/") ? [(path).slice(("/blog/").length), true] : [path, false];
    if (ok) {
      slug = ((s, pre) => s.startsWith(pre) ? s.slice(pre.length) : s)(slug, "post/");
      if (slug === "") {
        return new RouteMatch(RouteNotFound);
      }
      return new RouteMatch(RoutePost, slug);
    }
  }
  {
    let [id, ok] = (path).startsWith("/project/") ? [(path).slice(("/project/").length), true] : [path, false];
    if (ok) {
      if (id === "") {
        return new RouteMatch(RouteNotFound);
      }
      return new RouteMatch(RouteProject, id);
    }
  }
  {
    let [id, ok] = (path).startsWith("/page/") ? [(path).slice(("/page/").length), true] : [path, false];
    if (ok) {
      if (id === "") {
        return new RouteMatch(RouteNotFound);
      }
      return new RouteMatch(RoutePage, id);
    }
  }
  return new RouteMatch(RouteNotFound);
}

function initInitialRoute() {
  let path = strVal(window.location.pathname);
  currentPath = path;
  route = parseRoute(path);
  switch (route.Kind) {
    case RoutePost:
    {
      const __t1 = resolvePost(route.Param, posts, contentCache);
      view = __t1[0];
      break;
    }
    case RouteProject:
    {
      const __t2 = resolveProject(route.Param, projects, contentCache);
      view = __t2[0];
      break;
    }
    case RoutePage:
    {
      const __t3 = resolvePage(route.Param, navPages, contentCache);
      view = __t3[0];
      break;
    }
    default:
    {
      view = newViewState();
      break;
    }
  }
}

function beginNavigation() {
  routeSeq++;
  let seq = routeSeq;
  return function() {
    return seq === routeSeq;
  };
}

async function handleRoute() {
  let isCurrent = beginNavigation();
  resetOverlays();
  let path = window.location.pathname;
  if (!isInitialRoute) {
    let mainEl = document.querySelector("#main-content");
    if (mainEl != null) {
      mainEl.classList.add("page-transition-out");
      await new Promise(r => setTimeout(r, 200 * 1000000 / 1000000));
    }
  }
  isInitialRoute = false;
  if (!isCurrent()) {
    return;
  }
  currentPath = path;
  route = parseRoute(path);
  view = newViewState();
  window.scrollTo({ "top": 0, "left": 0, "behavior": "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
  switch (route.Kind) {
    case RoutePost:
    {
      await showPost(route.Param);
      break;
    }
    case RouteProject:
    {
      await showProject(route.Param);
      break;
    }
    case RoutePage:
    {
      await showPage(route.Param);
      break;
    }
    case RouteNotFound:
    {
      showNotFound();
      break;
    }
    default:
    {
      showBlog(route.Page);
      break;
    }
  }
  if (!isCurrent()) {
    return;
  }
  let mainEl = document.querySelector("#main-content");
  if (mainEl != null) {
    mainEl.setAttribute("tabindex", "-1");
    mainEl.focus({ "preventScroll": true });
    setTimeout(function() {
      mainEl.removeAttribute("tabindex");
    }, 100);
  }
  let hash = String(window.location.hash);
  if (hash !== "") {
    scrollToHash(hash, false);
  }
}

function showBlog(page) {
  let title = site.Title;
  let canonical = "/blog";
  if (page > 1) {
    title = t("nav.blog") + " - " + site.Title;
    canonical = "/blog/page/" + String(page);
  }
  updateRouteMeta(title, site.Description, canonical);
  renderRoute();
}

function showNotFound() {
  updateRouteMeta(t("general.notFound") + " - " + site.Title, t("general.notFoundMessage"), currentPath);
  renderRoute();
}

async function loadRoute(key, url, transform) {
  let seq = routeSeq;
  let [mdText, err] = await loadMarkdownFile(url);
  if (err == null) {
    contentCache[key] = transform(mdText);
  }
  if (seq !== routeSeq) {
    return false;
  }
  if (err != null) {
    view.Status = LoadFailed;
    return true;
  }
  let c = (contentCache[key] ?? new cachedContent()).__clone();
  view.HTML = c.HTML;
  view.TOC = c.TOC;
  view.Status = LoadReady;
  return true;
}

function renderPost(mdText) {
  let content = stripFrontmatter(mdText);
  let toc = extractTOC(content);
  return new cachedContent(injectHeadingIDs(parseMarkdown(content), toc), toc);
}

function renderReadme(p) {
  return function(mdText) {
    return new cachedContent(injectHeadingIDs(parseMarkdown(mdText), extractTOC(mdText)), extractProjectTOC(mdText, p));
  };
}

function renderPage(mdText) {
  return new cachedContent(parseMarkdown(mdText), []);
}

async function showPost(slug) {
  let [v, needsFetch] = resolvePost(slug, posts, contentCache);
  view = v.__clone();
  if (view.Status === LoadNotFound) {
    updateRouteMeta(t("general.blogNotFound") + " - " + site.Title, t("general.blogNotFoundMessage"), "/blog/" + slug);
    renderRoute();
    return;
  }
  updateRouteMeta(view.Post.Title + " - " + site.Title, view.Post.Excerpt, view.Post.Href);
  if (needsFetch) {
    if (!await loadRoute(view.Post.Href, "/data/blog/" + view.Post.Filename, renderPost)) {
      return;
    }
  }
  renderRoute();
  if (view.Status !== LoadReady) {
    return;
  }
  highlightCode();
  loadGiscus();
}

async function showProject(id) {
  let [v, needsFetch] = resolveProject(id, projects, contentCache);
  view = v.__clone();
  if (view.Status === LoadNotFound) {
    updateRouteMeta(t("general.projectNotFound") + " - " + site.Title, t("general.projectNotFoundMessage"), "/project/" + id);
    renderRoute();
    return;
  }
  updateRouteMeta(view.Proj.Title + " - " + site.Title, view.Proj.Description, view.Proj.Href);
  if (needsFetch) {
    if (!await loadRoute(view.Proj.Href, readmeURL(view.Proj, site.GithubUsername), renderReadme(view.Proj))) {
      return;
    }
  }
  renderRoute();
  highlightCode();
  loadGiscus();
}

async function showPage(id) {
  let [v, needsFetch] = resolvePage(id, navPages, contentCache);
  view = v.__clone();
  updateRouteMeta(view.Page.Title + " - " + site.Title, site.Description, view.Page.Href);
  if (needsFetch) {
    if (!await loadRoute(view.Page.Href, "/data/pages/" + id + ".md", renderPage)) {
      return;
    }
  }
  renderRoute();
  highlightCode();
}

function initSearch() {
  let searchItems = null;
  for (let __i0 = 0, __arr0 = projects, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let p = __arr0[__i0];
    let item = { "id": p.ID, "title": p.Title, "description": p.Description, "tags": p.Tags, "type": "project", "url": p.Href };
    searchItems = __append(searchItems, item);
  }
  for (let __i0 = 0, __arr0 = posts, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let p = __arr0[__i0];
    let item = { "id": p.Slug, "title": p.Title, "description": p.Excerpt, "tags": p.Tags, "type": "blog", "url": p.Href };
    searchItems = __append(searchItems, item);
  }
  let options = { "keys": [{ "name": "title", "weight": 0.4 }, { "name": "description", "weight": 0.3 }, { "name": "tags", "weight": 0.2 }], "threshold": 0.4, "minMatchCharLength": searchMinChars() };
  fuseInstance = Reflect.construct(window.Fuse, [searchItems, options]);
}

function searchMinChars() {
  if (site.Search.MinChars > 0) {
    return site.Search.MinChars;
  }
  return 2;
}

function performSearch(q) {
  let trimmed = q.trim();
  if (__len(trimmed) < searchMinChars() || fuseInstance == null) {
    return [];
  }
  let results = fuseInstance.search(trimmed);
  let out = [];
  let maxResults = 8;
  if (__len(results) < maxResults) {
    maxResults = __len(results);
  }
  for (let i = 0; i < maxResults; i++) {
    let rawItem = results[i].item;
    let tags = [];
    if (rawItem.tags != null) {
      for (let __i0 = 0, __arr0 = rawItem.tags, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
        let t = __arr0[__i0];
        tags = __append(tags, String(t));
      }
    }
    out = __append(out, new SearchResultItem(String(rawItem.id), String(rawItem.title), String(rawItem.description), tags, String(rawItem.type), String(rawItem.url)));
  }
  return out;
}

function scrollSelectedSearchResultIntoView() {
  let el = document.querySelector(".search-result-item.selected");
  if (el != null) {
    el.scrollIntoView({ "block": "nearest", "behavior": "smooth" });
  }
}

function searchSelectNext() {
  if (__len(searchResults) === 0) {
    return;
  }
  searchSelectedIndex++;
  if (searchSelectedIndex >= __len(searchResults)) {
    searchSelectedIndex = 0;
  }
  renderSearchResults();
  scrollSelectedSearchResultIntoView();
}

function searchSelectPrev() {
  if (__len(searchResults) === 0) {
    return;
  }
  searchSelectedIndex--;
  if (searchSelectedIndex < 0) {
    searchSelectedIndex = __len(searchResults) - 1;
  }
  renderSearchResults();
  scrollSelectedSearchResultIntoView();
}

function searchHasSelection() {
  return searchSelectedIndex >= 0 && searchSelectedIndex < __len(searchResults);
}

function searchOpenSelected() {
  if (searchHasSelection()) {
    let url = searchResults[searchSelectedIndex].Url;
    closeSearch();
    navigate(url);
  }
}

function renderSearchResults() {
  let el = document.querySelector("#search-page-results");
  if (el != null) {
    ((sel,n,r)=>{const e=document.querySelector(sel);e.innerHTML="";n.Mount(e,r)})("#search-page-results",SearchResultsList(searchResults, searchQuery, searchSelectedIndex),undefined);
  }
}

function setSearchInput(v) {
  let inp = (appRefs["searchInput"] ?? null);
  if (inp == null && document != null) {
    inp = document.querySelector("#search-page-input");
  }
  if (inp != null) {
    inp.value = v;
  }
}

function setSearchQuery(q) {
  searchQuery = q;
  searchSelectedIndex = -1;
  searchResults = performSearch(q);
  setSearchInput(q);
  renderSearchResults();
}

function openSearch() {
  openSearchWithTag("");
}

function openSearchWithTag(tag) {
  closeMenus();
  searchOpen = true;
  setSearchQuery(tag);
  syncOverlays();
  focusLater("#search-page-input");
}

function clearSearch() {
  setSearchQuery("");
  syncOverlays();
  focusLater("#search-page-input");
}

function closeSearch() {
  if (!searchOpen) {
    return;
  }
  searchOpen = false;
  syncOverlays();
}

function handleSearchInput(value) {
  searchQuery = value;
  searchSelectedIndex = -1;
  syncOverlays();
  if (searchDebounceTimer != null) {
    clearTimeout(searchDebounceTimer);
  }
  searchDebounceTimer = setTimeout(function() {
    searchResults = performSearch(searchQuery);
    renderSearchResults();
  }, 150);
}

function SearchResultsList(results, query, selectedIndex) {
  return {Mount(___p, ___refs) {
    if (query !== "" && __len(results) === 0) {
      const ___e140 = document.createElement("div");
      ___e140.className = "search-no-results";
      (Icon("search", "3rem")).Mount(___e140, ___refs);
      const ___e141 = document.createElement("p");
      ___e141.appendChild(document.createTextNode(String(t("search.noResults"))));
      ___e140.appendChild(___e141);
      ___p.appendChild(___e140);
    } else {
      for (const [i, item] of __s(results).entries()) {
        const ___e142 = document.createElement("article");
        ___e142.className = cls("search-result-item blog-post-card", i === selectedIndex, "selected");
        ___e142.setAttribute("data-action", "open-post");
        ___e142.setAttribute("data-href", String(item.Url));
        const ___e143 = document.createElement("h2");
        ___e143.className = "blog-post-title";
        const ___e144 = document.createElement("a");
        ___e144.setAttribute("href", String(item.Url));
        ___e144.setAttribute("data-action", "nav");
        ___e144.insertAdjacentHTML("beforeend", highlightMatch(item.Title, query));
        ___e143.appendChild(___e144);
        ___e142.appendChild(___e143);
        const ___e145 = document.createElement("div");
        ___e145.className = "blog-post-meta";
        const ___e146 = document.createElement("span");
        ___e146.className = "blog-post-tags";
        if (item.ItemType === "project") {
          const ___e147 = document.createElement("span");
          ___e147.className = "item-tag";
          ___e147.appendChild(document.createTextNode(String(t("badges.project"))));
          ___e146.appendChild(___e147);
        } else {
          const ___e148 = document.createElement("span");
          ___e148.className = "item-tag";
          ___e148.appendChild(document.createTextNode(String(t("badges.blog"))));
          ___e146.appendChild(___e148);
        }
        for (const tag of item.Tags) {
          const ___e149 = document.createElement("span");
          ___e149.className = "item-tag";
          ___e149.appendChild(document.createTextNode(String(tag)));
          ___e146.appendChild(___e149);
        }
        ___e145.appendChild(___e146);
        ___e142.appendChild(___e145);
        const ___e150 = document.createElement("p");
        ___e150.className = "blog-post-excerpt";
        ___e150.insertAdjacentHTML("beforeend", highlightMatch(item.Description, query));
        ___e142.appendChild(___e150);
        ___p.appendChild(___e142);
      }
    }
  }};
}

function SearchModal(open, query, results, selectedIndex, placeholder) {
  return {Mount(___p, ___refs) {
    const ___e151 = document.createElement("div");
    ___e151.setAttribute("id", "search-page");
    ___e151.className = cls("", open, "show");
    ___e151.setAttribute("role", "dialog");
    ___e151.setAttribute("aria-modal", "true");
    ___e151.setAttribute("aria-label", String(t("aria.search")));
    const ___e152 = document.createElement("div");
    ___e152.className = "search-page-header";
    const ___e153 = document.createElement("div");
    ___e153.className = "search-page-header-content";
    const ___e154 = document.createElement("button");
    ___e154.setAttribute("type", "button");
    ___e154.className = "search-page-back";
    ___e154.setAttribute("id", "search-page-back");
    ___e154.setAttribute("aria-label", String(t("aria.goBack")));
    ___e154.setAttribute("data-action", "close-search");
    (Icon("arrow-left", "1.2rem")).Mount(___e154, ___refs);
    ___e153.appendChild(___e154);
    const ___e155 = document.createElement("div");
    ___e155.className = "search-page-input-wrapper";
    const ___e156 = document.createElement("input");
    if(___refs)___refs["searchInput"]=___e156;
    ___e156.setAttribute("type", "search");
    ___e156.setAttribute("id", "search-page-input");
    ___e156.className = "search-page-input";
    ___e156.setAttribute("placeholder", String(placeholder));
    ___e156.setAttribute("autocomplete", "off");
    ___e156.setAttribute("aria-label", String(t("aria.search")));
    ___e156.setAttribute("value", String(query));
    ___e155.appendChild(___e156);
    const ___e157 = document.createElement("button");
    ___e157.setAttribute("type", "button");
    ___e157.className = cls("search-page-clear", query !== "", "show");
    ___e157.setAttribute("id", "search-page-clear");
    ___e157.setAttribute("aria-label", String(t("aria.clearSearch")));
    ___e157.setAttribute("data-action", "clear-search");
    (Icon("times", "1.2rem")).Mount(___e157, ___refs);
    ___e155.appendChild(___e157);
    ___e153.appendChild(___e155);
    ___e152.appendChild(___e153);
    ___e151.appendChild(___e152);
    const ___e158 = document.createElement("div");
    ___e158.className = "search-page-content";
    const ___e159 = document.createElement("div");
    ___e159.className = "search-page-results";
    ___e159.setAttribute("id", "search-page-results");
    (SearchResultsList(results, query, selectedIndex)).Mount(___e159, ___refs);
    ___e158.appendChild(___e159);
    ___e151.appendChild(___e158);
    ___p.appendChild(___e151);
  }};
}

function t(key) {
  {
    let val = translations[key];
    let ok = (key) in translations;
    if (ok && val !== "") {
      return val;
    }
  }
  return key;
}

function headEl(tag, attr, name) {
  let el = document.querySelector(tag + "[" + attr + "=\"" + name + "\"]");
  if (el == null) {
    el = document.createElement(tag);
    el.setAttribute(attr, name);
    document.head.appendChild(el);
  }
  return el;
}

function updateMeta(attr, name, value) {
  if (value === "") {
    return;
  }
  headEl("meta", attr, name).setAttribute("content", value);
}

function updateTitleMeta(title) {
  if (title === "") {
    return;
  }
  document.title = title;
  updateMeta("property", "og:title", title);
  updateMeta("property", "twitter:title", title);
}

function updateDescriptionMeta(description) {
  updateMeta("name", "description", description);
  updateMeta("property", "og:description", description);
  updateMeta("property", "twitter:description", description);
}

function updateMetaTags() {
  updateTitleMeta(site.Title);
  updateDescriptionMeta(site.Description);
  updateMeta("name", "author", site.Author);
  let themeBg = site.DarkTheme.Background;
  if (currentTheme === "light" && site.LightTheme.Background !== "") {
    themeBg = site.LightTheme.Background;
  }
  updateMeta("name", "theme-color", themeBg);
}

function announceRoute(title) {
  let announcer = (appRefs["routeAnnouncer"] ?? null);
  if (announcer == null && document != null) {
    announcer = document.getElementById("route-announcer");
  }
  if (announcer != null) {
    let prefix = t("general.routeAnnounce");
    if (prefix === "general.routeAnnounce") {
      prefix = "Navigated to ";
    }
    announcer.textContent = prefix + title;
  }
}

function updateRouteMeta(title, description, canonicalPath) {
  updateTitleMeta(title);
  updateDescriptionMeta(description);
  announceRoute(title);
  if (canonicalPath === "") {
    return;
  }
  let fullURL = canonicalPath;
  if (canonicalPath.startsWith("/")) {
    let origin = strVal(window.location.origin);
    if (origin === "" || origin == "null") {
      origin = site.Url;
    }
    fullURL = origin + canonicalPath;
  }
  updateMeta("property", "og:url", fullURL);
  headEl("link", "rel", "canonical").setAttribute("href", fullURL);
}

function strVal(v) {
  if (v == null) {
    return "";
  }
  return String(v);
}

function boolVal(v) {
  if (v == null || String(v) === "false") {
    return false;
  }
  return Boolean(v);
}

function intVal(v) {
  if (v == null) {
    return 0;
  }
  return Math.trunc(Number(v));
}

function strSlice(raw) {
  let out = [];
  if (raw != null) {
    for (let __i0 = 0, __arr0 = raw, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
      let v = __arr0[__i0];
      out = __append(out, strVal(v));
    }
  }
  return out;
}

function postFromJSON(p) {
  let fn = strVal(p.filename);
  let slug = ((s, suf) => !suf.length || !s.endsWith(suf) ? s : s.slice(0, -suf.length))(fn, ".md");
  return new BlogPost(slug, strVal(p.title), strVal(p.date), strVal(p.excerpt), strSlice(p.tags), fn, "/blog/" + slug);
}

function sortPostsByDate(list) {
  list.sort(function(a, b) {
    if (a.Date === b.Date) {
      return 0;
    }
    if (a.Date < b.Date) {
      return 1;
    }
    return -1;
  });
}

function projectFromJSON(p) {
  let links = [];
  if (p.links != null) {
    for (let __i0 = 0, __arr0 = p.links, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
      let l = __arr0[__i0];
      links = __append(links, new ProjectLink(strVal(l.title), strVal(l.icon), strVal(l.href)));
    }
  }
  let id = strVal(p.id);
  return new Project(id, strVal(p.title), strVal(p.description), strSlice(p.tags), intVal(p.order), strVal(p.github_repo), strVal(p.github_branch), strVal(p.demo_url), strVal(p.demo_label), strVal(p.demo_instructions), strVal(p.demo_height), boolVal(p.demo_fullscreen), strSlice(p.youtube_videos), links, "/project/" + id);
}

function themeFromJSON(d, defaultCodeTheme) {
  let tc = new ThemeColors(strVal(d.primary), strVal(d.secondary), strVal(d.background), strVal(d.text), strVal(d.textLight), strVal(d.border), strVal(d.hover), defaultCodeTheme);
  if (d.code != null) {
    tc.CodeTheme = strVal(d.code.theme);
  }
  if (d.comments != null) {
    tc.CommentsTheme = strVal(d.comments.theme);
  }
  return tc;
}

function sortProjectsByOrder(list) {
  list.sort(function(a, b) {
    return a.Order - b.Order;
  });
}

function navPageHref(id) {
  return "/page/" + id;
}

function pageFromJSON(id, p) {
  return new NavPage(id, strVal(p.title), intVal(p.order), boolVal(p.showInNav), navPageHref(id));
}

function sortPagesByOrder(list) {
  list.sort(function(a, b) {
    return a.Order - b.Order;
  });
}

async function initData() {
  let data = null;
  let el = document.getElementById("site-data");
  if (el != null && el.textContent != null && el.textContent !== "") {
    data = JSON.parse(strVal(el.textContent));
  } else {
    let res = await fetch("/data/content.json");
    if (res == null || !res.ok) {
      return __error("failed to fetch /data/content.json");
    }
    data = await res.json();
  }
  if (data == null) {
    return __error("failed to parse /data/content.json");
  }
  let siteData = data.site;
  if (siteData != null) {
    site.Title = strVal(siteData.title);
    site.Url = ((s, suf) => !suf.length || !s.endsWith(suf) ? s : s.slice(0, -suf.length))(strVal(siteData.url), "/");
    site.Description = strVal(siteData.description);
    site.Author = strVal(siteData.author);
    site.GithubUsername = strVal(siteData.github_username);
    if (siteData.theme != null) {
      if (siteData.theme.dark != null) {
        site.DarkTheme = themeFromJSON(siteData.theme.dark, "prism-tomorrow");
      }
      if (siteData.theme.light != null) {
        site.LightTheme = themeFromJSON(siteData.theme.light, "prism-coy");
      }
    }
    if (siteData.search != null) {
      site.Search = new SearchConfig(boolVal(siteData.search.enabled), intVal(siteData.search.minChars), strVal(siteData.search.placeholder));
    }
    if (siteData.emailjs != null) {
      site.EmailJS = new EmailJSConfig(boolVal(siteData.emailjs.enabled), strVal(siteData.emailjs.serviceId), strVal(siteData.emailjs.templateId), strVal(siteData.emailjs.publicKey));
    }
    if (siteData.comments != null) {
      site.Comments = new CommentsConfig(boolVal(siteData.comments.blogEnabled), boolVal(siteData.comments.projectsEnabled), siteData.comments);
    }
    if (siteData.social != null) {
      for (let __i0 = 0, __arr0 = siteData.social, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
        let item = __arr0[__i0];
        site.Social = __append(site.Social, new SocialLink(strVal(item.icon), strVal(item.href), strVal(item.target), strVal(item.rel)));
      }
    }
  }
  if (data.translations != null && data.translations.en != null) {
    for (let [k, v] of Object.entries(data.translations.en)) {
      translations[k] = strVal(v);
    }
  }
  site.PostsPerPage = 5;
  if (data.blog != null) {
    if (data.blog.postsPerPage != null) {
      site.PostsPerPage = intVal(data.blog.postsPerPage);
    }
    if (data.blog.posts != null) {
      for (let __i0 = 0, __arr0 = data.blog.posts, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
        let p = __arr0[__i0];
        posts = __append(posts, postFromJSON(p));
      }
      sortPostsByDate(posts);
    }
  }
  if (data.projects != null) {
    for (let __i0 = 0, __arr0 = data.projects, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
      let p = __arr0[__i0];
      projects = __append(projects, projectFromJSON(p));
    }
    sortProjectsByOrder(projects);
  }
  if (data.pages != null) {
    for (let [id, p] of Object.entries(data.pages)) {
      navPages = __append(navPages, pageFromJSON(id, p));
    }
    sortPagesByOrder(navPages);
  }
  updateMetaTags();
  return null;
}

function getInitialTheme() {
  let saved = window.localStorage.getItem(themeStorageKey);
  if (saved != null && saved !== "") {
    return String(saved);
  }
  let current = document.documentElement.getAttribute("data-theme");
  if (current != null && current !== "") {
    return String(current);
  }
  return "dark";
}

function getThemeColors(name) {
  if (name === "light") {
    return site.LightTheme.__clone();
  }
  return site.DarkTheme.__clone();
}

function applyColorScheme(colors) {
  let root = document.documentElement;
  root.style.setProperty("--accent", colors.Primary);
  root.style.setProperty("--font-color", colors.Text);
  root.style.setProperty("--background-color", colors.Background);
  root.style.setProperty("--header-color", colors.Secondary);
  root.style.setProperty("--text-light", colors.TextLight);
  root.style.setProperty("--border-color", colors.Border);
  root.style.setProperty("--hover-color", colors.Hover);
}

function applyPrismTheme(themeName) {
  let id = "prism-theme";
  let link = document.getElementById(id);
  let href = "/css/prism-themes/" + themeName + ".min.css";
  if (link != null) {
    link.href = href;
  } else {
    let newLink = document.createElement("link");
    newLink.id = id;
    newLink.rel = "stylesheet";
    newLink.href = href;
    document.head.appendChild(newLink);
  }
}

function updateThemeColorMeta(theme) {
  let meta = document.querySelector("meta[name=\"theme-color\"]");
  if (meta != null) {
    let colors = getThemeColors(theme);
    if (colors.Background !== "") {
      meta.setAttribute("content", colors.Background);
    }
  }
}

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  let colors = getThemeColors(theme);
  applyColorScheme(colors);
  updateThemeColorMeta(theme);
  if (colors.CodeTheme !== "") {
    applyPrismTheme(colors.CodeTheme);
  }
  updateGiscusTheme();
  if (window.mermaid != null) {
    renderMermaid();
  }
}

function nextTheme(current) {
  if (current === "dark") {
    return "light";
  }
  return "dark";
}

function toggleTheme() {
  let next = nextTheme(currentTheme);
  window.localStorage.setItem(themeStorageKey, next);
  applyTheme(next);
}

function initTheme() {
  let initial = getInitialTheme();
  applyTheme(initial);
}

function renderMain() {
  ((sel,n,r)=>{const e=document.querySelector(sel);e.innerHTML="";n.Mount(e,r)})("#content-slot",MainContent(),undefined);
}

function renderNavbar() {
  ((sel,n,r)=>{const e=document.querySelector(sel);e.innerHTML="";n.Mount(e,r)})("#navbar-slot",Navbar(route, navPages, projects, projectsDropdownOpen, mobileMenuOpen, site),undefined);
}

function renderContactForm() {
  ((sel,n,r)=>{const e=document.querySelector(sel);e.innerHTML="";n.Mount(e,r)})("#contact-form",ContactFormFields(contactForm),undefined);
}

function renderRoute() {
  renderNavbar();
  renderMain();
}

function setClass(selector, cls, on) {
  let el = document.querySelector(selector);
  if (el != null) {
    el.classList.toggle(cls, on);
  }
}

function setAttr(selector, name, value) {
  let el = document.querySelector(selector);
  if (el != null) {
    el.setAttribute(name, value);
  }
}

function focusLater(selector) {
  setTimeout(function() {
    let el = document.querySelector(selector);
    if (el != null) {
      el.focus();
    }
  }, 50);
}

function syncOverlays() {
  setClass(".navbar-toggle", "active", mobileMenuOpen);
  setAttr(".navbar-toggle", "aria-expanded", String(mobileMenuOpen));
  setClass(".navbar-collapse", "show", mobileMenuOpen);
  setClass(".dropdown", "show", projectsDropdownOpen);
  setAttr(".dropdown-toggle", "aria-expanded", String(projectsDropdownOpen));
  setClass("#search-page", "show", searchOpen);
  setClass("#search-page-clear", "show", searchQuery !== "");
  setClass("#contact-modal", "show", contactOpen);
}

function resetOverlays() {
  mobileMenuOpen = false;
  projectsDropdownOpen = false;
  contactOpen = false;
  if (searchOpen || searchQuery !== "") {
    searchOpen = false;
    setSearchQuery("");
  }
  syncOverlays();
}

function newViewState() {
  return new ViewState(new BlogPost("", "", "", "", []), new Project("", "", "", [], 0, "", "", "", "", "", "", false, [], []), new NavPage(), "", LoadReady, false, new BlogPost("", "", "", "", []), false, new BlogPost("", "", "", "", []), []);
}

function fromCache(v, cache, key) {
  let c = cache[key];
  let ok = (key) in cache;
  if (!ok || c.HTML === "") {
    return false;
  }
  v.HTML = c.HTML;
  v.TOC = c.TOC;
  return true;
}

function resolvePost(slug, all, cache) {
  let v = newViewState();
  for (let __i0 = 0, __arr0 = all, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let i = __i0;
    let p = __arr0[__i0];
    if (p.Slug === slug) {
      v.Post = p.__clone();
      if (i + 1 < __len(all)) {
        v.HasPrev = true;
        v.PrevPost = all[i + 1].__clone();
      }
      if (i > 0) {
        v.HasNext = true;
        v.NextPost = all[i - 1].__clone();
      }
      if (fromCache(v, cache, p.Href)) {
        return [v.__clone(), false];
      }
      v.Status = LoadPending;
      return [v.__clone(), true];
    }
  }
  v.Status = LoadNotFound;
  return [v.__clone(), false];
}

function resolveProject(id, all, cache) {
  let v = newViewState();
  for (let __i0 = 0, __arr0 = all, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let p = __arr0[__i0];
    if (p.ID === id) {
      v.Proj = p.__clone();
      if (p.GithubRepo === "") {
        v.TOC = extractProjectTOC("", p);
        return [v.__clone(), false];
      }
      if (fromCache(v, cache, p.Href)) {
        return [v.__clone(), false];
      }
      v.Status = LoadPending;
      return [v.__clone(), true];
    }
  }
  v.Status = LoadNotFound;
  return [v.__clone(), false];
}

function resolvePage(id, all, cache) {
  let v = newViewState();
  v.Page = new NavPage(id, id, 0, false, navPageHref(id));
  for (let __i0 = 0, __arr0 = all, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let p = __arr0[__i0];
    if (p.ID === id) {
      v.Page = p.__clone();
      break;
    }
  }
  if (v.Page.Title === "") {
    v.Page.Title = id;
  }
  if (fromCache(v, cache, v.Page.Href)) {
    return [v.__clone(), false];
  }
  v.Status = LoadPending;
  return [v.__clone(), true];
}

function readmeURL(p, githubUsername) {
  let repo = p.GithubRepo;
  if (!repo.includes("/")) {
    repo = githubUsername + "/" + repo;
  }
  let branch = p.GithubBranch;
  if (branch === "") {
    branch = "main";
  }
  return "https://raw.githubusercontent.com/" + repo + "/" + branch + "/README.md";
}

main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudGVtcGwiLCIuLi9zcmMvYmxvZy50ZW1wbCIsIi4uL3NyYy9jb21tZW50cy5nbyIsIi4uL3NyYy9jb250YWN0LnRlbXBsIiwiLi4vc3JjL2VtYWlsLmdvIiwiLi4vc3JjL2Zvb3Rlci50ZW1wbCIsIi4uL3NyYy9pY29ucy5nbyIsIi4uL3NyYy9pY29ucy50ZW1wbCIsIi4uL3NyYy9sb2FkZXIuZ28iLCIuLi9zcmMvbWFpbi5nbyIsIi4uL3NyYy9tYXJrZG93bi5nbyIsIi4uL3NyYy9uYXZiYXIudGVtcGwiLCIuLi9zcmMvcGFnZS50ZW1wbCIsIi4uL3NyYy9wcm9qZWN0cy50ZW1wbCIsIi4uL3NyYy9yZW5kZXJfaGVscGVycy5nbyIsIi4uL3NyYy9yb3V0ZXIuZ28iLCIuLi9zcmMvc2VhcmNoLmdvIiwiLi4vc3JjL3NlYXJjaC50ZW1wbCIsIi4uL3NyYy9zdG9yZS5nbyIsIi4uL3NyYy90aGVtZS5nbyIsIi4uL3NyYy90eXBlcy5nbyIsIi4uL3NyYy91aS5nbyIsIi4uL3NyYy92aWV3LmdvIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBSXVCQTtBSUFBO0FDeUNBO0FMeENBO0FBdUdBO0FBQ0E7QUFDQTtBQUNBO0FLdUdBO0FBbEtBO0FBcUtBO0FBaktBO0FBQ0E7QUFDQTtBQUNBOztBQW9LQTtBQWxLQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBcUtBO0FBbktBO0FBcUtBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUF2S0E7QUFDQTtBQUNBOztBQTJLQTtBQUVBO0FBQ0E7QUE1S0E7QUFDQTtBQUNBO0FBOEtBOzs7QUFHQTtBQS9LQTtBQUNBOzs7OztBQUVBO0FBQ0E7Ozs7O0FBRUE7QUFDQTs7Ozs7QUFFQTtBQUNBOzs7OztBQUVBO0FBQ0E7Ozs7O0FBRUE7QUFDQTs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFJQTs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7O0FBSUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QVBqTUE7QUFDQTs7O0FBQ0E7OztBQUVBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUU1REE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7O0FBTUE7Ozs7QUFDQTtBQUtBOzs7Ozs7Ozs7QUFJQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBSUE7QUFDQTs7O0FBRUE7Ozs7O0FBRUE7Ozs7O0FBRUE7Ozs7OztBQUlBO0FBQ0E7OztBQUtBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBRUE7QUFDQTs7Ozs7QUFFQTtBQUNBOzs7OztBQUVBO0FBQ0E7Ozs7O0FBRUE7QUFDQTs7Ozs7QUFFQTs7O0FBRUE7QUFDQTs7O0FBR0E7Ozs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBT0E7QUFVQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBRTNHQTtBQUNBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FFckNBO0FBQ0E7Ozs7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFHQTtBQUlBO0FBQ0E7QUFDQTs7O0FDdEJBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUlBO0FBQ0E7QUFDQTs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUlBO0FBa0pBO0FBV0E7QUFRQTtBQStEQTtBQWtCQTs7O0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7O0FDeFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7Ozs7O0FBR0E7QUFDQTtBQUNBOzs7QUFDQTs7Ozs7Ozs7QUFJQTtBQUNBOzs7OztBQUdBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUNBO0FBQ0E7O0FBRUE7OztBQUVBOzs7QUFRQTs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7O0FBTUE7QUFDQTs7QUFNQTtBQUNBOztBQU1BOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBT0E7QUFDQTtBQUNBOztBQUlBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUlBO0FBQ0E7O0FBR0E7OztBQUdBOzs7O0FBQ0E7QUFDQTs7QUFFQTtBQUtBOzs7Ozs7Ozs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFHQTtBQUNBOzs7QUFHQTs7OztBQUNBO0FBTUE7QUFDQTtBQUNBOztBQUdBO0FBQ0E7Ozs7Ozs7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBOzs7O0FBQ0E7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOzs7QUFLQTtBQUNBOzs7QUFLQTs7OztBQUNBO0FBS0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUluVkE7QUFDQTs7O0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUtBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBS0E7QUFDQTtBQUNBOztBQUVBOzs7QUFDQTs7O0FBRUE7OztBQUlBO0FBQ0E7QUFDQTs7O0FBQ0E7QUFDQTs7OztBQUdBOzs7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUtBO0FBQ0E7OztBQzdHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBY0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBRUE7OztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBRUE7OztBQUNBO0FBQ0E7O0FBRUE7OztBQUVBOzs7QUFDQTtBQUNBOztBQUVBOzs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7Ozs7OztBQUVBOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7Ozs7OztBQVlBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBR0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7O0FBRUE7Ozs7O0FBRUE7Ozs7O0FBRUE7Ozs7O0FBRUE7Ozs7O0FBRUE7Ozs7QUFJQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBTUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7O0FBS0E7QUFDQTs7O0FBUUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FDN1JBO0FBQ0E7QUFHQTs7QUFDQTtBQVFBOztBQUlBOztBQUNBO0FBUUE7O0FBR0E7QUFXQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7OztBQUlBOztBQVVBOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FFdEtBO0FBQ0E7Ozs7QUFDQTs7O0FBRUE7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBSUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBTUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7OztBQUdBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7O0FBWUE7QUFDQTs7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7OztBQVFBO0FBQ0E7OztBQW9CQTtBQUNBO0FBVUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOzs7QUFNQTtBQUNBOzs7QUFJQTtBQUNBOzs7QUFTQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFHQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUlBO0FBQ0E7O0FBT0E7QUFDQTs7QUFRQTtBQUNBOztBQU9BO0FBQ0E7O0FBQ0E7Ozs7QUFXQTtBQUNBO0FBQ0E7OztBQUtBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBQ0E7O0FBRUE7OztBQUtBO0FBQ0E7O0FBQ0E7O0FBRUE7O0FBSUE7QUFDQTtBQUNBOztBQUVBOztBQUdBO0FBQ0E7OztBQ2xYQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FFakZBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUtBO0FBQ0E7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQ3ZFQTtBQUNBOzs7QUFXQTtBQUNBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7O0FBS0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyJwYWNrYWdlIG1haW5cblxudGVtcGwgTm90Rm91bmRWaWV3KCkge1xuXHQ8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPlxuXHRcdDxoMT57IHQoXCJnZW5lcmFsLm5vdEZvdW5kXCIpIH08L2gxPlxuXHRcdDxwPnsgdChcImdlbmVyYWwubm90Rm91bmRNZXNzYWdlXCIpIH08L3A+XG5cdFx0PGRpdiBjbGFzcz1cImRvd25sb2FkLWJ1dHRvbnNcIiBzdHlsZT1cIm1hcmdpbi10b3A6IDEuNXJlbTtcIj5cblx0XHRcdDxhIGhyZWY9XCIvXCIgY2xhc3M9XCJidG4gYnRuLXByaW1hcnlcIiBkYXRhLWFjdGlvbj1cIm5hdlwiPnsgdChcImdlbmVyYWwuYmFja1RvSG9tZVwiKSB9PC9hPlxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cbn1cblxudGVtcGwgUm91dGVWaWV3KHIgUm91dGVNYXRjaCkge1xuXHRzd2l0Y2ggci5LaW5kIHtcblx0Y2FzZSBSb3V0ZVBvc3Q6XG5cdFx0QEJsb2dQb3N0Vmlldyh2aWV3LCBzaXRlLkNvbW1lbnRzLkJsb2dFbmFibGVkKVxuXHRjYXNlIFJvdXRlUHJvamVjdDpcblx0XHRAUHJvamVjdERldGFpbCh2aWV3LCBzaXRlLkNvbW1lbnRzLlByb2plY3RzRW5hYmxlZClcblx0Y2FzZSBSb3V0ZVBhZ2U6XG5cdFx0QFBhZ2VWaWV3KHZpZXcpXG5cdGNhc2UgUm91dGVOb3RGb3VuZDpcblx0XHRATm90Rm91bmRWaWV3KClcblx0ZGVmYXVsdDpcblx0XHRAQmxvZ0xpc3QocG9zdHMsIHIuUGFnZSwgc2l0ZS5Qb3N0c1BlclBhZ2UpXG5cdH1cbn1cblxudGVtcGwgTWFpbkNvbnRlbnQoKSB7XG5cdDxtYWluIGlkPVwibWFpbi1jb250ZW50XCIgdGFiaW5kZXg9XCItMVwiPlxuXHRcdEBSb3V0ZVZpZXcocm91dGUpXG5cdDwvbWFpbj5cbn1cblxudGVtcGwgQXBwU2hlbGwoKSB7XG5cdDxkaXYgcmVmPVwiYXBwUm9vdFwiIGNsYXNzPVwiYXBwLXJvb3RcIj5cblx0XHQ8YSBocmVmPVwiI21haW4tY29udGVudFwiIGNsYXNzPVwic2tpcC1saW5rXCI+eyB0KFwibmF2LnNraXBUb0NvbnRlbnRcIikgfTwvYT5cblx0XHQ8ZGl2IHJlZj1cInJvdXRlQW5ub3VuY2VyXCIgaWQ9XCJyb3V0ZS1hbm5vdW5jZXJcIiBjbGFzcz1cInNyLW9ubHlcIiBhcmlhLWxpdmU9XCJwb2xpdGVcIiBhcmlhLWF0b21pYz1cInRydWVcIj48L2Rpdj5cblx0XHQ8ZGl2IGlkPVwibmF2YmFyLXNsb3RcIj5cblx0XHRcdEBOYXZiYXIocm91dGUsIG5hdlBhZ2VzLCBwcm9qZWN0cywgcHJvamVjdHNEcm9wZG93bk9wZW4sIG1vYmlsZU1lbnVPcGVuLCBzaXRlKVxuXHRcdDwvZGl2PlxuXHRcdDxkaXYgaWQ9XCJjb250ZW50LXNsb3RcIj5cblx0XHRcdEBNYWluQ29udGVudCgpXG5cdFx0PC9kaXY+XG5cdFx0QEZvb3RlcihjdXJyZW50WWVhcigpLCBzaXRlLkF1dGhvcilcblx0XHRAU2VhcmNoTW9kYWwoc2VhcmNoT3Blbiwgc2VhcmNoUXVlcnksIHNlYXJjaFJlc3VsdHMsIHNlYXJjaFNlbGVjdGVkSW5kZXgsIHNlYXJjaFBsYWNlaG9sZGVyVGV4dCgpKVxuXHRcdEBDb250YWN0TW9kYWwoY29udGFjdE9wZW4sIGNvbnRhY3RGb3JtKVxuXHQ8L2Rpdj5cbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJzdHJjb252XCJcblxudGVtcGwgQmxvZ1Bvc3RDYXJkKHBvc3QgQmxvZ1Bvc3QpIHtcbiAgICA8YXJ0aWNsZVxuICAgIGNsYXNzPVwiYmxvZy1wb3N0LWNhcmRcIlxuICAgIGRhdGEtYWN0aW9uPVwib3Blbi1wb3N0XCJcbiAgICBkYXRhLWhyZWY9eyBwb3N0LkhyZWYgfVxuICAgIHJvbGU9XCJhcnRpY2xlXCJcbiAgICBhcmlhLWxhYmVsPXsgcG9zdC5UaXRsZSB9XG4gICAgPlxuICAgIDxoMiBjbGFzcz1cImJsb2ctcG9zdC10aXRsZVwiPlxuICAgICAgICA8YSBocmVmPXsgcG9zdC5IcmVmIH0gZGF0YS1hY3Rpb249XCJuYXZcIj57IHBvc3QuVGl0bGUgfTwvYT5cbiAgICAgICAgPC9oMj5cbiAgICAgICAgPGRpdiBjbGFzcz1cImJsb2ctcG9zdC1tZXRhXCI+XG4gICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJsb2ctcG9zdC1kYXRlXCI+XG4gICAgICAgICAgICAgICAgQEljb24oXCJjYWxlbmRhclwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICB7IFwiIFwiICsgcG9zdC5EYXRlIH1cbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIGlmIGxlbihwb3N0LlRhZ3MpID4gMCB7XG4gICAgICAgICAgICAgICAgPHNwYW4gY2xhc3M9XCJibG9nLXBvc3QtdGFnc1wiPlxuICAgICAgICAgICAgICAgICAgICBmb3IgXywgdGFnIDo9IHJhbmdlIHBvc3QuVGFncyB7XG4gICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tdGFnIGNsaWNrYWJsZS10YWdcIiBkYXRhLXNlYXJjaC10YWc9eyB0YWcgfT57IHRhZyB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8cCBjbGFzcz1cImJsb2ctcG9zdC1leGNlcnB0XCI+eyBwb3N0LkV4Y2VycHQgfTwvcD5cbiAgICAgICAgICAgIDwvYXJ0aWNsZT5cbiAgICAgICAgfVxuXG4gICAgICAgIHRlbXBsIFBhZ2luYXRpb24oY3VycmVudFBhZ2UgaW50LCB0b3RhbFBhZ2VzIGludCkge1xuICAgICAgICAgICAgPG5hdiBjbGFzcz1cImJsb2ctcGFnaW5hdGlvblwiIGFyaWEtbGFiZWw9XCJCbG9nIHBhZ2luYXRpb25cIj5cbiAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJwYWdpbmF0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz17IGNscyhcInBhZ2UtaXRlbVwiLCBjdXJyZW50UGFnZSA8PSAxLCBcImRpc2FibGVkXCIpIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9eyBwYWdlSHJlZigxKSB9IGRhdGEtYWN0aW9uPVwibmF2XCIgYXJpYS1sYWJlbD1cIkZpcnN0XCIgdGl0bGU9XCJGaXJzdCBQYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQEljb24oXCJhbmdsZXMtbGVmdFwiLCBcIjAuODVlbVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9eyBjbHMoXCJwYWdlLWl0ZW1cIiwgY3VycmVudFBhZ2UgPD0gMSwgXCJkaXNhYmxlZFwiKSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPXsgcGFnZUhyZWYoY3VycmVudFBhZ2UgLSAxKSB9IGRhdGEtYWN0aW9uPVwibmF2XCIgYXJpYS1sYWJlbD1cIlByZXZpb3VzXCIgdGl0bGU9XCJQcmV2aW91cyBQYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgQEljb24oXCJjaGV2cm9uLWxlZnRcIiwgXCIwLjg1ZW1cIilcbiAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgZm9yIF8sIHBhZ2VOdW0gOj0gcmFuZ2UgcGFnZU51bWJlcnModG90YWxQYWdlcykge1xuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPXsgY2xzKFwicGFnZS1pdGVtXCIsIHBhZ2VOdW0gPT0gY3VycmVudFBhZ2UsIFwiYWN0aXZlXCIpIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPXsgcGFnZUhyZWYocGFnZU51bSkgfSBkYXRhLWFjdGlvbj1cIm5hdlwiPnsgcGFnZU51bSB9PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9eyBjbHMoXCJwYWdlLWl0ZW1cIiwgY3VycmVudFBhZ2UgPj0gdG90YWxQYWdlcywgXCJkaXNhYmxlZFwiKSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj17IHBhZ2VIcmVmKGN1cnJlbnRQYWdlICsgMSkgfSBkYXRhLWFjdGlvbj1cIm5hdlwiIGFyaWEtbGFiZWw9XCJOZXh0XCIgdGl0bGU9XCJOZXh0IFBhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQEljb24oXCJjaGV2cm9uLXJpZ2h0XCIsIFwiMC44NWVtXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz17IGNscyhcInBhZ2UtaXRlbVwiLCBjdXJyZW50UGFnZSA+PSB0b3RhbFBhZ2VzLCBcImRpc2FibGVkXCIpIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPXsgcGFnZUhyZWYodG90YWxQYWdlcykgfSBkYXRhLWFjdGlvbj1cIm5hdlwiIGFyaWEtbGFiZWw9XCJMYXN0XCIgdGl0bGU9XCJMYXN0IFBhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQEljb24oXCJhbmdsZXMtcmlnaHRcIiwgXCIwLjg1ZW1cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICB0ZW1wbCBCbG9nTGlzdChhbGxQb3N0cyBbXUJsb2dQb3N0LCBjdXJyZW50UGFnZSBpbnQsIHBlclBhZ2UgaW50KSB7XG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJsb2ctY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgICAgICAgIDxoMSBjbGFzcz1cInNyLW9ubHlcIj57IHQoXCJuYXYuYmxvZ1wiKSB9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGxlbihhbGxQb3N0cykgPT0gMCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJibG9nLWVtcHR5XCI+eyB0KFwiYmxvZy5ub1Bvc3RzXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJsb2ctcG9zdHNcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBfLCBwb3N0IDo9IHJhbmdlIHBhZ2luYXRlZFBvc3RzKGFsbFBvc3RzLCBjdXJyZW50UGFnZSwgcGVyUGFnZSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBCbG9nUG9zdENhcmQocG9zdClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGNhbGNUb3RhbFBhZ2VzKGxlbihhbGxQb3N0cyksIHBlclBhZ2UpID4gMSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAUGFnaW5hdGlvbihjdXJyZW50UGFnZSwgY2FsY1RvdGFsUGFnZXMobGVuKGFsbFBvc3RzKSwgcGVyUGFnZSkpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgIHRlbXBsIFRhYmxlT2ZDb250ZW50cyhpdGVtcyBbXVRPQ0l0ZW0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIGxlbihpdGVtcykgPj0gMiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRldGFpbHMgY2xhc3M9XCJibG9nLXRvY1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3VtbWFyeSBjbGFzcz1cImJsb2ctdG9jLXRpdGxlXCI+eyB0KFwiYmxvZy50YWJsZU9mQ29udGVudHNcIikgfTwvc3VtbWFyeT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuYXYgY2xhc3M9XCJibG9nLXRvYy1uYXZcIiBhcmlhLWxhYmVsPXsgdChcImJsb2cudGFibGVPZkNvbnRlbnRzXCIpIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHVsIGNsYXNzPVwiYmxvZy10b2MtbGlzdFwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBmb3IgXywgaXRlbSA6PSByYW5nZSBpdGVtcyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9eyBcImJsb2ctdG9jLWl0ZW0gYmxvZy10b2MtbGV2ZWwtXCIgKyBzdHJjb252Lkl0b2EoaXRlbS5MZXZlbCkgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXsgXCIjXCIgKyBpdGVtLklEIH0+eyBpdGVtLlRleHQgfTwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L3VsPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kZXRhaWxzPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGVtcGwgQmxvZ1Bvc3RWaWV3KHYgVmlld1N0YXRlLCBjb21tZW50c0VuYWJsZWQgYm9vbCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiB2LlN0YXR1cyA9PSBMb2FkTm90Rm91bmQgfHwgdi5TdGF0dXMgPT0gTG9hZEZhaWxlZCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxoMT57IHQoXCJnZW5lcmFsLmJsb2dOb3RGb3VuZFwiKSB9PC9oMT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHA+eyB0KFwiZ2VuZXJhbC5ibG9nTm90Rm91bmRNZXNzYWdlXCIpIH08L3A+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJibG9nLXBvc3Qtdmlld1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwicHJvamVjdC10aXRsZVwiPnsgdi5Qb3N0LlRpdGxlIH08L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxwIGNsYXNzPVwicHJvamVjdC1kZXNjcmlwdGlvblwiPnsgdi5Qb3N0LkRhdGUgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgbGVuKHYuUG9zdC5UYWdzKSA+IDAge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cInByb2plY3QtdGFnc1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBfLCB0YWcgOj0gcmFuZ2Ugdi5Qb3N0LlRhZ3Mge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cIml0ZW0tdGFnIGNsaWNrYWJsZS10YWdcIiBkYXRhLXNlYXJjaC10YWc9eyB0YWcgfT57IHRhZyB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAVGFibGVPZkNvbnRlbnRzKHYuVE9DKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJsb2ctcG9zdC1jb250ZW50XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cIm1hcmtkb3duLWJvZHlcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQHRlbXBsLlJhdyh2LkhUTUwpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHYuSGFzUHJldiB8fCB2Lkhhc05leHQge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxuYXYgY2xhc3M9XCJkb3dubG9hZC1idXR0b25zIGJsb2ctcG9zdC1uYXZcIiBhcmlhLWxhYmVsPVwiUG9zdCBuYXZpZ2F0aW9uXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHYuSGFzUHJldiB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXsgdi5QcmV2UG9zdC5IcmVmIH0gY2xhc3M9XCJkb3dubG9hZC1idG4gYmxvZy1uYXYtcHJldlwiIGRhdGEtYWN0aW9uPVwibmF2XCIgdGl0bGU9eyB2LlByZXZQb3N0LlRpdGxlIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQEljb24oXCJhcnJvdy1sZWZ0XCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnsgdChcImJsb2cucHJldmlvdXNQb3N0XCIpIH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgdi5IYXNOZXh0IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBocmVmPXsgdi5OZXh0UG9zdC5IcmVmIH0gY2xhc3M9XCJkb3dubG9hZC1idG4gYmxvZy1uYXYtbmV4dFwiIGRhdGEtYWN0aW9uPVwibmF2XCIgdGl0bGU9eyB2Lk5leHRQb3N0LlRpdGxlIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuPnsgdChcImJsb2cubmV4dFBvc3RcIikgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBJY29uKFwiYXJyb3ctcmlnaHRcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L25hdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBjb21tZW50c0VuYWJsZWQge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImdpc2N1cy1jb250YWluZXJcIj48L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImpzOi4vYnJvd3Nlci5kLnRzXCJcbmltcG9ydCBcInN0cmluZ3NcIlxuXG4vLyBnaXNjdXNUaGVtZSBpcyB0aGUgY29uZmlndXJlZCBjb21tZW50cyB0aGVtZSBmb3IgdGhlIGFjdGl2ZSBzaXRlIHRoZW1lLFxuLy8gZmFsbGluZyBiYWNrIHRvIHRoZSB0aGVtZSBuYW1lIGl0c2VsZiAoXCJkYXJrXCIvXCJsaWdodFwiKS5cbmZ1bmMgZ2lzY3VzVGhlbWUoKSBzdHJpbmcge1xuXHRpZiBjdCA6PSBnZXRUaGVtZUNvbG9ycyhjdXJyZW50VGhlbWUpLkNvbW1lbnRzVGhlbWU7IGN0ICE9IFwiXCIge1xuXHRcdHJldHVybiBjdFxuXHR9XG5cdHJldHVybiBjdXJyZW50VGhlbWVcbn1cblxuLy8ga2ViYWIgY29udmVydHMgYSBjYW1lbENhc2Uga2V5IHRvIGtlYmFiLWNhc2UgKHJlcG9JZCAtPiByZXBvLWlkKS5cbmZ1bmMga2ViYWIocyBzdHJpbmcpIHN0cmluZyB7XG5cdHZhciBiIHN0cmluZ3MuQnVpbGRlclxuXHRmb3IgaSA6PSAwOyBpIDwgbGVuKHMpOyBpKysge1xuXHRcdGMgOj0gc1tpXVxuXHRcdGlmIGMgPj0gJ0EnICYmIGMgPD0gJ1onIHtcblx0XHRcdGIuV3JpdGVCeXRlKCctJylcblx0XHRcdGIuV3JpdGVCeXRlKGMgKyAoJ2EnIC0gJ0EnKSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0Yi5Xcml0ZUJ5dGUoYylcblx0XHR9XG5cdH1cblx0cmV0dXJuIGIuU3RyaW5nKClcbn1cblxuLy8gZ2lzY3VzQXR0cnMgbWFwcyB0aGUgcmF3IGNvbW1lbnRzIGNvbmZpZyB0byBkYXRhLSogYXR0cmlidXRlczsgdGhlIHR3byBwYWdlXG4vLyB0b2dnbGVzIGFyZSBvdXJzLCBldmVyeXRoaW5nIGVsc2UgaXMgcGFzc2VkIHRocm91Z2ggdG8gZ2lzY3VzLlxuZnVuYyBnaXNjdXNBdHRycyhyYXcgYW55LCB0aGVtZSBzdHJpbmcpIG1hcFtzdHJpbmddc3RyaW5nIHtcblx0YXR0cnMgOj0gbWFwW3N0cmluZ11zdHJpbmd7XCJkYXRhLXRoZW1lXCI6IHRoZW1lfVxuXHRpZiByYXcgIT0gbmlsIHtcblx0XHRmb3IgaywgdiA6PSByYW5nZSByYXcuKG1hcFtzdHJpbmddYW55KSB7XG5cdFx0XHRpZiBrID09IFwiYmxvZ0VuYWJsZWRcIiB8fCBrID09IFwicHJvamVjdHNFbmFibGVkXCIge1xuXHRcdFx0XHRjb250aW51ZVxuXHRcdFx0fVxuXHRcdFx0YXR0cnNbXCJkYXRhLVwiK2tlYmFiKGspXSA9IHN0clZhbCh2KVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gYXR0cnNcbn1cblxuZnVuYyBsb2FkR2lzY3VzKCkge1xuXHRjb250YWluZXIgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5naXNjdXMtY29udGFpbmVyXCIpXG5cdGlmIGNvbnRhaW5lciA9PSBuaWwge1xuXHRcdHJldHVyblxuXHR9XG5cblx0Ly8gQ2xlYXIgYW55IGV4aXN0aW5nIGdpc2N1cyBjb250ZW50XG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiXG5cblx0c2NyaXB0IDo9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcblx0c2NyaXB0LnNyYyA9IFwiaHR0cHM6Ly9naXNjdXMuYXBwL2NsaWVudC5qc1wiXG5cdGZvciBuYW1lLCB2YWx1ZSA6PSByYW5nZSBnaXNjdXNBdHRycyhzaXRlLkNvbW1lbnRzLkF0dHJzLCBnaXNjdXNUaGVtZSgpKSB7XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSlcblx0fVxuXHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIiwgXCJhbm9ueW1vdXNcIilcblx0c2NyaXB0LmFzeW5jID0gdHJ1ZVxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoc2NyaXB0KVxufVxuXG5mdW5jIHVwZGF0ZUdpc2N1c1RoZW1lKCkge1xuXHRpZnJhbWUgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlmcmFtZS5naXNjdXMtZnJhbWVcIilcblx0aWYgaWZyYW1lID09IG5pbCB7XG5cdFx0cmV0dXJuXG5cdH1cblxuXHRpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtYXBbc3RyaW5nXWFueXtcblx0XHRcImdpc2N1c1wiOiBtYXBbc3RyaW5nXWFueXtcblx0XHRcdFwic2V0Q29uZmlnXCI6IG1hcFtzdHJpbmddYW55e1xuXHRcdFx0XHRcInRoZW1lXCI6IGdpc2N1c1RoZW1lKCksXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH0sIFwiaHR0cHM6Ly9naXNjdXMuYXBwXCIpXG59XG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwic3RyY29udlwiXG5cbnRlbXBsIENvbnRhY3RGb3JtRmllbGRzKGZvcm0gQ29udGFjdFN0YXRlKSB7XG5cdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG5cdFx0PGxhYmVsIGZvcj1cImNvbnRhY3QtbmFtZVwiPnsgdChcImNvbnRhY3QubmFtZVwiKSB9KjwvbGFiZWw+XG5cdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJjb250YWN0LW5hbWVcIiBuYW1lPVwibmFtZVwiIHJlcXVpcmVkIGNsYXNzPXsgY2xzKFwiXCIsIGZvcm0uRXJyTmFtZSwgXCJlcnJvclwiKSB9IGFyaWEtaW52YWxpZD17IHN0cmNvbnYuRm9ybWF0Qm9vbChmb3JtLkVyck5hbWUpIH0gdmFsdWU9eyBmb3JtLk5hbWUgfS8+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuXHRcdDxsYWJlbCBmb3I9XCJjb250YWN0LWVtYWlsXCI+eyB0KFwiY29udGFjdC5lbWFpbFwiKSB9KjwvbGFiZWw+XG5cdFx0PGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiY29udGFjdC1lbWFpbFwiIG5hbWU9XCJlbWFpbFwiIHJlcXVpcmVkIGNsYXNzPXsgY2xzKFwiXCIsIGZvcm0uRXJyRW1haWwsIFwiZXJyb3JcIikgfSBhcmlhLWludmFsaWQ9eyBzdHJjb252LkZvcm1hdEJvb2woZm9ybS5FcnJFbWFpbCkgfSB2YWx1ZT17IGZvcm0uRW1haWwgfS8+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuXHRcdDxsYWJlbCBmb3I9XCJjb250YWN0LW1lc3NhZ2VcIj57IHQoXCJjb250YWN0Lm1lc3NhZ2VcIikgfSo8L2xhYmVsPlxuXHRcdDx0ZXh0YXJlYSBpZD1cImNvbnRhY3QtbWVzc2FnZVwiIG5hbWU9XCJtZXNzYWdlXCIgcm93cz1cIjZcIiByZXF1aXJlZCBjbGFzcz17IGNscyhcIlwiLCBmb3JtLkVyck1lc3NhZ2UsIFwiZXJyb3JcIikgfSBhcmlhLWludmFsaWQ9eyBzdHJjb252LkZvcm1hdEJvb2woZm9ybS5FcnJNZXNzYWdlKSB9PnsgZm9ybS5NZXNzYWdlIH08L3RleHRhcmVhPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz17IGZvcm1TdGF0dXNDbGFzcyhmb3JtLlN0YXR1c1R5cGUpIH0gaWQ9XCJjb250YWN0LXN0YXR1c1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPlxuXHRcdDxzcGFuPnsgZm9ybS5TdGF0dXNUZXh0IH08L3NwYW4+XG5cdDwvZGl2PlxuXHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIGlkPVwiY29udGFjdC1zdWJtaXRcIiBkaXNhYmxlZD89eyBmb3JtLkJ1dHRvbkRpc2FibGVkIH0+XG5cdFx0eyB0KFwiY29udGFjdC5cIiArIGZvcm0uQnV0dG9uU3RhdGUpIH1cblx0PC9idXR0b24+XG59XG5cbnRlbXBsIENvbnRhY3RNb2RhbChvcGVuIGJvb2wsIGZvcm0gQ29udGFjdFN0YXRlKSB7XG5cdDxkaXYgaWQ9XCJjb250YWN0LW1vZGFsXCIgY2xhc3M9eyBjbHMoXCJcIiwgb3BlbiwgXCJzaG93XCIpIH0gcm9sZT1cImRpYWxvZ1wiIGFyaWEtbW9kYWw9XCJ0cnVlXCIgYXJpYS1sYWJlbGxlZGJ5PVwiY29udGFjdC1tb2RhbC10aXRsZVwiPlxuXHRcdDxkaXYgY2xhc3M9XCJjb250YWN0LW1vZGFsLWNvbnRlbnRcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJjb250YWN0LW1vZGFsLWhlYWRlclwiPlxuXHRcdFx0XHQ8aDIgaWQ9XCJjb250YWN0LW1vZGFsLXRpdGxlXCI+eyB0KFwiY29udGFjdC50aXRsZVwiKSB9PC9oMj5cblx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJjb250YWN0LW1vZGFsLWNsb3NlXCIgaWQ9XCJjb250YWN0LW1vZGFsLWNsb3NlXCIgYXJpYS1sYWJlbD17IHQoXCJjb250YWN0LmNsb3NlXCIpIH0gZGF0YS1hY3Rpb249XCJjbG9zZS1jb250YWN0XCI+XG5cdFx0XHRcdFx0QEljb24oXCJ0aW1lc1wiLCBcIjEuMnJlbVwiKVxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0PGZvcm0gY2xhc3M9XCJjb250YWN0LWZvcm1cIiBpZD1cImNvbnRhY3QtZm9ybVwiIG5vdmFsaWRhdGU+XG5cdFx0XHRcdEBDb250YWN0Rm9ybUZpZWxkcyhmb3JtKVxuXHRcdFx0PC9mb3JtPlxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJqczouL2Jyb3dzZXIuZC50c1wiXG5pbXBvcnQgXCJzdHJpbmdzXCJcblxuLy8gUGlubmVkICsgU1JJOiBrZWVwIHZlcnNpb24gYW5kIGhhc2ggaW4gc3luYyB3aXRoIEBlbWFpbGpzL2Jyb3dzZXIgaW4gcGFja2FnZS5qc29uXG5jb25zdCBlbWFpbEpTU3JjID0gXCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL0BlbWFpbGpzL2Jyb3dzZXJANC40LjEvZGlzdC9lbWFpbC5taW4uanNcIlxuY29uc3QgZW1haWxKU0ludGVncml0eSA9IFwic2hhMzg0LVNBTGMzNUVjY0FmNlJ6R3c0aU5zeWo3a1RQcjMzSzdSb0d6WXUrN2hlWmhUOHMwR1pvdWFmUmlDZzFxeTQ0QVNcIlxuXG5mdW5jIGxvYWRFbWFpbEpTKCkgYW55IHtcblx0cmV0dXJuIGxvYWRTY3JpcHQoZW1haWxKU1NyYywgZW1haWxKU0ludGVncml0eSlcbn1cblxuZnVuYyBpbml0RW1haWxKUygpIHtcblx0aWYgc2l0ZS5FbWFpbEpTLkVuYWJsZWQgJiYgc2l0ZS5FbWFpbEpTLlB1YmxpY0tleSAhPSBcIlwiICYmIHdpbmRvdy5lbWFpbGpzICE9IG5pbCB7XG5cdFx0ZW1haWxqcy5pbml0KHNpdGUuRW1haWxKUy5QdWJsaWNLZXkpXG5cdH1cbn1cblxuLy8gcHJlbG9hZEVtYWlsSlMgd2FybXMgdGhlIENETiBzY3JpcHQgd2hpbGUgdGhlIHVzZXIgdHlwZXM7IGZhaWx1cmVzIGFyZVxuLy8gc3dhbGxvd2VkIGhlcmUgYW5kIHN1cmZhY2VkIGJ5IHN1Ym1pdENvbnRhY3QgaW5zdGVhZC5cbmFzeW5jIGZ1bmMgcHJlbG9hZEVtYWlsSlMoKSB7XG5cdGRlZmVyIGZ1bmMoKSB7XG5cdFx0aWYgciA6PSByZWNvdmVyKCk7IHIgIT0gbmlsIHtcblx0XHRcdGNvbnNvbGUud2FybihcIkVtYWlsSlMgcHJlbG9hZCBmYWlsZWQ6XCIsIHIpXG5cdFx0fVxuXHR9KClcblx0YXdhaXQgbG9hZEVtYWlsSlMoKVxufVxuXG4vLyByZXNldENvbnRhY3RGb3JtIGNsZWFycyB0aGUgZm9ybSBiYWNrIHRvIGl0cyBpbml0aWFsIHN0YXRlIGFuZCByZS1yZW5kZXJzIGl0LlxuZnVuYyByZXNldENvbnRhY3RGb3JtKCkge1xuXHRjb250YWN0Rm9ybSA9IENvbnRhY3RTdGF0ZXtCdXR0b25TdGF0ZTogXCJzZW5kXCJ9XG5cdHJlbmRlckNvbnRhY3RGb3JtKClcbn1cblxuZnVuYyBvcGVuQ29udGFjdCgpIHtcblx0aWYgc2l0ZS5FbWFpbEpTLkVuYWJsZWQge1xuXHRcdHByZWxvYWRFbWFpbEpTKClcblx0fVxuXHRjbG9zZU1lbnVzKClcblx0Y29udGFjdE9wZW4gPSB0cnVlXG5cdHJlc2V0Q29udGFjdEZvcm0oKVxuXHRzeW5jT3ZlcmxheXMoKVxuXHRmb2N1c0xhdGVyKFwiI2NvbnRhY3QtbmFtZVwiKVxufVxuXG4vLyBjbG9zZUNvbnRhY3QgaGlkZXMgdGhlIG1vZGFsOyB0aGUgZXhpdCBmYWRlIGlzIENTUy1vbmx5ICgjY29udGFjdC1tb2RhbCB0cmFuc2l0aW9uKS5cbi8vIFRoZSBmb3JtIGlzIHJlc2V0IGJ5IG9wZW5Db250YWN0IHNvIGl0cyBjb250ZW50cyBzdXJ2aXZlIHRoZSBmYWRlLlxuZnVuYyBjbG9zZUNvbnRhY3QoKSB7XG5cdGlmICFjb250YWN0T3BlbiB7XG5cdFx0cmV0dXJuXG5cdH1cblx0Y29udGFjdE9wZW4gPSBmYWxzZVxuXHRzeW5jT3ZlcmxheXMoKVxufVxuXG4vLyB1cGRhdGVDb250YWN0RmllbGQgbWlycm9ycyBhIGZvcm0gZmllbGQgaW50byBzdGF0ZSBvbiBldmVyeSBpbnB1dCBldmVudC5cbmZ1bmMgdXBkYXRlQ29udGFjdEZpZWxkKGZpZWxkIHN0cmluZywgdmFsdWUgc3RyaW5nKSB7XG5cdHN3aXRjaCBmaWVsZCB7XG5cdGNhc2UgXCJuYW1lXCI6XG5cdFx0Y29udGFjdEZvcm0uTmFtZSA9IHZhbHVlXG5cdGNhc2UgXCJlbWFpbFwiOlxuXHRcdGNvbnRhY3RGb3JtLkVtYWlsID0gdmFsdWVcblx0Y2FzZSBcIm1lc3NhZ2VcIjpcblx0XHRjb250YWN0Rm9ybS5NZXNzYWdlID0gdmFsdWVcblx0fVxufVxuXG5mdW5jIGlzVmFsaWRFbWFpbChlbWFpbCBzdHJpbmcpIGJvb2wge1xuXHRyZXR1cm4gbGVuKGVtYWlsKSA+PSA1ICYmIHN0cmluZ3MuQ29udGFpbnMoZW1haWwsIFwiQFwiKSAmJiBzdHJpbmdzLkNvbnRhaW5zKGVtYWlsLCBcIi5cIikgJiYgIXN0cmluZ3MuQ29udGFpbnMoZW1haWwsIFwiIFwiKVxufVxuXG4vLyB2YWxpZGF0ZUNvbnRhY3QgdHJpbXMgdGhlIGZpZWxkcyBhbmQgc2V0cyBlcnJvciBmbGFncy9zdGF0dXMgdGV4dC5cbi8vIEl0IHJldHVybnMgdGhlIHVwZGF0ZWQgc3RhdGUgYW5kIHdoZXRoZXIgdGhlIGZvcm0gY2FuIGJlIHN1Ym1pdHRlZC5cbmZ1bmMgdmFsaWRhdGVDb250YWN0KGZvcm0gQ29udGFjdFN0YXRlKSAoQ29udGFjdFN0YXRlLCBib29sKSB7XG5cdGZvcm0uTmFtZSA9IHN0cmluZ3MuVHJpbVNwYWNlKGZvcm0uTmFtZSlcblx0Zm9ybS5FbWFpbCA9IHN0cmluZ3MuVHJpbVNwYWNlKGZvcm0uRW1haWwpXG5cdGZvcm0uTWVzc2FnZSA9IHN0cmluZ3MuVHJpbVNwYWNlKGZvcm0uTWVzc2FnZSlcblx0Zm9ybS5FcnJOYW1lID0gZmFsc2Vcblx0Zm9ybS5FcnJFbWFpbCA9IGZhbHNlXG5cdGZvcm0uRXJyTWVzc2FnZSA9IGZhbHNlXG5cdGZvcm0uU3RhdHVzVGV4dCA9IFwiXCJcblx0Zm9ybS5TdGF0dXNUeXBlID0gXCJcIlxuXG5cdHN3aXRjaCB7XG5cdGNhc2UgZm9ybS5OYW1lID09IFwiXCI6XG5cdFx0Zm9ybS5FcnJOYW1lID0gdHJ1ZVxuXHRcdGZvcm0uU3RhdHVzVGV4dCA9IHQoXCJjb250YWN0Lm5hbWVcIikgKyBcIjogXCIgKyB0KFwiY29udGFjdC5yZXF1aXJlZFwiKVxuXHRjYXNlIGZvcm0uRW1haWwgPT0gXCJcIjpcblx0XHRmb3JtLkVyckVtYWlsID0gdHJ1ZVxuXHRcdGZvcm0uU3RhdHVzVGV4dCA9IHQoXCJjb250YWN0LmVtYWlsXCIpICsgXCI6IFwiICsgdChcImNvbnRhY3QucmVxdWlyZWRcIilcblx0Y2FzZSAhaXNWYWxpZEVtYWlsKGZvcm0uRW1haWwpOlxuXHRcdGZvcm0uRXJyRW1haWwgPSB0cnVlXG5cdFx0Zm9ybS5TdGF0dXNUZXh0ID0gdChcImNvbnRhY3QuaW52YWxpZEVtYWlsXCIpXG5cdGNhc2UgZm9ybS5NZXNzYWdlID09IFwiXCI6XG5cdFx0Zm9ybS5FcnJNZXNzYWdlID0gdHJ1ZVxuXHRcdGZvcm0uU3RhdHVzVGV4dCA9IHQoXCJjb250YWN0Lm1lc3NhZ2VcIikgKyBcIjogXCIgKyB0KFwiY29udGFjdC5yZXF1aXJlZFwiKVxuXHRkZWZhdWx0OlxuXHRcdHJldHVybiBmb3JtLCB0cnVlXG5cdH1cblx0Zm9ybS5TdGF0dXNUeXBlID0gXCJlcnJvclwiXG5cdHJldHVybiBmb3JtLCBmYWxzZVxufVxuXG5hc3luYyBmdW5jIHN1Ym1pdENvbnRhY3QoKSB7XG5cdGZvcm0sIG9rIDo9IHZhbGlkYXRlQ29udGFjdChjb250YWN0Rm9ybSlcblx0Y29udGFjdEZvcm0gPSBmb3JtXG5cdGlmICFvayB7XG5cdFx0cmVuZGVyQ29udGFjdEZvcm0oKVxuXHRcdHJldHVyblxuXHR9XG5cblx0Y29udGFjdEZvcm0uQnV0dG9uU3RhdGUgPSBcInNlbmRpbmdcIlxuXHRjb250YWN0Rm9ybS5CdXR0b25EaXNhYmxlZCA9IHRydWVcblx0cmVuZGVyQ29udGFjdEZvcm0oKVxuXG5cdHBhcmFtcyA6PSBtYXBbc3RyaW5nXWFueXtcblx0XHRcInRpdGxlXCI6ICAgc2l0ZS5UaXRsZSxcblx0XHRcIm5hbWVcIjogICAgY29udGFjdEZvcm0uTmFtZSxcblx0XHRcImVtYWlsXCI6ICAgY29udGFjdEZvcm0uRW1haWwsXG5cdFx0XCJtZXNzYWdlXCI6IGNvbnRhY3RGb3JtLk1lc3NhZ2UsXG5cdH1cblxuXHRkZWZlciBmdW5jKCkge1xuXHRcdGlmIHIgOj0gcmVjb3ZlcigpOyByICE9IG5pbCB7XG5cdFx0XHRjb250YWN0Rm9ybS5CdXR0b25EaXNhYmxlZCA9IGZhbHNlXG5cdFx0XHRjb250YWN0Rm9ybS5CdXR0b25TdGF0ZSA9IFwic2VuZFwiXG5cdFx0XHRjb250YWN0Rm9ybS5TdGF0dXNUZXh0ID0gdChcImNvbnRhY3QuZXJyb3JcIilcblx0XHRcdGNvbnRhY3RGb3JtLlN0YXR1c1R5cGUgPSBcImVycm9yXCJcblx0XHRcdHJlbmRlckNvbnRhY3RGb3JtKClcblx0XHR9XG5cdH0oKVxuXG5cdGF3YWl0IGxvYWRFbWFpbEpTKClcblx0aW5pdEVtYWlsSlMoKVxuXG5cdGF3YWl0IGVtYWlsanMuc2VuZChzaXRlLkVtYWlsSlMuU2VydmljZUlkLCBzaXRlLkVtYWlsSlMuVGVtcGxhdGVJZCwgcGFyYW1zLCBzaXRlLkVtYWlsSlMuUHVibGljS2V5KVxuXG5cdGNvbnRhY3RGb3JtLlN0YXR1c1RleHQgPSB0KFwiY29udGFjdC5zdWNjZXNzXCIpXG5cdGNvbnRhY3RGb3JtLlN0YXR1c1R5cGUgPSBcInN1Y2Nlc3NcIlxuXHRjb250YWN0Rm9ybS5CdXR0b25TdGF0ZSA9IFwic2VuZFwiXG5cdHJlbmRlckNvbnRhY3RGb3JtKClcblxuXHRzZXRUaW1lb3V0KGZ1bmMoKSB7XG5cdFx0Y2xvc2VDb250YWN0KClcblx0fSwgMjAwMClcbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJzdHJjb252XCJcblxudGVtcGwgRm9vdGVyKHllYXIgaW50LCBhdXRob3Igc3RyaW5nKSB7XG5cdDxmb290ZXI+XG5cdFx0eyBcIsKpIFwiICsgc3RyY29udi5JdG9hKHllYXIpICsgXCIgXCIgKyBhdXRob3IgKyBcIi4gXCIgKyB0KFwiZm9vdGVyLnJpZ2h0c1wiKSArIFwiLlwiIH1cblx0PC9mb290ZXI+XG59XG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwiaHRtbFwiXG5cbi8vIOKUgOKUgCBTVkcgaWNvbiByZWdpc3RyeSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbi8vIEljb25zIGFyZSBlbWl0dGVkIGFzIHJhdyBtYXJrdXAgYmVjYXVzZSB0ZW1wbCBidWlsZHMgZWxlbWVudHMgd2l0aFxuLy8gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCwgd2hpY2ggY2Fubm90IGNyZWF0ZSBTVkctbmFtZXNwYWNlIG5vZGVzLlxuXG50eXBlIGljb25EZWYgc3RydWN0IHtcblx0Vmlld0JveCBzdHJpbmdcblx0UGF0aCAgICBzdHJpbmdcbn1cblxudmFyIGljb25zID0gbWFwW3N0cmluZ11pY29uRGVme1xuXHRcInN1blwiOiAgICAgICAgICAge1wiMCAwIDUxMiA1MTJcIiwgXCJNMzYxLjUgMS4yYzUgMi4xIDguNiA2LjYgOS42IDExLjlMMzkxIDEyMWwxMDcuOSAxOS44YzUuMyAxIDkuOCA0LjYgMTEuOSA5LjZzMS41IDEwLjctMS42IDE1LjJMNDQ2LjkgMjU2bDYyLjMgOTAuM2MzLjEgNC41IDMuNyAxMC4yIDEuNiAxNS4ycy02LjYgOC42LTExLjkgOS42TDM5MSAzOTEgMzcxLjEgNDk4LjljLTEgNS4zLTQuNiA5LjgtOS42IDExLjlzLTEwLjcgMS41LTE1LjItMS42TDI1NiA0NDYuOWwtOTAuMyA2Mi4zYy00LjUgMy4xLTEwLjIgMy43LTE1LjIgMS42cy04LjYtNi42LTkuNi0xMS45TDEyMSAzOTEgMTMuMSAzNzEuMWMtNS4zLTEtOS44LTQuNi0xMS45LTkuNnMtMS41LTEwLjcgMS42LTE1LjJMNjUuMSAyNTYgMi44IDE2NS43Yy0zLjEtNC41LTMuNy0xMC4yLTEuNi0xNS4yczYuNi04LjYgMTEuOS05LjZMMTIxIDEyMWwxOS44LTEwNy45YzEtNS4zIDQuNi05LjggOS42LTExLjlzMTAuNy0xLjUgMTUuMiAxLjZMMjU2IDY1LjEgMzQ2LjMgMi44YzQuNS0zLjEgMTAuMi0zLjcgMTUuMi0xLjZ6TTE2MCAyNTZhOTYgOTYgMCAxIDEgMTkyIDAgOTYgOTYgMCAxIDEgLTE5MiAwem0yMjQgMGExMjggMTI4IDAgMSAwIC0yNTYgMCAxMjggMTI4IDAgMSAwIDI1NiAwelwifSxcblx0XCJtb29uXCI6ICAgICAgICAgIHtcIjAgMCAzODQgNTEyXCIsIFwiTTIyMy41IDMyQzEwMCAzMiAwIDEzMi4zIDAgMjU2UzEwMCA0ODAgMjIzLjUgNDgwYzYwLjYgMCAxMTUuNS0yNC4yIDE1NS44LTYzLjRjNS00LjkgNi4zLTEyLjUgMy4xLTE4LjdzLTEwLjEtOS43LTE3LTguNWMtOS44IDEuNy0xOS44IDIuNi0zMC4xIDIuNmMtOTYuOSAwLTE3NS41LTc4LjgtMTc1LjUtMTc2YzAtNjUuOCAzNi0xMjMuMSA4OS4zLTE1My4zYzYuMS0zLjUgOS4yLTEwLjUgNy43LTE3LjNzLTcuMy0xMS45LTE0LjMtMTIuNWMtNi4zLS41LTEyLjYtLjgtMTktLjh6XCJ9LFxuXHRcInNlYXJjaFwiOiAgICAgICAge1wiMCAwIDUxMiA1MTJcIiwgXCJNNDE2IDIwOGMwIDQ1LjktMTQuOSA4OC4zLTQwIDEyMi43TDUwMi42IDQ1Ny40YzEyLjUgMTIuNSAxMi41IDMyLjggMCA0NS4zcy0zMi44IDEyLjUtNDUuMyAwTDMzMC43IDM3NmMtMzQuNCAyNS4yLTc2LjggNDAtMTIyLjcgNDBDOTMuMSA0MTYgMCAzMjIuOSAwIDIwOFM5My4xIDAgMjA4IDBTNDE2IDkzLjEgNDE2IDIwOHpNMjA4IDM1MmExNDQgMTQ0IDAgMSAwIDAtMjg4IDE0NCAxNDQgMCAxIDAgMCAyODh6XCJ9LFxuXHRcImVudmVsb3BlXCI6ICAgICAge1wiMCAwIDUxMiA1MTJcIiwgXCJNNDggNjRDMjEuNSA2NCAwIDg1LjUgMCAxMTJjMCAxNS4xIDcuMSAyOS4zIDE5LjIgMzguNEwyMzYuOCAzMTMuNmMxMS40IDguNSAyNyA4LjUgMzguNCAwTDQ5Mi44IDE1MC40YzEyLjEtOS4xIDE5LjItMjMuMyAxOS4yLTM4LjRjMC0yNi41LTIxLjUtNDgtNDgtNDhINDh6TTAgMTc2VjM4NGMwIDM1LjMgMjguNyA2NCA2NCA2NEg0NDhjMzUuMyAwIDY0LTI4LjcgNjQtNjRWMTc2TDI5NC40IDMzOS4yYy0yMi44IDE3LjEtNTQgMTcuMS03Ni44IDBMMCAxNzZ6XCJ9LFxuXHRcImRvd25sb2FkXCI6ICAgICAge1wiMCAwIDUxMiA1MTJcIiwgXCJNMjg4IDMyYzAtMTcuNy0xNC4zLTMyLTMyLTMycy0zMiAxNC4zLTMyIDMyVjI3NC43bC03My40LTczLjRjLTEyLjUtMTIuNS0zMi44LTEyLjUtNDUuMyAwcy0xMi41IDMyLjggMCA0NS4zbDEyOCAxMjhjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBsMTI4LTEyOGMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM3MtMzIuOC0xMi41LTQ1LjMgMEwyODggMjc0LjdWMzJ6TTY0IDM1MmMtMzUuMyAwLTY0IDI4LjctNjQgNjR2MzJjMCAzNS4zIDI4LjcgNjQgNjQgNjRINDQ4YzM1LjMgMCA2NC0yOC43IDY0LTY0VjQxNmMwLTM1LjMtMjguNy02NC02NC02NEg2NHptMjgwIDYwYTI0IDI0IDAgMSAxIDAgNDggMjQgMjQgMCAxIDEgMC00OHpcIn0sXG5cdFwiY3ViZVwiOiAgICAgICAgICB7XCIwIDAgNTEyIDUxMlwiLCBcIk0yMzQuNSA1LjdjMTMuOS01IDI5LjEtNSA0My4xIDBsMTkyIDY4LjZDNDk1IDgzLjQgNTEyIDEwNy41IDUxMiAxMzQuNlYzNzcuNGMwIDI3LTE3IDUxLjItNDIuNSA2MC4zbC0xOTIgNjguNmMtMTMuOSA1LTI5LjEgNS00My4xIDBsLTE5Mi02OC42QzE3IDQyOC42IDAgNDA0LjUgMCAzNzcuNFYxMzQuNmMwLTI3IDE3LTUxLjIgNDIuNS02MC4zbDE5Mi02OC42ek0yNTYgNjZMODIuMyAxMjggMjU2IDE5MGwxNzMuNy02MkwyNTYgNjZ6bTMyIDM2OC42bDE5Mi02OC42VjEzNS40TDI4OCAyMDR2MjMwLjZ6XCJ9LFxuXHRcImNhbGVuZGFyXCI6ICAgICAge1wiMCAwIDQ0OCA1MTJcIiwgXCJNMTUyIDI0YzAtMTMuMy0xMC43LTI0LTI0LTI0cy0yNCAxMC43LTI0IDI0VjY0SDY0QzI4LjcgNjQgMCA5Mi43IDAgMTI4djE2IDQ4VjQ0OGMwIDM1LjMgMjguNyA2NCA2NCA2NEgzODRjMzUuMyAwIDY0LTI4LjcgNjQtNjRWMTkyIDE0NCAxMjhjMC0zNS4zLTI4LjctNjQtNjQtNjRIMzQ0VjI0YzAtMTMuMy0xMC43LTI0LTI0LTI0cy0yNCAxMC43LTI0IDI0VjY0SDE1MlYyNHpNNDggMTkySDQwMFY0NDhjMCA4LjgtNy4yIDE2LTE2IDE2SDY0Yy04LjggMC0xNi03LjItMTYtMTZWMTkyelwifSxcblx0XCJnaXRodWJcIjogICAgICAgIHtcIjAgMCA0OTYgNTEyXCIsIFwiTTE2NS45IDM5Ny40YzAgMi0yLjMgMy42LTUuMiAzLjYtMy4zIC4zLTUuNi0xLjMtNS42LTMuNiAwLTIgMi4zLTMuNiA1LjItMy42IDMtLjMgNS42IDEuMyA1LjYgMy42em0tMzEuMS00LjVjLS43IDIgMS4zIDQuMyA0LjMgNC45IDIuNiAxIDUuNiAwIDYuMi0ycy0xLjMtNC4zLTQuMy01LjJjLTIuNi0uNy01LjUgLjMtNi4yIDIuM3ptNDQuMi0xLjdjLTIuOSAuNy00LjkgMi42LTQuNiA0LjkgLjMgMiAyLjkgMy4zIDUuOSAyLjYgMi45LS43IDQuOS0yLjYgNC42LTQuNi0uMy0xLjktMy0zLjItNS45LTIuOXpNMjQ0LjggOEMxMDYuMSA4IDAgMTEzLjMgMCAyNTJjMCAxMTAuOSA2OS44IDIwNS44IDE2OS41IDIzOS4yIDEyLjggMi4zIDE3LjMtNS42IDE3LjMtMTIuMSAwLTYuMi0uMy00MC40LS4zLTYxLjQgMCAwLTcwIDE1LTg0LjctMjkuOCAwIDAtMTEuNC0yOS4xLTI3LjgtMzYuNiAwIDAtMjIuOS0xNS43IDEuNi0xNS40IDAgMCAyNC45IDIgMzguNiAyNS44IDIxLjkgMzguNiA1OC42IDI3LjUgNzIuOSAyMSAyLjMtMTYuOCA4LjgtMjcuMSAxNi0zMy43LTU1LjktNi4yLTExMi4zLTE0LjMtMTEyLjMtMTEwLjUgMC0yNy41IDcuNi00MS4zIDIzLjYtNTguOS0yLjYtNi41LTExLjEtMzMuMyAyLjYtNjcuOSAyMC45LTYuNSA2OSAyNyA2OSAyNyAyMC01LjYgNDEuNS04LjUgNjIuOC04LjVzNDIuOCAyLjkgNjIuOCA4LjVjMCAwIDQ4LjEtMzMuNiA2OS0yNyAxMy43IDM0LjcgNS4yIDYxLjQgMi42IDY3LjkgMTYgMTcuNyAyNS44IDMxLjUgMjUuOCA1OC45IDAgOTYuNS01OC45IDEwNC4yLTExNC44IDExMC41IDkuMiA3LjkgMTcgMjIuOSAxNyA0Ni40IDAgMzMuNy0uMyA3NS40LS4zIDgzLjYgMCA2LjUgNC42IDE0LjQgMTcuMyAxMi4xQzQyOC4yIDQ1Ny44IDQ5NiAzNjIuOSA0OTYgMjUyIDQ5NiAxMTMuMyAzODMuNSA4IDI0NC44IDh6TTk3LjIgMzUyLjljLTEuMyAxLTEgMy4zIC43IDUuMiAxLjYgMS42IDMuOSAyLjMgNS4yIDEgMS4zLTEgMS0zLjMtLjctNS4yLTEuNi0xLjYtMy45LTIuMy01LjItMXptLTEwLjgtOC4xYy0uNyAxLjMgLjMgMi45IDIuMyAzLjkgMS42IDEgMy42IC43IDQuMy0uNyAuNy0xLjMtLjMtMi45LTIuMy0zLjktMi0uNi0zLjYtLjMtNC4zIC43em0zMi40IDM1LjZjLTEuNiAxLjMtMSA0LjMgMS4zIDYuMiAyLjMgMi4zIDUuMiAyLjYgNi41IDEgMS4zLTEuMyAuNy00LjMtMS4zLTYuMi0yLjItMi4zLTUuMi0yLjYtNi41LTF6bS0xMS40LTE0LjdjLTEuNiAxLTEuNiAzLjYgMCA1LjkgMS42IDIuMyA0LjMgMy4zIDUuNiAyLjMgMS42LTEuMyAxLjYtMy45IDAtNi4yLTEuNC0yLjMtNC0zLjMtNS42LTJ6XCJ9LFxuXHRcInlvdXR1YmVcIjogICAgICAge1wiMCAwIDU3NiA1MTJcIiwgXCJNNTQ5LjcgMTI0LjFjLTYuMy0yMy43LTI0LjgtNDIuMy00OC4zLTQ4LjZDNDU4LjggNjQgMjg4IDY0IDI4OCA2NFMxMTcuMiA2NCA3NC42IDc1LjVjLTIzLjUgNi4zLTQyIDI0LjktNDguMyA0OC42LTExLjQgNDIuOS0xMS40IDEzMi4zLTExLjQgMTMyLjNzMCA4OS40IDExLjQgMTMyLjNjNi4zIDIzLjcgMjQuOCA0MS41IDQ4LjMgNDcuOEMxMTcuMiA0NDggMjg4IDQ0OCAyODggNDQ4czE3MC44IDAgMjEzLjQtMTEuNWMyMy41LTYuMyA0Mi0yNC4yIDQ4LjMtNDcuOCAxMS40LTQyLjkgMTEuNC0xMzIuMyAxMS40LTEzMi4zczAtODkuNC0xMS40LTEzMi4zem0tMzE3LjUgMjEzLjVWMTc1LjJsMTQyLjcgODEuMi0xNDIuNyA4MS4yelwifSxcblx0XCJsaW5rZWRpblwiOiAgICAgIHtcIjAgMCA0NDggNTEyXCIsIFwiTTQxNiAzMkgzMS45QzE0LjMgMzIgMCA0Ni41IDAgNjQuM3YzODMuNEMwIDQ2NS41IDE0LjMgNDgwIDMxLjkgNDgwSDQxNmMxNy42IDAgMzItMTQuNSAzMi0zMi4zVjY0LjNjMC0xNy44LTE0LjQtMzIuMy0zMi0zMi4zek0xMzUuNCA0MTZINjlWMjAyLjJoNjYuNVY0MTZ6bS0zMy4yLTI0M2MtMjEuMyAwLTM4LjUtMTcuMy0zOC41LTM4LjVTODAuOSA5NiAxMDIuMiA5NmMyMS4yIDAgMzguNSAxNy4zIDM4LjUgMzguNSAwIDIxLjMtMTcuMiAzOC41LTM4LjUgMzguNXptMjgyLjEgMjQzaC02Ni40VjMxMmMwLTI0LjgtLjUtNTYuNy0zNC41LTU2LjctMzQuNiAwLTM5LjkgMjctMzkuOSA1NC45VjQxNmgtNjYuNFYyMDIuMmg2My43djI5LjJoLjljOC45LTE2LjggMzAuNi0zNC41IDYyLjktMzQuNSA2Ny4yIDAgNzkuNyA0NC4zIDc5LjcgMTAxLjlWNDE2elwifSxcblx0XCJjaGV2cm9uLWRvd25cIjogIHtcIjAgMCA1MTIgNTEyXCIsIFwiTTIzMy40IDQwNi42YzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwbDE5Mi0xOTJjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDBMMjU2IDMzOC43IDg2LjYgMTY5LjRjLTEyLjUtMTIuNS0zMi44LTEyLjUtNDUuMyAwcy0xMi41IDMyLjggMCA0NS4zbDE5MiAxOTJ6XCJ9LFxuXHRcImNoZXZyb24tdXBcIjogICAge1wiMCAwIDUxMiA1MTJcIiwgXCJNMjMzLjQgMTA1LjRjMTIuNS0xMi41IDMyLjgtMTIuNSA0NS4zIDBsMTkyIDE5MmMxMi41IDEyLjUgMTIuNSAzMi44IDAgNDUuM3MtMzIuOC0xMi41LTQ1LjMgMEwyNTYgMTczLjMgODYuNiAzNDIuNmMtMTIuNSAxMi41LTMyLjggMTIuNS00NS4zIDBzLTEyLjUtMzIuOCAwLTQ1LjNsMTkyLTE5MnpcIn0sXG5cdFwiY2hldnJvbi1sZWZ0XCI6ICB7XCIwIDAgMzIwIDUxMlwiLCBcIk05LjQgMjMzLjRjLTEyLjUgMTIuNS0xMi41IDMyLjggMCA0NS4zbDE5MiAxOTJjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBzMTIuNS0zMi44IDAtNDUuM0w3Ny4zIDI1NiAyNDYuNiA4Ni42YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zcy0zMi44LTEyLjUtNDUuMyAwbC0xOTIgMTkyelwifSxcblx0XCJjaGV2cm9uLXJpZ2h0XCI6IHtcIjAgMCAzMjAgNTEyXCIsIFwiTTMxMC42IDIzMy40YzEyLjUgMTIuNSAxMi41IDMyLjggMCA0NS4zbC0xOTIgMTkyYy0xMi41IDEyLjUtMzIuOCAxMi41LTQ1LjMgMHMtMTIuNS0zMi44IDAtNDUuM0wyNDIuNyAyNTYgNzMuNCA4Ni42Yy0xMi41LTEyLjUtMTIuNS0zMi44IDAtNDUuM3MzMi44LTEyLjUgNDUuMyAwbDE5MiAxOTJ6XCJ9LFxuXHRcImFuZ2xlcy1sZWZ0XCI6ICAge1wiMCAwIDUxMiA1MTJcIiwgXCJNNDEuNCAyMzMuNGMtMTIuNSAxMi41LTEyLjUgMzIuOCAwIDQ1LjNsMTYwIDE2MGMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMHMxMi41LTMyLjggMC00NS4zTDEwOS4zIDI1NiAyNDYuNiAxMTguNmMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM3MtMzIuOC0xMi41LTQ1LjMgMGwtMTYwIDE2MHptMzUyLTE2MGwtMTYwIDE2MGMtMTIuNSAxMi41LTEyLjUgMzIuOCAwIDQ1LjNsMTYwIDE2MGMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMHMxMi41LTMyLjggMC00NS4zTDMwMS4zIDI1NiA0MzguNiAxMTguNmMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM3MtMzIuOC0xMi41LTQ1LjMgMHpcIn0sXG5cdFwiYW5nbGVzLXJpZ2h0XCI6ICB7XCIwIDAgNTEyIDUxMlwiLCBcIk00NzAuNiAyNzguNmMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM2wtMTYwLTE2MGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBzLTEyLjUgMzIuOCAwIDQ1LjNMNDAyLjcgMjU2IDI2NS40IDM5My40Yy0xMi41IDEyLjUtMTIuNSAzMi44IDAgNDUuM3MzMi44IDEyLjUgNDUuMyAwbDE2MC0xNjB6bS0zNTIgMTYwbDE2MC0xNjBjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNsLTE2MC0xNjBjLTEyLjUtMTIuNS0zMi44LTEyLjUtNDUuMyAwcy0xMi41IDMyLjggMCA0NS4zTDIxMC43IDI1NiA3My40IDM5My40Yy0xMi41IDEyLjUtMTIuNSAzMi44IDAgNDUuM3MzMi44IDEyLjUgNDUuMyAwelwifSxcblx0XCJ0aW1lc1wiOiAgICAgICAgIHtcIjAgMCAzODQgNTEyXCIsIFwiTTMyNC41IDQxMS4xYzYuMiA2LjIgMTYuNCA2LjIgMjIuNiAwczYuMi0xNi40IDAtMjIuNkwyMTQuNiAyNTYgMzQ3LjEgMTIzLjVjNi4yLTYuMiA2LjItMTYuNCAwLTIyLjZzLTE2LjQtNi4yLTIyLjYgMEwxOTIgMjMzLjQgNTkuNSAxMDAuOWMtNi4yLTYuMi0xNi40LTYuMi0yMi42IDBzLTYuMiAxNi40IDAgMjIuNkwxNjkuNCAyNTYgMzYuOSAzODguNWMtNi4yIDYuMi02LjIgMTYuNCAwIDIyLjZzMTYuNCA2LjIgMjIuNiAwTDE5MiAyNzguNiAzMjQuNSA0MTEuMXpcIn0sXG5cdFwiYXJyb3ctbGVmdFwiOiAgICB7XCIwIDAgNDQ4IDUxMlwiLCBcIk05LjQgMjMzLjRjLTEyLjUgMTIuNS0xMi41IDMyLjggMCA0NS4zbDE2MCAxNjBjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBzMTIuNS0zMi44IDAtNDUuM0wxMDkuMiAyODggNDE2IDI4OGMxNy43IDAgMzItMTQuMyAzMi0zMnMtMTQuMy0zMi0zMi0zMmwtMzA2LjcgMEwyMTQuNiAxMTguNmMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM3MtMzIuOC0xMi41LTQ1LjMgMGwtMTYwIDE2MHpcIn0sXG5cdFwiYXJyb3ctcmlnaHRcIjogICB7XCIwIDAgNDQ4IDUxMlwiLCBcIk00MzguNiAyNzguNmMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM2wtMTYwLTE2MGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBzLTEyLjUgMzIuOCAwIDQ1LjNMMzM4LjggMjI0IDMyIDIyNGMtMTcuNyAwLTMyIDE0LjMtMzIgMzJzMTQuMyAzMiAzMiAzMmwzMDYuNyAwTDIzMy40IDM5My40Yy0xMi41IDEyLjUtMTIuNSAzMi44IDAgNDUuM3MzMi44IDEyLjUgNDUuMyAwbDE2MC0xNjB6XCJ9LFxuXHRcImV4cGFuZFwiOiAgICAgICAge1wiMCAwIDQ0OCA1MTJcIiwgXCJNMzIgMzJDMTQuMyAzMiAwIDQ2LjMgMCA2NHY5NmMwIDE3LjcgMTQuMyAzMiAzMiAzMnMzMi0xNC4zIDMyLTMyVjk2aDY0YzE3LjcgMCAzMi0xNC4zIDMyLTMycy0xNC4zLTMyLTMyLTMySDMyek02NCAzNTJjMC0xNy43LTE0LjMtMzItMzItMzJTMCAzMzQuMyAwIDM1MnY5NmMwIDE3LjcgMTQuMyAzMiAzMiAzMmg5NmMxNy43IDAgMzItMTQuMyAzMi0zMnMtMTQuMy0zMi0zMi0zMkg2NFYzNTJ6TTM1MiAzMmMtMTcuNyAwLTMyIDE0LjMtMzIgMzJzMTQuMyAzMiAzMiAzMmg2NHY2NGMwIDE3LjcgMTQuMyAzMiAzMiAzMnMzMi0xNC4zIDMyLTMyVjY0YzAtMTcuNy0xNC4zLTMyLTMyLTMySDM1MnpNMzIwIDM1MmMwLTE3LjcgMTQuMy0zMiAzMi0zMnMzMiAxNC4zIDMyIDMydjY0aDY0YzE3LjcgMCAzMiAxNC4zIDMyIDMycy0xNC4zIDMyLTMyIDMySDM4NGMtMTcuNyAwLTMyLTE0LjMtMzItMzJWMzUyelwifSxcbn1cblxuLy8gaWNvblN2ZyByZXR1cm5zIHRoZSBpbmxpbmUgU1ZHIG1hcmt1cCBmb3IgYSBrbm93biBpY29uIG5hbWUsIG9yIFwiXCIgb3RoZXJ3aXNlLlxuZnVuYyBpY29uU3ZnKG5hbWUgc3RyaW5nLCBzaXplIHN0cmluZykgc3RyaW5nIHtcblx0ZGVmLCBvayA6PSBpY29uc1tuYW1lXVxuXHRpZiAhb2sge1xuXHRcdHJldHVybiBcIlwiXG5cdH1cblx0cyA6PSBodG1sLkVzY2FwZVN0cmluZyhzaXplKVxuXHRyZXR1cm4gYDxzdmcgY2xhc3M9XCJpY29uIGljb24tYCArIG5hbWUgKyBgXCIgd2lkdGg9XCJgICsgcyArIGBcIiBoZWlnaHQ9XCJgICsgcyArIGBcIiB2aWV3Qm94PVwiYCArIGRlZi5WaWV3Qm94ICsgYFwiIGZpbGw9XCJjdXJyZW50Q29sb3JcIiBhcmlhLWhpZGRlbj1cInRydWVcIj48cGF0aCBkPVwiYCArIGRlZi5QYXRoICsgYFwiLz48L3N2Zz5gXG59XG4iLCJwYWNrYWdlIG1haW5cblxuLy8gSWNvbiByZW5kZXJzIGEgbmFtZWQgU1ZHIGljb24gZnJvbSB0aGUgcmVnaXN0cnkgaW4gaWNvbnMuZ28uXG4vLyBVbmtub3duIG5hbWVzIHJlbmRlciBub3RoaW5nLlxudGVtcGwgSWNvbihuYW1lIHN0cmluZywgc2l6ZSBzdHJpbmcpIHtcblx0QHRlbXBsLlJhdyhpY29uU3ZnKG5hbWUsIHNpemUpKVxufVxuIiwicGFja2FnZSBtYWluXG5cbnZhciBzY3JpcHRQcm9taXNlcyA9IG1hcFtzdHJpbmddYW55e31cblxuLy8gbG9hZFNjcmlwdCBhcHBlbmRzIGEgPHNjcmlwdD4gdGFnIG9uY2UgcGVyIHNyYyBhbmQgcmV0dXJucyBhIHByb21pc2UgdGhhdFxuLy8gc2V0dGxlcyBvbiBsb2FkL2Vycm9yOyBjb25jdXJyZW50IGNhbGxlcnMgc2hhcmUgdGhlIHNhbWUgaW4tZmxpZ2h0IHByb21pc2UuXG5mdW5jIGxvYWRTY3JpcHQoc3JjIHN0cmluZywgaW50ZWdyaXR5IHN0cmluZykgYW55IHtcblx0aWYgcCwgb2sgOj0gc2NyaXB0UHJvbWlzZXNbc3JjXTsgb2sge1xuXHRcdHJldHVybiBwXG5cdH1cblx0ZCA6PSBQcm9taXNlLndpdGhSZXNvbHZlcnMoKVxuXHRzIDo9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcblx0cy5zcmMgPSBzcmNcblx0aWYgaW50ZWdyaXR5ICE9IFwiXCIge1xuXHRcdHMuaW50ZWdyaXR5ID0gaW50ZWdyaXR5XG5cdFx0cy5jcm9zc09yaWdpbiA9IFwiYW5vbnltb3VzXCJcblx0fVxuXHRzLmFzeW5jID0gdHJ1ZVxuXHRzLm9ubG9hZCA9IGZ1bmMoXyBhbnkpIHtcblx0XHRkLnJlc29sdmUobmlsKVxuXHR9XG5cdHMub25lcnJvciA9IGZ1bmMoZSBhbnkpIHtcblx0XHRkZWxldGUoc2NyaXB0UHJvbWlzZXMsIHNyYylcblx0XHRkLnJlamVjdChlKVxuXHR9XG5cdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQocylcblx0c2NyaXB0UHJvbWlzZXNbc3JjXSA9IGQucHJvbWlzZVxuXHRyZXR1cm4gZC5wcm9taXNlXG59XG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwianM6Li9icm93c2VyLmQudHNcIlxuaW1wb3J0IFwic3RyaW5nc1wiXG5cbmZ1bmMgdG9nZ2xlUHJvamVjdHNEcm9wZG93bigpIHtcblx0cHJvamVjdHNEcm9wZG93bk9wZW4gPSAhcHJvamVjdHNEcm9wZG93bk9wZW5cblx0c3luY092ZXJsYXlzKClcbn1cblxuZnVuYyBjbG9zZVByb2plY3RzRHJvcGRvd24oKSB7XG5cdGlmICFwcm9qZWN0c0Ryb3Bkb3duT3BlbiB7XG5cdFx0cmV0dXJuXG5cdH1cblx0cHJvamVjdHNEcm9wZG93bk9wZW4gPSBmYWxzZVxuXHRzeW5jT3ZlcmxheXMoKVxufVxuXG5mdW5jIHRvZ2dsZU1vYmlsZU1lbnUoKSB7XG5cdG1vYmlsZU1lbnVPcGVuID0gIW1vYmlsZU1lbnVPcGVuXG5cdHN5bmNPdmVybGF5cygpXG59XG5cbmZ1bmMgY2xvc2VNb2JpbGVNZW51KCkge1xuXHRpZiAhbW9iaWxlTWVudU9wZW4ge1xuXHRcdHJldHVyblxuXHR9XG5cdG1vYmlsZU1lbnVPcGVuID0gZmFsc2Vcblx0c3luY092ZXJsYXlzKClcbn1cblxuLy8gY2xvc2VNZW51cyBjb2xsYXBzZXMgdGhlIG5hdiBtZW51cyBiZWZvcmUgYW5vdGhlciBvdmVybGF5IHRha2VzIGZvY3VzLlxuZnVuYyBjbG9zZU1lbnVzKCkge1xuXHRjbG9zZU1vYmlsZU1lbnUoKVxuXHRjbG9zZVByb2plY3RzRHJvcGRvd24oKVxufVxuXG4vLyBuYXZpZ2F0ZUhhc2ggc2Nyb2xscyB0byBhbiBpbi1wYWdlIGFuY2hvciAoXCIjaWRcIiBvciBcIlwiIGZvciB0b3ApIGFuZFxuLy8gcmVjb3JkcyBpdCBpbiBoaXN0b3J5IHdpdGhvdXQgdHJpZ2dlcmluZyBhIHJvdXRlIGNoYW5nZS5cbmZ1bmMgbmF2aWdhdGVIYXNoKGhhc2ggc3RyaW5nKSB7XG5cdGlmIHN0cmluZ3MuVHJpbVByZWZpeChoYXNoLCBcIiNcIikgIT0gXCJcIiB7XG5cdFx0c2Nyb2xsVG9IYXNoKGhhc2gsIHRydWUpXG5cdFx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG1hcFtzdHJpbmddYW55e30sIFwiXCIsIGhhc2gpXG5cdFx0cmV0dXJuXG5cdH1cblx0d2luZG93LnNjcm9sbFRvKG1hcFtzdHJpbmddYW55e1widG9wXCI6IDAsIFwibGVmdFwiOiAwLCBcImJlaGF2aW9yXCI6IFwic21vb3RoXCJ9KVxuXHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobWFwW3N0cmluZ11hbnl7fSwgXCJcIiwgd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKVxufVxuXG5mdW5jIHNldHVwRXZlbnRzKCkge1xuXHRhcHAgOj0gYXBwUmVmc1tcImFwcFJvb3RcIl1cblx0aWYgYXBwID09IG5pbCAmJiBkb2N1bWVudCAhPSBuaWwge1xuXHRcdGFwcCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjYXBwXCIpXG5cdH1cblx0aWYgYXBwID09IG5pbCB7XG5cdFx0cmV0dXJuXG5cdH1cblxuXHQvLyBDbGljayBkZWxlZ2F0aW9uIG9uICNhcHBcblx0YXBwLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jKGUgYW55KSB7XG5cdFx0dGFyZ2V0IDo9IGUudGFyZ2V0XG5cblx0XHQvLyBUYWcgY2xpY2tcblx0XHR0YWdFbCA6PSB0YXJnZXQuY2xvc2VzdChcIltkYXRhLXNlYXJjaC10YWddXCIpXG5cdFx0aWYgdGFnRWwgIT0gbmlsIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdFx0dGFnIDo9IHRhZ0VsLmdldEF0dHJpYnV0ZShcImRhdGEtc2VhcmNoLXRhZ1wiKVxuXHRcdFx0aWYgdGFnICE9IG5pbCAmJiB0YWcgIT0gXCJcIiB7XG5cdFx0XHRcdG9wZW5TZWFyY2hXaXRoVGFnKHN0cmluZyh0YWcpKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0Ly8gQWN0aW9uIGRlbGVnYXRpb25cblx0XHRidG4gOj0gdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1hY3Rpb25dXCIpXG5cdFx0aWYgYnRuICE9IG5pbCB7XG5cdFx0XHRhY3Rpb24gOj0gc3RyaW5nKGJ0bi5nZXRBdHRyaWJ1dGUoXCJkYXRhLWFjdGlvblwiKSlcblx0XHRcdHN3aXRjaCBhY3Rpb24ge1xuXHRcdFx0Y2FzZSBcIm5hdlwiOlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0aWYgYnRuLmNsb3Nlc3QoXCIuZGlzYWJsZWRcIikgIT0gbmlsIHtcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0fVxuXHRcdFx0XHRocmVmIDo9IGJ0bi5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpXG5cdFx0XHRcdGlmIGhyZWYgIT0gbmlsICYmIGhyZWYgIT0gXCJcIiB7XG5cdFx0XHRcdFx0aHJlZlN0ciA6PSBzdHJpbmcoaHJlZilcblx0XHRcdFx0XHRpZiBzdHJpbmdzLkhhc1ByZWZpeChocmVmU3RyLCBcIiNcIikge1xuXHRcdFx0XHRcdFx0bmF2aWdhdGVIYXNoKGhyZWZTdHIpXG5cdFx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0bmF2aWdhdGUoaHJlZlN0cilcblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSBcInRvZ2dsZS1tb2JpbGUtbmF2XCI6XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XHRcdHRvZ2dsZU1vYmlsZU1lbnUoKVxuXHRcdFx0Y2FzZSBcInRvZ2dsZS1wcm9qZWN0cy1kcm9wZG93blwiOlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdFx0XHR0b2dnbGVQcm9qZWN0c0Ryb3Bkb3duKClcblx0XHRcdGNhc2UgXCJ0b2dnbGUtdGhlbWVcIjpcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdHRvZ2dsZVRoZW1lKClcblx0XHRcdGNhc2UgXCJvcGVuLXNlYXJjaFwiOlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0b3BlblNlYXJjaCgpXG5cdFx0XHRjYXNlIFwiY2xvc2Utc2VhcmNoXCI6XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRjbG9zZVNlYXJjaCgpXG5cdFx0XHRjYXNlIFwiY2xlYXItc2VhcmNoXCI6XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRjbGVhclNlYXJjaCgpXG5cdFx0XHRjYXNlIFwib3Blbi1jb250YWN0XCI6XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRvcGVuQ29udGFjdCgpXG5cdFx0XHRjYXNlIFwiY2xvc2UtY29udGFjdFwiOlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0Y2xvc2VDb250YWN0KClcblx0XHRcdGNhc2UgXCJ0b2dnbGUtZnVsbHNjcmVlblwiOlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0aWZyYW1lIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjZGVtb1wiKVxuXHRcdFx0XHRpZiBpZnJhbWUgIT0gbmlsIHtcblx0XHRcdFx0XHRpZiBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCA9PSBuaWwge1xuXHRcdFx0XHRcdFx0aWZyYW1lLnJlcXVlc3RGdWxsc2NyZWVuKClcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0ZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSBcImNvcHktY29kZVwiOlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0Y29weUJ0biA6PSB0YXJnZXQuY2xvc2VzdChcIi5jb3B5LWNvZGUtYnV0dG9uXCIpXG5cdFx0XHRcdGlmIGNvcHlCdG4gIT0gbmlsIHtcblx0XHRcdFx0XHRwcmUgOj0gY29weUJ0bi5jbG9zZXN0KFwicHJlXCIpXG5cdFx0XHRcdFx0aWYgcHJlICE9IG5pbCB7XG5cdFx0XHRcdFx0XHRjb2RlRWwgOj0gcHJlLnF1ZXJ5U2VsZWN0b3IoXCJjb2RlXCIpXG5cdFx0XHRcdFx0XHRpZiBjb2RlRWwgIT0gbmlsIHtcblx0XHRcdFx0XHRcdFx0dGV4dCA6PSBjb2RlRWwudGV4dENvbnRlbnRcblx0XHRcdFx0XHRcdFx0bmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQodGV4dClcblx0XHRcdFx0XHRcdFx0Y29weUJ0bi50ZXh0Q29udGVudCA9IHQoXCJjb2RlLmNvcGllZFwiKVxuXHRcdFx0XHRcdFx0XHRjb3B5QnRuLmNsYXNzTGlzdC5hZGQoXCJjb3BpZWRcIilcblx0XHRcdFx0XHRcdFx0c2V0VGltZW91dChmdW5jKCkge1xuXHRcdFx0XHRcdFx0XHRcdGNvcHlCdG4udGV4dENvbnRlbnQgPSB0KFwiY29kZS5jb3B5XCIpXG5cdFx0XHRcdFx0XHRcdFx0Y29weUJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiY29waWVkXCIpXG5cdFx0XHRcdFx0XHRcdH0sIDIwMDApXG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRjYXNlIFwib3Blbi1wb3N0XCI6XG5cdFx0XHRcdGlmIHRhcmdldC5jbG9zZXN0KFwiYVwiKSA9PSBuaWwgJiYgdGFyZ2V0LmNsb3Nlc3QoXCIuY2xpY2thYmxlLXRhZ1wiKSA9PSBuaWwge1xuXHRcdFx0XHRcdGhyZWYgOj0gYnRuLmdldEF0dHJpYnV0ZShcImRhdGEtaHJlZlwiKVxuXHRcdFx0XHRcdGlmIGhyZWYgIT0gbmlsICYmIGhyZWYgIT0gXCJcIiB7XG5cdFx0XHRcdFx0XHRuYXZpZ2F0ZShzdHJpbmcoaHJlZikpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cblx0XHQvLyBGYWxsYmFjayBTUEEgbGluayBpbnRlcmNlcHRvcjogc3RhbmRhcmQgPGEgaHJlZj1cIi4uLlwiPlxuXHRcdGxpbmsgOj0gdGFyZ2V0LmNsb3Nlc3QoXCJhXCIpXG5cdFx0aWYgbGluayAhPSBuaWwge1xuXHRcdFx0aHJlZiA6PSBzdHJpbmcobGluay5nZXRBdHRyaWJ1dGUoXCJocmVmXCIpKVxuXHRcdFx0dGFyZ2V0QXR0ciA6PSBsaW5rLmdldEF0dHJpYnV0ZShcInRhcmdldFwiKVxuXHRcdFx0aWYgdGFyZ2V0QXR0ciAhPSBuaWwgJiYgdGFyZ2V0QXR0ciAhPSBcIlwiICYmIHRhcmdldEF0dHIgIT0gXCJfc2VsZlwiIHtcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cblx0XHRcdC8vIEluLXBhZ2UgYW5jaG9yIGhhc2ggbGluayAoI3RoZS1hcmNoaXRlY3R1cmUpXG5cdFx0XHRpZiBzdHJpbmdzLkhhc1ByZWZpeChocmVmLCBcIiNcIikge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0bmF2aWdhdGVIYXNoKGhyZWYpXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXG5cdFx0XHRpZiBzdHJpbmdzLkhhc1ByZWZpeChocmVmLCBcIi9cIikge1xuXHRcdFx0XHQvLyBTYW1lLXBhZ2UgYW5jaG9yIHdpdGggZnVsbCBwYXRoOiAvYmxvZy9zbHVnI3RoZS1hcmNoaXRlY3R1cmVcblx0XHRcdFx0aWYgY3VycmVudFBhdGggIT0gXCJcIiAmJiBzdHJpbmdzLkhhc1ByZWZpeChocmVmLCBjdXJyZW50UGF0aCtcIiNcIikge1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdGhhc2ggOj0gc3RyaW5ncy5UcmltUHJlZml4KGhyZWYsIGN1cnJlbnRQYXRoKVxuXHRcdFx0XHRcdHNjcm9sbFRvSGFzaChoYXNoLCB0cnVlKVxuXHRcdFx0XHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShtYXBbc3RyaW5nXWFueXt9LCBcIlwiLCBocmVmKVxuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdG5hdmlnYXRlKGhyZWYpXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdC8vIENsaWNrIG9uIHNlYXJjaCBvdmVybGF5IGJhY2tkcm9wXG5cdFx0aWYgdGFyZ2V0LmlkID09IFwic2VhcmNoLXBhZ2VcIiB7XG5cdFx0XHRjbG9zZVNlYXJjaCgpXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cblx0XHQvLyBDbGljayBvbiBjb250YWN0IG1vZGFsIGJhY2tkcm9wXG5cdFx0aWYgdGFyZ2V0LmlkID09IFwiY29udGFjdC1tb2RhbFwiIHtcblx0XHRcdGNsb3NlQ29udGFjdCgpXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdH0pXG5cblx0Ly8gSW5wdXQgb24gc2VhcmNoIGFuZCBjb250YWN0IGZvcm0gZmllbGRzXG5cdGFwcC5hZGRFdmVudExpc3RlbmVyKFwiaW5wdXRcIiwgZnVuYyhlIGFueSkge1xuXHRcdGlmIGUudGFyZ2V0Lm1hdGNoZXMoXCIjc2VhcmNoLXBhZ2UtaW5wdXRcIikge1xuXHRcdFx0aGFuZGxlU2VhcmNoSW5wdXQoc3RyaW5nKGUudGFyZ2V0LnZhbHVlKSlcblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRpZiBlLnRhcmdldC5jbG9zZXN0KFwiI2NvbnRhY3QtZm9ybVwiKSAhPSBuaWwge1xuXHRcdFx0dXBkYXRlQ29udGFjdEZpZWxkKHN0cmluZyhlLnRhcmdldC5uYW1lKSwgc3RyaW5nKGUudGFyZ2V0LnZhbHVlKSlcblx0XHR9XG5cdH0pXG5cblx0Ly8gU3VibWl0IG9uIGNvbnRhY3QgZm9ybVxuXHRhcHAuYWRkRXZlbnRMaXN0ZW5lcihcInN1Ym1pdFwiLCBmdW5jKGUgYW55KSB7XG5cdFx0aWYgZS50YXJnZXQubWF0Y2hlcyhcIiNjb250YWN0LWZvcm1cIikge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRzdWJtaXRDb250YWN0KClcblx0XHR9XG5cdH0pXG5cblx0Ly8gS2V5ZG93biBmb3IgRXNjYXBlIGFuZCBzZWFyY2ggc2hvcnRjdXQgKENtZCtLIC8gQ3RybCtLIGFuZCAvKVxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcImtleWRvd25cIiwgZnVuYyhlIGFueSkge1xuXHRcdGtleSA6PSBzdHJWYWwoZS5rZXkpXG5cdFx0aWYga2V5ID09IFwiRXNjYXBlXCIge1xuXHRcdFx0aWYgc2VhcmNoT3BlbiB7XG5cdFx0XHRcdGNsb3NlU2VhcmNoKClcblx0XHRcdH1cblx0XHRcdGlmIGNvbnRhY3RPcGVuIHtcblx0XHRcdFx0Y2xvc2VDb250YWN0KClcblx0XHRcdH1cblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdGlmIHNlYXJjaE9wZW4ge1xuXHRcdFx0aWYga2V5ID09IFwiQXJyb3dEb3duXCIge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0c2VhcmNoU2VsZWN0TmV4dCgpXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0aWYga2V5ID09IFwiQXJyb3dVcFwiIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdHNlYXJjaFNlbGVjdFByZXYoKVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdGlmIGtleSA9PSBcIkVudGVyXCIgJiYgc2VhcmNoSGFzU2VsZWN0aW9uKCkge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0c2VhcmNoT3BlblNlbGVjdGVkKClcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgc2l0ZS5TZWFyY2guRW5hYmxlZCAmJiAhY29udGFjdE9wZW4ge1xuXHRcdFx0aXNDbWRLIDo9IChib29sVmFsKGUubWV0YUtleSkgfHwgYm9vbFZhbChlLmN0cmxLZXkpKSAmJiAoa2V5ID09IFwia1wiIHx8IGtleSA9PSBcIktcIilcblx0XHRcdGlzU2xhc2ggOj0ga2V5ID09IFwiL1wiXG5cblx0XHRcdGlmIGlzQ21kSyB8fCBpc1NsYXNoIHtcblx0XHRcdFx0dGFyZ2V0IDo9IGUudGFyZ2V0XG5cdFx0XHRcdHRhZ05hbWUgOj0gXCJcIlxuXHRcdFx0XHRpc0VkaXRhYmxlIDo9IGZhbHNlXG5cdFx0XHRcdGlmIHRhcmdldCAhPSBuaWwge1xuXHRcdFx0XHRcdHRhZ05hbWUgPSBzdHJpbmdzLlRvVXBwZXIoc3RyVmFsKHRhcmdldC50YWdOYW1lKSlcblx0XHRcdFx0XHRpc0VkaXRhYmxlID0gYm9vbFZhbCh0YXJnZXQuaXNDb250ZW50RWRpdGFibGUpXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRpbklucHV0IDo9IHRhZ05hbWUgPT0gXCJJTlBVVFwiIHx8IHRhZ05hbWUgPT0gXCJURVhUQVJFQVwiIHx8IHRhZ05hbWUgPT0gXCJTRUxFQ1RcIiB8fCBpc0VkaXRhYmxlXG5cblx0XHRcdFx0aWYgaXNDbWRLIHtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0XHRpZiBzZWFyY2hPcGVuIHtcblx0XHRcdFx0XHRcdGNsb3NlU2VhcmNoKClcblx0XHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdFx0b3BlblNlYXJjaCgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9IGVsc2UgaWYgaXNTbGFzaCAmJiAhaW5JbnB1dCB7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0aWYgIXNlYXJjaE9wZW4ge1xuXHRcdFx0XHRcdFx0b3BlblNlYXJjaCgpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0fVxuXHR9KVxuXG5cdC8vIEdsb2JhbCBjbGljayBvdXRzaWRlIGhhbmRsZXJzXG5cdGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCBmdW5jKGUgYW55KSB7XG5cdFx0bmF2YmFyIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJuYXZcIilcblx0XHRpZiBuYXZiYXIgIT0gbmlsICYmIG1vYmlsZU1lbnVPcGVuIHtcblx0XHRcdGlzTW9iaWxlIDo9IHdpbmRvdy5pbm5lcldpZHRoIDw9IDc2N1xuXHRcdFx0aWYgaXNNb2JpbGUgJiYgIW5hdmJhci5jb250YWlucyhlLnRhcmdldCkge1xuXHRcdFx0XHRjbG9zZU1vYmlsZU1lbnUoKVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIHByb2plY3RzRHJvcGRvd25PcGVuIHtcblx0XHRcdGRyb3Bkb3duIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZHJvcGRvd25cIilcblx0XHRcdGlmIGRyb3Bkb3duID09IG5pbCB8fCAhZHJvcGRvd24uY29udGFpbnMoZS50YXJnZXQpIHtcblx0XHRcdFx0Y2xvc2VQcm9qZWN0c0Ryb3Bkb3duKClcblx0XHRcdH1cblx0XHR9XG5cdH0pXG5cblx0Ly8gUG9wc3RhdGUgaGFuZGxlclxuXHR3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcihcInBvcHN0YXRlXCIsIGZ1bmMoZSBhbnkpIHtcblx0XHRuZXdQYXRoIDo9IHN0cmluZyh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpXG5cdFx0aWYgbmV3UGF0aCA9PSBjdXJyZW50UGF0aCB7XG5cdFx0XHRoYXNoIDo9IHN0cmluZyh3aW5kb3cubG9jYXRpb24uaGFzaClcblx0XHRcdGlmIGhhc2ggIT0gXCJcIiB7XG5cdFx0XHRcdHNjcm9sbFRvSGFzaChoYXNoLCB0cnVlKVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0d2luZG93LnNjcm9sbFRvKG1hcFtzdHJpbmddYW55e1widG9wXCI6IDAsIFwibGVmdFwiOiAwLCBcImJlaGF2aW9yXCI6IFwic21vb3RoXCJ9KVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXHRcdGhhbmRsZVJvdXRlKClcblx0fSlcbn1cblxuYXN5bmMgZnVuYyBtYWluKCkge1xuXHR2aWV3ID0gbmV3Vmlld1N0YXRlKClcblx0ZXJyIDo9IGF3YWl0IGluaXREYXRhKClcblx0aWYgZXJyICE9IG5pbCB7XG5cdFx0Y29uc29sZS5lcnJvcihcIkluaXQgZGF0YSBmYWlsZWQ6XCIsIGVycilcblx0fVxuXG5cdGluaXRUaGVtZSgpXG5cdGluaXRTZWFyY2goKVxuXHRpbml0SW5pdGlhbFJvdXRlKClcblxuXHQvLyBTaGVsbCBpcyBtb3VudGVkIG9uY2U7IHJvdXRlcyBhbmQgb3ZlcmxheXMgcmUtcmVuZGVyIHRoZWlyIG93biByZWdpb25zLlxuXHRnb20uTW91bnQoXCIjYXBwXCIsIEFwcFNoZWxsKCksIGFwcFJlZnMpXG5cdHNldHVwRXZlbnRzKClcblx0YXdhaXQgaGFuZGxlUm91dGUoKVxuXG5cdGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZChcImFwcC1yZWFkeVwiKVxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImVycm9yc1wiXG5pbXBvcnQgXCJqczouL2Jyb3dzZXIuZC50c1wiXG5pbXBvcnQgXCJzdHJjb252XCJcbmltcG9ydCBcInN0cmluZ3NcIlxuXG4vLyBzbHVnaWZ5IGNvbnZlcnRzIGEgaGVhZGluZyB0aXRsZSBpbnRvIGEgVVJMLWZyaWVuZGx5IGFuY2hvciBzbHVnLlxuZnVuYyBzbHVnaWZ5KHRleHQgc3RyaW5nKSBzdHJpbmcge1xuXHR0ZXh0ID0gc3RyaW5ncy5Ub0xvd2VyKHN0cmluZ3MuVHJpbVNwYWNlKHRleHQpKVxuXHR2YXIgYiBzdHJpbmdzLkJ1aWxkZXJcblx0Zm9yIGkgOj0gMDsgaSA8IGxlbih0ZXh0KTsgaSsrIHtcblx0XHRjIDo9IHRleHRbaV1cblx0XHRpZiAoYyA+PSAnYScgJiYgYyA8PSAneicpIHx8IChjID49ICcwJyAmJiBjIDw9ICc5Jykge1xuXHRcdFx0Yi5Xcml0ZUJ5dGUoYylcblx0XHR9IGVsc2UgaWYgYyA9PSAnICcgfHwgYyA9PSAnLScgfHwgYyA9PSAnXycge1xuXHRcdFx0aWYgYi5MZW4oKSA+IDAgJiYgYi5TdHJpbmcoKVtiLkxlbigpLTFdICE9ICctJyB7XG5cdFx0XHRcdGIuV3JpdGVCeXRlKCctJylcblx0XHRcdH1cblx0XHR9XG5cdH1cblx0cmVzIDo9IHN0cmluZ3MuVHJpbShiLlN0cmluZygpLCBcIi1cIilcblx0aWYgcmVzID09IFwiXCIge1xuXHRcdHJlcyA9IFwic2VjdGlvblwiXG5cdH1cblx0cmV0dXJuIHJlc1xufVxuXG4vLyBjbGVhbkhlYWRpbmdUZXh0IHN0cmlwcyBpbmxpbmUgbWFya2Rvd24gKGNvZGUgc3BhbnMsIGVtcGhhc2lzLCBsaW5rIHN5bnRheCxcbi8vIGNsb3NpbmcgQVRYIGhhc2hlcykgc28gdGhlIFRPQyBsYWJlbCBtYXRjaGVzIHRoZSByZW5kZXJlZCBoZWFkaW5nIHRleHQuXG5mdW5jIGNsZWFuSGVhZGluZ1RleHQodGV4dCBzdHJpbmcpIHN0cmluZyB7XG5cdHRleHQgPSBzdHJpbmdzLlRyaW1TcGFjZSh0ZXh0KVxuXHR0ZXh0ID0gc3RyaW5ncy5UcmltUmlnaHQodGV4dCwgXCIjXCIpXG5cdHRleHQgPSBzdHJpbmdzLlRyaW1TcGFjZSh0ZXh0KVxuXHR2YXIgYiBzdHJpbmdzLkJ1aWxkZXJcblx0aSA6PSAwXG5cdGZvciBpIDwgbGVuKHRleHQpIHtcblx0XHRjIDo9IHRleHRbaV1cblx0XHRzd2l0Y2gge1xuXHRcdGNhc2UgYyA9PSAnYCcgfHwgYyA9PSAnKicgfHwgYyA9PSAnWyc6XG5cdFx0XHRpKytcblx0XHRjYXNlIGMgPT0gJ10nOlxuXHRcdFx0Ly8gRHJvcCB0aGUgXCJdKHVybClcIiB0YWlsIG9mIGEgbGluaywga2VlcCB0aGUgbGFiZWwgYWxyZWFkeSB3cml0dGVuLlxuXHRcdFx0aSsrXG5cdFx0XHRpZiBpIDwgbGVuKHRleHQpICYmIHRleHRbaV0gPT0gJygnIHtcblx0XHRcdFx0aWYgZW5kIDo9IHN0cmluZ3MuSW5kZXhCeXRlKHRleHRbaTpdLCAnKScpOyBlbmQgIT0gLTEge1xuXHRcdFx0XHRcdGkgKz0gZW5kICsgMVxuXHRcdFx0XHR9XG5cdFx0XHR9XG5cdFx0ZGVmYXVsdDpcblx0XHRcdGIuV3JpdGVCeXRlKGMpXG5cdFx0XHRpKytcblx0XHR9XG5cdH1cblx0cmV0dXJuIHN0cmluZ3MuVHJpbVNwYWNlKGIuU3RyaW5nKCkpXG59XG5cbi8vIGV4dHJhY3RUT0MgZXh0cmFjdHMgaDIgYW5kIGgzIGhlYWRpbmdzIG91dHNpZGUgY29kZSBibG9ja3MgYW5kIGRlZHVwbGljYXRlcyBzbHVncy5cbmZ1bmMgZXh0cmFjdFRPQyhtYXJrZG93biBzdHJpbmcpIFtdVE9DSXRlbSB7XG5cdGl0ZW1zIDo9IFtdVE9DSXRlbXt9XG5cdGlmIG1hcmtkb3duID09IFwiXCIge1xuXHRcdHJldHVybiBpdGVtc1xuXHR9XG5cblx0bGluZXMgOj0gc3RyaW5ncy5TcGxpdChtYXJrZG93biwgXCJcXG5cIilcblx0aW5Db2RlIDo9IGZhbHNlXG5cdHNsdWdDb3VudHMgOj0gbWFwW3N0cmluZ11pbnR7fVxuXG5cdGZvciBfLCBsaW5lIDo9IHJhbmdlIGxpbmVzIHtcblx0XHR0cmltbWVkIDo9IHN0cmluZ3MuVHJpbVNwYWNlKGxpbmUpXG5cdFx0aWYgc3RyaW5ncy5IYXNQcmVmaXgodHJpbW1lZCwgXCJgYGBcIikgfHwgc3RyaW5ncy5IYXNQcmVmaXgodHJpbW1lZCwgXCJ+fn5cIikge1xuXHRcdFx0aW5Db2RlID0gIWluQ29kZVxuXHRcdFx0Y29udGludWVcblx0XHR9XG5cdFx0aWYgaW5Db2RlIHtcblx0XHRcdGNvbnRpbnVlXG5cdFx0fVxuXG5cdFx0bGV2ZWwgOj0gMFxuXHRcdGhlYWRpbmdUZXh0IDo9IFwiXCJcblx0XHRpZiBzdHJpbmdzLkhhc1ByZWZpeCh0cmltbWVkLCBcIiMjIFwiKSB7XG5cdFx0XHRsZXZlbCA9IDJcblx0XHRcdGhlYWRpbmdUZXh0ID0gY2xlYW5IZWFkaW5nVGV4dCh0cmltbWVkWzM6XSlcblx0XHR9IGVsc2UgaWYgc3RyaW5ncy5IYXNQcmVmaXgodHJpbW1lZCwgXCIjIyMgXCIpIHtcblx0XHRcdGxldmVsID0gM1xuXHRcdFx0aGVhZGluZ1RleHQgPSBjbGVhbkhlYWRpbmdUZXh0KHRyaW1tZWRbNDpdKVxuXHRcdH1cblxuXHRcdGlmIGxldmVsID4gMCAmJiBoZWFkaW5nVGV4dCAhPSBcIlwiIHtcblx0XHRcdHNsdWcgOj0gc2x1Z2lmeShoZWFkaW5nVGV4dClcblx0XHRcdGlkIDo9IHNsdWdcblx0XHRcdGlmIGNvdW50LCBvayA6PSBzbHVnQ291bnRzW3NsdWddOyBvayB7XG5cdFx0XHRcdGlkID0gc2x1ZyArIFwiLVwiICsgc3RyY29udi5JdG9hKGNvdW50KVxuXHRcdFx0XHRzbHVnQ291bnRzW3NsdWddID0gY291bnQgKyAxXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRzbHVnQ291bnRzW3NsdWddID0gMVxuXHRcdFx0fVxuXHRcdFx0aXRlbXMgPSBhcHBlbmQoaXRlbXMsIFRPQ0l0ZW17XG5cdFx0XHRcdElEOiAgICBpZCxcblx0XHRcdFx0VGV4dDogIGhlYWRpbmdUZXh0LFxuXHRcdFx0XHRMZXZlbDogbGV2ZWwsXG5cdFx0XHR9KVxuXHRcdH1cblx0fVxuXG5cdHJldHVybiBpdGVtc1xufVxuXG4vLyBleHRyYWN0UHJvamVjdFRPQyBleHRyYWN0cyBoZWFkaW5ncyBmcm9tIHRoZSBwcm9qZWN0IFJFQURNRSBhbmQgYXBwZW5kcyBzZWN0aW9uc1xuLy8gZm9yIE1lZGlhLCBEZW1vLCBhbmQgTGlua3MgaWYgcHJlc2VudC5cbmZ1bmMgZXh0cmFjdFByb2plY3RUT0MobWFya2Rvd24gc3RyaW5nLCBwIFByb2plY3QpIFtdVE9DSXRlbSB7XG5cdGl0ZW1zIDo9IGV4dHJhY3RUT0MobWFya2Rvd24pXG5cdGlmIGxlbihwLllvdXR1YmVWaWRlb3MpID4gMCB7XG5cdFx0aXRlbXMgPSBhcHBlbmQoaXRlbXMsIFRPQ0l0ZW17XG5cdFx0XHRJRDogICAgXCJwcm9qZWN0LW1lZGlhXCIsXG5cdFx0XHRUZXh0OiAgdChcInByb2plY3QubWVkaWFcIiksXG5cdFx0XHRMZXZlbDogMixcblx0XHR9KVxuXHR9XG5cdGlmIHAuRGVtb1VybCAhPSBcIlwiIHtcblx0XHRpdGVtcyA9IGFwcGVuZChpdGVtcywgVE9DSXRlbXtcblx0XHRcdElEOiAgICBcInByb2plY3QtZGVtb1wiLFxuXHRcdFx0VGV4dDogIGRlbW9MYWJlbChwKSxcblx0XHRcdExldmVsOiAyLFxuXHRcdH0pXG5cdH1cblx0aWYgbGVuKHAuTGlua3MpID4gMCB7XG5cdFx0aXRlbXMgPSBhcHBlbmQoaXRlbXMsIFRPQ0l0ZW17XG5cdFx0XHRJRDogICAgXCJwcm9qZWN0LWxpbmtzXCIsXG5cdFx0XHRUZXh0OiAgdChcInByb2plY3QubGlua3NcIiksXG5cdFx0XHRMZXZlbDogMixcblx0XHR9KVxuXHR9XG5cdHJldHVybiBpdGVtc1xufVxuXG4vLyBoZWFkaW5nVGV4dEtleSByZWR1Y2VzIHJlbmRlcmVkIGhlYWRpbmcgSFRNTCB0byB0aGUgc2FtZSBzbHVnIGZvcm0gYXMgdGhlXG4vLyBtYXJrZG93biBzb3VyY2Ugc28gdGhlIHR3byBjYW4gYmUgbWF0Y2hlZC5cbmZ1bmMgaGVhZGluZ1RleHRLZXkoaW5uZXIgc3RyaW5nKSBzdHJpbmcge1xuXHR2YXIgYiBzdHJpbmdzLkJ1aWxkZXJcblx0aW5UYWcgOj0gZmFsc2Vcblx0Zm9yIGkgOj0gMDsgaSA8IGxlbihpbm5lcik7IGkrKyB7XG5cdFx0YyA6PSBpbm5lcltpXVxuXHRcdGlmIGMgPT0gJzwnIHtcblx0XHRcdGluVGFnID0gdHJ1ZVxuXHRcdFx0Y29udGludWVcblx0XHR9XG5cdFx0aWYgYyA9PSAnPicge1xuXHRcdFx0aW5UYWcgPSBmYWxzZVxuXHRcdFx0Y29udGludWVcblx0XHR9XG5cdFx0aWYgIWluVGFnIHtcblx0XHRcdGIuV3JpdGVCeXRlKGMpXG5cdFx0fVxuXHR9XG5cdHRleHQgOj0gYi5TdHJpbmcoKVxuXHR0ZXh0ID0gc3RyaW5ncy5SZXBsYWNlQWxsKHRleHQsIFwiJmFtcDtcIiwgXCImXCIpXG5cdHRleHQgPSBzdHJpbmdzLlJlcGxhY2VBbGwodGV4dCwgXCImbHQ7XCIsIFwiPFwiKVxuXHR0ZXh0ID0gc3RyaW5ncy5SZXBsYWNlQWxsKHRleHQsIFwiJmd0O1wiLCBcIj5cIilcblx0dGV4dCA9IHN0cmluZ3MuUmVwbGFjZUFsbCh0ZXh0LCBcIiZxdW90O1wiLCBcIlxcXCJcIilcblx0dGV4dCA9IHN0cmluZ3MuUmVwbGFjZUFsbCh0ZXh0LCBcIiYjMzk7XCIsIFwiJ1wiKVxuXHRyZXR1cm4gc2x1Z2lmeSh0ZXh0KVxufVxuXG4vLyBpbmplY3RIZWFkaW5nSURzIGdpdmVzIGgyL2gzIGVsZW1lbnRzIHRoZSBpZCBvZiB0aGUgVE9DIGl0ZW0gd2l0aCBtYXRjaGluZ1xuLy8gdGV4dC4gSGVhZGluZ3MgYXJlIG1hdGNoZWQgYnkgdGV4dCByYXRoZXIgdGhhbiBwb3NpdGlvbiwgc28gYSBoZWFkaW5nIHRoZVxuLy8gbWFya2Rvd24gc2NhbiBtaXNzZWQgKHNldGV4dCwgYmxvY2txdW90ZSwgaW5kZW50ZWQgY29kZSkgb25seSBsb3NlcyBpdHMgb3duXG4vLyBhbmNob3IgaW5zdGVhZCBvZiBzaGlmdGluZyBldmVyeSBpZCBhZnRlciBpdC5cbmZ1bmMgaW5qZWN0SGVhZGluZ0lEcyhodG1sIHN0cmluZywgdG9jIFtdVE9DSXRlbSkgc3RyaW5nIHtcblx0aWYgbGVuKHRvYykgPT0gMCB8fCBodG1sID09IFwiXCIge1xuXHRcdHJldHVybiBodG1sXG5cdH1cblxuXHQvLyBJZHMgcXVldWVkIHBlciB0ZXh0IGtleSwgY29uc3VtZWQgaW4gZG9jdW1lbnQgb3JkZXIgc28gZHVwbGljYXRlcyBhbGlnbi5cblx0cGVuZGluZyA6PSBtYXBbc3RyaW5nXVtdc3RyaW5ne31cblx0Zm9yIF8sIGl0ZW0gOj0gcmFuZ2UgdG9jIHtcblx0XHRrZXkgOj0gc2x1Z2lmeShpdGVtLlRleHQpXG5cdFx0cGVuZGluZ1trZXldID0gYXBwZW5kKHBlbmRpbmdba2V5XSwgaXRlbS5JRClcblx0fVxuXG5cdHZhciBiIHN0cmluZ3MuQnVpbGRlclxuXHRpZHggOj0gMFxuXG5cdGZvciBpZHggPCBsZW4oaHRtbCkge1xuXHRcdHJlc3QgOj0gaHRtbFtpZHg6XVxuXHRcdGlmIHN0cmluZ3MuSGFzUHJlZml4KHJlc3QsIFwiPGgyXCIpIHx8IHN0cmluZ3MuSGFzUHJlZml4KHJlc3QsIFwiPGgzXCIpIHtcblx0XHRcdGNsb3NlQnJhY2tldCA6PSBzdHJpbmdzLkluZGV4KHJlc3QsIFwiPlwiKVxuXHRcdFx0Y2xvc2VUYWcgOj0gc3RyaW5ncy5JbmRleChyZXN0LCBcIjwvaFwiKVxuXHRcdFx0aWYgY2xvc2VCcmFja2V0ICE9IC0xICYmIGNsb3NlVGFnICE9IC0xICYmIGNsb3NlQnJhY2tldCA8IGNsb3NlVGFnIHtcblx0XHRcdFx0b3BlblRhZyA6PSByZXN0WzpjbG9zZUJyYWNrZXQrMV1cblx0XHRcdFx0a2V5IDo9IGhlYWRpbmdUZXh0S2V5KHJlc3RbY2xvc2VCcmFja2V0KzEgOiBjbG9zZVRhZ10pXG5cdFx0XHRcdGlkcyA6PSBwZW5kaW5nW2tleV1cblx0XHRcdFx0aWYgbGVuKGlkcykgPiAwICYmICFzdHJpbmdzLkNvbnRhaW5zKG9wZW5UYWcsIFwiaWQ9XCIpIHtcblx0XHRcdFx0XHRwZW5kaW5nW2tleV0gPSBpZHNbMTpdXG5cdFx0XHRcdFx0Yi5Xcml0ZVN0cmluZyhvcGVuVGFnWzozXSArIFwiIGlkPVxcXCJcIiArIGlkc1swXSArIFwiXFxcIlwiICsgb3BlblRhZ1szOl0pXG5cdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0Yi5Xcml0ZVN0cmluZyhvcGVuVGFnKVxuXHRcdFx0XHR9XG5cdFx0XHRcdGlkeCArPSBjbG9zZUJyYWNrZXQgKyAxXG5cdFx0XHRcdGNvbnRpbnVlXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Yi5Xcml0ZUJ5dGUoaHRtbFtpZHhdKVxuXHRcdGlkeCsrXG5cdH1cblxuXHRyZXR1cm4gYi5TdHJpbmcoKVxufVxuXG5mdW5jIHBhcnNlTWFya2Rvd24oY29udGVudCBzdHJpbmcpIHN0cmluZyB7XG5cdGlmIGNvbnRlbnQgPT0gXCJcIiB7XG5cdFx0cmV0dXJuIFwiXCJcblx0fVxuXHRkZWZlciBmdW5jKCkge1xuXHRcdGlmIHIgOj0gcmVjb3ZlcigpOyByICE9IG5pbCB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiRXJyb3IgcmVuZGVyaW5nIG1hcmtkb3duOlwiLCByKVxuXHRcdH1cblx0fSgpXG5cdHJldHVybiBtYXJrZWQucGFyc2UoY29udGVudClcbn1cblxuZnVuYyBzdHJpcEZyb250bWF0dGVyKG1hcmtkb3duIHN0cmluZykgc3RyaW5nIHtcblx0dHJpbW1lZCA6PSBzdHJpbmdzLlRyaW1TcGFjZShtYXJrZG93bilcblx0aWYgIXN0cmluZ3MuSGFzUHJlZml4KHRyaW1tZWQsIFwiLS0tXCIpIHtcblx0XHRyZXR1cm4gdHJpbW1lZFxuXHR9XG5cblx0cmVzdCA6PSB0cmltbWVkWzM6XVxuXHRuZXdsaW5lSWR4IDo9IHN0cmluZ3MuSW5kZXgocmVzdCwgXCJcXG5cIilcblx0aWYgbmV3bGluZUlkeCA9PSAtMSB7XG5cdFx0cmV0dXJuIHRyaW1tZWRcblx0fVxuXHRhZnRlckZpcnN0TGluZSA6PSByZXN0W25ld2xpbmVJZHgrMTpdXG5cdGNsb3NpbmdJZHggOj0gc3RyaW5ncy5JbmRleChhZnRlckZpcnN0TGluZSwgXCJcXG4tLS1cIilcblx0aWYgY2xvc2luZ0lkeCA9PSAtMSB7XG5cdFx0Y2xvc2luZ0lkeCA9IHN0cmluZ3MuSW5kZXgoYWZ0ZXJGaXJzdExpbmUsIFwiLS0tXCIpXG5cdFx0aWYgY2xvc2luZ0lkeCA9PSAtMSB7XG5cdFx0XHRyZXR1cm4gdHJpbW1lZFxuXHRcdH1cblx0XHRhZnRlckNsb3NpbmcgOj0gYWZ0ZXJGaXJzdExpbmVbY2xvc2luZ0lkeCszOl1cblx0XHRyZXR1cm4gc3RyaW5ncy5UcmltU3BhY2UoYWZ0ZXJDbG9zaW5nKVxuXHR9XG5cblx0YWZ0ZXJDbG9zaW5nIDo9IGFmdGVyRmlyc3RMaW5lW2Nsb3NpbmdJZHgrNDpdXG5cdHJldHVybiBzdHJpbmdzLlRyaW1TcGFjZShhZnRlckNsb3NpbmcpXG59XG5cbmFzeW5jIGZ1bmMgbG9hZE1hcmtkb3duRmlsZSh1cmwgc3RyaW5nKSAoc3RyaW5nLCBlcnJvcikge1xuXHRkZWZlciBmdW5jKCkge1xuXHRcdGlmIHIgOj0gcmVjb3ZlcigpOyByICE9IG5pbCB7XG5cdFx0XHRjb25zb2xlLmVycm9yKFwiZmV0Y2ggZmFpbGVkOlwiLCByKVxuXHRcdH1cblx0fSgpXG5cblx0cmVzIDo9IGF3YWl0IGZldGNoKHVybClcblx0aWYgcmVzID09IG5pbCB8fCAhcmVzLm9rIHtcblx0XHRyZXR1cm4gXCJcIiwgZXJyb3JzLk5ldyhcIkhUVFAgZXJyb3JcIilcblx0fVxuXG5cdHRleHQgOj0gYXdhaXQgcmVzLnRleHQoKVxuXHRyZXR1cm4gc3RyaW5nKHRleHQpLCBuaWxcbn1cblxuZnVuYyBhdHRhY2hDb3B5QnV0dG9ucygpIHtcblx0cHJlcyA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwicHJlXCIpXG5cdGZvciBpIDo9IDA7IGkgPCBsZW4ocHJlcyk7IGkrKyB7XG5cdFx0cHJlIDo9IHByZXNbaV1cblx0XHRpZiBwcmUucXVlcnlTZWxlY3RvcihcIi5jb3B5LWNvZGUtYnV0dG9uXCIpICE9IG5pbCB7XG5cdFx0XHRjb250aW51ZVxuXHRcdH1cblx0XHRidG4gOj0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImJ1dHRvblwiKVxuXHRcdGJ0bi5jbGFzc05hbWUgPSBcImNvcHktY29kZS1idXR0b25cIlxuXHRcdGJ0bi5zZXRBdHRyaWJ1dGUoXCJkYXRhLWFjdGlvblwiLCBcImNvcHktY29kZVwiKVxuXHRcdGJ0bi5zZXRBdHRyaWJ1dGUoXCJhcmlhLWxhYmVsXCIsIHQoXCJhcmlhLmNvcHlDb2RlXCIpKVxuXHRcdGJ0bi50ZXh0Q29udGVudCA9IHQoXCJjb2RlLmNvcHlcIilcblx0XHRwcmUuc3R5bGUucG9zaXRpb24gPSBcInJlbGF0aXZlXCJcblx0XHRwcmUuYXBwZW5kQ2hpbGQoYnRuKVxuXHR9XG59XG5cbmZ1bmMgaGlnaGxpZ2h0Q29kZSgpIHtcblx0ZGVmZXIgZnVuYygpIHtcblx0XHRpZiByIDo9IHJlY292ZXIoKTsgciAhPSBuaWwge1xuXHRcdFx0Y29uc29sZS53YXJuKFwiUHJpc20gaGlnaGxpZ2h0IGVycm9yOlwiLCByKVxuXHRcdH1cblx0fSgpXG5cdGNvbnZlcnRNZXJtYWlkQmxvY2tzKClcblx0aWYgUHJpc20ubGFuZ3VhZ2VzLnRlbXBsID09IG5pbCAmJiBQcmlzbS5sYW5ndWFnZXMuZ28gIT0gbmlsIHtcblx0XHRQcmlzbS5sYW5ndWFnZXMudGVtcGwgPSBQcmlzbS5sYW5ndWFnZXMuZ29cblx0fVxuXHRQcmlzbS5oaWdobGlnaHRBbGwoKVxuXHRhdHRhY2hDb3B5QnV0dG9ucygpXG5cdHJlbmRlck1lcm1haWQoKVxufVxuXG4vLyBjb252ZXJ0TWVybWFpZEJsb2NrcyBzd2FwcyBtYXJrZWQncyBgYGBtZXJtYWlkIGZlbmNlcyBmb3IgZGl2cyBtZXJtYWlkIGNhblxuLy8gcmVuZGVyLCBrZWVwaW5nIHRoZSBzb3VyY2UgaW4gZGF0YS1tZXJtYWlkLXNyYyBzbyBkaWFncmFtcyBjYW4gYmUgcmUtZHJhd24uXG5mdW5jIGNvbnZlcnRNZXJtYWlkQmxvY2tzKCkgaW50IHtcblx0Y29kZXMgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInByZSA+IGNvZGUubGFuZ3VhZ2UtbWVybWFpZFwiKVxuXHRmb3IgaSA6PSAwOyBpIDwgbGVuKGNvZGVzKTsgaSsrIHtcblx0XHRjb2RlIDo9IGNvZGVzW2ldXG5cdFx0c3JjIDo9IHN0cmluZyhjb2RlLnRleHRDb250ZW50KVxuXHRcdGRpdiA6PSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpXG5cdFx0ZGl2LmNsYXNzTmFtZSA9IFwibWVybWFpZFwiXG5cdFx0ZGl2LnNldEF0dHJpYnV0ZShcImRhdGEtbWVybWFpZC1zcmNcIiwgc3JjKVxuXHRcdGRpdi50ZXh0Q29udGVudCA9IHNyY1xuXHRcdGNvZGUucGFyZW50RWxlbWVudC5yZXBsYWNlV2l0aChkaXYpXG5cdH1cblx0cmV0dXJuIGxlbihjb2Rlcylcbn1cblxuZnVuYyBtZXJtYWlkVGhlbWUodGhlbWUgc3RyaW5nKSBzdHJpbmcge1xuXHRpZiB0aGVtZSA9PSBcImxpZ2h0XCIge1xuXHRcdHJldHVybiBcImRlZmF1bHRcIlxuXHR9XG5cdHJldHVybiBcImRhcmtcIlxufVxuXG5jb25zdCBtZXJtYWlkU3JjID0gXCJodHRwczovL2Nkbi5qc2RlbGl2ci5uZXQvbnBtL21lcm1haWRAMTEvZGlzdC9tZXJtYWlkLm1pbi5qc1wiXG5cbmZ1bmMgbG9hZE1lcm1haWQoKSBhbnkge1xuXHRyZXR1cm4gbG9hZFNjcmlwdChtZXJtYWlkU3JjLCBcIlwiKVxufVxuXG4vLyByZW5kZXJNZXJtYWlkIGxhenktbG9hZHMgbWVybWFpZCBvbiBmaXJzdCB1c2UgYW5kIChyZSlkcmF3cyBldmVyeSBkaWFncmFtXG4vLyBvbiB0aGUgcGFnZSB3aXRoIHRoZSBjdXJyZW50IHRoZW1lLlxuYXN5bmMgZnVuYyByZW5kZXJNZXJtYWlkKCkge1xuXHRkZWZlciBmdW5jKCkge1xuXHRcdGlmIHIgOj0gcmVjb3ZlcigpOyByICE9IG5pbCB7XG5cdFx0XHRjb25zb2xlLndhcm4oXCJNZXJtYWlkIHJlbmRlciBlcnJvcjpcIiwgcilcblx0XHR9XG5cdH0oKVxuXHRub2RlcyA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLm1lcm1haWRbZGF0YS1tZXJtYWlkLXNyY11cIilcblx0aWYgbGVuKG5vZGVzKSA9PSAwIHtcblx0XHRyZXR1cm5cblx0fVxuXHRhd2FpdCBsb2FkTWVybWFpZCgpXG5cdGZvciBpIDo9IDA7IGkgPCBsZW4obm9kZXMpOyBpKysge1xuXHRcdG4gOj0gbm9kZXNbaV1cblx0XHRuLnJlbW92ZUF0dHJpYnV0ZShcImRhdGEtcHJvY2Vzc2VkXCIpXG5cdFx0bi50ZXh0Q29udGVudCA9IG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1tZXJtYWlkLXNyY1wiKVxuXHR9XG5cdG1lcm1haWQuaW5pdGlhbGl6ZShtYXBbc3RyaW5nXWFueXtcblx0XHRcInN0YXJ0T25Mb2FkXCI6ICAgZmFsc2UsXG5cdFx0XCJ0aGVtZVwiOiAgICAgICAgIG1lcm1haWRUaGVtZShjdXJyZW50VGhlbWUpLFxuXHRcdFwic2VjdXJpdHlMZXZlbFwiOiBcInN0cmljdFwiLFxuXHR9KVxuXHRhd2FpdCBtZXJtYWlkLnJ1bihtYXBbc3RyaW5nXWFueXtcIm5vZGVzXCI6IG5vZGVzfSlcbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJzdHJjb252XCJcblxudGVtcGwgTmF2YmFyKHIgUm91dGVNYXRjaCwgcGFnZXMgW11OYXZQYWdlLCBwcm9qZWN0cyBbXVByb2plY3QsIGRyb3Bkb3duT3BlbiBib29sLCBtb2JpbGVPcGVuIGJvb2wsIHNpdGVDb25maWcgU2l0ZUNvbmZpZykge1xuXHQ8bmF2IGNsYXNzPVwibmF2YmFyXCI+XG5cdFx0PGRpdiBjbGFzcz1cIm5hdmJhci1pbm5lclwiPlxuXHRcdFx0PGEgY2xhc3M9XCJuYXZiYXItYnJhbmRcIiBocmVmPVwiL1wiIGRhdGEtYWN0aW9uPVwibmF2XCI+eyBzaXRlQ29uZmlnLlRpdGxlIH08L2E+XG5cdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz17IGNscyhcIm5hdmJhci10b2dnbGVcIiwgbW9iaWxlT3BlbiwgXCJhY3RpdmVcIikgfSBhcmlhLWxhYmVsPVwiVG9nZ2xlIG5hdmlnYXRpb25cIiBhcmlhLWV4cGFuZGVkPXsgc3RyY29udi5Gb3JtYXRCb29sKG1vYmlsZU9wZW4pIH0gZGF0YS1hY3Rpb249XCJ0b2dnbGUtbW9iaWxlLW5hdlwiPlxuXHRcdFx0XHQ8c3BhbiBjbGFzcz1cIm5hdmJhci10b2dnbGUtaWNvblwiPjwvc3Bhbj5cblx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PGRpdiBjbGFzcz17IGNscyhcIm5hdmJhci1jb2xsYXBzZVwiLCBtb2JpbGVPcGVuLCBcInNob3dcIikgfT5cblx0XHRcdFx0PHVsIGNsYXNzPVwibmF2YmFyLW5hdiBsZWZ0XCI+XG5cdFx0XHRcdFx0PGxpIGNsYXNzPVwibmF2LWl0ZW0gbmF2YmFyLW1lbnVcIj5cblx0XHRcdFx0XHRcdDxhIGNsYXNzPXsgY2xzKFwibmF2LWxpbmtcIiwgci5LaW5kID09IFJvdXRlQmxvZywgXCJhY3RpdmVcIikgfSBocmVmPVwiL2Jsb2dcIiBkYXRhLWFjdGlvbj1cIm5hdlwiPnsgdChcIm5hdi5ibG9nXCIpIH08L2E+XG5cdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHQ8bGkgY2xhc3M9eyBjbHMoXCJuYXYtaXRlbSBuYXZiYXItbWVudSBkcm9wZG93blwiLCBkcm9wZG93bk9wZW4sIFwic2hvd1wiKSB9PlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9eyBjbHMoXCJuYXYtbGluayBkcm9wZG93bi10b2dnbGVcIiwgci5LaW5kID09IFJvdXRlUHJvamVjdCwgXCJhY3RpdmVcIikgfSBhcmlhLWhhc3BvcHVwPVwidHJ1ZVwiIGFyaWEtY29udHJvbHM9XCJwcm9qZWN0cy1kcm9wZG93blwiIGFyaWEtZXhwYW5kZWQ9eyBzdHJjb252LkZvcm1hdEJvb2woZHJvcGRvd25PcGVuKSB9IGRhdGEtYWN0aW9uPVwidG9nZ2xlLXByb2plY3RzLWRyb3Bkb3duXCI+XG5cdFx0XHRcdFx0XHRcdHsgdChcIm5hdi5wcm9qZWN0c1wiKSB9XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiZHJvcGRvd24tY2hldnJvbiBkcm9wZG93bi1jaGV2cm9uLWRvd25cIj5ASWNvbihcImNoZXZyb24tZG93blwiLCBcIjAuOGVtXCIpPC9zcGFuPlxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImRyb3Bkb3duLWNoZXZyb24gZHJvcGRvd24tY2hldnJvbi11cFwiPkBJY29uKFwiY2hldnJvbi11cFwiLCBcIjAuOGVtXCIpPC9zcGFuPlxuXHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8dWwgY2xhc3M9XCJkcm9wZG93bi1tZW51XCIgaWQ9XCJwcm9qZWN0cy1kcm9wZG93blwiPlxuXHRcdFx0XHRcdFx0XHRmb3IgXywgcCA6PSByYW5nZSBwcm9qZWN0cyB7XG5cdFx0XHRcdFx0XHRcdFx0PGxpPjxhIGNsYXNzPXsgY2xzKFwiZHJvcGRvd24taXRlbVwiLCBpc0FjdGl2ZVJvdXRlKHIsIFJvdXRlUHJvamVjdCwgcC5JRCksIFwiYWN0aXZlXCIpIH0gaHJlZj17IHAuSHJlZiB9IGRhdGEtYWN0aW9uPVwibmF2XCI+eyBwLlRpdGxlIH08L2E+PC9saT5cblx0XHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0PC91bD5cblx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdGZvciBfLCBwYWdlIDo9IHJhbmdlIHBhZ2VzIHtcblx0XHRcdFx0XHRcdGlmIHBhZ2UuU2hvd0luTmF2IHtcblx0XHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibmF2LWl0ZW0gbmF2YmFyLW1lbnVcIj5cblx0XHRcdFx0XHRcdFx0XHQ8YSBjbGFzcz17IGNscyhcIm5hdi1saW5rXCIsIGlzQWN0aXZlUm91dGUociwgUm91dGVQYWdlLCBwYWdlLklEKSwgXCJhY3RpdmVcIikgfSBocmVmPXsgcGFnZS5IcmVmIH0gZGF0YS1hY3Rpb249XCJuYXZcIj57IHBhZ2UuVGl0bGUgfTwvYT5cblx0XHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHRcdDx1bCBjbGFzcz1cIm5hdmJhci1uYXYgcmlnaHRcIj5cblx0XHRcdFx0XHRpZiBzaXRlQ29uZmlnLlNlYXJjaC5FbmFibGVkIHtcblx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cIm5hdi1pdGVtIG5hdmJhci1pY29uXCI+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2LWxpbmsgc2VhcmNoLXRvZ2dsZVwiIGlkPVwic2VhcmNoLXRvZ2dsZVwiIGFyaWEtbGFiZWw9eyB0KFwiYXJpYS5zZWFyY2hcIikgfSB0aXRsZT17IHQoXCJzZWFyY2guYnV0dG9uVGl0bGVcIikgKyBcIiAoXCIgKyB0KFwic2VhcmNoLnNob3J0Y3V0SGludFwiKSArIFwiKVwiIH0gYXJpYS1rZXlzaG9ydGN1dHM9XCJDb250cm9sK0sgTWV0YStLIC9cIiBkYXRhLWFjdGlvbj1cIm9wZW4tc2VhcmNoXCI+XG5cdFx0XHRcdFx0XHRcdFx0QEljb24oXCJzZWFyY2hcIiwgXCIxLjM1cmVtXCIpXG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0PGxpIGNsYXNzPVwibmF2LWl0ZW0gbmF2YmFyLWljb25cIj5cblx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGlkPVwidGhlbWUtdG9nZ2xlXCIgY2xhc3M9XCJ0aGVtZS10b2dnbGUgbmF2LWxpbmtcIiBhcmlhLWxhYmVsPXsgdChcImFyaWEudG9nZ2xlVGhlbWVcIikgfSB0aXRsZT17IHQoXCJ0aGVtZS50b2dnbGVUaXRsZVwiKSB9IGRhdGEtYWN0aW9uPVwidG9nZ2xlLXRoZW1lXCI+XG5cdFx0XHRcdFx0XHRcdEBJY29uKFwic3VuXCIsIFwiMS4zNXJlbVwiKVxuXHRcdFx0XHRcdFx0XHRASWNvbihcIm1vb25cIiwgXCIxLjM1cmVtXCIpXG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdGlmIHNpdGVDb25maWcuRW1haWxKUy5FbmFibGVkIHtcblx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cIm5hdi1pdGVtIG5hdmJhci1pY29uXCI+XG5cdFx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwibmF2LWxpbmsgZW1haWwtdG9nZ2xlXCIgaWQ9XCJlbWFpbC10b2dnbGVcIiBhcmlhLWxhYmVsPXsgdChcImNvbnRhY3QudGl0bGVcIikgfSB0aXRsZT17IHQoXCJjb250YWN0LmJ1dHRvblRpdGxlXCIpIH0gZGF0YS1hY3Rpb249XCJvcGVuLWNvbnRhY3RcIj5cblx0XHRcdFx0XHRcdFx0XHRASWNvbihcImVudmVsb3BlXCIsIFwiMS4zNXJlbVwiKVxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdGZvciBfLCBzIDo9IHJhbmdlIHNpdGVDb25maWcuU29jaWFsIHtcblx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cIm5hdi1pdGVtIG5hdmJhci1pY29uXCI+XG5cdFx0XHRcdFx0XHRcdDxhIGNsYXNzPVwibmF2LWxpbmtcIiBocmVmPXsgcy5IcmVmIH0gdGFyZ2V0PXsgcy5UYXJnZXQgfSByZWw9eyBzLlJlbCB9PlxuXHRcdFx0XHRcdFx0XHRcdEBJY29uKHMuSWNvbiwgXCIxLjM1cmVtXCIpXG5cdFx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdDwvbmF2PlxufVxuIiwicGFja2FnZSBtYWluXG5cbnRlbXBsIFBhZ2VWaWV3KHYgVmlld1N0YXRlKSB7XG5cdGlmIHYuU3RhdHVzID09IExvYWRGYWlsZWQge1xuXHRcdDxkaXYgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+XG5cdFx0XHQ8aDE+eyB0KFwiZ2VuZXJhbC5ub3RGb3VuZFwiKSB9PC9oMT5cblx0XHRcdDxwPnsgdChcImdlbmVyYWwubm90Rm91bmRNZXNzYWdlXCIpIH08L3A+XG5cdFx0PC9kaXY+XG5cdH0gZWxzZSB7XG5cdFx0PGRpdiBjbGFzcz1cInBhZ2Utdmlld1wiPlxuXHRcdFx0PGRpdiBjbGFzcz1cIm1hcmtkb3duLWJvZHlcIj5cblx0XHRcdFx0QHRlbXBsLlJhdyh2LkhUTUwpXG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0fVxufVxuIiwicGFja2FnZSBtYWluXG5cbnRlbXBsIFByb2plY3RSZWFkbWUodiBWaWV3U3RhdGUpIHtcblx0aWYgdi5Qcm9qLkdpdGh1YlJlcG8gIT0gXCJcIiB7XG5cdFx0aWYgdi5TdGF0dXMgPT0gTG9hZEZhaWxlZCB7XG5cdFx0XHQ8ZGl2IGlkPVwicHJvamVjdC1yZWFkbWVcIj5cblx0XHRcdFx0PHA+eyB0KFwicHJvamVjdC5yZWFkbWVFcnJvclwiKSB9PC9wPlxuXHRcdFx0PC9kaXY+XG5cdFx0fSBlbHNlIGlmIHYuSFRNTCAhPSBcIlwiIHtcblx0XHRcdDxkaXYgaWQ9XCJwcm9qZWN0LXJlYWRtZVwiIGNsYXNzPVwibWFya2Rvd24tYm9keVwiPlxuXHRcdFx0XHRAdGVtcGwuUmF3KHYuSFRNTClcblx0XHRcdDwvZGl2PlxuXHRcdH1cblx0fVxufVxuXG50ZW1wbCBQcm9qZWN0TWVkaWEodmlkZW9zIFtdc3RyaW5nKSB7XG5cdGlmIGxlbih2aWRlb3MpID4gMCB7XG5cdFx0PGRpdiBjbGFzcz1cIm1hcmtkb3duLWJvZHlcIj5cblx0XHRcdDxoMiBpZD1cInByb2plY3QtbWVkaWFcIj57IHQoXCJwcm9qZWN0Lm1lZGlhXCIpIH08L2gyPlxuXHRcdFx0Zm9yIF8sIHYgOj0gcmFuZ2UgdmlkZW9zIHtcblx0XHRcdFx0PGRpdiBjbGFzcz1cInlvdXR1YmUtdmlkZW9cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaWZyYW1lV3JhcHBlclwiPlxuXHRcdFx0XHRcdFx0PGlmcmFtZSB3aWR0aD1cIjU2MFwiIGhlaWdodD1cIjM0OVwiIHNyYz17IFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvXCIgKyB2ICsgXCI/cmVsPTAmaGQ9MVwiIH0gdGl0bGU9XCJZb3VUdWJlIHZpZGVvIHBsYXllclwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHR9XG5cdFx0PC9kaXY+XG5cdH1cbn1cblxudGVtcGwgUHJvamVjdERlbW8ocCBQcm9qZWN0KSB7XG5cdGlmIHAuRGVtb1VybCAhPSBcIlwiIHtcblx0XHQ8ZGl2IGNsYXNzPVwibWFya2Rvd24tYm9keVwiPlxuXHRcdFx0PGgyIGlkPVwicHJvamVjdC1kZW1vXCI+eyBkZW1vTGFiZWwocCkgfTwvaDI+XG5cdFx0XHRpZiBwLkRlbW9JbnN0cnVjdGlvbnMgIT0gXCJcIiB7XG5cdFx0XHRcdDxwPnsgcC5EZW1vSW5zdHJ1Y3Rpb25zIH08L3A+XG5cdFx0XHR9XG5cdFx0XHQ8ZGl2IGNsYXNzPXsgZGVtb1dyYXBwZXJDbGFzcyhwLkRlbW9IZWlnaHQpIH0+XG5cdFx0XHRcdDxpZnJhbWUgaWQ9XCJkZW1vXCIgc3JjPXsgcC5EZW1vVXJsIH0gdGl0bGU9eyBwLlRpdGxlICsgXCIgZGVtb1wiIH0gYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHRpZiBwLkRlbW9GdWxsc2NyZWVuIHtcblx0XHRcdFx0PGJyLz5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJmdWxsc2NyZWVuXCIgY2xhc3M9XCJkb3dubG9hZC1idG5cIiBkYXRhLWFjdGlvbj1cInRvZ2dsZS1mdWxsc2NyZWVuXCI+XG5cdFx0XHRcdFx0XHRASWNvbihcImV4cGFuZFwiLCBcIjFyZW1cIilcblx0XHRcdFx0XHRcdDxzcGFuPnsgdChcInByb2plY3QuZnVsbHNjcmVlblwiKSB9PC9zcGFuPlxuXHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdH1cblx0XHQ8L2Rpdj5cblx0fVxufVxuXG50ZW1wbCBQcm9qZWN0TGlua3MobGlua3MgW11Qcm9qZWN0TGluaykge1xuXHRpZiBsZW4obGlua3MpID4gMCB7XG5cdFx0PGRpdiBjbGFzcz1cIm1hcmtkb3duLWJvZHlcIj5cblx0XHRcdDxoMiBpZD1cInByb2plY3QtbGlua3NcIj57IHQoXCJwcm9qZWN0LmxpbmtzXCIpIH08L2gyPlxuXHRcdFx0PGRpdiBjbGFzcz1cImRvd25sb2FkLWJ1dHRvbnNcIj5cblx0XHRcdFx0Zm9yIF8sIGxpbmsgOj0gcmFuZ2UgbGlua3Mge1xuXHRcdFx0XHRcdDxhIGhyZWY9eyBsaW5rLkhyZWYgfSB0YXJnZXQ9XCJfYmxhbmtcIiByZWw9XCJub29wZW5lciBub3JlZmVycmVyXCIgY2xhc3M9XCJkb3dubG9hZC1idG5cIj5cblx0XHRcdFx0XHRcdEBJY29uKGxpbmsuSWNvbiwgXCIxcmVtXCIpXG5cdFx0XHRcdFx0XHQ8c3Bhbj57IGxpbmsuVGl0bGUgfTwvc3Bhbj5cblx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdH1cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHR9XG59XG5cbnRlbXBsIFByb2plY3REZXRhaWwodiBWaWV3U3RhdGUsIGNvbW1lbnRzRW5hYmxlZCBib29sKSB7XG5cdGlmIHYuU3RhdHVzID09IExvYWROb3RGb3VuZCB7XG5cdFx0PGRpdiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj5cblx0XHRcdDxoMT57IHQoXCJnZW5lcmFsLnByb2plY3ROb3RGb3VuZFwiKSB9PC9oMT5cblx0XHRcdDxwPnsgdChcImdlbmVyYWwucHJvamVjdE5vdEZvdW5kTWVzc2FnZVwiKSB9PC9wPlxuXHRcdDwvZGl2PlxuXHR9IGVsc2Uge1xuXHRcdDxkaXYgY2xhc3M9XCJwcm9qZWN0LWRldGFpbFwiPlxuXHRcdFx0PGgxIGNsYXNzPVwicHJvamVjdC10aXRsZVwiPnsgdi5Qcm9qLlRpdGxlIH08L2gxPlxuXHRcdFx0PHAgY2xhc3M9XCJwcm9qZWN0LWRlc2NyaXB0aW9uXCI+eyB2LlByb2ouRGVzY3JpcHRpb24gfTwvcD5cblx0XHRcdGlmIGxlbih2LlByb2ouVGFncykgPiAwIHtcblx0XHRcdFx0PGRpdiBjbGFzcz1cInByb2plY3QtdGFnc1wiPlxuXHRcdFx0XHRcdGZvciBfLCB0YWcgOj0gcmFuZ2Ugdi5Qcm9qLlRhZ3Mge1xuXHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJpdGVtLXRhZyBjbGlja2FibGUtdGFnXCIgZGF0YS1zZWFyY2gtdGFnPXsgdGFnIH0+eyB0YWcgfTwvc3Bhbj5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0fVxuXHRcdFx0QFRhYmxlT2ZDb250ZW50cyh2LlRPQylcblx0XHRcdEBQcm9qZWN0UmVhZG1lKHYpXG5cdFx0XHRAUHJvamVjdE1lZGlhKHYuUHJvai5Zb3V0dWJlVmlkZW9zKVxuXHRcdFx0QFByb2plY3REZW1vKHYuUHJvailcblx0XHRcdEBQcm9qZWN0TGlua3Modi5Qcm9qLkxpbmtzKVxuXHRcdFx0aWYgY29tbWVudHNFbmFibGVkIHtcblx0XHRcdFx0PGRpdiBjbGFzcz1cImdpc2N1cy1jb250YWluZXJcIj48L2Rpdj5cblx0XHRcdH1cblx0XHQ8L2Rpdj5cblx0fVxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImh0bWxcIlxuaW1wb3J0IFwic3RyY29udlwiXG5pbXBvcnQgXCJzdHJpbmdzXCJcbmltcG9ydCBcInRpbWVcIlxuXG4vLyDilIDilIAgTmF2YmFyIGhlbHBlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmMgaXNBY3RpdmVSb3V0ZShyIFJvdXRlTWF0Y2gsIGtpbmQgUm91dGUsIHBhcmFtIHN0cmluZykgYm9vbCB7XG5cdHJldHVybiByLktpbmQgPT0ga2luZCAmJiByLlBhcmFtID09IHBhcmFtXG59XG5cbi8vIGNscyBhcHBlbmRzIGV4dHJhIHRvIGJhc2Ugd2hlbiBvbiBpcyB0cnVlLlxuZnVuYyBjbHMoYmFzZSBzdHJpbmcsIG9uIGJvb2wsIGV4dHJhIHN0cmluZykgc3RyaW5nIHtcblx0aWYgIW9uIHtcblx0XHRyZXR1cm4gYmFzZVxuXHR9XG5cdGlmIGJhc2UgPT0gXCJcIiB7XG5cdFx0cmV0dXJuIGV4dHJhXG5cdH1cblx0cmV0dXJuIGJhc2UgKyBcIiBcIiArIGV4dHJhXG59XG5cbi8vIOKUgOKUgCBCbG9nICYgcGFnaW5hdGlvbiBoZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jIHBhZ2luYXRlZFBvc3RzKGFsbFBvc3RzIFtdQmxvZ1Bvc3QsIHBhZ2UgaW50LCBwZXJQYWdlIGludCkgW11CbG9nUG9zdCB7XG5cdGlmIGxlbihhbGxQb3N0cykgPT0gMCB7XG5cdFx0cmV0dXJuIFtdQmxvZ1Bvc3R7fVxuXHR9XG5cdG9mZnNldCA6PSBwYWdlIC0gMVxuXHRzdGFydCA6PSBvZmZzZXQgKiBwZXJQYWdlXG5cdGlmIHN0YXJ0IDwgMCB8fCBzdGFydCA+PSBsZW4oYWxsUG9zdHMpIHtcblx0XHRzdGFydCA9IDBcblx0fVxuXHRlbmQgOj0gc3RhcnQgKyBwZXJQYWdlXG5cdGlmIGVuZCA+IGxlbihhbGxQb3N0cykge1xuXHRcdGVuZCA9IGxlbihhbGxQb3N0cylcblx0fVxuXHRyZXR1cm4gYWxsUG9zdHNbc3RhcnQ6ZW5kXVxufVxuXG5mdW5jIGNhbGNUb3RhbFBhZ2VzKHRvdGFsQ291bnQgaW50LCBwZXJQYWdlIGludCkgaW50IHtcblx0aWYgcGVyUGFnZSA8PSAwIHtcblx0XHRwZXJQYWdlID0gNVxuXHR9XG5cdG51bSA6PSB0b3RhbENvdW50ICsgcGVyUGFnZSAtIDFcblx0cmV0dXJuIG51bSAvIHBlclBhZ2Vcbn1cblxuLy8gcGFnZUhyZWYgcmV0dXJucyB0aGUgY2Fub25pY2FsIFVSTCBmb3IgYSBibG9nIHBhZ2U7IHBhZ2UgMSBpcyAvYmxvZy5cbmZ1bmMgcGFnZUhyZWYocGFnZSBpbnQpIHN0cmluZyB7XG5cdGlmIHBhZ2UgPD0gMSB7XG5cdFx0cmV0dXJuIFwiL2Jsb2dcIlxuXHR9XG5cdHJldHVybiBcIi9ibG9nL3BhZ2UvXCIgKyBzdHJjb252Lkl0b2EocGFnZSlcbn1cblxuLy8gcGFnZU51bWJlcnMgcmV0dXJucyAxLi5uIGZvciB0ZW1wbCByYW5nZSBsb29wcyAodGVtcGwgYGZvcmAgb25seSBzdXBwb3J0cyByYW5nZSkuXG5mdW5jIHBhZ2VOdW1iZXJzKG4gaW50KSBbXWludCB7XG5cdG51bXMgOj0gbWFrZShbXWludCwgMCwgbilcblx0Zm9yIGkgOj0gMTsgaSA8PSBuOyBpKysge1xuXHRcdG51bXMgPSBhcHBlbmQobnVtcywgaSlcblx0fVxuXHRyZXR1cm4gbnVtc1xufVxuXG4vLyDilIDilIAgUHJvamVjdCBoZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jIGRlbW9MYWJlbChwIFByb2plY3QpIHN0cmluZyB7XG5cdGlmIHAuRGVtb0xhYmVsICE9IFwiXCIge1xuXHRcdHJldHVybiBwLkRlbW9MYWJlbFxuXHR9XG5cdHJldHVybiB0KFwicHJvamVjdC5kZW1vXCIpXG59XG5cbmZ1bmMgZGVtb1dyYXBwZXJDbGFzcyhoZWlnaHQgc3RyaW5nKSBzdHJpbmcge1xuXHRpZiBoZWlnaHQgIT0gXCJcIiB7XG5cdFx0cmV0dXJuIFwiZGVtby1pZnJhbWUtd3JhcHBlclwiXG5cdH1cblx0cmV0dXJuIFwiaWZyYW1lV3JhcHBlclwiXG59XG5cbi8vIOKUgOKUgCBTZWFyY2ggaGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuYyBzZWFyY2hQbGFjZWhvbGRlclRleHQoKSBzdHJpbmcge1xuXHRpZiBzaXRlLlNlYXJjaC5QbGFjZWhvbGRlciAhPSBcIlwiIHtcblx0XHRyZXR1cm4gc2l0ZS5TZWFyY2guUGxhY2Vob2xkZXJcblx0fVxuXHRpZiByZXMgOj0gdChcInNlYXJjaC5wbGFjZWhvbGRlclwiKTsgcmVzICE9IFwic2VhcmNoLnBsYWNlaG9sZGVyXCIge1xuXHRcdHJldHVybiByZXNcblx0fVxuXHRyZXR1cm4gXCJTZWFyY2guLi5cIlxufVxuXG4vLyBoaWdobGlnaHRNYXRjaCB3cmFwcyB0aGUgZmlyc3QgY2FzZS1pbnNlbnNpdGl2ZSBvY2N1cnJlbmNlIG9mIHF1ZXJ5IGluIDxtYXJrPjsgYWxsIHRleHQgaXMgZXNjYXBlZC5cbmZ1bmMgaGlnaGxpZ2h0TWF0Y2godGV4dCBzdHJpbmcsIHF1ZXJ5IHN0cmluZykgc3RyaW5nIHtcblx0aWYgcXVlcnkgIT0gXCJcIiB7XG5cdFx0aWYgaWR4IDo9IHN0cmluZ3MuSW5kZXgoc3RyaW5ncy5Ub0xvd2VyKHRleHQpLCBzdHJpbmdzLlRvTG93ZXIocXVlcnkpKTsgaWR4ICE9IC0xIHtcblx0XHRcdGVuZCA6PSBpZHggKyBsZW4ocXVlcnkpXG5cdFx0XHRyZXR1cm4gaHRtbC5Fc2NhcGVTdHJpbmcodGV4dFs6aWR4XSkgKyBcIjxtYXJrPlwiICsgaHRtbC5Fc2NhcGVTdHJpbmcodGV4dFtpZHg6ZW5kXSkgKyBcIjwvbWFyaz5cIiArIGh0bWwuRXNjYXBlU3RyaW5nKHRleHRbZW5kOl0pXG5cdFx0fVxuXHR9XG5cdHJldHVybiBodG1sLkVzY2FwZVN0cmluZyh0ZXh0KVxufVxuXG4vLyDilIDilIAgQ29udGFjdCBoZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jIGZvcm1TdGF0dXNDbGFzcyhzdGF0dXNUeXBlIHN0cmluZykgc3RyaW5nIHtcblx0aWYgc3RhdHVzVHlwZSAhPSBcIlwiIHtcblx0XHRyZXR1cm4gXCJmb3JtLXN0YXR1cyBcIiArIHN0YXR1c1R5cGVcblx0fVxuXHRyZXR1cm4gXCJmb3JtLXN0YXR1c1wiXG59XG5cbi8vIOKUgOKUgCBGb290ZXIgaGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuYyBjdXJyZW50WWVhcigpIGludCB7XG5cdHJldHVybiB0aW1lLk5vdygpLlllYXIoKVxufVxuXG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwianM6Li9icm93c2VyLmQudHNcIlxuaW1wb3J0IFwic3RyY29udlwiXG5pbXBvcnQgXCJzdHJpbmdzXCJcbmltcG9ydCBcInRpbWVcIlxuXG52YXIgY3VycmVudFBhdGggc3RyaW5nXG5cbmZ1bmMgc2Nyb2xsVG9IYXNoKGhhc2ggc3RyaW5nLCBzbW9vdGggYm9vbCkge1xuXHRpZiBoYXNoID09IFwiXCIge1xuXHRcdHJldHVyblxuXHR9XG5cdGlkIDo9IHN0cmluZ3MuVHJpbVByZWZpeChoYXNoLCBcIiNcIilcblx0aWYgaWQgPT0gXCJcIiB7XG5cdFx0cmV0dXJuXG5cdH1cblx0c2Nyb2xsIDo9IGZ1bmMoKSB7XG5cdFx0dGFyZ2V0RWwgOj0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG5cdFx0aWYgdGFyZ2V0RWwgIT0gbmlsIHtcblx0XHRcdGJlaGF2aW9yIDo9IFwiaW5zdGFudFwiXG5cdFx0XHRpZiBzbW9vdGgge1xuXHRcdFx0XHRiZWhhdmlvciA9IFwic21vb3RoXCJcblx0XHRcdH1cblx0XHRcdHRhcmdldEVsLnNjcm9sbEludG9WaWV3KG1hcFtzdHJpbmddYW55e1wiYmVoYXZpb3JcIjogYmVoYXZpb3J9KVxuXHRcdFx0aWYgaWQgPT0gXCJtYWluLWNvbnRlbnRcIiB7XG5cdFx0XHRcdHRhcmdldEVsLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIilcblx0XHRcdFx0dGFyZ2V0RWwuZm9jdXMobWFwW3N0cmluZ11hbnl7XCJwcmV2ZW50U2Nyb2xsXCI6IHRydWV9KVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRzY3JvbGwoKVxuXHRpZiAhc21vb3RoIHtcblx0XHRzZXRUaW1lb3V0KHNjcm9sbCwgNTApXG5cdH1cbn1cblxuZnVuYyBuYXZpZ2F0ZSh1cmwgc3RyaW5nKSB7XG5cdGN1cnIgOj0gc3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSlcblx0aWYgd2luZG93LmxvY2F0aW9uLmhhc2ggIT0gbmlsICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9IFwiXCIge1xuXHRcdGN1cnIgKz0gc3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuXHR9XG5cdGlmIHVybCAhPSBjdXJyIHtcblx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobWFwW3N0cmluZ11hbnl7fSwgXCJcIiwgdXJsKVxuXHR9XG5cdGhhbmRsZVJvdXRlKClcbn1cblxuLy8gcGFyc2VSb3V0ZSBtYXBzIGEgVVJMIHBhdGggdG8gYSBSb3V0ZU1hdGNoLiBVbmtub3duIHBhdGhzIHJlc29sdmUgdG8gUm91dGVOb3RGb3VuZC5cbmZ1bmMgcGFyc2VSb3V0ZShwYXRoIHN0cmluZykgUm91dGVNYXRjaCB7XG5cdGlmIGxlbihwYXRoKSA+IDEge1xuXHRcdHBhdGggPSBzdHJpbmdzLlRyaW1TdWZmaXgocGF0aCwgXCIvXCIpXG5cdH1cblx0aWYgcGF0aCA9PSBcIlwiIHx8IHBhdGggPT0gXCIvXCIgfHwgcGF0aCA9PSBcIi9ibG9nXCIge1xuXHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlQmxvZywgUGFnZTogMX1cblx0fVxuXHRpZiByZXN0LCBvayA6PSBzdHJpbmdzLkN1dFByZWZpeChwYXRoLCBcIi9ibG9nL3BhZ2UvXCIpOyBvayB7XG5cdFx0biwgZXJyIDo9IHN0cmNvbnYuQXRvaShyZXN0KVxuXHRcdGlmIGVyciAhPSBuaWwgfHwgbiA8IDEge1xuXHRcdFx0biA9IDFcblx0XHR9XG5cdFx0cmV0dXJuIFJvdXRlTWF0Y2h7S2luZDogUm91dGVCbG9nLCBQYWdlOiBufVxuXHR9XG5cdGlmIHNsdWcsIG9rIDo9IHN0cmluZ3MuQ3V0UHJlZml4KHBhdGgsIFwiL2Jsb2cvXCIpOyBvayB7XG5cdFx0c2x1ZyA9IHN0cmluZ3MuVHJpbVByZWZpeChzbHVnLCBcInBvc3QvXCIpXG5cdFx0aWYgc2x1ZyA9PSBcIlwiIHtcblx0XHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlTm90Rm91bmR9XG5cdFx0fVxuXHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlUG9zdCwgUGFyYW06IHNsdWd9XG5cdH1cblx0aWYgaWQsIG9rIDo9IHN0cmluZ3MuQ3V0UHJlZml4KHBhdGgsIFwiL3Byb2plY3QvXCIpOyBvayB7XG5cdFx0aWYgaWQgPT0gXCJcIiB7XG5cdFx0XHRyZXR1cm4gUm91dGVNYXRjaHtLaW5kOiBSb3V0ZU5vdEZvdW5kfVxuXHRcdH1cblx0XHRyZXR1cm4gUm91dGVNYXRjaHtLaW5kOiBSb3V0ZVByb2plY3QsIFBhcmFtOiBpZH1cblx0fVxuXHRpZiBpZCwgb2sgOj0gc3RyaW5ncy5DdXRQcmVmaXgocGF0aCwgXCIvcGFnZS9cIik7IG9rIHtcblx0XHRpZiBpZCA9PSBcIlwiIHtcblx0XHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlTm90Rm91bmR9XG5cdFx0fVxuXHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlUGFnZSwgUGFyYW06IGlkfVxuXHR9XG5cdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlTm90Rm91bmR9XG59XG5cbmZ1bmMgaW5pdEluaXRpYWxSb3V0ZSgpIHtcblx0cGF0aCA6PSBzdHJWYWwod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKVxuXHRjdXJyZW50UGF0aCA9IHBhdGhcblx0cm91dGUgPSBwYXJzZVJvdXRlKHBhdGgpXG5cdHN3aXRjaCByb3V0ZS5LaW5kIHtcblx0Y2FzZSBSb3V0ZVBvc3Q6XG5cdFx0dmlldywgXyA9IHJlc29sdmVQb3N0KHJvdXRlLlBhcmFtLCBwb3N0cywgY29udGVudENhY2hlKVxuXHRjYXNlIFJvdXRlUHJvamVjdDpcblx0XHR2aWV3LCBfID0gcmVzb2x2ZVByb2plY3Qocm91dGUuUGFyYW0sIHByb2plY3RzLCBjb250ZW50Q2FjaGUpXG5cdGNhc2UgUm91dGVQYWdlOlxuXHRcdHZpZXcsIF8gPSByZXNvbHZlUGFnZShyb3V0ZS5QYXJhbSwgbmF2UGFnZXMsIGNvbnRlbnRDYWNoZSlcblx0ZGVmYXVsdDpcblx0XHR2aWV3ID0gbmV3Vmlld1N0YXRlKClcblx0fVxufVxuXG52YXIgaXNJbml0aWFsUm91dGUgPSB0cnVlXG5cbi8vIHJvdXRlU2VxIGlzIGJ1bXBlZCBvbiBldmVyeSBuYXZpZ2F0aW9uIHNvIGFuIGluLWZsaWdodCBsb2FkZXIgY2FuIHRlbGwgaXRcbi8vIGhhcyBiZWVuIHN1cGVyc2VkZWQgYW5kIG11c3Qgbm90IHRvdWNoIGB2aWV3YC5cbnZhciByb3V0ZVNlcSBpbnRcblxuLy8gYmVnaW5OYXZpZ2F0aW9uIGNsYWltcyB0aGUgbmV4dCByb3V0ZVNlcSBhbmQgcmV0dXJucyBhIGNoZWNrIHRoYXQgcmVwb3J0c1xuLy8gd2hldGhlciB0aGF0IG5hdmlnYXRpb24gaXMgc3RpbGwgdGhlIGxhdGVzdCBvbmUuXG5mdW5jIGJlZ2luTmF2aWdhdGlvbigpIGZ1bmMoKSBib29sIHtcblx0cm91dGVTZXErK1xuXHRzZXEgOj0gcm91dGVTZXFcblx0cmV0dXJuIGZ1bmMoKSBib29sIHsgcmV0dXJuIHNlcSA9PSByb3V0ZVNlcSB9XG59XG5cbmFzeW5jIGZ1bmMgaGFuZGxlUm91dGUoKSB7XG5cdGlzQ3VycmVudCA6PSBiZWdpbk5hdmlnYXRpb24oKVxuXHRyZXNldE92ZXJsYXlzKClcblxuXHQvLyBHaXRIdWIgUGFnZXMgc2VydmVzIDQwNC5odG1sIChhIGNvcHkgb2YgdGhlIGFwcCBzaGVsbCkgYXQgdGhlIG9yaWdpbmFsIFVSTCxcblx0Ly8gc28gdW5rbm93biBkZWVwIGxpbmtzIGFycml2ZSBoZXJlIHdpdGggdGhlaXIgcmVhbCBwYXRobmFtZSBpbnRhY3QuXG5cdHBhdGggOj0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXG5cblx0aWYgIWlzSW5pdGlhbFJvdXRlIHtcblx0XHRtYWluRWwgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLWNvbnRlbnRcIilcblx0XHRpZiBtYWluRWwgIT0gbmlsIHtcblx0XHRcdG1haW5FbC5jbGFzc0xpc3QuYWRkKFwicGFnZS10cmFuc2l0aW9uLW91dFwiKVxuXHRcdFx0dGltZS5TbGVlcCgyMDAgKiB0aW1lLk1pbGxpc2Vjb25kKVxuXHRcdH1cblx0fVxuXHRpc0luaXRpYWxSb3V0ZSA9IGZhbHNlXG5cblx0Ly8gQSBuYXZpZ2F0aW9uIHRoYXQgc3RhcnRlZCBkdXJpbmcgdGhlIGZhZGUgb3ducyB0aGUgdmlldyBmcm9tIGhlcmUgb24uXG5cdGlmICFpc0N1cnJlbnQoKSB7XG5cdFx0cmV0dXJuXG5cdH1cblxuXHRjdXJyZW50UGF0aCA9IHBhdGhcblx0cm91dGUgPSBwYXJzZVJvdXRlKHBhdGgpXG5cdHZpZXcgPSBuZXdWaWV3U3RhdGUoKVxuXG5cdC8vIFJlc2V0IHNjcm9sbCB3aGlsZSB0aGUgb2xkIGNvbnRlbnQgaXMgZmFkZWQgb3V0LCBzbyB0aGUgbmV3IHJvdXRlIHBhaW50cyBhdCB0aGUgdG9wLlxuXHR3aW5kb3cuc2Nyb2xsVG8obWFwW3N0cmluZ11hbnl7XCJ0b3BcIjogMCwgXCJsZWZ0XCI6IDAsIFwiYmVoYXZpb3JcIjogXCJpbnN0YW50XCJ9KVxuXHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMFxuXHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDBcblxuXHRzd2l0Y2ggcm91dGUuS2luZCB7XG5cdGNhc2UgUm91dGVQb3N0OlxuXHRcdGF3YWl0IHNob3dQb3N0KHJvdXRlLlBhcmFtKVxuXHRjYXNlIFJvdXRlUHJvamVjdDpcblx0XHRhd2FpdCBzaG93UHJvamVjdChyb3V0ZS5QYXJhbSlcblx0Y2FzZSBSb3V0ZVBhZ2U6XG5cdFx0YXdhaXQgc2hvd1BhZ2Uocm91dGUuUGFyYW0pXG5cdGNhc2UgUm91dGVOb3RGb3VuZDpcblx0XHRzaG93Tm90Rm91bmQoKVxuXHRkZWZhdWx0OlxuXHRcdHNob3dCbG9nKHJvdXRlLlBhZ2UpXG5cdH1cblxuXHQvLyBUaGUgbG9hZGVyIG1heSBoYXZlIGF3YWl0ZWQgYSBmZXRjaCB3aGlsZSBhIG5ld2VyIG5hdmlnYXRpb24gdG9vayBvdmVyLlxuXHRpZiAhaXNDdXJyZW50KCkge1xuXHRcdHJldHVyblxuXHR9XG5cblx0bWFpbkVsIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi1jb250ZW50XCIpXG5cdGlmIG1haW5FbCAhPSBuaWwge1xuXHRcdG1haW5FbC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpXG5cdFx0bWFpbkVsLmZvY3VzKG1hcFtzdHJpbmddYW55e1wicHJldmVudFNjcm9sbFwiOiB0cnVlfSlcblx0XHRzZXRUaW1lb3V0KGZ1bmMoKSB7XG5cdFx0XHRtYWluRWwucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIilcblx0XHR9LCAxMDApXG5cdH1cblxuXHRoYXNoIDo9IHN0cmluZyh3aW5kb3cubG9jYXRpb24uaGFzaClcblx0aWYgaGFzaCAhPSBcIlwiIHtcblx0XHRzY3JvbGxUb0hhc2goaGFzaCwgZmFsc2UpXG5cdH1cbn1cblxuZnVuYyBzaG93QmxvZyhwYWdlIGludCkge1xuXHR0aXRsZSA6PSBzaXRlLlRpdGxlXG5cdGNhbm9uaWNhbCA6PSBcIi9ibG9nXCJcblx0aWYgcGFnZSA+IDEge1xuXHRcdHRpdGxlID0gdChcIm5hdi5ibG9nXCIpICsgXCIgLSBcIiArIHNpdGUuVGl0bGVcblx0XHRjYW5vbmljYWwgPSBcIi9ibG9nL3BhZ2UvXCIgKyBzdHJjb252Lkl0b2EocGFnZSlcblx0fVxuXHR1cGRhdGVSb3V0ZU1ldGEodGl0bGUsIHNpdGUuRGVzY3JpcHRpb24sIGNhbm9uaWNhbClcblx0cmVuZGVyUm91dGUoKVxufVxuXG5mdW5jIHNob3dOb3RGb3VuZCgpIHtcblx0dXBkYXRlUm91dGVNZXRhKHQoXCJnZW5lcmFsLm5vdEZvdW5kXCIpK1wiIC0gXCIrc2l0ZS5UaXRsZSwgdChcImdlbmVyYWwubm90Rm91bmRNZXNzYWdlXCIpLCBjdXJyZW50UGF0aClcblx0cmVuZGVyUm91dGUoKVxufVxuXG4vLyBsb2FkUm91dGUgZmV0Y2hlcyB1cmwsIHJlbmRlcnMgaXQgd2l0aCB0cmFuc2Zvcm0gYW5kIGNhY2hlcyB0aGUgcmVzdWx0IHVuZGVyXG4vLyBrZXkuIEl0IHJlcG9ydHMgd2hldGhlciB0aGUgcm91dGUgaXMgc3RpbGwgY3VycmVudDsgd2hlbiBzdXBlcnNlZGVkIGJ5IGFcbi8vIG5ld2VyIG5hdmlnYXRpb24gdGhlIGNhY2hlIGlzIGZpbGxlZCBidXQgdmlldyBpcyBsZWZ0IHVudG91Y2hlZC5cbmFzeW5jIGZ1bmMgbG9hZFJvdXRlKGtleSBzdHJpbmcsIHVybCBzdHJpbmcsIHRyYW5zZm9ybSBmdW5jKHN0cmluZykgY2FjaGVkQ29udGVudCkgYm9vbCB7XG5cdHNlcSA6PSByb3V0ZVNlcVxuXHRtZFRleHQsIGVyciA6PSBhd2FpdCBsb2FkTWFya2Rvd25GaWxlKHVybClcblx0aWYgZXJyID09IG5pbCB7XG5cdFx0Y29udGVudENhY2hlW2tleV0gPSB0cmFuc2Zvcm0obWRUZXh0KVxuXHR9XG5cdGlmIHNlcSAhPSByb3V0ZVNlcSB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0aWYgZXJyICE9IG5pbCB7XG5cdFx0dmlldy5TdGF0dXMgPSBMb2FkRmFpbGVkXG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXHRjIDo9IGNvbnRlbnRDYWNoZVtrZXldXG5cdHZpZXcuSFRNTCA9IGMuSFRNTFxuXHR2aWV3LlRPQyA9IGMuVE9DXG5cdHZpZXcuU3RhdHVzID0gTG9hZFJlYWR5XG5cdHJldHVybiB0cnVlXG59XG5cbi8vIHJlbmRlclBvc3QgdHVybnMgYSBibG9nIG1hcmtkb3duIGZpbGUgaW50byBjYWNoZWQgY29udGVudC5cbmZ1bmMgcmVuZGVyUG9zdChtZFRleHQgc3RyaW5nKSBjYWNoZWRDb250ZW50IHtcblx0Y29udGVudCA6PSBzdHJpcEZyb250bWF0dGVyKG1kVGV4dClcblx0dG9jIDo9IGV4dHJhY3RUT0MoY29udGVudClcblx0cmV0dXJuIGNhY2hlZENvbnRlbnR7SFRNTDogaW5qZWN0SGVhZGluZ0lEcyhwYXJzZU1hcmtkb3duKGNvbnRlbnQpLCB0b2MpLCBUT0M6IHRvY31cbn1cblxuLy8gcmVuZGVyUmVhZG1lIHR1cm5zIGEgcHJvamVjdCBSRUFETUUgaW50byBjYWNoZWQgY29udGVudCB3aG9zZSBUT0MgYWxzb1xuLy8gY292ZXJzIHRoZSBNZWRpYS9EZW1vL0xpbmtzIHNlY3Rpb25zLlxuZnVuYyByZW5kZXJSZWFkbWUocCBQcm9qZWN0KSBmdW5jKHN0cmluZykgY2FjaGVkQ29udGVudCB7XG5cdHJldHVybiBmdW5jKG1kVGV4dCBzdHJpbmcpIGNhY2hlZENvbnRlbnQge1xuXHRcdHJldHVybiBjYWNoZWRDb250ZW50e1xuXHRcdFx0SFRNTDogaW5qZWN0SGVhZGluZ0lEcyhwYXJzZU1hcmtkb3duKG1kVGV4dCksIGV4dHJhY3RUT0MobWRUZXh0KSksXG5cdFx0XHRUT0M6ICBleHRyYWN0UHJvamVjdFRPQyhtZFRleHQsIHApLFxuXHRcdH1cblx0fVxufVxuXG5mdW5jIHJlbmRlclBhZ2UobWRUZXh0IHN0cmluZykgY2FjaGVkQ29udGVudCB7XG5cdHJldHVybiBjYWNoZWRDb250ZW50e0hUTUw6IHBhcnNlTWFya2Rvd24obWRUZXh0KSwgVE9DOiBbXVRPQ0l0ZW17fX1cbn1cblxuYXN5bmMgZnVuYyBzaG93UG9zdChzbHVnIHN0cmluZykge1xuXHR2LCBuZWVkc0ZldGNoIDo9IHJlc29sdmVQb3N0KHNsdWcsIHBvc3RzLCBjb250ZW50Q2FjaGUpXG5cdHZpZXcgPSB2XG5cdGlmIHZpZXcuU3RhdHVzID09IExvYWROb3RGb3VuZCB7XG5cdFx0dXBkYXRlUm91dGVNZXRhKHQoXCJnZW5lcmFsLmJsb2dOb3RGb3VuZFwiKStcIiAtIFwiK3NpdGUuVGl0bGUsIHQoXCJnZW5lcmFsLmJsb2dOb3RGb3VuZE1lc3NhZ2VcIiksIFwiL2Jsb2cvXCIrc2x1Zylcblx0XHRyZW5kZXJSb3V0ZSgpXG5cdFx0cmV0dXJuXG5cdH1cblxuXHR1cGRhdGVSb3V0ZU1ldGEodmlldy5Qb3N0LlRpdGxlK1wiIC0gXCIrc2l0ZS5UaXRsZSwgdmlldy5Qb3N0LkV4Y2VycHQsIHZpZXcuUG9zdC5IcmVmKVxuXHRpZiBuZWVkc0ZldGNoIHtcblx0XHRpZiAhYXdhaXQgbG9hZFJvdXRlKHZpZXcuUG9zdC5IcmVmLCBcIi9kYXRhL2Jsb2cvXCIrdmlldy5Qb3N0LkZpbGVuYW1lLCByZW5kZXJQb3N0KSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdH1cblx0cmVuZGVyUm91dGUoKVxuXHRpZiB2aWV3LlN0YXR1cyAhPSBMb2FkUmVhZHkge1xuXHRcdHJldHVyblxuXHR9XG5cdGhpZ2hsaWdodENvZGUoKVxuXHRsb2FkR2lzY3VzKClcbn1cblxuYXN5bmMgZnVuYyBzaG93UHJvamVjdChpZCBzdHJpbmcpIHtcblx0diwgbmVlZHNGZXRjaCA6PSByZXNvbHZlUHJvamVjdChpZCwgcHJvamVjdHMsIGNvbnRlbnRDYWNoZSlcblx0dmlldyA9IHZcblx0aWYgdmlldy5TdGF0dXMgPT0gTG9hZE5vdEZvdW5kIHtcblx0XHR1cGRhdGVSb3V0ZU1ldGEodChcImdlbmVyYWwucHJvamVjdE5vdEZvdW5kXCIpK1wiIC0gXCIrc2l0ZS5UaXRsZSwgdChcImdlbmVyYWwucHJvamVjdE5vdEZvdW5kTWVzc2FnZVwiKSwgXCIvcHJvamVjdC9cIitpZClcblx0XHRyZW5kZXJSb3V0ZSgpXG5cdFx0cmV0dXJuXG5cdH1cblxuXHR1cGRhdGVSb3V0ZU1ldGEodmlldy5Qcm9qLlRpdGxlK1wiIC0gXCIrc2l0ZS5UaXRsZSwgdmlldy5Qcm9qLkRlc2NyaXB0aW9uLCB2aWV3LlByb2ouSHJlZilcblx0aWYgbmVlZHNGZXRjaCB7XG5cdFx0aWYgIWF3YWl0IGxvYWRSb3V0ZSh2aWV3LlByb2ouSHJlZiwgcmVhZG1lVVJMKHZpZXcuUHJvaiwgc2l0ZS5HaXRodWJVc2VybmFtZSksIHJlbmRlclJlYWRtZSh2aWV3LlByb2opKSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdH1cblx0cmVuZGVyUm91dGUoKVxuXHRoaWdobGlnaHRDb2RlKClcblx0bG9hZEdpc2N1cygpXG59XG5cbmFzeW5jIGZ1bmMgc2hvd1BhZ2UoaWQgc3RyaW5nKSB7XG5cdHYsIG5lZWRzRmV0Y2ggOj0gcmVzb2x2ZVBhZ2UoaWQsIG5hdlBhZ2VzLCBjb250ZW50Q2FjaGUpXG5cdHZpZXcgPSB2XG5cdHVwZGF0ZVJvdXRlTWV0YSh2aWV3LlBhZ2UuVGl0bGUrXCIgLSBcIitzaXRlLlRpdGxlLCBzaXRlLkRlc2NyaXB0aW9uLCB2aWV3LlBhZ2UuSHJlZilcblx0aWYgbmVlZHNGZXRjaCB7XG5cdFx0aWYgIWF3YWl0IGxvYWRSb3V0ZSh2aWV3LlBhZ2UuSHJlZiwgXCIvZGF0YS9wYWdlcy9cIitpZCtcIi5tZFwiLCByZW5kZXJQYWdlKSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdH1cblx0cmVuZGVyUm91dGUoKVxuXHRoaWdobGlnaHRDb2RlKClcbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJqczouL2Jyb3dzZXIuZC50c1wiXG5pbXBvcnQgXCJzdHJpbmdzXCJcblxudmFyIGZ1c2VJbnN0YW5jZSBhbnlcbnZhciBzZWFyY2hEZWJvdW5jZVRpbWVyIGFueVxuXG5mdW5jIGluaXRTZWFyY2goKSB7XG5cdHZhciBzZWFyY2hJdGVtcyBbXWFueVxuXG5cdC8vIEluZGV4IHByb2plY3RzXG5cdGZvciBfLCBwIDo9IHJhbmdlIHByb2plY3RzIHtcblx0XHRpdGVtIDo9IG1hcFtzdHJpbmddYW55e1xuXHRcdFx0XCJpZFwiOiAgICAgICAgICBwLklELFxuXHRcdFx0XCJ0aXRsZVwiOiAgICAgICBwLlRpdGxlLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBwLkRlc2NyaXB0aW9uLFxuXHRcdFx0XCJ0YWdzXCI6ICAgICAgICBwLlRhZ3MsXG5cdFx0XHRcInR5cGVcIjogICAgICAgIFwicHJvamVjdFwiLFxuXHRcdFx0XCJ1cmxcIjogICAgICAgICBwLkhyZWYsXG5cdFx0fVxuXHRcdHNlYXJjaEl0ZW1zID0gYXBwZW5kKHNlYXJjaEl0ZW1zLCBpdGVtKVxuXHR9XG5cblx0Ly8gSW5kZXggYmxvZyBwb3N0c1xuXHRmb3IgXywgcCA6PSByYW5nZSBwb3N0cyB7XG5cdFx0aXRlbSA6PSBtYXBbc3RyaW5nXWFueXtcblx0XHRcdFwiaWRcIjogICAgICAgICAgcC5TbHVnLFxuXHRcdFx0XCJ0aXRsZVwiOiAgICAgICBwLlRpdGxlLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBwLkV4Y2VycHQsXG5cdFx0XHRcInRhZ3NcIjogICAgICAgIHAuVGFncyxcblx0XHRcdFwidHlwZVwiOiAgICAgICAgXCJibG9nXCIsXG5cdFx0XHRcInVybFwiOiAgICAgICAgIHAuSHJlZixcblx0XHR9XG5cdFx0c2VhcmNoSXRlbXMgPSBhcHBlbmQoc2VhcmNoSXRlbXMsIGl0ZW0pXG5cdH1cblxuXHRvcHRpb25zIDo9IG1hcFtzdHJpbmddYW55e1xuXHRcdFwia2V5c1wiOiBbXWFueXtcblx0XHRcdG1hcFtzdHJpbmddYW55e1wibmFtZVwiOiBcInRpdGxlXCIsIFwid2VpZ2h0XCI6IDAuNH0sXG5cdFx0XHRtYXBbc3RyaW5nXWFueXtcIm5hbWVcIjogXCJkZXNjcmlwdGlvblwiLCBcIndlaWdodFwiOiAwLjN9LFxuXHRcdFx0bWFwW3N0cmluZ11hbnl7XCJuYW1lXCI6IFwidGFnc1wiLCBcIndlaWdodFwiOiAwLjJ9LFxuXHRcdH0sXG5cdFx0XCJ0aHJlc2hvbGRcIjogICAgICAgICAgMC40LFxuXHRcdFwibWluTWF0Y2hDaGFyTGVuZ3RoXCI6IHNlYXJjaE1pbkNoYXJzKCksXG5cdH1cblxuXHQvLyBHbyBoYXMgbm8gYG5ld2A7IEZ1c2UgaXMgYSBjbGFzcyBleHBvc2VkIG9uIHdpbmRvdyBieSB2ZW5kb3IuanNcblx0ZnVzZUluc3RhbmNlID0gUmVmbGVjdC5jb25zdHJ1Y3Qod2luZG93LkZ1c2UsIFtdYW55e3NlYXJjaEl0ZW1zLCBvcHRpb25zfSlcbn1cblxuZnVuYyBzZWFyY2hNaW5DaGFycygpIGludCB7XG5cdGlmIHNpdGUuU2VhcmNoLk1pbkNoYXJzID4gMCB7XG5cdFx0cmV0dXJuIHNpdGUuU2VhcmNoLk1pbkNoYXJzXG5cdH1cblx0cmV0dXJuIDJcbn1cblxuZnVuYyBwZXJmb3JtU2VhcmNoKHEgc3RyaW5nKSBbXVNlYXJjaFJlc3VsdEl0ZW0ge1xuXHR0cmltbWVkIDo9IHN0cmluZ3MuVHJpbVNwYWNlKHEpXG5cdGlmIGxlbih0cmltbWVkKSA8IHNlYXJjaE1pbkNoYXJzKCkgfHwgZnVzZUluc3RhbmNlID09IG5pbCB7XG5cdFx0cmV0dXJuIFtdU2VhcmNoUmVzdWx0SXRlbXt9XG5cdH1cblxuXHRyZXN1bHRzIDo9IGZ1c2VJbnN0YW5jZS5zZWFyY2godHJpbW1lZClcblx0b3V0IDo9IFtdU2VhcmNoUmVzdWx0SXRlbXt9XG5cdG1heFJlc3VsdHMgOj0gOFxuXHRpZiBsZW4ocmVzdWx0cykgPCBtYXhSZXN1bHRzIHtcblx0XHRtYXhSZXN1bHRzID0gbGVuKHJlc3VsdHMpXG5cdH1cblxuXHRmb3IgaSA6PSAwOyBpIDwgbWF4UmVzdWx0czsgaSsrIHtcblx0XHRyYXdJdGVtIDo9IHJlc3VsdHNbaV0uaXRlbVxuXHRcdHRhZ3MgOj0gW11zdHJpbmd7fVxuXHRcdGlmIHJhd0l0ZW0udGFncyAhPSBuaWwge1xuXHRcdFx0Zm9yIF8sIHQgOj0gcmFuZ2UgcmF3SXRlbS50YWdzIHtcblx0XHRcdFx0dGFncyA9IGFwcGVuZCh0YWdzLCBzdHJpbmcodCkpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0b3V0ID0gYXBwZW5kKG91dCwgU2VhcmNoUmVzdWx0SXRlbXtcblx0XHRcdElEOiAgICAgICAgICBzdHJpbmcocmF3SXRlbS5pZCksXG5cdFx0XHRUaXRsZTogICAgICAgc3RyaW5nKHJhd0l0ZW0udGl0bGUpLFxuXHRcdFx0RGVzY3JpcHRpb246IHN0cmluZyhyYXdJdGVtLmRlc2NyaXB0aW9uKSxcblx0XHRcdFRhZ3M6ICAgICAgICB0YWdzLFxuXHRcdFx0SXRlbVR5cGU6ICAgIHN0cmluZyhyYXdJdGVtLnR5cGUpLFxuXHRcdFx0VXJsOiAgICAgICAgIHN0cmluZyhyYXdJdGVtLnVybCksXG5cdFx0fSlcblx0fVxuXG5cdHJldHVybiBvdXRcbn1cblxudmFyIHNlYXJjaFNlbGVjdGVkSW5kZXggPSAtMVxuXG5mdW5jIHNjcm9sbFNlbGVjdGVkU2VhcmNoUmVzdWx0SW50b1ZpZXcoKSB7XG5cdGVsIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLXJlc3VsdC1pdGVtLnNlbGVjdGVkXCIpXG5cdGlmIGVsICE9IG5pbCB7XG5cdFx0ZWwuc2Nyb2xsSW50b1ZpZXcobWFwW3N0cmluZ11hbnl7XCJibG9ja1wiOiBcIm5lYXJlc3RcIiwgXCJiZWhhdmlvclwiOiBcInNtb290aFwifSlcblx0fVxufVxuXG5mdW5jIHNlYXJjaFNlbGVjdE5leHQoKSB7XG5cdGlmIGxlbihzZWFyY2hSZXN1bHRzKSA9PSAwIHtcblx0XHRyZXR1cm5cblx0fVxuXHRzZWFyY2hTZWxlY3RlZEluZGV4Kytcblx0aWYgc2VhcmNoU2VsZWN0ZWRJbmRleCA+PSBsZW4oc2VhcmNoUmVzdWx0cykge1xuXHRcdHNlYXJjaFNlbGVjdGVkSW5kZXggPSAwXG5cdH1cblx0cmVuZGVyU2VhcmNoUmVzdWx0cygpXG5cdHNjcm9sbFNlbGVjdGVkU2VhcmNoUmVzdWx0SW50b1ZpZXcoKVxufVxuXG5mdW5jIHNlYXJjaFNlbGVjdFByZXYoKSB7XG5cdGlmIGxlbihzZWFyY2hSZXN1bHRzKSA9PSAwIHtcblx0XHRyZXR1cm5cblx0fVxuXHRzZWFyY2hTZWxlY3RlZEluZGV4LS1cblx0aWYgc2VhcmNoU2VsZWN0ZWRJbmRleCA8IDAge1xuXHRcdHNlYXJjaFNlbGVjdGVkSW5kZXggPSBsZW4oc2VhcmNoUmVzdWx0cykgLSAxXG5cdH1cblx0cmVuZGVyU2VhcmNoUmVzdWx0cygpXG5cdHNjcm9sbFNlbGVjdGVkU2VhcmNoUmVzdWx0SW50b1ZpZXcoKVxufVxuXG5mdW5jIHNlYXJjaEhhc1NlbGVjdGlvbigpIGJvb2wge1xuXHRyZXR1cm4gc2VhcmNoU2VsZWN0ZWRJbmRleCA+PSAwICYmIHNlYXJjaFNlbGVjdGVkSW5kZXggPCBsZW4oc2VhcmNoUmVzdWx0cylcbn1cblxuZnVuYyBzZWFyY2hPcGVuU2VsZWN0ZWQoKSB7XG5cdGlmIHNlYXJjaEhhc1NlbGVjdGlvbigpIHtcblx0XHR1cmwgOj0gc2VhcmNoUmVzdWx0c1tzZWFyY2hTZWxlY3RlZEluZGV4XS5Vcmxcblx0XHRjbG9zZVNlYXJjaCgpXG5cdFx0bmF2aWdhdGUodXJsKVxuXHR9XG59XG5cbmZ1bmMgcmVuZGVyU2VhcmNoUmVzdWx0cygpIHtcblx0ZWwgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2gtcGFnZS1yZXN1bHRzXCIpXG5cdGlmIGVsICE9IG5pbCB7XG5cdFx0Z29tLk1vdW50KFwiI3NlYXJjaC1wYWdlLXJlc3VsdHNcIiwgU2VhcmNoUmVzdWx0c0xpc3Qoc2VhcmNoUmVzdWx0cywgc2VhcmNoUXVlcnksIHNlYXJjaFNlbGVjdGVkSW5kZXgpKVxuXHR9XG59XG5cbi8vIHNldFNlYXJjaElucHV0IHdyaXRlcyB0aGUgaW5wdXQncyB2YWx1ZTsgaXQgaXMgdXNlci1vd25lZCBET00gc3RhdGUsIG5vdCBkZXJpdmVkLlxuZnVuYyBzZXRTZWFyY2hJbnB1dCh2IHN0cmluZykge1xuXHRpbnAgOj0gYXBwUmVmc1tcInNlYXJjaElucHV0XCJdXG5cdGlmIGlucCA9PSBuaWwgJiYgZG9jdW1lbnQgIT0gbmlsIHtcblx0XHRpbnAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaC1wYWdlLWlucHV0XCIpXG5cdH1cblx0aWYgaW5wICE9IG5pbCB7XG5cdFx0aW5wLnZhbHVlID0gdlxuXHR9XG59XG5cbi8vIHNldFNlYXJjaFF1ZXJ5IHVwZGF0ZXMgcXVlcnkgKyByZXN1bHRzIHRvZ2V0aGVyIGFuZCByZS1yZW5kZXJzIHRoZSBsaXN0LlxuZnVuYyBzZXRTZWFyY2hRdWVyeShxIHN0cmluZykge1xuXHRzZWFyY2hRdWVyeSA9IHFcblx0c2VhcmNoU2VsZWN0ZWRJbmRleCA9IC0xXG5cdHNlYXJjaFJlc3VsdHMgPSBwZXJmb3JtU2VhcmNoKHEpXG5cdHNldFNlYXJjaElucHV0KHEpXG5cdHJlbmRlclNlYXJjaFJlc3VsdHMoKVxufVxuXG5mdW5jIG9wZW5TZWFyY2goKSB7XG5cdG9wZW5TZWFyY2hXaXRoVGFnKFwiXCIpXG59XG5cbi8vIG9wZW5TZWFyY2hXaXRoVGFnIHJlc2V0cyB0aGUgcXVlcnkgb24gb3BlbiAobm90IG9uIGNsb3NlKSBzbyB0aGUgcmVzdWx0c1xuLy8gZG9uJ3QgdmFuaXNoIHdoaWxlIHRoZSBvdmVybGF5IGlzIHN0aWxsIGZhZGluZyBvdXQuXG5mdW5jIG9wZW5TZWFyY2hXaXRoVGFnKHRhZyBzdHJpbmcpIHtcblx0Y2xvc2VNZW51cygpXG5cdHNlYXJjaE9wZW4gPSB0cnVlXG5cdHNldFNlYXJjaFF1ZXJ5KHRhZylcblx0c3luY092ZXJsYXlzKClcblx0Zm9jdXNMYXRlcihcIiNzZWFyY2gtcGFnZS1pbnB1dFwiKVxufVxuXG5mdW5jIGNsZWFyU2VhcmNoKCkge1xuXHRzZXRTZWFyY2hRdWVyeShcIlwiKVxuXHRzeW5jT3ZlcmxheXMoKVxuXHRmb2N1c0xhdGVyKFwiI3NlYXJjaC1wYWdlLWlucHV0XCIpXG59XG5cbi8vIGNsb3NlU2VhcmNoIGhpZGVzIHRoZSBvdmVybGF5OyB0aGUgZXhpdCBmYWRlIGlzIENTUy1vbmx5ICgjc2VhcmNoLXBhZ2UgdHJhbnNpdGlvbikuXG5mdW5jIGNsb3NlU2VhcmNoKCkge1xuXHRpZiAhc2VhcmNoT3BlbiB7XG5cdFx0cmV0dXJuXG5cdH1cblx0c2VhcmNoT3BlbiA9IGZhbHNlXG5cdHN5bmNPdmVybGF5cygpXG59XG5cbmZ1bmMgaGFuZGxlU2VhcmNoSW5wdXQodmFsdWUgc3RyaW5nKSB7XG5cdHNlYXJjaFF1ZXJ5ID0gdmFsdWVcblx0c2VhcmNoU2VsZWN0ZWRJbmRleCA9IC0xXG5cdHN5bmNPdmVybGF5cygpXG5cdGlmIHNlYXJjaERlYm91bmNlVGltZXIgIT0gbmlsIHtcblx0XHRjbGVhclRpbWVvdXQoc2VhcmNoRGVib3VuY2VUaW1lcilcblx0fVxuXHRzZWFyY2hEZWJvdW5jZVRpbWVyID0gc2V0VGltZW91dChmdW5jKCkge1xuXHRcdHNlYXJjaFJlc3VsdHMgPSBwZXJmb3JtU2VhcmNoKHNlYXJjaFF1ZXJ5KVxuXHRcdHJlbmRlclNlYXJjaFJlc3VsdHMoKVxuXHR9LCAxNTApXG59XG4iLCJwYWNrYWdlIG1haW5cblxudGVtcGwgU2VhcmNoUmVzdWx0c0xpc3QocmVzdWx0cyBbXVNlYXJjaFJlc3VsdEl0ZW0sIHF1ZXJ5IHN0cmluZywgc2VsZWN0ZWRJbmRleCBpbnQpIHtcblx0aWYgcXVlcnkgIT0gXCJcIiAmJiBsZW4ocmVzdWx0cykgPT0gMCB7XG5cdFx0PGRpdiBjbGFzcz1cInNlYXJjaC1uby1yZXN1bHRzXCI+XG5cdFx0XHRASWNvbihcInNlYXJjaFwiLCBcIjNyZW1cIilcblx0XHRcdDxwPnsgdChcInNlYXJjaC5ub1Jlc3VsdHNcIikgfTwvcD5cblx0XHQ8L2Rpdj5cblx0fSBlbHNlIHtcblx0XHRmb3IgaSwgaXRlbSA6PSByYW5nZSByZXN1bHRzIHtcblx0XHRcdDxhcnRpY2xlIGNsYXNzPXsgY2xzKFwic2VhcmNoLXJlc3VsdC1pdGVtIGJsb2ctcG9zdC1jYXJkXCIsIGkgPT0gc2VsZWN0ZWRJbmRleCwgXCJzZWxlY3RlZFwiKSB9IGRhdGEtYWN0aW9uPVwib3Blbi1wb3N0XCIgZGF0YS1ocmVmPXsgaXRlbS5VcmwgfT5cblx0XHRcdFx0PGgyIGNsYXNzPVwiYmxvZy1wb3N0LXRpdGxlXCI+XG5cdFx0XHRcdFx0PGEgaHJlZj17IGl0ZW0uVXJsIH0gZGF0YS1hY3Rpb249XCJuYXZcIj5AdGVtcGwuUmF3KGhpZ2hsaWdodE1hdGNoKGl0ZW0uVGl0bGUsIHF1ZXJ5KSk8L2E+XG5cdFx0XHRcdDwvaDI+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJibG9nLXBvc3QtbWV0YVwiPlxuXHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiYmxvZy1wb3N0LXRhZ3NcIj5cblx0XHRcdFx0XHRcdGlmIGl0ZW0uSXRlbVR5cGUgPT0gXCJwcm9qZWN0XCIge1xuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIml0ZW0tdGFnXCI+eyB0KFwiYmFkZ2VzLnByb2plY3RcIikgfTwvc3Bhbj5cblx0XHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiaXRlbS10YWdcIj57IHQoXCJiYWRnZXMuYmxvZ1wiKSB9PC9zcGFuPlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Zm9yIF8sIHRhZyA6PSByYW5nZSBpdGVtLlRhZ3Mge1xuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIml0ZW0tdGFnXCI+eyB0YWcgfTwvc3Bhbj5cblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8L3NwYW4+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8cCBjbGFzcz1cImJsb2ctcG9zdC1leGNlcnB0XCI+QHRlbXBsLlJhdyhoaWdobGlnaHRNYXRjaChpdGVtLkRlc2NyaXB0aW9uLCBxdWVyeSkpPC9wPlxuXHRcdFx0PC9hcnRpY2xlPlxuXHRcdH1cblx0fVxufVxuXG50ZW1wbCBTZWFyY2hNb2RhbChvcGVuIGJvb2wsIHF1ZXJ5IHN0cmluZywgcmVzdWx0cyBbXVNlYXJjaFJlc3VsdEl0ZW0sIHNlbGVjdGVkSW5kZXggaW50LCBwbGFjZWhvbGRlciBzdHJpbmcpIHtcblx0PGRpdiBpZD1cInNlYXJjaC1wYWdlXCIgY2xhc3M9eyBjbHMoXCJcIiwgb3BlbiwgXCJzaG93XCIpIH0gcm9sZT1cImRpYWxvZ1wiIGFyaWEtbW9kYWw9XCJ0cnVlXCIgYXJpYS1sYWJlbD17IHQoXCJhcmlhLnNlYXJjaFwiKSB9PlxuXHRcdDxkaXYgY2xhc3M9XCJzZWFyY2gtcGFnZS1oZWFkZXJcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJzZWFyY2gtcGFnZS1oZWFkZXItY29udGVudFwiPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNlYXJjaC1wYWdlLWJhY2tcIiBpZD1cInNlYXJjaC1wYWdlLWJhY2tcIiBhcmlhLWxhYmVsPXsgdChcImFyaWEuZ29CYWNrXCIpIH0gZGF0YS1hY3Rpb249XCJjbG9zZS1zZWFyY2hcIj5cblx0XHRcdFx0XHRASWNvbihcImFycm93LWxlZnRcIiwgXCIxLjJyZW1cIilcblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJzZWFyY2gtcGFnZS1pbnB1dC13cmFwcGVyXCI+XG5cdFx0XHRcdFx0PGlucHV0IHJlZj1cInNlYXJjaElucHV0XCIgdHlwZT1cInNlYXJjaFwiIGlkPVwic2VhcmNoLXBhZ2UtaW5wdXRcIiBjbGFzcz1cInNlYXJjaC1wYWdlLWlucHV0XCIgcGxhY2Vob2xkZXI9eyBwbGFjZWhvbGRlciB9IGF1dG9jb21wbGV0ZT1cIm9mZlwiIGFyaWEtbGFiZWw9eyB0KFwiYXJpYS5zZWFyY2hcIikgfSB2YWx1ZT17IHF1ZXJ5IH0vPlxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPXsgY2xzKFwic2VhcmNoLXBhZ2UtY2xlYXJcIiwgcXVlcnkgIT0gXCJcIiwgXCJzaG93XCIpIH0gaWQ9XCJzZWFyY2gtcGFnZS1jbGVhclwiIGFyaWEtbGFiZWw9eyB0KFwiYXJpYS5jbGVhclNlYXJjaFwiKSB9IGRhdGEtYWN0aW9uPVwiY2xlYXItc2VhcmNoXCI+XG5cdFx0XHRcdFx0XHRASWNvbihcInRpbWVzXCIsIFwiMS4ycmVtXCIpXG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0PGRpdiBjbGFzcz1cInNlYXJjaC1wYWdlLWNvbnRlbnRcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJzZWFyY2gtcGFnZS1yZXN1bHRzXCIgaWQ9XCJzZWFyY2gtcGFnZS1yZXN1bHRzXCI+XG5cdFx0XHRcdEBTZWFyY2hSZXN1bHRzTGlzdChyZXN1bHRzLCBxdWVyeSwgc2VsZWN0ZWRJbmRleClcblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJlcnJvcnNcIlxuaW1wb3J0IFwianM6Li9icm93c2VyLmQudHNcIlxuaW1wb3J0IFwic2xpY2VzXCJcbmltcG9ydCBcInN0cmluZ3NcIlxuXG4vLyDilIDilIAgR2xvYmFsIEFwcGxpY2F0aW9uIFN0YXRlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG52YXIgc2l0ZSA9IFNpdGVDb25maWd7XG5cdFNvY2lhbDogW11Tb2NpYWxMaW5re30sXG59XG52YXIgcG9zdHMgPSBbXUJsb2dQb3N0e31cbnZhciBwcm9qZWN0cyA9IFtdUHJvamVjdHt9XG52YXIgbmF2UGFnZXMgPSBbXU5hdlBhZ2V7fVxudmFyIHRyYW5zbGF0aW9ucyA9IG1hcFtzdHJpbmddc3RyaW5ne31cbnZhciByb3V0ZSA9IFJvdXRlTWF0Y2h7UGFnZTogMX0gLy8gemVybyBLaW5kID09IFJvdXRlQmxvZ1xudmFyIGN1cnJlbnRUaGVtZSA9IFwiZGFya1wiXG52YXIgbW9iaWxlTWVudU9wZW4gYm9vbFxudmFyIHByb2plY3RzRHJvcGRvd25PcGVuIGJvb2xcbnZhciBzZWFyY2hPcGVuIGJvb2xcbnZhciBzZWFyY2hRdWVyeSBzdHJpbmdcbnZhciBzZWFyY2hSZXN1bHRzID0gW11TZWFyY2hSZXN1bHRJdGVte31cbnZhciBjb250YWN0T3BlbiBib29sXG52YXIgY29udGFjdEZvcm0gQ29udGFjdFN0YXRlXG5cbi8vIFJvdXRlIHZpZXcgc3RhdGU7IG1haW4oKSBhbmQgaGFuZGxlUm91dGUgYXNzaWduIG5ld1ZpZXdTdGF0ZSgpLiBOb3QgaW5pdGlhbGlzZWRcbi8vIGhlcmU6IGdsb2JhbHMgYXJlIGVtaXR0ZWQgaW4gZmlsZSBvcmRlciwgc28gTG9hZFJlYWR5ICh0eXBlcy5nbykgd291bGQgYmUgaW4gVERaLlxudmFyIHZpZXcgVmlld1N0YXRlXG5cbi8vIFJlbmRlcmVkIHJvdXRlIGNvbnRlbnQga2V5ZWQgYnkgcm91dGUgcGF0aCAoL2Jsb2cvPHNsdWc+LCAvcHJvamVjdC88aWQ+LCAvcGFnZS88aWQ+KS5cbnZhciBjb250ZW50Q2FjaGUgPSBtYXBbc3RyaW5nXWNhY2hlZENvbnRlbnR7fVxuXG4vLyDilIDilIAgVHJhbnNsYXRpb24gSGVscGVyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jIHQoa2V5IHN0cmluZykgc3RyaW5nIHtcblx0aWYgdmFsLCBvayA6PSB0cmFuc2xhdGlvbnNba2V5XTsgb2sgJiYgdmFsICE9IFwiXCIge1xuXHRcdHJldHVybiB2YWxcblx0fVxuXHRyZXR1cm4ga2V5XG59XG5cbi8vIOKUgOKUgCBNZXRhIFRhZ3MgVXBkYXRlciDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuLy8gaGVhZEVsIHJldHVybnMgdGhlIDxoZWFkPiBlbGVtZW50IG1hdGNoaW5nIHRhZ1thdHRyPVwibmFtZVwiXSwgY3JlYXRpbmcgaXQgaWYgbWlzc2luZy5cbmZ1bmMgaGVhZEVsKHRhZyBzdHJpbmcsIGF0dHIgc3RyaW5nLCBuYW1lIHN0cmluZykgYW55IHtcblx0ZWwgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YWcgKyBcIltcIiArIGF0dHIgKyBcIj1cXFwiXCIgKyBuYW1lICsgXCJcXFwiXVwiKVxuXHRpZiBlbCA9PSBuaWwge1xuXHRcdGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpXG5cdFx0ZWwuc2V0QXR0cmlidXRlKGF0dHIsIG5hbWUpXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbClcblx0fVxuXHRyZXR1cm4gZWxcbn1cblxuLy8gdXBkYXRlTWV0YSBzZXRzIDxtZXRhIGF0dHI9XCJuYW1lXCIgY29udGVudD12YWx1ZT47IGF0dHIgaXMgXCJuYW1lXCIgb3IgXCJwcm9wZXJ0eVwiLlxuZnVuYyB1cGRhdGVNZXRhKGF0dHIgc3RyaW5nLCBuYW1lIHN0cmluZywgdmFsdWUgc3RyaW5nKSB7XG5cdGlmIHZhbHVlID09IFwiXCIge1xuXHRcdHJldHVyblxuXHR9XG5cdGhlYWRFbChcIm1ldGFcIiwgYXR0ciwgbmFtZSkuc2V0QXR0cmlidXRlKFwiY29udGVudFwiLCB2YWx1ZSlcbn1cblxuZnVuYyB1cGRhdGVUaXRsZU1ldGEodGl0bGUgc3RyaW5nKSB7XG5cdGlmIHRpdGxlID09IFwiXCIge1xuXHRcdHJldHVyblxuXHR9XG5cdGRvY3VtZW50LnRpdGxlID0gdGl0bGVcblx0dXBkYXRlTWV0YShcInByb3BlcnR5XCIsIFwib2c6dGl0bGVcIiwgdGl0bGUpXG5cdHVwZGF0ZU1ldGEoXCJwcm9wZXJ0eVwiLCBcInR3aXR0ZXI6dGl0bGVcIiwgdGl0bGUpXG59XG5cbmZ1bmMgdXBkYXRlRGVzY3JpcHRpb25NZXRhKGRlc2NyaXB0aW9uIHN0cmluZykge1xuXHR1cGRhdGVNZXRhKFwibmFtZVwiLCBcImRlc2NyaXB0aW9uXCIsIGRlc2NyaXB0aW9uKVxuXHR1cGRhdGVNZXRhKFwicHJvcGVydHlcIiwgXCJvZzpkZXNjcmlwdGlvblwiLCBkZXNjcmlwdGlvbilcblx0dXBkYXRlTWV0YShcInByb3BlcnR5XCIsIFwidHdpdHRlcjpkZXNjcmlwdGlvblwiLCBkZXNjcmlwdGlvbilcbn1cblxuZnVuYyB1cGRhdGVNZXRhVGFncygpIHtcblx0dXBkYXRlVGl0bGVNZXRhKHNpdGUuVGl0bGUpXG5cdHVwZGF0ZURlc2NyaXB0aW9uTWV0YShzaXRlLkRlc2NyaXB0aW9uKVxuXHR1cGRhdGVNZXRhKFwibmFtZVwiLCBcImF1dGhvclwiLCBzaXRlLkF1dGhvcilcblx0dGhlbWVCZyA6PSBzaXRlLkRhcmtUaGVtZS5CYWNrZ3JvdW5kXG5cdGlmIGN1cnJlbnRUaGVtZSA9PSBcImxpZ2h0XCIgJiYgc2l0ZS5MaWdodFRoZW1lLkJhY2tncm91bmQgIT0gXCJcIiB7XG5cdFx0dGhlbWVCZyA9IHNpdGUuTGlnaHRUaGVtZS5CYWNrZ3JvdW5kXG5cdH1cblx0dXBkYXRlTWV0YShcIm5hbWVcIiwgXCJ0aGVtZS1jb2xvclwiLCB0aGVtZUJnKVxufVxuXG5mdW5jIGFubm91bmNlUm91dGUodGl0bGUgc3RyaW5nKSB7XG5cdGFubm91bmNlciA6PSBhcHBSZWZzW1wicm91dGVBbm5vdW5jZXJcIl1cblx0aWYgYW5ub3VuY2VyID09IG5pbCAmJiBkb2N1bWVudCAhPSBuaWwge1xuXHRcdGFubm91bmNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm91dGUtYW5ub3VuY2VyXCIpXG5cdH1cblx0aWYgYW5ub3VuY2VyICE9IG5pbCB7XG5cdFx0cHJlZml4IDo9IHQoXCJnZW5lcmFsLnJvdXRlQW5ub3VuY2VcIilcblx0XHRpZiBwcmVmaXggPT0gXCJnZW5lcmFsLnJvdXRlQW5ub3VuY2VcIiB7XG5cdFx0XHRwcmVmaXggPSBcIk5hdmlnYXRlZCB0byBcIlxuXHRcdH1cblx0XHRhbm5vdW5jZXIudGV4dENvbnRlbnQgPSBwcmVmaXggKyB0aXRsZVxuXHR9XG59XG5cbmZ1bmMgdXBkYXRlUm91dGVNZXRhKHRpdGxlIHN0cmluZywgZGVzY3JpcHRpb24gc3RyaW5nLCBjYW5vbmljYWxQYXRoIHN0cmluZykge1xuXHR1cGRhdGVUaXRsZU1ldGEodGl0bGUpXG5cdHVwZGF0ZURlc2NyaXB0aW9uTWV0YShkZXNjcmlwdGlvbilcblx0YW5ub3VuY2VSb3V0ZSh0aXRsZSlcblx0aWYgY2Fub25pY2FsUGF0aCA9PSBcIlwiIHtcblx0XHRyZXR1cm5cblx0fVxuXHRmdWxsVVJMIDo9IGNhbm9uaWNhbFBhdGhcblx0aWYgc3RyaW5ncy5IYXNQcmVmaXgoY2Fub25pY2FsUGF0aCwgXCIvXCIpIHtcblx0XHRvcmlnaW4gOj0gc3RyVmFsKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG5cdFx0aWYgb3JpZ2luID09IFwiXCIgfHwgb3JpZ2luID09IFwibnVsbFwiIHtcblx0XHRcdG9yaWdpbiA9IHNpdGUuVXJsXG5cdFx0fVxuXHRcdGZ1bGxVUkwgPSBvcmlnaW4gKyBjYW5vbmljYWxQYXRoXG5cdH1cblx0dXBkYXRlTWV0YShcInByb3BlcnR5XCIsIFwib2c6dXJsXCIsIGZ1bGxVUkwpXG5cdGhlYWRFbChcImxpbmtcIiwgXCJyZWxcIiwgXCJjYW5vbmljYWxcIikuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBmdWxsVVJMKVxufVxuXG4vLyDilIDilIAgRGF0YSBJbml0aWFsaXphdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbi8vIGA9PSBuaWxgIGNvbXBpbGVzIHRvIGxvb3NlIGA9PSBudWxsYCwgc28gdGhlc2UgYWxzbyBjYXRjaCBKUyB1bmRlZmluZWQuXG5cbmZ1bmMgc3RyVmFsKHYgYW55KSBzdHJpbmcge1xuXHRpZiB2ID09IG5pbCB7XG5cdFx0cmV0dXJuIFwiXCJcblx0fVxuXHRyZXR1cm4gc3RyaW5nKHYpXG59XG5cbmZ1bmMgYm9vbFZhbCh2IGFueSkgYm9vbCB7XG5cdGlmIHYgPT0gbmlsIHx8IHN0cmluZyh2KSA9PSBcImZhbHNlXCIge1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cdHJldHVybiBib29sKHYpXG59XG5cbmZ1bmMgaW50VmFsKHYgYW55KSBpbnQge1xuXHRpZiB2ID09IG5pbCB7XG5cdFx0cmV0dXJuIDBcblx0fVxuXHRyZXR1cm4gaW50KHYpXG59XG5cbi8vIHN0clNsaWNlIG1hcHMgYSByYXcgSlNPTiBhcnJheSAob3IgbmlsKSB0byBhIG5vbi1uaWwgW11zdHJpbmcuXG5mdW5jIHN0clNsaWNlKHJhdyBhbnkpIFtdc3RyaW5nIHtcblx0b3V0IDo9IFtdc3RyaW5ne31cblx0aWYgcmF3ICE9IG5pbCB7XG5cdFx0Zm9yIF8sIHYgOj0gcmFuZ2UgcmF3IHtcblx0XHRcdG91dCA9IGFwcGVuZChvdXQsIHN0clZhbCh2KSlcblx0XHR9XG5cdH1cblx0cmV0dXJuIG91dFxufVxuXG4vLyBwb3N0RnJvbUpTT04gbWFwcyBvbmUgcmF3IGBibG9nLnBvc3RzW11gIGVudHJ5IHRvIGEgQmxvZ1Bvc3QuXG5mdW5jIHBvc3RGcm9tSlNPTihwIGFueSkgQmxvZ1Bvc3Qge1xuXHRmbiA6PSBzdHJWYWwocC5maWxlbmFtZSlcblx0c2x1ZyA6PSBzdHJpbmdzLlRyaW1TdWZmaXgoZm4sIFwiLm1kXCIpXG5cdHJldHVybiBCbG9nUG9zdHtcblx0XHRTbHVnOiAgICAgc2x1Zyxcblx0XHRUaXRsZTogICAgc3RyVmFsKHAudGl0bGUpLFxuXHRcdERhdGU6ICAgICBzdHJWYWwocC5kYXRlKSxcblx0XHRFeGNlcnB0OiAgc3RyVmFsKHAuZXhjZXJwdCksXG5cdFx0VGFnczogICAgIHN0clNsaWNlKHAudGFncyksXG5cdFx0RmlsZW5hbWU6IGZuLFxuXHRcdEhyZWY6ICAgICBcIi9ibG9nL1wiICsgc2x1Zyxcblx0fVxufVxuXG4vLyBzb3J0UG9zdHNCeURhdGUgb3JkZXJzIG5ld2VzdCBmaXJzdDsgZGF0ZXMgYXJlIElTTyBzdHJpbmdzIHNvIGxleGljYWwgb3JkZXIgd29ya3MuXG5mdW5jIHNvcnRQb3N0c0J5RGF0ZShsaXN0IFtdQmxvZ1Bvc3QpIHtcblx0c2xpY2VzLlNvcnRGdW5jKGxpc3QsIGZ1bmMoYSBCbG9nUG9zdCwgYiBCbG9nUG9zdCkgaW50IHtcblx0XHRpZiBhLkRhdGUgPT0gYi5EYXRlIHtcblx0XHRcdHJldHVybiAwXG5cdFx0fVxuXHRcdGlmIGEuRGF0ZSA8IGIuRGF0ZSB7XG5cdFx0XHRyZXR1cm4gMVxuXHRcdH1cblx0XHRyZXR1cm4gLTFcblx0fSlcbn1cblxuLy8gcHJvamVjdEZyb21KU09OIG1hcHMgb25lIHJhdyBgcHJvamVjdHNbXWAgZW50cnkgdG8gYSBQcm9qZWN0LlxuZnVuYyBwcm9qZWN0RnJvbUpTT04ocCBhbnkpIFByb2plY3Qge1xuXHRsaW5rcyA6PSBbXVByb2plY3RMaW5re31cblx0aWYgcC5saW5rcyAhPSBuaWwge1xuXHRcdGZvciBfLCBsIDo9IHJhbmdlIHAubGlua3Mge1xuXHRcdFx0bGlua3MgPSBhcHBlbmQobGlua3MsIFByb2plY3RMaW5re1xuXHRcdFx0XHRUaXRsZTogc3RyVmFsKGwudGl0bGUpLFxuXHRcdFx0XHRJY29uOiAgc3RyVmFsKGwuaWNvbiksXG5cdFx0XHRcdEhyZWY6ICBzdHJWYWwobC5ocmVmKSxcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0aWQgOj0gc3RyVmFsKHAuaWQpXG5cdHJldHVybiBQcm9qZWN0e1xuXHRcdElEOiAgICAgICAgICAgICAgIGlkLFxuXHRcdFRpdGxlOiAgICAgICAgICAgIHN0clZhbChwLnRpdGxlKSxcblx0XHREZXNjcmlwdGlvbjogICAgICBzdHJWYWwocC5kZXNjcmlwdGlvbiksXG5cdFx0VGFnczogICAgICAgICAgICAgc3RyU2xpY2UocC50YWdzKSxcblx0XHRPcmRlcjogICAgICAgICAgICBpbnRWYWwocC5vcmRlciksXG5cdFx0R2l0aHViUmVwbzogICAgICAgc3RyVmFsKHAuZ2l0aHViX3JlcG8pLFxuXHRcdEdpdGh1YkJyYW5jaDogICAgIHN0clZhbChwLmdpdGh1Yl9icmFuY2gpLFxuXHRcdERlbW9Vcmw6ICAgICAgICAgIHN0clZhbChwLmRlbW9fdXJsKSxcblx0XHREZW1vTGFiZWw6ICAgICAgICBzdHJWYWwocC5kZW1vX2xhYmVsKSxcblx0XHREZW1vSW5zdHJ1Y3Rpb25zOiBzdHJWYWwocC5kZW1vX2luc3RydWN0aW9ucyksXG5cdFx0RGVtb0hlaWdodDogICAgICAgc3RyVmFsKHAuZGVtb19oZWlnaHQpLFxuXHRcdERlbW9GdWxsc2NyZWVuOiAgIGJvb2xWYWwocC5kZW1vX2Z1bGxzY3JlZW4pLFxuXHRcdFlvdXR1YmVWaWRlb3M6ICAgIHN0clNsaWNlKHAueW91dHViZV92aWRlb3MpLFxuXHRcdExpbmtzOiAgICAgICAgICAgIGxpbmtzLFxuXHRcdEhyZWY6ICAgICAgICAgICAgIFwiL3Byb2plY3QvXCIgKyBpZCxcblx0fVxufVxuXG4vLyB0aGVtZUZyb21KU09OIG1hcHMgb25lIGBzaXRlLnRoZW1lLjxuYW1lPmAgZW50cnkgdG8gVGhlbWVDb2xvcnMuXG5mdW5jIHRoZW1lRnJvbUpTT04oZCBhbnksIGRlZmF1bHRDb2RlVGhlbWUgc3RyaW5nKSBUaGVtZUNvbG9ycyB7XG5cdHRjIDo9IFRoZW1lQ29sb3Jze1xuXHRcdFByaW1hcnk6ICAgIHN0clZhbChkLnByaW1hcnkpLFxuXHRcdFNlY29uZGFyeTogIHN0clZhbChkLnNlY29uZGFyeSksXG5cdFx0QmFja2dyb3VuZDogc3RyVmFsKGQuYmFja2dyb3VuZCksXG5cdFx0VGV4dDogICAgICAgc3RyVmFsKGQudGV4dCksXG5cdFx0VGV4dExpZ2h0OiAgc3RyVmFsKGQudGV4dExpZ2h0KSxcblx0XHRCb3JkZXI6ICAgICBzdHJWYWwoZC5ib3JkZXIpLFxuXHRcdEhvdmVyOiAgICAgIHN0clZhbChkLmhvdmVyKSxcblx0XHRDb2RlVGhlbWU6ICBkZWZhdWx0Q29kZVRoZW1lLFxuXHR9XG5cdGlmIGQuY29kZSAhPSBuaWwge1xuXHRcdHRjLkNvZGVUaGVtZSA9IHN0clZhbChkLmNvZGUudGhlbWUpXG5cdH1cblx0aWYgZC5jb21tZW50cyAhPSBuaWwge1xuXHRcdHRjLkNvbW1lbnRzVGhlbWUgPSBzdHJWYWwoZC5jb21tZW50cy50aGVtZSlcblx0fVxuXHRyZXR1cm4gdGNcbn1cblxuZnVuYyBzb3J0UHJvamVjdHNCeU9yZGVyKGxpc3QgW11Qcm9qZWN0KSB7XG5cdHNsaWNlcy5Tb3J0RnVuYyhsaXN0LCBmdW5jKGEgUHJvamVjdCwgYiBQcm9qZWN0KSBpbnQge1xuXHRcdHJldHVybiBhLk9yZGVyIC0gYi5PcmRlclxuXHR9KVxufVxuXG4vLyBuYXZQYWdlSHJlZiBpcyB0aGUgcm91dGUgZm9yIGEgY3VzdG9tIHBhZ2UgaWQuXG5mdW5jIG5hdlBhZ2VIcmVmKGlkIHN0cmluZykgc3RyaW5nIHtcblx0cmV0dXJuIFwiL3BhZ2UvXCIgKyBpZFxufVxuXG4vLyBwYWdlRnJvbUpTT04gbWFwcyBvbmUgYHBhZ2VzLjxpZD5gIGVudHJ5IHRvIGEgTmF2UGFnZS5cbmZ1bmMgcGFnZUZyb21KU09OKGlkIHN0cmluZywgcCBhbnkpIE5hdlBhZ2Uge1xuXHRyZXR1cm4gTmF2UGFnZXtcblx0XHRJRDogICAgICAgIGlkLFxuXHRcdFRpdGxlOiAgICAgc3RyVmFsKHAudGl0bGUpLFxuXHRcdE9yZGVyOiAgICAgaW50VmFsKHAub3JkZXIpLFxuXHRcdFNob3dJbk5hdjogYm9vbFZhbChwLnNob3dJbk5hdiksXG5cdFx0SHJlZjogICAgICBuYXZQYWdlSHJlZihpZCksXG5cdH1cbn1cblxuZnVuYyBzb3J0UGFnZXNCeU9yZGVyKGxpc3QgW11OYXZQYWdlKSB7XG5cdHNsaWNlcy5Tb3J0RnVuYyhsaXN0LCBmdW5jKGEgTmF2UGFnZSwgYiBOYXZQYWdlKSBpbnQge1xuXHRcdHJldHVybiBhLk9yZGVyIC0gYi5PcmRlclxuXHR9KVxufVxuXG5hc3luYyBmdW5jIGluaXREYXRhKCkgZXJyb3Ige1xuXHR2YXIgZGF0YSBhbnlcblx0ZWwgOj0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaXRlLWRhdGFcIilcblx0aWYgZWwgIT0gbmlsICYmIGVsLnRleHRDb250ZW50ICE9IG5pbCAmJiBlbC50ZXh0Q29udGVudCAhPSBcIlwiIHtcblx0XHRkYXRhID0gSlNPTi5wYXJzZShzdHJWYWwoZWwudGV4dENvbnRlbnQpKVxuXHR9IGVsc2Uge1xuXHRcdHJlcyA6PSBhd2FpdCBmZXRjaChcIi9kYXRhL2NvbnRlbnQuanNvblwiKVxuXHRcdGlmIHJlcyA9PSBuaWwgfHwgIXJlcy5vayB7XG5cdFx0XHRyZXR1cm4gZXJyb3JzLk5ldyhcImZhaWxlZCB0byBmZXRjaCAvZGF0YS9jb250ZW50Lmpzb25cIilcblx0XHR9XG5cdFx0ZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcblx0fVxuXG5cdGlmIGRhdGEgPT0gbmlsIHtcblx0XHRyZXR1cm4gZXJyb3JzLk5ldyhcImZhaWxlZCB0byBwYXJzZSAvZGF0YS9jb250ZW50Lmpzb25cIilcblx0fVxuXG5cdHNpdGVEYXRhIDo9IGRhdGEuc2l0ZVxuXHRpZiBzaXRlRGF0YSAhPSBuaWwge1xuXHRcdHNpdGUuVGl0bGUgPSBzdHJWYWwoc2l0ZURhdGEudGl0bGUpXG5cdFx0c2l0ZS5VcmwgPSBzdHJpbmdzLlRyaW1TdWZmaXgoc3RyVmFsKHNpdGVEYXRhLnVybCksIFwiL1wiKVxuXHRcdHNpdGUuRGVzY3JpcHRpb24gPSBzdHJWYWwoc2l0ZURhdGEuZGVzY3JpcHRpb24pXG5cdFx0c2l0ZS5BdXRob3IgPSBzdHJWYWwoc2l0ZURhdGEuYXV0aG9yKVxuXHRcdHNpdGUuR2l0aHViVXNlcm5hbWUgPSBzdHJWYWwoc2l0ZURhdGEuZ2l0aHViX3VzZXJuYW1lKVxuXG5cdFx0aWYgc2l0ZURhdGEudGhlbWUgIT0gbmlsIHtcblx0XHRcdGlmIHNpdGVEYXRhLnRoZW1lLmRhcmsgIT0gbmlsIHtcblx0XHRcdFx0c2l0ZS5EYXJrVGhlbWUgPSB0aGVtZUZyb21KU09OKHNpdGVEYXRhLnRoZW1lLmRhcmssIFwicHJpc20tdG9tb3Jyb3dcIilcblx0XHRcdH1cblx0XHRcdGlmIHNpdGVEYXRhLnRoZW1lLmxpZ2h0ICE9IG5pbCB7XG5cdFx0XHRcdHNpdGUuTGlnaHRUaGVtZSA9IHRoZW1lRnJvbUpTT04oc2l0ZURhdGEudGhlbWUubGlnaHQsIFwicHJpc20tY295XCIpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgc2l0ZURhdGEuc2VhcmNoICE9IG5pbCB7XG5cdFx0XHRzaXRlLlNlYXJjaCA9IFNlYXJjaENvbmZpZ3tcblx0XHRcdFx0RW5hYmxlZDogICAgIGJvb2xWYWwoc2l0ZURhdGEuc2VhcmNoLmVuYWJsZWQpLFxuXHRcdFx0XHRNaW5DaGFyczogICAgaW50VmFsKHNpdGVEYXRhLnNlYXJjaC5taW5DaGFycyksXG5cdFx0XHRcdFBsYWNlaG9sZGVyOiBzdHJWYWwoc2l0ZURhdGEuc2VhcmNoLnBsYWNlaG9sZGVyKSxcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiBzaXRlRGF0YS5lbWFpbGpzICE9IG5pbCB7XG5cdFx0XHRzaXRlLkVtYWlsSlMgPSBFbWFpbEpTQ29uZmlne1xuXHRcdFx0XHRFbmFibGVkOiAgICBib29sVmFsKHNpdGVEYXRhLmVtYWlsanMuZW5hYmxlZCksXG5cdFx0XHRcdFNlcnZpY2VJZDogIHN0clZhbChzaXRlRGF0YS5lbWFpbGpzLnNlcnZpY2VJZCksXG5cdFx0XHRcdFRlbXBsYXRlSWQ6IHN0clZhbChzaXRlRGF0YS5lbWFpbGpzLnRlbXBsYXRlSWQpLFxuXHRcdFx0XHRQdWJsaWNLZXk6ICBzdHJWYWwoc2l0ZURhdGEuZW1haWxqcy5wdWJsaWNLZXkpLFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIHNpdGVEYXRhLmNvbW1lbnRzICE9IG5pbCB7XG5cdFx0XHRzaXRlLkNvbW1lbnRzID0gQ29tbWVudHNDb25maWd7XG5cdFx0XHRcdEJsb2dFbmFibGVkOiAgICAgYm9vbFZhbChzaXRlRGF0YS5jb21tZW50cy5ibG9nRW5hYmxlZCksXG5cdFx0XHRcdFByb2plY3RzRW5hYmxlZDogYm9vbFZhbChzaXRlRGF0YS5jb21tZW50cy5wcm9qZWN0c0VuYWJsZWQpLFxuXHRcdFx0XHRBdHRyczogICAgICAgICAgIHNpdGVEYXRhLmNvbW1lbnRzLFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIHNpdGVEYXRhLnNvY2lhbCAhPSBuaWwge1xuXHRcdFx0Zm9yIF8sIGl0ZW0gOj0gcmFuZ2Ugc2l0ZURhdGEuc29jaWFsIHtcblx0XHRcdFx0c2l0ZS5Tb2NpYWwgPSBhcHBlbmQoc2l0ZS5Tb2NpYWwsIFNvY2lhbExpbmt7XG5cdFx0XHRcdFx0SWNvbjogICBzdHJWYWwoaXRlbS5pY29uKSxcblx0XHRcdFx0XHRIcmVmOiAgIHN0clZhbChpdGVtLmhyZWYpLFxuXHRcdFx0XHRcdFRhcmdldDogc3RyVmFsKGl0ZW0udGFyZ2V0KSxcblx0XHRcdFx0XHRSZWw6ICAgIHN0clZhbChpdGVtLnJlbCksXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gVHJhbnNsYXRpb25zXG5cdGlmIGRhdGEudHJhbnNsYXRpb25zICE9IG5pbCAmJiBkYXRhLnRyYW5zbGF0aW9ucy5lbiAhPSBuaWwge1xuXHRcdGZvciBrLCB2IDo9IHJhbmdlIGRhdGEudHJhbnNsYXRpb25zLmVuLihtYXBbc3RyaW5nXWFueSkge1xuXHRcdFx0dHJhbnNsYXRpb25zW2tdID0gc3RyVmFsKHYpXG5cdFx0fVxuXHR9XG5cblx0Ly8gQmxvZ1xuXHRzaXRlLlBvc3RzUGVyUGFnZSA9IDVcblx0aWYgZGF0YS5ibG9nICE9IG5pbCB7XG5cdFx0aWYgZGF0YS5ibG9nLnBvc3RzUGVyUGFnZSAhPSBuaWwge1xuXHRcdFx0c2l0ZS5Qb3N0c1BlclBhZ2UgPSBpbnRWYWwoZGF0YS5ibG9nLnBvc3RzUGVyUGFnZSlcblx0XHR9XG5cdFx0aWYgZGF0YS5ibG9nLnBvc3RzICE9IG5pbCB7XG5cdFx0XHRmb3IgXywgcCA6PSByYW5nZSBkYXRhLmJsb2cucG9zdHMge1xuXHRcdFx0XHRwb3N0cyA9IGFwcGVuZChwb3N0cywgcG9zdEZyb21KU09OKHApKVxuXHRcdFx0fVxuXHRcdFx0c29ydFBvc3RzQnlEYXRlKHBvc3RzKVxuXHRcdH1cblx0fVxuXG5cdC8vIFByb2plY3RzXG5cdGlmIGRhdGEucHJvamVjdHMgIT0gbmlsIHtcblx0XHRmb3IgXywgcCA6PSByYW5nZSBkYXRhLnByb2plY3RzIHtcblx0XHRcdHByb2plY3RzID0gYXBwZW5kKHByb2plY3RzLCBwcm9qZWN0RnJvbUpTT04ocCkpXG5cdFx0fVxuXHRcdHNvcnRQcm9qZWN0c0J5T3JkZXIocHJvamVjdHMpXG5cdH1cblxuXHQvLyBQYWdlc1xuXHRpZiBkYXRhLnBhZ2VzICE9IG5pbCB7XG5cdFx0Zm9yIGlkLCBwIDo9IHJhbmdlIGRhdGEucGFnZXMuKG1hcFtzdHJpbmddYW55KSB7XG5cdFx0XHRuYXZQYWdlcyA9IGFwcGVuZChuYXZQYWdlcywgcGFnZUZyb21KU09OKGlkLCBwKSlcblx0XHR9XG5cdFx0c29ydFBhZ2VzQnlPcmRlcihuYXZQYWdlcylcblx0fVxuXG5cdHVwZGF0ZU1ldGFUYWdzKClcblx0cmV0dXJuIG5pbFxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImpzOi4vYnJvd3Nlci5kLnRzXCJcblxuY29uc3QgdGhlbWVTdG9yYWdlS2V5ID0gXCJ0aGVtZS1wcmVmZXJlbmNlXCJcblxuZnVuYyBnZXRJbml0aWFsVGhlbWUoKSBzdHJpbmcge1xuXHRzYXZlZCA6PSB3aW5kb3cubG9jYWxTdG9yYWdlLmdldEl0ZW0odGhlbWVTdG9yYWdlS2V5KVxuXHRpZiBzYXZlZCAhPSBuaWwgJiYgc2F2ZWQgIT0gXCJcIiB7XG5cdFx0cmV0dXJuIHN0cmluZyhzYXZlZClcblx0fVxuXHRjdXJyZW50IDo9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXRoZW1lXCIpXG5cdGlmIGN1cnJlbnQgIT0gbmlsICYmIGN1cnJlbnQgIT0gXCJcIiB7XG5cdFx0cmV0dXJuIHN0cmluZyhjdXJyZW50KVxuXHR9XG5cdHJldHVybiBcImRhcmtcIlxufVxuXG5mdW5jIGdldFRoZW1lQ29sb3JzKG5hbWUgc3RyaW5nKSBUaGVtZUNvbG9ycyB7XG5cdGlmIG5hbWUgPT0gXCJsaWdodFwiIHtcblx0XHRyZXR1cm4gc2l0ZS5MaWdodFRoZW1lXG5cdH1cblx0cmV0dXJuIHNpdGUuRGFya1RoZW1lXG59XG5cbmZ1bmMgYXBwbHlDb2xvclNjaGVtZShjb2xvcnMgVGhlbWVDb2xvcnMpIHtcblx0cm9vdCA6PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnRcblx0cm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYWNjZW50XCIsIGNvbG9ycy5QcmltYXJ5KVxuXHRyb290LnN0eWxlLnNldFByb3BlcnR5KFwiLS1mb250LWNvbG9yXCIsIGNvbG9ycy5UZXh0KVxuXHRyb290LnN0eWxlLnNldFByb3BlcnR5KFwiLS1iYWNrZ3JvdW5kLWNvbG9yXCIsIGNvbG9ycy5CYWNrZ3JvdW5kKVxuXHRyb290LnN0eWxlLnNldFByb3BlcnR5KFwiLS1oZWFkZXItY29sb3JcIiwgY29sb3JzLlNlY29uZGFyeSlcblx0cm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tdGV4dC1saWdodFwiLCBjb2xvcnMuVGV4dExpZ2h0KVxuXHRyb290LnN0eWxlLnNldFByb3BlcnR5KFwiLS1ib3JkZXItY29sb3JcIiwgY29sb3JzLkJvcmRlcilcblx0cm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taG92ZXItY29sb3JcIiwgY29sb3JzLkhvdmVyKVxufVxuXG5mdW5jIGFwcGx5UHJpc21UaGVtZSh0aGVtZU5hbWUgc3RyaW5nKSB7XG5cdGlkIDo9IFwicHJpc20tdGhlbWVcIlxuXHRsaW5rIDo9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKGlkKVxuXHRocmVmIDo9IFwiL2Nzcy9wcmlzbS10aGVtZXMvXCIgKyB0aGVtZU5hbWUgKyBcIi5taW4uY3NzXCJcblxuXHRpZiBsaW5rICE9IG5pbCB7XG5cdFx0bGluay5ocmVmID0gaHJlZlxuXHR9IGVsc2Uge1xuXHRcdG5ld0xpbmsgOj0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpbmtcIilcblx0XHRuZXdMaW5rLmlkID0gaWRcblx0XHRuZXdMaW5rLnJlbCA9IFwic3R5bGVzaGVldFwiXG5cdFx0bmV3TGluay5ocmVmID0gaHJlZlxuXHRcdGRvY3VtZW50LmhlYWQuYXBwZW5kQ2hpbGQobmV3TGluaylcblx0fVxufVxuXG5mdW5jIHVwZGF0ZVRoZW1lQ29sb3JNZXRhKHRoZW1lIHN0cmluZykge1xuXHRtZXRhIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCJtZXRhW25hbWU9XFxcInRoZW1lLWNvbG9yXFxcIl1cIilcblx0aWYgbWV0YSAhPSBuaWwge1xuXHRcdGNvbG9ycyA6PSBnZXRUaGVtZUNvbG9ycyh0aGVtZSlcblx0XHRpZiBjb2xvcnMuQmFja2dyb3VuZCAhPSBcIlwiIHtcblx0XHRcdG1ldGEuc2V0QXR0cmlidXRlKFwiY29udGVudFwiLCBjb2xvcnMuQmFja2dyb3VuZClcblx0XHR9XG5cdH1cbn1cblxuZnVuYyBhcHBseVRoZW1lKHRoZW1lIHN0cmluZykge1xuXHRjdXJyZW50VGhlbWUgPSB0aGVtZVxuXHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2V0QXR0cmlidXRlKFwiZGF0YS10aGVtZVwiLCB0aGVtZSlcblx0Y29sb3JzIDo9IGdldFRoZW1lQ29sb3JzKHRoZW1lKVxuXHRhcHBseUNvbG9yU2NoZW1lKGNvbG9ycylcblx0dXBkYXRlVGhlbWVDb2xvck1ldGEodGhlbWUpXG5cdGlmIGNvbG9ycy5Db2RlVGhlbWUgIT0gXCJcIiB7XG5cdFx0YXBwbHlQcmlzbVRoZW1lKGNvbG9ycy5Db2RlVGhlbWUpXG5cdH1cblx0dXBkYXRlR2lzY3VzVGhlbWUoKVxuXHRpZiB3aW5kb3cubWVybWFpZCAhPSBuaWwge1xuXHRcdHJlbmRlck1lcm1haWQoKVxuXHR9XG59XG5cbmZ1bmMgbmV4dFRoZW1lKGN1cnJlbnQgc3RyaW5nKSBzdHJpbmcge1xuXHRpZiBjdXJyZW50ID09IFwiZGFya1wiIHtcblx0XHRyZXR1cm4gXCJsaWdodFwiXG5cdH1cblx0cmV0dXJuIFwiZGFya1wiXG59XG5cbmZ1bmMgdG9nZ2xlVGhlbWUoKSB7XG5cdG5leHQgOj0gbmV4dFRoZW1lKGN1cnJlbnRUaGVtZSlcblx0d2luZG93LmxvY2FsU3RvcmFnZS5zZXRJdGVtKHRoZW1lU3RvcmFnZUtleSwgbmV4dClcblx0YXBwbHlUaGVtZShuZXh0KVxufVxuXG5mdW5jIGluaXRUaGVtZSgpIHtcblx0aW5pdGlhbCA6PSBnZXRJbml0aWFsVGhlbWUoKVxuXHRhcHBseVRoZW1lKGluaXRpYWwpXG59XG4iLCJwYWNrYWdlIG1haW5cblxuLy8g4pSA4pSAIFJvdXRpbmcg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbnR5cGUgUm91dGUgaW50XG5cbmNvbnN0IChcblx0Um91dGVCbG9nIFJvdXRlID0gaW90YVxuXHRSb3V0ZVBvc3Rcblx0Um91dGVQcm9qZWN0XG5cdFJvdXRlUGFnZVxuXHRSb3V0ZU5vdEZvdW5kXG4pXG5cbnR5cGUgUm91dGVNYXRjaCBzdHJ1Y3Qge1xuXHRLaW5kICBSb3V0ZVxuXHRQYXJhbSBzdHJpbmcgLy8gcG9zdCBzbHVnLCBwcm9qZWN0IGlkIG9yIHBhZ2UgaWRcblx0UGFnZSAgaW50ICAgIC8vIGJsb2cgcGFnZSBudW1iZXIgKFJvdXRlQmxvZyBvbmx5LCA+PSAxKVxufVxuXG4vLyDilIDilIAgRGF0YSBzdHJ1Y3RzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG50eXBlIFByb2plY3RMaW5rIHN0cnVjdCB7XG5cdFRpdGxlIHN0cmluZ1xuXHRJY29uICBzdHJpbmdcblx0SHJlZiAgc3RyaW5nXG59XG5cbnR5cGUgUHJvamVjdCBzdHJ1Y3Qge1xuXHRJRCAgICAgICAgICAgICAgIHN0cmluZ1xuXHRUaXRsZSAgICAgICAgICAgIHN0cmluZ1xuXHREZXNjcmlwdGlvbiAgICAgIHN0cmluZ1xuXHRUYWdzICAgICAgICAgICAgIFtdc3RyaW5nXG5cdE9yZGVyICAgICAgICAgICAgaW50XG5cdEdpdGh1YlJlcG8gICAgICAgc3RyaW5nXG5cdEdpdGh1YkJyYW5jaCAgICAgc3RyaW5nXG5cdERlbW9VcmwgICAgICAgICAgc3RyaW5nXG5cdERlbW9MYWJlbCAgICAgICAgc3RyaW5nXG5cdERlbW9JbnN0cnVjdGlvbnMgc3RyaW5nXG5cdERlbW9IZWlnaHQgICAgICAgc3RyaW5nXG5cdERlbW9GdWxsc2NyZWVuICAgYm9vbFxuXHRZb3V0dWJlVmlkZW9zICAgIFtdc3RyaW5nXG5cdExpbmtzICAgICAgICAgICAgW11Qcm9qZWN0TGlua1xuXHRIcmVmICAgICAgICAgICAgIHN0cmluZ1xufVxuXG50eXBlIEJsb2dQb3N0IHN0cnVjdCB7XG5cdFNsdWcgICAgIHN0cmluZ1xuXHRUaXRsZSAgICBzdHJpbmdcblx0RGF0ZSAgICAgc3RyaW5nXG5cdEV4Y2VycHQgIHN0cmluZ1xuXHRUYWdzICAgICBbXXN0cmluZ1xuXHRGaWxlbmFtZSBzdHJpbmdcblx0SHJlZiAgICAgc3RyaW5nXG59XG5cbnR5cGUgTmF2UGFnZSBzdHJ1Y3Qge1xuXHRJRCAgICAgICAgc3RyaW5nXG5cdFRpdGxlICAgICBzdHJpbmdcblx0T3JkZXIgICAgIGludFxuXHRTaG93SW5OYXYgYm9vbFxuXHRIcmVmICAgICAgc3RyaW5nXG59XG5cbi8vIOKUgOKUgCBSb3V0ZSB2aWV3IHN0YXRlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG50eXBlIExvYWRTdGF0dXMgaW50XG5cbmNvbnN0IChcblx0TG9hZFJlYWR5ICAgTG9hZFN0YXR1cyA9IGlvdGEgLy8gY29udGVudCBhdmFpbGFibGUgb3Igbm90aGluZyB0byBsb2FkXG5cdExvYWRQZW5kaW5nICAgICAgICAgICAgICAgICAgIC8vIHJlc29sdmVyIHdhbnRzIGEgZmV0Y2g7IG5ldmVyIHJlbmRlcmVkIChyb3V0ZXMgcGFpbnQgb25jZSwgYWZ0ZXIgdGhlIGZldGNoKVxuXHRMb2FkRmFpbGVkXG5cdExvYWROb3RGb3VuZFxuKVxuXG50eXBlIFRPQ0l0ZW0gc3RydWN0IHtcblx0SUQgICAgc3RyaW5nXG5cdFRleHQgIHN0cmluZ1xuXHRMZXZlbCBpbnRcbn1cblxuLy8gY2FjaGVkQ29udGVudCBpcyBhIHJlbmRlcmVkIHJvdXRlIGJvZHk7IGFuIGVtcHR5IEhUTUwgY291bnRzIGFzIGEgY2FjaGUgbWlzcy5cbnR5cGUgY2FjaGVkQ29udGVudCBzdHJ1Y3Qge1xuXHRIVE1MIHN0cmluZ1xuXHRUT0MgIFtdVE9DSXRlbVxufVxuXG4vLyBWaWV3U3RhdGUgaXMgdGhlIHN0YXRlIG9mIHRoZSBjdXJyZW50IHJvdXRlJ3MgY29udGVudCByZWdpb24uXG4vLyBPbmx5IHRoZSBmaWVsZCBtYXRjaGluZyByb3V0ZS5LaW5kIGlzIHBvcHVsYXRlZC4gQWx3YXlzIGJ1aWxkIGl0IHdpdGhcbi8vIG5ld1ZpZXdTdGF0ZSgpOiBhIGJhcmUgc3RydWN0IGxpdGVyYWwgbGVhdmVzIFN0YXR1cyBhcyBudWxsLCBub3QgTG9hZFJlYWR5LlxudHlwZSBWaWV3U3RhdGUgc3RydWN0IHtcblx0UG9zdCAgICAgQmxvZ1Bvc3Rcblx0UHJvaiAgICAgUHJvamVjdCAvLyBub3QgYFByb2plY3RgOiBhIGZpZWxkIG5hbWVkIGFmdGVyIGl0cyB0eXBlIGJyZWFrcyB0aGUgZW1pdHRlZCBjb25zdHJ1Y3RvclxuXHRQYWdlICAgICBOYXZQYWdlXG5cdEhUTUwgICAgIHN0cmluZyAvLyByZW5kZXJlZCBtYXJrZG93biBmb3IgcG9zdCwgcmVhZG1lIG9yIHBhZ2Vcblx0U3RhdHVzICAgTG9hZFN0YXR1c1xuXHRIYXNQcmV2ICBib29sXG5cdFByZXZQb3N0IEJsb2dQb3N0XG5cdEhhc05leHQgIGJvb2xcblx0TmV4dFBvc3QgQmxvZ1Bvc3Rcblx0VE9DICAgICAgW11UT0NJdGVtXG59XG5cbnR5cGUgU29jaWFsTGluayBzdHJ1Y3Qge1xuXHRJY29uICAgc3RyaW5nXG5cdEhyZWYgICBzdHJpbmdcblx0VGFyZ2V0IHN0cmluZ1xuXHRSZWwgICAgc3RyaW5nXG59XG5cbnR5cGUgVGhlbWVDb2xvcnMgc3RydWN0IHtcblx0UHJpbWFyeSAgICAgICBzdHJpbmdcblx0U2Vjb25kYXJ5ICAgICBzdHJpbmdcblx0QmFja2dyb3VuZCAgICBzdHJpbmdcblx0VGV4dCAgICAgICAgICBzdHJpbmdcblx0VGV4dExpZ2h0ICAgICBzdHJpbmdcblx0Qm9yZGVyICAgICAgICBzdHJpbmdcblx0SG92ZXIgICAgICAgICBzdHJpbmdcblx0Q29kZVRoZW1lICAgICBzdHJpbmdcblx0Q29tbWVudHNUaGVtZSBzdHJpbmdcbn1cblxuLy8gQ29tbWVudHNDb25maWcgaG9sZHMgdGhlIHR3byBwYWdlIHRvZ2dsZXM7IEF0dHJzIGlzIHRoZSByYXcgZ2lzY3VzIGNvbmZpZ1xuLy8gb2JqZWN0IHdob3NlIGNhbWVsQ2FzZSBrZXlzIG1hcCAxOjEgdG8gZGF0YS0qIGF0dHJpYnV0ZXMgb24gdGhlIGNsaWVudCBzY3JpcHQuXG50eXBlIENvbW1lbnRzQ29uZmlnIHN0cnVjdCB7XG5cdEJsb2dFbmFibGVkICAgICBib29sXG5cdFByb2plY3RzRW5hYmxlZCBib29sXG5cdEF0dHJzICAgICAgICAgICBhbnlcbn1cblxudHlwZSBFbWFpbEpTQ29uZmlnIHN0cnVjdCB7XG5cdEVuYWJsZWQgICBib29sXG5cdFNlcnZpY2VJZCBzdHJpbmdcblx0VGVtcGxhdGVJZCBzdHJpbmdcblx0UHVibGljS2V5IHN0cmluZ1xufVxuXG50eXBlIFNlYXJjaENvbmZpZyBzdHJ1Y3Qge1xuXHRFbmFibGVkICAgICBib29sXG5cdE1pbkNoYXJzICAgIGludFxuXHRQbGFjZWhvbGRlciBzdHJpbmdcbn1cblxudHlwZSBTaXRlQ29uZmlnIHN0cnVjdCB7XG5cdFRpdGxlICAgICAgICAgIHN0cmluZ1xuXHRVcmwgICAgICAgICAgICBzdHJpbmdcblx0RGVzY3JpcHRpb24gICAgc3RyaW5nXG5cdEF1dGhvciAgICAgICAgIHN0cmluZ1xuXHRHaXRodWJVc2VybmFtZSBzdHJpbmdcblx0RGFya1RoZW1lICAgICAgVGhlbWVDb2xvcnNcblx0TGlnaHRUaGVtZSAgICAgVGhlbWVDb2xvcnNcblx0Q29tbWVudHMgICAgICAgQ29tbWVudHNDb25maWdcblx0RW1haWxKUyAgICAgICAgRW1haWxKU0NvbmZpZ1xuXHRTZWFyY2ggICAgICAgICBTZWFyY2hDb25maWdcblx0U29jaWFsICAgICAgICAgW11Tb2NpYWxMaW5rXG5cdFBvc3RzUGVyUGFnZSAgIGludFxufVxuXG50eXBlIFNlYXJjaFJlc3VsdEl0ZW0gc3RydWN0IHtcblx0SUQgICAgICAgICAgc3RyaW5nXG5cdFRpdGxlICAgICAgIHN0cmluZ1xuXHREZXNjcmlwdGlvbiBzdHJpbmdcblx0VGFncyAgICAgICAgW11zdHJpbmdcblx0SXRlbVR5cGUgICAgc3RyaW5nXG5cdFVybCAgICAgICAgIHN0cmluZ1xufVxuXG50eXBlIENvbnRhY3RTdGF0ZSBzdHJ1Y3Qge1xuXHROYW1lICAgICAgICAgICBzdHJpbmdcblx0RW1haWwgICAgICAgICAgc3RyaW5nXG5cdE1lc3NhZ2UgICAgICAgIHN0cmluZ1xuXHRTdGF0dXNUZXh0ICAgICBzdHJpbmdcblx0U3RhdHVzVHlwZSAgICAgc3RyaW5nXG5cdEJ1dHRvblN0YXRlICAgIHN0cmluZ1xuXHRCdXR0b25EaXNhYmxlZCBib29sXG5cdEVyck5hbWUgICAgICAgIGJvb2xcblx0RXJyRW1haWwgICAgICAgYm9vbFxuXHRFcnJNZXNzYWdlICAgICBib29sXG59XG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwianM6Li9icm93c2VyLmQudHNcIlxuaW1wb3J0IFwic3RyY29udlwiXG5cbnZhciBhcHBSZWZzID0gbWFwW3N0cmluZ11hbnl7fVxuXG4vLyDilIDilIAgUmVnaW9uIHJlbmRlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4vLyBUaGUgYXBwIHNoZWxsIGlzIG1vdW50ZWQgb25jZSBpbiBtYWluKCk7IHRoZXNlIHJlLXJlbmRlciBvbmx5IHRoZVxuLy8gcmVnaW9uIHRoYXQgZGVwZW5kcyBvbiB0aGUgc3RhdGUgdGhhdCBjaGFuZ2VkLlxuXG5mdW5jIHJlbmRlck1haW4oKSB7XG5cdGdvbS5Nb3VudChcIiNjb250ZW50LXNsb3RcIiwgTWFpbkNvbnRlbnQoKSlcbn1cblxuZnVuYyByZW5kZXJOYXZiYXIoKSB7XG5cdGdvbS5Nb3VudChcIiNuYXZiYXItc2xvdFwiLCBOYXZiYXIocm91dGUsIG5hdlBhZ2VzLCBwcm9qZWN0cywgcHJvamVjdHNEcm9wZG93bk9wZW4sIG1vYmlsZU1lbnVPcGVuLCBzaXRlKSlcbn1cblxuZnVuYyByZW5kZXJDb250YWN0Rm9ybSgpIHtcblx0Z29tLk1vdW50KFwiI2NvbnRhY3QtZm9ybVwiLCBDb250YWN0Rm9ybUZpZWxkcyhjb250YWN0Rm9ybSkpXG59XG5cbmZ1bmMgcmVuZGVyUm91dGUoKSB7XG5cdHJlbmRlck5hdmJhcigpXG5cdHJlbmRlck1haW4oKVxufVxuXG4vLyDilIDilIAgT3ZlcmxheSByZWNvbmNpbGlhdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuYyBzZXRDbGFzcyhzZWxlY3RvciBzdHJpbmcsIGNscyBzdHJpbmcsIG9uIGJvb2wpIHtcblx0ZWwgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcilcblx0aWYgZWwgIT0gbmlsIHtcblx0XHRlbC5jbGFzc0xpc3QudG9nZ2xlKGNscywgb24pXG5cdH1cbn1cblxuZnVuYyBzZXRBdHRyKHNlbGVjdG9yIHN0cmluZywgbmFtZSBzdHJpbmcsIHZhbHVlIHN0cmluZykge1xuXHRlbCA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuXHRpZiBlbCAhPSBuaWwge1xuXHRcdGVsLnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSlcblx0fVxufVxuXG4vLyBmb2N1c0xhdGVyIGZvY3VzZXMgdGhlIGVsZW1lbnQgb25jZSB0aGUgb3ZlcmxheSdzIG9wZW4gdHJhbnNpdGlvbiBoYXMgc3RhcnRlZC5cbmZ1bmMgZm9jdXNMYXRlcihzZWxlY3RvciBzdHJpbmcpIHtcblx0c2V0VGltZW91dChmdW5jKCkge1xuXHRcdGVsIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG5cdFx0aWYgZWwgIT0gbmlsIHtcblx0XHRcdGVsLmZvY3VzKClcblx0XHR9XG5cdH0sIDUwKVxufVxuXG4vLyBzeW5jT3ZlcmxheXMgYXBwbGllcyBvdmVybGF5IHN0YXRlIHRvIHRoZSBleGlzdGluZyBlbGVtZW50cyBpbnN0ZWFkIG9mXG4vLyByZW1vdW50aW5nIHRoZW0sIHNvIHRoZSBDU1MgbWF4LWhlaWdodC9rZXlmcmFtZSB0cmFuc2l0aW9ucyBzdGlsbCBwbGF5LlxuZnVuYyBzeW5jT3ZlcmxheXMoKSB7XG5cdHNldENsYXNzKFwiLm5hdmJhci10b2dnbGVcIiwgXCJhY3RpdmVcIiwgbW9iaWxlTWVudU9wZW4pXG5cdHNldEF0dHIoXCIubmF2YmFyLXRvZ2dsZVwiLCBcImFyaWEtZXhwYW5kZWRcIiwgc3RyY29udi5Gb3JtYXRCb29sKG1vYmlsZU1lbnVPcGVuKSlcblx0c2V0Q2xhc3MoXCIubmF2YmFyLWNvbGxhcHNlXCIsIFwic2hvd1wiLCBtb2JpbGVNZW51T3BlbilcblxuXHRzZXRDbGFzcyhcIi5kcm9wZG93blwiLCBcInNob3dcIiwgcHJvamVjdHNEcm9wZG93bk9wZW4pXG5cdHNldEF0dHIoXCIuZHJvcGRvd24tdG9nZ2xlXCIsIFwiYXJpYS1leHBhbmRlZFwiLCBzdHJjb252LkZvcm1hdEJvb2wocHJvamVjdHNEcm9wZG93bk9wZW4pKVxuXG5cdHNldENsYXNzKFwiI3NlYXJjaC1wYWdlXCIsIFwic2hvd1wiLCBzZWFyY2hPcGVuKVxuXHRzZXRDbGFzcyhcIiNzZWFyY2gtcGFnZS1jbGVhclwiLCBcInNob3dcIiwgc2VhcmNoUXVlcnkgIT0gXCJcIilcblx0c2V0Q2xhc3MoXCIjY29udGFjdC1tb2RhbFwiLCBcInNob3dcIiwgY29udGFjdE9wZW4pXG59XG5cbi8vIHJlc2V0T3ZlcmxheXMgY2xvc2VzIGV2ZXJ5IG92ZXJsYXkgd2l0aG91dCBhbmltYXRpb24gKHVzZWQgb24gcm91dGUgY2hhbmdlKS5cbmZ1bmMgcmVzZXRPdmVybGF5cygpIHtcblx0bW9iaWxlTWVudU9wZW4gPSBmYWxzZVxuXHRwcm9qZWN0c0Ryb3Bkb3duT3BlbiA9IGZhbHNlXG5cdGNvbnRhY3RPcGVuID0gZmFsc2Vcblx0aWYgc2VhcmNoT3BlbiB8fCBzZWFyY2hRdWVyeSAhPSBcIlwiIHtcblx0XHRzZWFyY2hPcGVuID0gZmFsc2Vcblx0XHRzZXRTZWFyY2hRdWVyeShcIlwiKVxuXHR9XG5cdHN5bmNPdmVybGF5cygpXG59XG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwic3RyaW5nc1wiXG5cbi8vIG5ld1ZpZXdTdGF0ZSByZXR1cm5zIGEgVmlld1N0YXRlIHdpdGggZXZlcnkgbmVzdGVkIHNsaWNlIGluaXRpYWxpc2VkIHNvXG4vLyB0ZW1wbCBgbGVuYC9gcmFuZ2VgIG5ldmVyIHNlZSBhIG5pbCBzbGljZS4gU3RhdHVzIGlzIHNldCBleHBsaWNpdGx5IGJlY2F1c2Vcbi8vIG5hbWVkLWludCBmaWVsZHMgY29tcGlsZSB0byBudWxsLCBub3QgMC5cbmZ1bmMgbmV3Vmlld1N0YXRlKCkgVmlld1N0YXRlIHtcblx0cmV0dXJuIFZpZXdTdGF0ZXtcblx0XHRQb3N0OiAgICAgQmxvZ1Bvc3R7VGFnczogW11zdHJpbmd7fX0sXG5cdFx0UHJvajogICAgIFByb2plY3R7VGFnczogW11zdHJpbmd7fSwgWW91dHViZVZpZGVvczogW11zdHJpbmd7fSwgTGlua3M6IFtdUHJvamVjdExpbmt7fX0sXG5cdFx0U3RhdHVzOiAgIExvYWRSZWFkeSxcblx0XHRQcmV2UG9zdDogQmxvZ1Bvc3R7VGFnczogW11zdHJpbmd7fX0sXG5cdFx0TmV4dFBvc3Q6IEJsb2dQb3N0e1RhZ3M6IFtdc3RyaW5ne319LFxuXHRcdFRPQzogICAgICBbXVRPQ0l0ZW17fSxcblx0fVxufVxuXG4vLyBmcm9tQ2FjaGUgY29waWVzIGEgY2FjaGUgaGl0IGludG8gdiBhbmQgcmVwb3J0cyB3aGV0aGVyIHRoZXJlIHdhcyBvbmUuXG5mdW5jIGZyb21DYWNoZSh2ICpWaWV3U3RhdGUsIGNhY2hlIG1hcFtzdHJpbmddY2FjaGVkQ29udGVudCwga2V5IHN0cmluZykgYm9vbCB7XG5cdGMsIG9rIDo9IGNhY2hlW2tleV1cblx0aWYgIW9rIHx8IGMuSFRNTCA9PSBcIlwiIHtcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHR2LkhUTUwgPSBjLkhUTUxcblx0di5UT0MgPSBjLlRPQ1xuXHRyZXR1cm4gdHJ1ZVxufVxuXG4vLyByZXNvbHZlUG9zdCBidWlsZHMgdGhlIHZpZXcgZm9yIGEgYmxvZyBwb3N0IHNsdWcuIFRoZSBib29sIHJlcG9ydHMgd2hldGhlclxuLy8gdGhlIG1hcmtkb3duIHN0aWxsIGhhcyB0byBiZSBmZXRjaGVkLlxuZnVuYyByZXNvbHZlUG9zdChzbHVnIHN0cmluZywgYWxsIFtdQmxvZ1Bvc3QsIGNhY2hlIG1hcFtzdHJpbmddY2FjaGVkQ29udGVudCkgKFZpZXdTdGF0ZSwgYm9vbCkge1xuXHR2IDo9IG5ld1ZpZXdTdGF0ZSgpXG5cdGZvciBpLCBwIDo9IHJhbmdlIGFsbCB7XG5cdFx0aWYgcC5TbHVnID09IHNsdWcge1xuXHRcdFx0di5Qb3N0ID0gcFxuXHRcdFx0aWYgaSsxIDwgbGVuKGFsbCkge1xuXHRcdFx0XHR2Lkhhc1ByZXYgPSB0cnVlXG5cdFx0XHRcdHYuUHJldlBvc3QgPSBhbGxbaSsxXVxuXHRcdFx0fVxuXHRcdFx0aWYgaSA+IDAge1xuXHRcdFx0XHR2Lkhhc05leHQgPSB0cnVlXG5cdFx0XHRcdHYuTmV4dFBvc3QgPSBhbGxbaS0xXVxuXHRcdFx0fVxuXHRcdFx0aWYgZnJvbUNhY2hlKCZ2LCBjYWNoZSwgcC5IcmVmKSB7XG5cdFx0XHRcdHJldHVybiB2LCBmYWxzZVxuXHRcdFx0fVxuXHRcdFx0di5TdGF0dXMgPSBMb2FkUGVuZGluZ1xuXHRcdFx0cmV0dXJuIHYsIHRydWVcblx0XHR9XG5cdH1cblx0di5TdGF0dXMgPSBMb2FkTm90Rm91bmRcblx0cmV0dXJuIHYsIGZhbHNlXG59XG5cbi8vIHJlc29sdmVQcm9qZWN0IGJ1aWxkcyB0aGUgdmlldyBmb3IgYSBwcm9qZWN0IGlkLiBQcm9qZWN0cyB3aXRob3V0IGEgR2l0SHViXG4vLyByZXBvIGFyZSByZWFkeSBpbW1lZGlhdGVseTsgb3RoZXJ3aXNlIHRoZSBSRUFETUUgY2FjaGUgZGVjaWRlcy5cbmZ1bmMgcmVzb2x2ZVByb2plY3QoaWQgc3RyaW5nLCBhbGwgW11Qcm9qZWN0LCBjYWNoZSBtYXBbc3RyaW5nXWNhY2hlZENvbnRlbnQpIChWaWV3U3RhdGUsIGJvb2wpIHtcblx0diA6PSBuZXdWaWV3U3RhdGUoKVxuXHRmb3IgXywgcCA6PSByYW5nZSBhbGwge1xuXHRcdGlmIHAuSUQgPT0gaWQge1xuXHRcdFx0di5Qcm9qID0gcFxuXHRcdFx0aWYgcC5HaXRodWJSZXBvID09IFwiXCIge1xuXHRcdFx0XHR2LlRPQyA9IGV4dHJhY3RQcm9qZWN0VE9DKFwiXCIsIHApXG5cdFx0XHRcdHJldHVybiB2LCBmYWxzZVxuXHRcdFx0fVxuXHRcdFx0aWYgZnJvbUNhY2hlKCZ2LCBjYWNoZSwgcC5IcmVmKSB7XG5cdFx0XHRcdHJldHVybiB2LCBmYWxzZVxuXHRcdFx0fVxuXHRcdFx0di5TdGF0dXMgPSBMb2FkUGVuZGluZ1xuXHRcdFx0cmV0dXJuIHYsIHRydWVcblx0XHR9XG5cdH1cblx0di5TdGF0dXMgPSBMb2FkTm90Rm91bmRcblx0cmV0dXJuIHYsIGZhbHNlXG59XG5cbi8vIHJlc29sdmVQYWdlIGJ1aWxkcyB0aGUgdmlldyBmb3IgYSBjdXN0b20gcGFnZSBpZC4gVW5rbm93biBpZHMgc3RpbGwgZmV0Y2gsXG4vLyBzbyB0aGUgbWFya2Rvd24gZmlsZSAob3IgaXRzIDQwNCkgaXMgdGhlIHNvdXJjZSBvZiB0cnV0aC5cbmZ1bmMgcmVzb2x2ZVBhZ2UoaWQgc3RyaW5nLCBhbGwgW11OYXZQYWdlLCBjYWNoZSBtYXBbc3RyaW5nXWNhY2hlZENvbnRlbnQpIChWaWV3U3RhdGUsIGJvb2wpIHtcblx0diA6PSBuZXdWaWV3U3RhdGUoKVxuXHR2LlBhZ2UgPSBOYXZQYWdle0lEOiBpZCwgVGl0bGU6IGlkLCBIcmVmOiBuYXZQYWdlSHJlZihpZCl9XG5cdGZvciBfLCBwIDo9IHJhbmdlIGFsbCB7XG5cdFx0aWYgcC5JRCA9PSBpZCB7XG5cdFx0XHR2LlBhZ2UgPSBwXG5cdFx0XHRicmVha1xuXHRcdH1cblx0fVxuXHRpZiB2LlBhZ2UuVGl0bGUgPT0gXCJcIiB7XG5cdFx0di5QYWdlLlRpdGxlID0gaWRcblx0fVxuXHRpZiBmcm9tQ2FjaGUoJnYsIGNhY2hlLCB2LlBhZ2UuSHJlZikge1xuXHRcdHJldHVybiB2LCBmYWxzZVxuXHR9XG5cdHYuU3RhdHVzID0gTG9hZFBlbmRpbmdcblx0cmV0dXJuIHYsIHRydWVcbn1cblxuZnVuYyByZWFkbWVVUkwocCBQcm9qZWN0LCBnaXRodWJVc2VybmFtZSBzdHJpbmcpIHN0cmluZyB7XG5cdHJlcG8gOj0gcC5HaXRodWJSZXBvXG5cdGlmICFzdHJpbmdzLkNvbnRhaW5zKHJlcG8sIFwiL1wiKSB7XG5cdFx0cmVwbyA9IGdpdGh1YlVzZXJuYW1lICsgXCIvXCIgKyByZXBvXG5cdH1cblx0YnJhbmNoIDo9IHAuR2l0aHViQnJhbmNoXG5cdGlmIGJyYW5jaCA9PSBcIlwiIHtcblx0XHRicmFuY2ggPSBcIm1haW5cIlxuXHR9XG5cdHJldHVybiBcImh0dHBzOi8vcmF3LmdpdGh1YnVzZXJjb250ZW50LmNvbS9cIiArIHJlcG8gKyBcIi9cIiArIGJyYW5jaCArIFwiL1JFQURNRS5tZFwiXG59XG4iXX0=
