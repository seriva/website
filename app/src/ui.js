// UI utilities and interaction handlers
import { CONSTANTS } from "./constants.js";

export const closeMobileMenu = () => {
	const collapseElement = document.getElementById("navbarNav");
	const navbarToggle = document.getElementById("navbar-toggle");

	if (collapseElement) {
		collapseElement.classList.remove("show");
	}

	if (navbarToggle) {
		navbarToggle.classList.remove("active");
		navbarToggle.setAttribute("aria-expanded", "false");
	}
};

export const initCustomDropdowns = () => {
	for (const toggle of document.querySelectorAll(".dropdown-toggle")) {
		toggle.addEventListener("click", (e) => {
			e.preventDefault();
			const dropdown = toggle.closest(".dropdown");
			const isOpen = dropdown.classList.contains("show");

			// Close all other dropdowns
			for (const d of document.querySelectorAll(".dropdown.show")) {
				if (d !== dropdown) {
					d.classList.remove("show");
					const t = d.querySelector(".dropdown-toggle");
					if (t) t.setAttribute("aria-expanded", "false");
				}
			}

			dropdown.classList.toggle("show", !isOpen);
			toggle.setAttribute("aria-expanded", !isOpen);
		});
	}

	document.addEventListener("click", (e) => {
		if (e.target.closest(".dropdown-item") || !e.target.closest(".dropdown")) {
			for (const d of document.querySelectorAll(".dropdown.show")) {
				d.classList.remove("show");
				const toggle = d.querySelector(".dropdown-toggle");
				if (toggle) toggle.setAttribute("aria-expanded", "false");
			}
		}
	});
};

export const initNavbarToggle = () => {
	const toggle = document.getElementById("navbar-toggle");
	const navbar = document.getElementById("navbarNav");

	if (!toggle || !navbar) return;

	toggle.addEventListener("click", () => {
		const isExpanded = toggle.getAttribute("aria-expanded") === "true";

		navbar.classList.toggle("show");
		toggle.classList.toggle("active");
		toggle.setAttribute("aria-expanded", !isExpanded);
	});
};

// Global utility functions
export const fullscreen = () => {
	try {
		const iframe = document.getElementById("demo");
		if (!iframe) return;

		const request =
			iframe.requestFullscreen ||
			iframe.webkitRequestFullscreen ||
			iframe.mozRequestFullScreen ||
			iframe.msRequestFullscreen;

		if (request) request.call(iframe);
	} catch (error) {
		console.error("Error requesting fullscreen:", error);
	}
};

// Email obfuscation handler
export const Email = async (event) => {
	event?.preventDefault();

	try {
		// Dynamically import getData to avoid circular dependencies
		const { getData } = await import("./data.js");
		const data = await getData();
		const emailConfig = data?.site?.email;

		if (emailConfig?.name && emailConfig?.domain) {
			const email = `${emailConfig.name}@${emailConfig.domain}`;
			window.location.href = `mailto:${email}`;
		} else {
			// Fallback to default email
			console.warn("Email configuration not found, using fallback");
			window.location.href = "mailto:contact@example.com";
		}
	} catch (error) {
		console.error("Error handling email click:", error);
		// Fallback to default email
		window.location.href = "mailto:contact@example.com";
	}
};

// Copy code button functionality
export const initCopyCodeButtons = () => {
	// Find all pre elements with code blocks
	const preBlocks = document.querySelectorAll("pre");

	for (const pre of preBlocks) {
		// Skip if button already exists
		if (pre.querySelector(".copy-code-button")) continue;

		// Get the code element
		const codeElement = pre.querySelector("code");
		if (!codeElement) continue;

		// Create copy button
		const button = document.createElement("button");
		button.className = "copy-code-button";
		button.textContent = "Copy";
		button.setAttribute("aria-label", "Copy code to clipboard");

		// Add click handler
		button.addEventListener("click", async () => {
			try {
				const code = codeElement.textContent || "";
				await navigator.clipboard.writeText(code);

				// Show success feedback
				button.textContent = "Copied!";
				button.classList.add("copied");

				// Reset after 2 seconds
				setTimeout(() => {
					button.textContent = "Copy";
					button.classList.remove("copied");
				}, 2000);
			} catch (err) {
				console.error("Failed to copy code: ", err);
				// Fallback for older browsers
				button.textContent = "Failed";
				setTimeout(() => {
					button.textContent = "Copy";
				}, 2000);
			}
		});

		// Position the button - append directly to pre element
		pre.style.position = "relative";
		pre.appendChild(button);
	}
};

// Update active nav link
export const updateActiveNavLink = () => {
	const params = new URLSearchParams(window.location.search);
	const navLinks = document.querySelectorAll(".navbar-nav .nav-link");

	for (const link of navLinks) {
		link.classList.remove("active");

		const href = link.getAttribute("href");
		if (href?.startsWith("?")) {
			const linkParams = new URLSearchParams(href);

			// Check if this link matches current route
			if (params.get("blog") !== null && linkParams.get("blog") !== null) {
				link.classList.add("active");
			} else if (
				params.get("page") === linkParams.get("page") &&
				params.get("page") !== null
			) {
				link.classList.add("active");
			}
		}
	}
};

// Mobile menu outside click handler
export const addMobileMenuOutsideClickHandler = () => {
	document.addEventListener("click", (event) => {
		const navbar = document.getElementById("navbar-container");
		if (!navbar) return;

		if (
			window.innerWidth <= CONSTANTS.MOBILE_BREAKPOINT &&
			!navbar.contains(event.target)
		) {
			closeMobileMenu();
		}
	});
};
