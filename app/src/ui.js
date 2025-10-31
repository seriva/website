// ===========================================
// UI INTERACTIONS
// ===========================================
// User interface utilities and event handlers

import { CONSTANTS } from "./constants.js";

// Close mobile navigation menu
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

// Initialize custom dropdown menus
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

// Initialize mobile navbar toggle button
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

// Request fullscreen for demo iframe
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

// Handle obfuscated email link clicks
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
			console.warn("Email configuration not found, using fallback");
			window.location.href = "mailto:contact@example.com";
		}
	} catch (error) {
		console.error("Error handling email click:", error);
		window.location.href = "mailto:contact@example.com";
	}
};

// Add copy buttons to all code blocks
export const initCopyCodeButtons = () => {
	const preBlocks = document.querySelectorAll("pre");

	for (const pre of preBlocks) {
		if (pre.querySelector(".copy-code-button")) continue;

		const codeElement = pre.querySelector("code");
		if (!codeElement) continue;

		const button = document.createElement("button");
		button.className = "copy-code-button";
		button.textContent = "Copy";
		button.setAttribute("aria-label", "Copy code to clipboard");

		button.addEventListener("click", async () => {
			try {
				const code = codeElement.textContent || "";
				await navigator.clipboard.writeText(code);

				button.textContent = "Copied!";
				button.classList.add("copied");

				setTimeout(() => {
					button.textContent = "Copy";
					button.classList.remove("copied");
				}, CONSTANTS.COPY_BUTTON_RESET_MS);
			} catch (error) {
				console.error("Failed to copy code:", error);
				button.textContent = "Failed";
				setTimeout(() => {
					button.textContent = "Copy";
				}, CONSTANTS.COPY_BUTTON_RESET_MS);
			}
		});

		pre.style.position = "relative";
		pre.appendChild(button);
	}
};

// Update active state on navigation links
export const updateActiveNavLink = () => {
	const params = new URLSearchParams(window.location.search);
	const navLinks = document.querySelectorAll(".navbar-nav .nav-link");
	const dropdownItems = document.querySelectorAll(".dropdown-item");

	// Update navbar links
	for (const link of navLinks) {
		link.classList.remove("active");

		const href = link.getAttribute("href");
		if (href?.startsWith("?")) {
			const linkParams = new URLSearchParams(href);

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

	// Update dropdown items and highlight dropdown toggle if project is active
	let isProjectActive = false;
	for (const item of dropdownItems) {
		item.classList.remove("active");

		const href = item.getAttribute("href");
		if (href?.startsWith("?project=")) {
			const linkParams = new URLSearchParams(href);
			const linkProject = linkParams.get("project");
			const currentProject = params.get("project");

			if (linkProject && linkProject === currentProject) {
				item.classList.add("active");
				isProjectActive = true;
			}
		}
	}

	// Highlight the projects dropdown toggle if any project is active
	if (isProjectActive) {
		const projectsToggle = document.querySelector(".dropdown-toggle");
		if (projectsToggle) {
			projectsToggle.classList.add("active");
		}
	}
};

// Close mobile menu when clicking outside
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
