import { type TokenConfig } from "@/types/token"

export const sendTokens: TokenConfig[] = [
  {
    symbol: "USDT",
    name: "Tether USD",
    decimals: 6,
    logo: "/images/coin/usdt.png",
    networks: ["eth", "bnb", "dorsen"],
  },
]

export const allTokens: TokenConfig[] = [
  ...sendTokens,
  {
    symbol: "ETH",
    name: "Ethereum",
    decimals: 18,
    logo: "/images/coin/eth.png",
    networks: ["eth", "dorsen"],
  },
  {
    symbol: "BNB",
    name: "BNB",
    decimals: 18,
    logo: "/images/coin/bnb.png",
    networks: ["bnb", "dorsen"],
  },
  {
    symbol: "DORSEN",
    name: "DORSEN",
    decimals: 18,
    logo: "/images/coin/dorsen.png",
    networks: ["dorsen", "eth", "bnb"],
  },
]

export const getTokensForNetwork = () =>
  sendTokens

export const getTokenBySymbol = (symbol: string) =>
  allTokens.find((t) => t.symbol === symbol)
