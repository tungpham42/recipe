import React, { useState } from "react";
import { db, auth } from "../firebase";
import { collection, addDoc } from "firebase/firestore";
import { Form, Button, Alert } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const AddRecipe = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [steps, setSteps] = useState("");
  const [category, setCategory] = useState("");
  const [imageFile, setImageFile] = useState(null); // State for file input
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const FREEIMAGE_API_KEY = process.env.REACT_APP_FREEIMAGE_API_KEY; // Replace with your freeimage.host API key

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
      let imageUrl = "";
      if (imageFile) {
        imageUrl = await handleImageUpload(imageFile); // Upload image and get URL
      }

      await addDoc(collection(db, "recipes"), {
        title,
        description,
        ingredients: ingredients.split("\n"),
        steps: steps.split("\n"),
        category,
        imageUrl, // Save the hosted image URL
        userId: auth.currentUser.uid,
        createdAt: new Date().toISOString(),
      });
      navigate("/");
    } catch (err) {
      setError(err.message || "Failed to add recipe.");
    }
  };

  return (
    <div className="bg-white p-4 rounded shadow-sm">
      <h2>Add a Recipe</h2>
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
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => setImageFile(e.target.files[0])}
          />
        </Form.Group>
        <Button type="submit" variant="primary">
          Add Recipe
        </Button>
      </Form>
    </div>
  );
};

export default AddRecipe;
