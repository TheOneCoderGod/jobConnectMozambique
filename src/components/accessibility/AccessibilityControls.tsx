import React from 'react';
import { 
  Box, 
  IconButton, 
  Tooltip, 
  Paper, 
  Typography,
  useTheme
} from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import TextIncreaseIcon from '@mui/icons-material/TextIncrease';
import TextDecreaseIcon from '@mui/icons-material/TextDecrease';
import ContrastIcon from '@mui/icons-material/Contrast';
import { useThemeContext } from '../../contexts/ThemeContext';

const AccessibilityControls: React.FC = () => {
  const theme = useTheme();
  const { 
    mode, 
    toggleColorMode, 
    highContrast, 
    toggleHighContrast,
    increaseFontSize,
    decreaseFontSize
  } = useThemeContext();

  return (
    <Paper
      elevation={3}
      sx={{
        position: 'fixed',
        bottom: 16,
        right: 16,
        zIndex: 1000,
        p: 1,
        display: 'flex',
        flexDirection: 'column',
        gap: 1,
        borderRadius: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Box sx={{ textAlign: 'center', mb: 1 }}>
        <Typography variant="caption" fontWeight="bold">
          Accessibility
        </Typography>
      </Box>

      <Tooltip title={mode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}>
        <IconButton 
          onClick={toggleColorMode} 
          aria-label={mode === 'dark' ? "Switch to Light Mode" : "Switch to Dark Mode"}
          sx={{ color: theme.palette.primary.main }}
        >
          {mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
        </IconButton>
      </Tooltip>

      <Tooltip title={highContrast ? "Disable High Contrast" : "Enable High Contrast"}>
        <IconButton 
          onClick={toggleHighContrast} 
          aria-label={highContrast ? "Disable High Contrast" : "Enable High Contrast"}
          sx={{ 
            color: highContrast ? theme.palette.primary.main : theme.palette.text.secondary 
          }}
        >
          <ContrastIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Increase Font Size">
        <IconButton 
          onClick={increaseFontSize} 
          aria-label="Increase Font Size"
          sx={{ color: theme.palette.primary.main }}
        >
          <TextIncreaseIcon />
        </IconButton>
      </Tooltip>

      <Tooltip title="Decrease Font Size">
        <IconButton 
          onClick={decreaseFontSize} 
          aria-label="Decrease Font Size"
          sx={{ color: theme.palette.primary.main }}
        >
          <TextDecreaseIcon />
        </IconButton>
      </Tooltip>
    </Paper>
  );
};

export default AccessibilityControls;
