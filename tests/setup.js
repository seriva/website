// Test environment setup
import { JSDOM } from "jsdom";

// Create a minimal DOM environment
const dom = new JSDOM(
	`<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>Test Environment</title>
    <style>
        :root {
            --accent: #007bff;
            --background-color: #ffffff;
        }
        body {
            font-family: Raleway, sans-serif;
        }
    </style>
</head>
<body>
    <div id="navbar-container"></div>
    <main id="main-content"></main>
    <div id="footer-container"></div>
</body>
</html>`,
	{
		url: "http://localhost:8081",
		pretendToBeVisual: true,
		resources: "usable",
	},
);

// Set up global objects
global.window = dom.window;
global.document = dom.window.document;
global.HTMLElement = dom.window.HTMLElement;
global.Element = dom.window.Element;
global.Node = dom.window.Node;

