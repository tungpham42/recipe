import React from "react";
import { Navbar, Nav, Button, Container, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
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
  const { t, language, setLanguage } = useLanguage();

  const handleLogout = () => {
    signOut(auth);
  };

  const isAdmin = currentUser && currentUser.email === "tung.42@gmail.com";

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} to="/">
          <FontAwesomeIcon icon={faUtensils} className="me-2" />{" "}
          {t("Recipe Sharing")}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              <FontAwesomeIcon icon={faHome} className="me-1" />
              {t("Home")}
            </Nav.Link>
            {currentUser && (
              <Nav.Link as={Link} to="/them-cong-thuc">
                <FontAwesomeIcon icon={faPlus} className="me-1" />
                {t("Add Recipe")}
              </Nav.Link>
            )}
            {currentUser && (
              <Nav.Link as={Link} to="/ho-so">
                <FontAwesomeIcon icon={faUser} className="me-1" />
                {t("Profile")}
              </Nav.Link>
            )}
            {isAdmin && (
              <Nav.Link as={Link} to="/admin">
                <FontAwesomeIcon icon={faTools} className="me-1" />
                {t("Admin")}
              </Nav.Link>
            )}
          </Nav>
          <Nav className="align-items-left justify-content-between gap-2">
            {currentUser ? (
              <Button variant="outline-light" onClick={handleLogout}>
                <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                {t("Logout")}
              </Button>
            ) : (
              <>
                <Nav.Link as={Link} to="/dang-nhap">
                  <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
                  {t("Login")}
                </Nav.Link>
                <Nav.Link as={Link} to="/dang-ky">
                  <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                  {t("Register")}
                </Nav.Link>
              </>
            )}
            {/* Language Switcher */}
            <div className="d-flex align-items-left">
              <Form.Select
                className="language-switcher"
                style={{ width: "120px" }}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
              </Form.Select>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
