package main

import "gofront/dom"

var scriptPromises = map[string]any{}

// loadScript appends a <script> tag once per src and returns a promise that
// settles on load/error; concurrent callers share the same in-flight promise.
func loadScript(src string, integrity string) any {
	if p, ok := scriptPromises[src]; ok {
		return p
	}
	d := Promise.withResolvers()
	s := document.createElement("script").(dom.HTMLScriptElement)
	s.src = src
	if integrity != "" {
		s.integrity = integrity
		s.crossOrigin = "anonymous"
	}
	s.async = true
	s.addEventListener("load", func(_ dom.Event) {
		d.resolve(nil)
	})
	s.addEventListener("error", func(e dom.Event) {
		delete(scriptPromises, src)
		d.reject(e)
	})
	document.head.appendChild(s)
	scriptPromises[src] = d.promise
	return d.promise
}
