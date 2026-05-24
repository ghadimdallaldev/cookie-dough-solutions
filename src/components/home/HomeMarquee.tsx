import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'

const ROW_A = [
  'Ticket #847 still open',
  'Modifiers: all of them',
  "86'd the spreadsheet",
  'Rush mode: enabled',
  'Not a bakery',
] as const

const ROW_B = [
  'Catalog live · no PDF',
  'Dispatch tracked end-to-end',
  'Split checks without tears',
  'Suppliers on one thread',
  'Coffee before reconciliation',
] as const

function TickerRow({
  items,
  reverse = false,
  faint = false,
}: {
  items: readonly string[]
  reverse?: boolean
  faint?: boolean
}) {
  const track = [...items, ...items]

  return (
    <div className="overflow-hidden py-3 md:py-3.5">
      <div
        className={`flex w-max items-center gap-3 will-change-transform md:gap-4 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee-slow'
        }`}
      >
        {track.map((label, i) => (
          <span
            key={`${label}-${i}`}
            className={`inline-flex shrink-0 items-center rounded-full border px-4 py-2 font-sans text-[11px] font-semibold uppercase tracking-[0.16em] md:text-xs ${
              faint
                ? 'border-paper/10 bg-paper/10 text-paper/45'
                : 'border-dough-400/30 bg-paper/95 text-ink-muted shadow-sm'
            }`}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  )
}

export function HomeMarquee() {
  const reduced = useReducedMotion()

  if (reduced) {
    return (
      <section className="border-y border-ink/[0.08] bg-ink py-6" aria-hidden>
        <div className="mx-auto flex max-w-6xl flex-wrap gap-2 px-6">
          {ROW_A.map((w) => (
            <span
              key={w}
              className="rounded-full border border-paper/15 px-3 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-wider text-paper/70"
            >
              {w}
            </span>
          ))}
        </div>
      </section>
    )
  }

  return (
    <motion.section
      className="relative overflow-hidden border-y border-ink/[0.08] bg-ink py-2 md:py-3"
      aria-hidden
      initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
      whileInView={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-8%' }}
      transition={{ duration: 0.85, ease: h.ease }}
    >
      <div
        className="pointer-events-none absolute inset-0 opacity-40"
        style={{
          background:
            'radial-gradient(ellipse 60% 80% at 50% 50%, rgba(184,149,111,0.22) 0%, transparent 70%)',
        }}
      />
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-px bg-gradient-to-b from-transparent via-dough-400/40 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-y-0 right-0 w-px bg-gradient-to-b from-transparent via-dough-400/40 to-transparent"
        aria-hidden
      />
      <div className="marquee-edge-fade relative">
        <TickerRow items={ROW_A} />
        <TickerRow items={ROW_B} reverse faint />
      </div>
    </motion.section>
  )
}
