import { SupplifyMockup, type MockVariant } from '../SupplifyMockup'

/** Lightweight product frame — no parallax, blur, or infinite float */
export function MockupStage({
  variant,
  className = '',
}: {
  variant: MockVariant
  className?: string
}) {
  return (
    <div className={`relative ${className}`}>
      <div className="rounded-[1.25rem] bg-dough-50 p-1 shadow-xl ring-1 ring-dough-200/80">
        <SupplifyMockup variant={variant} elevated className="w-full" />
      </div>
    </div>
  )
}
