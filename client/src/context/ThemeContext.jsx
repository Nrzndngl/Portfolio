import { createContext, useContext, useState, useEffect } from 'react';

const ThemeContext = createContext();

function getStoredTheme() {
  try {
    const saved = localStorage.getItem('darkMode');
    return saved !== null ? JSON.parse(saved) : true;
  } catch {
    return true;
  }
}

function setStoredTheme(value) {
  try {
    localStorage.setItem('darkMode', JSON.stringify(value));
  } catch {
  }
}

export function ThemeProvider({ children }) {
  const [darkMode, setDarkMode] = useState(getStoredTheme);

  useEffect(() => {
    setStoredTheme(darkMode);
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export const useTheme = () => useContext(ThemeContext);
