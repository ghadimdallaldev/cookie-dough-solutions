import { useState } from 'react'
import { IMAGES } from '../data/images'

type Tone = 'warm' | 'violet'
type HeroKey = 'cookieDough' | 'supplify' | 'kitchen'

const SRC: Record<HeroKey, string> = {
  cookieDough: IMAGES.heroCookieDough,
  supplify: IMAGES.heroSupplify,
  kitchen: IMAGES.sceneKitchen,
}

const OVERLAY: Record<Tone, string> = {
  warm: 'from-ink/85 via-chip/55 to-ink/95',
  violet: 'from-[#1a0a2e]/95 via-[#2d1654]/75 to-ink/95',
}

function Atmosphere({ tone }: { tone: Tone }) {
  return (
    <div
      className={`absolute inset-0 ${
        tone === 'violet' ? 'bg-[#1a0a2e]' : 'bg-gradient-to-br from-chip to-ink'
      }`}
    />
  )
}

/** Static hero — no scroll-linked motion (keeps scrolling fast) */
export function HeroScene({
  heroKey,
  tone = 'warm',
  children,
}: {
  heroKey: HeroKey
  tone?: Tone
  children: React.ReactNode
}) {
  const [fallback, setFallback] = useState(false)

  return (
    <section className="relative isolate min-h-[min(100vh,900px)] overflow-hidden">
      <div className="absolute inset-0">
        {fallback ? (
          <Atmosphere tone={tone} />
        ) : (
          <img
            src={SRC[heroKey]}
            alt=""
            width={1920}
            height={1080}
            fetchPriority="high"
            decoding="async"
            className="h-full w-full object-cover"
            onError={() => setFallback(true)}
          />
        )}
        <div className={`absolute inset-0 bg-gradient-to-b ${OVERLAY[tone]}`} />
      </div>
      <div className="relative z-10">{children}</div>
      {/* Solid fade so nothing bleeds through below the hero */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 z-[5] h-32 bg-gradient-to-t ${
          tone === 'violet' ? 'from-dough-50' : 'from-dough-50'
        } to-transparent`}
        aria-hidden
      />
    </section>
  )
}

export function CtaScene({
  children,
  imageKey = 'kitchen',
}: {
  children: React.ReactNode
  imageKey?: HeroKey
}) {
  const [fallback, setFallback] = useState(false)

  return (
    <section className="relative isolate overflow-hidden py-28 md:py-36">
      <div className="absolute inset-0">
        {fallback ? (
          <Atmosphere tone="violet" />
        ) : (
          <img
            src={SRC[imageKey]}
            alt=""
            loading="lazy"
            decoding="async"
            className="h-full w-full object-cover"
            onError={() => setFallback(true)}
          />
        )}
        <div className="absolute inset-0 bg-ink/80" />
      </div>
      <div className="relative z-10">{children}</div>
    </section>
  )
}
