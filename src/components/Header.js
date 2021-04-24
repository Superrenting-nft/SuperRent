import React, { Component }from 'react'
import { Nav, Navbar } from 'react-bootstrap'
import { WalletButton } from './WalletButton'
import { Link } from 'react-router'

const Header = (props) => {
  console.log(props.logoutOfWeb3Modal);
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
