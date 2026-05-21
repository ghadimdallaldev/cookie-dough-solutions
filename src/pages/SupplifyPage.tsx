import { motion, useInView } from 'framer-motion'
import { ArrowRight, CheckCircle2, MessageSquare, Shield, Users, Zap } from 'lucide-react'
import { useRef } from 'react'
import { MockupStage } from '../components/art/MockupStage'
import { StatBand } from '../components/art/StatBand'
import { CtaScene, HeroScene } from '../components/HeroScene'
import { ParentCompanyBadge } from '../components/Logo'
import { ManifestoSection } from '../components/ManifestoSection'
import { Marquee } from '../components/Marquee'
import { Reveal } from '../components/Reveal'
import { ScrollIndicator } from '../components/ScrollIndicator'

const HERO_LINES = ['Not your', "father's ERP."]

type FeatureCardProps = {
  label: string
  title: string
  description: string
  variant: string
  accent?: string
  tags?: string[]
}

function FeatureCard({ label, title, description, variant, accent = '#7c3aed', tags = [] }: FeatureCardProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
      className="group flex flex-col overflow-hidden rounded-2xl border border-dough-200/80 bg-white shadow-sm"
    >
      <div className="p-6 pb-3">
        <span className="text-xs font-bold uppercase tracking-[0.25em]" style={{ color: accent }}>
          {label}
        </span>
        <h3 className="mt-2 font-display text-xl font-extrabold text-ink">{title}</h3>
        <p className="mt-2 text-sm leading-relaxed text-dough-700">{description}</p>
        {tags.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-1.5">
            {tags.map((t) => (
              <span
                key={t}
                className="rounded-full px-2.5 py-0.5 text-[11px] font-semibold"
                style={{ backgroundColor: `${accent}12`, color: accent }}
              >
                {t}
              </span>
            ))}
          </div>
        )}
      </div>
      <div className="mt-auto p-4 pt-2">
        <MockupStage variant={variant} />
      </div>
    </motion.div>
  )
}

