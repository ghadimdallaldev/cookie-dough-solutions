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
  HomeOrderingAppTeaser,
  HomeTestimonials,
  HomeWhoWeAre,
} from '../components/home'

export function HomePage() {
  return (
    <div className="home-page relative overflow-x-clip">
      <HomeAmbient />
      <HomeScrollCTA />
      <div className="relative z-[1]">
        <HomeHero />
        <HomeSectionShell id="home-intro" divider={false} variant="scale">
          <HomeIntro />
        </HomeSectionShell>
        <HomeSectionShell id="home-team" variant="slide">
          <HomeWhoWeAre />
        </HomeSectionShell>
        <HomeSectionShell variant="rise">
          <HomeRealityCheck />
        </HomeSectionShell>
        <HomeSectionShell id="home-capabilities" variant="scale">
          <HomeCapabilities />
        </HomeSectionShell>
        <HomeSectionShell variant="slide" divider={false}>
          <HomeActionRail />
        </HomeSectionShell>
        <HomeManifestoRail />
        <HomeSectionShell id="home-supplify" variant="rise">
          <HomeSupplifyTeaser />
        </HomeSectionShell>
        <HomeSectionShell id="home-ordering" variant="slide">
          <HomeOrderingAppTeaser />
        </HomeSectionShell>
        <HomeSectionShell variant="scale">
          <HomeManifesto />
        </HomeSectionShell>
        <HomeMarquee />
        <HomeSectionShell id="home-testimonials" variant="slide">
          <HomeTestimonials />
        </HomeSectionShell>
        <HomeSectionShell id="home-contact" divider={false} variant="rise">
          <HomeFinale />
        </HomeSectionShell>
      </div>
    </div>
  )
}
