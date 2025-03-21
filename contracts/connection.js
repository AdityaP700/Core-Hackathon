
const { ethers } = require("ethers");

const PRIVATE_KEY = process.env.FUNDED_WALLET_PRIVATE_KEY;
const RPC_URL = "https://rpc.test2.btcs.network";

const provider = new ethers.JsonRpcProvider(RPC_URL);
const relayerWallet = new ethers.wallet(PRIVATE_KEY, provider);
const signer = await provider.getSigner();

const contractAddress = "0x31aa6880d8c7ab269c6923114b4981b00723dcf9";
const ABI = [{
        "inputs": [],
        "stateMutability": "nonpayable",
        "type": "constructor"
    },
    {
        "inputs": [],
        "name": "getContractBalance",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [{
            "internalType": "address",
            "name": "player",
            "type": "address"
        }],
        "name": "getPlayerBalance",
        "outputs": [{
            "internalType": "uint256",
            "name": "",
            "type": "uint256"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{
            "internalType": "address payable",
            "name": "",
            "type": "address"
        }],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "placeBet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{
                "internalType": "address payable",
                "name": "winner",
                "type": "address"
            },
            {

                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            }
        ],
        "name": "rewardWinner",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "stateMutability": "payable",
        "type": "receive"
    }
];
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
