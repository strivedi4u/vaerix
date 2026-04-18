# VAERIX Website

React + TypeScript + Vite storefront/site.

## Local development

```bash
npm install
npm run dev
```

## Production build (generic)

```bash
npm run build
```

Build output: `dist/` (ignored by git).

## GitHub Pages (manual deploy, no CI/CD)

This repo is configured to support GitHub Pages project hosting like:

`https://<github-username>.github.io/vaerix/`

1) Build Pages bundle (outputs `docs/`):

```bash
npm run build:pages
```

2) Commit + push the generated `docs/` folder to `main`.

3) In GitHub: **Settings → Pages → Build and deployment**
   - Source: **Deploy from a branch**
   - Branch: `main`
   - Folder: `/docs`

### If you rename the repo

Update both of these so routing + asset paths stay correct:

- `vite.config.ts` → `GITHUB_PAGES_REPO`
- `public/404.html` → `base`
