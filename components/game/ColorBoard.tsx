"use client";

import { useState, useEffect, useRef } from "react";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { Button } from "@/components/ui/button";
import { COLORS, getNextColor, calculatePayout, getHotAndColdColors } from "@/lib/gameLogic";
import { getColorTradingContract, joinGame } from "@/lib/contracts/colorTrading";
import { gameWebSocketService } from "@/lib/websocket/gameWebSocket";

export function ColorBoard() {
  const address = useAddress();
  const [error, setError] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [tokenBalance, setTokenBalance] = useState<string>("0");
  
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  const [gameState, setGameState] = useState<"waiting" | "betting" | "revealing" | "finished">("waiting");
  const [timeLeft, setTimeLeft] = useState(60);
  const [currentInterval, setCurrentInterval] = useState(1);
  const [winningColor, setWinningColor] = useState<string | null>(null);
  const [betAmount, setBetAmount] = useState(10);
  const [colorHistory, setColorHistory] = useState<string[]>([]);
  const [hotAndColdColors, setHotAndColdColors] = useState<{ hot: string[], cold: string[] }>({ hot: [], cold: [] });
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startGame = async () => {
    try {
      setError(null);
      setIsProcessing(true);
      setGameState("betting");
      setTimeLeft(60);
      setCurrentInterval(1);
      setSelectedColor(null);
      setWinningColor(null);
      
      // Subscribe to game events
      gameWebSocketService.subscribe('gameFinalized', (data) => {
        if (data.winningColor) {
          setWinningColor(data.winningColor);
          setGameState("finished");
        }
      });

      const initialColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      setColorHistory(prev => [...prev, initialColor]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to start game');
    } finally {
      setIsProcessing(false);
    }
  };

  useEffect(() => {
    if (gameState !== "betting" && gameState !== "revealing") return;
    
    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current!);
          setGameState("finished");
          return 0;
        }
        
        if (prev % 15 === 0 && prev !== 60) {
          setGameState("revealing");
          const nextColor = colorHistory.length > 0 
            ? getNextColor(colorHistory[colorHistory.length - 1]) 
            : COLORS[Math.floor(Math.random() * COLORS.length)];
          setWinningColor(nextColor);
          setColorHistory(prev => [...prev, nextColor]);
          setCurrentInterval(prevInterval => prevInterval + 1);
          
          if (colorHistory.length >= 3) {
            setHotAndColdColors(identifyHotAndColdColors(colorHistory));
          }
          
          setTimeout(() => {
            if (currentInterval < 4) {
              setGameState("betting");
            }
          }, 3000);
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [gameState, colorHistory, currentInterval]);

  const potentialPayout = selectedColor ? calculatePayout(betAmount) : 0;

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">Color Trading Game</h2>
        <div className="text-sm">Time: {timeLeft}s | Interval: {currentInterval}/4</div>
      </div>

      <div className="text-sm mb-4">
        Your balance: {tokenBalance} TOKENS
        {error && <div className="text-red-500 mt-2">{error}</div>}
      </div>

      {hotAndColdColors.hot.length > 0 && (
        <div className="mb-4 text-sm">
          <div className="flex items-center gap-2">
            <span>Hot Colors:</span>
            {hotAndColdColors.hot.map(color => (
              <div key={`hot-${color}`} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span>Cold Colors:</span>
            {hotAndColdColors.cold.map(color => (
              <div key={`cold-${color}`} className="w-4 h-4 rounded-full" style={{ backgroundColor: color }} />
            ))}
          </div>
        </div>
      )}

      {gameState === "betting" && (
        <div className="mb-4">
          <label className="block text-sm mb-1">Bet Amount (CORE)</label>
          <input type="number" min="1" value={betAmount} onChange={(e) => setBetAmount(Number(e.target.value))} className="bg-gray-700 rounded px-3 py-2 w-full" />
          {selectedColor && <div className="mt-2 text-sm">Potential payout: {potentialPayout} CORE</div>}
        </div>
      )}

      <div className="grid grid-cols-3 gap-4 mb-6">
        {COLORS.map((color) => (
          <div key={color} className={`h-24 rounded-lg cursor-pointer flex items-center justify-center ${selectedColor === color ? "ring-4 ring-white" : ""}`} style={{ backgroundColor: color }} onClick={() => gameState === "betting" && setSelectedColor(color)}>
            {winningColor === color && gameState === "revealing" && (
              <div className="bg-white bg-opacity-30 p-2 rounded-full">Winner!</div>
            )}
          </div>
        ))}
      </div>

      <div className="flex justify-center">
        {gameState === "waiting" && (
          <Button 
            onClick={startGame} 
            className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700" 
            disabled={!address || isProcessing}
          >
            {!address ? "Connect Wallet to Play" : isProcessing ? "Processing..." : "Start Game"}
          </Button>
        )}
        {gameState === "finished" && (
          <div className="text-center">
            <p className="mb-2">{selectedColor === winningColor ? `Congratulations! You won ${potentialPayout} CORE!` : "Better luck next time!"}</p>
            <Button onClick={startGame} className="bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700">Play Again</Button>
          </div>
        )}
      </div>
    </div>
  );
}
