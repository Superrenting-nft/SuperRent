import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CONFIG } from "../constants";
import { abis } from "@project/contracts";
import "./nft_card.css";
const Web3 = require("web3");

export const NftCard = ({ idx }) => {
  const [nft, setNft] = useState({});
  const web3 = new Web3(window.ethereum);
  useEffect(() => {
    const getTokenByIndex = async () => {
      const c = new web3.eth.Contract(abis.erc721.abi, CONFIG.erc721);
      const token = await c.methods
        .tokenByIndex(idx)
        .call({ from: window.ethereum.selectedAddress });
      console.log(token);
      console.log("Token");

      const tokenMetadataUri = await c.methods
        .tokenURI(token)
        .call({ from: window.ethereum.selectedAddress });

      // Get metdata
      const metadata = await fetch(`${tokenMetadataUri}`);
      console.log(metadata);
      const text = await metadata.text();
      console.log(text);
      const parsedData = JSON.parse(text);
      setNft(parsedData);
    };
    getTokenByIndex();
  }, []); // eslint-disable-line

  return (
    <li className="card--layout" data-cy="movie-card">
      <Link
        to={`/profile/${nft.image}`}
        style={{ "text-decoration": "none", color: "inherit" }}
      >
        <div className="card--posterContainer">
          <img className="card--posterImg" src={nft.image} alt={` poster`} />
        </div>
      </Link>
      <div className="card--movieContent">
        <h4 className="card--movieTitle">{nft.name}</h4>
      </div>
    </li>
  );
};
