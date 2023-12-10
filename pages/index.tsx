import AssetImage from "@/components/AssetImage";
import PromoHero from "@/components/PromoHero";
import { getLastListed } from "@/lib/axios";
import { Item } from "@/type/item";
import { ArrowPathIcon } from "@heroicons/react/20/solid";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [listings, setListings] = useState<Item[] | any>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function load() {
      setLoading(true);
      let data = await getLastListed();
      setListings(data); // console.log(data);
      setLoading(false);
    }
    load();
  }, []);

  return (
    <>
      <PromoHero />
      <div className="xl:p-24 p-10">
        <h2 className="text-gray-900 text-lg title-font font-bold mb-1 mt-5">RECENTLY LISTED</h2>
        <hr />
        <br />
        {loading ? (
          <div className="flex flex-row justify-center items-center">
            <ArrowPathIcon className="w-48 h-48 text-gray-500 dark:text-gray-400 animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {listings.map((item, i) => (
              <Link
                key={i}
                href={"/asset/" + item.unit}
              >
                <div className="group">
                  <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
                    <AssetImage
                      image={item.metadata.image}
                      className="h-30 w-full object-cover object-center group-hover:opacity-75"
                    />
                  </div>
                  <Link href="#">
                    <div className="float-left text-purple-700 py-1 rounded-md">
                      <p className="inline-flex w-48 overflow-hidden truncate text-sm">Artist : {item.owner ? item.owner : ""}</p>
                    </div>
                  </Link>
                  <div className="float-right text-black py-1 px-2 rounded-md">
                    <p className="inline-flex w-18 text-right text-sm">{item.listing.quantity ? item.listing.quantity + " x" : "1 x"}</p>
                  </div>
                  <br />
                  <h2 className="mt-4 text-md text-gray-900 font-bold">
                    {item.metadata.name}
                  </h2>
                  {item.listing && (
                    <div className="bg-blue-400 text-white">
                      <p className="mt-1 text-lg font-medium text-center">
                        ₳ {item.listing.price / 1000000}
                      </p>
                    </div>
                  )}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
