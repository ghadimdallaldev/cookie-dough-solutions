import { AnimatePresence, motion } from 'framer-motion'
import {
  ArrowRight,
  ArrowRightLeft,
  Calendar,
  MessageSquare,
  Package,
  ShoppingCart,
  Truck,
  Users,
  Warehouse,
  X,
} from 'lucide-react'
import { useCallback, useState } from 'react'
import { Link } from 'react-router-dom'
import { SUPPLIFY_PACK } from '../../data/supplify-cursor-pack'
import { ProductScreenshot } from '../supplify/shared'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'
import { Reveal } from '../Reveal'
import { SupplifyLogo } from '../SupplifyLogo'

const BEFORE = [
  'WhatsApp at midnight: "did you see my order?"',
  'PDF price lists from 2022, printed, re-entered by hand',
  '"Should arrive tomorrow" (narrator: it didn\'t)',
  'Supplier confusion on both sides of every order',
] as const

const AFTER = [
  'Live catalogs and standing orders, no messages required',
  'Centralized procurement that actually centralizes',
  'Dispatch visibility end to end — tracked, confirmed, done',
  'In-app chat with full order context (not a WhatsApp group)',
] as const

const HIGHLIGHTS = [
  { value: '14+', label: 'Live modules' },
  { value: '2', label: 'Sides of the market' },
  { value: '5', label: 'Active regions' },
] as const

const MODULES = [
  { icon: Package, label: 'Catalogs' },
  { icon: ShoppingCart, label: 'Ordering' },
  { icon: Warehouse, label: 'Inventory' },
  { icon: Truck, label: 'Dispatch' },
  { icon: MessageSquare, label: 'Order chat' },
  { icon: Calendar, label: 'Reservations' },
  { icon: Users, label: 'Staff' },
  { icon: ArrowRightLeft, label: 'Disputes' },
] as const

const AUDIENCE = [
  {
    id: 'restaurant' as const,
    label: 'Restaurant',
    blurb: 'Procurement, receiving, and rush-mode ordering.',
    screen: SUPPLIFY_PACK.ui.restaurantDashboard,
    alt: 'Supplify restaurant dashboard',
  },
  {
    id: 'supplier' as const,
    label: 'Supplier',
    blurb: 'Fulfillment, dispatch, and customer ops in one queue.',
    screen: SUPPLIFY_PACK.ui.supplierFulfillment,
    alt: 'Supplify supplier fulfillment and dispatch',
  },
] as const

type AudienceId = (typeof AUDIENCE)[number]['id']

const EASE = h.ease

