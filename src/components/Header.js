import React from "react";
import { Navbar, Nav, Container, Form, NavDropdown } from "react-bootstrap";
import { NavLink } from "react-router-dom";
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
  faBowlFood,
  faBook, // Added for Instructions
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
        <Navbar.Brand as={NavLink} to="/">
          <FontAwesomeIcon icon={faBowlFood} className="me-2" />{" "}
          {t("Recipe Sharing")}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {/* Left-side navigation */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="/" end>
              <FontAwesomeIcon icon={faHome} className="me-1" />
              {t("Home")}
            </Nav.Link>
            <Nav.Link as={NavLink} to="/huong-dan">
              <FontAwesomeIcon icon={faBook} className="me-1" />
              {t("Instructions")}
            </Nav.Link>
          </Nav>
          {/* Right-side navigation */}
          <Nav className="align-items-left justify-content-between gap-2">
            {currentUser ? (
              <NavDropdown
                title={
                  <>
                    <FontAwesomeIcon icon={faUser} className="me-1" />{" "}
                    {currentUser.displayName ?? currentUser.email}
                  </>
                }
                id="user-dropdown"
                align="end"
              >
                <NavDropdown.Item as={NavLink} to="/ho-so">
                  <FontAwesomeIcon icon={faUser} className="me-1" />
                  {t("Profile")}
                </NavDropdown.Item>
                <NavDropdown.Item as={NavLink} to="/them-cong-thuc">
                  <FontAwesomeIcon icon={faPlus} className="me-1" />
                  {t("Add Recipe")}
                </NavDropdown.Item>
                {isAdmin && (
                  <NavDropdown.Item as={NavLink} to="/admin">
                    <FontAwesomeIcon icon={faTools} className="me-1" />
                    {t("Admin")}
                  </NavDropdown.Item>
                )}
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-1" />
                  {t("Logout")}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/dang-nhap">
                  <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
                  {t("Login")}
                </Nav.Link>
                <Nav.Link as={NavLink} to="/dang-ky">
                  <FontAwesomeIcon icon={faUserPlus} className="me-1" />
                  {t("Register")}
                </Nav.Link>
              </>
            )}
            {/* Language Switcher */}
            <div className="d-flex align-items-center">
              <Form.Select
                className="language-switcher"
                style={{ width: "120px" }}
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
              >
                <option value="vi">Tiếng Việt</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
                <option value="pt">Português</option>
                <option value="de">Deutsch</option>
                <option value="it">Italiano</option>
                <option value="ru">Русский</option>
                <option value="ja">日本語</option>
                <option value="ko">한국어</option>
                <option value="zh">中文</option>
              </Form.Select>
            </div>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
