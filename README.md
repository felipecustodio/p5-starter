# p5.js starter

A p5.js 2.4.0 template with strict TypeScript, Vite, and a live WebGL inspector.

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

Edit `src/main.ts` for the sketch and its controls, `index.html` for the page, and `style.css` for the layout. p5.js includes its own TypeScript declarations.

Antialiasing is enabled by default. The inspector changes the scene immediately; WebGL context options recreate the sketch automatically. Pixel density starts at 1 for speed, with 2× and display density available for sharper output. The FPS cap starts at unlimited; actual FPS depends on the browser, display, and graphics hardware. Reduced-motion preference pauses the animation while keeping the controls usable.

The page loads General Sans from Fontshare and Martian Mono from Google Fonts.

GitHub Pages publishes the `dist/` build from `main` through `.github/workflows/pages.yml`.
