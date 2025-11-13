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

const RSS_MAX_ITEMS = 20; // Limit RSS feed items

// ===========================================
// UTILITIES
// ===========================================

function escapeXml(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&apos;");
}

function buildXml(parts) {
	return parts.join("");
}

function generateSitemap(contentData, baseUrl) {
	const today = new Date().toISOString().split("T")[0];
	const parts = [
		'<?xml version="1.0" encoding="UTF-8"?>\n',
		'<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n',
	];

	// Helper to add URL entry
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

	// Add homepage (blog)
	addUrl("", today, "weekly", "1.0");

	// Add blog posts
	if (contentData.blog?.posts) {
		for (const post of contentData.blog.posts) {
			const slug = escapeXml(post.filename.replace(/\.md$/, ""));
			addUrl(`?blog=${slug}`, post.date || today, "monthly", "0.8");
		}
	}

	// Add projects
	if (contentData.projects) {
		for (const project of contentData.projects) {
			const id = escapeXml(project.id);
			addUrl(`?project=${id}`, today, "monthly", "0.9");
		}
	}

	// Add pages
	if (contentData.pages) {
		for (const pageId of Object.keys(contentData.pages)) {
			const id = escapeXml(pageId);
			addUrl(`?page=${id}`, today, "monthly", "0.7");
		}
	}

	parts.push("</urlset>\n");
	return buildXml(parts);
}

// ===========================================
// RSS FEED GENERATION
// ===========================================

function generateRssFeed(contentData, baseUrl) {
	const site = contentData.site || {};
	const posts = contentData.blog?.posts || [];

	// Sort posts by date (newest first) and limit to RSS_MAX_ITEMS
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

	// Add blog posts
	for (const post of sortedPosts) {
		const slug = escapeXml(post.filename.replace(/\.md$/, ""));
		const postUrl = `${baseUrl}?blog=${slug}`;
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
			parts.push(`      <description>${escapeXml(post.excerpt)}</description>\n`);
		}

		// Add categories/tags
		if (post.tags?.length) {
			for (const tag of post.tags) {
				parts.push(`      <category>${escapeXml(tag)}</category>\n`);
			}
		}

		parts.push("    </item>\n");
	}

	parts.push("  </channel>\n", "</rss>\n");
	return buildXml(parts);
}

// ===========================================
// MAIN
// ===========================================

function getBaseUrl(contentData) {
	// Priority: site.url > site.title (if domain-like) > default
	if (contentData.site?.url) {
		return contentData.site.url.replace(/\/$/, ""); // Remove trailing slash
	}
	if (contentData.site?.title?.includes(".")) {
		return `https://${contentData.site.title}`;
	}
	return "https://example.com";
}

function main() {
	try {
		// Read and parse content.yaml
		const contentPath = join(__dirname, "../app/data/content.yaml");
		const yamlText = readFileSync(contentPath, "utf8");
		const contentData = YAMLParser.parse(yamlText);

		const baseUrl = getBaseUrl(contentData);
		const publicDir = join(__dirname, "../public");

		// Generate sitemap
		const sitemap = generateSitemap(contentData, baseUrl);
		const sitemapPath = join(publicDir, "sitemap.xml");
		writeFileSync(sitemapPath, sitemap);
		
		const urlCount = (sitemap.match(/<url>/g) || []).length;
		console.log(`✓ Generated sitemap: ${sitemapPath}`);
		console.log(`  → ${urlCount} URLs`);

		// Generate RSS feed
		const rssFeed = generateRssFeed(contentData, baseUrl);
		const rssPath = join(publicDir, "rss.xml");
		writeFileSync(rssPath, rssFeed);
		
		const itemCount = (rssFeed.match(/<item>/g) || []).length;
		console.log(`✓ Generated RSS feed: ${rssPath}`);
		console.log(`  → ${itemCount} blog posts`);
	} catch (error) {
		console.error("Error generating sitemap/RSS feed:", error.message);
		process.exit(1);
	}
}

main();
