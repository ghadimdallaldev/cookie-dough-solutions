import { MARQUEE_FEATURES } from '../data/supplify-cursor-pack'
import { Marquee } from '../components/Marquee'
import {
  SupplifyBeyondB2B,
  SupplifyBridge,
  SupplifyFeatures,
  SupplifyFinaleCTA,
  SupplifyHero,
  SupplifyOldWay,
  SupplifyPillars,
  SupplifyRecipePricing,
  SupplifySplit,
  SupplifySupplierDepth,
  SupplifyTimeline,
  SupplifyTrust,
  SupplifyUIShowcase,
  SupplifyWalkthrough,
} from '../components/supplify'

export function SupplifyPage() {
  return (
    <div className="supplify-page relative">
      <SupplifyHero />

      <div id="supplify-chaos" data-theme="light" className="scroll-mt-36">
        <SupplifyOldWay />
      </div>
      <div id="ordering" data-theme="light" className="scroll-mt-36">
        <SupplifyBridge />
      </div>
      <div id="supplify-trust" data-theme="light" className="scroll-mt-36">
        <SupplifyTrust />
      </div>
      <div id="walkthrough" data-theme="light" className="scroll-mt-36">
        <SupplifyWalkthrough />
      </div>
      <div id="screenshots" data-theme="light" className="scroll-mt-36">
        <SupplifyUIShowcase />
      </div>
      <div id="features" data-theme="light" className="scroll-mt-36">
        <SupplifyFeatures />
      </div>
      <div id="recipe-pricing" data-theme="light" className="scroll-mt-36">
        <SupplifyRecipePricing />
      </div>
      <div id="beyond" data-theme="light" className="scroll-mt-36">
        <SupplifyBeyondB2B />
      </div>
      <div id="supplier-ops" data-theme="light" className="scroll-mt-36">
        <SupplifySupplierDepth />
      </div>
      <div id="stories" data-theme="light" className="scroll-mt-36">
        <SupplifyPillars />
      </div>
      <div data-theme="light" className="scroll-mt-32">
        <SupplifyTimeline />
      </div>
      <div data-theme="light" className="scroll-mt-32">
        <SupplifySplit />
      </div>

      <div data-theme="light" className="border-t border-supplify-border bg-supplify-section">
        <Marquee variant="statement" words={[...MARQUEE_FEATURES]} />
      </div>

      <div id="contact" data-theme="light">
        <SupplifyFinaleCTA />
      </div>
    </div>
  )
}
