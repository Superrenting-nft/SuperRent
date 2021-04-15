import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { WalletButton } from "./WalletButton";

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
          <span style={{color:"white"}}>Super</span><span style={{color:"purple"}}>Renting</span>
        </Navbar.Brand>
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto" variant="pills">
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
