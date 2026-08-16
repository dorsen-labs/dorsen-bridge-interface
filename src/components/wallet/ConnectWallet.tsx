"use client"

import { useAccount } from "wagmi"
import { Wallet } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWalletModal } from "@/hooks/useWalletModal"
import { WalletModal } from "./WalletModal"
import { WalletDropdown } from "./WalletDropdown"

export function ConnectWallet() {
  const { isConnected, isConnecting } = useAccount()
  const { walletModalOpen, openWalletModal, closeWalletModal } = useWalletModal()

  if (isConnected) {
    return <WalletDropdown />
  }

  return (
    <>
      <button
        onClick={openWalletModal}
        disabled={isConnecting}
        className={cn(
          "flex h-9 items-center gap-2 rounded-lg px-4 text-sm font-medium transition-all duration-200",
          "bg-primary text-white hover:bg-primary-light",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
          isConnecting && "opacity-70 cursor-wait"
        )}
      >
        <Wallet className="h-4 w-4" />
        <span className="hidden sm:inline">
          {isConnecting ? "Connecting..." : "Connect Wallet"}
        </span>
      </button>

      <WalletModal
        open={walletModalOpen}
        onClose={closeWalletModal}
      />
    </>
  )
}
