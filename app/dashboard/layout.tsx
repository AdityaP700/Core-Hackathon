// app/dashboard/layout.tsx
"use client";

import { useAddress } from "@thirdweb-dev/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { ConnectWallet } from "@thirdweb-dev/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const address = useAddress();
  const router = useRouter();

  useEffect(() => {
    if (!address) {
      router.push("/");
    }
  }, [address, router]);

  if (!address) {
    return null; // Prevent flash of content before redirect
  }

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      <header className="border-b border-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-xl font-bold">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-purple-600">
              ColorFi Dashboard
            </span>
          </h1>
          <ConnectWallet />
        </div>
      </header>
      {children}
    </div>
  );
}
