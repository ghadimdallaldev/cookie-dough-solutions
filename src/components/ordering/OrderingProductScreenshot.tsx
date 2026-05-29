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
  /** Phone bezel for mobile-first presentation; desktop uses wide frame */
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
  variant = 'desktop',
}: Props) {
  const reduced = useReducedMotion()

  const screen = (
    <div className="overflow-hidden rounded-[1.15rem] bg-[#faf6f0] ring-1 ring-oapp-ink/10">
      <div className="flex items-center justify-between gap-3 border-b border-oapp-ink/8 bg-white px-4 py-2.5">
        <div className="flex items-center gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-oapp-tomato/50" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-oapp-gold/45" aria-hidden />
          <span className="h-2.5 w-2.5 rounded-full bg-oapp-ink/10" aria-hidden />
        </div>
        {step ? (
          <span className="font-oapp-body text-[10px] font-bold uppercase tracking-[0.2em] text-oapp-ink/45">
            {step}
          </span>
        ) : (
          <span className="font-oapp-body text-[10px] font-bold uppercase tracking-[0.2em] text-oapp-ink/35">
            Your brand
          </span>
        )}
      </div>
      <div
        className={
          fit === 'cover'
            ? variant === 'phone'
              ? 'aspect-[9/16] max-h-[520px] w-full overflow-hidden bg-[#faf6f0]'
              : 'aspect-[16/10] w-full overflow-hidden bg-[#faf6f0]'
            : 'flex min-h-[220px] w-full items-start justify-center overflow-hidden bg-[#faf6f0] sm:min-h-[280px]'
        }
      >
        <img
          src={src}
          alt={alt}
          width={1400}
          height={900}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          className={
            fit === 'cover'
              ? 'h-full w-full object-cover object-top'
              : 'h-auto max-h-[min(54vh,440px)] w-full object-contain object-top'
          }
        />
      </div>
    </div>
  )

  return (
    <motion.div
      className={`relative ${className}`}
      initial={reduced ? false : { opacity: 0, y: 18 }}
      animate={reduced ? undefined : { opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: ORDERING_EASE }}
    >
      {glow && (
        <motion.div
          className="pointer-events-none absolute -inset-6 rounded-[3rem] bg-oapp-gold/18 blur-3xl md:-inset-8"
          aria-hidden
          animate={reduced ? { opacity: 0.3 } : { opacity: [0.22, 0.42, 0.22] }}
          transition={reduced ? { duration: 0 } : { duration: 9, repeat: Infinity, ease: 'easeInOut' }}
        />
      )}

      <div
        className={`relative transition-transform duration-500 ${
          tilt && !reduced ? 'lg:[transform:rotate(-1.25deg)] lg:hover:[transform:rotate(0deg)]' : ''
        }`}
      >
        {variant === 'phone' ? (
          <div className="ordering-device-shell mx-auto w-full max-w-[min(100%,340px)]">
            <div className="ordering-device-notch" aria-hidden />
            {screen}
          </div>
        ) : (
          <div className="shadow-oapp-device">{screen}</div>
        )}
      </div>
    </motion.div>
  )
}
