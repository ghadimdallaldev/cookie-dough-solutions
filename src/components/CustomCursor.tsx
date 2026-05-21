import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [hovering, setHovering] = useState(false)
  const [mounted, setMounted] = useState(false)

  // Dot tracks mouse directly — no spring = zero lag
  // Ring follows with a gentle spring
  const ringX = useSpring(mouseX, { stiffness: 350, damping: 30, mass: 0.4 })
  const ringY = useSpring(mouseY, { stiffness: 350, damping: 30, mass: 0.4 })

  useEffect(() => {
    if ('ontouchstart' in window) return
    setMounted(true)

    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const isHovering = !!(t.closest('a') || t.closest('button') || t.closest('[data-cursor-hover]'))
      setHovering(prev => (prev === isHovering ? prev : isHovering))
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [mouseX, mouseY])

  if (!mounted) return null

  return (
    <>
      {/* Dot — tracks instantly via raw motion values */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] rounded-full bg-dough-300"
        style={{
          left: 0,
          top: 0,
          x: mouseX,
          y: mouseY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 8 : 12,
          height: hovering ? 8 : 12,
          opacity: hovering ? 0.4 : 1,
          transition: 'width 0.12s ease, height 0.12s ease, opacity 0.12s ease',
        }}
      />
      {/* Ring — gentle spring follow */}
      <motion.div
        aria-hidden="true"
        className="pointer-events-none fixed z-[9999] rounded-full border border-dough-300/50"
        style={{
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          width: hovering ? 44 : 30,
          height: hovering ? 44 : 30,
          opacity: hovering ? 0.9 : 0.5,
          transition: 'width 0.18s ease, height 0.18s ease, opacity 0.18s ease',
        }}
      />
    </>
  )
}
