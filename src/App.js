import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { Button, Container } from "react-bootstrap";
import Header from "./components/Header";
import Home from "./pages/Home";
import AddRecipe from "./pages/AddRecipe";
import RecipeDetail from "./pages/RecipeDetail";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import EditRecipe from "./pages/EditRecipe";
import { useContext } from "react";
import { AuthContext } from "./context/AuthContext";
import { LanguageProvider } from "./context/LanguageContext";
import AdminPanel from "./pages/AdminPanel";
import Footer from "./components/Footer";
import NotFound from "./pages/NotFound"; // Add this import
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronUp } from "@fortawesome/free-solid-svg-icons";
import PrivacyPolicy from "./pages/PrivacyPolicy";

const ProtectedRoute = ({ children }) => {
  const { currentUser } = useContext(AuthContext);
  return currentUser ? children : <Navigate to="/dang-nhap" />;
};
const AppContent = () => {
  const [showButton, setShowButton] = useState(false);
  useEffect(() => {
    const handleScrollResize = () => {
      setShowButton(window.scrollY > 148);
    };

    window.addEventListener("scroll", handleScrollResize);
    window.addEventListener("resize", handleScrollResize);
    handleScrollResize(); // Initial call

    return () => {
      window.removeEventListener("scroll", handleScrollResize);
      window.removeEventListener("resize", handleScrollResize);
    };
  }, []);

  // Smooth scroll to top
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <Router>
      <Header />
      <Container className="my-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/them-cong-thuc"
            element={
              <ProtectedRoute>
                <AddRecipe />
              </ProtectedRoute>
            }
          />
          <Route path="/cong-thuc/:slug" element={<RecipeDetail />} />
          <Route
            path="/sua-cong-thuc/:slug"
            element={
              <ProtectedRoute>
                <EditRecipe />
              </ProtectedRoute>
            }
          />
          <Route path="/dang-nhap" element={<Login />} />
          <Route path="/dang-ky" element={<Register />} />
          <Route
            path="/ho-so"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminPanel />
              </ProtectedRoute>
            }
          />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="*" element={<NotFound />} />{" "}
          {/* Add this catch-all route */}
        </Routes>
      </Container>
      <Footer />
      {showButton && (
        <Button
          variant="primary"
          onClick={scrollToTop}
          className="position-fixed d-flex align-items-center justify-content-center"
          style={{
            height: "3.5rem",
            bottom: "25px",
            right: "25px",
            fontSize: "1.25rem",
          }}
        >
          <FontAwesomeIcon icon={faChevronUp} />
        </Button>
      )}
    </Router>
  );
};

function App() {
  return (
    <LanguageProvider>
      <AppContent />
    </LanguageProvider>
  );
}

export default App;
