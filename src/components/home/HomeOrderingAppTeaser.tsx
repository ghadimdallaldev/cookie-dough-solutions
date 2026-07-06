import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { OrderingAppPreview } from '../ordering'
import {
  OrderingEyebrow,
  OrderingFlowStrip,
  OrderingGlowOrb,
  OrderingMarqueeRule,
  OrderingStat,
  OrderingTrustStrip,
} from '../ordering/shared'
import { ORDERING_APP_DEMO_URL } from '../../data/ordering-app-pack'
import {
  ORDERING_FEATURES,
  ORDERING_HERO_COPY,
  ORDERING_HIGHLIGHTS,
} from '../../data/ordering-app-content'
import { ORDERING_APP_PACK } from '../../data/ordering-app-pack'
import { home as h } from '../../theme/home'
import { Reveal } from '../Reveal'

export function HomeOrderingAppTeaser() {
  return (
    <section
      id="ordering-app"
      className={`ordering-home-teaser section-noise relative scroll-section overflow-hidden border-t border-ink/8 bg-oapp-page ${h.sectionXl}`}
      aria-labelledby="ordering-app-heading"
    >
      <OrderingMarqueeRule />
      <div className="ordering-hero-grain pointer-events-none absolute inset-0 opacity-[0.1]" aria-hidden />
      <div className="pointer-events-none absolute inset-0 bg-oapp-mesh opacity-40" aria-hidden />
      <OrderingGlowOrb className="-right-20 top-[10%] h-80 w-80 bg-oapp-tomato/18" />
      <OrderingGlowOrb className="-left-16 bottom-[8%] h-64 w-64 bg-oapp-gold/14" delay={1.2} />

      <div className={`${h.container} relative z-10`}>
        <Reveal className="mb-8">
          <OrderingTrustStrip />
        </Reveal>

        <div className="grid gap-12 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:items-center lg:gap-16 xl:gap-20">
          <Reveal className="lg:order-2 lg:justify-self-end">
            <OrderingAppPreview layoutId="home-ordering-app-preview" panelId="home-ordering-app-preview-panel" />
          </Reveal>

          <div className="lg:order-1">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-oapp-gold/35 bg-oapp-surface/80 px-3.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,249,245,0.06)]">
              <span
                className="h-1.5 w-1.5 shrink-0 rounded-full bg-oapp-tomato motion-safe:animate-pulse"
                aria-hidden
              />
              <OrderingEyebrow>Custom ordering apps</OrderingEyebrow>
            </div>

            <h2
              id="ordering-app-heading"
              className="mt-6 font-oapp-display text-[clamp(2rem,4.5vw,3.25rem)] font-bold leading-[1.08] tracking-[-0.02em] text-oapp-cream text-balance sm:mt-7"
            >
              <span className="block">Your menu. Your prices.</span>
              <span className="mt-1 block font-normal italic text-oapp-gold-light">
                No marketplace markup.
              </span>
            </h2>

            <p className={`${h.bodyLg} mt-5 max-w-xl font-oapp-body text-oapp-muted sm:mt-6`}>
              {ORDERING_HERO_COPY.lead}
            </p>

            <p className="mt-5 inline-flex items-center gap-2 rounded-full border border-oapp-cream/12 bg-oapp-surface/60 px-3.5 py-1.5 font-oapp-body text-[10px] font-bold uppercase tracking-[0.18em] text-oapp-muted">
              {ORDERING_HERO_COPY.badge}
            </p>

            <div className="mt-7">
              <OrderingFlowStrip activeIndex={0} />
            </div>

            <ul className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              {ORDERING_HIGHLIGHTS.map((stat) => (
                <OrderingStat key={stat.label} {...stat} />
              ))}
            </ul>

            <div className={`${h.btnRow} mt-8`}>
              <Link
                to="/ordering"
                className="group inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 rounded-full bg-oapp-gold px-7 py-3 font-oapp-body text-sm font-bold text-white shadow-oapp-glow transition-[box-shadow,transform] duration-200 hover:shadow-[0_0_52px_rgba(165,104,40,0.35)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oapp-gold focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:min-h-0 sm:w-auto"
              >
                Explore ordering apps
                <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5" />
              </Link>
              {ORDERING_APP_DEMO_URL ? (
                <a
                  href={ORDERING_APP_DEMO_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 font-oapp-body text-sm font-semibold text-oapp-muted transition-colors duration-200 hover:text-oapp-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oapp-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:min-h-0 sm:w-auto sm:justify-start"
                >
                  See a live example
                </a>
              ) : (
                <a
                  href="#contact"
                  className="inline-flex min-h-11 w-full cursor-pointer items-center justify-center gap-2 font-oapp-body text-sm font-semibold text-oapp-muted transition-colors duration-200 hover:text-oapp-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-oapp-gold/70 focus-visible:ring-offset-2 focus-visible:ring-offset-paper sm:min-h-0 sm:w-auto sm:justify-start"
                >
                  Get in touch
                </a>
              )}
            </div>
          </div>
        </div>

        <Reveal delay={0.12} className="mt-14 sm:mt-16 md:mt-20">
          <p className="font-oapp-body text-[11px] font-bold uppercase tracking-[0.28em] text-oapp-muted">
            Included in every build
          </p>
          <ul className="mt-5 flex flex-wrap gap-2.5 md:gap-3">
            {ORDERING_FEATURES.map(({ icon: Icon, label }) => (
              <li key={label}>
                <span className="inline-flex cursor-default items-center gap-2 rounded-full border border-ink/8 bg-white px-4 py-2.5 font-oapp-body text-sm text-oapp-cream/90 shadow-sm transition-all duration-200 hover:border-oapp-gold/25 hover:shadow-md hover:-translate-y-px">
                  <Icon className="h-4 w-4 shrink-0 text-oapp-gold-light" strokeWidth={1.75} aria-hidden />
                  {label}
                </span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1} className="mt-12 sm:mt-14 md:mt-16">
          <div className="ordering-editorial-frame group relative overflow-hidden rounded-[1.5rem]">
            <img
              src={ORDERING_APP_PACK.restaurant}
              alt="Restaurant storefront"
              width={1400}
              height={520}
              loading="lazy"
              decoding="async"
              className="block h-auto max-h-[min(44vh,420px)] w-full object-cover object-center transition-transform duration-[1.2s] ease-out group-hover:scale-[1.02]"
            />
            <div
              className="pointer-events-none absolute inset-0 bg-gradient-to-t from-oapp-ink via-oapp-ink/50 to-transparent"
              aria-hidden
            />
            <p className="absolute bottom-5 left-5 right-5 max-w-lg font-oapp-display text-lg italic leading-snug text-oapp-cream sm:bottom-7 sm:left-7 md:text-xl">
              When guests already know you, every direct order is margin you keep — and an experience
              they will come back to.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
