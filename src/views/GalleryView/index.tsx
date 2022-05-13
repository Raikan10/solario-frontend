import Link from "next/link";
import Image from "next/image";
import { FC, useEffect, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useWalletNfts, NftTokenAccount } from "@nfteyez/sol-rayz-react";
import { useConnection } from "@solana/wallet-adapter-react";

import { Loader, SolanaLogo, SelectAndConnectWalletButton } from "components";
import { NftCard } from "./NftCard";
import styles from "./index.module.css";
// const walletPublicKey = "3EqUrFrjgABCWAnqMYjZ36GcktwDtFdkNYwY6C6cDzy";

export const GalleryView: FC = ({}) => {
  const { connection } = useConnection();
  const { wallet, connect, connecting, publicKey } = useWallet();
  
  // const [walletToParsePublicKey, setWalletToParsePublicKey] =
  //   useState<string>(publicKey?.toBase58());

  const { nfts, isLoading, error } = useWalletNfts({
    publicAddress: publicKey?.toBase58(),
    connection,
  });

  

  useEffect(() => {
    if (!publicKey && wallet) {
      try {
        connect();
      } catch (error) {
        console.log("Error connecting to the wallet: ", (error as any).message);
      }
    }
  }, [wallet]);

  console.log("nfts", nfts);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    
  };

  const onUseWalletClick = () => {
    console.log(publicKey?.toString());
  };

  return (
    <div className="container mx-auto max-w-6xl p-8 2xl:px-0">
      <div className={styles.container}>
        
        <div className="navbar mb-2 shadow-lg text-neutral-content rounded-box bg-black">
          <div className="flex-none">
            <Link href="/" passHref><button className="btn btn-square btn-ghost">
              <Image
                src="/logo.png"
                alt="Landscape picture"
                width={64}
                height={64}
              />
            </button></Link>
          </div>
          <div className="flex-1 px-2 mx-2">
            <span className="text-lg font-bold">Solario</span>
          </div>
          <div className="flex flex-row">
            
              <div className="p-3 rounded-box hover:bg-gray-900"><a href="https://devnet.solarare.com/2z6xE1bu2fN6vozeg9G1HuTuzmRkHRZWrKB9KWiXMKqA">Mint</a></div>
            
            <div className="p-3 rounded-box hover:bg-gray-900"><Link href="/gallery"><a>View NFTs</a></Link></div>
            <WalletMultiButton className="btn btn-ghost" />
          </div>
        </div>

        <div className="text-center pt-2">
          <div className="hero min-h-16 p-0 pt-10">
            <div className="text-center hero-content w-full">
              <div className="w-full">
                <h1 className="mb-5 text-5xl font-bold">
                  View your <span className="bg-gradient-to-b from-yellow-300 to-red-600 text-transparent bg-clip-text">Solario</span> NFTs here
                </h1>

                
                <div className="my-10">
                  {error ? (
                    <div>
                      <h1>Error Occures</h1>
                      {(error as any)?.message}
                    </div>
                  ) : null}

                  {!error && isLoading ? (
                    <div>
                      <Loader />
                    </div>
                  ) : (
                    <NftList nfts={nfts} error={error} />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

type NftListProps = {
  nfts: NftTokenAccount[];
  error?: Error;
};

const NftList = ({ nfts, error }: NftListProps) => {
  if (error) {
    return null;
  }

  if (!nfts?.length) {
    return (
      <div className="text-center text-2xl pt-16">
        No NFTs found in this wallet
      </div>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 items-start">
      {nfts?.map((nft) => (
        <NftCard key={nft.mint} details={nft} onSelect={() => {}} />
      ))}
    </div>
  );
};
