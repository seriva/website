var __nilcall = __nilcall || function(x) {
  if (x == null) throw new Error("runtime error: invalid memory address or nil pointer dereference");
  return x;
};
var __kt = __kt || new Map();
var __sk = __sk || function(o) {
  const s = "\u0001" + JSON.stringify(o, (k, v) => typeof v === "bigint" ? v.toString() + "n" : v);
  if (!__kt.has(s)) __kt.set(s, typeof o.__clone === "function" ? o.__clone() : o);
  return s;
};
var __ik = __ik || function(k) {
  const t = typeof k;
  if (t === "number" || t === "boolean" || t === "bigint") return "\u0001" + t + ":" + String(k);
  if (k !== null && t === "object" && typeof k.__gfUnbox === "function" && !k.constructor.name.endsWith("$Ptr")) {
    const v = k.__gfUnbox(), vt = typeof v;
    if (vt === "string" || vt === "number" || vt === "boolean" || vt === "bigint") {
      const s = "\u0001" + k.constructor.name + ":" + vt + ":" + String(v);
      if (!__kt.has(s)) __kt.set(s, k);
      return s;
    }
  }
  return k;
};
// A key typed by a type parameter whose factory is `f`: interface type
// arguments key by dynamic type; `box` (an `any`-keyed map) boxes a named
// basic value first, other keys are left as they are.
var __ikt = __ikt || function(f, k, box) {
  if (f?.k === "iface") return __ik(k);
  return box ? __ik(f?.b ? f.b(k) : k) : k;
};
var __kd = __kd || function(s, copy) {
  if (typeof s !== "string" || s.charCodeAt(0) !== 1) return s;
  const k = __kt.get(s);
  if (k === undefined) {
    if (s.startsWith("\u0001number:")) return Number(s.slice(8));
    if (s.startsWith("\u0001boolean:")) return s.slice(9) === "true";
    if (s.startsWith("\u0001bigint:")) return BigInt(s.slice(8));
    return s;
  }
  return copy && typeof k.__clone === "function" ? k.__clone() : k;
};
var __kcmp = __kcmp || function(a, b) {
  if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
    for (const f of Object.keys(a)) {
      const c = __kcmp(a[f], b[f]);
      if (c !== 0) return c;
    }
    return 0;
  }
  return a < b ? -1 : a > b ? 1 : 0;
};

class NumError$$strconv {
  constructor(Func$ = "", Num$ = "", Err$ = null) {
    if (arguments.length === 1 && typeof Func$ === "object" && Func$ !== null && Func$.constructor === Object) ({ Func: Func$ = "", Num: Num$ = "", Err: Err$ = null } = Func$);
    this.Func = Func$;
    this.Num = Num$;
    this.Err = Err$;
  }

  Error() {
    let e = this;
    return "strconv." + __nilcall(e).Func + ": parsing " + JSON.stringify(__nilcall(e).Num) + ": " + __nilcall(__nilcall(e).Err).Error();
  }

  Unwrap() {
    let e = this;
    return __nilcall(e).Err;
  }

  __clone() { return new NumError$$strconv(this.Func, this.Num, this.Err); }
  toString() { return __sk(this); }
}
Object.defineProperty(NumError$$strconv.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });
Object.defineProperty(NumError$$strconv.prototype, "__pr", { value: ["Error"] });

var __len = __len || function(a) {
  if (a && typeof a === 'object' && !Array.isArray(a) && !ArrayBuffer.isView(a)) return Object.keys(a).length;
  return a?.length ?? 0;
};
var __sv = __sv || Symbol.for("gofront.sliceView");
var __tcap = __tcap || (globalThis[Symbol.for("gofront.typedCap")] ??= new WeakMap());
var __SV = __SV || class extends Array {
  static get [Symbol.species]() { return Array; }
  [Symbol.for("nodejs.util.inspect.custom")]() { return Array.from(this); }
};
var __rcap = __rcap || Symbol.for("gofront.resliceCap");
var __svh = __svh || {
  get(t, k) {
    if (typeof k === "string") {
      const ch = k.charCodeAt(0);
      if (ch >= 48 && ch <= 57) { const i = +k; return i < t.n ? t.b[t.o + i] : undefined; }
      if (k === "length") return t.n;
    } else if (k === __sv) return t;
    return t[k];
  },
  set(t, k, v) {
    if (typeof k === "string") {
      const ch = k.charCodeAt(0);
      if (ch >= 48 && ch <= 57) { const i = +k; if (i < t.n) t.b[t.o + i] = v; return true; }
      if (k === "length") return true;
    }
    t[k] = v;
    return true;
  },
  has(t, k) {
    if (typeof k === "string") {
      const ch = k.charCodeAt(0);
      if (ch >= 48 && ch <= 57) return +k < t.n;
    }
    return k in t;
  },
  defineProperty(t, k, d) {
    if (typeof k === "string") {
      const ch = k.charCodeAt(0);
      if (ch >= 48 && ch <= 57) {
        const i = +k;
        if (i >= t.n || d.get || d.set || d.configurable === false) return false;
        if ("value" in d) t.b[t.o + i] = d.value;
        return true;
      }
    }
    return Reflect.defineProperty(t, k, d);
  },
  preventExtensions() { return false; },
  deleteProperty(t, k) {
    if (typeof k === "string" && k.charCodeAt(0) >= 48 && k.charCodeAt(0) <= 57) return true;
    return delete t[k];
  },
  ownKeys(t) {
    const ks = [];
    for (let i = 0; i < t.n; i++) ks.push(String(i));
    ks.push("length");
    return ks;
  },
  getOwnPropertyDescriptor(t, k) {
    if (typeof k === "string") {
      const ch = k.charCodeAt(0);
      if (ch >= 48 && ch <= 57) {
        const i = +k;
        return i < t.n ? { value: t.b[t.o + i], writable: true, enumerable: true, configurable: true } : undefined;
      }
      if (k === "length") return { value: t.n, writable: true, enumerable: false, configurable: false };
    }
    return Reflect.getOwnPropertyDescriptor(t, k);
  },
};
var __mkview = __mkview || function(b, o, n, c, f) {
  if (o === 0 && n === b.length && c === n && !f) return b;
  if (c === 0) return [];
  const t = new __SV();
  t.b = b; t.o = o; t.n = n; t.c = c;
  return new Proxy(t, __svh);
};
var __cap = __cap || function(a) {
  if (a == null) return 0;
  const s = a[__sv];
  if (s !== undefined) return s.c;
  if (ArrayBuffer.isView(a)) return __tcap.get(a) ?? a.length;
  return a[__rcap]?.c ?? a.length;
};
// A snapshot shared by a copy of a copy (e.own false) is cloned before it is
// updated, so the update does not reach the other copy's snapshot (whose
// write-back would then revert the element).
var __rcown = __rcown || function(e, a) {
  if (e.own === false) { e.s = e.s.slice(e.so, e.so + a.length); e.so = 0; e.own = true; }
  return e.s;
};
// Write back only the elements of a __reslice copy that changed since it was
// made (e.s from e.so is its snapshot, kept up to date by __rcs), so writes
// made meanwhile through other slices of the backing array are kept.
var __rcput = __rcput || function(e, a, from, to) {
  for (let i = from; i < to; i++) {
    const v = a[i];
    if (!Object.is(v, e.s[e.so + i])) { e.b[e.o + i] = v; __rcown(e, a)[e.so + i] = v; }
  }
};
// After an index write to a possible __reslice copy: write element i through.
var __rcs = __rcs || function(a, i) {
  const e = a?.[__rcap];
  if (e !== undefined && i >= 0 && i < e.c && i < a.length) { const v = a[i]; e.b[e.o + i] = v; __rcown(e, a)[e.so + i] = v; }
};
var __rcdef = __rcdef || function(r, e) {
  Object.defineProperty(r, __rcap, { value: e, writable: true });
};
var __rcflush = __rcflush || function(a) {
  const e = a[__rcap];
  if (e !== undefined) __rcput(e, a, 0, a.length);
  return e;
};
var __slice = __slice || function(a, lo, hi, max) {
  if (typeof a === "string") return a.slice(lo, hi);
  const s = a == null ? undefined : a[__sv];
  const n = s !== undefined ? s.n : a == null ? 0 : a.length;
  const c = s !== undefined ? s.c : __cap(a);
  const mx = max;
  if (hi === undefined) hi = n;
  if (max === undefined) max = c;
  if (!(lo >= 0 && lo <= hi && hi <= max && max <= c)) throw new Error("runtime error: slice bounds out of range");
  if (a == null) return a;
  if (s !== undefined) return __mkview(s.b, s.o + lo, hi - lo, max - lo);
  if (c > n && Array.isArray(a)) {
    // a is a __reslice copy (only those have cap > len): reach past its
    // length or capacity through the backing array, else stay on the copy
    // (an explicit max needs a view: the copy itself keeps the old cap).
    if (hi <= n && (mx === undefined || mx <= n)) return __mkview(a, lo, hi - lo, Math.min(max, n) - lo, mx !== undefined);
    else { const e = __rcflush(a); return __mkview(e.b, e.o + lo, hi - lo, max - lo); }
  }
  if (ArrayBuffer.isView(a)) {
    const r = hi <= n ? a.subarray(lo, hi) : new a.constructor(a.buffer, a.byteOffset + lo * a.BYTES_PER_ELEMENT, hi - lo);
    if (max - lo > hi - lo) __tcap.set(r, max - lo);
    return r;
  }
  return __mkview(a, lo, hi - lo, max - lo);
};
var __reslice = __reslice || function(a, lo, hi) {
  if (Array.isArray(a) && a[__sv] === undefined) {
    const n = a.length;
    if (hi === undefined) hi = n;
    if (lo >= 0 && lo <= hi && hi <= n) {
      if (lo === 0 && hi === n) return a;
      const e = a[__rcap];
      const r = a.slice(lo, hi);
      if (e === undefined) {
        __rcdef(r, { b: a, o: lo, c: n - lo, s: a.slice(lo, hi), so: 0 });
        return r;
      }
      // A copy of a copy: write back the changed elements it drops and share
      // the snapshot (copied on write, __rcown), so a pop costs no more than
      // the copy itself.
      if (lo > 0) __rcput(e, a, 0, lo);
      __rcput(e, a, hi, n);
      e.own = false;
      __rcdef(r, { b: e.b, o: e.o + lo, c: e.c - lo, s: e.s, so: e.so + lo, own: false });
      return r;
    }
  }
  return __slice(a, lo, hi);
};
var __mkslice = __mkslice || function(n, b) {
  if (!(n >= 0 && n <= b.length)) throw new Error("runtime error: makeslice: cap out of range");
  return __slice(b, 0, n);
};
var __append = __append || function(a, ...b) {
  if (a && ArrayBuffer.isView(a)) {
    const c = __tcap.get(a);
    if (c !== undefined && a.length + b.length <= c) {
      const r = new a.constructor(a.buffer, a.byteOffset, a.length + b.length);
      r.set(b, a.length);
      if (c > r.length) __tcap.set(r, c);
      return r;
    }
    const res = new a.constructor(a.length + b.length);
    res.set(a);
    res.set(b, a.length);
    return res;
  }
  const s = a ? a[__sv] : undefined;
  if (s !== undefined && s.n + b.length <= s.c) {
    for (let i = 0; i < b.length; i++) s.b[s.o + s.n + i] = b[i];
    return __mkview(s.b, s.o, s.n + b.length, s.c);
  }
  if (s === undefined && a) {
    const e = a[__rcap];
    if (e !== undefined && a.length + b.length <= e.c) {
      __rcflush(a);
      for (let i = 0; i < b.length; i++) e.b[e.o + a.length + i] = b[i];
      return __mkview(e.b, e.o, a.length + b.length, e.c);
    }
  }
  return a ? [...a, ...b] : b;
};
var __ifv = __ifv || function(x, ptrFields) {
  if (x === null || typeof x !== "object") return x;
  const c = typeof x.__clone === "function" ? x.__clone() : Object.assign(Object.create(Object.getPrototypeOf(x)), x);
  Object.defineProperty(c, "__v", { value: true, configurable: true });
  if (Array.isArray(ptrFields)) {
    for (const f of ptrFields) {
      if (f.indexOf(".") !== -1) {
        const parts = f.split(".");
        let cur = c;
        for (let j = 0; j < parts.length - 1; j++) cur = cur?.[parts[j]];
        const last = parts[parts.length - 1];
        if (cur?.[last] !== null && typeof cur?.[last] === "object") __ifp(cur[last]);
      } else if (c[f] !== null && typeof c[f] === "object") {
        __ifp(c[f]);
      }
    }
  }
  for (const k of Object.keys(c)) {
    if (c[k] !== null && typeof c[k] === "object" && !Array.isArray(c[k]) && !ArrayBuffer.isView(c[k])) {
      if (!c[k].__v && !c[k].__p && Object.isExtensible(c[k]) && (!Array.isArray(ptrFields) || !ptrFields.includes(k))) {
        Object.defineProperty(c[k], "__v", { value: true, configurable: true });
      }
    }
  }
  return c;
};
var __buffer_proto = __buffer_proto || {
  Write(d) {
    this._lastOp = 0;
    for (let i = 0; i < d.length; i++) this._buf.push(d[i]);
    return [d.length, null];
  },
  WriteString(s) {
    this._lastOp = 0;
    const bytes = new TextEncoder().encode(s);
    for (let i = 0; i < bytes.length; i++) this._buf.push(bytes[i]);
    return [bytes.length, null];
  },
  Read(p) {
    if (!this._buf || this._buf.length === 0) return [0, typeof __io_eof !== "undefined" ? __io_eof : "EOF"];
    const n = Math.min(p.length, this._buf.length);
    for (let i = 0; i < n; i++) p[i] = this._buf.shift();
    if (n > 0) { this._lastOp = 1; this._lastByte = p[n - 1]; } else { this._lastOp = 0; }
    return [n, null];
  },
  String() {
    return new TextDecoder().decode(new Uint8Array(this._buf));
  },
  Reset() {
    this._buf = [];
  }
};
var __builder_proto = __builder_proto || {
  Write(d) {
    this._buf += new TextDecoder().decode(new Uint8Array(d));
    return [d.length, null];
  },
  WriteString(s) {
    this._buf += s;
    return [new TextEncoder().encode(s).length, null];
  },
  String() {
    return this._buf;
  },
  Reset() {
    this._buf = "";
  }
};
var __ifp = __ifp || function(x, ptrFields, seen) {
  if (x === null || typeof x !== "object") return x;
  if (Array.isArray(x._buf) && typeof x.Write !== "function") Object.assign(x, __buffer_proto);
  else if (typeof x._buf === "string" && typeof x.WriteString !== "function") Object.assign(x, __builder_proto);
  if (x.__p !== true && Object.isExtensible(x))
    Object.defineProperty(x, "__p", { value: true, configurable: true, writable: true });
  if (Array.isArray(ptrFields)) {
    seen = seen || new Set();
    if (seen.has(x)) return x;
    seen.add(x);
    for (const f of ptrFields) {
      if (f.indexOf(".") !== -1) {
        const parts = f.split(".");
        let cur = x;
        for (let j = 0; j < parts.length - 1; j++) cur = cur?.[parts[j]];
        const last = parts[parts.length - 1];
        if (cur?.[last] !== null && typeof cur?.[last] === "object") __ifp(cur[last]);
      } else if (x[f] !== null && typeof x[f] === "object") {
        __ifp(x[f]);
      }
    }
  }
  return x;
};
var __ifm = __ifm || function(x) {
  if (x === null || x === undefined) return x;
  if (typeof x !== "object") return x;
  if (x.__map !== true && Object.isExtensible(x))
    Object.defineProperty(x, "__map", { value: true, configurable: true });
  return x;
};
var __ifpm = __ifpm || function(x) {
  if (x === null || x === undefined) return x;
  if (typeof x !== "object") return x;
  if (x.__map !== true && Object.isExtensible(x)) {
    Object.defineProperty(x, "__map", { value: true, configurable: true });
    Object.defineProperty(x, "__ptr_map", { value: true, configurable: true });
  }
  return x;
};
var __ifs = __ifs || function(x, ptrFields) {
  if (x === null || x === undefined) return x;
  if (x.__slice !== true && Object.isExtensible(x))
    Object.defineProperty(x, "__slice", { value: true, configurable: true });
  if (Array.isArray(ptrFields) && Object.isExtensible(x))
    Object.defineProperty(x, "__ptr_fields", { value: ptrFields, configurable: true });
  return x;
};
var __ifps = __ifps || function(x) {
  if (x === null || x === undefined) return x;
  if (x.__slice !== true && Object.isExtensible(x)) {
    Object.defineProperty(x, "__slice", { value: true, configurable: true });
    Object.defineProperty(x, "__ptr_slice", { value: true, configurable: true });
  }
  return x;
};
var __nilcall = __nilcall || function(x) {
  if (x == null) throw new Error("runtime error: invalid memory address or nil pointer dereference");
  return x;
};
var __ixerr = __ixerr || function(i, n) {
  throw new Error(i < 0 ? "runtime error: index out of range [" + i + "]" : "runtime error: index out of range [" + i + "] with length " + n);
};
var __at = __at || function(a, i) {
  if (a != null && i >= 0 && i < a.length) return a[i];
  return __ixerr(i, a == null ? 0 : a.length);
};
var __ix = __ix || function(a, i) {
  if (a != null && i >= 0 && i < a.length) return i;
  return __ixerr(i, a == null ? 0 : a.length);
};
var __lv;
var __kt = __kt || new Map();
var __sk = __sk || function(o) {
  const s = "\u0001" + JSON.stringify(o, (k, v) => typeof v === "bigint" ? v.toString() + "n" : v);
  if (!__kt.has(s)) __kt.set(s, typeof o.__clone === "function" ? o.__clone() : o);
  return s;
};
var __ik = __ik || function(k) {
  const t = typeof k;
  if (t === "number" || t === "boolean" || t === "bigint") return "\u0001" + t + ":" + String(k);
  if (k !== null && t === "object" && typeof k.__gfUnbox === "function" && !k.constructor.name.endsWith("$Ptr")) {
    const v = k.__gfUnbox(), vt = typeof v;
    if (vt === "string" || vt === "number" || vt === "boolean" || vt === "bigint") {
      const s = "\u0001" + k.constructor.name + ":" + vt + ":" + String(v);
      if (!__kt.has(s)) __kt.set(s, k);
      return s;
    }
  }
  return k;
};
// A key typed by a type parameter whose factory is `f`: interface type
// arguments key by dynamic type; `box` (an `any`-keyed map) boxes a named
// basic value first, other keys are left as they are.
var __ikt = __ikt || function(f, k, box) {
  if (f?.k === "iface") return __ik(k);
  return box ? __ik(f?.b ? f.b(k) : k) : k;
};
var __kd = __kd || function(s, copy) {
  if (typeof s !== "string" || s.charCodeAt(0) !== 1) return s;
  const k = __kt.get(s);
  if (k === undefined) {
    if (s.startsWith("\u0001number:")) return Number(s.slice(8));
    if (s.startsWith("\u0001boolean:")) return s.slice(9) === "true";
    if (s.startsWith("\u0001bigint:")) return BigInt(s.slice(8));
    return s;
  }
  return copy && typeof k.__clone === "function" ? k.__clone() : k;
};
var __kcmp = __kcmp || function(a, b) {
  if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
    for (const f of Object.keys(a)) {
      const c = __kcmp(a[f], b[f]);
      if (c !== 0) return c;
    }
    return 0;
  }
  return a < b ? -1 : a > b ? 1 : 0;
};

class UnmarshalTypeError$$internal$jsonrt {
  constructor(Value$ = "", Type$ = "", Offset$ = 0, Struct$ = "", Field$ = "") {
    if (arguments.length === 1 && typeof Value$ === "object" && Value$ !== null && Value$.constructor === Object) ({ Value: Value$ = "", Type: Type$ = "", Offset: Offset$ = 0, Struct: Struct$ = "", Field: Field$ = "" } = Value$);
    this.Value = Value$;
    this.Type = Type$;
    this.Offset = Offset$;
    this.Struct = Struct$;
    this.Field = Field$;
  }

  Error() {
    let e = this;
    if (__nilcall(e).Struct !== "" || __nilcall(e).Field !== "") {
      return "json: cannot unmarshal " + __nilcall(e).Value + " into Go struct field " + __nilcall(e).Struct + "." + __nilcall(e).Field + " of type " + __nilcall(e).Type;
    }
    return "json: cannot unmarshal " + __nilcall(e).Value + " into Go value of type " + __nilcall(e).Type;
  }

  __clone() { return new UnmarshalTypeError$$internal$jsonrt(this.Value, this.Type, this.Offset, this.Struct, this.Field); }
  toString() { return __sk(this); }
}
Object.defineProperty(UnmarshalTypeError$$internal$jsonrt.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });
Object.defineProperty(UnmarshalTypeError$$internal$jsonrt.prototype, "__pr", { value: ["Error"] });

class InvalidUnmarshalError$$internal$jsonrt {
  constructor(Type$ = "", IsPtr$ = false) {
    if (arguments.length === 1 && typeof Type$ === "object" && Type$ !== null && Type$.constructor === Object) ({ Type: Type$ = "", IsPtr: IsPtr$ = false } = Type$);
    this.Type = Type$;
    this.IsPtr = IsPtr$;
  }

  Error() {
    let e = this;
    if (__nilcall(e).Type === "") {
      return "json: Unmarshal(nil)";
    }
    if (!__nilcall(e).IsPtr) {
      return "json: Unmarshal(non-pointer " + __nilcall(e).Type + ")";
    }
    return "json: Unmarshal(nil " + __nilcall(e).Type + ")";
  }

  __clone() { return new InvalidUnmarshalError$$internal$jsonrt(this.Type, this.IsPtr); }
  toString() { return __sk(this); }
}
Object.defineProperty(InvalidUnmarshalError$$internal$jsonrt.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });
Object.defineProperty(InvalidUnmarshalError$$internal$jsonrt.prototype, "__pr", { value: ["Error"] });

class UnsupportedValueError$$internal$jsonrt {
  constructor(Str$ = "") {
    if (arguments.length === 1 && typeof Str$ === "object" && Str$ !== null && Str$.constructor === Object) ({ Str: Str$ = "" } = Str$);
    this.Str = Str$;
  }

  Error() {
    let e = this;
    return "json: unsupported value: " + __nilcall(e).Str;
  }

  __clone() { return new UnsupportedValueError$$internal$jsonrt(this.Str); }
  toString() { return __sk(this); }
}
Object.defineProperty(UnsupportedValueError$$internal$jsonrt.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });
Object.defineProperty(UnsupportedValueError$$internal$jsonrt.prototype, "__pr", { value: ["Error"] });

class UnsupportedTypeError$$internal$jsonrt {
  constructor(Type$ = "") {
    if (arguments.length === 1 && typeof Type$ === "object" && Type$ !== null && Type$.constructor === Object) ({ Type: Type$ = "" } = Type$);
    this.Type = Type$;
  }

  Error() {
    let e = this;
    return "json: unsupported type: " + __nilcall(e).Type;
  }

  __clone() { return new UnsupportedTypeError$$internal$jsonrt(this.Type); }
  toString() { return __sk(this); }
}
Object.defineProperty(UnsupportedTypeError$$internal$jsonrt.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });
Object.defineProperty(UnsupportedTypeError$$internal$jsonrt.prototype, "__pr", { value: ["Error"] });

class MarshalerError$$internal$jsonrt {
  constructor(Type$ = "", Err$ = null, sourceFunc$ = "") {
    if (arguments.length === 1 && typeof Type$ === "object" && Type$ !== null && Type$.constructor === Object) ({ Type: Type$ = "", Err: Err$ = null, sourceFunc: sourceFunc$ = "" } = Type$);
    this.Type = Type$;
    this.Err = Err$;
    this.sourceFunc = sourceFunc$;
  }

  Error() {
    let e = this;
    let srcFunc = __nilcall(e).sourceFunc;
    if (srcFunc === "") {
      srcFunc = "MarshalJSON";
    }
    return "json: error calling " + srcFunc + " for type " + __nilcall(e).Type + ": " + __nilcall(__nilcall(e).Err).Error();
  }

  Unwrap() {
    let e = this;
    return __nilcall(e).Err;
  }

  __clone() { return new MarshalerError$$internal$jsonrt(this.Type, this.Err, this.sourceFunc); }
  toString() { return __sk(this); }
}
Object.defineProperty(MarshalerError$$internal$jsonrt.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });
Object.defineProperty(MarshalerError$$internal$jsonrt.prototype, "__pr", { value: ["Error"] });

class Number$$internal$jsonrt {
  constructor(_items) { this._items = _items; }
  __gfUnbox() { return this._items; }

  static $String(n) {
    return String(n);
  }
  String(...__a) { return Number$$internal$jsonrt.$String(this._items, ...__a); }
}
class Number$$internal$jsonrt$Ptr {
  constructor(_p) { this._p = _p; }
  __gfUnbox() { return this._p; }
  get value() { return this._p.value; }
  set value(v) { this._p.value = v; }
  String(...__a) { return Number$$internal$jsonrt.$String(this._p.value, ...__a); }
}

class SyntaxError$$internal$jsonrt {
  constructor(msg$ = "", Offset$ = 0) {
    if (arguments.length === 1 && typeof msg$ === "object" && msg$ !== null && msg$.constructor === Object) ({ msg: msg$ = "", Offset: Offset$ = 0 } = msg$);
    this.msg = msg$;
    this.Offset = Offset$;
  }

  Error() {
    let e = this;
    return __nilcall(e).msg;
  }

  __clone() { return new SyntaxError$$internal$jsonrt(this.msg, this.Offset); }
  toString() { return __sk(this); }
}
Object.defineProperty(SyntaxError$$internal$jsonrt.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });
Object.defineProperty(SyntaxError$$internal$jsonrt.prototype, "__pr", { value: ["Error"] });

class scanner$$internal$jsonrt {
  constructor(step$ = null, endTop$ = false, parseState$ = null, err$ = null, bytes$ = 0) {
    this.step = step$;
    this.endTop = endTop$;
    this.parseState = parseState$;
    this.err = err$;
    this.bytes = bytes$;
  }

  reset() {
    let s = this;
    __nilcall(s).step = stateBeginValue$$internal$jsonrt;
    __nilcall(s).parseState = __reslice(__nilcall(s).parseState, 0, 0);
    __nilcall(s).err = null;
    __nilcall(s).endTop = false;
  }

  eof() {
    let s = this;
    if (__nilcall(s).err != null) {
      return scanError$$internal$jsonrt;
    }
    if (__nilcall(s).endTop) {
      return scanEnd$$internal$jsonrt;
    }
    __nilcall(s).step(s, 32);
    if (__nilcall(s).endTop) {
      return scanEnd$$internal$jsonrt;
    }
    if (__nilcall(s).err == null) {
      __nilcall(s).err = __ifp(new SyntaxError$$internal$jsonrt("unexpected end of JSON input", __nilcall(s).bytes));
    }
    return scanError$$internal$jsonrt;
  }

  pushParseState(c, newParseState, successState) {
    let s = this;
    __nilcall(s).parseState = __append(__nilcall(s).parseState, newParseState);
    if (__len(__nilcall(s).parseState) <= maxNestingDepth$$internal$jsonrt) {
      return successState;
    }
    return s.error(c, "exceeded max depth");
  }

