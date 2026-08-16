"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type BridgeSettingsProps = {
  open: boolean
  onClose: () => void
}

export function BridgeSettings({ open, onClose }: BridgeSettingsProps) {
  const [slippage, setSlippage] = useState("Auto")
  const [gas, setGas] = useState("Standard")
  const [deadline, setDeadline] = useState("20")

  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div
        className={cn(
          "relative w-full max-w-md mx-4 rounded-2xl border p-6",
          "bg-card border-border shadow-2xl"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-card-foreground">
            Transaction Settings
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-card-foreground hover:bg-primary/5"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Slippage
            </label>
            <div className="flex gap-2">
              {["Auto", "0.1%", "0.5%", "1%"].map((val) => (
                <button
                  key={val}
                  onClick={() => setSlippage(val)}
                  className={cn(
                    "flex-1 rounded-lg border py-2 text-sm font-medium transition-colors",
                    slippage === val
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted hover:border-primary/50"
                  )}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Gas Preference
            </label>
            <div className="flex gap-2">
              {["Standard", "Fast", "Instant"].map((val) => (
                <button
                  key={val}
                  onClick={() => setGas(val)}
                  className={cn(
                    "flex-1 rounded-lg border py-2 text-sm font-medium transition-colors",
                    gas === val
                      ? "border-primary bg-primary/10 text-primary"
                      : "border-border text-muted hover:border-primary/50"
                  )}
                >
                  {val}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-card-foreground mb-2">
              Deadline (minutes)
            </label>
            <input
              type="number"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              min={5}
              max={60}
              className={cn(
                "w-full rounded-xl border border-input-border bg-input-bg px-4 py-3 text-sm text-card-foreground",
                "focus:outline-none focus:ring-2 focus:ring-primary/50"
              )}
            />
          </div>
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-primary py-3 text-sm font-semibold text-white hover:bg-primary-light transition-colors"
        >
          Save
        </button>
      </div>
    </div>
  )
}
