import { ArrowRight, Check, X } from 'lucide-react'
import { CHAOS_FIX_PAIRS, ORDERING_LOOP } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { SupplifyEyebrow } from './shared'

export function SupplifyBridge() {
  return (
    <section
      data-theme="light"
      className="relative overflow-hidden border-t border-ink/8 bg-supplify-mist py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 section-noise" aria-hidden />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <Reveal>
          <SupplifyEyebrow theme="light">What we fixed</SupplifyEyebrow>
          <h2 className="mt-6 max-w-[20ch] font-display text-display-md font-bold text-supplify-ink">
            Restaurant ordering and supplier fulfillment — one connected loop.
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-base leading-[1.75] text-ink-muted md:text-lg">
            Supplify exists because the space between restaurants and suppliers was broken — orders
            scattered across phones, prices in PDFs, confirmations in voice notes. We rebuilt that
            connection from the ground up and killed the chaos on both sides.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-5">
          {ORDERING_LOOP.map((item, i) => (
            <Reveal key={item.step} delay={0.05 + i * 0.07}>
              <article className="group/card relative h-full rounded-2xl border border-ink/8 bg-white p-6 shadow-sm transition-[border-color,background-color,transform,box-shadow] duration-300 hover:-translate-y-0.5 hover:border-supplify/25 hover:shadow-[0_20px_50px_-20px_rgba(109,94,247,0.15)] md:p-7">
                {i < ORDERING_LOOP.length - 1 && (
                  <ArrowRight
                    className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-supplify/50 transition-transform duration-300 group-hover/card:translate-x-0.5 md:block"
                    aria-hidden
                  />
                )}
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-supplify/60">
                  {item.step} · {item.side}
                </p>
                <h3 className="mt-4 font-display text-xl font-bold text-supplify-ink md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-[1.7] text-ink-muted md:text-base">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-supplify/70">
            Chaos → clarity
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {CHAOS_FIX_PAIRS.map((pair) => (
              <div
                key={pair.before}
                className="group/pair overflow-hidden rounded-xl border border-ink/8 bg-white shadow-sm transition-[border-color,box-shadow] duration-300 hover:border-supplify/20"
              >
                <div className="flex gap-3 border-b border-ink/6 bg-supplify-cream/50 px-4 py-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-500/80" strokeWidth={2} aria-hidden />
                  <p className="font-sans text-sm leading-[1.65] text-ink-muted/75 line-through decoration-ink/20">
                    {pair.before}
                  </p>
                </div>
                <div className="flex gap-3 bg-supplify/5 px-4 py-3 transition-colors duration-300 group-hover/pair:bg-supplify/10">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-supplify" strokeWidth={2} aria-hidden />
                  <p className="font-sans text-sm leading-[1.65] text-supplify-ink">{pair.after}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
