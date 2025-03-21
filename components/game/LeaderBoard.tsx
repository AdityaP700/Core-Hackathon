"use client"

import { useEffect, useState } from "react"
import { useAddress } from "@thirdweb-dev/react"
import { motion } from "framer-motion"
import { Trophy, Medal, Crown } from "lucide-react"
import { getColorTradingContract } from "@/lib/contracts/colorTrading"
import { ethers } from "ethers"

interface PlayerData {
  address: string
  totalWins: number
  totalBets: number
  totalEarnings: string
  lastGame?: {
    timestamp: number
    result: "win" | "loss"
    amount: string
  }
}

export function Leaderboard() {
  const [players, setPlayers] = useState<PlayerData[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const userAddress = useAddress()

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      try {
        const contract = await getColorTradingContract()
        const events = await contract.queryFilter(contract.filters.StatsUpdated())
        
        const playerMap = new Map<string, PlayerData>()
        
        events.forEach(event => {
          const { player, totalWins, totalBets, totalEarnings } = event.args
          playerMap.set(player, {
            address: player,
            totalWins: totalWins.toNumber(),
            totalBets: totalBets.toNumber(),
            totalEarnings: ethers.utils.formatEther(totalEarnings),
            lastGame: {
              timestamp: event.blockTimestamp,
              result: totalWins > 0 ? "win" : "loss",
              amount: ethers.utils.formatEther(totalEarnings)
            }
          })
        })

        const sortedPlayers = Array.from(playerMap.values())
          .sort((a, b) => Number(b.totalEarnings) - Number(a.totalEarnings))
        
        setPlayers(sortedPlayers)
      } catch (error) {
        console.error("Failed to fetch leaderboard data:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchLeaderboardData()
    
    // Set up event listener for real-time updates
    const contract = getColorTradingContract()
    const statsFilter = contract.filters.StatsUpdated()
    
    contract.on(statsFilter, (player, totalWins, totalBets, totalEarnings) => {
      setPlayers(current => {
        const updated = [...current]
        const index = updated.findIndex(p => p.address === player)
        const newStats = {
          address: player,
          totalWins: totalWins.toNumber(),
          totalBets: totalBets.toNumber(),
          totalEarnings: ethers.utils.formatEther(totalEarnings),
          lastGame: {
            timestamp: Date.now(),
            result: totalWins > 0 ? "win" : "loss",
            amount: ethers.utils.formatEther(totalEarnings)
          }
        }

        if (index > -1) {
          updated[index] = newStats
        } else {
          updated.push(newStats)
        }

        return updated.sort((a, b) => Number(b.totalEarnings) - Number(a.totalEarnings))
      })
    })

    return () => {
      contract.removeAllListeners(statsFilter)
    }
  }, [])

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-48">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500" />
      </div>
    )
  }

  return (
    <div className="bg-gray-800 rounded-lg p-6">
      <h2 className="text-2xl font-bold mb-6 flex items-center">
        <Trophy className="w-6 h-6 mr-2 text-yellow-500" />
        Leaderboard
      </h2>

      {players.length === 0 ? (
        <p className="text-center text-gray-400">No games played yet</p>
      ) : (
        <div className="space-y-4">
          {players.map((player, index) => (
            <motion.div
              key={player.address}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`p-4 rounded-lg ${
                player.address === userAddress
                  ? "bg-purple-500/20 border border-purple-500/50"
                  : "bg-gray-700/50"
              }`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {index === 0 && <Crown className="w-5 h-5 text-yellow-500" />}
                  {index === 1 && <Medal className="w-5 h-5 text-gray-400" />}
                  {index === 2 && <Medal className="w-5 h-5 text-orange-400" />}
                  <span className="font-medium">
                    {player.address.slice(0, 6)}...{player.address.slice(-4)}
                    {player.address === userAddress && (
                      <span className="ml-2 text-xs text-purple-400">(You)</span>
                    )}
                  </span>
                </div>
                <div className="text-right">
                  <div className="text-sm text-gray-400">
                    Wins: {player.totalWins}/{player.totalBets}
                  </div>
                  <div className="font-bold text-purple-400">
                    {Number(player.totalEarnings).toFixed(2)} CORE
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}