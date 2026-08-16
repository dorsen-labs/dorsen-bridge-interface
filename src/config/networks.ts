import { type NetworkConfig } from "@/types/network"

export const networks: NetworkConfig[] = [
  {
    id: "eth",
    name: "Ethereum",
    shortName: "ETH",
    symbol: "ETH",
    logo: "/images/coin/eth.png",
    chainId: 1,
    rpcUrl: process.env.NEXT_PUBLIC_ETH_RPC_URL,
    explorerUrl: "https://etherscan.io",
    status: "active",
  },
  {
    id: "bnb",
    name: "BNB Chain",
    shortName: "BNB",
    symbol: "BNB",
    logo: "/images/coin/bnb.png",
    chainId: 56,
    rpcUrl: process.env.NEXT_PUBLIC_BNB_RPC_URL,
    explorerUrl: "https://bscscan.com",
    status: "active",
  },
  {
    id: "dorsen",
    name: "DORSEN",
    shortName: "DORSEN",
    symbol: "DORSEN",
    logo: "/images/coin/dorsen.png",
    chainId: 8888,
    rpcUrl: process.env.NEXT_PUBLIC_DORSEN_RPC_URL,
    explorerUrl: "https://explorer.dorsen.io",
    status: "active",
  },
  {
    id: "polygon",
    name: "Polygon",
    shortName: "MATIC",
    symbol: "MATIC",
    logo: "/images/coin/polygon.png",
    chainId: 137,
    rpcUrl: process.env.NEXT_PUBLIC_POLYGON_RPC_URL,
    explorerUrl: "https://polygonscan.com",
    status: "coming-soon",
  },
]

export const getActiveNetworks = () =>
  networks.filter((n) => n.status === "active")

export const getNetworkById = (id: string) =>
  networks.find((n) => n.id === id)
