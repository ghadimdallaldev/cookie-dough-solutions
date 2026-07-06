import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
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
      className={`group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-paper px-8 py-3.5 font-sans text-sm font-semibold text-[#2d1654] shadow-supplify-glow transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px hover:bg-paper-warm hover:shadow-[0_36px_90px_-20px_rgba(109,94,247,0.55)] active:translate-y-0 active:scale-[0.97] ${FOCUS_RING} ${className}`}
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
      className={`cursor-pointer font-sans text-sm font-medium text-paper/85 underline underline-offset-4 decoration-paper/25 transition-[color,text-decoration-color] duration-200 hover:text-paper hover:decoration-paper/70 ${FOCUS_RING} ${className}`}
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
  compact = false,
  zoom = false,
}: {
  src: string
  alt?: string
  className?: string
  glow?: boolean
  priority?: boolean
  fit?: 'contain' | 'cover'
  compact?: boolean
  /** Gently scale the image when an ancestor `.group` is hovered. */
  zoom?: boolean
}) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Lightbox: view the full-resolution dashboard, pannable — the fix for
  // wide desktop UI being illegible when shrunk to a phone.
  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('keydown', onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeRef.current?.focus()
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [open])

  return (
    <motion.div className={`relative ${className}`}>
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
      <motion.div className="group/shot relative overflow-hidden rounded-2xl bg-[#120a22]/90 ring-1 ring-white/15 shadow-[0_40px_100px_-32px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.05)] transition-[box-shadow,ring-color] duration-200 hover:ring-white/25 md:rounded-[1.25rem]">
        <div className="flex items-center gap-1.5 border-b border-white/[0.08] bg-white/[0.04] px-4 py-2.5">
          <span className="h-2 w-2 rounded-full bg-white/20" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-white/15" aria-hidden />
          <span className="h-2 w-2 rounded-full bg-white/10" aria-hidden />
          <span className="ml-2 font-mono text-[10px] uppercase tracking-wider text-white/30">Supplify</span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View full-size: ${alt}`}
          className="group/btn block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-supplify-light/70"
        >
          <div
            className={
              fit === 'cover'
                ? compact
                  ? 'aspect-[16/10] max-h-44 w-full overflow-hidden bg-[#0f0620] md:max-h-48'
                  : 'aspect-[16/10] w-full overflow-hidden bg-[#0f0620]'
                : 'w-full'
            }
          >
            <img
              src={src}
              alt={alt}
              loading={priority ? 'eager' : 'lazy'}
              decoding="async"
              className={`${
                fit === 'cover'
                  ? 'block h-full w-full object-cover object-top'
                  : 'relative block w-full object-contain object-center'
              }${zoom && !reduced ? ' transition-transform duration-[600ms] ease-out will-change-transform group-hover/shot:scale-[1.04]' : ''}`}
            />
          </div>
          {/* Expand affordance — always visible on touch, brightens on hover. */}
          <span className="absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-[#0f0620]/80 px-2.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] text-paper/70 backdrop-blur-md transition-colors duration-200 group-hover/shot:border-supplify-light/50 group-hover/shot:text-paper">
            <Maximize2 className="h-3 w-3" aria-hidden />
            <span className="hidden sm:inline">Expand</span>
          </span>
        </button>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-[#070311]/90 backdrop-blur-md"
              role="dialog"
              aria-modal="true"
              aria-label={alt}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setOpen(false)}
            >
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close full-size view"
                className="fixed right-4 top-4 z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-paper backdrop-blur-md transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify-light/70"
              >
                <X className="h-5 w-5" />
              </button>
              <div
                className="max-h-[92vh] max-w-[96vw] overflow-auto overscroll-contain rounded-xl ring-1 ring-white/15 [scrollbar-width:thin]"
                onClick={(e) => e.stopPropagation()}
              >
                <img
                  src={src}
                  alt={alt}
                  className="block h-auto w-[1180px] max-w-none md:w-[min(1500px,92vw)]"
                />
              </div>
              <p className="pointer-events-none fixed inset-x-0 bottom-4 text-center font-sans text-[11px] uppercase tracking-[0.2em] text-paper/45">
                Drag to pan · tap outside to close
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </motion.div>
  )
}

/** Scene backdrop — real UI screenshot or violet gradient fallback */
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
  const [fallback, setFallback] = useState(false)

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ring-1 ring-white/10 transition-[ring-color,box-shadow] duration-200 md:rounded-[1.25rem] ${className}`}
    >
      <motion.div className="relative w-full bg-[#0f0620]" style={{ minHeight }}>
        {fallback ? (
          <div className="absolute inset-0 bg-supplify-mesh opacity-60" aria-hidden />
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-105 blur-[2px] brightness-[0.55]"
            style={{ objectFit: fit, objectPosition: position }}
            onError={() => setFallback(true)}
          />
        )}
      </motion.div>
      <div className={`absolute inset-0 bg-gradient-to-t ${overlay}`} aria-hidden />
    </div>
  )
}

export { EASE as SUPPLIFY_EASE, FOCUS_RING as SUPPLIFY_FOCUS_RING }
