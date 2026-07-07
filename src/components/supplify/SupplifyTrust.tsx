import { Lock, ShieldCheck, Sparkles, Users } from 'lucide-react'
import { StatNumber } from '../StatNumber'
import { Reveal } from '../Reveal'
import { SupplifyEyebrow } from './shared'

const TRUST_POINTS = [
  {
    icon: ShieldCheck,
    title: 'Safe by design',
    body: 'Every order, substitution, delivery update, email, and WhatsApp message lives in one auditable thread, not lost in group chats or buried in inboxes.',
  },
  {
    icon: Lock,
    title: 'Secure end to end',
    body: 'Role-based access, encrypted data, and permissions that match how your team actually works, from the kitchen to the warehouse.',
  },
  {
    icon: Users,
    title: 'Built for both sides',
    body: 'Restaurants order from live catalogs with confidence. Suppliers fulfill without guesswork. One connected platform for both sides.',
  },
] as const

const STATS = [
  { target: 14, suffix: '+', label: 'core modules live today' },
  { target: 5, suffix: '', label: 'role-specific portals' },
  { target: 100, suffix: '%', label: 'order visibility' },
] as const

export function SupplifyTrust() {
  return (
    <section data-theme="light" className="relative overflow-hidden border-t border-supplify-border bg-white">
      <div className="pointer-events-none absolute inset-0 section-noise" aria-hidden />

      <div className="relative border-b border-supplify-border bg-supplify-ink text-white">
        <div className="mx-auto grid max-w-[90rem] grid-cols-1 divide-y divide-white/10 px-6 sm:grid-cols-3 sm:divide-x sm:divide-y-0 md:px-10 lg:px-14">
          {STATS.map(({ target, suffix, label }) => (
            <div key={label} className="flex flex-col items-start px-0 py-8 sm:px-6 sm:py-10 md:py-12 sm:first:pl-0 sm:last:pr-0">
              <div className="flex items-baseline gap-0.5">
                <StatNumber target={target} suffix={suffix} valueClassName="text-white" suffixClassName="text-supplify-light" editorial />
              </div>
              <p className="mt-3 max-w-[22ch] font-sans text-xs font-medium uppercase tracking-[0.12em] leading-[1.65] text-white/64 md:text-sm">
                {label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative mx-auto grid max-w-[90rem] items-start gap-12 px-6 py-section md:px-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-20 lg:px-14 md:py-section-lg">
        <Reveal>
          <SupplifyEyebrow>Safe. Secure. Trusted.</SupplifyEyebrow>
          <h2 className="mt-6 max-w-[18ch] font-display text-display-md font-bold text-supplify-ink">
            Enterprise-grade control without enterprise-grade friction.
          </h2>
          <p className="mt-8 max-w-xl font-sans text-base leading-[1.75] text-supplify-secondary md:text-lg">
            One live thread between kitchen and warehouse. Supplify sends email and WhatsApp notifications for key updates, while reservations, staff roles, supplier deals, and order-tied chat stay attached to the operational record.
          </p>
          <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-supplify-border bg-supplify-mist px-4 py-2 font-sans text-sm font-semibold text-supplify-secondary shadow-supplify-card">
            <Sparkles className="h-4 w-4 text-supplify-caramel" aria-hidden />
            Designed for teams that live inside operations all day.
          </div>
        </Reveal>

        <div className="grid gap-4 lg:pt-2">
          {TRUST_POINTS.map((point, i) => (
            <Reveal key={point.title} delay={0.06 + i * 0.08}>
              <article className="group grid gap-5 rounded-3xl border border-supplify-border bg-white p-6 shadow-supplify-card transition-[transform,border-color,box-shadow] duration-500 ease-cinematic hover:-translate-y-1 hover:border-supplify/30 hover:shadow-supplify-float md:grid-cols-[auto_1fr] md:p-7">
                <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-supplify-soft ring-1 ring-supplify/20 transition-[background-color,transform] duration-500 group-hover:scale-105 group-hover:bg-supplify/12">
                  <point.icon className="h-5 w-5 text-supplify" strokeWidth={1.75} aria-hidden />
                </span>
                <div className="min-w-0">
                  <h3 className="font-display text-xl font-bold text-supplify-ink md:text-2xl">{point.title}</h3>
                  <p className="mt-3 font-sans text-base leading-[1.75] text-supplify-secondary">{point.body}</p>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
