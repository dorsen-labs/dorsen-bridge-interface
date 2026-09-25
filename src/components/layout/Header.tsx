// Header.tsx

"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, ExternalLink } from "lucide-react"
import { useState } from "react"
import { ThemeToggle } from "@/components/theme/ThemeToggle"
import ConnectWallet from "@/components/wallet/ConnectWallet"
import { MobileMenu } from "./MobileMenu"

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-40 glass">
      <div className="mx-auto flex h-[72px] max-w-[1280px] items-center justify-between px-4 sm:px-6">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <Image
            src="/images/coin/dorsen.png"
            alt="DORSEN"
            width={32}
            height={32}
            className="rounded-lg object-contain"
          />

          <span
            className="font-extrabold text-lg tracking-tight font-sans"
            style={{
              background: 'linear-gradient(20deg, rgb(28, 102, 166) 10%, rgb(230, 250, 236) 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            DORSEN
          </span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center gap-2">

          {/* Dark / Light */}
          <ThemeToggle />

          {/* Docs */}
          <a
            href="https://docs.dorsen.org/"
            target="_blank"
            rel="noopener noreferrer"
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium text-muted hover:text-card-foreground hover:bg-primary/5 transition-colors"
          >
            <span>Docs</span>
            <ExternalLink className="h-4 w-4" />
          </a>

          {/* Connect Wallet */}
          <ConnectWallet compact />

          {/* Mobile Menu Button */}
          {/* <button
            type="button"
            className="md:hidden flex h-9 w-9 items-center justify-center rounded-lg border border-border bg-card text-muted hover:text-card-foreground transition-colors"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button> */}
        </div>
      </div>

      {/* Mobile Menu */}
      {/* <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)} /> */}
    </header>
  )
}