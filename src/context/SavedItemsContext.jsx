import React, { createContext, useContext, useState, useEffect } from "react";

const SavedItemsContext = createContext();

export const useSavedItems = () => {
  const context = useContext(SavedItemsContext);
  if (!context) {
    throw new Error("useSavedItems must be used within a SavedItemsProvider");
  }
  return context;
};

export const SavedItemsProvider = ({ children }) => {
  const [savedItems, setSavedItems] = useState(() => {
    const saved = localStorage.getItem("savedItems");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("savedItems", JSON.stringify(savedItems));
  }, [savedItems]);

  const addToSavedItems = (item) => {
    setSavedItems((prev) => {
      if (prev.find((savedItem) => savedItem.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromSavedItems = (itemId) => {
    setSavedItems((prev) => prev.filter((item) => item.id !== itemId));
  };

  const moveToCart = (item) => {
    removeFromSavedItems(item.id);
    return item;
  };

  const isItemSaved = (itemId) => {
    return savedItems.some((item) => item.id === itemId);
  };

  return (
    <SavedItemsContext.Provider
      value={{
        savedItems,
        addToSavedItems,
        removeFromSavedItems,
        moveToCart,
        isItemSaved,
      }}
    >
      {children}
    </SavedItemsContext.Provider>
  );
};

export default SavedItemsContext;
