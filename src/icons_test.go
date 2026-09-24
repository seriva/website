package main

import (
	"strings"
	"testing"
)

func TestIconSvg(t *testing.T) {
	t.Run("known icon renders class, size and viewBox", func(t *testing.T) {
		svg := iconSvg("search", "1.35rem")
		if !strings.Contains(svg, `class="icon icon-search"`) {
			t.Errorf("missing class, got %q", svg)
		}
		if !strings.Contains(svg, `width="1.35rem" height="1.35rem"`) {
			t.Errorf("missing size, got %q", svg)
		}
		if !strings.Contains(svg, `viewBox="0 0 512 512"`) {
			t.Errorf("missing viewBox, got %q", svg)
		}
		if !strings.Contains(svg, `aria-hidden="true"`) {
			t.Errorf("icon should be aria-hidden, got %q", svg)
		}
	})

	t.Run("unknown icon renders nothing", func(t *testing.T) {
		if iconSvg("does-not-exist", "1rem") != "" {
			t.Error("expected empty string for unknown icon")
		}
	})

	t.Run("legacy aliases keep the canonical class", func(t *testing.T) {
		if !strings.Contains(iconSvg("angle-double-left", "1em"), `icon-angles-left"`) {
			t.Error("expected angle-double-left to render angles-left")
		}
		if !strings.Contains(iconSvg("angle-double-right", "1em"), `icon-angles-right"`) {
			t.Error("expected angle-double-right to render angles-right")
		}
	})

	t.Run("size is escaped", func(t *testing.T) {
		svg := iconSvg("sun", `1rem" onload="x`)
		if strings.Contains(svg, `onload="x`) {
			t.Errorf("size was not escaped: %q", svg)
		}
		if !strings.Contains(svg, "&#34;") && !strings.Contains(svg, "&quot;") {
			t.Errorf("expected escaped quote in %q", svg)
		}
	})

	t.Run("every registered icon renders", func(t *testing.T) {
		for name, _ := range icons {
			if !strings.Contains(iconSvg(name, "1em"), "<path d=") {
				t.Errorf("icon %q did not render a path", name)
			}
		}
	})
}
