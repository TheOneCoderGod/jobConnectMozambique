import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { ThemeProvider } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { PaletteMode } from '@mui/material';
import theme, { darkTheme } from '../styles/theme';

// Define the context type
type ThemeContextType = {
  mode: PaletteMode;
  toggleColorMode: () => void;
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: number;
  increaseFontSize: () => void;
  decreaseFontSize: () => void;
  resetFontSize: () => void;
};

// Create the context with default values
export const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleColorMode: () => {},
  highContrast: false,
  toggleHighContrast: () => {},
  fontSize: 1,
  increaseFontSize: () => {},
  decreaseFontSize: () => {},
  resetFontSize: () => {},
});

// Custom hook to use the theme context
export const useThemeContext = () => useContext(ThemeContext);

interface ThemeContextProviderProps {
  children: ReactNode;
}

export const ThemeContextProvider: React.FC<ThemeContextProviderProps> = ({ children }) => {
  // Check if user prefers dark mode
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');
  
  // Initialize state from localStorage or defaults
  const [mode, setMode] = useState<PaletteMode>(() => {
    const savedMode = localStorage.getItem('themeMode');
    return (savedMode as PaletteMode) || (prefersDarkMode ? 'dark' : 'light');
  });
  
  const [highContrast, setHighContrast] = useState<boolean>(() => {
    const savedContrast = localStorage.getItem('highContrast');
    return savedContrast ? JSON.parse(savedContrast) : false;
  });
  
  const [fontSize, setFontSize] = useState<number>(() => {
    const savedFontSize = localStorage.getItem('fontSize');
    return savedFontSize ? parseFloat(savedFontSize) : 1;
  });
  
  // Update localStorage when values change
  useEffect(() => {
    localStorage.setItem('themeMode', mode);
  }, [mode]);
  
  useEffect(() => {
    localStorage.setItem('highContrast', JSON.stringify(highContrast));
  }, [highContrast]);
  
  useEffect(() => {
    localStorage.setItem('fontSize', fontSize.toString());
    // Apply font size to html element
    document.documentElement.style.fontSize = `${fontSize}rem`;
  }, [fontSize]);
  
  // Toggle between light and dark mode
  const toggleColorMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };
  
  // Toggle high contrast mode
  const toggleHighContrast = () => {
    setHighContrast((prev) => !prev);
  };
  
  // Font size controls
  const increaseFontSize = () => {
    setFontSize((prev) => Math.min(prev + 0.1, 1.5));
  };
  
  const decreaseFontSize = () => {
    setFontSize((prev) => Math.max(prev - 0.1, 0.8));
  };
  
  const resetFontSize = () => {
    setFontSize(1);
  };
  
  // Create the context value
  const contextValue: ThemeContextType = {
    mode,
    toggleColorMode,
    highContrast,
    toggleHighContrast,
    fontSize,
    increaseFontSize,
    decreaseFontSize,
    resetFontSize,
  };
  
  // Select the appropriate theme based on mode
  const currentTheme = mode === 'dark' ? darkTheme : theme;
  
  // Apply high contrast modifications if enabled
  // In a real implementation, we would create a high contrast version of the theme
  
  return (
    <ThemeContext.Provider value={contextValue}>
      <ThemeProvider theme={currentTheme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeContextProvider;
