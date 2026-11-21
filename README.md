# Personal Portfolio Website

The source for [rodneygainous.com](https://rodneygainous.com), a portfolio of projects, AI research, work history, writing, and media.

## Getting started

Install [Node.js](https://nodejs.org/) and npm, then run the following commands.

```sh
git clone https://github.com/rodneyg/rodney-gainous-site.git
cd rodney-gainous-site
npm ci
npm run dev
```

Open the local URL printed by Vite.

## Production build

Run `npm run build` to create the production bundle in `dist/`. Before bundling, the build scripts refresh the YouTube Shorts, Medium, and Unsplash data and can fall back to the checked-in snapshots when an upstream service is unavailable. Run `npm run preview` to serve the built files locally.

## Stack

Vite, TypeScript, React, shadcn/ui, and Tailwind CSS.

See the [changelog](CHANGELOG.md) for the history of visitor-facing updates.
