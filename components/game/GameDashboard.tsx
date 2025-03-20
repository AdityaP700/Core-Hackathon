"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ColorBoard } from "@/components/game/ColorBoard";
import { LiveGames } from "@/components/game/LiveGames";
import { Leaderboard } from "@/components/game/LeaderBoard";

export function GameDashboard() {
  const [activeTab, setActiveTab] = useState("demo");

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black p-4">
      <div className="container mx-auto bg-gray-800/50 rounded-xl backdrop-blur-sm shadow-2xl p-6 border border-gray-700">
        <h1 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 text-transparent bg-clip-text">Color Trading Arena</h1>
        
        <Tabs defaultValue="demo" onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-gray-800/60 p-1 rounded-lg gap-2">
            <TabsTrigger 
              value="demo" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-purple-500 data-[state=active]:to-pink-500 data-[state=active]:text-white transition-all duration-300"
            >
              Practice Arena
            </TabsTrigger>
            <TabsTrigger 
              value="live" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-500 data-[state=active]:to-cyan-500 data-[state=active]:text-white transition-all duration-300"
            >
              Live Battles
            </TabsTrigger>
            <TabsTrigger 
              value="leaderboard" 
              className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-amber-500 data-[state=active]:to-orange-500 data-[state=active]:text-white transition-all duration-300"
            >
              Champions
            </TabsTrigger>
          </TabsList>
        
        <TabsContent value="demo" className="mt-8">
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-purple-400 to-pink-500 text-transparent bg-clip-text">Practice Arena</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Master your color prediction skills! Choose your colors wisely and learn the patterns to become a champion trader.
            </p>
          </div>
          <ColorBoard />
        </TabsContent>
        
        <TabsContent value="live" className="mt-8">
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-cyan-500 text-transparent bg-clip-text">Live Battles</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Enter the arena and compete against other traders in real-time! Higher stakes, bigger rewards.
            </p>
          </div>
          <LiveGames />
        </TabsContent>
        
        <TabsContent value="leaderboard" className="mt-8">
          <div className="text-center mb-6 space-y-2">
            <h2 className="text-3xl font-bold bg-gradient-to-r from-amber-400 to-orange-500 text-transparent bg-clip-text">Hall of Champions</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              The most successful color traders are immortalized here. Will you join their ranks?
            </p>
          </div>
          <Leaderboard />
        </TabsContent>
      </Tabs>
    </div>
    </div>
  );
}
