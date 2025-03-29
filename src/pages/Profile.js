import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { db, auth, updateCommentsUsername } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  setDoc,
} from "firebase/firestore";
import {
  updateProfile,
  updatePassword,
  reauthenticateWithCredential,
  EmailAuthProvider,
} from "firebase/auth";
import { Card, Button, Row, Col, Alert, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPencilAlt,
  faUser,
  faLock,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../components/Pagination";

const ITEMS_PER_PAGE = 12;

const Profile = () => {
  const { currentUser, refreshUser } = useContext(AuthContext);
  const { t } = useLanguage();

  // State for recipes and sorting
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(
    () => localStorage.getItem("profileSortOption") || "alphabetAsc"
  );

  // State for account settings
  const [username, setUsername] = useState(currentUser?.displayName || "");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // Persist sort option to localStorage
  useEffect(() => {
    localStorage.setItem("profileSortOption", sortOption);
  }, [sortOption]);

  // Fetch user recipes
  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (!currentUser) return;
      try {
        const q = query(
          collection(db, "recipes"),
          where("userId", "==", currentUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const recipeData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setRecipes(recipeData);
      } catch (err) {
        console.error("Error fetching recipes:", err.message);
      }
    };
    fetchUserRecipes();
  }, [currentUser]);

  // Early return if no user is logged in
  if (!currentUser) {
    return (
      <div>
        <Helmet>
          <title>{`${t("Please log in to view your profile.")} - ${t(
            "Recipe App"
          )}`}</title>
          <meta
            property="og:title"
            content={`${t("Please log in to view your profile.")} - ${t(
              "Recipe App"
            )}`}
          />
        </Helmet>
        {t("Please log in to view your profile.")}
      </div>
    );
  }

  // Check authentication providers
  const isEmailPasswordUser = currentUser.providerData.some(
    (provider) => provider.providerId === "password"
  );
  const isGoogleUser = currentUser.providerData.some(
    (provider) => provider.providerId === "google.com"
  );

  // Sort recipes based on selected option
  const sortRecipes = (recipesToSort) => {
    const sortedRecipes = [...recipesToSort];
    switch (sortOption) {
      case "alphabetAsc":
        return sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
      case "alphabetDesc":
        return sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
      case "dateAsc":
        return sortedRecipes.sort(
          (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
        );
      case "dateDesc":
        return sortedRecipes.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );
      default:
        return sortedRecipes;
    }
  };

  // Pagination logic
  const sortedRecipes = sortRecipes(recipes);
  const indexOfLastRecipe = currentPage * ITEMS_PER_PAGE;
  const indexOfFirstRecipe = indexOfLastRecipe - ITEMS_PER_PAGE;
  const currentRecipes = sortedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  // Handle sort option change
  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  // Update username
  const handleUpdateUsername = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (username.length > 20) {
      setError(t("Username must be 20 characters or less."));
      return;
    }

    try {
      // Update Firebase Auth profile
      await updateProfile(auth.currentUser, { displayName: username });

      // Update users collection
      const userRef = doc(db, "users", currentUser.uid);
      await setDoc(
        userRef,
        { username, updatedAt: new Date().toISOString() },
        { merge: true }
      );

      // Update all comments with the new username
      await updateCommentsUsername(currentUser.uid, username);

      // Refresh user data
      await auth.currentUser.getIdToken(true);
      await refreshUser();

      setSuccess(t("Username updated successfully."));
    } catch (err) {
      setError(t("Failed to update username: ") + err.message);
      console.error("Error updating username:", err.message);
    }
  };

  // Update password using Firebase Authentication
  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (newPassword !== confirmPassword) {
      setError(t("Passwords do not match."));
      return;
    }

    if (!auth.currentUser) {
      setError(t("Session expired. Please log in again."));
      return;
    }

    try {
      // Re-authenticate user
      const credential = EmailAuthProvider.credential(
        currentUser.email,
        currentPassword
      );
      await reauthenticateWithCredential(auth.currentUser, credential);

      // Update password using Firebase Auth
      await updatePassword(auth.currentUser, newPassword);

      // Update user document with last password change timestamp
      const userRef = doc(db, "users", currentUser.uid);
      const currentTime = new Date().toISOString();
      await setDoc(
        userRef,
        {
          lastPasswordChange: currentTime,
          updatedAt: currentTime,
        },
        { merge: true }
      );

      setSuccess(t("Password updated successfully."));
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    } catch (err) {
      console.error("Error updating password:", err.code, err.message);
      switch (err.code) {
        case "auth/wrong-password":
          setError(t("The current password is incorrect."));
          break;
        case "auth/too-many-requests":
          setError(t("Too many attempts. Please try again later."));
          break;
        case "auth/weak-password":
          setError(t("Password should be at least 6 characters."));
          break;
        default:
          setError(t("Failed to update password: ") + err.message);
      }
    }
  };

  return (
    <div>
      <Helmet>
        <title>{`${t("My Profile")} - ${t("Recipe App")}`}</title>
        <meta
          property="og:title"
          content={`${t("My Profile")} - ${t("Recipe App")}`}
        />
        <meta
          property="og:description"
          content={t("Manage your account and view your recipes!")}
        />
      </Helmet>

      <h2 className="mb-4">
        <FontAwesomeIcon icon={faUser} className="me-2" />
        {t("My Profile")}
      </h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}

      <Card className="mb-4 p-4">
        <Card.Body>
          <h3>{t("Account Settings")}</h3>

          {/* Username Form */}
          <Form onSubmit={handleUpdateUsername} className="mb-4">
            <Form.Group className="mb-3">
              <Form.Label>
                <FontAwesomeIcon icon={faUser} className="me-1" />
                {t("Username")}
                {isGoogleUser && (
                  <span className="badge d-inline-flex align-items-center">
                    <svg
                      width="16"
                      height="16"
                      viewBox="0 0 48 48"
                      className="me-1"
                      fill="currentColor"
                    >
                      <path
                        fill="#EA4335"
                        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
                      />
                      <path
                        fill="#4285F4"
                        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6"
                      />
                      <path
                        fill="#34A853"
                        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
                      />
                    </svg>
                  </span>
                )}
              </Form.Label>
              <Form.Control
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder={t("Enter your username")}
                maxLength="20"
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              <FontAwesomeIcon icon={faSave} className="me-1" />
              {t("Update Username")}
            </Button>
          </Form>

          {/* Password Form */}
          {isEmailPasswordUser && (
            <Form onSubmit={handleUpdatePassword}>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faLock} className="me-1" />
                  {t("Current Password")}
                </Form.Label>
                <Form.Control
                  type="password"
                  value={currentPassword}
                  onChange={(e) => setCurrentPassword(e.target.value)}
                  placeholder={t("Enter your current password")}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faLock} className="me-1" />
                  {t("New Password")}
                </Form.Label>
                <Form.Control
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder={t("Enter your new password")}
                  required
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>
                  <FontAwesomeIcon icon={faLock} className="me-1" />
                  {t("Confirm New Password")}
                </Form.Label>
                <Form.Control
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder={t("Repeat your new password")}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                <FontAwesomeIcon icon={faSave} className="me-1" />
                {t("Update Password")}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>

      {/* Recipes Section */}
      <Card className="p-4">
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3 className="mb-0">
              <FontAwesomeIcon icon={faUser} className="me-2" />
              {t("My Recipes")}
            </h3>
            <Form.Group className="ms-3" style={{ minWidth: "200px" }}>
              <Form.Select value={sortOption} onChange={handleSortChange}>
                <option value="">{t("Sort by...")}</option>
                <option value="alphabetAsc">{t("Alphabetical (A-Z)")}</option>
                <option value="alphabetDesc">{t("Alphabetical (Z-A)")}</option>
                <option value="dateAsc">{t("Date (Oldest First)")}</option>
                <option value="dateDesc">{t("Date (Newest First)")}</option>
              </Form.Select>
            </Form.Group>
          </div>

          {currentRecipes.length === 0 ? (
            <Alert variant="info">{t("No recipes found.")}</Alert>
          ) : (
            <>
              <Row>
                {currentRecipes.map((recipe) => (
                  <Col lg={4} md={6} key={recipe.id} className="mb-4">
                    <Card className="d-flex flex-column h-100">
                      {recipe.imageUrl && (
                        <div
                          className="custom-card-img rounded-top"
                          style={{ backgroundImage: `url(${recipe.imageUrl})` }}
                        />
                      )}
                      <Card.Body className="d-flex flex-column">
                        <Card.Title>
                          <Link to={`/cong-thuc/${recipe.slug}`}>
                            {recipe.title}
                          </Link>
                        </Card.Title>
                        <Card.Text>
                          {recipe.description.slice(0, 100)}...
                        </Card.Text>
                        <div className="mt-auto d-flex justify-content-start gap-3">
                          <Button
                            as={Link}
                            to={`/cong-thuc/${recipe.slug}`}
                            variant="primary"
                          >
                            <FontAwesomeIcon icon={faEye} className="me-1" />
                            {t("View")}
                          </Button>
                          <Button
                            as={Link}
                            to={`/sua-cong-thuc/${recipe.slug}`}
                            variant="warning"
                          >
                            <FontAwesomeIcon
                              icon={faPencilAlt}
                              className="me-1"
                            />
                            {t("Edit")}
                          </Button>
                        </div>
                      </Card.Body>
                    </Card>
                  </Col>
                ))}
              </Row>
              <Pagination
                itemsPerPage={ITEMS_PER_PAGE}
                totalItems={sortedRecipes.length}
                currentPage={currentPage}
                onPageChange={setCurrentPage}
              />
            </>
          )}
        </Card.Body>
      </Card>
    </div>
  );
};

export default Profile;
