// SPDX-License-Identifier: MIT
pragma solidity ^0.8.26;

contract Betting {
    address payable public immutable owner;
    mapping(address => uint256) public playerBalances;
    uint256 public constant REWARD_MULTIPLIER = 150; // 1.5x multiplier
    uint256 public constant GAS_FEE_PERCENTAGE = 5; // 5% for gas fees

    constructor() {
        owner = payable(msg.sender);
    }

    function placeBet() external payable {
        require(msg.value > 0, "Must send some amount");
        playerBalances[msg.sender] += msg.value; // Store bet amount
    }

    function rewardWinner(address payable winner) external {
        uint256 betAmount = playerBalances[winner];
        require(betAmount > 0, "No bet found");
        
        uint256 gasFee = (betAmount * GAS_FEE_PERCENTAGE) / 100;
        uint256 reward = (betAmount * REWARD_MULTIPLIER) / 100;
        require(address(this).balance >= reward + gasFee, "Insufficient contract balance");
        
        playerBalances[winner] = 0; // Reset bet before transferring
        (bool success,) = winner.call{value: reward}("");
        require(success, "Transfer failed");
        
        (bool feeSuccess,) = owner.call{value: gasFee}("");
        require(feeSuccess, "Gas fee transfer failed");
    }

    function getContractBalance() external view returns (uint256) {
        return address(this).balance;
    }

    function getPlayerBalance(address player) external view returns (uint256) {
        return playerBalances[player];
    }

    receive() external payable {}
}
