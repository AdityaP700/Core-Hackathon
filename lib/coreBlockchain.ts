// lib/coreBlockchain.ts
import { ethers } from "ethers";

// Connect to CORE blockchain
export const getCoreProvider = () => {
    // Replace with actual CORE RPC URL
    return new ethers.providers.JsonRpcProvider("https://rpc.coredao.org");
    };


// Function to interact with CORE blockchain
export const sendTransaction = async (
    provider: ethers.providers.Web3Provider,
    to: string,
    amount: string
) => {
    const signer = provider.getSigner();
    const tx = await signer.sendTransaction({
        to,
        value: ethers.utils.parseEther(amount)
    });
    return tx.wait();
};
