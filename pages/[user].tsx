import { useWallet } from "@meshsdk/react";
import { useEffect, useState } from "react";
import { KoiosProvider } from "@meshsdk/core";
import AssetImage from "@/components/AssetImage";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import { Item } from "@/type/item";
import { getAddress, getListingsUser, getProfile } from "@/lib/axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { Profile } from "@/type/profile";

const blockchainProvider = new KoiosProvider(process.env.NEXT_PUBLIC_NETWORK!);

export default function Collection() {
    const router = useRouter()
    const [assets, setAssets] = useState<Item[]>([]);
    const [loading, setLoading] = useState(true);
    const { connected, wallet } = useWallet();
    const [profile, setProfile] = useState<Profile[] | any>([]);
    const [address, setAddress] = useState<string | any>(undefined)
    const [match, setMatch] = useState<boolean | any>(undefined)

    useEffect(() => {
        if (router.query.user == undefined) return
        const verifyingUser = async () => {
            const res = await getAddress(router.query.user)
            if (!res.notfound) {
                setAddress(res.address)
            } else {
                setAddress(router.query.user)
            }
        }
        verifyingUser()
    }, [router])

    async function getMetadata(assets) {
        let userAssetsMetadata = {};
        for (let i in assets) {
            const asset = assets[i];
            try {
                const metadata = await blockchainProvider.fetchAssetMetadata(
                    asset.unit
                );
                userAssetsMetadata[asset.unit] = metadata;
            } catch (error) { }
        }
        return userAssetsMetadata;
    }

    async function getUserListings(address) {
        const _userListings = await getListingsUser(address);
        let userListings = {};
        _userListings.map((item, i) => {
            userListings[item.unit] = item;
        });
        return userListings;
    }

    async function load(walletAddress) {
        const assets = await wallet.getAssets();
        const userListings = await getUserListings(walletAddress);
        const userAssetsMetadata = await getMetadata(assets);
        let updatedAssets: Item[] = [];
        for (let i in assets) {
            const asset = assets[i];
            try {
                const metadata = userAssetsMetadata[asset.unit];
                if (metadata == undefined) continue;

                let thisAsset: Item = {
                    unit: asset.unit,
                    metadata: {
                        image: metadata.image,
                        name: metadata.name,
                        description: metadata.description
                    },
                    owner: walletAddress,
                };

                const listedItem = userListings[asset.unit];
                if (listedItem) {
                    thisAsset.listing = listedItem.listing;
                }

                updatedAssets.push(thisAsset);
            } catch (error) { }
        }

        for (let unit in userListings) {
            updatedAssets.push(userListings[unit]);
        }

        setAssets(updatedAssets);

        setLoading(false);
    }

    const getListingAssets = async (address) => {
        const res = await getProfile(router.query.user)
        const res2 = await getListingsUser(address)
        setAssets(res2)
        setProfile(res)
        setLoading(false);
    }

    useEffect(() => {
        if (address == undefined) return
        async function verifyingAddress() {
            const walletAddress = (await wallet.getUsedAddresses())[0];
            if (walletAddress == address) {
                setLoading(true)
                const res = await getProfile(router.query.user)
                await load(address)
                setProfile(res)
                setMatch(true)
            } else {
                setLoading(true)
                getListingAssets(address)
            }
        }
        if (connected) {
            setLoading(true)
            verifyingAddress()
        } else {
            setLoading(true)
            getListingAssets(address)
        }
    }, [address, connected])

    return (
        <>
            {loading ?
                <div className="flex flex-row justify-center items-center py-24">
                    <ArrowPathIcon className="w-48 h-48 text-gray-500 dark:text-gray-400 animate-spin" />
                </div>
                :
                <>
                    <div className="bg-white rounded shadow-xl w-full overflow-hidden">
                        <div className="h-[140px] bg-gradient-to-r from-cyan-200 to-blue-500" />
                        <div className="px-5 py-2 flex flex-col gap-3 pb-6">
                            <div className="h-[90px] shadow-md w-[90px] rounded-full border-4 overflow-hidden -mt-14 border-white">
                                <img className="w-full h-full rounded-full object-center object-cover" src={profile.photo == '' || profile.photo == undefined ? "/no-image.jpg" : profile.photo} />
                            </div>
                            <h3 className="text-xl text-slate-900 relative font-bold leading-6">{profile.name ?? "Not Set Name"}</h3>
                            <p className="text-sm text-gray-600">@{profile.username ?? "notsetusername"}</p>
                            <p className="text-sm text-stone-500 mb-3">{profile.about ?? "- set your profile first, to get profile page"}</p>
                            {match && (
                                <Link href='/myprofile'>
                                    <span className="rounded-md bg-cyan-600 px-3 py-1 text-sm font-medium text-white hover:bg-cyan-700">edit profile</span>
                                </Link>
                            )}
                        </div>
                    </div>

                    <div className="bg-white">
                        <div className="mx-auto max-w-2xl lg:max-w-7xl">
                            <h2 className="text-gray-900 text-lg title-font font-bold mb-1 pt-2">ASSETS</h2>
                            <hr />
                            <br />
                            <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                                {assets
                                    .sort((a, b) => {
                                        if (a.listing && b.listing === undefined) return -1;
                                        if (a.listing === undefined && b.listing) return 1;
                                        return 0;
                                    })
                                    .filter((asset, index, self) => {
                                        const isUnitUnique = self.findIndex((a) => a.unit === asset.unit) === index;
                                        return isUnitUnique;
                                    })
                                    .map((asset, i) => (
                                        <Link
                                            key={i}
                                            href={"/asset/" + asset.unit}
                                        >
                                            <div className="group">
                                                <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                                                    <AssetImage
                                                        image={asset.metadata.image}
                                                        className="h-30 w-full object-cover object-center group-hover:opacity-75"
                                                    />
                                                </div>
                                                <h3 className="mt-4 text-sm text-gray-700 text-center">
                                                    {asset.metadata.name}
                                                </h3>
                                                {asset.listing && (
                                                    <p className="mt-1 text-lg font-medium text-gray-900 text-center">
                                                        ₳ {asset.listing.price / 1000000}
                                                    </p>
                                                )}
                                            </div>
                                        </Link>
                                    ))}
                            </div>
                        </div>
                    </div>
                </>
            }
        </>
    );
}
