// src/pages/NotFound.js
import React from "react";
import { Container, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

const NotFound = () => {
  const { t } = useLanguage();

  return (
    <Container className="my-4 text-center">
      <h2>{t("404 - Page Not Found")}</h2>
      <div className="card mt-4">
        <div className="card-body">
          <p className="card-text">
            {t(
              "Sorry, the page you are looking for does not exist or has been moved."
            )}
          </p>
          <Button as={Link} to="/" variant="primary" className="mt-3">
            <FontAwesomeIcon icon={faHome} className="me-1" />
            {t("Back to Home")}
          </Button>
        </div>
      </div>
    </Container>
  );
};

export default NotFound;
