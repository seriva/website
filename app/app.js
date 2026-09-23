var __len = __len || function(a) {
  if (a && typeof a === 'object' && !Array.isArray(a)) return Object.keys(a).length;
  return a?.length ?? 0;
};
var __append = __append || function(a, ...b) { return a ? [...a, ...b] : b; };

class StackEntry {
  constructor({ Obj = null, Indent = 0, Key = "" } = {}) {
    this.Obj = Obj;
    this.Indent = Indent;
    this.Key = Key;
  }
}

function parseValue(str) {
  let value = str.trim();
  if (value.startsWith("'") && value.slice(1).includes("'") || value.startsWith("\"") && value.slice(1).includes("\"")) {
    let quote = value.slice(0, 1);
    let endIdx = value.slice(1).indexOf(quote);
    if (endIdx !== -1) {
      let quotedPart = value.slice(0, endIdx + 2);
      let afterQuote = value.slice(endIdx + 2);
      let commentIdx = afterQuote.indexOf("#");
      if (commentIdx !== -1) {
        value = quotedPart + afterQuote.slice(0, commentIdx);
      }
    }
  } else {
    let commentIdx = value.indexOf("#");
    if (commentIdx !== -1) {
      value = value.slice(0, commentIdx);
    }
  }
  value = value.trim();
  if (value.startsWith("[") && value.endsWith("]")) {
    let rawJson = value.replaceAll("'", "\"");
    return JSON.parse(rawJson);
  }
  if (value.startsWith("\"") && value.endsWith("\"") || value.startsWith("'") && value.endsWith("'")) {
    if (__len(value) >= 2) {
      return value.slice(1, __len(value) - 1);
    }
  }
  if (value === "true") {
    return true;
  }
  if (value === "false") {
    return false;
  }
  if (value === "null" || value === "Null" || value === "NULL" || value === "~") {
    return null;
  }
  if (value !== "" && !isNaN(Number(value))) {
    return Number(value);
  }
  return value;
}

function ParseYAML(yamlText) {
  if (yamlText === "") {
    return {  };
  }
  let lines = yamlText.split("\n");
  let root = {  };
  let stack = [new StackEntry({ Obj: root, Indent: -1, Key: "" })];
  for (let i = 0; i < __len(lines); i++) {
    let line = lines[i];
    let trimmed = line.trim();
    if (trimmed === "" || trimmed.startsWith("#")) {
      continue;
    }
    let indent = 0;
    while (indent < __len(line) && line.charCodeAt(indent) === 32 || line.charCodeAt(indent) === 9) {
      indent++;
    }
    let isArrayItem = trimmed.startsWith("- ");
    while (__len(stack) > 1 && indent <= stack[__len(stack) - 1].Indent) {
      stack = stack.slice(0, __len(stack) - 1);
    }
    let parent = stack[__len(stack) - 1];
    if (isArrayItem) {
      let content = trimmed.slice(2).trim();
      if (content.includes(":")) {
        let obj = {  };
        parent.Obj.push(obj);
        stack = __append(stack, new StackEntry({ Obj: obj, Indent: indent, Key: "" }));
        let colonIdx = content.indexOf(":");
        let key = content.slice(0, colonIdx).trim();
        let valStr = content.slice(colonIdx + 1).trim();
        if (valStr !== "") {
          obj[key] = parseValue(valStr);
        }
      } else {
        parent.Obj.push(parseValue(content));
      }
    } else if (trimmed.includes(":")) {
      let colonIdx = trimmed.indexOf(":");
      let key = trimmed.slice(0, colonIdx).trim();
      if (key.startsWith("\"") && key.endsWith("\"") || key.startsWith("'") && key.endsWith("'")) {
        key = key.slice(1, __len(key) - 1);
      }
      let valStr = trimmed.slice(colonIdx + 1).trim();
      if (valStr !== "") {
        parent.Obj[key] = parseValue(valStr);
      } else {
        let isArray = false;
        for (let j = i + 1; j < __len(lines); j++) {
          let nextTrimmed = lines[j].trim();
          if (nextTrimmed === "" || nextTrimmed.startsWith("#")) {
            continue;
          }
          isArray = nextTrimmed.startsWith("- ");
          break;
        }
        if (isArray) {
          let arr = [];
          parent.Obj[key] = arr;
          stack = __append(stack, new StackEntry({ Obj: arr, Indent: indent, Key: key }));
        } else {
          let nested = {  };
          parent.Obj[key] = nested;
          stack = __append(stack, new StackEntry({ Obj: nested, Indent: indent, Key: key }));
        }
      }
    }
  }
  return root;
}

