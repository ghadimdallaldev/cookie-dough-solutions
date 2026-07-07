import { AnimatePresence, motion } from 'framer-motion'
import { Maximize2, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'
import type { PackImage } from '../../data/supplify-cursor-pack'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const

export type SupplifyTheme = 'light' | 'dark'

const FOCUS_RING_DARK =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify-light/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#0f0620]'

const FOCUS_RING_LIGHT =
  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-supplify/50 focus-visible:ring-offset-2 focus-visible:ring-offset-supplify-cream'

/** Primary CTA — theme-aware pill */
export function SupplifyPrimaryButton({
  href,
  children,
  className = '',
  theme = 'dark',
}: {
  href: string
  children: React.ReactNode
  className?: string
  theme?: SupplifyTheme
}) {
  const focusRing = theme === 'light' ? FOCUS_RING_LIGHT : FOCUS_RING_DARK
  const styles =
    theme === 'light'
      ? 'bg-supplify text-paper shadow-supplify-glow hover:bg-supplify-light hover:shadow-[0_36px_90px_-20px_rgba(109,94,247,0.45)]'
      : 'bg-paper text-[#2d1654] shadow-supplify-glow hover:bg-paper-warm hover:shadow-[0_36px_90px_-20px_rgba(109,94,247,0.55)]'

  return (
    <a
      href={href}
      className={`group inline-flex cursor-pointer items-center gap-2.5 rounded-full px-8 py-3.5 font-sans text-sm font-semibold transition-[transform,box-shadow,background-color] duration-200 hover:-translate-y-px active:translate-y-0 active:scale-[0.97] ${styles} ${focusRing} ${className}`}
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
  theme = 'dark',
}: {
  href: string
  children: React.ReactNode
  className?: string
  theme?: SupplifyTheme
}) {
  const focusRing = theme === 'light' ? FOCUS_RING_LIGHT : FOCUS_RING_DARK
  const styles =
    theme === 'light'
      ? 'text-supplify-dark/75 decoration-supplify/25 hover:text-supplify-dark hover:decoration-supplify/50'
      : 'text-paper/85 decoration-paper/25 hover:text-paper hover:decoration-paper/70'

  return (
    <a
      href={href}
      className={`cursor-pointer font-sans text-sm font-medium underline underline-offset-4 transition-[color,text-decoration-color] duration-200 ${styles} ${focusRing} ${className}`}
    >
      {children}
    </a>
  )
}

/** Section eyebrow label */
export function SupplifyEyebrow({
  children,
  theme = 'dark',
}: {
  children: React.ReactNode
  theme?: SupplifyTheme
}) {
  return (
    <p
      className={`font-sans text-[11px] font-medium uppercase tracking-[0.32em] ${
        theme === 'light' ? 'text-supplify' : 'text-supplify-light/80'
      }`}
    >
      {children}
    </p>
  )
}

const SCREENSHOT_CHROME = {
  dark: {
    glow: 'bg-supplify/25',
    frame: 'bg-[#120a22]/90 ring-white/15 shadow-[0_40px_100px_-32px_rgba(0,0,0,0.75),0_0_0_1px_rgba(255,255,255,0.05)] hover:ring-white/25',
    chromeBar: 'border-white/[0.08] bg-white/[0.04]',
    dot: 'bg-white/20',
    label: 'text-white/30',
    viewport: 'bg-[#0f0620]',
    expand: 'border-white/15 bg-[#0f0620]/80 text-paper/70 group-hover/shot:border-supplify-light/50 group-hover/shot:text-paper',
    focusRing: 'focus-visible:ring-supplify-light/70',
  },
  light: {
    glow: 'bg-supplify/12',
    frame: 'bg-white ring-ink/8 shadow-ui-float hover:ring-supplify/25',
    chromeBar: 'border-ink/8 bg-supplify-mist/60',
    dot: 'bg-ink/15',
    label: 'text-ink/35',
    viewport: 'bg-supplify-cream',
    expand: 'border-ink/10 bg-white/90 text-ink/60 group-hover/shot:border-supplify/35 group-hover/shot:text-supplify-dark',
    focusRing: 'focus-visible:ring-supplify/50',
  },
} as const

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
  theme = 'dark',
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
  const chrome = SCREENSHOT_CHROME[theme]

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
          animate={reduced ? { opacity: 0.35 } : { opacity: [0.3, 0.5, 0.3] }}
          transition={
            reduced
              ? { duration: 0 }
              : { duration: 8, repeat: Infinity, ease: 'easeInOut' }
          }
        />
      )}
      <motion.div
        className={`group/shot relative overflow-hidden rounded-2xl ring-1 transition-[box-shadow,ring-color] duration-200 md:rounded-[1.25rem] ${chrome.frame}`}
      >
        <div className={`flex items-center gap-1.5 border-b px-4 py-2.5 ${chrome.chromeBar}`}>
          <span className={`h-2 w-2 rounded-full ${chrome.dot}`} aria-hidden />
          <span className={`h-2 w-2 rounded-full ${chrome.dot.replace('/20', '/15')}`} aria-hidden />
          <span className={`h-2 w-2 rounded-full ${chrome.dot.replace('/20', '/10')}`} aria-hidden />
          <span className={`ml-2 font-mono text-[10px] uppercase tracking-wider ${chrome.label}`}>
            Supplify
          </span>
        </div>
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label={`View full-size: ${alt}`}
          className={`group/btn block w-full cursor-zoom-in focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset ${chrome.focusRing}`}
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
              }${zoom && !reduced ? ' transition-transform duration-[600ms] ease-out will-change-transform group-hover/shot:scale-[1.04]' : ''}`}
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
  theme = 'dark',
}: PackImage & {
  alt?: string
  className?: string
  overlay?: string
  minHeight?: string
  theme?: SupplifyTheme
}) {
  const [fallback, setFallback] = useState(false)
  const ringClass = theme === 'light' ? 'ring-ink/10' : 'ring-white/10'

  return (
    <div
      className={`relative overflow-hidden rounded-2xl ring-1 transition-[ring-color,box-shadow] duration-200 md:rounded-[1.25rem] ${ringClass} ${className}`}
    >
      <motion.div
        className={`relative w-full ${theme === 'light' ? 'bg-supplify-mist' : 'bg-[#0f0620]'}`}
        style={{ minHeight }}
      >
        {fallback ? (
          <div
            className={`absolute inset-0 opacity-60 ${theme === 'light' ? 'bg-supplify-mist' : 'bg-supplify-mesh'}`}
            aria-hidden
          />
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            decoding="async"
            className={`absolute inset-0 h-full w-full scale-105 blur-[2px] ${
              theme === 'light' ? 'brightness-[0.72]' : 'brightness-[0.55]'
            }`}
            style={{ objectFit: fit, objectPosition: position }}
            onError={() => setFallback(true)}
          />
        )}
      </motion.div>
      <div className={`absolute inset-0 bg-gradient-to-t ${overlay}`} aria-hidden />
    </div>
  )
}

export { EASE as SUPPLIFY_EASE, FOCUS_RING_DARK as SUPPLIFY_FOCUS_RING }
