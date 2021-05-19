import React, { Component }from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { WalletButton } from '../WalletButton'
import { Link } from 'react-router'

import { findByLabelText } from '@testing-library/dom';
import styled from 'styled-components'
import { GradientButton } from '../global-styles/button-style.jsx'

const Header = (props) => {
  console.log(props.logoutOfWeb3Modal);
  
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



  return (
    <div id="nav-style">
      <Navbar
        bg="dark"
        expand="lg"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Navbar.Brand className="link" >
          <span style={{color:"white"}}>SuperRenting</span><span style={{color:"purple"}}>.</span>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" variant="pills">
          {/* <Link to="LandingPage">Landing Page</Link> */}
            <WalletButton
              provider={props.provider}
              loadWeb3Modal={props.loadWeb3Modal}
              logoutOfWeb3Modal={props.logoutOfWeb3Modal}
            />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
};

export default Header;
