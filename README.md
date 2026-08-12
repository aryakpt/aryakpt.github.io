# Arya Krisna Putra Portfolio

Personal portfolio website for Arya Krisna Putra, built with Astro and TypeScript. The site presents profile information, selected projects, blog and research notes, contact links, and a full project listing.

## Tech Stack

- Astro for static site generation
- TypeScript for client-side behavior and typed data models
- Plain CSS for styling
- JSON data files for projects and blog posts

## Project Structure

```text
.
├── public/
│   └── assets/          # Static images and favicon served from /assets
├── src/
│   ├── components/      # Reusable Astro UI components
│   ├── data/            # Project and blog JSON data
│   ├── layouts/         # Shared page layout
│   ├── pages/           # Astro routes
│   ├── scripts/         # Browser-side TypeScript
│   ├── styles/          # Global and page styles
│   ├── types.ts         # Shared TypeScript interfaces
│   └── utils/           # Shared utility functions
├── astro.config.mjs
├── package.json
└── tsconfig.json
```

## Pages

- `/` - Home page with hero, about, skills, selected projects, blog preview, and contact section
- `/projects/` - Full project list with category filtering
- `/blogs/` - Blog list with category filtering
- `/blogs/?post=<slug>` - Blog detail view for posts with local content

## Development

Use Node.js 24.

```bash
nvm use 24
npm install
npm run dev
```

## Verification

Run the Astro and TypeScript checks, then build the static site:

```bash
npm run build
```

The production build is generated in `dist/`.

## Content Updates

- Add or edit projects in `src/data/projects.json`.
- Add or edit blog posts in `src/data/blogs.json`.
- Place production static assets in `public/assets/`.
- Keep reusable UI in `src/components/` and browser-only behavior in `src/scripts/`.
