// ===========================================
// MINIMAL YAML PARSER
// ===========================================
// Lightweight YAML parser for content.yaml
// Supports: comments, objects, arrays (inline & multi-line), strings, numbers, booleans

// ===========================================
// MINIMAL YAML PARSER
// ===========================================
// Lightweight YAML parser for content.yaml
// Supports: comments, objects, arrays (inline & multi-line), strings, numbers, booleans

export const YAMLParser = {
	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	parse(yamlText) {
		if (!yamlText) {
			return {};
		}
		const lines = yamlText.split("\n");
		const root = {};
		const stack = [{ obj: root, indent: -1 }];

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i];
			const trimmed = line.trim();

			// Skip empty lines and comments
			if (!trimmed || trimmed.startsWith("#")) continue;

			// Get indentation level
			const indent = line.search(/\S/);
			const isArrayItem = trimmed.startsWith("- ");

			// Pop stack until we find the correct parent level
			while (stack.length > 1 && indent <= stack[stack.length - 1].indent) {
				stack.pop();
			}

			const parent = stack[stack.length - 1];

			if (isArrayItem) {
				// Handle array items (- key: value OR - value)
				const content = trimmed.slice(2).trim();

				// Ensure parent has an array to push to
				if (!Array.isArray(parent.obj)) {
					console.error("Array item without array parent");
					continue;
				}

				if (content.includes(":")) {
					// Array of objects: - key: value
					const obj = {};
					parent.obj.push(obj);
					stack.push({ obj, indent, key: null });

					const [key, ...valueParts] = content.split(":");
					const value = valueParts.join(":").trim();
					if (value) {
						obj[key.trim()] = this._parseValue(value);
					} else {
						// Multi-line object, next lines will add properties
						stack[stack.length - 1].obj = obj;
						stack[stack.length - 1].key = key.trim();
					}
				} else {
					// Simple array item: - value
					parent.obj.push(this._parseValue(content));
				}
			} else if (trimmed.includes(":")) {
				// Handle key: value pairs
				const colonIndex = trimmed.indexOf(":");
				let key = trimmed.slice(0, colonIndex).trim();

				// Remove quotes from keys if present (e.g. "nav.projects": "Projects")
				if (
					(key.startsWith('"') && key.endsWith('"')) ||
					(key.startsWith("'") && key.endsWith("'"))
				) {
					key = key.slice(1, -1);
				}

				const valueStr = trimmed.slice(colonIndex + 1).trim();

				if (valueStr) {
					// Has value on same line
					parent.obj[key] = this._parseValue(valueStr);
				} else {
					// No value - next lines define nested object or array
					// Peek ahead to see if next non-empty line is an array item
					let _nextIndent = -1;
					let isArray = false;
					for (let j = i + 1; j < lines.length; j++) {
						const nextLine = lines[j].trim();
						if (!nextLine || nextLine.startsWith("#")) continue;
						_nextIndent = lines[j].search(/\S/);
						isArray = nextLine.startsWith("- ");
						break;
					}

					if (isArray) {
						// Create array
						parent.obj[key] = [];
						stack.push({ obj: parent.obj[key], indent, key });
					} else {
						// Create nested object
						parent.obj[key] = {};
						stack.push({ obj: parent.obj[key], indent, key });
					}
				}
			}
		}

		return root;
	},

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	// Parse a value string into appropriate type
	_parseValue(str) {
		let value = str.trim();

		// Handle inline comments, respecting quotes
		const quoteMatch = value.match(/^(['"]).*?\1/);
		if (quoteMatch) {
			const quotedPart = quoteMatch[0];
			const afterQuote = value.slice(quotedPart.length);
			const commentIndex = afterQuote.indexOf("#");
			if (commentIndex !== -1) {
				value = quotedPart + afterQuote.slice(0, commentIndex);
			}
		} else {
			const commentIndex = value.indexOf("#");
			if (commentIndex !== -1) {
				value = value.slice(0, commentIndex);
			}
		}
		value = value.trim();

		// Handle inline arrays: ["item1", "item2"]
		if (value.startsWith("[") && value.endsWith("]")) {
			try {
				// A more robust way to handle single quotes
				return JSON.parse(value.replace(/'/g, '"'));
			} catch {
				return value; // Return original string if parsing fails
			}
		}

		// Handle quoted strings
		const quote = value.charAt(0);
		if ((quote === '"' || quote === "'") && value.endsWith(quote)) {
			return value.slice(1, -1);
		}

		// Handle booleans
		if (value === "true") return true;
		if (value === "false") return false;

		// Handle null
		if (value === "null" || value === "Null" || value === "NULL") return null;

		// Handle numbers (integers and floats)
		if (!Number.isNaN(Number(value)) && value.trim() !== "") {
			return Number(value);
		}

		// Return as string
		return value;
	},
};
