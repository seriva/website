---
title: "Building a Portfolio Website: A Journey Through Time (and Many Rewrites)"
date: "2025-10-21"
excerpt: "From hand-coded HTML to LAMP stacks to Hugo, and finally to vibe-coding a portfolio in a few hours with AI assistance. Here's my portfolio website origin story."
tags: ["Web Development", "JavaScript", "Personal", "AI"]
---

You know that feeling when you look at your old portfolio website and think "what was I thinking?" Yeah, I've had that feeling about four times now. Let me take you on a journey through the evolution of my portfolio—a tale of overengineering, frameworks, and eventually finding simplicity again.

## The Beginning: Hand-Coded HTML (The Late 2000s Vibes)

My first portfolio was pure, unadulterated HTML. No CSS frameworks, no JavaScript magic—just tables (yes, tables for layout, don't judge me), some basic CSS styling, and probably a few experimental effects that seemed cool at the time. It was glorious in its simplicity.

Looking back, it was actually kind of peaceful. You edited an HTML file, hit refresh, and boom—instant feedback. No build steps, no dependency hell, just you and your `index.html`.

## The "Real Developer" Phase: LAMP Stack

Then I discovered PHP and MySQL, and suddenly I was a *real developer*. I built a full CMS for my portfolio because clearly that's what you do when you want to display three projects and an about page, right?

The stack:
- Linux (or XAMPP on Windows, let's be real)
- Apache with mod_rewrite magic
- MySQL with like 5 tables for a blog
- PHP with questionable security practices

I spent more time building the admin panel than I did on actual content. The classic developer trap—building tools instead of using them. But hey, I learned a lot about SQL injection the hard way! 😅

## The Static Site Generator Era: Hugo

Fast forward a few years, and I discovered Hugo. Finally, a sensible middle ground! Write content in Markdown, generate static HTML, deploy anywhere. I forked and customized a minimal theme—[seriva/minimal](https://github.com/seriva/minimal-hugo-theme)—tweaking it to match my preferences because that's what developers do, right?

Hugo was actually great. Fast builds, great developer experience, and it forced me to separate content from presentation. I used it for years and was pretty happy with it.

But... (there's always a but, isn't there?)

I kept wanting to add little features here and there. A fancy search? Need to figure out Hugo's templating. Custom animations? Gotta work within the framework. Eventually, I felt like I was fighting the tool more than using it.

## The Vibe-Coded Revolution: Back to Basics (But Better)

October 2025. I'm sitting there looking at my Hugo site thinking "I just want more control." And then I had a realization: what if I just... wrote vanilla JavaScript? What if I went back to the simplicity of my first HTML site, but with all the knowledge I've gained since?

So I fired up GitHub Copilot and started vibe-coding. And you know what? It was *fun*. Like, genuinely enjoyable. No webpack configs, no npm packages breaking on install, no framework updates—just HTML, CSS, and JavaScript.

### The Tech Stack (Simple is Beautiful)

```javascript
const stack = {
  build_process: 'none', // 🎉
  framework: 'none',     // 🎉🎉
  dependencies: [
    'Bootstrap 5',     // Because I'm not styling everything from scratch
    'Font Awesome',    // Icons are hard
    'js-yaml',         // YAML is nicer than JSON
    'marked',          // Markdown rendering
    'Fuse.js'          // Search functionality
  ],
  dev_server: 'darkhttpd', // Or any static server
  happiness_level: 'maximum'
};
```

### Working with AI: A Pair Programming Session

Here's where it gets interesting. I built most of this site over the course of a few hours, with GitHub Copilot as my pair programming buddy. And honestly? It was a game-changer.

**Hour 1: The Foundation**  
"Hey Copilot, I want a single-page app that loads content from YAML..."  
Within minutes, I had the basic structure. No fussing with boilerplate, no decision paralysis about which router library to use—just straight to building.

**Hour 2: Features Flying In**  
"Add a blog with pagination."  
"Make the search fuzzy and search across all content."  
"Load GitHub READMEs automatically."  

Each feature that would've taken me an hour of Stack Overflow diving and documentation reading? Done in minutes. It felt like having a really knowledgeable senior dev next to me who never gets tired of my questions.

**Hour 3: The Polish**  
This is where AI really shined. All those little things—internationalization support, mobile search overlay, clickable tags, proper error handling—they all got added systematically. No "I'll do that later" technical debt piling up.

**Hour 4: Security & Best Practices**  
"Can we use tagged template literals for XSS prevention?"  
And boom, we refactored the entire templating system to use a secure pattern with proper syntax highlighting. The kind of thing I'd normally put off for "someday" but got done because it was so *easy*.

### What I Learned (Again)

1. **Simple doesn't mean basic.** This site has search, i18n, blogs, dynamic theming—but no build process.

2. **AI pair programming is wild.** I'm not just copying code blindly; I'm having conversations about architecture, security, and best practices. It's like having a really smart rubber duck that talks back.

3. **You don't always need a framework.** Sometimes vanilla JS is the right tool. Who knew? (Okay, everyone knew, but I needed to learn it myself.)

4. **Vibe-coding is real.** Just start building, iterate fast, and don't overthink it. The joy of creation beats perfect architecture every time.

5. **The web platform is actually pretty good now.** ES6 modules, template literals, fetch API, CSS grid—we have nice things built in!

## The Irony

I've come full circle. Started with simple HTML, went through increasingly complex setups, and ended up back with simple HTML (plus JavaScript). But now I appreciate *why* it's simple.

The difference? I know when to reach for complexity and when to resist it. This portfolio doesn't need a build step or a framework. It just needs to show my work and load fast. Mission accomplished.

## What's Next?

Probably rewrite it again in 2030 using whatever the cool kids are using then. WebAssembly? Quantum HTML? Who knows! But for now, I'm genuinely happy with this setup.

If you want to see how it's built, everything's on [GitHub](https://github.com/seriva/website). Feel free to fork it, break it, or make it better. That's what it's there for.

And if you're thinking about building your own portfolio—just start. Don't overthink it. Fire up your favorite AI assistant or don't, pick some tech you're curious about, and start building. The best portfolio is the one you actually finish.

Now if you'll excuse me, I have some actual content to write for this blog instead of just talking about the blog itself. 😄

---

*P.S. - Yes, I realize the irony of spending hours building a blog just to write about building the blog. Welcome to web development.*
