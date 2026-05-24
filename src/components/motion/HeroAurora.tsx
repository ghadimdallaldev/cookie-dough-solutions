import type { Brand } from '../../theme/brand'

/** Animated mesh overlay on heroes — reads as motion without video */
export function HeroAurora({ brand = 'studio' }: { brand?: Brand }) {
  const studio = brand === 'studio'

  return (
    <div
      className="pointer-events-none absolute inset-0 z-[1] opacity-70 mix-blend-soft-light motion-safe:animate-aurora-drift"
      aria-hidden
      style={{
        background: studio
          ? `radial-gradient(ellipse 80% 60% at 20% 30%, rgba(212,165,116,0.55) 0%, transparent 55%),
             radial-gradient(ellipse 70% 50% at 80% 70%, rgba(92,61,46,0.45) 0%, transparent 50%),
             radial-gradient(ellipse 50% 40% at 50% 100%, rgba(255,250,245,0.25) 0%, transparent 45%)`
          : `radial-gradient(ellipse 75% 55% at 15% 25%, rgba(167,139,250,0.5) 0%, transparent 55%),
             radial-gradient(ellipse 65% 45% at 85% 60%, rgba(124,58,237,0.45) 0%, transparent 50%),
             radial-gradient(ellipse 55% 35% at 50% 90%, rgba(196,181,253,0.2) 0%, transparent 45%)`,
        backgroundSize: '200% 200%',
      }}
    />
  )
}
