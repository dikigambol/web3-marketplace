import { BasicMarketplace } from "@meshsdk/contracts";
import { BrowserWallet, KoiosProvider } from "@meshsdk/core";

export function getMarketplace(wallet: BrowserWallet) {
  const blockchainProvider = new KoiosProvider(process.env.NEXT_PUBLIC_NETWORK!);

  const marketplace = new BasicMarketplace({
    fetcher: blockchainProvider,
    initiator: wallet,
    network: 'preprod',
    signer: wallet,
    submitter: blockchainProvider,
    percentage: 10000,
    owner: "addr_test1qpa0fgzlt5kh0acqhpx9jhp9q2u3pqdq7lg4434akcwds5vwn5cgrr9vd9vp5k09usymjpklzxn93sm68fn003p2qzvq6kvjjq",
  });

  return marketplace;
}
