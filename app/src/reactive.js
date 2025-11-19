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

export const Signals = {
	// Create a reactive signal with optional custom equality check
	create(initialValue, equals = (a, b) => a === b) {
		let value = initialValue;
		const subscribers = new Set();

		const signal = {
			get() {
				return value;
			},
			set(newValue) {
				if (!equals(value, newValue)) {
					value = newValue;
					for (const fn of subscribers) {
						fn(value);
					}
				}
			},
			subscribe(fn) {
				subscribers.add(fn);
				fn(value); // Call immediately with current value
				return () => subscribers.delete(fn); // Return unsubscribe function
			},
			update(fn) {
				signal.set(fn(value));
			},
		};

		return signal;
	},

	// Create a computed signal that derives from other signals
	computed(fn, deps = []) {
		const signal = this.create(fn());
		const unsubscribers = [];

		// Skip initial call to prevent duplicate computation
		// Subscribe to all dependencies
		for (const dep of deps) {
			const unsub = dep.subscribe(() => {
				signal.set(fn());
			});
			unsubscribers.push(unsub);
		}

		// Add cleanup method
		signal.dispose = () => {
			for (const unsub of unsubscribers) {
				unsub();
			}
		};

		return signal;
	},

	// Batch multiple signal updates to prevent multiple re-renders
	batch(fn) {
		// For now, just run the function
		// Could be extended with actual batching logic
		fn();
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
			element.innerHTML = result.content;
		};

		return { update };
	},

	// Auto-update element when signal changes
	bind(element, signal, templateFn) {
		return signal.subscribe((value) => {
			const result = templateFn(value);
			element.innerHTML = result.content;
		});
	},

	// Bind signal to element attribute
	bindAttr(element, attr, signal) {
		return signal.subscribe((value) => {
			element.setAttribute(attr, value);
		});
	},

	// Bind signal to element text content (auto-escaped)
	bindText(element, signal) {
		return signal.subscribe((value) => {
			element.textContent = value;
		});
	},
};
