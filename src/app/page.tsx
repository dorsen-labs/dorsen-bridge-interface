"use client"

import { motion } from "framer-motion"
import { Shield, Zap, Globe } from "lucide-react"
import { BridgeCard } from "@/components/bridge/BridgeCard"
import { LiquidityOverview } from "@/components/bridge/LiquidityOverview"

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(8,194,229,0.06)_0%,transparent_70%)]" />
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `linear-gradient(rgba(8,194,229,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(8,194,229,0.3) 1px, transparent 1px)`,
              backgroundSize: "60px 60px",
            }}
          />
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 pt-[120px] pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-[1280px] text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-[36px] sm:text-[44px] lg:text-[48px] font-bold leading-[1.1] tracking-tight mb-4">
              <span className="text-primary">DORSEN</span>{" "}
              <span className="text-card-foreground">BRIDGE</span>
            </h1>
            <p className="text-[17px] text-muted max-w-[650px] mx-auto mb-8">
              Secure Cross-Chain Asset Transfer
            </p>
            <p className="text-sm text-muted/70 max-w-[650px] mx-auto mb-10">
              Transfer digital assets across Ethereum, BNB Chain and DORSEN through
              a simple, secure bridge experience.
            </p>
          </motion.div>

          {/* Feature badges */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
          >
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm">
              <Shield className="h-4 w-4 text-primary" />
              <span>Secure</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm">
              <Zap className="h-4 w-4 text-primary" />
              <span>Fast</span>
            </div>
            <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium text-card-foreground shadow-sm">
              <Globe className="h-4 w-4 text-primary" />
              <span>Multi-Chain</span>
            </div>
          </motion.div>

          {/* Liquidity Cards */}
          <LiquidityOverview />

          {/* Bridge Card */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex justify-center"
          >
            <BridgeCard />
          </motion.div>
        </div>
      </section>
    </div>
  )
}
