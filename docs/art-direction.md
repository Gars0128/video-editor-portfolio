# Marta portfolio - art direction and review

Review branch: `design/beauty-edit-art-direction`. Local work only; no production deployment.

## Content and identity
Marta sells creator-led beauty, fashion and lifestyle films, scripting and editing. Visitors are brand owners and social teams who need to assess the work, understand the creator, compare packages and start a project. The warm portrait, red top, natural interiors and real vertical films are the identity. The starting UGC offer is $40 and is the business priority. All original projects, descriptions, prices, inclusions, email, Instagram and legal links are retained. No invented testimonials, results or clients.

## Three genuinely different directions

| | The Beauty Edit - selected | Cut / Culture | After Hours Atelier |
|---|---|---|---|
| Visual idea | An independent beauty publication with Marta as its author. Portrait plates, fine rules, generous margins, expressive italic type. | A contemporary editing studio: contact sheets, strong graphic labels and precise sequence markers. | An intimate film screening room, with luminous imagery against deep brown. |
| Typography | Cormorant Garamond 400-600, including real italics; Manrope 400-700 for body and navigation. | Archivo Narrow for condensed display; Space Grotesk for copy and controls. | Fraunces for warm sculptural headlines; DM Sans for straightforward body copy. |
| Palette | Ivory #f6efe5, chocolate #37261f, rust #8b4033, peach #efba9f. | Bone #eae6dd, near-black #1e211d, moss #6f7850, chartreuse #c9dc70 used sparingly. | Espresso #2d201b, blush #ead7cd, ivory #f6eee6, bronze #bb8367. |
| Layout | Unequal columns, staggered film plates, work before biography, quieter service rows and a central lead offer. | Broad typographic bands, dense numbered project index, alternating contact sheets and editing detail. | Large cinematic scenes, restrained centered titles, full-width films alternating with intimate copy. |
| Motion | Brief editorial entrances, small pointer feedback, still-to-film previews. | Quick cuts and short translations reflecting editing decisions; no simulated playback before intent. | Slow opacity transitions and controlled picture movement, disabled under reduced motion. |
| Signature interaction | A project still becomes five seconds of its real film on mouse hover; the play button always opens a controlled full player. | Selecting a numbered frame highlights the corresponding real film and its place in a three-project sequence. | Opening a real film draws two flat panels apart like screening-room curtains; keyboard and touch use the same play control. |
| Content rationale | Fits the beauty work and authentic portrait while keeping an approachable offer and easy contact route. | Emphasizes post-production capability; less intimate for beauty buyers looking for a creator. | Gives films emotional weight; the darker mood is less aligned with the natural daylight portrait and approachable pricing. |

### Why The Beauty Edit wins
The strongest existing asset is the combination of Marta's natural portrait and her actual films. Editorial typography frames them without replacing them with decorative effects. Work appears before background information, and the $40 UGC offer is first on mobile and the wider, contrasting center column on desktop. This direction supports both aesthetic credibility and the real booking task.

## Cohesive design system

- **Typography:** self-hosted Latin variable WOFF2 fonts with `next/font/local`, swap behavior and fallbacks; real italic display face. Display headings use fluid scales and balanced wrapping. Body copy is 14-16px with generous leading. Small uppercase metadata remains secondary.
- **Color:** warm ivory canvas; chocolate primary text; muted warm gray for secondary copy; rust for emphasis and active states. Peach is reserved for price and preview feedback against chocolate. No decorative gradients; image scrims serve legibility.
- **Spacing:** 4px base rhythm; 12-32px within components, 36-56px between related blocks, 72-128px section spacing. Content max-width 1280px with fluid 20-80px gutters.
- **Grid:** asymmetrical two-column desktop hero; three staggered film plates, two-column tablet arrangement and one-column mobile reading order. Pricing uses a wider central lead package at 1024px and above, returning to UGC-first mobile order.
- **Imagery:** preserve real portrait, second lifestyle portrait and real first-frame film posters. Next Image reserves geometry and optimizes delivery. Film bytes load after user intent; posters load lazily below the fold.
- **Navigation:** custom masthead, section-aware understated underline, direct project contact link, touch menu with Escape and outside-click handling. Preserve hash anchors and visible keyboard focus.
- **Motion:** transform/opacity only; purposeful entrances and feedback. Hero starts visible so animation does not conceal essential content. Preview stops after five seconds; disabled on touch, reduced-motion and data-saving connections. Native player supplies pause, seek, volume and fullscreen controls.
- **Resilience:** no-JavaScript content fallback; email wraps; explicit dialog focus return, Escape, boundary focus guards and scroll containment. Native media fallback links survive playback failure.

