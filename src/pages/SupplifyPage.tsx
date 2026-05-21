import { ArrowRight, CheckCircle2, Lock } from 'lucide-react'
import { MockupStage } from '../components/art/MockupStage'
import { PillarSection } from '../components/art/PillarSection'
import { RotatingWords } from '../components/art/RotatingWords'
import { StatBand } from '../components/art/StatBand'
import { CtaScene, HeroScene } from '../components/HeroScene'
import { ParentCompanyBadge } from '../components/Logo'
import { Marquee } from '../components/Marquee'

const WE_ARE = ['Ordering', 'Trust', 'Calm'] as const

const PAIN = [
  'Orders buried in WhatsApp and phone calls',
  'Wrong items, missing deliveries, angry kitchens',
  'Spreadsheets nobody trusts by month-end',
  'Suppliers and restaurants out of sync',
]

export function SupplifyPage() {
  return (
    <>
      <HeroScene heroKey="supplify" tone="violet">
        <div className="mx-auto flex min-h-[min(100vh,900px)] max-w-6xl flex-col justify-end px-6 pb-28 pt-24 md:pb-32 md:pt-28">
          <ParentCompanyBadge inverted />
          <p className="mt-8 text-sm font-bold uppercase tracking-[0.35em] text-[#c4b5fd]">We are</p>
          <RotatingWords
            words={WE_ARE}
            className="mt-2 h-[0.9em] font-display text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl"
          />
          <h1 className="mt-8 max-w-3xl font-display text-3xl font-bold leading-snug text-white md:text-5xl">
            Supplify — calm ordering between restaurants &amp; suppliers.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-dough-300">
            A product of Cookie Dough Solutions. Safe, human-friendly, built for the kitchen and the
            warehouse.
          </p>
          <a
            href="#contact"
            className="mt-10 inline-flex w-fit items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#2d1654] transition hover:bg-dough-100"
          >
            Request a walkthrough
            <ArrowRight className="h-4 w-4" />
          </a>
        </div>
      </HeroScene>

      <section className="relative z-20 -mt-8 bg-dough-50 pb-16 pt-4 md:-mt-12">
        <div className="mx-auto max-w-5xl px-6">
          <MockupStage variant="orders" />
        </div>
      </section>

      <Marquee dark words={['one order', 'one truth', 'less stress', 'more service']} />

      <section className="bg-[#faf8ff] py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-12 px-6 lg:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#6d28d9]">Why it matters</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold text-[#1e0b3a] md:text-5xl">
              Ordering shouldn&apos;t be a second job.
            </h2>
            <p className="mt-6 text-lg text-slate-600">
              One missed message becomes a missing delivery. Supplify gives the industry one place
              everyone trusts.
            </p>
          </div>
          <ul className="space-y-3">
            {PAIN.map((item) => (
              <li
                key={item}
                className="flex gap-3 rounded-xl border border-violet-100 bg-white p-5 shadow-sm"
              >
                <span className="font-bold text-red-400">✕</span>
                <span className="font-medium text-slate-700">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PillarSection
        num="01"
        tag="Ordering"
        title="Place orders in minutes"
        subtitle="See what’s available, what’s on deal, and what’s in the cart — before anyone picks up the phone."
        points={['Supplier catalogs', 'Smart carts', 'Standing orders', 'Clear pricing']}
        mockVariant="orders"
      />

      <PillarSection
        num="02"
        tag="Fulfillment"
        title="Fulfill with confidence"
        subtitle="One queue: pick, pack, ship, invoice — with status everyone can see."
        points={['Fulfillment queue', 'On-time tracking', 'Invoices', 'Visibility']}
        mockVariant="supplier"
        invert
        dark
      />

      <PillarSection
        num="03"
        tag="Restaurant"
        title="Run the floor"
        subtitle="Spend, deliveries, and messages — without digging through inboxes."
        points={['Dashboard KPIs', 'Delivery tracking', 'Order chat', 'Spend control']}
        mockVariant="restaurant"
      />

      <section className="bg-[#1a0a2e] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold">
              <Lock className="h-4 w-4 text-[#c4b5fd]" />
              Safe for every side
            </div>
            <h2 className="font-display text-3xl font-extrabold md:text-5xl">
              Everyone in their own protected space.
            </h2>
            <p className="mt-6 text-lg text-dough-300">
              Restaurants, suppliers, and HQ each get a private lane — no security jargon required.
            </p>
            <ul className="mt-8 space-y-3">
              {[
                'Staff sign in with roles that match their job',
                'Suppliers only see their customers and orders',
                'HQ oversees without micromanaging every click',
              ].map((line) => (
                <li key={line} className="flex gap-3 text-dough-200">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#a78bfa]" />
                  {line}
                </li>
              ))}
            </ul>
          </div>
          <MockupStage variant="inbox" />
        </div>
      </section>

      <StatBand
        headline="The ordering problem is solvable."
        stats={[
          { value: 96, suffix: '%', label: 'On-time target' },
          { value: 3, suffix: '', label: 'Steps to calm supply' },
          { value: 1, suffix: '', label: 'Platform for both sides' },
        ]}
      />

      <CtaScene imageKey="kitchen">
        <div className="mx-auto max-w-2xl px-6 text-center text-white">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-dough-400">Cookie Dough Solutions</p>
          <h2 className="mt-4 font-display text-4xl font-extrabold">Ready to see Supplify?</h2>
          <a
            id="contact"
            href="mailto:hello@cookiedough.app"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-bold text-[#2d1654] transition hover:bg-dough-100"
          >
            hello@cookiedough.app
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </CtaScene>
    </>
  )
}
