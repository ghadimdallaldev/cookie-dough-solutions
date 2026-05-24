import { motion } from 'framer-motion'
import { PRODUCT_PILLARS } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'
import { AtmosphereImage, ProductScreenshot, SUPPLIFY_EASE } from './shared'

export function SupplifyPillars() {
  return (
    <section id="stories" className="border-t border-white/[0.06] bg-[#0a0812]">
      <div className="mx-auto max-w-[90rem] px-6 pt-section md:px-10 lg:px-14">
        <Reveal>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-supplify-light/80">
            Platform depth
          </p>
          <div className="mt-8 max-w-3xl">
            <SplitText
              as="h2"
              by="word"
              text="Four operational layers. One live system."
              className="font-display text-display-md font-bold text-paper"
            />
          </div>
          <p className="mt-6 max-w-xl font-sans text-base leading-[1.75] text-dough-200/85 md:text-lg">
            Every layer exists because operators told us what broke — safe, secure, and built for
            rush mode on both sides of the market.
          </p>
        </Reveal>
      </div>

      <div className="mt-20 space-y-section pb-section md:space-y-section-lg">
        {PRODUCT_PILLARS.map((pillar, i) => (
          <article
            key={pillar.index}
            className={`relative mx-auto grid max-w-[90rem] items-center gap-12 px-6 md:gap-16 lg:grid-cols-2 lg:px-14 ${
              i % 2 === 1 ? 'lg:[&>*:first-child]:order-2' : ''
            }`}
          >
            <Reveal delay={0.05}>
              <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-supplify-light/70">
                {pillar.category}
              </p>
              <span
                className="mt-4 block font-display text-[clamp(3.5rem,10vw,7rem)] font-bold leading-none text-white/[0.06]"
                aria-hidden
              >
                {pillar.index}
              </span>
              <h3 className="mt-2 max-w-[16ch] font-display text-[clamp(1.75rem,3.5vw,2.75rem)] font-bold leading-[1.05] text-paper">
                {pillar.title}
              </h3>
              <p className="mt-6 max-w-md font-sans text-base leading-[1.75] text-dough-200/90 md:text-lg">
                {pillar.body}
              </p>
            </Reveal>

            {/* Scene image with floating product UI overlay */}
            <motion.div
              className="relative"
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
              />
              {/* Floating product UI screenshot */}
              <motion.div
                className="pointer-events-none absolute bottom-5 right-5 w-[55%] max-w-[300px]"
                initial={{ opacity: 0, y: 16, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: '-10%' }}
                transition={{ delay: 0.35, duration: 0.75, ease: SUPPLIFY_EASE }}
              >
                <ProductScreenshot src={pillar.ui} glow />
              </motion.div>
            </motion.div>
          </article>
        ))}
      </div>
    </section>
  )
}
