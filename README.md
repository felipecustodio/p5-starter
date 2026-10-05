# p5.js starter

A minimal p5.js 2.3.4 template with strict TypeScript and Vite.

## Setup

Install [mise](https://mise.jdx.dev/) and run:

```sh
mise install
mise run install
mise run dev
```

The site opens at `http://localhost:5173/`. Aube manages dependencies and mise supplies Aube and Node 24.

## Tasks

```sh
mise run check    # TypeScript
mise run build    # production files in dist/
mise run preview  # preview the build
```

Edit `src/main.ts` for the sketch, `index.html` for the page, and `style.css` for the layout. p5.js includes its own TypeScript declarations.

The example uses pixel density 1 to favor frame rate on high-density screens. Browser animation remains limited by the display refresh rate. The page loads General Sans from Fontshare and Martian Mono from Google Fonts.
