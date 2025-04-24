import React, { createContext, useState, useContext } from "react";

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [userProfile, setUserProfile] = useState({
    firstName: "",
    lastName: "",
    email: "",
    major: "",
    academicYear: "",
    gender: "",
    studentId: "",
    expectedGraduation: "",
    concentration: "",
    budget: {
      min: 0,
      max: 2000,
    },
    preferences: {
      spaceType: "dorm", // 'dorm' or 'apartment'
      style: "modern", // 'modern', 'traditional', 'minimalist'
      priorities: ["budget", "functionality", "style"], // ordered by importance
    },
  });

  const updateUserProfile = (newProfile) => {
    setUserProfile((prev) => ({
      ...prev,
      ...newProfile,
    }));
  };

  const updatePreferences = (newPreferences) => {
    setUserProfile((prev) => ({
      ...prev,
      preferences: {
        ...prev.preferences,
        ...newPreferences,
      },
    }));
  };

  const updateBudget = (min, max) => {
    setUserProfile((prev) => ({
      ...prev,
      budget: {
        min,
        max,
      },
    }));
  };

  return (
    <UserContext.Provider
      value={{
        userProfile,
        updateUserProfile,
        updatePreferences,
        updateBudget,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

export default UserContext;
