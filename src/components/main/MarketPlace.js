import React from 'react'
import { Button, Card } from 'react-bootstrap'
import styled from 'styled-components'
import { GradientButton } from '../global-styles/button-style.jsx'


export default function MarketPlace() {


    {/* Not sure if this css is working*/}
    const CardStyle = {
        backgroundColor:'white',
        width:'20%',
        alignContent:'center',
        margin:'10px'
    };

    const MainMarket = styled.div`
            display: flex;
            flex-direction:column;
            width: 85%; 
            background: rgb(131,58,180);
background: linear-gradient(29deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%);
            margin: auto; 
            padding: 20px;
            border-radius: 2em;
        & > h1 { 
            margin: auto;
        }

        & > p { 
            margin-top: 1rem;
        }
    `;

    const InnerMarketContent = styled.div`
        display: flex;
        flex-direction: row;
        width: 85%; 
        margin: auto;
        padding: 30px;
        height: 350px;
        color: black;        
    `;

const CardMarketDiv = styled.div`
    display: flex;
    flex-direction: inline;
    width: 85%;
    height: 80%;
    margin: auto;
    
`;

const CardMarketContent = styled.div`
    width: 18rem; 
    margin: 10px;
    background-color: #fff;
`;

const GradientDiv = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;  
    padding: 20px;
`;

const CardButton = styled.button`
    width: 50px;
    background: #22223b;
    color: white;
    padding: 5px;
    border-radius: 5px;
    
`;
    return (
        <MainMarket>
            <h1>Market Place</h1>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. </p>
            <InnerMarketContent>
                <CardMarketDiv>
                    <CardMarketContent>
                        <Card.Body>
                            <Card.Title>Market Place 1</Card.Title>
                            <Card.Text>
                            Some quick example text to build on the card title and make up the bulk of
                            the card's content.
                            </Card.Text>
                            <CardButton>Rent</CardButton>
                        </Card.Body>
                        </CardMarketContent>
                            <CardMarketContent>
                                <Card.Body>
                                    <Card.Title>Market Place 2</Card.Title>
                                        <Card.Text>
                                            Some quick example text to build on the card title and make up the bulk of
                                            the card's content.
                                        </Card.Text>
                                    <CardButton>Rent</CardButton>
                                </Card.Body>
                            </CardMarketContent>
                        <CardMarketContent>
                            <Card.Body>
                                <Card.Title>Market Place 3</Card.Title>
                                    <Card.Text>
                                        Some quick example text to build on the card title and make up the bulk of
                                        the card's content.
                                    </Card.Text>
                                <CardButton>Rent</CardButton>
                            </Card.Body>
                        </CardMarketContent>
                        <CardMarketContent>
                        <Card.Body>
                            <Card.Title>Market Place 4</Card.Title>
                                <Card.Text>
                                    Some quick example text to build on the card title and make up the bulk of
                                    the card's content.
                                </Card.Text>
                            <CardButton>Rent</CardButton>
                        </Card.Body>
                    </CardMarketContent>
                </CardMarketDiv>
            </InnerMarketContent>
            <GradientDiv>
                <GradientButton>See The Offers</GradientButton>
            </GradientDiv>
        </MainMarket>
    )
}
