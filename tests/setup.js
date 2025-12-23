// Test environment setup
// Mock localStorage before any imports (Node.js v25 requires --localstorage-file flag)
// EmailJS library accesses localStorage at import time, so we need this stub early
global.localStorage = {
    _data: {},
    getItem(key) {
        return this._data[key] ?? null;
    },
    setItem(key, value) {
        this._data[key] = String(value);
    },
    removeItem(key) {
        delete this._data[key];
    },
    clear() {
        this._data = {};
    },
};

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
    <!-- Components will append themselves to body -->
    <!-- main-content element created by MainContent component -->
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
global.Event = dom.window.Event;
global.CustomEvent = dom.window.CustomEvent;

