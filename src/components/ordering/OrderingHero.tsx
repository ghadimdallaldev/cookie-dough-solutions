import { motion, useTransform } from 'framer-motion'
import { ExternalLink, TrendingDown } from 'lucide-react'
import { Reveal } from '../Reveal'
import { ScrollIndicator } from '../ScrollIndicator'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { usePointerParallax } from '../../hooks/usePointerParallax'
import { ORDERING_HERO_COPY, ORDERING_HIGHLIGHTS } from '../../data/ordering-app-content'
import { ORDERING_APP_DEMO_URL, ORDERING_APP_PACK, ORDERING_APP_UI } from '../../data/ordering-app-pack'
import { OrderingProductScreenshot } from './OrderingProductScreenshot'
import {
  ORDERING_EASE,
  OrderingBackLink,
  OrderingCtaRow,
  OrderingEyebrow,
  OrderingFlowStrip,
  OrderingGlowOrb,
  OrderingMarqueeRule,
  OrderingStat,
  OrderingTrustStrip,
} from './shared'

export function OrderingHero() {
  const reduced = useReducedMotion()
  const { x: px, y: py } = usePointerParallax()
  const shotX = useTransform(px, (v) => v * 10)
  const shotY = useTransform(py, (v) => v * 7)
  const badgeX = useTransform(px, (v) => v * 26)
  const badgeY = useTransform(py, (v) => v * 18)

  return (
    <section className="ordering-hero relative min-h-svh overflow-hidden bg-oapp-ink">
      <div className="ordering-hero-grain pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-oapp-mesh" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-oapp-hero-glow" aria-hidden />
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.18] mix-blend-luminosity"
        style={{ backgroundImage: `url(${ORDERING_APP_PACK.hero})` }}
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-oapp-ink/20 via-oapp-ink/92 to-oapp-deep"
        aria-hidden
      />

      <OrderingGlowOrb className="-right-24 top-[10%] h-[24rem] w-[24rem] bg-oapp-tomato/20" />
      <OrderingGlowOrb className="-left-20 bottom-[15%] h-72 w-72 bg-oapp-gold/15" delay={1.5} />

      <div className="relative mx-auto max-w-[90rem] px-6 pb-24 pt-28 md:pb-32 md:pt-36 lg:px-10">
        <Reveal immediate>
          <OrderingBackLink />
        </Reveal>

        <Reveal immediate delay={0.04} className="mt-8">
          <OrderingTrustStrip />
        </Reveal>

        <div className="mt-12 grid gap-14 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:items-center lg:gap-16 xl:gap-20">
          <div>
            <Reveal immediate>
              <OrderingEyebrow>{ORDERING_HERO_COPY.eyebrow}</OrderingEyebrow>
            </Reveal>

            <div className="mt-6 space-y-0.5 md:mt-8">
              {(['Your menu. Your prices.', 'No marketplace markup.'] as const).map((line, i) => (
                <motion.div key={line} className="overflow-hidden">
                  <motion.h1
                    className={`text-balance leading-[1.02] tracking-[-0.02em] ${
                      i === 1
                        ? 'font-oapp-display text-[clamp(2rem,5vw,3.65rem)] font-normal italic text-oapp-gold-light'
                        : 'font-oapp-display text-[clamp(2.5rem,6vw,4.75rem)] font-bold text-oapp-cream'
                    }`}
                    initial={reduced ? false : { y: '110%' }}
                    animate={reduced ? undefined : { y: 0 }}
                    transition={{ duration: 1, delay: 0.08 + i * 0.1, ease: ORDERING_EASE }}
                  >
                    {line}
                  </motion.h1>
                </motion.div>
              ))}
            </div>

            <Reveal delay={0.22}>
              <p className="mt-8 max-w-xl font-oapp-body text-lg leading-[1.75] text-oapp-muted md:text-xl">
                {ORDERING_HERO_COPY.lead}
              </p>
            </Reveal>

            <Reveal delay={0.28}>
              <span className="mt-6 inline-flex items-center gap-2 rounded-full border border-oapp-tomato/25 bg-oapp-tomato/10 px-4 py-2 font-oapp-body text-[10px] font-bold uppercase tracking-[0.2em] text-oapp-cream/80">
                <span className="h-1.5 w-1.5 rounded-full bg-oapp-tomato" aria-hidden />
                {ORDERING_HERO_COPY.badge}
              </span>
            </Reveal>

            <Reveal delay={0.34} className="mt-8">
              <OrderingFlowStrip activeIndex={0} />
            </Reveal>

            <Reveal delay={0.38}>
              <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
                {ORDERING_HIGHLIGHTS.map((stat) => (
                  <OrderingStat key={stat.label} {...stat} />
                ))}
              </ul>
            </Reveal>

            <Reveal delay={0.44} className="mt-10">
              <OrderingCtaRow
                demoUrl={ORDERING_APP_DEMO_URL || undefined}
                primaryLabel="Talk about your app"
              />
              {ORDERING_APP_DEMO_URL ? (
                <p className="mt-3 flex items-center gap-1 font-oapp-body text-xs text-oapp-muted">
                  <ExternalLink className="h-3 w-3 shrink-0 opacity-70" aria-hidden />
                  Opens a live sample build
                </p>
              ) : null}
            </Reveal>
          </div>

          <Reveal immediate delay={0.12} className="relative lg:justify-self-end">
            <div className="relative mx-auto w-full max-w-[36rem]">
              <motion.div style={reduced ? undefined : { x: shotX, y: shotY }}>
                <OrderingProductScreenshot
                  src={ORDERING_APP_UI.menu}
                  alt="Full menu on a branded ordering app"
                  fit="cover"
                  priority
                  step="01 · Menu"
                  tilt
                  variant="desktop"
                />
              </motion.div>

              {/* Floating value-prop accent — drifts further than the screen for depth */}
              <motion.div
                className="absolute -left-3 top-10 z-20 hidden sm:block lg:-left-7"
                style={reduced ? undefined : { x: badgeX, y: badgeY }}
              >
                <motion.div
                  className="rounded-2xl border border-oapp-gold/35 bg-oapp-deep/95 px-5 py-4 shadow-oapp-glow backdrop-blur-md"
                  initial={reduced ? false : { opacity: 0, y: 14, scale: 0.96 }}
                  animate={reduced ? undefined : { opacity: 1, y: 0, scale: 1 }}
                  transition={{ duration: 0.7, delay: 0.55, ease: ORDERING_EASE }}
                >
                  <div className="flex items-center gap-2 text-oapp-gold-light">
                    <TrendingDown className="h-4 w-4" strokeWidth={2} aria-hidden />
                    <span className="font-oapp-body text-[10px] font-bold uppercase tracking-[0.2em]">
                      Marketplace cut
                    </span>
                  </div>
                  <p className="mt-1 font-oapp-display text-3xl font-bold leading-none text-oapp-cream">
                    0%
                  </p>
                </motion.div>
              </motion.div>

              <a
                href="#screenshots"
                className="group mt-6 inline-flex cursor-pointer items-center gap-2 font-oapp-body text-sm font-semibold text-oapp-gold-light transition-colors duration-200 hover:text-oapp-cream"
              >
                <span
                  className="h-px w-8 bg-oapp-gold/60 transition-[width] duration-200 group-hover:w-12"
                  aria-hidden
                />
                Walk the full order flow
                <span className="transition-transform duration-200 group-hover:translate-y-0.5" aria-hidden>
                  ↓
                </span>
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <OrderingMarqueeRule />
      <ScrollIndicator />
    </section>
  )
}
