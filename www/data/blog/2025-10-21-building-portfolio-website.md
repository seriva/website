---
title: "Building a Portfolio Website"
date: "2025-10-21"
excerpt: "How I built this portfolio website using vanilla JavaScript, YAML configuration, and zero-md for markdown rendering."
tags: ["web development", "javascript", "tutorial"]
---

# Building a Portfolio Website

Today I want to share how I built this portfolio website from scratch.

## Technology Stack

I kept things simple and modern:

```javascript
const techStack = {
  frontend: ['HTML', 'CSS', 'JavaScript'],
  styling: ['Bootstrap 5', 'Custom CSS'],
  markdown: 'zero-md v3',
  syntax: 'Highlight.js',
  icons: 'Font Awesome'
};
```

## Key Features

### YAML-Driven Content

All content is managed through a single YAML file, making it easy to update projects and pages without touching code.

### Dynamic Theming

Colors and themes can be changed in the configuration file, and they're automatically applied across the entire site.

### GitHub Integration

Project READMEs are loaded directly from GitHub, so they stay in sync with the repository.

## Lessons Learned

Building without a framework taught me a lot about:
- DOM manipulation
- Client-side routing
- State management
- Performance optimization

Stay tuned for more detailed posts about specific features!
