# Editorial Warmth Redesign — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign the Cookie Dough Solutions site into a premium, cinematic tech-agency experience with a warm editorial identity — custom cursor, parallax hero, scroll reveals, 3D product cards, manifesto section, mobile menu, and smooth page transitions.

**Architecture:** Six new components handle isolated concerns (cursor, grain, reveal, card, manifesto, scroll indicator); existing page components and art components are enhanced with framer-motion scroll hooks and reveal wrappers. Layout hosts global chrome (cursor, grain, transitions). No new npm packages required — framer-motion v11 already installed.

**Tech Stack:** React 18, TypeScript, Tailwind CSS 3, Framer Motion 11, React Router DOM 7, Vite 5

---

## File Map

**Create:**
- `src/components/CustomCursor.tsx` — spring-physics cursor with hover morphing
- `src/components/GrainOverlay.tsx` — fixed SVG grain texture
- `src/components/Reveal.tsx` — scroll-triggered reveal wrapper (fade+slide or clip)
- `src/components/ScrollIndicator.tsx` — bouncing scroll arrow for hero
- `src/components/ManifestoSection.tsx` — word-by-word scroll-reveal strip
- `src/components/ProductCard.tsx` — 3D mouse-tilt product showcase card

**Modify:**
- `tailwind.config.js` — add `float` animation keyframe
- `src/index.css` — add `cursor: none` globally, float utility
- `src/components/Layout.tsx` — add GrainOverlay, CustomCursor, AnimatePresence outlet, mobile menu, enhanced nav
- `src/components/HeroScene.tsx` — add parallax via `useScroll` + `useTransform`
- `src/components/art/PillarSection.tsx` — wrap text blocks in Reveal, add float class to MockupStage
- `src/components/art/StatBand.tsx` — wrap headline and stats in Reveal
- `src/pages/HomePage.tsx` — full restructure with new sections
- `src/pages/SupplifyPage.tsx` — add Reveal wrappers, enhanced pain-points

---

## Task 1: Tailwind + CSS Foundations

**Files:**
- Modify: `tailwind.config.js`
- Modify: `src/index.css`

- [ ] **Step 1: Add float animation to Tailwind config**

Replace the `animation` and `keyframes` block in `tailwind.config.js`:

```js
animation: {
  marquee: 'marquee 40s linear infinite',
  float: 'float 6s ease-in-out infinite',
},
keyframes: {
  marquee: {
    '0%': { transform: 'translateX(0)' },
    '100%': { transform: 'translateX(-50%)' },
  },
  float: {
    '0%, 100%': { transform: 'translateY(0px)' },
    '50%': { transform: 'translateY(-10px)' },
  },
},
```

- [ ] **Step 2: Add global cursor and clip-path utilities to index.css**

Append to `src/index.css` after the existing `@layer utilities` block:

```css
@layer base {
  body {
    cursor: none;
  }
  a, button, [role="button"], input, textarea, select, label {
    cursor: none;
  }
}

@layer utilities {
  .clip-reveal {
    clip-path: inset(0 0 0 0);
  }
}
```

- [ ] **Step 3: Verify Tailwind picks up new animation**

Run: `npm run dev` (port 5180)

Open browser at `http://localhost:5180`. Site loads without errors. No console errors about unknown utilities.

---

## Task 2: GrainOverlay Component

**Files:**
- Create: `src/components/GrainOverlay.tsx`

- [ ] **Step 1: Create the component**

```tsx
export function GrainOverlay() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[9998]"
      style={{ opacity: 0.04 }}
    >
      <svg
        className="h-full w-full"
        xmlns="http://www.w3.org/2000/svg"
        width="100%"
        height="100%"
      >
        <filter id="grain-filter">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.65"
            numOctaves="3"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#grain-filter)" />
      </svg>
    </div>
  )
}
```

- [ ] **Step 2: Spot-check in browser**

No visible square pattern or heavy noise. The grain is barely perceptible — a subtle warmth over flat backgrounds.

---

## Task 3: CustomCursor Component

