"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import type { BridgeQuote } from "@/types/bridge"

type BridgeSummaryProps = {
  quote: BridgeQuote
}

export function BridgeSummary({ quote }: BridgeSummaryProps) {
  const [expanded, setExpanded] = useState(false)

  return (
    <div className="rounded-xl border border-border bg-input-bg p-4 space-y-3">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">Estimated Receive</span>
        <span className="text-sm font-medium text-card-foreground">
          {quote.receiveAmount} {quote.token.symbol}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">Network Fee</span>
        <span className="text-sm font-medium text-card-foreground">
          {quote.networkFee} {quote.token.symbol}
        </span>
      </div>

      <div className="flex items-center justify-between">
        <span className="text-sm text-muted">Estimated Time</span>
        <span className="text-sm font-medium text-card-foreground">
          {quote.estimatedTime}
        </span>
      </div>

      <button
        onClick={() => setExpanded(!expanded)}
        className="flex w-full items-center justify-center gap-1 py-1 text-xs text-primary hover:text-primary-light transition-colors"
      >
        {expanded ? "Hide" : "View"} route details
        {expanded ? (
          <ChevronUp className="h-3 w-3" />
        ) : (
          <ChevronDown className="h-3 w-3" />
        )}
      </button>

      {expanded && (
        <div className="space-y-2 pt-2 border-t border-border">
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Bridge Fee</span>
            <span className="text-xs font-medium text-card-foreground">
              {quote.bridgeFee} {quote.token.symbol}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Minimum Received</span>
            <span className="text-xs font-medium text-card-foreground">
              {quote.minimumReceived} {quote.token.symbol}
            </span>
          </div>

          <div className="flex items-center justify-between">
            <span className="text-xs text-muted">Route</span>
            <span className="text-xs font-medium text-primary">
              {quote.route.name}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted">
            {quote.route.steps.map((step, i) => (
              <span key={i} className="flex items-center gap-1">
                <span className="font-medium text-card-foreground/80">
                  {step.network}
                </span>
                {i < quote.route.steps.length - 1 && <span>&rarr;</span>}
              </span>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
