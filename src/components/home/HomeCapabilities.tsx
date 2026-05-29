import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Layers, Smartphone, Warehouse } from 'lucide-react'
import { useRef } from 'react'
import { HOME_WARM_PACK, type HomeWarmImageKey } from '../../data/cookie-dough-homepage'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'
import { Reveal } from '../Reveal'
import { HomeImage } from './HomeImage'

type Capability = {
  index: string
  category: string
  title: string
  lead: string
  body: string
  tags: readonly string[]
  imageKey: HomeWarmImageKey
  imageAlt: string
  icon: typeof Smartphone
}

const CAPABILITIES: Capability[] = [
  {
    index: '01',
    category: 'Front of house',
    title: 'Customer mobile & web apps',
    lead: 'Branded ordering, counter flows, and guest experiences — built for rush mode.',
    body: "We don't just design screens; we craft seamless, scalable flows for modifiers, split checks, and staff who cannot afford a manual.",
    tags: ['UX/UI', 'Web & mobile', 'Rush-mode POS', 'Modern design'],
    imageKey: 'pillarPOS',
    imageAlt: 'POS and ordering app built for hospitality rush mode',
    icon: Smartphone,
  },
  {
    index: '02',
    category: 'Back of house',
    title: 'Fulfilment & operations',
    lead: 'Full-stack ops for suppliers, stock, and dispatch — without the 200-screen ERP.',
    body: 'When ops live in WhatsApp and Excel, we ship focused tools that connect only as deep as you need. PDA-friendly, operator-first.',
    tags: ['Inventory', 'Dispatch', 'Mobile friendly', 'Ops excellence'],
    imageKey: 'pillarOps',
    imageAlt: 'Back of house operations — no ERP theater',
    icon: Warehouse,
  },
  {
    index: '03',
    category: 'Bespoke',
    title: 'Insights & bespoke systems',
    lead: 'When the problem is uniquely yours, off-the-shelf is a polite lie.',
    body: 'Franchise logic, odd approvals, legacy hardware — we architect from scratch or extend Supplify with actionable data at every touchpoint.',
    tags: ['Sales & KPIs', 'Custom workflows', 'Integrations', 'Franchise logic'],
    imageKey: 'pillarBespoke',
    imageAlt: 'Bespoke hospitality software built from scratch',
    icon: Layers,
  },
]

