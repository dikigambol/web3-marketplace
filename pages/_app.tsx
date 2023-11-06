import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { MeshProvider } from "@meshsdk/react";
import Head from "next/head";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { AppProvider } from "@/components/Context";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <MeshProvider>
      <AppProvider>
        <Head>
          <title>ADAGINI</title>
          <meta name="description" content="ADAGINI NFT Marketplace build for Arts, Fans and empowering communities" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link rel="icon" href="https://meshjs.dev/favicon/favicon-32x32.png" />
          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" />
          <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet" />
        </Head>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </AppProvider>
    </MeshProvider>
  );
}
