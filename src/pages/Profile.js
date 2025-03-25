import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card, Button, Row, Col, Alert, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faPencilAlt, faUser } from "@fortawesome/free-solid-svg-icons";
import Pagination from "../components/Pagination";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const { t } = useLanguage();
  const [recipes, setRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(
    () => localStorage.getItem("profileSortOption") || "alphabetAsc"
  );
  const itemsPerPage = 12;

  useEffect(() => {
    localStorage.setItem("profileSortOption", sortOption);
  }, [sortOption]);

  useEffect(() => {
    const fetchUserRecipes = async () => {
      if (!currentUser) return;
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
    };
    fetchUserRecipes();
  }, [currentUser]);

  if (!currentUser)
    return (
      <div>
        <Helmet>
          <title>
            {t("Please log in to view your profile.")} - {t("Recipe App")}
          </title>
          <meta
            property="og:title"
            content={
              t("Please log in to view your profile.") + " - " + t("Recipe App")
            }
          />
        </Helmet>
        {t("Please log in to view your profile.")}
      </div>
    );

  const sortRecipes = (recipesToSort) => {
    let sortedRecipes = [...recipesToSort];
    if (sortOption === "alphabetAsc") {
      sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "alphabetDesc") {
      sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "dateAsc") {
      sortedRecipes.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortOption === "dateDesc") {
      sortedRecipes.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return sortedRecipes;
  };

  const sortedRecipes = sortRecipes(recipes);
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = sortedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Helmet>
        <title>
          {t("My Recipes")} - {t("Recipe App")}
        </title>
        <meta
          property="og:title"
          content={t("My Recipes") + " - " + t("Recipe App")}
        />
        <meta
          property="og:description"
          content={t("View your personal recipe collection!")}
        />
      </Helmet>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FontAwesomeIcon icon={faUser} className="me-2" />
          {t("My Recipes")}
        </h2>
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
                    ></div>
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{recipe.title}</Card.Title>
                    <Card.Text>{recipe.description.slice(0, 100)}...</Card.Text>
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
                        <FontAwesomeIcon icon={faPencilAlt} className="me-1" />
                        {t("Edit")}
                      </Button>
                    </div>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={sortedRecipes.length}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default Profile;
