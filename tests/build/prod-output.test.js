// Build regression: `npm run prod` must start from a clean public/ and ship a
// complete, self-consistent output. Sentinels only ever go under public/.

import assert from "node:assert/strict";
import { execSync } from "node:child_process";
import {
	existsSync,
	mkdirSync,
	readdirSync,
	readFileSync,
	writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { test } from "node:test";
import { fileURLToPath } from "node:url";

const rootDir = join(dirname(fileURLToPath(import.meta.url)), "..", "..");
const publicDir = join(rootDir, "public");

const STALE = [
	"stale-sentinel.html",
	"blog/removed-post/index.html",
	"page/removed/index.html",
	"data/content.yaml",
	"data/blog/old-post.html",
	"data/blog/.keep",
];

function readPublic(rel) {
	return readFileSync(join(publicDir, rel), "utf8");
}

test("npm run prod replaces stale output with a complete build", () => {
	for (const rel of STALE) {
		mkdirSync(dirname(join(publicDir, rel)), { recursive: true });
		writeFileSync(join(publicDir, rel), "stale\n");
	}

	try {
		execSync("npm run prod", { cwd: rootDir, stdio: "pipe" });
	} catch (err) {
		throw new Error(`npm run prod failed:\n${err.stdout}\n${err.stderr}`);
	}

	for (const rel of STALE) {
		assert.equal(existsSync(join(publicDir, rel)), false, `${rel} survived`);
	}

	const content = JSON.parse(readPublic("data/content.json"));
	const expected = [
		"app.js",
		"vendor.js",
		"boot.js",
		"index.html",
		"404.html",
		"css/app.css",
		"sitemap.xml",
		"rss.xml",
	];
	for (const post of content.blog.posts) {
		expected.push(`data/blog/${post.filename}`);
	}
	for (const id of Object.keys(content.pages)) {
		expected.push(`data/pages/${id}.md`);
	}
	for (const rel of expected) {
		assert.equal(existsSync(join(publicDir, rel)), true, `${rel} missing`);
	}

	// Pure SPA: no redundant static route stub directories exist in public/
	for (const dir of ["blog", "project", "page"]) {
		assert.equal(
			existsSync(join(publicDir, dir)),
			false,
			`${dir}/ directory should not exist in pure SPA build`,
		);
	}

	// Only Markdown or a file a live route actually references may ship.
	const referenced = new Set([
		...content.blog.posts.map((p) => `data/blog/${p.filename}`),
		...Object.keys(content.pages).map((id) => `data/pages/${id}.md`),
	]);
	for (const dir of ["data/blog", "data/pages"]) {
		for (const name of readdirSync(join(publicDir, dir))) {
			assert.ok(
				name.endsWith(".md") || referenced.has(`${dir}/${name}`),
				`${dir}/${name} is not runtime content`,
			);
		}
	}

	// Site metadata and shared asset version between index.html and 404.html shell.
	const baseUrl = content.site.url.replace(/\/$/, "");
	const indexHtml = readPublic("index.html");
	assert.ok(
		indexHtml.includes(`<link rel="canonical" href="${baseUrl}">`),
		"index canonical",
	);
	assert.match(indexHtml, /property="og:type" content="website"/);
	const version = indexHtml.match(/src="\/app\.js\?v=([0-9a-z]+)"/)?.[1];
	assert.ok(version, "index is cache-busted");
	for (const rel of ["index.html", "404.html"]) {
		assert.ok(
			readPublic(rel).includes(`src="/app.js?v=${version}"`),
			`${rel} shares asset version`,
		);
		assert.ok(
			readPublic(rel).includes(
				'<script id="site-data" type="application/json">',
			),
			`${rel} has inlined site data`,
		);
	}
	assert.doesNotMatch(readPublic("index.html"), /localhost:\d+/);

	const slug = content.blog.posts[0].filename.replace(/\.md$/, "");
	assert.match(
		readPublic("sitemap.xml"),
		new RegExp(`${baseUrl}/blog/${slug}`),
	);
	assert.match(readPublic("rss.xml"), /<item>/);
});
