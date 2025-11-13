#!/usr/bin/env node

// ===========================================
// SITEMAP & RSS FEED GENERATOR
// ===========================================
// Generates sitemap.xml and rss.xml from content.yaml

import { readFileSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { YAMLParser } from "../app/src/yaml-parser.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// ===========================================
// SITEMAP GENERATION
// ===========================================

function escapeXml(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function generateSitemap(contentData, baseUrl) {
	const urls = [];
	const today = new Date().toISOString().split("T")[0];

	// Add homepage (blog)
	urls.push({
		loc: baseUrl,
		lastmod: today,
		changefreq: "weekly",
		priority: "1.0",
	});

	// Add blog posts
	if (contentData.blog?.posts) {
		for (const post of contentData.blog.posts) {
			const filename = post.filename;
			const slug = filename.replace(/\.md$/, "");

			urls.push({
				loc: `${baseUrl}?blog=${escapeXml(slug)}`,
				lastmod: post.date || today,
				changefreq: "monthly",
				priority: "0.8",
			});
		}
	}

	// Add projects
	if (contentData.projects) {
		for (const project of contentData.projects) {
			urls.push({
				loc: `${baseUrl}?project=${escapeXml(project.id)}`,
				lastmod: today,
				changefreq: "monthly",
				priority: "0.9",
			});
		}
	}

	// Add pages
	if (contentData.pages) {
		for (const [pageId, page] of Object.entries(contentData.pages)) {
			urls.push({
				loc: `${baseUrl}?page=${escapeXml(pageId)}`,
				lastmod: today,
				changefreq: "monthly",
				priority: "0.7",
			});
		}
	}

	// Generate XML
	let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
	xml +=
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n';

	for (const url of urls) {
		xml += "  <url>\n";
		xml += `    <loc>${url.loc}</loc>\n`;
		xml += `    <lastmod>${url.lastmod}</lastmod>\n`;
		xml += `    <changefreq>${url.changefreq}</changefreq>\n`;
		xml += `    <priority>${url.priority}</priority>\n`;
		xml += "  </url>\n";
	}

	xml += "</urlset>\n";

	return xml;
}

// ===========================================
// RSS FEED GENERATION
// ===========================================

function generateRssFeed(contentData, baseUrl) {
	const site = contentData.site || {};
	const blog = contentData.blog || {};
	const posts = blog.posts || [];

	// Sort posts by date (newest first)
	const sortedPosts = [...posts].sort((a, b) => {
		const dateA = new Date(a.date || "1970-01-01");
		const dateB = new Date(b.date || "1970-01-01");
		return dateB - dateA;
	});

	// Build feed
	let xml = '<?xml version="1.0" encoding="UTF-8"?>\n';
	xml += '<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">\n';
	xml += "  <channel>\n";
	xml += `    <title>${escapeXml(site.title || "Blog")}</title>\n`;
	xml += `    <link>${baseUrl}</link>\n`;
	xml += `    <description>${escapeXml(site.description || "Latest blog posts")}</description>\n`;
	xml += `    <language>en</language>\n`;
	xml += `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>\n`;
	xml += `    <atom:link href="${baseUrl}/rss.xml" rel="self" type="application/rss+xml" />\n`;

	// Add blog posts
	for (const post of sortedPosts) {
		const filename = post.filename;
		const slug = filename.replace(/\.md$/, "");
		const postUrl = `${baseUrl}?blog=${escapeXml(slug)}`;
		const pubDate = post.date
			? new Date(post.date).toUTCString()
			: new Date().toUTCString();

		xml += "    <item>\n";
		xml += `      <title>${escapeXml(post.title || slug)}</title>\n`;
		xml += `      <link>${postUrl}</link>\n`;
		xml += `      <guid isPermaLink="true">${postUrl}</guid>\n`;
		xml += `      <pubDate>${pubDate}</pubDate>\n`;

		if (post.excerpt) {
			xml += `      <description>${escapeXml(post.excerpt)}</description>\n`;
		}

		// Add categories/tags
		if (post.tags && Array.isArray(post.tags)) {
			for (const tag of post.tags) {
				xml += `      <category>${escapeXml(tag)}</category>\n`;
			}
		}

		xml += "    </item>\n";
	}

	xml += "  </channel>\n";
	xml += "</rss>\n";

	return xml;
}

// ===========================================
// MAIN
// ===========================================

function main() {
	try {
		// Read content.yaml
		const contentPath = join(__dirname, "../app/data/content.yaml");
		const yamlText = readFileSync(contentPath, "utf8");
		const contentData = YAMLParser.parse(yamlText);

		// Get base URL from site title or use default
		const baseUrl =
			contentData.site?.title?.includes(".")
				? `https://${contentData.site.title}`
				: "https://example.com";

		// Generate sitemap
		const sitemap = generateSitemap(contentData, baseUrl);
		const publicSitemapPath = join(__dirname, "../public/sitemap.xml");
		writeFileSync(publicSitemapPath, sitemap);
		console.log(`✓ Generated sitemap: ${publicSitemapPath}`);

		const urlCount = (sitemap.match(/<url>/g) || []).length;
		console.log(`  → ${urlCount} URLs`);

		// Generate RSS feed
		const rssFeed = generateRssFeed(contentData, baseUrl);
		const publicRssPath = join(__dirname, "../public/rss.xml");
		writeFileSync(publicRssPath, rssFeed);
		console.log(`✓ Generated RSS feed: ${publicRssPath}`);

		const itemCount = (rssFeed.match(/<item>/g) || []).length;
		console.log(`  → ${itemCount} blog posts`);
	} catch (error) {
		console.error("Error generating sitemap/RSS feed:", error.message);
		process.exit(1);
	}
}

main();
