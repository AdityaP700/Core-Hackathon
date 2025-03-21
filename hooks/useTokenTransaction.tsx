import { useContract, useContractWrite } from "@thirdweb-dev/react";
import { ethers } from "ethers";

export function useTokenTransaction() {
  const { contract } = useContract("YOUR_CONTRACT_ADDRESS"); // Replace with your deployed contract address
  const { mutateAsync: placeBet, isLoading: isBetting } = useContractWrite(contract, "placeBet");

  const sendBet = async (amount: string) => {
    try {
      const tx = await placeBet({
        args: [],
        overrides: {
          value: ethers.utils.parseEther(amount),
        },
      });
      return tx;
    } catch (error) {
      console.error("Transaction failed:", error);
      throw error;
    }
  };

  return { sendBet, isBetting };
}