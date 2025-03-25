import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet";
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
} from "@fortawesome/free-solid-svg-icons";

const RecipeDetail = () => {
  const { slug } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useContext(AuthContext);
  const { t } = useLanguage();

  useEffect(() => {
    const fetchRecipe = async () => {
      const q = query(collection(db, "recipes"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        setRecipe({ id: docSnap.id, ...docSnap.data() });
      } else {
        setRecipe(null);
      }
    };

    const fetchComments = async () => {
      if (!recipe) return;
      const commentsRef = collection(db, "recipes", recipe.id, "comments");
      const querySnapshot = await getDocs(commentsRef);
      const commentData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentData);
    };

    fetchRecipe()
      .then(() => fetchComments())
      .catch((err) => {
        console.error("Error fetching recipe or comments:", err);
      });
  }, [slug, recipe?.id, recipe]);

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
    <Card className="p-4">
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
        <Card.Text className="mb-4">{recipe.description}</Card.Text>
        <h5>
          <FontAwesomeIcon icon={faList} className="me-2" /> {t("Ingredients")}
        </h5>
        <ListGroup variant="flush" className="mb-4">
          {recipe.ingredients.map((item, index) => (
            <ListGroupItem key={index}>{item}</ListGroupItem>
          ))}
        </ListGroup>
        <h5>
          <FontAwesomeIcon icon={faRoute} className="me-2" /> {t("Steps")}
        </h5>
        <ListGroup variant="flush" className="mb-4">
          {recipe.steps.map((step, index) => (
            <ListGroupItem key={index}>{step}</ListGroupItem>
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
          <FontAwesomeIcon icon={faComment} className="me-2" /> {t("Comments")}
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
  );
};

export default RecipeDetail;
