import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

/**
 * Wraps an element so it drifts toward the pointer while hovered, then springs
 * back on leave. Purely decorative — the child stays fully interactive and the
 * effect disengages entirely under reduced-motion or on touch/coarse pointers.
 *
 * `strength` is the fraction of the cursor's offset-from-center the element
 * follows (0.3 ≈ a gentle, premium pull). `radius` is unused intentionally; the
 * pull is proportional and bounded by the wrapper's own size.
 */
export function Magnetic({
  children,
  strength = 0.32,
  className = '',
}: {
  children: React.ReactNode
  strength?: number
  className?: string
}) {
  const reduced = useReducedMotion()
  const ref = useRef<HTMLDivElement>(null)
  const mvX = useMotionValue(0)
  const mvY = useMotionValue(0)
  const x = useSpring(mvX, { stiffness: 180, damping: 15, mass: 0.12 })
  const y = useSpring(mvY, { stiffness: 180, damping: 15, mass: 0.12 })

  function handleMove(e: React.PointerEvent<HTMLDivElement>) {
    if (reduced || e.pointerType !== 'mouse') return
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const relX = e.clientX - (rect.left + rect.width / 2)
    const relY = e.clientY - (rect.top + rect.height / 2)
    mvX.set(relX * strength)
    mvY.set(relY * strength)
  }

  function reset() {
    mvX.set(0)
    mvY.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={`inline-flex ${className}`}
      style={{ x, y }}
      onPointerMove={handleMove}
      onPointerLeave={reset}
    >
      {children}
    </motion.div>
  )
}
