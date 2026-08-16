"use client"

import { X, Check, ExternalLink } from "lucide-react"
import { cn } from "@/lib/utils"
import type { BridgeTransactionStatus } from "@/types/bridge"

type TransactionProgressProps = {
  status: BridgeTransactionStatus
  fromNetwork: string
  toNetwork: string
  amount: string
  token: string
  onClose: () => void
}

const steps = [
  { key: "wallet-connected", label: "Wallet Connected", icon: "✓" },
  { key: "source-confirmed", label: "Source Transaction Confirmed", icon: "✓" },
  { key: "bridge-processing", label: "Bridge Processing", icon: "●" },
  { key: "dest-confirmed", label: "Destination Transaction", icon: "○" },
  { key: "completed", label: "Completed", icon: "○" },
]

export function TransactionProgress({
  status,
  fromNetwork,
  toNetwork,
  amount,
  token,
  onClose,
}: TransactionProgressProps) {
  const getStepState = (stepKey: string) => {
    const statusMap: Record<string, number> = {
      "wallet-connected": 0,
      "confirming": 1,
      "source-confirmed": 2,
      "transferring": 3,
      "dest-confirmed": 4,
      "success": 5,
      "failed": 2,
    }
    const currentIdx = statusMap[status] ?? 0

    const stepOrder = [
      "wallet-connected",
      "source-confirmed",
      "bridge-processing",
      "dest-confirmed",
      "completed",
    ]
    const stepIdx = stepOrder.indexOf(stepKey)

    if (status === "success") return "completed"
    if (status === "failed" && stepIdx === currentIdx) return "failed"
    if (stepIdx < currentIdx) return "completed"
    if (stepIdx === currentIdx) return "current"
    return "pending"
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={status === "success" || status === "failed" ? onClose : undefined}
      />
      <div
        className={cn(
          "relative w-full max-w-md mx-4 rounded-2xl border p-6",
          "bg-card border-border shadow-2xl"
        )}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-card-foreground">
            Bridge Transaction
          </h2>
          {(status === "success" || status === "failed") && (
            <button
              onClick={onClose}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-card-foreground hover:bg-primary/5"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>

        <div className="space-y-4 mb-6">
          {steps.map((step) => {
            const state = getStepState(step.key)
            return (
              <div key={step.key} className="flex items-center gap-3">
                <div
                  className={cn(
                    "flex h-6 w-6 items-center justify-center rounded-full text-xs",
                    state === "completed" &&
                      "bg-success text-white",
                    state === "current" &&
                      "bg-primary text-white animate-pulse",
                    state === "failed" &&
                      "bg-error text-white",
                    state === "pending" &&
                      "bg-muted/10 text-muted"
                  )}
                >
                  {state === "completed" ? (
                    <Check className="h-3 w-3" />
                  ) : (
                    <span>{step.icon}</span>
                  )}
                </div>
                <span
                  className={cn(
                    "text-sm",
                    state === "completed" && "text-card-foreground",
                    state === "current" && "text-primary font-medium",
                    state === "failed" && "text-error",
                    state === "pending" && "text-muted"
                  )}
                >
                  {step.label}
                  {state === "current" && (
                    <span className="ml-2 text-xs">In progress...</span>
                  )}
                </span>
              </div>
            )
          })}
        </div>

        <div className="rounded-xl border border-border bg-input-bg p-4 space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted">From</span>
            <span className="text-card-foreground">{fromNetwork}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">To</span>
            <span className="text-card-foreground">{toNetwork}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted">Amount</span>
            <span className="text-card-foreground">
              {amount} {token}
            </span>
          </div>
        </div>

        {status === "success" && (
          <div className="mt-4 text-center">
            <p className="text-sm text-success font-medium">
              Bridge Successful
            </p>
            <p className="text-xs text-muted mt-1">
              Your assets have been successfully transferred.
            </p>
            <button className="mt-3 flex items-center gap-1 mx-auto text-sm text-primary hover:text-primary-light">
              View Transaction
              <ExternalLink className="h-3 w-3" />
            </button>
          </div>
        )}

        {status === "failed" && (
          <div className="mt-4 text-center">
            <p className="text-sm text-error font-medium">
              Transaction Failed
            </p>
            <p className="text-xs text-muted mt-1">
              The bridge transaction could not be completed.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
