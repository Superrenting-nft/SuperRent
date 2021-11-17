import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import { Pagination } from "react-bootstrap";
import { CONFIG } from "../../constants";
import { abis } from "@project/contracts";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { NftCard } from "../../components/NftCard";
import RentNft from "../../components/RentNft";
const Web3 = require("web3");

// Get Number of items
// Split By 10 for pagination then
// Get items
export const ProfilePage = () => {
  const web3 = new Web3(window.ethereum);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const [token, setToken] = useState();
  let { profileIdx } = useParams();

  // get rent list than get info by position
  // Then add rent button
  useEffect(() => {
    const getTokenInfo = async () => {
      const c = new web3.eth.Contract(abis.erc721.abi, CONFIG.erc721);
      const tokenList = await c.methods
        .getRentList()
        .call({ from: window.ethereum.selectedAddress });
      console.log(tokenList);
      console.log("Token");
      const token = tokenList.filter((i, element) => {
        console.log(i);
        console.log(element);
        console.log(i[0]);
        console.log(i[2]);
        console.log(i[2] === profileIdx);
        if (i[2] === profileIdx) {
          return element;
        }
      });
      console.log(token);
      setToken(token);
    };
    getTokenInfo();
  }, []); // eslint-disable-line

  return (
    <div className="main-container">
      <Header
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <h1>Here</h1>
      <RentNft provider={provider} />
    </div>
  );
};
