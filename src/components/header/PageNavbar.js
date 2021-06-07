import { findByLabelText } from '@testing-library/dom';
import React from 'react'
import styled from 'styled-components'
import { GradientButton } from '../global-styles/button-style.jsx'
import Rent from '../rent/Rent'
import { Link } from "react-router-dom";


export default function PageNavbar() {

    const HeaderContainer = styled.div `
        display: flex;
        flex: row;
        align-content: center;
        justify-content:center;
        height:800px;
        padding: 5rem;
        margin:auto;       
    `;

    const LeftContent = styled.div`
      padding: 9rem;
      height: 80%;
      width: 50%;   
      `;

    const RightContent = styled.div`
        display: flex;
        flex-direction: column;
        padding: 1rem;   
    `;

    const GradientButtonLink = styled(Link)`
    color: white;
background: rgb(255,167,66);
background: linear-gradient(45deg, rgba(255,167,66,1) 0%, rgba(255,45,45,1) 37%, 
rgba(186,48,255,1) 62%, rgba(0,232,212,1) 80%);
border: none;
border-radius: 20px;
font-weight: 500;
margin-top:2rem;
padding: .7rem;

&:hover {
color: purple;
}
`;

    return (
        <HeaderContainer>
            <LeftContent id="showcases">
                <h1 style={{fontWeight:'800'}}> Rent, Play & Return </h1>
                    <div id="content" style={{margin: '5px'}}>
                        <p>What About Renting Your favourite Items  <br />
                        Insted of Spend a lot of Money Buying??<br />     
                        SuperRenting is the platform the makes this happens</p>
                    </div>
                <GradientButtonLink to="/rent" >Start Now</GradientButtonLink>
            </LeftContent>
                <RightContent>
                    <img src="/img/logo.png" alt="SR-logo" />
                </RightContent>
        </HeaderContainer>
    )
}