import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card, Button, Row, Col } from "react-bootstrap";
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

  const [currentPage, setCurrentPage] = useState(1); // Add this state
  const itemsPerPage = 12;

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
    return <div>{t("Please log in to view your profile.")}</div>;

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faUser} className="me-2" /> {t("My Recipes")}
      </h2>
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
        totalItems={recipes.length}
        currentPage={currentPage}
        onPageChange={setCurrentPage}
      />
    </div>
  );
};

export default Profile;
