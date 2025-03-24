import React, { useEffect, useState } from "react";
import { db } from "../firebase";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const EditRecipe = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null); // State for new image file
  const [existingImageUrl, setExistingImageUrl] = useState(""); // Existing image URL
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const FREEIMAGE_API_KEY = process.env.REACT_APP_FREEIMAGE_API_KEY; // Replace with your freeimage.host API key

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
        setExistingImageUrl(data.imageUrl || ""); // Load existing image URL
      } else {
        setError("Recipe not found.");
      }
    };
    fetchRecipe();
  }, [id, currentUser, navigate]);

  const handleImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("key", FREEIMAGE_API_KEY);
    formData.append("source", file);
    formData.append("format", "json");

    try {
      const response = await fetch("https://freeimage.host/api/1/upload", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      if (data.status_code === 200) {
        return data.image.url; // Return the hosted image URL
      } else {
        throw new Error(data.error.message || "Image upload failed");
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
        imageUrl = await handleImageUpload(imageFile); // Upload new image if provided
      }

      const recipeRef = doc(db, "recipes", id);
      await updateDoc(recipeRef, {
        title,
        description,
        ingredients: ingredients.split("\n"),
        steps: steps.split("\n"),
        category,
        imageUrl, // Update with new or existing image URL
        updatedAt: new Date().toISOString(),
      });
      navigate(`/recipe/${id}`);
    } catch (err) {
      setError(err.message || "Failed to update recipe.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2>Edit Recipe</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            placeholder="Recipe title"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Describe your recipe"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Ingredients</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            required
            placeholder="List ingredients, one per line"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Steps</Form.Label>
          <Form.Control
            as="textarea"
            rows={5}
            value={steps}
            onChange={(e) => setSteps(e.target.value)}
            required
            placeholder="List steps, one per line"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Category</Form.Label>
          <Form.Select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="">Select a category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Dessert">Dessert</option>
          </Form.Select>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Recipe Image (optional)</Form.Label>
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
          Update Recipe
        </Button>
      </Form>
    </div>
  );
};

export default EditRecipe;
