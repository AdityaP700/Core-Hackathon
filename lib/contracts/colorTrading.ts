// lib/contracts/colorTrading.ts
import { ethers } from "ethers";
import { getCoreProvider } from "../coreBlockchain";

const CONTRACT_ADDRESS = "0x1234567890123456789012345678901234567890"; // Replace with actual deployed contract address
const CONTRACT_ABI = [
    {
        "inputs": [
            {"internalType": "uint256","name": "_startTime","type": "uint256"},
            {"internalType": "uint256","name": "_entryFee","type": "uint256"}
        ],
        "name": "createGame",
        "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {"internalType": "uint256","name": "_gameId","type": "uint256"},
            {"internalType": "string","name": "_color","type": "string"}
        ],
        "name": "joinGame",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "name": "games",
        "outputs": [
            {"internalType": "uint256","name": "id","type": "uint256"},
            {"internalType": "uint256","name": "startTime","type": "uint256"},
            {"internalType": "uint256","name": "entryFee","type": "uint256"},
            {"internalType": "string","name": "winningColor","type": "string"},
            {"internalType": "bool","name": "isFinalized","type": "bool"}
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "gameCounter",
        "outputs": [{"internalType": "uint256","name": "","type": "uint256"}],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false,"internalType": "uint256","name": "gameId","type": "uint256"},
            {"indexed": false,"internalType": "uint256","name": "startTime","type": "uint256"}
        ],
        "name": "GameCreated",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false,"internalType": "uint256","name": "gameId","type": "uint256"},
            {"indexed": false,"internalType": "address","name": "player","type": "address"},
            {"indexed": false,"internalType": "string","name": "color","type": "string"}
        ],
        "name": "PlayerJoined",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {"indexed": false,"internalType": "uint256","name": "gameId","type": "uint256"},
            {"indexed": false,"internalType": "string","name": "winningColor","type": "string"}
        ],
        "name": "GameFinalized",
        "type": "event"
    }
];

export const getColorTradingContract = (signer?: ethers.Signer) => {
    const provider = getCoreProvider();
    return new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        signer || provider
    );
};

export const createGame = async (
    signer: ethers.Signer,
    startTime: number,
    entryFee: string
) => {
    const contract = getColorTradingContract(signer);
    const tx = await contract.createGame(
        startTime,
        ethers.utils.parseEther(entryFee)
    );
    return tx.wait();
};

export const joinGame = async (
    signer: ethers.Signer,
    gameId: number,
    color: string,
    entryFee: string
) => {
    const contract = getColorTradingContract(signer);
    const tx = await contract.joinGame(gameId, color, {
        value: ethers.utils.parseEther(entryFee)
    });
    return tx.wait();
};
