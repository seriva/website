---
title: "GoFront: Because TypeScript Wasn't Controversial Enough"
date: "2026-04-15"
excerpt: "I wanted Go's type safety on the frontend without TypeScript's ceremony. So I built a compiler that turns Go into plain JavaScript."
tags: ["Go", "JavaScript", "Compilers", "GoFront"]
---

I write Go at the backend and I like it. Simple, type-safe, no nonsense. For the frontend I reach for JavaScript — it runs everywhere, needs no setup, and gets out of your way. The problem is loose typing. You rename a field, forget to update a call site, and find out at runtime.

TypeScript is the obvious answer, but it never felt right to me. The config overhead, the decorator soup, the way it gradually turns into a second language bolted onto the first. I wanted type safety without the ceremony.

So I did what any reasonable person would do and built a compiler.

## The idea

What if you could write Go syntax, get real type checking at compile time, and have it emit clean, readable ES modules? Same language front and back. No runtime, no framework, no `tsconfig.json`. Your `.go` files get Go syntax highlighting and bracket matching for free in any editor — no plugin required.

That's [GoFront](/?project=gofront).

## How it works

The compiler is four stages, written in pure Node.js with zero dependencies:

```
source text (.go files)
  → Lexer          tokenize + Go-style semicolon insertion
  → Parser         recursive-descent → AST
  → Type Checker   annotate AST with types + collect errors
  → Code Gen       AST → JavaScript string
```

Every Go construct maps to a specific JavaScript pattern. Take a simple struct and a function:

```go
type Todo struct {
    id   int
    text string
    done bool
}

var todos []Todo

func addTodo(text string) {
    todos = append(todos, Todo{id: len(todos), text: text, done: false})
    render()
}
```

That compiles to:

```javascript
class Todo {
    constructor({ id = 0, text = "", done = false } = {}) {
        this.id = id;
        this.text = text;
        this.done = done;
    }
}

let todos = [];

function addTodo(text) {
    todos = [...todos, new Todo({ id: todos.length, text: text, done: false })];
    render();
}
```

Structs become classes. Slices become arrays. `append` becomes spread. Types are erased at runtime because JavaScript doesn't need them — the compiler already caught any mistakes.

## The type checker

This is the part I spent the most time on. It's a three-pass type checker that resolves types across multiple files, catches real errors, and reports them with accurate source locations:

```go
func greet(name string) {
    console.log("Hello, " + name)
}

greet(42)   // → Type error in src/main.go at line 5: cannot use int as string
```

It also understands external TypeScript type declarations via `js:` imports and auto-resolves npm package types from `node_modules/` and `@types/`. So you can use any JS library and still get type checking on the Go side.

## What grew over time

The core was straightforward. Then the rabbit hole opened.

Generics turned out to be surprisingly clean — type erasure means `func Map[T, U any](...)` just compiles to `function Map(...)`. The type checker enforces constraints; JavaScript never needs to know they existed.

Pointers were trickier. JS has no memory model, so address-taken scalar locals get boxed as `{ value: T }` to make shared mutation work. Structs, slices, and maps are already reference types, so they're fine as-is.

Error handling got a full implementation: `error` as a proper interface, custom error types, `errors.Is`, `errors.Unwrap`, and `%w` wrapping. Range over iterator functions (Go 1.23's `yield` protocol) is there too, with correct `break`/`continue`/`return` propagation. Arrays have compile-time enforcement — bounds checking, `append` rejected on fixed arrays, `[...]T` size inference.

The standard library grew to cover the packages you actually reach for: `fmt`, `strings`, `bytes`, `strconv`, `sort`, `math`, `errors`, `time`, `unicode`, `os`. Enough to write real code without dropping into JS.

The CLI picked up a watch mode, a dev server with live reload, inline source maps, and a built-in minifier with optional local identifier mangling — no external tools needed.

What's not there: goroutines, channels, `goto`, `unsafe`, `reflect`. Goroutines need a scheduler, which defeats the no-runtime goal. The rest have no clean JS equivalent.

## Does it work?

There are two example apps in the repo — both implement the same todo app. One uses vanilla DOM manipulation, compiled to a single ES module with no dependencies. The other integrates with a signals-based reactive framework, with the type declarations written as a hand-crafted `.d.ts` shim so GoFront knows about `Signal`, `Signals.create()`, and `Reactive.bind()`.

There's a [live demo](/?project=gofront) on the project page.

```bash
npm install -g gofront
gofront init myapp
gofront myapp -o myapp/app.js
```

Source on [GitHub](https://github.com/seriva/gofront). 869 tests. Compiles itself in ~15ms. A weekend project that got slightly out of hand.
