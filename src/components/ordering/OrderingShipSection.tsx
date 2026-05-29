import { Reveal } from '../Reveal'
import { ORDERING_FEATURES, ORDERING_STACK } from '../../data/ordering-app-content'
import { OrderingMarqueeRule, OrderingSectionHeader } from './shared'

export function OrderingShipSection() {
  return (
    <section className="ordering-section relative py-section md:py-section-lg">
      <OrderingMarqueeRule />
      <div className="relative mx-auto max-w-[90rem] px-6 lg:px-10">
        <Reveal>
          <OrderingSectionHeader
            eyebrow="What we ship"
            title="One stack from midnight orders"
            titleAccent="to lunch-rush ops."
            description="From the menu your customer browses at midnight to the dashboard your team checks at lunch — wired to a real backend."
          />
        </Reveal>

        <ul className="mt-12 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 lg:gap-4">
          {ORDERING_STACK.map((item, i) => (
            <Reveal key={item} delay={0.04 * i}>
              <li className="group flex cursor-default items-start gap-4 rounded-2xl border border-oapp-cream/10 bg-oapp-surface/70 px-5 py-5 transition-[border-color,background-color,transform] duration-200 hover:border-oapp-gold/30 hover:bg-oapp-elevated hover:-translate-y-0.5">
                <span className="font-oapp-body text-xs font-bold text-oapp-gold/65">
                  {String(i + 1).padStart(2, '0')}
                </span>
                <span className="font-oapp-body text-[15px] font-medium leading-snug text-oapp-cream">{item}</span>
              </li>
            </Reveal>
          ))}
        </ul>

        <Reveal delay={0.1} className="mt-14">
          <p className="font-oapp-body text-[11px] font-bold uppercase tracking-[0.28em] text-oapp-muted">
            Included in every build
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5 md:gap-3">
            {ORDERING_FEATURES.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="inline-flex cursor-default items-center gap-2.5 rounded-full border border-oapp-cream/12 bg-oapp-surface/80 px-4 py-2.5 font-oapp-body text-sm text-oapp-cream/90 transition-[border-color,background-color,transform] duration-200 hover:border-oapp-tomato/30 hover:bg-oapp-elevated hover:-translate-y-px">
                  <Icon className="h-4 w-4 shrink-0 text-oapp-gold-light" strokeWidth={1.75} aria-hidden />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}
