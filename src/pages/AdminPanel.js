import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { Card, Button, Row, Col, Alert, ListGroup } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faTools,
  faCommentSlash,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../components/Pagination";

const RecipeCard = ({ recipe, onDeleteRecipe, onDeleteComment }) => {
  const { t } = useLanguage();
  return (
    <Col lg={4} md={6} className="mb-4">
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
              to={`/sua-cong-thuc/${recipe.slug}`}
              variant="warning"
            >
              <FontAwesomeIcon icon={faPencilAlt} className="me-1" />{" "}
              {t("Edit")}
            </Button>
            <Button variant="danger" onClick={() => onDeleteRecipe(recipe.id)}>
              <FontAwesomeIcon icon={faTrash} className="me-1" /> {t("Delete")}
            </Button>
          </div>
          {recipe.comments && recipe.comments.length > 0 && (
            <>
              <h6>{t("Comments")}</h6>
              <ListGroup variant="flush">
                {recipe.comments.map((comment) => (
                  <ListGroup.Item
                    key={comment.id}
                    className="d-flex justify-content-between align-items-center"
                  >
                    <span>{comment.text.slice(0, 50)}...</span>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => onDeleteComment(recipe.id, comment.id)}
                    >
                      <FontAwesomeIcon icon={faCommentSlash} />
                    </Button>
                  </ListGroup.Item>
                ))}
              </ListGroup>
            </>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

const useAdminRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");
  const { t } = useLanguage();

  useEffect(() => {
    const fetchRecipesAndComments = async () => {
      try {
        const recipeSnapshot = await getDocs(collection(db, "recipes"));
        const recipeDataPromises = recipeSnapshot.docs.map(
          async (recipeDoc) => {
            const recipeId = recipeDoc.id;
            const recipeData = recipeDoc.data();

            const commentsRef = collection(db, "recipes", recipeId, "comments");
            const commentSnapshot = await getDocs(commentsRef);
            const commentsData = commentSnapshot.docs.map((commentDoc) => ({
              id: commentDoc.id,
              ...commentDoc.data(),
            }));

            return {
              id: recipeId,
              ...recipeData,
              comments: commentsData,
            };
          }
        );

        const recipeData = await Promise.all(recipeDataPromises);
        setRecipes(recipeData);
      } catch (err) {
        setError(t("Failed to load recipes or comments."));
        console.error(err);
      }
    };
    fetchRecipesAndComments();
  }, [t]);

  const deleteRecipe = async (recipeId) => {
    try {
      await deleteDoc(doc(db, "recipes", recipeId));
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (err) {
      setError(t("Failed to delete recipe."));
    }
  };

  const deleteComment = async (recipeId, commentId) => {
    try {
      await deleteDoc(doc(db, "recipes", recipeId, "comments", commentId));
      setRecipes((prevRecipes) =>
        prevRecipes.map((recipe) =>
          recipe.id === recipeId
            ? {
                ...recipe,
                comments: recipe.comments.filter(
                  (comment) => comment.id !== commentId
                ),
              }
            : recipe
        )
      );
    } catch (err) {
      setError(t("Failed to delete comment."));
    }
  };

  return { recipes, error, deleteRecipe, deleteComment };
};

const AdminPanel = () => {
  const { currentUser } = useContext(AuthContext);
  const { t } = useLanguage();
  const { recipes, error, deleteRecipe, deleteComment } = useAdminRecipes();

  const [currentPage, setCurrentPage] = useState(1); // Add this state
  const itemsPerPage = 6;

  const isAdmin = currentUser && currentUser.email === "tung.42@gmail.com";

  if (!currentUser) return <Navigate to="/login" />;
  if (!isAdmin) return <div>{t("Unauthorized access.")}</div>;

  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = recipes.slice(indexOfFirstRecipe, indexOfLastRecipe);

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faTools} className="me-2" />{" "}
        {t("Admin Panel - Manage Recipes")}
      </h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {currentRecipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDeleteRecipe={deleteRecipe}
            onDeleteComment={deleteComment}
          />
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

export default AdminPanel;
