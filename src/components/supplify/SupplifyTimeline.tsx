import { motion } from 'framer-motion'
import { SUPPLIFY_PACK, TIMELINE_EVENTS } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'
import { ProductScreenshot, SupplifyEyebrow, SUPPLIFY_EASE } from './shared'

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
      <div className="relative flex flex-col items-center">
        <div className="relative z-10 flex h-[22px] w-[22px] shrink-0 items-center justify-center rounded-full border border-supplify/40 bg-white shadow-supplify-card">
          <motion.span
            className="h-[7px] w-[7px] rounded-full bg-supplify"
            initial={{ scale: 0.4, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.07 + 0.2, duration: 0.4, ease: SUPPLIFY_EASE }}
          />
        </div>
        {!isLast && (
          <div className="mt-1 w-px flex-1 bg-gradient-to-b from-supplify/30 to-supplify-border" />
        )}
      </div>

      <div className={`pb-7 ${isLast ? 'pb-0' : ''}`}>
        <p className="mb-0.5 font-mono text-[10px] uppercase tracking-[0.22em] text-supplify-muted">
          {String(index + 1).padStart(2, '0')}
        </p>
        <p className="font-sans text-[15px] font-medium leading-snug text-supplify-ink md:text-base">
          {event}
        </p>
      </div>
    </motion.div>
  )
}

export function SupplifyTimeline() {
  return (
    <section
      data-theme="light"
      className="relative overflow-hidden border-t border-supplify-border bg-white py-section md:py-section-lg"
    >
      <div className="pointer-events-none absolute inset-0 bg-supplify-mesh opacity-50" aria-hidden />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <Reveal>
          <SupplifyEyebrow>Signature capability</SupplifyEyebrow>
          <div className="mt-8 max-w-2xl">
            <SplitText
              as="h2"
              by="word"
              text="Every order has a living timeline."
              className="font-display text-display-md font-bold text-supplify-ink"
            />
          </div>
          <p className="mt-6 max-w-xl font-sans text-base leading-[1.75] text-supplify-secondary md:text-lg">
            From placement to invoice — one secure thread both sides trust. No exports. No mystery
            status. No reconciliation archaeology at 2 AM.
          </p>
        </Reveal>

        <div className="mt-16 grid items-start gap-14 lg:grid-cols-[1.2fr_0.8fr] lg:gap-20">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.95, ease: SUPPLIFY_EASE }}
          >
            <ProductScreenshot src={SUPPLIFY_PACK.operationsTimeline.ui} className="w-full" />
          </motion.div>

          <Reveal delay={0.1}>
            <p className="mb-8 font-sans text-[11px] font-semibold uppercase tracking-[0.28em] text-supplify-muted">
              Order lifecycle
            </p>
            <div>
              {TIMELINE_EVENTS.map((event, i) => (
                <TimelineNode key={event} event={event} index={i} total={TIMELINE_EVENTS.length} />
              ))}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
