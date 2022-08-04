import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import idl from "../idl.json";
import { ConfirmOptions, Keypair, PublicKey, Transaction, SystemProgram, Connection, clusterApiUrl } from "@solana/web3.js";
import { MintLayout, TOKEN_PROGRAM_ID, Token } from "@solana/spl-token";
import { useEffect, useState } from "react";
import { CanvasSdkClient } from "../../sdk/src/index";
import WalletButton from "../components/WalletButton/WalletButton";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { AnchorProvider, Idl, Program, Wallet } from '@project-serum/anchor';
import { createCreateMetadataAccountV2Instruction, PROGRAM_ID as TOKEN_METADATA_PROGRAM_ID } from "@metaplex-foundation/mpl-token-metadata";
import axios from "axios";
import Link from "next/link";

interface ICanvasData {
  name: string | undefined;
  slots?: [object];
}

const Home: NextPage = () => {
  const wallet = useWallet();
  const { connection } = useConnection();
  const programId = new PublicKey(idl.metadata.address);
  const provider = new AnchorProvider(
    connection, wallet as unknown as Wallet, { preflightCommitment: "processed" } as ConfirmOptions,
  );
  const program = new Program(idl as Idl, programId, provider);

  const [canvasModelName, setCanvasModelName] = useState("");
  const [collectionNFTAddress, setCollectionNFTAddress] = useState("");
  const [canvasIds, setCanvasIds] = useState<String[]>([]);

  useEffect(() => {
    const getCanvasIds = async (): Promise<String[]> => {
      if (!wallet.publicKey) { return [""]; }

      const canvasModels = await program.account.canvasModel.all([
        {
          memcmp: {
            offset: 8,
            bytes: wallet.publicKey!.toBase58()
          }
        }
      ])

      console.log("test")
      console.log(canvasModels);

      return [""];
    };
    getCanvasIds().then(ids => setCanvasIds(ids));
  }, [wallet?.publicKey]);

  const createCanvas = async (e: any) => {
    if (!wallet) {
      return false;
    }
    const response = await axios({
      method: "post",
      url: "/api/canvas",
      data: {
        canvasModelName,
      },
    });
  };

  return (
    <div className={styles.container}>
      <Head>
        <title>NFTCanvas</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <header>
        <WalletButton />
      </header>
      <main className={styles.main}>
        <h1 className={styles.title}>Welcome to NFT Canvas UI</h1>

        <p className={styles.description}>
          <code className={styles.code}>Composable NFT&apos;s</code> for
          everyone 🤝
        </p>

        <div className={styles.grid}>
          <Link href="/canvas-models" >
            <a className={styles.card}>
              <h2>Canvas Models</h2>
              <p>Generate a new canvas model & slots</p>
            </a>
          </Link>
        </div>


        <div className={styles.grid}>
          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Placeholder &rarr;</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Placeholder &rarr;</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
          </a>

          <a href="https://nextjs.org/docs" className={styles.card}>
            <h2>Placeholder &rarr;</h2>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod.
            </p>
          </a>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="http://www.nftcanvas.dev"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by <span className={styles.logo}>NFTCanvas</span>
        </a>
      </footer>
    </div>
  );
};

export default Home;
