import { Lock, ShieldCheck, Users } from 'lucide-react'
import { StatNumber } from '../StatNumber'
import { Reveal } from '../Reveal'
import { SupplifyEyebrow } from './shared'

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
  { target: 14, suffix: '+', label: 'core modules live today' },
  { target: 5, suffix: '', label: 'portals — restaurant, supplier, driver, staff, consumer' },
  { target: 100, suffix: '%', label: 'order visibility — no mystery status' },
] as const

export function SupplifyTrust() {
  return (
    <section
      data-theme="light"
      className="relative overflow-hidden border-t border-ink/8 bg-paper"
    >
      <div className="pointer-events-none absolute inset-0 section-noise" aria-hidden />

      <div className="relative border-b border-ink/8">
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 divide-y divide-ink/8 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10 lg:px-14">
          {STATS.map(({ target, suffix, label }) => (
            <div
              key={label}
              className="flex flex-col items-start px-0 py-8 sm:px-6 sm:py-10 md:py-12 sm:first:pl-0 sm:last:pr-0"
            >
              <div className="flex items-baseline gap-0.5">
                <StatNumber
                  target={target}
                  suffix={suffix}
                  valueClassName="text-supplify-ink"
                  suffixClassName="text-supplify"
                  editorial
                />
              </div>
              <p className="mt-3 max-w-[22ch] font-sans text-xs leading-[1.65] text-ink-muted md:text-sm">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[90rem] items-start gap-16 px-6 py-section md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-24 lg:px-14 md:py-section-lg">
        <Reveal>
          <SupplifyEyebrow theme="light">Safe · Secure · Trusted</SupplifyEyebrow>
          <h2 className="mt-6 max-w-[18ch] font-display text-display-md font-bold text-supplify-ink">
            We fixed how restaurants order — and how suppliers fulfill.
          </h2>
          <p className="mt-8 max-w-xl font-sans text-base leading-[1.75] text-ink-muted md:text-lg">
            One live thread between kitchen and warehouse. Reservations, staff roles, supplier deals,
            order-tied chat with attachments — plus the full procurement stack operators on both sides
            actually need during rush.
          </p>
        </Reveal>

        <div className="space-y-10 lg:pt-4">
          {TRUST_POINTS.map((point, i) => (
            <Reveal key={point.title} delay={0.06 + i * 0.08}>
              <div className="group flex gap-6 border-t border-ink/8 pt-10 first:border-t-0 first:pt-0 lg:first:border-t lg:first:pt-10">
                <span className="mt-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-supplify/10 ring-1 ring-supplify/20 transition-[background-color,box-shadow] duration-300 group-hover:bg-supplify/15 group-hover:shadow-[0_0_24px_-6px_rgba(109,94,247,0.35)]">
                  <point.icon
                    className="h-5 w-5 text-supplify"
                    strokeWidth={1.75}
                    aria-hidden
                  />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold text-supplify-ink md:text-2xl">
                    {point.title}
                  </h3>
                  <p className="mt-3 font-sans text-base leading-[1.75] text-ink-muted">
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
