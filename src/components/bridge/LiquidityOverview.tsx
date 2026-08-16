"use client"

import { motion } from "framer-motion"
import { LiquidityCard } from "./LiquidityCard"
import { liquidityData } from "@/config/liquidity"

const cards = Object.values(liquidityData)

export function LiquidityOverview() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.3 }}
      className="w-full max-w-[596px] mx-auto mb-10"
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {cards.map((card) => (
          <LiquidityCard key={card.name} {...card} />
        ))}
      </div>
    </motion.div>
  )
}