"use client"

import { createContext, useContext, useState, useEffect } from "react"

interface PlayerStats {
  address: string
  totalWins: number
  totalBets: number
  totalEarnings: string
  lastGameResult?: {
    color: string
    betAmount: string
    winAmount: string
    timestamp: number
  }
}

interface LeaderboardContextType {
  players: PlayerStats[]
  updatePlayerStats: (stats: PlayerStats) => void
}

const LeaderboardContext = createContext<LeaderboardContextType | undefined>(undefined)

export function LeaderboardProvider({ children }: { children: React.ReactNode }) {
  const [players, setPlayers] = useState<PlayerStats[]>([])

  const updatePlayerStats = (newStats: PlayerStats) => {
    setPlayers(current => {
      const existingPlayerIndex = current.findIndex(p => p.address === newStats.address)
      if (existingPlayerIndex > -1) {
        const updatedPlayers = [...current]
        updatedPlayers[existingPlayerIndex] = newStats
        return updatedPlayers.sort((a, b) => Number(b.totalEarnings) - Number(a.totalEarnings))
      }
      return [...current, newStats].sort((a, b) => Number(b.totalEarnings) - Number(a.totalEarnings))
    })
  }

  return (
    <LeaderboardContext.Provider value={{ players, updatePlayerStats }}>
      {children}
    </LeaderboardContext.Provider>
  )
}

export const useLeaderboard = () => {
  const context = useContext(LeaderboardContext)
  if (!context) throw new Error("useLeaderboard must be used within LeaderboardProvider")
  return context
}