"use client"

import { motion } from "framer-motion"
import { BookOpen, Shield, Zap, HelpCircle, DollarSign, Network } from "lucide-react"
import { useState } from "react"
import { cn } from "@/lib/utils"
import { NetworkIcon } from "@/components/bridge/NetworkIcon"

const sections = [
  {
    id: "overview",
    title: "Overview",
    icon: BookOpen,
    content: `DORSEN Bridge is a cross-chain asset transfer protocol that enables users to move digital assets securely between supported blockchain networks. Built on the Data Oriented Secure Network (DORSEN) infrastructure, the bridge provides a seamless and secure experience for multi-chain asset management.`,
  },
  {
    id: "networks",
    title: "Supported Networks",
    icon: Network,
    content: `DORSEN Bridge currently supports the following networks:`,
    networks: [
      { id: "eth", name: "Ethereum", status: "Available" },
      { id: "bnb", name: "BNB Chain", status: "Available" },
      { id: "dorsen", name: "DORSEN", status: "Available" },
      { id: "polygon", name: "Polygon", status: "Coming Soon" },
    ],
  },
  {
    id: "how-to",
    title: "How to Bridge",
    icon: Zap,
    steps: [
      "Connect your Web3 wallet to DORSEN Bridge",
      "Select the source network (From) and destination network (To)",
      "Choose the asset you want to transfer",
      "Enter the amount to bridge",
      "Review the transaction details and fees",
      "Confirm the transaction in your wallet",
      "Wait for the bridge to process and confirm on both networks",
    ],
  },
  {
    id: "fees",
    title: "Fees",
    icon: DollarSign,
    content: `DORSEN Bridge charges a small bridge fee for cross-chain transfers. Network fees (gas) are paid on the source network and vary depending on network congestion. All fees are displayed before you confirm any transaction.`,
  },
  {
    id: "security",
    title: "Security",
    icon: Shield,
    content: `DORSEN Bridge prioritizes security through smart contract audits, multi-signature validation, and real-time monitoring. All bridge transactions are verified on-chain. Never share your private keys or seed phrases with anyone.`,
  },
  {
    id: "faq",
    title: "FAQ",
    icon: HelpCircle,
    items: [
      {
        q: "How long does a bridge transaction take?",
        a: "Bridge transactions typically take 2-5 minutes depending on network congestion and confirmation times.",
      },
      {
        q: "What happens if my transaction fails?",
        a: "If a transaction fails, your assets will be returned to your wallet on the source network. You may need to pay a gas fee for the return transaction.",
      },
      {
        q: "Is there a minimum amount?",
        a: "Minimum amounts vary by network and token. The bridge will display any minimum requirements before you confirm.",
      },
      {
        q: "Can I bridge any token?",
        a: "DORSEN Bridge currently supports a curated list of tokens. Additional tokens will be added over time.",
      },
    ],
  },
]

export default function DocsPage() {
  const [activeSection, setActiveSection] = useState("overview")

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
              <BookOpen className="h-6 w-6 text-dorsen-cyan" />
              <h1 className="text-2xl font-bold text-foreground">
                Documentation
              </h1>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Sidebar */}
              <nav className="lg:col-span-1">
                <div className="rounded-xl border border-dorsen-border bg-dorsen-navy/50 p-4 sticky top-24">
                  <div className="space-y-1">
                    {sections.map((section) => {
                      const Icon = section.icon
                      return (
                        <button
                          key={section.id}
                          onClick={() => setActiveSection(section.id)}
                          className={cn(
                            "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors text-left",
                            activeSection === section.id
                              ? "bg-dorsen-cyan/10 text-dorsen-cyan"
                              : "text-foreground/60 hover:text-foreground hover:bg-white/5"
                          )}
                        >
                          <Icon className="h-4 w-4" />
                          {section.title}
                        </button>
                      )
                    })}
                  </div>
                </div>
              </nav>

              {/* Content */}
              <div className="lg:col-span-3">
                {sections
                  .filter((s) => s.id === activeSection)
                  .map((section) => {
                    const Icon = section.icon
                    return (
                      <motion.div
                        key={section.id}
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.3 }}
                        className="rounded-xl border border-dorsen-border bg-dorsen-navy/50 p-6 sm:p-8"
                      >
                        <div className="flex items-center gap-3 mb-6">
                          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-dorsen-cyan/10">
                            <Icon className="h-5 w-5 text-dorsen-cyan" />
                          </div>
                          <h2 className="text-xl font-semibold text-foreground">
                            {section.title}
                          </h2>
                        </div>

                        {section.content && (
                          <p className="text-sm text-foreground/70 leading-relaxed">
                            {section.content}
                          </p>
                        )}

                        {section.networks && (
                          <div className="space-y-3 mt-4">
                            {section.networks.map((network) => (
                              <div
                                key={network.id}
                                className="flex items-center gap-3 rounded-lg border border-dorsen-border bg-dorsen-navy-light/50 p-3"
                              >
                                <NetworkIcon network={network.id} size="md" />
                                <div className="flex-1">
                                  <span className="text-sm font-medium text-foreground">
                                    {network.name}
                                  </span>
                                </div>
                                <span
                                  className={cn(
                                    "text-xs font-medium",
                                    network.status === "Available"
                                      ? "text-dorsen-success"
                                      : "text-dorsen-warning"
                                  )}
                                >
                                  {network.status}
                                </span>
                              </div>
                            ))}
                          </div>
                        )}

                        {section.steps && (
                          <ol className="space-y-3 mt-4">
                            {section.steps.map((step, i) => (
                              <li
                                key={i}
                                className="flex items-start gap-3 text-sm text-foreground/70"
                              >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-dorsen-cyan/10 text-xs font-medium text-dorsen-cyan">
                                  {i + 1}
                                </span>
                                {step}
                              </li>
                            ))}
                          </ol>
                        )}

                        {section.items && (
                          <div className="space-y-4 mt-4">
                            {section.items.map((item, i) => (
                              <div
                                key={i}
                                className="rounded-lg border border-dorsen-border bg-dorsen-navy-light/50 p-4"
                              >
                                <h3 className="text-sm font-medium text-foreground mb-2">
                                  {item.q}
                                </h3>
                                <p className="text-sm text-foreground/60">
                                  {item.a}
                                </p>
                              </div>
                            ))}
                          </div>
                        )}
                      </motion.div>
                    )
                  })}
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}
