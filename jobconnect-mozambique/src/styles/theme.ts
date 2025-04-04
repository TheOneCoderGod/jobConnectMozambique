import { createTheme } from '@mui/material/styles';

// Create a theme instance with high contrast and accessibility features
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Blue - high visibility
      dark: '#004ba0',
      light: '#63a4ff',
      contrastText: '#ffffff',
    },
    secondary: {
      main: '#ff8f00', // Amber - high visibility
      dark: '#c56000',
      light: '#ffc046',
      contrastText: '#000000',
    },
    error: {
      main: '#d32f2f', // Red - high visibility
      dark: '#9a0007',
      light: '#ff6659',
      contrastText: '#ffffff',
    },
    background: {
      default: '#ffffff',
      paper: '#f5f5f5',
    },
    text: {
      primary: '#212121',
      secondary: '#424242',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    fontSize: 16, // Larger default font size for better readability
    h1: {
      fontSize: '2.5rem',
      fontWeight: 500,
    },
    h2: {
      fontSize: '2rem',
      fontWeight: 500,
    },
    h3: {
      fontSize: '1.75rem',
      fontWeight: 500,
    },
    h4: {
      fontSize: '1.5rem',
      fontWeight: 500,
    },
    h5: {
      fontSize: '1.25rem',
      fontWeight: 500,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 500,
    },
    button: {
      fontSize: '1rem',
      textTransform: 'none', // Don't uppercase button text for better readability
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '10px 16px',
          fontSize: '1rem',
        },
        containedPrimary: {
          '&:hover': {
            backgroundColor: '#004ba0',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          marginBottom: 16,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
  shape: {
    borderRadius: 8,
  },
  spacing: 8,
});

// Create a dark theme variant for areas with low power
export const darkTheme = createTheme({
  ...theme,
  palette: {
    ...theme.palette,
    mode: 'dark',
    primary: {
      main: '#90caf9', // Lighter blue for dark mode
      dark: '#5d99c6',
      light: '#c3fdff',
      contrastText: '#000000',
    },
    secondary: {
      main: '#ffb74d', // Lighter amber for dark mode
      dark: '#c88719',
      light: '#ffe97d',
      contrastText: '#000000',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
});

export default theme;
