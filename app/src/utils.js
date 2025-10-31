// ===========================================
// UTILITY FUNCTIONS
// ===========================================
// Core utilities for DOM manipulation and HTML templating

// DOM Element Getters
export const getMainContent = () => {
	const element = document.getElementById("main-content");
	if (!element) {
		throw new Error("Critical: #main-content element not found in DOM");
	}
	return element;
};

export const getNavbar = () => {
	const element = document.getElementById("navbar-container");
	if (!element) {
		throw new Error("Critical: #navbar-container element not found in DOM");
	}
	return element;
};

// HTML Template Utilities
export const escapeHtml = (str) => {
	const div = document.createElement("div");
	div.textContent = str;
	return div.innerHTML;
};

// Tagged template literal for auto-escaping HTML
export const html = (strings, ...values) => {
	return strings.reduce((result, str, i) => {
		const value = values[i];
		if (value === undefined || value === null) return result + str;
		if (value?.__safe) return result + str + value.content;
		return result + str + escapeHtml(String(value));
	}, "");
};

// Mark content as safe (already escaped/trusted HTML)
export const safe = (content) => ({ __safe: true, content });
