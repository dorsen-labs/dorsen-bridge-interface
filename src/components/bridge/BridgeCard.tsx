"use client"

import {
  useState,
  useCallback,
  useEffect,
} from "react"

import {
  ArrowUpDown,
  Settings,
} from "lucide-react"

import {
  useAppKit,
  useAppKitNetwork,
} from "@reown/appkit/react"

import {
  useBalance,
  useBlockNumber,
  useConnection,
  useEstimateGas,
  usePublicClient,
  useReadContracts,
  useSwitchChain,
  useWriteContract,
} from "wagmi"

import {
  Address,
  erc20Abi,
  formatEther,
  formatUnits,
  parseUnits,
} from "viem"

import { useQueryClient } from "@tanstack/react-query"

import { cn } from "@/lib/utils"

import {
  getActiveNetworks,
  getNetworkById,
} from "@/config/networks"

import {
  getTokenBySymbol,
} from "@/config/tokens"

import {
  getBridgeContract,
} from "@/config/bridge"

import {
  dbrige_abi,
} from "@/config/dbridge_abi"

import useCheckAllowance from "@/hooks/useCheckAllowance"

import { NetworkSelector } from "./NetworkSelector"
import { AmountInput } from "./AmountInput"
import { BridgeSummary } from "./BridgeSummary"
import { BridgeSettings } from "./BridgeSettings"
import { TransactionProgress } from "./TransactionProgress"

import {
  fetchBridgeQuote,
} from "@/lib/bridge"

import type {
  BridgeQuote
} from "@/types/bridge"

