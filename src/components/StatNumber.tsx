import { useEffect, useRef, useState } from 'react'

export function StatNumber({
  target,
  suffix = '',
  valueClassName = '',
  suffixClassName = '',
  editorial = false,
  sizeClassName,
  duration = 1000,
}: {
  target: number
  suffix?: string
  valueClassName?: string
  suffixClassName?: string
  editorial?: boolean
  sizeClassName?: string
  duration?: number
}) {
  const ref = useRef<HTMLSpanElement>(null)
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
      { threshold: 0.3 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    if (!started) return
    const start = performance.now()
    let frame: number
    const tick = (now: number) => {
      const p = Math.min((now - start) / duration, 1)
      setN(Math.round((1 - Math.pow(1 - p, 3)) * target))
      if (p < 1) frame = requestAnimationFrame(tick)
    }
    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [started, target, duration])

  const defaultSize = editorial
    ? 'font-display text-[clamp(2.5rem,8vw,4rem)] font-bold leading-none tracking-[-0.03em]'
    : 'font-display text-[clamp(3rem,10vw,5rem)] font-extrabold leading-none tracking-[-0.04em]'
  const size = sizeClassName ?? defaultSize

  return (
    <span ref={ref} className="inline-flex items-baseline">
      <span className={`tabular-nums ${size} ${valueClassName}`}>{started ? n : target}</span>
      {suffix ? (
        <span className={`${size} ml-1 ${editorial ? '' : 'text-stroke'} ${suffixClassName}`}>
          {suffix}
        </span>
      ) : null}
    </span>
  )
}
