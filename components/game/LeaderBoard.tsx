// components/game/Leaderboard.tsx
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { subscribeToLeaderboard } from "@/lib/websocket";

export function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Initial fetch of leaderboard data
    fetch('/api/leaderboard')
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data.players);
        setIsLoading(false);
      });
    
    // Subscribe to real-time updates
    const unsubscribe = subscribeToLeaderboard((updatedPlayer) => {
      setLeaderboard(current => {
        // Find if player exists in current leaderboard
        const index = current.findIndex(p => p.wallet_address === updatedPlayer.wallet_address);
        
        let newLeaderboard = [...current];
        if (index >= 0) {
          // Update existing player
          newLeaderboard[index] = updatedPlayer;
        } else {
          // Add new player
          newLeaderboard.push(updatedPlayer);
        }
        
        // Sort by score
        return newLeaderboard.sort((a, b) => b.total_score - a.total_score)
          .map((player, idx) => ({ ...player, rank: idx + 1 }))
          .slice(0, 10); // Keep top 10
      });
    });
    
    return unsubscribe;
  }, []);

  if (isLoading) {
    return <div className="bg-gray-800 rounded-lg p-4">Loading leaderboard...</div>;
  }

  return (
    <div className="bg-gray-800 rounded-lg p-4">
      <h3 className="text-lg font-bold mb-3">Leaderboard</h3>
      <div className="space-y-2">
        <AnimatePresence>
          {leaderboard.map((player) => (
            <motion.div
              key={player.wallet_address}
              className="flex items-center justify-between p-2 bg-gray-700 rounded"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -20 }}
              layout
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              <div className="flex items-center">
                <div className="w-6 h-6 flex items-center justify-center bg-gray-600 rounded-full mr-2">
                  {player.rank}
                </div>
                <div>
                  <div className="font-medium">{player.username || player.wallet_address.substring(0, 6) + '...'}</div>
                  <div className="text-xs text-gray-400">{player.wallet_address.substring(0, 10) + '...'}</div>
                </div>
              </div>
              <div className="text-sm">
                {player.total_score} points
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}
