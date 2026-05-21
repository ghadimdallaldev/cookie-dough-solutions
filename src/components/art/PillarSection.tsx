import { MockupStage } from './MockupStage'
import type { MockVariant } from '../SupplifyMockup'

type PillarSectionProps = {
  num: string
  tag: string
  title: string
  subtitle: string
  points: string[]
  mockVariant: MockVariant
  invert?: boolean
  dark?: boolean
}

export function PillarSection({
  num,
  tag,
  title,
  subtitle,
  points,
  mockVariant,
  invert = false,
  dark = false,
}: PillarSectionProps) {
  return (
    <section
      className={`py-20 md:py-28 ${dark ? 'bg-ink text-dough-100' : 'bg-dough-50'}`}
      style={{ contentVisibility: 'auto', containIntrinsicSize: '0 800px' }}
    >
      <div className="mx-auto max-w-6xl px-6">
        <div
          className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-16 ${
            invert ? 'lg:[&>*:first-child]:order-2' : ''
          }`}
        >
          <div>
            <div className="flex items-start gap-4">
              <span
                className={`font-display text-5xl font-extrabold leading-none md:text-6xl ${
                  dark ? 'text-dough-800' : 'text-dough-200'
                }`}
              >
                {num}
              </span>
              <div>
                <p
                  className={`text-xs font-bold uppercase tracking-[0.3em] ${
                    dark ? 'text-dough-400' : 'text-dough-600'
                  }`}
                >
                  {tag}
                </p>
                <h2
                  className={`mt-3 font-display text-3xl font-extrabold tracking-tight md:text-4xl ${
                    dark ? 'text-white' : 'text-ink'
                  }`}
                >
                  {title}
                </h2>
              </div>
            </div>
            <p
              className={`mt-6 max-w-lg text-lg leading-relaxed ${
                dark ? 'text-dough-300' : 'text-dough-700'
              }`}
            >
              {subtitle}
            </p>
            <ul className="mt-8 grid gap-3 sm:grid-cols-2">
              {points.map((pt, idx) => (
                <li
                  key={pt}
                  className={`flex items-center gap-2 text-sm font-semibold ${
                    dark ? 'text-dough-100' : 'text-chip'
                  }`}
                >
                  <span className="font-display text-dough-400">{String(idx + 1).padStart(2, '0')}</span>
                  {pt}
                </li>
              ))}
            </ul>
          </div>
          <MockupStage variant={mockVariant} />
        </div>
      </div>
    </section>
  )
}
