// src/pages/_app.tsx
import type { AppProps } from 'next/app';
import { ThirdwebProvider } from '@thirdweb-dev/react';
import { defineChain } from 'thirdweb/chains';
import '../styles/globals.css'; // Adjust this path based on your project structure

// Define the chain (Core DAO example)
const coreDAO = defineChain({
  id: 1116,
  rpc: 'https://rpc.ankr.com/core',
  nativeCurrency: {
    name: 'Core',
    symbol: 'CORE',
    decimals: 18,
  },
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ThirdwebProvider activeChain={coreDAO} clientId={process.env.NEXT_PUBLIC_TEMPLATE_CLIENT_ID}>
      <Component {...pageProps} />
    </ThirdwebProvider>
  );
}

export default MyApp;
