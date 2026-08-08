# Design clone — athrix.me

A 1:1 rebuild of the **design** of `https://www.athrix.me/` in Vite + React + TS
+ Tailwind v4, driven by a Playwright crawl of the live site rather than by eye.

```bash
npm install
npm run dev        # http://localhost:5183
npm run build
npm run typecheck
npm run verify -- reference/ref-desktop-1440.png reference/clone-v2-1440.png
```

## What is reproduced

Everything that makes up the design system, measured off the live site:

| Layer | Source of truth |
|---|---|
| Colour tokens | the site's `:root` block (shadcn/oklch set) |
| Type scale | computed styles — `h1` = Instrument Serif 36/45, body Inter 16/27 |
| Fonts | self-hosted Inter / Instrument Serif / GeistSans woff2 + the site's exact fallback metric overrides |
| Dashed grid | `.grid-line-v` / `.grid-line-h` / `.grid-intersection` transcribed verbatim |
| Components | class strings copied verbatim from the crawled SSR HTML |
| Motion | measured, not guessed — see below |
| Geometry | every section offset verified against the original to the pixel |

## Content is placeholder — by design

The original is a real person's portfolio. Their name, photo, bio, employer,
project write-ups and screenshots are **not** reproduced here. Everything
user-facing is neutral placeholder content shaped to the same lengths so the
layout metrics still hold.

**All of it lives in two files** — rebranding is a one-file edit:

- `src/data/site.ts` — profile, bio segments, socials, experience, skills, projects, footer
- `src/data/contributions.ts` — seeded heatmap fixture (the original calls a third-party API)

Placeholder artwork sits in `public/img/` and `public/logo/leaf.svg`, authored
at the original's exact dimensions/aspect ratios so nothing shifts when you
swap in your own.

## Motion findings

- **The leaves do not animate.** The original's markup carries
  `animate-leaf-sway`, but no such rule ships in either CSS chunk and the
  element computes to `animation-name: none`. Deliberately static here.
- **Lenis smooth scroll is real** (`<html class="lenis">`) and is reproduced.
- Scroll progress bar, rainbow-gradient buttons, the hand-drawn underline
  (`rough-notation`), and the footer's cursor-tracking dot grid are all
  reproduced from measured values.
- The heatmap lands scrolled fully right, as the original does.

## Verified

- Section offsets vs original: `h1`, `experience`, `skills`, `projects` all **exactly 0px**
- Zero external network requests; zero broken images
- No horizontal overflow at 390px
- Tabs, accordion, skill chips, heatmap scroll, progress bar all functional
- `tsc --noEmit` clean; production build succeeds

Residual: total page height is 12px short of the original (0.37%), entirely
from placeholder project copy wrapping differently than the original's text.
