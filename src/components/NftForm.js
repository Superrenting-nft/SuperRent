import React from 'react';
import { Form } from 'react-bootstrap';

const NftForm = () => {
    return (
        <div id="form-content">
            <Form>
                <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>NFT Id :</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Number Id" />                            
                    </Form.Group>
                            <br />
                            <Form.Group controlId="exampleForm.ControlInput1">
                    <Form.Label>NFT Name :</Form.Label>
                    <Form.Control size="sm" type="text" placeholder="Small text" />                            
                    </Form.Group>
                            <br />
                            <Form.Group controlId="exampleForm.ControlSelect1">
                            <Form.Label>Select an Renting Price Ξ :</Form.Label>
                            <Form.Control as="select">
                                <option>0.5</option>
                                <option>1.0</option>
                                <option>1.5</option>
                                <option>2.0</option>
                                <option>2.5</option>
                            </Form.Control>
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