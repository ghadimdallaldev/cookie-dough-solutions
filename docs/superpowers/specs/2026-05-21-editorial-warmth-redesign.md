# Cookie Dough Solutions — Editorial Warmth Redesign
**Date:** 2026-05-21  
**Approach:** Option A — Editorial Warmth (suppy.fr-calibre, cookie-dough identity)

---

## Vision

Cookie Dough Solutions presents itself as a premium software studio for food & beverage operators. The site leads with warmth (cream, dough, tan) and delivers editorial drama through big type, cinematic motion, and thoughtful contrast. Every section feels intentional — like a Milanese studio that happens to love food.

Core tagline: **"We build the tools that move food."**

---

## Global Layer

### Custom Cursor
- `CustomCursor.tsx` — fixed overlay, always on top
- Small dough-300 filled circle (12px) tracks mouse with `useSpring` (stiffness 400, damping 28)
- Outer ring (32px, border-only) follows with slower spring (stiffness 150, damping 20)
- On hover over interactive elements: outer ring expands to 64px, inner dot shrinks; text label ("VIEW" or "→") fades into ring
- Hidden on touch devices
- `cursor: none` applied globally via CSS

### Grain Texture
- `GrainOverlay.tsx` — `position: fixed`, full-screen, `pointer-events: none`, `z-index: 9998`
- SVG `feTurbulence` filter generates film grain noise
- Opacity: 0.04 (barely perceptible but adds tactile warmth)
- Animated subtly (baseFrequency shifts 0.001 every frame) for a living texture feel

### Page Transitions
- `App.tsx` wraps `<Routes>` outlet in `<AnimatePresence mode="wait">`
- Each page's root element is a `motion.div`:
  - `initial`: `{ opacity: 0, y: 24 }`
  - `animate`: `{ opacity: 1, y: 0 }` (duration 0.5s, ease `[0.22, 1, 0.36, 1]`)
  - `exit`: `{ opacity: 0, y: -16 }` (duration 0.3s)
- Additionally a cream-coloured bar sweeps left-to-right (200ms) then out before content appears

### Scroll Reveal
- `Reveal.tsx` — wrapper component
- Uses `IntersectionObserver` (threshold 0.15) to trigger
- Children animate from `{ opacity: 0, y: 40 }` → `{ opacity: 1, y: 0 }`
- Stagger delay prop for sequential children
- Clip-mask variant (`Reveal clip`) for heading lines (slides up from below a hidden overflow)

---

## Navigation (Layout.tsx)

- Transparent on scroll top → `bg-dough-50/90 backdrop-blur-md` on scroll (replaces current solid switch)
- Logo: keep existing, ensure hover has subtle scale(1.02)
- Nav links: on hover, a small dough-300 dot slides under the text (underline-dot indicator)
- CTA button: `rounded-full bg-chip text-white` → on hover fills with ink
- Mobile: hamburger becomes X; full-screen cream overlay with large nav links that slide in staggered
- On Supplify page: nav uses ink/violet tones as today

---

## Homepage Sections

### 1. Hero
- Full viewport, parallax background (photo moves at 0.4× scroll speed via `useScroll` + `useTransform`)
- Warm gradient overlay: `from-ink/80 via-chip/50 to-ink/90`
- Layout: bottom-aligned content (as today)
- Eyebrow: `"Studio · Est. 2024 · Beirut"` — monospace font, dough-400, small
- Headline: **"We build the tools that move food."** — Syne, `clamp(3.5rem, 10vw, 8rem)`, white, line-by-line Reveal
- Subheading: `"Cookie Dough Solutions — a fully customised software studio for food & beverage operators."` — DM Sans, dough-200, fade-in after headline
- CTAs: `"Explore Supplify"` (filled white → ink text) + `"Contact us"` (ghost border white)
- Scroll indicator: animated bouncing arrow at bottom-center, fades out on scroll

### 2. Marquee (warm)
- Same component, words: `['order calmly', 'move food', 'build tools', 'scale up', 'trust the process']`
- Background: `bg-chip` (warm brown), text: `dough-100`

