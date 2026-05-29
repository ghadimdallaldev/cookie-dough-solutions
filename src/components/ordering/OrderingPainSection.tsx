import { Reveal } from '../Reveal'
import { ORDERING_VS_AGGREGATORS } from '../../data/ordering-app-content'
import { OrderingFeatureCard, OrderingMarqueeRule, OrderingSectionHeader } from './shared'

export function OrderingPainSection() {
  return (
    <section className="ordering-section relative py-section md:py-section-lg">
      <OrderingMarqueeRule />
      <div className="relative mx-auto max-w-[90rem] px-6 lg:px-10">
        <Reveal>
          <OrderingSectionHeader
            eyebrow="The problem with marketplaces"
            title="Stop paying commission"
            titleAccent="with your menu prices."
            description="When you list on third-party apps, you absorb commission, platform fees, and the pressure to raise prices so the marketplace still makes money. A direct ordering app lets customers order from you — at the prices you set."
          />
        </Reveal>

        <ul className="mt-14 grid gap-5 md:grid-cols-3 md:gap-6">
          {ORDERING_VS_AGGREGATORS.map((item, i) => (
            <Reveal key={item.title} delay={0.06 * i}>
              <OrderingFeatureCard index={`0${i + 1}`} title={item.title} body={item.body} />
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
