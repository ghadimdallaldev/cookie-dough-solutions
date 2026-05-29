import { motion } from 'framer-motion'
import { ArrowRight, MapPin } from 'lucide-react'
import { HOME_WARM_PACK } from '../../data/cookie-dough-homepage'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'
import { StatNumber } from '../StatNumber'
import { Reveal } from '../Reveal'

type IntroStat = {
  target: number
  suffix: string
  label: string
  sub: string
  featured?: boolean
  accent?: boolean
}

const STATS: IntroStat[] = [
  {
    target: 14,
    suffix: '+',
    label: 'Supplify modules',
    sub: 'One live platform',
    featured: true,
  },
  {
    target: 65,
    suffix: '+',
    label: 'Businesses empowered',
    sub: 'Since 2024',
  },
  {
    target: 5,
    suffix: '',
    label: 'Active markets',
    sub: 'MENA & Europe',
  },
  {
    target: 0,
    suffix: '',
    label: 'WhatsApp ERPs',
    sub: 'Still required',
    accent: true,
  },
]

const MARKETS = ['Lebanon', 'UAE', 'Malta', 'Greece', 'KSA'] as const
const QUICK_FACTS = [
  'Typical go-live in weeks, not quarters',
  'Built with operators, not for slide decks',
  'Ownable systems with zero ERP lock-in',
] as const

