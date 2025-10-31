// ===========================================
// CONSTANTS
// ===========================================
// Application-wide configuration

export const CONSTANTS = {
	// Paths
	PRISM_CDN_BASE: "css/prism-themes/",
	GITHUB_RAW_BASE: "https://raw.githubusercontent.com",

	// Defaults
	DEFAULT_THEME: "prism-tomorrow",
	DEFAULT_TITLE: "portfolio.example.com",
	DEFAULT_EMAIL: "contact@example.com",

	// Breakpoints & Timing
	MOBILE_BREAKPOINT: 767,
	PAGE_TRANSITION_DELAY: 200,
	SEARCH_PAGE_CLOSE_DELAY: 200,
	SEARCH_DEBOUNCE_MS: 300,
	COPY_BUTTON_RESET_MS: 2000,
	GISCUS_INJECTION_DELAY: 100,

	// Search Configuration
	SEARCH_MIN_CHARS: 2,
	SEARCH_MAX_RESULTS: 8,
	SEARCH_THRESHOLD: 0.4,
	SEARCH_MIN_MATCH_LENGTH: 2,

	// Search Weights (must sum to 1.0)
	SEARCH_WEIGHT_TITLE: 0.4,
	SEARCH_WEIGHT_DESCRIPTION: 0.3,
	SEARCH_WEIGHT_TAGS: 0.2,
	SEARCH_WEIGHT_CONTENT: 0.1,
};