**Files:**
- Create: `src/components/CustomCursor.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const [hovering, setHovering] = useState(false)
  const [mounted, setMounted] = useState(false)

  const dotX = useSpring(x, { stiffness: 400, damping: 28 })
  const dotY = useSpring(y, { stiffness: 400, damping: 28 })
  const ringX = useSpring(x, { stiffness: 150, damping: 20 })
  const ringY = useSpring(y, { stiffness: 150, damping: 20 })

  useEffect(() => {
    if ('ontouchstart' in window) return
    setMounted(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setHovering(!!(t.closest('a') || t.closest('button') || t.closest('[data-cursor-hover]')))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (!mounted) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-dough-300"
        style={{
          left: 0,
          top: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ width: hovering ? 8 : 12, height: hovering ? 8 : 12, opacity: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border border-dough-300/60"
        style={{
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ width: hovering ? 48 : 32, height: hovering ? 48 : 32, opacity: hovering ? 1 : 0.55 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
```

- [ ] **Step 2: Verify**

After adding to Layout (Task 8), cursor dot and ring follow mouse. On hover over links, ring expands to 48px. Native cursor is hidden.

---

## Task 4: Reveal Component

**Files:**
- Create: `src/components/Reveal.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type RevealProps = {
  children: React.ReactNode
  delay?: number
  className?: string
  clip?: boolean
  as?: keyof JSX.IntrinsicElements
}

export function Reveal({ children, delay = 0, className = '', clip = false, as: Tag = 'div' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-8% 0px' })

  if (clip) {
    return (
      <Tag className={`overflow-hidden ${className}`}>
        <motion.div
          ref={ref}
          initial={{ y: '110%' }}
          animate={inView ? { y: 0 } : { y: '110%' }}
          transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
        >
          {children}
        </motion.div>
      </Tag>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
```

---

## Task 5: ScrollIndicator Component

**Files:**
- Create: `src/components/ScrollIndicator.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  const { scrollY } = useScroll()
  const opacity = useTransform(scrollY, [0, 120], [1, 0])

  return (
    <motion.div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/50"
      style={{ opacity }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.4, duration: 0.6 }}
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">Scroll</span>
      <motion.div
        animate={{ y: [0, 5, 0] }}
        transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
      >
        <ChevronDown className="h-4 w-4" />
      </motion.div>
    </motion.div>
  )
}
```

---

## Task 6: ManifestoSection Component

**Files:**
- Create: `src/components/ManifestoSection.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function ManifestoSection({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-15% 0px' })
  const words = text.split(' ')

  return (
    <section className="bg-ink py-24 md:py-36" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 h-px w-16 bg-dough-700" />
        <p
          className="font-display font-extrabold leading-tight tracking-tight text-dough-100"
          style={{ fontSize: 'clamp(2rem, 5vw, 4.25rem)' }}
        >
          {words.map((word, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '115%', opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: '115%', opacity: 0 }}
                transition={{ duration: 0.65, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
```

---

## Task 7: ProductCard Component

**Files:**
- Create: `src/components/ProductCard.tsx`

- [ ] **Step 1: Create the component**

```tsx
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import { Link } from 'react-router-dom'
import { MockupStage } from './art/MockupStage'
import type { MockVariant } from './SupplifyMockup'

type ProductCardProps = {
  name: string
  tagline: string
  description: string
  to: string
  cta: string
  variant: MockVariant
  accentColor?: string
}

export function ProductCard({
  name,
  tagline,
  description,
  to,
  cta,
  variant,
  accentColor = '#7c3aed',
}: ProductCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 300, damping: 30 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    rawX.set((e.clientX - rect.left) / rect.width - 0.5)
    rawY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const onMouseLeave = () => {
    rawX.set(0)
    rawY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 1200 }}
      className="group relative overflow-hidden rounded-2xl bg-ink p-8 md:p-10"
    >
      <div
        className="absolute inset-x-0 top-0 h-[3px]"
        style={{ backgroundColor: accentColor }}
      />
      <div
        className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{ boxShadow: `0 0 80px ${accentColor}33` }}
      />
      <div className="relative z-10">
        <p
          className="text-xs font-bold uppercase tracking-[0.3em]"
          style={{ color: accentColor }}
        >
          {tagline}
        </p>
        <h3 className="mt-3 font-display text-4xl font-extrabold text-white md:text-5xl">
          {name}
        </h3>
        <p className="mt-4 max-w-lg text-lg leading-relaxed text-dough-300">{description}</p>
        <div className="mt-8">
          <MockupStage variant={variant} />
        </div>
        <Link
          to={to}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink transition hover:bg-dough-100"
        >
          {cta} <ArrowRight className="h-4 w-4" />
        </Link>
      </div>
    </motion.div>
  )
}
```

---

## Task 8: Layout — Global Chrome

**Files:**
- Modify: `src/components/Layout.tsx`

