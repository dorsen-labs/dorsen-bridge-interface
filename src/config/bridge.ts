import { dbrige_abi } from "./dbridge_abi"

export const BRIDGE_CONFIG = {
  defaultSlippage: "0.5",
  defaultGasPreference: "Standard",
  defaultDeadline: "5",
  minAmount: "50",
  maxSlippage: "5",
} as const






export const bridgeContracts = {
  [99110]: {
    address:
      "0xBF95286c575396878fA36744F0455eA17286E288" as `0x${string}`,
  },

  [56]: {
    address:
      "0x6312Fd9795CCf711cCd381A31E025649277C3a23" as `0x${string}`,
  },

  [1]: {
    address:
      "0xETH_BRIDGE_ADDRESS" as `0x${string}`,
  },

  [137]: {
    address:
      "0xPOLYGON_BRIDGE_ADDRESS" as `0x${string}`,
  },
  80002: {
    address:
      "0xd4A4c1b15F25DB1274d06eFCd88fD3ae9Fba1B56" as `0x${string}`,
  },

  97: {
    address:
      "0x15CbC9bA6f26832cd6e1BB8810540E3Ba876CBFA" as `0x${string}`,
  },
} as const

export function getBridgeContract(
  chainId: number
): {
  address: `0x${string}`
  abi: typeof dbrige_abi
} {
  if (!chainId) {
    throw new Error("Chain ID is required")
  }

  const contract =
    bridgeContracts[chainId as keyof typeof bridgeContracts]

  if (!contract) {
    throw new Error("Bridge contract not found")
  }

  return {
    address: contract.address,
    abi: dbrige_abi,
  }
}

