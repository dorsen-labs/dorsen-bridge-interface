"use client"

import { useState } from "react"
import { ChevronDown, Check } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

type TokenSelectorProps = {
  value: string
  onChange: (symbol: string) => void
  disabled?: boolean
}

export function TokenSelector({
  value,
  onChange,
  disabled = false,
}: TokenSelectorProps) {
  const [open, setOpen] = useState(false)

  const handleSelect = () => {
    onChange(value)
    setOpen(false)
  }

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => !disabled && setOpen((prev) => !prev)}
        disabled={disabled}
        className={cn(
          "flex items-center gap-1.5",
          "rounded-lg border border-input-border",
          "bg-input-bg px-2.5 h-[32px]",
          "text-sm font-medium",
          "transition-all duration-200",
          "hover:border-primary/50",
          "focus-visible:outline-none",
          "focus-visible:ring-2 focus-visible:ring-primary",
          open && "border-primary/50 ring-1 ring-primary/20",
          disabled && "opacity-50 cursor-not-allowed"
        )}
      >
        <Image
          src="/images/coin/usdt.png"
          alt="USDT"
          width={18}
          height={18}
          className="rounded-full object-contain"
        />

        <span className="text-card-foreground">
          {value}
        </span>

        <ChevronDown
          className={cn(
            "h-3 w-3 text-muted transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && !disabled && (
  <>
    <div
      className="fixed inset-0 z-[90]"
      onClick={() => setOpen(false)}
    />

    <div
      className={cn(
        "absolute right-0 bottom-full z-[100]",
        "mb-2 w-[220px]",
        "rounded-xl",
        "border border-dropdown-border",
        "bg-dropdown-bg",
        "p-2 shadow-2xl"
      )}
    >
      <div className="px-3 py-2 text-xs font-medium text-muted">
        Select Asset
      </div>

      <button
        type="button"
        onClick={handleSelect}
        className={cn(
          "flex w-full items-center gap-2",
          "rounded-lg px-3 py-2",
          "text-left",
          "bg-primary/10 text-primary"
        )}
      >
        <Image
          src="/images/coin/usdt.png"
          alt="USDT"
          width={24}
          height={24}
          className="rounded-full object-contain"
        />

        <div className="flex-1">
          <span className="text-sm font-medium">
            USDT
          </span>

          <span className="block text-xs text-muted">
            Tether USD
          </span>
        </div>

        <Check className="h-3 w-3" />
      </button>
    </div>
  </>
)}
    </div>
  )
}
