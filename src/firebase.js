import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
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
