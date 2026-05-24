import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

const EASE = [0.22, 1, 0.36, 1] as const

type RotatingWordsProps = {
  words: readonly string[]
  intervalMs?: number
  className?: string
  ariaLabel?: string
}

export function RotatingWords({
  words,
  intervalMs = 2800,
  className = '',
  ariaLabel,
}: RotatingWordsProps) {
  const reduced = useReducedMotion()
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced || words.length <= 1) return
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % words.length)
    }, intervalMs)
    return () => window.clearInterval(id)
  }, [reduced, words.length, intervalMs])

  const current = words[index] ?? words[0]

  if (reduced) {
    return (
      <span className={className} aria-label={ariaLabel ?? words.join(', ')}>
        {words[0]}
      </span>
    )
  }

  return (
    <span className={`relative inline-block ${className}`} aria-label={ariaLabel ?? words.join(', ')}>
      <span className="invisible" aria-hidden>
        {words.reduce((a, b) => (a.length >= b.length ? a : b), words[0])}
      </span>
      <AnimatePresence mode="wait">
        <motion.span
          key={current}
          className="absolute inset-0 inline-block"
          initial={{ y: '110%', opacity: 0, filter: 'blur(6px)' }}
          animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
          exit={{ y: '-110%', opacity: 0, filter: 'blur(6px)' }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          {current}
        </motion.span>
      </AnimatePresence>
    </span>
  )
}
