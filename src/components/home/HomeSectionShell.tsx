import { motion } from 'framer-motion'
import type { ReactNode } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'

type HomeSectionShellProps = {
  children: ReactNode
  className?: string
  id?: string
  /** Show animated divider above section */
  divider?: boolean
  /** Enter animation style */
  variant?: 'rise' | 'slide' | 'scale'
}

const VARIANTS = {
  rise: {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0 },
  },
  slide: {
    hidden: { opacity: 0, x: -32 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.97, y: 24 },
    visible: { opacity: 1, scale: 1, y: 0 },
  },
} as const

export function HomeSectionShell({
  children,
  className = '',
  id,
  divider = true,
  variant = 'rise',
}: HomeSectionShellProps) {
  const reduced = useReducedMotion()
  const motionVariant = VARIANTS[variant]

  return (
    <motion.div
      id={id}
      className={`relative ${id ? 'scroll-mt-36' : ''} ${className}`}
      initial={reduced ? false : motionVariant.hidden}
      whileInView={reduced ? undefined : motionVariant.visible}
      viewport={{ once: true, margin: '-6%' }}
      transition={{ duration: 0.75, ease: h.ease }}
    >
      {divider && !reduced && (
        <motion.div
          className="pointer-events-none absolute inset-x-0 top-0 z-[2] h-px origin-left bg-gradient-to-r from-transparent via-chip/35 to-transparent"
          initial={{ scaleX: 0, opacity: 0 }}
          whileInView={{ scaleX: 1, opacity: 1 }}
          viewport={{ once: true, margin: '-2%' }}
          transition={{ duration: 0.9, ease: h.ease }}
          aria-hidden
        />
      )}
      {children}
    </motion.div>
  )
}
