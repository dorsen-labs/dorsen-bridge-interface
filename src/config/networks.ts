import type { NetworkConfig } from "@/types/network"

import {
  mainnet,
  bsc,
  polygon,
  polygonAmoy,
  bscTestnet
} from "@reown/appkit/networks"
import { dorsenMainnet } from "."



export const bridgeNetworks: NetworkConfig[] = [
  // {
  //   id: "eth",
  //   name: "Ethereum",
  //   shortName: "ETH",
  //   symbol: "ETH",
  //   logo: "/images/coin/eth.png",

  //   chainId: mainnet.id,
  //   rpcUrl: mainnet.rpcUrls.default.http[0],
  //   explorerUrl: mainnet.blockExplorers?.default.url,

  //   status: "active",
  // },

  {
    id: "bnb",
    name: "BNB Chain",
    shortName: "BNB",
    symbol: "BNB",
    logo: "/images/coin/bnb.png",

    chainId: bsc.id,
    rpcUrl: bsc.rpcUrls.default.http[0],
    explorerUrl: bsc.blockExplorers?.default.url,

    status: "active",
  },

  {
    id: "dorsen",
    name: "Dorsen Chain",
    shortName: "DC",
    symbol: "DC",
    logo: "/images/coin/dorsen.png",

    chainId: dorsenMainnet.id,
    rpcUrl: dorsenMainnet.rpcUrls.default.http[0],
    explorerUrl: dorsenMainnet.blockExplorers?.default.url,

    status: "active",
  },

  {
    id: "polygon",
    name: "Polygon",
    shortName: "MATIC",
    symbol: "MATIC",
    logo: "/images/coin/polygon.png",

    chainId: polygon.id,
    rpcUrl: polygon.rpcUrls.default.http[0],
    explorerUrl: polygon.blockExplorers?.default.url,

    status: "coming-soon",
  },
  // {
  //   id: 'amoy',
  //   name: "Polygon Testnet",
  //   shortName: "Testnet",
  //   symbol: "POL",
  //   logo: "/images/coin/polygon.png",

  //   chainId: polygonAmoy.id,
  //   rpcUrl: polygonAmoy.rpcUrls.default.http[0],
  //   explorerUrl: polygonAmoy.blockExplorers?.default.url,

  //   status: "active",
  // },
  // {
  //   id: 'bscTestnet',
  //   name: "BNB Testnet",
  //   shortName: "Testnet",
  //   symbol: "tBNB",
  //   logo: "/images/coin/bnb.png",

  //   chainId: bscTestnet.id,
  //   rpcUrl: bscTestnet.rpcUrls.default.http[0],
  //   explorerUrl: bscTestnet.blockExplorers?.default.url,

  //   status: "active",
  // }
]

export const getActiveNetworks = () =>
  bridgeNetworks.filter(
    (network) => network.status === "active"
  )

export const getNetworkById = (id: string) =>
  bridgeNetworks.find(
    (network) => network.id === id
  )

export const getNetworkByChainId = (chainId: number) =>
  bridgeNetworks.find(
    (network) => network.chainId === chainId
  )