function CapabilityPanel({ cap, i }: { cap: Capability; i: number }) {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], [32, -32])
  const Icon = cap.icon

  return (
    <article
      ref={ref}
      id={`cap-${cap.index}`}
      className="relative scroll-mt-24 border-t border-ink/[0.08] py-14 sm:scroll-mt-28 sm:py-20 md:py-28"
    >
      <div className={`${h.container} grid items-center gap-8 sm:gap-12 lg:grid-cols-2 lg:gap-16 xl:gap-20`}>
        <motion.div className={i % 2 === 1 ? 'lg:order-2' : ''}>
          <motion.div
            className="ring-gradient surface-glow relative overflow-hidden rounded-xl border border-ink/[0.1] bg-paper/95 p-5 shadow-editorial sm:rounded-2xl sm:p-8 md:p-10 lg:p-11"
            initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-10%' }}
            transition={{ duration: 0.7, ease: h.ease }}
          >
            <div
              className="pointer-events-none absolute -right-6 -top-8 font-display text-[clamp(5rem,14vw,9rem)] font-bold leading-none tracking-[-0.05em] text-ink/[0.04]"
              aria-hidden
            >
              {cap.index}
            </div>

            <div className="relative flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-xl border border-chip/20 bg-chip/10 text-chip">
                <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-chip">
                  {cap.category}
                </p>
                <p className="font-mono text-xs text-ink/35">/{cap.index}</p>
              </div>
            </div>

            <h3 className={`relative mt-5 ${h.h3} sm:mt-6`}>
              {cap.title}
            </h3>
            <p className="relative mt-4 font-serif text-[clamp(1.05rem,1.6vw,1.2rem)] italic leading-[1.45] text-ink-muted">
              {cap.lead}
            </p>
            <p className="relative mt-4 font-sans text-[0.9375rem] leading-[1.72] text-ink-muted md:text-base">
              {cap.body}
            </p>

            <ul className="relative mt-8 flex flex-wrap gap-2" role="list">
              {cap.tags.map((tag, ti) => (
                <motion.li
                  key={tag}
                  initial={{ opacity: 0, y: 6 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.12 + ti * 0.04, duration: 0.4, ease: h.ease }}
                >
                  <span className="inline-flex cursor-default rounded-full border border-ink/10 bg-paper-warm/80 px-3.5 py-1.5 font-sans text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-muted transition-colors duration-200 hover:border-chip/25 hover:text-ink">
                    {tag}
                  </span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </motion.div>

        <motion.div
          style={reduced ? undefined : { y: imageY }}
          className={i % 2 === 1 ? 'lg:order-1' : ''}
        >
          <HomeImage
            src={HOME_WARM_PACK[cap.imageKey]}
            alt={cap.imageAlt}
            variant="default"
            animate={!reduced}
            className="transition-transform duration-500 hover:scale-[1.01]"
          />
        </motion.div>
      </div>
    </article>
  )
}

export function HomeCapabilities() {
  return (
    <section
      id="capabilities"
      className="section-noise relative overflow-hidden bg-paper-warm/60"
      aria-labelledby="capabilities-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-60"
        style={{
          background:
            'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(184,149,111,0.1) 0%, transparent 55%)',
        }}
        aria-hidden
      />

      <div className={`${h.container} relative pb-4 pt-16 sm:pb-6 sm:pt-24 md:pt-32 lg:pt-36`}>
        <div className="flex flex-col gap-8 sm:gap-10 lg:flex-row lg:items-end lg:justify-between lg:gap-16">
          <Reveal className="max-w-2xl">
            <p className={h.eyebrow}>What we build</p>
            <h2
              id="capabilities-heading"
              className={`${h.h2} mt-4 text-balance sm:mt-5 md:mt-6`}
            >
              Three ways we end the chaos.
            </h2>
            <p className={`${h.body} mt-4 max-w-xl sm:mt-5 md:mt-6`}>
              Organized systems for genuinely messy hospitality operations — front of house, back of
              house, and bespoke when off-the-shelf refuses to bend.
            </p>
          </Reveal>

          <Reveal delay={0.08} className="lg:shrink-0 lg:pb-1">
            <div className="flex flex-col items-start gap-4 lg:items-end">
              <a
                href="#contact"
                className={`${h.link} group inline-flex cursor-pointer items-center gap-2 rounded-full border border-ink/10 bg-paper/90 px-5 py-2.5 font-sans text-sm font-semibold text-ink shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:border-chip/30 hover:shadow-editorial`}
              >
                Start a project
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </a>
              <div className="flex flex-wrap gap-1.5 sm:gap-2 lg:justify-end" aria-label="Jump to capability">
                {CAPABILITIES.map((cap) => (
                  <a
                    key={cap.index}
                    href={`#cap-${cap.index}`}
                    className="inline-flex min-h-9 items-center gap-1 rounded-full border border-ink/[0.12] bg-paper/80 px-2.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-ink-muted transition-colors duration-200 hover:border-chip/35 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper-warm sm:gap-1.5 sm:px-3 sm:text-[11px] sm:tracking-[0.14em]"
                  >
                    <span className="font-mono text-[10px] text-chip/80">{cap.index}</span>
                    <span className="hidden min-[390px]:inline">{cap.category}</span>
                  </a>
                ))}
              </div>
            </div>
          </Reveal>
        </div>

        {/* Bento overview */}
        <Reveal delay={0.1} className="mt-10 sm:mt-14 md:mt-16">
          <div className="grid gap-3 sm:gap-4 md:grid-cols-3 md:gap-5">
            {CAPABILITIES.map((cap) => {
              const Icon = cap.icon
              return (
                <a
                  key={cap.index}
                  href={`#cap-${cap.index}`}
                  className="group ring-gradient relative flex cursor-pointer flex-col rounded-xl border border-ink/[0.1] bg-paper/90 p-5 shadow-sm transition-[border-color,box-shadow,transform] duration-200 hover:-translate-y-1 hover:border-chip/25 hover:shadow-editorial focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-chip focus-visible:ring-offset-2 focus-visible:ring-offset-paper-warm sm:rounded-2xl sm:p-6 md:p-7"
                >
                  <div className="flex items-start justify-between gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-lg border border-ink/10 bg-paper-warm text-chip transition-colors duration-200 group-hover:border-chip/20 group-hover:bg-chip/10">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="font-mono text-sm text-ink/30">{cap.index}</span>
                  </div>
                  <p className="mt-5 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-chip">
                    {cap.category}
                  </p>
                  <h3 className="mt-2 font-display text-lg font-bold leading-snug tracking-[-0.02em] text-ink transition-colors duration-200 group-hover:text-chip md:text-xl">
                    {cap.title}
                  </h3>
                  <p className="mt-3 flex-1 font-sans text-sm leading-relaxed text-ink-muted line-clamp-3">
                    {cap.lead}
                  </p>
                  <span className="mt-5 inline-flex items-center gap-1 font-sans text-xs font-semibold text-chip opacity-0 transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100">
                    View detail
                    <ArrowRight className="h-3.5 w-3.5" aria-hidden />
                  </span>
                </a>
              )
            })}
          </div>
        </Reveal>
      </div>

      {CAPABILITIES.map((cap, i) => (
        <CapabilityPanel key={cap.index} cap={cap} i={i} />
      ))}
    </section>
  )
}
