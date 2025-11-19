// ===========================================
// REACTIVE SYSTEM
// ===========================================
// Lightweight reactive primitives for building UIs

// ===========================================
// HTML UTILITY FUNCTIONS
// ===========================================

// Reusable DOM element for efficient HTML escaping (lazy-initialized)
let escapeElement = null;

// Tagged template literal for auto-escaping HTML
// Returns a safe-marked object so nested templates work automatically
export const html = (strings, ...values) => {
	const content = strings.reduce((acc, str, i) => {
		const value = values[i];
		if (value === undefined || value === null) return acc + str;
		// Check if it's a safe-marked object (from nested html`` or trusted())
		if (value?.__safe) return acc + str + value.content;
		// Auto-escape everything else using reusable DOM element
		if (!escapeElement) escapeElement = document.createElement("div");
		escapeElement.textContent = String(value);
		return acc + str + escapeElement.innerHTML;
	}, "");
	// Return safe-marked object so it can be nested without re-escaping
	return { __safe: true, content };
};

// Mark HTML as trusted/safe (for external HTML sources like marked.parse)
// Use sparingly - only for trusted HTML!
export const trusted = (content) => ({ __safe: true, content });

// Helper for joining multiple html`` templates (useful for lists)
export const join = (items, separator = "") => {
	const sep =
		typeof separator === "string" ? separator : separator.content || "";
	const content = items
		.map((item) => (item?.__safe ? item.content : String(item)))
		.join(sep);
	return { __safe: true, content };
};

// ===========================================
// SIGNAL SYSTEM
// ===========================================

// Global state for dependency tracking and batching
let activeContext = null;
let batchPending = false;
const batchQueue = new Set();

export const Signals = {
	// Create a reactive signal with optional custom equality check
	create(initialValue, equals = (a, b) => a === b) {
		let value = initialValue;
		const subscribers = new Set();

		const signal = {
			get() {
				// Automatic dependency tracking
				if (activeContext) {
					activeContext.add(signal);
				}
				return value;
			},
			set(newValue) {
				if (!equals(value, newValue)) {
					value = newValue;

					if (batchPending) {
						// In a batch, queue subscribers instead of running them
						for (const fn of subscribers) {
							batchQueue.add(fn);
						}
					} else {
						// Normal execution: run subscribers immediately
						// We copy to avoid infinite loops if a subscriber removes itself
						for (const fn of [...subscribers]) {
							fn(value);
						}
					}
				}
			},
			subscribe(fn) {
				subscribers.add(fn);
				fn(value); // Call immediately with current value
				return () => subscribers.delete(fn); // Return unsubscribe function
			},
			// Internal method to subscribe without immediate callback
			// Used by computed signals to prevent double-execution and ensure stable identity for batching
			subscribeInternal(fn) {
				subscribers.add(fn);
				return () => subscribers.delete(fn);
			},
			update(fn) {
				signal.set(fn(value));
			},
		};

		return signal;
	},

	// Create a computed signal that derives from other signals
	// Automatically tracks dependencies accessed during execution
	computed(fn) {
		// Create internal signal to hold the computed value
		const result = Signals.create(undefined);
		let dependencies = new Set();
		const unsubscribers = [];
		let computing = false;
		let pendingRun = false;

		const runComputationNow = () => {
			computing = true;
			pendingRun = false;

			const prevContext = activeContext;
			activeContext = new Set();

			try {
				const newValue = fn();
				result.set(newValue);

				const newDeps = activeContext;
				const added = [...newDeps].filter((d) => !dependencies.has(d));
				const removed = [...dependencies].filter((d) => !newDeps.has(d));

				for (const dep of removed) {
					const index = unsubscribers.findIndex((u) => u.dep === dep);
					if (index !== -1) {
						unsubscribers[index].unsub();
						unsubscribers.splice(index, 1);
					}
				}

				for (const dep of added) {
					const unsub = dep.subscribeInternal(() => runComputation());
					unsubscribers.push({ dep, unsub });
				}

				dependencies = newDeps;
			} finally {
				activeContext = prevContext;
				computing = false;
			}
		};

		// Revised Computed Implementation for Stability:
		const runComputation = () => {
			if (computing) return;

			// If batching, queue a single run
			if (batchPending) {
				if (!pendingRun) {
					pendingRun = true;
					batchQueue.add(runComputationNow);
				}
				return;
			}

			runComputationNow();
		};

		runComputation();

		// Add cleanup method to signal
		result.dispose = () => {
			unsubscribers.forEach(({ unsub }) => unsub());
			unsubscribers.length = 0;
			dependencies.clear();
		};

		return result;
	},

	// Batch multiple signal updates to prevent multiple re-renders
	batch(fn) {
		batchPending = true;
		try {
			return fn();
		} finally {
			batchPending = false;
			// Process all queued updates
			const queue = new Set(batchQueue);
			batchQueue.clear();
			queue.forEach(sub => sub());
		}
	},
};

