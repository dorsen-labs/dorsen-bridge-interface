"use client"

import { useAppKit, useAppKitAccount } from "@reown/appkit/react"
import { cn } from "@/lib/utils"

type ConnectWalletProps = {
  collapsed?: boolean
  compact?: boolean
  label?: string
}

export function ConnectWallet({ collapsed = false, compact = false }: ConnectWalletProps) {
  const { open } = useAppKit()
  const { address } = useAppKitAccount()

  if (!address) {
    return (
      <button
        onClick={() => open()}
        className={cn(
          "flex items-center gap-1.5 rounded-lg text-xs font-medium transition-all duration-200 bg-primary text-white hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          compact ? "h-8 px-3" : collapsed ? "h-10 w-10 justify-center px-0" : "h-10 px-4 w-full justify-center"
        )}
      >
        {compact ? (
          "Connect"
        ) : collapsed ? (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        ) : (
          "Connect Wallet"
        )}
      </button>
    )
  }

  return (
    <div className={cn(
      "p-1.5 bg-card border border-border rounded-2xl"
    )}>
      <appkit-account-button balance="hide" />
    </div>
  )
}

export default ConnectWallet
