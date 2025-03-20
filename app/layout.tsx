"use client"

import type React from "react"
import "@/app/globals.css"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThirdwebProvider } from "@thirdweb-dev/react"

const inter = Inter({ subsets: ["latin"] })

// Define the Core DAO chain
const coreDAO = {
  id: 1116,
  rpc: ["https://rpc.ankr.com/core"],
  nativeCurrency: {
    name: "Core",
    symbol: "CORE",
    decimals: 18,
  },
  shortName: "Core",
  chain: "Core",
  name: "Core DAO",
  testnet: false
}

export const metadata = {
  title: "ColorFi - Web3 Color Trading Platform",
  description: "Trade unique digital colors with Bitcoin on our secure Web3 platform with AI-driven analytics.",
  generator: 'v0.dev'
}

const queryClient = new QueryClient()

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryClientProvider client={queryClient}>
          <ThirdwebProvider 
            activeChain={coreDAO}
            clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID}
          >
            <ThemeProvider 
              attribute="class" 
              defaultTheme="dark" 
              enableSystem 
              disableTransitionOnChange
            >
              {children}
            </ThemeProvider>
          </ThirdwebProvider>
        </QueryClientProvider>
      </body>
    </html>
  )
}