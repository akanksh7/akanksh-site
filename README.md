# AKANKSH: personal archive

Static site: Astro + Markdown in Git + Pagefind search. Optional browser editor: Decap CMS + a Cloudflare Worker for GitHub login.

```
You (browser) -> /admin (Decap) --login--> Worker (OAuth, owner-only) --> GitHub repo
GitHub repo --push to main--> GitHub Actions (build + validate + index) --> GitHub Pages --> visitors
```
The public site is plain files. If the editor or Worker is down, readers see no difference.

## Run locally
`npm install`, then `npm run dev` (search needs a build), `npm run build && npm run preview`.
Every build runs: content validation (broken links, missing photos/alt, links to drafts), Astro build, search indexing, draft-leak check.

## Make it yours
1. `src/config.ts`: name, `url`, `base` (your repo name), bio, links, About-page data. All current values are placeholders.
2. `npm run remove-demo` lists demo content; add `--yes` to delete it. Also check `now.md`.
3. Optional resume: put a PDF in `public/`, set `profile.resume`.

## Add content
Markdown files in `src/content/<type>/` (writing, notes, projects, experiments, reading, logs, timeline, photos, now). `draft: true` keeps an entry out of pages, RSS, sitemap and search. Knowledge categories nest with `/` (`Technology/Programming`). Images go in `public/`.

## Deploy (GitHub Pages)
1. Create a public repo, push this project to `main`.
2. Settings > Pages > Source: GitHub Actions. The workflow `.github/workflows/deploy.yml` builds and deploys.
3. Site appears at `https://<user>.github.io/<repo>/`. Set `url` and `base` to match.

## Editor (optional, manual setup, not tested end to end)
1. GitHub > Developer settings > OAuth Apps: callback `https://akanksh-auth.<subdomain>.workers.dev/callback`.
2. `cd worker`, set `ALLOWED_USER` in `wrangler.toml`, then `npx wrangler secret put CLIENT_ID`, `... CLIENT_SECRET`, `npx wrangler deploy`.
3. Fill repo and Worker URL in `public/admin/config.yml`. Open `/admin/`.
Saving creates a pull request (draft > review > ready); merging publishes. Disable: delete `public/admin/`. Recover: rotate the OAuth app secret. Tradeoffs: Decap keeps your GitHub token in browser localStorage; its preview is generic; the editor script loads from unpkg.

## Publish, roll back
Publish = merge/push to `main`. Roll back = `git revert <commit>` and push (or revert the PR on GitHub).

## Backup, restore, migrate
- Backup: `npm run backup` writes a verified `.bundle` (full history). Store it off GitHub. Restore: `git clone akanksh-backup-DATE.bundle site`.
- Migrate: any static host works with `npm run build` and the `dist/` folder. On Cloudflare Pages/Netlify set build command `npm run build`, output `dist`, and change `site.url`/`base` (use `base: ''`). `public/_headers` then applies security headers.

## Costs
| Item | Cost |
|---|---|
| GitHub repo + Actions + Pages (public repo) | INR 0 |
| Cloudflare Workers free plan (editor login only) | INR 0 |
| Domain: use the github.io subdomain | INR 0 |
| Analytics, fonts, search, forms: none used | INR 0 |
Free-tier terms were not re-verified in this session; check GitHub and Cloudflare pages before relying on them. No host guarantees uptime or permanent terms; the Git repo plus backups keep migration easy.

## Known limitations
No contact form (mailto only). No image resizing. No cross-links between notes beyond normal Markdown links. GitHub Pages cannot set security headers. Private notes are not supported; nothing here is private. Not browser- or Lighthouse-tested.

## Add your details (simple)
- About, links, bio: edit `src/config.ts` on github.com (open the file, click the pencil icon, commit). The site rebuilds in about a minute.
- Motorcycle fuel: add a line to `src/data/fuel.json`, set `"sample": false`. Weekly notes: add a Markdown file to `src/content/logs/`.
- Everything is reachable from the header, the "More" menu, or the homepage tiles. The footer has only social links.
