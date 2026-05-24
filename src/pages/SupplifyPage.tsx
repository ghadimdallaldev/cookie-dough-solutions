import { MARQUEE_FEATURES } from '../data/supplify-cursor-pack'
import { Marquee } from '../components/Marquee'
import { ScrollProgressBar } from '../components/ScrollProgressBar'
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

export function SupplifyPage() {
  return (
    <div className="supplify-page bg-[#0a0812] text-paper">
      <ScrollProgressBar />

      <SupplifyHero />
      <SupplifyOldWay />
      <SupplifyBridge />
      <SupplifyTrust />
      <SupplifyWalkthrough />
      <SupplifyUIShowcase />
      <SupplifyFeatures />
      <SupplifyPillars />
      <SupplifyTimeline />
      <SupplifySplit />

      <Marquee variant="statement" dark words={[...MARQUEE_FEATURES]} />

      <SupplifyFinaleCTA />
    </div>
  )
}
