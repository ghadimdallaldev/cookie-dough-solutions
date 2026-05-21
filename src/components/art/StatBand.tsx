import { useEffect, useRef, useState } from 'react'

function Counter({ target, suffix = '' }: { target: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const [n, setN] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setStarted(true)
          obs.disconnect()
        }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const duration = 900
    const start = performance.now()
    let frame: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target])

  return (
    <div ref={ref}>
      <span className="tabular-nums">
        {n}
        {suffix}
      </span>
    </div>
  )
}

export function StatBand({
  headline,
  stats,
  markets,
  dark = true,
}: {
  headline: string
  stats: { value: number; suffix?: string; label: string }[]
  markets?: string[]
  dark?: boolean
}) {
  return (
    <section className={`py-24 md:py-32 ${dark ? 'bg-ink text-white' : 'bg-white'}`}>
      <div className="mx-auto max-w-6xl px-6 text-center">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance md:text-5xl">
          {headline}
        </h2>
        <div className="mt-16 grid gap-12 sm:grid-cols-3">
          {stats.map((s) => (
            <div key={s.label}>
              <p className="font-display text-5xl font-extrabold text-dough-300 md:text-7xl">
                <Counter target={s.value} suffix={s.suffix} />
              </p>
              <p className="mt-2 text-xs font-bold uppercase tracking-widest text-dough-500">
                {s.label}
              </p>
            </div>
          ))}
        </div>
        {markets && markets.length > 0 && (
          <div className="mt-14 flex flex-wrap justify-center gap-2">
            {markets.map((m) => (
              <span
                key={m}
                className="rounded-full border border-dough-700 px-4 py-2 text-sm font-semibold text-dough-300"
              >
                {m}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
