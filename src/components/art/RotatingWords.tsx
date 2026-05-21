import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function RotatingWords({
  words,
  intervalMs = 2800,
  className = '',
}: {
  words: readonly string[]
  intervalMs?: number
  className?: string
}) {
  const [i, setI] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setI((n) => (n + 1) % words.length), intervalMs)
    return () => clearInterval(t)
  }, [words.length, intervalMs])

  return (
    <div className={`relative overflow-hidden ${className}`}>
      <AnimatePresence mode="wait">
        <motion.span
          key={words[i]}
          className="absolute inset-0 block"
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: '-100%', opacity: 0 }}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        >
          {words[i]}
        </motion.span>
      </AnimatePresence>
    </div>
  )
}
