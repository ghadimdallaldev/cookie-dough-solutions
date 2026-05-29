import { motion } from 'framer-motion'
import { ArrowRight, Mail } from 'lucide-react'
import { HOME_WARM_PACK } from '../../data/cookie-dough-homepage'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'
import { StatNumber } from '../StatNumber'
import { SplitText } from '../motion/SplitText'
import { Reveal } from '../Reveal'
import { HomeImage } from './HomeImage'

const STATS = [
  { value: 14, suffix: '+', label: 'Supplify modules' },
  { value: 2, suffix: '', label: 'Sides of the market' },
  { value: 0, suffix: '', label: 'WhatsApp groups needed as ERPs' },
] as const

const MARKETS = ['Lebanon', 'UAE', 'Malta', 'Greece', 'Saudi Arabia'] as const
const CONTACT_PROMISES = [
  'Reply in one business day',
  'Practical roadmap, no jargon deck',
  'Clear scope before build',
] as const

const STAT_SIZE =
  'font-display text-[clamp(2.5rem,8vw,5.25rem)] font-extrabold leading-[0.92] tracking-[-0.04em] sm:text-[clamp(3rem,9vw,5.25rem)]'

export function HomeFinale() {
  const reduced = useReducedMotion()

  return (
    <>
      <section
        className={`${h.sectionBorder} relative scroll-section overflow-hidden bg-paper ${h.sectionXl}`}
        aria-labelledby="finale-about-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.55]"
          style={{
            background:
              'radial-gradient(ellipse 70% 50% at 100% 0%, rgba(184,149,111,0.12) 0%, transparent 55%), radial-gradient(ellipse 50% 40% at 0% 100%, rgba(239,231,219,0.9) 0%, transparent 60%)',
          }}
          aria-hidden
        />

        <div className={`${h.container} relative`}>
          {/* Header */}
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] lg:items-end lg:gap-16 xl:gap-24">
            <Reveal>
              <p className={h.eyebrow}>Success is more</p>
              <h2
                id="finale-about-heading"
                className={`${h.h2Serif} mt-4 max-w-[18ch] text-balance sm:mt-6 md:mt-8 md:max-w-[20ch] lg:max-w-[16ch] xl:max-w-[18ch]`}
              >
                Co-piloting the future of hospitality.
                <span className="text-chip" aria-hidden>
                  {' '}
                  ·
                </span>
              </h2>
            </Reveal>

            <Reveal delay={0.1} className="lg:flex lg:flex-col lg:items-end lg:pb-1">
              <a
                href="mailto:hello@cookiedough.app"
                className={`${h.link} group inline-flex max-w-full items-center gap-2 break-all font-display text-[clamp(1.125rem,2.5vw,1.75rem)] font-bold tracking-[-0.02em] text-chip transition-colors hover:text-ink sm:break-normal`}
              >
                <Mail
                  className="h-5 w-5 shrink-0 opacity-70 transition-opacity group-hover:opacity-100"
                  strokeWidth={1.75}
                  aria-hidden
                />
                hello@cookiedough.app
              </a>
              <p className="mt-3 font-sans text-sm leading-relaxed text-ink-muted lg:text-right md:text-base">
                Empowering operators since 2024.
              </p>
            </Reveal>
          </div>

          <div className="my-10 h-px w-full bg-ink/[0.08] sm:my-14 md:my-20 lg:my-24" aria-hidden />

          {/* Stats */}
          <div className="grid gap-10 sm:grid-cols-3 sm:gap-10 lg:gap-12 xl:gap-16">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                className="flex flex-col"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-8%' }}
                transition={{ delay: i * 0.1, duration: 0.65, ease: h.ease }}
              >
                <StatNumber
                  target={s.value}
                  suffix={s.suffix}
                  editorial
                  sizeClassName={STAT_SIZE}
                  valueClassName="text-ink"
                  suffixClassName="text-chip"
                />
                <p className="mt-4 max-w-[14ch] font-sans text-[11px] font-semibold uppercase leading-[1.45] tracking-[0.2em] text-ink-muted sm:max-w-none">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Markets — anchored under stats, generous wrap */}
          <Reveal delay={0.15} className="mt-10 sm:mt-14 md:mt-16 lg:mt-20">
            <p className="mb-4 font-sans text-[11px] font-semibold uppercase tracking-[0.22em] text-ink/45">
              Active markets
            </p>
            <ul className="flex flex-wrap gap-2.5 md:gap-3" role="list">
              {MARKETS.map((m, i) => (
                <motion.li
                  key={m}
                  initial={{ opacity: 0, y: 8 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.08 + i * 0.05, duration: 0.45, ease: h.ease }}
                >
                  <span className="inline-flex cursor-default items-center rounded-full border border-ink/[0.12] bg-paper/80 px-4 py-2 font-sans text-sm text-ink-muted shadow-[0_1px_0_rgba(27,23,20,0.04)] backdrop-blur-sm transition-[border-color,color,background-color,transform] duration-200 hover:border-chip/35 hover:bg-paper hover:text-ink">
                    {m}
                  </span>
                </motion.li>
              ))}
            </ul>
          </Reveal>
        </div>
      </section>

      <section
        id="contact"
        className={`${h.sectionBorder} section-noise relative min-h-0 overflow-hidden lg:min-h-[min(85vh,720px)]`}
      >
        <div className="grid min-h-[inherit] lg:grid-cols-2">
          <div className="relative min-h-[220px] sm:min-h-[280px] lg:min-h-full">
            <HomeImage
              src={HOME_WARM_PACK.finalCTA}
              alt="Warm Cookie Dough workspace — start a conversation"
              variant="full-bleed"
              animate={false}
              className="h-full"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-paper/90 lg:to-paper"
              aria-hidden
            />
          </div>

          <div className="relative flex flex-col justify-center bg-gradient-to-br from-paper-warm via-paper to-paper-deep px-5 py-12 sm:px-6 sm:py-16 md:px-10 md:py-20 lg:px-14">
            {!reduced && (
              <motion.div
                className="pointer-events-none absolute -left-8 top-1/2 h-40 w-40 -translate-y-1/2 rounded-full bg-dough-400/25 blur-[70px]"
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
                aria-hidden
              />
            )}

            <Reveal immediate>
              <p className={h.eyebrow}>Cookie Dough Solutions</p>
            </Reveal>
            <Reveal immediate delay={0.08} clip className="mt-6 sm:mt-8">
              <SplitText
                as="h2"
                by="word"
                immediate
                text="We've seen worse. Tell us anyway."
                className={`${h.h2} max-w-[16ch]`}
              />
            </Reveal>
            <Reveal immediate delay={0.16} className="mt-5">
              <p className={`${h.body} max-w-md`}>
                POS, ordering, ops — or just describe your current spreadsheet situation. We
                don&apos;t judge. (We&apos;ve seen the Excel files. We&apos;ve seen things.)
              </p>
            </Reveal>
            <Reveal immediate delay={0.2} className="mt-6">
              <ul className="space-y-2.5" role="list">
                {CONTACT_PROMISES.map((item) => (
                  <li key={item} className="flex items-center gap-2.5 font-sans text-sm text-ink-muted">
                    <span className="h-1.5 w-1.5 rounded-full bg-chip/75" aria-hidden />
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
            <Reveal immediate delay={0.24} className="mt-8 sm:mt-10">
              <div className={`${h.btnRow} items-stretch sm:items-center`}>
                <motion.a
                  href="mailto:hello@cookiedough.app"
                  data-cursor-hover
                  className={`${h.btnPrimary} group px-8 py-3.5`}
                  whileHover={reduced ? undefined : { scale: 1.04, y: -2 }}
                  whileTap={reduced ? undefined : { scale: 0.98 }}
                >
                  Let&apos;s fix this
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </motion.a>
                <a href="#capabilities" className={`${h.btnGhost} rounded-full border border-ink/10 px-5 py-2.5`}>
                  See capabilities
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
