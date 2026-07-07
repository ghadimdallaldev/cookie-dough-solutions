import { ArrowRight, ChefHat, RefreshCw, Scale, TrendingUp } from 'lucide-react'
import { RECIPE_PRICING } from '../../data/supplify-cursor-pack'
import { Reveal } from '../Reveal'
import { SplitText } from '../motion/SplitText'
import { ProductScreenshot, SupplifyCard, SupplifyEyebrow, SupplifyPrimaryButton } from './shared'

const BULLET_ICONS = [ChefHat, RefreshCw, Scale, TrendingUp] as const

export function SupplifyRecipePricing() {
  return (
    <section
      data-theme="light"
      className="relative overflow-hidden border-t border-supplify-border bg-supplify-section py-20 md:py-28"
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-supplify-caramel/40 to-transparent"
        aria-hidden
      />
      <div className="pointer-events-none absolute -right-20 top-1/4 h-64 w-64 rounded-full bg-supplify-caramel/10 blur-[90px]" aria-hidden />

      <div className="relative mx-auto max-w-[90rem] px-6 md:px-10 lg:px-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] lg:items-center lg:gap-16">
          <div>
            <Reveal>
              <SupplifyEyebrow>{RECIPE_PRICING.eyebrow}</SupplifyEyebrow>
              <div className="mt-6 max-w-xl">
                <SplitText
                  as="h2"
                  by="word"
                  text={RECIPE_PRICING.title}
                  className="font-display text-display-md font-bold text-supplify-ink"
                />
              </div>
              <p className="mt-6 max-w-xl font-sans text-base leading-[1.75] text-supplify-secondary md:text-lg">
                {RECIPE_PRICING.lead}
              </p>
            </Reveal>

            <div className="mt-10 grid gap-4 sm:grid-cols-2">
              {RECIPE_PRICING.bullets.map((item, i) => {
                const Icon = BULLET_ICONS[i] ?? ChefHat
                return (
                  <Reveal key={item.title} delay={0.05 + i * 0.04}>
                    <SupplifyCard className="h-full !p-5 transition-[border-color,box-shadow] duration-300 hover:border-supplify-caramel/35 hover:shadow-supplify-glow">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-supplify-caramel/12 ring-1 ring-supplify-caramel/25">
                        <Icon className="h-[18px] w-[18px] text-supplify-caramel" strokeWidth={1.75} aria-hidden />
                      </span>
                      <h3 className="mt-4 font-display text-base font-bold text-supplify-ink">{item.title}</h3>
                      <p className="mt-2 font-sans text-sm leading-relaxed text-supplify-secondary">{item.body}</p>
                    </SupplifyCard>
                  </Reveal>
                )
              })}
            </div>

            <Reveal delay={0.2} className="mt-10">
              <SupplifyPrimaryButton href="#contact">
                See recipe pricing in a walkthrough
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </SupplifyPrimaryButton>
            </Reveal>
          </div>

          <Reveal delay={0.1}>
            <div className="relative">
              <div className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-gradient-to-br from-supplify-soft via-white to-supplify-caramel/10" aria-hidden />
              <ProductScreenshot
                src={RECIPE_PRICING.ui}
                alt="Supplify recipe pricing — live food cost per dish"
                glow
                priority={false}
                className="relative"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
