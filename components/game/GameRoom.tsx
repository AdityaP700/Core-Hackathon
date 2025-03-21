import { useState, useEffect } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { gameWebSocketService } from "@/lib/websocket/gameWebSocket";
import { COLORS, getNextColor, calculatePayout } from "@/lib/gameLogic";
import { getColorTradingContract } from "@/lib/contracts/colorTrading";
import { useLeaderboard } from "@/contexts/LeaderboardContext"

interface GameRoomProps {
  gameId: string;
  entryFee: string;
  onGameComplete: (result: GameResult) => void;
}

interface GameResult {
  address: string;
  betAmount: string;
  winAmount: string;
  color: string;
}

export function GameRoom({ gameId, entryFee, onGameComplete }: GameRoomProps) {
  const address = useAddress();
  const { updatePlayerStats } = useLeaderboard();
  const [selectedColor, setSelectedColor] = useState<number | null>(null);
  const [betAmount, setBetAmount] = useState(entryFee);
  const [gameStarted, setGameStarted] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [isProcessing, setIsProcessing] = useState(false);
  const [gameState, setGameState] = useState<"waiting" | "active" | "completed">("waiting");

  const placeBet = async () => {
    if (!selectedColor || !address) return;
    try {
      setIsProcessing(true);
      const contract = await getColorTradingContract();
      const tx = await contract.placeBet({
        value: ethers.utils.parseEther(betAmount),
      });
      await tx.wait();
      toast.success("Bet placed successfully!");
      setGameStarted(true);
      setGameState("active");
      startGameTimer();
    } catch (error) {
      toast.error("Failed to place bet. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  };

  const startGameTimer = () => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          finalizeGame();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleGameEnd = async (isWinner: boolean) => {
    const contract = await getColorTradingContract();
    const stats = await contract.getPlayerStats(address);
    updatePlayerStats({
      address,
      totalWins: stats.totalWins.toNumber(),
      totalBets: stats.totalBets.toNumber(),
      totalEarnings: ethers.utils.formatEther(stats.totalEarnings),
      lastGameResult: {
        color: COLORS[selectedColor! - 1].name,
        betAmount,
        winAmount: isWinner ? (Number(betAmount) * 1.5).toString() : "0",
        timestamp: Date.now(),
      },
    });
  };

  const finalizeGame = async () => {
    const winningColor = getNextColor(COLORS[selectedColor! - 1].name);
    const userWon = COLORS[selectedColor! - 1].name === winningColor;
    const winAmount = userWon ? calculatePayout(Number(betAmount), winningColor, [winningColor]) : "0";

    if (userWon) {
      try {
        const contract = await getColorTradingContract();
        await contract.rewardWinner(address, ethers.utils.parseEther(winAmount));
        toast.success(`Congratulations! You won ${winAmount} CORE!`);
      } catch (error) {
        console.error("Error rewarding winner:", error);
        toast.error("Failed to process reward");
      }
    } else {
      toast.error("Better luck next time!");
    }
    
    await handleGameEnd(userWon);
    setGameState("completed");
    onGameComplete({
      address: address!,
      betAmount,
      winAmount: winAmount.toString(),
      color: winningColor,
    });
  };

  return (
    <div className="p-6 bg-gray-800 rounded-lg shadow-xl">
      <div className="text-center mb-6">
        <h2 className="text-2xl font-bold">Color Trading Game #{gameId}</h2>
        <p className="text-gray-400">Entry Fee: {entryFee} CORE</p>
        {gameStarted && <div className="text-xl font-bold text-purple-400">Time Left: {timeLeft}s</div>}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        {COLORS.map((color) => (
          <motion.button
            key={color.id}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className={`h-24 rounded-lg transition-all duration-200 ${selectedColor === color.id ? "ring-4 ring-white" : ""}`}
            style={{ backgroundColor: color.hex }}
            onClick={() => gameState === "waiting" && setSelectedColor(color.id)}
            disabled={gameState !== "waiting"}
          />
        ))}
      </div>

      {gameState === "waiting" && (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Input
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(e.target.value)}
              min="0.1"
              step="0.1"
              className="bg-gray-700"
              placeholder="Bet Amount"
            />
            <span className="text-sm text-gray-400">CORE</span>
          </div>

          <Button
            onClick={placeBet}
            disabled={!selectedColor || isProcessing || !address}
            className="w-full bg-gradient-to-r from-purple-500 to-indigo-500"
          >
            {isProcessing ? "Placing Bet..." : "Place Bet"}
          </Button>
        </div>
      )}
    </div>
  );
}
