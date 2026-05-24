import { motion } from 'framer-motion'
import type { PackImage } from '../../data/supplify-cursor-pack'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify-light/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0a0812]'

/** Primary CTA — white pill on dark sections */
export function SupplifyPrimaryButton({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      className={`group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-paper px-8 py-3.5 font-sans text-sm font-semibold text-[#2d1654] shadow-supplify-glow transition-colors duration-200 hover:bg-paper-warm ${FOCUS_RING} ${className}`}
    >
      {children}
    </a>
  )
}

/** Secondary text link */
export function SupplifyTextLink({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
}) {
  return (
    <a
      href={href}
      className={`cursor-pointer font-sans text-sm font-medium text-paper/85 underline-offset-4 transition-colors duration-200 hover:text-paper hover:underline ${FOCUS_RING} ${className}`}
    >
      {children}
    </a>
  )
}

/** Section eyebrow label */
export function SupplifyEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-sans text-[11px] font-medium uppercase tracking-[0.32em] text-supplify-light/80">
      {children}
    </p>
  )
}

/** Real product UI — framed, rounded, premium */
export function ProductScreenshot({
  src,
  alt = 'Supplify product interface',
  className = '',
  glow = true,
  priority = false,
  fit = 'contain',
}: {
  src: string
  alt?: string
  className?: string
  glow?: boolean
  priority?: boolean
  fit?: 'contain' | 'cover'
}) {
  const reduced = useReducedMotion()

  return (
    <motion.div
      className={`relative ${className}`}
    >
      {glow && (
        <motion.div
          className="pointer-events-none absolute -inset-3 rounded-[1.75rem] bg-supplify/25 blur-3xl md:-inset-4"
          aria-hidden
          animate={reduced ? { opacity: 0.35 } : { opacity: [0.3, 0.5, 0.3] }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      )}
      <motion.div
        className="relative overflow-hidden rounded-2xl bg-[#120a22]/90 ring-1 ring-white/15 shadow-[0_40px_100px_-32px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.05)] transition-[box-shadow,ring-color] duration-200 hover:ring-white/20 md:rounded-[1.25rem]"
      >
        <div className="flex items-center gap-1.5 border-b border-white/[0.08] bg-white/[0.04] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-white/10" aria-hidden />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-white/30">Supplify</span>
        </div>
        <div
          className={fit === 'cover' ? 'aspect-[16/10] w-full overflow-hidden bg-[#0f0620]' : 'w-full'}
        >
          <img
            src={src}
            alt={alt}
            loading={priority ? 'eager' : 'lazy'}
            decoding="async"
            className={
              fit === 'cover'
                ? 'block h-full w-full object-cover object-top'
                : 'relative block w-full object-contain object-center'
            }
          />
        </div>
      </motion.div>
    </motion.div>
  )
}

/** Generated scene — atmosphere, generous framing */
export function AtmosphereImage({
  src,
  alt = '',
  position = 'center center',
  fit = 'cover',
  className = '',
  overlay = 'from-[#0f0620]/70 via-[#0f0620]/25 to-transparent',
  minHeight = 'min(48vh, 520px)',
}: PackImage & {
  alt?: string
  className?: string
  overlay?: string
  minHeight?: string
}) {
  return (
    <div
      className={`relative overflow-hidden rounded-2xl ring-1 ring-white/10 transition-[ring-color,box-shadow] duration-200 md:rounded-[1.25rem] ${className}`}
    >
      <motion.div
        className="relative w-full"
        style={{ minHeight }}
      >
        <img
          src={src}
          alt={alt}
          loading="lazy"
          decoding="async"
          className="absolute inset-0 h-full w-full"
          style={{ objectFit: fit, objectPosition: position }}
        />
      </motion.div>
      <div className={`absolute inset-0 bg-gradient-to-t ${overlay}`} aria-hidden />
    </div>
  )
}

export { EASE as SUPPLIFY_EASE, FOCUS_RING as SUPPLIFY_FOCUS_RING }
