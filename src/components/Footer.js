import { faGithub } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Container } from "react-bootstrap";
import { useLanguage } from "../context/LanguageContext"; // Import the useLanguage hook

const Footer = () => {
  const { t } = useLanguage(); // Access the translate function from context
  const currentYear = new Date().getFullYear();

  return (
    <footer className="text-dark pb-1 mt-4">
      <Container>
        <p className="text-center">
          &copy; {currentYear}{" "}
          <a
            className="text-dark font-weight-bold text-decoration-none"
            href="https://tungpham42.github.io"
            target="_blank"
            rel="noreferrer"
          >
            Phạm Tùng
          </a>
          {", "}
          <a
            href="https://github.com/tungpham42/recipe"
            target="_blank"
            rel="noopener noreferrer"
            className="text-dark text-decoration-none"
          >
            <FontAwesomeIcon icon={faGithub} className="me-1" />
            MIT License
          </a>
          {" | "}
          <a href="/privacy-policy" className="text-dark text-decoration-none">
            {t("Privacy Policy")} {/* Translate Privacy Policy */}
          </a>
        </p>
      </Container>
    </footer>
  );
};

export default Footer;
