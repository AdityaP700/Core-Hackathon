const { ethers } = require("ethers");

const PRIVATE_KEY = process.env.FUNDED_WALLET_PRIVATE_KEY;
const RPC_URL = "https://rpc.test2.btcs.network";

const provider = new ethers.JsonRpcProvider(RPC_URL);
const relayerWallet = new ethers.wallet(PRIVATE_KEY, provider);
const signer = await provider.getSigner();

const contractAddress = " ";
const ABI = [];
const contract = new ethers.Contract(contractAddress, ABI, relayerWallet);

async function placeBetForUser(userAddress, betAmount) {
    try {
        console.log(`Placing bet for: ${userAddress}, Amount: ${betAmount} CORE`);

        const tx = await contract.placeBet({
            value: ethers.parseEther(betAmount), // Dynamic bet amount
            gasLimit: ethers.toBigInt(500000),
            gasPrice: await provider.getGasPrice()
        });

        console.log("Transaction Sent! Hash:", tx.hash);
        await tx.wait();
        console.log(`Bet of ${betAmount} CORE placed successfully!`);
    } catch (error) {
        console.error("Error placing bet:", error);
    }
}

async function rewardWinner(winnerAddress, amount) {
    try {
        console.log(`Paying winner: ${winnerAddress} - Amount: ${amount} CORE`);

        const tx = await contract.rewardWinner(winnerAddress, ethers.parseEther(amount), {
            gasLimit: ethers.toBigInt(500000),
            gasPrice: await provider.getGasPrice()
        });

        console.log("Reward Transaction Sent! Hash:", tx.hash);
        await tx.wait();
        console.log(`Winner ${winnerAddress} rewarded!`);
    } catch (error) {
        console.error("error rewarding winner: ", error);
    }
}

// 🏦 Get Contract Balance
async function getContractBalance() {
    const balance = await contract.getContractBalance();
    console.log("Contract Balance:", ethers.formatEther(balance), "CORE");
}