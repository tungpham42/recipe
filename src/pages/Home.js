import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { collection, getDocs } from "firebase/firestore";
import { Card, Button, Row, Col, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faUtensils, faEye } from "@fortawesome/free-solid-svg-icons";
import { useLanguage } from "../context/LanguageContext";

const Home = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const { t } = useLanguage();

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
      <h2>
        <FontAwesomeIcon icon={faUtensils} className="me-2" />{" "}
        {t("Explore Recipes")}
      </h2>
      <Form className="mb-4 p-3 bg-white shadow-sm rounded">
        <Row>
          <Col md={8}>
            <Form.Group className="mb-3 mb-md-0 position-relative">
              <Form.Control
                type="text"
                placeholder={t("Search recipes...")}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
              />
              <FontAwesomeIcon
                icon={faSearch}
                className="position-absolute"
                style={{
                  right: "20px",
                  top: "50%",
                  transform: "translateY(-50%)",
                }}
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">{t("All Categories")}</option>
                <option value="Breakfast">{t("Breakfast")}</option>
                <option value="Lunch">{t("Lunch")}</option>
                <option value="Dinner">{t("Dinner")}</option>
                <option value="Dessert">{t("Dessert")}</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </Form>
      <Row>
        {filteredRecipes.map((recipe) => (
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
                    {t("View Recipe")}
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

export default Home;
