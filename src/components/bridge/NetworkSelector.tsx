"use client"

import { useState } from "react"
import { ChevronDown, Check, Clock } from "lucide-react"
import { cn } from "@/lib/utils"
import { networks } from "@/config/networks"
import { NetworkIcon } from "./NetworkIcon"
import type { NetworkConfig } from "@/types/network"

type NetworkSelectorProps = {
  value: string
  onChange: (networkId: string) => void
  label: string
  excludeNetworkId?: string
}

export function NetworkSelector({
  value,
  onChange,
  label,
  excludeNetworkId,
}: NetworkSelectorProps) {
  const [open, setOpen] = useState(false)
  const selected = networks.find((n) => n.id === value)

  const availableNetworks = networks.filter((n) => n.id !== excludeNetworkId)

  const handleSelect = (network: NetworkConfig) => {
    if (network.status === "coming-soon") {
      return
    }
    onChange(network.id)
    setOpen(false)
  }

  return (
    <div className="relative">
      <label className="block text-xs font-medium text-muted mb-1.5">
        {label}
      </label>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex w-full items-center gap-3 rounded-[14px] border px-4 h-[56px] text-left transition-all duration-200",
          "border-input-border bg-input-bg hover:border-primary/50",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
          open && "border-primary/50 ring-1 ring-primary/20"
        )}
      >
        {selected && <NetworkIcon network={selected.id} size="sm" />}
        <span className="flex-1 text-sm font-medium text-card-foreground">
          {selected?.name || "Select Network"}
        </span>
        <ChevronDown
          className={cn(
            "h-4 w-4 text-muted transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40"
            onClick={() => setOpen(false)}
          />
          <div className="absolute left-0 right-0 top-full z-50 mt-2 rounded-xl border border-dropdown-border bg-dropdown-bg p-2 shadow-xl">
            <div className="text-xs font-medium text-muted px-3 py-2">
              Select {label.toLowerCase()} network
            </div>
            {availableNetworks.map((network) => {
              const isSelected = network.id === value
              const isDisabled = network.status === "coming-soon"

              return (
                <button
                  key={network.id}
                  onClick={() => handleSelect(network)}
                  disabled={isDisabled}
                  className={cn(
                    "flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition-colors",
                    isDisabled
                      ? "opacity-50 cursor-not-allowed"
                      : isSelected
                        ? "bg-primary/10 text-primary"
                        : "text-card-foreground hover:bg-primary/5"
                  )}
                >
                  <NetworkIcon network={network.id} size="sm" />
                  <div className="flex-1">
                    <div className="text-sm font-medium">{network.name}</div>
                    {isDisabled && (
                      <div className="flex items-center gap-1 text-xs text-warning">
                        <Clock className="h-3 w-3" />
                        Coming Soon
                      </div>
                    )}
                  </div>
                  {isSelected && <Check className="h-4 w-4" />}
                </button>
              )
            })}
          </div>
        </>
      )}
    </div>
  )
}
