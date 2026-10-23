# U&I Global — Australia Study & Migration EXPO 2026

Rebuild of https://expo26.uandiedu.com/ — Next.js 14 (App Router) + Tailwind CSS 3 + framer-motion, the same stack the original was built on.

## 1. First-time setup (on your computer)

```bash
npm install
npm run dev            # http://localhost:3000
```

Images are already included in `/public`. Only run `npm run fetch-assets` if that folder is missing: it reads every image path in `content/site.ts` and downloads it from the live site. Run it while the live site is still up — after that the project is fully self-contained. If any file fails, the script lists it; save it manually into `/public` at the same path.

## 2. Editing content

**Everything editable lives in one file: `content/site.ts`.**

| To change… | Edit in `content/site.ts` |
|---|---|
| Registration form links | `forms` |
| Hero headline, buttons, language buttons | `hero` |
| Add/remove an event, poster, date | `dates.events` |
| Recap photo carousels, giveaway block | `dates.recaps` |
| Lucky-draw prizes | `luckyDraw.tickets` |
| Benefits, pathways, testimonials, offices | `benefits`, `pathways`, `testimonials`, `offices` |
| YouTube shorts | `videos.items[].youtubeId` |
| Scrolling photo strip | `photoStrip.photos` |

New images: drop the file into `/public/images/...` and reference it as `"/images/..."`.

Section order: `components/HomePage.tsx` — reorder or comment out components.
Brand colours / font sizes: `tailwind.config.ts`.

### Translations

The page is available in English (`/`), Korean (`/ko`), Thai (`/th`), Spanish (`/es`), Portuguese (`/pt`) and Japanese (`/ja`), switched from the globe menu in the header.

- English copy is the source, in `content/site.ts`.
- Each language is a dictionary in `content/translations/<code>.ts`: the exact English text maps to its translation.
- **When you change or add English text in `site.ts`, update the same key in every dictionary.** Missing or mismatched keys quietly fall back to English.
- The main Register button on each translated page opens that language's monday.com form (Japanese uses the English form). Set in `content/i18n.ts`.

## 3. Deploy to Vercel

1. Push this folder to a GitHub repo (include `/public` after running `fetch-assets`).
2. vercel.com → **Add New Project** → import the repo. Framework is auto-detected as Next.js; no settings or env vars needed.
3. Point `expo26.uandiedu.com` at the new project under **Settings → Domains** (update the CNAME at your DNS provider).

## Structure

```
app/            layout (fonts, SEO), page (section order), globals.css
components/     one file per section — layout & styling only
content/site.ts ALL copy, links, images, prices
scripts/        fetch-assets.mjs
public/         images, video, favicon (populated by fetch-assets)
```
