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

let currentPost = new BlogPost({ Tags: [] });

let currentPostHtml = "";

let currentPostLoading = false;

let currentPostError = false;

let currentProject = new Project({ Tags: [], YoutubeVideos: [], Links: [] });

let projectReadmeHtml = "";

let projectReadmeLoading = false;

let projectReadmeError = false;

let currentPageHtml = "";

let currentPageLoading = false;

let currentPageError = false;

let readmeCache = {  };

let postHtmlCache = {  };

let pageHtmlCache = {  };

const themeStorageKey = "theme-preference";

const RouteBlog = 0;
const RoutePost = 1;
const RouteProject = 2;
const RoutePage = 3;

function AppStyles() {
  return {Mount(___p) {
    ___p.insertAdjacentHTML("beforeend", "<style id=\"app-styles\">" + appCSS() + "</style>");
  }};
}

function RouteView(r) {
  return {Mount(___p) {
    switch (r.Kind) {
      case RoutePost: {
        (BlogPostView(currentPost, currentPostHtml, currentPostLoading, currentPostError, site.Comments.BlogEnabled)).Mount(___p);
      break; }
      case RouteProject: {
        (ProjectDetail(currentProject, projectReadmeHtml, projectReadmeLoading, projectReadmeError, site.Comments.ProjectsEnabled)).Mount(___p);
      break; }
      case RoutePage: {
        (PageView(currentPageHtml, currentPageLoading, currentPageError)).Mount(___p);
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

function BlogPostView(post, html, loading, isError, commentsEnabled) {
  return {Mount(___p) {
    if (isError) {
      const ___e29 = document.createElement("div");
      ___e29.className = "error-message";
      const ___e30 = document.createElement("h1");
      ___e30.appendChild(document.createTextNode(String(t("general.blogNotFound"))));
      ___e29.appendChild(___e30);
      const ___e31 = document.createElement("p");
      ___e31.appendChild(document.createTextNode(String(t("general.blogNotFoundMessage"))));
      ___e29.appendChild(___e31);
      ___p.appendChild(___e29);
    } else if (loading) {
      const ___e32 = document.createElement("div");
      ___e32.className = "loading-spinner";
      ___e32.appendChild(document.createTextNode(String(t("general.loading"))));
      ___p.appendChild(___e32);
    } else {
      const ___e33 = document.createElement("div");
      ___e33.className = "blog-post-view";
      const ___e34 = document.createElement("h1");
      ___e34.className = "project-title";
      ___e34.appendChild(document.createTextNode(String(post.Title)));
      ___e33.appendChild(___e34);
      const ___e35 = document.createElement("p");
      ___e35.className = "project-description";
      ___e35.appendChild(document.createTextNode(String(post.Date)));
      ___e33.appendChild(___e35);
      if (__len(post.Tags) > 0) {
        const ___e36 = document.createElement("div");
        ___e36.className = "project-tags";
        for (const tag of post.Tags) {
          const ___e37 = document.createElement("span");
          ___e37.className = "item-tag clickable-tag";
          ___e37.setAttribute("data-search-tag", String(tag));
          ___e37.appendChild(document.createTextNode(String(tag)));
          ___e36.appendChild(___e37);
        }
        ___e33.appendChild(___e36);
      }
      const ___e38 = document.createElement("div");
      ___e38.className = "blog-post-content";
      const ___e39 = document.createElement("div");
      ___e39.className = "markdown-body";
      ___e39.insertAdjacentHTML("beforeend", html);
      ___e38.appendChild(___e39);
      ___e33.appendChild(___e38);
      if (commentsEnabled) {
        const ___e40 = document.createElement("div");
        ___e40.className = "giscus-container";
        ___e33.appendChild(___e40);
      }
      ___p.appendChild(___e33);
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
    const ___e41 = document.createElement("div");
    ___e41.className = "form-group";
    const ___e42 = document.createElement("label");
    ___e42.setAttribute("for", "contact-name");
    ___e42.appendChild(document.createTextNode(String(t("contact.name"))));
    ___e42.appendChild(document.createTextNode("*"));
    ___e41.appendChild(___e42);
    const ___e43 = document.createElement("input");
    ___e43.setAttribute("type", "text");
    ___e43.setAttribute("id", "contact-name");
    ___e43.setAttribute("name", "name");
    ___e43.setAttribute("required", "");
    ___e43.className = inputErrorClass(form.ErrName);
    ___e43.setAttribute("aria-invalid", String(String(form.ErrName)));
    ___e43.setAttribute("value", String(form.Name));
    ___e41.appendChild(___e43);
    ___p.appendChild(___e41);
    const ___e44 = document.createElement("div");
    ___e44.className = "form-group";
    const ___e45 = document.createElement("label");
    ___e45.setAttribute("for", "contact-email");
    ___e45.appendChild(document.createTextNode(String(t("contact.email"))));
    ___e45.appendChild(document.createTextNode("*"));
    ___e44.appendChild(___e45);
    const ___e46 = document.createElement("input");
    ___e46.setAttribute("type", "email");
    ___e46.setAttribute("id", "contact-email");
    ___e46.setAttribute("name", "email");
    ___e46.setAttribute("required", "");
    ___e46.className = inputErrorClass(form.ErrEmail);
    ___e46.setAttribute("aria-invalid", String(String(form.ErrEmail)));
    ___e46.setAttribute("value", String(form.Email));
    ___e44.appendChild(___e46);
    ___p.appendChild(___e44);
    const ___e47 = document.createElement("div");
    ___e47.className = "form-group";
    const ___e48 = document.createElement("label");
    ___e48.setAttribute("for", "contact-message");
    ___e48.appendChild(document.createTextNode(String(t("contact.message"))));
    ___e48.appendChild(document.createTextNode("*"));
    ___e47.appendChild(___e48);
    const ___e49 = document.createElement("textarea");
    ___e49.setAttribute("id", "contact-message");
    ___e49.setAttribute("name", "message");
    ___e49.setAttribute("rows", "6");
    ___e49.setAttribute("required", "");
    ___e49.className = inputErrorClass(form.ErrMessage);
    ___e49.setAttribute("aria-invalid", String(String(form.ErrMessage)));
    ___e49.appendChild(document.createTextNode(String(form.Message)));
    ___e47.appendChild(___e49);
    ___p.appendChild(___e47);
    const ___e50 = document.createElement("div");
    ___e50.className = formStatusClass(form.StatusType);
    ___e50.setAttribute("id", "contact-status");
    ___e50.setAttribute("aria-live", "polite");
    const ___e51 = document.createElement("span");
    ___e51.appendChild(document.createTextNode(String(form.StatusText)));
    ___e50.appendChild(___e51);
    ___p.appendChild(___e50);
    const ___e52 = document.createElement("button");
    ___e52.setAttribute("type", "submit");
    ___e52.className = "btn btn-primary";
    ___e52.setAttribute("id", "contact-submit");
    if(form.ButtonDisabled)___e52.setAttribute("disabled", "");
    ___e52.appendChild(document.createTextNode(String(t("contact." + form.ButtonState))));
    ___p.appendChild(___e52);
  }};
}

function ContactModal(open, closing, form) {
  return {Mount(___p) {
    const ___e53 = document.createElement("div");
    ___e53.setAttribute("id", "contact-modal");
    ___e53.className = overlayClass(open, closing);
    ___e53.setAttribute("role", "dialog");
    ___e53.setAttribute("aria-modal", "true");
    ___e53.setAttribute("aria-labelledby", "contact-modal-title");
    const ___e54 = document.createElement("div");
    ___e54.className = "contact-modal-content";
    const ___e55 = document.createElement("div");
    ___e55.className = "contact-modal-header";
    const ___e56 = document.createElement("h2");
    ___e56.setAttribute("id", "contact-modal-title");
    ___e56.appendChild(document.createTextNode(String(t("contact.title"))));
    ___e55.appendChild(___e56);
    const ___e57 = document.createElement("button");
    ___e57.setAttribute("type", "button");
    ___e57.className = "contact-modal-close";
    ___e57.setAttribute("id", "contact-modal-close");
    ___e57.setAttribute("aria-label", String(t("contact.close")));
    ___e57.setAttribute("data-action", "close-contact");
    (Icon("times", "1.2rem")).Mount(___e57);
    ___e55.appendChild(___e57);
    ___e54.appendChild(___e55);
    const ___e58 = document.createElement("form");
    ___e58.className = "contact-form";
    ___e58.setAttribute("id", "contact-form");
    ___e58.setAttribute("novalidate", "");
    (ContactFormFields(form)).Mount(___e58);
    ___e54.appendChild(___e58);
    ___e53.appendChild(___e54);
    ___p.appendChild(___e53);
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
    const ___e59 = document.createElement("footer");
    ___e59.appendChild(document.createTextNode(String(__sprintf("© %d %s. %s.", year, author, t("footer.rights")))));
    ___p.appendChild(___e59);
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
  ((sel,n)=>{const e=document.querySelector(sel);n.Mount(e)})("head",AppStyles());
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
    const ___e60 = document.createElement("nav");
    ___e60.className = "navbar";
    const ___e61 = document.createElement("div");
    ___e61.className = "navbar-inner";
    const ___e62 = document.createElement("a");
    ___e62.className = "navbar-brand";
    ___e62.setAttribute("href", "/");
    ___e62.setAttribute("data-action", "nav");
    ___e62.appendChild(document.createTextNode(String(siteConfig.Title)));
    ___e61.appendChild(___e62);
    const ___e63 = document.createElement("button");
    ___e63.setAttribute("type", "button");
    ___e63.className = toggleBtnClass(mobileOpen);
    ___e63.setAttribute("aria-label", "Toggle navigation");
    ___e63.setAttribute("aria-expanded", String(String(mobileOpen)));
    ___e63.setAttribute("data-action", "toggle-mobile-nav");
    const ___e64 = document.createElement("span");
    ___e64.className = "navbar-toggle-icon";
    ___e63.appendChild(___e64);
    ___e61.appendChild(___e63);
    const ___e65 = document.createElement("div");
    ___e65.className = navbarCollapseClass(mobileOpen);
    const ___e66 = document.createElement("ul");
    ___e66.className = "navbar-nav left";
    const ___e67 = document.createElement("li");
    ___e67.className = "nav-item navbar-menu";
    const ___e68 = document.createElement("a");
    ___e68.className = navLinkClass(r.Kind === RouteBlog);
    ___e68.setAttribute("href", "/blog");
    ___e68.setAttribute("data-action", "nav");
    ___e68.appendChild(document.createTextNode(String(t("nav.blog"))));
    ___e67.appendChild(___e68);
    ___e66.appendChild(___e67);
    const ___e69 = document.createElement("li");
    ___e69.className = dropdownClass(dropdownOpen);
    const ___e70 = document.createElement("button");
    ___e70.setAttribute("type", "button");
    ___e70.className = dropdownToggleClass(r.Kind === RouteProject);
    ___e70.setAttribute("aria-haspopup", "true");
    ___e70.setAttribute("aria-controls", "projects-dropdown");
    ___e70.setAttribute("aria-expanded", String(String(dropdownOpen)));
    ___e70.setAttribute("data-action", "toggle-projects-dropdown");
    ___e70.appendChild(document.createTextNode(String(t("nav.projects"))));
    const ___e71 = document.createElement("span");
    ___e71.className = "dropdown-chevron dropdown-chevron-down";
    (Icon("chevron-down", "0.8em")).Mount(___e71);
    ___e70.appendChild(___e71);
    const ___e72 = document.createElement("span");
    ___e72.className = "dropdown-chevron dropdown-chevron-up";
    (Icon("chevron-up", "0.8em")).Mount(___e72);
    ___e70.appendChild(___e72);
    ___e69.appendChild(___e70);
    const ___e73 = document.createElement("ul");
    ___e73.className = "dropdown-menu";
    ___e73.setAttribute("id", "projects-dropdown");
    for (const p of projects) {
      const ___e74 = document.createElement("li");
      const ___e75 = document.createElement("a");
      ___e75.className = dropdownItemClass(isActiveRoute(r, RouteProject, p.ID));
      ___e75.setAttribute("href", String(p.Href));
      ___e75.setAttribute("data-action", "nav");
      ___e75.appendChild(document.createTextNode(String(p.Title)));
      ___e74.appendChild(___e75);
      ___e73.appendChild(___e74);
    }
    ___e69.appendChild(___e73);
    ___e66.appendChild(___e69);
    for (const page of pages) {
      if (page.ShowInNav) {
        const ___e76 = document.createElement("li");
        ___e76.className = "nav-item navbar-menu";
        const ___e77 = document.createElement("a");
        ___e77.className = navLinkClass(isActiveRoute(r, RoutePage, page.ID));
        ___e77.setAttribute("href", String(page.Href));
        ___e77.setAttribute("data-action", "nav");
        ___e77.appendChild(document.createTextNode(String(page.Title)));
        ___e76.appendChild(___e77);
        ___e66.appendChild(___e76);
      }
    }
    ___e65.appendChild(___e66);
    const ___e78 = document.createElement("ul");
    ___e78.className = "navbar-nav right";
    if (siteConfig.Search.Enabled) {
      const ___e79 = document.createElement("li");
      ___e79.className = "nav-item navbar-icon";
      const ___e80 = document.createElement("button");
      ___e80.setAttribute("type", "button");
      ___e80.className = "nav-link search-toggle";
      ___e80.setAttribute("id", "search-toggle");
      ___e80.setAttribute("aria-label", String(t("aria.search")));
      ___e80.setAttribute("title", String(t("search.buttonTitle")));
      ___e80.setAttribute("data-action", "open-search");
      (Icon("search", "1.35rem")).Mount(___e80);
      ___e79.appendChild(___e80);
      ___e78.appendChild(___e79);
    }
    const ___e81 = document.createElement("li");
    ___e81.className = "nav-item navbar-icon";
    const ___e82 = document.createElement("button");
    ___e82.setAttribute("type", "button");
    ___e82.setAttribute("id", "theme-toggle");
    ___e82.className = "theme-toggle nav-link";
    ___e82.setAttribute("aria-label", String(t("aria.toggleTheme")));
    ___e82.setAttribute("title", String(t("theme.toggleTitle")));
    ___e82.setAttribute("data-action", "toggle-theme");
    (Icon("sun", "1.35rem")).Mount(___e82);
    (Icon("moon", "1.35rem")).Mount(___e82);
    ___e81.appendChild(___e82);
    ___e78.appendChild(___e81);
    if (siteConfig.EmailJS.Enabled) {
      const ___e83 = document.createElement("li");
      ___e83.className = "nav-item navbar-icon";
      const ___e84 = document.createElement("button");
      ___e84.setAttribute("type", "button");
      ___e84.className = "nav-link email-toggle";
      ___e84.setAttribute("id", "email-toggle");
      ___e84.setAttribute("aria-label", String(t("contact.title")));
      ___e84.setAttribute("title", String(t("contact.buttonTitle")));
      ___e84.setAttribute("data-action", "open-contact");
      (Icon("envelope", "1.35rem")).Mount(___e84);
      ___e83.appendChild(___e84);
      ___e78.appendChild(___e83);
    }
    for (const s of siteConfig.Social) {
      const ___e85 = document.createElement("li");
      ___e85.className = "nav-item navbar-icon";
      const ___e86 = document.createElement("a");
      ___e86.className = "nav-link";
      ___e86.setAttribute("href", String(s.Href));
      ___e86.setAttribute("target", String(s.Target));
      ___e86.setAttribute("rel", String(s.Rel));
      (Icon(s.Icon, "1.35rem")).Mount(___e86);
      ___e85.appendChild(___e86);
      ___e78.appendChild(___e85);
    }
    ___e65.appendChild(___e78);
    ___e61.appendChild(___e65);
    ___e60.appendChild(___e61);
    ___p.appendChild(___e60);
  }};
}

function PageView(html, loading, isError) {
  return {Mount(___p) {
    if (isError) {
      const ___e87 = document.createElement("div");
      ___e87.className = "error-message";
      const ___e88 = document.createElement("h1");
      ___e88.appendChild(document.createTextNode(String(t("general.notFound"))));
      ___e87.appendChild(___e88);
      const ___e89 = document.createElement("p");
      ___e89.appendChild(document.createTextNode(String(t("general.notFoundMessage"))));
      ___e87.appendChild(___e89);
      ___p.appendChild(___e87);
    } else if (loading) {
      const ___e90 = document.createElement("div");
      ___e90.className = "loading-spinner";
      ___e90.appendChild(document.createTextNode(String(t("general.loading"))));
      ___p.appendChild(___e90);
    } else {
      const ___e91 = document.createElement("div");
      ___e91.className = "page-view";
      const ___e92 = document.createElement("div");
      ___e92.className = "markdown-body";
      ___e92.insertAdjacentHTML("beforeend", html);
      ___e91.appendChild(___e92);
      ___p.appendChild(___e91);
    }
  }};
}

function ProjectReadme(repo, html, loading, isError) {
  return {Mount(___p) {
    if (repo !== "") {
      if (loading) {
        const ___e93 = document.createElement("div");
        ___e93.setAttribute("id", "project-readme");
        const ___e94 = document.createElement("p");
        ___e94.appendChild(document.createTextNode(String(t("project.loadingReadme"))));
        ___e93.appendChild(___e94);
        ___p.appendChild(___e93);
      } else if (isError) {
        const ___e95 = document.createElement("div");
        ___e95.setAttribute("id", "project-readme");
        const ___e96 = document.createElement("p");
        ___e96.appendChild(document.createTextNode(String(t("project.readmeError"))));
        ___e95.appendChild(___e96);
        ___p.appendChild(___e95);
      } else if (html !== "") {
        const ___e97 = document.createElement("div");
        ___e97.setAttribute("id", "project-readme");
        ___e97.className = "markdown-body";
        ___e97.insertAdjacentHTML("beforeend", html);
        ___p.appendChild(___e97);
      }
    }
  }};
}

function ProjectMedia(videos) {
  return {Mount(___p) {
    if (__len(videos) > 0) {
      const ___e98 = document.createElement("div");
      ___e98.className = "markdown-body";
      const ___e99 = document.createElement("h2");
      ___e99.appendChild(document.createTextNode(String(t("project.media"))));
      ___e98.appendChild(___e99);
      for (const v of videos) {
        const ___e100 = document.createElement("div");
        ___e100.className = "youtube-video";
        const ___e101 = document.createElement("div");
        ___e101.className = "iframeWrapper";
        const ___e102 = document.createElement("iframe");
        ___e102.setAttribute("width", "560");
        ___e102.setAttribute("height", "349");
        ___e102.setAttribute("src", String("https://www.youtube.com/embed/" + v + "?rel=0&hd=1"));
        ___e102.setAttribute("title", "YouTube video player");
        ___e102.setAttribute("allowfullscreen", "");
        ___e101.appendChild(___e102);
        ___e100.appendChild(___e101);
        ___e98.appendChild(___e100);
      }
      ___p.appendChild(___e98);
    }
  }};
}

function ProjectDemo(p) {
  return {Mount(___p) {
    if (p.DemoUrl !== "") {
      const ___e103 = document.createElement("div");
      ___e103.className = "markdown-body";
      const ___e104 = document.createElement("h2");
      ___e104.appendChild(document.createTextNode(String(demoLabel(p))));
      ___e103.appendChild(___e104);
      if (p.DemoInstructions !== "") {
        const ___e105 = document.createElement("p");
        ___e105.appendChild(document.createTextNode(String(p.DemoInstructions)));
        ___e103.appendChild(___e105);
      }
      const ___e106 = document.createElement("div");
      ___e106.className = demoWrapperClass(p.DemoHeight);
      const ___e107 = document.createElement("iframe");
      ___e107.setAttribute("id", "demo");
      ___e107.setAttribute("src", String(p.DemoUrl));
      ___e107.setAttribute("title", String(p.Title + " demo"));
      ___e107.setAttribute("allowfullscreen", "");
      ___e106.appendChild(___e107);
      ___e103.appendChild(___e106);
      if (p.DemoFullscreen) {
        const ___e108 = document.createElement("br");
        ___e103.appendChild(___e108);
        const ___e109 = document.createElement("div");
        ___e109.className = "text-center";
        const ___e110 = document.createElement("button");
        ___e110.setAttribute("type", "button");
        ___e110.setAttribute("id", "fullscreen");
        ___e110.className = "download-btn";
        ___e110.setAttribute("data-action", "toggle-fullscreen");
        (Icon("expand", "1rem")).Mount(___e110);
        const ___e111 = document.createElement("span");
        ___e111.appendChild(document.createTextNode(String(t("project.fullscreen"))));
        ___e110.appendChild(___e111);
        ___e109.appendChild(___e110);
        ___e103.appendChild(___e109);
      }
      ___p.appendChild(___e103);
    }
  }};
}

function ProjectLinks(links) {
  return {Mount(___p) {
    if (__len(links) > 0) {
      const ___e112 = document.createElement("div");
      ___e112.className = "markdown-body";
      const ___e113 = document.createElement("h2");
      ___e113.appendChild(document.createTextNode(String(t("project.links"))));
      ___e112.appendChild(___e113);
      const ___e114 = document.createElement("div");
      ___e114.className = "download-buttons";
      for (const link of links) {
        const ___e115 = document.createElement("a");
        ___e115.setAttribute("href", String(link.Href));
        ___e115.setAttribute("target", "_blank");
        ___e115.setAttribute("rel", "noopener noreferrer");
        ___e115.className = "download-btn";
        (Icon(link.Icon, "1rem")).Mount(___e115);
        const ___e116 = document.createElement("span");
        ___e116.appendChild(document.createTextNode(String(link.Title)));
        ___e115.appendChild(___e116);
        ___e114.appendChild(___e115);
      }
      ___e112.appendChild(___e114);
      ___p.appendChild(___e112);
    }
  }};
}

function ProjectDetail(p, readmeHtml, loading, isError, commentsEnabled) {
  return {Mount(___p) {
    if (isError && p.ID === "") {
      const ___e117 = document.createElement("div");
      ___e117.className = "error-message";
      const ___e118 = document.createElement("h1");
      ___e118.appendChild(document.createTextNode(String(t("general.projectNotFound"))));
      ___e117.appendChild(___e118);
      const ___e119 = document.createElement("p");
      ___e119.appendChild(document.createTextNode(String(t("general.projectNotFoundMessage"))));
      ___e117.appendChild(___e119);
      ___p.appendChild(___e117);
    } else {
      const ___e120 = document.createElement("div");
      ___e120.className = "project-detail";
      const ___e121 = document.createElement("h1");
      ___e121.className = "project-title";
      ___e121.appendChild(document.createTextNode(String(p.Title)));
      ___e120.appendChild(___e121);
      const ___e122 = document.createElement("p");
      ___e122.className = "project-description";
      ___e122.appendChild(document.createTextNode(String(p.Description)));
      ___e120.appendChild(___e122);
      if (__len(p.Tags) > 0) {
        const ___e123 = document.createElement("div");
        ___e123.className = "project-tags";
        for (const tag of p.Tags) {
          const ___e124 = document.createElement("span");
          ___e124.className = "item-tag clickable-tag";
          ___e124.setAttribute("data-search-tag", String(tag));
          ___e124.appendChild(document.createTextNode(String(tag)));
          ___e123.appendChild(___e124);
        }
        ___e120.appendChild(___e123);
      }
      (ProjectReadme(p.GithubRepo, readmeHtml, loading, isError)).Mount(___e120);
      (ProjectMedia(p.YoutubeVideos)).Mount(___e120);
      (ProjectDemo(p)).Mount(___e120);
      (ProjectLinks(p.Links)).Mount(___e120);
      if (commentsEnabled) {
        const ___e125 = document.createElement("div");
        ___e125.className = "giscus-container";
        ___e120.appendChild(___e125);
      }
      ___p.appendChild(___e120);
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
    return "nav-item dropdown show";
  }
  return "nav-item dropdown";
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

async function handleRoute() {
  resetOverlays();
  let path = window.location.pathname;
  let hash = window.location.hash;
  if (hash.startsWith("#!redirect=")) {
    let redirect = decodeURIComponent(hash.slice(11));
    window.history.replaceState({  }, "", redirect);
    path = redirect;
  }
  if (!isInitialRoute) {
    let mainEl = document.querySelector("#main-content");
    if (mainEl != null) {
      mainEl.classList.add("page-transition-out");
      await sleep(200);
    }
  }
  isInitialRoute = false;
  route = parseRoute(path);
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
  window.scrollTo({ "top": 0, "left": 0, "behavior": "instant" });
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;
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
  let found = new BlogPost();
  let isFound = false;
  for (const [_$, p] of __s(posts).entries()) {
    if (p.Slug === slug || p.ID === slug) {
      found = p;
      isFound = true;
      break;
    }
  }
  if (!isFound) {
    currentPostError = true;
    currentPostLoading = false;
    renderRoute();
    return;
  }
  currentPost = found;
  document.title = currentPost.Title + " - " + site.Title;
  {
    let cached = postHtmlCache[currentPost.Filename];
    let ok = (currentPost.Filename) in postHtmlCache;
    if (ok && cached !== "") {
      currentPostHtml = cached;
      currentPostLoading = false;
      currentPostError = false;
    } else {
      currentPostLoading = true;
      currentPostError = false;
      let [mdText, err] = await loadMarkdownFile("/data/blog/" + currentPost.Filename);
      if (err != null) {
        currentPostError = true;
        currentPostLoading = false;
        renderRoute();
        return;
      }
      let [_, content] = parseFrontmatter(mdText);
      let html = parseMarkdown(content);
      postHtmlCache[currentPost.Filename] = html;
      currentPostHtml = html;
      currentPostLoading = false;
      currentPostError = false;
    }
  }
  renderRoute();
  highlightCode();
  loadGiscus();
}

async function showProject(id) {
  let found = new Project();
  let isFound = false;
  for (const [_$, p] of __s(projects).entries()) {
    if (p.ID === id) {
      found = p;
      isFound = true;
      break;
    }
  }
  if (!isFound) {
    currentProject = new Project({ Tags: [], YoutubeVideos: [], Links: [] });
    projectReadmeError = true;
    projectReadmeLoading = false;
    renderRoute();
    return;
  }
  currentProject = found;
  document.title = currentProject.Title + " - " + site.Title;
  if (currentProject.GithubRepo === "") {
    projectReadmeLoading = false;
    projectReadmeError = false;
    renderRoute();
    loadGiscus();
    return;
  }
  {
    let cached = readmeCache[currentProject.GithubRepo];
    let ok = (currentProject.GithubRepo) in readmeCache;
    if (ok && cached !== "") {
      projectReadmeHtml = parseMarkdown(cached);
      projectReadmeLoading = false;
      projectReadmeError = false;
    } else {
      projectReadmeLoading = true;
      projectReadmeError = false;
      let repo = currentProject.GithubRepo;
      if (!repo.includes("/")) {
        repo = site.GithubUsername + "/" + repo;
      }
      let branch = currentProject.GithubBranch;
      if (branch === "") {
        branch = "main";
      }
      let url = "https://raw.githubusercontent.com/" + repo + "/" + branch + "/README.md";
      let [mdText, err] = await loadMarkdownFile(url);
      if (err != null) {
        projectReadmeError = true;
      } else {
        readmeCache[currentProject.GithubRepo] = mdText;
        projectReadmeHtml = parseMarkdown(mdText);
      }
      projectReadmeLoading = false;
    }
  }
  renderRoute();
  highlightCode();
  loadGiscus();
}

async function showPage(id) {
  let found = new NavPage();
  let isFound = false;
  for (const [_$, p] of __s(navPages).entries()) {
    if (p.ID === id) {
      found = p;
      isFound = true;
      break;
    }
  }
  if (!isFound) {
    found = new NavPage({ ID: id, Title: id });
  }
  document.title = found.Title + " - " + site.Title;
  {
    let cached = pageHtmlCache[id];
    let ok = (id) in pageHtmlCache;
    if (ok && cached !== "") {
      currentPageHtml = cached;
      currentPageLoading = false;
      currentPageError = false;
    } else {
      currentPageLoading = true;
      currentPageError = false;
      let [mdText, err] = await loadMarkdownFile("/data/pages/" + id + ".md");
      if (err != null) {
        currentPageError = true;
      } else {
        let html = parseMarkdown(mdText);
        pageHtmlCache[id] = html;
        currentPageHtml = html;
      }
      currentPageLoading = false;
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
      const ___e126 = document.createElement("div");
      ___e126.className = "search-no-results";
      (Icon("search", "3rem")).Mount(___e126);
      const ___e127 = document.createElement("p");
      ___e127.appendChild(document.createTextNode(String(t("search.noResults"))));
      ___e126.appendChild(___e127);
      ___p.appendChild(___e126);
    } else {
      for (const item of results) {
        const ___e128 = document.createElement("article");
        ___e128.className = "search-result-item blog-post-card";
        ___e128.setAttribute("data-action", "open-post");
        ___e128.setAttribute("data-href", String(item.Url));
        const ___e129 = document.createElement("h2");
        ___e129.className = "blog-post-title";
        const ___e130 = document.createElement("a");
        ___e130.setAttribute("href", String(item.Url));
        ___e130.setAttribute("data-action", "nav");
        ___e130.insertAdjacentHTML("beforeend", highlightMatch(item.Title, query));
        ___e129.appendChild(___e130);
        ___e128.appendChild(___e129);
        const ___e131 = document.createElement("div");
        ___e131.className = "blog-post-meta";
        const ___e132 = document.createElement("span");
        ___e132.className = "blog-post-tags";
        if (item.ItemType === "project") {
          const ___e133 = document.createElement("span");
          ___e133.className = "item-tag";
          ___e133.appendChild(document.createTextNode(String(t("badges.project"))));
          ___e132.appendChild(___e133);
        } else {
          const ___e134 = document.createElement("span");
          ___e134.className = "item-tag";
          ___e134.appendChild(document.createTextNode(String(t("badges.blog"))));
          ___e132.appendChild(___e134);
        }
        for (const tag of item.Tags) {
          const ___e135 = document.createElement("span");
          ___e135.className = "item-tag";
          ___e135.appendChild(document.createTextNode(String(tag)));
          ___e132.appendChild(___e135);
        }
        ___e131.appendChild(___e132);
        ___e128.appendChild(___e131);
        const ___e136 = document.createElement("p");
        ___e136.className = "blog-post-excerpt";
        ___e136.insertAdjacentHTML("beforeend", highlightMatch(item.Description, query));
        ___e128.appendChild(___e136);
        ___p.appendChild(___e128);
      }
    }
  }};
}

function SearchModal(open, closing, query, results, placeholder) {
  return {Mount(___p) {
    const ___e137 = document.createElement("div");
    ___e137.setAttribute("id", "search-page");
    ___e137.className = overlayClass(open, closing);
    ___e137.setAttribute("role", "dialog");
    ___e137.setAttribute("aria-modal", "true");
    ___e137.setAttribute("aria-label", String(t("aria.search")));
    const ___e138 = document.createElement("div");
    ___e138.className = "search-page-header";
    const ___e139 = document.createElement("div");
    ___e139.className = "search-page-header-content";
    const ___e140 = document.createElement("button");
    ___e140.setAttribute("type", "button");
    ___e140.className = "search-page-back";
    ___e140.setAttribute("id", "search-page-back");
    ___e140.setAttribute("aria-label", String(t("aria.goBack")));
    ___e140.setAttribute("data-action", "close-search");
    (Icon("arrow-left", "1.2rem")).Mount(___e140);
    ___e139.appendChild(___e140);
    const ___e141 = document.createElement("div");
    ___e141.className = "search-page-input-wrapper";
    const ___e142 = document.createElement("input");
    ___e142.setAttribute("type", "search");
    ___e142.setAttribute("id", "search-page-input");
    ___e142.className = "search-page-input";
    ___e142.setAttribute("placeholder", String(placeholder));
    ___e142.setAttribute("autocomplete", "off");
    ___e142.setAttribute("aria-label", String(t("aria.search")));
    ___e142.setAttribute("value", String(query));
    ___e141.appendChild(___e142);
    const ___e143 = document.createElement("button");
    ___e143.setAttribute("type", "button");
    ___e143.className = searchClearClass(query);
    ___e143.setAttribute("id", "search-page-clear");
    ___e143.setAttribute("aria-label", String(t("aria.clearSearch")));
    ___e143.setAttribute("data-action", "clear-search");
    (Icon("times", "1.2rem")).Mount(___e143);
    ___e141.appendChild(___e143);
    ___e139.appendChild(___e141);
    ___e138.appendChild(___e139);
    ___e137.appendChild(___e138);
    const ___e144 = document.createElement("div");
    ___e144.className = "search-page-content";
    const ___e145 = document.createElement("div");
    ___e145.className = "search-page-results";
    ___e145.setAttribute("id", "search-page-results");
    (SearchResultsList(results, query)).Mount(___e145);
    ___e144.appendChild(___e145);
    ___e137.appendChild(___e144);
    ___p.appendChild(___e137);
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
    for (const [_$, entry] of __s(objectEntries(data.translations.en)).entries()) {
      let k = strVal(entry.key);
      translations[k] = strVal(entry.value);
    }
  }
  site.PostsPerPage = 5;
  if (data.blog != null) {
    if (data.blog.postsPerPage != null) {
      site.PostsPerPage = intVal(data.blog.postsPerPage);
    }
    if (data.blog.posts != null) {
      for (const [_$, p] of __s(data.blog.posts).entries()) {
        let fn = strVal(p.filename);
        let slug = fn;
        if (slug.endsWith(".md")) {
          slug = slug.slice(0, __len(slug) - 3);
        }
        let tags = [];
        if (p.tags != null) {
          for (const [_$, tg] of __s(p.tags).entries()) {
            tags = __append(tags, strVal(tg));
          }
        }
        posts = __append(posts, new BlogPost({ ID: slug, Slug: slug, Title: strVal(p.title), Date: strVal(p.date), Excerpt: strVal(p.excerpt), Tags: tags, Filename: fn, Href: "/blog/" + slug }));
      }
      posts.sort(function(a, b) {
        if (a.Date < b.Date) {
          return 1;
        }
        if (a.Date > b.Date) {
          return -1;
        }
        return 0;
      });
    }
  }
  if (data.projects != null) {
    for (const [_$, p] of __s(data.projects).entries()) {
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
      projects = __append(projects, new Project({ ID: id, Title: strVal(p.title), Description: strVal(p.description), Tags: tags, Order: intVal(p.order), GithubRepo: strVal(p.github_repo), GithubBranch: strVal(p.github_branch), DemoUrl: strVal(p.demo_url), DemoLabel: strVal(p.demo_label), DemoInstructions: strVal(p.demo_instructions), DemoHeight: strVal(p.demo_height), DemoFullscreen: boolVal(p.demo_fullscreen), YoutubeVideos: videos, Links: links, Href: "/project/" + id }));
    }
    projects.sort(function(a, b) {
      return a.Order - b.Order;
    });
  }
  if (data.pages != null) {
    for (const [_$, entry] of __s(objectEntries(data.pages)).entries()) {
      let id = strVal(entry.key);
      let p = entry.value;
      navPages = __append(navPages, new NavPage({ ID: id, Title: strVal(p.title), Order: intVal(p.order), ShowInNav: boolVal(p.showInNav), Href: "/page/" + id }));
    }
    navPages.sort(function(a, b) {
      return a.Order - b.Order;
    });
  }
  updateMetaTags();
  return null;
}

function appCSS() {
  return "\n/* Fonts */\n@font-face {\n\tfont-family: Raleway;\n\tfont-style: normal;\n\tfont-weight: 400;\n\tfont-display: swap;\n\tsrc: url(\"/fonts/raleway-latin-400-normal.woff2\") format(\"woff2\");\n}\n@font-face {\n\tfont-family: Raleway;\n\tfont-style: normal;\n\tfont-weight: 600;\n\tfont-display: swap;\n\tsrc: url(\"/fonts/raleway-latin-600-normal.woff2\") format(\"woff2\");\n}\n@font-face {\n\tfont-family: Raleway;\n\tfont-style: normal;\n\tfont-weight: 700;\n\tfont-display: swap;\n\tsrc: url(\"/fonts/raleway-latin-700-normal.woff2\") format(\"woff2\");\n}\n\n.icon {\n\tdisplay: inline-block;\n\tvertical-align: middle;\n\ttransition: transform var(--transition-fast);\n}\n.icon:hover {\n\ttransform: rotate(5deg) scale(1.1);\n}\n\n/* CSS Custom Properties */\n:root {\n\t--accent: #10B981;\n\t--background-color: #0D1117;\n\t--header-color: #111827;\n\t--hover-color: #1A2332;\n\t--border-color: #21262D;\n\t--font-color: #E6EDF3;\n\t--text-light: #7D8590;\n\t--error-color: #ff6b6b;\n\t--border-width: 2px;\n\t--border-radius: 4px;\n\t--border-radius-large: 8px;\n\t--spacing-xs: 4px;\n\t--spacing-sm: 8px;\n\t--spacing-md: 15px;\n\t--spacing-lg: 24px;\n\t--spacing-xl: 2rem;\n\t--font-family-primary: Raleway, -apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, \"Helvetica Neue\", Arial, sans-serif;\n\t--font-family-mono: Consolas, Monaco, \"Andale Mono\", \"Ubuntu Mono\", monospace;\n\t--font-size-base: 16px;\n\t--font-size-sm: 0.9em;\n\t--font-size-lg: 1.1em;\n\t--theme-transition-duration: 0.25s;\n\t--theme-transition-timing: ease-in-out;\n\t--line-height-base: 1.6;\n\t--transition-fast: 0.2s ease;\n\t--transition-normal: 0.3s ease;\n\t--z-navbar: 1030;\n\t--z-dropdown: 1000;\n}\n\n/* Reset & Base Styles */\nhtml {\n\theight: 100%;\n\toverflow-x: hidden;\n\toverflow-y: scroll;\n\tscroll-behavior: smooth;\n}\nhtml::after {\n\tcontent: \"\";\n\tdisplay: block;\n\theight: 101vh;\n\twidth: 1px;\n\tposition: absolute;\n\ttop: 0;\n\tleft: -1px;\n\tpointer-events: none;\n\tvisibility: hidden;\n}\n\n/* Prevent outer scrollbar when contact modal is open */\nhtml.modal-open,\nbody.modal-open,\nhtml:has(#contact-modal.show),\nbody:has(#contact-modal.show) {\n\toverflow: hidden !important;\n}\n\nhtml.modal-open::after,\nhtml:has(#contact-modal.show)::after {\n\tdisplay: none !important;\n}\n\n*, *::before, *::after {\n\tbox-sizing: border-box;\n}\n\n/* Theme color transitions on elements that change */\nbody, main, nav.navbar, footer, .navbar-inner, .dropdown-menu, .blog-post-card, .search-page-header, .contact-modal-content {\n\ttransition: background-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing);\n}\n\na, button, input, textarea, select, .nav-link, .dropdown-item {\n\ttransition: background-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\topacity var(--transition-fast),\n\t\ttransform var(--transition-fast);\n}\n\nbody {\n\tmin-height: 100vh;\n\tmargin: 0;\n\tpadding-top: 56px;\n\tdisplay: flex;\n\ttext-align: center;\n\tflex-direction: column;\n\tfont-family: var(--font-family-primary);\n\tfont-size: var(--font-size-base);\n\tbackground-color: var(--background-color);\n\tcolor: var(--font-color);\n\tline-height: var(--line-height-base);\n\t-webkit-font-smoothing: antialiased;\n\t-moz-osx-font-smoothing: grayscale;\n\ttext-rendering: optimizeLegibility;\n\toverflow-x: hidden;\n\twidth: 100%;\n}\n\n#app, .app-root {\n\tdisplay: flex;\n\tflex-direction: column;\n\tmin-height: calc(100vh - 56px);\n\tflex: 1 0 auto;\n}\n\n/* Region mount points: transparent to layout */\n#navbar-slot, #content-slot {\n\tdisplay: contents;\n}\n\nmain {\n\tmargin: 0 auto;\n\tpadding: var(--spacing-lg);\n\tflex: 1 0 auto;\n\tmax-width: 900px;\n\twidth: 100%;\n\tbackground-color: var(--background-color);\n\tcolor: var(--font-color);\n\tanimation: fadeIn 0.2s ease-in-out;\n}\nmain:focus {\n\toutline: none;\n}\n\n/* Page transition animations */\n@keyframes fadeIn {\n\tfrom {\n\t\topacity: 0;\n\t\ttransform: translateY(10px);\n\t}\n\tto {\n\t\topacity: 1;\n\t\ttransform: translateY(0);\n\t}\n}\n\nmain.page-transition-out {\n\tanimation: fadeOut 0.2s ease-in-out forwards;\n}\n\n@keyframes fadeOut {\n\tfrom {\n\t\topacity: 1;\n\t\ttransform: translateY(0);\n\t}\n\tto {\n\t\topacity: 0;\n\t\ttransform: translateY(-10px);\n\t}\n}\n\nimg {\n\tmax-width: 100%;\n}\n\na {\n\tcolor: var(--accent);\n}\na.icon:hover {\n\ttext-decoration: none;\n}\n\n/* Tags */\n.item-tag {\n\tbackground-color: var(--hover-color);\n\tcolor: var(--accent);\n\tpadding: var(--spacing-xs) var(--spacing-sm);\n\tborder-radius: var(--border-radius);\n\tfont-size: var(--font-size-sm);\n\tdisplay: inline-block;\n\tmargin: 2px;\n}\n.clickable-tag {\n\tcursor: pointer;\n\ttransition: all var(--transition-fast);\n}\n.clickable-tag:hover {\n\tbackground-color: var(--accent);\n\tcolor: var(--background-color);\n\ttransform: translateY(-1px);\n\tbox-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n}\n\n/* About Page */\n.about-pic {\n\twidth: 15vh;\n\theight: 15vh;\n\tborder-radius: 50%;\n\tmargin-bottom: 20px;\n\tobject-fit: cover;\n\ttransition: transform var(--transition-normal);\n}\n.about-pic:hover {\n\ttransform: scale(1.05);\n}\n\n@keyframes imageLoad {\n\tfrom { opacity: 0; transform: scale(0.95); }\n\tto { opacity: 1; transform: scale(1); }\n}\n\n/* Shared Loading & Error styles */\n.loading-spinner {\n\ttext-align: center;\n\tpadding: 2rem;\n\tcolor: var(--accent);\n\tfont-size: 1.2em;\n\tanimation: pulse 1.5s ease-in-out infinite;\n}\n@keyframes pulse {\n\t0%, 100% { opacity: 1; }\n\t50% { opacity: 0.5; }\n}\n\n.error-message {\n\ttext-align: center;\n\tpadding: 2rem;\n\tmax-width: 600px;\n\tmargin: 0 auto;\n}\n.error-message h1 {\n\tcolor: #ff6b6b;\n\tmargin-bottom: 1rem;\n\tfont-size: 2em;\n}\n.error-message p {\n\tcolor: var(--text-light);\n\tfont-size: 1.1em;\n}\n\n/* Accessibility */\nbutton:focus, a:focus, input:focus, select:focus, textarea:focus {\n\toutline: 2px solid var(--accent);\n\toutline-offset: 2px;\n}\n*:focus:not(:focus-visible) {\n\toutline: none;\n}\n\n/* Navbar */\nnav.navbar {\n\tbackground-color: var(--header-color);\n\tborder-bottom: var(--border-width) solid var(--accent);\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tz-index: var(--z-navbar);\n\tfont-family: var(--font-family-primary);\n}\nnav.navbar .navbar-inner {\n\tmax-width: 1000px;\n\tmargin-inline: auto;\n\tpadding: 0 15px;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n}\nnav.navbar .navbar-brand {\n\tcolor: var(--font-color);\n\tfont-weight: bold;\n\ttext-decoration: none;\n\tfont-size: 1.25em;\n\tdisplay: none;\n\tpadding: 11px 0;\n}\nnav.navbar .navbar-collapse {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: space-between;\n\twidth: 100%;\n}\nnav.navbar .navbar-nav {\n\tdisplay: flex;\n\tlist-style: none;\n\tmargin: 0;\n\tpadding: 0;\n\talign-items: stretch;\n}\nnav.navbar .navbar-nav.left {\n\tmargin-right: auto;\n}\nnav.navbar .navbar-nav.right {\n\tmargin-left: auto;\n}\nnav.navbar .nav-item {\n\tposition: relative;\n\tdisplay: flex;\n\talign-items: stretch;\n}\nbutton.nav-link {\n\tbackground: none;\n\tborder: none;\n\tcursor: pointer;\n\tfont-family: inherit;\n\tfont-size: inherit;\n\twidth: auto;\n\ttransition: transform 0.1s ease, background-color var(--transition-fast), color var(--transition-fast);\n}\nbutton.nav-link:active {\n\ttransform: scale(0.95);\n}\n.nav-link {\n\tdisplay: flex;\n\talign-items: center;\n\tpadding: 11px 20px;\n\tcolor: var(--font-color);\n\ttext-decoration: none;\n\tline-height: 1.2;\n\tfont-size: 1.25em;\n\tfont-weight: 700;\n\ttransition: background-color var(--transition-fast),\n\t\t\t\tcolor var(--transition-fast),\n\t\t\t\tborder-color var(--transition-fast),\n\t\t\t\topacity var(--transition-fast),\n\t\t\t\ttransform var(--transition-fast);\n}\n.navbar-menu .nav-link, .navbar-icon .nav-link {\n\tfont-size: 1.35rem;\n}\n.navbar-menu .nav-link {\n\tfont-weight: 700;\n}\n.navbar-icon .nav-link svg {\n\ttransition: transform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),\n\t\t\t\trotate 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n\ttransform-origin: center;\n}\n.navbar-icon .nav-link:hover svg, .navbar-icon .nav-link:focus svg {\n\ttransform: rotate(8deg) scale(1.25);\n}\n.navbar-icon .nav-link:active svg {\n\ttransform: rotate(4deg) scale(1.1);\n}\n.nav-link:hover, .nav-link:focus, .nav-link:active {\n\tcolor: var(--accent);\n\tbackground-color: var(--hover-color);\n}\n.nav-link.active {\n\tcolor: var(--accent);\n\tbackground-color: var(--hover-color);\n}\n.nav-link:focus:not(.active) {\n\toutline: 2px solid var(--accent);\n\toutline-offset: -2px;\n}\n.nav-link:focus:not(:focus-visible):not(.active) {\n\tbackground-color: transparent;\n\tcolor: var(--font-color);\n\toutline: none;\n}\n.nav-link.active:focus {\n\toutline: none;\n}\n.nav-link:focus:not(:focus-visible):hover {\n\tbackground-color: var(--hover-color);\n\tcolor: var(--accent);\n}\n\n@media (min-width: 768px) {\n\tnav.navbar .navbar-inner {\n\t\tpadding-left: 20px;\n\t\tpadding-right: 20px;\n\t}\n}\n\n.navbar-toggle {\n\tdisplay: none;\n\tbackground: transparent;\n\tborder: none;\n\tcolor: var(--font-color);\n\tfont-size: 1.5em;\n\tcursor: pointer;\n\tpadding: 11px 0.5rem;\n\ttransition: transform var(--transition-fast);\n\toverflow: visible;\n}\n.navbar-toggle:focus {\n\toutline: 2px solid var(--accent);\n\toutline-offset: 2px;\n}\n.navbar-toggle:focus:not(:focus-visible) {\n\toutline: none;\n}\n.navbar-toggle:active {\n\ttransform: scale(0.9);\n}\n.navbar-toggle-icon {\n\tdisplay: block;\n\twidth: 24px;\n\theight: 2px;\n\tbackground-color: currentColor;\n\tposition: relative;\n\ttransition: background-color var(--transition-normal);\n\tz-index: 1;\n}\n.navbar-toggle-icon::before {\n\tcontent: '';\n\tdisplay: block;\n\twidth: 24px;\n\theight: 2px;\n\tbackground-color: currentColor;\n\tposition: absolute;\n\tleft: 0;\n\ttop: -8px;\n\ttransition: all var(--transition-normal);\n}\n.navbar-toggle-icon::after {\n\tcontent: '';\n\tdisplay: block;\n\twidth: 24px;\n\theight: 2px;\n\tbackground-color: currentColor;\n\tposition: absolute;\n\tleft: 0;\n\tbottom: -8px;\n\ttransition: all var(--transition-normal);\n}\n.navbar-toggle.active .navbar-toggle-icon {\n\tbackground-color: transparent;\n}\n.navbar-toggle.active .navbar-toggle-icon::before {\n\ttransform: rotate(45deg);\n\ttop: 0;\n}\n.navbar-toggle.active .navbar-toggle-icon::after {\n\ttransform: rotate(-45deg);\n\tbottom: 0;\n}\n\n/* Dropdown */\n.dropdown {\n\tposition: relative;\n}\n.dropdown-toggle {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.3rem;\n}\n.dropdown-chevron {\n\tdisplay: inline-flex;\n\talign-items: center;\n\ttransition: transform var(--transition-fast);\n\ttransform-origin: center;\n}\n.dropdown-chevron svg {\n\twidth: 0.8em;\n\theight: 0.8em;\n}\n.dropdown-chevron-down {\n\tdisplay: inline-flex;\n}\n.dropdown-chevron-up {\n\tdisplay: none;\n}\n.dropdown.show .dropdown-chevron-down {\n\tdisplay: none;\n}\n.dropdown.show .dropdown-chevron-up {\n\tdisplay: inline-flex;\n}\n.dropdown-menu {\n\tposition: absolute;\n\ttop: 100%;\n\tleft: 0;\n\tmin-width: 200px;\n\tbackground-color: var(--header-color);\n\tborder: var(--border-width) solid var(--accent);\n\tpadding: 0;\n\tmargin: 0;\n\tlist-style: none;\n\tz-index: var(--z-dropdown);\n\tbox-shadow: 0 6px 12px rgba(66, 155, 238, 0.2);\n\topacity: 0;\n\tvisibility: hidden;\n\ttransform: translateY(-5px);\n\ttransition: all 0.2s ease;\n}\n.dropdown.show .dropdown-menu {\n\topacity: 1;\n\tvisibility: visible;\n\ttransform: translateY(0);\n}\n.dropdown-item {\n\tdisplay: block;\n\tpadding: 10px 20px;\n\tcolor: var(--font-color);\n\ttext-decoration: none;\n\tfont-size: 16px;\n\tfont-weight: bold;\n\tbackground-color: var(--header-color);\n\ttransition: all var(--transition-fast);\n\tborder: none;\n\twidth: 100%;\n\ttext-align: left;\n\twhite-space: nowrap;\n}\n.dropdown-item:hover, .dropdown-item:focus, .dropdown-item:active, .dropdown-item.active {\n\tbackground-color: var(--hover-color);\n\tcolor: var(--accent);\n}\n.dropdown-item.active:focus {\n\toutline: none;\n}\n\n/* Theme Toggle */\n.theme-toggle {\n\tbackground: none;\n\tborder: none;\n\tcolor: var(--font-color);\n\tcursor: pointer;\n\tpadding: 11px 20px;\n\tdisplay: flex;\n\talign-items: center;\n\tfont-size: 1.35rem;\n\ttransition: color var(--transition-fast), background-color var(--transition-fast);\n}\n.theme-toggle:hover, .theme-toggle:focus {\n\tcolor: var(--accent);\n\tbackground-color: var(--hover-color);\n}\n.theme-toggle:hover svg, .theme-toggle:focus svg {\n\ttransform: rotate(8deg) scale(1.25);\n}\n.theme-toggle:active {\n\tcolor: var(--accent);\n}\n.theme-toggle:active svg {\n\ttransform: rotate(4deg) scale(1.1);\n}\n.theme-toggle svg {\n\ttransition: opacity var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\t\ttransform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),\n\t\t\t\tfill var(--transition-fast);\n\tfill: currentColor;\n}\n:root[data-theme=\"dark\"] .theme-toggle .icon-sun {\n\tdisplay: inline-block;\n\topacity: 1;\n}\n:root[data-theme=\"dark\"] .theme-toggle .icon-moon {\n\tdisplay: none;\n\topacity: 0;\n}\n:root[data-theme=\"light\"] .theme-toggle .icon-sun {\n\tdisplay: none;\n\topacity: 0;\n}\n:root[data-theme=\"light\"] .theme-toggle .icon-moon {\n\tdisplay: inline-block;\n\topacity: 1;\n}\n\n/* Mobile navbar */\n@media (max-width: 767px) {\n\tnav.navbar .navbar-brand {\n\t\tdisplay: block;\n\t}\n\t.navbar-toggle {\n\t\tdisplay: block;\n\t}\n\tnav.navbar .navbar-collapse {\n\t\tposition: absolute;\n\t\ttop: 100%;\n\t\tleft: 0;\n\t\tright: 0;\n\t\tbackground-color: var(--header-color);\n\t\tborder-bottom: var(--border-width) solid var(--accent);\n\t\tflex-direction: column;\n\t\talign-items: stretch;\n\t\tmax-height: 0;\n\t\toverflow: hidden;\n\t\ttransition: max-height 0.25s ease-in;\n\t}\n\tnav.navbar .navbar-collapse.show {\n\t\tmax-height: 800px;\n\t\toverflow-y: auto;\n\t\toverflow-x: hidden;\n\t\ttransition: max-height 0.8s ease-out;\n\t}\n\tnav.navbar .navbar-nav {\n\t\tflex-direction: column;\n\t\twidth: 100%;\n\t\tmax-width: 100%;\n\t\toverflow-x: hidden;\n\t}\n\tnav.navbar .navbar-nav.left, nav.navbar .navbar-nav.right {\n\t\tmargin: 0;\n\t}\n\tnav.navbar .navbar-nav.right {\n\t\tflex-direction: row;\n\t\tjustify-content: center;\n\t\tpadding: 10px 0;\n\t\tmargin-top: 10px;\n\t}\n\tnav.navbar .navbar-nav.right .nav-item {\n\t\tdisplay: inline-flex;\n\t}\n\tnav.navbar .navbar-nav.right .nav-link {\n\t\tpadding: 10px 15px;\n\t\theight: auto;\n\t}\n\tnav.navbar .navbar-nav.left .nav-item {\n\t\twidth: 100%;\n\t\theight: auto;\n\t\toverflow: hidden;\n\t}\n\tnav.navbar .navbar-nav.left .nav-link {\n\t\theight: auto;\n\t\tpadding: 12px 20px;\n\t\twidth: 100%;\n\t\tjustify-content: flex-start;\n\t}\n\t.dropdown {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\twidth: 100%;\n\t}\n\t.dropdown-menu {\n\t\tposition: static;\n\t\tborder: none;\n\t\tbox-shadow: none;\n\t\twidth: 100%;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tmax-height: 0;\n\t\toverflow: hidden;\n\t\ttransition: max-height 0.4s ease-out;\n\t\torder: 2;\n\t}\n\t.dropdown-toggle {\n\t\torder: 1;\n\t\twidth: 100%;\n\t}\n\t.dropdown.show .dropdown-menu {\n\t\tmax-height: 500px;\n\t\ttransition: max-height 0.5s ease-out;\n\t}\n\t.dropdown-item {\n\t\tpadding-left: 40px;\n\t\twidth: 100%;\n\t\ttext-align: left;\n\t\twhite-space: normal;\n\t\tword-wrap: break-word;\n\t}\n}\n\n/* Blog List */\n.blog-container {\n\tmax-width: 900px;\n\tmargin: 0 auto;\n\ttext-align: left;\n}\n.blog-page-title {\n\tcolor: var(--accent);\n\tfont-size: 2em;\n\tmargin-bottom: 1.5rem;\n\ttext-align: center;\n}\n.blog-empty {\n\ttext-align: center;\n\tcolor: var(--text-light);\n\tfont-size: 1.1em;\n\tpadding: 2rem 0;\n}\n.blog-posts {\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 1.5rem;\n\tmargin-bottom: 2rem;\n}\n.blog-post-card {\n\tpadding: 1.5rem;\n\tbackground-color: rgba(255, 255, 255, 0.02);\n\tborder: 1px solid var(--border-color);\n\tborder-radius: var(--border-radius-large);\n\ttransition: all var(--transition-normal);\n\tcursor: pointer;\n}\n.blog-post-card:hover {\n\tbackground-color: rgba(255, 255, 255, 0.05);\n\tborder-color: var(--accent);\n\ttransform: translateY(-4px) scale(1.01);\n\tbox-shadow: 0 8px 25px rgba(66, 155, 238, 0.15);\n}\n.blog-post-title {\n\tmargin: 0 0 0.35rem 0;\n\tfont-size: 1.35em;\n\tfont-weight: bold;\n\tline-height: 1.3;\n}\n.blog-post-title a {\n\tcolor: var(--accent);\n\ttext-decoration: none;\n\ttransition: color var(--transition-fast);\n}\n.blog-post-title a:hover {\n\tcolor: var(--font-color);\n}\n.blog-post-meta {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\talign-items: center;\n\tgap: 0.75rem;\n\tmargin-bottom: 0.75rem;\n\tfont-size: 1em;\n\tcolor: var(--text-light);\n}\n.blog-post-date {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.4rem;\n}\n.blog-post-tags {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tgap: 0.4rem;\n}\n.blog-post-excerpt {\n\tcolor: var(--text-light);\n\tline-height: 1.5;\n\tmargin-bottom: 0;\n\tfont-size: 1.05em;\n}\n.blog-post-card mark {\n\tbackground-color: var(--accent);\n\tcolor: var(--background-color);\n\tpadding: 1px 3px;\n\tborder-radius: 2px;\n\tfont-weight: bold;\n}\n\n.blog-pagination {\n\tmargin: 2rem 0;\n\tdisplay: flex;\n\tjustify-content: center;\n}\n.blog-pagination .pagination {\n\tdisplay: flex;\n\tgap: 0.5rem;\n\tlist-style: none;\n\tpadding: 0;\n\tmargin: 0;\n}\n.blog-pagination .page-item {\n\tdisplay: flex;\n}\n.blog-pagination .page-link {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tjustify-content: center;\n\tpadding: 0.5rem 0.75rem;\n\tbackground-color: rgba(255, 255, 255, 0.02);\n\tborder: 1px solid var(--border-color);\n\tborder-radius: var(--border-radius);\n\tcolor: var(--font-color);\n\ttext-decoration: none;\n\ttransition: all var(--transition-fast);\n\tcursor: pointer;\n\tmin-width: 40px;\n\theight: 38px;\n\tbox-sizing: border-box;\n\ttext-align: center;\n}\n.blog-pagination .page-link svg {\n\tdisplay: inline-block;\n\tvertical-align: middle;\n}\n.blog-pagination .page-link:hover {\n\tbackground-color: var(--hover-color);\n\tborder-color: var(--accent);\n\tcolor: var(--accent);\n}\n.blog-pagination .page-item.active .page-link {\n\tbackground-color: var(--accent);\n\tborder-color: var(--accent);\n\tcolor: var(--background-color);\n\tfont-weight: bold;\n}\n.blog-pagination .page-item.disabled .page-link {\n\topacity: 0.5;\n\tcursor: not-allowed;\n\tpointer-events: none;\n}\n\n@media (max-width: 767px) {\n\t.blog-post-card {\n\t\tpadding: 1rem;\n\t\tmargin: 0.25rem;\n\t\ttext-align: center;\n\t}\n\t.blog-posts {\n\t\tgap: 0.5rem;\n\t}\n\t.blog-post-title {\n\t\tfont-size: 1.25em;\n\t}\n\t.blog-post-meta {\n\t\tflex-direction: column;\n\t\talign-items: center;\n\t\tgap: 0.5rem;\n\t\tfont-size: 0.95em;\n\t\tjustify-content: center;\n\t}\n\t.blog-post-excerpt {\n\t\tfont-size: 1em;\n\t}\n\t.blog-pagination .page-link {\n\t\tpadding: 0.4rem 0.6rem;\n\t\tfont-size: 0.9em;\n\t\tmin-width: 35px;\n\t\theight: 35px;\n\t}\n}\n\n/* Projects */\n.project-title {\n\tcolor: var(--accent);\n\tfont-size: 1.5em;\n\tmargin: 0 0 0.02em 0;\n\tfont-weight: bold;\n}\n.project-description {\n\tmargin: 0 0 0.5em 0;\n\tcolor: var(--text-light);\n\tfont-size: 1.2em;\n\tline-height: 1.6;\n}\n.project-tags {\n\tmargin: 0.8em 0;\n\tfont-size: 1.1em;\n}\n.youtube-video {\n\tmargin: 20px 0;\n}\n.iframeWrapper {\n\tposition: relative;\n\tpadding-bottom: 56.25%;\n\tpadding-top: 25px;\n\theight: 0;\n}\n.iframeWrapper iframe {\n\tposition: absolute;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tmax-width: 100%;\n\toverflow: hidden;\n}\n.demo-iframe-wrapper {\n\twidth: 100%;\n\tmargin: 20px 0;\n}\n.demo-iframe-wrapper iframe {\n\twidth: 100%;\n\theight: 700px;\n\tmax-width: 100%;\n\tborder: none;\n\toverflow: hidden;\n}\n.download-buttons {\n\tdisplay: flex;\n\tflex-wrap: wrap;\n\tgap: 15px;\n\tmargin: 1.5em 0;\n\tjustify-content: flex-start;\n}\n.download-btn {\n\tdisplay: inline-flex;\n\talign-items: center;\n\tjustify-content: center;\n\tgap: 8px;\n\tpadding: 12px 24px;\n\tbackground-color: var(--hover-color);\n\tborder: 2px solid var(--accent);\n\tborder-radius: 8px;\n\tcolor: var(--font-color);\n\ttext-decoration: none;\n\tfont: 600 1em var(--font-family-primary);\n\ttransition: all var(--transition-normal);\n\tcursor: pointer;\n\tappearance: none;\n}\n.download-btn:hover, .download-btn:focus {\n\tbackground-color: var(--hover-color);\n\tborder-color: var(--accent);\n\ttransform: translateY(-2px);\n\tbox-shadow: 0 4px 12px rgba(66, 155, 238, 0.3);\n\tcolor: var(--accent);\n\ttext-decoration: none;\n}\n.download-btn:active {\n\ttransform: translateY(0) scale(0.95);\n\ttext-decoration: none;\n}\n\n/* Markdown */\n.markdown-body {\n\tfont-family: var(--font-family-primary);\n\tfont-size: 1em;\n\tline-height: 1.6;\n\tcolor: var(--text-light);\n\ttext-align: left;\n}\n.markdown-body h1, .markdown-body h2, .markdown-body h3, .markdown-body h4, .markdown-body h5, .markdown-body h6 {\n\tcolor: var(--font-color);\n\tmargin: 1em 0 0.5em;\n\tfont-weight: bold;\n\tline-height: 1.25;\n}\n.markdown-body h1 {\n\tfont-size: 1.8em;\n\tmargin-top: 0;\n}\n.markdown-body h2 {\n\tfont-size: 1.4em;\n}\n.markdown-body h3 {\n\tfont-size: 1.2em;\n}\n.markdown-body p, .markdown-body li {\n\tmargin: 0.5em 0;\n\tline-height: 1.6;\n\tfont-size: 1.1em;\n\tcolor: var(--text-light);\n}\n.markdown-body ul, .markdown-body ol {\n\tmargin: 0.5em 0;\n\tpadding-left: 2em;\n}\n.markdown-body code:not([class*=\"language-\"]) {\n\tbackground-color: var(--hover-color);\n\tcolor: var(--font-color);\n\tpadding: 2px 6px;\n\tborder-radius: 3px;\n\tfont-family: var(--font-family-mono);\n\tfont-size: 0.9em;\n}\n.markdown-body pre:not([class*=\"language-\"]) {\n\tbackground-color: var(--hover-color);\n\tpadding: 0.5em;\n\tborder-radius: 3px;\n\toverflow-x: auto;\n\tmargin: 0.5em 0;\n\tborder: 1px solid var(--border-color);\n\tfont-family: var(--font-family-mono);\n\tline-height: 1.4;\n}\n.markdown-body pre[class*=\"language-\"] {\n\tmargin: 0.5em 0;\n\toverflow-x: auto;\n\tfont-family: var(--font-family-mono);\n\tline-height: 1.4;\n\tposition: relative;\n}\n.markdown-body a {\n\tcolor: var(--accent);\n\ttext-decoration: none;\n\tdisplay: inline-block;\n\ttransition: transform var(--transition-fast);\n}\n.markdown-body a:hover {\n\ttext-decoration: none;\n\ttransform: translateY(-2px);\n}\n.markdown-body blockquote {\n\tborder-left: 4px solid var(--accent);\n\tpadding-left: 1em;\n\tmargin: 0.5em 0;\n\tfont-style: italic;\n}\n.markdown-body table {\n\twidth: 100%;\n\tborder-collapse: collapse;\n\tmargin: 0.5em 0;\n}\n.markdown-body th, .markdown-body td {\n\tborder: 1px solid var(--border-color);\n\tpadding: 0.5em 1em;\n\ttext-align: left;\n}\n.markdown-body th {\n\tbackground-color: var(--hover-color);\n\tcolor: var(--accent);\n\tfont-weight: bold;\n}\n.markdown-body hr {\n\tborder: none;\n\tborder-top: 1px solid var(--border-color);\n\tmargin: 0.5em 0;\n}\n\n/* Copy Code Button */\n.copy-code-button {\n\tposition: absolute;\n\ttop: 0.5em;\n\tright: 0.5em;\n\tpadding: 0.4em 0.8em;\n\tfont-size: 0.85em;\n\tfont-family: var(--font-family-primary);\n\tfont-weight: 700;\n\tbackground-color: var(--hover-color);\n\tcolor: var(--font-color);\n\tborder: 1px solid var(--border-color);\n\tborder-radius: var(--border-radius);\n\tcursor: pointer;\n\topacity: 0;\n\ttransition: opacity var(--transition-fast), background-color var(--transition-fast);\n\tz-index: 10;\n}\npre:hover .copy-code-button {\n\topacity: 1;\n}\n.copy-code-button:hover {\n\tbackground-color: var(--accent);\n\tcolor: var(--background-color);\n}\n.copy-code-button:active {\n\ttransform: scale(0.95);\n}\n.copy-code-button.copied {\n\tbackground-color: #10b981;\n\tcolor: white;\n\topacity: 1;\n}\n\n/* Giscus comments */\n.giscus-container {\n\tmax-width: 900px;\n\tmargin: 3rem auto;\n\tpadding: 2rem 1rem;\n\tborder-top: 2px solid var(--border-color);\n}\n.giscus-container iframe {\n\tcolor-scheme: dark;\n}\n\n/* Search Page / Overlay */\n#search-page {\n\tdisplay: none;\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tbackground-color: var(--background-color);\n\tz-index: 2000;\n\tflex-direction: column;\n\toverflow: hidden;\n\topacity: 0;\n\ttransform: scale(0.95);\n\tanimation: scaleFadeIn 0.25s ease-out forwards;\n}\n#search-page.show {\n\tdisplay: flex;\n}\n#search-page.closing {\n\tanimation: scaleFadeOut 0.2s ease-in forwards;\n}\n.search-page-header {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\theight: 56px;\n\tpadding: 0 1rem;\n\tbackground-color: var(--header-color);\n\tborder-bottom: var(--border-width) solid var(--accent);\n\tanimation: slideDown var(--transition-normal) ease-out;\n}\n.search-page-header-content {\n\tdisplay: flex;\n\talign-items: center;\n\tgap: 0.75rem;\n\twidth: 100%;\n\tmax-width: 900px;\n}\n.search-page-back {\n\tbackground: none;\n\tborder: none;\n\tcolor: var(--font-color);\n\tcursor: pointer;\n\tpadding: 0.5rem;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tfont-size: 1.2em;\n\ttransition: color var(--transition-fast);\n}\n.search-page-back:hover {\n\tcolor: var(--accent);\n}\n.search-page-input-wrapper {\n\tflex: 1;\n\tposition: relative;\n\tdisplay: flex;\n\talign-items: center;\n}\n.search-page-input {\n\twidth: 100%;\n\tpadding: 0.5rem 2.5rem 0.5rem 1rem;\n\tbackground-color: var(--hover-color);\n\tborder: 1px solid var(--border-color);\n\tborder-radius: 20px;\n\tcolor: var(--font-color);\n\tfont-size: 1em;\n}\n.search-page-input::-webkit-search-cancel-button {\n\t-webkit-appearance: none;\n\tappearance: none;\n}\n.search-page-input:focus {\n\toutline: none;\n\tborder-color: var(--accent);\n\tbackground-color: var(--background-color);\n\tbox-shadow: 0 0 0 3px rgba(66, 155, 238, 0.1);\n}\n.search-page-clear {\n\tposition: absolute;\n\tright: 0.5rem;\n\tbackground: none;\n\tborder: none;\n\tcolor: var(--text-light);\n\tcursor: pointer;\n\tpadding: 0.25rem 0.5rem;\n\tdisplay: none;\n\ttransition: color var(--transition-fast);\n}\n.search-page-clear:hover {\n\tcolor: var(--accent);\n}\n.search-page-clear.show {\n\tdisplay: block;\n}\n.search-page-content {\n\tflex: 1;\n\toverflow-y: auto;\n\tpadding: 1rem;\n\tdisplay: flex;\n\tjustify-content: center;\n\tanimation: fadeIn 0.4s ease-out 0.1s both;\n}\n.search-page-results {\n\tdisplay: flex;\n\tflex-direction: column;\n\tgap: 1.5rem;\n\twidth: 100%;\n\tmax-width: 900px;\n\ttext-align: left;\n}\n.search-no-results {\n\tpadding: var(--spacing-xl);\n\ttext-align: center;\n\tcolor: var(--text-light);\n}\n.search-no-results p {\n\tmargin: 0;\n\tfont-size: 0.9em;\n}\n\n/* Contact Modal */\n#contact-modal {\n\tdisplay: none;\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: rgba(0, 0, 0, 0.8);\n\tz-index: 10000;\n\toverflow-y: auto;\n\tpadding: 2rem 1rem;\n}\n#contact-modal.show {\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n}\n#contact-modal.closing {\n\tanimation: fadeOut 0.2s ease-in-out forwards;\n}\n.contact-modal-content {\n\tbackground-color: var(--background-color);\n\tborder: 2px solid var(--border-color);\n\tborder-radius: 8px;\n\tpadding: 1.5rem;\n\tmax-width: 450px;\n\twidth: 100%;\n\tposition: relative;\n\tbox-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);\n\topacity: 0;\n\ttransform: scale(0.95);\n\tanimation: scaleFadeIn 0.25s ease-out forwards;\n}\n.contact-modal-header {\n\tdisplay: flex;\n\tjustify-content: space-between;\n\talign-items: center;\n\tmargin-bottom: 1rem;\n}\n.contact-modal-header h2 {\n\tmargin: 0;\n\tcolor: var(--accent);\n\tfont-size: 1.25rem;\n}\n.contact-modal-close {\n\tbackground: none;\n\tborder: none;\n\tcolor: var(--text-light);\n\tfont-size: 1.5rem;\n\tcursor: pointer;\n\tpadding: 0;\n\twidth: 32px;\n\theight: 32px;\n\tdisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tborder-radius: 4px;\n\ttransition: all 0.2s ease;\n}\n.contact-modal-close:hover {\n\tbackground-color: var(--hover-color);\n\tcolor: var(--font-color);\n}\n.contact-form .form-group {\n\tmargin-bottom: 0.75rem;\n}\n.contact-form label {\n\tdisplay: block;\n\tmargin-bottom: 0.25rem;\n\tcolor: var(--font-color);\n\tfont-weight: 600;\n\tfont-size: 0.9rem;\n\ttext-align: left;\n}\n.contact-form input, .contact-form textarea {\n\twidth: 100%;\n\tpadding: 0.6rem;\n\tbackground-color: var(--hover-color);\n\tborder: 1px solid var(--border-color);\n\tborder-radius: 4px;\n\tcolor: var(--font-color);\n\tfont-family: inherit;\n\tfont-size: 0.95rem;\n\ttransition: border-color 0.2s ease;\n}\n.contact-form input:focus, .contact-form textarea:focus {\n\toutline: none;\n\tborder-color: var(--accent);\n}\n.contact-form input.error, .contact-form textarea.error {\n\tborder-color: #ef4444;\n}\n.contact-form textarea {\n\tresize: vertical;\n\tmin-height: 100px;\n}\n.form-status {\n\tpadding: 0.6rem;\n\tborder-radius: 4px;\n\tmargin-bottom: 0.25rem;\n\ttext-align: center;\n\tfont-size: 0.9rem;\n\tdisplay: none;\n}\n.form-status.success, .form-status.error {\n\tdisplay: block;\n}\n.form-status.success {\n\tbackground-color: rgba(16, 185, 129, 0.1);\n\tborder: 1px solid var(--accent);\n\tcolor: var(--accent);\n}\n.form-status.error {\n\tbackground-color: rgba(239, 68, 68, 0.1);\n\tborder: 1px solid #ef4444;\n\tcolor: #ef4444;\n}\n.contact-form .btn {\n\twidth: 100%;\n\tpadding: 12px 24px;\n\tmargin-top: 0.75rem;\n\tbackground-color: var(--hover-color);\n\tborder: 2px solid var(--accent);\n\tborder-radius: 8px;\n\tcolor: var(--font-color);\n\tfont-weight: 600;\n\tfont-size: 1em;\n\tcursor: pointer;\n\ttransition: all var(--transition-normal);\n}\n.contact-form .btn:hover:not(:disabled) {\n\tbackground-color: var(--hover-color);\n\tborder-color: var(--accent);\n\tcolor: var(--accent);\n\ttransform: translateY(-2px);\n\tbox-shadow: 0 4px 12px rgba(66, 155, 238, 0.3);\n}\n.contact-form .btn:disabled {\n\topacity: 0.5;\n\tcursor: not-allowed;\n\ttransform: none;\n}\n\n@keyframes scaleFadeIn {\n\tfrom { opacity: 0; transform: scale(0.95); }\n\tto { opacity: 1; transform: scale(1); }\n}\n@keyframes scaleFadeOut {\n\tfrom { opacity: 1; transform: scale(1); }\n\tto { opacity: 0; transform: scale(0.95); }\n}\n@keyframes slideDown {\n\tfrom { transform: translateY(-100%); opacity: 0; }\n\tto { transform: translateY(0); opacity: 1; }\n}\n\n/* Footer */\nfooter {\n\tmargin-top: auto;\n\tmargin-bottom: 0;\n\tpadding: 1rem 0;\n\tbackground-color: transparent;\n\tflex-shrink: 0;\n\tmax-width: 1000px;\n\tmargin-inline: auto;\n\ttext-align: center;\n\tfont-size: 0.9em;\n}\n\n/* Utilities */\n.text-center {\n\ttext-align: center;\n}\n.sr-only {\n\tposition: absolute;\n\twidth: 1px;\n\theight: 1px;\n\tpadding: 0;\n\tmargin: -1px;\n\toverflow: hidden;\n\tclip: rect(0, 0, 0, 0);\n\twhite-space: nowrap;\n\tborder-width: 0;\n}\n";
}

function getInitialTheme() {
  let saved = localStorage.getItem(themeStorageKey);
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
  localStorage.setItem(themeStorageKey, next);
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

main();
(function(){var es=new EventSource('/_gofront/events');es.addEventListener('reload',function(){location.reload();});})();
