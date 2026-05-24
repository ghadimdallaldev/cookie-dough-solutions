import { motion, useInView } from 'framer-motion'
import { useEffect, useRef, useState, type RefObject } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'

type SplitTextProps = {
  text: string
  className?: string
  delay?: number
  stagger?: number
  by?: 'word' | 'char'
  as?: 'span' | 'h1' | 'h2' | 'h3' | 'p'
  /** Above-the-fold — animate on mount, no scroll dependency */
  immediate?: boolean
}

const EASE = [0.22, 1, 0.36, 1] as const

export function SplitText({
  text,
  className = '',
  delay = 0,
  stagger = 0.04,
  by = 'word',
  as: Tag = 'span',
  immediate = false,
}: SplitTextProps) {
  const ref = useRef<HTMLElement>(null)
  const reducedMotion = useReducedMotion()
  const inView = useInView(ref, { once: true, amount: 0.12, margin: '0px 0px -60px 0px' })
  const [visible, setVisible] = useState(immediate || reducedMotion)

  useEffect(() => {
    if (visible) return
    if (inView) setVisible(true)
  }, [inView, visible])

  useEffect(() => {
    if (immediate || reducedMotion || visible) return
    const t = window.setTimeout(() => setVisible(true), 2200)
    return () => window.clearTimeout(t)
  }, [immediate, reducedMotion, visible])

  const units = by === 'char' ? [...text] : text.split(' ')

  if (reducedMotion) {
    return (
      <Tag ref={ref as RefObject<HTMLHeadingElement>} className={className}>
        {text}
      </Tag>
    )
  }

  return (
    <Tag ref={ref as React.RefObject<HTMLHeadingElement>} className={className} aria-label={text}>
      <span className="inline-flex flex-wrap gap-x-[0.25em]">
        {units.map((unit, i) => (
          <span key={`${unit}-${i}`} className="inline-block overflow-hidden align-bottom">
            <motion.span
              className="inline-block will-change-transform"
              initial={{ y: '100%' }}
              animate={visible ? { y: 0 } : { y: '100%' }}
              transition={{ duration: 0.65, delay: delay + i * stagger, ease: EASE }}
            >
              {unit === ' ' ? '\u00A0' : unit}
              {by === 'word' && i < units.length - 1 ? '\u00A0' : ''}
            </motion.span>
          </span>
        ))}
      </span>
    </Tag>
  )
}
