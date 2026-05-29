import { useRef } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import { ArrowRight, Globe2, HeartHandshake, Zap } from 'lucide-react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'
import { Reveal } from '../Reveal'
import { HomeOpsBento } from './HomeOpsBento'

const PAINS = [
  { text: 'The POS crashed. During the rush. Obviously.', tag: 'every saturday' },
  { text: 'Your supplier price list is a PDF. From last year.', tag: 'printed. manually re-entered.' },
  { text: 'Ops runs via WhatsApp group "URGENT"', tag: '847 unread' },
  { text: 'Your inventory system is one person who just knows.', tag: 'what if they leave?' },
  { text: 'Your ERP: feature request #847293 — open since 2023.', tag: 'still pending' },
] as const

const TRUST = [
  { icon: Globe2, label: '5 active markets', detail: 'MENA & Europe' },
  { icon: HeartHandshake, label: 'Operator-first', detail: 'Not vendor-first' },
  { icon: Zap, label: 'Rush-mode ready', detail: 'Saturday night tested' },
] as const

const MARKETS = ['Lebanon', 'UAE', 'Malta', 'Greece', 'KSA'] as const

function PainCard({
  pain,
  index: i,
  className = '',
}: {
  pain: (typeof PAINS)[number]
  index: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()
  const rotateX = useMotionValue(0)
  const rotateY = useMotionValue(0)
  const springRX = useSpring(rotateX, { stiffness: 200, damping: 26 })
  const springRY = useSpring(rotateY, { stiffness: 200, damping: 26 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reduced || !ref.current) return
    const rect = ref.current.getBoundingClientRect()
    rotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 6)
    rotateX.set(-((e.clientY - rect.top) / rect.height - 0.5) * 6)
  }

  const onMouseLeave = () => {
    rotateX.set(0)
    rotateY.set(0)
  }

  return (
    <motion.article
      ref={ref}
      className={`group relative flex h-full min-h-[7.5rem] flex-col justify-between overflow-hidden rounded-xl border border-ink/[0.1] bg-paper/95 p-4 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-chip/30 hover:shadow-editorial sm:min-h-[8.5rem] sm:rounded-2xl sm:p-5 md:p-6 ${className}`}
      style={
        reduced
          ? undefined
          : { rotateX: springRX, rotateY: springRY, transformPerspective: 900 }
      }
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.5, delay: i * 0.04, ease: h.ease }}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      <div
        className="pointer-events-none absolute inset-y-3 left-0 w-1 rounded-full bg-gradient-to-b from-dough-400 to-chip opacity-0 transition-opacity group-hover:opacity-100"
        aria-hidden
      />
      <p className="font-serif text-[1rem] italic leading-[1.5] text-ink-muted group-hover:text-ink md:text-[1.0625rem]">
        {pain.text}
      </p>
      <p className="mt-4 font-sans text-[10px] font-semibold uppercase tracking-[0.2em] text-chip/55 group-hover:text-chip">
        {pain.tag}
      </p>
    </motion.article>
  )
}

