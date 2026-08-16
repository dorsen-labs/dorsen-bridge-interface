import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatAddress(address: string, chars = 4): string {
  if (!address) return ""
  return `${address.slice(0, chars + 2)}...${address.slice(-chars)}`
}

export function formatAmount(
  amount: string | number,
  decimals = 4
): string {
  const num = typeof amount === "string" ? parseFloat(amount) : amount
  if (isNaN(num)) return "0.00"
  return num.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: decimals,
  })
}

export function getExplorerUrl(
  explorerUrl: string | undefined,
  txHash: string
): string {
  if (!explorerUrl) return "#"
  return `${explorerUrl}/tx/${txHash}`
}
