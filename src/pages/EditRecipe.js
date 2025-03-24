import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
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
} from "@fortawesome/free-solid-svg-icons";

const EditRecipe = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [existingImageUrl, setExistingImageUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);
  const { t } = useLanguage();

  const CLOUDINARY_CLOUD_NAME = process.env.REACT_APP_CLOUDINARY_CLOUD_NAME;
  const CLOUDINARY_UPLOAD_PRESET =
    process.env.REACT_APP_CLOUDINARY_UPLOAD_PRESET;

  useEffect(() => {
    const fetchRecipe = async () => {
      const docRef = doc(db, "recipes", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data.userId !== currentUser.uid) {
          navigate("/");
          return;
        }
        setTitle(data.title);
        setDescription(data.description);
        setIngredients(data.ingredients.join("\n"));
        setSteps(data.steps.join("\n"));
        setCategory(data.category || "");
        setExistingImageUrl(data.imageUrl || "");
      } else {
        setError(t("Recipe not found."));
      }
    };
    fetchRecipe();
  }, [id, currentUser, navigate, t]);

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
      if (data.secure_url) {
        return data.secure_url;
      } else {
        throw new Error(data.error?.message || "Image upload failed");
      }
    } catch (err) {
      throw new Error("Error uploading image: " + err.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = existingImageUrl;
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile);
      }

      const recipeRef = doc(db, "recipes", id);
      await updateDoc(recipeRef, {
        title,
        description,
        ingredients: ingredients.split("\n"),
        steps: steps.split("\n"),
        category,
        imageUrl,
        updatedAt: new Date().toISOString(),
      });
      navigate(`/recipe/${id}`);
    } catch (err) {
      setError(err.message || t("Failed to update recipe."));
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
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
          {existingImageUrl && (
            <div className="mb-2">
              <img
                src={existingImageUrl}
                alt="Current recipe"
                style={{ maxWidth: "200px", borderRadius: "8px" }}
              />
            </div>
          )}
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
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
