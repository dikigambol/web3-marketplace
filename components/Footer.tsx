import Link from "next/link";

export default function Footer() {
  return (
    <footer className="p-4 bg-white sm:p-6 dark:bg-gray-800">
      <hr />
      <br />
      <div className="mx-auto max-w-screen-xl">
        <div className="md:flex md:justify-between">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center">
              <img
                src="https://developers.cardano.org/img/cardano-black.svg"
                className="mr-3 h-8"
                alt="Logo"
              />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                ADAGINI
              </span>
            </Link>
          </div>
          <div className="grid grid-cols-1 gap-8 text-gray-900 dark:text-white">
            <div>
              <p>NFT Marketplace build for Arts, Fans and empowering communities. Copyright &copy; 2023 ADAGINI Team. Supported by MESH</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
