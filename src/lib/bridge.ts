import {
  type BridgeQuote,
  type BridgeTransaction,
} from "@/types/bridge"

import {
  getNetworkById,
} from "@/config/networks"

import {
  getTokenBySymbol,
} from "@/config/tokens"

export async function fetchBridgeQuote(
  fromNetworkId: string,
  toNetworkId: string,
  tokenSymbol: string,
  amount: string,
): Promise<BridgeQuote | null> {
  const sourceNetwork =
    getNetworkById(fromNetworkId)

  const destNetwork =
    getNetworkById(toNetworkId)

  if (
    !sourceNetwork ||
    !destNetwork ||
    !amount
  ) {
    return null
  }

  /*
   * Resolve token separately for
   * source and destination chains.
   */
  const sourceToken =
    getTokenBySymbol(
      sourceNetwork.chainId,
      tokenSymbol
    )

  const destinationToken =
    getTokenBySymbol(
      destNetwork.chainId,
      tokenSymbol
    )

  if (
    !sourceToken ||
    !destinationToken
  ) {
    console.error(
      "Token configuration missing",
      {
        tokenSymbol,
        sourceChainId:
          sourceNetwork.chainId,
        destinationChainId:
          destNetwork.chainId,
      }
    )

    return null
  }

  /*
   * ERC20 token must have a contract
   * address.
   */
  if (
    !sourceToken.address ||
    !destinationToken.address
  ) {
    console.error(
      "Token contract address missing",
      {
        tokenSymbol,
        sourceNetwork:
          sourceNetwork.name,
        destinationNetwork:
          destNetwork.name,
      }
    )

    return null
  }

  const sendAmount =
    parseFloat(amount)

  if (
    !Number.isFinite(sendAmount) ||
    sendAmount <= 0
  ) {
    return null
  }

  /*
   * Mock quote for now.
   *
   * Replace this section with your
   * actual bridge API later.
   */
  const bridgeFee =
    sendAmount * 0.01 /// 1%

  const receiveAmount =
    sendAmount - bridgeFee

  return {
    sourceNetwork,
    destNetwork,

    // Keep source token as the
    // primary token in the quote.
    token: sourceToken,

    sendAmount: amount,

    receiveAmount:
      receiveAmount.toFixed(6),
    bridgeFee:
      bridgeFee.toFixed(6),

    estimatedTime:
      "~2-5 minutes",

    route: {
      name: "DORSEN Bridge",

      steps: [
        {
          network:
            fromNetworkId,
          action: "Lock",
        },
        {
          network: "bridge",
          action: "Transfer",
        },
        {
          network:
            toNetworkId,
          action: "Mint",
        },
      ],
    },

    /*
     * These are useful for the
     * actual transaction later.
     */
    sourceToken,
    destinationToken,
  }
}

export async function submitBridgeTransaction(
  quote: BridgeQuote
): Promise<BridgeTransaction> {
  /*
   * TODO:
   *
   * 1. Check wallet chain
   * 2. Check token allowance
   * 3. Approve bridge contract
   * 4. Call bridge contract
   * 5. Wait for transaction
   * 6. Return real tx hash
   */

  return {
    id: `0x${Date.now().toString(16)}`,

    date:
      new Date().toISOString(),

    fromNetwork:
      quote.sourceNetwork.id,

    toNetwork:
      quote.destNetwork.id,

    asset:
      quote.token.symbol,

    amount:
      quote.sendAmount,

    status: "pending",
  }
}