var __len = __len || function(a) {
  if (a && typeof a === 'object' && !Array.isArray(a)) return Object.keys(a).length;
  return a?.length ?? 0;
};
var __append = __append || function(a, ...b) { return a ? [...a, ...b] : b; };
var __s = __s || function(a) { return a || []; };
var __sprintf = __sprintf || function(f, ...a) {
  let i = 0;
  return f.replace(/%([#+\- 0]*)([0-9]*)\.?([0-9]*)[sdvftxXqobeEgGw%]/g, (m) => {
    if (m === "%%") return "%";
    const verb = m.slice(-1);
    const v = a[i++];
    const [, flags, width, prec] = m.match(/^%([#+\- 0]*)([0-9]*)\.?([0-9]*)/) || [];
    const zero = flags?.includes("0") && !flags?.includes("-");
    const pad = (s, w, z) => {
      w = parseInt(w) || 0;
      if (!w) return s;
      const p = (z ? "0" : " ").repeat(Math.max(0, w - s.length));
      return flags.includes("-") ? s + p : p + s;
    };
    switch (verb) {
      case "s": return pad(String(v == null ? "<nil>" : v), width, false);
      case "d": return pad(String(Math.trunc(Number(v))), width, zero);
      case "v": {
        if (typeof v === "object" && v !== null) {
          if ("re" in v && "im" in v) {
            const sign = v.im >= 0 ? "+" : "";
            return pad("(" + v.re + sign + v.im + "i)", width, false);
          }
          if (typeof v.Error === "function") {
            return pad(String(v.Error()), width, false);
          }
          try {
            return pad(JSON.stringify(v), width, false);
          } catch {
            return pad(String(v), width, false);
          }
        }
        return pad(String(v == null ? "<nil>" : v), width, false);
      }
      case "f": { const n = Number(v), p = prec !== "" ? parseInt(prec) : 6; return pad(n.toFixed(p), width, zero); }
      case "t": return pad(String(!!v), width, false);
      case "x": return pad((Number(v) >>> 0).toString(16), width, zero);
      case "X": return pad((Number(v) >>> 0).toString(16).toUpperCase(), width, zero);
      case "o": return pad((Number(v) >>> 0).toString(8), width, zero);
      case "b": return pad((Number(v) >>> 0).toString(2), width, zero);
      case "q": return pad('"' + String(v == null ? "" : v).replace(/\\/g, "\\\\").replace(/"/g, '\\"') + '"', width, false);
      case "e": case "E": { const n = Number(v), p = prec !== "" ? parseInt(prec) : 6; return pad(n.toExponential(p), width, zero); }
      case "g": case "G": { const n = Number(v); return pad(prec !== "" ? n.toPrecision(parseInt(prec)) : String(n), width, zero); }
      case "w": return pad(String(v == null ? "<nil>" : typeof v === "object" && v.Error ? v.Error() : v), width, false);
      default: return m;
    }
  });
};
var __error = __error || function(msg, cause) {
  return { Error() { return msg; }, toString() { return msg; }, _msg: msg, _cause: cause ?? null };
};

class iconDef {
  constructor({ ViewBox = "", Path = "" } = {}) {
    this.ViewBox = ViewBox;
    this.Path = Path;
  }
}

// type Route = int

class RouteMatch {
  constructor({ Kind = null, Param = "", Page = 0 } = {}) {
    this.Kind = Kind;
    this.Param = Param;
    this.Page = Page;
  }
}

class ProjectLink {
  constructor({ Title = "", Icon = "", Href = "" } = {}) {
    this.Title = Title;
    this.Icon = Icon;
    this.Href = Href;
  }
}

class Project {
  constructor({ ID = "", Title = "", Description = "", Tags = null, Order = 0, GithubRepo = "", GithubBranch = "", DemoUrl = "", DemoLabel = "", DemoInstructions = "", DemoHeight = "", DemoFullscreen = false, YoutubeVideos = null, Links = null, Href = "" } = {}) {
    this.ID = ID;
    this.Title = Title;
    this.Description = Description;
    this.Tags = Tags;
    this.Order = Order;
    this.GithubRepo = GithubRepo;
    this.GithubBranch = GithubBranch;
    this.DemoUrl = DemoUrl;
    this.DemoLabel = DemoLabel;
    this.DemoInstructions = DemoInstructions;
    this.DemoHeight = DemoHeight;
    this.DemoFullscreen = DemoFullscreen;
    this.YoutubeVideos = YoutubeVideos;
    this.Links = Links;
    this.Href = Href;
  }
}

class BlogPost {
  constructor({ ID = "", Slug = "", Title = "", Date = "", Excerpt = "", Tags = null, Filename = "", Href = "" } = {}) {
    this.ID = ID;
    this.Slug = Slug;
    this.Title = Title;
    this.Date = Date;
    this.Excerpt = Excerpt;
    this.Tags = Tags;
    this.Filename = Filename;
    this.Href = Href;
  }
}

class NavPage {
  constructor({ ID = "", Title = "", Order = 0, ShowInNav = false, Href = "" } = {}) {
    this.ID = ID;
    this.Title = Title;
    this.Order = Order;
    this.ShowInNav = ShowInNav;
    this.Href = Href;
  }
}

// type LoadStatus = int

class ViewState {
  constructor({ Post = new BlogPost(), Proj = new Project(), Page = new NavPage(), HTML = "", Status = null } = {}) {
    this.Post = Post;
    this.Proj = Proj;
    this.Page = Page;
    this.HTML = HTML;
    this.Status = Status;
  }
}

class SocialLink {
  constructor({ Icon = "", Href = "", Target = "", Rel = "" } = {}) {
    this.Icon = Icon;
    this.Href = Href;
    this.Target = Target;
    this.Rel = Rel;
  }
}

class ThemeColors {
  constructor({ Primary = "", Secondary = "", Background = "", Text = "", TextLight = "", Border = "", Hover = "", CodeTheme = "", CommentsTheme = "" } = {}) {
    this.Primary = Primary;
    this.Secondary = Secondary;
    this.Background = Background;
    this.Text = Text;
    this.TextLight = TextLight;
    this.Border = Border;
    this.Hover = Hover;
    this.CodeTheme = CodeTheme;
    this.CommentsTheme = CommentsTheme;
  }
}

class CommentsConfig {
  constructor({ BlogEnabled = false, ProjectsEnabled = false, Repo = "", RepoId = "", Category = "", CategoryId = "", Mapping = "", Strict = "", ReactionsEnabled = "", EmitMetadata = "", InputPosition = "", Lang = "" } = {}) {
    this.BlogEnabled = BlogEnabled;
    this.ProjectsEnabled = ProjectsEnabled;
    this.Repo = Repo;
    this.RepoId = RepoId;
    this.Category = Category;
    this.CategoryId = CategoryId;
    this.Mapping = Mapping;
    this.Strict = Strict;
    this.ReactionsEnabled = ReactionsEnabled;
    this.EmitMetadata = EmitMetadata;
    this.InputPosition = InputPosition;
    this.Lang = Lang;
  }
}

class EmailJSConfig {
  constructor({ Enabled = false, ServiceId = "", TemplateId = "", PublicKey = "" } = {}) {
    this.Enabled = Enabled;
    this.ServiceId = ServiceId;
    this.TemplateId = TemplateId;
    this.PublicKey = PublicKey;
  }
}

class SearchConfig {
  constructor({ Enabled = false, MinChars = 0, Placeholder = "" } = {}) {
    this.Enabled = Enabled;
    this.MinChars = MinChars;
    this.Placeholder = Placeholder;
  }
}

class SiteConfig {
  constructor({ Title = "", Description = "", Author = "", GithubUsername = "", DarkTheme = new ThemeColors(), LightTheme = new ThemeColors(), Comments = new CommentsConfig(), EmailJS = new EmailJSConfig(), Search = new SearchConfig(), Social = null, PostsPerPage = 0 } = {}) {
    this.Title = Title;
    this.Description = Description;
    this.Author = Author;
    this.GithubUsername = GithubUsername;
    this.DarkTheme = DarkTheme;
    this.LightTheme = LightTheme;
    this.Comments = Comments;
    this.EmailJS = EmailJS;
    this.Search = Search;
    this.Social = Social;
    this.PostsPerPage = PostsPerPage;
  }
}

class SearchResultItem {
  constructor({ ID = "", Title = "", Description = "", Tags = null, ItemType = "", Url = "" } = {}) {
    this.ID = ID;
    this.Title = Title;
    this.Description = Description;
    this.Tags = Tags;
    this.ItemType = ItemType;
    this.Url = Url;
  }
}

class ContactState {
  constructor({ Name = "", Email = "", Message = "", StatusText = "", StatusType = "", ButtonState = "", ButtonDisabled = false, ErrName = false, ErrEmail = false, ErrMessage = false } = {}) {
    this.Name = Name;
    this.Email = Email;
    this.Message = Message;
    this.StatusText = StatusText;
    this.StatusType = StatusType;
    this.ButtonState = ButtonState;
    this.ButtonDisabled = ButtonDisabled;
    this.ErrName = ErrName;
    this.ErrEmail = ErrEmail;
    this.ErrMessage = ErrMessage;
  }
}

let contactClosing = false;

let iconAliases = { "angle-double-left": "angles-left", "angle-double-right": "angles-right" };

let icons = { "sun": new iconDef({ ViewBox: "0 0 512 512", Path: "M361.5 1.2c5 2.1 8.6 6.6 9.6 11.9L391 121l107.9 19.8c5.3 1 9.8 4.6 11.9 9.6s1.5 10.7-1.6 15.2L446.9 256l62.3 90.3c3.1 4.5 3.7 10.2 1.6 15.2s-6.6 8.6-11.9 9.6L391 391 371.1 498.9c-1 5.3-4.6 9.8-9.6 11.9s-10.7 1.5-15.2-1.6L256 446.9l-90.3 62.3c-4.5 3.1-10.2 3.7-15.2 1.6s-8.6-6.6-9.6-11.9L121 391 13.1 371.1c-5.3-1-9.8-4.6-11.9-9.6s-1.5-10.7 1.6-15.2L65.1 256 2.8 165.7c-3.1-4.5-3.7-10.2-1.6-15.2s6.6-8.6 11.9-9.6L121 121l19.8-107.9c1-5.3 4.6-9.8 9.6-11.9s10.7-1.5 15.2 1.6L256 65.1 346.3 2.8c4.5-3.1 10.2-3.7 15.2-1.6zM160 256a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zm224 0a128 128 0 1 0 -256 0 128 128 0 1 0 256 0z" }), "moon": new iconDef({ ViewBox: "0 0 384 512", Path: "M223.5 32C100 32 0 132.3 0 256S100 480 223.5 480c60.6 0 115.5-24.2 155.8-63.4c5-4.9 6.3-12.5 3.1-18.7s-10.1-9.7-17-8.5c-9.8 1.7-19.8 2.6-30.1 2.6c-96.9 0-175.5-78.8-175.5-176c0-65.8 36-123.1 89.3-153.3c6.1-3.5 9.2-10.5 7.7-17.3s-7.3-11.9-14.3-12.5c-6.3-.5-12.6-.8-19-.8z" }), "search": new iconDef({ ViewBox: "0 0 512 512", Path: "M416 208c0 45.9-14.9 88.3-40 122.7L502.6 457.4c12.5 12.5 12.5 32.8 0 45.3s-32.8 12.5-45.3 0L330.7 376c-34.4 25.2-76.8 40-122.7 40C93.1 416 0 322.9 0 208S93.1 0 208 0S416 93.1 416 208zM208 352a144 144 0 1 0 0-288 144 144 0 1 0 0 288z" }), "envelope": new iconDef({ ViewBox: "0 0 512 512", Path: "M48 64C21.5 64 0 85.5 0 112c0 15.1 7.1 29.3 19.2 38.4L236.8 313.6c11.4 8.5 27 8.5 38.4 0L492.8 150.4c12.1-9.1 19.2-23.3 19.2-38.4c0-26.5-21.5-48-48-48H48zM0 176V384c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V176L294.4 339.2c-22.8 17.1-54 17.1-76.8 0L0 176z" }), "download": new iconDef({ ViewBox: "0 0 512 512", Path: "M288 32c0-17.7-14.3-32-32-32s-32 14.3-32 32V274.7l-73.4-73.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l128 128c12.5 12.5 32.8 12.5 45.3 0l128-128c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L288 274.7V32zM64 352c-35.3 0-64 28.7-64 64v32c0 35.3 28.7 64 64 64H448c35.3 0 64-28.7 64-64V416c0-35.3-28.7-64-64-64H64zm280 60a24 24 0 1 1 0 48 24 24 0 1 1 0-48z" }), "cube": new iconDef({ ViewBox: "0 0 512 512", Path: "M234.5 5.7c13.9-5 29.1-5 43.1 0l192 68.6C495 83.4 512 107.5 512 134.6V377.4c0 27-17 51.2-42.5 60.3l-192 68.6c-13.9 5-29.1 5-43.1 0l-192-68.6C17 428.6 0 404.5 0 377.4V134.6c0-27 17-51.2 42.5-60.3l192-68.6zM256 66L82.3 128 256 190l173.7-62L256 66zm32 368.6l192-68.6V135.4L288 204v230.6z" }), "calendar": new iconDef({ ViewBox: "0 0 448 512", Path: "M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H64C28.7 64 0 92.7 0 128v16 48V448c0 35.3 28.7 64 64 64H384c35.3 0 64-28.7 64-64V192 144 128c0-35.3-28.7-64-64-64H344V24c0-13.3-10.7-24-24-24s-24 10.7-24 24V64H152V24zM48 192H400V448c0 8.8-7.2 16-16 16H64c-8.8 0-16-7.2-16-16V192z" }), "github": new iconDef({ ViewBox: "0 0 496 512", Path: "M165.9 397.4c0 2-2.3 3.6-5.2 3.6-3.3 .3-5.6-1.3-5.6-3.6 0-2 2.3-3.6 5.2-3.6 3-.3 5.6 1.3 5.6 3.6zm-31.1-4.5c-.7 2 1.3 4.3 4.3 4.9 2.6 1 5.6 0 6.2-2s-1.3-4.3-4.3-5.2c-2.6-.7-5.5 .3-6.2 2.3zm44.2-1.7c-2.9 .7-4.9 2.6-4.6 4.9 .3 2 2.9 3.3 5.9 2.6 2.9-.7 4.9-2.6 4.6-4.6-.3-1.9-3-3.2-5.9-2.9zM244.8 8C106.1 8 0 113.3 0 252c0 110.9 69.8 205.8 169.5 239.2 12.8 2.3 17.3-5.6 17.3-12.1 0-6.2-.3-40.4-.3-61.4 0 0-70 15-84.7-29.8 0 0-11.4-29.1-27.8-36.6 0 0-22.9-15.7 1.6-15.4 0 0 24.9 2 38.6 25.8 21.9 38.6 58.6 27.5 72.9 21 2.3-16.8 8.8-27.1 16-33.7-55.9-6.2-112.3-14.3-112.3-110.5 0-27.5 7.6-41.3 23.6-58.9-2.6-6.5-11.1-33.3 2.6-67.9 20.9-6.5 69 27 69 27 20-5.6 41.5-8.5 62.8-8.5s42.8 2.9 62.8 8.5c0 0 48.1-33.6 69-27 13.7 34.7 5.2 61.4 2.6 67.9 16 17.7 25.8 31.5 25.8 58.9 0 96.5-58.9 104.2-114.8 110.5 9.2 7.9 17 22.9 17 46.4 0 33.7-.3 75.4-.3 83.6 0 6.5 4.6 14.4 17.3 12.1C428.2 457.8 496 362.9 496 252 496 113.3 383.5 8 244.8 8zM97.2 352.9c-1.3 1-1 3.3 .7 5.2 1.6 1.6 3.9 2.3 5.2 1 1.3-1 1-3.3-.7-5.2-1.6-1.6-3.9-2.3-5.2-1zm-10.8-8.1c-.7 1.3 .3 2.9 2.3 3.9 1.6 1 3.6 .7 4.3-.7 .7-1.3-.3-2.9-2.3-3.9-2-.6-3.6-.3-4.3 .7zm32.4 35.6c-1.6 1.3-1 4.3 1.3 6.2 2.3 2.3 5.2 2.6 6.5 1 1.3-1.3 .7-4.3-1.3-6.2-2.2-2.3-5.2-2.6-6.5-1zm-11.4-14.7c-1.6 1-1.6 3.6 0 5.9 1.6 2.3 4.3 3.3 5.6 2.3 1.6-1.3 1.6-3.9 0-6.2-1.4-2.3-4-3.3-5.6-2z" }), "youtube": new iconDef({ ViewBox: "0 0 576 512", Path: "M549.7 124.1c-6.3-23.7-24.8-42.3-48.3-48.6C458.8 64 288 64 288 64S117.2 64 74.6 75.5c-23.5 6.3-42 24.9-48.3 48.6-11.4 42.9-11.4 132.3-11.4 132.3s0 89.4 11.4 132.3c6.3 23.7 24.8 41.5 48.3 47.8C117.2 448 288 448 288 448s170.8 0 213.4-11.5c23.5-6.3 42-24.2 48.3-47.8 11.4-42.9 11.4-132.3 11.4-132.3s0-89.4-11.4-132.3zm-317.5 213.5V175.2l142.7 81.2-142.7 81.2z" }), "linkedin": new iconDef({ ViewBox: "0 0 448 512", Path: "M416 32H31.9C14.3 32 0 46.5 0 64.3v383.4C0 465.5 14.3 480 31.9 480H416c17.6 0 32-14.5 32-32.3V64.3c0-17.8-14.4-32.3-32-32.3zM135.4 416H69V202.2h66.5V416zm-33.2-243c-21.3 0-38.5-17.3-38.5-38.5S80.9 96 102.2 96c21.2 0 38.5 17.3 38.5 38.5 0 21.3-17.2 38.5-38.5 38.5zm282.1 243h-66.4V312c0-24.8-.5-56.7-34.5-56.7-34.6 0-39.9 27-39.9 54.9V416h-66.4V202.2h63.7v29.2h.9c8.9-16.8 30.6-34.5 62.9-34.5 67.2 0 79.7 44.3 79.7 101.9V416z" }), "chevron-down": new iconDef({ ViewBox: "0 0 512 512", Path: "M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z" }), "chevron-up": new iconDef({ ViewBox: "0 0 512 512", Path: "M233.4 105.4c12.5-12.5 32.8-12.5 45.3 0l192 192c12.5 12.5 12.5 32.8 0 45.3s-32.8-12.5-45.3 0L256 173.3 86.6 342.6c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3l192-192z" }), "chevron-left": new iconDef({ ViewBox: "0 0 320 512", Path: "M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l192 192c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L77.3 256 246.6 86.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-192 192z" }), "chevron-right": new iconDef({ ViewBox: "0 0 320 512", Path: "M310.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-192 192c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L242.7 256 73.4 86.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l192 192z" }), "angles-left": new iconDef({ ViewBox: "0 0 512 512", Path: "M41.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.3 256 246.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160zm352-160l-160 160c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L301.3 256 438.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0z" }), "angles-right": new iconDef({ ViewBox: "0 0 512 512", Path: "M470.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 256 265.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160zm-352 160l160-160c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L210.7 256 73.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0z" }), "times": new iconDef({ ViewBox: "0 0 384 512", Path: "M324.5 411.1c6.2 6.2 16.4 6.2 22.6 0s6.2-16.4 0-22.6L214.6 256 347.1 123.5c6.2-6.2 6.2-16.4 0-22.6s-16.4-6.2-22.6 0L192 233.4 59.5 100.9c-6.2-6.2-16.4-6.2-22.6 0s-6.2 16.4 0 22.6L169.4 256 36.9 388.5c-6.2 6.2-6.2 16.4 0 22.6s16.4 6.2 22.6 0L192 278.6 324.5 411.1z" }), "arrow-left": new iconDef({ ViewBox: "0 0 448 512", Path: "M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z" }), "expand": new iconDef({ ViewBox: "0 0 448 512", Path: "M32 32C14.3 32 0 46.3 0 64v96c0 17.7 14.3 32 32 32s32-14.3 32-32V96h64c17.7 0 32-14.3 32-32s-14.3-32-32-32H32zM64 352c0-17.7-14.3-32-32-32S0 334.3 0 352v96c0 17.7 14.3 32 32 32h96c17.7 0 32-14.3 32-32s-14.3-32-32-32H64V352zM352 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h64v64c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H352zM320 352c0-17.7 14.3-32 32-32s32 14.3 32 32v64h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H384c-17.7 0-32-14.3-32-32V352z" }) };

let isInitialRoute = true;

let routeSeq = 0;

let fuseInstance = null;

let searchDebounceTimer = null;

let searchClosing = false;

let site = new SiteConfig({ Social: [] });

let posts = [];

let projects = [];

let navPages = [];

let translations = {  };

let route = new RouteMatch({ Page: 1 });

let currentTheme = "dark";

let mobileMenuOpen = false;

let projectsDropdownOpen = false;

let searchOpen = false;

let searchQuery = "";

let searchResults = [];

let contactOpen = false;

let contactForm = new ContactState();

let view = new ViewState();

let readmeCache = {  };

let postHtmlCache = {  };

let pageHtmlCache = {  };

const themeStorageKey = "theme-preference";

const RouteBlog = 0;
const RoutePost = 1;
const RouteProject = 2;
const RoutePage = 3;

const LoadReady = 0;
const LoadPending = 1;
const LoadFailed = 2;
const LoadNotFound = 3;

function RouteView(r) {
  return {Mount(___p) {
    switch (r.Kind) {
      case RoutePost: {
        (BlogPostView(view, site.Comments.BlogEnabled)).Mount(___p);
      break; }
      case RouteProject: {
        (ProjectDetail(view, site.Comments.ProjectsEnabled)).Mount(___p);
      break; }
      case RoutePage: {
        (PageView(view)).Mount(___p);
      break; }
      default: {
        (BlogList(posts, r.Page, site.PostsPerPage)).Mount(___p);
      break; }
    }
  }};
}

function MainContent() {
  return {Mount(___p) {
    const ___e1 = document.createElement("main");
    ___e1.setAttribute("id", "main-content");
    (RouteView(route)).Mount(___e1);
    ___p.appendChild(___e1);
  }};
}

function AppShell() {
  return {Mount(___p) {
    const ___e2 = document.createElement("div");
    ___e2.className = "app-root";
    const ___e3 = document.createElement("div");
    ___e3.setAttribute("id", "navbar-slot");
    (Navbar(route, navPages, projects, projectsDropdownOpen, mobileMenuOpen, site)).Mount(___e3);
    ___e2.appendChild(___e3);
    const ___e4 = document.createElement("div");
    ___e4.setAttribute("id", "content-slot");
    (MainContent()).Mount(___e4);
    ___e2.appendChild(___e4);
    (Footer(currentYear(), site.Author)).Mount(___e2);
    (SearchModal(searchOpen, searchClosing, searchQuery, searchResults, searchPlaceholderText())).Mount(___e2);
    (ContactModal(contactOpen, contactClosing, contactForm)).Mount(___e2);
    ___p.appendChild(___e2);
  }};
}

function BlogPostCard(post, index) {
  return {Mount(___p) {
    const ___e5 = document.createElement("article");
    ___e5.className = "blog-post-card";
    ___e5.setAttribute("data-index", String(index));
    ___e5.setAttribute("data-action", "open-post");
    ___e5.setAttribute("data-href", String(post.Href));
    ___e5.setAttribute("tabindex", "0");
    ___e5.setAttribute("role", "article");
    ___e5.setAttribute("aria-label", String(post.Title));
    const ___e6 = document.createElement("h2");
    ___e6.className = "blog-post-title";
    const ___e7 = document.createElement("a");
    ___e7.setAttribute("href", String(post.Href));
    ___e7.setAttribute("data-action", "nav");
    ___e7.appendChild(document.createTextNode(String(post.Title)));
    ___e6.appendChild(___e7);
    ___e5.appendChild(___e6);
    const ___e8 = document.createElement("div");
    ___e8.className = "blog-post-meta";
    const ___e9 = document.createElement("span");
    ___e9.className = "blog-post-date";
    (Icon("calendar", "1rem")).Mount(___e9);
    ___e9.appendChild(document.createTextNode(String(" " + post.Date)));
    ___e8.appendChild(___e9);
    if (__len(post.Tags) > 0) {
      const ___e10 = document.createElement("span");
      ___e10.className = "blog-post-tags";
      for (const tag of post.Tags) {
        const ___e11 = document.createElement("span");
        ___e11.className = "item-tag clickable-tag";
        ___e11.setAttribute("data-search-tag", String(tag));
        ___e11.appendChild(document.createTextNode(String(tag)));
        ___e10.appendChild(___e11);
      }
      ___e8.appendChild(___e10);
    }
    ___e5.appendChild(___e8);
    const ___e12 = document.createElement("p");
    ___e12.className = "blog-post-excerpt";
    ___e12.appendChild(document.createTextNode(String(post.Excerpt)));
    ___e5.appendChild(___e12);
    ___p.appendChild(___e5);
  }};
}

function Pagination(currentPage, totalPages) {
  return {Mount(___p) {
    const ___e13 = document.createElement("nav");
    ___e13.className = "blog-pagination";
    ___e13.setAttribute("aria-label", "Blog pagination");
    const ___e14 = document.createElement("ul");
    ___e14.className = "pagination";
    const ___e15 = document.createElement("li");
    ___e15.className = pageItemPrevClass(currentPage);
    const ___e16 = document.createElement("a");
    ___e16.className = "page-link";
    ___e16.setAttribute("href", String(pageHref(1)));
    ___e16.setAttribute("data-action", "nav");
    ___e16.setAttribute("aria-label", "First");
    ___e16.setAttribute("title", "First Page");
    (Icon("angles-left", "0.85em")).Mount(___e16);
    ___e15.appendChild(___e16);
    ___e14.appendChild(___e15);
    const ___e17 = document.createElement("li");
    ___e17.className = pageItemPrevClass(currentPage);
    const ___e18 = document.createElement("a");
    ___e18.className = "page-link";
    ___e18.setAttribute("href", String(pageHref(currentPage - 1)));
    ___e18.setAttribute("data-action", "nav");
    ___e18.setAttribute("aria-label", "Previous");
    ___e18.setAttribute("title", "Previous Page");
    (Icon("chevron-left", "0.85em")).Mount(___e18);
    ___e17.appendChild(___e18);
    ___e14.appendChild(___e17);
    for (const pageNum of pageNumbers(totalPages)) {
      const ___e19 = document.createElement("li");
      ___e19.className = pageItemClass(pageNum, currentPage);
      const ___e20 = document.createElement("a");
      ___e20.className = "page-link";
      ___e20.setAttribute("href", String(pageHref(pageNum)));
      ___e20.setAttribute("data-action", "nav");
      ___e20.appendChild(document.createTextNode(String(pageNum)));
      ___e19.appendChild(___e20);
      ___e14.appendChild(___e19);
    }
    const ___e21 = document.createElement("li");
    ___e21.className = pageItemNextClass(currentPage, totalPages);
    const ___e22 = document.createElement("a");
    ___e22.className = "page-link";
    ___e22.setAttribute("href", String(pageHref(currentPage + 1)));
    ___e22.setAttribute("data-action", "nav");
    ___e22.setAttribute("aria-label", "Next");
    ___e22.setAttribute("title", "Next Page");
    (Icon("chevron-right", "0.85em")).Mount(___e22);
    ___e21.appendChild(___e22);
    ___e14.appendChild(___e21);
    const ___e23 = document.createElement("li");
    ___e23.className = pageItemNextClass(currentPage, totalPages);
    const ___e24 = document.createElement("a");
    ___e24.className = "page-link";
    ___e24.setAttribute("href", String(pageHref(totalPages)));
    ___e24.setAttribute("data-action", "nav");
    ___e24.setAttribute("aria-label", "Last");
    ___e24.setAttribute("title", "Last Page");
    (Icon("angles-right", "0.85em")).Mount(___e24);
    ___e23.appendChild(___e24);
    ___e14.appendChild(___e23);
    ___e13.appendChild(___e14);
    ___p.appendChild(___e13);
  }};
}

function BlogList(allPosts, currentPage, perPage) {
  return {Mount(___p) {
    const ___e25 = document.createElement("div");
    ___e25.className = "blog-container";
    const ___e26 = document.createElement("h1");
    ___e26.className = "sr-only";
    ___e26.appendChild(document.createTextNode(String(t("nav.blog"))));
    ___e25.appendChild(___e26);
    if (__len(allPosts) === 0) {
      const ___e27 = document.createElement("p");
      ___e27.className = "blog-empty";
      ___e27.appendChild(document.createTextNode(String(t("blog.noPosts"))));
      ___e25.appendChild(___e27);
    } else {
      const ___e28 = document.createElement("div");
      ___e28.className = "blog-posts";
      for (const [i, post] of __s(paginatedPosts(allPosts, currentPage, perPage)).entries()) {
        (BlogPostCard(post, i)).Mount(___e28);
      }
      ___e25.appendChild(___e28);
      if (calcTotalPages(__len(allPosts), perPage) > 1) {
        (Pagination(currentPage, calcTotalPages(__len(allPosts), perPage))).Mount(___e25);
      }
    }
    ___p.appendChild(___e25);
  }};
}

function BlogPostView(v, commentsEnabled) {
  return {Mount(___p) {
    if (v.Status === LoadNotFound || v.Status === LoadFailed) {
      const ___e29 = document.createElement("div");
      ___e29.className = "error-message";
      const ___e30 = document.createElement("h1");
      ___e30.appendChild(document.createTextNode(String(t("general.blogNotFound"))));
      ___e29.appendChild(___e30);
      const ___e31 = document.createElement("p");
      ___e31.appendChild(document.createTextNode(String(t("general.blogNotFoundMessage"))));
      ___e29.appendChild(___e31);
      ___p.appendChild(___e29);
    } else {
      const ___e32 = document.createElement("div");
      ___e32.className = "blog-post-view";
      const ___e33 = document.createElement("h1");
      ___e33.className = "project-title";
      ___e33.appendChild(document.createTextNode(String(v.Post.Title)));
      ___e32.appendChild(___e33);
      const ___e34 = document.createElement("p");
      ___e34.className = "project-description";
      ___e34.appendChild(document.createTextNode(String(v.Post.Date)));
      ___e32.appendChild(___e34);
      if (__len(v.Post.Tags) > 0) {
        const ___e35 = document.createElement("div");
        ___e35.className = "project-tags";
        for (const tag of v.Post.Tags) {
          const ___e36 = document.createElement("span");
          ___e36.className = "item-tag clickable-tag";
          ___e36.setAttribute("data-search-tag", String(tag));
          ___e36.appendChild(document.createTextNode(String(tag)));
          ___e35.appendChild(___e36);
        }
        ___e32.appendChild(___e35);
      }
      const ___e37 = document.createElement("div");
      ___e37.className = "blog-post-content";
      const ___e38 = document.createElement("div");
      ___e38.className = "markdown-body";
      ___e38.insertAdjacentHTML("beforeend", v.HTML);
      ___e37.appendChild(___e38);
      ___e32.appendChild(___e37);
      if (commentsEnabled) {
        const ___e39 = document.createElement("div");
        ___e39.className = "giscus-container";
        ___e32.appendChild(___e39);
      }
      ___p.appendChild(___e32);
    }
  }};
}

function loadGiscus() {
  let container = document.querySelector(".giscus-container");
  if (container == null) {
    return;
  }
  container.innerHTML = "";
  let colors = getThemeColors(currentTheme);
  let giscusTheme = colors.CommentsTheme;
  if (giscusTheme === "") {
    giscusTheme = currentTheme;
  }
  let script = document.createElement("script");
  script.src = "https://giscus.app/client.js";
  script.setAttribute("data-repo", site.Comments.Repo);
  script.setAttribute("data-repo-id", site.Comments.RepoId);
  script.setAttribute("data-category", site.Comments.Category);
  script.setAttribute("data-category-id", site.Comments.CategoryId);
  script.setAttribute("data-mapping", site.Comments.Mapping);
  script.setAttribute("data-strict", site.Comments.Strict);
  script.setAttribute("data-reactions-enabled", site.Comments.ReactionsEnabled);
  script.setAttribute("data-emit-metadata", site.Comments.EmitMetadata);
  script.setAttribute("data-input-position", site.Comments.InputPosition);
  script.setAttribute("data-theme", giscusTheme);
  script.setAttribute("data-lang", site.Comments.Lang);
  script.setAttribute("crossorigin", "anonymous");
  script.async = true;
  container.appendChild(script);
}

function updateGiscusTheme() {
  let iframe = document.querySelector("iframe.giscus-frame");
  if (iframe == null) {
    return;
  }
  let colors = getThemeColors(currentTheme);
  let giscusTheme = colors.CommentsTheme;
  if (giscusTheme === "") {
    giscusTheme = currentTheme;
  }
  iframe.contentWindow.postMessage({ "giscus": { "setConfig": { "theme": giscusTheme } } }, "https://giscus.app");
}

function ContactFormFields(form) {
  return {Mount(___p) {
    const ___e40 = document.createElement("div");
    ___e40.className = "form-group";
    const ___e41 = document.createElement("label");
    ___e41.setAttribute("for", "contact-name");
    ___e41.appendChild(document.createTextNode(String(t("contact.name"))));
    ___e41.appendChild(document.createTextNode("*"));
    ___e40.appendChild(___e41);
    const ___e42 = document.createElement("input");
    ___e42.setAttribute("type", "text");
    ___e42.setAttribute("id", "contact-name");
    ___e42.setAttribute("name", "name");
    ___e42.setAttribute("required", "");
    ___e42.className = inputErrorClass(form.ErrName);
    ___e42.setAttribute("aria-invalid", String(String(form.ErrName)));
    ___e42.setAttribute("value", String(form.Name));
    ___e40.appendChild(___e42);
    ___p.appendChild(___e40);
    const ___e43 = document.createElement("div");
    ___e43.className = "form-group";
    const ___e44 = document.createElement("label");
    ___e44.setAttribute("for", "contact-email");
    ___e44.appendChild(document.createTextNode(String(t("contact.email"))));
    ___e44.appendChild(document.createTextNode("*"));
    ___e43.appendChild(___e44);
    const ___e45 = document.createElement("input");
    ___e45.setAttribute("type", "email");
    ___e45.setAttribute("id", "contact-email");
    ___e45.setAttribute("name", "email");
    ___e45.setAttribute("required", "");
    ___e45.className = inputErrorClass(form.ErrEmail);
    ___e45.setAttribute("aria-invalid", String(String(form.ErrEmail)));
    ___e45.setAttribute("value", String(form.Email));
    ___e43.appendChild(___e45);
    ___p.appendChild(___e43);
    const ___e46 = document.createElement("div");
    ___e46.className = "form-group";
    const ___e47 = document.createElement("label");
    ___e47.setAttribute("for", "contact-message");
    ___e47.appendChild(document.createTextNode(String(t("contact.message"))));
    ___e47.appendChild(document.createTextNode("*"));
    ___e46.appendChild(___e47);
    const ___e48 = document.createElement("textarea");
    ___e48.setAttribute("id", "contact-message");
    ___e48.setAttribute("name", "message");
    ___e48.setAttribute("rows", "6");
    ___e48.setAttribute("required", "");
    ___e48.className = inputErrorClass(form.ErrMessage);
    ___e48.setAttribute("aria-invalid", String(String(form.ErrMessage)));
    ___e48.appendChild(document.createTextNode(String(form.Message)));
    ___e46.appendChild(___e48);
    ___p.appendChild(___e46);
    const ___e49 = document.createElement("div");
    ___e49.className = formStatusClass(form.StatusType);
    ___e49.setAttribute("id", "contact-status");
    ___e49.setAttribute("aria-live", "polite");
    const ___e50 = document.createElement("span");
    ___e50.appendChild(document.createTextNode(String(form.StatusText)));
    ___e49.appendChild(___e50);
    ___p.appendChild(___e49);
    const ___e51 = document.createElement("button");
    ___e51.setAttribute("type", "submit");
    ___e51.className = "btn btn-primary";
    ___e51.setAttribute("id", "contact-submit");
    if(form.ButtonDisabled)___e51.setAttribute("disabled", "");
    ___e51.appendChild(document.createTextNode(String(t("contact." + form.ButtonState))));
    ___p.appendChild(___e51);
  }};
}

function ContactModal(open, closing, form) {
  return {Mount(___p) {
    const ___e52 = document.createElement("div");
    ___e52.setAttribute("id", "contact-modal");
    ___e52.className = overlayClass(open, closing);
    ___e52.setAttribute("role", "dialog");
    ___e52.setAttribute("aria-modal", "true");
    ___e52.setAttribute("aria-labelledby", "contact-modal-title");
    const ___e53 = document.createElement("div");
    ___e53.className = "contact-modal-content";
    const ___e54 = document.createElement("div");
    ___e54.className = "contact-modal-header";
    const ___e55 = document.createElement("h2");
    ___e55.setAttribute("id", "contact-modal-title");
    ___e55.appendChild(document.createTextNode(String(t("contact.title"))));
    ___e54.appendChild(___e55);
    const ___e56 = document.createElement("button");
    ___e56.setAttribute("type", "button");
    ___e56.className = "contact-modal-close";
    ___e56.setAttribute("id", "contact-modal-close");
    ___e56.setAttribute("aria-label", String(t("contact.close")));
    ___e56.setAttribute("data-action", "close-contact");
    (Icon("times", "1.2rem")).Mount(___e56);
    ___e54.appendChild(___e56);
    ___e53.appendChild(___e54);
    const ___e57 = document.createElement("form");
    ___e57.className = "contact-form";
    ___e57.setAttribute("id", "contact-form");
    ___e57.setAttribute("novalidate", "");
    (ContactFormFields(form)).Mount(___e57);
    ___e53.appendChild(___e57);
    ___e52.appendChild(___e53);
    ___p.appendChild(___e52);
  }};
}

function initEmailJS() {
  if (site.EmailJS.Enabled && site.EmailJS.PublicKey !== "") {
    emailjs.init(site.EmailJS.PublicKey);
  }
}

function openContact() {
  contactOpen = true;
  contactClosing = false;
  contactForm = new ContactState({ ButtonState: "send" });
  renderContactForm();
  syncOverlays();
  focusLater("#contact-name");
}

function closeContact() {
  if (!contactOpen) {
    return;
  }
  contactClosing = true;
  syncOverlays();
  setTimeout(function() {
    contactOpen = false;
    contactClosing = false;
    contactForm = new ContactState({ ButtonState: "send" });
    renderContactForm();
    syncOverlays();
  }, 200);
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
  if (__len(email) < 5 || !email.includes("@") || !email.includes(".") || email.includes(" ")) {
    return false;
  }
  return true;
}

function validateContact(form) {
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
    contactForm = form;
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
  return {Mount(___p) {
    const ___e58 = document.createElement("footer");
    ___e58.appendChild(document.createTextNode(String(__sprintf("© %d %s. %s.", year, author, t("footer.rights")))));
    ___p.appendChild(___e58);
  }};
}

function iconSvg(name, size) {
  {
    let alias = iconAliases[name];
    let ok = (name) in iconAliases;
    if (ok) {
      name = alias;
    }
  }
  let def = icons[name];
  let ok = (name) in icons;
  if (!ok) {
    return "";
  }
  let s = size.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
  return "<svg class=\"icon icon-" + name + "\" width=\"" + s + "\" height=\"" + s + "\" viewBox=\"" + def.ViewBox + "\" fill=\"currentColor\" aria-hidden=\"true\"><path d=\"" + def.Path + "\"/></svg>";
}

function Icon(name, size) {
  return {Mount(___p) {
    ___p.insertAdjacentHTML("beforeend", iconSvg(name, size));
  }};
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

function setupEvents() {
  let app = document.querySelector("#app");
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
            navigate(String(href));
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
          closeMobileMenu();
          closeProjectsDropdown();
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
          closeMobileMenu();
          closeProjectsDropdown();
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
      if (href.startsWith("/") && targetAttr == null || targetAttr === "") {
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
    if (e.key === "Escape") {
      if (searchOpen) {
        closeSearch();
      }
      if (contactOpen) {
        closeContact();
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
  initEmailJS();
  ((sel,n)=>{const e=document.querySelector(sel);e.innerHTML="";n.Mount(e)})("#app",AppShell());
  setupEvents();
  await handleRoute();
  document.body.classList.add("app-ready");
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

function parseFrontmatter(markdown) {
  let trimmed = markdown.trim();
  if (!trimmed.startsWith("---")) {
    return [{  }, trimmed];
  }
  let rest = trimmed.slice(3);
  let newlineIdx = rest.indexOf("\n");
  if (newlineIdx === -1) {
    return [{  }, trimmed];
  }
  let afterFirstLine = rest.slice(newlineIdx + 1);
  let closingIdx = afterFirstLine.indexOf("\n---");
  if (closingIdx === -1) {
    closingIdx = afterFirstLine.indexOf("---");
    if (closingIdx === -1) {
      return [{  }, trimmed];
    }
  }
  let frontmatterText = afterFirstLine.slice(0, closingIdx).trim();
  let body = afterFirstLine.slice(closingIdx + 4).trim();
  let metadata = ParseYAML(frontmatterText);
  if (metadata == null) {
    return [{  }, body];
  }
  return [metadata, body];
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
    Prism.highlightAll();
    attachCopyButtons();
  } catch (__err) {
    __panic = __err;
  } finally {
    for (let __i = __defers.length - 1; __i >= 0; __i--) __defers[__i]();
    if (__panic !== null) throw __panic;
  }
}

function Navbar(r, pages, projects, dropdownOpen, mobileOpen, siteConfig) {
  return {Mount(___p) {
    const ___e59 = document.createElement("nav");
    ___e59.className = "navbar";
    const ___e60 = document.createElement("div");
    ___e60.className = "navbar-inner";
    const ___e61 = document.createElement("a");
    ___e61.className = "navbar-brand";
    ___e61.setAttribute("href", "/");
    ___e61.setAttribute("data-action", "nav");
    ___e61.appendChild(document.createTextNode(String(siteConfig.Title)));
    ___e60.appendChild(___e61);
    const ___e62 = document.createElement("button");
    ___e62.setAttribute("type", "button");
    ___e62.className = toggleBtnClass(mobileOpen);
    ___e62.setAttribute("aria-label", "Toggle navigation");
    ___e62.setAttribute("aria-expanded", String(String(mobileOpen)));
    ___e62.setAttribute("data-action", "toggle-mobile-nav");
    const ___e63 = document.createElement("span");
    ___e63.className = "navbar-toggle-icon";
    ___e62.appendChild(___e63);
    ___e60.appendChild(___e62);
    const ___e64 = document.createElement("div");
    ___e64.className = navbarCollapseClass(mobileOpen);
    const ___e65 = document.createElement("ul");
    ___e65.className = "navbar-nav left";
    const ___e66 = document.createElement("li");
    ___e66.className = "nav-item navbar-menu";
    const ___e67 = document.createElement("a");
    ___e67.className = navLinkClass(r.Kind === RouteBlog);
    ___e67.setAttribute("href", "/blog");
    ___e67.setAttribute("data-action", "nav");
    ___e67.appendChild(document.createTextNode(String(t("nav.blog"))));
    ___e66.appendChild(___e67);
    ___e65.appendChild(___e66);
    const ___e68 = document.createElement("li");
    ___e68.className = dropdownClass(dropdownOpen);
    const ___e69 = document.createElement("button");
    ___e69.setAttribute("type", "button");
    ___e69.className = dropdownToggleClass(r.Kind === RouteProject);
    ___e69.setAttribute("aria-haspopup", "true");
    ___e69.setAttribute("aria-controls", "projects-dropdown");
    ___e69.setAttribute("aria-expanded", String(String(dropdownOpen)));
    ___e69.setAttribute("data-action", "toggle-projects-dropdown");
    ___e69.appendChild(document.createTextNode(String(t("nav.projects"))));
    const ___e70 = document.createElement("span");
    ___e70.className = "dropdown-chevron dropdown-chevron-down";
    (Icon("chevron-down", "0.8em")).Mount(___e70);
    ___e69.appendChild(___e70);
    const ___e71 = document.createElement("span");
    ___e71.className = "dropdown-chevron dropdown-chevron-up";
    (Icon("chevron-up", "0.8em")).Mount(___e71);
    ___e69.appendChild(___e71);
    ___e68.appendChild(___e69);
    const ___e72 = document.createElement("ul");
    ___e72.className = "dropdown-menu";
    ___e72.setAttribute("id", "projects-dropdown");
    for (const p of projects) {
      const ___e73 = document.createElement("li");
      const ___e74 = document.createElement("a");
      ___e74.className = dropdownItemClass(isActiveRoute(r, RouteProject, p.ID));
      ___e74.setAttribute("href", String(p.Href));
      ___e74.setAttribute("data-action", "nav");
      ___e74.appendChild(document.createTextNode(String(p.Title)));
      ___e73.appendChild(___e74);
      ___e72.appendChild(___e73);
    }
    ___e68.appendChild(___e72);
    ___e65.appendChild(___e68);
    for (const page of pages) {
      if (page.ShowInNav) {
        const ___e75 = document.createElement("li");
        ___e75.className = "nav-item navbar-menu";
        const ___e76 = document.createElement("a");
        ___e76.className = navLinkClass(isActiveRoute(r, RoutePage, page.ID));
        ___e76.setAttribute("href", String(page.Href));
        ___e76.setAttribute("data-action", "nav");
        ___e76.appendChild(document.createTextNode(String(page.Title)));
        ___e75.appendChild(___e76);
        ___e65.appendChild(___e75);
      }
    }
    ___e64.appendChild(___e65);
    const ___e77 = document.createElement("ul");
    ___e77.className = "navbar-nav right";
    if (siteConfig.Search.Enabled) {
      const ___e78 = document.createElement("li");
      ___e78.className = "nav-item navbar-icon";
      const ___e79 = document.createElement("button");
      ___e79.setAttribute("type", "button");
      ___e79.className = "nav-link search-toggle";
      ___e79.setAttribute("id", "search-toggle");
      ___e79.setAttribute("aria-label", String(t("aria.search")));
      ___e79.setAttribute("title", String(t("search.buttonTitle")));
      ___e79.setAttribute("data-action", "open-search");
      (Icon("search", "1.35rem")).Mount(___e79);
      ___e78.appendChild(___e79);
      ___e77.appendChild(___e78);
    }
    const ___e80 = document.createElement("li");
    ___e80.className = "nav-item navbar-icon";
    const ___e81 = document.createElement("button");
    ___e81.setAttribute("type", "button");
    ___e81.setAttribute("id", "theme-toggle");
    ___e81.className = "theme-toggle nav-link";
    ___e81.setAttribute("aria-label", String(t("aria.toggleTheme")));
    ___e81.setAttribute("title", String(t("theme.toggleTitle")));
    ___e81.setAttribute("data-action", "toggle-theme");
    (Icon("sun", "1.35rem")).Mount(___e81);
    (Icon("moon", "1.35rem")).Mount(___e81);
    ___e80.appendChild(___e81);
    ___e77.appendChild(___e80);
    if (siteConfig.EmailJS.Enabled) {
      const ___e82 = document.createElement("li");
      ___e82.className = "nav-item navbar-icon";
      const ___e83 = document.createElement("button");
      ___e83.setAttribute("type", "button");
      ___e83.className = "nav-link email-toggle";
      ___e83.setAttribute("id", "email-toggle");
      ___e83.setAttribute("aria-label", String(t("contact.title")));
      ___e83.setAttribute("title", String(t("contact.buttonTitle")));
      ___e83.setAttribute("data-action", "open-contact");
      (Icon("envelope", "1.35rem")).Mount(___e83);
      ___e82.appendChild(___e83);
      ___e77.appendChild(___e82);
    }
    for (const s of siteConfig.Social) {
      const ___e84 = document.createElement("li");
      ___e84.className = "nav-item navbar-icon";
      const ___e85 = document.createElement("a");
      ___e85.className = "nav-link";
      ___e85.setAttribute("href", String(s.Href));
      ___e85.setAttribute("target", String(s.Target));
      ___e85.setAttribute("rel", String(s.Rel));
      (Icon(s.Icon, "1.35rem")).Mount(___e85);
      ___e84.appendChild(___e85);
      ___e77.appendChild(___e84);
    }
    ___e64.appendChild(___e77);
    ___e60.appendChild(___e64);
    ___e59.appendChild(___e60);
    ___p.appendChild(___e59);
  }};
}

function PageView(v) {
  return {Mount(___p) {
    if (v.Status === LoadFailed) {
      const ___e86 = document.createElement("div");
      ___e86.className = "error-message";
      const ___e87 = document.createElement("h1");
      ___e87.appendChild(document.createTextNode(String(t("general.notFound"))));
      ___e86.appendChild(___e87);
      const ___e88 = document.createElement("p");
      ___e88.appendChild(document.createTextNode(String(t("general.notFoundMessage"))));
      ___e86.appendChild(___e88);
      ___p.appendChild(___e86);
    } else {
      const ___e89 = document.createElement("div");
      ___e89.className = "page-view";
      const ___e90 = document.createElement("div");
      ___e90.className = "markdown-body";
      ___e90.insertAdjacentHTML("beforeend", v.HTML);
      ___e89.appendChild(___e90);
      ___p.appendChild(___e89);
    }
  }};
}

function ProjectReadme(v) {
  return {Mount(___p) {
    if (v.Proj.GithubRepo !== "") {
      if (v.Status === LoadFailed) {
        const ___e91 = document.createElement("div");
        ___e91.setAttribute("id", "project-readme");
        const ___e92 = document.createElement("p");
        ___e92.appendChild(document.createTextNode(String(t("project.readmeError"))));
        ___e91.appendChild(___e92);
        ___p.appendChild(___e91);
      } else if (v.HTML !== "") {
        const ___e93 = document.createElement("div");
        ___e93.setAttribute("id", "project-readme");
        ___e93.className = "markdown-body";
        ___e93.insertAdjacentHTML("beforeend", v.HTML);
        ___p.appendChild(___e93);
      }
    }
  }};
}

function ProjectMedia(videos) {
  return {Mount(___p) {
    if (__len(videos) > 0) {
      const ___e94 = document.createElement("div");
      ___e94.className = "markdown-body";
      const ___e95 = document.createElement("h2");
      ___e95.appendChild(document.createTextNode(String(t("project.media"))));
      ___e94.appendChild(___e95);
      for (const v of videos) {
        const ___e96 = document.createElement("div");
        ___e96.className = "youtube-video";
        const ___e97 = document.createElement("div");
        ___e97.className = "iframeWrapper";
        const ___e98 = document.createElement("iframe");
        ___e98.setAttribute("width", "560");
        ___e98.setAttribute("height", "349");
        ___e98.setAttribute("src", String("https://www.youtube.com/embed/" + v + "?rel=0&hd=1"));
        ___e98.setAttribute("title", "YouTube video player");
        ___e98.setAttribute("allowfullscreen", "");
        ___e97.appendChild(___e98);
        ___e96.appendChild(___e97);
        ___e94.appendChild(___e96);
      }
      ___p.appendChild(___e94);
    }
  }};
}

function ProjectDemo(p) {
  return {Mount(___p) {
    if (p.DemoUrl !== "") {
      const ___e99 = document.createElement("div");
      ___e99.className = "markdown-body";
      const ___e100 = document.createElement("h2");
      ___e100.appendChild(document.createTextNode(String(demoLabel(p))));
      ___e99.appendChild(___e100);
      if (p.DemoInstructions !== "") {
        const ___e101 = document.createElement("p");
        ___e101.appendChild(document.createTextNode(String(p.DemoInstructions)));
        ___e99.appendChild(___e101);
      }
      const ___e102 = document.createElement("div");
      ___e102.className = demoWrapperClass(p.DemoHeight);
      const ___e103 = document.createElement("iframe");
      ___e103.setAttribute("id", "demo");
      ___e103.setAttribute("src", String(p.DemoUrl));
      ___e103.setAttribute("title", String(p.Title + " demo"));
      ___e103.setAttribute("allowfullscreen", "");
      ___e102.appendChild(___e103);
      ___e99.appendChild(___e102);
      if (p.DemoFullscreen) {
        const ___e104 = document.createElement("br");
        ___e99.appendChild(___e104);
        const ___e105 = document.createElement("div");
        ___e105.className = "text-center";
        const ___e106 = document.createElement("button");
        ___e106.setAttribute("type", "button");
        ___e106.setAttribute("id", "fullscreen");
        ___e106.className = "download-btn";
        ___e106.setAttribute("data-action", "toggle-fullscreen");
        (Icon("expand", "1rem")).Mount(___e106);
        const ___e107 = document.createElement("span");
        ___e107.appendChild(document.createTextNode(String(t("project.fullscreen"))));
        ___e106.appendChild(___e107);
        ___e105.appendChild(___e106);
        ___e99.appendChild(___e105);
      }
      ___p.appendChild(___e99);
    }
  }};
}

function ProjectLinks(links) {
  return {Mount(___p) {
    if (__len(links) > 0) {
      const ___e108 = document.createElement("div");
      ___e108.className = "markdown-body";
      const ___e109 = document.createElement("h2");
      ___e109.appendChild(document.createTextNode(String(t("project.links"))));
      ___e108.appendChild(___e109);
      const ___e110 = document.createElement("div");
      ___e110.className = "download-buttons";
      for (const link of links) {
        const ___e111 = document.createElement("a");
        ___e111.setAttribute("href", String(link.Href));
        ___e111.setAttribute("target", "_blank");
        ___e111.setAttribute("rel", "noopener noreferrer");
        ___e111.className = "download-btn";
        (Icon(link.Icon, "1rem")).Mount(___e111);
        const ___e112 = document.createElement("span");
        ___e112.appendChild(document.createTextNode(String(link.Title)));
        ___e111.appendChild(___e112);
        ___e110.appendChild(___e111);
      }
      ___e108.appendChild(___e110);
      ___p.appendChild(___e108);
    }
  }};
}

function ProjectDetail(v, commentsEnabled) {
  return {Mount(___p) {
    if (v.Status === LoadNotFound) {
      const ___e113 = document.createElement("div");
      ___e113.className = "error-message";
      const ___e114 = document.createElement("h1");
      ___e114.appendChild(document.createTextNode(String(t("general.projectNotFound"))));
      ___e113.appendChild(___e114);
      const ___e115 = document.createElement("p");
      ___e115.appendChild(document.createTextNode(String(t("general.projectNotFoundMessage"))));
      ___e113.appendChild(___e115);
      ___p.appendChild(___e113);
    } else {
      const ___e116 = document.createElement("div");
      ___e116.className = "project-detail";
      const ___e117 = document.createElement("h1");
      ___e117.className = "project-title";
      ___e117.appendChild(document.createTextNode(String(v.Proj.Title)));
      ___e116.appendChild(___e117);
      const ___e118 = document.createElement("p");
      ___e118.className = "project-description";
      ___e118.appendChild(document.createTextNode(String(v.Proj.Description)));
      ___e116.appendChild(___e118);
      if (__len(v.Proj.Tags) > 0) {
        const ___e119 = document.createElement("div");
        ___e119.className = "project-tags";
        for (const tag of v.Proj.Tags) {
          const ___e120 = document.createElement("span");
          ___e120.className = "item-tag clickable-tag";
          ___e120.setAttribute("data-search-tag", String(tag));
          ___e120.appendChild(document.createTextNode(String(tag)));
          ___e119.appendChild(___e120);
        }
        ___e116.appendChild(___e119);
      }
      (ProjectReadme(v)).Mount(___e116);
      (ProjectMedia(v.Proj.YoutubeVideos)).Mount(___e116);
      (ProjectDemo(v.Proj)).Mount(___e116);
      (ProjectLinks(v.Proj.Links)).Mount(___e116);
      if (commentsEnabled) {
        const ___e121 = document.createElement("div");
        ___e121.className = "giscus-container";
        ___e116.appendChild(___e121);
      }
      ___p.appendChild(___e116);
    }
  }};
}

function isActiveRoute(r, kind, param) {
  return r.Kind === kind && r.Param === param;
}

function toggleBtnClass(open) {
  if (open) {
    return "navbar-toggle active";
  }
  return "navbar-toggle";
}

function navbarCollapseClass(open) {
  if (open) {
    return "navbar-collapse show";
  }
  return "navbar-collapse";
}

function dropdownClass(open) {
  if (open) {
    return "nav-item navbar-menu dropdown show";
  }
  return "nav-item navbar-menu dropdown";
}

function navLinkClass(active) {
  if (active) {
    return "nav-link active";
  }
  return "nav-link";
}

function dropdownToggleClass(active) {
  if (active) {
    return "nav-link dropdown-toggle active";
  }
  return "nav-link dropdown-toggle";
}

function dropdownItemClass(active) {
  if (active) {
    return "dropdown-item active";
  }
  return "dropdown-item";
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

function pageItemPrevClass(page) {
  if (page <= 1) {
    return "page-item disabled";
  }
  return "page-item";
}

function pageItemNextClass(page, totalPages) {
  if (page >= totalPages) {
    return "page-item disabled";
  }
  return "page-item";
}

function pageItemClass(page, currentPage) {
  if (page === currentPage) {
    return "page-item active";
  }
  return "page-item";
}

function pageHref(page) {
  if (page < 1) {
    page = 1;
  }
  return __sprintf("/blog/page/%d", page);
}

function pageNumbers(totalPages) {
  let nums = [];
  for (let i = 1; i <= totalPages; i++) {
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

function overlayClass(open, closing) {
  if (closing) {
    return "show closing";
  }
  if (open) {
    return "show";
  }
  return "";
}

function searchClearClass(q) {
  if (q !== "") {
    return "search-page-clear show";
  }
  return "search-page-clear";
}

function searchPlaceholderText() {
  if (site.Search.Placeholder !== "" && site.Search.Placeholder !== "undefined") {
    return site.Search.Placeholder;
  }
  let res = t("search.placeholder");
  if (res === "search.placeholder" || res === "" || res === "undefined") {
    return "Search...";
  }
  return res;
}

function highlightMatch(text, query) {
  if (query === "") {
    return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
  }
  let lowerText = text.toLowerCase();
  let lowerQuery = query.toLowerCase();
  let idx = lowerText.indexOf(lowerQuery);
  if (idx === -1) {
    return text.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
  }
  let before = text.slice(0, idx).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
  let match = text.slice(idx, idx + __len(query)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
  let after = text.slice(idx + __len(query)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&#34;").replace(/'/g,"&#39;");
  return before + "<mark>" + match + "</mark>" + after;
}

function inputErrorClass(hasErr) {
  if (hasErr) {
    return "error";
  }
  return "";
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

function navigate(url) {
  if (url !== window.location.pathname) {
    window.history.pushState({  }, "", url);
  }
  handleRoute();
}

function parseRoute(path) {
  if (__len(path) > 1) {
    path = ((s, suf) => !suf.length || !s.endsWith(suf) ? s : s.slice(0, -suf.length))(path, "/");
  }
  if (path === "" || path === "/" || path === "/blog") {
    return new RouteMatch({ Kind: RouteBlog, Page: 1 });
  }
  {
    let [rest, ok] = (path).startsWith("/blog/page/") ? [(path).slice(("/blog/page/").length), true] : [path, false];
    if (ok) {
      let [n, err] = (Number.isNaN(Number(rest)) ? [0, "invalid syntax"] : [Number(rest) | 0, null]);
      if (err != null || n < 1) {
        n = 1;
      }
      return new RouteMatch({ Kind: RouteBlog, Page: n });
    }
  }
  {
    let [slug, ok] = (path).startsWith("/blog/") ? [(path).slice(("/blog/").length), true] : [path, false];
    if (ok) {
      slug = ((s, pre) => s.startsWith(pre) ? s.slice(pre.length) : s)(slug, "post/");
      if (slug === "") {
        return new RouteMatch({ Kind: RouteBlog, Page: 1 });
      }
      return new RouteMatch({ Kind: RoutePost, Param: slug });
    }
  }
  {
    let [id, ok] = (path).startsWith("/project/") ? [(path).slice(("/project/").length), true] : [path, false];
    if (ok) {
      return new RouteMatch({ Kind: RouteProject, Param: id });
    }
  }
  {
    let [id, ok] = (path).startsWith("/page/") ? [(path).slice(("/page/").length), true] : [path, false];
    if (ok) {
      return new RouteMatch({ Kind: RoutePage, Param: id });
    }
  }
  return new RouteMatch({ Kind: RouteBlog, Page: 1 });
}

function resolveRedirect(hash) {
  let target = "";
  let ok = false;
  const __defers = [];
  let __panic = null;
  try {
    __defers.push(() => { (function() {
      {
        let r = (typeof __panic !== "undefined" && __panic !== null ? (() => { const __r = __panic.message ?? String(__panic); __panic = null; return __r; })() : null);
        if (r != null) {
          target = "";
          ok = false;
        }
      }
    })(); });
    let [encoded, found] = (hash).startsWith("#!redirect=") ? [(hash).slice(("#!redirect=").length), true] : [hash, false];
    if (!found || encoded === "") {
      return ["", false];
    }
    let decoded = String(decodeURIComponent(encoded));
    if (!decoded.startsWith("/") || decoded.startsWith("//")) {
      return ["", false];
    }
    return [decoded, true];
  } catch (__err) {
    __panic = __err;
  } finally {
    for (let __i = __defers.length - 1; __i >= 0; __i--) __defers[__i]();
    if (__panic !== null) throw __panic;
  }
  return [target, ok];
}

async function handleRoute() {
  resetOverlays();
  let path = window.location.pathname;
  {
    let [redirect, ok] = resolveRedirect(window.location.hash);
    if (ok) {
      window.history.replaceState({  }, "", redirect);
      path = redirect;
    }
  }
  if (!isInitialRoute) {
    let mainEl = document.querySelector("#main-content");
    if (mainEl != null) {
      mainEl.classList.add("page-transition-out");
      await new Promise(r => setTimeout(r, 200 * 1000000 / 1000000));
    }
  }
  isInitialRoute = false;
  routeSeq++;
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
    default:
    {
      showBlog(route.Page);
      break;
    }
  }
  let mainEl = document.querySelector("#main-content");
  if (mainEl != null) {
    mainEl.setAttribute("tabindex", "-1");
    mainEl.focus({ "preventScroll": true });
    setTimeout(function() {
      mainEl.removeAttribute("tabindex");
    }, 100);
  }
}

function showBlog(page) {
  if (page > 1) {
    document.title = t("nav.blog") + " - " + site.Title;
  } else {
    document.title = site.Title;
  }
  renderRoute();
}

async function showPost(slug) {
  let [v, needsFetch] = resolvePost(slug, posts, postHtmlCache);
  view = v;
  if (view.Status === LoadNotFound) {
    renderRoute();
    return;
  }
  document.title = view.Post.Title + " - " + site.Title;
  if (needsFetch) {
    let seq = routeSeq;
    let [mdText, err] = await loadMarkdownFile("/data/blog/" + v.Post.Filename);
    if (err != null) {
      if (seq !== routeSeq) {
        return;
      }
      view.Status = LoadFailed;
      renderRoute();
      return;
    }
    let [_, content] = parseFrontmatter(mdText);
    let html = parseMarkdown(content);
    postHtmlCache[v.Post.Filename] = html;
    if (seq !== routeSeq) {
      return;
    }
    view.HTML = html;
    view.Status = LoadReady;
  }
  renderRoute();
  highlightCode();
  loadGiscus();
}

async function showProject(id) {
  let [v, needsFetch] = resolveProject(id, projects, readmeCache);
  view = v;
  if (view.Status === LoadNotFound) {
    renderRoute();
    return;
  }
  document.title = view.Proj.Title + " - " + site.Title;
  if (needsFetch) {
    let seq = routeSeq;
    let [mdText, err] = await loadMarkdownFile(readmeURL(v.Proj, site.GithubUsername));
    let html = "";
    if (err == null) {
      html = parseMarkdown(mdText);
      readmeCache[v.Proj.GithubRepo] = html;
    }
    if (seq !== routeSeq) {
      return;
    }
    if (err != null) {
      view.Status = LoadFailed;
    } else {
      view.HTML = html;
      view.Status = LoadReady;
    }
  }
  renderRoute();
  highlightCode();
  loadGiscus();
}

async function showPage(id) {
  let [v, needsFetch] = resolvePage(id, navPages, pageHtmlCache);
  view = v;
  document.title = view.Page.Title + " - " + site.Title;
  if (needsFetch) {
    let seq = routeSeq;
    let [mdText, err] = await loadMarkdownFile("/data/pages/" + id + ".md");
    let html = "";
    if (err == null) {
      html = parseMarkdown(mdText);
      pageHtmlCache[id] = html;
    }
    if (seq !== routeSeq) {
      return;
    }
    if (err != null) {
      view.Status = LoadFailed;
    } else {
      view.HTML = html;
      view.Status = LoadReady;
    }
  }
  renderRoute();
  highlightCode();
}

function initSearch() {
  let searchItems = null;
  for (const [_$, p] of __s(projects).entries()) {
    let item = { "id": p.ID, "title": p.Title, "description": p.Description, "tags": p.Tags, "type": "project", "url": "/project/" + p.ID };
    searchItems = __append(searchItems, item);
  }
  for (const [_$, p] of __s(posts).entries()) {
    let item = { "id": p.Slug, "title": p.Title, "description": p.Excerpt, "tags": p.Tags, "type": "blog", "url": "/blog/" + p.Slug };
    searchItems = __append(searchItems, item);
  }
  let options = { "keys": [{ "name": "title", "weight": 0.4 }, { "name": "description", "weight": 0.3 }, { "name": "tags", "weight": 0.2 }], "threshold": 0.4, "minMatchCharLength": searchMinChars() };
  fuseInstance = createFuse(searchItems, options);
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
      for (const [_$, t] of __s(rawItem.tags).entries()) {
        tags = __append(tags, String(t));
      }
    }
    out = __append(out, new SearchResultItem({ ID: String(rawItem.id), Title: String(rawItem.title), Description: String(rawItem.description), Tags: tags, ItemType: String(rawItem.type), Url: String(rawItem.url) }));
  }
  return out;
}

function renderSearchResults() {
  ((sel,n)=>{const e=document.querySelector(sel);e.innerHTML="";n.Mount(e)})("#search-page-results",SearchResultsList(searchResults, searchQuery));
}

function setSearchInput(v) {
  let inp = document.querySelector("#search-page-input");
  if (inp != null) {
    inp.value = v;
  }
}

function openSearch() {
  searchOpen = true;
  searchClosing = false;
  syncOverlays();
  focusLater("#search-page-input");
}

function openSearchWithTag(tag) {
  searchOpen = true;
  searchClosing = false;
  searchQuery = tag;
  searchResults = performSearch(tag);
  setSearchInput(tag);
  renderSearchResults();
  syncOverlays();
  focusLater("#search-page-input");
}

function clearSearch() {
  searchQuery = "";
  searchResults = [];
  setSearchInput("");
  renderSearchResults();
  syncOverlays();
  focusLater("#search-page-input");
}

function closeSearch() {
  if (!searchOpen) {
    return;
  }
  searchClosing = true;
  syncOverlays();
  setTimeout(function() {
    searchOpen = false;
    searchClosing = false;
    searchQuery = "";
    searchResults = [];
    setSearchInput("");
    renderSearchResults();
    syncOverlays();
  }, 200);
}

function handleSearchInput(value) {
  searchQuery = value;
  syncOverlays();
  if (searchDebounceTimer != null) {
    clearTimeout(searchDebounceTimer);
  }
  searchDebounceTimer = setTimeout(function() {
    searchResults = performSearch(searchQuery);
    renderSearchResults();
  }, 150);
}

function SearchResultsList(results, query) {
  return {Mount(___p) {
    if (query !== "" && __len(results) === 0) {
      const ___e122 = document.createElement("div");
      ___e122.className = "search-no-results";
      (Icon("search", "3rem")).Mount(___e122);
      const ___e123 = document.createElement("p");
      ___e123.appendChild(document.createTextNode(String(t("search.noResults"))));
      ___e122.appendChild(___e123);
      ___p.appendChild(___e122);
    } else {
      for (const item of results) {
        const ___e124 = document.createElement("article");
        ___e124.className = "search-result-item blog-post-card";
        ___e124.setAttribute("data-action", "open-post");
        ___e124.setAttribute("data-href", String(item.Url));
        const ___e125 = document.createElement("h2");
        ___e125.className = "blog-post-title";
        const ___e126 = document.createElement("a");
        ___e126.setAttribute("href", String(item.Url));
        ___e126.setAttribute("data-action", "nav");
        ___e126.insertAdjacentHTML("beforeend", highlightMatch(item.Title, query));
        ___e125.appendChild(___e126);
        ___e124.appendChild(___e125);
        const ___e127 = document.createElement("div");
        ___e127.className = "blog-post-meta";
        const ___e128 = document.createElement("span");
        ___e128.className = "blog-post-tags";
        if (item.ItemType === "project") {
          const ___e129 = document.createElement("span");
          ___e129.className = "item-tag";
          ___e129.appendChild(document.createTextNode(String(t("badges.project"))));
          ___e128.appendChild(___e129);
        } else {
          const ___e130 = document.createElement("span");
          ___e130.className = "item-tag";
          ___e130.appendChild(document.createTextNode(String(t("badges.blog"))));
          ___e128.appendChild(___e130);
        }
        for (const tag of item.Tags) {
          const ___e131 = document.createElement("span");
          ___e131.className = "item-tag";
          ___e131.appendChild(document.createTextNode(String(tag)));
          ___e128.appendChild(___e131);
        }
        ___e127.appendChild(___e128);
        ___e124.appendChild(___e127);
        const ___e132 = document.createElement("p");
        ___e132.className = "blog-post-excerpt";
        ___e132.insertAdjacentHTML("beforeend", highlightMatch(item.Description, query));
        ___e124.appendChild(___e132);
        ___p.appendChild(___e124);
      }
    }
  }};
}

function SearchModal(open, closing, query, results, placeholder) {
  return {Mount(___p) {
    const ___e133 = document.createElement("div");
    ___e133.setAttribute("id", "search-page");
    ___e133.className = overlayClass(open, closing);
    ___e133.setAttribute("role", "dialog");
    ___e133.setAttribute("aria-modal", "true");
    ___e133.setAttribute("aria-label", String(t("aria.search")));
    const ___e134 = document.createElement("div");
    ___e134.className = "search-page-header";
    const ___e135 = document.createElement("div");
    ___e135.className = "search-page-header-content";
    const ___e136 = document.createElement("button");
    ___e136.setAttribute("type", "button");
    ___e136.className = "search-page-back";
    ___e136.setAttribute("id", "search-page-back");
    ___e136.setAttribute("aria-label", String(t("aria.goBack")));
    ___e136.setAttribute("data-action", "close-search");
    (Icon("arrow-left", "1.2rem")).Mount(___e136);
    ___e135.appendChild(___e136);
    const ___e137 = document.createElement("div");
    ___e137.className = "search-page-input-wrapper";
    const ___e138 = document.createElement("input");
    ___e138.setAttribute("type", "search");
    ___e138.setAttribute("id", "search-page-input");
    ___e138.className = "search-page-input";
    ___e138.setAttribute("placeholder", String(placeholder));
    ___e138.setAttribute("autocomplete", "off");
    ___e138.setAttribute("aria-label", String(t("aria.search")));
    ___e138.setAttribute("value", String(query));
    ___e137.appendChild(___e138);
    const ___e139 = document.createElement("button");
    ___e139.setAttribute("type", "button");
    ___e139.className = searchClearClass(query);
    ___e139.setAttribute("id", "search-page-clear");
    ___e139.setAttribute("aria-label", String(t("aria.clearSearch")));
    ___e139.setAttribute("data-action", "clear-search");
    (Icon("times", "1.2rem")).Mount(___e139);
    ___e137.appendChild(___e139);
    ___e135.appendChild(___e137);
    ___e134.appendChild(___e135);
    ___e133.appendChild(___e134);
    const ___e140 = document.createElement("div");
    ___e140.className = "search-page-content";
    const ___e141 = document.createElement("div");
    ___e141.className = "search-page-results";
    ___e141.setAttribute("id", "search-page-results");
    (SearchResultsList(results, query)).Mount(___e141);
    ___e140.appendChild(___e141);
    ___e133.appendChild(___e140);
    ___p.appendChild(___e133);
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

function updateMeta(selector, value) {
  if (value === "") {
    return;
  }
  let el = document.querySelector(selector);
  if (el != null) {
    el.setAttribute("content", value);
  }
}

function updateMetaTags() {
  if (site.Title !== "") {
    document.title = site.Title;
  }
  updateMeta("meta[name=\"description\"]", site.Description);
  updateMeta("meta[name=\"author\"]", site.Author);
  updateMeta("meta[name=\"theme-color\"]", site.DarkTheme.Primary);
  updateMeta("meta[name=\"msapplication-TileColor\"]", site.DarkTheme.Primary);
  updateMeta("meta[property=\"og:title\"]", site.Title);
  updateMeta("meta[property=\"twitter:title\"]", site.Title);
  updateMeta("meta[property=\"og:description\"]", site.Description);
  updateMeta("meta[property=\"twitter:description\"]", site.Description);
}

function strVal(v) {
  if (v == null || String(v) === "undefined") {
    return "";
  }
  return String(v);
}

function boolVal(v) {
  if (v == null || String(v) === "undefined" || String(v) === "false") {
    return false;
  }
  return Boolean(v);
}

function intVal(v) {
  if (v == null || String(v) === "undefined") {
    return 0;
  }
  return Math.trunc(Number(v));
}

function postFromYAML(p) {
  let fn = strVal(p.filename);
  let slug = ((s, suf) => !suf.length || !s.endsWith(suf) ? s : s.slice(0, -suf.length))(fn, ".md");
  let tags = [];
  if (p.tags != null) {
    for (const [_$, tg] of __s(p.tags).entries()) {
      tags = __append(tags, strVal(tg));
    }
  }
  return new BlogPost({ ID: slug, Slug: slug, Title: strVal(p.title), Date: strVal(p.date), Excerpt: strVal(p.excerpt), Tags: tags, Filename: fn, Href: "/blog/" + slug });
}

function sortPostsByDate(list) {
  list.sort(function(a, b) {
    if (a.Date < b.Date) {
      return 1;
    }
    if (a.Date > b.Date) {
      return -1;
    }
    return 0;
  });
}

function projectFromYAML(p) {
  let tags = [];
  if (p.tags != null) {
    for (const [_$, tg] of __s(p.tags).entries()) {
      tags = __append(tags, strVal(tg));
    }
  }
  let videos = [];
  if (p.youtube_videos != null) {
    for (const [_$, v] of __s(p.youtube_videos).entries()) {
      videos = __append(videos, strVal(v));
    }
  }
  let links = [];
  if (p.links != null) {
    for (const [_$, l] of __s(p.links).entries()) {
      links = __append(links, new ProjectLink({ Title: strVal(l.title), Icon: strVal(l.icon), Href: strVal(l.href) }));
    }
  }
  let id = strVal(p.id);
  return new Project({ ID: id, Title: strVal(p.title), Description: strVal(p.description), Tags: tags, Order: intVal(p.order), GithubRepo: strVal(p.github_repo), GithubBranch: strVal(p.github_branch), DemoUrl: strVal(p.demo_url), DemoLabel: strVal(p.demo_label), DemoInstructions: strVal(p.demo_instructions), DemoHeight: strVal(p.demo_height), DemoFullscreen: boolVal(p.demo_fullscreen), YoutubeVideos: videos, Links: links, Href: "/project/" + id });
}

function sortProjectsByOrder(list) {
  list.sort(function(a, b) {
    return a.Order - b.Order;
  });
}

function pageFromYAML(id, p) {
  return new NavPage({ ID: id, Title: strVal(p.title), Order: intVal(p.order), ShowInNav: boolVal(p.showInNav), Href: "/page/" + id });
}

function sortPagesByOrder(list) {
  list.sort(function(a, b) {
    return a.Order - b.Order;
  });
}

async function initData() {
  let res = await fetch("/data/content.yaml");
  if (res == null || !res.ok) {
    return __error("failed to fetch /data/content.yaml");
  }
  let rawText = await res.text();
  let data = ParseYAML(String(rawText));
  if (data == null) {
    return __error("failed to parse /data/content.yaml");
  }
  let siteData = data.site;
  if (siteData != null) {
    site.Title = strVal(siteData.title);
    site.Description = strVal(siteData.description);
    site.Author = strVal(siteData.author);
    site.GithubUsername = strVal(siteData.github_username);
    if (siteData.theme != null) {
      if (siteData.theme.dark != null) {
        let d = siteData.theme.dark;
        site.DarkTheme = new ThemeColors({ Primary: strVal(d.primary), Secondary: strVal(d.secondary), Background: strVal(d.background), Text: strVal(d.text), TextLight: strVal(d.textLight), Border: strVal(d.border), Hover: strVal(d.hover), CodeTheme: "prism-tomorrow" });
        if (d.code != null) {
          site.DarkTheme.CodeTheme = strVal(d.code.theme);
        }
        if (d.comments != null) {
          site.DarkTheme.CommentsTheme = strVal(d.comments.theme);
        }
      }
      if (siteData.theme.light != null) {
        let l = siteData.theme.light;
        site.LightTheme = new ThemeColors({ Primary: strVal(l.primary), Secondary: strVal(l.secondary), Background: strVal(l.background), Text: strVal(l.text), TextLight: strVal(l.textLight), Border: strVal(l.border), Hover: strVal(l.hover), CodeTheme: "prism-coy" });
        if (l.code != null) {
          site.LightTheme.CodeTheme = strVal(l.code.theme);
        }
        if (l.comments != null) {
          site.LightTheme.CommentsTheme = strVal(l.comments.theme);
        }
      }
    }
    if (siteData.search != null) {
      site.Search = new SearchConfig({ Enabled: boolVal(siteData.search.enabled), MinChars: intVal(siteData.search.minChars), Placeholder: strVal(siteData.search.placeholder) });
    }
    if (siteData.emailjs != null) {
      site.EmailJS = new EmailJSConfig({ Enabled: boolVal(siteData.emailjs.enabled), ServiceId: strVal(siteData.emailjs.serviceId), TemplateId: strVal(siteData.emailjs.templateId), PublicKey: strVal(siteData.emailjs.publicKey) });
    }
    if (siteData.comments != null) {
      let c = siteData.comments;
      site.Comments = new CommentsConfig({ BlogEnabled: boolVal(c.blogEnabled), ProjectsEnabled: boolVal(c.projectsEnabled), Repo: strVal(c.repo), RepoId: strVal(c.repoId), Category: strVal(c.category), CategoryId: strVal(c.categoryId), Mapping: strVal(c.mapping), Strict: strVal(c.strict), ReactionsEnabled: strVal(c.reactionsEnabled), EmitMetadata: strVal(c.emitMetadata), InputPosition: strVal(c.inputPosition), Lang: strVal(c.lang) });
    }
    if (siteData.social != null) {
      for (const [_$, item] of __s(siteData.social).entries()) {
        site.Social = __append(site.Social, new SocialLink({ Icon: strVal(item.icon), Href: strVal(item.href), Target: strVal(item.target), Rel: strVal(item.rel) }));
      }
    }
  }
  if (data.translations != null && data.translations.en != null) {
    for (const [k, v] of Object.entries(data.translations.en)) {
      translations[k] = strVal(v);
    }
  }
  site.PostsPerPage = 5;
  if (data.blog != null) {
    if (data.blog.postsPerPage != null) {
      site.PostsPerPage = intVal(data.blog.postsPerPage);
    }
    if (data.blog.posts != null) {
      for (const [_$, p] of __s(data.blog.posts).entries()) {
        posts = __append(posts, postFromYAML(p));
      }
      sortPostsByDate(posts);
    }
  }
  if (data.projects != null) {
    for (const [_$, p] of __s(data.projects).entries()) {
      projects = __append(projects, projectFromYAML(p));
    }
    sortProjectsByOrder(projects);
  }
  if (data.pages != null) {
    for (const [id, p] of Object.entries(data.pages)) {
      navPages = __append(navPages, pageFromYAML(id, p));
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
    return site.LightTheme;
  }
  return site.DarkTheme;
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

function applyTheme(theme) {
  currentTheme = theme;
  document.documentElement.setAttribute("data-theme", theme);
  let colors = getThemeColors(theme);
  applyColorScheme(colors);
  if (colors.CodeTheme !== "") {
    applyPrismTheme(colors.CodeTheme);
  }
  updateGiscusTheme();
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
  ((sel,n)=>{const e=document.querySelector(sel);e.innerHTML="";n.Mount(e)})("#content-slot",MainContent());
}

function renderNavbar() {
  ((sel,n)=>{const e=document.querySelector(sel);e.innerHTML="";n.Mount(e)})("#navbar-slot",Navbar(route, navPages, projects, projectsDropdownOpen, mobileMenuOpen, site));
}

function renderContactForm() {
  ((sel,n)=>{const e=document.querySelector(sel);e.innerHTML="";n.Mount(e)})("#contact-form",ContactFormFields(contactForm));
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
  setClass("#search-page", "show", searchOpen || searchClosing);
  setClass("#search-page", "closing", searchClosing);
  setClass("#search-page-clear", "show", searchQuery !== "");
  let modalVisible = contactOpen || contactClosing;
  setClass("#contact-modal", "show", modalVisible);
  setClass("#contact-modal", "closing", contactClosing);
  document.documentElement.classList.toggle("modal-open", modalVisible);
  document.body.classList.toggle("modal-open", modalVisible);
}

function resetOverlays() {
  mobileMenuOpen = false;
  projectsDropdownOpen = false;
  contactOpen = false;
  contactClosing = false;
  if (searchOpen || searchQuery !== "") {
    searchOpen = false;
    searchClosing = false;
    searchQuery = "";
    searchResults = [];
    setSearchInput("");
    renderSearchResults();
  }
  syncOverlays();
}

function newViewState() {
  return new ViewState({ Post: new BlogPost({ Tags: [] }), Proj: new Project({ Tags: [], YoutubeVideos: [], Links: [] }), Status: LoadReady });
}

function resolvePost(slug, all, cache) {
  let v = newViewState();
  for (const [_$, p] of __s(all).entries()) {
    if (p.Slug === slug || p.ID === slug) {
      v.Post = p;
      {
        let html = cache[p.Filename];
        let ok = (p.Filename) in cache;
        if (ok && html !== "") {
          v.HTML = html;
          return [v, false];
        }
      }
      v.Status = LoadPending;
      return [v, true];
    }
  }
  v.Status = LoadNotFound;
  return [v, false];
}

function resolveProject(id, all, cache) {
  let v = newViewState();
  for (const [_$, p] of __s(all).entries()) {
    if (p.ID === id) {
      v.Proj = p;
      if (p.GithubRepo === "") {
        return [v, false];
      }
      {
        let html = cache[p.GithubRepo];
        let ok = (p.GithubRepo) in cache;
        if (ok && html !== "") {
          v.HTML = html;
          return [v, false];
        }
      }
      v.Status = LoadPending;
      return [v, true];
    }
  }
  v.Status = LoadNotFound;
  return [v, false];
}

function resolvePage(id, all, cache) {
  let v = newViewState();
  v.Page = new NavPage({ ID: id, Title: id });
  for (const [_$, p] of __s(all).entries()) {
    if (p.ID === id) {
      v.Page = p;
      break;
    }
  }
  {
    let html = cache[id];
    let ok = (id) in cache;
    if (ok && html !== "") {
      v.HTML = html;
      return [v, false];
    }
  }
  v.Status = LoadPending;
  return [v, true];
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
(function(){var es=new EventSource('/_gofront/events');es.addEventListener('reload',function(){location.reload();});})();
