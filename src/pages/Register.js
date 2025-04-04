import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import {
  auth,
  googleProvider,
  createUserDocument,
  updateUsernameInComments,
} from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
  updateProfile,
} from "firebase/auth";
import { Form, Button, Alert, Card } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUserPlus,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import { faGoogle } from "@fortawesome/free-brands-svg-icons";

const Register = () => {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  useEffect(() => {
    setError(""); // Reset error to empty string on language change
  }, [t]);

  const handleEmailRegister = async (e) => {
    e.preventDefault();
    if (password !== repeatPassword) {
      setError(t("Passwords do not match."));
      return;
    }
    if (username.length > 20) {
      setError(t("Username must be 20 characters or less."));
      return;
    }
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = userCredential.user;

      // Update profile and create user document
      await updateProfile(user, { displayName: username });
      await createUserDocument(user, { username, authProvider: "email" });

      // Update username in comments (though typically no comments exist yet for new users)
      await updateUsernameInComments(user.uid, username);

      navigate("/");
    } catch (err) {
      setError(t("Failed to register. Try again."));
    }
  };

  const handleGoogleRegister = async () => {
    try {
      const userCredential = await signInWithPopup(auth, googleProvider);
      const user = userCredential.user;

      // Create user document for Google auth
      await createUserDocument(user, { authProvider: "google" });

      // Update username in comments using displayName from Google
      await updateUsernameInComments(user.uid, user.displayName);

      navigate("/");
    } catch (err) {
      setError(t("Failed to register with Google. Try again."));
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
        <Form onSubmit={handleEmailRegister}>
          <Form.Group className="mb-3">
            <Form.Label>
              <FontAwesomeIcon icon={faUser} className="me-1" />
              {t("Username")}
            </Form.Label>
            <Form.Control
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              placeholder={t("Enter your username")}
              maxLength="20"
            />
          </Form.Group>
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
          <Button type="submit" variant="primary" className="w-100 mb-2">
            <FontAwesomeIcon icon={faUserPlus} className="me-1" />
            {t("Register")}
          </Button>
        </Form>
        <Button
          variant="primary" // Change to filled primary button
          className="w-100 mt-2 btn-google"
          onClick={handleGoogleRegister}
        >
          <FontAwesomeIcon icon={faGoogle} className="me-1" />
          {t("Register with Google")}
        </Button>
      </Card>
    </div>
  );
};

export default Register;
