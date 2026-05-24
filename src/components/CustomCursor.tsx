import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

/** Optional editorial cursor — only on fine pointers; never hides system cursor */
export function CustomCursor() {
  const reducedMotion = useReducedMotion()
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [hovering, setHovering] = useState(false)
  const [enabled, setEnabled] = useState(false)
  const scrollEndRef = useRef(0)

  const x = useSpring(mouseX, { stiffness: 400, damping: 30 })
  const y = useSpring(mouseY, { stiffness: 400, damping: 30 })

  useEffect(() => {
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches
    if (!fine || reducedMotion || 'ontouchstart' in window) return
    setEnabled(true)

    let raf = 0
    let lastX = -100
    let lastY = -100

    const move = (e: MouseEvent) => {
      lastX = e.clientX
      lastY = e.clientY
      if (raf) return
      raf = requestAnimationFrame(() => {
        raf = 0
        mouseX.set(lastX)
        mouseY.set(lastY)
      })
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      const h = !!(t.closest('a, button, [role="button"], [data-cursor-hover]'))
      setHovering((prev) => (prev === h ? prev : h))
    }

    const onScroll = () => {
      window.clearTimeout(scrollEndRef.current)
      scrollEndRef.current = window.setTimeout(() => {}, 120)
    }

    window.addEventListener('mousemove', move, { passive: true })
    window.addEventListener('mouseover', over, { passive: true })
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
      window.removeEventListener('scroll', onScroll)
      if (raf) cancelAnimationFrame(raf)
      window.clearTimeout(scrollEndRef.current)
    }
  }, [mouseX, mouseY, reducedMotion])

  if (!enabled) return null

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[200] mix-blend-difference"
      style={{
        left: 0,
        top: 0,
        x,
        y,
        translateX: '-50%',
        translateY: '-50%',
        width: hovering ? 44 : 8,
        height: hovering ? 44 : 8,
        borderRadius: '50%',
        backgroundColor: hovering ? 'transparent' : 'white',
        border: hovering ? '1px solid white' : 'none',
      }}
    />
  )
}
