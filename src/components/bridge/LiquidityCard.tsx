import Image from "next/image"
import { cn } from "@/lib/utils"

export type LiquidityCardData = {
  name: string
  value: string
  label: string
  status: string
  network: string
  icon: string
}

type LiquidityCardProps = LiquidityCardData & {
  className?: string
}

export function LiquidityCard({
  name,
  value,
  label,
  status,
  network,
  icon,
  className,
}: LiquidityCardProps) {
  return (
    <div
      className={cn(
        "w-full max-w-[270px] rounded-2xl border",
        "p-3 sm:p-4",
        "bg-card border-border",
        "shadow-lg backdrop-blur-xl",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-1.5 sm:gap-2 mb-2">
        <Image
          src={icon}
          alt={name}
          width={24}
          height={24}
          className="h-5 w-5 sm:h-6 sm:w-6 shrink-0 rounded-full object-contain"
        />

        <h3 className="min-w-0 truncate text-xs sm:text-sm font-semibold text-card-foreground">
          {name}
        </h3>
      </div>

      {/* Value */}
      <div className="flex min-w-0 items-baseline gap-1.5 sm:gap-2">
        <span className="min-w-0 truncate text-[18px] sm:text-[24px] font-bold leading-none text-card-foreground">
          {value}
        </span>

        <span className="shrink-0 text-[9px] sm:text-[11px] text-muted">
          {label}
        </span>
      </div>

      {/* Bottom */}
      <div className="mt-3 flex min-w-0 items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-1.5">
          <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-success" />

          <span className="truncate text-[9px] sm:text-[11px] font-medium text-muted">
            {status}
          </span>
        </div>

        <span className="shrink-0 truncate text-[9px] sm:text-[11px] font-medium text-muted">
          {network}
        </span>
      </div>
    </div>
  )
}