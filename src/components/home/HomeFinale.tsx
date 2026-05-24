import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
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

export function HomeFinale() {
  const reduced = useReducedMotion()

  return (
    <>
      <section className={`${h.section} ${h.sectionBorder}`}>
        <div className={h.container}>
          <div className="grid gap-12 border-b border-ink/10 pb-14 lg:grid-cols-2 lg:items-end">
            <Reveal>
              <p className={h.eyebrow}>Success is more</p>
              <SplitText
                as="p"
                by="word"
                text="Co-piloting the future of hospitality."
                className={`${h.h2} mt-4 max-w-[14ch]`}
              />
            </Reveal>
            <Reveal delay={0.08} className="lg:text-right">
              <a
                href="mailto:hello@cookiedough.app"
                className={`${h.link} font-display text-xl font-bold text-chip hover:text-ink md:text-2xl`}
              >
                hello@cookiedough.app
              </a>
              <p className={`${h.body} mt-3`}>Empowering operators since 2024.</p>
            </Reveal>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-3">
            {STATS.map((s, i) => (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6, ease: h.ease }}
              >
                <StatNumber
                  target={s.value}
                  suffix={s.suffix}
                  editorial
                  valueClassName="text-ink"
                  suffixClassName="text-chip"
                />
                <p className="mt-2 font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-ink-muted">
                  {s.label}
                </p>
              </motion.div>
            ))}
          </div>

          <Reveal delay={0.12} className="mt-12 flex flex-wrap gap-2">
            {MARKETS.map((m, i) => (
              <motion.span
                key={m}
                className="cursor-default rounded-full border border-ink/10 bg-paper/90 px-4 py-2 font-sans text-sm text-ink-muted transition-[border-color,color,transform] duration-200 hover:border-chip/30 hover:text-ink"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.05 + i * 0.04, duration: 0.45, ease: h.ease }}
                whileHover={reduced ? undefined : { y: -2, borderColor: 'rgba(107,78,61,0.3)', color: '#1B1714' }}
              >
                {m}
              </motion.span>
            ))}
          </Reveal>
        </div>
      </section>

      {/* Full-bleed split contact — distinct from text-left sections */}
      <section
        id="contact"
        className={`${h.sectionBorder} relative min-h-[min(85vh,720px)] overflow-hidden`}
      >
        <div className="grid min-h-[inherit] lg:grid-cols-2">
          <div className="relative min-h-[280px] lg:min-h-full">
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

          <div className="relative flex flex-col justify-center bg-gradient-to-br from-paper-warm via-paper to-paper-deep px-6 py-16 md:px-10 md:py-20 lg:px-14">
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
            <Reveal immediate delay={0.08} clip className="mt-8">
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
            <Reveal immediate delay={0.24} className="mt-10">
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
            </Reveal>
          </div>
        </div>
      </section>
    </>
  )
}
