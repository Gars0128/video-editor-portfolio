# Marta — premium editorial portfolio

Review branch: `design/premium-editorial-portfolio`. No deployment or push.

The warm ivory, chocolate and terracotta identity remains. A staggered, masked
headline and an unframed portrait establish the editorial direction. Real video
work now follows the hero, in an asymmetric gallery. Hover previews load only on
intent with a fine pointer, and are disabled for reduced motion, touch and data
saving. Explicit Watch buttons open a native dialog with video controls, focus
containment, Escape, focus restoration and playback cleanup. About, services,
pricing and contact use typography, hairlines and varied spacing rather than
repeated glass cards.

All three original videos and their captions, original portraits, service
information, pricing ($40 / $25 / $60 starting offers), email and Instagram remain.
SEO metadata and legal routes remain. No new production dependencies.

## 21st.dev pattern references

These are inspiration sources, with original implementations adapted to this
project. No complete template or new component library was imported.

| Pattern | Adaptation | Source |
| --- | --- | --- |
| Staggered hero typography | Two masked lines, coordinated copy and portrait entrance | [Animated Hero Section UI](https://docs.21st.dev/%40uniquesonu/components/animated-hero-section-ui) |
| Editorial portfolio gallery | Three real films in a staggered, asymmetric composition | [Portfolio Gallery collection](https://21st.dev/community/isaiahbjork) |
| Hover video preview | Lazy, muted previews on compatible pointers | [HoverPlayCard](https://mcp.21st.dev/%40ruixen.ui/components/hover-play-card) |
| Magnetic action | Small spring displacement on the primary link; static touch/keyboard alternative | [Bundui magnetic button](https://preview.21st.dev/%40bundui/library/bundui) |
| Active navigation indicator | Shared underline with scrollspy and smooth anchors | [21st navbar examples](https://docs.21st.dev/blog/react-navbar-design-examples) |
| Scroll reveals and parallax | Subtle portrait movement and once-only section entrances | [Systaliko UI](https://preview.21st.dev/%40youcefbnm/library/systaliko-ui) |
| Animated underline | Short directional feedback on links | [Fancy Components](https://preview.21st.dev/%40danielpetho/library/fancy-components) |
| Focused media dialog | Native dialog, focus guards and a restrained entrance | [Hirael dialog patterns](https://preview.21st.dev/%40mohammadshehadeh/library/hirael) |

## Validation

- `npm run lint`
- `npm run typecheck`
- `npm run build`
- `npm run test:portfolio` — layout, imagery, MP4 decoding/playback, links,
  preserved pricing/SEO, anchors/scrollspy, keyboard/focus, preview lifecycle,
  reduced motion, touch and console checks.
- `npm run test:responsive` — extended viewport and motion checks.
- `npm run debug:browser` — visible Chrome with DevTools and JSONL diagnostics.

Set `TEST_URL` to the local server under review. `BROWSER_EXECUTABLE` can select an
installed Chromium browser. Run `npx playwright install chromium` when necessary.
Screenshots/reports live in ignored `artifacts/portfolio/` and
`artifacts/responsive/`.

Browser emulation does not replace physical Safari/iOS/Android checks. Field Core
Web Vitals are not measured by these tests. Videos remain the original media;
streaming infrastructure and transcoding were not added.
## Completed verification

The final local production build passed lint, TypeScript, the production build,
17/17 portfolio checks and 14/14 responsive/motion scenarios. Viewports span
320–2560px and include phone landscape. Production browser checks recorded no
console warnings/errors or local HTTP failures. All three MP4s decoded and played.
No MP4 is requested before a viewer/preview interaction. Screenshots of the hero,
gallery, viewer and remaining sections were inspected on desktop and mobile.

## Files changed for the redesign

- `app/globals.css`, `app/page.tsx`, `app/layout.tsx`: visual system, work-first
  section order and no-JavaScript reveal fallback.
- `components/Hero.tsx`, `TopNav.tsx`, `VideoShowcase.tsx`, `About.tsx`,
  `Pricing.tsx`, `Services.tsx`, `CTA.tsx`, `Footer.tsx`: redesigned sections.
- `components/ui/MagneticLink.tsx`, `VideoViewer.tsx`, `AnimatedReveal.tsx`,
  `ParallaxImage.tsx`: interactions, accessible viewer and motion behavior.
- `lib/useReducedMotion.ts`, `lib/content.ts`: hydration-safe OS motion preference
  and navigation order; real service/pricing data preserved.
- `scripts/check-portfolio.cjs`, `package.json`, `eslint.config.mjs`: repeatable
  QA commands and generated-artifact lint exclusions.
- `.gitignore`, `README.md`, `docs/redesign-notes.md`: generated outputs and review
  documentation. Earlier responsive/debug scripts and icon remain available.