export function SupplifyPage() {
  return (
    <>
      {/* ── Hero ── */}
      <HeroScene heroKey="supplify" tone="violet">
        <div className="mx-auto flex min-h-[min(100vh,900px)] max-w-6xl flex-col justify-end px-6 pb-28 pt-24 md:pb-36 md:pt-28">
          <Reveal delay={0.05}>
            <ParentCompanyBadge inverted />
          </Reveal>

          <div className="mt-8">
            {HERO_LINES.map((line, i) => (
              <div key={line} className="overflow-hidden">
                <motion.h1
                  className="font-display font-extrabold leading-[0.9] tracking-tight text-white"
                  style={{ fontSize: 'clamp(3.5rem, 11vw, 9rem)' }}
                  initial={{ y: '110%' }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.2 + i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  {line}
                </motion.h1>
              </div>
            ))}
          </div>

          <Reveal delay={0.5} className="mt-8 max-w-2xl">
            <p className="text-xl leading-relaxed text-dough-300">
              From the first order to the last delivery — Supplify replaces WhatsApp, spreadsheets,
              and phone calls with one intelligent platform. Built for restaurants and their suppliers.
            </p>
          </Reveal>

          <Reveal delay={0.7} className="mt-10 flex flex-wrap gap-4">
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full bg-white px-8 py-3.5 text-sm font-bold text-[#2d1654] transition hover:bg-dough-100"
            >
              Request a walkthrough
              <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#features"
              className="inline-flex items-center gap-2 rounded-full border-2 border-white/25 px-8 py-3.5 text-sm font-bold text-white transition hover:bg-white/10"
            >
              See all features
            </a>
          </Reveal>
        </div>
        <ScrollIndicator />
      </HeroScene>

      {/* ── Hero mockup — warm transition ── */}
      <section className="relative z-20 -mt-8 bg-dough-50 pb-0 pt-6 md:-mt-12">
        <div className="mx-auto max-w-5xl px-6">
          <Reveal>
            <MockupStage variant="orders" />
          </Reveal>
        </div>
      </section>

      {/* ── Marquee ── */}
      <Marquee dark words={['smart ordering', 'floor management', 'driver dispatch', 'staff control', 'live chat', 'zero chaos']} />

      {/* ── Manifesto ── */}
      <ManifestoSection text="The operating system food businesses actually want." />

      {/* ── Capabilities intro — warm ── */}
      <section className="bg-dough-100 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-supplify">
              The full platform
            </p>
          </Reveal>
          <Reveal delay={0.1} clip className="mt-4">
            <h2 className="max-w-3xl font-display text-4xl font-extrabold tracking-tight text-ink md:text-6xl">
              One login. Every tool your operation runs on.
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-6 max-w-2xl">
            <p className="text-lg text-dough-700">
              Supplify covers the entire journey — from the moment a chef browses a supplier catalog
              to the second a driver marks a delivery complete. Both sides of the market. One platform.
            </p>
          </Reveal>

          <div className="mt-14 grid grid-cols-2 gap-4 sm:grid-cols-4">
            {[
              { icon: Zap, label: 'Smart Ordering', sub: 'Catalog → Cart → Delivered', color: '#7c3aed' },
              { icon: Users, label: 'Staff & Roles', sub: 'Everyone in their lane', color: '#d97706' },
              { icon: MessageSquare, label: 'Built-in Chat', sub: 'No more WhatsApp', color: '#059669' },
              { icon: Shield, label: 'Enterprise Security', sub: 'SSO · RBAC · Audit logs', color: '#dc2626' },
            ].map(({ icon: Icon, label, sub, color }, i) => (
              <Reveal key={label} delay={i * 0.08}>
                <div className="rounded-2xl border border-dough-200 bg-white p-6 shadow-sm">
                  <Icon className="h-6 w-6" style={{ color }} />
                  <p className="mt-3 font-display text-lg font-extrabold text-ink">{label}</p>
                  <p className="mt-1 text-sm text-dough-600">{sub}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── Feature Grid — warm cream ── */}
      <section id="features" className="scroll-mt-20 bg-dough-50 py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-supplify">Features</p>
          </Reveal>
          <Reveal delay={0.1} clip className="mt-4">
            <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
              Built for both sides of the table.
            </h2>
          </Reveal>

          {/* Restaurant Features */}
          <div className="mt-16">
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px flex-1 max-w-8 bg-supplify/40" />
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-supplify">
                  For restaurants
                </p>
              </div>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                label="Ordering"
                title="Browse, build, order."
                description="Search supplier catalogs, compare prices, add to cart and place orders in minutes — not phone calls."
                variant="catalog"
                tags={['Multi-supplier', 'Price comparison', 'Standing orders']}
              />
              <FeatureCard
                label="Reservations"
                title="Your floor, your rules."
                description="Full reservations cockpit with drag-and-drop floor builder, waitlist queue, live seating status, and a shareable booking link for guests."
                variant="reservations"
                accent="#d97706"
                tags={['Floor builder', 'Waitlist', 'Booking link', 'Live status']}
              />
              <FeatureCard
                label="Quick Lists"
                title="Reorder in one tap."
                description="Save your regular order templates. Schedule them. Never type the same items twice."
                variant="quick-lists"
                tags={['Recurring orders', 'Scheduled', 'Templates']}
              />
              <FeatureCard
                label="Receiving"
                title="Check every delivery."
                description="Receiving & quality control queue — accept, flag short deliveries, or open a dispute directly from the app."
                variant="inbox"
                tags={['Quality control', 'Receiving history', 'Disputes']}
              />
              <FeatureCard
                label="Orders Inbox"
                title="Track every status."
                description="One inbox for all your orders. New, processing, shipped, completed — with one-click packing slip downloads."
                variant="restaurant-orders"
                tags={['Status tracking', 'Packing slips', 'Order history']}
              />
              <FeatureCard
                label="Order Calendar"
                title="The big picture."
                description="Visualize deliveries, payments, and orders across all your branches on one calendar. Filter by supplier, branch, or category."
                variant="order-calendar"
                tags={['Calendar view', 'Multi-branch', 'Payment tracking']}
              />
            </div>
          </div>

          {/* Supplier Features */}
          <div className="mt-20">
            <Reveal>
              <div className="mb-8 flex items-center gap-3">
                <span className="h-px flex-1 max-w-8 bg-[#059669]/40" />
                <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#059669]">
                  For suppliers
                </p>
              </div>
            </Reveal>
            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              <FeatureCard
                label="Orders Inbox"
                title="All orders. One queue."
                description="Inbound orders from all your restaurant customers in one place. Acknowledge, process, mark shipped — with full item detail."
                variant="supplier-orders"
                accent="#059669"
                tags={['Inbound orders', 'Bulk actions', 'Status management']}
              />
              <FeatureCard
                label="Fulfillment"
                title="From warehouse to door."
                description="Driver dispatch kanban, pick lists, delivery routes, and live tracking — all in a single fulfillment console."
                variant="supplier"
                accent="#059669"
                tags={['Driver dispatch', 'Pick lists', 'Route planning', 'Live tracking']}
              />
              <FeatureCard
                label="Product Catalog"
                title="Your catalog, live."
                description="Manage products, pricing, stock levels, and categories. Restaurants see exactly what's available and at what price."
                variant="supplier-products"
                accent="#059669"
                tags={['SKU management', 'Live pricing', 'Stock levels', 'Bulk upload']}
              />
              <FeatureCard
                label="Promotions & Deals"
                title="Push deals that move product."
                description="Create percentage discounts, buy X get Y promotions, or free delivery offers — auto-applied at restaurant checkout."
                variant="supplier-deals"
                accent="#059669"
                tags={['% Discounts', 'BOGO deals', 'Free shipping', 'Auto-apply']}
              />
              <FeatureCard
                label="Disputes"
                title="Resolve. Don't argue."
                description="Restaurants open disputes on wrong items, short deliveries, or damaged goods. You review, resolve, or reject — all in-app."
                variant="disputes"
                accent="#059669"
                tags={['Wrong items', 'Short delivery', 'Damaged goods', 'Resolution']}
              />
              <FeatureCard
                label="Analytics"
                title="Revenue at a glance."
                description="Track revenue trends, top restaurant customers, and order volume over time. Export CSV for your accountant."
                variant="orders"
                accent="#059669"
                tags={['Revenue trends', 'Top customers', 'Order volume', 'CSV export']}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Staff & Chat — dark ink ── */}
      <section className="bg-ink py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid gap-16 lg:grid-cols-2">
            {/* Staff */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#a78bfa]/30 bg-[#7c3aed]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#c4b5fd]">
                  <Users className="h-3.5 w-3.5" /> Staff management
                </span>
              </Reveal>
              <Reveal delay={0.1} clip className="mt-5">
                <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
                  Everyone sees exactly what they should.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-4 text-lg text-dough-400">
                  Managers, chefs, and front-of-house staff each get a role-matched view. No accidental
                  access to invoices. No supplier seeing a competitor's pricing.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <ul className="mt-8 space-y-3">
                  {[
                    'Role-based access for restaurant staff',
                    'Approval workflows for orders above a threshold',
                    'Branch-level isolation for multi-location groups',
                    'Activity logs for full accountability',
                    'SSO via Keycloak — no password reuse',
                  ].map((line) => (
                    <li key={line} className="flex gap-3 text-dough-300">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#a78bfa]" />
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>

            {/* Chat */}
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#34d399]/30 bg-[#059669]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#34d399]">
                  <MessageSquare className="h-3.5 w-3.5" /> Built-in chat
                </span>
              </Reveal>
              <Reveal delay={0.1} clip className="mt-5">
                <h2 className="font-display text-3xl font-extrabold text-white md:text-4xl">
                  Kill the WhatsApp group. For good.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-4 text-lg text-dough-400">
                  Every restaurant-supplier relationship has its own chat thread. Messages are linked
                  to orders. No context lost, no screenshots, no confusion.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <ul className="mt-8 space-y-3">
                  {[
                    'Per-supplier conversation threads',
                    'Order-linked messages — always in context',
                    'Restaurants message any of their suppliers',
                    'Suppliers respond from their own inbox',
                    'No external apps required',
                  ].map((line) => (
                    <li key={line} className="flex gap-3 text-dough-300">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#34d399]" />
                      {line}
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* ── Reservations spotlight — warm violet tint ── */}
      <section className="bg-[#faf8ff] py-20 md:py-28">
        <div className="mx-auto max-w-6xl px-6">
          <div className="grid items-center gap-14 lg:grid-cols-2">
            <div>
              <Reveal>
                <span className="inline-flex items-center gap-2 rounded-full border border-[#f59e0b]/40 bg-[#f59e0b]/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.25em] text-[#b45309]">
                  ✦ Spotlight feature
                </span>
              </Reveal>
              <Reveal delay={0.1} clip className="mt-5">
                <h2 className="font-display text-4xl font-extrabold tracking-tight text-ink md:text-5xl">
                  A full reservations cockpit.
                </h2>
              </Reveal>
              <Reveal delay={0.2}>
                <p className="mt-5 text-lg leading-relaxed text-dough-700">
                  Most ERPs manage the back office. Supplify also manages the front — with a
                  drag-and-drop floor builder, live seating board, and a public booking link you
                  can share with guests immediately.
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <ul className="mt-8 space-y-4">
                  {[
                    { title: 'Floor builder', desc: 'Drag-and-drop tables, booths, bars & banquettes on a virtual floor' },
                    { title: 'Live seating board', desc: 'Kanban view — Pending → Confirmed → Seated → Waitlist' },
                    { title: 'Shareable booking link', desc: 'One URL guests use to check availability and confirm' },
                    { title: 'Waitlist queue', desc: 'Auto-promotion when a table frees up, with timed offer' },
                  ].map(({ title, desc }) => (
                    <li key={title} className="flex gap-4">
                      <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-[#d97706]" />
                      <div>
                        <p className="font-semibold text-ink">{title}</p>
                        <p className="text-sm text-dough-600">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </Reveal>
            </div>
            <Reveal delay={0.2}>
              <div className="animate-float">
                <MockupStage variant="reservations" />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <Marquee dark words={['one order', 'one truth', 'less stress', 'more service', 'zero spreadsheets']} />

      {/* ── Security — dark violet ── */}
      <section className="bg-[#1a0a2e] py-20 text-white md:py-28">
        <div className="mx-auto grid max-w-6xl items-center gap-14 px-6 md:grid-cols-2">
          <div>
            <Reveal>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-sm font-semibold text-dough-300">
                <Shield className="h-4 w-4 text-[#c4b5fd]" />
                Enterprise-grade security
              </div>
            </Reveal>
            <Reveal delay={0.1} clip>
              <h2 className="font-display text-3xl font-extrabold md:text-5xl">
                Everyone in their own protected space.
              </h2>
            </Reveal>
            <Reveal delay={0.2}>
              <p className="mt-6 text-lg text-dough-300">
                Restaurants, suppliers, staff, and HQ each operate in isolated lanes.
                Enterprise SSO, role-based access control, and full audit logs — without the
                enterprise price tag.
              </p>
            </Reveal>
            <Reveal delay={0.3}>
              <ul className="mt-8 space-y-3">
                {[
                  'SSO authentication — one org-wide identity',
                  'Suppliers only see their own customers and orders',
                  'Staff access matches job title — not admin intuition',
                  'HQ oversees all branches without micromanaging',
                  'Dispute trails and order history never deleted',
                ].map((line) => (
                  <li key={line} className="flex gap-3 text-dough-200">
                    <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-[#a78bfa]" />
                    {line}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
          <Reveal delay={0.2}>
            <div className="animate-float">
              <MockupStage variant="inbox" />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── Stats ── */}
      <StatBand
        headline="The numbers behind the calm."
        stats={[
          { value: 96, suffix: '%', label: 'On-time target' },
          { value: 14, suffix: '+', label: 'Feature modules' },
          { value: 2, suffix: '', label: 'Sides of the market' },
        ]}
      />

      {/* ── CTA ── */}
      <CtaScene imageKey="kitchen">
        <div className="mx-auto max-w-2xl px-6 text-center text-white">
          <Reveal>
            <p className="text-xs font-bold uppercase tracking-[0.3em] text-dough-400">
              Cookie Dough Solutions
            </p>
          </Reveal>
          <Reveal delay={0.1} clip className="mt-4">
            <h2 className="font-display text-4xl font-extrabold md:text-5xl">
              Ready to see it live?
            </h2>
          </Reveal>
          <Reveal delay={0.2} className="mt-5">
            <p className="text-lg text-dough-300">
              We'll walk you through every module — ordering, reservations, fulfillment, staff,
              and beyond.
            </p>
          </Reveal>
          <Reveal delay={0.3} className="mt-10">
            <a
              id="contact"
              href="mailto:hello@cookiedough.app"
              className="group inline-flex items-center gap-2 rounded-full bg-white px-10 py-4 text-lg font-bold text-[#2d1654] transition hover:bg-dough-100"
            >
              hello@cookiedough.app
              <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
            </a>
          </Reveal>
        </div>
      </CtaScene>
    </>
  )
}
