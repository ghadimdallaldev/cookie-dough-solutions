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

  const screen = (
    <div
      className={
        variant === 'phone'
          ? 'aspect-[9/16] w-full overflow-hidden rounded-[1.35rem] bg-[#faf8f5] ring-1 ring-ink/8'
          : 'aspect-[16/10] w-full overflow-hidden rounded-[1.15rem] bg-[#faf8f5] ring-1 ring-ink/8'
      }
    >
      <img
        src={src}
        alt={alt}
        width={variant === 'phone' ? 780 : 1400}
        height={variant === 'phone' ? 1688 : 900}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        className={
          fit === 'cover'
            ? 'h-full w-full object-cover object-top'
            : 'h-full w-full object-contain object-top'
        }
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
          <div className="ordering-device-shell mx-auto w-full max-w-[min(100%,360px)]">
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
