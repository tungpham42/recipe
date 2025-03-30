import React, { useState } from "react";
import { Helmet } from "react-helmet-async";
import {
  auth,
  googleProvider,
  createUserDocument,
  updateUsernameInComments,
} from "../firebase";
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

      // Update user document with last login
      const userData = await createUserDocument(user, {
        authProvider: "email",
      });

      // Update username in comments using the displayName or username from userData
      await updateUsernameInComments(
        user.uid,
        user.displayName || userData.username
      );

      navigate("/");
    } catch (err) {
      setError(t("Invalid email or password."));
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Create/update user document
      await createUserDocument(user, { authProvider: "google" });

      // Update username in comments using displayName from Google
      await updateUsernameInComments(user.uid, user.displayName);

      navigate("/");
    } catch (err) {
      setError(t("Failed to login with Google. Try again."));
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
          variant="primary" // Change to filled primary button
          className="w-100 mt-2 btn-google"
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
