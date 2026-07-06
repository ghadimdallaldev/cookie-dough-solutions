import { motion } from 'framer-motion'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { ORDERING_EASE } from './shared'

type Props = {
  src: string
  alt: string
  fit?: 'cover' | 'contain'
  priority?: boolean
  className?: string
  step?: string
  glow?: boolean
  tilt?: boolean
  variant?: 'desktop' | 'phone'
}

export function OrderingProductScreenshot({
  src,
  alt,
  fit = 'cover',
  priority = false,
  className = '',
  step,
  glow = true,
  tilt = false,
  variant = 'phone',
}: Props) {
  const reduced = useReducedMotion()

  // Screens are 390×844 @2x single-viewport captures (≈9:19.5). Framing them at
  // their native ratio means the whole screen shows — no cropped totals or CTAs.
  const screen =
    variant === 'phone' ? (
      <div className="relative aspect-[390/844] w-full overflow-hidden rounded-[2.05rem] bg-[#faf8f5]">
        <img
          src={src}
          alt={alt}
          width={780}
          height={1688}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} object-top`}
        />
        {/* Soft screen glare — reads as glass, never obscures content. */}
        <div
          className="pointer-events-none absolute inset-0 rounded-[2.05rem] bg-[linear-gradient(135deg,rgba(255,255,255,0.16)_0%,rgba(255,255,255,0)_38%)]"
          aria-hidden
        />
      </div>
    ) : (
      <div className="aspect-[16/10] w-full overflow-hidden rounded-[1.15rem] bg-[#faf8f5] ring-1 ring-ink/8">
        <img
          src={src}
          alt={alt}
          width={1400}
          height={900}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={`h-full w-full ${fit === 'contain' ? 'object-contain' : 'object-cover'} object-top`}
        />
      </div>
    )

  return (
    <motion.div
      className={`relative ${className}`}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: ORDERING_EASE }}
    >
      {step ? (
        <div className="mb-3 flex justify-center">
          <span className="inline-flex items-center rounded-full border border-oapp-gold/25 bg-white/90 px-3.5 py-1 font-oapp-body text-[10px] font-bold uppercase tracking-[0.2em] text-oapp-gold shadow-sm backdrop-blur-sm">
            {step}
          </span>
        </div>
      ) : null}

      {glow ? (
        <motion.div
          className="pointer-events-none absolute -inset-4 rounded-[3rem] bg-oapp-gold/10 blur-3xl md:-inset-6"
          aria-hidden
          animate={reduced ? { opacity: 0.25 } : { opacity: [0.15, 0.28, 0.15] }}
          transition={reduced ? { duration: 0 } : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : null}

      <div
        className={`relative transition-transform duration-500 ${
          tilt && !reduced ? 'lg:[transform:rotate(-1.25deg)] lg:hover:[transform:rotate(0deg)]' : ''
        }`}
      >
        {variant === 'phone' ? (
          <div className="ordering-device-shell mx-auto w-full max-w-[min(100%,340px)]">
            <span className="ordering-device-island" aria-hidden />
            {screen}
          </div>
        ) : (
          <div className="shadow-oapp-device">{screen}</div>
        )}
      </div>
    </motion.div>
  )
}
