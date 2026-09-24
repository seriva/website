#!/usr/bin/env node

// ===========================================
// UNIFIED WEBSITE BUILD UTILITY
// ===========================================
// Commands:
//   content  — Compile app/data/content.yaml into content.json
//   sync     — Copy public assets from app/ to public/ (configured in package.json)
//   seo      — Generate public/sitemap.xml and public/rss.xml
//   post     — Run sync + seo (production post-build)
//   all      — Run content + sync + seo

import {
	copyFileSync,
	cpSync,
	existsSync,
	mkdirSync,
	readFileSync,
	statSync,
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

const DEFAULT_PUBLIC_ASSETS = [
	"index.html",
	"404.html",
	"boot.js",
	"favicon.svg",
	"og-image.jpg",
	"robots.txt",
	"data",
	"fonts",
	"css",
];

// ── 1. Content Compilation (YAML → JSON) ──────────────────────

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

// ── 2. Public Asset Synchronization ───────────────────────────

const DEV_ORIGIN = /\s+(?:https?|wss?):\/\/localhost:\d+/g;

function stripDevOrigins(html) {
	return html.replace(
		/(<meta http-equiv="Content-Security-Policy" content=")([^"]*)(")/,
		(_m, open, csp, close) => open + csp.replace(DEV_ORIGIN, "") + close,
	);
}

function syncPublicAssets() {
	mkdirSync(publicDir, { recursive: true });

	const assetsToCopy =
		pkg.publicAssets || pkg.staticAssets || DEFAULT_PUBLIC_ASSETS;
	let copiedCount = 0;

	for (const item of assetsToCopy) {
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
	if (contentData.site?.url) {
		return contentData.site.url.replace(/\/$/, "");
	}
	if (contentData.site?.title?.includes(".")) {
		return `https://${contentData.site.title}`;
	}
	return "https://example.com";
}

function generateSeo() {
	const jsonPath = join(appDir, "data/content.json");
	let contentData;
	if (existsSync(jsonPath)) {
		contentData = JSON.parse(readFileSync(jsonPath, "utf8"));
	} else {
		const yamlPath = join(appDir, "data/content.yaml");
		contentData = parse(readFileSync(yamlPath, "utf8"));
	}

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

// ── CLI Dispatch ──────────────────────────────────────────────

const command = process.argv[2] || "all";

switch (command) {
	case "content":
		compileContent();
		break;
	case "sync":
	case "static":
	case "public":
		syncPublicAssets();
		break;
	case "seo":
		generateSeo();
		break;
	case "post":
		syncPublicAssets();
		generateSeo();
		break;
	case "all":
		compileContent();
		syncPublicAssets();
		generateSeo();
		break;
	default:
		console.error(`Unknown command: ${command}`);
		console.error("Usage: node scripts/build.js [content|sync|seo|post|all]");
		process.exit(1);
}
