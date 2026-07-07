import { ArrowRight, Check, ClipboardList, MessageSquare, PackageSearch, Truck, X } from 'lucide-react'
import { CHAOS_FIX_PAIRS, ORDERING_LOOP } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { SupplifyEyebrow } from './shared'

const LOOP_ICONS = [PackageSearch, MessageSquare, Truck] as const

export function SupplifyBridge() {
  return (
    <section
      data-theme="light"
      className="relative overflow-hidden border-t border-supplify-border bg-supplify-mist py-20 md:py-28"
    >
      <div className="pointer-events-none absolute inset-0 section-noise" aria-hidden />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-gradient-to-b from-white/80 to-transparent" aria-hidden />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <Reveal>
          <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
            <div>
              <SupplifyEyebrow>What we fixed</SupplifyEyebrow>
              <h2 className="mt-6 max-w-[20ch] font-display text-display-md font-bold text-supplify-ink">
                One connected loop for restaurants and suppliers.
              </h2>
            </div>
            <p className="max-w-2xl font-sans text-base leading-[1.75] text-supplify-secondary md:text-lg lg:ml-auto">
              Supplify turns scattered orders, stale price lists, fulfillment calls, and invoice disputes into a shared operating record. Every handoff is visible, auditable, and ready for the next team.
            </p>
          </div>
        </Reveal>

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {ORDERING_LOOP.map((item, i) => {
            const Icon = LOOP_ICONS[i] ?? ClipboardList
            return (
              <Reveal key={item.step} delay={0.05 + i * 0.07}>
                <article className="group/card relative h-full overflow-hidden rounded-3xl border border-supplify-border bg-white p-6 shadow-supplify-card transition-[border-color,transform,box-shadow] duration-500 ease-cinematic hover:-translate-y-1 hover:border-supplify/35 hover:shadow-supplify-float md:p-7">
                  <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-supplify via-supplify-blue to-supplify-caramel opacity-0 transition-opacity duration-500 group-hover/card:opacity-100" aria-hidden />
                  {i < ORDERING_LOOP.length - 1 && (
                    <ArrowRight
                      className="absolute -right-3 top-1/2 z-10 hidden h-5 w-5 -translate-y-1/2 text-supplify/60 transition-transform duration-300 group-hover/card:translate-x-1 md:block"
                      aria-hidden
                    />
                  )}
                  <div className="flex items-center justify-between gap-4">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl bg-supplify-soft text-supplify ring-1 ring-supplify/20 transition-transform duration-500 group-hover/card:scale-105">
                      <Icon className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-[0.24em] text-supplify/60">
                      {item.step} / {item.side}
                    </span>
                  </div>
                  <h3 className="mt-6 font-display text-xl font-bold text-supplify-ink md:text-2xl">
                    {item.title}
                  </h3>
                  <p className="mt-3 font-sans text-sm leading-[1.7] text-supplify-secondary md:text-base">
                    {item.body}
                  </p>
                </article>
              </Reveal>
            )
          })}
        </div>

        <Reveal delay={0.1} className="mt-16">
          <div className="grid overflow-hidden rounded-[2rem] border border-supplify-border bg-white shadow-supplify-float lg:grid-cols-[0.82fr_1.18fr]">
            <div className="bg-supplify-ink p-6 text-white md:p-8">
              <p className="font-sans text-[11px] font-bold uppercase tracking-[0.28em] text-supplify-soft/80">
                Chaos to clarity
              </p>
              <h3 className="mt-5 max-w-[14ch] font-display text-3xl font-bold leading-tight text-white md:text-4xl">
                The messy middle finally has a system.
              </h3>
              <p className="mt-5 font-sans text-sm leading-[1.7] text-white/70 md:text-base">
                Built around the events operators actually ask about: price, stock, substitution, dispatch, receiving, and reconciliation.
              </p>
            </div>

            <div className="grid divide-y divide-supplify-border">
              {CHAOS_FIX_PAIRS.map((pair) => (
                <div key={pair.before} className="grid gap-0 md:grid-cols-2">
                  <div className="flex gap-3 border-b border-supplify-border bg-supplify-section/60 px-4 py-4 md:border-b-0 md:border-r">
                    <X className="mt-0.5 h-4 w-4 shrink-0 text-red-600/75" strokeWidth={2} aria-hidden />
                    <p className="font-sans text-sm leading-[1.65] text-supplify-muted line-through decoration-supplify-border">
                      {pair.before}
                    </p>
                  </div>
                  <div className="flex gap-3 bg-supplify-soft/70 px-4 py-4 transition-colors duration-300 hover:bg-supplify-soft">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-supplify" strokeWidth={2} aria-hidden />
                    <p className="font-sans text-sm leading-[1.65] text-supplify-ink">{pair.after}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
