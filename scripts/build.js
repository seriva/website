#!/usr/bin/env node

// ===========================================
// UNIFIED WEBSITE BUILD UTILITY
// ===========================================
// Commands (see package.json scripts):
//   clean    — Remove the generated public/ directory (never touches app/)
//   content  — Compile app/data/content.yaml into content.json
//   dev      — Run content watch + dev server concurrently
//   post     — Sync public assets, generate sitemap/RSS and route stubs

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
	copyFileSync,
	cpSync,
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	rmSync,
	statSync,
	watch,
	writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const rootDir = join(__dirname, "..");
const appDir = join(rootDir, "app");
const publicDir = join(rootDir, "public");

const pkgPath = join(rootDir, "package.json");
const pkg = JSON.parse(readFileSync(pkgPath, "utf8"));

// ── 0. Clean generated output ─────────────────────────────────

// Runs first in `npm run prod`, before `gofront prep` and the compiler emit
// bundles into public/, so stale stubs and removed posts never survive a build.
function cleanPublic() {
	rmSync(publicDir, { recursive: true, force: true });
	console.log(`✓ Cleaned ${publicDir}`);
}

// ── 1. Content Compilation & Watching (YAML → JSON) ───────────

function compileContent() {
	const yamlPath = join(appDir, "data/content.yaml");
	if (!existsSync(yamlPath)) {
		console.error(`Error: ${yamlPath} not found.`);
		process.exit(1);
	}

	const yamlText = readFileSync(yamlPath, "utf8");
	const data = parse(yamlText);
	const jsonText = `${JSON.stringify(data, null, 2)}\n`;

	const appJsonPath = join(appDir, "data/content.json");
	mkdirSync(dirname(appJsonPath), { recursive: true });
	writeFileSync(appJsonPath, jsonText, "utf8");
	console.log(`✓ Compiled ${yamlPath} → ${appJsonPath}`);

	const publicDataDir = join(publicDir, "data");
	if (existsSync(publicDataDir)) {
		const publicJsonPath = join(publicDataDir, "content.json");
		writeFileSync(publicJsonPath, jsonText, "utf8");
		console.log(`✓ Synchronized → ${publicJsonPath}`);
	}
}

function watchContent() {
	compileContent();
	const dataDir = join(appDir, "data");
	const yamlPath = join(dataDir, "content.yaml");
	console.log(`Watching ${yamlPath} for changes...`);
	let debounceTimer = null;
	// Watch the directory, not the file: atomic-save editors replace the inode
	// and a file watcher silently stops firing after the first save.
	watch(dataDir, (_eventType, filename) => {
		if (filename && filename !== "content.yaml") return;
		clearTimeout(debounceTimer);
		debounceTimer = setTimeout(() => {
			try {
				compileContent();
			} catch (err) {
				console.error("Failed to recompile content.yaml:", err);
			}
		}, 100);
	});
}

function runDev() {
	watchContent();

	const child = spawn(
		"npx",
		["gofront", "src", "-o", "app/app.js", "--serve", "--port", "8181"],
		{
			cwd: rootDir,
			stdio: "inherit",
		},
	);

	child.on("exit", (code) => process.exit(code ?? 0));
	process.on("SIGINT", () => {
		child.kill("SIGINT");
		process.exit(0);
	});
	process.on("SIGTERM", () => {
		child.kill("SIGTERM");
		process.exit(0);
	});
}

// loadContentData reads the JSON produced by the `content` step, which always
// runs first in `npm run prep` / `npm run prod`.
function loadContentData() {
	return JSON.parse(readFileSync(join(appDir, "data/content.json"), "utf8"));
}

// ── 2. Public Asset Synchronization & Minification ─────────────

const DEV_ORIGIN = /\s+(?:https?|wss?):\/\/localhost:\d+/g;

function stripDevOrigins(html) {
	return html.replace(
		/(<meta http-equiv="Content-Security-Policy" content=")([^"]*)(")/,
		(_m, open, csp, close) => open + csp.replace(DEV_ORIGIN, "") + close,
	);
}

