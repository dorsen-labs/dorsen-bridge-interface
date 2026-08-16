import { type NetworkConfig } from "./network"
import { type TokenConfig } from "./token"

export type BridgeQuote = {
  sourceNetwork: NetworkConfig
  destNetwork: NetworkConfig
  token: TokenConfig
  sendAmount: string
  receiveAmount: string
  networkFee: string
  bridgeFee: string
  estimatedTime: string
  minimumReceived: string
  route: BridgeRoute
}

export type BridgeRoute = {
  name: string
  steps: BridgeRouteStep[]
}

export type BridgeRouteStep = {
  network: string
  action: string
}

export type BridgeTransactionStatus =
  | "idle"
  | "connecting"
  | "entering-amount"
  | "approving"
  | "confirming"
  | "bridging"
  | "source-confirmed"
  | "transferring"
  | "dest-confirmed"
  | "success"
  | "failed"

export type BridgeTransaction = {
  id: string
  date: string
  fromNetwork: string
  toNetwork: string
  asset: string
  amount: string
  status: "completed" | "pending" | "failed"
  txHash?: string
}

export type BridgeSettings = {
  slippage: string
  gasPreference: string
  deadline: string
}
