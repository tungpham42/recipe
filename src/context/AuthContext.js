import React, { createContext, useState, useEffect } from "react";
import { auth } from "../firebase";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [usernameUpdated, setUsernameUpdated] = useState(0); // New state to trigger updates

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
    });
    return unsubscribe;
  }, []);

  const refreshUser = async () => {
    const user = auth.currentUser;
    if (user) {
      await user.reload();
      setCurrentUser({ ...user });
      setUsernameUpdated((prev) => prev + 1); // Trigger update when username changes
    }
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        refreshUser,
        usernameUpdated, // Expose this to trigger comment updates
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
