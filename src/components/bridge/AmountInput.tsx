"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { TokenSelector } from "./TokenSelector"

type AmountInputProps = {
  value: string
  onChange: (value: string) => void
  token: string
  tokenIcon?: string
  onTokenChange?: (symbol: string) => void
  networkId?: string
  label: string
  balance?: string
  disabled?: boolean
  readOnly?: boolean
  loading?: boolean
}

export function AmountInput({
  value,
  onChange,
  token,
  tokenIcon,
  onTokenChange,
  label,
  balance = "0.00",
  disabled = false,
  readOnly = false,
  loading = false,
}: AmountInputProps) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (val === "" || /^\d*\.?\d*$/.test(val)) {
      onChange(val)
    }
  }

  const handleMax = () => {
    if (balance && balance !== "0.00" && balance !== "--") {
      onChange(balance)
    }
  }

  return (
    <div className="space-y-1.5">
      <label className="block text-xs font-medium text-muted">
        {label}
      </label>
      <div className="relative">
        {loading ? (
          <div className="flex h-[56px] items-center rounded-[14px] border border-input-border bg-input-bg px-4">
            <div className="h-4 w-24 animate-pulse rounded bg-muted/20" />
          </div>
        ) : (
          <input
            type="text"
            inputMode="decimal"
            value={value}
            onChange={handleChange}
            disabled={disabled}
            readOnly={readOnly}
            placeholder="0.00"
            className={cn(
              "w-full h-[56px] rounded-[14px] border border-input-border bg-input-bg px-4 pr-[140px] text-lg font-medium text-card-foreground placeholder:text-muted/50",
              "focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary/50",
              "disabled:opacity-50 disabled:cursor-not-allowed",
              readOnly && "cursor-default"
            )}
          />
        )}
        <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-2">
          {!readOnly && balance !== "0.00" && balance !== "--" && !disabled && (
            <button
              onClick={handleMax}
              className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary hover:bg-primary/20 transition-colors"
            >
              MAX
            </button>
          )}
          {readOnly ? (
            <div className="flex items-center gap-1.5 rounded-lg border border-input-border bg-input-bg px-2.5 h-[32px]">
              {tokenIcon && (
                <Image
                  src={tokenIcon}
                  alt={token}
                  width={18}
                  height={18}
                  className="rounded-full object-contain"
                />
              )}
              <span className="text-sm font-medium text-card-foreground">{token}</span>
            </div>
          ) : (
            <div className="relative z-30">
            <TokenSelector
              value={token}
              onChange={onTokenChange || (() => {})}
            />
            </div>
          )}
        </div>
      </div>
      {!readOnly && (
        <div className="flex justify-end">
          <span className="text-xs text-muted">
            Balance: {loading ? "..." : balance}
          </span>
        </div>
      )}
    </div>
  )
}
