import Link from "next/link";
import Image from "next/image";
import { FC } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";

import { SolanaLogo } from "components";
import styles from "./index.module.css";

export const HomeView: FC = ({}) => {
  const { publicKey } = useWallet();

  const onClick = () => {};

  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        <div className="navbar mb-2 shadow-lg text-neutral-content rounded-box bg-black">
          <div className="flex-none">
            <button className="btn btn-square btn-ghost">
              <Image
                src="/logo.png"
                alt="Landscape picture"
                width={64}
                height={64}
              />
            </button>
          </div>
          <div className="flex-1 px-2 mx-2">
            <span className="text-lg font-bold">Solario</span>
          </div>
          <div className="flex flex-row">
            
              <div className="p-3 rounded-box hover:bg-gray-900"><a href="https://devnet.solarare.com/2z6xE1bu2fN6vozeg9G1HuTuzmRkHRZWrKB9KWiXMKqA" rel="noreferrer">Mint</a></div>
            
            <div className="p-3 rounded-box hover:bg-gray-900"><Link href="/gallery"><a>View NFTs</a></Link></div>
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>

        <div className="text-center pt-2">
          <div className="hero min-h-16 py-4">
            <div className="text-center hero-content">
              <div className="max-w-lg">
              <h1 className="mb-5 text-5xl font-bold">
              {publicKey? <>Hello {publicKey?.toBase58().slice(0,10)}...</>:null}
              </h1>
                <h1 className="mb-10 text-6xl font-bold">
                   Welcome to <span className="bg-gradient-to-b from-yellow-300 to-red-600 text-transparent bg-clip-text">Solario</span> on the <SolanaLogo /> Blockchain!
                </h1>
                <p className="mb-5 text-3xl">
                Solario is a project at the intersection web3 x renewable energy.</p>
                <p className="mb-5 text-3xl">
We create utiltity NFTs that loan us the capital needed to fund solar farms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
