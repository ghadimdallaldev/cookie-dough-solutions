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
    <div className="ordering-app-page relative bg-oapp-page">
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[40svh] bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(201,139,74,0.12)_0%,transparent_70%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-x-0 top-[30svh] z-0 h-[34rem] bg-[radial-gradient(ellipse_58%_38%_at_50%_50%,rgba(232,93,76,0.1)_0%,transparent_72%)]"
        aria-hidden
      />

      <OrderingHero />

      <div id="ordering-problem" className="scroll-mt-36 border-t border-[#E6D8C8]/80">
        <OrderingPainSection />
      </div>
      <OrderingCaseStudy />
      <OrderingFoodGallery />
      <div id="ordering-loyalty" className="scroll-mt-36 border-t border-[#E6D8C8]/80">
        <OrderingLoyaltySection />
      </div>
      <div id="ordering-stack" className="scroll-mt-36 border-t border-[#E6D8C8]/80">
        <OrderingShipSection />
      </div>
      <div className="scroll-mt-36 border-t border-[#E6D8C8]/80">
        <OrderingAppUIShowcase />
      </div>
      <div id="contact" className="scroll-mt-36 border-t border-[#E6D8C8]/80">
        <OrderingFinale />
      </div>
    </div>
  )
}
