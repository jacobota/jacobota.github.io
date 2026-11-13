# jacobota.github.io

Personal portfolio built with React, TypeScript, Tailwind CSS, Framer Motion and React Router (Vite).

- `npm install` then `npm run dev` for local development
- `npm run build` outputs `dist/` (and a `404.html` SPA fallback for GitHub Pages)
- Content lives in `src/data/` (projects, resume, contact)
- Deploys via `.github/workflows/deploy.yml`; set Settings > Pages > Source to "GitHub Actions"

## Resume

The Resume page and the one-page PDF both render `src/data/resume.ts`. After editing it, regenerate the PDF and commit it:

```
npm run resume:pdf
```

This builds the site, prints `/resume/print` with local Chrome (set `CHROME_PATH` if it isn't in a default location) into `public/Jacob_Ota_Resume.pdf`, and fails if the result is more than one page. Preview the print layout at `/resume/print`.
