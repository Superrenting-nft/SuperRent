import React, { useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import NftForm from "./components/NftForm";
import PutForRentForm from "./components/PutForRentForm";
import RentNft from "./components/RentNft";
import ReturnNft from "./components/ReturnNft";
import Dropzone from "./dropzone/Dropzone";
import useWeb3Modal from "./hooks/useWeb3Modal";

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
      
        <Dropzone />
        <NftForm />
        <PutForRentForm />
        <RentNft provider={provider} />
        <ReturnNft provider={provider} />
      
    </div>
  );
}

export default App;
