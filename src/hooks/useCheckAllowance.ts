import { useAccount, useConnection, useReadContract } from "wagmi";
import { Address, erc20Abi, zeroAddress } from "viem";
import { useAppKitNetworkCore } from "@reown/appkit/react";

const useCheckAllowance = ({ spenderAddress, token }: { spenderAddress: Address, token: Address }) => {
    const { address } = useConnection();
    const { chainId } = useAppKitNetworkCore()
    const { data: checkAllowanceContract, isSuccess, queryKey } = useReadContract({
        address: token,
        abi: erc20Abi,
        functionName: "allowance",
        args: [address as Address, spenderAddress],
        query: {
            enabled: (
                address !== zeroAddress ||
                spenderAddress !== zeroAddress
            )
        },
        chainId: Number(chainId) ?? 99110
    });

    return {
        data: checkAllowanceContract,
        isSuccess: isSuccess,
        queryKey
    }

}

export default useCheckAllowance;