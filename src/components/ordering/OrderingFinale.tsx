import { ArrowRight } from 'lucide-react'
import { Reveal } from '../Reveal'
import { ORDERING_APP_PACK } from '../../data/ordering-app-pack'
import { Magnetic } from '../motion/Magnetic'
import { OrderingMarqueeRule, OrderingPrimaryButton } from './shared'

export function OrderingFinale() {
  return (
    <>
      <section className="ordering-section relative py-16 md:py-24">
        <div className="mx-auto max-w-[90rem] px-6 lg:px-10">
          <Reveal>
            <div className="ordering-editorial-frame group relative cursor-default overflow-hidden rounded-[1.75rem]">
              <img
                src={ORDERING_APP_PACK.restaurant}
                alt="Restaurant storefront at golden hour"
                width={1400}
                height={520}
                loading="lazy"
                decoding="async"
                className="block h-auto max-h-[min(52vh,480px)] w-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/75 via-ink/25 to-transparent"
                aria-hidden
              />
              <blockquote className="absolute bottom-6 left-6 right-6 max-w-xl md:bottom-10 md:left-10">
                <p className="font-oapp-display text-xl italic leading-[1.35] text-white md:text-2xl">
                  When guests already know you, every direct order is margin you keep — and an experience
                  they will come back to.
                </p>
              </blockquote>
            </div>
          </Reveal>
        </div>
      </section>

      <section id="contact" className="ordering-cta relative overflow-hidden py-section md:py-section-lg">
        <OrderingMarqueeRule />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_55%_at_50%_100%,rgba(202,138,4,0.14),transparent)]"
          aria-hidden
        />

        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <Reveal>
            <p className="font-oapp-display text-[clamp(1.65rem,4vw,2.35rem)] italic leading-snug text-oapp-gold-light">
              Ready for ordering that stays on your menu — and your margin?
            </p>
            <p className="mx-auto mt-5 max-w-lg font-oapp-body text-base leading-[1.75] text-oapp-muted md:text-lg">
              Tell us about your locations, menu complexity, and how you fulfill today. We will design
              an ordering app around your brand — colors, photography, loyalty rules, and the flows
              your team needs.
            </p>
            <Magnetic strength={0.25} className="mt-10">
              <OrderingPrimaryButton href="mailto:hello@cookiedough.app">
                hello@cookiedough.app
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </OrderingPrimaryButton>
            </Magnetic>
          </Reveal>
        </div>
      </section>
    </>
  )
}
