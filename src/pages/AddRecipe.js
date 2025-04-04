import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import { db, auth } from "../firebase";
import {
  collection,
  addDoc,
  updateDoc,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../context/LanguageContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faImage,
  faList,
  faRoute,
  faPlus,
  faTags,
  faHeading,
  faFileAlt,
} from "@fortawesome/free-solid-svg-icons";
import { romanizeString } from "../utils";
import { faYoutube } from "@fortawesome/free-brands-svg-icons";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [youtubeUrl, setYoutubeUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { t } = useLanguage();

  const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET =
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    setError(""); // Reset error to empty string on language change
  }, [t]);

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

  const generateUniqueSlug = async (baseSlug) => {
    const q = query(collection(db, "recipes"), where("slug", "==", baseSlug));
    const querySnapshot = await getDocs(q);

    if (querySnapshot.empty) {
      return baseSlug;
    }
    return baseSlug + "-temp-" + Math.random().toString(36).substring(2, 8);
  };

  const isValidYoutubeUrl = (url) => {
    const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
    return youtubeRegex.test(url);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Validate YouTube URL if provided
      if (youtubeUrl && !isValidYoutubeUrl(youtubeUrl)) {
        setError(t("Invalid YouTube URL"));
        return;
      }

      let imageUrl = "";
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const baseSlug = romanizeString(title);
      let slug = await generateUniqueSlug(baseSlug);

      const docRef = await addDoc(collection(db, "recipes"), {
        title,
        description,
        ingredients: ingredients.split("\n"),
        steps: steps.split("\n"),
        category,
        imageUrl,
        youtubeUrl: youtubeUrl || "", // Add YouTube URL
        slug,
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      });

      if (slug.includes("-temp-")) {
        slug = `${baseSlug}-${docRef.id}`;
        await updateDoc(docRef, { slug });
      }

      navigate(`/cong-thuc/${slug}`);
    } catch (err) {
      setError(err.message || t("Failed to add recipe."));
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <Helmet>
        <title>
          {t("Add a Recipe")} - {t("Recipe App")}
        </title>
        <meta
          property="og:title"
          content={t("Add a Recipe") + " - " + t("Recipe App")}
        />
        <meta
          property="og:description"
          content={t("Share your favorite recipe with the world!")}
        />
      </Helmet>
      <h2>
        <FontAwesomeIcon icon={faUtensils} className="me-2" />{" "}
        {t("Add a Recipe")}
      </h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>
            <FontAwesomeIcon icon={faHeading} className="me-1" />
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
            <FontAwesomeIcon icon={faFileAlt} className="me-1" />
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
          <FontAwesomeIcon icon={faPlus} className="me-1" />
          {t("Add Recipe")}
        </Button>
      </Form>
    </div>
  );
};

export default AddRecipe;
