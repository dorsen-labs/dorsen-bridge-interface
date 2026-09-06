"use client"

import { useState, useRef, useEffect } from "react"
import { useAppKit, useAppKitAccount, useAppKitNetwork } from "@reown/appkit/react"
import { useDisconnect } from "@reown/appkit-core/react"
import { Copy, ChevronDown, LogOut } from "lucide-react"
import { cn, formatAddress } from "@/lib/utils"
import { networks } from "@/config"
import { NetworkIcon } from "@/components/bridge/NetworkIcon"

const SUPPORTED_CHAIN_IDS = [1, 56, 8888, 137] as const

function getNetworkId(chainId: number | string | undefined): string {
  const id = Number(chainId)
  if (id === 1) return "eth"
  if (id === 56) return "bnb"
  if (id === 8888) return "dorsen"
  if (id === 137) return "polygon"
  return "eth"
}

function getNetworkName(chainId: number | string | undefined): string {
  const id = Number(chainId)
  const net = networks.find((n) => n.id === id)
  return net?.name || "Unknown"
}

export function ConnectWallet() {
  const [open, setOpen] = useState(false)
  const [copied, setCopied] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const { open: openModal } = useAppKit()
  const { isConnected, address } = useAppKitAccount()
  const { chainId, switchNetwork } = useAppKitNetwork()
  const { disconnect } = useDisconnect()

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  const handleCopy = async () => {
    if (address) {
      await navigator.clipboard.writeText(address)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }
  }

  const handleDisconnect = () => {
    disconnect()
    setOpen(false)
  }

  const handleSwitchNetwork = (targetChainId: number) => {
    if (targetChainId === Number(chainId)) return
    const targetNetwork = networks.find((n) => n.id === targetChainId)
    if (targetNetwork && switchNetwork) {
      switchNetwork(targetNetwork)
    }
  }

  if (!isConnected) {
    return (
      <button
        onClick={() => openModal()}
        className="flex h-9 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-all duration-200 bg-primary text-white hover:bg-primary-light focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
      >
        Connect Wallet
      </button>
    )
  }

  const networkId = getNetworkId(chainId)
  const networkName = getNetworkName(chainId)

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className={cn(
          "flex h-9 items-center gap-2 rounded-lg border px-3 text-sm font-medium transition-all duration-200",
          "border-primary/30 bg-primary/10 text-primary hover:bg-primary/20",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
        )}
      >
        <NetworkIcon network={networkId} size="sm" />
        <span className="text-xs text-muted">{networkName}</span>
        <div className="w-px h-3 bg-primary/30" />
        <span>{formatAddress(address || "")}</span>
        <ChevronDown className={cn("h-3 w-3 transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <div className="absolute right-0 top-full mt-2 w-72 rounded-xl border border-dropdown-border bg-dropdown-bg p-4 shadow-xl z-50">
          <div className="text-xs text-muted mb-2">Connected Wallet</div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-mono text-card-foreground">
              {formatAddress(address || "", 6)}
            </span>
          </div>

          <div className="mt-3 mb-4">
            <div className="text-xs text-muted mb-1.5">Network</div>
            <div className="flex items-center gap-2">
              <NetworkIcon network={networkId} size="sm" />
              <span className="text-sm font-medium text-card-foreground">{networkName}</span>
            </div>
          </div>

          <div className="border-t border-border pt-3 mb-3">
            <div className="text-xs text-muted mb-2">Switch Network</div>
            <div className="grid grid-cols-2 gap-1.5">
              {SUPPORTED_CHAIN_IDS.map((cid) => {
                const net = networks.find((n) => n.id === cid)
                if (!net) return null
                const isActive = cid === Number(chainId)
                return (
                  <button
                    key={cid}
                    onClick={() => handleSwitchNetwork(cid)}
                    disabled={isActive}
                    className={cn(
                      "flex items-center gap-1.5 rounded-lg px-2.5 py-2 text-xs font-medium transition-colors",
                      isActive
                        ? "bg-primary/10 text-primary border border-primary/30"
                        : "text-muted hover:text-card-foreground hover:bg-primary/5 border border-transparent",
                      isActive && "cursor-not-allowed"
                    )}
                  >
                    <NetworkIcon network={getNetworkId(cid)} size="sm" />
                    <span>{net.name}</span>
                  </button>
                )
              })}
            </div>
          </div>

          <div className="space-y-1 border-t border-border pt-3">
            <button
              onClick={handleCopy}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-muted hover:text-card-foreground hover:bg-primary/5 transition-colors"
            >
              <Copy className="h-4 w-4" />
              {copied ? "Copied!" : "Copy Address"}
            </button>
            <button
              onClick={handleDisconnect}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-error hover:bg-error/10 transition-colors"
            >
              <LogOut className="h-4 w-4" />
              Disconnect
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
