---
title: "From Homelab to GitHub Pages"
date: "2025-10-29"
excerpt: "How I went from running my own nginx server with Let's Encrypt in my homelab, building with TeamCity, to embracing the simplicity of GitHub Pages and Actions."
tags: ["DevOps", "Self-Hosting", "Homelab", "GitHub Pages", "CI/CD"]
---

There's something deeply satisfying about self-hosting. You control everything—the server, the deployment, the SSL certificates. But there's also something to be said for simplicity. Let me tell you about my journey from full self-hosted complexity to the elegant simplicity of GitHub Pages.

## The Homelab Era: Maximum Control, Maximum Overhead

For years, I ran my portfolio website from my homelab. The setup was actually pretty slick:

### The Stack

**Infrastructure:**
- Dedicated server running in my homelab (because why not?)
- Containerized nginx as the web server
- Let's Encrypt for SSL certificates (with automatic renewal via certbot)

**CI/CD Pipeline:**
- TeamCity build server (also containerized)
- Automated builds on every push
- Deploy via rsync to the nginx container

### The Build Pipeline

Here's what happened on every git push:

1. TeamCity detected the change
2. Ran build steps (back when I was using Hugo)
3. Generated static files
4. Rsynced to the nginx container
5. Reloaded nginx config

It was *beautiful*. It was also completely overkill for a static portfolio website.

### The Reality Check

**Pros of self-hosting:**
- ✅ Full control over everything
- ✅ Learning experience (learned a ton about nginx, Docker, SSL)
- ✅ Bragging rights ("Yeah, I host it in my homelab")
- ✅ Fun to tinker with

**Cons I started noticing:**
- ❌ Maintenance overhead (OS updates, security patches)
- ❌ Single point of failure (my house loses power = site goes down)
- ❌ Slow when I'm far from home (latency is real)
- ❌ TeamCity using resources for... hugo build and static file copying

## The Transition: GitHub Pages + Actions

One day I had a realization: I'm spending more time maintaining the infrastructure than actually updating the content. And for what? A static website that changes once a month?

### The New Setup

**Hosting:**
- GitHub Pages (free, fast CDN)
- Custom domain with HTTPS (GitHub handles the certificates)
- Global CDN (faster than my homelab from anywhere)

**CI/CD:**
- GitHub Actions (triggered on push)
- Simple workflow that just... works
- No server to maintain

### The GitHub Actions Workflow

Here's the beautiful simplicity:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Deploy to GitHub Pages
        uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./www
          cname: yourdomain.com
```

That's it. No nginx configs, no certbot renewal scripts, no rsync commands. Just push and it's live.

## Conclusion

The migration was straightforward—removed Hugo, pushed to GitHub, configured Pages, updated DNS. Done in 30 minutes. Worked so well that I did the same with [SimpleFPS](https://github.com/seriva/SimpleFPS) and [AstroHunter](https://github.com/seriva/AstroHunter).

**What changed?** Every part of my homelab setup—nginx, Let's Encrypt, TeamCity, my internet connection—was a potential failure point. GitHub Pages is just... GitHub. They're better at uptime than I am.

**What I gained?** Zero maintenance, global CDN speeds, and time for actual work instead of debugging configs. I still love my homelab for development, private services, and learning projects. But for a public static site? Let GitHub handle it.

**The lesson?** Use the right tool for the job. My portfolio doesn't need nginx, Docker, certbot, or TeamCity. It needs to load fast, be available, and require zero maintenance. GitHub Pages delivers exactly that, and it's okay to choose simplicity.
