"use client"

import { useState } from "react"
import { useConnect, useAccount } from "wagmi"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

type WalletModalProps = {
  open: boolean
  onClose: () => void
}

export function WalletModal({ open, onClose }: WalletModalProps) {
  const [connectingId, setConnectingId] = useState<string | null>(null)
  const { connectors, connect, isPending } = useConnect()
  const { isConnected } = useAccount()

  const handleSelect = async (connectorId: string) => {
    const connector = connectors.find((c) => c.id === connectorId)
    if (!connector) return

    setConnectingId(connectorId)
    try {
      await connect({ connector })
      onClose()
    } catch {
      // User rejected or error
    } finally {
      setConnectingId(null)
    }
  }

  if (!open || isConnected) return null

  const rainbowConnector = connectors.find(
    (c) => c.id === "rainbow" || c.name?.toLowerCase().includes("rainbow")
  )
  const metaMaskConnector = connectors.find(
    (c) => c.id === "metaMask" || c.name?.toLowerCase().includes("metamask")
  )
  const walletConnectConnector = connectors.find(
    (c) => c.id === "walletConnect" || c.name?.toLowerCase().includes("walletconnect")
  )
  const injectedConnector = connectors.find((c) => c.id === "injected")

  const orderedConnectors = [
    rainbowConnector,
    metaMaskConnector,
    walletConnectConnector,
    injectedConnector,
    ...connectors.filter(
      (c) =>
        c.id !== "rainbow" &&
        c.id !== "metaMask" &&
        c.id !== "walletConnect" &&
        c.id !== "injected" &&
        !c.name?.toLowerCase().includes("rainbow") &&
        !c.name?.toLowerCase().includes("metamask") &&
        !c.name?.toLowerCase().includes("walletconnect")
    ),
  ].filter(Boolean)

  const connectorMeta: Record<string, { icon: string; description: string }> = {
    rainbow: { icon: "🌈", description: "Rainbow Wallet" },
    metaMask: { icon: "🦊", description: "MetaMask browser extension" },
    walletConnect: { icon: "🔗", description: "Scan QR with mobile wallet" },
    injected: { icon: "🔌", description: "Browser injected wallet" },
  }

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
            Connect Wallet
          </h2>
          <button
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-card-foreground hover:bg-primary/5"
            aria-label="Close"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <p className="text-sm text-muted mb-6">
          Choose a wallet to connect to DORSEN Bridge
        </p>

        <div className="space-y-3">
          {orderedConnectors.map((connector) => {
            if (!connector) return null
            const meta = connectorMeta[connector.id] || {
              icon: "Wallet",
              description: connector.name || "Connect wallet",
            }
            const isConnectingThis = connectingId === connector.id

            return (
              <button
                key={connector.id}
                onClick={() => handleSelect(connector.id)}
                disabled={isPending || (connectingId !== null && !isConnectingThis)}
                className={cn(
                  "flex w-full items-center gap-4 rounded-xl border p-4 text-left transition-all duration-200",
                  "border-border hover:border-primary/50 hover:bg-primary/5",
                  isConnectingThis && "border-primary bg-primary/10",
                  connectingId !== null && !isConnectingThis && "opacity-50"
                )}
              >
                <span className="text-2xl">{meta.icon}</span>
                <div className="flex-1">
                  <div className="text-sm font-medium text-card-foreground">
                    {connector.name || connector.id}
                  </div>
                  <div className="text-xs text-muted">
                    {meta.description}
                  </div>
                </div>
                {isConnectingThis && (
                  <div className="h-5 w-5 animate-spin rounded-full border-2 border-primary border-t-transparent" />
                )}
              </button>
            )
          })}

          {orderedConnectors.length === 0 && (
            <div className="text-center py-8">
              <p className="text-sm text-muted">
                No wallet connectors available.
              </p>
              <p className="text-xs text-muted/60 mt-2">
                Please install a wallet extension or configure WalletConnect.
              </p>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-6 w-full rounded-xl border border-border py-3 text-sm font-medium text-muted hover:bg-primary/5 transition-colors"
        >
          Cancel
        </button>
      </div>
    </div>
  )
}
