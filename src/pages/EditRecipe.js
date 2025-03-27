import React, { useEffect, useState } from "react";
import { Helmet } from "react-helmet-async";
import { db } from "../firebase";
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faImage,
  faList,
  faRoute,
  faSave,
  faTags,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { romanizeString } from "../utils";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const EditRecipe = () => {
  const { slug } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [error, setError] = useState("");
  const [recipeId, setRecipeId] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { t } = useLanguage();
  const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET =
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    const fetchRecipe = async () => {
      if (!slug) {
        setError(t("No recipe slug provided."));
        return;
      }

      const q = query(collection(db, "recipes"), where("slug", "==", slug));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const docSnap = querySnapshot.docs[0];
        const data = docSnap.data();
        if (data.userId !== currentUser.uid) {
          navigate("/");
          return;
        }
        setRecipeId(docSnap.id);
        setTitle(data.title);
        setDescription(data.description);
        setIngredients(data.ingredients.join("\n"));
        setSteps(data.steps.join("\n"));
        setCategory(data.category || "");
        setExistingImageUrl(data.imageUrl || "");
        setYoutubeUrl(data.youtubeUrl || "");
      } else {
        setError(t("Recipe not found."));
      }
    };
    fetchRecipe();
  }, [slug, currentUser, navigate, t]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );
      const data = await response.json();
      if (data.secure_url) return data.secure_url;
      throw new Error(data.error?.message || "Image upload failed");
    } catch (err) {
      throw new Error("Error uploading image: " + err.message);
    }
  };

  const generateUniqueSlug = async (baseSlug, currentId) => {
    const q = query(collection(db, "recipes"), where("slug", "==", baseSlug));
    const querySnapshot = await getDocs(q);

    const existingDocs = querySnapshot.docs.filter(
      (doc) => doc.id !== currentId
    );
    if (existingDocs.length === 0) {
      return baseSlug;
    }
    return `${baseSlug}-${currentId}`;
  };

  const handleRemoveImage = () => {
    setImageFile(null);
    setExistingImageUrl("");
  };

  const isValidYoutubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!recipeId) {
      setError(t("No recipe ID available for update."));
      return;
    }

    try {
      // Validate YouTube URL if provided
      if (youtubeUrl && !isValidYoutubeUrl(youtubeUrl)) {
        setError(t("Invalid YouTube URL"));
        return;
      }

      let imageUrl = existingImageUrl;
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const baseSlug = romanizeString(title);
      const newSlug = await generateUniqueSlug(baseSlug, recipeId);

      const recipeRef = doc(db, "recipes", recipeId);
      await updateDoc(recipeRef, {
        title,
        description,
        ingredients: ingredients.split("\n"),
        steps: steps.split("\n"),
        category,
        imageUrl,
        youtubeUrl: youtubeUrl || "", // Add YouTube URL
        slug: newSlug,
        updatedAt: new Date().toISOString(),
      });
      navigate(`/cong-thuc/${newSlug}`);
    } catch (err) {
      setError(err.message || t("Failed to update recipe."));
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <Helmet>
        <title>
          {t("Edit Recipe")}: {title || "Loading..."} - {t("Recipe App")}
        </title>
        <meta
          property="og:title"
          content={
            t("Edit Recipe") +
            ": " +
            (title || "Loading...") +
            " - " +
            t("Recipe App")
          }
        />
        <meta
          property="og:description"
          content={t("Update your recipe details.")}
        />
      </Helmet>
      <h2>
        <FontAwesomeIcon icon={faUtensils} className="me-2" />{" "}
        {t("Edit Recipe")}
      </h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faUtensils} className="me-1" />
            {t("Title")}
          </Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder={t("Recipe title")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faUtensils} className="me-1" />
            {t("Description")}
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder={t("Describe your recipe")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faList} className="me-1" />
            {t("Ingredients")}
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            placeholder={t("List ingredients, one per line")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faRoute} className="me-1" />
            {t("Steps")}
          </Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
            placeholder={t("List steps, one per line")}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faTags} className="me-1" />
            {t("Category")}
          </Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">{t("Select a category")}</option>
            <option value="Breakfast">{t("Breakfast")}</option>
            <option value="Lunch">{t("Lunch")}</option>
            <option value="Dinner">{t("Dinner")}</option>
            <option value="Dessert">{t("Dessert")}</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faImage} className="me-1" />
            {t("Recipe Image (optional)")}
          </Form.Label>
          {existingImageUrl && !imageFile && (
            <div className="mb-2 d-flex align-items-start">
              <img
                src={existingImageUrl}
                alt="Current recipe"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
              <Button
                variant="danger"
                size="sm"
                className="ms-2"
                onClick={handleRemoveImage}
              >
                <FontAwesomeIcon icon={faTrash} />
              </Button>
            </div>
          )}
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faYoutube} className="me-1" />
            {t("YouTube Video URL (optional)")}
          </Form.Label>
          <Form.Control
            type="text"
            value={youtubeUrl}
            onChange={(e) => setYoutubeUrl(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=..."
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          <FontAwesomeIcon icon={faSave} className="me-1" />
          {t("Update Recipe")}
        </Button>
      </Form>
    </div>
  );
};

export default EditRecipe;
