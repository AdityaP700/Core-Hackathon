import type { AppProps} from "next/app";
import { ThirdWebProvider } from "thirdweb-dev/react";
import "../styles/globals.css";
import {
    
}

const activeChain = "polygon";
function MyApp({
    Component,
    pageProps,
}: AppProps){
    return (
        <ThirdWebProvider
        activeChain={}
        >
        <Component {..pageProps}/>
        <ThirdWebProvider>
    );
}