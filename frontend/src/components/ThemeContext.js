import React, {createContext, useState, useEffect} from 'react';
import {GetMode} from './Token';

export const ThemeContext = createContext({});

export const ThemeProvider = ({children}) => {
  const [theme, setTheme] = useState('light');

  useEffect(() => {
    const loadMode = async () => {
      const mode = await GetMode();
      if (mode === 'dark') {
        setTheme('dark');
      }
    };
    loadMode();
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{theme, toggleTheme}}>
      {children}
    </ThemeContext.Provider>
  );
};
