import type { LiquidityCardData } from "@/components/bridge/LiquidityCard"

// TODO: Replace demo liquidity values with real on-chain/API liquidity.
export const liquidityData: Record<string, LiquidityCardData> = {
  dorsen: {
    name: "DC20 USDT",
    value: "$44,000",
    label: "Available Liquidity",
    status: "Liquid",
    network: "DORSEN",
    icon: "/images/coin/dorsen.png",
  },
  bsc: {
    name: "BEP20 USDT",
    value: "$46,000",
    label: "Available Liquidity",
    status: "Liquid",
    network: "BNB Smart Chain",
    icon: "/images/coin/bnb.png",
  },
}
