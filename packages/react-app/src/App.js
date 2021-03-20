import React, { useCallback, useRef } from "react";
import { Contract } from "@ethersproject/contracts";
import { getDefaultProvider } from "@ethersproject/providers";
import { useQuery } from "@apollo/react-hooks";

import { Body, Button, Header, Image, Link } from "./components";
import logo from "./ethereumLogo.png";
import useWeb3Modal from "./hooks/useWeb3Modal";

import { addresses, abis } from "@project/contracts";
import GET_TRANSFERS from "./graphql/subgraph";
import { NFTStorage } from "nft.storage";

import gif from "./assets/example_rent.gif";

const Web3 = require("web3");
const SuperfluidSDK = require("@superfluid-finance/js-sdk");

async function readOnChainData() {
  // Should replace with the end-user wallet, e.g. Metamask
  const defaultProvider = getDefaultProvider();
  // Create an instance of an ethers.js Contract
  // Read more about ethers.js on https://docs.ethers.io/v5/api/contract/contract/
  const ceaErc20 = new Contract(
    addresses.ceaErc20,
    abis.erc20,
    defaultProvider
  );
  // A pre-defined address that owns some CEAERC20 tokens
  const tokenBalance = await ceaErc20.balanceOf(
    "0x3f8CB69d9c0ED01923F11c829BaE4D9a4CB6c82C"
  );
  console.log({ tokenBalance: tokenBalance.toString() });
}

// async function mint() {
//   const defaultProvider = getDefaultProvider();
//   const erc721 = new Contract(addresses.erc721, abis.erc721, defaultProvider);
//   debugger;
// }
//

const getNFTStorageClient = () => {
  console.log(process.env.NFT_STORAGE_API_KEY);
  return new NFTStorage({
    token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8MTI3MDUxNDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjExNTkxNjA1MSwibmFtZSI6ImRlZmF1bHQifQ.kn0H8kEawwLyS0uo_8Nwr-loUu_a-27DxQjdlD41_Hc"
  });
};

function WalletButton({ provider, loadWeb3Modal, logoutOfWeb3Modal }) {
  return (
    <Button
      onClick={() => {
        if (!provider) {
          loadWeb3Modal();
        } else {
          logoutOfWeb3Modal();
        }
      }}
    >
      {!provider ? "Connect Wallet" : "Disconnect Wallet"}
    </Button>
  );
}

const getSuperClient = async provider => {
  const sf = new SuperfluidSDK.Framework({
    ethers: provider,
    tokens: ["fDAI"]
  });
  await sf.initialize();
  return sf;
};

function App() {
  const { loading, error, data } = useQuery(GET_TRANSFERS);
  const [provider, loadWeb3Modal, logoutOfWeb3Modal] = useWeb3Modal();
  const web3 = new Web3(window.ethereum);
  const config = {
    erc721: "0x6Edf7e4Ec007F7714bDE2f8F057b885253c6C126"
  };
  const img = useRef(null);
  let v;
  let r;
  let s;

  const NFTId = 7;

  const mint = useCallback(async () => {
    console.log(abis.erc721);
    console.log(config.erc721);
    const client = getNFTStorageClient();
    console.log(img);
    const resp = await fetch(img.current.src);
    const b = await resp.blob();

    const cid = await client.storeBlob(b);
    console.log(cid);
    const metadata = {
      name: "first nft",
      description: "this is our first nft",
      image: `https://ipfs.io/ipfs/${cid}`
    };
    const metadataCid = await client.storeBlob(
      new Blob([JSON.stringify(metadata)])
    );
    console.log(metadataCid);
    const c = new web3.eth.Contract(abis.erc721.abi, config.erc721);
    const nonceTx = await c.methods
      .getNonceRent()
      .call({ from: window.ethereum.selectedAddress });
    console.log(nonceTx);
    console.log("Nonce above");

    const tx = await c.methods
      .mint(NFTId, metadataCid)
      .send({ from: window.ethereum.selectedAddress });
    console.log(tx);

    // Creating Flow
    let messageToSign =
      config.erc721.toLowerCase() +
      `. Ids: ${NFTId},. price: ` +
      web3.utils.toWei("2") +
      `. nonce: ${nonceTx}`;
    console.log("RENT MESSAGE TO SIGN FROM CLIENT: ", messageToSign);
    console.log(provider);
    var accounts = await web3.eth.getAccounts();
    // let { signature, messageHash, v, r, s } = await web3.eth.personal.sign(
    //   messageToSign,
    //   accounts[0]
    // );
    let r = await web3.eth.personal.sign(
      messageToSign,
      window.ethereum.selectedAddress
    );
    console.log(r);
    console.log(r.signature);
    console.log(r.messageHash);
    console.log(r.v);
    console.log(r.r);
    console.log(r.s);
    console.log(accounts);
  });

  const rentNFT = async () => {
    const superClient = await getSuperClient(provider);
    console.log(superClient);
    console.log("Client");
    const c = new web3.eth.Contract(abis.erc721.abi, config.erc721);
    const nonceTx = await c.methods
      .getNonceRent()
      .call({ from: window.ethereum.selectedAddress });
    console.log(nonceTx);

    const accounts = await web3.eth.getAccounts();
    console.log(NFTId);
    console.log([[NFTId], web3.utils.toWei("1"), nonceTx, v, r, s]);
    const flowTx = await superClient.cfa.createFlow({
      superToken: superClient.tokens.fDAIx,
      sender: window.ethereum.selectedAddress,
      receiver: config.erc721,
      flowRate: "1000000000000000",
      userData: web3.eth.abi.encodeParameters(
        ["uint256[]", "uint256", "uint32", "uint8", "bytes32", "bytes32"],
        [[NFTId], web3.utils.toWei("1"), nonceTx, v, r, s]
      )
    });
    console.log(flowTx);
  };

  React.useEffect(() => {
    if (!loading && !error && data && data.transfers) {
      console.log({ transfers: data.transfers });
    }
  }, [loading, error, data, mint]);

  return (
    <div>
      <Header>
        <WalletButton
          provider={provider}
          loadWeb3Modal={loadWeb3Modal}
          logoutOfWeb3Modal={logoutOfWeb3Modal}
        />
      </Header>
      <Body>
        <Image src={logo} alt="react-logo" />
        <p>
          Edit <code>packages/react-app/src/App.js</code> and save to reload.
        </p>
        {/* Remove the "hidden" prop and open the JavaScript console in the browser to see what this function does */}
        <Button onClick={mint}>Mint NFT</Button>
        <Button onClick={rentNFT}>Rent NFT</Button>
        <Link
          href="https://ethereum.org/developers/#getting-started"
          style={{ marginTop: "8px" }}
        >
          Learn Ethereum
        </Link>
        <Link href="https://reactjs.org">Learn React</Link>
        <Link href="https://thegraph.com/docs/quick-start">
          Learn The Graph
        </Link>
        <img ref={img} src={gif} />
      </Body>
    </div>
  );
}

export default App;
