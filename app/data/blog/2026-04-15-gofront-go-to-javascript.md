---
title: "GoFront: Because TypeScript Wasn't Controversial Enough"
date: "2026-04-15"
excerpt: "I like Go for the backend. I like JavaScript for the frontend. I don't like TypeScript. So I built a compiler that turns Go into JavaScript."
tags: ["Go", "JavaScript", "Compilers", "GoFront"]
---

I love Go for the backend — simple, type-safe, no nonsense. I like JavaScript for the frontend — runs everywhere, no setup. What I *don't* like is JavaScript's loose typing. And I don't like TypeScript either. I know, controversial. It's fine, I just don't enjoy it.

So I did the perfectly reasonable thing and built my own compiler.

## The Idea

What if I could write Go syntax, get real type checking at compile time, and have it spit out clean, readable ES modules? Same language front and back, no runtime, no framework, no `tsconfig.json`.

That's [GoFront](/?project=gofront).

## How It Works

GoFront is a four-stage compiler written in pure Node.js with zero dependencies:

```
source text (.go files)
  → Lexer          tokenize + Go-style semicolon insertion
  → Parser         recursive-descent → AST
  → Type Checker   annotate AST with types + collect errors
  → Code Gen       AST → JavaScript string
```

Every Go construct maps to a specific JavaScript pattern. No name mangling, no opaque wrappers — the output is designed to be readable.

### A Quick Example

This Go code:

```go
package main

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

Compiles to something you can actually read:

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

Structs become classes. Slices become arrays. `append` becomes spread. Types are erased at runtime because JavaScript doesn't need them — the compiler already checked everything.

## What's Supported

Quite a lot, actually. Structs, methods, interfaces, embedded structs, slices, maps, closures, `for range`, `switch`, `defer`/`recover`, `async`/`await`, multiple return values, named returns, variadic functions, cross-package imports — the whole list is in the [README](https://github.com/seriva/gofront).

What's *not* supported: goroutines, channels, and generics. Goroutines and channels don't have a JavaScript equivalent without a runtime scheduler, which defeats the "no runtime" goal. Generics are theoretically possible but a huge effort for limited payoff when everything is `any` at runtime anyway.

## The Type Checker

This is the part I'm most happy with. It's a three-pass type checker that catches real errors:

```go
func greet(name string) {
    console.log("Hello, " + name)
}

greet(42)   // → Type error in main.go at line 5: cannot use int as string
```

It resolves types across multiple files in the same package, supports external `.d.ts` type declarations for JavaScript libraries, and even auto-resolves npm package types from `node_modules/` and `@types/`.

## The Todo App

There's a [live demo](/?project=gofront) on the project page — a fully functional todo app written entirely in Go and compiled to JavaScript. It covers structs, methods, closures, slices, `for range`, `switch`, `defer`/`recover`, `async`/`await`, and DOM APIs. Everything compiles to a single plain ES module.

## Is This Useful?

Probably not. But it was genuinely fun to build. Writing a compiler from scratch — lexer, parser, type checker, code generator — is one of those projects where you learn something new at every stage. And there's something satisfying about writing `func main()` and seeing clean JavaScript come out the other end.

If you want to try it:

```bash
npm install -g gofront
gofront init myapp
gofront myapp -o myapp/app.js
```

The source is on [GitHub](https://github.com/seriva/gofront). It has 474 tests and compiles itself in about 15ms. Not bad for a weekend project that got slightly out of hand.
