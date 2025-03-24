import React, { useEffect, useState, useContext } from "react";
import { db } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { Card, Button, Row, Col, Alert, ListGroup } from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faTools,
  faCommentSlash,
} from "@fortawesome/free-solid-svg-icons";

// Reusable Recipe Card Component with Comments
const RecipeCard = ({ recipe, onDeleteRecipe, onDeleteComment }) => (
  <Col md={4} className="mb-4">
    <Card>
      {recipe.imageUrl && (
        <Card.Img
          variant="top"
          src={recipe.imageUrl}
          alt={recipe.title}
          style={{ height: "200px", objectFit: "cover" }}
        />
      )}
      <Card.Body>
        <Card.Title>{recipe.title}</Card.Title>
        <Card.Text>{recipe.description.slice(0, 100)}...</Card.Text>
        <div className="d-flex gap-2 mb-3">
          <Button as={Link} to={`/edit-recipe/${recipe.id}`} variant="warning">
            <FontAwesomeIcon icon={faPencilAlt} className="me-1" /> Edit
          </Button>
          <Button variant="danger" onClick={() => onDeleteRecipe(recipe.id)}>
            <FontAwesomeIcon icon={faTrash} className="me-1" /> Delete
          </Button>
        </div>
        {/* Comments Section */}
        {recipe.comments && recipe.comments.length > 0 && (
          <>
            <h6>Comments</h6>
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

// Admin-specific logic
const useAdminRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchRecipesAndComments = async () => {
      try {
        // Fetch all recipes
        const recipeSnapshot = await getDocs(collection(db, "recipes"));
        const recipeDataPromises = recipeSnapshot.docs.map(
          async (recipeDoc) => {
            const recipeId = recipeDoc.id;
            const recipeData = recipeDoc.data();

            // Fetch comments for this recipe
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
        setError("Failed to load recipes or comments.");
        console.error(err);
      }
    };
    fetchRecipesAndComments();
  }, []);

  const deleteRecipe = async (recipeId) => {
    try {
      await deleteDoc(doc(db, "recipes", recipeId));
      setRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe.id !== recipeId)
      );
    } catch (err) {
      setError("Failed to delete recipe.");
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
      setError("Failed to delete comment.");
    }
  };

  return { recipes, error, deleteRecipe, deleteComment };
};

// Main AdminPanel Component
const AdminPanel = () => {
  const { currentUser } = useContext(AuthContext);
  const { recipes, error, deleteRecipe, deleteComment } = useAdminRecipes();

  const isAdmin = currentUser && currentUser.email === "tung.42@gmail.com";

  if (!currentUser) return <Navigate to="/login" />;
  if (!isAdmin) return <div>Unauthorized access.</div>;

  return (
    <div>
      <h2>
        <FontAwesomeIcon icon={faTools} className="me-2" /> Admin Panel - Manage
        Recipes
      </h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Row>
        {recipes.map((recipe) => (
          <RecipeCard
            key={recipe.id}
            recipe={recipe}
            onDeleteRecipe={deleteRecipe}
            onDeleteComment={deleteComment}
          />
        ))}
      </Row>
    </div>
  );
};

export default AdminPanel;
