import React, {useState} from 'react';
import { Form, Button } from 'react-bootstrap';
import { NFTStorage } from "nft.storage";
import { abis } from "@project/contracts";

const Web3 = require("web3");

const NftForm = () => {
    
const getNFTStorageClient = () => {
    console.log(process.env.NFT_STORAGE_API_KEY);
    return new NFTStorage({
          // If this token can be turned into an environment var
          // that would be great
        token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJnaXRodWJ8MTI3MDUxNDYiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTYxNjExNTkxNjA1MSwibmFtZSI6ImRlZmF1bHQifQ.kn0H8kEawwLyS0uo_8Nwr-loUu_a-27DxQjdlD41_Hc",
        });
      };

const web3 = new Web3(window.ethereum);
  const config = {
    erc721: "0x76E195437534620106a2Ef736F8C8491159dC640",
  };
      

const [nftMetadata, setNftMetadata] = useState({name: "first nft", description: "this is our first nft"})

const handleIdChange = (e) => {
    setNftMetadata({...nftMetadata, name: e.target.id})
}  
const handleNameChange = (e) => {
    setNftMetadata({...nftMetadata, description: e.target.text})
}

const mint = async () => {
  const metadata = {
      name: nftMetadata.name,
      description: nftMetadata.description,
      image: `https://ipfs.io/ipfs/QmdJmFhB84vpP8tVb3ybTtHToX2VAkXJRoaQZr2c8h64GH`,
    };
    const metadataCid = await getNFTStorageClient().storeBlob(
       new Blob([JSON.stringify(metadata)])
    );
    // console.log(metadataCid);
    const c = new web3.eth.Contract(abis.erc721.abi, config.erc721);

    const tx = await c.methods
      .mint(nftMetadata.id, metadataCid)
       .send({ from: window.ethereum.selectedAddress });
    console.log(tx);
  };

 return (
                <div className="form-content">
                    <Form>
                        <Form.Group controlId="exampleForm.ControlInput1">
                            <Form.Label>NFT Id :</Form.Label>
                            <Form.Control onChange={handleIdChange} size="sm" type="id" placeholder="Number Id" />                            
                            </Form.Group>
                                    <br />
                                    <Form.Group onChange={handleNameChange} controlId="exampleForm.ControlInput2">
                            <Form.Label>NFT Name :</Form.Label>
                            <Form.Control size="sm" type="text" placeholder="Small text" />                            
                            </Form.Group>
                                    <br />
                                    <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Discribe Your NFT </Form.Label>
                                <br />
                            <Form.Control as="textarea" rows={4} />
                        </Form.Group>
                    </Form>
                    <Button class="buttons" variant="info" type="submit" onClick={mint}>Mint</Button>
                    <br />
                    <Button class="buttons" variant="secondary"> List For Sale </Button>
                    <br />
                    <Button class="buttons" variant="success">Renting</Button>
                    <br />
                    <Button class="buttons" variant="warning">Getting Back</Button>
                    <br />

                </div>
            );
        
        
}
export default NftForm;






