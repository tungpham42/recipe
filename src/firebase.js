// firebase.js
import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCQMkG3fS3vebvF2FyesmdAaIse3QW-aRE",
  authDomain: "recipe-sharing-platform-42.firebaseapp.com",
  projectId: "recipe-sharing-platform-42",
  storageBucket: "recipe-sharing-platform-42.firebasestorage.app",
  messagingSenderId: "964697165394",
  appId: "1:964697165394:web:f99a6b67ac4987a89bd98b",
  measurementId: "G-MEC4FZ0RZB",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const analytics = getAnalytics(app);
export const googleProvider = new GoogleAuthProvider();

// Helper function to check admin status
export const isAdminUser = async (user) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userDoc = await getDoc(userRef);
    if (userDoc.exists()) {
      const userData = userDoc.data();
      return userData.isAdmin === true || user.email === "tung.42@gmail.com";
    }
    return false;
  } catch (error) {
    console.error("Error checking admin status:", error);
    return false;
  }
};

// Helper function to create/update user document
export const createUserDocument = async (user, additionalData = {}) => {
  try {
    const userRef = doc(db, "users", user.uid);
    const userData = {
      uid: user.uid,
      email: user.email,
      displayName: user.displayName ?? additionalData.username,
      createdAt: new Date().toISOString(),
      lastLogin: new Date().toISOString(),
      authProvider: additionalData.authProvider || "email",
      isAdmin:
        user.email === "tung.42@gmail.com"
          ? true
          : additionalData.isAdmin || false,
      // Explicitly exclude password; only include relevant additional data
      ...(additionalData.username && { username: additionalData.username }),
      ...(additionalData.authProvider && {
        authProvider: additionalData.authProvider,
      }),
    };
    await setDoc(userRef, userData, { merge: true });
    return userData;
  } catch (error) {
    console.error("Error creating user document:", error);
    throw error;
  }
};
