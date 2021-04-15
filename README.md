<p align="center">
  <img src="assets/readme_banner.png"/>
</p>

# Installation and Usage

This repository is a template, which you can use to quickstart your own new projects. It comes with a pre-configured environment for VS Code, with suggested extensions and configurations.

[GitHub - Creating a repository from a template](https://docs.github.com/en/github/creating-cloning-and-archiving-repositories/creating-a-repository-from-a-template)

```bash
.
├── index.html
├── jsconfig.json
├── node_modules
├── package.json
├── sketch.js
└── style.css
```

# Visual Studio Code Workflow

Included is a `.vscode/extensions.json` file, which recommends a workspace inside Visual Studio Code with the following extensions:

* [LiveServer](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
* [p5.js snippets](https://marketplace.visualstudio.com/items?itemName=acidic9.p5js-snippets)
* [eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
* [htmlhint](https://marketplace.visualstudio.com/items?itemName=mkaufman.HTMLHint)

To view your sketch, start the Live Server on VS Code. It defaults to [http://127.0.0.1:5500/](http://127.0.0.1:5500/ "http://127.0.0.1:5500/"). It supportes **live reload**, so you can edit the sketch and see the changes in near realtime, like the p5 online editor.

## Intellisense

Intellisense is provided via p5.js TypeScript definition files.

Solution found on issue [#1339](https://github.com/processing/p5.js/issues/1339 "#1339").

Instead of downloading the TypeScript definitions, we can now use this NPM package: [@types/p5](https://www.npmjs.com/package/@types/p5).

# ESLint rules

There are some disabled rules on `.eslintrc.json`, but they're entirely personal choices.