export function BridgeCard() {
  const activeNetworks = getActiveNetworks()

  const {
    open: openModal,
  } = useAppKit()

  const {
    chainId,
  } = useAppKitNetwork()

  const {
    address,
  } = useConnection()

  const queryClient = useQueryClient()

  /*
 * ---------------------------------------------------------
 * Block number
 *
 * This causes wagmi to keep the chain data fresh.
 * ---------------------------------------------------------
 */

  const { data: blockNumber } = useBlockNumber({
    watch: {
      enabled: true,
      pollingInterval: 5_000,
    }
  });


  const {
    mutateAsync: writeContractAsync,
    isPending: isWritingContract,
  } = useWriteContract()

  const {
    mutateAsync: switchChainAsync,
    isPending: isSwitchingChain,
  } = useSwitchChain()

  /*
   * ---------------------------------------------------------
   * Network state
   * ---------------------------------------------------------
   */

  const [
    fromNetwork,
    setFromNetwork,
  ] = useState(
    activeNetworks[0]?.id || "dorsen"
  )

  const [
    toNetwork,
    setToNetwork,
  ] = useState(
    activeNetworks[1]?.id || "bnb"
  )

  /*
   * ---------------------------------------------------------
   * Bridge state
   * ---------------------------------------------------------
   */

  const [amount, setAmount] =
    useState("")

  const [quote, setQuote] =
    useState<BridgeQuote | null>(null)

  const [quoteLoading, setQuoteLoading] =
    useState(false)

  const [settingsOpen, setSettingsOpen] =
    useState(false)

  const [txStatus, setTxStatus] =
    useState("idle")

  const [txHash, setTxHash] = useState<`0x${string}` | null>(null)

  const [
    isApprovedERC20,
    setIsApprovedERC20,
  ] = useState(false)

  /*
   * ---------------------------------------------------------
   * Current network configuration
   * ---------------------------------------------------------
   */

  const fromNetworkData =
    getNetworkById(fromNetwork)

  const toNetworkData =
    getNetworkById(toNetwork)

  const sourceChainId =
    fromNetworkData?.chainId

  const destinationChainId =
    toNetworkData?.chainId


  const {
    data: nativeBalance,
  } = useBalance({
    address,
    chainId: sourceChainId,
    query: {
      enabled: !!address && !!sourceChainId,
    },
  })



  /*
   * ---------------------------------------------------------
   * Chain-wise USDT
   * ---------------------------------------------------------
   */

  const fromToken =
    getTokenBySymbol(
      sourceChainId,
      "USDT"
    )

  const toToken =
    getTokenBySymbol(
      destinationChainId,
      "USDT"
    )

  /*
   * ---------------------------------------------------------
   * IMPORTANT:
   *
   * Bridge contract MUST come from the SOURCE chain.
   *
   * If From = BSC:
   *     getBridgeContract(56)
   *
   * If From = Dorsen:
   *     getBridgeContract(99110)
   * ---------------------------------------------------------
   */

  const bridgeContract =
    sourceChainId
      ? getBridgeContract(sourceChainId)
      : undefined


  /* =======================================================
 AMOUNT VALIDATION
======================================================= */

  const MIN_BRIDGE_AMOUNT = 50

  const MAX_BRIDGE_AMOUNT = 500


  const numericAmount =
    Number(amount)

  const hasAmount =
    amount.trim() !== "" &&
    Number.isFinite(numericAmount)

  const amountBelowMinimum =
    hasAmount &&
    numericAmount < MIN_BRIDGE_AMOUNT

  const amountAboveMaximum =
    hasAmount &&
    numericAmount > MAX_BRIDGE_AMOUNT

  const amountValid =
    hasAmount &&
    numericAmount >= MIN_BRIDGE_AMOUNT &&
    numericAmount <= MAX_BRIDGE_AMOUNT


  const MIN_NATIVE_BALANCE: Record<number, number> = {
    99110: 0.005, // DORSEN
    56: 0.002,    // BNB Chain
    // 1: 0.001,  // Ethereum
    // add other chains here
  }

  const minNativeBalance =
    sourceChainId
      ? MIN_NATIVE_BALANCE[sourceChainId] ?? 0
      : 0

  const nativeBalanceAmount =
    nativeBalance?.value
      ? Number(formatEther(nativeBalance.value))
      : 0

  const hasInsufficientNativeBalance =
    !!address &&
    minNativeBalance > 0 &&
    nativeBalanceAmount < minNativeBalance



  const amountError =
    amountBelowMinimum
      ? `Minimum amount is ${MIN_BRIDGE_AMOUNT} USDT`
      : amountAboveMaximum
        ? `Maximum amount is ${MAX_BRIDGE_AMOUNT} USDT`
        : null


  /*
   * ---------------------------------------------------------
   * Wallet must be connected to FROM chain
   * ---------------------------------------------------------
   */

  const needsNetworkSwitch =
    !!address &&
    !!sourceChainId &&
    Number(chainId) !== Number(sourceChainId)


  /*
   * ---------------------------------------------------------
   * ERC20 allowance
   * ---------------------------------------------------------
   *
   * Token:
   *     fromToken.address
   *
   * Spender:
   *     source-chain bridge contract
   *
   * Example:
   *
   * BSC
   * USDT -> 0x55...
   * Bridge -> BSC bridge address
   *
   * Dorsen
   * USDT -> 0x09...
   * Bridge -> Dorsen bridge address
   * ---------------------------------------------------------
   */

  const allowanceQuery =
    useCheckAllowance({
      spenderAddress:
        bridgeContract?.address as Address,

      token:
        fromToken?.address as Address
    })

  const allowance =
    allowanceQuery?.data || BigInt(0)


  /* =======================================================
     APPROVAL CHECK
  ======================================================= */

  useEffect(() => {
    if (
      !address ||
      !fromToken ||
      allowance === undefined ||
      !amountValid
    ) {
      setIsApprovedERC20(false)
      return
    }

    const amountRaw =
      parseUnits(
        amount,
        fromToken.decimals
      )

    setIsApprovedERC20(
      allowance >= amountRaw
    )
  }, [
    address,
    amount,
    amountValid,
    allowance,
    fromToken,
  ])


  /*
   * ---------------------------------------------------------
   * Amount required for approval
   * ---------------------------------------------------------
   *
   * NEVER use parseEther() here.
   *
   * USDT decimals are different per chain.
   *
   * Ethereum -> 6
   * BSC      -> 18
   * Polygon  -> 6
   * Dorsen   -> 18
   * ---------------------------------------------------------
   */

  const requiredAmount =
    amount &&
      fromToken
      ? parseUnits(
        amount,
        fromToken.decimals
      )
      : BigInt(0)



  /*
   * ---------------------------------------------------------
   * Read balance + bridge reserve
   * ---------------------------------------------------------
   */

  const {
    data: contractReads,
    refetch: refetchContractReads,
  } = useReadContracts({
    contracts:
      address &&
        fromToken?.address &&
        bridgeContract?.address &&
        sourceChainId
        ? [
          {
            abi: dbrige_abi,
            address:
              bridgeContract.address as Address,
            functionName: "reserveOf",
            args: [
              address as Address,
            ],
            chainId:
              sourceChainId,
          },

          {
            abi: erc20Abi,
            address:
              fromToken.address as Address,
            functionName: "balanceOf",
            args: [
              address as Address,
            ],
            chainId:
              sourceChainId,
          },
        ]
        : [],
  })


  /*
   * ---------------------------------------------------------
   * USDT balance
   * ---------------------------------------------------------
   */

  const usdtBalance =
    (contractReads?.[1]?.result as
      | bigint
      | undefined) ?? BigInt(0)

  const formattedBalance =
    fromToken
      ? formatUnits(
        usdtBalance,
        fromToken.decimals
      )
      : "0"

  /*
   * ---------------------------------------------------------
   * Quote
   * ---------------------------------------------------------
   */

  const fetchQuote = useCallback(
    async (
      networkFrom: string,
      networkTo: string,
      amt: string
    ) => {
      if (
        !amt ||
        Number(amt) <= 0
      ) {
        setQuote(null)
        return
      }

      const sourceNetwork =
        getNetworkById(
          networkFrom
        )

      const destinationNetwork =
        getNetworkById(
          networkTo
        )

      if (
        !sourceNetwork ||
        !destinationNetwork
      ) {
        setQuote(null)
        return
      }

      const sourceToken =
        getTokenBySymbol(
          sourceNetwork.chainId,
          "USDT"
        )

      const destinationToken =
        getTokenBySymbol(
          destinationNetwork.chainId,
          "USDT"
        )

      if (
        !sourceToken ||
        !destinationToken
      ) {
        console.error(
          "USDT configuration missing",
          {
            sourceChain:
              sourceNetwork.chainId,

            destinationChain:
              destinationNetwork.chainId,
          }
        )

        setQuote(null)
        return
      }

      if (
        !sourceToken.address ||
        !destinationToken.address
      ) {
        console.error(
          "USDT contract address missing"
        )

        setQuote(null)
        return
      }

      setQuoteLoading(true)

      try {
        const result =
          await fetchBridgeQuote(
            networkFrom,
            networkTo,
            sourceToken.symbol,
            amt
          )

        setQuote(result)
      } catch (error) {
        console.error(
          "Failed to fetch bridge quote:",
          error
        )

        setQuote(null)
      } finally {
        setQuoteLoading(false)
      }
    },
    []
  )

  /*
   * ---------------------------------------------------------
   * FROM network change
   *
   * This ONLY changes the bridge source.
   *
   * It does NOT automatically change the wallet.
   * The main button will show:
   *
   * "Switch to BNB Chain"
   *
   * ---------------------------------------------------------
   */

  const handleFromNetworkChange =
    async (id: string) => {
      let targetTo =
        toNetwork

      /*
       * Don't allow:
       *
       * From = BSC
       * To   = BSC
       */

      if (id === toNetwork) {
        const other =
          activeNetworks.find(
            network =>
              network.id !== id
          )

        if (other) {
          targetTo = other.id
          setToNetwork(
            other.id
          )
        }
      }

      setFromNetwork(id)

      await fetchQuote(
        id,
        targetTo,
        amount
      )
    }

  /*
   * ---------------------------------------------------------
   * TO network change
   *
   * Destination only.
   *
   * Does NOT switch wallet.
   * ---------------------------------------------------------
   */

  const handleToNetworkChange =
    (id: string) => {
      if (id === fromNetwork) {
        const other =
          activeNetworks.find(
            network =>
              network.id !== id
          )

        if (!other) {
          return
        }

        setFromNetwork(
          other.id
        )

        fetchQuote(
          other.id,
          id,
          amount
        )

        return
      }

      setToNetwork(id)

      fetchQuote(
        fromNetwork,
        id,
        amount
      )
    }

  /*
   * ---------------------------------------------------------
   * SWITCH BUTTON
   *
   * Example:
   *
   * Before:
   *
   * FROM BSC
   * TO   Dorsen
   *
   * After:
   *
   * FROM Dorsen
   * TO   BSC
   *
   * No wallet switch here.
   * ---------------------------------------------------------
   */

  const handleSwitchNetworks =
    useCallback(() => {
      const oldFrom =
        fromNetwork

      const oldTo =
        toNetwork

      setFromNetwork(
        oldTo
      )

      setToNetwork(
        oldFrom
      )

      fetchQuote(
        oldTo,
        oldFrom,
        amount
      )
    }, [
      fromNetwork,
      toNetwork,
      amount,
      fetchQuote,
    ])

  /*
   * ---------------------------------------------------------
   * Amount
   * ---------------------------------------------------------
   */

  const handleAmountChange =
    (value: string) => {
      setAmount(value)

      fetchQuote(
        fromNetwork,
        toNetwork,
        value
      )
    }

  /*
   * ---------------------------------------------------------
   * Wallet chain switch
   *
   * This happens ONLY when the user presses
   * the main action button.
   * ---------------------------------------------------------
   */

  const handleSwitchNetwork =
    async () => {
      if (!sourceChainId) {
        return
      }

      try {
        await switchChainAsync({
          chainId:
            sourceChainId,
        })
      } catch (error) {
        console.error(
          "Network switch failed:",
          error
        )
      }
    }

  /*
   * ---------------------------------------------------------
   * APPROVE USDT
   * ---------------------------------------------------------
   */

  const approveToken =
    async () => {
      if (!address) {
        return
      }

      if (!fromToken?.address) {
        console.error(
          "Source USDT address missing"
        )
        return
      }

      if (!bridgeContract?.address) {
        console.error(
          "Source bridge contract missing"
        )
        return
      }

      if (!sourceChainId) {
        return
      }

      if (
        !amount ||
        Number(amount) <= 0
      ) {
        return
      }

      try {
        /*
         * Correct token units.
         *
         * BSC USDT:
         * parseUnits("1", 18)
         *
         * ETH USDT:
         * parseUnits("1", 6)
         */

        const approvalAmount =
          parseUnits(
            amount,
            fromToken.decimals
          )

        await writeContractAsync({
          abi: erc20Abi,

          address:
            fromToken.address as Address,

          functionName:
            "approve",

          args: [
            bridgeContract.address as Address,
            approvalAmount,
          ],

          account:
            address,

          chainId:
            sourceChainId,
        })

        setIsApprovedERC20(true)

        /*
         * Wait for wagmi/react-query
         * state to refresh.
         */

        await queryClient.invalidateQueries({ queryKey: allowanceQuery?.queryKey })
        await refetchContractReads?.()
      } catch (error) {

      }
    }

  /*
   * ---------------------------------------------------------
   * BRIDGE
   * ---------------------------------------------------------
   */

  const bridgeToken =
    async () => {
      if (!address) {
        return
      }

      if (!fromNetworkData) {
        return
      }

      if (!toNetworkData) {
        return
      }

      if (!fromToken?.address) {
        console.error(
          "Source USDT address missing"
        )
        return
      }

      if (!bridgeContract?.address) {
        console.error(
          "Bridge contract missing"
        )
        return
      }

      if (!sourceChainId) {
        return
      }

      if (!destinationChainId) {
        return
      }

      if (
        !amount ||
        Number(amount) <= 0
      ) {
        return
      }

      try {
        setTxStatus(
          "confirming"
        )

        /*
         * Correct decimals for source USDT.
         */

        const bridgeAmount =
          parseUnits(
            amount,
            fromToken.decimals
          )

        /*
         * Safety check:
         *
         * Don't allow bridge transaction
         * unless allowance is sufficient.
         */

        const currentAllowance =
          allowanceQuery?.data ?? BigInt(0)

        if (
          currentAllowance <
          bridgeAmount
        ) {
          console.error(
            "Insufficient allowance"
          )

          setTxStatus("error")
          return
        }

        /*
         * IMPORTANT:
         *
         * Contract comes from SOURCE chain.
         *
         * Destination chain ID is passed
         * into the lock() function.
         */

        const txHash =
          await writeContractAsync({
            abi: dbrige_abi,

            address:
              bridgeContract.address as Address,

            functionName:
              "lock",

            args: [
              fromToken.address as Address,

              address as Address,

              BigInt(
                destinationChainId
              ),

              bridgeAmount,
            ],

            account:
              address,

            chainId:
              sourceChainId,
          })

        setTxHash(txHash);

        setTxStatus(
          "success"
        )

        /*
         * Refresh balance/allowance.
         */

        await queryClient.invalidateQueries({ queryKey: allowanceQuery?.queryKey })

        await refetchContractReads?.()
      } catch (error) {
        setTxStatus("failed")
      }
    }

  /*
   * ---------------------------------------------------------
   * Button state
   * ---------------------------------------------------------
   */

  const getButtonState =
    () => {
      /*
       * 1. Wallet
       */

      if (!address) {
        return {
          label:
            "Connect Wallet",

          disabled:
            false,

          action:
            "connect" as const,
        }
      }

      /*
       * 2. Wrong source chain
       */

      if (
        needsNetworkSwitch
      ) {
        return {
          label:
            `Switch to ${fromNetworkData?.name ||
            "Network"
            }`,

          disabled:
            isSwitchingChain,

          action:
            "switch-network" as const,
        }
      }

      /*
       * 3. Amount
       */

      if (
        !amount ||
        Number(amount) <= 0
      ) {
        return {
          label:
            "Enter Amount",

          disabled:
            true,

          action:
            "enter" as const,
        }
      }

      if (amountBelowMinimum) {
        return {
          label:
            `Minimum ${MIN_BRIDGE_AMOUNT} USDT`,
          disabled: true,
          action: "invalid-amount" as const,
        }
      }

      if (amountAboveMaximum) {
        return {
          label:
            `Maximum ${MAX_BRIDGE_AMOUNT} USDT`,
          disabled: true,
          action: "invalid-amount" as const,
        }
      }

      if (!amountValid) {
        return {
          label: "Enter Valid Amount",
          disabled: true,
          action: "invalid-amount" as const,
        }
      }

      /*
       * 4. Balance
       */


      if (
        hasInsufficientNativeBalance
      ) {
        return {
          label:
            `Insufficient ${nativeBalance?.symbol || "Native"} For Gas`,

          disabled:
            true,

          action:
            "insufficient-native-balance" as const,
        }
      }

      if (
        fromToken &&
        requiredAmount >
        usdtBalance
      ) {
        return {
          label:
            "Insufficient USDT",

          disabled:
            true,

          action:
            "insufficient-balance" as const,
        }
      }

      /*
       * 5. Quote
       */

      if (quoteLoading) {
        return {
          label:
            "Calculating...",

          disabled:
            true,

          action:
            "loading" as const,
        }
      }

      if (!quote) {
        return {
          label:
            "Bridge Asset",

          disabled:
            true,

          action:
            "no-quote" as const,
        }
      }

      /*
       * 6. Approval
       */

      if (
        !isApprovedERC20
      ) {
        return {
          label:
            isWritingContract
              ? "Approving..."
              : "Approve USDT",

          disabled:
            isWritingContract,

          action:
            "approve" as const,
        }
      }

      /*
       * 7. Bridge
       */

      return {
        label:
          isWritingContract
            ? "Bridging..."
            : "Bridge Asset",

        disabled:
          isWritingContract,

        action:
          "bridge" as const,
      }
    }

  const buttonState =
    getButtonState()

  /*
   * ---------------------------------------------------------
   * Main action
   * ---------------------------------------------------------
   */

  const handleAction =
    async () => {
      switch (
      buttonState.action
      ) {
        case "connect":
          openModal()
          return

        case "switch-network":
          await handleSwitchNetwork()
          return

        case "approve":
          await approveToken()
          return

        case "bridge":
          await bridgeToken()
          return

        default:
          return
      }
    }

  /*
   * ---------------------------------------------------------
   * Render
   * ---------------------------------------------------------
   */

  useEffect(() => {
    if (!blockNumber) return;
    queryClient.invalidateQueries({
      queryKey: allowanceQuery.queryKey,
    });
  }, [blockNumber, allowanceQuery.queryKey]);


  return (
    <>
      <div
        className={cn(
          "relative w-full max-w-[560px]",
          "rounded-2xl border p-6 shadow-xl",
          "bg-card border-border",
          "backdrop-blur-xl",

          "before:absolute",
          "before:inset-[-1px]",
          "before:rounded-2xl",
          "before:p-px",

          "before:bg-gradient-to-b",
          "before:from-primary/20",
          "before:via-transparent",
          "before:to-primary/10",

          "before:-z-10"
        )}
      >
        {/* Header */}

        <div
          className={cn(
            "mb-5 flex items-center",
            "justify-between"
          )}
        >
          <h2
            className={cn(
              "text-lg font-semibold",
              "text-card-foreground"
            )}
          >
            Bridge
          </h2>

          <button
            onClick={() =>
              setSettingsOpen(
                true
              )
            }
            className={cn(
              "flex h-8 w-8",
              "items-center",
              "justify-center",
              "rounded-lg",
              "text-muted",
              "hover:bg-primary/5",
              "hover:text-card-foreground",
              "transition-colors"
            )}
            aria-label="Settings"
          >
            <Settings
              className="h-4 w-4"
            />
          </button>
        </div>

        <div
          className="space-y-3.5"
        >
          {/* FROM */}

          <NetworkSelector
            value={
              fromNetwork
            }
            onChange={
              handleFromNetworkChange
            }
            label="From"
            excludeNetworkId={
              toNetwork
            }
          />

          {/* SWITCH */}

          <div
            className={cn(
              "flex justify-center",
              "my-1.5"
            )}
          >
            <button
              onClick={
                handleSwitchNetworks
              }
              disabled={
                isSwitchingChain
              }
              className={cn(
                "flex h-[44px]",
                "w-[44px]",
                "items-center",
                "justify-center",
                "rounded-full",
                "border",
                "border-border",
                "bg-card",
                "transition-all",
                "duration-300",

                "hover:border-primary/50",
                "hover:bg-primary/5",
                "hover:rotate-180",

                "hover:shadow-[0_0_15px_rgba(8,194,229,0.2)]",

                "focus-visible:outline-none",
                "focus-visible:ring-2",
                "focus-visible:ring-primary",

                isSwitchingChain &&
                "opacity-50 cursor-not-allowed"
              )}
              aria-label="Switch networks"
            >
              <ArrowUpDown
                className={cn(
                  "h-4 w-4",
                  "text-muted"
                )}
              />
            </button>
          </div>

          {/* TO */}

          <NetworkSelector
            value={
              toNetwork
            }
            onChange={
              handleToNetworkChange
            }
            label="To"
            excludeNetworkId={
              fromNetwork
            }
          />

          {/* SEND */}

          <AmountInput
            value={
              amount
            }
            onChange={
              handleAmountChange
            }
            token={
              fromToken?.symbol ||
              "USDT"
            }
            tokenIcon={
              fromToken?.icon
            }
            networkId={
              fromNetwork
            }
            label="You Send"
            balance={
              formattedBalance
            }
          />

          {/* RECEIVE */}

          {quote && (
            <BridgeSummary
              quote={
                quote
              }
              label="You Receive"
            />
          )}

          {/* MAIN BUTTON */}

          <button
            onClick={
              handleAction
            }
            disabled={
              buttonState.disabled
            }
            className={cn(
              "flex w-full",
              "items-center",
              "justify-center",
              "gap-2",
              "rounded-[14px]",
              "h-[54px]",
              "text-sm",
              "font-semibold",
              "transition-all",
              "duration-200",

              "focus-visible:outline-none",
              "focus-visible:ring-2",
              "focus-visible:ring-primary",
              "focus-visible:ring-offset-2",

              buttonState.disabled
                ? [
                  "bg-muted/10",
                  "text-muted",
                  "cursor-not-allowed",
                ]
                : [
                  "bg-primary",
                  "text-white",
                  "hover:bg-primary-light",
                  "shadow-lg",
                  "shadow-primary/20",
                ]
            )}
          >
            {(
              buttonState.action ===
              "loading" ||
              buttonState.action ===
              "approve" ||
              buttonState.action ===
              "bridge" ||
              buttonState.action ===
              "switch-network"
            ) &&
              (
                isWritingContract ||
                isSwitchingChain ||
                buttonState.action ===
                "loading"
              ) && (
                <div
                  className={cn(
                    "h-4 w-4",
                    "animate-spin",
                    "rounded-full",
                    "border-2",
                    "border-white",
                    "border-t-transparent"
                  )}
                />
              )}

            {buttonState.label}
          </button>
        </div>
      </div>

      {/* SETTINGS */}

      <BridgeSettings
        open={
          settingsOpen
        }
        onClose={() =>
          setSettingsOpen(
            false
          )
        }
      />

      {/* TRANSACTION */}

      {txStatus !== "idle" && (
        <TransactionProgress
          status={txStatus}
          fromNetwork={fromNetworkData?.name || ""}
          toNetwork={toNetworkData?.name || ""}
          amount={amount}
          token={fromToken?.symbol || "USDT"}
          txHash={txHash}
          explorerUrl={fromNetworkData?.explorerUrl}
          onClose={() => {
            setTxStatus("idle")
            setTxHash(null)
          }}
        />

      )}
    </>
  )
}
