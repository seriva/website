// ===========================================
// ROUTER EVENTS
// ===========================================
// Simple event system for routing without global coupling

let handleRouteCallback = null;

// ===========================================
// ROUTER EVENTS NAMESPACE
// ===========================================

export const RouterEvents = {
	// Register the route handler (called once in main.js)
	registerRouteHandler(handler) {
		handleRouteCallback = handler;
	},

	// Trigger route navigation (called from loaders, search, etc.)
	navigateToRoute(href) {
		if (handleRouteCallback) {
			window.history.pushState({}, "", href);
			handleRouteCallback();
		}
	},
};
