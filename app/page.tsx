"use client";
import Link from "next/link";
import { ModeToggle } from "@/components/mode-toggle";
import HeroSection from "@/components/hero-section";
import FeaturesSection from "@/components/features-section";
import FaqSection from "@/components/faq-section";
import Footer from "@/components/footer";
import ColorTrading from "@/components/colorTrading";
import { ConnectWallet, useAddress } from "@thirdweb-dev/react";
import { useEffect } from "react";
import { useRouter } from "next/navigation";

// Define chain configuration
const CoreTestnet = {
  chainId: 1116,
  rpc: ["https://rpc.ankr.com/core"],
  nativeCurrency: {
    name: "CORE",
    symbol: "CORE", 
    decimals: 18,
  },
  shortName: "Core", 
  slug: "core",
  testnet: true,
  chain: "Core",
  name: "Core Testnet"
};

export default function Home() {
  const address = useAddress();
  const router = useRouter();
  
  useEffect(() => {
    if (address) {
      router.push("/dashboard");
    }
  }, [address, router]);

  return (
    <div className="flex min-h-screen flex-col">
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 md:gap-10">
            {/* Logo/Brand */}
            <Link href="/" className="font-bold">
              ColorFi
            </Link>
          </div>
          <div className="flex items-center gap-2">
            <ModeToggle />
            <ConnectWallet 
              theme="dark"
              btnTitle="Connect Wallet"
              className="bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-700 hover:to-indigo-700"
            />
          </div>
        </div>
      </header>

      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <ColorTrading />
        <FaqSection />
      </main>

      <Footer />
    </div>
  );
}