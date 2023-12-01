import { BasicMarketplace } from "@meshsdk/contracts";
import { BlockfrostProvider, BrowserWallet, KoiosProvider } from "@meshsdk/core";

export function getMarketplace(wallet: BrowserWallet) {
  // const blockchainProvider = new KoiosProvider(process.env.NEXT_PUBLIC_NETWORK!);
  const blockchainProvider = new BlockfrostProvider('mainnetZcOQz4soDjLcearNCRplceoZYeiQ6Kg5');

  const marketplace = new BasicMarketplace({
    fetcher: blockchainProvider,
    initiator: wallet,
    network: 'mainnet',
    signer: wallet,
    submitter: blockchainProvider,
    percentage: 10000,
    owner: "addr1q830fhu8wcfflt4gd2yuz4s0kjyg460spcmjfd8jj9l5ukakke7m4mjfvlz4j7fx8urnca58jlwhz003nqtkezqaku2q87xxff",
  });

  return marketplace;
}
