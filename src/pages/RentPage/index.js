import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import { Pagination } from "react-bootstrap";
import { CONFIG } from "../../constants";
import { abis } from "@project/contracts";
import "./rent_page.css";
const Web3 = require("web3");

// Get Number of items
// Split By 10 for pagination then
// Get items
export const RentPage = () => {
  const [supply, setSupply] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [items, setItems] = useState([]);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const web3 = new Web3(window.ethereum);

  const changePage = (e) => {
    console.log(e.target);
  };

  const buildItemArray = (number) => {
    let items = [];
    const pageSize = 10;
    console.log(supply);
    console.log("Here");
    const pages = Math.ceil(supply / pageSize);
    console.log(pages);
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item
          OnClick={changePage}
          key={number}
          active={number === activePage}
        >
          {number}
        </Pagination.Item>
      );
    }
    return items;
  };

  useEffect(() => {
    const getTotalSupply = async () => {
      const c = new web3.eth.Contract(abis.erc721.abi, CONFIG.erc721);
      const supply = await c.methods
        .totalSupply()
        .call({ from: window.ethereum.selectedAddress });
      console.log(supply);
      console.log("Supply");
      setSupply(supply);
    };

    getTotalSupply();
  }, []); // eslint-disable-line

  useEffect(() => {
    const items = buildItemArray(supply);
    console.log(items);
    console.log("boo");
    setItems(items);
  }, [supply]); // eslint-disable-line

  return (
    <div className="main-container">
      <Header
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <Pagination>{items.map((item, _) => item)}</Pagination>
    </div>
  );
};
