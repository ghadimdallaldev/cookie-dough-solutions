import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export function CustomCursor() {
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const [hovering, setHovering] = useState(false)
  const [mounted, setMounted] = useState(false)

  const dotX = useSpring(x, { stiffness: 400, damping: 28 })
  const dotY = useSpring(y, { stiffness: 400, damping: 28 })
  const ringX = useSpring(x, { stiffness: 150, damping: 20 })
  const ringY = useSpring(y, { stiffness: 150, damping: 20 })

  useEffect(() => {
    if ('ontouchstart' in window) return
    setMounted(true)

    const move = (e: MouseEvent) => {
      x.set(e.clientX)
      y.set(e.clientY)
    }

    const over = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      setHovering(!!(t.closest('a') || t.closest('button') || t.closest('[data-cursor-hover]')))
    }

    window.addEventListener('mousemove', move)
    window.addEventListener('mouseover', over)
    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mouseover', over)
    }
  }, [x, y])

  if (!mounted) return null

  return (
    <>
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full bg-dough-300"
        style={{
          left: 0,
          top: 0,
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ width: hovering ? 8 : 12, height: hovering ? 8 : 12, opacity: hovering ? 0.5 : 1 }}
        transition={{ duration: 0.15 }}
      />
      <motion.div
        className="pointer-events-none fixed z-[9999] rounded-full border border-dough-300/60"
        style={{
          left: 0,
          top: 0,
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
        }}
        animate={{ width: hovering ? 48 : 32, height: hovering ? 48 : 32, opacity: hovering ? 1 : 0.55 }}
        transition={{ duration: 0.2 }}
      />
    </>
  )
}
