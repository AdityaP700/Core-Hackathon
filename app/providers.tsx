"use client";

import { ThirdwebProvider } from "@thirdweb-dev/react";
import { CoreBlockchain } from "@thirdweb-dev/chains";
import { ReactNode, useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "@/components/theme-provider";
import { LeaderboardProvider } from "@/contexts/LeaderboardContext"

export function Providers({ children }: { children: ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    return (
        <QueryClientProvider client={queryClient}>
            <ThirdwebProvider 
                clientId={process.env.NEXT_PUBLIC_THIRDWEB_CLIENT_ID || ""}
                activeChain={CoreBlockchain}
            >                            <LeaderboardProvider>

                <ThemeProvider 
                    attribute="class" 
                    defaultTheme="dark" 
                    enableSystem 
                    disableTransitionOnChange
                >

                    {children}
                </ThemeProvider>
                </LeaderboardProvider>
            </ThirdwebProvider>
        </QueryClientProvider>
    );
}
