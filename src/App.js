import React, { useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import NftForm from "./components/NftForm";
import Dropzone from "./dropzone/Dropzone";
import { abis } from "@project/contracts";
import useWeb3Modal from "./hooks/useWeb3Modal";
import { CONFIG } from "./constants";

import { NFTStorage } from "nft.storage";
const Web3 = require("web3");

const getNFTStorageClient = () => {
  console.log(process.env.NFT_STORAGE_API_KEY);
  return new NFTStorage({
    // If this token can be turned into an environment var
    // that would be great
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8MTI3MDUxNDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjExNTkxNjA1MSwibmFtZSI6ImRlZmF1bHQifQ.kn0H8kEawwLyS0uo_8Nwr-loUu_a-27DxQjdlD41_Hc",
  });
};

function App() {
  const web3 = new Web3(window.ethereum);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  console.log("Here");
  console.log(provider);
  console.log(loadWeb3Modal);
  console.log(logoutOfWeb3Modal);

  const mint = async () => {
    // TODO pass form data into mint

    console.log(abis.erc721);
    console.log(CONFIG.erc721);
    const client = getNFTStorageClient();
    // console.log(img);
    // const resp = await fetch(img.current.src);
    // const b = await resp.blob();

    // const cid = await client.storeBlob(b);
    // console.log(cid);
    // const metadata = {
    //   name: "first nft",
    //   description: "this is our first nft",
    //   image: `https://ipfs.io/ipfs/${cid}`,
    // };
    // const metadataCid = await client.storeBlob(
    //   new Blob([JSON.stringify(metadata)])
    // );
    // console.log(metadataCid);
    const c = new web3.eth.Contract(abis.erc721.abi, CONFIG.erc721);
    const nonceTx = await c.methods
      .getNonceRent()
      .call({ from: window.ethereum.selectedAddress });
    console.log(nonceTx);
    console.log("Nonce above");

    // const tx = await c.methods
    //   .mint(NFTId, metadataCid)
    //   .send({ from: window.ethereum.selectedAddress });
    // console.log(tx);
  };

  return (
    <div className="main-container">
      <Header
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <p className="title">Drag and Drop Your NFT Image </p>
      <div className="content">
        <Dropzone />
        <NftForm />
        <button onClick={mint}>Mint</button>
      </div>
    </div>
  );
}

export default App;
