// ===========================================
// REACTIVE SYSTEM
// ===========================================

// HTML UTILITIES
let escapeElement;
export const html = (strings, ...values) => ({
	__safe: true,
	content: strings.reduce((acc, str, i) => {
		const v = values[i];
		if (v == null) return acc + str;
		if (v.__safe) return acc + str + v.content;
		if (!escapeElement) escapeElement = document.createElement("div");
		escapeElement.textContent = String(v);
		return acc + str + escapeElement.innerHTML;
	}, ""),
});

export const trusted = (content) => ({ __safe: true, content });
export const join = (items, separator = "") => ({
	__safe: true,
	content: items
		.map((i) => (i?.__safe ? i.content : String(i)))
		.join(typeof separator === "string" ? separator : separator.content || ""),
});

// SIGNALS
let activeContext = null;
let batchPending = false;
const batchQueue = new Set();

export const Signals = {
	create(value, equals = (a, b) => a === b) {
		const subs = new Set();
		const signal = {
			get() {
				if (activeContext) activeContext.add(signal);
				return value;
			},
			set(newVal) {
				if (equals(value, newVal)) return;
				value = newVal;
				if (batchPending) {
					for (const fn of subs) batchQueue.add(fn);
				} else {
					for (const fn of [...subs]) fn(value);
				}
			},
			subscribe(fn) {
				subs.add(fn);
				fn(value);
				return () => subs.delete(fn);
			},
			subscribeInternal(fn) {
				subs.add(fn);
				return () => subs.delete(fn);
			},
			update(fn) {
				signal.set(fn(value));
			},
		};
		return signal;
	},

	computed(fn) {
		const result = Signals.create();
		let deps = new Set();
		const unsubs = [];
		let computing = false;

		const run = () => {
			if (computing) return;
			computing = true;
			const prev = activeContext;
			activeContext = new Set();
			try {
				result.set(fn());
				const newDeps = activeContext;
				// Remove unused
				[...deps]
					.filter((d) => !newDeps.has(d))
					.forEach((d) => {
						const idx = unsubs.findIndex((u) => u.dep === d);
						if (idx > -1) unsubs.splice(idx, 1)[0].unsub();
					});
				// Add new
				[...newDeps]
					.filter((d) => !deps.has(d))
					.forEach((d) => {
						unsubs.push({ dep: d, unsub: d.subscribeInternal(scheduler) });
					});
				deps = newDeps;
			} finally {
				activeContext = prev;
				computing = false;
			}
		};

		const scheduler = () => {
			if (batchPending) batchQueue.add(run);
			else run();
		};

		run();
		result.dispose = () => {
			for (const u of unsubs) u.unsub();
			unsubs.length = 0;
			deps.clear();
		};
		return result;
	},

	batch(fn) {
		batchPending = true;
		try {
			return fn();
		} finally {
			batchPending = false;
			const q = new Set(batchQueue);
			batchQueue.clear();
			for (const fn of q) fn();
		}
	},
};

