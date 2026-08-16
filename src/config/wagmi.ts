import { http, createConfig } from "wagmi"
import { mainnet, bsc, polygon } from "wagmi/chains"
import { injected, walletConnect } from "wagmi/connectors"

const dorsenChain = {
  id: 8888,
  name: "DORSEN" as const,
  nativeCurrency: { name: "DORSEN", symbol: "DORSEN", decimals: 18 },
  rpcUrls: {
    default: { http: [process.env.NEXT_PUBLIC_DORSEN_RPC_URL || "https://rpc.dorsen.io"] },
  },
  blockExplorers: {
    default: { name: "DORSEN Explorer", url: "https://explorer.dorsen.io" },
  },
}

const wcProjectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || ""

const connectors = [
  injected(),
  ...(wcProjectId ? [walletConnect({ projectId: wcProjectId })] : []),
]

export const config = createConfig({
  chains: [mainnet, bsc, dorsenChain, polygon],
  connectors,
  transports: {
    [mainnet.id]: http(),
    [bsc.id]: http(),
    [dorsenChain.id]: http(),
    [polygon.id]: http(),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
