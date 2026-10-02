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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9hcHAudGVtcGwiLCIuLi9zcmMvYmxvZy50ZW1wbCIsIi4uL3NyYy9jb21tZW50cy5nbyIsIi4uL3NyYy9jb250YWN0LnRlbXBsIiwiLi4vc3JjL2VtYWlsLmdvIiwiLi4vc3JjL2Zvb3Rlci50ZW1wbCIsIi4uL3NyYy9pY29ucy5nbyIsIi4uL3NyYy9pY29ucy50ZW1wbCIsIi4uL3NyYy9sb2FkZXIuZ28iLCIuLi9zcmMvbWFpbi5nbyIsIi4uL3NyYy9tYXJrZG93bi5nbyIsIi4uL3NyYy9uYXZiYXIudGVtcGwiLCIuLi9zcmMvcGFnZS50ZW1wbCIsIi4uL3NyYy9wcm9qZWN0cy50ZW1wbCIsIi4uL3NyYy9yZW5kZXJfaGVscGVycy5nbyIsIi4uL3NyYy9yb3V0ZXIuZ28iLCIuLi9zcmMvc2VhcmNoLmdvIiwiLi4vc3JjL3NlYXJjaC50ZW1wbCIsIi4uL3NyYy9zdG9yZS5nbyIsIi4uL3NyYy90aGVtZS5nbyIsIi4uL3NyYy90eXBlcy5nbyIsIi4uL3NyYy91aS5nbyIsIi4uL3NyYy92aWV3LmdvIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQStDQTtBQUNBO0FBQ0E7QUFpSUE7QUFDQTtBQW1EQTtBQWpEQTtBQTVKQTtBQUNBO0FBQ0E7QUFpU0E7QUEvRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFsS0E7QUFDQTtBQXFLQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBNUtBO0FBOEtBOzs7QUFHQTtBQUNBO0FBQ0E7Ozs7O0FBOUtBO0FBQ0E7Ozs7O0FBRUE7QUFDQTs7Ozs7QUFFQTtBQUNBOzs7OztBQUVBO0FBQ0E7Ozs7O0FBRUE7QUFDQTs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFJQTs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7O0FBSUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUVsTUE7QUZFQTs7O0FBQ0E7OztBQUVBOzs7QUVHQTtBRkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7OztBRUlBO0FGRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7OztBRUVBO0FGRUE7QUFDQTtBQUNBOztBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUVFQTtBRkVBO0FBQ0E7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUk3REE7QUpFQTs7O0FJRUE7QUpFQTtBQUNBOzs7O0FJS0E7Ozs7QUpFQTtBQUtBOzs7Ozs7Ozs7QUlHQTtBSkVBO0FBQ0E7OztBSUVBO0FKRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUlJQTtBSkVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FJR0E7QUpFQTs7O0FBRUE7Ozs7O0FBRUE7Ozs7O0FBRUE7Ozs7OztBSUdBO0FKRUE7OztBSUlBOztBSkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7O0FBRUE7QUFDQTs7Ozs7QUFFQTtBQUNBOzs7OztBQUVBO0FBQ0E7Ozs7O0FBRUE7QUFDQTs7Ozs7QUFFQTs7O0FBRUE7QUFDQTs7O0FJRUE7Ozs7QUpFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUVBO0FBT0E7QUFVQTtBQUNBO0FBRUE7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUVBOzs7Ozs7Ozs7Ozs7Ozs7OztBTTVHQTtBTkVBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FRdENBO0FSRUE7Ozs7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFHQTtBQUlBO0FBQ0E7QUFDQTs7O0FTdkJBO0FURUE7QUFDQTs7O0FTRUE7QVRFQTtBQUNBOztBQUVBO0FBQ0E7OztBU0VBO0FURUE7QUFDQTs7O0FTRUE7QVRFQTtBQUNBOztBQUVBO0FBQ0E7OztBU0dBO0FURUE7QUFDQTs7O0FTSUE7QVRFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QVNFQTtBVEVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUlBO0FBa0pBO0FBV0E7QUFRQTtBQStEQTtBQWtCQTs7O0FTY0E7QVRFQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7O0FVelVBO0FWRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7OztBVUlBO0FWRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7Ozs7O0FBR0E7QUFDQTtBQUNBOzs7QUFDQTs7Ozs7Ozs7QUFJQTtBQUNBOzs7OztBQUdBOzs7QVVHQTtBVkVBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUNBO0FBQ0E7O0FBRUE7OztBQUVBOzs7QUFRQTs7O0FVSUE7QVZFQTtBQUNBO0FBQ0E7O0FBTUE7QUFDQTs7QUFNQTtBQUNBOztBQU1BOzs7QVVJQTtBVkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FVTUE7QVZFQTtBQUNBOztBQUlBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUlBO0FBQ0E7O0FBR0E7OztBVUVBOzs7O0FWRUE7QUFDQTs7QUFFQTtBQUtBOzs7Ozs7Ozs7QVVFQTtBVkVBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFHQTtBQUNBOzs7QVVFQTs7OztBVkVBO0FBTUE7QUFDQTtBQUNBOztBQUdBO0FBQ0E7Ozs7Ozs7OztBVUVBO0FWRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBVUdBOzs7O0FWRUE7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7Ozs7Ozs7QVVJQTtBVkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FVRUE7QVZFQTtBQUNBOztBQUVBOzs7QVVJQTtBVkVBOzs7QVVJQTs7OztBVkVBO0FBS0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFLQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QWNwVkE7QWRFQTs7O0FjR0E7QWRFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBY0lBO0FkRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBY0VBO0FkRUE7QUFDQTs7QUFFQTtBQUNBOzs7QWNHQTtBZEVBO0FBQ0E7O0FBRUE7OztBY0dBO0FkRUE7QUFDQTtBQUNBOztBQUVBOzs7QWNJQTtBZEVBO0FBQ0E7O0FBRUE7OztBY0VBO0FkRUE7QUFDQTs7QUFFQTs7O0FjSUE7QWRFQTtBQUNBOztBQUVBOzs7QUFDQTs7O0FBRUE7OztBY0dBO0FkRUE7QUFDQTs7O0FBQ0E7QUFDQTs7OztBQUdBOzs7QWNJQTtBZEVBO0FBQ0E7O0FBRUE7OztBY0lBO0FkRUE7OztBZTlHQTtBZkVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBY0E7QUFDQTtBQUNBOzs7O0FlR0E7QWZFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FlR0E7QWZFQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7OztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBRUE7OztBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBRUE7OztBQUNBO0FBQ0E7O0FBRUE7OztBQUVBOzs7QUFDQTtBQUNBOztBQUVBOzs7QUFFQTs7O0FlRUE7QWZFQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7Ozs7OztBQUVBOzs7Ozs7QUFFQTs7Ozs7O0FBRUE7Ozs7OztBZVdBO0FmRUE7QUFDQTtBQUNBOzs7QWVFQTtBZkVBO0FBQ0E7QUFJQTtBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBR0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7O0FBRUE7Ozs7O0FBRUE7Ozs7O0FBRUE7Ozs7O0FBRUE7Ozs7O0FBRUE7Ozs7QUFJQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBS0E7QUFDQTtBQUNBOzs7O0FlR0E7QWZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBZUVBO0FmRUE7QUFDQTs7O0FlS0E7QWZFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QWVHQTtBZkVBO0FBQ0E7QUFDQTs7O0FlSUE7QWZFQTs7O0FlT0E7QWZFQTs7O0FlRUE7QWZFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QWVFQTtBZkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QWVFQTtBZkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTs7O0FnQjlSQTtBaEJFQTtBQUdBOztBQUNBO0FBUUE7O0FBSUE7O0FBQ0E7QUFRQTs7QUFHQTtBQVdBOzs7QWdCRUE7QWhCRUE7QUFDQTs7QUFFQTs7O0FnQkVBO0FoQkVBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7OztBQUlBOztBQVVBOzs7QWdCSUE7QWhCRUE7QUFDQTtBQUNBOzs7O0FnQkdBO0FoQkVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBZ0JFQTtBaEJFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QWdCRUE7QWhCRUE7OztBZ0JFQTtBaEJFQTtBQUNBO0FBQ0E7QUFDQTs7OztBZ0JHQTtBaEJFQTtBQUNBO0FBQ0E7Ozs7QWdCSUE7QWhCRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7QWdCSUE7QWhCRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FnQkVBO0FoQkVBOzs7QWdCSUE7QWhCRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FnQkVBO0FoQkVBO0FBQ0E7QUFDQTs7O0FnQkdBO0FoQkVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FnQkVBO0FoQkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QWtCdktBO0FsQkVBOzs7O0FBQ0E7OztBQUVBOzs7QWtCS0E7QWxCRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FrQkdBO0FsQkVBO0FBQ0E7O0FBRUE7OztBa0JFQTtBbEJFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7O0FrQkVBO0FsQkVBO0FBQ0E7QUFDQTs7O0FrQkVBO0FsQkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FrQkVBO0FsQkVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7OztBa0JHQTtBbEJFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FrQktBO0FsQkVBO0FBQ0E7O0FBRUE7OztBa0JFQTtBbEJFQTtBQUNBOztBQUVBOzs7QWtCRUE7QWxCRUE7QUFDQTs7QUFFQTs7O0FrQkdBO0FsQkVBO0FBQ0E7QUFDQTs7QUFDQTs7O0FBR0E7OztBa0JHQTtBbEJFQTtBQUNBO0FBQ0E7OztBa0JXQTtBbEJFQTs7O0FrQldBO0FsQkVBO0FBQ0E7QUFDQTs7QUFDQTs7O0FBUUE7QUFDQTs7O0FrQm1CQTtBbEJFQTtBQVVBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FrQkVBO0FsQkVBOzs7QWtCS0E7QWxCRUE7OztBa0JHQTtBbEJFQTs7O0FrQlFBO0FsQkVBOzs7QWtCSUE7QWxCRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOztBQUdBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBSUE7QUFDQTs7QUFPQTtBQUNBOztBQVFBO0FBQ0E7O0FBT0E7QUFDQTs7QUFDQTs7OztBQVdBO0FBQ0E7QUFDQTs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFDQTs7QUFFQTs7O0FBS0E7QUFDQTs7QUFDQTs7QUFFQTs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7O0FBR0E7QUFDQTs7O0FtQm5YQTtBbkJFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBOzs7QW1CRUE7QW5CRUE7QUFDQTs7QUFFQTs7O0FtQkVBO0FuQkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBbUJFQTtBbkJFQTtBQUNBO0FBQ0E7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QW1CR0E7QW5CRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QW1CSUE7QW5CRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7O0FtQkdBO0FuQkVBO0FBQ0E7O0FBRUE7OztBbUJFQTtBbkJFQTtBQUNBO0FBQ0E7OztBbUJFQTtBbkJFQTtBQUNBOzs7QXFCbEZBO0FyQkVBOzs7QXFCRUE7QXJCRUE7OztBcUJFQTtBckJFQTs7O0FxQkVBO0FyQkVBO0FBQ0E7OztBcUJJQTtBckJFQTtBQUNBO0FBQ0E7Ozs7QXFCR0E7QXJCRUE7QUFDQTtBQUNBOzs7O0FxQklBO0FyQkVBOzs7QXFCU0E7QXJCRUE7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7O0FxQkdBO0FyQkVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FzQnhFQTtBdEJFQTs7O0FzQlVBO0F0QkVBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QXNCSUE7QXRCRUE7QUFDQTs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOzs7QXNCSUE7QXRCRUE7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7O0FzQklBO0F0QkVBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QXNCRUE7QXRCRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQSIsInNvdXJjZXNDb250ZW50IjpbInBhY2thZ2UgbWFpblxuXG50ZW1wbCBOb3RGb3VuZFZpZXcoKSB7XG5cdDxkaXYgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+XG5cdFx0PGgxPnsgdChcImdlbmVyYWwubm90Rm91bmRcIikgfTwvaDE+XG5cdFx0PHA+eyB0KFwiZ2VuZXJhbC5ub3RGb3VuZE1lc3NhZ2VcIikgfTwvcD5cblx0XHQ8ZGl2IGNsYXNzPVwiZG93bmxvYWQtYnV0dG9uc1wiIHN0eWxlPVwibWFyZ2luLXRvcDogMS41cmVtO1wiPlxuXHRcdFx0PGEgaHJlZj1cIi9cIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIGRhdGEtYWN0aW9uPVwibmF2XCI+eyB0KFwiZ2VuZXJhbC5iYWNrVG9Ib21lXCIpIH08L2E+XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxufVxuXG50ZW1wbCBSb3V0ZVZpZXcociBSb3V0ZU1hdGNoKSB7XG5cdHN3aXRjaCByLktpbmQge1xuXHRjYXNlIFJvdXRlUG9zdDpcblx0XHRAQmxvZ1Bvc3RWaWV3KHZpZXcsIHNpdGUuQ29tbWVudHMuQmxvZ0VuYWJsZWQpXG5cdGNhc2UgUm91dGVQcm9qZWN0OlxuXHRcdEBQcm9qZWN0RGV0YWlsKHZpZXcsIHNpdGUuQ29tbWVudHMuUHJvamVjdHNFbmFibGVkKVxuXHRjYXNlIFJvdXRlUGFnZTpcblx0XHRAUGFnZVZpZXcodmlldylcblx0Y2FzZSBSb3V0ZU5vdEZvdW5kOlxuXHRcdEBOb3RGb3VuZFZpZXcoKVxuXHRkZWZhdWx0OlxuXHRcdEBCbG9nTGlzdChwb3N0cywgci5QYWdlLCBzaXRlLlBvc3RzUGVyUGFnZSlcblx0fVxufVxuXG50ZW1wbCBNYWluQ29udGVudCgpIHtcblx0PG1haW4gaWQ9XCJtYWluLWNvbnRlbnRcIiB0YWJpbmRleD1cIi0xXCI+XG5cdFx0QFJvdXRlVmlldyhyb3V0ZSlcblx0PC9tYWluPlxufVxuXG50ZW1wbCBBcHBTaGVsbCgpIHtcblx0PGRpdiByZWY9XCJhcHBSb290XCIgY2xhc3M9XCJhcHAtcm9vdFwiPlxuXHRcdDxhIGhyZWY9XCIjbWFpbi1jb250ZW50XCIgY2xhc3M9XCJza2lwLWxpbmtcIj57IHQoXCJuYXYuc2tpcFRvQ29udGVudFwiKSB9PC9hPlxuXHRcdDxkaXYgcmVmPVwicm91dGVBbm5vdW5jZXJcIiBpZD1cInJvdXRlLWFubm91bmNlclwiIGNsYXNzPVwic3Itb25seVwiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGFyaWEtYXRvbWljPVwidHJ1ZVwiPjwvZGl2PlxuXHRcdDxkaXYgaWQ9XCJuYXZiYXItc2xvdFwiPlxuXHRcdFx0QE5hdmJhcihyb3V0ZSwgbmF2UGFnZXMsIHByb2plY3RzLCBwcm9qZWN0c0Ryb3Bkb3duT3BlbiwgbW9iaWxlTWVudU9wZW4sIHNpdGUpXG5cdFx0PC9kaXY+XG5cdFx0PGRpdiBpZD1cImNvbnRlbnQtc2xvdFwiPlxuXHRcdFx0QE1haW5Db250ZW50KClcblx0XHQ8L2Rpdj5cblx0XHRARm9vdGVyKGN1cnJlbnRZZWFyKCksIHNpdGUuQXV0aG9yKVxuXHRcdEBTZWFyY2hNb2RhbChzZWFyY2hPcGVuLCBzZWFyY2hRdWVyeSwgc2VhcmNoUmVzdWx0cywgc2VhcmNoU2VsZWN0ZWRJbmRleCwgc2VhcmNoUGxhY2Vob2xkZXJUZXh0KCkpXG5cdFx0QENvbnRhY3RNb2RhbChjb250YWN0T3BlbiwgY29udGFjdEZvcm0pXG5cdDwvZGl2PlxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcInN0cmNvbnZcIlxuXG50ZW1wbCBCbG9nUG9zdENhcmQocG9zdCBCbG9nUG9zdCkge1xuICAgIDxhcnRpY2xlXG4gICAgY2xhc3M9XCJibG9nLXBvc3QtY2FyZFwiXG4gICAgZGF0YS1hY3Rpb249XCJvcGVuLXBvc3RcIlxuICAgIGRhdGEtaHJlZj17IHBvc3QuSHJlZiB9XG4gICAgcm9sZT1cImFydGljbGVcIlxuICAgIGFyaWEtbGFiZWw9eyBwb3N0LlRpdGxlIH1cbiAgICA+XG4gICAgPGgyIGNsYXNzPVwiYmxvZy1wb3N0LXRpdGxlXCI+XG4gICAgICAgIDxhIGhyZWY9eyBwb3N0LkhyZWYgfSBkYXRhLWFjdGlvbj1cIm5hdlwiPnsgcG9zdC5UaXRsZSB9PC9hPlxuICAgICAgICA8L2gyPlxuICAgICAgICA8ZGl2IGNsYXNzPVwiYmxvZy1wb3N0LW1ldGFcIj5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiYmxvZy1wb3N0LWRhdGVcIj5cbiAgICAgICAgICAgICAgICBASWNvbihcImNhbGVuZGFyXCIsIFwiMXJlbVwiKVxuICAgICAgICAgICAgICAgIHsgXCIgXCIgKyBwb3N0LkRhdGUgfVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgaWYgbGVuKHBvc3QuVGFncykgPiAwIHtcbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzcz1cImJsb2ctcG9zdC10YWdzXCI+XG4gICAgICAgICAgICAgICAgICAgIGZvciBfLCB0YWcgOj0gcmFuZ2UgcG9zdC5UYWdzIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS10YWcgY2xpY2thYmxlLXRhZ1wiIGRhdGEtc2VhcmNoLXRhZz17IHRhZyB9PnsgdGFnIH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDxwIGNsYXNzPVwiYmxvZy1wb3N0LWV4Y2VycHRcIj57IHBvc3QuRXhjZXJwdCB9PC9wPlxuICAgICAgICAgICAgPC9hcnRpY2xlPlxuICAgICAgICB9XG5cbiAgICAgICAgdGVtcGwgUGFnaW5hdGlvbihjdXJyZW50UGFnZSBpbnQsIHRvdGFsUGFnZXMgaW50KSB7XG4gICAgICAgICAgICA8bmF2IGNsYXNzPVwiYmxvZy1wYWdpbmF0aW9uXCIgYXJpYS1sYWJlbD1cIkJsb2cgcGFnaW5hdGlvblwiPlxuICAgICAgICAgICAgICAgIDx1bCBjbGFzcz1cInBhZ2luYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPXsgY2xzKFwicGFnZS1pdGVtXCIsIGN1cnJlbnRQYWdlIDw9IDEsIFwiZGlzYWJsZWRcIikgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj17IHBhZ2VIcmVmKDEpIH0gZGF0YS1hY3Rpb249XCJuYXZcIiBhcmlhLWxhYmVsPVwiRmlyc3RcIiB0aXRsZT1cIkZpcnN0IFBhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBASWNvbihcImFuZ2xlcy1sZWZ0XCIsIFwiMC44NWVtXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz17IGNscyhcInBhZ2UtaXRlbVwiLCBjdXJyZW50UGFnZSA8PSAxLCBcImRpc2FibGVkXCIpIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9eyBwYWdlSHJlZihjdXJyZW50UGFnZSAtIDEpIH0gZGF0YS1hY3Rpb249XCJuYXZcIiBhcmlhLWxhYmVsPVwiUHJldmlvdXNcIiB0aXRsZT1cIlByZXZpb3VzIFBhZ2VcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBASWNvbihcImNoZXZyb24tbGVmdFwiLCBcIjAuODVlbVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICBmb3IgXywgcGFnZU51bSA6PSByYW5nZSBwYWdlTnVtYmVycyh0b3RhbFBhZ2VzKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICA8bGkgY2xhc3M9eyBjbHMoXCJwYWdlLWl0ZW1cIiwgcGFnZU51bSA9PSBjdXJyZW50UGFnZSwgXCJhY3RpdmVcIikgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9eyBwYWdlSHJlZihwYWdlTnVtKSB9IGRhdGEtYWN0aW9uPVwibmF2XCI+eyBwYWdlTnVtIH08L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9saT5cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz17IGNscyhcInBhZ2UtaXRlbVwiLCBjdXJyZW50UGFnZSA+PSB0b3RhbFBhZ2VzLCBcImRpc2FibGVkXCIpIH0+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgPGEgY2xhc3M9XCJwYWdlLWxpbmtcIiBocmVmPXsgcGFnZUhyZWYoY3VycmVudFBhZ2UgKyAxKSB9IGRhdGEtYWN0aW9uPVwibmF2XCIgYXJpYS1sYWJlbD1cIk5leHRcIiB0aXRsZT1cIk5leHQgUGFnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBASWNvbihcImNoZXZyb24tcmlnaHRcIiwgXCIwLjg1ZW1cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgICAgICAgPGxpIGNsYXNzPXsgY2xzKFwicGFnZS1pdGVtXCIsIGN1cnJlbnRQYWdlID49IHRvdGFsUGFnZXMsIFwiZGlzYWJsZWRcIikgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9eyBwYWdlSHJlZih0b3RhbFBhZ2VzKSB9IGRhdGEtYWN0aW9uPVwibmF2XCIgYXJpYS1sYWJlbD1cIkxhc3RcIiB0aXRsZT1cIkxhc3QgUGFnZVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBASWNvbihcImFuZ2xlcy1yaWdodFwiLCBcIjAuODVlbVwiKVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIHRlbXBsIEJsb2dMaXN0KGFsbFBvc3RzIFtdQmxvZ1Bvc3QsIGN1cnJlbnRQYWdlIGludCwgcGVyUGFnZSBpbnQpIHtcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmxvZy1jb250YWluZXJcIj5cbiAgICAgICAgICAgICAgICAgICAgPGgxIGNsYXNzPVwic3Itb25seVwiPnsgdChcIm5hdi5ibG9nXCIpIH08L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgbGVuKGFsbFBvc3RzKSA9PSAwIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cCBjbGFzcz1cImJsb2ctZW1wdHlcIj57IHQoXCJibG9nLm5vUG9zdHNcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmxvZy1wb3N0c1wiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIF8sIHBvc3QgOj0gcmFuZ2UgcGFnaW5hdGVkUG9zdHMoYWxsUG9zdHMsIGN1cnJlbnRQYWdlLCBwZXJQYWdlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQEJsb2dQb3N0Q2FyZChwb3N0KVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgY2FsY1RvdGFsUGFnZXMobGVuKGFsbFBvc3RzKSwgcGVyUGFnZSkgPiAxIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBQYWdpbmF0aW9uKGN1cnJlbnRQYWdlLCBjYWxjVG90YWxQYWdlcyhsZW4oYWxsUG9zdHMpLCBwZXJQYWdlKSlcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgdGVtcGwgVGFibGVPZkNvbnRlbnRzKGl0ZW1zIFtdVE9DSXRlbSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgbGVuKGl0ZW1zKSA+PSAyIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGV0YWlscyBjbGFzcz1cImJsb2ctdG9jXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzdW1tYXJ5IGNsYXNzPVwiYmxvZy10b2MtdGl0bGVcIj57IHQoXCJibG9nLnRhYmxlT2ZDb250ZW50c1wiKSB9PC9zdW1tYXJ5PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5hdiBjbGFzcz1cImJsb2ctdG9jLW5hdlwiIGFyaWEtbGFiZWw9eyB0KFwiYmxvZy50YWJsZU9mQ29udGVudHNcIikgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8dWwgY2xhc3M9XCJibG9nLXRvYy1saXN0XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciBfLCBpdGVtIDo9IHJhbmdlIGl0ZW1zIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxsaSBjbGFzcz17IFwiYmxvZy10b2MtaXRlbSBibG9nLXRvYy1sZXZlbC1cIiArIHN0cmNvbnYuSXRvYShpdGVtLkxldmVsKSB9PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyBcIiNcIiArIGl0ZW0uSUQgfT57IGl0ZW0uVGV4dCB9PC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbGk+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvdWw+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9uYXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2RldGFpbHM+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB0ZW1wbCBCbG9nUG9zdFZpZXcodiBWaWV3U3RhdGUsIGNvbW1lbnRzRW5hYmxlZCBib29sKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIHYuU3RhdHVzID09IExvYWROb3RGb3VuZCB8fCB2LlN0YXR1cyA9PSBMb2FkRmFpbGVkIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3M9XCJlcnJvci1tZXNzYWdlXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGgxPnsgdChcImdlbmVyYWwuYmxvZ05vdEZvdW5kXCIpIH08L2gxPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8cD57IHQoXCJnZW5lcmFsLmJsb2dOb3RGb3VuZE1lc3NhZ2VcIikgfTwvcD5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPGRpdiBjbGFzcz1cImJsb2ctcG9zdC12aWV3XCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8aDEgY2xhc3M9XCJwcm9qZWN0LXRpdGxlXCI+eyB2LlBvc3QuVGl0bGUgfTwvaDE+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHAgY2xhc3M9XCJwcm9qZWN0LWRlc2NyaXB0aW9uXCI+eyB2LlBvc3QuRGF0ZSB9PC9wPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiBsZW4odi5Qb3N0LlRhZ3MpID4gMCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwicHJvamVjdC10YWdzXCI+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yIF8sIHRhZyA6PSByYW5nZSB2LlBvc3QuVGFncyB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzPVwiaXRlbS10YWcgY2xpY2thYmxlLXRhZ1wiIGRhdGEtc2VhcmNoLXRhZz17IHRhZyB9PnsgdGFnIH08L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIEBUYWJsZU9mQ29udGVudHModi5UT0MpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiYmxvZy1wb3N0LWNvbnRlbnRcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwibWFya2Rvd24tYm9keVwiPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBAdGVtcGwuUmF3KHYuSFRNTClcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgdi5IYXNQcmV2IHx8IHYuSGFzTmV4dCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPG5hdiBjbGFzcz1cImRvd25sb2FkLWJ1dHRvbnMgYmxvZy1wb3N0LW5hdlwiIGFyaWEtbGFiZWw9XCJQb3N0IG5hdmlnYXRpb25cIj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgdi5IYXNQcmV2IHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyB2LlByZXZQb3N0LkhyZWYgfSBjbGFzcz1cImRvd25sb2FkLWJ0biBibG9nLW5hdi1wcmV2XCIgZGF0YS1hY3Rpb249XCJuYXZcIiB0aXRsZT17IHYuUHJldlBvc3QuVGl0bGUgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBASWNvbihcImFycm93LWxlZnRcIiwgXCIxcmVtXCIpXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+eyB0KFwiYmxvZy5wcmV2aW91c1Bvc3RcIikgfTwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiB2Lkhhc05leHQge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDxhIGhyZWY9eyB2Lk5leHRQb3N0LkhyZWYgfSBjbGFzcz1cImRvd25sb2FkLWJ0biBibG9nLW5hdi1uZXh0XCIgZGF0YS1hY3Rpb249XCJuYXZcIiB0aXRsZT17IHYuTmV4dFBvc3QuVGl0bGUgfT5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPHNwYW4+eyB0KFwiYmxvZy5uZXh0UG9zdFwiKSB9PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgQEljb24oXCJhcnJvdy1yaWdodFwiLCBcIjFyZW1cIilcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwvbmF2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIGNvbW1lbnRzRW5hYmxlZCB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzPVwiZ2lzY3VzLWNvbnRhaW5lclwiPjwvZGl2PlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwianM6Li9icm93c2VyLmQudHNcIlxuaW1wb3J0IFwic3RyaW5nc1wiXG5cbi8vIGdpc2N1c1RoZW1lIGlzIHRoZSBjb25maWd1cmVkIGNvbW1lbnRzIHRoZW1lIGZvciB0aGUgYWN0aXZlIHNpdGUgdGhlbWUsXG4vLyBmYWxsaW5nIGJhY2sgdG8gdGhlIHRoZW1lIG5hbWUgaXRzZWxmIChcImRhcmtcIi9cImxpZ2h0XCIpLlxuZnVuYyBnaXNjdXNUaGVtZSgpIHN0cmluZyB7XG5cdGlmIGN0IDo9IGdldFRoZW1lQ29sb3JzKGN1cnJlbnRUaGVtZSkuQ29tbWVudHNUaGVtZTsgY3QgIT0gXCJcIiB7XG5cdFx0cmV0dXJuIGN0XG5cdH1cblx0cmV0dXJuIGN1cnJlbnRUaGVtZVxufVxuXG4vLyBrZWJhYiBjb252ZXJ0cyBhIGNhbWVsQ2FzZSBrZXkgdG8ga2ViYWItY2FzZSAocmVwb0lkIC0+IHJlcG8taWQpLlxuZnVuYyBrZWJhYihzIHN0cmluZykgc3RyaW5nIHtcblx0dmFyIGIgc3RyaW5ncy5CdWlsZGVyXG5cdGZvciBpIDo9IDA7IGkgPCBsZW4ocyk7IGkrKyB7XG5cdFx0YyA6PSBzW2ldXG5cdFx0aWYgYyA+PSAnQScgJiYgYyA8PSAnWicge1xuXHRcdFx0Yi5Xcml0ZUJ5dGUoJy0nKVxuXHRcdFx0Yi5Xcml0ZUJ5dGUoYyArICgnYScgLSAnQScpKVxuXHRcdH0gZWxzZSB7XG5cdFx0XHRiLldyaXRlQnl0ZShjKVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gYi5TdHJpbmcoKVxufVxuXG4vLyBnaXNjdXNBdHRycyBtYXBzIHRoZSByYXcgY29tbWVudHMgY29uZmlnIHRvIGRhdGEtKiBhdHRyaWJ1dGVzOyB0aGUgdHdvIHBhZ2Vcbi8vIHRvZ2dsZXMgYXJlIG91cnMsIGV2ZXJ5dGhpbmcgZWxzZSBpcyBwYXNzZWQgdGhyb3VnaCB0byBnaXNjdXMuXG5mdW5jIGdpc2N1c0F0dHJzKHJhdyBhbnksIHRoZW1lIHN0cmluZykgbWFwW3N0cmluZ11zdHJpbmcge1xuXHRhdHRycyA6PSBtYXBbc3RyaW5nXXN0cmluZ3tcImRhdGEtdGhlbWVcIjogdGhlbWV9XG5cdGlmIHJhdyAhPSBuaWwge1xuXHRcdGZvciBrLCB2IDo9IHJhbmdlIHJhdy4obWFwW3N0cmluZ11hbnkpIHtcblx0XHRcdGlmIGsgPT0gXCJibG9nRW5hYmxlZFwiIHx8IGsgPT0gXCJwcm9qZWN0c0VuYWJsZWRcIiB7XG5cdFx0XHRcdGNvbnRpbnVlXG5cdFx0XHR9XG5cdFx0XHRhdHRyc1tcImRhdGEtXCIra2ViYWIoayldID0gc3RyVmFsKHYpXG5cdFx0fVxuXHR9XG5cdHJldHVybiBhdHRyc1xufVxuXG5mdW5jIGxvYWRHaXNjdXMoKSB7XG5cdGNvbnRhaW5lciA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmdpc2N1cy1jb250YWluZXJcIilcblx0aWYgY29udGFpbmVyID09IG5pbCB7XG5cdFx0cmV0dXJuXG5cdH1cblxuXHQvLyBDbGVhciBhbnkgZXhpc3RpbmcgZ2lzY3VzIGNvbnRlbnRcblx0Y29udGFpbmVyLmlubmVySFRNTCA9IFwiXCJcblxuXHRzY3JpcHQgOj0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxuXHRzY3JpcHQuc3JjID0gXCJodHRwczovL2dpc2N1cy5hcHAvY2xpZW50LmpzXCJcblx0Zm9yIG5hbWUsIHZhbHVlIDo9IHJhbmdlIGdpc2N1c0F0dHJzKHNpdGUuQ29tbWVudHMuQXR0cnMsIGdpc2N1c1RoZW1lKCkpIHtcblx0XHRzY3JpcHQuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKVxuXHR9XG5cdHNjcmlwdC5zZXRBdHRyaWJ1dGUoXCJjcm9zc29yaWdpblwiLCBcImFub255bW91c1wiKVxuXHRzY3JpcHQuYXN5bmMgPSB0cnVlXG5cdGNvbnRhaW5lci5hcHBlbmRDaGlsZChzY3JpcHQpXG59XG5cbmZ1bmMgdXBkYXRlR2lzY3VzVGhlbWUoKSB7XG5cdGlmcmFtZSA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiaWZyYW1lLmdpc2N1cy1mcmFtZVwiKVxuXHRpZiBpZnJhbWUgPT0gbmlsIHtcblx0XHRyZXR1cm5cblx0fVxuXG5cdGlmcmFtZS5jb250ZW50V2luZG93LnBvc3RNZXNzYWdlKG1hcFtzdHJpbmddYW55e1xuXHRcdFwiZ2lzY3VzXCI6IG1hcFtzdHJpbmddYW55e1xuXHRcdFx0XCJzZXRDb25maWdcIjogbWFwW3N0cmluZ11hbnl7XG5cdFx0XHRcdFwidGhlbWVcIjogZ2lzY3VzVGhlbWUoKSxcblx0XHRcdH0sXG5cdFx0fSxcblx0fSwgXCJodHRwczovL2dpc2N1cy5hcHBcIilcbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJzdHJjb252XCJcblxudGVtcGwgQ29udGFjdEZvcm1GaWVsZHMoZm9ybSBDb250YWN0U3RhdGUpIHtcblx0PGRpdiBjbGFzcz1cImZvcm0tZ3JvdXBcIj5cblx0XHQ8bGFiZWwgZm9yPVwiY29udGFjdC1uYW1lXCI+eyB0KFwiY29udGFjdC5uYW1lXCIpIH0qPC9sYWJlbD5cblx0XHQ8aW5wdXQgdHlwZT1cInRleHRcIiBpZD1cImNvbnRhY3QtbmFtZVwiIG5hbWU9XCJuYW1lXCIgcmVxdWlyZWQgY2xhc3M9eyBjbHMoXCJcIiwgZm9ybS5FcnJOYW1lLCBcImVycm9yXCIpIH0gYXJpYS1pbnZhbGlkPXsgc3RyY29udi5Gb3JtYXRCb29sKGZvcm0uRXJyTmFtZSkgfSB2YWx1ZT17IGZvcm0uTmFtZSB9Lz5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG5cdFx0PGxhYmVsIGZvcj1cImNvbnRhY3QtZW1haWxcIj57IHQoXCJjb250YWN0LmVtYWlsXCIpIH0qPC9sYWJlbD5cblx0XHQ8aW5wdXQgdHlwZT1cImVtYWlsXCIgaWQ9XCJjb250YWN0LWVtYWlsXCIgbmFtZT1cImVtYWlsXCIgcmVxdWlyZWQgY2xhc3M9eyBjbHMoXCJcIiwgZm9ybS5FcnJFbWFpbCwgXCJlcnJvclwiKSB9IGFyaWEtaW52YWxpZD17IHN0cmNvbnYuRm9ybWF0Qm9vbChmb3JtLkVyckVtYWlsKSB9IHZhbHVlPXsgZm9ybS5FbWFpbCB9Lz5cblx0PC9kaXY+XG5cdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG5cdFx0PGxhYmVsIGZvcj1cImNvbnRhY3QtbWVzc2FnZVwiPnsgdChcImNvbnRhY3QubWVzc2FnZVwiKSB9KjwvbGFiZWw+XG5cdFx0PHRleHRhcmVhIGlkPVwiY29udGFjdC1tZXNzYWdlXCIgbmFtZT1cIm1lc3NhZ2VcIiByb3dzPVwiNlwiIHJlcXVpcmVkIGNsYXNzPXsgY2xzKFwiXCIsIGZvcm0uRXJyTWVzc2FnZSwgXCJlcnJvclwiKSB9IGFyaWEtaW52YWxpZD17IHN0cmNvbnYuRm9ybWF0Qm9vbChmb3JtLkVyck1lc3NhZ2UpIH0+eyBmb3JtLk1lc3NhZ2UgfTwvdGV4dGFyZWE+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPXsgZm9ybVN0YXR1c0NsYXNzKGZvcm0uU3RhdHVzVHlwZSkgfSBpZD1cImNvbnRhY3Qtc3RhdHVzXCIgYXJpYS1saXZlPVwicG9saXRlXCI+XG5cdFx0PHNwYW4+eyBmb3JtLlN0YXR1c1RleHQgfTwvc3Bhbj5cblx0PC9kaXY+XG5cdDxidXR0b24gdHlwZT1cInN1Ym1pdFwiIGNsYXNzPVwiYnRuIGJ0bi1wcmltYXJ5XCIgaWQ9XCJjb250YWN0LXN1Ym1pdFwiIGRpc2FibGVkPz17IGZvcm0uQnV0dG9uRGlzYWJsZWQgfT5cblx0XHR7IHQoXCJjb250YWN0LlwiICsgZm9ybS5CdXR0b25TdGF0ZSkgfVxuXHQ8L2J1dHRvbj5cbn1cblxudGVtcGwgQ29udGFjdE1vZGFsKG9wZW4gYm9vbCwgZm9ybSBDb250YWN0U3RhdGUpIHtcblx0PGRpdiBpZD1cImNvbnRhY3QtbW9kYWxcIiBjbGFzcz17IGNscyhcIlwiLCBvcGVuLCBcInNob3dcIikgfSByb2xlPVwiZGlhbG9nXCIgYXJpYS1tb2RhbD1cInRydWVcIiBhcmlhLWxhYmVsbGVkYnk9XCJjb250YWN0LW1vZGFsLXRpdGxlXCI+XG5cdFx0PGRpdiBjbGFzcz1cImNvbnRhY3QtbW9kYWwtY29udGVudFwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImNvbnRhY3QtbW9kYWwtaGVhZGVyXCI+XG5cdFx0XHRcdDxoMiBpZD1cImNvbnRhY3QtbW9kYWwtdGl0bGVcIj57IHQoXCJjb250YWN0LnRpdGxlXCIpIH08L2gyPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNvbnRhY3QtbW9kYWwtY2xvc2VcIiBpZD1cImNvbnRhY3QtbW9kYWwtY2xvc2VcIiBhcmlhLWxhYmVsPXsgdChcImNvbnRhY3QuY2xvc2VcIikgfSBkYXRhLWFjdGlvbj1cImNsb3NlLWNvbnRhY3RcIj5cblx0XHRcdFx0XHRASWNvbihcInRpbWVzXCIsIFwiMS4ycmVtXCIpXG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8Zm9ybSBjbGFzcz1cImNvbnRhY3QtZm9ybVwiIGlkPVwiY29udGFjdC1mb3JtXCIgbm92YWxpZGF0ZT5cblx0XHRcdFx0QENvbnRhY3RGb3JtRmllbGRzKGZvcm0pXG5cdFx0XHQ8L2Zvcm0+XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImpzOi4vYnJvd3Nlci5kLnRzXCJcbmltcG9ydCBcInN0cmluZ3NcIlxuXG4vLyBQaW5uZWQgKyBTUkk6IGtlZXAgdmVyc2lvbiBhbmQgaGFzaCBpbiBzeW5jIHdpdGggQGVtYWlsanMvYnJvd3NlciBpbiBwYWNrYWdlLmpzb25cbmNvbnN0IGVtYWlsSlNTcmMgPSBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vQGVtYWlsanMvYnJvd3NlckA0LjQuMS9kaXN0L2VtYWlsLm1pbi5qc1wiXG5jb25zdCBlbWFpbEpTSW50ZWdyaXR5ID0gXCJzaGEzODQtU0FMYzM1RWNjQWY2UnpHdzRpTnN5ajdrVFByMzNLN1JvR3pZdSs3aGVaaFQ4czBHWm91YWZSaUNnMXF5NDRBU1wiXG5cbmZ1bmMgbG9hZEVtYWlsSlMoKSBhbnkge1xuXHRyZXR1cm4gbG9hZFNjcmlwdChlbWFpbEpTU3JjLCBlbWFpbEpTSW50ZWdyaXR5KVxufVxuXG5mdW5jIGluaXRFbWFpbEpTKCkge1xuXHRpZiBzaXRlLkVtYWlsSlMuRW5hYmxlZCAmJiBzaXRlLkVtYWlsSlMuUHVibGljS2V5ICE9IFwiXCIgJiYgd2luZG93LmVtYWlsanMgIT0gbmlsIHtcblx0XHRlbWFpbGpzLmluaXQoc2l0ZS5FbWFpbEpTLlB1YmxpY0tleSlcblx0fVxufVxuXG4vLyBwcmVsb2FkRW1haWxKUyB3YXJtcyB0aGUgQ0ROIHNjcmlwdCB3aGlsZSB0aGUgdXNlciB0eXBlczsgZmFpbHVyZXMgYXJlXG4vLyBzd2FsbG93ZWQgaGVyZSBhbmQgc3VyZmFjZWQgYnkgc3VibWl0Q29udGFjdCBpbnN0ZWFkLlxuYXN5bmMgZnVuYyBwcmVsb2FkRW1haWxKUygpIHtcblx0ZGVmZXIgZnVuYygpIHtcblx0XHRpZiByIDo9IHJlY292ZXIoKTsgciAhPSBuaWwge1xuXHRcdFx0Y29uc29sZS53YXJuKFwiRW1haWxKUyBwcmVsb2FkIGZhaWxlZDpcIiwgcilcblx0XHR9XG5cdH0oKVxuXHRhd2FpdCBsb2FkRW1haWxKUygpXG59XG5cbi8vIHJlc2V0Q29udGFjdEZvcm0gY2xlYXJzIHRoZSBmb3JtIGJhY2sgdG8gaXRzIGluaXRpYWwgc3RhdGUgYW5kIHJlLXJlbmRlcnMgaXQuXG5mdW5jIHJlc2V0Q29udGFjdEZvcm0oKSB7XG5cdGNvbnRhY3RGb3JtID0gQ29udGFjdFN0YXRle0J1dHRvblN0YXRlOiBcInNlbmRcIn1cblx0cmVuZGVyQ29udGFjdEZvcm0oKVxufVxuXG5mdW5jIG9wZW5Db250YWN0KCkge1xuXHRpZiBzaXRlLkVtYWlsSlMuRW5hYmxlZCB7XG5cdFx0cHJlbG9hZEVtYWlsSlMoKVxuXHR9XG5cdGNsb3NlTWVudXMoKVxuXHRjb250YWN0T3BlbiA9IHRydWVcblx0cmVzZXRDb250YWN0Rm9ybSgpXG5cdHN5bmNPdmVybGF5cygpXG5cdGZvY3VzTGF0ZXIoXCIjY29udGFjdC1uYW1lXCIpXG59XG5cbi8vIGNsb3NlQ29udGFjdCBoaWRlcyB0aGUgbW9kYWw7IHRoZSBleGl0IGZhZGUgaXMgQ1NTLW9ubHkgKCNjb250YWN0LW1vZGFsIHRyYW5zaXRpb24pLlxuLy8gVGhlIGZvcm0gaXMgcmVzZXQgYnkgb3BlbkNvbnRhY3Qgc28gaXRzIGNvbnRlbnRzIHN1cnZpdmUgdGhlIGZhZGUuXG5mdW5jIGNsb3NlQ29udGFjdCgpIHtcblx0aWYgIWNvbnRhY3RPcGVuIHtcblx0XHRyZXR1cm5cblx0fVxuXHRjb250YWN0T3BlbiA9IGZhbHNlXG5cdHN5bmNPdmVybGF5cygpXG59XG5cbi8vIHVwZGF0ZUNvbnRhY3RGaWVsZCBtaXJyb3JzIGEgZm9ybSBmaWVsZCBpbnRvIHN0YXRlIG9uIGV2ZXJ5IGlucHV0IGV2ZW50LlxuZnVuYyB1cGRhdGVDb250YWN0RmllbGQoZmllbGQgc3RyaW5nLCB2YWx1ZSBzdHJpbmcpIHtcblx0c3dpdGNoIGZpZWxkIHtcblx0Y2FzZSBcIm5hbWVcIjpcblx0XHRjb250YWN0Rm9ybS5OYW1lID0gdmFsdWVcblx0Y2FzZSBcImVtYWlsXCI6XG5cdFx0Y29udGFjdEZvcm0uRW1haWwgPSB2YWx1ZVxuXHRjYXNlIFwibWVzc2FnZVwiOlxuXHRcdGNvbnRhY3RGb3JtLk1lc3NhZ2UgPSB2YWx1ZVxuXHR9XG59XG5cbmZ1bmMgaXNWYWxpZEVtYWlsKGVtYWlsIHN0cmluZykgYm9vbCB7XG5cdHJldHVybiBsZW4oZW1haWwpID49IDUgJiYgc3RyaW5ncy5Db250YWlucyhlbWFpbCwgXCJAXCIpICYmIHN0cmluZ3MuQ29udGFpbnMoZW1haWwsIFwiLlwiKSAmJiAhc3RyaW5ncy5Db250YWlucyhlbWFpbCwgXCIgXCIpXG59XG5cbi8vIHZhbGlkYXRlQ29udGFjdCB0cmltcyB0aGUgZmllbGRzIGFuZCBzZXRzIGVycm9yIGZsYWdzL3N0YXR1cyB0ZXh0LlxuLy8gSXQgcmV0dXJucyB0aGUgdXBkYXRlZCBzdGF0ZSBhbmQgd2hldGhlciB0aGUgZm9ybSBjYW4gYmUgc3VibWl0dGVkLlxuZnVuYyB2YWxpZGF0ZUNvbnRhY3QoZm9ybSBDb250YWN0U3RhdGUpIChDb250YWN0U3RhdGUsIGJvb2wpIHtcblx0Zm9ybS5OYW1lID0gc3RyaW5ncy5UcmltU3BhY2UoZm9ybS5OYW1lKVxuXHRmb3JtLkVtYWlsID0gc3RyaW5ncy5UcmltU3BhY2UoZm9ybS5FbWFpbClcblx0Zm9ybS5NZXNzYWdlID0gc3RyaW5ncy5UcmltU3BhY2UoZm9ybS5NZXNzYWdlKVxuXHRmb3JtLkVyck5hbWUgPSBmYWxzZVxuXHRmb3JtLkVyckVtYWlsID0gZmFsc2Vcblx0Zm9ybS5FcnJNZXNzYWdlID0gZmFsc2Vcblx0Zm9ybS5TdGF0dXNUZXh0ID0gXCJcIlxuXHRmb3JtLlN0YXR1c1R5cGUgPSBcIlwiXG5cblx0c3dpdGNoIHtcblx0Y2FzZSBmb3JtLk5hbWUgPT0gXCJcIjpcblx0XHRmb3JtLkVyck5hbWUgPSB0cnVlXG5cdFx0Zm9ybS5TdGF0dXNUZXh0ID0gdChcImNvbnRhY3QubmFtZVwiKSArIFwiOiBcIiArIHQoXCJjb250YWN0LnJlcXVpcmVkXCIpXG5cdGNhc2UgZm9ybS5FbWFpbCA9PSBcIlwiOlxuXHRcdGZvcm0uRXJyRW1haWwgPSB0cnVlXG5cdFx0Zm9ybS5TdGF0dXNUZXh0ID0gdChcImNvbnRhY3QuZW1haWxcIikgKyBcIjogXCIgKyB0KFwiY29udGFjdC5yZXF1aXJlZFwiKVxuXHRjYXNlICFpc1ZhbGlkRW1haWwoZm9ybS5FbWFpbCk6XG5cdFx0Zm9ybS5FcnJFbWFpbCA9IHRydWVcblx0XHRmb3JtLlN0YXR1c1RleHQgPSB0KFwiY29udGFjdC5pbnZhbGlkRW1haWxcIilcblx0Y2FzZSBmb3JtLk1lc3NhZ2UgPT0gXCJcIjpcblx0XHRmb3JtLkVyck1lc3NhZ2UgPSB0cnVlXG5cdFx0Zm9ybS5TdGF0dXNUZXh0ID0gdChcImNvbnRhY3QubWVzc2FnZVwiKSArIFwiOiBcIiArIHQoXCJjb250YWN0LnJlcXVpcmVkXCIpXG5cdGRlZmF1bHQ6XG5cdFx0cmV0dXJuIGZvcm0sIHRydWVcblx0fVxuXHRmb3JtLlN0YXR1c1R5cGUgPSBcImVycm9yXCJcblx0cmV0dXJuIGZvcm0sIGZhbHNlXG59XG5cbmFzeW5jIGZ1bmMgc3VibWl0Q29udGFjdCgpIHtcblx0Zm9ybSwgb2sgOj0gdmFsaWRhdGVDb250YWN0KGNvbnRhY3RGb3JtKVxuXHRjb250YWN0Rm9ybSA9IGZvcm1cblx0aWYgIW9rIHtcblx0XHRyZW5kZXJDb250YWN0Rm9ybSgpXG5cdFx0cmV0dXJuXG5cdH1cblxuXHRjb250YWN0Rm9ybS5CdXR0b25TdGF0ZSA9IFwic2VuZGluZ1wiXG5cdGNvbnRhY3RGb3JtLkJ1dHRvbkRpc2FibGVkID0gdHJ1ZVxuXHRyZW5kZXJDb250YWN0Rm9ybSgpXG5cblx0cGFyYW1zIDo9IG1hcFtzdHJpbmddYW55e1xuXHRcdFwidGl0bGVcIjogICBzaXRlLlRpdGxlLFxuXHRcdFwibmFtZVwiOiAgICBjb250YWN0Rm9ybS5OYW1lLFxuXHRcdFwiZW1haWxcIjogICBjb250YWN0Rm9ybS5FbWFpbCxcblx0XHRcIm1lc3NhZ2VcIjogY29udGFjdEZvcm0uTWVzc2FnZSxcblx0fVxuXG5cdGRlZmVyIGZ1bmMoKSB7XG5cdFx0aWYgciA6PSByZWNvdmVyKCk7IHIgIT0gbmlsIHtcblx0XHRcdGNvbnRhY3RGb3JtLkJ1dHRvbkRpc2FibGVkID0gZmFsc2Vcblx0XHRcdGNvbnRhY3RGb3JtLkJ1dHRvblN0YXRlID0gXCJzZW5kXCJcblx0XHRcdGNvbnRhY3RGb3JtLlN0YXR1c1RleHQgPSB0KFwiY29udGFjdC5lcnJvclwiKVxuXHRcdFx0Y29udGFjdEZvcm0uU3RhdHVzVHlwZSA9IFwiZXJyb3JcIlxuXHRcdFx0cmVuZGVyQ29udGFjdEZvcm0oKVxuXHRcdH1cblx0fSgpXG5cblx0YXdhaXQgbG9hZEVtYWlsSlMoKVxuXHRpbml0RW1haWxKUygpXG5cblx0YXdhaXQgZW1haWxqcy5zZW5kKHNpdGUuRW1haWxKUy5TZXJ2aWNlSWQsIHNpdGUuRW1haWxKUy5UZW1wbGF0ZUlkLCBwYXJhbXMsIHNpdGUuRW1haWxKUy5QdWJsaWNLZXkpXG5cblx0Y29udGFjdEZvcm0uU3RhdHVzVGV4dCA9IHQoXCJjb250YWN0LnN1Y2Nlc3NcIilcblx0Y29udGFjdEZvcm0uU3RhdHVzVHlwZSA9IFwic3VjY2Vzc1wiXG5cdGNvbnRhY3RGb3JtLkJ1dHRvblN0YXRlID0gXCJzZW5kXCJcblx0cmVuZGVyQ29udGFjdEZvcm0oKVxuXG5cdHNldFRpbWVvdXQoZnVuYygpIHtcblx0XHRjbG9zZUNvbnRhY3QoKVxuXHR9LCAyMDAwKVxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcInN0cmNvbnZcIlxuXG50ZW1wbCBGb290ZXIoeWVhciBpbnQsIGF1dGhvciBzdHJpbmcpIHtcblx0PGZvb3Rlcj5cblx0XHR7IFwiwqkgXCIgKyBzdHJjb252Lkl0b2EoeWVhcikgKyBcIiBcIiArIGF1dGhvciArIFwiLiBcIiArIHQoXCJmb290ZXIucmlnaHRzXCIpICsgXCIuXCIgfVxuXHQ8L2Zvb3Rlcj5cbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJodG1sXCJcblxuLy8g4pSA4pSAIFNWRyBpY29uIHJlZ2lzdHJ5IOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuLy8gSWNvbnMgYXJlIGVtaXR0ZWQgYXMgcmF3IG1hcmt1cCBiZWNhdXNlIHRlbXBsIGJ1aWxkcyBlbGVtZW50cyB3aXRoXG4vLyBkb2N1bWVudC5jcmVhdGVFbGVtZW50LCB3aGljaCBjYW5ub3QgY3JlYXRlIFNWRy1uYW1lc3BhY2Ugbm9kZXMuXG5cbnR5cGUgaWNvbkRlZiBzdHJ1Y3Qge1xuXHRWaWV3Qm94IHN0cmluZ1xuXHRQYXRoICAgIHN0cmluZ1xufVxuXG52YXIgaWNvbnMgPSBtYXBbc3RyaW5nXWljb25EZWZ7XG5cdFwic3VuXCI6ICAgICAgICAgICB7XCIwIDAgNTEyIDUxMlwiLCBcIk0zNjEuNSAxLjJjNSAyLjEgOC42IDYuNiA5LjYgMTEuOUwzOTEgMTIxbDEwNy45IDE5LjhjNS4zIDEgOS44IDQuNiAxMS45IDkuNnMxLjUgMTAuNy0xLjYgMTUuMkw0NDYuOSAyNTZsNjIuMyA5MC4zYzMuMSA0LjUgMy43IDEwLjIgMS42IDE1LjJzLTYuNiA4LjYtMTEuOSA5LjZMMzkxIDM5MSAzNzEuMSA0OTguOWMtMSA1LjMtNC42IDkuOC05LjYgMTEuOXMtMTAuNyAxLjUtMTUuMi0xLjZMMjU2IDQ0Ni45bC05MC4zIDYyLjNjLTQuNSAzLjEtMTAuMiAzLjctMTUuMiAxLjZzLTguNi02LjYtOS42LTExLjlMMTIxIDM5MSAxMy4xIDM3MS4xYy01LjMtMS05LjgtNC42LTExLjktOS42cy0xLjUtMTAuNyAxLjYtMTUuMkw2NS4xIDI1NiAyLjggMTY1LjdjLTMuMS00LjUtMy43LTEwLjItMS42LTE1LjJzNi42LTguNiAxMS45LTkuNkwxMjEgMTIxbDE5LjgtMTA3LjljMS01LjMgNC42LTkuOCA5LjYtMTEuOXMxMC43LTEuNSAxNS4yIDEuNkwyNTYgNjUuMSAzNDYuMyAyLjhjNC41LTMuMSAxMC4yLTMuNyAxNS4yLTEuNnpNMTYwIDI1NmE5NiA5NiAwIDEgMSAxOTIgMCA5NiA5NiAwIDEgMSAtMTkyIDB6bTIyNCAwYTEyOCAxMjggMCAxIDAgLTI1NiAwIDEyOCAxMjggMCAxIDAgMjU2IDB6XCJ9LFxuXHRcIm1vb25cIjogICAgICAgICAge1wiMCAwIDM4NCA1MTJcIiwgXCJNMjIzLjUgMzJDMTAwIDMyIDAgMTMyLjMgMCAyNTZTMTAwIDQ4MCAyMjMuNSA0ODBjNjAuNiAwIDExNS41LTI0LjIgMTU1LjgtNjMuNGM1LTQuOSA2LjMtMTIuNSAzLjEtMTguN3MtMTAuMS05LjctMTctOC41Yy05LjggMS43LTE5LjggMi42LTMwLjEgMi42Yy05Ni45IDAtMTc1LjUtNzguOC0xNzUuNS0xNzZjMC02NS44IDM2LTEyMy4xIDg5LjMtMTUzLjNjNi4xLTMuNSA5LjItMTAuNSA3LjctMTcuM3MtNy4zLTExLjktMTQuMy0xMi41Yy02LjMtLjUtMTIuNi0uOC0xOS0uOHpcIn0sXG5cdFwic2VhcmNoXCI6ICAgICAgICB7XCIwIDAgNTEyIDUxMlwiLCBcIk00MTYgMjA4YzAgNDUuOS0xNC45IDg4LjMtNDAgMTIyLjdMNTAyLjYgNDU3LjRjMTIuNSAxMi41IDEyLjUgMzIuOCAwIDQ1LjNzLTMyLjggMTIuNS00NS4zIDBMMzMwLjcgMzc2Yy0zNC40IDI1LjItNzYuOCA0MC0xMjIuNyA0MEM5My4xIDQxNiAwIDMyMi45IDAgMjA4UzkzLjEgMCAyMDggMFM0MTYgOTMuMSA0MTYgMjA4ek0yMDggMzUyYTE0NCAxNDQgMCAxIDAgMC0yODggMTQ0IDE0NCAwIDEgMCAwIDI4OHpcIn0sXG5cdFwiZW52ZWxvcGVcIjogICAgICB7XCIwIDAgNTEyIDUxMlwiLCBcIk00OCA2NEMyMS41IDY0IDAgODUuNSAwIDExMmMwIDE1LjEgNy4xIDI5LjMgMTkuMiAzOC40TDIzNi44IDMxMy42YzExLjQgOC41IDI3IDguNSAzOC40IDBMNDkyLjggMTUwLjRjMTIuMS05LjEgMTkuMi0yMy4zIDE5LjItMzguNGMwLTI2LjUtMjEuNS00OC00OC00OEg0OHpNMCAxNzZWMzg0YzAgMzUuMyAyOC43IDY0IDY0IDY0SDQ0OGMzNS4zIDAgNjQtMjguNyA2NC02NFYxNzZMMjk0LjQgMzM5LjJjLTIyLjggMTcuMS01NCAxNy4xLTc2LjggMEwwIDE3NnpcIn0sXG5cdFwiZG93bmxvYWRcIjogICAgICB7XCIwIDAgNTEyIDUxMlwiLCBcIk0yODggMzJjMC0xNy43LTE0LjMtMzItMzItMzJzLTMyIDE0LjMtMzIgMzJWMjc0LjdsLTczLjQtNzMuNGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBzLTEyLjUgMzIuOCAwIDQ1LjNsMTI4IDEyOGMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMGwxMjgtMTI4YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zcy0zMi44LTEyLjUtNDUuMyAwTDI4OCAyNzQuN1YzMnpNNjQgMzUyYy0zNS4zIDAtNjQgMjguNy02NCA2NHYzMmMwIDM1LjMgMjguNyA2NCA2NCA2NEg0NDhjMzUuMyAwIDY0LTI4LjcgNjQtNjRWNDE2YzAtMzUuMy0yOC43LTY0LTY0LTY0SDY0em0yODAgNjBhMjQgMjQgMCAxIDEgMCA0OCAyNCAyNCAwIDEgMSAwLTQ4elwifSxcblx0XCJjdWJlXCI6ICAgICAgICAgIHtcIjAgMCA1MTIgNTEyXCIsIFwiTTIzNC41IDUuN2MxMy45LTUgMjkuMS01IDQzLjEgMGwxOTIgNjguNkM0OTUgODMuNCA1MTIgMTA3LjUgNTEyIDEzNC42VjM3Ny40YzAgMjctMTcgNTEuMi00Mi41IDYwLjNsLTE5MiA2OC42Yy0xMy45IDUtMjkuMSA1LTQzLjEgMGwtMTkyLTY4LjZDMTcgNDI4LjYgMCA0MDQuNSAwIDM3Ny40VjEzNC42YzAtMjcgMTctNTEuMiA0Mi41LTYwLjNsMTkyLTY4LjZ6TTI1NiA2Nkw4Mi4zIDEyOCAyNTYgMTkwbDE3My43LTYyTDI1NiA2NnptMzIgMzY4LjZsMTkyLTY4LjZWMTM1LjRMMjg4IDIwNHYyMzAuNnpcIn0sXG5cdFwiY2FsZW5kYXJcIjogICAgICB7XCIwIDAgNDQ4IDUxMlwiLCBcIk0xNTIgMjRjMC0xMy4zLTEwLjctMjQtMjQtMjRzLTI0IDEwLjctMjQgMjRWNjRINjRDMjguNyA2NCAwIDkyLjcgMCAxMjh2MTYgNDhWNDQ4YzAgMzUuMyAyOC43IDY0IDY0IDY0SDM4NGMzNS4zIDAgNjQtMjguNyA2NC02NFYxOTIgMTQ0IDEyOGMwLTM1LjMtMjguNy02NC02NC02NEgzNDRWMjRjMC0xMy4zLTEwLjctMjQtMjQtMjRzLTI0IDEwLjctMjQgMjRWNjRIMTUyVjI0ek00OCAxOTJINDAwVjQ0OGMwIDguOC03LjIgMTYtMTYgMTZINjRjLTguOCAwLTE2LTcuMi0xNi0xNlYxOTJ6XCJ9LFxuXHRcImdpdGh1YlwiOiAgICAgICAge1wiMCAwIDQ5NiA1MTJcIiwgXCJNMTY1LjkgMzk3LjRjMCAyLTIuMyAzLjYtNS4yIDMuNi0zLjMgLjMtNS42LTEuMy01LjYtMy42IDAtMiAyLjMtMy42IDUuMi0zLjYgMy0uMyA1LjYgMS4zIDUuNiAzLjZ6bS0zMS4xLTQuNWMtLjcgMiAxLjMgNC4zIDQuMyA0LjkgMi42IDEgNS42IDAgNi4yLTJzLTEuMy00LjMtNC4zLTUuMmMtMi42LS43LTUuNSAuMy02LjIgMi4zem00NC4yLTEuN2MtMi45IC43LTQuOSAyLjYtNC42IDQuOSAuMyAyIDIuOSAzLjMgNS45IDIuNiAyLjktLjcgNC45LTIuNiA0LjYtNC42LS4zLTEuOS0zLTMuMi01LjktMi45ek0yNDQuOCA4QzEwNi4xIDggMCAxMTMuMyAwIDI1MmMwIDExMC45IDY5LjggMjA1LjggMTY5LjUgMjM5LjIgMTIuOCAyLjMgMTcuMy01LjYgMTcuMy0xMi4xIDAtNi4yLS4zLTQwLjQtLjMtNjEuNCAwIDAtNzAgMTUtODQuNy0yOS44IDAgMC0xMS40LTI5LjEtMjcuOC0zNi42IDAgMC0yMi45LTE1LjcgMS42LTE1LjQgMCAwIDI0LjkgMiAzOC42IDI1LjggMjEuOSAzOC42IDU4LjYgMjcuNSA3Mi45IDIxIDIuMy0xNi44IDguOC0yNy4xIDE2LTMzLjctNTUuOS02LjItMTEyLjMtMTQuMy0xMTIuMy0xMTAuNSAwLTI3LjUgNy42LTQxLjMgMjMuNi01OC45LTIuNi02LjUtMTEuMS0zMy4zIDIuNi02Ny45IDIwLjktNi41IDY5IDI3IDY5IDI3IDIwLTUuNiA0MS41LTguNSA2Mi44LTguNXM0Mi44IDIuOSA2Mi44IDguNWMwIDAgNDguMS0zMy42IDY5LTI3IDEzLjcgMzQuNyA1LjIgNjEuNCAyLjYgNjcuOSAxNiAxNy43IDI1LjggMzEuNSAyNS44IDU4LjkgMCA5Ni41LTU4LjkgMTA0LjItMTE0LjggMTEwLjUgOS4yIDcuOSAxNyAyMi45IDE3IDQ2LjQgMCAzMy43LS4zIDc1LjQtLjMgODMuNiAwIDYuNSA0LjYgMTQuNCAxNy4zIDEyLjFDNDI4LjIgNDU3LjggNDk2IDM2Mi45IDQ5NiAyNTIgNDk2IDExMy4zIDM4My41IDggMjQ0LjggOHpNOTcuMiAzNTIuOWMtMS4zIDEtMSAzLjMgLjcgNS4yIDEuNiAxLjYgMy45IDIuMyA1LjIgMSAxLjMtMSAxLTMuMy0uNy01LjItMS42LTEuNi0zLjktMi4zLTUuMi0xem0tMTAuOC04LjFjLS43IDEuMyAuMyAyLjkgMi4zIDMuOSAxLjYgMSAzLjYgLjcgNC4zLS43IC43LTEuMy0uMy0yLjktMi4zLTMuOS0yLS42LTMuNi0uMy00LjMgLjd6bTMyLjQgMzUuNmMtMS42IDEuMy0xIDQuMyAxLjMgNi4yIDIuMyAyLjMgNS4yIDIuNiA2LjUgMSAxLjMtMS4zIC43LTQuMy0xLjMtNi4yLTIuMi0yLjMtNS4yLTIuNi02LjUtMXptLTExLjQtMTQuN2MtMS42IDEtMS42IDMuNiAwIDUuOSAxLjYgMi4zIDQuMyAzLjMgNS42IDIuMyAxLjYtMS4zIDEuNi0zLjkgMC02LjItMS40LTIuMy00LTMuMy01LjYtMnpcIn0sXG5cdFwieW91dHViZVwiOiAgICAgICB7XCIwIDAgNTc2IDUxMlwiLCBcIk01NDkuNyAxMjQuMWMtNi4zLTIzLjctMjQuOC00Mi4zLTQ4LjMtNDguNkM0NTguOCA2NCAyODggNjQgMjg4IDY0UzExNy4yIDY0IDc0LjYgNzUuNWMtMjMuNSA2LjMtNDIgMjQuOS00OC4zIDQ4LjYtMTEuNCA0Mi45LTExLjQgMTMyLjMtMTEuNCAxMzIuM3MwIDg5LjQgMTEuNCAxMzIuM2M2LjMgMjMuNyAyNC44IDQxLjUgNDguMyA0Ny44QzExNy4yIDQ0OCAyODggNDQ4IDI4OCA0NDhzMTcwLjggMCAyMTMuNC0xMS41YzIzLjUtNi4zIDQyLTI0LjIgNDguMy00Ny44IDExLjQtNDIuOSAxMS40LTEzMi4zIDExLjQtMTMyLjNzMC04OS40LTExLjQtMTMyLjN6bS0zMTcuNSAyMTMuNVYxNzUuMmwxNDIuNyA4MS4yLTE0Mi43IDgxLjJ6XCJ9LFxuXHRcImxpbmtlZGluXCI6ICAgICAge1wiMCAwIDQ0OCA1MTJcIiwgXCJNNDE2IDMySDMxLjlDMTQuMyAzMiAwIDQ2LjUgMCA2NC4zdjM4My40QzAgNDY1LjUgMTQuMyA0ODAgMzEuOSA0ODBINDE2YzE3LjYgMCAzMi0xNC41IDMyLTMyLjNWNjQuM2MwLTE3LjgtMTQuNC0zMi4zLTMyLTMyLjN6TTEzNS40IDQxNkg2OVYyMDIuMmg2Ni41VjQxNnptLTMzLjItMjQzYy0yMS4zIDAtMzguNS0xNy4zLTM4LjUtMzguNVM4MC45IDk2IDEwMi4yIDk2YzIxLjIgMCAzOC41IDE3LjMgMzguNSAzOC41IDAgMjEuMy0xNy4yIDM4LjUtMzguNSAzOC41em0yODIuMSAyNDNoLTY2LjRWMzEyYzAtMjQuOC0uNS01Ni43LTM0LjUtNTYuNy0zNC42IDAtMzkuOSAyNy0zOS45IDU0LjlWNDE2aC02Ni40VjIwMi4yaDYzLjd2MjkuMmguOWM4LjktMTYuOCAzMC42LTM0LjUgNjIuOS0zNC41IDY3LjIgMCA3OS43IDQ0LjMgNzkuNyAxMDEuOVY0MTZ6XCJ9LFxuXHRcImNoZXZyb24tZG93blwiOiAge1wiMCAwIDUxMiA1MTJcIiwgXCJNMjMzLjQgNDA2LjZjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBsMTkyLTE5MmMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM3MtMzIuOC0xMi41LTQ1LjMgMEwyNTYgMzM4LjcgODYuNiAxNjkuNGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBzLTEyLjUgMzIuOCAwIDQ1LjNsMTkyIDE5MnpcIn0sXG5cdFwiY2hldnJvbi11cFwiOiAgICB7XCIwIDAgNTEyIDUxMlwiLCBcIk0yMzMuNCAxMDUuNGMxMi41LTEyLjUgMzIuOC0xMi41IDQ1LjMgMGwxOTIgMTkyYzEyLjUgMTIuNSAxMi41IDMyLjggMCA0NS4zcy0zMi44LTEyLjUtNDUuMyAwTDI1NiAxNzMuMyA4Ni42IDM0Mi42Yy0xMi41IDEyLjUtMzIuOCAxMi41LTQ1LjMgMHMtMTIuNS0zMi44IDAtNDUuM2wxOTItMTkyelwifSxcblx0XCJjaGV2cm9uLWxlZnRcIjogIHtcIjAgMCAzMjAgNTEyXCIsIFwiTTkuNCAyMzMuNGMtMTIuNSAxMi41LTEyLjUgMzIuOCAwIDQ1LjNsMTkyIDE5MmMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMHMxMi41LTMyLjggMC00NS4zTDc3LjMgMjU2IDI0Ni42IDg2LjZjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDBsLTE5MiAxOTJ6XCJ9LFxuXHRcImNoZXZyb24tcmlnaHRcIjoge1wiMCAwIDMyMCA1MTJcIiwgXCJNMzEwLjYgMjMzLjRjMTIuNSAxMi41IDEyLjUgMzIuOCAwIDQ1LjNsLTE5MiAxOTJjLTEyLjUgMTIuNS0zMi44IDEyLjUtNDUuMyAwcy0xMi41LTMyLjggMC00NS4zTDI0Mi43IDI1NiA3My40IDg2LjZjLTEyLjUtMTIuNS0xMi41LTMyLjggMC00NS4zczMyLjgtMTIuNSA0NS4zIDBsMTkyIDE5MnpcIn0sXG5cdFwiYW5nbGVzLWxlZnRcIjogICB7XCIwIDAgNTEyIDUxMlwiLCBcIk00MS40IDIzMy40Yy0xMi41IDEyLjUtMTIuNSAzMi44IDAgNDUuM2wxNjAgMTYwYzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwczEyLjUtMzIuOCAwLTQ1LjNMMTA5LjMgMjU2IDI0Ni42IDExOC42YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zcy0zMi44LTEyLjUtNDUuMyAwbC0xNjAgMTYwem0zNTItMTYwbC0xNjAgMTYwYy0xMi41IDEyLjUtMTIuNSAzMi44IDAgNDUuM2wxNjAgMTYwYzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwczEyLjUtMzIuOCAwLTQ1LjNMMzAxLjMgMjU2IDQzOC42IDExOC42YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zcy0zMi44LTEyLjUtNDUuMyAwelwifSxcblx0XCJhbmdsZXMtcmlnaHRcIjogIHtcIjAgMCA1MTIgNTEyXCIsIFwiTTQ3MC42IDI3OC42YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zbC0xNjAtMTYwYy0xMi41LTEyLjUtMzIuOC0xMi41LTQ1LjMgMHMtMTIuNSAzMi44IDAgNDUuM0w0MDIuNyAyNTYgMjY1LjQgMzkzLjRjLTEyLjUgMTIuNS0xMi41IDMyLjggMCA0NS4zczMyLjggMTIuNSA0NS4zIDBsMTYwLTE2MHptLTM1MiAxNjBsMTYwLTE2MGMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM2wtMTYwLTE2MGMtMTIuNS0xMi41LTMyLjgtMTIuNS00NS4zIDBzLTEyLjUgMzIuOCAwIDQ1LjNMMjEwLjcgMjU2IDczLjQgMzkzLjRjLTEyLjUgMTIuNS0xMi41IDMyLjggMCA0NS4zczMyLjggMTIuNSA0NS4zIDB6XCJ9LFxuXHRcInRpbWVzXCI6ICAgICAgICAge1wiMCAwIDM4NCA1MTJcIiwgXCJNMzI0LjUgNDExLjFjNi4yIDYuMiAxNi40IDYuMiAyMi42IDBzNi4yLTE2LjQgMC0yMi42TDIxNC42IDI1NiAzNDcuMSAxMjMuNWM2LjItNi4yIDYuMi0xNi40IDAtMjIuNnMtMTYuNC02LjItMjIuNiAwTDE5MiAyMzMuNCA1OS41IDEwMC45Yy02LjItNi4yLTE2LjQtNi4yLTIyLjYgMHMtNi4yIDE2LjQgMCAyMi42TDE2OS40IDI1NiAzNi45IDM4OC41Yy02LjIgNi4yLTYuMiAxNi40IDAgMjIuNnMxNi40IDYuMiAyMi42IDBMMTkyIDI3OC42IDMyNC41IDQxMS4xelwifSxcblx0XCJhcnJvdy1sZWZ0XCI6ICAgIHtcIjAgMCA0NDggNTEyXCIsIFwiTTkuNCAyMzMuNGMtMTIuNSAxMi41LTEyLjUgMzIuOCAwIDQ1LjNsMTYwIDE2MGMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMHMxMi41LTMyLjggMC00NS4zTDEwOS4yIDI4OCA0MTYgMjg4YzE3LjcgMCAzMi0xNC4zIDMyLTMycy0xNC4zLTMyLTMyLTMybC0zMDYuNyAwTDIxNC42IDExOC42YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zcy0zMi44LTEyLjUtNDUuMyAwbC0xNjAgMTYwelwifSxcblx0XCJhcnJvdy1yaWdodFwiOiAgIHtcIjAgMCA0NDggNTEyXCIsIFwiTTQzOC42IDI3OC42YzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zbC0xNjAtMTYwYy0xMi41LTEyLjUtMzIuOC0xMi41LTQ1LjMgMHMtMTIuNSAzMi44IDAgNDUuM0wzMzguOCAyMjQgMzIgMjI0Yy0xNy43IDAtMzIgMTQuMy0zMiAzMnMxNC4zIDMyIDMyIDMybDMwNi43IDBMMjMzLjQgMzkzLjRjLTEyLjUgMTIuNS0xMi41IDMyLjggMCA0NS4zczMyLjggMTIuNSA0NS4zIDBsMTYwLTE2MHpcIn0sXG5cdFwiZXhwYW5kXCI6ICAgICAgICB7XCIwIDAgNDQ4IDUxMlwiLCBcIk0zMiAzMkMxNC4zIDMyIDAgNDYuMyAwIDY0djk2YzAgMTcuNyAxNC4zIDMyIDMyIDMyczMyLTE0LjMgMzItMzJWOTZoNjRjMTcuNyAwIDMyLTE0LjMgMzItMzJzLTE0LjMtMzItMzItMzJIMzJ6TTY0IDM1MmMwLTE3LjctMTQuMy0zMi0zMi0zMlMwIDMzNC4zIDAgMzUydjk2YzAgMTcuNyAxNC4zIDMyIDMyIDMyaDk2YzE3LjcgMCAzMi0xNC4zIDMyLTMycy0xNC4zLTMyLTMyLTMySDY0VjM1MnpNMzUyIDMyYy0xNy43IDAtMzIgMTQuMy0zMiAzMnMxNC4zIDMyIDMyIDMyaDY0djY0YzAgMTcuNyAxNC4zIDMyIDMyIDMyczMyLTE0LjMgMzItMzJWNjRjMC0xNy43LTE0LjMtMzItMzItMzJIMzUyek0zMjAgMzUyYzAtMTcuNyAxNC4zLTMyIDMyLTMyczMyIDE0LjMgMzIgMzJ2NjRoNjRjMTcuNyAwIDMyIDE0LjMgMzIgMzJzLTE0LjMgMzItMzIgMzJIMzg0Yy0xNy43IDAtMzItMTQuMy0zMi0zMlYzNTJ6XCJ9LFxufVxuXG4vLyBpY29uU3ZnIHJldHVybnMgdGhlIGlubGluZSBTVkcgbWFya3VwIGZvciBhIGtub3duIGljb24gbmFtZSwgb3IgXCJcIiBvdGhlcndpc2UuXG5mdW5jIGljb25TdmcobmFtZSBzdHJpbmcsIHNpemUgc3RyaW5nKSBzdHJpbmcge1xuXHRkZWYsIG9rIDo9IGljb25zW25hbWVdXG5cdGlmICFvayB7XG5cdFx0cmV0dXJuIFwiXCJcblx0fVxuXHRzIDo9IGh0bWwuRXNjYXBlU3RyaW5nKHNpemUpXG5cdHJldHVybiBgPHN2ZyBjbGFzcz1cImljb24gaWNvbi1gICsgbmFtZSArIGBcIiB3aWR0aD1cImAgKyBzICsgYFwiIGhlaWdodD1cImAgKyBzICsgYFwiIHZpZXdCb3g9XCJgICsgZGVmLlZpZXdCb3ggKyBgXCIgZmlsbD1cImN1cnJlbnRDb2xvclwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPjxwYXRoIGQ9XCJgICsgZGVmLlBhdGggKyBgXCIvPjwvc3ZnPmBcbn1cbiIsInBhY2thZ2UgbWFpblxuXG4vLyBJY29uIHJlbmRlcnMgYSBuYW1lZCBTVkcgaWNvbiBmcm9tIHRoZSByZWdpc3RyeSBpbiBpY29ucy5nby5cbi8vIFVua25vd24gbmFtZXMgcmVuZGVyIG5vdGhpbmcuXG50ZW1wbCBJY29uKG5hbWUgc3RyaW5nLCBzaXplIHN0cmluZykge1xuXHRAdGVtcGwuUmF3KGljb25TdmcobmFtZSwgc2l6ZSkpXG59XG4iLCJwYWNrYWdlIG1haW5cblxudmFyIHNjcmlwdFByb21pc2VzID0gbWFwW3N0cmluZ11hbnl7fVxuXG4vLyBsb2FkU2NyaXB0IGFwcGVuZHMgYSA8c2NyaXB0PiB0YWcgb25jZSBwZXIgc3JjIGFuZCByZXR1cm5zIGEgcHJvbWlzZSB0aGF0XG4vLyBzZXR0bGVzIG9uIGxvYWQvZXJyb3I7IGNvbmN1cnJlbnQgY2FsbGVycyBzaGFyZSB0aGUgc2FtZSBpbi1mbGlnaHQgcHJvbWlzZS5cbmZ1bmMgbG9hZFNjcmlwdChzcmMgc3RyaW5nLCBpbnRlZ3JpdHkgc3RyaW5nKSBhbnkge1xuXHRpZiBwLCBvayA6PSBzY3JpcHRQcm9taXNlc1tzcmNdOyBvayB7XG5cdFx0cmV0dXJuIHBcblx0fVxuXHRkIDo9IFByb21pc2Uud2l0aFJlc29sdmVycygpXG5cdHMgOj0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxuXHRzLnNyYyA9IHNyY1xuXHRpZiBpbnRlZ3JpdHkgIT0gXCJcIiB7XG5cdFx0cy5pbnRlZ3JpdHkgPSBpbnRlZ3JpdHlcblx0XHRzLmNyb3NzT3JpZ2luID0gXCJhbm9ueW1vdXNcIlxuXHR9XG5cdHMuYXN5bmMgPSB0cnVlXG5cdHMub25sb2FkID0gZnVuYyhfIGFueSkge1xuXHRcdGQucmVzb2x2ZShuaWwpXG5cdH1cblx0cy5vbmVycm9yID0gZnVuYyhlIGFueSkge1xuXHRcdGRlbGV0ZShzY3JpcHRQcm9taXNlcywgc3JjKVxuXHRcdGQucmVqZWN0KGUpXG5cdH1cblx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChzKVxuXHRzY3JpcHRQcm9taXNlc1tzcmNdID0gZC5wcm9taXNlXG5cdHJldHVybiBkLnByb21pc2Vcbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJqczouL2Jyb3dzZXIuZC50c1wiXG5pbXBvcnQgXCJzdHJpbmdzXCJcblxuZnVuYyB0b2dnbGVQcm9qZWN0c0Ryb3Bkb3duKCkge1xuXHRwcm9qZWN0c0Ryb3Bkb3duT3BlbiA9ICFwcm9qZWN0c0Ryb3Bkb3duT3BlblxuXHRzeW5jT3ZlcmxheXMoKVxufVxuXG5mdW5jIGNsb3NlUHJvamVjdHNEcm9wZG93bigpIHtcblx0aWYgIXByb2plY3RzRHJvcGRvd25PcGVuIHtcblx0XHRyZXR1cm5cblx0fVxuXHRwcm9qZWN0c0Ryb3Bkb3duT3BlbiA9IGZhbHNlXG5cdHN5bmNPdmVybGF5cygpXG59XG5cbmZ1bmMgdG9nZ2xlTW9iaWxlTWVudSgpIHtcblx0bW9iaWxlTWVudU9wZW4gPSAhbW9iaWxlTWVudU9wZW5cblx0c3luY092ZXJsYXlzKClcbn1cblxuZnVuYyBjbG9zZU1vYmlsZU1lbnUoKSB7XG5cdGlmICFtb2JpbGVNZW51T3BlbiB7XG5cdFx0cmV0dXJuXG5cdH1cblx0bW9iaWxlTWVudU9wZW4gPSBmYWxzZVxuXHRzeW5jT3ZlcmxheXMoKVxufVxuXG4vLyBjbG9zZU1lbnVzIGNvbGxhcHNlcyB0aGUgbmF2IG1lbnVzIGJlZm9yZSBhbm90aGVyIG92ZXJsYXkgdGFrZXMgZm9jdXMuXG5mdW5jIGNsb3NlTWVudXMoKSB7XG5cdGNsb3NlTW9iaWxlTWVudSgpXG5cdGNsb3NlUHJvamVjdHNEcm9wZG93bigpXG59XG5cbi8vIG5hdmlnYXRlSGFzaCBzY3JvbGxzIHRvIGFuIGluLXBhZ2UgYW5jaG9yIChcIiNpZFwiIG9yIFwiXCIgZm9yIHRvcCkgYW5kXG4vLyByZWNvcmRzIGl0IGluIGhpc3Rvcnkgd2l0aG91dCB0cmlnZ2VyaW5nIGEgcm91dGUgY2hhbmdlLlxuZnVuYyBuYXZpZ2F0ZUhhc2goaGFzaCBzdHJpbmcpIHtcblx0aWYgc3RyaW5ncy5UcmltUHJlZml4KGhhc2gsIFwiI1wiKSAhPSBcIlwiIHtcblx0XHRzY3JvbGxUb0hhc2goaGFzaCwgdHJ1ZSlcblx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobWFwW3N0cmluZ11hbnl7fSwgXCJcIiwgaGFzaClcblx0XHRyZXR1cm5cblx0fVxuXHR3aW5kb3cuc2Nyb2xsVG8obWFwW3N0cmluZ11hbnl7XCJ0b3BcIjogMCwgXCJsZWZ0XCI6IDAsIFwiYmVoYXZpb3JcIjogXCJzbW9vdGhcIn0pXG5cdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShtYXBbc3RyaW5nXWFueXt9LCBcIlwiLCB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpXG59XG5cbmZ1bmMgc2V0dXBFdmVudHMoKSB7XG5cdGFwcCA6PSBhcHBSZWZzW1wiYXBwUm9vdFwiXVxuXHRpZiBhcHAgPT0gbmlsICYmIGRvY3VtZW50ICE9IG5pbCB7XG5cdFx0YXBwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNhcHBcIilcblx0fVxuXHRpZiBhcHAgPT0gbmlsIHtcblx0XHRyZXR1cm5cblx0fVxuXG5cdC8vIENsaWNrIGRlbGVnYXRpb24gb24gI2FwcFxuXHRhcHAuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmMoZSBhbnkpIHtcblx0XHR0YXJnZXQgOj0gZS50YXJnZXRcblxuXHRcdC8vIFRhZyBjbGlja1xuXHRcdHRhZ0VsIDo9IHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtc2VhcmNoLXRhZ11cIilcblx0XHRpZiB0YWdFbCAhPSBuaWwge1xuXHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XHR0YWcgOj0gdGFnRWwuZ2V0QXR0cmlidXRlKFwiZGF0YS1zZWFyY2gtdGFnXCIpXG5cdFx0XHRpZiB0YWcgIT0gbmlsICYmIHRhZyAhPSBcIlwiIHtcblx0XHRcdFx0b3BlblNlYXJjaFdpdGhUYWcoc3RyaW5nKHRhZykpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cblx0XHQvLyBBY3Rpb24gZGVsZWdhdGlvblxuXHRcdGJ0biA6PSB0YXJnZXQuY2xvc2VzdChcIltkYXRhLWFjdGlvbl1cIilcblx0XHRpZiBidG4gIT0gbmlsIHtcblx0XHRcdGFjdGlvbiA6PSBzdHJpbmcoYnRuLmdldEF0dHJpYnV0ZShcImRhdGEtYWN0aW9uXCIpKVxuXHRcdFx0c3dpdGNoIGFjdGlvbiB7XG5cdFx0XHRjYXNlIFwibmF2XCI6XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRpZiBidG4uY2xvc2VzdChcIi5kaXNhYmxlZFwiKSAhPSBuaWwge1xuXHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHR9XG5cdFx0XHRcdGhyZWYgOj0gYnRuLmdldEF0dHJpYnV0ZShcImhyZWZcIilcblx0XHRcdFx0aWYgaHJlZiAhPSBuaWwgJiYgaHJlZiAhPSBcIlwiIHtcblx0XHRcdFx0XHRocmVmU3RyIDo9IHN0cmluZyhocmVmKVxuXHRcdFx0XHRcdGlmIHN0cmluZ3MuSGFzUHJlZml4KGhyZWZTdHIsIFwiI1wiKSB7XG5cdFx0XHRcdFx0XHRuYXZpZ2F0ZUhhc2goaHJlZlN0cilcblx0XHRcdFx0XHRcdHJldHVyblxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRuYXZpZ2F0ZShocmVmU3RyKVxuXHRcdFx0XHR9XG5cdFx0XHRjYXNlIFwidG9nZ2xlLW1vYmlsZS1uYXZcIjpcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKClcblx0XHRcdFx0dG9nZ2xlTW9iaWxlTWVudSgpXG5cdFx0XHRjYXNlIFwidG9nZ2xlLXByb2plY3RzLWRyb3Bkb3duXCI6XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRlLnN0b3BQcm9wYWdhdGlvbigpXG5cdFx0XHRcdHRvZ2dsZVByb2plY3RzRHJvcGRvd24oKVxuXHRcdFx0Y2FzZSBcInRvZ2dsZS10aGVtZVwiOlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0dG9nZ2xlVGhlbWUoKVxuXHRcdFx0Y2FzZSBcIm9wZW4tc2VhcmNoXCI6XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRvcGVuU2VhcmNoKClcblx0XHRcdGNhc2UgXCJjbG9zZS1zZWFyY2hcIjpcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdGNsb3NlU2VhcmNoKClcblx0XHRcdGNhc2UgXCJjbGVhci1zZWFyY2hcIjpcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdGNsZWFyU2VhcmNoKClcblx0XHRcdGNhc2UgXCJvcGVuLWNvbnRhY3RcIjpcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdG9wZW5Db250YWN0KClcblx0XHRcdGNhc2UgXCJjbG9zZS1jb250YWN0XCI6XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRjbG9zZUNvbnRhY3QoKVxuXHRcdFx0Y2FzZSBcInRvZ2dsZS1mdWxsc2NyZWVuXCI6XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRpZnJhbWUgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNkZW1vXCIpXG5cdFx0XHRcdGlmIGlmcmFtZSAhPSBuaWwge1xuXHRcdFx0XHRcdGlmIGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50ID09IG5pbCB7XG5cdFx0XHRcdFx0XHRpZnJhbWUucmVxdWVzdEZ1bGxzY3JlZW4oKVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHR9XG5cdFx0XHRjYXNlIFwiY29weS1jb2RlXCI6XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRjb3B5QnRuIDo9IHRhcmdldC5jbG9zZXN0KFwiLmNvcHktY29kZS1idXR0b25cIilcblx0XHRcdFx0aWYgY29weUJ0biAhPSBuaWwge1xuXHRcdFx0XHRcdHByZSA6PSBjb3B5QnRuLmNsb3Nlc3QoXCJwcmVcIilcblx0XHRcdFx0XHRpZiBwcmUgIT0gbmlsIHtcblx0XHRcdFx0XHRcdGNvZGVFbCA6PSBwcmUucXVlcnlTZWxlY3RvcihcImNvZGVcIilcblx0XHRcdFx0XHRcdGlmIGNvZGVFbCAhPSBuaWwge1xuXHRcdFx0XHRcdFx0XHR0ZXh0IDo9IGNvZGVFbC50ZXh0Q29udGVudFxuXHRcdFx0XHRcdFx0XHRuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dCh0ZXh0KVxuXHRcdFx0XHRcdFx0XHRjb3B5QnRuLnRleHRDb250ZW50ID0gdChcImNvZGUuY29waWVkXCIpXG5cdFx0XHRcdFx0XHRcdGNvcHlCdG4uY2xhc3NMaXN0LmFkZChcImNvcGllZFwiKVxuXHRcdFx0XHRcdFx0XHRzZXRUaW1lb3V0KGZ1bmMoKSB7XG5cdFx0XHRcdFx0XHRcdFx0Y29weUJ0bi50ZXh0Q29udGVudCA9IHQoXCJjb2RlLmNvcHlcIilcblx0XHRcdFx0XHRcdFx0XHRjb3B5QnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJjb3BpZWRcIilcblx0XHRcdFx0XHRcdFx0fSwgMjAwMClcblx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgXCJvcGVuLXBvc3RcIjpcblx0XHRcdFx0aWYgdGFyZ2V0LmNsb3Nlc3QoXCJhXCIpID09IG5pbCAmJiB0YXJnZXQuY2xvc2VzdChcIi5jbGlja2FibGUtdGFnXCIpID09IG5pbCB7XG5cdFx0XHRcdFx0aHJlZiA6PSBidG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1ocmVmXCIpXG5cdFx0XHRcdFx0aWYgaHJlZiAhPSBuaWwgJiYgaHJlZiAhPSBcIlwiIHtcblx0XHRcdFx0XHRcdG5hdmlnYXRlKHN0cmluZyhocmVmKSlcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdC8vIEZhbGxiYWNrIFNQQSBsaW5rIGludGVyY2VwdG9yOiBzdGFuZGFyZCA8YSBocmVmPVwiLi4uXCI+XG5cdFx0bGluayA6PSB0YXJnZXQuY2xvc2VzdChcImFcIilcblx0XHRpZiBsaW5rICE9IG5pbCB7XG5cdFx0XHRocmVmIDo9IHN0cmluZyhsaW5rLmdldEF0dHJpYnV0ZShcImhyZWZcIikpXG5cdFx0XHR0YXJnZXRBdHRyIDo9IGxpbmsuZ2V0QXR0cmlidXRlKFwidGFyZ2V0XCIpXG5cdFx0XHRpZiB0YXJnZXRBdHRyICE9IG5pbCAmJiB0YXJnZXRBdHRyICE9IFwiXCIgJiYgdGFyZ2V0QXR0ciAhPSBcIl9zZWxmXCIge1xuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblxuXHRcdFx0Ly8gSW4tcGFnZSBhbmNob3IgaGFzaCBsaW5rICgjdGhlLWFyY2hpdGVjdHVyZSlcblx0XHRcdGlmIHN0cmluZ3MuSGFzUHJlZml4KGhyZWYsIFwiI1wiKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRuYXZpZ2F0ZUhhc2goaHJlZilcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cblx0XHRcdGlmIHN0cmluZ3MuSGFzUHJlZml4KGhyZWYsIFwiL1wiKSB7XG5cdFx0XHRcdC8vIFNhbWUtcGFnZSBhbmNob3Igd2l0aCBmdWxsIHBhdGg6IC9ibG9nL3NsdWcjdGhlLWFyY2hpdGVjdHVyZVxuXHRcdFx0XHRpZiBjdXJyZW50UGF0aCAhPSBcIlwiICYmIHN0cmluZ3MuSGFzUHJlZml4KGhyZWYsIGN1cnJlbnRQYXRoK1wiI1wiKSB7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0aGFzaCA6PSBzdHJpbmdzLlRyaW1QcmVmaXgoaHJlZiwgY3VycmVudFBhdGgpXG5cdFx0XHRcdFx0c2Nyb2xsVG9IYXNoKGhhc2gsIHRydWUpXG5cdFx0XHRcdFx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG1hcFtzdHJpbmddYW55e30sIFwiXCIsIGhyZWYpXG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0bmF2aWdhdGUoaHJlZilcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0Ly8gQ2xpY2sgb24gc2VhcmNoIG92ZXJsYXkgYmFja2Ryb3Bcblx0XHRpZiB0YXJnZXQuaWQgPT0gXCJzZWFyY2gtcGFnZVwiIHtcblx0XHRcdGNsb3NlU2VhcmNoKClcblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdC8vIENsaWNrIG9uIGNvbnRhY3QgbW9kYWwgYmFja2Ryb3Bcblx0XHRpZiB0YXJnZXQuaWQgPT0gXCJjb250YWN0LW1vZGFsXCIge1xuXHRcdFx0Y2xvc2VDb250YWN0KClcblx0XHRcdHJldHVyblxuXHRcdH1cblx0fSlcblxuXHQvLyBJbnB1dCBvbiBzZWFyY2ggYW5kIGNvbnRhY3QgZm9ybSBmaWVsZHNcblx0YXBwLmFkZEV2ZW50TGlzdGVuZXIoXCJpbnB1dFwiLCBmdW5jKGUgYW55KSB7XG5cdFx0aWYgZS50YXJnZXQubWF0Y2hlcyhcIiNzZWFyY2gtcGFnZS1pbnB1dFwiKSB7XG5cdFx0XHRoYW5kbGVTZWFyY2hJbnB1dChzdHJpbmcoZS50YXJnZXQudmFsdWUpKVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXHRcdGlmIGUudGFyZ2V0LmNsb3Nlc3QoXCIjY29udGFjdC1mb3JtXCIpICE9IG5pbCB7XG5cdFx0XHR1cGRhdGVDb250YWN0RmllbGQoc3RyaW5nKGUudGFyZ2V0Lm5hbWUpLCBzdHJpbmcoZS50YXJnZXQudmFsdWUpKVxuXHRcdH1cblx0fSlcblxuXHQvLyBTdWJtaXQgb24gY29udGFjdCBmb3JtXG5cdGFwcC5hZGRFdmVudExpc3RlbmVyKFwic3VibWl0XCIsIGZ1bmMoZSBhbnkpIHtcblx0XHRpZiBlLnRhcmdldC5tYXRjaGVzKFwiI2NvbnRhY3QtZm9ybVwiKSB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdHN1Ym1pdENvbnRhY3QoKVxuXHRcdH1cblx0fSlcblxuXHQvLyBLZXlkb3duIGZvciBFc2NhcGUgYW5kIHNlYXJjaCBzaG9ydGN1dCAoQ21kK0sgLyBDdHJsK0sgYW5kIC8pXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwia2V5ZG93blwiLCBmdW5jKGUgYW55KSB7XG5cdFx0a2V5IDo9IHN0clZhbChlLmtleSlcblx0XHRpZiBrZXkgPT0gXCJFc2NhcGVcIiB7XG5cdFx0XHRpZiBzZWFyY2hPcGVuIHtcblx0XHRcdFx0Y2xvc2VTZWFyY2goKVxuXHRcdFx0fVxuXHRcdFx0aWYgY29udGFjdE9wZW4ge1xuXHRcdFx0XHRjbG9zZUNvbnRhY3QoKVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0aWYgc2VhcmNoT3BlbiB7XG5cdFx0XHRpZiBrZXkgPT0gXCJBcnJvd0Rvd25cIiB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRzZWFyY2hTZWxlY3ROZXh0KClcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHRpZiBrZXkgPT0gXCJBcnJvd1VwXCIge1xuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0c2VhcmNoU2VsZWN0UHJldigpXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdFx0aWYga2V5ID09IFwiRW50ZXJcIiAmJiBzZWFyY2hIYXNTZWxlY3Rpb24oKSB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRzZWFyY2hPcGVuU2VsZWN0ZWQoKVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiBzaXRlLlNlYXJjaC5FbmFibGVkICYmICFjb250YWN0T3BlbiB7XG5cdFx0XHRpc0NtZEsgOj0gKGJvb2xWYWwoZS5tZXRhS2V5KSB8fCBib29sVmFsKGUuY3RybEtleSkpICYmIChrZXkgPT0gXCJrXCIgfHwga2V5ID09IFwiS1wiKVxuXHRcdFx0aXNTbGFzaCA6PSBrZXkgPT0gXCIvXCJcblxuXHRcdFx0aWYgaXNDbWRLIHx8IGlzU2xhc2gge1xuXHRcdFx0XHR0YXJnZXQgOj0gZS50YXJnZXRcblx0XHRcdFx0dGFnTmFtZSA6PSBcIlwiXG5cdFx0XHRcdGlzRWRpdGFibGUgOj0gZmFsc2Vcblx0XHRcdFx0aWYgdGFyZ2V0ICE9IG5pbCB7XG5cdFx0XHRcdFx0dGFnTmFtZSA9IHN0cmluZ3MuVG9VcHBlcihzdHJWYWwodGFyZ2V0LnRhZ05hbWUpKVxuXHRcdFx0XHRcdGlzRWRpdGFibGUgPSBib29sVmFsKHRhcmdldC5pc0NvbnRlbnRFZGl0YWJsZSlcblx0XHRcdFx0fVxuXG5cdFx0XHRcdGluSW5wdXQgOj0gdGFnTmFtZSA9PSBcIklOUFVUXCIgfHwgdGFnTmFtZSA9PSBcIlRFWFRBUkVBXCIgfHwgdGFnTmFtZSA9PSBcIlNFTEVDVFwiIHx8IGlzRWRpdGFibGVcblxuXHRcdFx0XHRpZiBpc0NtZEsge1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdGlmIHNlYXJjaE9wZW4ge1xuXHRcdFx0XHRcdFx0Y2xvc2VTZWFyY2goKVxuXHRcdFx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdFx0XHRvcGVuU2VhcmNoKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH0gZWxzZSBpZiBpc1NsYXNoICYmICFpbklucHV0IHtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0XHRpZiAhc2VhcmNoT3BlbiB7XG5cdFx0XHRcdFx0XHRvcGVuU2VhcmNoKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHR9XG5cdH0pXG5cblx0Ly8gR2xvYmFsIGNsaWNrIG91dHNpZGUgaGFuZGxlcnNcblx0ZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIGZ1bmMoZSBhbnkpIHtcblx0XHRuYXZiYXIgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm5hdlwiKVxuXHRcdGlmIG5hdmJhciAhPSBuaWwgJiYgbW9iaWxlTWVudU9wZW4ge1xuXHRcdFx0aXNNb2JpbGUgOj0gd2luZG93LmlubmVyV2lkdGggPD0gNzY3XG5cdFx0XHRpZiBpc01vYmlsZSAmJiAhbmF2YmFyLmNvbnRhaW5zKGUudGFyZ2V0KSB7XG5cdFx0XHRcdGNsb3NlTW9iaWxlTWVudSgpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgcHJvamVjdHNEcm9wZG93bk9wZW4ge1xuXHRcdFx0ZHJvcGRvd24gOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5kcm9wZG93blwiKVxuXHRcdFx0aWYgZHJvcGRvd24gPT0gbmlsIHx8ICFkcm9wZG93bi5jb250YWlucyhlLnRhcmdldCkge1xuXHRcdFx0XHRjbG9zZVByb2plY3RzRHJvcGRvd24oKVxuXHRcdFx0fVxuXHRcdH1cblx0fSlcblxuXHQvLyBQb3BzdGF0ZSBoYW5kbGVyXG5cdHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKFwicG9wc3RhdGVcIiwgZnVuYyhlIGFueSkge1xuXHRcdG5ld1BhdGggOj0gc3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSlcblx0XHRpZiBuZXdQYXRoID09IGN1cnJlbnRQYXRoIHtcblx0XHRcdGhhc2ggOj0gc3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuXHRcdFx0aWYgaGFzaCAhPSBcIlwiIHtcblx0XHRcdFx0c2Nyb2xsVG9IYXNoKGhhc2gsIHRydWUpXG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHR3aW5kb3cuc2Nyb2xsVG8obWFwW3N0cmluZ11hbnl7XCJ0b3BcIjogMCwgXCJsZWZ0XCI6IDAsIFwiYmVoYXZpb3JcIjogXCJzbW9vdGhcIn0pXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0aGFuZGxlUm91dGUoKVxuXHR9KVxufVxuXG5hc3luYyBmdW5jIG1haW4oKSB7XG5cdHZpZXcgPSBuZXdWaWV3U3RhdGUoKVxuXHRlcnIgOj0gYXdhaXQgaW5pdERhdGEoKVxuXHRpZiBlcnIgIT0gbmlsIHtcblx0XHRjb25zb2xlLmVycm9yKFwiSW5pdCBkYXRhIGZhaWxlZDpcIiwgZXJyKVxuXHR9XG5cblx0aW5pdFRoZW1lKClcblx0aW5pdFNlYXJjaCgpXG5cdGluaXRJbml0aWFsUm91dGUoKVxuXG5cdC8vIFNoZWxsIGlzIG1vdW50ZWQgb25jZTsgcm91dGVzIGFuZCBvdmVybGF5cyByZS1yZW5kZXIgdGhlaXIgb3duIHJlZ2lvbnMuXG5cdGdvbS5Nb3VudChcIiNhcHBcIiwgQXBwU2hlbGwoKSwgYXBwUmVmcylcblx0c2V0dXBFdmVudHMoKVxuXHRhd2FpdCBoYW5kbGVSb3V0ZSgpXG5cblx0ZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKFwiYXBwLXJlYWR5XCIpXG59XG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwiZXJyb3JzXCJcbmltcG9ydCBcImpzOi4vYnJvd3Nlci5kLnRzXCJcbmltcG9ydCBcInN0cmNvbnZcIlxuaW1wb3J0IFwic3RyaW5nc1wiXG5cbi8vIHNsdWdpZnkgY29udmVydHMgYSBoZWFkaW5nIHRpdGxlIGludG8gYSBVUkwtZnJpZW5kbHkgYW5jaG9yIHNsdWcuXG5mdW5jIHNsdWdpZnkodGV4dCBzdHJpbmcpIHN0cmluZyB7XG5cdHRleHQgPSBzdHJpbmdzLlRvTG93ZXIoc3RyaW5ncy5UcmltU3BhY2UodGV4dCkpXG5cdHZhciBiIHN0cmluZ3MuQnVpbGRlclxuXHRmb3IgaSA6PSAwOyBpIDwgbGVuKHRleHQpOyBpKysge1xuXHRcdGMgOj0gdGV4dFtpXVxuXHRcdGlmIChjID49ICdhJyAmJiBjIDw9ICd6JykgfHwgKGMgPj0gJzAnICYmIGMgPD0gJzknKSB7XG5cdFx0XHRiLldyaXRlQnl0ZShjKVxuXHRcdH0gZWxzZSBpZiBjID09ICcgJyB8fCBjID09ICctJyB8fCBjID09ICdfJyB7XG5cdFx0XHRpZiBiLkxlbigpID4gMCAmJiBiLlN0cmluZygpW2IuTGVuKCktMV0gIT0gJy0nIHtcblx0XHRcdFx0Yi5Xcml0ZUJ5dGUoJy0nKVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRyZXMgOj0gc3RyaW5ncy5UcmltKGIuU3RyaW5nKCksIFwiLVwiKVxuXHRpZiByZXMgPT0gXCJcIiB7XG5cdFx0cmVzID0gXCJzZWN0aW9uXCJcblx0fVxuXHRyZXR1cm4gcmVzXG59XG5cbi8vIGNsZWFuSGVhZGluZ1RleHQgc3RyaXBzIGlubGluZSBtYXJrZG93biAoY29kZSBzcGFucywgZW1waGFzaXMsIGxpbmsgc3ludGF4LFxuLy8gY2xvc2luZyBBVFggaGFzaGVzKSBzbyB0aGUgVE9DIGxhYmVsIG1hdGNoZXMgdGhlIHJlbmRlcmVkIGhlYWRpbmcgdGV4dC5cbmZ1bmMgY2xlYW5IZWFkaW5nVGV4dCh0ZXh0IHN0cmluZykgc3RyaW5nIHtcblx0dGV4dCA9IHN0cmluZ3MuVHJpbVNwYWNlKHRleHQpXG5cdHRleHQgPSBzdHJpbmdzLlRyaW1SaWdodCh0ZXh0LCBcIiNcIilcblx0dGV4dCA9IHN0cmluZ3MuVHJpbVNwYWNlKHRleHQpXG5cdHZhciBiIHN0cmluZ3MuQnVpbGRlclxuXHRpIDo9IDBcblx0Zm9yIGkgPCBsZW4odGV4dCkge1xuXHRcdGMgOj0gdGV4dFtpXVxuXHRcdHN3aXRjaCB7XG5cdFx0Y2FzZSBjID09ICdgJyB8fCBjID09ICcqJyB8fCBjID09ICdbJzpcblx0XHRcdGkrK1xuXHRcdGNhc2UgYyA9PSAnXSc6XG5cdFx0XHQvLyBEcm9wIHRoZSBcIl0odXJsKVwiIHRhaWwgb2YgYSBsaW5rLCBrZWVwIHRoZSBsYWJlbCBhbHJlYWR5IHdyaXR0ZW4uXG5cdFx0XHRpKytcblx0XHRcdGlmIGkgPCBsZW4odGV4dCkgJiYgdGV4dFtpXSA9PSAnKCcge1xuXHRcdFx0XHRpZiBlbmQgOj0gc3RyaW5ncy5JbmRleEJ5dGUodGV4dFtpOl0sICcpJyk7IGVuZCAhPSAtMSB7XG5cdFx0XHRcdFx0aSArPSBlbmQgKyAxXG5cdFx0XHRcdH1cblx0XHRcdH1cblx0XHRkZWZhdWx0OlxuXHRcdFx0Yi5Xcml0ZUJ5dGUoYylcblx0XHRcdGkrK1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gc3RyaW5ncy5UcmltU3BhY2UoYi5TdHJpbmcoKSlcbn1cblxuLy8gZXh0cmFjdFRPQyBleHRyYWN0cyBoMiBhbmQgaDMgaGVhZGluZ3Mgb3V0c2lkZSBjb2RlIGJsb2NrcyBhbmQgZGVkdXBsaWNhdGVzIHNsdWdzLlxuZnVuYyBleHRyYWN0VE9DKG1hcmtkb3duIHN0cmluZykgW11UT0NJdGVtIHtcblx0aXRlbXMgOj0gW11UT0NJdGVte31cblx0aWYgbWFya2Rvd24gPT0gXCJcIiB7XG5cdFx0cmV0dXJuIGl0ZW1zXG5cdH1cblxuXHRsaW5lcyA6PSBzdHJpbmdzLlNwbGl0KG1hcmtkb3duLCBcIlxcblwiKVxuXHRpbkNvZGUgOj0gZmFsc2Vcblx0c2x1Z0NvdW50cyA6PSBtYXBbc3RyaW5nXWludHt9XG5cblx0Zm9yIF8sIGxpbmUgOj0gcmFuZ2UgbGluZXMge1xuXHRcdHRyaW1tZWQgOj0gc3RyaW5ncy5UcmltU3BhY2UobGluZSlcblx0XHRpZiBzdHJpbmdzLkhhc1ByZWZpeCh0cmltbWVkLCBcImBgYFwiKSB8fCBzdHJpbmdzLkhhc1ByZWZpeCh0cmltbWVkLCBcIn5+flwiKSB7XG5cdFx0XHRpbkNvZGUgPSAhaW5Db2RlXG5cdFx0XHRjb250aW51ZVxuXHRcdH1cblx0XHRpZiBpbkNvZGUge1xuXHRcdFx0Y29udGludWVcblx0XHR9XG5cblx0XHRsZXZlbCA6PSAwXG5cdFx0aGVhZGluZ1RleHQgOj0gXCJcIlxuXHRcdGlmIHN0cmluZ3MuSGFzUHJlZml4KHRyaW1tZWQsIFwiIyMgXCIpIHtcblx0XHRcdGxldmVsID0gMlxuXHRcdFx0aGVhZGluZ1RleHQgPSBjbGVhbkhlYWRpbmdUZXh0KHRyaW1tZWRbMzpdKVxuXHRcdH0gZWxzZSBpZiBzdHJpbmdzLkhhc1ByZWZpeCh0cmltbWVkLCBcIiMjIyBcIikge1xuXHRcdFx0bGV2ZWwgPSAzXG5cdFx0XHRoZWFkaW5nVGV4dCA9IGNsZWFuSGVhZGluZ1RleHQodHJpbW1lZFs0Ol0pXG5cdFx0fVxuXG5cdFx0aWYgbGV2ZWwgPiAwICYmIGhlYWRpbmdUZXh0ICE9IFwiXCIge1xuXHRcdFx0c2x1ZyA6PSBzbHVnaWZ5KGhlYWRpbmdUZXh0KVxuXHRcdFx0aWQgOj0gc2x1Z1xuXHRcdFx0aWYgY291bnQsIG9rIDo9IHNsdWdDb3VudHNbc2x1Z107IG9rIHtcblx0XHRcdFx0aWQgPSBzbHVnICsgXCItXCIgKyBzdHJjb252Lkl0b2EoY291bnQpXG5cdFx0XHRcdHNsdWdDb3VudHNbc2x1Z10gPSBjb3VudCArIDFcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHNsdWdDb3VudHNbc2x1Z10gPSAxXG5cdFx0XHR9XG5cdFx0XHRpdGVtcyA9IGFwcGVuZChpdGVtcywgVE9DSXRlbXtcblx0XHRcdFx0SUQ6ICAgIGlkLFxuXHRcdFx0XHRUZXh0OiAgaGVhZGluZ1RleHQsXG5cdFx0XHRcdExldmVsOiBsZXZlbCxcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0cmV0dXJuIGl0ZW1zXG59XG5cbi8vIGV4dHJhY3RQcm9qZWN0VE9DIGV4dHJhY3RzIGhlYWRpbmdzIGZyb20gdGhlIHByb2plY3QgUkVBRE1FIGFuZCBhcHBlbmRzIHNlY3Rpb25zXG4vLyBmb3IgTWVkaWEsIERlbW8sIGFuZCBMaW5rcyBpZiBwcmVzZW50LlxuZnVuYyBleHRyYWN0UHJvamVjdFRPQyhtYXJrZG93biBzdHJpbmcsIHAgUHJvamVjdCkgW11UT0NJdGVtIHtcblx0aXRlbXMgOj0gZXh0cmFjdFRPQyhtYXJrZG93bilcblx0aWYgbGVuKHAuWW91dHViZVZpZGVvcykgPiAwIHtcblx0XHRpdGVtcyA9IGFwcGVuZChpdGVtcywgVE9DSXRlbXtcblx0XHRcdElEOiAgICBcInByb2plY3QtbWVkaWFcIixcblx0XHRcdFRleHQ6ICB0KFwicHJvamVjdC5tZWRpYVwiKSxcblx0XHRcdExldmVsOiAyLFxuXHRcdH0pXG5cdH1cblx0aWYgcC5EZW1vVXJsICE9IFwiXCIge1xuXHRcdGl0ZW1zID0gYXBwZW5kKGl0ZW1zLCBUT0NJdGVte1xuXHRcdFx0SUQ6ICAgIFwicHJvamVjdC1kZW1vXCIsXG5cdFx0XHRUZXh0OiAgZGVtb0xhYmVsKHApLFxuXHRcdFx0TGV2ZWw6IDIsXG5cdFx0fSlcblx0fVxuXHRpZiBsZW4ocC5MaW5rcykgPiAwIHtcblx0XHRpdGVtcyA9IGFwcGVuZChpdGVtcywgVE9DSXRlbXtcblx0XHRcdElEOiAgICBcInByb2plY3QtbGlua3NcIixcblx0XHRcdFRleHQ6ICB0KFwicHJvamVjdC5saW5rc1wiKSxcblx0XHRcdExldmVsOiAyLFxuXHRcdH0pXG5cdH1cblx0cmV0dXJuIGl0ZW1zXG59XG5cbi8vIGhlYWRpbmdUZXh0S2V5IHJlZHVjZXMgcmVuZGVyZWQgaGVhZGluZyBIVE1MIHRvIHRoZSBzYW1lIHNsdWcgZm9ybSBhcyB0aGVcbi8vIG1hcmtkb3duIHNvdXJjZSBzbyB0aGUgdHdvIGNhbiBiZSBtYXRjaGVkLlxuZnVuYyBoZWFkaW5nVGV4dEtleShpbm5lciBzdHJpbmcpIHN0cmluZyB7XG5cdHZhciBiIHN0cmluZ3MuQnVpbGRlclxuXHRpblRhZyA6PSBmYWxzZVxuXHRmb3IgaSA6PSAwOyBpIDwgbGVuKGlubmVyKTsgaSsrIHtcblx0XHRjIDo9IGlubmVyW2ldXG5cdFx0aWYgYyA9PSAnPCcge1xuXHRcdFx0aW5UYWcgPSB0cnVlXG5cdFx0XHRjb250aW51ZVxuXHRcdH1cblx0XHRpZiBjID09ICc+JyB7XG5cdFx0XHRpblRhZyA9IGZhbHNlXG5cdFx0XHRjb250aW51ZVxuXHRcdH1cblx0XHRpZiAhaW5UYWcge1xuXHRcdFx0Yi5Xcml0ZUJ5dGUoYylcblx0XHR9XG5cdH1cblx0dGV4dCA6PSBiLlN0cmluZygpXG5cdHRleHQgPSBzdHJpbmdzLlJlcGxhY2VBbGwodGV4dCwgXCImYW1wO1wiLCBcIiZcIilcblx0dGV4dCA9IHN0cmluZ3MuUmVwbGFjZUFsbCh0ZXh0LCBcIiZsdDtcIiwgXCI8XCIpXG5cdHRleHQgPSBzdHJpbmdzLlJlcGxhY2VBbGwodGV4dCwgXCImZ3Q7XCIsIFwiPlwiKVxuXHR0ZXh0ID0gc3RyaW5ncy5SZXBsYWNlQWxsKHRleHQsIFwiJnF1b3Q7XCIsIFwiXFxcIlwiKVxuXHR0ZXh0ID0gc3RyaW5ncy5SZXBsYWNlQWxsKHRleHQsIFwiJiMzOTtcIiwgXCInXCIpXG5cdHJldHVybiBzbHVnaWZ5KHRleHQpXG59XG5cbi8vIGluamVjdEhlYWRpbmdJRHMgZ2l2ZXMgaDIvaDMgZWxlbWVudHMgdGhlIGlkIG9mIHRoZSBUT0MgaXRlbSB3aXRoIG1hdGNoaW5nXG4vLyB0ZXh0LiBIZWFkaW5ncyBhcmUgbWF0Y2hlZCBieSB0ZXh0IHJhdGhlciB0aGFuIHBvc2l0aW9uLCBzbyBhIGhlYWRpbmcgdGhlXG4vLyBtYXJrZG93biBzY2FuIG1pc3NlZCAoc2V0ZXh0LCBibG9ja3F1b3RlLCBpbmRlbnRlZCBjb2RlKSBvbmx5IGxvc2VzIGl0cyBvd25cbi8vIGFuY2hvciBpbnN0ZWFkIG9mIHNoaWZ0aW5nIGV2ZXJ5IGlkIGFmdGVyIGl0LlxuZnVuYyBpbmplY3RIZWFkaW5nSURzKGh0bWwgc3RyaW5nLCB0b2MgW11UT0NJdGVtKSBzdHJpbmcge1xuXHRpZiBsZW4odG9jKSA9PSAwIHx8IGh0bWwgPT0gXCJcIiB7XG5cdFx0cmV0dXJuIGh0bWxcblx0fVxuXG5cdC8vIElkcyBxdWV1ZWQgcGVyIHRleHQga2V5LCBjb25zdW1lZCBpbiBkb2N1bWVudCBvcmRlciBzbyBkdXBsaWNhdGVzIGFsaWduLlxuXHRwZW5kaW5nIDo9IG1hcFtzdHJpbmddW11zdHJpbmd7fVxuXHRmb3IgXywgaXRlbSA6PSByYW5nZSB0b2Mge1xuXHRcdGtleSA6PSBzbHVnaWZ5KGl0ZW0uVGV4dClcblx0XHRwZW5kaW5nW2tleV0gPSBhcHBlbmQocGVuZGluZ1trZXldLCBpdGVtLklEKVxuXHR9XG5cblx0dmFyIGIgc3RyaW5ncy5CdWlsZGVyXG5cdGlkeCA6PSAwXG5cblx0Zm9yIGlkeCA8IGxlbihodG1sKSB7XG5cdFx0cmVzdCA6PSBodG1sW2lkeDpdXG5cdFx0aWYgc3RyaW5ncy5IYXNQcmVmaXgocmVzdCwgXCI8aDJcIikgfHwgc3RyaW5ncy5IYXNQcmVmaXgocmVzdCwgXCI8aDNcIikge1xuXHRcdFx0Y2xvc2VCcmFja2V0IDo9IHN0cmluZ3MuSW5kZXgocmVzdCwgXCI+XCIpXG5cdFx0XHRjbG9zZVRhZyA6PSBzdHJpbmdzLkluZGV4KHJlc3QsIFwiPC9oXCIpXG5cdFx0XHRpZiBjbG9zZUJyYWNrZXQgIT0gLTEgJiYgY2xvc2VUYWcgIT0gLTEgJiYgY2xvc2VCcmFja2V0IDwgY2xvc2VUYWcge1xuXHRcdFx0XHRvcGVuVGFnIDo9IHJlc3RbOmNsb3NlQnJhY2tldCsxXVxuXHRcdFx0XHRrZXkgOj0gaGVhZGluZ1RleHRLZXkocmVzdFtjbG9zZUJyYWNrZXQrMSA6IGNsb3NlVGFnXSlcblx0XHRcdFx0aWRzIDo9IHBlbmRpbmdba2V5XVxuXHRcdFx0XHRpZiBsZW4oaWRzKSA+IDAgJiYgIXN0cmluZ3MuQ29udGFpbnMob3BlblRhZywgXCJpZD1cIikge1xuXHRcdFx0XHRcdHBlbmRpbmdba2V5XSA9IGlkc1sxOl1cblx0XHRcdFx0XHRiLldyaXRlU3RyaW5nKG9wZW5UYWdbOjNdICsgXCIgaWQ9XFxcIlwiICsgaWRzWzBdICsgXCJcXFwiXCIgKyBvcGVuVGFnWzM6XSlcblx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRiLldyaXRlU3RyaW5nKG9wZW5UYWcpXG5cdFx0XHRcdH1cblx0XHRcdFx0aWR4ICs9IGNsb3NlQnJhY2tldCArIDFcblx0XHRcdFx0Y29udGludWVcblx0XHRcdH1cblx0XHR9XG5cblx0XHRiLldyaXRlQnl0ZShodG1sW2lkeF0pXG5cdFx0aWR4Kytcblx0fVxuXG5cdHJldHVybiBiLlN0cmluZygpXG59XG5cbmZ1bmMgcGFyc2VNYXJrZG93bihjb250ZW50IHN0cmluZykgc3RyaW5nIHtcblx0aWYgY29udGVudCA9PSBcIlwiIHtcblx0XHRyZXR1cm4gXCJcIlxuXHR9XG5cdGRlZmVyIGZ1bmMoKSB7XG5cdFx0aWYgciA6PSByZWNvdmVyKCk7IHIgIT0gbmlsIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJFcnJvciByZW5kZXJpbmcgbWFya2Rvd246XCIsIHIpXG5cdFx0fVxuXHR9KClcblx0cmV0dXJuIG1hcmtlZC5wYXJzZShjb250ZW50KVxufVxuXG5mdW5jIHN0cmlwRnJvbnRtYXR0ZXIobWFya2Rvd24gc3RyaW5nKSBzdHJpbmcge1xuXHR0cmltbWVkIDo9IHN0cmluZ3MuVHJpbVNwYWNlKG1hcmtkb3duKVxuXHRpZiAhc3RyaW5ncy5IYXNQcmVmaXgodHJpbW1lZCwgXCItLS1cIikge1xuXHRcdHJldHVybiB0cmltbWVkXG5cdH1cblxuXHRyZXN0IDo9IHRyaW1tZWRbMzpdXG5cdG5ld2xpbmVJZHggOj0gc3RyaW5ncy5JbmRleChyZXN0LCBcIlxcblwiKVxuXHRpZiBuZXdsaW5lSWR4ID09IC0xIHtcblx0XHRyZXR1cm4gdHJpbW1lZFxuXHR9XG5cdGFmdGVyRmlyc3RMaW5lIDo9IHJlc3RbbmV3bGluZUlkeCsxOl1cblx0Y2xvc2luZ0lkeCA6PSBzdHJpbmdzLkluZGV4KGFmdGVyRmlyc3RMaW5lLCBcIlxcbi0tLVwiKVxuXHRpZiBjbG9zaW5nSWR4ID09IC0xIHtcblx0XHRjbG9zaW5nSWR4ID0gc3RyaW5ncy5JbmRleChhZnRlckZpcnN0TGluZSwgXCItLS1cIilcblx0XHRpZiBjbG9zaW5nSWR4ID09IC0xIHtcblx0XHRcdHJldHVybiB0cmltbWVkXG5cdFx0fVxuXHRcdGFmdGVyQ2xvc2luZyA6PSBhZnRlckZpcnN0TGluZVtjbG9zaW5nSWR4KzM6XVxuXHRcdHJldHVybiBzdHJpbmdzLlRyaW1TcGFjZShhZnRlckNsb3NpbmcpXG5cdH1cblxuXHRhZnRlckNsb3NpbmcgOj0gYWZ0ZXJGaXJzdExpbmVbY2xvc2luZ0lkeCs0Ol1cblx0cmV0dXJuIHN0cmluZ3MuVHJpbVNwYWNlKGFmdGVyQ2xvc2luZylcbn1cblxuYXN5bmMgZnVuYyBsb2FkTWFya2Rvd25GaWxlKHVybCBzdHJpbmcpIChzdHJpbmcsIGVycm9yKSB7XG5cdGRlZmVyIGZ1bmMoKSB7XG5cdFx0aWYgciA6PSByZWNvdmVyKCk7IHIgIT0gbmlsIHtcblx0XHRcdGNvbnNvbGUuZXJyb3IoXCJmZXRjaCBmYWlsZWQ6XCIsIHIpXG5cdFx0fVxuXHR9KClcblxuXHRyZXMgOj0gYXdhaXQgZmV0Y2godXJsKVxuXHRpZiByZXMgPT0gbmlsIHx8ICFyZXMub2sge1xuXHRcdHJldHVybiBcIlwiLCBlcnJvcnMuTmV3KFwiSFRUUCBlcnJvclwiKVxuXHR9XG5cblx0dGV4dCA6PSBhd2FpdCByZXMudGV4dCgpXG5cdHJldHVybiBzdHJpbmcodGV4dCksIG5pbFxufVxuXG5mdW5jIGF0dGFjaENvcHlCdXR0b25zKCkge1xuXHRwcmVzIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJwcmVcIilcblx0Zm9yIGkgOj0gMDsgaSA8IGxlbihwcmVzKTsgaSsrIHtcblx0XHRwcmUgOj0gcHJlc1tpXVxuXHRcdGlmIHByZS5xdWVyeVNlbGVjdG9yKFwiLmNvcHktY29kZS1idXR0b25cIikgIT0gbmlsIHtcblx0XHRcdGNvbnRpbnVlXG5cdFx0fVxuXHRcdGJ0biA6PSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiYnV0dG9uXCIpXG5cdFx0YnRuLmNsYXNzTmFtZSA9IFwiY29weS1jb2RlLWJ1dHRvblwiXG5cdFx0YnRuLnNldEF0dHJpYnV0ZShcImRhdGEtYWN0aW9uXCIsIFwiY29weS1jb2RlXCIpXG5cdFx0YnRuLnNldEF0dHJpYnV0ZShcImFyaWEtbGFiZWxcIiwgdChcImFyaWEuY29weUNvZGVcIikpXG5cdFx0YnRuLnRleHRDb250ZW50ID0gdChcImNvZGUuY29weVwiKVxuXHRcdHByZS5zdHlsZS5wb3NpdGlvbiA9IFwicmVsYXRpdmVcIlxuXHRcdHByZS5hcHBlbmRDaGlsZChidG4pXG5cdH1cbn1cblxuZnVuYyBoaWdobGlnaHRDb2RlKCkge1xuXHRkZWZlciBmdW5jKCkge1xuXHRcdGlmIHIgOj0gcmVjb3ZlcigpOyByICE9IG5pbCB7XG5cdFx0XHRjb25zb2xlLndhcm4oXCJQcmlzbSBoaWdobGlnaHQgZXJyb3I6XCIsIHIpXG5cdFx0fVxuXHR9KClcblx0Y29udmVydE1lcm1haWRCbG9ja3MoKVxuXHRpZiBQcmlzbS5sYW5ndWFnZXMudGVtcGwgPT0gbmlsICYmIFByaXNtLmxhbmd1YWdlcy5nbyAhPSBuaWwge1xuXHRcdFByaXNtLmxhbmd1YWdlcy50ZW1wbCA9IFByaXNtLmxhbmd1YWdlcy5nb1xuXHR9XG5cdFByaXNtLmhpZ2hsaWdodEFsbCgpXG5cdGF0dGFjaENvcHlCdXR0b25zKClcblx0cmVuZGVyTWVybWFpZCgpXG59XG5cbi8vIGNvbnZlcnRNZXJtYWlkQmxvY2tzIHN3YXBzIG1hcmtlZCdzIGBgYG1lcm1haWQgZmVuY2VzIGZvciBkaXZzIG1lcm1haWQgY2FuXG4vLyByZW5kZXIsIGtlZXBpbmcgdGhlIHNvdXJjZSBpbiBkYXRhLW1lcm1haWQtc3JjIHNvIGRpYWdyYW1zIGNhbiBiZSByZS1kcmF3bi5cbmZ1bmMgY29udmVydE1lcm1haWRCbG9ja3MoKSBpbnQge1xuXHRjb2RlcyA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwicHJlID4gY29kZS5sYW5ndWFnZS1tZXJtYWlkXCIpXG5cdGZvciBpIDo9IDA7IGkgPCBsZW4oY29kZXMpOyBpKysge1xuXHRcdGNvZGUgOj0gY29kZXNbaV1cblx0XHRzcmMgOj0gc3RyaW5nKGNvZGUudGV4dENvbnRlbnQpXG5cdFx0ZGl2IDo9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJkaXZcIilcblx0XHRkaXYuY2xhc3NOYW1lID0gXCJtZXJtYWlkXCJcblx0XHRkaXYuc2V0QXR0cmlidXRlKFwiZGF0YS1tZXJtYWlkLXNyY1wiLCBzcmMpXG5cdFx0ZGl2LnRleHRDb250ZW50ID0gc3JjXG5cdFx0Y29kZS5wYXJlbnRFbGVtZW50LnJlcGxhY2VXaXRoKGRpdilcblx0fVxuXHRyZXR1cm4gbGVuKGNvZGVzKVxufVxuXG5mdW5jIG1lcm1haWRUaGVtZSh0aGVtZSBzdHJpbmcpIHN0cmluZyB7XG5cdGlmIHRoZW1lID09IFwibGlnaHRcIiB7XG5cdFx0cmV0dXJuIFwiZGVmYXVsdFwiXG5cdH1cblx0cmV0dXJuIFwiZGFya1wiXG59XG5cbmNvbnN0IG1lcm1haWRTcmMgPSBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vbWVybWFpZEAxMS9kaXN0L21lcm1haWQubWluLmpzXCJcblxuZnVuYyBsb2FkTWVybWFpZCgpIGFueSB7XG5cdHJldHVybiBsb2FkU2NyaXB0KG1lcm1haWRTcmMsIFwiXCIpXG59XG5cbi8vIHJlbmRlck1lcm1haWQgbGF6eS1sb2FkcyBtZXJtYWlkIG9uIGZpcnN0IHVzZSBhbmQgKHJlKWRyYXdzIGV2ZXJ5IGRpYWdyYW1cbi8vIG9uIHRoZSBwYWdlIHdpdGggdGhlIGN1cnJlbnQgdGhlbWUuXG5hc3luYyBmdW5jIHJlbmRlck1lcm1haWQoKSB7XG5cdGRlZmVyIGZ1bmMoKSB7XG5cdFx0aWYgciA6PSByZWNvdmVyKCk7IHIgIT0gbmlsIHtcblx0XHRcdGNvbnNvbGUud2FybihcIk1lcm1haWQgcmVuZGVyIGVycm9yOlwiLCByKVxuXHRcdH1cblx0fSgpXG5cdG5vZGVzIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubWVybWFpZFtkYXRhLW1lcm1haWQtc3JjXVwiKVxuXHRpZiBsZW4obm9kZXMpID09IDAge1xuXHRcdHJldHVyblxuXHR9XG5cdGF3YWl0IGxvYWRNZXJtYWlkKClcblx0Zm9yIGkgOj0gMDsgaSA8IGxlbihub2Rlcyk7IGkrKyB7XG5cdFx0biA6PSBub2Rlc1tpXVxuXHRcdG4ucmVtb3ZlQXR0cmlidXRlKFwiZGF0YS1wcm9jZXNzZWRcIilcblx0XHRuLnRleHRDb250ZW50ID0gbi5nZXRBdHRyaWJ1dGUoXCJkYXRhLW1lcm1haWQtc3JjXCIpXG5cdH1cblx0bWVybWFpZC5pbml0aWFsaXplKG1hcFtzdHJpbmddYW55e1xuXHRcdFwic3RhcnRPbkxvYWRcIjogICBmYWxzZSxcblx0XHRcInRoZW1lXCI6ICAgICAgICAgbWVybWFpZFRoZW1lKGN1cnJlbnRUaGVtZSksXG5cdFx0XCJzZWN1cml0eUxldmVsXCI6IFwic3RyaWN0XCIsXG5cdH0pXG5cdGF3YWl0IG1lcm1haWQucnVuKG1hcFtzdHJpbmddYW55e1wibm9kZXNcIjogbm9kZXN9KVxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcInN0cmNvbnZcIlxuXG50ZW1wbCBOYXZiYXIociBSb3V0ZU1hdGNoLCBwYWdlcyBbXU5hdlBhZ2UsIHByb2plY3RzIFtdUHJvamVjdCwgZHJvcGRvd25PcGVuIGJvb2wsIG1vYmlsZU9wZW4gYm9vbCwgc2l0ZUNvbmZpZyBTaXRlQ29uZmlnKSB7XG5cdDxuYXYgY2xhc3M9XCJuYXZiYXJcIj5cblx0XHQ8ZGl2IGNsYXNzPVwibmF2YmFyLWlubmVyXCI+XG5cdFx0XHQ8YSBjbGFzcz1cIm5hdmJhci1icmFuZFwiIGhyZWY9XCIvXCIgZGF0YS1hY3Rpb249XCJuYXZcIj57IHNpdGVDb25maWcuVGl0bGUgfTwvYT5cblx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPXsgY2xzKFwibmF2YmFyLXRvZ2dsZVwiLCBtb2JpbGVPcGVuLCBcImFjdGl2ZVwiKSB9IGFyaWEtbGFiZWw9XCJUb2dnbGUgbmF2aWdhdGlvblwiIGFyaWEtZXhwYW5kZWQ9eyBzdHJjb252LkZvcm1hdEJvb2wobW9iaWxlT3BlbikgfSBkYXRhLWFjdGlvbj1cInRvZ2dsZS1tb2JpbGUtbmF2XCI+XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwibmF2YmFyLXRvZ2dsZS1pY29uXCI+PC9zcGFuPlxuXHRcdFx0PC9idXR0b24+XG5cdFx0XHQ8ZGl2IGNsYXNzPXsgY2xzKFwibmF2YmFyLWNvbGxhcHNlXCIsIG1vYmlsZU9wZW4sIFwic2hvd1wiKSB9PlxuXHRcdFx0XHQ8dWwgY2xhc3M9XCJuYXZiYXItbmF2IGxlZnRcIj5cblx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbSBuYXZiYXItbWVudVwiPlxuXHRcdFx0XHRcdFx0PGEgY2xhc3M9eyBjbHMoXCJuYXYtbGlua1wiLCByLktpbmQgPT0gUm91dGVCbG9nLCBcImFjdGl2ZVwiKSB9IGhyZWY9XCIvYmxvZ1wiIGRhdGEtYWN0aW9uPVwibmF2XCI+eyB0KFwibmF2LmJsb2dcIikgfTwvYT5cblx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdDxsaSBjbGFzcz17IGNscyhcIm5hdi1pdGVtIG5hdmJhci1tZW51IGRyb3Bkb3duXCIsIGRyb3Bkb3duT3BlbiwgXCJzaG93XCIpIH0+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz17IGNscyhcIm5hdi1saW5rIGRyb3Bkb3duLXRvZ2dsZVwiLCByLktpbmQgPT0gUm91dGVQcm9qZWN0LCBcImFjdGl2ZVwiKSB9IGFyaWEtaGFzcG9wdXA9XCJ0cnVlXCIgYXJpYS1jb250cm9scz1cInByb2plY3RzLWRyb3Bkb3duXCIgYXJpYS1leHBhbmRlZD17IHN0cmNvbnYuRm9ybWF0Qm9vbChkcm9wZG93bk9wZW4pIH0gZGF0YS1hY3Rpb249XCJ0b2dnbGUtcHJvamVjdHMtZHJvcGRvd25cIj5cblx0XHRcdFx0XHRcdFx0eyB0KFwibmF2LnByb2plY3RzXCIpIH1cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJkcm9wZG93bi1jaGV2cm9uIGRyb3Bkb3duLWNoZXZyb24tZG93blwiPkBJY29uKFwiY2hldnJvbi1kb3duXCIsIFwiMC44ZW1cIik8L3NwYW4+XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiZHJvcGRvd24tY2hldnJvbiBkcm9wZG93bi1jaGV2cm9uLXVwXCI+QEljb24oXCJjaGV2cm9uLXVwXCIsIFwiMC44ZW1cIik8L3NwYW4+XG5cdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDx1bCBjbGFzcz1cImRyb3Bkb3duLW1lbnVcIiBpZD1cInByb2plY3RzLWRyb3Bkb3duXCI+XG5cdFx0XHRcdFx0XHRcdGZvciBfLCBwIDo9IHJhbmdlIHByb2plY3RzIHtcblx0XHRcdFx0XHRcdFx0XHQ8bGk+PGEgY2xhc3M9eyBjbHMoXCJkcm9wZG93bi1pdGVtXCIsIGlzQWN0aXZlUm91dGUociwgUm91dGVQcm9qZWN0LCBwLklEKSwgXCJhY3RpdmVcIikgfSBocmVmPXsgcC5IcmVmIH0gZGF0YS1hY3Rpb249XCJuYXZcIj57IHAuVGl0bGUgfTwvYT48L2xpPlxuXHRcdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0Zm9yIF8sIHBhZ2UgOj0gcmFuZ2UgcGFnZXMge1xuXHRcdFx0XHRcdFx0aWYgcGFnZS5TaG93SW5OYXYge1xuXHRcdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbSBuYXZiYXItbWVudVwiPlxuXHRcdFx0XHRcdFx0XHRcdDxhIGNsYXNzPXsgY2xzKFwibmF2LWxpbmtcIiwgaXNBY3RpdmVSb3V0ZShyLCBSb3V0ZVBhZ2UsIHBhZ2UuSUQpLCBcImFjdGl2ZVwiKSB9IGhyZWY9eyBwYWdlLkhyZWYgfSBkYXRhLWFjdGlvbj1cIm5hdlwiPnsgcGFnZS5UaXRsZSB9PC9hPlxuXHRcdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC91bD5cblx0XHRcdFx0PHVsIGNsYXNzPVwibmF2YmFyLW5hdiByaWdodFwiPlxuXHRcdFx0XHRcdGlmIHNpdGVDb25maWcuU2VhcmNoLkVuYWJsZWQge1xuXHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibmF2LWl0ZW0gbmF2YmFyLWljb25cIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJuYXYtbGluayBzZWFyY2gtdG9nZ2xlXCIgaWQ9XCJzZWFyY2gtdG9nZ2xlXCIgYXJpYS1sYWJlbD17IHQoXCJhcmlhLnNlYXJjaFwiKSB9IHRpdGxlPXsgdChcInNlYXJjaC5idXR0b25UaXRsZVwiKSArIFwiIChcIiArIHQoXCJzZWFyY2guc2hvcnRjdXRIaW50XCIpICsgXCIpXCIgfSBhcmlhLWtleXNob3J0Y3V0cz1cIkNvbnRyb2wrSyBNZXRhK0sgL1wiIGRhdGEtYWN0aW9uPVwib3Blbi1zZWFyY2hcIj5cblx0XHRcdFx0XHRcdFx0XHRASWNvbihcInNlYXJjaFwiLCBcIjEuMzVyZW1cIilcblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbSBuYXZiYXItaWNvblwiPlxuXHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJ0aGVtZS10b2dnbGVcIiBjbGFzcz1cInRoZW1lLXRvZ2dsZSBuYXYtbGlua1wiIGFyaWEtbGFiZWw9eyB0KFwiYXJpYS50b2dnbGVUaGVtZVwiKSB9IHRpdGxlPXsgdChcInRoZW1lLnRvZ2dsZVRpdGxlXCIpIH0gZGF0YS1hY3Rpb249XCJ0b2dnbGUtdGhlbWVcIj5cblx0XHRcdFx0XHRcdFx0QEljb24oXCJzdW5cIiwgXCIxLjM1cmVtXCIpXG5cdFx0XHRcdFx0XHRcdEBJY29uKFwibW9vblwiLCBcIjEuMzVyZW1cIilcblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0aWYgc2l0ZUNvbmZpZy5FbWFpbEpTLkVuYWJsZWQge1xuXHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibmF2LWl0ZW0gbmF2YmFyLWljb25cIj5cblx0XHRcdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9XCJuYXYtbGluayBlbWFpbC10b2dnbGVcIiBpZD1cImVtYWlsLXRvZ2dsZVwiIGFyaWEtbGFiZWw9eyB0KFwiY29udGFjdC50aXRsZVwiKSB9IHRpdGxlPXsgdChcImNvbnRhY3QuYnV0dG9uVGl0bGVcIikgfSBkYXRhLWFjdGlvbj1cIm9wZW4tY29udGFjdFwiPlxuXHRcdFx0XHRcdFx0XHRcdEBJY29uKFwiZW52ZWxvcGVcIiwgXCIxLjM1cmVtXCIpXG5cdFx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0Zm9yIF8sIHMgOj0gcmFuZ2Ugc2l0ZUNvbmZpZy5Tb2NpYWwge1xuXHRcdFx0XHRcdFx0PGxpIGNsYXNzPVwibmF2LWl0ZW0gbmF2YmFyLWljb25cIj5cblx0XHRcdFx0XHRcdFx0PGEgY2xhc3M9XCJuYXYtbGlua1wiIGhyZWY9eyBzLkhyZWYgfSB0YXJnZXQ9eyBzLlRhcmdldCB9IHJlbD17IHMuUmVsIH0+XG5cdFx0XHRcdFx0XHRcdFx0QEljb24ocy5JY29uLCBcIjEuMzVyZW1cIilcblx0XHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvdWw+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0PC9uYXY+XG59XG4iLCJwYWNrYWdlIG1haW5cblxudGVtcGwgUGFnZVZpZXcodiBWaWV3U3RhdGUpIHtcblx0aWYgdi5TdGF0dXMgPT0gTG9hZEZhaWxlZCB7XG5cdFx0PGRpdiBjbGFzcz1cImVycm9yLW1lc3NhZ2VcIj5cblx0XHRcdDxoMT57IHQoXCJnZW5lcmFsLm5vdEZvdW5kXCIpIH08L2gxPlxuXHRcdFx0PHA+eyB0KFwiZ2VuZXJhbC5ub3RGb3VuZE1lc3NhZ2VcIikgfTwvcD5cblx0XHQ8L2Rpdj5cblx0fSBlbHNlIHtcblx0XHQ8ZGl2IGNsYXNzPVwicGFnZS12aWV3XCI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwibWFya2Rvd24tYm9keVwiPlxuXHRcdFx0XHRAdGVtcGwuUmF3KHYuSFRNTClcblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHR9XG59XG4iLCJwYWNrYWdlIG1haW5cblxudGVtcGwgUHJvamVjdFJlYWRtZSh2IFZpZXdTdGF0ZSkge1xuXHRpZiB2LlByb2ouR2l0aHViUmVwbyAhPSBcIlwiIHtcblx0XHRpZiB2LlN0YXR1cyA9PSBMb2FkRmFpbGVkIHtcblx0XHRcdDxkaXYgaWQ9XCJwcm9qZWN0LXJlYWRtZVwiPlxuXHRcdFx0XHQ8cD57IHQoXCJwcm9qZWN0LnJlYWRtZUVycm9yXCIpIH08L3A+XG5cdFx0XHQ8L2Rpdj5cblx0XHR9IGVsc2UgaWYgdi5IVE1MICE9IFwiXCIge1xuXHRcdFx0PGRpdiBpZD1cInByb2plY3QtcmVhZG1lXCIgY2xhc3M9XCJtYXJrZG93bi1ib2R5XCI+XG5cdFx0XHRcdEB0ZW1wbC5SYXcodi5IVE1MKVxuXHRcdFx0PC9kaXY+XG5cdFx0fVxuXHR9XG59XG5cbnRlbXBsIFByb2plY3RNZWRpYSh2aWRlb3MgW11zdHJpbmcpIHtcblx0aWYgbGVuKHZpZGVvcykgPiAwIHtcblx0XHQ8ZGl2IGNsYXNzPVwibWFya2Rvd24tYm9keVwiPlxuXHRcdFx0PGgyIGlkPVwicHJvamVjdC1tZWRpYVwiPnsgdChcInByb2plY3QubWVkaWFcIikgfTwvaDI+XG5cdFx0XHRmb3IgXywgdiA6PSByYW5nZSB2aWRlb3Mge1xuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwieW91dHViZS12aWRlb1wiPlxuXHRcdFx0XHRcdDxkaXYgY2xhc3M9XCJpZnJhbWVXcmFwcGVyXCI+XG5cdFx0XHRcdFx0XHQ8aWZyYW1lIHdpZHRoPVwiNTYwXCIgaGVpZ2h0PVwiMzQ5XCIgc3JjPXsgXCJodHRwczovL3d3dy55b3V0dWJlLmNvbS9lbWJlZC9cIiArIHYgKyBcIj9yZWw9MCZoZD0xXCIgfSB0aXRsZT1cIllvdVR1YmUgdmlkZW8gcGxheWVyXCIgYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPlxuXHRcdFx0XHRcdDwvZGl2PlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdH1cblx0XHQ8L2Rpdj5cblx0fVxufVxuXG50ZW1wbCBQcm9qZWN0RGVtbyhwIFByb2plY3QpIHtcblx0aWYgcC5EZW1vVXJsICE9IFwiXCIge1xuXHRcdDxkaXYgY2xhc3M9XCJtYXJrZG93bi1ib2R5XCI+XG5cdFx0XHQ8aDIgaWQ9XCJwcm9qZWN0LWRlbW9cIj57IGRlbW9MYWJlbChwKSB9PC9oMj5cblx0XHRcdGlmIHAuRGVtb0luc3RydWN0aW9ucyAhPSBcIlwiIHtcblx0XHRcdFx0PHA+eyBwLkRlbW9JbnN0cnVjdGlvbnMgfTwvcD5cblx0XHRcdH1cblx0XHRcdDxkaXYgY2xhc3M9eyBkZW1vV3JhcHBlckNsYXNzKHAuRGVtb0hlaWdodCkgfT5cblx0XHRcdFx0PGlmcmFtZSBpZD1cImRlbW9cIiBzcmM9eyBwLkRlbW9VcmwgfSB0aXRsZT17IHAuVGl0bGUgKyBcIiBkZW1vXCIgfSBhbGxvd2Z1bGxzY3JlZW4+PC9pZnJhbWU+XG5cdFx0XHQ8L2Rpdj5cblx0XHRcdGlmIHAuRGVtb0Z1bGxzY3JlZW4ge1xuXHRcdFx0XHQ8YnIvPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwidGV4dC1jZW50ZXJcIj5cblx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cImZ1bGxzY3JlZW5cIiBjbGFzcz1cImRvd25sb2FkLWJ0blwiIGRhdGEtYWN0aW9uPVwidG9nZ2xlLWZ1bGxzY3JlZW5cIj5cblx0XHRcdFx0XHRcdEBJY29uKFwiZXhwYW5kXCIsIFwiMXJlbVwiKVxuXHRcdFx0XHRcdFx0PHNwYW4+eyB0KFwicHJvamVjdC5mdWxsc2NyZWVuXCIpIH08L3NwYW4+XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0fVxuXHRcdDwvZGl2PlxuXHR9XG59XG5cbnRlbXBsIFByb2plY3RMaW5rcyhsaW5rcyBbXVByb2plY3RMaW5rKSB7XG5cdGlmIGxlbihsaW5rcykgPiAwIHtcblx0XHQ8ZGl2IGNsYXNzPVwibWFya2Rvd24tYm9keVwiPlxuXHRcdFx0PGgyIGlkPVwicHJvamVjdC1saW5rc1wiPnsgdChcInByb2plY3QubGlua3NcIikgfTwvaDI+XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiZG93bmxvYWQtYnV0dG9uc1wiPlxuXHRcdFx0XHRmb3IgXywgbGluayA6PSByYW5nZSBsaW5rcyB7XG5cdFx0XHRcdFx0PGEgaHJlZj17IGxpbmsuSHJlZiB9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBjbGFzcz1cImRvd25sb2FkLWJ0blwiPlxuXHRcdFx0XHRcdFx0QEljb24obGluay5JY29uLCBcIjFyZW1cIilcblx0XHRcdFx0XHRcdDxzcGFuPnsgbGluay5UaXRsZSB9PC9zcGFuPlxuXHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0fVxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdH1cbn1cblxudGVtcGwgUHJvamVjdERldGFpbCh2IFZpZXdTdGF0ZSwgY29tbWVudHNFbmFibGVkIGJvb2wpIHtcblx0aWYgdi5TdGF0dXMgPT0gTG9hZE5vdEZvdW5kIHtcblx0XHQ8ZGl2IGNsYXNzPVwiZXJyb3ItbWVzc2FnZVwiPlxuXHRcdFx0PGgxPnsgdChcImdlbmVyYWwucHJvamVjdE5vdEZvdW5kXCIpIH08L2gxPlxuXHRcdFx0PHA+eyB0KFwiZ2VuZXJhbC5wcm9qZWN0Tm90Rm91bmRNZXNzYWdlXCIpIH08L3A+XG5cdFx0PC9kaXY+XG5cdH0gZWxzZSB7XG5cdFx0PGRpdiBjbGFzcz1cInByb2plY3QtZGV0YWlsXCI+XG5cdFx0XHQ8aDEgY2xhc3M9XCJwcm9qZWN0LXRpdGxlXCI+eyB2LlByb2ouVGl0bGUgfTwvaDE+XG5cdFx0XHQ8cCBjbGFzcz1cInByb2plY3QtZGVzY3JpcHRpb25cIj57IHYuUHJvai5EZXNjcmlwdGlvbiB9PC9wPlxuXHRcdFx0aWYgbGVuKHYuUHJvai5UYWdzKSA+IDAge1xuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHJvamVjdC10YWdzXCI+XG5cdFx0XHRcdFx0Zm9yIF8sIHRhZyA6PSByYW5nZSB2LlByb2ouVGFncyB7XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cIml0ZW0tdGFnIGNsaWNrYWJsZS10YWdcIiBkYXRhLXNlYXJjaC10YWc9eyB0YWcgfT57IHRhZyB9PC9zcGFuPlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHR9XG5cdFx0XHRAVGFibGVPZkNvbnRlbnRzKHYuVE9DKVxuXHRcdFx0QFByb2plY3RSZWFkbWUodilcblx0XHRcdEBQcm9qZWN0TWVkaWEodi5Qcm9qLllvdXR1YmVWaWRlb3MpXG5cdFx0XHRAUHJvamVjdERlbW8odi5Qcm9qKVxuXHRcdFx0QFByb2plY3RMaW5rcyh2LlByb2ouTGlua3MpXG5cdFx0XHRpZiBjb21tZW50c0VuYWJsZWQge1xuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiZ2lzY3VzLWNvbnRhaW5lclwiPjwvZGl2PlxuXHRcdFx0fVxuXHRcdDwvZGl2PlxuXHR9XG59XG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwiaHRtbFwiXG5pbXBvcnQgXCJzdHJjb252XCJcbmltcG9ydCBcInN0cmluZ3NcIlxuaW1wb3J0IFwidGltZVwiXG5cbi8vIOKUgOKUgCBOYXZiYXIgaGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuYyBpc0FjdGl2ZVJvdXRlKHIgUm91dGVNYXRjaCwga2luZCBSb3V0ZSwgcGFyYW0gc3RyaW5nKSBib29sIHtcblx0cmV0dXJuIHIuS2luZCA9PSBraW5kICYmIHIuUGFyYW0gPT0gcGFyYW1cbn1cblxuLy8gY2xzIGFwcGVuZHMgZXh0cmEgdG8gYmFzZSB3aGVuIG9uIGlzIHRydWUuXG5mdW5jIGNscyhiYXNlIHN0cmluZywgb24gYm9vbCwgZXh0cmEgc3RyaW5nKSBzdHJpbmcge1xuXHRpZiAhb24ge1xuXHRcdHJldHVybiBiYXNlXG5cdH1cblx0aWYgYmFzZSA9PSBcIlwiIHtcblx0XHRyZXR1cm4gZXh0cmFcblx0fVxuXHRyZXR1cm4gYmFzZSArIFwiIFwiICsgZXh0cmFcbn1cblxuLy8g4pSA4pSAIEJsb2cgJiBwYWdpbmF0aW9uIGhlbHBlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmMgcGFnaW5hdGVkUG9zdHMoYWxsUG9zdHMgW11CbG9nUG9zdCwgcGFnZSBpbnQsIHBlclBhZ2UgaW50KSBbXUJsb2dQb3N0IHtcblx0aWYgbGVuKGFsbFBvc3RzKSA9PSAwIHtcblx0XHRyZXR1cm4gW11CbG9nUG9zdHt9XG5cdH1cblx0b2Zmc2V0IDo9IHBhZ2UgLSAxXG5cdHN0YXJ0IDo9IG9mZnNldCAqIHBlclBhZ2Vcblx0aWYgc3RhcnQgPCAwIHx8IHN0YXJ0ID49IGxlbihhbGxQb3N0cykge1xuXHRcdHN0YXJ0ID0gMFxuXHR9XG5cdGVuZCA6PSBzdGFydCArIHBlclBhZ2Vcblx0aWYgZW5kID4gbGVuKGFsbFBvc3RzKSB7XG5cdFx0ZW5kID0gbGVuKGFsbFBvc3RzKVxuXHR9XG5cdHJldHVybiBhbGxQb3N0c1tzdGFydDplbmRdXG59XG5cbmZ1bmMgY2FsY1RvdGFsUGFnZXModG90YWxDb3VudCBpbnQsIHBlclBhZ2UgaW50KSBpbnQge1xuXHRpZiBwZXJQYWdlIDw9IDAge1xuXHRcdHBlclBhZ2UgPSA1XG5cdH1cblx0bnVtIDo9IHRvdGFsQ291bnQgKyBwZXJQYWdlIC0gMVxuXHRyZXR1cm4gbnVtIC8gcGVyUGFnZVxufVxuXG4vLyBwYWdlSHJlZiByZXR1cm5zIHRoZSBjYW5vbmljYWwgVVJMIGZvciBhIGJsb2cgcGFnZTsgcGFnZSAxIGlzIC9ibG9nLlxuZnVuYyBwYWdlSHJlZihwYWdlIGludCkgc3RyaW5nIHtcblx0aWYgcGFnZSA8PSAxIHtcblx0XHRyZXR1cm4gXCIvYmxvZ1wiXG5cdH1cblx0cmV0dXJuIFwiL2Jsb2cvcGFnZS9cIiArIHN0cmNvbnYuSXRvYShwYWdlKVxufVxuXG4vLyBwYWdlTnVtYmVycyByZXR1cm5zIDEuLm4gZm9yIHRlbXBsIHJhbmdlIGxvb3BzICh0ZW1wbCBgZm9yYCBvbmx5IHN1cHBvcnRzIHJhbmdlKS5cbmZ1bmMgcGFnZU51bWJlcnMobiBpbnQpIFtdaW50IHtcblx0bnVtcyA6PSBtYWtlKFtdaW50LCAwLCBuKVxuXHRmb3IgaSA6PSAxOyBpIDw9IG47IGkrKyB7XG5cdFx0bnVtcyA9IGFwcGVuZChudW1zLCBpKVxuXHR9XG5cdHJldHVybiBudW1zXG59XG5cbi8vIOKUgOKUgCBQcm9qZWN0IGhlbHBlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmMgZGVtb0xhYmVsKHAgUHJvamVjdCkgc3RyaW5nIHtcblx0aWYgcC5EZW1vTGFiZWwgIT0gXCJcIiB7XG5cdFx0cmV0dXJuIHAuRGVtb0xhYmVsXG5cdH1cblx0cmV0dXJuIHQoXCJwcm9qZWN0LmRlbW9cIilcbn1cblxuZnVuYyBkZW1vV3JhcHBlckNsYXNzKGhlaWdodCBzdHJpbmcpIHN0cmluZyB7XG5cdGlmIGhlaWdodCAhPSBcIlwiIHtcblx0XHRyZXR1cm4gXCJkZW1vLWlmcmFtZS13cmFwcGVyXCJcblx0fVxuXHRyZXR1cm4gXCJpZnJhbWVXcmFwcGVyXCJcbn1cblxuLy8g4pSA4pSAIFNlYXJjaCBoZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jIHNlYXJjaFBsYWNlaG9sZGVyVGV4dCgpIHN0cmluZyB7XG5cdGlmIHNpdGUuU2VhcmNoLlBsYWNlaG9sZGVyICE9IFwiXCIge1xuXHRcdHJldHVybiBzaXRlLlNlYXJjaC5QbGFjZWhvbGRlclxuXHR9XG5cdGlmIHJlcyA6PSB0KFwic2VhcmNoLnBsYWNlaG9sZGVyXCIpOyByZXMgIT0gXCJzZWFyY2gucGxhY2Vob2xkZXJcIiB7XG5cdFx0cmV0dXJuIHJlc1xuXHR9XG5cdHJldHVybiBcIlNlYXJjaC4uLlwiXG59XG5cbi8vIGhpZ2hsaWdodE1hdGNoIHdyYXBzIHRoZSBmaXJzdCBjYXNlLWluc2Vuc2l0aXZlIG9jY3VycmVuY2Ugb2YgcXVlcnkgaW4gPG1hcms+OyBhbGwgdGV4dCBpcyBlc2NhcGVkLlxuZnVuYyBoaWdobGlnaHRNYXRjaCh0ZXh0IHN0cmluZywgcXVlcnkgc3RyaW5nKSBzdHJpbmcge1xuXHRpZiBxdWVyeSAhPSBcIlwiIHtcblx0XHRpZiBpZHggOj0gc3RyaW5ncy5JbmRleChzdHJpbmdzLlRvTG93ZXIodGV4dCksIHN0cmluZ3MuVG9Mb3dlcihxdWVyeSkpOyBpZHggIT0gLTEge1xuXHRcdFx0ZW5kIDo9IGlkeCArIGxlbihxdWVyeSlcblx0XHRcdHJldHVybiBodG1sLkVzY2FwZVN0cmluZyh0ZXh0WzppZHhdKSArIFwiPG1hcms+XCIgKyBodG1sLkVzY2FwZVN0cmluZyh0ZXh0W2lkeDplbmRdKSArIFwiPC9tYXJrPlwiICsgaHRtbC5Fc2NhcGVTdHJpbmcodGV4dFtlbmQ6XSlcblx0XHR9XG5cdH1cblx0cmV0dXJuIGh0bWwuRXNjYXBlU3RyaW5nKHRleHQpXG59XG5cbi8vIOKUgOKUgCBDb250YWN0IGhlbHBlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmMgZm9ybVN0YXR1c0NsYXNzKHN0YXR1c1R5cGUgc3RyaW5nKSBzdHJpbmcge1xuXHRpZiBzdGF0dXNUeXBlICE9IFwiXCIge1xuXHRcdHJldHVybiBcImZvcm0tc3RhdHVzIFwiICsgc3RhdHVzVHlwZVxuXHR9XG5cdHJldHVybiBcImZvcm0tc3RhdHVzXCJcbn1cblxuLy8g4pSA4pSAIEZvb3RlciBoZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jIGN1cnJlbnRZZWFyKCkgaW50IHtcblx0cmV0dXJuIHRpbWUuTm93KCkuWWVhcigpXG59XG5cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJqczouL2Jyb3dzZXIuZC50c1wiXG5pbXBvcnQgXCJzdHJjb252XCJcbmltcG9ydCBcInN0cmluZ3NcIlxuaW1wb3J0IFwidGltZVwiXG5cbnZhciBjdXJyZW50UGF0aCBzdHJpbmdcblxuZnVuYyBzY3JvbGxUb0hhc2goaGFzaCBzdHJpbmcsIHNtb290aCBib29sKSB7XG5cdGlmIGhhc2ggPT0gXCJcIiB7XG5cdFx0cmV0dXJuXG5cdH1cblx0aWQgOj0gc3RyaW5ncy5UcmltUHJlZml4KGhhc2gsIFwiI1wiKVxuXHRpZiBpZCA9PSBcIlwiIHtcblx0XHRyZXR1cm5cblx0fVxuXHRzY3JvbGwgOj0gZnVuYygpIHtcblx0XHR0YXJnZXRFbCA6PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcblx0XHRpZiB0YXJnZXRFbCAhPSBuaWwge1xuXHRcdFx0YmVoYXZpb3IgOj0gXCJpbnN0YW50XCJcblx0XHRcdGlmIHNtb290aCB7XG5cdFx0XHRcdGJlaGF2aW9yID0gXCJzbW9vdGhcIlxuXHRcdFx0fVxuXHRcdFx0dGFyZ2V0RWwuc2Nyb2xsSW50b1ZpZXcobWFwW3N0cmluZ11hbnl7XCJiZWhhdmlvclwiOiBiZWhhdmlvcn0pXG5cdFx0XHRpZiBpZCA9PSBcIm1haW4tY29udGVudFwiIHtcblx0XHRcdFx0dGFyZ2V0RWwuc2V0QXR0cmlidXRlKFwidGFiaW5kZXhcIiwgXCItMVwiKVxuXHRcdFx0XHR0YXJnZXRFbC5mb2N1cyhtYXBbc3RyaW5nXWFueXtcInByZXZlbnRTY3JvbGxcIjogdHJ1ZX0pXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHNjcm9sbCgpXG5cdGlmICFzbW9vdGgge1xuXHRcdHNldFRpbWVvdXQoc2Nyb2xsLCA1MClcblx0fVxufVxuXG5mdW5jIG5hdmlnYXRlKHVybCBzdHJpbmcpIHtcblx0Y3VyciA6PSBzdHJpbmcod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKVxuXHRpZiB3aW5kb3cubG9jYXRpb24uaGFzaCAhPSBuaWwgJiYgd2luZG93LmxvY2F0aW9uLmhhc2ggIT0gXCJcIiB7XG5cdFx0Y3VyciArPSBzdHJpbmcod2luZG93LmxvY2F0aW9uLmhhc2gpXG5cdH1cblx0aWYgdXJsICE9IGN1cnIge1xuXHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShtYXBbc3RyaW5nXWFueXt9LCBcIlwiLCB1cmwpXG5cdH1cblx0aGFuZGxlUm91dGUoKVxufVxuXG4vLyBwYXJzZVJvdXRlIG1hcHMgYSBVUkwgcGF0aCB0byBhIFJvdXRlTWF0Y2guIFVua25vd24gcGF0aHMgcmVzb2x2ZSB0byBSb3V0ZU5vdEZvdW5kLlxuZnVuYyBwYXJzZVJvdXRlKHBhdGggc3RyaW5nKSBSb3V0ZU1hdGNoIHtcblx0aWYgbGVuKHBhdGgpID4gMSB7XG5cdFx0cGF0aCA9IHN0cmluZ3MuVHJpbVN1ZmZpeChwYXRoLCBcIi9cIilcblx0fVxuXHRpZiBwYXRoID09IFwiXCIgfHwgcGF0aCA9PSBcIi9cIiB8fCBwYXRoID09IFwiL2Jsb2dcIiB7XG5cdFx0cmV0dXJuIFJvdXRlTWF0Y2h7S2luZDogUm91dGVCbG9nLCBQYWdlOiAxfVxuXHR9XG5cdGlmIHJlc3QsIG9rIDo9IHN0cmluZ3MuQ3V0UHJlZml4KHBhdGgsIFwiL2Jsb2cvcGFnZS9cIik7IG9rIHtcblx0XHRuLCBlcnIgOj0gc3RyY29udi5BdG9pKHJlc3QpXG5cdFx0aWYgZXJyICE9IG5pbCB8fCBuIDwgMSB7XG5cdFx0XHRuID0gMVxuXHRcdH1cblx0XHRyZXR1cm4gUm91dGVNYXRjaHtLaW5kOiBSb3V0ZUJsb2csIFBhZ2U6IG59XG5cdH1cblx0aWYgc2x1Zywgb2sgOj0gc3RyaW5ncy5DdXRQcmVmaXgocGF0aCwgXCIvYmxvZy9cIik7IG9rIHtcblx0XHRzbHVnID0gc3RyaW5ncy5UcmltUHJlZml4KHNsdWcsIFwicG9zdC9cIilcblx0XHRpZiBzbHVnID09IFwiXCIge1xuXHRcdFx0cmV0dXJuIFJvdXRlTWF0Y2h7S2luZDogUm91dGVOb3RGb3VuZH1cblx0XHR9XG5cdFx0cmV0dXJuIFJvdXRlTWF0Y2h7S2luZDogUm91dGVQb3N0LCBQYXJhbTogc2x1Z31cblx0fVxuXHRpZiBpZCwgb2sgOj0gc3RyaW5ncy5DdXRQcmVmaXgocGF0aCwgXCIvcHJvamVjdC9cIik7IG9rIHtcblx0XHRpZiBpZCA9PSBcIlwiIHtcblx0XHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlTm90Rm91bmR9XG5cdFx0fVxuXHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlUHJvamVjdCwgUGFyYW06IGlkfVxuXHR9XG5cdGlmIGlkLCBvayA6PSBzdHJpbmdzLkN1dFByZWZpeChwYXRoLCBcIi9wYWdlL1wiKTsgb2sge1xuXHRcdGlmIGlkID09IFwiXCIge1xuXHRcdFx0cmV0dXJuIFJvdXRlTWF0Y2h7S2luZDogUm91dGVOb3RGb3VuZH1cblx0XHR9XG5cdFx0cmV0dXJuIFJvdXRlTWF0Y2h7S2luZDogUm91dGVQYWdlLCBQYXJhbTogaWR9XG5cdH1cblx0cmV0dXJuIFJvdXRlTWF0Y2h7S2luZDogUm91dGVOb3RGb3VuZH1cbn1cblxuZnVuYyBpbml0SW5pdGlhbFJvdXRlKCkge1xuXHRwYXRoIDo9IHN0clZhbCh3aW5kb3cubG9jYXRpb24ucGF0aG5hbWUpXG5cdGN1cnJlbnRQYXRoID0gcGF0aFxuXHRyb3V0ZSA9IHBhcnNlUm91dGUocGF0aClcblx0c3dpdGNoIHJvdXRlLktpbmQge1xuXHRjYXNlIFJvdXRlUG9zdDpcblx0XHR2aWV3LCBfID0gcmVzb2x2ZVBvc3Qocm91dGUuUGFyYW0sIHBvc3RzLCBjb250ZW50Q2FjaGUpXG5cdGNhc2UgUm91dGVQcm9qZWN0OlxuXHRcdHZpZXcsIF8gPSByZXNvbHZlUHJvamVjdChyb3V0ZS5QYXJhbSwgcHJvamVjdHMsIGNvbnRlbnRDYWNoZSlcblx0Y2FzZSBSb3V0ZVBhZ2U6XG5cdFx0dmlldywgXyA9IHJlc29sdmVQYWdlKHJvdXRlLlBhcmFtLCBuYXZQYWdlcywgY29udGVudENhY2hlKVxuXHRkZWZhdWx0OlxuXHRcdHZpZXcgPSBuZXdWaWV3U3RhdGUoKVxuXHR9XG59XG5cbnZhciBpc0luaXRpYWxSb3V0ZSA9IHRydWVcblxuLy8gcm91dGVTZXEgaXMgYnVtcGVkIG9uIGV2ZXJ5IG5hdmlnYXRpb24gc28gYW4gaW4tZmxpZ2h0IGxvYWRlciBjYW4gdGVsbCBpdFxuLy8gaGFzIGJlZW4gc3VwZXJzZWRlZCBhbmQgbXVzdCBub3QgdG91Y2ggYHZpZXdgLlxudmFyIHJvdXRlU2VxIGludFxuXG4vLyBiZWdpbk5hdmlnYXRpb24gY2xhaW1zIHRoZSBuZXh0IHJvdXRlU2VxIGFuZCByZXR1cm5zIGEgY2hlY2sgdGhhdCByZXBvcnRzXG4vLyB3aGV0aGVyIHRoYXQgbmF2aWdhdGlvbiBpcyBzdGlsbCB0aGUgbGF0ZXN0IG9uZS5cbmZ1bmMgYmVnaW5OYXZpZ2F0aW9uKCkgZnVuYygpIGJvb2wge1xuXHRyb3V0ZVNlcSsrXG5cdHNlcSA6PSByb3V0ZVNlcVxuXHRyZXR1cm4gZnVuYygpIGJvb2wgeyByZXR1cm4gc2VxID09IHJvdXRlU2VxIH1cbn1cblxuYXN5bmMgZnVuYyBoYW5kbGVSb3V0ZSgpIHtcblx0aXNDdXJyZW50IDo9IGJlZ2luTmF2aWdhdGlvbigpXG5cdHJlc2V0T3ZlcmxheXMoKVxuXG5cdC8vIEdpdEh1YiBQYWdlcyBzZXJ2ZXMgNDA0Lmh0bWwgKGEgY29weSBvZiB0aGUgYXBwIHNoZWxsKSBhdCB0aGUgb3JpZ2luYWwgVVJMLFxuXHQvLyBzbyB1bmtub3duIGRlZXAgbGlua3MgYXJyaXZlIGhlcmUgd2l0aCB0aGVpciByZWFsIHBhdGhuYW1lIGludGFjdC5cblx0cGF0aCA6PSB3aW5kb3cubG9jYXRpb24ucGF0aG5hbWVcblxuXHRpZiAhaXNJbml0aWFsUm91dGUge1xuXHRcdG1haW5FbCA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI21haW4tY29udGVudFwiKVxuXHRcdGlmIG1haW5FbCAhPSBuaWwge1xuXHRcdFx0bWFpbkVsLmNsYXNzTGlzdC5hZGQoXCJwYWdlLXRyYW5zaXRpb24tb3V0XCIpXG5cdFx0XHR0aW1lLlNsZWVwKDIwMCAqIHRpbWUuTWlsbGlzZWNvbmQpXG5cdFx0fVxuXHR9XG5cdGlzSW5pdGlhbFJvdXRlID0gZmFsc2VcblxuXHQvLyBBIG5hdmlnYXRpb24gdGhhdCBzdGFydGVkIGR1cmluZyB0aGUgZmFkZSBvd25zIHRoZSB2aWV3IGZyb20gaGVyZSBvbi5cblx0aWYgIWlzQ3VycmVudCgpIHtcblx0XHRyZXR1cm5cblx0fVxuXG5cdGN1cnJlbnRQYXRoID0gcGF0aFxuXHRyb3V0ZSA9IHBhcnNlUm91dGUocGF0aClcblx0dmlldyA9IG5ld1ZpZXdTdGF0ZSgpXG5cblx0Ly8gUmVzZXQgc2Nyb2xsIHdoaWxlIHRoZSBvbGQgY29udGVudCBpcyBmYWRlZCBvdXQsIHNvIHRoZSBuZXcgcm91dGUgcGFpbnRzIGF0IHRoZSB0b3AuXG5cdHdpbmRvdy5zY3JvbGxUbyhtYXBbc3RyaW5nXWFueXtcInRvcFwiOiAwLCBcImxlZnRcIjogMCwgXCJiZWhhdmlvclwiOiBcImluc3RhbnRcIn0pXG5cdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zY3JvbGxUb3AgPSAwXG5cdGRvY3VtZW50LmJvZHkuc2Nyb2xsVG9wID0gMFxuXG5cdHN3aXRjaCByb3V0ZS5LaW5kIHtcblx0Y2FzZSBSb3V0ZVBvc3Q6XG5cdFx0YXdhaXQgc2hvd1Bvc3Qocm91dGUuUGFyYW0pXG5cdGNhc2UgUm91dGVQcm9qZWN0OlxuXHRcdGF3YWl0IHNob3dQcm9qZWN0KHJvdXRlLlBhcmFtKVxuXHRjYXNlIFJvdXRlUGFnZTpcblx0XHRhd2FpdCBzaG93UGFnZShyb3V0ZS5QYXJhbSlcblx0Y2FzZSBSb3V0ZU5vdEZvdW5kOlxuXHRcdHNob3dOb3RGb3VuZCgpXG5cdGRlZmF1bHQ6XG5cdFx0c2hvd0Jsb2cocm91dGUuUGFnZSlcblx0fVxuXG5cdC8vIFRoZSBsb2FkZXIgbWF5IGhhdmUgYXdhaXRlZCBhIGZldGNoIHdoaWxlIGEgbmV3ZXIgbmF2aWdhdGlvbiB0b29rIG92ZXIuXG5cdGlmICFpc0N1cnJlbnQoKSB7XG5cdFx0cmV0dXJuXG5cdH1cblxuXHRtYWluRWwgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLWNvbnRlbnRcIilcblx0aWYgbWFpbkVsICE9IG5pbCB7XG5cdFx0bWFpbkVsLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIilcblx0XHRtYWluRWwuZm9jdXMobWFwW3N0cmluZ11hbnl7XCJwcmV2ZW50U2Nyb2xsXCI6IHRydWV9KVxuXHRcdHNldFRpbWVvdXQoZnVuYygpIHtcblx0XHRcdG1haW5FbC5yZW1vdmVBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiKVxuXHRcdH0sIDEwMClcblx0fVxuXG5cdGhhc2ggOj0gc3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuXHRpZiBoYXNoICE9IFwiXCIge1xuXHRcdHNjcm9sbFRvSGFzaChoYXNoLCBmYWxzZSlcblx0fVxufVxuXG5mdW5jIHNob3dCbG9nKHBhZ2UgaW50KSB7XG5cdHRpdGxlIDo9IHNpdGUuVGl0bGVcblx0Y2Fub25pY2FsIDo9IFwiL2Jsb2dcIlxuXHRpZiBwYWdlID4gMSB7XG5cdFx0dGl0bGUgPSB0KFwibmF2LmJsb2dcIikgKyBcIiAtIFwiICsgc2l0ZS5UaXRsZVxuXHRcdGNhbm9uaWNhbCA9IFwiL2Jsb2cvcGFnZS9cIiArIHN0cmNvbnYuSXRvYShwYWdlKVxuXHR9XG5cdHVwZGF0ZVJvdXRlTWV0YSh0aXRsZSwgc2l0ZS5EZXNjcmlwdGlvbiwgY2Fub25pY2FsKVxuXHRyZW5kZXJSb3V0ZSgpXG59XG5cbmZ1bmMgc2hvd05vdEZvdW5kKCkge1xuXHR1cGRhdGVSb3V0ZU1ldGEodChcImdlbmVyYWwubm90Rm91bmRcIikrXCIgLSBcIitzaXRlLlRpdGxlLCB0KFwiZ2VuZXJhbC5ub3RGb3VuZE1lc3NhZ2VcIiksIGN1cnJlbnRQYXRoKVxuXHRyZW5kZXJSb3V0ZSgpXG59XG5cbi8vIGxvYWRSb3V0ZSBmZXRjaGVzIHVybCwgcmVuZGVycyBpdCB3aXRoIHRyYW5zZm9ybSBhbmQgY2FjaGVzIHRoZSByZXN1bHQgdW5kZXJcbi8vIGtleS4gSXQgcmVwb3J0cyB3aGV0aGVyIHRoZSByb3V0ZSBpcyBzdGlsbCBjdXJyZW50OyB3aGVuIHN1cGVyc2VkZWQgYnkgYVxuLy8gbmV3ZXIgbmF2aWdhdGlvbiB0aGUgY2FjaGUgaXMgZmlsbGVkIGJ1dCB2aWV3IGlzIGxlZnQgdW50b3VjaGVkLlxuYXN5bmMgZnVuYyBsb2FkUm91dGUoa2V5IHN0cmluZywgdXJsIHN0cmluZywgdHJhbnNmb3JtIGZ1bmMoc3RyaW5nKSBjYWNoZWRDb250ZW50KSBib29sIHtcblx0c2VxIDo9IHJvdXRlU2VxXG5cdG1kVGV4dCwgZXJyIDo9IGF3YWl0IGxvYWRNYXJrZG93bkZpbGUodXJsKVxuXHRpZiBlcnIgPT0gbmlsIHtcblx0XHRjb250ZW50Q2FjaGVba2V5XSA9IHRyYW5zZm9ybShtZFRleHQpXG5cdH1cblx0aWYgc2VxICE9IHJvdXRlU2VxIHtcblx0XHRyZXR1cm4gZmFsc2Vcblx0fVxuXHRpZiBlcnIgIT0gbmlsIHtcblx0XHR2aWV3LlN0YXR1cyA9IExvYWRGYWlsZWRcblx0XHRyZXR1cm4gdHJ1ZVxuXHR9XG5cdGMgOj0gY29udGVudENhY2hlW2tleV1cblx0dmlldy5IVE1MID0gYy5IVE1MXG5cdHZpZXcuVE9DID0gYy5UT0Ncblx0dmlldy5TdGF0dXMgPSBMb2FkUmVhZHlcblx0cmV0dXJuIHRydWVcbn1cblxuLy8gcmVuZGVyUG9zdCB0dXJucyBhIGJsb2cgbWFya2Rvd24gZmlsZSBpbnRvIGNhY2hlZCBjb250ZW50LlxuZnVuYyByZW5kZXJQb3N0KG1kVGV4dCBzdHJpbmcpIGNhY2hlZENvbnRlbnQge1xuXHRjb250ZW50IDo9IHN0cmlwRnJvbnRtYXR0ZXIobWRUZXh0KVxuXHR0b2MgOj0gZXh0cmFjdFRPQyhjb250ZW50KVxuXHRyZXR1cm4gY2FjaGVkQ29udGVudHtIVE1MOiBpbmplY3RIZWFkaW5nSURzKHBhcnNlTWFya2Rvd24oY29udGVudCksIHRvYyksIFRPQzogdG9jfVxufVxuXG4vLyByZW5kZXJSZWFkbWUgdHVybnMgYSBwcm9qZWN0IFJFQURNRSBpbnRvIGNhY2hlZCBjb250ZW50IHdob3NlIFRPQyBhbHNvXG4vLyBjb3ZlcnMgdGhlIE1lZGlhL0RlbW8vTGlua3Mgc2VjdGlvbnMuXG5mdW5jIHJlbmRlclJlYWRtZShwIFByb2plY3QpIGZ1bmMoc3RyaW5nKSBjYWNoZWRDb250ZW50IHtcblx0cmV0dXJuIGZ1bmMobWRUZXh0IHN0cmluZykgY2FjaGVkQ29udGVudCB7XG5cdFx0cmV0dXJuIGNhY2hlZENvbnRlbnR7XG5cdFx0XHRIVE1MOiBpbmplY3RIZWFkaW5nSURzKHBhcnNlTWFya2Rvd24obWRUZXh0KSwgZXh0cmFjdFRPQyhtZFRleHQpKSxcblx0XHRcdFRPQzogIGV4dHJhY3RQcm9qZWN0VE9DKG1kVGV4dCwgcCksXG5cdFx0fVxuXHR9XG59XG5cbmZ1bmMgcmVuZGVyUGFnZShtZFRleHQgc3RyaW5nKSBjYWNoZWRDb250ZW50IHtcblx0cmV0dXJuIGNhY2hlZENvbnRlbnR7SFRNTDogcGFyc2VNYXJrZG93bihtZFRleHQpLCBUT0M6IFtdVE9DSXRlbXt9fVxufVxuXG5hc3luYyBmdW5jIHNob3dQb3N0KHNsdWcgc3RyaW5nKSB7XG5cdHYsIG5lZWRzRmV0Y2ggOj0gcmVzb2x2ZVBvc3Qoc2x1ZywgcG9zdHMsIGNvbnRlbnRDYWNoZSlcblx0dmlldyA9IHZcblx0aWYgdmlldy5TdGF0dXMgPT0gTG9hZE5vdEZvdW5kIHtcblx0XHR1cGRhdGVSb3V0ZU1ldGEodChcImdlbmVyYWwuYmxvZ05vdEZvdW5kXCIpK1wiIC0gXCIrc2l0ZS5UaXRsZSwgdChcImdlbmVyYWwuYmxvZ05vdEZvdW5kTWVzc2FnZVwiKSwgXCIvYmxvZy9cIitzbHVnKVxuXHRcdHJlbmRlclJvdXRlKClcblx0XHRyZXR1cm5cblx0fVxuXG5cdHVwZGF0ZVJvdXRlTWV0YSh2aWV3LlBvc3QuVGl0bGUrXCIgLSBcIitzaXRlLlRpdGxlLCB2aWV3LlBvc3QuRXhjZXJwdCwgdmlldy5Qb3N0LkhyZWYpXG5cdGlmIG5lZWRzRmV0Y2gge1xuXHRcdGlmICFhd2FpdCBsb2FkUm91dGUodmlldy5Qb3N0LkhyZWYsIFwiL2RhdGEvYmxvZy9cIit2aWV3LlBvc3QuRmlsZW5hbWUsIHJlbmRlclBvc3QpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblx0fVxuXHRyZW5kZXJSb3V0ZSgpXG5cdGlmIHZpZXcuU3RhdHVzICE9IExvYWRSZWFkeSB7XG5cdFx0cmV0dXJuXG5cdH1cblx0aGlnaGxpZ2h0Q29kZSgpXG5cdGxvYWRHaXNjdXMoKVxufVxuXG5hc3luYyBmdW5jIHNob3dQcm9qZWN0KGlkIHN0cmluZykge1xuXHR2LCBuZWVkc0ZldGNoIDo9IHJlc29sdmVQcm9qZWN0KGlkLCBwcm9qZWN0cywgY29udGVudENhY2hlKVxuXHR2aWV3ID0gdlxuXHRpZiB2aWV3LlN0YXR1cyA9PSBMb2FkTm90Rm91bmQge1xuXHRcdHVwZGF0ZVJvdXRlTWV0YSh0KFwiZ2VuZXJhbC5wcm9qZWN0Tm90Rm91bmRcIikrXCIgLSBcIitzaXRlLlRpdGxlLCB0KFwiZ2VuZXJhbC5wcm9qZWN0Tm90Rm91bmRNZXNzYWdlXCIpLCBcIi9wcm9qZWN0L1wiK2lkKVxuXHRcdHJlbmRlclJvdXRlKClcblx0XHRyZXR1cm5cblx0fVxuXG5cdHVwZGF0ZVJvdXRlTWV0YSh2aWV3LlByb2ouVGl0bGUrXCIgLSBcIitzaXRlLlRpdGxlLCB2aWV3LlByb2ouRGVzY3JpcHRpb24sIHZpZXcuUHJvai5IcmVmKVxuXHRpZiBuZWVkc0ZldGNoIHtcblx0XHRpZiAhYXdhaXQgbG9hZFJvdXRlKHZpZXcuUHJvai5IcmVmLCByZWFkbWVVUkwodmlldy5Qcm9qLCBzaXRlLkdpdGh1YlVzZXJuYW1lKSwgcmVuZGVyUmVhZG1lKHZpZXcuUHJvaikpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblx0fVxuXHRyZW5kZXJSb3V0ZSgpXG5cdGhpZ2hsaWdodENvZGUoKVxuXHRsb2FkR2lzY3VzKClcbn1cblxuYXN5bmMgZnVuYyBzaG93UGFnZShpZCBzdHJpbmcpIHtcblx0diwgbmVlZHNGZXRjaCA6PSByZXNvbHZlUGFnZShpZCwgbmF2UGFnZXMsIGNvbnRlbnRDYWNoZSlcblx0dmlldyA9IHZcblx0dXBkYXRlUm91dGVNZXRhKHZpZXcuUGFnZS5UaXRsZStcIiAtIFwiK3NpdGUuVGl0bGUsIHNpdGUuRGVzY3JpcHRpb24sIHZpZXcuUGFnZS5IcmVmKVxuXHRpZiBuZWVkc0ZldGNoIHtcblx0XHRpZiAhYXdhaXQgbG9hZFJvdXRlKHZpZXcuUGFnZS5IcmVmLCBcIi9kYXRhL3BhZ2VzL1wiK2lkK1wiLm1kXCIsIHJlbmRlclBhZ2UpIHtcblx0XHRcdHJldHVyblxuXHRcdH1cblx0fVxuXHRyZW5kZXJSb3V0ZSgpXG5cdGhpZ2hsaWdodENvZGUoKVxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImpzOi4vYnJvd3Nlci5kLnRzXCJcbmltcG9ydCBcInN0cmluZ3NcIlxuXG52YXIgZnVzZUluc3RhbmNlIGFueVxudmFyIHNlYXJjaERlYm91bmNlVGltZXIgYW55XG5cbmZ1bmMgaW5pdFNlYXJjaCgpIHtcblx0dmFyIHNlYXJjaEl0ZW1zIFtdYW55XG5cblx0Ly8gSW5kZXggcHJvamVjdHNcblx0Zm9yIF8sIHAgOj0gcmFuZ2UgcHJvamVjdHMge1xuXHRcdGl0ZW0gOj0gbWFwW3N0cmluZ11hbnl7XG5cdFx0XHRcImlkXCI6ICAgICAgICAgIHAuSUQsXG5cdFx0XHRcInRpdGxlXCI6ICAgICAgIHAuVGl0bGUsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IHAuRGVzY3JpcHRpb24sXG5cdFx0XHRcInRhZ3NcIjogICAgICAgIHAuVGFncyxcblx0XHRcdFwidHlwZVwiOiAgICAgICAgXCJwcm9qZWN0XCIsXG5cdFx0XHRcInVybFwiOiAgICAgICAgIHAuSHJlZixcblx0XHR9XG5cdFx0c2VhcmNoSXRlbXMgPSBhcHBlbmQoc2VhcmNoSXRlbXMsIGl0ZW0pXG5cdH1cblxuXHQvLyBJbmRleCBibG9nIHBvc3RzXG5cdGZvciBfLCBwIDo9IHJhbmdlIHBvc3RzIHtcblx0XHRpdGVtIDo9IG1hcFtzdHJpbmddYW55e1xuXHRcdFx0XCJpZFwiOiAgICAgICAgICBwLlNsdWcsXG5cdFx0XHRcInRpdGxlXCI6ICAgICAgIHAuVGl0bGUsXG5cdFx0XHRcImRlc2NyaXB0aW9uXCI6IHAuRXhjZXJwdCxcblx0XHRcdFwidGFnc1wiOiAgICAgICAgcC5UYWdzLFxuXHRcdFx0XCJ0eXBlXCI6ICAgICAgICBcImJsb2dcIixcblx0XHRcdFwidXJsXCI6ICAgICAgICAgcC5IcmVmLFxuXHRcdH1cblx0XHRzZWFyY2hJdGVtcyA9IGFwcGVuZChzZWFyY2hJdGVtcywgaXRlbSlcblx0fVxuXG5cdG9wdGlvbnMgOj0gbWFwW3N0cmluZ11hbnl7XG5cdFx0XCJrZXlzXCI6IFtdYW55e1xuXHRcdFx0bWFwW3N0cmluZ11hbnl7XCJuYW1lXCI6IFwidGl0bGVcIiwgXCJ3ZWlnaHRcIjogMC40fSxcblx0XHRcdG1hcFtzdHJpbmddYW55e1wibmFtZVwiOiBcImRlc2NyaXB0aW9uXCIsIFwid2VpZ2h0XCI6IDAuM30sXG5cdFx0XHRtYXBbc3RyaW5nXWFueXtcIm5hbWVcIjogXCJ0YWdzXCIsIFwid2VpZ2h0XCI6IDAuMn0sXG5cdFx0fSxcblx0XHRcInRocmVzaG9sZFwiOiAgICAgICAgICAwLjQsXG5cdFx0XCJtaW5NYXRjaENoYXJMZW5ndGhcIjogc2VhcmNoTWluQ2hhcnMoKSxcblx0fVxuXG5cdC8vIEdvIGhhcyBubyBgbmV3YDsgRnVzZSBpcyBhIGNsYXNzIGV4cG9zZWQgb24gd2luZG93IGJ5IHZlbmRvci5qc1xuXHRmdXNlSW5zdGFuY2UgPSBSZWZsZWN0LmNvbnN0cnVjdCh3aW5kb3cuRnVzZSwgW11hbnl7c2VhcmNoSXRlbXMsIG9wdGlvbnN9KVxufVxuXG5mdW5jIHNlYXJjaE1pbkNoYXJzKCkgaW50IHtcblx0aWYgc2l0ZS5TZWFyY2guTWluQ2hhcnMgPiAwIHtcblx0XHRyZXR1cm4gc2l0ZS5TZWFyY2guTWluQ2hhcnNcblx0fVxuXHRyZXR1cm4gMlxufVxuXG5mdW5jIHBlcmZvcm1TZWFyY2gocSBzdHJpbmcpIFtdU2VhcmNoUmVzdWx0SXRlbSB7XG5cdHRyaW1tZWQgOj0gc3RyaW5ncy5UcmltU3BhY2UocSlcblx0aWYgbGVuKHRyaW1tZWQpIDwgc2VhcmNoTWluQ2hhcnMoKSB8fCBmdXNlSW5zdGFuY2UgPT0gbmlsIHtcblx0XHRyZXR1cm4gW11TZWFyY2hSZXN1bHRJdGVte31cblx0fVxuXG5cdHJlc3VsdHMgOj0gZnVzZUluc3RhbmNlLnNlYXJjaCh0cmltbWVkKVxuXHRvdXQgOj0gW11TZWFyY2hSZXN1bHRJdGVte31cblx0bWF4UmVzdWx0cyA6PSA4XG5cdGlmIGxlbihyZXN1bHRzKSA8IG1heFJlc3VsdHMge1xuXHRcdG1heFJlc3VsdHMgPSBsZW4ocmVzdWx0cylcblx0fVxuXG5cdGZvciBpIDo9IDA7IGkgPCBtYXhSZXN1bHRzOyBpKysge1xuXHRcdHJhd0l0ZW0gOj0gcmVzdWx0c1tpXS5pdGVtXG5cdFx0dGFncyA6PSBbXXN0cmluZ3t9XG5cdFx0aWYgcmF3SXRlbS50YWdzICE9IG5pbCB7XG5cdFx0XHRmb3IgXywgdCA6PSByYW5nZSByYXdJdGVtLnRhZ3Mge1xuXHRcdFx0XHR0YWdzID0gYXBwZW5kKHRhZ3MsIHN0cmluZyh0KSlcblx0XHRcdH1cblx0XHR9XG5cblx0XHRvdXQgPSBhcHBlbmQob3V0LCBTZWFyY2hSZXN1bHRJdGVte1xuXHRcdFx0SUQ6ICAgICAgICAgIHN0cmluZyhyYXdJdGVtLmlkKSxcblx0XHRcdFRpdGxlOiAgICAgICBzdHJpbmcocmF3SXRlbS50aXRsZSksXG5cdFx0XHREZXNjcmlwdGlvbjogc3RyaW5nKHJhd0l0ZW0uZGVzY3JpcHRpb24pLFxuXHRcdFx0VGFnczogICAgICAgIHRhZ3MsXG5cdFx0XHRJdGVtVHlwZTogICAgc3RyaW5nKHJhd0l0ZW0udHlwZSksXG5cdFx0XHRVcmw6ICAgICAgICAgc3RyaW5nKHJhd0l0ZW0udXJsKSxcblx0XHR9KVxuXHR9XG5cblx0cmV0dXJuIG91dFxufVxuXG52YXIgc2VhcmNoU2VsZWN0ZWRJbmRleCA9IC0xXG5cbmZ1bmMgc2Nyb2xsU2VsZWN0ZWRTZWFyY2hSZXN1bHRJbnRvVmlldygpIHtcblx0ZWwgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zZWFyY2gtcmVzdWx0LWl0ZW0uc2VsZWN0ZWRcIilcblx0aWYgZWwgIT0gbmlsIHtcblx0XHRlbC5zY3JvbGxJbnRvVmlldyhtYXBbc3RyaW5nXWFueXtcImJsb2NrXCI6IFwibmVhcmVzdFwiLCBcImJlaGF2aW9yXCI6IFwic21vb3RoXCJ9KVxuXHR9XG59XG5cbmZ1bmMgc2VhcmNoU2VsZWN0TmV4dCgpIHtcblx0aWYgbGVuKHNlYXJjaFJlc3VsdHMpID09IDAge1xuXHRcdHJldHVyblxuXHR9XG5cdHNlYXJjaFNlbGVjdGVkSW5kZXgrK1xuXHRpZiBzZWFyY2hTZWxlY3RlZEluZGV4ID49IGxlbihzZWFyY2hSZXN1bHRzKSB7XG5cdFx0c2VhcmNoU2VsZWN0ZWRJbmRleCA9IDBcblx0fVxuXHRyZW5kZXJTZWFyY2hSZXN1bHRzKClcblx0c2Nyb2xsU2VsZWN0ZWRTZWFyY2hSZXN1bHRJbnRvVmlldygpXG59XG5cbmZ1bmMgc2VhcmNoU2VsZWN0UHJldigpIHtcblx0aWYgbGVuKHNlYXJjaFJlc3VsdHMpID09IDAge1xuXHRcdHJldHVyblxuXHR9XG5cdHNlYXJjaFNlbGVjdGVkSW5kZXgtLVxuXHRpZiBzZWFyY2hTZWxlY3RlZEluZGV4IDwgMCB7XG5cdFx0c2VhcmNoU2VsZWN0ZWRJbmRleCA9IGxlbihzZWFyY2hSZXN1bHRzKSAtIDFcblx0fVxuXHRyZW5kZXJTZWFyY2hSZXN1bHRzKClcblx0c2Nyb2xsU2VsZWN0ZWRTZWFyY2hSZXN1bHRJbnRvVmlldygpXG59XG5cbmZ1bmMgc2VhcmNoSGFzU2VsZWN0aW9uKCkgYm9vbCB7XG5cdHJldHVybiBzZWFyY2hTZWxlY3RlZEluZGV4ID49IDAgJiYgc2VhcmNoU2VsZWN0ZWRJbmRleCA8IGxlbihzZWFyY2hSZXN1bHRzKVxufVxuXG5mdW5jIHNlYXJjaE9wZW5TZWxlY3RlZCgpIHtcblx0aWYgc2VhcmNoSGFzU2VsZWN0aW9uKCkge1xuXHRcdHVybCA6PSBzZWFyY2hSZXN1bHRzW3NlYXJjaFNlbGVjdGVkSW5kZXhdLlVybFxuXHRcdGNsb3NlU2VhcmNoKClcblx0XHRuYXZpZ2F0ZSh1cmwpXG5cdH1cbn1cblxuZnVuYyByZW5kZXJTZWFyY2hSZXN1bHRzKCkge1xuXHRlbCA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaC1wYWdlLXJlc3VsdHNcIilcblx0aWYgZWwgIT0gbmlsIHtcblx0XHRnb20uTW91bnQoXCIjc2VhcmNoLXBhZ2UtcmVzdWx0c1wiLCBTZWFyY2hSZXN1bHRzTGlzdChzZWFyY2hSZXN1bHRzLCBzZWFyY2hRdWVyeSwgc2VhcmNoU2VsZWN0ZWRJbmRleCkpXG5cdH1cbn1cblxuLy8gc2V0U2VhcmNoSW5wdXQgd3JpdGVzIHRoZSBpbnB1dCdzIHZhbHVlOyBpdCBpcyB1c2VyLW93bmVkIERPTSBzdGF0ZSwgbm90IGRlcml2ZWQuXG5mdW5jIHNldFNlYXJjaElucHV0KHYgc3RyaW5nKSB7XG5cdGlucCA6PSBhcHBSZWZzW1wic2VhcmNoSW5wdXRcIl1cblx0aWYgaW5wID09IG5pbCAmJiBkb2N1bWVudCAhPSBuaWwge1xuXHRcdGlucCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc2VhcmNoLXBhZ2UtaW5wdXRcIilcblx0fVxuXHRpZiBpbnAgIT0gbmlsIHtcblx0XHRpbnAudmFsdWUgPSB2XG5cdH1cbn1cblxuLy8gc2V0U2VhcmNoUXVlcnkgdXBkYXRlcyBxdWVyeSArIHJlc3VsdHMgdG9nZXRoZXIgYW5kIHJlLXJlbmRlcnMgdGhlIGxpc3QuXG5mdW5jIHNldFNlYXJjaFF1ZXJ5KHEgc3RyaW5nKSB7XG5cdHNlYXJjaFF1ZXJ5ID0gcVxuXHRzZWFyY2hTZWxlY3RlZEluZGV4ID0gLTFcblx0c2VhcmNoUmVzdWx0cyA9IHBlcmZvcm1TZWFyY2gocSlcblx0c2V0U2VhcmNoSW5wdXQocSlcblx0cmVuZGVyU2VhcmNoUmVzdWx0cygpXG59XG5cbmZ1bmMgb3BlblNlYXJjaCgpIHtcblx0b3BlblNlYXJjaFdpdGhUYWcoXCJcIilcbn1cblxuLy8gb3BlblNlYXJjaFdpdGhUYWcgcmVzZXRzIHRoZSBxdWVyeSBvbiBvcGVuIChub3Qgb24gY2xvc2UpIHNvIHRoZSByZXN1bHRzXG4vLyBkb24ndCB2YW5pc2ggd2hpbGUgdGhlIG92ZXJsYXkgaXMgc3RpbGwgZmFkaW5nIG91dC5cbmZ1bmMgb3BlblNlYXJjaFdpdGhUYWcodGFnIHN0cmluZykge1xuXHRjbG9zZU1lbnVzKClcblx0c2VhcmNoT3BlbiA9IHRydWVcblx0c2V0U2VhcmNoUXVlcnkodGFnKVxuXHRzeW5jT3ZlcmxheXMoKVxuXHRmb2N1c0xhdGVyKFwiI3NlYXJjaC1wYWdlLWlucHV0XCIpXG59XG5cbmZ1bmMgY2xlYXJTZWFyY2goKSB7XG5cdHNldFNlYXJjaFF1ZXJ5KFwiXCIpXG5cdHN5bmNPdmVybGF5cygpXG5cdGZvY3VzTGF0ZXIoXCIjc2VhcmNoLXBhZ2UtaW5wdXRcIilcbn1cblxuLy8gY2xvc2VTZWFyY2ggaGlkZXMgdGhlIG92ZXJsYXk7IHRoZSBleGl0IGZhZGUgaXMgQ1NTLW9ubHkgKCNzZWFyY2gtcGFnZSB0cmFuc2l0aW9uKS5cbmZ1bmMgY2xvc2VTZWFyY2goKSB7XG5cdGlmICFzZWFyY2hPcGVuIHtcblx0XHRyZXR1cm5cblx0fVxuXHRzZWFyY2hPcGVuID0gZmFsc2Vcblx0c3luY092ZXJsYXlzKClcbn1cblxuZnVuYyBoYW5kbGVTZWFyY2hJbnB1dCh2YWx1ZSBzdHJpbmcpIHtcblx0c2VhcmNoUXVlcnkgPSB2YWx1ZVxuXHRzZWFyY2hTZWxlY3RlZEluZGV4ID0gLTFcblx0c3luY092ZXJsYXlzKClcblx0aWYgc2VhcmNoRGVib3VuY2VUaW1lciAhPSBuaWwge1xuXHRcdGNsZWFyVGltZW91dChzZWFyY2hEZWJvdW5jZVRpbWVyKVxuXHR9XG5cdHNlYXJjaERlYm91bmNlVGltZXIgPSBzZXRUaW1lb3V0KGZ1bmMoKSB7XG5cdFx0c2VhcmNoUmVzdWx0cyA9IHBlcmZvcm1TZWFyY2goc2VhcmNoUXVlcnkpXG5cdFx0cmVuZGVyU2VhcmNoUmVzdWx0cygpXG5cdH0sIDE1MClcbn1cbiIsInBhY2thZ2UgbWFpblxuXG50ZW1wbCBTZWFyY2hSZXN1bHRzTGlzdChyZXN1bHRzIFtdU2VhcmNoUmVzdWx0SXRlbSwgcXVlcnkgc3RyaW5nLCBzZWxlY3RlZEluZGV4IGludCkge1xuXHRpZiBxdWVyeSAhPSBcIlwiICYmIGxlbihyZXN1bHRzKSA9PSAwIHtcblx0XHQ8ZGl2IGNsYXNzPVwic2VhcmNoLW5vLXJlc3VsdHNcIj5cblx0XHRcdEBJY29uKFwic2VhcmNoXCIsIFwiM3JlbVwiKVxuXHRcdFx0PHA+eyB0KFwic2VhcmNoLm5vUmVzdWx0c1wiKSB9PC9wPlxuXHRcdDwvZGl2PlxuXHR9IGVsc2Uge1xuXHRcdGZvciBpLCBpdGVtIDo9IHJhbmdlIHJlc3VsdHMge1xuXHRcdFx0PGFydGljbGUgY2xhc3M9eyBjbHMoXCJzZWFyY2gtcmVzdWx0LWl0ZW0gYmxvZy1wb3N0LWNhcmRcIiwgaSA9PSBzZWxlY3RlZEluZGV4LCBcInNlbGVjdGVkXCIpIH0gZGF0YS1hY3Rpb249XCJvcGVuLXBvc3RcIiBkYXRhLWhyZWY9eyBpdGVtLlVybCB9PlxuXHRcdFx0XHQ8aDIgY2xhc3M9XCJibG9nLXBvc3QtdGl0bGVcIj5cblx0XHRcdFx0XHQ8YSBocmVmPXsgaXRlbS5VcmwgfSBkYXRhLWFjdGlvbj1cIm5hdlwiPkB0ZW1wbC5SYXcoaGlnaGxpZ2h0TWF0Y2goaXRlbS5UaXRsZSwgcXVlcnkpKTwvYT5cblx0XHRcdFx0PC9oMj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cImJsb2ctcG9zdC1tZXRhXCI+XG5cdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJibG9nLXBvc3QtdGFnc1wiPlxuXHRcdFx0XHRcdFx0aWYgaXRlbS5JdGVtVHlwZSA9PSBcInByb2plY3RcIiB7XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiaXRlbS10YWdcIj57IHQoXCJiYWRnZXMucHJvamVjdFwiKSB9PC9zcGFuPlxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJpdGVtLXRhZ1wiPnsgdChcImJhZGdlcy5ibG9nXCIpIH08L3NwYW4+XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0XHRmb3IgXywgdGFnIDo9IHJhbmdlIGl0ZW0uVGFncyB7XG5cdFx0XHRcdFx0XHRcdDxzcGFuIGNsYXNzPVwiaXRlbS10YWdcIj57IHRhZyB9PC9zcGFuPlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDwvc3Bhbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHRcdDxwIGNsYXNzPVwiYmxvZy1wb3N0LWV4Y2VycHRcIj5AdGVtcGwuUmF3KGhpZ2hsaWdodE1hdGNoKGl0ZW0uRGVzY3JpcHRpb24sIHF1ZXJ5KSk8L3A+XG5cdFx0XHQ8L2FydGljbGU+XG5cdFx0fVxuXHR9XG59XG5cbnRlbXBsIFNlYXJjaE1vZGFsKG9wZW4gYm9vbCwgcXVlcnkgc3RyaW5nLCByZXN1bHRzIFtdU2VhcmNoUmVzdWx0SXRlbSwgc2VsZWN0ZWRJbmRleCBpbnQsIHBsYWNlaG9sZGVyIHN0cmluZykge1xuXHQ8ZGl2IGlkPVwic2VhcmNoLXBhZ2VcIiBjbGFzcz17IGNscyhcIlwiLCBvcGVuLCBcInNob3dcIikgfSByb2xlPVwiZGlhbG9nXCIgYXJpYS1tb2RhbD1cInRydWVcIiBhcmlhLWxhYmVsPXsgdChcImFyaWEuc2VhcmNoXCIpIH0+XG5cdFx0PGRpdiBjbGFzcz1cInNlYXJjaC1wYWdlLWhlYWRlclwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInNlYXJjaC1wYWdlLWhlYWRlci1jb250ZW50XCI+XG5cdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwic2VhcmNoLXBhZ2UtYmFja1wiIGlkPVwic2VhcmNoLXBhZ2UtYmFja1wiIGFyaWEtbGFiZWw9eyB0KFwiYXJpYS5nb0JhY2tcIikgfSBkYXRhLWFjdGlvbj1cImNsb3NlLXNlYXJjaFwiPlxuXHRcdFx0XHRcdEBJY29uKFwiYXJyb3ctbGVmdFwiLCBcIjEuMnJlbVwiKVxuXHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInNlYXJjaC1wYWdlLWlucHV0LXdyYXBwZXJcIj5cblx0XHRcdFx0XHQ8aW5wdXQgcmVmPVwic2VhcmNoSW5wdXRcIiB0eXBlPVwic2VhcmNoXCIgaWQ9XCJzZWFyY2gtcGFnZS1pbnB1dFwiIGNsYXNzPVwic2VhcmNoLXBhZ2UtaW5wdXRcIiBwbGFjZWhvbGRlcj17IHBsYWNlaG9sZGVyIH0gYXV0b2NvbXBsZXRlPVwib2ZmXCIgYXJpYS1sYWJlbD17IHQoXCJhcmlhLnNlYXJjaFwiKSB9IHZhbHVlPXsgcXVlcnkgfS8+XG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9eyBjbHMoXCJzZWFyY2gtcGFnZS1jbGVhclwiLCBxdWVyeSAhPSBcIlwiLCBcInNob3dcIikgfSBpZD1cInNlYXJjaC1wYWdlLWNsZWFyXCIgYXJpYS1sYWJlbD17IHQoXCJhcmlhLmNsZWFyU2VhcmNoXCIpIH0gZGF0YS1hY3Rpb249XCJjbGVhci1zZWFyY2hcIj5cblx0XHRcdFx0XHRcdEBJY29uKFwidGltZXNcIiwgXCIxLjJyZW1cIilcblx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0XHQ8ZGl2IGNsYXNzPVwic2VhcmNoLXBhZ2UtY29udGVudFwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cInNlYXJjaC1wYWdlLXJlc3VsdHNcIiBpZD1cInNlYXJjaC1wYWdlLXJlc3VsdHNcIj5cblx0XHRcdFx0QFNlYXJjaFJlc3VsdHNMaXN0KHJlc3VsdHMsIHF1ZXJ5LCBzZWxlY3RlZEluZGV4KVxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImVycm9yc1wiXG5pbXBvcnQgXCJqczouL2Jyb3dzZXIuZC50c1wiXG5pbXBvcnQgXCJzbGljZXNcIlxuaW1wb3J0IFwic3RyaW5nc1wiXG5cbi8vIOKUgOKUgCBHbG9iYWwgQXBwbGljYXRpb24gU3RhdGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbnZhciBzaXRlID0gU2l0ZUNvbmZpZ3tcblx0U29jaWFsOiBbXVNvY2lhbExpbmt7fSxcbn1cbnZhciBwb3N0cyA9IFtdQmxvZ1Bvc3R7fVxudmFyIHByb2plY3RzID0gW11Qcm9qZWN0e31cbnZhciBuYXZQYWdlcyA9IFtdTmF2UGFnZXt9XG52YXIgdHJhbnNsYXRpb25zID0gbWFwW3N0cmluZ11zdHJpbmd7fVxudmFyIHJvdXRlID0gUm91dGVNYXRjaHtQYWdlOiAxfSAvLyB6ZXJvIEtpbmQgPT0gUm91dGVCbG9nXG52YXIgY3VycmVudFRoZW1lID0gXCJkYXJrXCJcbnZhciBtb2JpbGVNZW51T3BlbiBib29sXG52YXIgcHJvamVjdHNEcm9wZG93bk9wZW4gYm9vbFxudmFyIHNlYXJjaE9wZW4gYm9vbFxudmFyIHNlYXJjaFF1ZXJ5IHN0cmluZ1xudmFyIHNlYXJjaFJlc3VsdHMgPSBbXVNlYXJjaFJlc3VsdEl0ZW17fVxudmFyIGNvbnRhY3RPcGVuIGJvb2xcbnZhciBjb250YWN0Rm9ybSBDb250YWN0U3RhdGVcblxuLy8gUm91dGUgdmlldyBzdGF0ZTsgbWFpbigpIGFuZCBoYW5kbGVSb3V0ZSBhc3NpZ24gbmV3Vmlld1N0YXRlKCkuIE5vdCBpbml0aWFsaXNlZFxuLy8gaGVyZTogZ2xvYmFscyBhcmUgZW1pdHRlZCBpbiBmaWxlIG9yZGVyLCBzbyBMb2FkUmVhZHkgKHR5cGVzLmdvKSB3b3VsZCBiZSBpbiBURFouXG52YXIgdmlldyBWaWV3U3RhdGVcblxuLy8gUmVuZGVyZWQgcm91dGUgY29udGVudCBrZXllZCBieSByb3V0ZSBwYXRoICgvYmxvZy88c2x1Zz4sIC9wcm9qZWN0LzxpZD4sIC9wYWdlLzxpZD4pLlxudmFyIGNvbnRlbnRDYWNoZSA9IG1hcFtzdHJpbmddY2FjaGVkQ29udGVudHt9XG5cbi8vIOKUgOKUgCBUcmFuc2xhdGlvbiBIZWxwZXIg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmMgdChrZXkgc3RyaW5nKSBzdHJpbmcge1xuXHRpZiB2YWwsIG9rIDo9IHRyYW5zbGF0aW9uc1trZXldOyBvayAmJiB2YWwgIT0gXCJcIiB7XG5cdFx0cmV0dXJuIHZhbFxuXHR9XG5cdHJldHVybiBrZXlcbn1cblxuLy8g4pSA4pSAIE1ldGEgVGFncyBVcGRhdGVyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG4vLyBoZWFkRWwgcmV0dXJucyB0aGUgPGhlYWQ+IGVsZW1lbnQgbWF0Y2hpbmcgdGFnW2F0dHI9XCJuYW1lXCJdLCBjcmVhdGluZyBpdCBpZiBtaXNzaW5nLlxuZnVuYyBoZWFkRWwodGFnIHN0cmluZywgYXR0ciBzdHJpbmcsIG5hbWUgc3RyaW5nKSBhbnkge1xuXHRlbCA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHRhZyArIFwiW1wiICsgYXR0ciArIFwiPVxcXCJcIiArIG5hbWUgKyBcIlxcXCJdXCIpXG5cdGlmIGVsID09IG5pbCB7XG5cdFx0ZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KHRhZylcblx0XHRlbC5zZXRBdHRyaWJ1dGUoYXR0ciwgbmFtZSlcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKGVsKVxuXHR9XG5cdHJldHVybiBlbFxufVxuXG4vLyB1cGRhdGVNZXRhIHNldHMgPG1ldGEgYXR0cj1cIm5hbWVcIiBjb250ZW50PXZhbHVlPjsgYXR0ciBpcyBcIm5hbWVcIiBvciBcInByb3BlcnR5XCIuXG5mdW5jIHVwZGF0ZU1ldGEoYXR0ciBzdHJpbmcsIG5hbWUgc3RyaW5nLCB2YWx1ZSBzdHJpbmcpIHtcblx0aWYgdmFsdWUgPT0gXCJcIiB7XG5cdFx0cmV0dXJuXG5cdH1cblx0aGVhZEVsKFwibWV0YVwiLCBhdHRyLCBuYW1lKS5zZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIsIHZhbHVlKVxufVxuXG5mdW5jIHVwZGF0ZVRpdGxlTWV0YSh0aXRsZSBzdHJpbmcpIHtcblx0aWYgdGl0bGUgPT0gXCJcIiB7XG5cdFx0cmV0dXJuXG5cdH1cblx0ZG9jdW1lbnQudGl0bGUgPSB0aXRsZVxuXHR1cGRhdGVNZXRhKFwicHJvcGVydHlcIiwgXCJvZzp0aXRsZVwiLCB0aXRsZSlcblx0dXBkYXRlTWV0YShcInByb3BlcnR5XCIsIFwidHdpdHRlcjp0aXRsZVwiLCB0aXRsZSlcbn1cblxuZnVuYyB1cGRhdGVEZXNjcmlwdGlvbk1ldGEoZGVzY3JpcHRpb24gc3RyaW5nKSB7XG5cdHVwZGF0ZU1ldGEoXCJuYW1lXCIsIFwiZGVzY3JpcHRpb25cIiwgZGVzY3JpcHRpb24pXG5cdHVwZGF0ZU1ldGEoXCJwcm9wZXJ0eVwiLCBcIm9nOmRlc2NyaXB0aW9uXCIsIGRlc2NyaXB0aW9uKVxuXHR1cGRhdGVNZXRhKFwicHJvcGVydHlcIiwgXCJ0d2l0dGVyOmRlc2NyaXB0aW9uXCIsIGRlc2NyaXB0aW9uKVxufVxuXG5mdW5jIHVwZGF0ZU1ldGFUYWdzKCkge1xuXHR1cGRhdGVUaXRsZU1ldGEoc2l0ZS5UaXRsZSlcblx0dXBkYXRlRGVzY3JpcHRpb25NZXRhKHNpdGUuRGVzY3JpcHRpb24pXG5cdHVwZGF0ZU1ldGEoXCJuYW1lXCIsIFwiYXV0aG9yXCIsIHNpdGUuQXV0aG9yKVxuXHR0aGVtZUJnIDo9IHNpdGUuRGFya1RoZW1lLkJhY2tncm91bmRcblx0aWYgY3VycmVudFRoZW1lID09IFwibGlnaHRcIiAmJiBzaXRlLkxpZ2h0VGhlbWUuQmFja2dyb3VuZCAhPSBcIlwiIHtcblx0XHR0aGVtZUJnID0gc2l0ZS5MaWdodFRoZW1lLkJhY2tncm91bmRcblx0fVxuXHR1cGRhdGVNZXRhKFwibmFtZVwiLCBcInRoZW1lLWNvbG9yXCIsIHRoZW1lQmcpXG59XG5cbmZ1bmMgYW5ub3VuY2VSb3V0ZSh0aXRsZSBzdHJpbmcpIHtcblx0YW5ub3VuY2VyIDo9IGFwcFJlZnNbXCJyb3V0ZUFubm91bmNlclwiXVxuXHRpZiBhbm5vdW5jZXIgPT0gbmlsICYmIGRvY3VtZW50ICE9IG5pbCB7XG5cdFx0YW5ub3VuY2VyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJyb3V0ZS1hbm5vdW5jZXJcIilcblx0fVxuXHRpZiBhbm5vdW5jZXIgIT0gbmlsIHtcblx0XHRwcmVmaXggOj0gdChcImdlbmVyYWwucm91dGVBbm5vdW5jZVwiKVxuXHRcdGlmIHByZWZpeCA9PSBcImdlbmVyYWwucm91dGVBbm5vdW5jZVwiIHtcblx0XHRcdHByZWZpeCA9IFwiTmF2aWdhdGVkIHRvIFwiXG5cdFx0fVxuXHRcdGFubm91bmNlci50ZXh0Q29udGVudCA9IHByZWZpeCArIHRpdGxlXG5cdH1cbn1cblxuZnVuYyB1cGRhdGVSb3V0ZU1ldGEodGl0bGUgc3RyaW5nLCBkZXNjcmlwdGlvbiBzdHJpbmcsIGNhbm9uaWNhbFBhdGggc3RyaW5nKSB7XG5cdHVwZGF0ZVRpdGxlTWV0YSh0aXRsZSlcblx0dXBkYXRlRGVzY3JpcHRpb25NZXRhKGRlc2NyaXB0aW9uKVxuXHRhbm5vdW5jZVJvdXRlKHRpdGxlKVxuXHRpZiBjYW5vbmljYWxQYXRoID09IFwiXCIge1xuXHRcdHJldHVyblxuXHR9XG5cdGZ1bGxVUkwgOj0gY2Fub25pY2FsUGF0aFxuXHRpZiBzdHJpbmdzLkhhc1ByZWZpeChjYW5vbmljYWxQYXRoLCBcIi9cIikge1xuXHRcdG9yaWdpbiA6PSBzdHJWYWwod2luZG93LmxvY2F0aW9uLm9yaWdpbilcblx0XHRpZiBvcmlnaW4gPT0gXCJcIiB8fCBvcmlnaW4gPT0gXCJudWxsXCIge1xuXHRcdFx0b3JpZ2luID0gc2l0ZS5Vcmxcblx0XHR9XG5cdFx0ZnVsbFVSTCA9IG9yaWdpbiArIGNhbm9uaWNhbFBhdGhcblx0fVxuXHR1cGRhdGVNZXRhKFwicHJvcGVydHlcIiwgXCJvZzp1cmxcIiwgZnVsbFVSTClcblx0aGVhZEVsKFwibGlua1wiLCBcInJlbFwiLCBcImNhbm9uaWNhbFwiKS5zZXRBdHRyaWJ1dGUoXCJocmVmXCIsIGZ1bGxVUkwpXG59XG5cbi8vIOKUgOKUgCBEYXRhIEluaXRpYWxpemF0aW9uIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuLy8gYD09IG5pbGAgY29tcGlsZXMgdG8gbG9vc2UgYD09IG51bGxgLCBzbyB0aGVzZSBhbHNvIGNhdGNoIEpTIHVuZGVmaW5lZC5cblxuZnVuYyBzdHJWYWwodiBhbnkpIHN0cmluZyB7XG5cdGlmIHYgPT0gbmlsIHtcblx0XHRyZXR1cm4gXCJcIlxuXHR9XG5cdHJldHVybiBzdHJpbmcodilcbn1cblxuZnVuYyBib29sVmFsKHYgYW55KSBib29sIHtcblx0aWYgdiA9PSBuaWwgfHwgc3RyaW5nKHYpID09IFwiZmFsc2VcIiB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0cmV0dXJuIGJvb2wodilcbn1cblxuZnVuYyBpbnRWYWwodiBhbnkpIGludCB7XG5cdGlmIHYgPT0gbmlsIHtcblx0XHRyZXR1cm4gMFxuXHR9XG5cdHJldHVybiBpbnQodilcbn1cblxuLy8gc3RyU2xpY2UgbWFwcyBhIHJhdyBKU09OIGFycmF5IChvciBuaWwpIHRvIGEgbm9uLW5pbCBbXXN0cmluZy5cbmZ1bmMgc3RyU2xpY2UocmF3IGFueSkgW11zdHJpbmcge1xuXHRvdXQgOj0gW11zdHJpbmd7fVxuXHRpZiByYXcgIT0gbmlsIHtcblx0XHRmb3IgXywgdiA6PSByYW5nZSByYXcge1xuXHRcdFx0b3V0ID0gYXBwZW5kKG91dCwgc3RyVmFsKHYpKVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gb3V0XG59XG5cbi8vIHBvc3RGcm9tSlNPTiBtYXBzIG9uZSByYXcgYGJsb2cucG9zdHNbXWAgZW50cnkgdG8gYSBCbG9nUG9zdC5cbmZ1bmMgcG9zdEZyb21KU09OKHAgYW55KSBCbG9nUG9zdCB7XG5cdGZuIDo9IHN0clZhbChwLmZpbGVuYW1lKVxuXHRzbHVnIDo9IHN0cmluZ3MuVHJpbVN1ZmZpeChmbiwgXCIubWRcIilcblx0cmV0dXJuIEJsb2dQb3N0e1xuXHRcdFNsdWc6ICAgICBzbHVnLFxuXHRcdFRpdGxlOiAgICBzdHJWYWwocC50aXRsZSksXG5cdFx0RGF0ZTogICAgIHN0clZhbChwLmRhdGUpLFxuXHRcdEV4Y2VycHQ6ICBzdHJWYWwocC5leGNlcnB0KSxcblx0XHRUYWdzOiAgICAgc3RyU2xpY2UocC50YWdzKSxcblx0XHRGaWxlbmFtZTogZm4sXG5cdFx0SHJlZjogICAgIFwiL2Jsb2cvXCIgKyBzbHVnLFxuXHR9XG59XG5cbi8vIHNvcnRQb3N0c0J5RGF0ZSBvcmRlcnMgbmV3ZXN0IGZpcnN0OyBkYXRlcyBhcmUgSVNPIHN0cmluZ3Mgc28gbGV4aWNhbCBvcmRlciB3b3Jrcy5cbmZ1bmMgc29ydFBvc3RzQnlEYXRlKGxpc3QgW11CbG9nUG9zdCkge1xuXHRzbGljZXMuU29ydEZ1bmMobGlzdCwgZnVuYyhhIEJsb2dQb3N0LCBiIEJsb2dQb3N0KSBpbnQge1xuXHRcdGlmIGEuRGF0ZSA9PSBiLkRhdGUge1xuXHRcdFx0cmV0dXJuIDBcblx0XHR9XG5cdFx0aWYgYS5EYXRlIDwgYi5EYXRlIHtcblx0XHRcdHJldHVybiAxXG5cdFx0fVxuXHRcdHJldHVybiAtMVxuXHR9KVxufVxuXG4vLyBwcm9qZWN0RnJvbUpTT04gbWFwcyBvbmUgcmF3IGBwcm9qZWN0c1tdYCBlbnRyeSB0byBhIFByb2plY3QuXG5mdW5jIHByb2plY3RGcm9tSlNPTihwIGFueSkgUHJvamVjdCB7XG5cdGxpbmtzIDo9IFtdUHJvamVjdExpbmt7fVxuXHRpZiBwLmxpbmtzICE9IG5pbCB7XG5cdFx0Zm9yIF8sIGwgOj0gcmFuZ2UgcC5saW5rcyB7XG5cdFx0XHRsaW5rcyA9IGFwcGVuZChsaW5rcywgUHJvamVjdExpbmt7XG5cdFx0XHRcdFRpdGxlOiBzdHJWYWwobC50aXRsZSksXG5cdFx0XHRcdEljb246ICBzdHJWYWwobC5pY29uKSxcblx0XHRcdFx0SHJlZjogIHN0clZhbChsLmhyZWYpLFxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRpZCA6PSBzdHJWYWwocC5pZClcblx0cmV0dXJuIFByb2plY3R7XG5cdFx0SUQ6ICAgICAgICAgICAgICAgaWQsXG5cdFx0VGl0bGU6ICAgICAgICAgICAgc3RyVmFsKHAudGl0bGUpLFxuXHRcdERlc2NyaXB0aW9uOiAgICAgIHN0clZhbChwLmRlc2NyaXB0aW9uKSxcblx0XHRUYWdzOiAgICAgICAgICAgICBzdHJTbGljZShwLnRhZ3MpLFxuXHRcdE9yZGVyOiAgICAgICAgICAgIGludFZhbChwLm9yZGVyKSxcblx0XHRHaXRodWJSZXBvOiAgICAgICBzdHJWYWwocC5naXRodWJfcmVwbyksXG5cdFx0R2l0aHViQnJhbmNoOiAgICAgc3RyVmFsKHAuZ2l0aHViX2JyYW5jaCksXG5cdFx0RGVtb1VybDogICAgICAgICAgc3RyVmFsKHAuZGVtb191cmwpLFxuXHRcdERlbW9MYWJlbDogICAgICAgIHN0clZhbChwLmRlbW9fbGFiZWwpLFxuXHRcdERlbW9JbnN0cnVjdGlvbnM6IHN0clZhbChwLmRlbW9faW5zdHJ1Y3Rpb25zKSxcblx0XHREZW1vSGVpZ2h0OiAgICAgICBzdHJWYWwocC5kZW1vX2hlaWdodCksXG5cdFx0RGVtb0Z1bGxzY3JlZW46ICAgYm9vbFZhbChwLmRlbW9fZnVsbHNjcmVlbiksXG5cdFx0WW91dHViZVZpZGVvczogICAgc3RyU2xpY2UocC55b3V0dWJlX3ZpZGVvcyksXG5cdFx0TGlua3M6ICAgICAgICAgICAgbGlua3MsXG5cdFx0SHJlZjogICAgICAgICAgICAgXCIvcHJvamVjdC9cIiArIGlkLFxuXHR9XG59XG5cbi8vIHRoZW1lRnJvbUpTT04gbWFwcyBvbmUgYHNpdGUudGhlbWUuPG5hbWU+YCBlbnRyeSB0byBUaGVtZUNvbG9ycy5cbmZ1bmMgdGhlbWVGcm9tSlNPTihkIGFueSwgZGVmYXVsdENvZGVUaGVtZSBzdHJpbmcpIFRoZW1lQ29sb3JzIHtcblx0dGMgOj0gVGhlbWVDb2xvcnN7XG5cdFx0UHJpbWFyeTogICAgc3RyVmFsKGQucHJpbWFyeSksXG5cdFx0U2Vjb25kYXJ5OiAgc3RyVmFsKGQuc2Vjb25kYXJ5KSxcblx0XHRCYWNrZ3JvdW5kOiBzdHJWYWwoZC5iYWNrZ3JvdW5kKSxcblx0XHRUZXh0OiAgICAgICBzdHJWYWwoZC50ZXh0KSxcblx0XHRUZXh0TGlnaHQ6ICBzdHJWYWwoZC50ZXh0TGlnaHQpLFxuXHRcdEJvcmRlcjogICAgIHN0clZhbChkLmJvcmRlciksXG5cdFx0SG92ZXI6ICAgICAgc3RyVmFsKGQuaG92ZXIpLFxuXHRcdENvZGVUaGVtZTogIGRlZmF1bHRDb2RlVGhlbWUsXG5cdH1cblx0aWYgZC5jb2RlICE9IG5pbCB7XG5cdFx0dGMuQ29kZVRoZW1lID0gc3RyVmFsKGQuY29kZS50aGVtZSlcblx0fVxuXHRpZiBkLmNvbW1lbnRzICE9IG5pbCB7XG5cdFx0dGMuQ29tbWVudHNUaGVtZSA9IHN0clZhbChkLmNvbW1lbnRzLnRoZW1lKVxuXHR9XG5cdHJldHVybiB0Y1xufVxuXG5mdW5jIHNvcnRQcm9qZWN0c0J5T3JkZXIobGlzdCBbXVByb2plY3QpIHtcblx0c2xpY2VzLlNvcnRGdW5jKGxpc3QsIGZ1bmMoYSBQcm9qZWN0LCBiIFByb2plY3QpIGludCB7XG5cdFx0cmV0dXJuIGEuT3JkZXIgLSBiLk9yZGVyXG5cdH0pXG59XG5cbi8vIG5hdlBhZ2VIcmVmIGlzIHRoZSByb3V0ZSBmb3IgYSBjdXN0b20gcGFnZSBpZC5cbmZ1bmMgbmF2UGFnZUhyZWYoaWQgc3RyaW5nKSBzdHJpbmcge1xuXHRyZXR1cm4gXCIvcGFnZS9cIiArIGlkXG59XG5cbi8vIHBhZ2VGcm9tSlNPTiBtYXBzIG9uZSBgcGFnZXMuPGlkPmAgZW50cnkgdG8gYSBOYXZQYWdlLlxuZnVuYyBwYWdlRnJvbUpTT04oaWQgc3RyaW5nLCBwIGFueSkgTmF2UGFnZSB7XG5cdHJldHVybiBOYXZQYWdle1xuXHRcdElEOiAgICAgICAgaWQsXG5cdFx0VGl0bGU6ICAgICBzdHJWYWwocC50aXRsZSksXG5cdFx0T3JkZXI6ICAgICBpbnRWYWwocC5vcmRlciksXG5cdFx0U2hvd0luTmF2OiBib29sVmFsKHAuc2hvd0luTmF2KSxcblx0XHRIcmVmOiAgICAgIG5hdlBhZ2VIcmVmKGlkKSxcblx0fVxufVxuXG5mdW5jIHNvcnRQYWdlc0J5T3JkZXIobGlzdCBbXU5hdlBhZ2UpIHtcblx0c2xpY2VzLlNvcnRGdW5jKGxpc3QsIGZ1bmMoYSBOYXZQYWdlLCBiIE5hdlBhZ2UpIGludCB7XG5cdFx0cmV0dXJuIGEuT3JkZXIgLSBiLk9yZGVyXG5cdH0pXG59XG5cbmFzeW5jIGZ1bmMgaW5pdERhdGEoKSBlcnJvciB7XG5cdHZhciBkYXRhIGFueVxuXHRlbCA6PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChcInNpdGUtZGF0YVwiKVxuXHRpZiBlbCAhPSBuaWwgJiYgZWwudGV4dENvbnRlbnQgIT0gbmlsICYmIGVsLnRleHRDb250ZW50ICE9IFwiXCIge1xuXHRcdGRhdGEgPSBKU09OLnBhcnNlKHN0clZhbChlbC50ZXh0Q29udGVudCkpXG5cdH0gZWxzZSB7XG5cdFx0cmVzIDo9IGF3YWl0IGZldGNoKFwiL2RhdGEvY29udGVudC5qc29uXCIpXG5cdFx0aWYgcmVzID09IG5pbCB8fCAhcmVzLm9rIHtcblx0XHRcdHJldHVybiBlcnJvcnMuTmV3KFwiZmFpbGVkIHRvIGZldGNoIC9kYXRhL2NvbnRlbnQuanNvblwiKVxuXHRcdH1cblx0XHRkYXRhID0gYXdhaXQgcmVzLmpzb24oKVxuXHR9XG5cblx0aWYgZGF0YSA9PSBuaWwge1xuXHRcdHJldHVybiBlcnJvcnMuTmV3KFwiZmFpbGVkIHRvIHBhcnNlIC9kYXRhL2NvbnRlbnQuanNvblwiKVxuXHR9XG5cblx0c2l0ZURhdGEgOj0gZGF0YS5zaXRlXG5cdGlmIHNpdGVEYXRhICE9IG5pbCB7XG5cdFx0c2l0ZS5UaXRsZSA9IHN0clZhbChzaXRlRGF0YS50aXRsZSlcblx0XHRzaXRlLlVybCA9IHN0cmluZ3MuVHJpbVN1ZmZpeChzdHJWYWwoc2l0ZURhdGEudXJsKSwgXCIvXCIpXG5cdFx0c2l0ZS5EZXNjcmlwdGlvbiA9IHN0clZhbChzaXRlRGF0YS5kZXNjcmlwdGlvbilcblx0XHRzaXRlLkF1dGhvciA9IHN0clZhbChzaXRlRGF0YS5hdXRob3IpXG5cdFx0c2l0ZS5HaXRodWJVc2VybmFtZSA9IHN0clZhbChzaXRlRGF0YS5naXRodWJfdXNlcm5hbWUpXG5cblx0XHRpZiBzaXRlRGF0YS50aGVtZSAhPSBuaWwge1xuXHRcdFx0aWYgc2l0ZURhdGEudGhlbWUuZGFyayAhPSBuaWwge1xuXHRcdFx0XHRzaXRlLkRhcmtUaGVtZSA9IHRoZW1lRnJvbUpTT04oc2l0ZURhdGEudGhlbWUuZGFyaywgXCJwcmlzbS10b21vcnJvd1wiKVxuXHRcdFx0fVxuXHRcdFx0aWYgc2l0ZURhdGEudGhlbWUubGlnaHQgIT0gbmlsIHtcblx0XHRcdFx0c2l0ZS5MaWdodFRoZW1lID0gdGhlbWVGcm9tSlNPTihzaXRlRGF0YS50aGVtZS5saWdodCwgXCJwcmlzbS1jb3lcIilcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiBzaXRlRGF0YS5zZWFyY2ggIT0gbmlsIHtcblx0XHRcdHNpdGUuU2VhcmNoID0gU2VhcmNoQ29uZmlne1xuXHRcdFx0XHRFbmFibGVkOiAgICAgYm9vbFZhbChzaXRlRGF0YS5zZWFyY2guZW5hYmxlZCksXG5cdFx0XHRcdE1pbkNoYXJzOiAgICBpbnRWYWwoc2l0ZURhdGEuc2VhcmNoLm1pbkNoYXJzKSxcblx0XHRcdFx0UGxhY2Vob2xkZXI6IHN0clZhbChzaXRlRGF0YS5zZWFyY2gucGxhY2Vob2xkZXIpLFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIHNpdGVEYXRhLmVtYWlsanMgIT0gbmlsIHtcblx0XHRcdHNpdGUuRW1haWxKUyA9IEVtYWlsSlNDb25maWd7XG5cdFx0XHRcdEVuYWJsZWQ6ICAgIGJvb2xWYWwoc2l0ZURhdGEuZW1haWxqcy5lbmFibGVkKSxcblx0XHRcdFx0U2VydmljZUlkOiAgc3RyVmFsKHNpdGVEYXRhLmVtYWlsanMuc2VydmljZUlkKSxcblx0XHRcdFx0VGVtcGxhdGVJZDogc3RyVmFsKHNpdGVEYXRhLmVtYWlsanMudGVtcGxhdGVJZCksXG5cdFx0XHRcdFB1YmxpY0tleTogIHN0clZhbChzaXRlRGF0YS5lbWFpbGpzLnB1YmxpY0tleSksXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgc2l0ZURhdGEuY29tbWVudHMgIT0gbmlsIHtcblx0XHRcdHNpdGUuQ29tbWVudHMgPSBDb21tZW50c0NvbmZpZ3tcblx0XHRcdFx0QmxvZ0VuYWJsZWQ6ICAgICBib29sVmFsKHNpdGVEYXRhLmNvbW1lbnRzLmJsb2dFbmFibGVkKSxcblx0XHRcdFx0UHJvamVjdHNFbmFibGVkOiBib29sVmFsKHNpdGVEYXRhLmNvbW1lbnRzLnByb2plY3RzRW5hYmxlZCksXG5cdFx0XHRcdEF0dHJzOiAgICAgICAgICAgc2l0ZURhdGEuY29tbWVudHMsXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgc2l0ZURhdGEuc29jaWFsICE9IG5pbCB7XG5cdFx0XHRmb3IgXywgaXRlbSA6PSByYW5nZSBzaXRlRGF0YS5zb2NpYWwge1xuXHRcdFx0XHRzaXRlLlNvY2lhbCA9IGFwcGVuZChzaXRlLlNvY2lhbCwgU29jaWFsTGlua3tcblx0XHRcdFx0XHRJY29uOiAgIHN0clZhbChpdGVtLmljb24pLFxuXHRcdFx0XHRcdEhyZWY6ICAgc3RyVmFsKGl0ZW0uaHJlZiksXG5cdFx0XHRcdFx0VGFyZ2V0OiBzdHJWYWwoaXRlbS50YXJnZXQpLFxuXHRcdFx0XHRcdFJlbDogICAgc3RyVmFsKGl0ZW0ucmVsKSxcblx0XHRcdFx0fSlcblx0XHRcdH1cblx0XHR9XG5cdH1cblxuXHQvLyBUcmFuc2xhdGlvbnNcblx0aWYgZGF0YS50cmFuc2xhdGlvbnMgIT0gbmlsICYmIGRhdGEudHJhbnNsYXRpb25zLmVuICE9IG5pbCB7XG5cdFx0Zm9yIGssIHYgOj0gcmFuZ2UgZGF0YS50cmFuc2xhdGlvbnMuZW4uKG1hcFtzdHJpbmddYW55KSB7XG5cdFx0XHR0cmFuc2xhdGlvbnNba10gPSBzdHJWYWwodilcblx0XHR9XG5cdH1cblxuXHQvLyBCbG9nXG5cdHNpdGUuUG9zdHNQZXJQYWdlID0gNVxuXHRpZiBkYXRhLmJsb2cgIT0gbmlsIHtcblx0XHRpZiBkYXRhLmJsb2cucG9zdHNQZXJQYWdlICE9IG5pbCB7XG5cdFx0XHRzaXRlLlBvc3RzUGVyUGFnZSA9IGludFZhbChkYXRhLmJsb2cucG9zdHNQZXJQYWdlKVxuXHRcdH1cblx0XHRpZiBkYXRhLmJsb2cucG9zdHMgIT0gbmlsIHtcblx0XHRcdGZvciBfLCBwIDo9IHJhbmdlIGRhdGEuYmxvZy5wb3N0cyB7XG5cdFx0XHRcdHBvc3RzID0gYXBwZW5kKHBvc3RzLCBwb3N0RnJvbUpTT04ocCkpXG5cdFx0XHR9XG5cdFx0XHRzb3J0UG9zdHNCeURhdGUocG9zdHMpXG5cdFx0fVxuXHR9XG5cblx0Ly8gUHJvamVjdHNcblx0aWYgZGF0YS5wcm9qZWN0cyAhPSBuaWwge1xuXHRcdGZvciBfLCBwIDo9IHJhbmdlIGRhdGEucHJvamVjdHMge1xuXHRcdFx0cHJvamVjdHMgPSBhcHBlbmQocHJvamVjdHMsIHByb2plY3RGcm9tSlNPTihwKSlcblx0XHR9XG5cdFx0c29ydFByb2plY3RzQnlPcmRlcihwcm9qZWN0cylcblx0fVxuXG5cdC8vIFBhZ2VzXG5cdGlmIGRhdGEucGFnZXMgIT0gbmlsIHtcblx0XHRmb3IgaWQsIHAgOj0gcmFuZ2UgZGF0YS5wYWdlcy4obWFwW3N0cmluZ11hbnkpIHtcblx0XHRcdG5hdlBhZ2VzID0gYXBwZW5kKG5hdlBhZ2VzLCBwYWdlRnJvbUpTT04oaWQsIHApKVxuXHRcdH1cblx0XHRzb3J0UGFnZXNCeU9yZGVyKG5hdlBhZ2VzKVxuXHR9XG5cblx0dXBkYXRlTWV0YVRhZ3MoKVxuXHRyZXR1cm4gbmlsXG59XG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwianM6Li9icm93c2VyLmQudHNcIlxuXG5jb25zdCB0aGVtZVN0b3JhZ2VLZXkgPSBcInRoZW1lLXByZWZlcmVuY2VcIlxuXG5mdW5jIGdldEluaXRpYWxUaGVtZSgpIHN0cmluZyB7XG5cdHNhdmVkIDo9IHdpbmRvdy5sb2NhbFN0b3JhZ2UuZ2V0SXRlbSh0aGVtZVN0b3JhZ2VLZXkpXG5cdGlmIHNhdmVkICE9IG5pbCAmJiBzYXZlZCAhPSBcIlwiIHtcblx0XHRyZXR1cm4gc3RyaW5nKHNhdmVkKVxuXHR9XG5cdGN1cnJlbnQgOj0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtdGhlbWVcIilcblx0aWYgY3VycmVudCAhPSBuaWwgJiYgY3VycmVudCAhPSBcIlwiIHtcblx0XHRyZXR1cm4gc3RyaW5nKGN1cnJlbnQpXG5cdH1cblx0cmV0dXJuIFwiZGFya1wiXG59XG5cbmZ1bmMgZ2V0VGhlbWVDb2xvcnMobmFtZSBzdHJpbmcpIFRoZW1lQ29sb3JzIHtcblx0aWYgbmFtZSA9PSBcImxpZ2h0XCIge1xuXHRcdHJldHVybiBzaXRlLkxpZ2h0VGhlbWVcblx0fVxuXHRyZXR1cm4gc2l0ZS5EYXJrVGhlbWVcbn1cblxuZnVuYyBhcHBseUNvbG9yU2NoZW1lKGNvbG9ycyBUaGVtZUNvbG9ycykge1xuXHRyb290IDo9IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudFxuXHRyb290LnN0eWxlLnNldFByb3BlcnR5KFwiLS1hY2NlbnRcIiwgY29sb3JzLlByaW1hcnkpXG5cdHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCItLWZvbnQtY29sb3JcIiwgY29sb3JzLlRleHQpXG5cdHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCItLWJhY2tncm91bmQtY29sb3JcIiwgY29sb3JzLkJhY2tncm91bmQpXG5cdHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCItLWhlYWRlci1jb2xvclwiLCBjb2xvcnMuU2Vjb25kYXJ5KVxuXHRyb290LnN0eWxlLnNldFByb3BlcnR5KFwiLS10ZXh0LWxpZ2h0XCIsIGNvbG9ycy5UZXh0TGlnaHQpXG5cdHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCItLWJvcmRlci1jb2xvclwiLCBjb2xvcnMuQm9yZGVyKVxuXHRyb290LnN0eWxlLnNldFByb3BlcnR5KFwiLS1ob3Zlci1jb2xvclwiLCBjb2xvcnMuSG92ZXIpXG59XG5cbmZ1bmMgYXBwbHlQcmlzbVRoZW1lKHRoZW1lTmFtZSBzdHJpbmcpIHtcblx0aWQgOj0gXCJwcmlzbS10aGVtZVwiXG5cdGxpbmsgOj0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG5cdGhyZWYgOj0gXCIvY3NzL3ByaXNtLXRoZW1lcy9cIiArIHRoZW1lTmFtZSArIFwiLm1pbi5jc3NcIlxuXG5cdGlmIGxpbmsgIT0gbmlsIHtcblx0XHRsaW5rLmhyZWYgPSBocmVmXG5cdH0gZWxzZSB7XG5cdFx0bmV3TGluayA6PSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwibGlua1wiKVxuXHRcdG5ld0xpbmsuaWQgPSBpZFxuXHRcdG5ld0xpbmsucmVsID0gXCJzdHlsZXNoZWV0XCJcblx0XHRuZXdMaW5rLmhyZWYgPSBocmVmXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChuZXdMaW5rKVxuXHR9XG59XG5cbmZ1bmMgdXBkYXRlVGhlbWVDb2xvck1ldGEodGhlbWUgc3RyaW5nKSB7XG5cdG1ldGEgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIm1ldGFbbmFtZT1cXFwidGhlbWUtY29sb3JcXFwiXVwiKVxuXHRpZiBtZXRhICE9IG5pbCB7XG5cdFx0Y29sb3JzIDo9IGdldFRoZW1lQ29sb3JzKHRoZW1lKVxuXHRcdGlmIGNvbG9ycy5CYWNrZ3JvdW5kICE9IFwiXCIge1xuXHRcdFx0bWV0YS5zZXRBdHRyaWJ1dGUoXCJjb250ZW50XCIsIGNvbG9ycy5CYWNrZ3JvdW5kKVxuXHRcdH1cblx0fVxufVxuXG5mdW5jIGFwcGx5VGhlbWUodGhlbWUgc3RyaW5nKSB7XG5cdGN1cnJlbnRUaGVtZSA9IHRoZW1lXG5cdGRvY3VtZW50LmRvY3VtZW50RWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJkYXRhLXRoZW1lXCIsIHRoZW1lKVxuXHRjb2xvcnMgOj0gZ2V0VGhlbWVDb2xvcnModGhlbWUpXG5cdGFwcGx5Q29sb3JTY2hlbWUoY29sb3JzKVxuXHR1cGRhdGVUaGVtZUNvbG9yTWV0YSh0aGVtZSlcblx0aWYgY29sb3JzLkNvZGVUaGVtZSAhPSBcIlwiIHtcblx0XHRhcHBseVByaXNtVGhlbWUoY29sb3JzLkNvZGVUaGVtZSlcblx0fVxuXHR1cGRhdGVHaXNjdXNUaGVtZSgpXG5cdGlmIHdpbmRvdy5tZXJtYWlkICE9IG5pbCB7XG5cdFx0cmVuZGVyTWVybWFpZCgpXG5cdH1cbn1cblxuZnVuYyBuZXh0VGhlbWUoY3VycmVudCBzdHJpbmcpIHN0cmluZyB7XG5cdGlmIGN1cnJlbnQgPT0gXCJkYXJrXCIge1xuXHRcdHJldHVybiBcImxpZ2h0XCJcblx0fVxuXHRyZXR1cm4gXCJkYXJrXCJcbn1cblxuZnVuYyB0b2dnbGVUaGVtZSgpIHtcblx0bmV4dCA6PSBuZXh0VGhlbWUoY3VycmVudFRoZW1lKVxuXHR3aW5kb3cubG9jYWxTdG9yYWdlLnNldEl0ZW0odGhlbWVTdG9yYWdlS2V5LCBuZXh0KVxuXHRhcHBseVRoZW1lKG5leHQpXG59XG5cbmZ1bmMgaW5pdFRoZW1lKCkge1xuXHRpbml0aWFsIDo9IGdldEluaXRpYWxUaGVtZSgpXG5cdGFwcGx5VGhlbWUoaW5pdGlhbClcbn1cbiIsInBhY2thZ2UgbWFpblxuXG4vLyDilIDilIAgUm91dGluZyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxudHlwZSBSb3V0ZSBpbnRcblxuY29uc3QgKFxuXHRSb3V0ZUJsb2cgUm91dGUgPSBpb3RhXG5cdFJvdXRlUG9zdFxuXHRSb3V0ZVByb2plY3Rcblx0Um91dGVQYWdlXG5cdFJvdXRlTm90Rm91bmRcbilcblxudHlwZSBSb3V0ZU1hdGNoIHN0cnVjdCB7XG5cdEtpbmQgIFJvdXRlXG5cdFBhcmFtIHN0cmluZyAvLyBwb3N0IHNsdWcsIHByb2plY3QgaWQgb3IgcGFnZSBpZFxuXHRQYWdlICBpbnQgICAgLy8gYmxvZyBwYWdlIG51bWJlciAoUm91dGVCbG9nIG9ubHksID49IDEpXG59XG5cbi8vIOKUgOKUgCBEYXRhIHN0cnVjdHMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbnR5cGUgUHJvamVjdExpbmsgc3RydWN0IHtcblx0VGl0bGUgc3RyaW5nXG5cdEljb24gIHN0cmluZ1xuXHRIcmVmICBzdHJpbmdcbn1cblxudHlwZSBQcm9qZWN0IHN0cnVjdCB7XG5cdElEICAgICAgICAgICAgICAgc3RyaW5nXG5cdFRpdGxlICAgICAgICAgICAgc3RyaW5nXG5cdERlc2NyaXB0aW9uICAgICAgc3RyaW5nXG5cdFRhZ3MgICAgICAgICAgICAgW11zdHJpbmdcblx0T3JkZXIgICAgICAgICAgICBpbnRcblx0R2l0aHViUmVwbyAgICAgICBzdHJpbmdcblx0R2l0aHViQnJhbmNoICAgICBzdHJpbmdcblx0RGVtb1VybCAgICAgICAgICBzdHJpbmdcblx0RGVtb0xhYmVsICAgICAgICBzdHJpbmdcblx0RGVtb0luc3RydWN0aW9ucyBzdHJpbmdcblx0RGVtb0hlaWdodCAgICAgICBzdHJpbmdcblx0RGVtb0Z1bGxzY3JlZW4gICBib29sXG5cdFlvdXR1YmVWaWRlb3MgICAgW11zdHJpbmdcblx0TGlua3MgICAgICAgICAgICBbXVByb2plY3RMaW5rXG5cdEhyZWYgICAgICAgICAgICAgc3RyaW5nXG59XG5cbnR5cGUgQmxvZ1Bvc3Qgc3RydWN0IHtcblx0U2x1ZyAgICAgc3RyaW5nXG5cdFRpdGxlICAgIHN0cmluZ1xuXHREYXRlICAgICBzdHJpbmdcblx0RXhjZXJwdCAgc3RyaW5nXG5cdFRhZ3MgICAgIFtdc3RyaW5nXG5cdEZpbGVuYW1lIHN0cmluZ1xuXHRIcmVmICAgICBzdHJpbmdcbn1cblxudHlwZSBOYXZQYWdlIHN0cnVjdCB7XG5cdElEICAgICAgICBzdHJpbmdcblx0VGl0bGUgICAgIHN0cmluZ1xuXHRPcmRlciAgICAgaW50XG5cdFNob3dJbk5hdiBib29sXG5cdEhyZWYgICAgICBzdHJpbmdcbn1cblxuLy8g4pSA4pSAIFJvdXRlIHZpZXcgc3RhdGUg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbnR5cGUgTG9hZFN0YXR1cyBpbnRcblxuY29uc3QgKFxuXHRMb2FkUmVhZHkgICBMb2FkU3RhdHVzID0gaW90YSAvLyBjb250ZW50IGF2YWlsYWJsZSBvciBub3RoaW5nIHRvIGxvYWRcblx0TG9hZFBlbmRpbmcgICAgICAgICAgICAgICAgICAgLy8gcmVzb2x2ZXIgd2FudHMgYSBmZXRjaDsgbmV2ZXIgcmVuZGVyZWQgKHJvdXRlcyBwYWludCBvbmNlLCBhZnRlciB0aGUgZmV0Y2gpXG5cdExvYWRGYWlsZWRcblx0TG9hZE5vdEZvdW5kXG4pXG5cbnR5cGUgVE9DSXRlbSBzdHJ1Y3Qge1xuXHRJRCAgICBzdHJpbmdcblx0VGV4dCAgc3RyaW5nXG5cdExldmVsIGludFxufVxuXG4vLyBjYWNoZWRDb250ZW50IGlzIGEgcmVuZGVyZWQgcm91dGUgYm9keTsgYW4gZW1wdHkgSFRNTCBjb3VudHMgYXMgYSBjYWNoZSBtaXNzLlxudHlwZSBjYWNoZWRDb250ZW50IHN0cnVjdCB7XG5cdEhUTUwgc3RyaW5nXG5cdFRPQyAgW11UT0NJdGVtXG59XG5cbi8vIFZpZXdTdGF0ZSBpcyB0aGUgc3RhdGUgb2YgdGhlIGN1cnJlbnQgcm91dGUncyBjb250ZW50IHJlZ2lvbi5cbi8vIE9ubHkgdGhlIGZpZWxkIG1hdGNoaW5nIHJvdXRlLktpbmQgaXMgcG9wdWxhdGVkLiBBbHdheXMgYnVpbGQgaXQgd2l0aFxuLy8gbmV3Vmlld1N0YXRlKCk6IGEgYmFyZSBzdHJ1Y3QgbGl0ZXJhbCBsZWF2ZXMgU3RhdHVzIGFzIG51bGwsIG5vdCBMb2FkUmVhZHkuXG50eXBlIFZpZXdTdGF0ZSBzdHJ1Y3Qge1xuXHRQb3N0ICAgICBCbG9nUG9zdFxuXHRQcm9qICAgICBQcm9qZWN0IC8vIG5vdCBgUHJvamVjdGA6IGEgZmllbGQgbmFtZWQgYWZ0ZXIgaXRzIHR5cGUgYnJlYWtzIHRoZSBlbWl0dGVkIGNvbnN0cnVjdG9yXG5cdFBhZ2UgICAgIE5hdlBhZ2Vcblx0SFRNTCAgICAgc3RyaW5nIC8vIHJlbmRlcmVkIG1hcmtkb3duIGZvciBwb3N0LCByZWFkbWUgb3IgcGFnZVxuXHRTdGF0dXMgICBMb2FkU3RhdHVzXG5cdEhhc1ByZXYgIGJvb2xcblx0UHJldlBvc3QgQmxvZ1Bvc3Rcblx0SGFzTmV4dCAgYm9vbFxuXHROZXh0UG9zdCBCbG9nUG9zdFxuXHRUT0MgICAgICBbXVRPQ0l0ZW1cbn1cblxudHlwZSBTb2NpYWxMaW5rIHN0cnVjdCB7XG5cdEljb24gICBzdHJpbmdcblx0SHJlZiAgIHN0cmluZ1xuXHRUYXJnZXQgc3RyaW5nXG5cdFJlbCAgICBzdHJpbmdcbn1cblxudHlwZSBUaGVtZUNvbG9ycyBzdHJ1Y3Qge1xuXHRQcmltYXJ5ICAgICAgIHN0cmluZ1xuXHRTZWNvbmRhcnkgICAgIHN0cmluZ1xuXHRCYWNrZ3JvdW5kICAgIHN0cmluZ1xuXHRUZXh0ICAgICAgICAgIHN0cmluZ1xuXHRUZXh0TGlnaHQgICAgIHN0cmluZ1xuXHRCb3JkZXIgICAgICAgIHN0cmluZ1xuXHRIb3ZlciAgICAgICAgIHN0cmluZ1xuXHRDb2RlVGhlbWUgICAgIHN0cmluZ1xuXHRDb21tZW50c1RoZW1lIHN0cmluZ1xufVxuXG4vLyBDb21tZW50c0NvbmZpZyBob2xkcyB0aGUgdHdvIHBhZ2UgdG9nZ2xlczsgQXR0cnMgaXMgdGhlIHJhdyBnaXNjdXMgY29uZmlnXG4vLyBvYmplY3Qgd2hvc2UgY2FtZWxDYXNlIGtleXMgbWFwIDE6MSB0byBkYXRhLSogYXR0cmlidXRlcyBvbiB0aGUgY2xpZW50IHNjcmlwdC5cbnR5cGUgQ29tbWVudHNDb25maWcgc3RydWN0IHtcblx0QmxvZ0VuYWJsZWQgICAgIGJvb2xcblx0UHJvamVjdHNFbmFibGVkIGJvb2xcblx0QXR0cnMgICAgICAgICAgIGFueVxufVxuXG50eXBlIEVtYWlsSlNDb25maWcgc3RydWN0IHtcblx0RW5hYmxlZCAgIGJvb2xcblx0U2VydmljZUlkIHN0cmluZ1xuXHRUZW1wbGF0ZUlkIHN0cmluZ1xuXHRQdWJsaWNLZXkgc3RyaW5nXG59XG5cbnR5cGUgU2VhcmNoQ29uZmlnIHN0cnVjdCB7XG5cdEVuYWJsZWQgICAgIGJvb2xcblx0TWluQ2hhcnMgICAgaW50XG5cdFBsYWNlaG9sZGVyIHN0cmluZ1xufVxuXG50eXBlIFNpdGVDb25maWcgc3RydWN0IHtcblx0VGl0bGUgICAgICAgICAgc3RyaW5nXG5cdFVybCAgICAgICAgICAgIHN0cmluZ1xuXHREZXNjcmlwdGlvbiAgICBzdHJpbmdcblx0QXV0aG9yICAgICAgICAgc3RyaW5nXG5cdEdpdGh1YlVzZXJuYW1lIHN0cmluZ1xuXHREYXJrVGhlbWUgICAgICBUaGVtZUNvbG9yc1xuXHRMaWdodFRoZW1lICAgICBUaGVtZUNvbG9yc1xuXHRDb21tZW50cyAgICAgICBDb21tZW50c0NvbmZpZ1xuXHRFbWFpbEpTICAgICAgICBFbWFpbEpTQ29uZmlnXG5cdFNlYXJjaCAgICAgICAgIFNlYXJjaENvbmZpZ1xuXHRTb2NpYWwgICAgICAgICBbXVNvY2lhbExpbmtcblx0UG9zdHNQZXJQYWdlICAgaW50XG59XG5cbnR5cGUgU2VhcmNoUmVzdWx0SXRlbSBzdHJ1Y3Qge1xuXHRJRCAgICAgICAgICBzdHJpbmdcblx0VGl0bGUgICAgICAgc3RyaW5nXG5cdERlc2NyaXB0aW9uIHN0cmluZ1xuXHRUYWdzICAgICAgICBbXXN0cmluZ1xuXHRJdGVtVHlwZSAgICBzdHJpbmdcblx0VXJsICAgICAgICAgc3RyaW5nXG59XG5cbnR5cGUgQ29udGFjdFN0YXRlIHN0cnVjdCB7XG5cdE5hbWUgICAgICAgICAgIHN0cmluZ1xuXHRFbWFpbCAgICAgICAgICBzdHJpbmdcblx0TWVzc2FnZSAgICAgICAgc3RyaW5nXG5cdFN0YXR1c1RleHQgICAgIHN0cmluZ1xuXHRTdGF0dXNUeXBlICAgICBzdHJpbmdcblx0QnV0dG9uU3RhdGUgICAgc3RyaW5nXG5cdEJ1dHRvbkRpc2FibGVkIGJvb2xcblx0RXJyTmFtZSAgICAgICAgYm9vbFxuXHRFcnJFbWFpbCAgICAgICBib29sXG5cdEVyck1lc3NhZ2UgICAgIGJvb2xcbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJqczouL2Jyb3dzZXIuZC50c1wiXG5pbXBvcnQgXCJzdHJjb252XCJcblxudmFyIGFwcFJlZnMgPSBtYXBbc3RyaW5nXWFueXt9XG5cbi8vIOKUgOKUgCBSZWdpb24gcmVuZGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbi8vIFRoZSBhcHAgc2hlbGwgaXMgbW91bnRlZCBvbmNlIGluIG1haW4oKTsgdGhlc2UgcmUtcmVuZGVyIG9ubHkgdGhlXG4vLyByZWdpb24gdGhhdCBkZXBlbmRzIG9uIHRoZSBzdGF0ZSB0aGF0IGNoYW5nZWQuXG5cbmZ1bmMgcmVuZGVyTWFpbigpIHtcblx0Z29tLk1vdW50KFwiI2NvbnRlbnQtc2xvdFwiLCBNYWluQ29udGVudCgpKVxufVxuXG5mdW5jIHJlbmRlck5hdmJhcigpIHtcblx0Z29tLk1vdW50KFwiI25hdmJhci1zbG90XCIsIE5hdmJhcihyb3V0ZSwgbmF2UGFnZXMsIHByb2plY3RzLCBwcm9qZWN0c0Ryb3Bkb3duT3BlbiwgbW9iaWxlTWVudU9wZW4sIHNpdGUpKVxufVxuXG5mdW5jIHJlbmRlckNvbnRhY3RGb3JtKCkge1xuXHRnb20uTW91bnQoXCIjY29udGFjdC1mb3JtXCIsIENvbnRhY3RGb3JtRmllbGRzKGNvbnRhY3RGb3JtKSlcbn1cblxuZnVuYyByZW5kZXJSb3V0ZSgpIHtcblx0cmVuZGVyTmF2YmFyKClcblx0cmVuZGVyTWFpbigpXG59XG5cbi8vIOKUgOKUgCBPdmVybGF5IHJlY29uY2lsaWF0aW9uIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jIHNldENsYXNzKHNlbGVjdG9yIHN0cmluZywgY2xzIHN0cmluZywgb24gYm9vbCkge1xuXHRlbCA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuXHRpZiBlbCAhPSBuaWwge1xuXHRcdGVsLmNsYXNzTGlzdC50b2dnbGUoY2xzLCBvbilcblx0fVxufVxuXG5mdW5jIHNldEF0dHIoc2VsZWN0b3Igc3RyaW5nLCBuYW1lIHN0cmluZywgdmFsdWUgc3RyaW5nKSB7XG5cdGVsIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG5cdGlmIGVsICE9IG5pbCB7XG5cdFx0ZWwuc2V0QXR0cmlidXRlKG5hbWUsIHZhbHVlKVxuXHR9XG59XG5cbi8vIGZvY3VzTGF0ZXIgZm9jdXNlcyB0aGUgZWxlbWVudCBvbmNlIHRoZSBvdmVybGF5J3Mgb3BlbiB0cmFuc2l0aW9uIGhhcyBzdGFydGVkLlxuZnVuYyBmb2N1c0xhdGVyKHNlbGVjdG9yIHN0cmluZykge1xuXHRzZXRUaW1lb3V0KGZ1bmMoKSB7XG5cdFx0ZWwgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcilcblx0XHRpZiBlbCAhPSBuaWwge1xuXHRcdFx0ZWwuZm9jdXMoKVxuXHRcdH1cblx0fSwgNTApXG59XG5cbi8vIHN5bmNPdmVybGF5cyBhcHBsaWVzIG92ZXJsYXkgc3RhdGUgdG8gdGhlIGV4aXN0aW5nIGVsZW1lbnRzIGluc3RlYWQgb2Zcbi8vIHJlbW91bnRpbmcgdGhlbSwgc28gdGhlIENTUyBtYXgtaGVpZ2h0L2tleWZyYW1lIHRyYW5zaXRpb25zIHN0aWxsIHBsYXkuXG5mdW5jIHN5bmNPdmVybGF5cygpIHtcblx0c2V0Q2xhc3MoXCIubmF2YmFyLXRvZ2dsZVwiLCBcImFjdGl2ZVwiLCBtb2JpbGVNZW51T3Blbilcblx0c2V0QXR0cihcIi5uYXZiYXItdG9nZ2xlXCIsIFwiYXJpYS1leHBhbmRlZFwiLCBzdHJjb252LkZvcm1hdEJvb2wobW9iaWxlTWVudU9wZW4pKVxuXHRzZXRDbGFzcyhcIi5uYXZiYXItY29sbGFwc2VcIiwgXCJzaG93XCIsIG1vYmlsZU1lbnVPcGVuKVxuXG5cdHNldENsYXNzKFwiLmRyb3Bkb3duXCIsIFwic2hvd1wiLCBwcm9qZWN0c0Ryb3Bkb3duT3Blbilcblx0c2V0QXR0cihcIi5kcm9wZG93bi10b2dnbGVcIiwgXCJhcmlhLWV4cGFuZGVkXCIsIHN0cmNvbnYuRm9ybWF0Qm9vbChwcm9qZWN0c0Ryb3Bkb3duT3BlbikpXG5cblx0c2V0Q2xhc3MoXCIjc2VhcmNoLXBhZ2VcIiwgXCJzaG93XCIsIHNlYXJjaE9wZW4pXG5cdHNldENsYXNzKFwiI3NlYXJjaC1wYWdlLWNsZWFyXCIsIFwic2hvd1wiLCBzZWFyY2hRdWVyeSAhPSBcIlwiKVxuXHRzZXRDbGFzcyhcIiNjb250YWN0LW1vZGFsXCIsIFwic2hvd1wiLCBjb250YWN0T3Blbilcbn1cblxuLy8gcmVzZXRPdmVybGF5cyBjbG9zZXMgZXZlcnkgb3ZlcmxheSB3aXRob3V0IGFuaW1hdGlvbiAodXNlZCBvbiByb3V0ZSBjaGFuZ2UpLlxuZnVuYyByZXNldE92ZXJsYXlzKCkge1xuXHRtb2JpbGVNZW51T3BlbiA9IGZhbHNlXG5cdHByb2plY3RzRHJvcGRvd25PcGVuID0gZmFsc2Vcblx0Y29udGFjdE9wZW4gPSBmYWxzZVxuXHRpZiBzZWFyY2hPcGVuIHx8IHNlYXJjaFF1ZXJ5ICE9IFwiXCIge1xuXHRcdHNlYXJjaE9wZW4gPSBmYWxzZVxuXHRcdHNldFNlYXJjaFF1ZXJ5KFwiXCIpXG5cdH1cblx0c3luY092ZXJsYXlzKClcbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJzdHJpbmdzXCJcblxuLy8gbmV3Vmlld1N0YXRlIHJldHVybnMgYSBWaWV3U3RhdGUgd2l0aCBldmVyeSBuZXN0ZWQgc2xpY2UgaW5pdGlhbGlzZWQgc29cbi8vIHRlbXBsIGBsZW5gL2ByYW5nZWAgbmV2ZXIgc2VlIGEgbmlsIHNsaWNlLiBTdGF0dXMgaXMgc2V0IGV4cGxpY2l0bHkgYmVjYXVzZVxuLy8gbmFtZWQtaW50IGZpZWxkcyBjb21waWxlIHRvIG51bGwsIG5vdCAwLlxuZnVuYyBuZXdWaWV3U3RhdGUoKSBWaWV3U3RhdGUge1xuXHRyZXR1cm4gVmlld1N0YXRle1xuXHRcdFBvc3Q6ICAgICBCbG9nUG9zdHtUYWdzOiBbXXN0cmluZ3t9fSxcblx0XHRQcm9qOiAgICAgUHJvamVjdHtUYWdzOiBbXXN0cmluZ3t9LCBZb3V0dWJlVmlkZW9zOiBbXXN0cmluZ3t9LCBMaW5rczogW11Qcm9qZWN0TGlua3t9fSxcblx0XHRTdGF0dXM6ICAgTG9hZFJlYWR5LFxuXHRcdFByZXZQb3N0OiBCbG9nUG9zdHtUYWdzOiBbXXN0cmluZ3t9fSxcblx0XHROZXh0UG9zdDogQmxvZ1Bvc3R7VGFnczogW11zdHJpbmd7fX0sXG5cdFx0VE9DOiAgICAgIFtdVE9DSXRlbXt9LFxuXHR9XG59XG5cbi8vIGZyb21DYWNoZSBjb3BpZXMgYSBjYWNoZSBoaXQgaW50byB2IGFuZCByZXBvcnRzIHdoZXRoZXIgdGhlcmUgd2FzIG9uZS5cbmZ1bmMgZnJvbUNhY2hlKHYgKlZpZXdTdGF0ZSwgY2FjaGUgbWFwW3N0cmluZ11jYWNoZWRDb250ZW50LCBrZXkgc3RyaW5nKSBib29sIHtcblx0Yywgb2sgOj0gY2FjaGVba2V5XVxuXHRpZiAhb2sgfHwgYy5IVE1MID09IFwiXCIge1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cdHYuSFRNTCA9IGMuSFRNTFxuXHR2LlRPQyA9IGMuVE9DXG5cdHJldHVybiB0cnVlXG59XG5cbi8vIHJlc29sdmVQb3N0IGJ1aWxkcyB0aGUgdmlldyBmb3IgYSBibG9nIHBvc3Qgc2x1Zy4gVGhlIGJvb2wgcmVwb3J0cyB3aGV0aGVyXG4vLyB0aGUgbWFya2Rvd24gc3RpbGwgaGFzIHRvIGJlIGZldGNoZWQuXG5mdW5jIHJlc29sdmVQb3N0KHNsdWcgc3RyaW5nLCBhbGwgW11CbG9nUG9zdCwgY2FjaGUgbWFwW3N0cmluZ11jYWNoZWRDb250ZW50KSAoVmlld1N0YXRlLCBib29sKSB7XG5cdHYgOj0gbmV3Vmlld1N0YXRlKClcblx0Zm9yIGksIHAgOj0gcmFuZ2UgYWxsIHtcblx0XHRpZiBwLlNsdWcgPT0gc2x1ZyB7XG5cdFx0XHR2LlBvc3QgPSBwXG5cdFx0XHRpZiBpKzEgPCBsZW4oYWxsKSB7XG5cdFx0XHRcdHYuSGFzUHJldiA9IHRydWVcblx0XHRcdFx0di5QcmV2UG9zdCA9IGFsbFtpKzFdXG5cdFx0XHR9XG5cdFx0XHRpZiBpID4gMCB7XG5cdFx0XHRcdHYuSGFzTmV4dCA9IHRydWVcblx0XHRcdFx0di5OZXh0UG9zdCA9IGFsbFtpLTFdXG5cdFx0XHR9XG5cdFx0XHRpZiBmcm9tQ2FjaGUoJnYsIGNhY2hlLCBwLkhyZWYpIHtcblx0XHRcdFx0cmV0dXJuIHYsIGZhbHNlXG5cdFx0XHR9XG5cdFx0XHR2LlN0YXR1cyA9IExvYWRQZW5kaW5nXG5cdFx0XHRyZXR1cm4gdiwgdHJ1ZVxuXHRcdH1cblx0fVxuXHR2LlN0YXR1cyA9IExvYWROb3RGb3VuZFxuXHRyZXR1cm4gdiwgZmFsc2Vcbn1cblxuLy8gcmVzb2x2ZVByb2plY3QgYnVpbGRzIHRoZSB2aWV3IGZvciBhIHByb2plY3QgaWQuIFByb2plY3RzIHdpdGhvdXQgYSBHaXRIdWJcbi8vIHJlcG8gYXJlIHJlYWR5IGltbWVkaWF0ZWx5OyBvdGhlcndpc2UgdGhlIFJFQURNRSBjYWNoZSBkZWNpZGVzLlxuZnVuYyByZXNvbHZlUHJvamVjdChpZCBzdHJpbmcsIGFsbCBbXVByb2plY3QsIGNhY2hlIG1hcFtzdHJpbmddY2FjaGVkQ29udGVudCkgKFZpZXdTdGF0ZSwgYm9vbCkge1xuXHR2IDo9IG5ld1ZpZXdTdGF0ZSgpXG5cdGZvciBfLCBwIDo9IHJhbmdlIGFsbCB7XG5cdFx0aWYgcC5JRCA9PSBpZCB7XG5cdFx0XHR2LlByb2ogPSBwXG5cdFx0XHRpZiBwLkdpdGh1YlJlcG8gPT0gXCJcIiB7XG5cdFx0XHRcdHYuVE9DID0gZXh0cmFjdFByb2plY3RUT0MoXCJcIiwgcClcblx0XHRcdFx0cmV0dXJuIHYsIGZhbHNlXG5cdFx0XHR9XG5cdFx0XHRpZiBmcm9tQ2FjaGUoJnYsIGNhY2hlLCBwLkhyZWYpIHtcblx0XHRcdFx0cmV0dXJuIHYsIGZhbHNlXG5cdFx0XHR9XG5cdFx0XHR2LlN0YXR1cyA9IExvYWRQZW5kaW5nXG5cdFx0XHRyZXR1cm4gdiwgdHJ1ZVxuXHRcdH1cblx0fVxuXHR2LlN0YXR1cyA9IExvYWROb3RGb3VuZFxuXHRyZXR1cm4gdiwgZmFsc2Vcbn1cblxuLy8gcmVzb2x2ZVBhZ2UgYnVpbGRzIHRoZSB2aWV3IGZvciBhIGN1c3RvbSBwYWdlIGlkLiBVbmtub3duIGlkcyBzdGlsbCBmZXRjaCxcbi8vIHNvIHRoZSBtYXJrZG93biBmaWxlIChvciBpdHMgNDA0KSBpcyB0aGUgc291cmNlIG9mIHRydXRoLlxuZnVuYyByZXNvbHZlUGFnZShpZCBzdHJpbmcsIGFsbCBbXU5hdlBhZ2UsIGNhY2hlIG1hcFtzdHJpbmddY2FjaGVkQ29udGVudCkgKFZpZXdTdGF0ZSwgYm9vbCkge1xuXHR2IDo9IG5ld1ZpZXdTdGF0ZSgpXG5cdHYuUGFnZSA9IE5hdlBhZ2V7SUQ6IGlkLCBUaXRsZTogaWQsIEhyZWY6IG5hdlBhZ2VIcmVmKGlkKX1cblx0Zm9yIF8sIHAgOj0gcmFuZ2UgYWxsIHtcblx0XHRpZiBwLklEID09IGlkIHtcblx0XHRcdHYuUGFnZSA9IHBcblx0XHRcdGJyZWFrXG5cdFx0fVxuXHR9XG5cdGlmIHYuUGFnZS5UaXRsZSA9PSBcIlwiIHtcblx0XHR2LlBhZ2UuVGl0bGUgPSBpZFxuXHR9XG5cdGlmIGZyb21DYWNoZSgmdiwgY2FjaGUsIHYuUGFnZS5IcmVmKSB7XG5cdFx0cmV0dXJuIHYsIGZhbHNlXG5cdH1cblx0di5TdGF0dXMgPSBMb2FkUGVuZGluZ1xuXHRyZXR1cm4gdiwgdHJ1ZVxufVxuXG5mdW5jIHJlYWRtZVVSTChwIFByb2plY3QsIGdpdGh1YlVzZXJuYW1lIHN0cmluZykgc3RyaW5nIHtcblx0cmVwbyA6PSBwLkdpdGh1YlJlcG9cblx0aWYgIXN0cmluZ3MuQ29udGFpbnMocmVwbywgXCIvXCIpIHtcblx0XHRyZXBvID0gZ2l0aHViVXNlcm5hbWUgKyBcIi9cIiArIHJlcG9cblx0fVxuXHRicmFuY2ggOj0gcC5HaXRodWJCcmFuY2hcblx0aWYgYnJhbmNoID09IFwiXCIge1xuXHRcdGJyYW5jaCA9IFwibWFpblwiXG5cdH1cblx0cmV0dXJuIFwiaHR0cHM6Ly9yYXcuZ2l0aHVidXNlcmNvbnRlbnQuY29tL1wiICsgcmVwbyArIFwiL1wiICsgYnJhbmNoICsgXCIvUkVBRE1FLm1kXCJcbn1cbiJdfQ==
