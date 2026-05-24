import { ChevronDown } from 'lucide-react'

export function ScrollIndicator() {
  return (
    <div
      className="absolute bottom-8 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1.5 text-white/50 motion-safe:animate-pulse-soft"
      aria-hidden
    >
      <span className="text-[10px] font-semibold uppercase tracking-[0.25em]">Scroll</span>
      <ChevronDown className="h-4 w-4 motion-safe:animate-bounce-soft" />
    </div>
  )
}
