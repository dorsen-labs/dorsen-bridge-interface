export type NetworkStatus = "active" | "coming-soon"

export type NetworkConfig = {
  id: string
  name: string
  shortName: string
  symbol: string
  logo: string
  chainId?: number
  rpcUrl?: string
  explorerUrl?: string
  status: NetworkStatus
}
