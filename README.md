# draishwariya.com

Personal site of Dr. R. Aishwariya — built with [Astro](https://astro.build), content managed in [TinaCMS](https://tina.io), hosted on GitHub Pages.

## Editing content

All text, dates, publications and photos live in `src/content/` and can be edited in the CMS:

| CMS section | Files |
| --- | --- |
| Site settings (name, roles, CV, contact details, 404 text) | `src/content/settings/site.json` |
| About page | `src/content/pages/about.md` |
| Experience | `src/content/experience/*.md` |
| Publications | `src/content/publications/*.md` |
| Education | `src/content/education/*.md` |
| Awards & certifications | `src/content/awards/*.md` |
| Research interests | `src/content/research/*.md` |
| Creative page & galleries | `src/content/pages/creative.json` |

Images and the CV are uploaded through the CMS media manager into `public/uploads/`.

**Online:** go to `https://draishwariya.com/admin`, log in with Tina Cloud, edit, save. Tina commits the change to `main` and the site republishes in about two minutes.

**On this computer:**

```bash
npm install
npm run dev          # site at http://localhost:4321, CMS at http://localhost:4321/admin/index.html
```

Edits made locally are written straight to the files — commit and push them to publish.

## Commands

| Command | What it does |
| --- | --- |
| `npm run dev` | Site + CMS editor locally |
| `npm run dev:site` | Site only |
| `npm run build` | Build the site into `dist/` |
| `npm run build:cms` | Build the site plus the CMS admin (needs `TINA_CLIENT_ID` and `TINA_TOKEN`) |
| `npm run check` | Type-check |

## Deployment

`.github/workflows/deploy.yml` builds and deploys on every push to `main`. One-time setup is described at the top of that file (GitHub Pages source = **GitHub Actions**, plus the Tina Cloud client ID and token).
