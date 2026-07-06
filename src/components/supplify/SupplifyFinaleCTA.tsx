import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { SUPPLIFY_PACK } from '../../data/supplify-cursor-pack'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'
import { ProductScreenshot, SupplifyPrimaryButton, SupplifyTextLink } from './shared'

export function SupplifyFinaleCTA() {
  const reduced = useReducedMotion()

  return (
    <section
      id="contact"
      className="relative isolate min-h-[min(88vh,820px)] overflow-hidden border-t border-white/[0.06] bg-[#0a0812]"
    >
      <div className="pointer-events-none absolute inset-0 bg-supplify-mesh opacity-40" aria-hidden />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0f0620]/85 via-[#0f0620]/70 to-[#0a0812]/95" />
      <div className="pointer-events-none absolute inset-0 opacity-[0.06] supplify-grain" aria-hidden />

      {!reduced && (
        <>
          <motion.div
            className="pointer-events-none absolute left-[-15%] top-[10%] h-[600px] w-[600px] rounded-full bg-supplify/20 blur-[120px]"
            aria-hidden
            animate={{ scale: [1, 1.12, 1], opacity: [0.5, 0.75, 0.5] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="pointer-events-none absolute right-[-10%] top-[30%] h-[500px] w-[500px] rounded-full bg-supplify-light/15 blur-[100px]"
            aria-hidden
            animate={{ scale: [1, 1.08, 1], opacity: [0.4, 0.65, 0.4] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
          />
        </>
      )}

      <div className="relative mx-auto flex max-w-[90rem] flex-col gap-16 px-6 py-24 md:flex-row md:items-end md:justify-between md:px-10 lg:px-14 lg:py-32">
        <div className="max-w-2xl">
          <Reveal immediate>
            <SplitText
              as="h2"
              by="word"
              immediate
              text="A practical system for everyday hospitality problems."
              className="font-display text-display-lg font-bold text-paper"
            />
          </Reveal>
          <Reveal immediate delay={0.12} className="mt-8">
            <p className="max-w-xl font-sans text-base leading-[1.75] text-dough-200/90 md:text-lg">
              Book a walkthrough — see restaurant ↔ supplier ordering, delivery tracking, invoicing,
              reorder assistance, live chat, and the full platform in action. Built your way, not
              bolted onto a generic ERP.
            </p>
          </Reveal>
          <Reveal immediate delay={0.22} className="mt-12 flex flex-wrap items-center gap-5">
            <SupplifyPrimaryButton href="mailto:hello@cookiedough.app" className="px-10 text-base">
              Request a walkthrough
              <ArrowRight className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1" />
            </SupplifyPrimaryButton>
            <SupplifyTextLink href="#screenshots">Browse all screens</SupplifyTextLink>
          </Reveal>
          <Reveal immediate delay={0.3} className="mt-6">
            <a
              href="mailto:hello@cookiedough.app"
              className="cursor-pointer font-sans text-sm text-dough-300/80 transition-colors duration-200 hover:text-paper focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify-light/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0812]"
            >
              hello@cookiedough.app
            </a>
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
