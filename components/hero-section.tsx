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
      {/* Background gradient elements */}
      <div className="absolute -top-24 -left-20 h-[500px] w-[500px] rounded-full bg-violet-500/10 blur-3xl"></div>
      <div className="absolute -bottom-24 -right-20 h-[500px] w-[500px] rounded-full bg-indigo-500/10 blur-3xl"></div>
      <div className="container relative z-10">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-8">
          <div className="flex flex-col justify-center space-y-8">
            <div className="space-y-6">
              <div className="inline-flex items-center rounded-full border border-border bg-background/60 px-3 py-1 text-sm backdrop-blur">
                <span className="mr-2 rounded-full bg-green-500/10 px-1.5 py-0.5 text-xs font-medium text-green-500">
                  New
                </span>
                <span className="text-muted-foreground">Web3 Color Trading Platform</span>
              </div>
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Trade Colors with{" "}
                <span className="bg-gradient-to-r from-violet-600 to-indigo-600 bg-clip-text text-transparent">
                  Bitcoin
                </span>
              </h1>
              <p className="max-w-[600px] text-lg text-muted-foreground sm:text-xl">
                A revolutionary platform that combines color trading, BTC transactions, and AI-driven analytics for a
                unique digital asset experience.
              </p>
            </div>
            <div className="flex flex-col gap-4 sm:flex-row">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
                  >
                    Get Started
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
                <div className="rounded-full bg-green-500/10 p-1">
                  <Bitcoin className="h-5 w-5 text-green-500" />
                </div>
                <span className="text-sm text-muted-foreground">BTC Powered</span>
              </div>
            </div>
          </div>
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative h-[400px] w-full max-w-[500px] rounded-lg border bg-background/50 p-6 backdrop-blur">
              <Tabs defaultValue="trade" className="h-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trade">Trade</TabsTrigger>
                  <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>
                <TabsContent value="trade" className="h-[calc(100%-40px)] data-[state=inactive]:hidden">
                  <div className="flex h-full flex-col gap-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Select Color</label>
                        <div className="grid grid-cols-4 gap-2">
                          {["#FF5733", "#33FF57", "#3357FF", "#F3FF33"].map((color) => (
                            <div
                              key={color}
                              className="h-10 w-10 cursor-pointer rounded-md border"
                              style={{ backgroundColor: color }}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-sm font-medium">Amount (BTC)</label>
                        <Input type="number" placeholder="0.001" />
                      </div>
                    </div>
                    <div className="flex-1 rounded-md border bg-muted/50 p-4">
                      <div className="flex h-full flex-col items-center justify-center">
                        <div className="h-32 w-32 rounded-md border" style={{ backgroundColor: "#FF5733" }}></div>
                        <p className="mt-4 text-sm text-muted-foreground">Preview your color selection</p>
                      </div>
                    </div>
                    <Button className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700">
                      Trade Now
                    </Button>
                  </div>
                </TabsContent>
                <TabsContent value="portfolio" className="h-[calc(100%-40px)] data-[state=inactive]:hidden">
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <Palette className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-medium">Your Color Portfolio</h3>
                    <p className="text-sm text-muted-foreground">Connect your wallet to view your color assets</p>
                  </div>
                </TabsContent>
                <TabsContent value="analytics" className="h-[calc(100%-40px)] data-[state=inactive]:hidden">
                  <div className="flex h-full flex-col items-center justify-center gap-4 text-center">
                    <Sparkles className="h-12 w-12 text-muted-foreground" />
                    <h3 className="text-lg font-medium">AI-Driven Analytics</h3>
                    <p className="text-sm text-muted-foreground">Connect your wallet to view personalized insights</p>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