function minifyCss(css) {
	// `+` and `-` are deliberately not in the collapse set: calc() requires
	// whitespace around them, and adjacent-sibling combinators tolerate it.
	return css
		.replace(/\/\*[\s\S]*?\*\//g, "")
		.replace(/\s+/g, " ")
		.replace(/\s*([{}:;,>~])\s*/g, "$1")
		.replace(/;}/g, "}")
		.trim();
}

// One version for every emitted HTML file, derived from the shipped bundles so
// unchanged deploys keep their cache and stubs/index never disagree.
let assetVersion = null;
function getAssetVersion() {
	if (assetVersion) return assetVersion;
	const hash = createHash("sha1");
	let hashed = 0;
	for (const rel of [
		"public/app.js",
		"public/vendor.js",
		"app/css/app.css",
		"app/boot.js",
	]) {
		const p = join(rootDir, rel);
		if (existsSync(p)) {
			hash.update(readFileSync(p));
			hashed++;
		}
	}
	assetVersion =
		hashed > 0 ? hash.digest("hex").slice(0, 10) : Date.now().toString(36);
	return assetVersion;
}

function applyCacheBusting(html, version) {
	return html
		.replace(/(href="\/css\/app\.css)(?:[^"]*)(")/g, `$1?v=${version}$2`)
		.replace(/(src="\/boot\.js)(?:[^"]*)(")/g, `$1?v=${version}$2`)
		.replace(/(src="\/vendor\.js)(?:[^"]*)(")/g, `$1?v=${version}$2`)
		.replace(/(src="\/app\.js)(?:[^"]*)(")/g, `$1?v=${version}$2`);
}

// Only runtime data ships: content.json plus the Markdown the router fetches
// from /data/blog/<filename> and /data/pages/<id>.md. Source content.yaml,
// .keep markers and leftover .html never reach public/.
function syncRuntimeData(contentData) {
	const srcDataDir = join(appDir, "data");
	const destDataDir = join(publicDir, "data");
	mkdirSync(destDataDir, { recursive: true });
	copyFileSync(
		join(srcDataDir, "content.json"),
		join(destDataDir, "content.json"),
	);

	const files = new Set();
	for (const dir of ["blog", "pages"]) {
		const srcDir = join(srcDataDir, dir);
		if (!existsSync(srcDir)) continue;
		for (const name of readdirSync(srcDir)) {
			if (name.endsWith(".md")) files.add(`${dir}/${name}`);
		}
	}
	// Referenced files are kept whatever their extension so a live route never
	// silently loses its content.
	for (const post of contentData.blog?.posts ?? []) {
		if (post.filename) files.add(`blog/${post.filename}`);
	}
	// Already covered by the readdir above when present; a page whose Markdown
	// is missing surfaces as a warning below instead of a silent 404.
	for (const pageId of Object.keys(contentData.pages ?? {})) {
		files.add(`pages/${pageId}.md`);
	}

	let copied = 0;
	for (const rel of [...files].sort()) {
		const srcPath = join(srcDataDir, rel);
		if (!existsSync(srcPath)) {
			console.warn(`[sync] Warning: data/${rel} not found in app/ — skipping`);
			continue;
		}
		const destPath = join(destDataDir, rel);
		mkdirSync(dirname(destPath), { recursive: true });
		copyFileSync(srcPath, destPath);
		copied++;
	}
	console.log(
		`✓ Copied runtime data: content.json + ${copied} content files → public/data/`,
	);
}

function syncPublicAssets() {
	mkdirSync(publicDir, { recursive: true });

	const contentData = loadContentData();
	syncRuntimeData(contentData);

	let copiedCount = 0;

	for (const item of pkg.publicAssets) {
		const srcPath = join(appDir, item);
		const destPath = join(publicDir, item);

		if (!existsSync(srcPath)) {
			console.warn(`[sync] Warning: ${item} not found in app/ — skipping`);
			continue;
		}

		const stat = statSync(srcPath);
		if (stat.isDirectory()) {
			cpSync(srcPath, destPath, { recursive: true, force: true });
			copiedCount++;
			console.log(`✓ Copied directory: ${item}/ → public/${item}/`);
		} else {
			mkdirSync(dirname(destPath), { recursive: true });
			if (item === "index.html") {
				writeFileSync(destPath, stripDevOrigins(readFileSync(srcPath, "utf8")));
			} else {
				copyFileSync(srcPath, destPath);
			}
			copiedCount++;
			console.log(`✓ Copied file: ${item} → public/${item}`);
		}
	}

	// Minify public CSS
	const publicCssPath = join(publicDir, "css/app.css");
	if (existsSync(publicCssPath)) {
		const rawCss = readFileSync(publicCssPath, "utf8");
		const minCss = minifyCss(rawCss);
		writeFileSync(publicCssPath, minCss, "utf8");
		const pct = Math.round((1 - minCss.length / rawCss.length) * 100);
		console.log(
			`✓ Minified ${publicCssPath} (${rawCss.length} → ${minCss.length} bytes, -${pct}%)`,
		);
	}

	// Root index.html: site-level meta from content data + cache busting
	const publicIndexPath = join(publicDir, "index.html");
	if (existsSync(publicIndexPath)) {
		const site = contentData.site || {};
		const version = getAssetVersion();
		let indexHtml = readFileSync(publicIndexPath, "utf8");
		indexHtml = injectMetadata(indexHtml, {
			title: site.title,
			description: site.description,
			url: getBaseUrl(contentData),
			type: "website",
		});
		indexHtml = applyCacheBusting(indexHtml, version);
		writeFileSync(publicIndexPath, indexHtml, "utf8");
		console.log(
			`✓ Applied site meta + cache busting (v=${version}) to public/index.html`,
		);
		// GitHub Pages serves 404.html at the requested URL without redirecting, so
		// shipping the app shell as 404.html lets the SPA router handle unknown deep links.
		writeFileSync(join(publicDir, "404.html"), indexHtml, "utf8");
		console.log("✓ Wrote public/404.html as SPA shell");
	}

	console.log(`✓ Successfully copied ${copiedCount} public assets to public/`);
}

// ── 3. Sitemap & RSS Generation ───────────────────────────────

const RSS_MAX_ITEMS = 20;

function escapeXml(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function generateSitemap(contentData, baseUrl) {
	const today = new Date().toISOString().split("T")[0];
	const parts = [
		'<?xml version="1.0" encoding="UTF-8"?>\n',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n',
	];

	const addUrl = (path, lastmod, changefreq, priority) => {
		parts.push(
			"  <url>\n",
			`    <loc>${baseUrl}${path}</loc>\n`,
			`    <lastmod>${lastmod}</lastmod>\n`,
			`    <changefreq>${changefreq}</changefreq>\n`,
			`    <priority>${priority}</priority>\n`,
			"  </url>\n",
		);
	};

	addUrl("", today, "weekly", "1.0");
	addUrl("/blog", today, "weekly", "0.9");

	if (contentData.blog?.posts) {
		for (const post of contentData.blog.posts) {
			const slug = escapeXml(post.filename.replace(/\.md$/, ""));
			addUrl(`/blog/${slug}`, post.date || today, "monthly", "0.8");
		}
	}

	if (contentData.projects) {
		for (const project of contentData.projects) {
			const id = escapeXml(project.id);
			addUrl(`/project/${id}`, today, "monthly", "0.9");
		}
	}

	if (contentData.pages) {
		for (const pageId of Object.keys(contentData.pages)) {
			const id = escapeXml(pageId);
			addUrl(`/page/${id}`, today, "monthly", "0.7");
		}
	}

	parts.push("</urlset>\n");
	return parts.join("");
}

function generateRssFeed(contentData, baseUrl) {
	const site = contentData.site || {};
	const posts = contentData.blog?.posts || [];

	const sortedPosts = [...posts]
		.sort((a, b) => {
			const dateA = new Date(a.date || "1970-01-01");
			const dateB = new Date(b.date || "1970-01-01");
			return dateB - dateA;
		})
		.slice(0, RSS_MAX_ITEMS);

	const now = new Date().toUTCString();
	const parts = [
		'<?xml version="1.0" encoding="UTF-8"?>\n',
		'<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n',
		"  <channel>\n",
		`    <title>${escapeXml(site.title || "Blog")}</title>\n`,
		`    <link>${baseUrl}</link>\n`,
		`    <description>${escapeXml(site.description || "Latest blog posts")}</description>\n`,
		"    <language>en</language>\n",
		`    <lastBuildDate>${now}</lastBuildDate>\n`,
		`    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />\n`,
	];

	for (const post of sortedPosts) {
		const slug = escapeXml(post.filename.replace(/\.md$/, ""));
		const postUrl = `${baseUrl}/blog/${slug}`;
		const title = escapeXml(post.title || slug);
		const pubDate = post.date ? new Date(post.date).toUTCString() : now;

		parts.push(
			"    <item>\n",
			`      <title>${title}</title>\n`,
			`      <link>${postUrl}</link>\n`,
			`      <guid isPermaLink="true">${postUrl}</guid>\n`,
			`      <pubDate>${pubDate}</pubDate>\n`,
		);

		if (post.excerpt) {
			parts.push(
				`      <description>${escapeXml(post.excerpt)}</description>\n`,
			);
		}

		if (post.tags?.length) {
			for (const tag of post.tags) {
				parts.push(`      <category>${escapeXml(tag)}</category>\n`);
			}
		}

		parts.push("    </item>\n");
	}

	parts.push("  </channel>\n", "</rss>\n");
	return parts.join("");
}

function getBaseUrl(contentData) {
	const url = contentData.site?.url;
	if (!url) {
		console.error("Error: site.url is not set in app/data/content.yaml");
		process.exit(1);
	}
	return url.replace(/\/$/, "");
}

function generateSeo() {
	const contentData = loadContentData();
	const baseUrl = getBaseUrl(contentData);
	mkdirSync(publicDir, { recursive: true });

	const sitemap = generateSitemap(contentData, baseUrl);
	const sitemapPath = join(publicDir, "sitemap.xml");
	writeFileSync(sitemapPath, sitemap);
	const urlCount = (sitemap.match(/<url>/g) || []).length;
	console.log(`✓ Generated sitemap: ${sitemapPath} (${urlCount} URLs)`);

	const rssFeed = generateRssFeed(contentData, baseUrl);
	const rssPath = join(publicDir, "rss.xml");
	writeFileSync(rssPath, rssFeed);
	const itemCount = (rssFeed.match(/<item>/g) || []).length;
	console.log(`✓ Generated RSS feed: ${rssPath} (${itemCount} posts)`);
}

// ── 4. Static HTML Route Generation ───────────────────────────

function escapeHtml(str) {
	if (!str) return "";
	return String(str)
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#39;");
}

function replaceOrInsertMeta(html, selectorAttr, contentValue) {
	const regex = new RegExp(
		`<meta\\s+[^>]*?${selectorAttr.replace(/([.*+?^=!:${}()|[\]/\\])/g, "\\$1")}[^>]*?>`,
		"i",
	);
	if (regex.test(html)) {
		return html.replace(regex, (match) => {
			if (/content="[^"]*"/i.test(match)) {
				return match.replace(/content="[^"]*"/i, `content="${contentValue}"`);
			}
			return match.replace(/>$/, ` content="${contentValue}">`);
		});
	}
	const [attr, val] = selectorAttr.split("=");
	return html.replace(
		"</head>",
		`    <meta ${attr}=${val} content="${contentValue}">\n</head>`,
	);
}

function injectMetadata(html, { title, description, url, type = "website" }) {
	let output = html;

	if (title) {
		const escapedTitle = escapeHtml(title);
		output = output.replace(
			/<title>.*?<\/title>/s,
			`<title>${escapedTitle}</title>`,
		);
		output = replaceOrInsertMeta(output, 'property="og:title"', escapedTitle);
		output = replaceOrInsertMeta(
			output,
			'property="twitter:title"',
			escapedTitle,
		);
	}

	if (description) {
		const escapedDesc = escapeHtml(description);
		output = replaceOrInsertMeta(output, 'name="description"', escapedDesc);
		output = replaceOrInsertMeta(
			output,
			'property="og:description"',
			escapedDesc,
		);
		output = replaceOrInsertMeta(
			output,
			'property="twitter:description"',
			escapedDesc,
		);
	}

	if (url) {
		const escapedUrl = escapeHtml(url);
		output = replaceOrInsertMeta(output, 'property="og:url"', escapedUrl);
		if (output.includes('rel="canonical"')) {
			output = output.replace(
				/<link[^>]*rel="canonical"[^>]*>/i,
				`<link rel="canonical" href="${escapedUrl}">`,
			);
		} else {
			output = output.replace(
				"</head>",
				`    <link rel="canonical" href="${escapedUrl}">\n</head>`,
			);
		}
	}

	if (type) {
		const escapedType = escapeHtml(type);
		output = replaceOrInsertMeta(output, 'property="og:type"', escapedType);
	}

	return output;
}

function generateStaticRoutes(contentData, baseUrl) {
	const indexPath = join(appDir, "index.html");
	if (!existsSync(indexPath)) return;

	const baseHtml = stripDevOrigins(readFileSync(indexPath, "utf8"));
	const version = getAssetVersion();
	const site = contentData.site || {};
	const siteTitle = site.title || "Portfolio";
	const siteDesc = site.description || "";
	let generatedCount = 0;

	const writeRoute = (relPath, meta) => {
		const destFile = join(publicDir, relPath, "index.html");
		mkdirSync(dirname(destFile), { recursive: true });
		let html = injectMetadata(baseHtml, meta);
		html = applyCacheBusting(html, version);
		writeFileSync(destFile, html, "utf8");
		generatedCount++;
	};

	// 1. Blog home
	writeRoute("blog", {
		title: siteTitle,
		description: siteDesc,
		url: `${baseUrl}/blog`,
		type: "website",
	});

	// 2. Blog posts
	if (contentData.blog?.posts) {
		for (const post of contentData.blog.posts) {
			const slug = post.filename.replace(/\.md$/, "");
			const postTitle = post.title ? `${post.title} - ${siteTitle}` : siteTitle;
			writeRoute(`blog/${slug}`, {
				title: postTitle,
				description: post.excerpt || siteDesc,
				url: `${baseUrl}/blog/${slug}`,
				type: "article",
			});
		}

		// 3. Blog pagination
		const perPage = contentData.blog.postsPerPage || 5;
		const totalPages = Math.ceil(contentData.blog.posts.length / perPage);
		// blog/page/1 is kept as an alias; its canonical is /blog like the SPA's.
		for (let p = 1; p <= totalPages; p++) {
			writeRoute(`blog/page/${p}`, {
				title: p > 1 ? `Blog - ${siteTitle}` : siteTitle,
				description: siteDesc,
				url: p > 1 ? `${baseUrl}/blog/page/${p}` : `${baseUrl}/blog`,
				type: "website",
			});
		}
	}

	// 4. Projects
	if (contentData.projects) {
		for (const proj of contentData.projects) {
			const projTitle = proj.title ? `${proj.title} - ${siteTitle}` : siteTitle;
			writeRoute(`project/${proj.id}`, {
				title: projTitle,
				description: proj.description || siteDesc,
				url: `${baseUrl}/project/${proj.id}`,
				type: "website",
			});
		}
	}

	// 5. Pages
	if (contentData.pages) {
		for (const [pageId, pageData] of Object.entries(contentData.pages)) {
			const pageTitle = pageData.title
				? `${pageData.title} - ${siteTitle}`
				: siteTitle;
			writeRoute(`page/${pageId}`, {
				title: pageTitle,
				description: siteDesc,
				url: `${baseUrl}/page/${pageId}`,
				type: "website",
			});
		}
	}

	console.log(
		`✓ Pre-generated ${generatedCount} static HTML route stubs in public/`,
	);
}

function generateRoutes() {
	const contentData = loadContentData();
	const baseUrl = getBaseUrl(contentData);
	generateStaticRoutes(contentData, baseUrl);
}

// ── CLI Dispatch ──────────────────────────────────────────────

const command = process.argv[2];

switch (command) {
	case "clean":
		cleanPublic();
		break;
	case "content":
		compileContent();
		break;
	case "dev":
		runDev();
		break;
	case "post":
		syncPublicAssets();
		generateSeo();
		generateRoutes();
		break;
	default:
		console.error(`Unknown command: ${command}`);
		console.error("Usage: node scripts/build.js [clean|content|dev|post]");
		process.exit(1);
}
