import {
  OrderingAppUIShowcase,
  OrderingCaseStudy,
  OrderingFinale,
  OrderingFoodGallery,
  OrderingHero,
  OrderingLoyaltySection,
  OrderingPainSection,
  OrderingShipSection,
} from '../components/ordering'

export function OrderingAppPage() {
  return (
    <div className="ordering-app-page relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-[30svh] z-0 h-[34rem] bg-[radial-gradient(ellipse_58%_38%_at_50%_50%,rgba(202,138,4,0.14)_0%,transparent_72%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-64 bg-gradient-to-b from-oapp-gold/8 to-transparent" aria-hidden />

      <OrderingHero />

      <div id="ordering-problem" className="scroll-mt-36">
        <OrderingPainSection />
      </div>
      <OrderingCaseStudy />
      <OrderingFoodGallery />
      <div id="ordering-loyalty" className="scroll-mt-36">
        <OrderingLoyaltySection />
      </div>
      <div id="ordering-stack" className="scroll-mt-36">
        <OrderingShipSection />
      </div>
      <div className="scroll-mt-36">
        <OrderingAppUIShowcase />
      </div>
      <div className="scroll-mt-36">
        <OrderingFinale />
      </div>
    </div>
  )
}
