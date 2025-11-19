// Test reactive system - Signals and Reactive utilities
import { describe, test } from "node:test";
import assert from "node:assert/strict";
import "./setup.js";
import { Signals, Reactive, html } from "../app/src/reactive.js";

describe("Signals", () => {
	test("should create signal with initial value", () => {
		const count = Signals.create(0);
		assert.equal(count.get(), 0);
	});

	test("should update signal value", () => {
		const count = Signals.create(0);
		count.set(5);
		assert.equal(count.get(), 5);
	});

	test("should notify subscribers on change", () => {
		const count = Signals.create(0);
		let callCount = 0;
		let lastValue = null;

		count.subscribe((value) => {
			callCount++;
			lastValue = value;
		});

		assert.equal(callCount, 1, "Should call immediately"); // Called immediately
		assert.equal(lastValue, 0);

		count.set(5);
		assert.equal(callCount, 2, "Should call on update");
		assert.equal(lastValue, 5);
	});

	test("should not notify if value unchanged", () => {
		const count = Signals.create(5);
		let callCount = 0;

		count.subscribe(() => callCount++);
		assert.equal(callCount, 1, "Should call immediately"); // Initial call

		count.set(5); // Same value
		assert.equal(callCount, 1, "Should not call again for same value"); // Not called again
	});

	test("should support unsubscribe", () => {
		const count = Signals.create(0);
		let callCount = 0;

		const unsubscribe = count.subscribe(() => callCount++);
		assert.equal(callCount, 1, "Should call immediately");

		unsubscribe();
		count.set(5);
		assert.equal(callCount, 1, "Should not call after unsubscribe"); // Not called after unsubscribe
	});

	test("should update signal with function", () => {
		const count = Signals.create(5);
		count.update((n) => n * 2);
		assert.equal(count.get(), 10);
	});

	test("should support multiple subscribers", () => {
		const count = Signals.create(0);
		let calls1 = 0;
		let calls2 = 0;

		count.subscribe(() => calls1++);
		count.subscribe(() => calls2++);

		assert.equal(calls1, 1, "First subscriber called immediately");
		assert.equal(calls2, 1, "Second subscriber called immediately");

		count.set(10);
		assert.equal(calls1, 2, "First subscriber called on update");
		assert.equal(calls2, 2, "Second subscriber called on update");
	});
});

describe("Computed Signals", () => {
	test("should create computed signal", () => {
		const firstName = Signals.create("John");
		const lastName = Signals.create("Doe");
		const fullName = Signals.computed(
			() => `${firstName.get()} ${lastName.get()}`,
			[firstName, lastName],
		);

		assert.equal(fullName.get(), "John Doe");
	});

	test("should update when dependencies change", () => {
		const a = Signals.create(2);
		const b = Signals.create(3);
		const sum = Signals.computed(() => a.get() + b.get(), [a, b]);

		assert.equal(sum.get(), 5);

		a.set(10);
		assert.equal(sum.get(), 13);

		b.set(7);
		assert.equal(sum.get(), 17);
	});

	test("should support dispose", () => {
		const count = Signals.create(0);
		const doubled = Signals.computed(() => count.get() * 2, [count]);

		assert.equal(doubled.get(), 0);
		doubled.dispose();

		count.set(5);
		assert.equal(doubled.get(), 0, "Should not update after dispose"); // Not updated after dispose
	});

	test("should handle multiple computed dependencies", () => {
		const x = Signals.create(2);
		const y = Signals.create(3);
		const z = Signals.create(4);
		const result = Signals.computed(() => x.get() * y.get() + z.get(), [x, y, z]);

		assert.equal(result.get(), 10); // 2 * 3 + 4 = 10

		x.set(5);
		assert.equal(result.get(), 19); // 5 * 3 + 4 = 19

		z.set(10);
		assert.equal(result.get(), 25); // 5 * 3 + 10 = 25
	});
});

describe("Reactive.mount", () => {
	test("should mount template to element", () => {
		const div = document.createElement("div");
		const component = Reactive.mount(div, () => html`<span>Hello</span>`);

		component.update();
		assert.equal(div.innerHTML, "<span>Hello</span>");
	});

	test("should update on manual call", () => {
		const div = document.createElement("div");
		let counter = 0;
		const component = Reactive.mount(div, () => html`<span>Count: ${counter}</span>`);

		component.update();
		assert.equal(div.innerHTML, "<span>Count: 0</span>");

		counter = 5;
		component.update();
		assert.equal(div.innerHTML, "<span>Count: 5</span>");
	});
});

describe("Reactive.bind", () => {
	test("should bind signal to element", () => {
		const div = document.createElement("div");
		const message = Signals.create("Hello");

		Reactive.bind(div, message, (value) => html`<span>${value}</span>`);
		assert.equal(div.innerHTML, "<span>Hello</span>");

		message.set("World");
		assert.equal(div.innerHTML, "<span>World</span>");
	});

	test("should auto-escape content", () => {
		const div = document.createElement("div");
		const content = Signals.create("<script>alert('xss')</script>");

		Reactive.bind(div, content, (value) => html`<div>${value}</div>`);
		assert.ok(div.innerHTML.includes("&lt;script&gt;"));
		assert.ok(!div.innerHTML.includes("<script>"));
	});
});

describe("Reactive.bindText", () => {
	test("should bind signal to text content", () => {
		const span = document.createElement("span");
		const text = Signals.create("Initial");

		Reactive.bindText(span, text);
		assert.equal(span.textContent, "Initial");

		text.set("Updated");
		assert.equal(span.textContent, "Updated");
	});

	test("should escape HTML in text content", () => {
		const span = document.createElement("span");
		const text = Signals.create("<b>Bold</b>");

		Reactive.bindText(span, text);
		assert.equal(span.textContent, "<b>Bold</b>");
		assert.equal(span.innerHTML, "&lt;b&gt;Bold&lt;/b&gt;");
	});
});

describe("Reactive.bindAttr", () => {
	test("should bind signal to attribute", () => {
		const div = document.createElement("div");
		const className = Signals.create("active");

		Reactive.bindAttr(div, "class", className);
		assert.equal(div.getAttribute("class"), "active");

		className.set("inactive");
		assert.equal(div.getAttribute("class"), "inactive");
	});

	test("should bind to data attributes", () => {
		const div = document.createElement("div");
		const status = Signals.create("loading");

		Reactive.bindAttr(div, "data-status", status);
		assert.equal(div.getAttribute("data-status"), "loading");

		status.set("loaded");
		assert.equal(div.getAttribute("data-status"), "loaded");
	});
});

describe("Signals.batch", () => {
	test("should execute batch function", () => {
		const count = Signals.create(0);
		let executed = false;

		Signals.batch(() => {
			count.set(5);
			executed = true;
		});

		assert.equal(executed, true);
		assert.equal(count.get(), 5);
	});
});
