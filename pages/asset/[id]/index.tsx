import AssetImage from "@/components/AssetImage";
import Toast from "@/components/Toast";
import { addListing, deleteListing, getDetailAsset, updateListing } from "@/lib/axios";
import { getMarketplace } from "@/lib/marketplace";
import { Item } from "@/type/item";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { BlockfrostProvider, KoiosProvider } from "@meshsdk/core";
import { useWallet } from "@meshsdk/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const initialState = {
  unit: "",
  metadata: {
    image: "",
    name: "",
    description: ""
  },
  owner: "",
  listing: {
    seller: "",
    price: 0
  }
}

// const blockchainProvider = new KoiosProvider(process.env.NEXT_PUBLIC_NETWORK!);
const blockchainProvider = new BlockfrostProvider('mainnetZcOQz4soDjLcearNCRplceoZYeiQ6Kg5');

export default function DetailAsset() {

  const [detail, setDetail] = useState<Item[] | any>(initialState)
  const { connected, wallet } = useWallet();
  const [loading, setLoading] = useState<boolean>(false);
  const [loadingDetail, setLoadingDetail] = useState<boolean>(true);
  const [toastMessage, setToastMessage] = useState<undefined | any>(undefined);
  const [toastType, setToastType] = useState<undefined | any>(undefined);
  const [walletAddress, updateWalletAddress] = useState<string>("");
  const [listPrice, updateListPrice] = useState<string>("0");
  const [isOwnNFT, setIsOwnNFT] = useState<boolean>(true);
  const [blockConfirmations, updateBlockConfirmations] = useState<number | any>(undefined);

  const router = useRouter();
  const id: string | string[] | undefined = router.query.id;

  useEffect(() => {
    function closeToast() {
      setToastMessage(undefined);
    }
    if (toastMessage !== undefined) {
      setTimeout(function () {
        closeToast();
      }, 5000);
    }
  }, [toastMessage]);

  useEffect(() => {
    if (detail !== undefined) {
      if (detail.listing.price) {
        updateListPrice((detail.listing.price / 1000000).toString());
      } else {
        updateListPrice("10");
      }
    }
  }, [detail]);

  async function getDetail() {
    setLoadingDetail(true)
    try {
      if (typeof id === 'string') {
        let address = ""
        if (connected && walletAddress == "") {
          address = (await wallet.getUsedAddresses())[0];
          updateWalletAddress(address);
        }
        if (!connected) {
          updateWalletAddress("")
        }
        const metadata = await blockchainProvider.fetchAssetMetadata(id);
        let data = await getDetailAsset(id)
        if (!data.notfound) {
          setDetail((prev) => ({
            ...prev,
            unit: id,
            metadata: {
              image: metadata.image,
              name: metadata.name,
              description: metadata.description
            },
            owner: data.owner,
            listing: data.listing
          }))
        } else {
          if (connected && walletAddress == "") {
            const listUserAssets = await wallet.getAssets();
            const result = checkOwnNFT(id, listUserAssets);
            setIsOwnNFT(result)
          }
          setDetail((prev) => ({
            ...prev,
            unit: id,
            metadata: {
              image: metadata.image,
              name: metadata.name,
              description: metadata.description
            },
            owner: address
          }))
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  async function loadDetail() {
    await getDetail();
    setLoadingDetail(false);
  }

  useEffect(() => {
    if (id != undefined) {
      setLoadingDetail(true);
      loadDetail()
    }
  }, [id, connected])

  async function purchase() {
    if (detail == undefined) return;
    setLoading(true);
    setToastMessage(undefined);
    try {
      const marketplace = getMarketplace(wallet);
      const txBuy = await marketplace.purchaseAsset(
        detail.listing?.seller,
        detail.unit,
        detail.listing?.price
      );
      const res = await deleteListing(detail.unit);
      if (res && txBuy) {
        setToastType("success");
        setToastMessage("Item purchased");
        setLoading(false);
        loadDetail()
      }
    } catch (error) {
      console.error(error);
      setToastType("danger");
      setToastMessage("Problem listing item, try again later");
      setLoading(false);
    }
  }

  async function list() {
    if (detail == undefined) return;
    if (parseInt(listPrice) < 10) {
      setToastMessage("Price must be at least 10");
      setToastType("danger");
      return;
    }
    setLoading(true);
    setToastMessage(undefined);
    try {
      const marketplace = getMarketplace(wallet);
      if (detail.listing.seller == "") {
        const txList = await marketplace.listAsset(
          walletAddress,
          detail.unit,
          parseInt(listPrice) * 1000000
        );
        const res = await addListing({
          ...detail,
          listing: {
            seller: walletAddress,
            price: parseInt(listPrice) * 1000000,
          },
        });
        if (res && txList) {
          setToastType("success");
          setToastMessage("Item listed for sale");
          setLoading(false);
          loadDetail()
        }
      }
      if (detail.listing.seller != "") {
        const txUpdate = await marketplace.relistAsset(
          walletAddress,
          detail.unit,
          detail.listing?.price,
          parseInt(listPrice) * 1000000
        );
        let _updateListing = {
          ...detail,
          listing: {
            ...detail.listing,
            price: parseInt(listPrice) * 1000000,
          },
        };
        delete _updateListing["_id"];
        const res = await updateListing(_updateListing);
        if (res && txUpdate) {
          setToastType("success");
          setToastMessage("Listing updated");
          setLoading(false);
          loadDetail()
        }
      }
    } catch (error) {
      console.error(error);
      setToastType("danger");
      setToastMessage("Problem listing item, try again later");
      setLoading(false);
    }
  }

  async function cancel() {
    if (detail == undefined) return;
    setLoading(true);
    setToastMessage(undefined);
    try {
      const marketplace = getMarketplace(wallet);
      const address = (await wallet.getUsedAddresses())[0];
      await marketplace.delistAsset(
        address,
        detail.unit,
        detail.listing?.price
      )
      const res = await deleteListing(detail.unit);
      if (res) {
        setToastType("success");
        setToastMessage("Listing cancelled");
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      setToastType("danger");
      setToastMessage("Problem listing item, try again later");
      setLoading(false);
    }
  }

  return (
    <div>
      {toastMessage && toastType && (
        <Toast
          show={true}
          type={toastType}>
          <p>{toastMessage}</p>
        </Toast>
      )}

      {loadingDetail ? (
        <div className="flex flex-row justify-center items-center py-24">
          <ArrowPathIcon className="w-48 h-48 text-gray-500 dark:text-gray-400 animate-spin" />
        </div>
      ) : (
        <div className="container px-5 py-24 mx-auto flex flex-wrap">
          <div className="lg:w-1/3 w-full mb-10 lg:mb-0 overflow-hidden">
            <AssetImage
              image={detail.metadata.image}
              className="object-center w-full rounded-xl" />
          </div>
          <div className="flex flex-col flex-wrap mb-10 lg:w-2/3 lg:pl-12 text-left">
            <div className="flex flex-col mb-5 items-start">
              <div className="flex-grow">
                <h1 className="text-gray-900 text-4xl title-font font-bold mb-3">{detail.metadata?.name}</h1>
                <p className="leading-relaxed text-base">
                  <b>Description :</b>
                  <br />{detail.metadata.description}</p>
              </div>
            </div>
            {isOwnNFT ?
              <>
                {walletAddress == "" && detail.listing.seller == "" ? null :
                  <>
                    <div className="flex flex-col mb-10 items-start">
                      <div className="w-12 h-12 inline-flex items-center justify-center rounded-full bg-indigo-100 text-indigo-500 mb-3">
                        <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} className="w-6 h-6" viewBox="0 0 24 24">
                          <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                          <circle cx={12} cy={7} r={4} />
                        </svg>
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-gray-900 text-lg title-font font-bold mb-1">Owned by :</h2>
                        <Link href="#">
                          <div className="bg-blue-400 text-white py-1 px-2 rounded-md">
                            <p className="inline-flex items-center w-32 overflow-hidden truncate text-sm">{detail.listing.seller != "" ? detail.owner : walletAddress}</p>
                          </div>
                        </Link>
                      </div>
                      <div className="flex-grow">
                        <h2 className="text-gray-900 text-lg title-font font-bold mb-1 mt-5">Price :</h2>
                        {detail.owner == walletAddress ? null : <p className="text-green-600 font-bold text-3xl">₳ {listPrice}</p>}
                        {detail.owner == walletAddress && (
                          <>
                            {connected ?
                              <div className="relative">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                  ₳
                                </div>
                                <input
                                  className="block w-full rounded-md border-0 p-4 pl-10 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  placeholder="Listing price"
                                  onChange={(e) =>
                                    updateListPrice(e.target.value)
                                  }
                                  value={listPrice}
                                  type="number"
                                />
                                <TransactionButton
                                  connected={connected}
                                  loading={loading}
                                  onClick={() => list()}
                                  label={
                                    detail.listing.seller == ""
                                      ? "Sell"
                                      : "Update"
                                  }
                                />
                              </div>
                              : null}
                          </>
                        )}
                      </div>
                    </div>
                    <div className="flex flex-col">
                      {detail.owner != walletAddress && detail.listing.seller != "" ? (
                        <button
                          className={`rounded-md border border-transparent py-3 px-8 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-400`}
                          onClick={() => purchase()}
                          disabled={!connected || loading}
                        >
                          {loading
                            ? "loading..."
                            : connected
                              ? "Purchase NFT"
                              : "Connect wallet to purchase"}
                        </button>
                      ) : null}
                      {detail.owner == walletAddress && detail.listing.seller != "" ? (
                        <button
                          className={`items-center justify-center rounded-md border border-transparent py-3 px-8 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400`}
                          onClick={() => cancel()}
                          disabled={!connected || loading}
                        >
                          {loading
                            ? "loading..."
                            : connected
                              ? "Cancel listing"
                              : "Connect wallet to cancel listing"}
                        </button>
                      ) : null}
                    </div>
                  </>
                }
              </>
              :
              <button
                className={`items-center justify-center rounded-md border border-transparent py-3 px-8 text-base font-medium text-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 bg-red-600 hover:bg-red-700 disabled:bg-gray-400`}
                disabled
              >
                Not Listed NFT
              </button>
            }
          </div>
        </div>
      )}
    </div>
  );
}

function TransactionButton({ connected, loading, onClick, label }) {
  return (
    <button
      className={`text-white absolute right-2.5 bottom-2.5 bg-indigo-600 hover:bg-indigo-700 font-medium rounded-lg text-sm px-4 py-2 dark:bg-indigo-600 dark:hover:bg-indigo-700`}
      onClick={onClick}
      disabled={!connected || loading}
    >
      {loading ? "loading..." : label}
    </button>
  );
}

function checkOwnNFT(unitToCheck, data): boolean {
  for (const item of data) {
    if (item.unit === unitToCheck) {
      return true;
    }
  }
  return false;
}
