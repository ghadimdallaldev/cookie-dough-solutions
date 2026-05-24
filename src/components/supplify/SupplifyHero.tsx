import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { ParentCompanyBadge } from '../Logo'
import { HeroScene } from '../HeroScene'
import { Reveal } from '../Reveal'
import { ScrollIndicator } from '../ScrollIndicator'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ProductScreenshot, SupplifyEyebrow, SupplifyPrimaryButton, SupplifyTextLink, SUPPLIFY_EASE } from './shared'
import { SUPPLIFY_PACK } from '../../data/supplify-cursor-pack'

export function SupplifyHero() {
  const reduced = useReducedMotion()

  return (
    <HeroScene
      tone="violet"
      brand="supplify"
      cinematic
      backgroundSrc={SUPPLIFY_PACK.hero.scene}
      objectPosition="center center"
    >
      <div className="relative mx-auto flex min-h-svh max-w-[90rem] flex-col justify-end px-6 pb-24 pt-28 lg:grid lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-12 lg:justify-normal lg:px-14 lg:pb-32 lg:pt-32">
        <div className="max-w-3xl lg:max-w-none">
          <Reveal immediate delay={0.05}>
            <SupplifyEyebrow>Flagship · By Cookie Dough</SupplifyEyebrow>
          </Reveal>

          <motion.div className="mt-8 space-y-1 md:space-y-2">
            {(['Not your', "father's ERP."] as const).map((line, i) => (
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
              Restaurant ↔ supplier ordering — one live system. We fixed the chaos between both sides.
            </p>
            <p className="mt-4 font-sans text-base leading-[1.75] text-[#e9d5ff]/80 md:text-lg">
              Restaurants order from live catalogs. Suppliers pick, pack, and dispatch. Every message,
              attachment, and substitution on the same order thread — not lost in WhatsApp at midnight.
            </p>
          </Reveal>

          <Reveal immediate delay={0.58} className="mt-6 flex flex-wrap gap-3">
            {(['Restaurant ↔ Supplier', 'Chaos fixed', 'Live order chat'] as const).map((badge) => (
              <span
                key={badge}
                className="rounded-full border border-white/15 bg-white/[0.06] px-4 py-1.5 font-sans text-[11px] font-medium uppercase tracking-[0.2em] text-paper/90"
              >
                {badge}
              </span>
            ))}
          </Reveal>

          <Reveal immediate delay={0.65} className="mt-12 flex flex-wrap items-center gap-5">
            <SupplifyPrimaryButton href="#contact">
              Request a walkthrough
              <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
            </SupplifyPrimaryButton>
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
          <div className="relative mx-auto w-full max-w-[34rem]">
            <ProductScreenshot
              src={SUPPLIFY_PACK.hero.primaryUI}
              alt="Supplify restaurant dashboard — live procurement overview"
              glow
              priority
              className="relative z-10"
            />
            <motion.div
              className="absolute -bottom-8 -left-10 z-20 w-[52%]"
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
            <motion.div
              className="absolute -right-8 -top-6 z-20 w-[44%]"
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
            {!reduced && (
              <motion.div
                className="pointer-events-none absolute -right-4 top-1/2 h-48 w-48 -translate-y-1/2 rounded-full bg-supplify/25 blur-[80px]"
                aria-hidden
                animate={{ opacity: [0.35, 0.55, 0.35] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              />
            )}
          </div>
        </motion.div>
      </div>

      <ScrollIndicator />
    </HeroScene>
  )
}
