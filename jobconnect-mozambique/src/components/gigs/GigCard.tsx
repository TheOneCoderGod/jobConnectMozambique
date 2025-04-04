import React from 'react';
import { 
  Box, 
  Card, 
  CardContent, 
  Typography, 
  Chip, 
  Rating, 
  Button,
  CardActions,
  CardMedia,
  Divider,
  Stack,
  useTheme
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PersonIcon from '@mui/icons-material/Person';
import { Gig } from '../../store/slices/gigsSlice';
import { CategoryIcon } from '../accessibility/AccessibleComponents';

interface GigCardProps {
  gig: Gig;
  onSelect: (id: string) => void;
}

const GigCard: React.FC<GigCardProps> = ({ gig, onSelect }) => {
  const theme = useTheme();
  
  // Format date to be more readable
  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
  };
  
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: 6
        }
      }}
    >
      {gig.isUrgent && (
        <Box 
          sx={{ 
            bgcolor: 'error.main', 
            color: 'error.contrastText',
            py: 0.5,
            px: 2,
            textAlign: 'center',
            fontWeight: 'bold'
          }}
        >
          URGENT
        </Box>
      )}
      
      {gig.imageUrl ? (
        <CardMedia
          component="img"
          height="140"
          image={gig.imageUrl}
          alt={gig.title}
        />
      ) : (
        <Box 
          sx={{ 
            height: 140, 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            bgcolor: 'grey.100'
          }}
        >
          <CategoryIcon category={gig.category} size="large" />
        </Box>
      )}
      
      <CardContent sx={{ flexGrow: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 1 }}>
          <Typography variant="h6" component="div" gutterBottom>
            {gig.title}
          </Typography>
          <Chip 
            label={gig.category.charAt(0).toUpperCase() + gig.category.slice(1)} 
            size="small" 
            color="primary" 
            variant="outlined"
          />
        </Box>
        
        <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
          <LocationOnIcon fontSize="small" color="action" />
          <Typography variant="body2" color="text.secondary">
            {gig.location}
          </Typography>
        </Stack>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          sx={{ 
            mb: 2,
            display: '-webkit-box',
            overflow: 'hidden',
            WebkitBoxOrient: 'vertical',
            WebkitLineClamp: 3,
          }}
        >
          {gig.description}
        </Typography>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Stack spacing={1}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <AccessTimeIcon fontSize="small" color="action" />
              <Typography variant="body2">{gig.duration}</Typography>
            </Stack>
            
            <Stack direction="row" spacing={0.5} alignItems="center">
              <MonetizationOnIcon fontSize="small" color="action" />
              <Typography variant="body2">{gig.payment}</Typography>
            </Stack>
          </Box>
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Stack direction="row" spacing={0.5} alignItems="center">
              <CalendarTodayIcon fontSize="small" color="action" />
              <Typography variant="body2">{formatDate(gig.startDate)}</Typography>
            </Stack>
            
            <Stack direction="row" spacing={0.5} alignItems="center">
              <Rating value={gig.rating} precision={0.5} size="small" readOnly />
            </Stack>
          </Box>
        </Stack>
        
        <Divider sx={{ my: 1.5 }} />
        
        <Stack direction="row" spacing={0.5} alignItems="center">
          <PersonIcon fontSize="small" color="action" />
          <Typography variant="body2">
            {gig.employerName} ({gig.employerRating.toFixed(1)}★)
          </Typography>
        </Stack>
      </CardContent>
      
      <CardActions>
        <Button 
          size="small" 
          fullWidth 
          variant="contained"
          onClick={() => onSelect(gig.id)}
        >
          View Details
        </Button>
      </CardActions>
    </Card>
  );
};

export default GigCard;
