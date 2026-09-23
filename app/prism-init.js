// Module: runs after vendor.js and prism-autoloader.min.js (document order).
if (window.Prism?.plugins?.autoloader) {
	window.Prism.plugins.autoloader.languages_path = "/js/prism-components/";
	window.Prism.plugins.autoloader.loadLanguages([
		"go",
		"bash",
		"yaml",
		"json",
		"rust",
		"python",
		"typescript",
		"c",
		"cpp",
	]);
}
