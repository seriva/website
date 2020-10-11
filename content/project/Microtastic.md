---
title: "Microtastic"
description: "A tiny (250 line) CLI tool to aid developing browser based applications in pure ES6."
tags: ["Javascript", "ES6"]
weight: 2
draft: false
repo: https://github.com/seriva/microtastic
---

## About

**Microtastic** is a tiny (250 line) CLI tool to aid developing browser based applications in pure ES6 without the overtooling and dependency hell some tool chains introduce. Inspired by [Snowpack](https://www.snowpack.dev/), it is much lighter and simpler but more opinionated in project structure and how to use it.

Like [Snowpack](https://www.snowpack.dev/) it used [Rollup](https://rollupjs.org/) to convert CommonJS and multi-file ES6 modules to single-file ES6 modules. These can then be imported and used during development without the need for rebundling the application on every single change.

Then when it is time to make the application production ready, [Rollup](https://rollupjs.org/) is used for bundling taking advantage of the threeshaking and dynamic imports it provides to slim down and carve up the code in smaller chunks.

Since **Microtastic** only deals with ES6 code it works great with other JS only libraries like:

- [Mithril.js](https://mithril.js.org/)
- [JSS](https://cssinjs.org/?v=v10.1.1)
- [MaquetteJS](https://maquettejs.org/)

## Bootstrap an application

1: Generate a new npm package/project:

```shell
npm init
```

2: Install **Microtastic** as a dev dependency:

```shell
npm install microtastic  --save-dev
```

3: Run **microtastic init** to bootstrap the application template:

```shell
npx microtastic init
```

In the *app/src/* folder new code can be added with *main.js* as main entry point. Any other resources you need can be added as you fit in the *app/* directory.

## Adding dependencies

1: Install the dependency like normal:

```shell
npm install <packagename>
```

2: Run *prepare* to rebuild the dependencies with:

```shell
npm run prepare
```

This will regenerate all dependencies and put them in the *app/src/dependencies/* folder ready for use.

## Development server

**Microtastic** has a build in development server which can be started with:

```shell
npm run dev
```

Since pure ES6 is used you can open and debug the applications in the latest versions of Chrome and Firefox or any other browser that supports the ES6 module standard.

## Production build

You can prepare the bundled application by running:

```shell
npm run build
```

This will bundle and optimise your code and put the application ready to publish in the *public/* folder.

## Advanced configuration

You can create a  *.microtastic* file in the root of your project and add and change the following configurations:

```json
{
    "genServiceWorker": false, // Generates an offline-mode service worker (Needs additional application code)
    "eslintOnBuild": true, // If Rollup need to run ESLint before bundling the code
    "minifyBuild": true, // If Rollup need to minimize the application
    "serverPort": 8181 // Port the debug server is running on.
}
```

## Links

<br>
<table style="width:100%">
  <tr>
    <th style="text-align: center">
        <a title="Github" target="_blank" href="https://github.com/seriva/microtastic">
            <img src="/images/github_icon.png"  style="max-width:75px" />
        </a>
    </th>
    <th style="text-align: center">
        <a title="NPM" target="_blank" href="https://www.npmjs.com/package/microtastic">
            <img src="/images/npm_icon.png" style="max-width:75px" />
        </a>
    </th>
  </tr>
</table>