export function HomeWhoWeAre() {
  const reduced = useReducedMotion()

  return (
    <section
      id="who-we-are"
      className={`${h.sectionBorder} section-noise relative scroll-section overflow-x-clip bg-paper-warm/40 ${h.sectionSm}`}
      aria-labelledby="who-we-are-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-50"
        style={{
          background:
            'radial-gradient(ellipse 70% 50% at 50% 0%, rgba(184,149,111,0.12) 0%, transparent 55%)',
        }}
        aria-hidden
      />

      <div className={`${h.container} relative`}>
        <div className={`ring-gradient surface-glow overflow-hidden ${h.panel} border border-ink/[0.09] bg-paper shadow-editorial-lg ring-1 ring-ink/[0.04]`}>
          {/* Story — full width */}
          <div className={`border-b border-ink/[0.08] ${h.panelPad} lg:px-12`}>
            <Reveal>
              <p className={h.eyebrow}>Who we are</p>
              <h2
                id="who-we-are-heading"
                className={`${h.h2} mt-4 max-w-3xl text-balance sm:mt-5 md:mt-6`}
              >
                We&apos;ve seen your Excel file.{' '}
                <span className="font-serif font-normal italic text-chip">We&apos;re here to help.</span>
              </h2>
            </Reveal>
            <Reveal delay={0.08} className="mt-4 max-w-2xl sm:mt-5 md:mt-6">
              <p className={h.body}>
                Cookie Dough is a hospitality-native software studio — embedded in how restaurants
                and suppliers actually run. We ship POS and ordering apps, kill operational chaos,
                and build bespoke platforms when generic ERPs refuse to bend.
              </p>
            </Reveal>
          </div>

          {/* Trust + bento — equal-height columns, no dead zone */}
          <div className="grid lg:grid-cols-12 lg:items-stretch">
            <div className="flex flex-col justify-between gap-6 border-b border-ink/[0.08] px-5 py-6 sm:gap-8 sm:px-6 sm:py-8 md:px-10 lg:col-span-4 lg:border-b-0 lg:border-r lg:py-10">
              <Reveal delay={0.1}>
                <ul className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
                  {TRUST.map(({ icon: Icon, label, detail }) => (
                    <li
                      key={label}
                      className="surface-glow flex items-start gap-3 rounded-xl border border-ink/[0.08] bg-paper-warm/90 px-4 py-3.5"
                    >
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-chip/10 text-chip">
                        <Icon className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                      </span>
                      <span>
                        <span className="block font-sans text-sm font-semibold text-ink">{label}</span>
                        <span className="mt-0.5 block font-sans text-xs text-ink-muted">{detail}</span>
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <div className="space-y-6">
                <Reveal delay={0.14}>
                  <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-ink/45">
                    Where we work
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {MARKETS.map((m) => (
                      <span
                        key={m}
                        className="rounded-full border border-ink/10 bg-paper px-3 py-1 font-sans text-xs font-medium text-ink-muted"
                      >
                        {m}
                      </span>
                    ))}
                  </div>
                </Reveal>

                <Reveal delay={0.18} className={`${h.btnRow} flex-wrap items-center gap-3`}>
                  <motion.a
                    href="#contact"
                    className={`${h.btnPrimary} group`}
                    whileHover={reduced ? undefined : { scale: 1.03, y: -2 }}
                    whileTap={reduced ? undefined : { scale: 0.98 }}
                  >
                    Contact us
                    <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                  </motion.a>
                  <a href="#capabilities" className={`${h.btnGhost} cursor-pointer`}>
                    What we build
                  </a>
                </Reveal>
              </div>
            </div>

            <Reveal delay={0.12} className="bg-paper-warm/50 px-4 py-5 sm:px-6 sm:py-8 lg:col-span-8 lg:px-8">
              <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
                How we work in the rush
              </p>
              <HomeOpsBento />
            </Reveal>
          </div>

          {/* Pain points — tight grid, no masonry holes */}
          <div className="border-t border-ink/[0.08] px-5 py-8 sm:px-6 sm:py-10 md:px-10 md:py-12 lg:px-12">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div className="max-w-xl">
                <p className={h.eyebrow}>Sound familiar?</p>
                <p className="mt-3 font-display text-[clamp(1.35rem,2.5vw,1.75rem)] font-bold leading-snug tracking-[-0.02em] text-ink">
                  The chaos is universal. The fix doesn&apos;t have to be generic.
                </p>
              </div>
              <p className="max-w-xs font-sans text-sm leading-relaxed text-ink-muted md:text-right">
                Every operator we meet has a version of these stories.
              </p>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
              {PAINS.map((pain, i) => (
                <PainCard
                  key={pain.text}
                  pain={pain}
                  index={i}
                  className={i === PAINS.length - 1 ? 'lg:col-span-2' : ''}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
