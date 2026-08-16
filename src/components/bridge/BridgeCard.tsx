"use client"

import { useState, useCallback, useRef } from "react"
import { useAccount } from "wagmi"
import { ArrowUpDown, Settings } from "lucide-react"
import { cn } from "@/lib/utils"
import { useWalletModal } from "@/hooks/useWalletModal"
import { getActiveNetworks, getNetworkById } from "@/config/networks"
import { NetworkSelector } from "./NetworkSelector"
import { AmountInput } from "./AmountInput"
import { BridgeSummary } from "./BridgeSummary"
import { BridgeSettings } from "./BridgeSettings"
import { TransactionProgress } from "./TransactionProgress"
import { fetchBridgeQuote } from "@/lib/bridge"
import type { BridgeQuote, BridgeTransactionStatus } from "@/types/bridge"

const SEND_TOKEN = {
  symbol: "USDT",
  name: "Tether USD",
  icon: "/images/coin/usdt.png",
}

const RECEIVE_TOKENS: Record<string, { symbol: string; icon: string }> = {
  eth: { symbol: "USDT", icon: "/images/coin/usdt.png" },
  bnb: { symbol: "USDT", icon: "/images/coin/usdt.png" },
  dorsen: { symbol: "USDT", icon: "/images/coin/usdt.png" },
}

