---
title: "Building Reactive.js: A Minimal Signals-Based Library"
date: "2025-11-26"
excerpt: "How I built a lightweight reactive state management library inspired by modern frameworks, and converted this portfolio website to use it."
tags: ["JavaScript", "Web Development", "Reactive Programming", "Microtastic"]
---

After [migrating to Microtastic](/?blog=2025-11-01-migrating-to-microtastic), I had a minimal build setup. But something was missing: a clean way to manage interactive state.

So I built one. And then bundled it with Microtastic.

## Wait, Another Tool?

I know, I know. I [championed simplicity](/?blog=2025-10-21-vibing-portfolio-website) and avoiding frameworks. But there's a difference between *avoiding complexity* and *avoiding tools*.

Heavy frameworks = configuration hell, massive dependencies, breaking changes every version.

Focused tools = one thing well, ~750 lines you can read in 10 minutes, makes code simpler.

Reactive.js is the latter. It solved a real problem I had.

## The Problem

My portfolio had interactive features: theme toggling, search, contact forms. I was managing state with plain JavaScript—event listeners everywhere, manual DOM updates, callbacks scattered around.

It worked, but it felt... messy. Every interactive component needed:
- Manual event listener setup
- Imperative DOM updates
- State scattered across closures
- No clear reactivity model

I'd seen how elegant Vue 3's Composition API and Solid.js made reactivity. I wanted that simplicity, but without the framework baggage.

## The Inspiration

I drew ideas from several sources:
- **SolidJS**: Signals as the core primitive, fine-grained reactivity
- **Alpine.js**: Declarative data-attribute bindings (`data-*`)
- **Preact Signals**: Minimal API surface, just what you need
- **Lit**: Template literal approach for HTML

The goal: combine the best parts, keep it tiny (~750 lines), zero dependencies.

## What I Built

`reactive.js` is a signals-based reactive system with three core concepts:

### 1. Signals (Reactive State)

```javascript
const count = Signals.create(0);
count.set(count.get() + 1);  // Update
count.subscribe(v => console.log(v));  // Listen
```

Simple getter/setter with subscriptions. When a signal changes, subscribers run.

### 2. Computed Values

```javascript
const double = Signals.computed(() => count.get() * 2);
```

Automatically tracks dependencies and recalculates. Change `count`, `double` updates.

### 3. Components

```javascript
class Counter extends Reactive.Component {
  state() {
    return {
      count: this.signal(0)
    };
  }
  
  template() {
    return html`
      <button data-on-click=${() => this.count.set(this.count.get() + 1)}>
        Count: <span data-text=${this.count}></span>
      </button>
    `;
  }
}
```

Declarative binding with `data-*` attributes. No manual DOM manipulation needed.

## The Features

**Reactive primitives:**
- `signal()` - reactive state
- `computed()` - derived values
- `computedAsync()` - async computed with cancellation
- `effect()` - side effects that react to changes
- `batch()` - batch multiple updates

**Declarative binding:**
- `data-text` - bind text content
- `data-html` - bind HTML (with auto-escaping)
- `data-attr-*` - bind attributes
- `data-class-*` - toggle classes
- `data-on-*` - event handlers
- `data-model` - two-way binding
- `data-ref` - element references

**Component lifecycle:**
- `state()` - define reactive state
- `init()` - setup before render
- `template()` - return HTML
- `mount()` - post-render setup

**HTML templates with XSS protection:**

```javascript
const name = "Alice";
const userInput = "<script>alert('xss')</script>";

const template = html`
  <h1>Hello, ${name}!</h1>
  <p>${userInput}</p> <!-- Auto-escaped -->
`;
```

The `html` tagged template automatically escapes all values, preventing XSS attacks.

**CSS-in-JS with auto-scoping:**

```javascript
const buttonStyle = css`
  background: blue;
  padding: 10px 20px;
  
  &:hover { background: darkblue; }
  
  .child { font-size: 12px; }
`;
```

Auto-scoped styles with hash-based class names. No CSS files or naming conflicts.

## Converting the Portfolio

I converted every interactive component to use reactive.js:

**Before (manual DOM updates):**
```javascript
const updateTheme = (theme) => {
  document.documentElement.dataset.theme = theme;
  button.textContent = theme === 'dark' ? '☀️' : '🌙';
};
button.addEventListener('click', () => updateTheme(toggle()));
```

**After (reactive):**
```javascript
class ThemeManager extends Reactive.Component {
  state() {
    return {
      theme: this.signal('dark'),
      icon: this.computed(() => 
        this.theme.get() === 'dark' ? '☀️' : '🌙'
      )
    };
  }
  
  init() {
    // Sync theme to DOM automatically
    this.effect(() => {
      document.documentElement.dataset.theme = this.theme.get();
    });
  }
  
  template() {
    return html`
      <button data-on-click=${this.toggle}>
        <span data-text=${this.icon}></span>
      </button>
    `;
  }
  
  toggle() {
    this.theme.update(t => t === 'dark' ? 'light' : 'dark');
  }
}
```

The component handles everything: state management, DOM updates, event binding. I just declare what should happen.

## The Results

**Code clarity:**
- 30% less code in interactive components
- No scattered event listeners
- State management in one place

**Developer experience:**
- Declarative instead of imperative
- Automatic dependency tracking
- Type-safe signals

**Performance:**
- Fine-grained updates (only affected DOM nodes)
- Batched updates prevent cascading renders
- Lazy computed values

## The Trade-offs

**Pros:**
- ✅ Tiny (~750 lines, zero dependencies)
- ✅ Modern reactive patterns
- ✅ Works with vanilla JS (no build step required)
- ✅ Easy to understand and debug

**Cons:**
- ❌ Not battle-tested like Vue/React
- ❌ No TypeScript types (yet)
- ❌ No ecosystem
- ❌ I'm the maintainer

For my personal projects? Perfect! For a large team project? Maybe stick with established frameworks.

## Bundling with Microtastic

Since I was already using Microtastic for dependency bundling, reactive.js fits perfectly into that workflow. It's just vanilla ES6 modules—no build step required, but if you want to bundle it with your other dependencies, Microtastic handles it seamlessly.

The beauty is you can use reactive.js in two ways:
1. **Direct import**: Just use ES6 modules, no build needed
2. **Bundled**: Let Microtastic bundle it with your deps for production

Either way, you get the same lightweight reactive system.

---

*Want to see it in action? View source on this page or check out the [GitHub repo](https://github.com/seriva/website). The entire reactive system is in one file, and it's also included in [Microtastic](https://github.com/seriva/microtastic) for anyone who wants to use it.*
