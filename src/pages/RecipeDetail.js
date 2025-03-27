import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import {
  Card,
  ListGroup,
  Form,
  Button,
  ListGroupItem,
  Alert,
  Row,
  Col,
} from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faComment,
  faList,
  faRoute,
  faUtensils,
  faEye,
  faChevronLeft,
  faChevronRight,
  faTag, // Added for category icon
} from "@fortawesome/free-solid-svg-icons";

const RecipeDetail = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const { currentUser } = useContext(AuthContext);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const recipeQuery = query(
          collection(db, "recipes"),
          where("slug", "==", slug)
        );
        const recipeSnapshot = await getDocs(recipeQuery);

        if (recipeSnapshot.empty) {
          setRecipe(null);
          return;
        }

        const recipeDoc = recipeSnapshot.docs[0];
        const recipeData = { id: recipeDoc.id, ...recipeDoc.data() };
        setRecipe(recipeData);

        const commentsRef = collection(
          db,
          "recipes",
          recipeData.id,
          "comments"
        );
        const commentsSnapshot = await getDocs(commentsRef);
        const commentData = commentsSnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setComments(commentData);

        if (recipeData.category) {
          const relatedQuery = query(
            collection(db, "recipes"),
            where("category", "==", recipeData.category),
            where("slug", "!=", slug)
          );
          const relatedSnapshot = await getDocs(relatedQuery);
          const relatedData = relatedSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setRelatedRecipes(relatedData);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [slug]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !recipe) return;

    try {
      const commentsRef = collection(db, "recipes", recipe.id, "comments");
      await addDoc(commentsRef, {
        text: newComment,
        userId: currentUser.uid,
        createdAt: new Date().toISOString(),
      });
      setNewComment("");
      const updatedComments = await getDocs(commentsRef);
      setComments(
        updatedComments.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
      );
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  const getYoutubeEmbedUrl = (url) => {
    if (!url) return null;
    const videoIdMatch =
      url.match(/(?:v=)([^&]+)/) || url.match(/youtu\.be\/([^?]+)/);
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : null;
  };

  const totalPages = Math.ceil(relatedRecipes.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRelatedRecipes = relatedRecipes.slice(startIndex, endIndex);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  if (!recipe)
    return (
      <div className="text-center">
        <Helmet>
          <title>
            {t("Recipe not found.")} - {t("Recipe App")}
          </title>
          <meta
            property="og:title"
            content={t("Recipe not found.") + " - " + t("Recipe App")}
          />
        </Helmet>
        {t("Recipe not found.")}
      </div>
    );

  const isOwner = currentUser && recipe.userId === currentUser.uid;

  return (
    <div>
      <Card className="p-4 mb-4">
        <Helmet>
          <title>
            {recipe.title} - {t("Recipe App")}
          </title>
          <meta
            property="og:title"
            content={recipe.title + " - " + t("Recipe App")}
          />
          <meta
            property="og:description"
            content={recipe.description.slice(0, 150) + "..."}
          />
          {recipe.imageUrl && (
            <meta property="og:image" content={recipe.imageUrl} />
          )}
        </Helmet>
        {recipe.imageUrl && (
          <div
            className="custom-card-img rounded-top"
            style={{ backgroundImage: `url(${recipe.imageUrl})` }}
          ></div>
        )}
        <Card.Body>
          <Card.Title className="mb-3">{recipe.title}</Card.Title>
          <Card.Text className="mb-2">{recipe.description}</Card.Text>
          {/* Added Category Display */}
          {recipe.category && (
            <h6 className="mb-4 recipe-category">
              <FontAwesomeIcon icon={faTag} className="me-2" />
              <span style={{ fontStyle: "italic", fontWeight: "500" }}>
                {t(recipe.category)}
              </span>
            </h6>
          )}
          {recipe.youtubeUrl && (
            <div className="mb-4">
              <h5>
                <FontAwesomeIcon icon={faUtensils} className="me-2" />
                {t("Video Tutorial")}
              </h5>
              <div className="ratio ratio-16x9">
                <iframe
                  src={getYoutubeEmbedUrl(recipe.youtubeUrl)}
                  title={recipe.title}
                  allowFullScreen
                  className="rounded"
                ></iframe>
              </div>
            </div>
          )}
          <h5>
            <FontAwesomeIcon icon={faList} className="me-2" />{" "}
            {t("Ingredients")}
          </h5>
          <ListGroup variant="flush" className="mb-4">
            {recipe.ingredients.map((item, index) => (
              <ListGroupItem key={index}>
                <span className="item-number">{index + 1}</span>
                {item}
              </ListGroupItem>
            ))}
          </ListGroup>
          <h5>
            <FontAwesomeIcon icon={faRoute} className="me-2" /> {t("Steps")}
          </h5>
          <ListGroup variant="flush" className="mb-4">
            {recipe.steps.map((step, index) => (
              <ListGroupItem key={index}>
                <span className="item-number">{index + 1}</span>
                {step}
              </ListGroupItem>
            ))}
          </ListGroup>
          {isOwner && (
            <Button
              as={Link}
              to={`/sua-cong-thuc/${recipe.slug}`}
              variant="warning"
              className="mb-4"
            >
              <FontAwesomeIcon icon={faPencilAlt} className="me-1" />{" "}
              {t("Edit Recipe")}
            </Button>
          )}
          <h5>
            <FontAwesomeIcon icon={faComment} className="me-2" />{" "}
            {t("Comments")}
          </h5>
          {comments.length === 0 ? (
            <Alert variant="info" className="mb-4">
              {t("No comments yet.")}
            </Alert>
          ) : (
            <ListGroup variant="flush" className="mb-4">
              {comments.map((comment) => (
                <ListGroupItem key={comment.id} className="py-3">
                  {comment.text}
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
          {currentUser && (
            <Form onSubmit={handleCommentSubmit}>
              <Form.Group className="mb-3">
                <Form.Control
                  as="textarea"
                  rows={3}
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  placeholder={t("Add a comment...")}
                  required
                />
              </Form.Group>
              <Button type="submit" variant="primary">
                <FontAwesomeIcon icon={faComment} className="me-1" />{" "}
                {t("Post Comment")}
              </Button>
            </Form>
          )}
        </Card.Body>
      </Card>

      {relatedRecipes.length > 0 && (
        <div className="mb-4">
          <h5>
            <FontAwesomeIcon icon={faUtensils} className="me-2" />{" "}
            {t("Related Recipes")}
          </h5>
          <Row>
            {currentRelatedRecipes.map((related) => (
              <Col lg={4} md={4} key={related.id} className="mb-4">
                <Card className="d-flex flex-column h-100">
                  {related.imageUrl && (
                    <div
                      className="custom-card-img rounded-top"
                      style={{ backgroundImage: `url(${related.imageUrl})` }}
                    ></div>
                  )}
                  <Card.Body className="d-flex flex-column">
                    <Card.Title>{related.title}</Card.Title>
                    <Card.Text>
                      {related.description.slice(0, 100)}...
                    </Card.Text>
                    <div className="mt-auto d-flex justify-content-start gap-3">
                      <Button
                        as={Link}
                        to={`/cong-thuc/${related.slug}`}
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
          {totalPages > 1 && (
            <div className="d-flex justify-content-between align-items-center my-0 related-pagination">
              <Button
                variant="outline-primary"
                onClick={handlePrevPage}
                disabled={currentPage === 1}
              >
                <FontAwesomeIcon icon={faChevronLeft} className="me-1" />
                {t("Previous")}
              </Button>
              <Button
                variant="outline-primary"
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
              >
                {t("Next")}
                <FontAwesomeIcon icon={faChevronRight} className="ms-1" />
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default RecipeDetail;
