package utils

import "testing"

func TestParseValueStrings(t *testing.T) {
	t.Run("double quoted", func(t *testing.T) {
		result := parseValue("\"hello world\"")
		if result != "hello world" {
			t.Errorf("expected 'hello world', got %v", result)
		}
	})

	t.Run("single quoted", func(t *testing.T) {
		result := parseValue("'hello world'")
		if result != "hello world" {
			t.Errorf("expected 'hello world', got %v", result)
		}
	})

	t.Run("unquoted", func(t *testing.T) {
		result := parseValue("hello")
		if result != "hello" {
			t.Errorf("expected 'hello', got %v", result)
		}
	})

	t.Run("empty quoted", func(t *testing.T) {
		result := parseValue("\"\"")
		if result != "" {
			t.Errorf("expected empty string, got %v", result)
		}
	})
}

func TestParseValueBooleans(t *testing.T) {
	t.Run("true", func(t *testing.T) {
		result := parseValue("true")
		if result != true {
			t.Errorf("expected true, got %v", result)
		}
	})

	t.Run("false", func(t *testing.T) {
		result := parseValue("false")
		if result != false {
			t.Errorf("expected false, got %v", result)
		}
	})
}

func TestParseValueNulls(t *testing.T) {
	cases := []string{"null", "Null", "NULL", "~"}
	for _, c := range cases {
		t.Run(c, func(t *testing.T) {
			result := parseValue(c)
			if result != nil {
				t.Errorf("expected nil for %q, got %v", c, result)
			}
		})
	}
}

func TestParseValueNumbers(t *testing.T) {
	t.Run("integer", func(t *testing.T) {
		result := parseValue("42")
		if result != 42 {
			t.Errorf("expected 42, got %v", result)
		}
	})

	t.Run("float", func(t *testing.T) {
		result := parseValue("3.14")
		if result != 3.14 {
			t.Errorf("expected 3.14, got %v", result)
		}
	})

	t.Run("zero", func(t *testing.T) {
		result := parseValue("0")
		if result != 0 {
			t.Errorf("expected 0, got %v", result)
		}
	})
}

func TestParseValueInlineComments(t *testing.T) {
	t.Run("unquoted with comment", func(t *testing.T) {
		result := parseValue("hello # a comment")
		if result != "hello" {
			t.Errorf("expected 'hello', got %v", result)
		}
	})

	t.Run("double quoted with comment after", func(t *testing.T) {
		result := parseValue("\"hello\" # a comment")
		if result != "hello" {
			t.Errorf("expected 'hello', got %v", result)
		}
	})
}

func TestParseYAMLEmpty(t *testing.T) {
	t.Run("empty string", func(t *testing.T) {
		result := ParseYAML("")
		m := result.(map[string]any)
		if len(m) != 0 {
			t.Errorf("expected empty map, got %v", m)
		}
	})
}

func TestParseYAMLKeyValue(t *testing.T) {
	yaml := "name: John\nage: 30"
	result := ParseYAML(yaml)
	m := result.(map[string]any)

	if m["name"] != "John" {
		t.Errorf("expected name='John', got %v", m["name"])
	}
	if m["age"] != 30 {
		t.Errorf("expected age=30, got %v", m["age"])
	}
}

func TestParseYAMLNested(t *testing.T) {
	yaml := "user:\n  name: John\n  age: 30"
	result := ParseYAML(yaml)
	m := result.(map[string]any)

	user := m["user"].(map[string]any)
	if user["name"] != "John" {
		t.Errorf("expected user.name='John', got %v", user["name"])
	}
	if user["age"] != 30 {
		t.Errorf("expected user.age=30, got %v", user["age"])
	}
}

func TestParseYAMLArrays(t *testing.T) {
	yaml := "items:\n  - one\n  - two\n  - three"
	result := ParseYAML(yaml)
	m := result.(map[string]any)

	items := m["items"].([]any)
	if len(items) != 3 {
		t.Fatalf("expected 3 items, got %d", len(items))
	}
	if items[0] != "one" {
		t.Errorf("expected items[0]='one', got %v", items[0])
	}
	if items[1] != "two" {
		t.Errorf("expected items[1]='two', got %v", items[1])
	}
	if items[2] != "three" {
		t.Errorf("expected items[2]='three', got %v", items[2])
	}
}

func TestParseYAMLArraysOfObjects(t *testing.T) {
	yaml := "users:\n  - name: John\n    age: 30\n  - name: Jane\n    age: 25"
	result := ParseYAML(yaml)
	m := result.(map[string]any)

	users := m["users"].([]any)
	if len(users) != 2 {
		t.Fatalf("expected 2 users, got %d", len(users))
	}

	u1 := users[0].(map[string]any)
	if u1["name"] != "John" {
		t.Errorf("expected users[0].name='John', got %v", u1["name"])
	}
	u2 := users[1].(map[string]any)
	if u2["name"] != "Jane" {
		t.Errorf("expected users[1].name='Jane', got %v", u2["name"])
	}
}

func TestParseYAMLComments(t *testing.T) {
	yaml := "# This is a comment\nname: John\n# Another comment"
	result := ParseYAML(yaml)
	m := result.(map[string]any)

	if m["name"] != "John" {
		t.Errorf("expected name='John', got %v", m["name"])
	}
	if len(m) != 1 {
		t.Errorf("expected 1 key, got %d", len(m))
	}
}

func TestParseYAMLQuotedKeys(t *testing.T) {
	yaml := "\"nav.blog\": Blog\n'nav.projects': Projects"
	result := ParseYAML(yaml)
	m := result.(map[string]any)

	if m["nav.blog"] != "Blog" {
		t.Errorf("expected nav.blog='Blog', got %v", m["nav.blog"])
	}
	if m["nav.projects"] != "Projects" {
		t.Errorf("expected nav.projects='Projects', got %v", m["nav.projects"])
	}
}
