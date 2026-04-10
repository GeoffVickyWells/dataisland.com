# DataIsland Software Website

Official website for DataIsland Software - Productivity apps for macOS.

## Tech Stack

- **Framework:** Astro 5.0
- **Hosting:** Cloudflare Pages
- **Build Output:** Static HTML/CSS/JS

## Project Structure

```
dataisland.com/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── AppPreview.astro     # Left/right alternating product showcase
│   │   ├── Header.astro
│   │   ├── Footer.astro
│   │   ├── EmailCapture.astro   # Trial signup form
│   │   └── YouTubeEmbed.astro
│   ├── layouts/
│   │   ├── BaseLayout.astro     # Main layout wrapper
│   │   └── ProductLayout.astro  # Template for product pages
│   ├── pages/
│   │   ├── index.astro          # Homepage
│   │   └── products/            # Individual product pages
│   │       ├── fusion.astro
│   │       └── checkthis.astro
│   └── styles/
│       └── global.css           # Global styles, animations
└── public/                  # Static assets (images, videos, fonts)
    ├── images/
    └── videos/
```

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Deployment

This site is automatically deployed to Cloudflare Pages on every push to `main`.

- **Build command:** `npm run build`
- **Build output directory:** `dist/`
- **Framework preset:** Astro
