import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  doc,
  getDoc,
} from "firebase/firestore";
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
  Spinner,
} from "react-bootstrap";
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
  faTag,
} from "@fortawesome/free-solid-svg-icons";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const RecipeDetail = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [relatedRecipes, setRelatedRecipes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { currentUser } = useContext(AuthContext);
  const { t } = useLanguage();
  const itemsPerPage = 3;

  const fetchComments = async (recipeId) => {
    try {
      const commentsRef = collection(db, "recipes", recipeId, "comments");
      const commentsSnapshot = await getDocs(commentsRef);
      const commentsData = commentsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const commentsWithUpdatedUsernames = await Promise.all(
        commentsData.map(async (comment) => {
          const userRef = doc(db, "users", comment.userId);
          const userDoc = await getDoc(userRef);
          const userData = userDoc.exists() ? userDoc.data() : {};
          return {
            ...comment,
            username:
              comment.username ||
              userData.displayName ||
              userData.username ||
              "Anonymous",
          };
        })
      );

      return commentsWithUpdatedUsernames.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } catch (err) {
      console.error("Error fetching comments:", err);
      return [];
    }
  };

  useEffect(() => {
    const fetchRecipeBySlug = async (slug) => {
      const recipeQuery = query(
        collection(db, "recipes"),
        where("slug", "==", slug)
      );
      const recipeSnapshot = await getDocs(recipeQuery);
      return recipeSnapshot.empty
        ? null
        : { id: recipeSnapshot.docs[0].id, ...recipeSnapshot.docs[0].data() };
    };

    const fetchRelatedRecipes = async (recipe) => {
      if (!recipe?.category) return [];
      const relatedQuery = query(
        collection(db, "recipes"),
        where("category", "==", recipe.category),
        where("slug", "!=", slug)
      );
      const relatedSnapshot = await getDocs(relatedQuery);
      return relatedSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
    };

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const recipeData = await fetchRecipeBySlug(slug);
        if (!recipeData) {
          setError(t("Recipe not found."));
          setRecipe(null);
          setComments([]);
          setRelatedRecipes([]);
          return;
        }

        setRecipe(recipeData);
        const [commentData, relatedData] = await Promise.all([
          fetchComments(recipeData.id),
          fetchRelatedRecipes(recipeData),
        ]);

        setComments(commentData);
        setRelatedRecipes(relatedData);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError(t("Error loading recipe. Please try again."));
        setRecipe(null);
        setComments([]);
        setRelatedRecipes([]);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [slug, t]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser || !recipe || !newComment.trim()) return;

    try {
      const commentsRef = collection(db, "recipes", recipe.id, "comments");
      const newCommentData = {
        text: newComment,
        userId: currentUser.uid,
        username: currentUser.displayName,
        createdAt: new Date().toISOString(),
      };

      await addDoc(commentsRef, newCommentData);
      setNewComment("");
      const updatedComments = await fetchComments(recipe.id);
      setComments(updatedComments);
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
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  if (loading) {
    return (
      <div className="text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">{t("Loading...")}</span>
        </Spinner>
      </div>
    );
  }

  if (error) {
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
        <Alert variant="warning">{error}</Alert>
      </div>
    );
  }

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
                <FontAwesomeIcon icon={faYoutube} className="me-2" />
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
            <FontAwesomeIcon icon={faList} className="me-2" />
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
              <FontAwesomeIcon icon={faPencilAlt} className="me-1" />
              {t("Edit Recipe")}
            </Button>
          )}
          <h5>
            <FontAwesomeIcon icon={faComment} className="me-2" />
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
                  <div className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{comment.username}</strong>
                      <span className="ms-2 text-muted">
                        {new Date(comment.createdAt).toLocaleDateString(
                          "vi-VN",
                          {
                            year: "numeric",
                            month: "2-digit",
                            day: "2-digit",
                          }
                        )}
                      </span>
                    </div>
                  </div>
                  <div className="mt-1">{comment.text}</div>
                </ListGroupItem>
              ))}
            </ListGroup>
          )}
          {currentUser ? (
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
                <FontAwesomeIcon icon={faComment} className="me-1" />
                {t("Post Comment")}
              </Button>
            </Form>
          ) : (
            <Alert variant="warning" className="mb-0">
              {t("Please log in to add a comment.")}
            </Alert>
          )}
        </Card.Body>
      </Card>

      {relatedRecipes.length > 0 && (
        <div className="mb-4">
          <h5>
            <FontAwesomeIcon icon={faUtensils} className="me-2" />
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
                    <Card.Title>
                      <Link to={`/cong-thuc/${related.slug}`}>
                        {related.title}
                      </Link>
                    </Card.Title>
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
