"use client"

import { useState } from "react"
import { Bitcoin, Palette, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"

export default function HeroSection() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  return (
    <section className="relative overflow-hidden py-20 md:py-32">
      {/* Enhanced background elements with more fantasy-inspired elements */}
      <div className="absolute -top-24 -left-20 h-[600px] w-[600px] rounded-full bg-violet-800/20 blur-3xl animate-pulse"></div>
      <div className="absolute -bottom-24 -right-20 h-[600px] w-[600px] rounded-full bg-indigo-700/20 blur-3xl animate-pulse"></div>
      <div className="absolute top-1/2 left-1/2 h-[400px] w-[400px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-fuchsia-600/10 blur-3xl"></div>
      
      {/* Animated particle effects */}
      <div className="absolute inset-0 z-0 opacity-30">
        <div className="stars-container">
          {Array.from({ length: 20 }).map((_, i) => (
            <div 
              key={i} 
              className="absolute rounded-full bg-white" 
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 3 + 1}px`,
                height: `${Math.random() * 3 + 1}px`,
                opacity: Math.random() * 0.8 + 0.2,
                animation: `twinkle ${Math.random() * 5 + 3}s infinite alternate`
              }}
            />
          ))}
        </div>
      </div>
      
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-violet-400/30 bg-background/40 px-3 py-1 text-sm backdrop-blur-md shadow-lg">
                <span className="mr-2 rounded-full bg-fuchsia-500/20 px-1.5 py-0.5 text-xs font-medium text-fuchsia-400">
                  Fantasy
                </span>
                <span className="text-muted-foreground">Magical Color Trading Realm</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl drop-shadow-md">
                Trade Magical Colors with{" "}
                <span className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-indigo-600 bg-clip-text text-transparent animate-gradient-x">
                  Cryptic Power
                </span>
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
                Enter a realm where colors hold mystical value. Trade enchanted hues using Bitcoin in our 
                fantasy-inspired marketplace guided by ancient AI oracles.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-violet-700 to-indigo-700 hover:from-violet-800 hover:to-indigo-800 shadow-lg shadow-violet-500/20 animate-pulse-subtle"
                  >
                    Begin Your Quest
                  </Button>
                </DialogTrigger>
                {}
              </Dialog>
              {}
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-2">
              </div>
              <div className="flex items-center gap-2">
                <div className="rounded-full bg-fuchsia-500/20 p-1 shadow-inner">
                  <Bitcoin className="h-5 w-5 text-fuchsia-400" />
                </div>
                <span className="text-sm text-muted-foreground">Enchanted by BTC</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative h-[450px] w-full max-w-[500px] rounded-lg border border-violet-500/20 bg-background/30 p-6 backdrop-blur-md shadow-xl transform hover:scale-[1.02] transition-all duration-300">
              {/* Decorative corner elements */}
              <div className="absolute top-0 left-0 w-12 h-12 border-t-2 border-l-2 border-fuchsia-500/50 rounded-tl-lg"></div>
              <div className="absolute top-0 right-0 w-12 h-12 border-t-2 border-r-2 border-fuchsia-500/50 rounded-tr-lg"></div>
              <div className="absolute bottom-0 left-0 w-12 h-12 border-b-2 border-l-2 border-fuchsia-500/50 rounded-bl-lg"></div>
              <div className="absolute bottom-0 right-0 w-12 h-12 border-b-2 border-r-2 border-fuchsia-500/50 rounded-br-lg"></div>
              
              <Tabs defaultValue="trade" className="h-full">
                <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-md">
                  <TabsTrigger value="trade" className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-100">Trade</TabsTrigger>
                  <TabsTrigger value="portfolio" className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-100">Portfolio</TabsTrigger>
                  <TabsTrigger value="analytics" className="data-[state=active]:bg-violet-500/20 data-[state=active]:text-violet-100">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="trade" className="h-[calc(100%-40px)] data-[state=inactive]:hidden">
                  <div className="flex h-full flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium">Select Magic Color</label>
                          <span className="text-xs text-emerald-400">Win Rate: 2.5x</span>
                        </div>
                        <div className="grid grid-cols-4 gap-2">
                          {["#FF5733", "#33FF57", "#3357FF", "#F3FF33"].map((color) => (
                            <div
                              key={color}
                              className="relative group h-10 w-10 cursor-pointer rounded-md border border-violet-500/30 shadow-inner transition-all hover:scale-110 hover:border-violet-500">
                              <div
                                className="absolute inset-0 rounded-md"
                                style={{ backgroundColor: color }}
                              />
                              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-md flex items-center justify-center">
                                <span className="text-xs font-medium text-white">2.5x</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between items-center">
                          <label className="text-sm font-medium">Bet Amount (BTC)</label>
                          <span className="text-xs text-emerald-400">Min: 0.001 BTC</span>
                        </div>
                        <Input 
                          type="number" 
                          placeholder="0.001" 
                          className="bg-background/50 border-violet-500/30 focus:border-violet-500 transition-colors" 
                        />
                        <div className="flex gap-2 mt-1">
                          <button className="text-xs bg-violet-500/20 hover:bg-violet-500/30 px-2 py-1 rounded transition-colors">0.001</button>
                          <button className="text-xs bg-violet-500/20 hover:bg-violet-500/30 px-2 py-1 rounded transition-colors">0.005</button>
                          <button className="text-xs bg-violet-500/20 hover:bg-violet-500/30 px-2 py-1 rounded transition-colors">0.01</button>
                        </div>
                      </div>
                    </div>
                    <div className="flex-1 rounded-md border border-violet-500/30 bg-muted/20 p-4 backdrop-blur-sm">
                      <div className="flex h-full flex-col items-center justify-center">
                        <div className="h-32 w-32 rounded-md border border-violet-500/30 shadow-lg transition-all hover:shadow-violet-500/30 hover:shadow-xl" style={{ backgroundColor: "#FF5733" }}></div>
                        <p className="mt-4 text-sm text-muted-foreground">Witness your magical selection</p>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-violet-700 to-indigo-700 hover:from-violet-800 hover:to-indigo-800 shadow-md">
                      Cast Trading Spell
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="portfolio" className="h-[calc(100%-40px)] data-[state=inactive]:hidden">
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <Palette className="h-12 w-12 text-violet-400" />
                    <h3 className="text-lg font-medium">Your Magical Collection</h3>
                    <p className="text-sm text-muted-foreground">Connect your enchanted wallet to view your color treasures</p>
                  </div>
                </TabsContent>
                <TabsContent value="analytics" className="h-[calc(100%-40px)] data-[state=inactive]:hidden">
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <Sparkles className="h-12 w-12 text-indigo-400" />
                    <h3 className="text-lg font-medium">Oracle Insights</h3>
                    <p className="text-sm text-muted-foreground">Connect your enchanted wallet to receive mystical insights</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
      
      {/* Custom CSS for animations */}
      <style jsx>{`
        @keyframes twinkle {
          0% { opacity: 0.2; }
          100% { opacity: 0.8; }
        }
        
        @keyframes pulse-subtle {
          0% { transform: scale(1); }
          50% { transform: scale(1.02); }
          100% { transform: scale(1); }
        }
        
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        
        .animate-pulse-subtle {
          animation: pulse-subtle 3s infinite;
        }
      `}</style>
    </section>
  )
}