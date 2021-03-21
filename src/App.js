import React, { useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import NftForm from "./components/NftForm";
import PutForRentForm from "./components/PutForRentForm";
import RentNft from "./components/RentNft";
import ReturnNft from "./components/ReturnNft";
import Dropzone from "./dropzone/Dropzone";
import useWeb3Modal from "./hooks/useWeb3Modal";
import { CONFIG } from "./constants";

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  console.log("Here");
  console.log(provider);
  console.log(loadWeb3Modal);
  console.log(logoutOfWeb3Modal);

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
        <h1>Mint NFT</h1>
        <NftForm />
        <h1>Put NFT for rent</h1>
        <PutForRentForm />
        <h1>Rent an NFT</h1>
        <RentNft provider={provider} />
        <h1>Return NFT</h1>
        <ReturnNft provider={provider} />
      </div>
    </div>
  );
}

export default App;
