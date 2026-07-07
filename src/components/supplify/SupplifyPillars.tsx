import { motion } from 'framer-motion'
import { PRODUCT_PILLARS } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'
import { AtmosphereImage, ProductScreenshot, SupplifyEyebrow, SUPPLIFY_EASE } from './shared'

const PILLAR_BG = ['bg-supplify-mist', 'bg-supplify-cream', 'bg-supplify-mist', 'bg-supplify-cream'] as const

export function SupplifyPillars() {
  return (
    <section data-theme="light" className="border-t border-ink/8">
      <div className="mx-auto max-w-[90rem] bg-supplify-mist px-6 pt-section md:px-10 lg:px-14">
        <Reveal>
          <SupplifyEyebrow theme="light">Platform depth</SupplifyEyebrow>
          <div className="mt-8 max-w-3xl">
            <SplitText
              as="h2"
              by="word"
              text="Four operational layers. One live system."
              className="font-display text-display-md font-bold text-supplify-ink"
            />
          </div>
          <p className="mt-6 max-w-xl font-sans text-base leading-[1.75] text-ink-muted md:text-lg">
            Every layer exists because operators told us what broke — RFQ, reports, B2C ordering, and
            supplier ops depth built for rush mode on both sides of the market.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 space-y-0 pb-section md:pb-section-lg">
        {PRODUCT_PILLARS.map((pillar, i) => (
          <article
            key={pillar.index}
            data-theme="light"
            className={`relative mx-auto grid max-w-[90rem] items-center gap-12 px-6 py-section md:gap-16 lg:grid-cols-2 lg:px-14 ${PILLAR_BG[i]}`}
          >
            <Reveal delay={0.05} className={i % 2 === 1 ? 'lg:order-2' : ''}>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-supplify/70">
                {pillar.category}
              </p>
              <span
                className="mt-4 block font-display text-[clamp(3.5rem,10vw,7rem)] font-bold leading-none text-supplify/[0.08]"
                aria-hidden
              >
                {pillar.index}
              </span>
              <h3 className="mt-2 max-w-[16ch] font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.05] text-supplify-ink">
                {pillar.title}
              </h3>
              <p className="mt-6 max-w-md font-sans text-base leading-[1.75] text-ink-muted md:text-lg">
                {pillar.body}
              </p>
            </Reveal>

            <motion.div
              className={`relative ${i % 2 === 1 ? 'lg:order-1' : ''}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.9, ease: SUPPLIFY_EASE }}
            >
              <AtmosphereImage
                src={pillar.scene}
                position="center center"
                minHeight="min(52vh, 560px)"
                className="w-full"
                theme="light"
                overlay="from-supplify-cream/75 via-supplify-cream/25 to-transparent"
              />
              <motion.div
                className="pointer-events-none absolute bottom-5 right-5 w-[55%] max-w-[300px]"
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: 0.35, duration: 0.75, ease: SUPPLIFY_EASE }}
              >
                <ProductScreenshot src={pillar.ui} theme="light" glow />
              </motion.div>
            </motion.div>
          </article>
        ))}
      </div>
    </section>
  )
}
