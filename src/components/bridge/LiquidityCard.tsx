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
        "w-full max-w-[270px] rounded-2xl border p-4",
        "bg-card border-border",
        "shadow-lg backdrop-blur-xl",
        className
      )}
    >
      {/* Header */}
      <div className="flex items-center gap-2 mb-2">
        <Image
          src={icon}
          alt={name}
          width={24}
          height={24}
          className="rounded-full object-contain"
        />

        <h3 className="text-sm font-semibold text-card-foreground">
          {name}
        </h3>
      </div>

      {/* Value */}
      <div className="flex items-baseline gap-2">
        <span className="text-[24px] font-bold leading-none text-card-foreground">
          {value}
        </span>

        <span className="text-[11px] text-muted">
          {label}
        </span>
      </div>

      {/* Bottom */}
      <div className="mt-3 flex items-center justify-between">
        <div className="flex items-center gap-1.5">
          <span className="h-1.5 w-1.5 rounded-full bg-success" />

          <span className="text-[11px] font-medium text-muted">
            {status}
          </span>
        </div>

        <span className="text-[11px] font-medium text-muted">
          {network}
        </span>
      </div>
    </div>
  )
}