import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef } from 'react'
import { useReducedMotion } from '../../hooks/useReducedMotion'
import { home as h } from '../../theme/home'

type LineData = { text: string; chip: boolean }

const LINES: LineData[] = [
  { text: 'Most software forces you', chip: false },
  { text: 'to work around it.', chip: false },
  { text: 'We build software that', chip: true },
  { text: 'works around you. Obviously.', chip: true },
]

function ScrollWord({
  word,
  chip,
  progress,
  start,
  end,
}: {
  word: string
  chip: boolean
  progress: MotionValue<number>
  start: number
  end: number
}) {
  const opacity = useTransform(progress, [start, end], [0.1, 1])
  const y = useTransform(progress, [start, Math.min(end + 0.03, 1)], [5, 0])
  return (
    <motion.span
      className={`inline-block ${chip ? 'text-chip' : 'text-ink'}`}
      style={{ opacity, y }}
    >
      {word}
    </motion.span>
  )
}

export function HomeManifesto() {
  const ref = useRef<HTMLElement>(null)
  const reduced = useReducedMotion()
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.82', 'end 0.22'],
  })

  if (reduced) {
    return (
      <section className={`${h.section} ${h.sectionBorder} bg-paper-deep/80`}>
        <div className={`${h.container} max-w-4xl`}>
          <div className="space-y-3 md:space-y-4">
            {LINES.map(({ text, chip }) => (
              <p key={text} className={`${h.h2} ${chip ? 'text-chip' : 'text-ink'}`}>
                {text}
              </p>
            ))}
          </div>
        </div>
      </section>
    )
  }

  const lineLengths = LINES.map(l => l.text.split(' ').length)
  const totalWords = lineLengths.reduce((a, b) => a + b, 0)

  return (
    <section
      ref={ref}
      className={`${h.sectionBorder} relative bg-paper-deep/80 py-28 md:py-40`}
    >
      <div className={`${h.container} max-w-4xl`}>
        <div className="space-y-5 md:space-y-6" aria-label={LINES.map(l => l.text).join(' ')}>
          {LINES.map(({ text, chip }, lineIdx) => {
            const wordsBeforeLine = lineLengths.slice(0, lineIdx).reduce((a, b) => a + b, 0)
            return (
              <div key={text} className={`flex flex-wrap gap-x-[0.3em] ${h.h2}`}>
                {text.split(' ').map((word, wordIdx) => {
                  const globalIdx = wordsBeforeLine + wordIdx
                  const start = globalIdx / totalWords
                  const end = Math.min((globalIdx + 2.8) / totalWords, 1)
                  return (
                    <ScrollWord
                      key={`${word}-${wordIdx}`}
                      word={word}
                      chip={chip}
                      progress={scrollYProgress}
                      start={start}
                      end={end}
                    />
                  )
                })}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
