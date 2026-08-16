import { type BridgeQuote, type BridgeTransaction } from "@/types/bridge"
import { getNetworkById } from "@/config/networks"
import { getTokenBySymbol } from "@/config/tokens"

export async function fetchBridgeQuote(
  fromNetworkId: string,
  toNetworkId: string,
  tokenSymbol: string,
  amount: string
): Promise<BridgeQuote | null> {
  const sourceNetwork = getNetworkById(fromNetworkId)
  const destNetwork = getNetworkById(toNetworkId)
  const token = getTokenBySymbol(tokenSymbol)

  if (!sourceNetwork || !destNetwork || !token || !amount) return null

  // Mock quote - replace with real API
  const sendAmount = parseFloat(amount)
  const bridgeFee = sendAmount * 0.001
  const receiveAmount = sendAmount - bridgeFee

  return {
    sourceNetwork,
    destNetwork,
    token,
    sendAmount: amount,
    receiveAmount: receiveAmount.toFixed(6),
    networkFee: "0.001",
    bridgeFee: bridgeFee.toFixed(6),
    estimatedTime: "~2-5 minutes",
    minimumReceived: (receiveAmount * 0.995).toFixed(6),
    route: {
      name: "DORSEN Bridge",
      steps: [
        { network: fromNetworkId, action: "Lock" },
        { network: "bridge", action: "Transfer" },
        { network: toNetworkId, action: "Mint" },
      ],
    },
  }
}

export async function submitBridgeTransaction(
  _quote: BridgeQuote
): Promise<BridgeTransaction> {
  // Mock transaction - replace with real implementation
  return {
    id: `0x${Date.now().toString(16)}`,
    date: new Date().toISOString(),
    fromNetwork: _quote.sourceNetwork.id,
    toNetwork: _quote.destNetwork.id,
    asset: _quote.token.symbol,
    amount: _quote.sendAmount,
    status: "pending",
  }
}
