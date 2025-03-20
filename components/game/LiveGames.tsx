"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { useAddress } from "@thirdweb-dev/react";
import { ethers } from "ethers";
import { gameWebSocketService } from "@/lib/websocket/gameWebSocket";
import { joinGame } from "@/lib/contracts/colorTrading";

type Game = {
  id: string;
  startTime: number;
  entryFee: string;
  isFinalized: boolean;
  players?: number;
};

export function LiveGames() {
  const [games, setGames] = useState<Game[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const address = useAddress();

  const formatTimeRemaining = (startTime: number) => {
    const diff = startTime - Date.now();
    const minutes = Math.floor(diff / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);
    return `${minutes}m ${seconds}s`;
  };

  useEffect(() => {
    const fetchGames = async () => {
      try {
        const activeGames = await gameWebSocketService.getActiveGames();
        setGames(activeGames);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to fetch games');
      } finally {
        setIsLoading(false);
      }
    };

    fetchGames();

    // Subscribe to new game events
    gameWebSocketService.subscribe('gameCreated', (data) => {
      setGames(prev => [...prev, {
        id: data.gameId.toString(),
        startTime: data.startTime,
        entryFee: '0',
        isFinalized: false
      }]);
    });

    return () => {
      gameWebSocketService.unsubscribe('gameCreated', () => {});
    };
  }, []);

  const handleJoinGame = async (gameId: string, entryFee: string) => {
    try {
      setError(null);
      setIsProcessing(true);
      
      if (!window.ethereum) {
        throw new Error('Please install MetaMask to join games');
      }
      
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      // Request account access
      await window.ethereum.request({ method: 'eth_requestAccounts' });
      
      await joinGame(signer, parseInt(gameId), 'red', entryFee);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to join game');
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold mb-2">Upcoming Games</h2>
        <p className="text-gray-400">
          Join a live game to compete with other players for real rewards!
        </p>
      </div>

      {error && <div className="text-red-500 mb-4">{error}</div>}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {isLoading ? (
          <div className="col-span-full text-center p-8 bg-gray-800/50 rounded-xl backdrop-blur-sm animate-pulse">
            <div className="inline-block w-8 h-8 border-4 border-t-purple-500 border-gray-700 rounded-full animate-spin mb-4"></div>
            <p>Loading available games...</p>
          </div>
        ) : games.length === 0 ? (
          <div className="col-span-full text-center p-8 bg-gray-800/50 rounded-xl backdrop-blur-sm border border-gray-700">
            <p className="text-xl font-semibold mb-2">No Active Games</p>
            <p className="text-gray-400">Check back soon for new betting opportunities!</p>
          </div>
        ) : (
          games.map((game) => (
            <div 
              key={game.id}
              className="bg-gray-800/80 backdrop-blur-sm rounded-xl p-6 border border-gray-700 hover:border-purple-500/50 transition-all duration-300 group"
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">Game #{game.id}</span>
                </div>
                <div className="px-3 py-1 rounded-full bg-gray-700/50 text-sm font-medium">
                  {formatTimeRemaining(game.startTime)}
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Entry Fee</span>
                  <span className="font-medium text-lg">{game.entryFee} CORE</span>
                </div>
                
                {game.players && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-400">Players</span>
                    <div className="flex items-center space-x-2">
                      <div className="h-2 w-24 bg-gray-700 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-pink-500" 
                          style={{ width: `${(game.players/100) * 100}%` }}
                        ></div>
                      </div>
                      <span className="text-sm font-medium">{game.players}/100</span>
                    </div>
                  </div>
                )}
                
                <div className="flex justify-between items-center">
                  <span className="text-gray-400">Potential Win</span>
                  <span className="font-medium text-emerald-400">{(Number(game.entryFee) * 1.8).toFixed(2)} CORE</span>
                </div>
              </div>

              <Button 
                onClick={() => handleJoinGame(game.id, game.entryFee)}
                disabled={!address || isProcessing}
                className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              >
                {!address ? "Connect Wallet to Join" : 
                 isProcessing ? (
                   <div className="flex items-center justify-center space-x-2">
                     <div className="w-4 h-4 border-2 border-t-white border-gray-400 rounded-full animate-spin"></div>
                     <span>Processing...</span>
                   </div>
                 ) : "Join Game"}
              </Button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