// ===========================================
// REACTIVE COMPONENT UTILITIES
// ===========================================

export const Reactive = {
	// Mount a reactive template to a DOM element
	mount(element, templateFn) {
		const update = () => {
			const result = templateFn();
			element.innerHTML = result.__safe ? result.content : String(result);
		};
		update();
		return { update };
	},

	// Auto-update element when signal changes
	bind(element, signal, templateFn) {
		return signal.subscribe((value) => {
			const result = templateFn(value);
			element.innerHTML = result.__safe ? result.content : String(result);
		});
	},

	// Bind signal to element attribute
	bindAttr(element, attr, signal) {
		return signal.subscribe((value) => {
			const val = value === undefined ? signal.get() : value;
			element.setAttribute(attr, val);
		});
	},

	// Bind signal to element text content (auto-escaped)
	bindText(element, signal) {
		return signal.subscribe((value) => {
			const val = value === undefined ? signal.get() : value;
			element.textContent = val;
		});
	},

	// Bind signal to element boolean attribute (like disabled, checked, readonly)
	bindBoolAttr(element, attr, signal) {
		return signal.subscribe((value) => {
			const val = value === undefined ? signal.get() : value;
			if (val) {
				element.setAttribute(attr, "");
			} else {
				element.removeAttribute(attr);
			}
		});
	},

	// Bind signal to element class toggle
	bindClass(element, className, signal) {
		return signal.subscribe((value) => {
			const val = value === undefined ? signal.get() : value;
			element.classList.toggle(className, val);
		});
	},

	// Scan DOM for data-bind attributes and apply bindings
	scan(root, scope) {
		const unsubscribers = [];

		// Helper to resolve path (e.g. "user.name" -> scope.user.name)
		const resolve = (path) =>
			path.split(".").reduce((obj, key) => obj?.[key], scope);

		// Process a single node
		const processNode = (element) => {
			for (const { name, value } of element.attributes) {
				if (name === "data-text") {
					unsubscribers.push(Reactive.bindText(element, resolve(value)));
				} else if (name === "data-html") {
					const signal = resolve(value);
					unsubscribers.push(
						signal.subscribe(() => {
							const result = signal.get();
							element.innerHTML = result?.__safe ? result.content : String(result);
						}),
					);
				} else if (name === "data-visible") {
					const signal = resolve(value);
					unsubscribers.push(
						signal.subscribe((val) => {
							const v = val === undefined ? signal.get() : val;
							element.style.display = v ? "" : "none";
						}),
					);
				} else if (name.startsWith("data-class-")) {
					const className = name.replace("data-class-", "");
					unsubscribers.push(Reactive.bindClass(element, className, resolve(value)));
				} else if (name.startsWith("data-attr-")) {
					const attr = name.replace("data-attr-", "");
					unsubscribers.push(Reactive.bindAttr(element, attr, resolve(value)));
				} else if (name.startsWith("data-bool-")) {
					const attr = name.replace("data-bool-", "");
					unsubscribers.push(Reactive.bindBoolAttr(element, attr, resolve(value)));
				} else if (name.startsWith("data-on-")) {
					const eventName = name.replace("data-on-", "");
					const handler = resolve(value);
					if (typeof handler === "function") {
						// Bind handler to scope if it's a method and auto-batch
						const boundHandler = handler.bind(scope);
						const batchedHandler = (e) => Signals.batch(() => boundHandler(e));
						element.addEventListener(eventName, batchedHandler);
						unsubscribers.push(() => element.removeEventListener(eventName, batchedHandler));
					}
				} else if (name === "data-model") {
					const signal = resolve(value);
					if (signal?.set) {
						// 1. Signal -> Element
						unsubscribers.push(
							signal.subscribe((val) => {
								if (element.value !== val) {
									element.value = val;
								}
							}),
						);
						// 2. Element -> Signal
						const handler = () => {
							signal.set(element.value);
						};
						element.addEventListener("input", handler);
						unsubscribers.push(() => element.removeEventListener("input", handler));
					}
				}
			}
		};

		// Walk the tree
		const walker = document.createTreeWalker(root, 1, null, false);
		let node = walker.currentNode;
		while (node) {
			if (node.nodeType === 1) {
				processNode(node);
			}
			node = walker.nextNode();
		}

		return () => unsubscribers.forEach((fn) => fn());
	},

	createComponent() {
		const unsubscribers = [];
		const computedSignals = [];

		const component = {
			track(unsub) {
				if (unsub) unsubscribers.push(unsub);
				return unsub;
			},
			computed(fn, deps = []) {
				const signal = Signals.computed(fn, deps);
				computedSignals.push(signal);
				return signal;
			},
			scan(root, scope) {
				return component.track(Reactive.scan(root, scope));
			},
			cleanup() {
				unsubscribers.forEach(fn => fn());
				computedSignals.forEach(s => s.dispose?.());
				unsubscribers.length = computedSignals.length = 0;
			}
		};

		// Create tracked wrappers for all Reactive methods
		['bind', 'bindAttr', 'bindBoolAttr', 'bindClass', 'bindText'].forEach(method => {
			component[method] = (...args) => component.track(Reactive[method](...args));
		});

		return component;
	},

	// Base Component class for easier bootstrapping
	Component: class {
		constructor() {
			this._component = Reactive.createComponent();
		}

		// Create a signal (helper for consistency)
		signal(initialValue) {
			return Signals.create(initialValue);
		}

		// Create a computed signal that is automatically tracked
		computed(fn) {
			return this._component.computed(fn);
		}

		// Batch updates (helper for consistency)
		batch(fn) {
			return Signals.batch(fn);
		}

		// Initialize state from state() method
		initState() {
			if (typeof this.state !== 'function') return;

			const stateDefinition = this.state();
			this._processStateObject(stateDefinition, this);
		}

		// Recursively process state definition object
		_processStateObject(obj, target) {
			for (const [key, value] of Object.entries(obj)) {
				if (typeof value === 'function') {
					// Functions become computed signals
					target[key] = this.computed(value);
				} else if (value && typeof value === 'object' && typeof value.get === 'function') {
					// Already a signal - use as-is
					target[key] = value;
				} else if (value && typeof value === 'object' && !Array.isArray(value)) {
					// Object - check if it contains signals
					const hasSignals = Object.values(value).some(v => v && typeof v === 'object' && typeof v.get === 'function');
					if (hasSignals) {
						// Contains signals - assign the object directly
						target[key] = value;
					} else {
						// Plain object - wrap in signal
						target[key] = this.signal(value);
					}
				} else {
					// Primitive - wrap in signal
					target[key] = this.signal(value);
				}
			}
		}

		// Scan root element for bindings, using this instance as scope
		scan(root) {
			return this._component.scan(root, this);
		}

		// Render template and automatically scan for bindings
		render() {
			if (!this.template) {
				throw new Error("Component must implement template() method");
			}

			const result = this.template();
			const temp = document.createElement("div");
			temp.innerHTML = result.content;

			const element = temp.firstElementChild;
			if (!element) {
				throw new Error("Template must return a single root element");
			}

			this.scan(element);
			return element;
		}

		// Cleanup component resources
		cleanup() {
			this._component.cleanup();
		}
	},
};
