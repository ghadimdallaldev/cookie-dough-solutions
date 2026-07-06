import { motion, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ParentCompanyBadge } from '../Logo'
import { SupplifyLogo } from '../SupplifyLogo'
import { HeroScene } from '../HeroScene'
import { Reveal } from '../Reveal'
import { ScrollIndicator } from '../ScrollIndicator'
import { Magnetic } from '../motion/Magnetic'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { usePointerParallax } from '../../hooks/usePointerParallax'
import { ProductScreenshot, SupplifyEyebrow, SupplifyPrimaryButton, SupplifyTextLink, SUPPLIFY_EASE } from './shared'
import { SUPPLIFY_PACK } from '../../data/supplify-cursor-pack'

export function SupplifyHero() {
  const reduced = useReducedMotion()
  const { x: px, y: py } = usePointerParallax()

  // Layered depth: the cluster drifts a little, the front card more, the back
  // card the opposite way — closer things move further, like real parallax.
  const clusterX = useTransform(px, (v) => v * 8)
  const clusterY = useTransform(py, (v) => v * 6)
  const frontX = useTransform(px, (v) => v * 24)
  const frontY = useTransform(py, (v) => v * 16)
  const backX = useTransform(px, (v) => v * -18)
  const backY = useTransform(py, (v) => v * -12)

  return (
    <HeroScene
      tone="violet"
      brand="supplify"
      cinematic={false}
      showBackground={false}
      backgroundSrc=""
    >
      <div className="relative mx-auto flex min-h-svh max-w-[90rem] flex-col justify-end px-6 pb-24 pt-28 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:justify-normal lg:px-14 lg:pb-32 lg:pt-32">
        <div className="max-w-3xl lg:max-w-none">
          <Reveal immediate delay={0.05}>
            <div className="flex flex-col gap-5">
              <SupplifyLogo size={72} />
              <SupplifyEyebrow>Flagship · By Cookie Dough</SupplifyEyebrow>
            </div>
          </Reveal>

          <motion.div className="mt-8 space-y-1 md:space-y-2">
            {(['Everyday problems.', 'Not ordinary ERPs.'] as const).map((line, i) => (
              <motion.div key={line} className="overflow-hidden">
                <motion.h1
                  className={`text-balance text-display-lg text-paper ${
                    i === 1 ? 'font-serif font-normal italic' : 'font-display font-bold'
                  }`}
                  initial={{ y: '100%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 1.1, delay: 0.12 + i * 0.1, ease: SUPPLIFY_EASE }}
                >
                  {line}
                </motion.h1>
              </motion.div>
            ))}
          </motion.div>

          <Reveal immediate delay={0.5} className="mt-10 max-w-xl">
            <p className="font-sans text-lg leading-[1.75] text-[#e9d5ff]/95 md:text-xl">
              Supplify connects restaurants and suppliers in one operational flow.
            </p>
            <p className="mt-4 font-sans text-base leading-[1.75] text-[#e9d5ff]/80 md:text-lg">
              Orders, delivery, invoices, reorder reminders, and supplier relationships — without
              WhatsApp chaos. Built for restaurants, suppliers, kitchens, warehouses, drivers, and
              operators.
            </p>
          </Reveal>

          <Reveal immediate delay={0.58} className="mt-6 flex flex-wrap gap-3">
            {(['Restaurant ↔ Supplier', 'Built your way', 'Live order chat'] as const).map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-paper/90"
              >
                {badge}
              </span>
            ))}
          </Reveal>

          <Reveal immediate delay={0.65} className="mt-12 flex flex-wrap items-center gap-5">
            <Magnetic strength={0.22}>
              <SupplifyPrimaryButton href="#contact">
                Request a walkthrough
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </SupplifyPrimaryButton>
            </Magnetic>
            <SupplifyTextLink href="#ordering">How we fixed the chaos</SupplifyTextLink>
          </Reveal>

          <Reveal immediate delay={0.8} className="mt-10">
            <ParentCompanyBadge inverted />
          </Reveal>
        </div>

        {/* Hero product mockup — desktop */}
        <motion.div
          className="relative mt-16 hidden lg:mt-0 lg:block"
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.45, ease: SUPPLIFY_EASE }}
        >
          <motion.div
            className="relative mx-auto w-full max-w-[34rem]"
            style={reduced ? undefined : { x: clusterX, y: clusterY }}
          >
            <ProductScreenshot
              src={SUPPLIFY_PACK.hero.primaryUI}
              alt="Supplify restaurant dashboard — live procurement overview"
              glow
              priority
              className="relative z-10"
            />
            {/* Front card — parallax wrapper outside, entrance inside (no transform conflict) */}
            <motion.div
              className="absolute -bottom-8 -left-10 z-20 w-[52%]"
              style={reduced ? undefined : { x: frontX, y: frontY }}
            >
              <motion.div
                initial={{ opacity: 0, x: -20, y: 20 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.85, delay: 0.75, ease: SUPPLIFY_EASE }}
              >
                <ProductScreenshot
                  src={SUPPLIFY_PACK.hero.secondaryUI[0]}
                  alt="Supplify live supplier catalog"
                  glow={false}
                />
              </motion.div>
            </motion.div>
            {/* Back card — drifts opposite for depth */}
            <motion.div
              className="absolute -right-8 -top-6 z-20 w-[44%]"
              style={reduced ? undefined : { x: backX, y: backY }}
            >
              <motion.div
                initial={{ opacity: 0, x: 20, y: -16 }}
                animate={{ opacity: 1, x: 0, y: 0 }}
                transition={{ duration: 0.85, delay: 0.9, ease: SUPPLIFY_EASE }}
              >
                <ProductScreenshot
                  src={SUPPLIFY_PACK.hero.secondaryUI[1]}
                  alt="Supplify restaurant orders view"
                  glow={false}
                />
              </motion.div>
            </motion.div>
            {!reduced && (
              <motion.div
                className="pointer-events-none absolute -right-4 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-supplify/25 blur-[80px]"
                aria-hidden
                animate={{ opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </motion.div>
        </motion.div>

        {/* Hero product mockup — mobile / tablet */}
        <Reveal immediate delay={0.7} className="relative mt-12 lg:hidden">
          <ProductScreenshot
            src={SUPPLIFY_PACK.hero.primaryUI}
            alt="Supplify restaurant dashboard — live procurement overview"
            glow
            priority
          />
        </Reveal>
      </div>

      <ScrollIndicator />
    </HeroScene>
  )
}
