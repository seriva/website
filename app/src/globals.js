// ===========================================
// GLOBAL INSTANCES
// ===========================================
// Shared component instances to avoid circular dependencies

export let Email = null;
export let Navbar = null;

export function setEmail(instance) {
	Email = instance;
}

export function setNavbar(instance) {
	Navbar = instance;
}
