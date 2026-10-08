# Marta Vaitkevich ? Creative Portfolio

Modern one-page portfolio starter built with:

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Framer Motion
- Lucide React

## Install

```bash
npm install
```

## Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Responsive checks

With the local server running:

```bash
npx playwright install chromium
npm run test:responsive
```

The Chromium check covers 11 viewport sizes from 320px to 2560px, including
landscape. It checks content overflow, header touch targets, image loading,
browser errors, mobile menu links, Escape, and menu state after resizing.
Screenshots and results are saved in `artifacts/responsive/` (ignored by Git).
Set `TEST_URL` to check a different local server. These checks emulate screen
sizes; they do not replace testing on physical iOS and Android devices.

## Build for production

```bash
npm run build
npm run start
```

## Deploy to Vercel

1. Push this project to GitHub/GitLab/Bitbucket.
2. Import the repository in Vercel.
3. Framework preset is auto-detected as Next.js.
4. Click **Deploy**.

Or using Vercel CLI:

```bash
npm i -g vercel
vercel
```

## Customization notes

- Text content: edit `lib/content.ts` and section components in `components/`.
- Hero visual: replace image in `components/Hero.tsx`.
- Portfolio and showcase thumbnails: replace image URLs in `lib/content.ts`.
- Video embeds: replace placeholder blocks in `components/VideoShowcase.tsx` with `iframe` or `video`.
- Contact links: update email and Instagram in `components/CTA.tsx`.
- Brand naming and metadata: update `app/layout.tsx`, `components/TopNav.tsx`, and `components/Footer.tsx`.

## Editorial redesign

See [redesign notes and 21st.dev references](docs/redesign-notes.md).

Run `npm run typecheck` and `npm run test:portfolio` for the complete review checks.