export function BridgeCard() {
  const activeNetworks = getActiveNetworks()
  const { isConnected } = useAccount()
  const { openWalletModal } = useWalletModal()

  const [fromNetwork, setFromNetwork] = useState(activeNetworks[0]?.id || "eth")
  const [toNetwork, setToNetwork] = useState(activeNetworks[1]?.id || "bnb")
  const [amount, setAmount] = useState("")
  const [quote, setQuote] = useState<BridgeQuote | null>(null)
  const [quoteLoading, setQuoteLoading] = useState(false)
  const [settingsOpen, setSettingsOpen] = useState(false)
  const [txStatus, setTxStatus] = useState<BridgeTransactionStatus>("idle")

  const fromNetworkData = getNetworkById(fromNetwork)
  const toNetworkData = getNetworkById(toNetwork)

  const prevNetworkRef = useRef(fromNetwork)

  const fetchQuote = useCallback(
    async (networkFrom: string, networkTo: string, amt: string) => {
      if (!amt || parseFloat(amt) <= 0) {
        setQuote(null)
        return
      }

      setQuoteLoading(true)
      try {
        const q = await fetchBridgeQuote(networkFrom, networkTo, SEND_TOKEN.symbol, amt)
        setQuote(q)
      } finally {
        setQuoteLoading(false)
      }
    },
    []
  )

  const handleFromNetworkChange = (id: string) => {
    setFromNetwork(id)
    if (id === toNetwork) {
      const other = activeNetworks.find((n) => n.id !== id)
      if (other) setToNetwork(other.id)
    }

    const targetTo = id === toNetwork
      ? activeNetworks.find((n) => n.id !== id)?.id || toNetwork
      : toNetwork
    if (id !== toNetwork) {
      fetchQuote(id, toNetwork, amount)
    } else if (targetTo) {
      fetchQuote(id, targetTo, amount)
    }

    prevNetworkRef.current = id
  }

  const handleToNetworkChange = (id: string) => {
    setToNetwork(id)
    if (id === fromNetwork) {
      const other = activeNetworks.find((n) => n.id !== id)
      if (other) setFromNetwork(other.id)
    }
    fetchQuote(fromNetwork, id, amount)
  }

  const handleSwitchNetworks = useCallback(() => {
    const tempFrom = fromNetwork
    const tempTo = toNetwork
    setFromNetwork(tempTo)
    setToNetwork(tempFrom)

    fetchQuote(tempTo, tempFrom, amount)
  }, [fromNetwork, toNetwork, amount, fetchQuote])

  const handleAmountChange = (val: string) => {
    setAmount(val)
    fetchQuote(fromNetwork, toNetwork, val)
  }

  const getButtonState = () => {
    if (!isConnected) {
      return { label: "Connect Wallet", disabled: false, action: "connect" as const }
    }
    if (!amount || parseFloat(amount) <= 0) {
      return { label: "Enter Amount", disabled: true, action: "enter" as const }
    }
    if (quoteLoading) {
      return { label: "Calculating...", disabled: true, action: "loading" as const }
    }
    if (!quote) {
      return { label: "Bridge Assets", disabled: true, action: "no-quote" as const }
    }
    return { label: "Bridge Assets", disabled: false, action: "bridge" as const }
  }

  const buttonState = getButtonState()

  const handleAction = () => {
    if (buttonState.action === "connect") {
      openWalletModal()
    } else if (buttonState.action === "bridge") {
      setTxStatus("confirming")
    }
  }

  return (
    <>
      <div
        className={cn(
          "w-full max-w-[560px] rounded-2xl border p-6 shadow-xl",
          "bg-card border-border",
          "backdrop-blur-xl"
        )}
      >
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-lg font-semibold text-card-foreground">Bridge</h2>
          <button
            onClick={() => setSettingsOpen(true)}
            className="flex h-8 w-8 items-center justify-center rounded-lg text-muted hover:text-card-foreground hover:bg-primary/5 transition-colors"
            aria-label="Settings"
          >
            <Settings className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-3.5">
          <NetworkSelector
            value={fromNetwork}
            onChange={handleFromNetworkChange}
            label="From"
            excludeNetworkId={toNetwork}
          />

          <div className="flex justify-center -my-0.5">
            <button
              onClick={handleSwitchNetworks}
              className={cn(
                "flex h-[44px] w-[44px] items-center justify-center rounded-full border transition-all duration-300",
                "border-border bg-card hover:border-primary/50 hover:bg-primary/5",
                "hover:rotate-180 hover:shadow-[0_0_15px_rgba(8,194,229,0.2)]",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              )}
              aria-label="Switch networks"
            >
              <ArrowUpDown className="h-4 w-4 text-muted" />
            </button>
          </div>

          <NetworkSelector
            value={toNetwork}
            onChange={handleToNetworkChange}
            label="To"
            excludeNetworkId={fromNetwork}
          />

          <AmountInput
            value={amount}
            onChange={handleAmountChange}
            token={SEND_TOKEN.symbol}
            tokenIcon={SEND_TOKEN.icon}
            networkId={fromNetwork}
            label="You Send"
            balance={isConnected ? "--" : "0.00"}
          />

          <AmountInput
            value={quote?.receiveAmount || ""}
            onChange={() => {}}
            token={RECEIVE_TOKENS[toNetwork]?.symbol || "Select"}
            tokenIcon={RECEIVE_TOKENS[toNetwork]?.icon}
            networkId={toNetwork}
            label="You Receive"
            readOnly
            loading={quoteLoading}
          />

          {quote && <BridgeSummary quote={quote} />}

          <button
            onClick={handleAction}
            disabled={buttonState.disabled}
            className={cn(
              "flex w-full items-center justify-center gap-2 rounded-[14px] h-[54px] text-sm font-semibold transition-all duration-200",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2",
              buttonState.action === "connect"
                ? "bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/20"
                : buttonState.disabled
                  ? "bg-muted/10 text-muted cursor-not-allowed"
                  : "bg-primary text-white hover:bg-primary-light shadow-lg shadow-primary/20"
            )}
          >
            {buttonState.action === "loading" && (
              <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
            )}
            {buttonState.label}
          </button>
        </div>
      </div>

      <BridgeSettings open={settingsOpen} onClose={() => setSettingsOpen(false)} />

      {txStatus !== "idle" && (
        <TransactionProgress
          status={txStatus}
          fromNetwork={fromNetworkData?.name || ""}
          toNetwork={toNetworkData?.name || ""}
          amount={amount}
          token={SEND_TOKEN.symbol}
          onClose={() => setTxStatus("idle")}
        />
      )}
    </>
  )
}