## Research and tool provenance
These are references, not templates. Design concepts and compositions above are our own judgment; source popularity is not evidence of conversion.

- [Awwwards current portfolio collection](https://www.awwwards.com/websites/portfolio/): surveyed content-led portfolio patterns, typography and imagery priorities. Avoided copying award-style loading barriers or heavy effects.
- [UI UX Pro Max source](https://github.com/nextlevelbuilder/ui-ux-pro-max-skill): consulted the public design-system example and accessibility priorities. The optional skill is not installed; its generator was not run.
- [21st component library](https://21st.dev/): library research from the earlier project pass informed hover-play and restrained navigation patterns. The 21st MCP is not available; some individual component pages could not be fetched in this pass. No component import is claimed.
- [React Bits Magnet source](https://raw.githubusercontent.com/DavidHDev/react-bits/main/src/content/Animations/Magnet/Magnet.jsx): reviewed small pointer-following interaction. Kept the existing lightweight Framer Motion implementation with fine-pointer and reduced-motion guards instead of adding a second animation dependency.
- [Vercel Web Interface Guidelines](https://raw.githubusercontent.com/vercel-labs/web-interface-guidelines/main/command.md): used for keyboard semantics, focus, motion preferences, media controls, font loading, image geometry and touch review.
- Fonts downloaded from official Google Fonts delivery endpoints; OFL licenses retained in `public/fonts`.

## Visual QA and validation
Rendered production-mode review at 375-812, 768-1024 and 1440-1000, plus regression layouts from 320px to 2560px and landscape. The first pass exposed font tokens resolving before the font variables: attaching variables to the root corrected the fallback typography. Re-inspected the actual hero, staggered gallery, full page and lead pricing composition after the correction.

- Production build, lint and TypeScript passed on Next.js 16.4.0.
- 17/17 portfolio checks passed, including real MP4 decoding/range delivery, no premature video requests, anchors, keyboard dialog boundaries, Escape/focus return, reduced motion, pointer and touch behavior and console/network errors.
- 14 responsive scenarios passed: overflow, header touch targets, images, navigation, resize and normal-motion reveal visibility.
- Axe WCAG A/AA scans returned zero violations on the page and open dialog at mobile, tablet and desktop sizes. Automated checks do not establish complete accessibility conformance.
- Five-second preview stop was verified in a real browser.
- Local unthrottled Chromium observations: initial transfer approximately 344-420KB; no initial MP4 requests; observed CLS 0 at all three sizes. These are local measurements, not deployed Core Web Vitals or a mobile-network benchmark.
- Compatible dependency updates removed the critical Next.js advisory. `npm audit --omit=dev` reports zero known vulnerabilities. Five high advisories remain in the development-only ESLint glob dependency chain; the suggested forced fix downgrades the Next lint configuration by two major versions and was not applied.

Review screenshots: `artifacts/design-review/{mobile,tablet,desktop}-hero.png`, corresponding `*-page.png` and `*-pricing.png`. Machine-readable evidence: `artifacts/design-review/results.json`, `artifacts/portfolio/results.json` and `artifacts/responsive/results.json`.

No deployment, push or merge has occurred. The three directions and implemented system are ready for visual review before any production action.
