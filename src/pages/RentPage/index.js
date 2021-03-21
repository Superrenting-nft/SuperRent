import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import useWeb3Modal from "../../hooks/useWeb3Modal";
import { Pagination } from "react-bootstrap";
import { CONFIG } from "../../constants";
import { abis } from "@project/contracts";
import { useHistory, useLocation } from "react-router-dom";
import "./rent_page.css";
import { NftCard } from "../../components/NftCard";
const Web3 = require("web3");

function useQuery() {
  const location = useLocation();
  return new URLSearchParams(location.search);
}

// Get Number of items
// Split By 10 for pagination then
// Get items
export const RentPage = () => {
  const [supply, setSupply] = useState(0);
  const [activePage, setActivePage] = useState(1);
  const [numNfts, setNumNfts] = useState([]);
  const [items, setItems] = useState([]);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const web3 = new Web3(window.ethereum);
  const history = useHistory();
  let query = useQuery();

  const changePage = (e) => {
    console.log(e.target);
    history.push(`/rent?page=${e.target.text}`);
  };

  const buildNftArray = (nfts, page) => {
    let items = [];
    console.log(page);
    console.log(nfts);
    const start = (page - 1) * 10 || 1;
    console.log(start);
    for (let number = start; number <= nfts; number++) {
      items.push(number);
    }
    return items;
  };

  const buildItemArray = () => {
    let items = [];
    const pageSize = 10;
    console.log(supply);
    console.log("Here");
    const pages = Math.ceil(supply / pageSize);
    console.log(pages);
    for (let number = 1; number <= pages; number++) {
      items.push(
        <Pagination.Item
          className="rentPage--pagination"
          onClick={changePage}
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
    console.log(query.get("page"));
    console.log("Quwey");
    if (query.get("page")) {
      setActivePage(query.get("page"));
    }
  }, []); // eslint-disable-line

  // function getRentList() external view returns (RentInfo[] memory) {
  //     return _rentingInfo;
  // }
  //    function getRentInfoByTokenId(uint256 index) external view returns (uint256) {
  //     return _tokenRents[msg.sender][index];
  // }
  // Jorges functions
  //  tokenByIndex(uint256 index) external view returns (uint256); // Token Id
  // function tokenURI(uint256 tokenId) public view override returns (string memory) Get from IPFS

  useEffect(() => {
    const items = buildItemArray(supply);
    console.log(items);
    console.log("boo");
    setItems(items);
  }, [supply, activePage]); // eslint-disable-line

  useEffect(() => {
    const page = query.get("page") || 1;
    const items = buildNftArray(page * 10, page);
    console.log(items);
    console.log("boo");
    setNumNfts(items);
  }, []); // eslint-disable-line

  return (
    <div className="main-container">
      <Header
        provider={provider}
        loadWeb3Modal={loadWeb3Modal}
        logoutOfWeb3Modal={logoutOfWeb3Modal}
      />
      <ul className="rentPage--cardContainer">
        {numNfts.map((it, _) => (
          <NftCard idx={it} />
        ))}
      </ul>
      <Pagination className="rentPage--pagination">
        {items.map((item, _) => item)}
      </Pagination>
    </div>
  );
};
