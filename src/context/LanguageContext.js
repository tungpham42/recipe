// src/context/LanguageContext.js
import React, { createContext, useState, useContext, useEffect } from "react";

// Translation data
const translations = {
  en: {
    Home: "Home",
    "Add Recipe": "Add Recipe",
    Profile: "Profile",
    Admin: "Admin",
    Logout: "Logout",
    Login: "Login",
    Register: "Register",
    "Recipe Sharing": "Recipe Sharing",
    "My Recipes": "My Recipes",
    View: "View",
    Edit: "Edit",
    Delete: "Delete",
    "Explore Recipes": "Explore Recipes",
    "Search recipes...": "Search recipes...",
    "All Categories": "All Categories",
    Breakfast: "Breakfast",
    Lunch: "Lunch",
    Dinner: "Dinner",
    Dessert: "Dessert",
    "View Recipe": "View Recipe",
    "Edit Recipe": "Edit Recipe",
    "Update Recipe": "Update Recipe",
    "Add a Recipe": "Add a Recipe",
    Title: "Title",
    Description: "Description",
    Ingredients: "Ingredients",
    Steps: "Steps",
    Category: "Category",
    "Recipe Image (optional)": "Recipe Image (optional)",
    Comments: "Comments",
    "Post Comment": "Post Comment",
    "Add a comment...": "Add a comment...",
    "Please log in to view your profile.":
      "Please log in to view your profile.",
    "Admin Panel - Manage Recipes": "Admin Panel - Manage Recipes",
    Email: "Email",
    Password: "Password",
    "Invalid email or password.": "Invalid email or password.",
    "Failed to register. Try again.": "Failed to register. Try again.",
    "Repeat Password": "Repeat Password",
    "Repeat your password": "Repeat your password",
    "Passwords do not match.": "Passwords do not match.",
    "Enter your email": "Enter your email",
    "Enter your password": "Enter your password",
    "Recipe title": "Recipe title",
    "Recipe description": "Recipe description",
    "Recipe ingredients": "Recipe ingredients",
    "Recipe steps": "Recipe steps",
    "Recipe category": "Recipe category",
    "Recipe image": "Recipe image",
    "Recipe comments": "Recipe comments",
    "Post a comment": "Post a comment",
    "Add a comment": "Add a comment",
    "Describe your recipe": "Describe your recipe",
    "List ingredients, one per line": "List ingredients, one per line",
    "List steps, one per line": "List steps, one per line",
    "Select a category": "Select a category",
    Previous: "Previous",
    Next: "Next",
    "No recipes found.": "No recipes found.",
    "No comments yet.": "No comments yet.",
    "Recipe App": "Recipe Sharing Platform",
    "Update your recipe details.": "Update your recipe details.",
    "Share your favorite recipe with the world!":
      "Share your favorite recipe with the world!",
    "Discover and share amazing recipes!":
      "Discover and share amazing recipes!",
    "Log in to access your recipes!": "Log in to access your recipes!",
    "Manage all recipes as an admin.": "Manage all recipes as an admin.",
    "View your personal recipe collection!":
      "View your personal recipe collection!",
    "Create an account to share your recipes!":
      "Create an account to share your recipes!",
    "Related Recipes": "Related Recipes",
    "Recipe not found.": "Recipe not found.",
    "404 - Page Not Found": "404 - Page Not Found",
    "Sorry, the page you are looking for does not exist or has been moved.":
      "Sorry, the page you are looking for does not exist or has been moved.",
    "Back to Home": "Back to Home",
  },
  vi: {
    Home: "Trang chủ",
    "Add Recipe": "Thêm công thức",
    Profile: "Hồ sơ",
    Admin: "Quản trị",
    Logout: "Đăng xuất",
    Login: "Đăng nhập",
    Register: "Đăng ký",
    "Recipe Sharing": "Chia sẻ món ăn",
    "My Recipes": "Công thức của tôi",
    View: "Xem",
    Edit: "Chỉnh sửa",
    Delete: "Xóa",
    "Explore Recipes": "Khám phá công thức",
    "Search recipes...": "Tìm kiếm công thức...",
    "All Categories": "Tất cả danh mục",
    Breakfast: "Bữa sáng",
    Lunch: "Bữa trưa",
    Dinner: "Bữa tối",
    Dessert: "Tráng miệng",
    "View Recipe": "Xem công thức",
    "Edit Recipe": "Chỉnh sửa công thức",
    "Update Recipe": "Cập nhật công thức",
    "Add a Recipe": "Thêm công thức mới",
    Title: "Tiêu đề",
    Description: "Mô tả",
    Ingredients: "Nguyên liệu",
    Steps: "Các bước",
    Category: "Danh mục",
    "Recipe Image (optional)": "Hình ảnh công thức (tùy chọn)",
    Comments: "Bình luận",
    "Post Comment": "Đăng bình luận",
    "Add a comment...": "Thêm bình luận...",
    "Please log in to view your profile.":
      "Vui lòng đăng nhập để xem hồ sơ của bạn.",
    "Admin Panel - Manage Recipes": "Bảng quản trị - Quản lý công thức",
    Email: "Email",
    Password: "Mật khẩu",
    "Invalid email or password.": "Email hoặc mật khẩu không hợp lệ.",
    "Failed to register. Try again.": "Đăng ký thất bại. Thử lại.",
    "Repeat Password": "Nhập lại mật khẩu",
    "Repeat your password": "Nhập lại mật khẩu của bạn",
    "Passwords do not match.": "Mật khẩu không khớp.",
    "Enter your email": "Nhập email của bạn",
    "Enter your password": "Nhập mật khẩu của bạn",
    "Recipe title": "Tên công thức",
    "Recipe description": "Mô tả công thức",
    "Recipe ingredients": "Nguyên liệu công thức",
    "Recipe steps": "Các bước công thức",
    "Recipe category": "Danh mục công thức",
    "Recipe image": "Hình ảnh công thức",
    "Recipe comments": "Bình luận công thức",
    "Post a comment": "Đăng bình luận",
    "Add a comment": "Thêm bình luận",
    "Describe your recipe": "Mô tả công thức của bạn",
    "List ingredients, one per line":
      "Liệt kê nguyên liệu, mỗi dòng một nguyên liệu",
    "List steps, one per line": "Liệt kê các bước, mỗi dòng một bước",
    "Select a category": "Chọn một danh mục",
    Previous: "Trước",
    Next: "Sau",
    "No recipes found.": "Không có công thức nào.",
    "No comments yet.": "Chưa có bình luận nào.",
    "Recipe App": "Nền tảng chia sẻ công thức nấu ăn",
    "Update your recipe details.":
      "Cập nhật thông tin chi tiết về công thức của bạn.",
    "Share your favorite recipe with the world!":
      "Chia sẻ công thức yêu thích của bạn với thế giới!",
    "Discover and share amazing recipes!":
      "Khám phá và chia sẻ những công thức tuyệt vời!",
    "Log in to access your recipes!": "Đăng nhập để xem công thức của bạn!",
    "Manage all recipes as an admin.":
      "Quản lý tất cả công thức như một quản trị viên.",
    "View your personal recipe collection!":
      "Xem bộ sưu tập công thức cá nhân của bạn!",
    "Create an account to share your recipes!":
      "Tạo tài khoản để chia sẻ công thức của bạn!",
    "Related Recipes": "Công thức khác",
    "Recipe not found.": "Không tìm thấy công thức.",
    "404 - Page Not Found": "404 - Trang không tồn tại",
    "Sorry, the page you are looking for does not exist or has been moved.":
      "Xin lỗi, trang bạn đang tìm không tồn tại hoặc đã được chuyển đi.",
    "Back to Home": "Quay về trang chủ",
  },
};

// Create Language Context
const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  // Initialize language from localStorage, default to "en" if not found
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem("language");
    return savedLanguage && translations[savedLanguage] ? savedLanguage : "vi";
  });

  // Save language to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("language", language);
  }, [language]);

  const translate = (key) => {
    return translations[language][key] || key; // Return key if translation not found
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t: translate }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Custom hook to use the Language Context
export const useLanguage = () => useContext(LanguageContext);
