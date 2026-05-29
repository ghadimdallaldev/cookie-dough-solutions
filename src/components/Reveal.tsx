import { motion, useInView } from 'framer-motion'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { useReducedMotion } from '../hooks/useReducedMotion'

type RevealProps = {
  children: React.ReactNode
  delay?: number
  className?: string
  clip?: boolean
  immediate?: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const

function useRevealVisible(ref: React.RefObject<Element | null>, immediate = false) {
  const inView = useInView(ref, { once: true, amount: 0.1, margin: '0px 0px -5% 0px' })
  const [fallback, setFallback] = useState(immediate)
  const [aboveFold, setAboveFold] = useState(immediate)

  useLayoutEffect(() => {
    if (immediate) return
    const el = ref.current
    if (!el) return
    const { top, bottom } = el.getBoundingClientRect()
    if (top < window.innerHeight * 0.92 && bottom > 0) {
      setAboveFold(true)
    }
  }, [immediate, ref])

  useEffect(() => {
    if (immediate) return
    const t = window.setTimeout(() => setFallback(true), 800)
    return () => window.clearTimeout(t)
  }, [immediate])

  return inView || aboveFold || fallback
}

export function Reveal({
  children,
  delay = 0,
  className = '',
  clip = false,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const reducedMotion = useReducedMotion()
  const visible = useRevealVisible(ref, immediate)
  const [done, setDone] = useState(reducedMotion || immediate)

  useEffect(() => {
    if (visible && !done) {
      const ms = reducedMotion ? 0 : (delay + (clip ? 0.75 : 0.7)) * 1000 + 80
      const t = window.setTimeout(() => setDone(true), ms)
      return () => window.clearTimeout(t)
    }
  }, [visible, done, delay, clip, reducedMotion])

  if (reducedMotion || done) {
    return <div className={className}>{children}</div>
  }

  if (clip) {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{ y: '110%' }}
          animate={visible ? { y: 0 } : { y: '110%' }}
          transition={{ duration: 0.75, delay, ease: EASE }}
        >
          {children}
        </motion.div>
      </div>
    )
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.7, delay, ease: EASE }}
    >
      {children}
    </motion.div>
  )
}
