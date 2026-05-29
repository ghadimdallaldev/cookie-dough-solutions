import {
  motion,
  useScroll,
  useSpring,
} from 'framer-motion'
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
import { SectionJumpRail } from '../components/SectionJumpRail'

const HOME_SECTIONS = [
  { id: 'home-intro', label: 'Intro' },
  { id: 'home-team', label: 'Who we are' },
  { id: 'home-capabilities', label: 'Capabilities' },
  { id: 'home-supplify', label: 'Supplify' },
  { id: 'home-ordering', label: 'Ordering app' },
  { id: 'home-testimonials', label: 'Results' },
  { id: 'home-contact', label: 'Contact' },
] as const

export function HomePage() {
  const { scrollYProgress } = useScroll()
  const progressScaleX = useSpring(scrollYProgress, {
    stiffness: 160,
    damping: 26,
    mass: 0.2,
  })

  return (
    <div className="home-page relative overflow-x-clip">
      <div className="pointer-events-none fixed inset-x-0 top-0 z-[70] h-1 bg-transparent">
        <motion.div
          style={{ scaleX: progressScaleX }}
          className="h-full origin-left bg-gradient-to-r from-chip via-dough-400 to-supplify-light shadow-[0_0_22px_rgba(109,94,247,0.35)]"
          aria-hidden
        />
      </div>
      <HomeAmbient />
      <HomeScrollCTA />
      <div className="relative z-[1]">
        <HomeHero />
        <SectionJumpRail
          items={HOME_SECTIONS}
          variant="warm"
          className="mx-auto -mt-2 w-full max-w-6xl px-5 sm:px-6 md:px-8"
        />
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
