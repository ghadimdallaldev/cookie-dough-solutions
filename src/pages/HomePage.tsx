import {
  HomeActionRail,
  HomeAmbient,
  HomeCapabilities,
  HomeFinale,
  HomeHero,
  HomeIntro,
  HomeManifesto,
  HomeManifestoRail,
  HomeMarquee,
  HomeRealityCheck,
  HomeScrollCTA,
  HomeSectionShell,
  HomeSupplifyTeaser,
  HomeTestimonials,
  HomeWhoWeAre,
} from '../components/home'

export function HomePage() {
  return (
    <div className="home-page relative">
      <HomeAmbient />
      <HomeScrollCTA />
      <div className="relative z-[1]">
        <HomeHero />
        <HomeSectionShell divider={false} variant="scale">
          <HomeIntro />
        </HomeSectionShell>
        <HomeSectionShell variant="slide">
          <HomeWhoWeAre />
        </HomeSectionShell>
        <HomeSectionShell variant="rise">
          <HomeRealityCheck />
        </HomeSectionShell>
        <HomeSectionShell variant="scale">
          <HomeCapabilities />
        </HomeSectionShell>
        <HomeSectionShell variant="slide" divider={false}>
          <HomeActionRail />
        </HomeSectionShell>
        <HomeManifestoRail />
        <HomeSectionShell variant="rise">
          <HomeSupplifyTeaser />
        </HomeSectionShell>
        <HomeSectionShell variant="scale">
          <HomeManifesto />
        </HomeSectionShell>
        <HomeMarquee />
        <HomeSectionShell variant="slide">
          <HomeTestimonials />
        </HomeSectionShell>
        <HomeSectionShell divider={false} variant="rise">
          <HomeFinale />
        </HomeSectionShell>
      </div>
    </div>
  )
}
