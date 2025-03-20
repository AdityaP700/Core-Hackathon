# 🏆 Gasless Web3 Betting System (CoreDAO)

## 📌 Introduction
This project implements a **gasless betting system** on the **CoreDAO blockchain** where users can place bets without paying gas fees. Instead, a **pre-funded relayer wallet** pays the gas fees on behalf of users.

## 🛠️ Tech Stack
- **Smart Contract:** Solidity
- **Backend & Relayer:** Node.js, ethers.js
- **Blockchain:** CoreDAO

## 🔥 Features
✅ **Gasless Transactions:** Users don't need to pay gas fees.
✅ **Dynamic Betting Amounts:** Users can bet any amount they want.
✅ **Winner Rewards:** The contract pays the winner automatically.
✅ **Secure Transactions:** Uses a pre-funded relayer wallet.

---

## 🚀 How It Works
### 1️⃣ **User Places a Bet**
- The user calls the **placeBet** function in the smart contract.
- The **relayer wallet (pre-funded)** signs and pays the gas fees.
- The bet amount is stored in the contract.

### 2️⃣ **Game Logic Runs (Off-Chain or On-Chain)**
- The game determines the winner.

### 3️⃣ **Winner is Rewarded**
- The contract's **rewardWinner** function is called.
- The winner receives **2x the bet amount**.
- The gas fee is again covered by the **relayer wallet**.

---

## 📜 Smart Contract (Solidity)
```solidity
// SPDX-License-Identifier: MIT
pragma solidity 0.8.26;

contract Betting {
    address payable owner;

    constructor() {
        owner = payable(msg.sender);
    }

    function rewardWinner(address payable winner, uint256 amount) public payable {
        require(address(this).balance > amount * 2, "Insufficient contract balance");
        (bool success,) = winner.call{value: amount * 2}("");
        require(success, "Transfer failed");
    }

    function placeBet() public payable {
        require(msg.value > 0, "Bet amount must be greater than 0");
    }

    function getContractBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
```

---

## 🔌 Backend (ethers.js Relayer)
### ✅ **Connect to Smart Contract**
```javascript
const { ethers } = require("ethers");
const contractAddress = "0xYourContractAddress";
const contractABI = [ /* Smart Contract ABI */ ];
const privateKey = "0xYourPrivateKey";
const provider = new ethers.JsonRpcProvider("https://rpc.ankr.com/core");
const relayerWallet = new ethers.Wallet(privateKey, provider);
const contract = new ethers.Contract(contractAddress, contractABI, relayerWallet);
```

### ✅ **Gasless Betting Function**
```javascript
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
```

### ✅ **Reward Winner Function**
```javascript
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
        console.error("Error rewarding winner:", error);
    }
}
```

### ✅ **Get Contract Balance**
```javascript
async function getContractBalance() {
    const balance = await contract.getContractBalance();
    console.log("Contract Balance:", ethers.formatEther(balance), "CORE");
}
```

---

## 🏗️ **Frontend Integration**
### 🔗 **How to Call Backend from Frontend?**
The frontend **does not directly interact with the blockchain**. Instead, it makes an **API call to the backend**, which relays the transaction.

Example frontend API call:
```javascript
fetch("/api/placeBet", {
    method: "POST",
    body: JSON.stringify({
        userAddress: userWalletAddress,
        betAmount: "0.1" // User's bet amount
    })
})
.then(res => res.json())
.then(data => console.log("Bet placed!", data))
.catch(err => console.error("Error:", err));
```

### 📌 **Frontend Just Calls Backend API**
- **Users DO NOT sign transactions.**
- **The backend relayer pays gas fees.**
- **Transactions are broadcasted by the pre-funded relayer wallet.**

---

## 🛠️ **Setup & Deployment**
### 1️⃣ Install Dependencies
```sh
npm install ethers dotenv express cors
```

### 2️⃣ Set Up Environment Variables (`.env`)
```sh
PRIVATE_KEY=0xYourRelayerPrivateKey
RPC_URL=https://rpc.ankr.com/core
CONTRACT_ADDRESS=0xYourContractAddress
```

### 3️⃣ Run Backend
```sh
node server.js
```

---

## ✅ Summary
🔹 **Users place bets without paying gas.**
🔹 **A pre-funded relayer wallet pays the gas fees.**
🔹 **Transactions are broadcasted by the backend.**
🔹 **Smart contract logic ensures fair betting & rewards.**

🚀 **Now, frontend team can just make API calls without worrying about Web3 complexities!** 🎉