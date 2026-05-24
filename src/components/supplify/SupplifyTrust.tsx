import { Lock, ShieldCheck, Users } from 'lucide-react'
import { StatNumber } from '../StatNumber'
import { Reveal } from '../Reveal'

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Safe by design',
    body: 'Every order, substitution, and delivery update lives in one auditable thread — not lost in group chats or buried in inboxes.',
  },
  {
    icon: Lock,
    title: 'Secure end to end',
    body: 'Role-based access, encrypted data, and permissions that match how your team actually works — from the kitchen to the warehouse.',
  },
  {
    icon: Users,
    title: 'Built for both sides',
    body: 'Restaurants order from live catalogs with confidence. Suppliers fulfill without guesswork. One connected platform — ordering, chat, reservations, and ops depth on both sides.',
  },
] as const

const STATS = [
  { target: 9, suffix: '', label: 'order events tracked end-to-end' },
  { target: 2, suffix: '', label: 'sides of the market, one platform' },
  { target: 100, suffix: '%', label: 'order visibility — no mystery status' },
] as const

export function SupplifyTrust() {
  return (
    <section className="relative overflow-hidden border-t border-white/[0.06] bg-[#0f0620]">
      <div className="pointer-events-none absolute inset-0 opacity-[0.05] supplify-grain" aria-hidden />

      {/* Stats band */}
      <div className="relative border-b border-white/[0.07]">
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 divide-y divide-white/[0.07] sm:grid-cols-3 sm:divide-x sm:divide-y-0 px-6 md:px-10 lg:px-14">
          {STATS.map(({ target, suffix, label }) => (
            <div
              key={label}
              className="flex flex-col items-start px-0 py-8 sm:px-6 sm:py-10 md:py-12 sm:first:pl-0 sm:last:pr-0"
            >
              <div className="flex items-baseline gap-0.5">
                <StatNumber
                  target={target}
                  suffix={suffix}
                  valueClassName="text-paper"
                  suffixClassName="text-supplify-light"
                  editorial
                />
              </div>
              <p className="mt-3 max-w-[20ch] font-sans text-xs leading-[1.65] text-dough-300/80 md:text-sm">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Trust points */}
      <div className="relative mx-auto grid max-w-[90rem] items-start gap-16 px-6 py-section md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:px-14 md:py-section-lg">
        <Reveal>
          <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-supplify-light/80">
            Safe · Secure · Trusted
          </p>
          <h2 className="mt-6 max-w-[18ch] font-display text-display-md font-bold text-paper">
            We fixed how restaurants order — and how suppliers fulfill.
          </h2>
          <p className="mt-8 max-w-xl font-sans text-base leading-[1.75] text-dough-200/90 md:text-lg">
            One live thread between kitchen and warehouse. Reservations, staff roles, supplier deals,
            order-tied chat with attachments — plus the full procurement stack operators on both sides
            actually need during rush.
          </p>
        </Reveal>

        <div className="space-y-10 lg:pt-4">
          {TRUST_POINTS.map((point, i) => (
            <Reveal key={point.title} delay={0.06 + i * 0.08}>
              <div className="flex gap-6 border-t border-white/10 pt-10 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-10">
                <point.icon
                  className="mt-1 h-6 w-6 shrink-0 text-supplify-light"
                  strokeWidth={1.5}
                  aria-hidden
                />
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold text-paper md:text-2xl">
                    {point.title}
                  </h3>
                  <p className="mt-3 font-sans text-base leading-[1.75] text-dough-200/85">
                    {point.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
