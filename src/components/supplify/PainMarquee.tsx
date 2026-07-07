import { OLD_WAY_PAINS } from '../../data/supplify-cursor-pack'
import { useReducedMotion } from '../../hooks/useReducedMotion'

function MarqueeRow({
  items,
  reverse = false,
  speedClass = 'animate-marquee',
}: {
  items: readonly string[]
  reverse?: boolean
  speedClass?: string
}) {
  const row = [...items, ...items]
  const trackClass = reverse ? 'animate-marquee-reverse' : speedClass

  return (
    <div className="marquee-edge-fade overflow-hidden">
      <div className={`flex w-max whitespace-nowrap will-change-transform [transform:translateZ(0)] ${trackClass}`}>
        {row.map((pain, i) => (
          <span key={`${pain}-${i}`} className="flex shrink-0 items-center">
            <span className="mx-6 font-display text-[clamp(1.35rem,3.2vw,2.65rem)] font-bold uppercase leading-none tracking-[-0.02em] text-supplify-ink/20 line-through decoration-supplify/25 decoration-[0.08em] md:mx-10">
              {pain}
            </span>
            <span
              className="h-2 w-2 shrink-0 rounded-full bg-supplify/40 shadow-[0_0_12px_rgba(109,94,247,0.35)]"
              aria-hidden
            />
          </span>
        ))}
      </div>
    </div>
  )
}

export function PainMarquee() {
  const reduced = useReducedMotion()
  const midpoint = Math.ceil(OLD_WAY_PAINS.length / 2)
  const rowA = OLD_WAY_PAINS.slice(0, midpoint)
  const rowB = OLD_WAY_PAINS.slice(midpoint)

  if (reduced) {
    return (
      <div className="space-y-3 px-6 md:px-10">
        {OLD_WAY_PAINS.map((pain) => (
          <p
            key={pain}
            className="font-display text-lg font-bold uppercase tracking-tight text-supplify-ink/30 line-through decoration-supplify/20"
          >
            {pain}
          </p>
        ))}
      </div>
    )
  }

  return (
    <div className="space-y-5 md:space-y-7" aria-hidden>
      <MarqueeRow items={rowA} speedClass="animate-marquee-slow" />
      <MarqueeRow items={rowB.length ? rowB : rowA} reverse />
    </div>
  )
}
