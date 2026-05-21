import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { MockupStage } from '../components/art/MockupStage'
import { PillarSection } from '../components/art/PillarSection'
import { RotatingWords } from '../components/art/RotatingWords'
import { StatBand } from '../components/art/StatBand'
import { HeroScene } from '../components/HeroScene'
import { Marquee } from '../components/Marquee'

const WE_ARE = ['Solutions', 'Operators', 'Supply'] as const

export function HomePage() {
  return (
    <>
      <HeroScene heroKey="cookieDough" tone="warm">
        <div className="mx-auto flex min-h-[min(100vh,900px)] max-w-6xl flex-col justify-end px-6 pb-28 pt-24 md:pb-32 md:pt-28">
          <p className="text-sm font-bold uppercase tracking-[0.35em] text-dough-300">We are</p>
          <RotatingWords
            words={WE_ARE}
            className="mt-2 h-[0.9em] font-display text-5xl font-extrabold tracking-tight text-white sm:text-7xl md:text-8xl"
          />
          <h1 className="mt-8 max-w-3xl text-balance font-display text-3xl font-bold leading-snug text-dough-100 md:text-5xl">
            A fully customized software studio
            <br />
            <span className="text-dough-300">built for food &amp; beverage.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-dough-200/95">
            <strong className="text-white">Cookie Dough Solutions</strong> is the parent company behind{' '}
            <strong className="text-[#c4b5fd]">Supplify</strong> — calm ordering between restaurants and
            suppliers.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/supplify"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-ink shadow-lg transition hover:bg-dough-100"
            >
              Explore Supplify
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/35 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              Contact us
            </a>
          </div>
        </div>
      </HeroScene>

      {/* Solid block — mockup sits on cream, not over the hero photo */}
      <section className="relative z-20 -mt-8 bg-dough-50 pb-16 pt-4 md:-mt-12 md:pb-20">
        <div className="mx-auto max-w-5xl px-6">
          <MockupStage variant="restaurant" />
        </div>
      </section>

      <Marquee />

      <section className="bg-white py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:items-center">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-dough-600">Who we are</p>
            <h2 className="mt-4 font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
              Trusted partner for restaurants &amp; suppliers.
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-dough-700">
              Warm product design with serious engineering — so operators thrive without becoming IT
              specialists.
            </p>
            <a
              href="#contact"
              className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-chip hover:text-dough-800"
            >
              Contact us <ArrowRight className="h-4 w-4" />
            </a>
          </div>
          <MockupStage variant="orders" />
        </div>
      </section>

      <PillarSection
        num="01"
        tag="B2B ordering"
        title="Customer experience"
        subtitle="Restaurants browse supplier catalogs, build carts, and place orders — with the ease your team expects from consumer apps."
        points={['Multi-supplier carts', 'Quick lists & reorder', 'Mobile-ready', 'Role-based access']}
        mockVariant="orders"
      />

      <PillarSection
        num="02"
        tag="Operations"
        title="Fulfillment & receiving"
        subtitle="Suppliers fulfill from one console; restaurants receive and reconcile — no spreadsheet archaeology."
        points={['Pick & pack', 'Receiving', 'Invoices', 'Branch-aware']}
        mockVariant="supplier"
        invert
        dark
      />

      <PillarSection
        num="03"
        tag="Intelligence"
        title="Insights & control"
        subtitle="Spend, open orders, and supplier relationships at a glance."
        points={['Dashboards', 'Usage visibility', 'Secure roles', 'Audit-ready']}
        mockVariant="restaurant"
      />

      <section className="bg-ink py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#c4b5fd]">
              A Cookie Dough Solutions product
            </p>
            <h2 className="mt-4 font-display text-4xl font-extrabold md:text-5xl">Supplify</h2>
            <p className="mt-6 text-lg leading-relaxed text-dough-300">
              The ordering bridge between restaurants and suppliers — browse, order, receive, and pay
              in one calm place.
            </p>
            <Link
              to="/supplify"
              className="mt-10 inline-flex items-center gap-2 rounded-full bg-[#7c3aed] px-8 py-3.5 text-sm font-bold text-white transition hover:bg-[#6d28d9]"
            >
              See Supplify
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <MockupStage variant="inbox" />
        </div>
      </section>

      <StatBand
        headline="Co-piloting the future of food supply."
        stats={[
          { value: 1, suffix: '+', label: 'Flagship product' },
          { value: 3, suffix: '+', label: 'Sides of the market' },
          { value: 100, suffix: '%', label: 'Ops-first mindset' },
        ]}
        markets={['Lebanon', 'UAE', 'KSA', 'EU', 'North America']}
      />

      <Marquee dark words={['order calmly', 'trust suppliers', 'skip chaos', 'run kitchens']} />

      <section id="contact" className="scroll-mt-24 bg-dough-100 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <h2 className="font-display text-4xl font-extrabold text-ink">Loving the Cookie Dough energy?</h2>
          <p className="mt-4 text-lg text-dough-700">Partner on Supplify or what we build next.</p>
          <a
            href="mailto:hello@cookiedough.app"
            className="mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-10 py-4 text-lg font-bold text-white transition hover:bg-chip"
          >
            hello@cookiedough.app
            <ArrowRight className="h-5 w-5" />
          </a>
        </div>
      </section>
    </>
  )
}
