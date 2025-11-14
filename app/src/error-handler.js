// ===========================================
// ERROR HANDLER
// ===========================================
// Global error handling and logging

// ===========================================
// ERROR HANDLER NAMESPACE
// ===========================================

export const ErrorHandler = {
	initialized: false,
	errorCount: 0,
	maxErrors: 10, // Prevent infinite error loops

	// ===========================================
	// PUBLIC METHODS
	// ===========================================

	// Initialize global error handlers
	init() {
		if (this.initialized) return;

		// Handle uncaught errors
		window.addEventListener("error", (event) => {
			this._handleError({
				message: event.message,
				source: event.filename,
				line: event.lineno,
				column: event.colno,
				error: event.error,
				type: "error",
			});
		});

		// Handle unhandled promise rejections
		window.addEventListener("unhandledrejection", (event) => {
			this._handleError({
				message: event.reason?.message || "Unhandled promise rejection",
				error: event.reason,
				type: "promise",
			});
		});

		this.initialized = true;
	},

	// Manually log an error (for caught exceptions you want to report)
	logError(error, context = {}) {
		this._handleError({
			message: error?.message || "Unknown error",
			error,
			context,
			type: "manual",
		});
	},

	// ===========================================
	// PRIVATE METHODS
	// ===========================================

	_handleError(errorInfo) {
		// Prevent infinite error loops
		this.errorCount++;
		if (this.errorCount > this.maxErrors) {
			console.error("Too many errors, stopping error handler");
			return;
		}

		// Log to console (always helpful for debugging)
		console.error(
			`[${errorInfo.type.toUpperCase()}]`,
			errorInfo.message,
			errorInfo.error || "",
		);

		// In production: send to analytics/monitoring service
		// Example: Sentry, LogRocket, or custom logging endpoint
		// Uncomment and implement _sendToMonitoring() method as needed
	},
};

// Example production monitoring integration (uncomment and configure as needed):
//
// _sendToMonitoring(errorInfo) {
//   // Sentry example:
//   if (window.Sentry) {
//     window.Sentry.captureException(errorInfo.error, {
//       extra: errorInfo.context
//     });
//   }
//
//   // Custom endpoint example:
//   fetch('/api/log-error', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({
//       message: errorInfo.message,
//       url: window.location.href,
//       userAgent: navigator.userAgent,
//       timestamp: new Date().toISOString()
//     })
//   }).catch(() => {});
// }
