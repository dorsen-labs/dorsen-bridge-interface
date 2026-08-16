"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"

type NetworkIconProps = {
  network: string
  size?: "sm" | "md" | "lg"
  className?: string
}

const networkImages: Record<string, string> = {
  eth: "/images/coin/eth.png",
  bnb: "/images/coin/bnb.png",
  dorsen: "/images/coin/dorsen.png",
  polygon: "/images/coin/polygon.png",
}

const networkColors: Record<string, string> = {
  eth: "bg-blue-600",
  bnb: "bg-yellow-500",
  dorsen: "bg-cyan-500",
  polygon: "bg-purple-600",
}

const networkLetters: Record<string, string> = {
  eth: "E",
  bnb: "B",
  dorsen: "D",
  polygon: "P",
}

const sizeClasses = {
  sm: "h-6 w-6 text-[10px]",
  md: "h-8 w-8 text-xs",
  lg: "h-10 w-10 text-sm",
}

const imageSizes = { sm: 18, md: 24, lg: 32 }

export function NetworkIcon({ network, size = "md", className }: NetworkIconProps) {
  const imgSrc = networkImages[network]

  if (imgSrc) {
    return (
      <div className={cn("relative rounded-full overflow-hidden", sizeClasses[size], className)}>
        <Image
          src={imgSrc}
          alt={network}
          fill
          className="object-contain"
          sizes={`${imageSizes[size]}px`}
        />
      </div>
    )
  }

  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-full font-bold text-white",
        networkColors[network] || "bg-gray-500",
        sizeClasses[size],
        className
      )}
    >
      {networkLetters[network] || network.charAt(0).toUpperCase()}
    </div>
  )
}
