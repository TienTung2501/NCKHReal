import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import Layout from "./components/layout";
import  "../styles/globals.scss";
import { CardanoWallet } from '@meshsdk/react';

// ...
export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
        <Layout cardanoWallet={<CardanoWallet/>} >
          <Component {...pageProps} />
        </Layout>
    </MeshProvider>
  );
}
