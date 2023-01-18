import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";

export const NavigationBar = ({ user, onLoggedOut }) => {
  return (
    <Navbar bg="light" expand="lg">
      <Container fluid>
        <Navbar.Brand as={Link} to="/">
          myFlix
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto w-100" as="ul">
            {!user && (
              <>
                <Nav.Item as="li">
                  <Nav.Link as={Link} to={`/login`}>
                    Login
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link as={Link} to={`/signup`}>
                    Signup
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
            {user && (
              <>
                <Nav.Item as="li">
                  <Nav.Link as={Link} to={`/`}>
                    Home
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item as="li">
                  <Nav.Link as={Link} to={`/profile`}>
                    Profile
                  </Nav.Link>
                </Nav.Item>
                <Nav.Item className="ms-auto" as="li">
                  <Nav.Link
                    className="text-primary"
                    as={Link}
                    to={`/login`}
                    onClick={onLoggedOut}
                  >
                    Logout
                  </Nav.Link>
                </Nav.Item>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};
