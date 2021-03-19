import React from 'react';
import { Nav, Navbar} from 'react-bootstrap';

const Header = () => {
    return (
        <div id="nav-style" >
        <Navbar bg="light" expand="lg">
            <Navbar.Brand  className="link" style={{ color: "white" }}>SuperRentingNFT</Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                {/* <Nav.Link ahref="#home" className="link" style={{ color: "white" }}>Home</Nav.Link> */}

                {/* <Nav.Link ahref="#link" className="link" style={{ color: "white" }}>Rented</Nav.Link> */}
 
          </Nav>
        </Navbar.Collapse>
      </Navbar>
        </div>
        );
}

export default Header;