import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function ManifestoSection({ text }: { text: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref as React.RefObject<Element>, { once: true, margin: '-15% 0px' })
  const words = text.split(' ')

  return (
    <section className="bg-ink py-24 md:py-36" ref={ref}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="mb-10 h-px w-16 bg-dough-700" />
        <p
          className="font-display font-extrabold leading-tight tracking-tight text-dough-100"
          style={{ fontSize: 'clamp(2rem, 5vw, 4.25rem)' }}
        >
          {words.map((word, i) => (
            <span key={i} className="mr-[0.25em] inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                initial={{ y: '115%', opacity: 0 }}
                animate={inView ? { y: 0, opacity: 1 } : { y: '115%', opacity: 0 }}
                transition={{ duration: 0.65, delay: i * 0.055, ease: [0.22, 1, 0.36, 1] }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </p>
      </div>
    </section>
  )
}
