import React, { useContext } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import AppConfig from "../config";
import logo from "../logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../App";
import { Button } from "react-bootstrap";
// import ColorSchemeToggle from "./ColorSchemeToggle";

function Header() {
  const navigation = useNavigate();
  const { user, setUser } = useContext(UserContext);

  const handleSignOut = () => {
    // Remove user from local storage to log user out.
    if (user.identityProvider === "Facebook") {
      window.FB.getLoginStatus(function (response) {
        if (response.status === "connected") {
          window.FB.logout();
        }
      });
    }

    setUser(null);
    localStorage.removeItem("user");
    navigation("/");
  };

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">
            <img
              alt=""
              src={logo}
              width="30"
              height="30"
              className="d-inline-block align-top"
            />
            {" " + AppConfig.appTitle}
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <NavDropdown title="Menu" id="basic-nav-dropdown">
                <NavDropdown.Item href="/my-links">My Links</NavDropdown.Item>
                <NavDropdown.Item href="/my-thumbnails-data">
                  My Thumbnails
                </NavDropdown.Item>
                <NavDropdown.Item href="/find-github-user">
                  Find GitHub User
                </NavDropdown.Item>
                <NavDropdown.Item href="/my-github-data">
                  My Github Data
                </NavDropdown.Item>
                <NavDropdown.Item href="/my-facebook-data">
                  My Facebook Data
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="/about">About</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Container>
              <Row className="justify-content-end">
                {!user ? (
                  <Col
                    md={3}
                    className="d-flex justify-content-md-center justify-content-sm-start"
                  >
                    <Link className="btn btn-success me-2" to="sign-in">
                      Sign in
                    </Link>
                    <Link className="btn btn-secondary" to="sign-up">
                      Sign up
                    </Link>
                  </Col>
                ) : (
                  <Col
                    md={3}
                    className="d-flex justify-content-md-center justify-content-sm-start"
                  >
                    <Button variant="warning" onClick={handleSignOut}>
                      Sign out
                    </Button>
                  </Col>
                )}
              </Row>
            </Container>
            {/* <ColorSchemeToggle /> */}
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
