import React, {useState} from 'react';
import { Form } from 'react-bootstrap';

const NftForm = () => {
    

const [nftMetadata, setNftMetadata] = useState({name: "first nft", description: "this is our first nft"})

const handleIdChange = (e) => {
    setNftMetadata({...nftMetadata, name: e.target.id})
}  
const handleNameChange = (e) => {
    setNftMetadata({...nftMetadata, description: e.target.text})
}

 return (
                <div id="form-content">
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
                </div>
            );
        
        
}
export default NftForm;