- [ ] **Step 1: Replace Layout.tsx entirely**

```tsx
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowRight, Menu, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useLocation } from 'react-router-dom'
import { CustomCursor } from './CustomCursor'
import { GrainOverlay } from './GrainOverlay'
import { Logo } from './Logo'

const NAV = [
  { to: '/', label: 'Home', end: true },
  { to: '/supplify', label: 'Supplify', end: false },
] as const

export function Layout() {
  const location = useLocation()
  const { pathname } = location
  const onSupplify = pathname.startsWith('/supplify')
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [pathname])

  useEffect(() => {
    setMenuOpen(false)
  }, [pathname])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  const solidNav = scrolled || onSupplify

  return (
    <div className="min-h-screen bg-dough-50">
      <GrainOverlay />
      <CustomCursor />

      {/* Nav */}
      <header
        className={`fixed inset-x-0 top-0 z-[100] border-b transition-[background-color,border-color,backdrop-filter,box-shadow] duration-300 ${
          solidNav
            ? onSupplify
              ? 'border-white/10 bg-[#1a0a2e]/95 shadow-lg shadow-black/20 backdrop-blur-md'
              : 'border-dough-200/80 bg-dough-50/95 shadow-sm backdrop-blur-md'
            : 'border-transparent bg-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-6 md:h-[4.25rem]">
          <Logo inverted={solidNav && onSupplify} linkHome showWordmark />

          {/* Desktop nav */}
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map(({ to, label, end }) => (
              <NavLink
                key={to}
                to={to}
                end={end}
                className={({ isActive }) => {
                  const base = solidNav
                    ? onSupplify
                      ? 'text-dough-300 hover:text-white'
                      : 'text-dough-600 hover:text-ink'
                    : 'text-white/90 hover:text-white'
                  const active = solidNav
                    ? onSupplify ? 'text-white' : 'text-ink'
                    : 'text-white'
                  return `group relative text-sm font-semibold transition-colors ${isActive ? active : base}`
                }}
              >
                {({ isActive }) => (
                  <>
                    {label}
                    {isActive && (
                      <span className="absolute -bottom-1 left-0 h-px w-full bg-dough-400" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
            <a
              href="#contact"
              className={
                solidNav
                  ? onSupplify
                    ? 'text-sm font-semibold text-dough-300 hover:text-white'
                    : 'text-sm font-semibold text-dough-600 hover:text-ink'
                  : 'text-sm font-semibold text-white/90 hover:text-white'
              }
            >
              Contact
            </a>
          </nav>

          <div className="flex items-center gap-3">
            <Link
              to="/supplify"
              className={`hidden shrink-0 rounded-full px-5 py-2.5 text-sm font-bold transition-colors sm:inline-flex items-center gap-1 ${
                onSupplify
                  ? 'bg-white text-[#2d1654] hover:bg-dough-100'
                  : solidNav
                    ? 'bg-ink text-white hover:bg-chip'
                    : 'bg-white text-ink hover:bg-dough-100'
              }`}
            >
              Meet Supplify <ArrowRight className="h-4 w-4" />
            </Link>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen((v) => !v)}
              className={`flex h-10 w-10 items-center justify-center rounded-full transition md:hidden ${
                onSupplify || !solidNav ? 'text-white' : 'text-ink'
              }`}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[99] flex flex-col justify-center bg-dough-50 px-8"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="flex flex-col gap-2">
              {NAV.map(({ to, label, end }, i) => (
                <motion.div
                  key={to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.08 + i * 0.06, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  <NavLink
                    to={to}
                    end={end}
                    className={({ isActive }) =>
                      `block font-display text-4xl font-extrabold tracking-tight transition ${
                        isActive ? 'text-ink' : 'text-dough-400'
                      } hover:text-chip`
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, x: -24 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              >
                <a
                  href="#contact"
                  onClick={() => setMenuOpen(false)}
                  className="block font-display text-4xl font-extrabold tracking-tight text-dough-400 transition hover:text-chip"
                >
                  Contact
                </a>
              </motion.div>
            </nav>
            <motion.div
              className="mt-12"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <p className="text-sm text-dough-500">hello@cookiedough.app</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Page content with transition */}
      <main>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>

      <footer
        className={`border-t py-14 ${onSupplify ? 'border-white/10 bg-ink text-dough-300' : 'border-dough-200 bg-white'}`}
      >
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-8 px-6 md:flex-row">
          <Logo inverted={onSupplify} linkHome showWordmark />
          <p className="max-w-md text-center text-sm leading-relaxed md:text-left">
            <strong className={onSupplify ? 'text-dough-100' : 'text-ink'}>
              Cookie Dough Solutions
            </strong>{' '}
            — parent company.{' '}
            <strong className="text-[#a78bfa]">Supplify</strong> is our flagship product.
          </p>
          <a
            href="mailto:hello@cookiedough.app"
            className={`text-sm font-semibold ${
              onSupplify ? 'text-white hover:text-dough-200' : 'text-chip hover:text-ink'
            }`}
          >
            hello@cookiedough.app
          </a>
        </div>
      </footer>
    </div>
  )
}
```

- [ ] **Step 2: Verify**

Run dev server, open site. Cursor dot + ring track mouse. Grain texture barely visible. Nav becomes solid cream with blur on scroll. Hamburger opens full-screen menu on mobile viewport. Page transitions fade when navigating between routes.

---

## Task 9: HeroScene — Parallax

**Files:**
- Modify: `src/components/HeroScene.tsx`

- [ ] **Step 1: Replace HeroScene.tsx**

```tsx
import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'
import { IMAGES } from '../data/images'

type Tone = 'warm' | 'violet'
type HeroKey = 'cookieDough' | 'supplify' | 'kitchen'

const SRC: Record<HeroKey, string> = {
  cookieDough: IMAGES.heroCookieDough,
  supplify: IMAGES.heroSupplify,
  kitchen: IMAGES.sceneKitchen,
}

const OVERLAY: Record<Tone, string> = {
  warm: 'from-ink/80 via-chip/50 to-ink/90',
  violet: 'from-[#1a0a2e]/95 via-[#2d1654]/75 to-ink/95',
}

function Atmosphere({ tone }: { tone: Tone }) {
  return (
    <div
      className={`absolute inset-0 ${
        tone === 'violet'
          ? 'bg-[#1a0a2e]'
          : 'bg-gradient-to-br from-chip to-ink'
      }`}
    />
  )
}

export function HeroScene({
  heroKey,
  tone = 'warm',
  children,
}: {
  heroKey: HeroKey
  tone?: Tone
  children: React.ReactNode
}) {
  const [fallback, setFallback] = useState(false)
  const containerRef = useRef<HTMLElement>(null)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 700], ['0%', '30%'])

  return (
    <section
      ref={containerRef}
      className="relative isolate min-h-[min(100vh,900px)] overflow-hidden"
    >
      <div className="absolute inset-0">
        <motion.div className="absolute inset-[-20%_0_0_0]" style={{ y }}>
          {fallback ? (
            <Atmosphere tone={tone} />
          ) : (
            <img
              src={SRC[heroKey]}
              alt=""
              width={1920}
              height={1080}
              fetchPriority="high"
              decoding="async"
              className="h-full w-full object-cover"
              onError={() => setFallback(true)}
            />
          )}
        </motion.div>
        <div className={`absolute inset-0 bg-gradient-to-b ${OVERLAY[tone]}`} />
      </div>
      <div className="relative z-10">{children}</div>
      <div
        className="pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-t from-dough-50 to-transparent"
        aria-hidden
      />
    </section>
  )
}

export function CtaScene({
  children,
  imageKey = 'kitchen',
}: {
  children: React.ReactNode
  imageKey?: HeroKey
}) {
  const [fallback, setFallback] = useState(false)
  const { scrollY } = useScroll()
  const y = useTransform(scrollY, [0, 2000], ['0%', '20%'])

  return (
    <section className="relative isolate overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0">
        <motion.div className="absolute inset-[-10%_0_0_0]" style={{ y }}>
          {fallback ? (
            <div className="h-full w-full bg-[#1a0a2e]" />
          ) : (
            <img
              src={SRC[imageKey]}
              alt=""
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover"
              onError={() => setFallback(true)}
            />
          )}
        </motion.div>
        <div className="absolute inset-0 bg-ink/80" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  )
}
```

- [ ] **Step 2: Verify parallax**

Scroll down on the homepage. The hero background image moves upward more slowly than the page, creating a parallax depth effect.

---

## Task 10: PillarSection — Reveal + Float

**Files:**
- Modify: `src/components/art/PillarSection.tsx`

- [ ] **Step 1: Replace PillarSection.tsx**

```tsx
import { Reveal } from '../Reveal'
import { MockupStage } from './MockupStage'
import type { MockVariant } from '../SupplifyMockup'

type PillarSectionProps = {
  num: string
  tag: string
  title: string
  subtitle: string
  points: string[]
  mockVariant: MockVariant
  invert?: boolean
  dark?: boolean
}

export function PillarSection({
  num,
  tag,
  title,
  subtitle,
  points,
  mockVariant,
  invert = false,
  dark = false,
}: PillarSectionProps) {
  return (
    <section
      className={`py-20 md:py-28 ${dark ? 'bg-ink text-dough-100' : 'bg-dough-50'}`}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
            invert ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div>
            <Reveal>
              <div className="flex items-start gap-4">
                <span
                  className={`font-display text-5xl font-extrabold leading-none md:text-6xl ${
                    dark ? 'text-dough-800' : 'text-dough-200'
                  }`}
                >
                  {num}
                </span>
                <div>
                  <p
                    className={`text-xs font-bold uppercase tracking-[0.3em] ${
                      dark ? 'text-dough-400' : 'text-dough-600'
                    }`}
                  >
                    {tag}
                  </p>
                  <h2
                    className={`mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl ${
                      dark ? 'text-white' : 'text-ink'
                    }`}
                  >
                    {title}
                  </h2>
                </div>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <p
                className={`mt-6 max-w-lg text-lg leading-relaxed ${
                  dark ? 'text-dough-300' : 'text-dough-700'
                }`}
              >
                {subtitle}
              </p>
            </Reveal>
            <Reveal delay={0.2}>
              <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                {points.map((pt, idx) => (
                  <li
                    key={pt}
                    className={`flex items-center gap-2 text-sm font-semibold ${
                      dark ? 'text-dough-100' : 'text-chip'
                    }`}
                  >
                    <span className="font-display text-dough-400">
                      {String(idx + 1).padStart(2, '0')}
                    </span>
                    {pt}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.15}>
            <div className="animate-float">
              <MockupStage variant={mockVariant} />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
```

---

## Task 11: StatBand — Reveal

**Files:**
- Modify: `src/components/art/StatBand.tsx`

- [ ] **Step 1: Replace StatBand.tsx**

```tsx
import { useEffect, useRef, useState } from 'react'
import { Reveal } from '../Reveal'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [n, setN] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const duration = 900
    const start = performance.now()
    let frame: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target])

  return (
    <div ref={ref}>
      <span className="tabular-nums">{n}{suffix}</span>
    </div>
  )
}

export function StatBand({
  headline,
  stats,
  markets,
  dark = true,
}: {
  headline: string
  stats: { value: number; suffix?: string; label: string }[]
  markets?: string[]
  dark?: boolean
}) {
  return (
    <section className={`py-24 md:py-32 ${dark ? 'bg-ink text-white' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <Reveal clip>
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
            {headline}
          </h2>
        </Reveal>
        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {stats.map((s, i) => (
            <Reveal key={s.label} delay={i * 0.12}>
              <div>
                <p className="font-display text-5xl font-extrabold text-dough-300 md:text-7xl">
                  <Counter target={s.value} suffix={s.suffix} />
                </p>
                <p className="mt-2 text-xs font-bold uppercase tracking-widest text-dough-500">
                  {s.label}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
        {markets && markets.length > 0 && (
          <Reveal delay={0.3}>
            <div className="mt-14 flex flex-wrap justify-center gap-2">
              {markets.map((m) => (
                <span
                  key={m}
                  className="rounded-full border border-dough-700 px-4 py-2 text-sm font-semibold text-dough-300"
                >
                  {m}
                </span>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
```

---

## Task 12: HomePage — Full Redesign

**Files:**
- Modify: `src/pages/HomePage.tsx`

- [ ] **Step 1: Replace HomePage.tsx**

```tsx
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ManifestoSection } from '../components/ManifestoSection'
import { ProductCard } from '../components/ProductCard'
import { Reveal } from '../components/Reveal'
import { ScrollIndicator } from '../components/ScrollIndicator'
import { MockupStage } from '../components/art/MockupStage'
import { PillarSection } from '../components/art/PillarSection'
import { RotatingWords } from '../components/art/RotatingWords'
import { StatBand } from '../components/art/StatBand'
import { HeroScene } from '../components/HeroScene'
import { Marquee } from '../components/Marquee'

const WORDS = ['Solutions', 'Operators', 'Supply'] as const

const HERO_LINES = ['We build the', 'tools that', 'move food.']

export function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroScene heroKey="cookieDough" tone="warm">
        <div className="mx-auto flex min-h-[min(100vh,900px)] max-w-6xl flex-col justify-end px-6 pb-28 pt-24 md:pb-36 md:pt-28">
          <Reveal delay={0.1}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-dough-400">
              Studio · Est. 2024 · Beirut
            </p>
          </Reveal>

          <div className="mt-4">
            {HERO_LINES.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  className="font-display font-extrabold leading-[0.92] tracking-tight text-white"
                  style={{ fontSize: 'clamp(3.2rem, 10vw, 8rem)' }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          <Reveal delay={0.65} className="mt-8 max-w-xl">
            <p className="text-lg leading-relaxed text-dough-200/90">
              <strong className="text-white">Cookie Dough Solutions</strong> is the parent company
              behind{' '}
              <strong className="text-[#c4b5fd]">Supplify</strong> — calm ordering between
              restaurants and suppliers.
            </p>
          </Reveal>

          <Reveal delay={0.8} className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/supplify"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-ink shadow-lg transition hover:bg-dough-100"
            >
              Explore Supplify
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/35 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contact us
            </a>
          </Reveal>
        </div>
        <ScrollIndicator />
      </HeroScene>

      {/* ── Marquee ── */}
      <Marquee words={['order calmly', 'move food', 'build tools', 'scale up', 'trust the process']} />

      {/* ── Who We Are ── */}
      <section className="bg-dough-50 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:items-center">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-dough-600">Who we are</p>
            </Reveal>
            <Reveal delay={0.1} clip className="mt-4">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
                Trusted partner for restaurants &amp; suppliers.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-dough-700">
                Warm product design with serious engineering — so operators thrive without becoming IT
                specialists.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-chip hover:text-dough-800"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="animate-float">
              <MockupStage variant="orders" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Manifesto ── */}
      <ManifestoSection text="We build calm tools for a chaotic industry." />

      {/* ── Products ── */}
      <section className="bg-dough-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-dough-600">Our Products</p>
          </Reveal>
          <Reveal delay={0.1} clip className="mt-3">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
              Software built for the real world.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.15}>
              <ProductCard
                name="Supplify"
                tagline="Flagship product"
                description="Calm ordering between restaurants and suppliers — browse, order, receive, and pay in one place."
                to="/supplify"
                cta="Explore Supplify"
                variant="orders"
                accentColor="#7c3aed"
              />
            </Reveal>
            <Reveal delay={0.25}>
              <div className="flex min-h-[200px] flex-col justify-center rounded-2xl border-2 border-dashed border-dough-300 p-10 text-center">
                <p className="font-display text-2xl font-extrabold text-dough-400">Next product</p>
                <p className="mt-2 text-sm font-semibold text-dough-500">Coming 2025 — stay tuned</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <PillarSection
        num="01"
        tag="B2B ordering"
        title="Customer experience"
        subtitle="Restaurants browse supplier catalogs, build carts, and place orders — with the ease your team expects from consumer apps."
        points={['Multi-supplier carts', 'Quick lists & reorder', 'Mobile-ready', 'Role-based access']}
        mockVariant="orders"
      />

      <PillarSection
        num="02"
        tag="Operations"
        title="Fulfillment & receiving"
        subtitle="Suppliers fulfill from one console; restaurants receive and reconcile — no spreadsheet archaeology."
        points={['Pick & pack', 'Receiving', 'Invoices', 'Branch-aware']}
        mockVariant="supplier"
        invert
        dark
      />

      <PillarSection
        num="03"
        tag="Intelligence"
        title="Insights & control"
        subtitle="Spend, open orders, and supplier relationships at a glance."
        points={['Dashboards', 'Usage visibility', 'Secure roles', 'Audit-ready']}
        mockVariant="restaurant"
      />

      {/* ── Stats ── */}
      <StatBand
        headline="Co-piloting the future of food supply."
        stats={[
          { value: 1, suffix: '+', label: 'Flagship product' },
          { value: 3, suffix: '+', label: 'Sides of the market' },
          { value: 100, suffix: '%', label: 'Ops-first mindset' },
        ]}
        markets={['Lebanon', 'UAE', 'KSA', 'EU', 'North America']}
      />

      {/* ── Dark Marquee ── */}
      <Marquee dark words={['order calmly', 'trust suppliers', 'skip chaos', 'run kitchens']} />

      {/* ── Contact ── */}
      <section id="contact" className="scroll-mt-24 bg-dough-100 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal clip>
            <h2 className="font-display text-4xl font-extrabold text-ink">
              Loving the Cookie Dough energy?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-lg text-dough-700">
              Partner on Supplify or what we build next.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <a
              href="mailto:hello@cookiedough.app"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-10 py-4 text-lg font-bold text-white transition hover:bg-chip"
            >
              hello@cookiedough.app
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
```

- [ ] **Step 2: Verify full homepage**

Open `http://localhost:5180`. Confirm:
- Hero headline lines animate in from below, one by one
- "Studio · Est. 2024 · Beirut" eyebrow appears
- Parallax moves background image on scroll
- Scroll indicator bounces then fades
- Marquee scrolls correctly
- "Who we are" section reveals on scroll
- Manifesto word-by-word animation fires on scroll
- Supplify ProductCard tilts on mouse move + shows violet glow on hover
- "Coming soon" ghost card shows dashed border
- Pillar sections reveal + mockup floats
- Stats animate in
- Contact email button arrow slides right on hover

---

## Task 13: SupplifyPage — Enhanced Reveals

**Files:**
- Modify: `src/pages/SupplifyPage.tsx`

- [ ] **Step 1: Replace SupplifyPage.tsx**

```tsx
import { motion } from 'framer-motion'
import { ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import { MockupStage } from '../components/art/MockupStage'
import { PillarSection } from '../components/art/PillarSection'
import { RotatingWords } from '../components/art/RotatingWords'
import { StatBand } from '../components/art/StatBand'
import { CtaScene, HeroScene } from '../components/HeroScene'
import { ParentCompanyBadge } from '../components/Logo'
import { Marquee } from '../components/Marquee'
import { Reveal } from '../components/Reveal'
import { ScrollIndicator } from '../components/ScrollIndicator'

const WE_ARE = ['Ordering', 'Trust', 'Calm'] as const

const HERO_LINES = ['Supplify —', 'calm ordering', 'for everyone.']

const PAIN = [
  'Orders buried in WhatsApp and phone calls',
  'Wrong items, missing deliveries, angry kitchens',
  'Spreadsheets nobody trusts by month-end',
  'Suppliers and restaurants out of sync',
]

export function SupplifyPage() {
  return (
    <>
      <HeroScene heroKey="supplify" tone="violet">
        <div className="mx-auto flex min-h-[min(100vh,900px)] max-w-6xl flex-col justify-end px-6 pb-28 pt-24 md:pb-36 md:pt-28">
          <Reveal delay={0.05}>
            <ParentCompanyBadge inverted />
          </Reveal>

          <div className="mt-8">
            {HERO_LINES.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  className="font-display font-extrabold leading-[0.92] tracking-tight text-white"
                  style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          <Reveal delay={0.55} className="mt-8 max-w-xl">
            <p className="text-lg text-dough-300">
              A product of Cookie Dough Solutions. Safe, human-friendly, built for the kitchen and
              the warehouse.
            </p>
          </Reveal>

          <Reveal delay={0.7} className="mt-10">
            <a
              href="#contact"
              className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#2d1654] transition hover:bg-dough-100"
            >
              Request a walkthrough
              <ArrowRight className="h-4 w-4" />
            </a>
          </Reveal>
        </div>
        <ScrollIndicator />
      </HeroScene>

      <section className="relative z-20 -mt-8 bg-dough-50 pb-16 pt-4 md:-mt-12">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <MockupStage variant="orders" />
          </Reveal>
        </div>
      </section>

      <Marquee dark words={['one order', 'one truth', 'less stress', 'more service']} />

      <section className="bg-[#faf8ff] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6d28d9]">Why it matters</p>
            </Reveal>
            <Reveal delay={0.1} clip className="mt-4">
              <h2 className="font-display text-3xl font-extrabold text-[#1e0b3a] md:text-5xl">
                Ordering shouldn&apos;t be a second job.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-slate-600">
                One missed message becomes a missing delivery. Supplify gives the industry one place
                everyone trusts.
              </p>
            </Reveal>
          </div>
          <ul className="space-y-3">
            {PAIN.map((item, i) => (
              <Reveal key={item} delay={i * 0.08}>
                <li className="flex gap-3 rounded-xl border border-violet-100 bg-white p-5 shadow-sm">
                  <span className="font-bold text-red-400">✕</span>
                  <span className="font-medium text-slate-700">{item}</span>
                </li>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <PillarSection
        num="01"
        tag="Ordering"
        title="Place orders in minutes"
        subtitle="See what's available, what's on deal, and what's in the cart — before anyone picks up the phone."
        points={['Supplier catalogs', 'Smart carts', 'Standing orders', 'Clear pricing']}
        mockVariant="orders"
      />

      <PillarSection
        num="02"
        tag="Fulfillment"
        title="Fulfill with confidence"
        subtitle="One queue: pick, pack, ship, invoice — with status everyone can see."
        points={['Fulfillment queue', 'On-time tracking', 'Invoices', 'Visibility']}
        mockVariant="supplier"
        invert
        dark
      />

      <PillarSection
        num="03"
        tag="Restaurant"
        title="Run the floor"
        subtitle="Spend, deliveries, and messages — without digging through inboxes."
        points={['Dashboard KPIs', 'Delivery tracking', 'Order chat', 'Spend control']}
        mockVariant="restaurant"
      />

      <section className="bg-[#1a0a2e] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
          <div>
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold">
                <Lock className="h-4 w-4 text-[#c4b5fd]" />
                Safe for every side
              </div>
            </Reveal>
            <Reveal delay={0.1} clip>
              <h2 className="font-display text-3xl font-extrabold md:text-5xl">
                Everyone in their own protected space.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-dough-300">
                Restaurants, suppliers, and HQ each get a private lane — no security jargon required.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-8 space-y-3">
                {[
                  'Staff sign in with roles that match their job',
                  'Suppliers only see their customers and orders',
                  'HQ oversees without micromanaging every click',
                ].map((line) => (
                  <li key={line} className="flex gap-3 text-dough-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#a78bfa]" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="animate-float">
              <MockupStage variant="inbox" />
            </div>
          </Reveal>
        </div>
      </section>

      <StatBand
        headline="The ordering problem is solvable."
        stats={[
          { value: 96, suffix: '%', label: 'On-time target' },
          { value: 3, suffix: '', label: 'Steps to calm supply' },
          { value: 1, suffix: '', label: 'Platform for both sides' },
        ]}
      />

      <CtaScene imageKey="kitchen">
        <div className="mx-auto max-w-2xl px-6 text-center text-white">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-dough-400">
              Cookie Dough Solutions
            </p>
          </Reveal>
          <Reveal delay={0.1} clip className="mt-4">
            <h2 className="font-display text-4xl font-extrabold">Ready to see Supplify?</h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-10">
            <a
              id="contact"
              href="mailto:hello@cookiedough.app"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-bold text-[#2d1654] transition hover:bg-dough-100"
            >
              hello@cookiedough.app
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </CtaScene>
    </>
  )
}
```

- [ ] **Step 2: Verify SupplifyPage**

Navigate to `/supplify`. Confirm:
- Page transition fires (fade from home)
- Hero headline lines animate in
- Pain-point list items stagger in on scroll
- Security section reveals in order
- CtaScene has parallax
- Email button arrow slides on hover

---

## Self-Review Against Spec

**Spec coverage check:**
- ✅ Custom cursor (spring, dot + ring, hover morph) → Task 3
- ✅ Grain overlay (fixed, SVG feTurbulence, opacity 0.04) → Task 2
- ✅ Page transitions (AnimatePresence mode="wait", fade+y) → Task 8
- ✅ Scroll reveals (Reveal component, clip + fade variants) → Task 4
- ✅ Mobile menu (full-screen, staggered links) → Task 8
- ✅ Hero parallax (useScroll + useTransform) → Task 9
- ✅ Hero redesign (big type, eyebrow, line-by-line reveal, ScrollIndicator) → Task 12
- ✅ Manifesto section (word-by-word) → Tasks 6, 12
- ✅ Products grid (ProductCard + ghost card) → Tasks 7, 12
- ✅ PillarSection reveals + float → Task 10
- ✅ StatBand reveals → Task 11
- ✅ SupplifyPage enhanced → Task 13
- ✅ CSS foundations (cursor:none, float keyframe) → Task 1
- ✅ `cursor: none` global — Task 1
- ✅ Nav hover indicator (underline dot) — Task 8

**Placeholder scan:** No TBDs, no "handle edge cases", all code blocks complete.

**Type consistency:** `MockVariant` imported in `ProductCard` from `./SupplifyMockup` — same path used by existing `MockupStage`. `Reveal` component uses `React.RefObject<Element>` cast for compatibility. All component names match across tasks.
