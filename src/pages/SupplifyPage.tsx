import { MARQUEE_FEATURES } from '../data/supplify-cursor-pack'
import { Marquee } from '../components/Marquee'
import { SectionJumpRail } from '../components/SectionJumpRail'
import {
  SupplifyBridge,
  SupplifyFeatures,
  SupplifyFinaleCTA,
  SupplifyHero,
  SupplifyOldWay,
  SupplifyPillars,
  SupplifySplit,
  SupplifyTimeline,
  SupplifyTrust,
  SupplifyUIShowcase,
  SupplifyWalkthrough,
} from '../components/supplify'

const SUPPLIFY_PAGE_SECTIONS = [
  { id: 'supplify-chaos', label: 'Problem' },
  { id: 'ordering', label: 'Live loop' },
  { id: 'supplify-trust', label: 'Proof' },
  { id: 'walkthrough', label: 'Flow' },
  { id: 'screenshots', label: 'UI' },
  { id: 'features', label: 'Platform' },
  { id: 'stories', label: 'Stories' },
  { id: 'contact', label: 'Book demo' },
] as const

export function SupplifyPage() {
  return (
    <div className="supplify-page relative bg-[#0a0812] text-paper">
      <div
        className="pointer-events-none absolute inset-x-0 top-[18svh] z-0 h-[36rem] bg-[radial-gradient(ellipse_60%_42%_at_50%_50%,rgba(109,94,247,0.26)_0%,transparent_72%)]"
        aria-hidden
      />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-0 h-72 bg-gradient-to-b from-supplify-light/10 to-transparent" aria-hidden />

      <SupplifyHero />

      <SectionJumpRail
        items={SUPPLIFY_PAGE_SECTIONS}
        variant="violet"
        className="mx-auto -mt-3 w-full max-w-6xl px-6 lg:px-10"
      />

      <div id="supplify-chaos" className="scroll-mt-32">
        <SupplifyOldWay />
      </div>
      <div className="scroll-mt-32">
        <SupplifyBridge />
      </div>
      <div id="supplify-trust" className="scroll-mt-32">
        <SupplifyTrust />
      </div>
      <div id="walkthrough" className="scroll-mt-32">
        <SupplifyWalkthrough />
      </div>
      <div id="screenshots" className="scroll-mt-32">
        <SupplifyUIShowcase />
      </div>
      <div id="features" className="scroll-mt-32">
        <SupplifyFeatures />
      </div>
      <div id="stories" className="scroll-mt-32">
        <SupplifyPillars />
      </div>
      <div className="scroll-mt-32">
        <SupplifyTimeline />
      </div>
      <div className="scroll-mt-32">
        <SupplifySplit />
      </div>

      <Marquee variant="statement" dark words={[...MARQUEE_FEATURES]} />

      <SupplifyFinaleCTA />
    </div>
  )
}
