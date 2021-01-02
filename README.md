<p align="center">
  <img src="https://cdn-images-1.medium.com/max/1200/0*keE5EUA6n8Ay-RzO.png" width="200" height="200"/>
  <h1 align="center">p5-starter</h1>
  <p align="center">Boilerplate for p5.js projects, including VS Code workspace settings with Intellisense and linting for HTML, CSS and JS.</p>
</p>

# Installation and Usage

This repository is a template, which you can use to quickstart new projects.

# Visual Studio Code Workflow

Included is a `.vscode/extensions.json` file, which recommends a workspace
inside Visual Studio Code with the following extensions:

* [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
* [p5.js snippets](https://marketplace.visualstudio.com/items?itemName=acidic9.p5js-snippets)
* [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [htmlhint](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint)

To view your sketch, start the Live Server on VS Code. It defaults to [http://127.0.0.1:5500/](http://127.0.0.1:5500/ "http://127.0.0.1:5500/"). It supportes live reload, so you can edit the sketch and see the changes in near realtime.

## Intellisense

Intellisense is provided via p5.js TypeScript definition files.

Solution found on issue [#1339](https://github.com/processing/p5.js/issues/1339 "#1339").

Instead of downloading the TypeScript definitions, we can now use this NPM package: [@types/p5](https://www.npmjs.com/package/@types/p5).

# Style

The styling is loosely based on Edward Tufte's typography and color choices. You can read more about it here: [Tufte CSS](https://edwardtufte.github.io/tufte-css/).

# ESLint rules

There are some disabled rules on `.eslintrc.json`, but they're
entirely personal choices. I'm mostly using the linter for checking
errors, breaking some style rules. �
