import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    const fetchRecipes = async () => {
      const querySnapshot = await getDocs(collection(db, "recipes"));
      const recipeData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setRecipes(recipeData);
    };
    fetchRecipes();
  }, []);

  const filteredRecipes = recipes.filter((recipe) => {
    const matchesSearch = recipe.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesCategory = category ? recipe.category === category : true;
    return matchesSearch && matchesCategory;
  });

  return (
    <div>
      <h2>Explore Recipes</h2>
      <Form className="mb-4 p-3 bg-white shadow-sm rounded">
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3 mb-md-0">
              <Form.Control
                type="text"
                placeholder="Search recipes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">All Categories</option>
                <option value="Breakfast">Breakfast</option>
                <option value="Lunch">Lunch</option>
                <option value="Dinner">Dinner</option>
                <option value="Dessert">Dessert</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row>
        {filteredRecipes.map((recipe) => (
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
                <Button as={Link} to={`/recipe/${recipe.id}`} variant="primary">
                  View Recipe
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default Home;
