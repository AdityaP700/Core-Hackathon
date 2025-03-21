"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { gameWebSocketService } from "@/lib/websocket/gameWebSocket";
import { joinGame } from "@/lib/contracts/colorTrading";
import { GameRoom } from "./GameRoom";
import { motion } from "framer-motion";
import { Sparkles, Coins, Timer } from "lucide-react";

interface Game {
  id: string;
  startTime: number;
  entryFee: string;
  isFinalized: boolean;
  players?: number;
}

export function LiveGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [selectedGame, setSelectedGame] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsProcessing] = useState(false);
  const address = useAddress();

  useEffect(() => {
    const mockGames = [
      { id: "1", startTime: Date.now() + 300000, entryFee: "0.1", isFinalized: false, players: 3 },
      { id: "2", startTime: Date.now() + 600000, entryFee: "0.2", isFinalized: false, players: 5 },
      { id: "3", startTime: Date.now() + 900000, entryFee: "0.15", isFinalized: false, players: 2 },
    ];
    setGames(mockGames);
  }, []);

  const handleJoinGame = async (gameId: string) => {
    if (!address) {
      setError("Please connect your wallet first");
      return;
    }
    setSelectedGame(gameId);
  };

  const handleGameComplete = (result: any) => {
    setSelectedGame(null);
  };

  if (selectedGame) {
    return (
      <GameRoom 
        gameId={selectedGame}
        entryFee="0.1"
        onGameComplete={handleGameComplete}
      />
    );
  }

  return (
    <div className="space-y-8 p-6">
      <div className="max-w-md mx-auto bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-6 rounded-xl border border-purple-500/20 text-center">
        <Sparkles className="w-12 h-12 mx-auto mb-4 text-purple-400" />
        <h2 className="text-2xl font-bold mb-2">Color Trading Game</h2>
        <p className="text-gray-400">
          Bet your CORE tokens on colors and win up to 1.5x your bet!
        </p>
        <Button
          onClick={() => setSelectedGame("1")}
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600"
        >
          Enter Game Room
        </Button>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {games.map((game) => (
          <motion.div
            key={game.id}
            whileHover={{ scale: 1.02 }}
            className="relative bg-gradient-to-br from-purple-900/50 to-indigo-900/50 p-6 rounded-xl border border-purple-500/20 backdrop-blur-sm overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 to-indigo-500/10 animate-pulse" />
            <div className="relative z-10">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-indigo-400 bg-clip-text text-transparent">
                  Game Room #{game.id}
                </h3>
                <span className="px-3 py-1 bg-purple-500/20 rounded-full text-purple-300 text-sm">
                  Live
                </span>
              </div>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-300">
                  <Timer className="w-4 h-4 mr-2" />
                  <span>Starts in {Math.floor((game.startTime - Date.now()) / 60000)} minutes</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Coins className="w-4 h-4 mr-2" />
                  <span>Entry Fee: {game.entryFee} CORE</span>
                </div>
                <div className="flex items-center text-gray-300">
                  <Sparkles className="w-4 h-4 mr-2" />
                  <span>{game.players} Players Joined</span>
                </div>
              </div>
              <Button
                onClick={() => handleJoinGame(game.id)}
                disabled={!address}
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-3 rounded-lg transition-all duration-300 shadow-lg shadow-purple-500/25"
              >
                {!address ? "Connect Wallet to Join" : "Enter Game Room"}
              </Button>
            </div>
          </motion.div>
        ))}
      </div>
      {error && (
        <div className="text-red-400 text-center p-4 bg-red-500/10 rounded-lg">
          {error}
        </div>
      )}
    </div>
  );
}
