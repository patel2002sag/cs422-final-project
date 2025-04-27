import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext();

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem("user");
    return savedUser ? JSON.parse(savedUser) : null;
  });

  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      // In a real application, you would make an API call here
      // For now, we'll simulate a successful login
      const userData = {
        email,
        fullName: "Test User", // This would come from your backend
        major: "Computer Science",
        academicYear: "Junior",
        id: Date.now(), // Unique identifier for the user
      };

      setUser(userData);
      return userData;
    } catch (error) {
      throw new Error("Login failed. Please check your credentials.");
    }
  };

  const signup = async (userData) => {
    try {
      // In a real application, you would make an API call here
      // For now, we'll simulate a successful signup
      const newUser = {
        ...userData,
        id: Date.now(), // Unique identifier for the user
      };
      setUser(null); // Clear any existing user data
      return newUser;
    } catch (error) {
      throw new Error("Signup failed. Please try again.");
    }
  };

  const logout = () => {
    setUser(null);
  };

  const value = {
    user,
    login,
    signup,
    logout,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export default UserContext;
