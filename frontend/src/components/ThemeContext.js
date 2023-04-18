import React, {createContext, useState, useEffect} from "react";
import {GetMode} from "./Token";

// Create a new context object
export const ThemeContext = createContext({});

// Create a new component that provides the context to its children
export const ThemeProvider = ({children}) => {
  // Define a state variable to hold the current theme
  const [theme, setTheme] = useState("light");

  // Load the user's preferred mode from storage on component mount
  useEffect(() => {
    const loadMode = async () => {
      const mode = await GetMode();
      if (mode === "dark") {
        setTheme("dark");
      }
    };
    loadMode();
  }, []);

  // Define a function to toggle the theme between light and dark
  const toggleTheme = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  // Render the provider component and pass the current theme and toggle function to the context
  return (
    <ThemeContext.Provider value={{theme, setTheme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
