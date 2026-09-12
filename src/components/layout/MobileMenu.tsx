"use client"

import { X, ExternalLink } from "lucide-react"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import ConnectWallet from "@/components/wallet/ConnectWallet"

type MobileMenuProps = {
  open: boolean
  onClose: () => void
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Mobile Drawer */}
      <div className="fixed inset-y-0 right-0 w-72 bg-card border-l border-border p-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-bold text-card-foreground">
            Menu
          </span>

          <button
            type="button"
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:text-card-foreground transition-colors"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Docs */}
        <nav className="mb-8">
          <a
            href="https://docs.dorsen.org/"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
            className="flex items-center justify-between w-full px-4 py-3 rounded-lg text-sm font-medium text-muted hover:text-card-foreground hover:bg-primary/5 transition-colors"
          >
            <span>Docs</span>
            <ExternalLink className="h-4 w-4" />
          </a>
        </nav>

        {/* Wallet & Theme */}
        <div className="flex flex-col gap-3">
          <ConnectWallet />
          <ThemeToggle />
        </div>

      </div>
    </div>
  )
}