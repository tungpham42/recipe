import React from "react";
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faHome,
  faPlus,
  faTools,
  faSignOutAlt,
  faSignInAlt,
  faUserPlus,
  faUtensils,
} from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const { currentUser } = useContext(AuthContext);

  const handleLogout = () => {
    signOut(auth);
  };

  const isAdmin = currentUser && currentUser.email === "tung.42@gmail.com";

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FontAwesomeIcon icon={faUtensils} className="me-2" /> Recipe Sharing
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <FontAwesomeIcon icon={faHome} className="me-1" />
              Home
            </Nav.Link>
            {currentUser && (
              <Nav.Link as={Link} to="/add-recipe">
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                Add Recipe
              </Nav.Link>
            )}
            {currentUser && (
              <Nav.Link as={Link} to="/profile">
                <FontAwesomeIcon icon={faUser} className="me-1" />
                Profile
              </Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">
                <FontAwesomeIcon icon={faTools} className="me-1" />
                Admin
              </Nav.Link>
            )}
          </Nav>
          <Nav>
            {currentUser ? (
              <Button variant="outline-light" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                Logout
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/login">
                  <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/register">
                  <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                  Register
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
