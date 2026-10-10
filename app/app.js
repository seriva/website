var __injectStyles = __injectStyles || function(css) {
  if (typeof document === "undefined" || !document || !document.head || !css) return;
  let s = document.getElementById("gofront-styles");
  if (!s) {
    s = document.createElement("style");
    s.id = "gofront-styles";
    document.head.appendChild(s);
  }
  s.textContent += "\n" + css;
};
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
var __gopanic = __gopanic || { stack: [], armed: false };
var __runDefers = __runDefers || function(defers, frame) {
  for (let i = defers.length - 1; i >= 0; i--) {
    __gopanic.armed = true;
    try { defers[i](); }
    catch (e) {
      if (frame.pn !== null) __gopanic.stack.pop();
      frame.pn = { err: e, recovered: false };
      __gopanic.stack.push(frame.pn);
    } finally { __gopanic.armed = false; }
  }
  if (frame.pn !== null) {
    __gopanic.stack.pop();
    if (!frame.pn.recovered) throw frame.pn.err;
  }
};
var __recover = __recover || function(ok) {
  if (!ok) return null;
  const s = __gopanic.stack;
  const top = s.length > 0 ? s[s.length - 1] : null;
  if (top === null || top.recovered) return null;
  top.recovered = true;
  return top.err?.message ?? String(top.err);
};
var __error = __error || function(msg, cause) {
  return { Error() { return msg; }, toString() { return msg; }, _msg: msg, _cause: cause ?? null };
};
var __strconv_atoi = __strconv_atoi || function(s) {
  if (!/^[+-]?[0-9]+$/.test(s)) return [0n, 'strconv.Atoi: parsing "' + s + '": invalid syntax'];
  const v = BigInt(s);
  if (v > 9223372036854775807n || v < -9223372036854775808n) {
    return [v > 0n ? 9223372036854775807n : -9223372036854775808n, 'strconv.Atoi: parsing "' + s + '": value out of range'];
  }
  return [v, null];
};
var __strconv_parse_int = __strconv_parse_int || function(s, base, bits) {
  let str = s, neg = false;
  if (str[0] === "-" || str[0] === "+") { neg = str[0] === "-"; str = str.slice(1); }
  if (base === 0) {
    if (/^0[xX]/.test(str)) { base = 16; str = str.slice(2); }
    else if (/^0[bB]/.test(str)) { base = 2; str = str.slice(2); }
    else if (/^0[oO]/.test(str)) { base = 8; str = str.slice(2); }
    else if (/^0[0-9]/.test(str)) { base = 8; str = str.slice(1); }
    else base = 10;
    str = str.replaceAll("_", "");
  }
  if (base < 2 || base > 36) return [0n, 'strconv.ParseInt: parsing "' + s + '": invalid base ' + base];
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, base);
  if (str === "" || [...str.toLowerCase()].some((c) => !digits.includes(c))) {
    return [0n, 'strconv.ParseInt: parsing "' + s + '": invalid syntax'];
  }
  let v = 0n; const B = BigInt(base);
  for (const c of str.toLowerCase()) v = v * B + BigInt(digits.indexOf(c));
  if (neg) v = -v;
  const w = bits === 0 ? 64 : bits;
  const max = (1n << BigInt(w - 1)) - 1n, min = -(1n << BigInt(w - 1));
  if (v > max || v < min) return [v > max ? max : min, 'strconv.ParseInt: parsing "' + s + '": value out of range'];
  return [v, null];
};
var __strconv_parse_float = __strconv_parse_float || function(s) {
  const str = s.replaceAll("_", "");
  if (/^[+-]?(inf|infinity)$/i.test(str)) return [str[0] === "-" ? -Infinity : Infinity, null];
  if (/^[+-]?nan$/i.test(str)) return [NaN, null];
  if (str === "" || !/^[+-]?(\d+\.?\d*|\.\d+)([eE][+-]?\d+)?$|^[+-]?0[xX][0-9a-fA-F]+$/.test(str)) {
    return [0, 'strconv.ParseFloat: parsing "' + s + '": invalid syntax'];
  }
  return [Number(str), null];
};
var __strconv_parse_bool = __strconv_parse_bool || function(s) {
  if (["1", "t", "T", "TRUE", "true", "True"].includes(s)) return [true, null];
  if (["0", "f", "F", "FALSE", "false", "False"].includes(s)) return [false, null];
  return [false, 'strconv.ParseBool: parsing "' + s + '": invalid syntax'];
};
var __strconv_format_float = __strconv_format_float || function(f, fmtc, prec) {
  const c = String.fromCharCode(fmtc);
  if (!Number.isFinite(f)) return f !== f ? "NaN" : (f > 0 ? "+Inf" : "-Inf");
  if (c === "f") return prec < 0 ? String(f) : f.toFixed(prec);
  if (c === "e" || c === "E") {
    const r = prec < 0 ? f.toExponential() : f.toExponential(prec);
    const o = r.replace(/e([+-])(\d)$/, "e$10$2");
    return c === "E" ? o.toUpperCase() : o;
  }
  if (c === "g" || c === "G") {
    const r = prec < 0 ? String(f) : f.toPrecision(prec);
    return c === "G" ? r.toUpperCase() : r;
  }
  return String(f);
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

const emailJSSrc = "https://cdn.jsdelivr.net/npm/@emailjs/browser@5.0.2/dist/email.min.js";

const emailJSIntegrity = "sha384-V6KRexbfAf9Omg2u7kh3sclVxYiK5mAuz/6E4WmpSQ3KO+ZjgX7SCoqhMOrLKfeG";

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
    ___e1.className = "error-message " + errorMessageStyle();
    const ___e2 = document.createElement("h1");
    ___e2.appendChild(document.createTextNode(String(t("general.notFound"))));
    ___e1.appendChild(___e2);
    const ___e3 = document.createElement("p");
    ___e3.appendChild(document.createTextNode(String(t("general.notFoundMessage"))));
    ___e1.appendChild(___e3);
    const ___e4 = document.createElement("div");
    ___e4.className = "download-buttons " + downloadButtonsStyle();
    ___e4.setAttribute("style", "margin-top: 1.5rem; justify-content: center;");
    const ___e5 = document.createElement("a");
    ___e5.setAttribute("href", "/");
    ___e5.className = "btn btn-primary download-btn " + downloadBtnStyle();
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

function mainContentStyle() {
  return "gfc_mainContentStyle_dpxcuw";
}

function MainContent() {
  return {Mount(___p, ___refs) {
    const ___e6 = document.createElement("main");
    ___e6.setAttribute("id", "main-content");
    ___e6.className = mainContentStyle();
    ___e6.setAttribute("tabindex", "-1");
    (RouteView(route)).Mount(___e6, ___refs);
    ___p.appendChild(___e6);
  }};
}

function appShellStyle() {
  return "gfc_appShellStyle_hypyhi";
}

function AppShell() {
  return {Mount(___p, ___refs) {
    const ___e7 = document.createElement("div");
    if(___refs)___refs["appRoot"]=___e7;
    ___e7.className = "app-root " + appShellStyle();
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

function blogCardStyle() {
  return "gfc_blogCardStyle_1ge5308";
}

function BlogPostCard(post) {
  return {Mount(___p, ___refs) {
    const ___e12 = document.createElement("article");
    ___e12.className = "blog-post-card " + blogCardStyle();
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
        ___e18.className = "item-tag clickable-tag " + itemTagStyle();
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

function paginationStyle() {
  return "gfc_paginationStyle_16wpmso";
}

function Pagination(currentPage, totalPages) {
  return {Mount(___p, ___refs) {
    const ___e20 = document.createElement("nav");
    ___e20.className = "blog-pagination " + paginationStyle();
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

function blogListStyle() {
  return "gfc_blogListStyle_1clw6uj";
}

function BlogList(allPosts, currentPage, perPage) {
  return {Mount(___p, ___refs) {
    const ___e32 = document.createElement("div");
    ___e32.className = "blog-container " + blogListStyle();
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

function tocStyle() {
  return "gfc_tocStyle_1cu92vr";
}

function TableOfContents(items) {
  return {Mount(___p, ___refs) {
    if (__len(items) >= 2) {
      const ___e36 = document.createElement("details");
      ___e36.className = "blog-toc " + tocStyle();
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

function postNavStyle() {
  return "gfc_postNavStyle_1hdu2x0";
}

function blogPostViewStyle() {
  return "gfc_blogPostViewStyle_1in8v7g";
}

function BlogPostView(v, commentsEnabled) {
  return {Mount(___p, ___refs) {
    if (v.Status === LoadNotFound || v.Status === LoadFailed) {
      const ___e42 = document.createElement("div");
      ___e42.className = "error-message " + errorMessageStyle();
      const ___e43 = document.createElement("h1");
      ___e43.appendChild(document.createTextNode(String(t("general.blogNotFound"))));
      ___e42.appendChild(___e43);
      const ___e44 = document.createElement("p");
      ___e44.appendChild(document.createTextNode(String(t("general.blogNotFoundMessage"))));
      ___e42.appendChild(___e44);
      ___p.appendChild(___e42);
    } else {
      const ___e45 = document.createElement("div");
      ___e45.className = "blog-post-view " + blogPostViewStyle();
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
          ___e49.className = "item-tag clickable-tag " + itemTagStyle();
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
      ___e51.className = "markdown-body " + markdownBodyStyle();
      ___e51.insertAdjacentHTML("beforeend", v.HTML);
      ___e50.appendChild(___e51);
      ___e45.appendChild(___e50);
      if (v.HasPrev || v.HasNext) {
        const ___e52 = document.createElement("nav");
        ___e52.className = "download-buttons blog-post-nav " + postNavStyle();
        ___e52.setAttribute("aria-label", "Post navigation");
        if (v.HasPrev) {
          const ___e53 = document.createElement("a");
          ___e53.setAttribute("href", String(v.PrevPost.Href));
          ___e53.className = "download-btn blog-nav-prev " + downloadBtnStyle();
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
          ___e55.className = "download-btn blog-nav-next " + downloadBtnStyle();
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
        ___e57.className = "giscus-container " + giscusStyle();
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

function contactModalStyle() {
  return "gfc_contactModalStyle_1akch0q";
}

function ContactModal(open, form) {
  return {Mount(___p, ___refs) {
    const ___e70 = document.createElement("div");
    ___e70.setAttribute("id", "contact-modal");
    ___e70.className = cls(contactModalStyle(), open, "show");
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
  const __frame = { pn: null };
  try {
    __defers.push(() => { (function() {
      const __recoverOk = __gopanic.armed; __gopanic.armed = false;
      {
        let r = __recover(__recoverOk);
        if (r != null) {
          console.warn("EmailJS preload failed:", r);
        }
      }
    })(); });
    await loadEmailJS();
  } catch (__err) {
    __frame.pn = { err: __err, recovered: false };
    __gopanic.stack.push(__frame.pn);
  } finally {
    __runDefers(__defers, __frame);
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
  const __frame = { pn: null };
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
      const __recoverOk = __gopanic.armed; __gopanic.armed = false;
      {
        let r = __recover(__recoverOk);
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
    __frame.pn = { err: __err, recovered: false };
    __gopanic.stack.push(__frame.pn);
  } finally {
    __runDefers(__defers, __frame);
  }
}

function footerStyle() {
  return "gfc_footerStyle_ebeppf";
}

function Footer(year, author) {
  return {Mount(___p, ___refs) {
    const ___e76 = document.createElement("footer");
    ___e76.className = footerStyle();
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
  const __frame = { pn: null };
  try {
    if (content === "") {
      return "";
    }
    __defers.push(() => { (function() {
      const __recoverOk = __gopanic.armed; __gopanic.armed = false;
      {
        let r = __recover(__recoverOk);
        if (r != null) {
          console.error("Error rendering markdown:", r);
        }
      }
    })(); });
    return marked.parse(content);
  } catch (__err) {
    __frame.pn = { err: __err, recovered: false };
    __gopanic.stack.push(__frame.pn);
  } finally {
    __runDefers(__defers, __frame);
  }
  return "";
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
  const __frame = { pn: null };
  try {
    __defers.push(() => { (function() {
      const __recoverOk = __gopanic.armed; __gopanic.armed = false;
      {
        let r = __recover(__recoverOk);
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
    __frame.pn = { err: __err, recovered: false };
    __gopanic.stack.push(__frame.pn);
  } finally {
    __runDefers(__defers, __frame);
  }
  return null;
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
  const __frame = { pn: null };
  try {
    __defers.push(() => { (function() {
      const __recoverOk = __gopanic.armed; __gopanic.armed = false;
      {
        let r = __recover(__recoverOk);
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
    __frame.pn = { err: __err, recovered: false };
    __gopanic.stack.push(__frame.pn);
  } finally {
    __runDefers(__defers, __frame);
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
  const __frame = { pn: null };
  try {
    __defers.push(() => { (function() {
      const __recoverOk = __gopanic.armed; __gopanic.armed = false;
      {
        let r = __recover(__recoverOk);
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
    __frame.pn = { err: __err, recovered: false };
    __gopanic.stack.push(__frame.pn);
  } finally {
    __runDefers(__defers, __frame);
  }
}

function navbarStyle() {
  return "gfc_navbarStyle_1jpcv7g";
}

function Navbar(r, pages, projects, dropdownOpen, mobileOpen, siteConfig) {
  return {Mount(___p, ___refs) {
    const ___e77 = document.createElement("nav");
    ___e77.className = "navbar " + navbarStyle();
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

function pageViewStyle() {
  return "gfc_pageViewStyle_rmw3pr";
}

function PageView(v) {
  return {Mount(___p, ___refs) {
    if (v.Status === LoadFailed) {
      const ___e104 = document.createElement("div");
      ___e104.className = "error-message " + errorMessageStyle();
      const ___e105 = document.createElement("h1");
      ___e105.appendChild(document.createTextNode(String(t("general.notFound"))));
      ___e104.appendChild(___e105);
      const ___e106 = document.createElement("p");
      ___e106.appendChild(document.createTextNode(String(t("general.notFoundMessage"))));
      ___e104.appendChild(___e106);
      ___p.appendChild(___e104);
    } else {
      const ___e107 = document.createElement("div");
      ___e107.className = "page-view " + pageViewStyle();
      const ___e108 = document.createElement("div");
      ___e108.className = "markdown-body " + markdownBodyStyle();
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
        ___e111.className = "markdown-body " + markdownBodyStyle();
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
      ___e112.className = "markdown-body " + markdownBodyStyle();
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
      ___e117.className = "markdown-body " + markdownBodyStyle();
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
        ___e124.className = "download-btn " + downloadBtnStyle();
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
      ___e126.className = "markdown-body " + markdownBodyStyle();
      const ___e127 = document.createElement("h2");
      ___e127.setAttribute("id", "project-links");
      ___e127.appendChild(document.createTextNode(String(t("project.links"))));
      ___e126.appendChild(___e127);
      const ___e128 = document.createElement("div");
      ___e128.className = "download-buttons " + downloadButtonsStyle();
      for (const link of links) {
        const ___e129 = document.createElement("a");
        ___e129.setAttribute("href", String(link.Href));
        ___e129.setAttribute("target", "_blank");
        ___e129.setAttribute("rel", "noopener noreferrer");
        ___e129.className = "download-btn " + downloadBtnStyle();
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

function projectDetailStyle() {
  return "gfc_projectDetailStyle_1pu2fpm";
}

function ProjectDetail(v, commentsEnabled) {
  return {Mount(___p, ___refs) {
    if (v.Status === LoadNotFound) {
      const ___e131 = document.createElement("div");
      ___e131.className = "error-message " + errorMessageStyle();
      const ___e132 = document.createElement("h1");
      ___e132.appendChild(document.createTextNode(String(t("general.projectNotFound"))));
      ___e131.appendChild(___e132);
      const ___e133 = document.createElement("p");
      ___e133.appendChild(document.createTextNode(String(t("general.projectNotFoundMessage"))));
      ___e131.appendChild(___e133);
      ___p.appendChild(___e131);
    } else {
      const ___e134 = document.createElement("div");
      ___e134.className = "project-detail " + projectDetailStyle();
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
          ___e138.className = "item-tag clickable-tag " + itemTagStyle();
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
        ___e139.className = "giscus-container " + giscusStyle();
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
      let [n, err] = ((r) => [Number(r[0]), r[1] === null ? null : __error(r[1])])(__strconv_atoi(rest));
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
        ___e142.className = cls("search-result-item blog-post-card " + blogCardStyle(), i === selectedIndex, "selected");
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
          ___e147.className = "item-tag " + itemTagStyle();
          ___e147.appendChild(document.createTextNode(String(t("badges.project"))));
          ___e146.appendChild(___e147);
        } else {
          const ___e148 = document.createElement("span");
          ___e148.className = "item-tag " + itemTagStyle();
          ___e148.appendChild(document.createTextNode(String(t("badges.blog"))));
          ___e146.appendChild(___e148);
        }
        for (const tag of item.Tags) {
          const ___e149 = document.createElement("span");
          ___e149.className = "item-tag " + itemTagStyle();
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

function searchModalStyle() {
  return "gfc_searchModalStyle_9hvz5o";
}

function SearchModal(open, query, results, selectedIndex, placeholder) {
  return {Mount(___p, ___refs) {
    const ___e151 = document.createElement("div");
    ___e151.setAttribute("id", "search-page");
    ___e151.className = cls(searchModalStyle(), open, "show");
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

function errorMessageStyle() {
  return "gfc_errorMessageStyle_oprnkd";
}

function itemTagStyle() {
  return "gfc_itemTagStyle_dqxz1s";
}

function giscusStyle() {
  return "gfc_giscusStyle_1ha953n";
}

function downloadButtonsStyle() {
  return "gfc_downloadButtonsStyle_8bp3j5";
}

function downloadBtnStyle() {
  return "gfc_downloadBtnStyle_1d6dxk7";
}

function markdownBodyStyle() {
  return "gfc_markdownBodyStyle_gz2gda";
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

__injectStyles(".gfc_mainContentStyle_dpxcuw {\nmargin: 0 auto;\n\tpadding: var(--spacing-lg);\n\tflex: 1 0 auto;\n\tmax-width: 900px;\n\twidth: 100%;\n\tbackground-color: var(--background-color);\n\tcolor: var(--font-color);\n\tanimation: fadeIn 0.2s ease-in-out;\n\ttransition:\n\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing);\n\n\t&:focus {\n\t\toutline: none;\n\t}\n\n\t&.page-transition-out {\n\t\tanimation: fadeOut 0.2s ease-in-out forwards;\n\t}\n}\n\n.gfc_appShellStyle_hypyhi {\ndisplay: flex;\n\tflex-direction: column;\n\tmin-height: calc(100vh - 56px);\n\tflex: 1 0 auto;\n\n\t& .icon {\n\t\tdisplay: inline-block;\n\t\tvertical-align: middle;\n\t\ttransition: transform var(--transition-fast);\n\t}\n\t& .icon:hover {\n\t\ttransform: rotate(5deg) scale(1.1);\n\t}\n\t& a.icon:hover {\n\t\ttext-decoration: none;\n\t}\n\n\t& .skip-link {\n\t\tposition: fixed;\n\t\ttop: -100px;\n\t\tleft: 1rem;\n\t\tbackground: var(--accent);\n\t\tcolor: #ffffff;\n\t\tpadding: 0.5rem 1rem;\n\t\tz-index: 10001;\n\t\tborder-radius: var(--border-radius-sm);\n\t\tfont-weight: 600;\n\t\ttext-decoration: none;\n\t\tbox-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n\t\ttransition: top 0.2s ease-in-out;\n\t}\n\t& .skip-link:focus {\n\t\ttop: 1rem;\n\t}\n\t& #navbar-slot,\n\t& #content-slot {\n\t\tdisplay: contents;\n\t}\n}\n\n.gfc_blogCardStyle_1ge5308 {\npadding: 1.5rem;\n\tbackground-color: rgba(255, 255, 255, 0.02);\n\tborder: 1px solid var(--border-color);\n\tborder-radius: var(--border-radius-large);\n\ttransition: all var(--transition-normal);\n\tcursor: pointer;\n\n\t&:hover {\n\t\tbackground-color: rgba(255, 255, 255, 0.05);\n\t\tborder-color: var(--accent);\n\t\ttransform: translateY(-4px) scale(1.01);\n\t\tbox-shadow: 0 8px 25px var(--accent-glow);\n\t}\n\t& .blog-post-title {\n\t\tmargin: 0 0 0.35rem 0;\n\t\tfont-size: 1.35em;\n\t\tfont-weight: bold;\n\t\tline-height: 1.3;\n\t}\n\t& .blog-post-title a {\n\t\tcolor: var(--accent);\n\t\ttext-decoration: none;\n\t\ttransition: color var(--transition-fast);\n\t}\n\t& .blog-post-title a:hover {\n\t\tcolor: var(--font-color);\n\t}\n\t& .blog-post-meta {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\talign-items: center;\n\t\tgap: 0.75rem;\n\t\tmargin-bottom: 0.75rem;\n\t\tfont-size: 1em;\n\t\tcolor: var(--text-light);\n\t}\n\t& .blog-post-date {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 0.4rem;\n\t}\n\t& .blog-post-tags {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tgap: 0.4rem;\n\t}\n\t& .blog-post-excerpt {\n\t\tcolor: var(--text-light);\n\t\tline-height: 1.5;\n\t\tmargin-bottom: 0;\n\t\tfont-size: 1.05em;\n\t}\n\t& mark {\n\t\tbackground-color: var(--accent);\n\t\tcolor: var(--background-color);\n\t\tpadding: 1px 3px;\n\t\tborder-radius: 2px;\n\t\tfont-weight: bold;\n\t}\n\n\t@media (max-width: 767px) {\n\t\tpadding: 1rem;\n\t\tmargin: 0.25rem;\n\t\ttext-align: center;\n\t\t& .blog-post-title {\n\t\t\tfont-size: 1.25em;\n\t\t}\n\t\t& .blog-post-meta {\n\t\t\tflex-direction: column;\n\t\t\talign-items: center;\n\t\t\tgap: 0.5rem;\n\t\t\tfont-size: 0.95em;\n\t\t\tjustify-content: center;\n\t\t}\n\t\t& .blog-post-excerpt {\n\t\t\tfont-size: 1em;\n\t\t}\n\t}\n}\n\n.gfc_paginationStyle_16wpmso {\nmargin: 2rem 0;\n\tdisplay: flex;\n\tjustify-content: center;\n\n\t& .pagination {\n\t\tdisplay: flex;\n\t\tgap: 0.5rem;\n\t\tlist-style: none;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n\t& .page-item {\n\t\tdisplay: flex;\n\t}\n\t& .page-link {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tpadding: 0.5rem 0.75rem;\n\t\tbackground-color: rgba(255, 255, 255, 0.02);\n\t\tborder: 1px solid var(--border-color);\n\t\tborder-radius: var(--border-radius);\n\t\tcolor: var(--font-color);\n\t\ttext-decoration: none;\n\t\ttransition: all var(--transition-fast);\n\t\tcursor: pointer;\n\t\tmin-width: 40px;\n\t\theight: 38px;\n\t\tbox-sizing: border-box;\n\t\ttext-align: center;\n\t}\n\t& .page-link svg {\n\t\tdisplay: inline-block;\n\t\tvertical-align: middle;\n\t}\n\t& .page-link:hover {\n\t\tbackground-color: var(--hover-color);\n\t\tborder-color: var(--accent);\n\t\tcolor: var(--accent);\n\t}\n\t& .page-item.active .page-link {\n\t\tbackground-color: var(--accent);\n\t\tborder-color: var(--accent);\n\t\tcolor: var(--background-color);\n\t\tfont-weight: bold;\n\t}\n\t& .page-item.disabled .page-link {\n\t\topacity: 0.5;\n\t\tcursor: not-allowed;\n\t\tpointer-events: none;\n\t}\n\n\t@media (max-width: 767px) {\n\t\t& .page-link {\n\t\t\tpadding: 0.4rem 0.6rem;\n\t\t\tfont-size: 0.9em;\n\t\t\tmin-width: 35px;\n\t\t\theight: 35px;\n\t\t}\n\t}\n}\n\n.gfc_blogListStyle_1clw6uj {\nmax-width: 900px;\n\tmargin: 0 auto;\n\ttext-align: left;\n\n\t& .blog-page-title {\n\t\tcolor: var(--accent);\n\t\tfont-size: 2em;\n\t\tmargin-bottom: 1.5rem;\n\t\ttext-align: center;\n\t}\n\t& .blog-empty {\n\t\ttext-align: center;\n\t\tcolor: var(--text-light);\n\t\tfont-size: 1.1em;\n\t\tpadding: 2rem 0;\n\t}\n\t& .blog-posts {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1.5rem;\n\t\tmargin-bottom: 2rem;\n\t}\n\n\t@media (max-width: 767px) {\n\t\t& .blog-posts {\n\t\t\tgap: 0.5rem;\n\t\t}\n\t}\n}\n\n.gfc_tocStyle_1cu92vr {\nbackground: transparent;\n\tborder: none;\n\tborder-left: 2px solid var(--border-color);\n\tborder-radius: 0;\n\tpadding: 0.25rem 0 0.25rem 0.85rem;\n\tmargin: 1.5rem 0 2rem 0;\n\ttext-align: left;\n\ttransition: border-color 0.2s ease;\n\n\t&:hover,\n\t&[open] {\n\t\tborder-left-color: color-mix(in srgb, var(--accent) 50%, var(--border-color));\n\t}\n\t& .blog-toc-title {\n\t\tfont-size: 1rem;\n\t\tfont-weight: 600;\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.05em;\n\t\tcursor: pointer;\n\t\tcolor: var(--text-light);\n\t\tuser-select: none;\n\t\ttransition: color 0.15s ease;\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tgap: 0.35rem;\n\t}\n\t& .blog-toc-title:hover {\n\t\tcolor: var(--accent);\n\t}\n\t& .blog-toc-title:focus-visible {\n\t\toutline: 2px solid var(--accent);\n\t\toutline-offset: 2px;\n\t\tborder-radius: 2px;\n\t}\n\t& .blog-toc-nav {\n\t\tmargin-top: 0.5rem;\n\t}\n\t& .blog-toc-list {\n\t\tlist-style: none;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: flex-start;\n\t\tgap: 0.35rem;\n\t}\n\t& .blog-toc-item {\n\t\ttext-align: left;\n\t}\n\t& .blog-toc-item a {\n\t\tcolor: var(--text-light);\n\t\ttext-decoration: none;\n\t\tfont-size: 1rem;\n\t\tline-height: 1.5;\n\t\ttransition: color 0.15s ease;\n\t\tdisplay: inline-block;\n\t}\n\t& .blog-toc-item a:hover {\n\t\tcolor: var(--accent);\n\t\ttext-decoration: none;\n\t}\n\t& .blog-toc-level-3 {\n\t\tpadding-left: 1.25rem;\n\t}\n\t& .blog-toc-level-3 a {\n\t\tfont-size: 0.95rem;\n\t\topacity: 0.9;\n\t}\n}\n\n.gfc_postNavStyle_1hdu2x0 {\ndisplay: flex;\n\tflex-wrap: nowrap;\n\tgap: 15px;\n\tjustify-content: space-between;\n\tmargin: 2.5rem 0;\n\n\t& .blog-nav-next {\n\t\tmargin-left: auto;\n\t}\n}\n\n.gfc_blogPostViewStyle_1in8v7g {\n& .project-title {\n\t\tcolor: var(--accent);\n\t\tfont-size: 1.5em;\n\t\tmargin: 0 0 0.02em 0;\n\t\tfont-weight: bold;\n\t}\n\t& .project-description {\n\t\tmargin: 0 0 0.5em 0;\n\t\tcolor: var(--text-light);\n\t\tfont-size: 1.2em;\n\t\tline-height: 1.6;\n\t}\n\t& .project-tags {\n\t\tmargin: 0.8em 0;\n\t\tfont-size: 1.1em;\n\t}\n}\n\n.gfc_contactModalStyle_1akch0q {\ndisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: rgba(0, 0, 0, 0.7);\n\tbackdrop-filter: blur(6px);\n\t-webkit-backdrop-filter: blur(6px);\n\tz-index: 10000;\n\toverflow-y: auto;\n\toverscroll-behavior: contain;\n\tpadding: 2rem 1rem;\n\tvisibility: hidden;\n\topacity: 0;\n\ttransition:\n\t\topacity 0.2s ease-in-out,\n\t\tvisibility 0s linear 0.2s;\n\n\t&.show {\n\t\tvisibility: visible;\n\t\topacity: 1;\n\t\ttransition:\n\t\t\topacity 0.25s ease-out,\n\t\t\tvisibility 0s;\n\t}\n\n\t& .contact-modal-content {\n\t\tbackground-color: var(--background-color);\n\t\tborder: 2px solid var(--border-color);\n\t\tborder-radius: 8px;\n\t\tpadding: 1.5rem;\n\t\tmax-width: 450px;\n\t\twidth: 100%;\n\t\tposition: relative;\n\t\tbox-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);\n\t\topacity: 0;\n\t\ttransform: scale(0.95);\n\t\ttransition:\n\t\t\topacity 0.2s ease-in,\n\t\t\ttransform 0.2s ease-in,\n\t\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing);\n\t}\n\n\t&.show .contact-modal-content {\n\t\topacity: 1;\n\t\ttransform: scale(1);\n\t\ttransition:\n\t\t\topacity 0.25s ease-out,\n\t\t\ttransform 0.25s ease-out,\n\t\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing);\n\t}\n\n\t& .contact-modal-header {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: center;\n\t\tmargin-bottom: 1rem;\n\t}\n\n\t& .contact-modal-header h2 {\n\t\tmargin: 0;\n\t\tcolor: var(--accent);\n\t\tfont-size: 1.25rem;\n\t}\n\n\t& .contact-modal-close {\n\t\tbackground: none;\n\t\tborder: none;\n\t\tcolor: var(--text-light);\n\t\tfont-size: 1.5rem;\n\t\tcursor: pointer;\n\t\tpadding: 0;\n\t\twidth: 32px;\n\t\theight: 32px;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tborder-radius: 4px;\n\t\ttransition: all 0.2s ease;\n\t}\n\n\t& .contact-modal-close:hover {\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--font-color);\n\t}\n\n\t& .contact-form .form-group {\n\t\tmargin-bottom: 0.75rem;\n\t}\n\n\t& .contact-form label {\n\t\tdisplay: block;\n\t\tmargin-bottom: 0.25rem;\n\t\tcolor: var(--font-color);\n\t\tfont-weight: 600;\n\t\tfont-size: 0.9rem;\n\t\ttext-align: left;\n\t}\n\n\t& .contact-form input,\n\t& .contact-form textarea {\n\t\twidth: 100%;\n\t\tpadding: 0.6rem;\n\t\tbackground-color: var(--hover-color);\n\t\tborder: 1px solid var(--border-color);\n\t\tborder-radius: 4px;\n\t\tcolor: var(--font-color);\n\t\tfont-family: inherit;\n\t\tfont-size: 0.95rem;\n\t\ttransition: border-color 0.2s ease;\n\t}\n\n\t& .contact-form input:focus,\n\t& .contact-form textarea:focus {\n\t\toutline: none;\n\t\tborder-color: var(--accent);\n\t}\n\n\t& .contact-form input.error,\n\t& .contact-form textarea.error {\n\t\tborder-color: #ef4444;\n\t}\n\n\t& .contact-form textarea {\n\t\tresize: vertical;\n\t\tmin-height: 100px;\n\t}\n\n\t& .form-status {\n\t\tpadding: 0.6rem;\n\t\tborder-radius: 4px;\n\t\tmargin-bottom: 0.25rem;\n\t\ttext-align: center;\n\t\tfont-size: 0.9rem;\n\t\tdisplay: none;\n\t}\n\n\t& .form-status.success,\n\t& .form-status.error {\n\t\tdisplay: block;\n\t}\n\n\t& .form-status.success {\n\t\tbackground-color: rgba(16, 185, 129, 0.1);\n\t\tborder: 1px solid var(--accent);\n\t\tcolor: var(--accent);\n\t}\n\n\t& .form-status.error {\n\t\tbackground-color: rgba(239, 68, 68, 0.1);\n\t\tborder: 1px solid #ef4444;\n\t\tcolor: #ef4444;\n\t}\n\n\t& .contact-form .btn {\n\t\twidth: 100%;\n\t\tpadding: 12px 24px;\n\t\tmargin-top: 0.75rem;\n\t\tbackground-color: var(--hover-color);\n\t\tborder: 2px solid var(--accent);\n\t\tborder-radius: 8px;\n\t\tcolor: var(--font-color);\n\t\tfont-weight: 600;\n\t\tfont-size: 1em;\n\t\tcursor: pointer;\n\t\ttransition: all var(--transition-normal);\n\t}\n\n\t& .contact-form .btn:hover:not(:disabled) {\n\t\tbackground-color: var(--hover-color);\n\t\tborder-color: var(--accent);\n\t\tcolor: var(--accent);\n\t\ttransform: translateY(-2px);\n\t\tbox-shadow: 0 4px 12px var(--accent-glow);\n\t}\n\n\t& .contact-form .btn:disabled {\n\t\topacity: 0.5;\n\t\tcursor: not-allowed;\n\t\ttransform: none;\n\t}\n}\n\n.gfc_footerStyle_ebeppf {\nmargin-top: auto;\n\tmargin-bottom: 0;\n\tpadding: 1rem 0;\n\tbackground-color: transparent;\n\tflex-shrink: 0;\n\tmax-width: 1000px;\n\tmargin-inline: auto;\n\ttext-align: center;\n\tfont-size: 0.9em;\n\ttransition: color var(--theme-transition-duration) var(--theme-transition-timing);\n}\n\n.gfc_navbarStyle_1jpcv7g {\nbackground-color: color-mix(in srgb, var(--header-color) 85%, transparent);\n\tbackdrop-filter: blur(12px);\n\t-webkit-backdrop-filter: blur(12px);\n\tborder-bottom: var(--border-width) solid var(--accent);\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tz-index: 1030;\n\tfont-family: var(--font-family-primary);\n\ttransition:\n\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing);\n\n\t& .navbar-inner {\n\t\tmax-width: 1000px;\n\t\tmargin-inline: auto;\n\t\tpadding: 0 15px;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: space-between;\n\t\ttransition:\n\t\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing);\n\t}\n\t& .navbar-brand {\n\t\tcolor: var(--font-color);\n\t\tfont-weight: bold;\n\t\ttext-decoration: none;\n\t\tfont-size: 1.25em;\n\t\tdisplay: none;\n\t\tpadding: 11px 0;\n\t}\n\t& .navbar-collapse {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: space-between;\n\t\twidth: 100%;\n\t}\n\t& .navbar-nav {\n\t\tdisplay: flex;\n\t\tlist-style: none;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\talign-items: stretch;\n\t}\n\t& .navbar-nav.left {\n\t\tmargin-right: auto;\n\t}\n\t& .navbar-nav.right {\n\t\tmargin-left: auto;\n\t}\n\t& .nav-item {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t}\n\t& button.nav-link {\n\t\tbackground: none;\n\t\tborder: none;\n\t\tcursor: pointer;\n\t\tfont-family: inherit;\n\t\twidth: auto;\n\t\ttransition:\n\t\t\ttransform 0.1s ease,\n\t\t\tbackground-color var(--transition-fast),\n\t\t\tcolor var(--transition-fast);\n\t}\n\t& button.nav-link:active {\n\t\ttransform: scale(0.95);\n\t}\n\t& .nav-link {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tpadding: 11px 20px;\n\t\tcolor: var(--font-color);\n\t\ttext-decoration: none;\n\t\tline-height: 1.2;\n\t\tfont-size: 1.25em;\n\t\tfont-weight: 700;\n\t\ttransition:\n\t\t\tbackground-color var(--transition-fast),\n\t\t\tcolor var(--transition-fast),\n\t\t\tborder-color var(--transition-fast),\n\t\t\topacity var(--transition-fast),\n\t\t\ttransform var(--transition-fast);\n\t}\n\t& .navbar-menu .nav-link,\n\t& .navbar-icon .nav-link {\n\t\tfont-size: 1.35rem;\n\t}\n\t& .navbar-menu .nav-link {\n\t\tfont-weight: 700;\n\t}\n\t& .navbar-icon .nav-link svg {\n\t\ttransition:\n\t\t\ttransform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),\n\t\t\trotate 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n\t\ttransform-origin: center;\n\t}\n\t& .navbar-icon .nav-link:hover svg,\n\t& .navbar-icon .nav-link:focus svg {\n\t\ttransform: rotate(8deg) scale(1.25);\n\t}\n\t& .navbar-icon .nav-link:active svg {\n\t\ttransform: rotate(4deg) scale(1.1);\n\t}\n\t& .nav-link:hover,\n\t& .nav-link:focus,\n\t& .nav-link:active {\n\t\tcolor: var(--accent);\n\t\tbackground-color: var(--hover-color);\n\t}\n\t& .nav-link.active {\n\t\tcolor: var(--accent);\n\t\tbackground-color: var(--hover-color);\n\t}\n\t& .nav-link:focus:not(.active) {\n\t\toutline: 2px solid var(--accent);\n\t\toutline-offset: -2px;\n\t}\n\t& .nav-link:focus:not(:focus-visible):not(.active) {\n\t\tbackground-color: transparent;\n\t\tcolor: var(--font-color);\n\t\toutline: none;\n\t}\n\t& .nav-link.active:focus {\n\t\toutline: none;\n\t}\n\t& .nav-link:focus:not(:focus-visible):hover {\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--accent);\n\t}\n\n\t@media (min-width: 768px) {\n\t\t& .navbar-inner {\n\t\t\tpadding-left: 20px;\n\t\t\tpadding-right: 20px;\n\t\t}\n\t}\n\n\t& .navbar-toggle {\n\t\tdisplay: none;\n\t\tbackground: transparent;\n\t\tborder: none;\n\t\tcolor: var(--font-color);\n\t\tfont-size: 1.5em;\n\t\tcursor: pointer;\n\t\tpadding: 11px 0.5rem;\n\t\ttransition: transform var(--transition-fast);\n\t\toverflow: visible;\n\t}\n\t& .navbar-toggle:focus {\n\t\toutline: 2px solid var(--accent);\n\t\toutline-offset: 2px;\n\t}\n\t& .navbar-toggle:focus:not(:focus-visible) {\n\t\toutline: none;\n\t}\n\t& .navbar-toggle:active {\n\t\ttransform: scale(0.9);\n\t}\n\t& .navbar-toggle-icon {\n\t\tdisplay: block;\n\t\twidth: 24px;\n\t\theight: 2px;\n\t\tbackground-color: currentColor;\n\t\tposition: relative;\n\t\ttransition: background-color var(--transition-normal);\n\t\tz-index: 1;\n\t}\n\t& .navbar-toggle-icon::before {\n\t\tcontent: \"\";\n\t\tdisplay: block;\n\t\twidth: 24px;\n\t\theight: 2px;\n\t\tbackground-color: currentColor;\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: -8px;\n\t\ttransition: all var(--transition-normal);\n\t}\n\t& .navbar-toggle-icon::after {\n\t\tcontent: \"\";\n\t\tdisplay: block;\n\t\twidth: 24px;\n\t\theight: 2px;\n\t\tbackground-color: currentColor;\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tbottom: -8px;\n\t\ttransition: all var(--transition-normal);\n\t}\n\t& .navbar-toggle.active .navbar-toggle-icon {\n\t\tbackground-color: transparent;\n\t}\n\t& .navbar-toggle.active .navbar-toggle-icon::before {\n\t\ttransform: rotate(45deg);\n\t\ttop: 0;\n\t}\n\t& .navbar-toggle.active .navbar-toggle-icon::after {\n\t\ttransform: rotate(-45deg);\n\t\tbottom: 0;\n\t}\n\n\t& .dropdown {\n\t\tposition: relative;\n\t}\n\t& .dropdown-toggle {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 0.3rem;\n\t}\n\t& .dropdown-chevron {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\ttransition: transform var(--transition-fast);\n\t\ttransform-origin: center;\n\t}\n\t& .dropdown-chevron svg {\n\t\twidth: 0.8em;\n\t\theight: 0.8em;\n\t}\n\t& .dropdown-chevron-down {\n\t\tdisplay: inline-flex;\n\t}\n\t& .dropdown-chevron-up {\n\t\tdisplay: none;\n\t}\n\t& .dropdown.show .dropdown-chevron-down {\n\t\tdisplay: none;\n\t}\n\t& .dropdown.show .dropdown-chevron-up {\n\t\tdisplay: inline-flex;\n\t}\n\t& .dropdown-menu {\n\t\tposition: absolute;\n\t\ttop: 100%;\n\t\tleft: 0;\n\t\tmin-width: 200px;\n\t\tbackground-color: color-mix(in srgb, var(--header-color) 92%, transparent);\n\t\tbackdrop-filter: blur(12px);\n\t\t-webkit-backdrop-filter: blur(12px);\n\t\tborder: var(--border-width) solid var(--accent);\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tlist-style: none;\n\t\tz-index: 1000;\n\t\tbox-shadow: 0 6px 12px var(--accent-glow);\n\t\topacity: 0;\n\t\tvisibility: hidden;\n\t\ttransform: translateY(-5px);\n\t\ttransition: all 0.2s ease;\n\t}\n\t& .dropdown.show .dropdown-menu {\n\t\topacity: 1;\n\t\tvisibility: visible;\n\t\ttransform: translateY(0);\n\t}\n\t& .dropdown-item {\n\t\tdisplay: block;\n\t\tpadding: 10px 20px;\n\t\tcolor: var(--font-color);\n\t\ttext-decoration: none;\n\t\tfont-size: 16px;\n\t\tfont-weight: bold;\n\t\tbackground-color: var(--header-color);\n\t\ttransition: all var(--transition-fast);\n\t\tborder: none;\n\t\twidth: 100%;\n\t\ttext-align: left;\n\t\twhite-space: nowrap;\n\t}\n\t& .dropdown-item:hover,\n\t& .dropdown-item:focus,\n\t& .dropdown-item:active,\n\t& .dropdown-item.active {\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--accent);\n\t}\n\t& .dropdown-item.active:focus {\n\t\toutline: none;\n\t}\n\n\t& .theme-toggle {\n\t\tbackground: none;\n\t\tborder: none;\n\t\tcolor: var(--font-color);\n\t\tcursor: pointer;\n\t\tpadding: 11px 20px;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tfont-size: 1.35rem;\n\t\ttransition:\n\t\t\tcolor var(--transition-fast),\n\t\t\tbackground-color var(--transition-fast);\n\t}\n\t& .theme-toggle:hover,\n\t& .theme-toggle:focus {\n\t\tcolor: var(--accent);\n\t\tbackground-color: var(--hover-color);\n\t}\n\t& .theme-toggle:hover svg,\n\t& .theme-toggle:focus svg {\n\t\ttransform: rotate(8deg) scale(1.25);\n\t}\n\t& .theme-toggle:active {\n\t\tcolor: var(--accent);\n\t}\n\t& .theme-toggle:active svg {\n\t\ttransform: rotate(4deg) scale(1.1);\n\t}\n\t& .theme-toggle svg {\n\t\ttransition:\n\t\t\topacity var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\ttransform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),\n\t\t\tfill var(--transition-fast);\n\t\tfill: currentColor;\n\t}\n\n\t@media (max-width: 767px) {\n\t\t& .navbar-brand {\n\t\t\tdisplay: block;\n\t\t}\n\t\t& .navbar-toggle {\n\t\t\tdisplay: block;\n\t\t}\n\t\t& .navbar-collapse {\n\t\t\tposition: absolute;\n\t\t\ttop: 100%;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t\tbackground-color: var(--header-color);\n\t\t\tborder-bottom: var(--border-width) solid var(--accent);\n\t\t\tflex-direction: column;\n\t\t\talign-items: stretch;\n\t\t\tmax-height: 0;\n\t\t\toverflow: hidden;\n\t\t\ttransition: max-height 0.25s ease-in;\n\t\t}\n\t\t& .navbar-collapse.show {\n\t\t\tmax-height: 800px;\n\t\t\toverflow-y: auto;\n\t\t\toverflow-x: hidden;\n\t\t\ttransition: max-height 0.8s ease-out;\n\t\t}\n\t\t& .navbar-nav {\n\t\t\tflex-direction: column;\n\t\t\twidth: 100%;\n\t\t\tmax-width: 100%;\n\t\t\toverflow-x: hidden;\n\t\t}\n\t\t& .navbar-nav.left,\n\t\t& .navbar-nav.right {\n\t\t\tmargin: 0;\n\t\t}\n\t\t& .navbar-nav.right {\n\t\t\tflex-direction: row;\n\t\t\tjustify-content: center;\n\t\t\tpadding: 10px 0;\n\t\t\tmargin-top: 10px;\n\t\t}\n\t\t& .navbar-nav.right .nav-item {\n\t\t\tdisplay: inline-flex;\n\t\t}\n\t\t& .navbar-nav.right .nav-link {\n\t\t\tpadding: 10px 15px;\n\t\t\theight: auto;\n\t\t}\n\t\t& .navbar-nav.left .nav-item {\n\t\t\twidth: 100%;\n\t\t\theight: auto;\n\t\t\toverflow: hidden;\n\t\t}\n\t\t& .navbar-nav.left .nav-link {\n\t\t\theight: auto;\n\t\t\tpadding: 12px 20px;\n\t\t\twidth: 100%;\n\t\t\tjustify-content: flex-start;\n\t\t}\n\t\t& .dropdown {\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t\twidth: 100%;\n\t\t}\n\t\t& .dropdown-menu {\n\t\t\tposition: static;\n\t\t\tborder: none;\n\t\t\tbox-shadow: none;\n\t\t\twidth: 100%;\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t\tmax-height: 0;\n\t\t\toverflow: hidden;\n\t\t\ttransition: max-height 0.4s ease-out;\n\t\t\torder: 2;\n\t\t}\n\t\t& .dropdown-toggle {\n\t\t\torder: 1;\n\t\t\twidth: 100%;\n\t\t}\n\t\t& .dropdown.show .dropdown-menu {\n\t\t\tmax-height: 500px;\n\t\t\ttransition: max-height 0.5s ease-out;\n\t\t}\n\t\t& .dropdown-item {\n\t\t\tpadding-left: 40px;\n\t\t\twidth: 100%;\n\t\t\ttext-align: left;\n\t\t\twhite-space: normal;\n\t\t\tword-wrap: break-word;\n\t\t}\n\t}\n}\n\n.gfc_pageViewStyle_rmw3pr {\n& .about-pic {\n\t\twidth: min(150px, 30vw);\n\t\taspect-ratio: 1 / 1;\n\t\theight: auto;\n\t\tborder-radius: 50%;\n\t\tmargin-bottom: 20px;\n\t\tobject-fit: cover;\n\t\ttransition: transform var(--transition-normal);\n\t}\n\t& .about-pic:hover {\n\t\ttransform: scale(1.05);\n\t}\n}\n\n.gfc_projectDetailStyle_1pu2fpm {\n& .project-title {\n\t\tcolor: var(--accent);\n\t\tfont-size: 1.5em;\n\t\tmargin: 0 0 0.02em 0;\n\t\tfont-weight: bold;\n\t}\n\t& .project-description {\n\t\tmargin: 0 0 0.5em 0;\n\t\tcolor: var(--text-light);\n\t\tfont-size: 1.2em;\n\t\tline-height: 1.6;\n\t}\n\t& .project-tags {\n\t\tmargin: 0.8em 0;\n\t\tfont-size: 1.1em;\n\t}\n\t& .text-center {\n\t\ttext-align: center;\n\t}\n\t& .youtube-video {\n\t\tmargin: 20px 0;\n\t}\n\t& .iframeWrapper {\n\t\tposition: relative;\n\t\tpadding-bottom: 56.25%;\n\t\tpadding-top: 25px;\n\t\theight: 0;\n\t}\n\t& .iframeWrapper iframe {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tmax-width: 100%;\n\t\toverflow: hidden;\n\t}\n\t& .demo-iframe-wrapper {\n\t\twidth: 100%;\n\t\tmargin: 20px 0;\n\t}\n\t& .demo-iframe-wrapper iframe {\n\t\twidth: 100%;\n\t\theight: 700px;\n\t\tmax-width: 100%;\n\t\tborder: none;\n\t\toverflow: hidden;\n\t}\n}\n\n.gfc_searchModalStyle_9hvz5o {\ndisplay: flex;\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tbackground-color: var(--background-color);\n\tz-index: 2000;\n\tflex-direction: column;\n\toverflow: hidden;\n\tvisibility: hidden;\n\topacity: 0;\n\ttransform: scale(0.95);\n\ttransition:\n\t\topacity 0.2s ease-in,\n\t\ttransform 0.2s ease-in,\n\t\tvisibility 0s linear 0.2s;\n\n\t&.show {\n\t\tvisibility: visible;\n\t\topacity: 1;\n\t\ttransform: scale(1);\n\t\ttransition:\n\t\t\topacity 0.25s ease-out,\n\t\t\ttransform 0.25s ease-out,\n\t\t\tvisibility 0s;\n\t}\n\n\t& .search-page-header {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\theight: 56px;\n\t\tpadding: 0 1rem;\n\t\tbackground-color: var(--header-color);\n\t\tborder-bottom: var(--border-width) solid var(--accent);\n\t\ttransition:\n\t\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing);\n\t}\n\n\t&.show .search-page-header {\n\t\tanimation: slideDown var(--transition-normal) ease-out;\n\t}\n\n\t& .search-page-header-content {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 0.75rem;\n\t\twidth: 100%;\n\t\tmax-width: 900px;\n\t}\n\n\t& .search-page-back {\n\t\tbackground: none;\n\t\tborder: none;\n\t\tcolor: var(--font-color);\n\t\tcursor: pointer;\n\t\tpadding: 0.5rem;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tfont-size: 1.2em;\n\t\ttransition: color var(--transition-fast);\n\t}\n\n\t& .search-page-back:hover {\n\t\tcolor: var(--accent);\n\t}\n\n\t& .search-page-input-wrapper {\n\t\tflex: 1;\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t}\n\n\t& .search-page-input {\n\t\twidth: 100%;\n\t\tpadding: 0.5rem 2.5rem 0.5rem 1rem;\n\t\tbackground-color: var(--hover-color);\n\t\tborder: 1px solid var(--border-color);\n\t\tborder-radius: 20px;\n\t\tcolor: var(--font-color);\n\t\tfont-size: 1em;\n\t}\n\n\t& .search-page-input::-webkit-search-cancel-button {\n\t\t-webkit-appearance: none;\n\t\tappearance: none;\n\t}\n\n\t& .search-page-input:focus {\n\t\toutline: none;\n\t\tborder-color: var(--accent);\n\t\tbackground-color: var(--background-color);\n\t\tbox-shadow: 0 0 0 3px var(--accent-glow);\n\t}\n\n\t& .search-page-clear {\n\t\tposition: absolute;\n\t\tright: 0.5rem;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tcolor: var(--text-light);\n\t\tcursor: pointer;\n\t\tpadding: 0.25rem 0.5rem;\n\t\tdisplay: none;\n\t\ttransition: color var(--transition-fast);\n\t}\n\n\t& .search-page-clear:hover {\n\t\tcolor: var(--accent);\n\t}\n\n\t& .search-page-clear.show {\n\t\tdisplay: block;\n\t}\n\n\t& .search-page-content {\n\t\tflex: 1;\n\t\toverflow-y: auto;\n\t\tpadding: 1rem;\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t}\n\n\t&.show .search-page-content {\n\t\tanimation: fadeIn 0.4s ease-out 0.1s both;\n\t}\n\n\t& .search-page-results {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1.5rem;\n\t\twidth: 100%;\n\t\tmax-width: 900px;\n\t\ttext-align: left;\n\t}\n\n\t& .search-result-item.selected {\n\t\tborder-color: var(--accent);\n\t\tbackground-color: var(--hover-color);\n\t\tbox-shadow:\n\t\t\t0 0 0 1px var(--accent),\n\t\t\t0 0 15px var(--accent-glow);\n\t}\n\n\t& .search-no-results {\n\t\tpadding: var(--spacing-xl);\n\t\ttext-align: center;\n\t\tcolor: var(--text-light);\n\t}\n\n\t& .search-no-results p {\n\t\tmargin: 0;\n\t\tfont-size: 0.9em;\n\t}\n}\n\n.gfc_errorMessageStyle_oprnkd {\ntext-align: center;\n\tpadding: 2rem;\n\tmax-width: 600px;\n\tmargin: 0 auto;\n\n\t& h1 {\n\t\tcolor: #ff6b6b;\n\t\tmargin-bottom: 1rem;\n\t\tfont-size: 2em;\n\t}\n\t& p {\n\t\tcolor: var(--text-light);\n\t\tfont-size: 1.1em;\n\t}\n}\n\n.gfc_itemTagStyle_dqxz1s {\nbackground-color: var(--hover-color);\n\tcolor: var(--accent);\n\tpadding: var(--spacing-xs) var(--spacing-sm);\n\tborder-radius: var(--border-radius);\n\tfont-size: var(--font-size-sm);\n\tdisplay: inline-block;\n\tmargin: 2px;\n\n\t&.clickable-tag {\n\t\tcursor: pointer;\n\t\ttransition: all var(--transition-fast);\n\t}\n\t&.clickable-tag:hover {\n\t\tbackground-color: var(--accent);\n\t\tcolor: var(--background-color);\n\t\ttransform: translateY(-1px);\n\t\tbox-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n\t}\n}\n\n.gfc_giscusStyle_1ha953n {\nmax-width: 900px;\n\tmargin: 2.5rem auto;\n\tpadding: 1rem 0;\n\n\t& iframe {\n\t\tcolor-scheme: dark;\n\t}\n}\n\n.gfc_downloadButtonsStyle_8bp3j5 {\ndisplay: flex;\n\tflex-wrap: wrap;\n\tgap: 15px;\n\tmargin: 1.5em 0;\n\tjustify-content: flex-start;\n}\n\n.gfc_downloadBtnStyle_1d6dxk7 {\ndisplay: inline-flex;\n\talign-items: center;\n\tjustify-content: center;\n\tgap: 8px;\n\tpadding: 12px 24px;\n\tbackground-color: var(--hover-color);\n\tborder: 2px solid var(--accent);\n\tborder-radius: 8px;\n\tcolor: var(--font-color);\n\ttext-decoration: none;\n\tfont: 600 1em var(--font-family-primary);\n\ttransition: all var(--transition-normal);\n\tcursor: pointer;\n\tappearance: none;\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: var(--hover-color);\n\t\tborder-color: var(--accent);\n\t\ttransform: translateY(-2px);\n\t\tbox-shadow: 0 4px 12px var(--accent-glow);\n\t\tcolor: var(--accent);\n\t\ttext-decoration: none;\n\t}\n\t&:active {\n\t\ttransform: translateY(0) scale(0.95);\n\t\ttext-decoration: none;\n\t}\n\t& svg,\n\t& .icon {\n\t\tflex-shrink: 0;\n\t\ttransition:\n\t\t\ttransform var(--transition-normal),\n\t\t\tcolor var(--transition-normal);\n\t}\n\t&:hover svg,\n\t&:hover .icon,\n\t&:focus svg,\n\t&:focus .icon {\n\t\ttransform: scale(1.1);\n\t\tcolor: var(--accent);\n\t}\n\t& span {\n\t\ttransition: color var(--transition-normal);\n\t}\n\t&:hover span,\n\t&:focus span {\n\t\tcolor: var(--accent);\n\t}\n}\n\n.gfc_markdownBodyStyle_gz2gda {\nfont-family: var(--font-family-primary);\n\tfont-size: 1em;\n\tline-height: 1.6;\n\tcolor: var(--text-light);\n\ttext-align: left;\n\n\t& h1, & h2, & h3, & h4, & h5, & h6 {\n\t\tcolor: var(--font-color);\n\t\tmargin: 1em 0 0.5em;\n\t\tfont-weight: bold;\n\t\tline-height: 1.25;\n\t}\n\t& h1 {\n\t\tfont-size: 1.8em;\n\t\tmargin-top: 0;\n\t}\n\t& h2 {\n\t\tfont-size: 1.4em;\n\t\tscroll-margin-top: 75px;\n\t}\n\t& h3 {\n\t\tfont-size: 1.2em;\n\t\tscroll-margin-top: 75px;\n\t}\n\t& p, & li {\n\t\tmargin: 0.5em 0;\n\t\tline-height: 1.6;\n\t\tfont-size: 1.1em;\n\t\tcolor: var(--text-light);\n\t}\n\t& ul, & ol {\n\t\tmargin: 0.5em 0;\n\t\tpadding-left: 2em;\n\t}\n\t& code:not([class*=\"language-\"]) {\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--font-color);\n\t\tpadding: 2px 6px;\n\t\tborder-radius: 3px;\n\t\tfont-family: var(--font-family-mono);\n\t\tfont-size: 0.9em;\n\t}\n\t& pre:not([class*=\"language-\"]) {\n\t\tbackground-color: var(--hover-color);\n\t\tpadding: 0.5em;\n\t\tborder-radius: 3px;\n\t\toverflow-x: auto;\n\t\tmargin: 0.5em 0;\n\t\tborder: 1px solid var(--border-color);\n\t\tfont-family: var(--font-family-mono);\n\t\tline-height: 1.4;\n\t}\n\t& pre[class*=\"language-\"] {\n\t\tmargin: 0.5em 0;\n\t\toverflow-x: auto;\n\t\tfont-family: var(--font-family-mono);\n\t\tline-height: 1.4;\n\t\tposition: relative;\n\t}\n\t& a:not(.download-btn) {\n\t\tcolor: var(--accent);\n\t\ttext-decoration: none;\n\t\tdisplay: inline-block;\n\t\ttransition: transform var(--transition-fast);\n\t}\n\t& a:not(.download-btn):hover {\n\t\ttext-decoration: none;\n\t\ttransform: translateY(-2px);\n\t}\n\t& blockquote {\n\t\tborder-left: 4px solid var(--accent);\n\t\tpadding-left: 1em;\n\t\tmargin: 0.5em 0;\n\t\tfont-style: italic;\n\t}\n\t& table {\n\t\twidth: 100%;\n\t\tborder-collapse: collapse;\n\t\tmargin: 0.5em 0;\n\t}\n\t& th, & td {\n\t\tborder: 1px solid var(--border-color);\n\t\tpadding: 0.5em 1em;\n\t\ttext-align: left;\n\t}\n\t& th {\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--accent);\n\t\tfont-weight: bold;\n\t}\n\t& hr {\n\t\tborder: none;\n\t\tborder-top: 1px solid var(--border-color);\n\t\tmargin: 0.5em 0;\n\t}\n\t& .mermaid {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\tmargin: 1em 0;\n\t\toverflow-x: auto;\n\t}\n\t& .mermaid svg {\n\t\tmax-width: 100%;\n\t\theight: auto;\n\t}\n\t& .copy-code-button {\n\t\tposition: absolute;\n\t\ttop: 0.5em;\n\t\tright: 0.5em;\n\t\tpadding: 0.4em 0.8em;\n\t\tfont-size: 0.85em;\n\t\tfont-family: var(--font-family-primary);\n\t\tfont-weight: 700;\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--font-color);\n\t\tborder: 1px solid var(--border-color);\n\t\tborder-radius: var(--border-radius);\n\t\tcursor: pointer;\n\t\topacity: 0;\n\t\ttransition:\n\t\t\topacity var(--transition-fast),\n\t\t\tbackground-color var(--transition-fast);\n\t\tz-index: 10;\n\t}\n\t& pre:hover .copy-code-button {\n\t\topacity: 1;\n\t}\n\t@media (hover: none) {\n\t\t& .copy-code-button {\n\t\t\topacity: 1;\n\t\t}\n\t}\n\t& .copy-code-button:hover {\n\t\tbackground-color: var(--accent);\n\t\tcolor: var(--background-color);\n\t}\n\t& .copy-code-button:active {\n\t\ttransform: scale(0.95);\n\t}\n\t& .copy-code-button.copied {\n\t\tbackground-color: #10b981;\n\t\tcolor: white;\n\t\topacity: 1;\n\t}\n}");
main();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNyYy9hcHAudGVtcGwiLCJzcmMvYmxvZy50ZW1wbCIsInNyYy9jb21tZW50cy5nbyIsInNyYy9jb250YWN0LnRlbXBsIiwic3JjL2VtYWlsLmdvIiwic3JjL2Zvb3Rlci50ZW1wbCIsInNyYy9pY29ucy5nbyIsInNyYy9pY29ucy50ZW1wbCIsInNyYy9sb2FkZXIuZ28iLCJzcmMvbWFpbi5nbyIsInNyYy9tYXJrZG93bi5nbyIsInNyYy9uYXZiYXIudGVtcGwiLCJzcmMvcGFnZS50ZW1wbCIsInNyYy9wcm9qZWN0cy50ZW1wbCIsInNyYy9yZW5kZXJfaGVscGVycy5nbyIsInNyYy9yb3V0ZXIuZ28iLCJzcmMvc2VhcmNoLmdvIiwic3JjL3NlYXJjaC50ZW1wbCIsInNyYy9zdG9yZS5nbyIsInNyYy9zdHlsZXMudGVtcGwiLCJzcmMvdGhlbWUuZ28iLCJzcmMvdHlwZXMuZ28iLCJzcmMvdWkuZ28iLCJzcmMvdmlldy5nbyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBSWlKQTtBQTFIQTtBS3lDQTtBQUNBO0FMekNBO0FBdUdBO0FBQ0E7QUFDQTtBQUNBO0FLM0RBO0FBcUtBO0FBaktBO0FBQ0E7QUFDQTtBQUNBOztBQW9LQTtBQWxLQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBcUtBO0FBbktBO0FBcUtBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUF2S0E7QUFDQTtBQUNBOztBQTJLQTtBQUVBO0FBQ0E7QUE1S0E7QUFDQTtBQUNBO0FBOEtBOzs7QUFHQTtBQS9LQTtBQUNBOzs7OztBQUVBO0FBQ0E7Ozs7O0FBRUE7QUFDQTs7Ozs7QUFFQTtBQUNBOzs7OztBQUVBO0FBQ0E7Ozs7O0FBRUE7QUFDQTs7Ozs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7Ozs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7OztBQVFBO0FBQ0E7QUFDQTtBQUNBOzs7Ozs7QUFJQTs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7O0FBSUE7QUFDQTtBQUNBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QVBqTUE7QUFDQTs7O0FBQ0E7OztBQUVBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FFNURBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7OztBQU1BOzs7O0FBQ0E7QUFLQTs7Ozs7Ozs7O0FBSUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBS0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUlBO0FBQ0E7OztBQUVBOzs7OztBQUVBOzs7OztBQUVBOzs7Ozs7QUFJQTtBQUNBOzs7QUFLQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7OztBQUVBO0FBQ0E7Ozs7O0FBRUE7QUFDQTs7Ozs7QUFFQTtBQUNBOzs7OztBQUVBO0FBQ0E7Ozs7O0FBRUE7OztBQUVBO0FBQ0E7OztBQUdBOzs7O0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFFQTtBQU9BO0FBVUE7QUFDQTtBQUVBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFFQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBRTNHQTtBQUNBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7Ozs7Ozs7O0FFckNBO0FBQ0E7Ozs7QUFDQTs7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFHQTtBQUlBO0FBQ0E7QUFDQTs7O0FDdEJBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUlBO0FBQ0E7QUFDQTs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUlBO0FBa0pBO0FBV0E7QUFRQTtBQStEQTtBQWtCQTs7O0FBZUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7O0FDeFVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBRUE7Ozs7O0FBR0E7QUFDQTtBQUNBOzs7QUFDQTs7Ozs7Ozs7QUFJQTtBQUNBOzs7OztBQUdBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFFQTs7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUNBO0FBQ0E7O0FBRUE7OztBQUVBOzs7QUFRQTs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7O0FBTUE7QUFDQTs7QUFNQTtBQUNBOztBQU1BOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBT0E7QUFDQTtBQUNBOztBQUlBO0FBQ0E7O0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOztBQUVBO0FBQ0E7OztBQUlBO0FBQ0E7O0FBR0E7OztBQUdBOzs7O0FBQ0E7QUFDQTs7QUFFQTtBQUtBOzs7Ozs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBR0E7QUFDQTs7O0FBR0E7Ozs7QUFDQTtBQU1BO0FBQ0E7QUFDQTs7QUFHQTtBQUNBOzs7Ozs7Ozs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7Ozs7QUFDQTtBQUtBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7Ozs7Ozs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUtBO0FBQ0E7OztBQUtBOzs7O0FBQ0E7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUtBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBSW5WQTtBQUNBOzs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBS0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUlBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUtBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBOzs7QUFLQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUNBOzs7QUFFQTs7O0FBSUE7QUFDQTtBQUNBOzs7QUFDQTtBQUNBOzs7O0FBR0E7OztBQUtBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBS0E7QUFDQTs7O0FDN0dBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFjQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFJQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFFQTs7O0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7QUFFQTs7O0FBQ0E7QUFDQTs7QUFFQTs7O0FBRUE7OztBQUNBO0FBQ0E7O0FBRUE7OztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFFQTs7Ozs7O0FBRUE7Ozs7OztBQUVBOzs7Ozs7QUFFQTs7Ozs7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUlBO0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFHQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUdBO0FBQ0E7QUFDQTtBQUVBOzs7QUFFQTs7Ozs7QUFFQTs7Ozs7QUFFQTs7Ozs7QUFFQTs7Ozs7QUFFQTs7OztBQUlBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFLQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOzs7QUFNQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBO0FBQ0E7QUFDQTtBQUNBOzs7QUFLQTtBQUNBOzs7QUFRQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUM3UkE7QUFDQTtBQUdBOztBQUNBO0FBUUE7O0FBSUE7O0FBQ0E7QUFRQTs7QUFHQTtBQVdBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTs7O0FBSUE7O0FBVUE7OztBQUtBO0FBQ0E7QUFDQTtBQUNBOzs7O0FBSUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUtBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUtBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUlBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FFdEtBO0FBQ0E7Ozs7QUFDQTs7O0FBRUE7OztBQU1BO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBSUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBOzs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTs7O0FBTUE7QUFDQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7OztBQUdBOzs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7O0FBWUE7QUFDQTs7O0FBWUE7QUFDQTtBQUNBO0FBQ0E7O0FBQ0E7OztBQVFBO0FBQ0E7OztBQW9CQTtBQUNBO0FBVUE7QUFDQTs7QUFFQTtBQUNBOztBQUVBOzs7QUFHQTtBQUNBOzs7QUFNQTtBQUNBOzs7QUFJQTtBQUNBOzs7QUFTQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7QUFFQTs7QUFHQTtBQUNBOztBQUdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7OztBQUlBO0FBQ0E7O0FBT0E7QUFDQTs7QUFRQTtBQUNBOztBQU9BO0FBQ0E7O0FBQ0E7Ozs7QUFXQTtBQUNBO0FBQ0E7OztBQUtBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBQ0E7O0FBRUE7OztBQUtBO0FBQ0E7O0FBQ0E7O0FBRUE7O0FBSUE7QUFDQTtBQUNBOztBQUVBOztBQUdBO0FBQ0E7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBRWxYQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7OztBQUdBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTtBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7Ozs7QUFLQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTs7OztBQUlBO0FBQ0E7QUFDQTs7QUFFQTs7O0FBR0E7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FFakZBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7OztBQUdBO0FBQ0E7QUFDQTs7O0FBS0E7QUFDQTtBQUNBO0FBQ0E7Ozs7QUFJQTtBQUNBO0FBQ0E7QUFDQTs7OztBQUtBO0FBQ0E7OztBQVVBO0FBQ0E7QUFDQTtBQUNBO0FBRUE7QUFDQTtBQUVBO0FBQ0E7QUFDQTs7O0FBSUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7OztBQ3ZFQTtBQUNBOzs7QUFXQTtBQUNBOztBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7OztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTs7O0FBR0E7QUFDQTs7O0FBS0E7QUFDQTtBQUNBOztBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBOzs7QUFLQTtBQUNBO0FBQ0E7QUFDQTs7QUFDQTtBQUNBO0FBQ0E7OztBQUdBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBOzs7QUFHQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUEiLCJzb3VyY2VzQ29udGVudCI6WyJwYWNrYWdlIG1haW5cblxudGVtcGwgTm90Rm91bmRWaWV3KCkge1xuXHQ8ZGl2IGNsYXNzPXsgXCJlcnJvci1tZXNzYWdlIFwiICsgZXJyb3JNZXNzYWdlU3R5bGUoKSB9PlxuXHRcdDxoMT57IHQoXCJnZW5lcmFsLm5vdEZvdW5kXCIpIH08L2gxPlxuXHRcdDxwPnsgdChcImdlbmVyYWwubm90Rm91bmRNZXNzYWdlXCIpIH08L3A+XG5cdFx0PGRpdiBjbGFzcz17IFwiZG93bmxvYWQtYnV0dG9ucyBcIiArIGRvd25sb2FkQnV0dG9uc1N0eWxlKCkgfSBzdHlsZT1cIm1hcmdpbi10b3A6IDEuNXJlbTsganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XCI+XG5cdFx0XHQ8YSBocmVmPVwiL1wiIGNsYXNzPXsgXCJidG4gYnRuLXByaW1hcnkgZG93bmxvYWQtYnRuIFwiICsgZG93bmxvYWRCdG5TdHlsZSgpIH0gZGF0YS1hY3Rpb249XCJuYXZcIj57IHQoXCJnZW5lcmFsLmJhY2tUb0hvbWVcIikgfTwvYT5cblx0XHQ8L2Rpdj5cblx0PC9kaXY+XG59XG5cbnRlbXBsIFJvdXRlVmlldyhyIFJvdXRlTWF0Y2gpIHtcblx0c3dpdGNoIHIuS2luZCB7XG5cdGNhc2UgUm91dGVQb3N0OlxuXHRcdEBCbG9nUG9zdFZpZXcodmlldywgc2l0ZS5Db21tZW50cy5CbG9nRW5hYmxlZClcblx0Y2FzZSBSb3V0ZVByb2plY3Q6XG5cdFx0QFByb2plY3REZXRhaWwodmlldywgc2l0ZS5Db21tZW50cy5Qcm9qZWN0c0VuYWJsZWQpXG5cdGNhc2UgUm91dGVQYWdlOlxuXHRcdEBQYWdlVmlldyh2aWV3KVxuXHRjYXNlIFJvdXRlTm90Rm91bmQ6XG5cdFx0QE5vdEZvdW5kVmlldygpXG5cdGRlZmF1bHQ6XG5cdFx0QEJsb2dMaXN0KHBvc3RzLCByLlBhZ2UsIHNpdGUuUG9zdHNQZXJQYWdlKVxuXHR9XG59XG5cbmNzcyBtYWluQ29udGVudFN0eWxlKCkge1xuXHRtYXJnaW46IDAgYXV0bztcblx0cGFkZGluZzogdmFyKC0tc3BhY2luZy1sZyk7XG5cdGZsZXg6IDEgMCBhdXRvO1xuXHRtYXgtd2lkdGg6IDkwMHB4O1xuXHR3aWR0aDogMTAwJTtcblx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XG5cdGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcblx0YW5pbWF0aW9uOiBmYWRlSW4gMC4ycyBlYXNlLWluLW91dDtcblx0dHJhbnNpdGlvbjpcblx0XHRiYWNrZ3JvdW5kLWNvbG9yIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tZHVyYXRpb24pIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tdGltaW5nKSxcblx0XHRjb2xvciB2YXIoLS10aGVtZS10cmFuc2l0aW9uLWR1cmF0aW9uKSB2YXIoLS10aGVtZS10cmFuc2l0aW9uLXRpbWluZyk7XG5cblx0Jjpmb2N1cyB7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0fVxuXG5cdCYucGFnZS10cmFuc2l0aW9uLW91dCB7XG5cdFx0YW5pbWF0aW9uOiBmYWRlT3V0IDAuMnMgZWFzZS1pbi1vdXQgZm9yd2FyZHM7XG5cdH1cbn1cblxudGVtcGwgTWFpbkNvbnRlbnQoKSB7XG5cdDxtYWluIGlkPVwibWFpbi1jb250ZW50XCIgY2xhc3M9eyBtYWluQ29udGVudFN0eWxlKCkgfSB0YWJpbmRleD1cIi0xXCI+XG5cdFx0QFJvdXRlVmlldyhyb3V0ZSlcblx0PC9tYWluPlxufVxuXG5jc3MgYXBwU2hlbGxTdHlsZSgpIHtcblx0ZGlzcGxheTogZmxleDtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0bWluLWhlaWdodDogY2FsYygxMDB2aCAtIDU2cHgpO1xuXHRmbGV4OiAxIDAgYXV0bztcblxuXHQmIC5pY29uIHtcblx0XHRkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG5cdFx0dmVydGljYWwtYWxpZ246IG1pZGRsZTtcblx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0tdHJhbnNpdGlvbi1mYXN0KTtcblx0fVxuXHQmIC5pY29uOmhvdmVyIHtcblx0XHR0cmFuc2Zvcm06IHJvdGF0ZSg1ZGVnKSBzY2FsZSgxLjEpO1xuXHR9XG5cdCYgYS5pY29uOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cdH1cblxuXHQmIC5za2lwLWxpbmsge1xuXHRcdHBvc2l0aW9uOiBmaXhlZDtcblx0XHR0b3A6IC0xMDBweDtcblx0XHRsZWZ0OiAxcmVtO1xuXHRcdGJhY2tncm91bmQ6IHZhcigtLWFjY2VudCk7XG5cdFx0Y29sb3I6ICNmZmZmZmY7XG5cdFx0cGFkZGluZzogMC41cmVtIDFyZW07XG5cdFx0ei1pbmRleDogMTAwMDE7XG5cdFx0Ym9yZGVyLXJhZGl1czogdmFyKC0tYm9yZGVyLXJhZGl1cy1zbSk7XG5cdFx0Zm9udC13ZWlnaHQ6IDYwMDtcblx0XHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cdFx0Ym94LXNoYWRvdzogMCA0cHggMTJweCByZ2JhKDAsIDAsIDAsIDAuMyk7XG5cdFx0dHJhbnNpdGlvbjogdG9wIDAuMnMgZWFzZS1pbi1vdXQ7XG5cdH1cblx0JiAuc2tpcC1saW5rOmZvY3VzIHtcblx0XHR0b3A6IDFyZW07XG5cdH1cblx0JiAjbmF2YmFyLXNsb3QsXG5cdCYgI2NvbnRlbnQtc2xvdCB7XG5cdFx0ZGlzcGxheTogY29udGVudHM7XG5cdH1cbn1cblxudGVtcGwgQXBwU2hlbGwoKSB7XG5cdDxkaXYgcmVmPVwiYXBwUm9vdFwiIGNsYXNzPXsgXCJhcHAtcm9vdCBcIiArIGFwcFNoZWxsU3R5bGUoKSB9PlxuXHRcdDxhIGhyZWY9XCIjbWFpbi1jb250ZW50XCIgY2xhc3M9XCJza2lwLWxpbmtcIj57IHQoXCJuYXYuc2tpcFRvQ29udGVudFwiKSB9PC9hPlxuXHRcdDxkaXYgcmVmPVwicm91dGVBbm5vdW5jZXJcIiBpZD1cInJvdXRlLWFubm91bmNlclwiIGNsYXNzPVwic3Itb25seVwiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiIGFyaWEtYXRvbWljPVwidHJ1ZVwiPjwvZGl2PlxuXHRcdDxkaXYgaWQ9XCJuYXZiYXItc2xvdFwiPlxuXHRcdFx0QE5hdmJhcihyb3V0ZSwgbmF2UGFnZXMsIHByb2plY3RzLCBwcm9qZWN0c0Ryb3Bkb3duT3BlbiwgbW9iaWxlTWVudU9wZW4sIHNpdGUpXG5cdFx0PC9kaXY+XG5cdFx0PGRpdiBpZD1cImNvbnRlbnQtc2xvdFwiPlxuXHRcdFx0QE1haW5Db250ZW50KClcblx0XHQ8L2Rpdj5cblx0XHRARm9vdGVyKGN1cnJlbnRZZWFyKCksIHNpdGUuQXV0aG9yKVxuXHRcdEBTZWFyY2hNb2RhbChzZWFyY2hPcGVuLCBzZWFyY2hRdWVyeSwgc2VhcmNoUmVzdWx0cywgc2VhcmNoU2VsZWN0ZWRJbmRleCwgc2VhcmNoUGxhY2Vob2xkZXJUZXh0KCkpXG5cdFx0QENvbnRhY3RNb2RhbChjb250YWN0T3BlbiwgY29udGFjdEZvcm0pXG5cdDwvZGl2PlxufVxuXG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwic3RyY29udlwiXG5cbmNzcyBibG9nQ2FyZFN0eWxlKCkge1xuXHRwYWRkaW5nOiAxLjVyZW07XG5cdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMC4wMik7XG5cdGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XG5cdGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlci1yYWRpdXMtbGFyZ2UpO1xuXHR0cmFuc2l0aW9uOiBhbGwgdmFyKC0tdHJhbnNpdGlvbi1ub3JtYWwpO1xuXHRjdXJzb3I6IHBvaW50ZXI7XG5cblx0Jjpob3ZlciB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KTtcblx0XHRib3JkZXItY29sb3I6IHZhcigtLWFjY2VudCk7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKC00cHgpIHNjYWxlKDEuMDEpO1xuXHRcdGJveC1zaGFkb3c6IDAgOHB4IDI1cHggdmFyKC0tYWNjZW50LWdsb3cpO1xuXHR9XG5cdCYgLmJsb2ctcG9zdC10aXRsZSB7XG5cdFx0bWFyZ2luOiAwIDAgMC4zNXJlbSAwO1xuXHRcdGZvbnQtc2l6ZTogMS4zNWVtO1xuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHRcdGxpbmUtaGVpZ2h0OiAxLjM7XG5cdH1cblx0JiAuYmxvZy1wb3N0LXRpdGxlIGEge1xuXHRcdGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHRcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0XHR0cmFuc2l0aW9uOiBjb2xvciB2YXIoLS10cmFuc2l0aW9uLWZhc3QpO1xuXHR9XG5cdCYgLmJsb2ctcG9zdC10aXRsZSBhOmhvdmVyIHtcblx0XHRjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XG5cdH1cblx0JiAuYmxvZy1wb3N0LW1ldGEge1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0ZmxleC13cmFwOiB3cmFwO1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdFx0Z2FwOiAwLjc1cmVtO1xuXHRcdG1hcmdpbi1ib3R0b206IDAuNzVyZW07XG5cdFx0Zm9udC1zaXplOiAxZW07XG5cdFx0Y29sb3I6IHZhcigtLXRleHQtbGlnaHQpO1xuXHR9XG5cdCYgLmJsb2ctcG9zdC1kYXRlIHtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdFx0Z2FwOiAwLjRyZW07XG5cdH1cblx0JiAuYmxvZy1wb3N0LXRhZ3Mge1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0ZmxleC13cmFwOiB3cmFwO1xuXHRcdGdhcDogMC40cmVtO1xuXHR9XG5cdCYgLmJsb2ctcG9zdC1leGNlcnB0IHtcblx0XHRjb2xvcjogdmFyKC0tdGV4dC1saWdodCk7XG5cdFx0bGluZS1oZWlnaHQ6IDEuNTtcblx0XHRtYXJnaW4tYm90dG9tOiAwO1xuXHRcdGZvbnQtc2l6ZTogMS4wNWVtO1xuXHR9XG5cdCYgbWFyayB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50KTtcblx0XHRjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XG5cdFx0cGFkZGluZzogMXB4IDNweDtcblx0XHRib3JkZXItcmFkaXVzOiAycHg7XG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG5cdH1cblxuXHRAbWVkaWEgKG1heC13aWR0aDogNzY3cHgpIHtcblx0XHRwYWRkaW5nOiAxcmVtO1xuXHRcdG1hcmdpbjogMC4yNXJlbTtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0JiAuYmxvZy1wb3N0LXRpdGxlIHtcblx0XHRcdGZvbnQtc2l6ZTogMS4yNWVtO1xuXHRcdH1cblx0XHQmIC5ibG9nLXBvc3QtbWV0YSB7XG5cdFx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRcdFx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0XHRcdGdhcDogMC41cmVtO1xuXHRcdFx0Zm9udC1zaXplOiAwLjk1ZW07XG5cdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0XHR9XG5cdFx0JiAuYmxvZy1wb3N0LWV4Y2VycHQge1xuXHRcdFx0Zm9udC1zaXplOiAxZW07XG5cdFx0fVxuXHR9XG59XG5cbnRlbXBsIEJsb2dQb3N0Q2FyZChwb3N0IEJsb2dQb3N0KSB7XG5cdDxhcnRpY2xlXG5cdFx0Y2xhc3M9eyBcImJsb2ctcG9zdC1jYXJkIFwiICsgYmxvZ0NhcmRTdHlsZSgpIH1cblx0XHRkYXRhLWFjdGlvbj1cIm9wZW4tcG9zdFwiXG5cdFx0ZGF0YS1ocmVmPXsgcG9zdC5IcmVmIH1cblx0XHRyb2xlPVwiYXJ0aWNsZVwiXG5cdFx0YXJpYS1sYWJlbD17IHBvc3QuVGl0bGUgfVxuXHQ+XG5cdFx0PGgyIGNsYXNzPVwiYmxvZy1wb3N0LXRpdGxlXCI+XG5cdFx0XHQ8YSBocmVmPXsgcG9zdC5IcmVmIH0gZGF0YS1hY3Rpb249XCJuYXZcIj57IHBvc3QuVGl0bGUgfTwvYT5cblx0XHQ8L2gyPlxuXHRcdDxkaXYgY2xhc3M9XCJibG9nLXBvc3QtbWV0YVwiPlxuXHRcdFx0PHNwYW4gY2xhc3M9XCJibG9nLXBvc3QtZGF0ZVwiPlxuXHRcdFx0XHRASWNvbihcImNhbGVuZGFyXCIsIFwiMXJlbVwiKVxuXHRcdFx0XHR7IFwiIFwiICsgcG9zdC5EYXRlIH1cblx0XHRcdDwvc3Bhbj5cblx0XHRcdGlmIGxlbihwb3N0LlRhZ3MpID4gMCB7XG5cdFx0XHRcdDxzcGFuIGNsYXNzPVwiYmxvZy1wb3N0LXRhZ3NcIj5cblx0XHRcdFx0XHRmb3IgXywgdGFnIDo9IHJhbmdlIHBvc3QuVGFncyB7XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz17IFwiaXRlbS10YWcgY2xpY2thYmxlLXRhZyBcIiArIGl0ZW1UYWdTdHlsZSgpIH0gZGF0YS1zZWFyY2gtdGFnPXsgdGFnIH0+eyB0YWcgfTwvc3Bhbj5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvc3Bhbj5cblx0XHRcdH1cblx0XHQ8L2Rpdj5cblx0XHQ8cCBjbGFzcz1cImJsb2ctcG9zdC1leGNlcnB0XCI+eyBwb3N0LkV4Y2VycHQgfTwvcD5cblx0PC9hcnRpY2xlPlxufVxuXG5jc3MgcGFnaW5hdGlvblN0eWxlKCkge1xuXHRtYXJnaW46IDJyZW0gMDtcblx0ZGlzcGxheTogZmxleDtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cblx0JiAucGFnaW5hdGlvbiB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRnYXA6IDAuNXJlbTtcblx0XHRsaXN0LXN0eWxlOiBub25lO1xuXHRcdHBhZGRpbmc6IDA7XG5cdFx0bWFyZ2luOiAwO1xuXHR9XG5cdCYgLnBhZ2UtaXRlbSB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0fVxuXHQmIC5wYWdlLWxpbmsge1xuXHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdFx0cGFkZGluZzogMC41cmVtIDAuNzVyZW07XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyNTUsIDI1NSwgMjU1LCAwLjAyKTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xuXHRcdGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlci1yYWRpdXMpO1xuXHRcdGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcblx0XHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cdFx0dHJhbnNpdGlvbjogYWxsIHZhcigtLXRyYW5zaXRpb24tZmFzdCk7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdG1pbi13aWR0aDogNDBweDtcblx0XHRoZWlnaHQ6IDM4cHg7XG5cdFx0Ym94LXNpemluZzogYm9yZGVyLWJveDtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdH1cblx0JiAucGFnZS1saW5rIHN2ZyB7XG5cdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHRcdHZlcnRpY2FsLWFsaWduOiBtaWRkbGU7XG5cdH1cblx0JiAucGFnZS1saW5rOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jb2xvcik7XG5cdFx0Ym9yZGVyLWNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHRcdGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHR9XG5cdCYgLnBhZ2UtaXRlbS5hY3RpdmUgLnBhZ2UtbGluayB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50KTtcblx0XHRib3JkZXItY29sb3I6IHZhcigtLWFjY2VudCk7XG5cdFx0Y29sb3I6IHZhcigtLWJhY2tncm91bmQtY29sb3IpO1xuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHR9XG5cdCYgLnBhZ2UtaXRlbS5kaXNhYmxlZCAucGFnZS1saW5rIHtcblx0XHRvcGFjaXR5OiAwLjU7XG5cdFx0Y3Vyc29yOiBub3QtYWxsb3dlZDtcblx0XHRwb2ludGVyLWV2ZW50czogbm9uZTtcblx0fVxuXG5cdEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuXHRcdCYgLnBhZ2UtbGluayB7XG5cdFx0XHRwYWRkaW5nOiAwLjRyZW0gMC42cmVtO1xuXHRcdFx0Zm9udC1zaXplOiAwLjllbTtcblx0XHRcdG1pbi13aWR0aDogMzVweDtcblx0XHRcdGhlaWdodDogMzVweDtcblx0XHR9XG5cdH1cbn1cblxudGVtcGwgUGFnaW5hdGlvbihjdXJyZW50UGFnZSBpbnQsIHRvdGFsUGFnZXMgaW50KSB7XG5cdDxuYXYgY2xhc3M9eyBcImJsb2ctcGFnaW5hdGlvbiBcIiArIHBhZ2luYXRpb25TdHlsZSgpIH0gYXJpYS1sYWJlbD1cIkJsb2cgcGFnaW5hdGlvblwiPlxuXHRcdDx1bCBjbGFzcz1cInBhZ2luYXRpb25cIj5cblx0XHRcdDxsaSBjbGFzcz17IGNscyhcInBhZ2UtaXRlbVwiLCBjdXJyZW50UGFnZSA8PSAxLCBcImRpc2FibGVkXCIpIH0+XG5cdFx0XHRcdDxhIGNsYXNzPVwicGFnZS1saW5rXCIgaHJlZj17IHBhZ2VIcmVmKDEpIH0gZGF0YS1hY3Rpb249XCJuYXZcIiBhcmlhLWxhYmVsPVwiRmlyc3RcIiB0aXRsZT1cIkZpcnN0IFBhZ2VcIj5cblx0XHRcdFx0XHRASWNvbihcImFuZ2xlcy1sZWZ0XCIsIFwiMC44NWVtXCIpXG5cdFx0XHRcdDwvYT5cblx0XHRcdDwvbGk+XG5cdFx0XHQ8bGkgY2xhc3M9eyBjbHMoXCJwYWdlLWl0ZW1cIiwgY3VycmVudFBhZ2UgPD0gMSwgXCJkaXNhYmxlZFwiKSB9PlxuXHRcdFx0XHQ8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9eyBwYWdlSHJlZihjdXJyZW50UGFnZSAtIDEpIH0gZGF0YS1hY3Rpb249XCJuYXZcIiBhcmlhLWxhYmVsPVwiUHJldmlvdXNcIiB0aXRsZT1cIlByZXZpb3VzIFBhZ2VcIj5cblx0XHRcdFx0XHRASWNvbihcImNoZXZyb24tbGVmdFwiLCBcIjAuODVlbVwiKVxuXHRcdFx0XHQ8L2E+XG5cdFx0XHQ8L2xpPlxuXHRcdFx0Zm9yIF8sIHBhZ2VOdW0gOj0gcmFuZ2UgcGFnZU51bWJlcnModG90YWxQYWdlcykge1xuXHRcdFx0XHQ8bGkgY2xhc3M9eyBjbHMoXCJwYWdlLWl0ZW1cIiwgcGFnZU51bSA9PSBjdXJyZW50UGFnZSwgXCJhY3RpdmVcIikgfT5cblx0XHRcdFx0XHQ8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9eyBwYWdlSHJlZihwYWdlTnVtKSB9IGRhdGEtYWN0aW9uPVwibmF2XCI+eyBwYWdlTnVtIH08L2E+XG5cdFx0XHRcdDwvbGk+XG5cdFx0XHR9XG5cdFx0XHQ8bGkgY2xhc3M9eyBjbHMoXCJwYWdlLWl0ZW1cIiwgY3VycmVudFBhZ2UgPj0gdG90YWxQYWdlcywgXCJkaXNhYmxlZFwiKSB9PlxuXHRcdFx0XHQ8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9eyBwYWdlSHJlZihjdXJyZW50UGFnZSArIDEpIH0gZGF0YS1hY3Rpb249XCJuYXZcIiBhcmlhLWxhYmVsPVwiTmV4dFwiIHRpdGxlPVwiTmV4dCBQYWdlXCI+XG5cdFx0XHRcdFx0QEljb24oXCJjaGV2cm9uLXJpZ2h0XCIsIFwiMC44NWVtXCIpXG5cdFx0XHRcdDwvYT5cblx0XHRcdDwvbGk+XG5cdFx0XHQ8bGkgY2xhc3M9eyBjbHMoXCJwYWdlLWl0ZW1cIiwgY3VycmVudFBhZ2UgPj0gdG90YWxQYWdlcywgXCJkaXNhYmxlZFwiKSB9PlxuXHRcdFx0XHQ8YSBjbGFzcz1cInBhZ2UtbGlua1wiIGhyZWY9eyBwYWdlSHJlZih0b3RhbFBhZ2VzKSB9IGRhdGEtYWN0aW9uPVwibmF2XCIgYXJpYS1sYWJlbD1cIkxhc3RcIiB0aXRsZT1cIkxhc3QgUGFnZVwiPlxuXHRcdFx0XHRcdEBJY29uKFwiYW5nbGVzLXJpZ2h0XCIsIFwiMC44NWVtXCIpXG5cdFx0XHRcdDwvYT5cblx0XHRcdDwvbGk+XG5cdFx0PC91bD5cblx0PC9uYXY+XG59XG5cbmNzcyBibG9nTGlzdFN0eWxlKCkge1xuXHRtYXgtd2lkdGg6IDkwMHB4O1xuXHRtYXJnaW46IDAgYXV0bztcblx0dGV4dC1hbGlnbjogbGVmdDtcblxuXHQmIC5ibG9nLXBhZ2UtdGl0bGUge1xuXHRcdGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHRcdGZvbnQtc2l6ZTogMmVtO1xuXHRcdG1hcmdpbi1ib3R0b206IDEuNXJlbTtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdH1cblx0JiAuYmxvZy1lbXB0eSB7XG5cdFx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRcdGNvbG9yOiB2YXIoLS10ZXh0LWxpZ2h0KTtcblx0XHRmb250LXNpemU6IDEuMWVtO1xuXHRcdHBhZGRpbmc6IDJyZW0gMDtcblx0fVxuXHQmIC5ibG9nLXBvc3RzIHtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdFx0Z2FwOiAxLjVyZW07XG5cdFx0bWFyZ2luLWJvdHRvbTogMnJlbTtcblx0fVxuXG5cdEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuXHRcdCYgLmJsb2ctcG9zdHMge1xuXHRcdFx0Z2FwOiAwLjVyZW07XG5cdFx0fVxuXHR9XG59XG5cbnRlbXBsIEJsb2dMaXN0KGFsbFBvc3RzIFtdQmxvZ1Bvc3QsIGN1cnJlbnRQYWdlIGludCwgcGVyUGFnZSBpbnQpIHtcblx0PGRpdiBjbGFzcz17IFwiYmxvZy1jb250YWluZXIgXCIgKyBibG9nTGlzdFN0eWxlKCkgfT5cblx0XHQ8aDEgY2xhc3M9XCJzci1vbmx5XCI+eyB0KFwibmF2LmJsb2dcIikgfTwvaDE+XG5cdFx0aWYgbGVuKGFsbFBvc3RzKSA9PSAwIHtcblx0XHRcdDxwIGNsYXNzPVwiYmxvZy1lbXB0eVwiPnsgdChcImJsb2cubm9Qb3N0c1wiKSB9PC9wPlxuXHRcdH0gZWxzZSB7XG5cdFx0XHQ8ZGl2IGNsYXNzPVwiYmxvZy1wb3N0c1wiPlxuXHRcdFx0XHRmb3IgXywgcG9zdCA6PSByYW5nZSBwYWdpbmF0ZWRQb3N0cyhhbGxQb3N0cywgY3VycmVudFBhZ2UsIHBlclBhZ2UpIHtcblx0XHRcdFx0XHRAQmxvZ1Bvc3RDYXJkKHBvc3QpXG5cdFx0XHRcdH1cblx0XHRcdDwvZGl2PlxuXHRcdFx0aWYgY2FsY1RvdGFsUGFnZXMobGVuKGFsbFBvc3RzKSwgcGVyUGFnZSkgPiAxIHtcblx0XHRcdFx0QFBhZ2luYXRpb24oY3VycmVudFBhZ2UsIGNhbGNUb3RhbFBhZ2VzKGxlbihhbGxQb3N0cyksIHBlclBhZ2UpKVxuXHRcdFx0fVxuXHRcdH1cblx0PC9kaXY+XG59XG5cbmNzcyB0b2NTdHlsZSgpIHtcblx0YmFja2dyb3VuZDogdHJhbnNwYXJlbnQ7XG5cdGJvcmRlcjogbm9uZTtcblx0Ym9yZGVyLWxlZnQ6IDJweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xuXHRib3JkZXItcmFkaXVzOiAwO1xuXHRwYWRkaW5nOiAwLjI1cmVtIDAgMC4yNXJlbSAwLjg1cmVtO1xuXHRtYXJnaW46IDEuNXJlbSAwIDJyZW0gMDtcblx0dGV4dC1hbGlnbjogbGVmdDtcblx0dHJhbnNpdGlvbjogYm9yZGVyLWNvbG9yIDAuMnMgZWFzZTtcblxuXHQmOmhvdmVyLFxuXHQmW29wZW5dIHtcblx0XHRib3JkZXItbGVmdC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLWFjY2VudCkgNTAlLCB2YXIoLS1ib3JkZXItY29sb3IpKTtcblx0fVxuXHQmIC5ibG9nLXRvYy10aXRsZSB7XG5cdFx0Zm9udC1zaXplOiAxcmVtO1xuXHRcdGZvbnQtd2VpZ2h0OiA2MDA7XG5cdFx0dGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcblx0XHRsZXR0ZXItc3BhY2luZzogMC4wNWVtO1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0XHRjb2xvcjogdmFyKC0tdGV4dC1saWdodCk7XG5cdFx0dXNlci1zZWxlY3Q6IG5vbmU7XG5cdFx0dHJhbnNpdGlvbjogY29sb3IgMC4xNXMgZWFzZTtcblx0XHRkaXNwbGF5OiBpbmxpbmUtZmxleDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdGdhcDogMC4zNXJlbTtcblx0fVxuXHQmIC5ibG9nLXRvYy10aXRsZTpob3ZlciB7XG5cdFx0Y29sb3I6IHZhcigtLWFjY2VudCk7XG5cdH1cblx0JiAuYmxvZy10b2MtdGl0bGU6Zm9jdXMtdmlzaWJsZSB7XG5cdFx0b3V0bGluZTogMnB4IHNvbGlkIHZhcigtLWFjY2VudCk7XG5cdFx0b3V0bGluZS1vZmZzZXQ6IDJweDtcblx0XHRib3JkZXItcmFkaXVzOiAycHg7XG5cdH1cblx0JiAuYmxvZy10b2MtbmF2IHtcblx0XHRtYXJnaW4tdG9wOiAwLjVyZW07XG5cdH1cblx0JiAuYmxvZy10b2MtbGlzdCB7XG5cdFx0bGlzdC1zdHlsZTogbm9uZTtcblx0XHRwYWRkaW5nOiAwO1xuXHRcdG1hcmdpbjogMDtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdFx0YWxpZ24taXRlbXM6IGZsZXgtc3RhcnQ7XG5cdFx0Z2FwOiAwLjM1cmVtO1xuXHR9XG5cdCYgLmJsb2ctdG9jLWl0ZW0ge1xuXHRcdHRleHQtYWxpZ246IGxlZnQ7XG5cdH1cblx0JiAuYmxvZy10b2MtaXRlbSBhIHtcblx0XHRjb2xvcjogdmFyKC0tdGV4dC1saWdodCk7XG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXHRcdGZvbnQtc2l6ZTogMXJlbTtcblx0XHRsaW5lLWhlaWdodDogMS41O1xuXHRcdHRyYW5zaXRpb246IGNvbG9yIDAuMTVzIGVhc2U7XG5cdFx0ZGlzcGxheTogaW5saW5lLWJsb2NrO1xuXHR9XG5cdCYgLmJsb2ctdG9jLWl0ZW0gYTpob3ZlciB7XG5cdFx0Y29sb3I6IHZhcigtLWFjY2VudCk7XG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXHR9XG5cdCYgLmJsb2ctdG9jLWxldmVsLTMge1xuXHRcdHBhZGRpbmctbGVmdDogMS4yNXJlbTtcblx0fVxuXHQmIC5ibG9nLXRvYy1sZXZlbC0zIGEge1xuXHRcdGZvbnQtc2l6ZTogMC45NXJlbTtcblx0XHRvcGFjaXR5OiAwLjk7XG5cdH1cbn1cblxudGVtcGwgVGFibGVPZkNvbnRlbnRzKGl0ZW1zIFtdVE9DSXRlbSkge1xuXHRpZiBsZW4oaXRlbXMpID49IDIge1xuXHRcdDxkZXRhaWxzIGNsYXNzPXsgXCJibG9nLXRvYyBcIiArIHRvY1N0eWxlKCkgfT5cblx0XHRcdDxzdW1tYXJ5IGNsYXNzPVwiYmxvZy10b2MtdGl0bGVcIj57IHQoXCJibG9nLnRhYmxlT2ZDb250ZW50c1wiKSB9PC9zdW1tYXJ5PlxuXHRcdFx0PG5hdiBjbGFzcz1cImJsb2ctdG9jLW5hdlwiIGFyaWEtbGFiZWw9eyB0KFwiYmxvZy50YWJsZU9mQ29udGVudHNcIikgfT5cblx0XHRcdFx0PHVsIGNsYXNzPVwiYmxvZy10b2MtbGlzdFwiPlxuXHRcdFx0XHRcdGZvciBfLCBpdGVtIDo9IHJhbmdlIGl0ZW1zIHtcblx0XHRcdFx0XHRcdDxsaSBjbGFzcz17IFwiYmxvZy10b2MtaXRlbSBibG9nLXRvYy1sZXZlbC1cIiArIHN0cmNvbnYuSXRvYShpdGVtLkxldmVsKSB9PlxuXHRcdFx0XHRcdFx0XHQ8YSBocmVmPXsgXCIjXCIgKyBpdGVtLklEIH0+eyBpdGVtLlRleHQgfTwvYT5cblx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0PC9uYXY+XG5cdFx0PC9kZXRhaWxzPlxuXHR9XG59XG5cbmNzcyBwb3N0TmF2U3R5bGUoKSB7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdGZsZXgtd3JhcDogbm93cmFwO1xuXHRnYXA6IDE1cHg7XG5cdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0bWFyZ2luOiAyLjVyZW0gMDtcblxuXHQmIC5ibG9nLW5hdi1uZXh0IHtcblx0XHRtYXJnaW4tbGVmdDogYXV0bztcblx0fVxufVxuXG5jc3MgYmxvZ1Bvc3RWaWV3U3R5bGUoKSB7XG5cdCYgLnByb2plY3QtdGl0bGUge1xuXHRcdGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHRcdGZvbnQtc2l6ZTogMS41ZW07XG5cdFx0bWFyZ2luOiAwIDAgMC4wMmVtIDA7XG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG5cdH1cblx0JiAucHJvamVjdC1kZXNjcmlwdGlvbiB7XG5cdFx0bWFyZ2luOiAwIDAgMC41ZW0gMDtcblx0XHRjb2xvcjogdmFyKC0tdGV4dC1saWdodCk7XG5cdFx0Zm9udC1zaXplOiAxLjJlbTtcblx0XHRsaW5lLWhlaWdodDogMS42O1xuXHR9XG5cdCYgLnByb2plY3QtdGFncyB7XG5cdFx0bWFyZ2luOiAwLjhlbSAwO1xuXHRcdGZvbnQtc2l6ZTogMS4xZW07XG5cdH1cbn1cblxudGVtcGwgQmxvZ1Bvc3RWaWV3KHYgVmlld1N0YXRlLCBjb21tZW50c0VuYWJsZWQgYm9vbCkge1xuXHRpZiB2LlN0YXR1cyA9PSBMb2FkTm90Rm91bmQgfHwgdi5TdGF0dXMgPT0gTG9hZEZhaWxlZCB7XG5cdFx0PGRpdiBjbGFzcz17IFwiZXJyb3ItbWVzc2FnZSBcIiArIGVycm9yTWVzc2FnZVN0eWxlKCkgfT5cblx0XHRcdDxoMT57IHQoXCJnZW5lcmFsLmJsb2dOb3RGb3VuZFwiKSB9PC9oMT5cblx0XHRcdDxwPnsgdChcImdlbmVyYWwuYmxvZ05vdEZvdW5kTWVzc2FnZVwiKSB9PC9wPlxuXHRcdDwvZGl2PlxuXHR9IGVsc2Uge1xuXHRcdDxkaXYgY2xhc3M9eyBcImJsb2ctcG9zdC12aWV3IFwiICsgYmxvZ1Bvc3RWaWV3U3R5bGUoKSB9PlxuXHRcdFx0PGgxIGNsYXNzPVwicHJvamVjdC10aXRsZVwiPnsgdi5Qb3N0LlRpdGxlIH08L2gxPlxuXHRcdFx0PHAgY2xhc3M9XCJwcm9qZWN0LWRlc2NyaXB0aW9uXCI+eyB2LlBvc3QuRGF0ZSB9PC9wPlxuXHRcdFx0aWYgbGVuKHYuUG9zdC5UYWdzKSA+IDAge1xuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHJvamVjdC10YWdzXCI+XG5cdFx0XHRcdFx0Zm9yIF8sIHRhZyA6PSByYW5nZSB2LlBvc3QuVGFncyB7XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz17IFwiaXRlbS10YWcgY2xpY2thYmxlLXRhZyBcIiArIGl0ZW1UYWdTdHlsZSgpIH0gZGF0YS1zZWFyY2gtdGFnPXsgdGFnIH0+eyB0YWcgfTwvc3Bhbj5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0fVxuXHRcdFx0QFRhYmxlT2ZDb250ZW50cyh2LlRPQylcblx0XHRcdDxkaXYgY2xhc3M9XCJibG9nLXBvc3QtY29udGVudFwiPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPXsgXCJtYXJrZG93bi1ib2R5IFwiICsgbWFya2Rvd25Cb2R5U3R5bGUoKSB9PlxuXHRcdFx0XHRcdEB0ZW1wbC5SYXcodi5IVE1MKVxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdDwvZGl2PlxuXHRcdFx0aWYgdi5IYXNQcmV2IHx8IHYuSGFzTmV4dCB7XG5cdFx0XHRcdDxuYXYgY2xhc3M9eyBcImRvd25sb2FkLWJ1dHRvbnMgYmxvZy1wb3N0LW5hdiBcIiArIHBvc3ROYXZTdHlsZSgpIH0gYXJpYS1sYWJlbD1cIlBvc3QgbmF2aWdhdGlvblwiPlxuXHRcdFx0XHRcdGlmIHYuSGFzUHJldiB7XG5cdFx0XHRcdFx0XHQ8YSBocmVmPXsgdi5QcmV2UG9zdC5IcmVmIH0gY2xhc3M9eyBcImRvd25sb2FkLWJ0biBibG9nLW5hdi1wcmV2IFwiICsgZG93bmxvYWRCdG5TdHlsZSgpIH0gZGF0YS1hY3Rpb249XCJuYXZcIiB0aXRsZT17IHYuUHJldlBvc3QuVGl0bGUgfT5cblx0XHRcdFx0XHRcdFx0QEljb24oXCJhcnJvdy1sZWZ0XCIsIFwiMXJlbVwiKVxuXHRcdFx0XHRcdFx0XHQ8c3Bhbj57IHQoXCJibG9nLnByZXZpb3VzUG9zdFwiKSB9PC9zcGFuPlxuXHRcdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRpZiB2Lkhhc05leHQge1xuXHRcdFx0XHRcdFx0PGEgaHJlZj17IHYuTmV4dFBvc3QuSHJlZiB9IGNsYXNzPXsgXCJkb3dubG9hZC1idG4gYmxvZy1uYXYtbmV4dCBcIiArIGRvd25sb2FkQnRuU3R5bGUoKSB9IGRhdGEtYWN0aW9uPVwibmF2XCIgdGl0bGU9eyB2Lk5leHRQb3N0LlRpdGxlIH0+XG5cdFx0XHRcdFx0XHRcdDxzcGFuPnsgdChcImJsb2cubmV4dFBvc3RcIikgfTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0QEljb24oXCJhcnJvdy1yaWdodFwiLCBcIjFyZW1cIilcblx0XHRcdFx0XHRcdDwvYT5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvbmF2PlxuXHRcdFx0fVxuXHRcdFx0aWYgY29tbWVudHNFbmFibGVkIHtcblx0XHRcdFx0PGRpdiBjbGFzcz17IFwiZ2lzY3VzLWNvbnRhaW5lciBcIiArIGdpc2N1c1N0eWxlKCkgfT48L2Rpdj5cblx0XHRcdH1cblx0XHQ8L2Rpdj5cblx0fVxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImpzOi4vYnJvd3Nlci5kLnRzXCJcbmltcG9ydCBcInN0cmluZ3NcIlxuXG4vLyBnaXNjdXNUaGVtZSBpcyB0aGUgY29uZmlndXJlZCBjb21tZW50cyB0aGVtZSBmb3IgdGhlIGFjdGl2ZSBzaXRlIHRoZW1lLFxuLy8gZmFsbGluZyBiYWNrIHRvIHRoZSB0aGVtZSBuYW1lIGl0c2VsZiAoXCJkYXJrXCIvXCJsaWdodFwiKS5cbmZ1bmMgZ2lzY3VzVGhlbWUoKSBzdHJpbmcge1xuXHRpZiBjdCA6PSBnZXRUaGVtZUNvbG9ycyhjdXJyZW50VGhlbWUpLkNvbW1lbnRzVGhlbWU7IGN0ICE9IFwiXCIge1xuXHRcdHJldHVybiBjdFxuXHR9XG5cdHJldHVybiBjdXJyZW50VGhlbWVcbn1cblxuLy8ga2ViYWIgY29udmVydHMgYSBjYW1lbENhc2Uga2V5IHRvIGtlYmFiLWNhc2UgKHJlcG9JZCAtPiByZXBvLWlkKS5cbmZ1bmMga2ViYWIocyBzdHJpbmcpIHN0cmluZyB7XG5cdHZhciBiIHN0cmluZ3MuQnVpbGRlclxuXHRmb3IgaSA6PSAwOyBpIDwgbGVuKHMpOyBpKysge1xuXHRcdGMgOj0gc1tpXVxuXHRcdGlmIGMgPj0gJ0EnICYmIGMgPD0gJ1onIHtcblx0XHRcdGIuV3JpdGVCeXRlKCctJylcblx0XHRcdGIuV3JpdGVCeXRlKGMgKyAoJ2EnIC0gJ0EnKSlcblx0XHR9IGVsc2Uge1xuXHRcdFx0Yi5Xcml0ZUJ5dGUoYylcblx0XHR9XG5cdH1cblx0cmV0dXJuIGIuU3RyaW5nKClcbn1cblxuLy8gZ2lzY3VzQXR0cnMgbWFwcyB0aGUgcmF3IGNvbW1lbnRzIGNvbmZpZyB0byBkYXRhLSogYXR0cmlidXRlczsgdGhlIHR3byBwYWdlXG4vLyB0b2dnbGVzIGFyZSBvdXJzLCBldmVyeXRoaW5nIGVsc2UgaXMgcGFzc2VkIHRocm91Z2ggdG8gZ2lzY3VzLlxuZnVuYyBnaXNjdXNBdHRycyhyYXcgYW55LCB0aGVtZSBzdHJpbmcpIG1hcFtzdHJpbmddc3RyaW5nIHtcblx0YXR0cnMgOj0gbWFwW3N0cmluZ11zdHJpbmd7XCJkYXRhLXRoZW1lXCI6IHRoZW1lfVxuXHRpZiByYXcgIT0gbmlsIHtcblx0XHRmb3IgaywgdiA6PSByYW5nZSByYXcuKG1hcFtzdHJpbmddYW55KSB7XG5cdFx0XHRpZiBrID09IFwiYmxvZ0VuYWJsZWRcIiB8fCBrID09IFwicHJvamVjdHNFbmFibGVkXCIge1xuXHRcdFx0XHRjb250aW51ZVxuXHRcdFx0fVxuXHRcdFx0YXR0cnNbXCJkYXRhLVwiK2tlYmFiKGspXSA9IHN0clZhbCh2KVxuXHRcdH1cblx0fVxuXHRyZXR1cm4gYXR0cnNcbn1cblxuZnVuYyBsb2FkR2lzY3VzKCkge1xuXHRjb250YWluZXIgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5naXNjdXMtY29udGFpbmVyXCIpXG5cdGlmIGNvbnRhaW5lciA9PSBuaWwge1xuXHRcdHJldHVyblxuXHR9XG5cblx0Ly8gQ2xlYXIgYW55IGV4aXN0aW5nIGdpc2N1cyBjb250ZW50XG5cdGNvbnRhaW5lci5pbm5lckhUTUwgPSBcIlwiXG5cblx0c2NyaXB0IDo9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJzY3JpcHRcIilcblx0c2NyaXB0LnNyYyA9IFwiaHR0cHM6Ly9naXNjdXMuYXBwL2NsaWVudC5qc1wiXG5cdGZvciBuYW1lLCB2YWx1ZSA6PSByYW5nZSBnaXNjdXNBdHRycyhzaXRlLkNvbW1lbnRzLkF0dHJzLCBnaXNjdXNUaGVtZSgpKSB7XG5cdFx0c2NyaXB0LnNldEF0dHJpYnV0ZShuYW1lLCB2YWx1ZSlcblx0fVxuXHRzY3JpcHQuc2V0QXR0cmlidXRlKFwiY3Jvc3NvcmlnaW5cIiwgXCJhbm9ueW1vdXNcIilcblx0c2NyaXB0LmFzeW5jID0gdHJ1ZVxuXHRjb250YWluZXIuYXBwZW5kQ2hpbGQoc2NyaXB0KVxufVxuXG5mdW5jIHVwZGF0ZUdpc2N1c1RoZW1lKCkge1xuXHRpZnJhbWUgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcImlmcmFtZS5naXNjdXMtZnJhbWVcIilcblx0aWYgaWZyYW1lID09IG5pbCB7XG5cdFx0cmV0dXJuXG5cdH1cblxuXHRpZnJhbWUuY29udGVudFdpbmRvdy5wb3N0TWVzc2FnZShtYXBbc3RyaW5nXWFueXtcblx0XHRcImdpc2N1c1wiOiBtYXBbc3RyaW5nXWFueXtcblx0XHRcdFwic2V0Q29uZmlnXCI6IG1hcFtzdHJpbmddYW55e1xuXHRcdFx0XHRcInRoZW1lXCI6IGdpc2N1c1RoZW1lKCksXG5cdFx0XHR9LFxuXHRcdH0sXG5cdH0sIFwiaHR0cHM6Ly9naXNjdXMuYXBwXCIpXG59XG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwic3RyY29udlwiXG5cbnRlbXBsIENvbnRhY3RGb3JtRmllbGRzKGZvcm0gQ29udGFjdFN0YXRlKSB7XG5cdDxkaXYgY2xhc3M9XCJmb3JtLWdyb3VwXCI+XG5cdFx0PGxhYmVsIGZvcj1cImNvbnRhY3QtbmFtZVwiPnsgdChcImNvbnRhY3QubmFtZVwiKSB9KjwvbGFiZWw+XG5cdFx0PGlucHV0IHR5cGU9XCJ0ZXh0XCIgaWQ9XCJjb250YWN0LW5hbWVcIiBuYW1lPVwibmFtZVwiIHJlcXVpcmVkIGNsYXNzPXsgY2xzKFwiXCIsIGZvcm0uRXJyTmFtZSwgXCJlcnJvclwiKSB9IGFyaWEtaW52YWxpZD17IHN0cmNvbnYuRm9ybWF0Qm9vbChmb3JtLkVyck5hbWUpIH0gdmFsdWU9eyBmb3JtLk5hbWUgfS8+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuXHRcdDxsYWJlbCBmb3I9XCJjb250YWN0LWVtYWlsXCI+eyB0KFwiY29udGFjdC5lbWFpbFwiKSB9KjwvbGFiZWw+XG5cdFx0PGlucHV0IHR5cGU9XCJlbWFpbFwiIGlkPVwiY29udGFjdC1lbWFpbFwiIG5hbWU9XCJlbWFpbFwiIHJlcXVpcmVkIGNsYXNzPXsgY2xzKFwiXCIsIGZvcm0uRXJyRW1haWwsIFwiZXJyb3JcIikgfSBhcmlhLWludmFsaWQ9eyBzdHJjb252LkZvcm1hdEJvb2woZm9ybS5FcnJFbWFpbCkgfSB2YWx1ZT17IGZvcm0uRW1haWwgfS8+XG5cdDwvZGl2PlxuXHQ8ZGl2IGNsYXNzPVwiZm9ybS1ncm91cFwiPlxuXHRcdDxsYWJlbCBmb3I9XCJjb250YWN0LW1lc3NhZ2VcIj57IHQoXCJjb250YWN0Lm1lc3NhZ2VcIikgfSo8L2xhYmVsPlxuXHRcdDx0ZXh0YXJlYSBpZD1cImNvbnRhY3QtbWVzc2FnZVwiIG5hbWU9XCJtZXNzYWdlXCIgcm93cz1cIjZcIiByZXF1aXJlZCBjbGFzcz17IGNscyhcIlwiLCBmb3JtLkVyck1lc3NhZ2UsIFwiZXJyb3JcIikgfSBhcmlhLWludmFsaWQ9eyBzdHJjb252LkZvcm1hdEJvb2woZm9ybS5FcnJNZXNzYWdlKSB9PnsgZm9ybS5NZXNzYWdlIH08L3RleHRhcmVhPlxuXHQ8L2Rpdj5cblx0PGRpdiBjbGFzcz17IGZvcm1TdGF0dXNDbGFzcyhmb3JtLlN0YXR1c1R5cGUpIH0gaWQ9XCJjb250YWN0LXN0YXR1c1wiIGFyaWEtbGl2ZT1cInBvbGl0ZVwiPlxuXHRcdDxzcGFuPnsgZm9ybS5TdGF0dXNUZXh0IH08L3NwYW4+XG5cdDwvZGl2PlxuXHQ8YnV0dG9uIHR5cGU9XCJzdWJtaXRcIiBjbGFzcz1cImJ0biBidG4tcHJpbWFyeVwiIGlkPVwiY29udGFjdC1zdWJtaXRcIiBkaXNhYmxlZD89eyBmb3JtLkJ1dHRvbkRpc2FibGVkIH0+XG5cdFx0eyB0KFwiY29udGFjdC5cIiArIGZvcm0uQnV0dG9uU3RhdGUpIH1cblx0PC9idXR0b24+XG59XG5cbmNzcyBjb250YWN0TW9kYWxTdHlsZSgpIHtcblx0ZGlzcGxheTogZmxleDtcblx0YWxpZ24taXRlbXM6IGNlbnRlcjtcblx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdHBvc2l0aW9uOiBmaXhlZDtcblx0dG9wOiAwO1xuXHRsZWZ0OiAwO1xuXHR3aWR0aDogMTAwJTtcblx0aGVpZ2h0OiAxMDAlO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiByZ2JhKDAsIDAsIDAsIDAuNyk7XG5cdGJhY2tkcm9wLWZpbHRlcjogYmx1cig2cHgpO1xuXHQtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cig2cHgpO1xuXHR6LWluZGV4OiAxMDAwMDtcblx0b3ZlcmZsb3cteTogYXV0bztcblx0b3ZlcnNjcm9sbC1iZWhhdmlvcjogY29udGFpbjtcblx0cGFkZGluZzogMnJlbSAxcmVtO1xuXHR2aXNpYmlsaXR5OiBoaWRkZW47XG5cdG9wYWNpdHk6IDA7XG5cdHRyYW5zaXRpb246XG5cdFx0b3BhY2l0eSAwLjJzIGVhc2UtaW4tb3V0LFxuXHRcdHZpc2liaWxpdHkgMHMgbGluZWFyIDAuMnM7XG5cblx0Ji5zaG93IHtcblx0XHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xuXHRcdG9wYWNpdHk6IDE7XG5cdFx0dHJhbnNpdGlvbjpcblx0XHRcdG9wYWNpdHkgMC4yNXMgZWFzZS1vdXQsXG5cdFx0XHR2aXNpYmlsaXR5IDBzO1xuXHR9XG5cblx0JiAuY29udGFjdC1tb2RhbC1jb250ZW50IHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcblx0XHRib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xuXHRcdGJvcmRlci1yYWRpdXM6IDhweDtcblx0XHRwYWRkaW5nOiAxLjVyZW07XG5cdFx0bWF4LXdpZHRoOiA0NTBweDtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0Ym94LXNoYWRvdzogMCA0cHggMjBweCByZ2JhKDAsIDAsIDAsIDAuNSk7XG5cdFx0b3BhY2l0eTogMDtcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuXHRcdHRyYW5zaXRpb246XG5cdFx0XHRvcGFjaXR5IDAuMnMgZWFzZS1pbixcblx0XHRcdHRyYW5zZm9ybSAwLjJzIGVhc2UtaW4sXG5cdFx0XHRiYWNrZ3JvdW5kLWNvbG9yIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tZHVyYXRpb24pIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tdGltaW5nKSxcblx0XHRcdGNvbG9yIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tZHVyYXRpb24pIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tdGltaW5nKSxcblx0XHRcdGJvcmRlci1jb2xvciB2YXIoLS10aGVtZS10cmFuc2l0aW9uLWR1cmF0aW9uKSB2YXIoLS10aGVtZS10cmFuc2l0aW9uLXRpbWluZyk7XG5cdH1cblxuXHQmLnNob3cgLmNvbnRhY3QtbW9kYWwtY29udGVudCB7XG5cdFx0b3BhY2l0eTogMTtcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDEpO1xuXHRcdHRyYW5zaXRpb246XG5cdFx0XHRvcGFjaXR5IDAuMjVzIGVhc2Utb3V0LFxuXHRcdFx0dHJhbnNmb3JtIDAuMjVzIGVhc2Utb3V0LFxuXHRcdFx0YmFja2dyb3VuZC1jb2xvciB2YXIoLS10aGVtZS10cmFuc2l0aW9uLWR1cmF0aW9uKSB2YXIoLS10aGVtZS10cmFuc2l0aW9uLXRpbWluZyksXG5cdFx0XHRjb2xvciB2YXIoLS10aGVtZS10cmFuc2l0aW9uLWR1cmF0aW9uKSB2YXIoLS10aGVtZS10cmFuc2l0aW9uLXRpbWluZyksXG5cdFx0XHRib3JkZXItY29sb3IgdmFyKC0tdGhlbWUtdHJhbnNpdGlvbi1kdXJhdGlvbikgdmFyKC0tdGhlbWUtdHJhbnNpdGlvbi10aW1pbmcpO1xuXHR9XG5cblx0JiAuY29udGFjdC1tb2RhbC1oZWFkZXIge1xuXHRcdGRpc3BsYXk6IGZsZXg7XG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdFx0bWFyZ2luLWJvdHRvbTogMXJlbTtcblx0fVxuXG5cdCYgLmNvbnRhY3QtbW9kYWwtaGVhZGVyIGgyIHtcblx0XHRtYXJnaW46IDA7XG5cdFx0Y29sb3I6IHZhcigtLWFjY2VudCk7XG5cdFx0Zm9udC1zaXplOiAxLjI1cmVtO1xuXHR9XG5cblx0JiAuY29udGFjdC1tb2RhbC1jbG9zZSB7XG5cdFx0YmFja2dyb3VuZDogbm9uZTtcblx0XHRib3JkZXI6IG5vbmU7XG5cdFx0Y29sb3I6IHZhcigtLXRleHQtbGlnaHQpO1xuXHRcdGZvbnQtc2l6ZTogMS41cmVtO1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0XHRwYWRkaW5nOiAwO1xuXHRcdHdpZHRoOiAzMnB4O1xuXHRcdGhlaWdodDogMzJweDtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdFx0anVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cdFx0Ym9yZGVyLXJhZGl1czogNHB4O1xuXHRcdHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG5cdH1cblxuXHQmIC5jb250YWN0LW1vZGFsLWNsb3NlOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jb2xvcik7XG5cdFx0Y29sb3I6IHZhcigtLWZvbnQtY29sb3IpO1xuXHR9XG5cblx0JiAuY29udGFjdC1mb3JtIC5mb3JtLWdyb3VwIHtcblx0XHRtYXJnaW4tYm90dG9tOiAwLjc1cmVtO1xuXHR9XG5cblx0JiAuY29udGFjdC1mb3JtIGxhYmVsIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRtYXJnaW4tYm90dG9tOiAwLjI1cmVtO1xuXHRcdGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcblx0XHRmb250LXdlaWdodDogNjAwO1xuXHRcdGZvbnQtc2l6ZTogMC45cmVtO1xuXHRcdHRleHQtYWxpZ246IGxlZnQ7XG5cdH1cblxuXHQmIC5jb250YWN0LWZvcm0gaW5wdXQsXG5cdCYgLmNvbnRhY3QtZm9ybSB0ZXh0YXJlYSB7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdFx0cGFkZGluZzogMC42cmVtO1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLWNvbG9yKTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xuXHRcdGJvcmRlci1yYWRpdXM6IDRweDtcblx0XHRjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XG5cdFx0Zm9udC1mYW1pbHk6IGluaGVyaXQ7XG5cdFx0Zm9udC1zaXplOiAwLjk1cmVtO1xuXHRcdHRyYW5zaXRpb246IGJvcmRlci1jb2xvciAwLjJzIGVhc2U7XG5cdH1cblxuXHQmIC5jb250YWN0LWZvcm0gaW5wdXQ6Zm9jdXMsXG5cdCYgLmNvbnRhY3QtZm9ybSB0ZXh0YXJlYTpmb2N1cyB7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0XHRib3JkZXItY29sb3I6IHZhcigtLWFjY2VudCk7XG5cdH1cblxuXHQmIC5jb250YWN0LWZvcm0gaW5wdXQuZXJyb3IsXG5cdCYgLmNvbnRhY3QtZm9ybSB0ZXh0YXJlYS5lcnJvciB7XG5cdFx0Ym9yZGVyLWNvbG9yOiAjZWY0NDQ0O1xuXHR9XG5cblx0JiAuY29udGFjdC1mb3JtIHRleHRhcmVhIHtcblx0XHRyZXNpemU6IHZlcnRpY2FsO1xuXHRcdG1pbi1oZWlnaHQ6IDEwMHB4O1xuXHR9XG5cblx0JiAuZm9ybS1zdGF0dXMge1xuXHRcdHBhZGRpbmc6IDAuNnJlbTtcblx0XHRib3JkZXItcmFkaXVzOiA0cHg7XG5cdFx0bWFyZ2luLWJvdHRvbTogMC4yNXJlbTtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0Zm9udC1zaXplOiAwLjlyZW07XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0fVxuXG5cdCYgLmZvcm0tc3RhdHVzLnN1Y2Nlc3MsXG5cdCYgLmZvcm0tc3RhdHVzLmVycm9yIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0fVxuXG5cdCYgLmZvcm0tc3RhdHVzLnN1Y2Nlc3Mge1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHJnYmEoMTYsIDE4NSwgMTI5LCAwLjEpO1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWFjY2VudCk7XG5cdFx0Y29sb3I6IHZhcigtLWFjY2VudCk7XG5cdH1cblxuXHQmIC5mb3JtLXN0YXR1cy5lcnJvciB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogcmdiYSgyMzksIDY4LCA2OCwgMC4xKTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCAjZWY0NDQ0O1xuXHRcdGNvbG9yOiAjZWY0NDQ0O1xuXHR9XG5cblx0JiAuY29udGFjdC1mb3JtIC5idG4ge1xuXHRcdHdpZHRoOiAxMDAlO1xuXHRcdHBhZGRpbmc6IDEycHggMjRweDtcblx0XHRtYXJnaW4tdG9wOiAwLjc1cmVtO1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLWNvbG9yKTtcblx0XHRib3JkZXI6IDJweCBzb2xpZCB2YXIoLS1hY2NlbnQpO1xuXHRcdGJvcmRlci1yYWRpdXM6IDhweDtcblx0XHRjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XG5cdFx0Zm9udC13ZWlnaHQ6IDYwMDtcblx0XHRmb250LXNpemU6IDFlbTtcblx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cdFx0dHJhbnNpdGlvbjogYWxsIHZhcigtLXRyYW5zaXRpb24tbm9ybWFsKTtcblx0fVxuXG5cdCYgLmNvbnRhY3QtZm9ybSAuYnRuOmhvdmVyOm5vdCg6ZGlzYWJsZWQpIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jb2xvcik7XG5cdFx0Ym9yZGVyLWNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHRcdGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcblx0XHRib3gtc2hhZG93OiAwIDRweCAxMnB4IHZhcigtLWFjY2VudC1nbG93KTtcblx0fVxuXG5cdCYgLmNvbnRhY3QtZm9ybSAuYnRuOmRpc2FibGVkIHtcblx0XHRvcGFjaXR5OiAwLjU7XG5cdFx0Y3Vyc29yOiBub3QtYWxsb3dlZDtcblx0XHR0cmFuc2Zvcm06IG5vbmU7XG5cdH1cbn1cblxudGVtcGwgQ29udGFjdE1vZGFsKG9wZW4gYm9vbCwgZm9ybSBDb250YWN0U3RhdGUpIHtcblx0PGRpdiBpZD1cImNvbnRhY3QtbW9kYWxcIiBjbGFzcz17IGNscyhjb250YWN0TW9kYWxTdHlsZSgpLCBvcGVuLCBcInNob3dcIikgfSByb2xlPVwiZGlhbG9nXCIgYXJpYS1tb2RhbD1cInRydWVcIiBhcmlhLWxhYmVsbGVkYnk9XCJjb250YWN0LW1vZGFsLXRpdGxlXCI+XG5cdFx0PGRpdiBjbGFzcz1cImNvbnRhY3QtbW9kYWwtY29udGVudFwiPlxuXHRcdFx0PGRpdiBjbGFzcz1cImNvbnRhY3QtbW9kYWwtaGVhZGVyXCI+XG5cdFx0XHRcdDxoMiBpZD1cImNvbnRhY3QtbW9kYWwtdGl0bGVcIj57IHQoXCJjb250YWN0LnRpdGxlXCIpIH08L2gyPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cImNvbnRhY3QtbW9kYWwtY2xvc2VcIiBpZD1cImNvbnRhY3QtbW9kYWwtY2xvc2VcIiBhcmlhLWxhYmVsPXsgdChcImNvbnRhY3QuY2xvc2VcIikgfSBkYXRhLWFjdGlvbj1cImNsb3NlLWNvbnRhY3RcIj5cblx0XHRcdFx0XHRASWNvbihcInRpbWVzXCIsIFwiMS4ycmVtXCIpXG5cdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHQ8Zm9ybSBjbGFzcz1cImNvbnRhY3QtZm9ybVwiIGlkPVwiY29udGFjdC1mb3JtXCIgbm92YWxpZGF0ZT5cblx0XHRcdFx0QENvbnRhY3RGb3JtRmllbGRzKGZvcm0pXG5cdFx0XHQ8L2Zvcm0+XG5cdFx0PC9kaXY+XG5cdDwvZGl2PlxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImpzOi4vYnJvd3Nlci5kLnRzXCJcbmltcG9ydCBcInN0cmluZ3NcIlxuXG4vLyBQaW5uZWQgKyBTUkk6IGtlZXAgdmVyc2lvbiBhbmQgaGFzaCBpbiBzeW5jIHdpdGggQGVtYWlsanMvYnJvd3NlciBpbiBwYWNrYWdlLmpzb25cbmNvbnN0IGVtYWlsSlNTcmMgPSBcImh0dHBzOi8vY2RuLmpzZGVsaXZyLm5ldC9ucG0vQGVtYWlsanMvYnJvd3NlckA1LjAuMi9kaXN0L2VtYWlsLm1pbi5qc1wiXG5jb25zdCBlbWFpbEpTSW50ZWdyaXR5ID0gXCJzaGEzODQtVjZLUmV4YmZBZjlPbWcydTdraDNzY2xWeFlpSzVtQXV6LzZFNFdtcFNRM0tPK1pqZ1g3U0NvcWhNT3JMS2ZlR1wiXG5cbmZ1bmMgbG9hZEVtYWlsSlMoKSBhbnkge1xuXHRyZXR1cm4gbG9hZFNjcmlwdChlbWFpbEpTU3JjLCBlbWFpbEpTSW50ZWdyaXR5KVxufVxuXG5mdW5jIGluaXRFbWFpbEpTKCkge1xuXHRpZiBzaXRlLkVtYWlsSlMuRW5hYmxlZCAmJiBzaXRlLkVtYWlsSlMuUHVibGljS2V5ICE9IFwiXCIgJiYgd2luZG93LmVtYWlsanMgIT0gbmlsIHtcblx0XHRlbWFpbGpzLmluaXQoc2l0ZS5FbWFpbEpTLlB1YmxpY0tleSlcblx0fVxufVxuXG4vLyBwcmVsb2FkRW1haWxKUyB3YXJtcyB0aGUgQ0ROIHNjcmlwdCB3aGlsZSB0aGUgdXNlciB0eXBlczsgZmFpbHVyZXMgYXJlXG4vLyBzd2FsbG93ZWQgaGVyZSBhbmQgc3VyZmFjZWQgYnkgc3VibWl0Q29udGFjdCBpbnN0ZWFkLlxuYXN5bmMgZnVuYyBwcmVsb2FkRW1haWxKUygpIHtcblx0ZGVmZXIgZnVuYygpIHtcblx0XHRpZiByIDo9IHJlY292ZXIoKTsgciAhPSBuaWwge1xuXHRcdFx0Y29uc29sZS53YXJuKFwiRW1haWxKUyBwcmVsb2FkIGZhaWxlZDpcIiwgcilcblx0XHR9XG5cdH0oKVxuXHRhd2FpdCBsb2FkRW1haWxKUygpXG59XG5cbi8vIHJlc2V0Q29udGFjdEZvcm0gY2xlYXJzIHRoZSBmb3JtIGJhY2sgdG8gaXRzIGluaXRpYWwgc3RhdGUgYW5kIHJlLXJlbmRlcnMgaXQuXG5mdW5jIHJlc2V0Q29udGFjdEZvcm0oKSB7XG5cdGNvbnRhY3RGb3JtID0gQ29udGFjdFN0YXRle0J1dHRvblN0YXRlOiBcInNlbmRcIn1cblx0cmVuZGVyQ29udGFjdEZvcm0oKVxufVxuXG5mdW5jIG9wZW5Db250YWN0KCkge1xuXHRpZiBzaXRlLkVtYWlsSlMuRW5hYmxlZCB7XG5cdFx0cHJlbG9hZEVtYWlsSlMoKVxuXHR9XG5cdGNsb3NlTWVudXMoKVxuXHRjb250YWN0T3BlbiA9IHRydWVcblx0cmVzZXRDb250YWN0Rm9ybSgpXG5cdHN5bmNPdmVybGF5cygpXG5cdGZvY3VzTGF0ZXIoXCIjY29udGFjdC1uYW1lXCIpXG59XG5cbi8vIGNsb3NlQ29udGFjdCBoaWRlcyB0aGUgbW9kYWw7IHRoZSBleGl0IGZhZGUgaXMgQ1NTLW9ubHkgKCNjb250YWN0LW1vZGFsIHRyYW5zaXRpb24pLlxuLy8gVGhlIGZvcm0gaXMgcmVzZXQgYnkgb3BlbkNvbnRhY3Qgc28gaXRzIGNvbnRlbnRzIHN1cnZpdmUgdGhlIGZhZGUuXG5mdW5jIGNsb3NlQ29udGFjdCgpIHtcblx0aWYgIWNvbnRhY3RPcGVuIHtcblx0XHRyZXR1cm5cblx0fVxuXHRjb250YWN0T3BlbiA9IGZhbHNlXG5cdHN5bmNPdmVybGF5cygpXG59XG5cbi8vIHVwZGF0ZUNvbnRhY3RGaWVsZCBtaXJyb3JzIGEgZm9ybSBmaWVsZCBpbnRvIHN0YXRlIG9uIGV2ZXJ5IGlucHV0IGV2ZW50LlxuZnVuYyB1cGRhdGVDb250YWN0RmllbGQoZmllbGQgc3RyaW5nLCB2YWx1ZSBzdHJpbmcpIHtcblx0c3dpdGNoIGZpZWxkIHtcblx0Y2FzZSBcIm5hbWVcIjpcblx0XHRjb250YWN0Rm9ybS5OYW1lID0gdmFsdWVcblx0Y2FzZSBcImVtYWlsXCI6XG5cdFx0Y29udGFjdEZvcm0uRW1haWwgPSB2YWx1ZVxuXHRjYXNlIFwibWVzc2FnZVwiOlxuXHRcdGNvbnRhY3RGb3JtLk1lc3NhZ2UgPSB2YWx1ZVxuXHR9XG59XG5cbmZ1bmMgaXNWYWxpZEVtYWlsKGVtYWlsIHN0cmluZykgYm9vbCB7XG5cdHJldHVybiBsZW4oZW1haWwpID49IDUgJiYgc3RyaW5ncy5Db250YWlucyhlbWFpbCwgXCJAXCIpICYmIHN0cmluZ3MuQ29udGFpbnMoZW1haWwsIFwiLlwiKSAmJiAhc3RyaW5ncy5Db250YWlucyhlbWFpbCwgXCIgXCIpXG59XG5cbi8vIHZhbGlkYXRlQ29udGFjdCB0cmltcyB0aGUgZmllbGRzIGFuZCBzZXRzIGVycm9yIGZsYWdzL3N0YXR1cyB0ZXh0LlxuLy8gSXQgcmV0dXJucyB0aGUgdXBkYXRlZCBzdGF0ZSBhbmQgd2hldGhlciB0aGUgZm9ybSBjYW4gYmUgc3VibWl0dGVkLlxuZnVuYyB2YWxpZGF0ZUNvbnRhY3QoZm9ybSBDb250YWN0U3RhdGUpIChDb250YWN0U3RhdGUsIGJvb2wpIHtcblx0Zm9ybS5OYW1lID0gc3RyaW5ncy5UcmltU3BhY2UoZm9ybS5OYW1lKVxuXHRmb3JtLkVtYWlsID0gc3RyaW5ncy5UcmltU3BhY2UoZm9ybS5FbWFpbClcblx0Zm9ybS5NZXNzYWdlID0gc3RyaW5ncy5UcmltU3BhY2UoZm9ybS5NZXNzYWdlKVxuXHRmb3JtLkVyck5hbWUgPSBmYWxzZVxuXHRmb3JtLkVyckVtYWlsID0gZmFsc2Vcblx0Zm9ybS5FcnJNZXNzYWdlID0gZmFsc2Vcblx0Zm9ybS5TdGF0dXNUZXh0ID0gXCJcIlxuXHRmb3JtLlN0YXR1c1R5cGUgPSBcIlwiXG5cblx0c3dpdGNoIHtcblx0Y2FzZSBmb3JtLk5hbWUgPT0gXCJcIjpcblx0XHRmb3JtLkVyck5hbWUgPSB0cnVlXG5cdFx0Zm9ybS5TdGF0dXNUZXh0ID0gdChcImNvbnRhY3QubmFtZVwiKSArIFwiOiBcIiArIHQoXCJjb250YWN0LnJlcXVpcmVkXCIpXG5cdGNhc2UgZm9ybS5FbWFpbCA9PSBcIlwiOlxuXHRcdGZvcm0uRXJyRW1haWwgPSB0cnVlXG5cdFx0Zm9ybS5TdGF0dXNUZXh0ID0gdChcImNvbnRhY3QuZW1haWxcIikgKyBcIjogXCIgKyB0KFwiY29udGFjdC5yZXF1aXJlZFwiKVxuXHRjYXNlICFpc1ZhbGlkRW1haWwoZm9ybS5FbWFpbCk6XG5cdFx0Zm9ybS5FcnJFbWFpbCA9IHRydWVcblx0XHRmb3JtLlN0YXR1c1RleHQgPSB0KFwiY29udGFjdC5pbnZhbGlkRW1haWxcIilcblx0Y2FzZSBmb3JtLk1lc3NhZ2UgPT0gXCJcIjpcblx0XHRmb3JtLkVyck1lc3NhZ2UgPSB0cnVlXG5cdFx0Zm9ybS5TdGF0dXNUZXh0ID0gdChcImNvbnRhY3QubWVzc2FnZVwiKSArIFwiOiBcIiArIHQoXCJjb250YWN0LnJlcXVpcmVkXCIpXG5cdGRlZmF1bHQ6XG5cdFx0cmV0dXJuIGZvcm0sIHRydWVcblx0fVxuXHRmb3JtLlN0YXR1c1R5cGUgPSBcImVycm9yXCJcblx0cmV0dXJuIGZvcm0sIGZhbHNlXG59XG5cbmFzeW5jIGZ1bmMgc3VibWl0Q29udGFjdCgpIHtcblx0Zm9ybSwgb2sgOj0gdmFsaWRhdGVDb250YWN0KGNvbnRhY3RGb3JtKVxuXHRjb250YWN0Rm9ybSA9IGZvcm1cblx0aWYgIW9rIHtcblx0XHRyZW5kZXJDb250YWN0Rm9ybSgpXG5cdFx0cmV0dXJuXG5cdH1cblxuXHRjb250YWN0Rm9ybS5CdXR0b25TdGF0ZSA9IFwic2VuZGluZ1wiXG5cdGNvbnRhY3RGb3JtLkJ1dHRvbkRpc2FibGVkID0gdHJ1ZVxuXHRyZW5kZXJDb250YWN0Rm9ybSgpXG5cblx0cGFyYW1zIDo9IG1hcFtzdHJpbmddYW55e1xuXHRcdFwidGl0bGVcIjogICBzaXRlLlRpdGxlLFxuXHRcdFwibmFtZVwiOiAgICBjb250YWN0Rm9ybS5OYW1lLFxuXHRcdFwiZW1haWxcIjogICBjb250YWN0Rm9ybS5FbWFpbCxcblx0XHRcIm1lc3NhZ2VcIjogY29udGFjdEZvcm0uTWVzc2FnZSxcblx0fVxuXG5cdGRlZmVyIGZ1bmMoKSB7XG5cdFx0aWYgciA6PSByZWNvdmVyKCk7IHIgIT0gbmlsIHtcblx0XHRcdGNvbnRhY3RGb3JtLkJ1dHRvbkRpc2FibGVkID0gZmFsc2Vcblx0XHRcdGNvbnRhY3RGb3JtLkJ1dHRvblN0YXRlID0gXCJzZW5kXCJcblx0XHRcdGNvbnRhY3RGb3JtLlN0YXR1c1RleHQgPSB0KFwiY29udGFjdC5lcnJvclwiKVxuXHRcdFx0Y29udGFjdEZvcm0uU3RhdHVzVHlwZSA9IFwiZXJyb3JcIlxuXHRcdFx0cmVuZGVyQ29udGFjdEZvcm0oKVxuXHRcdH1cblx0fSgpXG5cblx0YXdhaXQgbG9hZEVtYWlsSlMoKVxuXHRpbml0RW1haWxKUygpXG5cblx0YXdhaXQgZW1haWxqcy5zZW5kKHNpdGUuRW1haWxKUy5TZXJ2aWNlSWQsIHNpdGUuRW1haWxKUy5UZW1wbGF0ZUlkLCBwYXJhbXMsIHNpdGUuRW1haWxKUy5QdWJsaWNLZXkpXG5cblx0Y29udGFjdEZvcm0uU3RhdHVzVGV4dCA9IHQoXCJjb250YWN0LnN1Y2Nlc3NcIilcblx0Y29udGFjdEZvcm0uU3RhdHVzVHlwZSA9IFwic3VjY2Vzc1wiXG5cdGNvbnRhY3RGb3JtLkJ1dHRvblN0YXRlID0gXCJzZW5kXCJcblx0cmVuZGVyQ29udGFjdEZvcm0oKVxuXG5cdHNldFRpbWVvdXQoZnVuYygpIHtcblx0XHRjbG9zZUNvbnRhY3QoKVxuXHR9LCAyMDAwKVxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcInN0cmNvbnZcIlxuXG5jc3MgZm9vdGVyU3R5bGUoKSB7XG5cdG1hcmdpbi10b3A6IGF1dG87XG5cdG1hcmdpbi1ib3R0b206IDA7XG5cdHBhZGRpbmc6IDFyZW0gMDtcblx0YmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG5cdGZsZXgtc2hyaW5rOiAwO1xuXHRtYXgtd2lkdGg6IDEwMDBweDtcblx0bWFyZ2luLWlubGluZTogYXV0bztcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRmb250LXNpemU6IDAuOWVtO1xuXHR0cmFuc2l0aW9uOiBjb2xvciB2YXIoLS10aGVtZS10cmFuc2l0aW9uLWR1cmF0aW9uKSB2YXIoLS10aGVtZS10cmFuc2l0aW9uLXRpbWluZyk7XG59XG5cbnRlbXBsIEZvb3Rlcih5ZWFyIGludCwgYXV0aG9yIHN0cmluZykge1xuXHQ8Zm9vdGVyIGNsYXNzPXsgZm9vdGVyU3R5bGUoKSB9PlxuXHRcdHsgXCLCqSBcIiArIHN0cmNvbnYuSXRvYSh5ZWFyKSArIFwiIFwiICsgYXV0aG9yICsgXCIuIFwiICsgdChcImZvb3Rlci5yaWdodHNcIikgKyBcIi5cIiB9XG5cdDwvZm9vdGVyPlxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImh0bWxcIlxuXG4vLyDilIDilIAgU1ZHIGljb24gcmVnaXN0cnkg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG4vLyBJY29ucyBhcmUgZW1pdHRlZCBhcyByYXcgbWFya3VwIGJlY2F1c2UgdGVtcGwgYnVpbGRzIGVsZW1lbnRzIHdpdGhcbi8vIGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQsIHdoaWNoIGNhbm5vdCBjcmVhdGUgU1ZHLW5hbWVzcGFjZSBub2Rlcy5cblxudHlwZSBpY29uRGVmIHN0cnVjdCB7XG5cdFZpZXdCb3ggc3RyaW5nXG5cdFBhdGggICAgc3RyaW5nXG59XG5cbnZhciBpY29ucyA9IG1hcFtzdHJpbmddaWNvbkRlZntcblx0XCJzdW5cIjogICAgICAgICAgIHtcIjAgMCA1MTIgNTEyXCIsIFwiTTM2MS41IDEuMmM1IDIuMSA4LjYgNi42IDkuNiAxMS45TDM5MSAxMjFsMTA3LjkgMTkuOGM1LjMgMSA5LjggNC42IDExLjkgOS42czEuNSAxMC43LTEuNiAxNS4yTDQ0Ni45IDI1Nmw2Mi4zIDkwLjNjMy4xIDQuNSAzLjcgMTAuMiAxLjYgMTUuMnMtNi42IDguNi0xMS45IDkuNkwzOTEgMzkxIDM3MS4xIDQ5OC45Yy0xIDUuMy00LjYgOS44LTkuNiAxMS45cy0xMC43IDEuNS0xNS4yLTEuNkwyNTYgNDQ2LjlsLTkwLjMgNjIuM2MtNC41IDMuMS0xMC4yIDMuNy0xNS4yIDEuNnMtOC42LTYuNi05LjYtMTEuOUwxMjEgMzkxIDEzLjEgMzcxLjFjLTUuMy0xLTkuOC00LjYtMTEuOS05LjZzLTEuNS0xMC43IDEuNi0xNS4yTDY1LjEgMjU2IDIuOCAxNjUuN2MtMy4xLTQuNS0zLjctMTAuMi0xLjYtMTUuMnM2LjYtOC42IDExLjktOS42TDEyMSAxMjFsMTkuOC0xMDcuOWMxLTUuMyA0LjYtOS44IDkuNi0xMS45czEwLjctMS41IDE1LjIgMS42TDI1NiA2NS4xIDM0Ni4zIDIuOGM0LjUtMy4xIDEwLjItMy43IDE1LjItMS42ek0xNjAgMjU2YTk2IDk2IDAgMSAxIDE5MiAwIDk2IDk2IDAgMSAxIC0xOTIgMHptMjI0IDBhMTI4IDEyOCAwIDEgMCAtMjU2IDAgMTI4IDEyOCAwIDEgMCAyNTYgMHpcIn0sXG5cdFwibW9vblwiOiAgICAgICAgICB7XCIwIDAgMzg0IDUxMlwiLCBcIk0yMjMuNSAzMkMxMDAgMzIgMCAxMzIuMyAwIDI1NlMxMDAgNDgwIDIyMy41IDQ4MGM2MC42IDAgMTE1LjUtMjQuMiAxNTUuOC02My40YzUtNC45IDYuMy0xMi41IDMuMS0xOC43cy0xMC4xLTkuNy0xNy04LjVjLTkuOCAxLjctMTkuOCAyLjYtMzAuMSAyLjZjLTk2LjkgMC0xNzUuNS03OC44LTE3NS41LTE3NmMwLTY1LjggMzYtMTIzLjEgODkuMy0xNTMuM2M2LjEtMy41IDkuMi0xMC41IDcuNy0xNy4zcy03LjMtMTEuOS0xNC4zLTEyLjVjLTYuMy0uNS0xMi42LS44LTE5LS44elwifSxcblx0XCJzZWFyY2hcIjogICAgICAgIHtcIjAgMCA1MTIgNTEyXCIsIFwiTTQxNiAyMDhjMCA0NS45LTE0LjkgODguMy00MCAxMjIuN0w1MDIuNiA0NTcuNGMxMi41IDEyLjUgMTIuNSAzMi44IDAgNDUuM3MtMzIuOCAxMi41LTQ1LjMgMEwzMzAuNyAzNzZjLTM0LjQgMjUuMi03Ni44IDQwLTEyMi43IDQwQzkzLjEgNDE2IDAgMzIyLjkgMCAyMDhTOTMuMSAwIDIwOCAwUzQxNiA5My4xIDQxNiAyMDh6TTIwOCAzNTJhMTQ0IDE0NCAwIDEgMCAwLTI4OCAxNDQgMTQ0IDAgMSAwIDAgMjg4elwifSxcblx0XCJlbnZlbG9wZVwiOiAgICAgIHtcIjAgMCA1MTIgNTEyXCIsIFwiTTQ4IDY0QzIxLjUgNjQgMCA4NS41IDAgMTEyYzAgMTUuMSA3LjEgMjkuMyAxOS4yIDM4LjRMMjM2LjggMzEzLjZjMTEuNCA4LjUgMjcgOC41IDM4LjQgMEw0OTIuOCAxNTAuNGMxMi4xLTkuMSAxOS4yLTIzLjMgMTkuMi0zOC40YzAtMjYuNS0yMS41LTQ4LTQ4LTQ4SDQ4ek0wIDE3NlYzODRjMCAzNS4zIDI4LjcgNjQgNjQgNjRINDQ4YzM1LjMgMCA2NC0yOC43IDY0LTY0VjE3NkwyOTQuNCAzMzkuMmMtMjIuOCAxNy4xLTU0IDE3LjEtNzYuOCAwTDAgMTc2elwifSxcblx0XCJkb3dubG9hZFwiOiAgICAgIHtcIjAgMCA1MTIgNTEyXCIsIFwiTTI4OCAzMmMwLTE3LjctMTQuMy0zMi0zMi0zMnMtMzIgMTQuMy0zMiAzMlYyNzQuN2wtNzMuNC03My40Yy0xMi41LTEyLjUtMzIuOC0xMi41LTQ1LjMgMHMtMTIuNSAzMi44IDAgNDUuM2wxMjggMTI4YzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwbDEyOC0xMjhjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDBMMjg4IDI3NC43VjMyek02NCAzNTJjLTM1LjMgMC02NCAyOC43LTY0IDY0djMyYzAgMzUuMyAyOC43IDY0IDY0IDY0SDQ0OGMzNS4zIDAgNjQtMjguNyA2NC02NFY0MTZjMC0zNS4zLTI4LjctNjQtNjQtNjRINjR6bTI4MCA2MGEyNCAyNCAwIDEgMSAwIDQ4IDI0IDI0IDAgMSAxIDAtNDh6XCJ9LFxuXHRcImN1YmVcIjogICAgICAgICAge1wiMCAwIDUxMiA1MTJcIiwgXCJNMjM0LjUgNS43YzEzLjktNSAyOS4xLTUgNDMuMSAwbDE5MiA2OC42QzQ5NSA4My40IDUxMiAxMDcuNSA1MTIgMTM0LjZWMzc3LjRjMCAyNy0xNyA1MS4yLTQyLjUgNjAuM2wtMTkyIDY4LjZjLTEzLjkgNS0yOS4xIDUtNDMuMSAwbC0xOTItNjguNkMxNyA0MjguNiAwIDQwNC41IDAgMzc3LjRWMTM0LjZjMC0yNyAxNy01MS4yIDQyLjUtNjAuM2wxOTItNjguNnpNMjU2IDY2TDgyLjMgMTI4IDI1NiAxOTBsMTczLjctNjJMMjU2IDY2em0zMiAzNjguNmwxOTItNjguNlYxMzUuNEwyODggMjA0djIzMC42elwifSxcblx0XCJjYWxlbmRhclwiOiAgICAgIHtcIjAgMCA0NDggNTEyXCIsIFwiTTE1MiAyNGMwLTEzLjMtMTAuNy0yNC0yNC0yNHMtMjQgMTAuNy0yNCAyNFY2NEg2NEMyOC43IDY0IDAgOTIuNyAwIDEyOHYxNiA0OFY0NDhjMCAzNS4zIDI4LjcgNjQgNjQgNjRIMzg0YzM1LjMgMCA2NC0yOC43IDY0LTY0VjE5MiAxNDQgMTI4YzAtMzUuMy0yOC43LTY0LTY0LTY0SDM0NFYyNGMwLTEzLjMtMTAuNy0yNC0yNC0yNHMtMjQgMTAuNy0yNCAyNFY2NEgxNTJWMjR6TTQ4IDE5Mkg0MDBWNDQ4YzAgOC44LTcuMiAxNi0xNiAxNkg2NGMtOC44IDAtMTYtNy4yLTE2LTE2VjE5MnpcIn0sXG5cdFwiZ2l0aHViXCI6ICAgICAgICB7XCIwIDAgNDk2IDUxMlwiLCBcIk0xNjUuOSAzOTcuNGMwIDItMi4zIDMuNi01LjIgMy42LTMuMyAuMy01LjYtMS4zLTUuNi0zLjYgMC0yIDIuMy0zLjYgNS4yLTMuNiAzLS4zIDUuNiAxLjMgNS42IDMuNnptLTMxLjEtNC41Yy0uNyAyIDEuMyA0LjMgNC4zIDQuOSAyLjYgMSA1LjYgMCA2LjItMnMtMS4zLTQuMy00LjMtNS4yYy0yLjYtLjctNS41IC4zLTYuMiAyLjN6bTQ0LjItMS43Yy0yLjkgLjctNC45IDIuNi00LjYgNC45IC4zIDIgMi45IDMuMyA1LjkgMi42IDIuOS0uNyA0LjktMi42IDQuNi00LjYtLjMtMS45LTMtMy4yLTUuOS0yLjl6TTI0NC44IDhDMTA2LjEgOCAwIDExMy4zIDAgMjUyYzAgMTEwLjkgNjkuOCAyMDUuOCAxNjkuNSAyMzkuMiAxMi44IDIuMyAxNy4zLTUuNiAxNy4zLTEyLjEgMC02LjItLjMtNDAuNC0uMy02MS40IDAgMC03MCAxNS04NC43LTI5LjggMCAwLTExLjQtMjkuMS0yNy44LTM2LjYgMCAwLTIyLjktMTUuNyAxLjYtMTUuNCAwIDAgMjQuOSAyIDM4LjYgMjUuOCAyMS45IDM4LjYgNTguNiAyNy41IDcyLjkgMjEgMi4zLTE2LjggOC44LTI3LjEgMTYtMzMuNy01NS45LTYuMi0xMTIuMy0xNC4zLTExMi4zLTExMC41IDAtMjcuNSA3LjYtNDEuMyAyMy42LTU4LjktMi42LTYuNS0xMS4xLTMzLjMgMi42LTY3LjkgMjAuOS02LjUgNjkgMjcgNjkgMjcgMjAtNS42IDQxLjUtOC41IDYyLjgtOC41czQyLjggMi45IDYyLjggOC41YzAgMCA0OC4xLTMzLjYgNjktMjcgMTMuNyAzNC43IDUuMiA2MS40IDIuNiA2Ny45IDE2IDE3LjcgMjUuOCAzMS41IDI1LjggNTguOSAwIDk2LjUtNTguOSAxMDQuMi0xMTQuOCAxMTAuNSA5LjIgNy45IDE3IDIyLjkgMTcgNDYuNCAwIDMzLjctLjMgNzUuNC0uMyA4My42IDAgNi41IDQuNiAxNC40IDE3LjMgMTIuMUM0MjguMiA0NTcuOCA0OTYgMzYyLjkgNDk2IDI1MiA0OTYgMTEzLjMgMzgzLjUgOCAyNDQuOCA4ek05Ny4yIDM1Mi45Yy0xLjMgMS0xIDMuMyAuNyA1LjIgMS42IDEuNiAzLjkgMi4zIDUuMiAxIDEuMy0xIDEtMy4zLS43LTUuMi0xLjYtMS42LTMuOS0yLjMtNS4yLTF6bS0xMC44LTguMWMtLjcgMS4zIC4zIDIuOSAyLjMgMy45IDEuNiAxIDMuNiAuNyA0LjMtLjcgLjctMS4zLS4zLTIuOS0yLjMtMy45LTItLjYtMy42LS4zLTQuMyAuN3ptMzIuNCAzNS42Yy0xLjYgMS4zLTEgNC4zIDEuMyA2LjIgMi4zIDIuMyA1LjIgMi42IDYuNSAxIDEuMy0xLjMgLjctNC4zLTEuMy02LjItMi4yLTIuMy01LjItMi42LTYuNS0xem0tMTEuNC0xNC43Yy0xLjYgMS0xLjYgMy42IDAgNS45IDEuNiAyLjMgNC4zIDMuMyA1LjYgMi4zIDEuNi0xLjMgMS42LTMuOSAwLTYuMi0xLjQtMi4zLTQtMy4zLTUuNi0yelwifSxcblx0XCJ5b3V0dWJlXCI6ICAgICAgIHtcIjAgMCA1NzYgNTEyXCIsIFwiTTU0OS43IDEyNC4xYy02LjMtMjMuNy0yNC44LTQyLjMtNDguMy00OC42QzQ1OC44IDY0IDI4OCA2NCAyODggNjRTMTE3LjIgNjQgNzQuNiA3NS41Yy0yMy41IDYuMy00MiAyNC45LTQ4LjMgNDguNi0xMS40IDQyLjktMTEuNCAxMzIuMy0xMS40IDEzMi4zczAgODkuNCAxMS40IDEzMi4zYzYuMyAyMy43IDI0LjggNDEuNSA0OC4zIDQ3LjhDMTE3LjIgNDQ4IDI4OCA0NDggMjg4IDQ0OHMxNzAuOCAwIDIxMy40LTExLjVjMjMuNS02LjMgNDItMjQuMiA0OC4zLTQ3LjggMTEuNC00Mi45IDExLjQtMTMyLjMgMTEuNC0xMzIuM3MwLTg5LjQtMTEuNC0xMzIuM3ptLTMxNy41IDIxMy41VjE3NS4ybDE0Mi43IDgxLjItMTQyLjcgODEuMnpcIn0sXG5cdFwibGlua2VkaW5cIjogICAgICB7XCIwIDAgNDQ4IDUxMlwiLCBcIk00MTYgMzJIMzEuOUMxNC4zIDMyIDAgNDYuNSAwIDY0LjN2MzgzLjRDMCA0NjUuNSAxNC4zIDQ4MCAzMS45IDQ4MEg0MTZjMTcuNiAwIDMyLTE0LjUgMzItMzIuM1Y2NC4zYzAtMTcuOC0xNC40LTMyLjMtMzItMzIuM3pNMTM1LjQgNDE2SDY5VjIwMi4yaDY2LjVWNDE2em0tMzMuMi0yNDNjLTIxLjMgMC0zOC41LTE3LjMtMzguNS0zOC41UzgwLjkgOTYgMTAyLjIgOTZjMjEuMiAwIDM4LjUgMTcuMyAzOC41IDM4LjUgMCAyMS4zLTE3LjIgMzguNS0zOC41IDM4LjV6bTI4Mi4xIDI0M2gtNjYuNFYzMTJjMC0yNC44LS41LTU2LjctMzQuNS01Ni43LTM0LjYgMC0zOS45IDI3LTM5LjkgNTQuOVY0MTZoLTY2LjRWMjAyLjJoNjMuN3YyOS4yaC45YzguOS0xNi44IDMwLjYtMzQuNSA2Mi45LTM0LjUgNjcuMiAwIDc5LjcgNDQuMyA3OS43IDEwMS45VjQxNnpcIn0sXG5cdFwiY2hldnJvbi1kb3duXCI6ICB7XCIwIDAgNTEyIDUxMlwiLCBcIk0yMzMuNCA0MDYuNmMxMi41IDEyLjUgMzIuOCAxMi41IDQ1LjMgMGwxOTItMTkyYzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zcy0zMi44LTEyLjUtNDUuMyAwTDI1NiAzMzguNyA4Ni42IDE2OS40Yy0xMi41LTEyLjUtMzIuOC0xMi41LTQ1LjMgMHMtMTIuNSAzMi44IDAgNDUuM2wxOTIgMTkyelwifSxcblx0XCJjaGV2cm9uLXVwXCI6ICAgIHtcIjAgMCA1MTIgNTEyXCIsIFwiTTIzMy40IDEwNS40YzEyLjUtMTIuNSAzMi44LTEyLjUgNDUuMyAwbDE5MiAxOTJjMTIuNSAxMi41IDEyLjUgMzIuOCAwIDQ1LjNzLTMyLjgtMTIuNS00NS4zIDBMMjU2IDE3My4zIDg2LjYgMzQyLjZjLTEyLjUgMTIuNS0zMi44IDEyLjUtNDUuMyAwcy0xMi41LTMyLjggMC00NS4zbDE5Mi0xOTJ6XCJ9LFxuXHRcImNoZXZyb24tbGVmdFwiOiAge1wiMCAwIDMyMCA1MTJcIiwgXCJNOS40IDIzMy40Yy0xMi41IDEyLjUtMTIuNSAzMi44IDAgNDUuM2wxOTIgMTkyYzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwczEyLjUtMzIuOCAwLTQ1LjNMNzcuMyAyNTYgMjQ2LjYgODYuNmMxMi41LTEyLjUgMTIuNS0zMi44IDAtNDUuM3MtMzIuOC0xMi41LTQ1LjMgMGwtMTkyIDE5MnpcIn0sXG5cdFwiY2hldnJvbi1yaWdodFwiOiB7XCIwIDAgMzIwIDUxMlwiLCBcIk0zMTAuNiAyMzMuNGMxMi41IDEyLjUgMTIuNSAzMi44IDAgNDUuM2wtMTkyIDE5MmMtMTIuNSAxMi41LTMyLjggMTIuNS00NS4zIDBzLTEyLjUtMzIuOCAwLTQ1LjNMMjQyLjcgMjU2IDczLjQgODYuNmMtMTIuNS0xMi41LTEyLjUtMzIuOCAwLTQ1LjNzMzIuOC0xMi41IDQ1LjMgMGwxOTIgMTkyelwifSxcblx0XCJhbmdsZXMtbGVmdFwiOiAgIHtcIjAgMCA1MTIgNTEyXCIsIFwiTTQxLjQgMjMzLjRjLTEyLjUgMTIuNS0xMi41IDMyLjggMCA0NS4zbDE2MCAxNjBjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBzMTIuNS0zMi44IDAtNDUuM0wxMDkuMyAyNTYgMjQ2LjYgMTE4LjZjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDBsLTE2MCAxNjB6bTM1Mi0xNjBsLTE2MCAxNjBjLTEyLjUgMTIuNS0xMi41IDMyLjggMCA0NS4zbDE2MCAxNjBjMTIuNSAxMi41IDMyLjggMTIuNSA0NS4zIDBzMTIuNS0zMi44IDAtNDUuM0wzMDEuMyAyNTYgNDM4LjYgMTE4LjZjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDB6XCJ9LFxuXHRcImFuZ2xlcy1yaWdodFwiOiAge1wiMCAwIDUxMiA1MTJcIiwgXCJNNDcwLjYgMjc4LjZjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNsLTE2MC0xNjBjLTEyLjUtMTIuNS0zMi44LTEyLjUtNDUuMyAwcy0xMi41IDMyLjggMCA0NS4zTDQwMi43IDI1NiAyNjUuNCAzOTMuNGMtMTIuNSAxMi41LTEyLjUgMzIuOCAwIDQ1LjNzMzIuOCAxMi41IDQ1LjMgMGwxNjAtMTYwem0tMzUyIDE2MGwxNjAtMTYwYzEyLjUtMTIuNSAxMi41LTMyLjggMC00NS4zbC0xNjAtMTYwYy0xMi41LTEyLjUtMzIuOC0xMi41LTQ1LjMgMHMtMTIuNSAzMi44IDAgNDUuM0wyMTAuNyAyNTYgNzMuNCAzOTMuNGMtMTIuNSAxMi41LTEyLjUgMzIuOCAwIDQ1LjNzMzIuOCAxMi41IDQ1LjMgMHpcIn0sXG5cdFwidGltZXNcIjogICAgICAgICB7XCIwIDAgMzg0IDUxMlwiLCBcIk0zMjQuNSA0MTEuMWM2LjIgNi4yIDE2LjQgNi4yIDIyLjYgMHM2LjItMTYuNCAwLTIyLjZMMjE0LjYgMjU2IDM0Ny4xIDEyMy41YzYuMi02LjIgNi4yLTE2LjQgMC0yMi42cy0xNi40LTYuMi0yMi42IDBMMTkyIDIzMy40IDU5LjUgMTAwLjljLTYuMi02LjItMTYuNC02LjItMjIuNiAwcy02LjIgMTYuNCAwIDIyLjZMMTY5LjQgMjU2IDM2LjkgMzg4LjVjLTYuMiA2LjItNi4yIDE2LjQgMCAyMi42czE2LjQgNi4yIDIyLjYgMEwxOTIgMjc4LjYgMzI0LjUgNDExLjF6XCJ9LFxuXHRcImFycm93LWxlZnRcIjogICAge1wiMCAwIDQ0OCA1MTJcIiwgXCJNOS40IDIzMy40Yy0xMi41IDEyLjUtMTIuNSAzMi44IDAgNDUuM2wxNjAgMTYwYzEyLjUgMTIuNSAzMi44IDEyLjUgNDUuMyAwczEyLjUtMzIuOCAwLTQ1LjNMMTA5LjIgMjg4IDQxNiAyODhjMTcuNyAwIDMyLTE0LjMgMzItMzJzLTE0LjMtMzItMzItMzJsLTMwNi43IDBMMjE0LjYgMTE4LjZjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNzLTMyLjgtMTIuNS00NS4zIDBsLTE2MCAxNjB6XCJ9LFxuXHRcImFycm93LXJpZ2h0XCI6ICAge1wiMCAwIDQ0OCA1MTJcIiwgXCJNNDM4LjYgMjc4LjZjMTIuNS0xMi41IDEyLjUtMzIuOCAwLTQ1LjNsLTE2MC0xNjBjLTEyLjUtMTIuNS0zMi44LTEyLjUtNDUuMyAwcy0xMi41IDMyLjggMCA0NS4zTDMzOC44IDIyNCAzMiAyMjRjLTE3LjcgMC0zMiAxNC4zLTMyIDMyczE0LjMgMzIgMzIgMzJsMzA2LjcgMEwyMzMuNCAzOTMuNGMtMTIuNSAxMi41LTEyLjUgMzIuOCAwIDQ1LjNzMzIuOCAxMi41IDQ1LjMgMGwxNjAtMTYwelwifSxcblx0XCJleHBhbmRcIjogICAgICAgIHtcIjAgMCA0NDggNTEyXCIsIFwiTTMyIDMyQzE0LjMgMzIgMCA0Ni4zIDAgNjR2OTZjMCAxNy43IDE0LjMgMzIgMzIgMzJzMzItMTQuMyAzMi0zMlY5Nmg2NGMxNy43IDAgMzItMTQuMyAzMi0zMnMtMTQuMy0zMi0zMi0zMkgzMnpNNjQgMzUyYzAtMTcuNy0xNC4zLTMyLTMyLTMyUzAgMzM0LjMgMCAzNTJ2OTZjMCAxNy43IDE0LjMgMzIgMzIgMzJoOTZjMTcuNyAwIDMyLTE0LjMgMzItMzJzLTE0LjMtMzItMzItMzJINjRWMzUyek0zNTIgMzJjLTE3LjcgMC0zMiAxNC4zLTMyIDMyczE0LjMgMzIgMzIgMzJoNjR2NjRjMCAxNy43IDE0LjMgMzIgMzIgMzJzMzItMTQuMyAzMi0zMlY2NGMwLTE3LjctMTQuMy0zMi0zMi0zMkgzNTJ6TTMyMCAzNTJjMC0xNy43IDE0LjMtMzIgMzItMzJzMzIgMTQuMyAzMiAzMnY2NGg2NGMxNy43IDAgMzIgMTQuMyAzMiAzMnMtMTQuMyAzMi0zMiAzMkgzODRjLTE3LjcgMC0zMi0xNC4zLTMyLTMyVjM1MnpcIn0sXG59XG5cbi8vIGljb25TdmcgcmV0dXJucyB0aGUgaW5saW5lIFNWRyBtYXJrdXAgZm9yIGEga25vd24gaWNvbiBuYW1lLCBvciBcIlwiIG90aGVyd2lzZS5cbmZ1bmMgaWNvblN2ZyhuYW1lIHN0cmluZywgc2l6ZSBzdHJpbmcpIHN0cmluZyB7XG5cdGRlZiwgb2sgOj0gaWNvbnNbbmFtZV1cblx0aWYgIW9rIHtcblx0XHRyZXR1cm4gXCJcIlxuXHR9XG5cdHMgOj0gaHRtbC5Fc2NhcGVTdHJpbmcoc2l6ZSlcblx0cmV0dXJuIGA8c3ZnIGNsYXNzPVwiaWNvbiBpY29uLWAgKyBuYW1lICsgYFwiIHdpZHRoPVwiYCArIHMgKyBgXCIgaGVpZ2h0PVwiYCArIHMgKyBgXCIgdmlld0JveD1cImAgKyBkZWYuVmlld0JveCArIGBcIiBmaWxsPVwiY3VycmVudENvbG9yXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+PHBhdGggZD1cImAgKyBkZWYuUGF0aCArIGBcIi8+PC9zdmc+YFxufVxuIiwicGFja2FnZSBtYWluXG5cbi8vIEljb24gcmVuZGVycyBhIG5hbWVkIFNWRyBpY29uIGZyb20gdGhlIHJlZ2lzdHJ5IGluIGljb25zLmdvLlxuLy8gVW5rbm93biBuYW1lcyByZW5kZXIgbm90aGluZy5cbnRlbXBsIEljb24obmFtZSBzdHJpbmcsIHNpemUgc3RyaW5nKSB7XG5cdEB0ZW1wbC5SYXcoaWNvblN2ZyhuYW1lLCBzaXplKSlcbn1cbiIsInBhY2thZ2UgbWFpblxuXG52YXIgc2NyaXB0UHJvbWlzZXMgPSBtYXBbc3RyaW5nXWFueXt9XG5cbi8vIGxvYWRTY3JpcHQgYXBwZW5kcyBhIDxzY3JpcHQ+IHRhZyBvbmNlIHBlciBzcmMgYW5kIHJldHVybnMgYSBwcm9taXNlIHRoYXRcbi8vIHNldHRsZXMgb24gbG9hZC9lcnJvcjsgY29uY3VycmVudCBjYWxsZXJzIHNoYXJlIHRoZSBzYW1lIGluLWZsaWdodCBwcm9taXNlLlxuZnVuYyBsb2FkU2NyaXB0KHNyYyBzdHJpbmcsIGludGVncml0eSBzdHJpbmcpIGFueSB7XG5cdGlmIHAsIG9rIDo9IHNjcmlwdFByb21pc2VzW3NyY107IG9rIHtcblx0XHRyZXR1cm4gcFxuXHR9XG5cdGQgOj0gUHJvbWlzZS53aXRoUmVzb2x2ZXJzKClcblx0cyA6PSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXG5cdHMuc3JjID0gc3JjXG5cdGlmIGludGVncml0eSAhPSBcIlwiIHtcblx0XHRzLmludGVncml0eSA9IGludGVncml0eVxuXHRcdHMuY3Jvc3NPcmlnaW4gPSBcImFub255bW91c1wiXG5cdH1cblx0cy5hc3luYyA9IHRydWVcblx0cy5vbmxvYWQgPSBmdW5jKF8gYW55KSB7XG5cdFx0ZC5yZXNvbHZlKG5pbClcblx0fVxuXHRzLm9uZXJyb3IgPSBmdW5jKGUgYW55KSB7XG5cdFx0ZGVsZXRlKHNjcmlwdFByb21pc2VzLCBzcmMpXG5cdFx0ZC5yZWplY3QoZSlcblx0fVxuXHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKHMpXG5cdHNjcmlwdFByb21pc2VzW3NyY10gPSBkLnByb21pc2Vcblx0cmV0dXJuIGQucHJvbWlzZVxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImpzOi4vYnJvd3Nlci5kLnRzXCJcbmltcG9ydCBcInN0cmluZ3NcIlxuXG5mdW5jIHRvZ2dsZVByb2plY3RzRHJvcGRvd24oKSB7XG5cdHByb2plY3RzRHJvcGRvd25PcGVuID0gIXByb2plY3RzRHJvcGRvd25PcGVuXG5cdHN5bmNPdmVybGF5cygpXG59XG5cbmZ1bmMgY2xvc2VQcm9qZWN0c0Ryb3Bkb3duKCkge1xuXHRpZiAhcHJvamVjdHNEcm9wZG93bk9wZW4ge1xuXHRcdHJldHVyblxuXHR9XG5cdHByb2plY3RzRHJvcGRvd25PcGVuID0gZmFsc2Vcblx0c3luY092ZXJsYXlzKClcbn1cblxuZnVuYyB0b2dnbGVNb2JpbGVNZW51KCkge1xuXHRtb2JpbGVNZW51T3BlbiA9ICFtb2JpbGVNZW51T3BlblxuXHRzeW5jT3ZlcmxheXMoKVxufVxuXG5mdW5jIGNsb3NlTW9iaWxlTWVudSgpIHtcblx0aWYgIW1vYmlsZU1lbnVPcGVuIHtcblx0XHRyZXR1cm5cblx0fVxuXHRtb2JpbGVNZW51T3BlbiA9IGZhbHNlXG5cdHN5bmNPdmVybGF5cygpXG59XG5cbi8vIGNsb3NlTWVudXMgY29sbGFwc2VzIHRoZSBuYXYgbWVudXMgYmVmb3JlIGFub3RoZXIgb3ZlcmxheSB0YWtlcyBmb2N1cy5cbmZ1bmMgY2xvc2VNZW51cygpIHtcblx0Y2xvc2VNb2JpbGVNZW51KClcblx0Y2xvc2VQcm9qZWN0c0Ryb3Bkb3duKClcbn1cblxuLy8gbmF2aWdhdGVIYXNoIHNjcm9sbHMgdG8gYW4gaW4tcGFnZSBhbmNob3IgKFwiI2lkXCIgb3IgXCJcIiBmb3IgdG9wKSBhbmRcbi8vIHJlY29yZHMgaXQgaW4gaGlzdG9yeSB3aXRob3V0IHRyaWdnZXJpbmcgYSByb3V0ZSBjaGFuZ2UuXG5mdW5jIG5hdmlnYXRlSGFzaChoYXNoIHN0cmluZykge1xuXHRpZiBzdHJpbmdzLlRyaW1QcmVmaXgoaGFzaCwgXCIjXCIpICE9IFwiXCIge1xuXHRcdHNjcm9sbFRvSGFzaChoYXNoLCB0cnVlKVxuXHRcdHdpbmRvdy5oaXN0b3J5LnB1c2hTdGF0ZShtYXBbc3RyaW5nXWFueXt9LCBcIlwiLCBoYXNoKVxuXHRcdHJldHVyblxuXHR9XG5cdHdpbmRvdy5zY3JvbGxUbyhtYXBbc3RyaW5nXWFueXtcInRvcFwiOiAwLCBcImxlZnRcIjogMCwgXCJiZWhhdmlvclwiOiBcInNtb290aFwifSlcblx0d2luZG93Lmhpc3RvcnkucHVzaFN0YXRlKG1hcFtzdHJpbmddYW55e30sIFwiXCIsIHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSlcbn1cblxuZnVuYyBzZXR1cEV2ZW50cygpIHtcblx0YXBwIDo9IGFwcFJlZnNbXCJhcHBSb290XCJdXG5cdGlmIGFwcCA9PSBuaWwgJiYgZG9jdW1lbnQgIT0gbmlsIHtcblx0XHRhcHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2FwcFwiKVxuXHR9XG5cdGlmIGFwcCA9PSBuaWwge1xuXHRcdHJldHVyblxuXHR9XG5cblx0Ly8gQ2xpY2sgZGVsZWdhdGlvbiBvbiAjYXBwXG5cdGFwcC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuYyhlIGFueSkge1xuXHRcdHRhcmdldCA6PSBlLnRhcmdldFxuXG5cdFx0Ly8gVGFnIGNsaWNrXG5cdFx0dGFnRWwgOj0gdGFyZ2V0LmNsb3Nlc3QoXCJbZGF0YS1zZWFyY2gtdGFnXVwiKVxuXHRcdGlmIHRhZ0VsICE9IG5pbCB7XG5cdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKClcblx0XHRcdHRhZyA6PSB0YWdFbC5nZXRBdHRyaWJ1dGUoXCJkYXRhLXNlYXJjaC10YWdcIilcblx0XHRcdGlmIHRhZyAhPSBuaWwgJiYgdGFnICE9IFwiXCIge1xuXHRcdFx0XHRvcGVuU2VhcmNoV2l0aFRhZyhzdHJpbmcodGFnKSlcblx0XHRcdH1cblx0XHRcdHJldHVyblxuXHRcdH1cblxuXHRcdC8vIEFjdGlvbiBkZWxlZ2F0aW9uXG5cdFx0YnRuIDo9IHRhcmdldC5jbG9zZXN0KFwiW2RhdGEtYWN0aW9uXVwiKVxuXHRcdGlmIGJ0biAhPSBuaWwge1xuXHRcdFx0YWN0aW9uIDo9IHN0cmluZyhidG4uZ2V0QXR0cmlidXRlKFwiZGF0YS1hY3Rpb25cIikpXG5cdFx0XHRzd2l0Y2ggYWN0aW9uIHtcblx0XHRcdGNhc2UgXCJuYXZcIjpcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdGlmIGJ0bi5jbG9zZXN0KFwiLmRpc2FibGVkXCIpICE9IG5pbCB7XG5cdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdH1cblx0XHRcdFx0aHJlZiA6PSBidG4uZ2V0QXR0cmlidXRlKFwiaHJlZlwiKVxuXHRcdFx0XHRpZiBocmVmICE9IG5pbCAmJiBocmVmICE9IFwiXCIge1xuXHRcdFx0XHRcdGhyZWZTdHIgOj0gc3RyaW5nKGhyZWYpXG5cdFx0XHRcdFx0aWYgc3RyaW5ncy5IYXNQcmVmaXgoaHJlZlN0ciwgXCIjXCIpIHtcblx0XHRcdFx0XHRcdG5hdmlnYXRlSGFzaChocmVmU3RyKVxuXHRcdFx0XHRcdFx0cmV0dXJuXG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdG5hdmlnYXRlKGhyZWZTdHIpXG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgXCJ0b2dnbGUtbW9iaWxlLW5hdlwiOlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0ZS5zdG9wUHJvcGFnYXRpb24oKVxuXHRcdFx0XHR0b2dnbGVNb2JpbGVNZW51KClcblx0XHRcdGNhc2UgXCJ0b2dnbGUtcHJvamVjdHMtZHJvcGRvd25cIjpcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdGUuc3RvcFByb3BhZ2F0aW9uKClcblx0XHRcdFx0dG9nZ2xlUHJvamVjdHNEcm9wZG93bigpXG5cdFx0XHRjYXNlIFwidG9nZ2xlLXRoZW1lXCI6XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHR0b2dnbGVUaGVtZSgpXG5cdFx0XHRjYXNlIFwib3Blbi1zZWFyY2hcIjpcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdG9wZW5TZWFyY2goKVxuXHRcdFx0Y2FzZSBcImNsb3NlLXNlYXJjaFwiOlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0Y2xvc2VTZWFyY2goKVxuXHRcdFx0Y2FzZSBcImNsZWFyLXNlYXJjaFwiOlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0Y2xlYXJTZWFyY2goKVxuXHRcdFx0Y2FzZSBcIm9wZW4tY29udGFjdFwiOlxuXHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0b3BlbkNvbnRhY3QoKVxuXHRcdFx0Y2FzZSBcImNsb3NlLWNvbnRhY3RcIjpcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdGNsb3NlQ29udGFjdCgpXG5cdFx0XHRjYXNlIFwidG9nZ2xlLWZ1bGxzY3JlZW5cIjpcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdGlmcmFtZSA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2RlbW9cIilcblx0XHRcdFx0aWYgaWZyYW1lICE9IG5pbCB7XG5cdFx0XHRcdFx0aWYgZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgPT0gbmlsIHtcblx0XHRcdFx0XHRcdGlmcmFtZS5yZXF1ZXN0RnVsbHNjcmVlbigpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKClcblx0XHRcdFx0XHR9XG5cdFx0XHRcdH1cblx0XHRcdGNhc2UgXCJjb3B5LWNvZGVcIjpcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdGNvcHlCdG4gOj0gdGFyZ2V0LmNsb3Nlc3QoXCIuY29weS1jb2RlLWJ1dHRvblwiKVxuXHRcdFx0XHRpZiBjb3B5QnRuICE9IG5pbCB7XG5cdFx0XHRcdFx0cHJlIDo9IGNvcHlCdG4uY2xvc2VzdChcInByZVwiKVxuXHRcdFx0XHRcdGlmIHByZSAhPSBuaWwge1xuXHRcdFx0XHRcdFx0Y29kZUVsIDo9IHByZS5xdWVyeVNlbGVjdG9yKFwiY29kZVwiKVxuXHRcdFx0XHRcdFx0aWYgY29kZUVsICE9IG5pbCB7XG5cdFx0XHRcdFx0XHRcdHRleHQgOj0gY29kZUVsLnRleHRDb250ZW50XG5cdFx0XHRcdFx0XHRcdG5hdmlnYXRvci5jbGlwYm9hcmQud3JpdGVUZXh0KHRleHQpXG5cdFx0XHRcdFx0XHRcdGNvcHlCdG4udGV4dENvbnRlbnQgPSB0KFwiY29kZS5jb3BpZWRcIilcblx0XHRcdFx0XHRcdFx0Y29weUJ0bi5jbGFzc0xpc3QuYWRkKFwiY29waWVkXCIpXG5cdFx0XHRcdFx0XHRcdHNldFRpbWVvdXQoZnVuYygpIHtcblx0XHRcdFx0XHRcdFx0XHRjb3B5QnRuLnRleHRDb250ZW50ID0gdChcImNvZGUuY29weVwiKVxuXHRcdFx0XHRcdFx0XHRcdGNvcHlCdG4uY2xhc3NMaXN0LnJlbW92ZShcImNvcGllZFwiKVxuXHRcdFx0XHRcdFx0XHR9LCAyMDAwKVxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0Y2FzZSBcIm9wZW4tcG9zdFwiOlxuXHRcdFx0XHRpZiB0YXJnZXQuY2xvc2VzdChcImFcIikgPT0gbmlsICYmIHRhcmdldC5jbG9zZXN0KFwiLmNsaWNrYWJsZS10YWdcIikgPT0gbmlsIHtcblx0XHRcdFx0XHRocmVmIDo9IGJ0bi5nZXRBdHRyaWJ1dGUoXCJkYXRhLWhyZWZcIilcblx0XHRcdFx0XHRpZiBocmVmICE9IG5pbCAmJiBocmVmICE9IFwiXCIge1xuXHRcdFx0XHRcdFx0bmF2aWdhdGUoc3RyaW5nKGhyZWYpKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0Ly8gRmFsbGJhY2sgU1BBIGxpbmsgaW50ZXJjZXB0b3I6IHN0YW5kYXJkIDxhIGhyZWY9XCIuLi5cIj5cblx0XHRsaW5rIDo9IHRhcmdldC5jbG9zZXN0KFwiYVwiKVxuXHRcdGlmIGxpbmsgIT0gbmlsIHtcblx0XHRcdGhyZWYgOj0gc3RyaW5nKGxpbmsuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSlcblx0XHRcdHRhcmdldEF0dHIgOj0gbGluay5nZXRBdHRyaWJ1dGUoXCJ0YXJnZXRcIilcblx0XHRcdGlmIHRhcmdldEF0dHIgIT0gbmlsICYmIHRhcmdldEF0dHIgIT0gXCJcIiAmJiB0YXJnZXRBdHRyICE9IFwiX3NlbGZcIiB7XG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXG5cdFx0XHQvLyBJbi1wYWdlIGFuY2hvciBoYXNoIGxpbmsgKCN0aGUtYXJjaGl0ZWN0dXJlKVxuXHRcdFx0aWYgc3RyaW5ncy5IYXNQcmVmaXgoaHJlZiwgXCIjXCIpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdG5hdmlnYXRlSGFzaChocmVmKVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblxuXHRcdFx0aWYgc3RyaW5ncy5IYXNQcmVmaXgoaHJlZiwgXCIvXCIpIHtcblx0XHRcdFx0Ly8gU2FtZS1wYWdlIGFuY2hvciB3aXRoIGZ1bGwgcGF0aDogL2Jsb2cvc2x1ZyN0aGUtYXJjaGl0ZWN0dXJlXG5cdFx0XHRcdGlmIGN1cnJlbnRQYXRoICE9IFwiXCIgJiYgc3RyaW5ncy5IYXNQcmVmaXgoaHJlZiwgY3VycmVudFBhdGgrXCIjXCIpIHtcblx0XHRcdFx0XHRlLnByZXZlbnREZWZhdWx0KClcblx0XHRcdFx0XHRoYXNoIDo9IHN0cmluZ3MuVHJpbVByZWZpeChocmVmLCBjdXJyZW50UGF0aClcblx0XHRcdFx0XHRzY3JvbGxUb0hhc2goaGFzaCwgdHJ1ZSlcblx0XHRcdFx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobWFwW3N0cmluZ11hbnl7fSwgXCJcIiwgaHJlZilcblx0XHRcdFx0XHRyZXR1cm5cblx0XHRcdFx0fVxuXG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRuYXZpZ2F0ZShocmVmKVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHR9XG5cblx0XHQvLyBDbGljayBvbiBzZWFyY2ggb3ZlcmxheSBiYWNrZHJvcFxuXHRcdGlmIHRhcmdldC5pZCA9PSBcInNlYXJjaC1wYWdlXCIge1xuXHRcdFx0Y2xvc2VTZWFyY2goKVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXG5cdFx0Ly8gQ2xpY2sgb24gY29udGFjdCBtb2RhbCBiYWNrZHJvcFxuXHRcdGlmIHRhcmdldC5pZCA9PSBcImNvbnRhY3QtbW9kYWxcIiB7XG5cdFx0XHRjbG9zZUNvbnRhY3QoKVxuXHRcdFx0cmV0dXJuXG5cdFx0fVxuXHR9KVxuXG5cdC8vIElucHV0IG9uIHNlYXJjaCBhbmQgY29udGFjdCBmb3JtIGZpZWxkc1xuXHRhcHAuYWRkRXZlbnRMaXN0ZW5lcihcImlucHV0XCIsIGZ1bmMoZSBhbnkpIHtcblx0XHRpZiBlLnRhcmdldC5tYXRjaGVzKFwiI3NlYXJjaC1wYWdlLWlucHV0XCIpIHtcblx0XHRcdGhhbmRsZVNlYXJjaElucHV0KHN0cmluZyhlLnRhcmdldC52YWx1ZSkpXG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdFx0aWYgZS50YXJnZXQuY2xvc2VzdChcIiNjb250YWN0LWZvcm1cIikgIT0gbmlsIHtcblx0XHRcdHVwZGF0ZUNvbnRhY3RGaWVsZChzdHJpbmcoZS50YXJnZXQubmFtZSksIHN0cmluZyhlLnRhcmdldC52YWx1ZSkpXG5cdFx0fVxuXHR9KVxuXG5cdC8vIFN1Ym1pdCBvbiBjb250YWN0IGZvcm1cblx0YXBwLmFkZEV2ZW50TGlzdGVuZXIoXCJzdWJtaXRcIiwgZnVuYyhlIGFueSkge1xuXHRcdGlmIGUudGFyZ2V0Lm1hdGNoZXMoXCIjY29udGFjdC1mb3JtXCIpIHtcblx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0c3VibWl0Q29udGFjdCgpXG5cdFx0fVxuXHR9KVxuXG5cdC8vIEtleWRvd24gZm9yIEVzY2FwZSBhbmQgc2VhcmNoIHNob3J0Y3V0IChDbWQrSyAvIEN0cmwrSyBhbmQgLylcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJrZXlkb3duXCIsIGZ1bmMoZSBhbnkpIHtcblx0XHRrZXkgOj0gc3RyVmFsKGUua2V5KVxuXHRcdGlmIGtleSA9PSBcIkVzY2FwZVwiIHtcblx0XHRcdGlmIHNlYXJjaE9wZW4ge1xuXHRcdFx0XHRjbG9zZVNlYXJjaCgpXG5cdFx0XHR9XG5cdFx0XHRpZiBjb250YWN0T3BlbiB7XG5cdFx0XHRcdGNsb3NlQ29udGFjdCgpXG5cdFx0XHR9XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cblx0XHRpZiBzZWFyY2hPcGVuIHtcblx0XHRcdGlmIGtleSA9PSBcIkFycm93RG93blwiIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdHNlYXJjaFNlbGVjdE5leHQoKVxuXHRcdFx0XHRyZXR1cm5cblx0XHRcdH1cblx0XHRcdGlmIGtleSA9PSBcIkFycm93VXBcIiB7XG5cdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRzZWFyY2hTZWxlY3RQcmV2KClcblx0XHRcdFx0cmV0dXJuXG5cdFx0XHR9XG5cdFx0XHRpZiBrZXkgPT0gXCJFbnRlclwiICYmIHNlYXJjaEhhc1NlbGVjdGlvbigpIHtcblx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdHNlYXJjaE9wZW5TZWxlY3RlZCgpXG5cdFx0XHRcdHJldHVyblxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIHNpdGUuU2VhcmNoLkVuYWJsZWQgJiYgIWNvbnRhY3RPcGVuIHtcblx0XHRcdGlzQ21kSyA6PSAoYm9vbFZhbChlLm1ldGFLZXkpIHx8IGJvb2xWYWwoZS5jdHJsS2V5KSkgJiYgKGtleSA9PSBcImtcIiB8fCBrZXkgPT0gXCJLXCIpXG5cdFx0XHRpc1NsYXNoIDo9IGtleSA9PSBcIi9cIlxuXG5cdFx0XHRpZiBpc0NtZEsgfHwgaXNTbGFzaCB7XG5cdFx0XHRcdHRhcmdldCA6PSBlLnRhcmdldFxuXHRcdFx0XHR0YWdOYW1lIDo9IFwiXCJcblx0XHRcdFx0aXNFZGl0YWJsZSA6PSBmYWxzZVxuXHRcdFx0XHRpZiB0YXJnZXQgIT0gbmlsIHtcblx0XHRcdFx0XHR0YWdOYW1lID0gc3RyaW5ncy5Ub1VwcGVyKHN0clZhbCh0YXJnZXQudGFnTmFtZSkpXG5cdFx0XHRcdFx0aXNFZGl0YWJsZSA9IGJvb2xWYWwodGFyZ2V0LmlzQ29udGVudEVkaXRhYmxlKVxuXHRcdFx0XHR9XG5cblx0XHRcdFx0aW5JbnB1dCA6PSB0YWdOYW1lID09IFwiSU5QVVRcIiB8fCB0YWdOYW1lID09IFwiVEVYVEFSRUFcIiB8fCB0YWdOYW1lID09IFwiU0VMRUNUXCIgfHwgaXNFZGl0YWJsZVxuXG5cdFx0XHRcdGlmIGlzQ21kSyB7XG5cdFx0XHRcdFx0ZS5wcmV2ZW50RGVmYXVsdCgpXG5cdFx0XHRcdFx0aWYgc2VhcmNoT3BlbiB7XG5cdFx0XHRcdFx0XHRjbG9zZVNlYXJjaCgpXG5cdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdG9wZW5TZWFyY2goKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fSBlbHNlIGlmIGlzU2xhc2ggJiYgIWluSW5wdXQge1xuXHRcdFx0XHRcdGUucHJldmVudERlZmF1bHQoKVxuXHRcdFx0XHRcdGlmICFzZWFyY2hPcGVuIHtcblx0XHRcdFx0XHRcdG9wZW5TZWFyY2goKVxuXHRcdFx0XHRcdH1cblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdH1cblx0fSlcblxuXHQvLyBHbG9iYWwgY2xpY2sgb3V0c2lkZSBoYW5kbGVyc1xuXHRkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuYyhlIGFueSkge1xuXHRcdG5hdmJhciA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibmF2XCIpXG5cdFx0aWYgbmF2YmFyICE9IG5pbCAmJiBtb2JpbGVNZW51T3BlbiB7XG5cdFx0XHRpc01vYmlsZSA6PSB3aW5kb3cuaW5uZXJXaWR0aCA8PSA3Njdcblx0XHRcdGlmIGlzTW9iaWxlICYmICFuYXZiYXIuY29udGFpbnMoZS50YXJnZXQpIHtcblx0XHRcdFx0Y2xvc2VNb2JpbGVNZW51KClcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiBwcm9qZWN0c0Ryb3Bkb3duT3BlbiB7XG5cdFx0XHRkcm9wZG93biA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmRyb3Bkb3duXCIpXG5cdFx0XHRpZiBkcm9wZG93biA9PSBuaWwgfHwgIWRyb3Bkb3duLmNvbnRhaW5zKGUudGFyZ2V0KSB7XG5cdFx0XHRcdGNsb3NlUHJvamVjdHNEcm9wZG93bigpXG5cdFx0XHR9XG5cdFx0fVxuXHR9KVxuXG5cdC8vIFBvcHN0YXRlIGhhbmRsZXJcblx0d2luZG93LmFkZEV2ZW50TGlzdGVuZXIoXCJwb3BzdGF0ZVwiLCBmdW5jKGUgYW55KSB7XG5cdFx0bmV3UGF0aCA6PSBzdHJpbmcod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKVxuXHRcdGlmIG5ld1BhdGggPT0gY3VycmVudFBhdGgge1xuXHRcdFx0aGFzaCA6PSBzdHJpbmcod2luZG93LmxvY2F0aW9uLmhhc2gpXG5cdFx0XHRpZiBoYXNoICE9IFwiXCIge1xuXHRcdFx0XHRzY3JvbGxUb0hhc2goaGFzaCwgdHJ1ZSlcblx0XHRcdH0gZWxzZSB7XG5cdFx0XHRcdHdpbmRvdy5zY3JvbGxUbyhtYXBbc3RyaW5nXWFueXtcInRvcFwiOiAwLCBcImxlZnRcIjogMCwgXCJiZWhhdmlvclwiOiBcInNtb290aFwifSlcblx0XHRcdH1cblx0XHRcdHJldHVyblxuXHRcdH1cblx0XHRoYW5kbGVSb3V0ZSgpXG5cdH0pXG59XG5cbmFzeW5jIGZ1bmMgbWFpbigpIHtcblx0dmlldyA9IG5ld1ZpZXdTdGF0ZSgpXG5cdGVyciA6PSBhd2FpdCBpbml0RGF0YSgpXG5cdGlmIGVyciAhPSBuaWwge1xuXHRcdGNvbnNvbGUuZXJyb3IoXCJJbml0IGRhdGEgZmFpbGVkOlwiLCBlcnIpXG5cdH1cblxuXHRpbml0VGhlbWUoKVxuXHRpbml0U2VhcmNoKClcblx0aW5pdEluaXRpYWxSb3V0ZSgpXG5cblx0Ly8gU2hlbGwgaXMgbW91bnRlZCBvbmNlOyByb3V0ZXMgYW5kIG92ZXJsYXlzIHJlLXJlbmRlciB0aGVpciBvd24gcmVnaW9ucy5cblx0Z29tLk1vdW50KFwiI2FwcFwiLCBBcHBTaGVsbCgpLCBhcHBSZWZzKVxuXHRzZXR1cEV2ZW50cygpXG5cdGF3YWl0IGhhbmRsZVJvdXRlKClcblxuXHRkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoXCJhcHAtcmVhZHlcIilcbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJlcnJvcnNcIlxuaW1wb3J0IFwianM6Li9icm93c2VyLmQudHNcIlxuaW1wb3J0IFwic3RyY29udlwiXG5pbXBvcnQgXCJzdHJpbmdzXCJcblxuLy8gc2x1Z2lmeSBjb252ZXJ0cyBhIGhlYWRpbmcgdGl0bGUgaW50byBhIFVSTC1mcmllbmRseSBhbmNob3Igc2x1Zy5cbmZ1bmMgc2x1Z2lmeSh0ZXh0IHN0cmluZykgc3RyaW5nIHtcblx0dGV4dCA9IHN0cmluZ3MuVG9Mb3dlcihzdHJpbmdzLlRyaW1TcGFjZSh0ZXh0KSlcblx0dmFyIGIgc3RyaW5ncy5CdWlsZGVyXG5cdGZvciBpIDo9IDA7IGkgPCBsZW4odGV4dCk7IGkrKyB7XG5cdFx0YyA6PSB0ZXh0W2ldXG5cdFx0aWYgKGMgPj0gJ2EnICYmIGMgPD0gJ3onKSB8fCAoYyA+PSAnMCcgJiYgYyA8PSAnOScpIHtcblx0XHRcdGIuV3JpdGVCeXRlKGMpXG5cdFx0fSBlbHNlIGlmIGMgPT0gJyAnIHx8IGMgPT0gJy0nIHx8IGMgPT0gJ18nIHtcblx0XHRcdGlmIGIuTGVuKCkgPiAwICYmIGIuU3RyaW5nKClbYi5MZW4oKS0xXSAhPSAnLScge1xuXHRcdFx0XHRiLldyaXRlQnl0ZSgnLScpXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cdHJlcyA6PSBzdHJpbmdzLlRyaW0oYi5TdHJpbmcoKSwgXCItXCIpXG5cdGlmIHJlcyA9PSBcIlwiIHtcblx0XHRyZXMgPSBcInNlY3Rpb25cIlxuXHR9XG5cdHJldHVybiByZXNcbn1cblxuLy8gY2xlYW5IZWFkaW5nVGV4dCBzdHJpcHMgaW5saW5lIG1hcmtkb3duIChjb2RlIHNwYW5zLCBlbXBoYXNpcywgbGluayBzeW50YXgsXG4vLyBjbG9zaW5nIEFUWCBoYXNoZXMpIHNvIHRoZSBUT0MgbGFiZWwgbWF0Y2hlcyB0aGUgcmVuZGVyZWQgaGVhZGluZyB0ZXh0LlxuZnVuYyBjbGVhbkhlYWRpbmdUZXh0KHRleHQgc3RyaW5nKSBzdHJpbmcge1xuXHR0ZXh0ID0gc3RyaW5ncy5UcmltU3BhY2UodGV4dClcblx0dGV4dCA9IHN0cmluZ3MuVHJpbVJpZ2h0KHRleHQsIFwiI1wiKVxuXHR0ZXh0ID0gc3RyaW5ncy5UcmltU3BhY2UodGV4dClcblx0dmFyIGIgc3RyaW5ncy5CdWlsZGVyXG5cdGkgOj0gMFxuXHRmb3IgaSA8IGxlbih0ZXh0KSB7XG5cdFx0YyA6PSB0ZXh0W2ldXG5cdFx0c3dpdGNoIHtcblx0XHRjYXNlIGMgPT0gJ2AnIHx8IGMgPT0gJyonIHx8IGMgPT0gJ1snOlxuXHRcdFx0aSsrXG5cdFx0Y2FzZSBjID09ICddJzpcblx0XHRcdC8vIERyb3AgdGhlIFwiXSh1cmwpXCIgdGFpbCBvZiBhIGxpbmssIGtlZXAgdGhlIGxhYmVsIGFscmVhZHkgd3JpdHRlbi5cblx0XHRcdGkrK1xuXHRcdFx0aWYgaSA8IGxlbih0ZXh0KSAmJiB0ZXh0W2ldID09ICcoJyB7XG5cdFx0XHRcdGlmIGVuZCA6PSBzdHJpbmdzLkluZGV4Qnl0ZSh0ZXh0W2k6XSwgJyknKTsgZW5kICE9IC0xIHtcblx0XHRcdFx0XHRpICs9IGVuZCArIDFcblx0XHRcdFx0fVxuXHRcdFx0fVxuXHRcdGRlZmF1bHQ6XG5cdFx0XHRiLldyaXRlQnl0ZShjKVxuXHRcdFx0aSsrXG5cdFx0fVxuXHR9XG5cdHJldHVybiBzdHJpbmdzLlRyaW1TcGFjZShiLlN0cmluZygpKVxufVxuXG4vLyBleHRyYWN0VE9DIGV4dHJhY3RzIGgyIGFuZCBoMyBoZWFkaW5ncyBvdXRzaWRlIGNvZGUgYmxvY2tzIGFuZCBkZWR1cGxpY2F0ZXMgc2x1Z3MuXG5mdW5jIGV4dHJhY3RUT0MobWFya2Rvd24gc3RyaW5nKSBbXVRPQ0l0ZW0ge1xuXHRpdGVtcyA6PSBbXVRPQ0l0ZW17fVxuXHRpZiBtYXJrZG93biA9PSBcIlwiIHtcblx0XHRyZXR1cm4gaXRlbXNcblx0fVxuXG5cdGxpbmVzIDo9IHN0cmluZ3MuU3BsaXQobWFya2Rvd24sIFwiXFxuXCIpXG5cdGluQ29kZSA6PSBmYWxzZVxuXHRzbHVnQ291bnRzIDo9IG1hcFtzdHJpbmddaW50e31cblxuXHRmb3IgXywgbGluZSA6PSByYW5nZSBsaW5lcyB7XG5cdFx0dHJpbW1lZCA6PSBzdHJpbmdzLlRyaW1TcGFjZShsaW5lKVxuXHRcdGlmIHN0cmluZ3MuSGFzUHJlZml4KHRyaW1tZWQsIFwiYGBgXCIpIHx8IHN0cmluZ3MuSGFzUHJlZml4KHRyaW1tZWQsIFwifn5+XCIpIHtcblx0XHRcdGluQ29kZSA9ICFpbkNvZGVcblx0XHRcdGNvbnRpbnVlXG5cdFx0fVxuXHRcdGlmIGluQ29kZSB7XG5cdFx0XHRjb250aW51ZVxuXHRcdH1cblxuXHRcdGxldmVsIDo9IDBcblx0XHRoZWFkaW5nVGV4dCA6PSBcIlwiXG5cdFx0aWYgc3RyaW5ncy5IYXNQcmVmaXgodHJpbW1lZCwgXCIjIyBcIikge1xuXHRcdFx0bGV2ZWwgPSAyXG5cdFx0XHRoZWFkaW5nVGV4dCA9IGNsZWFuSGVhZGluZ1RleHQodHJpbW1lZFszOl0pXG5cdFx0fSBlbHNlIGlmIHN0cmluZ3MuSGFzUHJlZml4KHRyaW1tZWQsIFwiIyMjIFwiKSB7XG5cdFx0XHRsZXZlbCA9IDNcblx0XHRcdGhlYWRpbmdUZXh0ID0gY2xlYW5IZWFkaW5nVGV4dCh0cmltbWVkWzQ6XSlcblx0XHR9XG5cblx0XHRpZiBsZXZlbCA+IDAgJiYgaGVhZGluZ1RleHQgIT0gXCJcIiB7XG5cdFx0XHRzbHVnIDo9IHNsdWdpZnkoaGVhZGluZ1RleHQpXG5cdFx0XHRpZCA6PSBzbHVnXG5cdFx0XHRpZiBjb3VudCwgb2sgOj0gc2x1Z0NvdW50c1tzbHVnXTsgb2sge1xuXHRcdFx0XHRpZCA9IHNsdWcgKyBcIi1cIiArIHN0cmNvbnYuSXRvYShjb3VudClcblx0XHRcdFx0c2x1Z0NvdW50c1tzbHVnXSA9IGNvdW50ICsgMVxuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0c2x1Z0NvdW50c1tzbHVnXSA9IDFcblx0XHRcdH1cblx0XHRcdGl0ZW1zID0gYXBwZW5kKGl0ZW1zLCBUT0NJdGVte1xuXHRcdFx0XHRJRDogICAgaWQsXG5cdFx0XHRcdFRleHQ6ICBoZWFkaW5nVGV4dCxcblx0XHRcdFx0TGV2ZWw6IGxldmVsLFxuXHRcdFx0fSlcblx0XHR9XG5cdH1cblxuXHRyZXR1cm4gaXRlbXNcbn1cblxuLy8gZXh0cmFjdFByb2plY3RUT0MgZXh0cmFjdHMgaGVhZGluZ3MgZnJvbSB0aGUgcHJvamVjdCBSRUFETUUgYW5kIGFwcGVuZHMgc2VjdGlvbnNcbi8vIGZvciBNZWRpYSwgRGVtbywgYW5kIExpbmtzIGlmIHByZXNlbnQuXG5mdW5jIGV4dHJhY3RQcm9qZWN0VE9DKG1hcmtkb3duIHN0cmluZywgcCBQcm9qZWN0KSBbXVRPQ0l0ZW0ge1xuXHRpdGVtcyA6PSBleHRyYWN0VE9DKG1hcmtkb3duKVxuXHRpZiBsZW4ocC5Zb3V0dWJlVmlkZW9zKSA+IDAge1xuXHRcdGl0ZW1zID0gYXBwZW5kKGl0ZW1zLCBUT0NJdGVte1xuXHRcdFx0SUQ6ICAgIFwicHJvamVjdC1tZWRpYVwiLFxuXHRcdFx0VGV4dDogIHQoXCJwcm9qZWN0Lm1lZGlhXCIpLFxuXHRcdFx0TGV2ZWw6IDIsXG5cdFx0fSlcblx0fVxuXHRpZiBwLkRlbW9VcmwgIT0gXCJcIiB7XG5cdFx0aXRlbXMgPSBhcHBlbmQoaXRlbXMsIFRPQ0l0ZW17XG5cdFx0XHRJRDogICAgXCJwcm9qZWN0LWRlbW9cIixcblx0XHRcdFRleHQ6ICBkZW1vTGFiZWwocCksXG5cdFx0XHRMZXZlbDogMixcblx0XHR9KVxuXHR9XG5cdGlmIGxlbihwLkxpbmtzKSA+IDAge1xuXHRcdGl0ZW1zID0gYXBwZW5kKGl0ZW1zLCBUT0NJdGVte1xuXHRcdFx0SUQ6ICAgIFwicHJvamVjdC1saW5rc1wiLFxuXHRcdFx0VGV4dDogIHQoXCJwcm9qZWN0LmxpbmtzXCIpLFxuXHRcdFx0TGV2ZWw6IDIsXG5cdFx0fSlcblx0fVxuXHRyZXR1cm4gaXRlbXNcbn1cblxuLy8gaGVhZGluZ1RleHRLZXkgcmVkdWNlcyByZW5kZXJlZCBoZWFkaW5nIEhUTUwgdG8gdGhlIHNhbWUgc2x1ZyBmb3JtIGFzIHRoZVxuLy8gbWFya2Rvd24gc291cmNlIHNvIHRoZSB0d28gY2FuIGJlIG1hdGNoZWQuXG5mdW5jIGhlYWRpbmdUZXh0S2V5KGlubmVyIHN0cmluZykgc3RyaW5nIHtcblx0dmFyIGIgc3RyaW5ncy5CdWlsZGVyXG5cdGluVGFnIDo9IGZhbHNlXG5cdGZvciBpIDo9IDA7IGkgPCBsZW4oaW5uZXIpOyBpKysge1xuXHRcdGMgOj0gaW5uZXJbaV1cblx0XHRpZiBjID09ICc8JyB7XG5cdFx0XHRpblRhZyA9IHRydWVcblx0XHRcdGNvbnRpbnVlXG5cdFx0fVxuXHRcdGlmIGMgPT0gJz4nIHtcblx0XHRcdGluVGFnID0gZmFsc2Vcblx0XHRcdGNvbnRpbnVlXG5cdFx0fVxuXHRcdGlmICFpblRhZyB7XG5cdFx0XHRiLldyaXRlQnl0ZShjKVxuXHRcdH1cblx0fVxuXHR0ZXh0IDo9IGIuU3RyaW5nKClcblx0dGV4dCA9IHN0cmluZ3MuUmVwbGFjZUFsbCh0ZXh0LCBcIiZhbXA7XCIsIFwiJlwiKVxuXHR0ZXh0ID0gc3RyaW5ncy5SZXBsYWNlQWxsKHRleHQsIFwiJmx0O1wiLCBcIjxcIilcblx0dGV4dCA9IHN0cmluZ3MuUmVwbGFjZUFsbCh0ZXh0LCBcIiZndDtcIiwgXCI+XCIpXG5cdHRleHQgPSBzdHJpbmdzLlJlcGxhY2VBbGwodGV4dCwgXCImcXVvdDtcIiwgXCJcXFwiXCIpXG5cdHRleHQgPSBzdHJpbmdzLlJlcGxhY2VBbGwodGV4dCwgXCImIzM5O1wiLCBcIidcIilcblx0cmV0dXJuIHNsdWdpZnkodGV4dClcbn1cblxuLy8gaW5qZWN0SGVhZGluZ0lEcyBnaXZlcyBoMi9oMyBlbGVtZW50cyB0aGUgaWQgb2YgdGhlIFRPQyBpdGVtIHdpdGggbWF0Y2hpbmdcbi8vIHRleHQuIEhlYWRpbmdzIGFyZSBtYXRjaGVkIGJ5IHRleHQgcmF0aGVyIHRoYW4gcG9zaXRpb24sIHNvIGEgaGVhZGluZyB0aGVcbi8vIG1hcmtkb3duIHNjYW4gbWlzc2VkIChzZXRleHQsIGJsb2NrcXVvdGUsIGluZGVudGVkIGNvZGUpIG9ubHkgbG9zZXMgaXRzIG93blxuLy8gYW5jaG9yIGluc3RlYWQgb2Ygc2hpZnRpbmcgZXZlcnkgaWQgYWZ0ZXIgaXQuXG5mdW5jIGluamVjdEhlYWRpbmdJRHMoaHRtbCBzdHJpbmcsIHRvYyBbXVRPQ0l0ZW0pIHN0cmluZyB7XG5cdGlmIGxlbih0b2MpID09IDAgfHwgaHRtbCA9PSBcIlwiIHtcblx0XHRyZXR1cm4gaHRtbFxuXHR9XG5cblx0Ly8gSWRzIHF1ZXVlZCBwZXIgdGV4dCBrZXksIGNvbnN1bWVkIGluIGRvY3VtZW50IG9yZGVyIHNvIGR1cGxpY2F0ZXMgYWxpZ24uXG5cdHBlbmRpbmcgOj0gbWFwW3N0cmluZ11bXXN0cmluZ3t9XG5cdGZvciBfLCBpdGVtIDo9IHJhbmdlIHRvYyB7XG5cdFx0a2V5IDo9IHNsdWdpZnkoaXRlbS5UZXh0KVxuXHRcdHBlbmRpbmdba2V5XSA9IGFwcGVuZChwZW5kaW5nW2tleV0sIGl0ZW0uSUQpXG5cdH1cblxuXHR2YXIgYiBzdHJpbmdzLkJ1aWxkZXJcblx0aWR4IDo9IDBcblxuXHRmb3IgaWR4IDwgbGVuKGh0bWwpIHtcblx0XHRyZXN0IDo9IGh0bWxbaWR4Ol1cblx0XHRpZiBzdHJpbmdzLkhhc1ByZWZpeChyZXN0LCBcIjxoMlwiKSB8fCBzdHJpbmdzLkhhc1ByZWZpeChyZXN0LCBcIjxoM1wiKSB7XG5cdFx0XHRjbG9zZUJyYWNrZXQgOj0gc3RyaW5ncy5JbmRleChyZXN0LCBcIj5cIilcblx0XHRcdGNsb3NlVGFnIDo9IHN0cmluZ3MuSW5kZXgocmVzdCwgXCI8L2hcIilcblx0XHRcdGlmIGNsb3NlQnJhY2tldCAhPSAtMSAmJiBjbG9zZVRhZyAhPSAtMSAmJiBjbG9zZUJyYWNrZXQgPCBjbG9zZVRhZyB7XG5cdFx0XHRcdG9wZW5UYWcgOj0gcmVzdFs6Y2xvc2VCcmFja2V0KzFdXG5cdFx0XHRcdGtleSA6PSBoZWFkaW5nVGV4dEtleShyZXN0W2Nsb3NlQnJhY2tldCsxIDogY2xvc2VUYWddKVxuXHRcdFx0XHRpZHMgOj0gcGVuZGluZ1trZXldXG5cdFx0XHRcdGlmIGxlbihpZHMpID4gMCAmJiAhc3RyaW5ncy5Db250YWlucyhvcGVuVGFnLCBcImlkPVwiKSB7XG5cdFx0XHRcdFx0cGVuZGluZ1trZXldID0gaWRzWzE6XVxuXHRcdFx0XHRcdGIuV3JpdGVTdHJpbmcob3BlblRhZ1s6M10gKyBcIiBpZD1cXFwiXCIgKyBpZHNbMF0gKyBcIlxcXCJcIiArIG9wZW5UYWdbMzpdKVxuXHRcdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRcdGIuV3JpdGVTdHJpbmcob3BlblRhZylcblx0XHRcdFx0fVxuXHRcdFx0XHRpZHggKz0gY2xvc2VCcmFja2V0ICsgMVxuXHRcdFx0XHRjb250aW51ZVxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGIuV3JpdGVCeXRlKGh0bWxbaWR4XSlcblx0XHRpZHgrK1xuXHR9XG5cblx0cmV0dXJuIGIuU3RyaW5nKClcbn1cblxuZnVuYyBwYXJzZU1hcmtkb3duKGNvbnRlbnQgc3RyaW5nKSBzdHJpbmcge1xuXHRpZiBjb250ZW50ID09IFwiXCIge1xuXHRcdHJldHVybiBcIlwiXG5cdH1cblx0ZGVmZXIgZnVuYygpIHtcblx0XHRpZiByIDo9IHJlY292ZXIoKTsgciAhPSBuaWwge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcIkVycm9yIHJlbmRlcmluZyBtYXJrZG93bjpcIiwgcilcblx0XHR9XG5cdH0oKVxuXHRyZXR1cm4gbWFya2VkLnBhcnNlKGNvbnRlbnQpXG59XG5cbmZ1bmMgc3RyaXBGcm9udG1hdHRlcihtYXJrZG93biBzdHJpbmcpIHN0cmluZyB7XG5cdHRyaW1tZWQgOj0gc3RyaW5ncy5UcmltU3BhY2UobWFya2Rvd24pXG5cdGlmICFzdHJpbmdzLkhhc1ByZWZpeCh0cmltbWVkLCBcIi0tLVwiKSB7XG5cdFx0cmV0dXJuIHRyaW1tZWRcblx0fVxuXG5cdHJlc3QgOj0gdHJpbW1lZFszOl1cblx0bmV3bGluZUlkeCA6PSBzdHJpbmdzLkluZGV4KHJlc3QsIFwiXFxuXCIpXG5cdGlmIG5ld2xpbmVJZHggPT0gLTEge1xuXHRcdHJldHVybiB0cmltbWVkXG5cdH1cblx0YWZ0ZXJGaXJzdExpbmUgOj0gcmVzdFtuZXdsaW5lSWR4KzE6XVxuXHRjbG9zaW5nSWR4IDo9IHN0cmluZ3MuSW5kZXgoYWZ0ZXJGaXJzdExpbmUsIFwiXFxuLS0tXCIpXG5cdGlmIGNsb3NpbmdJZHggPT0gLTEge1xuXHRcdGNsb3NpbmdJZHggPSBzdHJpbmdzLkluZGV4KGFmdGVyRmlyc3RMaW5lLCBcIi0tLVwiKVxuXHRcdGlmIGNsb3NpbmdJZHggPT0gLTEge1xuXHRcdFx0cmV0dXJuIHRyaW1tZWRcblx0XHR9XG5cdFx0YWZ0ZXJDbG9zaW5nIDo9IGFmdGVyRmlyc3RMaW5lW2Nsb3NpbmdJZHgrMzpdXG5cdFx0cmV0dXJuIHN0cmluZ3MuVHJpbVNwYWNlKGFmdGVyQ2xvc2luZylcblx0fVxuXG5cdGFmdGVyQ2xvc2luZyA6PSBhZnRlckZpcnN0TGluZVtjbG9zaW5nSWR4KzQ6XVxuXHRyZXR1cm4gc3RyaW5ncy5UcmltU3BhY2UoYWZ0ZXJDbG9zaW5nKVxufVxuXG5hc3luYyBmdW5jIGxvYWRNYXJrZG93bkZpbGUodXJsIHN0cmluZykgKHN0cmluZywgZXJyb3IpIHtcblx0ZGVmZXIgZnVuYygpIHtcblx0XHRpZiByIDo9IHJlY292ZXIoKTsgciAhPSBuaWwge1xuXHRcdFx0Y29uc29sZS5lcnJvcihcImZldGNoIGZhaWxlZDpcIiwgcilcblx0XHR9XG5cdH0oKVxuXG5cdHJlcyA6PSBhd2FpdCBmZXRjaCh1cmwpXG5cdGlmIHJlcyA9PSBuaWwgfHwgIXJlcy5vayB7XG5cdFx0cmV0dXJuIFwiXCIsIGVycm9ycy5OZXcoXCJIVFRQIGVycm9yXCIpXG5cdH1cblxuXHR0ZXh0IDo9IGF3YWl0IHJlcy50ZXh0KClcblx0cmV0dXJuIHN0cmluZyh0ZXh0KSwgbmlsXG59XG5cbmZ1bmMgYXR0YWNoQ29weUJ1dHRvbnMoKSB7XG5cdHByZXMgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcInByZVwiKVxuXHRmb3IgaSA6PSAwOyBpIDwgbGVuKHByZXMpOyBpKysge1xuXHRcdHByZSA6PSBwcmVzW2ldXG5cdFx0aWYgcHJlLnF1ZXJ5U2VsZWN0b3IoXCIuY29weS1jb2RlLWJ1dHRvblwiKSAhPSBuaWwge1xuXHRcdFx0Y29udGludWVcblx0XHR9XG5cdFx0YnRuIDo9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJidXR0b25cIilcblx0XHRidG4uY2xhc3NOYW1lID0gXCJjb3B5LWNvZGUtYnV0dG9uXCJcblx0XHRidG4uc2V0QXR0cmlidXRlKFwiZGF0YS1hY3Rpb25cIiwgXCJjb3B5LWNvZGVcIilcblx0XHRidG4uc2V0QXR0cmlidXRlKFwiYXJpYS1sYWJlbFwiLCB0KFwiYXJpYS5jb3B5Q29kZVwiKSlcblx0XHRidG4udGV4dENvbnRlbnQgPSB0KFwiY29kZS5jb3B5XCIpXG5cdFx0cHJlLnN0eWxlLnBvc2l0aW9uID0gXCJyZWxhdGl2ZVwiXG5cdFx0cHJlLmFwcGVuZENoaWxkKGJ0bilcblx0fVxufVxuXG5mdW5jIGhpZ2hsaWdodENvZGUoKSB7XG5cdGRlZmVyIGZ1bmMoKSB7XG5cdFx0aWYgciA6PSByZWNvdmVyKCk7IHIgIT0gbmlsIHtcblx0XHRcdGNvbnNvbGUud2FybihcIlByaXNtIGhpZ2hsaWdodCBlcnJvcjpcIiwgcilcblx0XHR9XG5cdH0oKVxuXHRjb252ZXJ0TWVybWFpZEJsb2NrcygpXG5cdGlmIFByaXNtLmxhbmd1YWdlcy50ZW1wbCA9PSBuaWwgJiYgUHJpc20ubGFuZ3VhZ2VzLmdvICE9IG5pbCB7XG5cdFx0UHJpc20ubGFuZ3VhZ2VzLnRlbXBsID0gUHJpc20ubGFuZ3VhZ2VzLmdvXG5cdH1cblx0UHJpc20uaGlnaGxpZ2h0QWxsKClcblx0YXR0YWNoQ29weUJ1dHRvbnMoKVxuXHRyZW5kZXJNZXJtYWlkKClcbn1cblxuLy8gY29udmVydE1lcm1haWRCbG9ja3Mgc3dhcHMgbWFya2VkJ3MgYGBgbWVybWFpZCBmZW5jZXMgZm9yIGRpdnMgbWVybWFpZCBjYW5cbi8vIHJlbmRlciwga2VlcGluZyB0aGUgc291cmNlIGluIGRhdGEtbWVybWFpZC1zcmMgc28gZGlhZ3JhbXMgY2FuIGJlIHJlLWRyYXduLlxuZnVuYyBjb252ZXJ0TWVybWFpZEJsb2NrcygpIGludCB7XG5cdGNvZGVzIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCJwcmUgPiBjb2RlLmxhbmd1YWdlLW1lcm1haWRcIilcblx0Zm9yIGkgOj0gMDsgaSA8IGxlbihjb2Rlcyk7IGkrKyB7XG5cdFx0Y29kZSA6PSBjb2Rlc1tpXVxuXHRcdHNyYyA6PSBzdHJpbmcoY29kZS50ZXh0Q29udGVudClcblx0XHRkaXYgOj0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKVxuXHRcdGRpdi5jbGFzc05hbWUgPSBcIm1lcm1haWRcIlxuXHRcdGRpdi5zZXRBdHRyaWJ1dGUoXCJkYXRhLW1lcm1haWQtc3JjXCIsIHNyYylcblx0XHRkaXYudGV4dENvbnRlbnQgPSBzcmNcblx0XHRjb2RlLnBhcmVudEVsZW1lbnQucmVwbGFjZVdpdGgoZGl2KVxuXHR9XG5cdHJldHVybiBsZW4oY29kZXMpXG59XG5cbmZ1bmMgbWVybWFpZFRoZW1lKHRoZW1lIHN0cmluZykgc3RyaW5nIHtcblx0aWYgdGhlbWUgPT0gXCJsaWdodFwiIHtcblx0XHRyZXR1cm4gXCJkZWZhdWx0XCJcblx0fVxuXHRyZXR1cm4gXCJkYXJrXCJcbn1cblxuY29uc3QgbWVybWFpZFNyYyA9IFwiaHR0cHM6Ly9jZG4uanNkZWxpdnIubmV0L25wbS9tZXJtYWlkQDExL2Rpc3QvbWVybWFpZC5taW4uanNcIlxuXG5mdW5jIGxvYWRNZXJtYWlkKCkgYW55IHtcblx0cmV0dXJuIGxvYWRTY3JpcHQobWVybWFpZFNyYywgXCJcIilcbn1cblxuLy8gcmVuZGVyTWVybWFpZCBsYXp5LWxvYWRzIG1lcm1haWQgb24gZmlyc3QgdXNlIGFuZCAocmUpZHJhd3MgZXZlcnkgZGlhZ3JhbVxuLy8gb24gdGhlIHBhZ2Ugd2l0aCB0aGUgY3VycmVudCB0aGVtZS5cbmFzeW5jIGZ1bmMgcmVuZGVyTWVybWFpZCgpIHtcblx0ZGVmZXIgZnVuYygpIHtcblx0XHRpZiByIDo9IHJlY292ZXIoKTsgciAhPSBuaWwge1xuXHRcdFx0Y29uc29sZS53YXJuKFwiTWVybWFpZCByZW5kZXIgZXJyb3I6XCIsIHIpXG5cdFx0fVxuXHR9KClcblx0bm9kZXMgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5tZXJtYWlkW2RhdGEtbWVybWFpZC1zcmNdXCIpXG5cdGlmIGxlbihub2RlcykgPT0gMCB7XG5cdFx0cmV0dXJuXG5cdH1cblx0YXdhaXQgbG9hZE1lcm1haWQoKVxuXHRmb3IgaSA6PSAwOyBpIDwgbGVuKG5vZGVzKTsgaSsrIHtcblx0XHRuIDo9IG5vZGVzW2ldXG5cdFx0bi5yZW1vdmVBdHRyaWJ1dGUoXCJkYXRhLXByb2Nlc3NlZFwiKVxuXHRcdG4udGV4dENvbnRlbnQgPSBuLmdldEF0dHJpYnV0ZShcImRhdGEtbWVybWFpZC1zcmNcIilcblx0fVxuXHRtZXJtYWlkLmluaXRpYWxpemUobWFwW3N0cmluZ11hbnl7XG5cdFx0XCJzdGFydE9uTG9hZFwiOiAgIGZhbHNlLFxuXHRcdFwidGhlbWVcIjogICAgICAgICBtZXJtYWlkVGhlbWUoY3VycmVudFRoZW1lKSxcblx0XHRcInNlY3VyaXR5TGV2ZWxcIjogXCJzdHJpY3RcIixcblx0fSlcblx0YXdhaXQgbWVybWFpZC5ydW4obWFwW3N0cmluZ11hbnl7XCJub2Rlc1wiOiBub2Rlc30pXG59XG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwic3RyY29udlwiXG5cbmNzcyBuYXZiYXJTdHlsZSgpIHtcblx0YmFja2dyb3VuZC1jb2xvcjogY29sb3ItbWl4KGluIHNyZ2IsIHZhcigtLWhlYWRlci1jb2xvcikgODUlLCB0cmFuc3BhcmVudCk7XG5cdGJhY2tkcm9wLWZpbHRlcjogYmx1cigxMnB4KTtcblx0LXdlYmtpdC1iYWNrZHJvcC1maWx0ZXI6IGJsdXIoMTJweCk7XG5cdGJvcmRlci1ib3R0b206IHZhcigtLWJvcmRlci13aWR0aCkgc29saWQgdmFyKC0tYWNjZW50KTtcblx0cG9zaXRpb246IGZpeGVkO1xuXHR0b3A6IDA7XG5cdGxlZnQ6IDA7XG5cdHJpZ2h0OiAwO1xuXHR6LWluZGV4OiAxMDMwO1xuXHRmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktcHJpbWFyeSk7XG5cdHRyYW5zaXRpb246XG5cdFx0YmFja2dyb3VuZC1jb2xvciB2YXIoLS10aGVtZS10cmFuc2l0aW9uLWR1cmF0aW9uKSB2YXIoLS10aGVtZS10cmFuc2l0aW9uLXRpbWluZyksXG5cdFx0Y29sb3IgdmFyKC0tdGhlbWUtdHJhbnNpdGlvbi1kdXJhdGlvbikgdmFyKC0tdGhlbWUtdHJhbnNpdGlvbi10aW1pbmcpLFxuXHRcdGJvcmRlci1jb2xvciB2YXIoLS10aGVtZS10cmFuc2l0aW9uLWR1cmF0aW9uKSB2YXIoLS10aGVtZS10cmFuc2l0aW9uLXRpbWluZyk7XG5cblx0JiAubmF2YmFyLWlubmVyIHtcblx0XHRtYXgtd2lkdGg6IDEwMDBweDtcblx0XHRtYXJnaW4taW5saW5lOiBhdXRvO1xuXHRcdHBhZGRpbmc6IDAgMTVweDtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdFx0anVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuXHRcdHRyYW5zaXRpb246XG5cdFx0XHRiYWNrZ3JvdW5kLWNvbG9yIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tZHVyYXRpb24pIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tdGltaW5nKSxcblx0XHRcdGNvbG9yIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tZHVyYXRpb24pIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tdGltaW5nKSxcblx0XHRcdGJvcmRlci1jb2xvciB2YXIoLS10aGVtZS10cmFuc2l0aW9uLWR1cmF0aW9uKSB2YXIoLS10aGVtZS10cmFuc2l0aW9uLXRpbWluZyk7XG5cdH1cblx0JiAubmF2YmFyLWJyYW5kIHtcblx0XHRjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXHRcdGZvbnQtc2l6ZTogMS4yNWVtO1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0cGFkZGluZzogMTFweCAwO1xuXHR9XG5cdCYgLm5hdmJhci1jb2xsYXBzZSB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2Vlbjtcblx0XHR3aWR0aDogMTAwJTtcblx0fVxuXHQmIC5uYXZiYXItbmF2IHtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGxpc3Qtc3R5bGU6IG5vbmU7XG5cdFx0bWFyZ2luOiAwO1xuXHRcdHBhZGRpbmc6IDA7XG5cdFx0YWxpZ24taXRlbXM6IHN0cmV0Y2g7XG5cdH1cblx0JiAubmF2YmFyLW5hdi5sZWZ0IHtcblx0XHRtYXJnaW4tcmlnaHQ6IGF1dG87XG5cdH1cblx0JiAubmF2YmFyLW5hdi5yaWdodCB7XG5cdFx0bWFyZ2luLWxlZnQ6IGF1dG87XG5cdH1cblx0JiAubmF2LWl0ZW0ge1xuXHRcdHBvc2l0aW9uOiByZWxhdGl2ZTtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuXHR9XG5cdCYgYnV0dG9uLm5hdi1saW5rIHtcblx0XHRiYWNrZ3JvdW5kOiBub25lO1xuXHRcdGJvcmRlcjogbm9uZTtcblx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cdFx0Zm9udC1mYW1pbHk6IGluaGVyaXQ7XG5cdFx0d2lkdGg6IGF1dG87XG5cdFx0dHJhbnNpdGlvbjpcblx0XHRcdHRyYW5zZm9ybSAwLjFzIGVhc2UsXG5cdFx0XHRiYWNrZ3JvdW5kLWNvbG9yIHZhcigtLXRyYW5zaXRpb24tZmFzdCksXG5cdFx0XHRjb2xvciB2YXIoLS10cmFuc2l0aW9uLWZhc3QpO1xuXHR9XG5cdCYgYnV0dG9uLm5hdi1saW5rOmFjdGl2ZSB7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgwLjk1KTtcblx0fVxuXHQmIC5uYXYtbGluayB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdHBhZGRpbmc6IDExcHggMjBweDtcblx0XHRjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXHRcdGxpbmUtaGVpZ2h0OiAxLjI7XG5cdFx0Zm9udC1zaXplOiAxLjI1ZW07XG5cdFx0Zm9udC13ZWlnaHQ6IDcwMDtcblx0XHR0cmFuc2l0aW9uOlxuXHRcdFx0YmFja2dyb3VuZC1jb2xvciB2YXIoLS10cmFuc2l0aW9uLWZhc3QpLFxuXHRcdFx0Y29sb3IgdmFyKC0tdHJhbnNpdGlvbi1mYXN0KSxcblx0XHRcdGJvcmRlci1jb2xvciB2YXIoLS10cmFuc2l0aW9uLWZhc3QpLFxuXHRcdFx0b3BhY2l0eSB2YXIoLS10cmFuc2l0aW9uLWZhc3QpLFxuXHRcdFx0dHJhbnNmb3JtIHZhcigtLXRyYW5zaXRpb24tZmFzdCk7XG5cdH1cblx0JiAubmF2YmFyLW1lbnUgLm5hdi1saW5rLFxuXHQmIC5uYXZiYXItaWNvbiAubmF2LWxpbmsge1xuXHRcdGZvbnQtc2l6ZTogMS4zNXJlbTtcblx0fVxuXHQmIC5uYXZiYXItbWVudSAubmF2LWxpbmsge1xuXHRcdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdH1cblx0JiAubmF2YmFyLWljb24gLm5hdi1saW5rIHN2ZyB7XG5cdFx0dHJhbnNpdGlvbjpcblx0XHRcdHRyYW5zZm9ybSAwLjJzIGN1YmljLWJlemllcigwLjM0LCAxLjU2LCAwLjY0LCAxKSxcblx0XHRcdHJvdGF0ZSAwLjJzIGN1YmljLWJlemllcigwLjM0LCAxLjU2LCAwLjY0LCAxKTtcblx0XHR0cmFuc2Zvcm0tb3JpZ2luOiBjZW50ZXI7XG5cdH1cblx0JiAubmF2YmFyLWljb24gLm5hdi1saW5rOmhvdmVyIHN2Zyxcblx0JiAubmF2YmFyLWljb24gLm5hdi1saW5rOmZvY3VzIHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiByb3RhdGUoOGRlZykgc2NhbGUoMS4yNSk7XG5cdH1cblx0JiAubmF2YmFyLWljb24gLm5hdi1saW5rOmFjdGl2ZSBzdmcge1xuXHRcdHRyYW5zZm9ybTogcm90YXRlKDRkZWcpIHNjYWxlKDEuMSk7XG5cdH1cblx0JiAubmF2LWxpbms6aG92ZXIsXG5cdCYgLm5hdi1saW5rOmZvY3VzLFxuXHQmIC5uYXYtbGluazphY3RpdmUge1xuXHRcdGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLWNvbG9yKTtcblx0fVxuXHQmIC5uYXYtbGluay5hY3RpdmUge1xuXHRcdGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLWNvbG9yKTtcblx0fVxuXHQmIC5uYXYtbGluazpmb2N1czpub3QoLmFjdGl2ZSkge1xuXHRcdG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS1hY2NlbnQpO1xuXHRcdG91dGxpbmUtb2Zmc2V0OiAtMnB4O1xuXHR9XG5cdCYgLm5hdi1saW5rOmZvY3VzOm5vdCg6Zm9jdXMtdmlzaWJsZSk6bm90KC5hY3RpdmUpIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcblx0XHRjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0fVxuXHQmIC5uYXYtbGluay5hY3RpdmU6Zm9jdXMge1xuXHRcdG91dGxpbmU6IG5vbmU7XG5cdH1cblx0JiAubmF2LWxpbms6Zm9jdXM6bm90KDpmb2N1cy12aXNpYmxlKTpob3ZlciB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItY29sb3IpO1xuXHRcdGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHR9XG5cblx0QG1lZGlhIChtaW4td2lkdGg6IDc2OHB4KSB7XG5cdFx0JiAubmF2YmFyLWlubmVyIHtcblx0XHRcdHBhZGRpbmctbGVmdDogMjBweDtcblx0XHRcdHBhZGRpbmctcmlnaHQ6IDIwcHg7XG5cdFx0fVxuXHR9XG5cblx0JiAubmF2YmFyLXRvZ2dsZSB7XG5cdFx0ZGlzcGxheTogbm9uZTtcblx0XHRiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblx0XHRib3JkZXI6IG5vbmU7XG5cdFx0Y29sb3I6IHZhcigtLWZvbnQtY29sb3IpO1xuXHRcdGZvbnQtc2l6ZTogMS41ZW07XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdHBhZGRpbmc6IDExcHggMC41cmVtO1xuXHRcdHRyYW5zaXRpb246IHRyYW5zZm9ybSB2YXIoLS10cmFuc2l0aW9uLWZhc3QpO1xuXHRcdG92ZXJmbG93OiB2aXNpYmxlO1xuXHR9XG5cdCYgLm5hdmJhci10b2dnbGU6Zm9jdXMge1xuXHRcdG91dGxpbmU6IDJweCBzb2xpZCB2YXIoLS1hY2NlbnQpO1xuXHRcdG91dGxpbmUtb2Zmc2V0OiAycHg7XG5cdH1cblx0JiAubmF2YmFyLXRvZ2dsZTpmb2N1czpub3QoOmZvY3VzLXZpc2libGUpIHtcblx0XHRvdXRsaW5lOiBub25lO1xuXHR9XG5cdCYgLm5hdmJhci10b2dnbGU6YWN0aXZlIHtcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDAuOSk7XG5cdH1cblx0JiAubmF2YmFyLXRvZ2dsZS1pY29uIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHR3aWR0aDogMjRweDtcblx0XHRoZWlnaHQ6IDJweDtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiBjdXJyZW50Q29sb3I7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHRyYW5zaXRpb246IGJhY2tncm91bmQtY29sb3IgdmFyKC0tdHJhbnNpdGlvbi1ub3JtYWwpO1xuXHRcdHotaW5kZXg6IDE7XG5cdH1cblx0JiAubmF2YmFyLXRvZ2dsZS1pY29uOjpiZWZvcmUge1xuXHRcdGNvbnRlbnQ6IFwiXCI7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0d2lkdGg6IDI0cHg7XG5cdFx0aGVpZ2h0OiAycHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRsZWZ0OiAwO1xuXHRcdHRvcDogLThweDtcblx0XHR0cmFuc2l0aW9uOiBhbGwgdmFyKC0tdHJhbnNpdGlvbi1ub3JtYWwpO1xuXHR9XG5cdCYgLm5hdmJhci10b2dnbGUtaWNvbjo6YWZ0ZXIge1xuXHRcdGNvbnRlbnQ6IFwiXCI7XG5cdFx0ZGlzcGxheTogYmxvY2s7XG5cdFx0d2lkdGg6IDI0cHg7XG5cdFx0aGVpZ2h0OiAycHg7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogY3VycmVudENvbG9yO1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRsZWZ0OiAwO1xuXHRcdGJvdHRvbTogLThweDtcblx0XHR0cmFuc2l0aW9uOiBhbGwgdmFyKC0tdHJhbnNpdGlvbi1ub3JtYWwpO1xuXHR9XG5cdCYgLm5hdmJhci10b2dnbGUuYWN0aXZlIC5uYXZiYXItdG9nZ2xlLWljb24ge1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuXHR9XG5cdCYgLm5hdmJhci10b2dnbGUuYWN0aXZlIC5uYXZiYXItdG9nZ2xlLWljb246OmJlZm9yZSB7XG5cdFx0dHJhbnNmb3JtOiByb3RhdGUoNDVkZWcpO1xuXHRcdHRvcDogMDtcblx0fVxuXHQmIC5uYXZiYXItdG9nZ2xlLmFjdGl2ZSAubmF2YmFyLXRvZ2dsZS1pY29uOjphZnRlciB7XG5cdFx0dHJhbnNmb3JtOiByb3RhdGUoLTQ1ZGVnKTtcblx0XHRib3R0b206IDA7XG5cdH1cblxuXHQmIC5kcm9wZG93biB7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHR9XG5cdCYgLmRyb3Bkb3duLXRvZ2dsZSB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdGdhcDogMC4zcmVtO1xuXHR9XG5cdCYgLmRyb3Bkb3duLWNoZXZyb24ge1xuXHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdFx0dHJhbnNpdGlvbjogdHJhbnNmb3JtIHZhcigtLXRyYW5zaXRpb24tZmFzdCk7XG5cdFx0dHJhbnNmb3JtLW9yaWdpbjogY2VudGVyO1xuXHR9XG5cdCYgLmRyb3Bkb3duLWNoZXZyb24gc3ZnIHtcblx0XHR3aWR0aDogMC44ZW07XG5cdFx0aGVpZ2h0OiAwLjhlbTtcblx0fVxuXHQmIC5kcm9wZG93bi1jaGV2cm9uLWRvd24ge1xuXHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHR9XG5cdCYgLmRyb3Bkb3duLWNoZXZyb24tdXAge1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdH1cblx0JiAuZHJvcGRvd24uc2hvdyAuZHJvcGRvd24tY2hldnJvbi1kb3duIHtcblx0XHRkaXNwbGF5OiBub25lO1xuXHR9XG5cdCYgLmRyb3Bkb3duLnNob3cgLmRyb3Bkb3duLWNoZXZyb24tdXAge1xuXHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHR9XG5cdCYgLmRyb3Bkb3duLW1lbnUge1xuXHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHR0b3A6IDEwMCU7XG5cdFx0bGVmdDogMDtcblx0XHRtaW4td2lkdGg6IDIwMHB4O1xuXHRcdGJhY2tncm91bmQtY29sb3I6IGNvbG9yLW1peChpbiBzcmdiLCB2YXIoLS1oZWFkZXItY29sb3IpIDkyJSwgdHJhbnNwYXJlbnQpO1xuXHRcdGJhY2tkcm9wLWZpbHRlcjogYmx1cigxMnB4KTtcblx0XHQtd2Via2l0LWJhY2tkcm9wLWZpbHRlcjogYmx1cigxMnB4KTtcblx0XHRib3JkZXI6IHZhcigtLWJvcmRlci13aWR0aCkgc29saWQgdmFyKC0tYWNjZW50KTtcblx0XHRwYWRkaW5nOiAwO1xuXHRcdG1hcmdpbjogMDtcblx0XHRsaXN0LXN0eWxlOiBub25lO1xuXHRcdHotaW5kZXg6IDEwMDA7XG5cdFx0Ym94LXNoYWRvdzogMCA2cHggMTJweCB2YXIoLS1hY2NlbnQtZ2xvdyk7XG5cdFx0b3BhY2l0eTogMDtcblx0XHR2aXNpYmlsaXR5OiBoaWRkZW47XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01cHgpO1xuXHRcdHRyYW5zaXRpb246IGFsbCAwLjJzIGVhc2U7XG5cdH1cblx0JiAuZHJvcGRvd24uc2hvdyAuZHJvcGRvd24tbWVudSB7XG5cdFx0b3BhY2l0eTogMTtcblx0XHR2aXNpYmlsaXR5OiB2aXNpYmxlO1xuXHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKTtcblx0fVxuXHQmIC5kcm9wZG93bi1pdGVtIHtcblx0XHRkaXNwbGF5OiBibG9jaztcblx0XHRwYWRkaW5nOiAxMHB4IDIwcHg7XG5cdFx0Y29sb3I6IHZhcigtLWZvbnQtY29sb3IpO1xuXHRcdHRleHQtZGVjb3JhdGlvbjogbm9uZTtcblx0XHRmb250LXNpemU6IDE2cHg7XG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGVhZGVyLWNvbG9yKTtcblx0XHR0cmFuc2l0aW9uOiBhbGwgdmFyKC0tdHJhbnNpdGlvbi1mYXN0KTtcblx0XHRib3JkZXI6IG5vbmU7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdFx0dGV4dC1hbGlnbjogbGVmdDtcblx0XHR3aGl0ZS1zcGFjZTogbm93cmFwO1xuXHR9XG5cdCYgLmRyb3Bkb3duLWl0ZW06aG92ZXIsXG5cdCYgLmRyb3Bkb3duLWl0ZW06Zm9jdXMsXG5cdCYgLmRyb3Bkb3duLWl0ZW06YWN0aXZlLFxuXHQmIC5kcm9wZG93bi1pdGVtLmFjdGl2ZSB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItY29sb3IpO1xuXHRcdGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHR9XG5cdCYgLmRyb3Bkb3duLWl0ZW0uYWN0aXZlOmZvY3VzIHtcblx0XHRvdXRsaW5lOiBub25lO1xuXHR9XG5cblx0JiAudGhlbWUtdG9nZ2xlIHtcblx0XHRiYWNrZ3JvdW5kOiBub25lO1xuXHRcdGJvcmRlcjogbm9uZTtcblx0XHRjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdHBhZGRpbmc6IDExcHggMjBweDtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdFx0Zm9udC1zaXplOiAxLjM1cmVtO1xuXHRcdHRyYW5zaXRpb246XG5cdFx0XHRjb2xvciB2YXIoLS10cmFuc2l0aW9uLWZhc3QpLFxuXHRcdFx0YmFja2dyb3VuZC1jb2xvciB2YXIoLS10cmFuc2l0aW9uLWZhc3QpO1xuXHR9XG5cdCYgLnRoZW1lLXRvZ2dsZTpob3Zlcixcblx0JiAudGhlbWUtdG9nZ2xlOmZvY3VzIHtcblx0XHRjb2xvcjogdmFyKC0tYWNjZW50KTtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jb2xvcik7XG5cdH1cblx0JiAudGhlbWUtdG9nZ2xlOmhvdmVyIHN2Zyxcblx0JiAudGhlbWUtdG9nZ2xlOmZvY3VzIHN2ZyB7XG5cdFx0dHJhbnNmb3JtOiByb3RhdGUoOGRlZykgc2NhbGUoMS4yNSk7XG5cdH1cblx0JiAudGhlbWUtdG9nZ2xlOmFjdGl2ZSB7XG5cdFx0Y29sb3I6IHZhcigtLWFjY2VudCk7XG5cdH1cblx0JiAudGhlbWUtdG9nZ2xlOmFjdGl2ZSBzdmcge1xuXHRcdHRyYW5zZm9ybTogcm90YXRlKDRkZWcpIHNjYWxlKDEuMSk7XG5cdH1cblx0JiAudGhlbWUtdG9nZ2xlIHN2ZyB7XG5cdFx0dHJhbnNpdGlvbjpcblx0XHRcdG9wYWNpdHkgdmFyKC0tdGhlbWUtdHJhbnNpdGlvbi1kdXJhdGlvbikgdmFyKC0tdGhlbWUtdHJhbnNpdGlvbi10aW1pbmcpLFxuXHRcdFx0dHJhbnNmb3JtIDAuMnMgY3ViaWMtYmV6aWVyKDAuMzQsIDEuNTYsIDAuNjQsIDEpLFxuXHRcdFx0ZmlsbCB2YXIoLS10cmFuc2l0aW9uLWZhc3QpO1xuXHRcdGZpbGw6IGN1cnJlbnRDb2xvcjtcblx0fVxuXG5cdEBtZWRpYSAobWF4LXdpZHRoOiA3NjdweCkge1xuXHRcdCYgLm5hdmJhci1icmFuZCB7XG5cdFx0XHRkaXNwbGF5OiBibG9jaztcblx0XHR9XG5cdFx0JiAubmF2YmFyLXRvZ2dsZSB7XG5cdFx0XHRkaXNwbGF5OiBibG9jaztcblx0XHR9XG5cdFx0JiAubmF2YmFyLWNvbGxhcHNlIHtcblx0XHRcdHBvc2l0aW9uOiBhYnNvbHV0ZTtcblx0XHRcdHRvcDogMTAwJTtcblx0XHRcdGxlZnQ6IDA7XG5cdFx0XHRyaWdodDogMDtcblx0XHRcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhlYWRlci1jb2xvcik7XG5cdFx0XHRib3JkZXItYm90dG9tOiB2YXIoLS1ib3JkZXItd2lkdGgpIHNvbGlkIHZhcigtLWFjY2VudCk7XG5cdFx0XHRmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXHRcdFx0YWxpZ24taXRlbXM6IHN0cmV0Y2g7XG5cdFx0XHRtYXgtaGVpZ2h0OiAwO1xuXHRcdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0XHRcdHRyYW5zaXRpb246IG1heC1oZWlnaHQgMC4yNXMgZWFzZS1pbjtcblx0XHR9XG5cdFx0JiAubmF2YmFyLWNvbGxhcHNlLnNob3cge1xuXHRcdFx0bWF4LWhlaWdodDogODAwcHg7XG5cdFx0XHRvdmVyZmxvdy15OiBhdXRvO1xuXHRcdFx0b3ZlcmZsb3cteDogaGlkZGVuO1xuXHRcdFx0dHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjhzIGVhc2Utb3V0O1xuXHRcdH1cblx0XHQmIC5uYXZiYXItbmF2IHtcblx0XHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdFx0XHR3aWR0aDogMTAwJTtcblx0XHRcdG1heC13aWR0aDogMTAwJTtcblx0XHRcdG92ZXJmbG93LXg6IGhpZGRlbjtcblx0XHR9XG5cdFx0JiAubmF2YmFyLW5hdi5sZWZ0LFxuXHRcdCYgLm5hdmJhci1uYXYucmlnaHQge1xuXHRcdFx0bWFyZ2luOiAwO1xuXHRcdH1cblx0XHQmIC5uYXZiYXItbmF2LnJpZ2h0IHtcblx0XHRcdGZsZXgtZGlyZWN0aW9uOiByb3c7XG5cdFx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0XHRcdHBhZGRpbmc6IDEwcHggMDtcblx0XHRcdG1hcmdpbi10b3A6IDEwcHg7XG5cdFx0fVxuXHRcdCYgLm5hdmJhci1uYXYucmlnaHQgLm5hdi1pdGVtIHtcblx0XHRcdGRpc3BsYXk6IGlubGluZS1mbGV4O1xuXHRcdH1cblx0XHQmIC5uYXZiYXItbmF2LnJpZ2h0IC5uYXYtbGluayB7XG5cdFx0XHRwYWRkaW5nOiAxMHB4IDE1cHg7XG5cdFx0XHRoZWlnaHQ6IGF1dG87XG5cdFx0fVxuXHRcdCYgLm5hdmJhci1uYXYubGVmdCAubmF2LWl0ZW0ge1xuXHRcdFx0d2lkdGg6IDEwMCU7XG5cdFx0XHRoZWlnaHQ6IGF1dG87XG5cdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdH1cblx0XHQmIC5uYXZiYXItbmF2LmxlZnQgLm5hdi1saW5rIHtcblx0XHRcdGhlaWdodDogYXV0bztcblx0XHRcdHBhZGRpbmc6IDEycHggMjBweDtcblx0XHRcdHdpZHRoOiAxMDAlO1xuXHRcdFx0anVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuXHRcdH1cblx0XHQmIC5kcm9wZG93biB7XG5cdFx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0XHRcdHdpZHRoOiAxMDAlO1xuXHRcdH1cblx0XHQmIC5kcm9wZG93bi1tZW51IHtcblx0XHRcdHBvc2l0aW9uOiBzdGF0aWM7XG5cdFx0XHRib3JkZXI6IG5vbmU7XG5cdFx0XHRib3gtc2hhZG93OiBub25lO1xuXHRcdFx0d2lkdGg6IDEwMCU7XG5cdFx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdFx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0XHRcdG1heC1oZWlnaHQ6IDA7XG5cdFx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHRcdFx0dHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjRzIGVhc2Utb3V0O1xuXHRcdFx0b3JkZXI6IDI7XG5cdFx0fVxuXHRcdCYgLmRyb3Bkb3duLXRvZ2dsZSB7XG5cdFx0XHRvcmRlcjogMTtcblx0XHRcdHdpZHRoOiAxMDAlO1xuXHRcdH1cblx0XHQmIC5kcm9wZG93bi5zaG93IC5kcm9wZG93bi1tZW51IHtcblx0XHRcdG1heC1oZWlnaHQ6IDUwMHB4O1xuXHRcdFx0dHJhbnNpdGlvbjogbWF4LWhlaWdodCAwLjVzIGVhc2Utb3V0O1xuXHRcdH1cblx0XHQmIC5kcm9wZG93bi1pdGVtIHtcblx0XHRcdHBhZGRpbmctbGVmdDogNDBweDtcblx0XHRcdHdpZHRoOiAxMDAlO1xuXHRcdFx0dGV4dC1hbGlnbjogbGVmdDtcblx0XHRcdHdoaXRlLXNwYWNlOiBub3JtYWw7XG5cdFx0XHR3b3JkLXdyYXA6IGJyZWFrLXdvcmQ7XG5cdFx0fVxuXHR9XG59XG5cbnRlbXBsIE5hdmJhcihyIFJvdXRlTWF0Y2gsIHBhZ2VzIFtdTmF2UGFnZSwgcHJvamVjdHMgW11Qcm9qZWN0LCBkcm9wZG93bk9wZW4gYm9vbCwgbW9iaWxlT3BlbiBib29sLCBzaXRlQ29uZmlnIFNpdGVDb25maWcpIHtcblx0PG5hdiBjbGFzcz17IFwibmF2YmFyIFwiICsgbmF2YmFyU3R5bGUoKSB9PlxuXHRcdDxkaXYgY2xhc3M9XCJuYXZiYXItaW5uZXJcIj5cblx0XHRcdDxhIGNsYXNzPVwibmF2YmFyLWJyYW5kXCIgaHJlZj1cIi9cIiBkYXRhLWFjdGlvbj1cIm5hdlwiPnsgc2l0ZUNvbmZpZy5UaXRsZSB9PC9hPlxuXHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgY2xhc3M9eyBjbHMoXCJuYXZiYXItdG9nZ2xlXCIsIG1vYmlsZU9wZW4sIFwiYWN0aXZlXCIpIH0gYXJpYS1sYWJlbD1cIlRvZ2dsZSBuYXZpZ2F0aW9uXCIgYXJpYS1leHBhbmRlZD17IHN0cmNvbnYuRm9ybWF0Qm9vbChtb2JpbGVPcGVuKSB9IGRhdGEtYWN0aW9uPVwidG9nZ2xlLW1vYmlsZS1uYXZcIj5cblx0XHRcdFx0PHNwYW4gY2xhc3M9XCJuYXZiYXItdG9nZ2xlLWljb25cIj48L3NwYW4+XG5cdFx0XHQ8L2J1dHRvbj5cblx0XHRcdDxkaXYgY2xhc3M9eyBjbHMoXCJuYXZiYXItY29sbGFwc2VcIiwgbW9iaWxlT3BlbiwgXCJzaG93XCIpIH0+XG5cdFx0XHRcdDx1bCBjbGFzcz1cIm5hdmJhci1uYXYgbGVmdFwiPlxuXHRcdFx0XHRcdDxsaSBjbGFzcz1cIm5hdi1pdGVtIG5hdmJhci1tZW51XCI+XG5cdFx0XHRcdFx0XHQ8YSBjbGFzcz17IGNscyhcIm5hdi1saW5rXCIsIHIuS2luZCA9PSBSb3V0ZUJsb2csIFwiYWN0aXZlXCIpIH0gaHJlZj1cIi9ibG9nXCIgZGF0YS1hY3Rpb249XCJuYXZcIj57IHQoXCJuYXYuYmxvZ1wiKSB9PC9hPlxuXHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0PGxpIGNsYXNzPXsgY2xzKFwibmF2LWl0ZW0gbmF2YmFyLW1lbnUgZHJvcGRvd25cIiwgZHJvcGRvd25PcGVuLCBcInNob3dcIikgfT5cblx0XHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPXsgY2xzKFwibmF2LWxpbmsgZHJvcGRvd24tdG9nZ2xlXCIsIHIuS2luZCA9PSBSb3V0ZVByb2plY3QsIFwiYWN0aXZlXCIpIH0gYXJpYS1oYXNwb3B1cD1cInRydWVcIiBhcmlhLWNvbnRyb2xzPVwicHJvamVjdHMtZHJvcGRvd25cIiBhcmlhLWV4cGFuZGVkPXsgc3RyY29udi5Gb3JtYXRCb29sKGRyb3Bkb3duT3BlbikgfSBkYXRhLWFjdGlvbj1cInRvZ2dsZS1wcm9qZWN0cy1kcm9wZG93blwiPlxuXHRcdFx0XHRcdFx0XHR7IHQoXCJuYXYucHJvamVjdHNcIikgfVxuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImRyb3Bkb3duLWNoZXZyb24gZHJvcGRvd24tY2hldnJvbi1kb3duXCI+QEljb24oXCJjaGV2cm9uLWRvd25cIiwgXCIwLjhlbVwiKTwvc3Bhbj5cblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9XCJkcm9wZG93bi1jaGV2cm9uIGRyb3Bkb3duLWNoZXZyb24tdXBcIj5ASWNvbihcImNoZXZyb24tdXBcIiwgXCIwLjhlbVwiKTwvc3Bhbj5cblx0XHRcdFx0XHRcdDwvYnV0dG9uPlxuXHRcdFx0XHRcdFx0PHVsIGNsYXNzPVwiZHJvcGRvd24tbWVudVwiIGlkPVwicHJvamVjdHMtZHJvcGRvd25cIj5cblx0XHRcdFx0XHRcdFx0Zm9yIF8sIHAgOj0gcmFuZ2UgcHJvamVjdHMge1xuXHRcdFx0XHRcdFx0XHRcdDxsaT48YSBjbGFzcz17IGNscyhcImRyb3Bkb3duLWl0ZW1cIiwgaXNBY3RpdmVSb3V0ZShyLCBSb3V0ZVByb2plY3QsIHAuSUQpLCBcImFjdGl2ZVwiKSB9IGhyZWY9eyBwLkhyZWYgfSBkYXRhLWFjdGlvbj1cIm5hdlwiPnsgcC5UaXRsZSB9PC9hPjwvbGk+XG5cdFx0XHRcdFx0XHRcdH1cblx0XHRcdFx0XHRcdDwvdWw+XG5cdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRmb3IgXywgcGFnZSA6PSByYW5nZSBwYWdlcyB7XG5cdFx0XHRcdFx0XHRpZiBwYWdlLlNob3dJbk5hdiB7XG5cdFx0XHRcdFx0XHRcdDxsaSBjbGFzcz1cIm5hdi1pdGVtIG5hdmJhci1tZW51XCI+XG5cdFx0XHRcdFx0XHRcdFx0PGEgY2xhc3M9eyBjbHMoXCJuYXYtbGlua1wiLCBpc0FjdGl2ZVJvdXRlKHIsIFJvdXRlUGFnZSwgcGFnZS5JRCksIFwiYWN0aXZlXCIpIH0gaHJlZj17IHBhZ2UuSHJlZiB9IGRhdGEtYWN0aW9uPVwibmF2XCI+eyBwYWdlLlRpdGxlIH08L2E+XG5cdFx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHQ8L3VsPlxuXHRcdFx0XHQ8dWwgY2xhc3M9XCJuYXZiYXItbmF2IHJpZ2h0XCI+XG5cdFx0XHRcdFx0aWYgc2l0ZUNvbmZpZy5TZWFyY2guRW5hYmxlZCB7XG5cdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbSBuYXZiYXItaWNvblwiPlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5hdi1saW5rIHNlYXJjaC10b2dnbGVcIiBpZD1cInNlYXJjaC10b2dnbGVcIiBhcmlhLWxhYmVsPXsgdChcImFyaWEuc2VhcmNoXCIpIH0gdGl0bGU9eyB0KFwic2VhcmNoLmJ1dHRvblRpdGxlXCIpICsgXCIgKFwiICsgdChcInNlYXJjaC5zaG9ydGN1dEhpbnRcIikgKyBcIilcIiB9IGFyaWEta2V5c2hvcnRjdXRzPVwiQ29udHJvbCtLIE1ldGErSyAvXCIgZGF0YS1hY3Rpb249XCJvcGVuLXNlYXJjaFwiPlxuXHRcdFx0XHRcdFx0XHRcdEBJY29uKFwic2VhcmNoXCIsIFwiMS4zNXJlbVwiKVxuXHRcdFx0XHRcdFx0XHQ8L2J1dHRvbj5cblx0XHRcdFx0XHRcdDwvbGk+XG5cdFx0XHRcdFx0fVxuXHRcdFx0XHRcdDxsaSBjbGFzcz1cIm5hdi1pdGVtIG5hdmJhci1pY29uXCI+XG5cdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBpZD1cInRoZW1lLXRvZ2dsZVwiIGNsYXNzPVwidGhlbWUtdG9nZ2xlIG5hdi1saW5rXCIgYXJpYS1sYWJlbD17IHQoXCJhcmlhLnRvZ2dsZVRoZW1lXCIpIH0gdGl0bGU9eyB0KFwidGhlbWUudG9nZ2xlVGl0bGVcIikgfSBkYXRhLWFjdGlvbj1cInRvZ2dsZS10aGVtZVwiPlxuXHRcdFx0XHRcdFx0XHRASWNvbihcInN1blwiLCBcIjEuMzVyZW1cIilcblx0XHRcdFx0XHRcdFx0QEljb24oXCJtb29uXCIsIFwiMS4zNXJlbVwiKVxuXHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0PC9saT5cblx0XHRcdFx0XHRpZiBzaXRlQ29uZmlnLkVtYWlsSlMuRW5hYmxlZCB7XG5cdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbSBuYXZiYXItaWNvblwiPlxuXHRcdFx0XHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cIm5hdi1saW5rIGVtYWlsLXRvZ2dsZVwiIGlkPVwiZW1haWwtdG9nZ2xlXCIgYXJpYS1sYWJlbD17IHQoXCJjb250YWN0LnRpdGxlXCIpIH0gdGl0bGU9eyB0KFwiY29udGFjdC5idXR0b25UaXRsZVwiKSB9IGRhdGEtYWN0aW9uPVwib3Blbi1jb250YWN0XCI+XG5cdFx0XHRcdFx0XHRcdFx0QEljb24oXCJlbnZlbG9wZVwiLCBcIjEuMzVyZW1cIilcblx0XHRcdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0XHRmb3IgXywgcyA6PSByYW5nZSBzaXRlQ29uZmlnLlNvY2lhbCB7XG5cdFx0XHRcdFx0XHQ8bGkgY2xhc3M9XCJuYXYtaXRlbSBuYXZiYXItaWNvblwiPlxuXHRcdFx0XHRcdFx0XHQ8YSBjbGFzcz1cIm5hdi1saW5rXCIgaHJlZj17IHMuSHJlZiB9IHRhcmdldD17IHMuVGFyZ2V0IH0gcmVsPXsgcy5SZWwgfT5cblx0XHRcdFx0XHRcdFx0XHRASWNvbihzLkljb24sIFwiMS4zNXJlbVwiKVxuXHRcdFx0XHRcdFx0XHQ8L2E+XG5cdFx0XHRcdFx0XHQ8L2xpPlxuXHRcdFx0XHRcdH1cblx0XHRcdFx0PC91bD5cblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQ8L25hdj5cbn1cbiIsInBhY2thZ2UgbWFpblxuXG5jc3MgcGFnZVZpZXdTdHlsZSgpIHtcblx0JiAuYWJvdXQtcGljIHtcblx0XHR3aWR0aDogbWluKDE1MHB4LCAzMHZ3KTtcblx0XHRhc3BlY3QtcmF0aW86IDEgLyAxO1xuXHRcdGhlaWdodDogYXV0bztcblx0XHRib3JkZXItcmFkaXVzOiA1MCU7XG5cdFx0bWFyZ2luLWJvdHRvbTogMjBweDtcblx0XHRvYmplY3QtZml0OiBjb3Zlcjtcblx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0tdHJhbnNpdGlvbi1ub3JtYWwpO1xuXHR9XG5cdCYgLmFib3V0LXBpYzpob3ZlciB7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgxLjA1KTtcblx0fVxufVxuXG50ZW1wbCBQYWdlVmlldyh2IFZpZXdTdGF0ZSkge1xuXHRpZiB2LlN0YXR1cyA9PSBMb2FkRmFpbGVkIHtcblx0XHQ8ZGl2IGNsYXNzPXsgXCJlcnJvci1tZXNzYWdlIFwiICsgZXJyb3JNZXNzYWdlU3R5bGUoKSB9PlxuXHRcdFx0PGgxPnsgdChcImdlbmVyYWwubm90Rm91bmRcIikgfTwvaDE+XG5cdFx0XHQ8cD57IHQoXCJnZW5lcmFsLm5vdEZvdW5kTWVzc2FnZVwiKSB9PC9wPlxuXHRcdDwvZGl2PlxuXHR9IGVsc2Uge1xuXHRcdDxkaXYgY2xhc3M9eyBcInBhZ2UtdmlldyBcIiArIHBhZ2VWaWV3U3R5bGUoKSB9PlxuXHRcdFx0PGRpdiBjbGFzcz17IFwibWFya2Rvd24tYm9keSBcIiArIG1hcmtkb3duQm9keVN0eWxlKCkgfT5cblx0XHRcdFx0QHRlbXBsLlJhdyh2LkhUTUwpXG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0fVxufVxuIiwicGFja2FnZSBtYWluXG5cbnRlbXBsIFByb2plY3RSZWFkbWUodiBWaWV3U3RhdGUpIHtcblx0aWYgdi5Qcm9qLkdpdGh1YlJlcG8gIT0gXCJcIiB7XG5cdFx0aWYgdi5TdGF0dXMgPT0gTG9hZEZhaWxlZCB7XG5cdFx0XHQ8ZGl2IGlkPVwicHJvamVjdC1yZWFkbWVcIj5cblx0XHRcdFx0PHA+eyB0KFwicHJvamVjdC5yZWFkbWVFcnJvclwiKSB9PC9wPlxuXHRcdFx0PC9kaXY+XG5cdFx0fSBlbHNlIGlmIHYuSFRNTCAhPSBcIlwiIHtcblx0XHRcdDxkaXYgaWQ9XCJwcm9qZWN0LXJlYWRtZVwiIGNsYXNzPXsgXCJtYXJrZG93bi1ib2R5IFwiICsgbWFya2Rvd25Cb2R5U3R5bGUoKSB9PlxuXHRcdFx0XHRAdGVtcGwuUmF3KHYuSFRNTClcblx0XHRcdDwvZGl2PlxuXHRcdH1cblx0fVxufVxuXG50ZW1wbCBQcm9qZWN0TWVkaWEodmlkZW9zIFtdc3RyaW5nKSB7XG5cdGlmIGxlbih2aWRlb3MpID4gMCB7XG5cdFx0PGRpdiBjbGFzcz17IFwibWFya2Rvd24tYm9keSBcIiArIG1hcmtkb3duQm9keVN0eWxlKCkgfT5cblx0XHRcdDxoMiBpZD1cInByb2plY3QtbWVkaWFcIj57IHQoXCJwcm9qZWN0Lm1lZGlhXCIpIH08L2gyPlxuXHRcdFx0Zm9yIF8sIHYgOj0gcmFuZ2UgdmlkZW9zIHtcblx0XHRcdFx0PGRpdiBjbGFzcz1cInlvdXR1YmUtdmlkZW9cIj5cblx0XHRcdFx0XHQ8ZGl2IGNsYXNzPVwiaWZyYW1lV3JhcHBlclwiPlxuXHRcdFx0XHRcdFx0PGlmcmFtZSB3aWR0aD1cIjU2MFwiIGhlaWdodD1cIjM0OVwiIHNyYz17IFwiaHR0cHM6Ly93d3cueW91dHViZS5jb20vZW1iZWQvXCIgKyB2ICsgXCI/cmVsPTAmaGQ9MVwiIH0gdGl0bGU9XCJZb3VUdWJlIHZpZGVvIHBsYXllclwiIGFsbG93ZnVsbHNjcmVlbj48L2lmcmFtZT5cblx0XHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PC9kaXY+XG5cdFx0XHR9XG5cdFx0PC9kaXY+XG5cdH1cbn1cblxudGVtcGwgUHJvamVjdERlbW8ocCBQcm9qZWN0KSB7XG5cdGlmIHAuRGVtb1VybCAhPSBcIlwiIHtcblx0XHQ8ZGl2IGNsYXNzPXsgXCJtYXJrZG93bi1ib2R5IFwiICsgbWFya2Rvd25Cb2R5U3R5bGUoKSB9PlxuXHRcdFx0PGgyIGlkPVwicHJvamVjdC1kZW1vXCI+eyBkZW1vTGFiZWwocCkgfTwvaDI+XG5cdFx0XHRpZiBwLkRlbW9JbnN0cnVjdGlvbnMgIT0gXCJcIiB7XG5cdFx0XHRcdDxwPnsgcC5EZW1vSW5zdHJ1Y3Rpb25zIH08L3A+XG5cdFx0XHR9XG5cdFx0XHQ8ZGl2IGNsYXNzPXsgZGVtb1dyYXBwZXJDbGFzcyhwLkRlbW9IZWlnaHQpIH0+XG5cdFx0XHRcdDxpZnJhbWUgaWQ9XCJkZW1vXCIgc3JjPXsgcC5EZW1vVXJsIH0gdGl0bGU9eyBwLlRpdGxlICsgXCIgZGVtb1wiIH0gYWxsb3dmdWxsc2NyZWVuPjwvaWZyYW1lPlxuXHRcdFx0PC9kaXY+XG5cdFx0XHRpZiBwLkRlbW9GdWxsc2NyZWVuIHtcblx0XHRcdFx0PGJyLz5cblx0XHRcdFx0PGRpdiBjbGFzcz1cInRleHQtY2VudGVyXCI+XG5cdFx0XHRcdFx0PGJ1dHRvbiB0eXBlPVwiYnV0dG9uXCIgaWQ9XCJmdWxsc2NyZWVuXCIgY2xhc3M9eyBcImRvd25sb2FkLWJ0biBcIiArIGRvd25sb2FkQnRuU3R5bGUoKSB9IGRhdGEtYWN0aW9uPVwidG9nZ2xlLWZ1bGxzY3JlZW5cIj5cblx0XHRcdFx0XHRcdEBJY29uKFwiZXhwYW5kXCIsIFwiMXJlbVwiKVxuXHRcdFx0XHRcdFx0PHNwYW4+eyB0KFwicHJvamVjdC5mdWxsc2NyZWVuXCIpIH08L3NwYW4+XG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0fVxuXHRcdDwvZGl2PlxuXHR9XG59XG5cbnRlbXBsIFByb2plY3RMaW5rcyhsaW5rcyBbXVByb2plY3RMaW5rKSB7XG5cdGlmIGxlbihsaW5rcykgPiAwIHtcblx0XHQ8ZGl2IGNsYXNzPXsgXCJtYXJrZG93bi1ib2R5IFwiICsgbWFya2Rvd25Cb2R5U3R5bGUoKSB9PlxuXHRcdFx0PGgyIGlkPVwicHJvamVjdC1saW5rc1wiPnsgdChcInByb2plY3QubGlua3NcIikgfTwvaDI+XG5cdFx0XHQ8ZGl2IGNsYXNzPXsgXCJkb3dubG9hZC1idXR0b25zIFwiICsgZG93bmxvYWRCdXR0b25zU3R5bGUoKSB9PlxuXHRcdFx0XHRmb3IgXywgbGluayA6PSByYW5nZSBsaW5rcyB7XG5cdFx0XHRcdFx0PGEgaHJlZj17IGxpbmsuSHJlZiB9IHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyIG5vcmVmZXJyZXJcIiBjbGFzcz17IFwiZG93bmxvYWQtYnRuIFwiICsgZG93bmxvYWRCdG5TdHlsZSgpIH0+XG5cdFx0XHRcdFx0XHRASWNvbihsaW5rLkljb24sIFwiMXJlbVwiKVxuXHRcdFx0XHRcdFx0PHNwYW4+eyBsaW5rLlRpdGxlIH08L3NwYW4+XG5cdFx0XHRcdFx0PC9hPlxuXHRcdFx0XHR9XG5cdFx0XHQ8L2Rpdj5cblx0XHQ8L2Rpdj5cblx0fVxufVxuXG5jc3MgcHJvamVjdERldGFpbFN0eWxlKCkge1xuXHQmIC5wcm9qZWN0LXRpdGxlIHtcblx0XHRjb2xvcjogdmFyKC0tYWNjZW50KTtcblx0XHRmb250LXNpemU6IDEuNWVtO1xuXHRcdG1hcmdpbjogMCAwIDAuMDJlbSAwO1xuXHRcdGZvbnQtd2VpZ2h0OiBib2xkO1xuXHR9XG5cdCYgLnByb2plY3QtZGVzY3JpcHRpb24ge1xuXHRcdG1hcmdpbjogMCAwIDAuNWVtIDA7XG5cdFx0Y29sb3I6IHZhcigtLXRleHQtbGlnaHQpO1xuXHRcdGZvbnQtc2l6ZTogMS4yZW07XG5cdFx0bGluZS1oZWlnaHQ6IDEuNjtcblx0fVxuXHQmIC5wcm9qZWN0LXRhZ3Mge1xuXHRcdG1hcmdpbjogMC44ZW0gMDtcblx0XHRmb250LXNpemU6IDEuMWVtO1xuXHR9XG5cdCYgLnRleHQtY2VudGVyIHtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdH1cblx0JiAueW91dHViZS12aWRlbyB7XG5cdFx0bWFyZ2luOiAyMHB4IDA7XG5cdH1cblx0JiAuaWZyYW1lV3JhcHBlciB7XG5cdFx0cG9zaXRpb246IHJlbGF0aXZlO1xuXHRcdHBhZGRpbmctYm90dG9tOiA1Ni4yNSU7XG5cdFx0cGFkZGluZy10b3A6IDI1cHg7XG5cdFx0aGVpZ2h0OiAwO1xuXHR9XG5cdCYgLmlmcmFtZVdyYXBwZXIgaWZyYW1lIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0dG9wOiAwO1xuXHRcdGxlZnQ6IDA7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdFx0aGVpZ2h0OiAxMDAlO1xuXHRcdG1heC13aWR0aDogMTAwJTtcblx0XHRvdmVyZmxvdzogaGlkZGVuO1xuXHR9XG5cdCYgLmRlbW8taWZyYW1lLXdyYXBwZXIge1xuXHRcdHdpZHRoOiAxMDAlO1xuXHRcdG1hcmdpbjogMjBweCAwO1xuXHR9XG5cdCYgLmRlbW8taWZyYW1lLXdyYXBwZXIgaWZyYW1lIHtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRoZWlnaHQ6IDcwMHB4O1xuXHRcdG1heC13aWR0aDogMTAwJTtcblx0XHRib3JkZXI6IG5vbmU7XG5cdFx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0fVxufVxuXG50ZW1wbCBQcm9qZWN0RGV0YWlsKHYgVmlld1N0YXRlLCBjb21tZW50c0VuYWJsZWQgYm9vbCkge1xuXHRpZiB2LlN0YXR1cyA9PSBMb2FkTm90Rm91bmQge1xuXHRcdDxkaXYgY2xhc3M9eyBcImVycm9yLW1lc3NhZ2UgXCIgKyBlcnJvck1lc3NhZ2VTdHlsZSgpIH0+XG5cdFx0XHQ8aDE+eyB0KFwiZ2VuZXJhbC5wcm9qZWN0Tm90Rm91bmRcIikgfTwvaDE+XG5cdFx0XHQ8cD57IHQoXCJnZW5lcmFsLnByb2plY3ROb3RGb3VuZE1lc3NhZ2VcIikgfTwvcD5cblx0XHQ8L2Rpdj5cblx0fSBlbHNlIHtcblx0XHQ8ZGl2IGNsYXNzPXsgXCJwcm9qZWN0LWRldGFpbCBcIiArIHByb2plY3REZXRhaWxTdHlsZSgpIH0+XG5cdFx0XHQ8aDEgY2xhc3M9XCJwcm9qZWN0LXRpdGxlXCI+eyB2LlByb2ouVGl0bGUgfTwvaDE+XG5cdFx0XHQ8cCBjbGFzcz1cInByb2plY3QtZGVzY3JpcHRpb25cIj57IHYuUHJvai5EZXNjcmlwdGlvbiB9PC9wPlxuXHRcdFx0aWYgbGVuKHYuUHJvai5UYWdzKSA+IDAge1xuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwicHJvamVjdC10YWdzXCI+XG5cdFx0XHRcdFx0Zm9yIF8sIHRhZyA6PSByYW5nZSB2LlByb2ouVGFncyB7XG5cdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz17IFwiaXRlbS10YWcgY2xpY2thYmxlLXRhZyBcIiArIGl0ZW1UYWdTdHlsZSgpIH0gZGF0YS1zZWFyY2gtdGFnPXsgdGFnIH0+eyB0YWcgfTwvc3Bhbj5cblx0XHRcdFx0XHR9XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0fVxuXHRcdFx0QFRhYmxlT2ZDb250ZW50cyh2LlRPQylcblx0XHRcdEBQcm9qZWN0UmVhZG1lKHYpXG5cdFx0XHRAUHJvamVjdE1lZGlhKHYuUHJvai5Zb3V0dWJlVmlkZW9zKVxuXHRcdFx0QFByb2plY3REZW1vKHYuUHJvailcblx0XHRcdEBQcm9qZWN0TGlua3Modi5Qcm9qLkxpbmtzKVxuXHRcdFx0aWYgY29tbWVudHNFbmFibGVkIHtcblx0XHRcdFx0PGRpdiBjbGFzcz17IFwiZ2lzY3VzLWNvbnRhaW5lciBcIiArIGdpc2N1c1N0eWxlKCkgfT48L2Rpdj5cblx0XHRcdH1cblx0XHQ8L2Rpdj5cblx0fVxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImh0bWxcIlxuaW1wb3J0IFwic3RyY29udlwiXG5pbXBvcnQgXCJzdHJpbmdzXCJcbmltcG9ydCBcInRpbWVcIlxuXG4vLyDilIDilIAgTmF2YmFyIGhlbHBlcnMg4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmMgaXNBY3RpdmVSb3V0ZShyIFJvdXRlTWF0Y2gsIGtpbmQgUm91dGUsIHBhcmFtIHN0cmluZykgYm9vbCB7XG5cdHJldHVybiByLktpbmQgPT0ga2luZCAmJiByLlBhcmFtID09IHBhcmFtXG59XG5cbi8vIGNscyBhcHBlbmRzIGV4dHJhIHRvIGJhc2Ugd2hlbiBvbiBpcyB0cnVlLlxuZnVuYyBjbHMoYmFzZSBzdHJpbmcsIG9uIGJvb2wsIGV4dHJhIHN0cmluZykgc3RyaW5nIHtcblx0aWYgIW9uIHtcblx0XHRyZXR1cm4gYmFzZVxuXHR9XG5cdGlmIGJhc2UgPT0gXCJcIiB7XG5cdFx0cmV0dXJuIGV4dHJhXG5cdH1cblx0cmV0dXJuIGJhc2UgKyBcIiBcIiArIGV4dHJhXG59XG5cbi8vIOKUgOKUgCBCbG9nICYgcGFnaW5hdGlvbiBoZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jIHBhZ2luYXRlZFBvc3RzKGFsbFBvc3RzIFtdQmxvZ1Bvc3QsIHBhZ2UgaW50LCBwZXJQYWdlIGludCkgW11CbG9nUG9zdCB7XG5cdGlmIGxlbihhbGxQb3N0cykgPT0gMCB7XG5cdFx0cmV0dXJuIFtdQmxvZ1Bvc3R7fVxuXHR9XG5cdG9mZnNldCA6PSBwYWdlIC0gMVxuXHRzdGFydCA6PSBvZmZzZXQgKiBwZXJQYWdlXG5cdGlmIHN0YXJ0IDwgMCB8fCBzdGFydCA+PSBsZW4oYWxsUG9zdHMpIHtcblx0XHRzdGFydCA9IDBcblx0fVxuXHRlbmQgOj0gc3RhcnQgKyBwZXJQYWdlXG5cdGlmIGVuZCA+IGxlbihhbGxQb3N0cykge1xuXHRcdGVuZCA9IGxlbihhbGxQb3N0cylcblx0fVxuXHRyZXR1cm4gYWxsUG9zdHNbc3RhcnQ6ZW5kXVxufVxuXG5mdW5jIGNhbGNUb3RhbFBhZ2VzKHRvdGFsQ291bnQgaW50LCBwZXJQYWdlIGludCkgaW50IHtcblx0aWYgcGVyUGFnZSA8PSAwIHtcblx0XHRwZXJQYWdlID0gNVxuXHR9XG5cdG51bSA6PSB0b3RhbENvdW50ICsgcGVyUGFnZSAtIDFcblx0cmV0dXJuIG51bSAvIHBlclBhZ2Vcbn1cblxuLy8gcGFnZUhyZWYgcmV0dXJucyB0aGUgY2Fub25pY2FsIFVSTCBmb3IgYSBibG9nIHBhZ2U7IHBhZ2UgMSBpcyAvYmxvZy5cbmZ1bmMgcGFnZUhyZWYocGFnZSBpbnQpIHN0cmluZyB7XG5cdGlmIHBhZ2UgPD0gMSB7XG5cdFx0cmV0dXJuIFwiL2Jsb2dcIlxuXHR9XG5cdHJldHVybiBcIi9ibG9nL3BhZ2UvXCIgKyBzdHJjb252Lkl0b2EocGFnZSlcbn1cblxuLy8gcGFnZU51bWJlcnMgcmV0dXJucyAxLi5uIGZvciB0ZW1wbCByYW5nZSBsb29wcyAodGVtcGwgYGZvcmAgb25seSBzdXBwb3J0cyByYW5nZSkuXG5mdW5jIHBhZ2VOdW1iZXJzKG4gaW50KSBbXWludCB7XG5cdG51bXMgOj0gbWFrZShbXWludCwgMCwgbilcblx0Zm9yIGkgOj0gMTsgaSA8PSBuOyBpKysge1xuXHRcdG51bXMgPSBhcHBlbmQobnVtcywgaSlcblx0fVxuXHRyZXR1cm4gbnVtc1xufVxuXG4vLyDilIDilIAgUHJvamVjdCBoZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jIGRlbW9MYWJlbChwIFByb2plY3QpIHN0cmluZyB7XG5cdGlmIHAuRGVtb0xhYmVsICE9IFwiXCIge1xuXHRcdHJldHVybiBwLkRlbW9MYWJlbFxuXHR9XG5cdHJldHVybiB0KFwicHJvamVjdC5kZW1vXCIpXG59XG5cbmZ1bmMgZGVtb1dyYXBwZXJDbGFzcyhoZWlnaHQgc3RyaW5nKSBzdHJpbmcge1xuXHRpZiBoZWlnaHQgIT0gXCJcIiB7XG5cdFx0cmV0dXJuIFwiZGVtby1pZnJhbWUtd3JhcHBlclwiXG5cdH1cblx0cmV0dXJuIFwiaWZyYW1lV3JhcHBlclwiXG59XG5cbi8vIOKUgOKUgCBTZWFyY2ggaGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuYyBzZWFyY2hQbGFjZWhvbGRlclRleHQoKSBzdHJpbmcge1xuXHRpZiBzaXRlLlNlYXJjaC5QbGFjZWhvbGRlciAhPSBcIlwiIHtcblx0XHRyZXR1cm4gc2l0ZS5TZWFyY2guUGxhY2Vob2xkZXJcblx0fVxuXHRpZiByZXMgOj0gdChcInNlYXJjaC5wbGFjZWhvbGRlclwiKTsgcmVzICE9IFwic2VhcmNoLnBsYWNlaG9sZGVyXCIge1xuXHRcdHJldHVybiByZXNcblx0fVxuXHRyZXR1cm4gXCJTZWFyY2guLi5cIlxufVxuXG4vLyBoaWdobGlnaHRNYXRjaCB3cmFwcyB0aGUgZmlyc3QgY2FzZS1pbnNlbnNpdGl2ZSBvY2N1cnJlbmNlIG9mIHF1ZXJ5IGluIDxtYXJrPjsgYWxsIHRleHQgaXMgZXNjYXBlZC5cbmZ1bmMgaGlnaGxpZ2h0TWF0Y2godGV4dCBzdHJpbmcsIHF1ZXJ5IHN0cmluZykgc3RyaW5nIHtcblx0aWYgcXVlcnkgIT0gXCJcIiB7XG5cdFx0aWYgaWR4IDo9IHN0cmluZ3MuSW5kZXgoc3RyaW5ncy5Ub0xvd2VyKHRleHQpLCBzdHJpbmdzLlRvTG93ZXIocXVlcnkpKTsgaWR4ICE9IC0xIHtcblx0XHRcdGVuZCA6PSBpZHggKyBsZW4ocXVlcnkpXG5cdFx0XHRyZXR1cm4gaHRtbC5Fc2NhcGVTdHJpbmcodGV4dFs6aWR4XSkgKyBcIjxtYXJrPlwiICsgaHRtbC5Fc2NhcGVTdHJpbmcodGV4dFtpZHg6ZW5kXSkgKyBcIjwvbWFyaz5cIiArIGh0bWwuRXNjYXBlU3RyaW5nKHRleHRbZW5kOl0pXG5cdFx0fVxuXHR9XG5cdHJldHVybiBodG1sLkVzY2FwZVN0cmluZyh0ZXh0KVxufVxuXG4vLyDilIDilIAgQ29udGFjdCBoZWxwZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jIGZvcm1TdGF0dXNDbGFzcyhzdGF0dXNUeXBlIHN0cmluZykgc3RyaW5nIHtcblx0aWYgc3RhdHVzVHlwZSAhPSBcIlwiIHtcblx0XHRyZXR1cm4gXCJmb3JtLXN0YXR1cyBcIiArIHN0YXR1c1R5cGVcblx0fVxuXHRyZXR1cm4gXCJmb3JtLXN0YXR1c1wiXG59XG5cbi8vIOKUgOKUgCBGb290ZXIgaGVscGVycyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuZnVuYyBjdXJyZW50WWVhcigpIGludCB7XG5cdHJldHVybiB0aW1lLk5vdygpLlllYXIoKVxufVxuXG4iLCJwYWNrYWdlIG1haW5cblxuaW1wb3J0IFwianM6Li9icm93c2VyLmQudHNcIlxuaW1wb3J0IFwic3RyY29udlwiXG5pbXBvcnQgXCJzdHJpbmdzXCJcbmltcG9ydCBcInRpbWVcIlxuXG52YXIgY3VycmVudFBhdGggc3RyaW5nXG5cbmZ1bmMgc2Nyb2xsVG9IYXNoKGhhc2ggc3RyaW5nLCBzbW9vdGggYm9vbCkge1xuXHRpZiBoYXNoID09IFwiXCIge1xuXHRcdHJldHVyblxuXHR9XG5cdGlkIDo9IHN0cmluZ3MuVHJpbVByZWZpeChoYXNoLCBcIiNcIilcblx0aWYgaWQgPT0gXCJcIiB7XG5cdFx0cmV0dXJuXG5cdH1cblx0c2Nyb2xsIDo9IGZ1bmMoKSB7XG5cdFx0dGFyZ2V0RWwgOj0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpXG5cdFx0aWYgdGFyZ2V0RWwgIT0gbmlsIHtcblx0XHRcdGJlaGF2aW9yIDo9IFwiaW5zdGFudFwiXG5cdFx0XHRpZiBzbW9vdGgge1xuXHRcdFx0XHRiZWhhdmlvciA9IFwic21vb3RoXCJcblx0XHRcdH1cblx0XHRcdHRhcmdldEVsLnNjcm9sbEludG9WaWV3KG1hcFtzdHJpbmddYW55e1wiYmVoYXZpb3JcIjogYmVoYXZpb3J9KVxuXHRcdFx0aWYgaWQgPT0gXCJtYWluLWNvbnRlbnRcIiB7XG5cdFx0XHRcdHRhcmdldEVsLnNldEF0dHJpYnV0ZShcInRhYmluZGV4XCIsIFwiLTFcIilcblx0XHRcdFx0dGFyZ2V0RWwuZm9jdXMobWFwW3N0cmluZ11hbnl7XCJwcmV2ZW50U2Nyb2xsXCI6IHRydWV9KVxuXHRcdFx0fVxuXHRcdH1cblx0fVxuXHRzY3JvbGwoKVxuXHRpZiAhc21vb3RoIHtcblx0XHRzZXRUaW1lb3V0KHNjcm9sbCwgNTApXG5cdH1cbn1cblxuZnVuYyBuYXZpZ2F0ZSh1cmwgc3RyaW5nKSB7XG5cdGN1cnIgOj0gc3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5wYXRobmFtZSlcblx0aWYgd2luZG93LmxvY2F0aW9uLmhhc2ggIT0gbmlsICYmIHdpbmRvdy5sb2NhdGlvbi5oYXNoICE9IFwiXCIge1xuXHRcdGN1cnIgKz0gc3RyaW5nKHdpbmRvdy5sb2NhdGlvbi5oYXNoKVxuXHR9XG5cdGlmIHVybCAhPSBjdXJyIHtcblx0XHR3aW5kb3cuaGlzdG9yeS5wdXNoU3RhdGUobWFwW3N0cmluZ11hbnl7fSwgXCJcIiwgdXJsKVxuXHR9XG5cdGhhbmRsZVJvdXRlKClcbn1cblxuLy8gcGFyc2VSb3V0ZSBtYXBzIGEgVVJMIHBhdGggdG8gYSBSb3V0ZU1hdGNoLiBVbmtub3duIHBhdGhzIHJlc29sdmUgdG8gUm91dGVOb3RGb3VuZC5cbmZ1bmMgcGFyc2VSb3V0ZShwYXRoIHN0cmluZykgUm91dGVNYXRjaCB7XG5cdGlmIGxlbihwYXRoKSA+IDEge1xuXHRcdHBhdGggPSBzdHJpbmdzLlRyaW1TdWZmaXgocGF0aCwgXCIvXCIpXG5cdH1cblx0aWYgcGF0aCA9PSBcIlwiIHx8IHBhdGggPT0gXCIvXCIgfHwgcGF0aCA9PSBcIi9ibG9nXCIge1xuXHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlQmxvZywgUGFnZTogMX1cblx0fVxuXHRpZiByZXN0LCBvayA6PSBzdHJpbmdzLkN1dFByZWZpeChwYXRoLCBcIi9ibG9nL3BhZ2UvXCIpOyBvayB7XG5cdFx0biwgZXJyIDo9IHN0cmNvbnYuQXRvaShyZXN0KVxuXHRcdGlmIGVyciAhPSBuaWwgfHwgbiA8IDEge1xuXHRcdFx0biA9IDFcblx0XHR9XG5cdFx0cmV0dXJuIFJvdXRlTWF0Y2h7S2luZDogUm91dGVCbG9nLCBQYWdlOiBufVxuXHR9XG5cdGlmIHNsdWcsIG9rIDo9IHN0cmluZ3MuQ3V0UHJlZml4KHBhdGgsIFwiL2Jsb2cvXCIpOyBvayB7XG5cdFx0c2x1ZyA9IHN0cmluZ3MuVHJpbVByZWZpeChzbHVnLCBcInBvc3QvXCIpXG5cdFx0aWYgc2x1ZyA9PSBcIlwiIHtcblx0XHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlTm90Rm91bmR9XG5cdFx0fVxuXHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlUG9zdCwgUGFyYW06IHNsdWd9XG5cdH1cblx0aWYgaWQsIG9rIDo9IHN0cmluZ3MuQ3V0UHJlZml4KHBhdGgsIFwiL3Byb2plY3QvXCIpOyBvayB7XG5cdFx0aWYgaWQgPT0gXCJcIiB7XG5cdFx0XHRyZXR1cm4gUm91dGVNYXRjaHtLaW5kOiBSb3V0ZU5vdEZvdW5kfVxuXHRcdH1cblx0XHRyZXR1cm4gUm91dGVNYXRjaHtLaW5kOiBSb3V0ZVByb2plY3QsIFBhcmFtOiBpZH1cblx0fVxuXHRpZiBpZCwgb2sgOj0gc3RyaW5ncy5DdXRQcmVmaXgocGF0aCwgXCIvcGFnZS9cIik7IG9rIHtcblx0XHRpZiBpZCA9PSBcIlwiIHtcblx0XHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlTm90Rm91bmR9XG5cdFx0fVxuXHRcdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlUGFnZSwgUGFyYW06IGlkfVxuXHR9XG5cdHJldHVybiBSb3V0ZU1hdGNoe0tpbmQ6IFJvdXRlTm90Rm91bmR9XG59XG5cbmZ1bmMgaW5pdEluaXRpYWxSb3V0ZSgpIHtcblx0cGF0aCA6PSBzdHJWYWwod2luZG93LmxvY2F0aW9uLnBhdGhuYW1lKVxuXHRjdXJyZW50UGF0aCA9IHBhdGhcblx0cm91dGUgPSBwYXJzZVJvdXRlKHBhdGgpXG5cdHN3aXRjaCByb3V0ZS5LaW5kIHtcblx0Y2FzZSBSb3V0ZVBvc3Q6XG5cdFx0dmlldywgXyA9IHJlc29sdmVQb3N0KHJvdXRlLlBhcmFtLCBwb3N0cywgY29udGVudENhY2hlKVxuXHRjYXNlIFJvdXRlUHJvamVjdDpcblx0XHR2aWV3LCBfID0gcmVzb2x2ZVByb2plY3Qocm91dGUuUGFyYW0sIHByb2plY3RzLCBjb250ZW50Q2FjaGUpXG5cdGNhc2UgUm91dGVQYWdlOlxuXHRcdHZpZXcsIF8gPSByZXNvbHZlUGFnZShyb3V0ZS5QYXJhbSwgbmF2UGFnZXMsIGNvbnRlbnRDYWNoZSlcblx0ZGVmYXVsdDpcblx0XHR2aWV3ID0gbmV3Vmlld1N0YXRlKClcblx0fVxufVxuXG52YXIgaXNJbml0aWFsUm91dGUgPSB0cnVlXG5cbi8vIHJvdXRlU2VxIGlzIGJ1bXBlZCBvbiBldmVyeSBuYXZpZ2F0aW9uIHNvIGFuIGluLWZsaWdodCBsb2FkZXIgY2FuIHRlbGwgaXRcbi8vIGhhcyBiZWVuIHN1cGVyc2VkZWQgYW5kIG11c3Qgbm90IHRvdWNoIGB2aWV3YC5cbnZhciByb3V0ZVNlcSBpbnRcblxuLy8gYmVnaW5OYXZpZ2F0aW9uIGNsYWltcyB0aGUgbmV4dCByb3V0ZVNlcSBhbmQgcmV0dXJucyBhIGNoZWNrIHRoYXQgcmVwb3J0c1xuLy8gd2hldGhlciB0aGF0IG5hdmlnYXRpb24gaXMgc3RpbGwgdGhlIGxhdGVzdCBvbmUuXG5mdW5jIGJlZ2luTmF2aWdhdGlvbigpIGZ1bmMoKSBib29sIHtcblx0cm91dGVTZXErK1xuXHRzZXEgOj0gcm91dGVTZXFcblx0cmV0dXJuIGZ1bmMoKSBib29sIHsgcmV0dXJuIHNlcSA9PSByb3V0ZVNlcSB9XG59XG5cbmFzeW5jIGZ1bmMgaGFuZGxlUm91dGUoKSB7XG5cdGlzQ3VycmVudCA6PSBiZWdpbk5hdmlnYXRpb24oKVxuXHRyZXNldE92ZXJsYXlzKClcblxuXHQvLyBHaXRIdWIgUGFnZXMgc2VydmVzIDQwNC5odG1sIChhIGNvcHkgb2YgdGhlIGFwcCBzaGVsbCkgYXQgdGhlIG9yaWdpbmFsIFVSTCxcblx0Ly8gc28gdW5rbm93biBkZWVwIGxpbmtzIGFycml2ZSBoZXJlIHdpdGggdGhlaXIgcmVhbCBwYXRobmFtZSBpbnRhY3QuXG5cdHBhdGggOj0gd2luZG93LmxvY2F0aW9uLnBhdGhuYW1lXG5cblx0aWYgIWlzSW5pdGlhbFJvdXRlIHtcblx0XHRtYWluRWwgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNtYWluLWNvbnRlbnRcIilcblx0XHRpZiBtYWluRWwgIT0gbmlsIHtcblx0XHRcdG1haW5FbC5jbGFzc0xpc3QuYWRkKFwicGFnZS10cmFuc2l0aW9uLW91dFwiKVxuXHRcdFx0dGltZS5TbGVlcCgyMDAgKiB0aW1lLk1pbGxpc2Vjb25kKVxuXHRcdH1cblx0fVxuXHRpc0luaXRpYWxSb3V0ZSA9IGZhbHNlXG5cblx0Ly8gQSBuYXZpZ2F0aW9uIHRoYXQgc3RhcnRlZCBkdXJpbmcgdGhlIGZhZGUgb3ducyB0aGUgdmlldyBmcm9tIGhlcmUgb24uXG5cdGlmICFpc0N1cnJlbnQoKSB7XG5cdFx0cmV0dXJuXG5cdH1cblxuXHRjdXJyZW50UGF0aCA9IHBhdGhcblx0cm91dGUgPSBwYXJzZVJvdXRlKHBhdGgpXG5cdHZpZXcgPSBuZXdWaWV3U3RhdGUoKVxuXG5cdC8vIFJlc2V0IHNjcm9sbCB3aGlsZSB0aGUgb2xkIGNvbnRlbnQgaXMgZmFkZWQgb3V0LCBzbyB0aGUgbmV3IHJvdXRlIHBhaW50cyBhdCB0aGUgdG9wLlxuXHR3aW5kb3cuc2Nyb2xsVG8obWFwW3N0cmluZ11hbnl7XCJ0b3BcIjogMCwgXCJsZWZ0XCI6IDAsIFwiYmVoYXZpb3JcIjogXCJpbnN0YW50XCJ9KVxuXHRkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuc2Nyb2xsVG9wID0gMFxuXHRkb2N1bWVudC5ib2R5LnNjcm9sbFRvcCA9IDBcblxuXHRzd2l0Y2ggcm91dGUuS2luZCB7XG5cdGNhc2UgUm91dGVQb3N0OlxuXHRcdGF3YWl0IHNob3dQb3N0KHJvdXRlLlBhcmFtKVxuXHRjYXNlIFJvdXRlUHJvamVjdDpcblx0XHRhd2FpdCBzaG93UHJvamVjdChyb3V0ZS5QYXJhbSlcblx0Y2FzZSBSb3V0ZVBhZ2U6XG5cdFx0YXdhaXQgc2hvd1BhZ2Uocm91dGUuUGFyYW0pXG5cdGNhc2UgUm91dGVOb3RGb3VuZDpcblx0XHRzaG93Tm90Rm91bmQoKVxuXHRkZWZhdWx0OlxuXHRcdHNob3dCbG9nKHJvdXRlLlBhZ2UpXG5cdH1cblxuXHQvLyBUaGUgbG9hZGVyIG1heSBoYXZlIGF3YWl0ZWQgYSBmZXRjaCB3aGlsZSBhIG5ld2VyIG5hdmlnYXRpb24gdG9vayBvdmVyLlxuXHRpZiAhaXNDdXJyZW50KCkge1xuXHRcdHJldHVyblxuXHR9XG5cblx0bWFpbkVsIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjbWFpbi1jb250ZW50XCIpXG5cdGlmIG1haW5FbCAhPSBuaWwge1xuXHRcdG1haW5FbC5zZXRBdHRyaWJ1dGUoXCJ0YWJpbmRleFwiLCBcIi0xXCIpXG5cdFx0bWFpbkVsLmZvY3VzKG1hcFtzdHJpbmddYW55e1wicHJldmVudFNjcm9sbFwiOiB0cnVlfSlcblx0XHRzZXRUaW1lb3V0KGZ1bmMoKSB7XG5cdFx0XHRtYWluRWwucmVtb3ZlQXR0cmlidXRlKFwidGFiaW5kZXhcIilcblx0XHR9LCAxMDApXG5cdH1cblxuXHRoYXNoIDo9IHN0cmluZyh3aW5kb3cubG9jYXRpb24uaGFzaClcblx0aWYgaGFzaCAhPSBcIlwiIHtcblx0XHRzY3JvbGxUb0hhc2goaGFzaCwgZmFsc2UpXG5cdH1cbn1cblxuZnVuYyBzaG93QmxvZyhwYWdlIGludCkge1xuXHR0aXRsZSA6PSBzaXRlLlRpdGxlXG5cdGNhbm9uaWNhbCA6PSBcIi9ibG9nXCJcblx0aWYgcGFnZSA+IDEge1xuXHRcdHRpdGxlID0gdChcIm5hdi5ibG9nXCIpICsgXCIgLSBcIiArIHNpdGUuVGl0bGVcblx0XHRjYW5vbmljYWwgPSBcIi9ibG9nL3BhZ2UvXCIgKyBzdHJjb252Lkl0b2EocGFnZSlcblx0fVxuXHR1cGRhdGVSb3V0ZU1ldGEodGl0bGUsIHNpdGUuRGVzY3JpcHRpb24sIGNhbm9uaWNhbClcblx0cmVuZGVyUm91dGUoKVxufVxuXG5mdW5jIHNob3dOb3RGb3VuZCgpIHtcblx0dXBkYXRlUm91dGVNZXRhKHQoXCJnZW5lcmFsLm5vdEZvdW5kXCIpK1wiIC0gXCIrc2l0ZS5UaXRsZSwgdChcImdlbmVyYWwubm90Rm91bmRNZXNzYWdlXCIpLCBjdXJyZW50UGF0aClcblx0cmVuZGVyUm91dGUoKVxufVxuXG4vLyBsb2FkUm91dGUgZmV0Y2hlcyB1cmwsIHJlbmRlcnMgaXQgd2l0aCB0cmFuc2Zvcm0gYW5kIGNhY2hlcyB0aGUgcmVzdWx0IHVuZGVyXG4vLyBrZXkuIEl0IHJlcG9ydHMgd2hldGhlciB0aGUgcm91dGUgaXMgc3RpbGwgY3VycmVudDsgd2hlbiBzdXBlcnNlZGVkIGJ5IGFcbi8vIG5ld2VyIG5hdmlnYXRpb24gdGhlIGNhY2hlIGlzIGZpbGxlZCBidXQgdmlldyBpcyBsZWZ0IHVudG91Y2hlZC5cbmFzeW5jIGZ1bmMgbG9hZFJvdXRlKGtleSBzdHJpbmcsIHVybCBzdHJpbmcsIHRyYW5zZm9ybSBmdW5jKHN0cmluZykgY2FjaGVkQ29udGVudCkgYm9vbCB7XG5cdHNlcSA6PSByb3V0ZVNlcVxuXHRtZFRleHQsIGVyciA6PSBhd2FpdCBsb2FkTWFya2Rvd25GaWxlKHVybClcblx0aWYgZXJyID09IG5pbCB7XG5cdFx0Y29udGVudENhY2hlW2tleV0gPSB0cmFuc2Zvcm0obWRUZXh0KVxuXHR9XG5cdGlmIHNlcSAhPSByb3V0ZVNlcSB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0aWYgZXJyICE9IG5pbCB7XG5cdFx0dmlldy5TdGF0dXMgPSBMb2FkRmFpbGVkXG5cdFx0cmV0dXJuIHRydWVcblx0fVxuXHRjIDo9IGNvbnRlbnRDYWNoZVtrZXldXG5cdHZpZXcuSFRNTCA9IGMuSFRNTFxuXHR2aWV3LlRPQyA9IGMuVE9DXG5cdHZpZXcuU3RhdHVzID0gTG9hZFJlYWR5XG5cdHJldHVybiB0cnVlXG59XG5cbi8vIHJlbmRlclBvc3QgdHVybnMgYSBibG9nIG1hcmtkb3duIGZpbGUgaW50byBjYWNoZWQgY29udGVudC5cbmZ1bmMgcmVuZGVyUG9zdChtZFRleHQgc3RyaW5nKSBjYWNoZWRDb250ZW50IHtcblx0Y29udGVudCA6PSBzdHJpcEZyb250bWF0dGVyKG1kVGV4dClcblx0dG9jIDo9IGV4dHJhY3RUT0MoY29udGVudClcblx0cmV0dXJuIGNhY2hlZENvbnRlbnR7SFRNTDogaW5qZWN0SGVhZGluZ0lEcyhwYXJzZU1hcmtkb3duKGNvbnRlbnQpLCB0b2MpLCBUT0M6IHRvY31cbn1cblxuLy8gcmVuZGVyUmVhZG1lIHR1cm5zIGEgcHJvamVjdCBSRUFETUUgaW50byBjYWNoZWQgY29udGVudCB3aG9zZSBUT0MgYWxzb1xuLy8gY292ZXJzIHRoZSBNZWRpYS9EZW1vL0xpbmtzIHNlY3Rpb25zLlxuZnVuYyByZW5kZXJSZWFkbWUocCBQcm9qZWN0KSBmdW5jKHN0cmluZykgY2FjaGVkQ29udGVudCB7XG5cdHJldHVybiBmdW5jKG1kVGV4dCBzdHJpbmcpIGNhY2hlZENvbnRlbnQge1xuXHRcdHJldHVybiBjYWNoZWRDb250ZW50e1xuXHRcdFx0SFRNTDogaW5qZWN0SGVhZGluZ0lEcyhwYXJzZU1hcmtkb3duKG1kVGV4dCksIGV4dHJhY3RUT0MobWRUZXh0KSksXG5cdFx0XHRUT0M6ICBleHRyYWN0UHJvamVjdFRPQyhtZFRleHQsIHApLFxuXHRcdH1cblx0fVxufVxuXG5mdW5jIHJlbmRlclBhZ2UobWRUZXh0IHN0cmluZykgY2FjaGVkQ29udGVudCB7XG5cdHJldHVybiBjYWNoZWRDb250ZW50e0hUTUw6IHBhcnNlTWFya2Rvd24obWRUZXh0KSwgVE9DOiBbXVRPQ0l0ZW17fX1cbn1cblxuYXN5bmMgZnVuYyBzaG93UG9zdChzbHVnIHN0cmluZykge1xuXHR2LCBuZWVkc0ZldGNoIDo9IHJlc29sdmVQb3N0KHNsdWcsIHBvc3RzLCBjb250ZW50Q2FjaGUpXG5cdHZpZXcgPSB2XG5cdGlmIHZpZXcuU3RhdHVzID09IExvYWROb3RGb3VuZCB7XG5cdFx0dXBkYXRlUm91dGVNZXRhKHQoXCJnZW5lcmFsLmJsb2dOb3RGb3VuZFwiKStcIiAtIFwiK3NpdGUuVGl0bGUsIHQoXCJnZW5lcmFsLmJsb2dOb3RGb3VuZE1lc3NhZ2VcIiksIFwiL2Jsb2cvXCIrc2x1Zylcblx0XHRyZW5kZXJSb3V0ZSgpXG5cdFx0cmV0dXJuXG5cdH1cblxuXHR1cGRhdGVSb3V0ZU1ldGEodmlldy5Qb3N0LlRpdGxlK1wiIC0gXCIrc2l0ZS5UaXRsZSwgdmlldy5Qb3N0LkV4Y2VycHQsIHZpZXcuUG9zdC5IcmVmKVxuXHRpZiBuZWVkc0ZldGNoIHtcblx0XHRpZiAhYXdhaXQgbG9hZFJvdXRlKHZpZXcuUG9zdC5IcmVmLCBcIi9kYXRhL2Jsb2cvXCIrdmlldy5Qb3N0LkZpbGVuYW1lLCByZW5kZXJQb3N0KSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdH1cblx0cmVuZGVyUm91dGUoKVxuXHRpZiB2aWV3LlN0YXR1cyAhPSBMb2FkUmVhZHkge1xuXHRcdHJldHVyblxuXHR9XG5cdGhpZ2hsaWdodENvZGUoKVxuXHRsb2FkR2lzY3VzKClcbn1cblxuYXN5bmMgZnVuYyBzaG93UHJvamVjdChpZCBzdHJpbmcpIHtcblx0diwgbmVlZHNGZXRjaCA6PSByZXNvbHZlUHJvamVjdChpZCwgcHJvamVjdHMsIGNvbnRlbnRDYWNoZSlcblx0dmlldyA9IHZcblx0aWYgdmlldy5TdGF0dXMgPT0gTG9hZE5vdEZvdW5kIHtcblx0XHR1cGRhdGVSb3V0ZU1ldGEodChcImdlbmVyYWwucHJvamVjdE5vdEZvdW5kXCIpK1wiIC0gXCIrc2l0ZS5UaXRsZSwgdChcImdlbmVyYWwucHJvamVjdE5vdEZvdW5kTWVzc2FnZVwiKSwgXCIvcHJvamVjdC9cIitpZClcblx0XHRyZW5kZXJSb3V0ZSgpXG5cdFx0cmV0dXJuXG5cdH1cblxuXHR1cGRhdGVSb3V0ZU1ldGEodmlldy5Qcm9qLlRpdGxlK1wiIC0gXCIrc2l0ZS5UaXRsZSwgdmlldy5Qcm9qLkRlc2NyaXB0aW9uLCB2aWV3LlByb2ouSHJlZilcblx0aWYgbmVlZHNGZXRjaCB7XG5cdFx0aWYgIWF3YWl0IGxvYWRSb3V0ZSh2aWV3LlByb2ouSHJlZiwgcmVhZG1lVVJMKHZpZXcuUHJvaiwgc2l0ZS5HaXRodWJVc2VybmFtZSksIHJlbmRlclJlYWRtZSh2aWV3LlByb2opKSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdH1cblx0cmVuZGVyUm91dGUoKVxuXHRoaWdobGlnaHRDb2RlKClcblx0bG9hZEdpc2N1cygpXG59XG5cbmFzeW5jIGZ1bmMgc2hvd1BhZ2UoaWQgc3RyaW5nKSB7XG5cdHYsIG5lZWRzRmV0Y2ggOj0gcmVzb2x2ZVBhZ2UoaWQsIG5hdlBhZ2VzLCBjb250ZW50Q2FjaGUpXG5cdHZpZXcgPSB2XG5cdHVwZGF0ZVJvdXRlTWV0YSh2aWV3LlBhZ2UuVGl0bGUrXCIgLSBcIitzaXRlLlRpdGxlLCBzaXRlLkRlc2NyaXB0aW9uLCB2aWV3LlBhZ2UuSHJlZilcblx0aWYgbmVlZHNGZXRjaCB7XG5cdFx0aWYgIWF3YWl0IGxvYWRSb3V0ZSh2aWV3LlBhZ2UuSHJlZiwgXCIvZGF0YS9wYWdlcy9cIitpZCtcIi5tZFwiLCByZW5kZXJQYWdlKSB7XG5cdFx0XHRyZXR1cm5cblx0XHR9XG5cdH1cblx0cmVuZGVyUm91dGUoKVxuXHRoaWdobGlnaHRDb2RlKClcbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJqczouL2Jyb3dzZXIuZC50c1wiXG5pbXBvcnQgXCJzdHJpbmdzXCJcblxudmFyIGZ1c2VJbnN0YW5jZSBhbnlcbnZhciBzZWFyY2hEZWJvdW5jZVRpbWVyIGFueVxuXG5mdW5jIGluaXRTZWFyY2goKSB7XG5cdHZhciBzZWFyY2hJdGVtcyBbXWFueVxuXG5cdC8vIEluZGV4IHByb2plY3RzXG5cdGZvciBfLCBwIDo9IHJhbmdlIHByb2plY3RzIHtcblx0XHRpdGVtIDo9IG1hcFtzdHJpbmddYW55e1xuXHRcdFx0XCJpZFwiOiAgICAgICAgICBwLklELFxuXHRcdFx0XCJ0aXRsZVwiOiAgICAgICBwLlRpdGxlLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBwLkRlc2NyaXB0aW9uLFxuXHRcdFx0XCJ0YWdzXCI6ICAgICAgICBwLlRhZ3MsXG5cdFx0XHRcInR5cGVcIjogICAgICAgIFwicHJvamVjdFwiLFxuXHRcdFx0XCJ1cmxcIjogICAgICAgICBwLkhyZWYsXG5cdFx0fVxuXHRcdHNlYXJjaEl0ZW1zID0gYXBwZW5kKHNlYXJjaEl0ZW1zLCBpdGVtKVxuXHR9XG5cblx0Ly8gSW5kZXggYmxvZyBwb3N0c1xuXHRmb3IgXywgcCA6PSByYW5nZSBwb3N0cyB7XG5cdFx0aXRlbSA6PSBtYXBbc3RyaW5nXWFueXtcblx0XHRcdFwiaWRcIjogICAgICAgICAgcC5TbHVnLFxuXHRcdFx0XCJ0aXRsZVwiOiAgICAgICBwLlRpdGxlLFxuXHRcdFx0XCJkZXNjcmlwdGlvblwiOiBwLkV4Y2VycHQsXG5cdFx0XHRcInRhZ3NcIjogICAgICAgIHAuVGFncyxcblx0XHRcdFwidHlwZVwiOiAgICAgICAgXCJibG9nXCIsXG5cdFx0XHRcInVybFwiOiAgICAgICAgIHAuSHJlZixcblx0XHR9XG5cdFx0c2VhcmNoSXRlbXMgPSBhcHBlbmQoc2VhcmNoSXRlbXMsIGl0ZW0pXG5cdH1cblxuXHRvcHRpb25zIDo9IG1hcFtzdHJpbmddYW55e1xuXHRcdFwia2V5c1wiOiBbXWFueXtcblx0XHRcdG1hcFtzdHJpbmddYW55e1wibmFtZVwiOiBcInRpdGxlXCIsIFwid2VpZ2h0XCI6IDAuNH0sXG5cdFx0XHRtYXBbc3RyaW5nXWFueXtcIm5hbWVcIjogXCJkZXNjcmlwdGlvblwiLCBcIndlaWdodFwiOiAwLjN9LFxuXHRcdFx0bWFwW3N0cmluZ11hbnl7XCJuYW1lXCI6IFwidGFnc1wiLCBcIndlaWdodFwiOiAwLjJ9LFxuXHRcdH0sXG5cdFx0XCJ0aHJlc2hvbGRcIjogICAgICAgICAgMC40LFxuXHRcdFwibWluTWF0Y2hDaGFyTGVuZ3RoXCI6IHNlYXJjaE1pbkNoYXJzKCksXG5cdH1cblxuXHQvLyBHbyBoYXMgbm8gYG5ld2A7IEZ1c2UgaXMgYSBjbGFzcyBleHBvc2VkIG9uIHdpbmRvdyBieSB2ZW5kb3IuanNcblx0ZnVzZUluc3RhbmNlID0gUmVmbGVjdC5jb25zdHJ1Y3Qod2luZG93LkZ1c2UsIFtdYW55e3NlYXJjaEl0ZW1zLCBvcHRpb25zfSlcbn1cblxuZnVuYyBzZWFyY2hNaW5DaGFycygpIGludCB7XG5cdGlmIHNpdGUuU2VhcmNoLk1pbkNoYXJzID4gMCB7XG5cdFx0cmV0dXJuIHNpdGUuU2VhcmNoLk1pbkNoYXJzXG5cdH1cblx0cmV0dXJuIDJcbn1cblxuZnVuYyBwZXJmb3JtU2VhcmNoKHEgc3RyaW5nKSBbXVNlYXJjaFJlc3VsdEl0ZW0ge1xuXHR0cmltbWVkIDo9IHN0cmluZ3MuVHJpbVNwYWNlKHEpXG5cdGlmIGxlbih0cmltbWVkKSA8IHNlYXJjaE1pbkNoYXJzKCkgfHwgZnVzZUluc3RhbmNlID09IG5pbCB7XG5cdFx0cmV0dXJuIFtdU2VhcmNoUmVzdWx0SXRlbXt9XG5cdH1cblxuXHRyZXN1bHRzIDo9IGZ1c2VJbnN0YW5jZS5zZWFyY2godHJpbW1lZClcblx0b3V0IDo9IFtdU2VhcmNoUmVzdWx0SXRlbXt9XG5cdG1heFJlc3VsdHMgOj0gOFxuXHRpZiBsZW4ocmVzdWx0cykgPCBtYXhSZXN1bHRzIHtcblx0XHRtYXhSZXN1bHRzID0gbGVuKHJlc3VsdHMpXG5cdH1cblxuXHRmb3IgaSA6PSAwOyBpIDwgbWF4UmVzdWx0czsgaSsrIHtcblx0XHRyYXdJdGVtIDo9IHJlc3VsdHNbaV0uaXRlbVxuXHRcdHRhZ3MgOj0gW11zdHJpbmd7fVxuXHRcdGlmIHJhd0l0ZW0udGFncyAhPSBuaWwge1xuXHRcdFx0Zm9yIF8sIHQgOj0gcmFuZ2UgcmF3SXRlbS50YWdzIHtcblx0XHRcdFx0dGFncyA9IGFwcGVuZCh0YWdzLCBzdHJpbmcodCkpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0b3V0ID0gYXBwZW5kKG91dCwgU2VhcmNoUmVzdWx0SXRlbXtcblx0XHRcdElEOiAgICAgICAgICBzdHJpbmcocmF3SXRlbS5pZCksXG5cdFx0XHRUaXRsZTogICAgICAgc3RyaW5nKHJhd0l0ZW0udGl0bGUpLFxuXHRcdFx0RGVzY3JpcHRpb246IHN0cmluZyhyYXdJdGVtLmRlc2NyaXB0aW9uKSxcblx0XHRcdFRhZ3M6ICAgICAgICB0YWdzLFxuXHRcdFx0SXRlbVR5cGU6ICAgIHN0cmluZyhyYXdJdGVtLnR5cGUpLFxuXHRcdFx0VXJsOiAgICAgICAgIHN0cmluZyhyYXdJdGVtLnVybCksXG5cdFx0fSlcblx0fVxuXG5cdHJldHVybiBvdXRcbn1cblxudmFyIHNlYXJjaFNlbGVjdGVkSW5kZXggPSAtMVxuXG5mdW5jIHNjcm9sbFNlbGVjdGVkU2VhcmNoUmVzdWx0SW50b1ZpZXcoKSB7XG5cdGVsIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2VhcmNoLXJlc3VsdC1pdGVtLnNlbGVjdGVkXCIpXG5cdGlmIGVsICE9IG5pbCB7XG5cdFx0ZWwuc2Nyb2xsSW50b1ZpZXcobWFwW3N0cmluZ11hbnl7XCJibG9ja1wiOiBcIm5lYXJlc3RcIiwgXCJiZWhhdmlvclwiOiBcInNtb290aFwifSlcblx0fVxufVxuXG5mdW5jIHNlYXJjaFNlbGVjdE5leHQoKSB7XG5cdGlmIGxlbihzZWFyY2hSZXN1bHRzKSA9PSAwIHtcblx0XHRyZXR1cm5cblx0fVxuXHRzZWFyY2hTZWxlY3RlZEluZGV4Kytcblx0aWYgc2VhcmNoU2VsZWN0ZWRJbmRleCA+PSBsZW4oc2VhcmNoUmVzdWx0cykge1xuXHRcdHNlYXJjaFNlbGVjdGVkSW5kZXggPSAwXG5cdH1cblx0cmVuZGVyU2VhcmNoUmVzdWx0cygpXG5cdHNjcm9sbFNlbGVjdGVkU2VhcmNoUmVzdWx0SW50b1ZpZXcoKVxufVxuXG5mdW5jIHNlYXJjaFNlbGVjdFByZXYoKSB7XG5cdGlmIGxlbihzZWFyY2hSZXN1bHRzKSA9PSAwIHtcblx0XHRyZXR1cm5cblx0fVxuXHRzZWFyY2hTZWxlY3RlZEluZGV4LS1cblx0aWYgc2VhcmNoU2VsZWN0ZWRJbmRleCA8IDAge1xuXHRcdHNlYXJjaFNlbGVjdGVkSW5kZXggPSBsZW4oc2VhcmNoUmVzdWx0cykgLSAxXG5cdH1cblx0cmVuZGVyU2VhcmNoUmVzdWx0cygpXG5cdHNjcm9sbFNlbGVjdGVkU2VhcmNoUmVzdWx0SW50b1ZpZXcoKVxufVxuXG5mdW5jIHNlYXJjaEhhc1NlbGVjdGlvbigpIGJvb2wge1xuXHRyZXR1cm4gc2VhcmNoU2VsZWN0ZWRJbmRleCA+PSAwICYmIHNlYXJjaFNlbGVjdGVkSW5kZXggPCBsZW4oc2VhcmNoUmVzdWx0cylcbn1cblxuZnVuYyBzZWFyY2hPcGVuU2VsZWN0ZWQoKSB7XG5cdGlmIHNlYXJjaEhhc1NlbGVjdGlvbigpIHtcblx0XHR1cmwgOj0gc2VhcmNoUmVzdWx0c1tzZWFyY2hTZWxlY3RlZEluZGV4XS5Vcmxcblx0XHRjbG9zZVNlYXJjaCgpXG5cdFx0bmF2aWdhdGUodXJsKVxuXHR9XG59XG5cbmZ1bmMgcmVuZGVyU2VhcmNoUmVzdWx0cygpIHtcblx0ZWwgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzZWFyY2gtcGFnZS1yZXN1bHRzXCIpXG5cdGlmIGVsICE9IG5pbCB7XG5cdFx0Z29tLk1vdW50KFwiI3NlYXJjaC1wYWdlLXJlc3VsdHNcIiwgU2VhcmNoUmVzdWx0c0xpc3Qoc2VhcmNoUmVzdWx0cywgc2VhcmNoUXVlcnksIHNlYXJjaFNlbGVjdGVkSW5kZXgpKVxuXHR9XG59XG5cbi8vIHNldFNlYXJjaElucHV0IHdyaXRlcyB0aGUgaW5wdXQncyB2YWx1ZTsgaXQgaXMgdXNlci1vd25lZCBET00gc3RhdGUsIG5vdCBkZXJpdmVkLlxuZnVuYyBzZXRTZWFyY2hJbnB1dCh2IHN0cmluZykge1xuXHRpbnAgOj0gYXBwUmVmc1tcInNlYXJjaElucHV0XCJdXG5cdGlmIGlucCA9PSBuaWwgJiYgZG9jdW1lbnQgIT0gbmlsIHtcblx0XHRpbnAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NlYXJjaC1wYWdlLWlucHV0XCIpXG5cdH1cblx0aWYgaW5wICE9IG5pbCB7XG5cdFx0aW5wLnZhbHVlID0gdlxuXHR9XG59XG5cbi8vIHNldFNlYXJjaFF1ZXJ5IHVwZGF0ZXMgcXVlcnkgKyByZXN1bHRzIHRvZ2V0aGVyIGFuZCByZS1yZW5kZXJzIHRoZSBsaXN0LlxuZnVuYyBzZXRTZWFyY2hRdWVyeShxIHN0cmluZykge1xuXHRzZWFyY2hRdWVyeSA9IHFcblx0c2VhcmNoU2VsZWN0ZWRJbmRleCA9IC0xXG5cdHNlYXJjaFJlc3VsdHMgPSBwZXJmb3JtU2VhcmNoKHEpXG5cdHNldFNlYXJjaElucHV0KHEpXG5cdHJlbmRlclNlYXJjaFJlc3VsdHMoKVxufVxuXG5mdW5jIG9wZW5TZWFyY2goKSB7XG5cdG9wZW5TZWFyY2hXaXRoVGFnKFwiXCIpXG59XG5cbi8vIG9wZW5TZWFyY2hXaXRoVGFnIHJlc2V0cyB0aGUgcXVlcnkgb24gb3BlbiAobm90IG9uIGNsb3NlKSBzbyB0aGUgcmVzdWx0c1xuLy8gZG9uJ3QgdmFuaXNoIHdoaWxlIHRoZSBvdmVybGF5IGlzIHN0aWxsIGZhZGluZyBvdXQuXG5mdW5jIG9wZW5TZWFyY2hXaXRoVGFnKHRhZyBzdHJpbmcpIHtcblx0Y2xvc2VNZW51cygpXG5cdHNlYXJjaE9wZW4gPSB0cnVlXG5cdHNldFNlYXJjaFF1ZXJ5KHRhZylcblx0c3luY092ZXJsYXlzKClcblx0Zm9jdXNMYXRlcihcIiNzZWFyY2gtcGFnZS1pbnB1dFwiKVxufVxuXG5mdW5jIGNsZWFyU2VhcmNoKCkge1xuXHRzZXRTZWFyY2hRdWVyeShcIlwiKVxuXHRzeW5jT3ZlcmxheXMoKVxuXHRmb2N1c0xhdGVyKFwiI3NlYXJjaC1wYWdlLWlucHV0XCIpXG59XG5cbi8vIGNsb3NlU2VhcmNoIGhpZGVzIHRoZSBvdmVybGF5OyB0aGUgZXhpdCBmYWRlIGlzIENTUy1vbmx5ICgjc2VhcmNoLXBhZ2UgdHJhbnNpdGlvbikuXG5mdW5jIGNsb3NlU2VhcmNoKCkge1xuXHRpZiAhc2VhcmNoT3BlbiB7XG5cdFx0cmV0dXJuXG5cdH1cblx0c2VhcmNoT3BlbiA9IGZhbHNlXG5cdHN5bmNPdmVybGF5cygpXG59XG5cbmZ1bmMgaGFuZGxlU2VhcmNoSW5wdXQodmFsdWUgc3RyaW5nKSB7XG5cdHNlYXJjaFF1ZXJ5ID0gdmFsdWVcblx0c2VhcmNoU2VsZWN0ZWRJbmRleCA9IC0xXG5cdHN5bmNPdmVybGF5cygpXG5cdGlmIHNlYXJjaERlYm91bmNlVGltZXIgIT0gbmlsIHtcblx0XHRjbGVhclRpbWVvdXQoc2VhcmNoRGVib3VuY2VUaW1lcilcblx0fVxuXHRzZWFyY2hEZWJvdW5jZVRpbWVyID0gc2V0VGltZW91dChmdW5jKCkge1xuXHRcdHNlYXJjaFJlc3VsdHMgPSBwZXJmb3JtU2VhcmNoKHNlYXJjaFF1ZXJ5KVxuXHRcdHJlbmRlclNlYXJjaFJlc3VsdHMoKVxuXHR9LCAxNTApXG59XG4iLCJwYWNrYWdlIG1haW5cblxudGVtcGwgU2VhcmNoUmVzdWx0c0xpc3QocmVzdWx0cyBbXVNlYXJjaFJlc3VsdEl0ZW0sIHF1ZXJ5IHN0cmluZywgc2VsZWN0ZWRJbmRleCBpbnQpIHtcblx0aWYgcXVlcnkgIT0gXCJcIiAmJiBsZW4ocmVzdWx0cykgPT0gMCB7XG5cdFx0PGRpdiBjbGFzcz1cInNlYXJjaC1uby1yZXN1bHRzXCI+XG5cdFx0XHRASWNvbihcInNlYXJjaFwiLCBcIjNyZW1cIilcblx0XHRcdDxwPnsgdChcInNlYXJjaC5ub1Jlc3VsdHNcIikgfTwvcD5cblx0XHQ8L2Rpdj5cblx0fSBlbHNlIHtcblx0XHRmb3IgaSwgaXRlbSA6PSByYW5nZSByZXN1bHRzIHtcblx0XHRcdDxhcnRpY2xlIGNsYXNzPXsgY2xzKFwic2VhcmNoLXJlc3VsdC1pdGVtIGJsb2ctcG9zdC1jYXJkIFwiICsgYmxvZ0NhcmRTdHlsZSgpLCBpID09IHNlbGVjdGVkSW5kZXgsIFwic2VsZWN0ZWRcIikgfSBkYXRhLWFjdGlvbj1cIm9wZW4tcG9zdFwiIGRhdGEtaHJlZj17IGl0ZW0uVXJsIH0+XG5cdFx0XHRcdDxoMiBjbGFzcz1cImJsb2ctcG9zdC10aXRsZVwiPlxuXHRcdFx0XHRcdDxhIGhyZWY9eyBpdGVtLlVybCB9IGRhdGEtYWN0aW9uPVwibmF2XCI+QHRlbXBsLlJhdyhoaWdobGlnaHRNYXRjaChpdGVtLlRpdGxlLCBxdWVyeSkpPC9hPlxuXHRcdFx0XHQ8L2gyPlxuXHRcdFx0XHQ8ZGl2IGNsYXNzPVwiYmxvZy1wb3N0LW1ldGFcIj5cblx0XHRcdFx0XHQ8c3BhbiBjbGFzcz1cImJsb2ctcG9zdC10YWdzXCI+XG5cdFx0XHRcdFx0XHRpZiBpdGVtLkl0ZW1UeXBlID09IFwicHJvamVjdFwiIHtcblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9eyBcIml0ZW0tdGFnIFwiICsgaXRlbVRhZ1N0eWxlKCkgfT57IHQoXCJiYWRnZXMucHJvamVjdFwiKSB9PC9zcGFuPlxuXHRcdFx0XHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0XHRcdFx0PHNwYW4gY2xhc3M9eyBcIml0ZW0tdGFnIFwiICsgaXRlbVRhZ1N0eWxlKCkgfT57IHQoXCJiYWRnZXMuYmxvZ1wiKSB9PC9zcGFuPlxuXHRcdFx0XHRcdFx0fVxuXHRcdFx0XHRcdFx0Zm9yIF8sIHRhZyA6PSByYW5nZSBpdGVtLlRhZ3Mge1xuXHRcdFx0XHRcdFx0XHQ8c3BhbiBjbGFzcz17IFwiaXRlbS10YWcgXCIgKyBpdGVtVGFnU3R5bGUoKSB9PnsgdGFnIH08L3NwYW4+XG5cdFx0XHRcdFx0XHR9XG5cdFx0XHRcdFx0PC9zcGFuPlxuXHRcdFx0XHQ8L2Rpdj5cblx0XHRcdFx0PHAgY2xhc3M9XCJibG9nLXBvc3QtZXhjZXJwdFwiPkB0ZW1wbC5SYXcoaGlnaGxpZ2h0TWF0Y2goaXRlbS5EZXNjcmlwdGlvbiwgcXVlcnkpKTwvcD5cblx0XHRcdDwvYXJ0aWNsZT5cblx0XHR9XG5cdH1cbn1cblxuY3NzIHNlYXJjaE1vZGFsU3R5bGUoKSB7XG5cdGRpc3BsYXk6IGZsZXg7XG5cdHBvc2l0aW9uOiBmaXhlZDtcblx0dG9wOiAwO1xuXHRsZWZ0OiAwO1xuXHRyaWdodDogMDtcblx0Ym90dG9tOiAwO1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcblx0ei1pbmRleDogMjAwMDtcblx0ZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblx0b3ZlcmZsb3c6IGhpZGRlbjtcblx0dmlzaWJpbGl0eTogaGlkZGVuO1xuXHRvcGFjaXR5OiAwO1xuXHR0cmFuc2Zvcm06IHNjYWxlKDAuOTUpO1xuXHR0cmFuc2l0aW9uOlxuXHRcdG9wYWNpdHkgMC4ycyBlYXNlLWluLFxuXHRcdHRyYW5zZm9ybSAwLjJzIGVhc2UtaW4sXG5cdFx0dmlzaWJpbGl0eSAwcyBsaW5lYXIgMC4ycztcblxuXHQmLnNob3cge1xuXHRcdHZpc2liaWxpdHk6IHZpc2libGU7XG5cdFx0b3BhY2l0eTogMTtcblx0XHR0cmFuc2Zvcm06IHNjYWxlKDEpO1xuXHRcdHRyYW5zaXRpb246XG5cdFx0XHRvcGFjaXR5IDAuMjVzIGVhc2Utb3V0LFxuXHRcdFx0dHJhbnNmb3JtIDAuMjVzIGVhc2Utb3V0LFxuXHRcdFx0dmlzaWJpbGl0eSAwcztcblx0fVxuXG5cdCYgLnNlYXJjaC1wYWdlLWhlYWRlciB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRcdGhlaWdodDogNTZweDtcblx0XHRwYWRkaW5nOiAwIDFyZW07XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0taGVhZGVyLWNvbG9yKTtcblx0XHRib3JkZXItYm90dG9tOiB2YXIoLS1ib3JkZXItd2lkdGgpIHNvbGlkIHZhcigtLWFjY2VudCk7XG5cdFx0dHJhbnNpdGlvbjpcblx0XHRcdGJhY2tncm91bmQtY29sb3IgdmFyKC0tdGhlbWUtdHJhbnNpdGlvbi1kdXJhdGlvbikgdmFyKC0tdGhlbWUtdHJhbnNpdGlvbi10aW1pbmcpLFxuXHRcdFx0Y29sb3IgdmFyKC0tdGhlbWUtdHJhbnNpdGlvbi1kdXJhdGlvbikgdmFyKC0tdGhlbWUtdHJhbnNpdGlvbi10aW1pbmcpLFxuXHRcdFx0Ym9yZGVyLWNvbG9yIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tZHVyYXRpb24pIHZhcigtLXRoZW1lLXRyYW5zaXRpb24tdGltaW5nKTtcblx0fVxuXG5cdCYuc2hvdyAuc2VhcmNoLXBhZ2UtaGVhZGVyIHtcblx0XHRhbmltYXRpb246IHNsaWRlRG93biB2YXIoLS10cmFuc2l0aW9uLW5vcm1hbCkgZWFzZS1vdXQ7XG5cdH1cblxuXHQmIC5zZWFyY2gtcGFnZS1oZWFkZXItY29udGVudCB7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdGdhcDogMC43NXJlbTtcblx0XHR3aWR0aDogMTAwJTtcblx0XHRtYXgtd2lkdGg6IDkwMHB4O1xuXHR9XG5cblx0JiAuc2VhcmNoLXBhZ2UtYmFjayB7XG5cdFx0YmFja2dyb3VuZDogbm9uZTtcblx0XHRib3JkZXI6IG5vbmU7XG5cdFx0Y29sb3I6IHZhcigtLWZvbnQtY29sb3IpO1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0XHRwYWRkaW5nOiAwLjVyZW07XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRcdGZvbnQtc2l6ZTogMS4yZW07XG5cdFx0dHJhbnNpdGlvbjogY29sb3IgdmFyKC0tdHJhbnNpdGlvbi1mYXN0KTtcblx0fVxuXG5cdCYgLnNlYXJjaC1wYWdlLWJhY2s6aG92ZXIge1xuXHRcdGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHR9XG5cblx0JiAuc2VhcmNoLXBhZ2UtaW5wdXQtd3JhcHBlciB7XG5cdFx0ZmxleDogMTtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRhbGlnbi1pdGVtczogY2VudGVyO1xuXHR9XG5cblx0JiAuc2VhcmNoLXBhZ2UtaW5wdXQge1xuXHRcdHdpZHRoOiAxMDAlO1xuXHRcdHBhZGRpbmc6IDAuNXJlbSAyLjVyZW0gMC41cmVtIDFyZW07XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItY29sb3IpO1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XG5cdFx0Ym9yZGVyLXJhZGl1czogMjBweDtcblx0XHRjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XG5cdFx0Zm9udC1zaXplOiAxZW07XG5cdH1cblxuXHQmIC5zZWFyY2gtcGFnZS1pbnB1dDo6LXdlYmtpdC1zZWFyY2gtY2FuY2VsLWJ1dHRvbiB7XG5cdFx0LXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuXHRcdGFwcGVhcmFuY2U6IG5vbmU7XG5cdH1cblxuXHQmIC5zZWFyY2gtcGFnZS1pbnB1dDpmb2N1cyB7XG5cdFx0b3V0bGluZTogbm9uZTtcblx0XHRib3JkZXItY29sb3I6IHZhcigtLWFjY2VudCk7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XG5cdFx0Ym94LXNoYWRvdzogMCAwIDAgM3B4IHZhcigtLWFjY2VudC1nbG93KTtcblx0fVxuXG5cdCYgLnNlYXJjaC1wYWdlLWNsZWFyIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0cmlnaHQ6IDAuNXJlbTtcblx0XHRiYWNrZ3JvdW5kOiBub25lO1xuXHRcdGJvcmRlcjogbm9uZTtcblx0XHRjb2xvcjogdmFyKC0tdGV4dC1saWdodCk7XG5cdFx0Y3Vyc29yOiBwb2ludGVyO1xuXHRcdHBhZGRpbmc6IDAuMjVyZW0gMC41cmVtO1xuXHRcdGRpc3BsYXk6IG5vbmU7XG5cdFx0dHJhbnNpdGlvbjogY29sb3IgdmFyKC0tdHJhbnNpdGlvbi1mYXN0KTtcblx0fVxuXG5cdCYgLnNlYXJjaC1wYWdlLWNsZWFyOmhvdmVyIHtcblx0XHRjb2xvcjogdmFyKC0tYWNjZW50KTtcblx0fVxuXG5cdCYgLnNlYXJjaC1wYWdlLWNsZWFyLnNob3cge1xuXHRcdGRpc3BsYXk6IGJsb2NrO1xuXHR9XG5cblx0JiAuc2VhcmNoLXBhZ2UtY29udGVudCB7XG5cdFx0ZmxleDogMTtcblx0XHRvdmVyZmxvdy15OiBhdXRvO1xuXHRcdHBhZGRpbmc6IDFyZW07XG5cdFx0ZGlzcGxheTogZmxleDtcblx0XHRqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcblx0fVxuXG5cdCYuc2hvdyAuc2VhcmNoLXBhZ2UtY29udGVudCB7XG5cdFx0YW5pbWF0aW9uOiBmYWRlSW4gMC40cyBlYXNlLW91dCAwLjFzIGJvdGg7XG5cdH1cblxuXHQmIC5zZWFyY2gtcGFnZS1yZXN1bHRzIHtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cdFx0Z2FwOiAxLjVyZW07XG5cdFx0d2lkdGg6IDEwMCU7XG5cdFx0bWF4LXdpZHRoOiA5MDBweDtcblx0XHR0ZXh0LWFsaWduOiBsZWZ0O1xuXHR9XG5cblx0JiAuc2VhcmNoLXJlc3VsdC1pdGVtLnNlbGVjdGVkIHtcblx0XHRib3JkZXItY29sb3I6IHZhcigtLWFjY2VudCk7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItY29sb3IpO1xuXHRcdGJveC1zaGFkb3c6XG5cdFx0XHQwIDAgMCAxcHggdmFyKC0tYWNjZW50KSxcblx0XHRcdDAgMCAxNXB4IHZhcigtLWFjY2VudC1nbG93KTtcblx0fVxuXG5cdCYgLnNlYXJjaC1uby1yZXN1bHRzIHtcblx0XHRwYWRkaW5nOiB2YXIoLS1zcGFjaW5nLXhsKTtcblx0XHR0ZXh0LWFsaWduOiBjZW50ZXI7XG5cdFx0Y29sb3I6IHZhcigtLXRleHQtbGlnaHQpO1xuXHR9XG5cblx0JiAuc2VhcmNoLW5vLXJlc3VsdHMgcCB7XG5cdFx0bWFyZ2luOiAwO1xuXHRcdGZvbnQtc2l6ZTogMC45ZW07XG5cdH1cbn1cblxudGVtcGwgU2VhcmNoTW9kYWwob3BlbiBib29sLCBxdWVyeSBzdHJpbmcsIHJlc3VsdHMgW11TZWFyY2hSZXN1bHRJdGVtLCBzZWxlY3RlZEluZGV4IGludCwgcGxhY2Vob2xkZXIgc3RyaW5nKSB7XG5cdDxkaXYgaWQ9XCJzZWFyY2gtcGFnZVwiIGNsYXNzPXsgY2xzKHNlYXJjaE1vZGFsU3R5bGUoKSwgb3BlbiwgXCJzaG93XCIpIH0gcm9sZT1cImRpYWxvZ1wiIGFyaWEtbW9kYWw9XCJ0cnVlXCIgYXJpYS1sYWJlbD17IHQoXCJhcmlhLnNlYXJjaFwiKSB9PlxuXHRcdDxkaXYgY2xhc3M9XCJzZWFyY2gtcGFnZS1oZWFkZXJcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJzZWFyY2gtcGFnZS1oZWFkZXItY29udGVudFwiPlxuXHRcdFx0XHQ8YnV0dG9uIHR5cGU9XCJidXR0b25cIiBjbGFzcz1cInNlYXJjaC1wYWdlLWJhY2tcIiBpZD1cInNlYXJjaC1wYWdlLWJhY2tcIiBhcmlhLWxhYmVsPXsgdChcImFyaWEuZ29CYWNrXCIpIH0gZGF0YS1hY3Rpb249XCJjbG9zZS1zZWFyY2hcIj5cblx0XHRcdFx0XHRASWNvbihcImFycm93LWxlZnRcIiwgXCIxLjJyZW1cIilcblx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDxkaXYgY2xhc3M9XCJzZWFyY2gtcGFnZS1pbnB1dC13cmFwcGVyXCI+XG5cdFx0XHRcdFx0PGlucHV0IHJlZj1cInNlYXJjaElucHV0XCIgdHlwZT1cInNlYXJjaFwiIGlkPVwic2VhcmNoLXBhZ2UtaW5wdXRcIiBjbGFzcz1cInNlYXJjaC1wYWdlLWlucHV0XCIgcGxhY2Vob2xkZXI9eyBwbGFjZWhvbGRlciB9IGF1dG9jb21wbGV0ZT1cIm9mZlwiIGFyaWEtbGFiZWw9eyB0KFwiYXJpYS5zZWFyY2hcIikgfSB2YWx1ZT17IHF1ZXJ5IH0vPlxuXHRcdFx0XHRcdDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPXsgY2xzKFwic2VhcmNoLXBhZ2UtY2xlYXJcIiwgcXVlcnkgIT0gXCJcIiwgXCJzaG93XCIpIH0gaWQ9XCJzZWFyY2gtcGFnZS1jbGVhclwiIGFyaWEtbGFiZWw9eyB0KFwiYXJpYS5jbGVhclNlYXJjaFwiKSB9IGRhdGEtYWN0aW9uPVwiY2xlYXItc2VhcmNoXCI+XG5cdFx0XHRcdFx0XHRASWNvbihcInRpbWVzXCIsIFwiMS4ycmVtXCIpXG5cdFx0XHRcdFx0PC9idXR0b24+XG5cdFx0XHRcdDwvZGl2PlxuXHRcdFx0PC9kaXY+XG5cdFx0PC9kaXY+XG5cdFx0PGRpdiBjbGFzcz1cInNlYXJjaC1wYWdlLWNvbnRlbnRcIj5cblx0XHRcdDxkaXYgY2xhc3M9XCJzZWFyY2gtcGFnZS1yZXN1bHRzXCIgaWQ9XCJzZWFyY2gtcGFnZS1yZXN1bHRzXCI+XG5cdFx0XHRcdEBTZWFyY2hSZXN1bHRzTGlzdChyZXN1bHRzLCBxdWVyeSwgc2VsZWN0ZWRJbmRleClcblx0XHRcdDwvZGl2PlxuXHRcdDwvZGl2PlxuXHQ8L2Rpdj5cbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJlcnJvcnNcIlxuaW1wb3J0IFwianM6Li9icm93c2VyLmQudHNcIlxuaW1wb3J0IFwic2xpY2VzXCJcbmltcG9ydCBcInN0cmluZ3NcIlxuXG4vLyDilIDilIAgR2xvYmFsIEFwcGxpY2F0aW9uIFN0YXRlIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG52YXIgc2l0ZSA9IFNpdGVDb25maWd7XG5cdFNvY2lhbDogW11Tb2NpYWxMaW5re30sXG59XG52YXIgcG9zdHMgPSBbXUJsb2dQb3N0e31cbnZhciBwcm9qZWN0cyA9IFtdUHJvamVjdHt9XG52YXIgbmF2UGFnZXMgPSBbXU5hdlBhZ2V7fVxudmFyIHRyYW5zbGF0aW9ucyA9IG1hcFtzdHJpbmddc3RyaW5ne31cbnZhciByb3V0ZSA9IFJvdXRlTWF0Y2h7UGFnZTogMX0gLy8gemVybyBLaW5kID09IFJvdXRlQmxvZ1xudmFyIGN1cnJlbnRUaGVtZSA9IFwiZGFya1wiXG52YXIgbW9iaWxlTWVudU9wZW4gYm9vbFxudmFyIHByb2plY3RzRHJvcGRvd25PcGVuIGJvb2xcbnZhciBzZWFyY2hPcGVuIGJvb2xcbnZhciBzZWFyY2hRdWVyeSBzdHJpbmdcbnZhciBzZWFyY2hSZXN1bHRzID0gW11TZWFyY2hSZXN1bHRJdGVte31cbnZhciBjb250YWN0T3BlbiBib29sXG52YXIgY29udGFjdEZvcm0gQ29udGFjdFN0YXRlXG5cbi8vIFJvdXRlIHZpZXcgc3RhdGU7IG1haW4oKSBhbmQgaGFuZGxlUm91dGUgYXNzaWduIG5ld1ZpZXdTdGF0ZSgpLiBOb3QgaW5pdGlhbGlzZWRcbi8vIGhlcmU6IGdsb2JhbHMgYXJlIGVtaXR0ZWQgaW4gZmlsZSBvcmRlciwgc28gTG9hZFJlYWR5ICh0eXBlcy5nbykgd291bGQgYmUgaW4gVERaLlxudmFyIHZpZXcgVmlld1N0YXRlXG5cbi8vIFJlbmRlcmVkIHJvdXRlIGNvbnRlbnQga2V5ZWQgYnkgcm91dGUgcGF0aCAoL2Jsb2cvPHNsdWc+LCAvcHJvamVjdC88aWQ+LCAvcGFnZS88aWQ+KS5cbnZhciBjb250ZW50Q2FjaGUgPSBtYXBbc3RyaW5nXWNhY2hlZENvbnRlbnR7fVxuXG4vLyDilIDilIAgVHJhbnNsYXRpb24gSGVscGVyIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG5mdW5jIHQoa2V5IHN0cmluZykgc3RyaW5nIHtcblx0aWYgdmFsLCBvayA6PSB0cmFuc2xhdGlvbnNba2V5XTsgb2sgJiYgdmFsICE9IFwiXCIge1xuXHRcdHJldHVybiB2YWxcblx0fVxuXHRyZXR1cm4ga2V5XG59XG5cbi8vIOKUgOKUgCBNZXRhIFRhZ3MgVXBkYXRlciDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxuLy8gaGVhZEVsIHJldHVybnMgdGhlIDxoZWFkPiBlbGVtZW50IG1hdGNoaW5nIHRhZ1thdHRyPVwibmFtZVwiXSwgY3JlYXRpbmcgaXQgaWYgbWlzc2luZy5cbmZ1bmMgaGVhZEVsKHRhZyBzdHJpbmcsIGF0dHIgc3RyaW5nLCBuYW1lIHN0cmluZykgYW55IHtcblx0ZWwgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0YWcgKyBcIltcIiArIGF0dHIgKyBcIj1cXFwiXCIgKyBuYW1lICsgXCJcXFwiXVwiKVxuXHRpZiBlbCA9PSBuaWwge1xuXHRcdGVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCh0YWcpXG5cdFx0ZWwuc2V0QXR0cmlidXRlKGF0dHIsIG5hbWUpXG5cdFx0ZG9jdW1lbnQuaGVhZC5hcHBlbmRDaGlsZChlbClcblx0fVxuXHRyZXR1cm4gZWxcbn1cblxuLy8gdXBkYXRlTWV0YSBzZXRzIDxtZXRhIGF0dHI9XCJuYW1lXCIgY29udGVudD12YWx1ZT47IGF0dHIgaXMgXCJuYW1lXCIgb3IgXCJwcm9wZXJ0eVwiLlxuZnVuYyB1cGRhdGVNZXRhKGF0dHIgc3RyaW5nLCBuYW1lIHN0cmluZywgdmFsdWUgc3RyaW5nKSB7XG5cdGlmIHZhbHVlID09IFwiXCIge1xuXHRcdHJldHVyblxuXHR9XG5cdGhlYWRFbChcIm1ldGFcIiwgYXR0ciwgbmFtZSkuc2V0QXR0cmlidXRlKFwiY29udGVudFwiLCB2YWx1ZSlcbn1cblxuZnVuYyB1cGRhdGVUaXRsZU1ldGEodGl0bGUgc3RyaW5nKSB7XG5cdGlmIHRpdGxlID09IFwiXCIge1xuXHRcdHJldHVyblxuXHR9XG5cdGRvY3VtZW50LnRpdGxlID0gdGl0bGVcblx0dXBkYXRlTWV0YShcInByb3BlcnR5XCIsIFwib2c6dGl0bGVcIiwgdGl0bGUpXG5cdHVwZGF0ZU1ldGEoXCJwcm9wZXJ0eVwiLCBcInR3aXR0ZXI6dGl0bGVcIiwgdGl0bGUpXG59XG5cbmZ1bmMgdXBkYXRlRGVzY3JpcHRpb25NZXRhKGRlc2NyaXB0aW9uIHN0cmluZykge1xuXHR1cGRhdGVNZXRhKFwibmFtZVwiLCBcImRlc2NyaXB0aW9uXCIsIGRlc2NyaXB0aW9uKVxuXHR1cGRhdGVNZXRhKFwicHJvcGVydHlcIiwgXCJvZzpkZXNjcmlwdGlvblwiLCBkZXNjcmlwdGlvbilcblx0dXBkYXRlTWV0YShcInByb3BlcnR5XCIsIFwidHdpdHRlcjpkZXNjcmlwdGlvblwiLCBkZXNjcmlwdGlvbilcbn1cblxuZnVuYyB1cGRhdGVNZXRhVGFncygpIHtcblx0dXBkYXRlVGl0bGVNZXRhKHNpdGUuVGl0bGUpXG5cdHVwZGF0ZURlc2NyaXB0aW9uTWV0YShzaXRlLkRlc2NyaXB0aW9uKVxuXHR1cGRhdGVNZXRhKFwibmFtZVwiLCBcImF1dGhvclwiLCBzaXRlLkF1dGhvcilcblx0dGhlbWVCZyA6PSBzaXRlLkRhcmtUaGVtZS5CYWNrZ3JvdW5kXG5cdGlmIGN1cnJlbnRUaGVtZSA9PSBcImxpZ2h0XCIgJiYgc2l0ZS5MaWdodFRoZW1lLkJhY2tncm91bmQgIT0gXCJcIiB7XG5cdFx0dGhlbWVCZyA9IHNpdGUuTGlnaHRUaGVtZS5CYWNrZ3JvdW5kXG5cdH1cblx0dXBkYXRlTWV0YShcIm5hbWVcIiwgXCJ0aGVtZS1jb2xvclwiLCB0aGVtZUJnKVxufVxuXG5mdW5jIGFubm91bmNlUm91dGUodGl0bGUgc3RyaW5nKSB7XG5cdGFubm91bmNlciA6PSBhcHBSZWZzW1wicm91dGVBbm5vdW5jZXJcIl1cblx0aWYgYW5ub3VuY2VyID09IG5pbCAmJiBkb2N1bWVudCAhPSBuaWwge1xuXHRcdGFubm91bmNlciA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKFwicm91dGUtYW5ub3VuY2VyXCIpXG5cdH1cblx0aWYgYW5ub3VuY2VyICE9IG5pbCB7XG5cdFx0cHJlZml4IDo9IHQoXCJnZW5lcmFsLnJvdXRlQW5ub3VuY2VcIilcblx0XHRpZiBwcmVmaXggPT0gXCJnZW5lcmFsLnJvdXRlQW5ub3VuY2VcIiB7XG5cdFx0XHRwcmVmaXggPSBcIk5hdmlnYXRlZCB0byBcIlxuXHRcdH1cblx0XHRhbm5vdW5jZXIudGV4dENvbnRlbnQgPSBwcmVmaXggKyB0aXRsZVxuXHR9XG59XG5cbmZ1bmMgdXBkYXRlUm91dGVNZXRhKHRpdGxlIHN0cmluZywgZGVzY3JpcHRpb24gc3RyaW5nLCBjYW5vbmljYWxQYXRoIHN0cmluZykge1xuXHR1cGRhdGVUaXRsZU1ldGEodGl0bGUpXG5cdHVwZGF0ZURlc2NyaXB0aW9uTWV0YShkZXNjcmlwdGlvbilcblx0YW5ub3VuY2VSb3V0ZSh0aXRsZSlcblx0aWYgY2Fub25pY2FsUGF0aCA9PSBcIlwiIHtcblx0XHRyZXR1cm5cblx0fVxuXHRmdWxsVVJMIDo9IGNhbm9uaWNhbFBhdGhcblx0aWYgc3RyaW5ncy5IYXNQcmVmaXgoY2Fub25pY2FsUGF0aCwgXCIvXCIpIHtcblx0XHRvcmlnaW4gOj0gc3RyVmFsKHdpbmRvdy5sb2NhdGlvbi5vcmlnaW4pXG5cdFx0aWYgb3JpZ2luID09IFwiXCIgfHwgb3JpZ2luID09IFwibnVsbFwiIHtcblx0XHRcdG9yaWdpbiA9IHNpdGUuVXJsXG5cdFx0fVxuXHRcdGZ1bGxVUkwgPSBvcmlnaW4gKyBjYW5vbmljYWxQYXRoXG5cdH1cblx0dXBkYXRlTWV0YShcInByb3BlcnR5XCIsIFwib2c6dXJsXCIsIGZ1bGxVUkwpXG5cdGhlYWRFbChcImxpbmtcIiwgXCJyZWxcIiwgXCJjYW5vbmljYWxcIikuc2V0QXR0cmlidXRlKFwiaHJlZlwiLCBmdWxsVVJMKVxufVxuXG4vLyDilIDilIAgRGF0YSBJbml0aWFsaXphdGlvbiDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcbi8vIGA9PSBuaWxgIGNvbXBpbGVzIHRvIGxvb3NlIGA9PSBudWxsYCwgc28gdGhlc2UgYWxzbyBjYXRjaCBKUyB1bmRlZmluZWQuXG5cbmZ1bmMgc3RyVmFsKHYgYW55KSBzdHJpbmcge1xuXHRpZiB2ID09IG5pbCB7XG5cdFx0cmV0dXJuIFwiXCJcblx0fVxuXHRyZXR1cm4gc3RyaW5nKHYpXG59XG5cbmZ1bmMgYm9vbFZhbCh2IGFueSkgYm9vbCB7XG5cdGlmIHYgPT0gbmlsIHx8IHN0cmluZyh2KSA9PSBcImZhbHNlXCIge1xuXHRcdHJldHVybiBmYWxzZVxuXHR9XG5cdHJldHVybiBib29sKHYpXG59XG5cbmZ1bmMgaW50VmFsKHYgYW55KSBpbnQge1xuXHRpZiB2ID09IG5pbCB7XG5cdFx0cmV0dXJuIDBcblx0fVxuXHRyZXR1cm4gaW50KHYpXG59XG5cbi8vIHN0clNsaWNlIG1hcHMgYSByYXcgSlNPTiBhcnJheSAob3IgbmlsKSB0byBhIG5vbi1uaWwgW11zdHJpbmcuXG5mdW5jIHN0clNsaWNlKHJhdyBhbnkpIFtdc3RyaW5nIHtcblx0b3V0IDo9IFtdc3RyaW5ne31cblx0aWYgcmF3ICE9IG5pbCB7XG5cdFx0Zm9yIF8sIHYgOj0gcmFuZ2UgcmF3IHtcblx0XHRcdG91dCA9IGFwcGVuZChvdXQsIHN0clZhbCh2KSlcblx0XHR9XG5cdH1cblx0cmV0dXJuIG91dFxufVxuXG4vLyBwb3N0RnJvbUpTT04gbWFwcyBvbmUgcmF3IGBibG9nLnBvc3RzW11gIGVudHJ5IHRvIGEgQmxvZ1Bvc3QuXG5mdW5jIHBvc3RGcm9tSlNPTihwIGFueSkgQmxvZ1Bvc3Qge1xuXHRmbiA6PSBzdHJWYWwocC5maWxlbmFtZSlcblx0c2x1ZyA6PSBzdHJpbmdzLlRyaW1TdWZmaXgoZm4sIFwiLm1kXCIpXG5cdHJldHVybiBCbG9nUG9zdHtcblx0XHRTbHVnOiAgICAgc2x1Zyxcblx0XHRUaXRsZTogICAgc3RyVmFsKHAudGl0bGUpLFxuXHRcdERhdGU6ICAgICBzdHJWYWwocC5kYXRlKSxcblx0XHRFeGNlcnB0OiAgc3RyVmFsKHAuZXhjZXJwdCksXG5cdFx0VGFnczogICAgIHN0clNsaWNlKHAudGFncyksXG5cdFx0RmlsZW5hbWU6IGZuLFxuXHRcdEhyZWY6ICAgICBcIi9ibG9nL1wiICsgc2x1Zyxcblx0fVxufVxuXG4vLyBzb3J0UG9zdHNCeURhdGUgb3JkZXJzIG5ld2VzdCBmaXJzdDsgZGF0ZXMgYXJlIElTTyBzdHJpbmdzIHNvIGxleGljYWwgb3JkZXIgd29ya3MuXG5mdW5jIHNvcnRQb3N0c0J5RGF0ZShsaXN0IFtdQmxvZ1Bvc3QpIHtcblx0c2xpY2VzLlNvcnRGdW5jKGxpc3QsIGZ1bmMoYSBCbG9nUG9zdCwgYiBCbG9nUG9zdCkgaW50IHtcblx0XHRpZiBhLkRhdGUgPT0gYi5EYXRlIHtcblx0XHRcdHJldHVybiAwXG5cdFx0fVxuXHRcdGlmIGEuRGF0ZSA8IGIuRGF0ZSB7XG5cdFx0XHRyZXR1cm4gMVxuXHRcdH1cblx0XHRyZXR1cm4gLTFcblx0fSlcbn1cblxuLy8gcHJvamVjdEZyb21KU09OIG1hcHMgb25lIHJhdyBgcHJvamVjdHNbXWAgZW50cnkgdG8gYSBQcm9qZWN0LlxuZnVuYyBwcm9qZWN0RnJvbUpTT04ocCBhbnkpIFByb2plY3Qge1xuXHRsaW5rcyA6PSBbXVByb2plY3RMaW5re31cblx0aWYgcC5saW5rcyAhPSBuaWwge1xuXHRcdGZvciBfLCBsIDo9IHJhbmdlIHAubGlua3Mge1xuXHRcdFx0bGlua3MgPSBhcHBlbmQobGlua3MsIFByb2plY3RMaW5re1xuXHRcdFx0XHRUaXRsZTogc3RyVmFsKGwudGl0bGUpLFxuXHRcdFx0XHRJY29uOiAgc3RyVmFsKGwuaWNvbiksXG5cdFx0XHRcdEhyZWY6ICBzdHJWYWwobC5ocmVmKSxcblx0XHRcdH0pXG5cdFx0fVxuXHR9XG5cblx0aWQgOj0gc3RyVmFsKHAuaWQpXG5cdHJldHVybiBQcm9qZWN0e1xuXHRcdElEOiAgICAgICAgICAgICAgIGlkLFxuXHRcdFRpdGxlOiAgICAgICAgICAgIHN0clZhbChwLnRpdGxlKSxcblx0XHREZXNjcmlwdGlvbjogICAgICBzdHJWYWwocC5kZXNjcmlwdGlvbiksXG5cdFx0VGFnczogICAgICAgICAgICAgc3RyU2xpY2UocC50YWdzKSxcblx0XHRPcmRlcjogICAgICAgICAgICBpbnRWYWwocC5vcmRlciksXG5cdFx0R2l0aHViUmVwbzogICAgICAgc3RyVmFsKHAuZ2l0aHViX3JlcG8pLFxuXHRcdEdpdGh1YkJyYW5jaDogICAgIHN0clZhbChwLmdpdGh1Yl9icmFuY2gpLFxuXHRcdERlbW9Vcmw6ICAgICAgICAgIHN0clZhbChwLmRlbW9fdXJsKSxcblx0XHREZW1vTGFiZWw6ICAgICAgICBzdHJWYWwocC5kZW1vX2xhYmVsKSxcblx0XHREZW1vSW5zdHJ1Y3Rpb25zOiBzdHJWYWwocC5kZW1vX2luc3RydWN0aW9ucyksXG5cdFx0RGVtb0hlaWdodDogICAgICAgc3RyVmFsKHAuZGVtb19oZWlnaHQpLFxuXHRcdERlbW9GdWxsc2NyZWVuOiAgIGJvb2xWYWwocC5kZW1vX2Z1bGxzY3JlZW4pLFxuXHRcdFlvdXR1YmVWaWRlb3M6ICAgIHN0clNsaWNlKHAueW91dHViZV92aWRlb3MpLFxuXHRcdExpbmtzOiAgICAgICAgICAgIGxpbmtzLFxuXHRcdEhyZWY6ICAgICAgICAgICAgIFwiL3Byb2plY3QvXCIgKyBpZCxcblx0fVxufVxuXG4vLyB0aGVtZUZyb21KU09OIG1hcHMgb25lIGBzaXRlLnRoZW1lLjxuYW1lPmAgZW50cnkgdG8gVGhlbWVDb2xvcnMuXG5mdW5jIHRoZW1lRnJvbUpTT04oZCBhbnksIGRlZmF1bHRDb2RlVGhlbWUgc3RyaW5nKSBUaGVtZUNvbG9ycyB7XG5cdHRjIDo9IFRoZW1lQ29sb3Jze1xuXHRcdFByaW1hcnk6ICAgIHN0clZhbChkLnByaW1hcnkpLFxuXHRcdFNlY29uZGFyeTogIHN0clZhbChkLnNlY29uZGFyeSksXG5cdFx0QmFja2dyb3VuZDogc3RyVmFsKGQuYmFja2dyb3VuZCksXG5cdFx0VGV4dDogICAgICAgc3RyVmFsKGQudGV4dCksXG5cdFx0VGV4dExpZ2h0OiAgc3RyVmFsKGQudGV4dExpZ2h0KSxcblx0XHRCb3JkZXI6ICAgICBzdHJWYWwoZC5ib3JkZXIpLFxuXHRcdEhvdmVyOiAgICAgIHN0clZhbChkLmhvdmVyKSxcblx0XHRDb2RlVGhlbWU6ICBkZWZhdWx0Q29kZVRoZW1lLFxuXHR9XG5cdGlmIGQuY29kZSAhPSBuaWwge1xuXHRcdHRjLkNvZGVUaGVtZSA9IHN0clZhbChkLmNvZGUudGhlbWUpXG5cdH1cblx0aWYgZC5jb21tZW50cyAhPSBuaWwge1xuXHRcdHRjLkNvbW1lbnRzVGhlbWUgPSBzdHJWYWwoZC5jb21tZW50cy50aGVtZSlcblx0fVxuXHRyZXR1cm4gdGNcbn1cblxuZnVuYyBzb3J0UHJvamVjdHNCeU9yZGVyKGxpc3QgW11Qcm9qZWN0KSB7XG5cdHNsaWNlcy5Tb3J0RnVuYyhsaXN0LCBmdW5jKGEgUHJvamVjdCwgYiBQcm9qZWN0KSBpbnQge1xuXHRcdHJldHVybiBhLk9yZGVyIC0gYi5PcmRlclxuXHR9KVxufVxuXG4vLyBuYXZQYWdlSHJlZiBpcyB0aGUgcm91dGUgZm9yIGEgY3VzdG9tIHBhZ2UgaWQuXG5mdW5jIG5hdlBhZ2VIcmVmKGlkIHN0cmluZykgc3RyaW5nIHtcblx0cmV0dXJuIFwiL3BhZ2UvXCIgKyBpZFxufVxuXG4vLyBwYWdlRnJvbUpTT04gbWFwcyBvbmUgYHBhZ2VzLjxpZD5gIGVudHJ5IHRvIGEgTmF2UGFnZS5cbmZ1bmMgcGFnZUZyb21KU09OKGlkIHN0cmluZywgcCBhbnkpIE5hdlBhZ2Uge1xuXHRyZXR1cm4gTmF2UGFnZXtcblx0XHRJRDogICAgICAgIGlkLFxuXHRcdFRpdGxlOiAgICAgc3RyVmFsKHAudGl0bGUpLFxuXHRcdE9yZGVyOiAgICAgaW50VmFsKHAub3JkZXIpLFxuXHRcdFNob3dJbk5hdjogYm9vbFZhbChwLnNob3dJbk5hdiksXG5cdFx0SHJlZjogICAgICBuYXZQYWdlSHJlZihpZCksXG5cdH1cbn1cblxuZnVuYyBzb3J0UGFnZXNCeU9yZGVyKGxpc3QgW11OYXZQYWdlKSB7XG5cdHNsaWNlcy5Tb3J0RnVuYyhsaXN0LCBmdW5jKGEgTmF2UGFnZSwgYiBOYXZQYWdlKSBpbnQge1xuXHRcdHJldHVybiBhLk9yZGVyIC0gYi5PcmRlclxuXHR9KVxufVxuXG5hc3luYyBmdW5jIGluaXREYXRhKCkgZXJyb3Ige1xuXHR2YXIgZGF0YSBhbnlcblx0ZWwgOj0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoXCJzaXRlLWRhdGFcIilcblx0aWYgZWwgIT0gbmlsICYmIGVsLnRleHRDb250ZW50ICE9IG5pbCAmJiBlbC50ZXh0Q29udGVudCAhPSBcIlwiIHtcblx0XHRkYXRhID0gSlNPTi5wYXJzZShzdHJWYWwoZWwudGV4dENvbnRlbnQpKVxuXHR9IGVsc2Uge1xuXHRcdHJlcyA6PSBhd2FpdCBmZXRjaChcIi9kYXRhL2NvbnRlbnQuanNvblwiKVxuXHRcdGlmIHJlcyA9PSBuaWwgfHwgIXJlcy5vayB7XG5cdFx0XHRyZXR1cm4gZXJyb3JzLk5ldyhcImZhaWxlZCB0byBmZXRjaCAvZGF0YS9jb250ZW50Lmpzb25cIilcblx0XHR9XG5cdFx0ZGF0YSA9IGF3YWl0IHJlcy5qc29uKClcblx0fVxuXG5cdGlmIGRhdGEgPT0gbmlsIHtcblx0XHRyZXR1cm4gZXJyb3JzLk5ldyhcImZhaWxlZCB0byBwYXJzZSAvZGF0YS9jb250ZW50Lmpzb25cIilcblx0fVxuXG5cdHNpdGVEYXRhIDo9IGRhdGEuc2l0ZVxuXHRpZiBzaXRlRGF0YSAhPSBuaWwge1xuXHRcdHNpdGUuVGl0bGUgPSBzdHJWYWwoc2l0ZURhdGEudGl0bGUpXG5cdFx0c2l0ZS5VcmwgPSBzdHJpbmdzLlRyaW1TdWZmaXgoc3RyVmFsKHNpdGVEYXRhLnVybCksIFwiL1wiKVxuXHRcdHNpdGUuRGVzY3JpcHRpb24gPSBzdHJWYWwoc2l0ZURhdGEuZGVzY3JpcHRpb24pXG5cdFx0c2l0ZS5BdXRob3IgPSBzdHJWYWwoc2l0ZURhdGEuYXV0aG9yKVxuXHRcdHNpdGUuR2l0aHViVXNlcm5hbWUgPSBzdHJWYWwoc2l0ZURhdGEuZ2l0aHViX3VzZXJuYW1lKVxuXG5cdFx0aWYgc2l0ZURhdGEudGhlbWUgIT0gbmlsIHtcblx0XHRcdGlmIHNpdGVEYXRhLnRoZW1lLmRhcmsgIT0gbmlsIHtcblx0XHRcdFx0c2l0ZS5EYXJrVGhlbWUgPSB0aGVtZUZyb21KU09OKHNpdGVEYXRhLnRoZW1lLmRhcmssIFwicHJpc20tdG9tb3Jyb3dcIilcblx0XHRcdH1cblx0XHRcdGlmIHNpdGVEYXRhLnRoZW1lLmxpZ2h0ICE9IG5pbCB7XG5cdFx0XHRcdHNpdGUuTGlnaHRUaGVtZSA9IHRoZW1lRnJvbUpTT04oc2l0ZURhdGEudGhlbWUubGlnaHQsIFwicHJpc20tY295XCIpXG5cdFx0XHR9XG5cdFx0fVxuXG5cdFx0aWYgc2l0ZURhdGEuc2VhcmNoICE9IG5pbCB7XG5cdFx0XHRzaXRlLlNlYXJjaCA9IFNlYXJjaENvbmZpZ3tcblx0XHRcdFx0RW5hYmxlZDogICAgIGJvb2xWYWwoc2l0ZURhdGEuc2VhcmNoLmVuYWJsZWQpLFxuXHRcdFx0XHRNaW5DaGFyczogICAgaW50VmFsKHNpdGVEYXRhLnNlYXJjaC5taW5DaGFycyksXG5cdFx0XHRcdFBsYWNlaG9sZGVyOiBzdHJWYWwoc2l0ZURhdGEuc2VhcmNoLnBsYWNlaG9sZGVyKSxcblx0XHRcdH1cblx0XHR9XG5cblx0XHRpZiBzaXRlRGF0YS5lbWFpbGpzICE9IG5pbCB7XG5cdFx0XHRzaXRlLkVtYWlsSlMgPSBFbWFpbEpTQ29uZmlne1xuXHRcdFx0XHRFbmFibGVkOiAgICBib29sVmFsKHNpdGVEYXRhLmVtYWlsanMuZW5hYmxlZCksXG5cdFx0XHRcdFNlcnZpY2VJZDogIHN0clZhbChzaXRlRGF0YS5lbWFpbGpzLnNlcnZpY2VJZCksXG5cdFx0XHRcdFRlbXBsYXRlSWQ6IHN0clZhbChzaXRlRGF0YS5lbWFpbGpzLnRlbXBsYXRlSWQpLFxuXHRcdFx0XHRQdWJsaWNLZXk6ICBzdHJWYWwoc2l0ZURhdGEuZW1haWxqcy5wdWJsaWNLZXkpLFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIHNpdGVEYXRhLmNvbW1lbnRzICE9IG5pbCB7XG5cdFx0XHRzaXRlLkNvbW1lbnRzID0gQ29tbWVudHNDb25maWd7XG5cdFx0XHRcdEJsb2dFbmFibGVkOiAgICAgYm9vbFZhbChzaXRlRGF0YS5jb21tZW50cy5ibG9nRW5hYmxlZCksXG5cdFx0XHRcdFByb2plY3RzRW5hYmxlZDogYm9vbFZhbChzaXRlRGF0YS5jb21tZW50cy5wcm9qZWN0c0VuYWJsZWQpLFxuXHRcdFx0XHRBdHRyczogICAgICAgICAgIHNpdGVEYXRhLmNvbW1lbnRzLFxuXHRcdFx0fVxuXHRcdH1cblxuXHRcdGlmIHNpdGVEYXRhLnNvY2lhbCAhPSBuaWwge1xuXHRcdFx0Zm9yIF8sIGl0ZW0gOj0gcmFuZ2Ugc2l0ZURhdGEuc29jaWFsIHtcblx0XHRcdFx0c2l0ZS5Tb2NpYWwgPSBhcHBlbmQoc2l0ZS5Tb2NpYWwsIFNvY2lhbExpbmt7XG5cdFx0XHRcdFx0SWNvbjogICBzdHJWYWwoaXRlbS5pY29uKSxcblx0XHRcdFx0XHRIcmVmOiAgIHN0clZhbChpdGVtLmhyZWYpLFxuXHRcdFx0XHRcdFRhcmdldDogc3RyVmFsKGl0ZW0udGFyZ2V0KSxcblx0XHRcdFx0XHRSZWw6ICAgIHN0clZhbChpdGVtLnJlbCksXG5cdFx0XHRcdH0pXG5cdFx0XHR9XG5cdFx0fVxuXHR9XG5cblx0Ly8gVHJhbnNsYXRpb25zXG5cdGlmIGRhdGEudHJhbnNsYXRpb25zICE9IG5pbCAmJiBkYXRhLnRyYW5zbGF0aW9ucy5lbiAhPSBuaWwge1xuXHRcdGZvciBrLCB2IDo9IHJhbmdlIGRhdGEudHJhbnNsYXRpb25zLmVuLihtYXBbc3RyaW5nXWFueSkge1xuXHRcdFx0dHJhbnNsYXRpb25zW2tdID0gc3RyVmFsKHYpXG5cdFx0fVxuXHR9XG5cblx0Ly8gQmxvZ1xuXHRzaXRlLlBvc3RzUGVyUGFnZSA9IDVcblx0aWYgZGF0YS5ibG9nICE9IG5pbCB7XG5cdFx0aWYgZGF0YS5ibG9nLnBvc3RzUGVyUGFnZSAhPSBuaWwge1xuXHRcdFx0c2l0ZS5Qb3N0c1BlclBhZ2UgPSBpbnRWYWwoZGF0YS5ibG9nLnBvc3RzUGVyUGFnZSlcblx0XHR9XG5cdFx0aWYgZGF0YS5ibG9nLnBvc3RzICE9IG5pbCB7XG5cdFx0XHRmb3IgXywgcCA6PSByYW5nZSBkYXRhLmJsb2cucG9zdHMge1xuXHRcdFx0XHRwb3N0cyA9IGFwcGVuZChwb3N0cywgcG9zdEZyb21KU09OKHApKVxuXHRcdFx0fVxuXHRcdFx0c29ydFBvc3RzQnlEYXRlKHBvc3RzKVxuXHRcdH1cblx0fVxuXG5cdC8vIFByb2plY3RzXG5cdGlmIGRhdGEucHJvamVjdHMgIT0gbmlsIHtcblx0XHRmb3IgXywgcCA6PSByYW5nZSBkYXRhLnByb2plY3RzIHtcblx0XHRcdHByb2plY3RzID0gYXBwZW5kKHByb2plY3RzLCBwcm9qZWN0RnJvbUpTT04ocCkpXG5cdFx0fVxuXHRcdHNvcnRQcm9qZWN0c0J5T3JkZXIocHJvamVjdHMpXG5cdH1cblxuXHQvLyBQYWdlc1xuXHRpZiBkYXRhLnBhZ2VzICE9IG5pbCB7XG5cdFx0Zm9yIGlkLCBwIDo9IHJhbmdlIGRhdGEucGFnZXMuKG1hcFtzdHJpbmddYW55KSB7XG5cdFx0XHRuYXZQYWdlcyA9IGFwcGVuZChuYXZQYWdlcywgcGFnZUZyb21KU09OKGlkLCBwKSlcblx0XHR9XG5cdFx0c29ydFBhZ2VzQnlPcmRlcihuYXZQYWdlcylcblx0fVxuXG5cdHVwZGF0ZU1ldGFUYWdzKClcblx0cmV0dXJuIG5pbFxufVxuIiwicGFja2FnZSBtYWluXG5cbmNzcyBlcnJvck1lc3NhZ2VTdHlsZSgpIHtcblx0dGV4dC1hbGlnbjogY2VudGVyO1xuXHRwYWRkaW5nOiAycmVtO1xuXHRtYXgtd2lkdGg6IDYwMHB4O1xuXHRtYXJnaW46IDAgYXV0bztcblxuXHQmIGgxIHtcblx0XHRjb2xvcjogI2ZmNmI2Yjtcblx0XHRtYXJnaW4tYm90dG9tOiAxcmVtO1xuXHRcdGZvbnQtc2l6ZTogMmVtO1xuXHR9XG5cdCYgcCB7XG5cdFx0Y29sb3I6IHZhcigtLXRleHQtbGlnaHQpO1xuXHRcdGZvbnQtc2l6ZTogMS4xZW07XG5cdH1cbn1cblxuY3NzIGl0ZW1UYWdTdHlsZSgpIHtcblx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItY29sb3IpO1xuXHRjb2xvcjogdmFyKC0tYWNjZW50KTtcblx0cGFkZGluZzogdmFyKC0tc3BhY2luZy14cykgdmFyKC0tc3BhY2luZy1zbSk7XG5cdGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlci1yYWRpdXMpO1xuXHRmb250LXNpemU6IHZhcigtLWZvbnQtc2l6ZS1zbSk7XG5cdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0bWFyZ2luOiAycHg7XG5cblx0Ji5jbGlja2FibGUtdGFnIHtcblx0XHRjdXJzb3I6IHBvaW50ZXI7XG5cdFx0dHJhbnNpdGlvbjogYWxsIHZhcigtLXRyYW5zaXRpb24tZmFzdCk7XG5cdH1cblx0Ji5jbGlja2FibGUtdGFnOmhvdmVyIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHRcdGNvbG9yOiB2YXIoLS1iYWNrZ3JvdW5kLWNvbG9yKTtcblx0XHR0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTFweCk7XG5cdFx0Ym94LXNoYWRvdzogMCAycHggNHB4IHJnYmEoMCwgMCwgMCwgMC4yKTtcblx0fVxufVxuXG5jc3MgZ2lzY3VzU3R5bGUoKSB7XG5cdG1heC13aWR0aDogOTAwcHg7XG5cdG1hcmdpbjogMi41cmVtIGF1dG87XG5cdHBhZGRpbmc6IDFyZW0gMDtcblxuXHQmIGlmcmFtZSB7XG5cdFx0Y29sb3Itc2NoZW1lOiBkYXJrO1xuXHR9XG59XG5cbmNzcyBkb3dubG9hZEJ1dHRvbnNTdHlsZSgpIHtcblx0ZGlzcGxheTogZmxleDtcblx0ZmxleC13cmFwOiB3cmFwO1xuXHRnYXA6IDE1cHg7XG5cdG1hcmdpbjogMS41ZW0gMDtcblx0anVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xufVxuXG5jc3MgZG93bmxvYWRCdG5TdHlsZSgpIHtcblx0ZGlzcGxheTogaW5saW5lLWZsZXg7XG5cdGFsaWduLWl0ZW1zOiBjZW50ZXI7XG5cdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRnYXA6IDhweDtcblx0cGFkZGluZzogMTJweCAyNHB4O1xuXHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jb2xvcik7XG5cdGJvcmRlcjogMnB4IHNvbGlkIHZhcigtLWFjY2VudCk7XG5cdGJvcmRlci1yYWRpdXM6IDhweDtcblx0Y29sb3I6IHZhcigtLWZvbnQtY29sb3IpO1xuXHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cdGZvbnQ6IDYwMCAxZW0gdmFyKC0tZm9udC1mYW1pbHktcHJpbWFyeSk7XG5cdHRyYW5zaXRpb246IGFsbCB2YXIoLS10cmFuc2l0aW9uLW5vcm1hbCk7XG5cdGN1cnNvcjogcG9pbnRlcjtcblx0YXBwZWFyYW5jZTogbm9uZTtcblxuXHQmOmhvdmVyLFxuXHQmOmZvY3VzIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jb2xvcik7XG5cdFx0Ym9yZGVyLWNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMnB4KTtcblx0XHRib3gtc2hhZG93OiAwIDRweCAxMnB4IHZhcigtLWFjY2VudC1nbG93KTtcblx0XHRjb2xvcjogdmFyKC0tYWNjZW50KTtcblx0XHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cdH1cblx0JjphY3RpdmUge1xuXHRcdHRyYW5zZm9ybTogdHJhbnNsYXRlWSgwKSBzY2FsZSgwLjk1KTtcblx0XHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cdH1cblx0JiBzdmcsXG5cdCYgLmljb24ge1xuXHRcdGZsZXgtc2hyaW5rOiAwO1xuXHRcdHRyYW5zaXRpb246XG5cdFx0XHR0cmFuc2Zvcm0gdmFyKC0tdHJhbnNpdGlvbi1ub3JtYWwpLFxuXHRcdFx0Y29sb3IgdmFyKC0tdHJhbnNpdGlvbi1ub3JtYWwpO1xuXHR9XG5cdCY6aG92ZXIgc3ZnLFxuXHQmOmhvdmVyIC5pY29uLFxuXHQmOmZvY3VzIHN2Zyxcblx0Jjpmb2N1cyAuaWNvbiB7XG5cdFx0dHJhbnNmb3JtOiBzY2FsZSgxLjEpO1xuXHRcdGNvbG9yOiB2YXIoLS1hY2NlbnQpO1xuXHR9XG5cdCYgc3BhbiB7XG5cdFx0dHJhbnNpdGlvbjogY29sb3IgdmFyKC0tdHJhbnNpdGlvbi1ub3JtYWwpO1xuXHR9XG5cdCY6aG92ZXIgc3Bhbixcblx0Jjpmb2N1cyBzcGFuIHtcblx0XHRjb2xvcjogdmFyKC0tYWNjZW50KTtcblx0fVxufVxuXG5jc3MgbWFya2Rvd25Cb2R5U3R5bGUoKSB7XG5cdGZvbnQtZmFtaWx5OiB2YXIoLS1mb250LWZhbWlseS1wcmltYXJ5KTtcblx0Zm9udC1zaXplOiAxZW07XG5cdGxpbmUtaGVpZ2h0OiAxLjY7XG5cdGNvbG9yOiB2YXIoLS10ZXh0LWxpZ2h0KTtcblx0dGV4dC1hbGlnbjogbGVmdDtcblxuXHQmIGgxLCAmIGgyLCAmIGgzLCAmIGg0LCAmIGg1LCAmIGg2IHtcblx0XHRjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XG5cdFx0bWFyZ2luOiAxZW0gMCAwLjVlbTtcblx0XHRmb250LXdlaWdodDogYm9sZDtcblx0XHRsaW5lLWhlaWdodDogMS4yNTtcblx0fVxuXHQmIGgxIHtcblx0XHRmb250LXNpemU6IDEuOGVtO1xuXHRcdG1hcmdpbi10b3A6IDA7XG5cdH1cblx0JiBoMiB7XG5cdFx0Zm9udC1zaXplOiAxLjRlbTtcblx0XHRzY3JvbGwtbWFyZ2luLXRvcDogNzVweDtcblx0fVxuXHQmIGgzIHtcblx0XHRmb250LXNpemU6IDEuMmVtO1xuXHRcdHNjcm9sbC1tYXJnaW4tdG9wOiA3NXB4O1xuXHR9XG5cdCYgcCwgJiBsaSB7XG5cdFx0bWFyZ2luOiAwLjVlbSAwO1xuXHRcdGxpbmUtaGVpZ2h0OiAxLjY7XG5cdFx0Zm9udC1zaXplOiAxLjFlbTtcblx0XHRjb2xvcjogdmFyKC0tdGV4dC1saWdodCk7XG5cdH1cblx0JiB1bCwgJiBvbCB7XG5cdFx0bWFyZ2luOiAwLjVlbSAwO1xuXHRcdHBhZGRpbmctbGVmdDogMmVtO1xuXHR9XG5cdCYgY29kZTpub3QoW2NsYXNzKj1cImxhbmd1YWdlLVwiXSkge1xuXHRcdGJhY2tncm91bmQtY29sb3I6IHZhcigtLWhvdmVyLWNvbG9yKTtcblx0XHRjb2xvcjogdmFyKC0tZm9udC1jb2xvcik7XG5cdFx0cGFkZGluZzogMnB4IDZweDtcblx0XHRib3JkZXItcmFkaXVzOiAzcHg7XG5cdFx0Zm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LW1vbm8pO1xuXHRcdGZvbnQtc2l6ZTogMC45ZW07XG5cdH1cblx0JiBwcmU6bm90KFtjbGFzcyo9XCJsYW5ndWFnZS1cIl0pIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jb2xvcik7XG5cdFx0cGFkZGluZzogMC41ZW07XG5cdFx0Ym9yZGVyLXJhZGl1czogM3B4O1xuXHRcdG92ZXJmbG93LXg6IGF1dG87XG5cdFx0bWFyZ2luOiAwLjVlbSAwO1xuXHRcdGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWJvcmRlci1jb2xvcik7XG5cdFx0Zm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LW1vbm8pO1xuXHRcdGxpbmUtaGVpZ2h0OiAxLjQ7XG5cdH1cblx0JiBwcmVbY2xhc3MqPVwibGFuZ3VhZ2UtXCJdIHtcblx0XHRtYXJnaW46IDAuNWVtIDA7XG5cdFx0b3ZlcmZsb3cteDogYXV0bztcblx0XHRmb250LWZhbWlseTogdmFyKC0tZm9udC1mYW1pbHktbW9ubyk7XG5cdFx0bGluZS1oZWlnaHQ6IDEuNDtcblx0XHRwb3NpdGlvbjogcmVsYXRpdmU7XG5cdH1cblx0JiBhOm5vdCguZG93bmxvYWQtYnRuKSB7XG5cdFx0Y29sb3I6IHZhcigtLWFjY2VudCk7XG5cdFx0dGV4dC1kZWNvcmF0aW9uOiBub25lO1xuXHRcdGRpc3BsYXk6IGlubGluZS1ibG9jaztcblx0XHR0cmFuc2l0aW9uOiB0cmFuc2Zvcm0gdmFyKC0tdHJhbnNpdGlvbi1mYXN0KTtcblx0fVxuXHQmIGE6bm90KC5kb3dubG9hZC1idG4pOmhvdmVyIHtcblx0XHR0ZXh0LWRlY29yYXRpb246IG5vbmU7XG5cdFx0dHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0ycHgpO1xuXHR9XG5cdCYgYmxvY2txdW90ZSB7XG5cdFx0Ym9yZGVyLWxlZnQ6IDRweCBzb2xpZCB2YXIoLS1hY2NlbnQpO1xuXHRcdHBhZGRpbmctbGVmdDogMWVtO1xuXHRcdG1hcmdpbjogMC41ZW0gMDtcblx0XHRmb250LXN0eWxlOiBpdGFsaWM7XG5cdH1cblx0JiB0YWJsZSB7XG5cdFx0d2lkdGg6IDEwMCU7XG5cdFx0Ym9yZGVyLWNvbGxhcHNlOiBjb2xsYXBzZTtcblx0XHRtYXJnaW46IDAuNWVtIDA7XG5cdH1cblx0JiB0aCwgJiB0ZCB7XG5cdFx0Ym9yZGVyOiAxcHggc29saWQgdmFyKC0tYm9yZGVyLWNvbG9yKTtcblx0XHRwYWRkaW5nOiAwLjVlbSAxZW07XG5cdFx0dGV4dC1hbGlnbjogbGVmdDtcblx0fVxuXHQmIHRoIHtcblx0XHRiYWNrZ3JvdW5kLWNvbG9yOiB2YXIoLS1ob3Zlci1jb2xvcik7XG5cdFx0Y29sb3I6IHZhcigtLWFjY2VudCk7XG5cdFx0Zm9udC13ZWlnaHQ6IGJvbGQ7XG5cdH1cblx0JiBociB7XG5cdFx0Ym9yZGVyOiBub25lO1xuXHRcdGJvcmRlci10b3A6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xuXHRcdG1hcmdpbjogMC41ZW0gMDtcblx0fVxuXHQmIC5tZXJtYWlkIHtcblx0XHRkaXNwbGF5OiBmbGV4O1xuXHRcdGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXHRcdG1hcmdpbjogMWVtIDA7XG5cdFx0b3ZlcmZsb3cteDogYXV0bztcblx0fVxuXHQmIC5tZXJtYWlkIHN2ZyB7XG5cdFx0bWF4LXdpZHRoOiAxMDAlO1xuXHRcdGhlaWdodDogYXV0bztcblx0fVxuXHQmIC5jb3B5LWNvZGUtYnV0dG9uIHtcblx0XHRwb3NpdGlvbjogYWJzb2x1dGU7XG5cdFx0dG9wOiAwLjVlbTtcblx0XHRyaWdodDogMC41ZW07XG5cdFx0cGFkZGluZzogMC40ZW0gMC44ZW07XG5cdFx0Zm9udC1zaXplOiAwLjg1ZW07XG5cdFx0Zm9udC1mYW1pbHk6IHZhcigtLWZvbnQtZmFtaWx5LXByaW1hcnkpO1xuXHRcdGZvbnQtd2VpZ2h0OiA3MDA7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0taG92ZXItY29sb3IpO1xuXHRcdGNvbG9yOiB2YXIoLS1mb250LWNvbG9yKTtcblx0XHRib3JkZXI6IDFweCBzb2xpZCB2YXIoLS1ib3JkZXItY29sb3IpO1xuXHRcdGJvcmRlci1yYWRpdXM6IHZhcigtLWJvcmRlci1yYWRpdXMpO1xuXHRcdGN1cnNvcjogcG9pbnRlcjtcblx0XHRvcGFjaXR5OiAwO1xuXHRcdHRyYW5zaXRpb246XG5cdFx0XHRvcGFjaXR5IHZhcigtLXRyYW5zaXRpb24tZmFzdCksXG5cdFx0XHRiYWNrZ3JvdW5kLWNvbG9yIHZhcigtLXRyYW5zaXRpb24tZmFzdCk7XG5cdFx0ei1pbmRleDogMTA7XG5cdH1cblx0JiBwcmU6aG92ZXIgLmNvcHktY29kZS1idXR0b24ge1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cblx0QG1lZGlhIChob3Zlcjogbm9uZSkge1xuXHRcdCYgLmNvcHktY29kZS1idXR0b24ge1xuXHRcdFx0b3BhY2l0eTogMTtcblx0XHR9XG5cdH1cblx0JiAuY29weS1jb2RlLWJ1dHRvbjpob3ZlciB7XG5cdFx0YmFja2dyb3VuZC1jb2xvcjogdmFyKC0tYWNjZW50KTtcblx0XHRjb2xvcjogdmFyKC0tYmFja2dyb3VuZC1jb2xvcik7XG5cdH1cblx0JiAuY29weS1jb2RlLWJ1dHRvbjphY3RpdmUge1xuXHRcdHRyYW5zZm9ybTogc2NhbGUoMC45NSk7XG5cdH1cblx0JiAuY29weS1jb2RlLWJ1dHRvbi5jb3BpZWQge1xuXHRcdGJhY2tncm91bmQtY29sb3I6ICMxMGI5ODE7XG5cdFx0Y29sb3I6IHdoaXRlO1xuXHRcdG9wYWNpdHk6IDE7XG5cdH1cbn1cbiIsInBhY2thZ2UgbWFpblxuXG5pbXBvcnQgXCJqczouL2Jyb3dzZXIuZC50c1wiXG5cbmNvbnN0IHRoZW1lU3RvcmFnZUtleSA9IFwidGhlbWUtcHJlZmVyZW5jZVwiXG5cbmZ1bmMgZ2V0SW5pdGlhbFRoZW1lKCkgc3RyaW5nIHtcblx0c2F2ZWQgOj0gd2luZG93LmxvY2FsU3RvcmFnZS5nZXRJdGVtKHRoZW1lU3RvcmFnZUtleSlcblx0aWYgc2F2ZWQgIT0gbmlsICYmIHNhdmVkICE9IFwiXCIge1xuXHRcdHJldHVybiBzdHJpbmcoc2F2ZWQpXG5cdH1cblx0Y3VycmVudCA6PSBkb2N1bWVudC5kb2N1bWVudEVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS10aGVtZVwiKVxuXHRpZiBjdXJyZW50ICE9IG5pbCAmJiBjdXJyZW50ICE9IFwiXCIge1xuXHRcdHJldHVybiBzdHJpbmcoY3VycmVudClcblx0fVxuXHRyZXR1cm4gXCJkYXJrXCJcbn1cblxuZnVuYyBnZXRUaGVtZUNvbG9ycyhuYW1lIHN0cmluZykgVGhlbWVDb2xvcnMge1xuXHRpZiBuYW1lID09IFwibGlnaHRcIiB7XG5cdFx0cmV0dXJuIHNpdGUuTGlnaHRUaGVtZVxuXHR9XG5cdHJldHVybiBzaXRlLkRhcmtUaGVtZVxufVxuXG5mdW5jIGFwcGx5Q29sb3JTY2hlbWUoY29sb3JzIFRoZW1lQ29sb3JzKSB7XG5cdHJvb3QgOj0gZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50XG5cdHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCItLWFjY2VudFwiLCBjb2xvcnMuUHJpbWFyeSlcblx0cm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tZm9udC1jb2xvclwiLCBjb2xvcnMuVGV4dClcblx0cm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYmFja2dyb3VuZC1jb2xvclwiLCBjb2xvcnMuQmFja2dyb3VuZClcblx0cm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0taGVhZGVyLWNvbG9yXCIsIGNvbG9ycy5TZWNvbmRhcnkpXG5cdHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCItLXRleHQtbGlnaHRcIiwgY29sb3JzLlRleHRMaWdodClcblx0cm9vdC5zdHlsZS5zZXRQcm9wZXJ0eShcIi0tYm9yZGVyLWNvbG9yXCIsIGNvbG9ycy5Cb3JkZXIpXG5cdHJvb3Quc3R5bGUuc2V0UHJvcGVydHkoXCItLWhvdmVyLWNvbG9yXCIsIGNvbG9ycy5Ib3Zlcilcbn1cblxuZnVuYyBhcHBseVByaXNtVGhlbWUodGhlbWVOYW1lIHN0cmluZykge1xuXHRpZCA6PSBcInByaXNtLXRoZW1lXCJcblx0bGluayA6PSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZChpZClcblx0aHJlZiA6PSBcIi9jc3MvcHJpc20tdGhlbWVzL1wiICsgdGhlbWVOYW1lICsgXCIubWluLmNzc1wiXG5cblx0aWYgbGluayAhPSBuaWwge1xuXHRcdGxpbmsuaHJlZiA9IGhyZWZcblx0fSBlbHNlIHtcblx0XHRuZXdMaW5rIDo9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJsaW5rXCIpXG5cdFx0bmV3TGluay5pZCA9IGlkXG5cdFx0bmV3TGluay5yZWwgPSBcInN0eWxlc2hlZXRcIlxuXHRcdG5ld0xpbmsuaHJlZiA9IGhyZWZcblx0XHRkb2N1bWVudC5oZWFkLmFwcGVuZENoaWxkKG5ld0xpbmspXG5cdH1cbn1cblxuZnVuYyB1cGRhdGVUaGVtZUNvbG9yTWV0YSh0aGVtZSBzdHJpbmcpIHtcblx0bWV0YSA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwibWV0YVtuYW1lPVxcXCJ0aGVtZS1jb2xvclxcXCJdXCIpXG5cdGlmIG1ldGEgIT0gbmlsIHtcblx0XHRjb2xvcnMgOj0gZ2V0VGhlbWVDb2xvcnModGhlbWUpXG5cdFx0aWYgY29sb3JzLkJhY2tncm91bmQgIT0gXCJcIiB7XG5cdFx0XHRtZXRhLnNldEF0dHJpYnV0ZShcImNvbnRlbnRcIiwgY29sb3JzLkJhY2tncm91bmQpXG5cdFx0fVxuXHR9XG59XG5cbmZ1bmMgYXBwbHlUaGVtZSh0aGVtZSBzdHJpbmcpIHtcblx0Y3VycmVudFRoZW1lID0gdGhlbWVcblx0ZG9jdW1lbnQuZG9jdW1lbnRFbGVtZW50LnNldEF0dHJpYnV0ZShcImRhdGEtdGhlbWVcIiwgdGhlbWUpXG5cdGNvbG9ycyA6PSBnZXRUaGVtZUNvbG9ycyh0aGVtZSlcblx0YXBwbHlDb2xvclNjaGVtZShjb2xvcnMpXG5cdHVwZGF0ZVRoZW1lQ29sb3JNZXRhKHRoZW1lKVxuXHRpZiBjb2xvcnMuQ29kZVRoZW1lICE9IFwiXCIge1xuXHRcdGFwcGx5UHJpc21UaGVtZShjb2xvcnMuQ29kZVRoZW1lKVxuXHR9XG5cdHVwZGF0ZUdpc2N1c1RoZW1lKClcblx0aWYgd2luZG93Lm1lcm1haWQgIT0gbmlsIHtcblx0XHRyZW5kZXJNZXJtYWlkKClcblx0fVxufVxuXG5mdW5jIG5leHRUaGVtZShjdXJyZW50IHN0cmluZykgc3RyaW5nIHtcblx0aWYgY3VycmVudCA9PSBcImRhcmtcIiB7XG5cdFx0cmV0dXJuIFwibGlnaHRcIlxuXHR9XG5cdHJldHVybiBcImRhcmtcIlxufVxuXG5mdW5jIHRvZ2dsZVRoZW1lKCkge1xuXHRuZXh0IDo9IG5leHRUaGVtZShjdXJyZW50VGhlbWUpXG5cdHdpbmRvdy5sb2NhbFN0b3JhZ2Uuc2V0SXRlbSh0aGVtZVN0b3JhZ2VLZXksIG5leHQpXG5cdGFwcGx5VGhlbWUobmV4dClcbn1cblxuZnVuYyBpbml0VGhlbWUoKSB7XG5cdGluaXRpYWwgOj0gZ2V0SW5pdGlhbFRoZW1lKClcblx0YXBwbHlUaGVtZShpbml0aWFsKVxufVxuIiwicGFja2FnZSBtYWluXG5cbi8vIOKUgOKUgCBSb3V0aW5nIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuXG50eXBlIFJvdXRlIGludFxuXG5jb25zdCAoXG5cdFJvdXRlQmxvZyBSb3V0ZSA9IGlvdGFcblx0Um91dGVQb3N0XG5cdFJvdXRlUHJvamVjdFxuXHRSb3V0ZVBhZ2Vcblx0Um91dGVOb3RGb3VuZFxuKVxuXG50eXBlIFJvdXRlTWF0Y2ggc3RydWN0IHtcblx0S2luZCAgUm91dGVcblx0UGFyYW0gc3RyaW5nIC8vIHBvc3Qgc2x1ZywgcHJvamVjdCBpZCBvciBwYWdlIGlkXG5cdFBhZ2UgIGludCAgICAvLyBibG9nIHBhZ2UgbnVtYmVyIChSb3V0ZUJsb2cgb25seSwgPj0gMSlcbn1cblxuLy8g4pSA4pSAIERhdGEgc3RydWN0cyDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxudHlwZSBQcm9qZWN0TGluayBzdHJ1Y3Qge1xuXHRUaXRsZSBzdHJpbmdcblx0SWNvbiAgc3RyaW5nXG5cdEhyZWYgIHN0cmluZ1xufVxuXG50eXBlIFByb2plY3Qgc3RydWN0IHtcblx0SUQgICAgICAgICAgICAgICBzdHJpbmdcblx0VGl0bGUgICAgICAgICAgICBzdHJpbmdcblx0RGVzY3JpcHRpb24gICAgICBzdHJpbmdcblx0VGFncyAgICAgICAgICAgICBbXXN0cmluZ1xuXHRPcmRlciAgICAgICAgICAgIGludFxuXHRHaXRodWJSZXBvICAgICAgIHN0cmluZ1xuXHRHaXRodWJCcmFuY2ggICAgIHN0cmluZ1xuXHREZW1vVXJsICAgICAgICAgIHN0cmluZ1xuXHREZW1vTGFiZWwgICAgICAgIHN0cmluZ1xuXHREZW1vSW5zdHJ1Y3Rpb25zIHN0cmluZ1xuXHREZW1vSGVpZ2h0ICAgICAgIHN0cmluZ1xuXHREZW1vRnVsbHNjcmVlbiAgIGJvb2xcblx0WW91dHViZVZpZGVvcyAgICBbXXN0cmluZ1xuXHRMaW5rcyAgICAgICAgICAgIFtdUHJvamVjdExpbmtcblx0SHJlZiAgICAgICAgICAgICBzdHJpbmdcbn1cblxudHlwZSBCbG9nUG9zdCBzdHJ1Y3Qge1xuXHRTbHVnICAgICBzdHJpbmdcblx0VGl0bGUgICAgc3RyaW5nXG5cdERhdGUgICAgIHN0cmluZ1xuXHRFeGNlcnB0ICBzdHJpbmdcblx0VGFncyAgICAgW11zdHJpbmdcblx0RmlsZW5hbWUgc3RyaW5nXG5cdEhyZWYgICAgIHN0cmluZ1xufVxuXG50eXBlIE5hdlBhZ2Ugc3RydWN0IHtcblx0SUQgICAgICAgIHN0cmluZ1xuXHRUaXRsZSAgICAgc3RyaW5nXG5cdE9yZGVyICAgICBpbnRcblx0U2hvd0luTmF2IGJvb2xcblx0SHJlZiAgICAgIHN0cmluZ1xufVxuXG4vLyDilIDilIAgUm91dGUgdmlldyBzdGF0ZSDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIDilIBcblxudHlwZSBMb2FkU3RhdHVzIGludFxuXG5jb25zdCAoXG5cdExvYWRSZWFkeSAgIExvYWRTdGF0dXMgPSBpb3RhIC8vIGNvbnRlbnQgYXZhaWxhYmxlIG9yIG5vdGhpbmcgdG8gbG9hZFxuXHRMb2FkUGVuZGluZyAgICAgICAgICAgICAgICAgICAvLyByZXNvbHZlciB3YW50cyBhIGZldGNoOyBuZXZlciByZW5kZXJlZCAocm91dGVzIHBhaW50IG9uY2UsIGFmdGVyIHRoZSBmZXRjaClcblx0TG9hZEZhaWxlZFxuXHRMb2FkTm90Rm91bmRcbilcblxudHlwZSBUT0NJdGVtIHN0cnVjdCB7XG5cdElEICAgIHN0cmluZ1xuXHRUZXh0ICBzdHJpbmdcblx0TGV2ZWwgaW50XG59XG5cbi8vIGNhY2hlZENvbnRlbnQgaXMgYSByZW5kZXJlZCByb3V0ZSBib2R5OyBhbiBlbXB0eSBIVE1MIGNvdW50cyBhcyBhIGNhY2hlIG1pc3MuXG50eXBlIGNhY2hlZENvbnRlbnQgc3RydWN0IHtcblx0SFRNTCBzdHJpbmdcblx0VE9DICBbXVRPQ0l0ZW1cbn1cblxuLy8gVmlld1N0YXRlIGlzIHRoZSBzdGF0ZSBvZiB0aGUgY3VycmVudCByb3V0ZSdzIGNvbnRlbnQgcmVnaW9uLlxuLy8gT25seSB0aGUgZmllbGQgbWF0Y2hpbmcgcm91dGUuS2luZCBpcyBwb3B1bGF0ZWQuIEFsd2F5cyBidWlsZCBpdCB3aXRoXG4vLyBuZXdWaWV3U3RhdGUoKTogYSBiYXJlIHN0cnVjdCBsaXRlcmFsIGxlYXZlcyBTdGF0dXMgYXMgbnVsbCwgbm90IExvYWRSZWFkeS5cbnR5cGUgVmlld1N0YXRlIHN0cnVjdCB7XG5cdFBvc3QgICAgIEJsb2dQb3N0XG5cdFByb2ogICAgIFByb2plY3QgLy8gbm90IGBQcm9qZWN0YDogYSBmaWVsZCBuYW1lZCBhZnRlciBpdHMgdHlwZSBicmVha3MgdGhlIGVtaXR0ZWQgY29uc3RydWN0b3Jcblx0UGFnZSAgICAgTmF2UGFnZVxuXHRIVE1MICAgICBzdHJpbmcgLy8gcmVuZGVyZWQgbWFya2Rvd24gZm9yIHBvc3QsIHJlYWRtZSBvciBwYWdlXG5cdFN0YXR1cyAgIExvYWRTdGF0dXNcblx0SGFzUHJldiAgYm9vbFxuXHRQcmV2UG9zdCBCbG9nUG9zdFxuXHRIYXNOZXh0ICBib29sXG5cdE5leHRQb3N0IEJsb2dQb3N0XG5cdFRPQyAgICAgIFtdVE9DSXRlbVxufVxuXG50eXBlIFNvY2lhbExpbmsgc3RydWN0IHtcblx0SWNvbiAgIHN0cmluZ1xuXHRIcmVmICAgc3RyaW5nXG5cdFRhcmdldCBzdHJpbmdcblx0UmVsICAgIHN0cmluZ1xufVxuXG50eXBlIFRoZW1lQ29sb3JzIHN0cnVjdCB7XG5cdFByaW1hcnkgICAgICAgc3RyaW5nXG5cdFNlY29uZGFyeSAgICAgc3RyaW5nXG5cdEJhY2tncm91bmQgICAgc3RyaW5nXG5cdFRleHQgICAgICAgICAgc3RyaW5nXG5cdFRleHRMaWdodCAgICAgc3RyaW5nXG5cdEJvcmRlciAgICAgICAgc3RyaW5nXG5cdEhvdmVyICAgICAgICAgc3RyaW5nXG5cdENvZGVUaGVtZSAgICAgc3RyaW5nXG5cdENvbW1lbnRzVGhlbWUgc3RyaW5nXG59XG5cbi8vIENvbW1lbnRzQ29uZmlnIGhvbGRzIHRoZSB0d28gcGFnZSB0b2dnbGVzOyBBdHRycyBpcyB0aGUgcmF3IGdpc2N1cyBjb25maWdcbi8vIG9iamVjdCB3aG9zZSBjYW1lbENhc2Uga2V5cyBtYXAgMToxIHRvIGRhdGEtKiBhdHRyaWJ1dGVzIG9uIHRoZSBjbGllbnQgc2NyaXB0LlxudHlwZSBDb21tZW50c0NvbmZpZyBzdHJ1Y3Qge1xuXHRCbG9nRW5hYmxlZCAgICAgYm9vbFxuXHRQcm9qZWN0c0VuYWJsZWQgYm9vbFxuXHRBdHRycyAgICAgICAgICAgYW55XG59XG5cbnR5cGUgRW1haWxKU0NvbmZpZyBzdHJ1Y3Qge1xuXHRFbmFibGVkICAgYm9vbFxuXHRTZXJ2aWNlSWQgc3RyaW5nXG5cdFRlbXBsYXRlSWQgc3RyaW5nXG5cdFB1YmxpY0tleSBzdHJpbmdcbn1cblxudHlwZSBTZWFyY2hDb25maWcgc3RydWN0IHtcblx0RW5hYmxlZCAgICAgYm9vbFxuXHRNaW5DaGFycyAgICBpbnRcblx0UGxhY2Vob2xkZXIgc3RyaW5nXG59XG5cbnR5cGUgU2l0ZUNvbmZpZyBzdHJ1Y3Qge1xuXHRUaXRsZSAgICAgICAgICBzdHJpbmdcblx0VXJsICAgICAgICAgICAgc3RyaW5nXG5cdERlc2NyaXB0aW9uICAgIHN0cmluZ1xuXHRBdXRob3IgICAgICAgICBzdHJpbmdcblx0R2l0aHViVXNlcm5hbWUgc3RyaW5nXG5cdERhcmtUaGVtZSAgICAgIFRoZW1lQ29sb3JzXG5cdExpZ2h0VGhlbWUgICAgIFRoZW1lQ29sb3JzXG5cdENvbW1lbnRzICAgICAgIENvbW1lbnRzQ29uZmlnXG5cdEVtYWlsSlMgICAgICAgIEVtYWlsSlNDb25maWdcblx0U2VhcmNoICAgICAgICAgU2VhcmNoQ29uZmlnXG5cdFNvY2lhbCAgICAgICAgIFtdU29jaWFsTGlua1xuXHRQb3N0c1BlclBhZ2UgICBpbnRcbn1cblxudHlwZSBTZWFyY2hSZXN1bHRJdGVtIHN0cnVjdCB7XG5cdElEICAgICAgICAgIHN0cmluZ1xuXHRUaXRsZSAgICAgICBzdHJpbmdcblx0RGVzY3JpcHRpb24gc3RyaW5nXG5cdFRhZ3MgICAgICAgIFtdc3RyaW5nXG5cdEl0ZW1UeXBlICAgIHN0cmluZ1xuXHRVcmwgICAgICAgICBzdHJpbmdcbn1cblxudHlwZSBDb250YWN0U3RhdGUgc3RydWN0IHtcblx0TmFtZSAgICAgICAgICAgc3RyaW5nXG5cdEVtYWlsICAgICAgICAgIHN0cmluZ1xuXHRNZXNzYWdlICAgICAgICBzdHJpbmdcblx0U3RhdHVzVGV4dCAgICAgc3RyaW5nXG5cdFN0YXR1c1R5cGUgICAgIHN0cmluZ1xuXHRCdXR0b25TdGF0ZSAgICBzdHJpbmdcblx0QnV0dG9uRGlzYWJsZWQgYm9vbFxuXHRFcnJOYW1lICAgICAgICBib29sXG5cdEVyckVtYWlsICAgICAgIGJvb2xcblx0RXJyTWVzc2FnZSAgICAgYm9vbFxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcImpzOi4vYnJvd3Nlci5kLnRzXCJcbmltcG9ydCBcInN0cmNvbnZcIlxuXG52YXIgYXBwUmVmcyA9IG1hcFtzdHJpbmddYW55e31cblxuLy8g4pSA4pSAIFJlZ2lvbiByZW5kZXJzIOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgOKUgFxuLy8gVGhlIGFwcCBzaGVsbCBpcyBtb3VudGVkIG9uY2UgaW4gbWFpbigpOyB0aGVzZSByZS1yZW5kZXIgb25seSB0aGVcbi8vIHJlZ2lvbiB0aGF0IGRlcGVuZHMgb24gdGhlIHN0YXRlIHRoYXQgY2hhbmdlZC5cblxuZnVuYyByZW5kZXJNYWluKCkge1xuXHRnb20uTW91bnQoXCIjY29udGVudC1zbG90XCIsIE1haW5Db250ZW50KCkpXG59XG5cbmZ1bmMgcmVuZGVyTmF2YmFyKCkge1xuXHRnb20uTW91bnQoXCIjbmF2YmFyLXNsb3RcIiwgTmF2YmFyKHJvdXRlLCBuYXZQYWdlcywgcHJvamVjdHMsIHByb2plY3RzRHJvcGRvd25PcGVuLCBtb2JpbGVNZW51T3Blbiwgc2l0ZSkpXG59XG5cbmZ1bmMgcmVuZGVyQ29udGFjdEZvcm0oKSB7XG5cdGdvbS5Nb3VudChcIiNjb250YWN0LWZvcm1cIiwgQ29udGFjdEZvcm1GaWVsZHMoY29udGFjdEZvcm0pKVxufVxuXG5mdW5jIHJlbmRlclJvdXRlKCkge1xuXHRyZW5kZXJOYXZiYXIoKVxuXHRyZW5kZXJNYWluKClcbn1cblxuLy8g4pSA4pSAIE92ZXJsYXkgcmVjb25jaWxpYXRpb24g4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSA4pSAXG5cbmZ1bmMgc2V0Q2xhc3Moc2VsZWN0b3Igc3RyaW5nLCBjbHMgc3RyaW5nLCBvbiBib29sKSB7XG5cdGVsIDo9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3Ioc2VsZWN0b3IpXG5cdGlmIGVsICE9IG5pbCB7XG5cdFx0ZWwuY2xhc3NMaXN0LnRvZ2dsZShjbHMsIG9uKVxuXHR9XG59XG5cbmZ1bmMgc2V0QXR0cihzZWxlY3RvciBzdHJpbmcsIG5hbWUgc3RyaW5nLCB2YWx1ZSBzdHJpbmcpIHtcblx0ZWwgOj0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihzZWxlY3Rvcilcblx0aWYgZWwgIT0gbmlsIHtcblx0XHRlbC5zZXRBdHRyaWJ1dGUobmFtZSwgdmFsdWUpXG5cdH1cbn1cblxuLy8gZm9jdXNMYXRlciBmb2N1c2VzIHRoZSBlbGVtZW50IG9uY2UgdGhlIG92ZXJsYXkncyBvcGVuIHRyYW5zaXRpb24gaGFzIHN0YXJ0ZWQuXG5mdW5jIGZvY3VzTGF0ZXIoc2VsZWN0b3Igc3RyaW5nKSB7XG5cdHNldFRpbWVvdXQoZnVuYygpIHtcblx0XHRlbCA6PSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKHNlbGVjdG9yKVxuXHRcdGlmIGVsICE9IG5pbCB7XG5cdFx0XHRlbC5mb2N1cygpXG5cdFx0fVxuXHR9LCA1MClcbn1cblxuLy8gc3luY092ZXJsYXlzIGFwcGxpZXMgb3ZlcmxheSBzdGF0ZSB0byB0aGUgZXhpc3RpbmcgZWxlbWVudHMgaW5zdGVhZCBvZlxuLy8gcmVtb3VudGluZyB0aGVtLCBzbyB0aGUgQ1NTIG1heC1oZWlnaHQva2V5ZnJhbWUgdHJhbnNpdGlvbnMgc3RpbGwgcGxheS5cbmZ1bmMgc3luY092ZXJsYXlzKCkge1xuXHRzZXRDbGFzcyhcIi5uYXZiYXItdG9nZ2xlXCIsIFwiYWN0aXZlXCIsIG1vYmlsZU1lbnVPcGVuKVxuXHRzZXRBdHRyKFwiLm5hdmJhci10b2dnbGVcIiwgXCJhcmlhLWV4cGFuZGVkXCIsIHN0cmNvbnYuRm9ybWF0Qm9vbChtb2JpbGVNZW51T3BlbikpXG5cdHNldENsYXNzKFwiLm5hdmJhci1jb2xsYXBzZVwiLCBcInNob3dcIiwgbW9iaWxlTWVudU9wZW4pXG5cblx0c2V0Q2xhc3MoXCIuZHJvcGRvd25cIiwgXCJzaG93XCIsIHByb2plY3RzRHJvcGRvd25PcGVuKVxuXHRzZXRBdHRyKFwiLmRyb3Bkb3duLXRvZ2dsZVwiLCBcImFyaWEtZXhwYW5kZWRcIiwgc3RyY29udi5Gb3JtYXRCb29sKHByb2plY3RzRHJvcGRvd25PcGVuKSlcblxuXHRzZXRDbGFzcyhcIiNzZWFyY2gtcGFnZVwiLCBcInNob3dcIiwgc2VhcmNoT3Blbilcblx0c2V0Q2xhc3MoXCIjc2VhcmNoLXBhZ2UtY2xlYXJcIiwgXCJzaG93XCIsIHNlYXJjaFF1ZXJ5ICE9IFwiXCIpXG5cdHNldENsYXNzKFwiI2NvbnRhY3QtbW9kYWxcIiwgXCJzaG93XCIsIGNvbnRhY3RPcGVuKVxufVxuXG4vLyByZXNldE92ZXJsYXlzIGNsb3NlcyBldmVyeSBvdmVybGF5IHdpdGhvdXQgYW5pbWF0aW9uICh1c2VkIG9uIHJvdXRlIGNoYW5nZSkuXG5mdW5jIHJlc2V0T3ZlcmxheXMoKSB7XG5cdG1vYmlsZU1lbnVPcGVuID0gZmFsc2Vcblx0cHJvamVjdHNEcm9wZG93bk9wZW4gPSBmYWxzZVxuXHRjb250YWN0T3BlbiA9IGZhbHNlXG5cdGlmIHNlYXJjaE9wZW4gfHwgc2VhcmNoUXVlcnkgIT0gXCJcIiB7XG5cdFx0c2VhcmNoT3BlbiA9IGZhbHNlXG5cdFx0c2V0U2VhcmNoUXVlcnkoXCJcIilcblx0fVxuXHRzeW5jT3ZlcmxheXMoKVxufVxuIiwicGFja2FnZSBtYWluXG5cbmltcG9ydCBcInN0cmluZ3NcIlxuXG4vLyBuZXdWaWV3U3RhdGUgcmV0dXJucyBhIFZpZXdTdGF0ZSB3aXRoIGV2ZXJ5IG5lc3RlZCBzbGljZSBpbml0aWFsaXNlZCBzb1xuLy8gdGVtcGwgYGxlbmAvYHJhbmdlYCBuZXZlciBzZWUgYSBuaWwgc2xpY2UuIFN0YXR1cyBpcyBzZXQgZXhwbGljaXRseSBiZWNhdXNlXG4vLyBuYW1lZC1pbnQgZmllbGRzIGNvbXBpbGUgdG8gbnVsbCwgbm90IDAuXG5mdW5jIG5ld1ZpZXdTdGF0ZSgpIFZpZXdTdGF0ZSB7XG5cdHJldHVybiBWaWV3U3RhdGV7XG5cdFx0UG9zdDogICAgIEJsb2dQb3N0e1RhZ3M6IFtdc3RyaW5ne319LFxuXHRcdFByb2o6ICAgICBQcm9qZWN0e1RhZ3M6IFtdc3RyaW5ne30sIFlvdXR1YmVWaWRlb3M6IFtdc3RyaW5ne30sIExpbmtzOiBbXVByb2plY3RMaW5re319LFxuXHRcdFN0YXR1czogICBMb2FkUmVhZHksXG5cdFx0UHJldlBvc3Q6IEJsb2dQb3N0e1RhZ3M6IFtdc3RyaW5ne319LFxuXHRcdE5leHRQb3N0OiBCbG9nUG9zdHtUYWdzOiBbXXN0cmluZ3t9fSxcblx0XHRUT0M6ICAgICAgW11UT0NJdGVte30sXG5cdH1cbn1cblxuLy8gZnJvbUNhY2hlIGNvcGllcyBhIGNhY2hlIGhpdCBpbnRvIHYgYW5kIHJlcG9ydHMgd2hldGhlciB0aGVyZSB3YXMgb25lLlxuZnVuYyBmcm9tQ2FjaGUodiAqVmlld1N0YXRlLCBjYWNoZSBtYXBbc3RyaW5nXWNhY2hlZENvbnRlbnQsIGtleSBzdHJpbmcpIGJvb2wge1xuXHRjLCBvayA6PSBjYWNoZVtrZXldXG5cdGlmICFvayB8fCBjLkhUTUwgPT0gXCJcIiB7XG5cdFx0cmV0dXJuIGZhbHNlXG5cdH1cblx0di5IVE1MID0gYy5IVE1MXG5cdHYuVE9DID0gYy5UT0Ncblx0cmV0dXJuIHRydWVcbn1cblxuLy8gcmVzb2x2ZVBvc3QgYnVpbGRzIHRoZSB2aWV3IGZvciBhIGJsb2cgcG9zdCBzbHVnLiBUaGUgYm9vbCByZXBvcnRzIHdoZXRoZXJcbi8vIHRoZSBtYXJrZG93biBzdGlsbCBoYXMgdG8gYmUgZmV0Y2hlZC5cbmZ1bmMgcmVzb2x2ZVBvc3Qoc2x1ZyBzdHJpbmcsIGFsbCBbXUJsb2dQb3N0LCBjYWNoZSBtYXBbc3RyaW5nXWNhY2hlZENvbnRlbnQpIChWaWV3U3RhdGUsIGJvb2wpIHtcblx0diA6PSBuZXdWaWV3U3RhdGUoKVxuXHRmb3IgaSwgcCA6PSByYW5nZSBhbGwge1xuXHRcdGlmIHAuU2x1ZyA9PSBzbHVnIHtcblx0XHRcdHYuUG9zdCA9IHBcblx0XHRcdGlmIGkrMSA8IGxlbihhbGwpIHtcblx0XHRcdFx0di5IYXNQcmV2ID0gdHJ1ZVxuXHRcdFx0XHR2LlByZXZQb3N0ID0gYWxsW2krMV1cblx0XHRcdH1cblx0XHRcdGlmIGkgPiAwIHtcblx0XHRcdFx0di5IYXNOZXh0ID0gdHJ1ZVxuXHRcdFx0XHR2Lk5leHRQb3N0ID0gYWxsW2ktMV1cblx0XHRcdH1cblx0XHRcdGlmIGZyb21DYWNoZSgmdiwgY2FjaGUsIHAuSHJlZikge1xuXHRcdFx0XHRyZXR1cm4gdiwgZmFsc2Vcblx0XHRcdH1cblx0XHRcdHYuU3RhdHVzID0gTG9hZFBlbmRpbmdcblx0XHRcdHJldHVybiB2LCB0cnVlXG5cdFx0fVxuXHR9XG5cdHYuU3RhdHVzID0gTG9hZE5vdEZvdW5kXG5cdHJldHVybiB2LCBmYWxzZVxufVxuXG4vLyByZXNvbHZlUHJvamVjdCBidWlsZHMgdGhlIHZpZXcgZm9yIGEgcHJvamVjdCBpZC4gUHJvamVjdHMgd2l0aG91dCBhIEdpdEh1YlxuLy8gcmVwbyBhcmUgcmVhZHkgaW1tZWRpYXRlbHk7IG90aGVyd2lzZSB0aGUgUkVBRE1FIGNhY2hlIGRlY2lkZXMuXG5mdW5jIHJlc29sdmVQcm9qZWN0KGlkIHN0cmluZywgYWxsIFtdUHJvamVjdCwgY2FjaGUgbWFwW3N0cmluZ11jYWNoZWRDb250ZW50KSAoVmlld1N0YXRlLCBib29sKSB7XG5cdHYgOj0gbmV3Vmlld1N0YXRlKClcblx0Zm9yIF8sIHAgOj0gcmFuZ2UgYWxsIHtcblx0XHRpZiBwLklEID09IGlkIHtcblx0XHRcdHYuUHJvaiA9IHBcblx0XHRcdGlmIHAuR2l0aHViUmVwbyA9PSBcIlwiIHtcblx0XHRcdFx0di5UT0MgPSBleHRyYWN0UHJvamVjdFRPQyhcIlwiLCBwKVxuXHRcdFx0XHRyZXR1cm4gdiwgZmFsc2Vcblx0XHRcdH1cblx0XHRcdGlmIGZyb21DYWNoZSgmdiwgY2FjaGUsIHAuSHJlZikge1xuXHRcdFx0XHRyZXR1cm4gdiwgZmFsc2Vcblx0XHRcdH1cblx0XHRcdHYuU3RhdHVzID0gTG9hZFBlbmRpbmdcblx0XHRcdHJldHVybiB2LCB0cnVlXG5cdFx0fVxuXHR9XG5cdHYuU3RhdHVzID0gTG9hZE5vdEZvdW5kXG5cdHJldHVybiB2LCBmYWxzZVxufVxuXG4vLyByZXNvbHZlUGFnZSBidWlsZHMgdGhlIHZpZXcgZm9yIGEgY3VzdG9tIHBhZ2UgaWQuIFVua25vd24gaWRzIHN0aWxsIGZldGNoLFxuLy8gc28gdGhlIG1hcmtkb3duIGZpbGUgKG9yIGl0cyA0MDQpIGlzIHRoZSBzb3VyY2Ugb2YgdHJ1dGguXG5mdW5jIHJlc29sdmVQYWdlKGlkIHN0cmluZywgYWxsIFtdTmF2UGFnZSwgY2FjaGUgbWFwW3N0cmluZ11jYWNoZWRDb250ZW50KSAoVmlld1N0YXRlLCBib29sKSB7XG5cdHYgOj0gbmV3Vmlld1N0YXRlKClcblx0di5QYWdlID0gTmF2UGFnZXtJRDogaWQsIFRpdGxlOiBpZCwgSHJlZjogbmF2UGFnZUhyZWYoaWQpfVxuXHRmb3IgXywgcCA6PSByYW5nZSBhbGwge1xuXHRcdGlmIHAuSUQgPT0gaWQge1xuXHRcdFx0di5QYWdlID0gcFxuXHRcdFx0YnJlYWtcblx0XHR9XG5cdH1cblx0aWYgdi5QYWdlLlRpdGxlID09IFwiXCIge1xuXHRcdHYuUGFnZS5UaXRsZSA9IGlkXG5cdH1cblx0aWYgZnJvbUNhY2hlKCZ2LCBjYWNoZSwgdi5QYWdlLkhyZWYpIHtcblx0XHRyZXR1cm4gdiwgZmFsc2Vcblx0fVxuXHR2LlN0YXR1cyA9IExvYWRQZW5kaW5nXG5cdHJldHVybiB2LCB0cnVlXG59XG5cbmZ1bmMgcmVhZG1lVVJMKHAgUHJvamVjdCwgZ2l0aHViVXNlcm5hbWUgc3RyaW5nKSBzdHJpbmcge1xuXHRyZXBvIDo9IHAuR2l0aHViUmVwb1xuXHRpZiAhc3RyaW5ncy5Db250YWlucyhyZXBvLCBcIi9cIikge1xuXHRcdHJlcG8gPSBnaXRodWJVc2VybmFtZSArIFwiL1wiICsgcmVwb1xuXHR9XG5cdGJyYW5jaCA6PSBwLkdpdGh1YkJyYW5jaFxuXHRpZiBicmFuY2ggPT0gXCJcIiB7XG5cdFx0YnJhbmNoID0gXCJtYWluXCJcblx0fVxuXHRyZXR1cm4gXCJodHRwczovL3Jhdy5naXRodWJ1c2VyY29udGVudC5jb20vXCIgKyByZXBvICsgXCIvXCIgKyBicmFuY2ggKyBcIi9SRUFETUUubWRcIlxufVxuIl19
