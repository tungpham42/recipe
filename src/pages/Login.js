import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import { auth, googleProvider, createUserDocument } from "../firebase";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faSignInAlt,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update user document with hashed password and last login
      await createUserDocument(user, {
        authProvider: "email",
        password: password, // Pass plain password to be hashed
      });

      navigate("/");
    } catch (err) {
      setError(t("Invalid email or password: ") + err.message);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Create/update user document (no password for Google auth)
      await createUserDocument(user, {
        authProvider: "google",
      });

      navigate("/");
    } catch (err) {
      setError(t("Failed to login with Google: ") + err.message);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "80vh" }}
    >
      <Helmet>
        <title>
          {t("Login")} - {t("Recipe App")}
        </title>
        <meta
          property="og:title"
          content={t("Login") + " - " + t("Recipe App")}
        />
        <meta
          property="og:description"
          content={t("Log in to access your recipes!")}
        />
      </Helmet>
      <Card style={{ width: "100%", maxWidth: "400px" }} className="p-4">
        <h2 className="text-center">{t("Login")}</h2>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={handleEmailLogin}>
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
          <Button type="submit" variant="primary" className="w-100 mb-2">
            <FontAwesomeIcon icon={faSignInAlt} className="me-1" />
            {t("Login")}
          </Button>
        </Form>
        <Button
          variant="outline-danger"
          className="w-100 mt-2"
          onClick={handleGoogleLogin}
        >
          <FontAwesomeIcon icon={faGoogle} className="me-1" />
          {t("Login with Google")}
        </Button>
      </Card>
    </div>
  );
};

export default Login;
