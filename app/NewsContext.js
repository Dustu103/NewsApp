"use client";
import React, { createContext, useState, useContext } from "react";

// Create the context
const NewsContext = createContext();

// Create the provider component
export const NewsProvider = ({ children }) => {
  const [news, setNews] = useState([]); // This will store all news items
  const [selectedNews, setSelectedNews] = useState(null); // This will store the selected news item

  const setNewsItems = (items) => {
    setNews(items);
  };
  console.log("NewsProvider initialized", { news, selectedNews });

  return (
    <NewsContext.Provider value={{ news, selectedNews, setNewsItems, setSelectedNews }}>
      {children}
    </NewsContext.Provider>
  );
};

// Create a custom hook to access the context
export const useNews = () => {
  // console.log(NewsContext)
    const context = useContext(NewsContext);
    if (!context) {
        throw new Error("useNews must be used within a NewsProvider");
      }
  return useContext(NewsContext);
};
