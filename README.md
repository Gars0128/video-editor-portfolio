# Aether Cut - Video Editor Portfolio

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
