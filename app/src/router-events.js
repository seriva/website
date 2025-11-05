// ===========================================
// ROUTER EVENTS
// ===========================================
// Simple event system for routing without global coupling

let handleRouteCallback = null;

// Register the route handler (called once in main.js)
export const registerRouteHandler = (handler) => {
	handleRouteCallback = handler;
};

// Trigger route navigation (called from loaders, search-ui, etc.)
export const navigateToRoute = (href) => {
	if (handleRouteCallback) {
		window.history.pushState({}, "", href);
		handleRouteCallback();
	}
};
