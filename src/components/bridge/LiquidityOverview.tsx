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
      className="w-full max-w-[596px] mx-auto mb-10 px-2 sm:px-0"
    >
      <div className="grid grid-cols-2 gap-2 sm:gap-4">
        {cards.map((card) => (
          <div key={card.name} className="min-w-0 w-full">
            <LiquidityCard {...card} />
          </div>
        ))}
      </div>
    </motion.div>
  )
}