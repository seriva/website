package utils

import "strings"

func parseValue(str string) any {
	value := strings.TrimSpace(str)

	// Handle inline comments, respecting quotes
	if (strings.HasPrefix(value, "'") && strings.Contains(value[1:], "'")) || (strings.HasPrefix(value, "\"") && strings.Contains(value[1:], "\"")) {
		quote := value[:1]
		endIdx := strings.Index(value[1:], quote)
		if endIdx != -1 {
			quotedPart := value[:endIdx+2]
			afterQuote := value[endIdx+2:]
			commentIdx := strings.Index(afterQuote, "#")
			if commentIdx != -1 {
				value = quotedPart + afterQuote[:commentIdx]
			}
		}
	} else {
		commentIdx := strings.Index(value, "#")
		if commentIdx != -1 {
			value = value[:commentIdx]
		}
	}
	value = strings.TrimSpace(value)

	// Inline array
	if strings.HasPrefix(value, "[") && strings.HasSuffix(value, "]") {
		rawJson := strings.ReplaceAll(value, "'", "\"")
		return JSON.parse(rawJson)
	}

	// Quoted strings
	if (strings.HasPrefix(value, "\"") && strings.HasSuffix(value, "\"")) || (strings.HasPrefix(value, "'") && strings.HasSuffix(value, "'")) {
		if len(value) >= 2 {
			return value[1 : len(value)-1]
		}
	}

	if value == "true" {
		return true
	}
	if value == "false" {
		return false
	}
	if value == "null" || value == "Null" || value == "NULL" || value == "~" {
		return nil
	}

	// Numbers
	if value != "" && !isNaN(Number(value)) {
		return Number(value)
	}

	return value
}

type StackEntry struct {
	Obj    any
	Indent int
	Key    string
}

func ParseYAML(yamlText string) any {
	if yamlText == "" {
		return map[string]any{}
	}

	lines := strings.Split(yamlText, "\n")
	root := map[string]any{}
	stack := []StackEntry{
		StackEntry{Obj: root, Indent: -1, Key: ""},
	}

	for i := 0; i < len(lines); i++ {
		line := lines[i]
		trimmed := strings.TrimSpace(line)

		if trimmed == "" || strings.HasPrefix(trimmed, "#") {
			continue
		}

		indent := 0
		for indent < len(line) && (line[indent] == ' ' || line[indent] == '\t') {
			indent++
		}

		isArrayItem := strings.HasPrefix(trimmed, "- ")

		for len(stack) > 1 && indent <= stack[len(stack)-1].Indent {
			stack = stack[:len(stack)-1]
		}

		parent := stack[len(stack)-1]

		if isArrayItem {
			content := strings.TrimSpace(trimmed[2:])

			if strings.Contains(content, ":") {
				obj := map[string]any{}
				parent.Obj.push(obj)
				stack = append(stack, StackEntry{Obj: obj, Indent: indent, Key: ""})

				colonIdx := strings.Index(content, ":")
				key := strings.TrimSpace(content[:colonIdx])
				valStr := strings.TrimSpace(content[colonIdx+1:])
				if valStr != "" {
					obj[key] = parseValue(valStr)
				}
			} else {
				parent.Obj.push(parseValue(content))
			}
		} else if strings.Contains(trimmed, ":") {
			colonIdx := strings.Index(trimmed, ":")
			key := strings.TrimSpace(trimmed[:colonIdx])
			if (strings.HasPrefix(key, "\"") && strings.HasSuffix(key, "\"")) || (strings.HasPrefix(key, "'") && strings.HasSuffix(key, "'")) {
				key = key[1 : len(key)-1]
			}

			valStr := strings.TrimSpace(trimmed[colonIdx+1:])
			if valStr != "" {
				parent.Obj[key] = parseValue(valStr)
			} else {
				// Peek ahead for array vs object
				isArray := false
				for j := i + 1; j < len(lines); j++ {
					nextTrimmed := strings.TrimSpace(lines[j])
					if nextTrimmed == "" || strings.HasPrefix(nextTrimmed, "#") {
						continue
					}
					isArray = strings.HasPrefix(nextTrimmed, "- ")
					break
				}

				if isArray {
					arr := []any{}
					parent.Obj[key] = arr
					stack = append(stack, StackEntry{Obj: arr, Indent: indent, Key: key})
				} else {
					nested := map[string]any{}
					parent.Obj[key] = nested
					stack = append(stack, StackEntry{Obj: nested, Indent: indent, Key: key})
				}
			}
		}
	}

	return root
}
