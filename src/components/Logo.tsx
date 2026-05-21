import { Link } from 'react-router-dom'

type LogoProps = {
  className?: string
  inverted?: boolean
  /** Show wordmark beside the mark */
  showWordmark?: boolean
  /** Link mark to home */
  linkHome?: boolean
  size?: 'sm' | 'md' | 'lg'
}

const SIZES = { sm: 'h-8 w-8', md: 'h-10 w-10', lg: 'h-14 w-14' }
const MARK = { light: '/brand/logo-mark.svg', dark: '/brand/logo-mark-dark.svg' }

export function Logo({
  className = '',
  inverted = false,
  showWordmark = true,
  linkHome = false,
  size = 'md',
}: LogoProps) {
  const markSrc = inverted ? MARK.dark : MARK.light
  const iconSize = SIZES[size]

  const mark = (
    <img
      src={markSrc}
      alt=""
      className={`${iconSize} shrink-0 rounded-2xl shadow-md ring-2 ${
        inverted ? 'ring-white/15' : 'ring-dough-200/80'
      }`}
      width={56}
      height={56}
    />
  )

  const content = (
    <div className={`flex items-center gap-3 ${className}`}>
      {linkHome ? <Link to="/">{mark}</Link> : mark}
      {showWordmark && (
        <div className="leading-tight">
          <span
            className={`font-display text-lg font-bold tracking-tight ${inverted ? 'text-white' : 'text-chip'}`}
          >
            Cookie Dough
          </span>
          <span
            className={`block text-[10px] font-semibold uppercase tracking-[0.2em] ${
              inverted ? 'text-dough-300' : 'text-dough-600'
            }`}
          >
            Solutions
          </span>
        </div>
      )}
    </div>
  )

  if (linkHome && showWordmark) {
    return (
      <Link to="/" className={`flex items-center gap-3 ${className}`}>
        {mark}
        <div className="leading-tight">
          <span
            className={`font-display text-lg font-bold tracking-tight ${inverted ? 'text-white' : 'text-chip'}`}
          >
            Cookie Dough
          </span>
          <span
            className={`block text-[10px] font-semibold uppercase tracking-[0.2em] ${
              inverted ? 'text-dough-300' : 'text-dough-600'
            }`}
          >
            Solutions
          </span>
        </div>
      </Link>
    )
  }

  return content
}

/** Shown on Supplify pages — product under the parent company */
export function ParentCompanyBadge({ inverted = false }: { inverted?: boolean }) {
  return (
    <Link
      to="/"
      className={`inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold transition ${
        inverted
          ? 'border-white/20 bg-white/10 text-dough-200 hover:bg-white/15 hover:text-white'
          : 'border-dough-200 bg-dough-50 text-dough-700 hover:border-dough-300 hover:text-chip'
      }`}
    >
      <img
        src={inverted ? MARK.dark : MARK.light}
        alt=""
        className="h-5 w-5 rounded-md"
        width={20}
        height={20}
      />
      A Cookie Dough Solutions product
    </Link>
  )
}
