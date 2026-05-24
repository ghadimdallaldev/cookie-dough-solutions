import { motion } from 'framer-motion'
import { SUPPLIFY_PACK, TIMELINE_EVENTS } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'
import { ProductScreenshot, SUPPLIFY_EASE } from './shared'

function TimelineNode({ event, index, total }: { event: string; index: number; total: number }) {
  const isLast = index === total - 1
  return (
    <motion.div
      className="relative flex gap-5"
      initial={{ opacity: 0, x: -16 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ delay: index * 0.07, duration: 0.55, ease: SUPPLIFY_EASE }}
    >
      {/* Node + vertical line */}
      <div className="relative flex flex-col items-center">
        <div className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-supplify-light/50 bg-[#0f0620] shadow-[0_0_12px_rgba(139,124,255,0.3)]">
          <motion.span
            className="h-[7px] w-[7px] rounded-full bg-supplify-light"
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 + 0.2, duration: 0.35, ease: 'backOut' }}
          />
        </div>
        {!isLast && (
          <div className="mt-1 w-px flex-1 bg-gradient-to-b from-supplify-light/30 to-supplify-light/[0.06]" />
        )}
      </div>

      {/* Content */}
      <div className={`pb-7 ${isLast ? 'pb-0' : ''}`}>
        <p className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-supplify-light/50">
          {String(index + 1).padStart(2, '0')}
        </p>
        <p className="font-sans text-[15px] font-medium leading-snug text-paper/90 md:text-base">
          {event}
        </p>
      </div>
    </motion.div>
  )
}

export function SupplifyTimeline() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0f0620] py-section md:py-section-lg">
      <div className="pointer-events-none absolute inset-0 bg-supplify-mesh opacity-40" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] supplify-grain" aria-hidden />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        {/* Header */}
        <Reveal>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-supplify-light/80">
            Signature capability
          </p>
          <div className="mt-8 max-w-2xl">
            <SplitText
              as="h2"
              by="word"
              text="Every order has a living timeline."
              className="font-display text-display-md font-bold text-paper"
            />
          </div>
          <p className="mt-6 max-w-xl font-sans text-base leading-[1.75] text-dough-200/90 md:text-lg">
            From placement to invoice — one secure thread both sides trust. No exports. No mystery
            status. No reconciliation archaeology at 2 AM.
          </p>
        </Reveal>

        {/* Two-column: screenshot + animated timeline */}
        <div className="mt-16 grid items-start gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          {/* Left: product screenshot */}
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, ease: SUPPLIFY_EASE }}
          >
            <ProductScreenshot
              src={SUPPLIFY_PACK.operationsTimeline.ui}
              className="w-full"
            />
          </motion.div>

          {/* Right: vertical timeline */}
          <Reveal delay={0.1}>
            <p className="mb-8 font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-supplify-light/60">
              Order lifecycle
            </p>
            <div>
              {TIMELINE_EVENTS.map((event, i) => (
                <TimelineNode
                  key={event}
                  event={event}
                  index={i}
                  total={TIMELINE_EVENTS.length}
                />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
