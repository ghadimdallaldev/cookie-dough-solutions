import { useEffect } from 'react'
import { useMotionValue, useSpring } from 'framer-motion'
import { useReducedMotion } from './useReducedMotion'

type SpringConfig = { stiffness: number; damping: number; mass: number }

const DEFAULT_CONFIG: SpringConfig = { stiffness: 55, damping: 18, mass: 0.7 }

/**
 * Pointer position normalized to −1…1 from the viewport center, smoothed with a
 * spring so the motion carries momentum instead of tracking the cursor rigidly.
 *
 * Returns spring-backed motion values (no re-render per mousemove). Stays at 0
 * under reduced-motion or on coarse/touch pointers — the effect is purely
 * decorative, so it simply doesn't engage where it would be wrong.
 */
export function usePointerParallax(config: SpringConfig = DEFAULT_CONFIG) {
  const reduced = useReducedMotion()
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)
  const x = useSpring(rawX, config)
  const y = useSpring(rawY, config)

  useEffect(() => {
    if (reduced) return
    if (typeof window === 'undefined' || !window.matchMedia) return
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)')
    if (!fine.matches) return

    const onMove = (e: MouseEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2)
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2)
    }
    window.addEventListener('mousemove', onMove, { passive: true })
    return () => window.removeEventListener('mousemove', onMove)
  }, [reduced, rawX, rawY])

  return { x, y }
}
