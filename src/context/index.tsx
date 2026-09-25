"use client"

import { wagmiAdapter, projectId, networks } from "@/config"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createAppKit } from "@reown/appkit/react"
import type { AppKitNetwork } from "@reown/appkit-common"
import React, { type ReactNode } from "react"
import { cookieToInitialState, WagmiProvider, type Config } from "wagmi"

const queryClient = new QueryClient()

if (!projectId) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined")
}

const metadata = {
  name: "DORSEN Bridge",
  description: "DORSEN Bridge - Secure Cross-Chain Asset Transfer",
  url: "https://dorsen.org",
  icons: ["https://avatars.githubusercontent.com/u/179229932"],
}

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  networks: networks,
  defaultNetwork: networks[0],
  chainImages: {
    [networks[0].id]: "/images/coin/dorsen.png",
  },
  enableNetworkSwitch: true,
  metadata,
  features: {
    analytics: true, // Optional - defaults to your Cloud configuration
    swaps: false,
    socials: false,
    email: false,
    onramp: false,
  },
})

export default function ContextProvider({
  children,
  cookies,
}: {
  children: ReactNode
  cookies: string | null
}) {
  const initialState = cookieToInitialState(
    wagmiAdapter.wagmiConfig as Config,
    cookies
  )

  return (
    <WagmiProvider
      config={wagmiAdapter.wagmiConfig as Config}
      initialState={initialState}
    >
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  )
}
