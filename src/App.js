import React, { useRef } from "react";
import "./App.css";
import Header from "./components/Header";
import NftForm from "./components/NftForm";
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
      <div className="content">
        <Dropzone />
        <NftForm />
      </div>
    </div>
  );
}

export default App;
