import { Gift, Sparkles } from 'lucide-react'
import { Reveal } from '../Reveal'
import { ORDERING_LOYALTY } from '../../data/ordering-app-content'
import { ORDERING_APP_UI } from '../../data/ordering-app-pack'
import { OrderingProductScreenshot } from './OrderingProductScreenshot'
import { OrderingMarqueeRule, OrderingSectionHeader } from './shared'

export function OrderingLoyaltySection() {
  return (
    <section className="ordering-section relative overflow-hidden py-section md:py-section-lg">
      <OrderingMarqueeRule />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-oapp-tomato/[0.06] via-transparent to-transparent"
        aria-hidden
      />

      <div className="relative mx-auto max-w-[90rem] px-6 lg:px-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          <Reveal>
            <OrderingSectionHeader
              eyebrow={ORDERING_LOYALTY.eyebrow}
              title="Turn repeat orders into points"
              titleAccent="not platform fees."
              description={ORDERING_LOYALTY.body}
            />

            <ul className="mt-10 space-y-3">
              {ORDERING_LOYALTY.bullets.map((item) => (
                <li
                  key={item}
                  className="flex cursor-default gap-4 rounded-2xl border border-ink/8 bg-white px-5 py-4 shadow-sm transition-[border-color,box-shadow] duration-200 hover:border-oapp-gold/25 hover:shadow-md"
                >
                  <span className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-oapp-gold/15 text-oapp-gold-light">
                    <Sparkles className="h-4 w-4" strokeWidth={1.75} aria-hidden />
                  </span>
                  <p className="font-oapp-body text-sm leading-[1.65] text-oapp-muted md:text-base">{item}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1} className="relative">
            <div className="absolute -left-4 top-6 z-10 rounded-2xl border border-oapp-gold/25 bg-white/95 px-5 py-4 shadow-lg backdrop-blur-sm lg:-left-8">
              <div className="flex items-center gap-2 text-oapp-gold-light">
                <Gift className="h-4 w-4" aria-hidden />
                <span className="font-oapp-body text-xs font-bold uppercase tracking-[0.2em]">
                  Earn on checkout
                </span>
              </div>
              <p className="mt-1 font-oapp-display text-3xl font-bold text-oapp-cream">+150 pts</p>
            </div>
            <OrderingProductScreenshot
              src={ORDERING_APP_UI.checkout}
              alt="Checkout with loyalty rewards"
              fit="cover"
              step="04 · Checkout"
              variant="phone"
            />
          </Reveal>
        </div>
      </div>
    </section>
  )
}
