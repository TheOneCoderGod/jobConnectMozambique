import React from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Grid,
  Card,
  CardContent,
  CardMedia,
  useTheme
} from '@mui/material';
import WorkIcon from '@mui/icons-material/Work';
import HomeIcon from '@mui/icons-material/Home';
import SchoolIcon from '@mui/icons-material/School';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

// Universal icon mapping for job categories
const categoryIcons: Record<string, string> = {
  'construction': '⚒️',
  'domestic': '🏠',
  'transport': '🚗',
  'agriculture': '🌱',
  'retail': '🛒',
  'security': '🔒',
  'education': '📚',
  'healthcare': '⚕️',
  'food': '🍲',
  'technology': '💻'
};

interface IconCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  number: number;
  onClick?: () => void;
}

export const IconCard: React.FC<IconCardProps> = ({ 
  title, 
  description, 
  icon, 
  number, 
  onClick 
}) => {
  const theme = useTheme();
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        '&:hover': onClick ? {
          boxShadow: 6,
          transform: 'translateY(-4px)',
          transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out'
        } : {}
      }}
      onClick={onClick}
    >
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          p: 2,
          bgcolor: 'primary.main',
          color: 'primary.contrastText'
        }}
      >
        <Typography variant="h5" component="div">
          {number}. {title}
        </Typography>
      </Box>
      
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <Box sx={{ fontSize: 60, mb: 2, color: 'primary.main' }}>
          {icon}
        </Box>
        
        <Typography variant="body1" align="center">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

interface CategoryIconProps {
  category: string;
  size?: 'small' | 'medium' | 'large';
  withText?: boolean;
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ 
  category, 
  size = 'medium',
  withText = true
}) => {
  const lowerCategory = category.toLowerCase();
  const icon = categoryIcons[lowerCategory] || '📋';
  
  const fontSize = {
    small: '1.5rem',
    medium: '2rem',
    large: '3rem'
  }[size];
  
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box component="span" sx={{ fontSize, mr: withText ? 1 : 0 }}>
        {icon}
      </Box>
      {withText && (
        <Typography variant="body1">
          {category}
        </Typography>
      )}
    </Box>
  );
};

interface NumericButtonProps {
  number: number;
  label: string;
  icon?: React.ReactNode;
  onClick?: () => void;
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'primary' | 'secondary' | 'error' | 'info' | 'success' | 'warning';
  fullWidth?: boolean;
}

export const NumericButton: React.FC<NumericButtonProps> = ({
  number,
  label,
  icon,
  onClick,
  variant = 'contained',
  color = 'primary',
  fullWidth = false
}) => {
  return (
    <Button
      variant={variant}
      color={color}
      onClick={onClick}
      fullWidth={fullWidth}
      startIcon={icon}
      sx={{ 
        justifyContent: 'flex-start',
        textAlign: 'left',
        py: 1.5,
        px: 2,
        fontSize: '1rem'
      }}
    >
      <Box component="span" sx={{ mr: 1, fontWeight: 'bold' }}>
        {number}.
      </Box>
      {label}
    </Button>
  );
};

// Export the category icons for use throughout the app
export const CATEGORY_ICONS = categoryIcons;
