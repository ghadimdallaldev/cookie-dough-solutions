import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

type RevealProps = {
  children: React.ReactNode
  delay?: number
  className?: string
  clip?: boolean
}

export function Reveal({ children, delay = 0, className = '', clip = false }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-8% 0px' })

  if (clip) {
    return (
      <div ref={ref} className={`overflow-hidden ${className}`}>
        <motion.div
          initial={{ y: '110%' }}
          animate={inView ? { y: 0 } : { y: '110%' }}
          transition={{ duration: 0.75, delay, ease: [0.22, 1, 0.36, 1] }}
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
      initial={{ opacity: 0, y: 36 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 36 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}