### 3. Who We Are (cream)
- `bg-dough-50`, generous padding
- Left: large number "01" in dough-200, tag "Studio", heading "Trusted partner for restaurants & suppliers.", body copy, CTA link
- Right: `MockupStage` with Reveal entrance
- Heading uses clip-mask line reveal

### 4. Manifesto Strip
- Full-width `bg-ink` section
- Giant text: **"We build calm tools for a chaotic industry."**
- Each word is a `<motion.span>` that fades + slides in staggered on scroll
- Font: Syne, `clamp(2.5rem, 6vw, 5rem)`, dough-100
- Decorative: small dough-300 horizontal rule before the text

### 5. Products Grid
- `bg-dough-100` background
- Section label: "Our Products"
- Supplify card:
  - Large card, `bg-ink` with violet accent strip top
  - 3D mouse-tilt via `onMouseMove` → `rotateX/Y` + `perspective(1000px)` (max ±8deg)
  - Contains: Supplify logo area, tagline "Calm ordering between restaurants & suppliers", MockupStage mockup, "Explore →" CTA
  - On hover: subtle glow `box-shadow: 0 0 60px rgba(124,58,237,0.3)`
- "Coming soon" ghost card:
  - Dashed border, dough-300, cream bg
  - Text: "Next product — 2025" in dough-500

### 6. Pillars (3 sections)
- Same 3 pillars but every text block wrapped in `<Reveal>`
- `num` uses clip-mask reveal (slides up)
- Alternating cream / ink as today
- MockupStage gets a subtle float animation (`animate-float` keyframe: translateY 0 → -8px → 0, 6s ease-in-out infinite)

### 7. Stats Band
- Keep existing animated counters
- Add: markets shown as pill badges with entrance stagger
- Headline uses clip-mask line reveal

### 8. Marquee (dark)
- Words: `['order calmly', 'trust suppliers', 'skip chaos', 'run kitchens']`

### 9. Contact
- `bg-dough-100`, centred
- Heading: "Loving the Cookie Dough energy?"
- Email link: large, on hover a dough-colored underline animates in from left to right (width 0→100%)
- Subtext: "Partner on Supplify or what we build next."

---

## Supplify Page

Inherits all global interactions. Key differences:
- Hero tone: violet (`bg-[#1a0a2e]`)
- Manifesto: `"The ordering layer food businesses deserve."`
- Pain points section enhanced with Reveal stagger on each list item
- Security section gets the same 3D card treatment
- Stats Band: same animated counters

---

## New Files

| File | Purpose |
|------|---------|
| `src/components/CustomCursor.tsx` | Spring-physics cursor with hover morphing |
| `src/components/GrainOverlay.tsx` | Fixed SVG grain texture |
| `src/components/Reveal.tsx` | Scroll-triggered reveal wrapper |
| `src/components/ProductCard.tsx` | 3D mouse-tilt product showcase card |
| `src/components/ManifestoSection.tsx` | Big word-by-word scroll reveal strip |
| `src/components/ScrollIndicator.tsx` | Bouncing scroll arrow for hero |

## Modified Files

| File | Changes |
|------|---------|
| `src/App.tsx` | Add AnimatePresence, page transition wrapper |
| `src/components/Layout.tsx` | Add cursor, grain, enhanced nav, mobile menu |
| `src/components/HeroScene.tsx` | Add parallax via useScroll/useTransform |
| `src/components/art/PillarSection.tsx` | Wrap text in Reveal, add float to mockup |
| `src/components/art/StatBand.tsx` | Add Reveal to headline and stats |
| `src/components/Marquee.tsx` | Update default words |
| `src/pages/HomePage.tsx` | Full restructure per sections above |
| `src/pages/SupplifyPage.tsx` | Add Reveal, enhanced pain points |
| `src/index.css` | cursor:none global, grain keyframe, float keyframe |
| `tailwind.config.js` | Add float animation keyframe |

---

## Constraints

- No new npm packages beyond what's already installed (framer-motion already present)
- Keep all existing Tailwind color tokens — no palette changes
- All new motion respects `prefers-reduced-motion` (already handled in index.css)
- MockupStage stays unchanged — it's a stable art component
