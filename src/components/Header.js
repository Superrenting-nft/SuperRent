import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { WalletButton } from "./WalletButton";

const Header = (props) => {
  console.log(props.logoutOfWeb3Modal);
  return (
    <div id="nav-style">
      <Navbar
        bg="light"
        expand="lg"
        style={{ display: "flex", justifyContent: "space-between" }}
      >
        <Navbar.Brand className="link" style={{ color: "white" }}>
          SuperRentingNFT
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