export function HomeSupplifyTeaser() {
  const reduced = useReducedMotion()
  const [audience, setAudience] = useState<AudienceId>('restaurant')
  const active = AUDIENCE.find((a) => a.id === audience) ?? AUDIENCE[0]
  const activeIndex = AUDIENCE.findIndex((a) => a.id === audience)
  const panelId = 'supplify-preview-panel'

  const onAudienceKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
      e.preventDefault()
      const delta = e.key === 'ArrowRight' ? 1 : -1
      const next = (activeIndex + delta + AUDIENCE.length) % AUDIENCE.length
      setAudience(AUDIENCE[next].id)
    },
    [activeIndex],
  )

  return (
    <section
      id="supplify"
      className={`section-noise relative scroll-section overflow-hidden border-t border-white/[0.08] bg-[#0a0812] text-paper ${h.sectionXl}`}
      aria-labelledby="supplify-heading"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-supplify-light/30 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.55) 1px, transparent 1px)',
          backgroundSize: '32px 32px',
        }}
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-0 bg-supplify-mesh opacity-40" aria-hidden />
      <motion.div
        className="pointer-events-none absolute -left-24 top-[20%] h-72 w-72 rounded-full bg-supplify/25 blur-[110px]"
        animate={reduced ? undefined : { scale: [1, 1.15, 1], opacity: [0.25, 0.45, 0.25] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-[10%] h-64 w-64 rounded-full bg-[#7c3aed]/20 blur-[100px]"
        animate={reduced ? undefined : { scale: [1, 1.2, 1], opacity: [0.2, 0.4, 0.2] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        aria-hidden
      />

      <div className={`${h.container} relative z-10`}>
        {/* Hero row */}
        <div className="grid gap-10 sm:gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16 xl:gap-20">
          <div>
            <SupplifyLogo size={56} className="mb-6" />

            <div className="inline-flex items-center gap-2 rounded-full border border-supplify-light/25 bg-white/[0.04] px-2.5 py-1 sm:px-3 sm:py-1.5">
              <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-supplify-light motion-safe:animate-pulse" aria-hidden />
              <span className="font-sans text-[10px] font-semibold uppercase tracking-[0.22em] text-supplify-light sm:text-[11px] sm:tracking-[0.28em]">
                Flagship product
              </span>
            </div>

            <h2
              id="supplify-heading"
              className={`${h.h2} mt-5 text-paper text-balance sm:mt-6 md:mt-8`}
            >
              Supplify fixed the part nobody talks about.
            </h2>

            <p className={`${h.bodyLg} mt-4 max-w-xl text-dough-200/90 sm:mt-5 md:mt-6`}>
              Procurement, reservations, fulfillment, dispatch, and chat — one live system for both
              sides of the market. Yes, it actually works. No, it&apos;s not WhatsApp.
            </p>

            <p className="mt-3 inline-flex rounded-full border border-supplify-light/25 bg-white/[0.04] px-3 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-dough-300/75 sm:mt-4 sm:px-3.5 sm:py-1.5 sm:text-[11px] sm:tracking-[0.18em]">
              Multi-market product, not a one-off dashboard
            </p>

            <ul className="mt-6 grid grid-cols-3 gap-3 border-y border-white/[0.08] py-5 sm:mt-8 sm:flex sm:flex-wrap sm:gap-8 sm:py-6 md:gap-12">
              {HIGHLIGHTS.map(({ value, label }) => (
                <li key={label} className="text-center sm:text-left">
                  <p className="font-display text-2xl font-bold tracking-[-0.03em] text-paper sm:text-3xl md:text-4xl">
                    {value}
                  </p>
                  <p className="mt-1 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-dough-300/70 sm:text-[11px] sm:tracking-[0.18em]">
                    {label}
                  </p>
                </li>
              ))}
            </ul>

            <div className={`${h.btnRow} mt-6 sm:mt-8`}>
              <Link
                to="/supplify"
                className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-paper px-7 py-3 font-sans text-sm font-semibold text-[#2d1654] shadow-supplify-glow transition-[box-shadow,transform] duration-200 hover:shadow-[0_0_48px_rgba(139,124,255,0.4)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify-light focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0812] sm:min-h-0 sm:w-auto"
              >
                Explore Supplify
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              <a
                href="#contact"
                className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 font-sans text-sm font-semibold text-paper/75 transition-colors duration-200 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify-light/60 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0812] sm:min-h-0 sm:w-auto sm:justify-start"
              >
                Book a walkthrough
              </a>
            </div>
          </div>

          {/* Product preview */}
          <Reveal delay={0.1} className="lg:justify-self-end">
            <div className="frost-panel ring-gradient rounded-xl border border-white/[0.1] bg-white/[0.03] p-3 shadow-[0_32px_80px_-24px_rgba(0,0,0,0.65)] backdrop-blur-sm sm:rounded-2xl sm:p-4 md:p-5">
              <div
                role="tablist"
                aria-label="Preview audience"
                onKeyDown={onAudienceKeyDown}
                className="mb-4 inline-flex rounded-full border border-white/10 bg-[#0f0620]/80 p-1"
              >
                {AUDIENCE.map(({ id, label }, i) => {
                  const selected = audience === id
                  return (
                    <button
                      key={id}
                      type="button"
                      role="tab"
                      id={`supplify-tab-${id}`}
                      aria-controls={panelId}
                      aria-selected={selected}
                      tabIndex={selected ? 0 : -1}
                      onClick={() => setAudience(id)}
                      className={`relative cursor-pointer rounded-full px-4 py-2 font-sans text-sm font-semibold transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify-light/70 ${
                        selected ? 'text-[#2d1654]' : 'text-paper/65 hover:text-paper'
                      }`}
                    >
                      {selected && (
                        <motion.span
                          layoutId="home-supplify-audience"
                          className="absolute inset-0 rounded-full bg-paper shadow-supplify-glow"
                          transition={{ duration: 0.25, ease: EASE }}
                        />
                      )}
                      <span className="relative z-10">{label}</span>
                      <span className="sr-only"> ({i + 1} of {AUDIENCE.length})</span>
                    </button>
                  )
                })}
              </div>

              <p className="mb-4 font-sans text-sm text-dough-300/85">{active.blurb}</p>

              <AnimatePresence mode="wait">
                <motion.div
                  key={active.id}
                  initial={reduced ? false : { opacity: 0, y: 12 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0 }}
                  exit={reduced ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: EASE }}
                  role="tabpanel"
                  id={panelId}
                  aria-labelledby={`supplify-tab-${active.id}`}
                >
                  <ProductScreenshot src={active.screen} alt={active.alt} priority={false} />
                </motion.div>
              </AnimatePresence>
            </div>
          </Reveal>
        </div>

        {/* Module strip */}
        <Reveal delay={0.12} className="mt-12 sm:mt-16 md:mt-20">
          <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-dough-300/60">
            What&apos;s inside
          </p>
          <ul className="mt-4 flex flex-wrap gap-2.5 md:gap-3">
            {MODULES.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="inline-flex cursor-default items-center gap-2 rounded-full border border-white/[0.1] bg-white/[0.04] px-3.5 py-2 font-sans text-sm text-paper/85 transition-colors duration-200 hover:border-supplify-light/30 hover:bg-white/[0.07]">
                  <Icon className="h-4 w-4 shrink-0 text-supplify-light" strokeWidth={1.75} aria-hidden />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Before / After */}
        <div className="mt-12 grid gap-5 sm:mt-16 sm:gap-6 md:mt-20 md:grid-cols-2 md:gap-8">
          <motion.article
            className="rounded-xl border border-red-400/15 bg-red-950/20 p-5 sm:rounded-2xl sm:p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-red-300/70">
              Before
            </p>
            <ul className="mt-5 space-y-4">
              {BEFORE.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-sans text-[0.9375rem] leading-[1.55] text-dough-300/60 line-through decoration-red-400/35 md:text-base"
                >
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/50" strokeWidth={2} aria-hidden />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>

          <motion.article
            className="rounded-xl border border-supplify-light/25 bg-gradient-to-br from-[#1a1035]/80 to-[#120a22]/90 p-5 shadow-[0_0_40px_rgba(109,94,247,0.12)] sm:rounded-2xl sm:p-6 md:p-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.6, delay: 0.08, ease: EASE }}
          >
            <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-supplify-light">
              After Supplify
            </p>
            <ul className="mt-5 space-y-4">
              {AFTER.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 font-sans text-[0.9375rem] leading-[1.55] text-paper md:text-base"
                >
                  <span
                    className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-supplify-light"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </motion.article>
        </div>

        {/* Scene band */}
        <Reveal delay={0.1} className="mt-10 sm:mt-14 md:mt-16">
          <div className="relative overflow-hidden rounded-xl border border-white/[0.1] ring-1 ring-white/[0.05] sm:rounded-2xl">
            <img
              src={SUPPLIFY_PACK.split.restaurantScene}
              alt="Restaurant and supplier operators — the humans Supplify is built for"
              width={1400}
              height={520}
              loading="lazy"
              decoding="async"
              className="block h-auto max-h-[min(42vh,400px)] w-full object-cover object-center"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#0a0812] via-[#0a0812]/40 to-transparent"
              aria-hidden
            />
            <p className="absolute bottom-4 left-4 right-4 max-w-lg font-serif text-base italic leading-snug text-paper/90 sm:bottom-5 sm:left-5 sm:text-lg md:bottom-8 md:left-8 md:text-xl">
              Built for operators who cannot afford a second guess during Saturday night.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
