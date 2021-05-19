import React, { useRef } from "react";
import "./App.css";
import Header from "./components/header/Header";

import NftForm from "./components/NftForm";
import PutForRentForm from "./components/PutForRentForm";
import RentNft from "./components/RentNft";

import ReturnNft from "./components/ReturnNft";
import Dropzone from "./dropzone/Dropzone";
import useWeb3Modal from "./hooks/useWeb3Modal";

import styled from 'styled-components'
import MarketPlaceIndex from './components/marketplace/MarketPlaceIndex'
import Footer from './components/footer/Footer'

import {GlobalStyleComponent} from './components/global-styles/global-fe-style'
import HomePage from './components/main/HomePage'


import { BrowserRouter as Router, NavLink, Switch, Route } from 'react-router-dom'

function App() {
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  console.log("Here");
  console.log(provider);
  console.log(loadWeb3Modal);
  console.log(logoutOfWeb3Modal);

  return (
    <Router>
    <GlobalStyleComponent>
      <div className="main-container">
        <Header
          provider={provider}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
        />
        <div class="form-container">
          <Dropzone />
          <NftForm />
          <PutForRentForm />
          <RentNft provider={provider} />
          <ReturnNft provider={provider} />
        </div>
        <Footer />
      </div>
      <HomePage />
      <Footer />
      </GlobalStyleComponent>
    </Router>
  );
}

export default App;
