import React, { useEffect, useState, useContext } from "react";
import { Helmet } from "react-helmet-async";
import { db, isAdminUser } from "../firebase";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import {
  Card,
  Button,
  Row,
  Col,
  Alert,
  ListGroup,
  Form,
} from "react-bootstrap";
import { Navigate, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencilAlt,
  faTrash,
  faTools,
  faCommentSlash,
  faComments,
} from "@fortawesome/free-solid-svg-icons";
import Pagination from "../components/Pagination";

const RecipeCard = ({ recipe, onDeleteRecipe, onDeleteComment, isAdmin }) => {
  const { t } = useLanguage();

  // Sort comments by date (newest first)
  const sortedComments = recipe.comments
    ? [...recipe.comments].sort((a, b) => {
        const dateA = a.createdAt?.toDate?.() || new Date(a.createdAt);
        const dateB = b.createdAt?.toDate?.() || new Date(b.createdAt);
        return dateB - dateA;
      })
    : [];

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
          <Card.Title>
            <Link to={`/cong-thuc/${recipe.slug}`}>{recipe.title}</Link>
          </Card.Title>
          <Card.Text>{recipe.description.slice(0, 100)}...</Card.Text>
          {isAdmin && (
            <div className="mt-auto d-flex justify-content-start gap-3">
              <Button
                as={Link}
                to={`/sua-cong-thuc/${recipe.slug}`}
                variant="warning"
              >
                <FontAwesomeIcon icon={faPencilAlt} className="me-1" />{" "}
                {t("Edit")}
              </Button>
              <Button
                variant="danger"
                onClick={() => onDeleteRecipe(recipe.id)}
              >
                <FontAwesomeIcon icon={faTrash} className="me-1" />{" "}
                {t("Delete")}
              </Button>
            </div>
          )}
          {sortedComments.length > 0 && isAdmin && (
            <>
              <h6
                className="mt-3 mb-2"
                style={{
                  color: "#495057",
                  fontWeight: "600",
                  borderBottom: "2px solid #e9ecef",
                  paddingBottom: "5px",
                }}
              >
                <FontAwesomeIcon
                  icon={faComments}
                  className="me-2"
                  style={{ color: "#6c757d" }}
                />
                {t("Comments")}
              </h6>
              <ListGroup variant="flush">
                {sortedComments.map((comment) => (
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

const useAdminRecipes = (isAdmin) => {
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
            return { id: recipeId, ...recipeData, comments: commentsData };
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
    if (!isAdmin) {
      setError(t("Unauthorized action"));
      return;
    }
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
    if (!isAdmin) {
      setError(t("Unauthorized action"));
      return;
    }
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
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const { recipes, error, deleteRecipe, deleteComment } =
    useAdminRecipes(isAdmin);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOption, setSortOption] = useState(
    () => localStorage.getItem("adminSortOption") || "alphabetAsc"
  );
  const itemsPerPage = 12;

  useEffect(() => {
    const checkAdminStatus = async () => {
      if (currentUser) {
        const adminStatus = await isAdminUser(currentUser);
        setIsAdmin(adminStatus);
      }
      setLoading(false);
    };
    checkAdminStatus();
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem("adminSortOption", sortOption);
  }, [sortOption]);

  if (loading) {
    return <div>{t("Loading...")}</div>;
  }

  if (!currentUser) {
    return (
      <>
        <Helmet>
          <title>
            {t("Login")} - {t("Recipe App")}
          </title>
          <meta
            property="og:title"
            content={t("Login") + " - " + t("Recipe App")}
          />
        </Helmet>
        <Navigate to="/dang-nhap" />
      </>
    );
  }

  const sortRecipes = (recipesToSort) => {
    let sortedRecipes = [...recipesToSort];
    if (sortOption === "alphabetAsc") {
      sortedRecipes.sort((a, b) => a.title.localeCompare(b.title));
    } else if (sortOption === "alphabetDesc") {
      sortedRecipes.sort((a, b) => b.title.localeCompare(a.title));
    } else if (sortOption === "dateAsc") {
      sortedRecipes.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortOption === "dateDesc") {
      sortedRecipes.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    }
    return sortedRecipes;
  };

  const sortedRecipes = sortRecipes(recipes);
  const indexOfLastRecipe = currentPage * itemsPerPage;
  const indexOfFirstRecipe = indexOfLastRecipe - itemsPerPage;
  const currentRecipes = sortedRecipes.slice(
    indexOfFirstRecipe,
    indexOfLastRecipe
  );

  const handleSortChange = (e) => {
    setSortOption(e.target.value);
    setCurrentPage(1);
  };

  return (
    <div>
      <Helmet>
        <title>
          {t("Admin Panel - Manage Recipes")} - {t("Recipe App")}
        </title>
        <meta
          property="og:title"
          content={t("Admin Panel - Manage Recipes") + " - " + t("Recipe App")}
        />
        <meta
          property="og:description"
          content={t("Manage all recipes as an admin.")}
        />
      </Helmet>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">
          <FontAwesomeIcon icon={faTools} className="me-2" />
          {t(isAdmin ? "Admin Panel - Manage Recipes" : "Recipes")}
        </h2>
        {isAdmin && (
          <Form.Group className="ms-3" style={{ minWidth: "200px" }}>
            <Form.Select value={sortOption} onChange={handleSortChange}>
              <option value="">{t("Sort by...")}</option>
              <option value="alphabetAsc">{t("Alphabetical (A-Z)")}</option>
              <option value="alphabetDesc">{t("Alphabetical (Z-A)")}</option>
              <option value="dateAsc">{t("Date (Oldest First)")}</option>
              <option value="dateDesc">{t("Date (Newest First)")}</option>
            </Form.Select>
          </Form.Group>
        )}
      </div>
      {error && <Alert variant="danger">{error}</Alert>}
      {currentRecipes.length === 0 ? (
        <Alert variant="info">{t("No recipes found.")}</Alert>
      ) : (
        <>
          <Row>
            {currentRecipes.map((recipe) => (
              <RecipeCard
                key={recipe.id}
                recipe={recipe}
                onDeleteRecipe={deleteRecipe}
                onDeleteComment={deleteComment}
                isAdmin={isAdmin}
              />
            ))}
          </Row>
          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={sortedRecipes.length}
            currentPage={currentPage}
            onPageChange={setCurrentPage}
          />
        </>
      )}
    </div>
  );
};

export default AdminPanel;
