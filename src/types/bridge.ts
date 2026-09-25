import type {
  NetworkConfig,
} from "@/types/network"

import type {
  TokenConfig,
} from "@/config/tokens"

export type BridgeRouteStep = {
  network: string
  action:
  | "Lock"
  | "Transfer"
  | "Mint"
}


export type BridgeQuote = {
  sourceNetwork: NetworkConfig
  destNetwork: NetworkConfig

  token: TokenConfig

  sourceToken: TokenConfig
  destinationToken: TokenConfig

  sendAmount: string
  receiveAmount: string

  bridgeFee: string

  estimatedTime: string

  route: {
    name: string
    steps: BridgeRouteStep[]
  }
}

export type BridgeTransaction = {
  id: string
  date: string

  fromNetwork: string
  toNetwork: string

  asset: string
  amount: string

  status:
  | "pending"
  | "confirming"
  | "completed"
  | "failed"
}