// REACTIVE UTILITIES
export const Reactive = {
	mount(el, fn) {
		const update = () => {
			const res = fn();
			el.innerHTML = res.__safe ? res.content : String(res);
		};
		update();
		return { update };
	},
	bind(el, sig, fn) {
		return sig.subscribe((val) => {
			const v = val === undefined ? sig.get() : val;
			const res = fn(v);
			el.innerHTML = res.__safe ? res.content : String(res);
		});
	},

	bindAttr: (el, attr, sig) =>
		sig.subscribe((val) =>
			el.setAttribute(attr, val === undefined ? sig.get() : val),
		),
	bindText: (el, sig) =>
		sig.subscribe((val) => {
			el.textContent = val === undefined ? sig.get() : val;
		}),
	bindBoolAttr: (el, attr, sig) =>
		sig.subscribe((val) =>
			(val === undefined ? sig.get() : val)
				? el.setAttribute(attr, "")
				: el.removeAttribute(attr),
		),
	bindClass: (el, cls, sig) =>
		sig.subscribe((val) =>
			el.classList.toggle(cls, val === undefined ? sig.get() : val),
		),

	scan(root, scope) {
		const unsubs = [];
		const resolve = (path) => path.split(".").reduce((o, k) => o?.[k], scope);

		const handlers = {
			"data-text": (el, val) => Reactive.bindText(el, val),
			"data-html": (el, val) =>
				val.subscribe((v) => {
					const res = v === undefined ? val.get() : v;
					el.innerHTML = res?.__safe ? res.content : String(res);
				}),
			"data-visible": (el, val) =>
				val.subscribe((v) => {
					el.style.display = (v === undefined ? val.get() : v) ? "" : "none";
				}),
			"data-model": (el, val) => {
				if (!val?.set) return;
				unsubs.push(
					val.subscribe((v) => {
						const value = v === undefined ? val.get() : v;
						if (el.value !== value) el.value = value || "";
					}),
				);
				const h = () => val.set(el.value);
				el.addEventListener("input", h);
				return () => el.removeEventListener("input", h);
			},
		};

		const walk = document.createTreeWalker(root, 1);
		let node = walk.currentNode;
		while (node) {
			const el = node;
			if (el.nodeType === 1) {
				for (const { name, value } of [...el.attributes]) {
					const val = resolve(value);
					if (handlers[name]) {
						const u = handlers[name](el, val);
						if (u) unsubs.push(u);
					} else if (name.startsWith("data-class-")) {
						unsubs.push(Reactive.bindClass(el, name.slice(11), val));
					} else if (name.startsWith("data-attr-")) {
						unsubs.push(Reactive.bindAttr(el, name.slice(10), val));
					} else if (name.startsWith("data-bool-")) {
						unsubs.push(Reactive.bindBoolAttr(el, name.slice(10), val));
					} else if (name.startsWith("data-on-")) {
						if (typeof val === "function") {
							const h = (e) => Signals.batch(() => val.call(scope, e));
							const evt = name.slice(8);
							el.addEventListener(evt, h);
							unsubs.push(() => el.removeEventListener(evt, h));
						}
					}
				}
			}
			node = walk.nextNode();
		}
		return () => {
			for (const f of unsubs) f?.();
		};
	},
	createComponent() {
		const unsubs = [],
			computed = [];
		const c = {
			track: (u) => {
				if (u) unsubs.push(u);
				return u;
			},
			computed: (fn) => {
				const s = Signals.computed(fn);
				computed.push(s);
				return s;
			},
			scan: (r, s) => c.track(Reactive.scan(r, s)),
			cleanup: () => {
				for (const f of unsubs) f();
				for (const s of computed) s.dispose();
				unsubs.length = computed.length = 0;
			},
		};
		for (const m of [
			"bind",
			"bindAttr",
			"bindBoolAttr",
			"bindClass",
			"bindText",
		]) {
			c[m] = (...a) => c.track(Reactive[m](...a));
		}
		return c;
	},

	Component: class {
		constructor() {
			this._c = Reactive.createComponent();
			for (const m of [
				"bind",
				"bindAttr",
				"bindBoolAttr",
				"bindClass",
				"bindText",
				"track",
			]) {
				this[m] = (...a) => this._c[m](...a);
			}
		}
		signal(v) {
			return Signals.create(v);
		}
		computed(fn) {
			return this._c.computed(fn);
		}
		batch(fn) {
			return Signals.batch(fn);
		}
		initState() {
			if (this.state) this._proc(this.state(), this);
		}
		_proc(obj, tgt) {
			Object.entries(obj).forEach(([k, v]) => {
				if (typeof v === "function") tgt[k] = this.computed(v);
				else if (v?.get) tgt[k] = v;
				else if (
					v &&
					typeof v === "object" &&
					!Array.isArray(v) &&
					Object.values(v).some((x) => x?.get)
				)
					tgt[k] = v;
				else tgt[k] = this.signal(v);
			});
		}
		scan(r) {
			return this._c.scan(r, this);
		}
		render() {
			const t = document.createElement("div");
			t.innerHTML = this.template().content;
			const el = t.firstElementChild;
			if (!el) throw new Error("Template must return a single root element");
			this.scan(el);
			return el;
		}
		mountTo(containerId) {
			const container = document.getElementById(containerId);
			if (!container) {
				console.warn(`Container #${containerId} not found`);
				return null;
			}
			const element = this.render();
			container.innerHTML = "";
			container.appendChild(element);
			return element;
		}
		cleanup() {
			this._c.cleanup();
		}
	},
};
