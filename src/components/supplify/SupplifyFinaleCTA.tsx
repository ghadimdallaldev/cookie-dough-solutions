import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SUPPLIFY_PACK } from '../../data/supplify-cursor-pack'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'
import { ProductScreenshot, SupplifyPrimaryButton, SupplifySecondaryButton, SupplifyTextLink } from './shared'

export function SupplifyFinaleCTA() {
  const reduced = useReducedMotion()

  return (
    <section className="relative isolate overflow-hidden border-t border-supplify-border bg-supplify-cream py-24 md:py-32">
      <div className="pointer-events-none absolute inset-0 bg-supplify-hero opacity-80" aria-hidden />
      <div
        className="pointer-events-none absolute -right-24 top-0 h-96 w-96 rounded-full bg-supplify/8 blur-[100px]"
        aria-hidden
      />

      <div className="relative mx-auto flex max-w-[90rem] flex-col gap-16 px-6 md:flex-row md:items-end md:justify-between md:px-10 lg:px-14">
        <div className="max-w-2xl">
          <Reveal immediate>
            <SplitText
              as="h2"
              by="word"
              immediate
              text="A practical system for everyday hospitality problems."
              className="font-display text-display-lg font-bold text-supplify-ink"
            />
          </Reveal>
          <Reveal immediate delay={0.12} className="mt-8">
            <p className="max-w-xl font-sans text-base leading-[1.75] text-supplify-secondary md:text-lg">
              Book a walkthrough — see restaurant ↔ supplier ordering, recipe pricing, delivery
              tracking, invoicing, reorder assistance, live chat, and the full platform in action.
            </p>
          </Reveal>
          <Reveal immediate delay={0.22} className="mt-12 flex flex-wrap items-center gap-4">
            <SupplifyPrimaryButton href="mailto:hello@cookiedough.app" className="px-10 text-base">
              Request a walkthrough
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </SupplifyPrimaryButton>
            <SupplifySecondaryButton href="#screenshots">Browse all screens</SupplifySecondaryButton>
          </Reveal>
          <Reveal immediate delay={0.3} className="mt-6">
            <SupplifyTextLink href="mailto:hello@cookiedough.app">hello@cookiedough.app</SupplifyTextLink>
          </Reveal>
        </div>

        {!reduced && (
          <Reveal delay={0.15} className="hidden w-full max-w-md shrink-0 md:block lg:max-w-lg">
            <div className="relative">
              <ProductScreenshot
                src={SUPPLIFY_PACK.finale.optionalUI[0]}
                alt="Supplify delivery tracking and dispatch"
                glow
              />
              <motion.div
                className="absolute -bottom-6 -left-6 w-[55%]"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25, duration: 0.7 }}
              >
                <ProductScreenshot
                  src={SUPPLIFY_PACK.finale.optionalUI[1]}
                  alt="Supplify restaurant dashboard"
                  glow={false}
                />
              </motion.div>
            </div>
          </Reveal>
        )}
      </div>
    </section>
  )
}
