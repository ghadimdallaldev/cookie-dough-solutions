import { ArrowRight, ExternalLink, MapPin, Star } from 'lucide-react'
import { Reveal } from '../Reveal'
import { ORDERING_APP_DEMO_URL, ORDERING_APP_PACK } from '../../data/ordering-app-pack'

const METRICS = [
  { value: '4.8★', label: 'Guest rating' },
  { value: '50+', label: 'Menu items' },
  { value: '30–45m', label: 'Delivery window' },
] as const

export function OrderingCaseStudy() {
  return (
    <section
      id="ordering-case-study"
      className="relative scroll-mt-32 border-y border-ink/8 bg-white py-20 md:py-28"
      aria-labelledby="ordering-case-study-heading"
    >
      <div className="pointer-events-none absolute inset-0 bg-oapp-mesh opacity-40" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-6 lg:px-10">
        <Reveal>
          <p className="font-oapp-body text-[11px] font-bold uppercase tracking-[0.28em] text-oapp-gold-light">
            Live client build
          </p>
          <h2
            id="ordering-case-study-heading"
            className="mt-4 font-oapp-display text-3xl font-bold tracking-tight text-oapp-cream md:text-4xl"
          >
            Al Maalem — charcoal grill ordering across Beirut
          </h2>
          <p className="mt-4 max-w-2xl font-oapp-body text-lg leading-relaxed text-oapp-muted">
            A mobile-first ordering app designed to Al Maalem&apos;s brand — their colors, menu,
            loyalty rules, and delivery zones — built and maintained by Cookie Dough Solutions. No
            marketplace middleman.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal delay={0.08}>
            <div className="relative overflow-hidden rounded-2xl border border-ink/8 shadow-editorial">
              <img
                src={ORDERING_APP_PACK.restaurant}
                alt="Al Maalem crispy chicken burger, flame-grilled — from the live menu"
                width={800}
                height={520}
                loading="lazy"
                decoding="async"
                className="aspect-[4/3] w-full object-cover"
              />
              <div
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent"
                aria-hidden
              />
              <div className="absolute bottom-4 left-4 right-4 flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-ink/75 px-3 py-1 font-oapp-body text-xs font-semibold text-white backdrop-blur-sm">
                  <MapPin className="h-3.5 w-3.5 text-oapp-gold-light" aria-hidden />
                  Haret Hreik, Beirut
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/20 bg-ink/75 px-3 py-1 font-oapp-body text-xs font-semibold text-white backdrop-blur-sm">
                  <Star className="h-3.5 w-3.5 fill-oapp-gold text-oapp-gold" aria-hidden />
                  4.8 guest rating
                </span>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <ul className="grid grid-cols-3 gap-4 border-b border-oapp-gold/15 pb-8">
              {METRICS.map(({ value, label }) => (
                <li key={label} className="text-center sm:text-left">
                  <p className="font-oapp-display text-2xl font-bold text-oapp-cream md:text-3xl">{value}</p>
                  <p className="mt-1 font-oapp-body text-[10px] font-semibold uppercase tracking-[0.16em] text-oapp-muted">
                    {label}
                  </p>
                </li>
              ))}
            </ul>

            <ul className="mt-8 space-y-4 font-oapp-body text-base leading-relaxed text-oapp-muted">
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oapp-tomato" aria-hidden />
                UI, photography, and tone matched to the restaurant — every build follows the
                client&apos;s brand, not a one-size template.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oapp-tomato" aria-hidden />
                Full menu with categories, chef picks, and bundle offers — guests customize every item.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oapp-tomato" aria-hidden />
                Loyalty points at checkout, saved preferences, and ops tools for rush-hour service.
              </li>
              <li className="flex gap-3">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-oapp-tomato" aria-hidden />
                Delivery across Beirut & Mount Lebanon with your brand front and center.
              </li>
            </ul>

            <div className="mt-10 flex flex-wrap gap-4">
              <a
                href={ORDERING_APP_DEMO_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full bg-oapp-tomato px-7 py-3 font-oapp-body text-sm font-semibold text-white shadow-oapp-glow transition hover:bg-oapp-tomato/90"
              >
                Order on Al Maalem
                <ExternalLink className="h-4 w-4" aria-hidden />
              </a>
              <a
                href="mailto:hello@cookiedough.app?subject=Custom%20ordering%20app"
                className="inline-flex min-h-11 cursor-pointer items-center gap-2 font-oapp-body text-sm font-semibold text-oapp-gold-light transition hover:text-oapp-cream"
              >
                Build yours
                <ArrowRight className="h-4 w-4" aria-hidden />
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
