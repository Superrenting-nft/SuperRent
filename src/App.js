import React from 'react';
import './App.css';
import Header from './components/Header';
import NftForm from './components/NftForm';
import Dropzone from "./dropzone/Dropzone";

function App() {
  return (
    <div class="main-container">
    <Header />
      <p className="title">Drag and Drop Your NFT Image </p>
      <div className="content">
        <Dropzone />
        <NftForm />
      </div>
    </div>
  );
}

export default App;
