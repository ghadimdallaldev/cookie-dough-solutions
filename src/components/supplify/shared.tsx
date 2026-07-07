import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { PackImage } from '../../data/supplify-cursor-pack'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const

export type SupplifyTheme = 'light' | 'dark'

const FOCUS_RING =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify/40 focus-visible:ring-offset-2 focus-visible:ring-offset-supplify-cream'

/** Primary CTA */
export function SupplifyPrimaryButton({
  href,
  children,
  className = '',
}: {
  href: string
  children: React.ReactNode
  className?: string
  theme?: SupplifyTheme
}) {
  return (
    <a
      href={href}
      className={`group inline-flex cursor-pointer items-center gap-2.5 rounded-full bg-supplify px-8 py-3.5 font-sans text-sm font-semibold text-white shadow-supplify-glow transition-[transform,background-color,box-shadow,filter] duration-300 ease-cinematic hover:-translate-y-0.5 hover:bg-supplify-light hover:shadow-supplify-float active:translate-y-0 active:scale-[0.98] ${FOCUS_RING} ${className}`}
    >
      {children}
    </a>
  )
}

/** Secondary CTA */
export function SupplifySecondaryButton({
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
      className={`group inline-flex cursor-pointer items-center gap-2.5 rounded-full border border-supplify-border bg-white/90 px-8 py-3.5 font-sans text-sm font-semibold text-supplify-ink shadow-supplify-card backdrop-blur transition-[transform,background-color,border-color,box-shadow] duration-300 ease-cinematic hover:-translate-y-0.5 hover:border-supplify/30 hover:bg-supplify-mist hover:shadow-supplify-glow active:translate-y-0 ${FOCUS_RING} ${className}`}
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
  theme?: SupplifyTheme
}) {
  return (
    <a
      href={href}
      className={`cursor-pointer font-sans text-sm font-semibold text-supplify-secondary underline decoration-supplify-border underline-offset-4 transition-[color,text-decoration-color] duration-200 hover:text-supplify-ink hover:decoration-supplify/40 ${FOCUS_RING} ${className}`}
    >
      {children}
    </a>
  )
}

/** Section eyebrow label */
export function SupplifyEyebrow({
  children,
}: {
  children: React.ReactNode
  theme?: SupplifyTheme
}) {
  return (
    <p className="font-sans text-[11px] font-semibold uppercase tracking-[0.32em] text-supplify">
      {children}
    </p>
  )
}

/** Premium card shell */
export function SupplifyCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  return (
    <div
      className={`supplify-signal-card rounded-[1.25rem] border border-supplify-border p-6 transition-[transform,border-color,box-shadow] duration-300 ease-cinematic hover:-translate-y-0.5 hover:border-supplify/25 md:rounded-3xl md:p-7 ${className}`}
    >
      {children}
    </div>
  )
}

const SCREENSHOT_CHROME = {
  frame:
    'bg-white ring-1 ring-supplify-border shadow-supplify-float hover:ring-supplify/35',
  chromeBar: 'border-supplify-border bg-gradient-to-r from-supplify-mist via-white to-supplify-soft/70',
  dot: 'bg-supplify/35',
  label: 'text-supplify-muted',
  viewport: 'bg-supplify-mist',
  expand:
    'border-supplify-border bg-white/95 text-supplify-secondary group-hover/shot:border-supplify/35 group-hover/shot:text-supplify',
  glow: 'bg-supplify/10',
} as const

/** Real product UI frame */
export function ProductScreenshot({
  src,
  alt = 'Supplify product interface',
  className = '',
  glow = true,
  priority = false,
  fit = 'contain',
  compact = false,
  zoom = false,
  theme: _theme = 'light',
}: {
  src: string
  alt?: string
  className?: string
  glow?: boolean
  priority?: boolean
  fit?: 'contain' | 'cover'
  compact?: boolean
  zoom?: boolean
  theme?: SupplifyTheme
}) {
  const reduced = useReducedMotion()
  const [open, setOpen] = useState(false)
  const closeRef = useRef<HTMLButtonElement>(null)
  const chrome = SCREENSHOT_CHROME

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
          className={`pointer-events-none absolute -inset-3 rounded-[1.75rem] blur-3xl md:-inset-4 ${chrome.glow}`}
          aria-hidden
          animate={reduced ? { opacity: 0.35 } : { opacity: [0.25, 0.4, 0.25] }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      )}
      <motion.div
        className={`group/shot relative overflow-hidden rounded-[1.25rem] ring-1 transition-[box-shadow,ring-color,transform] duration-500 ease-cinematic hover:-translate-y-1 md:rounded-3xl ${chrome.frame}`}
      >
        <div className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${chrome.chromeBar}`}>
          <span className={`h-2 w-2 rounded-full ${chrome.dot}`} aria-hidden />
          <span className={`h-2 w-2 rounded-full ${chrome.dot}`} aria-hidden />
          <span className={`h-2 w-2 rounded-full ${chrome.dot}`} aria-hidden />
          <span className={`ml-2 font-mono text-[10px] uppercase tracking-wider ${chrome.label}`}>
            Supplify
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View full-size: ${alt}`}
          className={`group/btn block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-supplify/40`}
        >
          <div
            className={
              fit === 'cover'
                ? compact
                  ? `aspect-[16/10] max-h-44 w-full overflow-hidden md:max-h-48 ${chrome.viewport}`
                  : `aspect-[16/10] w-full overflow-hidden ${chrome.viewport}`
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
              }${zoom && !reduced ? ' transition-transform duration-[900ms] ease-cinematic will-change-transform group-hover/shot:scale-[1.035]' : ''}`}
            />
          </div>
          <span
            className={`absolute bottom-3 right-3 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1.5 font-sans text-[10px] font-semibold uppercase tracking-[0.14em] backdrop-blur-md transition-colors duration-200 ${chrome.expand}`}
          >
            <Maximize2 className="h-3 w-3" aria-hidden />
            <span className="hidden sm:inline">Expand</span>
          </span>
        </button>
      </motion.div>

      {createPortal(
        <AnimatePresence>
          {open && (
            <motion.div
              className="fixed inset-0 z-[120] flex items-center justify-center bg-supplify-ink/90 backdrop-blur-md"
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
                className="fixed right-4 top-4 z-10 inline-flex h-11 w-11 cursor-pointer items-center justify-center rounded-full border border-white/15 bg-white/10 text-white backdrop-blur-md transition-colors duration-200 hover:bg-white/20 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify/50"
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
              <p className="pointer-events-none fixed inset-x-0 bottom-4 text-center font-sans text-[11px] uppercase tracking-[0.2em] text-white/50">
                Tap outside to close
              </p>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body,
      )}
    </motion.div>
  )
}

/** Scene backdrop */
export function AtmosphereImage({
  src,
  alt = '',
  position = 'center center',
  fit = 'cover',
  className = '',
  overlay = 'from-supplify-cream/90 via-supplify-cream/40 to-transparent',
  minHeight = 'min(48vh, 520px)',
}: PackImage & {
  alt?: string
  className?: string
  overlay?: string
  minHeight?: string
  theme?: SupplifyTheme
}) {
  const [fallback, setFallback] = useState(false)

  return (
    <div
      className={`relative overflow-hidden rounded-[1.25rem] ring-1 ring-supplify-border transition-[ring-color,box-shadow] duration-200 md:rounded-3xl ${className}`}
    >
      <motion.div className="relative w-full bg-supplify-section" style={{ minHeight }}>
        {fallback ? (
          <div className="absolute inset-0 bg-supplify-section opacity-80" aria-hidden />
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full scale-105 object-cover brightness-[0.88]"
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
