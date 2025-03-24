import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, collection, addDoc, getDocs } from "firebase/firestore";
import { useParams, Link } from "react-router-dom";
import { Card, ListGroup, Form, Button, ListGroupItem } from "react-bootstrap";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faComment,
  faList,
  faRoute,
} from "@fortawesome/free-solid-svg-icons";

const RecipeDetail = () => {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setRecipe({ id: docSnap.id, ...docSnap.data() });
      }
    };

    const fetchComments = async () => {
      const commentsRef = collection(db, "recipes", id, "comments");
      const querySnapshot = await getDocs(commentsRef);
      const commentData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setComments(commentData);
    };

    fetchRecipe();
    fetchComments();
  }, [id]);

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUser) return;

    try {
      const commentsRef = collection(db, "recipes", id, "comments");
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

  if (!recipe) return <div className="text-center">Loading...</div>;

  const isOwner = currentUser && recipe.userId === currentUser.uid;

  return (
    <Card className="p-4">
      {recipe.imageUrl && (
        <Card.Img
          variant="top"
          src={recipe.imageUrl}
          alt={recipe.title}
          style={{
            maxHeight: "400px",
            objectFit: "cover",
            borderRadius: "12px 12px 0 0",
          }}
        />
      )}
      <Card.Body>
        <Card.Title className="mb-3">{recipe.title}</Card.Title>
        <Card.Text className="mb-4">{recipe.description}</Card.Text>
        <h5>
          <FontAwesomeIcon icon={faList} className="me-2" /> Ingredients
        </h5>
        <ListGroup variant="flush" className="mb-4">
          {recipe.ingredients.map((item, index) => (
            <ListGroupItem key={index}>{item}</ListGroupItem>
          ))}
        </ListGroup>
        <h5>
          <FontAwesomeIcon icon={faRoute} className="me-2" /> Steps
        </h5>
        <ListGroup variant="flush" className="mb-4">
          {recipe.steps.map((step, index) => (
            <ListGroupItem key={index}>{step}</ListGroupItem>
          ))}
        </ListGroup>
        {isOwner && (
          <Button
            as={Link}
            to={`/edit-recipe/${recipe.id}`}
            variant="warning"
            className="mb-4"
          >
            <FontAwesomeIcon icon={faPencilAlt} className="me-1" /> Edit Recipe
          </Button>
        )}
        <h5>
          <FontAwesomeIcon icon={faComment} className="me-2" /> Comments
        </h5>
        <ListGroup variant="flush" className="mb-4">
          {comments.map((comment) => (
            <ListGroupItem key={comment.id} className="py-3">
              {comment.text}
            </ListGroupItem>
          ))}
        </ListGroup>
        {currentUser && (
          <Form onSubmit={handleCommentSubmit}>
            <Form.Group className="mb-3">
              <Form.Control
                as="textarea"
                rows={3}
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                placeholder="Add a comment..."
                required
              />
            </Form.Group>
            <Button type="submit" variant="primary">
              <FontAwesomeIcon icon={faComment} className="me-1" /> Post Comment
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};

export default RecipeDetail;
