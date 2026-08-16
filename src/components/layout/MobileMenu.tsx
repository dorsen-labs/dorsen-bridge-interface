"use client"

import Link from "next/link"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { ConnectWallet } from "@/components/wallet/ConnectWallet"

type MobileMenuProps = {
  open: boolean
  onClose: () => void
  pathname: string
}

const navLinks = [
  { href: "/", label: "Bridge" },
  { href: "/history", label: "History" },
  { href: "/docs", label: "Docs" },
]

export function MobileMenu({ open, onClose, pathname }: MobileMenuProps) {
  if (!open) return null

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 w-72 bg-card border-l border-border p-6">
        <div className="flex items-center justify-between mb-8">
          <span className="text-lg font-bold text-card-foreground">Menu</span>
          <button
            onClick={onClose}
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted hover:text-card-foreground"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="flex flex-col gap-2 mb-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={onClose}
              className={cn(
                "px-4 py-3 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted hover:text-card-foreground hover:bg-primary/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex flex-col gap-3">
          <ConnectWallet />
          <ThemeToggle />
        </div>
      </div>
    </div>
  )
}
