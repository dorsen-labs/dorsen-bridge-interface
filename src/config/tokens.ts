import {
  mainnet,
  bsc,
  polygon,
} from "@reown/appkit/networks"

import { dorsenMainnet } from "."

export type TokenConfig = {
  symbol: string
  name: string
  decimals: number
  address: `0x${string}` | null
  icon: string
  native?: boolean
}

export const tokensByChain: Record<
  number,
  TokenConfig[]
> = {
  [mainnet.id]: [
    {
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      address:
        "0xdAC17F958D2ee523a2206206994597C13D831ec7",
      icon: "/images/coin/usdt.png",
    },
  ],

  [bsc.id]: [
    {
      symbol: "USDT",
      name: "Tether USD",
      decimals: 18,
      address:
        "0x55d398326f99059fF775485246999027B3197955",
      icon: "/images/coin/usdt.png",
    },
  ],

  [polygon.id]: [
    {
      symbol: "USDT",
      name: "Tether USD",
      decimals: 6,
      address:
        "0xc2132D05D31c914a87C6611C10748AEb04B58e8F",
      icon: "/images/coin/usdt.png",
    },
  ],

  [dorsenMainnet.id]: [
    {
      symbol: "USDT",
      name: "Tether USD",
      decimals: 18,
      address:
        "0x092b57181C5c752888eD706CAA0654DBd44AB953",

      icon: "/images/coin/usdt.png",
    },
  ],
  [97]: [
    {
      symbol: "USDT",
      name: "Tether USD",
      decimals: 18,
      address:
        "0x0e838d620E04FD28A50816Ee5a82042d41894eBd",
      icon: "/images/coin/usdt.png",
    },
  ],
  [80002]: [
    {
      symbol: "USDT",
      name: "Tether USD",
      decimals: 18,
      address:
        "0x8d561e2f86959e08a5CA634Df9CF476Db8584F5B",
      icon: "/images/coin/usdt.png",
    },
  ],
}

export function getTokenBySymbol(
  chainId: number | undefined,
  symbol: string
) {
  if (!chainId) return undefined

  return tokensByChain[chainId]?.find(
    (token) => token.symbol === symbol
  )
}
