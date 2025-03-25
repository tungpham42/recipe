import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError(t("Passwords do not match."));
      return;
    }
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (err) {
      setError(t("Failed to register. Try again."));
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Helmet>
        <title>
          {t("Register")} - {t("Recipe App")}
        </title>
        <meta
          property="og:title"
          content={t("Register") + " - " + t("Recipe App")}
        />
        <meta
          property="og:description"
          content={t("Create an account to share your recipes!")}
        />
      </Helmet>
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4">
        <h2 className="text-center">{t("Register")}</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleRegister}>
          <Form.Group className="mb-3">
            <Form.Label>
              <FontAwesomeIcon icon={faEnvelope} className="me-1" />
              {t("Email")}
            </Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder={t("Enter your email")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <FontAwesomeIcon icon={faLock} className="me-1" />
              {t("Password")}
            </Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder={t("Enter your password")}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <FontAwesomeIcon icon={faLock} className="me-1" />
              {t("Repeat Password")}
            </Form.Label>
            <Form.Control
              type="password"
              value={repeatPassword}
              onChange={(e) => setRepeatPassword(e.target.value)}
              required
              placeholder={t("Repeat your password")}
            />
          </Form.Group>
          <Button type="submit" variant="primary" className="w-100">
            <FontAwesomeIcon icon={faUserPlus} className="me-1" />
            {t("Register")}
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Register;
