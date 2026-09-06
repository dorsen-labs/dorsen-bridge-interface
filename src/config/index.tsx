import { cookieStorage, createStorage } from "@wagmi/core"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { mainnet, bsc, polygon, defineChain } from "@reown/appkit/networks"

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ""

if (!projectId) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined")
}

const dorsenChain = defineChain({
  id: 8888,
  caipNetworkId: "eip155:8888" as const,
  chainNamespace: "eip155" as const,
  name: "DORSEN",
  nativeCurrency: {
    name: "DORSEN",
    symbol: "DORSEN",
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: [process.env.NEXT_PUBLIC_DORSEN_RPC_URL || "https://rpc.dorsen.io"],
    },
  },
  blockExplorers: {
    default: {
      name: "DORSEN Explorer",
      url: "https://explorer.dorsen.io",
    },
  },
})

export const networks = [mainnet, bsc, polygon, dorsenChain]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks: [...networks],
})

export const config = wagmiAdapter.wagmiConfig
