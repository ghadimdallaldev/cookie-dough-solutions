import { ArrowRight, Check, X } from 'lucide-react'
import { CHAOS_FIX_PAIRS, ORDERING_LOOP } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { SupplifyEyebrow } from './shared'

export function SupplifyBridge() {
  return (
    <section
      id="ordering"
      className="relative overflow-hidden border-t border-white/[0.06] bg-[#0f0620] py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 bg-supplify-mesh opacity-30" aria-hidden />
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] supplify-grain" aria-hidden />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <Reveal>
          <SupplifyEyebrow>What we fixed</SupplifyEyebrow>
          <h2 className="mt-6 max-w-[20ch] font-display text-display-md font-bold text-paper">
            Restaurant ordering and supplier fulfillment — one connected loop.
          </h2>
          <p className="mt-6 max-w-2xl font-sans text-base leading-[1.75] text-dough-200/90 md:text-lg">
            Supplify exists because the space between restaurants and suppliers was broken — orders
            scattered across phones, prices in PDFs, confirmations in voice notes. We rebuilt that
            connection from the ground up and killed the chaos on both sides.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3 md:gap-5">
          {ORDERING_LOOP.map((item, i) => (
            <Reveal key={item.step} delay={0.05 + i * 0.07}>
              <article className="relative h-full rounded-2xl border border-white/10 bg-white/[0.03] p-6 md:p-7">
                {i < ORDERING_LOOP.length - 1 && (
                  <ArrowRight
                    className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-supplify-light/50 md:block"
                    aria-hidden
                  />
                )}
                <p className="font-mono text-[10px] uppercase tracking-[0.28em] text-supplify-light/55">
                  {item.step} · {item.side}
                </p>
                <h3 className="mt-4 font-display text-xl font-bold text-paper md:text-2xl">
                  {item.title}
                </h3>
                <p className="mt-3 font-sans text-sm leading-[1.7] text-dough-200/85 md:text-base">
                  {item.body}
                </p>
              </article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1} className="mt-16">
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.28em] text-supplify-light/70">
            Chaos → clarity
          </p>
          <div className="mt-8 grid gap-4 md:grid-cols-2">
            {CHAOS_FIX_PAIRS.map((pair) => (
              <div
                key={pair.before}
                className="overflow-hidden rounded-xl ring-1 ring-white/10"
              >
                <div className="flex gap-3 border-b border-white/[0.08] bg-white/[0.02] px-4 py-3">
                  <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400/80" strokeWidth={2} aria-hidden />
                  <p className="font-sans text-sm leading-[1.65] text-dough-300/75 line-through decoration-white/20">
                    {pair.before}
                  </p>
                </div>
                <div className="flex gap-3 bg-supplify/[0.08] px-4 py-3">
                  <Check className="mt-0.5 h-4 w-4 shrink-0 text-supplify-light" strokeWidth={2} aria-hidden />
                  <p className="font-sans text-sm leading-[1.65] text-paper/90">{pair.after}</p>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  )
}
