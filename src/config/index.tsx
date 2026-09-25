import { cookieStorage, createStorage, http } from "@wagmi/core"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { mainnet, bsc, polygon, defineChain, AppKitNetwork, polygonAmoy, bscTestnet } from "@reown/appkit/networks"

export const projectId = process.env.NEXT_PUBLIC_PROJECT_ID || ""

if (!projectId) {
  throw new Error("NEXT_PUBLIC_PROJECT_ID is not defined")
}

export const dorsenMainnet = defineChain({
  id: 99110,
  name: 'Dorsen',
  assets: {
    imageId: "coin_dc",
    imageUrl: "/images/coin/dorsen.png"
  },
  chainNamespace: 'eip155',
  caipNetworkId: 'eip155:99110',
  nativeCurrency: {
    name: 'Dorsen',
    symbol: 'DC',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet-rpc.dorsenscan.io/'],
    },
  },
  blockExplorers: {
    default: {
      name: 'DorsenScan Mainnet',
      url: 'https://dorsenscan.io/',
    },
  }

})

export const networks = [dorsenMainnet, bsc, polygon] as [AppKitNetwork, ...AppKitNetwork[]]

export const wagmiAdapter = new WagmiAdapter({
  storage: createStorage({
    storage: cookieStorage,
  }),
  ssr: true,
  projectId,
  networks,
  transports: {
    [dorsenMainnet.id]: http(dorsenMainnet.rpcUrls.default.http[0]),
    [bsc.id]: http(bsc.rpcUrls.default.http[0]),
    [polygon.id]: http(polygon.rpcUrls.default.http[0]),
  },
})

export const config = wagmiAdapter.wagmiConfig
