const LOGO_SRC = '/brand/supplify-logo.png'

type SupplifyLogoProps = {
  size?: number
  className?: string
  showWordmark?: boolean
  inverted?: boolean
}

export function SupplifyLogo({
  size = 48,
  className = '',
  showWordmark = false,
  inverted = false,
}: SupplifyLogoProps) {
  const mark = (
    <img
      src={LOGO_SRC}
      alt="Supplify"
      width={size}
      height={size}
      className="shrink-0 object-contain"
      style={{ width: size, height: size }}
    />
  )

  if (!showWordmark) {
    return <div className={className}>{mark}</div>
  }

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {mark}
      <div className="leading-tight">
        <span
          className={`font-display text-xl font-bold tracking-tight ${inverted ? 'text-paper' : 'text-chip'}`}
        >
          Supplify
        </span>
        <span
          className={`block text-[10px] font-semibold uppercase tracking-[0.2em] ${
            inverted ? 'text-dough-300' : 'text-dough-600'
          }`}
        >
          Enterprise ERP
        </span>
      </div>
    </div>
  )
}
