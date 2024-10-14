import React, { createContext, useState, useContext, useEffect } from 'react';

// Define the themes
const themes = {
  light: {
    background: "#ffffff",
    color: "#000000"
  },
  dark: {
    background: "#000000",
    color: "#ffffff"
  }
};

// Create the ThemeContext with default value as the light theme
const ThemeContext = createContext({
  theme: themes.light,
  toggleTheme: () => {}
});

// Provider component to wrap the app
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState(themes.light);

  // Function to toggle between light and dark themes
  const toggleTheme = () => {
    setTheme(theme === themes.light ? themes.dark : themes.light);
  };

  useEffect(() => {
    document.body.style.backgroundColor = theme.background;
    document.body.style.color = theme.color;
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// Custom hook to use the ThemeContext
export function useTheme() {
  return useContext(ThemeContext);
}