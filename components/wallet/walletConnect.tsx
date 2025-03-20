// src/components/ConnectWalletButton.tsx
import { ConnectButton } from "@thirdweb-dev/react";

const ConnectWalletButton = () => {
  return (
    <ConnectButton
      theme="dark" // You can customize the theme
      accountAbstraction={{
        chain: {
          id: 1116, // Replace with your target chain ID
          rpc: "https://rpc.ankr.com/core", // Replace with your RPC URL
        },
        sponsorGas: true, // Enable gas sponsorship
      }}
      connectModal={{
        size: "compact",
        title: "Sign In with Google",
        showThirdwebBranding: false,
      }}
      auth={{
        loginOptional: false, // Set to true if you want optional login
      }}
    />
  );
};

export default ConnectWalletButton;