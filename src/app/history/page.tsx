"use client"

import { motion } from "framer-motion"
import { History, ArrowRight, ExternalLink } from "lucide-react"
import { useState } from "react"
import { cn, formatAddress } from "@/lib/utils"
import { NetworkIcon } from "@/components/bridge/NetworkIcon"

type Transaction = {
  id: string
  date: string
  fromNetwork: string
  toNetwork: string
  asset: string
  amount: string
  status: "completed" | "pending" | "failed"
  txHash: string
}

const mockTransactions: Transaction[] = [
  {
    id: "1",
    date: "2026-08-15 14:32",
    fromNetwork: "eth",
    toNetwork: "bnb",
    asset: "ETH",
    amount: "1.25",
    status: "completed",
    txHash: "0x71a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
  },
  {
    id: "2",
    date: "2026-08-14 09:15",
    fromNetwork: "dorsen",
    toNetwork: "eth",
    asset: "DORSEN",
    amount: "150.00",
    status: "completed",
    txHash: "0x82b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2",
  },
  {
    id: "3",
    date: "2026-08-13 18:45",
    fromNetwork: "bnb",
    toNetwork: "dorsen",
    asset: "BNB",
    amount: "0.5",
    status: "pending",
    txHash: "0x93c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1b2c3",
  },
]

export default function HistoryPage() {
  const [walletConnected] = useState(false)

  return (
    <div className="relative min-h-screen">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-dorsen-cyan/5 via-transparent to-dorsen-blue/5" />
      </div>

      <section className="relative z-10 pt-24 pb-16 px-4 sm:px-6">
        <div className="mx-auto max-w-[1280px]">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="flex items-center gap-3 mb-8">
              <History className="h-6 w-6 text-dorsen-cyan" />
              <h1 className="text-2xl font-bold text-foreground">
                Bridge History
              </h1>
            </div>

            {!walletConnected ? (
              <div className="text-center py-20">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-dorsen-cyan/10 mx-auto mb-4">
                  <History className="h-8 w-8 text-dorsen-cyan" />
                </div>
                <h2 className="text-lg font-semibold text-foreground mb-2">
                  Wallet Not Connected
                </h2>
                <p className="text-sm text-foreground/60">
                  Connect your wallet to view bridge history.
                </p>
              </div>
            ) : (
              <>
                {/* Desktop Table */}
                <div className="hidden md:block rounded-xl border border-dorsen-border overflow-hidden">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-dorsen-navy-light border-b border-dorsen-border">
                        <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60">
                          Date
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60">
                          From
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60">
                          To
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60">
                          Asset
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60">
                          Amount
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60">
                          Status
                        </th>
                        <th className="px-4 py-3 text-left text-xs font-medium text-foreground/60">
                          Transaction
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mockTransactions.map((tx) => (
                        <tr
                          key={tx.id}
                          className="border-b border-dorsen-border hover:bg-white/[0.02]"
                        >
                          <td className="px-4 py-3 text-sm text-foreground/80">
                            {tx.date}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <NetworkIcon network={tx.fromNetwork} size="sm" />
                              <span className="text-sm text-foreground/80">
                                {tx.fromNetwork.toUpperCase()}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center gap-2">
                              <NetworkIcon network={tx.toNetwork} size="sm" />
                              <span className="text-sm text-foreground/80">
                                {tx.toNetwork.toUpperCase()}
                              </span>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm text-foreground/80">
                            {tx.asset}
                          </td>
                          <td className="px-4 py-3 text-sm font-medium text-foreground">
                            {tx.amount}
                          </td>
                          <td className="px-4 py-3">
                            <span
                              className={cn(
                                "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                                tx.status === "completed" &&
                                  "bg-dorsen-success/10 text-dorsen-success",
                                tx.status === "pending" &&
                                  "bg-dorsen-warning/10 text-dorsen-warning",
                                tx.status === "failed" &&
                                  "bg-dorsen-error/10 text-dorsen-error"
                              )}
                            >
                              {tx.status.charAt(0).toUpperCase() +
                                tx.status.slice(1)}
                            </span>
                          </td>
                          <td className="px-4 py-3">
                            <button className="flex items-center gap-1 text-xs text-dorsen-cyan hover:text-dorsen-cyan-light">
                              {formatAddress(tx.txHash, 4)}
                              <ExternalLink className="h-3 w-3" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="md:hidden space-y-3">
                  {mockTransactions.map((tx) => (
                    <div
                      key={tx.id}
                      className="rounded-xl border border-dorsen-border bg-dorsen-navy/50 p-4"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2">
                          <NetworkIcon network={tx.fromNetwork} size="sm" />
                          <ArrowRight className="h-3 w-3 text-foreground/40" />
                          <NetworkIcon network={tx.toNetwork} size="sm" />
                        </div>
                        <span
                          className={cn(
                            "inline-flex items-center rounded-full px-2 py-1 text-xs font-medium",
                            tx.status === "completed" &&
                              "bg-dorsen-success/10 text-dorsen-success",
                            tx.status === "pending" &&
                              "bg-dorsen-warning/10 text-dorsen-warning",
                            tx.status === "failed" &&
                              "bg-dorsen-error/10 text-dorsen-error"
                          )}
                        >
                          {tx.status.charAt(0).toUpperCase() +
                            tx.status.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {tx.amount} {tx.asset}
                          </p>
                          <p className="text-xs text-foreground/60">
                            {tx.date}
                          </p>
                        </div>
                        <button className="flex items-center gap-1 text-xs text-dorsen-cyan">
                          {formatAddress(tx.txHash, 4)}
                          <ExternalLink className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </motion.div>
        </div>
      </section>
    </div>
  )
}
