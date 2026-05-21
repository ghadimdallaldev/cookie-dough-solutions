import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ManifestoSection } from '../components/ManifestoSection'
import { ProductCard } from '../components/ProductCard'
import { Reveal } from '../components/Reveal'
import { ScrollIndicator } from '../components/ScrollIndicator'
import { MockupStage } from '../components/art/MockupStage'
import { PillarSection } from '../components/art/PillarSection'
import { StatBand } from '../components/art/StatBand'
import { HeroScene } from '../components/HeroScene'
import { Marquee } from '../components/Marquee'

const HERO_LINES = ['We build the', 'tools that', 'move food.']

export function HomePage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroScene heroKey="cookieDough" tone="warm">
        <div className="mx-auto flex min-h-[min(100vh,900px)] max-w-6xl flex-col justify-end px-6 pb-28 pt-24 md:pb-36 md:pt-28">
          <Reveal delay={0.1}>
            <p className="font-mono text-xs font-semibold uppercase tracking-[0.3em] text-dough-400">
              Studio · Est. 2024 · Beirut
            </p>
          </Reveal>

          <div className="mt-4">
            {HERO_LINES.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  className="font-display font-extrabold leading-[0.92] tracking-tight text-white"
                  style={{ fontSize: 'clamp(3.2rem, 10vw, 8rem)' }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.25 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          <Reveal delay={0.65} className="mt-8 max-w-xl">
            <p className="text-lg leading-relaxed text-dough-200/90">
              <strong className="text-white">Cookie Dough Solutions</strong> is the parent company
              behind{' '}
              <strong className="text-[#c4b5fd]">Supplify</strong> — calm ordering between
              restaurants and suppliers.
            </p>
          </Reveal>

          <Reveal delay={0.8} className="mt-10 flex flex-wrap gap-4">
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
          </Reveal>
        </div>
        <ScrollIndicator />
      </HeroScene>

      {/* ── Marquee ── */}
      <Marquee words={['order calmly', 'reserve tables', 'dispatch drivers', 'manage staff', 'kill chaos', 'move food']} />

      {/* ── Who We Are ── */}
      <section className="bg-dough-50 py-20 md:py-28">
        <div className="mx-auto grid max-w-6xl gap-14 px-6 md:grid-cols-2 md:items-center">
          <div>
            <Reveal>
              <p className="text-xs font-bold uppercase tracking-[0.3em] text-dough-600">Who we are</p>
            </Reveal>
            <Reveal delay={0.1} clip className="mt-4">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
                Trusted partner for restaurants &amp; suppliers.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg leading-relaxed text-dough-700">
                Warm product design with serious engineering — so operators thrive without becoming
                IT specialists.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <a
                href="#contact"
                className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-chip hover:text-dough-800"
              >
                Contact us <ArrowRight className="h-4 w-4" />
              </a>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="animate-float">
              <MockupStage variant="restaurant" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Manifesto ── */}
      <ManifestoSection text="We build calm tools for a chaotic industry." />

      {/* ── Products ── */}
      <section className="bg-dough-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-dough-600">
              Our Products
            </p>
          </Reveal>
          <Reveal delay={0.1} clip className="mt-3">
            <h2 className="font-display text-3xl font-extrabold tracking-tight text-ink md:text-5xl">
              Software built for the real world.
            </h2>
          </Reveal>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <Reveal delay={0.15}>
              <ProductCard
                name="Supplify"
                tagline="Flagship product"
                description="Ordering, reservations, fulfillment, staff, chat, disputes — the complete operating layer for restaurants and their suppliers."
                to="/supplify"
                cta="Explore Supplify"
                variant="orders"
                accentColor="#7c3aed"
              />
            </Reveal>
            <Reveal delay={0.25}>
              <div className="flex min-h-[200px] flex-col justify-center rounded-2xl border-2 border-dashed border-dough-300 p-10 text-center">
                <p className="font-display text-2xl font-extrabold text-dough-400">Next product</p>
                <p className="mt-2 text-sm font-semibold text-dough-500">Coming 2025 — stay tuned</p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── Pillars ── */}
      <PillarSection
        num="01"
        tag="Restaurants"
        title="Order. Reserve. Receive."
        subtitle="Browse supplier catalogs, build smart carts, manage your floor with a drag-and-drop reservation cockpit, and receive deliveries with quality control — all without leaving the app."
        points={['Multi-supplier ordering', 'Reservations & floor builder', 'Quick lists & reorder', 'Receiving & QC']}
        mockVariant="catalog"
      />

      <PillarSection
        num="02"
        tag="Suppliers"
        title="Fulfill. Dispatch. Get paid."
        subtitle="One console handles every inbound order — pick, pack, assign drivers, track routes, send invoices, and push promotions to your restaurant customers."
        points={['Driver dispatch', 'Pick lists & routes', 'Invoices & payments', 'Deals & promotions']}
        mockVariant="supplier"
        invert
        dark
      />

      <PillarSection
        num="03"
        tag="Platform"
        title="Staff. Chat. Secure."
        subtitle="Role-based access for every team member, built-in messaging that replaces WhatsApp, and enterprise SSO so no one ever has access they shouldn't."
        points={['Staff & role management', 'Built-in supplier chat', 'SSO authentication', 'Dispute resolution']}
        mockVariant="restaurant"
      />

      {/* ── Stats ── */}
      <StatBand
        headline="Software that respects your team's time."
        stats={[
          { value: 14, suffix: '+', label: 'Feature modules' },
          { value: 2, suffix: '', label: 'Sides of the market' },
          { value: 100, suffix: '%', label: 'Ops-first mindset' },
        ]}
        markets={['Lebanon', 'UAE', 'KSA', 'EU', 'North America']}
      />

      {/* ── Dark Marquee ── */}
      <Marquee dark words={['order calmly', 'trust suppliers', 'skip chaos', 'run kitchens']} />

      {/* ── Contact ── */}
      <section id="contact" className="scroll-mt-24 bg-dough-100 py-20 md:py-28">
        <div className="mx-auto max-w-2xl px-6 text-center">
          <Reveal clip>
            <h2 className="font-display text-4xl font-extrabold text-ink">
              Loving the Cookie Dough energy?
            </h2>
          </Reveal>
          <Reveal delay={0.15}>
            <p className="mt-4 text-lg text-dough-700">
              Partner on Supplify or what we build next.
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <a
              href="mailto:hello@cookiedough.app"
              className="group mt-10 inline-flex items-center gap-2 rounded-full bg-ink px-10 py-4 text-lg font-bold text-white transition hover:bg-chip"
            >
              hello@cookiedough.app
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  )
}
