import { useEffect, useState } from 'react'
import { useReducedMotion } from './useReducedMotion'

/** Normalized pointer −1…1 from viewport center */
export function useMouseParallax() {
  const reducedMotion = useReducedMotion()
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  useEffect(() => {
    if (reducedMotion) return
    const move = (e: MouseEvent) => {
      setMouse({
        x: (e.clientX / window.innerWidth - 0.5) * 2,
        y: (e.clientY / window.innerHeight - 0.5) * 2,
      })
    }
    window.addEventListener('mousemove', move, { passive: true })
    return () => window.removeEventListener('mousemove', move)
  }, [reducedMotion])

  return reducedMotion ? { x: 0, y: 0 } : mouse
}