  popParseState() {
    let s = this;
    let n = __len(__nilcall(s).parseState) - 1;
    __nilcall(s).parseState = __reslice(__nilcall(s).parseState, 0, n);
    if (n === 0) {
      __nilcall(s).step = stateEndTop$$internal$jsonrt;
      __nilcall(s).endTop = true;
    } else {
      __nilcall(s).step = stateEndValue$$internal$jsonrt;
    }
  }

  error(c, context) {
    let s = this;
    __nilcall(s).step = stateError$$internal$jsonrt;
    __nilcall(s).err = __ifp(new SyntaxError$$internal$jsonrt("invalid character " + quoteChar$$internal$jsonrt(c) + " " + context, __nilcall(s).bytes));
    return scanError$$internal$jsonrt;
  }

  __clone() { return new scanner$$internal$jsonrt(this.step, this.endTop, this.parseState, this.err, this.bytes); }
  toString() { return __sk(this); }
}
Object.defineProperty(scanner$$internal$jsonrt.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

const scanContinue$$internal$jsonrt = 0;
const scanBeginLiteral$$internal$jsonrt = 1;
const scanBeginObject$$internal$jsonrt = 2;
const scanObjectKey$$internal$jsonrt = 3;
const scanObjectValue$$internal$jsonrt = 4;
const scanEndObject$$internal$jsonrt = 5;
const scanBeginArray$$internal$jsonrt = 6;
const scanArrayValue$$internal$jsonrt = 7;
const scanEndArray$$internal$jsonrt = 8;
const scanSkipSpace$$internal$jsonrt = 9;
const scanEnd$$internal$jsonrt = 10;
const scanError$$internal$jsonrt = 11;

const parseObjectKey$$internal$jsonrt = 0;
const parseObjectValue$$internal$jsonrt = 1;
const parseArrayValue$$internal$jsonrt = 2;

const maxNestingDepth$$internal$jsonrt = 10000;

let OptEscapeHTML$$internal$jsonrt = true;
let OptUseNumber$$internal$jsonrt = false;
let OptDisallowUnknownFields$$internal$jsonrt = false;

function checkValid$$internal$jsonrt(data, scan) {
  scan.reset();
  for (let __i0 = 0, __arr0 = data, __len0 = __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let c = __arr0[__i0];
    __nilcall(scan).bytes++;
    if (__nilcall(scan).step(scan, c) === scanError$$internal$jsonrt) {
      return __nilcall(scan).err;
    }
  }
  if (scan.eof() === scanError$$internal$jsonrt) {
    return __nilcall(scan).err;
  }
  return null;
}

function newScanner$$internal$jsonrt() {
  let scan = new scanner$$internal$jsonrt();
  scan.reset();
  return scan;
}

function isSpace$$internal$jsonrt(c) {
  return c <= 32 && (c === 32 || c === 9 || c === 13 || c === 10);
}

function stateBeginValueOrEmpty$$internal$jsonrt(s, c) {
  if (isSpace$$internal$jsonrt(c)) {
    return scanSkipSpace$$internal$jsonrt;
  }
  if (c === 93) {
    return stateEndValue$$internal$jsonrt(s, c);
  }
  return stateBeginValue$$internal$jsonrt(s, c);
}

function stateBeginValue$$internal$jsonrt(s, c) {
  if (isSpace$$internal$jsonrt(c)) {
    return scanSkipSpace$$internal$jsonrt;
  }
  switch (c) {
    case 123:
    {
      __nilcall(s).step = stateBeginStringOrEmpty$$internal$jsonrt;
      return s.pushParseState(c, parseObjectKey$$internal$jsonrt, scanBeginObject$$internal$jsonrt);
    }
    case 91:
    {
      __nilcall(s).step = stateBeginValueOrEmpty$$internal$jsonrt;
      return s.pushParseState(c, parseArrayValue$$internal$jsonrt, scanBeginArray$$internal$jsonrt);
    }
    case 34:
    {
      __nilcall(s).step = stateInString$$internal$jsonrt;
      return scanBeginLiteral$$internal$jsonrt;
    }
    case 45:
    {
      __nilcall(s).step = stateNeg$$internal$jsonrt;
      return scanBeginLiteral$$internal$jsonrt;
    }
    case 48:
    {
      __nilcall(s).step = state0$$internal$jsonrt;
      return scanBeginLiteral$$internal$jsonrt;
    }
    case 116:
    {
      __nilcall(s).step = stateT$$internal$jsonrt;
      return scanBeginLiteral$$internal$jsonrt;
    }
    case 102:
    {
      __nilcall(s).step = stateF$$internal$jsonrt;
      return scanBeginLiteral$$internal$jsonrt;
    }
    case 110:
    {
      __nilcall(s).step = stateN$$internal$jsonrt;
      return scanBeginLiteral$$internal$jsonrt;
    }
  }
  if (49 <= c && c <= 57) {
    __nilcall(s).step = state1$$internal$jsonrt;
    return scanBeginLiteral$$internal$jsonrt;
  }
  return s.error(c, "looking for beginning of value");
}

function stateBeginStringOrEmpty$$internal$jsonrt(s, c) {
  if (isSpace$$internal$jsonrt(c)) {
    return scanSkipSpace$$internal$jsonrt;
  }
  if (c === 125) {
    let n = __len(__nilcall(s).parseState);
    __nilcall(s).parseState[__ix(__nilcall(s).parseState, n - 1)] = parseObjectValue$$internal$jsonrt;
    __rcs(__nilcall(s).parseState, n - 1);
    return stateEndValue$$internal$jsonrt(s, c);
  }
  return stateBeginString$$internal$jsonrt(s, c);
}

function stateBeginString$$internal$jsonrt(s, c) {
  if (isSpace$$internal$jsonrt(c)) {
    return scanSkipSpace$$internal$jsonrt;
  }
  if (c === 34) {
    __nilcall(s).step = stateInString$$internal$jsonrt;
    return scanBeginLiteral$$internal$jsonrt;
  }
  return s.error(c, "looking for beginning of object key string");
}

function stateEndValue$$internal$jsonrt(s, c) {
  let n = __len(__nilcall(s).parseState);
  if (n === 0) {
    __nilcall(s).step = stateEndTop$$internal$jsonrt;
    __nilcall(s).endTop = true;
    return stateEndTop$$internal$jsonrt(s, c);
  }
  if (isSpace$$internal$jsonrt(c)) {
    __nilcall(s).step = stateEndValue$$internal$jsonrt;
    return scanSkipSpace$$internal$jsonrt;
  }
  let ps = __at(__nilcall(s).parseState, n - 1);
  switch (ps) {
    case parseObjectKey$$internal$jsonrt:
    {
      if (c === 58) {
        __nilcall(s).parseState[__ix(__nilcall(s).parseState, n - 1)] = parseObjectValue$$internal$jsonrt;
        __rcs(__nilcall(s).parseState, n - 1);
        __nilcall(s).step = stateBeginValue$$internal$jsonrt;
        return scanObjectKey$$internal$jsonrt;
      }
      return s.error(c, "after object key");
    }
    case parseObjectValue$$internal$jsonrt:
    {
      if (c === 44) {
        __nilcall(s).parseState[__ix(__nilcall(s).parseState, n - 1)] = parseObjectKey$$internal$jsonrt;
        __rcs(__nilcall(s).parseState, n - 1);
        __nilcall(s).step = stateBeginString$$internal$jsonrt;
        return scanObjectValue$$internal$jsonrt;
      }
      if (c === 125) {
        s.popParseState();
        return scanEndObject$$internal$jsonrt;
      }
      return s.error(c, "after object key:value pair");
    }
    case parseArrayValue$$internal$jsonrt:
    {
      if (c === 44) {
        __nilcall(s).step = stateBeginValue$$internal$jsonrt;
        return scanArrayValue$$internal$jsonrt;
      }
      if (c === 93) {
        s.popParseState();
        return scanEndArray$$internal$jsonrt;
      }
      return s.error(c, "after array element");
    }
  }
  return s.error(c, "");
}

function stateEndTop$$internal$jsonrt(s, c) {
  if (!isSpace$$internal$jsonrt(c)) {
    s.error(c, "after top-level value");
  }
  return scanEnd$$internal$jsonrt;
}

function stateInString$$internal$jsonrt(s, c) {
  if (c === 34) {
    __nilcall(s).step = stateEndValue$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  if (c === 92) {
    __nilcall(s).step = stateInStringEsc$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  if (c < 0x20) {
    return s.error(c, "in string literal");
  }
  return scanContinue$$internal$jsonrt;
}

function stateInStringEsc$$internal$jsonrt(s, c) {
  switch (c) {
    case 98:
    case 102:
    case 110:
    case 114:
    case 116:
    case 92:
    case 47:
    case 34:
    {
      __nilcall(s).step = stateInString$$internal$jsonrt;
      return scanContinue$$internal$jsonrt;
    }
    case 117:
    {
      __nilcall(s).step = stateInStringEscU$$internal$jsonrt;
      return scanContinue$$internal$jsonrt;
    }
  }
  return s.error(c, "in string escape code");
}

function stateInStringEscU$$internal$jsonrt(s, c) {
  if (48 <= c && c <= 57 || 97 <= c && c <= 102 || 65 <= c && c <= 70) {
    __nilcall(s).step = stateInStringEscU1$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in \\u hexadecimal character escape");
}

function stateInStringEscU1$$internal$jsonrt(s, c) {
  if (48 <= c && c <= 57 || 97 <= c && c <= 102 || 65 <= c && c <= 70) {
    __nilcall(s).step = stateInStringEscU12$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in \\u hexadecimal character escape");
}

function stateInStringEscU12$$internal$jsonrt(s, c) {
  if (48 <= c && c <= 57 || 97 <= c && c <= 102 || 65 <= c && c <= 70) {
    __nilcall(s).step = stateInStringEscU123$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in \\u hexadecimal character escape");
}

function stateInStringEscU123$$internal$jsonrt(s, c) {
  if (48 <= c && c <= 57 || 97 <= c && c <= 102 || 65 <= c && c <= 70) {
    __nilcall(s).step = stateInString$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in \\u hexadecimal character escape");
}

function stateNeg$$internal$jsonrt(s, c) {
  if (c === 48) {
    __nilcall(s).step = state0$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  if (49 <= c && c <= 57) {
    __nilcall(s).step = state1$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in numeric literal");
}

function state1$$internal$jsonrt(s, c) {
  if (48 <= c && c <= 57) {
    __nilcall(s).step = state1$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return state0$$internal$jsonrt(s, c);
}

function state0$$internal$jsonrt(s, c) {
  if (c === 46) {
    __nilcall(s).step = stateDot$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  if (c === 101 || c === 69) {
    __nilcall(s).step = stateE$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return stateEndValue$$internal$jsonrt(s, c);
}

function stateDot$$internal$jsonrt(s, c) {
  if (48 <= c && c <= 57) {
    __nilcall(s).step = stateDot0$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "after decimal point in numeric literal");
}

function stateDot0$$internal$jsonrt(s, c) {
  if (48 <= c && c <= 57) {
    return scanContinue$$internal$jsonrt;
  }
  if (c === 101 || c === 69) {
    __nilcall(s).step = stateE$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return stateEndValue$$internal$jsonrt(s, c);
}

function stateE$$internal$jsonrt(s, c) {
  if (c === 43 || c === 45) {
    __nilcall(s).step = stateESign$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return stateESign$$internal$jsonrt(s, c);
}

function stateESign$$internal$jsonrt(s, c) {
  if (48 <= c && c <= 57) {
    __nilcall(s).step = stateE0$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in exponent of numeric literal");
}

function stateE0$$internal$jsonrt(s, c) {
  if (48 <= c && c <= 57) {
    return scanContinue$$internal$jsonrt;
  }
  return stateEndValue$$internal$jsonrt(s, c);
}

function stateT$$internal$jsonrt(s, c) {
  if (c === 114) {
    __nilcall(s).step = stateTr$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in literal true (expecting 'r')");
}

function stateTr$$internal$jsonrt(s, c) {
  if (c === 117) {
    __nilcall(s).step = stateTru$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in literal true (expecting 'u')");
}

function stateTru$$internal$jsonrt(s, c) {
  if (c === 101) {
    __nilcall(s).step = stateEndValue$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in literal true (expecting 'e')");
}

function stateF$$internal$jsonrt(s, c) {
  if (c === 97) {
    __nilcall(s).step = stateFa$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in literal false (expecting 'a')");
}

function stateFa$$internal$jsonrt(s, c) {
  if (c === 108) {
    __nilcall(s).step = stateFal$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in literal false (expecting 'l')");
}

function stateFal$$internal$jsonrt(s, c) {
  if (c === 115) {
    __nilcall(s).step = stateFals$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in literal false (expecting 's')");
}

function stateFals$$internal$jsonrt(s, c) {
  if (c === 101) {
    __nilcall(s).step = stateEndValue$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in literal false (expecting 'e')");
}

function stateN$$internal$jsonrt(s, c) {
  if (c === 117) {
    __nilcall(s).step = stateNu$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in literal null (expecting 'u')");
}

function stateNu$$internal$jsonrt(s, c) {
  if (c === 108) {
    __nilcall(s).step = stateNul$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in literal null (expecting 'l')");
}

function stateNul$$internal$jsonrt(s, c) {
  if (c === 108) {
    __nilcall(s).step = stateEndValue$$internal$jsonrt;
    return scanContinue$$internal$jsonrt;
  }
  return s.error(c, "in literal null (expecting 'l')");
}

function stateError$$internal$jsonrt(s, c) {
  return scanError$$internal$jsonrt;
}

function quoteChar$$internal$jsonrt(c) {
  if (c === 39) {
    return "'\\''";
  }
  if (c === 34) {
    return "'\"'";
  }
  let s = JSON.stringify(String.fromCodePoint(c));
  return "'" + s.slice(1, __len(s) - 1) + "'";
}

function CheckValid$$internal$jsonrt(data) {
  return checkValid$$internal$jsonrt(data, newScanner$$internal$jsonrt());
}

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
var __sv = __sv || Symbol.for("gofront.sliceView");
var __tcap = __tcap || (globalThis[Symbol.for("gofront.typedCap")] ??= new WeakMap());
var __SV = __SV || class extends Array {
  static get [Symbol.species]() { return Array; }
  [Symbol.for("nodejs.util.inspect.custom")]() { return Array.from(this); }
};
var __rcap = __rcap || Symbol.for("gofront.resliceCap");
var __svh = __svh || {
  get(t, k) {
    if (typeof k === "string") {
      const ch = k.charCodeAt(0);
      if (ch >= 48 && ch <= 57) { const i = +k; return i < t.n ? t.b[t.o + i] : undefined; }
      if (k === "length") return t.n;
    } else if (k === __sv) return t;
    return t[k];
  },
  set(t, k, v) {
    if (typeof k === "string") {
      const ch = k.charCodeAt(0);
      if (ch >= 48 && ch <= 57) { const i = +k; if (i < t.n) t.b[t.o + i] = v; return true; }
      if (k === "length") return true;
    }
    t[k] = v;
    return true;
  },
  has(t, k) {
    if (typeof k === "string") {
      const ch = k.charCodeAt(0);
      if (ch >= 48 && ch <= 57) return +k < t.n;
    }
    return k in t;
  },
  defineProperty(t, k, d) {
    if (typeof k === "string") {
      const ch = k.charCodeAt(0);
      if (ch >= 48 && ch <= 57) {
        const i = +k;
        if (i >= t.n || d.get || d.set || d.configurable === false) return false;
        if ("value" in d) t.b[t.o + i] = d.value;
        return true;
      }
    }
    return Reflect.defineProperty(t, k, d);
  },
  preventExtensions() { return false; },
  deleteProperty(t, k) {
    if (typeof k === "string" && k.charCodeAt(0) >= 48 && k.charCodeAt(0) <= 57) return true;
    return delete t[k];
  },
  ownKeys(t) {
    const ks = [];
    for (let i = 0; i < t.n; i++) ks.push(String(i));
    ks.push("length");
    return ks;
  },
  getOwnPropertyDescriptor(t, k) {
    if (typeof k === "string") {
      const ch = k.charCodeAt(0);
      if (ch >= 48 && ch <= 57) {
        const i = +k;
        return i < t.n ? { value: t.b[t.o + i], writable: true, enumerable: true, configurable: true } : undefined;
      }
      if (k === "length") return { value: t.n, writable: true, enumerable: false, configurable: false };
    }
    return Reflect.getOwnPropertyDescriptor(t, k);
  },
};
var __mkview = __mkview || function(b, o, n, c, f) {
  if (o === 0 && n === b.length && c === n && !f) return b;
  if (c === 0) return [];
  const t = new __SV();
  t.b = b; t.o = o; t.n = n; t.c = c;
  return new Proxy(t, __svh);
};
var __cap = __cap || function(a) {
  if (a == null) return 0;
  const s = a[__sv];
  if (s !== undefined) return s.c;
  if (ArrayBuffer.isView(a)) return __tcap.get(a) ?? a.length;
  return a[__rcap]?.c ?? a.length;
};
// A snapshot shared by a copy of a copy (e.own false) is cloned before it is
// updated, so the update does not reach the other copy's snapshot (whose
// write-back would then revert the element).
var __rcown = __rcown || function(e, a) {
  if (e.own === false) { e.s = e.s.slice(e.so, e.so + a.length); e.so = 0; e.own = true; }
  return e.s;
};
// Write back only the elements of a __reslice copy that changed since it was
// made (e.s from e.so is its snapshot, kept up to date by __rcs), so writes
// made meanwhile through other slices of the backing array are kept.
var __rcput = __rcput || function(e, a, from, to) {
  for (let i = from; i < to; i++) {
    const v = a[i];
    if (!Object.is(v, e.s[e.so + i])) { e.b[e.o + i] = v; __rcown(e, a)[e.so + i] = v; }
  }
};
// After an index write to a possible __reslice copy: write element i through.
var __rcs = __rcs || function(a, i) {
  const e = a?.[__rcap];
  if (e !== undefined && i >= 0 && i < e.c && i < a.length) { const v = a[i]; e.b[e.o + i] = v; __rcown(e, a)[e.so + i] = v; }
};
var __rcdef = __rcdef || function(r, e) {
  Object.defineProperty(r, __rcap, { value: e, writable: true });
};
var __rcflush = __rcflush || function(a) {
  const e = a[__rcap];
  if (e !== undefined) __rcput(e, a, 0, a.length);
  return e;
};
var __slice = __slice || function(a, lo, hi, max) {
  if (typeof a === "string") return a.slice(lo, hi);
  const s = a == null ? undefined : a[__sv];
  const n = s !== undefined ? s.n : a == null ? 0 : a.length;
  const c = s !== undefined ? s.c : __cap(a);
  const mx = max;
  if (hi === undefined) hi = n;
  if (max === undefined) max = c;
  if (!(lo >= 0 && lo <= hi && hi <= max && max <= c)) throw new Error("runtime error: slice bounds out of range");
  if (a == null) return a;
  if (s !== undefined) return __mkview(s.b, s.o + lo, hi - lo, max - lo);
  if (c > n && Array.isArray(a)) {
    // a is a __reslice copy (only those have cap > len): reach past its
    // length or capacity through the backing array, else stay on the copy
    // (an explicit max needs a view: the copy itself keeps the old cap).
    if (hi <= n && (mx === undefined || mx <= n)) return __mkview(a, lo, hi - lo, Math.min(max, n) - lo, mx !== undefined);
    else { const e = __rcflush(a); return __mkview(e.b, e.o + lo, hi - lo, max - lo); }
  }
  if (ArrayBuffer.isView(a)) {
    const r = hi <= n ? a.subarray(lo, hi) : new a.constructor(a.buffer, a.byteOffset + lo * a.BYTES_PER_ELEMENT, hi - lo);
    if (max - lo > hi - lo) __tcap.set(r, max - lo);
    return r;
  }
  return __mkview(a, lo, hi - lo, max - lo);
};
var __reslice = __reslice || function(a, lo, hi) {
  if (Array.isArray(a) && a[__sv] === undefined) {
    const n = a.length;
    if (hi === undefined) hi = n;
    if (lo >= 0 && lo <= hi && hi <= n) {
      if (lo === 0 && hi === n) return a;
      const e = a[__rcap];
      const r = a.slice(lo, hi);
      if (e === undefined) {
        __rcdef(r, { b: a, o: lo, c: n - lo, s: a.slice(lo, hi), so: 0 });
        return r;
      }
      // A copy of a copy: write back the changed elements it drops and share
      // the snapshot (copied on write, __rcown), so a pop costs no more than
      // the copy itself.
      if (lo > 0) __rcput(e, a, 0, lo);
      __rcput(e, a, hi, n);
      e.own = false;
      __rcdef(r, { b: e.b, o: e.o + lo, c: e.c - lo, s: e.s, so: e.so + lo, own: false });
      return r;
    }
  }
  return __slice(a, lo, hi);
};
var __mkslice = __mkslice || function(n, b) {
  if (!(n >= 0 && n <= b.length)) throw new Error("runtime error: makeslice: cap out of range");
  return __slice(b, 0, n);
};
var __append = __append || function(a, ...b) {
  if (a && ArrayBuffer.isView(a)) {
    const c = __tcap.get(a);
    if (c !== undefined && a.length + b.length <= c) {
      const r = new a.constructor(a.buffer, a.byteOffset, a.length + b.length);
      r.set(b, a.length);
      if (c > r.length) __tcap.set(r, c);
      return r;
    }
    const res = new a.constructor(a.length + b.length);
    res.set(a);
    res.set(b, a.length);
    return res;
  }
  const s = a ? a[__sv] : undefined;
  if (s !== undefined && s.n + b.length <= s.c) {
    for (let i = 0; i < b.length; i++) s.b[s.o + s.n + i] = b[i];
    return __mkview(s.b, s.o, s.n + b.length, s.c);
  }
  if (s === undefined && a) {
    const e = a[__rcap];
    if (e !== undefined && a.length + b.length <= e.c) {
      __rcflush(a);
      for (let i = 0; i < b.length; i++) e.b[e.o + a.length + i] = b[i];
      return __mkview(e.b, e.o, a.length + b.length, e.c);
    }
  }
  return a ? [...a, ...b] : b;
};
var __s = __s || function(a) { return a || []; };
var __ifv = __ifv || function(x, ptrFields) {
  if (x === null || typeof x !== "object") return x;
  const c = typeof x.__clone === "function" ? x.__clone() : Object.assign(Object.create(Object.getPrototypeOf(x)), x);
  Object.defineProperty(c, "__v", { value: true, configurable: true });
  if (Array.isArray(ptrFields)) {
    for (const f of ptrFields) {
      if (f.indexOf(".") !== -1) {
        const parts = f.split(".");
        let cur = c;
        for (let j = 0; j < parts.length - 1; j++) cur = cur?.[parts[j]];
        const last = parts[parts.length - 1];
        if (cur?.[last] !== null && typeof cur?.[last] === "object") __ifp(cur[last]);
      } else if (c[f] !== null && typeof c[f] === "object") {
        __ifp(c[f]);
      }
    }
  }
  for (const k of Object.keys(c)) {
    if (c[k] !== null && typeof c[k] === "object" && !Array.isArray(c[k]) && !ArrayBuffer.isView(c[k])) {
      if (!c[k].__v && !c[k].__p && Object.isExtensible(c[k]) && (!Array.isArray(ptrFields) || !ptrFields.includes(k))) {
        Object.defineProperty(c[k], "__v", { value: true, configurable: true });
      }
    }
  }
  return c;
};
var __buffer_proto = __buffer_proto || {
  Write(d) {
    this._lastOp = 0;
    for (let i = 0; i < d.length; i++) this._buf.push(d[i]);
    return [d.length, null];
  },
  WriteString(s) {
    this._lastOp = 0;
    const bytes = new TextEncoder().encode(s);
    for (let i = 0; i < bytes.length; i++) this._buf.push(bytes[i]);
    return [bytes.length, null];
  },
  Read(p) {
    if (!this._buf || this._buf.length === 0) return [0, typeof __io_eof !== "undefined" ? __io_eof : "EOF"];
    const n = Math.min(p.length, this._buf.length);
    for (let i = 0; i < n; i++) p[i] = this._buf.shift();
    if (n > 0) { this._lastOp = 1; this._lastByte = p[n - 1]; } else { this._lastOp = 0; }
    return [n, null];
  },
  String() {
    return new TextDecoder().decode(new Uint8Array(this._buf));
  },
  Reset() {
    this._buf = [];
  }
};
var __builder_proto = __builder_proto || {
  Write(d) {
    this._buf += new TextDecoder().decode(new Uint8Array(d));
    return [d.length, null];
  },
  WriteString(s) {
    this._buf += s;
    return [new TextEncoder().encode(s).length, null];
  },
  String() {
    return this._buf;
  },
  Reset() {
    this._buf = "";
  }
};
var __ifp = __ifp || function(x, ptrFields, seen) {
  if (x === null || typeof x !== "object") return x;
  if (Array.isArray(x._buf) && typeof x.Write !== "function") Object.assign(x, __buffer_proto);
  else if (typeof x._buf === "string" && typeof x.WriteString !== "function") Object.assign(x, __builder_proto);
  if (x.__p !== true && Object.isExtensible(x))
    Object.defineProperty(x, "__p", { value: true, configurable: true, writable: true });
  if (Array.isArray(ptrFields)) {
    seen = seen || new Set();
    if (seen.has(x)) return x;
    seen.add(x);
    for (const f of ptrFields) {
      if (f.indexOf(".") !== -1) {
        const parts = f.split(".");
        let cur = x;
        for (let j = 0; j < parts.length - 1; j++) cur = cur?.[parts[j]];
        const last = parts[parts.length - 1];
        if (cur?.[last] !== null && typeof cur?.[last] === "object") __ifp(cur[last]);
      } else if (x[f] !== null && typeof x[f] === "object") {
        __ifp(x[f]);
      }
    }
  }
  return x;
};
var __ifm = __ifm || function(x) {
  if (x === null || x === undefined) return x;
  if (typeof x !== "object") return x;
  if (x.__map !== true && Object.isExtensible(x))
    Object.defineProperty(x, "__map", { value: true, configurable: true });
  return x;
};
var __ifpm = __ifpm || function(x) {
  if (x === null || x === undefined) return x;
  if (typeof x !== "object") return x;
  if (x.__map !== true && Object.isExtensible(x)) {
    Object.defineProperty(x, "__map", { value: true, configurable: true });
    Object.defineProperty(x, "__ptr_map", { value: true, configurable: true });
  }
  return x;
};
var __ifs = __ifs || function(x, ptrFields) {
  if (x === null || x === undefined) return x;
  if (x.__slice !== true && Object.isExtensible(x))
    Object.defineProperty(x, "__slice", { value: true, configurable: true });
  if (Array.isArray(ptrFields) && Object.isExtensible(x))
    Object.defineProperty(x, "__ptr_fields", { value: ptrFields, configurable: true });
  return x;
};
var __ifps = __ifps || function(x) {
  if (x === null || x === undefined) return x;
  if (x.__slice !== true && Object.isExtensible(x)) {
    Object.defineProperty(x, "__slice", { value: true, configurable: true });
    Object.defineProperty(x, "__ptr_slice", { value: true, configurable: true });
  }
  return x;
};
var __equal = __equal || function __equal(a, b) {
  if (a === b && !Array.isArray(a)) return true;
  if (a === null || b === null) return false;
  if (a.__target !== undefined && b.__target !== undefined) {
    return a.__target === b.__target && a.__index === b.__index;
  }
  if (a instanceof Date && b instanceof Date) return a.getTime() === b.getTime();
  if (ArrayBuffer.isView(a) && ArrayBuffer.isView(b)) {
    if (a.byteLength !== b.byteLength || a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (a[i] !== b[i]) return false;
    return true;
  }
  if (Array.isArray(a) && Array.isArray(b)) {
    if (a.length !== b.length) return false;
    for (let i = 0; i < a.length; i++) if (!__equal(a[i], b[i])) return false;
    return true;
  }
  if (typeof a === "object" && typeof b === "object") {
    const ka = Object.keys(a), kb = Object.keys(b);
    if (ka.length !== kb.length) return false;
    for (const k of ka) if (!__equal(a[k], b[k])) return false;
    return true;
  }
  return false;
};
var __ifeq = __ifeq || function(a, b) {
  if (a === b) return true;
  if (a === null || a === undefined || b === null || b === undefined) return a == null && b == null;
  if (typeof a === "object" && typeof b === "object" && a.constructor === b.constructor && typeof a.__gfUnbox === "function") {
    return a.__gfUnbox() === b.__gfUnbox();
  }
  // Struct values boxed by __ifv compare field by field.
  if (typeof a === "object" && typeof b === "object" && a.__v === true && b.__v === true && a.constructor === b.constructor) {
    return __equal(a, b);
  }
  return false;
};
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
var __nm = __nm || function() { return Object.defineProperty({}, "__nm", { value: true }); };
var __isnm = __isnm || function(m) {
  return m == null || m.__nilm === true || (m.__nm === true && Object.keys(m).length === 0);
};
var __kt = __kt || new Map();
var __sk = __sk || function(o) {
  const s = "\u0001" + JSON.stringify(o, (k, v) => typeof v === "bigint" ? v.toString() + "n" : v);
  if (!__kt.has(s)) __kt.set(s, typeof o.__clone === "function" ? o.__clone() : o);
  return s;
};
var __ik = __ik || function(k) {
  const t = typeof k;
  if (t === "number" || t === "boolean" || t === "bigint") return "\u0001" + t + ":" + String(k);
  if (k !== null && t === "object" && typeof k.__gfUnbox === "function" && !k.constructor.name.endsWith("$Ptr")) {
    const v = k.__gfUnbox(), vt = typeof v;
    if (vt === "string" || vt === "number" || vt === "boolean" || vt === "bigint") {
      const s = "\u0001" + k.constructor.name + ":" + vt + ":" + String(v);
      if (!__kt.has(s)) __kt.set(s, k);
      return s;
    }
  }
  return k;
};
// A key typed by a type parameter whose factory is `f`: interface type
// arguments key by dynamic type; `box` (an `any`-keyed map) boxes a named
// basic value first, other keys are left as they are.
var __ikt = __ikt || function(f, k, box) {
  if (f?.k === "iface") return __ik(k);
  return box ? __ik(f?.b ? f.b(k) : k) : k;
};
var __kd = __kd || function(s, copy) {
  if (typeof s !== "string" || s.charCodeAt(0) !== 1) return s;
  const k = __kt.get(s);
  if (k === undefined) {
    if (s.startsWith("\u0001number:")) return Number(s.slice(8));
    if (s.startsWith("\u0001boolean:")) return s.slice(9) === "true";
    if (s.startsWith("\u0001bigint:")) return BigInt(s.slice(8));
    return s;
  }
  return copy && typeof k.__clone === "function" ? k.__clone() : k;
};
var __kcmp = __kcmp || function(a, b) {
  if (a !== null && b !== null && typeof a === "object" && typeof b === "object") {
    for (const f of Object.keys(a)) {
      const c = __kcmp(a[f], b[f]);
      if (c !== 0) return c;
    }
    return 0;
  }
  return a < b ? -1 : a > b ? 1 : 0;
};
var __error = __error || function(msg, cause) {
  return { Error() { return msg; }, toString() { return msg; }, _msg: msg, _cause: cause ?? null };
};
var __strconv_err_syntax = __strconv_err_syntax || __error("invalid syntax");
var __strconv_err_range = __strconv_err_range || __error("value out of range");
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
var __strconv_parse_uint = __strconv_parse_uint || function(s, base, bits) {
  let str = s;
  if (str[0] === "+") { str = str.slice(1); }
  if (str[0] === "-") {
    return [0n, 'strconv.ParseUint: parsing "' + s + '": invalid syntax'];
  }
  if (base === 0) {
    if (/^0[xX]/.test(str)) { base = 16; str = str.slice(2); }
    else if (/^0[bB]/.test(str)) { base = 2; str = str.slice(2); }
    else if (/^0[oO]/.test(str)) { base = 8; str = str.slice(2); }
    else if (/^0[0-9]/.test(str)) { base = 8; str = str.slice(1); }
    else base = 10;
    str = str.replaceAll("_", "");
  }
  if (base < 2 || base > 36) return [0n, 'strconv.ParseUint: parsing "' + s + '": invalid base ' + base];
  const digits = "0123456789abcdefghijklmnopqrstuvwxyz".slice(0, base);
  if (str === "" || [...str.toLowerCase()].some((c) => !digits.includes(c))) {
    return [0n, 'strconv.ParseUint: parsing "' + s + '": invalid syntax'];
  }
  let v = 0n; const B = BigInt(base);
  for (const c of str.toLowerCase()) v = v * B + BigInt(digits.indexOf(c));
  const w = bits === 0 ? 64 : bits;
  const max = w >= 64 ? 18446744073709551615n : (1n << BigInt(w)) - 1n;
  if (v > max) return [max, 'strconv.ParseUint: parsing "' + s + '": value out of range'];
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
var __timeLocalDt = __timeLocalDt || function(t) {
  const dt = t instanceof Date ? t : (t?._d ?? t);
  if (typeof t?._offset === "number") {
    return new Date(dt.getTime() + t._offset * 1000);
  }
  return null;
};
var __timeYear = __timeYear || function(t) {
  var ld = __timeLocalDt(t);
  return ld ? ld.getUTCFullYear() : (t instanceof Date ? t : t._d).getFullYear();
};
var __timeMonth = __timeMonth || function(t) {
  var ld = __timeLocalDt(t);
  return (ld ? ld.getUTCMonth() : (t instanceof Date ? t : t._d).getMonth()) + 1;
};
var __timeDay = __timeDay || function(t) {
  var ld = __timeLocalDt(t);
  return ld ? ld.getUTCDate() : (t instanceof Date ? t : t._d).getDate();
};
var __timeHour = __timeHour || function(t) {
  var ld = __timeLocalDt(t);
  return ld ? ld.getUTCHours() : (t instanceof Date ? t : t._d).getHours();
};
var __timeMinute = __timeMinute || function(t) {
  var ld = __timeLocalDt(t);
  return ld ? ld.getUTCMinutes() : (t instanceof Date ? t : t._d).getMinutes();
};
var __timeSecond = __timeSecond || function(t) {
  var ld = __timeLocalDt(t);
  return ld ? ld.getUTCSeconds() : (t instanceof Date ? t : t._d).getSeconds();
};
var __timeWeekday = __timeWeekday || function(t) {
  var ld = __timeLocalDt(t);
  return ld ? ld.getUTCDay() : (t instanceof Date ? t : t._d).getDay();
};
var __timeDate = __timeDate || function(t) {
  var ld = __timeLocalDt(t);
  var dt = t instanceof Date ? t : t._d;
  return ld ? [ld.getUTCFullYear(), ld.getUTCMonth() + 1, ld.getUTCDate()] : [dt.getFullYear(), dt.getMonth() + 1, dt.getDate()];
};
var __timeClock = __timeClock || function(t) {
  var ld = __timeLocalDt(t);
  var dt = t instanceof Date ? t : t._d;
  return ld ? [ld.getUTCHours(), ld.getUTCMinutes(), ld.getUTCSeconds()] : [dt.getHours(), dt.getMinutes(), dt.getSeconds()];
};
var __timeFmt = __timeFmt || function(d, layout) {
  const dt = d instanceof Date ? d : (d?._d ?? d);
  const hasOff = typeof d?._offset === "number" || typeof d?._loc?._offset === "number";
  const offSec = typeof d?._offset === "number" ? d._offset : (d?._loc?._offset ?? 0);
  const localDt = hasOff ? new Date(dt.getTime() + offSec * 1000) : null;
  const pad = (n, w = 2) => String(n).padStart(w, "0");
  const DAYS = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
  const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
  const getFullYear = () => localDt ? localDt.getUTCFullYear() : dt.getFullYear();
  const getMonth = () => localDt ? localDt.getUTCMonth() : dt.getMonth();
  const getDate = () => localDt ? localDt.getUTCDate() : dt.getDate();
  const getDay = () => localDt ? localDt.getUTCDay() : dt.getDay();
  const getHours = () => localDt ? localDt.getUTCHours() : dt.getHours();
  const getMinutes = () => localDt ? localDt.getUTCMinutes() : dt.getMinutes();
  const getSeconds = () => localDt ? localDt.getUTCSeconds() : dt.getSeconds();
  const getMilliseconds = () => localDt ? localDt.getUTCMilliseconds() : dt.getMilliseconds();
  const getTimezoneOffset = () => hasOff ? Math.round(-offSec / 60) : dt.getTimezoneOffset();
  return layout.replace(/2006|06|Monday|Mon|January|Jan|01|02|15|PM|pm|03|04|05|Z07:00|-07:00|-0700|MST|\.(?:0+|9+)|1|2|3|4|5/g, t => {
    if (t.startsWith(".")) {
      const isZeroPad = t.includes("0");
      const maxLen = t.length - 1;
      const ms = getMilliseconds();
      let frac = pad(ms, 3);
      if (d?._ns) {
        frac += String(d._ns).padStart(6, "0");
      }
      if (maxLen > frac.length) frac = frac.padEnd(maxLen, "0");
      else frac = frac.slice(0, maxLen);
      if (!isZeroPad) {
        frac = frac.replace(/0+$/, "");
        return frac.length > 0 ? "." + frac : "";
      } else {
        return "." + frac;
      }
    }
    switch (t) {
      case "2006": return getFullYear();
      case "06":   return String(getFullYear()).slice(-2);
      case "Monday": return DAYS[getDay()];
      case "Mon":    return DAYS[getDay()].slice(0, 3);
      case "January": return MONTHS[getMonth()];
      case "Jan":     return MONTHS[getMonth()].slice(0, 3);
      case "01": return pad(getMonth() + 1);
      case "1":  return String(getMonth() + 1);
      case "02": return pad(getDate());
      case "2":  return String(getDate());
      case "15": return pad(getHours());
      case "PM": return getHours() < 12 ? "AM" : "PM";
      case "pm": return getHours() < 12 ? "am" : "pm";
      case "03": return pad(getHours() % 12 || 12);
      case "3":  return String(getHours() % 12 || 12);
      case "04": return pad(getMinutes());
      case "4":  return String(getMinutes());
      case "05": return pad(getSeconds());
      case "5":  return String(getSeconds());
      case "Z07:00": {
        const o = -getTimezoneOffset();
        return o === 0 ? "Z" : (o > 0 ? "+" : "-") + pad(Math.floor(Math.abs(o) / 60)) + ":" + pad(Math.abs(o) % 60);
      }
      case "-07:00": {
        const o = -getTimezoneOffset();
        return (o >= 0 ? "+" : "-") + pad(Math.floor(Math.abs(o) / 60)) + ":" + pad(Math.abs(o) % 60);
      }
      case "-0700": {
        const o = -getTimezoneOffset();
        return (o >= 0 ? "+" : "-") + pad(Math.floor(Math.abs(o) / 60)) + pad(Math.abs(o) % 60);
      }
      case "MST": return d?._loc ? d._loc._name : (hasOff && offSec === 0 ? "UTC" : "LOCAL");
      default: return t;
    }
  });
};
var __timeTruncate = __timeTruncate || function(t, d) {
  d = BigInt(d);
  if (d <= 0n) return t;
  var nano = BigInt(t._d.getTime()) * 1000000n + BigInt(t._ns || 0);
  var dt = nano + 62135596800000000000n;
  var r = dt % d;
  if (r < 0n) r += d;
  var newNano = nano - r;
  var newMs = Number(newNano / 1000000n);
  var remNs = Number(newNano % 1000000n);
  if (remNs < 0) { newMs--; remNs += 1000000; }
  return { _d: new Date(newMs), _offset: t._offset, _loc: t._loc, _ns: remNs };
};
var __timeRound = __timeRound || function(t, d) {
  d = BigInt(d);
  if (d <= 0n) return t;
  var nano = BigInt(t._d.getTime()) * 1000000n + BigInt(t._ns || 0);
  var dt = nano + 62135596800000000000n;
  var r = dt % d;
  if (r < 0n) r += d;
  var newNano = (r + r < d) ? (nano - r) : (nano + d - r);
  var newMs = Number(newNano / 1000000n);
  var remNs = Number(newNano % 1000000n);
  if (remNs < 0) { newMs--; remNs += 1000000; }
  return { _d: new Date(newMs), _offset: t._offset, _loc: t._loc, _ns: remNs };
};
var __timeAddDate = __timeAddDate || function(t, years, months, days) {
  var d = t._d;
  if (typeof t._offset === "number") {
    var offSec = t._offset;
    var localD = new Date(d.getTime() + offSec * 1000);
    var newLocalD = new Date(Date.UTC(
      localD.getUTCFullYear() + Number(years),
      localD.getUTCMonth() + Number(months),
      localD.getUTCDate() + Number(days),
      localD.getUTCHours(),
      localD.getUTCMinutes(),
      localD.getUTCSeconds(),
      localD.getUTCMilliseconds()
    ));
    var newDate = new Date(newLocalD.getTime() - offSec * 1000);
    return { _d: newDate, _offset: t._offset, _loc: t._loc, _ns: t._ns };
  }
  var newDate = new Date(
    d.getFullYear() + Number(years),
    d.getMonth() + Number(months),
    d.getDate() + Number(days),
    d.getHours(),
    d.getMinutes(),
    d.getSeconds(),
    d.getMilliseconds()
  );
  return { _d: newDate, _offset: t._offset, _loc: t._loc, _ns: t._ns };
};
var __timeYearDay = __timeYearDay || function(t) {
  var d = t._d;
  if (typeof t._offset === "number") {
    var localD = new Date(d.getTime() + t._offset * 1000);
    var start = new Date(Date.UTC(localD.getUTCFullYear(), 0, 0));
    return Math.floor((localD.getTime() - start.getTime()) / 86400000);
  }
  var start = new Date(d.getFullYear(), 0, 0);
  return Math.floor((d.getTime() - start.getTime()) / 86400000);
};
var __timeISOWeek = __timeISOWeek || function(t) {
  if (typeof t._offset === "number") {
    var d = new Date(t._d.getTime() + t._offset * 1000);
    var day = (d.getUTCDay() + 6) % 7;
    d.setUTCDate(d.getUTCDate() - day + 3);
    var year = d.getUTCFullYear();
    var firstThu = new Date(Date.UTC(year, 0, 4));
    var firstDay = (firstThu.getUTCDay() + 6) % 7;
    firstThu.setUTCDate(firstThu.getUTCDate() - firstDay + 3);
    var week = 1 + Math.round((d.getTime() - firstThu.getTime()) / 604800000);
    return [year, week];
  }
  var d = new Date(t._d.getTime());
  var day = (d.getDay() + 6) % 7;
  d.setDate(d.getDate() - day + 3);
  var year = d.getFullYear();
  var firstThu = new Date(year, 0, 4);
  var firstDay = (firstThu.getDay() + 6) % 7;
  firstThu.setDate(firstThu.getDate() - firstDay + 3);
  var week = 1 + Math.round((d.getTime() - firstThu.getTime()) / 604800000);
  return [year, week];
};
var __timeMarshalJSON = __timeMarshalJSON || function(t) {
  var y = (typeof t._offset === "number") ? new Date(t._d.getTime() + t._offset * 1000).getUTCFullYear() : t._d.getFullYear();
  if (y < 0 || y > 9999) {
    return [new Uint8Array(0), typeof __error === "function" ? __error("Time.MarshalJSON: year outside of range [0,9999]") : new Error("Time.MarshalJSON: year outside of range [0,9999]")];
  }
  var s = '"' + __timeFmt(t, "2006-01-02T15:04:05.999999999Z07:00") + '"';
  return [new TextEncoder().encode(s), null];
};
var __timeMarshalText = __timeMarshalText || function(t) {
  var y = (typeof t._offset === "number") ? new Date(t._d.getTime() + t._offset * 1000).getUTCFullYear() : t._d.getFullYear();
  if (y < 0 || y > 9999) {
    return [new Uint8Array(0), typeof __error === "function" ? __error("Time.MarshalText: year outside of range [0,9999]") : new Error("Time.MarshalText: year outside of range [0,9999]")];
  }
  var s = __timeFmt(t, "2006-01-02T15:04:05.999999999Z07:00");
  return [new TextEncoder().encode(s), null];
};
var __timeUnmarshalJSON = __timeUnmarshalJSON || function(t, data) {
  var s = typeof data === "string" ? data : new TextDecoder().decode(data);
  s = s.trim();
  if (s === "null") return null;
  if (!s.startsWith('"') || !s.endsWith('"') || s.length < 2) {
    return typeof __error === "function" ? __error("Time.UnmarshalJSON: input is not a JSON string") : new Error("Time.UnmarshalJSON: input is not a JSON string");
  }
  var inner = s.slice(1, -1);
  var parsed = __timeParse("2006-01-02T15:04:05.999999999Z07:00", inner);
  if (parsed[1]) parsed = __timeParse("2006-01-02T15:04:05Z07:00", inner);
  if (parsed[1]) return parsed[1];
  t._d = parsed[0]._d;
  t._offset = parsed[0]._offset;
  t._loc = parsed[0]._loc;
  t._ns = parsed[0]._ns;
  return null;
};
var __timeUnmarshalText = __timeUnmarshalText || function(t, data) {
  var s = typeof data === "string" ? data : new TextDecoder().decode(data);
  s = s.trim();
  var parsed = __timeParse("2006-01-02T15:04:05.999999999Z07:00", s);
  if (parsed[1]) parsed = __timeParse("2006-01-02T15:04:05Z07:00", s);
  if (parsed[1]) return parsed[1];
  t._d = parsed[0]._d;
  t._offset = parsed[0]._offset;
  t._loc = parsed[0]._loc;
  t._ns = parsed[0]._ns;
  return null;
};
var __timeAfterFunc = __timeAfterFunc || function(d, f) {
  var timer = {
    _id: null,
    _active: true,
    _f: f,
    Stop: function() {
      var act = this._active;
      if (act) {
        clearTimeout(this._id);
        this._active = false;
      }
      return act;
    },
    Reset: function(newD) {
      var act = this._active;
      if (act) clearTimeout(this._id);
      var self = this;
      this._active = true;
      this._id = setTimeout(function() {
        self._active = false;
        self._f();
      }, Math.round(Number(newD) / 1000000));
      return act;
    }
  };
  timer._id = setTimeout(function() {
    timer._active = false;
    timer._f();
  }, Math.round(Number(d) / 1000000));
  return timer;
};
var __timeParse = __timeParse || function(layout, value) {
  try {
    const val = String(value);
    const d = new Date(val);
    if (isNaN(d.getTime())) throw 0;
    let offset = undefined;
    let loc = null;
    let ns = 0;
    const m = /\.(\d{1,9})/.exec(val);
    if (m) {
      const fracStr = m[1].padEnd(9, "0");
      ns = Number(fracStr.slice(3));
    }
    if (val.endsWith("Z") || val.endsWith("z")) {
      offset = 0;
    } else {
      const tzMatch = /([+-])(\d{2}):?(\d{2})$/.exec(val);
      if (tzMatch) {
        const sign = tzMatch[1] === "+" ? 1 : -1;
        const offSec = sign * (Number(tzMatch[2]) * 3600 + Number(tzMatch[3]) * 60);
        offset = offSec;
        loc = { _name: tzMatch[0], _offset: offSec, String() { return this._name; } };
      }
    }
    return [{ _d: d, _offset: offset, _loc: loc, _ns: ns }, null];
  } catch {
    return [{ _d: new Date(0) }, { Error() { return "parsing time: cannot parse"; }, toString() { return "parsing time: cannot parse"; }, _msg: "parsing time: cannot parse", _cause: null }];
  }
};
var __durationString = __durationString || function(d) {
  d = BigInt(d);
  if (d === 0n) return "0s";
  let neg = false;
  if (d < 0n) { neg = true; d = -d; }
  let s = "";
  const totalSec = d / 1000000000n;
  const sec = totalSec % 60n;
  const min = (totalSec / 60n) % 60n;
  const hr = totalSec / 3600n;

  if (hr > 0n) s += hr + "h";
  const remAfterHr = d % 3600000000000n;
  if (min > 0n || (hr > 0n && remAfterHr > 0n)) s += min + "m";
  if (totalSec > 0n) {
    const frac = d % 1000000000n;
    if (sec > 0n || frac > 0n || (hr === 0n && min === 0n)) {
      if (frac === 0n) {
        s += sec + "s";
      } else {
        let fracStr = frac.toString().padStart(9, "0").replace(/0+$/, "");
        s += sec + "." + fracStr + "s";
      }
    }
  } else {
    const ms = (d / 1000000n) % 1000n;
    const us = (d / 1000n) % 1000n;
    const ns = d % 1000n;
    if (ms > 0n) {
      const frac = d % 1000000n;
      if (frac === 0n) s += ms + "ms";
      else {
        let fracStr = frac.toString().padStart(6, "0").replace(/0+$/, "");
        s += ms + "." + fracStr + "ms";
      }
    } else if (us > 0n) {
      const frac = d % 1000n;
      if (frac === 0n) s += us + "µs";
      else {
        let fracStr = frac.toString().padStart(3, "0").replace(/0+$/, "");
        s += us + "." + fracStr + "µs";
      }
    } else {
      s += ns + "ns";
    }
  }
  return neg ? "-" + s : s;
};
var __durationRound = __durationRound || function(d, m) {
  d = BigInt(d);
  m = BigInt(m);
  if (m <= 0n) return Number(d);
  var r = d % m;
  if (d < 0n) {
    r = -r;
    if (r + r < m) return Number(d + r);
    return Number(d - m + r);
  }
  if (r + r < m) return Number(d - r);
  return Number(d + m - r);
};
var __monthString = __monthString || function(m) {
  var names = ["", "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
  var n = Number(m);
  if (n >= 1 && n <= 12) return names[n];
  return "%!Month(" + n + ")";
};
var __weekdayString = __weekdayString || function(w) {
  var names = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
  var n = Number(w);
  if (n >= 0 && n <= 6) return names[n];
  return "%!Weekday(" + n + ")";
};
var __timeParseDuration = __timeParseDuration || function(s) {
  var orig = String(s);
  if (orig === "0") return [0, null];
  var str = orig.trim();
  var neg = false;
  if (str.startsWith("-")) { neg = true; str = str.slice(1); }
  else if (str.startsWith("+")) { str = str.slice(1); }
  if (str === "0") return [0, null];
  if (str === "") return [0, typeof __error === "function" ? __error('time: invalid duration ""') : new Error('time: invalid duration ""')];

  var totalNs = 0n;
  var re = /^(\d*(?:\.\d+)?)(ns|us|µs|\u00b5s|\u03bcs|ms|s|m|h)/;
  while (str.length > 0) {
    var m = re.exec(str);
    if (!m || m[1] === "" || m[1] === ".") {
      return [0, typeof __error === "function" ? __error('time: invalid duration "' + orig + '"') : new Error('time: invalid duration "' + orig + '"')];
    }
    var numStr = m[1];
    var unitStr = m[2];
    var unitMult = 1n;
    if (unitStr === "ns") unitMult = 1n;
    else if (unitStr === "us" || unitStr === "µs" || unitStr === "\u00b5s" || unitStr === "\u03bcs") unitMult = 1000n;
    else if (unitStr === "ms") unitMult = 1000000n;
    else if (unitStr === "s") unitMult = 1000000000n;
    else if (unitStr === "m") unitMult = 60000000000n;
    else if (unitStr === "h") unitMult = 3600000000000n;

    if (numStr.includes(".")) {
      var parts = numStr.split(".");
      var whole = parts[0] ? BigInt(parts[0]) : 0n;
      var frac = parts[1];
      var fracScale = Math.pow(10, frac.length);
      var fracVal = BigInt(Math.round((Number(frac) / fracScale) * Number(unitMult)));
      totalNs += whole * unitMult + fracVal;
    } else {
      totalNs += BigInt(numStr) * unitMult;
    }
    str = str.slice(m[0].length);
  }
  if (neg) totalNs = -totalNs;
  return [Number(totalNs), null];
};
var __base64_make = __base64_make || function(alphabet, padChar) {
  const encMap = alphabet.split("");
  const decMap = {};
  for (let i = 0; i < 64; i++) decMap[alphabet[i]] = i;
  return {
    EncodeToString: function(src) {
      if (!src || src.length === 0) return "";
      let res = "";
      let i = 0;
      for (; i + 2 < src.length; i += 3) {
        const n = (src[i] << 16) | (src[i + 1] << 8) | src[i + 2];
        res += encMap[(n >> 18) & 63] + encMap[(n >> 12) & 63] + encMap[(n >> 6) & 63] + encMap[n & 63];
      }
      if (i < src.length) {
        if (src.length - i === 1) {
          const n = src[i] << 16;
          res += encMap[(n >> 18) & 63] + encMap[(n >> 12) & 63];
          if (padChar) res += padChar + padChar;
        } else {
          const n = (src[i] << 16) | (src[i + 1] << 8);
          res += encMap[(n >> 18) & 63] + encMap[(n >> 12) & 63] + encMap[(n >> 6) & 63];
          if (padChar) res += padChar;
        }
      }
      return res;
    },
    DecodeString: function(s) {
      let str = s.replace(/\s+/g, "");
      if (padChar) {
        if (str.length % 4 !== 0) return [new Uint8Array(0), __error("illegal base64 data at input byte " + str.length)];
        if (str.endsWith(padChar + padChar)) {
          if (str.endsWith(padChar + padChar + padChar)) return [new Uint8Array(0), __error("illegal base64 data at input byte " + (str.length - 3))];
          str = str.slice(0, -2);
          if (str.length % 4 !== 2) return [new Uint8Array(0), __error("illegal base64 data at input byte " + str.length)];
        } else if (str.endsWith(padChar)) {
          str = str.slice(0, -1);
          if (str.length % 4 !== 3) return [new Uint8Array(0), __error("illegal base64 data at input byte " + str.length)];
        }
      }
      const out = [];
      let i = 0;
      for (; i + 3 < str.length; i += 4) {
        const c0 = decMap[str[i]], c1 = decMap[str[i+1]], c2 = decMap[str[i+2]], c3 = decMap[str[i+3]];
        if (c0 === undefined || c1 === undefined || c2 === undefined || c3 === undefined) return [new Uint8Array(out), __error("illegal base64 data at input byte " + i)];
        const n = (c0 << 18) | (c1 << 12) | (c2 << 6) | c3;
        out.push((n >> 16) & 0xff, (n >> 8) & 0xff, n & 0xff);
      }
      const rem = str.length - i;
      if (rem === 2) {
        const c0 = decMap[str[i]], c1 = decMap[str[i+1]];
        if (c0 === undefined || c1 === undefined) return [new Uint8Array(out), __error("illegal base64 data at input byte " + i)];
        out.push((c0 << 2) | (c1 >> 4));
      } else if (rem === 3) {
        const c0 = decMap[str[i]], c1 = decMap[str[i+1]], c2 = decMap[str[i+2]];
        if (c0 === undefined || c1 === undefined || c2 === undefined) return [new Uint8Array(out), __error("illegal base64 data at input byte " + i)];
        out.push((c0 << 2) | (c1 >> 4), ((c1 & 15) << 4) | (c2 >> 2));
      } else if (rem === 1) {
        return [new Uint8Array(out), __error("illegal base64 data at input byte " + i)];
      }
      return [new Uint8Array(out), null];
    },
    Encode: function(dst, src) {
      const s = this.EncodeToString(src);
      for (let i = 0; i < s.length; i++) dst[i] = s.charCodeAt(i);
    },
    Decode: function(dst, src) {
      const str = String.fromCharCode(...src);
      const [res, err] = this.DecodeString(str);
      for (let i = 0; i < res.length; i++) dst[i] = res[i];
      return [res.length, err];
    },
    EncodedLen: function(n) { return padChar ? Math.ceil(n / 3) * 4 : Math.floor((n * 8 + 5) / 6); },
    DecodedLen: function(n) { return padChar ? Math.floor(n * 3 / 4) : Math.floor(n * 6 / 8); },
    WithPadding: function(p) { return __base64_make(alphabet, p === -1 ? "" : String.fromCharCode(p)); }
  };
};
var __base64_std = __base64_std || __base64_make("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", "=");
var __base64_url = __base64_url || __base64_make("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", "=");
var __base64_raw_std = __base64_raw_std || __base64_make("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", "");
var __base64_raw_url = __base64_raw_url || __base64_make("ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_", "");
var __json_esc = __json_esc || function(s) {
  if (typeof s !== "string") s = String(s);
  var out = JSON.stringify(s);
  var escHtml = typeof OptEscapeHTML$$internal$jsonrt === "undefined" || OptEscapeHTML$$internal$jsonrt;
  if (escHtml) {
    out = out
      .replace(/[<>&]/g, function(c) {
        return c === "<" ? "\\u003c" : (c === ">" ? "\\u003e" : "\\u0026");
      })
      .replace(/\u2028/g, "\\u2028")
      .replace(/\u2029/g, "\\u2029");
  }
  return out;
};
var __json_check_unknown = __json_check_unknown || function(parsed, knownKeys) {
  var disallow = typeof OptDisallowUnknownFields$$internal$jsonrt !== "undefined" && OptDisallowUnknownFields$$internal$jsonrt;
  if (!disallow || !parsed || typeof parsed !== "object" || Array.isArray(parsed)) return null;
  var lowerSet = new Set(knownKeys.map(function(k) { return k.toLowerCase(); }));
  for (var k in parsed) {
    if (Object.prototype.hasOwnProperty.call(parsed, k) && !k.startsWith("__")) {
      if (!lowerSet.has(k.toLowerCase())) {
        var msg = "json: unknown field " + JSON.stringify(k);
        return typeof __error === "function" ? __error(msg) : new Error(msg);
      }
    }
  }
  return null;
};
var __json_err = __json_err || function(msg, valKind, targetType) {
  var fullMsg = "json: " + msg;
  var valDesc = valKind || "";
  var typeDesc = targetType || "";
  if (!valDesc && msg.startsWith("cannot unmarshal ")) {
    var parts = msg.slice(17).split(" into ");
    valDesc = parts[0];
    var rest = parts[1] || "";
    var idx = rest.indexOf(" of type ");
    if (idx >= 0) typeDesc = rest.slice(idx + 9);
    else if (rest.startsWith("Go value of type ")) typeDesc = rest.slice(17);
  }
  var structName = __json_structs.length > 0 ? __json_structs[__json_structs.length - 1] : "";
  var fieldPath = __json_path.join(".");
  var offset = typeof __json_current_offset === "number" ? __json_current_offset : 0;
  var e;
  if (typeof UnmarshalTypeError$$internal$jsonrt === "function") {
    e = new UnmarshalTypeError$$internal$jsonrt(valDesc, typeDesc, BigInt(offset), structName, fieldPath);
    if (e.__p !== true && Object.isExtensible(e)) Object.defineProperty(e, "__p", { value: true, configurable: true, writable: true });
  } else {
    e = typeof __error === "function" ? __error(fullMsg) : new Error(fullMsg);
    e.Value = valDesc;
    e.Type = typeDesc;
    e.Offset = BigInt(offset);
    e.Struct = structName;
    e.Field = fieldPath;
    if (e.__p !== true && Object.isExtensible(e)) Object.defineProperty(e, "__p", { value: true, configurable: true, writable: true });
  }
  e.Error = function() { return fullMsg; };
  e._msg = fullMsg;
  e.__struct = "UnmarshalTypeError$$internal$jsonrt";
  return e;
};
// Decode error context, as in Go: innermost struct being decoded plus the path
// of JSON field names from the root. Reset by every __json_unmarshal call.
var __json_structs = __json_structs || [];
var __json_path = __json_path || [];
var __json_current_offset = __json_current_offset || 0;
var __json_ctx = __json_ctx || function(typeName) {
  if (__json_path.length > 0 && __json_structs.length > 0) {
    return "Go struct field " + __json_structs[__json_structs.length - 1] + "." + __json_path.join(".") + " of type " + typeName;
  }
  return "Go value of type " + typeName;
};
// The JSON source text of a number, for "cannot unmarshal number <literal>" messages.
var __json_lit = __json_lit || function(v, raw) {
  if (raw !== undefined && raw !== null) return String(raw).trim();
  return typeof v === "string" ? v.replace(/__bigint$/, "") : String(v);
};
var __json_is_valid_number = __json_is_valid_number || function(s) {
  return typeof s === "string" && /^-?(?:0|[1-9][0-9]*)(?:\.[0-9]+)?(?:[eE][+-]?[0-9]+)?$/.test(s);
};
var __json_enc_number = __json_enc_number || function(v) {
  var s = typeof v === "string" ? v : (v != null ? String(v) : "");
  if (s === "") return "0";
  if (!__json_is_valid_number(s)) {
    throw new Error("json: invalid number literal " + JSON.stringify(s));
  }
  return s;
};
var __json_number_decode = __json_number_decode || function(v, ctxType, raw) {
  if (typeof v === "number" || (typeof v === "string" && v.endsWith("__bigint"))) {
    return __json_lit(v, raw);
  }
  if (typeof v === "string") {
    if (!__json_is_valid_number(v)) {
      return __json_err("invalid number literal, trying to unmarshal " + JSON.stringify(v) + " into Number");
    }
    return v;
  }
  return __json_err("cannot unmarshal " + __json_type(v) + " into " + __json_ctx(ctxType));
};
var __json_dec_number = __json_dec_number || function(parsed, target, box, rawData, rawStr) {
  if (parsed === null) return null;
  var nv = __json_number_decode(parsed, "json.Number", rawStr);
  if (nv && nv._msg) return nv;
  if (box) box.value = nv;
  return null;
};
var __json_float_decode = __json_float_decode || function(v, bits, ctxType, raw) {
  var n = __json_number_value(v);
  if (typeof n !== "number") return __json_err("cannot unmarshal " + __json_type(v) + " into " + __json_ctx(ctxType));
  var f = bits === 32 ? Math.fround(n) : n;
  if (!isFinite(f)) return __json_err("cannot unmarshal number " + __json_lit(v, raw) + " into " + __json_ctx(ctxType));
  return f;
};
// []byte accepts a base64 string or (like Go) an array of uint8 values.
var __json_bytes_decode = __json_bytes_decode || function(v) {
  if (Array.isArray(v)) {
    var u8 = new Uint8Array(v.length);
    for (var i = 0; i < v.length; i++) {
      var b = __json_int_decode(v[i], "uint8", "uint8", __json_raw_child(v, i));
      if (b && b._msg) return b;
      u8[i] = b;
    }
    return u8;
  }
  if (typeof v !== "string") return __json_err("cannot unmarshal " + __json_type(v) + " into " + __json_ctx("[]uint8"));
  return __json_b64_dec(v);
};
var __json_esc_noh = __json_esc_noh || function(s) {
  return JSON.stringify(String(s)).replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029");
};
var __json_syntax_msg = __json_syntax_msg || function(s) {
  if (typeof CheckValid$$internal$jsonrt === "function") {
    var se = CheckValid$$internal$jsonrt(new TextEncoder().encode(String(s)));
    if (se && typeof se.Error === "function") return se.Error();
  }
  var t = String(s).trim();
  if (t === "") return "unexpected end of JSON input";
  var m;
  try { JSON.parse(t); } catch (e) { m = String(e && e.message); }
  if (m && /end of JSON input|Unterminated/.test(m)) return "unexpected end of JSON input";
  var pos = m && /after JSON at position (\d+)/.exec(m);
  if (pos) return "invalid character '" + t[Number(pos[1])] + "' after top-level value";
  if ("{[\"-0123456789tfn".indexOf(t[0]) < 0) return "invalid character '" + t[0] + "' looking for beginning of value";
  return "invalid character in JSON value";
};
// Validates and compacts JSON text, escaping <, >, & and U+2028/U+2029 inside strings.
var __json_compact = __json_compact || function(s) {
  try { JSON.parse(s); } catch (e) { return null; }
  var out = "", inStr = false, esc = false;
  var escHtml = typeof OptEscapeHTML$$internal$jsonrt === "undefined" || OptEscapeHTML$$internal$jsonrt;
  for (var i = 0; i < s.length; i++) {
    var c = s[i];
    if (inStr) {
      if (esc) { esc = false; out += c; continue; }
      if (c === "\\") { esc = true; out += c; continue; }
      if (c === '"') inStr = false;
      if (!escHtml) out += c;
      else if (c === "<") out += "\\u003c";
      else if (c === ">") out += "\\u003e";
      else if (c === "&") out += "\\u0026";
      else if (c === "\u2028") out += "\\u2028";
      else if (c === "\u2029") out += "\\u2029";
      else out += c;
      continue;
    }
    if (c === '"') { inStr = true; out += c; continue; }
    if (c === " " || c === "\t" || c === "\n" || c === "\r") continue;
    out += c;
  }
  return out;
};
var __json_unsupported_value = __json_unsupported_value || function(str) {
  str = str === "Infinity" ? "+Inf" : (str === "-Infinity" ? "-Inf" : str);
  if (typeof UnsupportedValueError$$internal$jsonrt === "function") {
    var e = new UnsupportedValueError$$internal$jsonrt(null, str);
    e.Str = str;
    if (e.__p !== true && Object.isExtensible(e)) Object.defineProperty(e, "__p", { value: true, configurable: true, writable: true });
    e.__struct = "UnsupportedValueError$$internal$jsonrt";
    return e;
  }
  var e = new Error("json: unsupported value: " + str);
  e.Str = str;
  e.__struct = "UnsupportedValueError$$internal$jsonrt";
  return e;
};
var __json_marshaler_out = __json_marshaler_out || function(res, typeName) {
  var err = res && res[1];
  if (err) {
    var merr;
    if (typeof MarshalerError$$internal$jsonrt === "function") {
      merr = new MarshalerError$$internal$jsonrt(typeName, err, "MarshalJSON");
      if (merr.__p !== true && Object.isExtensible(merr)) Object.defineProperty(merr, "__p", { value: true, configurable: true, writable: true });
      merr.__struct = "MarshalerError$$internal$jsonrt";
    } else {
      merr = new Error("json: error calling MarshalJSON for type " + typeName + ": " + (typeof err.Error === "function" ? err.Error() : String(err)));
    }
    throw merr;
  }
  var b = res ? res[0] : null;
  var s = b === null || b === undefined ? "" : (typeof b === "string" ? b : new TextDecoder().decode(b));
  var c = __json_compact(s);
  if (c === null) throw new Error("json: error calling MarshalJSON for type " + typeName + ": " + __json_syntax_msg(s));
  return c;
};
// Keeps user errors returned by UnmarshalJSON intact while fitting the decoders'
// "_msg"-tagged error protocol; __json_unmarshal unwraps __userErr.
var __json_user_err = __json_user_err || function(e) {
  if (e && e._msg !== undefined) return e;
  return { _msg: e && typeof e.Error === "function" ? e.Error() : String(e), __userErr: e };
};
// Decodes the JSON string payload of a ,string field. Returns { v } or an error.
var __json_unquote = __json_unquote || function(val, kind, typeStr) {
  if (val === null) return { v: null, lit: "null" };
  if (typeof val !== "string" || val.endsWith("__bigint")) {
    return __json_err("invalid use of ,string struct tag, trying to unmarshal unquoted value into " + typeStr);
  }
  var invalid = function() {
    return __json_err("invalid use of ,string struct tag, trying to unmarshal " + JSON.stringify(val) + " into " + typeStr);
  };
  var inner;
  try { inner = JSON.parse(__json_preserve_int64(val)); } catch (e) {
    if (kind !== "string" && kind !== "bool" && /^-?[0-9]/.test(val)) return __json_err("cannot unmarshal number " + val + " into " + __json_ctx(typeStr));
    return invalid();
  }
  if (inner === null) return { v: null, lit: val };
  if (kind === "string") return typeof inner === "string" ? { v: inner, lit: val } : invalid();
  if (kind === "bool") return typeof inner === "number" ? invalid() : { v: inner, lit: val };
  return typeof inner === "boolean" ? invalid() : { v: inner, lit: val };
};
var __json_type = __json_type || function(v) {
  if (v === null) return "null";
  if (Array.isArray(v)) return "array";
  var t = typeof v;
  if (t === "number" || t === "bigint") return "number";
  if (t === "string") return "string";
  if (t === "boolean") return "bool";
  if (t === "object") return "object";
  return t;
};
var __json_raw_index = __json_raw_index || new WeakMap();
var __json_parse_raw_node = __json_parse_raw_node || function(s) {
  var i = 0;
  function ws() { while (i < s.length && /[\t\n\r ]/.test(s[i])) i++; }
  function stringEnd() {
    i++;
    while (i < s.length) {
      if (s[i] === "\\") i += 2;
      else if (s[i++] === '"') break;
    }
  }
  function value() {
    ws();
    var start = i;
    var node = { children: null };
    if (s[i] === "{") {
      i++;
      node.children = new Map();
      ws();
      while (s[i] !== "}") {
        var keyStart = i;
        stringEnd();
        var key = JSON.parse(s.slice(keyStart, i));
        ws();
        i++;
        var child = value();
        node.children.set(key, child);
        ws();
        if (s[i] === ",") { i++; ws(); }
        else break;
      }
      i++;
    } else if (s[i] === "[") {
      i++;
      node.children = new Map();
      ws();
      var index = 0;
      while (s[i] !== "]") {
        node.children.set(String(index++), value());
        ws();
        if (s[i] === ",") { i++; ws(); }
        else break;
      }
      i++;
    } else if (s[i] === '"') {
      stringEnd();
    } else {
      while (i < s.length && !/[\t\n\r ,}\]]/.test(s[i])) i++;
    }
    node.raw = s.slice(start, i);
    node.start = start;
    node.end = i;
    return node;
  }
  return value();
};
var __json_bind_raw = __json_bind_raw || function(value, node) {
  if (value === null || typeof value !== "object" || !node?.children) return;
  __json_raw_index.set(value, node.children);
  for (const [key, child] of node.children) __json_bind_raw(value[key], child);
};
var __json_raw_child = __json_raw_child || function(parent, key) {
  return __json_raw_index.get(parent)?.get(String(key))?.raw;
};
var __json_raw_end = __json_raw_end || function(parent, key) {
  return __json_raw_index.get(parent)?.get(String(key))?.end;
};
var __json_raw_bytes = __json_raw_bytes || function(raw) {
  return new TextEncoder().encode(raw ?? "null");
};
var __json_match_field = __json_match_field || function(obj, tagName, fieldName) {
  if (Object.prototype.hasOwnProperty.call(obj, tagName)) return tagName;
  if (Object.prototype.hasOwnProperty.call(obj, fieldName)) return fieldName;
  var tagFold = tagName.toLowerCase();
  var fieldFold = fieldName.toLowerCase();
  for (const key of Object.keys(obj)) {
    var keyFold = key.toLowerCase();
    if (keyFold === tagFold || keyFold === fieldFold) return key;
  }
  return null;
};
var __json_float64 = __json_float64 || function(v) {
  if (!isFinite(v)) throw __json_unsupported_value(String(v));
  return Object.is(v, -0) ? "-0" : String(v);
};
var __json_float32 = __json_float32 || function(v) {
  var f = Math.fround(v);
  if (!isFinite(f)) throw __json_unsupported_value(String(f));
  if (Object.is(f, -0)) return "-0";
  var candidate;
  for (var precision = 1; precision <= 9; precision++) {
    candidate = f.toPrecision(precision);
    if (Math.fround(Number(candidate)) === f) break;
  }
  var n = Number(candidate);
  var expText = n.toExponential();
  var match = /e([+-]?)(\d+)$/.exec(expText);
  var exponent = Number(match[2]) * (match[1] === "-" ? -1 : 1);
  if (exponent < -6 || exponent >= 21) {
    var mantissa = expText.slice(0, expText.indexOf("e"));
    var sign = exponent >= 0 ? "+" : "-";
    return mantissa + "e" + sign + String(Math.abs(exponent));
  }
  return n.toString();
};
var __json_number_value = __json_number_value || function(v) {
  return typeof v === "string" && v.endsWith("__bigint") ? Number(v.slice(0, -8)) : v;
};
var __json_int_decode = __json_int_decode || function(v, typeName, ctxType, raw) {
  var type = typeof v === "string" && v.endsWith("__bigint") ? "number" : __json_type(v);
  var fail = function() {
    return __json_err("cannot unmarshal " + (type === "number" ? "number " + __json_lit(v, raw) : type) + " into " + __json_ctx(ctxType));
  };
  if (type !== "number") return fail();
  // Go parses integers with strconv.ParseInt: "1.0" and "1e2" are not integers.
  if (raw !== undefined && raw !== null && !/^-?(0|[1-9][0-9]*)$/.test(String(raw).trim())) return fail();
  var integer;
  var signed = typeName === "int" || typeName.startsWith("int");
  if (typeName === "int64" || typeName === "uint64") {
    if (typeof v === "string" && v.endsWith("__bigint")) {
      try { integer = BigInt(v.slice(0, -8)); } catch (_) {}
    } else if (typeof v === "number" && Number.isSafeInteger(v)) {
      integer = BigInt(v);
    }
    if (integer !== undefined) {
      var min64 = typeName === "int64" ? -(1n << 63n) : 0n;
      var max64 = typeName === "int64" ? (1n << 63n) - 1n : (1n << 64n) - 1n;
      if (integer >= min64 && integer <= max64) return typeof v === "number" ? v : integer;
    }
    return fail();
  }
  if (typeof v === "number" && Number.isSafeInteger(v)) {
    if (typeName === "int") return v;
    var bits = typeName === "uint" ? 53 : Number(typeName.replace(/^(u?int|byte|rune)/, ""));
    if (!bits) bits = typeName === "byte" ? 8 : typeName === "rune" ? 32 : 53;
    var min = signed ? -(2 ** (bits - 1)) : 0;
    var max = signed ? (2 ** (bits - 1)) - 1 : (2 ** bits) - 1;
    if (v >= min && v <= max) return v;
  }
  return fail();
};
var __json_b64 = __json_b64 || function(u8) {
  if (u8 === null || u8 === undefined) return "null";
  if (typeof __base64_std !== "undefined") return '"' + __base64_std.EncodeToString(u8) + '"';
  var bstr = "";
  for (var i = 0; i < u8.length; i++) bstr += String.fromCharCode(u8[i]);
  return '"' + (typeof btoa !== "undefined" ? btoa(bstr) : Buffer.from(u8).toString("base64")) + '"';
};
var __json_b64_dec = __json_b64_dec || function(str) {
  if (typeof __base64_std !== "undefined") {
    var res = __base64_std.DecodeString(str);
    if (!res[1]) return res[0];
  }
  var bin = typeof atob !== "undefined" ? atob(str) : Buffer.from(str, "base64").toString("binary");
  var u8 = new Uint8Array(bin.length);
  for (var i = 0; i < bin.length; i++) u8[i] = bin.charCodeAt(i);
  return u8;
};
var __json_is_zero = __json_is_zero || function(val, isStruct, isMap) {
  if (isStruct) return false;
  if (isMap) return __json_nilmap(val) || (val instanceof Map ? val.size === 0 : Object.keys(val).length === 0);
  if (val === null || val === undefined || val === false || val === 0 || val === "") return true;
  if (typeof val === "bigint") return val === 0n;
  if (Array.isArray(val) || (ArrayBuffer.isView(val) && !val.__raw)) return val.length === 0;
  if (val instanceof Map) return val.size === 0;
  if (val && val.__map) return Object.keys(val).filter(function(k) { return !k.startsWith("__"); }).length === 0;
  return false;
};
var __json_preserve_int64 = __json_preserve_int64 || function(str) {
  return str.replace(/"(?:\\.|[^"\\])*"|(?<=[,:\[{\s]|^)(-?\d{16,})(?=[,\]}\s]|$)/g, function(m, num) {
    if (num) {
      try {
        var b = BigInt(num);
        if (b > 9007199254740991n || b < -9007199254740991n) return '"' + num + '__bigint"';
      } catch (e) {}
    }
    return m;
  });
};
// Go maps: a nil map is the __nm()/__nilmap marker, an empty one a plain object.
var __json_nilmap = __json_nilmap || function(m) {
  return m === null || m === undefined || m.__nilm === true || m.__nm === true;
};
// Decoded maps carry a hidden marker so fmt and json treat them as maps.
var __json_newmap = __json_newmap || function() {
  return Object.defineProperty(Object.create(null), "__map", { value: true, configurable: true });
};
// json.RawMessage is compacted (and validated) like any Marshaler output; nil is null.
var __json_enc_raw = __json_enc_raw || function(v) {
  if (v === null || v === undefined) return "null";
  return __json_marshaler_out([v, null], "json.RawMessage");
};
var __json_enc_any = __json_enc_any || function(v) {
  if (v === null || v === undefined) return "null";
  var t = typeof v;
  if (t === "boolean") return v ? "true" : "false";
  if (t === "number") {
    if (!isFinite(v)) throw __json_unsupported_value(String(v));
    return Object.is(v, -0) ? "-0" : String(v);
  }
  if (t === "bigint") return v.toString();
  if (t === "string") return __json_esc(v);
  if (Object.prototype.toString.call(v) === "[object Uint8Array]") {
    if (v.__raw) return __json_enc_raw(v);
    return __json_b64(v);
  }
  if (typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(v)) {
    var titems = [];
    for (var ti = 0; ti < v.length; ti++) titems.push(v instanceof Float32Array ? __json_float32(v[ti]) : (typeof v[ti] === "bigint" ? v[ti].toString() : String(v[ti])));
    return "[" + titems.join(",") + "]";
  }
  if (Array.isArray(v)) {
    var items = [];
    for (var i = 0; i < v.length; i++) items.push(__json_enc_any(v[i]));
    return "[" + items.join(",") + "]";
  }
  if (v instanceof Map) {
    var mkeys = Array.from(v.keys()).map(String).sort();
    var mentries = [];
    for (var mi = 0; mi < mkeys.length; mi++) {
      mentries.push(__json_esc(mkeys[mi]) + ":" + __json_enc_any(v.get(mkeys[mi])));
    }
    return "{" + mentries.join(",") + "}";
  }
  if (typeof v.__json_enc === "function") return v.__json_enc();
  if (typeof v.MarshalJSON === "function" && !(v.__v === true && v.MarshalJSON.__ptrRecv)) {
    return __json_marshaler_out(v.MarshalJSON(), v.constructor && v.constructor.name ? v.constructor.name : "value");
  }
  // Boxed named values (from an interface) encode as their value; *T boxes as the pointee.
  if (typeof v.__gfUnbox === "function") {
    var inner = v.__gfUnbox();
    if (Object.prototype.hasOwnProperty.call(v, "_p")) inner = inner == null ? null : inner.value;
    return __json_enc_any(inner);
  }
  if (typeof v === "object") {
    if (__json_nilmap(v)) return "null";
    var okeys = Object.keys(v).filter(function(k) { return !k.startsWith("__") || k === "__proto__"; });
    if (!v.__map && v.constructor && v.constructor !== Object && v.constructor.name !== "Object") {
      okeys = okeys.filter(function(k) { return !(k.length > 0 && k[0] >= "a" && k[0] <= "z"); });
    }
    okeys.sort();
    var oentries = [];
    for (var oi = 0; oi < okeys.length; oi++) {
      oentries.push(__json_esc(okeys[oi]) + ":" + __json_enc_any(v[okeys[oi]]));
    }
    return "{" + oentries.join(",") + "}";
  }
  return "null";
};
var __json_dec_any = __json_dec_any || function(parsed) {
  if (parsed === null) return null;
  var useNum = typeof OptUseNumber$$internal$jsonrt !== "undefined" && OptUseNumber$$internal$jsonrt;
  if (typeof parsed === "string") {
    if (parsed.endsWith("__bigint")) {
      var rawBig = parsed.slice(0, -8);
      if (useNum) return typeof Number$$internal$jsonrt === "function" ? new Number$$internal$jsonrt(rawBig) : rawBig;
      return Number(rawBig);
    }
    return parsed;
  }
  if (typeof parsed === "number") {
    if (useNum) {
      var rawNum = String(parsed);
      return typeof Number$$internal$jsonrt === "function" ? new Number$$internal$jsonrt(rawNum) : rawNum;
    }
    return parsed;
  }
  if (typeof parsed === "boolean") return parsed;
  if (Array.isArray(parsed)) {
    var outSlice = [];
    for (var i = 0; i < parsed.length; i++) outSlice.push(__json_dec_any(parsed[i]));
    return outSlice;
  }
  if (typeof parsed === "object") {
    var outMap = __json_newmap();
    for (var k in parsed) {
      if (Object.prototype.hasOwnProperty.call(parsed, k)) {
        outMap[k] = __json_dec_any(parsed[k]);
      }
    }
    return outMap;
  }
  return parsed;
};
var __json_dec_any_target = __json_dec_any_target || function(parsed, target, box) {
  var out = __json_dec_any(parsed);
  if (box) box.value = out;
  else if (target && typeof target === "object") {
    for (const k of Object.keys(out)) Object.defineProperty(target, k, { value: out[k], writable: true, enumerable: true, configurable: true });
  }
  return null;
};
var __json_enc_slice = __json_enc_slice || function(slice, elemEnc) {
  if (slice === null || slice === undefined) return "null";
  var items = [];
  for (var i = 0; i < slice.length; i++) items.push(elemEnc(slice[i]));
  return "[" + items.join(",") + "]";
};
var __json_enc_map = __json_enc_map || function(m, valEnc) {
  if (__json_nilmap(m)) return "null";
  if (m instanceof Map) {
    var mkeys = Array.from(m.keys()).map(String).sort();
    var mentries = [];
    for (var i = 0; i < mkeys.length; i++) {
      mentries.push(__json_esc(mkeys[i]) + ":" + valEnc(m.get(mkeys[i])));
    }
    return "{" + mentries.join(",") + "}";
  }
  var keys = Object.keys(m).filter(function(k) { return !k.startsWith("__") || k === "__proto__"; }).sort();
  var entries = [];
  for (var j = 0; j < keys.length; j++) {
    entries.push(__json_esc(keys[j]) + ":" + valEnc(m[keys[j]]));
  }
  return "{" + entries.join(",") + "}";
};
var __json_marshal = __json_marshal || function(enc, val) {
  try {
    var str = enc(val);
    return [new TextEncoder().encode(str), null];
  } catch (e) {
    if (e && typeof e.Error === "function") return [new Uint8Array(0), e];
    return [new Uint8Array(0), typeof __error === "function" ? __error(e.message || String(e)) : e];
  }
};
var __json_indent = __json_indent || function(jsonStr, prefix, indent) {
  var out = "";
  var depth = 0;
  var inString = false;
  var escaped = false;
  for (var i = 0; i < jsonStr.length; i++) {
    var c = jsonStr[i];
    if (inString) {
      out += c;
      if (escaped) escaped = false;
      else if (c === "\\") escaped = true;
      else if (c === '"') inString = false;
      continue;
    }
    if (c === '"') { inString = true; out += c; continue; }
    if (c === "{" || c === "[") {
      out += c;
      depth++;
      var next = jsonStr[i + 1];
      if ((c === "{" && next === "}") || (c === "[" && next === "]")) {
        out += next;
        i++;
        depth--;
        continue;
      }
      out += "\n" + prefix + indent.repeat(depth);
    } else if (c === "}" || c === "]") {
      depth--;
      out += "\n" + prefix + indent.repeat(depth) + c;
    } else if (c === ",") {
      out += ",\n" + prefix + indent.repeat(depth);
    } else if (c === ":") {
      out += ": ";
    } else if (c !== " " && c !== "\t" && c !== "\n" && c !== "\r") {
      out += c;
    }
  }
  return out;
};
var __json_marshal_indent = __json_marshal_indent || function(enc, val, prefix, indent) {
  var res = __json_marshal(enc, val);
  if (res[1]) return res;
  var rawStr = new TextDecoder().decode(res[0]);
  var formatted = __json_indent(rawStr, prefix, indent);
  return [new TextEncoder().encode(formatted), null];
};
var __json_valid = __json_valid || function(data) {
  try {
    var s = typeof data === "string" ? data : new TextDecoder().decode(((typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(data)) || data instanceof Uint8Array) ? data : new Uint8Array(data));
    JSON.parse(s);
    return true;
  } catch (e) {
    return false;
  }
};
// The static type of the target decides the argument errors, as in Go:
// targetKind is "ptr" (a pointer), "val" (neither pointer nor interface) or
// empty (an interface, judged by the dynamic value).
var __json_invalid_target = __json_invalid_target || function(name, isPtr) {
  if (typeof InvalidUnmarshalError$$internal$jsonrt === "function") {
    var e = new InvalidUnmarshalError$$internal$jsonrt(name, isPtr);
    if (e.__p !== true && Object.isExtensible(e)) Object.defineProperty(e, "__p", { value: true, configurable: true, writable: true });
    e.__struct = "InvalidUnmarshalError$$internal$jsonrt";
    return e;
  }
  var msg = name === "" ? "json: Unmarshal(nil)" : (isPtr ? "json: Unmarshal(nil " + name + ")" : "json: Unmarshal(non-pointer " + name + ")");
  return typeof __error === "function" ? __error(msg) : new Error(msg);
};
var __json_unmarshal = __json_unmarshal || function(dec, data, target, targetTypeName, targetKind) {
  __json_structs.length = 0;
  __json_path.length = 0;
  __json_current_offset = 0;
  var u8data = ((typeof ArrayBuffer !== "undefined" && ArrayBuffer.isView(data)) || data instanceof Uint8Array) ? data : new Uint8Array(data);
  if (typeof CheckValid$$internal$jsonrt === "function") {
    var syntaxErr = CheckValid$$internal$jsonrt(u8data);
    if (syntaxErr) {
      if (typeof syntaxErr === "object" && syntaxErr !== null) {
        if (syntaxErr.__p !== true && Object.isExtensible(syntaxErr)) {
          Object.defineProperty(syntaxErr, "__p", { value: true, configurable: true, writable: true });
        }
        syntaxErr.__struct = "SyntaxError$$internal$jsonrt";
      }
      return syntaxErr;
    }
  }
  if (targetKind === "val") return __json_invalid_target(targetTypeName, false);
  if (target === null || target === undefined) {
    return targetKind === "ptr" ? __json_invalid_target(targetTypeName, true) : __json_invalid_target("", false);
  }
  if (typeof target !== "object" || target.__v === true) {
    var tname = targetTypeName || (target && target.constructor && target.constructor.name && target.constructor.name !== "Object" ? target.constructor.name : typeof target);
    return __json_invalid_target(tname, false);
  }
  var str;
  try {
    str = typeof data === "string" ? data : new TextDecoder().decode(u8data);
  } catch (e) {
    return typeof __error === "function" ? __error("invalid UTF-8 data") : e;
  }
  var safeStr = __json_preserve_int64(str);
  var parsed;
  try {
    parsed = JSON.parse(safeStr);
  } catch (e) {
    return typeof __error === "function" ? __error(e.message) : e;
  }
  var rootRaw = __json_parse_raw_node(str);
  __json_bind_raw(parsed, rootRaw);
  __json_current_offset = str.length;
  var isBox = target && typeof target === "object" && (Object.prototype.hasOwnProperty.call(target, "value") || typeof target.__gfUnbox === "function");
  var dest = isBox ? target.value : target;
  var err = dec(parsed, dest, isBox ? target : null, data, rootRaw.raw);
  if (err) return err.__userErr || err;
  return null;
};
var __json_encoder_encode = __json_encoder_encode || function(enc, codec, v) {
  var e = enc?.value ?? enc;
  if (e.err != null) return e.err;
  OptEscapeHTML$$internal$jsonrt = e.escapeHTML;
  var jsonStr;
  try {
    jsonStr = codec(v);
  } catch (err) {
    if (err && typeof err.Error === "function") return err;
    return typeof __error === "function" ? __error(err.message || String(err)) : err;
  } finally {
    OptEscapeHTML$$internal$jsonrt = true;
  }
  if (e.indent !== "" || e.prefix !== "") {
    var indented = __json_indent(jsonStr, e.prefix, e.indent);
    if (indented != null) jsonStr = indented;
  }
  var bytes = new TextEncoder().encode(jsonStr + "\n");
  var res = e.w.Write(bytes);
  var err = Array.isArray(res) ? res[1] : null;
  if (err != null) {
    e.err = err;
    return err;
  }
  return null;
};
var __json_decoder_decode = __json_decoder_decode || function(dec, decFn, target, targetTypeName, targetKind) {
  var d = dec?.value ?? dec;
  var res = ScanNext$$internal$jsonrt(d.r);
  var data = res[0], skipped = res[1], err = res[2];
  d.offset += skipped;
  if (err != null) return err;
  d.offset += data.length;
  OptUseNumber$$internal$jsonrt = d.useNumber;
  OptDisallowUnknownFields$$internal$jsonrt = d.disallowUnknownFields;
  var uerr;
  try {
    uerr = __json_unmarshal(decFn, data, target, targetTypeName, targetKind);
  } finally {
    OptUseNumber$$internal$jsonrt = false;
    OptDisallowUnknownFields$$internal$jsonrt = false;
  }
  return uerr;
};

class iconDef {
  constructor(ViewBox$ = "", Path$ = "") {
    if (arguments.length === 1 && typeof ViewBox$ === "object" && ViewBox$ !== null && ViewBox$.constructor === Object) ({ ViewBox: ViewBox$ = "", Path: Path$ = "" } = ViewBox$);
    this.ViewBox = ViewBox$;
    this.Path = Path$;
  }

  __clone() { return new iconDef(this.ViewBox, this.Path); }
  toString() { return __sk(this); }
}
Object.defineProperty(iconDef.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

// type Route = int
class Route {
  constructor(_items) { this._items = _items; }
  __gfUnbox() { return this._items; }
}
class Route$Ptr {
  constructor(_p) { this._p = _p; }
  __gfUnbox() { return this._p; }
  get value() { return this._p.value; }
  set value(v) { this._p.value = v; }
}

class RouteMatch {
  constructor(Kind$ = 0, Param$ = "", Page$ = 0) {
    if (arguments.length === 1 && typeof Kind$ === "object" && Kind$ !== null && Kind$.constructor === Object) ({ Kind: Kind$ = 0, Param: Param$ = "", Page: Page$ = 0 } = Kind$);
    this.Kind = Kind$;
    this.Param = Param$;
    this.Page = Page$;
  }

  __clone() { return new RouteMatch(this.Kind, this.Param, this.Page); }
  toString() { return __sk(this); }
}
Object.defineProperty(RouteMatch.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ProjectLink {
  constructor(Title$ = "", Icon$ = "", Href$ = "") {
    if (arguments.length === 1 && typeof Title$ === "object" && Title$ !== null && Title$.constructor === Object) ({ Title: Title$ = "", Icon: Icon$ = "", Href: Href$ = "" } = Title$);
    this.Title = Title$;
    this.Icon = Icon$;
    this.Href = Href$;
  }

  __clone() { return new ProjectLink(this.Title, this.Icon, this.Href); }
  toString() { return __sk(this); }
}
Object.defineProperty(ProjectLink.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class Project {
  constructor(ID$ = "", Title$ = "", Description$ = "", Tags$ = null, Order$ = 0, GithubRepo$ = "", GithubBranch$ = "", DemoUrl$ = "", DemoLabel$ = "", DemoInstructions$ = "", DemoHeight$ = "", DemoFullscreen$ = false, YoutubeVideos$ = null, Links$ = null, Href$ = "") {
    if (arguments.length === 1 && typeof ID$ === "object" && ID$ !== null && ID$.constructor === Object) ({ ID: ID$ = "", Title: Title$ = "", Description: Description$ = "", Tags: Tags$ = null, Order: Order$ = 0, GithubRepo: GithubRepo$ = "", GithubBranch: GithubBranch$ = "", DemoUrl: DemoUrl$ = "", DemoLabel: DemoLabel$ = "", DemoInstructions: DemoInstructions$ = "", DemoHeight: DemoHeight$ = "", DemoFullscreen: DemoFullscreen$ = false, YoutubeVideos: YoutubeVideos$ = null, Links: Links$ = null, Href: Href$ = "" } = ID$);
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
  toString() { return __sk(this); }
}
Object.defineProperty(Project.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class BlogPost {
  constructor(Slug$ = "", Title$ = "", Date$ = "", Excerpt$ = "", Tags$ = null, Filename$ = "", Href$ = "") {
    if (arguments.length === 1 && typeof Slug$ === "object" && Slug$ !== null && Slug$.constructor === Object) ({ Slug: Slug$ = "", Title: Title$ = "", Date: Date$ = "", Excerpt: Excerpt$ = "", Tags: Tags$ = null, Filename: Filename$ = "", Href: Href$ = "" } = Slug$);
    this.Slug = Slug$;
    this.Title = Title$;
    this.Date = Date$;
    this.Excerpt = Excerpt$;
    this.Tags = Tags$;
    this.Filename = Filename$;
    this.Href = Href$;
  }

  __clone() { return new BlogPost(this.Slug, this.Title, this.Date, this.Excerpt, this.Tags, this.Filename, this.Href); }
  toString() { return __sk(this); }
}
Object.defineProperty(BlogPost.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class NavPage {
  constructor(ID$ = "", Title$ = "", Order$ = 0, ShowInNav$ = false, Href$ = "") {
    if (arguments.length === 1 && typeof ID$ === "object" && ID$ !== null && ID$.constructor === Object) ({ ID: ID$ = "", Title: Title$ = "", Order: Order$ = 0, ShowInNav: ShowInNav$ = false, Href: Href$ = "" } = ID$);
    this.ID = ID$;
    this.Title = Title$;
    this.Order = Order$;
    this.ShowInNav = ShowInNav$;
    this.Href = Href$;
  }

  __clone() { return new NavPage(this.ID, this.Title, this.Order, this.ShowInNav, this.Href); }
  toString() { return __sk(this); }
}
Object.defineProperty(NavPage.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

// type LoadStatus = int
class LoadStatus {
  constructor(_items) { this._items = _items; }
  __gfUnbox() { return this._items; }
}
class LoadStatus$Ptr {
  constructor(_p) { this._p = _p; }
  __gfUnbox() { return this._p; }
  get value() { return this._p.value; }
  set value(v) { this._p.value = v; }
}

class TOCItem {
  constructor(ID$ = "", Text$ = "", Level$ = 0) {
    if (arguments.length === 1 && typeof ID$ === "object" && ID$ !== null && ID$.constructor === Object) ({ ID: ID$ = "", Text: Text$ = "", Level: Level$ = 0 } = ID$);
    this.ID = ID$;
    this.Text = Text$;
    this.Level = Level$;
  }

  __clone() { return new TOCItem(this.ID, this.Text, this.Level); }
  toString() { return __sk(this); }
}
Object.defineProperty(TOCItem.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class cachedContent {
  constructor(HTML$ = "", TOC$ = null) {
    if (arguments.length === 1 && typeof HTML$ === "object" && HTML$ !== null && HTML$.constructor === Object) ({ HTML: HTML$ = "", TOC: TOC$ = null } = HTML$);
    this.HTML = HTML$;
    this.TOC = TOC$;
  }

  __clone() { return new cachedContent(this.HTML, this.TOC); }
  toString() { return __sk(this); }
}
Object.defineProperty(cachedContent.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ViewState {
  constructor(Post$ = new BlogPost(), Proj$ = new Project(), Page$ = new NavPage(), HTML$ = "", Status$ = 0, HasPrev$ = false, PrevPost$ = new BlogPost(), HasNext$ = false, NextPost$ = new BlogPost(), TOC$ = null) {
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
  toString() { return __sk(this); }
}
Object.defineProperty(ViewState.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class SocialLink {
  constructor(Icon$ = "", Href$ = "", Target$ = "", Rel$ = "") {
    if (arguments.length === 1 && typeof Icon$ === "object" && Icon$ !== null && Icon$.constructor === Object) ({ Icon: Icon$ = "", Href: Href$ = "", Target: Target$ = "", Rel: Rel$ = "" } = Icon$);
    this.Icon = Icon$;
    this.Href = Href$;
    this.Target = Target$;
    this.Rel = Rel$;
  }

  __clone() { return new SocialLink(this.Icon, this.Href, this.Target, this.Rel); }
  toString() { return __sk(this); }
}
Object.defineProperty(SocialLink.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ThemeNestedTheme {
  constructor(Theme$ = "") {
    if (arguments.length === 1 && typeof Theme$ === "object" && Theme$ !== null && Theme$.constructor === Object) ({ Theme: Theme$ = "" } = Theme$);
    this.Theme = Theme$;
  }

  __clone() { return new ThemeNestedTheme(this.Theme); }
  toString() { return __sk(this); }
}
Object.defineProperty(ThemeNestedTheme.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class RawThemeColors {
  constructor(Primary$ = "", Secondary$ = "", Background$ = "", Text$ = "", TextLight$ = "", Border$ = "", Hover$ = "", Code$ = new ThemeNestedTheme(), Comments$ = new ThemeNestedTheme()) {
    if (arguments.length === 1 && typeof Primary$ === "object" && Primary$ !== null && Primary$.constructor === Object) ({ Primary: Primary$ = "", Secondary: Secondary$ = "", Background: Background$ = "", Text: Text$ = "", TextLight: TextLight$ = "", Border: Border$ = "", Hover: Hover$ = "", Code: Code$ = new ThemeNestedTheme(), Comments: Comments$ = new ThemeNestedTheme() } = Primary$);
    this.Primary = Primary$;
    this.Secondary = Secondary$;
    this.Background = Background$;
    this.Text = Text$;
    this.TextLight = TextLight$;
    this.Border = Border$;
    this.Hover = Hover$;
    this.Code = Code$;
    this.Comments = Comments$;
  }

  __clone() { return new RawThemeColors(this.Primary, this.Secondary, this.Background, this.Text, this.TextLight, this.Border, this.Hover, this.Code.__clone(), this.Comments.__clone()); }
  toString() { return __sk(this); }
}
Object.defineProperty(RawThemeColors.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ThemeColors {
  constructor(Primary$ = "", Secondary$ = "", Background$ = "", Text$ = "", TextLight$ = "", Border$ = "", Hover$ = "", CodeTheme$ = "", CommentsTheme$ = "") {
    if (arguments.length === 1 && typeof Primary$ === "object" && Primary$ !== null && Primary$.constructor === Object) ({ Primary: Primary$ = "", Secondary: Secondary$ = "", Background: Background$ = "", Text: Text$ = "", TextLight: TextLight$ = "", Border: Border$ = "", Hover: Hover$ = "", CodeTheme: CodeTheme$ = "", CommentsTheme: CommentsTheme$ = "" } = Primary$);
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
  toString() { return __sk(this); }
}
Object.defineProperty(ThemeColors.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class CommentsConfig {
  constructor(BlogEnabled$ = false, ProjectsEnabled$ = false, Attrs$ = null) {
    if (arguments.length === 1 && typeof BlogEnabled$ === "object" && BlogEnabled$ !== null && BlogEnabled$.constructor === Object) ({ BlogEnabled: BlogEnabled$ = false, ProjectsEnabled: ProjectsEnabled$ = false, Attrs: Attrs$ = null } = BlogEnabled$);
    this.BlogEnabled = BlogEnabled$;
    this.ProjectsEnabled = ProjectsEnabled$;
    this.Attrs = Attrs$;
  }

  __clone() { return new CommentsConfig(this.BlogEnabled, this.ProjectsEnabled, this.Attrs); }
  toString() { return __sk(this); }
}
Object.defineProperty(CommentsConfig.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class EmailJSConfig {
  constructor(Enabled$ = false, ServiceId$ = "", TemplateId$ = "", PublicKey$ = "") {
    if (arguments.length === 1 && typeof Enabled$ === "object" && Enabled$ !== null && Enabled$.constructor === Object) ({ Enabled: Enabled$ = false, ServiceId: ServiceId$ = "", TemplateId: TemplateId$ = "", PublicKey: PublicKey$ = "" } = Enabled$);
    this.Enabled = Enabled$;
    this.ServiceId = ServiceId$;
    this.TemplateId = TemplateId$;
    this.PublicKey = PublicKey$;
  }

  __clone() { return new EmailJSConfig(this.Enabled, this.ServiceId, this.TemplateId, this.PublicKey); }
  toString() { return __sk(this); }
}
Object.defineProperty(EmailJSConfig.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class SearchConfig {
  constructor(Enabled$ = false, MinChars$ = 0, Placeholder$ = "") {
    if (arguments.length === 1 && typeof Enabled$ === "object" && Enabled$ !== null && Enabled$.constructor === Object) ({ Enabled: Enabled$ = false, MinChars: MinChars$ = 0, Placeholder: Placeholder$ = "" } = Enabled$);
    this.Enabled = Enabled$;
    this.MinChars = MinChars$;
    this.Placeholder = Placeholder$;
  }

  __clone() { return new SearchConfig(this.Enabled, this.MinChars, this.Placeholder); }
  toString() { return __sk(this); }
}
Object.defineProperty(SearchConfig.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ContentSiteTheme {
  constructor(Default$ = "", Dark$ = new RawThemeColors(), Light$ = new RawThemeColors()) {
    if (arguments.length === 1 && typeof Default$ === "object" && Default$ !== null && Default$.constructor === Object) ({ Default: Default$ = "", Dark: Dark$ = new RawThemeColors(), Light: Light$ = new RawThemeColors() } = Default$);
    this.Default = Default$;
    this.Dark = Dark$;
    this.Light = Light$;
  }

  __clone() { return new ContentSiteTheme(this.Default, this.Dark.__clone(), this.Light.__clone()); }
  toString() { return __sk(this); }
}
Object.defineProperty(ContentSiteTheme.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ContentSite {
  constructor(Title$ = "", Url$ = "", Description$ = "", Author$ = "", GithubUsername$ = "", Theme$ = new ContentSiteTheme(), Search$ = new SearchConfig(), EmailJS$ = new EmailJSConfig(), Comments$ = __nm(), Social$ = null) {
    if (arguments.length === 1 && typeof Title$ === "object" && Title$ !== null && Title$.constructor === Object) ({ Title: Title$ = "", Url: Url$ = "", Description: Description$ = "", Author: Author$ = "", GithubUsername: GithubUsername$ = "", Theme: Theme$ = new ContentSiteTheme(), Search: Search$ = new SearchConfig(), EmailJS: EmailJS$ = new EmailJSConfig(), Comments: Comments$ = __nm(), Social: Social$ = null } = Title$);
    this.Title = Title$;
    this.Url = Url$;
    this.Description = Description$;
    this.Author = Author$;
    this.GithubUsername = GithubUsername$;
    this.Theme = Theme$;
    this.Search = Search$;
    this.EmailJS = EmailJS$;
    this.Comments = Comments$;
    this.Social = Social$;
  }

  __clone() { return new ContentSite(this.Title, this.Url, this.Description, this.Author, this.GithubUsername, this.Theme.__clone(), this.Search.__clone(), this.EmailJS.__clone(), this.Comments, this.Social); }
  toString() { return __sk(this); }
}
Object.defineProperty(ContentSite.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });
Object.defineProperty(ContentSite.prototype, "__ff", { value: () => ({ Comments: { m: 1 } }) });

class ContentBlog {
  constructor(Title$ = "", ShowInNav$ = false, PostsPerPage$ = 0, DateFormat$ = "", Posts$ = null) {
    if (arguments.length === 1 && typeof Title$ === "object" && Title$ !== null && Title$.constructor === Object) ({ Title: Title$ = "", ShowInNav: ShowInNav$ = false, PostsPerPage: PostsPerPage$ = 0, DateFormat: DateFormat$ = "", Posts: Posts$ = null } = Title$);
    this.Title = Title$;
    this.ShowInNav = ShowInNav$;
    this.PostsPerPage = PostsPerPage$;
    this.DateFormat = DateFormat$;
    this.Posts = Posts$;
  }

  __clone() { return new ContentBlog(this.Title, this.ShowInNav, this.PostsPerPage, this.DateFormat, this.Posts); }
  toString() { return __sk(this); }
}
Object.defineProperty(ContentBlog.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ContentPayload {
  constructor(Site$ = new ContentSite(), Blog$ = new ContentBlog(), Projects$ = null, Pages$ = __nm(), Translations$ = __nm()) {
    this.Site = Site$;
    this.Blog = Blog$;
    this.Projects = Projects$;
    this.Pages = Pages$;
    this.Translations = Translations$;
  }

  __clone() { return new ContentPayload(this.Site.__clone(), this.Blog.__clone(), this.Projects, this.Pages, this.Translations); }
  toString() { return __sk(this); }
}
Object.defineProperty(ContentPayload.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });
Object.defineProperty(ContentPayload.prototype, "__ff", { value: () => ({ Pages: { m: 1 }, Translations: { m: 1, v: { m: 1 } } }) });

class SiteConfig {
  constructor(Title$ = "", Url$ = "", Description$ = "", Author$ = "", GithubUsername$ = "", DarkTheme$ = new ThemeColors(), LightTheme$ = new ThemeColors(), Comments$ = new CommentsConfig(), EmailJS$ = new EmailJSConfig(), Search$ = new SearchConfig(), Social$ = null, PostsPerPage$ = 0) {
    if (arguments.length === 1 && typeof Title$ === "object" && Title$ !== null && Title$.constructor === Object) ({ Title: Title$ = "", Url: Url$ = "", Description: Description$ = "", Author: Author$ = "", GithubUsername: GithubUsername$ = "", DarkTheme: DarkTheme$ = new ThemeColors(), LightTheme: LightTheme$ = new ThemeColors(), Comments: Comments$ = new CommentsConfig(), EmailJS: EmailJS$ = new EmailJSConfig(), Search: Search$ = new SearchConfig(), Social: Social$ = null, PostsPerPage: PostsPerPage$ = 0 } = Title$);
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
  toString() { return __sk(this); }
}
Object.defineProperty(SiteConfig.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class SearchResultItem {
  constructor(ID$ = "", Title$ = "", Description$ = "", Tags$ = null, ItemType$ = "", Url$ = "") {
    if (arguments.length === 1 && typeof ID$ === "object" && ID$ !== null && ID$.constructor === Object) ({ ID: ID$ = "", Title: Title$ = "", Description: Description$ = "", Tags: Tags$ = null, ItemType: ItemType$ = "", Url: Url$ = "" } = ID$);
    this.ID = ID$;
    this.Title = Title$;
    this.Description = Description$;
    this.Tags = Tags$;
    this.ItemType = ItemType$;
    this.Url = Url$;
  }

  __clone() { return new SearchResultItem(this.ID, this.Title, this.Description, this.Tags, this.ItemType, this.Url); }
  toString() { return __sk(this); }
}
Object.defineProperty(SearchResultItem.prototype, "value", { get() { return this; }, set(v) { Object.assign(this, v); }, configurable: true });

class ContactState {
  constructor(Name$ = "", Email$ = "", Message$ = "", StatusText$ = "", StatusType$ = "", ButtonState$ = "", ButtonDisabled$ = false, ErrName$ = false, ErrEmail$ = false, ErrMessage$ = false) {
    if (arguments.length === 1 && typeof Name$ === "object" && Name$ !== null && Name$.constructor === Object) ({ Name: Name$ = "", Email: Email$ = "", Message: Message$ = "", StatusText: StatusText$ = "", StatusType: StatusType$ = "", ButtonState: ButtonState$ = "", ButtonDisabled: ButtonDisabled$ = false, ErrName: ErrName$ = false, ErrEmail: ErrEmail$ = false, ErrMessage: ErrMessage$ = false } = Name$);
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
  toString() { return __sk(this); }
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

let route = new RouteMatch(0, "", 1);

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
      ((b?.value ?? b)._buf += String.fromCodePoint(45), null);
      ((b?.value ?? b)._buf += String.fromCodePoint(c + (32)), null);
    } else {
      ((b?.value ?? b)._buf += String.fromCodePoint(c), null);
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
  iframe.contentWindow.postMessage({ "giscus": __ifm({ "setConfig": __ifm({ "theme": giscusTheme() }) }) }, "https://giscus.app");
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
    await emailjs.send(site.EmailJS.ServiceId, site.EmailJS.TemplateId, __ifm(params), site.EmailJS.PublicKey);
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
      if (tag != null && !__ifeq(tag, "")) {
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
          if (href != null && !__ifeq(href, "")) {
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
            if (href != null && !__ifeq(href, "")) {
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
      if (targetAttr != null && !__ifeq(targetAttr, "") && !__ifeq(targetAttr, "_self")) {
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
    if (__ifeq(target.id, "search-page")) {
      closeSearch();
      return;
    }
    if (__ifeq(target.id, "contact-modal")) {
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
  ((sel,n,r)=>{const e=document.querySelector(sel);e.innerHTML="";n.Mount(e,r)})("#app",AppShell(),__ifm(appRefs));
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
      ((b?.value ?? b)._buf += String.fromCodePoint(c), null);
    } else if (c === 32 || c === 45 || c === 95) {
      if (new TextEncoder().encode((b?.value ?? b)._buf).length > 0 && (b?.value ?? b)._buf.charCodeAt(new TextEncoder().encode((b?.value ?? b)._buf).length - 1) !== 45) {
        ((b?.value ?? b)._buf += String.fromCodePoint(45), null);
      }
    }
  }
  let res = ((str, cut) => { const cs = new Set(cut); let i = 0, j = str.length; while (i < j && cs.has(str[i])) i++; while (j > i && cs.has(str[j - 1])) j--; return str.slice(i, j); })((b?.value ?? b)._buf, "-");
  if (res === "") {
    res = "section";
  }
  return res;
}

function cleanHeadingText(text) {
  text = text.trim();
  text = ((str, cut) => { const cs = new Set(cut); let j = str.length; while (j > 0 && cs.has(str[j - 1])) j--; return str.slice(0, j); })(text, "#");
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
        ((b?.value ?? b)._buf += String.fromCodePoint(c), null);
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
  for (let __i0 = 0, __arr0 = lines, __v0 = __arr0?.[__sv], __b0 = __v0 === undefined ? __arr0 : __v0.b, __o0 = __v0 === undefined ? 0 : __v0.o, __len0 = __v0 !== undefined ? __v0.n : __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let line = __b0[__o0 + __i0];
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
      ((b?.value ?? b)._buf += String.fromCodePoint(c), null);
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
  for (let __i0 = 0, __arr0 = toc, __v0 = __arr0?.[__sv], __b0 = __v0 === undefined ? __arr0 : __v0.b, __o0 = __v0 === undefined ? 0 : __v0.o, __len0 = __v0 !== undefined ? __v0.n : __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let item = __b0[__o0 + __i0];
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
          pending[key] = __slice(ids, 1, undefined);
          ((__s) => { (b?.value ?? b)._buf += __s; return [new TextEncoder().encode(__s).length, null]; })(openTag.slice(0, 3) + " id=\"" + ids[0] + "\"" + openTag.slice(3));
        } else {
          ((__s) => { (b?.value ?? b)._buf += __s; return [new TextEncoder().encode(__s).length, null]; })(openTag);
        }
        idx += closeBracket + 1;
        continue;
      }
    }
    ((b?.value ?? b)._buf += String.fromCodePoint(html.charCodeAt(idx)), null);
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
    mermaid.initialize(__ifm({ "startOnLoad": false, "theme": mermaidTheme(currentTheme), "securityLevel": "strict" }));
    await mermaid.run(__ifm({ "nodes": nodes }));
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
  return __slice(allPosts, start, end);
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
  let nums = __mkslice(0, new Array(n).fill(0));
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
  return __timeYear((typeof globalThis.__GOFRONT_CLOCK === "function" ? {_d: new Date(globalThis.__GOFRONT_CLOCK())} : {_d: new Date()}));
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
  if (window.location.hash != null && !__ifeq(window.location.hash, "")) {
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
    let [rest, ok] = ((str, pre) => str.startsWith(pre) ? [str.slice(pre.length), true] : [str, false])(path, "/blog/page/");
    if (ok) {
      let [n, err] = ((r, s) => [Number(r[0]), r[1] === null ? null : (typeof NumError$$strconv !== "undefined" ? ((o) => { o.__p = true; return o; })(new NumError$$strconv("Atoi", String(s), r[1].includes("value out of range") ? __strconv_err_range : __strconv_err_syntax)) : __error(r[1], r[1].includes("invalid syntax") ? __strconv_err_syntax : r[1].includes("value out of range") ? __strconv_err_range : null))])(__strconv_atoi(rest), rest);
      if (err != null || n < 1) {
        n = 1;
      }
      return new RouteMatch(RouteBlog, "", n);
    }
  }
  {
    let [slug, ok] = ((str, pre) => str.startsWith(pre) ? [str.slice(pre.length), true] : [str, false])(path, "/blog/");
    if (ok) {
      slug = ((s, pre) => s.startsWith(pre) ? s.slice(pre.length) : s)(slug, "post/");
      if (slug === "") {
        return new RouteMatch(RouteNotFound);
      }
      return new RouteMatch(RoutePost, slug);
    }
  }
  {
    let [id, ok] = ((str, pre) => str.startsWith(pre) ? [str.slice(pre.length), true] : [str, false])(path, "/project/");
    if (ok) {
      if (id === "") {
        return new RouteMatch(RouteNotFound);
      }
      return new RouteMatch(RouteProject, id);
    }
  }
  {
    let [id, ok] = ((str, pre) => str.startsWith(pre) ? [str.slice(pre.length), true] : [str, false])(path, "/page/");
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
  for (let __i0 = 0, __arr0 = projects, __v0 = __arr0?.[__sv], __b0 = __v0 === undefined ? __arr0 : __v0.b, __o0 = __v0 === undefined ? 0 : __v0.o, __len0 = __v0 !== undefined ? __v0.n : __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let p = __b0[__o0 + __i0];
    let item = { "id": p.ID, "title": p.Title, "description": p.Description, "tags": p.Tags, "type": "project", "url": p.Href };
    searchItems = __append(searchItems, __ifm(item));
  }
  for (let __i0 = 0, __arr0 = posts, __v0 = __arr0?.[__sv], __b0 = __v0 === undefined ? __arr0 : __v0.b, __o0 = __v0 === undefined ? 0 : __v0.o, __len0 = __v0 !== undefined ? __v0.n : __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let p = __b0[__o0 + __i0];
    let item = { "id": p.Slug, "title": p.Title, "description": p.Excerpt, "tags": p.Tags, "type": "blog", "url": p.Href };
    searchItems = __append(searchItems, __ifm(item));
  }
  let options = { "keys": [__ifm({ "name": "title", "weight": 0.4 }), __ifm({ "name": "description", "weight": 0.3 }), __ifm({ "name": "tags", "weight": 0.2 })], "threshold": 0.4, "minMatchCharLength": searchMinChars() };
  fuseInstance = Reflect.construct(window.Fuse, [searchItems, __ifm(options)]);
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
    if (origin === "" || origin === "null") {
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
  ((s, f) => s ? s.sort(f) : null)(list, function(a, b) {
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

function themeFromRaw(d, defaultCodeTheme) {
  let codeTheme = defaultCodeTheme;
  if (d.Code.Theme !== "") {
    codeTheme = d.Code.Theme;
  }
  return new ThemeColors(d.Primary, d.Secondary, d.Background, d.Text, d.TextLight, d.Border, d.Hover, codeTheme, d.Comments.Theme);
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
  ((s, f) => s ? s.sort(f) : null)(list, function(a, b) {
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
  ((s, f) => s ? s.sort(f) : null)(list, function(a, b) {
    return a.Order - b.Order;
  });
}

async function initData() {
  let rawBytes = null;
  let el = document.getElementById("site-data");
  if (el != null && el.textContent != null && !__ifeq(el.textContent, "")) {
    rawBytes = new TextEncoder().encode(String(el.textContent));
  } else {
    let res = await fetch("/data/content.json");
    if (res == null || !res.ok) {
      return __error("failed to fetch /data/content.json");
    }
    let text = await res.text();
    rawBytes = new TextEncoder().encode(String(text));
  }
  if (__len(rawBytes) === 0) {
    return __error("failed to parse /data/content.json");
  }
  let payload = new ContentPayload();
  {
    let err = __json_unmarshal(__json_dec_ContentPayload, rawBytes, __ifp(payload), "*main.ContentPayload", "ptr");
    if (err != null) {
      return __error("failed to parse /data/content.json: " + err.Error());
    }
  }
  site.Title = payload.Site.Title;
  site.Url = ((s, suf) => !suf.length || !s.endsWith(suf) ? s : s.slice(0, -suf.length))(payload.Site.Url, "/");
  site.Description = payload.Site.Description;
  site.Author = payload.Site.Author;
  site.GithubUsername = payload.Site.GithubUsername;
  site.DarkTheme = themeFromRaw(payload.Site.Theme.Dark, "prism-tomorrow");
  site.LightTheme = themeFromRaw(payload.Site.Theme.Light, "prism-coy");
  site.Search = payload.Site.Search.__clone();
  site.EmailJS = payload.Site.EmailJS.__clone();
  site.Comments = new CommentsConfig(boolVal((payload.Site.Comments["blogEnabled"] ?? null)), boolVal((payload.Site.Comments["projectsEnabled"] ?? null)), __ifm(payload.Site.Comments));
  site.Social = payload.Site.Social;
  {
    let enTrans = payload.Translations["en"];
    let ok = ("en") in payload.Translations;
    if (ok) {
      for (let [k, v] of Object.entries(enTrans)) {
        if (k === "__map") {
          continue;
        }
        translations[k] = v;
      }
    }
  }
  site.PostsPerPage = 5;
  if (payload.Blog.PostsPerPage > 0) {
    site.PostsPerPage = payload.Blog.PostsPerPage;
  }
  for (let __i0 = 0, __arr0 = payload.Blog.Posts, __v0 = __arr0?.[__sv], __b0 = __v0 === undefined ? __arr0 : __v0.b, __o0 = __v0 === undefined ? 0 : __v0.o, __len0 = __v0 !== undefined ? __v0.n : __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let p = __b0[__o0 + __i0].__clone();
    let slug = ((s, suf) => !suf.length || !s.endsWith(suf) ? s : s.slice(0, -suf.length))(p.Filename, ".md");
    p.Slug = slug;
    p.Href = "/blog/" + slug;
    if (p.Tags == null) {
      p.Tags = [];
    }
    posts = __append(posts, p.__clone());
  }
  sortPostsByDate(posts);
  for (let __i0 = 0, __arr0 = payload.Projects, __v0 = __arr0?.[__sv], __b0 = __v0 === undefined ? __arr0 : __v0.b, __o0 = __v0 === undefined ? 0 : __v0.o, __len0 = __v0 !== undefined ? __v0.n : __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let p = __b0[__o0 + __i0].__clone();
    p.Href = "/project/" + p.ID;
    if (p.Tags == null) {
      p.Tags = [];
    }
    if (p.YoutubeVideos == null) {
      p.YoutubeVideos = [];
    }
    if (p.Links == null) {
      p.Links = [];
    }
    projects = __append(projects, p.__clone());
  }
  sortProjectsByOrder(projects);
  for (let [id, p] of Object.entries(payload.Pages)) {
    p = p.__clone();
    if (id === "__map") {
      continue;
    }
    p.ID = id;
    p.Href = navPageHref(id);
    navPages = __append(navPages, p.__clone());
  }
  sortPagesByOrder(navPages);
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
  if (saved != null && !__ifeq(saved, "")) {
    return String(saved);
  }
  let current = document.documentElement.getAttribute("data-theme");
  if (current != null && !__ifeq(current, "")) {
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
  for (let __i0 = 0, __arr0 = all, __v0 = __arr0?.[__sv], __b0 = __v0 === undefined ? __arr0 : __v0.b, __o0 = __v0 === undefined ? 0 : __v0.o, __len0 = __v0 !== undefined ? __v0.n : __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let i = __i0;
    let p = __b0[__o0 + __i0];
    if (p.Slug === slug) {
      { const __s4 = p;
      v.Post.Slug = __s4.Slug;
      v.Post.Title = __s4.Title;
      v.Post.Date = __s4.Date;
      v.Post.Excerpt = __s4.Excerpt;
      v.Post.Tags = __s4.Tags;
      v.Post.Filename = __s4.Filename;
      v.Post.Href = __s4.Href;
      }
      if (i + 1 < __len(all)) {
        v.HasPrev = true;
        { const __s5 = all[i + 1];
        v.PrevPost.Slug = __s5.Slug;
        v.PrevPost.Title = __s5.Title;
        v.PrevPost.Date = __s5.Date;
        v.PrevPost.Excerpt = __s5.Excerpt;
        v.PrevPost.Tags = __s5.Tags;
        v.PrevPost.Filename = __s5.Filename;
        v.PrevPost.Href = __s5.Href;
        }
      }
      if (i > 0) {
        v.HasNext = true;
        { const __s6 = all[i - 1];
        v.NextPost.Slug = __s6.Slug;
        v.NextPost.Title = __s6.Title;
        v.NextPost.Date = __s6.Date;
        v.NextPost.Excerpt = __s6.Excerpt;
        v.NextPost.Tags = __s6.Tags;
        v.NextPost.Filename = __s6.Filename;
        v.NextPost.Href = __s6.Href;
        }
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
  for (let __i0 = 0, __arr0 = all, __v0 = __arr0?.[__sv], __b0 = __v0 === undefined ? __arr0 : __v0.b, __o0 = __v0 === undefined ? 0 : __v0.o, __len0 = __v0 !== undefined ? __v0.n : __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let p = __b0[__o0 + __i0];
    if (p.ID === id) {
      { const __s7 = p;
      v.Proj.ID = __s7.ID;
      v.Proj.Title = __s7.Title;
      v.Proj.Description = __s7.Description;
      v.Proj.Tags = __s7.Tags;
      v.Proj.Order = __s7.Order;
      v.Proj.GithubRepo = __s7.GithubRepo;
      v.Proj.GithubBranch = __s7.GithubBranch;
      v.Proj.DemoUrl = __s7.DemoUrl;
      v.Proj.DemoLabel = __s7.DemoLabel;
      v.Proj.DemoInstructions = __s7.DemoInstructions;
      v.Proj.DemoHeight = __s7.DemoHeight;
      v.Proj.DemoFullscreen = __s7.DemoFullscreen;
      v.Proj.YoutubeVideos = __s7.YoutubeVideos;
      v.Proj.Links = __s7.Links;
      v.Proj.Href = __s7.Href;
      }
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
  { const __s8 = new NavPage(id, id, 0, false, navPageHref(id));
  v.Page.ID = __s8.ID;
  v.Page.Title = __s8.Title;
  v.Page.Order = __s8.Order;
  v.Page.ShowInNav = __s8.ShowInNav;
  v.Page.Href = __s8.Href;
  }
  for (let __i0 = 0, __arr0 = all, __v0 = __arr0?.[__sv], __b0 = __v0 === undefined ? __arr0 : __v0.b, __o0 = __v0 === undefined ? 0 : __v0.o, __len0 = __v0 !== undefined ? __v0.n : __arr0 ? __arr0.length : 0; __i0 < __len0; __i0++) {
    let p = __b0[__o0 + __i0];
    if (p.ID === id) {
      { const __s9 = p;
      v.Page.ID = __s9.ID;
      v.Page.Title = __s9.Title;
      v.Page.Order = __s9.Order;
      v.Page.ShowInNav = __s9.ShowInNav;
      v.Page.Href = __s9.Href;
      }
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

var __json_dec_ContentPayload = typeof __json_dec_ContentPayload !== "undefined" ? __json_dec_ContentPayload : function __json_dec_ContentPayload(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.ContentPayload"));
  }
  var disallowErr = __json_check_unknown(parsed, ["site","Site","blog","Blog","projects","Projects","pages","Pages","translations","Translations"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("ContentPayload");
  try {
  { var fieldKey = __json_match_field(parsed, "site", "Site"); if (fieldKey !== null) {
    __json_path.push("site");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var sub = target.Site;
      if (!sub) { sub = new ContentSite(); target.Site = sub; }
      var err = __json_dec_ContentSite(val, sub);
      if (err) return err;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "blog", "Blog"); if (fieldKey !== null) {
    __json_path.push("blog");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var sub = target.Blog;
      if (!sub) { sub = new ContentBlog(); target.Blog = sub; }
      var err = __json_dec_ContentBlog(val, sub);
      if (err) return err;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "projects", "Projects"); if (fieldKey !== null) {
    __json_path.push("projects");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var box = { value: null };
      var err = __json_dec_slice_Project(val, null, box);
      if (err) return err;
      target.Projects = box.value;
    } else {
      target.Projects = null;
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "pages", "Pages"); if (fieldKey !== null) {
    __json_path.push("pages");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var box = { value: null };
      var err = __json_dec_map_NavPage(val, null, box);
      if (err) return err;
      target.Pages = box.value;
    } else {
      target.Pages = null;
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "translations", "Translations"); if (fieldKey !== null) {
    __json_path.push("translations");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var box = { value: null };
      var err = __json_dec_map_map_string(val, null, box);
      if (err) return err;
      target.Translations = box.value;
    } else {
      target.Translations = null;
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_ContentSite = typeof __json_dec_ContentSite !== "undefined" ? __json_dec_ContentSite : function __json_dec_ContentSite(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.ContentSite"));
  }
  var disallowErr = __json_check_unknown(parsed, ["title","Title","url","Url","description","Description","author","Author","github_username","GithubUsername","theme","Theme","search","Search","emailjs","EmailJS","comments","Comments","social","Social"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("ContentSite");
  try {
  { var fieldKey = __json_match_field(parsed, "title", "Title"); if (fieldKey !== null) {
    __json_path.push("title");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Title = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "url", "Url"); if (fieldKey !== null) {
    __json_path.push("url");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Url = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "description", "Description"); if (fieldKey !== null) {
    __json_path.push("description");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Description = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "author", "Author"); if (fieldKey !== null) {
    __json_path.push("author");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Author = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "github_username", "GithubUsername"); if (fieldKey !== null) {
    __json_path.push("github_username");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.GithubUsername = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "theme", "Theme"); if (fieldKey !== null) {
    __json_path.push("theme");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var sub = target.Theme;
      if (!sub) { sub = new ContentSiteTheme(); target.Theme = sub; }
      var err = __json_dec_ContentSiteTheme(val, sub);
      if (err) return err;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "search", "Search"); if (fieldKey !== null) {
    __json_path.push("search");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var sub = target.Search;
      if (!sub) { sub = new SearchConfig(); target.Search = sub; }
      var err = __json_dec_SearchConfig(val, sub);
      if (err) return err;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "emailjs", "EmailJS"); if (fieldKey !== null) {
    __json_path.push("emailjs");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var sub = target.EmailJS;
      if (!sub) { sub = new EmailJSConfig(); target.EmailJS = sub; }
      var err = __json_dec_EmailJSConfig(val, sub);
      if (err) return err;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "comments", "Comments"); if (fieldKey !== null) {
    __json_path.push("comments");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var box = { value: null };
      var err = __json_dec_map_any(val, null, box);
      if (err) return err;
      target.Comments = box.value;
    } else {
      target.Comments = null;
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "social", "Social"); if (fieldKey !== null) {
    __json_path.push("social");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var box = { value: null };
      var err = __json_dec_slice_SocialLink(val, null, box);
      if (err) return err;
      target.Social = box.value;
    } else {
      target.Social = null;
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_ContentSiteTheme = typeof __json_dec_ContentSiteTheme !== "undefined" ? __json_dec_ContentSiteTheme : function __json_dec_ContentSiteTheme(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.ContentSiteTheme"));
  }
  var disallowErr = __json_check_unknown(parsed, ["default","Default","dark","Dark","light","Light"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("ContentSiteTheme");
  try {
  { var fieldKey = __json_match_field(parsed, "default", "Default"); if (fieldKey !== null) {
    __json_path.push("default");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Default = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "dark", "Dark"); if (fieldKey !== null) {
    __json_path.push("dark");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var sub = target.Dark;
      if (!sub) { sub = new RawThemeColors(); target.Dark = sub; }
      var err = __json_dec_RawThemeColors(val, sub);
      if (err) return err;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "light", "Light"); if (fieldKey !== null) {
    __json_path.push("light");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var sub = target.Light;
      if (!sub) { sub = new RawThemeColors(); target.Light = sub; }
      var err = __json_dec_RawThemeColors(val, sub);
      if (err) return err;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_RawThemeColors = typeof __json_dec_RawThemeColors !== "undefined" ? __json_dec_RawThemeColors : function __json_dec_RawThemeColors(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.RawThemeColors"));
  }
  var disallowErr = __json_check_unknown(parsed, ["primary","Primary","secondary","Secondary","background","Background","text","Text","textLight","TextLight","border","Border","hover","Hover","code","Code","comments","Comments"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("RawThemeColors");
  try {
  { var fieldKey = __json_match_field(parsed, "primary", "Primary"); if (fieldKey !== null) {
    __json_path.push("primary");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Primary = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "secondary", "Secondary"); if (fieldKey !== null) {
    __json_path.push("secondary");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Secondary = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "background", "Background"); if (fieldKey !== null) {
    __json_path.push("background");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Background = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "text", "Text"); if (fieldKey !== null) {
    __json_path.push("text");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Text = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "textLight", "TextLight"); if (fieldKey !== null) {
    __json_path.push("textLight");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.TextLight = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "border", "Border"); if (fieldKey !== null) {
    __json_path.push("border");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Border = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "hover", "Hover"); if (fieldKey !== null) {
    __json_path.push("hover");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Hover = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "code", "Code"); if (fieldKey !== null) {
    __json_path.push("code");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var sub = target.Code;
      if (!sub) { sub = new ThemeNestedTheme(); target.Code = sub; }
      var err = __json_dec_ThemeNestedTheme(val, sub);
      if (err) return err;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "comments", "Comments"); if (fieldKey !== null) {
    __json_path.push("comments");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var sub = target.Comments;
      if (!sub) { sub = new ThemeNestedTheme(); target.Comments = sub; }
      var err = __json_dec_ThemeNestedTheme(val, sub);
      if (err) return err;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_ThemeNestedTheme = typeof __json_dec_ThemeNestedTheme !== "undefined" ? __json_dec_ThemeNestedTheme : function __json_dec_ThemeNestedTheme(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.ThemeNestedTheme"));
  }
  var disallowErr = __json_check_unknown(parsed, ["theme","Theme"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("ThemeNestedTheme");
  try {
  { var fieldKey = __json_match_field(parsed, "theme", "Theme"); if (fieldKey !== null) {
    __json_path.push("theme");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Theme = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_SearchConfig = typeof __json_dec_SearchConfig !== "undefined" ? __json_dec_SearchConfig : function __json_dec_SearchConfig(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.SearchConfig"));
  }
  var disallowErr = __json_check_unknown(parsed, ["enabled","Enabled","minChars","MinChars","placeholder","Placeholder"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("SearchConfig");
  try {
  { var fieldKey = __json_match_field(parsed, "enabled", "Enabled"); if (fieldKey !== null) {
    __json_path.push("enabled");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "boolean" ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("bool")));
      if (dv && dv._msg) return dv;
      target.Enabled = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "minChars", "MinChars"); if (fieldKey !== null) {
    __json_path.push("minChars");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = __json_int_decode(val, "int", "int", raw);
      if (dv && dv._msg) return dv;
      target.MinChars = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "placeholder", "Placeholder"); if (fieldKey !== null) {
    __json_path.push("placeholder");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Placeholder = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_EmailJSConfig = typeof __json_dec_EmailJSConfig !== "undefined" ? __json_dec_EmailJSConfig : function __json_dec_EmailJSConfig(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.EmailJSConfig"));
  }
  var disallowErr = __json_check_unknown(parsed, ["enabled","Enabled","serviceId","ServiceId","templateId","TemplateId","publicKey","PublicKey"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("EmailJSConfig");
  try {
  { var fieldKey = __json_match_field(parsed, "enabled", "Enabled"); if (fieldKey !== null) {
    __json_path.push("enabled");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "boolean" ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("bool")));
      if (dv && dv._msg) return dv;
      target.Enabled = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "serviceId", "ServiceId"); if (fieldKey !== null) {
    __json_path.push("serviceId");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.ServiceId = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "templateId", "TemplateId"); if (fieldKey !== null) {
    __json_path.push("templateId");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.TemplateId = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "publicKey", "PublicKey"); if (fieldKey !== null) {
    __json_path.push("publicKey");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.PublicKey = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_map_any = typeof __json_dec_map_any !== "undefined" ? __json_dec_map_any : function __json_dec_map_any(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("map[string]interface {}"));
  var out = __json_newmap();
  for (var k in parsed) {
    if (Object.prototype.hasOwnProperty.call(parsed, k)) {
      var item = __json_dec_any(parsed[k]);
      if (item && item._msg) return item;
      out[k] = item;
    }
  }
  if (box) box.value = out;
  return null;
};

var __json_dec_SocialLink = typeof __json_dec_SocialLink !== "undefined" ? __json_dec_SocialLink : function __json_dec_SocialLink(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.SocialLink"));
  }
  var disallowErr = __json_check_unknown(parsed, ["icon","Icon","href","Href","target","Target","rel","Rel"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("SocialLink");
  try {
  { var fieldKey = __json_match_field(parsed, "icon", "Icon"); if (fieldKey !== null) {
    __json_path.push("icon");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Icon = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "href", "Href"); if (fieldKey !== null) {
    __json_path.push("href");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Href = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "target", "Target"); if (fieldKey !== null) {
    __json_path.push("target");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Target = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "rel", "Rel"); if (fieldKey !== null) {
    __json_path.push("rel");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Rel = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_slice_SocialLink = typeof __json_dec_slice_SocialLink !== "undefined" ? __json_dec_slice_SocialLink : function __json_dec_slice_SocialLink(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (!Array.isArray(parsed)) return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("[]main.SocialLink"));
  var out = [];
  for (var i = 0; i < parsed.length; i++) {
    var item = (() => { var inst = new SocialLink(); var err = __json_dec_SocialLink(parsed[i], inst); return err || inst; })();
    if (item && item._msg) return item;
    out.push(item);
  }
  if (box) box.value = out;
  return null;
};

var __json_dec_ContentBlog = typeof __json_dec_ContentBlog !== "undefined" ? __json_dec_ContentBlog : function __json_dec_ContentBlog(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.ContentBlog"));
  }
  var disallowErr = __json_check_unknown(parsed, ["title","Title","showInNav","ShowInNav","postsPerPage","PostsPerPage","dateFormat","DateFormat","posts","Posts"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("ContentBlog");
  try {
  { var fieldKey = __json_match_field(parsed, "title", "Title"); if (fieldKey !== null) {
    __json_path.push("title");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Title = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "showInNav", "ShowInNav"); if (fieldKey !== null) {
    __json_path.push("showInNav");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "boolean" ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("bool")));
      if (dv && dv._msg) return dv;
      target.ShowInNav = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "postsPerPage", "PostsPerPage"); if (fieldKey !== null) {
    __json_path.push("postsPerPage");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = __json_int_decode(val, "int", "int", raw);
      if (dv && dv._msg) return dv;
      target.PostsPerPage = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "dateFormat", "DateFormat"); if (fieldKey !== null) {
    __json_path.push("dateFormat");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.DateFormat = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "posts", "Posts"); if (fieldKey !== null) {
    __json_path.push("posts");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var box = { value: null };
      var err = __json_dec_slice_BlogPost(val, null, box);
      if (err) return err;
      target.Posts = box.value;
    } else {
      target.Posts = null;
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_BlogPost = typeof __json_dec_BlogPost !== "undefined" ? __json_dec_BlogPost : function __json_dec_BlogPost(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.BlogPost"));
  }
  var disallowErr = __json_check_unknown(parsed, ["title","Title","date","Date","excerpt","Excerpt","tags","Tags","filename","Filename"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("BlogPost");
  try {
  { var fieldKey = __json_match_field(parsed, "title", "Title"); if (fieldKey !== null) {
    __json_path.push("title");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Title = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "date", "Date"); if (fieldKey !== null) {
    __json_path.push("date");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Date = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "excerpt", "Excerpt"); if (fieldKey !== null) {
    __json_path.push("excerpt");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Excerpt = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "tags", "Tags"); if (fieldKey !== null) {
    __json_path.push("tags");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var box = { value: null };
      var err = __json_dec_slice_string(val, null, box);
      if (err) return err;
      target.Tags = box.value;
    } else {
      target.Tags = null;
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "filename", "Filename"); if (fieldKey !== null) {
    __json_path.push("filename");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Filename = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_slice_string = typeof __json_dec_slice_string !== "undefined" ? __json_dec_slice_string : function __json_dec_slice_string(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (!Array.isArray(parsed)) return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("[]string"));
  var out = [];
  for (var i = 0; i < parsed.length; i++) {
    var item = (typeof parsed[i] === "string" && !parsed[i].endsWith("__bigint") ? parsed[i] : __json_err("cannot unmarshal " + __json_type(parsed[i]) + " into " + __json_ctx("string")));
    if (item && item._msg) return item;
    out.push(item);
  }
  if (box) box.value = out;
  return null;
};

var __json_dec_slice_BlogPost = typeof __json_dec_slice_BlogPost !== "undefined" ? __json_dec_slice_BlogPost : function __json_dec_slice_BlogPost(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (!Array.isArray(parsed)) return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("[]main.BlogPost"));
  var out = [];
  for (var i = 0; i < parsed.length; i++) {
    var item = (() => { var inst = new BlogPost(); var err = __json_dec_BlogPost(parsed[i], inst); return err || inst; })();
    if (item && item._msg) return item;
    out.push(item);
  }
  if (box) box.value = out;
  return null;
};

var __json_dec_Project = typeof __json_dec_Project !== "undefined" ? __json_dec_Project : function __json_dec_Project(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.Project"));
  }
  var disallowErr = __json_check_unknown(parsed, ["id","ID","title","Title","description","Description","tags","Tags","order","Order","github_repo","GithubRepo","github_branch","GithubBranch","demo_url","DemoUrl","demo_label","DemoLabel","demo_instructions","DemoInstructions","demo_height","DemoHeight","demo_fullscreen","DemoFullscreen","youtube_videos","YoutubeVideos","links","Links"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("Project");
  try {
  { var fieldKey = __json_match_field(parsed, "id", "ID"); if (fieldKey !== null) {
    __json_path.push("id");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.ID = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "title", "Title"); if (fieldKey !== null) {
    __json_path.push("title");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Title = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "description", "Description"); if (fieldKey !== null) {
    __json_path.push("description");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Description = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "tags", "Tags"); if (fieldKey !== null) {
    __json_path.push("tags");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var box = { value: null };
      var err = __json_dec_slice_string(val, null, box);
      if (err) return err;
      target.Tags = box.value;
    } else {
      target.Tags = null;
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "order", "Order"); if (fieldKey !== null) {
    __json_path.push("order");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = __json_int_decode(val, "int", "int", raw);
      if (dv && dv._msg) return dv;
      target.Order = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "github_repo", "GithubRepo"); if (fieldKey !== null) {
    __json_path.push("github_repo");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.GithubRepo = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "github_branch", "GithubBranch"); if (fieldKey !== null) {
    __json_path.push("github_branch");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.GithubBranch = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "demo_url", "DemoUrl"); if (fieldKey !== null) {
    __json_path.push("demo_url");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.DemoUrl = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "demo_label", "DemoLabel"); if (fieldKey !== null) {
    __json_path.push("demo_label");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.DemoLabel = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "demo_instructions", "DemoInstructions"); if (fieldKey !== null) {
    __json_path.push("demo_instructions");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.DemoInstructions = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "demo_height", "DemoHeight"); if (fieldKey !== null) {
    __json_path.push("demo_height");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.DemoHeight = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "demo_fullscreen", "DemoFullscreen"); if (fieldKey !== null) {
    __json_path.push("demo_fullscreen");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "boolean" ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("bool")));
      if (dv && dv._msg) return dv;
      target.DemoFullscreen = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "youtube_videos", "YoutubeVideos"); if (fieldKey !== null) {
    __json_path.push("youtube_videos");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var box = { value: null };
      var err = __json_dec_slice_string(val, null, box);
      if (err) return err;
      target.YoutubeVideos = box.value;
    } else {
      target.YoutubeVideos = null;
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "links", "Links"); if (fieldKey !== null) {
    __json_path.push("links");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var box = { value: null };
      var err = __json_dec_slice_ProjectLink(val, null, box);
      if (err) return err;
      target.Links = box.value;
    } else {
      target.Links = null;
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_ProjectLink = typeof __json_dec_ProjectLink !== "undefined" ? __json_dec_ProjectLink : function __json_dec_ProjectLink(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.ProjectLink"));
  }
  var disallowErr = __json_check_unknown(parsed, ["title","Title","icon","Icon","href","Href"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("ProjectLink");
  try {
  { var fieldKey = __json_match_field(parsed, "title", "Title"); if (fieldKey !== null) {
    __json_path.push("title");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Title = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "icon", "Icon"); if (fieldKey !== null) {
    __json_path.push("icon");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Icon = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "href", "Href"); if (fieldKey !== null) {
    __json_path.push("href");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Href = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_slice_ProjectLink = typeof __json_dec_slice_ProjectLink !== "undefined" ? __json_dec_slice_ProjectLink : function __json_dec_slice_ProjectLink(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (!Array.isArray(parsed)) return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("[]main.ProjectLink"));
  var out = [];
  for (var i = 0; i < parsed.length; i++) {
    var item = (() => { var inst = new ProjectLink(); var err = __json_dec_ProjectLink(parsed[i], inst); return err || inst; })();
    if (item && item._msg) return item;
    out.push(item);
  }
  if (box) box.value = out;
  return null;
};

var __json_dec_slice_Project = typeof __json_dec_slice_Project !== "undefined" ? __json_dec_slice_Project : function __json_dec_slice_Project(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (!Array.isArray(parsed)) return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("[]main.Project"));
  var out = [];
  for (var i = 0; i < parsed.length; i++) {
    var item = (() => { var inst = new Project(); var err = __json_dec_Project(parsed[i], inst); return err || inst; })();
    if (item && item._msg) return item;
    out.push(item);
  }
  if (box) box.value = out;
  return null;
};

var __json_dec_NavPage = typeof __json_dec_NavPage !== "undefined" ? __json_dec_NavPage : function __json_dec_NavPage(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) {
    return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("main.NavPage"));
  }
  var disallowErr = __json_check_unknown(parsed, ["id","ID","title","Title","order","Order","showInNav","ShowInNav"]);
  if (disallowErr) return disallowErr;
  __json_structs.push("NavPage");
  try {
  { var fieldKey = __json_match_field(parsed, "id", "ID"); if (fieldKey !== null) {
    __json_path.push("id");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.ID = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "title", "Title"); if (fieldKey !== null) {
    __json_path.push("title");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "string" && !val.endsWith("__bigint") ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("string")));
      if (dv && dv._msg) return dv;
      target.Title = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "order", "Order"); if (fieldKey !== null) {
    __json_path.push("order");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = __json_int_decode(val, "int", "int", raw);
      if (dv && dv._msg) return dv;
      target.Order = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  { var fieldKey = __json_match_field(parsed, "showInNav", "ShowInNav"); if (fieldKey !== null) {
    __json_path.push("showInNav");
    try {
    var val = parsed[fieldKey];
    var raw = __json_raw_child(parsed, fieldKey);
    __json_current_offset = __json_raw_end(parsed, fieldKey) || 0;
    if (val !== null) {
      var dv = (typeof val === "boolean" ? val : __json_err("cannot unmarshal " + __json_type(val) + " into " + __json_ctx("bool")));
      if (dv && dv._msg) return dv;
      target.ShowInNav = dv;
    } else {
    }
    } finally { __json_path.pop(); }
  }
  }
  } finally { __json_structs.pop(); }
  return null;
};

var __json_dec_map_NavPage = typeof __json_dec_map_NavPage !== "undefined" ? __json_dec_map_NavPage : function __json_dec_map_NavPage(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("map[string]main.NavPage"));
  var out = __json_newmap();
  for (var k in parsed) {
    if (Object.prototype.hasOwnProperty.call(parsed, k)) {
      var item = (() => { var inst = new NavPage(); var err = __json_dec_NavPage(parsed[k], inst); return err || inst; })();
      if (item && item._msg) return item;
      out[k] = item;
    }
  }
  if (box) box.value = out;
  return null;
};

var __json_dec_map_string = typeof __json_dec_map_string !== "undefined" ? __json_dec_map_string : function __json_dec_map_string(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("map[string]string"));
  var out = __json_newmap();
  for (var k in parsed) {
    if (Object.prototype.hasOwnProperty.call(parsed, k)) {
      var item = (typeof parsed[k] === "string" && !parsed[k].endsWith("__bigint") ? parsed[k] : __json_err("cannot unmarshal " + __json_type(parsed[k]) + " into " + __json_ctx("string")));
      if (item && item._msg) return item;
      out[k] = item;
    }
  }
  if (box) box.value = out;
  return null;
};

var __json_dec_map_map_string = typeof __json_dec_map_map_string !== "undefined" ? __json_dec_map_map_string : function __json_dec_map_map_string(parsed, target, box) {
  if (parsed === null) { if (box) box.value = null; return null; }
  if (typeof parsed !== "object" || Array.isArray(parsed)) return __json_err("cannot unmarshal " + __json_type(parsed) + " into " + __json_ctx("map[string]map[string]string"));
  var out = __json_newmap();
  for (var k in parsed) {
    if (Object.prototype.hasOwnProperty.call(parsed, k)) {
      var item = (() => { var b = { value: null }; var err = __json_dec_map_string(parsed[k], null, b); return err || b.value; })();
      if (item && item._msg) return item;
      out[k] = item;
    }
  }
  if (box) box.value = out;
  return null;
};

__injectStyles(".gfc_mainContentStyle_dpxcuw {\nmargin: 0 auto;\n\tpadding: var(--spacing-lg);\n\tflex: 1 0 auto;\n\tmax-width: 900px;\n\twidth: 100%;\n\tbackground-color: var(--background-color);\n\tcolor: var(--font-color);\n\tanimation: fadeIn 0.2s ease-in-out;\n\ttransition:\n\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing);\n\n\t&:focus {\n\t\toutline: none;\n\t}\n\n\t&.page-transition-out {\n\t\tanimation: fadeOut 0.2s ease-in-out forwards;\n\t}\n}\n\n.gfc_appShellStyle_hypyhi {\ndisplay: flex;\n\tflex-direction: column;\n\tmin-height: calc(100vh - 56px);\n\tflex: 1 0 auto;\n\n\t& .icon {\n\t\tdisplay: inline-block;\n\t\tvertical-align: middle;\n\t\ttransition: transform var(--transition-fast);\n\t}\n\t& .icon:hover {\n\t\ttransform: rotate(5deg) scale(1.1);\n\t}\n\t& a.icon:hover {\n\t\ttext-decoration: none;\n\t}\n\n\t& .skip-link {\n\t\tposition: fixed;\n\t\ttop: -100px;\n\t\tleft: 1rem;\n\t\tbackground: var(--accent);\n\t\tcolor: #ffffff;\n\t\tpadding: 0.5rem 1rem;\n\t\tz-index: 10001;\n\t\tborder-radius: var(--border-radius-sm);\n\t\tfont-weight: 600;\n\t\ttext-decoration: none;\n\t\tbox-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);\n\t\ttransition: top 0.2s ease-in-out;\n\t}\n\t& .skip-link:focus {\n\t\ttop: 1rem;\n\t}\n\t& #navbar-slot,\n\t& #content-slot {\n\t\tdisplay: contents;\n\t}\n}\n\n.gfc_blogCardStyle_1ge5308 {\npadding: 1.5rem;\n\tbackground-color: rgba(255, 255, 255, 0.02);\n\tborder: 1px solid var(--border-color);\n\tborder-radius: var(--border-radius-large);\n\ttransition: all var(--transition-normal);\n\tcursor: pointer;\n\n\t&:hover {\n\t\tbackground-color: rgba(255, 255, 255, 0.05);\n\t\tborder-color: var(--accent);\n\t\ttransform: translateY(-4px) scale(1.01);\n\t\tbox-shadow: 0 8px 25px var(--accent-glow);\n\t}\n\t& .blog-post-title {\n\t\tmargin: 0 0 0.35rem 0;\n\t\tfont-size: 1.35em;\n\t\tfont-weight: bold;\n\t\tline-height: 1.3;\n\t}\n\t& .blog-post-title a {\n\t\tcolor: var(--accent);\n\t\ttext-decoration: none;\n\t\ttransition: color var(--transition-fast);\n\t}\n\t& .blog-post-title a:hover {\n\t\tcolor: var(--font-color);\n\t}\n\t& .blog-post-meta {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\talign-items: center;\n\t\tgap: 0.75rem;\n\t\tmargin-bottom: 0.75rem;\n\t\tfont-size: 1em;\n\t\tcolor: var(--text-light);\n\t}\n\t& .blog-post-date {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 0.4rem;\n\t}\n\t& .blog-post-tags {\n\t\tdisplay: flex;\n\t\tflex-wrap: wrap;\n\t\tgap: 0.4rem;\n\t}\n\t& .blog-post-excerpt {\n\t\tcolor: var(--text-light);\n\t\tline-height: 1.5;\n\t\tmargin-bottom: 0;\n\t\tfont-size: 1.05em;\n\t}\n\t& mark {\n\t\tbackground-color: var(--accent);\n\t\tcolor: var(--background-color);\n\t\tpadding: 1px 3px;\n\t\tborder-radius: 2px;\n\t\tfont-weight: bold;\n\t}\n\n\t@media (max-width: 767px) {\n\t\tpadding: 1rem;\n\t\tmargin: 0.25rem;\n\t\ttext-align: center;\n\t\t& .blog-post-title {\n\t\t\tfont-size: 1.25em;\n\t\t}\n\t\t& .blog-post-meta {\n\t\t\tflex-direction: column;\n\t\t\talign-items: center;\n\t\t\tgap: 0.5rem;\n\t\t\tfont-size: 0.95em;\n\t\t\tjustify-content: center;\n\t\t}\n\t\t& .blog-post-excerpt {\n\t\t\tfont-size: 1em;\n\t\t}\n\t}\n}\n\n.gfc_paginationStyle_16wpmso {\nmargin: 2rem 0;\n\tdisplay: flex;\n\tjustify-content: center;\n\n\t& .pagination {\n\t\tdisplay: flex;\n\t\tgap: 0.5rem;\n\t\tlist-style: none;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t}\n\t& .page-item {\n\t\tdisplay: flex;\n\t}\n\t& .page-link {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tpadding: 0.5rem 0.75rem;\n\t\tbackground-color: rgba(255, 255, 255, 0.02);\n\t\tborder: 1px solid var(--border-color);\n\t\tborder-radius: var(--border-radius);\n\t\tcolor: var(--font-color);\n\t\ttext-decoration: none;\n\t\ttransition: all var(--transition-fast);\n\t\tcursor: pointer;\n\t\tmin-width: 40px;\n\t\theight: 38px;\n\t\tbox-sizing: border-box;\n\t\ttext-align: center;\n\t}\n\t& .page-link svg {\n\t\tdisplay: inline-block;\n\t\tvertical-align: middle;\n\t}\n\t& .page-link:hover {\n\t\tbackground-color: var(--hover-color);\n\t\tborder-color: var(--accent);\n\t\tcolor: var(--accent);\n\t}\n\t& .page-item.active .page-link {\n\t\tbackground-color: var(--accent);\n\t\tborder-color: var(--accent);\n\t\tcolor: var(--background-color);\n\t\tfont-weight: bold;\n\t}\n\t& .page-item.disabled .page-link {\n\t\topacity: 0.5;\n\t\tcursor: not-allowed;\n\t\tpointer-events: none;\n\t}\n\n\t@media (max-width: 767px) {\n\t\t& .page-link {\n\t\t\tpadding: 0.4rem 0.6rem;\n\t\t\tfont-size: 0.9em;\n\t\t\tmin-width: 35px;\n\t\t\theight: 35px;\n\t\t}\n\t}\n}\n\n.gfc_blogListStyle_1clw6uj {\nmax-width: 900px;\n\tmargin: 0 auto;\n\ttext-align: left;\n\n\t& .blog-page-title {\n\t\tcolor: var(--accent);\n\t\tfont-size: 2em;\n\t\tmargin-bottom: 1.5rem;\n\t\ttext-align: center;\n\t}\n\t& .blog-empty {\n\t\ttext-align: center;\n\t\tcolor: var(--text-light);\n\t\tfont-size: 1.1em;\n\t\tpadding: 2rem 0;\n\t}\n\t& .blog-posts {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1.5rem;\n\t\tmargin-bottom: 2rem;\n\t}\n\n\t@media (max-width: 767px) {\n\t\t& .blog-posts {\n\t\t\tgap: 0.5rem;\n\t\t}\n\t}\n}\n\n.gfc_tocStyle_1cu92vr {\nbackground: transparent;\n\tborder: none;\n\tborder-left: 2px solid var(--border-color);\n\tborder-radius: 0;\n\tpadding: 0.25rem 0 0.25rem 0.85rem;\n\tmargin: 1.5rem 0 2rem 0;\n\ttext-align: left;\n\ttransition: border-color 0.2s ease;\n\n\t&:hover,\n\t&[open] {\n\t\tborder-left-color: color-mix(in srgb, var(--accent) 50%, var(--border-color));\n\t}\n\t& .blog-toc-title {\n\t\tfont-size: 1rem;\n\t\tfont-weight: 600;\n\t\ttext-transform: uppercase;\n\t\tletter-spacing: 0.05em;\n\t\tcursor: pointer;\n\t\tcolor: var(--text-light);\n\t\tuser-select: none;\n\t\ttransition: color 0.15s ease;\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\tgap: 0.35rem;\n\t}\n\t& .blog-toc-title:hover {\n\t\tcolor: var(--accent);\n\t}\n\t& .blog-toc-title:focus-visible {\n\t\toutline: 2px solid var(--accent);\n\t\toutline-offset: 2px;\n\t\tborder-radius: 2px;\n\t}\n\t& .blog-toc-nav {\n\t\tmargin-top: 0.5rem;\n\t}\n\t& .blog-toc-list {\n\t\tlist-style: none;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\talign-items: flex-start;\n\t\tgap: 0.35rem;\n\t}\n\t& .blog-toc-item {\n\t\ttext-align: left;\n\t}\n\t& .blog-toc-item a {\n\t\tcolor: var(--text-light);\n\t\ttext-decoration: none;\n\t\tfont-size: 1rem;\n\t\tline-height: 1.5;\n\t\ttransition: color 0.15s ease;\n\t\tdisplay: inline-block;\n\t}\n\t& .blog-toc-item a:hover {\n\t\tcolor: var(--accent);\n\t\ttext-decoration: none;\n\t}\n\t& .blog-toc-level-3 {\n\t\tpadding-left: 1.25rem;\n\t}\n\t& .blog-toc-level-3 a {\n\t\tfont-size: 0.95rem;\n\t\topacity: 0.9;\n\t}\n}\n\n.gfc_postNavStyle_1hdu2x0 {\ndisplay: flex;\n\tflex-wrap: nowrap;\n\tgap: 15px;\n\tjustify-content: space-between;\n\tmargin: 2.5rem 0;\n\n\t& .blog-nav-next {\n\t\tmargin-left: auto;\n\t}\n}\n\n.gfc_blogPostViewStyle_1in8v7g {\n& .project-title {\n\t\tcolor: var(--accent);\n\t\tfont-size: 1.5em;\n\t\tmargin: 0 0 0.02em 0;\n\t\tfont-weight: bold;\n\t}\n\t& .project-description {\n\t\tmargin: 0 0 0.5em 0;\n\t\tcolor: var(--text-light);\n\t\tfont-size: 1.2em;\n\t\tline-height: 1.6;\n\t}\n\t& .project-tags {\n\t\tmargin: 0.8em 0;\n\t\tfont-size: 1.1em;\n\t}\n}\n\n.gfc_contactModalStyle_1akch0q {\ndisplay: flex;\n\talign-items: center;\n\tjustify-content: center;\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\twidth: 100%;\n\theight: 100%;\n\tbackground-color: rgba(0, 0, 0, 0.7);\n\tbackdrop-filter: blur(6px);\n\t-webkit-backdrop-filter: blur(6px);\n\tz-index: 10000;\n\toverflow-y: auto;\n\toverscroll-behavior: contain;\n\tpadding: 2rem 1rem;\n\tvisibility: hidden;\n\topacity: 0;\n\ttransition:\n\t\topacity 0.2s ease-in-out,\n\t\tvisibility 0s linear 0.2s;\n\n\t&.show {\n\t\tvisibility: visible;\n\t\topacity: 1;\n\t\ttransition:\n\t\t\topacity 0.25s ease-out,\n\t\t\tvisibility 0s;\n\t}\n\n\t& .contact-modal-content {\n\t\tbackground-color: var(--background-color);\n\t\tborder: 2px solid var(--border-color);\n\t\tborder-radius: 8px;\n\t\tpadding: 1.5rem;\n\t\tmax-width: 450px;\n\t\twidth: 100%;\n\t\tposition: relative;\n\t\tbox-shadow: 0 4px 20px rgba(0, 0, 0, 0.5);\n\t\topacity: 0;\n\t\ttransform: scale(0.95);\n\t\ttransition:\n\t\t\topacity 0.2s ease-in,\n\t\t\ttransform 0.2s ease-in,\n\t\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing);\n\t}\n\n\t&.show .contact-modal-content {\n\t\topacity: 1;\n\t\ttransform: scale(1);\n\t\ttransition:\n\t\t\topacity 0.25s ease-out,\n\t\t\ttransform 0.25s ease-out,\n\t\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing);\n\t}\n\n\t& .contact-modal-header {\n\t\tdisplay: flex;\n\t\tjustify-content: space-between;\n\t\talign-items: center;\n\t\tmargin-bottom: 1rem;\n\t}\n\n\t& .contact-modal-header h2 {\n\t\tmargin: 0;\n\t\tcolor: var(--accent);\n\t\tfont-size: 1.25rem;\n\t}\n\n\t& .contact-modal-close {\n\t\tbackground: none;\n\t\tborder: none;\n\t\tcolor: var(--text-light);\n\t\tfont-size: 1.5rem;\n\t\tcursor: pointer;\n\t\tpadding: 0;\n\t\twidth: 32px;\n\t\theight: 32px;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tborder-radius: 4px;\n\t\ttransition: all 0.2s ease;\n\t}\n\n\t& .contact-modal-close:hover {\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--font-color);\n\t}\n\n\t& .contact-form .form-group {\n\t\tmargin-bottom: 0.75rem;\n\t}\n\n\t& .contact-form label {\n\t\tdisplay: block;\n\t\tmargin-bottom: 0.25rem;\n\t\tcolor: var(--font-color);\n\t\tfont-weight: 600;\n\t\tfont-size: 0.9rem;\n\t\ttext-align: left;\n\t}\n\n\t& .contact-form input,\n\t& .contact-form textarea {\n\t\twidth: 100%;\n\t\tpadding: 0.6rem;\n\t\tbackground-color: var(--hover-color);\n\t\tborder: 1px solid var(--border-color);\n\t\tborder-radius: 4px;\n\t\tcolor: var(--font-color);\n\t\tfont-family: inherit;\n\t\tfont-size: 0.95rem;\n\t\ttransition: border-color 0.2s ease;\n\t}\n\n\t& .contact-form input:focus,\n\t& .contact-form textarea:focus {\n\t\toutline: none;\n\t\tborder-color: var(--accent);\n\t}\n\n\t& .contact-form input.error,\n\t& .contact-form textarea.error {\n\t\tborder-color: #ef4444;\n\t}\n\n\t& .contact-form textarea {\n\t\tresize: vertical;\n\t\tmin-height: 100px;\n\t}\n\n\t& .form-status {\n\t\tpadding: 0.6rem;\n\t\tborder-radius: 4px;\n\t\tmargin-bottom: 0.25rem;\n\t\ttext-align: center;\n\t\tfont-size: 0.9rem;\n\t\tdisplay: none;\n\t}\n\n\t& .form-status.success,\n\t& .form-status.error {\n\t\tdisplay: block;\n\t}\n\n\t& .form-status.success {\n\t\tbackground-color: rgba(16, 185, 129, 0.1);\n\t\tborder: 1px solid var(--accent);\n\t\tcolor: var(--accent);\n\t}\n\n\t& .form-status.error {\n\t\tbackground-color: rgba(239, 68, 68, 0.1);\n\t\tborder: 1px solid #ef4444;\n\t\tcolor: #ef4444;\n\t}\n\n\t& .contact-form .btn {\n\t\twidth: 100%;\n\t\tpadding: 12px 24px;\n\t\tmargin-top: 0.75rem;\n\t\tbackground-color: var(--hover-color);\n\t\tborder: 2px solid var(--accent);\n\t\tborder-radius: 8px;\n\t\tcolor: var(--font-color);\n\t\tfont-weight: 600;\n\t\tfont-size: 1em;\n\t\tcursor: pointer;\n\t\ttransition: all var(--transition-normal);\n\t}\n\n\t& .contact-form .btn:hover:not(:disabled) {\n\t\tbackground-color: var(--hover-color);\n\t\tborder-color: var(--accent);\n\t\tcolor: var(--accent);\n\t\ttransform: translateY(-2px);\n\t\tbox-shadow: 0 4px 12px var(--accent-glow);\n\t}\n\n\t& .contact-form .btn:disabled {\n\t\topacity: 0.5;\n\t\tcursor: not-allowed;\n\t\ttransform: none;\n\t}\n}\n\n.gfc_footerStyle_ebeppf {\nmargin-top: auto;\n\tmargin-bottom: 0;\n\tpadding: 1rem 0;\n\tbackground-color: transparent;\n\tflex-shrink: 0;\n\tmax-width: 1000px;\n\tmargin-inline: auto;\n\ttext-align: center;\n\tfont-size: 0.9em;\n\ttransition: color var(--theme-transition-duration) var(--theme-transition-timing);\n}\n\n.gfc_navbarStyle_1jpcv7g {\nbackground-color: color-mix(in srgb, var(--header-color) 85%, transparent);\n\tbackdrop-filter: blur(12px);\n\t-webkit-backdrop-filter: blur(12px);\n\tborder-bottom: var(--border-width) solid var(--accent);\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tz-index: 1030;\n\tfont-family: var(--font-family-primary);\n\ttransition:\n\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing);\n\n\t& .navbar-inner {\n\t\tmax-width: 1000px;\n\t\tmargin-inline: auto;\n\t\tpadding: 0 15px;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: space-between;\n\t\ttransition:\n\t\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing);\n\t}\n\t& .navbar-brand {\n\t\tcolor: var(--font-color);\n\t\tfont-weight: bold;\n\t\ttext-decoration: none;\n\t\tfont-size: 1.25em;\n\t\tdisplay: none;\n\t\tpadding: 11px 0;\n\t}\n\t& .navbar-collapse {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: space-between;\n\t\twidth: 100%;\n\t}\n\t& .navbar-nav {\n\t\tdisplay: flex;\n\t\tlist-style: none;\n\t\tmargin: 0;\n\t\tpadding: 0;\n\t\talign-items: stretch;\n\t}\n\t& .navbar-nav.left {\n\t\tmargin-right: auto;\n\t}\n\t& .navbar-nav.right {\n\t\tmargin-left: auto;\n\t}\n\t& .nav-item {\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\talign-items: stretch;\n\t}\n\t& button.nav-link {\n\t\tbackground: none;\n\t\tborder: none;\n\t\tcursor: pointer;\n\t\tfont-family: inherit;\n\t\twidth: auto;\n\t\ttransition:\n\t\t\ttransform 0.1s ease,\n\t\t\tbackground-color var(--transition-fast),\n\t\t\tcolor var(--transition-fast);\n\t}\n\t& button.nav-link:active {\n\t\ttransform: scale(0.95);\n\t}\n\t& .nav-link {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tpadding: 11px 20px;\n\t\tcolor: var(--font-color);\n\t\ttext-decoration: none;\n\t\tline-height: 1.2;\n\t\tfont-size: 1.25em;\n\t\tfont-weight: 700;\n\t\ttransition:\n\t\t\tbackground-color var(--transition-fast),\n\t\t\tcolor var(--transition-fast),\n\t\t\tborder-color var(--transition-fast),\n\t\t\topacity var(--transition-fast),\n\t\t\ttransform var(--transition-fast);\n\t}\n\t& .navbar-menu .nav-link,\n\t& .navbar-icon .nav-link {\n\t\tfont-size: 1.35rem;\n\t}\n\t& .navbar-menu .nav-link {\n\t\tfont-weight: 700;\n\t}\n\t& .navbar-icon .nav-link svg {\n\t\ttransition:\n\t\t\ttransform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),\n\t\t\trotate 0.2s cubic-bezier(0.34, 1.56, 0.64, 1);\n\t\ttransform-origin: center;\n\t}\n\t& .navbar-icon .nav-link:hover svg,\n\t& .navbar-icon .nav-link:focus svg {\n\t\ttransform: rotate(8deg) scale(1.25);\n\t}\n\t& .navbar-icon .nav-link:active svg {\n\t\ttransform: rotate(4deg) scale(1.1);\n\t}\n\t& .nav-link:hover,\n\t& .nav-link:focus,\n\t& .nav-link:active {\n\t\tcolor: var(--accent);\n\t\tbackground-color: var(--hover-color);\n\t}\n\t& .nav-link.active {\n\t\tcolor: var(--accent);\n\t\tbackground-color: var(--hover-color);\n\t}\n\t& .nav-link:focus:not(.active) {\n\t\toutline: 2px solid var(--accent);\n\t\toutline-offset: -2px;\n\t}\n\t& .nav-link:focus:not(:focus-visible):not(.active) {\n\t\tbackground-color: transparent;\n\t\tcolor: var(--font-color);\n\t\toutline: none;\n\t}\n\t& .nav-link.active:focus {\n\t\toutline: none;\n\t}\n\t& .nav-link:focus:not(:focus-visible):hover {\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--accent);\n\t}\n\n\t@media (min-width: 768px) {\n\t\t& .navbar-inner {\n\t\t\tpadding-left: 20px;\n\t\t\tpadding-right: 20px;\n\t\t}\n\t}\n\n\t& .navbar-toggle {\n\t\tdisplay: none;\n\t\tbackground: transparent;\n\t\tborder: none;\n\t\tcolor: var(--font-color);\n\t\tfont-size: 1.5em;\n\t\tcursor: pointer;\n\t\tpadding: 11px 0.5rem;\n\t\ttransition: transform var(--transition-fast);\n\t\toverflow: visible;\n\t}\n\t& .navbar-toggle:focus {\n\t\toutline: 2px solid var(--accent);\n\t\toutline-offset: 2px;\n\t}\n\t& .navbar-toggle:focus:not(:focus-visible) {\n\t\toutline: none;\n\t}\n\t& .navbar-toggle:active {\n\t\ttransform: scale(0.9);\n\t}\n\t& .navbar-toggle-icon {\n\t\tdisplay: block;\n\t\twidth: 24px;\n\t\theight: 2px;\n\t\tbackground-color: currentColor;\n\t\tposition: relative;\n\t\ttransition: background-color var(--transition-normal);\n\t\tz-index: 1;\n\t}\n\t& .navbar-toggle-icon::before {\n\t\tcontent: \"\";\n\t\tdisplay: block;\n\t\twidth: 24px;\n\t\theight: 2px;\n\t\tbackground-color: currentColor;\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\ttop: -8px;\n\t\ttransition: all var(--transition-normal);\n\t}\n\t& .navbar-toggle-icon::after {\n\t\tcontent: \"\";\n\t\tdisplay: block;\n\t\twidth: 24px;\n\t\theight: 2px;\n\t\tbackground-color: currentColor;\n\t\tposition: absolute;\n\t\tleft: 0;\n\t\tbottom: -8px;\n\t\ttransition: all var(--transition-normal);\n\t}\n\t& .navbar-toggle.active .navbar-toggle-icon {\n\t\tbackground-color: transparent;\n\t}\n\t& .navbar-toggle.active .navbar-toggle-icon::before {\n\t\ttransform: rotate(45deg);\n\t\ttop: 0;\n\t}\n\t& .navbar-toggle.active .navbar-toggle-icon::after {\n\t\ttransform: rotate(-45deg);\n\t\tbottom: 0;\n\t}\n\n\t& .dropdown {\n\t\tposition: relative;\n\t}\n\t& .dropdown-toggle {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 0.3rem;\n\t}\n\t& .dropdown-chevron {\n\t\tdisplay: inline-flex;\n\t\talign-items: center;\n\t\ttransition: transform var(--transition-fast);\n\t\ttransform-origin: center;\n\t}\n\t& .dropdown-chevron svg {\n\t\twidth: 0.8em;\n\t\theight: 0.8em;\n\t}\n\t& .dropdown-chevron-down {\n\t\tdisplay: inline-flex;\n\t}\n\t& .dropdown-chevron-up {\n\t\tdisplay: none;\n\t}\n\t& .dropdown.show .dropdown-chevron-down {\n\t\tdisplay: none;\n\t}\n\t& .dropdown.show .dropdown-chevron-up {\n\t\tdisplay: inline-flex;\n\t}\n\t& .dropdown-menu {\n\t\tposition: absolute;\n\t\ttop: 100%;\n\t\tleft: 0;\n\t\tmin-width: 200px;\n\t\tbackground-color: color-mix(in srgb, var(--header-color) 92%, transparent);\n\t\tbackdrop-filter: blur(12px);\n\t\t-webkit-backdrop-filter: blur(12px);\n\t\tborder: var(--border-width) solid var(--accent);\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\tlist-style: none;\n\t\tz-index: 1000;\n\t\tbox-shadow: 0 6px 12px var(--accent-glow);\n\t\topacity: 0;\n\t\tvisibility: hidden;\n\t\ttransform: translateY(-5px);\n\t\ttransition: all 0.2s ease;\n\t}\n\t& .dropdown.show .dropdown-menu {\n\t\topacity: 1;\n\t\tvisibility: visible;\n\t\ttransform: translateY(0);\n\t}\n\t& .dropdown-item {\n\t\tdisplay: block;\n\t\tpadding: 10px 20px;\n\t\tcolor: var(--font-color);\n\t\ttext-decoration: none;\n\t\tfont-size: 16px;\n\t\tfont-weight: bold;\n\t\tbackground-color: var(--header-color);\n\t\ttransition: all var(--transition-fast);\n\t\tborder: none;\n\t\twidth: 100%;\n\t\ttext-align: left;\n\t\twhite-space: nowrap;\n\t}\n\t& .dropdown-item:hover,\n\t& .dropdown-item:focus,\n\t& .dropdown-item:active,\n\t& .dropdown-item.active {\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--accent);\n\t}\n\t& .dropdown-item.active:focus {\n\t\toutline: none;\n\t}\n\n\t& .theme-toggle {\n\t\tbackground: none;\n\t\tborder: none;\n\t\tcolor: var(--font-color);\n\t\tcursor: pointer;\n\t\tpadding: 11px 20px;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tfont-size: 1.35rem;\n\t\ttransition:\n\t\t\tcolor var(--transition-fast),\n\t\t\tbackground-color var(--transition-fast);\n\t}\n\t& .theme-toggle:hover,\n\t& .theme-toggle:focus {\n\t\tcolor: var(--accent);\n\t\tbackground-color: var(--hover-color);\n\t}\n\t& .theme-toggle:hover svg,\n\t& .theme-toggle:focus svg {\n\t\ttransform: rotate(8deg) scale(1.25);\n\t}\n\t& .theme-toggle:active {\n\t\tcolor: var(--accent);\n\t}\n\t& .theme-toggle:active svg {\n\t\ttransform: rotate(4deg) scale(1.1);\n\t}\n\t& .theme-toggle svg {\n\t\ttransition:\n\t\t\topacity var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\ttransform 0.2s cubic-bezier(0.34, 1.56, 0.64, 1),\n\t\t\tfill var(--transition-fast);\n\t\tfill: currentColor;\n\t}\n\n\t@media (max-width: 767px) {\n\t\t& .navbar-brand {\n\t\t\tdisplay: block;\n\t\t}\n\t\t& .navbar-toggle {\n\t\t\tdisplay: block;\n\t\t}\n\t\t& .navbar-collapse {\n\t\t\tposition: absolute;\n\t\t\ttop: 100%;\n\t\t\tleft: 0;\n\t\t\tright: 0;\n\t\t\tbackground-color: var(--header-color);\n\t\t\tborder-bottom: var(--border-width) solid var(--accent);\n\t\t\tflex-direction: column;\n\t\t\talign-items: stretch;\n\t\t\tmax-height: 0;\n\t\t\toverflow: hidden;\n\t\t\ttransition: max-height 0.25s ease-in;\n\t\t}\n\t\t& .navbar-collapse.show {\n\t\t\tmax-height: 800px;\n\t\t\toverflow-y: auto;\n\t\t\toverflow-x: hidden;\n\t\t\ttransition: max-height 0.8s ease-out;\n\t\t}\n\t\t& .navbar-nav {\n\t\t\tflex-direction: column;\n\t\t\twidth: 100%;\n\t\t\tmax-width: 100%;\n\t\t\toverflow-x: hidden;\n\t\t}\n\t\t& .navbar-nav.left,\n\t\t& .navbar-nav.right {\n\t\t\tmargin: 0;\n\t\t}\n\t\t& .navbar-nav.right {\n\t\t\tflex-direction: row;\n\t\t\tjustify-content: center;\n\t\t\tpadding: 10px 0;\n\t\t\tmargin-top: 10px;\n\t\t}\n\t\t& .navbar-nav.right .nav-item {\n\t\t\tdisplay: inline-flex;\n\t\t}\n\t\t& .navbar-nav.right .nav-link {\n\t\t\tpadding: 10px 15px;\n\t\t\theight: auto;\n\t\t}\n\t\t& .navbar-nav.left .nav-item {\n\t\t\twidth: 100%;\n\t\t\theight: auto;\n\t\t\toverflow: hidden;\n\t\t}\n\t\t& .navbar-nav.left .nav-link {\n\t\t\theight: auto;\n\t\t\tpadding: 12px 20px;\n\t\t\twidth: 100%;\n\t\t\tjustify-content: flex-start;\n\t\t}\n\t\t& .dropdown {\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t\twidth: 100%;\n\t\t}\n\t\t& .dropdown-menu {\n\t\t\tposition: static;\n\t\t\tborder: none;\n\t\t\tbox-shadow: none;\n\t\t\twidth: 100%;\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t\tmax-height: 0;\n\t\t\toverflow: hidden;\n\t\t\ttransition: max-height 0.4s ease-out;\n\t\t\torder: 2;\n\t\t}\n\t\t& .dropdown-toggle {\n\t\t\torder: 1;\n\t\t\twidth: 100%;\n\t\t}\n\t\t& .dropdown.show .dropdown-menu {\n\t\t\tmax-height: 500px;\n\t\t\ttransition: max-height 0.5s ease-out;\n\t\t}\n\t\t& .dropdown-item {\n\t\t\tpadding-left: 40px;\n\t\t\twidth: 100%;\n\t\t\ttext-align: left;\n\t\t\twhite-space: normal;\n\t\t\tword-wrap: break-word;\n\t\t}\n\t}\n}\n\n.gfc_pageViewStyle_rmw3pr {\n& .about-pic {\n\t\twidth: min(150px, 30vw);\n\t\taspect-ratio: 1 / 1;\n\t\theight: auto;\n\t\tborder-radius: 50%;\n\t\tmargin-bottom: 20px;\n\t\tobject-fit: cover;\n\t\ttransition: transform var(--transition-normal);\n\t}\n\t& .about-pic:hover {\n\t\ttransform: scale(1.05);\n\t}\n}\n\n.gfc_projectDetailStyle_1pu2fpm {\n& .project-title {\n\t\tcolor: var(--accent);\n\t\tfont-size: 1.5em;\n\t\tmargin: 0 0 0.02em 0;\n\t\tfont-weight: bold;\n\t}\n\t& .project-description {\n\t\tmargin: 0 0 0.5em 0;\n\t\tcolor: var(--text-light);\n\t\tfont-size: 1.2em;\n\t\tline-height: 1.6;\n\t}\n\t& .project-tags {\n\t\tmargin: 0.8em 0;\n\t\tfont-size: 1.1em;\n\t}\n\t& .text-center {\n\t\ttext-align: center;\n\t}\n\t& .youtube-video {\n\t\tmargin: 20px 0;\n\t}\n\t& .iframeWrapper {\n\t\tposition: relative;\n\t\tpadding-bottom: 56.25%;\n\t\tpadding-top: 25px;\n\t\theight: 0;\n\t}\n\t& .iframeWrapper iframe {\n\t\tposition: absolute;\n\t\ttop: 0;\n\t\tleft: 0;\n\t\twidth: 100%;\n\t\theight: 100%;\n\t\tmax-width: 100%;\n\t\toverflow: hidden;\n\t}\n\t& .demo-iframe-wrapper {\n\t\twidth: 100%;\n\t\tmargin: 20px 0;\n\t}\n\t& .demo-iframe-wrapper iframe {\n\t\twidth: 100%;\n\t\theight: 700px;\n\t\tmax-width: 100%;\n\t\tborder: none;\n\t\toverflow: hidden;\n\t}\n}\n\n.gfc_searchModalStyle_9hvz5o {\ndisplay: flex;\n\tposition: fixed;\n\ttop: 0;\n\tleft: 0;\n\tright: 0;\n\tbottom: 0;\n\tbackground-color: var(--background-color);\n\tz-index: 2000;\n\tflex-direction: column;\n\toverflow: hidden;\n\tvisibility: hidden;\n\topacity: 0;\n\ttransform: scale(0.95);\n\ttransition:\n\t\topacity 0.2s ease-in,\n\t\ttransform 0.2s ease-in,\n\t\tvisibility 0s linear 0.2s;\n\n\t&.show {\n\t\tvisibility: visible;\n\t\topacity: 1;\n\t\ttransform: scale(1);\n\t\ttransition:\n\t\t\topacity 0.25s ease-out,\n\t\t\ttransform 0.25s ease-out,\n\t\t\tvisibility 0s;\n\t}\n\n\t& .search-page-header {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\theight: 56px;\n\t\tpadding: 0 1rem;\n\t\tbackground-color: var(--header-color);\n\t\tborder-bottom: var(--border-width) solid var(--accent);\n\t\ttransition:\n\t\t\tbackground-color var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tcolor var(--theme-transition-duration) var(--theme-transition-timing),\n\t\t\tborder-color var(--theme-transition-duration) var(--theme-transition-timing);\n\t}\n\n\t&.show .search-page-header {\n\t\tanimation: slideDown var(--transition-normal) ease-out;\n\t}\n\n\t& .search-page-header-content {\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tgap: 0.75rem;\n\t\twidth: 100%;\n\t\tmax-width: 900px;\n\t}\n\n\t& .search-page-back {\n\t\tbackground: none;\n\t\tborder: none;\n\t\tcolor: var(--font-color);\n\t\tcursor: pointer;\n\t\tpadding: 0.5rem;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t\tjustify-content: center;\n\t\tfont-size: 1.2em;\n\t\ttransition: color var(--transition-fast);\n\t}\n\n\t& .search-page-back:hover {\n\t\tcolor: var(--accent);\n\t}\n\n\t& .search-page-input-wrapper {\n\t\tflex: 1;\n\t\tposition: relative;\n\t\tdisplay: flex;\n\t\talign-items: center;\n\t}\n\n\t& .search-page-input {\n\t\twidth: 100%;\n\t\tpadding: 0.5rem 2.5rem 0.5rem 1rem;\n\t\tbackground-color: var(--hover-color);\n\t\tborder: 1px solid var(--border-color);\n\t\tborder-radius: 20px;\n\t\tcolor: var(--font-color);\n\t\tfont-size: 1em;\n\t}\n\n\t& .search-page-input::-webkit-search-cancel-button {\n\t\t-webkit-appearance: none;\n\t\tappearance: none;\n\t}\n\n\t& .search-page-input:focus {\n\t\toutline: none;\n\t\tborder-color: var(--accent);\n\t\tbackground-color: var(--background-color);\n\t\tbox-shadow: 0 0 0 3px var(--accent-glow);\n\t}\n\n\t& .search-page-clear {\n\t\tposition: absolute;\n\t\tright: 0.5rem;\n\t\tbackground: none;\n\t\tborder: none;\n\t\tcolor: var(--text-light);\n\t\tcursor: pointer;\n\t\tpadding: 0.25rem 0.5rem;\n\t\tdisplay: none;\n\t\ttransition: color var(--transition-fast);\n\t}\n\n\t& .search-page-clear:hover {\n\t\tcolor: var(--accent);\n\t}\n\n\t& .search-page-clear.show {\n\t\tdisplay: block;\n\t}\n\n\t& .search-page-content {\n\t\tflex: 1;\n\t\toverflow-y: auto;\n\t\tpadding: 1rem;\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t}\n\n\t&.show .search-page-content {\n\t\tanimation: fadeIn 0.4s ease-out 0.1s both;\n\t}\n\n\t& .search-page-results {\n\t\tdisplay: flex;\n\t\tflex-direction: column;\n\t\tgap: 1.5rem;\n\t\twidth: 100%;\n\t\tmax-width: 900px;\n\t\ttext-align: left;\n\t}\n\n\t& .search-result-item.selected {\n\t\tborder-color: var(--accent);\n\t\tbackground-color: var(--hover-color);\n\t\tbox-shadow:\n\t\t\t0 0 0 1px var(--accent),\n\t\t\t0 0 15px var(--accent-glow);\n\t}\n\n\t& .search-no-results {\n\t\tpadding: var(--spacing-xl);\n\t\ttext-align: center;\n\t\tcolor: var(--text-light);\n\t}\n\n\t& .search-no-results p {\n\t\tmargin: 0;\n\t\tfont-size: 0.9em;\n\t}\n}\n\n.gfc_errorMessageStyle_oprnkd {\ntext-align: center;\n\tpadding: 2rem;\n\tmax-width: 600px;\n\tmargin: 0 auto;\n\n\t& h1 {\n\t\tcolor: #ff6b6b;\n\t\tmargin-bottom: 1rem;\n\t\tfont-size: 2em;\n\t}\n\t& p {\n\t\tcolor: var(--text-light);\n\t\tfont-size: 1.1em;\n\t}\n}\n\n.gfc_itemTagStyle_dqxz1s {\nbackground-color: var(--hover-color);\n\tcolor: var(--accent);\n\tpadding: var(--spacing-xs) var(--spacing-sm);\n\tborder-radius: var(--border-radius);\n\tfont-size: var(--font-size-sm);\n\tdisplay: inline-block;\n\tmargin: 2px;\n\n\t&.clickable-tag {\n\t\tcursor: pointer;\n\t\ttransition: all var(--transition-fast);\n\t}\n\t&.clickable-tag:hover {\n\t\tbackground-color: var(--accent);\n\t\tcolor: var(--background-color);\n\t\ttransform: translateY(-1px);\n\t\tbox-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);\n\t}\n}\n\n.gfc_giscusStyle_1ha953n {\nmax-width: 900px;\n\tmargin: 2.5rem auto;\n\tpadding: 1rem 0;\n\n\t& iframe {\n\t\tcolor-scheme: dark;\n\t}\n}\n\n.gfc_downloadButtonsStyle_8bp3j5 {\ndisplay: flex;\n\tflex-wrap: wrap;\n\tgap: 15px;\n\tmargin: 1.5em 0;\n\tjustify-content: flex-start;\n}\n\n.gfc_downloadBtnStyle_1d6dxk7 {\ndisplay: inline-flex;\n\talign-items: center;\n\tjustify-content: center;\n\tgap: 8px;\n\tpadding: 12px 24px;\n\tbackground-color: var(--hover-color);\n\tborder: 2px solid var(--accent);\n\tborder-radius: 8px;\n\tcolor: var(--font-color);\n\ttext-decoration: none;\n\tfont: 600 1em var(--font-family-primary);\n\ttransition: all var(--transition-normal);\n\tcursor: pointer;\n\tappearance: none;\n\n\t&:hover,\n\t&:focus {\n\t\tbackground-color: var(--hover-color);\n\t\tborder-color: var(--accent);\n\t\ttransform: translateY(-2px);\n\t\tbox-shadow: 0 4px 12px var(--accent-glow);\n\t\tcolor: var(--accent);\n\t\ttext-decoration: none;\n\t}\n\t&:active {\n\t\ttransform: translateY(0) scale(0.95);\n\t\ttext-decoration: none;\n\t}\n\t& svg,\n\t& .icon {\n\t\tflex-shrink: 0;\n\t\ttransition:\n\t\t\ttransform var(--transition-normal),\n\t\t\tcolor var(--transition-normal);\n\t}\n\t&:hover svg,\n\t&:hover .icon,\n\t&:focus svg,\n\t&:focus .icon {\n\t\ttransform: scale(1.1);\n\t\tcolor: var(--accent);\n\t}\n\t& span {\n\t\ttransition: color var(--transition-normal);\n\t}\n\t&:hover span,\n\t&:focus span {\n\t\tcolor: var(--accent);\n\t}\n}\n\n.gfc_markdownBodyStyle_gz2gda {\nfont-family: var(--font-family-primary);\n\tfont-size: 1em;\n\tline-height: 1.6;\n\tcolor: var(--text-light);\n\ttext-align: left;\n\n\t& h1, & h2, & h3, & h4, & h5, & h6 {\n\t\tcolor: var(--font-color);\n\t\tmargin: 1em 0 0.5em;\n\t\tfont-weight: bold;\n\t\tline-height: 1.25;\n\t}\n\t& h1 {\n\t\tfont-size: 1.8em;\n\t\tmargin-top: 0;\n\t}\n\t& h2 {\n\t\tfont-size: 1.4em;\n\t\tscroll-margin-top: 75px;\n\t}\n\t& h3 {\n\t\tfont-size: 1.2em;\n\t\tscroll-margin-top: 75px;\n\t}\n\t& p, & li {\n\t\tmargin: 0.5em 0;\n\t\tline-height: 1.6;\n\t\tfont-size: 1.1em;\n\t\tcolor: var(--text-light);\n\t}\n\t& ul, & ol {\n\t\tmargin: 0.5em 0;\n\t\tpadding-left: 2em;\n\t}\n\t& code:not([class*=\"language-\"]) {\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--font-color);\n\t\tpadding: 2px 6px;\n\t\tborder-radius: 3px;\n\t\tfont-family: var(--font-family-mono);\n\t\tfont-size: 0.9em;\n\t}\n\t& pre:not([class*=\"language-\"]) {\n\t\tbackground-color: var(--hover-color);\n\t\tpadding: 0.5em;\n\t\tborder-radius: 3px;\n\t\toverflow-x: auto;\n\t\tmargin: 0.5em 0;\n\t\tborder: 1px solid var(--border-color);\n\t\tfont-family: var(--font-family-mono);\n\t\tline-height: 1.4;\n\t}\n\t& pre[class*=\"language-\"] {\n\t\tmargin: 0.5em 0;\n\t\toverflow-x: auto;\n\t\tfont-family: var(--font-family-mono);\n\t\tline-height: 1.4;\n\t\tposition: relative;\n\t}\n\t& a:not(.download-btn) {\n\t\tcolor: var(--accent);\n\t\ttext-decoration: none;\n\t\tdisplay: inline-block;\n\t\ttransition: transform var(--transition-fast);\n\t}\n\t& a:not(.download-btn):hover {\n\t\ttext-decoration: none;\n\t\ttransform: translateY(-2px);\n\t}\n\t& blockquote {\n\t\tborder-left: 4px solid var(--accent);\n\t\tpadding-left: 1em;\n\t\tmargin: 0.5em 0;\n\t\tfont-style: italic;\n\t}\n\t& table {\n\t\twidth: 100%;\n\t\tborder-collapse: collapse;\n\t\tmargin: 0.5em 0;\n\t}\n\t& th, & td {\n\t\tborder: 1px solid var(--border-color);\n\t\tpadding: 0.5em 1em;\n\t\ttext-align: left;\n\t}\n\t& th {\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--accent);\n\t\tfont-weight: bold;\n\t}\n\t& hr {\n\t\tborder: none;\n\t\tborder-top: 1px solid var(--border-color);\n\t\tmargin: 0.5em 0;\n\t}\n\t& .mermaid {\n\t\tdisplay: flex;\n\t\tjustify-content: center;\n\t\tmargin: 1em 0;\n\t\toverflow-x: auto;\n\t}\n\t& .mermaid svg {\n\t\tmax-width: 100%;\n\t\theight: auto;\n\t}\n\t& .copy-code-button {\n\t\tposition: absolute;\n\t\ttop: 0.5em;\n\t\tright: 0.5em;\n\t\tpadding: 0.4em 0.8em;\n\t\tfont-size: 0.85em;\n\t\tfont-family: var(--font-family-primary);\n\t\tfont-weight: 700;\n\t\tbackground-color: var(--hover-color);\n\t\tcolor: var(--font-color);\n\t\tborder: 1px solid var(--border-color);\n\t\tborder-radius: var(--border-radius);\n\t\tcursor: pointer;\n\t\topacity: 0;\n\t\ttransition:\n\t\t\topacity var(--transition-fast),\n\t\t\tbackground-color var(--transition-fast);\n\t\tz-index: 10;\n\t}\n\t& pre:hover .copy-code-button {\n\t\topacity: 1;\n\t}\n\t@media (hover: none) {\n\t\t& .copy-code-button {\n\t\t\topacity: 1;\n\t\t}\n\t}\n\t& .copy-code-button:hover {\n\t\tbackground-color: var(--accent);\n\t\tcolor: var(--background-color);\n\t}\n\t& .copy-code-button:active {\n\t\ttransform: scale(0.95);\n\t}\n\t& .copy-code-button.copied {\n\t\tbackground-color: #10b981;\n\t\tcolor: white;\n\t\topacity: 1;\n\t}\n}");
main();
