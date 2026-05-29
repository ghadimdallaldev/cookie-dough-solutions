import {
  OrderingAppUIShowcase,
  OrderingFinale,
  OrderingHero,
  OrderingLoyaltySection,
  OrderingPainSection,
  OrderingShipSection,
} from '../components/ordering'
import { SectionJumpRail } from '../components/SectionJumpRail'

const ORDERING_PAGE_SECTIONS = [
  { id: 'ordering-problem', label: 'Problem' },
  { id: 'ordering-loyalty', label: 'Loyalty' },
  { id: 'ordering-stack', label: 'What we ship' },
  { id: 'screenshots', label: 'Screens' },
  { id: 'contact', label: 'Start' },
] as const

export function OrderingAppPage() {
  return (
    <div className="ordering-app-page relative">
      <div
        className="pointer-events-none absolute inset-x-0 top-[30svh] z-0 h-[34rem] bg-[radial-gradient(ellipse_58%_38%_at_50%_50%,rgba(202,138,4,0.14)_0%,transparent_72%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-64 bg-gradient-to-b from-oapp-gold/8 to-transparent" aria-hidden />

      <OrderingHero />

      <SectionJumpRail
        items={ORDERING_PAGE_SECTIONS}
        variant="oapp"
        className="mx-auto -mt-3 w-full max-w-6xl px-6 lg:px-10"
      />

      <div id="ordering-problem" className="scroll-mt-32">
        <OrderingPainSection />
      </div>
      <div id="ordering-loyalty" className="scroll-mt-32">
        <OrderingLoyaltySection />
      </div>
      <div id="ordering-stack" className="scroll-mt-32">
        <OrderingShipSection />
      </div>
      <div className="scroll-mt-32">
        <OrderingAppUIShowcase />
      </div>
      <div className="scroll-mt-32">
        <OrderingFinale />
      </div>
    </div>
  )
}
