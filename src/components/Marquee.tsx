type MarqueeProps = {
  words?: string[]
  dark?: boolean
  className?: string
}

const DEFAULT = ['explore it', 'enable it', 'scale it', 'ship it', 'taste it']

export function Marquee({ words = DEFAULT, dark = false, className = '' }: MarqueeProps) {
  const row = [...words, ...words, ...words, ...words]
  return (
    <section
      className={`overflow-hidden border-y py-6 md:py-8 ${
        dark ? 'border-white/10 bg-ink' : 'border-dough-200 bg-chip'
      } ${className}`}
    >
      <div className="flex animate-marquee whitespace-nowrap">
        {row.map((word, i) => (
          <span
            key={`${word}-${i}`}
            className={`mx-10 font-display text-3xl font-extrabold uppercase tracking-tight md:text-6xl ${
              dark ? 'text-dough-200/90' : 'text-dough-100'
            }`}
          >
            {word}
          </span>
        ))}
      </div>
    </section>
  )
}
