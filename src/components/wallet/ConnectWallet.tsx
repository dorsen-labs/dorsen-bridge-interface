"use client"

import { useAppKit, useAppKitAccount } from "@reown/appkit/react"
import React from "react"

interface ConnectButtonProps {
  label?: string
}

const ConnectWallet: React.FC<ConnectButtonProps> = ({ label = "Connect Wallet" }) => {
  const { address } = useAppKitAccount()
  const { open } = useAppKit()

  return (
    <div>
      {!address ? (
        <button
          onClick={() => open()}
          className="px-5 py-3 cursor-pointer font-agdasima uppercase rounded-full font-bold text-black bg-linear-to-br from-[#C09EFC] via-[#46A5FE] to-[#2E558E] block"
        >
          {label}
        </button>
      ) : (
        <div className="p-2 bg-[#252525] rounded-4xl">
          <appkit-account-button balance="hide" />
        </div>
      )}
    </div>
  )
}

export default ConnectWallet
