package main

import "testing"

func TestIconMount(t *testing.T) {
	t.Run("known icon renders SVG class, size, viewBox and path", func(t *testing.T) {
		c := mountTempl(Icon("search", "1.35rem"))
		svg := c.querySelector("svg")
		if svg == nil {
			t.Fatal("expected svg element")
		}
		if string(svg.getAttribute("class")) != "icon icon-search" {
			t.Errorf("class = %q", string(svg.getAttribute("class")))
		}
		if string(svg.getAttribute("width")) != "1.35rem" || string(svg.getAttribute("height")) != "1.35rem" {
			t.Errorf("size = %q x %q", string(svg.getAttribute("width")), string(svg.getAttribute("height")))
		}
		if string(svg.getAttribute("viewBox")) != "0 0 512 512" {
			t.Errorf("viewBox = %q", string(svg.getAttribute("viewBox")))
		}
		if string(svg.getAttribute("aria-hidden")) != "true" {
			t.Errorf("expected aria-hidden=true")
		}
		if path := svg.querySelector("path"); path == nil || string(path.getAttribute("d")) == "" {
			t.Errorf("expected path with d attribute")
		}
	})

	t.Run("unknown icon renders nothing", func(t *testing.T) {
		c := mountTempl(Icon("does-not-exist", "1rem"))
		if int(c.children.length) != 0 {
			t.Errorf("expected no elements for unknown icon, got %d", int(c.children.length))
		}
	})

	t.Run("unsafe size cannot inject attributes", func(t *testing.T) {
		c := mountTempl(Icon("sun", `1rem" onload="x`))
		svg := c.querySelector("svg")
		if svg == nil {
			t.Fatal("expected svg element")
		}
		if bool(svg.hasAttribute("onload")) {
			t.Errorf("unexpected onload attribute injected")
		}
	})

	t.Run("every registered icon renders", func(t *testing.T) {
		for name := range icons {
			c := mountTempl(Icon(name, "1em"))
			path := c.querySelector("svg path")
			if path == nil || string(path.getAttribute("d")) == "" {
				t.Errorf("icon %q did not render a path", name)
			}
		}
	})
}