function StatCard({
  stat,
  className = '',
  delay = 0,
}: {
  stat: IntroStat
  className?: string
  delay?: number
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border p-4 transition-[border-color,box-shadow] duration-200 sm:rounded-2xl sm:p-5 md:p-6 ${
        stat.featured
          ? 'border-chip/25 bg-gradient-to-br from-paper via-paper-warm to-dough-100/80 shadow-editorial'
          : stat.accent
            ? 'border-ink/10 bg-ink text-paper shadow-editorial-lg'
            : 'border-ink/[0.1] bg-paper/95 shadow-sm hover:border-chip/25 hover:shadow-editorial'
      } ${className}`}
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ delay, duration: 0.55, ease: h.ease }}
      whileHover={reduced ? undefined : { y: -3 }}
    >
      {stat.featured && (
        <div
          className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full bg-dough-300/40 blur-2xl"
          aria-hidden
        />
      )}
      <div className="relative">
        <StatNumber
          target={stat.target}
          suffix={stat.suffix}
          editorial
          sizeClassName="font-display text-[clamp(2rem,5vw,3.75rem)] font-extrabold leading-none tracking-[-0.04em] sm:text-[clamp(2.5rem,5vw,3.75rem)]"
          valueClassName={stat.accent ? 'text-paper' : 'text-ink'}
          suffixClassName={stat.accent ? 'text-dough-300' : 'text-chip'}
        />
        <p
          className={`mt-3 font-sans text-sm font-semibold leading-snug ${
            stat.accent ? 'text-paper' : 'text-ink'
          }`}
        >
          {stat.label}
        </p>
        <p
          className={`mt-1 font-sans text-xs leading-relaxed ${
            stat.accent ? 'text-paper/70' : 'text-ink-muted'
          }`}
        >
          {stat.sub}
        </p>
      </div>
    </motion.div>
  )
}

export function HomeIntro() {
  const reduced = useReducedMotion()

  return (
    <section
      id="intro"
      className={`${h.sectionBorder} section-noise relative scroll-section overflow-hidden bg-paper-warm/50 ${h.sectionSm}`}
      aria-labelledby="intro-heading"
    >
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            'radial-gradient(ellipse 90% 60% at 50% 0%, rgba(184,149,111,0.14) 0%, transparent 50%)',
        }}
        aria-hidden
      />

      <div className={`${h.container} relative`}>
        <div className={`ring-gradient surface-glow overflow-hidden ${h.panel} border border-ink/[0.09] bg-paper shadow-editorial-lg ring-1 ring-ink/[0.04]`}>
          {/* Panel header */}
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-ink/[0.08] px-5 py-4 sm:gap-4 sm:px-6 sm:py-5 md:px-10 md:py-6">
            <div className="flex items-center gap-2 sm:gap-2.5">
              <span className="h-2 w-2 shrink-0 rounded-full bg-emerald-500" aria-hidden />
              <p className={h.eyebrow}>Who we are</p>
            </div>
            <span className="rounded-full border border-chip/20 bg-chip/10 px-2.5 py-1 font-sans text-[10px] font-semibold uppercase tracking-[0.12em] text-chip sm:px-3 sm:text-[11px] sm:tracking-[0.16em]">
              <span className="sm:hidden">Since 2024</span>
              <span className="hidden sm:inline">Empowering operators since 2024</span>
            </span>
          </div>

          <div className="grid lg:grid-cols-2 lg:divide-x lg:divide-ink/[0.08]">
            {/* Copy column */}
            <div className={h.panelPadLg}>
              <Reveal>
                <h2
                  id="intro-heading"
                  className={`${h.h2} max-w-[18ch] sm:max-w-none`}
                >
                  The hospitality tech partner operators{' '}
                  <span className="block font-serif text-[0.92em] font-normal italic leading-[1.12] text-chip sm:inline">
                    actually call back.
                  </span>
                </h2>
              </Reveal>

              <Reveal delay={0.08} className="mt-5 sm:mt-6 md:mt-8">
                <p className={`${h.bodyLg} max-w-lg`}>
                  Trusted across Lebanon, UAE, Malta, Greece, and KSA — we combine deep industry
                  expertise with software that survives a Saturday rush. POS, ordering, supplier
                  ops, and bespoke platforms when off-the-shelf refuses to bend.
                </p>
              </Reveal>

              <Reveal delay={0.12} className="mt-6">
                <p className="flex flex-wrap items-center gap-x-2 gap-y-1 font-sans text-sm text-ink-muted">
                  <MapPin className="h-4 w-4 shrink-0 text-chip" strokeWidth={1.75} aria-hidden />
                  {MARKETS.map((m, i) => (
                    <span key={m}>
                      <span className="font-medium text-ink/80">{m}</span>
                      {i < MARKETS.length - 1 ? (
                        <span className="mx-1 text-ink/25" aria-hidden>
                          ·
                        </span>
                      ) : null}
                    </span>
                  ))}
                </p>
              </Reveal>

              <Reveal delay={0.14} className="mt-4 sm:mt-5">
                <ul className="flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-2.5" role="list">
                  {QUICK_FACTS.map((fact) => (
                    <li key={fact}>
                      <span className="inline-flex w-full rounded-full border border-ink/[0.1] bg-paper-warm/85 px-3 py-1.5 font-sans text-[10px] font-medium leading-snug text-ink-muted sm:w-auto sm:text-[11px] sm:font-semibold sm:tracking-[0.01em]">
                        {fact}
                      </span>
                    </li>
                  ))}
                </ul>
              </Reveal>

              <Reveal delay={0.16} className={`${h.btnRow} mt-8 sm:mt-10`}>
                <motion.a
                  href="#contact"
                  className={`${h.btnPrimary} group`}
                  whileHover={reduced ? undefined : { scale: 1.03, y: -2 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                >
                  Contact us
                  <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </motion.a>
                <a href="#who-we-are" className={`${h.btnGhost} cursor-pointer`}>
                  Our story
                </a>
              </Reveal>
            </div>

            {/* Stats + visual column */}
            <div className="border-t border-ink/[0.08] bg-paper-warm/40 px-5 py-6 sm:px-6 sm:py-8 md:px-8 md:py-10 lg:border-t-0 lg:py-10">
              <div className="grid grid-cols-2 gap-2.5 sm:gap-3 md:gap-4">
                <StatCard stat={STATS[0]} className="row-span-2 min-h-[168px] sm:min-h-[200px] md:min-h-[220px]" delay={0.05} />
                <StatCard stat={STATS[1]} delay={0.1} />
                <StatCard stat={STATS[2]} delay={0.14} />

                <motion.div
                  className="surface-glow relative col-span-2 overflow-hidden rounded-2xl border border-ink/[0.1]"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.18, duration: 0.6, ease: h.ease }}
                >
                  <img
                    src={HOME_WARM_PACK.sceneRestaurant}
                    alt="Restaurant team during service rush"
                    width={800}
                    height={280}
                    loading="lazy"
                    decoding="async"
                    className="block h-[140px] w-full object-cover object-center transition-transform duration-700 hover:scale-[1.03] sm:h-[min(28vw,200px)] md:h-[180px]"
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-ink/50 via-ink/10 to-transparent"
                    aria-hidden
                  />
                  <p className="absolute bottom-3 left-4 right-4 font-sans text-[11px] font-semibold uppercase tracking-[0.2em] text-paper">
                    Built for Saturday night
                  </p>
                </motion.div>

                <StatCard stat={STATS[3]} className="col-span-2" delay={0.22} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
