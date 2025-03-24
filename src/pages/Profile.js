import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { Card, Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { currentUser } = useContext(AuthContext);
  const [recipes, setRecipes] = useState([]);

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

  if (!currentUser) return <div>Please log in to view your profile.</div>;

  return (
    <div>
      <h2>My Recipes</h2>
      <Row>
        {recipes.map((recipe) => (
          <Col md={4} key={recipe.id} className="mb-4">
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
                <div className="d-flex gap-2">
                  <Button
                    as={Link}
                    to={`/recipe/${recipe.id}`}
                    variant="primary"
                  >
                    View
                  </Button>
                  <Button
                    as={Link}
                    to={`/edit-recipe/${recipe.id}`}
                    variant="warning"
                  >
                    Edit
                  </Button>
                </div>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Profile;
