#!/usr/bin/env node

// ===========================================
// STATIC ASSET SYNC FOR PRODUCTION
// ===========================================
// Copies static site assets from app/ to public/

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

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const appDir = join(__dirname, "../app");
const publicDir = join(__dirname, "../public");

const ASSETS_TO_COPY = [
	"index.html",
	"404.html",
	"boot.js",
	"prism-init.js",
	"favicon.svg",
	"og-image.jpg",
	"robots.txt",
	"data",
	"fonts",
	"css",
];

// Dev-server origins only belong in the local CSP, never in the deployed one.
const DEV_ORIGIN = /\s+(?:https?|wss?):\/\/localhost:\d+/g;

function stripDevOrigins(html) {
	return html.replace(
		/(<meta http-equiv="Content-Security-Policy" content=")([^"]*)(")/,
		(_m, open, csp, close) => open + csp.replace(DEV_ORIGIN, "") + close,
	);
}

function main() {
	mkdirSync(publicDir, { recursive: true });

	let copiedCount = 0;

	for (const item of ASSETS_TO_COPY) {
		const srcPath = join(appDir, item);
		const destPath = join(publicDir, item);

		if (!existsSync(srcPath)) {
			console.warn(
				`[copy-static] Warning: ${item} not found in app/ — skipping`,
			);
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

	console.log(`✓ Successfully copied ${copiedCount} static assets to public/`);
}

main();
