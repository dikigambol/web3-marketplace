import Link from "next/link";
import { CardanoWallet, useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";
import { getUsername } from "@/lib/axios";
import { useAppContext } from "./Context";

export default function Navbar() {
  const { connected, wallet } = useWallet();
  const [username, setUsername] = useState("");
  const { globalState } = useAppContext();

  useEffect(() => {
    if (connected) {
      const getAddress = async () => {
        const walletAddress = (await wallet.getUsedAddresses())[0];
        const res = await getUsername(walletAddress)
        if (!res.notfound) {
          setUsername(res.username)
        } else {
          setUsername(walletAddress)
        }
      }
      getAddress()
    }
  }, [connected, globalState])

  return (
    <div className="bg-white z-50 fixed w-full">
      <header className="relative bg-white">
        <nav
          aria-label="Top"
          className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        >
          <div className="border-b border-gray-200">
            <div className="flex h-16 items-center">
              <div className="ml-4 flex lg:ml-0">
                <Link href="/">
                  <>
                    <img
                      className="h-8 w-auto"
                      src="https://meshjs.dev/logo-mesh/black/logo-mesh-black-128x128.png"
                      alt="logo"
                    />
                  </>
                </Link>
              </div>
              <div className="hidden lg:ml-8 lg:block lg:self-stretch">
                <div className="flex h-full space-x-8">
                  <span className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                    <Link href="/market">Market</Link>
                  </span>
                  {connected ?
                    <span className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                      <Link href={`/${username}`}>Profile</Link>
                    </span>
                    : null}
                </div>
              </div>
              <div className="ml-auto flex items-center">
                <CardanoWallet />
              </div>
            </div>
          </div>
        </nav>
      </header>
    </div>
  );
}
