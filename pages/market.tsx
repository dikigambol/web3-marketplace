export default function Markets() {
  return (
    <div>
      <div className="text-center p-10">
        <h1 className="font-bold text-4xl mb-4 mt-20">NFT Product on Marketplace </h1>
      </div>
      <section className="w-fit mx-auto grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 justify-items-center justify-center gap-y-20 gap-x-14 mb-10">
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img className="rounded-xl card-nft" src="/1.jpg" />
            <div className="px-4 py-3 w-72">
              <p><span className="text-md font-bold text-cyan-700 truncate block capitalize">Indomie Original</span>
              <span className="text-sm font-semibold text-gray-600 truncate block capitalize">$149 volume</span></p>
            </div>
          </a>
        </div>
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img className="rounded-xl card-nft" src="/2.jpg" />
            <div className="px-4 py-3 w-72">
              <p><span className="text-md font-bold text-cyan-700 truncate block capitalize">Indomie Rebus</span>
              <span className="text-sm font-semibold text-gray-600 truncate block capitalize">$149 volume</span></p>
            </div>
          </a>
        </div>
        <div className="w-72 bg-white shadow-md rounded-xl duration-500 hover:scale-105 hover:shadow-xl">
          <a href="#">
            <img className="rounded-xl card-nft" src="/3.jpg" />
            <div className="px-4 py-3 w-72">
              <p><span className="text-md font-bold text-cyan-700 truncate block capitalize">Indomie Old</span>
              <span className="text-sm font-semibold text-gray-600 truncate block capitalize">$149 volume</span></p>
            </div>
          </a>
        </div>
      </section>
    </div>
  );
}
