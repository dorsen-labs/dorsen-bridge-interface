"use client"

import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Menu } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import { ConnectWallet } from "@/components/wallet/ConnectWallet"
import { MobileMenu } from "./MobileMenu"

const navLinks = [
  { href: "/", label: "Bridge" },
  { href: "/history", label: "History" },
  { href: "/docs", label: "Docs" },
]

export function Header() {
  const pathname = usePathname()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/coin/dorsen.png"
            alt="DORSEN"
            width={32}
            height={32}
            className="rounded-lg object-contain"
          />
          <span className="text-lg font-bold text-card-foreground">
            DORSEN
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                pathname === link.href
                  ? "text-primary bg-primary/10"
                  : "text-muted hover:text-card-foreground hover:bg-primary/5"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <ConnectWallet />
          <button
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted hover:text-card-foreground transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </div>

      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        pathname={pathname}
      />
    </header>
  )
}
