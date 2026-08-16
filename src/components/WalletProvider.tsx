"use client"

import { type ReactNode } from "react"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { config } from "@/config/wagmi"
import { WalletModalProvider } from "@/hooks/useWalletModal"

const queryClient = new QueryClient()

export function WalletProvider({ children }: { children: ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <WalletModalProvider>
          {children}
        </WalletModalProvider>
      </QueryClientProvider>
    </WagmiProvider>
  )
}
